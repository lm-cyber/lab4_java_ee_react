import React from 'react';

import { Button } from 'react-toolbox/lib/button';

interface ButtonProps {
   label: string
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const CustomButton = ({label, onClick, ...other}: ButtonProps) => (
    <Button className="input-field backlight clickable" onClick={onClick} {...other}>
        {label}
    </Button>
);

export default CustomButton;