import styled from 'styled-components';
import DeleteButton from './DeleteButton';
import coldWaterIcon from '../assets/coldWaterIcon.svg';
import hotWaterIcon from '../assets/hotWaterIcon.svg';

interface Props {
  index: number;
  data: {
    id: string;
    description: string;
    initial_values: number[];
    installation_date: string | null;
    is_automatic: boolean | null;
    _type: string[];
  };
}

const TableButtonArea = styled.td`
  width: 66px;
  & > button,
  & > div {
    visibility: hidden;
  }
`;

const StyledTableRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  cursor: pointer;

  &:hover {
    background-color: #f7f8f9;
  }

  &:hover ${TableButtonArea} > * {
    visibility: visible;
  }

  & > td {
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid #e0e5eb;

    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > td:not(:last-child) {
    padding: 16px 12px;
  }
`;

const TableNumber = styled.td`
  text-align: center;
  width: 48px;
`;

const TableType = styled.td`
  width: 120px;
  & > span {
    vertical-align: middle;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
`;

const TableDate = styled.td`
  width: 160px;
`;

const TableAutomatic = styled.td`
  width: 140px;
`;

const TableCurrent = styled.td`
  width: 160px;
`;

const TableAdress = styled.td`
  min-width: 430px;
`;

const TableNote = styled.td`
  min-width: 300px;
`;

const formatDate = (dateToFormat: string | null) => {
  if (!dateToFormat) return '';
  const date = new Date(dateToFormat);

  return new Intl.DateTimeFormat('ru-RU').format(date);
};

const formatIsAutomatic = (automaticToFormat: boolean | null) => {
  if (automaticToFormat === true) return 'да';
  if (automaticToFormat === false) return 'нет';
  return 'Нет данных';
};

const getTypeIconPath = (typeArray: string[]) => {
  if (typeArray.includes('ColdWaterAreaMeter')) return coldWaterIcon;
  if (typeArray.includes('HotWaterAreaMeter')) return hotWaterIcon;
  return null;
};

const formatType = (typeArray: string[]) => {
  if (typeArray.includes('ColdWaterAreaMeter')) {
    return 'ХВС';
  }

  if (typeArray.includes('HotWaterAreaMeter')) {
    return 'ГВС';
  }

  return 'Прибор уч.';
};

const TableRow = ({ index, data }: Props) => {
  const typeText = formatType(data._type);
  const iconPath = getTypeIconPath(data._type);

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <StyledTableRow>
      <TableNumber>{index + 1}</TableNumber>
      <TableType>
        {iconPath && <Icon src={iconPath} />}
        <span>{typeText}</span>
      </TableType>
      <TableDate>{formatDate(data.installation_date)}</TableDate>
      <TableAutomatic>{formatIsAutomatic(data.is_automatic)}</TableAutomatic>
      <TableCurrent>{data.initial_values}</TableCurrent>
      <TableAdress></TableAdress>
      <TableNote>{data.description}</TableNote>
      <TableButtonArea>
        <DeleteButton onClick={() => handleDelete(data.id)} />
      </TableButtonArea>
    </StyledTableRow>
  );
};

export default TableRow;
