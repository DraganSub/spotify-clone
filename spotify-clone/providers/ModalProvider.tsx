"use client"

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // set modal to be open to avoid server side errors 
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <AuthModal />
  )
}

export default ModalProvider;