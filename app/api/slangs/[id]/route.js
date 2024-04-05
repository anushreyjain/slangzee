import Slang from "@/app/(models)/Slang";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundSlang = await Slang.findOne({ _id: id });
    return NextResponse.json({ foundSlang }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const slangData = body.data;
    const updatedSlangData = await Slang.findByIdAndUpdate(id, {
      ...slangData,
    });
    return NextResponse.json({ message: "Slang Updated" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Slang.findByIdAndDelete(id);
    return NextResponse.json({ message: "Slang Deleted" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

