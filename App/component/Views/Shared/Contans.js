import React, { Component } from 'react';

 export   const AmountFormat =   (Amount) => {
     

      return '$' + Amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  
 }