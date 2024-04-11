import { useEffect, useState } from "react"

export const useLunchCategory = (property) => {
  const [ value, setValue ] = useState(false);
  const [ categroyName, setCategroyName ] = useState("");

  useEffect(() => {
    console.log(value);
    if(value) {
      setCategroyName(() => property)
    } else {
      setCategroyName(() => "");
    }
  }, [value])

  const handleOnChange = (e) => {
    setValue(() => e.target.checked);
  }

  return [ value, handleOnChange, categroyName ]

}