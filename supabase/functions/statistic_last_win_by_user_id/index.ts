import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { corsHeaders } from "../_shared/cors.ts";

const getTagsFromSupabase = async (req: Request): Promise<string> => {
    const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        {
            global: {
                headers: { Authorization: req.headers.get("Authorization")! },
            },
        },
    );
    const { data, error } = await supabaseClient.from("poll_tags").select("value");
    if (error) throw error;
    const tagsArray: string[] = data.map(tag => `'${tag.value}'`);
    return tagsArray.join(", ");
}

const getTagSuggestionFromChatGpt = async (query: string, tagsString: string): Promise<string> => {
    const chatGptResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
                                `Es existieren ausschließlich folgende Kategorien: ${tagsString}. Du musst dich für exakt eine der existierenden Kategorien entscheiden. Bitte gib nur die Kategorie aus und keinen weiteren Text. Bitte weise folgende Icon-Kombination einer dieser Kategorien zu.`,
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
    const chat = await chatGptResponse.json();
    if (chat.errors) throw new Error(chat.errors[0].message);
    const suggestion: string = chat.choices[0].message.content;

    if (!tagsString.includes(suggestion)) {
        throw new Error(`Suggestion (${suggestion}) does not match provided categories.`);
    }

    return suggestion;
}

Deno.serve(async (req) => {
    // This is needed to invoke the function from a browser.
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const { query } = await req.json();

    try {
        const tagsString = await getTagsFromSupabase(req);
        const suggestion = await getTagSuggestionFromChatGpt(query, tagsString);
        return new Response(JSON.stringify({ suggestion: suggestion }), {
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