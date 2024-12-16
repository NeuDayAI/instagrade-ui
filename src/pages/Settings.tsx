import React from 'react';
import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useColorMode,
  useToast,
  SimpleGrid,
  HStack,
  Icon,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { FiBell, FiMoon, FiLock, FiEye } from 'react-icons/fi';
import { useSettingsStore } from '../store/settingsStore';

export const Settings = () => {
  const { colorMode, setColorMode } = useColorMode();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const {
    notifications,
    preferences,
    updateNotifications,
    updatePreferences,
  } = useSettingsStore();

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      
      <Box mb={8}>
        <Heading size="xl" mb={2}>Settings</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Customize your examination portal experience
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Notifications */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <HStack mb={6}>
            <Icon as={FiBell} boxSize={5} />
            <Heading size="md">Notifications</Heading>
          </HStack>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Email Notifications</FormLabel>
              <Switch
                isChecked={notifications.emailNotifications}
                onChange={(e) => updateNotifications({
                  emailNotifications: e.target.checked
                })}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Exam Reminders</FormLabel>
              <Switch
                isChecked={notifications.examReminders}
                onChange={(e) => updateNotifications({
                  examReminders: e.target.checked
                })}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Result Alerts</FormLabel>
              <Switch
                isChecked={notifications.resultAlerts}
                onChange={(e) => updateNotifications({
                  resultAlerts: e.target.checked
                })}
              />
            </FormControl>
          </VStack>
        </Box>

        {/* Display Preferences */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <HStack mb={6}>
            <Icon as={FiEye} boxSize={5} />
            <Heading size="md">Display Preferences</Heading>
          </HStack>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Dark Mode</FormLabel>
              <Switch
                isChecked={colorMode === 'dark'}
                onChange={(e) => setColorMode(e.target.checked ? 'dark' : 'light')}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Show Marks</FormLabel>
              <Switch
                isChecked={preferences.showMarks}
                onChange={(e) => updatePreferences({
                  showMarks: e.target.checked
                })}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb={0}>Show Performance Statistics</FormLabel>
              <Switch
                isChecked={preferences.showPerformanceStats}
                onChange={(e) => updatePreferences({
                  showPerformanceStats: e.target.checked
                })}
              />
            </FormControl>
          </VStack>
        </Box>

        {/* Privacy & Security */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <HStack mb={6}>
            <Icon as={FiLock} boxSize={5} />
            <Heading size="md">Privacy & Security</Heading>
          </HStack>
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="lg"
            p={6}
            bg={useColorModeValue('blue.50', 'blue.900')}
          >
            <AlertIcon boxSize="24px" mr={0} mb={4} />
            <AlertTitle mb={2}>Coming Soon!</AlertTitle>
            <AlertDescription>
              Advanced security features like password change and two-factor authentication will be available soon.
            </AlertDescription>
          </Alert>
        </Box>
      </SimpleGrid>

      <Box mt={8} textAlign="right">
        <Button colorScheme="blue" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};