import { useState } from 'react'
import { Route, Routes } from 'react-router'
import LoginPage from './pages/auth/LoginPage'
import AuthLayout from './layouts/AuthLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import StudyProgramPage from './pages/dashboard/study-program/StudyProgramPage'
import OfficialPage from './pages/dashboard/official/OfficialPage'
import PersonnelPage from './pages/dashboard/personnel/PersonnelPage'
import StudentPage from './pages/dashboard/student/StudentPage'
import LetterPage from './pages/dashboard/letter/LetterPage'
import HeaderPage from './pages/dashboard/header/HeaderPage'

function App() {
  return (
    <Routes>
       <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute roles={["admin"]} redirectTo="/">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/study-program" element={<StudyProgramPage />} />
          <Route path="/dashboard/official" element={<OfficialPage />} />
          <Route path="/dashboard/personnel" element={<PersonnelPage />} />
          <Route path="/dashboard/student" element={<StudentPage />} />
          <Route path="/dashboard/letter" element={<LetterPage />} />
          <Route path="/dashboard/header" element={<HeaderPage />} />
        </Route>
    </Routes>
  )
}

export default App
