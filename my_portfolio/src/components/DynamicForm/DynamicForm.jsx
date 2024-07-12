import React from 'react'
import "./DynamicForm.scss"

const DynamicForm = ({label, name, items, setItems, type}) => {
  //add a new empty input field.
  //copy the current item array and add an empty string to the copied array
  const handleAddField = () =>{
        setItems([...items, '']);
  }

  //removes an input field at a specified index
  const handleRemoveField = (index) =>{
      //remove the item at the specified index.
        const updatedItems = items.filter((_, i) =>
          i !== index
        )
        setItems(updatedItems);
      }

  //updates the value of the list of items at the specified index
  const handleChange = (index, value) =>{
    const updatedItems = items.map((item, i) =>
      (i === index)? value : item
    );
    setItems(updatedItems);
  };
  //updates the value of an input field at a specified index.

    return (
        <>
        {/* We have an array of values. Iterate over the array of values 
        and dynanically add a new field 
        
        After clicking the add {label} button, the handleAddField function
        creates an empty string to the end of the list of items
        since this string is empty, we need to get the value (e.target.value)
        and send that to handleChange.*/}
          {items.map((item,index) => (
            <div key={index} className="dynamic-form__field-section">
              <input
              type={type}
              className="project-form__input-field"
              name={`${name}_${index}`}
              id={`${name}_${index}`}
              value={item}
              placeholder={`Add ${name}`}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            />
              <button type = "button" className = "dynamic-form__button-remove" onClick={() => handleRemoveField(index)}>Remove</button>
            </div>
          ))}
        <button type="button" className = "button-add" onClick={handleAddField}>
        Add {label}
      </button>
      </>
  )
};
export default DynamicForm;