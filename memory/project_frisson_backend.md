---
name: Frisson Backend
description: Supabase + Admin panel setup for Frisson app — credentials and architecture
type: project
---

Anastasia Zvanok (anastasiyazvanok@gmail.com) is building Frisson — Russian-language wellness app.
She is publishing to App Store eventually but wants full professional infrastructure built first.
She wants to upload her own meditations monthly via an admin panel.

**Stack:**
- Supabase (EU Frankfurt region, GDPR compliant)
  - URL: https://klcunkatwofjeasioolm.supabase.co
  - Anon/publishable key: sb_publishable_7i6XtISW8Lr0t5v7hpbKPw_fFQVWae3
  - (Service role key NOT shared — only needed for admin panel server-side ops)
- Admin panel: React + Vite, deployed to Vercel as `frisson-admin.vercel.app`
- App: Existing React/Vite PWA at C:\Users\jarvi\frisson\

**Scope for content types:**
- Meditations: название, краткое+полное описание, раздел (Ресурс/Женское/Получать/Новый уровень/Своё), длительность, MP3, обложка, free/premium, порядок, активна, дата публикации
- Books, Tests, Situations — same admin flow
- Users (Apple Sign-In + Email), diary sync, psycap history sync
- Stripe web + StoreKit iOS for Premium subscriptions

**Admin folder:** C:\Users\jarvi\frisson-admin\
