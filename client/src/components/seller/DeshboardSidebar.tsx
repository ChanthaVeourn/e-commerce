import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Container,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React, { PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  BiCategory,
  BiLock,
  BiLogIn,
  BiLogOut,
  BiMoon,
  BiPlus,
  BiSun,
} from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import useCustomToast from "../../hooks/useCustomToast";

const DeshboardSidebar: React.FC<PropsWithChildren> = ({ children }) => {
  const user: any = React.useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["user", "token", "role"]);
  const toast = useCustomToast();
  return (
    <>
        <Flex>
          <Box
            h="100vh "
            minW="max"
            boxShadow="2xl "
            flexBasis={1 / 5}
            // position="fixed"
            zIndex={50}
            className="backdrop-blur-2xl max-md:hidden"
          >
            <Link to={"/seller/dashboard"}>
              <Flex
                minW="max"
                className="logo"
                gap={2}
                align={"center"}
                h="10vh "
              >
                <Image src="../../logo.png" w={20} />
                <Heading minW="max" size={"md"} color={"heading"} pr={2}>
                  Cool Ecommerce
                </Heading>
              </Flex>
            </Link>
            <hr />
            <Flex flexDir={"column"} marginTop={"5"}>
              <Link to={"/seller/dashboard"}>
                <Box
                  _hover={{ bgColor: "heading" }}
                  py={5}
                  _selected={{ bgColor: "heading" }}
                >
                  <Flex align={"center"} marginLeft={"10"}>
                    <AiOutlineDashboard
                      size={35}
                      style={{ marginRight: "10" }}
                    />
                    <Text fontWeight={"bold"} fontSize="xl">
                      DashBoard
                    </Text>
                  </Flex>
                </Box>
              </Link>
              <Link to={"/seller/categories"}>
                <Box _hover={{ bgColor: "heading" }} py={5}>
                  <Flex align={"center"} marginLeft={"10"}>
                    <BiCategory size={35} style={{ marginRight: "10" }} />
                    <Text fontWeight={"bold"} fontSize="xl">
                      Categories
                    </Text>
                  </Flex>
                </Box>
              </Link>
              <Link to={"/seller/products"}>
                <Box _hover={{ bgColor: "heading" }} py={5}>
                  <Flex align={"center"} marginLeft={"10"}>
                    <MdProductionQuantityLimits
                      size={35}
                      style={{ marginRight: "10" }}
                    />
                    <Text fontWeight={"bold"} fontSize="xl">
                      Products
                    </Text>
                  </Flex>
                </Box>
              </Link>
            </Flex>
          </Box>
          <Container mx="auto" minW="max" flexBasis={4 / 5}>{children}</Container>
        </Flex>
        <Box position="fixed" top={5} right={3} mx="auto">

          <Menu>
            <MenuButton
              as={IconButton}
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "gray.100" }}
              icon={<GoThreeBars />}
            />

            <MenuList>
              {user ? (
                <MenuGroup>
                  <MenuItem
                    fontWeight={"semibold"}
                    gap={2}
                    alignItems={"center"}
                    icon={<Avatar src={faker.image.people()} size={"sm"} />}
                  >
                    {user.name}
                  </MenuItem>
                  <hr />
                </MenuGroup>
              ) : (
                ""
              )}
              <MenuGroup>
                <MenuItem
                  className="hover:dark:text-yellow-400"
                  fontWeight={"bold"}
                  onClick={toggleColorMode}
                  icon={
                    colorMode === "light" ? (
                      <BiMoon size={25} />
                    ) : (
                      <BiSun size={25} />
                    )
                  }
                >
                  {colorMode === "dark" ? "Light mode" : "Dark mode"}
                </MenuItem>

                <hr />
              </MenuGroup>
              {user ? (
                <MenuGroup title="Acccount">
                  <MenuItem icon={<BiLock size={20} />}>
                    Change Password
                  </MenuItem>
                  <MenuItem
                    icon={<BiLogOut size={20} />}
                    onClick={() => {
                      removeCookie("role");
                      removeCookie("token");
                      removeCookie("user");
                      toast("Logout Success", "success");
                    }}
                  >
                    Log Out
                  </MenuItem>
                </MenuGroup>
              ) : (
                <MenuGroup title="Account">
                  <MenuItem
                    icon={<BiLogIn size={20} />}
                    onClick={() => navigate("/login")}
                    display={{ base: "flex", xl: "none" }}
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    icon={<BiPlus size={20} />}
                    onClick={() => navigate("/signup")}
                    display={{ base: "flex", xl: "none" }}
                  >
                    Sign Up
                  </MenuItem>
                </MenuGroup>
              )}
            </MenuList>
          </Menu>

        </Box>
    </>
  );
};

export default DeshboardSidebar;
