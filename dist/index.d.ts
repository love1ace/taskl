export declare const ANSI_COLORS: {
    cyan: string;
    gray: string;
    green: string;
    red: string;
    blue: string;
    yellow: string;
    white: string;
    reset: string;
};
export interface Task {
    text: string;
    run: () => Promise<void>;
}
export interface TasklOptions {
    tasks: Task[];
    startMessage: string;
    successMessage: string;
    failedMessage: string;
}
export declare class Taskl {
    private options;
    constructor(options: TasklOptions);
    runTasks(): Promise<void>;
}
