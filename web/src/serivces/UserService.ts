// React modules
import { createAsyncThunk } from '@reduxjs/toolkit';

// External modules
import axios from 'axios';

// Models
import { User } from '../models/user';

export const UserService = {
    retrieve: createAsyncThunk(
        'user/retrieve',
        async (userId: any, {rejectWithValue}) => {
            try {
                const resp = axios.get(`/users/${userId}`);
                return (await resp).data;
            } catch(error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    ),
    update: createAsyncThunk(
        'user/upate',
        async (user: User, {rejectWithValue}) => {
            try {
                const resp = await axios.put(`/users/${user.pk}`, user);
                return resp.data;
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}