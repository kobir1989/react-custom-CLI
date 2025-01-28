# React Quickstart CLI 

A powerful command-line interface tool designed to accelerate React development workflows by
automating component creation and project structure setup.

<img width="1177" alt="Screenshot 2025-01-28 at 10 22 14 PM" src="https://github.com/user-attachments/assets/8253267e-e965-41c0-bacb-149f311128e9" />

<img width="1177" alt="Screenshot 2025-01-28 at 10 24 26 PM" src="https://github.com/user-attachments/assets/83afb00f-d306-438d-9330-ec162ec31e68" />

<img width="1177" alt="Screenshot 2025-01-28 at 10 25 12 PM" src="https://github.com/user-attachments/assets/eac04986-6d67-49c5-aa15-85e85d1a3558" />


## 🚀 Features

- **Component Generation**

  - Create functional components with TypeScript/JavaScript support
  - Styling options: SCSS, CSS, or no styling
  - Optional test file generation
  - Component name validation with PascalCase enforcement

- **Custom Hooks**

  - Generate hooks with proper naming convention (useHookName)
  - TypeScript/JavaScript support
  - Optional features:
    - Test file generation
    - Built-in React hooks integration (useState, useEffect, useCallback, useMemo)

- **Context Management**

  - Create Context providers with TypeScript/JavaScript support
  - Optional Redux-style reducer setup
  - Customizable context path structure

- **API Integration**

  - Generate API service templates
  - Choose between Axios or Fetch
  - Configurable base URL
  - TypeScript/JavaScript support

- **Form Generation**

  - Choose between React Hook Form or Formik
  - Optional Yup validation
  - Multiple field type support:
    - Text Input
    - Email
    - Password
    - Number
    - Select
    - Checkbox
    - Radio
    - Textarea

- **Testing Utilities**

  - Generate test files for existing components
  - Support for:
    - Unit Tests
    - Integration Tests
    - Snapshot Tests
  - Optional test mocks

- **Project Utilities**
  - Safe file/component removal with confirmation
  - Supports both root and src directory paths

## 📦 Installation

```bash
npm install -g react-quickstart-cli-2
```

## 🛠️ Usage

### Quick Start

```bash
# Start the CLI
react-quickstart-cli

# Or use the shorthand
rqc
```

### Component Generation

```bash
? Component name: MyComponent
? Component path (relative to src): components
? File type: tsx (tsx, jsx, ts, js)
? Styling solution: SCSS (css, scss, none)
? Additional features: 🧪 Test File
```

### Hook Generation

```bash
? Hook name: useMyHook
? Hook path (relative to src): hooks
? File type: ts (ts, js)
? Additional features: 🧪 Test File, 📦 useState, 🔄 useEffect
```

### Context Generation

```bash
? Context name: MyContext
? Context path (relative to src): contexts
? File type: tsx (tsx, jsx, ts, js)
? Include reducer: Yes (yes, no)
```

### Form Generation

```bash
? Form name: MyForm
? Form path (relative to src): components
? File type: tsx (tsx, jsx, ts, js)
? Choose form library: React Hook Form (react-hook-form, formik)
? Include Yup validation: Yes (yes, no)
? Select field types: Text Input, Email, Password
```

### API Service Generation

```bash
? Service name: UserService
? Service path (relative to src): services
? File type: ts (ts, js)
? Choose HTTP client: Axios (axios, fetch)
? Base URL: process.env.REACT_APP_API_URL
```

### Test Generation

```bash
? Path to component: components/Button/Button.tsx
? Select test types: Unit Tests, Integration Tests
? Include test mocks: Yes (yes, no)
```

### File Removal

```bash
? Enter the path to remove: components/OldComponent
? Are you sure you want to permanently delete "components/OldComponent"? Yes (yes, no)
```

## 📝 Notes

- All component and context names must start with an uppercase letter and contain only letters and
  numbers
- Hook names must follow the format `useHookName`
- File paths are relative to the src directory by default
- Test file generation is available for most generators
- File removal includes safety confirmations to prevent accidental deletions
