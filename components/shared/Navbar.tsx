"use client";

import { Creators, navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import DownloadAppModal from "./DownloadAppModal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <nav className="sticky top-0 z-30">
      <div className="custom-container navbar">
        <ul className="flex items-center gap-5 2xl:gap-10">
          <Link href="/">
            <Image
              src="/assets/images/goformeetNavLogo.svg"
              alt="logo"
              className="w-48 2xl:w-64"
              width={230}
              height={40}
            />
          </Link>
          <li className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-base xl:text-lg font-bold gap-2 items-center hidden lg:flex">
                For Creators
                <FaChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Creators.map((creator) => (
                  <DropdownMenuItem key={creator.path}>
                    <Link href={creator.path}>{creator.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          {navLinks.map((link, index) => (
            <li
              className="text-black text-base xl:text-lg font-bold hidden lg:flex"
              key={index}
            >
              <a href={link.route}>{link.label}</a>
            </li>
          ))}
        </ul>
        <ul className="items-center gap-4 hidden lg:flex">
          <li className="hidden lg:block">
            <SearchBar />
          </li>
          <li>
            <DownloadAppModal>
              <div className="border-gradient">
                <Button className="login-button">Login</Button>
              </div>
            </DownloadAppModal>
          </li>
          <li>
            <DownloadAppModal>
              <Button className="sign-in-button">Sign Up</Button>
            </DownloadAppModal>
          </li>
        </ul>
        <ul className="block lg:hidden">
          <Button
            variant="outline"
            className="nav-open-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FaBars className="text-lg" />
          </Button>
        </ul>
      </div>
      {open && (
        <div className="min-w-full bg-white absolute top-0 right-0 z-[1000] px-5 flex flex-col py-8 nav-container lg:hidden">
          <div className="flex justify-end mb-5">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              <IoMdClose className="text-lg" />
            </Button>
          </div>
          <div className="flex flex-col gap-10 justify-between h-full">
            <ul className="flex flex-col gap-3">
              <li className="mb-5">
                <SearchBar />
              </li>
              <li>
                <Collapsible>
                  <CollapsibleTrigger className="font-bold text-lg flex justify-between w-full items-center gap-2">
                    For Creators <FaChevronDown />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {Creators.map((creator) => (
                      <div key={creator.path} className="border-b py-2">
                        <Link href={creator.path}>{creator.title}</Link>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </li>
              {navLinks.map((link, index) => (
                <li className="text-black text-lg font-bold" key={index}>
                  <a href={link.route}>{link.label}</a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-5 w-full">
              <li className="flex gap-4 items-center w-full">
                <DownloadAppModal>
                  <div className="border-gradient w-full">
                    <Button className="login-button w-full">Login</Button>
                  </div>
                </DownloadAppModal>
              </li>
              <li className="w-full">
                <DownloadAppModal>
                  <Button className="sign-in-button w-full">Sign Up</Button>
                </DownloadAppModal>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
