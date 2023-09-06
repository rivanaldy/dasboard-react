import React from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import BaseLayout from "../components/Baselayout";
import AddTransaksi from "../components/AddTransaksi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { supabase } from "../supabaseClient";
import Table from "../components/Table";
import { useState, useEffect } from "react";


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const SalesPage = () => {
  // Dummy data for sales statistics
  const totalSales = 1500;
  const averageSales = 50;
  const dailySales = 100;
  const monthlySales = 3000;
  const yearlySales = 36000;

 const[isModalOpen,setIsModalOpen]=useState(false)
 const [users, setUsers] = useState([]);
  const [dataTransaksi,setDataTransaksi]=useState([''])
  const getTransaksi = async()=>{
    let { data: transaction, error } = await supabase
.from('transaction')
.select('*')
setDataTransaksi(transaction)
  }
  useEffect(()=>{
    getTransaksi()
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
 
  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Product",
      accessor: "product",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Amount",
      accessor: "amount",
    }
  ];
  return (
    <BaseLayout>
      <div className="p-20 rounded-lg bg-white">
        <Heading size="lg" mb={4} color="teal.500">
          Sales
        </Heading>
        <Flex flexWrap="wrap">
          <Stat colorScheme="teal">
            <StatLabel>Total Sales</StatLabel>
            <StatNumber>{totalSales}</StatNumber>
          </Stat>
          <Stat colorScheme="teal">
            <StatLabel>Average Sales</StatLabel>
            <StatNumber>{averageSales}</StatNumber>
          </Stat>
          <Stat colorScheme="teal">
            <StatLabel>Daily Sales</StatLabel>
            <StatNumber>{dailySales}</StatNumber>
          </Stat>
          <Stat colorScheme="teal">
            <StatLabel>Monthly Sales</StatLabel>
            <StatNumber>{monthlySales}</StatNumber>
          </Stat>
          <Stat colorScheme="teal">
            <StatLabel>Yearly Sales</StatLabel>
            <StatNumber>{yearlySales}</StatNumber>
          </Stat>
        </Flex>
        <Box mt={8}>
          <Heading size="md" mb={4} color="teal.500">
            Sales Chart
          </Heading>
          <Line options={options} data={data} />
        </Box>
        <Box mt={8}>
          <Heading size="md" mb={4} color="teal.500">
            Transaction History
          </Heading>
          <Flex justify="flex-end" mb={4}>
            <Button colorScheme="teal" size="sm" onClick={handleOpenModal}>
              Tambah Product
            </Button>
          </Flex>
          <Table columns={columns} data={dataTransaksi} ></Table>
        
        </Box>
      </div>
      <AddTransaksi
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddUser={handleAddUser}
      />
    </BaseLayout>
  );
};

export default SalesPage;
