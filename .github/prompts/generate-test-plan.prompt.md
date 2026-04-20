---
description: "Generate a test plan from story definition and explore the application through the entry point"
agent: "copilot-playwright-test-planner"
tools: ['edit', 'read', 'search', 'execute', 'agent']
---

Create test plan for "${app}" functionality.

- Story Definition: If `${story_key}` is provided and non-empty, use the atlassian-cli skill to retrieve the story description by running `acli jira workitem view ${story_key}`. Otherwise, if `${story_url}` is provided and non-empty and returns a 2xx response with non-empty content, read the story definition from `${story_url}`. Otherwise, read the story definition from `${story_file}`.
- Entry Point:${app_url}
- Feature: ${feature}
- Output: Save the generated test plan as a markdown file at specs/${app}/${feature}/test_plan.md if `${feature}` is provided and non-empty, otherwise at specs/${app}/test_plan.md
