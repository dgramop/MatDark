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

  Array.prototype.forEach.call(document.getElementsByTagName('button'), function(ele){
    console.warn("<button> Tag found on page. They are out of style, and there is intentional faulty CSS added. Please change it to: <div id="+ele.getAttribute('id')+" class='button "+ele.getAttribute("class")+"' onclick="+ele.getAttribute("onclick")+" class='button'>"+ele.innerHTML+"</div>")
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

  var toaster = new Object();
  toaster.close = function()
  {
  toast.style.opacity="0";
  toast.style.visibility="none";
  setTimeout(function(){toast.remove();}, 750);
  }
  toaster.element=toast;
  toaster.element.onclick=function(){toaster.close()}
  return toaster;
}

//Unlimited buttons. modal(text, button, button, button...)
//buttons are objects
//arg.scheme="alert"|"info"|""
function modal(html)
{
  //maybe make this return an object that people can control (eg modal.close() and stuff)
  var modal = document.createElement("div");
  var clickSheild = document.createElement("div");

  modal.setAttribute('class', "modal")
  modal.onkeyup=function(event){
    console.log(event)
    if(event.keyCode==27)
    {
      clickSheild.remove()
      this.parentElement.style.display='none';
      this.parentElement.remove()
      this.remove();
    }
  }

  clickSheild.setAttribute('class', "clickSheild")
  clickSheild.onclick=function(){this.style.display='none'; modal.style.display="none"; this.remove(); clickSheild.remove();}
  clickSheild.onkeyup=function(event){
    console.log(event)
    if(event.keyCode==27)
    {
      this.style.display='none';
      this.remove()
      modal.remove()
    }
  }

  var modalText = document.createElement("div");
  modalText.setAttribute('class', "modalText")
  modalText.innerHTML=html;

  var modalButtonContainer = document.createElement("div");
  modalButtonContainer.setAttribute('class', "modalButtonContainer")

  var closeModal = document.createElement("div");
  closeModal.setAttribute('class', "closeModal")
  closeModal.onclick=function(){this.parentElement.parentElement.style.display='none'; this.parentElement.parentElement.remove(); clickSheild.remove();}
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
    button.onclick=function(){this.parentElement.parentElement.style.display='none'; this.parentElement.parentElement.remove(); clickSheild.remove(); arg.callback()}
    button.innerHTML=arg.name;
    modalButtonContainer.appendChild(button)
    })

  modal.appendChild(modalText);
  modalButtonContainer.appendChild(closeModal);
  modal.appendChild(modalButtonContainer);
  document.body.appendChild(modal);
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
