import React from "react";

import { PaginationContainer, StyledButton, PageNumber } from "./styles";

export const Pagination = ({ currentPage, setPage, totalpages }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevpage) => prevpage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalpages) {
      setPage((prevpage) => prevpage + 1);
    }
  };

  if (totalpages === 0) {
    return null;
  }

  return (
    <PaginationContainer>
      <StyledButton
        onClick={handlePrev}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </StyledButton>
      <PageNumber variant="h4">{currentPage}</PageNumber>
      <StyledButton
        onClick={handleNext}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </StyledButton>
    </PaginationContainer>
  );
};
