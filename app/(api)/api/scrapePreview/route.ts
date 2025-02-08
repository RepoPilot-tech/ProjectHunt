import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { website } = await req.json();
    if (!website) {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    // Fetch the page HTML
    const response = await fetch(website, { headers: { 'User-Agent': 'Mozilla/5.0' } });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch webpage: ${response.statusText}` }),
        { status: response.status }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Convert relative URLs to absolute
    const absoluteUrl = (url: string | undefined | null) => {
      if (!url) return null;
      try {
        return new URL(url, website).href;
      } catch {
        return null;
      }
    };

    // Find metadata images
    const metadataImage = absoluteUrl(
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href')
    );

    if (metadataImage) {
      return new Response(JSON.stringify({ imageUrl: metadataImage }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: 'No metadata image found' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch preview' }), { status: 500 });
  }
}
