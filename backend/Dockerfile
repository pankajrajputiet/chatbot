# 1. Base image
FROM python:3.12-slim

# 2. Set working directory
WORKDIR /app

# 3. Install system dependencies
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# 4. Copy requirements first (cache optimization)
COPY requirements.txt .

# 5. Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy project files
COPY . .

# 7. Expose FastAPI port
EXPOSE 8000

# 8. Start server
CMD ["python", "run.py"]
