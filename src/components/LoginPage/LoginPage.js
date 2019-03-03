import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Grid, Paper, Typography } from '@material-ui/core'

import LoginForm from './LoginForm'

const styles = {
    paper: {
        background: "white",
        marginTop: "15vh"
    },
    headerSignin: {
        textAlign: "center",
        padding: 20,
        margin: 10
    }
}


class LoginPage extends Component {
    state = {
        email: "",
        password: ""
    }

    submit = (email, password) => {
        fetch('http://localhost:3000/login', {
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
                console.log(result)
                console.log(this.props.isLoggedin)
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {
        const { classes } = this.props
        console.log(this.props)
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs sm={8} md={6} lg={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="display1" className={classes.headerSignin}>
                            Sign In
                        </Typography>
                        <LoginForm
                            submit={this.submit}
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LoginPage)

