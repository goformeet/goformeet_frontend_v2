import { cn } from "@/lib/utils";
import { Arimo } from "next/font/google";
import Image from "next/image";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

const arimoRegularFontP = fetch(
  new URL("../../../public/assets/Arimo-Regular.ttf", import.meta.url), {cache: "no-cache"}
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const [arimoRegularFont] = await Promise.all([arimoRegularFontP]);

    const hasName = searchParams.has("name");
    const name = hasName
      ? searchParams.get("name")?.slice(0, 100)
      : "My default name";

    const hasUsername = searchParams.has("username");
    const username = hasUsername ? searchParams.get("username") : "username";
    console.log(username);

    const userDetails = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-profile/${username}`, {cache: "no-cache"});
    const userData = await userDetails.json();


    const imageUrl = userData.profile.personalDetails.profileImages[0];
    console.log(imageUrl);

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: "black",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            fontFamily: "Arimo",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src="https://www.goformeet.co/assets/images/ogImage.png"
            tw="w-full h-full absolute top-0 left-0"
            alt="ogimage"
            height={630}
            width={1200}
            
          />
          <h2 tw="absolute font-bold top-48 left-[465px] z-[10]"> {name} </h2>
          <img
            src={imageUrl}
            alt="og-image"
            tw="w-[329px] h-[472px] absolute top-20 left-21 rounded-lg"
            height={472}
            width={329}
          />
          <h4 tw="pt-30 absolute left-[465px] mt-2">{`goformeet.co/${username}`}</h4>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Arimo",
            data: arimoRegularFont,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
