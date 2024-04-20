import "https://esm.sh/@supabase/supabase-js@2";
import { CreateCompletionRequest } from "https://esm.sh/openai@3.1.0";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const { query } = await req.json();

  const completionConfig: CreateCompletionRequest = {
    model: "gpt-3.5-turbo",
    prompt: query,
    max_tokens: 256,
    temperature: 0,
    stream: true,
  };

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionConfig),
  });

  // const { name } = await req.json();
  // const data = {
  //   message: `Hello ${name}!`,
  // };

  // return new Response(
  //   JSON.stringify(data),
  //   { headers: { "Content-Type": "application/json" } },
  // );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/chatgpt_tags_from_icons' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
