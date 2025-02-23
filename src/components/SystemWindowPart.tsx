import Clock from "./Clock";
import React from "react";
import { useOnline } from "./OnlineProvider";


interface SystemWindowProps {
    uploadTasksJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
    downloadTasksJSON: () => void;
}

export default function SystemWindowPart({ uploadTasksJSON, downloadTasksJSON }: SystemWindowProps) {
    const isOnline = useOnline();

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