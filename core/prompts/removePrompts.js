import inquirer from 'inquirer';
import { fileExists, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const askRemovalQuestions = async () => {
  console.log('\n📁 Current working directory:', getProjectRoot());
  return inquirer.prompt([
    {
      type: 'input',
      name: 'pathToRemove',
      message: 'Enter the path to remove (example: components/**/*):',
      prefix: '🗑️ ',
      validate: (input) => {
        if (!input) return 'Path is required';
        // Check if path exists from root
        const fullPath = joinPaths(getProjectRoot(), input);
        if (!fileExists(fullPath)) {
          // Try src folder as fallback
          const srcPath = joinPaths(getProjectRoot(), 'src', input);
          if (!fileExists(srcPath)) {
            return '❌ Path does not exist in root or src directory';
          }
        }
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirmRemoval',
      message: (answers) =>
        `⚠️  Are you sure you want to permanently delete "${answers.pathToRemove}"?`,
      default: false,
      prefix: '❗',
    },
  ]);
};
