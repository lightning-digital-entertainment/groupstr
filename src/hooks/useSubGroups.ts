import { useEffect, useState } from "react";
import { pool } from "../main";
import { useAppSelector } from "../store/hooks";

const useSubGroups = (parentGroup: string) => {
    const [groups, setGroups] = useState<string[]>([]);
    const relay = useAppSelector(state => state.relay.activeRelay)
    useEffect(() => {
        async function getGroupList() {
            const subgroupEvent = await pool.get(
                [relay],
                { kinds: [39003], '#d': [`/${parentGroup}`]}
            );
            const subgroupTags = subgroupEvent?.tags.filter(tag => tag[0] === 'g')
            if (!subgroupTags || subgroupTags.length === 0) {
              setGroups([])
            } else {
              const subgroupSlugs = subgroupTags.map(tag => tag[1])
              setGroups(subgroupSlugs);
            }
        }
        getGroupList();
    }, [relay, parentGroup]);

    return groups;
};

export default useSubGroups;
