import React from 'react'
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-green-800">404</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página não encontrada</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Não encontramos sua página.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Voltar para Home
              </a>
              <a href="suporte" className="text-sm font-semibold text-gray-900">
                Falar com Suporte <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  

