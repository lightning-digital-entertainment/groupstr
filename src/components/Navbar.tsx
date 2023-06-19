import RelaySwitcher from "./RelaySwitcher";
import GroupList from "./GroupList";

type NavBarProps = {
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

function Navbar({onClose}: NavBarProps) {
    return (
        <div className="flex flex-col p-2 w-full lg:w-1/4 bg-zinc-800 absolute lg:static h-full overflow-scroll">
            <button onClick={onClose}>Close</button>
            <RelaySwitcher />
            <p>Available Groups:</p>
            <GroupList />
        </div>
    );
}

export default Navbar;
