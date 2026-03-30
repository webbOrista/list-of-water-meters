import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f2939;
  border: 1px solid #ced5de;
  background-color: ${(props) => (props.$active ? '#e0e0e0' : '#ffffff')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Dots = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ced5de;
  background-color: white;
  border-radius: 4px;
  font-size: 14px;
  color: #1f2939;
`;

const Pagination = ({
  currentPage,
  totalPages,
  changePage,
  loading,
}: {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
  loading: boolean;
}) => {
  const getPageNumbers = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push('dots');
    }

    if (currentPage > 2 && currentPage !== 2) {
      pages.push(currentPage - 1);
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    if (currentPage < totalPages - 1 && currentPage !== totalPages - 1) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 3) {
      pages.push('dots');
    }

    if (totalPages > 3) {
      for (let i = Math.max(2, totalPages - 2); i <= totalPages; i++) {
        if (!pages.includes(i) && i !== 1) {
          pages.push(i);
        }
      }
    } else {
      for (let i = 2; i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <PaginationContainer>
      {pages.map((page, index) => {
        if (page === 'dots') {
          return <Dots key={`dots-${index}`}>...</Dots>;
        }

        return (
          <PageButton
            key={page}
            onClick={() => changePage(page as number)}
            disabled={loading || page === currentPage}
            $active={page === currentPage}
          >
            {page}
          </PageButton>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
