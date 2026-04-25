# Frontend Skill Guide

## Responsive Banner Rules

- All banner containers must define `aspect-ratio` by token/variable.
- Keep `aspect-ratio` on the parent slide/card wrapper, not on the image element.
- Banner images must use `object-fit: cover`.
- Banner image element should use `aspect-ratio: auto` and fill the wrapper (`width: 100%; height: 100%`).
- Desktop and mobile can use different ratio tokens, but each breakpoint must still preserve ratio.
- When a side banner is hidden on mobile, the main banner must keep its own ratio and remain visible.

## Project-Specific Hero Rule (Mandatory)

- Main hero banner wrapper ratio is fixed: `aspect-ratio: 1280 / 482`.
- Apply the same ratio for both desktop and mobile.
- Do not use `min-height` to override this ratio on mobile.

## Suggested Token Pattern

- `--ratio-hero-main-desktop`
- `--ratio-hero-main-mobile`
- `--ratio-hero-side`
- `--ratio-mid-banner`

## Review Checklist

- Resize from desktop to mobile and verify no banner looks stretched.
- Verify main hero banner remains visible on small screens.
- Verify side banner and app-download buttons are hidden on mobile when required.
