import fs from 'fs-extra';
import path from 'path';

export const ensureDirectoryExists = (dir) => {
  fs.ensureDirSync(dir);
};

export const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
};

export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

export const removeFile = async (filePath) => {
  await fs.remove(filePath);
};

export const getProjectRoot = () => {
  return process.cwd();
};

export const joinPaths = (...paths) => {
  return path.join(...paths);
};
