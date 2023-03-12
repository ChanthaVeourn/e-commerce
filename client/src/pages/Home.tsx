import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCategory from "../components/ProductCategory";
import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import TrendingCard from "../components/TrendingCard";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "../components/slider";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

const Home: React.FC = () => {
  const [productQuery, setProductQuery] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  let total = 0;
  const [page, setPage] = useState(0);
  const fetch = (productQuery: any, setProductQuery: any, setHasMore: any) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/customer/view-product/?page=${page}&size=20`
      )
      .then((res) => {
        setProductQuery([...productQuery, ...res.data.data]);
        if (page + 1 === Math.ceil(total / 20)) setHasMore(false);
        setPage(page + 1);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/customer/view-product/?page=${page}&size=20`
      )
      .then((res) => {
        setProductQuery([...productQuery, ...res.data.data]);
        total = res.data.total;
        if (page + 1 === Math.ceil(total / 20)) setHasMore(false);
        setPage(page + 1);
      });
  }, []);

  const renderProducts = () => {
    if (!productQuery) return;
    const products = productQuery.map((prod: any) => ({
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
    }
  });

  const renderCategory = () => {
    if (!categoryQuery.data) return;
    const categories =
      !!categoryQuery.data
        ? categoryQuery?.data.data.map((cate: any) => ({
            id: cate.id,
            name: cate.name,
            imageUrl: cate.imageFileName
              ? `${process.env.REACT_APP_API_URL}/resource/load-image/category/${cate.imageFileName}`
              : "",
          }))
        : categoryQuery?.data.map((cate: any) => ({
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
      <Container maxW={"8xl"} boxShadow="base " rounded="md">
        <Slider />
      </Container>

      <Container maxW={"8xl"} py={2}>
        <Text className="mt-10 mb-5" fontWeight={"bold"} fontSize="3xl">
          Product Categories
        </Text>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
          gap={6}
          className="product-category"
        >
          {renderCategory()}
        </Grid>
      </Container>

      <Container maxW={"8xl"} mb={"20"}>
        <Text className="mt-10 mb-5" fontWeight={"bold"} fontSize="3xl">
          In Trending
        </Text>
        <Container maxW={"8xl"} mb={"20"}>
          <InfiniteScroll
            dataLength={20}
            next={() => {
              fetch(productQuery, setProductQuery, setHasMore);
            }}
            hasMore={hasMore}
            loader={""}
          >
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gap={8}
            >
              {renderProducts()}
            </Grid>
          </InfiniteScroll>
        </Container>
        <div>
          <ScrollToTop smooth style={{ width: "30px" }} />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
