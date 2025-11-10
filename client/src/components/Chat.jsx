import React, {useEffect, useRef} from 'react'
import MessageBubble from './MessageBubble.jsx'
import '../styles/chat.css'

function handleQuickMath() {
  fetch("http://localhost:5001/quiz/math")
    .then(res => res.json())
    .then(data => {
      onSend({
        role: "bot",
        text: "Here's a Math quiz for you!",
        options: { type: 'quiz', quiz: data }
      });
    });
}


export default function Chat({messages, onSend, onOptionPick}){
  const inputRef = useRef(null)
  const scrollerRef = useRef(null)

  useEffect(()=>{
    scrollerRef.current?.scrollTo({top: 999999, behavior:'smooth'})
  }, [messages])

  function handleKey(e){
    if(e.key==='Enter' && !e.shiftKey){
      e.preventDefault()
      const v = inputRef.current.value.trim()
      if(v){ onSend(v); inputRef.current.value='' }
    }
  }

  return (
    <div className="card chat">
      <div className="messages" ref={scrollerRef}>
        {messages.map((m, i)=> (
          <MessageBubble key={i} role={m.role} text={m.text} options={m.options} onOption={(idx)=>onOptionPick?.(m, idx)} />
        ))}
      </div>
      <div className="inputbar">
        <input ref={inputRef} className="textinput" placeholder="Type your question..." onKeyDown={handleKey} />
        <button className="send" onClick={()=>{ const v=inputRef.current.value.trim(); if(v){ onSend(v); inputRef.current.value='' }}}>Send</button>
      </div>
    </div>
  )
}
