"use client"

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";

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
    <Modal
      title="Title Modal"
      description="Test Description"
      isOpen
      onChange={() => { }}
    >
      Test Children
    </Modal>
  )
}

export default ModalProvider;