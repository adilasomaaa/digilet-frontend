
import { Outlet } from 'react-router'

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow">
            <Outlet />
        </main>
        
    </div>
  )
}

export default LandingLayout