import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const primaryColor = '#6c5ce7'; // Cor primária moderna
const hoverColor = '#a29bfe'; // Cor de hover
const whiteColor = '#fff';
const boxShadowColor = 'rgba(108, 92, 231, 0.5)';
const inputFocusColor = '#fdcb6e';
const borderRadius = '10px';
const transitionSpeed = '0.3s';

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #f8f9fa; // Um fundo mais suave
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1); // Sombra mais suave
  border-radius: 8px; // Cantos mais arredondados
  transition: box-shadow 0.3s ease; // Transição suave para sombra

  &:hover {
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15); // Sombra mais intensa no hover
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  transition: border-color 0.2s; // Transição suave para cor da borda

  &:focus {
    border-color: #007bff; // Cor da borda ao focar
    outline: none;
  }
`;

const Label = styled.label`
  margin-bottom: 5px; // Espaçamento abaixo do label
  color: #495057; // Cor do texto mais suave
`;

const Button = styled.button`
  padding: 10px 15px; // Padding um pouco maior
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #007bff; // Cor primária mais moderna
  color: white;
  height: 42px;
  transition: background-color 0.2s, transform 0.2s; // Transição para cor e transformação

  &:hover {
    background-color: #0056b3; // Cor de hover mais escura
    transform: translateY(-2px); // Eleva o botão ligeiramente no hover
  }
`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;