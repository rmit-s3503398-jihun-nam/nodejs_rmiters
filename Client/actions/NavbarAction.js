import alt from '../../config/alt';

class NavbarAction 
{
	constructor()
	{
		this.generateActions(

			'logout'

			);
	}
}

export default alt.createActions(NavbarAction);
