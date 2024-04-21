import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
    // This is needed to invoke the function from a browser.
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const { userId } = await req.json();

    try {
        return new Response(JSON.stringify({ date: "22-04-2024" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});