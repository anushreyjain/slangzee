import { generateApiUrl } from "@/functions/common";

export const getAllSlangs = async (getAllSlangConfig) => {
    const mySlangs = getAllSlangConfig?.mySlangs;
    const isApproved = getAllSlangConfig?.isApproved;
    const saved = getAllSlangConfig?.saved;
    try {
        let apiUrl = generateApiUrl("slangs", { mySlangs, isApproved, saved });
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
        let apiUrl = `http://localhost:3000/api/slangs/${id}`;
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