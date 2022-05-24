import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Like from './Like';


function App() {

  const [Text, setText] = useState("");
  const [SaveText, setSaveText] = useState([]);

  useEffect(() => {
    axios.get('/comment/getcomment')
    .then(response => {
      if(response.data.success){
        setSaveText(response.data)
      } else {
        alert('버그 발생ㅋㅋ')
      }
    })
  
  }, [SaveText])
  


  const onText = (e) => {
    setText(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if((Text === "") || (Text.trim("") === "")){
      alert('공란입니다만?')
    } else {

    let variable = {
      content: Text
    }
    axios.post('/comment/saveContent', variable)
    .then(response => {
      if(response.data.success){
        window.location.replace('/')
      } else {
        alert('저장하는데 실패하였습니다.')
      }
    })
  }
}

  return (
    <div style={{backgroundColor: '#282c34', minHeight:'100vh'}}>

          <div style={{color:'white', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
              <h2 style={{marginBottom:'0.3rem'}}>좋은 글귀 남기고 가세요</h2>
              <h4 style={{margin:'0', marginBottom:'1rem', display:'flex', alignItems:'center', justifyContent:'center'}}>(1등은 아우디, K9, 그랜저, 칭찬을 랜덤추첨하여 드립니다!)</h4>
          </div>


          <form onSubmit={onSubmit} style={{marginTop:'1rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <input value={Text} onChange={onText} type="text" placeholder="알고계셨나요? 애슐리 영은 새똥을 먹지않았습니다 -태연-"style={{textAlign:'center', width:'50rem', height:'7rem', fontSize:'1.5rem'}}></input>
            <input type="submit" style={{marginLeft:'0.5rem', height:'7.5rem', width:'4rem'}}></input>
          </form>
          
          <div style={{marginTop:'4rem', color:'white', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

            {SaveText.comment && SaveText.comment.map((text, index) => (
              <div key={index} style={text._id === '628cb2425f50a283e8752108' ? {display:'flex', color:'red', marginBottom:'1.5rem', fontSize:'3rem'} : {display:'flex', color:'white', marginBottom:'2rem', fontSize:'1.5rem'}}>{text.content} <Like text={text} like={text.like} /></div>
            ))}
          </div>
          
    </div>
  );
} 

    
        
export default App;
