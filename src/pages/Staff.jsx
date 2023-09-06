import React, { useEffect } from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import BaseLayout from "../components/Baselayout";
import { faker } from "@faker-js/faker/locale/id_ID";
import Table from "../components/Table";
import { useState } from "react";
import AddStaff from "../components/AddStaff";
import { supabase } from "../supabaseClient";





const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [dataStaff,setDataStaff]=useState([''])
const getStaff=async()=>{
  let { data: staff, error } = await supabase
.from('staff')
.select('*')
setDataStaff(staff)
}
useEffect(()=>{
  getStaff()
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
        role: faker.name.jobTitle(),
        email: faker.internet.email(),
        phone: faker.phone.number("+62 89 ### ## ##"),
      };
      data.push(row);
    }
    return data;
  };

  // Dummy data for customers
  const staff = generateData(50);

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
      header: "Role",
      accessor: "role",
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
            Staff
          </Heading>
          <Flex justify="flex-end" mb={4}>
            <Button colorScheme="teal" size="sm" onClick={handleOpenModal}>
              Tambah Staff
            </Button>
          </Flex>
          <Table columns={columns} data={dataStaff} ></Table>
        </Box>
      </div>
      <AddStaff
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddUser={handleAddUser}
      />
    </BaseLayout>
  );
};

export default Staff;
