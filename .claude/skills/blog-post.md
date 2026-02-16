# Blog Post Generator

## Description
Generate a blog post from the current session context and publish it to meltforce.org.

## User-invocable
When the user invokes `/blog-post`, generate a blog post summarizing the current session.

## Instructions

### 1. Analyze the Session
Review the conversation history to identify:
- What was built or accomplished
- Key technical decisions and why
- Interesting problems and solutions
- Tools, technologies, or patterns used

### 2. Generate the Post
Create a markdown file with the following frontmatter:

```yaml
---
title: "<Descriptive title>"
date: <YYYY-MM-DD>
tags: [<relevant tags>]
description: "<One-line summary>"
draft: false
---
```

Write the post content in English:
- Keep it concise and technical
- Use a conversational but informative tone
- Include code snippets where relevant
- Focus on the "why" and "what I learned", not just the "what"
- Target length: 300-800 words

### 3. Generate a Slug
Derive the filename slug from the title:
- Lowercase, hyphens instead of spaces
- Remove special characters
- Example: `building-my-homelab-from-scratch.md`

### 4. Show for Review
Present the complete post to the user and ask for confirmation or edits.

### 5. Save and Publish
Once approved:
1. Write the file to `src/content/blog/<slug>.md` in the meltforce-org project
2. Use the `remote-commit` skill to commit and push
3. GitHub Actions will automatically build and deploy

### Tag Conventions
Use lowercase, common tags:
- Languages/tools: `python`, `swift`, `docker`, `astro`
- Topics: `homelab`, `ai`, `privacy`, `workflow`, `macos`
- Meta: `vibecoding`, `productivity`, `selfhosted`
