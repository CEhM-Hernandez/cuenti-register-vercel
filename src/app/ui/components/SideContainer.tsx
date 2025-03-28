export default function SideContainer({
  children,
  startContent,
  endContent,
  className,
  hasRightCircles,
  hasLeftCircles,
}: {
  children: React.ReactNode
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  className?: string
  hasRightCircles?: boolean
  hasLeftCircles?: boolean
}) {
  return (
    <section
      className={`w-full py-4 lg:py-6 flex flex-col justify-center items-center relative ${className ? className : ''}`}
    >
      {startContent && (
        <div className="flex gap-2 absolute top-0 right-0 md:right-auto md:left-0 justify-center items-center text-base">
          {startContent}
        </div>
      )}
      {children}
      {endContent && (
        <div className="flex gap-2 absolute bottom-0 left-0 md:right-auto items-center justify-center">
          {endContent}
        </div>
      )}
      {(hasLeftCircles || hasRightCircles) && (
        <>
          <div
            className={`w-[600px] h-[600px] bg-cuenti-light-blue blur-3xl rounded-full opacity-50 absolute -top-2/3 2xl:-top-1/2  ${hasLeftCircles ? '-left-2/3 2xl:-left-1/2' : '-right-2/3 xl:-right-1/2'}`}
          />
          <div
            className={`w-[600px] h-[600px] bg-cuenti-yellow blur-3xl rounded-full opacity-50 absolute -bottom-2/3 2xl:-bottom-1/2 ${hasLeftCircles ? '-left-2/3 2xl:-left-1/2' : '-right-2/3 lg:-right-1/2'}`}
          />
        </>
      )}
    </section>
  )
}
