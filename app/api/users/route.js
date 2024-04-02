import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    return NextResponse.json(
      { message: "User Created", data: user },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
