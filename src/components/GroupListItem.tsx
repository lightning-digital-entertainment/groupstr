import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { GroupObject } from "../hooks/useGroups";
import SubGroupList from "./SubGroupList";

type GroupListItemProps = {
    groupEvent: GroupObject;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const GroupListItem = React.memo(
    ({ groupEvent, onClick }: GroupListItemProps) => {
        const activeRelay = useAppSelector((state) => state.relay.activeRelay);
        const location = useLocation();
        const groupSlug = useMemo(() => {
            const dTag = groupEvent.tags.filter((tag) => tag[0] === "d");
            if (dTag.length > 0) {
                return dTag[0][1];
            }
        }, [groupEvent]);
        const groupImage = useMemo(() => {
            const pictureTag = groupEvent.tags.filter(
                (tag) => tag[0] === "picture"
            );
            if (pictureTag.length > 0) {
                return pictureTag[0][1].length > 1 ? pictureTag[0][1] : undefined;
            }
            return undefined;
        }, [groupEvent]);

        return (
            <div>
                <NavLink
                    className={({ isActive }) =>
                        [
                            isActive ? "text-yellow-600" : undefined,
                            "flex flex-row items-center gap-2",
                        ].join(" ")
                    }
                    to={`chat/${activeRelay.split("//")[1]}${groupSlug}`}
                    onClick={onClick}
                    end
                >
                    <img
                    src={
                        groupImage ||
                        "https://pbs.twimg.com/profile_images/1589236782381637633/wVdMF7jp_400x400.jpg"
                    }
                    className="rounded-full w-4 h-4"
                />
                    <p className="flex">{groupSlug}</p>
                </NavLink>
                {location.pathname.includes(groupEvent.groupSlug)
                    ? <SubGroupList parentGroupSlug={groupEvent.groupSlug} onClick={onClick}/>
                    : undefined}
            </div>
        );
    }
);

export default GroupListItem;
