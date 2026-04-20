---
description: "Debugs and fixes failing Playwright tests by inspecting test-results/.last-run.json or running the full suite first"
agent: "copilot-playwright-test-healer"
tools: ['edit', 'read', 'search', 'execute', 'agent']
---

Heal failing Playwright tests.

- run: ${run}
  - `all` — run the full test suite first, then read `test-results/.last-run.json` to get the list of failed tests
  - `last` — skip re-running the suite; read `test-results/.last-run.json` directly to get the list of failed tests
