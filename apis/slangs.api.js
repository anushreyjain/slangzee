import { generateApiUrl } from "@/functions/common";



export const getAllSlangs = async (getAllSlangConfig) => {
    const mySlangs = getAllSlangConfig?.mySlangs;
    const isApproved = getAllSlangConfig?.isApproved;
    const saved = getAllSlangConfig?.saved;
    const sortLikes = getAllSlangConfig?.sortLikes;
    try {
        let apiUrl = generateApiUrl("GET_ALL_SLANG", { mySlangs, isApproved, saved, sortLikes });
        const res = await fetch(apiUrl, {
            cache: "no-store",
        });
        return res.json();
    } catch (error) {
        console.log("Failed to get slangs", error);
    }
};

export const getSingleSlang = async (id) => {
    try {
        let apiUrl = generateApiUrl("GET_SINGLE_SLANG", {}, { id });
        const res = await fetch(apiUrl, {
            cache: "no-store",
        });
        return res.json();
    } catch (error) {
        console.log("Failed to fetch a slang", error);
    }
};

export const likeSlangAPI = async (id) => {
    try {
        let apiUrl = `http://localhost:3000/api/slangs/${id}/likes`;
        const res = await fetch(apiUrl, {
            method: "PUT",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to like a slang");
        }
        return res.json();
    } catch (error) {
        throw new Error("Failed to like a slang", error);
    }
};

export const bookmarkedSlangAPI = async (id) => {
    try {
        let apiUrl = `http://localhost:3000/api/slangs/${id}/bookmark`;
        const res = await fetch(apiUrl, {
            method: "PUT",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to bookmark a slang");
        }
        return res.json();
    } catch (error) {
        throw new Error("Failed to bookmark a slang", error);
    }
};


export const approveSlangAPI = async (id) => {
    try {
        let apiUrl = `http://localhost:3000/api/slangs/${id}/approve`;
        const res = await fetch(apiUrl, {
            method: "PUT",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to approve a slang");
        }
        return res.json();
    } catch (error) {
        throw new Error("Failed to approve a slang", error);
    }
};