import { Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';


const styles = theme => ({
    root: {
        color: '#576271'
    },
    paper: {
        height: '80vh',
        overflow: 'hidden',
    },
    paper__image: {
        height: '100%',
        width: 'auto'
    },
    imageContainer: {
        height: '100%',
        overflow: 'hidden',
    },
    containerGrid: {
        height: '100%'
    },
    textGrid: {
        margin: '200px 60px 0 60px'
    },
    submitButton: {
        marginTop: '50px'
    },
    forgottenPassword: {
        marginTop: '20px'
    },
    loginText: {
        top: '50%'
    },
    item: {
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
    }
})

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
        showPassword: false
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }))
    }

    render() {
        const { classes } = this.props
        const { username, password } = this.state

        const loginMutation = gql`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                _id
                name
                username
            }
        }
        `

        const getUserQuery = gql`
        {
            currentUser {
                _id
            }
        }
        `

        return (
            <Grid container className={classes.item} alignItems='center'>
                <Grid item xs={8}>
                    <Paper className={classes.paper} elevation={24}>
                        <Grid container className={classes.containerGrid}>
                            <Grid item xs={8}>
                                <div className={classes.imageContainer}>
                                    <img className={classes.paper__image} src={'./img/action-artisan-burnt-1145434.jpg'} />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.textGrid}>
                                    <Typography variant="h6" gutterBottom align='center' color='primary'>Kumasi Hive Makerspace</Typography>
                                    <Typography variant="subtitle1" align='center' gutterBottom>Inventory Management System</Typography>
                                    <form className={classes.form}>
                                        <TextField
                                            value={this.state.username}
                                            onChange={this.handleChange('username')}
                                            fullWidth
                                            id="username"
                                            label="Username" />
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <Button variant='text' color='primary' className={classes.forgottenPassword}>Forgot password?</Button>
                                        <Mutation
                                            mutation={loginMutation}
                                            update={(cache, { data: { login } }) => {
                                                cache.writeQuery({
                                                    query: getUserQuery,
                                                    data: { currentUser: login }
                                                })
                                            }}
                                            onCompleted={() => this.props.history.push('/dashboard')}>
                                            {(login) =>
                                                <Button variant='contained' color='primary' fullWidth className={classes.submitButton} onClick={() => { login({ variables: { username, password } }) }}>Submit</Button>}
                                        </Mutation>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h1' className={classes.loginText} align='center'>Login</Typography>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LoginPage);