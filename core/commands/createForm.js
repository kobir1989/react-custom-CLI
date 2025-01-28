import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createForm = ({ formName, formLibrary, includeValidation, fieldTypes }) => {
  // Extract path and form name from input
  const [fileName, customPath] = formName.split(' ').filter(Boolean);
  const basePath = customPath || joinPaths('src', 'components');
  const formDir = joinPaths(getProjectRoot(), basePath, fileName.replace(/\.(tsx|jsx|ts|js)$/, ''));

  // Extract form name without extension for validation
  const formNameWithoutExt = fileName.replace(/\.(tsx|jsx|ts|js)$/, '');

  // Validate form name
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(formNameWithoutExt)) {
    console.error(
      '❌ Error: Form name must start with uppercase letter and contain only letters and numbers'
    );
    return;
  }

  ensureDirectoryExists(formDir);

  let imports = `import React from 'react';\n`;

  if (formLibrary === 'react-hook-form') {
    imports += `import { useForm } from 'react-hook-form';\n`;
    if (includeValidation) {
      imports += `import { yupResolver } from '@hookform/resolvers/yup';\n`;
      imports += `import * as yup from 'yup';\n`;
    }
  } else {
    imports += `import { Formik, Form, Field } from 'formik';\n`;
    if (includeValidation) {
      imports += `import * as yup from 'yup';\n`;
    }
  }

  let formContent = imports + '\n';

  // Add types for TypeScript and JSX files
  if ((fileName.endsWith('.ts') || fileName.endsWith('.tsx')) && includeValidation) {
    formContent += `interface FormData {\n`;
    fieldTypes.forEach((type) => {
      formContent += `  ${type}: string;\n`;
    });
    formContent += `}\n\n`;
  }

  // Add validation schema if needed
  if (includeValidation) {
    formContent += generateValidationSchema(fieldTypes);
  }

  formContent += `const ${fileName.replace(/\.(tsx|jsx|ts|js)$/, '')} = () => {\n`;

  if (formLibrary === 'react-hook-form') {
    formContent += generateReactHookForm(includeValidation, fieldTypes, fileName);
  } else {
    formContent += generateFormikForm(includeValidation, fieldTypes, fileName);
  }

  formContent += `};\n\nexport default ${fileName.replace(/\.(tsx|jsx|ts|js)$/, '')};\n`;
  const isExtensionExist = fileName.match(/\.(tsx|jsx|ts|js)$/);
  const formPath = joinPaths(formDir, isExtensionExist ? fileName : `${fileName}.tsx`);

  writeFile(formPath, formContent);

  console.log('\n✅ Form created successfully!');
  console.log('📂 Location:', formDir);
  console.log('📦 Generated files:');
  console.log(`   • ${isExtensionExist ? fileName : `${fileName}.tsx`}`);
};

const generateValidationSchema = (fieldTypes) => {
  let schema = `const validationSchema = yup.object({\n`;
  fieldTypes.forEach((type) => {
    switch (type) {
      case 'text':
        schema += `  ${type}: yup.string().required('${type} is required'),\n`;
        break;
      case 'email':
        schema += `  ${type}: yup.string().email('Invalid email').required('Email is required'),\n`;
        break;
      case 'password':
        schema += `  ${type}: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),\n`;
        break;
      default:
        schema += `  ${type}: yup.string().required('${type} is required'),\n`;
    }
  });
  schema += `});\n\n`;
  return schema;
};

const generateReactHookForm = (includeValidation, fieldTypes, formName) => {
  let content = `  const { register, handleSubmit, formState: { errors } } = useForm${
    includeValidation && (formName.endsWith('.ts') || formName.endsWith('.tsx')) ? '<FormData>' : ''
  }(${includeValidation ? '{ resolver: yupResolver(validationSchema) }' : ''});\n\n`;
  content += `  const onSubmit = (data${
    includeValidation && (formName.endsWith('.ts') || formName.endsWith('.tsx')) ? ': FormData' : ''
  }) => {\n    console.log(data);\n  };\n\n`;
  content += `  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n`;
  content += generateFormFields(fieldTypes, 'react-hook-form');
  content += `      <button type="submit">Submit</button>\n`;
  content += `    </form>\n  );\n`;
  return content;
};

const generateFormikForm = (includeValidation, fieldTypes, formName) => {
  let content = `  const initialValues${
    includeValidation && (formName.endsWith('.ts') || formName.endsWith('.tsx')) ? ': FormData' : ''
  } = {\n`;
  fieldTypes.forEach((type) => {
    content += `    ${type}: '',\n`;
  });
  content += `  };\n\n`;

  content += `  const onSubmit = (values${
    includeValidation && (formName.endsWith('.ts') || formName.endsWith('.tsx')) ? ': FormData' : ''
  }) => {\n    console.log(values);\n  };\n\n`;

  content += `  return (\n    <Formik\n`;
  content += `      initialValues={initialValues}\n`;
  if (includeValidation) {
    content += `      validationSchema={validationSchema}\n`;
  }
  content += `      onSubmit={onSubmit}\n    >\n`;
  content += `      <Form>\n`;
  content += generateFormFields(fieldTypes, 'formik');
  content += `        <button type="submit">Submit</button>\n`;
  content += `      </Form>\n    </Formik>\n  );\n`;
  return content;
};

const generateFormFields = (fieldTypes, library) => {
  let fields = '';
  fieldTypes.forEach((type) => {
    if (library === 'react-hook-form') {
      fields += `      <div>\n`;
      fields += `        <label htmlFor="${type}">${
        type.charAt(0).toUpperCase() + type.slice(1)
      }</label>\n`;
      fields += `        <input type="${type}" {...register("${type}")} />\n`;
      fields += `        {errors.${type} && <span>{errors.${type}.message}</span>}\n`;
      fields += `      </div>\n`;
    } else {
      fields += `        <Field type="${type}" name="${type}" placeholder="${
        type.charAt(0).toUpperCase() + type.slice(1)
      }" />\n`;
    }
  });
  return fields;
};
