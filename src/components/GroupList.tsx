import React from 'react'
import GroupListItem from './GroupListItem';
import useGroups from '../hooks/useGroups';

const GroupList = () => {
  const groups = useGroups();
  console.log(groups);
  return (
    <div className="flex gap-2 flex-col py-2">{groups.map((groupEvent) => <GroupListItem groupEvent={groupEvent} key={groupEvent.id}/>)}</div>
  )
}

export default GroupList