# NViMi AI v5.0.6

A premium NVIDIA model chat experience built as a single-page web app. Talk to NVIDIA AI models through a clean, modern interface with streaming responses, file uploads, code generation, and more.

## What's New in v5.0.6

- iPhone layout now tracks the visual viewport more closely so the composer stays visible above the keyboard
- Model refresh uses retry/backoff and auto-refreshes when the tab becomes visible again
- Responses that hit a finish_reason of `length` now get a clear Continue button
- Model cache freshness is now timestamp-based so stale lists refresh cleanly

## What's New in v5.0.1

This is a complete ground-up rebuild focusing on mobile stability, UI polish, and reliability.

- **Full UI rewrite** — cleaner layout, better spacing, improved typography hierarchy
- **iOS keyboard fixes** — Visual Viewport API keeps composer stable during keyboard open/close
- **Better composer** — natural textarea expansion, no dead gaps, stays visible
- **Redesigned model browser** — full modal with filters (All, Favorites, Free, Reasoning, Coding, Vision, Fast, API), search, and clearer capability badges
- **Improved file uploads** — better iOS accept attributes, ZIP support, webmanifest support, clearer skip messaging
- **Generated files panel** — cleaner cards, copy/download/ZIP actions, artifact preview
- **Activity panel** — collapsed by default, cleaner reasoning display, hidden debug events
- **Better chat history** — compact items, working delete on iOS, clear all button
- **Redesigned onboarding** — cleaner card-based setup with name field
- **Improved settings** — live temperature slider, better organization
- **Better auto-scroll** — scroll lock detection, respects user scroll position
- **Service worker cache bust** — v5 cache ensures clean update
- **All known issues addressed** — see below

## Getting Started

1. Open the app in a modern browser (Chrome, Firefox, Safari, Edge)
2. On first launch, enter your NVIDIA API key (and optional Worker URL)
3. Click "Save & Load Models" or go to Settings
4. Open the Model Browser to select a model
5. Start chatting

## Setup

### NVIDIA API Key

Get your key from [NVIDIA API Catalog](https://build.nvidia.com/explore/discover). Stored only in browser localStorage.

### Cloudflare Worker Proxy (optional)

Deploy the included Worker for CORS proxying, or connect directly to NVIDIA.

## Features

- **10 AI modes** — Chat, Coding, Research, Writing, Creative, Data, Web, Images, Voice, Custom
- **7 Agents** — General, Senior Engineer, Researcher, Data Analyst, Creative, Teacher, Security
- **File uploads** — Images (PNG/JPEG/WebP/GIF/HEIC up to 6MB), text files (up to 2MB), ZIP archives, web manifests
- **Model browser** — Full-screen modal with search, filters, favorites, and capability badges
- **Generated files** — Auto-detected code blocks with copy/download/ZIP/preview
- **Web search** — Optional Brave Search integration
- **Voice input** — Browser-native speech recognition
- **Streaming** — Real-time response streaming with collapsible activity panels
- **Keyboard shortcuts** — Ctrl+K new chat, Ctrl+S settings, Ctrl+B sidebar, / focus, Esc stop
- **PWA** — Install as standalone app on desktop and mobile

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | New chat |
| `Ctrl+S` | Settings |
| `Ctrl+B` | Toggle sidebar |
| `/` | Focus input |
| `Esc` | Stop / Close modal |
| `Shift+Enter` | New line |

## Architecture

Zero-dependency single-page application:

- `index.html` — semantic HTML structure
- `styles.css` — complete design system with CSS custom properties
- `app.js` — all application logic (~1800 lines)
- `sw.js` — service worker for offline caching
- `manifest.webmanifest` — PWA manifest

No build step required — deploy directly to GitHub Pages, Cloudflare Pages, or any static host.

## Deployment

### GitHub Pages
1. Fork or clone this repository
2. Go to Settings > Pages
3. Select source branch and folder
4. Available at `https://yourusername.github.io/repo-name/`

### Cloudflare Worker (API Proxy)
Deploy `index.js` (the Worker file) to Cloudflare Workers for CORS proxying.

## Version History

- **v5.0.1** — Stream timeout increased so long file rewrites complete more reliably
- **v5.0.0** — Complete rebuild. Better mobile, iOS keyboard fixes, redesigned model browser, cleaner UI
- **v4.0.1** — Max tokens fix, history icon sizing
- **v4.0.0** — Initial redesign with dark theme, model picker, file uploads

## Security

- API keys stored only in browser localStorage
- All requests use HTTPS
- Keys only sent to NVIDIA API (or your own Worker)
