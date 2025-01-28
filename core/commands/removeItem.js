import { removeFile, fileExists, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const removeItem = async (pathToRemove) => {
  try {
    // First try root directory
    const rootPath = joinPaths(getProjectRoot(), pathToRemove);
    // Then try src directory
    const srcPath = joinPaths(getProjectRoot(), 'src', pathToRemove);

    // Check which path exists and remove the correct one
    if (fileExists(rootPath)) {
      await removeFile(rootPath);
      console.log(`\n✅ Successfully removed: ${rootPath}`);
    } else if (fileExists(srcPath)) {
      await removeFile(srcPath);
      console.log(`\n✅ Successfully removed: ${srcPath}`);
    } else {
      throw new Error('Path not found in root or src directory');
    }
  } catch (error) {
    console.error('❌ Error removing path:', error.message);
  }
};
