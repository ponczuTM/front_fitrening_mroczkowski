import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServicesContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000000;
`;

export const ServicesWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;
`;

export const ServicesCard = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 700px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;

export const ServicesIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 30px;
`;

export const ServicesH1 = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 64px;
`;
export const ServicesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
`;

export const Shopping = styled(Link)`
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
  color: #3471eb;
`;
