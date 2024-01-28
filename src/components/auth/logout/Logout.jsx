// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUserActions } from '../../type/UserStore';

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   const { clearUser } = useUserActions();
//   const [confirmLogout, setConfirmLogout] = useState(false);

//   const handleLogout = () => {
//     if (confirmLogout) {
//       clearUser();
//       navigate('/login');
//     } else {
//       setConfirmLogout(true);
//     }
//   };

//   return (
//     <button onClick={handleLogout}>
//       {confirmLogout ? 'Confirm Logout' : 'Logout'}
//     </button>
//   );
// };

// export default LogoutButton;


