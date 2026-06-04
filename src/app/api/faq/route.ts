import { NextResponse } from "next/server";
import { faq } from "@/mock/data";

export function GET() {
  return NextResponse.json(faq);
}
