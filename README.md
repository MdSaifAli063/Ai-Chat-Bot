# AI Chat Bot (Vite + React + TypeScript + Tailwind)

A responsive AI chat application built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, and Supabase Edge Functions for serverless AI chat completion streaming. The project has been scrubbed of vendor-specific tooling and uses neutral environment variables and an OpenAI-compatible API by default.

## Features

- React 18 + TypeScript + Vite for fast DX
- Tailwind CSS + shadcn/ui components
- Chat UI with streaming responses
- Supabase Edge Function proxy for server-side API calls and CORS handling
- Simple theming, toast notifications, and responsive layout

## Project Structure

- Ai Chat-Bot/
  - src/
    - components/ (chat UI, sidebar, and shadcn/ui primitives)
    - hooks/ (theme, chat, auth, toast)
    - pages/ (Landing, Chat, Auth, NotFound)
    - services/api.ts (client for streaming chat via Supabase Edge Function)
    - main.tsx, App.tsx
  - supabase/functions/chat/index.ts (Edge Function proxy)
  - vite.config.ts
  - tailwind.config.ts
  - package.json

## Prerequisites

- Node.js 18+
- pnpm, npm, or yarn
- A Supabase project (for deploying the Edge Function)
- An AI provider key (OpenAI-compatible). Defaults to OpenAI endpoints but can be configured for any compatible provider.

## Installation

1. Install dependencies
   - pnpm install
   - or npm install
   - or yarn

2. Create environment variables
   - In your frontend environment (e.g. .env):
     - VITE_SUPABASE_URL=your_supabase_project_url
     - VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

   - In your Supabase Edge Function (chat) environment:
     - AI_API_URL=https://api.openai.com/v1/chat/completions
     - AI_API_KEY=your_provider_api_key
     - AI_MODEL=gpt-4o-mini

   Adjust AI_API_URL/AI_MODEL if you use another provider that supports the OpenAI-compatible chat API.

## Development

- cd "Ai Chat-Bot"
- pnpm dev (or npm run dev / yarn dev)
- App runs on http://localhost:8080 by default (see vite.config.ts)

## Build

- pnpm build (or npm run build / yarn build)
- Preview: pnpm preview

## Supabase Edge Function

The chat function proxies client requests to your AI provider, adds a system prompt, streams responses, and handles CORS.

- Location: supabase/functions/chat/index.ts
- Expects POST { messages: [{ role, content }, ...] }
- Streams Server-Sent Events with OpenAI-style chunks

To deploy:

- Install the Supabase CLI and login
- cd "Ai Chat-Bot"
- supabase functions deploy chat --project-ref <your-project-ref>
- Set environment variables in Supabase for the function:
  - supabase secrets set AI_API_KEY=... AI_API_URL=... AI_MODEL=...

## Changing AI Provider

Use any OpenAI-compatible endpoint:

- Set AI_API_URL to your provider's chat completions endpoint
- Set AI_MODEL to a model available with that provider
- Provide AI_API_KEY

Examples:

- OpenAI: AI_API_URL=https://api.openai.com/v1/chat/completions
- Together AI, Fireworks, Groq (with compatibility shim): use their compatible URL and model name

## Removing Vendor-Specific Tooling

- Vite config no longer includes third-party tagging plugins
- package.json devDependencies updated accordingly
- Supabase function environment variables renamed to neutral AI_API_* names

## Scripts

- dev: Start development server
- build: Production build
- build:dev: Development-mode build
- preview: Preview the production build
- lint: ESLint across the repo

## Notes

- components, hooks, and pages follow a modular structure using path aliases ("@" -> src)
- services/api.ts handles streaming parsing and error handling
- Tailwind and shadcn/ui are configured via tailwind.config.ts and src/components/ui/

## License

This repository contains application code intended for demonstration or internal use. Add your license of choice here.
