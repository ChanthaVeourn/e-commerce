import React from "react";
import {
  Button,
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
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ImBin } from "react-icons/im";
import useCustomToast from "../../hooks/useCustomToast";

const DeleteCategory: React.FC<{ id: number; refetch: VoidFunction }> = ({
  id,
  refetch,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useCustomToast();
  const [cookie] = useCookies(["token"]);

  const handleDeleteCat = (id: number) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/seller/category/remove/${id}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${cookie.token ? cookie.token : ""}`,
          },
        }
      )
      .then(() => {
        refetch();
        onClose();
        toast("Remove successfully", "success")
      })
      .catch((err) => {
        if(err.response.status === 500)
            toast("Cannot remove the category that has products", "error")
        onClose();
      });
  };

  return (
    <>
      <ImBin className="hover:text-red-400" size={20} onClick={onOpen} />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          {/* <AlertDialogHeader fontSize={23}>Are you sure you want to delete this category?</AlertDialogHeader> */}
          {/* <AlertDialogCloseButton /> */}
          <AlertDialogBody>
            <Text fontSize={18} mb={2}>
              Are you sure you want to delete this category?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => {
                handleDeleteCat(id);
              }}
              colorScheme="orange"
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteCategory;
