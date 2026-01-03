
//TP上限
Game_BattlerBase.prototype.maxTp = function() {
  return 100;
};
//TP自然回复
Game_Battler.prototype.regenerateTp = function() {
  var value = Math.floor(0 * this.trg);
  this.gainSilentTp(value);
};
//受伤时获得TP
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
  var value = Math.floor(0 * damageRate * this.tcr);
  this.gainSilentTp(value);
};  

