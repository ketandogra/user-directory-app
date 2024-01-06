import React, { useEffect } from 'react'
import "./loading.scss"

const Loading = ({setIsLoading}) => {

  useEffect(()=>{
    setTimeout(()=>{setIsLoading(false)},1000)
  })
  
  return (
    <div className='loadingContainer'>
        <span className="loader"></span>
    </div>
    
  )
}

export default Loading