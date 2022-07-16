import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './routes/Login';
import { Home } from './routes/Home';
import { Register } from './routes/Register';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './components/RequireAuth';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import { LayoutContainerForm } from './components/LayoutContainerForm';



const App = () => {

  const {user} = useContext(UserContext);
  if (user===false){
    return <p>Loading...</p>
  }



  return (
    <div className="App">
      <Navbar />
      <h1>Cotizador</h1>

      <Routes>
        <Route path='/' element={
            <RequireAuth>
              <Home/>
            </RequireAuth>
          }>
        </Route>
        
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
