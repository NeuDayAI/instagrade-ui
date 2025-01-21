import React from 'react';
import {
  Box,
  Button,
  Container,
  ButtonGroup,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  Flex,
  useColorModeValue,
  Image,
  VStack,
  HStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  Divider,
  Card,
  CardBody,
  Tooltip,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FiAward,
  FiBarChart2,
  FiClock,
  FiCloudLightning,
  FiFileText,
  FiShield,
  FiCheckCircle,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiPieChart,
  FiLogIn,
  FiGlobe,
  FiHeadphones,
  FiPhone,
  FiMail,
  FiArrowRight,
} from 'react-icons/fi';
import logo from '@/assets/images/logo.svg';
import landing_page_img1 from '@/assets/images/landing-page_img1.png';
import landing_page_img2 from '@/assets/images/landing-page_img2.png';
import landing_page_img3 from '@/assets/images/landing-page_img3.png';
import '@/assets/styles/index.css';

interface LandingProps {
  showLanding?: boolean;
}

interface BenefitItem {
  icon: any;
  title: string;
  description: string;
}

interface AnalyticFeature {
  icon: any;
  title: string;
  description: string;
}

const benefitItems: BenefitItem[] = [
  {
    icon: FiDollarSign,
    title: 'Cost Reduction',
    description: 'Reduce evaluation costs by up to 70% through automation'
  },
  {
    icon: FiClock,
    title: 'Time Efficiency',
    description: 'Complete evaluation process 5x faster than traditional methods'
  },
  {
    icon: FiUsers,
    title: 'Resource Optimization',
    description: 'Better utilization of teaching staff for more valuable activities'
  },
  {
    icon: FiTrendingUp,
    title: 'Quality Improvement',
    description: 'Consistent and unbiased evaluation across all submissions'
  }
];

const analyticFeatures: AnalyticFeature[] = [
  {
    icon: FiPieChart,
    title: 'Performance Metrics',
    description: 'Detailed subject-wise and topic-wise analysis'
  },
  {
    icon: FiTrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor improvement over time with trend analysis'
  },
  {
    icon: FiBarChart2,
    title: 'Comparative Analysis',
    description: 'Compare performance across classes and subjects'
  },
  {
    icon: FiSettings,
    title: 'Customizable Reports',
    description: 'Generate detailed reports for stakeholders'
  }
];

const ProcessStep = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <Card
    bg={useColorModeValue('white', 'gray.700')}
    shadow="lg"
    _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    transition="all 0.3s"
  >
    <CardBody>
      <HStack spacing={4} align="start">
        <Box
          bg={useColorModeValue('blue.50', 'blue.900')}
          p={3}
          borderRadius="full"
          color={useColorModeValue('blue.600', 'blue.200')}
        >
          <Text fontWeight="bold" fontSize="lg">{number}</Text>
        </Box>
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">{title}</Text>
          <Text color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
        </VStack>
      </HStack>
    </CardBody>
  </Card>
);

const Feature = ({ title, text, icon }: { title: string; text: string; icon: any }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={8}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
    >
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        rounded="full"
        bg={useColorModeValue('blue.50', 'blue.900')}
        color={useColorModeValue('blue.600', 'blue.200')}
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>
    </Stack>
  );
};

export const Landing = ({ showLanding = true }: LandingProps) => {
  if (!showLanding) {
    return null;
  }

  return (
    <Box>
      {/* Top Navigation */}
      <Box 
        position="fixed" 
        top={0} 
        left={0} 
        right={0} 
        zIndex={10}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
      >
        <Container maxW="container.xl">
          <HStack justify="space-between" py={4}>
            <Image
              src={logo}
              alt="InstaGrade Logo"
              h="40px"
            />
           <Button
              as={RouterLink}
              to="/login"
              leftIcon={<FiLogIn />}
              variant="ghost"
              colorScheme="blue"
            >
              Sign In
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        bg={useColorModeValue('blue.50', 'gray.900')}
        pt={{ base: 20, md: 28 }}
        pb={{ base: 16, md: 24 }}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 16 }}
            align="center"
          >
            <VStack spacing={6} align="flex-start" flex={1}>
              <Badge
                colorScheme="blue"
                fontSize="md"
                px={4}
                py={1}
                rounded="full"
              >
                AI-Powered Exam Evaluation
              </Badge>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                lineHeight="shorter"
              >
                Transform Your Exam 
                <Text
                  as="span"
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                > Evaluation Process
                </Text>
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                Streamline exam assessment with AI-powered evaluation, real-time analytics, 
                and comprehensive performance insights.
              </Text>
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/login"
                  size="lg"
                  colorScheme="blue"
                  px={8}
                >
                  Get Started
                </Button>
              </HStack>
            </VStack>
            <Box flex={1}>
              <Image
                src={landing_page_img1}
                alt="AI Evaluation"
                w="full"
                maxW="600px"
                shadow="2xl"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading>Powerful Features for Modern Education</Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="2xl"
            >
              InstaGrade combines cutting-edge AI technology with intuitive design to 
              revolutionize the way educational institutions handle examinations.
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            pt={8}
          >
            <Feature
              icon={FiCloudLightning}
              title="AI-Powered Evaluation"
              text="Leverage advanced AI algorithms for fast, accurate, and consistent evaluation of answer sheets."
            />
            <Feature
              icon={FiBarChart2}
              title="Real-time Analytics"
              text="Get instant insights into student performance with comprehensive analytics and visualization tools."
            />
            <Feature
              icon={FiShield}
              title="Secure & Reliable"
              text="Enterprise-grade security ensures your examination data remains protected and confidential."
            />
            <Feature
              icon={FiClock}
              title="Time-Efficient"
              text="Reduce evaluation time by up to 80% while maintaining accuracy and fairness in assessment."
            />
            <Feature
              icon={FiFileText}
              title="Smart Feedback"
              text="Provide detailed, constructive feedback to students automatically based on their responses."
            />
            <Feature
              icon={FiAward}
              title="Performance Tracking"
              text="Track student progress over time with detailed performance metrics and improvement suggestions."
            />
          </SimpleGrid>
        </VStack>
      </Container>

      {/* How It Works Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading>How InstaGrade Works</Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="2xl"
              >
                A streamlined process from exam creation to result analysis
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <ProcessStep
                number="01"
                title="Easy Setup for Administrators"
                description="Quick setup process with intuitive interface for creating exams, adding subjects, and managing question papers."
              />
              <ProcessStep
                number="02"
                title="Automated Student Information"
                description="Upload answer sheets and let our system automatically populate student information using advanced recognition."
              />
              <ProcessStep
                number="03"
                title="AI-Powered Evaluation"
                description="Accurate grading with detailed feedback using state-of-the-art AI algorithms trained on educational assessment."
              />
              <ProcessStep
                number="04"
                title="Expert Review & Verification"
                description="Examiners can easily review, modify if needed, and approve the AI-generated evaluations."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} alignItems="center">
          <Box>
            <VStack align="start" spacing={6}>
              <Heading size="lg">Benefits for Educational Institutions</Heading>
              <List spacing={4}>
                {benefitItems.map((item, index) => (
                  <ListItem key={index}>
                    <HStack>
                      <ListIcon as={item.icon} color="blue.500" />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{item.title}</Text>
                        <Text color={useColorModeValue('gray.600', 'gray.300')}>
                          {item.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Box>
          <Box>
            <Image
              src={landing_page_img2}
              alt="Analytics Dashboard"
              w="full"
              rounded="lg"
              shadow="2xl"
            />
          </Box>
        </SimpleGrid>
      </Container>

      {/* Analytics Section */}
      <Box bg={useColorModeValue('blue.50', 'gray.800')} py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} alignItems="center">
            <Box order={{ base: 2, md: 1 }}>
              <Image
                src={landing_page_img3}
                alt="Performance Insights"
                w="full"
                rounded="lg"
                shadow="2xl"
              />
            </Box>
            <VStack align="start" spacing={8} order={{ base: 1, md: 2 }}>
              <Heading size="lg">Comprehensive Analytics & Insights</Heading>
              <SimpleGrid columns={2} spacing={6}>
                {analyticFeatures.map((item, index) => (
                  <Box key={index} p={4} bg={useColorModeValue('white', 'gray.700')} rounded="lg" shadow="md">
                    <VStack align="start" spacing={2}>
                      <Icon as={item.icon} boxSize={6} color="blue.500" />
                      <Text fontWeight="bold">{item.title}</Text>
                      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                        {item.description}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box bg={useColorModeValue('blue.50', 'gray.900')} py={16}>
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            align="center"
            justify="space-between"
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            rounded="xl"
            shadow="md"
          >
            <VStack align="flex-start" spacing={2}>
              <Heading size="lg">Ready to Transform Your Evaluation Process?</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')}>
                Join thousands of educators using InstaGrade to streamline their examination workflow.
              </Text>
            </VStack>
            <Button
              as={RouterLink}
              to="/login"
              size="lg"
              colorScheme="blue"
              px={8}
            >
              Start Now
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Trust Indicators */}
      <Box py={16} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading size="lg" textAlign="center">Trusted by Leading Institutions</Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              <VStack>
                <Heading size="2xl" color="blue.500">500+</Heading>
                <Text textAlign="center">Educational Institutions</Text>
              </VStack>
              <VStack>
                <Heading size="2xl" color="blue.500">1M+</Heading>
                <Text textAlign="center">Evaluations Completed</Text>
              </VStack>
              <VStack>
                <Heading size="2xl" color="blue.500">98%</Heading>
                <Text textAlign="center">Accuracy Rate</Text>
              </VStack>
              <VStack>
                <Heading size="2xl" color="blue.500">24/7</Heading>
                <Text textAlign="center">Support Available</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} borderTop="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container maxW="container.xl" py={16}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            <VStack align="start" spacing={4}>
              <Image src={logo} alt="InstaGrade Logo" h="40px" />
              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                Transforming education through AI-powered evaluation
              </Text>
            </VStack>
            
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold">Product</Text>
              <Link>Features</Link>
              <Link>Pricing</Link>
              <Link>Case Studies</Link>
              <Link>Documentation</Link>
            </VStack>
            
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold">Company</Text>
              <Link>About Us</Link>
              <Link>Careers</Link>
              <Link>Blog</Link>
              <Link>Press Kit</Link>
            </VStack>
            
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold">Contact</Text>
              <HStack>
                <Icon as={FiMail} />
                <Link>support@instagrade.com</Link>
              </HStack>
              <HStack>
                <Icon as={FiPhone} />
                <Link>+1 (555) 123-4567</Link>
              </HStack>
              <HStack spacing={4}>
                <IconButton
                  aria-label="Globe"
                  icon={<FiGlobe />}
                  variant="ghost"
                  size="sm"
                />
                <IconButton
                  aria-label="Support"
                  icon={<FiHeadphones />}
                  variant="ghost"
                  size="sm"
                />
              </HStack>
            </VStack>
          </SimpleGrid>
          
          <Divider my={8} />
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
              © {new Date().getFullYear()} NeuDayAI Technologies Pvt. Ltd. All rights reserved.
            </Text>
            <HStack spacing={4} justify={{ base: 'flex-start', md: 'flex-end' }}>
              <Link fontSize="sm">Privacy Policy</Link>
              <Link fontSize="sm">Terms of Service</Link>
              <Link fontSize="sm">Cookie Policy</Link>
            </HStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};