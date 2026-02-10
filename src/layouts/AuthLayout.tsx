import { Button, Image } from '@heroui/react'
import { Link, Outlet } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/assets/logo-invert.png'
import { useEffect, useState } from 'react'
import AuthCarousel from '@/components/auth/AuthCarousel'

const slides = [
  {
    title: "Manajemen Surat Digital",
    description: "Kelola surat-surat Anda dengan mudah dan efisien dalam satu platform terintegrasi",
    gradient: "bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900",
    shapes: [
      { size: "w-96 h-96", position: "top-20 right-20", blur: "blur-3xl", opacity: "bg-white/20" },
      { size: "w-80 h-80", position: "bottom-32 left-32", blur: "blur-3xl", opacity: "bg-white/15" },
      { size: "w-64 h-64", position: "top-1/2 right-1/3", blur: "blur-2xl", opacity: "bg-white/10" },
    ],
  },
  {
    title: "Tanda Tangan Digital",
    description: "Sistem tanda tangan digital yang aman dan terverifikasi untuk semua dokumen Anda",
    gradient: "bg-gradient-to-tr from-primary-400 via-primary-500 to-primary-600",
    shapes: [
      { size: "w-72 h-72", position: "top-32 left-40", blur: "blur-3xl", opacity: "bg-white/25" },
      { size: "w-96 h-96", position: "bottom-20 right-32", blur: "blur-3xl", opacity: "bg-white/15" },
      { size: "w-56 h-56", position: "top-2/3 left-1/4", blur: "blur-2xl", opacity: "bg-white/20" },
    ],
  },
  {
    title: "Arsip Terorganisir",
    description: "Sistem pengarsipan yang rapi dan mudah diakses kapan saja, di mana saja",
    gradient: "bg-gradient-to-bl from-primary-600 via-primary-700 to-primary-800",
    shapes: [
      { size: "w-88 h-88", position: "top-40 right-1/4", blur: "blur-3xl", opacity: "bg-white/18" },
      { size: "w-72 h-72", position: "bottom-40 left-20", blur: "blur-3xl", opacity: "bg-white/22" },
      { size: "w-64 h-64", position: "top-1/3 right-40", blur: "blur-2xl", opacity: "bg-white/12" },
    ],
  },
]

const AuthLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className='relative flex w-full h-screen overflow-hidden'>
      {/* Full Screen Gradient Backgrounds */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } ${slide.gradient}`}
        />
      ))}

      {/* Left Column - 20% Login Form */}
      <div className='w-full md:w-3/10 h-full flex flex-col relative bg-white md:border-r md:border-gray-200 p-8 z-10 shadow-xl'>
        {/* Back Button */}
        <div className='absolute top-6 left-6 z-10'>
          <Button
            as={Link}
            to='/'
            variant='light'
            color='primary'
            startContent={<ArrowLeft size={18} />}
            className='font-medium'
          >
            Kembali
          </Button>
        </div>

        {/* Mobile Logo */}
        <div className='md:hidden flex justify-center pt-20 pb-8'>
          <Image src={Logo} width={100} className='saturate-50' />
        </div>

        {/* Form Content */}
        <div className='flex-1 flex items-center justify-center p-8 md:p-6'>
          <div className='w-full max-w-md'>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Right Column - 80% Carousel */}
      <AuthCarousel
        slides={slides}
        currentSlide={currentSlide}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onSelectSlide={setCurrentSlide}
      />
    </div>
  )
}

export default AuthLayout