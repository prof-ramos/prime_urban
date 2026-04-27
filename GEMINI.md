# GEMINI.md — Project Mandates & Workflow

## Core Mandates

1. **UI Validation:** Always use `agent-browser` or `chrome-devtools` to validate UI changes visually. Never assume a layout is correct based solely on code analysis, especially for complex grids and responsive behaviors.
2. **Filter UX:** Adhere to the "Categorized Grid" pattern for property filters.
   - **Primary Grid:** Max 4 fields + Search Button. Focus on Business Type, Property Type, and Location.
   - **Advanced Grid:** Group technical details (Quartos, Vagas, Código, Palavra-chave) and Price Range here.
3. **Typography Safety:** Avoid high letter-spacing (`tracking-[0.2em]+`) in narrow columns to prevent truncation. Use `tracking-[0.1em]` or standard spacing for critical UI labels.
4. **Build Integrity:** Do not ignore TypeScript errors. Fix them surgically even if they are pre-existing, to ensure a reliable deployment pipeline.

## Automated Verification

- Use `agent-browser snapshot` to check the accessibility tree and verify if elements are truncated or misaligned.
- Run `npm run build` after any major UI or logic change to verify type safety and compilation.

## Tooling Conventions

- **Chrome DevTools:** Configured in `.mcp.json` with `--autoConnect`. Requires Chrome with remote debugging enabled.
- **Agent Browser:** Preferred for autonomous browser navigation and verification.
