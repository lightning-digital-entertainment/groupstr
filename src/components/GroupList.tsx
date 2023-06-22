import GroupListItem from "./GroupListItem";
import useGroups from "../hooks/useGroups";
import { useAppSelector } from "../store/hooks";

type GroupListProps = {
    onClick: React.MouseEventHandler<HTMLAnchorElement>
}

const GroupList = ({onClick}: GroupListProps) => {
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
            <p>Your Groups</p>
            <div className="flex gap-2 flex-col p-2 bg-zinc-700 rounded">
                {joinedGroups.map((groupEvent) => (
                    <GroupListItem
                        groupEvent={groupEvent}
                        key={groupEvent.id}
                        onClick={onClick}
                    />
                ))}
            </div>
            <p>Available Groups</p>
            <div className="flex gap-2 flex-col p-2 bg-zinc-700 rounded">
                {availableGroups.map((groupEvent) => (
                    <GroupListItem
                        onClick={onClick}
                        groupEvent={groupEvent}
                        key={groupEvent.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default GroupList;
