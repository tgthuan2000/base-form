import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export interface CheckboxFieldProps {
    form: UseFormReturn<any, object>;
    name: string;
    label?: string;
    options: Array<any>;
    checkAll?: boolean;
    onChange?: Function;
    sx?: SxProps;
}

export interface DateFieldProps {
    form: UseFormReturn<any, object>;
    name: string;
    label?: string;
    debounceTime?: number;
    onChange?: Function;
    mask?: "MASK_DATE_FORMAT";
    customInput?: React.ReactNode;
    sx?: SxProps;
}

export interface FileFieldProps {
    form: UseFormReturn<any, object>;
    name: string;
    label?: string;
    disabled?: boolean;
}

export interface InputFieldProps {
    form: UseFormReturn<any, object>;
    label?: string;
    name: string;
    disabled?: boolean;
    readonly?: boolean;
    type?: string;
    onChange?: Function;
    debounceTime?: number;
    hasResize?: boolean;
    sx?: SxProps;
}

export interface LazySelectFieldProps {
    form: UseFormReturn<any, object>;
    name: string;
    multiple?: boolean;
    label?: string;
    options: Array<any>;
    onSearch?: Function;
    debounceTime?: number;
    onChange?: Function;
    onGetMore?: Function;
    totalRows?: number;
    sx?: SxProps;
}

export interface NestedMenuProps {
    form: UseFormReturn<any, object>;
    label?: string;
    name: string;
    disabled?: boolean;
    onChange?: Function;
    options: Array<any>;
    disabledClear?: boolean;
    idKey?: string;
    labelKey?: string;
    inputProps?: Function;
    getOptionLabel?: Function;
    multiple?: boolean;
    sx?: SxProps;
}

export interface RadioFieldProps {
    onChange?: Function;
    form: UseFormReturn<any, object>;
    name: string;
    label?: string;
    options: Array<any>;
    renderLabel?: Function;
    radioGroupProps?: Function;
    sx?: SxProps;
}

export interface SelectFieldProps {
    form: UseFormReturn<any, object>;
    name: string;
    multiple?: boolean;
    options: Array<any>;
    defaultValue?: any;
    label?: string;
    onChange?: Function;
    inputProps?: Function;
    sx?: SxProps;
}
