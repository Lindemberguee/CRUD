import React from 'react';
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify";


const Table = styled.table`
  width: 100%;
  background-color: #f8f9fa; // Cor de fundo mais suave
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1); // Sombra mais sutil
  border-radius: 8px; // Cantos arredondados
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead`
  background-color: #e9ecef; // Cor de fundo para o cabeçalho
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:hover {
    background-color: #f1f3f5; // Efeito de hover para as linhas
  }
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: 2px solid #dee2e6; // Borda inferior mais definida
  padding-bottom: 5px;
  color: #495057; // Cor do texto
  font-weight: 500; // Peso da fonte

  @media (max-width: 500px) {
    ${props => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${props => (props.alignCenter ? "center" : "start")};
  width: ${props => (props.width ? props.width : "auto")};
  color: #6c757d; // Cor do texto

  @media (max-width: 500px) {
    ${props => props.onlyWeb && "display: none"}
  }
`;






const Grid = ({users, setUsers, setOnEdit}) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  }


  const handleDelete = async (id) => {
    await axios
    .delete("http://localhost:8800/" + id)
    .then(({data}) => {
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(data);
    })
    .catch(({data}) => toast.error(data));

    setOnEdit(null)
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td widht="30%">{item.nome}</Td>
            <Td widht="30%">{item.email}</Td>
            <Td widht="20%" onlyWeb>
              {item.nome}
              </Td>
              <Td alignCenter widht="5%">
                <FaEdit onClick={()=> handleEdit(item)}/>
              </Td>
              <Td alignCenter widht="5%">
                <FaTrash onClick={()=> handleDelete(item.id)}/>
              </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Grid;