"use client"
import { Eraser, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dialog from "../Global/Dialog";
import CategorySelect from "../Global/CategorisInput";
import { Input } from "../ui/input";
import { AnimatePresence } from "framer-motion";

const ProductFilter = ({ reset = () => { }, onClose = () => { }, filters, setFilters }) => {
    const [initialVals, setinitialVals] = useState({
        category: filters.category,
        maxPrice: filters.maxPrice,
        minPrice: filters.minPrice,
        inStock: filters.inStock,
        isFeatured: filters.isFeatured,
        isActive: filters.isActive
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
                containerClassName="w-[500]"
                backWhenClose={false}
                closeIfClickOutside={false}
            >
                <div className="w-full flex justify-between items-center">

                    <h1 className="text-xl p-2 font-medium">Filter products</h1>
                    <button className="bg-background  p-1 rounded border border-foreground/20" onClick={() => onClose()}>
                        <X className="w-4 h-4 stroke-1" />
                    </button>
                </div>
                <div className="mt-5 px-1">
                    <h2 className="font-medium text-sm mb-1">Category</h2>
                    <CategorySelect
                        value={initialVals.category ?? ""}
                        onChange={v => setinitialVals(pv => ({ ...pv, category: v }))}
                    />
                </div>

                <div className="mt-2 px-1">
                    <Input
                        value={initialVals.maxPrice ?? ''}
                        label={"Max price"}
                        onChange={e => setinitialVals(pv => ({ ...pv, maxPrice: e.target.value }))}
                        parentClassName="bg-background"
                        icon={<i className="bi bi-cash-stack"></i>}
                        placeholder="00.00 mad"
                    />
                </div>
                <div className="mt-2 px-1">
                    <Input
                        onChange={e => setinitialVals(pv => ({ ...pv, minPrice: e.target.value }))}
                        value={initialVals.minPrice ?? ''}
                        parentClassName="bg-background"
                        label={"Min price"}
                        icon={<i className="bi bi-cash-stack"></i>}
                        placeholder="00.00 mad"
                    />
                </div>
                <div className=" mt-4 px-2">
                    <label className="block mb-2 text-sm font-medium">In Stock</label>
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, inStock: !prev.inStock }))}
                            className={`w-14 border border-foreground/20 h-6 rounded-full flex items-center p-1 transition-colors duration-300
                         ${initialVals?.inStock == true ? "bg-green-500" : "bg-gray-400"}  ${initialVals?.inStock == null ? "!bg-background" : ""}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full border shadow-md transform transition-transform duration-300
                        ${initialVals?.inStock == true ? "translate-x-8" : initialVals?.inStock == false ? "" : "translate-x-4"}`}
                            ></div>
                        </button>

                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, inStock: null }))}
                            className={`rounded-full flex items-center  ${initialVals?.inStock == null ? "bg-green-500 text-white" : "bg-primary-foreground "} text-sm font-medium p-1 px-3 border border-foreground/10 transition-colors duration-300`}
                        >
                            anything
                        </button>
                    </div>

                </div>
                <div className=" mt-4 px-2">
                    <label className="block mb-2 text-sm font-medium">Active</label>
                    <div className="flex items-center gap-3">


                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, isActive: !prev.isActive }))}
                            className={`w-14 border border-foreground/20 h-6 rounded-full flex items-center p-1 transition-colors duration-300
                         ${initialVals?.isActive ? "bg-green-500" : initialVals?.isActive == false ? "bg-gray-400" : ""}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full border shadow-md transform transition-transform duration-300
                        ${initialVals?.isActive ? "translate-x-8" : initialVals?.isActive == false ? "translate-x-0" : "translate-x-4"}`}
                            ></div>
                        </button>

                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, isActive: null }))}
                            className={`rounded-full flex items-center  ${initialVals?.isActive == null ? "bg-green-500 text-white" : "bg-primary-foreground "} text-sm font-medium p-1 px-3 border border-foreground/10 transition-colors duration-300`}
                        >
                            anything
                        </button>
                    </div>

                </div>
                <div className=" mt-4 px-2">
                    <label className="block mb-2 text-sm font-medium">Featured</label>
                    <div className="flex items-center gap-3">


                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))}
                            className={`w-14 border border-foreground/20 h-6 rounded-full flex items-center p-1 transition-colors duration-300
                         ${initialVals?.isFeatured ? "bg-green-500" : initialVals?.isFeatured == false ? "bg-gray-400" : ""}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full border shadow-md transform transition-transform duration-300
                        ${initialVals?.isFeatured ? "translate-x-8" : initialVals?.isFeatured == false ? "translate-x-0" : "translate-x-4"}`}
                            ></div>
                        </button>

                        <button
                            onClick={() => setinitialVals((prev) => ({ ...prev, isFeatured: null }))}
                            className={`rounded-full flex items-center  ${initialVals?.isFeatured == null ? "bg-green-500 text-white" : "bg-primary-foreground "} text-sm font-medium p-1 px-3 border border-foreground/10 transition-colors duration-300`}
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

export default ProductFilter
