//=============================================================================
// Limpid_PeculiarTP.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021 清澈淌漾
// ----------------------------------------------------------------------------
/*:
 * @plugindesc 专用tp插件
 * @author 清澈淌漾
 *@help 包括功能
 * 1.[MaxTP] 自定义tp上限
 * 2.[InitTp]  控制战前,战后tp重置
 * 3.[Base_Tpget] 改变受伤时tp获取量
 *   具体表现为愤怒值，单次受伤超过一定量获得定量的tp。
 *   trg大于200%时 角色将被激怒，每次受伤都将回满tp
 *
 * @param MaxTP
 * @desc tp上限
 * @default 10
 *
 * @param InitTp
 * @desc 战斗是否初始化TP
 * @default  0
 *
 * @param Base_Tpget
 * @desc  定义受伤获取tp基数生命
 * @default 3.125
 *
 */

(function Limpid_PeculiarTP() {

    var parameters = PluginManager.parameters('Limpid_PeculiarTP');
    var Limpid_Maxtp = parseInt(String(parameters["MaxTP"]));
    var Limpid_InitTp = parseInt(String(parameters["InitTp"]));
    var Base_Tpget = parseFloat(String(parameters["Base_Tpget"]));

    /**tp上限改变*/
    Game_BattlerBase.prototype.maxTp = function() {return Limpid_Maxtp;};

    /**控制tp初始化*/
    Game_Battler.prototype.initTp = function() {if(Limpid_InitTp>0)  this.setTp(Math.randomInt(25));};
    /**控制tp清除*/
    Game_Battler.prototype.clearTp = function() {if(Limpid_InitTp>0)  this.setTp(0);};


    /**受到伤害 固定得到tp*/
    Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
        var btp=Base_Tpget*0.01*((2-this.trg)/2)
        if(btp<=0) this.gainSilentTp(Limpid_Maxtp);
        else
        {
            var tp_slice=Limpid_Maxtp/10
            var gtp=damageRate / btp;
            if(gtp<1) gtp=0
            else if(gtp<2&&gtp>1) gtp= tp_slice;
            else gtp = Math.log2(damageRate / btp* tp_slice)+ tp_slice
            if (gtp > 0) this.gainSilentTp(Math.floor(gtp));
        }
    };



})();