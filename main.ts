const PLAYLIST_URL =
  "https://raw.githubusercontent.com/Fahad-BD/iptv-deno/main/playlist.m3u";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Playlist
  if (url.pathname === "/" || url.pathname === "/playlist.m3u") {
    try {
      const response = await fetch(PLAYLIST_URL, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        return new Response("Failed to fetch playlist", { status: 500 });
      }

      const playlist = await response.text();

      return new Response(playlist, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    } catch {
      return new Response("Server Error", { status: 500 });
    }
  }

  // Health Check
  if (url.pathname === "/health") {
    return Response.json({
      status: "online",
      service: "GitHub IPTV Proxy",
    });
  }

  // Version
  if (url.pathname === "/version") {
    return Response.json({
      version: "1.0",
      updated: new Date().toISOString(),
    });
  }

  return new Response("404 Not Found", {
    status: 404,
  });
});
