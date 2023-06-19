import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes";
import { Chat } from "./features/chat";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SimplePool, getPublicKey } from "nostr-tools";

export const pool = new SimplePool();

export const relayKey = "805efff537b6376991cae73a0b0f605d0aa594b4518fbcca4f6ebb74404363e2"

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
