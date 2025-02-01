import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const { website } = await req.json();
    if (!website) {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    // Fetch the page HTML
    const response = await fetch(website, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) {
      throw new Error('Failed to fetch webpage');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Try to find metadata images
    const metadataImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href');

    if (metadataImage) {
      // If metadata image found, return it
      return new Response(JSON.stringify({ imageUrl: metadataImage }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // If no metadata image, take a screenshot
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(website, { waitUntil: 'networkidle2' });

    const screenshotBuffer = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    return new Response(JSON.stringify({ imageUrl: `data:image/png;base64,${screenshotBuffer}` }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch preview' }), { status: 500 });
  }
}
