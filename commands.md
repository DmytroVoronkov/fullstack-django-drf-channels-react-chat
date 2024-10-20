# Run django server
cd ./webchat

uvicorn webchat.asgi:application --port 8000 --workers 4 --log-level debug --reload

# Run frontend
cd ./frontend
npm run dev