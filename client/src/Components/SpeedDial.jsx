import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
    },
    controls: {
        margin: theme.spacing(3),
    },
    exampleWrapper: {
        position: 'relative',
        height: 380,
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    }
});

class SpeedDials extends React.Component {
    state = {
        direction: 'up',
        open: false
    };

    actions = [
        { icon: <Add />, name: 'Ajouter une variable', action: this.props.newVar },
        { icon: <Add />, name: 'Ajouter un graphique', action: this.props.newGraph },
    ];

    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;
        const { hidden, open } = this.state;

        return (
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onBlur={this.handleClose}
                onClick={this.handleClick}
                onClose={this.handleClose}
                onFocus={this.handleOpen}
                onMouseEnter={this.handleOpen}
                onMouseLeave={this.handleClose}
                open={open}
                direction="up"
            >
                {this.actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipPlacement="left"
                        tooltipOpen
                        onClick={action.action}
                    />
                ))}
            </SpeedDial>
        )
    }
}

export default withStyles(styles)(SpeedDials);