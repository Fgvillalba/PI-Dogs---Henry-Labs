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
   weightMin: '',
   weightMax: '',
   heightMin: '',
   heightMax: '',
   life_spanMin: '',
   life_spanMax: '',
   image: '',
   temperaments: [],
 });  

 function handleInput(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrors(validate({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSelect(e) {
   if(e.target.value !== " "){
    if(!data.temperaments.includes(e.target.value)){
    setData({
      ...data,
      temperaments: [...data.temperaments, e.target.value],
     });
    }
   }  
  };

  function handleSubmit(e){
    e.preventDefault(); 
    if(Object.keys(errors).length === 0){
     dispatch(postBreed({
       ...data, 
       weight: data.weightMin + " - " + data.weightMax,
       height: data.heightMin + " - " + data.heightMax,
       life_span: data.life_spanMin + " - " + data.life_spanMax + " years"
     }));
     setData({
      name: '',
      weightMin: '',
      weightMax: '',
      heightMin: '',
      heightMax: '',
      life_spanMin: '',
      life_spanMax: '',
      image: '',
      temperaments: [],
    });
    alert("created sucesfully")
    history.push('/home');
    }
    else {
      alert("complete inputs")
    }
  };

  function onClick(e){
   e.preventDefault();
   setData({
        ...data,
        temperaments: data.temperaments.filter((t) => t !== e.target.name)
    });
  };

  console.log("errors", errors)

 return (
        <div>
            <h1>Create your breed:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:  </label>
                    <input type="text" name='name' value={data.name} onChange={handleInput}/>
                </div>
                <div>
                    <label>Weight min:  </label>
                    <input type="number" name='weightMin' value={data.weightMin} onChange={handleInput} />
                    <label> max:  </label>
                    <input type="number" name='weightMax' value={data.weightMax} onChange={handleInput} />
                </div>
                <div>
                    <label>Height min:  </label>
                    <input type="number" name='heightMin' value={data.heightMin} onChange={handleInput} />
                    <label> max:  </label>
                    <input type="number" name='heightMax' value={data.heightMax} onChange={handleInput} />
                </div>
                <div>
                    <label>Life span min:  </label>
                    <input type="number" name='life_spanMin' value={data.life_spanMin} onChange={handleInput} />
                    <label> max:  </label>
                    <input type="number" name='life_spanMax' value={data.life_spanMax} onChange={handleInput} />
                </div>
                <div>
                    <label>Image:  </label>
                    <input type="text" name='image' value={data.image} onChange={handleInput} placeholder="url"/>
                </div>
                <div>
                    <label>Select temperaments: </label>
                    <select onChange={handleSelect}>
                      {[{id: " ", name: " "} ,...temperaments].map((t) => (
                        <option
                          key = {t.id}
                          value = {t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    <div>
                       {data.temperaments?.map((t) => 
                         <label key={t}>
                         <button name={t} onClick={onClick}>x</button>
                         {t}  
                         </label> 
                       )} 
                    </div>
                </div>
                <button type="submit" >CREATE</button>
            </form>
        </div>
 )
};

function validate(data){
 let errors = {};
 if(!data.name) errors.name = 'Name is required.'
 if(!data.weightMin){
    errors.weightMin = 'Weight min is required.'
 } else if(Number(data.weightMin) <= 0){
  errors.weightMin = 'Weight min must be greater than 0.'
 }
if(!data.weightMax) {
  errors.weightMax = 'Weight max is required.'
} else if(Number(data.weightMax) <= Number(data.weightMin)){
  errors.weightMax = 'Weight max must be greater than weight min.'
}
if(!data.heightMin){
  errors.heightMin = 'Height min is required.'
} else if(Number(data.heightMin <= 0)){
  errors.heightMin = 'Height min must be greater than 0.'
}
if(!data.heightMax) {
errors.heightMax = 'Height max is required.'
} else if(Number(data.heightMax) <= Number(data.heightMin)){
errors.heightMax = 'Height max must be greater than height min.'
}
if(!data.life_spanMin){
  errors.life_spanMin = 'Life span min is required.'
} else if(Number(data.life_spanMin) <= 0){
  errors.life_spanMin = 'Life span min must be greater than 0.'
}
if(!data.life_spanMax) {
 errors.life_spanMax = 'Life span max is required.'
} else if(Number(data.life_spanMax) <= Number(data.life_spanMin)){
 errors.life_spanMax = 'Life span max must be greater than life span min.'
}
if(!data.image){
  errors.image = 'Image url is required'
} else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(data.image)){
  errors.image = 'Image url is invalid.'
}

return errors;
}