import Image from "next/image";

export default function exerciseYourSocialSkills() {
  return (
    <div className="flex justify-center">
      <div>
        <div className="mt-4 text-2xl font-semibold">Exercise your social skills</div>
        <div>Say whatever comes to mind</div>
        <Image src="/cafe_eating.jpg" width={160} height={160} alt="cafe eating" />
        <div>What are you eating</div>
      </div>
     
    </div>
  )
}
