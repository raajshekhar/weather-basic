document.addEventListener('DOMContentLoaded',()=>{
    const weatherForm = document.querySelector('form');
    const input = document.querySelector('input');
    const div = document.querySelector('.reponse');

    weatherForm.addEventListener('submit',async (e) => {
        e.preventDefault();

        const cityName = input.value.trim();
        if(!cityName) return div.innerHTML = `<p>Please Enter the city</p>`
        const url =`/weather?address=${cityName}`;
        div.innerHTML = `<p>Loading....</p>`
        
        try{
            let response= await (await fetch(url)).json();
            let { data, error } = response;
            if(data) div.innerHTML = `<p style="line-height: 25px;">${data}</p>`
            else div.innerHTML = `<p>${error}</p>`            
        } catch(error){
            div.innerHTML = `<p>${error}</p>`
        }
    })
})

const request = async url => {
    const response = await fetch(url);
    const json = await response.json();
    alert(response.json())
    return Promise.resolve(json);
};