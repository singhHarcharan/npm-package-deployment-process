# NPM Package Deployment Project

This project demonstrates how to create, publish, and use a custom NPM package in a Node.js application. It consists of two main components:
1. A common package (`@harcharan_singh_/dummy_package`) - A reusable validation module
2. A backend service - An Express.js server that uses the common package

## Table of Contents
- [Project Structure](#project-structure)
- [Common Package](#common-package-harcharan_singh_dummy_package)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Available Schemas](#available-schemas)
- [Backend Service](#backend-service)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation-1)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Development](#development)
  - [Common Package Development](#common-package-development)
  - [Backend Service Development](#backend-service-development)
- [Publishing the Package](#publishing-the-package)
- [Versioning](#versioning)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Structure

```
.
├── backend/               # Express.js backend service
│   ├── dist/             # Compiled TypeScript files
│   ├── src/              # Source code
│   │   └── index.ts      # Main backend server file
│   ├── package.json      # Backend dependencies
│   └── tsconfig.json     # TypeScript configuration
│
└── common/               # Reusable NPM package
    ├── dist/             # Compiled package code
    ├── src/              # Source code
    │   └── index.ts      # Package entry point
    ├── .npmignore        # Files to exclude from package
    ├── package.json      # Package configuration
    └── tsconfig.json     # TypeScript configuration
```

## Common Package (`@harcharan_singh_/dummy_package`)

A reusable NPM package that provides input validation using Zod.

### Features
- Input validation schemas for authentication
- TypeScript support with type inference
- Lightweight and focused on validation

### Installation

```bash
# Install the package from npm registry
npm install @harcharan_singh_/dummy_package
```

### Usage

```typescript
import { signinInputs, SigninInputs } from "@harcharan_singh_/dummy_package";

// Validate input
const result = signinInputs.safeParse({
    email: "user@example.com",
    password: "password123"
});

if (result.success) {
    // TypeScript knows the shape of the data
    const data: SigninInputs = result.data;
    console.log("Valid input:", data);
} else {
    console.error("Validation error:", result.error);
}
```

### Available Schemas

- `signinInputs`: Validates user sign-in input
  - `email`: Must be a valid email address
  - `password`: Must be at least 6 characters long

## Backend Service

An Express.js server that uses the common package for input validation.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- An NPM account (for publishing the package)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

```bash
# Development mode with auto-reload (using ts-node-dev)
npm run dev

# Or build and run the production build
npm run build
npm start
```

The server will start on `http://localhost:3000`

### API Endpoints

#### POST /signup

Validates user signup data using the common package.

**Request:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Success Response:**
```json
{
    "message": "Signup successful"
}
```

**Error Response:**
```json
{
    "message": "Something up with inputs"
}
```

## Development

### Common Package Development

1. Navigate to the common directory:
   ```bash
   cd common
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the package:
   ```bash
   # One-time build
   npm run build
   
   # Or watch for changes and auto-build
   npm run build:watch
   ```

4. Link the package locally for testing:
   ```bash
   # In the common directory
   npm link
   
   # In the backend directory
   npm link @harcharan_singh_/dummy_package
   ```

### Backend Service Development

1. After making changes to the common package, build it:
   ```bash
   cd common
   npm run build
   ```

2. If you're using `npm link` for local development, the changes will be reflected automatically. Otherwise, update the package version and reinstall:
   ```bash
   # In the backend directory
   npm uninstall @harcharan_singh_/dummy_package
   npm install @harcharan_singh_/dummy_package@latest
   ```

## Publishing the Package

1. First, log in to npm (if not already logged in):
   ```bash
   npm login
   # Follow the prompts to enter your npm credentials
   ```

2. Update the version in `common/package.json` following semantic versioning:
   ```bash
   # For a patch version bump
   npm version patch
   
   # For a minor version bump
   npm version minor
   
   # For a major version bump
   npm version major
   ```

3. Build the package:
   ```bash
   cd common
   npm run build
   ```

4. Publish the package:
   ```bash
   # Publish to the public npm registry
   npm publish --access=public
   
   # Or create a local .tgz file for testing
   npm pack
   ```

5. After publishing, update the package in the backend:
   ```bash
   cd ../backend
   npm install @harcharan_singh_/dummy_package@latest
   ```

## Versioning

The project follows [Semantic Versioning](https://semver.org/). When making changes:

1. **MAJOR** version for incompatible API changes
2. **MINOR** version for added functionality in a backward-compatible manner
3. **PATCH** version for backward-compatible bug fixes

## Troubleshooting

### Common Issues

1. **Package not found**
   - Make sure you're logged in to npm (`npm whoami`)
   - Check that the package name is correct in `package.json`
   - Ensure you have published the package with the correct version

2. **TypeScript errors**
   - Run `npm run build` in the common package
   - Make sure type declarations are included in the build
   - Check that the `types` field in `package.json` points to the correct declaration file

3. **Linking issues**
   - If using `npm link`, make sure to run `npm link` in the common package directory and `npm link @harcharan_singh_/dummy_package` in the backend directory
   - Run `npm rebuild` if the linked package isn't updating

## License

ISC

## Author

Harcharan Singh
