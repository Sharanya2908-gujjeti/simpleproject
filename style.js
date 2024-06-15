const dropdowns=document.querySelectorAll(".dropdown select");
fromcurrency=document.querySelector(".from select");
tocurrency=document.querySelector(".to select");
getButton=document.querySelector("form   button");
for(let i=0;i<dropdowns.length;i++){
  for(currencycode in countryList){
    let selected;
    if(i==0){
      selected=currencycode=="USD"?"selected":"";
    }
    else if(i==1){
      selected=currencycode=="INR"?"selected":"";
    }
   //creating option tag with passing currency code as a text and value
   let optionTag=`<option value="${currencycode}">${currencycode}</option>`;
   //inserting options tag inside select tag
  dropdowns[i].insertAdjacentHTML("beforeend",optionTag);
  }
  dropdowns[i].addEventListener("change" ,e=>{
    loadFlag(e.target);
  });
}
function loadFlag(element){
  for(code in countryList){
    if(code==element.value){
      let imgTag=element.parentElement.querySelector("img");
      imgTag.src=`https://flagsapi.com/${countryList[code]}/flat/64.png`
    }
  }
}
 
window.addEventListener("load",()=>{
  
getExchangeRate();
});
getButton.addEventListener("click",e=>{
  e.preventDefault();//preventing  form from submitting
getExchangeRate();
});
const exchangeIcon=document.querySelector(".dropdown .icon");
exchangeIcon.addEventListener("click",()=>{
  let tempcode=fromcurrency.value;
  fromcurrency.value=tocurrency.value;
  tocurrency.value=tempcode;
  loadFlag(fromcurrency);
  loadFlag(tocurrency);
  getExchangeRate();

});
function getExchangeRate(){
  const amount=document.querySelector(".amount input"),
  exchangeRateTxt=document.querySelector(".msg");
  let amountval1=amount.value;
  if(amountval1==""|| amountval1=="0"){
    amount.value="1";
    amountval1=1;
  }
  exchangeRateTxt.innerText="getting exchange rate...";
    let url=` https://v6.exchangerate-api.com/v6/cec0e62fa11c1007470c511d/latest/${fromcurrency.value}`;

fetch(url).then(response=>response.json()).then(result=>{
  let exchangeRate=result.conversion_rates[tocurrency.value];
 let totalExchangeRate=(amountval1*exchangeRate).toFixed(2);
/*const exchangeRateTxt=document.querySelector(".msg");*/
 exchangeRateTxt.innerText=`${amountval1} ${fromcurrency.value} =  ${totalExchangeRate} ${tocurrency.value}`
}).catch(()=>{
  exchangeRateTxt.innerText="something went wrong";
})
}