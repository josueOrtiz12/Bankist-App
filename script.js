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


/***Print Deposit Funtion */
// const prinDeposit = function(movement){
//   const deposit = movement.filter(function(mov){
//     return mov > 0;
//   });
//   const balanceDeposit = deposit.reduce(function(acc , mov){
//     return acc + mov;
//   }, 0);
//   labelSumIn.textContent = `${balanceDeposit} €`;
//   console.log(balanceDeposit);
// }
// prinDeposit(account1.movements);



const createUserName = function(accs){ 
  accs.forEach(function(acc){
   acc.userName = acc.owner.toLowerCase().split(' ').map(function(word){
      return word[0]
    }).join('');
  })
};

createUserName(accounts);


let currentAccount;

btnLogin.addEventListener('click' , function(e){
  //Prevent form from submitting
  e.preventDefault()
  
//  console.log(inputLoginUsername);
    currentAccount = accounts.find(function(acco){
      return acco.userName === inputLoginUsername.value;
  });
   if(currentAccount?.pin === Number(inputLoginPin.value)){
    console.log('Login');
    //Display UI and message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;
    containerApp.style.opacity = 100;

    //Display movements 
    displayMovements(currentAccount.movements);
    // Display balance
    calcPrintBalance(currentAccount.movements);

    // Displyas summary
    calcDisplaySummary(currentAccount);
    
    //Clear input fileds
     inputLoginPin.value = '';
     inputLoginPin.value = ''; 

     inputLoginPin.blur();

  }
   else{
    containerApp.style.opacity = 0;
    openModal();
   }
});

const displayMovements = function(movements){
  containerMovements.innerHTML = '';
  movements.forEach(function(mov , i){

    // containerMovements.innerHTML = '';
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

/***calc Print Balance Funtion */
const calcPrintBalance = function(movement){
  const balance = movement.reduce(function(acc , mov){
    return acc + mov;
  } , 0);
  labelBalance.textContent = `${balance} EUR`;
}

/***calc Print Balance Funtion */


/********calc Display Summary */
const calcDisplaySummary = function(account){
  // console.log(account);
  const totalDeposit = account.movements.filter(function(mov){
    return mov > 0;
  }).reduce(function(acc , mov){
    return acc + mov;
  } , 0);
  labelSumIn.textContent = `${totalDeposit} €`;


  const totalWithdrawal = account.movements.filter(function(mov){
    return mov < 0;
  }).reduce(function(acc , mov){
    return acc + mov
  } , 0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)} € `;


  const interest = account.movements.filter(function(mov){
      return mov > 0;
  }).map(function(deposit){
    return (deposit * account.interestRate)/ 100;
  })
  .filter(function(inter, i ,arr){
    return inter >= 1;
  })
  .reduce(function(acc , interest ){
    return acc + interest;
  },0 );
  labelSumInterest.textContent = `${interest} €`
}

/********calc Display Summary */


/**show modal */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');


const closeModal = function(){
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

const openModal = function(){
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden');
}

btnCloseModal.addEventListener('click' , closeModal);

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && !modal.classList.contains('hidden')){
    closeModal();
  }
})


const transfer = function(transfTo , amount){
  const accountFind = accounts.find(function(acc){
    return acc.userName === transfTo
  });
  if(accountFind?.userName === transfTo){
    console.log(`transferencia hecha a ${transfTo}  de ${amount} con exito`);
  }else{
    console.log(`tranferecia rechazada`);
  }

}



btnTransfer.addEventListener('click' , function(e){
  e.preventDefault()
  const userToTransfer = inputTransferTo.value;
  const amountToTransfer = inputTransferAmount.value;
  transfer(userToTransfer , amountToTransfer)
})

