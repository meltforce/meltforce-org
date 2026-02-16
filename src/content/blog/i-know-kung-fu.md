---
title: "I Know Kung Fu"
date: 2026-01-25
tags: ["vibecoding", "claude", "opinion"]
description: "Four defining moments in 40 years of computing – and why Claude Code is the latest one."
draft: true
---

My history with computers goes back over 40 years, and there have been four defining moments in my relationship with this technology: my first computer (an Atari ST in 1986), my first time on the open internet (1994), my first conversation with [ChatGPT](https://chatgpt.com/) (2023) – and one that just happened.

## Finding Claude

After ChatGPT launched, I explored various AI assistants with growing curiosity. When I discovered [Claude](https://claude.ai/), something felt different. While competitors chased flashy features, [Anthropic](https://www.anthropic.com/) acted like the grown-up in the room — thoughtful, deliberate, and focused on building AI that's genuinely beneficial for the user.

Claude quickly became more than a chatbot to me. It helped set up my [Proxmox](https://www.proxmox.com/) cluster, debug network issues, and write scripts. I soon realized: Claude doesn't just explain how things work – it actually collaborates.

So I subscribed. Then I renewed for a year. I chatted, I copied, and I pasted. And right before New Year's, I installed [Claude Code](https://docs.anthropic.com/en/docs/claude-code).

And that changed everything.

## cast2md: From Idea to Production in Two Weeks

In January 2026, I built [cast2md](https://cast2md.meltforce.org) – a full-stack podcast transcription service. Two weeks, 431 commits. Running in production on my own infrastructure.

I'm by no means a professional developer – I'm a 52-year-old IT guy who spent years in enterprise consulting and management and wrote my last serious piece of code over 20 years ago. But with Claude Code, I shipped a real product. Concepts I only knew from theory suddenly made sense through building.

The idea was simple: I wanted to turn podcast RSS feeds into a searchable, LLM-ready transcript library. What came out of it was anything but simple:

- **Transcript-first workflow** — cast2md checks for publisher-provided transcripts ([Podcasting 2.0](https://podcasting2.org/)) and [Pocket Casts](https://pocketcasts.com/) before falling back to local Whisper transcription. No wasted compute.
- **Hybrid search** — full-text search via [PostgreSQL](https://www.postgresql.org/)'s tsvector combined with semantic search via [pgvector](https://github.com/pgvector/pgvector) embeddings, fused through Reciprocal Rank Fusion. You can search by keyword, by meaning, or both.
- **MCP server for Claude** — a full [Model Context Protocol](https://modelcontextprotocol.io/) integration that lets Claude search transcripts, summarize episodes, and explore topics across an entire podcast library.
- **Distributed transcription** — remote worker nodes on M4 Macs, GPU PCs, or [RunPod](https://www.runpod.io/) pods that poll for work and transcribe in parallel. Scales from a single laptop to a fleet of GPUs.
- **Web UI, REST API, and CLI** — a dashboard for managing feeds and episodes, a complete API for automation, and a CLI for everything else.

The stack: [FastAPI](https://fastapi.tiangolo.com/), PostgreSQL with pgvector, [faster-whisper](https://github.com/SYSTRAN/faster-whisper) and [mlx-whisper](https://github.com/ml-explore/mlx-examples) for transcription, [sentence-transformers](https://www.sbert.net/) for multilingual embeddings, [Docker](https://www.docker.com/) for deployment. All self-hosted, all open-source.

The [source code](https://github.com/meltforce/cast2md) is on GitHub, and the [project page](https://cast2md.meltforce.org) has the full documentation.

## The "I Know Kung Fu" Moment

It was suddenly like knowing a new language — a direct connection between intent and implementation. My personal "I know kung fu" moment. I'd describe what I wanted, Claude would write the code, I'd test and adjust, and the loop just kept going. Not copying snippets from [Stack Overflow](https://stackoverflow.com/). Not fighting with documentation. Actually building.
