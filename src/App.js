import styled from "styled-components";

export const App = styled.div`
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  .workarea{
      height: 90vh;
      padding: 0 40px 40px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .container{
        overflow-y: auto;
      }
  }
`
