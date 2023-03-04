import React from "react";
import {
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ImBin } from "react-icons/im";
import useCustomToast from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";

const DeleteProduct: React.FC<{ id: number}> = ({
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useCustomToast();
  const [cookie] = useCookies(["token"]);
  const naviagate = useNavigate();
  const handleDelete = (id: number) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/seller/product/remove/${id}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${cookie.token ? cookie.token : ""}`,
          },
        }
      )
      .then(() => {
        naviagate("/seller/products")
        onClose();
        toast("Remove successfully", "success")
      })
      .catch((err) => {
        if(err.response.status === 500)
            toast("Some problems had occured, pls retry", "error")
        onClose();
      });
  };

  return (
    <>
      <ImBin className="hover:text-red-400 bu" size={20} onClick={onOpen} />
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
              Are you sure you want to delete this product?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => {
                handleDelete(id);
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

export default DeleteProduct;
