import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Message from "../components/Message";
import useIsMember from "../../../hooks/useIsMember";
import JoinBox from "../components/JoinBox";
import useChat from "../hooks/useChat";

function Chat() {
    const newMessages = useChat();
    const params = useParams();
    const isMember = useIsMember(
        `/${params.relay}/${params.group}/${params["*"]}`
    );
    const combinedMessages = [...newMessages].sort((a, b) => b.created_at - a.created_at);
    return (
        <div className="flex grow bg-zinc-900 items-start flex-col justify-between min-h-0">
            <div className="overflow-auto flex w-full p-2 flex-col-reverse">
                {combinedMessages.map((message) => (
                    <Message event={message} />
                ))}
            </div>

            {isMember ? (
                <ChatBox />
            ) : (
                <JoinBox
                    groupSlug={`/${params.relay}/${params.group}/${params["*"]}`}
                />
            )}
            {/* {!isMember ? <JoinGroupModal groupSlug={`/${params.relay}/${params.group}/${params['*']}`}/> : undefined} */}
        </div>
    );
}

export default Chat;
