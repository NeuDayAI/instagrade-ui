import React from 'react';
import {
  VStack,
  Box,
  Text,
  IconButton,
  HStack,
  Badge,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FiX, FiCheck, FiExternalLink } from 'react-icons/fi';
import { useNotificationStore } from '../../store/notificationStore';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const NotificationList = () => {
  const { notifications, markAsRead, dismissNotification } = useNotificationStore();
  const navigate = useNavigate();
  const bgHover = useColorModeValue('gray.50', 'gray.700');

  const handleAction = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  if (notifications.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text color="gray.500">No notifications</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={0} align="stretch">
      {notifications.map((notification) => (
        <Box
          key={notification.id}
          p={4}
          borderBottomWidth="1px"
          _hover={{ bg: bgHover }}
          opacity={notification.isRead ? 0.7 : 1}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1} flex={1}>
              <HStack>
                <Text fontWeight="medium">{notification.title}</Text>
                {!notification.isRead && (
                  <Badge colorScheme="blue" variant="solid" fontSize="xs">
                    New
                  </Badge>
                )}
                {notification.priority === 'high' && (
                  <Badge colorScheme="red" variant="subtle" fontSize="xs">
                    Important
                  </Badge>
                )}
              </HStack>
              <Text fontSize="sm" color="gray.500">
                {notification.message}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {format(new Date(notification.timestamp), 'MMM dd, yyyy HH:mm')}
              </Text>
              {notification.actions && (
                <HStack spacing={2} mt={2}>
                  {notification.actions.map((action) => (
                    <Button
                      key={action.label}
                      size="xs"
                      variant="ghost"
                      onClick={() => {
                        if (action.action === 'dismiss') {
                          dismissNotification(notification.id);
                        } else if (action.action === 'view' && notification.link) {
                          handleAction(notification);
                        }
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </HStack>
              )}
            </VStack>
            <HStack>
              {notification.link && (
                <IconButton
                  aria-label="View details"
                  icon={<FiExternalLink />}
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAction(notification)}
                />
              )}
              {!notification.isRead && (
                <IconButton
                  aria-label="Mark as read"
                  icon={<FiCheck />}
                  size="sm"
                  variant="ghost"
                  onClick={() => markAsRead(notification.id)}
                />
              )}
              <IconButton
                aria-label="Dismiss"
                icon={<FiX />}
                size="sm"
                variant="ghost"
                onClick={() => dismissNotification(notification.id)}
              />
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}