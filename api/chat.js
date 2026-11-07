const SYSTEM = "أنت مساعد شركة النورس للذكاء الاصطناعي. أجب بالعربية المصرية الواضحة ما لم يطلب المستخدم لغة أخرى. كن دقيقاً وعملياً، ولا تخترع أسعاراً أو وعوداً أو تكاملات غير مؤكدة.";
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const message = String((req.body && req.body.message) || "").trim().slice(0, 3000);
  if (!message) return res.status(400).json({ error: "اكتب رسالتك أولاً." });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(200).json({ mode: "demo", reply: "أهلاً بك في النورس! استلمنا سؤالك. لتفعيل الردود الذكية الفعلية، أضف OPENAI_API_KEY في إعدادات Environment Variables على Vercel.\n\nيمكنك تجربة الأدوات المجانية أسفل الصفحة الآن." });
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", messages: [{ role: "system", content: SYSTEM }, { role: "user", content: message }], temperature: 0.6, max_tokens: 500 })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error && data.error.message ? data.error.message : "تعذر الاتصال بخدمة AI." });
    return res.status(200).json({ mode: "live", reply: data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "لم يصل رد." });
  } catch (error) { return res.status(502).json({ error: "تعذر الاتصال بخدمة الذكاء الاصطناعي." }); }
};