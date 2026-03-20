---
title: "Free Your Reps! (and your Health Data, too)"
date: 2026-03-20
tags: ["freereps", "health", "apple-health", "self-hosted", "mcp", "claude"]
description: "Get your Data out of your gadgets and do whatever you want"
---

Before Easter break, I'm releasing [FreeReps](https://freereps.meltforce.org/) — a self-hosted health data server with a companion iOS app, a web dashboard, and an MCP interface for Claude. It's been in the works for a while, and it's now ready.

## The Problem

Like most people with an Apple Watch, I've accumulated years of health data — heart rate, HRV, sleep stages, blood oxygen, respiratory rate, VO2 max, and quite a bit more. Apple Health is remarkably good at collecting all of this. What it's not good at is letting you do anything meaningful with it.

There's no way to correlate metrics with each other. No API for external analysis. No export into a queryable system you actually own. The best Apple offers is an XML dump of everything, which is technically complete but practically useless for the kind of questions I wanted to ask — things like "how does my sleep quality relate to my HRV the next morning?" or "did my resting heart rate actually improve since I started training more consistently?"

The App Store has plenty of alternatives, of course, but they all follow the same pattern: subscription pricing, closed-source algorithms, and proprietary "scores" that you're supposed to trust without understanding how they're computed. You're essentially moving your data from one black box to another.

What I wanted was straightforward: my own data, on my own server, queryable by me and by my AI tools. No subscriptions, no opaque scoring, no lock-in.

## What FreeReps Is

FreeReps (**F**reely hosted **Re**cords, **E**valuation & **P**rocessing **S**erver) has three components:

1. **A server** — a single Go binary that ingests health data, stores it in PostgreSQL with TimescaleDB for time-series, and serves a React-based web dashboard. It runs on your own hardware via Docker Compose, with encryption and authentication handled natively by [Tailscale](https://tailscale.com/).

2. **An iOS companion app** — syncs 85+ quantity types and 22 category types from HealthKit directly to your server over HTTPS/Tailscale. It supports full historical backfill, real-time background sync via HealthKit observer queries, and shows sync progress as a Live Activity on the lock screen. No cloud services sit in between.

3. **An MCP server** — exposes your health data to Claude (and any MCP-compatible LLM) via 8 tools and 3 resources. You can ask Claude about your sleep trends, correlate metrics, compare training periods — and it queries the data directly rather than relying on you to copy things over. 

The underlying design principle is deliberately simple: **raw data + flexible visualization + LLM for interpretation**. No scores, no algorithms deciding what matters for you. You look at the data yourself and ask your own questions.

## The Dashboard

The web dashboard provides several views for exploring the data:

- **Daily overview** — key metrics at a glance: sleep, HRV, resting heart rate, activity
- **Correlation explorer** — plot any metric against any other, with Pearson correlation coefficient
- **Sleep view** — hypnogram with stage breakdown, heart rate and HRV overlaid during sleep
- **Workout view** — HR zones, GPS route maps, and strength training sets (via [Alpha Progression](https://alphaprogression.com) CSV import)
- **Metrics deep dive** — time-series with moving averages and normal range bands
- **Saved views** — store correlation configurations for quick access

Everything runs in dark mode by default, because I have opinions.

## The MCP Integration

This was the part I was most looking forward to building. FreeReps functions as a full MCP server — both via stdio for local use with Claude Code and via SSE. (You may want to use [tsmcp](https://github.com/meltforce/tsmcp) to securely expose it over the internet.)

In practice, that means I can ask Claude things like:

- "How does my sleep duration correlate with my HRV?"
- "Compare my resting heart rate this month vs. last month."
- "What's my deep sleep trend over the last 90 days?"
- "Show me my last strength training session."

Claude queries the data directly — no manual exports, no screenshots, no intermediaries. Health data as a first-class resource for AI analysis. That was the whole point of the project, and it works well.

## The iOS App

The companion app was the last major piece to fall into place. It replaces the third-party export workflow I was using before ([Health Auto Export](https://apps.apple.com/app/health-auto-export-json-csv/id1115567069)) with a native HealthKit integration that syncs everything directly to the server.

The scope is fairly comprehensive: 85+ quantity types (heart rate, HRV, blood oxygen, weight, steps, nutrition — essentially the full HealthKit catalog), 22 category types (sleep stages, menstrual cycles, symptoms), plus workouts with GPS routes, ECG recordings, audiograms, and daily activity summaries. Background sync keeps things current without manual intervention.

The app is based on [HealthBeat](https://github.com/kempu/HealthBeat) by [Klemens Arro](https://github.com/kempu), who made his iOS health sync app available as open source under the MIT license. HealthBeat provided a solid foundation for the HealthKit integration, and I built on top of it to create the FreeReps companion. I'm grateful for his work — getting the HealthKit plumbing right is a substantial effort, and having a well-structured starting point saved me a lot of time.

The app is free on the [App Store](https://apps.apple.com/us/app/freereps/id6760661354).

## The Stack

For those interested in the technical details:

| Component | Technology |
|-----------|------------|
| Backend | Go (single binary with embedded frontend) |
| Frontend | React 19 + Vite + Tailwind CSS 4 |
| Charts | uPlot (time-series) + Recharts (bar/scatter) |
| Database | PostgreSQL + TimescaleDB |
| Auth | Tailscale tsnet (zero-config TLS + identity) |
| iOS App | Swift (HealthKit, BackgroundTasks, ActivityKit) |
| Deployment | Docker Compose |

The server compiles to a single binary with the React frontend embedded via Go's `embed` package. There's no reverse proxy needed, no separate frontend deployment — just the binary and a PostgreSQL database. Tailscale handles TLS and authentication natively through tsnet, so there are no passwords or API keys to manage.

## Open Source

FreeReps is MIT-licensed and available on [GitHub](https://github.com/meltforce/FreeReps). The project page with documentation is at [freereps.meltforce.org](https://freereps.meltforce.org/).

If you have an Apple Watch, a server or homelab, and a Tailscale account, you can have this running in about ten minutes with Docker Compose.

## Now: Easter

It's been a productive few months. Since I started building with Claude Code in January, I've shipped [cast2md](https://cast2md.meltforce.org), [MBOMail](https://mbomail.meltforce.org), [Voxtral Memos](https://voxtralmemos.meltforce.org), [vimmary](https://github.com/meltforce/vimmary) and now FreeReps. Each project involved a different stack and a different set of problems — Go, React, Swift, TimescaleDB, MCP, HealthKit — and each one started because I had a specific itch I wanted to scratch.

I am now using all of these tools every day, and I'm pretty happy with how things turned out. That said, I'm looking forward to stepping away for a bit — some time to reflect on what happened over the last three months and where to go from here.
