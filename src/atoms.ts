import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const CategoryList = atom<string[]>({
  key: "categoryList",
  default: JSON.parse(localStorage.getItem("categories") ?? `["TO_DO", "DOING", "DONE"]`)
})

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") ?? "[]"),
});

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO,
});

// selector는 변형시킴
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
