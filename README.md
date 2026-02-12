# Frontend – Real-Time Chat Application (Next.js) 💬

This is the **Next.js frontend** for the Real-Time Chat Application.  
It is **deployed on AWS EC2** and communicates with backend microservices over HTTP and WebSockets.

---

## 🚀 Tech Stack

- Next.js
- React
- Socket.IO Client
- JWT Authentication
- Axios / Fetch API

---

## 🌐 AWS Deployment

The frontend is deployed on an **AWS EC2 instance**.

### 🔹 EC2 Public IP : 51.21.219.172

### 🔹 Frontend Port : 3003


### 🔹 Live URL
👉 **http://51.21.219.172:3003**

You can open this URL in a browser to access the application.

---

## 🔌 Backend Integration

The frontend connects to the following backend services:

| Service | Purpose | URL |
|------|-------|-----|
| User Service | Authentication | http://51.21.219.172:3000 |
| Mail Service | Email notifications | http://51.21.219.172:3001 |
| Chat Service | Real-time chat (WebSocket) | http://51.21.219.172:3002 |

---

## 🔐 Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
NEXT_PUBLIC_USER_SERVICE_URL=http://51.21.219.172:3000
NEXT_PUBLIC_CHAT_SERVICE_URL=http://51.21.219.172:3002

▶️ Running Locally
npm install
npm run dev

Local access:
http://localhost:3003
