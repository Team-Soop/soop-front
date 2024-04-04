import { useEffect, useState } from "react"
import { REGEX } from "../constants/regex";

export const useInput = (property) => {
    const [ value, setValue ] = useState("");
    const [ message, setMessage ] = useState(null);

    useEffect(() => {
        if(!value) {
            setMessage(() => null);
            return;
        }

        const regexEntries = Object.entries(REGEX);
        for(let [ k, v ] of regexEntries) {
            if(property === k) {
                if(v.regexr.test(value)) {
                    setMessage(() => {
                        return {
                            type: "success",
                            text: ""
                        }
                    })
                }else {
                    setMessage(() => {
                        return {
                            type: "error",
                            text: v.text
                        }
                    })
                }
            }
        }
    }, [value])

    const handleOnChange = (e) => {
        setValue(() => e.target.value);
    }

    return [ value, handleOnChange, message, setValue, setMessage ];
}