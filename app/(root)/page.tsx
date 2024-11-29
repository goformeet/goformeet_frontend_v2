import EarnWithGoformeet from "@/components/shared/EarnWithGoformeet";
import Footer from "@/components/shared/Footer";
import LandingProfiles from "@/components/shared/LandingProfiles";
import WhyChooseGoformeet from "@/components/shared/WhyChooseGoformeet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Metadata } from "next";
import DownloadAppModal from "@/components/shared/DownloadAppModal";
import FAQSection from "@/components/shared/FAQSection";
import UserReviews from "@/components/shared/UserReviews";
import ArchitecturalJourney from "@/components/shared/ArchitecturalJourney";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";

export const metadata: Metadata = {
    title: " Goformeet | Effortless Meetings, Meaningful Expert Connections",
    description: "Book,schedule meetings , and connect with top experts effortlessly using Goformeet. Streamline your networking and gain impactful advice in just a few clicks.",
    keywords: "goformeet, GoForMeet, go for meet, Go For Meet, Go4meet, meeting app, Professional, Meeting, face to face timing, Earn money, Make money online, Looking for New opportunity, freelance, jobs, doctor freelance, model, freelance jobs for models, freelance jobs for trainers, freelance jobs for travel assistance, freelance jobs for personal assistance, freelance jobs for life coach, freelance jobs for companion, freelance jobs for actor, freelance jobs for students, freelance jobs for air hostess, freelance jobs for Astrologer, freelance jobs for artist, freelance jobs for fashion designer, freelance jobs for nurse, freelance jobs for recruiter, freelance jobs for fitness trainer, freelance jobs for analyst, freelance jobs for lawyer, freelance jobs for musician, freelance jobs for photographer, Go for meet, Gofor meet, go formeet, go4meet, go 4 meet, go4 meet, go 4meet",
    verification: {
        google: "iRHeLB1PpTkjZ8J4InsSaXjvsv_iRdLFEY5McDQ7qq0",
    },
};

export default function Home() {
    return (
        <>
            <SpeedInsights />
            <main className="hero-bg">
                <div className="flex-1">
                    <div className="flex gap-4 mb-10">
                        <div className="bg-navbar py-2 px-4 w-fit rounded-full flex items-center gap-2">
                            <Link href="https://apps.apple.com/in/app/goformeet/id6475084982" target="_blank">
                                <Image
                                    src="/assets/icons/applestore.png"
                                    alt="Apple Store"
                                    width={16} // Reduced size
                                    height={16} // Reduced size
                                />
                            </Link>

                            <Link href="https://play.google.com/store/apps/details?id=com.victaman.goformeet&pcampaignid=web_share" target="_blank">
                                <Image
                                    src="/assets/icons/playstore.png"
                                    alt="Playstore"
                                    width={16} // Reduced size
                                    height={16} // Reduced size
                                />
                            </Link>

                            <Link href="https://play.google.com/store/apps/details?id=com.victaman.goformeet&pcampaignid=web_share" target="_blank">
                                <h1 className="font-semibold text-sm lg:text-base">Download Goformeet Now</h1>
                            </Link>
                            <Image
                                src="/assets/icons/rightArrow.svg"
                                alt="right arrow"
                                height={16} // Reduced size
                                width={16} // Reduced size
                            />
                        </div>
                    </div>

                    <h1 className="text-5xl xl:text-6xl min-[1440px]:text-7xl min-[1440px]:leading-[84px] line font-bold mb-4">
                        Guaranteed Meetings with <span className="text-[#E03401]">Industry Experts</span>
                    </h1>
                    <p className="text-lg font-semibold w-[70%] xl:text-xl min-[1440px]:text-2xl min-[1440px]:w-full">
                        Book and secure your meetings with top professionals effortlessly.
                    </p>
                    <div className="flex gap-4 my-4">
                        <DownloadAppModal>
                            <div className="border-gradient mb-5">
                                <Button variant="outline" className="flex gap-1">
                                    Start My Page
                                    <Image
                                        alt="Right Arrow"
                                        className="mt-1"
                                        src="/assets/icons/rightArrow.svg"
                                        width={16}
                                        height={16}
                                    />
                                </Button>
                            </div>
                        </DownloadAppModal>
                        <DownloadAppModal>
                            <Button className="sign-in-button gap-1 items-center justify-center">
                                Book Meeting
                                <Image
                                    alt="Right Arrow"
                                    src="/assets/icons/arrowRight.svg"
                                    className="mt-1"
                                    width={12}
                                    height={12}
                                />
                            </Button>
                        </DownloadAppModal>
                    </div>
                </div>
                <div className="flex-1 justify-end hidden lg:flex">
                    <Image
                        src="/assets/images/hero.png"
                        width={400}
                        height={400}
                        alt="Hero Image"
                        className="xl:w-[80%]"
                    />
                </div>
            </main>
            <LandingProfiles />
            <div className="my-28">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-8 font-bold">
                    We have been <span className="text-[#E03300]">Featured on</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center md:justify-around">
                    <Link href="http://dhunt.in/UGvC9" target="_blank">
                        <Image
                            src="/assets/images/dailyhunt.png"
                            width={200}
                            height={200}
                            className="mx-auto"
                            alt="Dailyhunt"
                        />
                    </Link>
                    <Link href="https://medium.com/@sakshigoformeet/meet-connect-and-earn-introducing-goformeet-b418d9c46186" target="_blank">
                        <Image
                            src="/assets/images/medium.png"
                            width={200}
                            height={200}
                            className="mx-auto"
                            alt="Medium"
                        />
                    </Link>
                    <Link href="">
                        <Image
                            src="/assets/images/gnews.png"
                            width={200}
                            height={200}
                            className="mx-auto"
                            alt="Google News"
                        />
                    </Link>
                    <Link href="https://goformeet.quora.com/" target="_blank">
                        <Image
                            src="/assets/images/quara.png"
                            width={200}
                            height={200}
                            className="mx-auto"
                            alt="Quora"
                        />
                    </Link>
                </div>
            </div>
            <EarnWithGoformeet />
            <WhyChooseGoformeet />
            <ArchitecturalJourney />
            <UserReviews />
            <FAQSection />
        </>
    );
}
