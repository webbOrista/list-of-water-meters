import styled from 'styled-components';
import deleteDefaultIcon from '../assets/deleteDefaultIcon.svg';
import deleteHoverIcon from '../assets/deleteHoverIcon.svg';

interface Props {
  onClick: () => void;
}

const Button = styled.button`
  display: block;
  margin: auto 12px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  background-image: url(${deleteDefaultIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;
  outline: none;

  &:hover {
    background-image: url(${deleteHoverIcon});
  }
`;

const DeleteButton = ({ onClick }: Props) => {
  return <Button onClick={onClick} />;
};

export default DeleteButton;
