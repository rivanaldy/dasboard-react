import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { string, number, object } from "yup";
import { useForm } from "react-hook-form";
const validationSchema = object({
  productName: string().required("Product name is required"),
  productModel: string().required("Product model is required"),
  productPrice: number().required("Product price is required"),
  productStok: number().required("Product stock is required"),
});
const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // const [productName, setProductName] = useState("");
  // const [productModel, setProductModel] = useState("");
  // const [productPrice, setProductPrice] = useState("");
  // const [productStok, setProductStok] = useState("");
  // const [imageFile, setImageFile] = useState(""); // State untuk menyimpan berkas gambar

  //  const handleProductNameChange = (event) => {
  //     setProductName(event.target.value);
  //   };

  //   const handleProductModelChange = (event) => {
  //     setProductModel(event.target.value);
  //   };

  //   const handleProductPriceChange = (event) => {
  //     setProductPrice(event.target.value);
  //   };

  //   const handleProductStokChange = (event) => {
  //     setProductStok(event.target.value);
  //   };

  //   const handleFileChange = (event) => {
  //     setImageFile(event.target.files[0]);
  //   };

  const onSubmit = async (formData) => {
    try {
      await validationSchema.validate(formData); // Validasi input form
    } catch (error) {
      console.error("Validation error:", error.errors);
      return;
    }
    // Validasi atau manipulasi data sebelum menambahkan produk
    const newProduct = {
      name_product: formData.productName,
      model: formData.productModel,
      price: formData.productPrice,
      stock: formData.productStok,
    };
    // Jika ada berkas gambar yang diunggah
    if (formData.productImg) {
      const { data, error } = await supabase.storage
        .from("car")
        .upload(
          `products/${formData.productImg[0].name}`,
          formData.productImg[0]
        );
      console.log(data);
      if (error) {
        console.error("Error uploading image:", error);
      } else {
        newProduct.image_path = data.path;
      }
    }

    const { data, error } = await supabase.from("product").insert([newProduct]);

    console.log(newProduct);
    // Panggil fungsi onAddProduct untuk menambahkan produk

    // Reset form input
    // setProductName("");
    // setProductModel("");
    // setProductPrice("");
    // setProductStok("");
    // setImageFile("");
    // setImagePath("")

    // Tutup modal
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input type="text" {...register("productName",{ pattern: /^[A-Za-z]+$/i })} />{" "}
              {errors.productName && (
                <span className="text-red-500">
                  {errors.productName.message}
                </span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Product Model</FormLabel>
              <Input type="text" {...register("productModel")} />{" "}
              {errors.productModel && (
                <span className="text-red-500">
                  {errors.productModel.message}
                </span>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product Price</FormLabel>
              <Input type="number" {...register("productPrice")} />{" "}
              {errors.productPrice && (
                <span className="text-red-500">
                  {errors.productPrice.message}
                </span>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product Stock</FormLabel>
              <Input type="number" {...register("productStok")} />
              {errors.productStock && (
                <span className="text-red-500">
                  {errors.productStok.message}
                </span>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product Image</FormLabel>
              <Input type="file" {...register("productImg")} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
