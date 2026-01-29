import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to handle asset requests in dev mode
const assetRequestPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.method === 'POST' && req.url === '/api/request-asset') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const newRequest = JSON.parse(body);
            const logPath = path.resolve(__dirname, 'logs/asset-requests.json');
            
            // Read existing logs
            let logs = [];
            if (fs.existsSync(logPath)) {
              const fileContent = fs.readFileSync(logPath, 'utf-8');
              logs = fileContent ? JSON.parse(fileContent) : [];
            }
            
            // Append new request
            logs.push(newRequest);
            
            // Write back to file
            fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            console.error('Error logging request:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to log request' }));
          }
        });
        return;
      }
      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), assetRequestPlugin()],
})
