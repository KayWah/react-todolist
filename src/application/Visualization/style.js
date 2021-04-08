import styled from "styled-components";
import style from "../../assets/global-style";

export const TodoListWrapper = styled.div`
  position: relative;
`;
export const LoadingWrapper = styled.div`
  position: relative;
  line-height: 5em;
  font-size: 24px;
`;

export const NewTodoWrapper = styled.div`
  z-index: 9;
  position: absolute;
  right: 0;
  left: 0;
  background-color: #fff;
`;
