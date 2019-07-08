import React from 'react';
import Button from '@material-ui/core/Button';

const CreateButton = (color, background) => {
    if (background)
        return props => <Button {...props} style={{...props.style, backgroundColor: color }}></Button>
    else
        return props => <Button {...props} style={{...props.style, color: color }}></Button>
}

export const Danger = CreateButton("#f44336", true)
export const Success = CreateButton("#4caf50", true)
export const Warning = CreateButton("#ff9800", true)

export const DangerSimple = CreateButton("#f44336", false)
export const SuccessSimple = CreateButton("#4caf50", false)
export const WarningSimple = CreateButton("#ff9800", false)