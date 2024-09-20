import { Taskl, Task, TasklOptions } from './index.js';

const tasks: Task[] = [
  {
    text: 'Analyzing staged changes',
    run: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
  },
  {
    text: 'Extracting issue number',
    run: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
    },
  },
  {
    text: 'Generating commit message',
    run: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
    },
  }
];

const options: TasklOptions = {
  tasks: tasks,
  startMessage: '🔄 Starting byul - Developed by love1ace',
  successMessage: 'byul has generated the commit message.',
  failedMessage: 'byul encountered an error while generating the commit message.'
};

const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);