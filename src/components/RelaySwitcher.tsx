import { useState } from "react";
import { IoAdd, IoChevronDown } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeActiveRelay } from "../store/relaySlice";

const RelaySwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeRelay, knownRelays } = useAppSelector((state) => state.relay);
    const dispatch = useAppDispatch();
    function setRelay(relay: string) {
        dispatch(changeActiveRelay(relay));
        setIsOpen(false);
    }
    return (
        <div>
            <button
                className="px-4 py-2 rounded bg-zinc-700 flex items-center z-0"
                onClick={() => {
                    setIsOpen((prev) => !prev);
                }}
            >
                <IoChevronDown />
                <p className="ml-2 overflow-clip">{activeRelay}</p>
            </button>
            {isOpen ? (
                <div className="bg-zinc-700 p-2 flex-1 rounded z-10 flex flex-col gap-2">
                    {knownRelays.map((relay) => (
                        <button
                            onClick={() => {
                                setRelay(relay);
                            }}
                        >
                            {relay}
                        </button>
                    ))}
                    <button>
                        <IoAdd />
                        Add new Relay
                    </button>
                </div>
            ) : undefined}
        </div>
    );
};

export default RelaySwitcher;
