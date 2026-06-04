import { NextResponse } from "next/server";
import { methods } from "@/mock/data";

export function GET() {
  return NextResponse.json(methods);
}
