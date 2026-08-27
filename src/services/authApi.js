const parse=async response=>{if(!response.ok){const body=await response.json().catch(()=>null);throw new Error(body?.message||`İstek başarısız oldu (${response.status})`);}return response.status===204?null:response.json();};
export const getSession=()=>fetch("/api/auth/me").then(parse);
export const login=({email,password})=>fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({username:email,password})}).then(parse);
export const logout=()=>fetch("/api/auth/logout",{method:"POST"}).then(parse);
