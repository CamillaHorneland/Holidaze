import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ServerWarning from "../../shared/ServerWarning";
import ValidationMessage from "../../shared/ValidationMessage";
import { REGISTER_URL } from "../../../constant/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/Registersign.png";
import { useUserActions } from "../../../hooks/type/UserStore";

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9_]*$/, "Invalid characters in username")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(/@(stud\.)?noroff\.no$/, "Must be a valid stud.noroff.no or noroff.no email address")
    .required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  avatar: yup.string().url("Please enter a valid URL for avatar"),
  venueManager: yup.boolean(),
}).required();



function RegisterForm() {
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
      const response = await fetch(REGISTER_URL, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
      }

      setUser(json);
      console.log(json);
      navigate("/login");

    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex mt-8 m-4 items-center mb-16">
      <div className="hidden md:block">
        <img src={image} alt="Register sign" className="w-70" />
      </div>
      <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={`flex flex-col p-8 space-y-6 ${isLoading && "opacity-50"}`}>
            {error && <ServerWarning>{error}</ServerWarning>}
            <div className="form-control flex flex-col my-4">
                <label htmlFor="name" className="text-black mb-2">
                    <span>Username</span>
                </label>
                <input className="p-4 bg-light-blue border border-blue rounded-md"
                   {...register("name")} 
                   id="name" />
                   {errors.name && <ValidationMessage>{errors.name.message}</ValidationMessage>}
            </div>
            <div className="form-control flex flex-col my-4">
                <label htmlFor="email" className="text-black mb-2">
                    <span>Email</span>
                </label>
               
                <input className="p-4 bg-light-blue border border-blue rounded-md"
                   {...register("email")}
                   id="email" />
                   {errors.email && <ValidationMessage>{errors.email.message}</ValidationMessage>}
            </div>
           
            <div className="form-control flex flex-col my-4">
                <label htmlFor="password" className="text-black mb-2">
                    <span>Password</span>
                </label>
                <input className="p-4 bg-light-blue border border-blue rounded-md"
                   {...register("password")}
                   type="password"
                   id="password" />
                   {errors.password && <ValidationMessage>{errors.password.message}</ValidationMessage>}
            </div>
            <div className="form-control flex flex-col my-4">
                <label htmlFor="avatar" className="text-black mb-2">
                    <span>Avatar</span>
                </label>
                <input className="p-4 bg-light-blue border border-blue rounded-md"
                    {...register("avatar")}
                    id="avatar" />
                    {errors.avatar && <ValidationMessage>{errors.avatar.message}</ValidationMessage>}
            </div>
            <div className="form-control flex flex-row items-center justify-center my-4">
                <label htmlFor="venueManager" className="text-black mb-2 mr-4">
                    <span>Do you want to become a Venue Manager:</span>
                </label>
                <input className="p-4 bg-light-blue border border-blue rounded-md mb-2"
                     {...register("venueManager")}
                     type="checkbox"
                     id="venueManager" />
                     {errors.venueManager && <ValidationMessage>{errors.venueManager.message}</ValidationMessage>}
            </div>

            <div className="text-black flex justify-center mt-6">
                    Alleredy have a user?{" "}
                    <Link to="/login" className="text-blue ml-2">
                        Login here
                   </Link>
               </div>

               <div className="form-control my-6">
                    <button className="bg-blue hover:bg-dark-blue text-white font-bold py-3 px-6 rounded-full" type="submit">
                          {isLoading ? "Registering..." : "Register"}
                    </button>
               </div>

       </fieldset>
      </form>
    </div>
  );
}

export default RegisterForm;
