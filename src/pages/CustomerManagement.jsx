import React, { useEffect } from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import BaseLayout from "../components/Baselayout";
import { faker } from "@faker-js/faker/locale/id_ID";
import Table from "../components/Table";
import AddUserModal from "../components/AddCustomer";
import { useState } from "react";
import { supabase } from "../supabaseClient";




const CustomerManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);


  const [dataCustomer,setDataCustomer]=useState([''])
 
const getCustomer = async()=>{
  let { data: customer, error } = await supabase
.from('customer')
.select('*')
setDataCustomer(customer)
}
useEffect(()=>{
  getCustomer()
},[])
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };
  const generateData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const row = {
        id: i + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number("+62 89 ### ## ##"),
      };
      data.push(row);
    }
    return data;
  };

  // Dummy data for customers
  const customers = generateData(1000);

  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
  ];

  return (
    <BaseLayout>
      <div className="bg-white p-16 rounded-lg">
        <Box p={4}>
          <Heading size="lg" mb={4}>
            Customer Management
          </Heading>
          <Flex justify="flex-end" mb={4}>
            <Button colorScheme="teal" size="sm" onClick={handleOpenModal}>
              Tambah Customer
            </Button>
          </Flex>
          <Table columns={columns} data={dataCustomer}></Table>
        </Box>
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddUser={handleAddUser}
      />
    </BaseLayout>
  );
};

export default CustomerManagementPage;
