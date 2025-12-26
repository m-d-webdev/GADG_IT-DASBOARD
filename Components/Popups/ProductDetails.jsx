import React, { useState } from "react";
import Dialog from "../Global/Dialog";
import Link from "next/link";
import { Edit, Edit2 } from "lucide-react";

export default function ProductPopup({ product, onClose }) {
    const [selectedImage, setSelectedImage] = useState(
        product?.images?.[0] || ""
    );
    const [selectedColor, setSelectedColor] = useState(
        product?.colors?.[0] || null
    );

    if (!product) return null;

    const price = product.price;
    const original = product.originalPrice;
    const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

    return (
        <Dialog
            onClose={onClose}
            containerClassName="max-w-[600] text-wrap  overflow-x-hidden"
        >


            {/* header */}
            <div className="flex items-start  justify-between p-4 border-b">
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category?.name}</p>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="ml-4 rounded-md p-2 hover:bg-gray-100"
                >
                    ✕
                </button>
            </div>

            {/* body */}
            <div className="p-4  mt-4 w-full gap-4">
                {/* images */}
                <div className="flex flex-col gap-3">
                    <div className="rounded-lg bg-gray-50 flex items-center justify-center h-64">
                        {selectedImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="max-h-[240px] object-contain"
                            />
                        ) : (
                            <div className="text-gray-400">No image</div>
                        )}
                    </div>

                    <div className="flex gap-2 overflow-x-auto">
                        {product.images?.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(img)}
                                className={`flex-shrink-0 rounded-md p-1 border ${selectedImage === img ? "border-gray-800" : "border-transparent"
                                    }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img}
                                    alt={`thumb-${i}`}
                                    className="h-16 w-16 object-cover rounded"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* details */}
                <div className=" mt-10 max-w-full gap-3">
                    <p className="text-wrap max-">{product.description}</p>

                    <div className="flex mt-4 items-baseline gap-3">
                        <div className="text-2xl font-bold">${price}</div>
                        {original && original !== price && (
                            <div className="text-sm text-gray-500 line-through">${original}</div>
                        )}
                        {hasDiscount && (
                            <div className="ml-auto text-sm font-medium text-green-600">
                                -{product.discountPercentage}%
                            </div>
                        )}
                    </div>

                    <div>
                        <h4 className="text-sm mt-4 font-medium mb-2">Colors</h4>
                        <div className="flex items-center gap-2">
                            {product.colors?.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    title={c}
                                    className={`h-8 w-8 border border-foreground/20 rounded-full  flex items-center justify-center focus:outline-none`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex mt-4 items-center justify-between mt-2">
                        <div className=" ">Stock: <b>{product.stock}</b></div>
                        <div className=" ">Rating: {product.rating} ({product.numReviews})</div>
                    </div>
                    <div className="mt-3">
                        <h5 className="text-sm font-medium">Tags</h5>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {
                                product.tags?.map((t) => (
                                    <span key={t} className="text-xs px-2 py-1 bg-background border border-foreground/10 rounded-md">{t.trim()}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className=" text-xs  mt-5">Added: {new Date(product.createdAt).toLocaleString()}</div>
                </div>
            </div>

            {/* footer */}
            <div className="flex items-center justify-end gap-2 p-4 border-t">
                <Link
                    href={`/products/${product._id}`}
                    onClick={onClose}
                    className="rounded-md flex items-center gap-2 border border-foreground/10 bg-chart-1 text-white px-4 py-2 "
                >
                    <Edit className="w-4 h-4 stroke-1" />
                    Edit
                </Link>
                <button
                    onClick={onClose}
                    className="rounded-md border border-foreground/10 bg-background px-4 py-2 hover:bg-gray-100"
                >
                    Close
                </button>
            </div>
        </Dialog>

    );
}
