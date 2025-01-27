import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createContext = ({ contextName, includeReducer }) => {
  // Clean up the input and handle extension
  const input = contextName.trim();
  let baseName, extension;

  // Check if input already has an extension
  if (input.endsWith('.jsx') || input.endsWith('.tsx')) {
    const lastDotIndex = input.lastIndexOf('.');
    baseName = input.substring(0, lastDotIndex);
    extension = input.substring(lastDotIndex);
  } else if (input.includes(' ')) {
    // Split by space and get the last part as extension
    const parts = input.split(' ');
    const ext = parts.pop();
    extension = ext.startsWith('.') ? ext : `.${ext}`;
    baseName = parts.join('');
  } else {
    baseName = input;
    extension = '.tsx'; // Default extension
  }

  // Validate and normalize extension
  if (!['.jsx', '.tsx'].includes(extension.toLowerCase())) {
    extension = '.tsx';
  }

  const contextDir = joinPaths(getProjectRoot(), 'src', 'contexts');
  ensureDirectoryExists(contextDir);

  let contextContent = `import React, { createContext, useContext`;
  if (includeReducer) {
    contextContent += `, useReducer`;
  } else {
    contextContent += `, useState`;
  }
  contextContent += ` } from 'react';\n\n`;

  if (extension === '.tsx') {
    // Add TypeScript interfaces only for .tsx files
    contextContent += `// Define types\ntype ${baseName}ContextType = {\n  // Add your context types here\n};\n\n`;

    if (includeReducer) {
      contextContent += `// Define action types\ntype ${baseName}Action =\n  | { type: 'ACTION_1'; payload: any }\n  | { type: 'ACTION_2'; payload: any };\n\n`;
    }
  }

  if (includeReducer) {
    if (extension === '.tsx') {
      contextContent += `// Define reducer\nconst ${baseName}Reducer = (state: ${baseName}ContextType, action: ${baseName}Action) => {\n`;
    } else {
      contextContent += `// Define reducer\nconst ${baseName}Reducer = (state, action) => {\n`;
    }
    contextContent += `  switch (action.type) {\n`;
    contextContent += `    case 'ACTION_1':\n      return { ...state };\n`;
    contextContent += `    case 'ACTION_2':\n      return { ...state };\n`;
    contextContent += `    default:\n      return state;\n  }\n};\n\n`;
  }

  // Create context with or without type annotation
  if (extension === '.tsx') {
    contextContent += `// Create context\nconst ${baseName}Context = createContext<${baseName}ContextType | undefined>(undefined);\n\n`;
  } else {
    contextContent += `// Create context\nconst ${baseName}Context = createContext(undefined);\n\n`;
  }

  // Create provider component
  if (extension === '.tsx') {
    contextContent += `// Create provider component\nexport const ${baseName}Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {\n`;
  } else {
    contextContent += `// Create provider component\nexport const ${baseName}Provider = ({ children }) => {\n`;
  }

  if (includeReducer) {
    if (extension === '.tsx') {
      contextContent += `  const initialState: ${baseName}ContextType = {\n    // Initialize your state here\n  };\n\n`;
    } else {
      contextContent += `  const initialState = {\n    // Initialize your state here\n  };\n\n`;
    }
    contextContent += `  const [state, dispatch] = useReducer(${baseName}Reducer, initialState);\n\n`;
    contextContent += `  const value = { ...state, dispatch };\n`;
  } else {
    if (extension === '.tsx') {
      contextContent += `  const [state, setState] = useState<${baseName}ContextType>({\n    // Initialize your state here\n  });\n\n`;
    } else {
      contextContent += `  const [state, setState] = useState({\n    // Initialize your state here\n  });\n\n`;
    }
    contextContent += `  const value = { ...state, setState };\n`;
  }

  contextContent += `\n  return (\n    <${baseName}Context.Provider value={value}>\n      {children}\n    </${baseName}Context.Provider>\n  );\n};\n\n`;

  // Create custom hook
  contextContent += `// Custom hook to use the context\nexport const use${baseName} = () => {\n`;
  contextContent += `  const context = useContext(${baseName}Context);\n`;
  contextContent += `  if (context === undefined) {\n`;
  contextContent += `    throw new Error('use${baseName} must be used within a ${baseName}Provider');\n`;
  contextContent += `  }\n`;
  contextContent += `  return context;\n};\n`;

  // Use cleaned up names for the file path
  const contextPath = joinPaths(contextDir, `${baseName}${extension}`);
  writeFile(contextPath, contextContent);

  console.log('\n✅ Context created successfully!');
  console.log('📂 Location:', contextDir);
  console.log('📦 Generated files:');
  console.log(`   • ${baseName}${extension}`);
};
