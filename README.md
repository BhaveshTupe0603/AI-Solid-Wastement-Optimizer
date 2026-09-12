# 🌱 EcoPredict AI: Smart Waste Collection & Route Optimization

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge\&logo=pytorch\&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge\&logo=flask\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

## 📌 Project Overview

Municipal solid waste (MSW) generation is highly variable, making static waste-collection schedules inefficient and costly.

**EcoPredict AI** is a full-stack AI-powered decision-support system that bridges **predictive analytics and operational route optimization**.

The system uses a **Patch Time Series Transformer (PatchTST)** to forecast daily waste tonnage over a **7-day horizon** using a **30-day historical sliding window**.

The predictions are exposed through a **Python/Flask REST API** and visualized through a modern **React-based dashboard**, enabling city planners to move from fixed-schedule collection toward **demand-responsive waste logistics**.

---

## 🚀 Key Features

### 🤖 Transformer-Based Forecasting

* Uses **PatchTST** for time-series forecasting.
* Captures local temporal patterns and long-term dependencies.
* Uses a 30-day historical window.
* Generates a 7-day waste-tonnage forecast.

### 📈 High-Fidelity Predictions

The predictive model achieved:

* **R² Score:** `0.9202`
* **RMSE:** `120.81 tons`

These results demonstrate strong predictive performance on the evaluated municipal waste dataset.

### 🔗 Full-Stack Architecture

The application uses a decoupled architecture:

```text
React + Vite Frontend
        │
        │ REST API
        ▼
Python + Flask Backend
        │
        ▼
PyTorch PatchTST Model
        │
        ▼
Waste Forecast
```

### 🚛 Dynamic Route Optimization Insights

The system converts predicted waste volumes into actionable operational insights, including:

* Fleet capacity planning
* Weekend collection adjustments
* Demand-responsive collection
* Potential fuel savings
* Reduction of unnecessary truck deployment

For example, the dashboard can identify periods where reduced fleet capacity could potentially save **420+ gallons of fuel**, based on the project's operational assumptions.

### 🎨 Modern Dashboard

The frontend is built with:

* React
* Vite
* Tailwind CSS v4
* Recharts
* Lucide React

It provides interactive charts and responsive visualizations for waste-management analytics.

---

# 🛠️ Technology Stack

| Layer              | Technologies              |
| ------------------ | ------------------------- |
| Machine Learning   | PyTorch, Pandas, NumPy    |
| Forecasting Model  | PatchTST                  |
| Backend            | Python, Flask, Flask-CORS |
| Frontend           | React.js, Vite            |
| Styling            | Tailwind CSS v4           |
| Data Visualization | Recharts                  |
| Icons              | Lucide React              |
| Model Format       | PyTorch `.pth`            |

---

# 📊 System Architecture

## 1. Data Pipeline

Historical municipal waste data is collected, cleaned, processed, and normalized for model inference.

```text
Historical Waste Data
        │
        ▼
Data Cleaning
        │
        ▼
Normalization
        │
        ▼
30-Day Sliding Window
```

## 2. AI Inference

The trained **PatchTST** model receives the processed 30-day historical sequence and generates a 7-day forecast.

```text
30-Day Historical Data
          │
          ▼
     PatchTST Model
          │
          ▼
  7-Day Waste Forecast
```

## 3. API Layer

The Flask backend exposes the prediction through a REST endpoint:

```text
GET /api/forecast
```

Default local endpoint:

```text
http://127.0.0.1:5000/api/forecast
```

## 4. Presentation Layer

The React frontend requests forecast data from the Flask API and dynamically updates the dashboard.

```text
Flask REST API
      │
      │ JSON
      ▼
React Dashboard
      │
      ├── Forecast Charts
      ├── Waste Trends
      ├── Route Insights
      └── Operational Recommendations
```

---

# 💻 Local Installation & Setup

## Prerequisites

Make sure the following are installed:

* **Node.js v18+**
* **Python 3.9+**
* **npm**
* **Git**

---

## 1. Clone the Repository

```bash
git clone https://github.com/BhaveshTupe0603/AI-Solid-Wastement-Optimizer.git
cd AI-Solid-Wastement-Optimizer
```

---

# 🐍 2. Backend Setup

Install the required Python packages:

```bash
pip install flask flask-cors torch pandas numpy
```

Make sure the following files are available in the project root:

```text
cleaned_waste_data.csv
patchtst_waste_model.pth
app.py
```

Start the Flask server:

```bash
python app.py
```

The backend API should be available at:

```text
http://127.0.0.1:5000
```

---

# ⚛️ 3. Frontend Setup

Open a **new terminal** and navigate to the project directory:

```bash
cd AI-Solid-Wastement-Optimizer
```

Install the Node.js dependencies:

```bash
npm install
```

If the required packages are not already included in `package.json`, install them with:

```bash
npm install recharts lucide-react @tailwindcss/vite
```

Start the Vite development server:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:5173
```

---

# 🔄 Running the Complete Application

You need **two terminals**.

### Terminal 1 — Flask Backend

```bash
python app.py
```

### Terminal 2 — React Frontend

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

The React dashboard will communicate with the Flask API to retrieve the AI-generated waste forecast.

---

# 🔬 Model Performance

The predictive engine was evaluated against baseline forecasting approaches, including:

* 7-Day Moving Average
* Seasonal Naive
* PatchTST

### Performance

| Metric                  |          Result |
| ----------------------- | --------------: |
| **R² Score**            |      **0.9202** |
| **RMSE**                | **120.81 Tons** |
| Forecast Horizon        |      **7 Days** |
| Historical Input Window |     **30 Days** |

The results demonstrate strong predictive performance for the evaluated municipal waste dataset.

---

# 🚛 Operational Impact

EcoPredict AI aims to reduce inefficiencies associated with fixed waste-collection schedules.

### Traditional Approach

```text
Fixed Schedule
      │
      ▼
Same Fleet Capacity
Every Day
      │
      ▼
Over-deployment
      │
      ▼
Fuel & Operational Waste
```

### EcoPredict AI Approach

```text
Historical Data
      │
      ▼
AI Forecast
      │
      ▼
Predicted Waste Volume
      │
      ▼
Demand-Based Planning
      │
      ▼
Optimized Fleet Deployment
      │
      ▼
Potential Fuel & Cost Savings
```

---

# 🎯 Project Objectives

EcoPredict AI is designed to:

* Predict future municipal waste generation.
* Improve waste-collection planning.
* Reduce unnecessary fleet deployment.
* Support demand-responsive logistics.
* Provide data-driven operational recommendations.
* Visualize waste trends through an interactive dashboard.
* Demonstrate the practical application of Transformer-based time-series forecasting.

---

# 🔮 Future Enhancements

Potential future improvements include:

* 🛰️ Real-time GPS-based fleet tracking
* 🚛 Dynamic vehicle routing
* 📍 GIS-based collection-zone optimization
* 🌦️ Weather-aware waste forecasting
* 📱 Mobile application for collection teams
* ☁️ Cloud deployment
* 🔔 Automated collection alerts
* 🧠 Multi-step and multi-location forecasting
* 📊 Real-time municipal data integration
* 💰 Advanced cost and fuel optimization

---

# 👤 Author

**Bhavesh Santoshkumar Tupe**

**Computer Science and Engineering (CSE)**
**Er. Perumal Manimekalai College of Engineering**

---

# ⭐ Project Highlights

```text
🌱 EcoPredict AI
│
├── 🤖 PatchTST Forecasting
├── 📈 7-Day Waste Prediction
├── 🔗 Flask REST API
├── ⚛️ React + Vite Dashboard
├── 🎨 Tailwind CSS
├── 📊 Recharts Visualization
├── 🚛 Route Optimization Insights
└── ⛽ Fuel-Saving Analysis
```

---

## 📜 License

This project is developed as an academic/final-year engineering project.

If you plan to distribute the project publicly as open source, an appropriate open-source license such as **MIT** can be added.
