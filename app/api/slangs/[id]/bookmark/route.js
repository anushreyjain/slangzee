import Slang from "@/app/(models)/Slang";
import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { user } = await getSession();
        const bookmarkedSlang = await Slang.findById(id);
        if (bookmarkedSlang.isBookmarked.includes(user._id)) {
            const updatedSlangBookmark = await Slang.findByIdAndUpdate(id, {
                $pull: { isBookmarked: user._id },
            });
        } else {
            const updatedSlangBookmark = await Slang.findByIdAndUpdate(id, {
                $addToSet: { isBookmarked: user._id },
            });
        }

        return NextResponse.json({ message: "Slang bookmarked" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
