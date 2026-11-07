# Sholay

موقع Sholay الرسمي: شركة تقنية تقدم حلول الذكاء الاصطناعي، الأتمتة، وتطوير المنتجات الرقمية.

## الخدمات
- AI Assistants & Chatbots
- Voice AI Agents
- Workflow Automation
- AI Content Creation
- Data Analytics & Reporting
- Document AI / OCR
- Translation & Summarization
- SEO Support
- Web & Mobile App Development
- API Integrations
- Sales & Email Automation
- UI/UX Design
- Custom AI Engineering

## الأدوات المضمنة
- AI Chat Assistant (OpenAI API)
- Content Studio (OpenAI API)
- AI Workspace: translate, summarize, rewrite, email, SEO, CV review (OpenAI API)
- JSON Formatter / Minifier
- CSV Preview Analyzer (local browser processing)
- Text Lab
- UTM Link Builder
- Secure Password Generator (Web Crypto)
- Base64 Encoder / Decoder
- Image Compressor (browser canvas; local processing)
- Contact intake via configured webhook

## إعداد Vercel
اضبط Root Directory على `.` (جذر المستودع). يستخدم المشروع Vercel Functions داخل مجلد `api/`.

متغيرات البيئة:
- `OPENAI_API_KEY`: مفتاح سري، ويظل على الخادم فقط.
- `OPENAI_MODEL`: اختياري؛ القيمة الافتراضية `gpt-4o-mini`.
- `LEADS_WEBHOOK_URL`: اختياري لاستقبال طلبات التواصل عبر Webhook آمن.

أعد النشر بعد تعديل متغيرات البيئة.

## التشغيل محلياً
```bash
npm i -g vercel
vercel dev
```

## الأمان والخصوصية
- لا تضع مفاتيح API أو ملفات `.env` الحقيقية داخل المستودع.
- أدوات CSV والنصوص وكلمات المرور وBase64 وضغط الصور تعمل محلياً داخل المتصفح.
- ميزات الذكاء الاصطناعي ترسل النص الذي يدخله المستخدم إلى OpenAI عند إعداد المفتاح.
- لا يتم الادعاء بحفظ طلبات التواصل إلا بعد نجاح Webhook.

## الموقع
https://sholay-egypt-ai.vercel.app
