# Taskl

**Taskl** is a useful tool for effectively controlling asynchronous tasks and managing logs in CLI applications.

![npm](https://img.shields.io/npm/v/taskl)
![license](https://img.shields.io/npm/l/taskl)

![taskl](./taskl.gif)

## Installation

You can install **Taskl** using your preferred package manager:

### npm

```bash
npm install taskl
```

### Yarn

```bash
yarn add taskl
```

### pnpm

```bash
pnpm add taskl
```

### Bun

```bash
bun add taskl
```

## Usage

To use **Taskl** in your project, follow these steps:

### 1. Import the Necessary Components from Taskl

First, import `Taskl`, `Task`, and `TasklOptions` from the `taskl` package.

```typescript
import { Taskl, Task, TasklOptions } from 'taskl';
```

*For JavaScript users, you can use `require` instead:*

```javascript
const { Taskl, Task, TasklOptions } = require('taskl');
```

### 2. Define Your Tasks

Create an array of tasks you want to execute. Each task should have a `text` description and a `run` function that returns a `Promise<void>`.

```typescript
const tasks: Task[] = [
  {
    text: 'Connecting to the database',
    run: async () => {
      // Your actual logic for connecting to the database
      await connectToDatabase();
    },
  },
  {
    text: 'Starting the API server',
    run: async () => {
      // Your actual logic for starting the server
      await startApiServer();
    },
  }
];
```

*For JavaScript users:*

```javascript
const tasks = [
  {
    text: 'Connecting to the database',
    run: async () => {
      // Your actual logic for connecting to the database
      await connectToDatabase();
    },
  },
  {
    text: 'Starting the API server',
    run: async () => {
      // Your actual logic for starting the server
      await startApiServer();
    },
  }
];
```

**Task Interface:**

- `text`: A description of the task.
- `run`: An asynchronous function that performs the task.

**Tip:** Ensure that each `run` function handles its own errors appropriately to allow Taskl to manage the task flow smoothly. For example:

```javascript
const tasks = [
  {
    text: 'Connecting to the database',
    run: async () => {
      try {
        await connectToDatabase();
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error; // Re-throw to let Taskl handle the failure
      }
    },
  },
  // ... other tasks
];
```

### 3. Set Up the TasklOptions

Configure the options for Taskl, including your tasks and the messages to display during the process.

```typescript
const options: TasklOptions = {
  tasks: tasks,
  startMessage: '🔄 Starting your process',
  successMessage: 'Process completed successfully.',
  failedMessage: 'Process encountered an error.'
};
```

*For JavaScript users:*

```javascript
const options = {
  tasks: tasks,
  startMessage: '🔄 Starting your process',
  successMessage: 'Process completed successfully.',
  failedMessage: 'Process encountered an error.'
};
```

**Explanation of Options:**

- `tasks`: An array of `Task` objects to be executed in sequence.
- `startMessage`: A message displayed when the task execution begins.
- `successMessage`: A message displayed after all tasks have been successfully completed.
- `failedMessage`: A message displayed if any of the tasks fail.

### 4. Create a Taskl Instance and Run the Tasks

Instantiate Taskl with the configured options and execute the tasks.

```typescript
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);
```

*For JavaScript users:*

```javascript
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);
```

**What Happens Next:**

- Taskl will display the `startMessage` in cyan color.
- Each task will be executed in sequence, showing a spinner with the task description.
- Upon successful completion of a task, a success spinner will appear.
- If a task fails, a failure spinner will be shown, and the `failedMessage` will be displayed at the end.
- Finally, Taskl will display the total execution time.

### Complete Example

Here's a complete example integrating all the steps:

```typescript
import { Taskl, Task, TasklOptions } from 'taskl';

// Define your tasks
const tasks: Task[] = [
  {
    text: 'Connecting to the database',
    run: async () => {
      await connectToDatabase();
    },
  },
  {
    text: 'Starting the API server',
    run: async () => {
      await startApiServer();
    },
  }
];

// Set up Taskl options
const options: TasklOptions = {
  tasks: tasks,
  startMessage: '🔄 Starting your process',
  successMessage: 'Process completed successfully.',
  failedMessage: 'Process encountered an error.'
};

// Create Taskl instance and run tasks
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);

// Example functions (replace with your actual logic)
async function connectToDatabase() {
  // Simulate async database connection
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
}

async function startApiServer() {
  // Simulate async server start
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
}
```

*For JavaScript users:*

```javascript
const { Taskl, Task, TasklOptions } = require('taskl');

// Define your tasks
const tasks = [
  {
    text: 'Connecting to the database',
    run: async () => {
      await connectToDatabase();
    },
  },
  {
    text: 'Starting the API server',
    run: async () => {
      await startApiServer();
    },
  }
];

// Set up Taskl options
const options = {
  tasks: tasks,
  startMessage: '🔄 Starting your process',
  successMessage: 'Process completed successfully.',
  failedMessage: 'Process encountered an error.'
};

// Create Taskl instance and run tasks
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);

// Example functions (replace with your actual logic)
async function connectToDatabase() {
  // Simulate async database connection
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function startApiServer() {
  // Simulate async server start
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
```

**Running the Example:**

1. Ensure you have **Taskl** installed in your project.
2. Replace the example `connectToDatabase` and `startApiServer` functions with your actual logic.
3. **For TypeScript users:**
   - Compile your TypeScript files using `tsc` or run them using a TypeScript runner like `ts-node`.
   - Execute your script using `node` if compiled, or directly if using a TypeScript runner.
4. **For JavaScript users:**
   - Execute your script using `node`:
     ```bash
     node your-script.js
     ```

You should see a console output with progress indicators, success/failure messages, and the total execution time.

## Contributing

We welcome contributions to **Taskl**! Whether it's reporting a bug, suggesting an enhancement, or submitting a pull request, your input is valued.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions, suggestions, or feedback, please contact [love1ace](mailto:lovelacedud@gmail.com).