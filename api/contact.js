module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = req.body || {};
  const lead = {
    name: String(body.name || "").trim().slice(0, 100),
    email: String(body.email || "").trim().slice(0, 160),
    company: String(body.company || "").trim().slice(0, 120),
    message: String(body.message || "").trim().slice(0, 2000),
    createdAt: new Date().toISOString()
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.message)
    return res.status(400).json({ error: "تأكد من الاسم والبريد والرسالة." });
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) return res.status(503).json({ error: "نموذج التواصل جاهز، لكن حفظ الطلبات يحتاج إعداد LEADS_WEBHOOK_URL أو قاعدة بيانات." });
  try {
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    if (!r.ok) return res.status(502).json({ error: "تعذر تسليم طلبك لنظام استقبال العملاء." });
    return res.status(200).json({ ok: true, message: "وصلنا طلبك بنجاح. شكراً لتواصلك مع النورس." });
  } catch (e) { return res.status(502).json({ error: "تعذر الاتصال بنظام استقبال العملاء." }); }
};