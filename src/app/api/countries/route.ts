import { NextResponse } from "next/server";
import { countries } from "@/mock/data";

export function GET() {
  return NextResponse.json(countries);
}
