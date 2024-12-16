import React from 'react';
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { DepartmentManager } from '../components/MasterData/DepartmentManager';
import { SubjectManager } from '../components/MasterData/SubjectManager';
import { StudentManager } from '../components/MasterData/StudentManager';
import { UserManager } from '../components/MasterData/UserManager';

export const MasterData = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      <Box bg="white" borderRadius="lg" p={8} shadow="sm">
        <Tabs isLazy>
          <TabList>
            <Tab>Departments</Tab>
            <Tab>Subjects</Tab>
            <Tab>Students</Tab>
            <Tab>Users</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DepartmentManager />
            </TabPanel>
            <TabPanel>
              <SubjectManager />
            </TabPanel>
            <TabPanel>
              <StudentManager />
            </TabPanel>
            <TabPanel>
              <UserManager />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};