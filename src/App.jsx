import logo from './logo.svg';
import './App.css';
import AuthRoute from './Routes/AuthRoute';
import RootContainer from './components/RootContainer/RootContainer';
import RootLayout from './components/RootLayout/RootLayout';

function App() {
  return (
    <>
      {/* // layout
      // container
      // sidebar */}
      
      <RootLayout>
        <RootContainer>
          <AuthRoute/>
        </RootContainer>
      </RootLayout>
    </>
  );
}

export default App;
