import React from 'react';
import Button from '@material-ui/core/Button';

export const Danger = props => <Button {...props} style={{backgroundColor:"#f44336"}}></Button>
export const Success = props => <Button {...props} style={{backgroundColor:"#4caf50"}}></Button>
export const Warning = props => <Button {...props} style={{backgroundColor:"#ff9800"}}></Button>
