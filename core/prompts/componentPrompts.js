import inquirer from 'inquirer';

export const askComponentQuestions = async () => {
  console.log('\n📦 Component Generator Configuration\n');
  return inquirer.prompt([
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
        { name: 'None - No styling file', value: 'None' },
      ],
      default: 'SCSS',
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Additional features:',
      prefix: '⚡',
      choices: [{ name: '🧪 Test File', value: 'test', checked: false }],
    },
  ]);
};
