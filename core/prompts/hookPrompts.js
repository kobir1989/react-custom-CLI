import inquirer from 'inquirer';

export const askHookQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'hookName',
      message: 'Hook name (will be prefixed with "use"):',
      prefix: '🪝',
      validate: (input) => {
        if (!input) return 'Hook name is required';
        return true;
      },
      filter: (input) => (input.startsWith('use') ? input : `use${input}`),
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Include built-in hooks:',
      choices: [
        { name: 'useState', value: 'useState', checked: false },
        { name: 'useEffect', value: 'useEffect', checked: false },
        { name: 'useCallback', value: 'useCallback', checked: false },
        { name: 'useMemo', value: 'useMemo', checked: false },
      ],
    },
  ]);
};
