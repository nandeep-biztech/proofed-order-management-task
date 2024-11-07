import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f9fc;
  color: #333;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  color: #ff6b6b;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #555;
  margin: 20px 0;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #777;
  max-width: 400px;
  text-align: center;
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
