function checkWeather(){
    let getCity=document.getElementById("setCity")
    let req= new XMLHttpRequest()
    let getWeather='http://api.openweathermap.org/data/2.5/weather?q='+getCity.value+'&appid=9f162c4a7576a32569f4374bd5fdff7b'
    req.open('GET',getWeather,true)
    req.onload = ()=>{
        const getW=JSON.parse(req.response)
        try{
            if(req.status > 200) {
                throw "Invalid status code: " + req.status
            }
            
            else{
                for(let [i,j] of Object.entries(getW)){
                    console.log(i + " : "+ j)
                }
                console.log(getW)
                displayWeather(getCity,getW)
            }
        }
        
        catch(err){
            alert(err)
            document.querySelector(".card-header").innerHTML="City Not Found"
            reset()
        }
    
}

    req.send()
    // console.log(getWeather)
}
const reset=()=>{
    let defaultValue="---"
    const resetDesc=document.querySelector("#description")
    const resetAllTemps= document.querySelectorAll(".list__temps")
    const resetHumid= document.querySelector("#humid")
    const resetPressure=document.querySelector("#pressure")
    const resetWinds=document.querySelectorAll(".list__winds")
    const allReset=[resetDesc,...resetAllTemps,resetHumid,resetPressure,...resetWinds]
    
    for(let i of allReset){
        i.innerHTML=defaultValue
    }
    
    
}



function displayWeather(cityName,getW){
    document.querySelector(".card-header").innerHTML=cityName.value
    
    const assignTemp=(getTemp) =>{
        let degTemp=`
            ${(getTemp-273).toFixed(1)}<sup><i class="fas fa-genderless"></i></sup>C
            `
        return degTemp
    } 
        const showTemp=()=>{
            let temperatures=[getW.main.temp,getW.main.temp_min,getW.main.temp_max]
            temperatures=temperatures.map((myTemp)=>
            myTemp=assignTemp(myTemp)
            )
            let tempItems=document.querySelectorAll(".list__temps")
            for(let i in tempItems){
                tempItems[i].innerHTML=temperatures[i]
            }
        }
        showTemp()
        const showHumid=()=>{
            let humid=`
            ${getW.main.humidity} %
            `
            document.querySelector("#humid").innerHTML=humid
        }
        showHumid()

        const showPressure=()=>{
            let press=`
            ${getW.main.pressure} mb
            `
            document.querySelector("#pressure").innerHTML=press
        }
        showPressure()
       

        const showWind=()=>{
            let winds=[getW.wind.speed,getW.wind.deg]
            
            let windItems=document.querySelectorAll(".list__winds")
            
            for(let i in windItems){
                windItems[i].innerHTML=winds[i]    
                
            }
        }
        showWind()

        const showDesc=()=>{
            document.querySelector("#description").innerHTML=getW.weather[0].description
        }
        showDesc()
}


function displayTime(){
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let datetime= new Date();
    
    let Today=`${days[datetime.getDay()]} <br>
    ${months[datetime.getMonth()]} ${datetime.getDate()}, ${datetime.getFullYear()}
    `
    document.querySelector("#timeDisplay h1").innerHTML=Today 
    
    
    let hrs=datetime.getHours() >12 ? datetime.getHours()-12: datetime.getHours()
    let zone=datetime.getHours() >12 ? "PM":"AM"
    let timeNow=`${hrs}:${datetime.getMinutes()}:${datetime.getSeconds()} ${zone}`
    document.querySelector("#timeDisplay h5").innerHTML=timeNow
    setTimeout(displayTime,1000)
    
}
displayTime()