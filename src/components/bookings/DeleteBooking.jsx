import React, { useState } from 'react';
import { NEWBOOKING_URL } from '../../constant/api';
import { useQueryClient } from '@tanstack/react-query'; 

const DeleteButton = ({ bookingId, onDelete, user }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await fetch(`${NEWBOOKING_URL}/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      setIsDeleting(true);
      onDelete();

      queryClient.invalidateQueries(['data']);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-blue text-white p-2 rounded-md hover:bg-red-600 m-5"
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete Booking'}
    </button>
  );
};

export default DeleteButton;

