import PageLoader from "next/dist/client/page-loader";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude } = await request.json();

    const page = request.nextUrl.searchParams.get("page");
    const profession = request.nextUrl.searchParams.get("profession");
    const search = request.nextUrl.searchParams.get("search");
    console.log(search)

    const body = {
      latitude,
      longitude,
      profession,
    };

    console.log(process.env.BACKEND_URL)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/filter-hosts?page=${page}&search=${search}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Error fetching data from the API" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
