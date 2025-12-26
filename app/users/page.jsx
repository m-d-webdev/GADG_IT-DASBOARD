"use client"
import { GET_PRODUCTS } from "@/api/Products";
import CustomTable2 from "@/Components/Global/CustomTable";
import { useEffect, useState } from "react";
import CheckBoxinput from "@/Components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/Components/ui/table";
import ProductSortBy from "@/Components/Popups/ProductSortBy";
import { GET_USERS } from "@/api/Users";
import moment from "moment";
import MoreOptionsUser from "@/Components/Popups/MoreOptionsUser";
import CopyButton from "@/Components/ui/CopyButton";
import UserSortBy from "@/Components/Popups/UserSortBy";
import UserFilters from "@/Components/Popups/UserFilters";


const ListProds = () => {
  const [isLoading, setLoading] = useState(false);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [users, setusers] = useState([]);
  const [TotalPages, setTotalPages] = useState([]);
  const [filters, setFilters] = useState(
    {
      page: 1,
      limit: 10,
      search: null,
      role: null,
      isActive: null,
      sortBy: "createdAt:desc",
    }
  );



  const [selections, setselections] = useState([])
  const handleSelectAll = () => {
    if (!users?.some(p => !selections.includes(p._id))) {
      setselections([])
    } else {

      setselections(users?.map(p => p._id))
    }
  }

  const GetUsers = async () => {
    setLoading(true)
    const res = await GET_USERS({ ...filters });
    setusers(res.data);
    setTotalPages(res.pages);
    setLoading(false)
  }

  useEffect(() => {
    GetUsers();
    setselections([])

  }, [filters]);


  const headers = [
    <div className="flex  pl-3 w-fit items-center justify-center gap-2">
      <CheckBoxinput
        checked={!users.some(p => !selections.includes(p._id)) && users.length > 0}
        onClick={handleSelectAll}
      />
      <p className="tracking-tight">Full Name</p>
    </div>,
    <p className="tracking-tight">Email</p>,
    <p className="tracking-tight">Phone</p>,
    <p className="tracking-tight">Joined at</p>,
    <p className="tracking-tight">Role</p>,
    <p className="tracking-tight">is active</p>,
    <p className="tracking-tight">Actions</p>,
  ];

  let rows = users.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/2 " : ""}`} key={idx}>
      <TableCell className={"flex truncate  items-center gap-3  pl-5"}>

        <CheckBoxinput
          checked={selections.includes(i._id)}
          onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
        />
        <div className="p-[1] border border-foreground/40 rounded-full">
          <img src={i.avatar} className="w-[30] min-w-[30]  h-[30] object-cover object-top rounded-full" alt="" />
        </div>
        <p className="font-semibold flex items-start gap-2  truncate">

          {i.name}
          <CopyButton text={i.name} />
        </p>
      </TableCell>
      <TableCell><b className="flex items-start gap-1">{i.email} <CopyButton text={i.email} /></b> </TableCell>
      <TableCell><b className="flex items-start gap-1">{i.phone ?? "null"} <CopyButton text={i.phone} /></b> </TableCell>
      <TableCell>{moment(i.createdAt).format("dd DD/MM/YYY")} </TableCell>
      <TableCell>
        <p>{i.role}</p>
      </TableCell>

      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${i.isActive ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-3`}>
          {i.isActive == true ? "active" : "inactive"}
        </p>
      </TableCell>


      <TableCell className={"flex items-center gap-2 w-fit pl-5"}>

        <MoreOptionsUser
          user={i}
          refreshProds={() => { GetUsers() }}
          setProdInactive={(isrue) => {
            setusers(pv => pv.map(prod => prod._id == i._id ? { ...prod, isActive: isrue } : prod))
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
        hrefWhenClickAdd="/addUser"
        pageTitle="Users"
        filterPopup={<UserFilters
          filters={filters}
          reset={() => { }}
          setFilters={setFilters}
          onClose={() => setFitlerOpen(false)}
        />}
        setFitlerOpen={setFitlerOpen}
        isFitlerOpen={filterPopupOpen}
        setSortByOpen={setSortByOpen}
        isSortByOpen={sortByPopupOpen}
        sortByPopup={
          <UserSortBy
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
