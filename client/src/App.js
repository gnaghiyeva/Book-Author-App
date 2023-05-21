import './App.css';
import { AuthorContextProvider } from './context/AuthorContext';
import { ROUTES } from './routes/routes';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter(ROUTES)
function App() {
  return (
    <>
    <AuthorContextProvider>

   
    <RouterProvider router={routes}>

    </RouterProvider>
    </AuthorContextProvider>
    </>
  );
}

export default App;
