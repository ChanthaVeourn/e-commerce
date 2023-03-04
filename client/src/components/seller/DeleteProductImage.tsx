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

const DeleteProductImage: React.FC<{ filename: string, refetch: VoidFunction}> = ({
  filename, refetch
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useCustomToast();
  const [cookie] = useCookies(["token"]);
  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/seller/product/remove-image/${filename}`,
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
        toast("Remove image successfully", "success")
      })
      .catch((err) => {
        if(err.response.status === 500)
            toast("Some problems had occured, please retry", "error")
        onClose();
      });
  };

  return (
    <>
      <ImBin className="absolute top-1 right-1 bg-slate-400 rounded-full p-1 hover:text-red-500" size={25} onClick={onOpen} />
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
              Are you sure you want to delete this image?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => {
                handleDelete();
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

export default DeleteProductImage;
