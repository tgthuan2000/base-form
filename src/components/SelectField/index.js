import { TextField, Autocomplete } from "@mui/material";
import { isArray } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";

const SelectField = ({
    form,
    name = "default",
    multiple = false,
    id,
    options = [],
    defaultValue,
    label = "Select something",
    onChange,
    inputProps = (params) => {
        return { ...params };
    },
    ...props
}) => {
    const [option, setOption] = useState(form.getValues(name));
    const [isFirst, setFirst] = useState(false);

    useEffect(() => {
        setOption(form.getValues(name));
    }, [form.getValues(name)]);

    useEffect(() => {
        if (options?.length) setFirst(true);
    }, [options]);

    const handleValue = (values) => {
        if (props.freeSolo) {
            return values;
        }

        if (multiple) {
            if (!Array.isArray(values)) values = [];
            return options.filter((value) => {
                if (!isArray(values)) {
                    values = JSON.parse(values);
                }
                return values.includes(
                    typeof value === "object" ? value.id : value
                );
            });
        } else {
            let value = options.find(
                (option) =>
                    values === (typeof option === "object" ? option.id : option)
            );
            return typeof value !== "undefined" ? value : null;
        }
    };

    const value = useMemo(() => {
        return handleValue(option);
    }, [JSON.stringify(option), isFirst]);

    const handleChange = (newValue, handleChange) => {
        let data;
        if (multiple) {
            data = newValue.map((value) =>
                typeof value === "string" ? value : value.id
            );
        } else {
            data =
                newValue !== null
                    ? typeof newValue === "string"
                        ? newValue
                        : newValue.id
                    : null;
        }
        setOption(data);
        handleChange(data);
        onChange && onChange(newValue);
    };

    return (
        <Controller
            name={name}
            control={form.control}
            render={({
                field,
                fieldState: { isDirty, invalid, isTouched, error },
            }) => {
                return (
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            handleChange(newValue, field.onChange);
                        }}
                        multiple={multiple}
                        id={id}
                        options={options}
                        getOptionLabel={(option) => option?.name || ""}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        defaultValue={defaultValue}
                        size="small"
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={label}
                                    error={invalid}
                                    helperText={
                                        (typeof error?.message === "string"
                                            ? error?.message
                                            : error
                                                  ?.map((er) => er.message)
                                                  .join(", ")) || ""
                                    }
                                    {...inputProps({
                                        ...params,
                                        inputProps: {
                                            ...params.inputProps,
                                            autoComplete: "new-password",
                                        },
                                    })}
                                    autoComplete={"new-password"}
                                />
                            );
                        }}
                        {...props}
                    />
                );
            }}
        />
    );
};

export default SelectField;
