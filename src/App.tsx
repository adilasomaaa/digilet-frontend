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
import GeneralLetterPage from './pages/dashboard/general-letter/GeneralLetterPage'
import GeneralLetterSubmissionPage from './pages/dashboard/general-letter/GeneralLetterSubmissionPage'
import GeneralLetterEditPage from './pages/dashboard/general-letter/GeneralLetterEditPage'
import LandingLayout from './layouts/LandingLayout'
import VerifySignaturePage from './pages/landing/VerifySignaturePage'
import DetailSignaturePage from './pages/landing/DetailSignaturePage'
import StudentLetterPage from './pages/dashboard/student-letter/StudentLetterPage'
import StudentLetterSubmissionPage from './pages/dashboard/student-letter/StudentLetterSubmissionPage'
import StudentLetterHistoryPage from './pages/dashboard/student-letter/StudentLetterHistoryPage'
import StudentLetterEditPage from './pages/dashboard/student-letter/StudentLetterEditPage'
import LandingPage from './pages/landing/LandingPage'
import StudentLetterVerifyPage from './pages/dashboard/student-letter/StudentLetterVerifyPage'
import GeneralLetterTemplate from './pages/dashboard/templates/GeneralLetterTemplate'
import GeneralLetterDetailPage from './pages/dashboard/general-letter/GeneralLetterDetailPage'
import GeneralLetterSignaturePage from './pages/dashboard/general-letter/GeneralLetterSignaturePage'
import StudentLetterTemplate from './pages/dashboard/templates/StudentLetterTemplate'
import StudentLetterDetailPage from './pages/dashboard/student-letter/StudentLetterDetailPage'
import GeneralLetterAttachmentPage from './pages/dashboard/general-letter/GeneralLetterAttachmentPage'
import StudentLetterSignaturePage from './pages/dashboard/student-letter/StudentLetterSignaturePage'
import StudentDashboardPage from './pages/dashboard/StudentDashboardPage'
import StudentLetterAttachment from './pages/dashboard/student-letter/StudentLetterAttachment'


function App() {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signature/verify/:token" element={<VerifySignaturePage />} />
          <Route path="/signature/detail/:token" element={<DetailSignaturePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute roles={["personnel","admin"]} redirectTo="/">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute roles={["personnel",'admin']} redirectTo="/">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/student" element={<StudentPage />} />
          <Route path="/dashboard/letter" element={<LetterPage />} />
          <Route path="/dashboard/header" element={<HeaderPage />} />
          <Route path="/dashboard/general-letter" element={<GeneralLetterPage />} />
          <Route path="/dashboard/general-letter/:id" element={<GeneralLetterSubmissionPage />} />
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
          <Route
            element={
                <GeneralLetterTemplate />
            }
          >
            <Route path="/dashboard/general-letter/:generalLetterId/detail" element={<GeneralLetterDetailPage />} />
            <Route path="/dashboard/general-letter/:generalLetterId/edit" element={<GeneralLetterEditPage />} />
            <Route path="/dashboard/general-letter/:generalLetterId/signature" element={<GeneralLetterSignaturePage />} />
            <Route path="/dashboard/general-letter/:generalLetterId/attachment" element={<GeneralLetterAttachmentPage />} />
            
          </Route>
          <Route
            element={
                <StudentLetterTemplate />
            }
          >
            <Route path="/dashboard/student-letter/:studentLetterId/detail" element={<StudentLetterDetailPage />} />
            <Route path="/dashboard/student-letter/:studentLetterId/edit" element={<StudentLetterVerifyPage />} />
            <Route path="/dashboard/student-letter/:studentLetterId/signature" element={<StudentLetterSignaturePage />} />
            <Route path="/dashboard/student-letter/:studentLetterId/edit" element={<StudentLetterVerifyPage />} />
            <Route path="/dashboard/student-letter/:studentLetterId/attachment" element={<StudentLetterAttachment />} />
            
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
        <Route
          element={
            <ProtectedRoute roles={['student']} redirectTo="/">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard-student" element={<StudentDashboardPage />} />
          <Route path="/dashboard/student-letter/submission" element={<StudentLetterSubmissionPage />} />
          <Route path="/dashboard/student-letter/history" element={<StudentLetterHistoryPage />} />
          <Route path="/dashboard/student-letter/edit/:id" element={<StudentLetterEditPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute roles={['personnel','admin']} redirectTo="/">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/student-letter" element={<StudentLetterPage />} />
          <Route path="/dashboard/student-letter/verify/:id" element={<StudentLetterVerifyPage />} />
        </Route>
      </Routes>
    </HeroUIProvider>
  )
}

export default App
