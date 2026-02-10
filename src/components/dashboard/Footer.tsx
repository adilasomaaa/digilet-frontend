import { Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="flex justify-between flex-col sm:flex-row gap-4 p-4 px-8 border-t border-gray-200">
        <p>© 2025 Dinul Islam - UMGO. All rights reserved. </p>
        <span className="flex items-center gap-1">Created with <Heart className="w-4 h-4 fill-red-500"></Heart> by Yasdil Lasoma</span>
    </footer>
  )
}

export default Footer