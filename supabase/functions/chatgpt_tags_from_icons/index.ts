import "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const { query } = await req.json();

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content":
              "Es existieren ausschließlich folgende Kategorien: 'Tiere und Natur', 'Essen und Gesundheit', 'Kunst und Kultur', 'Politik und Recht', 'Technik und Medien', 'Sport und Freizeit', 'Glaube und Religion', 'Wirtschaft und Geschichte', 'Psychologie und Philosophie', 'Stupid People' und 'Sonstiges'. Du musst dich für exakt eine der existierenden Kategorien entscheiden. Bitte weise folgende Icon-Kombination einer dieser Kategorien zu.",
          },
          {
            "role": "user",
            "content": query,
          },
        ],
        "temperature": 0,
      },
    ),
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/chatgpt_tags_from_icons' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
