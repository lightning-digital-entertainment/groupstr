import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Navbar } from "../components";
import ProviderModal from "../components/ProviderModal";
import { useNip07 } from "../hooks/useNip07";

function Root() {
    const [navVisible, setNavVisible] = useState(false);
    const params = useParams();
    useNip07();
    console.log(params);
    return (
        <div className="w-full h-full flex flex-row overscroll-none">
            {navVisible ? <Navbar /> : undefined}
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
