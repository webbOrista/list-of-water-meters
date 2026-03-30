import styled from 'styled-components';

const Title = styled.h1`
  color: #1f2939;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  white-space: nowrap;
`;

const HeaderContainer = styled.div`
  margin-bottom: 16px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Список счётчиков</Title>
    </HeaderContainer>
  );
};

export default Header;
