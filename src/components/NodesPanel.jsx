import { MessageCircleMore } from "lucide-react";

function NodesPanel() {
    return (
        <div className="flex w-1/4 h-screen overflow-auto p-2 border-l">
            <div className="flex flex-col justify-center items-center border border-2 h-fit px-8 py-2 gap-1">
                <MessageCircleMore />
                <p>Message</p>
            </div>
        </div>
    )
}

export default NodesPanel;

// react, next, vue, redux, jest, playwright, tailwind, react-flow, js, ts
