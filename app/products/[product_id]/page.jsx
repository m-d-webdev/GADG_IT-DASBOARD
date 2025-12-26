import UpdateProductPage from "@/Components/client/UpdateProductpage"

const page = async ({ params }) => {
  const { product_id } = await params;
   return (
    <>
      <UpdateProductPage product_id={product_id} />
    </>
  )
}

export default page
