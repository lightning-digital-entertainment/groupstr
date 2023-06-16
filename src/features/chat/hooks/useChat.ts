import { useParams } from "react-router-dom";
import { pool } from "../../../main";
import { useEffect, useState } from "react";
import { Event } from "nostr-tools";

const useChat = () => {
    const [messages, setMessages] = useState<Event<9>[]>([]);
    const params = useParams();
    useEffect(() => {
        console.log('runs')
        const sub = pool.sub(
            [`wss://${params.relay}`],
            [
                {
                    kinds: [9],
                    "#g": [`/${params.group}`],
                    limit: 100
                },
            ]
        );
        sub.on("event", (event: Event<9>) => {
            setMessages(prev => [...prev, event]);
        });
        return () => {sub.unsub();}
    }, [params]);
    return messages;
};

export default useChat;
