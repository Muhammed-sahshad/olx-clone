import { useState } from "react";
import close_icon from "../assets/close_icon.svg";
import { registerUser, loginUser } from "../firebase";
import { toast } from "react-toastify";
interface LoginProps {
  setLoginForm: (val: boolean) => void;
}

const Login = ({ setLoginForm }: LoginProps) => {
  const [loginState, setLoginState] = useState<"Sign In" | "Sign Up">("Sign In");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (loginState === "Sign In") {
        await loginUser(email, password);
      } else {
        await registerUser(email, password, username);
      }
      setLoginForm(false);
    } catch (err: any) {
      const firebaseErrorMessage: string =
        err.code.split("/")[1].split("-").join(" ") || "Failed to authenticate. Please try again.";
      console.log(err);
      toast.error(firebaseErrorMessage)
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-end align-top">
        <button onClick={() => setLoginForm(false)}>
          <img src={close_icon} alt="" width="20px" />
        </button>
      </div>
      <h1 className="text-center text-xl font-semibold mb-3">{loginState}</h1>
      <form className="flex flex-col px-2" onSubmit={handleSubmit}>
        {loginState === "Sign Up" && (
          <>
            <label htmlFor="username" className="px-2 text-sm pb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="border rounded-md p-2 mb-5"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}

        <label htmlFor="email" className="px-2 text-sm pb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border rounded-md p-2 mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="px-2 text-sm pb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border rounded-md p-2 mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-black text-white p-2 rounded-md mt-3">
          {loginState}
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-500">
        {loginState === "Sign In" ? "Don't have an account?" : "Already have an account"}
        <button
          onClick={() => setLoginState(loginState === "Sign In" ? "Sign Up" : "Sign In")}
          className="text-blue-500 underline ml-2"
        >
          {loginState === "Sign In" ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );
};

export default Login;
