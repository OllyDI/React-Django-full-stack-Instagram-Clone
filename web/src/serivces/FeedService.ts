// React 
import { createAsyncThunk } from "@reduxjs/toolkit";

// External moduls
import axios from "axios";

// Models
import { Feed } from "../models/feed";

export const FeedService = {
    list: createAsyncThunk(
        'feed/list',
        async (_: void, {rejectWithValue}) => {
            try {
                const resp = await axios('/feeds');
                return {
                    totalcount: resp.data.count,
                    items: [...resp.data.results]
                }
            } catch(error:any) { return rejectWithValue(error.response.data.message); }
        }
    ),
    create: createAsyncThunk(
        'feed/create',
        async (feed: FormData, {rejectWithValue}) => {
            try {
                const resp = await axios.post('/feeds', feed);
                return resp.data;
            } catch (error: any) { return rejectWithValue(error.response.data.message); }
        }
    )
}