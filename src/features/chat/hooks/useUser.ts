import { useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { getUserData } from "../../../util/nostr";

const useUser = (pubkeyInHex: string) => {
const user = useAppSelector(state => state.user.users[pubkeyInHex])
  useEffect(() => {
    if (!user) {
      getUserData(pubkeyInHex, 'wss://relay.current.fyi')
    }
  }, [user])

  return user
};

export default useUser;