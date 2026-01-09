import type { ReactNode } from "react"
// import gear from "../assets/"
import bee from "../assets/bee.png"
import loginbee from "../assets/loginbee.png"

interface AuthCardProps {
  title: string
  children: ReactNode
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50  to-yellow-150">
       {/* <div>
            <img src={gear} alt="clock" 
                className="absolute bottom-4 right-4 w-50 h-50" />
        </div> */}
        <div>
            <img src={loginbee} alt="bee" 
                className="absolute top-10 left-70 w-70 h-50" />
        </div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
