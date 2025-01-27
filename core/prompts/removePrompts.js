import inquirer from 'inquirer';
import { fileExists, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const askRemovalQuestions = async () => {
  console.log('\n📁 Current working directory:', getProjectRoot());
  return inquirer.prompt([
    {
      type: 'input',
      name: 'pathToRemove',
      message: 'Enter the path to remove (relative to src):',
      prefix: '🗑️ ',
      validate: (input) => {
        if (!input) return 'Path is required';
        const fullPath = joinPaths(getProjectRoot(), 'src', input);
        if (!fileExists(fullPath)) return '❌ Path does not exist';
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirmRemoval',
      message: (answers) =>
        `⚠️  Are you sure you want to remove "${answers.pathToRemove}"? This action cannot be undone.`,
      default: false,
      prefix: '❗',
    },
  ]);
};
