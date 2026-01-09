import { useNavigate } from "react-router-dom"
import bee from "../assets/bee logo.png"

export default function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/", { replace: true })
  }

  return (
    <nav className="w-full bg-yellow-50 shadow-md px-8 py-2 flex justify-between items-center">
        <div className="flex items-center gap-0">
    
    <h1 className="text-xl font-bold text-yellow-600 cursor-pointer">
      MyGroup
    </h1><img
      src={bee}
      alt="bee"
      className="w-20 h-15"  
    />
  </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          Hi, {username} 
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
