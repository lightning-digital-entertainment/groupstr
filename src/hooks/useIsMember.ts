import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks"

const useIsMember = () => {
  const memberOf = useAppSelector(state => state.group.memberOf);
  const params = useParams();
  if (!params.group) {
    return false
  }
  return memberOf.includes(params.group);
}

export default useIsMember;