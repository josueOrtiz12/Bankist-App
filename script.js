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


const mensajeModal = document.querySelector('.mensage-modal');


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


const updateUi = function(acc){
   //Display movements 
   displayMovements(acc.movements);
   // Display balance
   calcPrintBalance(acc);

   // Displyas summary
   calcDisplaySummary(acc);
}



btnLogin.addEventListener('click' , function(e){
  //Prevent form from submitting
  e.preventDefault()
    currentAccount = accounts.find(function(acco){
      return acco.userName === inputLoginUsername.value;
  });
   if(currentAccount?.pin === Number(inputLoginPin.value)){
    console.log('Login');
    //Display UI and message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;
    containerApp.style.opacity = 100;

    /**Update UI */
    updateUi(currentAccount);
    
    //Clear input fileds
     inputLoginPin.value = '';
     inputLoginPin.value = ''; 

     inputLoginPin.blur();

  }
   else{
    containerApp.style.opacity = 0;
    mensajeModal.textContent = `Incorrect username or password, try again..`
    openModal();
   }
   console.log(currentAccount.movements);
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
const calcPrintBalance = function(acc){
  const balance = acc.movements.reduce(function(acc , mov){
    return acc + mov;
  } , 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance} EUR`;
}

/***calc Print Balance Funtion */


/********calc Display Summary */
const calcDisplaySummary = function(acc){
  const totalDeposit = acc.movements.filter(function(mov){
    return mov > 0;
  }).reduce(function(acc , mov){
    return acc + mov;
  } , 0);
  labelSumIn.textContent = `${totalDeposit} €`;


  const totalWithdrawal = acc.movements.filter(function(mov){
    return mov < 0;
  }).reduce(function(acc , mov){
    return acc + mov
  } , 0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)} € `;


  const interest = acc.movements.filter(function(mov){
      return mov > 0;
  }).map(function(deposit){
    return (deposit * acc.interestRate)/ 100;
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


const transfer = function(transfTo , amount , acc){
  const accountFind = accounts.find(function(acc){
    return acc.userName === transfTo
  });
  if(accountFind?.userName === transfTo && acc != undefined && transfTo != acc.userName){
    // console.log(`transferencia hecha de ${acc.owner} a ${transfTo}  de ${amount} con exito`);
    /**doing transference */
    accountFind.movements.push(amount);
    currentAccount.movements.push(-amount);

    /**update */
    updateUi(currentAccount);

  }else{
    mensajeModal.textContent =`transfer rejected` ;
    openModal()
  }

}





btnTransfer.addEventListener('click' , function(e){
  e.preventDefault()
  const userToTransfer = inputTransferTo.value;
  const amountToTransfer = Number(inputTransferAmount.value);
  if(amountToTransfer > 0 && currentAccount.balance >= amountToTransfer ){
    transfer(userToTransfer , amountToTransfer, currentAccount)
  }
  else{
    mensajeModal.textContent = `Invalid amount or user`
    openModal()
  }
 

})


btnLoan.addEventListener('click' , function(e){ 
    e.preventDefault();


    const amount = Number(inputLoanAmount.value);
    if(amount > 0  && currentAccount?.movements.some(function(mov){
      return mov >= amount * 0.1;
    }) && amount <= 1500){

      const loanAmount = Number(inputLoanAmount.value)
      currentAccount.movements.push(loanAmount);
      updateUi(currentAccount);
     
    }else{
      mensajeModal.textContent =`Loand Amount Denied, We lend them up to 1500` ;
      openModal()
    }

    inputLoanAmount.value = '';
})



/**Deleted account with map */


btnClose.addEventListener('click' , function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount?.userName && Number(inputClosePin.value) === currentAccount?.pin){
    
    //Find index of account 
    const index = accounts.findIndex(function(acc){
      return acc.userName === currentAccount.userName;
    })
    
    //Deleted account
    accounts.splice( index , 1);
    
    
    //Hide uI
    containerApp.style.opacity = 0;
    console.log('Delete account')
 
  }else{
    mensajeModal.textContent = `Error deleting account `
    openModal();
  }

  inputCloseUsername.value = '';
  inputClosePin.value = ''; 
})


btnSort.addEventListener('click' , function(e){
  e.preventDefault()
  console.log(currentAccount.movements);
currentAccount.movements.sort(function(a , b){
    if(a > b){
      return -1;
    }
    if(a < b){
      return 1
    }
  });
  /**update */
  updateUi(currentAccount);
})