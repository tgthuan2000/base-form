import { Controller } from "react-hook-form";
import { forwardRef } from "react";
import { debounce } from "lodash";
import { getDateWithFormat } from "../../helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
    InputAdornment,
} from "@mui/material";
import "./style.scss";
import MaskedInput from "react-text-mask";
import { CalendarToday } from "@mui/icons-material";
import { MASK_DATE_FORMAT } from "../../constants";

const TextInput = forwardRef(({ ...other }, ref) => {
    return <MaskedInput {...other} />;
});

const CustomInput = forwardRef(({ mask, ...props }, ref) => {
    return (
        <Box
            sx={{
                position: "relative",
                top: "-3px",
                "& .MuiInputLabel-shrink.label-custom": {
                    transform: "translate(14px, 0px) scale(0.75)",
                },
                "& .MuiFormLabel-filled": {
                    left: "-14px",
                },
                "& .MuiInputLabel-formControl": {
                    left: "-14px",
                },
                "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                },
            }}
        >
            <FormControl fullWidth>
                {props.label && (
                    <InputLabel
                        className="label-custom"
                        sx={{
                            color: props.error
                                ? "#d32f2f"
                                : "rgba(0, 0, 0, 0.6)",
                        }}
                        shrink={props.value ? true : false}
                    >
                        {props.label}
                    </InputLabel>
                )}
                <Input
                    inputComponent={TextInput}
                    endAdornment={
                        <InputAdornment position="end">
                            <CalendarToday fontSize="small" />
                        </InputAdornment>
                    }
                    inputProps={{
                        mask,
                    }}
                    {...props}
                />
                {props?.error && (
                    <FormHelperText
                        sx={{
                            color: "#d32f2f",
                        }}
                    >
                        {props.message}
                    </FormHelperText>
                )}
            </FormControl>
        </Box>
    );
});

export default function DateField({
    name,
    form,
    label,
    debounceTime = 0,
    onChange,
    mask = MASK_DATE_FORMAT,
    customInput = {},
    ...props
}) {
    const callDebounce = debounce((e) => {
        onChange(e);
    }, debounceTime);

    return (
        <Controller
            name={name}
            control={form.control}
            render={({
                field,
                fieldState: { isDirty, invalid, isTouched, error },
            }) => {
                return (
                    <Box
                        sx={{
                            "& .react-datepicker-popper": {
                                zIndex: 99,
                            },
                        }}
                    >
                        <DatePicker
                            selected={getDateWithFormat(field.value)}
                            dateFormat="dd MMM yyyy"
                            calendarStartDay={1}
                            customInput={
                                <CustomInput
                                    label={label}
                                    error={invalid}
                                    message={error?.message || ""}
                                    mask={mask}
                                    customInput={customInput}
                                    sx={props?.sx}
                                />
                            }
                            onChange={(e) => {
                                field.onChange(e);
                                onChange && callDebounce(e);
                            }}
                            {...props}
                        />
                    </Box>
                );
            }}
        />
    );
}
