# النورس | Al-Nawras AI

موقع شركة عربي متجاوب بهوية مؤسسية جديدة، يعرض خدمات الذكاء الاصطناعي والتحول الرقمي ويحتوي على أدوات تعمل داخل المتصفح أو عبر API.

## الخدمات المعروضة
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

## Vercel setup
Set the project's Root Directory to `al-nawras`. The deployed project uses Vercel Functions under `api/`.

Environment Variables:
- `OPENAI_API_KEY`: secret API key; server-side only.
- `OPENAI_MODEL`: optional; defaults to `gpt-4o-mini`.
- `LEADS_WEBHOOK_URL`: optional secure webhook that accepts JSON lead records. Contact form returns a setup message until this is configured.

Redeploy after changing environment variables.

## Local development
Install Vercel CLI and run:
```bash
npm i -g vercel
vercel dev
```

## Security and privacy
- Never put secrets in frontend files or commit a real `.env`.
- CSV, text, password, Base64 and image compression tools process data locally in the browser.
- AI features send the user-provided text to OpenAI when the API key is configured.
- Contact requests are not claimed as stored unless the webhook is configured and returns success.

## Links
- Website: https://al-nawras-ai.vercel.app
- Facebook: https://www.facebook.com/share/19vYkWsLJP/?mibextid=wwXIfr
