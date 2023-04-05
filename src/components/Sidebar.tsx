export default function Sidebar<ReactNode>() {

  return (
    <>
      <div className="fixed hidden h-screen transition-all duration-500 bg-gray-900 text-white lg:block dark:bg-gray-800 w-80">
        <div className="p-2 pl-10 mt-3 ml-3">
          <div className="flex items-center">
            <img src="/images/logo.png" className="w-14 shrink-0" alt="#" />
            <h2 className="ml-3 text-2xl font-semibold transition-all duration-500 grow whitespace-nowrap">
              IT-Forelead
            </h2>
          </div>
        </div >
        <ul className="relative mt-5">
          <li className="relative flex items-center">
            asdasd
          </li>
        </ul >
        <div v-if="!sidebarStatus" className="absolute bottom-0 w-full mb-3 text-sm text-center text-gray-400 dark:text-gray-400">
          Copyright &copy; 2023 <a href="https://t.me/trimuzsupport" className="hover:underline">IT-Forelead</a>. <br />
          All Rights Reserved.
        </div>
      </div >
    </>
  )
}