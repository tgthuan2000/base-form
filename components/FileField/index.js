import { AttachFile } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

function FileField({ form, name, label, disabled }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileRef = useRef();

    useEffect(() => {
        form.setValue(name, selectedFile);
    }, [selectedFile]);

    useEffect(() => {
        if (form.getValues(name) === null) {
            setSelectedFile(null);
            fileRef.current.value = "";
        }
    }, [JSON.stringify(form.getValues(name)), form.getValues("type")]);

    const renderValue = (files) => {
        let name = "";

        if (files)
            Array.from(files).forEach((value, index) => {
                if (index > 0) name = name + ", ";
                name = name + value.name;
            });

        return name;
    };

    return (
        <Controller
            name={name}
            control={form.control}
            render={({
                field,
                fieldState: { isDirty, invalid, isTouched, error },
            }) => (
                <TextField
                    {...field}
                    error={invalid}
                    label={label}
                    fullWidth
                    disabled={disabled}
                    helperText={error?.message || ""}
                    variant="standard"
                    value={renderValue(field.value) || ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                sx={{
                                    "& input": {
                                        opacity: 0,
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                    },
                                }}
                                position="start"
                            >
                                <AttachFile color="primary" />
                                <input
                                    multiple
                                    ref={fileRef}
                                    onChange={(e) => {
                                        setSelectedFile(e.target.files);
                                    }}
                                    type="file"
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default FileField;
