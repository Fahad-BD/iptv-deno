const playlist = await Deno.readTextFile("./playlist.m3u");

Deno.serve(() => {
  return new Response(playlist, {
    headers: {
      "Content-Type": "application/x-mpegURL",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache"
    },
  });
});
