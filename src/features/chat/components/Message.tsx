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
                <Image imageUrl="https://pbs.twimg.com/profile_images/1589236782381637633/wVdMF7jp_400x400.jpg" />
                <Bubble type="received" item={event}/>
            </div>
        </div>
    );
});

export default Message;