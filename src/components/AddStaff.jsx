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



const AddStaff = ({ isOpen, onClose, onAddUser }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    // Validasi atau manipulasi data input jika diperlukan

    // Membuat objek user baru
    const newUser = {
      name: name,
      role:role,
      email: email,
      phone: phone,
    };

    // Mengirim user baru ke parent component
    
const { data, error } = await supabase
.from('staff')
.insert([
 newUser
])
.select()


    // Reset nilai input
    setName("");
    setRole(" ");
    setEmail("");
    setPhone("");

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
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Role</FormLabel>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStaff;
