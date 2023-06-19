import React from "react";

const Image = React.memo(function () {
    // return <img className="rounded-full w-8 h-8" src={imageUrl} />;
    return <div className="rounded-full w-8 h-8 bg-zinc-500"/>;
});

export default Image;
