import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createContext = ({ contextName, includeReducer }) => {
  const contextDir = joinPaths(getProjectRoot(), 'src', 'contexts');
  ensureDirectoryExists(contextDir);

  let contextContent = `import React, { createContext, useContext`;
  if (includeReducer) {
    contextContent += `, useReducer`;
  } else {
    contextContent += `, useState`;
  }
  contextContent += ` } from 'react';\n\n`;

  // Add TypeScript interfaces
  contextContent += `// Define types\ntype ${contextName}ContextType = {\n  // Add your context types here\n};\n\n`;

  if (includeReducer) {
    contextContent += `// Define action types\ntype ${contextName}Action =\n  | { type: 'ACTION_1'; payload: any }\n  | { type: 'ACTION_2'; payload: any };\n\n`;

    contextContent += `// Define reducer\nconst ${contextName.toLowerCase()}Reducer = (state: ${contextName}ContextType, action: ${contextName}Action) => {\n`;
    contextContent += `  switch (action.type) {\n`;
    contextContent += `    case 'ACTION_1':\n      return { ...state };\n`;
    contextContent += `    case 'ACTION_2':\n      return { ...state };\n`;
    contextContent += `    default:\n      return state;\n  }\n};\n\n`;
  }

  // Create context
  contextContent += `// Create context\nconst ${contextName}Context = createContext<${contextName}ContextType | undefined>(undefined);\n\n`;

  // Create provider component
  contextContent += `// Create provider component\nexport const ${contextName}Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {\n`;

  if (includeReducer) {
    contextContent += `  const initialState: ${contextName}ContextType = {\n    // Initialize your state here\n  };\n\n`;
    contextContent += `  const [state, dispatch] = useReducer(${contextName.toLowerCase()}Reducer, initialState);\n\n`;
    contextContent += `  const value = { ...state, dispatch };\n`;
  } else {
    contextContent += `  const [state, setState] = useState<${contextName}ContextType>({\n    // Initialize your state here\n  });\n\n`;
    contextContent += `  const value = { ...state, setState };\n`;
  }

  contextContent += `\n  return (\n    <${contextName}Context.Provider value={value}>\n      {children}\n    </${contextName}Context.Provider>\n  );\n};\n\n`;

  // Create custom hook
  contextContent += `// Custom hook to use the context\nexport const use${contextName} = () => {\n`;
  contextContent += `  const context = useContext(${contextName}Context);\n`;
  contextContent += `  if (context === undefined) {\n`;
  contextContent += `    throw new Error('use${contextName} must be used within a ${contextName}Provider');\n`;
  contextContent += `  }\n`;
  contextContent += `  return context;\n};\n`;

  const contextPath = joinPaths(contextDir, `${contextName}Context.tsx`);
  writeFile(contextPath, contextContent);

  console.log('\n✅ Context created successfully!');
  console.log('📂 Location:', contextDir);
  console.log('📦 Generated files:');
  console.log(`   • ${contextName}Context.tsx`);
};
