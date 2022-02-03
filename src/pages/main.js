import React, { useState } from "react";
import { CustomModal } from "../components/Modal/Modal.js";

import { Container, CustomButton } from "./styles.js";

export function Main() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <CustomModal isModalVisible={openModal} toggle={setOpenModal}/>
      <Container>
        <CustomButton type="primary" onClick={() => setOpenModal(true)}>
          Criar Proposta
        </CustomButton>
      </Container>
    </>
  );
}
