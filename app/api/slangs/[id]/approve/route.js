import Slang from "@/app/(models)/Slang";
import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { user } = await getSession();
        const approveSlang = await Slang.findById(id);
        if (user.role === 'admin') {
            const updatedSlangApproved = await Slang.findByIdAndUpdate(id, {
                isApproved: true
            });
        } else {
            return NextResponse.json({ message: "Unauthorized", err }, { status: 401 });
        }
        return NextResponse.json({ message: "Slang approved" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
