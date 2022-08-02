import React from "react";

export default function Rodape() {
  return (
    <>
      <footer className="w-screen p-4 bg-gray-100 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-700">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
}
