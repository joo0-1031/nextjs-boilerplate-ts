# Board Feature Design

## Goal

Add a simple database-backed board area to the authenticated starter so the app has a real product surface beyond sign-in.

## Scope

- Add a `Post` model related to `User`.
- Add reusable query helpers for users and posts.
- Add a board list page at `/board`.
- Add a post detail page at `/board/[postId]`.
- Add a board entry point from the home dashboard and public landing page.

## Data Model

`User` remains the Auth.js-owned identity model. `Post` belongs to a user and stores a title, body, publication state, and timestamps.

## UI Direction

The board should match the current "Boilerplate Studio" visual language:

- Soft off-white/green background
- Dense SaaS-style content layout
- Simple bordered panels with low radius
- Clear empty states when no posts exist
- Auth-aware navigation without adding client-side state

## Out Of Scope

- Post creation/editing forms
- Comments
- Rich text editing
- Moderation workflows
