import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import Head from "../../components/Head";
import CategoryList from "../../components/seller/CategoryList";
import CreateNewCategory from "../../components/seller/CreateNewCategory";
import DeshboardSidebar from "../../components/seller/DeshboardSidebar";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import PageListButton from "../../components/seller/Pagination";

export default function CategoryListPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [cookie] = useCookies(["token"]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [query, setQuery] = useState<string>("");
  const [totalCategories, setTotalCategories] = useState(0);

  const handleQuery = (e: any) => {
    e.preventDefault();
    setPage(0);
    fetch();
  };

  const fetch = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/seller/category/?query=${query}&page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token ? cookie.token : ""}`,
          },
        }
      )
      .then((res) => {
        const cats: any[] = res.data.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          imageUrl: !!cat.imageFileName
            ? `${process.env.REACT_APP_API_URL}/resource/load-image/category/${cat.imageFileName}`
            : null,
        }));
        setCategories([...cats]);
        setTotalCategories(res.data.total);
      });
  };

  const handleViewPageButton = (p: number) => {
    if (p === page) return;
    setPage(p);
  };

  useEffect(() => {
    fetch();
  }, [page]);

  return (
    <>
      <Head title={"Category"} />
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
                  onChange={(e) => setQuery(e.target.value)}
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
            <CreateNewCategory
              refetch={() => {
                fetch();
              }}
            />
          </Flex>
          <CategoryList
            categories={categories}
            refetch={fetch}
          />
          <PageListButton
            total={totalCategories}
            size={size}
            handlePage={handleViewPageButton}
          />
        </Stack>
      </DeshboardSidebar>
    </>
  );
}
