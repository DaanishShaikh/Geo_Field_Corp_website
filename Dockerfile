# Multi-stage build: 1. Frontend Vue build, 2. Python Flask backend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.11-slim
WORKDIR /app

# Install system dependencies for WeasyPrint, PostgreSQL, and Pango/Cairo
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libpango-1.0-0 \
    libharfbuzz0b \
    libpangoft2-1.0-0 \
    libffi-dev \
    shared-mime-info \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend dist and backend sources
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist
COPY backend/ /app/backend/
COPY run.py /app/
COPY deploy/ /app/deploy/

ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=backend.app:app

EXPOSE 5000

CMD ["gunicorn", "-c", "deploy/gunicorn.conf.py", "backend.app:app"]
