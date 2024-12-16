import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  RadioGroup,
  Radio,
  Image,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiEye, FiEyeOff, FiMail, FiLock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToast } from '@chakra-ui/react';

import logo from '@/assets/images/logo.svg';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  role: z.string().min(1, 'Role is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password is too long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'Student'
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password, data.role);
      
      if (result.success) {
        toast({
          title: 'Login Successful',
          description: result.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          icon: <FiCheckCircle />
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: result.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          icon: <FiAlertCircle />
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        icon: <FiAlertCircle />
      });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
      h="100vh"
      display="flex"
      alignItems="center"
    >
      <Stack spacing="8" w="full">
        <Stack spacing="6" align="center">
          <Image
            src={logo}
            alt="InstaGrade Logo"
            h="60px"
          />
          <Stack spacing="3" textAlign="center">
            <Heading size="lg">Welcome to InstaGrade</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Sign in to your account to continue
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel>Login As</FormLabel>
                  <RadioGroup
                    value={selectedRole}
                    onChange={(value) => setValue('role', value)}
                  >
                    <Stack direction="row" spacing={4}>
                      <Radio value="Student">Student</Radio>
                      <Radio value="Examiner">Examiner</Radio>
                      <Radio value="Admin">Admin</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="Enter your email"
                      bg={useColorModeValue('white', 'gray.700')}
                    />
                    <InputRightElement>
                      <FiMail color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      placeholder="Enter your password"
                      bg={useColorModeValue('white', 'gray.700')}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <HStack justify="flex-end">
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </Box>

        <VStack spacing={1} align="center">
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            Having trouble signing in?
          </Text>
          <Button variant="link" colorScheme="blue" size="sm">
            Contact support
          </Button>
        </VStack>
      </Stack>
    </Container>
  );
};