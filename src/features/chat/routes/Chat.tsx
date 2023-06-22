import ChatBox from "../components/ChatBox";
import Message from "../components/Message";
import useIsMember from "../../../hooks/useIsMember";
import JoinBox from "../components/JoinBox";
import useChat from "../hooks/useChat";
import { useAppSelector } from "../../../store/hooks";
import SentMessage from "../components/SentMessage";
import { relayKey } from "../../../main";
import RelayMessage from "../components/RelayMessage";

function Chat() {
    const { messages, loadMoreMessages } = useChat();
    const isMember = useIsMember();
    const combinedMessages = [...messages].sort(
        (a, b) => b.created_at - a.created_at
    );
    const loggedInPk = useAppSelector((state) => state.user.loggedInPk);
    return (
        <div className="flex grow bg-zinc-900 items-start flex-col justify-between min-h-0">
            <div className="overflow-auto flex w-full p-2 flex-col-reverse">
                {combinedMessages.map((message) => {
                    if (message.pubkey === loggedInPk) {
                        return <SentMessage event={message} key={message.id} />;
                    }
                    if (message.pubkey === relayKey) {
                        return <RelayMessage event={message} key={message.id}/>;
                    }
                    return <Message event={message} key={message.id} />;
                })}
                <button
                    className="py-2 px-1 rounded bg-yellow-600 shrink-0 my-2"
                    onClick={loadMoreMessages}
                >
                    Load older messages...
                </button>
            </div>

            {isMember ? <ChatBox /> : <JoinBox />}
        </div>
    );
}

export default Chat;
