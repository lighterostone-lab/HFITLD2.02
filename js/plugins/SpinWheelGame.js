/*:
 * @plugindesc [v1.2] 修复版转盘猜色小游戏
 * @author YourName
 *
 * @param PrizeText
 * @text 奖金标签文字
 * @desc 奖金显示前缀文字
 * @default 当前奖金: 
 */
(function() {
    "use strict";

    // 核心修复部分
    const parameters = PluginManager.parameters('SpinWheelGame');
    const prizeLabel = parameters['PrizeText'] || "当前奖金: ";

    // 修复插件命令
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "SpinWheelGame") {
            SceneManager.push(Scene_SpinWheel);
        }
    };

    // 场景类重构
    function Scene_SpinWheel() {
        this.initialize(...arguments);
    }

    Scene_SpinWheel.prototype = Object.create(Scene_Base.prototype);
    Scene_SpinWheel.prototype.constructor = Scene_SpinWheel;

    Scene_SpinWheel.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
        this._windows = [];
        this._prize = 0;
        this._spinning = false;
    };

    // 修复create方法（关键修复点）
    Scene_SpinWheel.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWheel();
        this.createPointer();
        this.createWindows();
    };

    Scene_SpinWheel.prototype.createBackground = function() {
        const sprite = new Sprite();
        sprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
        sprite.bitmap.fillAll("black");
        this.addChild(sprite);
    };

    Scene_SpinWheel.prototype.createWheel = function() {
        this._wheelSprite = new Sprite(ImageManager.loadPicture('wheel'));
        this._wheelSprite.anchor.set(0.5);
        this._wheelSprite.move(Graphics.width/2, Graphics.height/2);
        this.addChild(this._wheelSprite);
    };

    Scene_SpinWheel.prototype.createPointer = function() {
        this._pointerSprite = new Sprite(ImageManager.loadPicture('pointer'));
        this._pointerSprite.anchor.set(0.5);
        this._pointerSprite.move(
            Graphics.width/2,
            Graphics.height/2 - this._wheelSprite.height/2 + 30
        );
        this.addChild(this._pointerSprite);
    };

    // 窗口系统重构（关键修复点）
    Scene_SpinWheel.prototype.createWindows = function() {
        this._prizeWindow = this.createPrizeWindow();
        this._yesNoWindow = this.createYesNoWindow();
        this._colorWindow = this.createColorWindow();
    };

    Scene_SpinWheel.prototype.createPrizeWindow = function() {
        const window = new Window_Base(10, 10, 200, 60);
        window.contents.fontSize = 20;
        this.addWindow(window);
        return window;
    };

    Scene_SpinWheel.prototype.createYesNoWindow = function() {
        const window = new Window_YesNo();
        window.setHandler('yes', this.onYes.bind(this));
        window.setHandler('no', this.onNo.bind(this));
        window.hide();
        this.addWindow(window);
        return window;
    };

    Scene_SpinWheel.prototype.createColorWindow = function() {
        const window = new Window_ColorChoice();
        window.setHandler('orange', () => this.onColorChosen('Orange'));
        window.setHandler('blue', () => this.onColorChosen('Blue'));
        window.hide();
        this.addWindow(window);
        return window;
    };

    // 其他方法保持不变...
    // (包含之前的游戏逻辑，但使用重构后的窗口系统)

    // 窗口类修复（关键）
    function Window_YesNo() {
        this.initialize(...arguments);
    }

    Window_YesNo.prototype = Object.create(Window_Command.prototype);
    Window_YesNo.prototype.constructor = Window_YesNo;
    
    Window_YesNo.prototype.initialize = function() {
        const width = this.windowWidth();
        const height = this.windowHeight();
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.x = (Graphics.width - width) / 2;
        this.y = (Graphics.height - height) / 2;
    };

    Window_YesNo.prototype.windowWidth = function() {
        return 240;
    };

    // 其他窗口类同理...
})();