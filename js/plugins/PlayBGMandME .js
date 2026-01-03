(function() {
    var _AudioManager_playBgm = AudioManager.playBgm;
    var _AudioManager_playMe = AudioManager.playMe;

    AudioManager.playBgm = function(bgm, pos) {
        if (bgm) {
            if (this._meBuffer) {
                this._meBuffer.stop();
                this._meBuffer = null;
            }
        }
        _AudioManager_playBgm.call(this, bgm, pos);
    };

    AudioManager.playMe = function(me) {
        if (me && me.name) {
            if (this._meBuffer) {
                this._meBuffer.stop();
                this._meBuffer = null;
            }
            this._meBuffer = this.createBuffer('me', me.name);
            this._meBuffer.volume = me.volume / 100;
            this._meBuffer.pitch = me.pitch / 100;
            this._meBuffer.pan = me.pan / 100;
            this._meBuffer.play(false);
        }
    };

    AudioManager.createBuffer = function(folder, name) {
        var ext = this.audioFileExt();
        var url = this._path + folder + '/' + encodeURIComponent(name) + ext;
        var buffer = new WebAudio(url);
        buffer.addLoadListener(function() {
            if (!isFinite(buffer.volume)) {
                buffer.volume = 1; // 默认音量
            }
            if (!isFinite(buffer.pitch)) {
                buffer.pitch = 1; // 默认音调
            }
            if (!isFinite(buffer.pan)) {
                buffer.pan = 0; // 默认立体声平移
            }
        });
        return buffer;
    };
})();
