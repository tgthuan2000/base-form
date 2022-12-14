import React from 'react';
import { Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { red } from '@mui/material/colors';
import MTinyMCE from 'components/MTinyMCE';

function RichTextField({ form, label, name, disabled, onChange }) {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { isDirty, invalid, isTouched, error } }) => (
                <>
                    {label && (
                        <Typography color={invalid ? red['A700'] : 'inherit'}>{label}</Typography>
                    )}
                    <MTinyMCE
                        value={field.value}
                        onEditorChange={(value) => {
                            field.onChange(value);
                            onChange && onChange(value);
                        }}
                        disabled={disabled}
                    />
                    {error?.message ? (
                        <Typography
                            fontSize={'0.75rem'}
                            color={red['A700']}>
                            {error?.message}
                        </Typography>
                    ) : (
                        ''
                    )}
                </>
            )}
        />
    );
}

export default RichTextField;
