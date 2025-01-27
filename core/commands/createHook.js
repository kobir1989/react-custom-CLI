import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createHook = ({ hookName, features, path }) => {
  // Process the path to ensure it ends with /hooks
  const normalizedPath = path || 'src/hooks';
  const hooksDir = normalizedPath.endsWith('hooks')
    ? joinPaths(getProjectRoot(), normalizedPath)
    : joinPaths(getProjectRoot(), normalizedPath, 'hooks');

  ensureDirectoryExists(hooksDir);

  let imports = `import { ${features.join(', ')} } from 'react';\n\n`;

  let hookContent = imports;
  hookContent += `export const ${hookName.name} = () => {\n`;

  // Add state if useState is selected
  if (features.includes('useState')) {
    hookContent += `  const [state, setState] = useState();\n\n`;
  }

  // Add effect if useEffect is selected
  if (features.includes('useEffect')) {
    hookContent += `  useEffect(() => {\n    // Effect logic here\n  }, []);\n\n`;
  }

  // Add callback if useCallback is selected
  if (features.includes('useCallback')) {
    hookContent += `  const handleCallback = useCallback(() => {\n    // Callback logic here\n  }, []);\n\n`;
  }

  // Add memo if useMemo is selected
  if (features.includes('useMemo')) {
    hookContent += `  const memoizedValue = useMemo(() => {\n    // Memoization logic here\n    return {};\n  }, []);\n\n`;
  }

  hookContent += `  return {\n    // Return values here\n  };\n};\n`;

  const fileName = `${hookName.name}.${hookName.extension}`;
  const hookPath = joinPaths(hooksDir, fileName);

  writeFile(hookPath, hookContent);

  console.log('\n✅ Hook created successfully!');
  console.log('📂 Location:', hooksDir);
  console.log('📦 Generated files:');
  console.log(`   • ${fileName}`);
};
