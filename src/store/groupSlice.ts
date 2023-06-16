import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "nostr-tools";

export interface RelayState {
    groupList: Event[];
    memberOf: string[]
}

const initialState: RelayState = {
    groupList: [],
    memberOf: ['/spool.chat/nostrdevs-gpUNoQ7CLjQS/subgroup']
};

export const groupSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setGroupList: (state, action: PayloadAction<Event[]>) => {
            state.groupList = action.payload
        },
        joinGroup: (state, action: PayloadAction<string>) => {
          state.memberOf.push(action.payload)
        }
    },
});

export const { joinGroup, setGroupList } = groupSlice.actions;

export default groupSlice.reducer;
