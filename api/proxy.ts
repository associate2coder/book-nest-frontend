export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  const backendBaseURL = "http://ec2-3-84-50-78.compute-1.amazonaws.com:8080";

  // Debug: Log incoming request
  console.log(`[Proxy] Incoming request: ${req.method} ${req.url}`);

  try {
    // Extract API path after `/api/`
    const url = new URL(req.url);
    const backendPath = url.pathname.replace(/^\/api\//, ""); // Remove "/api/"
    const targetURL = `${backendBaseURL}/${backendPath}`;

    // Debug: Log the full request being proxied
    console.log(`[Proxy] Forwarding request to: ${targetURL}`);

    // Fetch the backend response
    const response = await fetch(targetURL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: req.method !== "GET" ? await req.text() : undefined,
    });

    // Debug: Log backend response status
    console.log(`[Proxy] Backend responded with status: ${response.status}`);

    // Ensure the response body is handled properly
    const body = await response.text();

    // Debug: Log backend response body (for small responses)
    console.log(`[Proxy] Backend response body: ${body.substring(0, 100)}...`); // Log first 100 chars

    return new Response(body, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error(`[Proxy] Error fetching from backend: ${error}`);

    return new Response(JSON.stringify({ error: "Proxy failed to fetch backend" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
