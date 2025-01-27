import inquirer from 'inquirer';
import { fileExists, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const askTestQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'componentPath',
      message: 'Path to component (relative to src):',
      prefix: '🧪',
      validate: (input) => {
        if (!input) return 'Path is required';
        const fullPath = joinPaths(getProjectRoot(), 'src', input);
        if (!fileExists(fullPath)) return '❌ Component does not exist';
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
