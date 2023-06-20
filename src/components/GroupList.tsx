import GroupListItem from "./GroupListItem";
import useGroups from "../hooks/useGroups";
import { useAppSelector } from "../store/hooks";

const GroupList = () => {
    const groups = useGroups();
    const memberOf = useAppSelector((state) => state.group.memberOf);
    const activeRelay = useAppSelector((state) => state.relay.activeRelay);
    const joinedGroups = groups.filter((group) => {
        return memberOf.includes(
            `/${activeRelay.split("//")[1]}/${group.groupSlug}`
        );
    });
    const availableGroups = groups.filter(group => !joinedGroups.includes(group))
    return (
        <div>
            <p>Known Groups</p>
            <div className="flex gap-2 flex-col py-2">
                {joinedGroups.map((groupEvent) => (
                    <GroupListItem
                        groupEvent={groupEvent}
                        key={groupEvent.id}
                    />
                ))}
            </div>
            <p>Available Groups</p>
            <div className="flex gap-2 flex-col py-2">
                {availableGroups.map((groupEvent) => (
                    <GroupListItem
                        groupEvent={groupEvent}
                        key={groupEvent.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default GroupList;
