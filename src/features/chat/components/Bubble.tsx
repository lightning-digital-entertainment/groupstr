import { Event, nip19 } from "nostr-tools";
import React from "react";

type BubbleProps = {
    type: 'sent' | 'received'
    item: Event<9>
}

const Bubble = React.memo(function({type, item}: BubbleProps) {
    return (
        <div className={`flex flex-col ${type === 'sent' ? 'bg-zinc-700' : 'bg-zinc-800'} p-2 rounded`}>
            <p className="text-sm text-zinc-500">{nip19.npubEncode(item.pubkey).slice(0,32)}...</p>
            <p>{item.content}</p>
            <p className="text-xs text-zinc-500 text-right">{item.created_at}</p>
        </div>
    );
});

export default Bubble;
