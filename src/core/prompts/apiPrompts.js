import inquirer from 'inquirer';

export const askApiServiceQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: '🌐 serviceName',
      message: 'Service name (without extension):',
      prefix: '🌐 ',
      validate: (input) => {
        if (!input) return 'Service name is required';
        if (input.includes('.')) return 'Please enter the name without file extension';
        return true;
      },
    },
    {
      type: 'input',
      name: 'path',
      message: 'Service path (relative to src):',
      prefix: '📁',
      default: 'services',
    },
    {
      type: 'list',
      name: 'fileType',
      message: 'File type:',
      prefix: '📄',
      choices: [
        { name: 'TypeScript (ts)', value: 'ts' },
        { name: 'JavaScript (js)', value: 'js' },
      ],
      default: 'ts',
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
