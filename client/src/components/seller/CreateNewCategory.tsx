import React from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BiPlus} from "react-icons/bi";
import { BsImages } from "react-icons/bs";
const CreateNewCategory: React.FC<{refetch: VoidFunction}> = (refetch) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button onClick={onOpen}>
        <BiPlus size={30} />
        New Category
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize={23}>New Category</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text fontSize={18} mb={2}>
              Category Name
            </Text>
            <Input placeholder="....."></Input>
            <Text fontSize={18} my={2}>
              Image
            </Text>
            <Box h={200} w={400} className="border rounded-md">
              <Flex
                flexDir={"column"}
                justify={"center"}
                alignItems={"center"}
                h="100%"
              >
                <BsImages size={40} />
                <Text fontWeight={"bold"} fontSize={18}>
                  Choose a img or drag it here
                </Text>
                <Text> Support JPEG (.jpg .jpeg)</Text>
              </Flex>
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="orange" ml={3}>
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CreateNewCategory;