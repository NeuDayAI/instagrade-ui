import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import theme from './theme';
import { Dashboard } from './pages/Dashboard';
import { ExamDetail } from './pages/ExamDetail';
import { SubjectDetailPage } from './pages/SubjectDetail';
import { Results } from './pages/Results';
import { CreateExam } from './pages/CreateExam';
import { AnswerSheet } from './pages/AnswerSheet';
import { Performance } from './pages/Performance';
import { MasterData } from './pages/MasterData';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { ExamSchedule } from './pages/ExamSchedule';
import { useSidebarStore } from './store/sidebarStore';
import { useAuthStore } from './store/authStore';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
const PrivateRoutes = () => {
  const { isCollapsed } = useSidebarStore();
  const { user } = useAuthStore();

  return (
    <>
      <Sidebar />
      <Box
        ml={isCollapsed ? "70px" : "240px"}
        w="full"
        transition="margin-left 0.2s"
      >
        <Navbar />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="exam/:examId" element={<ExamDetail />} />
          <Route path="exam/:examId/schedule" element={<ExamSchedule />} />
          <Route path="subject/:subjectId" element={<SubjectDetailPage />} />
          <Route path="exam/:examId/subject/:subjectId/student/:studentId" element={<AnswerSheet />} />
          <Route path="results" element={<Results />} />
          <Route path="performance" element={<Performance />} />
          {user?.role === 'Admin' && (
            <Route path="master-data" element={<MasterData />} />
          )}
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <Flex>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <PrivateRoute>
                  <PrivateRoutes />
                </PrivateRoute>
              } />
            </Routes>
          </Flex>
        </Router>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;