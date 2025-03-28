export default function Separator() {
  return (
    <div className="flex w-full gap-3 justify-center items-center text-[#D1D1D6]">
      <span className="w-full h-[2px] bg-current rounded-full"></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        width="30"
        height="30"
      >
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      </svg>
      <span className="w-full h-[2px] bg-current rounded-full"></span>
    </div>
  )
}
