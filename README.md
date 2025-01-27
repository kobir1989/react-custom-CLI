# React Component CLI

A Simple command-line interface tool for accelerating React development workflows.

## Features

- 📦 Create new React components with custom configuration
- 🎣 Generate custom hooks with built-in hook integration
- 🔄 Create Context providers with optional reducer setup
- 🌐 Generate API services with axios/fetch configuration
- 📝 Create forms with validation (Formik/React Hook Form)
- 🧪 Generate test suites for components
- 🗑️ Component/file removal utility
- 🎨 Multiple styling options (SCSS, CSS, Styled Components)
- 📝 TypeScript/JavaScript support

## Installation

```bash
npm install -g my-cli
```

## Usage

Run the CLI:

```bash
my-cli
```

### Available Actions

1. **Create Component**

   - Generate React components with custom configuration
   - Choose styling solutions
   - Add test files automatically

2. **Generate Custom Hook**

   - Create custom React hooks with built-in hook integration (useState, useEffect, useCallback,
     useMemo)
   - Enforces proper hook naming convention (must start with 'use' followed by PascalCase name)
   - Supports both JavaScript (.js) and TypeScript (.ts) files
   - Flexible directory structure:
     - Default: `src/hooks/useHookName.js`
     - Custom: `src/features/auth/hooks/useAuthState.ts`

3. **Create Context**

   - Generate Context with Provider component
   - Optional reducer integration
   - Include custom hooks for context consumption

4. **Create API Service**

   - Generate API services with axios or fetch
   - Type-safe API calls
   - Error handling setup

5. **Create Form**

   - Generate forms with validation
   - Integration with Formik or React Hook Form
   - Custom validation rules

6. **Generate Test Suite**

   - Create test files for existing components
   - Integration with React Testing Library
   - Common test scenarios included

7. **Remove Component/File**
   - Safely remove components and related files
   - Confirmation prompt for safety
