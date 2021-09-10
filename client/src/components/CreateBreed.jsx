import { React, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom'
import { postBreed } from '../actions';




export default function CreateBreed(){
 const dispatch = useDispatch();
 const history = useHistory();
 const temperaments = useSelector((state) => state.temperaments);
 const [errors, setErrors] = useState({});
 const [data, setData] = useState({
   name: '',
   weight: '',
   height: '',
   life_span: '',
   image: '',
   temperaments: [],
 });  

 function handleInput(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  function handleSelect(e) {
   if(!data.temperaments.includes(e.target.value)){
    setData({
      ...data,
      temperaments: [...data.temperaments, e.target.value],
    });
   }  
  };

  function handleSubmit(e){
     e.preventDefault();
     dispatch(postBreed(data));
     setData({
        name: '',
        weight: '',
        height: '',
        life_span: '',
        image: '',
        temperaments: [],
     });
    history.push('/home');  
  };

//   function onClick(e){
//     e.preventDefault();
//     setData({
//         ...data,
//         temperaments: temperaments.filter((t) => t !== e.target.name)
//     })
//   }

 return (
        <div>
            <h1>Create your breed:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:  </label>
                    <input type="text" name='name' value={data.name} onChange={handleInput}/>
                </div>
                <div>
                    <label>Weight:  </label>
                    <input type="text" name='weight' value={data.weight} onChange={handleInput} placeholder="min - max"/>
                </div>
                <div>
                    <label>Height:  </label>
                    <input type="text" name='height' value={data.height} onChange={handleInput} placeholder="min - max"/>
                </div>
                <div>
                    <label>Life Span:  </label>
                    <input type="text" name='life_span' value={data.life_span} onChange={handleInput} placeholder="min - max"/>
                </div>
                <div>
                    <label>Image URL:  </label>
                    <input type="text" name='image' value={data.image} onChange={handleInput}/>
                </div>
                <div>
                    <label>Select temperaments: </label>
                    <select onChange={handleSelect}>
                      {temperaments.map((t) => (
                        <option
                          key = {t.id}
                          value = {t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {/* <div>
                       {data.temperaments?.map((t) => 
                         <label key={t}>
                         <button name={t} onClick={onClick}>x</button>
                         {t}  
                         </label> 
                       )} 
                    </div> */}
                </div>
                <button type="submit" >CREATE</button>
            </form>
        </div>
 )
};

