import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slangs: [],
    loader: false,
};

const slangSlice = createSlice({
    name: "slangs",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setSlangs: (state, action) => {
            state.slangs = action.payload;
        },
        addSlang: (state, action) => {
            state.slangs.push(action.payload);
        },
        updateSlang: (state, action) => {
            const { id, title, description } = action.payload;
            const slangToUpdate = state.slangs.find((slang) => slang._id === id);
            if (slangToUpdate) {
                slangToUpdate.title = title;
                slangToUpdate.description = description;
            }
        },
        deleteSlang: (state, action) => {
            state.slangs = state.slangs.filter(
                (slang) => slang._id !== action.payload
            );
        },
        getSingleSlang: (state, action) => {

        },

        likeSlang: (state, action) => {
            const { id, userId } = action.payload;
            const slang = state.slangs.find((slang) => slang._id === id);
            if (slang) {
                const isAlreadyLiked = slang.isLiked.includes(userId);
                if (isAlreadyLiked) {
                    slang.isLiked.splice(slang.isLiked.indexOf(userId), 1);
                } else {
                    slang.isLiked.push(userId);
                }
            }
        },

        bookmarkSlang: (state, action) => {
            const { id, userId } = action.payload;
            const slang = state.slangs.find((slang) => slang._id === id);
            if (slang) {
                const isAlreadyBookmarked = slang.isBookmarked.includes(userId);
                if (isAlreadyBookmarked) {
                    slang.isBookmarked.splice(slang.isBookmarked.indexOf(userId), 1);
                } else {
                    slang.isBookmarked.push(userId);
                }
            }
        },


        approveSlang: (state, action) => {
            const { id } = action.payload;
            const slang = state.slangs.find((slang) => slang._id === id);
            if (slang) {
                slang.isApproved = true;
            }
        },
    },
});

export const {
    setLoader,
    setSlangs,
    addSlang,
    updateSlang,
    deleteSlang,
    likeSlang,
    bookmarkSlang,
    approveSlang
} = slangSlice.actions;

export default slangSlice.reducer;
