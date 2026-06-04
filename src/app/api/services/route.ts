import { NextResponse } from "next/server";
import { serviceItems } from "@/mock/data";

export function GET() {
  return NextResponse.json(serviceItems);
}
