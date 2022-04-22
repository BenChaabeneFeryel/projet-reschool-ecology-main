import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link,FormControl,FormHelperText,InputLabel,OutlinedInput,InputAdornment ,IconButton} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert"
const LoginResponsable=()=>{
  function onChange(value) {
    console.log("Captcha value:", value);
  }
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = React.useState({
      email: '',
      mot_de_passe: '',
      showPassword: false,   
      error_list:[],
    });
    const handleInput =  (e) => {
      e.persist();
      setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    };
    const loginSubmit = (e) => {
      e.preventDefault();
      const data = {
        email: loginInput.email,
        mot_de_passe:loginInput.mot_de_passe,
      }
      axios.get('sanctum/csrf-cookie').then(response => {
                console.log(response)

        axios.post(`api/auth-responsable-etablissement/login`,data).then(res =>{
          if(res.data.status === 200){
            localStorage.setItem('auth_token_responsable',res.data.token);
            localStorage.setItem('auth_email',res.data.email);

            Swal('Success',res.data.message,"success")
            navigate("/responsable-etablissement")          
          }
            else if(res.data.status === 401){
            Swal ( "Oops" ,  res.data.validation_credentials,  "error" )

          }  else{
            setLoginInput({...loginInput,error_list:res.data.validation_errors});

          }
        })
        
      })
    };



    const handleClickShowPassword = () => {
      setLoginInput({
        ...loginInput,
        showPassword: !loginInput.showPassword,
      });
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const paperStyle={padding :40,height:500,width:350, margin:"5% auto"}
    const avatarStyle={backgroundColor:'#1bbd7e',width:60,height:60}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Responsable etablissement Login</h2>
                </Grid>
            <form onSubmit={loginSubmit}>
                   <FormControl fullWidth variant="outlined" color="success">
                      <InputLabel htmlFor="mot_de_passe" >email</InputLabel>
                      <OutlinedInput 
                        id="outlined-adornment-email"
                        type='text'
                        name="email"
                        value={loginInput.email}
                        onChange={handleInput}
                        placeholder='Entrer votre email'
                        startAdornment={
                          <InputAdornment position="start">
                            <PersonIcon/>
                          </InputAdornment>
                        }  
                        error={!!loginInput.error_list.email}
  
                        label="email" />
                        <FormHelperText error={true}>
                        {loginInput.error_list.email}           
                       </FormHelperText> 
                  </FormControl>
                  
                  <FormControl fullWidth sx={{ marginTop: 2 }} variant="outlined" color="success" >
                      <InputLabel htmlFor="outlined-adornment-password" >mot de passe</InputLabel>
                      <OutlinedInput 
                        id="outlined-adornment-password"
                        type={loginInput.showPassword ? 'text' : 'password'}
                        value={loginInput.mot_de_passe}
                        name="mot_de_passe"
                        onChange={handleInput}
                        placeholder='Entrer votre mot de passe'
                        startAdornment={
                          <InputAdornment position="start">
                            <LockIcon/>
                          </InputAdornment>
                        }
                        endAdornment={<InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          edge="end" >
                                            {loginInput.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                        }
                        error={!!loginInput.error_list.mot_de_passe}

                        label="mot de passe" /> 
                        <FormHelperText error={true}>
                        {loginInput.error_list.mot_de_passe}           
                       </FormHelperText> 
                  </FormControl>


                  <FormControlLabel control={ <Checkbox name="rememberme" color="success"/>} label="Remember me" />
                  <ReCAPTCHA
                      sitekey='6LcApHsfAAAAAHz09e3JvjZHKzd-8xV4d3BhmeQH'
                      
                      onChange={onChange}
                    />
                                  
                  <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                  <Typography sx={{textAlign:"center"}}>
                      <Link href="#" >
                          Forgot password ?
                  </Link>
                  </Typography>
            </form>
              

            </Paper>
        </Grid>
    )
}

export default LoginResponsable;
