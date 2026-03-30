import styled from 'styled-components';
import Table from '../components/Table';
import Header from '../components/Header';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start
  height: 100vh;
  padding: 16px;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Table />
    </AppContainer>
  );
}

export default App;
