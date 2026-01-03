/*:
 * @plugindesc Enables right-click to toggle the menu in RPG Maker MV, allowing return to the previous menu layer.
 * @author YourName
 * @help
 * Right-click to open the menu from the map, and return to the previous menu layer when in a submenu.
 */

(function() {
    let lastRightClickTime = 0; // 记录上次右键的时间

    document.addEventListener('mousedown', function(event) {
        if (event.button === 2) { // 右键点击
            let now = performance.now();
            if (now - lastRightClickTime < 200) return; // 200ms 内防止重复点击
            lastRightClickTime = now; // 记录当前时间

            if ($gameMessage.isBusy()) return; // 如果正在对话，不执行操作

            if (SceneManager._scene instanceof Scene_Map) {
                // 在地图场景下，右键打开菜单
                SoundManager.playCursor();
                SceneManager.push(Scene_Menu);
            } else if (SceneManager._stack.length > 0) {
                // 只返回一级，不要连续返回
                SoundManager.playCancel();
                SceneManager._scene.popScene(); // 只执行当前场景的 pop
            }
        }
    });

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // 禁用默认右键菜单
    });
})();
