import React from "react";
import { UserData } from "../../../store/userSlice";

type ImageProps = {
    userData: UserData;
}

const Image = React.memo(function ({userData}: ImageProps) {
return <img className="rounded-full w-8 h-8" src={userData?.picture || 'https://pbs.twimg.com/profile_images/1589236782381637633/wVdMF7jp_400x400.jpg'} />;
});

export default Image;
