import React, { useCallback, useState } from "react";
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
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsImages } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCookies } from "react-cookie";
import useCustomToast from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";

const UpdateCategory: React.FC<{ name: string; imageUrl: any; id: number; refetch: VoidFunction }> = ({
  name,
  imageUrl,
  id,
  refetch
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const formData = new FormData();
  const [cookie] = useCookies(["token"]);
  const [catName, setCatName] = useState(name);
  const toast = useCustomToast();
  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      formData.set("file", file);
    }, []);

    const { getRootProps, getInputProps } =
      useDropzone({
        onDrop,
      });

    return (
      <Box h={200} w={400} className="border rounded-md">
        <Flex
          flexDir={"column"}
          justify={"center"}
          alignItems={"center"}
          h="100%"
          {...getRootProps({ className: "dropzone" })}
        >
          {!formData.has("file") ? (
              <>
                <input {...getInputProps()} />
                <BsImages size={40} />
                <Text fontWeight={"bold"} fontSize={18}>
                  Choose an image and drag it here
                </Text>
                <Text> Support (.jpg .jpeg .png .gif .svg)</Text>
              </>
          ) : (
            <Text fontWeight={"bold"} fontSize={18}>
              Click update to upload image
          </Text>
          )}
        </Flex>
      </Box>
    );
  };

  const handleSubmit = () => {
    onClose();
    let base = `${process.env.REACT_APP_API_URL}`
    if (formData.has("file")) { 
      !!imageUrl ? 
        axios
          .put(`${base}/seller/category/image/update/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${cookie.token}`
            },
          })
          .then(() => {
            toast("Upload image successfully", "success");
          })
          .catch((err) => {
            toast(err, "error")
          }) :
          axios
          .post(`${base}/seller/category/image/upload/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${cookie.token}`
            },
          })
          .then(() => {
            toast("Upload image successfully", "success");
          })
          .catch((err) => {
            toast(err, "error")
          })
      }
      catName !== name && axios
      .put(`${base}/seller/category/${id}`, {name: catName}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookie.token}`
        },
      })
      .then(() => {
        toast("Updated category successfully", "success");
      })
      .catch((err) => {
        toast(err, "error")
      })
      refetch()
    };

  return (
    <>
      <FaPencilAlt
        onClick={onOpen}
        className="dark:hover:text-orange-200 hover:text-orange-400"
        size={20}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        key={name}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize={23}>New Category</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text fontSize={18} mb={2}>
              Name
            </Text>
            <Input
              defaultValue={name}
              onChange={(e) => {
                setCatName(e.target.value);
              }}
            />
            <Text fontSize={18} my={2}>
              Image
            </Text>
            <Dropzone />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme="orange" ml={3}>
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateCategory;
