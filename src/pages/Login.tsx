import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hook'
import Switcher from '../components/Switcher'
import { EyeIcon } from '../components/icons/EyeIcon'
import { EyeSlashIcon } from '../components/icons/EyeSlashIcon'
import { SpinIcon } from '../components/icons/SpinIcon'
import { toggleModal } from '../features/modal/resetPasswordModalSlice'
import { setUserData } from '../features/userSlice'
import authService from '../services/auth.service'
import userService from '../services/user.service'
import InputMask from "react-input-mask";

export default function Login<ReactNode>(props: {
  test: string
}) {
  const navigate = useNavigate()

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

  const handlePhone = (event: any): void => {
    setPhone(event.target.value);
  }

  const handlePassword = (event: any): void => {
    setPassword(event.target.value);
  }

  const onSubmitLoginData = () => {
    setIsLoading(true)
    if (!phone) {
      notify.warning({
        message: 'Iltimos telefon raqamni kiriting!',
        position: 'topRight',
      })
      setIsLoading(false)
    } else if (!password) {
      notify.warning({
        message: 'Iltimos parolni kiriting!',
        position: 'topRight',
      })
      setIsLoading(false)
    } else {
      authService.login({
        phone: "+" + phone.replaceAll(/[^\w\s]/g, '').replaceAll(/\s+/g, ''),
        password: password
      }).then(
        (data) => {
          addUserInStore()
          setTimeout(() => {
            if (userInfo.role === 'admin') {
              navigate('/admin-dashboard')
            } else {
              navigate('/dashboard')
            }
            setIsLoading(false)
            localStorage.setItem('role', userInfo.role)
          }, 700)
        },
        (error) => {
          notify.error({
            message: error.response.data,
            position: 'topRight',
          })
          setIsLoading(false)
        }
      )
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
                <Switcher />
              </div>
              <div className="flex flex-col justify-center flex-1 mb-0 md:mb-5">
                <h3 className="text-4xl font-semibold text-gray-900 text-center dark:text-gray-300">KIRISH</h3>
                <p className="px-10 my-5 text-sm text-center text-gray-500 dark:text-gray-400">Tizimga kirish uchun telefon
                  raqamingiz va parolingizni kiritishgingiz lozim!</p>
                <div className="w-full mt-3 md:mt-4">
                  <div className="form-horizontal md:mx-auto md:w-3/4">
                    <div className="flex flex-col mt-4">
                      <InputMask value={phone} onChange={handlePhone} mask="+\9\9\8 (99) 999-99-99"
                        className="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none dark:focus:dark:bg-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                        placeholder="+998(99) 876-54-32" />
                    </div>
                    <div className="flex flex-col mt-4">
                      <div className="relative">
                        <input onChange={handlePassword} name="password" type={currentType}
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
                      <button onClick={() => onSubmitLoginData()}
                        className="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60"
                        disabled={isLoading}>
                        {!isLoading ?
                          <span className="flex items-center cursor-pointer">Tizimga kirish</span>
                          : <span className="flex items-center">
                            <SpinIcon className="w-6 h-6" /> Tekshirilmoqda...
                          </span>}
                      </button>
                    </div>
                  </div>
                  <div className="relative w-1/2 mx-auto my-4 text-center">
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <span
                      className="absolute px-3 text-xs text-gray-500 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 top-1/2 left-1/2">YOKI</span>
                  </div>
                  <div className="flex items-center md:mx-auto md:w-3/4">
                    <Link to="/register"
                      className="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60">
                      <span className="flex items-center cursor-pointer">Ro'yhatdan o'tish</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-xs text-center text-gray-400 dark:text-gray-400">All rights reserved. &copy; <a
                href="https://t.me/trimuzsupport" className="hover:underline">IT-Forelead</a> {(new Date).getFullYear()}</div>
            </div>
            <div className="hidden xl:block bg-[url('/images/bg-login.jpg')] bg-cover bg-right rounded-r-3xl md:w-2/3">
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