
import Image from "next/image"

export default function exerciseYourSocialSkills() {

  const convo = [
    "Where is that?",
    "Byron Bay Australia",
    "Oh, I've never been to Australia",
    "I'd say you should go",
    "but if you don't have anything to add about australia, the conversation might go flat",
    "Where you are from?",
  ]

  return (
    <div className="flex justify-center mt-10 sm:mt-20 h-52">
      <div className="grid grid-cols-2 sm:space-x-8">
        <div>
          <div className="mt-4 text-2xl font-semibold">
            Exercise your social skills
          </div>
          <div>Talk with someone who wants to talk</div>
        </div>
        <div>
          <div className="relative w-40 h-40">
            <Image src="/cafe_eating.jpg" fill={true} alt="cafe eating" className="border border-black rounded-lg"/>
            <div className="p-1 z-1 sm:text-lg absolute bottom-0 text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
              Byron Bay Australia
            </div>
          </div>

          <div className="bg-gray-100 w-[160px] px-2 rounded-lg my-1 py-0.5">
            Where is that?
          </div>
        </div>
      </div>
    </div>
  )
}
