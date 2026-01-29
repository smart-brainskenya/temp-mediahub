export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      
      const requestData = req.body;
      
      // LOGGING TO STDOUT
      console.log('NEW_ASSET_REQUEST:', JSON.stringify(requestData, null, 2));

      res.status(200).json({ success: true, message: 'Request logged successfully' });
    } catch (error) {
      console.error('Request Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
