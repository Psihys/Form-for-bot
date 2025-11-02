export const getISSData = async () =>{
    try{
        const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544")
        const data = await res.json()
        return data
    } catch (err){
        console.log(err)
    }
}

export const getISSPosition = async () =>{
    const data = await getISSData()
    const {latitude, longitude} = data
    return {latitude, longitude}
}

console.log(await getISSData())