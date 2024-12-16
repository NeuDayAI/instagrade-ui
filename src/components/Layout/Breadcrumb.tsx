import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const breadcrumbItems = [
    { path: '/', label: 'Home' },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { path, label };
    })
  ];

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      mb={4}
    >
      {breadcrumbItems.map((item, index) => (
        <BreadcrumbItem key={item.path}>
          <BreadcrumbLink
            as={Link}
            to={item.path}
            color={index === breadcrumbItems.length - 1 ? 'blue.500' : 'gray.500'}
            fontWeight={index === breadcrumbItems.length - 1 ? 'semibold' : 'normal'}
          >
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};