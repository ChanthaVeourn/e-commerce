import { Box, Flex, Input, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BiSearch } from "react-icons/bi";
import Head from "../../components/Head";
import CreateNewProduct from "../../components/seller/CreateNewProduct";
import DeshboardSidebar from "../../components/seller/DeshboardSidebar";
import PageListButton from "../../components/seller/Pagination";
import ProductList from "../../components/seller/ProductList";

export default function ProductListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [query, setQuery] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState(0);

  const handleQuery = (e: any) => {
    e.preventDefault();
    setPage(0);
    fetch();
  };

  const fetch = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/customer/view-product/search?query=${query}&page=${page}&size=${size}`
      )
      .then((res) => {
        const pros: any[] = res.data.data.map((pro: any) => ({
          id: pro.id,
          name: pro.name,
          image:
            pro.images.length !== 0
              ? `${process.env.REACT_APP_API_URL}/resource/load-image/product/${pro.images[0]}`
              : null,
          qty: pro.qty,
          price: pro.price,
        }));
        setProducts([...pros]);
        setTotalProducts(res.data.total);
      });
  };

  const handleViewPageButton = (p: number) => {
    if (p === page) return;
    setPage(p);
  };

  useEffect(() => {
    fetch();
  }, [page, ]);

  return (
    <>
      <Head title={"Product"} />
      <DeshboardSidebar>
        <Stack minW="max" position="relative">
          <Flex
            backdropFilter={"revert"}
            mt={8}
            minW="max"
            flexDir={"row"}
            justifyContent="space-between"
            align={"center"}
          >
            <form onSubmit={handleQuery}>
              <Flex flexDir={"row"}>
              <Input
                  w="max"
                  placeholder="Filter by name"
                  borderRightRadius={0}
                  onChange={(e) => (setQuery(e.target.value))}
                  formNoValidate
                />
                <Box
                  as="button"
                  type="submit"
                  className={
                    "bg-orange-400 hover:bg-orange-300 dark:bg-orange-200 flex justify-center items-center rounded-r-lg"
                  }
                  w={"14"}
                  h={"10"}
                >
                  <BiSearch size={25} />
                </Box>
              </Flex>
            </form>
            <CreateNewProduct refetch={fetch}/>
          </Flex>
          <ProductList
            products={products}
            refetch={fetch}
          />
        </Stack>
        <PageListButton
          total={totalProducts}
          size={size}
          handlePage={handleViewPageButton}
        />
      </DeshboardSidebar>
    </>
  );
}
