(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarAction = function NavbarAction() {
	_classCallCheck(this, NavbarAction);

	this.generateActions('logout');
};

exports.default = _alt2.default.createActions(NavbarAction);

},{"../../config/alt":31}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SigninAction = (function () {
  function SigninAction() {
    _classCallCheck(this, SigninAction);

    this.generateActions('loginSuccess', 'loginFail', 'updateEmail', 'updatePassword', 'inValidEmail', 'inValidPassword');
  }

  _createClass(SigninAction, [{
    key: 'logIn',
    value: function logIn(payload) {
      var _this = this;

      $.ajax({

        url: '/signin',
        type: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }

      }).done(function (data) {

        if (data.err) {
          toastr.error(data.err);
          return;
        }

        if (data.valid === false) {
          $('.signin_button').button('reset');
          toastr.error(data.msg);
          return false;
        } else if (data.token) {
          _this.actions.loginSuccess({
            data: data,
            history: payload.history
          });
        } else {
          toastr.error("Invalid email or password");
          $('.signin_button').button('reset');
          return false;
        }
      }).fail(function (xhr) {

        _this.actions.loginFail(xhr);
      });
    }
  }]);

  return SigninAction;
})();

exports.default = _alt2.default.createActions(SigninAction);

},{"../../config/alt":31}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupAction = (function () {
  function SignupAction() {
    _classCallCheck(this, SignupAction);

    this.generateActions('signupSuccess', 'signupFail', 'updateEmail', 'updateFirstName', 'updateLastName', 'updatePassword', 'updatePassword2', 'invalidFirstname', 'invalidLastName', 'invalidEmail', 'invalidPassword', 'noMatchPassword');
  }

  _createClass(SignupAction, [{
    key: 'signUp',
    value: function signUp(f_name, l_name, email, pw, history) {
      var _this = this;

      $.ajax({

        type: 'POST',
        url: '/signup',
        data: {
          f_name: f_name,
          l_name: l_name,
          email: email,
          password: pw
        }
      }).done(function (data) {

        if (data.err) {
          toastr.error(data.err);
          return;
        }

        _this.actions.signupSuccess({
          data: data,
          history: history
        });
      }).fail(function (xhr) {
        _this.actions.signupFail(xhr.responseJSON.message);
      });
    }
  }]);

  return SignupAction;
})();

exports.default = _alt2.default.createActions(SignupAction);

},{"../../config/alt":31}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RenderForm = require('./componentLib/RenderForm');

var _RenderForm2 = _interopRequireDefault(_RenderForm);

var _EachListComponent = require('./componentLib/EachListComponent');

var _EachListComponent2 = _interopRequireDefault(_EachListComponent);

var _ScrollComponent = require('./componentLib/ScrollComponent');

var _ScrollComponent2 = _interopRequireDefault(_ScrollComponent);

var _LocationComponent = require('./componentLib/LocationComponent');

var _LocationComponent2 = _interopRequireDefault(_LocationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainAccomoListComponent = _react2.default.createClass({
	displayName: 'MainAccomoListComponent',
	getInitialState: function getInitialState() {

		/* updateListData is invoked when offerType or LocationComponent changes
  *  and update states ,reload lists based on given info  	
  */

		return {
			LIMIT_DEFAULT: 10,
			SKIP: 0,
			TOTAL_NUMBER_LISTS: 10,
			for_rent: false,
			look_for: false,
			updateListData: { offerType: [], choosenLocation: localStorage.getItem("country") != "undefined" ? localStorage.getItem("country") : [] },
			lists: []
		};
	},
	makeNewLists: function makeNewLists(data) {
		var lists = [];
		lists = data.map(function (list, index) {

			var title = list.title;
			var desc = list.description;
			var date = new Date(list.post_date);

			if (title.length > 70) {
				title = title.slice(0, 70) + "...";
			}

			if (desc.length > 155) {
				desc = desc.slice(0, 155) + "...";
			}

			return _react2.default.createElement(_EachListComponent2.default, {
				key: list._id,
				item_obj: list,
				address: list._id,
				mainImage: list.mainImage,
				action: '/accomodation',
				imageSrc: '/uploads/accomodation/thumbs/',
				price: list.price,
				desc: desc,
				title: title,
				item_location: list.item_location,
				view_count: list.view_count,
				post_date: date.toLocaleDateString("en-US") });
		});

		return lists;
	},
	reloadList: function reloadList(SKIP) {

		/*	if refineData is not undefined, use it otherwise use states
  *	this is for keeping same status when user click browser back button and come back
  */

		var updateListData = sessionStorage.getItem("AccomodationRefineData") || JSON.stringify(this.state.updateListData);

		var self = this;
		var skip = SKIP || 0;
		$.ajax({

			url: "/accomodation/getLists",
			type: "POST",
			data: {
				skip: skip,
				updateListData: updateListData
			},
			dataType: "json",
			success: function success(data) {

				if (data.err) {
					toastr.error(data.err);
					return;
				}

				var lists = self.makeNewLists(data);

				self.setState({
					lists: lists
				});
			}

		});
	},
	componentWillReceiveProps: function componentWillReceiveProps() {
		/* when click http://localhost:3000/buyandsell
  *  it doens't update states by react. 	
  *  call reloadList method in componentWillReceiveProps
  *  this will reload the latest lists
  */

		this.reloadList();
	},

	/* if browser back and come back, event listener sill stick to the window object.
 *  when it leaves a current component, remove any attached events from window
 */

	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("scroll", this.addScrollfunction);
	},
	componentDidMount: function componentDidMount() {

		var SessionUpdateListData = sessionStorage.getItem("AccomodationRefineData");
		var offerType;
		var choosenLocation;

		// if session data is available, overwrite it to state.
		// also need to change buy and sell states as well

		if (SessionUpdateListData != null) {
			SessionUpdateListData = JSON.parse(SessionUpdateListData);
			offerType = SessionUpdateListData.offerType;
			choosenLocation = SessionUpdateListData.choosenLocation;
			var obj = {};

			this.refs["LocationComponent"].updateCheckBoxState(choosenLocation);

			for (var i = 0; i < offerType.length; i++) {
				var offer = offerType[i];
				obj[offer] = true;
			}

			this.setState(obj);

			this.setState({
				updateListData: SessionUpdateListData
			});
		}

		// call first ajax call on arrival
		this.reloadList();

		//add scroll method for getting lists on scroll down
		window.addEventListener("scroll", this.addScrollfunction, false);
	},

	/* get more lists on scrol down
 *  SKIP,TOTAL_NUMBER_LISTS gets bigger as more lists comes from server	
 */

	addScrollfunction: function addScrollfunction(e) {
		var scrollDisplay = this.refs['scrollComp'];
		var TOTAL_NUMBER_LISTS = this.state.TOTAL_NUMBER_LISTS;
		var SKIP = this.state.SKIP;
		var self = this;
		e.preventDefault();
		e.stopPropagation();

		if ($(window).scrollTop() == $(document).height() - $(window).height()) {
			SKIP += self.state.LIMIT_DEFAULT;
			TOTAL_NUMBER_LISTS += self.state.LIMIT_DEFAULT;

			self.setState({
				SKIP: SKIP,
				TOTAL_NUMBER_LISTS: TOTAL_NUMBER_LISTS
			});

			scrollDisplay.showLoading();
			self.getNextLists(SKIP, scrollDisplay.hideLoading);
		}
	},
	getNextLists: function getNextLists(SKIP, callback) {

		var new_lists = [];
		var updateListData = sessionStorage.getItem("AccomodationRefineData") || JSON.stringify(this.state.updateListData);
		var self = this;
		var lists = this.state.lists;

		$.ajax({

			url: "/accomodation/getLists",
			type: "POST",
			data: {
				skip: SKIP,
				updateListData: updateListData
			},
			success: function success(data) {

				if (data.err) {
					toastr.error(data.err);
					return;
				}

				if (data.length == 0) {
					if (typeof callback == 'function') {
						callback();
					}

					return;
				}

				if (typeof callback == 'function') {
					callback();
				}

				new_lists = self.makeNewLists(data);
				lists.push(new_lists);

				self.setState({
					lists: lists
				});
			},
			fail: function fail(xhr) {
				console.log(xhr);
			}

		});
	},
	updateOfferType: function updateOfferType(e) {

		if (e.target.value == "for_rent") {
			this.setState({
				for_rent: !this.state.for_rent
			});
		} else {
			this.setState({
				look_for: !this.state.look_for
			});
		}

		if (this.state.updateListData.offerType.indexOf(e.target.value) != -1 && e.target.checked == false) {
			this.state.updateListData.offerType.splice(this.state.updateListData.offerType.indexOf(e.target.value), 1);
		} else if (this.state.updateListData.offerType.indexOf(e.target.value) == -1 && e.target.checked == true) {
			this.state.updateListData.offerType.push(e.target.value);
		}

		this.updateList({

			type: "offerType",
			data: this.state.updateListData.offerType

		});
	},
	updateList: function updateList(data) {

		if (data) {

			if (data.type == "location") {
				this.state.updateListData.choosenLocation = data.data;
			} else if (data.type == "offerType") {
				this.state.updateListData.offerType = data.data;
			}
		}

		/*	when user check any checkboxes , this method will be invoked.
  *	then set every checkbox info into sessionStorage
  *   sessionstorage can get only string type, objects or array should be
  *	stringify 
  */

		sessionStorage.setItem('AccomodationRefineData', JSON.stringify(this.state.updateListData));

		// ajax call for updating list

		this.reloadList();
	},
	addNewList: function addNewList(data) {

		/*  due to server side acync processing,
  *   thumbnail wouldn't be availalbe soon,	
  *	until the new thumbnail is availalbe,
  *   put the logic inside interval
  */

		var self = this;

		var dataAvailable = setInterval(function () {

			if (data && data.mainImage) {

				var lists = self.state.lists;
				var title = data.title;
				var desc = data.description;
				var date = new Date(data.post_date);

				if (title.length > 70) {
					title = title.slice(0, 70) + "...";
				}

				if (desc.length > 155) {
					desc = desc.slice(0, 155) + "...";
				}

				/*  tried to make a component for each list.
     *	 due to key error
     *	 failed to make it.
    */

				var list = _react2.default.createElement(_EachListComponent2.default, {
					key: data._id,
					item_obj: data,
					address: data._id,
					action: '/accomodation',
					mainImage: data.mainImage,
					imageSrc: '/uploads/accomodation/thumbs/',
					price: data.price,
					desc: desc,
					title: title,
					item_location: data.item_location,
					view_count: data.view_count,
					post_date: date.toLocaleDateString("en-US") });

				lists.unshift(list);

				self.setState({
					lists: lists
				});

				clearInterval(dataAvailable);
			}
		}, 500);
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'MainBuyListWrapper' },
			_react2.default.createElement(
				'div',
				{ className: 'col-md-3' },
				_react2.default.createElement(
					'div',
					{ className: 'refine_wrapper' },
					_react2.default.createElement(
						'h5',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Offer Type'
						)
					),
					_react2.default.createElement(
						'form',
						{ role: 'form' },
						_react2.default.createElement(
							'div',
							{ className: 'checkbox checkbox-primary' },
							_react2.default.createElement('input', { type: 'checkbox', value: 'for_rent', onChange: this.updateOfferType, checked: this.state.for_rent, name: 'for_rent', id: 'for_rent' }),
							_react2.default.createElement(
								'label',
								{ htmlFor: 'for_rent' },
								'For Rent'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'checkbox checkbox-primary' },
							_react2.default.createElement('input', { type: 'checkbox', value: 'look_for', onChange: this.updateOfferType, checked: this.state.look_for, name: 'look_for', id: 'look_for' }),
							_react2.default.createElement(
								'label',
								{ htmlFor: 'look_for' },
								'Look For Accomodation'
							)
						)
					),
					_react2.default.createElement(_LocationComponent2.default, { ref: 'LocationComponent', sessionStorageKey: 'AccomodationRefineData', updateList: this.updateList })
				),
				_react2.default.createElement(
					'button',
					{ 'data-toggle': 'modal', 'data-target': '#myModal', className: 'post_new_add btn btn-default btn-sm' },
					'Post New Ad'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-md-9 listsWrapper' },
				this.state.lists,
				' ',
				_react2.default.createElement(_ScrollComponent2.default, { ref: 'scrollComp' }),
				' '
			)
		);
	}
});

var AccomoWrapper = _react2.default.createClass({
	displayName: 'AccomoWrapper',
	getInitialState: function getInitialState() {
		var self = this;
		return {

			formField: [{
				url: "/accomodation/postnewad",
				type: "POST",
				formClass: "AccomoSavePostForm",
				validateValue: ["name", "title", "description"],
				success: function success(data) {
					if (data.err) {
						toastr.error(data.err);
						return;
					}
					self.updateAccomoList(data);
				},
				fail: function fail(data) {
					console.log(data);
				}
			}, {
				"label": "Name or Nickname",
				"id": "name",
				"type": "text"
			}, {
				"label": "Post Title",
				"id": "title",
				"type": "text"
			}, {
				"label": "Price (Optional)",
				"id": "price",
				"type": "text"
			}, {
				"label": "Location (Optional)",
				"id": "item_location",
				"type": "text"
			}, {
				"label": "email",
				"id": "email",
				"type": "hidden",
				"value": localStorage.getItem("email")
			}, {
				"label": "campus",
				"id": "campus",
				"type": "hidden",
				"value": localStorage.getItem("campus") != "undefined" ? localStorage.getItem("campus") : ""
			}, {
				"label": "description",
				"id": "description",
				"type": "textarea",
				"rows": 5
			}, {
				"label": "offerType",
				"id": "offerType",
				"text": [{
					title: "For Rent",
					name: "offerType",
					value: "for_rent",
					checked: true
				}, {
					title: "Look for Accomodation",
					name: "offerType",
					value: "look_for",
					checked: false
				}],
				"type": "radio"
			}, {
				"label": "Upload Images",
				"type": "file",
				"maxFileNumber": 5,
				"maxFileSize": "200000",
				"fileType": ["image/jpg", "image/jpeg", "image/png", "image/gif"]
			}, {
				"type": "button",
				"buttonText": "Save Post"
			}]

		};
	},
	updateAccomoList: function updateAccomoList(data) {
		this.refs['mainList'].addNewList(data);
	},
	closeModal: function closeModal() {
		$("#myModal").modal('hide');
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'col-md-12', id: 'BuyWrapper' },
			_react2.default.createElement(MainAccomoListComponent, { ref: 'mainList' }),
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'modal fade', id: 'myModal', tabIndex: -1, role: 'dialog', 'aria-labelledby': 'myModalLabel' },
					_react2.default.createElement(
						'div',
						{ className: 'modal-dialog', role: 'document' },
						_react2.default.createElement(
							'div',
							{ className: 'modal-content' },
							_react2.default.createElement(
								'div',
								{ className: 'modal-header' },
								_react2.default.createElement(
									'button',
									{ type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
									_react2.default.createElement(
										'span',
										{ 'aria-hidden': 'true' },
										'×'
									)
								),
								_react2.default.createElement(
									'h4',
									{ className: 'modal-title', id: 'myModalLabel' },
									'Post an ad'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'modal-body' },
								_react2.default.createElement(_RenderForm2.default, { callBack: 'true', handleData: this.closeModal, formData: this.state.formField })
							)
						)
					)
				)
			)
		);
	}
});

var Accomodation = _react2.default.createClass({
	displayName: 'Accomodation',
	render: function render() {
		var sideMenu = $(".sideMenu").width();
		var padding = 55;

		if (sideMenu == null || sideMenu == 230) {
			padding = 230;
		}

		return _react2.default.createElement(
			'div',
			{ id: 'wrapper' },
			_react2.default.createElement(
				'div',
				{ style: { paddingLeft: padding }, className: 'home_wrapper' },
				_react2.default.createElement(
					'div',
					{ className: 'container-fluid' },
					_react2.default.createElement(
						'div',
						{ className: 'row home_wrapper2 profile_container' },
						_react2.default.createElement(AccomoWrapper, null)
					)
				)
			)
		);
	}
});

exports.default = Accomodation;

},{"./componentLib/EachListComponent":18,"./componentLib/LocationComponent":19,"./componentLib/RenderForm":20,"./componentLib/ScrollComponent":21,"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {

    var self = this;

    if (localStorage.getItem("id")) {
      $.ajax({

        url: "/userProfile/getUser",
        type: "POST",
        dataType: "JSON",
        data: {
          id: localStorage.getItem("id")
        },
        success: function success(data) {
          localStorage.setItem("profile_image", data.profile_image);
          var profile = data.profile_image;
          self.updateProfileImage(profile);
        }

      });
    }

    return {
      loggedIn: _lib2.default.loggedIn()

    };
  },
  updateProfileImage: function updateProfileImage(profileImage) {
    this.refs["mainNavBar"].changeProfileImage(profileImage);
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_Navbar2.default, { ref: 'mainNavBar', history: this.props.history }),
      this.props.children
    );
  }
});

exports.default = App;

},{"../lib/lib":25,"./Navbar":9,"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RenderForm = require('./componentLib/RenderForm');

var _RenderForm2 = _interopRequireDefault(_RenderForm);

var _EachListComponent = require('./componentLib/EachListComponent');

var _EachListComponent2 = _interopRequireDefault(_EachListComponent);

var _ScrollComponent = require('./componentLib/ScrollComponent');

var _ScrollComponent2 = _interopRequireDefault(_ScrollComponent);

var _LocationComponent = require('./componentLib/LocationComponent');

var _LocationComponent2 = _interopRequireDefault(_LocationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainListComponent = _react2.default.createClass({
	displayName: 'MainListComponent',
	getInitialState: function getInitialState() {

		/* updateListData is invoked when offerType or LocationComponent changes
  *  and update states ,reload lists based on given info  	
  */

		return {
			LIMIT_DEFAULT: 10,
			SKIP: 0,
			TOTAL_NUMBER_LISTS: 10,
			buy: false,
			sell: false,
			updateListData: { offerType: [], choosenLocation: localStorage.getItem("country") != "undefined" ? localStorage.getItem("country") : [] },
			lists: []
		};
	},
	makeNewLists: function makeNewLists(data) {
		var lists = [];
		lists = data.map(function (list, index) {

			var title = list.title;
			var desc = list.description;
			var date = new Date(list.post_date);

			if (title.length > 70) {
				title = title.slice(0, 70) + "...";
			}

			if (desc.length > 155) {
				desc = desc.slice(0, 155) + "...";
			}

			return _react2.default.createElement(_EachListComponent2.default, {
				item_obj: list,
				key: list._id,
				address: list._id,
				action: '/buyandsell',
				imageSrc: '/uploads/buyandsell/thumbs/',
				mainImage: list.mainImage,
				price: list.price,
				desc: desc,
				title: title,
				item_location: list.item_location,
				view_count: list.view_count,
				post_date: date.toLocaleDateString("en-US") });
		});

		return lists;
	},
	reloadList: function reloadList(SKIP) {

		/*	if refineData is not undefined, use it otherwise use states
  *	this is for keeping same status when user click browser back button and come back
  */

		var updateListData = sessionStorage.getItem("BuyandSellrefineData") || JSON.stringify(this.state.updateListData);
		var self = this;
		var skip = SKIP || 0;
		$.ajax({

			url: "/buyandsell/getLists",
			type: "POST",
			data: {
				skip: skip,
				updateListData: updateListData
			},
			dataType: "json",
			success: function success(data) {

				if (data.err) {
					toastr.error(data.err);
					return;
				}

				var lists = self.makeNewLists(data);

				self.setState({
					lists: lists
				});
			}

		});
	},
	componentWillReceiveProps: function componentWillReceiveProps() {
		/* when click http://localhost:3000/buyandsell
  *  it doens't update states by react. 	
  *  call reloadList method in componentWillReceiveProps
  *  this will reload the latest lists
  */

		this.reloadList();
	},

	/* if browser back and come back, event listener sill stick to the window object.
 *  when it leaves a current component, remove any attached events from window
 */

	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("scroll", this.addScrollfunction);
	},
	componentDidMount: function componentDidMount() {

		var SessionUpdateListData = sessionStorage.getItem("BuyandSellrefineData");
		var offerType;
		var choosenLocation;

		// if session data is available, overwrite it to state.
		// also need to change buy and sell states as well

		if (SessionUpdateListData != null) {
			SessionUpdateListData = JSON.parse(SessionUpdateListData);
			offerType = SessionUpdateListData.offerType;
			choosenLocation = SessionUpdateListData.choosenLocation;
			var obj = {};

			this.refs["LocationComponent"].updateCheckBoxState(choosenLocation);

			for (var i = 0; i < offerType.length; i++) {
				var offer = offerType[i];
				obj[offer] = true;
			}

			this.setState(obj);

			this.setState({
				updateListData: SessionUpdateListData
			});
		}

		// call first ajax call on arrival
		this.reloadList();

		//add scroll method for getting lists on scroll down
		window.addEventListener("scroll", this.addScrollfunction, false);
	},

	/* get more lists on scrol down
 *  SKIP,TOTAL_NUMBER_LISTS gets bigger as more lists comes from server	
 */

	addScrollfunction: function addScrollfunction(e) {
		var scrollDisplay = this.refs['scrollComp'];
		var TOTAL_NUMBER_LISTS = this.state.TOTAL_NUMBER_LISTS;
		var SKIP = this.state.SKIP;
		var self = this;
		e.preventDefault();
		e.stopPropagation();

		if ($(window).scrollTop() == $(document).height() - $(window).height()) {
			SKIP += self.state.LIMIT_DEFAULT;
			TOTAL_NUMBER_LISTS += self.state.LIMIT_DEFAULT;

			self.setState({
				SKIP: SKIP,
				TOTAL_NUMBER_LISTS: TOTAL_NUMBER_LISTS
			});

			scrollDisplay.showLoading();
			self.getNextLists(SKIP, scrollDisplay.hideLoading);
		}
	},
	getNextLists: function getNextLists(SKIP, callback) {

		var new_lists = [];
		var updateListData = sessionStorage.getItem("BuyandSellrefineData") || JSON.stringify(this.state.updateListData);
		var self = this;
		var lists = this.state.lists;

		$.ajax({

			url: "/buyandsell/getLists",
			type: "POST",
			data: {
				skip: SKIP,
				updateListData: updateListData
			},
			success: function success(data) {

				if (data.err) {
					toastr.error(data.err);
					return;
				}

				if (data.length == 0) {
					if (typeof callback == 'function') {
						callback();
					}

					return;
				}

				if (typeof callback == 'function') {
					callback();
				}

				new_lists = self.makeNewLists(data);
				lists.push(new_lists);

				self.setState({
					lists: lists
				});
			},
			fail: function fail(xhr) {
				console.log(xhr);
			}

		});
	},
	updateOfferType: function updateOfferType(e) {

		if (e.target.value == "buy") {
			this.setState({
				buy: !this.state.buy
			});
		} else {
			this.setState({
				sell: !this.state.sell
			});
		}

		if (this.state.updateListData.offerType.indexOf(e.target.value) != -1 && e.target.checked == false) {
			this.state.updateListData.offerType.splice(this.state.updateListData.offerType.indexOf(e.target.value), 1);
		} else if (this.state.updateListData.offerType.indexOf(e.target.value) == -1 && e.target.checked == true) {
			this.state.updateListData.offerType.push(e.target.value);
		}

		this.updateList({

			type: "offerType",
			data: this.state.updateListData.offerType

		});
	},
	updateList: function updateList(data) {

		if (data) {

			if (data.type == "location") {
				this.state.updateListData.choosenLocation = data.data;
			} else if (data.type == "offerType") {
				this.state.updateListData.offerType = data.data;
			}
		}

		/*	when user check any checkboxes , this method will be invoked.
  *	then set every checkbox info into sessionStorage
  *   sessionstorage can get only string type, objects or array should be
  *	stringify 
  */

		sessionStorage.setItem('BuyandSellrefineData', JSON.stringify(this.state.updateListData));

		// ajax call for updating list

		this.reloadList();
	},
	addNewList: function addNewList(data) {
		/*  due to server side acync processing,
  *   thumbnail wouldn't be availalbe soon,	
  *	until the new thumbnail is availalbe,
  *   put the logic inside interval
  */

		var self = this;

		var dataAvailable = setInterval(function () {

			if (data && data.mainImage) {

				var lists = self.state.lists;
				var title = data.title;
				var desc = data.description;
				var date = new Date(data.post_date);

				if (title.length > 70) {
					title = title.slice(0, 70) + "...";
				}

				if (desc.length > 155) {
					desc = desc.slice(0, 155) + "...";
				}

				/*  tried to make a component for each list.
     *	 due to key error
     *	 failed to make it.
    */

				var list = _react2.default.createElement(_EachListComponent2.default, {
					key: data._id,
					item_obj: data,
					address: data._id,
					action: '/buyandsell',
					imageSrc: '/uploads/buyandsell/thumbs/',
					mainImage: data.mainImage,
					price: data.price,
					desc: desc,
					title: title,
					item_location: data.item_location,
					view_count: data.view_count,
					post_date: date.toLocaleDateString("en-US") });

				lists.unshift(list);

				self.setState({
					lists: lists
				});

				clearInterval(dataAvailable);
			}
		}, 500);
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'MainBuyListWrapper' },
			_react2.default.createElement(
				'div',
				{ className: 'col-md-3' },
				_react2.default.createElement(
					'div',
					{ className: 'refine_wrapper' },
					_react2.default.createElement(
						'h5',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Offer Type'
						)
					),
					_react2.default.createElement(
						'form',
						{ role: 'form' },
						_react2.default.createElement(
							'div',
							{ className: 'checkbox checkbox-primary' },
							_react2.default.createElement('input', { type: 'checkbox', value: 'buy', onChange: this.updateOfferType, checked: this.state.buy, name: 'buy', id: 'buy' }),
							_react2.default.createElement(
								'label',
								{ htmlFor: 'buy' },
								'Buy'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'checkbox checkbox-primary' },
							_react2.default.createElement('input', { type: 'checkbox', value: 'sell', onChange: this.updateOfferType, checked: this.state.sell, name: 'sell', id: 'sell' }),
							_react2.default.createElement(
								'label',
								{ htmlFor: 'sell' },
								'Sell'
							)
						)
					),
					_react2.default.createElement(_LocationComponent2.default, { ref: 'LocationComponent', sessionStorageKey: 'BuyandSellrefineData', updateList: this.updateList })
				),
				_react2.default.createElement(
					'button',
					{ 'data-toggle': 'modal', 'data-target': '#myModal', className: 'post_new_add btn btn-default btn-sm' },
					'Post New Ad'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-md-9 listsWrapper' },
				this.state.lists,
				' ',
				_react2.default.createElement(_ScrollComponent2.default, { ref: 'scrollComp' }),
				' '
			)
		);
	}
});

var BuyWrapper = _react2.default.createClass({
	displayName: 'BuyWrapper',
	getInitialState: function getInitialState() {
		var self = this;
		return {

			formField: [{
				url: "/buyandsell/postnewad",
				type: "POST",
				formClass: "SavePostForm",
				validateValue: ["name", "title", "description", "item_location"],
				success: function success(data) {

					if (data.err) {
						toastr.error(data.err);
						return;
					}

					self.updateBuyList(data);
				},
				fail: function fail(data) {
					console.log(data);
				}
			}, {
				"label": "Name or Nickname",
				"id": "name",
				"type": "text"
			}, {
				"label": "Post Title",
				"id": "title",
				"type": "text"
			}, {
				"label": "Price (Optional)",
				"id": "price",
				"type": "text"
			}, {
				"label": "Item Location",
				"id": "item_location",
				"type": "text"
			}, {
				"label": "email",
				"id": "email",
				"type": "hidden",
				"value": localStorage.getItem("email")
			}, {
				"label": "campus",
				"id": "campus",
				"type": "hidden",
				"value": localStorage.getItem("campus") != "undefined" ? localStorage.getItem("campus") : ""
			}, {
				"label": "description",
				"id": "description",
				"type": "textarea",
				"rows": 5
			}, {
				"label": "offerType",
				"id": "offerType",
				"text": [{
					title: "Buy",
					name: "offerType",
					value: "buy",
					checked: false
				}, {
					title: "Sell",
					name: "offerType",
					value: "sell",
					checked: true
				}],
				"type": "radio"
			}, {
				"label": "Upload Images",
				"type": "file",
				"maxFileNumber": 5,
				"maxFileSize": "200000",
				"fileType": ["image/jpg", "image/jpeg", "image/png", "image/gif"]
			}, {
				"type": "button",
				"buttonText": "Save Post"
			}]

		};
	},
	updateBuyList: function updateBuyList(data) {
		this.refs['mainList'].addNewList(data);
	},
	closeModal: function closeModal() {
		$("#myModal").modal('hide');
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'col-md-12', id: 'BuyWrapper' },
			_react2.default.createElement(MainListComponent, { ref: 'mainList' }),
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'modal fade', id: 'myModal', tabIndex: -1, role: 'dialog', 'aria-labelledby': 'myModalLabel' },
					_react2.default.createElement(
						'div',
						{ className: 'modal-dialog', role: 'document' },
						_react2.default.createElement(
							'div',
							{ className: 'modal-content' },
							_react2.default.createElement(
								'div',
								{ className: 'modal-header' },
								_react2.default.createElement(
									'button',
									{ type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
									_react2.default.createElement(
										'span',
										{ 'aria-hidden': 'true' },
										'×'
									)
								),
								_react2.default.createElement(
									'h4',
									{ className: 'modal-title', id: 'myModalLabel' },
									'Post an ad'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'modal-body' },
								_react2.default.createElement(_RenderForm2.default, { callBack: 'true', handleData: this.closeModal, formData: this.state.formField })
							)
						)
					)
				)
			)
		);
	}
});

var Buyandsell = _react2.default.createClass({
	displayName: 'Buyandsell',
	render: function render() {

		var sideMenu = $(".sideMenu").width();
		var padding = 55;

		if (sideMenu == null || sideMenu == 230) {
			padding = 230;
		}

		return _react2.default.createElement(
			'div',
			{ id: 'wrapper' },
			_react2.default.createElement(
				'div',
				{ style: { paddingLeft: padding }, className: 'home_wrapper' },
				_react2.default.createElement(
					'div',
					{ className: 'container-fluid' },
					_react2.default.createElement(
						'div',
						{ className: 'row home_wrapper2 profile_container' },
						_react2.default.createElement(BuyWrapper, null)
					)
				)
			)
		);
	}
});

exports.default = Buyandsell;

},{"./componentLib/EachListComponent":18,"./componentLib/LocationComponent":19,"./componentLib/RenderForm":20,"./componentLib/ScrollComponent":21,"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClubComponent = _react2.default.createClass({
	displayName: 'ClubComponent',
	componentWillMount: function componentWillMount() {
		$.ajax({

			url: "/clubs/test",
			type: "POST",
			data: {
				name: "rmit_tennis"
			},
			success: function success(data) {
				console.log(data);
			}

		});
	},
	render: function render() {

		return _react2.default.createElement(
			'div',
			null,
			'Hello'
		);
	}
});

exports.default = ClubComponent;

},{"../lib/lib":25,"react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = _react2.default.createClass({
  displayName: 'Home',
  getInitialState: function getInitialState() {
    return {
      loggedIn: _lib2.default.loggedIn()
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    this.state.loggedIn = _lib2.default.loggedIn();
  },
  render: function render() {

    var sideMenu = $(".sideMenu").width();
    var padding = 55;

    if (this.state.loggedIn && sideMenu == null || sideMenu == 230) {
      padding = 230;
    }

    return _react2.default.createElement(
      'div',
      { id: 'wrapper' },
      this.state.loggedIn ? _react2.default.createElement(
        'div',
        { style: { paddingLeft: padding }, className: 'home_wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row home_wrapper2' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              'de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              'de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
            )
          )
        )
      ) : _react2.default.createElement(
        'div',
        { className: 'container-fluid home_wrapper_not_logged_in' },
        _react2.default.createElement(
          'div',
          { className: 'row hidden-xs wrapper_not_logged_in' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-6 slider_contents' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                null,
                'Form your own playgound with Rmiters!'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'p',
                null,
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown ronic typesetting, remaining essentially unchanged. It was'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-md-6' },
            _react2.default.createElement(
              'div',
              { className: 'img_wrapper img-responsive' },
              _react2.default.createElement('img', { className: 'hill img-responsive', src: '/img/hill.png' }),
              _react2.default.createElement('img', { className: 'house img-responsive', src: '/img/house.png' }),
              _react2.default.createElement('img', { className: 'birds1 img-responsive', src: '/img/birds1.png' }),
              _react2.default.createElement('img', { className: 'sun img-responsive', src: '/img/sun.png' }),
              _react2.default.createElement('img', { className: 'birds2 img-responsive', src: '/img/birds2.png' })
            )
          )
        )
      )
    );
  }
});

exports.default = Home;

},{"../lib/lib":25,"react":"react"}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../lib/lib.js');

var _lib2 = _interopRequireDefault(_lib);

var _reactRouter = require('react-router');

var _NavbarAction = require('../actions/NavbarAction');

var _NavbarAction2 = _interopRequireDefault(_NavbarAction);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _SideNav = require('./SideNav');

var _SideNav2 = _interopRequireDefault(_SideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = (function (_React$Component) {
    _inherits(Navbar, _React$Component);

    function Navbar(props) {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        _this.state = _NavbarStore2.default.getState();
        return _this;
    }

    _createClass(Navbar, [{
        key: 'changeProfileImage',
        value: function changeProfileImage(profileImage) {
            this.refs["mainNavBar"].changeProfileImage(profileImage);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.state.loggedIn = _lib2.default.loggedIn();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.state.loggedIn = _lib2.default.loggedIn();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _NavbarStore2.default.listen(this.onChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _NavbarStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            _NavbarAction2.default.logout(this.props.history);
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-inverse navbar-fixed-top' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-header' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'main_menu_toggle navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' })
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: 'navbar-brand', href: '#' },
                            _react2.default.createElement('img', { src: '/img/logo.png' }),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Rmiters'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'navbar', className: 'navbar-collapse collapse' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav' },
                            _react2.default.createElement(
                                'li',
                                { className: 'active' },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/' },
                                    'Home'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/clubs' },
                                    'Home'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/buyandsell' },
                                    'Buy & Sell'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/accomodation' },
                                    'Accomodation'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav navbar-right top_menu' },
                            this.state.loggedIn ? _react2.default.createElement(
                                'button',
                                { type: 'button', onClick: this.handleSubmit.bind(this), className: 'btn btn-primary sign_out' },
                                'Sign out'
                            ) : _react2.default.createElement(
                                'div',
                                { className: 'right_menu_wrapper' },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/signin', className: 'btn btn-primary sign_up' },
                                    'Sign In'
                                ),
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/signup', className: 'btn btn-primary sign_up' },
                                    'Sign Up'
                                )
                            )
                        )
                    )
                ),
                this.state.loggedIn ? _react2.default.createElement(_SideNav2.default, { ref: 'mainNavBar', is_logged_in: this.state.loggedIn }) : undefined
            );
        }
    }]);

    return Navbar;
})(_react2.default.Component);

exports.default = Navbar;

},{"../actions/NavbarAction":1,"../lib/lib.js":25,"../stores/NavbarStore":28,"./SideNav":12,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _lib = require('../lib/lib');

var _ClientSideInfo = require('../lib/ClientSideInfo');

var _ClientSideInfo2 = _interopRequireDefault(_ClientSideInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var ChangeButton = _react2.default.createClass({
    displayName: 'ChangeButton',
    makeItDisable: function makeItDisable(e) {
        e.preventDefault();
        var targetId = this.props.targetId;
        $("#" + targetId).attr("disabled", false);
    },
    render: function render() {

        return _react2.default.createElement(
            'span',
            { className: 'majorUpdateButton', id: this.props.buttonId },
            _react2.default.createElement(
                _reactRouter.Link,
                { onClick: this.makeItDisable, to: '#' },
                'Change'
            )
        );
    }
});

var Profile = _react2.default.createClass({
    displayName: 'Profile',
    getInitialState: function getInitialState() {

        return {

            f_name: localStorage.getItem("f_name"),
            l_name: localStorage.getItem("l_name"),
            email: localStorage.getItem("email"),
            profileImageFileSize: 0,
            full_name: localStorage.getItem("full_name"),
            description: localStorage.getItem("description") != 'undefined' ? localStorage.getItem("description") : "",
            subjectKeyword: "",
            profileImage: localStorage.getItem("profile_image") == "undefined" || null ? "default_image.jpg" : localStorage.getItem("profile_image"),
            major: localStorage.getItem("major") != 'undefined' ? localStorage.getItem("major") : "",
            total_subjects: {},
            my_subjects: localStorage.getObj("my_subjects") || [],
            subjects_loaded: false,
            campus: localStorage.getItem("campus") != 'undefined' ? localStorage.getItem("campus") : "",
            interests: localStorage.getItem("interests") != 'undefined' ? localStorage.getItem("interests") : "",
            myPosts: [],
            myFavourite_articles: []

        };
    },
    changeProfilePhoto2: function changeProfilePhoto2(e) {

        e.preventDefault();
        e.stopPropagation();

        $("#imageForm #filesize")[0].value = $("#imagefileprofile")[0].files[0].size;

        var fileValue = $("#imageForm")[0].value;
        var formData = new FormData($("#imageForm")[0]);

        if (this.refs.imagefileprofile.value != "") {
            $("#profileImageButton").attr("disabled", "disabled");
        } else {
            return false;
        }

        $.ajax({
            url: "/profile/uploadProfileImage",
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function (data) {

            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === "object") {
                var err = data.err;
                $("#success_message").html('<div class="alert alert-danger"><strong>File upload fail! </strong>' + err + '</div>');
                $("#profileImageButton").attr("disabled", false);
                $("#imageForm")[0].value = "";
                $("#imageForm").trigger("reset");
                return false;
            }
            localStorage.setItem("profile_image", data);

            $(".profile_photo").attr("src", '/uploads/profile/' + data);
            $(".profile_small_photo").attr("src", '/uploads/profile/' + data);
            $(".profile_photo_edit").attr("src", '/uploads/profile/' + data);
            $("#profileImageButton").attr("disabled", false);
            $("#imageForm")[0].value = "";
            $("#imageForm").trigger("reset");
            $("#success_message").html('<div class="alert alert-success"><strong>Success!</strong> Yor profile image has been updated!</div>');
        }).fail(function (xhr) {

            console.log(xhr);
        });
    },
    componentDidMount: function componentDidMount() {
        var self = this;

        setTimeout(function () {

            self.setState({
                profileImage: localStorage.getItem("profile_image")
            });
        });

        (0, _lib.sendDataAjax)("UpdateMyDescription", "descriptionWrapper", "click", "/profile/updateDescription", "POST", function () {

            if (self.state.description == "") {
                return false;
            }

            return { _id: localStorage.getItem('id'), description: self.state.description };
        }, function (data) {

            localStorage.setItem("description", self.state.description);

            $(".description").html(self.state.description);
        });

        (0, _lib.sendDataAjax)("UpdateMyInterests", "interestsWrapper", "click", "/profile/saveMyInterests", "POST", function () {

            if (self.state.interests == "") {
                return false;
            }

            return { _id: localStorage.getItem('id'), interests: self.state.interests };
        }, function (data) {

            localStorage.setItem("interests", self.state.interests);
        });

        var major_select = $("#major_select");
        var majorUpdateButton = $("#majorUpdateID");
        var updateCampusSelect = $("#updateCampusSelect");
        var majorUpdateButton2 = $("#CampusUpdateID");
        var descriptionTextArea = $("#myDescription");

        if (this.state.major != '') {
            major_select.attr("disabled", "disabled");
        } else {
            majorUpdateButton.css({ "display": "none" });
        }

        if (this.state.campus != '') {
            updateCampusSelect.attr("disabled", "disabled");
        } else {
            majorUpdateButton2.css({ "display": "none" });
        }

        $.ajax({

            url: "/data/major.json",
            dataType: "json"

        }).done(function (data) {

            if (data.err) {
                toastr.error(data.err);
                return;
            }

            var len = data.major.length;

            for (var i = 0; i < len; i++) {
                major_select.append($('<option>', { value: data.major[i], text: data.major[i] }));
            }
        }).fail(function () {

            major_select.append($('<option>', { value: "Error", text: "can not load data" }));
        });
    },
    updateMyInterests: function updateMyInterests(e) {
        this.state.interests = validator.escape(e.target.value);
    },
    updateMajor: function updateMajor(e) {

        var self = this;
        var major_select = $("#major_select");
        var majorUpdateButton = $("#majorUpdateID");
        var major_value = e.target.value;

        $.ajax({

            url: "/profile/updateMajor",
            type: "POST",
            data: {
                major: major_value,
                _id: localStorage.getItem("id")
            }

        }).done(function (data) {

            if (data.err) {
                toastr.error(data.err);
                return;
            }

            self.setState({
                major: major_value
            });

            localStorage.setItem("major", major_value);
            self.state.total_subjects = {};
            self.state.subjects_loaded = false;
            major_select.attr("disabled", "disabled");
            majorUpdateButton.css({ "display": "block" });
        });
    },
    changeProfilePhoto: function changeProfilePhoto(e) {
        $(":file").filestyle({ buttonname: "btn-primary" });
        $("#imageForm").children()[1].value = "";
        $("#success_message").empty();
        e.preventDefault();
        e.stopPropagation();
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
        return false;
    },
    updateDescription: function updateDescription(e) {

        this.setState({

            description: validator.escape(e.target.value)

        });
    },
    descriptionUpdateToServer: function descriptionUpdateToServer(e) {
        e.preventDefault();
        var self = this;

        var data = { _id: localStorage.getItem('id'), description: this.state.description };

        $.ajax({

            url: "/profile/updateDescription",
            type: "POST",
            data: data

        }).done(function (data) {

            if (data.err) {
                toastr.error(data.err);
                return;
            }

            localStorage.setItem("description", self.state.description);
        });
    },
    updateSubject: function updateSubject(e) {

        var self = this;
        if (this.state.subjects_loaded == false && this.state.major != 'undefined' && this.state.major != "") {

            $.getJSON('/data/subjects.json', function (data) {

                $.each(data, function (key, val) {

                    var regexp = new RegExp(key, 'i');

                    if (regexp.test(self.state.major)) {
                        self.state.total_subjects[key] = val;
                    }
                });

                if (Object.keys(self.state.total_subjects).length !== 0) {
                    self.state.subjects_loaded = true;
                }
            });
        } else {
            return;
        }
    },
    updateCampus: function updateCampus(e) {

        e.preventDefault();

        if (e.target.value != "") {
            localStorage.setItem("campus", e.target.value);
            $("#updateCampusSelect").attr("disabled", "disabled");

            this.setState({

                campus: e.target.value

            });

            /* if campus value is udpated,
            *  force to change the value in refineData as well
            *  otherwise , user will keep seeing data based on old campus data in buy and sell and accomodation
            *  this will write a new campus location on sessionstorage
            */

            if (sessionStorage.getItem("BuyandSellrefineData") != null) {
                (0, _lib.SetSessionStorage)("BuyandSellrefineData", e.target.value);
            }

            if (sessionStorage.getItem("AccomodationRefineData") != null) {
                (0, _lib.SetSessionStorage)("AccomodationRefineData", e.target.value);
            }

            var data = {
                campus: e.target.value,
                _id: localStorage.getItem('id')
            };

            $.ajax({

                url: "profile/updateCampus",
                type: "POST",
                data: data

            }).done(function (data) {

                if (data.err) {
                    toastr.error(data.err);
                    return;
                }

                localStorage.setItem("country", data);
                $("#CampusUpdateID").css({ "display": "block" });
            });
        }
    },
    updateKeyword: function updateKeyword(e) {

        var self = this;
        this.state.subjectKeyword = e.target.value;
        var search_result_wrapper = $(".subjectResults");
        var matched = [];
        var keyword = new RegExp(this.state.subjectKeyword, "i");

        if (this.state.subjectKeyword.length == 0) {
            search_result_wrapper.html(" ");
            matched.length = 0;
            return;
        }

        for (var subject in this.state.total_subjects) {
            for (var i = 0; i < this.state.total_subjects[subject].length; i++) {
                if (keyword.test(this.state.total_subjects[subject][i])) {
                    if (matched.indexOf(this.state.total_subjects[subject][i]) == -1) {
                        matched.push(this.state.total_subjects[subject][i]);
                    }
                } else {
                    search_result_wrapper.html(" ");
                }
            }
        }

        var ul_element = $("<ul>");
        for (var i = 0; i < matched.length; i++) {
            var link = $("<span class='subjects_links'>" + matched[i] + "</span><button class='add_subject_button btn btn-add'>+</button><div class='clearfix'></div>");
            var li = $("<li>").append(link);
            ul_element.append(li);
        }

        search_result_wrapper.append(ul_element);

        $(".add_subject_button").click(function (e) {

            e.preventDefault();
            var subject = $(this).prev().html();

            if (self.state.my_subjects.indexOf(subject) == -1) {
                self.state.my_subjects.push(subject);
            }

            $(this).prev().fadeOut("500");
            $(this).fadeOut("500");

            var ul = $(".my_subjects_ul");

            ul.empty();

            for (var i = 0; i < self.state.my_subjects.length; i++) {
                var link = $("<span class='subjects_links'>" + self.state.my_subjects[i] + "</span><button class='delete_subect add_subject_button btn btn-add'>-</button><div class='clearfix'></div>");
                var li = $("<li>");
                li.append(link);
                ul.append(li);
            }

            $(".delete_subect").click(function (e) {

                e.preventDefault();

                var subject = $(this).prev().html();

                if (self.state.my_subjects.indexOf(subject) != -1) {
                    var location = self.state.my_subjects.indexOf(subject);
                    self.state.my_subjects.splice(location, 1);
                }

                var subjectsString = self.state.my_subjects.join();
                $(this).prev().fadeOut("500");
                $(this).fadeOut("500");

                $.ajax({

                    url: "/profile/updateSubject",
                    type: "POST",
                    data: {

                        id: localStorage.getItem("id"),
                        subjects: subjectsString
                    }

                }).done(function (data) {

                    if (data.err) {
                        toastr.error(data.err);
                        return;
                    }
                }).fail(function (xhr) {

                    localStorage.setObj("my_subjects", self.state.my_subjects);
                });
            });

            var subjectsString = self.state.my_subjects.join();

            $.ajax({

                url: "/profile/updateSubject",
                type: "POST",
                data: {

                    id: localStorage.getItem("id"),
                    subjects: subjectsString
                }

            }).done(function (data) {

                if (data.err) {
                    toastr.error(data.err);
                    return;
                }
            }).fail(function (xhr) {

                localStorage.setObj("my_subjects", self.state.my_subjects);
            });
        });
    },
    delete_subject: function delete_subject(e) {
        var self = this;
        e.preventDefault();
        var subject = $(e.target).prev().html();

        if (this.state.my_subjects.indexOf(subject) != -1) {
            var location = this.state.my_subjects.indexOf(subject);
            this.state.my_subjects.splice(location, 1);
        }
        var subjectsString = self.state.my_subjects.join();
        $(e.target).prev().fadeOut("500");
        $(e.target).fadeOut("500");

        $.ajax({

            url: "/profile/updateSubject",
            type: "POST",
            data: {

                id: localStorage.getItem("id"),
                subjects: subjectsString
            }

        }).done(function (data) {

            if (data.err) {
                toastr.error(data.err);
                return;
            }
        }).fail(function (xhr) {

            localStorage.setObj("my_subjects", self.state.my_subjects);
        });
    },
    render: function render() {
        var self = this;
        var num = 1;
        if (this.state.my_subjects != null) {
            var my_subjects = this.state.my_subjects.map(function (subject) {

                return _react2.default.createElement(
                    'li',
                    { key: num++ },
                    _react2.default.createElement(
                        'span',
                        { className: 'subjects_links' },
                        subject,
                        _react2.default.createElement(
                            'button',
                            { onClick: self.delete_subject, className: 'add_subject_button btn btn-add' },
                            '-'
                        ),
                        _react2.default.createElement('div', { className: 'clearfix' })
                    )
                );
            });
        }

        var sideMenu = $(".sideMenu").width();
        var padding = 55;

        if (sideMenu == null || sideMenu == 230) {
            padding = 230;
        }

        return _react2.default.createElement(
            'div',
            { id: 'wrapper' },
            _react2.default.createElement(
                'div',
                { style: { paddingLeft: padding }, className: 'home_wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row home_wrapper2 profile_container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-3 left_profile_wrapper' },
                            _react2.default.createElement(
                                'div',
                                { className: 'big_profile_photo_wrapper' },
                                _react2.default.createElement('img', { className: 'profile_photo', src: '/uploads/profile/' + this.state.profileImage }),
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'profile_full_name' },
                                    this.state.full_name
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'description' },
                                    this.state.description
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'profile_menu' },
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '#' },
                                            _react2.default.createElement('i', { className: 'fa fa-book' }),
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'My Posts'
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'post_title' },
                                                _react2.default.createElement(
                                                    'strong',
                                                    null,
                                                    '10'
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '#' },
                                            _react2.default.createElement('i', { className: 'fa fa-heart' }),
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'Favourite Articles'
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'article_title' },
                                                _react2.default.createElement(
                                                    'strong',
                                                    null,
                                                    '134'
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-9 right_profile_wrapper' },
                            _react2.default.createElement(
                                'div',
                                { className: 'right_profile_wrapper2' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'profile_photo_edit_wrapper' },
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { to: '#', 'data-target': '#myModal', 'data-toggle': 'modal' },
                                        _react2.default.createElement('i', { className: 'fa fa-camera' }),
                                        _react2.default.createElement('img', { className: 'profile_photo_edit', onClick: this.changeProfilePhoto, src: '/uploads/profile/' + this.state.profileImage })
                                    ),
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { 'data-target': '#myModal', 'data-toggle': 'modal', className: 'chang_profile_image', to: '#', onClick: this.changeProfilePhoto },
                                        'Change Profile Image'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'edit_profile_wrapper' },
                                    _react2.default.createElement(
                                        'form',
                                        { className: 'form-horizontal' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                                                'First Name'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10 f_name' },
                                                this.state.f_name
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                                                'Last Name'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10 l_name' },
                                                this.state.l_name
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                                                'Email'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10 userEmaildInput' },
                                                this.state.email
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputPassword', className: 'control-label col-xs-2' },
                                                'About Me'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { id: 'descriptionWrapper', className: 'col-xs-10' },
                                                _react2.default.createElement('textarea', { id: 'myDescription', ref: 'myDescription', rows: '6', defaultValue: this.state.description, onChange: this.updateDescription, className: 'form-control' }),
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'majorUpdateButton' },
                                                    _react2.default.createElement(
                                                        _reactRouter.Link,
                                                        { id: 'UpdateMyDescription', to: '#' },
                                                        'Update'
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputInterests', className: 'control-label col-xs-2' },
                                                'My Interests'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { id: 'interestsWrapper', className: 'col-xs-10' },
                                                _react2.default.createElement('input', { defaultValue: this.state.interests, onChange: this.updateMyInterests, className: 'form-control', id: 'myInterests', type: 'text', defaultValue: this.state.interests, placeholder: 'Enter your interests separated by commas' }),
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'majorUpdateButton' },
                                                    _react2.default.createElement(
                                                        _reactRouter.Link,
                                                        { id: 'UpdateMyInterests', to: '#' },
                                                        'Update'
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputPassword', className: 'control-label col-xs-2' },
                                                'Major'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10' },
                                                _react2.default.createElement(
                                                    'select',
                                                    { onChange: this.updateMajor, id: 'major_select', className: 'form-control' },
                                                    _react2.default.createElement(
                                                        'option',
                                                        { defaultValue: this.state.major },
                                                        this.state.major
                                                    )
                                                ),
                                                _react2.default.createElement(ChangeButton, { buttonId: 'majorUpdateID', targetId: 'major_select' })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputPassword', className: 'control-label col-xs-2' },
                                                'Campus'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10' },
                                                _react2.default.createElement(
                                                    'select',
                                                    { id: 'updateCampusSelect', onChange: this.updateCampus, className: 'form-control' },
                                                    _react2.default.createElement(
                                                        'option',
                                                        { defaultValue: this.state.campus },
                                                        this.state.campus
                                                    ),
                                                    _react2.default.createElement(
                                                        'option',
                                                        { value: 'Melbourne City' },
                                                        'Melbourne City'
                                                    ),
                                                    _react2.default.createElement(
                                                        'option',
                                                        { value: 'Bundoora' },
                                                        'Bundoora'
                                                    ),
                                                    _react2.default.createElement(
                                                        'option',
                                                        { value: 'Point Cook' },
                                                        'Point CooK'
                                                    ),
                                                    _react2.default.createElement(
                                                        'option',
                                                        { value: 'Vietnam' },
                                                        'Vietnam'
                                                    )
                                                ),
                                                _react2.default.createElement(ChangeButton, { buttonId: 'CampusUpdateID', targetId: 'updateCampusSelect' })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                                                'Subject Search'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10 l_name' },
                                                _react2.default.createElement('input', { type: 'text', autoComplete: 'off', onChange: this.updateKeyword, onFocus: this.updateSubject, className: 'form-control', id: 'inputEmail', placeholder: 'Subject' }),
                                                _react2.default.createElement('div', { className: 'subjectResults form-control' })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                                                'My Subjects'
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-xs-10 l_name' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'my_subjects_results form-control' },
                                                    _react2.default.createElement(
                                                        'ul',
                                                        { className: 'my_subjects_ul' },
                                                        my_subjects
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'modal fade', id: 'myModal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'modal-dialog', role: 'document' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'modal-content' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'modal-header' },
                                                    _react2.default.createElement(
                                                        'button',
                                                        { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            { 'aria-hidden': 'true' },
                                                            '×'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'h4',
                                                        { className: 'modal-title', id: 'myModalLabel' },
                                                        'Upload your profile image'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'modal-body' },
                                                    _react2.default.createElement(
                                                        'form',
                                                        { onSubmit: this.changeProfilePhoto2, className: 'form-group', id: 'imageForm', method: 'POST', encType: 'multipart/form-data' },
                                                        _react2.default.createElement('input', { ref: 'imageId', type: 'hidden', value: localStorage.getItem('id'), name: 'name' }),
                                                        _react2.default.createElement('input', { type: 'hidden', id: 'filesize', name: 'filesize' }),
                                                        _react2.default.createElement('input', { ref: 'imagefileprofile', id: 'imagefileprofile', className: 'filestyle', type: 'file', 'data-buttonname': 'btn-primary', name: 'filename' }),
                                                        _react2.default.createElement('input', { id: 'profileImageButton', className: 'btn btn-primary', type: 'submit', value: 'Upload' })
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'modal-footer' },
                                                    _react2.default.createElement('div', { id: 'success_message' }),
                                                    _react2.default.createElement(
                                                        'button',
                                                        { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                                                        'Close'
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

exports.default = Profile;

},{"../lib/ClientSideInfo":23,"../lib/lib":25,"react":"react","react-router":"react-router"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

var _lib = require('../lib/lib.js');

var _lib2 = _interopRequireDefault(_lib);

var _clientSideInfo = require('../lib/clientSideInfo');

var _clientSideInfo2 = _interopRequireDefault(_clientSideInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var ImgSlider = _react2.default.createClass({
	displayName: 'ImgSlider',
	render: function render() {
		var images;
		var self = this;

		if (this.props.imgArray && this.props.imgArray.length > 0) {
			images = this.props.imgArray.map(function (img, index) {

				return {

					original: '/uploads/' + self.props.url + '/' + img,
					thumbnail: '/uploads/' + self.props.url + '/thumbs/' + img

				};
			});
		} else {
			images = [{

				original: '/uploads/' + self.props.url + '/default.jpg',
				thumbnail: '/uploads/' + self.props.url + '/thumbs/default.jpg'

			}];
		}

		return _react2.default.createElement(
			'div',
			{ className: 'col-md-5 sliderWrapper' },
			(typeof images === 'undefined' ? 'undefined' : _typeof(images)) == "object" ? _react2.default.createElement(_reactImageGallery2.default, { showThumbnails: images.length > 1 ? "true" : "false", showNav: 'true', items: images }) : ""
		);
	}
});

var PosterDetail = _react2.default.createClass({
	displayName: 'PosterDetail',
	getInitialState: function getInitialState() {
		return {

			profileImg: "/uploads/defaults/default_image.jpg",
			f_name: ""
		};
	},
	componentWillMount: function componentWillMount() {
		var self = this;

		$.ajax({

			url: "/getEachItem",
			type: "POST",
			data: {
				method: "getOwnerDetail",
				id: this.props.id,
				model: this.props.url
			},
			success: function success(data) {
				var profileImg = self.state.profileImg;

				if (data.profileImg != undefined) {
					profileImg = "/uploads/profile/" + data.profileImg;
				}

				self.setState({

					profileImg: profileImg,
					f_name: data.f_name

				});
			}

		});
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'col-md-5 PosterDetailWrapper' },
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('img', { className: 'profileImg', src: this.state.profileImg }),
				_react2.default.createElement(
					'span',
					{ className: 'f_name' },
					this.state.f_name
				)
			),
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'button',
					{ className: 'btn btn-success btn-lg sendMsgButton' },
					_react2.default.createElement('span', { className: 'glyphicon glyphicon-envelope', 'aria-hidden': 'true' }),
					'Send Message'
				)
			)
		);
	}
});

var ItemDetail = _react2.default.createClass({
	displayName: 'ItemDetail',
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'col-md-5' },
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(ItemDescription, { description: this.props })
			)
		);
	}
});

var ItemDescription = _react2.default.createClass({
	displayName: 'ItemDescription',
	render: function render() {
		var ItemDesc = this.props.description;

		return _react2.default.createElement(
			'table',
			{ className: 'table ItemDescriptionTable' },
			_react2.default.createElement(
				'tbody',
				null,
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						null,
						ItemDesc.title
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						null,
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement(
								'strong',
								null,
								'Description: '
							)
						),
						ItemDesc.description
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						null,
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement(
								'strong',
								null,
								'Item Location: '
							)
						),
						ItemDesc.item_location
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						null,
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement(
								'strong',
								null,
								'Price: '
							)
						),
						ItemDesc.price != "" ? "$" + ItemDesc.price : "N\/A"
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						null,
						_react2.default.createElement(
							'span',
							null,
							_react2.default.createElement(
								'strong',
								null,
								'Viewed:'
							),
							' '
						),
						ItemDesc.view_count
					)
				)
			)
		);
	}
});

var CommentDefaultReplyComponent = _react2.default.createClass({
	displayName: 'CommentDefaultReplyComponent',
	replyComment: function replyComment(e) {
		e.preventDefault();
		var replyComments = "";
		var self = this;
		var replyTextareaForm = document.getElementById("replyTextarea");
		var postId = this.props.postId;
		var userId = localStorage.getItem("id");
		var userImage = localStorage.getItem("profile_image");
		var userName = localStorage.getItem("f_name");
		var textarea = $(e.target).parent().find(".replyTextWrapper");

		replyTextareaForm.addEventListener('keypress', function (e) {

			$(this).parent().removeClass("has-error");
		});

		replyComments = validator.escape(replyTextareaForm.value);

		if (replyComments == "") {
			textarea.addClass('has-error');
			return false;
		}

		$.ajax({

			url: "/replyComment",
			type: "POST",
			data: {
				userName: userName,
				userImage: userImage,
				comment: replyComments,
				userId: userId,
				_id: null,
				parentCommentID: null,
				postId: postId

			},
			success: function success(data) {
				if (data.err) {
					toastr.error(data.err);
					return;
				}

				self.props.newPostInserted(true, data, userImage, userName);
			}

		});
	},
	render: function render() {

		return _react2.default.createElement(
			'form',
			{ id: 'replyForm', className: 'animated fadeIn' },
			_react2.default.createElement(
				'div',
				{ className: 'eachCommentWrapper' },
				_react2.default.createElement('img', { className: 'img-thumbnail myprofileImage', src: '/uploads/profile/' + localStorage.getItem('profile_image') }),
				_react2.default.createElement(
					'div',
					{ className: 'form-group replyTextWrapper' },
					_react2.default.createElement('textarea', { id: 'replyTextarea', className: 'form-control', row: '8', col: '8' })
				),
				_react2.default.createElement(
					'button',
					{ onClick: this.replyComment, id: 'replySendButton', className: 'btn btn-primary btn-sm replySendButton' },
					'Comment'
				)
			)
		);
	}
});

var CommentComponent = _react2.default.createClass({
	displayName: 'CommentComponent',
	getInitialState: function getInitialState() {
		return {

			postId: this.props.postId,
			totalComments: [],
			ChunkPageLimit: 10, // this is limit for page link buttons eg) show only 10 link buttons for each page
			limit: 10,
			offset: 0
		};
	},
	componentWillMount: function componentWillMount() {
		var self = this;

		$.ajax({

			url: "/getComments",
			type: "POST",
			dataType: "json",
			data: {
				postId: this.props.postId,
				limit: this.state.limit,
				offset: this.state.offset
			}
		}).done(function (data) {

			if (data.err) {
				toastr.error(data.err);
				return;
			}

			self.setState({
				totalComments: data.comments
			});

			self.refs["ChunkPageNationComponent"].updateState(data.count);
		});
	},
	showNextComments: function showNextComments(offset) {

		var self = this;

		$.ajax({

			url: "/getComments",
			type: "POST",
			dataType: "json",
			data: {
				postId: this.props.postId,
				limit: this.state.limit,
				offset: offset
			}
		}).done(function (data) {

			if (data.err) {
				toastr.error(data.err);
				return;
			}

			/* Make sure remove root react element's children before 
   *  rendering next comments, otherwise next comments will be	
   *  appended on previous comment tree
   */

			$("#commentTreeWrapper").find("#commentTree").children().remove();

			self.setState({
				totalComments: data.comments
			});
		});
	},

	/* param:commentObj - object having comment details like Id parentID 
  *  list - this function works recusivley, if comment object need to render 
  *  its children with parent, new created wrapper(ul) needs to pass it to the function
  *  so that it wraps with parent wrapper (li)
  *  skip - if object has children , first attach comment to a wrapper  
  *  and call the function again with the object , this case don't need to attach 
  *  comment on top root
  * 
  *  commentTree will be appended with comment nodes recusively 
  *  
  */

	getTotalComments: function getTotalComments(totalComments) {

		var commentTree = _react2.default.createElement('ul', { id: 'commentTree' });

		if (totalComments.length > 0) {
			totalComments.map(function (commentObj, index) {

				getComments(commentObj, null, true);
			});
		}

		function getComments(commentObj, list, skip) {

			var comment = list || $("<li></li>");
			var userID = localStorage.getItem("id");
			var currentTime = Date.now();

			// new li element or if list is parent wrapper, use it
			// this is root element

			// create ul element for object has children objects
			var ul = $("<ul></ul>");

			// only single comment object with no children will be attached to fresh li
			// otherwise comment var holds this object's parent wrapper element

			if (skip == true) {

				var childElement;

				if (userID == commentObj.CommentUser._id) {
					if (commentObj.is_deleted) {
						childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.CommentUser.profile_image + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.CommentUser.f_name + "</span><span id='commentPostDate'> said on " + commentObj.post_date + "</span></div><p class='comment_deleted comment'>" + commentObj.comment + "</p></div></div></li>");
					} else {
						childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.CommentUser.profile_image + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.CommentUser.f_name + "</span><span id='commentPostDate'> said on " + commentObj.post_date + "</span><span id='commentId'>" + commentObj._id + "</span><span id='parentCommentID'>" + commentObj.parentCommentID + "</span><span id='userID'>" + commentObj.CommentUser._id + "</span><button id=delete_button_" + currentTime + " class='delete_button btn btn-link'>Delete</button><button id=edit_button_" + currentTime + " class='edit_button btn btn-link'>Edit</button><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>" + commentObj.comment + "</p></div></div></li>");
					}
				} else {
					if (commentObj.is_deleted) {
						childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.CommentUser.profile_image + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.CommentUser.f_name + "</span><span id='commentPostDate'> said on " + commentObj.post_date + "</span></div><p class='comment comment_deleted'>" + commentObj.comment + "</p></div></div></li>");
					} else {
						childElement = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.CommentUser.profile_image + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.CommentUser.f_name + "</span><span id='commentPostDate'> said on " + commentObj.post_date + "</span><span id='commentId'>" + commentObj._id + "</span><span id='parentCommentID'>" + commentObj.parentCommentID + "</span><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>" + commentObj.comment + "</p></div></div></li>");
					}
				}

				comment.append(childElement);
			}

			// only single comment object with no children will be attached to root
			if (list == null) $("#commentTree").append(comment);

			// if object has children
			if (commentObj.childComments.length > 0) {

				// if list is null, comment is fresh li element
				// append ul element to li for children

				if (list == null) comment.append(ul);

				for (var i = 0; i < commentObj.childComments.length; i++) {

					// new child comment element
					var childComment;
					if (userID == commentObj.childComments[i].CommentUser) {
						if (commentObj.childComments[i].is_deleted) {
							childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.childComments[i].userImage + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.childComments[i].userName + " </span><span id='commentPostDate'> said on " + commentObj.childComments[i].post_date + "</span></div><p class='comment_deleted comment'>" + commentObj.childComments[i].comment + "</p></div></div></li>");
						} else {
							childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.childComments[i].userImage + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.childComments[i].userName + " </span><span id='commentPostDate'> said on " + commentObj.childComments[i].post_date + "</span><span id='commentId'>" + commentObj.childComments[i]._id + "</span><span id='parentCommentID'>" + commentObj.childComments[i].parentCommentID + "</span><span id='userID'>" + commentObj.childComments[i].CommentUser + "</span><button id=delete_button_" + currentTime + " class='delete_button btn btn-link'>Delete</button><button id=edit_button_" + currentTime + " class='edit_button btn btn-link'>Edit</button><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>" + commentObj.childComments[i].comment + "</p></div></div></li>");
						}
					} else {
						if (commentObj.childComments[i].is_deleted) {
							childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.childComments[i].userImage + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.childComments[i].userName + " </span><span id='commentPostDate'> said on " + commentObj.childComments[i].post_date + "</span></div><p class='comment_deleted comment'>" + commentObj.childComments[i].comment + "</p></div></div></li>");
						} else {
							childComment = $("<li><div class='eachCommentWrapper clearfix'><img class='img-thumbnail' src=/uploads/profile/" + commentObj.childComments[i].userImage + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + commentObj.childComments[i].userName + " </span><span id='commentPostDate'> said on " + commentObj.childComments[i].post_date + "</span><span id='commentId'>" + commentObj.childComments[i]._id + "</span><span id='parentCommentID'>" + commentObj.childComments[i].parentCommentID + "</span><button class='reply_button btn btn-link'>Reply</button></div><p class='comment'>" + commentObj.childComments[i].comment + "</p></div></div></li>");
						}
					}

					//if no parent wrapper provided, append it to ul element
					//otherwise append to comment which holds parent wrapper element
					// note: use find() method with mixed elements eg) <li><ul></ul></li>
					//  also #id has to be unique otherwise, it renders every uls.

					if (list == null) {
						ul.append(childComment);
					} else {
						comment.find("#" + commentObj._id).append(childComment);
					}

					// if current object has also children comments
					// create a parent wrapper element and call the function with it recusively

					if (commentObj.childComments[i].childComments.length > 0) {
						var parentWrapper = $("<ul id=" + commentObj.childComments[i]._id + "></ul>");
						childComment.append(parentWrapper);
						getComments(commentObj.childComments[i], childComment, false);
					}
				}
			}
		}

		return commentTree;
	},
	showReplyForm: function showReplyForm(target, _id, parentCommentID, dynamic_element, target_id) {

		var time = Date.now();
		var self = this;
		var replyComments = "";
		var replyCancelButton = "replyCancel" + time;
		var replySendButton = "replySend" + time;
		var replyTextarea = "replyTextArea" + time;
		var replyForm = $("<form id='replyForm' class='animated fadeIn'><div class='eachCommentWrapper " + target_id + "'><img class='img-thumbnail myprofileImage' src=/uploads/profile/" + localStorage.getItem('profile_image') + "><div class='form-group replyTextWrapper'><textarea id=" + replyTextarea + " class='form-control' row='8' col='8'></textarea></div><button id=" + replySendButton + " class='btn btn-primary btn-sm replySendButton'>Reply</button><button id=" + replyCancelButton + " class='btn btn-default btn-sm'>Cancel</button></div></form>");

		if ($(target).next().length != 0) {
			if ($(target).next()[0].id == "replyForm") {
				return false;
			}
		}

		if (dynamic_element == false) {
			$(replyForm).insertAfter(target);
		} else {
			var target = target.find("#" + target_id);
			$(replyForm).insertAfter(target);
		}

		var cancelButton = document.getElementById(replyCancelButton);
		var replyButton = document.getElementById(replySendButton);
		var replyTextareaForm = document.getElementById(replyTextarea);

		replyTextareaForm.addEventListener('keypress', function (e) {

			$(this).parent().removeClass("has-error");
		});

		cancelButton.addEventListener('click', function (e) {

			e.preventDefault();

			$(this).parent().parent().remove();
		});

		replyButton.addEventListener('click', function (e) {

			e.preventDefault();

			var textarea = $(this).parent().parent().find(".replyTextWrapper");
			var replyForm = $(this).parent().parent();
			var target = replyForm.prev();

			replyComments = validator.escape(replyTextareaForm.value);

			console.log(replyComments);

			if (replyComments == "") {
				textarea.addClass('has-error');
				return false;
			}

			self.replyComment(replyComments, _id, parentCommentID, target, replyForm);
		});
	},
	replyComment: function replyComment(replyComments, _id, parentCommentID, target, replyForm) {

		var postId = this.state.postId;
		var userId = localStorage.getItem("id");
		var userImage = localStorage.getItem("profile_image");
		var userName = localStorage.getItem("f_name");
		var self = this;
		var newReplyObject = {

			userName: userName,
			userImage: userImage,
			comment: replyComments,
			userId: userId,
			_id: _id,
			parentCommentID: parentCommentID,
			postId: postId
		};

		$.ajax({

			url: "/replyComment",
			type: "POST",
			data: newReplyObject,
			success: function success(data) {
				if (data.err) {
					toastr.error(data.err);
					return;
				}

				self.updateCommentState(false, data, userImage, userName, target, replyForm);
			}

		});
	},
	updateCommentState: function updateCommentState(root, commentObj, userImage, userName, target, replyForm) {
		var comment;
		var self = this;
		var currentTime = Date.now();

		if (root == true) {
			comment = $("<li><div id=" + currentTime + " class='eachCommentWrapper clearfix animated fadeIn'><img class='img-thumbnail' src=/uploads/profile/" + userImage + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + userName + "</span><span id='commentPostDate'> said on " + commentObj.post_date + "</span><span id='commentId'>" + commentObj._id + "</span><span id='parentCommentID'>" + commentObj.parentCommentID + "</span><span id='userID'>" + commentObj.CommentUser + "</span><button id=delete_button_" + currentTime + " class='delete_button btn btn-link'>Delete</button><button id=edit_button_" + currentTime + " class='edit_button btn btn-link'>Edit</button><button id='newReplyCommentButton_" + currentTime + "' class='reply_button btn btn-link'>Reply</button></div><p class='comment'>" + commentObj.comment + "</p></div></div></li>");
			$("#commentTree").append(comment);
			$("#replyTextarea").val("");
		} else {
			if (target[0].nodeName == "DIV") {
				target = target.parent();
			}

			comment = $("<ul><li><div id=" + currentTime + " class='eachCommentWrapper clearfix animated fadeIn'><img class='img-thumbnail' src=/uploads/profile/" + userImage + "><div class='commentContents'><div class='commentContentsUp'><span id='commentUsername'>" + userName + "</span><span id='commentPostDate'> said on " + commentObj.post_date + "</span><span id='commentId'>" + commentObj._id + "</span><span id='parentCommentID'>" + commentObj.parentCommentID + "</span><span id='userID'>" + commentObj.CommentUser + "</span><button id=delete_button_" + currentTime + " class='delete_button btn btn-link'>Delete</button><button id=edit_button_" + currentTime + " class='edit_button btn btn-link'>Edit</button><button id='newReplyCommentButton_" + currentTime + "' class='reply_button btn btn-link'>Reply</button></div><p class='comment'>" + commentObj.comment + "</p></div></div></li></ul>");
			target.append(comment);
			replyForm.remove();
		}

		document.getElementById("edit_button_" + currentTime).addEventListener("click", function (e) {

			var commentParent = $(e.target).parent().parent().parent();
			var commentId = commentParent.find("#commentId").html();
			var postId = self.props.postId;
			var rootCommentId = commentParent.find("#parentCommentID").html();
			var oldComment = commentParent.find(".comment").html();

			$(e.target).hide();

			self.updateCommentHolder(oldComment, commentId, postId, rootCommentId, commentParent, e.target);
		});

		_lib2.default.addEvent(document.getElementById("delete_button_" + currentTime), "click", function (e) {

			var commentParent = $(e.target).parent().parent().parent();
			var commentId = commentObj._id;
			var postId = commentObj.postId;
			var rootCommentId = commentObj.parentCommentID;

			self.updateCommentHtml(commentParent, _clientSideInfo2.default.COMMENT_DEFAULT_MESSAGE.DELETE);
			self.updateComment(commentId, postId, rootCommentId);
		});

		document.getElementById("newReplyCommentButton_" + currentTime).addEventListener("click", function (e) {

			e.preventDefault();

			var _id = $(e.target).parent().parent().parent().find("#commentId").html();

			self.showReplyForm(comment, _id, commentObj.parentCommentID, true, currentTime);
		});
	},
	updateCommentHtml: function updateCommentHtml(targetComment, comment) {
		targetComment.find(".comment").html($("<p class='comment_deleted'>" + comment + "</p>"));
		targetComment.find(".delete_button").remove();
		targetComment.find(".edit_button").remove();
		targetComment.find(".reply_button").remove();
	},
	updateComment: function updateComment(commentId, postId, rootCommentId, comment) {
		var Comment = comment || null;

		$.ajax({

			url: "/update_comment",
			type: "POST",
			data: {
				commentId: commentId,
				postId: postId,
				rootCommentId: rootCommentId,
				comment: Comment
			},
			success: function success(data) {
				if (data.error) {
					toastr.error(data.error);
				}
			}

		});
	},
	updateCommentHolder: function updateCommentHolder(oldComment, commentId, postId, rootCommentId, commentParent, edit_button) {
		var current = Date.now();
		var unique_id = current + "_" + commentId;
		var textarea = $("<textarea id=" + unique_id + " class='form-control'></textarea>");
		var new_edit_button = $("<button style='float:right' class='btn btn-link' id=new_edit_button" + current + ">Edit</button>");
		var self = this;
		new_edit_button.insertAfter(commentParent.find(".delete_button"));
		textarea.val(oldComment);
		var textareaHolder = commentParent.find(".comment");
		var replyButton = commentParent.find(".reply_button");
		var deleteButton = commentParent.find(".delete_button");

		textareaHolder.html(textarea);
		replyButton.hide();
		deleteButton.hide();

		document.getElementById("new_edit_button" + current).addEventListener("click", function (e) {

			var newComment = document.getElementById(unique_id).value;

			self.updateComment(commentId, postId, rootCommentId, newComment);

			textareaHolder.html(newComment);
			new_edit_button.hide();
			$(edit_button).show();
			replyButton.show();
			deleteButton.show();
		});
	},
	render: function render() {

		var totalComments = this.state.totalComments;
		var commentTree = this.getTotalComments(totalComments);
		var reply_buttons = document.getElementsByClassName("reply_button");
		var delete_buttons = document.getElementsByClassName("delete_button");
		var edit_buttons = document.getElementsByClassName("edit_button");
		var self = this;

		// following three buttons are for users who wrote comments
		// three of buttons attach events

		for (var i = 0; i < delete_buttons.length; i++) {
			(function (i) {

				delete_buttons[i].addEventListener("click", function (e) {

					var commentParent = $(e.target).parent().parent().parent();
					var commentId = commentParent.find("#commentId").html();
					var postId = self.props.postId;
					var rootCommentId = commentParent.find("#parentCommentID").html();

					self.updateCommentHtml(commentParent, _clientSideInfo2.default.COMMENT_DEFAULT_MESSAGE.DELETE);
					self.updateComment(commentId, postId, rootCommentId);
				});
			})(i);
		}

		for (var i = 0; i < edit_buttons.length; i++) {
			(function (i) {

				edit_buttons[i].addEventListener("click", function (e) {

					var commentParent = $(e.target).parent().parent().parent();
					var commentId = commentParent.find("#commentId").html();
					var postId = self.props.postId;
					var rootCommentId = commentParent.find("#parentCommentID").html();
					var oldComment = commentParent.find(".comment").html();

					$(this).hide();

					self.updateCommentHolder(oldComment, commentId, postId, rootCommentId, commentParent, this);
				});
			})(i);
		}

		for (var i = 0; i < reply_buttons.length; i++) {
			(function (i) {

				reply_buttons[i].addEventListener("click", function (e) {

					e.preventDefault();

					var _id = $(e.target).parent().find("#commentId").html();
					var parentCommentID = $(e.target).parent().find("#parentCommentID").html();

					self.showReplyForm($(e.target).parent().parent().parent(), _id, parentCommentID, false);
				});
			})(i);
		}

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'div',
				{ id: 'commentTreeWrapper' },
				commentTree
			),
			_react2.default.createElement(CommentDefaultReplyComponent, { newPostInserted: this.updateCommentState, postId: this.state.postId }),
			_react2.default.createElement(ChunkPageNationComponent, { showNextComments: this.showNextComments, ref: 'ChunkPageNationComponent', eachPageLimit: this.state.limit, ChunkPageLimit: this.state.ChunkPageLimit, totalNumberOfObjects: this.state.totalComments.length })
		);
	}
});

var ChunkPageNationComponent = _react2.default.createClass({
	displayName: 'ChunkPageNationComponent',

	/* 
 *  totalPageOffset - this indicates next chunkpages eg)0 = 0~10, 1 = 11-20 
 *  isRenderArrow - eachpagelimit is smaller than totalPageNumbers 
 *  which means we need to show arrows to show next chunkpages 	
 *
 */

	getInitialState: function getInitialState() {

		var eachPageLimit = Number(this.props.eachPageLimit);
		var totalNumberOfObjects = Number(this.props.totalNumberOfObjects);
		var ChunkPageLimit = Number(this.props.ChunkPageLimit);
		var totalPageNumbers = Math.ceil(totalNumberOfObjects / eachPageLimit);
		var totalPageOffset = totalPageNumbers - ChunkPageLimit * 0; // 0 is ChunkPageOffset
		var isRenderArrow = eachPageLimit < totalPageNumbers ? true : false;

		/*
  *  When Chunk page arrows are clicked, followings needs to be updated 
  *  1. ChunkPageOffset: updating 0-1-2-3 one by one 
  *  2. eachPageOffset: updateing 0-10-20-30 
  *  3. totalPageOffset by this fomula: totalPageNumbers-(ChunkPageLimit*ChunkPageOffset)
    *  Also need to update eachPageOffset: eachPageOffset * limit(10)0 - 10 -20 -30
  */

		return {

			totalNumberOfObjects: totalNumberOfObjects,
			ChunkPageLimit: ChunkPageLimit,
			eachPageLimit: eachPageLimit,
			ChunkPageOffset: 0,
			eachPageOffset: 0,
			totalPageNumbers: 0,
			totalPageOffset: totalPageOffset,
			isRenderArrow: isRenderArrow
		};
	},
	updateState: function updateState(length) {
		if (length > 0) {
			var totalPageNumbers = Math.ceil(length / this.state.eachPageLimit);
			this.setState({

				totalNumberOfObjects: length,
				totalPageNumbers: totalPageNumbers,
				totalPageOffset: totalPageNumbers

			});
		}
	},
	leftArrowClicked: function leftArrowClicked(e) {
		e.preventDefault();

		var ChunkPageOffset = this.state.ChunkPageOffset;
		var eachPageOffset = this.state.eachPageOffset;
		var totalPageOffset = this.state.totalPageOffset;

		ChunkPageOffset--;
		eachPageOffset = eachPageOffset - this.state.ChunkPageLimit;
		totalPageOffset = this.state.totalPageNumbers + this.state.ChunkPageLimit * this.state.ChunkPageOffset;

		this.setState({

			ChunkPageOffset: ChunkPageOffset,
			eachPageOffset: eachPageOffset,
			totalPageOffset: totalPageOffset

		});
	},
	rightArrowClicked: function rightArrowClicked(e) {
		e.preventDefault();

		var ChunkPageOffset = this.state.ChunkPageOffset;
		var eachPageOffset = this.state.eachPageOffset;
		var totalPageOffset = this.state.totalPageOffset;

		ChunkPageOffset++;
		eachPageOffset = eachPageOffset + this.state.ChunkPageLimit;
		totalPageOffset = this.state.totalPageNumbers - this.state.ChunkPageLimit * ChunkPageOffset;

		this.setState({

			ChunkPageOffset: ChunkPageOffset,
			eachPageOffset: eachPageOffset,
			totalPageOffset: totalPageOffset

		});
	},
	showNextComments: function showNextComments(offset) {
		this.props.showNextComments(offset);
	},
	render: function render() {

		var leftArrow = $("#CommentLeftArrow");
		var rightArrow = $("#CommentRightArrow");

		if (this.state.totalPageNumbers > this.state.ChunkPageOffset * this.state.ChunkPageLimit + this.state.ChunkPageLimit) {
			rightArrow.css("display", "block");
		} else {
			rightArrow.css("display", "none");
		}

		if (this.state.ChunkPageOffset > 0) {
			leftArrow.css("display", "block");
		} else {
			leftArrow.css("display", "none");
		}

		/* react can render array type with components like below
  *	pageNation has each EachPageNationLinkComponent 
  *  EachPageNationLinkComponent renders <li>element
  */

		var pageNation = [];

		if (this.state.totalNumberOfObjects > this.state.eachPageLimit) {

			for (var i = 1; i < this.state.totalPageOffset + 1; i++) {
				var j = i - 1;

				var pageNumber = this.state.ChunkPageOffset * this.state.ChunkPageLimit + i;
				var eachPageOffset = j * this.state.eachPageLimit + this.state.eachPageLimit * this.state.eachPageOffset;

				var eachPageNation = _react2.default.createElement(EachPageNationLinkComponent, { showNextComments: this.showNextComments, key: i, offset: eachPageOffset, pageNumber: pageNumber });

				pageNation.push(eachPageNation);

				if (i == this.state.ChunkPageLimit) {
					break;
				}
			}
		};

		return _react2.default.createElement(
			'div',
			{ className: 'pagenationWrapper clearfix' },
			_react2.default.createElement(
				'div',
				{ className: 'pageNationLeftWrapper' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ onClick: this.leftArrowClicked, id: 'CommentLeftArrow', to: '#' },
					_react2.default.createElement('i', { className: 'fa fa-chevron-left' })
				)
			),
			_react2.default.createElement(
				'ul',
				{ className: 'pagination' },
				pageNation
			),
			_react2.default.createElement(
				'div',
				{ className: 'pageNationRightWrapper' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ onClick: this.rightArrowClicked, id: 'CommentRightArrow', to: '#' },
					_react2.default.createElement('i', { className: 'fa fa-chevron-right' })
				)
			)
		);
	}
});

var EachPageNationLinkComponent = _react2.default.createClass({
	displayName: 'EachPageNationLinkComponent',
	showNextComments: function showNextComments(e) {
		e.preventDefault();

		this.props.showNextComments(this.props.offset);
	},
	render: function render() {
		return _react2.default.createElement(
			'li',
			{ key: this.props.key },
			_react2.default.createElement(
				_reactRouter.Link,
				{ to: '#', onClick: this.showNextComments },
				this.props.pageNumber
			)
		);
	}
});

var CommentWrapper = _react2.default.createClass({
	displayName: 'CommentWrapper',
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'col-md-10 commentWrapper center-block' },
			_react2.default.createElement(CommentComponent, { postId: this.props.postId })
		);
	}
});

var ItemWrapper = _react2.default.createClass({
	displayName: 'ItemWrapper',
	getInitialState: function getInitialState() {
		return {

			item_obj: {},
			id: this.props.id

		};
	},
	componentWillMount: function componentWillMount() {
		var item_obj = "";
		var count = 0;

		if (sessionStorage.getItem('item_obj')) {
			item_obj = JSON.parse(sessionStorage.getItem('item_obj'));
		}

		/*  if item_obj's id from sessionStorage is different from state.id
  *  	means user enter the id number straight instead of clicking item on the list
  *	in this case, call ajax to get the item again and update state
  */

		if (item_obj != "" && this.state.id != item_obj._id || item_obj == "") {
			var self = this;

			$.ajax({

				url: "/getEachItem",
				type: "POST",
				data: {
					method: "getItem",
					id: this.state.id,
					model: this.props.url
				},
				success: function success(data) {

					if (data.err) {
						toastr.error(data.err);
						return;
					}

					self.setState({
						item_obj: data
					});
				}

			});
		} else {
			this.setState({
				item_obj: item_obj
			});
		}

		/* update each page view count
  */

		$.ajax({
			url: "/getEachItem",
			type: "POST",
			data: {
				method: "updateViewCount",
				id: this.state.id,
				model: this.props.url
			},
			success: function success(data) {
				// update view count html
				if (data.err) {
					toastr.error(data.err);
					return;
				}
			}
		});
	},
	render: function render() {

		return _react2.default.createElement(
			'div',
			{ className: 'ItemWrapper' },
			_react2.default.createElement(
				'div',
				{ className: 'row itemAndPosterDetailWrapper' },
				_react2.default.createElement(
					'div',
					{ className: 'col-md-10 center-block' },
					_react2.default.createElement(ImgSlider, { url: this.props.url, imgArray: this.state.item_obj.image }),
					_react2.default.createElement(PosterDetail, { url: this.props.url, id: this.props.id }),
					_react2.default.createElement(ItemDetail, {
						title: this.state.item_obj.title,
						description: this.state.item_obj.description,
						item_location: this.state.item_obj.item_location,
						post_date: this.state.item_obj.post_date,
						price: this.state.item_obj.price,
						campus: this.state.item_obj.campus,
						view_count: this.state.item_obj.view_count })
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(CommentWrapper, { postId: this.state.id })
			)
		);
	}
});

var RenderItemWrapper = _react2.default.createClass({
	displayName: 'RenderItemWrapper',
	getInitialState: function getInitialState() {

		return {
			url: window.location.pathname.split('/')[1],
			id: this.props.params.id
		};
	},
	render: function render() {
		var sideMenu = $(".sideMenu").width();
		var padding = 55;

		if (sideMenu == null || sideMenu == 230) {
			padding = 230;
		}

		return _react2.default.createElement(
			'div',
			{ id: 'wrapper' },
			_react2.default.createElement(
				'div',
				{ style: { paddingLeft: padding }, className: 'home_wrapper' },
				_react2.default.createElement(
					'div',
					{ className: 'container-fluid' },
					_react2.default.createElement(
						'div',
						{ className: 'row home_wrapper2 profile_container' },
						_react2.default.createElement(ItemWrapper, { url: this.state.url, id: this.state.id })
					)
				)
			)
		);
	}
});

exports.default = RenderItemWrapper;

},{"../lib/clientSideInfo":24,"../lib/lib.js":25,"react":"react","react-image-gallery":51,"react-router":"react-router"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sideNav = _react2.default.createClass({
  displayName: 'sideNav',
  getInitialState: function getInitialState() {
    return {
      profileImage: localStorage.getItem("profile_image") == "undefined" || null ? "default_image.jpg" : localStorage.getItem("profile_image")
    };
  },
  changeProfileImage: function changeProfileImage(profileImage) {

    this.setState({
      profileImage: profileImage
    });
  },
  componentDidMount: function componentDidMount() {
    var menu = $(".control_board ul li a");

    var url = window.location.href;

    for (var i = 0; i < menu.length; i++) {
      if (url.indexOf(menu[i].text.toLowerCase()) != -1) {
        $(menu[i]).children().css({ "color": "#ffffff" });
        $(menu[i]).css({

          "color": "#ffffff",
          "paddingLeft": "17px",
          "background-color": "#1c2529",
          "textDecoration": "none",
          "borderLeft": "3px solid #4f80c3"

        });
      }

      menu[i].addEventListener('click', function (e) {

        var clicked = $(this)[0].text;

        for (var j = 0; j < menu.length; j++) {
          if (menu[j].href.indexOf(clicked.toLowerCase()) == -1) {
            $(menu[j]).children().css({ "color": "" });
            $(menu[j]).css({

              "color": "",
              "paddingLeft": "",
              "background-color": "",
              "textDecoration": "",
              "borderLeft": ""

            });
          }
        }

        $(this).children().css({ "color": "#ffffff" });

        $(this).css({

          "color": "#ffffff",
          "paddingLeft": "17px",
          "background-color": "#1c2529",
          "textDecoration": "none",
          "borderLeft": "3px solid #4f80c3"

        });
      });
    }
  },
  toggleSideBar: function toggleSideBar() {

    var sidebar = $(".sideMenu");
    var Homewrapper = $(".home_wrapper");
    var profile_photo_wrapper = $(".profile_photo_wrapper");
    var profile_photo = profile_photo_wrapper.find("img");
    var h5 = profile_photo_wrapper.find("h5");
    var left_value = sidebar.width();
    var toggled = left_value == 230 ? true : false;
    var control_board = $(".control_board ul");
    var links = $(".control_board a");
    var spans = $(".control_board a span");
    var main_menu_toggle = $('.main_menu_toggle');

    if (toggled == true) {
      profile_photo.hide();
      h5.hide();
      spans.hide();
      links.width(35);

      Homewrapper.animate({

        paddingLeft: "-=175"

      }, 300);

      sidebar.animate({

        width: "-=175"

      }, 300);

      control_board.width(55);
    } else {

      Homewrapper.animate({

        paddingLeft: "+=175"

      }, 300);

      sidebar.animate({

        width: "+=175"

      }, 300, function () {

        profile_photo.show();
        h5.show();
        links.width(210);
        spans.show();
      });

      control_board.width(230);
    }

    return;
  },
  render: function render() {
    var full_name = localStorage.getItem('full_name');

    return _react2.default.createElement(
      'div',
      { className: 'sideMenu' },
      _react2.default.createElement(
        'div',
        { className: 'profile_photo_wrapper' },
        _react2.default.createElement('img', { className: 'profile_small_photo circular', src: '/uploads/profile/' + this.state.profileImage }),
        _react2.default.createElement(
          'h5',
          null,
          full_name
        ),
        this.props.is_logged_in ? _react2.default.createElement(
          'button',
          { onClick: this.toggleSideBar, type: 'button', style: { display: 'block', padding: 0, marginTop: 17 }, className: 'sidebar_toggle_button navbar-toggle collapsed' },
          _react2.default.createElement(
            'span',
            { className: 'sr-only' },
            'Toggle navigation'
          ),
          _react2.default.createElement('span', { className: 'icon-bar' }),
          _react2.default.createElement('span', { className: 'icon-bar' }),
          _react2.default.createElement('span', { className: 'icon-bar' })
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { className: 'control_board' },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/profile' },
              _react2.default.createElement('i', { className: 'fa fa-user' }),
              _react2.default.createElement(
                'span',
                null,
                'Profile'
              )
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/inbox' },
              _react2.default.createElement('i', { className: 'fa fa-envelope' }),
              'Inbox'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/friends' },
              _react2.default.createElement('i', { className: 'fa fa-users' }),
              'Friends'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/articles' },
              _react2.default.createElement('i', { className: 'fa fa-book' }),
              'Articles'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/settings' },
              _react2.default.createElement('i', { className: 'fa fa-cogs' }),
              'Settings'
            )
          )
        )
      )
    );
  }
});

exports.default = sideNav;

},{"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SigninAction = require('../actions/SigninAction');

var _SigninAction2 = _interopRequireDefault(_SigninAction);

var _SigninStore = require('../stores/SigninStore');

var _SigninStore2 = _interopRequireDefault(_SigninStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signin = (function (_React$Component) {
  _inherits(Signin, _React$Component);

  function Signin(props) {
    _classCallCheck(this, Signin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signin).call(this, props));

    _this.state = _SigninStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Signin, [{
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = window.location.href;

      if (url.indexOf("verified=true") != -1) // verification
        {
          toastr.success('You successfully verified your email. Sign in now.');
        }

      this.setState(function (preState, props) {
        return {
          emailValidateState: '',
          passwordValidateState: ''
        };
      });

      _SigninStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _SigninStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var email = this.refs.login_email.value;
      var password = this.refs.login_pw.value;

      if (!email) {
        _SigninAction2.default.inValidEmail();
      }

      if (!password) {
        _SigninAction2.default.inValidPassword();
      }

      if (email && password) {
        $('.signin_button').button('loading');

        _SigninAction2.default.logIn({
          email: email,
          password: password,
          history: this.props.history
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { key: this.state.timestamp, id: 'signin', className: 'container-full signup' },
        _react2.default.createElement('div', { className: 'overlay' }),
        _react2.default.createElement(
          'div',
          { ref: 'form_wrapper', className: 'center-block registration_form_container fadeInUp animated' },
          _react2.default.createElement(
            'form',
            { role: 'form', id: 'registerForm', onSubmit: this.handleSubmit.bind(this), className: 'form-horizontal registration_form', noValidate: true },
            _react2.default.createElement(
              'h2',
              { className: 'create_account_header' },
              'Sign In'
            ),
            _react2.default.createElement(
              'div',
              { className: "form-group " + this.state.emailValidateState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-envelope-o fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'login_email', type: 'email', onChange: _SigninAction2.default.updateEmail, className: 'form-control', id: 'inputEmail', placeholder: 'Email' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: "form-group " + this.state.passwordValidateState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-key fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'login_pw', id: 'inputPassword', onChange: _SigninAction2.default.updatePassword, className: 'form-control', type: 'password', placeholder: 'Password' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { id: 'load', 'data-loading-text': '<i class=\'fa fa-circle-o-notch fa-spin\'></i> Signing In', type: 'submit', className: 'signin_button btn btn-primary' },
                'Submit'
              )
            )
          )
        ),
        _react2.default.createElement('img', { src: '/img/cloud-background.jpg' })
      );
    }
  }]);

  return Signin;
})(_react2.default.Component);

exports.default = Signin;

},{"../actions/SigninAction":2,"../stores/SigninStore":29,"react":"react"}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SignupAction = require('../actions/SignupAction');

var _SignupAction2 = _interopRequireDefault(_SignupAction);

var _SignupStore = require('../stores/SignupStore');

var _SignupStore2 = _interopRequireDefault(_SignupStore);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = (function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup).call(this, props));

    _this.state = _SignupStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Signup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = window.location.href;

      if (url.indexOf("verified=false") != -1) // verification
        {
          toastr.error('You haven\'t created your account.Please create your account first!');
        }

      this.setState(function (prevState, CurrentProps) {

        return {

          f_nameValidationState: '',
          l_nameValidationState: '',
          emailValidationState: '',
          passwordValidationState: ''

        };
      });

      _SignupStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _SignupStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var f_name = this.refs.signup_f_name.value;
      var l_name = this.refs.signup_l_name.value;
      var email = this.refs.email.value;
      var pw = this.refs.pw.value;
      var pw2 = this.refs.pw2.value;

      if (!f_name) {
        _SignupAction2.default.invalidFirstname();
      }

      if (!l_name) {
        _SignupAction2.default.invalidLastName();
      }

      if (!pw) {
        _SignupAction2.default.invalidPassword();
      }

      if (!email || !_lib2.default.RmitEmailCheck(email)) {
        _SignupAction2.default.invalidEmail();
        return;
      }

      if (pw2 != pw) {
        _SignupAction2.default.noMatchPassword();
        return;
      }

      if (f_name != "" && l_name != "" && email != "" && pw != "" && pw2 != "") {
        $('.register_button').button('loading');
        _SignupAction2.default.signUp(f_name, l_name, email, pw, this.props.history);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'container-full signup' },
        _react2.default.createElement('div', { className: 'overlay' }),
        _react2.default.createElement(
          'div',
          { className: 'center-block registration_form_container fadeInUp animated' },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit.bind(this), id: 'registerForm', className: 'account_form form-horizontal registration_form', action: true, method: 'POST', noValidate: true },
            _react2.default.createElement(
              'h2',
              { className: 'create_account_header' },
              'Create your account'
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.f_nameValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-info' })
                ),
                _react2.default.createElement('input', { value: this.state.f_name, ref: 'signup_f_name', type: 'text', onChange: _SignupAction2.default.updateFirstName, className: 'form-control', id: 'firstName', placeholder: 'First Name' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.l_nameValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-info' })
                ),
                _react2.default.createElement('input', { value: this.state.l_name, ref: 'signup_l_name', type: 'text', onChange: _SignupAction2.default.updateLastName, className: 'form-control', id: 'lastName', placeholder: 'Last Name' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.emailValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-envelope-o fa-fw' })
                ),
                _react2.default.createElement('input', { value: this.state.email, ref: 'email', type: 'email', onChange: _SignupAction2.default.updateEmail, className: 'form-control', id: 'inputEmail', placeholder: 'Email' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.passwordValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-key fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'pw', id: 'inputPassword', onChange: _SignupAction2.default.updatePassword, className: 'form-control', type: 'password', placeholder: 'Password' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              ),
              _react2.default.createElement('div', { className: 'clearfix' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.Password2ValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-key fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'pw2', type: 'password', onChange: _SignupAction2.default.updatePassword2, className: 'form-control', id: 'inputPasswordConfirm', placeholder: 'Password Confirm' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { id: 'load', 'data-loading-text': '<i class=\'fa fa-circle-o-notch fa-spin\'></i> Creating your account', type: 'submit', className: 'register_button btn btn-primary' },
                'Submit'
              )
            )
          )
        ),
        _react2.default.createElement('img', { src: '/img/cloud-background.jpg' })
      );
    }
  }]);

  return Signup;
})(_react2.default.Component);

exports.default = Signup;

},{"../actions/SignupAction":3,"../lib/lib":25,"../stores/SignupStore":30,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserProfile = _react2.default.createClass({
  displayName: 'UserProfile',
  getInitialState: function getInitialState() {
    return {

      user: {}

    };
  },

  //test id 568b621816fdbef41364c0af
  componentDidMount: function componentDidMount() {
    $.ajax({

      url: '/userProfile/getUser',
      type: "POST",
      data: this.props.params
    }).done(function (data) {

      if (data.err) {
        toastr.error(data.err);
        return;
      }

      console.log(data);
    }).fail(function (xhr) {

      console.log(xhr);
    });
  },
  render: function render() {

    var sideMenu = $(".sideMenu").width();
    var padding = 55;

    if (sideMenu == null || sideMenu == 230) {
      padding = 230;
    }

    return _react2.default.createElement(
      'div',
      { id: 'wrapper' },
      _react2.default.createElement(
        'div',
        { style: { paddingLeft: padding }, className: 'home_wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row home_wrapper2 profile_container' },
            'hello'
          )
        )
      )
    );
  }
});

exports.default = UserProfile;

},{"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Verify = (function (_React$Component) {
	_inherits(Verify, _React$Component);

	function Verify(props) {
		_classCallCheck(this, Verify);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Verify).call(this, props));
	}

	_createClass(Verify, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			$("#email").html(sessionStorage.getItem("email"));
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "container" },
				_react2.default.createElement(
					"div",
					{ className: "row mail_sent_wrapper center-block flipInX animated" },
					_react2.default.createElement(
						"div",
						{ className: "col-md-6 center-block" },
						_react2.default.createElement(
							"h4",
							null,
							"Please verify your email address"
						),
						_react2.default.createElement("img", { className: "mail_sent", src: "/img/mail_sent.png" }),
						_react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(
								"h4",
								{ className: "email_sent_wrapper" },
								"You are almost done! A verification message has been sent to",
								_react2.default.createElement("br", null),
								_react2.default.createElement(
									"strong",
									null,
									_react2.default.createElement(
										"em",
										null,
										_react2.default.createElement("span", { id: "email" })
									)
								)
							),
							_react2.default.createElement(
								"p",
								null,
								"Check your email and follow the link to veryfy your email address. Once you verify it, you will be able to sign in and create your profile."
							)
						)
					)
				)
			);
		}
	}]);

	return Verify;
})(_react2.default.Component);

exports.default = Verify;

},{"react":"react"}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonComponent = _react2.default.createClass({
	displayName: "ButtonComponent",
	ableButton: function ableButton() {
		var button = this.refs["myButton"];

		$(button).html(this.props.txt);
		$(button).attr("disabled", false);
		$(button).find("i").remove();

		if (this.props.callback == "true") {
			this.props.callbackAction();
		}
	},
	disableButton: function disableButton() {
		var button = this.refs["myButton"];
		$(button).html(this.props.disabledTxt);
		$(button).append("<i class='fa fa-cog fa-spin'></i>");
		$(button).attr("disabled", true);
	},
	render: function render() {
		return _react2.default.createElement(
			"button",
			{ id: "ButtonComponentID", ref: "myButton", onClick: this.props.action, className: "btn btn-primary" },
			this.props.txt
		);
	}
});

/*
	usage:
	<ButtonComponent ref="ButtonComponent" 
	callback="true" 
	callbackAction={this.resetState} 
	action={self.sendData} 
	txt={field.buttonText}/>
	disabledTxt="Uploading"

	1. action attr is for trriger from button 
	2. ref needs to be for reference.
	3. callback - callbackaction will be triggered if this is true
	4. disabledTxt - render when the button is disabled

*/

exports.default = ButtonComponent;

},{"react":"react"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* renders each list link based on attrs 
*
*  usage	
    var list = (
	  <EachListComponent 
	   key={data._id}
	   mainImage={data.mainImage}
	   price={data.price}
	   desc={desc}
	   title={title}
	   item_location={data.item_location}
	   view_count={data.view_count}
	   post_date={date.toLocaleDateString("en-US")}/>	);
*/

var EachListComponent = _react2.default.createClass({
	displayName: 'EachListComponent',
	renderEachItem: function renderEachItem(e) {
		var item_obj = JSON.stringify(this.props.item_obj);

		sessionStorage.setItem('item_obj', item_obj);
	},
	render: function render() {

		return _react2.default.createElement(
			_reactRouter.Link,
			{ onClick: this.renderEachItem, className: 'fadeInUp animated', key: this.props.key, to: this.props.action + "/" + this.props.address },
			_react2.default.createElement(
				'li',
				{ className: 'buyandsell_list clearfix' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('img', { className: 'image_thumbnail', src: this.props.imageSrc + this.props.mainImage }),
					_react2.default.createElement(
						'div',
						{ className: 'buyandsellEachList' },
						_react2.default.createElement(
							'h4',
							null,
							this.props.title
						),
						_react2.default.createElement(
							'p',
							null,
							this.props.desc
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'buyandsellEachList2' },
						_react2.default.createElement(
							'strong',
							null,
							_react2.default.createElement(
								'span',
								{ className: 'price' },
								this.props.price != "" ? "$" + this.props.price : ""
							)
						),
						_react2.default.createElement(
							'span',
							{ className: 'item_location' },
							this.props.item_location
						),
						_react2.default.createElement(
							'span',
							{ className: 'view_count' },
							_react2.default.createElement('i', { className: 'fa fa-eye' }),
							' View ',
							this.props.view_count
						),
						_react2.default.createElement(
							'span',
							{ className: 'post_date' },
							this.props.post_date
						)
					)
				)
			)
		);
	}
});

exports.default = EachListComponent;

},{"react":"react","react-router":"react-router"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ClientSideInfo = require('../../lib/ClientSideInfo');

var _ClientSideInfo2 = _interopRequireDefault(_ClientSideInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*  Usage 
*	it renders campus locations based on students campus location
*	whenever checkbox value changes, it invoke a function provided by its parent component
*	need to work with sessionStorage data sessionStorage key has to be on parent component
*    eg) <LocationComponent ref="LocationComponent" sessionStorageKey="BuyandSellrefineData" updateList={this.updateList}/>
*  each page has to pass different sessionStorageKey eg) buyandsell and accomodation
*/

var AUS_CAMPUS = _ClientSideInfo2.default.CAMPUS_INFO.AUS_CAMPUS;
var VIETNAM = _ClientSideInfo2.default.CAMPUS_INFO.VIETNAM;

var LocationComponent = _react2.default.createClass({
    displayName: 'LocationComponent',
    getInitialState: function getInitialState() {

        var country = localStorage.getItem("country") != "undefined" ? localStorage.getItem("country") : null;
        var campuses = [];

        if (country != null) {
            if (country == _ClientSideInfo2.default.COUNTRIES.AUS) {
                campuses = AUS_CAMPUS;
            } else if (country == _ClientSideInfo2.default.COUNTRIES.VIETNAM) {
                campuses = VIETNAM;
            }
        }

        return {

            myCampus: "",
            everyCampus: campuses,
            choosenLocation: []

        };
    },
    componentDidMount: function componentDidMount() {
        /* if sessionStorage key from this.props available keep update states
        */

        if (sessionStorage.getItem(this.props.sessionStorageKey) != null) {
            var CAMPUSES = [];
            var choosenLocation = JSON.parse(sessionStorage.getItem(this.props.sessionStorageKey)).choosenLocation;

            if (typeof choosenLocation == 'string' && choosenLocation != _ClientSideInfo2.default.COUNTRIES.AUS) {
                CAMPUSES.push(choosenLocation); // vietnam
            } else if ((typeof choosenLocation === 'undefined' ? 'undefined' : _typeof(choosenLocation)) == 'object') {
                    for (var i = 0; i < choosenLocation.length; i++) {
                        CAMPUSES.push(choosenLocation[i]); // aus campuses
                    }
                }

            this.setState({
                choosenLocation: CAMPUSES
            });
        }

        var myCampus = localStorage.getItem("campus") != "undefined" ? localStorage.getItem("campus") : "";

        if (myCampus != "") {
            this.setState({

                myCampus: myCampus

            });
        }
    },

    /* this would be working with sessionStorage
    *  need to keep current checkbox status 
    *  when page reloaded and data is updated based on sessionStorage data
    */

    updateCheckBoxState: function updateCheckBoxState(data) {
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == "object") //if array given, loop through everything and update
            {
                var CAMPUSES = this.state.everyCampus;

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < CAMPUSES.length; j++) {
                        if (CAMPUSES[j].city == data[i]) {
                            CAMPUSES[j].checked = true;
                        }
                    }
                }

                this.setState({
                    everyCampus: CAMPUSES
                });
            } else if (typeof data == "string") //if string given, match its campus name and update
            {
                var CAMPUSES = this.state.everyCampus;

                for (var j = 0; j < CAMPUSES.length; j++) {
                    CAMPUSES[j].checked = false;
                }

                this.setState({
                    everyCampus: CAMPUSES
                });
            }
    },

    /* individual campus like VIETNAM doens't call this method
    *  if this is invoked, only AUS campuses 
    */

    changeLocation: function changeLocation(e) {

        e.stopPropagation();

        var city = e.target.id;

        for (var i = 0; i < AUS_CAMPUS.length; i++) {
            if (AUS_CAMPUS[i].city == city) {
                AUS_CAMPUS[i].checked = !AUS_CAMPUS[i].checked;
            }
        }

        this.setState({
            everyCampus: AUS_CAMPUS
        });

        if (e.target.checked == true) {
            this.state.choosenLocation.push(city);
        } else {
            this.state.choosenLocation.splice(this.state.choosenLocation.indexOf(city), 1);
        }

        if (this.state.choosenLocation.length == 0) // this means choosen location is one of AUS campuses
            {
                this.props.updateList({
                    type: "location",
                    data: _ClientSideInfo2.default.COUNTRIES.AUS
                });

                return;
            }

        this.props.updateList({
            type: "location",
            data: this.state.choosenLocation
        });
    },
    render: function render() {
        var self = this;
        var everyCampus = this.state.everyCampus.map(function (campus, index) {

            return _react2.default.createElement(
                'div',
                { key: campus.city, className: 'checkbox checkbox-primary' },
                _react2.default.createElement('input', { checked: campus.checked, onChange: self.changeLocation, type: 'checkbox', name: campus.city, id: campus.city }),
                _react2.default.createElement(
                    'label',
                    { htmlFor: campus.city },
                    campus.city
                )
            );
        });

        /* need to detect if user set his campus or not
        *  if not don't show any capmus checkboxes
        */

        if (this.state.myCampus) {

            return _react2.default.createElement(
                'div',
                { className: 'locationWrapper' },
                _react2.default.createElement(
                    'h5',
                    null,
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Campus Location'
                    )
                ),
                _react2.default.createElement(
                    'form',
                    { role: 'form' },
                    everyCampus.length > 1 ? everyCampus : _react2.default.createElement(
                        'div',
                        { className: 'checkbox checkbox-primary' },
                        _react2.default.createElement('input', { readOnly: 'true', checked: 'checked', type: 'checkbox', name: this.state.myCampus, id: this.state.myLocation }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: this.state.myCampus },
                            this.state.myCampus
                        )
                    )
                )
            );
        } else {
            return _react2.default.createElement('div', null);
        }
    }
});

exports.default = LocationComponent;

},{"../../lib/ClientSideInfo":23,"react":"react"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ButtonComponent = require('./ButtonComponent');

var _ButtonComponent2 = _interopRequireDefault(_ButtonComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderForm = _react2.default.createClass({
	displayName: 'RenderForm',
	getInitialState: function getInitialState() {
		return {
			formData: new FormData(),
			formInfo: {},
			formUrl: "",
			formFieldData: [],
			formClass: "",
			thumbnails: "",
			validFileTypes: [],
			fileError: false,
			validateValue: [],
			overSizedFiles: [],
			invalidFileTypes: [],
			filesWillUpload: [],
			totalFileNumber: 0,
			mainThumbnail: "",
			maxFileSize: 0,
			maxFileNumber: 0,
			errorList: "",
			invalidErrorList: "",
			ajaxSuccess: "",
			ajaxFail: ""
		};
	},
	componentDidMount: function componentDidMount() {

		var formInfo = this.props.formData.shift();

		this.setState({
			formUrl: formInfo.url,
			ajaxSuccess: formInfo.success,
			ajaxFail: formInfo.fail
		});

		var formFieldData = this.props.formData;

		for (var i = 0; i < formFieldData.length; i++) {
			if (formFieldData[i].type == "file") {
				this.setState({
					maxFileNumber: formFieldData[i].maxFileNumber,
					validFileTypes: formFieldData[i].fileType
				});

				break;
			}
		}

		this.setState({
			formInfo: formInfo,
			formFieldData: formFieldData,
			formClass: formInfo.formClass,
			validateValue: formInfo.validateValue
		});
	},
	sendData: function sendData(e) {
		e.preventDefault();

		var validateEmail = function validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};

		var form = $("." + this.state.formClass);
		var addEvents = form.find("input,textarea");
		var formValid = true;
		var fileError = this.state.fileError;
		var self = this;

		for (var i = 0; i < addEvents.length; i++) {
			(function (i) {

				addEvents[i].addEventListener("keypress", function () {

					$(addEvents[i]).parent().removeClass("has-error");
				});
			})(i);
		}

		var formValues = form.serializeArray();

		for (var i = 0; i < formValues.length; i++) {
			if (formValues[i].value == "") {
				if (this.state.validateValue.indexOf(formValues[i].name) != -1) {
					form.find("#" + formValues[i].name).parent().addClass("has-error");
					formValid = false;
				}
			}

			if (formValues[i].name == "email") {
				if (!validateEmail(formValues[i].value)) {
					form.find("#" + formValues[i].name).parent().addClass("has-error");
					formValid = false;
				}
			}
		}

		if (this.state.overSizedFiles.length > 0) {
			fileError = true;
		} else {
			fileError = false;
		}

		if (formValid == false || fileError == true) {
			return false;
		}

		for (var i = 0; i < formValues.length; i++) {
			this.state.formData.append(formValues[i].name, formValues[i].value);
		}

		var updatedfilesWillUpload = [];

		this.state.filesWillUpload.forEach(function (val) {
			updatedfilesWillUpload.push(val.substring(0, val.lastIndexOf("_")));
		});

		this.state.formData.append("filesWillUpload", updatedfilesWillUpload);
		this.state.formData.append("mainThumbnail", this.state.mainThumbnail);

		this.refs["ButtonComponent"].disableButton();

		$.ajax({

			url: this.state.formUrl,
			type: "POST",
			data: this.state.formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function success(data) {
				self.state.ajaxSuccess(data);
				self.refs["ButtonComponent"].ableButton();
			},
			fail: function fail(data) {
				self.state.ajaxFail(data);
			}

		});

		// execute a callback function or not
		if (this.props.callBack == "true") {
			this.props.handleData();
		}
	},
	dragEnter: function dragEnter(e) {
		e.stopPropagation();
		e.preventDefault();
	},
	dragOver: function dragOver(e) {
		e.stopPropagation();
		e.preventDefault();
	},
	filehandling: function filehandling(files) {
		var overSizedInvalid = false;
		var overSizedFiles = this.state.overSizedFiles;
		var invalidFileTypes = this.state.invalidFileTypes;
		var invalidFileType = false;
		var maxFileSize = 0;
		var totalFileNumber = this.state.totalFileNumber;
		var maxFileNumber = this.state.maxFileNumber;
		var filesWillUpload = this.state.filesWillUpload;
		var currentTime = Date.now();

		for (var i = 0; i < files.length; i++) {
			for (var j = 0; j < this.props.formData.length; j++) {
				if (this.props.formData[j]["type"] == "file") {
					if (this.props.formData[j].fileType.indexOf(files[i].type) == -1) {

						if (maxFileNumber > totalFileNumber) {
							invalidFileType = true;
							invalidFileTypes.push({ name: files[i].name, type: files[i].type, key: files[i].name + "_" + currentTime });
						}
						break;
					}

					if (this.props.formData[j].maxFileSize < files[i].size) {
						if (maxFileNumber > totalFileNumber) {
							maxFileSize = this.props.formData[j].maxFileSize;
							overSizedInvalid = true;
							overSizedFiles.push({ name: files[i].name, size: files[i].size, key: files[i].name + "_" + currentTime });

							filesWillUpload.push(files[i].name + "_" + currentTime);
							this.renderThumbnails(files[i], totalFileNumber, files[i].name + "_" + currentTime);
							totalFileNumber++;
							this.setState({

								filesWillUpload: filesWillUpload,
								totalFileNumber: totalFileNumber

							});
						}
						break;
					}

					if (maxFileNumber > totalFileNumber) {
						filesWillUpload.push(files[i].name + "_" + currentTime);
						this.renderThumbnails(files[i], totalFileNumber, files[i].name + "_" + currentTime);
						this.state.formData.append("file", files[i]);

						// limit max file numbers for formdata

						totalFileNumber++;
						this.setState({

							filesWillUpload: filesWillUpload,
							totalFileNumber: totalFileNumber

						});
					}
				}
			}
		}

		if (overSizedInvalid == true) {

			this.state.errorList = overSizedFiles.map(function (filename, index) {

				return _react2.default.createElement(
					'div',
					{ id: filename.name, className: 'alert alert-danger', key: filename.key },
					_react2.default.createElement(
						'strong',
						null,
						filename.name
					),
					_react2.default.createElement(
						'span',
						null,
						' filesize is ',
						filename.size / 1000,
						'KB Max file size not more than ',
						maxFileSize / 1000,
						' KB'
					)
				);
			});

			this.setState({
				fileError: true
			});
		}

		if (invalidFileType == true) {
			this.state.invalidErrorList = invalidFileTypes.map(function (filename, index) {

				return _react2.default.createElement(
					'div',
					{ id: filename.name, className: 'alert alert-danger', key: filename.key },
					_react2.default.createElement(
						'strong',
						null,
						filename.name
					),
					_react2.default.createElement(
						'span',
						null,
						' ',
						filename.type,
						' is invalid filetype.'
					)
				);
			});

			this.setState({
				fileError: true
			});
		}
	},
	drop: function drop(e) {
		e.stopPropagation();
		e.preventDefault();

		var dt = e.dataTransfer;
		var files = dt.files;

		this.filehandling(files);
	},
	renderThumbnails: function renderThumbnails(file, totalFileNumber, fileName) {
		var thumbnails = $("#dropzone").find("img");
		var maxFileNumber = this.state.maxFileNumber;
		var img = document.createElement("img");
		img.classList.add("buyThumnail");
		img.classList.add("fadeInUp");
		img.classList.add("animated");
		img.name = fileName;
		img.file = file;

		var self = this;
		var wrapper = $("<div style='margin-bottom:15px'><button style='margin-right:5px;' class='btn btn-info btn-sm' id=deleteThumnail_" + img.name + ">Delete</buttun></div>");

		/**
  *  only valid images can be a main photo
  */

		var mainThumbnail_false = false;

		for (var i = 0; i < self.state.overSizedFiles.length; i++) {
			if (self.state.overSizedFiles[i].key == img.name) {
				mainThumbnail_false = true;
				break;
			}
		}

		if (mainThumbnail_false == false) {
			wrapper.append("<button class='btn btn-info btn-sm mainThumbnail_" + img.name + "'>Main photo</button>");
		}

		wrapper.prepend(img);

		if (maxFileNumber > totalFileNumber) {
			$("#dropzone").append(wrapper);
		}

		if (document.getElementById("deleteThumnail_" + img.name) != undefined) {

			document.getElementById("deleteThumnail_" + img.name).addEventListener("click", function (e) {

				e.preventDefault();
				e.stopPropagation();

				self.deleteThumnail($(e.target).parent().find("img")[0]);
				$(e.target).parent().remove();
			});
		}

		/**
  *  check if element is undefined or not before attach to event
  */

		if (document.getElementsByClassName("mainThumbnail_" + img.name)[0] != undefined) {
			document.getElementsByClassName("mainThumbnail_" + img.name)[0].addEventListener("click", function (e) {

				e.preventDefault();
				e.stopPropagation();

				$("#dropzone").find("img").each(function (index, element) {

					$(element).css({
						"border": "none"
					});
				});

				var img = $(e.target).parent().find("img")[0];
				$(img).css({
					"border": "2px solid #269abc"
				});

				self.setState({

					mainThumbnail: img.name.substring(0, img.name.lastIndexOf("_"))

				});
			});
		};

		var reader = new FileReader();

		reader.onload = (function (aImg) {
			return function (e) {
				aImg.src = e.target.result;
			};
		})(img);
		reader.readAsDataURL(file);

		$(".buyThumnail").on("mouseover", function (e) {

			e.preventDefault();
			e.stopPropagation();

			$(this).removeClass("fadeInup");
			$(this).removeClass("animated");

			$(this).animate({
				opacity: 0.5
			}, 500);
		});

		$(".buyThumnail").on("mouseleave", function (e) {

			e.preventDefault();
			e.stopPropagation();

			$(this).animate({
				opacity: 1.0
			}, 500);

			$(this).addClass("fadeInup");
			$(this).addClass("animated");
		});
	},
	deleteThumnail: function deleteThumnail(target) {

		$(target).remove();

		var self = this;
		var totalFileNumber = self.state.totalFileNumber;
		var removeFile = false;
		var erroList = self.state.errorList;
		var filesWillUpload = self.state.filesWillUpload;

		for (var i = 0; i < filesWillUpload.length; i++) {
			if (filesWillUpload[i] == target.name) {
				filesWillUpload.splice(i, 1);

				self.setState({
					filesWillUpload: filesWillUpload
				});

				break;
			}
		}

		for (var i = 0; i < erroList.length; i++) {
			if (erroList[i].key == target.name) {
				erroList.splice(i, 1);
			}
		}

		self.setState({
			erroList: erroList
		});

		for (var i = 0; i < self.state.overSizedFiles.length; i++) {
			if (self.state.overSizedFiles[i].key == target.name) {
				self.state.overSizedFiles.splice(i, 1);
			}
		}

		for (var i = 0; i < self.state.invalidFileTypes.length; i++) {
			if (self.state.invalidFileTypes[i].key == target.name) {
				self.state.invalidFileTypes.splice(i, 1);
			}
		}

		totalFileNumber--;

		self.setState({

			totalFileNumber: totalFileNumber

		});
	},
	fileInserted: function fileInserted(e) {
		e.preventDefault();
		this.filehandling(e.target.files);
	},
	linkButtonClicked: function linkButtonClicked(e) {
		e.preventDefault();
		$("#hiddenButton").click();
	},
	resetState: function resetState() {
		this.setState({
			formData: new FormData(),
			filesWillUpload: [],
			mainThumbnail: "",
			totalFileNumber: 0
		});

		$(this.refs["myForm"])[0].reset();
		$("#dropzone").empty();
	},
	render: function render() {
		var self = this;
		var form = this.state.formFieldData.map(function (field, index) {

			switch (field.type) {
				case "text":
					return _react2.default.createElement(
						'div',
						{ key: index, className: 'form-group' },
						_react2.default.createElement(
							'label',
							{ htmlFor: field.label },
							field.label
						),
						_react2.default.createElement('input', { className: 'form-control', name: field.id, type: field.type, id: field.id })
					);
					break;
				case "hidden":
					return _react2.default.createElement(
						'div',
						{ key: index, className: 'form-group' },
						_react2.default.createElement('input', { className: 'form-control', name: field.id, type: field.type, value: field.value, id: field.id })
					);
					break;
				case "textarea":
					return _react2.default.createElement(
						'div',
						{ key: index, className: 'form-group' },
						_react2.default.createElement(
							'label',
							{ htmlFor: field.label },
							field.label
						),
						_react2.default.createElement('textarea', { className: 'form-control', name: field.id, rows: field.rows, id: field.id })
					);
					break;
				case "button":
					return _react2.default.createElement(
						'div',
						{ key: index, className: 'form-group' },
						_react2.default.createElement(_ButtonComponent2.default, { ref: 'ButtonComponent', callback: 'true', callbackAction: self.resetState, action: self.sendData, txt: field.buttonText, disabledTxt: 'Uploading ' })
					);
					break;
				case "radio":

					var radio_buttons = field.text.map(function (radio, index) {

						return _react2.default.createElement(
							'div',
							{ key: index, className: 'form-group radio radio-primary' },
							_react2.default.createElement('input', { type: 'radio', defaultChecked: radio.checked, value: radio.value, name: radio.name, id: radio.name }),
							_react2.default.createElement(
								'label',
								{ htmlFor: radio.name },
								radio.title
							)
						);
					});

					return _react2.default.createElement(
						'div',
						{ key: index },
						_react2.default.createElement(
							'label',
							{ htmlFor: field.label },
							field.label
						),
						radio_buttons
					);

				case "file":

					return _react2.default.createElement(
						'div',
						{ key: index },
						_react2.default.createElement(
							'label',
							{ htmlFor: field.label },
							field.label,
							' (Max file size not more than ',
							field.maxFileSize / 1000,
							' KB,Max files per post is ',
							field.maxFileNumber,
							')'
						),
						_react2.default.createElement(
							'div',
							{
								onDragEnter: self.dragEnter,
								onDragOver: self.dragOver,
								onDrop: self.drop,
								id: 'dropbox' },
							_react2.default.createElement(
								_reactRouter.Link,
								{ id: 'dropfileLinkButton', to: '#', onClick: self.linkButtonClicked },
								_react2.default.createElement('div', { id: 'dropzone' }),
								_react2.default.createElement(
									'h5',
									{ className: 'dropbox_title' },
									'Drop files or click here'
								)
							),
							_react2.default.createElement('input', { id: 'hiddenButton', className: 'btn btn-primary', type: 'file', onChange: self.fileInserted, multiple: 'true' })
						),
						_react2.default.createElement(
							'span',
							{ id: 'errMsg' },
							self.state.errorList
						),
						_react2.default.createElement(
							'span',
							{ id: 'inValiderrMsg' },
							self.state.invalidErrorList
						)
					);
			}
		});

		return _react2.default.createElement(
			'form',
			{ ref: 'myForm', className: this.state.formClass },
			form
		);
	}
});
/*
	usage:
	use with dependancy ButtonComponent 


<RenderForm callBack="true" handleData={this.updateBuyList} formData={this.state.formField}/> 
	
1.callback attr - trigger callback function after form submit	
2.handleData - will be tirggered if callback attr is true
3.formData - provide json format for form fields

		formField:[
 						   {
 						   	  url:"buyandsell/newPost",
 						   	  type:"POST",
 						   	  formClass:"SavePostForm",
 						   	  validateValue:["name","email"],
 						   	  success:function(data)
 						   	  {
 						   	  	 console.log(data);
 						   	  },
 						   	  fail:function(data)
 						   	  {
 						   	  	 console.log(data);
 						   	  }
 						   },
							   {
							   	  "label":"name",
							   	  "type":"input",
							   	  "inputType":"text",
							   },

							   {
							   	  "label":"email",
							   	  "type":"input",
							   	  "inputType":"text",
							   },
							   {
							   	  "label":"description",
							   	  "type":"textarea",
							   	  "rows":5
							   },
							   {
							   	  "label":"offerType",
							   	  "text":[

							   	  	 {
							   	  	 	title:"Buy",
							   	  	 	name:"BUY",
							   	  	 	value:"buy",
							   	  	 	checked:false
							   	  	 },
							   	  	 {
							   	  	 	title:"Sell",
							   	  	 	name:"BUY",
							   	  	 	value:"sell",
							   	  	 	checked:true
							   	  	 }

							   	  ],	
							   	  "type":"radio"
							   },
							   {
							   	  "label":"Upload Images",
							   	  "type":"file",
							   	  "maxFileNumber":5,
							   	  "maxFileSize":"100000",
							   	  "fileType":["image/jpg","image/jpeg","image/png","image/gif"]
							   },
							   {
							   	  "type":"button",
							   	  "buttonText":"Save Post"
							   },							   							   
					

					]

 		}    


*/

exports.default = RenderForm;

},{"./ButtonComponent":17,"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
*  Simple rendering component showing loading image when scroll down
*  for getting more data
*
*  Usage
*  <ScrollComponent ref="scrollComp"/>
*  using ref, call showLoading when ajax call and	
*  hideLoading when ajax finishes
*
*/

var ScrollComponent = _react2.default.createClass({
	displayName: 'ScrollComponent',
	showLoading: function showLoading() {
		$($(this.refs['ScrollComponent'])[0]).css('visibility', 'visible');
	},
	hideLoading: function hideLoading() {
		$($(this.refs['ScrollComponent'])[0]).css('visibility', 'hidden');
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ ref: 'ScrollComponent', id: 'ScrollComponentWrapper' },
			_react2.default.createElement('i', { className: 'fa fa-cog fa-spin' })
		);
	}
});

exports.default = ScrollComponent;

},{"react":"react"}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lib = require("../lib/lib");

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireAuth(nextState, replaceState) {
	if (!localStorage.getItem("token")) {
		window.location.href = "/signin";
		return;
	}

	/*
 *  JSON web token verification
 *  when open pages which needs for verification
 *  send current token to the server and verify it
 */

	$.ajax({

		url: "/verify_token",
		type: "POST",
		data: {
			token: localStorage.getItem("token")
		},
		success: function success(data) {
			if (!data) {
				localStorage.removeItem("token");
				window.location.href = "/signin";
				return;
			}
		}

	});
}

exports.default = requireAuth;

},{"../lib/lib":25}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {

  EMAIL_FORMAT: {
    student: /^s\d+@student.rmit.edu.au/
  },

  CAMPUS_INFO: {

    AUS_CAMPUS: [{ city: "Melbourne City", checked: false }, { city: "Bundoora", checked: false }, { city: "Point Cook", checked: false }],

    VIETNAM: [{ city: "Vietnam", checked: false }]

  },

  COMMENT_DEFAULT_MESSAGE: {
    DELETE: "This comment has been deleted by the commenter"
  },

  COUNTRIES: {
    AUS: "aus",
    VIETNAM: "Vietnam"
  }

};

exports.default = config;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {

  EMAIL_FORMAT: {
    student: /^s\d+@student.rmit.edu.au/
  },

  CAMPUS_INFO: {

    AUS_CAMPUS: [{ city: "Melbourne City", checked: false }, { city: "Bundoora", checked: false }, { city: "Point Cook", checked: false }],

    VIETNAM: [{ city: "Vietnam", checked: false }]

  },

  COMMENT_DEFAULT_MESSAGE: {
    DELETE: "This comment has been deleted by the commenter"
  },

  COUNTRIES: {
    AUS: "aus",
    VIETNAM: "Vietnam"
  }

};

exports.default = config;

},{}],25:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientSideInfo = require('./clientSideInfo');

module.exports = {

   validateEmail: function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
   },

   returnTimeFormat: function returnTimeFormat(date_date) {
      return new Date(date_date).toLocaleString();
   },

   addEvent: function addEvent(target, eventType, callback) {
      target.addEventListener(eventType, function (e) {

         e.preventDefault();

         callback(e);
      });
   },

   RmitEmailCheck: function RmitEmailCheck(email) {

      // delete the return true before deploy

      return true;

      var re = ClientSideInfo.default.EMAIL_FORMAT;
      var validEmail = true;

      for (var prop in re) {

         if (!re[prop].test(email)) {
            validEmail = false;
            break;
         }
      }

      return validEmail;
   },

   getUpperCase: function getUpperCase(word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
   },

   loggedIn: function loggedIn() {
      return localStorage.getItem('token');
   },

   SetSessionStorage: function SetSessionStorage(key, location) {

      var refineData = JSON.parse(sessionStorage.getItem(key));
      var updateData = {};
      var offerType = refineData.offerType;
      var choosenLocation = location;
      updateData = {
         offerType: offerType,
         choosenLocation: choosenLocation == 'Vietnam' ? ClientSideInfo.default.COUNTRIES.VIETNAM : ClientSideInfo.default.COUNTRIES.AUS
      };

      sessionStorage.setItem(key, JSON.stringify(updateData));
   },

   sendDataAjax: function sendDataAjax(buttonID, InputContainerId, eventType, url, type, postFunc, callback) {

      var sendData;

      var buttonId = $("#" + buttonID);
      var buttonText = $("#" + buttonID)[0].text;
      var InputContainer = $("#" + InputContainerId);
      var loading_button = $("<span><img class='loading_icon' src='/img/loader.gif'></span>");
      var parent = buttonId.parent();

      buttonId.on(eventType, function (e) {

         sendData = postFunc();

         if (sendData == false) {
            InputContainer.addClass("has-error");

            setTimeout(function () {

               InputContainer.removeClass("has-error");
            }, 2000);

            return false;
         }

         e.preventDefault();
         buttonId.hide();
         parent.append(loading_button);

         $.ajax({

            url: url,
            type: type,
            data: sendData

         }).done(function (data) {

            if (data.err) {
               toastr.error(data.err);
               return;
            }

            loading_button.fadeOut();
            $("#" + buttonID)[0].text = "Done!";
            buttonId.show();
            callback(data);

            setTimeout(function () {

               $("#" + buttonID)[0].text = buttonText;

               loading_button.remove();
               loading_button.css({ "display": "inline-block" });
            }, 2000);
         });
      });
   }

};

},{"./clientSideInfo":24,"react":"react"}],26:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  _routes2.default
), document.getElementById('app'));

},{"./routes":27,"history/lib/createBrowserHistory":38,"react":"react","react-dom":"react-dom","react-router":"react-router"}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Signup = require('./components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _Signin = require('./components/Signin');

var _Signin2 = _interopRequireDefault(_Signin);

var _Verify = require('./components/Verify');

var _Verify2 = _interopRequireDefault(_Verify);

var _Profile = require('./components/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _UserProfile = require('./components/UserProfile');

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _requireAuth = require('./components/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _Buyandsell = require('./components/Buyandsell');

var _Buyandsell2 = _interopRequireDefault(_Buyandsell);

var _Accomodation = require('./components/Accomodation');

var _Accomodation2 = _interopRequireDefault(_Accomodation);

var _RenderItemWrapper = require('./components/RenderItemWrapper');

var _RenderItemWrapper2 = _interopRequireDefault(_RenderItemWrapper);

var _ClubComponent = require('./components/ClubComponent');

var _ClubComponent2 = _interopRequireDefault(_ClubComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
		_reactRouter.Route,
		{ component: _App2.default },
		_react2.default.createElement(_reactRouter.Route, { path: '/signin', component: _Signin2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/profile', onEnter: _requireAuth2.default, component: _Profile2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/userProfile/:id', onEnter: _requireAuth2.default, component: _UserProfile2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/buyandsell', onEnter: _requireAuth2.default, component: _Buyandsell2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/clubs', onEnter: _requireAuth2.default, component: _ClubComponent2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/buyandsell/:id', onEnter: _requireAuth2.default, component: _RenderItemWrapper2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/accomodation', onEnter: _requireAuth2.default, component: _Accomodation2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/accomodation/:id', onEnter: _requireAuth2.default, component: _RenderItemWrapper2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _Signup2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/verify_your_email', component: _Verify2.default })
);

},{"./components/Accomodation":4,"./components/App":5,"./components/Buyandsell":6,"./components/ClubComponent":7,"./components/Home":8,"./components/Profile":10,"./components/RenderItemWrapper":11,"./components/Signin":13,"./components/Signup":14,"./components/UserProfile":15,"./components/Verify":16,"./components/requireAuth":22,"react":"react","react-router":"react-router"}],28:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

var _NavbarAction = require('../actions/NavbarAction');

var _NavbarAction2 = _interopRequireDefault(_NavbarAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarStore = (function () {
	function NavbarStore() {
		_classCallCheck(this, NavbarStore);

		this.bindActions(_NavbarAction2.default);
		this.loggedIn = '';
	}

	_createClass(NavbarStore, [{
		key: 'onLogout',
		value: function onLogout(history) {
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
			history.pushState(null, '/');
		}
	}]);

	return NavbarStore;
})();

exports.default = _alt2.default.createStore(NavbarStore);

},{"../../config/alt":31,"../actions/NavbarAction":1}],29:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

var _SigninAction = require('../actions/SigninAction');

var _SigninAction2 = _interopRequireDefault(_SigninAction);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SigninStore = (function () {
	function SigninStore() {
		_classCallCheck(this, SigninStore);

		this.bindActions(_SigninAction2.default);
		this.email = '';
		this.password = '';
		this.emailValidateState = '';
		this.passwordValidateState = '';
		this.jwt = '';
		this.user = '';
		this.timestamp = Math.floor(Date.now() / 1000);
	}

	_createClass(SigninStore, [{
		key: 'onInValidEmail',
		value: function onInValidEmail() {
			this.emailValidateState = 'has-error';
		}
	}, {
		key: 'onInValidPassword',
		value: function onInValidPassword() {
			this.passwordValidateState = 'has-error';
		}
	}, {
		key: 'onLoginSuccess',
		value: function onLoginSuccess(obj) {
			var jwt = obj.data.token;
			var userData = obj.data.userData;
			var full_name = _lib2.default.getUpperCase(obj.data.user.f_name) + " " + _lib2.default.getUpperCase(obj.data.user.l_name);
			/* store user details in localstorage */
			var myInetested = obj.data.user.interests.join();

			localStorage.setItem('token', jwt);
			localStorage.setItem('id', obj.data.user.id);
			localStorage.setItem('f_name', obj.data.user.f_name);
			localStorage.setItem('l_name', obj.data.user.l_name);
			localStorage.setItem('email', obj.data.user.email);
			localStorage.setItem('full_name', full_name);
			localStorage.setObj('my_subjects', obj.data.user.subjects);
			localStorage.setItem('profile_image', obj.data.user.profile_image);
			localStorage.setItem('major', obj.data.user.major);
			localStorage.setItem('campus', obj.data.user.campus);
			localStorage.setItem('description', obj.data.user.description);
			localStorage.setItem('interests', myInetested);
			localStorage.setItem('country', obj.data.user.country);

			this.token = jwt;
			obj.history.pushState(null, '/profile');
		}
	}, {
		key: 'onLoginFail',
		value: function onLoginFail(xhr) {}
	}, {
		key: 'onUpdateEmail',
		value: function onUpdateEmail(event) {
			this.email = event.target.value;
			this.emailValidateState = '';
		}
	}, {
		key: 'onUpdatePassword',
		value: function onUpdatePassword(event) {
			this.password = event.target.value;
			this.passwordValidateState = '';
		}
	}]);

	return SigninStore;
})();

exports.default = _alt2.default.createStore(SigninStore);

},{"../../config/alt":31,"../actions/SigninAction":2,"../lib/lib":25}],30:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

var _SignupAction = require('../actions/SignupAction');

var _SignupAction2 = _interopRequireDefault(_SignupAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupStore = (function () {
  function SignupStore() {
    _classCallCheck(this, SignupStore);

    this.bindActions(_SignupAction2.default);
    this.f_name = '', this.l_name = '', this.email = '', this.password = '', this.password2 = '', this.f_nameValidationState = '', this.l_nameValidationState = '', this.emailValidationState = '', this.passwordValidationState = '', this.Password2ValidationState = '';
  }

  _createClass(SignupStore, [{
    key: 'onSignupSuccess',
    value: function onSignupSuccess(payload) {

      if (payload.data.created) {
        sessionStorage.setItem("email", payload.data.created);
        payload.history.pushState(null, '/verify_your_email');
      } else {

        for (var i = 0; i < payload.data.length; i++) {
          if (payload.data[i].msg == "email") {
            this.emailValidationState = 'has-error';
          }

          if (payload.data[i].msg == "f_name") {
            this.f_nameValidationState = 'has-error';
          }

          if (payload.data[i].msg == "l_name") {
            this.l_nameValidationState = 'has-error';
          }

          if (payload.data[i].msg == "password") {
            this.passwordValidationState = 'has-error';
          }
        }

        $('.register_button').button('reset');
      }
    }
  }, {
    key: 'onSignupFail',
    value: function onSignupFail(errorMsg) {
      toastr.error("System Error please try again." + errorMsg);
      return;
    }
  }, {
    key: 'onUpdateEmail',
    value: function onUpdateEmail(e) {
      this.email = e.target.value;
      this.emailValidationState = '';
    }
  }, {
    key: 'onUpdateFirstName',
    value: function onUpdateFirstName(e) {
      this.f_name = e.target.value;
      this.f_nameValidationState = '';
    }
  }, {
    key: 'onUpdateLastName',
    value: function onUpdateLastName(e) {
      this.l_name = e.target.value;
      this.l_nameValidationState = '';
    }
  }, {
    key: 'onUpdatePassword',
    value: function onUpdatePassword(e) {
      this.password = e.target.value;
      this.passwordValidationState = '';
      this.Password2ValidationState = '';
    }
  }, {
    key: 'onUpdatePassword2',
    value: function onUpdatePassword2(e) {
      this.password2 = e.target.value;
      this.Password2ValidationState = '';
      this.passwordValidationState = '';
    }
  }, {
    key: 'onInvalidFirstname',
    value: function onInvalidFirstname() {
      this.f_nameValidationState = 'has-error';
    }
  }, {
    key: 'onInvalidLastName',
    value: function onInvalidLastName() {
      this.l_nameValidationState = 'has-error';
    }
  }, {
    key: 'onInvalidEmail',
    value: function onInvalidEmail() {
      this.emailValidationState = 'has-error';
    }
  }, {
    key: 'onInvalidPassword',
    value: function onInvalidPassword() {
      this.passwordValidationState = 'has-error';
    }
  }, {
    key: 'onNoMatchPassword',
    value: function onNoMatchPassword() {
      this.PasswordValidationState = 'has-error';
      this.Password2ValidationState = 'has-error';
    }
  }]);

  return SignupStore;
})();

exports.default = _alt2.default.createStore(SignupStore);

},{"../../config/alt":31,"../actions/SignupAction":3}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],32:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],33:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],34:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],35:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":32,"warning":50}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],38:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./Actions":33,"./DOMStateStorage":35,"./DOMUtils":36,"./ExecutionEnvironment":37,"./createDOMHistory":39,"./parsePath":44,"_process":32,"invariant":49}],39:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":36,"./ExecutionEnvironment":37,"./createHistory":40,"_process":32,"invariant":49}],40:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":33,"./AsyncUtils":34,"./createLocation":41,"./deprecate":42,"./parsePath":44,"./runTransitionHook":45,"deep-equal":46}],41:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":33,"./parsePath":44}],42:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],43:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],44:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./extractPath":43,"_process":32,"warning":50}],45:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":32,"warning":50}],46:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":47,"./lib/keys.js":48}],47:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],48:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],49:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":32}],50:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":32}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var ImageGallery = _react2['default'].createClass({

  displayName: 'ImageGallery',

  propTypes: {
    items: _react2['default'].PropTypes.array.isRequired,
    showThumbnails: _react2['default'].PropTypes.string,
    showBullets: _react2['default'].PropTypes.bool,
    showNav: _react2['default'].PropTypes.string,
    showIndex: _react2['default'].PropTypes.bool,
    indexSeparator: _react2['default'].PropTypes.string,
    autoPlay: _react2['default'].PropTypes.bool,
    lazyLoad: _react2['default'].PropTypes.bool,
    slideInterval: _react2['default'].PropTypes.number,
    onSlide: _react2['default'].PropTypes.func,
    onMouseOver: _react2['default'].PropTypes.func,
    startIndex: _react2['default'].PropTypes.number,
    defaultImage: _react2['default'].PropTypes.string,
    disableScrolling: _react2['default'].PropTypes.bool,
    server: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      lazyLoad: true,
      showThumbnails: "false",
      showBullets: false,
      showNav: "false",
      showIndex: false,
      indexSeparator: ' / ',
      autoPlay: false,
      slideInterval: 4000,
      startIndex: 0,
      disableScrolling: false,
      server: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      showThumbnails:this.props.showThumbnails,
      showNav:this.props.showNav,
      currentIndex: this.props.startIndex,
      thumbnailsTranslateX: 0,
      containerWidth: 0
    };
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.containerWidth !== this.state.containerWidth || prevProps.showThumbnails !== this.props.showThumbnails) {

      // adjust thumbnail container when window width is adjusted
      // when the container resizes, thumbnailsTranslateX
      // should always be negative (moving right),
      // if container fits all thumbnails its set to 0

      this._setThumbnailsTranslateX(-this._getScrollX(this.state.currentIndex > 0 ? 1 : 0) * this.state.currentIndex);
    }

    if (prevState.currentIndex !== this.state.currentIndex) {

      // call back function if provided
      if (this.props.onSlide) {
        this.props.onSlide(this.state.currentIndex);
      }

      // calculates thumbnail container position
      if (this.state.currentIndex === 0) {
        this._setThumbnailsTranslateX(0);
      } else {
        var indexDifference = Math.abs(prevState.currentIndex - this.state.currentIndex);
        var _scrollX = this._getScrollX(indexDifference);
        if (_scrollX > 0) {
          if (prevState.currentIndex < this.state.currentIndex) {
            this._setThumbnailsTranslateX(this.state.thumbnailsTranslateX - _scrollX);
          } else if (prevState.currentIndex > this.state.currentIndex) {
            this._setThumbnailsTranslateX(this.state.thumbnailsTranslateX + _scrollX);
          }
        }
      }
    }
  },

  componentWillMount: function componentWillMount() {
    this._thumbnailDelay = 300;
    this._ghotClickDelay = 600;
    this._preventGhostClick = false;
  },

  componentDidMount: function componentDidMount() {
    this._handleResize();
    if (this.props.autoPlay) {
      this.play();
    }
    window.addEventListener('resize', this._handleResize);
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
    if (this._intervalId) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  slideToIndex: function slideToIndex(index, event) {
    var slideCount = this.props.items.length - 1;

    if (index < 0) {
      this.setState({ currentIndex: slideCount });
    } else if (index > slideCount) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex: index });
    }
    if (event) {
      if (this._intervalId) {
        // user event, reset interval
        this.pause();
        this.play();
      }
    }
  },

  play: function play() {
    var _this = this;

    if (this._intervalId) {
      return;
    }
    this._intervalId = window.setInterval(function () {
      if (!_this.state.hovering) {
        _this.slideToIndex(_this.state.currentIndex + 1);
      }
    }, this.props.slideInterval);
  },

  pause: function pause() {
    if (this._intervalId) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  _wrapClick: function _wrapClick(func) {
    var _this2 = this;

    return function (event) {
      if (_this2._preventGhostClick === true) {
        return;
      }
      func(event);
    };
  },

  _touchEnd: function _touchEnd(event) {
    var _this3 = this;

    this._preventGhostClick = true;
    this._preventGhostClickTimer = window.setTimeout(function () {
      _this3._preventGhostClick = false;
      _this3._preventGhostClickTimer = null;
    }, this._ghotClickDelay);
  },

  _setThumbnailsTranslateX: function _setThumbnailsTranslateX(x) {
    this.setState({ thumbnailsTranslateX: x });
  },

  _handleResize: function _handleResize() {
    this.setState({ containerWidth: this._imageGallery.offsetWidth });
  },

  _getScrollX: function _getScrollX(indexDifference) {
    if (this.props.disableScrolling) {
      return 0;
    }
    if (this._thumbnails) {
      if (this._thumbnails.scrollWidth <= this.state.containerWidth) {
        return 0;
      }

      var totalThumbnails = this._thumbnails.children.length;

      // total scroll-x required to see the last thumbnail
      var totalScrollX = this._thumbnails.scrollWidth - this.state.containerWidth;

      // scroll-x required per index change
      var perIndexScrollX = totalScrollX / (totalThumbnails - 1);

      return indexDifference * perIndexScrollX;
    }
  },

  _handleMouseOverThumbnails: function _handleMouseOverThumbnails(index, event) {
    var _this4 = this;

    this.setState({ hovering: true });
    if (this._thumbnailTimer) {
      window.clearTimeout(this._thumbnailTimer);
      this._thumbnailTimer = null;
    }
    this._thumbnailTimer = window.setTimeout(function () {
      _this4.slideToIndex(index);
      _this4.pause();
    }, this._thumbnailDelay);
  },

  _handleMouseLeaveThumbnails: function _handleMouseLeaveThumbnails() {
    if (this._thumbnailTimer) {
      window.clearTimeout(this._thumbnailTimer);
      this._thumbnailTimer = null;
      if (this.props.autoPlay == true) {
        this.play();
      }
    }
    this.setState({ hovering: false });
  },

  _handleMouseOver: function _handleMouseOver() {
    this.setState({ hovering: true });
  },

  _handleMouseLeave: function _handleMouseLeave() {
    this.setState({ hovering: false });
  },

  _getAlignmentClassName: function _getAlignmentClassName(index) {
    var currentIndex = this.state.currentIndex;
    var alignment = '';
    switch (index) {
      case currentIndex - 1:
        alignment = ' left';
        break;
      case currentIndex:
        alignment = ' center';
        break;
      case currentIndex + 1:
        alignment = ' right';
        break;
    }

    if (this.props.items.length >= 3) {
      if (index === 0 && currentIndex === this.props.items.length - 1) {
        // set first slide as right slide if were sliding right from last slide
        alignment = ' right';
      } else if (index === this.props.items.length - 1 && currentIndex === 0) {
        // set last slide as left slide if were sliding left from first slide
        alignment = ' left';
      }
    }

    return alignment;
  },

  _handleImageLoad: function _handleImageLoad(event) {
    if (event.target.className.indexOf('loaded') === -1) {
      event.target.className += ' loaded';
    }
  },

  _handleImageError: function _handleImageError(event) {
    if (this.props.defaultImage && event.target.src.indexOf(this.props.defaultImage) === -1) {
      event.target.src = this.props.defaultImage;
    }
  },

  render: function render() {
    var _this5 = this;

    var currentIndex = this.state.currentIndex;
    var thumbnailStyle = {
      MozTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
      WebkitTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
      OTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
      msTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
      transform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)'
    };

    var slides = [];
    var thumbnails = [];
    var bullets = [];

    this.props.items.map(function (item, index) {
      var alignment = _this5._getAlignmentClassName(index);
      var originalClass = item.originalClass ? ' ' + item.originalClass : '';
      var thumbnailClass = item.thumbnailClass ? ' ' + item.thumbnailClass : '';

      var slide = _react2['default'].createElement(
        'div',
        {
          key: index,
          className: 'image-gallery-slide' + alignment + originalClass,
          onTouchStart: _this5.props.onClick,
          onTouchEnd: _this5._touchEnd },
        _react2['default'].createElement('img', {
          className: _this5.props.server && 'loaded',
          src: item.original,
          alt: item.originalAlt,
          onMouseOver:_this5.props.onMouseOver,
          onLoad: _this5._handleImageLoad,
          onError: _this5._handleImageError }),
        item.description
      );

      if (_this5.props.lazyLoad) {
        if (alignment) {
          slides.push(slide);
        }
      } else {
        slides.push(slide);
      }

      if (_this5.props.showThumbnails) {
        thumbnails.push(_react2['default'].createElement(
          'a',
          { onMouseOver: _this5._handleMouseOverThumbnails.bind(_this5, index),
            onMouseLeave: _this5._handleMouseLeaveThumbnails.bind(_this5, index),
            key: index,
            className: 'image-gallery-thumbnail' + (currentIndex === index ? ' active' : '') + thumbnailClass,

            onTouchStart: _this5.slideToIndex.bind(_this5, index),
            onTouchEnd: _this5._touchEnd,
            onClick: _this5._wrapClick(_this5.slideToIndex.bind(_this5, index)) },
          _react2['default'].createElement('img', {
            src: item.thumbnail,
            alt: item.thumbnailAlt,
            onError: _this5._handleImageError })
        ));
      }

      if (_this5.props.showBullets) {
        bullets.push(_react2['default'].createElement('li', {
          key: index,
          className: 'image-gallery-bullet ' + (currentIndex === index ? 'active' : ''),

          onTouchStart: _this5.slideToIndex.bind(_this5, index),
          onTouchEnd: _this5._touchEnd,
          onClick: _this5._wrapClick(_this5.slideToIndex.bind(_this5, index)) }));
      }
    });

    var swipePrev = this.slideToIndex.bind(this, currentIndex - 1);
    var swipeNext = this.slideToIndex.bind(this, currentIndex + 1);
    var itemsTotal = this.props.items.length;
    return _react2['default'].createElement(
      'section',
      { ref: function (i) {
          return _this5._imageGallery = i;
        }, className: 'image-gallery' },
      _react2['default'].createElement(
        'div',
        {
          onMouseOver: this._handleMouseOver,
          onMouseLeave: this._handleMouseLeave,
          className: 'image-gallery-content' },
        itemsTotal >= 2 ? [this.state.showNav == "true" && [_react2['default'].createElement('a', {
          key: 'leftNav',
          className: 'image-gallery-left-nav',
          onTouchStart: swipePrev,
          onTouchEnd: this._touchEnd,
          onClick: this._wrapClick(swipePrev) })

          , _react2['default'].createElement('a', {
          key: 'rightNav',
          className: 'image-gallery-right-nav',
          onTouchStart: swipeNext,
          onTouchEnd: this._touchEnd,
          onClick: this._wrapClick(swipeNext) })]


          , _react2['default'].createElement(
          _reactSwipeable2['default'],
          {
            key: 'swipeable',
            onSwipedLeft: swipeNext,
            onSwipedRight: swipePrev },
          _react2['default'].createElement(
            'div',
            { className: 'image-gallery-slides' },
            slides
          )
        )] 
          : 

          _react2['default'].createElement(
          'div',
          { className: 'image-gallery-slides' },
          slides
        ),


        this.props.showBullets && _react2['default'].createElement(
          'div',
          { className: 'image-gallery-bullets' },
          _react2['default'].createElement(
            'ul',
            { className: 'image-gallery-bullets-container' },
            bullets
          )
        ),
        this.props.showIndex && _react2['default'].createElement(
          'div',
          { className: 'image-gallery-index' },
          _react2['default'].createElement(
            'span',
            { className: 'image-gallery-index-current' },
            this.state.currentIndex + 1
          ),
          _react2['default'].createElement(
            'span',
            { className: 'image-gallery-index-separator' },
            this.props.indexSeparator
          ),
          _react2['default'].createElement(
            'span',
            { className: 'image-gallery-index-total' },
            itemsTotal
          )
        )
      ),
      this.props.showThumbnails=="true"  && _react2['default'].createElement(
        'div',
        { className: 'image-gallery-thumbnails' },
        _react2['default'].createElement(
          'div',
          {
            ref: function (t) {
              return _this5._thumbnails = t;
            },
            className: 'image-gallery-thumbnails-container',
            style: thumbnailStyle 
          },
          thumbnails
        )
      )
    );
  }

});

exports['default'] = ImageGallery;
module.exports = exports['default'];
},{"react":"react","react-swipeable":52}],52:[function(require,module,exports){
var React = require('react')

var Swipeable = React.createClass({displayName: "Swipeable",
  propTypes: {
    onSwiped: React.PropTypes.func,
    onSwiping: React.PropTypes.func,
    onSwipingUp: React.PropTypes.func,
    onSwipingRight: React.PropTypes.func,
    onSwipingDown: React.PropTypes.func,
    onSwipingLeft: React.PropTypes.func,
    onSwipedUp: React.PropTypes.func,
    onSwipedRight: React.PropTypes.func,
    onSwipedDown: React.PropTypes.func,
    onSwipedLeft: React.PropTypes.func,
    flickThreshold: React.PropTypes.number,
    delta: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      x: null,
      y: null,
      swiping: false,
      start: 0
    }
  },

  getDefaultProps: function () {
    return {
      flickThreshold: 0.6,
      delta: 10
    }
  },

  calculatePos: function (e) {
    var x = e.changedTouches[0].clientX
    var y = e.changedTouches[0].clientY

    var xd = this.state.x - x
    var yd = this.state.y - y

    var axd = Math.abs(xd)
    var ayd = Math.abs(yd)

    return {
      deltaX: xd,
      deltaY: yd,
      absX: axd,
      absY: ayd
    }
  },

  touchStart: function (e) {
    if (e.touches.length > 1) {
      return
    }
    this.setState({
      start: Date.now(),
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      swiping: false
    })
  },

  touchMove: function (e) {
    if (!this.state.x || !this.state.y || e.touches.length > 1) {
      return
    }

    var cancelPageSwipe = false
    var pos = this.calculatePos(e)

    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
      return
    }

    if (this.props.onSwiping) {
      this.props.onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY)
    }

    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        if (this.props.onSwipingLeft) {
          this.props.onSwipingLeft(e, pos.absX)
          cancelPageSwipe = true
        }
      } else {
        if (this.props.onSwipingRight) {
          this.props.onSwipingRight(e, pos.absX)
          cancelPageSwipe = true
        }
      }
    } else {
      if (pos.deltaY > 0) {
        if (this.props.onSwipingUp) {
          this.props.onSwipingUp(e, pos.absY)
          cancelPageSwipe = true
        }
      } else {
        if (this.props.onSwipingDown) {
          this.props.onSwipingDown(e, pos.absY)
          cancelPageSwipe = true
        }
      }
    }

    this.setState({ swiping: true })

    if (cancelPageSwipe) {
      e.preventDefault()
    }
  },

  touchEnd: function (ev) {
    if (this.state.swiping) {
      var pos = this.calculatePos(ev)

      var time = Date.now() - this.state.start
      var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time
      var isFlick = velocity > this.props.flickThreshold

      this.props.onSwiped && this.props.onSwiped(
        ev,
        pos.deltaX,
        pos.deltaY,
        isFlick
      )
      
      if (pos.absX > pos.absY) {
        if (pos.deltaX > 0) {
          this.props.onSwipedLeft && this.props.onSwipedLeft(ev, pos.deltaX, isFlick)
        } else {
          this.props.onSwipedRight && this.props.onSwipedRight(ev, pos.deltaX, isFlick)
        }
      } else {
        if (pos.deltaY > 0) {
          this.props.onSwipedUp && this.props.onSwipedUp(ev, pos.deltaY, isFlick)
        } else {
          this.props.onSwipedDown && this.props.onSwipedDown(ev, pos.deltaY, isFlick)
        }
      }
    }
    
    this.setState(this.getInitialState())
  },

  render: function () {
    return (
      React.createElement("div", React.__spread({},  this.props, 
        {onTouchStart: this.touchStart, 
        onTouchMove: this.touchMove, 
        onTouchEnd: this.touchEnd}), 
          this.props.children
      )  
    )
  }
})

module.exports = Swipeable

},{"react":"react"}]},{},[26]);
