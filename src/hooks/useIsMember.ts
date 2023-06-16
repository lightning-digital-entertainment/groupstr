import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks"

const useIsMember = () => {
  const memberOf = useAppSelector(state => state.group.memberOf);
  const params = useParams();
  console.log(memberOf)
  return memberOf.includes(params.group);
}

export default useIsMember;