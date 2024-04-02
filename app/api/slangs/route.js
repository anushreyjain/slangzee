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
    } else {
      filter.isApproved = true;
    }

    let allSlangs = await Slang.find(filter);
    return NextResponse.json({ allSlangs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
