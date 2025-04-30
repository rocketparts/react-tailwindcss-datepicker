# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Build Commands

- Build: `npm run build` or `yarn build`
- Development: `npm run dev` or `yarn dev` (runs on port 8888)
- Linting: `npm run lint` or `yarn lint`
- Fix linting: `npm run lint:fix` or `yarn lint:fix`
- Fix formatting: `npm run pret:fix` or `yarn pret:fix`
- Watch mode: `npm run watch` or `yarn watch`

## Code Style

- TypeScript with React (functional components with hooks)
- Prettier with 4-space tabs, 100 char line length, double quotes, trailing semicolons
- Import order: alphabetical with newlines between groups
- Component structure: props interface at top, followed by component declaration
- Tailwind for styling
- Error handling: avoid console statements except in app/page.tsx
- Use dayjs for date manipulation (peer dependency)
- Follow React best practices (hooks rules, functional components)
- Use descriptive variable/function names in camelCase
- Component files should export default and named exports for types
