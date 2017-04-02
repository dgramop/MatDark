document.onload=function()
{
  document.querySelector("bubble-menu").onhover=function(){this.innerHTML="ey"};
  document.querySelector('header > .title').onclick=function(){window.location.href="/"};

  Array.prototype.forEach.call(document.getElementsByClassName("tab"), function(elment){
    elment.onclick=function()
    {
      try
      {
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

function toast(html, type)
{
  var toastContainer=document.getElementsByClassName("toastContainer")[0]
  if(document.getElementsByClassName("toastContainer")[0]===undefined)
  {
    toastContainer=document.createElement('div');
    toastContainer.setAttribute('class', 'toastContainer');
    toastContainer.onmouseover=function(){this.style.opacity=0.6};
    toastContainer.onmouseout=function(){this.style.opacity=1};
    document.body.appendChild(toastContainer);
  }
  var toast=document.createElement('div');
  if(!(type===undefined))
  {
    toast.setAttribute('class', 'toast '+type);
    toast.innerHTML=html;
    toastContainer.appendChild(toast);
  }
  else
  {
    toast.setAttribute('class', 'toast');
    toast.innerHTML=html;
    toastContainer.appendChild(toast);
  }
  setTimeout(function()
  {
    toast.style.opacity="0";
    toast.style.visibility="none";
    setTimeout(function(){toast.remove();}, 750);
  }, 5000+((Math.floor(html.length/13))*1000))
}

//Unlimited buttons. modal(text, button, button, button...)
//buttons are objects
//arg.scheme="alert"|"info"|""
function modal(html)
{
  var clickSheild = document.createElement("div");
  clickSheild.setAttribute('class', "clickSheild")
  clickSheild.onclick=function(){this.style.display='none'}
  clickSheild.onkeydown=function(event){
    console.log(event)
    if(event.keyCode==27)
    {
      this.style.display='none';
      this.remove()
    }
  }

  var modal = document.createElement("div");
  modal.setAttribute('class', "modal")
  modal.onkeydown=function(event){
    console.log(event)
    if(event.keyCode==27)
    {
      this.parentElement.style.display='none';
      this.parentElement.remove()
      this.remove();
    }
  }

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
