import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
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
import { FaPencilAlt } from "react-icons/fa";

const UpdateProductImage: React.FC<{
  filename: string;
  refetch: VoidFunction;
}> = ({ filename, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [cookie] = useCookies(["token"]);
  const [proImg, setProImg] = useState<any>(null);
  const toast = useCustomToast();

  const base = `${process.env.REACT_APP_API_URL}`;

  const uploadImage = () => {
    if (proImg === null) {
      refetch();
      return;
    }
    const formData = new FormData();
    formData.set("file", proImg);
    axios
      .post(`${base}/seller/product/update-image/${filename}`, formData, {
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
        URL.revokeObjectURL(proImg.preview);
        setProImg(null);
        onClose();
      });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    uploadImage();
  };

  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setProImg(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
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
          {!proImg ? (
            <>
              <input {...getInputProps()} />
              <BsImages size={40} />
              <Text fontWeight={"bold"} fontSize={18}>
                Choose an image or drag it here
              </Text>
              <Text> Support (.jpg .jpeg .png .gif .svg)</Text>
            </>
          ) : (
            <Flex flexWrap="wrap" flexDir="row" gap={2}>
              <PreviewImages />
            </Flex>
          )}
        </Flex>
      </Box>
    );
  };

  const PreviewImages = () => {
    return (<Image
    minW={70}
    boxSize={[70, 100]}
    objectFit="cover"
    src={proImg.preview}
    fallbackSrc="../logo.png"
    rounded="md"
  />)
  };

  return (
    <>
      <FaPencilAlt
        className="absolute top-1 right-10 bg-slate-400 rounded-full p-1 hover:text-orange-500"
        size={25}
        onClick={onOpen}
      />
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
            <AlertDialogHeader fontSize={23}>
              Update Product Image
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Text fontSize={18} my={2}>
                New Image
              </Text>
              <Dropzone />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  setProImg(null);
                }}
              >
                No
              </Button>
              <Button
                disabled={!proImg}
                type="submit"
                colorScheme="orange"
                ml={3}
              >
                Save
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateProductImage;
