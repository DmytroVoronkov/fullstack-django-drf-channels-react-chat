# Run django server
uvicorn webchat.asgi:application --port 8000 --workers 4 --log-level debug --reload