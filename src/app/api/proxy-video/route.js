export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');
  
  if (!fileName) {
    return new Response('fileName parameter is required', { status: 400 });
  }

  try {
    const videoUrl = `https://gourav-epic-caption.s3.amazonaws.com/${fileName}`;
    const response = await fetch(videoUrl);
    
    if (!response.ok) {
      return new Response('Video not found', { status: 404 });
    }

    const videoData = await response.arrayBuffer();
    
    return new Response(videoData, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        'Content-Length': response.headers.get('Content-Length') || videoData.byteLength.toString(),
        'Cache-Control': 'public, max-age=31536000',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
    });
  } catch (error) {
    console.error('Error proxying video:', error);
    return new Response('Error loading video', { status: 500 });
  }
}
