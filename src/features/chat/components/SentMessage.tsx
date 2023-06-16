import Image from "./Image";
// import { Bubble } from ".";

function SentMessage() {
    return (
        <div className="flex w-full justify-end">
            <div className="flex items-end m-2 max-w-[70%] gap-2 flex-row-reverse">
                <Image imageUrl="https://pbs.twimg.com/profile_images/1589236782381637633/wVdMF7jp_400x400.jpg" />
                {/* <Bubble type="sent" item={}/> */}
            </div>
        </div>
    );
}

export default SentMessage;
