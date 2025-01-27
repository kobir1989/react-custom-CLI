import { removeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const removeItem = async (pathToRemove) => {
  try {
    const fullPath = joinPaths(getProjectRoot(), 'src', pathToRemove);
    await removeFile(fullPath);
    console.log(`\n✅ Successfully removed: ${fullPath}`);
  } catch (error) {
    console.error('❌ Error removing path:', error.message);
  }
};
