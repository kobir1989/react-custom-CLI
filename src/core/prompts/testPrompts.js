import inquirer from 'inquirer';
import { fileExists, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const askTestQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'componentPath',
      message: 'Path to component (relative to src example: components/Button/Button.tsx):',
      prefix: '🧪',
      validate: (input) => {
        if (!input) return 'Path is required';
        const fullPath = joinPaths(getProjectRoot(), 'src', input);

        // Check for valid component file extensions
        const validExtensions = ['.js', '.jsx', '.ts', '.tsx'];
        const hasValidExtension = validExtensions.some((ext) => fullPath.endsWith(ext));

        if (!hasValidExtension) {
          return '❌ Component file must have a valid extension (.js, .jsx, .ts, .tsx)';
        }

        if (!fileExists(fullPath)) {
          return '❌ Component file does not exist';
        }

        return true;
      },
    },
    {
      type: 'checkbox',
      name: 'testTypes',
      message: 'Select test types to generate:',
      choices: [
        { name: 'Unit Tests', value: 'unit', checked: true },
        { name: 'Integration Tests', value: 'integration' },
        { name: 'Snapshot Tests', value: 'snapshot' },
      ],
    },
    {
      type: 'confirm',
      name: 'includeMocks',
      message: 'Include test mocks?',
      default: true,
    },
  ]);
};
