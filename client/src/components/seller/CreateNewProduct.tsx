import React, { useCallback, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Input,
  Image,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  SelectField,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDropzone } from "react-dropzone";
import useCustomToast from "../../hooks/useCustomToast";

const CreateNewProduct: React.FC<{ refetch: VoidFunction }> = ({ refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [cookie] = useCookies(["token"]);
  const [proName, setProName] = useState("");
  const [proPrice, setProPrice] = useState("");
  const [proQty, setProQty] = useState("");
  const [proDesc, setProDesc] = useState("");
  const [categories, setCateogories] = useState<any[]>([]);
  const [catReq, setCatReq] = useState<any[]>([]);
  const [proImgs, setProImgs] = useState<any[] | null>(null);
  const toast = useCustomToast();

  const base = `${process.env.REACT_APP_API_URL}`;

  const fetchCategories = () => {
    axios
      .get(`${base}/seller/category/dropdown`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setCateogories(res.data.data);
      })
      .catch(() => {
        toast("Category dropdown error", "error");
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const uploadImage = (id: number) => {
    if (proImgs === null) {
      refetch();
      return;
    }
    const formData = new FormData();
    proImgs.forEach((file) => {
      formData.append("files", file);
    });
    axios
      .post(`${base}/seller/product/upload-image/${id}`, formData, {
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
        proImgs.forEach((file) => {
          URL.revokeObjectURL(file.preview);
        });
        setProImgs(null);
      });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const productReq = {
      name: proName,
      qty: proQty,
      price: proPrice,
      description: proDesc,
      categories: catReq,
    };
    axios
      .post(`${base}/seller/product/`, productReq, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        uploadImage(res.data.data.id);
      })
      .catch((err) => {
        toast(err.response.data.message, "error");
      })
      .finally(() => {
        onClose();
        toast("Create successfully", "success");
      });
  };

  const PreviewImages = () => {
    return (
      <>
        {proImgs?.map((file, key) => (
          <Image
            key={key}
            minW={70}
            boxSize={[70, 100]}
            objectFit="cover"
            src={file.preview}
            fallbackSrc="../logo.png"
            rounded="md"
          />
        ))}
      </>
    );
  };

  // todo get categories from dropdown ... image preview

  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      setProImgs(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    });

    return (
      <Box h={200} mx="auto" className="border rounded-md">
        <Flex
          flexDir={"column"}
          justify={"center"}
          alignItems={"center"}
          h="100%"
          {...getRootProps({ className: "dropzone" })}
        >
          {!proImgs ? (
            <>
              <input {...getInputProps()} />
              <BsImages size={40} />
              <Text fontWeight={"bold"} fontSize={18}>
                Choose images or drag them here
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

  return (
    <>
      <Button onClick={onOpen}>
        <BiPlus size={30} />
        Create New Product
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="2xl"
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <form onSubmit={handleFormSubmit}>
          <AlertDialogHeader fontSize={23}>New Product</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Grid mb={5} gridAutoFlow={"column"} gap={5}>
              <Stack>
                <Text fontSize={18}>Product Name</Text>
                <Input
                  placeholder="....."
                  onChange={(e) => setProName(e.target.value)}
                ></Input>
              </Stack>

              <Stack>
                <Text fontSize={18}>Add to category</Text>
                <Select
                  placeholder="Choose Category"
                  aria-multiselectable
                  onChange={(e) => {
                    setCatReq([{id: +e.target.value}]);
                  }}
                >
                  <>
                    {
                    categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                    }
                  </>
                </Select>
              </Stack>
            </Grid>
            <Grid mb={5} gridAutoFlow={"column"} gap={5}>
              <Stack>
                <Text fontSize={18}>Qty</Text>
                <Input
                  placeholder="....."
                  onChange={(e) => setProQty(e.target.value)}
                  mb={5}
                ></Input>
              </Stack>
              <Stack>
                <Text fontSize={18}>Price</Text>
                <Input
                  placeholder="....."
                  onChange={(e) => setProPrice(e.target.value)}
                  mb={5}
                ></Input>
              </Stack>
            </Grid>
            <Text fontSize={18}>Description</Text>
            <Textarea
              placeholder="....."
              onChange={(e) => setProDesc(e.target.value)}
              mb={5}
            ></Textarea>
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
                setProImgs(null);
              }}
            >
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

export default CreateNewProduct;
