import React from 'react'
import Axios from 'axios'
import { useRef } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1120px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }

`;

export const Td = styled.td``;

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (id) => {
        setOnEdit(id)
    }

    const handleDelete = async (id) => {
        try {
            await Axios.delete(`http://localhost:3000/${id}`)
            .then(({ data }) => {
                setUsers(users.filter((user) => user.id !== id))
                toast.warn(data)
            })
            
        } catch (error) {
            console.error(error)
            toast.error(({ data }) => data)
        }
     setOnEdit(null)
    }   

  return (
    <div>
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Phone</Th>
                    <Th>Birthday</Th>
                    <Th></Th>
                </Tr>
            </Thead>

            <Tbody>
                {users.map((user) => (
                    <Tr key={user.id}>
                        <Td>{user.nome}</Td>
                        <Td>{user.email}</Td>
                        <Td onlyWeb>{user.telefone}</Td>
                        <Td>{user.data_nascimento}</Td>
                        <Td>
                            <FaEdit onClick={() => handleEdit(user)}/>
                        </Td>
                        <Td>
                            <FaTrash onClick={() => handleDelete(user.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>

        </Table>
    </div>
  )
}

export default Grid