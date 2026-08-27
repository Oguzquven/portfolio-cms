const URL="/api/technologies";
async function request(url,options={}){const response=await fetch(url,{headers:options.body?{"Content-Type":"application/json"}:undefined,...options});if(!response.ok){const body=await response.json().catch(()=>null);throw new Error(body?.message||`İstek başarısız oldu (${response.status})`);}return response.status===204?null:response.json();}
export const getTechnologies=(publishedOnly=false)=>request(`${URL}?publishedOnly=${publishedOnly}`);
export const createTechnology=(value)=>request(URL,{method:"POST",body:JSON.stringify(value)});
export const updateTechnology=(id,value)=>request(`${URL}/${id}`,{method:"PUT",body:JSON.stringify(value)});
export const toggleTechnologyPublication=(id)=>request(`${URL}/${id}/publication`,{method:"PATCH"});
export const deleteTechnology=(id)=>request(`${URL}/${id}`,{method:"DELETE"});
