# Mars Air – Playwright Test Automation

A TypeScript-based end-to-end test automation project for the [MarsAir](https://marsair.recruiting.thoughtworks.net/WeiLianLow) recruitment demo application. This project uses [Playwright](https://playwright.dev/) with Page Object Model (POM) design pattern and AI-assisted test generation via GitHub Copilot agents.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Architecture](#test-architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- ✅ **Playwright 1.59.1** with TypeScript support
- ✅ **Page Object Model** design pattern for maintainable tests
- ✅ **AI-Assisted Testing** with GitHub Copilot agents (planner, generator, healer)
- ✅ **Docker Support** via Playwright MCP server and CI container
- ✅ **GitHub Actions** with pre-configured Docker container (no browser installation needed)
- ✅ **ESLint** integration for code quality
- ✅ **HTML Reports** with traces and screenshots on failure
- ✅ **Multiple Test Runners** - headless, headed, debug, and UI modes

## Project Structure

```
mars-air-playwright-agents/
├── .github/
│   ├── agents/              # AI agent definitions (planner, generator, healer)
│   ├── skills/              # Skill files for agents (playwright-cli, atlassian-cli)
│   └── workflows/           # GitHub Actions workflows
│       └── playwright.yml    # CI/CD pipeline
├── pages/
│   └── mars-air/            # Page Object Model classes
│       └── WeiLianLow.ts     # MarsAir page object
├── specs/
│   └── mars-air/            # Test plans (markdown format)
│       └── promo-code.md     # Promo code feature test plan
├── tests/
│   └── mars-air/            # Playwright test specifications
│       └── promo-code.spec.ts
├── playwright-browsers/      # Local browser binaries (gitignored)
├── playwright-report/        # Test reports (gitignored)
├── test-results/             # Test artifacts (gitignored)
├── docker-compose.yml        # MCP server container
├── playwright.config.ts      # Playwright configuration
├── package.json              # Node.js dependencies
└── tsconfig.json             # TypeScript configuration
```

## Prerequisites

- **Node.js** (LTS version recommended) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Docker** (optional, for MCP server) - [Download](https://www.docker.com/)
- **Git** - [Download](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mars-air-playwright-agents
```

### 2. Install Dependencies

```bash
npm install
```

This will automatically install Playwright browsers into `./playwright-browsers/` via the `postinstall` script.

### 3. Run Tests

```bash
# Run all tests headlessly (default)
npm test

# Run with visible browser
npm run test:headed

# Open UI mode for interactive testing
npm run test:ui
```

## Configuration

### Playwright Configuration

The project uses `playwright.config.ts` with the following key settings:

- **Test Directory**: `./tests`
- **Base URL**: `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
- **Browser**: Chromium (with sandbox disabled for CI compatibility)
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries in CI, 0 locally
- **Reporter**: HTML with traces on retry and screenshots on failure

Override the base URL:

```bash
BASE_URL=https://custom-url.com npm test
```

### TypeScript Configuration

TypeScript is configured with:
- **Target**: ESNext
- **Module**: CommonJS
- **Path Aliases**: `@pages/*` maps to `./pages/*`
- **Strict Mode**: Enabled

## Running Tests

### Local Development

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Run in debug mode (step through) |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:trace` | Run with trace enabled |
| `npm run show-report` | View the last HTML report |
| `npm run lint` | Lint code with ESLint |

### Test Examples

```bash
# Run specific test file
npx playwright test tests/mars-air/promo-code.spec.ts

# Run tests with grep (filter by name)
npx playwright test --grep "Valid Promo Codes"

# Run in debug mode with specific test
npx playwright test tests/mars-air/promo-code.spec.ts --debug
```

## Test Architecture

### Page Object Model (POM)

The project uses POM to encapsulate page interactions:

**Example - `pages/mars-air/WeiLianLow.ts`:**

```typescript
export class MarsAirPage {
  readonly page: Page;
  readonly departingSelect: Locator;
  // ... other locators

  async goto() {
    await this.page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
  }

  getPromoCodeUsedMessage(code: string): Locator {
    return this.page.getByText(`Promotional code ${code} used:`);
  }
}
```

### Test Structure

Tests are organized by feature in `tests/mars-air/`:

- **promo-code.spec.ts** - Tests for promotional code functionality (AC1: valid codes, AC2: invalid codes, AC3: checksum validation)

### Test Plans

Detailed test plans are maintained in `specs/mars-air/` using markdown format. These include:
- User stories
- Acceptance criteria
- Test scenarios with steps and expected results
- Boundary value analysis (BVA) and equivalence partitioning

## CI/CD Pipeline

### GitHub Actions Workflow

The project uses a streamlined CI pipeline (`.github/workflows/playwright.yml`) that:

- ✅ Runs on every push and pull request
- ✅ Uses `mcr.microsoft.com/playwright:v1.59.1-noble` Docker container
- ✅ Skips browser installation (browsers pre-installed in container)
- ✅ Uploads test reports as artifacts

**Key Benefits:**
- No need to install browsers in CI
- Faster builds (no `playwright install` step)
- Consistent environment with pinned Playwright version

### Triggering CI

CI runs automatically on:
- Push to any branch
- Pull requests to any branch

Manual trigger is also available via `workflow_dispatch`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the application (if applicable) |
| `npm test` | Run Playwright tests headlessly |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:headed` | Run tests with headed browser |
| `npm run test:trace` | Run with tracing enabled |
| `npm run codegen` | Generate tests with Playwright Codegen |
| `npm run show-report` | Display the last HTML report |
| `npm run lint` | Lint codebase with ESLint |

## AI-Assisted Testing (Optional)

This project includes GitHub Copilot agent definitions for AI-assisted testing workflows:

### Agent Workflow

1. **Test Planner** (`copilot-playwright-test-planner`)
   - Analyzes the application
   - Creates comprehensive test plans
   - Applies testing methodologies (BVA, equivalence partitioning)

2. **Test Generator** (`copilot-playwright-test-generator`)
   - Converts test plans into executable Playwright tests
   - Creates/updates Page Object Models
   - Generates typed TypeScript test code

3. **Test Healer** (`copilot-playwright-test-healer`)
   - Diagnoses failing tests
   - Fixes selector and assertion issues
   - Patches test code automatically

**Invoke agents via GitHub Copilot chat:**
```
@copilot-playwright-test-planner create a test plan for <url>
@copilot-playwright-test-generator generate tests from specs/mars-air/promo-code.md
@copilot-playwright-test-healer fix failing tests
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint for code quality (`npm run lint`)
- Write tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the `package.json` for details.

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [MarsAir Demo Application](https://marsair.recruiting.thoughtworks.net/WeiLianLow)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

---

**Maintainer**: wei lian  
**Version**: 1.0.0
