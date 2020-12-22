import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Diary} from '../../interfaces/diary.interfaces';
const diaries = createSlice({
    name: 'diaries',
    initialState: [] as Diary[],
    reducers: {
        addDiary(state: any, {payload}: PayloadAction<Diary[]>) {
            const diariesToSolve = payload.filter((diary: any) => {
                return state.findIndex((item: any) => item.id === diary.id) === -1
            })

            state.push(...diariesToSolve)
        },
        updateDiary(state, {payload}: PayloadAction<Diary>) {
            const {id} = payload;
            const diaryIndex = state.findIndex((diary)=> diary.id === id);
            if(diaryIndex !== -1){
                state.splice(diaryIndex, 1, payload)
            };
        },
    },
});

export const {addDiary, updateDiary} = diaries.actions;
export default diaries.reducer;