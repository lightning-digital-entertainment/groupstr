import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes";
import { Chat } from "./features/chat";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SimplePool, getPublicKey } from "nostr-tools";
import { joinGroup } from "./store/groupSlice";

export const pool = new SimplePool();

export const testKey = '8cac20847b8701172255be8b06e844f7e74d724ab8cada16887270718fb45861'

async function test() {
    const joinedGroupEvent = await pool.get(["wss://spool.chat"], {
        kinds: [39002],
        "#p": [getPublicKey(testKey)],
    });
    if (!joinedGroupEvent) {
        return []
    }
    const groupTags = joinedGroupEvent.tags.filter(tag => tag[0] === 'g');
    if (groupTags.length > 0) {
        const joinedGroups = groupTags.map(tag => tag[1].slice(1))
        joinedGroups.forEach(group => store.dispatch(joinGroup(group)))
    }
}

test();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/chat/:relay/:group/:subgroup?",
                element: <Chat />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
