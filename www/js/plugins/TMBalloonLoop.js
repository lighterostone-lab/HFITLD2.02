//=============================================================================
// TMVplugin - フキダシループ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.11
// 最終更新日: 2016/06/20
//=============================================================================

/*:
 * @plugindesc TM循环播放心情气泡
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * 如何使用。
 * 使用插件命令或备忘录字段标签，为一个事件设置ffidas循环。
 * 指定的图标将被重复显示。
 * 下面的例子显示了如何在一个事件中设置一个循环。
 
 * 除了事件的备忘录字段外，你也可以在执行内容顶部的注释命令中使用同样的内容。
 * 除了事件的备忘录字段外，同样的fukidashi循环也可以用执行内容顶部的注释命令中的标签来设置。 在备忘录字段和注释中，标签
 如果有的话，*优先于注释。
 
 * Fuki Dash Loop by plug-in命令可用于在事件页面之间切换，或用于
 * * 插件命令的Fuki Dashi循环可以通过切换事件页面或通过事件命令 "暂时清除事件 "来取消，例如。
  
 * 插件命令。
 * setBalloonLoop 2 1
 *为2号事件设置一个惊喜图标作为浮动的循环。 活动。
 * 事件编号为-1的玩家，0的执行命令的事件。
 *要显示的图标编号是事件的编号。
 *要显示的图标的编号与事件命令 "显示福喜达世图标 "的编号相对应。
 * 要显示的图标的编号与事件命令 "显示污损图标 "中的图标编号一致。
 
 * 备忘录字段标签（事件）。
 *<balloonLoop:1>
 * 带有这个标签的事件会自动设置，而不需要执行setBalloonLoop。
 * 气球循环被自动设置，无需执行setBalloonLoop。 该数字是要显示的图标编号。
 *
 */

var Imported = Imported || {};
Imported.TMBalloonLoop = true;

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {
  
    //-----------------------------------------------------------------------------
    // Game_Event
    //
  
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) {
        this.loadCommentParams();
      }
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              if (match[2] === ':') {
                this._commentParams[match[1]] = match[3];
              } else {
                this._commentParams[match[1]] = true;
              }
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      if (this._commentParams[paramName]) {
        return this._commentParams[paramName];
      } else if (this.event().meta[paramName]) {
        return this.event().meta[paramName];
      } else {
        return null;
      }
    };

  })();
}

(function() {

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  
  var _Game_CharacterBase_endBalloon = Game_CharacterBase.prototype.endBalloon;
  Game_CharacterBase.prototype.endBalloon = function() {
    _Game_CharacterBase_endBalloon.call(this);
    var balloonLoop = this.balloonLoop();
    if (balloonLoop) {
      this.requestBalloon(balloonLoop);
    }
  };

  Game_CharacterBase.prototype.setBalloonLoop = function(balloonLoop) {
    this._balloonLoop = balloonLoop;
  };

  Game_CharacterBase.prototype.balloonLoop = function() {
    return this._balloonLoop;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var balloonLoop = +this.loadTagParam('balloonLoop');
      if (balloonLoop) {
        this.setBalloonLoop(balloonLoop);
      }
    } else {
      this.setBalloonLoop(0);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setBalloonLoop') {
      var character = this.character(+args[0]);
      if (character) {
        character.setBalloonLoop(+args[1]);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_endBalloon = Sprite_Character.prototype.endBalloon;
  Sprite_Character.prototype.endBalloon = function() {
    var balloonLoop = this._character.balloonLoop();
    if (balloonLoop) {
      this._balloonSprite.setup(balloonLoop);
    } else {
      _Sprite_Character_endBalloon.call(this);
    }
  };

})();
