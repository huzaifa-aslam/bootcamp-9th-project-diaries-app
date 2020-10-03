import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Entry} from './../../interfaces/entry.interfaces'

const entries=createSlice({
    name:'entries',
    initialState:[] as Entry[],
    reducers:{
        setEntries(state,{payload}:PayloadAction<Entry[]>){
            return (state=payload!=null?payload:[])
        },
        updateEntry(state,{payload}:PayloadAction<Entry>){
            const {id}=payload;
            const index=state.findIndex((item)=>item.id===id)
            if(index!==-1){
                state.splice(index,1,payload)
            }
        },
    }
})
export const{setEntries,updateEntry}=entries.actions
export default entries.reducer;