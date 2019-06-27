import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export const SnackbarContext = createContext({
    showMessage: {},
    open: false
});

class SnackbarProvider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            showMessage: (variant, message, duration) => {
                if (["success", "warning", "error", "info"].indexOf(variant) !== -1 && message) {
                    this.setState({
                        variant,
                        message,
                        duration: duration || this.state.duration,
                        open: true
                    });
                }
            },
            duration: 3000,
            message: "",
            variant: "success"
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <SnackbarContext.Provider value={this.state}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={this.state.duration}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant={this.state.variant}
                            message={this.state.message}
                        />
                    </Snackbar>
                    {this.props.children}
                </SnackbarContext.Provider>
            </div>
        );
    }
}

SnackbarProvider.contextType = SnackbarContext;

export function withSnackbar(Component) {
    return function WrapperComponent(props) {
        return (
            <SnackbarContext.Consumer>
                {snackbar => <Component {...props} snackbar={snackbar} />}
            </SnackbarContext.Consumer>
        );
    };
}

export default SnackbarProvider;