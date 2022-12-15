import React from 'react';
import { TextField } from '@mui/material';
import { debounce } from 'lodash';
import { Controller } from 'react-hook-form';

function InputField({
    form,
    label,
    name,
    disabled = false,
    readOnly = false,
    type = 'text',
    onChange,
    debounceTime = 0,
    hasResize,
    ...props
}) {
    const callDebounce = debounce((e) => {
        onChange(e);
    }, debounceTime);
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { isDirty, invalid, isTouched, error } }) => {
                let InputProps = {
                    readOnly: readOnly
                };

                if (props.InputProps) {
                    InputProps = {
                        ...props.InputProps,
                        ...InputProps
                    };
                }

                return (
                    <TextField
                        fullWidth={true}
                        {...field}
                        error={invalid}
                        label={label}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange && callDebounce(e);
                        }}
                        disabled={disabled}
                        helperText={error?.message || ''}
                        type={type}
                        value={field.value ?? ''}
                        variant="standard"
                        {...props}
                        sx={{
                            ...(props.multiline
                                ? {
                                      '.MuiInput-input.MuiInputBase-input.MuiInputBase-inputMultiline': {
                                          resize: 'auto'
                                      }
                                  }
                                : undefined),
                            ...props.sx
                        }}
                        InputProps={InputProps}
                    />
                );
            }}
        />
    );
}

export default InputField;
