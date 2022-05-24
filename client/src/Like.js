import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { LikeTwoTone } from '@ant-design/icons'


function Like(props) {

    let variable = {
      _id: props.text._id
  }

  const onLike = () => {
    
    axios.post('/comment/likeupdate', variable)
    .then(response => {
      if(response.data.success){
          console.log('api result', response.data)
      } else {
        alert('좋아요 버그')
      }
    })
  }

  return (
    <div style={{color:'skyblue', display:'flex', alignItems:'center', marginLeft:'1rem', justifyContent:'center', fontSize:'1.5rem'}}>
            <LikeTwoTone
                    onClick={onLike} />
                    {props.like}
    </div>
  )
}

export default Like