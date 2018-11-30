let myLet = {
    firstName: 'Sjoerd',
    lastName: 'Teunisse',
    emailAdress: 'sjoerdteunisse@gmail.com',
    adress:{
        straat:'here',
        nr: 5,
        postalCode:{
            numbers: '22',
            letters: 'c'
        }
    },
    phonenumbers: [
            {pa: 'a', pc: 'b'},
            {pa: 'c', pc: 'd'}
        
    ]
};



/** 
 * Function  
 **/
function printAdres(input){
    console.log(input.adress.straat + ' ' + input.adress.nr);
}

/** 
 * Function to var  
 **/
// const printadress = function(input){
//     console.log(input.adress.straat + ' ' + input.adress.nr);
// }



// /** 
//  * Lambda function
//  **/
// const printadress = (input) => console.log(input.adress.straat + ' ' + input.adress.nr);



const giveAdress = (input, callback) => {
     setTimeout(() => {
        callback(input.adress.straat + ' ' + input.adress.nr)
     }, 4000);
};

const func = () => {

//Code
}

//call func : func()

console.log("asd");


//Aanroep
giveAdress(myLet, (straat) => {
    console.log('mijn straat: ' + straat);
});


//console.dir(myLet);









