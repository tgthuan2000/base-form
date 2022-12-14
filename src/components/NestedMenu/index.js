import { ArrowDropDown, CloseOutlined } from "@mui/icons-material";
import {
    Menu,
    MenuItem,
    TextField,
    IconButton,
    Typography,
    Box,
    Chip,
} from "@mui/material";
import { isNil, isEmpty } from "lodash";
import { NestedMenuItem } from "mui-nested-menu";
import React, { useState, useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import InputField from "../InputField";

const textStyle = {
    minWidth: "150px",
    maxWidth: "400px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
};

const NestedMenu = ({
    form,
    label,
    name,
    disabled = false,
    onChange,
    options = [],
    disabledClear,
    idKey = "id",
    labelKey = "label",
    inputProps = (params) => params,
    getOptionLabel = (option) => option.name,
    multiple,
    ...props
}) => {
    const getDefaultValue = useCallback(() => {
        const id = form.getValues(name);
        const getData = (id) => {
            switch (id) {
                case null:
                case undefined: {
                    return id;
                }
                default: {
                    let data = null;
                    const findData = (options) => {
                        return options.find((option) => {
                            const found = option.id === id;
                            if (!found) {
                                if (!isEmpty(option.children)) {
                                    return findData(option.children);
                                }
                                return false;
                            }
                            data = option;
                            return found;
                        });
                    };
                    findData(options);
                    return data;
                }
            }
        };
        if (multiple) {
            if (Array.isArray(id)) {
                return id.map((id) => getData(id));
            }
        }
        return getData(id);
    }, [options, form.watch(name)]);

    const [option, setOption] = useState(getDefaultValue);

    useEffect(() => {
        setOption(getDefaultValue);
    }, [getDefaultValue]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);
    const handleItemClick = (field, option) => {
        if (multiple) {
            const index = form.watch(name)?.indexOf(option[idKey]) ?? -1;
            if (index !== -1) {
                const clone = [...field.value];
                clone.splice(index, 1);
                field?.onChange?.(clone);
                onChange?.(clone);
            } else {
                let clone = [];
                if (field.value) {
                    clone = [...field.value];
                }

                field?.onChange([...clone, option[idKey]]);
                onChange?.([...clone, option[idKey]], option);
            }
        } else {
            field?.onChange(option[idKey]);
            onChange?.(option);
            handleClose();
        }
    };
    const handleClear = (field) => {
        handleClose();
        if (multiple) {
            field?.onChange([]);
            onChange?.([]);
        } else {
            field?.onChange(null);
            onChange?.(null);
        }
    };

    const _getOptionsLabel = (options, index) => {
        if (getOptionLabel) {
            const labels = getOptionLabel(options);
            if (typeof labels === "object") {
                return labels[index] ?? options[labelKey];
            }
            return labels;
        }
        return options[labelKey];
    };

    const getMenu = useCallback(
        (options, field, hasSearch = false, searchName = "", i = 0) => {
            if (hasSearch) {
                searchName = form.watch(searchName);
                if (searchName) {
                    options = options.filter((option) => {
                        const label = _getOptionsLabel(option, i);
                        return label
                            .toLowerCase()
                            .includes(searchName?.toLowerCase());
                    });
                }
            }
            return options.map((option, index) => {
                const label = _getOptionsLabel(option, i);

                // Default menu item
                let Component = MenuItem;
                let props = {
                    onClick: () => handleItemClick(field, option),
                    disabled: disabled || option.disabled,
                    children: <Typography sx={textStyle}>{label}</Typography>,
                };

                // Nested menu item
                if (!isEmpty(option.children)) {
                    Component = NestedMenuItem;
                    props = {
                        parentMenuOpen: true,
                        disabled: disabled || option.disabled,
                        label,
                        sx: { "& .MuiTypography-root": textStyle },
                        children: (
                            <>
                                {option.search && (
                                    <Box sx={{ px: 1, pb: 1 }}>
                                        <InputField
                                            name={`${name}_search.${option.name}`}
                                            form={form}
                                            spellCheck={false}
                                            autoComplete="off"
                                            fullWidth
                                            label="Search"
                                        />
                                    </Box>
                                )}
                                {getMenu(
                                    option.children,
                                    field,
                                    option.search,
                                    `${name}_search.${option.name}`,
                                    i + 1
                                )}
                            </>
                        ),
                    };
                }

                return <Component key={option.id ?? index} {...props} />;
            });
        },
        [options]
    );

    return (
        <Controller
            name={name}
            control={form.control}
            render={({
                field,
                fieldState: { isDirty, invalid, isTouched, error },
            }) => {
                let InputProps = {
                    // readOnly: true,
                    className: "group",
                    endAdornment: (
                        <>
                            <div className="hidden group-hover:block">
                                {!disabled &&
                                    !disabledClear &&
                                    (multiple
                                        ? !isEmpty(field.value)
                                        : !isNil(field.value)) && (
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClear(field);
                                            }}
                                            size="small"
                                        >
                                            <CloseOutlined fontSize="small" />
                                        </IconButton>
                                    )}
                            </div>
                            <IconButton size="small">
                                <ArrowDropDown
                                    fontSize="small"
                                    className={open ? "rotate-180" : "rotate-0"}
                                />
                            </IconButton>
                        </>
                    ),
                };
                let inputProps = {
                    className: "truncate",
                };
                if (props.InputProps) {
                    InputProps = { ...props.InputProps, ...InputProps };
                }
                if (props.inputProps) {
                    inputProps = { ...props.inputProps, ...inputProps };
                }
                return (
                    <>
                        <div className="relative">
                            <TextField
                                onClick={!disabled && handleClick}
                                fullWidth
                                {...field}
                                error={invalid}
                                label={label}
                                disabled={disabled}
                                helperText={error?.message || ""}
                                value={
                                    option && !multiple ? option[labelKey] : ""
                                }
                                variant="standard"
                                inputProps={inputProps}
                                {...props}
                                InputProps={InputProps}
                            />
                            {multiple && !isEmpty(option) && (
                                <div
                                    className="absolute w-[calc(100%-65px)] space-x-1 space-y-0.5 bottom-1 bg-white"
                                    onClick={handleClick}
                                >
                                    <Typography
                                        variant="caption"
                                        display="block"
                                    >
                                        {label}
                                    </Typography>
                                    {option?.map((op) => (
                                        <Chip
                                            key={op?.[labelKey]}
                                            label={op?.[labelKey]}
                                            size="small"
                                            onDelete={() =>
                                                handleItemClick(field, op)
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <Menu
                            anchorEl={anchorEl}
                            open={!disabled && open}
                            onClose={handleClose}
                        >
                            {isEmpty(options) ? (
                                <MenuItem disabled>
                                    <Typography sx={textStyle}>
                                        No options
                                    </Typography>
                                </MenuItem>
                            ) : (
                                getMenu(options, field)
                            )}
                        </Menu>
                    </>
                );
            }}
        />
    );
};

export default NestedMenu;
