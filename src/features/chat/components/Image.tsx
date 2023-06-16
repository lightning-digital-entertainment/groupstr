import React from "react";

type ImageProps = {
    imageUrl: string;
};

const Image = React.memo(function ({ imageUrl }: ImageProps) {
    return <img className="rounded-full w-8 h-8" src={imageUrl} />;
});

export default Image;