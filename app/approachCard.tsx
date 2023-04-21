
import Image from "next/image"
import Link from "next/link"

export default function ApproachCard() {

  const ProceedButton = () => {
    return (
      <div
        className="flex justify-center py-3 m-2 font-bold text-white rounded-lg cursor-pointer bg-slate-800"
      >
        Approach
      </div>
    )
  }

  return (

        <Link
          href="/chat"
          className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
        >
          <h2 className={` text-2xl font-semibold mb-4`}>Start with me </h2>
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
            <div className="flex justify-center">
              <div className="max-w-3xl m-2 mt-4">
                {`Approach as many times as you'd like.`}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-40">
                <ProceedButton />
              </div>
            </div>
      </div>
        </Link>

  )
}
