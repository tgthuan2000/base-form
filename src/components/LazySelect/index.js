import { useCallback, useState } from 'react';
import Select, { components } from 'react-select';
import { debounce, isArray } from 'lodash';
import { Controller } from 'react-hook-form';
import { Waypoint } from 'react-waypoint';
import { Box, FormHelperText } from '@mui/material';
import './style.scss';
import { grey } from '@mui/material/colors';

const filterOptions = (options) => {
    return true;
};
/**
 * Custom option of select
 * @param onGetMore event get more option when enter Waypoint
 * @param totalRows total number of rows for query database
 * @param isGetMore props show Waypoint or not
 * @param props Các props còn lại của Options
 * @returns
 */
const CustomOptionComponent = ({ onGetMore, totalRows, isGetMore, ...props }) => {
    return (
        <>
            {props.value === props.options[0]?.id && isGetMore ? (
                <>
                    <Box
                        className="count-row"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: 35,
                            textAlign: 'center',
                            lineHeight: '35px',
                            background: 'white',
                            color: grey['500'],
                            borderTopLeftRadius: '4px',
                            borderTopRightRadiusRadius: '4px',
                            zIndex: 9,
                            fontSize: '0.8rem',
                            borderBottom: '1px solid #ccc'
                        }}>
                        Load {props.options.length} of {totalRows}
                    </Box>
                    <Box
                        sx={{
                            height: 35
                        }}></Box>
                </>
            ) : null}
            <components.Option {...props} />
            {props.value === props.options[props.options.length - 1]?.id &&
            props.options.length < totalRows &&
            isGetMore ? (
                <Waypoint onEnter={onGetMore} />
            ) : null}
        </>
    );
};

const customStyles = {
    placeholder: (provided) => ({ ...provided, paddingBottom: 8 }),
    singleValue: (provided) => ({ ...provided, paddingBottom: 8 }),
    menu: (provided) => ({ ...provided, top: 'calc(100% - 8px)' })
};

/**
 *
 * @param form form
 * @param name name of select
 * @param multiple select multiple or not
 * @param label label of select
 * @param options list options
 * @param onSearch event for searching
 * @param debounceTime debounce time for searching
 * @param onChange event for select value of select
 * @param onGetMore event for Waypoint to get more option if have this event isGetMore is true
 * @param totalRows total number of rows for query database
 * @param props props
 * @returns
 */
function Index({
    form,
    name = 'default',
    multiple = false,
    label = 'Select something',
    options = [],
    onSearch,
    debounceTime = 0,
    onChange,
    onGetMore,
    totalRows,
    ...props
}) {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = async (inputValue, { action }) => {
        if (action === 'input-change') {
            callDebounce(inputValue, setLoading);
        }

        if (action !== 'set-value') {
            setInputValue(inputValue);
        }
    };

    const callDebounce = useCallback(
        debounce((inputValue, setLoading) => {
            onSearch && onSearch(inputValue, setLoading);
        }, debounceTime),
        [onSearch]
    );

    const getValue = (values) => {
        if (multiple) {
            if (!values) values = [];
            return options.filter((value) => {
                if (!isArray(values)) {
                    values = JSON.parse(values);
                }
                return values.includes(typeof value === 'object' ? value.id : value);
            });
        } else {
            let value = options.find(
                (option) => values === (typeof option === 'object' ? option.id : option)
            );
            return typeof value !== 'undefined' ? value : null;
        }
    };

    const handleChange = (newValue, handleChange) => {
        let data;
        if (multiple) {
            data = newValue.map((value) => (typeof value === 'string' ? value : value.id));
        } else {
            data =
                newValue !== null ? (typeof newValue === 'string' ? newValue : newValue.id) : null;
        }

        handleChange(data);
        onChange && onChange(newValue);
    };

    const handleGetMore = () => {
        onGetMore && onGetMore(inputValue, setLoading);
    };

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { isDirty, invalid, isTouched, error } }) => {
                let check = multiple
                        ? Boolean(field.value?.length)
                        : typeof field?.value === 'number',
                    classListBox = '& #react-select-' + props.instanceId + '-listbox',
                    classListBoxChild = '& #react-select-' + props.instanceId + '-listbox>div',
                    classListControl = '& #react-select > div[class*=-control]', // 1px solid
                    style = {
                        [classListBox]: {
                            position: 'absolute'
                        },
                        [classListBoxChild]: {
                            position: 'unset'
                        },
                        [classListControl]: {
                            borderBottomColor: 'rgba(0, 0, 0, 0.42)!important'
                        }
                    };
                return (
                    <Box sx={style}>
                        <Box
                            sx={{
                                lineHeight: '1.4',
                                fontSize: '0.8rem',
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                                visibility: check ? 'visible' : 'hidden'
                            }}>
                            {label}
                        </Box>

                        <Select
                            className="react-select"
                            styles={customStyles}
                            isMulti={multiple}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            options={options}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            isLoading={loading}
                            placeholder={label}
                            filterOption={filterOptions}
                            value={(() => getValue(field.value))()}
                            onChange={(event, newValue) => {
                                handleChange(event, field.onChange);
                            }}
                            components={{
                                Option: (params) => (
                                    <CustomOptionComponent
                                        {...params}
                                        onGetMore={() => handleGetMore()}
                                        isGetMore={onGetMore}
                                        totalRows={totalRows || 0}
                                    />
                                )
                            }}
                            {...props}
                        />
                        {invalid ? (
                            <FormHelperText
                                sx={{
                                    color: 'red'
                                }}>
                                {(typeof error?.message === 'string'
                                    ? error?.message
                                    : error?.map((er) => er.message).join(', ')) || ''}
                            </FormHelperText>
                        ) : null}
                    </Box>
                );
            }}
        />
    );
}

export default Index;
