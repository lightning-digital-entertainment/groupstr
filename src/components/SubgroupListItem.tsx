import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type SubgroupListItemProps = {
    subgroupSlug: string;
};

const SubgroupListItem = ({ subgroupSlug }: SubgroupListItemProps) => {
    const activeRelay = useAppSelector((state) => state.relay.activeRelay);
    return (
        <NavLink
            className={({ isActive }) =>
                [
                    isActive ? "text-yellow-600" : "text-zinc-400",
                    "flex flex-row items-center gap-2 text-xs",
                ].join(" ")
            }
            to={`/chat/${activeRelay.split("//")[1]}${
                subgroupSlug
            }`}
        >
            /{subgroupSlug}
        </NavLink>
    );
};

export default SubgroupListItem;
