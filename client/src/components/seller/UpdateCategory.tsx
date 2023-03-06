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
import { BsImages } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCookies } from "react-cookie";
import useCustomToast from "../../hooks/useCustomToast";

const UpdateCategory: React.FC<{
  name: string;
  imageUrl: any;
  id: number;
  refetch: VoidFunction;
}> = ({ name, imageUrl, id, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [cookie] = useCookies(["token"]);
  const [catName, setCatName] = useState<string>(name);
  const [catImg, setCatImg] = useState<null | File>(null);
  const toast = useCustomToast();
  const base = `${process.env.REACT_APP_API_URL}`;

  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setCatImg(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    });

    return (
      <Box h={200} w={400} className="border rounded-md" key={id}>
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
                Choose an image and drag it here
              </Text>
              <Text> Support (.jpg .jpeg .png .gif .svg)</Text>
            </>
          ) : (
            <Text fontWeight={"bold"} fontSize={18}>
              Click <b>Update</b> to upload image
            </Text>
          )}
        </Flex>
      </Box>
    );
  };

  const updateCate = () => {
    axios
      .put(
        `${base}/seller/category/${id}`,
        { name: catName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then(() => {
        refetch();
        toast("Updated category successfully", "success");
      })
      .catch((err) => {
        toast(err, "error");
      }).finally(() => {onClose()});
  };

  const handleSubmit = (e: any) => {
    
    e.preventDefault();

    if (catImg !== null) {
      console.log(catName, "cname")
      const formData = new FormData();
      formData.set("file", catImg);
      !!imageUrl
        ? axios
            .put(`${base}/seller/category/image/update/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookie.token}`,
              },
            })
            .then(() => {
              if (catName !== name) updateCate();
              else {
                refetch();
                toast("Upload image successfully", "success");
              }
            })
            .catch((err) => {
              toast(err, "error");
            })
            .finally(() => {
              onClose();
              setCatImg(null);
            })
        : axios
            .post(`${base}/seller/category/image/upload/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookie.token}`,
              },
            })
            .then(() => {
              if (catName !== name) updateCate();
              else {
                refetch();
                toast("Upload image successfully", "success");
              }
            })
            .catch((err) => {
              toast(err, "error");
            })
            .finally(() => {
              onClose();
              setCatImg(null);
            });
    } else catName !== name && updateCate();
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
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader fontSize={23}>Update Category</AlertDialogHeader>
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
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  setCatImg(null);
                  setCatName(name);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="orange" ml={3}>
                Update
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateCategory;
