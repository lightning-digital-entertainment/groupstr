import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { GroupObject } from "../hooks/useGroups";

type SubgroupListItemProps = {
    subgroupEvent: GroupObject;
};

const SubgroupListItem = ({ subgroupEvent }: SubgroupListItemProps) => {
    const activeRelay = useAppSelector((state) => state.relay.activeRelay);
    return (
        <NavLink
            className={({ isActive }) =>
                [
                    isActive ? "text-yellow-600" : undefined,
                    "flex flex-row items-center gap-2 text-xs",
                ].join(" ")
            }
            to={`/chat/${activeRelay.split("//")[1]}/${
                subgroupEvent.groupSlug
            }`}
        >
            /{subgroupEvent.groupSlug}
        </NavLink>
    );
};

export default SubgroupListItem;
