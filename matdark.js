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


//depricated!!!!!
window.confirm=function(text)
{
  console.log("Just like the old and crappy version, the modal will still hold up your thread.\n This is because I can't assume that you are using promises etc. \n We may add a promseConfirm() method using promises, same with a prompt. \n\n This is in keeping with the whole native override stuff, it needs to be super-easy to transfer through\n\n Because of the shitty underlying code, this method is already depricated, but probably won't be taken out any release soon\n");
  modal(text, {'name': 'Ok', 'callback': 'univconprom.resolve(true)'}, {'name': 'Cancel', 'callback': 'univconprom.resolve(false)'});

}

/*document.getElementsByTagName("code").forEach(function(tag){
  tag.innerHTML=tag.innerHTML.replace("'(.*)'", ".")
})*/

Array.from(document.querySelector('header > .title')).forEach(function(element){
  element.onclick=function(){window.location.href="/"}
})

Array.prototype.forEach.call(document.getElementsByClassName("tab"), function(elment){
  console.log("tick");
  elment.onclick=function()
  {
    try
    {
      console.log(this.getAttribute("href"));
      window.location.href=this.getAttribute("href")
    }
    catch (e)
    {
      //tab has nothing set, could spit out error... nah
    }
  }
})

window.onscroll=function()
{
  if(window.scrollY<=document.body.clientHeight+50)
  {
    Array.prototype.forEach.call(document.getElementsByClassName("fix"), function(elment){
      elment.style.opacity='0';
    })
  }
  else if(window.scrollY<=document.body.clientHeight+80)
  {
    Array.prototype.forEach.call(document.getElementsByClassName("fix"), function(elment){
      elment.style.opacity='1';
      elment.style.position="fixed";
    })
  }
  else
  {
    Array.prototype.forEach.call(document.getElementsByClassName("fix"), function(elment){
      elment.style.opacity='0.75';
      elment.style.position="fixed";
    })
  }
}
