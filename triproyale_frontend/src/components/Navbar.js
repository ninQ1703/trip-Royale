import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../features/authSlice';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "",id:"" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  }
  return <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" style={{backgroundColor:"#E28616",zIndex:'3'}}>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}></Typography>

          {/* <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#FFC594' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button> */}

          {/* <Button component={NavLink} to='/contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#FFC594' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button> */}
          {access_token ? null : <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#FFC594' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>}
          {access_token ? <Button onClick={handleLogout} style={{color:'white',textDecoration:'none'}}>Logout</Button> : <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#FFC594' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>}



        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
