import React, { HTMLInputTypeAttribute } from 'react';

interface IFormFieldProps {
    placeholder: string;
    name: string;
    required: boolean;
    className: string;
    type?: HTMLInputTypeAttribute | undefined;
    autoComplete?: 'on' | 'off';
}

const FormField = ({ className, name, placeholder, required, type, autoComplete = 'on' }: IFormFieldProps) => {
    return (
        <input
            className={className}
            name={name}
            placeholder={placeholder}
            required={required}
            type={type}
            style={{ outline: 'none', border: 'none' }}
            autoComplete={autoComplete}
        />
    );
};

export default FormField;
