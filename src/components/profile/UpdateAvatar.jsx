import React, { useState } from 'react';
import { useUser } from '../type/UserContext';
import { useUserActions } from '../type/UserStore';
import { PROFILE_URL } from '../../constant/api';

const UpdateAvatarForm = () => {
  const { user, setUser } = useUser();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    };

    const response = await fetch(`${PROFILE_URL}/${user.name}/media`, options);
    const updatedUser = await response.json();

    if (!response.ok) {
      throw new Error(updatedUser.message || 'Failed to update avatar');
    }


    setUser(updatedUser);
    setAvatarUrl('');
    setError(null);
  } catch (error) {
    setError(error.message || 'An error occurred while updating avatar');
  }
};

  return (
    <div>
      <h2>Update Avatar</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Avatar URL:
          <input type="text" value={avatarUrl} onChange={handleAvatarChange} />
        </label>
        <button type="submit">Update Avatar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateAvatarForm;



// import React, { useState } from 'react';
// import { useUser } from '../type/UserContext';
// import { useUserActions } from '../type/UserStore';
// import { PROFILE_URL } from '../../constant/api';

// const UpdateAvatarForm = () => {
//   const { user, setUser } = useUser();
//   const [avatarUrl, setAvatarUrl] = useState('');
//   const [error, setError] = useState(null);

//   const handleAvatarChange = (e) => {
//     setAvatarUrl(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const options = {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//         body: JSON.stringify({ avatar: avatarUrl }),
//       };

//       const response = await fetch(`${PROFILE_URL}/${user.name}/media`, options);
//       const updatedUser = await response.json();

//       if (!response.ok) {
//         throw new Error(updatedUser.message || 'Failed to update avatar');
//       }

//       setUser(updatedUser);
//       setAvatarUrl('');
//       setError(null);
//     } catch (error) {
//       setError(error.message || 'An error occurred while updating avatar');
//     }
//   };

//   return (
//     <div>
//       <h2>Update Avatar</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Avatar URL:
//           <input type="text" value={avatarUrl} onChange={handleAvatarChange} />
//         </label>
//         <button type="submit">Update Avatar</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default UpdateAvatarForm;





