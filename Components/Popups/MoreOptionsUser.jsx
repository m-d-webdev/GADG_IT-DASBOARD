"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";
import { CircleOff, CirclePower, ReceiptText, Trash2 } from "lucide-react";
import { COPY_TEXT } from "@/lib/utils";
import { ACTIVATE_PROD, DEACTIVATE_PROD, DELETE_POD } from "@/api/Products";
import Loader1 from "../Global/Loader1";
import ProductPopup from "./ProductDetails";
import UserDetailsCard from "./UserDetails";
const MoreOptionsUser = ({ user, setProdInactive, refreshProds }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [detailsOpen, setdetailsOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const PageRef = useRef();


    const handleClickOutside = (e) => {
        if (!PageRef.current?.contains(e.target)) {
            setMenuOpen(false)
        }
    };

    useEffect(() => {
        if (!menuOpen) return;

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const [isDeactivating, setDeactivating] = useState(false)

    const handleDesactivate = async () => {
        setDeactivating(true)
        // const res = await DEACTIVATE_PROD({ _id: user._id })
        // if (!res.failed) {
        //     setProdInactive()
        // }
        setDeactivating(false)
    };
    
    const handleAactivate = async () => {
        setDeactivating(true)
        // const res = await ACTIVATE_PROD({ _id: user._id })
        // if (!res.failed) {
        //     setProdInactive(true)
        // }
        setDeactivating(false)
    };

    const handleSuspend = async () => {
        setDeleting(true)
        // const res = await DELETE_POD({ _id: user._id })
        // if (!res.failed) {
        //     refreshProds(true)
        // }
        setDeleting(false)
    };

    return (
        <>
            <div className="relative">
                <button onClick={() => setMenuOpen(pv => !pv)} className={"bg-background p-1 px-3 border border-foreground/20 rounded-md  z-[2]"}>
                    <i className="bi bi-layout-wtf"></i>
                </button>
                <AnimatePresence>

                    {
                        menuOpen &&
                        <motion.div
                            initial={{
                                scale: .7,
                                opacity: 0
                            }}
                            exit={{
                                scale: .7,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transformOrigin: "top right",
                                transition: {
                                    ease: "easeInOut",
                                    duration: .2
                                }
                            }}
                            ref={PageRef}
                            className="absolute min-w-[150] flex flex-col gap-1 bg-background top-0 right-0 z-2 p-1 shadow-sm rounded-lg"
                        >
                            <button onClick={() => setdetailsOpen(true)} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <ReceiptText className="stroke-1 w-5 h-5" />
                                More details
                            </button>
                            <Link href={`/products/${user._id}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi text-base w-5 bi-pen"></i>
                                Edit
                            </Link>
                            {
                                user.isActive
                                    ? <button onClick={handleDesactivate} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-[#d26601] oborder-yellow-300 border-transparent hover:border-yellow-300/50 rounded-md hover:bg-destructive/5  items-center ">
                                        {isDeactivating
                                            ? <Loader1 wh="w-5 h-5 " className="before:border-yellow-300" />
                                            : <i className="bi  text-base w-5 bi-slash-circle"></i>
                                        }
                                        deactivate
                                    </button>
                                    : <button onClick={handleAactivate} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-green-500 border-transparent hover:border-green-500/50 rounded-md hover:bg-green-500/5  items-center ">
                                        {isDeactivating
                                            ? <Loader1 wh="w-5 h-5 " className="before:border-green-600" />
                                            : <CirclePower className="stroke-1 w-5 h-5" />
                                        }
                                        Activate
                                    </button>


                            }

                            <button onClick={handleSuspend} className="flex cursor-pointer  p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-destructive border-transparent hover:border-destructive/50 rounded-md hover:bg-destructive/5  items-center ">
                                {
                                    isDeleting
                                        ? <Loader1 wh="w-5 h-5 " className="before:border-destructive" />
                                        : <CircleOff className="stroke-1 w-5 h-5" />
                                }
                                Suspend
                            </button>
                        </motion.div>
                    }
                </AnimatePresence>
            </div >
            <AnimatePresence>
                {detailsOpen && <UserDetailsCard onClose={() => setdetailsOpen(false)} user={user} />}
            </AnimatePresence>
        </>
    )
}

export default MoreOptionsUser
