import { put, list } from '@vercel/blob';

const BLOB_FILENAME = 'asset-requests.json';

async function getBlobData() {
  try {
    const { blobs } = await list();
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
    // Return empty structure on error to allow the app to function (e.g. initialize new file)
    return { version: 1, requests: [] };
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const requestData = req.body;
      
      // 1. Read existing data
      const data = await getBlobData();
      
      // 2. Append new request
      // Ensure requests is an array
      if (!Array.isArray(data.requests)) {
        data.requests = [];
      }
      data.requests.push(requestData);

      // 3. Write back to Blob
      // addRandomSuffix: false ensures we overwrite the same file
      await put(BLOB_FILENAME, JSON.stringify(data, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false
      });

      // 4. Log to console (Legacy/Debugging)
      console.log('NEW_ASSET_REQUEST:', JSON.stringify(requestData, null, 2));

      res.status(200).json({ success: true, message: 'Request logged and persisted successfully' });
    } catch (error) {
      console.error('Request Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await getBlobData();
      
      // Sort by timestamp descending (newest first)
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
