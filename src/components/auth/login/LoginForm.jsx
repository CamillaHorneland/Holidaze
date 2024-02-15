import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ServerWarning from "../../shared/ServerWarning";
import ValidationMessage from "../../shared/ValidationMessage";
import { LOGIN_URL } from "../../../constant/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/Loginsign.png";
import { useUserActions } from "../../../hooks/type/UserStore";


const schema = yup
        .object({
		email: yup.string().email("Please enter a valid email").required("Email is required"),
		password: yup.string().required("Please enter a password"),
	})
	.required();

function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setUser } = useUserActions();
	const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(LOGIN_URL, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
      }

      setUser(json);
       console.log(json);
      navigate("/");

    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

    return (
    <div className="m-10">
      <h1 className="font-bold text-3xl text-dark-blue">Login:</h1>
      <div className="flex mt-8 m-4 mb-16">
        <div className="hidden md:block">
          <img src={image} alt="Login sign" className="max:w-56"/>
        </div>
        <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={`flex flex-col p-8 space-y-6 ${isLoading && "opacity-50"}`}>
            {error && <ServerWarning>{error}</ServerWarning>}
            <div className="form-control flex flex-col my-4">
              <label htmlFor="email" className="text-black mb-2">
                <span>Email</span>
              </label>
              <input
                className="p-4 bg-light-blue border border-blue rounded-md"
                {...register("email")}
                id="email"
              />
              {errors.email && <ValidationMessage>{errors.email.message}</ValidationMessage>}
            </div>

            <div className="form-control flex flex-col my-4">
              <label htmlFor="password" className="text-black mb-2">
                <span>Password</span>
              </label>
              <input
                className="p-4 bg-light-blue border border-blue rounded-md"
                {...register("password")}
                type="password"
                id="password"
              />
              {errors.password && <ValidationMessage>{errors.password.message}</ValidationMessage>}
            </div>

            <div className="text-black flex justify-center mt-6">
              Not signed up?{" "}
              <Link to="/register" className="text-blue ml-2">
                Register here
              </Link>
            </div>

            <div className="form-control my-6">
              <button
                className="bg-blue hover:bg-dark-blue text-white font-bold py-3 px-6 rounded-full"
                type="submit"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
    
    