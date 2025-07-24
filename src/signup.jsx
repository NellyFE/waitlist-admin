import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setphone] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerAdmin = async (e) => {
    e.preventDefault();

    try {
      const registerUrl = `${
        import.meta.env.VITE_BASE_URL
      }/auth/register-admin`;

      const resData = await fetch(registerUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName, phone }),
      });

      const result = await resData.json();
      if (!resData.ok) {
        throw new Error(result.message || "Failed to register this user");
      }
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (error) {
      console.error(error || "can't signup");
    } finally {
      //console.log(result);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={registerAdmin}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Admin Signup</h2>

        <input
          type="name"
          placeholder="first name"
          className="w-full mb-3 px-3 py-2 border rounded"
          onChange={(e) => setName(e.target.value)}
          value={firstName}
          required
        />

        <input
          type="name"
          placeholder="last name"
          className="w-full mb-3 px-3 py-2 border rounded"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />

        <input
          type="number"
          placeholder="phone number"
          className="w-full mb-3 px-3 py-2 border rounded"
          onChange={(e) => setphone(e.target.value)}
          value={phone}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
