type SwiperTitleProps = {
  text: string | number
}

export default function SwiperTitle({ text }: SwiperTitleProps) {
  return (
    <h2 className="text-2xl lg:text-4xl text-balance text-center max-w-md font-quicksand font-bold text-cuenti-dark-blue -tracking-[0.52px]">
      {text}
    </h2>
  )
}
