import { useEffect, useState } from 'react';
import Axios from 'axios';
import GlobalStyle from './styles/Global'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components'
import Form from './components/form';
import Grid from './components/Grid';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const response = await Axios.get('http://localhost:3000');
      setUsers(response.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      console.log(response.data);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>Usuários</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        
      </Container>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}  />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>
  )
}

export default App
