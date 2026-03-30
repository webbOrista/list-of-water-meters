import styled from 'styled-components';
import { MoonLoader } from 'react-spinners';
import TableRow from './TableRow';
import { MOCKDATA } from '../api/api';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

const ErrorText = styled.p`
  color: #d10505;
  font-size: 20px;
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
  width: 48px;
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

const Table = () => {
  // const { data, error, loading } = useMetersData();

  // if (loading)
  //   return (
  //     <Center>
  //       <MoonLoader color="#F0F3F7" size={80} />
  //     </Center>
  //   );
  // if (error)
  //   return (
  //     <Center>
  //       <ErrorText>Ошибка: {error}</ErrorText>
  //     </Center>
  //   );

  const data = MOCKDATA.results;

  return (
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
          {data.map((meter, index) => (
            <TableRow key={meter.id} index={index} data={meter} />
          ))}
        </StyledTbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
