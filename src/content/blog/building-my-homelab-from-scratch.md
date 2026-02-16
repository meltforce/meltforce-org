---
title: "Building my Homelab from Scratch"
date: 2026-02-16
tags: ["homelab", "docker", "networking"]
description: "How I set up my self-hosted infrastructure with Docker, Caddy, and way too many containers."
draft: false
toc: true
---

Every nerd eventually arrives at the same conclusion: why pay someone else to host your stuff when you can do it yourself, for twice the cost and ten times the effort?

## The Hardware

I started with a refurbished mini PC — an Intel NUC with 32GB RAM and a 1TB NVMe. Nothing fancy. The goal was to run everything I need without the fan noise of a full rack server in my Berlin apartment.

## The Stack

The core stack is simple:

- **Caddy** as reverse proxy — automatic HTTPS, clean config
- **Docker Compose** for everything — one `docker-compose.yml` per service
- **Tailscale** for remote access — no port forwarding, no VPN config pain

```yaml
services:
  caddy:
    image: caddy:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
```

## Services Running

Right now I'm self-hosting:

- **Gitea** — lightweight Git hosting
- **Vaultwarden** — Bitwarden-compatible password manager
- **Uptime Kuma** — monitoring dashboard
- **Plausible** — privacy-friendly analytics
- **Miniflux** — RSS reader

## Lessons Learned

1. **Backups are not optional.** I learned this the hard way when a Docker volume disappeared after an update.
2. **DNS is always the problem.** Always.
3. **Start simple.** You don't need Kubernetes. You probably don't even need Docker Swarm. A single `docker-compose.yml` goes a long way.

The homelab is never "done" — and that's kind of the point.
