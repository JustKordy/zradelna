export default function Dishes() {
  return (
    // prozatimni navrh na vzhled teto stranky
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 md:flex-row">
        <div className="h-[80%] w-[90%] overflow-auto rounded-lg border-2 p-4 md:w-[40%]">
          <div className="mb-3 flex h-32 w-full items-center justify-between rounded-lg border-2 px-4"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
        </div>
        <div className="h-[80%] w-[90%] rounded-lg border-2 md:w-[40%]"></div>
      </div>
    </>
  );
}
