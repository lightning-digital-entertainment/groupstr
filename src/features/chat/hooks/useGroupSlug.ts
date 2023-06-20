import { useParams } from "react-router-dom";

const useGroupSlug = () => {
  const {relay, group, subgroup} = useParams();
  return {relativeSlug: `/${group}${subgroup ? `/${subgroup}` : ''}`, fullSlug: `/${relay}/${group}${subgroup ? `/${subgroup}` : ''}`}
};

export default useGroupSlug;