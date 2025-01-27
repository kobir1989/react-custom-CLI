#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

const askInitialAction = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Welcome to the React Component CLI! What would you like to do?',
      choices: [
        {
          name: '📦 Create new component',
          value: 'create',
          description: 'Generate a new React component with custom configuration',
        },
        {
          name: '🗑️  Remove component/file',
          value: 'remove',
          description: 'Delete an existing component or file',
        },
      ],
    },
  ]);
  return action;
};

const askRemovalQuestions = async () => {
  console.log('\n📁 Current working directory:', process.cwd());
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'pathToRemove',
      message: 'Enter the path to remove (relative to src):',
      prefix: '🗑️ ',
      validate: (input) => {
        if (!input) return 'Path is required';
        const fullPath = path.join(process.cwd(), 'src', input);
        if (!fs.existsSync(fullPath)) return '❌ Path does not exist';
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirmRemoval',
      message: (answers) =>
        `⚠️  Are you sure you want to remove "${answers.pathToRemove}"? This action cannot be undone.`,
      default: false,
      prefix: '❗',
    },
  ]);
  return answers;
};

// Prompt user for component details
const askQuestions = async () => {
  console.log('\n📦 Component Generator Configuration\n');
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Component name:',
      prefix: '📎',
      validate: (input) => {
        if (!input) return 'Component name is required';
        if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
          return 'Component name must start with uppercase letter and contain only letters and numbers';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'componentPath',
      message: 'Component path (relative to src):',
      prefix: '📁',
      default: 'components',
    },
    {
      type: 'list',
      name: 'fileType',
      message: 'File type:',
      prefix: '📄',
      choices: [
        { name: 'TypeScript React (tsx)', value: 'tsx' },
        { name: 'JavaScript React (jsx)', value: 'jsx' },
        { name: 'TypeScript (ts)', value: 'ts' },
        { name: 'JavaScript (js)', value: 'js' },
      ],
      default: 'tsx',
    },
    {
      type: 'list',
      name: 'styleType',
      message: 'Styling solution:',
      prefix: '🎨',
      choices: [
        { name: 'SCSS - Sass with more features', value: 'SCSS' },
        { name: 'CSS - Standard styling', value: 'CSS' },
        { name: 'Styled Components - CSS-in-JS', value: 'Styled Components' },
        { name: 'None - No styling file', value: 'None' },
      ],
      default: 'SCSS',
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Additional features:',
      prefix: '⚡',
      choices: [
        { name: '📝 Props Interface (recommended for TS)', value: 'props', checked: true },
        { name: '🔄 useState Hook', value: 'useState', checked: false },
        { name: '⚡ useEffect Hook', value: 'useEffect', checked: false },
        { name: '🎣 Custom Hooks', value: 'customHooks', checked: false },
        { name: '🧪 Test File', value: 'test', checked: true },
      ],
    },
  ]);

  if (answers.features.includes('customHooks')) {
    const { hooks } = await inquirer.prompt([
      {
        type: 'input',
        name: 'hooks',
        message: 'Enter hook names (comma separated):',
        filter: (input) => input.split(',').map((hook) => hook.trim()),
      },
    ]);
    answers.hooks = hooks;
  }

  return answers;
};

// Create the component files
const createComponent = (name, componentPath, fileType, styleType, features, hooks = []) => {
  const componentDir = path.join(process.cwd(), 'src', componentPath, name);

  // Add directory creation message
  console.log('\n📁 Creating component directory...');
  fs.ensureDirSync(componentDir);

  // Generate imports
  let imports = `import React from 'react';\n`;
  if (features.includes('useState')) imports += `import { useState } from 'react';\n`;
  if (features.includes('useEffect')) imports += `import { useEffect } from 'react';\n`;
  if (styleType === 'Styled Components') {
    imports += `import styled from 'styled-components';\n`;
  } else if (styleType === 'CSS') {
    imports += `import './${name}.css';\n`;
  } else if (styleType === 'SCSS') {
    imports += `import './${name}.scss';\n`;
  }

  // Generate custom hooks
  if (features.includes('customHooks')) {
    hooks.forEach((hook) => {
      const hookName = hook.startsWith('use') ? hook : `use${hook}`;
      imports += `import { ${hookName} } from '../hooks/${hookName}';\n`;
    });
  }

  // Generate component content
  let componentContent = imports + '\n';

  // Add Props interface for TypeScript
  if (fileType === 'tsx' && features.includes('props')) {
    componentContent += `interface ${name}Props {\n  // Add your props here\n}\n\n`;
  }

  // Generate the component
  const componentDeclaration =
    fileType === 'tsx'
      ? `const ${name}: React.FC<${name}Props> = () => {`
      : `const ${name} = () => {`;

  componentContent += componentDeclaration + '\n';

  // Add useState if selected
  if (features.includes('useState')) {
    componentContent += `  const [state, setState] = useState();\n\n`;
  }

  // Add useEffect if selected
  if (features.includes('useEffect')) {
    componentContent += `  useEffect(() => {\n    // Add effect logic here\n  }, []);\n\n`;
  }

  // Add custom hooks
  if (features.includes('customHooks')) {
    hooks.forEach((hook) => {
      const hookName = hook.startsWith('use') ? hook : `use${hook}`;
      componentContent += `  const ${hookName.replace('use', '').toLowerCase()} = ${hookName}();\n`;
    });
    componentContent += '\n';
  }

  componentContent += `  return (\n    <div className="${name}">\n      ${name} Component\n    </div>\n  );\n};\n\n`;
  componentContent += `export default ${name};\n`;

  // Write component file
  fs.writeFileSync(path.join(componentDir, `${name}.${fileType}`), componentContent);

  // Create style file
  if (styleType !== 'None' && styleType !== 'Styled Components') {
    const styleExtension = styleType.toLowerCase();
    const styleContent = `// Styles for ${name} component\n\n.${name} {\n  // Add your styles here\n}\n`;
    fs.writeFileSync(path.join(componentDir, `${name}.${styleExtension}`), styleContent);
  }

  // Create test file
  if (features.includes('test')) {
    const testContent = `import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${name} from './${name}';\n\ndescribe('${name}', () => {\n  it('renders successfully', () => {\n    render(<${name} />);\n    expect(screen.getByText('${name} Component')).toBeInTheDocument();\n  });\n});\n`;
    fs.writeFileSync(path.join(componentDir, `${name}.test.${fileType}`), testContent);
  }

  console.log('\n✅ Component created successfully!');
  console.log('📂 Location:', componentDir);
  console.log('📦 Generated files:');
  console.log(`   • ${name}.${fileType}`);
  if (styleType !== 'None' && styleType !== 'Styled Components') {
    console.log(`   • ${name}.${styleType.toLowerCase()}`);
  }
  if (features.includes('test')) {
    console.log(`   • ${name}.test.${fileType}`);
  }
};

const removeItem = async (pathToRemove) => {
  try {
    const fullPath = path.join(process.cwd(), 'src', pathToRemove);
    await fs.remove(fullPath);
    console.log(`Successfully removed: ${fullPath}`);
  } catch (error) {
    console.error('Error removing path:', error.message);
  }
};

// Updated main execution
const main = async () => {
  const action = await askInitialAction();

  if (action === 'create') {
    const { componentName, componentPath, fileType, styleType, features, hooks } =
      await askQuestions();
    createComponent(componentName, componentPath, fileType, styleType, features, hooks);
  } else if (action === 'remove') {
    const { pathToRemove, confirmRemoval } = await askRemovalQuestions();
    if (confirmRemoval) {
      await removeItem(pathToRemove);
    } else {
      console.log('Removal cancelled.');
    }
  }
};

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});

// chmod +x cli.js
// npm link
// npm unlink
// which react-component-cli (this should show the path to your globally installed CLI tool.)

// my-cli (global)
// my-cli (local)

// npm install -g my-cli
// my-cli
// my-cli (local)
