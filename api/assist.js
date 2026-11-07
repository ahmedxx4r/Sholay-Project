const instructions = {
  translate: "ترجم النص إلى اللغة المطلوبة. إذا لم تُذكر اللغة، اسأل أو اختر الإنجليزية عند كون النص عربياً والعربية عند كون النص إنجليزياً. أخرج الترجمة بوضوح.",
  summarize: "لخّص النص مع الحفاظ على النقاط الأساسية والأرقام والقرارات. استخدم عناوين ونقاطاً عند الحاجة.",
  rewrite: "حسّن الصياغة والوضوح والنبرة مع الحفاظ على المعنى. لا تضف معلومات غير موجودة.",
  email: "اكتب بريداً إلكترونياً احترافياً مناسباً للموقف. لا تخترع أسماء أو عناوين أو وقائع.",
  seo: "قدّم تحسينات SEO عملية للنص تشمل عنواناً مقترحاً ووصف Meta وكلمات مفتاحية وتحسينات بنية، دون ضمان ترتيب في محركات البحث.",
  cv: "راجع السيرة الذاتية من ناحية اللغة والوضوح والإنجازات والتنسيق، وقدّم ملاحظات قابلة للتنفيذ. لا تخترع خبرات أو مؤهلات."
};
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const prompt = String((req.body && req.body.prompt) || "").trim().slice(0, 7000);
  const type = String((req.body && req.body.type) || "summarize");
  if (!prompt) return res.status(400).json({ error: "أدخل النص أو المطلوب." });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(200).json({ mode: "demo", result: "تم استلام المهمة. لتشغيل المعالجة الذكية الفعلية، أضف OPENAI_API_KEY في إعدادات Vercel ثم أعد النشر." });
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "أنت مساعد لغوي ومهني دقيق. نفّذ المهمة المطلوبة باللغة المناسبة. " + (instructions[type] || instructions.summarize) },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 1200
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error && data.error.message ? data.error.message : "تعذر تنفيذ المهمة." });
    return res.status(200).json({ mode: "live", result: data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "" });
  } catch (error) {
    return res.status(502).json({ error: "تعذر الاتصال بخدمة الذكاء الاصطناعي." });
  }
};