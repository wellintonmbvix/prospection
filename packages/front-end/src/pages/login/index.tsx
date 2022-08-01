import { DarkThemeToggle } from "../../lib";

export default function Login() {
  return (
    <div className="w-full h-screen min-h-640 flex flex-nowrap flex-col overflow-hidden bg-gray-200 dark:bg-gray-900">
      <div className="w-screen content-between flex justify-between flex-row items-center p-4 bg-gray-100 dark:bg-gray-700 shadow-lg">
        <span className="text-xl font-semibold dark:text-white">
          {`Prospection`}
        </span>
        <div className="flex items-center gap-2">
          <DarkThemeToggle />
        </div>
      </div>
      <div className="w-screen h-screen min-h-640 flex flex-nowrap scroll-smooth hover:scroll-auto grid justify-items-center flex items-center" style={{overflowY:'scroll'}}>
        <div className="w-5/6 max-w-sm flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <form>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="username"
                id="username"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-70 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-800 dark:peer-focus:text-blue-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-70 peer-focus:-translate-y-4 left-1"
              >
                Nome de usuário
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="password"
                name="password"
                id="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-70 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-800 dark:peer-focus:text-blue-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-70 peer-focus:-translate-y-4 left-1"
              >
                Senha de acesso
              </label>
            </div>
            <button
              type="submit"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"                      
            >
              Sign In
            </button>
          </form>
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
