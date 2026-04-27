# Mars Air – Playwright Agents

An agent-driven Playwright test automation project for the [MarsAir](https://marsair.recruiting.thoughtworks.net/WeiLianLow) recruitment demo application. It demonstrates how AI agents can plan, generate, and heal end-to-end tests using the Model Context Protocol (MCP).

The agents are based on the concepts described in the [Playwright documentation for Test Agents](https://playwright.dev/docs/test-agents).

## Project Structure

```
.github/agents/          # Agent definitions (planner, generator, healer)
.github/skills/          # Skill files used by agents (playwright-cli, atlassian-cli)
pages/mars-air/          # Page Object Model classes
specs/mars-air/          # Test plans (markdown)
tests/mars-air/          # Playwright test specs (TypeScript)
playwright.config.ts     # Playwright configuration
docker-compose.yml       # MCP server container
```

### Test Areas

| Area | Test Plan | Tests |
|------|-----------|-------|
| `flight-search` | `specs/mars-air/flight-search/test_plan.md` | — |
| `flight-promo-code` | `specs/mars-air/flight-promo-code/test_plan.md` | `tests/mars-air/flight-promo-code/` |
| `flight-validation` | `specs/mars-air/flight-validation/test_plan.md` | — |
| `site-navigation` | `specs/mars-air/site-navigation/test_plan.md` | — |

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Docker](https://www.docker.com/) (for the MCP server)

### 1. Start the MCP Server

```bash
docker-compose up -d playwright-mcp
```

This starts the Playwright MCP server container used by the agents.

### 2. Install Dependencies

```bash
npm install
```

Chromium is installed automatically into `./playwright-browsers/` via the `postinstall` script.

### 3. Configure the MCP Server in VS Code

Create `.vscode/mcp.json` with the following content:

```json
{
  "servers": {
    "playwright-mcp-server": {
      "url": "http://localhost:4444",
      "type": "http"
    }
  }
}
```

## Agent-Driven Workflow

Three agents (defined in `.github/agents/`) drive the full testing lifecycle.

### 1. Test Planner (`copilot-playwright-test-planner`)

Explores the target application using `playwright-cli`, applies boundary value analysis and equivalence partitioning, and saves a structured test plan to `specs/mars-air/<feature>/test_plan.md`.

**Invoke via GitHub Copilot:** `@copilot-playwright-test-planner create a test plan for <url>`

### 2. Test Generator (`copilot-playwright-test-generator`)

Takes a test plan as input, executes each step interactively using `playwright-cli`, collects the generated code, and writes typed Playwright specs to `tests/mars-air/<feature>/`. Page Object Model classes are created or updated in `pages/mars-air/`.

**Invoke via GitHub Copilot:** `@copilot-playwright-test-generator generate tests from specs/mars-air/<feature>/test_plan.md`

### 3. Test Healer (`copilot-playwright-test-healer`)

Reads `test-results/.last-run.json`, attaches to failing tests via `playwright-cli`, diagnoses selector or assertion failures, patches the test code, and re-runs until clean.

**Invoke via GitHub Copilot:** `@copilot-playwright-test-healer fix failing tests`

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:debug` | Run in Playwright debug mode |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:trace` | Run with tracing enabled |
| `npm run show-report` | Open the last HTML report |
| `npm run lint` | Lint the codebase with ESLint |

Tests run against `https://marsair.recruiting.thoughtworks.net/WeiLianLow` by default. Override with the `BASE_URL` environment variable:

```bash
BASE_URL=https://your-instance.example.com npm test
```

HTML reports are saved to `playwright-report/`.
