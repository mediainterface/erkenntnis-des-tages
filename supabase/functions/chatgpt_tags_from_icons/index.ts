import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // This is needed to invoke the function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { query } = await req.json();

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    const { data, error } = await supabaseClient.from("poll_tags").select("*");
    if (error) throw error;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
        },
        body: JSON.stringify(
          {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content":
                  "Es existieren ausschließlich folgende Kategorien: 'Tiere und Natur', 'Essen und Gesundheit', 'Kunst und Kultur', 'Politik und Recht', 'Technik und Medien', 'Sport und Freizeit', 'Glaube und Religion', 'Wirtschaft und Geschichte', 'Psychologie und Philosophie', 'Stupid People' und 'Sonstiges'. Du musst dich für exakt eine der existierenden Kategorien entscheiden. Bitte gib nur die Kategorie aus und keinen weiteren Text. Bitte weise folgende Icon-Kombination einer dieser Kategorien zu.",
              },
              {
                "role": "user",
                "content": query,
              },
            ],
            "temperature": 0,
          },
        ),
      },
    );
    const { data2, errors } = await response.json();

    return new Response(
      JSON.stringify({ answer: data2.choices[0].message.content }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/chatgpt_tags_from_icons' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
