import React, { useState } from 'react'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { toggleModal } from '../features/modal/resetPasswordModalSlice'
import authService from '../services/auth.service'
import userService from '../services/user.service'
import { setUserData } from '../features/userSlice'
import { User } from '../types/interfaces'
import { EyeIcon } from '../components/icons/EyeIcon'
import { EyeSlashIcon } from '../components/icons/EyeSlashIcon'
import { SunIcon } from '../components/icons/SunIcon'
import { MoonIcon } from '../components/icons/MoonIcon'
import Switcher from '../components/Switcher'

export default function Login<ReactNode>(props: {
  test: string
}) {

  const { isOpenModal } = useAppSelector(state => state.resetPasswordModalSlice)
  const userInfo = useAppSelector(state => state.userSlice)

  const resetPasswordDispatch = useAppDispatch()
  const userDispatch = useAppDispatch()

  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [currentType, setCurrentType] = useState<string>('password')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const showPassword = (u: string) => setCurrentType(u)

  const openResetPasswordModal = () => {
    resetPasswordDispatch(toggleModal(true))
  }

  const closeResetPasswordModal = () => {
    resetPasswordDispatch(toggleModal(false))
    setClientPhone('')
  }

  // Token expire checker function
  function forbiddenChecker(error: any, msg: string) {
    if (error.message.split(' ').includes('403')) {
      authService.logout()
      // store.commit('setSelectedPage', '')
    } else {
      notify.warning({
        message: msg,
        position: 'bottomLeft',
      })
    }
  }

  // User Data
  const addUserInStore = () => {
    userService.getUser().then(
      (data) => {
        userDispatch(setUserData(data))
      },
      (error) => {
        forbiddenChecker(error, "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi!")
      }
    )
  }

  const onSubmit = (user: User) => {
    setIsLoading(true)
    user.phone = user.phone.replace(')', '').replace('(', '').replace(' ', '').replace('-', '').replace('-', '')
    if (!user.phone) {
      notify.warning({
        message: 'Iltimos telefon raqamni kiriting!',
        position: 'topRight',
      })
      setIsLoading(false)
    } else if (!user.password) {
      notify.warning({
        message: 'Iltimos parolni kiriting!',
        position: 'topRight',
      })
      setIsLoading(false)
    } else {
      // authService.login(user).then(
      //   (data) => {
      //     addUserInStore()
      //     setTimeout(() => {
      //       if (userInfo.role === 'admin') {
      //         router.push('/admin-dashboard')
      //       } else {
      //         router.push('/dashboard')
      //       }
      //       setIsLoading(false)
      //       localStorage.setItem('role', userInfo.role)
      //     }, 700)
      //   },
      //   (error) => {
      //     notify.error({
      //       message: error.response.data,
      //       position: 'topRight',
      //     })
      //     setIsLoading(false)
      //   }
      // )
    }
  }

  return (
    <>
      {/* {props.test}
    <button onClick={() => resetPasswordDispatch(toggleModal(!isOpenModal))}></button> */}
      <div className="w-full h-screen bg-emerald-100 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center flex-1 h-full px-4 sm:px-0">
          <div
            className="flex w-full bg-white shadow-lg max-h-fit md:h-3/4 rounded-3xl sm:mx-0 sm:w-4/5 lg:w-2/3 dark:bg-gray-800">
            <div className="flex flex-col w-full p-4 xl:w-1/2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img src="/images/logo.png" className="w-8 ml-2 shrink-0" alt="#" />
                  <div className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300 grow">IT-Forelead</div>
                </div>
                <Switcher/>
                {/* <button onClick={() => toggleDarkMode()}
                  className="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
                  {
                    darkMode ? <MoonIcon className="w-5 h-5 text-black dark:text-gray-500" />
                      : <SunIcon className="w-5 h-5 text-black dark:text-gray-500" />
                  }
                </button> */}
              </div>
              <div className="flex flex-col justify-center flex-1 mb-0 md:mb-5">
                <h3 className="text-4xl font-semibold text-center dark:text-gray-300">KIRISH</h3>
                <p className="px-10 my-5 text-sm text-center text-gray-500 dark:text-gray-400">Tizimga kirish uchun telefon
                  raqamingiz va
                  parolingizni kiritishgingiz lozim!</p>
                <div className="w-full mt-3 md:mt-4">
                  <form onSubmit={() => onSubmit({
                    phone: '+02910013920391',
                    password: "asdadasdsas"
                  })} className="form-horizontal md:mx-auto md:w-3/4" method="POST" action="#">
                    <div className="flex flex-col mt-4">
                      <input v-model="phone" v-mask="'+###(##) ###-##-##'" name="phone" type="phone"
                        className="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none dark:focus:dark:bg-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                        placeholder="+998(99) 876-54-32" />
                    </div>
                    <div className="flex flex-col mt-4">
                      <div className="relative">
                        <input v-model="password" name="password" type={currentType}
                          className="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none dark:focus:dark:bg-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                          placeholder="Parolni kiriting..." />
                        <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                          {currentType === 'text' ?
                            <EyeIcon onClick={() => showPassword('password')} className="w-5 h-5 text-gray-400 cursor-pointer" /> :
                            <EyeSlashIcon onClick={() => showPassword('text')} className="w-5 h-5 text-gray-400 cursor-pointer" />
                          }
                        </div>
                      </div>
                      <div className="mt-1 ml-2">
                        <a onClick={() => openResetPasswordModal()}
                          className="text-sm text-blue-600 no-underline cursor-pointer dark:text-blue-500 hover:underline">Parolni
                          unitdingizmi?</a>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <button type="submit"
                        className="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60"
                        disabled={isLoading}>
                        {!isLoading ?
                          <span className="flex items-center cursor-pointer">Tizimga kirish</span>
                          : <span className="flex items-center"> </span>}
                        {/* <SpinIcon className="w-6 h-6" /> Tekshirilmoqda... */}
                      </button>
                    </div>
                  </form>
                  <div className="relative w-1/2 mx-auto my-4 text-center">
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <span
                      className="absolute px-3 text-xs text-gray-500 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 top-1/2 left-1/2">YOKI</span>
                  </div>
                  <div className="flex items-center md:mx-auto md:w-3/4">
                    {/* <router-link to="/register"
                className="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60">
                <span className="flex items-center cursor-pointer">Ro'yhatdan o'tish</span>
              </router-link> */}
                  </div>
                </div>
              </div>
              <div className="text-xs text-center text-gray-400 dark:text-gray-400">All rights reserved. &copy; <a
                href="https://t.me/trimuzsupport" className="hover:underline">IT-Forelead</a> 2022</div>
            </div>
            <div className="hidden xl:block bg-[url('/images/bg-login.jpg')] bg-cover bg-center rounded-r-3xl md:w-2/3">
              <div className="flex items-center justify-center h-full">
                <div
                  className="w-full px-10 py-16 text-white xl:mx-16 2xl:mx-32 rounded-xl backdrop-blur-sm backdrop-contrast-50">
                  <h3 className="mb-5 text-3xl font-semibold">Workout platformasi</h3>
                  <p className="text-md">Trinirovka klubingiz boshqaruvini qulaylashtiruvchi, harajatlarni kamaytirgan holda ish
                    samaradoligini oshiruvchi qulay hamda sodda tizim.</p>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >

    </>
  )
}