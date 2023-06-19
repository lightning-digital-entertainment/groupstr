import React from "react";
import Image from "./Image";
import { Bubble } from ".";
import { Event } from "nostr-tools";

type MessageProps = {
    event: Event<9>
}

const Message = React.memo(({event}: MessageProps) => {
    return (
        <div className="flex w-full">
            <div className="flex items-end m-2 max-w-[70%] gap-2">
                <Image />
                <Bubble type="received" item={event}/>
            </div>
        </div>
    );
});

export default Message;