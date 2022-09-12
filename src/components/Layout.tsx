import React from 'react';
import Head from "next/head";
import Link from 'next/link';
import {useRouter} from 'next/router';

type LayoutProps = {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {

  const router = useRouter();
  // console.log(router.pathname);

  return (
    <>
      <Head>
        <title>Sleep Cycle Calculator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        className="flex flex-col items-start justify-start 
                    xs:mx-0 md:mx-auto py-1 px-2 
                    xs:w-full md:w-9/12 xl:w-3/5 2xl:w-3/5"
      >

        {/* navi */}
        <nav className={`flex flex-row items-center justify-start h-20 px-3 py-1 gap-8`}>
            <Link
              href="/"
            >
              <a className={`${router.pathname == "/" ? "underline bg-slate-100 rounded-md" : "" } p-2 `}>sleep</a>
            </Link>
            <Link
              href="/info"
            >
              <a className={`${router.pathname == "/info" ? "underline bg-slate-100 rounded-md" : "" } p-2 `}>info</a>
            </Link>
            <Link
              href="/news"
            >
              <a className={`${router.pathname == "/news" ? "underline bg-slate-100 rounded-md" : "" } p-2 `}>news</a>
            </Link>
        </nav>

        <section className='flex flex-row items-center justify-start p-4'>
          <h1 className="lg:text-5xl md:text-4xl sm:text-4xl xs:text-3xl
                        font-extrabold text-gray-700"
          >
              Sleep <span className="text-purple-300">Cycle</span> Calculator
          </h1>
        </section>

      </header>

      <main className="flex flex-col xs:items-center xs:justify-center items-start justify-start 
                        xs:w-full md:w-9/12 xl:w-3/5 2xl:w-3/5 
                        min-h-[40vh] 
                        p-4 xs:mx-0 md:mx-auto
                        ">
                          {props.children}
      </main>
    </>
  )
}

export default Layout;