from flask import Flask, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import pandas as pd
import numpy as np
import math
import os

app = Flask(__name__)
CORS(app) # Allows React to communicate with this Python server

# ==========================================
# 1. PYTORCH ARCHITECTURE (Copied from Colab)
# ==========================================
class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.pe = pe.unsqueeze(0)

    def forward(self, x):
        return x + self.pe[:, :x.size(1), :]

class PatchTST(nn.Module):
    def __init__(self, seq_len=30, pred_len=7, patch_len=14, stride=7, 
                 d_model=32, n_heads=2, num_layers=2, dropout=0.38):
        super().__init__()
        self.patch_len = patch_len
        self.stride = stride
        self.num_patches = int((seq_len - patch_len) / stride) + 1
        
        self.patch_projection = nn.Linear(patch_len, d_model)
        self.positional_encoding = PositionalEncoding(d_model)
        
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=n_heads, dim_feedforward=d_model * 4, 
            dropout=dropout, batch_first=True
        )
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.flatten = nn.Flatten(start_dim=1)
        self.head = nn.Linear(self.num_patches * d_model, pred_len)

    def forward(self, x):
        x = x.unfold(dimension=1, size=self.patch_len, step=self.stride)
        x = x.squeeze(2)
        x = self.patch_projection(x)  
        x = self.positional_encoding(x)
        x = self.transformer(x)       
        x = self.flatten(x)           
        return self.head(x)

# ==========================================
# 2. LOAD DATA AND MODEL INTO MEMORY
# ==========================================
print("Loading AI Model and Data...")

df = pd.read_csv('cleaned_waste_data.csv')
raw_data = df['load_weight'].values.reshape(-1, 1)

# Normalization constants based on full dataset
data_mean = raw_data.mean()
data_std = raw_data.std()
scaled_data = (raw_data - data_mean) / (data_std + 1e-8)

device = torch.device("cpu") # Run inference on local CPU
model = PatchTST()
model.load_state_dict(torch.load('patchtst_waste_model.pth', map_location=device, weights_only=True))
model.eval()

# ==========================================
# 3. API ENDPOI
# NT
# ==========================================
@app.route('/api/forecast', methods=['GET'])
def get_forecast():
   # Grab a representative 30-day window from the middle of the dataset (e.g., day 1500)
    start_idx = 1500
    recent_30_scaled = scaled_data[start_idx : start_idx + 30]
    recent_30_actual = raw_data[start_idx : start_idx + 30].flatten()
    # Format for PyTorch: (Batch=1, Seq_Len=30, Features=1)
    x_input = torch.tensor(recent_30_scaled, dtype=torch.float32).unsqueeze(0).to(device)
    
    # Predict next 7 days
    with torch.no_grad():
        y_pred_scaled = model(x_input).squeeze(-1).numpy()[0]
        
    # Convert scaled predictions back to actual Tons
    y_pred_actual = (y_pred_scaled * data_std) + data_mean
    
    # Package data for React
    payload = []
    
    # Append 30 days of history
    for i in range(30):
        payload.append({
            "day": i,
            "historical": round(float(recent_30_actual[i])),
            "forecast": None
        })
        
    # Connect the lines visually on day 30
    payload[-1]["forecast"] = payload[-1]["historical"]
    
    # Append 7 days of AI forecast
    for i in range(7):
        payload.append({
            "day": 30 + i + 1,
            "historical": None,
            "forecast": round(float(y_pred_actual[i]))
        })
        
    return jsonify(payload)

if __name__ == '__main__':
    app.run(port=5000, debug=True)