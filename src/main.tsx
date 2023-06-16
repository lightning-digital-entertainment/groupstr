import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes";
import { Chat } from "./features/chat";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SimplePool, getPublicKey } from "nostr-tools";

export const pool = new SimplePool();

export const testKey = '8cac20847b8701172255be8b06e844f7e74d724ab8cada16887270718fb45861'

async function test() {
    const list = await pool.get(["wss://spool.chat"], {
        kinds: [39002],
        "#p": [getPublicKey(testKey)],
    });
    console.log(list);
}

test();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/chat/:relay/:group/*",
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
