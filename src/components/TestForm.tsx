import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import axios from "axios";
import { useState } from "react";

interface FormRequest {
  email: string;
  number: string;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 500px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  background: #fff;
  border-radius: 16px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`;

const Title = styled.h2`
  font-size: 40px;
  font-style: normal;
  line-height: normal;
`;

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const CustomField = styled(Field)`
  display: flex;
  width: 452px;
  height: 56px;
  padding: 12px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid #ededed;
  background: #f5f5f5;
`;

const NumberInput = styled(MaskedInput)`
  width: 452px;
  height: 56px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid #ededed;
  background: #f5f5f5;
`;

const CustomButton = styled.button`
  margin-top: 24px;
  padding: 10px 12px;
  border: none;
  border-radius: 12px;
  background-color: #34a753;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  cursor: pointer;
  color: #fff;
`;

const CustomErrorMessage = styled(ErrorMessage)`
  color: red;
`;

export const TestForm = () => {
  const [data, setData] = useState<null | FormRequest[]>(null);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (body: FormRequest) => {
    axios
      .post("http://localhost:4444/search", body)
      .then((res) => setData(res.data))
      .catch((e) => setError("Сервер не отвечает, попробуйте позже"));
  };

  return (
    <>
      <Wrapper>
        <FormWrapper>
          <Title>Форма</Title>
          <Formik
            initialValues={{
              email: "",
              number: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Неправильный email адрес")
                .required("Обязательное поле"),
              number: Yup.string().matches(
                /^(\d{2}-){2}\d{2}$/,
                "Неверный формат номера"
              ),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            <CustomForm>
              <CustomField
                id="email"
                name="email"
                type="email"
                placeholder="Почта"
              />
              <CustomErrorMessage name="email" component="div" />
              <CustomField name="number">
                {({ field }: { field: any }) => (
                  <>
                    <NumberInput
                      {...field}
                      id="number"
                      type="tel"
                      placeholder="Номер"
                      mask="99-99-99"
                    />
                  </>
                )}
              </CustomField>
              <CustomErrorMessage name="number" component="div" />

              <CustomButton type="submit">Отправить</CustomButton>
            </CustomForm>
          </Formik>
        </FormWrapper>
        {error ? (
          error
        ) : data ? (
          <ul>
            {data.length === 0
              ? "Данные отсутствуют"
              : data.map((item: FormRequest) => (
                  <li
                    key={item.number}
                  >{` почта: ${item.email}, номер: ${item.number}`}</li>
                ))}
          </ul>
        ) : null}
      </Wrapper>
    </>
  );
};
