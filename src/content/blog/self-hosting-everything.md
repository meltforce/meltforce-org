---
title: "Self-Hosting Everything"
date: 2026-02-03
tags: ["homelab", "privacy", "selfhosted"]
description: "Why I moved off cloud services and what I'm running instead."
draft: false
---

At some point I realized I was paying five different SaaS companies to do things a single Linux box could handle. So I stopped.

## The Migration

Moving off cloud services wasn't instant. It took about two months of evenings and weekends. The hardest part wasn't the technical setup — it was convincing myself that my own infrastructure would be reliable enough.

Spoiler: it is. Mostly.

## What I Replaced

| Cloud Service | Self-Hosted Alternative |
|--------------|------------------------|
| LastPass | Vaultwarden |
| Feedly | Miniflux |
| Google Analytics | Plausible |
| GitHub (private) | Gitea |
| UptimeRobot | Uptime Kuma |

## The Trade-offs

**Pros:**
- Full control over my data
- No monthly subscription creep
- Learning experience
- It's fun

**Cons:**
- You're the sysadmin now
- Backups are your problem
- Updates are your problem
- Everything is your problem

## Is It Worth It?

For me, absolutely. Not because it saves money (it doesn't, once you factor in time). But because I understand every piece of my stack, I control my data, and I've learned more about networking, DNS, and Linux administration in six months than in the previous five years.

If you're the kind of person who reads this blog, you probably already know if this is for you.
