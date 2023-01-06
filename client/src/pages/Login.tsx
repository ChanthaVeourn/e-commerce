import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { colorMode } = useColorMode();

  return (
    <Container
      minW={"6xl"}
      as={motion.div}
      transitionDuration={"200ms"}
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    >
      <Flex minH={"100vh"} flexDir={"column"} justifyContent={"center"}>
        <Flex flexDir={"row"} justifyContent={"center"} align={"center"}>
          <Flex flexDir={"column"} gap={2} w={"50%"}>
            <Flex flexDir={"column"} align="center">
              <Image src="./logo.png" w={"20"} />
              <Heading>welcome back</Heading>
            </Flex>
            <Flex justifyContent={"center"}>
              <Divider w={"25rem"} />
            </Flex>
            <FormControl>
              <Flex flexDir={"column"} gap={3} p={10} align={"center"}>
                <Flex flexDir={"column"} w={"25rem"}>
                  <FormLabel>Email: </FormLabel>
                  <Input type={"email"} required />
                </Flex>
                <Flex flexDir={"column"} w={"25rem"}>
                  <FormLabel>Password: </FormLabel>
                  <Input type={"password"} required />
                </Flex>
                <Button w={"25rem"} mt={3}>
                  Log In
                </Button>
              </Flex>
            </FormControl>
            <Flex justifyContent={"center"}>
              <Divider w={"25rem"} />
            </Flex>
            <Flex flexDir={"row"} justifyContent={"center"} gap={3}>
              <Text>Don't have an account?</Text>
              <Link to={"/signup"}>
                <Text>Sign Up</Text>
              </Link>
            </Flex>
          </Flex>
          <Flex bg={colorMode === "light" ? "gray.100" : "gray.400"} w={"50%"}>
            <Image
              src={colorMode === "light" ? "./login.svg" : "./login_dark.svg"}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Login;
