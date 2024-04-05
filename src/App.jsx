import logo from './logo.svg';
import './App.css';
import AuthRoute from './Routes/AuthRoute';
import FeedPage from './pages/FeedPage/FeedPage';
import RootLayout from './components/RootLayout/RootLayout';
import RootSideMenuLeft from './components/RootSideMenuLeft/RootSideMenuLeft';

function App() {
  return (
    <>

      {/* <RootLayout>
        <RootSideMenuLeft/> */}
        <AuthRoute/>
      {/* </RootLayout> */}
      
    </>
  );
}

export default App;
