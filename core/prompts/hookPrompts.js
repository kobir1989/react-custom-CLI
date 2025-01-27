import inquirer from 'inquirer';

export const askHookQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'hookName',
      message: 'Hook name (must be in format "useHookName") and extension (.js/.ts):',
      prefix: '🎣',
      validate: (input) => {
        if (!input) return 'Hook name is required';
        if (typeof input === 'object' && input.name) {
          if (!input.name.match(/^use[A-Z][a-zA-Z]*$/)) {
            return 'Hook name must be in format "useHookName" (e.g., useAuth, useMyHook)';
          }
          return true;
        }

        const cleanInput = input.replace(/\.(js|ts)$/i, '');
        const parts = cleanInput.trim().split(' ');

        const hookName = parts[0];
        if (!hookName.match(/^use[A-Z][a-zA-Z]*$/)) {
          return 'Hook name must be in format "useHookName" (e.g., useAuth, useMyHook)';
        }

        if (parts.length > 2) return 'Please provide only hook name and optional extension (ts/js)';
        if (parts[1] && !['ts', 'js'].includes(parts[1]))
          return 'Extension must be either ts or js';
        return true;
      },
      filter: (input) => {
        if (typeof input === 'object' && input.name) return input;

        const cleanInput = input.replace(/\.(js|ts)$/i, '');
        const [name, ext] = cleanInput.trim().split(' ');

        if (!name.match(/^use[A-Z][a-zA-Z]*$/)) {
          return input;
        }

        return {
          name: name,
          extension: ext || 'js',
        };
      },
      transformer: (input) => {
        if (typeof input === 'object' && input.name) {
          return `${input.name} ${input.extension}`;
        }
        return input;
      },
    },
    {
      type: 'input',
      name: 'path',
      message: 'Path to create hook (optional, default: src/hooks):',
      prefix: '📂',
      default: 'src/hooks',
      filter: (input) => {
        // Remove leading and trailing slashes
        return input.replace(/^\/+|\/+$/g, '');
      },
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
