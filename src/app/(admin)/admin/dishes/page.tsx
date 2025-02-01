export default function Dishes() {
  return (
    // prozatimni navrh na vzhled teto stranky
    <>
      <div className="flex h-screen w-screen flex-row items-center justify-center gap-5">
        <div className="h-[80%] w-[40%] overflow-auto rounded-lg border-2 p-4">
          <div className="mb-3 flex h-32 w-full items-center justify-between rounded-lg border-2 px-4"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
          <div className="mb-3 h-32 w-full rounded-lg border-2"></div>
        </div>
        <div className="h-[80%] w-[40%] rounded-lg border-2"></div>
      </div>
    </>
  );
}
