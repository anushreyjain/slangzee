import Slang from "@/app/(models)/Slang";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const slangData = body.data;
    const slangObj = await Slang.create(slangData);
    console.log("slangObj", slangObj);
    return NextResponse.json(
      { message: "Slang Created", data: slangObj },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export const GET = async () => {
  try {
    const allSlangs = await Slang.find();
    return NextResponse.json({ allSlangs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
