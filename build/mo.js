/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(51);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(62);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(20);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(17);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(18);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _h = __webpack_require__(10);

	var _h2 = _interopRequireDefault(_h);

	var _timeline = __webpack_require__(5);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Stagger = function () {
	  function Stagger(options, Module) {
	    (0, _classCallCheck3.default)(this, Stagger);

	    return this.init(options, Module);
	  }
	  /*
	    Method to get an option by modulo and name.
	    @param {String} Name of the property to get.
	    @param {Number} Index for the modulo calculation.
	    @param {Object} Options hash to look in.
	    @return {Any} Property.
	  */


	  (0, _createClass3.default)(Stagger, [{
	    key: '_getOptionByMod',
	    value: function _getOptionByMod(name, i, store) {
	      var props = store[name];
	      // if not dom list then clone it to array
	      if (props + '' === '[object NodeList]' || props + '' === '[object HTMLCollection]') props = Array.prototype.slice.call(props, 0);
	      // get the value in array or return the value itself
	      var value = _h2.default.isArray(props) ? props[i % props.length] : props;
	      // check if value has the stagger expression, if so parse it
	      return _h2.default.parseIfStagger(value, i);
	    }
	    /*
	      Method to get option by modulo of index.
	      @param {Number} Index for modulo calculations.
	      @param {Object} Options hash to look in.
	    */

	  }, {
	    key: '_getOptionByIndex',
	    value: function _getOptionByIndex(i, store) {
	      var _this = this;

	      var options = {};
	      (0, _keys2.default)(store).forEach(function (key) {
	        return options[key] = _this._getOptionByMod(key, i, store);
	      });
	      return options;
	    }
	    /*
	      Method to get total child modules quantity.
	      @param  {String} Name of quantifier in options hash.
	      @param  {Object} Options hash object.
	      @return {Number} Number of child object that should be defined.
	    */

	  }, {
	    key: '_getChildQuantity',
	    value: function _getChildQuantity(name, store) {
	      // if number was set
	      if (typeof name === 'number') {
	        return name;
	      }

	      var quantifier = store[name];
	      if (_h2.default.isArray(quantifier)) {
	        return quantifier.length;
	      } else if (quantifier + '' === '[object NodeList]') {
	        return quantifier.length;
	      } else if (quantifier + '' === '[object HTMLCollection]') {
	        return Array.prototype.slice.call(quantifier, 0).length;
	      } else if (quantifier instanceof HTMLElement) {
	        return 1;
	      } else if (typeof quantifier == 'string') {
	        return 1;
	      }
	    }

	    /*
	      Method to create timeline.
	      @param {Object} Options. ** default ** empty object.
	    */

	  }, {
	    key: '_createTimeline',
	    value: function _createTimeline() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      this.timeline = new _timeline2.default({
	        onStart: options.onStaggerStart,
	        onUpdate: options.onStaggerUpdate,
	        onComplete: options.onStaggerComplete,
	        onReverseComplete: options.onStaggerReverseComplete,
	        delay: options.moduleDelay
	      });
	    }

	    /*
	      Method to make stagger form options
	      @param {Object} Options.
	      @param {Object} Child class.
	    */

	  }, {
	    key: 'init',
	    value: function init(options, Module) {
	      var count = this._getChildQuantity(options.quantifier || 'el', options);
	      this._createTimeline(options);this.childModules = [];
	      for (var i = 0; i < count; i++) {
	        // get child module's option
	        var option = this._getOptionByIndex(i, options);option.isRunLess = true;
	        // create child module
	        var module = new Module(option);this.childModules.push(module);
	        // add child module's timeline to the self timeline
	        this.timeline.add(module);
	      }
	      return this;
	    }
	    /*
	      Method to start timeline.
	    */

	  }, {
	    key: 'run',
	    value: function run() {
	      this.timeline.play();
	    }
	  }]);
	  return Stagger;
	}();

	module.exports = function (Module) {
	  return function (options) {
	    return new Stagger(options, Module);
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(17);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(18);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _h = __webpack_require__(10);

	var _h2 = _interopRequireDefault(_h);

	var _tween = __webpack_require__(4);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(5);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  Class for toggling opacity on bunch of elements
	  @class Spriter
	  @todo
	    - add isForce3d option
	    - add run new option merging
	    - add then chains
	*/

	var Spriter = function () {
	  (0, _createClass3.default)(Spriter, [{
	    key: '_declareDefaults',

	    /*
	      Defaults/APIs
	    */
	    value: function _declareDefaults() {
	      this._defaults = {
	        /*
	          Duration
	          @property duration
	          @type     {Number}
	        */
	        duration: 500,
	        /*
	          Delay
	          @property delay
	          @type     {Number}
	        */
	        delay: 0,
	        /*
	          Easing. Please see the 
	          [timeline module parseEasing function](timeline.coffee.html#parseEasing)
	          for all avaliable options.
	            @property easing
	          @type     {String, Function}
	        */
	        easing: 'linear.none',
	        /*
	          Repeat times count
	          
	          @property repeat
	          @type     {Number}
	        */
	        repeat: 0,
	        /*
	          Yoyo option defines if animation should be altered on repeat.
	          
	          @property yoyo
	          @type     {Boolean}
	        */
	        yoyo: false,
	        /*
	          isRunLess option prevents animation from running immediately after
	          initialization.
	          
	          @property isRunLess
	          @type     {Boolean}
	        */
	        isRunLess: false,
	        /*
	          isShowEnd option defines if the last frame should be shown when
	          animation completed.
	          
	          @property isShowEnd
	          @type     {Boolean}
	        */
	        isShowEnd: false,
	        /*
	          onStart callback will be called once on animation start.
	          
	          @property onStart
	          @type     {Function}
	        */
	        onStart: null,
	        /*
	          onUpdate callback will be called on every frame of the animation.
	          The current progress in range **[0,1]** will be passed to the callback.
	          
	          @property onUpdate
	          @type     {Function}
	        */
	        onUpdate: null,
	        /*
	          onComplete callback will be called once on animation complete.
	          
	          @property onComplete
	          @type     {Function}
	        */
	        onComplete: null
	      };
	    }
	  }]);

	  function Spriter() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Spriter);

	    this.o = o;
	    if (!this.o.el) {
	      return _h2.default.error('No "el" option specified, aborting');
	    }
	    this._vars();this._declareDefaults();this._extendDefaults();this._parseFrames();
	    if (this._frames.length <= 2) _h2.default.warn('Spriter: only ' + this._frames.length + ' frames found');
	    if (this._frames.length < 1) _h2.default.error("Spriter: there is no frames to animate, aborting");
	    this._createTween();
	    return this;
	  }
	  /*
	    Method to declare some variables.
	    
	    @method run
	    @param  {Object} New options
	    @todo   Implement new object merging
	  */


	  (0, _createClass3.default)(Spriter, [{
	    key: '_vars',
	    value: function _vars() {
	      this._props = _h2.default.cloneObj(this.o);
	      this.el = this.o.el;
	      this._frames = [];
	    }
	    /*
	      Method to run the spriter on demand.
	      
	      @method run
	      @param  {Object} New options
	      @todo   Implement new object merging
	    */

	  }, {
	    key: 'run',
	    value: function run(o) {
	      return this.timeline.play();
	    }
	    /*
	      Method to extend _props by options(this.o)
	      
	      @method _extendDefaults
	    */

	  }, {
	    key: '_extendDefaults',
	    value: function _extendDefaults() {
	      return _h2.default.extend(this._props, this._defaults);
	    }
	    /*
	      Method to parse frames as child nodes of el.
	      
	      @method _parseFrames
	    */

	  }, {
	    key: '_parseFrames',
	    value: function _parseFrames() {
	      this._frames = Array.prototype.slice.call(this.el.children, 0);
	      this._frames.forEach(function (frame, i) {
	        return frame.style.opacity = 0;
	      });
	      this._frameStep = 1 / this._frames.length;
	    }

	    /*
	      Method to create tween and timeline and supply callbacks.
	      
	      @method _createTween
	    */

	  }, {
	    key: '_createTween',
	    value: function _createTween() {
	      var _this = this;

	      this._tween = new _tween2.default({
	        duration: this._props.duration,
	        delay: this._props.delay,
	        yoyo: this._props.yoyo,
	        repeat: this._props.repeat,
	        easing: this._props.easing,
	        onStart: function onStart() {
	          return _this._props.onStart && _this._props.onStart();
	        },
	        onComplete: function onComplete() {
	          return _this._props.onComplete && _this._props.onComplete();
	        },
	        onUpdate: function onUpdate(p) {
	          return _this._setProgress(p);
	        }
	      });
	      this.timeline = new _timeline2.default();this.timeline.add(this._tween);
	      if (!this._props.isRunLess) this._startTween();
	    }

	    /*
	      Method to start tween
	      
	      @method _startTween
	    */

	  }, {
	    key: '_startTween',
	    value: function _startTween() {
	      var _this2 = this;

	      setTimeout(function () {
	        return _this2.timeline.play();
	      }, 1);
	    }
	    /*
	      Method to set progress of the sprite
	      
	      @method _setProgress
	      @param  {Number} Progress in range **[0,1]**
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(p) {
	      // get the frame number
	      var proc = Math.floor(p / this._frameStep);
	      // react only if frame changes
	      if (this._prevFrame != this._frames[proc]) {
	        // if previous frame isnt current one, hide it
	        if (this._prevFrame) {
	          this._prevFrame.style.opacity = 0;
	        }
	        // if end of animation and isShowEnd flag was specified
	        // then show the last frame else show current frame
	        var currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;
	        // show the current frame
	        if (this._frames[currentNum]) {
	          this._frames[currentNum].style.opacity = 1;
	        }
	        // set previous frame as current
	        this._prevFrame = this._frames[proc];
	      }
	      if (this._props.onUpdate) {
	        this._props.onUpdate(p);
	      }
	    }
	  }]);
	  return Spriter;
	}();

	exports.default = Spriter;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(9);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(17);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(18);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _tweener = __webpack_require__(6);

	var _tweener2 = _interopRequireDefault(_tweener);

	var _easing = __webpack_require__(16);

	var _easing2 = _interopRequireDefault(_easing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import h from '../h';


	var Tween = function () {
	  (0, _createClass3.default)(Tween, [{
	    key: '_declareDefaults',

	    /*
	      Method do declare defaults with this._defaults object.
	      @private
	    */
	    value: function _declareDefaults() {
	      // DEFAULTS
	      this._defaults = {
	        /* duration of the tween [0..∞] */
	        duration: 600,
	        /* delay of the tween [-∞..∞] */
	        delay: 0,
	        /* repeat of the tween [0..∞], means how much to
	           repeat the tween regardless first run,
	           for instance repeat: 2 will make the tween run 3 times */
	        repeat: 0,
	        /* speed of playback [0..∞], speed that is less then 1
	           will slowdown playback, for instance .5 will make tween
	           run 2x slower. Speed of 2 will speedup the tween to 2x. */
	        speed: 1,
	        /*  flip onUpdate's progress on each even period.
	            note that callbacks order won't flip at least
	            for now (under consideration). */
	        yoyo: false,
	        /* easing for the tween, could be any easing type [link to easing-types.md] */
	        easing: 'Linear.None',
	        /* custom tween's name */
	        name: null,
	        /* custom tween's base name */
	        nameBase: 'Tween',
	        /*
	          onProgress callback runs before any other callback.
	          @param {Number}   The entire, not eased, progress
	                            of the tween regarding repeat option.
	          @param {Boolean}  The direction of the tween.
	                            `true` for forward direction.
	                            `false` for backward direction(tween runs in reverse).
	        */
	        onProgress: null,
	        /*
	          onStart callback runs on very start of the tween just after onProgress
	          one. Runs on very end of the tween if tween is reversed.
	          @param {Boolean}  Direction of the tween.
	                            `true` for forward direction.
	                            `false` for backward direction(tween runs in reverse).
	        */
	        onStart: null,
	        onComplete: null,
	        onRepeatStart: null,
	        onRepeatComplete: null,
	        onFirstUpdate: null,
	        onUpdate: null,
	        isChained: false
	      };
	    }
	    /*
	      API method to run the Tween.
	      @public
	      @param  {Number} Shift time in milliseconds.
	      @return {Object} Self.
	    */

	  }, {
	    key: 'play',
	    value: function play() {
	      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      if (this._state === 'play' && this._isRunning) {
	        return false;
	      }
	      this._props.isReversed = false;
	      this._subPlay(shift, 'play');
	      this._setPlaybackState('play');
	      return this;
	    }
	    /*
	      API method to run the Tween in reverse.
	      @public
	      @param  {Number} Shift time in milliseconds.
	      @return {Object} Self.
	    */

	  }, {
	    key: 'playBackward',
	    value: function playBackward() {
	      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      if (this._state === 'reverse' && this._isRunning) {
	        return false;
	      }
	      this._props.isReversed = true;
	      this._subPlay(shift, 'reverse');
	      this._setPlaybackState('reverse');
	      // reset previous time cache
	      return this;
	    }
	    /*
	      API method to stop the Tween.
	      @public
	      @param   {Number} Progress [0..1] to set when stopped.
	      @returns {Object} Self.
	    */

	  }, {
	    key: 'stop',
	    value: function stop(progress) {
	      if (this._state === 'stop') {
	        return;
	      }
	      this._props.isReversed = false;
	      this._removeFromTweener();
	      // if progress passed - use it
	      var stopProc = progress != null ? progress
	      /* if no progress passsed - set 1 if tween
	         is playingBackward, otherwise set to 0 */
	      : this._state === 'reverse' ? 1 : 0;
	      this.setProgress(stopProc);
	      this._setPlaybackState('stop');
	      this._prevTime = null;
	      return this;
	    }
	    /*
	      API method to pause Tween.
	      @public
	      @returns {Object} Self.
	    */

	  }, {
	    key: 'pause',
	    value: function pause() {
	      this._removeFromTweener();
	      this._setPlaybackState('pause');
	      return this;
	    }
	    /*
	      API method to set total progress on timeline.
	      @public
	      @param {Number} Progress to set.
	      @returns {Object} Self.
	    */

	  }, {
	    key: 'setProgress',
	    value: function setProgress(progress) {
	      var p = this._props;
	      // set start time if there is no one yet.
	      !p.startTime && this._setStartTime();
	      // reset play time
	      this._playTime = null;
	      // progress should be in range of [0..1]
	      progress < 0 && (progress = 0);
	      progress > 1 && (progress = 1);
	      // update self with calculated time
	      this._update(p.startTime - p.delay + progress * p.repeatTime);
	      return this;
	    }

	    /*
	      API ^
	      PRIVATE METHODS v
	    */

	    /*
	      Method to launch play. Used as launch
	      method for bothplay and reverse methods.
	      @private
	      @param  {Number} Shift time in milliseconds.
	      @param  {String} Play or reverse state.
	      @return {Object} Self.
	    */

	  }, {
	    key: '_subPlay',
	    value: function _subPlay() {
	      var shift = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var state = arguments[1];

	      var resumeTime,
	          startTime,
	          p = this._props,

	      // check if direction of playback changes,
	      // if so, the _progressTime needs to be flipped
	      _state = this._state,
	          _prevState = this._prevState,
	          isPause = _state === 'pause',
	          wasPlay = _state === 'play' || isPause && _prevState === 'play',
	          wasReverse = _state === 'reverse' || isPause && _prevState === 'reverse',
	          isFlip = wasPlay && state === 'reverse' || wasReverse && state === 'play';

	      // if tween was ended, set progress to 0 if not, set to elapsed progress
	      this._progressTime = this._progressTime >= p.repeatTime ? 0 : this._progressTime;
	      // flip the _progressTime if playback direction changed
	      if (isFlip) {
	        this._progressTime = p.repeatTime - this._progressTime;
	      }
	      // get current moment as resume time
	      this._resumeTime = performance.now();
	      // set start time regarding passed `shift` and `procTime`
	      this._setStartTime(this._resumeTime - Math.abs(shift) - this._progressTime, false, state);
	      // if we have prevTime - we need to normalize
	      // it for the current resume time
	      if (this._prevTime != null) {
	        this._prevTime = state === 'play' ? this._normPrevTimeForward() : p.endTime - this._progressTime;
	      }
	      // add self to tweener = play
	      _tweener2.default.add(this);
	      return this;
	    }

	    /*
	      Method recalculate _prevTime for forward direction.
	      @private
	      @return {Number} Normalized prev time.
	    */

	  }, {
	    key: '_normPrevTimeForward',
	    value: function _normPrevTimeForward() {
	      var p = this._props;return p.startTime + this._progressTime - p.delay;
	    }

	    /*
	      Constructor of the class.
	      @private
	    */

	  }]);

	  function Tween() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Tween);

	    this.o = o;
	    this._declareDefaults();this._extendDefaults();this._vars();
	    this._props.name == null && this._setSelfName();
	    return this;
	  }
	  /*
	    Method to set self name to generic one.
	    @private
	  */


	  (0, _createClass3.default)(Tween, [{
	    key: '_setSelfName',
	    value: function _setSelfName() {
	      var globalName = '_' + this._props.nameBase + 's';
	      // track amount of tweens globally
	      _tweener2.default[globalName] = _tweener2.default[globalName] == null ? 1 : ++_tweener2.default[globalName];
	      // and set generic tween's name  || Tween # ||
	      this._props.name = this._props.nameBase + ' ' + _tweener2.default[globalName];
	    }
	    /*
	      Method set playback state string.
	      @private
	      @param {String} State name
	    */

	  }, {
	    key: '_setPlaybackState',
	    value: function _setPlaybackState(state) {
	      // save previous state
	      this._prevState = this._state;
	      this._state = state;
	    }
	    /*
	      Method to declare some vars.
	      @private
	    */

	  }, {
	    key: '_vars',
	    value: function _vars() {
	      this.progress = 0;
	      this._prevTime = null;
	      this._progressTime = 0;
	      this._negativeShift = 0;
	      this._state = 'stop';
	      // if negative delay was specified,
	      // save it to _negativeShift property and
	      // reset it back to 0
	      if (this._props.delay < 0) {
	        this._negativeShift = this._props.delay;
	        this._props.delay = 0;
	      }

	      return this._calcDimentions();
	    }
	    /*
	      Method to calculate tween's dimentions.
	      @private
	    */

	  }, {
	    key: '_calcDimentions',
	    value: function _calcDimentions() {
	      this._props.time = this._props.duration + this._props.delay;
	      this._props.repeatTime = this._props.time * (this._props.repeat + 1);
	    }
	    /*
	      Method to extend defaults by options and put them in _props.
	      @private
	    */

	  }, {
	    key: '_extendDefaults',
	    value: function _extendDefaults() {
	      this._props = {};
	      for (var key in this._defaults) {
	        // borrow hasOwnProperty function
	        if (Object.hasOwnProperty.call(this._defaults, key)) {
	          var value = this._defaults[key];
	          this._props[key] = this.o[key] != null ? this.o[key] : value;
	        }
	      }
	      this._props.easing = _easing2.default.parseEasing(this.o.easing || this._defaults.easing);
	      this.onUpdate = this._props.onUpdate;
	    }
	    /*
	      Method for setting start and end time to props.
	      @private
	      @param {Number(Timestamp)}, {Null} Start time.
	      @param {Boolean} Should reset flags.
	      @returns this
	    */

	  }, {
	    key: '_setStartTime',
	    value: function _setStartTime(time) {
	      var isResetFlags = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var p = this._props,
	          shiftTime = p.shiftTime || 0;
	      // reset flags
	      if (isResetFlags) {
	        this._isCompleted = false;this._isRepeatCompleted = false;
	        this._isStarted = false;
	      }
	      // set start time to passed time or to the current moment
	      var startTime = time == null ? performance.now() : time;
	      // calculate bounds
	      // - negativeShift is negative delay in options hash
	      // - shift time is shift of the parent
	      p.startTime = startTime + p.delay + this._negativeShift + shiftTime;
	      p.endTime = p.startTime + p.repeatTime - p.delay;
	      // set play time to the startTime
	      // if playback controls are used - use _resumeTime as play time, else use startTime
	      this._playTime = this._resumeTime != null ? this._resumeTime : startTime;
	      this._resumeTime = null;

	      return this;
	    }
	    /*
	      Method to update tween's progress.
	      @private
	      @param {Number} Current update time.
	      -- next params only present when parent Timeline calls the method.
	      @param {Number} Previous Timeline's update time.
	      @param {Boolean} Was parent in yoyo period.
	      @param {Number} [-1, 0, 1] If update is on edge.
	                     -1 = edge jump in negative direction.
	                      0 = no edge jump.
	                      1 = edge jump in positive direction.
	    */

	  }, {
	    key: '_update',
	    value: function _update(time, timelinePrevTime, wasYoyo, onEdge) {
	      var p = this._props;
	      // if we don't the _prevTime thus the direction we are heading to,
	      // but prevTime was passed thus we are child of a Timeline
	      // set _prevTime to passed one and pretent that there was unknown
	      // update to not to block start/complete callbacks
	      if (this._prevTime == null && timelinePrevTime != null) {
	        this._prevTime = timelinePrevTime;
	        this._wasUknownUpdate = true;
	      }

	      // cache vars
	      var startPoint = p.startTime - p.delay;
	      // if speed param was defined - calculate
	      // new time regarding speed
	      if (p.speed && this._playTime) {
	        // play point + ( speed * delta )
	        time = this._playTime + p.speed * (time - this._playTime);
	      }

	      // // if end time(with precision issue fix)
	      // // and already completed then return immediately
	      // var isEnded = Math.abs(time - this._props.endTime) < .000000000001;
	      // if ( isEnded && ( time < this._prevTime ) && ( this._isCompleted || this._isStarted ) ) { return; }

	      // if parent is onEdge but not very start nor very end
	      if (onEdge && wasYoyo != null) {
	        var T = this._getPeriod(time),
	            isYoyo = !!(p.yoyo && this._props.repeat && T % 2 === 1);
	        // forward edge direction
	        if (onEdge === 1) {
	          // jumped from yoyo period?
	          if (wasYoyo) {
	            this._prevTime = time + 1;
	            this._repeatStart(time, isYoyo);
	            this._start(time, isYoyo);
	          } else {
	            this._prevTime = time - 1;
	            this._repeatComplete(time, isYoyo);
	            this._complete(time, isYoyo);
	          }
	          // backward edge direction
	        } else if (onEdge === -1) {
	            // jumped from yoyo period?
	            if (wasYoyo) {
	              this._prevTime = time - 1;
	              this._repeatComplete(time, isYoyo);
	              this._complete(time, isYoyo);
	            } else {
	              this._prevTime = time + 1;
	              this._repeatStart(time, isYoyo);
	              this._start(time, isYoyo);
	            }
	          }
	        // reset the _prevTime === drop one frame to undestand
	        // where we are heading
	        this._prevTime = null;
	      }
	      // if in active area and not ended - save progress time
	      // for pause/play purposes.
	      if (time > startPoint && time < p.endTime) {
	        this._progressTime = time - startPoint;
	      }
	      // else if not started or ended set progress time to 0
	      else if (time <= startPoint) {
	          this._progressTime = 0;
	        } else if (time >= p.endTime) {
	          // set progress time to repeat time + tiny cofficient
	          // to make it extend further than the end time
	          this._progressTime = p.repeatTime + .00000000001;
	        }
	      // reverse time if _props.isReversed is set
	      if (p.isReversed) {
	        time = p.endTime - this._progressTime;
	      }
	      // We need to know what direction we are heading to,
	      // so if we don't have the previous update value - this is very first
	      // update, - skip it entirely and wait for the next value
	      if (this._prevTime === null) {
	        this._prevTime = time;
	        this._wasUknownUpdate = true;
	        return false;
	      }

	      // this._visualizeProgress(time);

	      // ====== AFTER SKIPPED FRAME ======

	      // handle onProgress callback
	      if (time >= startPoint && time <= p.endTime) {
	        this._progress((time - startPoint) / p.repeatTime, time);
	      }
	      /*
	        if time is inside the active area of the tween.
	        active area is the area from start time to end time,
	        with all the repeat and delays in it
	      */
	      if (time >= p.startTime && time <= p.endTime) {
	        this._updateInActiveArea(time);
	      } else {
	        this._isInActiveArea && this._updateInInactiveArea(time);
	      }
	      this._prevTime = time;
	      return time >= p.endTime || time <= startPoint;
	    }
	    /*
	      Method to handle tween's progress in inactive area.
	      @private
	      @param {Number} Current update time.
	    */

	  }, {
	    key: '_updateInInactiveArea',
	    value: function _updateInInactiveArea(time) {
	      if (!this._isInActiveArea) {
	        return;
	      }
	      var p = this._props;

	      // complete if time is larger then end time
	      if (time > p.endTime && !this._isCompleted) {
	        this._progress(1, time);
	        // get period number
	        var T = this._getPeriod(p.endTime),
	            isYoyo = p.yoyo && T % 2 === 0;

	        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
	        this._repeatComplete(time, isYoyo);
	        this._complete(time, isYoyo);
	      }
	      // if was active and went to - inactive area "-"
	      if (time < this._prevTime && time < p.startTime && !this._isStarted) {
	        // if was in active area and didn't fire onStart callback
	        this._progress(0, time, false);
	        this._setProgress(0, time, false);
	        this._isRepeatStart = false;
	        this._repeatStart(time, false);
	        this._start(time, false);
	      }
	      this._isInActiveArea = false;
	    }
	    /*
	      Method to handle tween's progress in active area.
	      @private
	      @param {Number} Current update time.
	    */

	  }, {
	    key: '_updateInActiveArea',
	    value: function _updateInActiveArea(time) {

	      var props = this._props,
	          delayDuration = props.delay + props.duration,
	          startPoint = props.startTime - props.delay,
	          elapsed = (time - props.startTime + props.delay) % delayDuration,
	          TCount = Math.round((props.endTime - props.startTime + props.delay) / delayDuration),
	          T = this._getPeriod(time),
	          TValue = this._delayT,
	          prevT = this._getPeriod(this._prevTime),
	          TPrevValue = this._delayT;

	      // "zero" and "one" value regarding yoyo and it's period
	      var isYoyo = props.yoyo && T % 2 === 1,
	          isYoyoPrev = props.yoyo && prevT % 2 === 1,
	          yoyoZero = isYoyo ? 1 : 0,
	          yoyoOne = 1 - yoyoZero;

	      if (time === this._props.endTime) {
	        this._wasUknownUpdate = false;
	        // if `time` is equal to `endTime`, T represents the next period,
	        // so we need to decrement T and calculate "one" value regarding yoyo
	        var isYoyo = props.yoyo && (T - 1) % 2 === 1;
	        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
	        if (time > this._prevTime) {
	          this._isRepeatCompleted = false;
	        }
	        this._repeatComplete(time, isYoyo);
	        return this._complete(time, isYoyo);
	      }

	      // reset callback flags
	      this._isCompleted = false;
	      // if time is inside the duration area of the tween
	      if (startPoint + elapsed >= props.startTime) {
	        this._isInActiveArea = true;this._isRepeatCompleted = false;
	        this._isRepeatStart = false;this._isStarted = false;
	        // active zone or larger then end
	        var elapsed2 = (time - props.startTime) % delayDuration,
	            proc = elapsed2 / props.duration;
	        // |=====|=====|=====| >>>
	        //      ^1^2
	        var isOnEdge = T > 0 && prevT < T;
	        // |=====|=====|=====| <<<
	        //      ^2^1
	        var isOnReverseEdge = prevT > T;

	        // for use in timeline
	        this._onEdge = 0;
	        isOnEdge && (this._onEdge = 1);
	        isOnReverseEdge && (this._onEdge = -1);

	        if (this._wasUknownUpdate) {
	          if (time > this._prevTime) {
	            this._start(time, isYoyo);
	            this._repeatStart(time, isYoyo);
	            this._firstUpdate(time, isYoyo);
	          }
	          if (time < this._prevTime) {
	            this._complete(time, isYoyo);
	            this._repeatComplete(time, isYoyo);
	            this._firstUpdate(time, isYoyo);
	            // reset isCompleted immediately
	            this._isCompleted = false;
	          }
	        }

	        if (isOnEdge) {
	          // if not just after delay
	          // |---=====|---=====|---=====| >>>
	          //            ^1 ^2
	          // because we have already handled
	          // 1 and onRepeatComplete in delay gap
	          if (this.progress !== 1) {
	            // prevT
	            var isThisYoyo = props.yoyo && (T - 1) % 2 === 1;
	            this._repeatComplete(time, isThisYoyo);
	          }
	          // if on edge but not at very start
	          // |=====|=====|=====| >>>
	          // ^!    ^here ^here
	          if (prevT >= 0) {
	            this._repeatStart(time, isYoyo);
	          }
	        }

	        if (time > this._prevTime) {
	          //  |=====|=====|=====| >>>
	          // ^1  ^2
	          if (!this._isStarted && this._prevTime <= props.startTime) {
	            this._start(time, isYoyo);
	            this._repeatStart(time, isYoyo);
	            // it was zero anyways

	            // restart flags immediately in case if we will
	            // return to '-' inactive area on the next step
	            this._isStarted = false;
	            this._isRepeatStart = false;
	          }
	          this._firstUpdate(time, isYoyo);
	        }

	        if (isOnReverseEdge) {
	          // if on edge but not at very end
	          // |=====|=====|=====| <<<
	          //       ^here ^here ^not here
	          if (this.progress !== 0 && this.progress !== 1 && prevT != TCount) {
	            this._repeatStart(time, isYoyoPrev);
	          }
	          // if on very end edge
	          // |=====|=====|=====| <<<
	          //       ^!    ^! ^2 ^1
	          // we have handled the case in this._wasUknownUpdate
	          // block so filter that
	          if (prevT === TCount && !this._wasUknownUpdate) {
	            this._complete(time, isYoyo);
	            this._repeatComplete(time, isYoyo);
	            this._firstUpdate(time, isYoyo);
	            // reset isComplete flag call
	            // cuz we returned to active area
	            // this._isRepeatCompleted = false;
	            this._isCompleted = false;
	          }
	          this._repeatComplete(time, isYoyo);
	        }

	        if (prevT === 'delay') {
	          // if just before delay gap
	          // |---=====|---=====|---=====| <<<
	          //               ^2    ^1
	          if (T < TPrevValue) {
	            this._repeatComplete(time, isYoyo);
	          }
	          // if just after delay gap
	          // |---=====|---=====|---=====| >>>
	          //            ^1  ^2
	          if (T === TPrevValue && T > 0) {
	            this._repeatStart(time, isYoyo);
	          }
	        }

	        // swap progress and repeatStart based on direction
	        if (time > this._prevTime) {
	          // if progress is equal 0 and progress grows
	          if (proc === 0) {
	            this._repeatStart(time, isYoyo);
	          }
	          if (time !== props.endTime) {
	            this._setProgress(isYoyo ? 1 - proc : proc, time, isYoyo);
	          }
	        } else {
	          if (time !== props.endTime) {
	            this._setProgress(isYoyo ? 1 - proc : proc, time, isYoyo);
	          }
	          // if progress is equal 0 and progress grows
	          if (proc === 0) {
	            this._repeatStart(time, isYoyo);
	          }
	        }

	        if (time === props.startTime) {
	          this._start(time, isYoyo);
	        }
	        // delay gap - react only once
	      } else if (this._isInActiveArea) {
	          // because T will be string of "delay" here,
	          // let's normalize it be setting to TValue
	          var t = T === 'delay' ? TValue : T,
	              isGrows = time > this._prevTime;
	          // decrement period if forward direction of update
	          isGrows && t--;
	          // calculate normalized yoyoZero value
	          yoyoZero = props.yoyo && t % 2 === 1 ? 1 : 0;
	          // if was in active area and previous time was larger
	          // |---=====|---=====|---=====| <<<
	          //   ^2 ^1    ^2 ^1    ^2 ^1
	          if (time < this._prevTime) {
	            this._setProgress(yoyoZero, time, yoyoZero === 1);
	            this._repeatStart(time, yoyoZero === 1);
	          }
	          // set 1 or 0 regarding direction and yoyo
	          this._setProgress(isGrows ? 1 - yoyoZero : yoyoZero, time, yoyoZero === 1);
	          // if time grows
	          if (time > this._prevTime) {
	            // if reverse direction and in delay gap, then progress will be 0
	            // if so we don't need to call the onRepeatComplete callback
	            // |---=====|---=====|---=====| <<<
	            //   ^0       ^0       ^0  
	            // OR we have flipped 0 to 1 regarding yoyo option
	            if (this.progress !== 0 || yoyoZero === 1) {
	              // since we repeatComplete for previous period
	              // invert isYoyo option
	              // is elapsed is 0 - count as previous period
	              this._repeatComplete(time, yoyoZero === 1);
	            }
	          }
	          // set flag to indicate inactive area
	          this._isInActiveArea = false;
	        }
	      // we've got the first update now
	      this._wasUknownUpdate = false;
	    }
	    /*
	      Method to set property[s] on Tween
	      @private
	      @param {Object, String} Hash object of key/value pairs, or property name
	      @param {_} Property's value to set
	    */

	  }, {
	    key: '_setProp',
	    value: function _setProp(obj, value) {
	      // handle hash object case
	      if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) {
	            this._props[key] = obj[key];
	            if (key === 'easing') {
	              this._props.easing = _easing2.default.parseEasing(this._props.easing);
	            }
	          }
	        }
	        // handle key, value case
	      } else if (typeof obj === 'string') {
	          // if key is easing - parse it immediately
	          if (obj === 'easing') {
	            this._props.easing = _easing2.default.parseEasing(value);
	          }
	          // else just save it to props
	          else {
	              this._props[obj] = value;
	            }
	        }
	      this._calcDimentions();
	    }
	    /*
	      Method to remove the Tween from the tweener.
	      @private
	      @returns {Object} Self.
	    */

	  }, {
	    key: '_removeFromTweener',
	    value: function _removeFromTweener() {
	      _tweener2.default.remove(this);return this;
	    }
	    /*
	      Method to get current period number.
	      @private
	      @param {Number} Time to get the period for.
	      @returns {Number} Current period number.
	    */

	  }, {
	    key: '_getPeriod',
	    value: function _getPeriod(time) {
	      var p = this._props,
	          TTime = p.delay + p.duration,
	          dTime = p.delay + time - p.startTime,
	          T = dTime / TTime,

	      // if time if equal to endTime we need to set the elapsed
	      // time to 0 to fix the occasional precision js bug, which
	      // causes 0 to be something like 1e-12
	      elapsed = time < p.endTime ? dTime % TTime : 0;
	      // If the latest period, round the result, otherwise floor it.
	      // Basically we always can floor the result, but because of js
	      // precision issues, sometimes the result is 2.99999998 which
	      // will result in 2 instead of 3 after the floor operation.
	      T = time >= p.endTime ? Math.round(T) : Math.floor(T);
	      // if time is larger then the end time
	      if (time > p.endTime) {
	        // set equal to the periods count
	        T = Math.round((p.endTime - p.startTime + p.delay) / TTime);
	        // if in delay gap, set _delayT to current
	        // period number and return "delay"
	      } else if (elapsed > 0 && elapsed < p.delay) {
	          this._delayT = T;T = 'delay';
	        }
	      // if the end of period and there is a delay
	      return T;
	    }
	    /*
	      Method to set Tween's progress and call onUpdate callback.
	      @private
	      @param {Number} Progress to set.
	      @param {Number} Current update time.
	      @param {Boolean} Is yoyo perido. Used in Timeline to pass to Tween.
	      @returns {Object} Self.
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(p, time, isYoyo) {
	      var props = this._props,
	          isYoyoChanged = props.wasYoyo !== isYoyo;
	      this.progress = p;
	      this.easedProgress = this._props.easing(this.progress);
	      if (props.prevEasedProgress !== this.easedProgress || isYoyoChanged) {
	        if (this.onUpdate != null && typeof this.onUpdate === 'function') {
	          this.onUpdate(this.easedProgress, this.progress, time > this._prevTime, isYoyo);
	        }
	      }
	      this._props.prevEasedProgress = this.easedProgress;
	      this._props.wasYoyo = isYoyo;
	      return this;
	    }

	    /*
	      Method to set tween's state to start and call onStart callback.
	      @method _start
	      @private
	      @param {Number} Progress to set.
	      @param {Boolean} Is yoyo period.
	    */

	  }, {
	    key: '_start',
	    value: function _start(time, isYoyo) {
	      if (this._isStarted) {
	        return;
	      }
	      if (this._props.onStart != null && typeof this._props.onStart === 'function') {
	        this._props.onStart.call(this, time > this._prevTime, isYoyo);
	      }
	      this._isCompleted = false;this._isStarted = true;
	      this._isFirstUpdate = false;
	    }

	    /*
	      Method to set tween's state to complete.
	      @method _complete
	      @private
	      @param {Number} Current time.
	      @param {Boolean} Is yoyo period.
	    */

	  }, {
	    key: '_complete',
	    value: function _complete(time, isYoyo) {
	      if (this._isCompleted) {
	        return;
	      }
	      if (this._props.onComplete != null && typeof this._props.onComplete === 'function') {
	        this._props.onComplete.call(this, time > this._prevTime, isYoyo);
	      }
	      this._isCompleted = true;this._isStarted = false;
	      this._isFirstUpdate = false;
	    }

	    /*
	      Method to run onFirstUpdate callback.
	      @method _firstUpdate
	      @private
	      @param {Number} Current update time.
	      @param {Boolean} Is yoyo period.
	    */

	  }, {
	    key: '_firstUpdate',
	    value: function _firstUpdate(time, isYoyo) {
	      if (this._isFirstUpdate) {
	        return;
	      }
	      if (this._props.onFirstUpdate != null && typeof this._props.onFirstUpdate === 'function') {
	        this._props.onFirstUpdate.call(this, time > this._prevTime, isYoyo);
	      }
	      this._isFirstUpdate = true;
	    }

	    /*
	      Method call onRepeatComplete calback and set flags.
	      @private
	      @param {Number} Current update time.
	      @param {Boolean} Is repeat period.
	    */

	  }, {
	    key: '_repeatComplete',
	    value: function _repeatComplete(time, isYoyo) {
	      if (this._isRepeatCompleted) {
	        return;
	      }
	      if (this._props.onRepeatComplete != null && typeof this._props.onRepeatComplete === 'function') {
	        this._props.onRepeatComplete.call(this, time > this._prevTime, isYoyo);
	      }
	      this._isRepeatCompleted = true;
	    }

	    /*
	      Method call onRepeatStart calback and set flags.
	      @private
	      @param {Number} Current update time.
	      @param {Boolean} Is yoyo period.
	    */

	  }, {
	    key: '_repeatStart',
	    value: function _repeatStart(time, isYoyo) {
	      if (this._isRepeatStart) {
	        return;
	      }
	      if (this._props.onRepeatStart != null && typeof this._props.onRepeatStart === 'function') {
	        this._props.onRepeatStart.call(this, time > this._prevTime, isYoyo);
	      }
	      this._isRepeatStart = true;
	    }
	    /*
	      Method to launch onProgress callback.
	      @method _progress
	      @private
	      @param {Number} Progress to set.
	    */

	  }, {
	    key: '_progress',
	    value: function _progress(progress, time) {
	      if (this._props.onProgress != null && typeof this._props.onProgress === 'function') {
	        this._props.onProgress.call(this, progress, time > this._prevTime);
	      }
	    }
	    /*
	      Method which is called when the tween is removed from tweener.
	      @private
	    */

	  }, {
	    key: '_onTweenerRemove',
	    value: function _onTweenerRemove() {}
	    /*
	      Method which is called when the tween is removed
	      from tweener when finished.
	      @private
	    */

	  }, {
	    key: '_onTweenerFinish',
	    value: function _onTweenerFinish() {
	      this._setPlaybackState('stop');
	    }

	    // _visualizeProgress(time) {
	    //   var str = '|',
	    //       procStr = ' ',
	    //       p = this._props,
	    //       proc = p.startTime - p.delay;

	    //   while ( proc < p.endTime ) {
	    //     if (p.delay > 0 ) {
	    //       var newProc = proc + p.delay;
	    //       if ( time > proc && time < newProc ) {
	    //         procStr += ' ^ ';
	    //       } else {
	    //         procStr += '   ';
	    //       }
	    //       proc = newProc;
	    //       str  += '---';
	    //     }
	    //     var newProc = proc + p.duration;
	    //     if ( time > proc && time < newProc ) {
	    //       procStr += '  ^   ';
	    //     } else if (time === proc) {
	    //       procStr += '^     ';
	    //     } else if (time === newProc) {
	    //       procStr += '    ^ ';
	    //     } else {
	    //       procStr += '      ';
	    //     }
	    //     proc = newProc;
	    //     str += '=====|';
	    //   }

	    //   console.log(str);
	    //   console.log(procStr);
	    // }

	  }]);
	  return Tween;
	}();

	exports.default = Tween;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(21);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getIterator2 = __webpack_require__(22);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(17);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(23);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(18);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(19);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _get2 = __webpack_require__(24);

	var _get3 = _interopRequireDefault(_get2);

	var _h = __webpack_require__(10);

	var _h2 = _interopRequireDefault(_h);

	var _tweener = __webpack_require__(6);

	var _tweener2 = _interopRequireDefault(_tweener);

	var _tween = __webpack_require__(4);

	var _tween2 = _interopRequireDefault(_tween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Timeline = function (_Tween) {
	  (0, _inherits3.default)(Timeline, _Tween);
	  (0, _createClass3.default)(Timeline, [{
	    key: 'add',

	    /*
	      API method to add child tweens/timelines.
	      @public
	      @param {Object, Array} Tween/Timeline or an array of such.
	      @returns {Object} Self.
	    */
	    value: function add() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      this._pushTimelineArray(args);
	      this._calcDimentions();
	      return this;
	    }
	    /*
	      API method to append the Tween/Timeline to the end of the
	      timeline. Each argument is treated as a new append.
	      Array of tweens is treated as a parallel sequence. 
	      @public
	      @param {Object, Array} Tween/Timeline to append or array of such.
	      @returns {Object} Self.
	    */

	  }, {
	    key: 'append',
	    value: function append() {
	      for (var _len2 = arguments.length, timeline = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        timeline[_key2] = arguments[_key2];
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(timeline), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var tm = _step.value;

	          if (_h2.default.isArray(tm)) {
	            this._appendTimelineArray(tm);
	          } else {
	            this._appendTimeline(tm, this._timelines.length);
	          }
	          this._calcDimentions();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return this;
	    }
	    /*
	      Method to append Tween/Timeline array or mix of such.
	      @private
	      @param {Array} Array of Tweens/Timelines.
	    */

	  }, {
	    key: '_appendTimelineArray',
	    value: function _appendTimelineArray(timelineArray) {
	      var i = timelineArray.length,
	          time = this._props.repeatTime - this._props.delay,
	          len = this._timelines.length;

	      while (i--) {
	        this._appendTimeline(timelineArray[i], len, time);
	      }
	    }
	    /*
	      Method to append a single timeline to the Timeline.
	      @private
	      @param {Object} Tween/Timline to append.
	      @param {Number} Index of the append.
	      @param {Number} Shift time.
	    */

	  }, {
	    key: '_appendTimeline',
	    value: function _appendTimeline(timeline, index, time) {
	      // if timeline is a module with timeline property then extract it
	      if (timeline.timeline instanceof Timeline) {
	        timeline = timeline.timeline;
	      }

	      var shift = time != null ? time : this._props.duration;
	      shift += timeline._props.shiftTime || 0;
	      timeline.index = index;this._pushTimeline(timeline, shift);
	    }
	    /*
	      PrivateMethod to push Tween/Timeline array.
	      @private
	      @param {Array} Array of Tweens/Timelines.
	    */

	  }, {
	    key: '_pushTimelineArray',
	    value: function _pushTimelineArray(array) {
	      for (var i = 0; i < array.length; i++) {
	        var tm = array[i];
	        // recursive push to handle arrays of arrays
	        if (_h2.default.isArray(tm)) {
	          this._pushTimelineArray(tm);
	        } else {
	          this._pushTimeline(tm);
	        }
	      };
	    }
	    /*
	      Method to push a single Tween/Timeline.
	      @private
	      @param {Object} Tween or Timeline to push.
	      @param {Number} Number of milliseconds to shift the start time
	                      of the Tween/Timeline.
	    */

	  }, {
	    key: '_pushTimeline',
	    value: function _pushTimeline(timeline, shift) {
	      // if timeline is a module with timeline property then extract it
	      if (timeline.timeline instanceof Timeline) {
	        timeline = timeline.timeline;
	      }
	      // add self delay to the timeline
	      shift != null && timeline._setProp({ 'shiftTime': shift });
	      this._timelines.push(timeline);
	      this._recalcDuration(timeline);
	    }
	    /*
	      Method set progress on self and child Tweens/Timelines.
	      @private
	      @param {Number} Progress to set.
	      @param {Number} Current update time.
	    */

	  }, {
	    key: '_setProgress',
	    value: function _setProgress(progress, time, isYoyo) {
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_setProgress', this).call(this, progress, time);
	      var timeToTimelines = this._props.startTime + progress * this._props.duration,
	          i = this._timelines.length;
	      // we need to pass self previous time to children
	      // to prevent initial _wasUnknownUpdate nested waterfall
	      // if not yoyo option set, pass the previous time
	      // otherwise, pass previous or next time regarding yoyo period.
	      var coef = time > this._prevTime ? -1 : 1;
	      if (this._props.yoyo && isYoyo) {
	        coef *= -1;
	      }
	      var prevTimeToTimelines = timeToTimelines + coef;
	      while (i--) {
	        this._timelines[i]._update(timeToTimelines, prevTimeToTimelines, this._prevYoyo, this._onEdge);
	      }
	      this._prevYoyo = isYoyo;
	    }
	    /*
	      Method calculate self duration based on timeline's duration.
	      @private
	      @param {Object} Tween or Timeline to calculate.
	    */

	  }, {
	    key: '_recalcDuration',
	    value: function _recalcDuration(timeline) {
	      var p = timeline._props,
	          speedCoef = p.speed ? 1 / p.speed : 1,
	          timelineTime = speedCoef * p.repeatTime + (p.shiftTime || 0);
	      this._props.duration = Math.max(timelineTime, this._props.duration);
	    }
	    /*
	      Method calculate self duration from skretch.
	      @private
	    */

	  }, {
	    key: '_recalcTotalDuration',
	    value: function _recalcTotalDuration() {
	      var i = this._timelines.length;
	      this._props.duration = 0;
	      while (i--) {
	        this._recalcDuration(this._timelines[i]);
	      }
	    }

	    /*
	      Method set start and end times.
	      @private
	      @param {Number, Null} Time to start with.
	    */

	  }, {
	    key: '_setStartTime',
	    value: function _setStartTime(time) {
	      var isReset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_setStartTime', this).call(this, time);
	      this._startTimelines(this._props.startTime, isReset);
	    }
	    /*
	      Method calculate self duration based on timeline's duration.
	      @private
	      @param {Number, Null} Time to start with.
	    */

	  }, {
	    key: '_startTimelines',
	    value: function _startTimelines(time) {
	      var isReset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var i = this._timelines.length,
	          p = this._props,
	          timeline;
	      time == null && (time = this._props.startTime);
	      while (i--) {
	        timeline = this._timelines[i];
	        timeline._setStartTime(time, isReset);
	        // if from _subPlay and _prevTime is set
	        if (!isReset && timeline._prevTime != null) {
	          timeline._prevTime = timeline._normPrevTimeForward();
	        }
	      }
	    }
	    /*
	      Method do declare defaults by this._defaults object
	      @private
	    */

	  }, {
	    key: '_declareDefaults',
	    value: function _declareDefaults() {
	      // if duration was passed on initialization stage, warn user and reset it.
	      if (this.o.duration != null) {
	        _h2.default.error('Duration can not be declared on Timeline, but "' + this.o.duration + '" is. You probably want to use Tween instead.');
	        this.o.duration = 0;
	      }
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_declareDefaults', this).call(this);
	      // remove default
	      this._defaults.duration = 0;
	      this._defaults.nameBase = 'Timeline';
	    }
	  }]);

	  function Timeline() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Timeline);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Timeline).call(this, o));
	  }
	  /*
	    Method to declare some vars.
	    @private
	  */


	  (0, _createClass3.default)(Timeline, [{
	    key: '_vars',
	    value: function _vars() {
	      this._timelines = [];
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Timeline.prototype), '_vars', this).call(this);
	    }
	  }]);
	  return Timeline;
	}(_tween2.default);

	exports.default = Timeline;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(17);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(18);

	var _createClass3 = _interopRequireDefault(_createClass2);

	__webpack_require__(25);

	__webpack_require__(26);

	var _h = __webpack_require__(10);

	var _h2 = _interopRequireDefault(_h);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tweener = function () {
	  function Tweener() {
	    (0, _classCallCheck3.default)(this, Tweener);
	    this._vars();return this;
	  }

	  (0, _createClass3.default)(Tweener, [{
	    key: '_vars',
	    value: function _vars() {
	      this.tweens = [];this._loop = _h2.default.bind(this._loop, this);
	    }
	    /*
	      Main animation loop. Should have only one concurrent loop.
	      @private
	      @returns this
	    */

	  }, {
	    key: '_loop',
	    value: function _loop() {
	      if (!this._isRunning) {
	        return false;
	      }
	      var time = performance.now();this._update(time);
	      if (!this.tweens.length) {
	        return this._isRunning = false;
	      }
	      requestAnimationFrame(this._loop);
	      return this;
	    }
	    /*
	      Method to start animation loop.
	      @private
	    */

	  }, {
	    key: '_startLoop',
	    value: function _startLoop() {
	      if (this._isRunning) {
	        return;
	      };this._isRunning = true;
	      requestAnimationFrame(this._loop);
	    }
	    /*
	      Method to stop animation loop.
	      @private
	    */

	  }, {
	    key: '_stopLoop',
	    value: function _stopLoop() {
	      this._isRunning = false;
	    }
	    /*
	      Method to update every tween/timeline on animation frame.
	      @private
	    */

	  }, {
	    key: '_update',
	    value: function _update(time) {
	      var i = this.tweens.length;
	      while (i--) {
	        // cache the current tween
	        var tween = this.tweens[i];
	        if (tween && tween._update(time) === true) {
	          this.remove(i);
	          tween._onTweenerFinish();
	          tween._prevTime = null;
	        }
	      }
	    }
	    /*
	      Method to add a Tween/Timeline to loop pool.
	      @param {Object} Tween/Timeline to add.
	    */

	  }, {
	    key: 'add',
	    value: function add(tween) {
	      // return if tween is already running
	      if (tween._isRunning) {
	        return;
	      }
	      tween._isRunning = true;
	      this.tweens.push(tween);
	      this._startLoop();
	    }
	    /*
	      Method stop updating all the child tweens/timelines.
	      @private
	    */

	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      this.tweens.length = 0;
	    }
	    /*
	      Method to remove specific tween/timeline form updating.
	      @private
	    */

	  }, {
	    key: 'remove',
	    value: function remove(tween) {
	      var index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);

	      if (index !== -1) {
	        tween = this.tweens[index];
	        if (tween) {
	          tween._isRunning = false;
	          this.tweens.splice(index, 1);
	          tween._onTweenerRemove();
	        }
	      }
	    }
	  }]);
	  return Tweener;
	}();

	var t = new Tweener();
	exports.default = t;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(17);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(18);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _tween = __webpack_require__(4);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(5);

	var _timeline2 = _interopRequireDefault(_timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  Class to define a module ancestor
	  with timeline and tween options and functionality.
	  All runable modules should inherit from this class.

	  @class Tweenable
	*/

	var Tweenable = function () {
	  (0, _createClass3.default)(Tweenable, [{
	    key: 'play',

	    /*
	      play method for the timeline.
	      @public
	    */
	    value: function play() {
	      this._timeline.play.apply(this._timeline, arguments);
	    }
	    /*
	      playBackward method for the timeline.
	      @public
	    */

	  }, {
	    key: 'playBackward',
	    value: function playBackward() {
	      this._timeline.playBackward.apply(this._timeline, arguments);
	    }
	    /*
	      pause method for the timeline.
	      @public
	    */

	  }, {
	    key: 'pause',
	    value: function pause() {
	      this._timeline.pause.apply(this._timeline, arguments);
	    }
	    /*
	      stop method for the timeline.
	      @public
	    */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      this._timeline.stop.apply(this._timeline, arguments);
	    }
	    /*
	      setProgress method for the timeline.
	      @public
	    */

	  }, {
	    key: 'setProgress',
	    value: function setProgress() {
	      this._timeline.setProgress.apply(this._timeline, arguments);
	    }

	    // ^ API methods.
	    // v Private methods.

	  }]);

	  function Tweenable() {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Tweenable);

	    this._o = o;
	    this._transformTweenOptions();
	    this._makeTween();
	    this._makeTimeline();
	  }
	  /*
	    Placeholder method that should be overrided
	    and will be called before tween/timeline creation.
	    @private
	  */


	  (0, _createClass3.default)(Tweenable, [{
	    key: '_transformTweenOptions',
	    value: function _transformTweenOptions() {}
	    /*
	      Method to create tween.
	      @private
	    */

	  }, {
	    key: '_makeTween',
	    value: function _makeTween() {
	      this._tween = new _tween2.default(this._o);
	    }
	    /*
	      Method to create timeline.
	      @private
	      @param {Object} Timeline's options.
	                      An object which contains "timeline" property with
	                      timeline options.
	    */

	  }, {
	    key: '_makeTimeline',
	    value: function _makeTimeline() {
	      this._timeline = new _timeline2.default(this._o.timeline);
	      // if tween exist - add it to the timeline there
	      // is some modules like stagger that have no tween
	      this._tween && this._timeline.add(this._tween);
	    }
	  }]);
	  return Tweenable;
	}();

	exports.default = Tweenable;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _iterator = __webpack_require__(39);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(40);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers, h;

	Helpers = (function() {
	  Helpers.prototype.NS = 'http://www.w3.org/2000/svg';

	  Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

	  Helpers.prototype.shortColors = {
	    transparent: 'rgba(0,0,0,0)',
	    none: 'rgba(0,0,0,0)',
	    aqua: 'rgb(0,255,255)',
	    black: 'rgb(0,0,0)',
	    blue: 'rgb(0,0,255)',
	    fuchsia: 'rgb(255,0,255)',
	    gray: 'rgb(128,128,128)',
	    green: 'rgb(0,128,0)',
	    lime: 'rgb(0,255,0)',
	    maroon: 'rgb(128,0,0)',
	    navy: 'rgb(0,0,128)',
	    olive: 'rgb(128,128,0)',
	    purple: 'rgb(128,0,128)',
	    red: 'rgb(255,0,0)',
	    silver: 'rgb(192,192,192)',
	    teal: 'rgb(0,128,128)',
	    white: 'rgb(255,255,255)',
	    yellow: 'rgb(255,255,0)',
	    orange: 'rgb(255,128,0)'
	  };

	  Helpers.prototype.chainOptionMap = {
	    duration: 1,
	    delay: 1,
	    repeat: 1,
	    easing: 1,
	    yoyo: 1,
	    onStart: 1,
	    onComplete: 1,
	    onCompleteChain: 1,
	    onUpdate: 1,
	    points: 1
	  };

	  Helpers.prototype.callbacksMap = {
	    onStart: 1,
	    onComplete: 1,
	    onCompleteChain: 1,
	    onUpdate: 1
	  };

	  Helpers.prototype.tweenOptionMap = {
	    duration: 1,
	    delay: 1,
	    repeat: 1,
	    easing: 1,
	    yoyo: 1
	  };

	  Helpers.prototype.posPropsMap = {
	    left: 1,
	    top: 1,
	    x: 1,
	    y: 1,
	    burstX: 1,
	    burstY: 1,
	    burstShiftX: 1,
	    burstShiftY: 1
	  };

	  Helpers.prototype.strokeDashPropsMap = {
	    strokeDasharray: 1,
	    strokeDashoffset: 1
	  };

	  Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

	  function Helpers() {
	    this.vars();
	  }

	  Helpers.prototype.vars = function() {
	    var ua;
	    this.prefix = this.getPrefix();
	    this.getRemBase();
	    this.isFF = this.prefix.lowercase === 'moz';
	    this.isIE = this.prefix.lowercase === 'ms';
	    ua = navigator.userAgent;
	    this.isOldOpera = ua.match(/presto/gim);
	    this.isSafari = ua.indexOf('Safari') > -1;
	    this.isChrome = ua.indexOf('Chrome') > -1;
	    this.isOpera = ua.toLowerCase().indexOf("op") > -1;
	    this.isChrome && this.isSafari && (this.isSafari = false);
	    (ua.match(/PhantomJS/gim)) && (this.isSafari = false);
	    this.isChrome && this.isOpera && (this.isChrome = false);
	    this.is3d = this.checkIf3d();
	    this.uniqIDs = -1;
	    this.div = document.createElement('div');
	    return document.body.appendChild(this.div);
	  };

	  Helpers.prototype.cloneObj = function(obj, exclude) {
	    var i, key, keys, newObj;
	    keys = Object.keys(obj);
	    newObj = {};
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (exclude != null) {
	        if (!exclude[key]) {
	          newObj[key] = obj[key];
	        }
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	    return newObj;
	  };

	  Helpers.prototype.extend = function(objTo, objFrom) {
	    var key, value;
	    for (key in objFrom) {
	      value = objFrom[key];
	      if (objTo[key] == null) {
	        objTo[key] = objFrom[key];
	      }
	    }
	    return objTo;
	  };

	  Helpers.prototype.getRemBase = function() {
	    var html, style;
	    html = document.querySelector('html');
	    style = getComputedStyle(html);
	    return this.remBase = parseFloat(style.fontSize);
	  };

	  Helpers.prototype.clamp = function(value, min, max) {
	    if (value < min) {
	      return min;
	    } else if (value > max) {
	      return max;
	    } else {
	      return value;
	    }
	  };

	  Helpers.prototype.setPrefixedStyle = function(el, name, value) {
	    if (name.match(/transform/gim)) {
	      el.style["" + name] = value;
	      return el.style["" + this.prefix.css + name] = value;
	    } else {
	      return el.style[name] = value;
	    }
	  };

	  Helpers.prototype.style = function(el, name, value) {
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setPrefixedStyle(el, key, value));
	      }
	      return results;
	    } else {
	      return this.setPrefixedStyle(el, name, value);
	    }
	  };

	  Helpers.prototype.prepareForLog = function(args) {
	    args = Array.prototype.slice.apply(args);
	    args.unshift('::');
	    args.unshift(this.logBadgeCss);
	    args.unshift('%cmo·js%c');
	    return args;
	  };

	  Helpers.prototype.log = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.log.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.warn = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.warn.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.error = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.error.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.parseUnit = function(value) {
	    var amount, isStrict, ref, regex, returnVal, unit;
	    if (typeof value === 'number') {
	      return returnVal = {
	        unit: 'px',
	        isStrict: false,
	        value: value,
	        string: value + "px"
	      };
	    } else if (typeof value === 'string') {
	      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
	      unit = (ref = value.match(regex)) != null ? ref[0] : void 0;
	      isStrict = true;
	      if (!unit) {
	        unit = 'px';
	        isStrict = false;
	      }
	      amount = parseFloat(value);
	      return returnVal = {
	        unit: unit,
	        isStrict: isStrict,
	        value: amount,
	        string: "" + amount + unit
	      };
	    }
	    return value;
	  };

	  Helpers.prototype.bind = function(func, context) {
	    var bindArgs, wrapper;
	    wrapper = function() {
	      var args, unshiftArgs;
	      args = Array.prototype.slice.call(arguments);
	      unshiftArgs = bindArgs.concat(args);
	      return func.apply(context, unshiftArgs);
	    };
	    bindArgs = Array.prototype.slice.call(arguments, 2);
	    return wrapper;
	  };

	  Helpers.prototype.getRadialPoint = function(o) {
	    var point, radAngle, radiusX, radiusY;
	    if (o == null) {
	      o = {};
	    }
	    if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
	      return;
	    }
	    radAngle = (o.angle - 90) * (Math.PI / 180);
	    radiusX = o.radiusX != null ? o.radiusX : o.radius;
	    radiusY = o.radiusY != null ? o.radiusY : o.radius;
	    return point = {
	      x: o.center.x + (Math.cos(radAngle) * radiusX),
	      y: o.center.y + (Math.sin(radAngle) * radiusY)
	    };
	  };

	  Helpers.prototype.getPrefix = function() {
	    var dom, pre, styles, v;
	    styles = window.getComputedStyle(document.documentElement, "");
	    v = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/);
	    pre = (v || (styles.OLink === "" && ["", "o"]))[1];
	    dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
	    return {
	      dom: dom,
	      lowercase: pre,
	      css: "-" + pre + "-",
	      js: pre[0].toUpperCase() + pre.substr(1)
	    };
	  };

	  Helpers.prototype.strToArr = function(string) {
	    var arr;
	    arr = [];
	    if (typeof string === 'number' && !isNaN(string)) {
	      arr.push(this.parseUnit(string));
	      return arr;
	    }
	    string.trim().split(/\s+/gim).forEach((function(_this) {
	      return function(str) {
	        return arr.push(_this.parseUnit(_this.parseIfRand(str)));
	      };
	    })(this));
	    return arr;
	  };

	  Helpers.prototype.calcArrDelta = function(arr1, arr2) {
	    var delta, i, j, len1, num;
	    delta = [];
	    for (i = j = 0, len1 = arr1.length; j < len1; i = ++j) {
	      num = arr1[i];
	      delta[i] = this.parseUnit("" + (arr2[i].value - arr1[i].value) + arr2[i].unit);
	    }
	    return delta;
	  };

	  Helpers.prototype.isArray = function(variable) {
	    return variable instanceof Array;
	  };

	  Helpers.prototype.normDashArrays = function(arr1, arr2) {
	    var arr1Len, arr2Len, currItem, i, j, k, lenDiff, ref, ref1, startI;
	    arr1Len = arr1.length;
	    arr2Len = arr2.length;
	    if (arr1Len > arr2Len) {
	      lenDiff = arr1Len - arr2Len;
	      startI = arr2.length;
	      for (i = j = 0, ref = lenDiff; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        currItem = i + startI;
	        arr2.push(this.parseUnit("0" + arr1[currItem].unit));
	      }
	    } else if (arr2Len > arr1Len) {
	      lenDiff = arr2Len - arr1Len;
	      startI = arr1.length;
	      for (i = k = 0, ref1 = lenDiff; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
	        currItem = i + startI;
	        arr1.push(this.parseUnit("0" + arr2[currItem].unit));
	      }
	    }
	    return [arr1, arr2];
	  };

	  Helpers.prototype.makeColorObj = function(color) {
	    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor;
	    if (color[0] === '#') {
	      result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
	      colorObj = {};
	      if (result) {
	        r = result[1].length === 2 ? result[1] : result[1] + result[1];
	        g = result[2].length === 2 ? result[2] : result[2] + result[2];
	        b = result[3].length === 2 ? result[3] : result[3] + result[3];
	        colorObj = {
	          r: parseInt(r, 16),
	          g: parseInt(g, 16),
	          b: parseInt(b, 16),
	          a: 1
	        };
	      }
	    }
	    if (color[0] !== '#') {
	      isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
	      if (isRgb) {
	        rgbColor = color;
	      }
	      if (!isRgb) {
	        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.computedStyle(this.div).color) : this.shortColors[color];
	      }
	      regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
	      regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
	      result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
	      colorObj = {};
	      alpha = parseFloat(result[4] || 1);
	      if (result) {
	        colorObj = {
	          r: parseInt(result[1], 10),
	          g: parseInt(result[2], 10),
	          b: parseInt(result[3], 10),
	          a: (alpha != null) && !isNaN(alpha) ? alpha : 1
	        };
	      }
	    }
	    return colorObj;
	  };

	  Helpers.prototype.computedStyle = function(el) {
	    return getComputedStyle(el);
	  };

	  Helpers.prototype.capitalize = function(str) {
	    if (typeof str !== 'string') {
	      throw Error('String expected - nothing to capitalize');
	    }
	    return str.charAt(0).toUpperCase() + str.substring(1);
	  };

	  Helpers.prototype.parseRand = function(string) {
	    var rand, randArr, units;
	    randArr = string.split(/rand\(|\,|\)/);
	    units = this.parseUnit(randArr[2]);
	    rand = this.rand(parseFloat(randArr[1]), parseFloat(randArr[2]));
	    if (units.unit && randArr[2].match(units.unit)) {
	      return rand + units.unit;
	    } else {
	      return rand;
	    }
	  };

	  Helpers.prototype.parseStagger = function(string, index) {
	    var base, number, splittedValue, unit, unitValue, value;
	    value = string.split(/stagger\(|\)$/)[1].toLowerCase();
	    splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim);
	    value = splittedValue.length > 3 ? (base = this.parseUnit(this.parseIfRand(splittedValue[1])), splittedValue[3]) : (base = this.parseUnit(0), splittedValue[1]);
	    value = this.parseIfRand(value);
	    unitValue = this.parseUnit(value);
	    number = index * unitValue.value + base.value;
	    unit = base.isStrict ? base.unit : unitValue.isStrict ? unitValue.unit : '';
	    if (unit) {
	      return "" + number + unit;
	    } else {
	      return number;
	    }
	  };

	  Helpers.prototype.parseIfStagger = function(value, i) {
	    if (!(typeof value === 'string' && value.match(/stagger/g))) {
	      return value;
	    } else {
	      return this.parseStagger(value, i);
	    }
	  };

	  Helpers.prototype.parseIfRand = function(str) {
	    if (typeof str === 'string' && str.match(/rand\(/)) {
	      return this.parseRand(str);
	    } else {
	      return str;
	    }
	  };

	  Helpers.prototype.parseDelta = function(key, value) {
	    var delta, end, endArr, endColorObj, i, j, len1, start, startArr, startColorObj;
	    start = Object.keys(value)[0];
	    end = value[start];
	    delta = {
	      start: start
	    };
	    if (isNaN(parseFloat(start)) && !start.match(/rand\(/)) {
	      if (key === 'strokeLinecap') {
	        this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", value);
	        return delta;
	      }
	      startColorObj = this.makeColorObj(start);
	      endColorObj = this.makeColorObj(end);
	      delta = {
	        start: startColorObj,
	        end: endColorObj,
	        type: 'color',
	        delta: {
	          r: endColorObj.r - startColorObj.r,
	          g: endColorObj.g - startColorObj.g,
	          b: endColorObj.b - startColorObj.b,
	          a: endColorObj.a - startColorObj.a
	        }
	      };
	    } else if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
	      startArr = this.strToArr(start);
	      endArr = this.strToArr(end);
	      this.normDashArrays(startArr, endArr);
	      for (i = j = 0, len1 = startArr.length; j < len1; i = ++j) {
	        start = startArr[i];
	        end = endArr[i];
	        this.mergeUnits(start, end, key);
	      }
	      delta = {
	        start: startArr,
	        end: endArr,
	        delta: this.calcArrDelta(startArr, endArr),
	        type: 'array'
	      };
	    } else {
	      if (!this.chainOptionMap[key]) {
	        if (this.posPropsMap[key]) {
	          end = this.parseUnit(this.parseIfRand(end));
	          start = this.parseUnit(this.parseIfRand(start));
	          this.mergeUnits(start, end, key);
	          delta = {
	            start: start,
	            end: end,
	            delta: end.value - start.value,
	            type: 'unit'
	          };
	        } else {
	          end = parseFloat(this.parseIfRand(end));
	          start = parseFloat(this.parseIfRand(start));
	          delta = {
	            start: start,
	            end: end,
	            delta: end - start,
	            type: 'number'
	          };
	        }
	      }
	    }
	    return delta;
	  };

	  Helpers.prototype.mergeUnits = function(start, end, key) {
	    if (!end.isStrict && start.isStrict) {
	      end.unit = start.unit;
	      return end.string = "" + end.value + end.unit;
	    } else if (end.isStrict && !start.isStrict) {
	      start.unit = end.unit;
	      return start.string = "" + start.value + start.unit;
	    } else if (end.isStrict && start.isStrict) {
	      if (end.unit !== start.unit) {
	        start.unit = end.unit;
	        start.string = "" + start.value + start.unit;
	        return this.warn("Two different units were specified on \"" + key + "\" delta property, mo · js will fallback to end \"" + end.unit + "\" unit ");
	      }
	    }
	  };

	  Helpers.prototype.rand = function(min, max) {
	    return (Math.random() * (max - min)) + min;
	  };

	  Helpers.prototype.isDOM = function(o) {
	    var isNode;
	    if (o == null) {
	      return false;
	    }
	    isNode = typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
	    return typeof o === 'object' && isNode;
	  };

	  Helpers.prototype.getChildElements = function(element) {
	    var childNodes, children, i;
	    childNodes = element.childNodes;
	    children = [];
	    i = childNodes.length;
	    while (i--) {
	      if (childNodes[i].nodeType === 1) {
	        children.unshift(childNodes[i]);
	      }
	    }
	    return children;
	  };

	  Helpers.prototype.delta = function(start, end) {
	    var isType1, isType2, obj, type1, type2;
	    type1 = typeof start;
	    type2 = typeof end;
	    isType1 = type1 === 'string' || type1 === 'number' && !isNaN(start);
	    isType2 = type2 === 'string' || type2 === 'number' && !isNaN(end);
	    if (!isType1 || !isType2) {
	      this.error("delta method expects Strings or Numbers at input but got - " + start + ", " + end);
	      return;
	    }
	    obj = {};
	    obj[start] = end;
	    return obj;
	  };

	  Helpers.prototype.getUniqID = function() {
	    return ++this.uniqIDs;
	  };

	  Helpers.prototype.parsePath = function(path) {
	    var domPath;
	    if (typeof path === 'string') {
	      if (path.charAt(0).toLowerCase() === 'm') {
	        domPath = document.createElementNS(this.NS, 'path');
	        domPath.setAttributeNS(null, 'd', path);
	        return domPath;
	      } else {
	        return document.querySelector(path);
	      }
	    }
	    if (path.style) {
	      return path;
	    }
	  };

	  Helpers.prototype.closeEnough = function(num1, num2, eps) {
	    return Math.abs(num1 - num2) < eps;
	  };

	  Helpers.prototype.checkIf3d = function() {
	    var div, prefixed, style, tr;
	    div = document.createElement('div');
	    this.style(div, 'transform', 'translateZ(0)');
	    style = div.style;
	    prefixed = this.prefix.css + "transform";
	    tr = style[prefixed] != null ? style[prefixed] : style.transform;
	    return tr !== '';
	  };

	  return Helpers;

	})();

	h = new Helpers;

	module.exports = h;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

	Bit = __webpack_require__(27);

	Circle = __webpack_require__(28);

	Line = __webpack_require__(29);

	Zigzag = __webpack_require__(30);

	Rect = __webpack_require__(31);

	Polygon = __webpack_require__(32);

	Cross = __webpack_require__(33);

	Equal = __webpack_require__(34);

	h = __webpack_require__(10);

	BitsMap = (function() {
	  function BitsMap() {}

	  BitsMap.prototype.bit = Bit;

	  BitsMap.prototype.circle = Circle;

	  BitsMap.prototype.line = Line;

	  BitsMap.prototype.zigzag = Zigzag;

	  BitsMap.prototype.rect = Rect;

	  BitsMap.prototype.polygon = Polygon;

	  BitsMap.prototype.cross = Cross;

	  BitsMap.prototype.equal = Equal;

	  BitsMap.prototype.getShape = function(name) {
	    return this[name] || h.error("no \"" + name + "\" shape available yet, please choose from this list:", this);
	  };

	  return BitsMap;

	})();

	module.exports = new BitsMap;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Burst, Swirl, Transit, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Transit = __webpack_require__(13);

	Swirl = __webpack_require__(14);

	h = __webpack_require__(10);

	Burst = (function(superClass) {
	  extend(Burst, superClass);

	  function Burst() {
	    return Burst.__super__.constructor.apply(this, arguments);
	  }

	  Burst.prototype.skipProps = {
	    childOptions: 1
	  };

	  Burst.prototype.defaults = {
	    count: 5,
	    degree: 360,
	    opacity: 1,
	    randomAngle: 0,
	    randomRadius: 0,
	    left: 100,
	    top: 100,
	    x: 0,
	    y: 0,
	    easing: 'Linear.None',
	    radius: {
	      25: 75
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    size: null,
	    sizeGap: 0,
	    duration: 600,
	    delay: 0,
	    onStart: null,
	    onComplete: null,
	    onCompleteChain: null,
	    onUpdate: null,
	    isResetAngles: false
	  };

	  Burst.prototype.childDefaults = {
	    radius: {
	      7: 0
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    opacity: 1,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    points: 3,
	    duration: 500,
	    delay: 0,
	    repeat: 0,
	    yoyo: false,
	    easing: 'Linear.None',
	    shape: 'circle',
	    fill: 'deeppink',
	    fillOpacity: 1,
	    isSwirl: false,
	    swirlSize: 10,
	    swirlFrequency: 3,
	    stroke: 'transparent',
	    strokeWidth: 0,
	    strokeOpacity: 1,
	    strokeDasharray: '',
	    strokeDashoffset: '',
	    strokeLinecap: null
	  };

	  Burst.prototype.optionsIntersection = {
	    radius: 1,
	    radiusX: 1,
	    radiusY: 1,
	    angle: 1,
	    opacity: 1,
	    onStart: 1,
	    onComplete: 1,
	    onUpdate: 1
	  };

	  Burst.prototype.run = function(o) {
	    var base, i, j, key, keys, len, len1, option, ref, ref1, tr;
	    if ((o != null) && Object.keys(o).length) {
	      if (o.count || ((ref = o.childOptions) != null ? ref.count : void 0)) {
	        this.h.warn('Sorry, count can not be changed on run');
	      }
	      this.extendDefaults(o);
	      keys = Object.keys(o.childOptions || {});
	      if ((base = this.o).childOptions == null) {
	        base.childOptions = {};
	      }
	      for (i = j = 0, len1 = keys.length; j < len1; i = ++j) {
	        key = keys[i];
	        this.o.childOptions[key] = o.childOptions[key];
	      }
	      len = this.transits.length;
	      while (len--) {
	        option = this.getOption(len);
	        if ((((ref1 = o.childOptions) != null ? ref1.angle : void 0) == null) && (o.angleShift == null)) {
	          option.angle = this.transits[len].o.angle;
	        } else if (!o.isResetAngles) {
	          option.angle = this.getBitAngle(option.angle, len);
	        }
	        this.transits[len].tuneNewOption(option, true);
	      }
	      this.timeline._recalcTotalDuration();
	    }
	    if (this.props.randomAngle || this.props.randomRadius) {
	      len = this.transits.length;
	      while (len--) {
	        tr = this.transits[len];
	        this.props.randomAngle && tr.setProp({
	          angleShift: this.generateRandomAngle()
	        });
	        this.props.randomRadius && tr.setProp({
	          radiusScale: this.generateRandomRadius()
	        });
	      }
	    }
	    return this.startTween();
	  };

	  Burst.prototype.createBit = function() {
	    var i, j, option, ref, results;
	    this.transits = [];
	    results = [];
	    for (i = j = 0, ref = this.props.count; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      option = this.getOption(i);
	      option.ctx = this.ctx;
	      option.index = i;
	      option.isDrawLess = true;
	      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
	      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
	      results.push(this.transits.push(new Swirl(option)));
	    }
	    return results;
	  };

	  Burst.prototype.addBitOptions = function() {
	    var aShift, i, j, len1, pointEnd, pointStart, points, ref, results, step, transit;
	    points = this.props.count;
	    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	    step = this.props.degree / this.degreeCnt;
	    ref = this.transits;
	    results = [];
	    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	      transit = ref[i];
	      aShift = transit.props.angleShift || 0;
	      pointStart = this.getSidePoint('start', i * step + aShift);
	      pointEnd = this.getSidePoint('end', i * step + aShift);
	      transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
	      transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
	      if (!this.props.isResetAngles) {
	        transit.o.angle = this.getBitAngle(transit.o.angle, i);
	      }
	      results.push(transit.extendDefaults());
	    }
	    return results;
	  };

	  Burst.prototype.getBitAngle = function(angle, i) {
	    var angleAddition, angleShift, curAngleShift, degCnt, delta, end, keys, newEnd, newStart, points, start, step;
	    points = this.props.count;
	    degCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	    step = this.props.degree / degCnt;
	    angleAddition = i * step + 90;
	    angleShift = this.transits[i].props.angleShift || 0;
	    angle = typeof angle !== 'object' ? angle + angleAddition + angleShift : (keys = Object.keys(angle), start = keys[0], end = angle[start], curAngleShift = angleAddition + angleShift, newStart = parseFloat(start) + curAngleShift, newEnd = parseFloat(end) + curAngleShift, delta = {}, delta[newStart] = newEnd, delta);
	    return angle;
	  };

	  Burst.prototype.getSidePoint = function(side, angle) {
	    var pointStart, sideRadius;
	    sideRadius = this.getSideRadius(side);
	    return pointStart = this.h.getRadialPoint({
	      radius: sideRadius.radius,
	      radiusX: sideRadius.radiusX,
	      radiusY: sideRadius.radiusY,
	      angle: angle,
	      center: {
	        x: this.props.center,
	        y: this.props.center
	      }
	    });
	  };

	  Burst.prototype.getSideRadius = function(side) {
	    return {
	      radius: this.getRadiusByKey('radius', side),
	      radiusX: this.getRadiusByKey('radiusX', side),
	      radiusY: this.getRadiusByKey('radiusY', side)
	    };
	  };

	  Burst.prototype.getRadiusByKey = function(key, side) {
	    if (this.deltas[key] != null) {
	      return this.deltas[key][side];
	    } else if (this.props[key] != null) {
	      return this.props[key];
	    }
	  };

	  Burst.prototype.getDeltaFromPoints = function(key, pointStart, pointEnd) {
	    var delta;
	    delta = {};
	    if (pointStart[key] === pointEnd[key]) {
	      return delta = pointStart[key];
	    } else {
	      delta[pointStart[key]] = pointEnd[key];
	      return delta;
	    }
	  };

	  Burst.prototype.draw = function(progress) {
	    return this.drawEl();
	  };

	  Burst.prototype.isNeedsTransform = function() {
	    return this.isPropChanged('x') || this.isPropChanged('y') || this.isPropChanged('angle');
	  };

	  Burst.prototype.fillTransform = function() {
	    return "rotate(" + this.props.angle + "deg) translate(" + this.props.x + ", " + this.props.y + ")";
	  };

	  Burst.prototype.createTween = function() {
	    var i, results;
	    Burst.__super__.createTween.apply(this, arguments);
	    i = this.transits.length;
	    results = [];
	    while (i--) {
	      results.push(this.timeline.add(this.transits[i].tween));
	    }
	    return results;
	  };

	  Burst.prototype.calcSize = function() {
	    var i, j, largestSize, len1, radius, ref, transit;
	    largestSize = -1;
	    ref = this.transits;
	    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	      transit = ref[i];
	      transit.calcSize();
	      if (largestSize < transit.props.size) {
	        largestSize = transit.props.size;
	      }
	    }
	    radius = this.calcMaxRadius();
	    this.props.size = largestSize + 2 * radius;
	    this.props.size += 2 * this.props.sizeGap;
	    this.props.center = this.props.size / 2;
	    return this.addBitOptions();
	  };

	  Burst.prototype.getOption = function(i) {
	    var key, keys, len, option;
	    option = {};
	    keys = Object.keys(this.childDefaults);
	    len = keys.length;
	    while (len--) {
	      key = keys[len];
	      option[key] = this.getPropByMod({
	        key: key,
	        i: i,
	        from: this.o.childOptions
	      });
	      if (this.optionsIntersection[key]) {
	        if (option[key] == null) {
	          option[key] = this.getPropByMod({
	            key: key,
	            i: i,
	            from: this.childDefaults
	          });
	        }
	        continue;
	      }
	      if (option[key] == null) {
	        option[key] = this.getPropByMod({
	          key: key,
	          i: i,
	          from: this.o
	        });
	      }
	      if (option[key] == null) {
	        option[key] = this.getPropByMod({
	          key: key,
	          i: i,
	          from: this.childDefaults
	        });
	      }
	    }
	    return option;
	  };

	  Burst.prototype.getPropByMod = function(o) {
	    var prop, ref;
	    prop = (ref = o.from || this.o.childOptions) != null ? ref[o.key] : void 0;
	    if (this.h.isArray(prop)) {
	      return prop[o.i % prop.length];
	    } else {
	      return prop;
	    }
	  };

	  Burst.prototype.generateRandomAngle = function(i) {
	    var randdomness, randomness;
	    randomness = parseFloat(this.props.randomAngle);
	    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
	    return this.h.rand(0, randomness ? randomness * 360 : 180);
	  };

	  Burst.prototype.generateRandomRadius = function(i) {
	    var randdomness, randomness, start;
	    randomness = parseFloat(this.props.randomRadius);
	    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
	    start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
	    return this.h.rand(start, 100) / 100;
	  };

	  Burst.prototype.then = function(o) {
	    this.h.error("Burst's \"then\" method is under consideration, you can vote for it in github repo issues");
	    return this;
	  };

	  return Burst;

	})(Transit);

	module.exports = Burst;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Timeline, Transit, Tween, h, shapesMap,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	h = __webpack_require__(10);

	Bit = __webpack_require__(27);

	shapesMap = __webpack_require__(11);

	Tween = __webpack_require__(4)["default"];

	Timeline = __webpack_require__(5)["default"];

	Transit = (function(superClass) {
	  extend(Transit, superClass);

	  function Transit() {
	    return Transit.__super__.constructor.apply(this, arguments);
	  }

	  Transit.prototype.progress = 0;

	  Transit.prototype.defaults = {
	    stroke: 'transparent',
	    strokeOpacity: 1,
	    strokeLinecap: '',
	    strokeWidth: 2,
	    strokeDasharray: 0,
	    strokeDashoffset: 0,
	    fill: 'deeppink',
	    fillOpacity: 'transparent',
	    left: 0,
	    top: 0,
	    x: 0,
	    y: 0,
	    opacity: 1,
	    angle: 0,
	    points: 3,
	    radius: {
	      0: 50
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    duration: 500,
	    delay: 0,
	    repeat: 0,
	    yoyo: false,
	    easing: 'Linear.None',
	    isShowEnd: false,
	    isShowInit: false,
	    size: null,
	    sizeGap: 0
	  };

	  Transit.prototype.vars = function() {
	    var o;
	    if (this.h == null) {
	      this.h = h;
	    }
	    if (this.lastSet == null) {
	      this.lastSet = {};
	    }
	    this.index = this.o.index || 0;
	    this.extendDefaults();
	    o = this.h.cloneObj(this.o);
	    this.h.extend(o, this.defaults);
	    this.history = [o];
	    this.isForeign = !!this.o.ctx;
	    return this.isForeignBit = !!this.o.bit;
	  };

	  Transit.prototype.render = function() {
	    if (!this.isRendered) {
	      if (!this.isForeign && !this.isForeignBit) {
	        this.ctx = document.createElementNS(this.ns, 'svg');
	        this.ctx.style.position = 'absolute';
	        this.ctx.style.width = '100%';
	        this.ctx.style.height = '100%';
	        this.createBit();
	        this.calcSize();
	        this.el = document.createElement('div');
	        this.el.appendChild(this.ctx);
	        (this.o.parent || document.body).appendChild(this.el);
	      } else {
	        this.ctx = this.o.ctx;
	        this.createBit();
	        this.calcSize();
	      }
	      this.isRendered = true;
	    }
	    this.setElStyles();
	    this.setProgress(0, true);
	    this.createTween();
	    return this;
	  };

	  Transit.prototype.setElStyles = function() {
	    var marginSize, ref, size;
	    if (!this.isForeign) {
	      size = this.props.size + "px";
	      marginSize = (-this.props.size / 2) + "px";
	      this.el.style.position = 'absolute';
	      this.el.style.top = this.props.top;
	      this.el.style.left = this.props.left;
	      this.el.style.width = size;
	      this.el.style.height = size;
	      this.el.style['margin-left'] = marginSize;
	      this.el.style['margin-top'] = marginSize;
	      this.el.style['marginLeft'] = marginSize;
	      this.el.style['marginTop'] = marginSize;
	    }
	    if ((ref = this.el) != null) {
	      ref.style.opacity = this.props.opacity;
	    }
	    if (this.o.isShowInit) {
	      return this.show();
	    } else {
	      return this.hide();
	    }
	  };

	  Transit.prototype.show = function() {
	    if (this.isShown || (this.el == null)) {
	      return;
	    }
	    this.el.style.display = 'block';
	    return this.isShown = true;
	  };

	  Transit.prototype.hide = function() {
	    if ((this.isShown === false) || (this.el == null)) {
	      return;
	    }
	    this.el.style.display = 'none';
	    return this.isShown = false;
	  };

	  Transit.prototype.draw = function() {
	    this.bit.setProp({
	      x: this.origin.x,
	      y: this.origin.y,
	      stroke: this.props.stroke,
	      'stroke-width': this.props.strokeWidth,
	      'stroke-opacity': this.props.strokeOpacity,
	      'stroke-dasharray': this.props.strokeDasharray,
	      'stroke-dashoffset': this.props.strokeDashoffset,
	      'stroke-linecap': this.props.strokeLinecap,
	      fill: this.props.fill,
	      'fill-opacity': this.props.fillOpacity,
	      radius: this.props.radius,
	      radiusX: this.props.radiusX,
	      radiusY: this.props.radiusY,
	      points: this.props.points,
	      transform: this.calcTransform()
	    });
	    this.bit.draw();
	    return this.drawEl();
	  };

	  Transit.prototype.drawEl = function() {
	    if (this.el == null) {
	      return true;
	    }
	    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
	    if (!this.isForeign) {
	      this.isPropChanged('left') && (this.el.style.left = this.props.left);
	      this.isPropChanged('top') && (this.el.style.top = this.props.top);
	      if (this.isNeedsTransform()) {
	        return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
	      }
	    }
	  };

	  Transit.prototype.fillTransform = function() {
	    return "translate(" + this.props.x + ", " + this.props.y + ")";
	  };

	  Transit.prototype.isNeedsTransform = function() {
	    return this.isPropChanged('x') || this.isPropChanged('y');
	  };

	  Transit.prototype.isPropChanged = function(name) {
	    var base;
	    if ((base = this.lastSet)[name] == null) {
	      base[name] = {};
	    }
	    if (this.lastSet[name].value !== this.props[name]) {
	      this.lastSet[name].value = this.props[name];
	      return true;
	    } else {
	      return false;
	    }
	  };

	  Transit.prototype.calcTransform = function() {
	    return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
	  };

	  Transit.prototype.calcSize = function() {
	    var base, dStroke, radius, stroke;
	    if (this.o.size) {
	      return;
	    }
	    radius = this.calcMaxRadius();
	    dStroke = this.deltas['strokeWidth'];
	    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
	    this.props.size = 2 * radius + 2 * stroke;
	    switch (typeof (base = this.props.easing).toLowerCase === "function" ? base.toLowerCase() : void 0) {
	      case 'elastic.out':
	      case 'elastic.inout':
	        this.props.size *= 1.25;
	        break;
	      case 'back.out':
	      case 'back.inout':
	        this.props.size *= 1.1;
	    }
	    this.props.size *= this.bit.ratio;
	    this.props.size += 2 * this.props.sizeGap;
	    return this.props.center = this.props.size / 2;
	  };

	  Transit.prototype.calcMaxRadius = function() {
	    var selfSize, selfSizeX, selfSizeY;
	    selfSize = this.getRadiusSize({
	      key: 'radius'
	    });
	    selfSizeX = this.getRadiusSize({
	      key: 'radiusX',
	      fallback: selfSize
	    });
	    selfSizeY = this.getRadiusSize({
	      key: 'radiusY',
	      fallback: selfSize
	    });
	    return Math.max(selfSizeX, selfSizeY);
	  };

	  Transit.prototype.getRadiusSize = function(o) {
	    if (this.deltas[o.key] != null) {
	      return Math.max(Math.abs(this.deltas[o.key].end), Math.abs(this.deltas[o.key].start));
	    } else if (this.props[o.key] != null) {
	      return parseFloat(this.props[o.key]);
	    } else {
	      return o.fallback || 0;
	    }
	  };

	  Transit.prototype.createBit = function() {
	    var bitClass;
	    bitClass = shapesMap.getShape(this.o.shape || this.shape);
	    this.bit = new bitClass({
	      ctx: this.ctx,
	      el: this.o.bit,
	      isDrawLess: true
	    });
	    if (this.isForeign || this.isForeignBit) {
	      return this.el = this.bit.el;
	    }
	  };

	  Transit.prototype.setProgress = function(progress, isShow) {
	    if (!isShow) {
	      this.show();
	      if (typeof this.onUpdate === "function") {
	        this.onUpdate(progress);
	      }
	    }
	    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
	    this.calcCurrentProps(progress);
	    this.calcOrigin();
	    this.draw(progress);
	    return this;
	  };

	  Transit.prototype.calcCurrentProps = function(progress) {
	    var a, b, dash, g, i, item, key, keys, len, r, results, stroke, units, value;
	    keys = Object.keys(this.deltas);
	    len = keys.length;
	    results = [];
	    while (len--) {
	      key = keys[len];
	      value = this.deltas[key];
	      results.push(this.props[key] = (function() {
	        var k, len1, ref;
	        switch (value.type) {
	          case 'array':
	            stroke = [];
	            ref = value.delta;
	            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
	              item = ref[i];
	              dash = value.start[i].value + item.value * this.progress;
	              stroke.push({
	                value: dash,
	                unit: item.unit
	              });
	            }
	            return stroke;
	          case 'number':
	            return value.start + value.delta * progress;
	          case 'unit':
	            units = value.end.unit;
	            return "" + (value.start.value + value.delta * progress) + units;
	          case 'color':
	            r = parseInt(value.start.r + value.delta.r * progress, 10);
	            g = parseInt(value.start.g + value.delta.g * progress, 10);
	            b = parseInt(value.start.b + value.delta.b * progress, 10);
	            a = parseInt(value.start.a + value.delta.a * progress, 10);
	            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	        }
	      }).call(this));
	    }
	    return results;
	  };

	  Transit.prototype.calcOrigin = function() {
	    return this.origin = this.o.ctx ? {
	      x: parseFloat(this.props.x),
	      y: parseFloat(this.props.y)
	    } : {
	      x: this.props.center,
	      y: this.props.center
	    };
	  };

	  Transit.prototype.extendDefaults = function(o) {
	    var array, defaultsValue, fromObject, i, k, key, keys, len, len1, optionsValue, property, ref, unit, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    fromObject = o || this.defaults;
	    (o == null) && (this.deltas = {});
	    keys = Object.keys(fromObject);
	    len = keys.length;
	    while (len--) {
	      key = keys[len];
	      defaultsValue = fromObject[key];
	      if ((ref = this.skipProps) != null ? ref[key] : void 0) {
	        continue;
	      }
	      if (o) {
	        this.o[key] = defaultsValue;
	        optionsValue = defaultsValue;
	        delete this.deltas[key];
	      } else {
	        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
	      }
	      if (!this.isDelta(optionsValue)) {
	        if (typeof optionsValue === 'string') {
	          if (optionsValue.match(/stagger/)) {
	            optionsValue = this.h.parseStagger(optionsValue, this.index);
	          }
	        }
	        if (typeof optionsValue === 'string') {
	          if (optionsValue.match(/rand/)) {
	            optionsValue = this.h.parseRand(optionsValue);
	          }
	        }
	        this.props[key] = optionsValue;
	        if (key === 'radius') {
	          if (this.o.radiusX == null) {
	            this.props.radiusX = optionsValue;
	          }
	          if (this.o.radiusY == null) {
	            this.props.radiusY = optionsValue;
	          }
	        }
	        if (this.h.posPropsMap[key]) {
	          this.props[key] = this.h.parseUnit(this.props[key]).string;
	        }
	        if (this.h.strokeDashPropsMap[key]) {
	          property = this.props[key];
	          value = [];
	          switch (typeof property) {
	            case 'number':
	              value.push(this.h.parseUnit(property));
	              break;
	            case 'string':
	              array = this.props[key].split(' ');
	              for (i = k = 0, len1 = array.length; k < len1; i = ++k) {
	                unit = array[i];
	                value.push(this.h.parseUnit(unit));
	              }
	          }
	          this.props[key] = value;
	        }
	        continue;
	      }
	      this.isSkipDelta || this.getDelta(key, optionsValue);
	    }
	    return this.onUpdate = this.props.onUpdate;
	  };

	  Transit.prototype.isDelta = function(optionsValue) {
	    var isObject;
	    isObject = (optionsValue != null) && (typeof optionsValue === 'object');
	    isObject = isObject && !optionsValue.unit;
	    return !(!isObject || this.h.isArray(optionsValue) || h.isDOM(optionsValue));
	  };

	  Transit.prototype.getDelta = function(key, optionsValue) {
	    var delta, ref;
	    if ((key === 'left' || key === 'top') && !this.o.ctx) {
	      this.h.warn('Consider to animate x/y properties instead of left/top, as it would be much more performant', optionsValue);
	    }
	    if ((ref = this.skipPropsDelta) != null ? ref[key] : void 0) {
	      return;
	    }
	    delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
	    if (delta.type != null) {
	      this.deltas[key] = delta;
	    }
	    return this.props[key] = delta.start;
	  };

	  Transit.prototype.mergeThenOptions = function(start, end) {
	    var endValue, i, isFunction, key, keys, o, startKey, startKeys, value;
	    o = {};
	    for (key in start) {
	      value = start[key];
	      if (!this.h.tweenOptionMap[key] && !this.h.callbacksMap[key] || key === 'duration') {
	        o[key] = value;
	      } else {
	        o[key] = key === 'easing' ? '' : void 0;
	      }
	    }
	    keys = Object.keys(end);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      endValue = end[key];
	      isFunction = typeof endValue === 'function';
	      if (this.h.tweenOptionMap[key] || typeof endValue === 'object' || isFunction) {
	        o[key] = endValue != null ? endValue : start[key];
	        continue;
	      }
	      startKey = start[key];
	      if (startKey == null) {
	        startKey = this.defaults[key];
	      }
	      if ((key === 'radiusX' || key === 'radiusY') && (startKey == null)) {
	        startKey = start.radius;
	      }
	      if (typeof startKey === 'object' && (startKey != null)) {
	        startKeys = Object.keys(startKey);
	        startKey = startKey[startKeys[0]];
	      }
	      if (endValue != null) {
	        o[key] = {};
	        o[key][startKey] = endValue;
	      }
	    }
	    return o;
	  };

	  Transit.prototype.then = function(o) {
	    var i, it, keys, len, merged, opts;
	    if ((o == null) || !Object.keys(o)) {
	      return;
	    }
	    merged = this.mergeThenOptions(this.history[this.history.length - 1], o);
	    this.history.push(merged);
	    keys = Object.keys(this.h.tweenOptionMap);
	    i = keys.length;
	    opts = {};
	    while (i--) {
	      opts[keys[i]] = merged[keys[i]];
	    }
	    it = this;
	    len = it.history.length;
	    (function(_this) {
	      return (function(len) {
	        opts.onUpdate = function(p) {
	          return _this.setProgress(p);
	        };
	        opts.onStart = function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	        opts.onComplete = function() {
	          var ref;
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	        opts.onFirstUpdate = function() {
	          return it.tuneOptions(it.history[this.index]);
	        };
	        opts.isChained = !o.delay;
	        return _this.timeline.append(new Tween(opts));
	      });
	    })(this)(len);
	    return this;
	  };

	  Transit.prototype.tuneOptions = function(o) {
	    this.extendDefaults(o);
	    this.calcSize();
	    return this.setElStyles();
	  };

	  Transit.prototype.createTimeline = function() {
	    return this.tween = new Tween({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      repeat: this.props.repeat,
	      yoyo: this.props.yoyo,
	      easing: this.props.easing,
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onStart: (function(_this) {
	        return function(isForward, isYoyo) {
	          var ref;
	          if (isForward) {
	            _this.show();
	          } else {
	            !_this.o.isShowInit && _this.hide();
	          }
	          return (ref = _this.props.onStart) != null ? ref.apply(_this, arguments) : void 0;
	        };
	      })(this),
	      onFirstUpdate: (function(_this) {
	        return function(isForward, isYoyo) {
	          if (!isForward) {
	            return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	          }
	        };
	      })(this)
	    });
	  };

	  Transit.prototype.createTween = function() {
	    var it;
	    it = this;
	    this.createTimeline();
	    this.timeline = new Timeline({
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          !_this.o.isShowEnd && _this.hide();
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this)
	    });
	    return this.timeline.add(this.tween);
	  };

	  Transit.prototype.run = function(o) {
	    var key, keys, len;
	    if (o && Object.keys(o).length) {
	      if (this.history.length > 1) {
	        keys = Object.keys(o);
	        len = keys.length;
	        while (len--) {
	          key = keys[len];
	          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	            h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
	            delete o[key];
	          }
	        }
	      }
	      this.transformHistory(o);
	      this.tuneNewOption(o);
	      o = this.h.cloneObj(this.o);
	      this.h.extend(o, this.defaults);
	      this.history[0] = o;
	      !this.o.isDrawLess && this.setProgress(0, true);
	    } else if (o) {
	      this.tuneNewOption(this.history[0]);
	    }
	    return this.startTween();
	  };

	  Transit.prototype.transformHistory = function(o) {
	    var historyLen, i, j, key, keys, len, optionRecord, results, value, value2, valueKeys, valueKeys2;
	    keys = Object.keys(o);
	    i = -1;
	    len = keys.length;
	    historyLen = this.history.length;
	    results = [];
	    while (++i < len) {
	      key = keys[i];
	      j = 0;
	      results.push((function() {
	        var results1;
	        results1 = [];
	        while (++j < historyLen) {
	          optionRecord = this.history[j][key];
	          if (typeof optionRecord === 'object') {
	            valueKeys = Object.keys(optionRecord);
	            value = optionRecord[valueKeys[0]];
	            delete this.history[j][key][valueKeys[0]];
	            if (typeof o[key] === 'object') {
	              valueKeys2 = Object.keys(o[key]);
	              value2 = o[key][valueKeys2[0]];
	              this.history[j][key][value2] = value;
	            } else {
	              this.history[j][key][o[key]] = value;
	            }
	            break;
	          } else {
	            results1.push(this.history[j][key] = o[key]);
	          }
	        }
	        return results1;
	      }).call(this));
	    }
	    return results;
	  };

	  Transit.prototype.tuneNewOption = function(o, isForeign) {
	    if ((o != null) && (o.shape != null) && o.shape !== (this.o.shape || this.shape)) {
	      this.h.warn('Sorry, shape can not be changed on run');
	      delete o.shape;
	    }
	    if ((o != null) && Object.keys(o).length) {
	      this.extendDefaults(o);
	      this.resetTimeline();
	      !isForeign && this.timeline._recalcTotalDuration();
	      this.calcSize();
	      return !isForeign && this.setElStyles();
	    }
	  };

	  Transit.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.timeline) != null ? ref.play() : void 0;
	      };
	    })(this)), 1);
	  };

	  Transit.prototype.resetTimeline = function() {
	    var i, k, key, len1, ref, timelineOptions;
	    timelineOptions = {};
	    ref = Object.keys(this.h.tweenOptionMap);
	    for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
	      key = ref[i];
	      timelineOptions[key] = this.props[key];
	    }
	    timelineOptions.onStart = this.props.onStart;
	    timelineOptions.onComplete = this.props.onComplete;
	    return this.tween._setProp(timelineOptions);
	  };

	  Transit.prototype.getBitLength = function() {
	    return this.props.bitLength = this.bit.getLength();
	  };

	  return Transit;

	})(Bit);

	module.exports = Transit;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Swirl, Transit,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Transit = __webpack_require__(13);

	Swirl = (function(superClass) {
	  extend(Swirl, superClass);

	  function Swirl() {
	    return Swirl.__super__.constructor.apply(this, arguments);
	  }

	  Swirl.prototype.skipPropsDelta = {
	    x: 1,
	    y: 1
	  };

	  Swirl.prototype.vars = function() {
	    Swirl.__super__.vars.apply(this, arguments);
	    return !this.o.isSwirlLess && this.generateSwirl();
	  };

	  Swirl.prototype.extendDefaults = function() {
	    var angle, base, x, y;
	    Swirl.__super__.extendDefaults.apply(this, arguments);
	    x = this.getPosValue('x');
	    y = this.getPosValue('y');
	    angle = 90 + Math.atan((y.delta / x.delta) || 0) * (180 / Math.PI);
	    if (x.delta < 0) {
	      angle += 180;
	    }
	    this.positionDelta = {
	      radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
	      angle: angle,
	      x: x,
	      y: y
	    };
	    if ((base = this.o).radiusScale == null) {
	      base.radiusScale = 1;
	    }
	    this.props.angleShift = this.h.parseIfRand(this.o.angleShift || 0);
	    return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
	  };

	  Swirl.prototype.getPosValue = function(name) {
	    var optVal, val;
	    optVal = this.o[name];
	    if (optVal && typeof optVal === 'object') {
	      val = this.h.parseDelta(name, optVal);
	      return {
	        start: val.start.value,
	        end: val.end.value,
	        delta: val.delta,
	        units: val.end.unit
	      };
	    } else {
	      val = parseFloat(optVal || this.defaults[name]);
	      return {
	        start: val,
	        end: val,
	        delta: 0,
	        units: 'px'
	      };
	    }
	  };

	  Swirl.prototype.setProgress = function(progress) {
	    var angle, point, x, y;
	    angle = this.positionDelta.angle;
	    if (this.o.isSwirl) {
	      angle += this.getSwirl(progress);
	    }
	    point = this.h.getRadialPoint({
	      angle: angle,
	      radius: this.positionDelta.radius * progress * this.props.radiusScale,
	      center: {
	        x: this.positionDelta.x.start,
	        y: this.positionDelta.y.start
	      }
	    });
	    x = point.x.toFixed(4);
	    y = point.y.toFixed(4);
	    this.props.x = this.o.ctx ? x : x + this.positionDelta.x.units;
	    this.props.y = this.o.ctx ? y : y + this.positionDelta.y.units;
	    return Swirl.__super__.setProgress.apply(this, arguments);
	  };

	  Swirl.prototype.generateSwirl = function() {
	    var base, base1;
	    this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
	    if ((base = this.o).swirlSize == null) {
	      base.swirlSize = 10;
	    }
	    if ((base1 = this.o).swirlFrequency == null) {
	      base1.swirlFrequency = 3;
	    }
	    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
	    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
	  };

	  Swirl.prototype.getSwirl = function(progress) {
	    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
	  };

	  return Swirl;

	})(Transit);

	module.exports = Swirl;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var MotionPath, Timeline, Tween, h, resize,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	h = __webpack_require__(10);

	resize = __webpack_require__(35);

	Tween = __webpack_require__(4)["default"];

	Timeline = __webpack_require__(5)["default"];

	MotionPath = (function() {
	  MotionPath.prototype.defaults = {
	    path: null,
	    curvature: {
	      x: '75%',
	      y: '50%'
	    },
	    isCompositeLayer: true,
	    delay: 0,
	    duration: 1000,
	    easing: null,
	    repeat: 0,
	    yoyo: false,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    offsetX: 0,
	    offsetY: 0,
	    angleOffset: null,
	    pathStart: 0,
	    pathEnd: 1,
	    motionBlur: 0,
	    transformOrigin: null,
	    isAngle: false,
	    isReverse: false,
	    isRunLess: false,
	    isPresetPosition: true
	  };

	  function MotionPath(o1) {
	    this.o = o1 != null ? o1 : {};
	    this.calcHeight = bind(this.calcHeight, this);
	    if (this.vars()) {
	      return;
	    }
	    this.createTween();
	    this;
	  }

	  MotionPath.prototype.vars = function() {
	    this.getScaler = h.bind(this.getScaler, this);
	    this.resize = resize;
	    this.props = h.cloneObj(this.defaults);
	    this.extendOptions(this.o);
	    this.isMotionBlurReset = h.isSafari || h.isIE;
	    this.isMotionBlurReset && (this.props.motionBlur = 0);
	    this.history = [h.cloneObj(this.props)];
	    return this.postVars();
	  };

	  MotionPath.prototype.curveToPath = function(o) {
	    var angle, curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, start;
	    path = document.createElementNS(h.NS, 'path');
	    start = o.start;
	    endPoint = {
	      x: start.x + o.shift.x,
	      y: start.x + o.shift.y
	    };
	    curvature = o.curvature;
	    dX = o.shift.x;
	    dY = o.shift.y;
	    radius = Math.sqrt(dX * dX + dY * dY);
	    percent = radius / 100;
	    angle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    if (o.shift.x < 0) {
	      angle = angle + 180;
	    }
	    curvatureX = h.parseUnit(curvature.x);
	    curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
	    curveXPoint = h.getRadialPoint({
	      center: {
	        x: start.x,
	        y: start.y
	      },
	      radius: curvatureX,
	      angle: angle
	    });
	    curvatureY = h.parseUnit(curvature.y);
	    curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
	    curvePoint = h.getRadialPoint({
	      center: {
	        x: curveXPoint.x,
	        y: curveXPoint.y
	      },
	      radius: curvatureY,
	      angle: angle + 90
	    });
	    path.setAttribute('d', "M" + start.x + "," + start.y + " Q" + curvePoint.x + "," + curvePoint.y + " " + endPoint.x + "," + endPoint.y);
	    return path;
	  };

	  MotionPath.prototype.postVars = function() {
	    this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
	    this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
	    this.angle = 0;
	    this.speedX = 0;
	    this.speedY = 0;
	    this.blurX = 0;
	    this.blurY = 0;
	    this.prevCoords = {};
	    this.blurAmount = 20;
	    this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
	    this.onUpdate = this.props.onUpdate;
	    if (!this.o.el) {
	      h.error('Missed "el" option. It could be a selector, DOMNode or another module.');
	      return true;
	    }
	    this.el = this.parseEl(this.props.el);
	    this.props.motionBlur > 0 && this.createFilter();
	    this.path = this.getPath();
	    if (!this.path.getAttribute('d')) {
	      h.error('Path has no coordinates to work with, aborting');
	      return true;
	    }
	    this.len = this.path.getTotalLength();
	    this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
	    this.startLen = this.props.pathStart * this.len;
	    this.fill = this.props.fill;
	    if (this.fill != null) {
	      this.container = this.parseEl(this.props.fill.container);
	      this.fillRule = this.props.fill.fillRule || 'all';
	      this.getScaler();
	      if (this.container != null) {
	        this.removeEvent(this.container, 'onresize', this.getScaler);
	        return this.addEvent(this.container, 'onresize', this.getScaler);
	      }
	    }
	  };

	  MotionPath.prototype.addEvent = function(el, type, handler) {
	    return el.addEventListener(type, handler, false);
	  };

	  MotionPath.prototype.removeEvent = function(el, type, handler) {
	    return el.removeEventListener(type, handler, false);
	  };

	  MotionPath.prototype.createFilter = function() {
	    var div, svg;
	    div = document.createElement('div');
	    this.filterID = "filter-" + (h.getUniqID());
	    div.innerHTML = "<svg id=\"svg-" + this.filterID + "\"\n    style=\"visibility:hidden; width:0px; height:0px\">\n  <filter id=\"" + this.filterID + "\" y=\"-20\" x=\"-20\" width=\"40\" height=\"40\">\n    <feOffset\n      id=\"blur-offset\" in=\"SourceGraphic\"\n      dx=\"0\" dy=\"0\" result=\"offset2\"></feOffset>\n    <feGaussianblur\n      id=\"blur\" in=\"offset2\"\n      stdDeviation=\"0,0\" result=\"blur2\"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n      <feMergeNode in=\"blur2\"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>";
	    svg = div.querySelector("#svg-" + this.filterID);
	    this.filter = svg.querySelector('#blur');
	    this.filterOffset = svg.querySelector('#blur-offset');
	    document.body.insertBefore(svg, document.body.firstChild);
	    this.el.style['filter'] = "url(#" + this.filterID + ")";
	    return this.el.style[h.prefix.css + "filter"] = "url(#" + this.filterID + ")";
	  };

	  MotionPath.prototype.parseEl = function(el) {
	    if (typeof el === 'string') {
	      return document.querySelector(el);
	    }
	    if (el instanceof HTMLElement) {
	      return el;
	    }
	    if (el.setProp != null) {
	      this.isModule = true;
	      return el;
	    }
	  };

	  MotionPath.prototype.getPath = function() {
	    var path;
	    path = h.parsePath(this.props.path);
	    if (path) {
	      return path;
	    }
	    if (this.props.path.x || this.props.path.y) {
	      return this.curveToPath({
	        start: {
	          x: 0,
	          y: 0
	        },
	        shift: {
	          x: this.props.path.x || 0,
	          y: this.props.path.y || 0
	        },
	        curvature: {
	          x: this.props.curvature.x || this.defaults.curvature.x,
	          y: this.props.curvature.y || this.defaults.curvature.y
	        }
	      });
	    }
	  };

	  MotionPath.prototype.getScaler = function() {
	    var end, size, start;
	    this.cSize = {
	      width: this.container.offsetWidth || 0,
	      height: this.container.offsetHeight || 0
	    };
	    start = this.path.getPointAtLength(0);
	    end = this.path.getPointAtLength(this.len);
	    size = {};
	    this.scaler = {};
	    size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
	    size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
	    switch (this.fillRule) {
	      case 'all':
	        this.calcWidth(size);
	        return this.calcHeight(size);
	      case 'width':
	        this.calcWidth(size);
	        return this.scaler.y = this.scaler.x;
	      case 'height':
	        this.calcHeight(size);
	        return this.scaler.x = this.scaler.y;
	    }
	  };

	  MotionPath.prototype.calcWidth = function(size) {
	    this.scaler.x = this.cSize.width / size.width;
	    return !isFinite(this.scaler.x) && (this.scaler.x = 1);
	  };

	  MotionPath.prototype.calcHeight = function(size) {
	    this.scaler.y = this.cSize.height / size.height;
	    return !isFinite(this.scaler.y) && (this.scaler.y = 1);
	  };

	  MotionPath.prototype.run = function(o) {
	    var fistItem, key, value;
	    if (o) {
	      fistItem = this.history[0];
	      for (key in o) {
	        value = o[key];
	        if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	          h.warn("the property \"" + key + "\" property can not be overridden on run yet");
	          delete o[key];
	        } else {
	          this.history[0][key] = value;
	        }
	      }
	      this.tuneOptions(o);
	    }
	    return this.startTween();
	  };

	  MotionPath.prototype.createTween = function() {
	    this.tween = new Tween({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      yoyo: this.props.yoyo,
	      repeat: this.props.repeat,
	      easing: this.props.easing,
	      onStart: (function(_this) {
	        return function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          _this.props.motionBlur && _this.setBlur({
	            blur: {
	              x: 0,
	              y: 0
	            },
	            offset: {
	              x: 0,
	              y: 0
	            }
	          });
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onFirstUpdate: (function(_this) {
	        return function(isForward, isYoyo) {
	          if (!isForward) {
	            return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	          }
	        };
	      })(this)
	    });
	    this.timeline = new Timeline;
	    this.timeline.add(this.tween);
	    !this.props.isRunLess && this.startTween();
	    return this.props.isPresetPosition && this.setProgress(0, true);
	  };

	  MotionPath.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.timeline) != null ? ref.play() : void 0;
	      };
	    })(this)), 1);
	  };

	  MotionPath.prototype.setProgress = function(p, isInit) {
	    var len, point, x, y;
	    len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
	    point = this.path.getPointAtLength(len);
	    x = point.x + this.props.offsetX;
	    y = point.y + this.props.offsetY;
	    this._getCurrentAngle(point, len, p);
	    this._setTransformOrigin(p);
	    this._setTransform(x, y, p, isInit);
	    return this.props.motionBlur && this.makeMotionBlur(x, y);
	  };

	  MotionPath.prototype.setElPosition = function(x, y, p) {
	    var composite, isComposite, rotate, transform;
	    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
	    isComposite = this.props.isCompositeLayer && h.is3d;
	    composite = isComposite ? 'translateZ(0)' : '';
	    transform = "translate(" + x + "px," + y + "px) " + rotate + " " + composite;
	    return h.setPrefixedStyle(this.el, 'transform', transform);
	  };

	  MotionPath.prototype.setModulePosition = function(x, y) {
	    this.el.setProp({
	      shiftX: x + "px",
	      shiftY: y + "px",
	      angle: this.angle
	    });
	    return this.el.draw();
	  };

	  MotionPath.prototype._getCurrentAngle = function(point, len, p) {
	    var atan, isTransformFunOrigin, prevPoint, x1, x2;
	    isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	    if (this.props.isAngle || (this.props.angleOffset != null) || isTransformFunOrigin) {
	      prevPoint = this.path.getPointAtLength(len - 1);
	      x1 = point.y - prevPoint.y;
	      x2 = point.x - prevPoint.x;
	      atan = Math.atan(x1 / x2);
	      !isFinite(atan) && (atan = 0);
	      this.angle = atan * h.RAD_TO_DEG;
	      if ((typeof this.props.angleOffset) !== 'function') {
	        return this.angle += this.props.angleOffset || 0;
	      } else {
	        return this.angle = this.props.angleOffset.call(this, this.angle, p);
	      }
	    } else {
	      return this.angle = 0;
	    }
	  };

	  MotionPath.prototype._setTransform = function(x, y, p, isInit) {
	    var transform;
	    if (this.scaler) {
	      x *= this.scaler.x;
	      y *= this.scaler.y;
	    }
	    transform = null;
	    if (!isInit) {
	      transform = typeof this.onUpdate === "function" ? this.onUpdate(p, {
	        x: x,
	        y: y,
	        angle: this.angle
	      }) : void 0;
	    }
	    if (this.isModule) {
	      return this.setModulePosition(x, y);
	    } else {
	      if (typeof transform !== 'string') {
	        return this.setElPosition(x, y, p);
	      } else {
	        return h.setPrefixedStyle(this.el, 'transform', transform);
	      }
	    }
	  };

	  MotionPath.prototype._setTransformOrigin = function(p) {
	    var isTransformFunOrigin, tOrigin;
	    if (this.props.transformOrigin) {
	      isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	      tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
	      return h.setPrefixedStyle(this.el, 'transform-origin', tOrigin);
	    }
	  };

	  MotionPath.prototype.makeMotionBlur = function(x, y) {
	    var absoluteAngle, coords, dX, dY, signX, signY, tailAngle;
	    tailAngle = 0;
	    signX = 1;
	    signY = 1;
	    if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
	      this.speedX = 0;
	      this.speedY = 0;
	    } else {
	      dX = x - this.prevCoords.x;
	      dY = y - this.prevCoords.y;
	      if (dX > 0) {
	        signX = -1;
	      }
	      if (signX < 0) {
	        signY = -1;
	      }
	      this.speedX = Math.abs(dX);
	      this.speedY = Math.abs(dY);
	      tailAngle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    }
	    absoluteAngle = tailAngle - this.angle;
	    coords = this.angToCoords(absoluteAngle);
	    this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
	    this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
	    this.setBlur({
	      blur: {
	        x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
	        y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
	      },
	      offset: {
	        x: 3 * signX * this.blurX * coords.x * this.blurAmount,
	        y: 3 * signY * this.blurY * coords.y * this.blurAmount
	      }
	    });
	    this.prevCoords.x = x;
	    return this.prevCoords.y = y;
	  };

	  MotionPath.prototype.setBlur = function(o) {
	    if (!this.isMotionBlurReset) {
	      this.filter.setAttribute('stdDeviation', o.blur.x + "," + o.blur.y);
	      this.filterOffset.setAttribute('dx', o.offset.x);
	      return this.filterOffset.setAttribute('dy', o.offset.y);
	    }
	  };

	  MotionPath.prototype.extendDefaults = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.extendOptions = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this.props[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.then = function(o) {
	    var it, key, opts, prevOptions, value;
	    prevOptions = this.history[this.history.length - 1];
	    opts = {};
	    for (key in prevOptions) {
	      value = prevOptions[key];
	      if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
	        if (o[key] == null) {
	          o[key] = value;
	        }
	      } else {
	        if (o[key] == null) {
	          o[key] = void 0;
	        }
	      }
	      if (h.tweenOptionMap[key]) {
	        opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
	      }
	    }
	    this.history.push(o);
	    it = this;
	    opts.onUpdate = (function(_this) {
	      return function(p) {
	        return _this.setProgress(p);
	      };
	    })(this);
	    opts.onStart = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onComplete = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onFirstUpdate = function() {
	      return it.tuneOptions(it.history[this.index]);
	    };
	    opts.isChained = !o.delay;
	    this.timeline.append(new Tween(opts));
	    return this;
	  };

	  MotionPath.prototype.tuneOptions = function(o) {
	    this.extendOptions(o);
	    return this.postVars();
	  };

	  MotionPath.prototype.angToCoords = function(angle) {
	    var radAngle, x, y;
	    angle = angle % 360;
	    radAngle = ((angle - 90) * Math.PI) / 180;
	    x = Math.cos(radAngle);
	    y = Math.sin(radAngle);
	    x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
	    y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
	    return {
	      x: x * 1.428571429,
	      y: y * 1.428571429
	    };
	  };

	  return MotionPath;

	})();

	module.exports = MotionPath;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Easing, PathEasing, bezier, easing, h, mix;

	bezier = __webpack_require__(36);

	PathEasing = __webpack_require__(37);

	mix = __webpack_require__(38);

	h = __webpack_require__(10);

	Easing = (function() {
	  function Easing() {}

	  Easing.prototype.bezier = bezier;

	  Easing.prototype.PathEasing = PathEasing;

	  Easing.prototype.path = (new PathEasing('creator')).create;

	  Easing.prototype.inverse = function(p) {
	    return 1 - p;
	  };

	  Easing.prototype.linear = {
	    none: function(k) {
	      return k;
	    }
	  };

	  Easing.prototype.ease = {
	    "in": bezier.apply(Easing, [0.42, 0, 1, 1]),
	    out: bezier.apply(Easing, [0, 0, 0.58, 1]),
	    inout: bezier.apply(Easing, [0.42, 0, 0.58, 1])
	  };

	  Easing.prototype.quad = {
	    "in": function(k) {
	      return k * k;
	    },
	    out: function(k) {
	      return k * (2 - k);
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k;
	      }
	      return -0.5 * (--k * (k - 2) - 1);
	    }
	  };

	  Easing.prototype.cubic = {
	    "in": function(k) {
	      return k * k * k;
	    },
	    out: function(k) {
	      return --k * k * k + 1;
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k + 2);
	    }
	  };

	  Easing.prototype.quart = {
	    "in": function(k) {
	      return k * k * k * k;
	    },
	    out: function(k) {
	      return 1 - (--k * k * k * k);
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k;
	      }
	      return -0.5 * ((k -= 2) * k * k * k - 2);
	    }
	  };

	  Easing.prototype.quint = {
	    "in": function(k) {
	      return k * k * k * k * k;
	    },
	    out: function(k) {
	      return --k * k * k * k * k + 1;
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return 0.5 * k * k * k * k * k;
	      }
	      return 0.5 * ((k -= 2) * k * k * k * k + 2);
	    }
	  };

	  Easing.prototype.sin = {
	    "in": function(k) {
	      return 1 - Math.cos(k * Math.PI / 2);
	    },
	    out: function(k) {
	      return Math.sin(k * Math.PI / 2);
	    },
	    inout: function(k) {
	      return 0.5 * (1 - Math.cos(Math.PI * k));
	    }
	  };

	  Easing.prototype.expo = {
	    "in": function(k) {
	      if (k === 0) {
	        return 0;
	      } else {
	        return Math.pow(1024, k - 1);
	      }
	    },
	    out: function(k) {
	      if (k === 1) {
	        return 1;
	      } else {
	        return 1 - Math.pow(2, -10 * k);
	      }
	    },
	    inout: function(k) {
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      if ((k *= 2) < 1) {
	        return 0.5 * Math.pow(1024, k - 1);
	      }
	      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	    }
	  };

	  Easing.prototype.circ = {
	    "in": function(k) {
	      return 1 - Math.sqrt(1 - k * k);
	    },
	    out: function(k) {
	      return Math.sqrt(1 - (--k * k));
	    },
	    inout: function(k) {
	      if ((k *= 2) < 1) {
	        return -0.5 * (Math.sqrt(1 - k * k) - 1);
	      }
	      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	    }
	  };

	  Easing.prototype.back = {
	    "in": function(k) {
	      var s;
	      s = 1.70158;
	      return k * k * ((s + 1) * k - s);
	    },
	    out: function(k) {
	      var s;
	      s = 1.70158;
	      return --k * k * ((s + 1) * k + s) + 1;
	    },
	    inout: function(k) {
	      var s;
	      s = 1.70158 * 1.525;
	      if ((k *= 2) < 1) {
	        return 0.5 * (k * k * ((s + 1) * k - s));
	      }
	      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	    }
	  };

	  Easing.prototype.elastic = {
	    "in": function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	    },
	    out: function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
	    },
	    inout: function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      if ((k *= 2) < 1) {
	        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	      }
	      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	    }
	  };

	  Easing.prototype.bounce = {
	    "in": function(k) {
	      return 1 - easing.bounce.out(1 - k);
	    },
	    out: function(k) {
	      if (k < (1 / 2.75)) {
	        return 7.5625 * k * k;
	      } else if (k < (2 / 2.75)) {
	        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	      } else if (k < (2.5 / 2.75)) {
	        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	      } else {
	        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	      }
	    },
	    inout: function(k) {
	      if (k < 0.5) {
	        return easing.bounce["in"](k * 2) * 0.5;
	      }
	      return easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
	    }
	  };

	  Easing.prototype.parseEasing = function(easing) {
	    var easingParent, type;
	    type = typeof easing;
	    if (type === 'string') {
	      if (easing.charAt(0).toLowerCase() === 'm') {
	        return this.path(easing);
	      } else {
	        easing = this._splitEasing(easing);
	        easingParent = this[easing[0]];
	        if (!easingParent) {
	          h.error("Easing with name \"" + easing[0] + "\" was not found, fallback to \"linear.none\" instead");
	          return this['linear']['none'];
	        }
	        return easingParent[easing[1]];
	      }
	    }
	    if (h.isArray(easing)) {
	      return this.bezier.apply(this, easing);
	    }
	    if ('function') {
	      return easing;
	    }
	  };

	  Easing.prototype._splitEasing = function(string) {
	    var firstPart, secondPart, split;
	    if (typeof string === 'function') {
	      return string;
	    }
	    if (typeof string === 'string' && string.length) {
	      split = string.split('.');
	      firstPart = split[0].toLowerCase() || 'linear';
	      secondPart = split[1].toLowerCase() || 'none';
	      return [firstPart, secondPart];
	    } else {
	      return ['linear', 'none'];
	    }
	  };

	  return Easing;

	})();

	easing = new Easing;

	easing.mix = mix(easing);

	module.exports = easing;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(41);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(42);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(43);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(9);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(9);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _getPrototypeOf = __webpack_require__(21);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __webpack_require__(44);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	(function() {
	  'use strict';
	  var cancel, i, isOldBrowser, lastTime, vendors, vp, w;
	  vendors = ['webkit', 'moz'];
	  i = 0;
	  w = window;
	  while (i < vendors.length && !w.requestAnimationFrame) {
	    vp = vendors[i];
	    w.requestAnimationFrame = w[vp + 'RequestAnimationFrame'];
	    cancel = w[vp + 'CancelAnimationFrame'];
	    w.cancelAnimationFrame = cancel || w[vp + 'CancelRequestAnimationFrame'];
	    ++i;
	  }
	  isOldBrowser = !w.requestAnimationFrame || !w.cancelAnimationFrame;
	  if (/iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent) || isOldBrowser) {
	    lastTime = 0;
	    w.requestAnimationFrame = function(callback) {
	      var nextTime, now;
	      now = Date.now();
	      nextTime = Math.max(lastTime + 16, now);
	      return setTimeout((function() {
	        callback(lastTime = nextTime);
	      }), nextTime - now);
	    };
	    w.cancelAnimationFrame = clearTimeout;
	  }
	})();


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	(function(root) {
	  var offset, ref, ref1;
	  if (root.performance == null) {
	    root.performance = {};
	  }
	  Date.now = Date.now || function() {
	    return (new Date).getTime();
	  };
	  if (root.performance.now == null) {
	    offset = ((ref = root.performance) != null ? (ref1 = ref.timing) != null ? ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
	    return root.performance.now = function() {
	      return Date.now() - offset;
	    };
	  }
	})(window);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Bit, h;

	h = __webpack_require__(10);

	Bit = (function() {
	  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

	  Bit.prototype.shape = 'line';

	  Bit.prototype.ratio = 1;

	  Bit.prototype.defaults = {
	    radius: 50,
	    radiusX: void 0,
	    radiusY: void 0,
	    points: 3,
	    x: 0,
	    y: 0,
	    angle: 0,
	    stroke: 'hotpink',
	    'stroke-width': 2,
	    'stroke-opacity': 1,
	    fill: 'transparent',
	    'fill-opacity': 1,
	    'stroke-dasharray': '',
	    'stroke-dashoffset': '',
	    'stroke-linecap': ''
	  };

	  function Bit(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    this.render();
	    this;
	  }

	  Bit.prototype.vars = function() {
	    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
	      this.ctx = this.o.ctx;
	    } else if (!this.o.el) {
	      h.error('You should pass a real context(ctx) to the bit');
	    }
	    this.state = {};
	    this.drawMapLength = this.drawMap.length;
	    this.extendDefaults();
	    return this.calcTransform();
	  };

	  Bit.prototype.calcTransform = function() {
	    var rotate;
	    rotate = "rotate(" + this.props.angle + ", " + this.props.x + ", " + this.props.y + ")";
	    return this.props.transform = "" + rotate;
	  };

	  Bit.prototype.extendDefaults = function() {
	    var key, ref, results, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    ref = this.defaults;
	    results = [];
	    for (key in ref) {
	      value = ref[key];
	      results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
	    }
	    return results;
	  };

	  Bit.prototype.setAttr = function(attr, value) {
	    var el, key, keys, len, results, val;
	    if (typeof attr === 'object') {
	      keys = Object.keys(attr);
	      len = keys.length;
	      el = value || this.el;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        val = attr[key];
	        results.push(el.setAttribute(key, val));
	      }
	      return results;
	    } else {
	      return this.el.setAttribute(attr, value);
	    }
	  };

	  Bit.prototype.setProp = function(attr, value) {
	    var key, results, val;
	    if (typeof attr === 'object') {
	      results = [];
	      for (key in attr) {
	        val = attr[key];
	        results.push(this.props[key] = val);
	      }
	      return results;
	    } else {
	      return this.props[attr] = value;
	    }
	  };

	  Bit.prototype.render = function() {
	    this.isRendered = true;
	    if (this.o.el != null) {
	      this.el = this.o.el;
	      return this.isForeign = true;
	    } else {
	      this.el = document.createElementNS(this.ns, this.shape || 'line');
	      !this.o.isDrawLess && this.draw();
	      return this.ctx.appendChild(this.el);
	    }
	  };

	  Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

	  Bit.prototype.draw = function() {
	    var len, name;
	    this.props.length = this.getLength();
	    len = this.drawMapLength;
	    while (len--) {
	      name = this.drawMap[len];
	      switch (name) {
	        case 'stroke-dasharray':
	        case 'stroke-dashoffset':
	          this.castStrokeDash(name);
	      }
	      this.setAttrsIfChanged(name, this.props[name]);
	    }
	    return this.state.radius = this.props.radius;
	  };

	  Bit.prototype.castStrokeDash = function(name) {
	    var cast, dash, i, j, len1, ref, stroke;
	    if (h.isArray(this.props[name])) {
	      stroke = '';
	      ref = this.props[name];
	      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	        dash = ref[i];
	        cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
	        stroke += cast + " ";
	      }
	      this.props[name] = stroke === '0 ' ? stroke = '' : stroke;
	      return this.props[name] = stroke;
	    }
	    if (typeof this.props[name] === 'object') {
	      stroke = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
	      return this.props[name] = stroke === 0 ? stroke = '' : stroke;
	    }
	  };

	  Bit.prototype.castPercent = function(percent) {
	    return percent * (this.props.length / 100);
	  };

	  Bit.prototype.setAttrsIfChanged = function(name, value) {
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setAttrIfChanged(key, value));
	      }
	      return results;
	    } else {
	      if (value == null) {
	        value = this.props[name];
	      }
	      return this.setAttrIfChanged(name, value);
	    }
	  };

	  Bit.prototype.setAttrIfChanged = function(name, value) {
	    if (this.isChanged(name, value)) {
	      this.el.setAttribute(name, value);
	      return this.state[name] = value;
	    }
	  };

	  Bit.prototype.isChanged = function(name, value) {
	    if (value == null) {
	      value = this.props[name];
	    }
	    return this.state[name] !== value;
	  };

	  Bit.prototype.getLength = function() {
	    var ref;
	    if ((((ref = this.el) != null ? ref.getTotalLength : void 0) != null) && this.el.getAttribute('d')) {
	      return this.el.getTotalLength();
	    } else {
	      return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	    }
	  };

	  return Bit;

	})();

	module.exports = Bit;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Circle,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	Circle = (function(superClass) {
	  extend(Circle, superClass);

	  function Circle() {
	    return Circle.__super__.constructor.apply(this, arguments);
	  }

	  Circle.prototype.shape = 'ellipse';

	  Circle.prototype.draw = function() {
	    var rx, ry;
	    rx = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    ry = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    this.setAttrsIfChanged({
	      rx: rx,
	      ry: ry,
	      cx: this.props.x,
	      cy: this.props.y
	    });
	    return Circle.__super__.draw.apply(this, arguments);
	  };

	  Circle.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * Math.PI * Math.sqrt((Math.pow(radiusX, 2) + Math.pow(radiusY, 2)) / 2);
	  };

	  return Circle;

	})(Bit);

	module.exports = Circle;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Line,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	Line = (function(superClass) {
	  extend(Line, superClass);

	  function Line() {
	    return Line.__super__.constructor.apply(this, arguments);
	  }

	  Line.prototype.draw = function() {
	    var radiusX;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    this.setAttrsIfChanged({
	      x1: this.props.x - radiusX,
	      x2: this.props.x + radiusX,
	      y1: this.props.y,
	      y2: this.props.y
	    });
	    return Line.__super__.draw.apply(this, arguments);
	  };

	  return Line;

	})(Bit);

	module.exports = Line;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Zigzag,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	Zigzag = (function(superClass) {
	  extend(Zigzag, superClass);

	  function Zigzag() {
	    return Zigzag.__super__.constructor.apply(this, arguments);
	  }

	  Zigzag.prototype.shape = 'path';

	  Zigzag.prototype.ratio = 1.43;

	  Zigzag.prototype.draw = function() {
	    var char, i, iX, iX2, iY, iY2, j, points, radiusX, radiusY, ref, stepX, stepY, strokeWidth, xStart, yStart;
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    points = '';
	    stepX = 2 * radiusX / this.props.points;
	    stepY = 2 * radiusY / this.props.points;
	    strokeWidth = this.props['stroke-width'];
	    xStart = this.props.x - radiusX;
	    yStart = this.props.y - radiusY;
	    for (i = j = ref = this.props.points; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
	      iX = xStart + i * stepX + strokeWidth;
	      iY = yStart + i * stepY + strokeWidth;
	      iX2 = xStart + (i - 1) * stepX + strokeWidth;
	      iY2 = yStart + (i - 1) * stepY + strokeWidth;
	      char = i === this.props.points ? 'M' : 'L';
	      points += "" + char + iX + "," + iY + " l0, -" + stepY + " l-" + stepX + ", 0";
	    }
	    this.setAttr({
	      d: points
	    });
	    return Zigzag.__super__.draw.apply(this, arguments);
	  };

	  return Zigzag;

	})(Bit);

	module.exports = Zigzag;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Rect,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	Rect = (function(superClass) {
	  extend(Rect, superClass);

	  function Rect() {
	    return Rect.__super__.constructor.apply(this, arguments);
	  }

	  Rect.prototype.shape = 'rect';

	  Rect.prototype.ratio = 1.43;

	  Rect.prototype.draw = function() {
	    var radiusX, radiusY;
	    Rect.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return this.setAttrsIfChanged({
	      width: 2 * radiusX,
	      height: 2 * radiusY,
	      x: this.props.x - radiusX,
	      y: this.props.y - radiusY
	    });
	  };

	  Rect.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * radiusX + 2 * radiusY;
	  };

	  return Rect;

	})(Bit);

	module.exports = Rect;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Polygon, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	h = __webpack_require__(10);

	Polygon = (function(superClass) {
	  extend(Polygon, superClass);

	  function Polygon() {
	    return Polygon.__super__.constructor.apply(this, arguments);
	  }

	  Polygon.prototype.shape = 'path';

	  Polygon.prototype.draw = function() {
	    this.drawShape();
	    return Polygon.__super__.draw.apply(this, arguments);
	  };

	  Polygon.prototype.drawShape = function() {
	    var char, d, i, j, k, len, point, ref, ref1, step;
	    step = 360 / this.props.points;
	    this.radialPoints = [];
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      this.radialPoints.push(h.getRadialPoint({
	        radius: this.props.radius,
	        radiusX: this.props.radiusX,
	        radiusY: this.props.radiusY,
	        angle: i * step,
	        center: {
	          x: this.props.x,
	          y: this.props.y
	        }
	      }));
	    }
	    d = '';
	    ref1 = this.radialPoints;
	    for (i = k = 0, len = ref1.length; k < len; i = ++k) {
	      point = ref1[i];
	      char = i === 0 ? 'M' : 'L';
	      d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
	    }
	    return this.setAttr({
	      d: d += 'z'
	    });
	  };

	  Polygon.prototype.getLength = function() {
	    return this.el.getTotalLength();
	  };

	  return Polygon;

	})(Bit);

	module.exports = Polygon;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Cross,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	Cross = (function(superClass) {
	  extend(Cross, superClass);

	  function Cross() {
	    return Cross.__super__.constructor.apply(this, arguments);
	  }

	  Cross.prototype.shape = 'path';

	  Cross.prototype.draw = function() {
	    var d, line1, line2, radiusX, radiusY, x1, x2, y1, y2;
	    Cross.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
	    y1 = this.props.y - radiusY;
	    y2 = this.props.y + radiusY;
	    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
	    d = line1 + " " + line2;
	    return this.setAttr({
	      d: d
	    });
	  };

	  Cross.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * (radiusX + radiusY);
	  };

	  return Cross;

	})(Bit);

	module.exports = Cross;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */
	var Bit, Equal,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = __webpack_require__(27);

	Equal = (function(superClass) {
	  extend(Equal, superClass);

	  function Equal() {
	    return Equal.__super__.constructor.apply(this, arguments);
	  }

	  Equal.prototype.shape = 'path';

	  Equal.prototype.ratio = 1.43;

	  Equal.prototype.draw = function() {
	    var d, i, j, radiusX, radiusY, ref, x1, x2, y, yStart, yStep;
	    Equal.__super__.draw.apply(this, arguments);
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    d = '';
	    yStep = 2 * radiusY / (this.props.points - 1);
	    yStart = this.props.y - radiusY;
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      y = "" + (i * yStep + yStart);
	      d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
	    }
	    return this.setAttr({
	      d: d
	    });
	  };

	  Equal.prototype.getLength = function() {
	    return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	  };

	  return Equal;

	})(Bit);

	module.exports = Equal;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*!
	  LegoMushroom @legomushroom http://legomushroom.com
	  MIT License 2014
	 */

	/* istanbul ignore next */
	(function() {
	  var Main;
	  Main = (function() {
	    function Main(o) {
	      this.o = o != null ? o : {};
	      if (window.isAnyResizeEventInited) {
	        return;
	      }
	      this.vars();
	      this.redefineProto();
	    }

	    Main.prototype.vars = function() {
	      window.isAnyResizeEventInited = true;
	      this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
	      return this.timerElements = {
	        img: 1,
	        textarea: 1,
	        input: 1,
	        embed: 1,
	        object: 1,
	        svg: 1,
	        canvas: 1,
	        tr: 1,
	        tbody: 1,
	        thead: 1,
	        tfoot: 1,
	        a: 1,
	        select: 1,
	        option: 1,
	        optgroup: 1,
	        dl: 1,
	        dt: 1,
	        br: 1,
	        basefont: 1,
	        font: 1,
	        col: 1,
	        iframe: 1
	      };
	    };

	    Main.prototype.redefineProto = function() {
	      var i, it, proto, t;
	      it = this;
	      return t = (function() {
	        var j, len, ref, results;
	        ref = this.allowedProtos;
	        results = [];
	        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	          proto = ref[i];
	          if (proto.prototype == null) {
	            continue;
	          }
	          results.push((function(proto) {
	            var listener, remover;
	            listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	            (function(listener) {
	              var wrappedListener;
	              wrappedListener = function() {
	                var option;
	                if (this !== window || this !== document) {
	                  option = arguments[0] === 'onresize' && !this.isAnyResizeEventInited;
	                  option && it.handleResize({
	                    args: arguments,
	                    that: this
	                  });
	                }
	                return listener.apply(this, arguments);
	              };
	              if (proto.prototype.addEventListener) {
	                return proto.prototype.addEventListener = wrappedListener;
	              } else if (proto.prototype.attachEvent) {
	                return proto.prototype.attachEvent = wrappedListener;
	              }
	            })(listener);
	            remover = proto.prototype.removeEventListener || proto.prototype.detachEvent;
	            return (function(remover) {
	              var wrappedRemover;
	              wrappedRemover = function() {
	                this.isAnyResizeEventInited = false;
	                this.iframe && this.removeChild(this.iframe);
	                return remover.apply(this, arguments);
	              };
	              if (proto.prototype.removeEventListener) {
	                return proto.prototype.removeEventListener = wrappedRemover;
	              } else if (proto.prototype.detachEvent) {
	                return proto.prototype.detachEvent = wrappedListener;
	              }
	            })(remover);
	          })(proto));
	        }
	        return results;
	      }).call(this);
	    };

	    Main.prototype.handleResize = function(args) {
	      var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, ref;
	      el = args.that;
	      if (!this.timerElements[el.tagName.toLowerCase()]) {
	        iframe = document.createElement('iframe');
	        el.appendChild(iframe);
	        iframe.style.width = '100%';
	        iframe.style.height = '100%';
	        iframe.style.position = 'absolute';
	        iframe.style.zIndex = -999;
	        iframe.style.opacity = 0;
	        iframe.style.top = 0;
	        iframe.style.left = 0;
	        computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
	        isNoPos = el.style.position === '';
	        isStatic = computedStyle.position === 'static' && isNoPos;
	        isEmpty = computedStyle.position === '' && el.style.position === '';
	        if (isStatic || isEmpty) {
	          el.style.position = 'relative';
	        }
	        if ((ref = iframe.contentWindow) != null) {
	          ref.onresize = (function(_this) {
	            return function(e) {
	              return _this.dispatchEvent(el);
	            };
	          })(this);
	        }
	        el.iframe = iframe;
	      } else {
	        this.initTimer(el);
	      }
	      return el.isAnyResizeEventInited = true;
	    };

	    Main.prototype.initTimer = function(el) {
	      var height, width;
	      width = 0;
	      height = 0;
	      return this.interval = setInterval((function(_this) {
	        return function() {
	          var newHeight, newWidth;
	          newWidth = el.offsetWidth;
	          newHeight = el.offsetHeight;
	          if (newWidth !== width || newHeight !== height) {
	            _this.dispatchEvent(el);
	            width = newWidth;
	            return height = newHeight;
	          }
	        };
	      })(this), this.o.interval || 62.5);
	    };

	    Main.prototype.dispatchEvent = function(el) {
	      var e;
	      if (document.createEvent) {
	        e = document.createEvent('HTMLEvents');
	        e.initEvent('onresize', false, false);
	        return el.dispatchEvent(e);
	      } else if (document.createEventObject) {
	        e = document.createEventObject();
	        return el.fireEvent('onresize', e);
	      } else {
	        return false;
	      }
	    };

	    Main.prototype.destroy = function() {
	      var i, it, j, len, proto, ref, results;
	      clearInterval(this.interval);
	      this.interval = null;
	      window.isAnyResizeEventInited = false;
	      it = this;
	      ref = this.allowedProtos;
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        proto = ref[i];
	        if (proto.prototype == null) {
	          continue;
	        }
	        results.push((function(proto) {
	          var listener;
	          listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	          if (proto.prototype.addEventListener) {
	            proto.prototype.addEventListener = Element.prototype.addEventListener;
	          } else if (proto.prototype.attachEvent) {
	            proto.prototype.attachEvent = Element.prototype.attachEvent;
	          }
	          if (proto.prototype.removeEventListener) {
	            return proto.prototype.removeEventListener = Element.prototype.removeEventListener;
	          } else if (proto.prototype.detachEvent) {
	            return proto.prototype.detachEvent = Element.prototype.detachEvent;
	          }
	        })(proto));
	      }
	      return results;
	    };

	    return Main;

	  })();
	  if (true) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return new Main;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "object") && (typeof module.exports === "object")) {
	    return module.exports = new Main;
	  } else {
	    if (typeof window !== "undefined" && window !== null) {
	      window.AnyResizeEvent = Main;
	    }
	    return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
	  }
	})();


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var BezierEasing, bezierEasing, h,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	h = __webpack_require__(10);


	/**
	 * Copyright (c) 2014 Gaëtan Renaudeau http://goo.gl/El3k7u
	 * Adopted from https://github.com/gre/bezier-easing
	 */

	BezierEasing = (function() {
	  function BezierEasing(o) {
	    this.vars();
	    return this.generate;
	  }

	  BezierEasing.prototype.vars = function() {
	    return this.generate = h.bind(this.generate, this);
	  };

	  BezierEasing.prototype.generate = function(mX1, mY1, mX2, mY2) {
	    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, j, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str;
	    if (arguments.length < 4) {
	      return this.error('Bezier function expects 4 arguments');
	    }
	    for (i = j = 0; j < 4; i = ++j) {
	      arg = arguments[i];
	      if (typeof arg !== "number" || isNaN(arg) || !isFinite(arg)) {
	        return this.error('Bezier function expects 4 arguments');
	      }
	    }
	    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
	      return this.error('Bezier x values should be > 0 and < 1');
	    }
	    NEWTON_ITERATIONS = 4;
	    NEWTON_MIN_SLOPE = 0.001;
	    SUBDIVISION_PRECISION = 0.0000001;
	    SUBDIVISION_MAX_ITERATIONS = 10;
	    kSplineTableSize = 11;
	    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	    float32ArraySupported = indexOf.call(global, 'Float32Array') >= 0;
	    A = function(aA1, aA2) {
	      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	    };
	    B = function(aA1, aA2) {
	      return 3.0 * aA2 - 6.0 * aA1;
	    };
	    C = function(aA1) {
	      return 3.0 * aA1;
	    };
	    calcBezier = function(aT, aA1, aA2) {
	      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	    };
	    getSlope = function(aT, aA1, aA2) {
	      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	    };
	    newtonRaphsonIterate = function(aX, aGuessT) {
	      var currentSlope, currentX;
	      i = 0;
	      while (i < NEWTON_ITERATIONS) {
	        currentSlope = getSlope(aGuessT, mX1, mX2);

	        /* istanbul ignore if */
	        if (currentSlope === 0.0) {
	          return aGuessT;
	        }
	        currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	        aGuessT -= currentX / currentSlope;
	        ++i;
	      }
	      return aGuessT;
	    };
	    calcSampleValues = function() {
	      i = 0;
	      while (i < kSplineTableSize) {
	        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	        ++i;
	      }
	    };

	    /* istanbul ignore next */
	    binarySubdivide = function(aX, aA, aB) {
	      var currentT, currentX, isBig;
	      currentX = void 0;
	      currentT = void 0;
	      i = 0;
	      while (true) {
	        currentT = aA + (aB - aA) / 2.0;
	        currentX = calcBezier(currentT, mX1, mX2) - aX;
	        if (currentX > 0.0) {
	          aB = currentT;
	        } else {
	          aA = currentT;
	        }
	        isBig = Math.abs(currentX) > SUBDIVISION_PRECISION;
	        if (!(isBig && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	          break;
	        }
	      }
	      return currentT;
	    };
	    getTForX = function(aX) {
	      var currentSample, delta, dist, guessForT, initialSlope, intervalStart, lastSample;
	      intervalStart = 0.0;
	      currentSample = 1;
	      lastSample = kSplineTableSize - 1;
	      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	        intervalStart += kSampleStepSize;
	        ++currentSample;
	      }
	      --currentSample;
	      delta = mSampleValues[currentSample + 1] - mSampleValues[currentSample];
	      dist = (aX - mSampleValues[currentSample]) / delta;
	      guessForT = intervalStart + dist * kSampleStepSize;
	      initialSlope = getSlope(guessForT, mX1, mX2);
	      if (initialSlope >= NEWTON_MIN_SLOPE) {
	        return newtonRaphsonIterate(aX, guessForT);
	      } else {

	        /* istanbul ignore next */
	        if (initialSlope === 0.0) {
	          return guessForT;
	        } else {
	          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
	        }
	      }
	    };
	    precompute = function() {
	      var _precomputed;
	      _precomputed = true;
	      if (mX1 !== mY1 || mX2 !== mY2) {
	        return calcSampleValues();
	      }
	    };
	    mSampleValues = !float32ArraySupported ? new Array(kSplineTableSize) : new Float32Array(kSplineTableSize);
	    _precomputed = false;
	    f = function(aX) {
	      if (!_precomputed) {
	        precompute();
	      }
	      if (mX1 === mY1 && mX2 === mY2) {
	        return aX;
	      }
	      if (aX === 0) {
	        return 0;
	      }
	      if (aX === 1) {
	        return 1;
	      }
	      return calcBezier(getTForX(aX), mY1, mY2);
	    };
	    str = "bezier(" + [mX1, mY1, mX2, mY2] + ")";
	    f.toStr = function() {
	      return str;
	    };
	    return f;
	  };

	  BezierEasing.prototype.error = function(msg) {
	    return h.error(msg);
	  };

	  return BezierEasing;

	})();

	bezierEasing = new BezierEasing;

	module.exports = bezierEasing;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var PathEasing, h;

	h = __webpack_require__(10);

	PathEasing = (function() {
	  PathEasing.prototype._vars = function() {
	    this._precompute = h.clamp(this.o.precompute || 1450, 100, 10000);
	    this._step = 1 / this._precompute;
	    this._rect = this.o.rect || 100;
	    this._approximateMax = this.o.approximateMax || 5;
	    this._eps = this.o.eps || 0.001;
	    return this._boundsPrevProgress = -1;
	  };

	  function PathEasing(path, o1) {
	    this.o = o1 != null ? o1 : {};
	    if (path === 'creator') {
	      return;
	    }
	    this.path = h.parsePath(path);
	    if (this.path == null) {
	      return h.error('Error while parsing the path');
	    }
	    this._vars();
	    this.path.setAttribute('d', this._normalizePath(this.path.getAttribute('d')));
	    this.pathLength = this.path.getTotalLength();
	    this.sample = h.bind(this.sample, this);
	    this._hardSample = h.bind(this._hardSample, this);
	    this._preSample();
	    this;
	  }

	  PathEasing.prototype._preSample = function() {
	    var i, j, length, point, progress, ref, results;
	    this._samples = [];
	    results = [];
	    for (i = j = 0, ref = this._precompute; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      progress = i * this._step;
	      length = this.pathLength * progress;
	      point = this.path.getPointAtLength(length);
	      results.push(this._samples[i] = {
	        point: point,
	        length: length,
	        progress: progress
	      });
	    }
	    return results;
	  };

	  PathEasing.prototype._findBounds = function(array, p) {
	    var buffer, direction, end, i, j, len, loopEnd, pointP, pointX, ref, ref1, start, value;
	    if (p === this._boundsPrevProgress) {
	      return this._prevBounds;
	    }
	    if (this._boundsStartIndex == null) {
	      this._boundsStartIndex = 0;
	    }
	    len = array.length;
	    if (this._boundsPrevProgress > p) {
	      loopEnd = 0;
	      direction = 'reverse';
	    } else {
	      loopEnd = len;
	      direction = 'forward';
	    }
	    if (direction === 'forward') {
	      start = array[0];
	      end = array[array.length - 1];
	    } else {
	      start = array[array.length - 1];
	      end = array[0];
	    }
	    for (i = j = ref = this._boundsStartIndex, ref1 = loopEnd; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
	      value = array[i];
	      pointX = value.point.x / this._rect;
	      pointP = p;
	      if (direction === 'reverse') {
	        buffer = pointX;
	        pointX = pointP;
	        pointP = buffer;
	      }
	      if (pointX < pointP) {
	        start = value;
	        this._boundsStartIndex = i;
	      } else {
	        end = value;
	        break;
	      }
	    }
	    this._boundsPrevProgress = p;
	    return this._prevBounds = {
	      start: start,
	      end: end
	    };
	  };

	  PathEasing.prototype.sample = function(p) {
	    var bounds, res;
	    p = h.clamp(p, 0, 1);
	    bounds = this._findBounds(this._samples, p);
	    res = this._checkIfBoundsCloseEnough(p, bounds);
	    if (res != null) {
	      return res;
	    }
	    return this._findApproximate(p, bounds.start, bounds.end);
	  };

	  PathEasing.prototype._checkIfBoundsCloseEnough = function(p, bounds) {
	    var point, y;
	    point = void 0;
	    y = this._checkIfPointCloseEnough(p, bounds.start.point);
	    if (y != null) {
	      return y;
	    }
	    return this._checkIfPointCloseEnough(p, bounds.end.point);
	  };

	  PathEasing.prototype._checkIfPointCloseEnough = function(p, point) {
	    if (h.closeEnough(p, point.x / this._rect, this._eps)) {
	      return this._resolveY(point);
	    }
	  };

	  PathEasing.prototype._approximate = function(start, end, p) {
	    var deltaP, percentP;
	    deltaP = end.point.x - start.point.x;
	    percentP = (p - (start.point.x / this._rect)) / (deltaP / this._rect);
	    return start.length + percentP * (end.length - start.length);
	  };

	  PathEasing.prototype._findApproximate = function(p, start, end, approximateMax) {
	    var approximation, args, newPoint, point, x;
	    if (approximateMax == null) {
	      approximateMax = this._approximateMax;
	    }
	    approximation = this._approximate(start, end, p);
	    point = this.path.getPointAtLength(approximation);
	    x = point.x / this._rect;
	    if (h.closeEnough(p, x, this._eps)) {
	      return this._resolveY(point);
	    } else {
	      if (--approximateMax < 1) {
	        return this._resolveY(point);
	      }
	      newPoint = {
	        point: point,
	        length: approximation
	      };
	      args = p < x ? [p, start, newPoint, approximateMax] : [p, newPoint, end, approximateMax];
	      return this._findApproximate.apply(this, args);
	    }
	  };

	  PathEasing.prototype._resolveY = function(point) {
	    return 1 - (point.y / this._rect);
	  };

	  PathEasing.prototype._normalizePath = function(path) {
	    var commands, endIndex, normalizedPath, points, startIndex, svgCommandsRegexp;
	    svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim;
	    points = path.split(svgCommandsRegexp);
	    points.shift();
	    commands = path.match(svgCommandsRegexp);
	    startIndex = 0;
	    points[startIndex] = this._normalizeSegment(points[startIndex]);
	    endIndex = points.length - 1;
	    points[endIndex] = this._normalizeSegment(points[endIndex], this._rect || 100);
	    return normalizedPath = this._joinNormalizedPath(commands, points);
	  };

	  PathEasing.prototype._joinNormalizedPath = function(commands, points) {
	    var command, i, j, len1, normalizedPath, space;
	    normalizedPath = '';
	    for (i = j = 0, len1 = commands.length; j < len1; i = ++j) {
	      command = commands[i];
	      space = i === 0 ? '' : ' ';
	      normalizedPath += "" + space + command + (points[i].trim());
	    }
	    return normalizedPath;
	  };

	  PathEasing.prototype._normalizeSegment = function(segment, value) {
	    var i, j, lastPoint, len1, nRgx, pairs, parsedX, point, space, x;
	    if (value == null) {
	      value = 0;
	    }
	    segment = segment.trim();
	    nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim;
	    pairs = this._getSegmentPairs(segment.match(nRgx));
	    lastPoint = pairs[pairs.length - 1];
	    x = lastPoint[0];
	    parsedX = Number(x);
	    if (parsedX !== value) {
	      segment = '';
	      lastPoint[0] = value;
	      for (i = j = 0, len1 = pairs.length; j < len1; i = ++j) {
	        point = pairs[i];
	        space = i === 0 ? '' : ' ';
	        segment += "" + space + point[0] + "," + point[1];
	      }
	    }
	    return segment;
	  };

	  PathEasing.prototype._getSegmentPairs = function(array) {
	    var i, j, len1, newArray, pair, value;
	    if (array.length % 2 !== 0) {
	      h.error('Failed to parse the path - segment pairs are not even.', array);
	    }
	    newArray = [];
	    for (i = j = 0, len1 = array.length; j < len1; i = j += 2) {
	      value = array[i];
	      pair = [array[i], array[i + 1]];
	      newArray.push(pair);
	    }
	    return newArray;
	  };

	  PathEasing.prototype.create = function(path, o) {
	    var handler;
	    handler = new PathEasing(path, o);
	    handler.sample.path = handler.path;
	    return handler.sample;
	  };

	  return PathEasing;

	})();

	module.exports = PathEasing;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var create, easing, getNearest, mix, parseIfEasing, sort,
	  slice = [].slice;

	easing = null;

	parseIfEasing = function(item) {
	  if (typeof item.value === 'number') {
	    return item.value;
	  } else {
	    return easing.parseEasing(item.value);
	  }
	};

	sort = function(a, b) {
	  var returnValue;
	  a.value = parseIfEasing(a);
	  b.value = parseIfEasing(b);
	  returnValue = 0;
	  a.to < b.to && (returnValue = -1);
	  a.to > b.to && (returnValue = 1);
	  return returnValue;
	};

	getNearest = function(array, progress) {
	  var i, index, j, len, value;
	  index = 0;
	  for (i = j = 0, len = array.length; j < len; i = ++j) {
	    value = array[i];
	    index = i;
	    if (value.to > progress) {
	      break;
	    }
	  }
	  return index;
	};

	mix = function() {
	  var args;
	  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  if (args.length > 1) {
	    args = args.sort(sort);
	  } else {
	    args[0].value = parseIfEasing(args[0]);
	  }
	  return function(progress) {
	    var index, value;
	    index = getNearest(args, progress);
	    if (index !== -1) {
	      value = args[index].value;
	      if (index === args.length - 1 && progress > args[index].to) {
	        return 1;
	      }
	      if (typeof value === 'function') {
	        return value(progress);
	      } else {
	        return value;
	      }
	    }
	  };
	};

	create = function(e) {
	  easing = e;
	  return mix;
	};

	module.exports = create;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(1), __esModule: true };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	__webpack_require__(57);
	module.exports = __webpack_require__(58);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	module.exports = __webpack_require__(55).Object.keys;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	module.exports = __webpack_require__(55).Object.getPrototypeOf;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	__webpack_require__(56);
	module.exports = __webpack_require__(60)('iterator');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(62);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	module.exports = __webpack_require__(55).Object.setPrototypeOf;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = __webpack_require__(9);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _h = __webpack_require__(10);

	var _h2 = _interopRequireDefault(_h);

	var _shapesMap = __webpack_require__(11);

	var _shapesMap2 = _interopRequireDefault(_shapesMap);

	var _burst = __webpack_require__(12);

	var _burst2 = _interopRequireDefault(_burst);

	var _transit = __webpack_require__(13);

	var _transit2 = _interopRequireDefault(_transit);

	var _swirl = __webpack_require__(14);

	var _swirl2 = _interopRequireDefault(_swirl);

	var _stagger = __webpack_require__(2);

	var _stagger2 = _interopRequireDefault(_stagger);

	var _spriter = __webpack_require__(3);

	var _spriter2 = _interopRequireDefault(_spriter);

	var _motionPath = __webpack_require__(15);

	var _motionPath2 = _interopRequireDefault(_motionPath);

	var _tween = __webpack_require__(4);

	var _tween2 = _interopRequireDefault(_tween);

	var _timeline = __webpack_require__(5);

	var _timeline2 = _interopRequireDefault(_timeline);

	var _tweener = __webpack_require__(6);

	var _tweener2 = _interopRequireDefault(_tweener);

	var _tweenable = __webpack_require__(7);

	var _tweenable2 = _interopRequireDefault(_tweenable);

	var _easing = __webpack_require__(16);

	var _easing2 = _interopRequireDefault(_easing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.mojs = {
	  revision: '0.173.0', isDebug: true, helpers: _h2.default,
	  Transit: _transit2.default, Swirl: _swirl2.default, Burst: _burst2.default, stagger: _stagger2.default, Spriter: _spriter2.default, MotionPath: _motionPath2.default,
	  Tween: _tween2.default, Timeline: _timeline2.default, Tweenable: _tweenable2.default, tweener: _tweener2.default, easing: _easing2.default, shapesMap: _shapesMap2.default
	};

	mojs.h = mojs.helpers;
	mojs.delta = mojs.h.delta;

	// ### istanbul ignore next ###
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return mojs;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	// ### istanbul ignore next ###
	if ((false ? 'undefined' : (0, _typeof3.default)(module)) === "object" && (0, _typeof3.default)(module.exports) === "object") {
	  module.exports = mojs;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(62);
	__webpack_require__(65);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(64);
	module.exports = __webpack_require__(55).Symbol;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(66);

	__webpack_require__(67)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	var Iterators = __webpack_require__(69);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(70)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(71)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(72)
	  , get      = __webpack_require__(73);
	module.exports = __webpack_require__(55).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(66);

	__webpack_require__(67)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(74)('wks')
	  , uid    = __webpack_require__(75)
	  , Symbol = __webpack_require__(76).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(77);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(78).set});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(62)
	  , global         = __webpack_require__(76)
	  , has            = __webpack_require__(79)
	  , DESCRIPTORS    = __webpack_require__(80)
	  , $export        = __webpack_require__(77)
	  , redefine       = __webpack_require__(81)
	  , $fails         = __webpack_require__(82)
	  , shared         = __webpack_require__(74)
	  , setToStringTag = __webpack_require__(83)
	  , uid            = __webpack_require__(75)
	  , wks            = __webpack_require__(60)
	  , keyOf          = __webpack_require__(84)
	  , $names         = __webpack_require__(85)
	  , enumKeys       = __webpack_require__(86)
	  , isArray        = __webpack_require__(87)
	  , anObject       = __webpack_require__(72)
	  , toIObject      = __webpack_require__(88)
	  , createDesc     = __webpack_require__(89)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(90)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(88);

	__webpack_require__(67)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(91);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(77)
	  , core    = __webpack_require__(55)
	  , fails   = __webpack_require__(82);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(92)
	  , step             = __webpack_require__(93)
	  , Iterators        = __webpack_require__(69)
	  , toIObject        = __webpack_require__(88);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(71)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(96)
	  , defined   = __webpack_require__(91);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(90)
	  , $export        = __webpack_require__(77)
	  , redefine       = __webpack_require__(81)
	  , hide           = __webpack_require__(94)
	  , has            = __webpack_require__(79)
	  , Iterators      = __webpack_require__(69)
	  , $iterCreate    = __webpack_require__(95)
	  , setToStringTag = __webpack_require__(83)
	  , getProto       = __webpack_require__(62).getProto
	  , ITERATOR       = __webpack_require__(60)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(97);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(98)
	  , ITERATOR  = __webpack_require__(60)('iterator')
	  , Iterators = __webpack_require__(69);
	module.exports = __webpack_require__(55).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(76)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(76)
	  , core      = __webpack_require__(55)
	  , ctx       = __webpack_require__(99)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(62).getDesc
	  , isObject = __webpack_require__(97)
	  , anObject = __webpack_require__(72);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(99)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(82)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(94);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(62).setDesc
	  , has = __webpack_require__(79)
	  , TAG = __webpack_require__(60)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(62)
	  , toIObject = __webpack_require__(88);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(88)
	  , getNames  = __webpack_require__(62).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(62);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(100);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(101)
	  , defined = __webpack_require__(91);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = true;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(62)
	  , createDesc = __webpack_require__(89);
	module.exports = __webpack_require__(80) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(62)
	  , descriptor     = __webpack_require__(89)
	  , setToStringTag = __webpack_require__(83)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(94)(IteratorPrototype, __webpack_require__(60)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(100)
	  , TAG = __webpack_require__(60)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(102);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(100);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }
/******/ ]);