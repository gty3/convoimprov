import Card from "./startAConversation/card";

export default function StartAConversation() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="p-2 text-lg font-bold">Start a conversation:</div>
        <div className="grid grid-cols-2 gap-4 p-4 text-center cursor-pointer md:mt-6 md:gap-10 max-w-64">
          <Card image="/blank_person.png" medium="Text" />
        </div>
      </div>
    </div>
  )
}
