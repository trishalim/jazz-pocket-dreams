# 🌙 pocket dreams

A minimalistic web app for tracking books you read

[See live](https://pocketdreams.me)

## 🎁 features

- See your reading history at a glance in a monthly and yearly view
- Share your profile through a link
- View reading stats for the year


##  🎷 tech stack

- React and Tailwind for UI
- Clerk for authentication
- [Jazz](https://jazz.tools) for database, backend, and state management

With **[Jazz](https://jazz.tools)**, my backend is simply the [schema](./src/schema.ts) that
defines the data model, and the api key for [Jazz Cloud](https://jazz.tools/cloud) written [here](./src/components/JazzAndAuth.tsx).

To work with data, I start by retrieving a reactive state from Jazz.

```tsx
const bookReview = useCoState(BookReview, id);
```

I directly mutate local state, and any changes are synced it to the cloud. No API calls necessary.

```tsx
<input
  value={bookReview.title}
  onChange={(e) => (bookReview.title = e.target.value)}
/>
```

## 👩‍💻  installing and running the app

```bash
pnpm i  && pnpm dev
```

## feature requests

Please open an issue or PR, or [DM me](https://x.com/trishathecookie).
