import inquirer from 'inquirer';

export const askInitialAction = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Welcome to the React Custom CLI! What would you like to do?',
      choices: [
        {
          name: '📦 Create new component',
          value: 'create',
          description: 'Generate a new React component with custom configuration',
        },
        {
          name: '🎣 Generate custom hook',
          value: 'hook',
          description: 'Create a new custom React hook',
        },
        {
          name: '🔄 Create context',
          value: 'context',
          description: 'Generate a new Context with Provider and hooks',
        },
        {
          name: '🌐 Create API service',
          value: 'api',
          description: 'Generate API service with axios/fetch',
        },
        {
          name: '📝 Create form Component',
          value: 'form',
          description: 'Generate form with validation (Formik/React Hook Form)',
        },
        {
          name: '🧪 Generate test suite',
          value: 'test',
          description: 'Create test files for existing components',
        },
        {
          name: '🗑️  Remove file/folder',
          value: 'remove',
          description: 'Delete an existing component or file',
        },
      ],
    },
  ]);
  return action;
};
