"use client";

import { useEffect, useState } from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import ProfileDropDow from "./ProfileDropDow";
import { AnimatePresence } from "framer-motion";
import { useMainContext } from "@/context/MainContext";
export default function AdminHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [DropDownOpen, setDropDownOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        {
            id: 1,
            label: "Dashboard",
            href: "",
            icon: <i className={`bi text-lg transition-all duration-200 bi-house`}></i>,
        },
        {
            id: 2,
            label: "Users",
            href: "/users",
            icon: <i className={`bi text-lg transition-all duration-200 bi-people`}></i>,
        },
        {
            id: 2.5,
            label: "Products",
            href: "/products",
            icon: <i className={`bi text-lg transition-all duration-200 bi-inboxes`}></i>,
        },
        {
            id: 3,
            label: "Analytics",
            href: "/analytics",
            icon: <i className={`bi text-lg transition-all duration-200 bi-bar-chart-line`}></i>,
        },
        {
            id: 4,
            label: "Orders",
            href: "/orders",
            icon: <i className={`bi text-lg transition-all duration-200 bi-archive`}></i>,
        },
        {
            id: 5,
            label: "Payments",
            href: "/payments",
            icon: <i className={`bi text-lg transition-all duration-200 bi-piggy-bank`}></i>,
        },
        {
            id: 6,
            label: "Notifications",
            href: "/notifications",
            icon: <i className={`bi text-lg transition-all duration-200 bi-bell`}></i>,
        },
        {
            id: 8,
            label: "Security",
            href: "/security",
            icon: <i className={`bi text-lg transition-all duration-200 bi-shield-lock`}></i>,
        },
        {
            id: 9,
            label: "Settings",
            href: "/settings",
            icon: <i className={`bi text-lg transition-all duration-200 bi-gear`}></i>,
        },
    ];
    useEffect(() => {
        setCurrentPage(links.find(i => i.href == pathname))
    }, [pathname]);
    const { user } = useMainContext()
    const [CurrentPage, setCurrentPage] = useState()
    return (
        <header className="w-full py-2 bg-background  border-b border-gray-200  flex items-center justify-between px-6">

            {/* Left Section */}
            <div className="flex items-center gap-3">
                <button
                    className="p-2 rounded-lg hover:bg-primary-foreground  md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Bars3Icon className="w-6 h-6  " />
                </button>

                {/* Page Title */}
                <div className="flex items-center gap-2">
                    {CurrentPage?.icon}

                    <h2 className="text-lg font-semibold tracking-tighter ">
                        {CurrentPage?.label}
                    </h2>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-primary-foreground -800">
                    <BellIcon className="w-5 h-5  " />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
                </button>

                {/* Profile Avatar */}
                <div className="relative">

                    <div onClick={() => setDropDownOpen(true)} className="w-9 h-9 p-[1] rounded-full bg-accent border border-chart-1/30  flex items-center justify-center cursor-pointer">
                        <img src={user.avatar} className="w-full h-full rounded-full object-cover object-top" alt="" />
                    </div>
                    <AnimatePresence>

                        {DropDownOpen
                            &&
                            <ProfileDropDow
                                onClose={() => setDropDownOpen(false)}
                            />
                        }
                    </AnimatePresence>
                </div>
            </div>
        </header >
    );
}
