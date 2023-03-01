import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../atoms';
import { Btn } from './Categories';

const Form = styled.form`
  margin: 10px;
  input {
    border: 0;
    background-color: ${props => props.theme.bgColor};
    border-radius: 5px;
    margin-right: 10px;
    width: 300px;
    height: 35px;
    padding: 0 10px;
    font-size: 16px;
  }
`;
const BtnAdd = styled(Btn)`
  width: 50px;
  height: 35px;
  font-size: 15px;
  &:hover {
    transform: scale(1.05);
  }
`;

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => {
    setToDos(oldToDos => [...oldToDos, {text: toDo, id: Date.now(), category}])
    setValue("toDo", "");
  };

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos))
  }, [toDos]);

  return (
    <div>
      <Form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", {
          required: "Please  write a To Do",
        })} placeholder="write a to do" />
        <BtnAdd>Add</BtnAdd>
      </Form>
    </div>
  )
}

export default CreateToDo;
