import { Box, Heading,Text } from "@chakra-ui/react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <Box boxShadow="dark-lg">
        <footer className="relative pt-8 pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-left lg:text-left">
              <div className="w-full lg:w-6/12 px-4">
                <Heading size={"lg"} color={"heading"}>
                  Cool Ecommerce
                </Heading>
                <h5 className="text-lg mt-0 mb-2 ">
                  Welcome to my Website.....
                </h5>
                {/* icon */}
                <div className="mt-6 lg:mb-0 mb-6 flex">
                  <button
                    type="button"
                    className="text-2xl bg-white text-gray-600 shadow-lg font-normal h-10 w-10  flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  >
                    <BsTwitter />
                  </button>
                  <button
                    type="button"
                    className="text-2xl bg-white text-gray-600 shadow-lg font-normal h-10 w-10  flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  >
                    <BsFacebook />
                  </button>
                  <button
                    type="button"
                    className="text-2xl bg-white text-gray-600 shadow-lg font-normal h-10 w-10  flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  >
                    <BsInstagram />
                  </button>
                  <button
                    type="button"
                    className="text-2xl bg-white text-gray-600 shadow-lg font-normal h-10 w-10  flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  >
                    <BsGithub />
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="flex flex-wrap items-top mb-6">
                  {/* <div className="w-full text-center px-4 ml-auto">
                    <Text className="block  text-blueGray-500 text-2xl font-semibold mb-2 text-orange-300" >
                      Address
                    </Text>
                    <p>                      
                      Royal University of Phnom Penh (RUPP) Russian Federation
                      Boulevard, Toul Kork, Phnom Penh, Cambodia.{" "}
                    </p>
                  </div> */}
                  <div className="w-full lg:w-4/12 px-4">
                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-orange-400">
                      Useful Links
                    </span>
                    <ul>
                      <Link
                        to={"/"}
                        className=" hover:text-gray-600 font-semibold block pb-2 text-sm"
                      >
                        About Us
                      </Link>
                      <Link
                        to={"/"}
                        className="hover:text-gray-600 font-semibold block pb-2 text-sm"
                      >
                        Blog
                      </Link>
                      <Link
                        to={"/"}
                        className="hover:text-gray-600 font-semibold block pb-2 text-sm"
                      >
                        Our Social Media
                      </Link>
                      <Link
                        to={"/"}
                        className="hover:text-gray-600 font-semibold block pb-2 text-sm"
                      >
                        Free Product
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div className="text-center">
              <p>Copyright © 2023 CoolEcommerce</p>
            </div>
          </div>
        </footer>
      </Box>
    </>
  );
}
