import { Box, Heading, Text, Flex, Button, Input } from "@chakra-ui/react";
import BaseLayout from "../components/Baselayout";
import { useState,useEffect } from "react";
import Table from "../components/Table";
import AddProductModal from "../components/AddProductModal";
import { supabase } from "../supabaseClient";

const InventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(['']);

  const [dataProduct, setDataProduct] = useState(['']);
  const getProduct = async () => {
    let { data: product, error } = await supabase.from("product").select("*");
    setDataProduct(product);
  };
  useEffect(() => {
    getProduct();
  },[]);

  const handleAddProduct = (newProduct) => {
    // Menambahkan produk ke daftar produk
    setProducts([...products, newProduct]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 

  const columns = [
    {
      header: "ID Produk",
      accessor: "id",
    },
    {
      header: "Car",
      accessor: "name_product",
    },
    {
      header: "Model",
      accessor: "model",
    },
    {
      header: "Price",
      accessor: "price",
    },
    {
      header: "Stok",
      accessor: "stock",
    },
  ];
  return (
    <BaseLayout>
      <div className="p-16 rounded-lg bg-white">
        <Box p={4} className="bg-white rounded-lg">
          <Heading size="lg" mb={4}>
            Inventory
          </Heading>
          <div className="w-full  flex flex-row justify-between  py-5">
            <div className="flex flex-row justify-center items-center gap-4">
              <Input
                placeholder="Search"
                size={"md"}
                color={"teal"}
                w={400}
              ></Input>
              <Button>Search</Button>
            </div>
            <div>
              <Button colorScheme="teal" mr={2} onClick={handleOpenModal}>
                Add Product
              </Button>
              <Button colorScheme="gray">Export CSV</Button>
            </div>
          </div>
          <Table columns={columns} data={dataProduct} itemsPerPage={10} />
        </Box>
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddProduct={handleAddProduct}
      />
    </BaseLayout>
  );
};

export default InventoryPage;


