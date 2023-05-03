import Link from "next/link"
import Image from "next/image"

export default function StartAConversation() {
  return (
    <div className="flex justify-center">
      <div className="mt-10 h-80 w-[36rem]">
        <div className="p-2 mb-4 text-3xl font-bold text-center">
          Start a conversation:
        </div>
        <div className="flex justify-center">
          <div className="w-40 p-4 text-center bg-gray-100 border cursor-pointer sm:w-40 sm:mt-6 rounded-xl drop-shadow-xl">
            <Link href="/chat">
              <div>
                Random
                <div className="">
                  <Image
                    src="/blank_person.png"
                    width={340}
                    height={340}
                    alt="Blank Person"
                    className="border border-black"
                  />
                </div>
                    <div className="pt-3 text-lg font-bold">Text</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
