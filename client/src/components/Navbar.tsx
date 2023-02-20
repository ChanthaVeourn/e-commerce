import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiCart,
  BiDownArrow,
  BiLock,
  BiLogIn,
  BiLogOut,
  BiMoon,
  BiPlus,
  BiSearch,
  BiSun,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { UserContext } from "../contexts/UserContext";
import { faker } from "@faker-js/faker";
import { useCookies } from "react-cookie";
import useCustomToast from "../hooks/useCustomToast";
import { GoThreeBars } from "react-icons/go";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const user: any = React.useContext(UserContext);
  const [, , removeCookie] = useCookies(["user", "token", "role"]);
  const toast = useCustomToast();

  return (
    <>
      <Container maxW={"8xl"} py={2}>
        <Flex
          flexDir={"row"}
          className={"w-full"}
          justify={"space-between"}
          align={"center"}
        >
          <Link to={"/"}>
            <Flex className="logo" gap={3} align={"center"}>
              <Image src="../logo.png" w={20} />
              <Heading size={"lg"} color={"heading"}>
                Cool Ecommerce
              </Heading>
            </Flex>
          </Link>
          <form onSubmit={() =>{}}>
            <Flex flexDir={"row"}>
              <Input
                minW="30ch"
                maxW="40ch"
                outline={"none"}
                borderRightRadius="0"
                borderColor={colorMode === "dark" ? "gray.500" : "gray.300"}
              />
              <Box
                as="button"
                type="submit"
                className={
                  "bg-orange-400 hover:bg-orange-300 dark:bg-orange-200 flex justify-center items-center rounded-r-lg"
                }
                w={"14"}
                h={"10"}
              >
                <BiSearch size={25} />
              </Box>
            </Flex>
          </form>
          <Flex
            flexDir={"row"}
            gap={10}
            align={"center"}
            display={{ base: "none", xl: "flex" }}
          >
            <Box as="button" onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <BiMoon size={25} />
              ) : (
                <BiSun size={25} />
              )}
            </Box>
            {/* <Link to={"/wishlist"}>
              <BiHeart size={25} />
            </Link> */}
            <Link to={"/shoppingcart"}>
              <BiCart size={25} />
            </Link>
            {user ? (
              <Menu>
                <MenuButton as={Button} variant={"ghost"}>
                  <Flex gap={2} alignItems={"center"}>
                    <Avatar src={faker.image.people()} size={"sm"} />
                    {user.name}
                    <BiDownArrow />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem icon={<BiUser size={20} />}>
                      View Profile
                    </MenuItem>
                  </MenuGroup>
                  <MenuGroup title="Acccount">
                    <MenuItem icon={<BiLock size={20} />}>
                      Change Password
                    </MenuItem>
                    <MenuItem
                      icon={<BiLogOut size={20} />}
                      onClick={() => {
                        removeCookie("token");
                        removeCookie("user");
                        removeCookie("role");
                        toast("Logout Success", "success");
                      }}
                    >
                      Log Out
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiUserCircle size={25} />}
                  arial-label={"User icon"}
                  variant={"ghost"}
                />
                <MenuList>
                  <MenuItem
                    icon={<BiLogIn size={20} />}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    icon={<BiPlus size={20} />}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
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
              display={{ base: "flex", xl: "none" }}
            />

            <MenuList>
              {
                user ? (
                  <MenuGroup><MenuItem fontWeight={"semibold"} gap={2} alignItems={"center"} icon={<Avatar src={faker.image.people()} size={"sm"} />}>
                  {user.name}
                </MenuItem>
                <hr/>
                </MenuGroup>
                ) : (
                  ""
                )
              }
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
                <Link to={"/shoppingcart"}>
                  <MenuItem fontWeight={"bold"} icon={<BiCart size={25} />}>
                    Shopping Cart
                  </MenuItem>
                </Link>

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
                      removeCookie("token");
                      removeCookie("user");
                      removeCookie("role");
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
        </Flex>
      </Container>
    </>
  );
};

export default Navbar;
