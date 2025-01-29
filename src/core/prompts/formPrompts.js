import inquirer from 'inquirer';

export const askFormQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'formName',
      message: 'Form name (without extension):',
      prefix: '📎',
      validate: (input) => {
        if (!input) return 'Form name is required';
        if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
          return 'Form name must start with uppercase letter and contain only letters and numbers';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'formPath',
      message: 'Form path (relative to src):',
      prefix: '📁',
      default: 'components',
    },
    {
      type: 'list',
      name: 'fileType',
      message: 'File type:',
      prefix: '📄',
      choices: [
        { name: 'TypeScript React (tsx)', value: 'tsx' },
        { name: 'JavaScript React (jsx)', value: 'jsx' },
        // { name: 'TypeScript (ts)', value: 'ts' },
        { name: 'JavaScript (js)', value: 'js' },
      ],
      default: 'tsx',
    },
    {
      type: 'list',
      name: 'formLibrary',
      message: 'Choose form library:',
      choices: [
        { name: 'React Hook Form', value: 'react-hook-form' },
        { name: 'Formik', value: 'formik' },
      ],
      default: 'react-hook-form',
    },
    {
      type: 'confirm',
      name: 'includeValidation',
      message: 'Include Yup validation?',
      default: true,
    },
    {
      type: 'checkbox',
      name: 'fieldTypes',
      message: 'Select field types to include:',
      choices: [
        { name: 'Text Input', value: 'text', checked: true },
        { name: 'Email', value: 'email' },
        { name: 'Password', value: 'password' },
        { name: 'Number', value: 'number' },
        { name: 'Select', value: 'select' },
        { name: 'Checkbox', value: 'checkbox' },
        { name: 'Radio', value: 'radio' },
        { name: 'Textarea', value: 'textarea' },
      ],
    },
  ]);
};
