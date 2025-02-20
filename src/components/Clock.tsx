import  { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2 className="text-time">{time.toLocaleDateString()}</h2>
            <h3 className="text-time">{time.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</h3>
            <h4 className="text-label">• your to-do list •</h4>
        </div>
    );
}