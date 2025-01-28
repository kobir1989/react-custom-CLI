#!/usr/bin/env node
import { askInitialAction } from './core/prompts/mainPrompts.js';
import { createComponent } from './core/commands/createComponent.js';
import { createHook } from './core/commands/createHook.js';
import { createContext } from './core/commands/createContext.js';
import { createApiService } from './core/commands/createApi.js';
import { createForm } from './core/commands/createForm.js';
import { createTestSuite } from './core/commands/createTest.js';
import { removeItem } from './core/commands/removeItem.js';
import { askComponentQuestions } from './core/prompts/componentPrompts.js';
import { askHookQuestions } from './core/prompts/hookPrompts.js';
import { askContextQuestions } from './core/prompts/contextPrompts.js';
import { askApiServiceQuestions } from './core/prompts/apiPrompts.js';
import { askFormQuestions } from './core/prompts/formPrompts.js';
import { askTestQuestions } from './core/prompts/testPrompts.js';
import { askRemovalQuestions } from './core/prompts/removePrompts.js';

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
