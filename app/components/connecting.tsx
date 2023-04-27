import CustomSpinner from "./spinner"

export default function Connecting() {
  return (
    <main className="flex flex-col items-center p-8 min-h-screen bg-[url(/grid.svg)]">
      <div
        className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] 
      before:-translate-x-1/2 before:rounded-full 
    before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']
     after:absolute after:-z-20 after:h-[180px] 
    after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 
    after:blur-2xl after:content-[''] 
    before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 
    after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"
      >
        <div className="flex justify-center pt-48">
          <div className="grid grid-cols">
            <CustomSpinner className="flex justify-center pl-2" />
            <div className="flex justify-center pt-6 text-lg font-bold">
              Connecting
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
