"use client"
import { useState, useRef, useEffect } from "react";
import {
    PlusCircleIcon,
    PhotoIcon,
    TrashIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import CategorySelect from "@/Components/Global/CategorisInput";
import axiosInstance from "@/api/axios";
import { UpdateProduct } from "@/api/Products";

export default function UpdateProductPage({ product_id }) {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        originalPrice: 0,
        colors: [],
        images: [],
        isFeatured: false,
        isActive: true,
        tags: [],
    });

    const [newImages, setNewImages] = useState([]);
    const [RemovedImages, setRemovedImages] = useState([]);

    const [colorInput, setColorInput] = useState("");
    const fileRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleUpdate = (k, v) => {
        setData(pv => ({ ...pv, [k]: v }))
    }

    // ------------------

    const initProd = async () => {
        setNewImages([])
        setRemovedImages([])
        setLoading(true)
        const res = await axiosInstance.get(`/product/${product_id}`)
        setData({
            ...res.data,
            category: res.data.category._id,
            images: res.data.images.map((im, i) => ({ url: im, isMain: i == 0 })),
            tags: res.data.tags.join(",")
        })
        setLoading(false)
    }
    useEffect(() => {
        initProd()
    }, [])


    // Convert File -> object with preview url
    const handleFiles = (files) => {
        const list = Array.from(files).map((file) => ({
            file,
            url: URL.createObjectURL(file),
            isMain: false,
        }));
        // if no main yet, set first as main
        if (!data.images.length && list.length) list[0].isMain = true;
        setNewImages(pv => [...pv, ...list])
        setData((prev) => ({ ...prev, images: [...prev.images, ...list] }));
    };

    const onFileChange = (e) => {
        handleFiles(e.target.files);
        e.target.value = "";
    };

    const removeImage = (index, url) => {
        if (!newImages.some(im => im.url == url)) {
            setRemovedImages(pv => [...pv, url]);
        }
        else {
            setNewImages(pv => pv.filter(img => img.url != url))
        }

        setData((prev) => {
            const next = [...prev.images];
            // revoke url to free memory
            URL.revokeObjectURL(next[index].url);
            next.splice(index, 1);
            if (!next.some((i) => i.isMain) && next.length) next[0].isMain = true;
            return { ...prev, images: next }
        });
    };

    const pickMain = (index) => {
        setData((prev) => ({ ...prev, images: prev.images.map((img, i) => ({ ...img, isMain: i === index })) }));
    };

    const addColor = () => {
        const val = colorInput.trim();
        if (!val) return;
        // simple normalize (allow hex or name)
        if (!data.colors.includes(val)) {
            setData((prev) => ({ ...prev, colors: [...prev.colors, val] }));
            setColorInput("");
        }
    };

    const removeColor = (idx) => {
        setData((prev) => ({ ...prev, colors: prev.colors.filter((_, i) => i != idx) }));
    };

    const validate = () => {
        if (!data.name.trim()) return "Product title is required";
        if (!data.price || Number(data.price) <= 0) return "Price must be greater than 0";
        if (!data.images.length) return "Please upload at least one image";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        console.log({
            newImages,
            RemovedImages
        });
        if (err) {
            alert(err);
            return
        }

        setLoading(true);

        try {
            // Prepare payload
            const tags = data.tags.split(",")
            const payload = {
                ...data, images: [], tags, RemovedImages

            }

            const FORM_D = new FormData();
            console.log({ payload });
            if (newImages.length > 0) {
                newImages.forEach(img => {
                    FORM_D.append("images", img.file);
                });

            }
            // Add non-file fields here too
            Object.keys(payload).forEach(key => {

                if (key !== "images") {
                    FORM_D.append(key, JSON.stringify(payload[key]));
                }

            });
            const res = await UpdateProduct({ props: FORM_D, _id: data._id });
            if (res.failed) {
                throw new Error("Server error");
            }
            else {
                initProd()
            }
        } catch (err) {
            console.error(err);
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-8xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Update Product</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Images + thumbnails */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="border rounded-lg p-4 bg-background shadow-sm">
                        <label className="block text-sm font-medium mb-2">Product Images</label>

                        {/* Main preview */}
                        <div className="w-full h-80 rounded-lg border border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                            {data.images?.length ? (
                                <img
                                    src={data.images.find(i => i.isMain)?.url}
                                    alt="main"
                                    className="object-contain w-full h-full"
                                />
                            ) : (
                                <div className="text-center text-sm text-gray-400">
                                    <PhotoIcon className="w-10 h-10 mx-auto mb-2" />
                                    No image - upload one
                                </div>
                            )}
                        </div>

                        {/* thumbnails */}
                        <div className="mt-3 grid grid-cols-4 gap-2">
                            {data.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`relative rounded-md border ${img.isMain ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"} overflow-hidden`}
                                >
                                    <img src={img.url} alt={img.url} className="w-full h-20 object-cover" />
                                    <div className="absolute top-1 right-1 flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => pickMain(idx)}
                                            title="Set main"
                                            className="p-1 bg-background rounded-md shadow-sm hover:bg-gray-50"
                                        >
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx, img.url)}
                                            title="Remove"
                                            className="p-1 bg-background rounded-md shadow-sm hover:bg-gray-50"
                                        >
                                            <TrashIcon className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* add more */}
                            <label className="flex items-center justify-center rounded-md border border-dashed border-gray-200 h-20 cursor-pointer hover:bg-gray-50">
                                <input
                                    ref={fileRef}
                                    onChange={onFileChange}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                                <div className="text-center text-sm text-gray-500">
                                    <PlusCircleIcon className="w-6 h-6 mx-auto mb-1" />
                                    Add
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Middle: Basic product info */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-background p-4 rounded-lg border shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium">Product Title</label>
                                <input
                                    value={data.name}
                                    onChange={(e) => handleUpdate("name", e.target.value)}
                                    className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="Red Gaming Chair..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Price (MAD)</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => handleUpdate("price", e.target.value)}
                                    className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="90.00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Old Price (optional)</label>
                                <input
                                    type="number"
                                    value={data.originalPrice}
                                    onChange={(e) => handleUpdate("originalPrice", e.target.value)}
                                    className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="100.00"
                                />
                            </div>

                            <div>

                                <label className="block text-sm font-medium">Stock</label>
                                <div className="mt-1 flex items-center gap-2">
                                    <button type="button"
                                        onClick={() => setData((prev) => ({ ...prev, stock: prev.stock - 1 > 0 ? prev.stock - 1 : 1 }))}
                                        className="px-3 py-1 rounded border"
                                    >
                                        -
                                    </button>
                                    <div className="px-4 py-1 border rounded">{data.stock}</div>
                                    <button type="button"
                                        onClick={() => setData((prev) => ({ ...prev, stock: prev.stock + 1 }))}
                                        className="px-3 py-1 rounded border">+</button>
                                </div>

                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => handleUpdate("description", e.target.value)}
                                rows="5"
                                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Write a short description..."
                            />
                        </div>

                        {/* Colors */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Colors</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    onChange={(e) => setColorInput(e.target.value)}
                                    placeholder="#ff0000 or red"
                                    className="w-[100] p-1 rounded-2xl h-[50] border "
                                />
                                <button type="button" disabled={colorInput == ""} onClick={addColor} className="px-3 disabled:opacity-50 py-1 rounded-md border bg-background hover:bg-gray-50">Add color</button>
                            </div>

                            <div className="mt-3 flex items-center gap-2 flex-wrap">
                                {data.colors.map((c, idx) => (
                                    <div key={idx} className="flex items-center gap-2 border rounded-full px-2 py-1">
                                        <span className="w-5 h-5 rounded-full" style={{ background: c }}></span>
                                        <span className="text-sm">{c}</span>
                                        <button onClick={() => removeColor(idx)} type="button" className="p-1">
                                            <TrashIcon className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    {/* SEO / Extra options panel */}
                    <div className="bg-background p-4 rounded-lg border shadow-sm">
                        <h3 className="font-medium mb-3">Extra</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium">Category (optional)</label>
                                <CategorySelect value={data.category} onChange={c => setData(prev => ({ ...prev, category: c }))} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">SKU / Code</label>
                                <input placeholder="SKU-001" className="mt-1 block w-full border rounded-md px-3 py-2" />
                            </div>

                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-sm font-medium">Tags ( separated by <b className="text-xl">,</b>  )</label>
                            <textarea
                                value={data.tags}
                                onChange={(e) => handleUpdate("tags", e.target.value)}
                                rows="5"
                                className="mt-1 block h-[100] w-full border  rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Write a short description..."
                            />
                        </div>
                        <div className=" mt-4">
                            <label className="block mb-2 text-sm font-medium">Is active</label>

                            <button
                                onClick={() => setData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                                className={`w-14 h-6 rounded-full flex items-center p-1 transition-colors duration-300
              ${data.isActive ? "bg-green-500" : "bg-gray-400"}`}
                            >
                                <div
                                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                ${data.isActive ? "translate-x-8" : "translate-x-0"}`}
                                ></div>
                            </button>

                        </div>
                    </div>


                    <div className="mt-6 flex items-center gap-3">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-4 w-[200] py-2 bg-chart-1 text-white font-medium  text-backbg-background rounded-md hover:bg-pink-700 transition"
                        >
                            {loading ? "Saving..." : "Update Product"}
                            <i className="bi ml-2 bi-send-check"></i>
                        </button>
                    </div>

                </div> {/* end middle */}
            </div >
        </div >
    );
}
