export const config = {
  runtime: "edge", // ✅ Defines this as an Edge function
};

export default async function handler(req: Request): Promise<Response> {
  const backendBaseURL = "http://ec2-3-84-50-78.compute-1.amazonaws.com:8080";

  // Extract the API path dynamically
  const url = new URL(req.url);
  const backendPath = url.pathname.replace(/^\/api\//, "");
  const targetURL = `${backendBaseURL}/${backendPath}`;

  console.log(`Proxying request to: ${targetURL}`);

  try {
    const response = await fetch(targetURL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? await req.text() : undefined,
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch backend" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
