const API_BASE = "http://localhost:5000"

export async function apiChat(text, subject){
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ text, subject })
  })
  return res.json()
}

export async function apiGetQuiz(subj){
  const res = await fetch(`${API_BASE}/quiz/${subj}`)
  return res.json()
}

export async function apiSubmitAnswer(quizId, choice){
  const res = await fetch(`${API_BASE}/answer`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ quizId, choice, user: "You" })
  })
  return res.json()
}

export async function apiLeaderboard(){
  const res = await fetch(`${API_BASE}/leaderboard`)
  return res.json()
}
