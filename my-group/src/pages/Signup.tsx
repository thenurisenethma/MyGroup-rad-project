import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthCard from "../components/AuthCard"

export default function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      console.log("Signup response:", data)

      if (!res.ok) {
        alert(data.message)
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data._id)


      navigate("/")

    } catch (error) {
      alert("Something went wrong")
    }
  }

  return (
    <AuthCard title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-yellow-300 py-3 rounded-lg font-semibold"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-yellow-600 font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
