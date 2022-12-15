import { Box, Checkbox, FormControlLabel, FormLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

function CheckboxField({ form, name, label, options, checkAll, onChange, ...props }) {
    const multipleCheckbox = (field, options) => {
        return (
            <>
                <FormLabel component="legend">{label}</FormLabel>
                {Boolean(checkAll) && (
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={field.value && field.value.length === options.length}
                                    onChange={(e, checked) => {
                                        checked
                                            ? field.onChange(options.map((value) => value.id))
                                            : field.onChange([]);
                                    }}
                                    {...props}
                                />
                            }
                            label="Check all"
                            sx={{ '& .MuiTypography-root': { fontWeight: 700 } }}
                        />
                    </Box>
                )}
                {options.map(({ name, id }) => {
                    return (
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox
                                    value={id}
                                    checked={
                                        field.value &&
                                        field.value.length &&
                                        field.value.indexOf(id) >= 0
                                    }
                                    onChange={(e, checked) => {
                                        checked
                                            ? field.onChange([...field.value, id])
                                            : field.onChange(
                                                  field.value.filter((value) => value !== id)
                                              );
                                    }}
                                    {...props}
                                />
                            }
                            label={name}
                        />
                    );
                })}
            </>
        );
    };

    const singleCheckbox = (field) => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={field.value}
                        {...field}
                        {...props}
                        onChange={(e) => {
                            field.onChange(e.target.checked);
                            onChange && onChange(e.target.checked);
                        }}
                    />
                }
                label={label}
            />
        );
    };

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { isDirty, invalid, isTouched, error } }) => {
                return options && options.length
                    ? multipleCheckbox(field, options)
                    : singleCheckbox(field);
            }}
        />
    );
}

export default CheckboxField;
