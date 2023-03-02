import {
  Card,
  CardBody,
  Text,
  Image,
  Icon,
  Stack,
  Divider,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

type ProductProps = {
  id: number;
  name: string;
  qty: string,
  price: any,
  imageUrl: string;
};

const TrendingCard: React.FC<ProductProps> = ({ id, name, qty, price, imageUrl }) => {
  const navigate = useNavigate();
  const colorMode = useColorMode();
  return (
    <>
     
       <Card
          maxW="sm"
          _hover={{
            shadow:
              "0px 0px 20px 0px rgba(0, 0, 0, 0.1), 0 6px 5px 0 rgba(0, 0, 0, 0.1)",
          }}
         transition={'0.5s'}
        >
          <CardBody p={0}>
              {/* <Icon
                className="shopicon"
                as={MdShoppingCart}
                boxSize={6}
                _hover={  {textColor: (colorMode.colorMode === 'dark') ? "white" : "gray.600" }}
                margin={"2"}
                onClick={() => navigate("/shoppingcart")}
                zIndex={10}
              /> */}
              <Link to={`/productdetail/?id=${id}`}> 
            <Image
              src={!!imageUrl ? imageUrl : '../logo.png'}
              alt={name}
              fallbackSrc="../logo.png"
              borderTopRadius={'lg'}
              // w={[100, 180, 240, 280, 320]}
              className='trending-img'
              w={'100%'}
              // h={[
              //   (100 * 3) / 4,
              //   (180 * 3) / 4,
              //   (240 * 3) / 4,
              //   (280 * 3) / 4,
              //   (320 * 3) / 4,
              // ]}
             
            />
            <Stack mt="6" spacing="1" px={3} pb={2}>
              <Text fontSize={{ base: "15px",md: "15px", xl: "xl" }} fontWeight={"bold"}>
                ${price}
              </Text>
              <Text fontSize={{ base: "10px",md: "15px", xl: "xl" }} className="pro_name">
                {name}
              </Text>
              <Text fontSize={"sm"}>Stock {qty}</Text>
            </Stack>
            </Link>
          </CardBody>
          <Divider />
        </Card>
    </>
  );
};

export default TrendingCard;
