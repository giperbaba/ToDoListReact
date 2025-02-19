export class Task {
    id: number;
    isDone: boolean;
    description: string;

    constructor(id: number, isDone: boolean, description: string) {
        this.id = id;
        this.isDone = isDone;
        this.description = description;
    }
}