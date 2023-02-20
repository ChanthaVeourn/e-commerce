import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Image,
  Tr,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
import Head from "../../components/Head";
import CreateNewCategory from "../../components/seller/CreateNewCategory";
import DeshboardSidebar from "../../components/seller/DeshboardSidebar";

export default function Test() {
  return (
    <>
      <Head title={"test"} />
      <Flex>
        <DeshboardSidebar />
        <Box className="w-5/6">
          <Box marginTop={"10vh"} marginX={20}>
            <Flex
              flexDir={"row"}
              align={"center"}
              className={"w-full"}
              justify={"space-between"}
            >
              <Box>
                <Flex flexDir={"row"} align={"center"}>
                  <Flex flexDir={"row"}>
                    <Input w={"50"} />
                    <Box
                      as={"button"}
                      className={
                        "bg-orange-400 hover:bg-orange-300 dark:bg-orange-200 flex justify-center items-center rounded-r-lg"
                      }
                      w={"14"}
                      h={"10"}
                    >
                      <BiSearch size={25} />
                    </Box>
                  </Flex>
                  <Flex flexDir={"row"} marginX={20}>
                    <Box>
                      <Button variant="outline">Filters</Button>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              <Box>
                <CreateNewCategory />
              </Box>
            </Flex>
          </Box>
          <Box marginX={20} marginTop={"5vh"}>
            <Table size='lg'boxShadow='xs' p='6' rounded='md'>
              <Thead >
                <Tr>
                  <Th  fontSize='xl'>#</Th>
                  <Th  fontSize='xl'>Image</Th>
                  <Th  fontSize='xl'>Category Name</Th>
                  <Th  fontSize='xl'>Total Items</Th>
                  <Th isNumeric></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>
                    <Image
                      src="https://ae01.alicdn.com/kf/S6831ff4a77674fcd9a6e018a409dacbbT.jpg"
                      alt=""
                      borderRadius="lg"
                      w={[20, 100, 160, 200, 250]}
                      h={[
                        (20 * 2) / 3,
                        (100 * 2) / 3,
                        (160 * 2) / 3,
                        (200 * 2) / 3,
                        (260 * 2) / 3,
                      ]}
                    />
                  </Td>
                  <Td>Men Shoes</Td>
                  <Td>103</Td>
                  <Td isNumeric>
                    <Flex>
                      <Link className="p-2" to={""}>
                        <FaPencilAlt size={20} />
                      </Link>
                      <Link className="p-2" to={""}>
                        <ImBin size={20} />
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>
                    <Image
                      src="https://ae01.alicdn.com/kf/S6831ff4a77674fcd9a6e018a409dacbbT.jpg"
                      alt=""
                      borderRadius="lg"
                      w={[20, 100, 160, 200, 250]}
                      h={[
                        (20 * 2) / 3,
                        (100 * 2) / 3,
                        (160 * 2) / 3,
                        (200 * 2) / 3,
                        (260 * 2) / 3,
                      ]}
                    />
                  </Td>
                  <Td>Men Shoes</Td>
                  <Td>103</Td>
                  <Td isNumeric>
                    <Flex>
                      <Link className="p-2" to={""}>
                        <FaPencilAlt size={20} />
                      </Link>
                      <Link className="p-2" to={""}>
                        <ImBin size={20} />
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
