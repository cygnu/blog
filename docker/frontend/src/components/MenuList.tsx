// import React, { useState } from 'react'
// import {
//   Button,
//   Avatar,
//   Menu,
//   MenuItem
// } from '@material-ui/core'
// import { useViewer } from '../contexts/ViewerContext'
//
//
// export const MenuList: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
//   const { dataViewer } = useViewer()
//
//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(e.currentTarget)
//   }
//
//   const handleClose = () => {
//     setAnchorEl(null)
//   }
//
//   return (
//     <ul>
//       {dataViewer &&
//         dataViewer.viewer &&
//         dataViewer.viewer.map((login: any) => (
//           <li key={login.id}>
//             <Button
//               aria-controls="simple-menu"
//               onClick={handleClick}
//             >
//               <Avatar src={login.userProf.avatar} alt="avatar" />
//             </Button>
//           </li>
//         ))
//       }
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClick}
//       >
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </ul>
//   )
// }
