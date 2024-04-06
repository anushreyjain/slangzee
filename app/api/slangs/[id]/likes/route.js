import Slang from "@/app/(models)/Slang";
import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { user } = await getSession();
        const likedSlang = await Slang.findById(id);
        if (likedSlang.isLiked.includes(user._id)) {
            const updatedSlangLike = await Slang.findByIdAndUpdate(id, {
                $pull: { isLiked: user._id }, $inc: { likes: -1 }
            });
        } else {
            const updatedSlangLike = await Slang.findByIdAndUpdate(id, {
                $addToSet: { isLiked: user._id }, $inc: { likes: 1 }
            });
        }

        return NextResponse.json({ message: "Slang liked" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
