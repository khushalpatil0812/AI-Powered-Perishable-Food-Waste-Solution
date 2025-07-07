# Walmart AI-Powered Perishable Optimization Backend

A FastAPI backend service that provides AI-powered optimization APIs for Walmart's perishable inventory management system.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip or conda

### Installation

1. **Clone and setup**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

2. **Environment Configuration**
```bash
# Copy and configure environment variables
cp .env.example .env
# Edit .env with your settings
```

3. **Run the server**
```bash
# Development server with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or run directly
python app/main.py
```

4. **Access the API**
- **API Documentation:** http://localhost:8000/docs
- **Alternative Docs:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

## 📊 API Endpoints

### Dashboard APIs
- `GET /api/dashboard/summary` - Executive summary data
- `GET /api/dashboard/waste-trends` - Waste reduction trends
- `GET /api/dashboard/store-comparison` - Store comparison data

### Forecasting APIs
- `GET /api/forecasting/predictions` - Demand predictions
- `POST /api/forecasting/generate` - Generate new forecasts
- `GET /api/forecasting/accuracy` - Accuracy metrics

### Inventory APIs
- `GET /api/inventory/recommendations` - Optimization recommendations
- `POST /api/inventory/optimize` - Run optimization
- `GET /api/inventory/levels/{store_id}` - Current inventory levels

### Waste Reduction APIs
- `GET /api/waste/summary` - Waste summary metrics
- `GET /api/waste/by-category` - Waste by category
- `GET /api/waste/by-store` - Waste by store
- `POST /api/waste/predict` - Predict waste

### ROI Calculator APIs
- `POST /api/roi/calculate` - Calculate ROI
- `GET /api/roi/scenarios` - Predefined scenarios
- `GET /api/roi/sensitivity` - Sensitivity analysis

### Scenario Modeling APIs
- `GET /api/scenarios/prebuilt` - Predefined scenarios
- `POST /api/scenarios/analyze` - Analyze custom scenario
- `GET /api/scenarios/what-if` - What-if questions

## 🔧 Configuration

### Environment Variables (.env)
```env
# Database
DATABASE_URL=sqlite:///./walmart_ai.db

# Security
SECRET_KEY=your-secret-key-here

# External APIs
WEATHER_API_KEY=your-weather-api-key

# Environment
ENVIRONMENT=development
```

## 🏗️ Project Structure

```
app/
├── main.py              # FastAPI application
├── config.py            # Configuration settings
├── database.py          # Database setup
├── models/              # Database models
│   ├── store.py
│   ├── product.py
│   ├── inventory.py
│   └── forecast.py
├── api/                 # API routes
│   ├── dashboard.py
│   ├── forecasting.py
│   ├── inventory.py
│   ├── waste.py
│   ├── roi.py
│   └── scenarios.py
├── services/            # Business logic
│   ├── ml_service.py
│   ├── optimization.py
│   └── analytics.py
└── utils/               # Utilities
    └── mock_data.py
```

## 🔌 Frontend Integration

### React Frontend Connection
```javascript
// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Example API call
const fetchDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/summary`);
  const data = await response.json();
  return data;
};
```

### CORS Configuration
The API is configured to accept requests from:
- http://localhost:3000 (Create React App)
- http://localhost:5173 (Vite)

## 🗄️ Database Setup

### SQLite (Default - No setup required)
The API uses SQLite by default for easy development.

### PostgreSQL (Production)
```bash
# Install PostgreSQL
# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/walmart_ai
```

## 🤖 ML Services

The backend includes mock ML services that simulate:
- **Demand Forecasting:** Predicts future demand with confidence intervals
- **Inventory Optimization:** Recommends optimal stock levels
- **Waste Prediction:** Identifies products at risk of waste
- **ROI Calculation:** Calculates return on investment scenarios

## 📈 Mock Data

The API provides realistic mock data for:
- 3 stores (Urban, Suburban, Rural)
- 5 product categories (Dairy, Produce, Bakery, Meat, Deli)
- Historical trends and forecasts
- ROI scenarios and sensitivity analysis

## 🚀 Deployment

### Local Development
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker (Optional)
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🧪 Testing

```bash
# Install test dependencies
pip install pytest httpx

# Run tests
pytest
```

## 📝 API Documentation

Once the server is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🔒 Security Features

- CORS protection
- Input validation with Pydantic
- Environment-based configuration
- SQL injection prevention with SQLAlchemy

## 🎯 Demo Ready

This backend is designed to support your Walmart AI Dashboard demo with:
- ✅ All 6 frontend pages supported
- ✅ Realistic mock data
- ✅ Interactive calculations
- ✅ Professional API documentation
- ✅ Easy setup and deployment

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

2. **Module not found**
```bash
# Ensure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

3. **CORS errors**
- Check that your frontend URL is in ALLOWED_ORIGINS
- Verify the API is running on port 8000

## 📞 Support

For issues or questions:
1. Check the API documentation at `/docs`
2. Verify all endpoints are working at `/health`
3. Check logs for detailed error messages

---

**Ready to power your Walmart AI Dashboard! 🚀**