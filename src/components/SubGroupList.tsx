import useSubGroups from "../hooks/useSubGroups";
import SubgroupListItem from "./SubgroupListItem";

type SubGroupListProps = {
    parentGroupSlug: string;
};

const SubGroupList = ({ parentGroupSlug }: SubGroupListProps) => {
    const subgroups = useSubGroups(parentGroupSlug);
    return (
        <div>
            {subgroups.map((subgroup) => (
                <SubgroupListItem subgroupSlug={subgroup} />
            ))}
        </div>
    );
};

export default SubGroupList;
