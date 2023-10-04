import './App.css';
import Footer from './components/blocks/footer';
import Nav from './components/blocks/header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './components/pages/signin';
import Register from './components/pages/register';
import PrivateComponent from './components/PrivateComponent';
import Profile from './components/pages/profile';
import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/signin" element={<Signin />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route element={<PrivateComponent />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
