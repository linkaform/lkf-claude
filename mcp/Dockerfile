FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir "fastmcp>=2.0.0"
COPY server.py .
CMD ["python3", "server.py"]
