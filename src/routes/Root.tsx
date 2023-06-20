import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Navbar } from "../components";
import ProviderModal from "../components/ProviderModal";
import { pool } from "../main";
import useNip07 from "../hooks/useNip07";
import { joinGroup } from "../store/groupSlice";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/userSlice";

function Root() {
    const [navVisible, setNavVisible] = useState(false);
    const params = useParams();
    const providerAvailable = useNip07();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getJoinedGroups() {
            console.log('Intro Hook runs')
            try {
                const pk = await window.nostr.getPublicKey();
                console.log(pk)
                dispatch(login(pk))
                const joinedGroupEvent = await pool.get(["wss://spool.chat"], {
                    kinds: [39002],
                    "#p": [pk],
                });
                if (!joinedGroupEvent) {
                    return [];
                }
                const groupTags = joinedGroupEvent.tags.filter(
                    (tag) => tag[0] === "g"
                );
                if (groupTags.length > 0) {
                    const joinedGroups = groupTags.map((tag) =>
                        tag[1].slice(1)
                    );
                    joinedGroups.forEach((group) =>
                        dispatch(joinGroup(`/${params.relay}/${group}`))
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (providerAvailable) {
            getJoinedGroups();
        }
    }, [providerAvailable]);
    return (
        <div className="w-full h-full flex flex-row overscroll-none">
            {navVisible ? <Navbar onClose={() => {setNavVisible(false)}}/> : undefined}
            <div className="flex w-full">
                <div className="h-full flex flex-col w-full">
                    <div className="py-2 flex gap-2 p-2">
                        <button
                            onClick={() => {
                                setNavVisible((prev) => !prev);
                            }}
                        >
                            {navVisible ? (
                                <AiOutlineMenuFold />
                            ) : (
                                <AiOutlineMenuUnfold />
                            )}
                        </button>
                        <p>Relay: {params.relay}</p>
                        <p>Group: {params.group}</p>
                    </div>
                    <Outlet />
                    <ProviderModal />
                </div>
            </div>
        </div>
    );
}

export default Root;
