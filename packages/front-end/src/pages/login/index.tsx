import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/useAuth";
import { setUserLocalStorage } from "../../contexts/Auth/util";

import { DarkThemeToggle } from "../../lib";

type FormValues = {
  name: string;
  password: string;
};

export default function Login() {
  const [showAviso, setShowAviso] = useState(false);  
  const { register, handleSubmit } = useForm<FormValues>();
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSignin(values: { name: string; password: string }) {
    try {          
      await auth.authenticate(values.name, values.password);
      setShowAviso(false);
      navigate("/home");
    } catch (error) {      
      setShowAviso(true);
    }
  } 

  return (
    <div className="w-full h-screen min-h-640 flex flex-nowrap flex-col overflow-hidden bg-gray-200 dark:bg-gray-900">
      <div className="w-screen content-between flex justify-between flex-row items-center p-4 bg-gray-100 dark:bg-gray-700 shadow-lg">
        <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
          {`Prospection`}
        </span>
        <div className="flex items-center gap-2">
          <DarkThemeToggle />
        </div>
      </div>
      <div
        className="w-screen h-screen min-h-640 flex flex-nowrap scroll-smooth hover:scroll-auto grid justify-items-center flex items-center"
        style={{ overflowY: "scroll" }}
      >
        <div className="w-5/6 max-w-sm flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit(handleSignin)}>
            <div className="relative z-0 mb-6 w-full group">
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                onChange={() => setShowAviso(false)}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-70 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-800 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-70 peer-focus:-translate-y-4 left-1"
              >
                Nome de usuário
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                onChange={() => setShowAviso(false)}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-70 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-800 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-70 peer-focus:-translate-y-4 left-1"
              >
                Senha de acesso
              </label>
            </div>
            <button
              type="submit"
              className="outline-0 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          </form>
          {showAviso ? (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              <span className="font-medium">Danger alert!&nbsp;</span>Falha ao logar ao sistema.
            </div>
          ) : null}
        </div>
      </div>
      <footer className="p-4 bg-gray-100 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-700">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}
