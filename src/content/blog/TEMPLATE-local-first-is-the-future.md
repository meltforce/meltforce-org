---
title: "TEMPLATE Local-First Is the Future We Were Promised"
date: 1974-03-21
tags: ["opinion", "local-first", "privacy"]
description: "Why I think the tide is finally turning away from cloud-everything."
draft: true
---

There's a quiet shift happening in how we build software, and I think most people are sleeping on it.

For the last fifteen years, the default answer to "where does the data live?" was always the same: someone else's computer. Your notes, your files, your passwords, your conversations — all funneled through APIs into data centers you'll never see.

That model worked. It scaled. And it made a handful of companies very rich. But it also made us dependent in ways we didn't sign up for.

## The Problem With Cloud-Everything

We've all felt it. The app you relied on gets acquired and sunsets. The API changes and your workflow breaks. The service goes down and you're locked out of your own stuff. Or worse: prices go up because they know you can't leave.

This isn't a bug. It's the business model.

## What Local-First Actually Means

Local-first doesn't mean offline-only. It means your device is the source of truth. The network is there for sync, for collaboration, for backup — but it's not a hard dependency. If the server disappears tomorrow, your data is still on your machine.

Projects like CRDTs, Automerge, and SQLite-based sync engines are making this technically viable in ways it wasn't five years ago. The tooling has caught up with the philosophy.

## Why Now

Three things changed:

1. **Devices got powerful enough.** Your phone has more compute than most servers did in 2010. There's no reason to round-trip to a cloud for basic operations.
2. **People got burned enough.** Every shutdown, every price hike, every privacy scandal chips away at the trust model that cloud-first depends on.
3. **AI runs locally now.** When you can run a capable LLM on a MacBook, the last argument for cloud — that you need remote compute for heavy lifting — starts to crumble.

## What I'm Betting On

I'm building my projects with this in mind. Data stays local by default. Sync is opt-in. The server is a convenience, not a requirement.

It's more work upfront. But it means my stuff works on a plane, works when Cloudflare is down, and works ten years from now even if I stop paying someone a monthly fee.

That's the future we were promised. We just forgot to demand it.
