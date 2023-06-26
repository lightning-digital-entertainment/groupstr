import { Event, nip19 } from "nostr-tools";
import React from "react";
import { UserData } from "../../../store/userSlice";
import { getAge } from "../../../util/time";
// import { getUserData } from "../../../util/nostr";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../../store/userSlice";

type BubbleProps = {
    type: "sent" | "received";
    item: Event<9>;
    userData: UserData;
};

const Bubble = React.memo(function ({ type, item, userData }: BubbleProps) {
    return (
        <div
            className={`flex flex-col ${
                type === "sent" ? "bg-zinc-700" : "bg-zinc-800"
            } p-2 rounded`}
        >
            <p className="text-sm text-zinc-500">
                {userData?.name || nip19.npubEncode(item.pubkey).slice(0, 32)}
            </p>
            {/* <button
                onClick={async () => {
                    const data = await getUserData(
                        item.pubkey,
                        "wss://relay.current.fyi"
                    );
                    if (data) {
                        const parsedData = JSON.parse(data?.content);
                        const userData = {
                            name: parsedData.name,
                            pubkey: data.pubkey,
                            picture: parsedData.picture,
                        };
                        dispatch(addUser(userData));
                    }
                }}
            >
                Test!
            </button> */}
            <p>{item.content}</p>
            <p className="text-xs text-zinc-500 text-right">
                {getAge(item.created_at)}
            </p>
        </div>
    );
});

export default Bubble;
