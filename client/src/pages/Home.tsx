import React from "react";
import Layout from "../components/Layout";
import ProductCategory from "../components/ProductCategory";
import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import TrendingCard from "../components/TrendingCard";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "../components/slider";

const Home: React.FC = () => {
  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/view-product`
      );
      return res.data;
    },
    retry: 2,
  });

  const renderProducts = () => {
    if (!productQuery.data) return;
    const products = productQuery.data.data.map((prod: any) => ({
      id: prod.id,
      name: prod.name,
      qty: prod.qty,
      price: prod.price,
      imageUrl: prod.images
        ? `${process.env.REACT_APP_API_URL}/resource/load-image/product/${prod.images[0]}`
        : "logo.png",
    }));

    return products.map((prod: any) => (
      <TrendingCard key={prod.id} {...prod} />
    ));
  };

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/category/dropdown?page=0&size=6`
      );
      return res.data;
    },
    retry: 2,
  });

  const renderCategory = () => {
    if (!categoryQuery.data) return;
    const categories =
      categoryQuery.data instanceof Object
        ? categoryQuery.data.data.map((cate: any) => ({
            id: cate.id,
            name: cate.name,
            imageUrl: cate.imageFileName
              ? `${process.env.REACT_APP_API_URL}/resource/load-image/category/${cate.imageFileName}`
              : "",
          }))
        : categoryQuery.data.map((cate: any) => ({
            id: cate.id,
            name: cate.name,
            imageUrl: cate.imageFileName
              ? `${process.env.REACT_APP_API_URL}/resource/load-image/category/${cate.imageFileName}`
              : "",
          }));

    return categories.map((cate: any) => (
      <ProductCategory key={cate.id} {...cate} />
    ));
  };

  return (
    <Layout>
      <Container maxW={"8xl"} boxShadow="base " rounded='md'>
         <Slider />
      </Container>

      <Container maxW={"8xl"} py={2}>
        <Text className="mt-10 mb-5" fontWeight={"bold"} fontSize="3xl">
          Product Categories
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6} className='product-category'>
          {renderCategory()}
        </Grid>
      </Container>

      <Container maxW={"8xl"} mb={"20"}>
        <Text className="mt-10 mb-5" fontWeight={"bold"} fontSize="3xl">
          In Trending
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)",sm:"repeat(3, 1fr)",md:"repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={8}>
          {renderProducts()}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
function typeOf(data: any) {
  throw new Error("Function not implemented.");
}
