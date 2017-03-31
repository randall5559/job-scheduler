export interface Job {
    name: string;
    container_size: number;
    frequency: number;
    last_run: string;
    next_due: string
    command: string;
}
