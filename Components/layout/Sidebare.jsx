"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Global/Logo";

export default function Sidebar({ }) {
    const pathname = usePathname();

    const links = [
        {
            id: 1,
            label: "Dashboard",
            href: "",
            icon: <i className={`bi transition-all duration-200 bi-house${pathname == "" ? "-fill" : ""}`}></i>,
        },
        {
            id: 2,
            label: "Users",
            href: "/users",
            icon: <i className={`bi transition-all duration-200 bi-people${pathname == "/users" ? "-fill" : ""}`}></i>,
        },
        {
            id: 2.5,
            label: "Products",
            href: "/products",
            icon: <i className={`bi transition-all duration-200 bi-inboxes${pathname == "/products" ? "-fill" : ""}`}></i>,
        },
        {
            id: 2.5,
            label: "Categories",
            href: "/categories",
            icon: <i className={`bi transition-all duration-200 bi-grid-1x2${pathname == "/categories" ? "-fill" : ""}`}></i>,
        },
        {
            id: 3,
            label: "Analytics",
            href: "/analytics",
            icon: <i className={`bi transition-all duration-200 bi-bar-chart-line${pathname == "/analytics" ? "-fill" : ""}`}></i>,
        },
        {
            id: 4,
            label: "Orders",
            href: "/orders",
            icon: <i className={`bi transition-all duration-200 bi-archive${pathname == "/orders" ? "-fill" : ""}`}></i>,
        },
        {
            id: 5,
            label: "Payments",
            href: "/payments",
            icon: <i className={`bi transition-all duration-200 bi-piggy-bank${pathname == "/payments" ? "-fill" : ""}`}></i>,
        },
        {
            id: 6,
            label: "Notifications",
            href: "/notifications",
            icon: <i className={`bi transition-all duration-200 bi-bell${pathname == "/notifications" ? "-fill" : ""}`}></i>,
        },
        {
            id: 8,
            label: "Security",

            href: "/security",
            icon: <i className={`bi transition-all duration-200 bi-shield-lock${pathname == "/security" ? "-fill" : ""}`}></i>,
        },
        {
            id: 9,
            label: "Settings",
            href: "/settings",
            icon: <i className={`bi transition-all duration-200 bi-gear${pathname == "/settings" ? "-fill" : ""}`}></i>,
        },
    ];


    return (
        <aside className="w-60 h-screen bg-background border-r border-foreground/10 p-3 pt-5 flex flex-col">
            <div className="flex justify-between">

                <Logo className={"text-2xl"} />
                {/* <h1 className=" font-semibold text-sm">Admin Panel</h1> */}
            </div>
            <nav className="flex-1 mt-8 overflow-y-auto">
                <ul className="space-y-1">
                    {links.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center duration-200 gap-3 border  px-3 py-2 rounded-md transition-all text-sm 
                    ${isActive
                                            ? "bg-primary-foreground text-chart-1 border-chart-1/30 font-medium"
                                            : "text-accent-foreground border-transparent font-light hover:bg-accent hover:border-foreground/10"
                                        }
                  `}
                                >

                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
