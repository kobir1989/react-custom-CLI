import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createComponent = (name, componentPath, fileType, styleType, features) => {
  const componentDir = joinPaths(getProjectRoot(), 'src', componentPath, name);

  // Create component directory
  console.log('\n📁 Creating component directory...');
  ensureDirectoryExists(componentDir);

  // Generate imports
  let imports = `import React from 'react';\n`;
  if (styleType === 'Styled Components') {
    imports += `import styled from 'styled-components';\n`;
  } else if (styleType === 'CSS') {
    imports += `import styles from './${name}.css';\n`;
  } else if (styleType === 'SCSS') {
    imports += `import styles from './${name}.scss';\n`;
  }

  // Generate component content
  let componentContent = imports + '\n';

  // Add styled components if selected
  if (styleType === 'Styled Components') {
    componentContent += `const StyledWrapper = styled.div\`\n  // Add your styles here\n\`;\n\n`;
  }

  // Add Props interface for TypeScript
  if (fileType === 'tsx') {
    componentContent += `interface ${name}Props {\n  // Add your props here\n}\n\n`;
  }

  // Generate the component
  const componentDeclaration =
    fileType === 'tsx'
      ? `const ${name}: React.FC<${name}Props> = () => {`
      : `const ${name} = () => {`;

  componentContent += componentDeclaration + '\n';

  const wrapperElement =
    styleType === 'Styled Components' ? 'StyledWrapper' : `div className="${name}"`;
  componentContent += `  return (\n    <${wrapperElement}>\n      ${name} Component\n    </${
    wrapperElement.split(' ')[0]
  }>\n  );\n};\n\n`;

  componentContent += `export default ${name};\n`;

  // Write component file
  writeFile(joinPaths(componentDir, `${name}.${fileType}`), componentContent);

  // Create style file
  if (styleType !== 'None' && styleType !== 'Styled Components') {
    const styleExtension = styleType.toLowerCase();
    const styleContent = `// Styles for ${name} component\n\n.${name} {\n  // Add your styles here\n}\n`;
    writeFile(joinPaths(componentDir, `${name}.${styleExtension}`), styleContent);
  }

  // Create test file
  if (features.includes('test')) {
    const testContent = `import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${name} from './${name}';\n\ndescribe('${name}', () => {\n  it('renders successfully', () => {\n    render(<${name} />);\n    expect(screen.getByText('${name} Component')).toBeInTheDocument();\n  });\n});\n`;
    writeFile(joinPaths(componentDir, `${name}.test.${fileType}`), testContent);
  }

  console.log('\n✅ Component created successfully!');
  console.log('📂 Location:', componentDir);
  console.log('📦 Generated files:');
  console.log(`   • ${name}.${fileType}`);
  if (styleType !== 'None' && styleType !== 'Styled Components') {
    console.log(`   • ${name}.${styleType.toLowerCase()}`);
  }
  if (features.includes('test')) {
    console.log(`   • ${name}.test.${fileType}`);
  }
};
