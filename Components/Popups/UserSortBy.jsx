"use client"
import { X } from "lucide-react";
import { useState } from "react";
import Dialog from "../Global/Dialog";
import { AnimatePresence } from "framer-motion";

const UserSortBy = ({ onClose = () => { }, sortBy, setSortBy }) => {
    const [sortBy_h, setSortBy_h] = useState(sortBy);
    const handleCLose = () => {
        setSortBy(sortBy_h);
        onClose();
    }
    return (
        <AnimatePresence>

            <Dialog
                onClose={onClose}
                withCloseButton={false}
                containerClassName="w-[450]"
                backWhenClose={false}
                closeIfClickOutside={false}
            >
                <div className="w-full flex justify-between items-center">

                    <h1 className="text-xl p-2 font-medium">Sort By products</h1>
                    <button className="bg-background  p-1 rounded border border-foreground/20" onClick={() => onClose()}>
                        <X className="w-4 h-4 stroke-1" />
                    </button>
                </div>
                <div className=" mt-4 px-2 flex gap-7 items-center">
                    <label className="block  min-w-[100]  font-medium">Join Date</label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSortBy_h("createdAt:asc")}
                            className={`  text-sm  gap-1  flex items-center p-1 px-3 border border-foreground/20 rounded-md transition-colors duration-300
                            ${sortBy_h == "createdAt:asc" ? "bg-green-500 text-white opacity-100 font-medium" : "opacity-70 bg-background  "} `}
                        >

                            {/* <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                             ${sortBy_h == "createdAt:asc" ? "translate-x-8" : "translate-x-4"}`}
                            ></div> */}
                            <i className="bi text-base bi-arrow-up-short"></i>  Ascending
                        </button>

                        <button
                            onClick={() => setSortBy_h("createdAt:desc")}
                            className={` text-sm gap-1   flex items-center p-1 px-3 border border-foreground/20 rounded-md transition-colors duration-300
                            ${sortBy_h == "createdAt:desc" ? "bg-green-500 text-white opacity-100 font-medium" : "opacity-70 bg-background "} `}
                        >
                            <i className="bi text-base bi-arrow-down-short"></i>
                            Descending
                        </button>
                    </div>

                </div>

                <div className=" mt-4 px-2 flex gap-7 items-center">
                    <label className="block  min-w-[100]  font-medium">Number of purchases</label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSortBy_h("purchases:asc")}
                            className={`  text-sm  gap-1  flex items-center p-1 px-3 border border-foreground/20 rounded-md transition-colors duration-300
                            ${sortBy_h == "purchases:asc" ? "bg-green-500 text-white opacity-100 font-medium" : "opacity-70 bg-background  "} `}
                        >

                            {/* <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                             ${sortBy_h == "createdAt:asc" ? "translate-x-8" : "translate-x-4"}`}
                            ></div> */}
                            <i className="bi text-base bi-arrow-up-short"></i>  Ascending
                        </button>

                        <button
                            onClick={() => setSortBy_h("purchases:desc")}
                            className={` text-sm gap-1   flex items-center p-1 px-3 border border-foreground/20 rounded-md transition-colors duration-300
                            ${sortBy_h == "purchases:desc" ? "bg-green-500 text-white opacity-100 font-medium" : "opacity-70 bg-background "} `}
                        >
                            <i className="bi text-base bi-arrow-down-short"></i>
                            Descending
                        </button>
                    </div>

                </div>
                <div className="flex mt-8  gap-3 justify-end items-center">
                    <button onClick={handleCLose} className="text-sm justify-center flex items-center gap-2 font-medium p-2  px-4 bg-background  border border-foreground/10 w-[150]   rounded-md tracking-tight">
                        Done
                        <i className="bi bi-check-circle"></i>
                    </button>
                </div>
            </Dialog>
        </AnimatePresence>
    )
}

export default UserSortBy
