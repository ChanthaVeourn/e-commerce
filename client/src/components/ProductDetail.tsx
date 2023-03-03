import {
  Button,
  Container,
  Flex,
  Text,
  Image,
  Grid,
  Heading,
} from "@chakra-ui/react";
import Head from "./Head";
import Layout from "./Layout";

type Product = {
  id: number;
  name: string;
  qty: string;
  price: number;
  description: string;
  images: string[] | any;
};

const ProductDetail: React.FC<Product> = ({
  id,
  name,
  qty,
  price,
  description,
  images,
}) => {
  return (
    <>
      <Head title={"Product Detail"} />
      <Layout>
        <Container maxW={"8xl"} mx="auto">
          <Heading textAlign="center" my={5}>
            Product Detail
          </Heading>
          <Flex
            p="6"
            rounded="md"
            justify={"center"}
            className="max-md:flex-col"
        
          >
            <Flex
              direction="column"
              className="basis-2/3 img"
              justifyContent="center"
              alignItems={"center"}
            >
              <Image
                src={
                  !!images && images?.length > 0
                    ? `${process.env.REACT_APP_API_URL}/resource/load-image/product/${images[0]}`
                    : "../logo.png"
                }
                alt={name}
                rounded="md"
                objectFit={"contain"}
                fallbackSrc="logo.png"
                w="500px"
              />
              {!!images && images?.length > 0 ? (
                <Flex direction="row" flexWrap={"wrap"} gap={2} marginTop={4}>
                  {images.map((img: string, key: number) => (
                    <Image
                      key={key}
                      minW={50}
                      boxSize={[50, 70]}
                      objectFit="cover"
                      src={`${process.env.REACT_APP_API_URL}/resource/load-image/product/${img}`}
                      alt={name}
                      fallbackSrc="../logo.png"
                      rounded="md"
                    />
                  ))}
                </Flex>
              ) : (
                ""
              )}
            </Flex>
            <div className="basis-1/3 max-md:mt-5 self-center ">
              <div className="">
                {/* <Stack direction={"column"} className="min-w-max">
                <Flex direction={"row"} justify="space-between" alignItems={"center"} className="">
                  <h5 className="mt-3">{product.data.price}$</h5>
                </Flex>
                <Text minW={[350, 600]}>
                  {product.data.name}
                </Text>
                </Stack> */}
                <Text className="max-md:text-center" fontWeight={"bold"} fontSize={["xl", "2xl"]} >
                  {name}
                </Text>
                <div className="max-md:flex">
                  <div>
                    <Text
                      fontSize={{ base: "15px", md: "15px", xl: "xl" }}
                      fontWeight={"bold"}
                      className="mt-3"
                    >
                      {price}$
                    </Text>
                    <Text fontSize="sm" className="mt-3">
                      Stock {qty}
                    </Text>
                  </div>
                  <div>
                    <Button
                      colorScheme="gray"
                      w={[100, 200]}
                      className="mt-5 mx-auto max-md:ml-10"

                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <h2 className="max-md:mt-5 mt-20 text-2xl max-md:text-center">Description</h2>
              <p className="max-md:text-center">{description}</p>
            </div>
          </Flex>
        </Container>
        {!!images && images?.length > 0 ? (
          <Container mx={"auto"} w="max">
            <Flex
              justifyContent={"center"}
              alignItems="center"
              gap={3}
              direction="column"
            >
              {images.map((img: string, key: number) => (
                <Image
                  src={`${process.env.REACT_APP_API_URL}/resource/load-image/product/${img}`}
                  alt={name}
                  minW={[200, 300]}
                  maxW={[300, 600]}
                  objectFit="cover"
                  className="rounded-md mt-5"
                  fallbackSrc="logo.png"
                  key={key}
                />
              ))}
            </Flex>
          </Container>
        ) : (
          <Container mx={"auto"} w="max">
            <Flex
              justifyContent={"center"}
              alignItems="center"
              gap={3}
              direction="column"
            >
              <Image
                src="../logo.png"
                alt={name}
                minW={[200, 300]}
                maxW={[300, 600]}
                objectFit="cover"
                className="rounded-md mt-5"
              />
            </Flex>
          </Container>
        )}

        <Container maxW={"8xl"} mb={"20"}>
          <Text className="mt-10 mb-5" fontWeight={"bold"} fontSize="3xl">
            Similar Products
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={8}></Grid>
        </Container>
      </Layout>
    </>
  );
};

export default ProductDetail;
