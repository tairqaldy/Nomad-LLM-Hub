# 🧠 Nomad LLM Hub

A lightweight SaaS interface to interact with multiple LLMs (ChatGPT, DeepSeek, Claude) on one platform.

## ✨ Features

- 🔐 Auth via Clerk (email or Google)
- 🧠 Chat with GPT-3.5, DeepSeek, Claude
- 📜 Prompt history + saved prompts
- 📤 Export prompts to .txt
- ✨ Prompt Enhancer page (rewrite your prompts)
- 💎 Premium logic built-in (with KaspiPay integration planned)
- 🌍 Freemium-ready for production

## 🔧 Stack

- Next.js (Pages Router)
- Clerk.dev for auth
- OpenAI / DeepSeek APIs
- LocalStorage for prompt save/export

## 💻 Run Locally

```bash
git clone https://github.com/tairqaldy/nomad-llm-hub.git
cd nomad-llm-hub
npm install
cp .env.example .env.local  # ← create your own keys
npm run dev
```
