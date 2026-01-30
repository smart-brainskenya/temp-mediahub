import { put, list } from '@vercel/blob';

const BLOB_FILENAME = 'asset-requests.json';
const CUSTOM_TOKEN = process.env.mediahub_READ_WRITE_TOKEN;

async function getBlobData() {
  // Safety check for your custom token name
  if (!CUSTOM_TOKEN) {
    return { version: 1, requests: [] };
  }

  try {
    // Pass token explicitly since it's not using the default BLOB_READ_WRITE_TOKEN name
    const { blobs } = await list({ token: CUSTOM_TOKEN });
    const blob = blobs.find(b => b.pathname === BLOB_FILENAME);
    
    if (!blob) {
      return { version: 1, requests: [] };
    }

    const response = await fetch(blob.url);
    if (!response.ok) {
      throw new Error('Failed to fetch blob data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blob data:', error);
    return { version: 1, requests: [] };
  }
}

export default async function handler(req, res) {
  const hasToken = !!CUSTOM_TOKEN;

  if (req.method === 'POST') {
    try {
      const requestData = req.body;
      
      // LOGGING TO STDOUT
      console.log('NEW_ASSET_REQUEST:', JSON.stringify(requestData, null, 2));

      if (hasToken) {
        // 1. Read existing data
        const data = await getBlobData();
        
        // 2. Append new request
        if (!Array.isArray(data.requests)) {
          data.requests = [];
        }
        data.requests.push(requestData);

        // 3. Write back to Blob (passing token explicitly)
        await put(BLOB_FILENAME, JSON.stringify(data, null, 2), {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false,
          token: CUSTOM_TOKEN,
          allowOverwrite: true
        });
      } else {
        console.warn('mediahub_READ_WRITE_TOKEN missing. Request logged to console only.');
      }

      res.status(200).json({ success: true, message: 'Request processed successfully' });
    } catch (error) {
      console.error('Request Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else if (req.method === 'GET') {
    try {
      if (!hasToken) {
        return res.status(200).json({ 
          requests: [], 
          warning: 'BLOB_NOT_CONFIGURED' 
        });
      }

      const data = await getBlobData();
      const sortedRequests = (data.requests || []).sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      res.status(200).json(sortedRequests);
    } catch (error) {
      console.error('Error in GET handler:', error);
      res.status(500).json({ error: 'Failed to retrieve requests' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
