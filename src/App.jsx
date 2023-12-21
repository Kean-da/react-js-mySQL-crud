import RouterRoutes         from "./routes/RouterRoutes";
import NavBar               from "./components/common/navBar/NavBar";
import Footer               from "./components/common/footer/Footer";
import { ToastContainer }   from 'react-toastify';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div>
        <NavBar />
        <RouterRoutes />
        <Footer />
        <ToastContainer />
    </div>
  )
}

export default App