import inquirer from 'inquirer';

export const askContextQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'contextName',
      message: 'Context name:',
      prefix: '🔄',
      validate: (input) => {
        if (!input) return 'Context name is required';
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'includeReducer',
      message: 'Include reducer?',
      default: false,
    },
  ]);
};
