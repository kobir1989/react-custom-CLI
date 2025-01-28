import inquirer from 'inquirer';

export const askFormQuestions = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'formName',
      message: 'Form name and optional path (e.g. LoginForm.jsx or LoginForm.tsx):',
      prefix: '📝',
      validate: (input) => {
        if (!input) return 'Form name is required';

        // Split input into filename and path
        const [filename, ...pathParts] = input.split(' ');

        // Check if extension is valid if provided
        const validExtensions = ['.tsx', '.jsx', '.ts', '.js'];
        const hasValidExtension = validExtensions.some((ext) => filename.endsWith(ext));

        if (!hasValidExtension) {
          return 'Invalid file extension. Use .tsx, .jsx, .ts or .js';
        }

        // Remove file extension if present
        const nameWithoutExt = filename.replace(/\.(tsx|jsx|ts|js)$/, '');

        // Check if name starts with uppercase and contains only letters/numbers
        if (!/^[A-Z][A-Za-z0-9]*$/.test(nameWithoutExt)) {
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
