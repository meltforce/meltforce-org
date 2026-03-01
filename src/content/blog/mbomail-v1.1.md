---
title: "MBOMail v1.1: Multi-Account Support"
date: 2026-03-01
tags: ["mbomail", "macos", "email"]
description: "MBOMail now supports multiple mailbox.org accounts with isolated sessions, color-coded identities, and flexible window management."
---

Two weeks after [the initial release](/blog/mbomail-v1), MBOMail gets its first feature update adding some functionality for multi-account users.

## Multiple Accounts

MBOMail v1.1 adds multi-account support. Each mailbox.org account gets its own isolated session — cookies, logins, and data are kept separate.

Accounts are managed in **Settings → Accounts**, where you can assign each one a name and color.

You can open any account from the **File** menu, the **menu bar icon**, or with **keyboard shortcuts**. Opening a second instance of the same account is also supported. Each account can open as a tab or a new window — hold **Option (⌥)** to toggle between the two modes.

Notifications now tell you _which_ account received a new message when you have more than one configured. And `mailto:` links route to your default account automatically.

Existing users have their current session migrated automatically on first launch.

## Other Improvements

- Fixed a spurious compiler warning in the content blocker.

## Get It

MBOMail updates automatically in the background. If you want to grab it manually, head to [mbomail.meltforce.org](https://mbomail.meltforce.org). Source code of the release is on [GitHub](https://github.com/meltforce/MBOMail/releases/tag/v1.1.0).
