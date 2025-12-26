"use client"
import { GET_PRODUCTS } from "@/api/Products";
import CustomTable2 from "@/Components/Global/CustomTable";
import LoaderTable from "@/Components/Global/LoaderTable"
import { useEffect, useState } from "react";
import moment from "moment";
import CheckBoxinput from "@/Components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import ProductFilter from "@/Components/Popups/ProductFilters";
import ProductSortBy from "@/Components/Popups/ProductSortBy";
import MoreOptionsProduct from "@/Components/Popups/MoreOptionsProduct";

const NEXT_PUBLIC_API_LINK = process.env.NEXT_PUBLIC_API_LINK;

const ListProds = () => {
  const [isLoading, setLoading] = useState(false);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [TotalPages, setTotalPages] = useState([]);
  const [filters, setFilters] = useState(
    {
      page: 1,
      limit: 10,
      category: null,
      price: null,
      minPrice: null,
      maxPrice: null,
      search: null,
      inStock: null,
      isActive: null,
      isFeatured: null,
      sortBy: "createdAt:desc",
    }
  );



  const [selections, setselections] = useState([])
  const handleSelectAll = () => {
    if (!products.some(p => !selections.includes(p._id))) {
      setselections([])
    } else {

      setselections(products.map(p => p._id))
    }
  }

  const GetProds = async () => {
    setLoading(true)
    const res = await GET_PRODUCTS({ ...filters });
    setProducts(res.data);
    setTotalPages(res.pages);
    setLoading(false)
  }

  useEffect(() => {
    GetProds();
    setselections([])

  }, [filters]);


  const headers = [
    <div className="flex  pl-3 w-fit items-center justify-center gap-2">
      <CheckBoxinput
        checked={!products.some(p => !selections.includes(p._id)) && products.length > 0}
        onClick={handleSelectAll}
      />
      <p className="tracking-tight">Product</p>
    </div>,
    <p className="tracking-tight">Price </p>,
    <p className="tracking-tight">Original price</p>,
    <p className="tracking-tight">Sales</p>,
    <p className="tracking-tight">Stock</p>,
    <p className="tracking-tight">Status</p>,
    <p className="tracking-tight">Colors</p>,
    <p className="tracking-tight">is active</p>,
    <p className="tracking-tight">Actions</p>,
  ];

  let rows = products.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/2 " : ""}`} key={idx}>
      <TableCell className={"flex truncate  items-center gap-3  pl-5"}>

        <CheckBoxinput
          checked={selections.includes(i._id)}
          onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
        />
        <p className="max-w-[200] truncate">

          {i.name}
        </p>
      </TableCell>
      <TableCell><b className="font-medium">{i.price}</b> <span className="opacity-60 ml-[1] text-xs"> MAD</span></TableCell>
      <TableCell><b className="font-medium">{i.originalPrice}</b> <span className="opacity-60 ml-[1] text-xs"> MAD</span></TableCell>
      <TableCell>00 <span className="opacity-60 ml-1 text-xs"> item</span></TableCell>
      <TableCell>{i.stock} <span className="opacity-60 ml-1 text-xs"> item</span></TableCell>
      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${parseFloat(i.stock) > 10 ? "bg-green-100/50 text-[#009e18] border-green-500" : (parseFloat(i.stock) > 0 ? "bg-[#ffdd533c] text-[#b08d01] border-[#d3a900]" : "bg-red-100/50 text-[#d40000] border-red-400 ")} border rounded-2xl px-2`}>
          {parseFloat(i.stock) > 10 ? "in stock" : (parseFloat(i.stock) > 0 ? "low stock" : "out of stock")}
        </p>
      </TableCell>
      <TableCell><div className="flex flex-wrap gap-1">
        {i.colors?.map(c => <span key={c} style={{ backgroundColor: c }} className="w-[20] h-[20] border border-foreground/50 rounded-full"></span>)}
      </div>
      </TableCell>
      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${i.isActive ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-3`}>
          {i.isActive == true ? "active" : "inactive"}
        </p>
      </TableCell>


      <TableCell className={"flex items-center gap-2 w-fit pl-5"}>

        <MoreOptionsProduct
          product={i}
          refreshProds={() => { GetProds() }}
          setProdInactive={(isrue) => {
            setProducts(pv => pv.map(prod => prod._id == i._id ? { ...prod, isActive: isrue } : prod))
          }}
          setProdFeature={(isrue) => {
            setProducts(pv => pv.map(prod => prod._id == i._id ? { ...prod, isFeatured: isrue } : prod))
          }}
        />
      </TableCell>
    </TableRow>
  );

  return (

    <>
      <CustomTable2
        headers={headers}
        rows={rows}
        isLoading={isLoading}
        hrefWhenClickAdd="/addProduct"
        pageTitle="Products"
        filterPopup={
          <ProductFilter
            reset={() => {
              setFilters(
                {
                  page: filters.page,
                  limit: filters.limit,
                  category: null,
                  price: null,
                  minPrice: null,
                  maxPrice: null,
                  search: filters.search,
                  inStock: null,
                  featured: null,
                  isActive: true,
                })
            }}
            filters={filters}
            setFilters={setFilters}
            onClose={() => setFitlerOpen(false)}
          />
        }
        setFitlerOpen={setFitlerOpen}
        isFitlerOpen={filterPopupOpen}

        setSortByOpen={setSortByOpen}
        isSortByOpen={sortByPopupOpen}
        sortByPopup={
          <ProductSortBy
            setSortBy={l => setFilters(pv => ({ ...pv, sortBy: l }))}
            sortBy={filters.sortBy}
            onClose={() => setSortByOpen(false)}
          />
        }
        originalSearch={filters.search}
        onSearch={(s) => setFilters(pv => ({ ...pv, search: s }))}
        currentPage={filters.page}
        totalePages={TotalPages}
        limit={filters.limit}

        setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
        setPage={p => setFilters(pv => ({ ...pv, page: p }))}
      />
    </>

  )
}

export default ListProds
