from fastapi import FastAPI

app = FastAPI(title="Smart Brick ML Service", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Brick ML Service API"}
