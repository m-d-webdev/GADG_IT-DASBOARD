"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";
import { CirclePower, ReceiptText, Trash2 } from "lucide-react";
import { COPY_TEXT } from "@/lib/utils";
import { ACTIVATE_PROD, DEACTIVATE_PROD, DELETE_POD, MASK_PROD_FEATURED } from "@/api/Products";
import Loader1 from "../Global/Loader1";
import ProductPopup from "./ProductDetails";

const MoreOptionsProduct = ({ product, setProdInactive, refreshProds, setProdFeature = () => { } }) => {

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
    const [isFeaturing, setFeaturing] = useState(false)

    const handleFeature = async (isTrue = true) => {
        setFeaturing(true);

        const res = await MASK_PROD_FEATURED({ _id: product._id })
        if (!res.failed) {
            setProdFeature(isTrue)
        };

        setFeaturing(false)
    };


    const handleDesactivate = async () => {
        setDeactivating(true)
        const res = await DEACTIVATE_PROD({ _id: product._id })
        if (!res.failed) {
            setProdInactive()
        }
        setDeactivating(false)
    };

    const handleAactivate = async () => {
        setDeactivating(true)
        const res = await ACTIVATE_PROD({ _id: product._id })
        if (!res.failed) {
            setProdInactive(true)
        }
        setDeactivating(false)
    };

    const handleDelete = async () => {
        setDeleting(true)
        const res = await DELETE_POD({ _id: product._id })
        if (!res.failed) {
            refreshProds(true)
        }
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
                            <Link href={`/products/${product._id}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi text-base w-5 bi-pen"></i>
                                Edit
                            </Link>
                            <button onClick={() => COPY_TEXT(JSON.stringify(product))} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi text-base w-5 bi-clipboard-check"></i>
                                Copy Product
                            </button>
                            {
                                product.isFeatured == true
                                    ? <button onClick={() => handleFeature(false)} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-destructive border-transparent hover:border-destructive/50 rounded-md hover:bg-destructive/5  items-center ">
                                        {isFeaturing
                                            ? <Loader1 wh="w-5 h-5 " className="before:border-destructive" />
                                            : <i className="bi  text-base w-5  bi-star"></i>
                                        }
                                        Unfeature
                                    </button>
                                    :
                                    <button onClick={() => handleFeature(true)} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-green-500 border-transparent hover:border-green-500/50 rounded-md hover:bg-green-500/5  items-center ">
                                        {isFeaturing
                                            ? <Loader1 wh="w-5 h-5 " className="before:border-green-500" />
                                            : <i className="bi  text-base w-5  bi-star"></i>
                                        }
                                        Feature
                                    </button>
                            }
                            {
                                product.isActive
                                    ? <button onClick={handleDesactivate} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-destructive border-transparent hover:border-destructive/50 rounded-md hover:bg-destructive/5  items-center ">
                                        {isDeactivating
                                            ? <Loader1 wh="w-5 h-5 " className="before:border-destructive" />
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

                            <button onClick={handleDelete} className="flex cursor-pointer  p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border text-destructive border-transparent hover:border-destructive/50 rounded-md hover:bg-destructive/5  items-center ">
                                {
                                    isDeleting
                                        ? <Loader1 wh="w-5 h-5 " className="before:border-destructive" />
                                        : <Trash2 className="stroke-1 w-5 h-5" />
                                }
                                Delete
                            </button>
                        </motion.div>
                    }
                </AnimatePresence>
            </div >
            <AnimatePresence>
                {detailsOpen && <ProductPopup onClose={() => setdetailsOpen(false)} product={product} />}
            </AnimatePresence>
        </>
    )
}

export default MoreOptionsProduct
