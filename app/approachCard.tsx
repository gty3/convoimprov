import Image from "next/image"
import Link from "next/link"

export default function ApproachCard() {
  // const ProceedButton = () => {
  //   return (
  //     <div className="flex justify-center py-3 m-2 font-bold text-white rounded-lg cursor-pointer bg-slate-800">
  //       Approach
  //     </div>
  //   )
  // }

  return (
    <>
      <div></div>
      <Link
        href="/chat"
        className={`px-5 py-4 transition-colors bg-gray-100 border border-transparent
           border-gray-300 rounded-lg drop-shadow-md group hover:dark:border-neutral-700
            hover:dark:bg-neutral-800 hover:dark:bg-opacity-30`}
      >
        <div>
          <div className="flex justify-center ">
            <Image
              src="/cafe_eating.jpg"
              width={340}
              height={340}
              alt="guy eating at cafe"
              className="border border-black"
            />
          </div>
          {/* <div className="flex justify-center">
        </div> */}
          <div className="flex justify-center">
            <div className="w-40">
              <div className="pt-3 text-lg font-bold">Talk to me</div>
              <div>Text</div>
            </div>
          </div>
        </div>
      </Link>
      <div></div>
    </>
  )
}
