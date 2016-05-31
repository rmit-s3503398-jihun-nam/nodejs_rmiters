import alt from '../../config/alt';
import NavbarAction from '../actions/NavbarAction';

class NavbarStore{

	constructor()
	{
		this.bindActions(NavbarAction);
		this.loggedIn = '';
	}

	onLogout(history)
	{
		localStorage.removeItem('token');
		localStorage.removeItem('userData');
		history.pushState(null,'/');
	}

}

export default alt.createStore(NavbarStore);