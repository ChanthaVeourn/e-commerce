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
  CardFooter,
} from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

type ProductProps = {
  id: number;
  name: string;
  qty: string;
  price: any;
  imageUrl: string;
};

const TrendingCard: React.FC<ProductProps> = ({
  id,
  name,
  qty,
  price,
  imageUrl,
}) => {
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
        transition={"0.5s"}
      >
        <CardBody p={0}>
          <Icon
            as={MdShoppingCart}
            boxSize={7}
            color={
                colorMode.colorMode === "dark" ? "orange.400" : "orange.400"
            }
            _hover={{
              textColor:
                colorMode.colorMode === "dark" ? "orange.300" : "orange.500",
            }}
            margin={"2"}
            onClick={() => navigate("/shoppingcart")}
            zIndex={10}
            className="absolute right-1 top-1 rounded-full border border-gray-400 p-1"
          />
          <Link to={`/productdetail/?id=${id}`}>
            <Image
              src={!!imageUrl ? imageUrl : "../logo.png"}
              alt={name}
              fallbackSrc="../logo.png"
              borderTopRadius={"lg"}
              w={[139, 180, 240, 280, 320]}
              h={[
                (139 * 3) / 4,
                (180 * 3) / 4,
                (240 * 3) / 4,
                (280 * 3) / 4,
                (320 * 3) / 4,
              ]}
              bgClip="content-box"
              //  className="max-sm:w-[139px] max-sm:h-[139px]  bg-cover"
            />
          </Link>
        </CardBody>

        <Divider />
        <CardFooter>
          <Stack mt="6" spacing="1" px={3} pb={2}>
            <Text className="max-sm:text-sm text-base" fontWeight={"bold"}>
              ${price}
            </Text>
            <Text className="max-sm:text-sm text-base pro_name">{name}</Text>
            <Text className="max-sm:text-xs text-sm">Stock {qty}</Text>
          </Stack>
        </CardFooter>
      </Card>
    </>
  );
};

export default TrendingCard;
