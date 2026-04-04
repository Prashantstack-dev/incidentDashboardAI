import {useState} from "react";
const Button = ({setSelectedCategory, selectedCategory}) => {
  const categories = [
    "Emergency Warning",
    "Watch and Act",
    "Advice",
    "Not Applicable"
  ];
  const handleClick =  (category) => {
    // alert(`${category} I was clicked`);
    if(selectedCategory === category){
        return setSelectedCategory(null);
      } else {
          setSelectedCategory(category);
      }
    }

  return (
    <div>
      {categories?.map((category, i) => (
        <button className='button' key={i} onClick={()=>handleClick(category)}>
          {category} 
        </button>
      ))}
    </div>
  );
};
export default Button;
