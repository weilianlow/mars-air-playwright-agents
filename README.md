# Playwright MCP Server

This project demonstrates an agent-driven workflow for planning, generating, and healing Playwright tests using the Model-Context-Protocol (MCP).

## Overview

This repository is a self-contained example of how to use AI agents to automate the testing lifecycle for a web application. It uses a local MCP server running in Docker and a set of specialized agents to interact with a Playwright test suite.

The agents are based on the concepts described in the [Playwright documentation for Test Agents](https://playwright.dev/docs/test-agents).

## Setup

The MCP server is containerized using Docker for easy setup.

1.  **Start the MCP Server:**
    
    Make sure you have Docker installed and running. Then, start the server using Docker Compose:
    
    ```bash
    docker-compose up -d playwright-mcp
    ```
    
    This will start the MCP server, which will be available on `localhost:4444`.

2.  **Install Dependencies:**
    
    In a separate terminal, install the project's `npm` dependencies:
    
    ```bash
    npm install
    ```
3. ** Update `.vscode/mcp.json`
    ```json
    
    ```

## Agent-Driven Workflow

This project uses a three-agent workflow to manage the testing process.

### 1. Planning Tests

The `playwright-test-planner.agent.md` is responsible for exploring the target application and creating a comprehensive test plan.

**To invoke the planner agent:**

You would typically use a client that can interact with the MCP server, providing the agent's definition and the target URL. The agent will then perform exploratory testing and generate a `test-plan.md` file.

### 2. Generating Tests

The `playwright-test-generator.agent.md` takes the `test-plan.md` as input and generates the corresponding Playwright test files.

**To invoke the generator agent:**

Using your MCP client, you would provide the generator agent's definition and the `test-plan.md`. The agent will then write the test files to the `tests/` directory.

### 3. Healing Tests

If tests fail due to changes in the application, the `playwright-test-healer.agent.md` can be used to automatically repair them.

**To invoke the healer agent:**

You would provide the healer agent's definition and the results of a failed test run. The agent will then attempt to fix the failing tests.

## Running Tests Manually

You can also run the Playwright tests manually without using the agents.

To run all the tests, use the following command:

```bash
npm test
```

This will execute all the test files in the `tests/` directory and generate an HTML report in the `playwright-report` directory.
