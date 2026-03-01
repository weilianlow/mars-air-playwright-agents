# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.42.0-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 4444

# Start the MCP server
CMD ["npx", "playwright", "run-test-mcp-server"]
