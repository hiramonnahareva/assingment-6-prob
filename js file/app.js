// error div and and others div display function 
const displayFunction = (id , displayStyle) => {
    const divId = document.getElementById (id) ;
     divId.style.display = displayStyle
}
// searching input 
const loadingButton = () => {
    displayFunction('spinner','block') ;
    const input = document.getElementById ('input') ;
    const searchText = input.value ;
   if (searchText == ''){
    swal({
        title: "wrong!",
        text: "You clicked the button!",
        icon: "error",
      });
      displayFunction ('error','block') ;
      displayFunction('all-display','none') ;

   }
   else {
       displayFunction('error','none') ;
    input.value = '' ;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch (url) 
    .then (res => res.json ())
    .then (products => display (products.data))    
   
   }
}

const display = products => {
    const displayDiv = document.getElementById ('display')
    if (products == ''){
        swal({
            title: "sorry!",
            text: "You clicked the button!",
            icon: "error",
          });
         displayFunction ('error','block') ;
      displayFunction('all-display','none') ;
    }
    else{
    displayDiv.textContent = '' ;
    const products20 = products.slice (0 , 20) ;
    products20.forEach(element => {
      const div =  document.createElement ('div') ;
      div.className= 'col-md-4 my-2'
      div.innerHTML = `
      <div class='bg-light rounded p-5 h-100'>
      <img src='${element.image}' class='w-75'>
      <h4>${element.phone_name}</h4>
      <h5>${element.brand}</h5>
      <button onclick="detailsBtn('${element.slug}')" class='btn btn-outline-dark mt-2'>Detail</button>
      </div>
      `
      displayDiv.appendChild (div) ;
    //   add all button 
      if (products.length>=21){
          const allButton = () =>{
              productsAbove20 = products.slice (20 ,products.length) ;
              products20.forEach(element => {
                  console.log (element.image ,element.phone_name , element.brand , element.slug)
                const div =  document.createElement ('div') ;
                div.className= 'col-md-4 my-2'
                div.innerHTML = `
                <div class='bg-light rounded p-5 h-100'>
                <img src='${element.image}' class='w-75'>
                <h4>${element.phone_name}</h4>
                <h5>${element.brand}</h5>
                <button onclick="detailsBtn('${element.slug}')" class='btn btn-outline-dark mt-2'>Detail</button>
                </div>
                `
              console.log (productsAbove20) ;
          })
          
      }
      allButton()
    }
      displayFunction('details','none') ;
      displayFunction('spinner','none') ;
    });
}
}
// details button function
const detailsBtn = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}` ;
    fetch (url)
    .then (res => res.json())
    .then (data => detailInfo(data))
}
// details information display function
const detailInfo = (details) => {
    displayFunction('details','block') ;
    const displayDetails = document.getElementById ('details')
    const others = details?.data?.others ;
    if (others === undefined){
        displayDetails.innerHTML = `<div class='p-5'>
        <div class ='d-flex justify-content-center'> 
        <img src='${details.data.image}' >
        </div>
        <h1 class='text-center'>${details.data.name}</h1>
        <h4 class='text-center'>${details.data.brand}</h4>
        <h5 class='text-center'>Release Date: ${details.data.releaseDate}</h5>
        <h6 class='text-center mt-5'>Chip Set: ${details.data.mainFeatures.chipSet}</h6>
        <h6 class='text-center'>Memory: ${details.data.mainFeatures.memory}</h6>
        <h6 class='text-center'>Display Size: ${details.data.mainFeatures.displaySize}</h6>
        <h5 class='text-center text-danger'> no others information </h5>
        </div>
         `
    } 
    else {
    const {Bluetooth , GPS , NFC ,Radio , WLAN} = others ;
    const sensors = (details.data.mainFeatures.sensors) ;
    const [FaceID , accelerometer , gyro , proximity , compass , barometer] = sensors ;
    console.log (sensors) ;
    const releaseDate = (details.data.releaseDate) ;
    if (releaseDate == ''){
        displayDetails.innerHTML = `<div class='p-5'>
        <div class ='d-flex justify-content-center'> 
        <img src='${details.data.image}' >
        </div>
        <h1 class='text-center'>${details.data.name}</h1>
        <h4 class='text-center'>${details.data.brand}</h4>
        <h5 class='text-center text-danger'> Release date is no found</h5>
        <h6 class='text-center mt-5'>Chip Set: ${details.data.mainFeatures.chipSet}</h6>
        <h6 class='text-center'>Memory: ${details.data.mainFeatures.memory}</h6>
        <h6 class='text-center'>Display Size: ${details.data.mainFeatures.displaySize}</h6>
        <h6 class='text-center'><span class='mx-3'>Bluetooth: ${Bluetooth}</span><span class='ms-3'>Gps: ${GPS}</span></h5>
        <h6 class='text-center my-3'><span class='ms-4>NFC: ${NFC}</span> <span class='ms-4'>Radio: ${Radio}</span><span class='ms-4'>Radio: ${USB}</span></h6>
        <h6 class='text-center'>WLAN: ${WLAN}</span></h6>
        <h6 class='text-center'>Sensors : ${FaceID} , ${accelerometer} , ${gyro} , ${ proximity} , ${compass} , ${barometer}</h6>
        </div>
         `
    }
    else {
    console.log (details.data)
    displayDetails.innerHTML = `
    <div class='p-5'>
   <div class ='d-flex justify-content-center'> 
   <img src='${details.data.image}'>
   </div>
        <h1 class='text-center'>${details.data.name}</h1>
        <h4 class='text-center'>${details.data.brand}</h4>
        <h5 class='text-center my-5'>Release Date:${releaseDate}</h5>
        <h6 class='text-center'>Chip Set: ${details.data.mainFeatures.chipSet}</h6>
        <h6 class='text-center'>Memory: ${details.data.mainFeatures.memory}</h6>
        <h6 class='text-center'>Display Size: ${details.data.mainFeatures.displaySize}</h6>
        <h6 class='text-center'><span class='mx-3'>Bluetooth: ${Bluetooth}</span><span class='ms-3'>Gps: ${GPS}</span></h5>
        <h6 class='text-center my-3'>Sensors : ${FaceID} , ${accelerometer} , ${gyro} , ${ proximity} , ${compass} , ${barometer}</h6>
        <h6 class='text-center'><span class='ms-5'>NFC: ${NFC}</span> <span class='ms-5'>Radio: ${Radio}</span><span class='ms-5'>Radio: ${USB}</span></h6>
        <h6 class='text-center my-3'>WLAN: ${WLAN}</span></h6>
        
   </div>
    `
    }

    }
}

