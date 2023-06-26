import React from "react";
import Image from "./Image";
import { Bubble } from ".";
import { Event } from "nostr-tools";
import useUser from "../hooks/useUser";

type MessageProps = {
    event: Event<9>
}

const Message = React.memo(({event}: MessageProps) => {
    const userData = useUser(event.pubkey)
    return (
        <div className="flex w-full">
            <div className="flex items-end m-2 max-w-[70%] gap-2">
                <Image userData={userData}/>
                <Bubble type="received" item={event} userData={userData}/>
            </div>
        </div>
    );
});

export default Message;