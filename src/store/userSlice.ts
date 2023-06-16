import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "nostr-tools";

export interface UserState {
    users: { [key: string]: Event };
}

const initialState: UserState = {
    users: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Event>) => {
            state.users[action.payload.pubkey] = action.payload;
        },
    },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
