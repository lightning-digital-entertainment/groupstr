import { Event } from "nostr-tools";
import Image from "./Image";
import Bubble from "./Bubble";
import useUser from "../hooks/useUser";

type SentMessageProps = {
    event: Event<9>
}

function SentMessage({event}: SentMessageProps) {
    const userData = useUser(event.pubkey)

    return (
        <div className="flex w-full justify-end">
            <div className="flex items-end m-2 max-w-[70%] gap-2 flex-row-reverse">
                <Image userData={userData}/>
                <Bubble type="sent" item={event} userData={userData}/>
            </div>
        </div>
    );
}

export default SentMessage;
