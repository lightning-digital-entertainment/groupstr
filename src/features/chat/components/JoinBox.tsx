import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinGroup } from "../../../store/groupSlice";
import { publishJoinGroup } from "../../../util/nostr";
import { useAppSelector } from "../../../store/hooks";
import useGroupSlug from "../hooks/useGroupSlug";

const JoinBox = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { relativeSlug, fullSlug } = useGroupSlug();
    const params = useParams();
    const pk = useAppSelector((state) => state.user.loggedInPk);
    return (
        <div className="flex flex-col w-full py-2 px-2 gap-2 bg-zinc-900 border-t-2 border-zinc-800 h-1/4 justify-center items-center">
            <h2 className="font-bold">Join {relativeSlug} ?</h2>
            <div className="flex flex-row gap-2">
                <Button
                    title="Yes"
                    backGroundColor="zinc-700"
                    onClick={async () => {
                        try {
                            if (!pk) {
                                throw new Error("No PK available");
                            }
                            await publishJoinGroup(
                                relativeSlug,
                                `wss://${params.relay}`,
                                pk
                            );
                            dispatch(joinGroup(fullSlug));
                        } catch (e) {
                            console.log("error: ", e);
                        }
                    }}
                />
                <Button
                    title="No"
                    backGroundColor="zinc-700"
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            </div>
        </div>
    );
};

export default JoinBox;
