# Phishare — Frontend Design Reference

> This document is a reference for any AI agent working on the Phishare frontend.
> Follow it exactly. Don't deviate from the design decisions here without being asked.

---

## What Phishare Is

A photo sharing app for group events (weddings, parties, gatherings). An organizer uploads photos, shares a link, and attendees filter photos by face to find only the ones they're in. The core interaction is mobile — people at events, on their phones. Desktop is secondary but should work cleanly.

---

## Stack

- React + Vite
- Tailwind CSS v4
- shadcn/ui (components built on Radix UI)
- PWA via `vite-plugin-pwa`

---

## Theme & Colors

The project already has shadcn initialized with a configured theme. Colors are set up in `globals.css` as CSS variables — a warm teal primary accent, warm neutrals for backgrounds, togglable light/dark mode.

**Always use shadcn's CSS variables for color. Never hardcode hex values.** Use `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, etc. The variables are already defined — just use them.

The theme is togglable light/dark. Both modes are already configured. Don't add new color values, work with what's there.

---

## Design Philosophy

**Not vibe coded. Not templated.** The UI should feel intentional — like a small, well-made product. Clean, warm, tactile.

The signature feeling: **a photo app that respects the photos.** The UI gets out of the way. The images are the hero. Everything else is framing.

---

## Layout Model

### Mobile First (Primary)

Think in screens, not pages. Full viewport height, shell is fixed, content scrolls inside.

```
┌─────────────────────┐
│  Header (fixed)     │  ← app name / event name + theme toggle
│  ~48px              │
├─────────────────────┤
│                     │
│  Content Area       │  ← scrollable, fills remaining height
│  (photo grid,       │
│   upload zone,      │
│   etc.)             │
│                     │
├─────────────────────┤
│  Bottom Nav (fixed) │  ← 3 icon tabs
│  ~64px              │
└─────────────────────┘
```

### Desktop (Secondary)

On `md:` and above, bottom nav shifts to a left sidebar. Content area gets a max-width container centered on screen.

```
┌──────┬──────────────────────────┐
│      │  Header                  │
│ Side │──────────────────────────│
│ Nav  │                          │
│      │  Content Area            │
│      │  (max-w-4xl, centered)   │
│      │                          │
└──────┴──────────────────────────┘
```

---

## Navigation

3 tabs. Mobile: fixed bottom bar. Desktop (`md:`): left sidebar.

| Tab | Icon | Route |
|-----|------|-------|
| Photos | `ImageIcon` | `/` |
| Upload | `UploadIcon` | `/upload` |
| People | `UsersIcon` | `/people` |

Active tab uses `text-primary`. Inactive uses `text-muted-foreground`.

---

## Component Guidelines

### Photo Grid

- 2 columns on mobile, 3 on `sm:`, 4 on `lg:`
- `aspect-square` thumbnails, `object-cover`
- `rounded-lg` on images
- On hover/tap: `scale-[1.02]` transition, nothing heavier
- Selected state: `ring-2 ring-primary`

### Upload Zone

- Large dashed border area, full width, `rounded-xl`
- Icon centered, short label below
- On drag over: border goes solid primary, background shifts to `bg-muted`
- Tapping triggers native file picker (critical for mobile)

### Face Filter / People Screen

- Horizontal scrollable row of face thumbnails at top
- Tap a face to filter the grid below
- Selected face: `ring-2 ring-primary`
- "All photos" chip as first option (clears filter)
- Face thumbnails: `rounded-full`, 56px × 56px

### Cards

- `rounded-xl`
- `border border-border`
- No heavy shadows — use background contrast instead (`bg-card` vs `bg-background`)

### Buttons

- Use shadcn `<Button>` variants: `default`, `secondary`, `ghost`, `destructive`
- All touch targets minimum `h-10` (44px) on mobile
- Don't create custom button styles — use the existing variants

---

## Theme Toggle

Icon button in the header. Sun/moon icon, no label. Toggles `dark` class on `<html>`. Persist to `localStorage`.

```tsx
<button onClick={toggleTheme}>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>
```

---

## PWA

Already configured via `vite-plugin-pwa`. Don't touch the PWA config unless asked. The app runs standalone (no browser chrome) when installed on mobile.

---

## What NOT to Do

- Never hardcode colors — always use Tailwind CSS variable classes
- No gradients on backgrounds
- No glassmorphism or heavy blur effects
- No `shadow-xl` or heavy drop shadows
- No `rounded-full` on non-circular elements
- No bottom nav on desktop, no sidebar on mobile
- No animation on every interaction — motion is deliberate
- Don't center-align body text in content areas
- No more than 2 font weights on one screen

---

## Tone of Copy

- Short, direct, no filler
- Sentence case everywhere (not Title Case)
- Action labels say exactly what happens: "Upload photos", "Download", "Filter by face"
- Empty states give direction: "No photos yet — upload some to get started"
- Errors say what went wrong and what to do next

---

## Agent Checklist

Before generating any screen or component:

1. Mobile layout first, desktop via `md:` breakpoint
2. Use shadcn CSS variable classes only — no hardcoded colors
3. Use existing shadcn components (`Button`, `Card`, etc.) before writing custom ones
4. Touch targets minimum `h-10` on all interactive elements
5. Photos are the content — UI should frame them, not compete
6. Follow component guidelines above for consistency across screens
