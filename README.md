# सक्षम · SAKSHAM AI

> *Capable. Competent. Powerful.* — Your personal AI assistant, powered by Claude.

---

## 🚀 Deploy in 5 minutes (Netlify — Free)

### Step 1 — Upload to GitHub
1. Create a new repo on [github.com](https://github.com) (e.g. `saksham-ai`)
2. Upload all three files keeping the folder structure:
   ```
   saksham-ai/
   ├── index.html
   ├── netlify.toml
   └── netlify/
       └── functions/
           └── chat.js
   ```

### Step 2 — Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) → **Sign up free** (use your GitHub account)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub → select your `saksham-ai` repo
4. Build settings — leave everything blank (auto-detected from `netlify.toml`)
5. Click **Deploy site** — done in ~30 seconds!

### Step 3 — Add your API Key (Secret)
1. In Netlify dashboard → your site → **Site configuration → Environment variables**
2. Click **Add a variable**:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-...` (your key from [console.anthropic.com](https://console.anthropic.com))
3. Click **Save** → go to **Deploys** → **Trigger deploy** → **Deploy site**

✅ Your site is live! Visitors can chat without ever seeing your API key.

---

## 📁 File Structure

```
├── index.html                  # The full frontend UI
├── netlify.toml                # Netlify config (functions folder)
└── netlify/
    └── functions/
        └── chat.js             # Backend proxy — holds your secret key
```

**How it works:**
- Visitors open your site → chat with Saksham
- Frontend sends messages to `/.netlify/functions/chat`
- The function (running on Netlify's servers) calls Claude with your secret key
- Response is sent back to the visitor — key is **never** exposed

---

## ✨ Features
- 🤖 Real Claude AI (claude-sonnet-4) — not scripted
- 💬 Full conversation memory within a session
- 🎤 Voice input (Chrome/Edge)
- 📝 Markdown + syntax-highlighted code rendering
- ⚡ Animated thinking indicator
- 🌙 Stunning dark cyberpunk UI with Sanskrit/Hindi aesthetic
- 📱 Mobile responsive

---

## 🔑 Getting an Anthropic API Key
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy and paste into Netlify environment variables

*Note: Anthropic charges per token used. Monitor usage in your console.*

---

## 🛡 Security
- Your API key lives **only** in Netlify's encrypted environment variables
- The function validates and sanitizes all incoming messages
- Messages are capped at 8000 chars each, history capped at 40 messages

---

*Built with ❤️ — सक्षम means capable, competent, and powerful.*
