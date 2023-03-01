import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CategoryList, categoryState } from "../atoms";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const Select = styled.select`
  margin: 0 10px;
  width: 150px;
  height: 30px;
  background-color: ${props => props.theme.bgColor};
  border: 0;
  border-radius: 5px;
  padding: 0 5px;
`;

export const Btn = styled.button`
  background-color: ${props => props.theme.accentColor};
  font-size: 23px;
  font-weight: 500;
  border: 0;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  &:hover {
    transform: scale(1.05);
  }
`;

const CategorySelect = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(CategoryList);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }

  const addCategory = () => {
    const newCategory = prompt("새로운 카테고리를 작성해주세요.", "");

    if(newCategory) {
      if(categories.includes(newCategory)) {
        alert("동일한 이름의 카테고리가 존재합니다. 다른 이름을 작성해주세요.");
      }
      setCategories([...categories, newCategory]);
    }
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories]);

  return (
    <Container>
      <Select value={category} onInput={onInput}>
        {categories.map(cat => (
          <option value={cat}>{cat}</option>
        ))}
      </Select>
      <Btn onClick={addCategory}>+</Btn>
    </Container>
  );
};

export default CategorySelect;
