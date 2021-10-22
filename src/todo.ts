export interface Todo {
  id: number,
  name: string,
  description: string
}

export const emptyTodo = {
  id: 0,
  name: '',
  description: ''
}

export const BASEURL: string = "https://server-30-x-30.herokuapp.com/items/";
export const getUrlWithId = (id: number) => `${BASEURL}${id}`;