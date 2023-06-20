import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { GroupObject } from "../hooks/useGroups";
import SubgroupListItem from "./SubgroupListItem";

type GroupListItemProps = {
    groupEvent: GroupObject;
};

const GroupListItem = React.memo(({ groupEvent }: GroupListItemProps) => {
    const activeRelay = useAppSelector((state) => state.relay.activeRelay);
    const location = useLocation();
    const groupSlug = useMemo(() => {
        const dTag = groupEvent.tags.filter((tag) => tag[0] === "d");
        if (dTag.length > 0) {
            return dTag[0][1];
        }
    }, [groupEvent]);
    // const groupImage = useMemo(() => {
    //     const pictureTag = groupEvent.tags.filter(
    //         (tag) => tag[0] === "picture"
    //     );
    //     if (pictureTag.length > 0) {
    //         return pictureTag[0][1].length > 1 ? pictureTag[0][1] : undefined;
    //     }
    //     return undefined;
    // }, [groupEvent]);

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
                end
            >
                {/* <img
                    src={
                        groupImage ||
                        "https://pbs.twimg.com/profile_images/1589236782381637633/wVdMF7jp_400x400.jpg"
                    }
                    className="rounded-full w-8 h-8"
                /> */}
                <div className=" flex rounded-full w-8 h-8 bg-zinc-500"/>
                <p className="flex">{groupSlug}</p>
            </NavLink>
            {groupEvent.subgroups.length > 0 &&
            location.pathname.includes(groupEvent.groupSlug)
                ? groupEvent.subgroups.map((subgroup) => (
                      <SubgroupListItem subgroupEvent={subgroup} />
                  ))
                : undefined}
        </div>
    );
});

export default GroupListItem;
