module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const prompt = String((req.body && req.body.prompt) || "").trim().slice(0, 2000);
  const type = String((req.body && req.body.type) || "marketing").slice(0, 40);
  if (!prompt) return res.status(400).json({ error: "اكتب وصف المحتوى المطلوب." });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(200).json({ mode: "demo", result: "مسودة تجريبية\n\n" + prompt + "\n\nلإنشاء محتوى ذكي مخصص، أضف OPENAI_API_KEY إلى إعدادات Vercel." });
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", messages: [{ role: "system", content: "أنت كاتب محتوى محترف. اكتب مخرجات أصلية وواضحة وجاهزة للتحرير باللغة العربية ما لم يطلب المستخدم غير ذلك." }, { role: "user", content: "نوع المحتوى: " + type + "\nالمطلوب: " + prompt }], temperature: 0.7, max_tokens: 700 })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error && data.error.message ? data.error.message : "تعذر توليد المحتوى." });
    return res.status(200).json({ mode: "live", result: data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "" });
  } catch (error) { return res.status(502).json({ error: "فشل الاتصال بخدمة الذكاء الاصطناعي." }); }
};