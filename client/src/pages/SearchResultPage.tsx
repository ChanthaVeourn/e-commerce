import { Container, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import TrendingCard from "../components/TrendingCard";

const SearchResultPage: React.FC = () => {
  const [params] = useSearchParams();
  const [q] = useState(params.get("q"));
  const [hasMore, setHasMore] = useState(true);
  const [productQuery, setProductQuery] = useState<any>([]);

  let total = 0;
  let page = 0;
  const fetch = (
    productQuery: any,
    setProductQuery: any,
    setHasMore: any,
    q: any
  ) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/customer/view-product/search?query=${q}&page=${page}&size=20`
      )
      .then((res) => {
        setProductQuery([...productQuery, ...res.data.data]);
        if (page + 1 === Math.ceil(total / 20)) setHasMore(false);
        page++;
      });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/customer/view-product/search?query=${q}&page=${page}&size=20`
      )
      .then((res) => {
        console.log(productQuery);
        setProductQuery([...productQuery, ...res.data.data]);
        total = res.data.total;
        if (page + 1 === Math.ceil(total / 20)) setHasMore(false);
        page++;
      });
  }, []);

  const renderProducts = () => {
    if (!productQuery) return;
    const products = productQuery.map((prod: any) => ({
      id: prod.id,
      name: prod.name,
      qty: prod.qty,
      price: prod.price,
      imageUrl:
        prod.images?.length > 0
          ? `${process.env.REACT_APP_API_URL}/resource/load-image/product/${prod.images[0]}`
          : "",
    }));

    return products.map((prod: any) => (
      <TrendingCard key={prod.id} {...prod} />
    ));
  };

  return (
    <>
      <Layout>
        <Container maxW={"8xl"} mb={"20"}>
          <InfiniteScroll
            dataLength={20}
            next={() => {
              fetch(productQuery, setProductQuery, setHasMore, q);
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
      </Layout>
    </>
  );
};
export default SearchResultPage;
