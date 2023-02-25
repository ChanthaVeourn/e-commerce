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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCookies } from "react-cookie";
import useCustomToast from "../../hooks/useCustomToast";

const CreateNewCategory: React.FC<{ refetch: VoidFunction }> = ({
  refetch,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [cookie] = useCookies(["token"]);
  const [catName, setCatName] = useState("");
  const [catImg, setCatImg] = useState<null | File>(null);
  const toast = useCustomToast();

  const base = `${process.env.REACT_APP_API_URL}`;

  const uploadImage = (id: number) => {
    if (catImg === null) {
      refetch();
      return;
    }
    const formData = new FormData();
    formData.set("file", catImg);
    axios
      .post(`${base}/seller/category/image/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        toast(err, "error");
      })
      .finally(() => {
        setCatImg(null);
      });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `${base}/seller/category/`,
        { name: catName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        uploadImage(res.data.data.id);
      })
      .catch((err) => {
        toast(err.response.data.message, "error");
      })
      .finally(() => {
        onClose();
        toast("Upload image successfully", "success");
      });
  };

  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setCatImg(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
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
          {!catImg ? (
            <>
              <input {...getInputProps()} />
              <BsImages size={40} />
              <Text fontWeight={"bold"} fontSize={18}>
                Choose an image or drag it here
              </Text>
              <Text> Support (.jpg .jpeg .png .gif .svg)</Text>
            </>
          ) : (
            <Text fontWeight={"bold"} fontSize={18}>
              Click <b>Save</b> to upload image
            </Text>
          )}
        </Flex>
      </Box>
    );
  };

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
          <form onSubmit={handleFormSubmit}>
            <AlertDialogHeader fontSize={23}>New Category</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Text fontSize={18} mb={2}>
                Category Name
              </Text>
              <Input
                required
                onChange={(e) => {
                  setCatName(e.target.value);
                }}
                placeholder="....."
              ></Input>
              <Text fontSize={18} my={2}>
                Image
              </Text>
              <Dropzone />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button type="submit" colorScheme="orange" ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateNewCategory;
