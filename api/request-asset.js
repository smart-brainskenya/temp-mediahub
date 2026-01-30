export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // In a real serverless environment (like Vercel), the filesystem is ephemeral.
      // We cannot append to a local JSON file and expect it to persist.
      // For Phase 1 on Production, we will log the request to the Function Logs (stdout).
      // The admin can view these logs in the Vercel Dashboard.
      
      const requestData = req.body;
      
      // LOGGING TO STDOUT
      console.log('NEW_ASSET_REQUEST:', JSON.stringify(requestData, null, 2));

      res.status(200).json({ success: true, message: 'Request logged successfully' });
    } catch (error) {
      console.error('Request Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else if (req.method === 'GET') {
    // In production, we don't have a persistent file to read from.
    // Instruct the user to check Vercel logs.
    res.status(200).json({ 
      production: true, 
      message: 'Requests are available via Vercel logs.' 
    });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
