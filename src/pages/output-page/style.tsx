import styled from "styled-components";

export const OutputPageStyled = styled.div`
  .inverted-pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .block {
    margin: 5px; /* Adjust the margin as needed */
  }

  .block-1 {
    width: 100%;
    background-color: #2ecc71;
  }

  .block-2 {
    width: 80%;
    background-color: #3498db;
  }

  .block-3 {
    width: 60%;
    background-color: #9b59b6;
  }

  .block-4 {
    width: 40%;
    background-color: #f39c12;
  }

  .block-5 {
    width: 20%;

    background-color: #e74c3c;
  }

  @media (max-width: 600px) {
    /* Add responsive styles here if needed */
  }
`;
