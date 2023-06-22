import RelaySwitcher from "./RelaySwitcher";
import GroupList from "./GroupList";

type NavBarProps = {
    onClose: React.MouseEventHandler
}

function Navbar({onClose}: NavBarProps) {
    return (
        <div className="flex flex-col p-2 w-full lg:w-1/4 bg-zinc-800 absolute lg:static h-full overflow-scroll">
            <button className="w-full p-2 rounded bg-zinc-700 mb-2" onClick={onClose}>Close Menu</button>
            <RelaySwitcher />
            <GroupList onClick={onClose}/>
        </div>
    );
}

export default Navbar;
