import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Entry} from '../../interfaces/entry.interface';

const entries = createSlice({
    name: 'entries',
    initialState: [] as Entry[],
    reducers: {
        setEntries(state, {payload}: PayloadAction<Entry[] | null> ) {
            return state = payload != null ? payload : [];
        },
        updateEntry(state, {payload}: PayloadAction<Entry>) {
            const {id} = payload;
            const findIndex = state.findIndex((item) => item.id === id);
            if(findIndex !== -1) {
                return state.splice(findIndex, 1, payload);
            };
        },
    },
});

export const {setEntries, updateEntry} = entries.actions;
export default entries.reducer;