import styled from "styled-components";

export const publicWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const left = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 360px) and (max-width: 1440px) {
    flex-direction: column;
  }
  /* overflow: hidden; */
`;

export const ParentCodeBox1 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    width: 98%;
    height: 35%;
  }
`;

export const ParentCodeBox2 = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    width: 98%;
    height: 65%;
  }
`;

export const ParentGridBox = styled.div`
  width: 98%;
  height: 98%;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    width: 98%;
    height: 95%;
  }
`;

export const ChildGridBox = styled.div`
  width: 98%;
  height: 98%;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    width: 98%;
    height: 95%;
  }
`;

export const StateCodeNameBox = styled.div`
  width: 100%;
  width: 100%;
`;

// export const Between = styled.div`
//   width: 2%;
//   height: 100%;
//   display: flex;
//   justify-content: center;

//   @media screen and (min-width: 360px) and (max-width: 1440px) {
//     height: 3%;
//   }
// `;

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
