// server.js
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 5900;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Check if the path matches /api/get-ram
  if (url.pathname === '/api/get-ram') {
    const response = JSON.stringify({ ram_mb: 1024 });
    ws.send(response);
  } else {
    ws.send(JSON.stringify({ error: "Path not found" }));
    ws.close();
  }
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
