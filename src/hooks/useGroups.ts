import { useEffect, useState } from "react";
import { pool } from "../main";
import { Event } from "nostr-tools";
import { useAppSelector } from "../store/hooks";

export interface GroupObject extends Event<39000> {
    parentGroup: string | null;
    groupSlug: string;
}

const useGroups = () => {
    const [groups, setGroups] = useState<Event<39000>[]>([]);
    const relay = useAppSelector(state => state.relay.activeRelay);
    function normalizeGroupEvent(event: Event<39000>) {
        const groupSlugTag = event.tags.filter(tag => tag[0] === 'd');
        if (groupSlugTag.length > 0) {
            const groupSlug = groupSlugTag[0][1]
            if (!groupSlug) return null
            const [parentGroup, subGroup] = groupSlug.split('/').slice(1);
            if (subGroup) {
                return ({...event, parentGroup, groupSlug: `${parentGroup}/${subGroup}`})
            } else {
                return ({...event, parentGroup: null, groupSlug: `${parentGroup}`})
            }
        } else {
            return null
        }
    }


    const createDataTree = (dataset: GroupObject[]) => {
        const hashTable = Object.create(null);
        dataset.forEach(aData => hashTable[aData.groupSlug] = {...aData, subgroups: []});
        const dataTree = [];
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
                [{ kinds: [39000], limit: 20 }]
            );
            const groupTree = createDataTree(groupList.map(normalizeGroupEvent).filter(item => item))
            setGroups(groupTree);
        }
        getGroupList();
    }, [relay]);

    return groups;
};

export default useGroups;
