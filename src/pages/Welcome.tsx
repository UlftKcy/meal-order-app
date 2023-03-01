import { useRef } from 'react';
import { motion, useInView, useTime, useTransform } from "framer-motion";
import MealImg from "../assets/meal.jpg";
import { Link } from 'react-router-dom';

const Welcome = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const time = useTime();
  const rotate = useTransform(time, [0, 9000], [0, 360], { clamp: false });

  return (
    <div className='flex justify-around items-center p-5 h-1/2 my-20 sm:my-40'>
      <div ref={headerRef}>
        <div
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.25, 0.50, 0.75, 1) 0.2s"
          }}
        >
          <span className='text-orange-600 font-bold tracking-wide underline underline-offset-4'>WELCOME</span>
          <h1 className="text-5xl font-extrabold tracking-wide text-slate-700 mb-10 mt-5">Choosing <br /> Quality Food</h1>
          <p className='text-sm text-slate-600 tracking-wider'>
            You choose the ingredients of each meal in different qualities.
          </p>
          <Link to='/menu' className='inline-block mt-5 bg-orange-500 hover:bg-orange-400 transition-colors ease-in-out text-white font-bold tracking-wide px-8 py-3 rounded-3xl'>
            Discover Menu
          </Link>
        </div>
      </div>
      <div className='hidden md:block -z-10'
        style={{
          transform: isInView ? "none" : "translateX(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.25, 0.50, 0.75, 1) 0.2s"
        }}
      >
        <motion.div className='bg-slate-100 rounded-2xl bg-transparent' style={{ rotate }}>
          <img src={MealImg} alt="meal" className='min-w-fit h-80 rounded-full' />
        </motion.div>
      </div>
    </div>
  )
}

export default Welcome