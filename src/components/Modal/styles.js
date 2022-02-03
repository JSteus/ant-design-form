import styled from "styled-components";
import { Button, Modal } from "antd";

export const Container = styled(Modal)`
  max-width: 900px;
  margin: 3%;
  .ant-modal-header {
    display: flex;
    border: none;
    border-radius: 6px 6px 0 0;

    .ant-modal-title {
      font-weight: bold;
      font-size: 18px;
    }
  }

  .ant-modal-content {
    border-radius: 6px;
  }

  .ant-modal-footer {
    display: flex;
    border: none;
  }
`;

export const CustomButton = styled(Button)`
  background: #4900ff;
  border-radius: 5px;

  font-weight: bold;
`;

export const SubtotalTab = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
`;
