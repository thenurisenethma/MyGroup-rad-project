import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/Login"
import SignUp from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" 
        element={<SignUp />} />
        <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  )
}

export default App
