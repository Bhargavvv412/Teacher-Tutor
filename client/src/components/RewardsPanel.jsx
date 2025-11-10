import React from 'react'

export default function RewardsPanel({stars=0, leaderboard=[]}){
  return (
    <div className="card panel">
      <h3 className="panel-title">Leaderboard</h3>
      <div className="star">⭐</div>
      <p className="small" style={{margin:'6px 0 10px'}}>Your stars: <b>{stars}</b></p>
      <div style={{borderTop:'1px solid #22304d', paddingTop:8}}>
        {leaderboard.map((row, i)=>(
          <div key={i} className="small" style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}>
            <span>{i+1}. {row.name}</span>
            <span>⭐ {row.stars}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
