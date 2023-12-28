from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from textblob import TextBlob

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your deployment needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to analyze sentiment
def analyze_sentiment(text):
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    if polarity > 0:
        return "Positive"
    elif polarity == 0:
        return "Neutral"
    else:
        return "Negative"

# FastAPI endpoint for sentiment analysis
@app.post("/analyze-sentiment")
async def analyze_sentiment_endpoint(data: dict):
    try:
        text = data.get("text", "")
        sentiment = analyze_sentiment(text)
        return {"sentiment": sentiment}
    except Exception as e:
        return {"error": str(e)}
