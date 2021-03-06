import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { userLoggedIn } from '../../actions/user';
import { Grid, Paper, Typography } from '@material-ui/core';

import LoginForm from './LoginForm'

const styles = theme => ({
    paper: {
        background: "white",
        marginTop: "25vh"
    },
    headerSignin: {
        textAlign: "center",
        padding: 20,
        margin: 10
    },
    overlay: {
      background: theme.palette.primary.main,
      height: "50px",
      padding: "40px",
      marginTop: "-75px",
      borderRadius: "6px"
    }
})

const styles1 = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

function MySnackbarContent(props) {
  
  const { classes, className, message, handleClose, variant, ...other } = props;
  return (
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon className={classes.iconVariant} style={{fontSize: 20}} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
        >
          <CloseIcon className={classes.icon} onClick = {handleClose}/>
        </IconButton>,
      ]}
      {...other}
    />
  );
}


class LoginPage extends Component {

    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handle = () => {
      this.handleClose();
    };

    submit = (email, password) => {
        fetch('https://summer-olympics.herokuapp.com/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(result => { 
                this.props.userLoggedIn(result.user)
                localStorage.setItem('cool-jwt', result.userToken)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                this.handleClick()
            })
    }
    render() {
        const { classes } = this.props
        return (
        <Fragment>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs sm={8} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="display1" color="inherit" className={classes.headerSignin}>
                            Sign In
                        </Typography>
                        <LoginForm
                            submit={this.submit}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                // onClose={this.handleClose}
              >
               <MySnackbarContentWrapper
                variant="error"
                className={classes.margin}
                message="Invalid Credentials!"
                handleClose = {this.handle}
              />
            </Snackbar>
        </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    userLoggedIn: (user) => dispatch(userLoggedIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));