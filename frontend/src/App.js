import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
// import  from 'react-dom'
import Register from './components/Register';
import Profile from './pages/Profile';
import { StyledEngineProvider } from '@mui/material/styles';


const theme = createTheme({
  //you can pick and choose the properties that you want to override
  palette: {
    primary: {
      main: 'rgb(27, 44, 93)',
    },
    secondary: {
      main: 'rgb(252, 175, 40)'
    },
    error: {
      main: 'rgb(218, 33, 40)'
    } //colour object from material ui
    //this provides variations of light, dark and main
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
  },
  typography: {
    fontFamily: 'RopaSoftPTTW01-Medium',
    // fontWeightLight: 400,
    // fontWeightRegular: 500,
    // fontWeightMedium: 600,
    // fontWeightBold: 700
  }
})

function App() {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            {/* <Route path="/profile" component={Profile} /> */}
          </Switch>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>

  );
}

export default App;
