# Triagix — Backend Form Setup Guide

## What This Does

Every form submission on triagix.ai:
1. Validates name + email (client + server side)
2. Blocks bots via honeypot field
3. Sends a formatted HTML email to david@triagix.ai via Resend
4. Optionally logs the submission to a Supabase table
5. Shows a success confirmation to the user

---

## Step 1 — Get Your Resend API Key (free)

1. Go to https://resend.com and create a free account
2. Click **API Keys** in the left sidebar
3. Click **Create API Key** → name it `triagix-prod`
4. Copy the key — it starts with `re_`
5. **Important:** Verify your sending domain `triagix.ai` in Resend:
   - Go to **Domains** → Add Domain → enter `triagix.ai`
   - Resend gives you DNS records to add in Namecheap
   - Add them and click Verify (takes ~10 min)

---

## Step 2 — Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these:

| Variable Name           | Value                    | Required |
|------------------------|--------------------------|----------|
| `RESEND_API_KEY`        | `re_xxxxxxxxxxxxxxxxxxxx` | ✅ Yes   |
| `TO_EMAIL`              | `david@triagix.ai`        | Optional (defaults to david@triagix.ai) |
| `SUPABASE_URL`          | `https://xxx.supabase.co` | Optional |
| `SUPABASE_SERVICE_KEY`  | `eyJxxxxxxxxxx`           | Optional |

4. Set environment to **Production** (and Preview if you want)
5. Click **Save**
6. **Redeploy** your project for the variables to take effect

---

## Step 3 — Set Up Supabase (Optional — stores every submission)

If you want a database of every lead:

1. Go to https://supabase.com → New project
2. Go to **SQL Editor** and run this:

```sql
create table submissions (
  id         bigserial primary key,
  name       text not null,
  email      text not null,
  org        text,
  timestamp  timestamptz not null,
  source     text,
  created_at timestamptz default now()
);
```

3. Go to **Settings** → **API**
4. Copy your **Project URL** → `SUPABASE_URL`
5. Copy the **service_role** key → `SUPABASE_SERVICE_KEY`
6. Add both to Vercel environment variables (Step 2 above)

---

## Step 4 — Add Files to Your GitHub Repo

Add these two files to your existing triagix-vite repo:

```
triagix-vite/
├── api/
│   └── submit.js        ← ADD THIS (serverless function)
├── src/
│   └── App.jsx          ← REPLACE Contact() with contents of Contact.jsx
├── index.html
├── vite.config.js
├── package.json
└── vercel.json          ← already exists, no change needed
```

**To update App.jsx:**
- Open `src/App.jsx` in GitHub
- Find the existing `const Contact = () => {` function
- Replace the entire Contact function with the contents of `Contact.jsx`
- Commit the change

**To add api/submit.js:**
- In GitHub, click **Add file** → **Create new file**
- Name it `api/submit.js`
- Paste the contents of `api/submit.js`
- Commit

---

## Step 5 — Test It

After deploying:

1. Go to triagix.ai → scroll to the form
2. Submit with your own email
3. Check david@triagix.ai inbox — you should see the notification email
4. If Supabase is connected, check the `submissions` table

To test the serverless function directly:
```bash
curl -X POST https://triagix.ai/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","org":"Test Org"}'
```

Expected response:
```json
{"success":true,"message":"Request received. We'll be in touch within 24 hours."}
```

---

## Environment Variables Summary

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional — defaults to david@triagix.ai
TO_EMAIL=david@triagix.ai

# Optional — only if using Supabase logging
SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## How Spam Protection Works

1. **Honeypot field** — a hidden input that real users never see. Bots fill it automatically. If it's filled, the submission is silently discarded.
2. **Server-side validation** — name length, email format, field length limits all enforced on the server.
3. **Rate limiting** — Vercel automatically rate-limits serverless function invocations.
4. **No exposed keys** — `RESEND_API_KEY` lives only in Vercel environment variables, never in client-side code.

---

## Questions?

david@triagix.ai
