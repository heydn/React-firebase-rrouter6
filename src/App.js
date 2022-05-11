import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './routes/Login';
import { Home } from './routes/Home';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './components/RequireAuth';



const App = () => {
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

        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
