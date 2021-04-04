import styled from "styled-components";
import style from "../../assets/global-style";

export const TodoWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-flow: nowrap;
  align-items: center;
  font-size: 14px;
  height: 2em;
  margin: 0 0 1em 0;
  .chackbox{
      margin-right: 1em;
      align-items: center;
      .ant-checkbox{
          top: 0;
      }
  }
  .delete{
    margin-left: auto;
    cursor: pointer;
  }

`;
