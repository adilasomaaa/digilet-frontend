import { Button, Image } from '@heroui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Logo from '@/assets/logo-invert.png'
import LogoUmgo from '@/assets/umgo_logo.png'

interface Shape {
  size: string
  position: string
  blur: string
  opacity: string
}

interface Slide {
  title: string
  description: string
  gradient: string
  shapes: Shape[]
}

interface AuthCarouselProps {
  slides: Slide[]
  currentSlide: number
  onPrevSlide: () => void
  onNextSlide: () => void
  onSelectSlide: (index: number) => void
}

const AuthCarousel = ({
  slides,
  currentSlide,
  onPrevSlide,
  onNextSlide,
  onSelectSlide,
}: AuthCarouselProps) => {
  return (
    <div className='relative w-7/10 h-full hidden md:flex z-10 overflow-hidden'>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Decorative Blurred Shapes - Unique per Slide */}
          <div className='absolute inset-0 pointer-events-none'>
            {slide.shapes.map((shape, shapeIndex) => (
              <div
                key={shapeIndex}
                className={`absolute ${shape.position} ${shape.size} ${shape.opacity} rounded-full ${shape.blur}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className='relative h-full flex flex-col justify-between p-12 z-10'>
            {/* Logo */}
            <div className='flex justify-start items-center gap-2'>
              <Image src={LogoUmgo} width={45} />
              <Image src={Logo} width={120} />
            </div>

            {/* Title and Description */}
            <div className='max-w-2xl mb-20'>
              <h1 className='text-5xl font-bold text-white mb-6'>
                {slide.title}
              </h1>
              <p className='text-xl text-white/90'>
                {slide.description}
              </p>
            </div>

            {/* Navigation */}
            <div className='flex items-center gap-4'>
              <Button
                isIconOnly
                variant='light'
                className='text-white hover:bg-white/20'
                onPress={onPrevSlide}
              >
                <ChevronLeft size={24} />
              </Button>
              
              <div className='flex gap-2'>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <Button
                isIconOnly
                variant='light'
                className='text-white hover:bg-white/20'
                onPress={onNextSlide}
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AuthCarousel
