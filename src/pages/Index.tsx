import { useAppDispatch, useAppSelector } from "../app/hook";
import { toggleModal } from "../features/modal/resetPasswordModalSlice";
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';

export default function Index<ReactNode>() {
  const { isOpenModal } = useAppSelector((state) => state.resetPasswordModalSlice)
  const dispatch = useAppDispatch()

  const notify = () => toast.success('🦄 Wow so easy!');

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
      <div className="px-10 py-3">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl capitalize h-[40vh] p-5">
            <div className="flex items-center">
              <div>Spending stats</div>
              <div className="flex items-center">
                <div>Personal</div>
                <div>Business</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl capitalize h-full p-5">
              <div onClick={() => dispatch(toggleModal(!isOpenModal))} className="bg-blue-500 p-3 rounded-xl cursor-pointer shadow text-white">bos</div>
              <div onClick={notify} className="bg-yellow-500 p-3 rounded-xl cursor-pointer shadow text-white">Toastify</div>
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="bg-white rounded-xl capitalize h-[43vh] p-5 col-span-3">
            <div className="flex items-center">
              <div>Spending stats</div>
              <div className="flex items-center">
                <div>Personal</div>
                <div>Business</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 grid-rows-4">
            <div className="bg-white rounded-xl capitalize h-full p-5 row-span-3">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}