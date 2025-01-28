#!/usr/bin/env node
import { askInitialAction } from './src/core/prompts/mainPrompts.js';
import { createComponent } from './src/core/commands/createComponent.js';
import { createHook } from './src/core/commands/createHook.js';
import { createContext } from './src/core/commands/createContext.js';
import { createApiService } from './src/core/commands/createApi.js';
import { createForm } from './src/core/commands/createForm.js';
import { createTestSuite } from './src/core/commands/createTest.js';
import { removeItem } from './src/core/commands/removeItem.js';
import { askComponentQuestions } from './src/core/prompts/componentPrompts.js';
import { askHookQuestions } from './src/core/prompts/hookPrompts.js';
import { askContextQuestions } from './src/core/prompts/contextPrompts.js';
import { askApiServiceQuestions } from './src/core/prompts/apiPrompts.js';
import { askFormQuestions } from './src/core/prompts/formPrompts.js';
import { askTestQuestions } from './src/core/prompts/testPrompts.js';
import { askRemovalQuestions } from './src/core/prompts/removePrompts.js';

const main = async () => {
  const action = await askInitialAction();

  switch (action) {
    case 'create':
      const componentAnswers = await askComponentQuestions();
      createComponent(
        componentAnswers.componentName,
        componentAnswers.componentPath,
        componentAnswers.fileType,
        componentAnswers.styleType,
        componentAnswers.features,
        componentAnswers.hooks
      );
      break;

    case 'hook':
      const hookAnswers = await askHookQuestions();
      createHook(hookAnswers);
      break;

    case 'context':
      const contextAnswers = await askContextQuestions();
      createContext(contextAnswers);
      break;

    case 'api':
      const apiAnswers = await askApiServiceQuestions();
      createApiService(apiAnswers);
      break;

    case 'form':
      const formAnswers = await askFormQuestions();
      createForm(formAnswers);
      break;

    case 'test':
      const testAnswers = await askTestQuestions();
      createTestSuite(testAnswers);
      break;

    case 'remove':
      const { pathToRemove, confirmRemoval } = await askRemovalQuestions();
      if (confirmRemoval) {
        await removeItem(pathToRemove);
      } else {
        console.log('Removal cancelled.');
      }
      break;
  }
};

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
