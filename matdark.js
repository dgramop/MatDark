document.onload=function()
{
  document.querySelector("bubble-menu").onhover=function(){this.innerHTML="ey"};
  document.querySelector('header > .title').onclick=function(){window.location.href="/"};

  Array.prototype.forEach.call(document.getElementsByClassName("tab"), function(elment){
    elment.onclick=function()
    {
      try
      {
        console.log(this.getAttribute("href"));
        window.location.href=this.getAttribute("href")
      }
      catch (e)
      {
        console.error("Tab with content "+element.innerHTML+" has no href attribute.")
      }
    }
  })

  //have some code here that will go through <code> tags, check if their type is HTML, and then decide to use innerHTML -> createTextNode to escape chars or stop html parsing for that tag?
}

function toast(text, type)
{
  if(document.getElementsByClassName("toastContainer")[0]===undefined)
  {
    document.getElementsByClassName("dark-body")[0].innerHTML+="<div class=\"toastContainer\" onmouseover=\"this.style.opacity='0.6'\" onmouseout=\"this.style.opacity='1'\"></div>"
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
    setTimeout(function(){origobj.remove(); console.log(origobj)}, 750);
  }, 5000)//+((Math.floor(text.legnth/13))*1000))
}

//Unlimited buttons. modal(text, button, button, button...)
//buttons are objects
//arg.scheme="alert"|"info"|""
function modal(html)
{
  var clickSheild = document.createElement("div");
  clickSheild.setAttribute('class', "clickSheild")

  var modal = document.createElement("div");
  modal.setAttribute('class', "modal")

  var modalText = document.createElement("div");
  modalText.setAttribute('class', "modalText")
  modalText.innerHTML=html;

  var modalButtonContainer = document.createElement("div");
  modalButtonContainer.setAttribute('class', "modalButtonContainer")

  var closeModal = document.createElement("div");
  closeModal.setAttribute('class', "closeModal")
  closeModal.onclick=function(){this.parentElement.parentElement.parentElement.style.display='none'}
  closeModal.innerHTML="<b>Close</b>" //statically generated, but why not make it look sexy in javascript?

  var buttons=Array.prototype.slice.call(arguments, 1);
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

    var button = document.createElement("div");
    button.setAttribute('class', "modalButton "+arg.scheme);
    button.onclick=function(){this.parentElement.parentElement.parentElement.style.display='none'; arg.callback()}
    button.innerHTML=arg.name;
    modalButtonContainer.appendChild(button)
    })

  modal.appendChild(modalText);
  modalButtonContainer.appendChild(closeModal);
  modal.appendChild(modalButtonContainer);
  clickSheild.appendChild(modal);
  document.body.appendChild(clickSheild);
}

//Native functions that are overriden are still available for use.
window.nativealert=window.alert
window.nativeconfirm=window.confirm

window.alert=function(text)
{
  modal(text);
}

window.confirm=function(text)
{
  nativeconfirm(text)
  console.warn("Using confirm is not allowed within this stylesheet. Please use something else.")
}

window.onscroll=function()
{
  if(window.scrollY<=50)
  {
    Array.prototype.forEach.call(document.getElementsByClassName("fix"), function(elment){
      elment.style.opacity='1';
    })
  }
  else
  {
    Array.prototype.forEach.call(document.getElementsByClassName("fix"), function(elment){
      elment.style.opacity='0.75';
    })
  }
}
