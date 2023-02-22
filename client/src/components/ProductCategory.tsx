import { Card, Box, Text, Image, useColorMode, CardBody, CardFooter, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Head from "./Head";

type ProductCategoryProps = {
  id: number;
  name: string;
  imageUrl: any;
};

const ProductCategory: React.FC<ProductCategoryProps> = ({
  id,
  name,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const colorMode = useColorMode();
  return (
    <Box>
      <Head title={name} />
     
        <Card position={"relative"} as="a" onClick={() => navigate(`/category/?id=${id}&name=${name}`)}
          w={[100, 180, 240, 280, 320]}
          h={[
            (100 * 2) / 3,
            (180 * 2) / 3,
            (240 * 2) / 3,
            (280 * 2) / 3,
            (320 * 2) / 3,
          ]}
          opacity={".9"}
          _hover={{ opacity: "1", transition: " opacity .2s ease-in" }}
          className = "hover:shadow-md dark:shadow-red-400"
        >
          <Image
            objectFit="cover"
            w={[100, 180, 240, 280, 320]}
            h={[
              (100 * 2) / 3,
              (180 * 2) / 3,
              (240 * 2) / 3,
              (280 * 2) / 3,
              (320 * 2) / 3,
            ]}
            src={!!imageUrl ? imageUrl : 'logo.png'}
            alt={name}
            fallbackSrc={"logo.png"}
            borderRadius={5}
          />
          <Container position="absolute" borderBottomRadius={5} mx="auto" bottom={0} bg={colorMode.colorMode === 'dark' ? 'gray.500' : "gray.300"} fontSize={["md", "lg"]} fontWeight={"bold"}>
            {name}
          </Container>
          
        </Card>
    </Box>
  );
};

export default ProductCategory;
