import { useEffect, useState } from "react";
import { getKeyFromStorage } from "../utils/keys";

export const useKeyAvailable = () => {
    const [keyAvailable, setKeyAvailable] = useState(false);
    useEffect(() => {
        const savedKey = getKeyFromStorage();
        if (savedKey) {
            setKeyAvailable(true);
        }
    }, []);

    return keyAvailable;
};
