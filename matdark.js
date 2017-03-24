function toast(text, type)
{
  if(document.getElementsByClassName("toastContainer")[0]===undefined)
  {
    document.getElementsByClassName("dark-body")[0].innerHTML+="<div class=\"toastContainer\"></div>"
  }
  if(!(type===undefined))
  {
    document.getElementsByClassName("toastContainer")[0].innerHTML+="<div class=\"toast "+type+"\">"+text+"</div>"
  }
  else
  {
    document.getElementsByClassName("toastContainer")[0].innerHTML+="<div class=\"toast\">"+text+"</div>"
  }
  var origobj;
  setTimeout(function()
  {
    //change to first element
    document.getElementsByClassName("toast")[0].style.opacity="0";
    document.getElementsByClassName("toast")[0].style.visibility="none";
    origobj=document.getElementsByClassName("toast")[0];
    setTimeout(function(){origobj.remove()}, 750);
  }, 5000)//+((Math.floor(text.legnth/13))*1000))
}

//Unlimited buttons. modal(text, button, button, button...)
//buttons are objects
//arg.scheme="alert"|"info"|""
function modal(text)
{
  var buttons=Array.prototype.slice.call(arguments, 1);
  var compiledButtons="";
  buttons.forEach(function(arg)
  {
    if(arg.scheme===undefined)
    {
      arg.scheme="";
    }
    if(arg.callback===undefined)
    {
      arg.callback="";
    }
    if(arg.name===undefined)
    {
      arg.name="";
    }
    compiledButtons+="<div class=\"modalButton "+arg.scheme+"\" onclick=\"this.parentElement.parentElement.parentElement.style.display='none';"+arg.callback.replace('"', '\\\"')+"\">"+arg.name+"</div>"
  })
  document.getElementsByClassName("dark-body")[0].innerHTML+="<div class=\"clickSheild\"><div class=\"modal\"><div class=\"modalText\">"+text+"</div><div class=\"modalButtonContainer\">"+compiledButtons+"<div class=\"closeModal\" onclick=\"this.parentElement.parentElement.parentElement.style.display='none'\">Close</div></div></div></div>"
}

//Native functions that are overriden are still available for use.
window.nativealert=window.alert
window.nativeconfirm=window.confirm

window.alert=function(text)
{
  modal(text);
}
/*
//Not working
var univconprom;
window.confirm=function(text)
{
  try
  {
    univconprom=new Promise(function (value){return value;});
    univconprom.resolve(true).then(
    function (value){
      return true;
    },
    function(value)
    {
      return false;
    })
    modal(text, {'name': 'Ok', 'callback': 'univconprom.resolve(true)'}, {'name': 'Cancel', 'callback': 'univconprom.resolve(false)'});
  }
  catch (e)
  {
    console.log("promises not supported in your browser. degrading gracefully :) \nThe error")
    console.log(e)
    return nativeconfirm(text)
  }
}*/

document.getElementsByTagName("code").forEach(function(tag){
  tag.innerHTML=tag.innerHTML.replace("'(.*)'", ".")
})

document.getElementsByTagName("header").getElementsByClassName("title").forEach(function(title){
    title.onclick=function(){
      window.location.href="/"
    }
  })
})
