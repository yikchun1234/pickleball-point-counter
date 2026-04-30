export default {
  // ---------------------------------------------------------
  // 1. WEB TRAFFIC HANDLER (For Exporting/Importing)
  // ---------------------------------------------------------
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Standard health check or placeholder route
    if (url.pathname === "/api/health") {
      return new Response("API is active.", { status: 200 });
    }

    // You will add your POST /api/export and GET /api/import logic here later
    
    return new Response("Not Found", { status: 404 });
  },

  // ---------------------------------------------------------
  // 2. CRON TRIGGER HANDLER (The Auto-Cleanup Script)
  // ---------------------------------------------------------
  async scheduled(event, env, ctx) {
    // D1 uses SQLite, which has a built-in datetime() function 
    // that makes finding old records incredibly easy.
    const cleanupQuery = `
      DELETE FROM sync_data 
      WHERE created_at < datetime('now', '-15 minutes');
    `;

    try {
      // Execute the query against the bound D1 database
      const result = await env.DB.prepare(cleanupQuery).run();
      
      // ctx.waitUntil ensures the worker doesn't shut down before logging is done
      console.log("Auto-cleanup successful. Old PINs deleted.");
    } catch (error) {
      console.error("Database cleanup failed:", error.message);
    }
  }
};
