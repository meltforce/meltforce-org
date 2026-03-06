---
title: "Voxtral Memos — My First iOS App"
date: 2026-03-06
tags: ["vibecoding", "claude", "ios", "ai", "mistral"]
description: "Voxtral Memos — a privacy-first voice memo app for iOS, powered by Mistral AI."
socialImage: "src/assets/images/voxtral-memos-icon.png"
---
Three weeks ago I wrote about [publishing my first macOS app](/blog/mbomail-v1/). Today I'm following up with my first iOS app: [Voxtral Memos](https://voxtralmemos.meltforce.org/).

The idea is simple: record a voice memo, get an instant transcription, and optionally let AI summarize or transform the result. The transcription runs on Mistral's [Voxtral](https://mistral.ai/news/voxtral/) speech model, and the app follows a strict bring-your-own-key model — you plug in your own Mistral API key, the app sends audio directly to their API, and nothing else sits in between. No backend, no middleman.

## What It Does

- **Record and transcribe** voice memos with support for 13+ languages
- **Smart summaries** — extract bullet points, todo lists, or journal entries from your recordings
- **Custom templates** — write your own prompt templates for any transformation you need
- **Multilingual** — both the app and its built-in templates are available in English, German, French, Spanish, Italian, Portuguese, and Russian

## What It Doesn't Do

- **No account required** — no sign-up, no login, no user profiles
- **No tracking** — zero analytics, no telemetry, no third-party SDKs
- **No cloud storage** — everything stays on your device in SwiftData
- **No subscription** — the app is free, you only pay for what you use via the Mistral API (typically less than a dollar per month for casual use)

The API key is stored in the iOS Keychain. Audio only leaves your device when you explicitly request a transcription. There is no backend server.

## Why Mistral

I wanted a European AI provider with a strong speech model, and Mistral fits. They're GDPR-compliant, transparent about data handling, and don't use your inputs for training. Voxtral handles multilingual audio well, and the API pricing is reasonable — about $0.01 per five-minute transcription.

## Try It

Voxtral Memos is free and open-source. The app is on the [App Store](https://apps.apple.com/app/voxtral-memos/id6759565503), and the source code is on [GitHub](https://github.com/meltforce/voxtralmemos).
