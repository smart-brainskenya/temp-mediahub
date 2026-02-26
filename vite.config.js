import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom plugin to handle asset requests in dev mode
const assetRequestPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/request-asset') {
        const logPath = path.resolve(__dirname, 'logs/asset-requests.json');

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const newRequest = JSON.parse(body);
              
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

        if (req.method === 'GET') {
          try {
            let logs = [];
            if (fs.existsSync(logPath)) {
              const fileContent = fs.readFileSync(logPath, 'utf-8');
              logs = fileContent ? JSON.parse(fileContent) : [];
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(logs));
          } catch (err) {
            console.error('Error reading logs:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read logs' }));
          }
          return;
        }
      }

      // Handle fulfillment (local only)
      if (req.method === 'POST' && req.url === '/api/fulfill-request') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const { id } = JSON.parse(body);
            const logPath = path.resolve(__dirname, 'logs/asset-requests.json');
            
            if (fs.existsSync(logPath)) {
              const fileContent = fs.readFileSync(logPath, 'utf-8');
              let logs = JSON.parse(fileContent);
              
              const index = logs.findIndex(r => r.id === id);
              if (index !== -1) {
                logs[index].status = 'fulfilled';
                fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Request not found' }));
              }
            }
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Fulfillment failed' }));
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
