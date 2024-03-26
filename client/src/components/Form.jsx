import {useEffect, useRef} from 'react'
import Axios from 'axios'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
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
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef()

    useEffect(() => {
        if (onEdit) {
            ref.current.nome.value = onEdit.nome
            ref.current.email.value = onEdit.email
            ref.current.telefone.value = onEdit.telefone
            ref.current.data_nascimento.value = onEdit.data_nascimento
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
        !user.nome.value ||
        !user.email.value ||
        !user.telefone.value ||
        !user.data_nascimento.value
        ) {
        return toast.error("Preencha todos os campos!");
        }

        if (onEdit) {
        await Axios
            .put("http://localhost:3000/" + onEdit.id, {
            nome: user.nome.value,
            email: user.email.value,
            telefone: user.telefone.value,
            data_nascimento: user.data_nascimento.value,
            })
            .then(({data}) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
        await Axios
            .post("http://localhost:3000", {
            nome: user.nome.value,
            email: user.email.value,
            telefone: user.telefone.value,
            data_nascimento: user.data_nascimento.value,
            })
            .then(({data}) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        user.nome.value = "";
        user.email.value = "";
        user.telefone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();
  };

  return (
    <div>
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>First Name</Label>
                <Input name='nome' type="text" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name='email' type="email" />
            </InputArea>
            <InputArea>
                <Label>Phone</Label>
                <Input name='telefone' />
            </InputArea>
            <InputArea>
                <Label>Birthday</Label>
                <Input name='data_nascimento' type="date" />
            </InputArea>
            <Button type='submit'>Enviar</Button>
        </FormContainer>
    </div>
  )
}

export default Form