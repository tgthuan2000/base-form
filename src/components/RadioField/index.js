import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import { Controller } from 'react-hook-form';

function RadioField({
    onChange,
    form,
    name,
    label,
    options,
    renderLabel,
    radioGroupProps = {},
    ...props
}) {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { isDirty, invalid, isTouched, error } }) => (
                <FormControl>
                    {label && <FormLabel>{label}</FormLabel>}
                    <RadioGroup
                        {...field}
                        {...radioGroupProps}>
                        {options.map((value) => {
                            return (
                                <FormControlLabel
                                    key={value.id}
                                    value={value.id}
                                    disabled={props.disabled}
                                    control={
                                        <Radio
                                            color={invalid ? 'error' : 'default'}
                                            {...props}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onChange && onChange(e);
                                            }}
                                        />
                                    }
                                    label={
                                        renderLabel ? (
                                            renderLabel(value)
                                        ) : (
                                            <Typography
                                                variant={'span'}
                                                color={invalid ? 'error' : 'default'}>
                                                {value.name}
                                            </Typography>
                                        )
                                    }
                                />
                            );
                        })}
                    </RadioGroup>
                    <FormHelperText error={invalid}>{error?.message || ''}</FormHelperText>
                </FormControl>
            )}
        />
    );
}

export default RadioField;
