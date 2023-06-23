import { useEffect, useState } from "react";
import { pool } from "../main";
import { Event } from "nostr-tools";
import { useAppSelector } from "../store/hooks";

export interface GroupObject extends Event<39000> {
    parentGroup: string | null;
    groupSlug: string;
    subgroups: GroupObject[]
}

const useGroups = () => {
    const [groups, setGroups] = useState<GroupObject[]>([]);
    const relay = useAppSelector(state => state.relay.activeRelay);
    function normalizeGroupEvent(event: Event<39000>): GroupObject | null {
        const groupSlugTag = event.tags.filter(tag => tag[0] === 'd');
        if (groupSlugTag.length > 0) {
            const groupSlug = groupSlugTag[0][1]
            if (!groupSlug) return null
            const [parentGroup, subGroup] = groupSlug.split('/').slice(1);
            if (subGroup) {
                return ({...event, parentGroup, groupSlug: `${parentGroup}/${subGroup}`, subgroups: []})
            } else {
                return ({...event, parentGroup: null, groupSlug: `${parentGroup}`, subgroups: []})
            }
        } else {
            return null
        }
    }


    const createDataTree = (dataset: GroupObject[]) => {
        const hashTable = Object.create(null);
        dataset.forEach(aData => hashTable[aData.groupSlug] = {...aData, subgroups: []});
        const dataTree: GroupObject[] = [];
        dataset.forEach(aData => {
          if(aData.parentGroup) hashTable[aData.parentGroup].subgroups.push(hashTable[aData.groupSlug])
          else dataTree.push(hashTable[aData.groupSlug])
        });
        return dataTree;
      };

    useEffect(() => {
        async function getGroupList() {
            const groupList = await pool.list(
                [relay],
                [{ kinds: [39000], limit: 50, since: 1687395734 }]
            );
            const normalizedGrouplist = groupList.map(normalizeGroupEvent);
            const filteredGrouplist = normalizedGrouplist.filter(item => item) as GroupObject[]        
            const groupTree = createDataTree(filteredGrouplist)
            setGroups(groupTree);
        }
        getGroupList();
    }, [relay]);

    return groups;
};

export default useGroups;
