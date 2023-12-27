import styled from "styled-components";

export const publicWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow-y: scroll;
`;

export const left = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media screen and (max-width: 1440px) {
    flex-direction: column;
  }
`;

export const ParentCodeBox1 = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;

  @media screen and (max-width: 1440px) {
    height: 40%;
    width: 90%;
  }

  @media screen and (max-width: 360px) {
    height: 40%;
    width: 90%;
  }
`;

export const Between = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  justify-content: center;

  padding-top: 50px;

  @media screen and (max-width: 1440px) {
    width: 100%;
    height: 1%;
  }
`;

export const ParentCodeBox2 = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  padding-top: 50px;

  @media screen and (max-width: 1440px) {
    height: 40%;
    width: 90%;
  }
`;

export const StateCodeNameBox = styled.div`
  width: 100%;
  width: 100%;
`;

// export const right = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
// `;

// export const ParentCodeBox3 = styled.div`
//   width: 98%;
//   height: 60%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
// `;

// export const ParentCodeBox4 = styled.div`
//   width: 98%;
//   height: 50%;
//   overflow: hidden;
// `;

// export const dataGridStyle = {
//   height: "350px",
//   width: "100%",
//   editButton: { display: "none" },
// };
