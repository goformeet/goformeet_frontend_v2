"use client";

import { usePathname } from "next/navigation";
import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="lg:w-1/4 pt-[480px] lg:pt-0">
          <Image
            src="/assets/images/goformeetNavLogo.svg"
            alt="logo"
            width={200}
            height={200}
          />
          <p>
            Welcome to #Goformeet, your premier platform for guaranteed meetings
            with top professionals across various industries.
          </p>
          <div className="flex gap-3 mt-3">
            <Link href="https://www.facebook.com/goformeet" target="_blank">
              <Image
                src="/assets/icons/facebook.svg"
                alt="Facebook"
                className="footer-social-link"
                width={26}
                height={26}
              />
            </Link>
            {/* <Link href="/">
            <Image
              src="/assets/icons/twitter.svg"
              alt="Twitter"
              className="footer-social-link"
              width={30}
              height={30}
            />
          </Link> */}
            <Link href="https://www.instagram.com/goformeet/" target="_blank">
              <Image
                src="/assets/icons/instagram.svg"
                alt="Instagram"
                className="footer-social-link"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/goformeet"
              target="_blank"
            >
              <Image
                src="/assets/icons/linkedin.svg"
                alt="Linkedin"
                className="footer-social-link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://www.youtube.com/@goformeet" target="_blank">
              <Image
                src="/assets/icons/youtube.svg"
                alt="Youtube"
                className="footer-social-link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://goformeet.co/goformeet" target="_blank">
              <Image
                src="/assets/icons/goformeet.png"
                alt="Youtube"
                className="footer-social-link"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
        <ul>
          {footerLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className={`block mb-4 ${
                  pathname === link.route ? "text-black font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div className="flex flex-wrap lg:flex-row gap-4 lg:items-center">
            <div>
              <h2 className="font-bold text-xl">How can we help?</h2>
              <p className="text-xl text-[#E03300] font-semibold">
                Contact us anytime.
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-md flex flex-col lg:flex-row gap-8 w-full lg:w-fit ">
              <div className="border-b-2 lg:border-b-0 pb-3 lg:pb-0 lg:border-r-2 flex-1 pr-8">
                <p className="text-[#B3BABF] ">SEND US A MESSAGE</p>
                <p className="text-[#040C12] text-lg">info@goformeet.co</p>
              </div>
              <div className="flex-1">
                <p className="text-[#B3BABF] ">CALL US</p>
                <p className="text-[#040C12] text-lg">+91 888 425 5828</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 lg:pl-16">
            <Image
              src="/assets/images/goformeetFooter.svg"
              alt="Footer Image"
              width={450}
              height={200}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#E03300] text-[10px] md:text-[12px] flex flex-wrap justify-center gap-2 custom-container mx-8 lg:mx-28 py-4">
        <p className="text-[#B3BABF]">
        Goformeet consulting private limited | All Rights Reserved |
        </p>
        <Link href="/privacy-policy" className="text-[#E03300] underline">
          Privacy Policy |
        </Link>
        <Link href="/terms-of-service" className="text-[#E03300] underline">
          Terms of Service |
        </Link>
        <Link href="/refund-policy" className="text-[#E03300] underline">
          Refund Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
