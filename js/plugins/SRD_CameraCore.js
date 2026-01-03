/*:
 * @plugindesc 镜头核心插件
 * @author (飞天大胖喵移植汉化)SumRndmDde
 * @target MZ
 * 
 * @param Default Zoom
 * @text 默认缩放
 * @desc RPG Maker游戏使用的默认缩放。
 * @default 1
 *
 * @param Zoom Pictures?
 * @text 此功能已弃用
 * @desc 此功能已弃用
 * 如果“为真”，那么通过“显示图片”事件创建的图片将随相机放大。
 * @default true
 *
 * @param Margin Formula
 * @text 缩小公式
 * @desc 缩小时用于确定渲染边界的公式。
 * @default (Graphics.width / scale) - Graphics.width
 *
 * @param Fix Black Lines
 * @text 此功能已弃用
 * @desc 此功能已弃用
 * Yanfly的核心引擎在缩放时可能会出现黑线。将其设置为“true”即可修复。
 * @default false
 *
 * @command zoomin
 * @text 镜头放大（大于1放大）
 * @desc 镜头放大
 *
 * @arg scale
 * @type string
 * @default 1
 * @text 比例（大于1放大）
 * @desc 比例（大于1放大）
 * 
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @command zoomout
 * @text 镜头放大（小于1放大）
 * @desc 镜头放大
 *
 * @arg scale
 * @type string
 * @default 1
 * @text 比例（小于1放大）
 * @desc 比例（小于1放大）
 *
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * @help
 *
 * @command focuscameraevent
 * @text 移动镜头到事件
 * @desc 移动镜头到事件
 *
 * @arg event
 * @type number
 * @default 
 * @text 地图事件Id
 * @desc 地图事件Id
 *
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @command focuscamerafollower
 * @text 移动镜头到跟随者
 * @desc 移动镜头到跟随者
 *
 * @arg follower
 * @type number
 * @default
 * @text 跟随者Id
 * @desc 跟随者Id
 *
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @command focuscameraplayer
 * @text 移动镜头到玩家
 * @desc 移动镜头到玩家
 *
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @command resetfocus
 * @text 镜头复位
 * @desc 镜头复位
 *
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @command resetzoom
 * @text 缩放复位
 * @desc 缩放复位
 *
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @command waitforcamera
 * @text 等待镜头移动缩放到位
 * @desc 等待镜头移动缩放到位
 * 
 * @command waitforcamerafocus
 * @text 等待镜头移动到位
 * @desc 等待镜头移动到位
 * 
 * @command waitforcamerazoom
 * @text 等待镜头缩放到位
 * @desc 等待镜头缩放到位
 * 
 * @command shiftcamera
 * @text (失效)移动到地图指定XY位置
 * @desc 移动到地图指定XY位置
 *
 * @arg x
 * @type number
 * @default 0
 * @text 地图x位置
 * @desc 地图x位置
 * 
 * @arg y
 * @type number
 * @default 0
 * @text 地图y位置
 * @desc 地图y位置
 * 
 * @arg duration
 * @type number
 * @default 60
 * @text 时间（帧）
 * @desc 时间（帧）
 * 
 * @help
 * 
 * 插件指令中直接调用即可，部分功能为移植完成，感觉也没什么用，大部分已经汉化，自用的
 * 功能已经移植完成了，剩下的有缘人补全吧，哈哈哈
 * 
 * Camera Core
 * Version 1.05
 * SumRndmDde
 *
 *
 * This plugin allows developers to preform various camera motions including 
 * focusing and zooming.
 *
 *
 * ==============================================================================
 *  Camera Focusing
 * ==============================================================================
 *
 * If you wish for the camera to focus on something, use the following
 * Plugin Commands:
 *
 *
 *   FocusCamera [x] [y] [duration]
 *
 * 在地图上插入一个X和Y坐标，让摄像机聚焦于它。
 * 持续时间决定了相机转换需要多少帧。
 *
 *
 *   FocusCamera event [id] [duration]
 *
 * 将“id”替换为当前地图上的事件id，以获得相机对焦
 * 关于那个特定的事件。持续时间决定了它需要多少帧
 * 相机转换。
 *
 *
 *   FocusCamera follower [id] [duration]
 *
 * 将当前队伍中的“id”替换为追随者的索引，以获得相机
 * 关注特定的追随者。持续时间决定了它有多少帧
 * 将相机转换。
 *
 *
 *   FocusCamera player [duration]
 *
 * 将相机聚焦到播放器上。
 * 持续时间决定了相机转换需要多少帧。
 *
 *
 *   ResetFocus [duration]
 *
 * 将相机上的焦点重新设置到播放器上。
 * 持续时间决定了相机转换需要多少帧。
 *
 *
 * ==============================================================================
 *  Zooming
 * ==============================================================================
 *
 * In order to zoom the camera in and out, use the following commands:
 *
 *
 *   ZoomIn [scale] [duration]
 *
 * 将“比例”设置为你希望相机放大的比例。
 * 将比例设置为1将是正常的比例，大于1将放大。
 * 持续时间决定了相机转换需要多少帧。
 *
 *
 *   ZoomOut [scale] [duration]
 *
 * 将“比例”设置为你希望相机放大的比例。
 * 将比例设置为1将是正常的比例，大于1将缩小。
 * 持续时间决定了相机转换需要多少帧。
 *
 *
 *   ResetZoom [duration]
 *
 * 重置缩放回其默认值。
 * 持续时间决定了相机转换需要多少帧。
 *
 *
 * ==============================================================================
 *  Camera Shifting
 * ==============================================================================
 *
 * If you wish to shift the camera, use the following Plugin Command:
 *
 *   ShiftCamera [x-shift] [y-shift] [duration]
 *
 * 这将移动相机的某个x和/或y块。
 * 这不会改变相机的焦点。如果相机聚焦在
 * 例如，玩家和摄像机向上移动2个方格，摄像机
 * 会继续跟随玩家，只是会向上移动两个方格。
 *
 *
 * ==============================================================================
 *  Camera Waiting
 * ==============================================================================
 *
 * If you wish to have an event "wait" before a camera is done moving, use the 
 * following Plugin Commands:
 *
 *
 *   WaitForCamera
 *
 * 这将停止事件处理，直到相机完成它的焦点
 * 和缩放。
 *
 *
 *   WaitForCameraFocus
 *
 * 这将等待相机完成它的运动到一个新的焦点。
 *
 *
 *   WaitForCameraZoom
 *
 * 这将等待相机完成它的变焦运动。
 *
 *
 * ==============================================================================
 *  Examples
 * ==============================================================================
 *
 * Here are some examples of the Plugin Commands:
 *
 *
 * ==============================================================================
 *
 *   FocusCamera 5 7 60
 *
 *   FocusCamera event 2 60
 *
 *   FocusCamera follower 1 60
 *
 *   FocusCamera player 60
 *
 *   ResetFocus 60
 *
 *
 * ==============================================================================
 *
 *   ZoomIn 1.2 60
 *
 *   ZoomOut 1.2 60
 *
 *   ResetZoom 60
 *
 *
 * ==============================================================================
 *  End of Help File
 * ==============================================================================
 * 
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 *
 */

var SRD = SRD || {};
SRD.CameraCore = SRD.CameraCore || {};

var Imported = Imported || {};
Imported["SumRndmDde Camera Core"] = 1.05;
(function (_) {

	"use strict";

	//-----------------------------------------------------------------------------
	// SRD.CameraCore
	//-----------------------------------------------------------------------------
	var old_Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
	Game_Interpreter.prototype.initialize = function (depth) {
		old_Game_Interpreter_initialize.call(this, depth)
		$gameTemp._old_Game_Interpreter = this;
	};
	/////////////////////////////PluginManager//////////////////////////
	PluginManager.registerCommand('SRD_CameraCore', 'zoomin', args => {
		$gameScreen.setCameraFocus(args.scale, args.duration);
	});
	PluginManager.registerCommand('SRD_CameraCore', 'zoomout', args => {
		$gameScreen.setCameraFocus(1 / args.scale, args.duration);
	});
	PluginManager.registerCommand('SRD_CameraCore', 'focuscameraevent', args => {
		const eventId = args.event;
		if (eventId) {
			if ($gameMap.event(eventId)) {
				$gameScreen.focusEvent = eventId;
				$gameMap.event(eventId).centerCamera(args.duration);
			}
		}
	});
	PluginManager.registerCommand('SRD_CameraCore', 'focuscamerafollower', args => {
		const followerId = args.follower;
		if (followerId) {
			if ($gamePlayer.followers().follower(followerId - 1)) {
				$gameScreen.focusEvent = (followerId * (-1));
				$gamePlayer.followers().follower(followerId - 1).centerCamera(args.duration);
			}
		}
	});
	PluginManager.registerCommand('SRD_CameraCore', 'focuscameraplayer', args => {
		$gameScreen.focusEvent = 0;
		$gamePlayer.centerCamera(args.duration);
	});
	PluginManager.registerCommand('SRD_CameraCore', 'resetfocus', args => {
		$gameScreen.focusEvent = 0;
		$gamePlayer.centerCamera(args.duration);
	});
	PluginManager.registerCommand('SRD_CameraCore', 'resetzoom', args => {
		$gameScreen.resetCameraFocus(args.duration);
	});
	PluginManager.registerCommand('SRD_CameraCore', 'waitforcamera', function (args) {
		$gameTemp._old_Game_Interpreter.setWaitMode('camera')
	});
	PluginManager.registerCommand('SRD_CameraCore', 'waitforcamerafocus', args => {
		$gameTemp._old_Game_Interpreter.setWaitMode('camera-focus')
	});
	PluginManager.registerCommand('SRD_CameraCore', 'waitforCamerazoom', args => {
		$gameTemp._old_Game_Interpreter.setWaitMode('camera-zoom')
	});
	PluginManager.registerCommand('SRD_CameraCore', 'shiftcamera', args => {
		$gameMap.shiftCameraPosition(args.x, args.y, args.duration);
	});
	const params = PluginManager.parameters('SRD_CameraCore');

	_.zoom = parseFloat(params['Default Zoom']);
	_.pics = String(params['Zoom Pictures?']).trim().toLowerCase() === 'true';
	_.margin = String(params['Margin Formula']);
	_.fixYan1 = String(params['Fix Black Lines']).trim().toLowerCase() === 'true';

	//-----------------------------------------------------------------------------
	// Game_Screen
	//-----------------------------------------------------------------------------

	const _Game_Screen_clear = Game_Screen.prototype.clear;
	Game_Screen.prototype.clear = function () {
		_Game_Screen_clear.apply(this, arguments);
		this._playerRegionId = 0;
		this._playerZoomInfo = null;
		this._completeZoomIn = 0;
		this._zoomXTarget = this._zoomX;
		this._zoomYTarget = this._zoomY;
		this._zoomXSpeed = 0;
		this._zoomYSpeed = 0;
		this.focusEvent = 0;
	};

	const _Game_Screen_updateZoom = Game_Screen.prototype.updateZoom;
	Game_Screen.prototype.updateZoom = function () {
		_Game_Screen_updateZoom.apply(this, arguments);
		this.updateTilemapMargin();
	};

	//NO ONE ELSE BETTER OVERWRITE THIS!!!! >:D
	Game_Screen.prototype.clearZoom = function () {
		//Overwrite
		this._zoomX = Graphics.boxWidth / 2;
		this._zoomY = Graphics.boxHeight / 2;
		this._zoomScale = _.zoom;
		this._zoomScaleTarget = _.zoom;
		this._zoomDuration = 0;
		//Overwrite

		this.refreshZoomInfo();
		this.refreshTilemapMargin(this._zoomScale);
		if (SceneManager.isNextScene(Scene_Battle)) {
			this.ultraClearZoom();
		}
	};

	Game_Screen.prototype.refreshZoomInfo = function () {
		if (this._playerZoomInfo) {
			this._zoomX = this._playerZoomInfo.x;
			this._zoomY = this._playerZoomInfo.y;
			this._zoomScale = this._playerZoomInfo.scale;
			this._zoomScaleTarget = this._playerZoomInfo.scale;
			this._zoomDuration = this._playerZoomInfo.duration;
		}
	};

	Game_Screen.prototype.ultraClearZoom = function () {
		this._zoomX = 0;
		this._zoomY = 0;
		this._zoomScale = 1;
		this._zoomScaleTarget = 1;
		this._zoomDuration = 0;
	};

	const _Game_Screen_onBattleStart = Game_Screen.prototype.onBattleStart;
	Game_Screen.prototype.onBattleStart = function () {
		_Game_Screen_onBattleStart.apply(this, arguments);
		this.ultraClearZoom();
	};

	Game_Screen.prototype.setCameraFocus = function (scale, duration, nullify) {
		this.setupZoomInfo(scale, duration);
		this.setupZoomStuff();
		if (duration === 0) {
			this._zoomScale = this._zoomScaleTarget;
			this._zoomDuration = 0;
		}
		if (nullify) this._playerZoomInfo = null;
		this.setupTilemapMargin();
	};

	Game_Screen.prototype.setupZoomInfo = function (scale, duration) {
		this._playerZoomInfo = {};
		this._playerZoomInfo.x = Graphics.boxWidth / 2;
		this._playerZoomInfo.y = Graphics.boxHeight / 2;
		this._playerZoomInfo.scale = eval(scale) * _.zoom;
		this._playerZoomInfo.duration = eval(duration);
	};

	Game_Screen.prototype.setupZoomStuff = function () {
		this._zoomX = this._playerZoomInfo.x;
		this._zoomY = this._playerZoomInfo.y;
		this._zoomScaleTarget = this._playerZoomInfo.scale;
		this._zoomDuration = this._playerZoomInfo.duration;
	};

	Game_Screen.prototype.resetCameraFocus = function (duration) {
		this.setCameraFocus(_.zoom, duration, true);
	};

	Game_Screen.prototype.setupTilemapMargin = function () {
		if (this._zoomScaleTarget < this._zoomScale) {
			this.refreshTilemapMargin(this._zoomScaleTarget);
			this._completeZoomIn = 2;
		} else {
			this._completeZoomIn = 1;
		}
	};

	Game_Screen.prototype.updateTilemapMargin = function () {
		if (this._zoomDuration === 0 && this._completeZoomIn) {
			this.refreshTilemapMargin(this._zoomScale);
			this._completeZoomIn = 0;
		} else if (this._zoomDuration === 0 && this._completeZoomIn) {
			this.refreshTilemapMargin(this._zoomScaleTarget);
			this._completeZoomIn = 0;
		}
	};

	Game_Screen.prototype.refreshTilemapMargin = function (scale) {
		if (SceneManager._scene.constructor === Scene_Map) {
			const margin = (this._zoomScaleTarget < 1) ? eval(_.margin) : 1;
			const tilemap = SceneManager._scene._spriteset._tilemap;
			tilemap._margin = margin;
			tilemap.width = Graphics.width + (margin * 2);
			tilemap.height = Graphics.height + (margin * 2);
		}
	};

	Game_Screen.prototype.isCameraZooming = function () {
		return Boolean(this._zoomDuration > 0);
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//-----------------------------------------------------------------------------

	Game_CharacterBase.prototype.centerX = function () {
		return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
	};

	Game_CharacterBase.prototype.centerY = function () {
		return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
	};

	Game_CharacterBase.prototype.centerCamera = function (dur) {
		return $gameMap.setDisplayPosStart(this.x - this.centerX(), this.y - this.centerY(), dur);
	};

	Game_CharacterBase.prototype.centerCameraOnPos = function (x, y, dur) {
		return $gameMap.setDisplayPosStart(x - this.centerX(), y - this.centerY(), dur);
	};

	//-----------------------------------------------------------------------------
	// Game_Character
	//-----------------------------------------------------------------------------

	Game_Character.prototype.updateScroll = Game_Player.prototype.updateScroll;

	//-----------------------------------------------------------------------------
	// Game_Player
	//-----------------------------------------------------------------------------

	Game_Player.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
		if ($gameScreen.focusEvent === 0) {
			Game_Character.prototype.updateScroll.apply(this, arguments);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Event
	//-----------------------------------------------------------------------------

	const _Game_Event_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function () {
		var lastScrolledX = this.scrolledX();
		var lastScrolledY = this.scrolledY();
		_Game_Event_update.apply(this, arguments);
		this.updateScroll(lastScrolledX, lastScrolledY);
	};

	Game_Event.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
		if ($gameScreen.focusEvent === this._eventId) {
			Game_Character.prototype.updateScroll.apply(this, arguments);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Event
	//-----------------------------------------------------------------------------

	const _Game_Follower_update = Game_Follower.prototype.update;
	Game_Follower.prototype.update = function () {
		var lastScrolledX = this.scrolledX();
		var lastScrolledY = this.scrolledY();
		_Game_Follower_update.apply(this, arguments);
		this.updateScroll(lastScrolledX, lastScrolledY);
	};

	Game_Follower.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
		if ($gameScreen.focusEvent === this._memberIndex * (-1)) {
			Game_Character.prototype.updateScroll.apply(this, arguments);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Map
	//-----------------------------------------------------------------------------

	const _Game_Map_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function () {
		_Game_Map_initialize.apply(this, arguments);
		this._newDisplayX = 0;
		this._newDisplayY = 0;
		this._newParallaxX = 0;
		this._newParallaxY = 0;
		this._scrollDuration = 0;
		this._displayXSpeed = 0;
		this._displayYSpeed = 0;
		this._parallaxXSpeed = 0;
		this._parallaxYSpeed = 0;
	};

	const _Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		this._newDisplayX = 0;
		this._newDisplayY = 0;
		this._scrollDuration = 0;
		$gameScreen.focusEvent = 0;
		$gameScreen.resetCameraFocus(0);
		_Game_Map_setup.apply(this, arguments);
	};

	Game_Map.prototype.setDisplayPosStart = function (x, y, dur) {
		if (dur === 0) {
			this.setDisplayPos.call(this, x, y);
		} else {
			this.setDisplayPosInfo(x, y);
			this.setDisplayPosSpeeds(dur);
		}
	};

	Game_Map.prototype.shiftCameraPosition = function (x, y, dur) {
		this.setDisplayPosStart(this._displayX + eval(x), this._displayY + eval(y), dur);
	};

	Game_Map.prototype.setDisplayPosInfo = function (x, y) {
		if (this.isLoopHorizontal()) {
			this._newDisplayX = x.mod(this.width());
			this._newParallaxX = x;
		} else {
			var endX = this.width() - this.screenTileX();
			this._newDisplayX = endX < 0 ? endX / 2 : x.clamp(0, endX);
			this._newParallaxX = this._newDisplayX;
		}
		if (this.isLoopVertical()) {
			this._newDisplayY = y.mod(this.height());
			this._newParallaxY = y;
		} else {
			var endY = this.height() - this.screenTileY();
			this._newDisplayY = endY < 0 ? endY / 2 : y.clamp(0, endY);
			this._newParallaxY = this._newDisplayY;
		}

	};

	Game_Map.prototype.setDisplayPosSpeeds = function (dur) {
		this._scrollDuration = dur;
		this._displayXSpeed = (this._newDisplayX - this._displayX) / this._scrollDuration;
		this._displayYSpeed = (this._newDisplayY - this._displayY) / this._scrollDuration;
		this._parallaxXSpeed = (this._newParallaxX - this._parallaxX) / this._scrollDuration;
		this._parallaxYSpeed = (this._newParallaxY - this._parallaxY) / this._scrollDuration;
	};

	const _Game_Map_updateScroll = Game_Map.prototype.updateScroll;
	Game_Map.prototype.updateScroll = function () {
		_Game_Map_updateScroll.call(this);
		this.updateCameraScroll();
	};

	Game_Map.prototype.updateCameraScroll = function () {
		if (this._scrollDuration > 0) {
			this._scrollDuration--;
			this._displayX += this._displayXSpeed;
			this._displayY += this._displayYSpeed;
			this._parallaxX += this._parallaxXSpeed;
			this._parallaxY += this._parallaxYSpeed;
		}
	};

	Game_Map.prototype.isCameraScrolling = function () {
		return Boolean(this._scrollDuration > 0);
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//-----------------------------------------------------------------------------

	// const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	// Game_Interpreter.prototype.pluginCommand = function (command, args) {
	// 	_Game_Interpreter_pluginCommand.apply(this, arguments);
	// 	const com = command.trim().toLowerCase();
	// 	const checkDur = function (i) {
	// 		return (args[i]) ? eval(args[i]) : 0;
	// 	};
	// 	if (com === 'zoomin') {
	// 		$gameScreen.setCameraFocus(String(args[0]), checkDur(1));
	// 	} else if (com === 'zoomout') {
	// 		$gameScreen.setCameraFocus("1/(" + String(args[0]) + ")", checkDur(1));
	// 	} else if (com === 'focuscamera') {
	// 		const com2 = String(args[0]).trim().toLowerCase();
	// 		if (com2 === 'event') {
	// 			const eventId = eval(args[1]);
	// 			if ($gameMap.event(eventId)) {
	// 				$gameScreen.focusEvent = eventId;
	// 				$gameMap.event(eventId).centerCamera(checkDur(2));
	// 			}
	// 		} else if (com2 === 'follower') {
	// 			const followerId = eval(args[1]);
	// 			if ($gamePlayer.followers().follower(followerId - 1)) {
	// 				$gameScreen.focusEvent = (followerId * (-1));
	// 				$gamePlayer.followers().follower(followerId - 1).centerCamera(checkDur(2));
	// 			}
	// 		} else if (com2 === 'player') {
	// 			$gameScreen.focusEvent = 0;
	// 			$gamePlayer.centerCamera(checkDur(1));
	// 		} else {
	// 			$gameScreen.focusEvent = null;
	// 			$gamePlayer.centerCameraOnPos(eval(args[0]), eval(args[1]), checkDur(2));
	// 		}
	// 	} else if (com === 'resetfocus') {
	// 		$gameScreen.focusEvent = 0;
	// 		$gamePlayer.centerCamera(checkDur(0));
	// 	} else if (com === 'resetzoom') {
	// 		$gameScreen.resetCameraFocus(checkDur(0));
	// 	} else if (com === 'setdefaultzoom') {
	// 		_.zoom = eval(args[0]);
	// 	} else if (com === 'shiftcamera') {
	// 		$gameMap.shiftCameraPosition(eval(args[0]), eval(args[1]), checkDur(2));
	// 	} else if (com === 'waitforcamera') {
	// 		this.setWaitMode('camera')
	// 	} else if (com === 'waitforcamerafocus') {
	// 		this.setWaitMode('camera-focus')
	// 	} else if (com === 'waitforcamerazoom') {
	// 		this.setWaitMode('camera-zoom')
	// 	}
	// };
	Game_Interpreter.prototype.updateWaitMode = function () {
		let character = null;
		let waiting = false;
		switch (this._waitMode) {
			case "message":
				waiting = $gameMessage.isBusy();
				break;
			case "transfer":
				waiting = $gamePlayer.isTransferring();
				break;
			case "scroll":
				waiting = $gameMap.isScrolling();
				break;
			case "route":
				character = this.character(this._characterId);
				waiting = character && character.isMoveRouteForcing();
				break;
			case "animation":
				character = this.character(this._characterId);
				waiting = character && character.isAnimationPlaying();
				break;
			case "balloon":
				character = this.character(this._characterId);
				waiting = character && character.isBalloonPlaying();
				break;
			case "gather":
				waiting = $gamePlayer.areFollowersGathering();
				break;
			case "action":
				waiting = BattleManager.isActionForced();
				break;
			case "video":
				waiting = Video.isPlaying();
				break;
			case "image":
				waiting = !ImageManager.isReady();
				break;
			case "camera":
				waiting = !ImageManager.isReady();
				waiting = ($gameMap.isCameraScrolling() || $gameScreen.isCameraZooming());
				if (waiting) {
					return true;
				}
				break;
			case "camera-focus":
				waiting = $gameMap.isCameraScrolling();
				if (waiting) {
					return true;
				}
				break;
			case "camera-zoom":
				waiting = $gameScreen.isCameraZooming();
				if (waiting) {
					return true;
				}
				break;
		}
		if (!waiting) {
			this._waitMode = "";
		}
		return waiting;
	};
	// const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	// Game_Interpreter.prototype.updateWaitMode = function () {
	// 	_Game_Interpreter_updateWaitMode.call(this);
	// 	let waiting = null;
	// 	if (this._waitMode === 'camera') {
	// 		waiting = ($gameMap.isCameraScrolling() || $gameScreen.isCameraZooming());
	// 	} else if (this._waitMode === 'camera-focus') {
	// 		waiting = $gameMap.isCameraScrolling();
	// 	} else if (this._waitMode === 'camera-zoom') {
	// 		waiting = $gameScreen.isCameraZooming();
	// 	}
	// 	if (waiting) {
	// 		return true;
	// 	} else if (waiting === false) {
	// 		this._waitMode = '';
	// 		return false;
	// 	}

	// 	//return _Game_Interpreter_updateWaitMode.apply(this, arguments);
	// };

	//-----------------------------------------------------------------------------
	// Scene_Map
	//-----------------------------------------------------------------------------

	const _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function () {
		_Scene_Map_start.apply(this, arguments);
		$gameScreen.clearZoom();
	};

	//-----------------------------------------------------------------------------
	// SRD.CameraCore.pics Compatibility
	//-----------------------------------------------------------------------------

	// if (_.pics) {

	// 	Scene_Base.prototype.createPicturesForCameraCore = Spriteset_Base.prototype.createPictures;

	// 	const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
	// 	Scene_Map.prototype.createSpriteset = function () {
	// 		_Scene_Map_createSpriteset.call(this);
	// 		this.createPicturesForCameraCore();
	// 	};

	// 	const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
	// 	Scene_Battle.prototype.createSpriteset = function () {
	// 		_Scene_Battle_createSpriteset.apply(this, arguments);
	// 		this.createPicturesForCameraCore();
	// 	};

	// Spriteset_Base.prototype.createPictures = function () { };

	// }

	//-----------------------------------------------------------------------------
	// Yanfly Engine Core Compatibility
	//-----------------------------------------------------------------------------

	// if (Imported.YEP_CoreEngine && _.fixYan1) {

	// 	Sprite.prototype.updateTransform = function () {
	// 		PIXI.Sprite.prototype.updateTransform.call(this);
	// 		this.worldTransform.tx += this._offset.x;
	// 		this.worldTransform.ty += this._offset.y;
	// 	};

	// }

})(SRD.CameraCore);