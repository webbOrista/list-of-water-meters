import styled from 'styled-components';
import { MoonLoader } from 'react-spinners';
import { useMetersData } from '../hooks/useMetersData';
import TableRow from './TableRow';
import Pagination from './Pagination';

const FullWidthTableRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

const Center = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const InfoText = styled.p`
  color: #697180;
  font-size: 16px;
`;

const TableWrapper = styled.div`
  border: 1px solid #e0e5eb;
  border-radius: 16px;
  overflow: hidden;
  min-width: 900px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  display: block;
`;

const StyledThead = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const TableHeader = styled.tr`
  color: #697180;
  background-color: #e0e5eb;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  display: table;
  width: 100%;
  table-layout: fixed;

  th {
    padding: 8px 12px;
  }
`;

const TableHeaderNumber = styled.th`
  padding-left: 17px;
  padding-right: 17px;
  width: 60px;
`;

const TableHeaderType = styled.th`
  width: 120px;
`;

const TableHeaderDate = styled.th`
  width: 160px;
`;

const TableHeaderAutomatic = styled.th`
  width: 140px;
`;

const TableHeaderCurrent = styled.th`
  width: 160px;
`;

const TableHeaderAdress = styled.th`
  min-width: 430px;
`;

const TableHeaderNote = styled.th`
  min-width: 300px;
`;

const TableButtonArea = styled.th`
  width: 72px;
`;

const StyledTbody = styled.tbody`
  display: block;
  max-height: 99vh;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a8a8a8;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #5e6674;
  }
`;

const PaginationContainer = styled.div`
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
`;

const Table = () => {
  const {
    data,
    loading,
    loadingAreas,
    error,
    totalPages,
    currentPage,
    changePage,
    refresh,
  } = useMetersData();

  return (
    <>
      <TableWrapper>
        <StyledTable>
          <StyledThead>
            <TableHeader>
              <TableHeaderNumber>№</TableHeaderNumber>
              <TableHeaderType>Тип</TableHeaderType>
              <TableHeaderDate>Дата установки</TableHeaderDate>
              <TableHeaderAutomatic>Автоматический</TableHeaderAutomatic>
              <TableHeaderCurrent>Текущие показания</TableHeaderCurrent>
              <TableHeaderAdress>Адрес</TableHeaderAdress>
              <TableHeaderNote>Примечание</TableHeaderNote>
              <TableButtonArea></TableButtonArea>
            </TableHeader>
          </StyledThead>
          <StyledTbody>
            {loading ? (
              <FullWidthTableRow>
                <Center colSpan={8}>
                  <MoonLoader color="#697180" size={80} />
                </Center>
              </FullWidthTableRow>
            ) : error ? (
              <FullWidthTableRow>
                <Center colSpan={8}>
                  <InfoText>Ошибка: {error}</InfoText>
                </Center>
              </FullWidthTableRow>
            ) : data.length === 0 ? (
              <FullWidthTableRow>
                <Center colSpan={8}>
                  <InfoText>Данных нет</InfoText>
                </Center>
              </FullWidthTableRow>
            ) : (
              data.map((meter, index) => (
                <TableRow
                  key={meter.id}
                  index={(currentPage - 1) * 20 + index}
                  data={meter}
                  isLoadingArea={loadingAreas && !meter.area}
                />
              ))
            )}
          </StyledTbody>
        </StyledTable>
      </TableWrapper>
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
            loading={loading}
          />
        </PaginationContainer>
      )}
    </>
  );
};

export default Table;
