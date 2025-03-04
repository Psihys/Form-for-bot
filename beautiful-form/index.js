const signIn = document.getElementById("signinButton")
const signUp = document.getElementById("signupButton")
const sighInBlock = document.getElementById("sighInBlock");
const sighUpBlock = document.getElementById("sighUpBlock");


signIn.addEventListener("click" , () => {
    sighUpBlock.classList.add("is-hidden");
    sighUpBlock.classList.remove('is-visible')
    
    sighInBlock.classList.remove("is-hidden");
    sighInBlock.classList.add("is-visible");
})

signUp.addEventListener("click" , () => {
    sighUpBlock.classList.remove("is-hidden");
    sighUpBlock.classList.add('is-visible')

    sighInBlock.classList.add("is-hidden");
    sighInBlock.classList.remove('is-visible')
   
})