import React from "react";
import Button from "../../../components/Button";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinGroup } from "../../../store/groupSlice";
import { publishJoinGroup } from "../../../util/nostr";
import { testKey } from "../../../main";

type JoinBoxProps = {
    groupSlug: string;
};

const JoinBox = ({ groupSlug }: JoinBoxProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    return (
        <div className="flex flex-col w-full py-2 px-2 gap-2 bg-zinc-900 border-t-2 border-zinc-800 h-1/4 justify-center items-center">
            <h2 className="font-bold">Join {groupSlug} ?</h2>
            <div className="flex flex-row gap-2">
                <Button
                    title="Yes"
                    backGroundColor="zinc-700"
                    onClick={async () => {
                        console.log(params.group)
                        try {
                            await publishJoinGroup(`/${params.group}`, `wss://${params.relay}`, testKey);
                            dispatch(joinGroup(groupSlug));
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
