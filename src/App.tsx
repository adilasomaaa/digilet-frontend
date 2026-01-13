import { useState } from 'react'
import { Route, Routes, useHref, useNavigate } from 'react-router'
import LoginPage from './pages/auth/LoginPage'
import AuthLayout from './layouts/AuthLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import OfficialPage from './pages/dashboard/official/OfficialPage'
import PersonnelPage from './pages/dashboard/personnel/PersonnelPage'
import StudentPage from './pages/dashboard/student/StudentPage'
import LetterPage from './pages/dashboard/letter/LetterPage'
import HeaderPage from './pages/dashboard/header/HeaderPage'
import LetterTemplate from './pages/dashboard/templates/LetterTemplate'
import LetterSignatureTemplatePage from './pages/dashboard/letter-signature-template/LetterSignatureTemplatePage'
import LetterAttributePage from './pages/dashboard/letter-attribute/LetterAttributePage'
import LetterDocumentPage from './pages/dashboard/letter-document/LetterDocumentPage'
import LetterTemplatePage from './pages/dashboard/letter-template/LetterTemplatePage'
import { HeroUIProvider } from '@heroui/react'
import InstitutionPage from './pages/dashboard/institution/InstitutionPage'

function App() {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute roles={["personnel",'admin']} redirectTo="/">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/student" element={<StudentPage />} />
            <Route path="/dashboard/letter" element={<LetterPage />} />
            <Route path="/dashboard/header" element={<HeaderPage />} />
            <Route
              element={
                  <LetterTemplate />
              }
            >
              <Route path="/dashboard/:letterId/letter-signature-template" element={<LetterSignatureTemplatePage />} />
              <Route path="/dashboard/:letterId/letter-attribute" element={<LetterAttributePage />} />
              <Route path="/dashboard/:letterId/letter-document" element={<LetterDocumentPage />} />
              <Route path="/dashboard/:letterId/letter-template" element={<LetterTemplatePage />} />
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute roles={["admin"]} redirectTo="/">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/study-program" element={<InstitutionPage />} />
            <Route path="/dashboard/official" element={<OfficialPage />} />
            <Route path="/dashboard/personnel" element={<PersonnelPage />} />
            <Route path="/dashboard/student" element={<StudentPage />} />
          </Route>
      </Routes>
    </HeroUIProvider>
  )
}

export default App
