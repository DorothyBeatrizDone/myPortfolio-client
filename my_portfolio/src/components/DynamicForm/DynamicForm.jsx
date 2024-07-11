import React from 'react'

const DynamicForm = ({label, name, items, setItems, type}) => {
  //add all the inputs into setItems
  const handleAddField = () =>{
    for (item in items){
        setItems(item);
    }
  }
    return (
        <>
        items.map((item) => (
            <input
            type={type}
            name={`${name}_${i}`}
            id={`${name}_${i}`}
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            required
          />
        ))
        <button type="button" onClick={handleAddField}>
        Add {label}
      </button>
      </>
  )
}

export default DynamicForm;