import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';


export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({username, password}) => {
        try{
            const { data } = await axios.post('/auth/register', {
                username,
                password
            })
            if(data.token){
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({username, password}) => {
        try{
            const { data } = await axios.post('/auth/login', {
                username,
                password
            })
            if(data.token){
                window.localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }
)

export const getMe = createAsyncThunk(
    'auth/me', 
    async () => {
        try{
            const { data } = await axios.get('/auth/me')
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        //register user
        [registerUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [registerUser.rejectedWithValue]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        },
        //login user
        [loginUser.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [loginUser.rejectedWithValue]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        },
        //Проверка ввторизация
        [getMe.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        [getMe.rejectedWithValue]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        },
    }
})

export const checkIsAuth = state => Boolean(state.auth.token);
export const {logOut} = authSlice.actions;
export default authSlice.reducer;