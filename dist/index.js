import ora from 'ora';
export const ANSI_COLORS = {
    cyan: '\x1b[36m',
    gray: '\x1b[90m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};
export class Taskl {
    constructor(options) {
        this.options = options;
    }
    async runTasks() {
        console.log();
        console.log(`${ANSI_COLORS.cyan}${this.options.startMessage}${ANSI_COLORS.reset}`);
        const startTime = Date.now();
        const totalTasks = this.options.tasks.length;
        let allTasksSucceeded = true;
        for (let i = 0; i < totalTasks; i++) {
            const task = this.options.tasks[i];
            const progressText = `[${i + 1}/${totalTasks}]`;
            const spinner = ora({
                text: `${ANSI_COLORS.gray}${progressText} ${task.text}${ANSI_COLORS.reset}`,
                color: 'yellow'
            }).start();
            try {
                await task.run();
                spinner.succeed(`${ANSI_COLORS.gray}${progressText} ${task.text}${ANSI_COLORS.reset}`);
            }
            catch (error) {
                spinner.fail(`${ANSI_COLORS.gray}${progressText} ${task.text}${ANSI_COLORS.reset}`);
                allTasksSucceeded = false;
            }
        }
        if (allTasksSucceeded) {
            console.log(`${ANSI_COLORS.green}Success!${ANSI_COLORS.white} ${this.options.successMessage}${ANSI_COLORS.reset}`);
        }
        else {
            console.log(`${ANSI_COLORS.red}Failed!${ANSI_COLORS.white} ${this.options.failedMessage}${ANSI_COLORS.reset}`);
        }
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`${ANSI_COLORS.blue}✨ Done in ${duration.toFixed(2)}s.${ANSI_COLORS.reset}`);
        console.log();
    }
}
