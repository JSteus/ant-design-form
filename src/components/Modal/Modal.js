import {
  Input,
  InputNumber,
  Form,
  Divider,
  Button,
  DatePicker,
  Descriptions,
} from "antd";
import React, { useEffect, useState } from "react";

import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

import { Container, CustomButton } from "./styles.js";

import { dateFormat, numberFormat } from "../../utils/formatDate.js";

const initialValues = {
  discount: 0,
};

export function CustomModal({ isModalVisible, toggle }) {
  const [form] = Form.useForm();

  const [subtotals, setSubtotals] = useState([{ index: 0, subtotal: 0 }]);
  const [undiscountedAmount, setUndiscountedAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const getDiscount = () => {
    const value = form.getFieldValue("discount");

    setDiscount(value);
  };

  const getSubtotal = (index) => {
    const items = form.getFieldValue("items");
    const price = items[index].price;
    const amount = items[index].amount;
    const subtotal = amount * price;

    if (!price || !amount) {
      let newArray = [...subtotals];
      newArray[index] = { index, subtotal: 0 };
      setSubtotals(newArray);
      return;
    }

    let newArray = [...subtotals];
    newArray[index] = { index, subtotal: subtotal };
    setSubtotals(newArray);
  };

  const onFinish = (values) => {
    const momentDate = values.duedate ? values.duedate.toString() : "";
    const dayjsDate = momentDate ? dateFormat(momentDate) : "";
    const total = undiscountedAmount - discount;

    values.items.forEach((item, index) => {
      item.subtotal = subtotals[index];
    });

    const formatedValues = {
      ...values,
      duedate: dayjsDate,
      discount,
      undiscountedAmount,
      total,
    };
    console.log("Successo:", formatedValues, subtotals);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Erro:", errorInfo);
  };

  useEffect(() => {
    function sumSubtotals() {
      let sum = 0;
      for (var i = 0; i < subtotals.length; i++) {
        sum += subtotals[i].subtotal;
      }
      setUndiscountedAmount(sum);
    }

    sumSubtotals();
  }, [subtotals]);

  return (
    <Container
      centered
      title="Nova Proposta Comercial"
      visible={isModalVisible}
      onOk={() => toggle(false)}
      onCancel={() => toggle(false)}
      footer={false}
      width={960}
    >
      <Form
        initialValues={initialValues}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark="hidden"
        form={form}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Título"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira um título.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row wrap={false} gutter={8}>
          <Col span={16}>
            <Form.Item
              label="Cliente"
              name="client"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Validade do Orçamento"
              name="duedate"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <DatePicker
                placeholder="Digite ou Selecione"
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Form.List
          name="items"
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length < 1) {
                  return Promise.reject(new Error("Insira ao menos 1 item."));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Row wrap={false} gutter={8}>
                  <Col flex="50%">
                    <Form.Item
                      label={index === 0 ? "Item" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "item"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Este campo é obrigatório",
                          },
                        ]}
                        noStyle
                      >
                        <Input />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col flex="auto">
                    <Form.Item
                      label={index === 0 ? "Quantidade" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "amount"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message: "Este campo é obrigatório",
                          },
                        ]}
                        noStyle
                      >
                        <InputNumber
                          onChange={() => getSubtotal(index)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col flex="auto">
                    <Form.Item
                      label={index === 0 ? "Valor" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "price"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message: "Insira apenas numeros e ponto",
                            pattern: /^[-.0-9]+$/g,
                          },
                        ]}
                        noStyle
                      >
                        <InputNumber
                          prefix="R$"
                          style={{ width: "100%" }}
                          onChange={() => getSubtotal(index)}
                        />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col flex="auto">
                    <Form.Item
                      label={index === 0 ? "Subtotal" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Input value={numberFormat(subtotals[index]?.subtotal || 0)} />
                    </Form.Item>
                  </Col>
                  <Col
                    style={{ justifyContent: "center", alignItens: "center" }}
                  >
                    {fields.length > 1 && index !== 0 ? (
                      <CloseCircleOutlined
                        key={field.key}
                        onClick={() => remove(field.name)}
                        style={{
                          color: "red",
                          fontSize: "32px",
                          display: "flex",
                        }}
                      />
                    ) : (
                      <CloseCircleOutlined
                        style={{
                          color: "white",
                          fontSize: "32px",
                          display: "flex",
                        }}
                      />
                    )}
                  </Col>
                </Row>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Adicionar Item
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Row>
          <Col span={12} offset={12}>
            <Descriptions
              contentStyle={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Descriptions.Item label="Subtotal">
                {numberFormat(undiscountedAmount)}
              </Descriptions.Item>
            </Descriptions>
            <Divider />

            <Descriptions
              labelStyle={{ width: "50%" }}
              contentStyle={{ width: "50%" }}
            >
              <Descriptions.Item label="Desconto">
                <Form.Item
                  name="discount"
                  rules={[
                    {
                      required: false,
                      pattern: /^[-.0-9]+$/g,
                    },
                  ]}
                >
                  <InputNumber
                    prefix="R$"
                    style={{ width: "100%" }}
                    onChange={() => getDiscount()}
                  />
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>

            <Divider />
            <Descriptions
              contentStyle={{
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <Descriptions.Item label="Valor Total">
                {numberFormat(undiscountedAmount - discount)}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Form.Item>
          <CustomButton type="primary" htmlType="submit">
            Salvar
          </CustomButton>
        </Form.Item>
      </Form>
    </Container>
  );
}
