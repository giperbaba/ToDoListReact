export class Task {
    id: number;
    isDone: boolean;
    description: string;

    constructor(id: number,  description: string, isDone: boolean) {
        this.id = id;
        this.description = description;
        this.isDone = isDone;
    }
}