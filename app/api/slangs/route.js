import Slang from "@/app/(models)/Slang";
import { NextResponse } from "next/server";
import { getSession, getAccessToken } from "@auth0/nextjs-auth0";

export async function POST(req) {
    try {
        const body = await req.json();
        const slangData = body.data;
        const { user } = await getSession();
        slangData.userId = user._id;
        const slangObj = await Slang.create(slangData);
        return NextResponse.json(
            { message: "Slang Created", data: slangObj },
            { status: 201 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export const GET = async (request) => {
    try {
        const params = request.nextUrl.searchParams;
        const mySlangs = params?.get("mySlangs");
        const isApproved = params?.get("isApproved");
        const saved = params?.get("saved");
        const sortLikes = params?.get("sortLikes");
        const filter = { isApproved: true };
        if (request?.cookies?.get("appSession")?.value) {
            const { user } = await getSession();
            if (mySlangs) {
                filter.userId = user._id;
                delete filter.isApproved;
            }

            if (isApproved && user.role === "admin") {
                filter.isApproved = isApproved;
            }

            if (saved && saved === "true") {
                filter.isBookmarked = user._id;
            }
        } else {
            filter.isApproved = true;
        }


        let findPromise = Slang.find(filter);
        if (sortLikes) {
            findPromise = findPromise.sort({ likes: -1 })
            console.log('inside if', findPromise);
        }
        let allSlangs = await findPromise
        return NextResponse.json({ allSlangs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};
