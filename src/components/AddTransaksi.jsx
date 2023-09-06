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
const AddTransaksi = ({ isOpen, onClose, onAddUser }) => {
  const [product, setProduct] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
  

    // Validasi atau manipulasi data input jika diperlukan

    // Membuat objek user baru
    const newUser = {
      product: product,
      date: date,
      amount: amount,
    };

    // Mengirim user baru ke parent component
    const { data, error } = await supabase
    .from('transaction')
    .insert([
      newUser
    ])
    .select()

    // Reset nilai input
    setProduct("");
    setDate("");
    setAmount("");

    // Menutup modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product</FormLabel>
            <Input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter product"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter date"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>amount</FormLabel>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Transaksi
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTransaksi;
