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
import DeleteProduct from "./DeleteProduct";
import UpdateProductImage from "./UpdateProductImage";
import DeleteProductImage from "./DeleteProductImage";

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
}> = ({ id, name, qty, price, description, categories, images, refetch }) => {
  const colorMode = useColorMode();
  return (
    <>
      <Head title={"Product Detail"} />
      <Heading textAlign="center" my={5}>
        Product Detail
      </Heading>
      <Flex
        p="6"
        rounded="md"
        className="max-sm:flex-col flex-row gap-5 justify-evenly"
        gap={10}
      >
        <div className="basis-1/2">
          <div className="">
            <Text
              className="text-center max-sm:max-w-[30ch] max-w-[50ch] min-w-[30ch]"
              fontWeight={"bold"}
              fontSize={["lg", "xl"]}
            >
              {name}
            </Text>
            <Text fontSize={["lg", "xl"]} className="mt-3">
              <b>Price:</b> {price}$
            </Text>
            <Text fontSize={["lg", "xl"]}  mt={3}>
              <b>Stock:</b> {qty}
            </Text>
            <Text fontWeight="bold" fontSize={["lg", "xl"]}  mt="3">
              Categories:
            </Text>
            <List>
              {categories?.map((cat) => (
                <ListItem paddingLeft={5} fontSize={["md", "lg"]} key={cat.id}>
                  . {cat.name}
                </ListItem>
              ))}
            </List>
          </div>
          <div className="">
            <Text
              fontWeight="bold"
              fontSize={["sm", "md"]}
              mt={3}
              className={""}
            >
              Description
            </Text>
            <Text paddingLeft={5} className="max-sm:max-w-[40ch] max-w-[50ch] min-w-[40ch]"  fontSize={["xs", "sm"]}>
              {description}
            </Text>
            <Flex mt="5" justifyContent="space-evenly">
              <UpdateProduct refetch={refetch} />
              <DeleteProduct id={id} />
            </Flex>
          </div>
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
                <Box key={key} position="relative">
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
                  <DeleteProductImage filename={img} refetch={refetch} />
                  <UpdateProductImage filename={img} refetch={refetch} />
                </Box>
              ))}
            </Grid>
          ) : (
            "No Image to load. Please Upload Images."
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetailSeller;
