import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CategoryList, IToDo, toDoState } from "../atoms";

const ToDoContainer = styled.div`
  margin: 10px;
  background-color: ${props => props.theme.bgColor};
  padding: 10px;
  border-radius: 5px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  span {
    margin: 5px;
    font-size: 17px;
  }
  button {
  width: 40px;
  height: 20px;
  margin-left: 5px;
  background-color: lightgray;
  border: 0;
  border-radius: 5px;
  font-size: 12px;
  &:hover {
    transform: scale(1.05);
    background-color: #FC7D68;
  }
  }
`;

const CategoryBtn = styled.button`
  height: 18px;
  margin-left: 5px;
  background-color: white;
  border: 0;
  border-radius: 5px;
  font-size: 10px;
  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.theme.accentColor};
  }
`;

const ToDo = ({ text, id, category }: IToDo) => {
  const categories = useRecoilValue(CategoryList);
  const setToDos = useSetRecoilState(toDoState);

  const handleDelete = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.id !== id);
    });
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = {text, id, category: name as any};
      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    })
  };

  return (
    <ToDoContainer>
      <li>
        <TextBox>
          <span>{text}</span>
          <button onClick={handleDelete}>DEL</button>
        </TextBox>
        <div>
          {categories.map((cat) => (
            <CategoryBtn name={cat} onClick={handleClick}>{cat}</CategoryBtn>
          ))}
        </div>
      </li>
    </ToDoContainer>
  );
};

export default ToDo;
