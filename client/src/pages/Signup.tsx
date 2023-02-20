import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useForm } from "react-hook-form";
import Head from "../components/Head";
import { useCookies } from "react-cookie";
import useCustomToast from "../hooks/useCustomToast";
import { useMutation } from "react-query";
import axios from "axios";

type ResponeM = {
  code: number;
  message: string;
};
type SignupResponse = {
  response: ResponeM;
};
const Signup = () => {
  const { colorMode } = useColorMode();
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "role",
    "user",
  ]);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationKey: "singup",
    mutationFn: async (credential): Promise<SignupResponse> => {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, credential);
      return res.data;
    },
    onSuccess: (data) => {
      toast(data.response.message, "success");
      if (data.response.code === 201)
        navigate("/login")
    },
    onError: (data: any) => {
      toast(data.response.data.message, "error");
    }
  });
  
  const onSubmit = (e: any) => {
    mutate(e);
  };

  React.useEffect(() => {
    if (cookie.role === undefined) {
      removeCookie("role");
      removeCookie("token");
    }
    if (cookie.role) {
      cookie.role === "[ROLE_SELLER]"
        ? navigate("/seller/dashboard")
        : navigate("/");
    }
  }, [cookie, navigate, removeCookie]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title={"SignUp"} />
      <Container
        minW={"6xl"}
        as={motion.div}
        transitionDuration={"200ms"}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
      >
        <Flex minH={"100vh"} flexDir={"column"} justifyContent={"center"}>
          <Flex
            flexDir={"row-reverse"}
            justifyContent={"center"}
            align={"center"}
          >
            <Flex flexDir={"column"} gap={2} w={"50%"}>
              <Flex flexDir={"row"} align={"center"} justifyContent={"center"}>
                <Heading>Create an Account</Heading>
              </Flex>
              <Flex justifyContent={"center"}>
                <Divider w={"25rem"} />
              </Flex>
              <FormControl
                isInvalid={
                  errors.userName ||
                  errors.email ||
                  errors.password ||
                  errors.confirmPassword
                    ? true
                    : false
                }
                as="form"
                id="register"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Flex flexDir="column" gap={3} p={10} align="center">
                  <Flex flexDir="column" w={"25rem"}>
                    <FormLabel>Name: </FormLabel>
                    <Input
                      isInvalid={errors.userName ? true : false}
                      type={"text"}
                      required
                      {...register("userName", {
                        pattern: /^[a-zA-Z0-9 ]+$/,
                      })}
                      id="name"
                    />
                    {errors && errors.userName ? (
                      <FormErrorMessage>Invalid username</FormErrorMessage>
                    ) : (
                      <FormHelperText>Enter a valid username</FormHelperText>
                    )}
                  </Flex>
                  <Flex flexDir={"column"} w={"25rem"}>
                    <FormLabel>Email: </FormLabel>
                    <Input
                      // data-invalid={errors.email}
                      isInvalid={errors.email ? true : false}
                      {...register("email", {
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                      id="email"
                    />
                    {errors.email ? (
                      <FormErrorMessage>Invalid email</FormErrorMessage>
                    ) : (
                      <FormHelperText>
                        Enter a valid email address
                      </FormHelperText>
                    )}
                  </Flex>
                  <Flex flexDir={"column"} w={"25rem"}>
                    <FormLabel>Password: </FormLabel>
                    <Input
                      isInvalid={errors.password ? true : false}
                      type={"password"}
                      required
                      {...register("password", {
                        pattern: /(?=.*[0-9])/,
                      })}
                      id={"password"}
                    />
                    {errors.password ? (
                      <FormErrorMessage>Invalid password</FormErrorMessage>
                    ) : (
                      <FormHelperText>
                        Password with 8 characters and a number
                      </FormHelperText>
                    )}
                  </Flex>
                  <Flex flexDir={"column"} w={"25rem"}>
                    <FormLabel>Confirm Password: </FormLabel>
                    <Input
                      isInvalid={errors.confirm_password ? true : false}
                      type={"password"}
                      required
                      {...register("confirm_password", {
                        required: true,
                        validate: (val: string) => {
                          if (watch("password") !== val) {
                            return "Password does not match";
                          }
                        },
                      })}
                      id="confirm_password"
                    />
                    {errors.confirm_password ? (
                      <FormErrorMessage>
                        Password does not matched
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText>Re-enter password</FormHelperText>
                    )}
                  </Flex>
                  <Button w={"25rem"} mt={3} type={"submit"} loadingText="Signing up" isLoading={isLoading}>
                    Sign Up
                  </Button>
                </Flex>
              </FormControl>
              <Flex justifyContent={"center"}>
                <Divider w={"25rem"} />
              </Flex>
              <Flex flexDir={"row"} justifyContent={"center"} gap={3}>
                <Text>Already have an account?</Text>
                <Link to={"/login"}>
                  <Text>Log In</Text>
                </Link>
              </Flex>
            </Flex>
            <Flex
              w={"50%"}
              bg={colorMode === "light" ? "gray.100" : "gray.400"}
              display={{ base: "none,", lg: "block" }}
            >
              <Image
                src={
                  colorMode === "light" ? "./signup.svg" : "./signup_dark.svg"
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Signup;
