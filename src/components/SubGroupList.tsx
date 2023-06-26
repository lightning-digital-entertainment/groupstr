import useSubGroups from "../hooks/useSubGroups";
import SubgroupListItem from "./SubgroupListItem";

type SubGroupListProps = {
    parentGroupSlug: string;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const SubGroupList = ({ parentGroupSlug, onClick }: SubGroupListProps) => {
    const subgroups = useSubGroups(parentGroupSlug);
    return (
        <div>
            {subgroups.map((subgroup) => (
                <SubgroupListItem subgroupSlug={subgroup} key={subgroup} onClick={onClick}/>
            ))}
        </div>
    );
};

export default SubGroupList;
