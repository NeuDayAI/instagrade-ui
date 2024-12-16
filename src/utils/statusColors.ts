export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'evaluating':
      return 'blue';
    case 'completed':
      return 'green';
    case 'ongoing':
      return 'green';
    default:
      return 'gray';
  }
};