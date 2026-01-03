//=============================================================================
// MessageHide.js                                                             
//=============================================================================
 
/*:
@plugindesc 切换隐藏消息窗口
@author Jatopian

@param key
@text 按键
@desc 按下时切换消息窗口可见性的键/按钮。用空格分隔值。有关列表，请参阅帮助
@default pageup h

@param right click
@text 右键单击可见性
@desc 右键单击是否可以切换消息窗口可见性  true / false
@default true

@param show on new page
@text 自动显示新对话页面
@desc 消息窗口是否自动显示在新的对话页面上 true / false
@default true

@help
再次按键重置消息窗口可见性，
或重置游戏。
游戏事件也可以通过插件命令来实现：ShowMessageWindow
如果参数为“在新页面上显示”，则会重置每个新消息窗口页面的可见性。

“key”参数采用由空格分隔的多个值。
例如：“pageup h”将定义 H 和 PageUp 键 (and keys synonymous with PageUp like gamepad side buttons).
与游戏手柄兼容的值:
ok       //      A
cancel   //      B
shift    //      X
menu     //      Y
pageup   //      LB
pagedown //      RB
up
down
left
right
仅键盘值: 
a-z
0-9
tab
enter
shift
ctrl
alt
space
semicolon
comma
period
quote

安装:
放在yep消息核心之后，否则隐藏名称框将不起作用。

Terms of Use:
- Free for commercial and non-commercial use.
- Please give credit in a trivially accessible place.
- OK to modify, but if you redistribute the modified version, 
  please make clear that you modified it, and how.
- If you add features that could be useful to others, 
  please at least consider sharing them with me and the community.

更新日志：
1.3.1:
右键单击修复。
有关 Yanfly 消息核心名称框的兼容性说明。
1.3.0:
通过右键单击隐藏窗口的参数。（感谢Magnus0808 ||马格努斯·鲁宾·彼得森。
1.2.0:
能够定义多个键。
如果未设置参数，则默认为“在新页面上显示”行为，而不是未定义的行为。
游戏手柄支持修复。
燕蝶消息核心名称框兼容性。（谢谢mdqp！
1.1.0:
显示/隐藏现在在地图之间和调出菜单时仍然存在。
“在新页面上显示”功能。
*/

(function() {
  var params = PluginManager.parameters("MessageHide");
  var pKey = String(params["key"]).toLowerCase().split(" ");
  var pRightClick = (function() {  
    var p = String(params["right click"]).toLowerCase();
    if (p.match(/false/i)) {
      return false;
    }
    return true;
  })();
  var pNewPage = (function() {  
    var p = String(params["show on new page"]).toLowerCase();
    if (p.match(/false/i)) {
      return false;
    }
    return true;
  })();
  
  var key_ids = {
    "tab":9,"enter":13,"shift":16,"ctrl":17,"alt":18,"space":32,
    "pageup":33,"pagedown":34,
    "0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,
    "a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,
    "n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90,
    "semicolon":186,"comma":188,"period":190,"quote":222,
  };
  
  for (var p of pKey) {
    console.log("MessageHide button defined: " + p);
    if (key_ids[p]) { // if key is listed in key_ids
      if (!Input.keyMapper[key_ids[p]]) { // if key isn't already registered with keyMapper
        Input.keyMapper[key_ids[p]] = p; // add it to keyMapper, with label from key_ids
      }
    } else {
      if (!Input.keyMapper[p]) { // if key is not already registered with keyMapper and also not in key_ids
        console.log("Unrecognized MessageHide button defined - deleting: " + p);
        delete pKey[p]; // delete value from pKey so it isn't fruitlessly checked later
      }
    }
  }
  //global variables!
  MessageHide_messageWindowShowNext = false;
  MessageHide_messageWindowVisible = true; //global to persist between maps
  
  //=============================================================================
  // Window Message
  //=============================================================================
  
  Window_Message.prototype.isToggleHide = function() {
    for (var p of pKey) {
      if (Input.isTriggered(p)) return true;
    }
    return false;
  }
  
  var alias_wm_ud = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    alias_wm_ud.call(this);
    if (MessageHide_messageWindowShowNext === true) {
      MessageHide_messageWindowVisible = true;
      MessageHide_messageWindowShowNext = false;
    } else if (this.isToggleHide()) {
      MessageHide_messageWindowVisible = !MessageHide_messageWindowVisible;
    }
    this.visible = MessageHide_messageWindowVisible;
  }
  
  if (pRightClick) { // conditional alias
    var mrp_hiderightclick_wm_update_old = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
      mrp_hiderightclick_wm_update_old.call(this);
      this.processRightClick();
    }
    
    Window_Message.prototype.processRightClick = function() {
      if (this.isOpen() && this.active && TouchInput.isCancelled()) {
        MessageHide_messageWindowVisible = !MessageHide_messageWindowVisible;
      }
    }
  }
  
  if (pNewPage) { // conditional alias
    var alias_wm_np = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
      alias_wm_np.call(this, textState);
      MessageHide_messageWindowVisible = true;
    }
  }
  
  //=============================================================================
  // Game Interpreter
  //=============================================================================
  
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === "ShowMessageWindow") {
        MessageHide_messageWindowShowNext = true;
      }
  }
  
  //=============================================================================
  // Window NameBox (Yanfly Message Core compatibility)
  //=============================================================================
  
  if (Imported.YEP_MessageCore) { // conditional alias
    var alias_wm_nb = Window_NameBox.prototype.update;
    Window_NameBox.prototype.update = function() {
      alias_wm_nb.call(this);
      if ($gameMessage.isToggleHide) {
        this.visible = MessageHide_messageWindowVisible;
      }
    }
    
    if (pRightClick) { // conditional alias
      var mrp_hiderightclick_wnb_update = Window_NameBox.prototype.update;
      Window_NameBox.prototype.update = function() {
        mrp_hiderightclick_wnb_update.call(this);	
        if (this._parentWindow.isOpen() && this.isOpen()) {
          this.visible = this._parentWindow.visible;			
        } 
      }
    }
  }
  
})();