import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { corsHeaders } from "../_shared/cors.ts";

const getLastWinByUserIdFromSupabase = async (req: Request, userId: string): Promise<Date> => {
    const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        {
            global: {
                headers: { Authorization: req.headers.get("Authorization")! },
            },
        },
    );

    console.log("user uid: ", userId);

    const { data, error } = await supabaseClient.functions.invoke('statistic_last_win_by_user_id', {
        body: {
            user_id: userId,
        }
    })

    console.log("error: ", error);
    console.log("data: ", data);

    if (error) throw error;

    return data;
}

Deno.serve(async (req) => {
    // This is needed to invoke the function from a browser.
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const { userId } = await req.json();

    try {
        //const lastWinDate: Date = await getLastWinByUserIdFromSupabase(req, userId);

        return new Response(JSON.stringify({ date: "22-04-2024" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});