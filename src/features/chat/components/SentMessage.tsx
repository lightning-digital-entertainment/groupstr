import { Event } from "nostr-tools";
import Image from "./Image";
import Bubble from "./Bubble";

type SentMessageProps = {
    event: Event<9>
}

function SentMessage({event}: SentMessageProps) {
    return (
        <div className="flex w-full justify-end">
            <div className="flex items-end m-2 max-w-[70%] gap-2 flex-row-reverse">
                <Image />
                <Bubble type="sent" item={event}/>
            </div>
        </div>
    );
}

export default SentMessage;
