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
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import CreateNewProduct from "./CreateNewProduct";

export type Product = {
  id: number;
  name: string;
  qty: number;
  price: number;
  image: string;
};

const ProductList: React.FC<{ products: Product[]; refetch: VoidFunction }> = ({
  products,
  refetch,
}) => {
  const colorMode = useColorMode();

  return (
    <Container padding={0}  minW="max">
      {products ? (
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
                Quantity
              </Th>
              <Th
                bg={colorMode.colorMode === "dark" ? "gray.600" : "orange.200"}
                fontFamily={"mono"}
                top={0}
                position="sticky"
                fontSize="md"
              >
                Unit Price
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
            {products.map((pro: Product, key: number) => (
              <Tr key={pro.id}>
                <Td>{key + 1}</Td>
                <Td>
                  <Image
                    src={pro.image}
                    fallbackSrc="../logo.png"
                    alt=""
                    borderRadius="lg"
                    w={[50, 120]}
                    h={[30, 90]}
                  />
                </Td>
                <Td>{pro.name}</Td>
                <Td>{pro.qty}</Td>
                <Td>{pro.price}</Td>
                <Td isNumeric>
                  <Flex gap={3}>
                    <Link to={`/seller/products/detail?id=${pro.id}`}>
                      <Button>Detail</Button>
                    </Link>
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
              No Product
            </Text>
            <CreateNewProduct refetch={refetch} />
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
