import inquirer from 'inquirer';

export const askFormQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'formName',
      message: 'Form name:',
      prefix: '📝',
      validate: (input) => {
        if (!input) return 'Form name is required';
        if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
          return 'Form name must start with uppercase letter and contain only letters and numbers';
        }
        return true;
      },
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
