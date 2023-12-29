
import { Route , Routes ,BrowserRouter} from 'react-router-dom';
import Login from './component/Login'
import Dashboard from './Components/Dashboard';
// import Box from "./Components/Box";

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/builder-app' element= {<Dashboard/>}  />
     
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
