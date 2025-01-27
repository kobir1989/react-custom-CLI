import inquirer from 'inquirer';

export const askApiServiceQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'serviceName',
      message: 'Service name:',
      prefix: '🌐',
    },
    {
      type: 'list',
      name: 'httpClient',
      message: 'Choose HTTP client:',
      choices: [
        { name: 'Axios', value: 'axios' },
        { name: 'Fetch', value: 'fetch' },
      ],
    },
    {
      type: 'input',
      name: 'baseURL',
      message: 'Base URL (optional):',
      default: 'process.env.REACT_APP_API_URL',
    },
  ]);
};
