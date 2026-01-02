import React, { useState } from 'react'

const useForm = (initaialvalue) => {
  const [datas,setDatas] = useState(initaialvalue)
  
  const handlechange = (e)=>{

      const {value} = e.target



      if (value === "five")  return setDatas(`this is the ${value}`) 
      else return setDatas("Error happen")



  }
  
  
  
  
  
    return {handlechange,datas}




}

export default useForm
