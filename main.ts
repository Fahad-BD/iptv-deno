const playlist = await Deno.readTextFile("./playlist.m3u");

Deno.serve((req) => {
  const url = new URL(req.url);

  // Playlist
  if (url.pathname === "/" || url.pathname === "/playlist.m3u") {
    return new Response(playlist, {
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Example endpoints
  if (url.pathname.startsWith("/play/")) {
    return new Response(
      "This endpoint is available. Connect it to your own streaming backend.",
      {
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  return new Response("Not Found", { status: 404 });
});
