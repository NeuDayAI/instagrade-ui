import React from 'react';
import {
  IconButton,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  Text,
  useColorModeValue,
  Portal,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import { NotificationList } from './NotificationList';
import { useNotificationStore } from '../../store/notificationStore';

export const NotificationBell = () => {
  const { notifications, unreadCount, markAllAsRead, dismissAll } = useNotificationStore();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
            position="relative"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
              minW="5"
              textAlign="center"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width="400px"
          maxH="600px"
          overflowY="auto"
          shadow="xl"
          _focus={{ outline: 'none' }}
        >
          <PopoverHeader borderBottomWidth="1px" fontWeight="bold">
            <HStack justify="space-between">
              <Text>Notifications</Text>
              {notifications.length > 0 && (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={markAllAsRead}
                  isDisabled={unreadCount === 0}
                >
                  Mark all as read
                </Button>
              )}
            </HStack>
          </PopoverHeader>
          <PopoverBody p={0}>
            <NotificationList />
          </PopoverBody>
          {notifications.length > 0 && (
            <PopoverFooter borderTopWidth="1px">
              <Button size="sm" width="full" onClick={dismissAll}>
                Clear all
              </Button>
            </PopoverFooter>
          )}
        </PopoverContent>
      </Portal>
    </Popover>
  );
}