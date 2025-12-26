"use client"
import { Eraser, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dialog from "../Global/Dialog";
import CategorySelect from "../Global/CategorisInput";
import { Input } from "../ui/input";
import { AnimatePresence } from "framer-motion";

const UserFilters = ({ reset = () => { }, onClose = () => { }, filters, setFilters }) => {
    const [initialVals, setinitialVals] = useState({
        isActive: filters.isActive,
        role: filters.role,

    });
    const handleCLose = () => {
        setFilters(pv => ({ ...pv, ...initialVals }));
        onClose();
    }
    return (
        <AnimatePresence>

            <Dialog
                onClose={onClose}
                withCloseButton={false}
                containerClassName="w-[400]"
                backWhenClose={false}
                closeIfClickOutside={false}
            >
                <div className="w-full flex justify-between items-center">

                    <h1 className="text-xl p-2 font-medium">Filter products</h1>
                    <button className="bg-background  p-1 rounded border border-foreground/20" onClick={() => onClose()}>
                        <X className="w-4 h-4 stroke-1" />
                    </button>
                </div>
                <div className="mt-5 flex gap-4 items-center px-1">
                    <h2 className="font-medium text-sm mb-1">Role</h2>
                    <div className="flex gap-2">
                        <button
                            className={`p-1 px-2 rounded-2xl border border-foreground/20 duration-200 transition-colors ${initialVals.role == "admin" ? "font-medium bg-green-500 text-white" : "bg-background "}`}
                            onClick={() => setinitialVals(pv => ({ ...pv, role: "admin" }))}
                        >
                            Admin
                        </button>
                        <button
                            className={`p-1 px-2 rounded-2xl border border-foreground/20 duration-200 transition-colors ${initialVals.role == "user" ? "font-medium bg-green-500 text-white" : "bg-background "}`}
                            onClick={() => setinitialVals(pv => ({ ...pv, role: "user" }))}
                        >
                            User
                        </button>
                        <button
                            className={`p-1 px-2 rounded-2xl border border-foreground/20 duration-200 transition-colors ${initialVals.role == null ? "font-medium bg-green-500 text-white" : "bg-background "}`}
                            onClick={() => setinitialVals(pv => ({ ...pv, role: null }))}
                        >
                            Anything
                        </button>
                    </div>
                </div>

                <div className=" mt-4 px-2">
                    <label className="block mb-2 text-sm font-medium">Active</label>
                    <div className="flex items-center gap-3">


                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, isActive: !prev.isActive }))}
                            className={`w-14 h-6 rounded-full flex items-center p-1 transition-colors duration-300
                         duration-200 transition-colors ${initialVals?.isActive ? "bg-green-500" : initialVals?.isActive == false ? "bg-gray-400" : ""}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                        duration-200 transition-colors ${initialVals?.isActive ? "translate-x-8" : initialVals?.isActive == false ? "translate-x-0" : "translate-x-4"}`}
                            ></div>
                        </button>

                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, isActive: null }))}
                            className={`rounded-full flex items-center  duration-200 transition-colors ${initialVals?.isActive == null ? "bg-green-500 text-white" : "bg-primary-foreground "} text-sm font-medium p-1 px-3 border border-foreground/10 transition-colors duration-300`}
                        >
                            anything
                        </button>
                    </div>

                </div>

                <div className="flex mt-8  gap-3 justify-end items-center">
                    <button onClick={() => { reset(); onClose() }} className="text-sm justify-center flex items-center gap-2 font-medium p-2  px-4 bg-background text-destructive  border border-destructive/10  rounded-md tracking-tight">
                        Rest
                        <i className="bi bi-arrow-clockwise"></i>
                    </button>
                    <button onClick={handleCLose} className="text-sm justify-center flex items-center gap-2 font-medium p-2  px-4 bg-background  border border-foreground/10 w-[150]   rounded-md tracking-tight">
                        Done
                        <i className="bi bi-check-circle"></i>
                    </button>
                </div>
            </Dialog>
        </AnimatePresence >
    )
}

export default UserFilters
