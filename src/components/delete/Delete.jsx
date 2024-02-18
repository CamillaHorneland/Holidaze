import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const DeleteButton = ({ itemId, onDelete, apiEndpoint, user, label = 'Delete', invalidationKey }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await fetch(`${apiEndpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      setIsDeleting(true);
      onDelete();

      if (invalidationKey) {
        queryClient.invalidateQueries([invalidationKey]);
      }
    } catch (error) {
      console.error(`Error deleting item with id ${itemId}:`, error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`bg-red-500 text-white p-2 rounded-md hover:bg-white hover:text-red-500 m-5 ${isDeleting && 'opacity-50'}`}
      disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : label}
    </button>
  );
};

export default DeleteButton;








