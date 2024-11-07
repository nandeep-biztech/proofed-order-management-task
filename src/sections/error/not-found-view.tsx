'use client';

import { BackButton, Description, NotFoundWrapper, Subtitle, Title } from "@/components/styles/not-found.styles";

export function NotFoundView() {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <NotFoundWrapper>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>
        The page you are looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.
      </Description>
      <BackButton onClick={handleBackClick}>Go Back</BackButton>
    </NotFoundWrapper>
  );
}