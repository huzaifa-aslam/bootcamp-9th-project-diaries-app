import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { bool, boolean } from 'yup'

interface AuthState {
    token: string | null,
    isAuthenticated: boolean,
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveToken(state: any, {payload}: any) {
                if(payload) {
                    state.token = payload
                }
        },
        clearToken(state) {
            state.token =  null
        },
        setAuthState(state: any, {payload}:PayloadAction) {
            state.isAuthenticated = payload
        }
    }
})

export const {clearToken, saveToken, setAuthState} = auth.actions;
export default auth.reducer;