import Image from "next/image"
import Link from "next/link"

export default function ApproachCard({
  image,
  medium,
  disabled
}: {
  image: string
  medium: string
  disabled?: boolean
}) {
  // const ProceedButton = () => {
  //   return (
  //     <div className="flex justify-center py-3 m-2 font-bold text-white rounded-lg cursor-pointer bg-slate-800">
  //       Approach
  //     </div>
  //   )
  // }

  return (
    <>
      <Link
      
        href="/chat"
        className={`md:w-40 md:px-5 md:py-4 px-2 py-3 md:m-4 mx-2 transition-colors bg-gray-100 border border-transparent
           border-gray-300 rounded-lg drop-shadow-md group hover:dark:border-neutral-700
            hover:dark:bg-neutral-800 hover:dark:bg-opacity-30`}
      >
        <div>
          Random
          <div className="flex justify-center ">
            <Image
              src={image}
              width={340}
              height={340}
              alt={image}
              className="border border-black"
            />
          </div>
          {/* <div className="flex justify-center">
        </div> */}
          <div className="flex justify-center">
            <div className="w-40">
              <div className="pt-3 text-lg font-bold">{medium}</div>
              {/* <div>Text</div> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
