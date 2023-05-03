import Link from "next/link"
import ApproachCard from "./landingPage/startAConversation"
import { useSpring, animated } from "@react-spring/web"
import SpringText from "./landingPage/textLikeYouTalk"
import ExerciseYourSocialSkills from "./landingPage/exerciseYourSocialSkills"
import TextLikeYouTalk from "./landingPage/textLikeYouTalk"
import StartAConversation from "./landingPage/startAConversation"
import BuildTheConfidence from "./landingPage/buildTheConfidence"

export default function Home() {
  const EmailButton = () => {
    return (
      <Link
        href="/email"
        className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm"
      >
        <div
          className={`fixed bottom-0 left-0 flex justify-center w-full pt-8 pb-6 border-b
       border-gray-300 cursor-pointer lg:flex lg:justify-center bg-gradient-to-b from-zinc-200
        backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static
         lg:w-52 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30`}
        >
          Feedback?<div className="ml-2 font-mono font-bold">email me</div>
        </div>
      </Link>
    )
  }

  return (
    <main className=" min-h-screen bg-[url(/grid.svg)]">
      <div
        className="p-3 relative flex justify-center place-items-center before:absolute before:h-[300px] before:w-[480px] 
        before:-translate-x-1/2 before:rounded-full 
      before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']
       after:absolute after:-z-20 after:h-[180px] 
      after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 
      after:blur-2xl after:content-[''] 
      before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 
      after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"
      >
        <div className="relative lg:mt-20">
          <div className="pl-4 text-4xl font-bold">Know what to say</div>
          {/* <div className="pl-4 mt-4 text-2xl font-bold">
            Practice Conversation
          </div> */}
          {/* <div className="mt-4 text-2xl ">Practice thinking out loud</div> */}
          <ExerciseYourSocialSkills />
          <TextLikeYouTalk />
        </div>
      </div>
      <StartAConversation />
      <ExerciseYourSocialSkills />
      <BuildTheConfidence />
    </main>
  )
}
