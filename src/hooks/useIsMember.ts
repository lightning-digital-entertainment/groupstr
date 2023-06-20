import { useAppSelector } from "../store/hooks";
import useGroupSlug from "../features/chat/hooks/useGroupSlug";

const useIsMember = () => {
    const memberOf = useAppSelector((state) => state.group.memberOf);
    const { fullSlug } = useGroupSlug();
    if (!fullSlug) {
        return false;
    }
    return memberOf.includes(fullSlug);
};

export default useIsMember;
