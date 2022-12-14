import {
    CheckboxField,
    DateField,
    FileField,
    InputField,
    LazySelect,
    NestedMenu,
    RadioField,
    RichTextField,
    SelectField,
} from "./components";

const DungComponent = ({ type, ...otherProps }) => {
    const {
        // COMMON PROPS
        form,
        name,
        label,
        disabled,
        renderLabel,

        // CHECKBOX FIELD PROPS
        options,
        checkAll,
        onChange,

        // DATE FIELD PROPS
        debounceTime,
        customInput,

        // INPUT FIELD PROPS
        readOnly,
        hasResize,

        // LAZY SELECT PROPS
        multiple,
        onSearch,
        onGetMore,
        totalRows,

        // NESTED MENU PROPS
        disabledClear,
        idKey,
        labelKey,
        inputProps,
        getOptionLabel,

        // RADIO FIELD PROPS
        radioGroupProps,

        // SELECT FIELD PROPS
        defaultValue,

        // OTHER PROPS
        ...props
    } = otherProps;

    const Components = {
        checkbox: () => (
            <CheckboxField
                form={form}
                name={name}
                label={label}
                options={options}
                checkAll={checkAll}
                onChange={onChange}
                {...props}
            />
        ),
        date: () => (
            <DateField
                name={name}
                form={form}
                label={label}
                debounceTime={debounceTime}
                onChange={onChange}
                customInput={customInput}
                {...props}
            />
        ),
        file: () => (
            <FileField
                form={form}
                name={name}
                label={label}
                disabled={disabled}
            />
        ),
        input: () => (
            <InputField
                form={form}
                label={label}
                name={name}
                disabled={disabled}
                readOnly={readOnly}
                type={type}
                onChange={onChange}
                debounceTime={debounceTime}
                hasResize={hasResize}
                {...props}
            />
        ),
        "lazy-select": () => (
            <LazySelect
                form={form}
                name={name}
                multiple={multiple}
                label={label}
                options={options}
                onSearch={onSearch}
                debounceTime={debounceTime}
                onChange={onChange}
                onGetMore={onGetMore}
                totalRows={totalRows}
                {...props}
            />
        ),
        "nested-menu": () => (
            <NestedMenu
                form={form}
                label={label}
                name={name}
                disabled={disabled}
                onChange={onChange}
                options={options}
                disabledClear={disabledClear}
                idKey={idKey}
                labelKey={labelKey}
                inputProps={inputProps}
                getOptionLabel={getOptionLabel}
                multiple={multiple}
                {...props}
            />
        ),
        radio: () => (
            <RadioField
                onChange={onChange}
                form={form}
                name={name}
                label={label}
                options={options}
                renderLabel={renderLabel}
                radioGroupProps={radioGroupProps}
                {...props}
            />
        ),
        "rich-text": () => (
            <RichTextField
                form={form}
                label={label}
                name={name}
                disabled={disabled}
                onChange={onChange}
                {...props}
            />
        ),
        select: () => (
            <SelectField
                form={form}
                name={name}
                multiple={multiple}
                options={options}
                defaultValue={defaultValue}
                label={label}
                onChange={onChange}
                inputProps={inputProps}
                {...props}
            />
        ),
    };

    return Components[type] || null;
};

export default DungComponent;
