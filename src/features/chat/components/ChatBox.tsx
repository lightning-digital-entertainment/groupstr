import React, { useRef } from "react";
import ChatInput from "./ChatInput";
import SendButton from "./SendButton";
import { postEvent } from "../../../util/nostr";
import { useParams } from "react-router-dom";

const ChatBox = React.memo(() => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            clickHandler();
        }
    };
    const params = useParams();
    const clickHandler = async () => {
        try {
            if (inputRef.current && params.group) {
                await postEvent(
                    inputRef.current?.value,
                    "wss://spool.chat",
                    params.group
                );
                inputRef.current.value = "";
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="flex w-full py-2 px-2 gap-2 bg-zinc-900 border-t-2 border-zinc-800">
            <ChatInput ref={inputRef} onKeyDown={keyDownHandler} />
            <SendButton onClick={clickHandler} />
        </div>
    );
});

export default ChatBox;
