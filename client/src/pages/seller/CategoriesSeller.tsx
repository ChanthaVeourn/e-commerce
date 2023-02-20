import { Box, Flex, Text } from "@chakra-ui/react";

import Head from "../../components/Head";
import CreateNewCategory from "../../components/seller/CreateNewCategory";
import DeshboardSidebar from "../../components/seller/DeshboardSidebar";

export default function CategoriesSeller() {
  return (
    <>
      <Head title={"Categories"} />
      <Flex>
        <DeshboardSidebar />
        <Box className="w-5/6">
          <Flex
            flexDir={"column"}
            justify={"center"}
            alignItems={"center"}
            h="100vh "
          >
            <Text fontWeight={"bold"} fontSize="5xl" mb={5}>
              No Category
            </Text>
            <CreateNewCategory />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
