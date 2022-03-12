import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProductPage from './components/ProductPage';
import ProfileEditPage from './components/ProfileEditPage';

function App() {
  return (
    <>
    <Header />
    <ProfileEditPage />
    </>
  );
}

export default App;
