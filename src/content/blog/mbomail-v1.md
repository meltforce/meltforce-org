---
title: "Today I published my first macOS App"
date: 2026-02-16
tags: ["vibecoding","claude","macos"]
description: "I missed FMail3 from my Fastmail days, so I vibecoded my own version for mailbox.org."
draft: true
---
When I switched from [Fastmail](https://www.fastmail.com/) to [mailbox.org](https://mailbox.org/) last autumn, the one thing I really missed was the [FMail3](https://fmail3.appmac.fr/) app. As far as I could tell, there was no equivalent for mailbox.org — so I built one myself.

Having never written a single line of code for any Apple operating system before, I was still pretty confident it could be done fairly quickly — my last [project](https://cast2md.meltforce.org/) had taught me how far vibecoding can take you. And so it went:

By Friday afternoon I had started, and by Sunday evening I pushed the app for notarization. Claude helped me create the app, the website, set up the CI pipeline, and even create an Apple developer account. It took me about 20 hours in total. Pretty crazy if you think about it.

And now there is [MBOMail](https://mbomail.meltforce.org/).

I recreated pretty much all of the features of FMail3:

- **Global keyboard shortcut** to toggle the app from anywhere (default: ⌥ + M)
- **Menu bar integration** for instant inbox access
- **Native macOS notifications** with sender and subject
- **Unread badge** on the dock icon
- **Default mail client** for `mailto:` links
- **Dark mode** that follows your system appearance
- **Link inspection** with automatic expansion of shortened URLs
- **Tracker blocking** against email-tracking pixels and third-party cookies
- **Custom CSS and JavaScript** injection for power users
- **Auto-hide** when switching to another app
- **Auto-updates** in the background

The only big thing I left out is JMAP-based notifications. FMail3 uses Fastmail's JMAP API to check for new mail independently of the webview. mailbox.org doesn't expose a comparable API, so MBOMail polls the webview instead. It works — just not as elegantly.

## What Vibecoding a macOS App Is Like

Going from zero Swift knowledge to a notarized app in a weekend sounds absurd. And honestly, it kind of is. But the workflow has become surprisingly natural:

1. Describe what you want in plain language, add some examples
2. Claude writes the Swift code
3. Build, test, adjust
4. Repeat

The hard parts weren't the code — they were the things around it: code signing, provisioning profiles, notarization, Sparkle for auto-updates, and GitHub Actions for CI. Apple's developer tooling has a learning curve that no LLM can fully abstract away. But Claude got me through each step, even when the error messages were cryptic.

## Try It

MBOMail is free, open-source, and available now at [mbomail.meltforce.org](https://mbomail.meltforce.org). The source code is on [GitHub](https://github.com/meltforce/mbomail).

If you use mailbox.org and missed having a proper Mac app, this is for you.
