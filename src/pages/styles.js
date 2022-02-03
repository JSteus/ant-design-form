import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

export const CustomButton = styled(Button)`
  background: #4900ff;
  border-radius: 5px;

  font-weight: bold;
`;
