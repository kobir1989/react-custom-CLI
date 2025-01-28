import inquirer from 'inquirer';

export const askHookQuestions = async () => {
  console.log('\n🎣 Hook Generator Configuration\n');
  return inquirer.prompt([
    {
      type: 'input',
      name: 'hookName',
      message: 'Hook name:',
      prefix: '📎',
      validate: (input) => {
        if (!input) return 'Hook name is required';
        if (!input.match(/^use[A-Z][a-zA-Z]*$/)) {
          return 'Hook name must be in format "useHookName" (e.g., useAuth, useMyHook)';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'path',
      message: 'Hook path (relative to src):',
      prefix: '📁',
      default: 'hooks',
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
      type: 'checkbox',
      name: 'features',
      message: 'Additional features:',
      prefix: '⚡',
      choices: [
        { name: '🧪 Test File', value: 'test', checked: false },
        { name: '📦 useState', value: 'useState', checked: false },
        { name: '🔄 useEffect', value: 'useEffect', checked: false },
        { name: '🎯 useCallback', value: 'useCallback', checked: false },
        { name: '💾 useMemo', value: 'useMemo', checked: false },
      ],
    },
  ]);
};
