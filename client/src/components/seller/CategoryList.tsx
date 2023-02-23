import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Box,
  Image,
  Text,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { ImBin } from "react-icons/im";
import { useQuery } from "react-query";
import CreateNewCategory from "./CreateNewCategory";
import UpdateCategory from "./UpdateCategory";

const CategoryList: React.FC = () => {
  const [cookie] = useCookies(["token"]);
  const colorMode = useColorMode();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/seller/category/dropdown?page=0&size=40`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token ? cookie.token : ""}`,
          },
        },
      );
      return res.data;
    },
  });

  const categories = !categoriesQuery.data
    ? null
    : categoriesQuery.data.data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        imageUrl: !!cat.imageFileName
          ? `${process.env.REACT_APP_API_URL}/resource/load-image/category/${cat.imageFileName}`
          : null ,
      }));

  return (
    <Container padding={0} mx="auto" minW="max">
      {categories ? (
        <Table size="lg" boxShadow="xs" rounded="md">
          <Thead borderRadius={5}>
            <Tr className="dark:text-white text-gray-800">
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                #
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Image
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Category Name
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Total Items
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((cat: any, key: number) => (
              <Tr key={key}>
                <Td>{key + 1}</Td>
                <Td>
                  <Image
                    src={cat.imageUrl}
                    fallbackSrc="../logo.png"
                    alt=""
                    borderRadius="lg"
                    w={[50, 120]}
                    h={[30, 90]}
                  />
                </Td>
                <Td>{cat.name}</Td>
                <Td>103</Td>
                <Td isNumeric>
                  <Flex gap={3}>
                    <UpdateCategory refetch={() => {window.location.reload()}} {...cat} />
                    <ImBin size={20} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
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
            <CreateNewCategory refetch={() => {}} />
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default CategoryList;
