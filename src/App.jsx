import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WaitlistAdminView from './List'
import { SignUp } from './signup';
import Login from './Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WaitlistAdminView/>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
  path: "/login",
  element:<Login/> 

  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
