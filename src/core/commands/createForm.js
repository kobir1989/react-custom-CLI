import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createForm = ({
  formName,
  formPath,
  fileType,
  formLibrary,
  includeValidation,
  fieldTypes,
}) => {
  // Ensure form name follows convention
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(formName)) {
    console.error(
      '❌ Error: Form name must start with uppercase letter and contain only letters and numbers'
    );
    return;
  }

  // Construct the form directory path
  const basePath = formPath || 'components';
  const formDir = joinPaths(getProjectRoot(), 'src', basePath);

  // Construct the full file name with proper extension
  const fileName = `${formName}.${fileType}`;
  const fullFormPath = joinPaths(formDir, fileName);

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
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
    formContent += `interface FormData {\n`;
    fieldTypes.forEach((type) => {
      switch (type) {
        case 'number':
          formContent += `  ${type}: number;\n`;
          break;
        case 'checkbox':
          formContent += `  ${type}: boolean;\n`;
          break;
        default:
          formContent += `  ${type}: string;\n`;
      }
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

  writeFile(fullFormPath, formContent);

  console.log('\n✅ Form created successfully!');
  console.log('📂 Location:', formDir);
  console.log('📦 Generated files:');
  console.log(`   • ${fileName}`);
};

const generateValidationSchema = (fieldTypes) => {
  let schema = `const validationSchema = yup.object({\n`;
  fieldTypes.forEach((type) => {
    switch (type) {
      case 'email':
        schema += `  ${type}: yup.string().email('Invalid email').required('Email is required'),\n`;
        break;
      case 'password':
        schema += `  ${type}: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),\n`;
        break;
      case 'number':
        schema += `  ${type}: yup.number().typeError('Number is required').required('Number is required'),\n`;
        break;
      case 'checkbox':
        schema += `  ${type}: yup.boolean().oneOf([true], 'Checkbox is required'),\n`;
        break;
      case 'radio':
        schema += `  ${type}: yup.string().required('Radio selection is required'),\n`;
        break;
      default:
        schema += `  ${type}: yup.string().required('${
          type.charAt(0).toUpperCase() + type.slice(1)
        } is required'),\n`;
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

      if (type === 'radio') {
        fields += `        <label>Radio</label>\n`;
        fields += `        <div>\n`;
        fields += `          <input id="radio1" type="radio" value="option1" {...register("radio")} />\n`;
        fields += `          <label htmlFor="radio1">Option 1</label>\n`;
        fields += `        </div>\n`;
        fields += `        <div>\n`;
        fields += `          <input id="radio2" type="radio" value="option2" {...register("radio")} />\n`;
        fields += `          <label htmlFor="radio2">Option 2</label>\n`;
        fields += `        </div>\n`;
      } else {
        fields += `        <label htmlFor="${type}">${
          type.charAt(0).toUpperCase() + type.slice(1)
        }</label>\n`;
        switch (type) {
          case 'select':
            fields += `        <select id="${type}" {...register("${type}")}>\n`;
            fields += `          <option value="">Select an option</option>\n`;
            fields += `          <option value="option1">Option 1</option>\n`;
            fields += `          <option value="option2">Option 2</option>\n`;
            fields += `        </select>\n`;
            break;
          case 'textarea':
            fields += `        <textarea id="${type}" {...register("${type}")} />\n`;
            break;
          default:
            fields += `        <input id="${type}" type="${type}" {...register("${type}")} />\n`;
        }
      }

      fields += `        {errors.${type} && <span>{errors.${type}.message}</span>}\n`;
      fields += `      </div>\n`;
    } else {
      // Formik fields handling...
      switch (type) {
        case 'select':
          fields += `        <Field as="select" name="${type}">\n`;
          fields += `          <option value="">Select an option</option>\n`;
          fields += `          <option value="option1">Option 1</option>\n`;
          fields += `          <option value="option2">Option 2</option>\n`;
          fields += `        </Field>\n`;
          break;
        case 'textarea':
          fields += `        <Field as="textarea" name="${type}" placeholder="${
            type.charAt(0).toUpperCase() + type.slice(1)
          }" />\n`;
          break;
        default:
          fields += `        <Field type="${type}" name="${type}" placeholder="${
            type.charAt(0).toUpperCase() + type.slice(1)
          }" />\n`;
      }
    }
  });
  return fields;
};
