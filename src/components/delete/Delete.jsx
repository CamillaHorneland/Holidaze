import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const DeleteButton = ({ itemId, onDelete, apiEndpoint, user, label = 'Delete', invalidationKey }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`${apiEndpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      onDelete();

      if (invalidationKey) {
        queryClient.invalidateQueries([invalidationKey]);
      }
    } catch (error) {
      console.error(`Error deleting item with id ${itemId}:`, error);
    } finally {
      setIsDeleting(false);
      setConfirming(false);
    }
  };

  const handleConfirm = () => {
    setConfirming(true);
  };

  const handleCancel = () => {
    setConfirming(false);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {confirming ? (
        <>
          <button
            onClick={handleDelete}
            className={`bg-red-500 text-white p-2 rounded-md hover:bg-white border border-red-500 hover:text-red-500 w-full ${isDeleting && 'opacity-50'}`}
            disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-white border border-gray-500 hover:text-gray-500 w-full"
            disabled={isDeleting}>
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-white border border-red-500 hover:text-red-500 w-full">
          {label}
        </button>
      )}
    </div>
  );
};

export default DeleteButton;









