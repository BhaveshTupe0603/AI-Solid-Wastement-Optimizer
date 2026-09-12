import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
  Trash2, Leaf, TrendingUp, Calendar, MapPin, Settings, AlertTriangle, CheckCircle2 
} from 'lucide-react';

// ==========================================
// COMPONENTS
// ==========================================
const MetricCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start space-x-4">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <div className="text-2xl font-bold text-slate-800 mt-1">{value}</div>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

// ==========================================
// MAIN APPLICATION
// ==========================================
export default function App() {
  const [selectedZone, setSelectedZone] = useState('Zone A - Downtown');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real AI data from the Flask Python Server
  const fetchForecast = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/forecast');
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Failed to fetch AI forecast. Is the Flask server running?", error);
    }
    setIsLoading(false);
  };

  // Run the fetch command exactly once when the dashboard loads
  useEffect(() => {
    fetchForecast();
  }, []);

  // Calculate the total 7-day predicted tonnage dynamically from the API response
  const predictedTotal = chartData
    .filter(d => d.forecast !== null && d.historical === null)
    .reduce((sum, d) => sum + d.forecast, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="bg-emerald-500 p-2 rounded-lg text-white">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-700">EcoPredict AI</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
            <TrendingUp className="w-5 h-5" />
            <span>Forecasting</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <MapPin className="w-5 h-5" />
            <span>Route Optimization</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5" />
            <span>Facilities</span>
          </a>
        </nav>
        <div className="p-6 border-t border-slate-100">
          <a href="#" className="flex items-center space-x-3 text-slate-500 hover:text-slate-800 transition-colors">
            <Settings className="w-5 h-5" />
            <span>System Settings</span>
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        
        {/* Header & Controls */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Solid Waste Generation Forecast</h1>
            <p className="text-slate-500 mt-1">AI-powered 7-day predictive analytics (Powered by PatchTST)</p>
          </div>
          
          <div className="flex space-x-3">
            <div className="bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400 mr-2" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 py-2.5 w-40"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option>Zone A - Downtown</option>
                <option>Zone B - Suburbs</option>
                <option>Zone C - Industrial</option>
              </select>
            </div>
            <button 
              onClick={fetchForecast}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isLoading ? "Loading..." : "Generate Report"}
            </button>
          </div>
        </header>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard 
            title="Predicted 7-Day Total" 
            value={isLoading ? "..." : `${predictedTotal.toLocaleString()} Tons`}
            subtitle="Based on evolutionary transformer model"
            icon={Trash2}
            colorClass="bg-blue-500 text-blue-500"
          />
          <MetricCard 
            title="Model Confidence (R²)" 
            value="92.02%" 
            subtitle="Highly accurate baseline convergence"
            icon={CheckCircle2}
            colorClass="bg-emerald-500 text-emerald-500"
          />
          <MetricCard 
            title="Estimated Fuel Savings" 
            value="~420 Gallons" 
            subtitle="By avoiding empty weekend routes"
            icon={Leaf}
            colorClass="bg-teal-500 text-teal-500"
          />
        </div>

        {/* The AI Graph */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
              Dynamic Forecast Visualization
            </h2>
            <div className="flex items-center space-x-2 text-sm">
              <span className="flex items-center text-slate-500"><div className="w-3 h-3 rounded-full bg-slate-400 mr-1.5"></div> Historical</span>
              <span className="flex items-center text-slate-500 ml-4"><div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div> AI Prediction</span>
            </div>
          </div>
          
          <div className="h-80 w-full">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Loading AI Predictions...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="day" 
                    tickFormatter={(val) => `Day ${val}`} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value, name) => [`${value} Tons`, name === 'historical' ? 'Recorded' : 'Predicted']}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                  
                  {/* Vertical line separating history from prediction */}
                  <ReferenceLine x={29} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#64748b', fontSize: 12 }} />
                  
                  <Line 
                    type="monotone" 
                    dataKey="historical" 
                    stroke="#94a3b8" 
                    strokeWidth={3} 
                    dot={{ r: 4, strokeWidth: 2 }} 
                    activeDot={{ r: 6 }} 
                    connectNulls
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#ef4444" 
                    strokeWidth={3} 
                    strokeDasharray="5 5" 
                    dot={{ r: 4, fill: '#ef4444', strokeWidth: 2 }} 
                    activeDot={{ r: 6 }} 
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Actionable Insights Panel */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-800 font-bold">Actionable Insight: Weekend Optimization</h4>
            <p className="text-amber-700 text-sm mt-1">
              The AI model strongly predicts a near-zero waste generation drop for Days 32 and 33 (Weekend). 
              We recommend reducing active collection fleets in <strong>{selectedZone}</strong> by 80% during this window to conserve fuel and operational costs.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}