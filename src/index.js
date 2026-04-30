// Helper to allow your frontend to talk to this backend
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allows any domain to connect
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  // ---------------------------------------------------------
  // 1. WEB TRAFFIC HANDLER (Exporting/Importing)
  // ---------------------------------------------------------
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight (Browser security check)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Health Check Route
    if (url.pathname === "/api/health") {
      return new Response("API is active and ready!", { headers: corsHeaders, status: 200 });
    }

    // --- RATE LIMITING (Stop Spam) ---
    // 1. Get the user's IP address
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    
    // 2. Check the Rate Limiter
    const { success } = await env.RATE_LIMITER.limit({ key: ip });
    
    if (!success) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait 1 minute." }), { 
        status: 429, // 429 means "Too Many Requests"
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // -- EXPORT ROUTE (Frontend sends JSON, gets a PIN) --
    if (url.pathname === "/api/export" && request.method === "POST") {
      try {
        const payload = await request.text(); // Get the giant JSON string
        
        // Generate a random 5-digit PIN (e.g., "49285")
        const pin = Math.floor(10000 + Math.random() * 90000).toString();

        // Save it to the D1 Database
        await env.DB.prepare(
          `INSERT INTO sync_data (pin, payload) VALUES (?, ?)`
        ).bind(pin, payload).run();

        // Return the PIN to the user
        return new Response(JSON.stringify({ pin: pin }), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to save data" }), { 
          status: 500, headers: corsHeaders 
        });
      }
    }

    // -- IMPORT ROUTE (Frontend sends PIN, gets JSON back) --
    if (url.pathname === "/api/import" && request.method === "GET") {
      const pin = url.searchParams.get("pin");
      if (!pin) return new Response(JSON.stringify({ error: "Missing PIN" }), { status: 400, headers: corsHeaders });

      try {
        // Look up the payload using the PIN
        const result = await env.DB.prepare(
          `SELECT payload FROM sync_data WHERE pin = ?`
        ).bind(pin).first();

        if (!result) {
          return new Response(JSON.stringify({ error: "Invalid or expired PIN" }), { status: 404, headers: corsHeaders });
        }

        // Return the massive JSON string back to the new device
        return new Response(result.payload, { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to load data" }), { 
          status: 500, headers: corsHeaders 
        });
      }
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },

  // ---------------------------------------------------------
  // 2. CRON TRIGGER (Auto-deletes data older than 15 mins)
  // ---------------------------------------------------------
  async scheduled(event, env, ctx) {
    const cleanupQuery = `
      DELETE FROM sync_data 
      WHERE created_at < datetime('now', '-15 minutes');
    `;
    try {
      await env.DB.prepare(cleanupQuery).run();
      console.log("Auto-cleanup successful. Old PINs deleted.");
    } catch (error) {
      console.error("Database cleanup failed:", error.message);
    }
  }
};
