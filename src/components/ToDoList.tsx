import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "../atoms";
import CategorySelect from "./Categories";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;
const Container = styled.div`
  width: 450px;
  height: 90vh;
  background-color: ${props => props.theme.cardBgColor};
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;
const Line = styled.hr`
  height: 3px;
  border: 0;
  background-color: ${props => props.theme.textColor};
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Wrapper>
      <Container>
        <Title>To Dos</Title>
        <Line />
        <CategorySelect />
        <CreateToDo />
        <ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </Container>
    </Wrapper>
  )
}

export default ToDoList;
