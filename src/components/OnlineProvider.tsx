import React, { createContext, useContext, useEffect, useState } from "react";
import { isBackendAvailable } from "../services/taskMockService";

const OnlineContext = createContext<boolean>(true);

export const useOnline = () => useContext(OnlineContext);

interface OnlineProviderProps {
    children: React.ReactNode; 
}

export const OnlineProvider: React.FC<OnlineProviderProps> = ({ children }) => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        async function checkBackend() {
            const isAvailable = await isBackendAvailable();
            setIsOnline(isAvailable);
        }

        checkBackend();
    }, []);

    return (
        <OnlineContext.Provider value={isOnline}>
            {children}
        </OnlineContext.Provider>
    );
};