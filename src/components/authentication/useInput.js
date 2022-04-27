
//Here we are taking care of the input change in the form
import { useState } from "react";
const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return {
        value,
        onChange: handleChange
    };
};

export default useInput;