import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';
import path from 'path';

export const createTestSuite = async ({ componentPath, testTypes, includeMocks }) => {
  const fullPath = joinPaths(getProjectRoot(), 'src', componentPath);
  const componentName = path.basename(componentPath);
  const testDir = path.dirname(fullPath);

  let testContent = `import React from 'react';\n`;
  testContent += `import { render, screen, fireEvent } from '@testing-library/react';\n`;
  if (testTypes.includes('integration')) {
    testContent += `import userEvent from '@testing-library/user-event';\n`;
  }
  testContent += `import ${componentName} from './${componentName}';\n\n`;

  if (includeMocks) {
    testContent += `// Mocks\nconst mockProps = {\n  // Add mock props here\n};\n\n`;
  }

  testContent += `describe('${componentName}', () => {\n`;

  if (testTypes.includes('unit')) {
    testContent += generateUnitTests(componentName, includeMocks);
  }

  if (testTypes.includes('snapshot')) {
    testContent += generateSnapshotTests(componentName, includeMocks);
  }

  if (testTypes.includes('integration')) {
    testContent += generateIntegrationTests(componentName, includeMocks);
  }

  testContent += `});\n`;

  const testPath = joinPaths(testDir, `${componentName}.test.tsx`);
  writeFile(testPath, testContent);

  console.log('\n✅ Test suite created successfully!');
  console.log('📂 Location:', testDir);
  console.log('📦 Generated files:');
  console.log(`   • ${componentName}.test.tsx`);
};

const generateUnitTests = (componentName, includeMocks) => `
  it('renders successfully', () => {
    render(<${componentName} ${includeMocks ? '{...mockProps}' : ''} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });\n\n`;

const generateSnapshotTests = (componentName, includeMocks) => `
  it('matches snapshot', () => {
    const { container } = render(<${componentName} ${includeMocks ? '{...mockProps}' : ''} />);
    expect(container).toMatchSnapshot();
  });\n\n`;

const generateIntegrationTests = (componentName, includeMocks) => `
  it('handles user interactions', async () => {
    render(<${componentName} ${includeMocks ? '{...mockProps}' : ''} />);
    // Add interaction tests here
  });\n`;
