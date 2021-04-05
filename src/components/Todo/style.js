import styled from "styled-components";
import style from "../../assets/global-style";

export const TodoWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-flow: nowrap;
  font-size: 14px;
  margin: 0 0 1em 0;
  align-items: start;
  padding-bottom: 1em;
  border-bottom: 1px solid #dcdcdc;
  .chackbox{
      margin-right: 1em;
      //align-items: center;
      .ant-checkbox{
          top: 0;
      }
  }
  .task-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .content{
    display: flex;
    width: 100%;
    margin-bottom: 1em;
  }
  .delete{
    margin-left: auto;
    cursor: pointer;
  }

`;
