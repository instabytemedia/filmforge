# FilmForge

> Connecting minds through cinema

FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.

## Features

- Daily movie screenings
- Blockchain-verified discussions
- Community challenges

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env.local` and fill in your credentials
3. Run `npm install`
4. Run `npm run dev`

## Project Structure

```
├── app/                  # Next.js App Router pages
├── components/           # React components
├── lib/                  # Utilities and helpers
├── supabase/            # Database schema
└── INSTRUCTIONS.md      # Detailed build guide for AI assistants
```

## Database

This project uses 4 main entities:
- **Server**: A community server for discussing movies
- **Channel**: A discussion channel within a server
- **Message**: A discussion message within a channel
- **User**: A platform user

## Build Instructions

For detailed step-by-step build instructions, see [`INSTRUCTIONS.md`](./INSTRUCTIONS.md).

This file contains comprehensive guidance for building this project with AI coding assistants like Claude Code, Cursor, or Windsurf.

---

*Generated with [Claudery](https://claudery.io) - AI-powered blueprint generator*
