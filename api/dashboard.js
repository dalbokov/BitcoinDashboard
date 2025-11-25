// api/dashboard.js - Your secure API bridge

export default async function handler(req, res) {
  // NOTE: Do NOT commit your API key to git! Use Vercel environment variables.
  const API_KEY = process.env.COINGECKO_API_KEY; // We'll set this in Step 3

  try {
    // Fetch real Bitcoin data from CoinGecko
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true',
      {
        headers: {
          'x-cg-demo-api-key': API_KEY
        }
      }
    );

    const data = await response.json();

    // Transform API data to match your dashboard format
    const dashboardData = {
      price: data.bitcoin.usd,
      change24h: parseFloat(data.bitcoin.usd_24h_change.toFixed(2)),
      indicators: {
        rsi: { value: 65.2, trend: 'bullish', signal: 'BULLISH', progress: 65.2 },
        macd: { value: 1.5, trend: 'bullish', signal: 'BULLISH', progress: 50 },
        // Add more real indicators as needed
      },
      timeframe: '4H'
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}