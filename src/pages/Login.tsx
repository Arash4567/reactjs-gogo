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

export default function Login<ReactNode>(props: {
  test: string
}) {

  const [darkMode, setDarkMode] = React.useState(true)

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

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
                  <img src="../assets/images/logo.png" className="w-8 ml-2 shrink-0" alt="#" />
                  <div className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300 grow">IT-Forelead</div>
                </div>
                <button onClick={() => toggleDarkMode()}
                  className="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
                  {
                    darkMode ? <MoonIcon className="w-5 h-5 text-black dark:text-gray-500" />
                      : <SunIcon className="w-5 h-5 text-black dark:text-gray-500" />
                  }
                </button>
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
            <div className="hidden xl:block bg-image rounded-r-3xl md:w-2/3">
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


/* 
<template>
  <div className="w-full h-screen bg-emerald-100 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center flex-1 h-full px-4 sm:px-0">
      <div
        className="flex w-full bg-white shadow-lg max-h-fit md:h-3/4 rounded-3xl sm:mx-0 sm:w-4/5 lg:w-2/3 dark:bg-gray-800">
        <div className="flex flex-col w-full p-4 xl:w-1/2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src="../assets/images/logo.png" className="w-8 ml-2 shrink-0" alt="#" />
              <div className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300 grow">IT-Forelead</div>
            </div>
            <button @click="toggleDark()"
              className="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
              <MoonIcon v-if="!isDark" className="w-5 h-5 text-black dark:text-gray-500" />
              <SunIcon v-else className="w-5 h-5 text-black dark:text-gray-500" />
            </button>
          </div>
          <div className="flex flex-col justify-center flex-1 mb-0 md:mb-5">
            <h3 className="text-4xl font-semibold text-center dark:text-gray-300">KIRISH</h3>
            <p className="px-10 my-5 text-sm text-center text-gray-500 dark:text-gray-400">Tizimga kirish uchun telefon
              raqamingiz va
              parolingizni kiritishgingiz lozim!</p>
            <div className="w-full mt-3 md:mt-4">
              <Form @submit="onSubmit" className="form-horizontal md:mx-auto md:w-3/4" method="POST" action="#">
                <div className="flex flex-col mt-4">
                  <input v-model="phone" v-mask="'+###(##) ###-##-##'" name="phone" type="phone"
                    className="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                    placeholder="+998(99) 876-54-32" />
                </div>
                <div className="flex flex-col mt-4">
                  <div className="relative">
                    <input v-model="password" name="password" :type="currentType"
                      className="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                      placeholder="Parolni kiriting..." />
                    <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                      <EyeIcon @click="showPassword('password')" v-if="currentType === 'text'"
                        className="w-5 h-5 text-gray-400 cursor-pointer" />
                      <EyeSlashIcon @click="showPassword('text')" v-if="currentType === 'password'"
                        className="w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                  <div className="mt-1 ml-2">
                    <a @click="openResetPasswordModal()"
                      className="text-sm text-blue-600 no-underline cursor-pointer dark:text-blue-500 hover:underline">Parolni
                      unitdingizmi?</a>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <button type="submit"
                    className="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60"
                    :disabled="isLoading">
                    <span v-if="!isLoading" className="flex items-center cursor-pointer">Tizimga kirish</span>
                    <span v-else className="flex items-center">
                      <SpinIcon className="w-6 h-6" /> Tekshirilmoqda...
                    </span>
                  </button>
                </div>
              </Form>
              <div className="relative w-1/2 mx-auto my-4 text-center">
                <hr className="border-gray-300 dark:border-gray-600">
                <span
                  className="absolute px-3 text-xs text-gray-500 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 top-1/2 left-1/2">YOKI</span>
              </div>
              <div className="flex items-center md:mx-auto md:w-3/4">
                <router-link to="/register"
                  className="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60">
                  <span className="flex items-center cursor-pointer">Ro'yhatdan o'tish</span>
                </router-link>
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-gray-400 dark:text-gray-400">All rights reserved. &copy; <a
              href="https://t.me/trimuzsupport" className="hover:underline">IT-Forelead</a> 2022</div>
        </div>
        <div className="hidden xl:block bg-image rounded-r-3xl md:w-2/3">
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
    </div>
  </div>

  <!-- Reset Password Modal -->
  <div v-if="isResetPasswordModal"
    className="fixed inset-0 top-0 left-0 right-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto backdrop-brightness-50">
    <div className="relative w-full max-w-xl p-1 mt-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:mt-0 md:p-4">
      <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Parolni qayta tiklash</h3>
          <button type="button" @click="closeResetPasswordModal()"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal">
            <ModalCloseIcon />
          </button>
        </div>
        <div className="p-5">
          <div className="px-3">
            <label for="phone" className="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Telefon
              raqam</label>
            <input v-model="clientPhone" name="phone" v-mask="'+###(##) ###-##-##'" id="phone"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="+998(90) 123-45-67" required />
          </div>
          <div className="p-3 text-sm text-gray-700 dark:text-gray-400">
            Parolni qayta tiklash uchun profilingizga biriktirilgan telefon raqamingizni kiriting. Biz telefon
            raqamingizga parolni tiklash linkini jo'natamiz. Linkning amal qilish muddati 10 daqiqa.
          </div>
        </div>
        <div
          className="flex items-center justify-between p-5 space-x-2 border-t border-gray-200 rounded-b px-7 dark:border-gray-600">
          <button @click="closeResetPasswordModal()"
            className="px-4 py-2 mr-2 font-medium text-white transition-colors duration-200 bg-teal-500 border border-teal-500 rounded outline-none hover:bg-teal-400 hover:text-white focus:ring-teal-600 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Yopish</button>
          <button @click="sendSMSLink()"
            className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Jo'natish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { input, Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDark, useToggle } from '@vueuse/core'
import SpinIcon from '../assets/icons/SpinIcon.vue'
import EyeIcon from '../assets/icons/EyeIcon.vue'
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue'
import ModalCloseIcon from '../assets/icons/ModalCloseIcon.vue'
import SunIcon from '../assets/icons/SunIcon.vue'
import MoonIcon from '../assets/icons/MoonIcon.vue'

const router = useRouter()

const store = useStore()

const phone = ref('')
const password = ref('')
const clientPhone = ref('')

const isLoading = ref(false)
const isResetPasswordModal = ref(false)
const currentType = ref('password')
const showPassword = (u) => (currentType.value = u)

const isDark = useDark()
const toggleDark = useToggle(isDark)

const openResetPasswordModal = () => {
  isResetPasswordModal.value = true
}

const closeResetPasswordModal = () => {
  isResetPasswordModal.value = false
  clientPhone.value = ''
}

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(
      () => {
        store.commit('setSelectedPage', '')
      },
      () => { }
    )
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

// User Data
const addUserInStore = () => {
  store.dispatch('userModule/get').then(
    (data) => {
      store.commit('setUser', data)
    },
    (error) => {
      forbiddenChecker(error, "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi!")
    }
  )
}

const onSubmit = (user) => {
  isLoading.value = true
  user.phone = user.phone.replace(')', '').replace('(', '').replace(' ', '').replace('-', '').replace('-', '')
  if (!user.phone) {
    notify.warning({
      message: 'Iltimos telefon raqamni kiriting!',
      position: 'topRight',
    })
    isLoading.value = false
  } else if (!user.password) {
    notify.warning({
      message: 'Iltimos parolni kiriting!',
      position: 'topRight',
    })
    isLoading.value = false
  } else {
    store.dispatch('auth/login', user).then(
      (data) => {
        addUserInStore()
        setTimeout(() => {
          if (store.state.user.role === 'admin') {
            router.push('/admin-dashboard')
          } else {
            router.push('/dashboard')
          }
          isLoading.value = false
          localStorage.setItem('role', store.state.user.role)
        }, 700)
      },
      (error) => {
        notify.error({
          message: error.response.data,
          position: 'topRight',
        })
        isLoading.value = false
      }
    )
  }
}

const sendSMSLink = () => {
  if (!clientPhone.value) {
    notify.warning({
      message: "Iltimos, telefon raqamni kiriting!",
      position: 'bottomLeft',
    })
  } else if (clientPhone.value.length <= 17) {
    notify.warning({
      message: "Iltimos, telefon raqamni to'g'ri kiriting!",
      position: 'bottomLeft',
    })
  } else {
    let clearedPhone = clientPhone.value.replace(')', '').replace('(', '').replace(' ', '').replace(' ', '').replace('-', '').replace('-', '')
    store.dispatch('clientModule/sendSMSLink', clearedPhone).then(
      () => {
        notify.success({
          message: "Xabarnoma telefoningizga jo'natildi!",
          position: 'bottomLeft',
        }),
          closeResetPasswordModal()
      },
      (error) => {
        notify.warning({
          message: error.response.data,
          position: 'bottomLeft',
        })
      }
    )
  }
}

onMounted(() => {
  if (document.getElementById('loader')) {
    document.getElementById('loader').remove()
  }
})
</script>

<style scoped>
.bg-image {
  background: url('../assets/images/bg-login.jpg') -290px center;
  background-size: cover;
}
</style>

*/