# Taskl

**Taskl** is a simple and easy-to-use library for creating beautiful logs for CLI.

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

To use taskl in your project, follow these steps:

### 1. Import the necessary components from taskl:

```typescript
import { Taskl, Task, TasklOptions } from 'taskl';
```

### 2. Define your tasks:

```typescript
const tasks: Task[] = [
  {
    text: 'your log ',
    run: async () => {
      // Your actual logic 
    },
  },
  {
    text: 'your log',
    run: async () => {
      // Your actual logic 
    },
  }
];
```

### 3. Set up the TasklOptions:

```typescript
const options: TasklOptions = {
  tasks: tasks,
  startMessage: '🔄 Starting your process',
  successMessage: 'Process completed successfully.',
  failedMessage: 'Process encountered an error.'
};
```

### 4. Create a Taskl instance and run the tasks:

```typescript
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);
```

This will display a beautiful console output with progress indicators, success/failure messages, and execution time for your tasks.


## Contributing

We welcome contributions to **taskl**! Whether it's reporting a bug, suggesting an enhancement, or submitting a pull request, your input is valued.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions, suggestions, or feedback, please contact [love1ace](mailto:lovelacedud@gmail.com).
