//  fetch('http://localhost:3000/weather?address=jamshedpur').then((response)=>{
//      response.json().then((data)=>{
//          if(data.error)
//          console.log(data.error)
//          else
//          {
//              console.log(data.location)
//          }
//      })

//  })

 const weatherForm=document.querySelector('form')
 const search=document.querySelector('input')
 const message1=document.querySelector('#m1')
 const message2=document.querySelector('#m2')
 weatherForm.addEventListener('submit',(e)=>{
     message1.textContent='Loading..'
     message2.textContent=''
     e.preventDefault()
     fetch('/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            message1.textContent=data.error
            else
            {
                message1.textContent=data.location
                message2.textContent=data.forecast
            }
        })
   
    })
     const location=search.value
 })