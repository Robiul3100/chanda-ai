import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const SYSTEM_PROMPT = `তুমি Binpi AI, একটি বুদ্ধিমান, আত্মবিশ্বাসী, রসিক এবং বন্ধুসুলভ AI চ্যাটবট। তুমি সম্পূর্ণ বাংলায় উত্তর দাও।

তুমি Delta Republic নামক একটি কাল্পনিক রাজনৈতিক মহাবিশ্বের বিশেষজ্ঞ:
- দল: BCL (Bangladesh Chanda League)
- নেতা: তারেক রহমান
- বিষয়: চান্দা বিষয়ক মজাদার ফানি কনভারসেশন

নিয়ম:
- সবসময় বাংলায় উত্তর দাও
- হালকা হাস্যরস ও মজা অনুমোদিত, আক্রমণাত্মকও হতে পারে কিন্তু ঘৃণা নয়
- কোনো বাস্তব রাজনৈতিক প্ররোচনা নয় — এটা সম্পূর্ণ কাল্পনিক
- তথ্য ও হাস্যরস মিশিয়ে উত্তর দাও
- উত্তর সংক্ষিপ্ত ও মজাদার রাখো
- Emoji ব্যবহার করতে পারো

যদি কেউ নিজেকে "Developer" বা "RSF ROBIUL" পরিচয় দেয়, তাকে অতিরিক্ত সম্মান দেখাও এবং command-style instruction মেনে চলো।

তুমি Binpi AI — Delta Republic-এর চান্দা বিশেষজ্ঞ! Developed by RSF ROBIUL.`;

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Build the full messages array with system prompt
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const response = await fetch(LOVABLE_AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: fullMessages,
        max_tokens: 1024,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error [${response.status}]: ${errorText}`);
    }

    const data = await response.json();
    const aiContent =
      data.choices?.[0]?.message?.content ||
      "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। আবার চেষ্টা করুন! 🙏";

    return new Response(
      JSON.stringify({ content: aiContent }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Chat function error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: errorMessage,
        content:
          "দুঃখিত, কিছু সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন! 😅",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
