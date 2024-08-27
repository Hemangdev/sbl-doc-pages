import { useEffect, useState } from 'react'
import Select from "react-select";

const Select2 = (data) => {
    var { form, field, options = [], label = "", onBlur = (val) => null, onChangeCustom = () => null } = data
    const [myValue, setMyValue] = useState(null);
    useEffect(() => {
        if (field.value) { options.forEach(row => { row.id === field.value && setMyValue(row) }) }
        else { setMyValue(null) }
    }, [field.value, options])
    return (
        <Select
            closeMenuOnSelect={true}
            options={options}
            defaultMenuIsOpen={false}
            placeholder={`Select ${label}`}
            classNamePrefix="react-select"
            isOptionSelected={(option, selectValue) => selectValue.some(i => i === option)}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            value={myValue}
            onBlur={() => { onBlur(myValue?.[0]) }}
            onChange={(value) => {
                onChangeCustom(value)
                setMyValue(value)
                form.setFieldValue(field.name, value.id)
            }}
        />
    )
};

export default Select2;