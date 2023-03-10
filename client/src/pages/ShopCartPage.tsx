import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Head from "../components/Head";
import Layout from "../components/Layout";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const throttle = (func: any, delay: number) => {
  let wait = false;
  return () => {
    if (wait) {
      return;
    }
    func();
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};

export default function ShopCartPage() {
  const [cookie] = useCookies(["token"]);
  const [carts, setCarts] = useState<any>(null);
  const colorMode = useColorMode();

  const fetch = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/customer/cart/list`, {
        headers: {
          Authorization: `Bearer ${cookie.token ? cookie.token : ""}`,
        },
      })
      .then((res) => {
        const catsRes: any = res.data.data[0];
        setCarts(catsRes);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleRemoveItem = (productId: number, cartId: number) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/customer/cart/remove-from-cart`,
        {
          productId: productId,
          cartId: cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token ? cookie.token : ""}`,
          },
        }
      )
      .then(() => {
        fetch();
      });
  };

  return (
    <>
      <Head title={"ShopCartPage"} />
      <Layout>
        <Container maxW={"8xl"} mx="auto">
          <Box alignSelf="center" textAlign="center" maxW="max" marginBottom={"6"} mx="auto">
            <Text className="" fontWeight={"bold"} fontSize="3xl">
              Your Shopping Cart
            </Text>
            {!!carts ? (
              <p>View your items, add more products, click checkout</p>
            ) : (
              <Text textDecoration={"underline"}>
                No item to show here.{" "}
                <a className="text-orange-400 font-semibold" href="/">
                  Discover products
                </a>
                .
              </Text>
            )}
          </Box>
          <Flex className="max-md:flex-col max-md:justify-center justify-around items-center">
            <Box maxW={"xl"}>
              {carts?.items.map((item: any) => (
                <Box
                  maxW={"xl"}
                  position="relative"
                  marginBottom={"6"}
                  boxShadow="base"
                  key={item.id}
                >
                  <Flex>
                    <AiOutlineMinus
                      onClick={() => {
                        handleRemoveItem(item.id, carts.cartId);
                      }}
                      className="absolute z-10 top-2 right-2 text-2xl border p-1 rounded-full hover:text-red-500"
                    />
                    <Link to={`/productdetail/?id=${item.id}`}>
                      <Image
                        src={
                          !!item.images
                            ? `${process.env.REACT_APP_API_URL}/resource/load-image/product/${item.images[0]}`
                            : ""
                        }
                        minW={100}
                        boxSize={[100, 150]}
                        objectFit="cover"
                        fallbackSrc="../logo.png"
                        rounded="md"
                        boxShadow={"md"}
                        m="2"
                      />
                    </Link>
                    <div className="p-5">
                      <h1 className="text-lg font-bold">{item.price}$</h1>
                      <p className="mt-5">{item.name}</p>
                      <Flex className="mt-5">
                        <div>
                          <AiOutlineMinus className="text-2xl border p-1 rounded-full " />
                        </div>
                        <Input
                          w="10"
                          border={"none"}
                          textAlign={"center"}
                          max="99"
                          min="0"
                          h="6"
                          px="1"
                          type="number"
                          defaultValue={item.qty}
                          className="mx-2 font-light"
                        />
                        <div>
                          <AiOutlinePlus className="text-2xl border  p-1 rounded-full" />
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </Box>
              ))}
            </Box>
            {!!carts && (
              <Box maxW={"md"} boxShadow="base " h="300 ">
                <div className="p-5">
                  <h1 className="text-2xl font-bold">Order Summary</h1>
                  <Flex justify={"space-between"} marginTop={"5"}>
                    <h1>{carts.items.length} Item</h1>
                    <h1>
                      $
                      {carts.items
                        .map(
                          (i: { price: number; qty: number }) => i.price * i.qty
                        )
                        .reduce((a: any, b: any) => {
                          return a + b;
                        })}
                    </h1>
                  </Flex>
                  <Flex justify={"space-between"} marginTop={"5"}>
                    <h1>Delivery</h1>
                    <h1>$0.00</h1>
                  </Flex>
                  <hr className="mt-5" />
                  <Flex
                    justify={"space-between"}
                    marginTop={"5"}
                    fontWeight={"bold"}
                    fontSize="xl"
                  >
                    <h1>Totals</h1>
                    <h1>
                      $
                      {carts.items
                        .map(
                          (i: { price: number; qty: number }) => i.price * i.qty
                        )
                        .reduce((a: any, b: any) => {
                          return a + b;
                        })}
                    </h1>
                  </Flex>
                  <Flex justify={"center"}>
                    <Button colorScheme="gray" w={400} className="mt-5">
                      Continue Checkout
                    </Button>
                  </Flex>
                </div>
              </Box>
            )}
          </Flex>
        </Container>
      </Layout>
    </>
  );
}
