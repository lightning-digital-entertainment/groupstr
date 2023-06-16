import { Event } from "nostr-tools";
import React from "react";

type BubbleProps = {
    type: 'sent' | 'received'
    item: Event
}

const Bubble = React.memo(function({type, item}: BubbleProps) {
    return (
        <div className={`flex flex-col ${type === 'sent' ? 'bg-zinc-700' : 'bg-zinc-800'} p-2 rounded`}>
            <p className="text-sm text-zinc-500">{item.pubkey}</p>
            <p>{item.content}</p>
            <p className="text-xs text-zinc-500 text-right">{item.created_at}</p>
        </div>
    );
});

export default Bubble;
