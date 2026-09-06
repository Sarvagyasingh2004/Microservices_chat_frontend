# Skein Frontend

Next.js client for Skein, a real-time chat application with passwordless email
sign in. Communicates with three backend services over REST and holds an open
Socket.IO connection for live messages, typing indicators, presence and read
receipts.

Backend: [Microservices_chat_backend](https://github.com/Sarvagyasingh2004/Microservices_chat_backend)

## Screens

The interface covers sign in, code verification, the conversation list and
thread, profile, and the empty and not-found states. Every screen is dark only
and responsive down to 360px, where the sidebar collapses to a drawer.

Screenshots of the desktop and mobile layouts are kept outside this repository
to avoid committing binaries. Run the app locally to see them.

## Routes

| Route | Purpose |
|---|---|
| `/` | Redirects to `/chat` |
| `/login` | Email entry, requests an OTP from the user service |
| `/verify` | Six digit code entry, exchanges the code for a JWT |
| `/chat` | Conversation list, message thread, composer, live socket events |
| `/profile` | Edit display name |

`not-found`, `error`, `loading` and `global-error` are implemented, so a bad URL
or a render failure stays within the app's own design rather than falling back to
the framework default.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Socket.IO client,
axios, js-cookie, moment, react-hot-toast, lucide-react, Geist.

## Running it

```bash
npm install
cp .env.example .env.local
npm run dev
```

The three backend services must be running first. Service URLs come from the
environment:

```env
NEXT_PUBLIC_USER_SERVICE=http://localhost:3000
NEXT_PUBLIC_CHAT_SERVICE=http://localhost:3002
```

Both fall back to those localhost defaults when unset. Because the user service
also defaults to port 3000, run the client on another port when both are local:

```bash
npm run dev -- -p 3003
```

Set `CORS_ORIGIN` on the user and chat services to whichever origin the client
runs on.

Auth state is a JWT in a `token` cookie, read by `AppContext` on mount via
`GET /api/v1/me`.

## State

Two providers wrap the app in [`layout.tsx`](src/app/layout.tsx).

`AppContext` owns the authenticated user, the conversation list and the user
directory, and exposes `fetchChats`, `fetchUsers` and `logoutUser`.

`SocketContext` opens one Socket.IO connection once a user id exists, passing it
in the handshake query, and tracks `onlineUsers` from the `getOnlineUser`
broadcast.

The chat page owns the open thread and reconciles socket events against it.
Incoming `newMessage` events either append to the open thread or increment the
conversation's unread count, and `messagesSeen` flips delivery ticks to read.
Messages are deduplicated by id, since the server emits both to the chat room and
to each participant's own room.

## Design system

Tokens are declared in [`src/app/globals.css`](src/app/globals.css) under
Tailwind v4's `@theme`. Changing them there propagates through the app.

- Palette: a warm near-black scale (`ink-950` to `ink-600`), a neutral text scale
  (`fog-50` to `fog-600`) and one accent (`mint-300` to `mint-600`).
- Radius: `rounded-panel` (16px) for containers, `rounded-control` (10px) for
  inputs, buttons and small controls.
- Type: Geist for UI, Geist Mono for timestamps, codes and counters.
- Motion: CSS only. `.rise` and `.fade` accept a `--d` custom property for
  stagger, and collapse under `prefers-reduced-motion: reduce`.
- Focus: one shared `.ring-focus` treatment on every interactive element.
- The app is dark only. `color-scheme: dark` is set on `html`.

The auth panel uses `backdrop-filter`, and falls back to a solid surface under
`prefers-reduced-transparency: reduce`.

| File | Role |
|---|---|
| [`components/Brand.tsx`](src/components/Brand.tsx) | `APP_NAME` and the wordmark. The product name is defined here only. |
| [`components/AuthShell.tsx`](src/components/AuthShell.tsx) | Layout shared by `/login` and `/verify` |
| [`components/StatusScreen.tsx`](src/components/StatusScreen.tsx) | Layout shared by `not-found` and `error` |
| [`components/Avatar.tsx`](src/components/Avatar.tsx) | Initials avatar with optional presence dot |

## Uploads

Attachments are validated in the browser for type and against the 5MB server
limit before upload, and rejected with a toast if either check fails. Cloudinary
resizes accepted images to fit within 800x600.

## Socket events

The event contract is documented in the
[backend README](https://github.com/Sarvagyasingh2004/Microservices_chat_backend#socketio-3002).
