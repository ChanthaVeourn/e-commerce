import { Box, Flex, Input, Stack } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import Head from "../../components/Head";
import CreateNewProduct from "../../components/seller/CreateNewProduct";
import DeshboardSidebar from "../../components/seller/DeshboardSidebar";
import Example from "../../components/seller/Pagination";
import ProductList from "../../components/seller/ProductList";

export default function ProductListPage() {
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
            <form>
              <Flex flexDir={"row"}>
                <Input
                  w="max"
                  placeholder="Filter by name"
                  borderRightRadius={0}
                />
                <Box
                  as={"button"}
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
            <CreateNewProduct/>
          </Flex>
          <ProductList />
        </Stack>
        <Example/>
      </DeshboardSidebar>
    </>
  );
}
