import { useParams } from "react-router-dom";
import { pool } from "../../../main";
import { useEffect, useMemo, useState } from "react";
import { Event } from "nostr-tools";

const useChat = () => {
    const [messages, setMessages] = useState<Event<9>[]>([]);
    const params = useParams();

    const until = useMemo(() => {
        return messages.sort((a, b) => a.created_at - b.created_at)[0]?.created_at ||
            Math.floor(Date.now() / 1000);
    }, [messages]);

    async function loadMoreMessages() {
        const events = await pool.list(
            [`wss://${params.relay}`],
            [
                {
                    kinds: [9],
                    "#g": [
                        `/${params.group}${
                            params.subgroup ? `/${params.subgroup}` : ""
                        }`,
                    ],
                    limit: 5,
                    until,
                },
            ]
        );
        setMessages((prev) => [...prev, ...events]);
    }

    useEffect(() => {
        const newMessages = new Set<Event<9>>();
        setMessages([]);
        const sub = pool.sub(
            [`wss://${params.relay}`],
            [
                {
                    kinds: [9],
                    "#g": [
                        `/${params.group}${
                            params.subgroup ? `/${params.subgroup}` : ""
                        }`,
                    ],
                    limit: 5,
                },
            ]
        );
        sub.on("event", (event: Event<9>) => {
            newMessages.add(event);
            setMessages([...newMessages]);
        });
        return () => {
            sub.unsub();
        };
    }, [params]);
    return { messages, loadMoreMessages };
};

export default useChat;
