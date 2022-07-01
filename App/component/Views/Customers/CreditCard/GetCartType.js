import React, { Component } from 'react';
 
 

 export   const CreditCartType = async (num) =>
  {
    
    num = num.replace(/[^\d]/g, '');
    // now test the number against some regexes to figure out the card type.
    if (num.match(/^5[1-5]\d{14}$/)) {
        return 'mastercard';
    } else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
        return 'visa';
    } else if (num.match(/^3[47]\d{13}/)) {
        return 'American Express';
    } else if (num.match(/^6011\d{12}/)) {
        return 'discover';
    }
    else if (num.match(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)) {
        return 'Diners Club';
    }
    else if (num.match(/^(?:2131|1800|35\d{3})\d{11}$/)) {
        return 'jcb';
    }
    return '';
 
  }
   
  

  
 

 