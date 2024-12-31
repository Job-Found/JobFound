import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import JobDetailsPage from './pages/JobDetailsPage';
import InterviewTips from './pages/resources/InterviewTips';
import ResumeGuide from './pages/resources/ResumeGuide';
import CareerAdvice from './pages/resources/CareerAdvice';
import { Box, Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Flex
        direction="column"
        minH="100vh"
        position="relative"
      >
        <Navbar />
        <Box flex="1" pb="6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/resources/interview-tips" element={<InterviewTips />} />
              <Route path="/resources/resume-guide" element={<ResumeGuide />} />
              <Route path="/resources/career-advice" element={<CareerAdvice />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/job/:id" element={<JobDetailsPage />} />
            </Routes>
          </AnimatePresence>
        </Box>
        <Footer />
      </Flex>
    </AuthContextProvider>
  );
}

export default App;
