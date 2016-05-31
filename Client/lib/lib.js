var ClientSideInfo = require('./clientSideInfo');
import React from 'react';

module.exports = {

validateEmail:function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
},

returnTimeFormat:function(date_date)
{
   return new Date(date_date).toLocaleString();
},

addEvent:function(target,eventType,callback)
{
   target.addEventListener(eventType,function(e){

      e.preventDefault();

      callback(e);

   })
},

RmitEmailCheck:function(email)
{

  // delete the return true before deploy

  return true;

   var re = ClientSideInfo.default.EMAIL_FORMAT;
   var validEmail = true;
 
   for(var prop in re)
   {

       if(!re[prop].test(email))
       {
          validEmail = false;
          break;
       }
   }

   return validEmail;
},


getUpperCase:function(word)
{
	return word.charAt(0).toUpperCase() + word.substring(1);
},
 
loggedIn:function()
{
	return localStorage.getItem('token');	
},    

SetSessionStorage:function(key,location)
{

           var refineData = JSON.parse(sessionStorage.getItem(key));
           var updateData = {};
           var offerType = refineData.offerType;
           var choosenLocation = location;
           updateData = {
            offerType:offerType,
            choosenLocation:choosenLocation == 'Vietnam' ? ClientSideInfo.default.COUNTRIES.VIETNAM : ClientSideInfo.default.COUNTRIES.AUS
           }

           sessionStorage.setItem(key,JSON.stringify(updateData));
},
 

sendDataAjax:function(buttonID,InputContainerId,eventType,url,type,postFunc,callback)
    {

    	var sendData;

        var buttonId = $("#"+buttonID);
        var buttonText = $("#"+buttonID)[0].text;
        var InputContainer = $("#"+InputContainerId);
        var loading_button = $("<span><img class='loading_icon' src='/img/loader.gif'></span>");
        var parent = buttonId.parent();
 
        buttonId.on(eventType,function(e){

          sendData = postFunc();	

          if(sendData==false)
          {
            InputContainer.addClass("has-error");

            setTimeout(function(){

              InputContainer.removeClass("has-error");

            },2000);

            return false;
          }

          e.preventDefault();
          buttonId.hide();
          parent.append(loading_button);
 
          $.ajax({

            url:url,
            type:type,
            data:sendData

          }).done(function(data){

          if(data.err)
          {
              toastr.error(data.err);
              return;
          }

            loading_button.fadeOut();
            $("#"+buttonID)[0].text = "Done!";
            buttonId.show(); 
            callback(data);

             setTimeout(function(){
 
               $("#"+buttonID)[0].text = buttonText;
 
               loading_button.remove();
               loading_button.css({"display":"inline-block"});

             },2000);
      


          });

        });

    }


}