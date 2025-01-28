# React Component CLI

A powerful command-line interface tool designed to accelerate React development workflows by
automating component creation and project structure setup.

## 🚀 Features

- **Component Generation**

  - Create functional/class components
  - TypeScript/JavaScript support
  - Styling options (CSS, SCSS, Styled Components)
  - Automatic test file generation
  - PropTypes/TypeScript interface generation

- **Custom Hooks**

  - Generate hook templates with best practices
  - Built-in React hooks integration
  - TypeScript support with proper typing
  - Automatic documentation generation

- **Context Management**

  - Create Context providers with boilerplate
  - Optional Redux-style reducer setup
  - Type-safe context consumers
  - Custom hook generation for context

- **API Integration**

  - Generate API service templates
  - Axios/Fetch configuration
  - Error handling utilities
  - TypeScript interfaces for responses

- **Form Generation**

  - Formik/React Hook Form integration
  - Custom validation schemas
  - Common form patterns
  - Reusable form components

- **Testing Utilities**

  - React Testing Library setup
  - Jest configuration
  - Common test scenarios
  - Snapshot testing templates

- **Project Utilities**
  - Safe file/component removal
  - Project structure generation
  - Code style enforcement

## 📦 Installation

```bash
npm install -g react-component-cli
```

## 🛠️ Usage

### Quick Start

```bash
# Start the CLI
react-template-cli

# Or use the shorthand
rcc
```

### Command Reference

```bash
# Create a new component
rcc create component MyComponent

# Generate a custom hook
rcc create hook useCustomHook

# Create a context
rcc create context AuthContext

# Generate an API service
rcc create service UserService

# Create a form
rcc create form LoginForm

# Generate tests
rcc create test MyComponent

# Remove a component
rcc remove MyComponent
```

## 📁 Directory Structure

The CLI generates files following this default structure:

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.test.tsx
│       └── ComponentName.styles.ts
├── hooks/
│   └── useHookName.ts
├── contexts/
│   └── ContextName/
│       ├── ContextNameContext.tsx
│       └── ContextNameReducer.ts
├── services/
│   └── ServiceName.ts
└── forms/
    └── FormName/
        ├── FormName.tsx
        └── validation.ts
```

## ⚙️ Configuration

Create a `react-component-cli.config.js` in your project root:

```javascript
module.exports = {
  typescript: true,
  styling: 'styled-components',
  testingLibrary: true,
  path: 'src/components',
  templates: './templates',
};
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by best practices in React development
- Built with developer experience in mind
- Community-driven features and improvements

## 📫 Support

- Documentation: [Full Documentation](https://docs.react-component-cli.dev)
- Issues: [GitHub Issues](https://github.com/username/react-component-cli/issues)
- Discussions: [GitHub Discussions](https://github.com/username/react-component-cli/discussions)
