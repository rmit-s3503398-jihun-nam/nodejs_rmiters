import lib from '../lib/lib';

function requireAuth(nextState,replaceState)
{
	if(!localStorage.getItem("token"))
	{
		window.location.href = "/signin";
		return;
	}

	/*
	*  JSON web token verification
	*  when open pages which needs for verification
	*  send current token to the server and verify it
	*/

	$.ajax({

		url:"/verify_token",
		type:"POST",
		data:{
			token:localStorage.getItem("token")
		},
		success:function(data)
		{
			if(!data)
			{
				localStorage.removeItem("token");
				window.location.href = "/signin";
				return;
			}
		}


	});
} 


export default requireAuth;