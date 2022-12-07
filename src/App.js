import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routers/Router';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
