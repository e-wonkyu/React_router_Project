
function genPostArgs(headers,body){
    if(!headers) return null;
    if(!body) return null;
    return {method:"POST",headers:headers,body:body};
}

export async function RequestGetParams(url){
    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {if(data.ok) return data; else throw new Error('Response Error');})
        .catch((error) => {console.log("Error : ",error)});
}

export async function RequestPost(baseurl,postargs){
    return await fetch(baseurl,postargs)
        .then((response) => response.json())
        .then((data) => {if(data.ok) return data; else throw new Error('Response Error');})
        .catch((error) => {console.log("Error : ",error)});
}
export async function RequestGet(baseurl,getargs){
    return await fetch(baseurl,getargs)
        .then((response) => response.json())
        .then((data) => {if(data.ok) return data; else throw new Error('Response Error');})
        .catch((error) => {console.log("Error : ",error)});
}

