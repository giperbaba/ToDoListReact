import { useState, useEffect } from "react";
import Clock from "./Clock";
import { isBackendAvailable } from "../services/taskMockService";

interface SystemWindowProps {
    uploadTasksJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
    downloadTasksJSON: () => void;
}

export default function SystemWindowPart({ uploadTasksJSON, downloadTasksJSON }: SystemWindowProps) {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        async function checkBackend() {
            const online = await isBackendAvailable();
            setIsOnline(online);
        }

        checkBackend();
    }, []);

    return (
        <div className="system">
            <div className="clock">
                <Clock />
            </div>
            <h2 className="text-time">{isOnline ? "online" : "offline"}</h2>
            <label className="button" htmlFor="file-input">Загрузить список дел</label>
            <input id="file-input" type="file" accept="application/json" onChange={uploadTasksJSON} />
            <button className="button" onClick={downloadTasksJSON}>Сохранить список дел</button>
        </div>
    );
}