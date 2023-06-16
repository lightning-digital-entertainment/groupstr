import { useAppSelector } from "../store/hooks"

const useIsMember = (groupSlug: string) => {
  console.log('member:', groupSlug)
  const memberOf = useAppSelector(state => state.group.memberOf);
  return memberOf.includes(groupSlug);
}

export default useIsMember;