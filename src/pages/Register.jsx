import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Checkbox,
  Input,
  Button,
  Link,
  FormControl,
  FormLabel,
  useToast,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
function Register() {
//   const [register,setRegister]=useState({})
//   useEffect(()=>{
// console.log('halo')
//   },[register])
//   console.log(register)
  const toast = useToast();
  // const ref=useRef(nul)
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-md bg-gray-100 border p-10 rounded-xl flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold text-teal-700">Register</h1>
        <p className="text-2xl text-center ">Silahkan masukan data</p>
        <div>
          <div className="flex ">
            <FormControl>
              <FormLabel>nama depan</FormLabel>
              <Input 
                placeholder=" nama depan"
               
                type="text"
                colorScheme="teal"
                color={"teal"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>nama Belakang</FormLabel>
              <Input
            
                placeholder=" nama Belakang"
                type="text"
                colorScheme="teal"
                color={"teal"}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Username </FormLabel>

            <Input
          
              placeholder=" username"
              type="text"
              colorScheme="teal"
              color={"teal"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>email</FormLabel>
            <Input
          
              placeholder=" email"
              type="email"
              colorScheme="teal"
              color={"teal"}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>password</FormLabel>
            <Input
          
              placeholder=" password"
              type="password"
              colorScheme="teal"
              color={"teal"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>confirm password</FormLabel>
            <Input
          
              placeholder="confirm password"
              type="password"
              colorScheme="teal"
              color={"teal"}
            />
          </FormControl>
          <Checkbox className="font-thin"  defaultChecked >useragreement</Checkbox>
          <FormControl>
            <Button
              onClick={() =>
                toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                })
              }
              colorScheme="teal"
              width={"full"}
            >
              Register
            </Button>
          </FormControl>
          <div>
            <h4 className="text-center">
              Anda sudah punya akun?
              <LinkRouter to={'/Login'} >
              <Link colorScheme="teal" color={"teal"}>
                Login
              </Link>
              </LinkRouter>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
