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
import { FiMoreVertical } from "react-icons/fi";
import { useQuery } from "react-query";
import CreateNewProduct from "./CreateNewProduct";

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
        }
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
          : "../logo.png",
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
                Product Title
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Category
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Qty
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              ></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>
                <Image
                  src=""
                  alt=""
                  borderRadius="lg"
                  w={[50, 120]}
                  h={[30, 90]}
                />
              </Td>
              <Td>Men Shoes</Td>
              <Td>Shoes</Td>
              <Td>130</Td>
              <Td isNumeric>
                <Flex gap={3}>
                  <p>View Detail </p>
                  <FiMoreVertical size={20}/>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>
                <Image
                  src=""
                  alt=""
                  borderRadius="lg"
                  w={[50, 120]}
                  h={[30, 90]}
                />
              </Td>
              <Td>Men Shoes</Td>
              <Td>Shoes</Td>
              <Td>130</Td>
              <Td isNumeric>
                <Flex gap={3}>
                  <p>View Detail </p>
                  <FiMoreVertical size={20}/>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>
                <Image
                  src=""
                  alt=""
                  borderRadius="lg"
                  w={[50, 120]}
                  h={[30, 90]}
                />
              </Td>
              <Td>Men Shoes</Td>
              <Td>Shoes</Td>
              <Td>130</Td>
              <Td isNumeric>
                <Flex gap={3}>
                  <p>View Detail </p>
                  <FiMoreVertical size={20}/>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>
                <Image
                  src=""
                  alt=""
                  borderRadius="lg"
                  w={[50, 120]}
                  h={[30, 90]}
                />
              </Td>
              <Td>Men Shoes</Td>
              <Td>Shoes</Td>
              <Td>130</Td>
              <Td isNumeric>
                <Flex gap={3}>
                  <p>View Detail </p>
                  <FiMoreVertical size={20}/>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>
                <Image
                  src=""
                  alt=""
                  borderRadius="lg"
                  w={[50, 120]}
                  h={[30, 90]}
                />
              </Td>
              <Td>Men Shoes</Td>
              <Td>Shoes</Td>
              <Td>130</Td>
              <Td isNumeric>
                <Flex gap={3}>
                  <p>View Detail </p>
                  <FiMoreVertical size={20}/>
                </Flex>
              </Td>
            </Tr>
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
              No Product
            </Text>
            <CreateNewProduct />
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default CategoryList;
