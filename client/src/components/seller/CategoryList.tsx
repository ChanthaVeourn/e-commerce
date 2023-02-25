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
import React from "react";
import CreateNewCategory from "./CreateNewCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";

type Category = {
        id: number,
        name: string,
        imageUrl: string | null
}

const CategoryList: React.FC<{categories: Category[], refetch: VoidFunction}> = ({categories, refetch}) => {
  const colorMode = useColorMode();

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
              <Tr key={cat.id}>
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
                    <UpdateCategory refetch={refetch} {...cat} />
                    <DeleteCategory refetch={refetch} {...cat}/>
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
            <CreateNewCategory refetch={refetch} />
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default CategoryList;
