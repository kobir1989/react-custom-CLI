import inquirer from 'inquirer';

export const askContextQuestions = async () => {
  console.log('\n🔄 Context Generator Configuration\n');
  return inquirer.prompt([
    {
      type: 'input',
      name: 'contextName',
      message: 'Context name:',
      prefix: '📎',
      validate: (input) => {
        if (!input) return 'Context name is required';
        if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
          return 'Context name must start with uppercase letter and contain only letters and numbers';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'contextPath',
      message: 'Context path (relative to src):',
      prefix: '📁',
      default: 'contexts',
    },
    {
      type: 'list',
      name: 'fileType',
      message: 'File type:',
      prefix: '📄',
      choices: [
        { name: 'TypeScript (tsx)', value: 'tsx' },
        { name: 'JavaScript (jsx)', value: 'jsx' },
      ],
      default: 'tsx',
    },
    {
      type: 'confirm',
      name: 'includeReducer',
      message: 'Include reducer?',
      prefix: '⚡',
      default: false,
    },
  ]);
};
