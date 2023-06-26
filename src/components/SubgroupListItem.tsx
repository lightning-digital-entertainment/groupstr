import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type SubgroupListItemProps = {
    subgroupSlug: string;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;

};

const SubgroupListItem = ({ subgroupSlug, onClick }: SubgroupListItemProps) => {
    const activeRelay = useAppSelector((state) => state.relay.activeRelay);
    return (
        <NavLink
            className={({ isActive }) =>
                [
                    isActive ? "text-yellow-600" : "text-zinc-400",
                    "flex flex-row items-center gap-2 text-sm",
                ].join(" ")
            }
            to={`/chat/${activeRelay.split("//")[1]}${
                subgroupSlug
            }`}
            onClick={onClick}
        >
            {subgroupSlug}
        </NavLink>
    );
};

export default SubgroupListItem;
