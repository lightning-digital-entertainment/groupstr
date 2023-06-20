import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "nostr-tools";

export interface RelayState {
    activeRelay: string;
    knownRelays: string[];
    groupList: Event[];
}

const initialState: RelayState = {
    activeRelay: "wss://spool.chat",
    knownRelays: ["wss://spool.chat", "wss://n29.nostr.com"],
    groupList: []
};

export const relaySlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeActiveRelay: (state, action: PayloadAction<string>) => {
            state.activeRelay = action.payload;
        },
        addKnownRelays: (state, action: PayloadAction<string>) => {
            if (!state.knownRelays.includes(action.payload)) {
                state.knownRelays.push(action.payload);
            }
        },
        setGroupList: (state, action: PayloadAction<Event[]>) => {
            state.groupList = action.payload
        }
    },
});

export const { changeActiveRelay, setGroupList } = relaySlice.actions;

export default relaySlice.reducer;
