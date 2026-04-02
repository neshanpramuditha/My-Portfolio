# Chat Proxy Server

This backend server securely handles chat requests to the Google Gemini API.

## Features

✅ **Secure** - API key never exposed to frontend  
✅ **Rate Limited** - 10 requests per minute per IP  
✅ **CORS Protected** - Only responds to configured frontend URLs  
✅ **Error Handling** - Proper error messages and logging

## Setup

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

The `server/.env` file contains:

```env
PORT=3001
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.0-flash
FRONTEND_URL=http://localhost:5173,http://localhost:8080
```

**Important:** Update the `.env` file with your actual Gemini API key.

### 3. Run the Server

**Option A: Run server only**
```bash
npm run dev:server
```

**Option B: Run frontend and server together (recommended)**
```bash
npm run dev:all
```

This will start:
- Frontend on `http://localhost:5173` or `http://localhost:8080`
- Backend on `http://localhost:3001`

### 4. Test the Endpoint

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"role":"user","parts":[{"text":"Hello"}]}]}'
```

## Deployment

For production:

1. **Set Environment Variables:**
   - `GEMINI_API_KEY`: Your production Gemini API key
   - `PORT`: Your production port (default: 3001)
   - `FRONTEND_URL`: Your production frontend URL(s)

2. **Deploy to Service:**
   - Vercel: `npm install -g vercel && vercel --prod`
   - Heroku: `git push heroku main`
   - Railway: Connect GitHub repo and deploy
   - Self-hosted: `npm start`

3. **Update Frontend:**
   - Change `VITE_API_URL` in `.env` to your production backend URL

## Rate Limiting

The server limits requests to **10 per minute per IP address**. This prevents:
- API quota exhaustion
- Abuse from malicious users
- Unexpected charges

If you need higher limits, adjust in `server/index.js`:
```javascript
const limiter = rateLimit({
  windowMs: 60 * 1000,  // Time window
  max: 10,              // Max requests (increase this)
});
```

## Monitoring

Check server health:
```bash
curl http://localhost:3001/health
```

Response:
```json
{"status": "ok"}
```

## API Endpoints

### POST `/api/chat`

Proxies chat requests to Google Gemini API.

**Request:**
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{"text": "Your message"}]
    }
  ]
}
```

**Response:**
```json
{
  "candidates": [
    {
      "content": {
        "parts": [{"text": "Assistant response"}]
      }
    }
  ]
}
```

**Error Responses:**
- `429`: Rate limit exceeded
- `500`: API key not configured
- `503`: Gemini API error

---

**Questions?** Check `.env` configuration and server logs for debugging.
