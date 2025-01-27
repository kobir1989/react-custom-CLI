import { ensureDirectoryExists, writeFile, joinPaths, getProjectRoot } from '../utils/fileUtils.js';

export const createForm = ({ formName, formLibrary, includeValidation, fieldTypes }) => {
  const formDir = joinPaths(getProjectRoot(), 'src', 'components', formName);
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

  // Add validation schema if needed
  if (includeValidation) {
    formContent += generateValidationSchema(fieldTypes);
  }

  formContent += `const ${formName} = () => {\n`;

  if (formLibrary === 'react-hook-form') {
    formContent += generateReactHookForm(includeValidation, fieldTypes);
  } else {
    formContent += generateFormikForm(includeValidation, fieldTypes);
  }

  formContent += `};\n\nexport default ${formName};\n`;

  const formPath = joinPaths(formDir, `${formName}.tsx`);
  writeFile(formPath, formContent);

  console.log('\n✅ Form created successfully!');
  console.log('📂 Location:', formDir);
  console.log('📦 Generated files:');
  console.log(`   • ${formName}.tsx`);
};

const generateValidationSchema = (fieldTypes) => {
  let schema = `const validationSchema = yup.object({\n`;
  fieldTypes.forEach((type) => {
    switch (type) {
      case 'text':
        schema += `  name: yup.string().required('Name is required'),\n`;
        break;
      case 'email':
        schema += `  email: yup.string().email('Invalid email').required('Email is required'),\n`;
        break;
      case 'password':
        schema += `  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),\n`;
        break;
      // Add more cases as needed
    }
  });
  schema += `});\n\n`;
  return schema;
};

const generateReactHookForm = (includeValidation, fieldTypes) => {
  let content = `  const { register, handleSubmit, formState: { errors } } = useForm(${
    includeValidation ? '{ resolver: yupResolver(validationSchema) }' : ''
  });\n\n`;
  content += `  const onSubmit = (data: any) => {\n    console.log(data);\n  };\n\n`;
  content += `  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n`;
  content += generateFormFields(fieldTypes, 'react-hook-form');
  content += `      <button type="submit">Submit</button>\n`;
  content += `    </form>\n  );\n`;
  return content;
};

const generateFormikForm = (includeValidation, fieldTypes) => {
  let content = `  const initialValues = {\n`;
  fieldTypes.forEach((type) => {
    content += `    ${type}: '',\n`;
  });
  content += `  };\n\n`;

  content += `  const onSubmit = (values: any) => {\n    console.log(values);\n  };\n\n`;

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
