## Project overview

This is a browser extension frontend built with React, TypeScript, and Rsbuild.
Primary goals:
- keep architecture simple
- prefer explicit code over magic
- optimize for maintainability, not cleverness

## Tech stack

- React 19
- TypeScript
- Rsbuild / Rspack
- Biome for formatting and linting
- Playwright for e2e
- Rstest for unit/integration tests

## Working rules

- Always use TDD. Split the big feature into the smallest ones and implement them step-by-step, writing tests at first.
- Do not add new dependencies
- Styles should be always in a separate files

