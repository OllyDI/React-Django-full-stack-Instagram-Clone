// React modules
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Models
import { User, InitUser } from '../models/user';
import { UserState, InitUserState } from '../models/user';

// Services
import { UserService } from "../serivces/UserService";

export const UserSlice = createSlice({
    name: 'user',
    initialState: InitUserState,
    reducers: {
        UpdateUser: (state: UserState, { payload }: PayloadAction<User>) => {
            state.user = {...payload};
        }
    },
    extraReducers: {
        [UserService.retrieve.pending.type]: (state) => {
            let loading = true;
            state = {...InitUserState}, loading;
        },
        [UserService.retrieve.fulfilled.type]: (state, {payload}: PayloadAction<User>) => {
            state.loading = false;
            state.user = {...payload};
        },
        [UserService.retrieve.rejected.type]: (state, {payload}: PayloadAction<any>) => {
            state.loading = false;
            state.error = payload;
        },
        [UserService.update.pending.type]: (state) => {
            let loading = true;
            state = {...InitUserState}, loading;
        },
        [UserService.update.pending.type]: (state, {payload}: PayloadAction<User>) => {
            state.loading = false;
            state.user = {...payload};
        },
        [UserService.update.rejected.type]: (state, {payload}: PayloadAction<any>) => {
            state.loading = false;
            state.error = payload;
        },
    }
});

export const { UpdateUser } = UserSlice.actions;
export default UserSlice.reducer;