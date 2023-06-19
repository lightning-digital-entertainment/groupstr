import React from "react";
import { Event } from "nostr-tools";

type RelayMessageProps = {
    event: Event<9>
}

const RelayMessage = React.memo(({event}: RelayMessageProps) => {
    return (
        <div className="flex w-full items-center justify-center text-center text-yellow-600 text-sm">
            <p>{event.content}</p>
        </div>
    );
});

export default RelayMessage;