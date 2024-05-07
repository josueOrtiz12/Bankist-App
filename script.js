'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = function(movements){
  movements.forEach(function(mov , i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';


    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}</div>
  </div>
  `;

  containerMovements.insertAdjacentHTML('afterbegin' , html);
  });
} 
displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const arr = ['a' , 'b' , 'c' , 'd' , 'e' , 'f'];

// //*********************** */ SLICE (corte)
// console.log(arr.slice(2));
// console.log(arr.slice(2 , 4));
// // parametro negativo para empezar a copiar desde el final
// console.log(arr.slice(-3));
// // extraer desde un numero positivo hasta uno negativo(el negotivo sera las posiciones de derecha a izquierda que le indiquemos)
// console.log(arr.slice(1 , -2));


// /** */
// console.log('***-----------------****');
// /********************** SPLICE (empalme)*/
// /**este metodo si muta la variable */
// // console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);


// console.log('***-----------------****');
// const arrTwo = ['g' , 'h' , 'i' , 'j' , 'k'];

// /********************** REVERSE */
// // el metodo reverse invierte el orden y muta el array
// console.log(arrTwo.reverse());
// console.log(arrTwo);

// console.log('***-----------------****');
// /********************** CONCAT */ 
// /**concatener dos matrices */
// const arrThree = ['l' , 'm' , 'n' , 'ñ'];
// const letter = arrTwo.concat(arrThree)
// console.log(letter);

// /**otra manera que ya hicimos spred operator(...) */
// console.log([...arrTwo , ...arrThree]);


// console.log('***-----------------****');
// /********************** JOIN (union )*/
// console.log(letter.join(' - '));

// console.log('***-----------------****');
// /********************** AT (en)*/
// // el at funciona igual cuando extraemos el elemento en una posicion en especifico del array
// const number = [ 71 ,42 ,23 , 45];
// // console.log(number[0]);
// console.log(number.at(0));


// //getting the last element

// // console.log(number[number.length -1]);
// // console.log(number.slice(-1)[0]);

// // con el metodo at se simplifica tener que buscar el ultimo parametro
// console.log(number.at(-1));


//**************** */ CICLO foreach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Usando  for
// // for(const movement of movements){
// for(const [i , movement] of movements.entries()){
//   if(movement > 0){
//     console.log(`Movement ${i+ 1} - you desposited of ${movement}`);
// }
//   else{
//     console.log(`Movement ${i+1} - you made a withdrawal of ${movement}`);
//   }
// }
// console.log('****-------forEach-----****');
// /**en matricez */
// // usando foreach
// // foreach es un metodo que necesita el callback de una funcion

// movements.forEach(function(mov , i , arr){
//   /*para obtener el indice solo se lo pasamos como metodo a la funcion, no importa el nombre.. lo que importa es es el orden primero el elemento, segundo su indice y tercero siempre la matriz(el conjunto de datos)  */
//   if(mov > 0){
//     console.log(`Movement ${i+ 1} - you desposited of ${mov}`);
//   }
//   else{
//     console.log(`Movement ${i+1} - you made a withdrawal of ${mov}`);
//   }
// })
//0: function(200);
//1: function(450);
//2: function(-400);


// console.log('****-------forEach--MAP---****');

// /**en mapas y conjustos */

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


// currencies.forEach(function(value, key, map){
//   console.log(`${key} : ${value}`)
// })

// console.log('****-------forEach--SET---****');
// const currenciesUniques = new Set(['USD' , 'EUR' , 'GBP' , 'USD', 'EUR']);
// console.log(currenciesUniques);
// currenciesUniques.forEach(function(current, _, set){
//   console.log(`${current} : ${current}`);
// })