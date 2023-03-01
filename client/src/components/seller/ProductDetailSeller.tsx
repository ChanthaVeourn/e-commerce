import {
  Button,
  Container,
  Flex,
  Text,
  Image,
  Grid,
  Heading,
  List,
  Box,
  useColorMode,
  Input,
  ListItem,
} from "@chakra-ui/react";
import { BsTrashFill } from "react-icons/bs";
import Head from "../Head";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import UpdateProduct from "./UpdateProduct";

const ProductDetailSeller: React.FC<{
  id: number;
  name: string;
  qty: number;
  price: number;
  description: "Acer nitro 5 ";
  categories: [
    {
      id: string;
      name: string;
      imageFileName: string;
    }
  ];
  images: string[];
  refetch: VoidFunction;
}> = ({ id, name, qty, price, description, categories,images, refetch }) => {
  const colorMode = useColorMode();
  return (
    <>
      <Head title={"Product Detail"} />
      <Container mx="auto">
        <Heading textAlign="center" my={5}>
          Product Detail
        </Heading>
        <Flex p="6" rounded="md" justify={"center"}>
          <div className="basis-1/2">
            <div className="">
              <Text className="" fontWeight={"bold"} fontSize={["sm", "md"]}>
                {name}
              </Text>
              <Text fontSize={["sm", "md"]} className="mt-3">
                <b>Price:</b> {price}$
              </Text>
              <Text fontSize={["sm", "md"]} mt={3}>
                <b>Stock:</b> {qty}
              </Text>
              <Text fontWeight="bold" fontSize={["sm", "md"]} mt="3">
                Categories
              </Text>
              <List>
                {categories?.map((cat) => (
                  <ListItem
                    paddingLeft={5}
                    fontSize={["sm", "md"]}
                    key={cat.id}
                  >
                    . {cat.name}
                  </ListItem>
                ))}
              </List>
            </div>
            <Text fontSize={["md", "lg"]} mt={3}>
              Description
            </Text>
            <Text paddingLeft={5} fontSize={["sm", "md"]}>
              {description}
            </Text>
            <Flex mt="5" justifyContent="space-evenly">
            <UpdateProduct refetch={refetch} />
              <ImBin
                size="25"
                className={`text-${
                  colorMode.colorMode === "dark" ? "red-400" : "red-300"
                }`}
              />
            </Flex>
          </div>
          <Flex
            direction="column"
            className="basis-1/2"
            justifyContent="center"
            alignItems={"center"}
          >
            {!!images && images?.length > 0 ? (
              <Grid
                gridTemplateColumns={"1fr 1fr"}
                gridTemplateRows={"1fr 1fr"}
                gap="2"
                p={3}
                rounded="md"
                bg={colorMode.colorMode === "dark" ? "slategray" : "orange.100"}
              >
                {images.map((img: string, key: number) => (
                  <Box 
                  key={key} position="relative">
                    <Image
                      shadow="lg"
                      minW={100}
                      maxW={200}
                      boxSize={[100, 200]}
                      maxH={200}
                      objectFit="cover"
                      src={`${process.env.REACT_APP_API_URL}/resource/load-image/product/${img}`}
                      alt={name}
                      fallbackSrc="../../logo.png"
                      rounded="md"
                    />
                    <BsTrashFill className="absolute top-1 right-1 bg-slate-400 rounded-full p-1 hover:text-red-500" size={25}/>
                    <FaPencilAlt className="absolute top-1 right-10 bg-slate-400 rounded-full p-1 hover:text-orange-500" size={25}/>
                    </Box>
                  ))}
                </Grid>
              ) : (
                "No Image to load. Please Upload Images."
              )}
            </Flex>
          </Flex>
        </Container>
    </>
  );
};

export default ProductDetailSeller;
