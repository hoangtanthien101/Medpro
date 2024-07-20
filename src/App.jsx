import './App.scss'
import { ToastContainer } from 'react-toastify';
import Router from './router/Router';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/auth.context';
import { NotificationProvider } from './context/Notification.context';
function App() {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Router />
        </NotificationProvider>
      </AuthProvider >
    </>
  )
}

export default App
