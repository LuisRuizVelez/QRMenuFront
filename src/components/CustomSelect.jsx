import {useState, useRef, useEffect} from "react";
import Select from "react-select";

import provider from "../utils/Provider"; // Adjust the import path as necessary

const CustomSelect = ({
    title = null,
    initialValue = null,
    servicePath,
    errorMessage = null,
    onChange = () => {},
    isDisabled = false,
    isClearable = true,
    classValue = '',
    customFilter = {},
}) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [value, setValue] = useState(null)

    const isMounted = useRef(true)

    //Actualizar la referencia
    useEffect(() =>{
        return ()=>{
            isMounted.current = false
        }
    },[])



    //Cargar los ITEMS
    useEffect(() => {
        setLoading(true)

        provider.getOptions(servicePath, customFilter)
            .then( result => {
                if(isMounted.current)
                    if(result)
                        setItems(result)
            })
            .finally( () => setLoading(false))

    }, [])


    //Cargar el item default
    useEffect(() => {
        if(!isMounted.current || !initialValue || items.length === 0)
            return

       setLoading(true)

        const item = items.find( i => i.id === initialValue)
        setValue(item)

        setLoading(false)
    }, [ items, initialValue ])


    const onSelectChange = (selectedOption) => {
        setValue(selectedOption);
        onChange(selectedOption);
    };


    return <>
        { title && <label>{title}</label> }
        <Select
            className={classValue}
            value={value}
            options={items}
            isLoading={loading}
            isDisabled={ isDisabled }
            isClearable={ isClearable }
            onChange={onSelectChange}
        />
        { errorMessage && <div className="invalid-feedback" style={{'display':'block'}}>  {errorMessage} </div> }
    </>
}
export default CustomSelect