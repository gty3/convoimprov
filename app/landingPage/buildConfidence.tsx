"use client"
import Image from "next/image"

export default function BuildConfidence() {

  const convo = [

  ]
  
  return (
    <div className="flex justify-center m-2 mt-8 sm:mt-16">
      <div className="h-52 w-[36rem]">
        {/* <div className="mb-6 text-2xl font-bold">
          Build confidence and get past small talk
        </div> */}
        <div className="grid grid-cols-2">
          <div className="relative w-40 h-40 ">
            <Image
            className="border border-black rounded-lg"
              src="/dylan_christchurch.jpg"
              fill={true}
              alt="Dylan Christchurch"
            />
            <div className="p-1 z-1 sm:text-lg absolute bottom-0 text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]"></div>
          </div>
          <div>
          <div className="text-xl font-bold sm:text-2xl">
          Build confidence and get past small talk
          </div>
          <div>Talk with someone who wants to talk</div>
          </div>
        </div>
      </div>
    </div>
  )
}
