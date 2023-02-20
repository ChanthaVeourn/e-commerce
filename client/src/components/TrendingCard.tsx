import {
  Card,
  CardBody,
  Text,
  Image,
  Icon,
  Stack,
  Divider,
  useColorMode,
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

const TrendingCard: React.FC<ProductProps> = ({id, name, qty, price, imageUrl}) => {
  const navigate = useNavigate();
  const colorMode = useColorMode();
  return (
    <>
     
       <Card
          maxW="sm"
          _hover={{
            shadow:
              "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 5px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardBody>
              <Icon
                className="shopicon"
                as={MdShoppingCart}
                boxSize={6}
                _hover={  {textColor: (colorMode.colorMode === 'dark') ? "white" : "gray.600" }}
                margin={"2"}
                onClick={() => navigate("/shoppingcart")}
                zIndex={10}
              />
              <Link to={`/productdetail/?id=${id}`}> 
            <Image
              src={!!imageUrl ? imageUrl : 'logo.png'}
              alt={name}
              fallbackSrc="logo.png"
              borderRadius="lg"
              w={[100, 180, 240, 280, 320]}
              h={[
                (100 * 2) / 3,
                (180 * 2) / 3,
                (240 * 2) / 3,
                (280 * 2) / 3,
                (320 * 2) / 3,
              ]}
            />
            <Stack mt="6" spacing="1">
              <Text fontSize="xl">
                ${price}
              </Text>
              <Text fontSize={"sm"}>
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
