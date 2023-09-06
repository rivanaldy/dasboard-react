import React from "react";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import {
  Link,
  Box,
  Flex,
  IconButton,
  Icon,
  Button,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { faker } from "@faker-js/faker/locale/id_ID";
import Login from "../pages/Login";
import { supabase } from "../supabaseClient";
import Logout from "../pages/Logout";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Topbar = ({ isSidebarExpanded, toggleSidebar }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleNotificationClick = () => {
    // Implementasikan logika untuk menangani klik notifikasi
  };

  const handleProfileClick = () => {
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem></MenuItem>
      </MenuList>
    </Menu>;
  };

  const { pathname } = useLocation();
  function capitalizeWords(sentence) {
    const words = sentence.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  return (
    <Box
      as="header"
      bg={"skyblue"}
      color="white"
      px={4}
      py={2}
      boxShadow="md"
      position="fixed"
      top={0}
      left={isSidebarExpanded ? "250px" : "72px"}
      right={0}
      zIndex="sticky"
      transition="left 0.3s ease-in-out"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Breadcrumb spacing="8px" color="white">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {pathname != "/" && (
              <BreadcrumbItem>
                <BreadcrumbLink href={pathname}>
                  {capitalizeWords(pathname.replace("-", " ").replace("/", ""))}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Spacer />
        <Box>
          <Popover
            isOpen={isPopoverOpen}
            onClose={handlePopoverClose}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                aria-label="Notifications"
                icon={<Icon as={FiBell} />}
                variant="ghost"
                size="lg"
                mr={4}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to have that milkshake?
              </PopoverBody>
            </PopoverContent>
          </Popover>

          

          <Menu>
            <MenuButton colorScheme="teal" as={Button} leftIcon={<Icon as={FiUser} />} rightIcon={<ChevronDownIcon />}>
            {"Rivan"}
            </MenuButton>
            <MenuList>
              <MenuItem> <Logout /> </MenuItem>
            </MenuList>
          </Menu>
         
        </Box>
      </Flex>
    </Box>
  );
};

export default Topbar;
