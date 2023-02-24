import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay } from "swiper";
import "swiper/css/navigation";
export default function Slider() {
  return (
    <>
      <Swiper
      loop={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation,Autoplay]}
        autoplay={{
          delay: 4500,         
        }}
      >
        <SwiperSlide>
          <Flex
            p="6"
            rounded="md"
            alignItems={"center"}
            justify={"space-between"}
            padding={"50"}
            className="content"
          >
            <div style={{ width: "300px" }} className="content-detail">
              <Text className="text-center" fontWeight={"bold"} fontSize="3xl">
                WHAT EVER YOU WANT TO SAY...
              </Text>
              <Text className="text-center">
                Lorem ipsum dolor sit amet consectetur. Eleifend luctus placerat
                fermentum bibendum egestas at mi. Lobortis suspendisse at
                posuere nunc.
              </Text>
            </div>
            <div className="max-w-3xl img">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="rounded-md"
              />
            </div>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex
            p="6"
            rounded="md"
            alignItems={"center"}
            justify={"space-between"}
            padding={"50"}
            className="content"
          >
            <div style={{ width: "300px" }} className="content-detail">
              <Text className="text-center" fontWeight={"bold"} fontSize="3xl">
                WHAT EVER YOU WANT TO SAY...
              </Text>
              <Text className="text-center">
                Lorem ipsum dolor sit amet consectetur. Eleifend luctus placerat
                fermentum bibendum egestas at mi. Lobortis suspendisse at
                posuere nunc.
              </Text>
            </div>
            <div className="max-w-3xl img">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8&w=1000&q=80"
                alt=""
                className="rounded-md"
              />
            </div>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex
            p="6"
            rounded="md"
            alignItems={"center"}
            justify={"space-between"}
            padding={"50"}
            className="content"
          >
            <div style={{ width: "300px" }} className="content-detail">
              <Text className="text-center" fontWeight={"bold"} fontSize="3xl">
                WHAT EVER YOU WANT TO SAY...
              </Text>
              <Text className="text-center">
                Lorem ipsum dolor sit amet consectetur. Eleifend luctus placerat
                fermentum bibendum egestas at mi. Lobortis suspendisse at
                posuere nunc.
              </Text>
            </div>
            <div className="max-w-3xl img">
              <img
                src="https://i0.wp.com/mumbai7.com/wp-content/uploads/2022/01/Blue-and-Yellow-Electronic-Promo-Instagram-Post-800-x-700-px.png"
                alt=""
                className="rounded-md"
              />
            </div>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex
            p="6"
            rounded="md"
            alignItems={"center"}
            justify={"space-between"}
            padding={"50"}
            className="content"
          >
            <div style={{ width: "300px" }} className="content-detail">
              <Text className="text-center" fontWeight={"bold"} fontSize="3xl">
                WHAT EVER YOU WANT TO SAY...
              </Text>
              <Text className="text-center">
                Lorem ipsum dolor sit amet consectetur. Eleifend luctus placerat
                fermentum bibendum egestas at mi. Lobortis suspendisse at
                posuere nunc.
              </Text>
            </div>
            <div className="max-w-3xl img">
              <img
                src="https://verbnow.com/wp-content/uploads/2021/05/1.different-types-toys-may20.jpg"
                alt=""
                className="rounded-md"
              />
            </div>
          </Flex>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
