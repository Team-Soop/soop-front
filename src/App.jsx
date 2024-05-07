import AuthRoute from './Routes/AuthRoute';
import RootContainer from './components/RootContainer/RootContainer';
import RootLayout from './components/RootLayout/RootLayout';

function App() {
  return (
    <>
      <RootLayout>
        <RootContainer>
          <AuthRoute/>
        </RootContainer>
      </RootLayout>
    </>
  );
}

export default App;
