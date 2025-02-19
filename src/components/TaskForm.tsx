import { useState } from "react";

interface TaskFormProps {
    addTask: (description: string) => Promise<void>;
}

export default function TaskForm({addTask} : TaskFormProps) {
    const [description, setDescription] = useState("");

    async function  handleAddTask() {
        if (!IsEmpty(description)) {
            await addTask(description);
            setDescription(""); 
        }
    };

    function IsEmpty(input : string) {
        return input.trim() === "";
    }
    
    return (
        <div className="form">
            <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className="button" onClick={handleAddTask}>Добавить</button>
        </div>
    );
}