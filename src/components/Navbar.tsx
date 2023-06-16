import React from "react";
import RelaySwitcher from "./RelaySwitcher";
import GroupList from "./GroupList";

function Navbar() {
    return (
        <div className="flex flex-col p-2 lg:w-1/4 bg-zinc-800 absolute lg:static h-full overflow-scroll">
            <RelaySwitcher />
            <p>Available Groups:</p>
            <GroupList />
        </div>
    );
}

export default Navbar;
