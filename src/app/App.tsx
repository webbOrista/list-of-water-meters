import styled from 'styled-components';
import Table from '../components/Table';
import Header from '../components/Header';
import { RootStoreProvider } from '../contexts/RootStoreContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start
  height: 100vh;
  padding: 16px;
`;

function App() {
  return (
    <RootStoreProvider>
      <AppContainer>
        <Header />
        <Table />
      </AppContainer>
    </RootStoreProvider>
  );
}

export default App;
