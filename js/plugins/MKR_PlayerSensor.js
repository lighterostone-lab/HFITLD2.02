//=============================================================================
// MKR_PlayerSensor.js
//=============================================================================
// Copyright (c) 2022 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
//
// 3.1.1 2022/02/19 ・プレイヤーロスト状態遅延が0のとき、
//                    プレイヤーロスト状態移行無効機能が
//                    正しく動作していなかった問題を修正
//
// 3.1.0 2022/01/29 ・プレイヤー未発見状態の探索者を
//                    強制的に発見状態に移行させる機能を追加
//                  ・プレイヤーロスト状態へと移行させない機能を追加
//
// 3.0.3 2022/01/29 ・EventReSpawn.jsによるイベント動的生成時に
//                    探索者の視界が描画されない問題に対応
//
// 3.0.2 2021/07/10 ・プラグインコマンド"PSS t_move"実行時にエラーとなっていた
//                    問題を修正。
//
// 3.0.1 2021/06/05 ・視界描画中のイベントを一時消去したとき
//                    戦闘アニメーションの再生が途中停止してしまう問題を修正
//
// 3.0.0 2021/02/13 ・lost系コマンドの挙動を変更し、
//                    実行時にプレイヤーを即ロストするようにした。
//
// 2.5.1 2020/02/27 ・パラメータ[視界範囲描画]がOFFのとき、
//                    視界描画用spriteの更新を行わないように修正
//
// 2.5.0 2020/01/20 ・プレイヤー追跡時、追跡者がフォロワーを
//                    すり抜けるようになるプラグインパラメータを追加
//
// 2.4.1 2020/01/20 ・プラグインパラメータ[視界範囲の色]のタイプを変更
//                  ・プラグインパラメータ[フキダシ表示]のタイプを変更
//
// 2.4.0 2019/11/02 ・プラグインパラメータ[視界範囲描画]のスイッチ指定が
//                    正しく機能しないようになっていたため修正
//
// 2.3.9 2019/06/02 ・探索処理停止条件を緩和。
//
// 2.3.8 2019/06/02 ・前バージョンの修正が不十分だったので再修正。
//
// 2.3.7 2019/06/02 ・イベント画像が設定されていないとき、
//                    探索処理を行わないよう修正。
//
// 2.3.6 2019/04/06 ・プレイヤー追跡時、プレイヤーが通行可能なイベントを
//                    探索者も通行可能にするプラグインパラメータを追加。
//                  ・マップ移動時、追跡者スイッチを自動的にOFFにしてくれる
//                    プラグインパラメ―タを追加。
//
// 2.3.5 2018/10/27 ・視界をイベントの下に描画するプラグインパラメータを追加。
//                  ・探索停止時にプレイヤー発見状態をクリアするように修正。
//                  ・プレイヤー発見状態の場合に、
//                    強制ロストさせるコマンドを追加。
//                  ・全てのイベントを探索開始状態にするコマンドを追加
//                  ・探索状態のイベントを一時消去したときに
//                    探索が続けられていた問題を修正。
//
// 2.3.4 2017/12/30 ・一部メモ欄のオプション指定方法でスイッチ/変数指定対応が
//                    不完全だったため修正。
//                  ・プレイヤーをロストした場合にONにできる(セルフ)スイッチの
//                    設定を追加。
//                  ・マップイベント動作中にも探索を続行できる
//                    メモ欄オプションを追加。
//                  ・プラグインヘルプを一部更新
//
// 2.3.3 2017/12/10 ・一部探索が正常に動作していなかったため修正。
//                    スイッチの切り替えが正常に動作していなかったため修正。
//
// 2.3.2 2017/10/23 ・一部プラグインと併用した場合の問題を修正。
//                  ・プレイヤー発見時、探索者の頭上に
//                    任意のフキダシアイコンを表示可能に。
//                  ・プレイヤー発見時、任意のコモンイベントを実行可能に。
//                  ・プレイヤー発見時、任意のSEを再生可能に。
//                  ・プレイヤーロスト時、探索者の頭上に
//                    任意のフキダシアイコンを表示可能に。
//                  ・プレイヤーロスト時、任意のコモンイベントを実行可能に。
//                  ・プレイヤーロスト時、任意のSEを再生可能に。
//                  ・プラグインパラメータの指定方法を変更。
//
// 2.3.1 2017/09/23 ・ver2.3.0にて、探索者が存在しないシーンで
//                    エラーとなる問題を修正
//
// 2.3.0 2017/09/21 ・一部プラグインと併用した場合の問題を修正。
//
// 2.2.9 2017/08/08 ・プラグインヘルプを修正。
//                  ・探索者が存在しないマップでプラグインコマンドを実行すると
//                    エラーが発生する場合があったため修正。
//
// 2.2.8 2017/07/22 ・一部プラグインとの競合問題を解決。
//                  ・プラグインパラメーターの指定方法を変更。
//
// 2.2.7 2016/01/03 ・探索者がプレイヤー発見時に条件を満たすイベントページに
//                    設定された画像の向きにより、
//                    探索者がプレイヤーの方を向いていない
//                    状態で有効になったイベントが実行されていた問題を修正。
//
// 2.2.6 2016/11/12 ・メモ欄にEvとRgを一緒に指定した場合、Rgが正常に機能しない
//                    問題を修正。
//
// 2.2.5 2016/11/12 ・探索者の視界範囲がマップ上イベントオブジェクトの影響を
//                    受けるかどうか設定可能に。
//                  ・探索者の視界範囲がマップ上リージョンタイルの影響を
//                    受けるかどうか設定可能に。
//
// 2.2.4 2016/10/10 ・マップ描画時に自動的にプラグインコマンド[PSS start]を
//                    実行させるためのプラグインパラメーターを追加。
//
// 2.2.3 2016/10/09 ・同じマップに、同じスイッチをONにする探索者が複数存在した
//                    場合、イベントIDの一番大きな探索者でしかスイッチをOnに
//                    できなかった問題を修正。
//
// 2.2.2 2016/09/09 ・メモ欄の視界範囲マス数に変数を指定した場合に、
//                    正常に機能していなかった問題を修正。
//                  ・メモ欄に設定した(スイッチの使用可能な)オプションが
//                    正常に機能していなかった問題を修正。
//                  ・メモ欄のオプション値にセルフスイッチを指定した場合に
//                    正常に機能していなかった問題を修正。
//
// 2.2.1 2016/08/23 ・プラグインパラメーター/メモ欄に変数/スイッチを
//                    指定した場合、正しく値を取得できていなかった問題を修正。
//
// 2.2.0 2016/08/21 ・探索者の視界範囲を変数で指定する場合の記述方法を変更。
//                            変更前    :     変更後
//                        <PsensorL:&5> : <PsensorL:\v[5]>
//                      意味 : 視界範囲のマス数に変数5番の数値を使用する。
//                  ・メモ欄に指定するオプション文字列を変更。
//                      変更前 : 変更後 : 意味
//                        S    :  Sw    : 視界範囲内外で操作するスイッチ。
//                        B    :  Bo    : 両サイドを視界範囲とするか。
//                        R    :  Rv    : 視界範囲を描画するか。
//                        T    :  Td    : 視界範囲の生成に地形を考慮するか。
//                        D    :  Di    : 視界範囲の方向を指定する。
//                  ・メモ欄の設定に変数、スイッチを使えるように。
//                  ・プラグインパラメーターの設定にスイッチを使用可能に。
//
// 2.1.0 2016/07/24 ・視覚範囲の種類として、ひし形、四角形を追加。
//                    (ただし、地形考慮には非対応)
//                  ・探索者の視界範囲外に移動した場合に、
//                    設定されたスイッチの状態をONからOFFへ切り替えるように
//                    仕様を変更。
//                  ・探索者のセルフスイッチをOFFにできるコマンドを追加。
//                  ・探索方向を固定化できるDオプションを追加。
//                  ・Bオプションの不具合を修正。
//                  ・イベントページが切り替わると、センサーの状態が
//                    メモ欄の値で上書きされていた不具合を修正。
//                  ・プラグインの名前を変更。
//
// 1.0.0 2016/07/11 ・初版公開
// ----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//=============================================================================

/*:
 *
 * @plugindesc (v3.1.1) 玩家探测插件
 * @author マンカインド
 *
 * @help = 玩家探测插件 =
 * MKR_PlayerSensor.js
 *
 * 绘制对象事件(以下称为探索者)的视野范围，
 * 如果范围内存在玩家，该探索者会进入发现状态，并打开指定的开关。
 * (开关打开期间，探索者不会回头看向谈话的方向)
 *
 * 如果玩家超出视野范围，该探索者会进入丢失状态，
 * 并关闭之前打开的开关。
 * (状态转换所需的时间可通过设置进行调整)
 *
 * ※ 如果触发正在[自动执行]的事件时、考虑到游戏的负载问题，
 *    将会停止探索的过程。
 *    (可以在事件备注栏中更改设置)
 *
 *
 * 简单的使用说明:
 *   如果设置了要作为探索者的事件的备注栏，
 *   在探索者所在的地图上运行插件命令PSS start，
 *   则该地图上的所有探索者将开始搜索。
 *   (探索暂时无效状态的探索者除外)
 *
 *   如果在探索者所在的地图上运行插件命令PSS force_start，
 *   则该地图上的所有探索者将开始搜索。
 *   (探索暂时处于无效状态的探索者也开始探索)

 *   在探索者的事件中运行插件命令PSS t_start时，
 *   该探索者将开始搜索。
 *   (让处于探索暂时无效状态的探索者也开始探索。)
 *
 *   如果在探索者的事件中运行插件命令PSS t_stop，
 *   该探索者将停止搜索。
 *   (状态将更新为未发现玩家。)
 *
 *   如果在探索者所在的地图上运行插件命令PSS stop，
 *   则该地图上的所有探索者将停止搜索。
 *   (状态将更新为未发现玩家。)
 *
 *
 * 备注栏_基本设置(X为正整数):
 *   <PsensorL:X>
 *     ・搜索探索者前方x方格。
 *
 *   <PsensorF:X>
 *     ・以探索者为顶点，分别连接前方、左右x格
 *       位置的点所形成的三角形范围内进行搜索。
 *
 *   <PsensorD:X>
 *     ・从探索者上下左右连接前方x格的点
 *       而形成的菱形范围内进行探索。
 *
 *     ・如果是这个形状，就会无视地形的可通行状态。
 *       (始终处于Td选项为1的状态。)
 *
 *   <PsensorS:X>
 *     ・分别连接从探索者向上下、左右x格的位置
 *       的点而形成的四边形范围内进行搜索。
 *
 *     ・如果是这个形状，就会无视地形的可通行状态。
 *       (始终处于Td选项为1的状态。)
 *
 *   <PsensorL:\V[n]>
 *     ・设置视野范围使用表示变量的控制字符\V[n]。
 *       变量编号将第n个变量中保存的值作为范围值使用。
 *       (变量是实时刷新的)
 *
 *   <!PsensorL:X>
 *     ・探索者的前方x格是范围，
 *       头顶显示!时，暂时禁用搜索。
 *
 *     ・在这种情况下，在执行后述插件命令:PSS start
 *       时不会启动搜索功能，
 *         而是用插件命令:PSS t_start
 *         或脚本命令: $gameSystem.onSensor(eventId)
 *       来启动搜索功能。
 *
 *
 * 备注栏_选项(各选项用空格分隔):
 *     ・每个选项必须用空格分隔。
 *     ・如果未设置，则应用初始值设置。
 *
 *   Sw[数字或A～D]
 *     ・为每个探索者设置一个开关id或独立开关，
 *       当探索者发现玩家时，该开关id或独立开关将打开。
 *
 *     ・探索者失去玩家的视野后会自动关闭开关。
 *
 *     例)
 *       Sw10 : 打开开关id 10的开关。
 *       SwC  : 打开探索者的独立开关c。
 *
 *   Bo[0～1之间的数字，或\S[n]]
 *     ・不将探索者的两侧作为搜索范围(0)/(1)。
 *        为1时，探索者的左右方向1格为搜索范围。
 *
 *     ・\S[n]是获取开关状态的控制字符。
 *       N包含数值或A～D的字母。(A~D为独立开关)
 *       开关N的状态与指定了ON = 1相同。
 *
 *   Rv[0～1之间的数字，或\S[n]]
 *     ・不绘制探索者的视野范围(0)/(1)。
 *       为0时，则不会在屏幕上绘制探索者的视野范围。
 *       (只是卡不见视野范围，也会启动搜索)
 *
 *     ・\S[n]是获取开关状态的控制字符。
 *       N包含数值或A～D的字母。(A~D为独立开关)
 *       开关N的状态与指定了ON = 1相同。
 *
 *   Td[0或1、或\S[n]]
 *     ・计算视野范围时不考虑视野范围内地形/事件的通行状态(0)/(1)。
 *       为1时，如果视野范围内存在不可通行的图块，视野范围会发生变化。
 *
 *     ・在考虑地形可通行状态的情况下，
 *       不可通行的图块不会成为视野范围的对象，
 *       从探索者的角度来看，由于存在不可通行的图块而
 *       成为死角的图块也不成为视野范围的对象。
 *
 *     ・\S[n]是获取开关状态的控制字符。
 *       N包含数值或A～D的字母。(A~D为独立开关)
 *       开关N的状态与指定了ON = 1相同。
 *
 *   Di[U,R,L,D中的任意一个字符]
 *     ・不考虑探索者的朝向，固定搜索方向。
 *       U表示上、R表示右、L表示左、D表示下。
 *
 *   Ev[0或1、或\S[n]]
 *     ・探索者的视野范围受地图上无法通过的事件
 *       (优先级与「与人物相同」)的影响(1)/不受影响(0)。
 *       为1时，如果视野范围内存在不能通行的地图事件，
 *       视野范围会发生变化。
 *
 *     ・如果将[图块B]或之后的图块设置为事件的图像，
 *       并且事件的优先级为「在人物下方」，
 *       则图块集的可通行设置会影响视野范围，
 *       如果图块集设置不可通行，则超出视野范围。
 *
 *     ・如果设置为无视视野范围内的可通行状态，
 *       该设置将被忽略。
 *
 *   Rg[区域id、或\V[n]]
 *     ・如果设置，则探索者的视野范围受地图上的区域图块的影响。
 *       例如，如果设置1，则放置区域id为1的1图块将视为为墙壁，
 *       不在视野范围内。
 *
 *     ・如果设置为无视视野范围内的可通行状态，
 *       该设置将被忽略。
 *
 *   Fb[气泡图标id或\V[n]]
 *     ・如果设置，探索者发现玩家时，探索者的头上会显示气泡图标。
 *
 *   Fc[公共事件id或\V[n]]
 *     ・如果设置，则执行探索者发现玩家时设置的公共事件。
 *
 *   Fd[延迟帧数或\V[n]]
 *     ・如果设置，探索者发现玩家的时间会延迟这个帧数。
 *
 *   Lb[气泡图标id或\V[n]]
 *     ・如果设置，当探索者失去目标时，探索者的头上会显示气泡图标。
 *
 *   Lc[公共事件编号或\V[n]]
 *     ・如果设置，则执行探索者失去目标时设置的公共事件。
 *
 *   Ld[延迟帧数或\V[n]]
 *     ・如果设置，探索者丢失目标的时间将延迟这个帧数。
 *
 *   Li
 *     ・设置时，即使玩家超出了探索者的视野，
 *       也不会将探索者转移到目标丢失状态。
 *
 *     ・一旦找到，只要在同一地图上就持续追踪玩家的事件等。
 *
 *     ・可以使用脚本等转移到目标丢失状态。
 *
 *   Am[0或1、或\S[n]]
 *     ・自动执行事件正在运行时，
 *       继续探索处理(1)/不继续(0)
 *       默认值为 0。
 *
 *     ・继续搜索时，即使自动执行事件正在运行，
 *       也会判断视野范围内是否有玩家。
 *       (仅当目标探索者处于搜索开始状态时)
 *
 *     ・将此选项设置为1的探索者将在搜索开始状态下始终继续搜索，
 *       从而增加游戏操作负荷。
 *       请慎重设置。
 *
 *   Lsw[数字或A～D]
 *     ・为每个探索者设置一个开关id或独立开关，
 *       当探索者发现玩家时，该开关id或独立开关将打开。
 *
 *     ・发现玩家时打开的开关，在失去目标时自动关闭。
 *
 *     例)
 *       Lsw11 : 打开开关编号11号的开关。
 *       LswB  : 打开探索者的独立开关B。
 *
 *
 * 备注栏设置示例:
 *   <PsensorL:7>
 *     ・探索者搜索前方7个方块的范围。
 *
 *   <PsensorF:3>
 *     ・以探索者为顶点，在前方3格左右连接前方3格的位置
 *       而成的三角形图形范围内进行搜索。
 *
 *   <PsensorL:\V[100]>
 *     ・探索者搜索前方[变量编号100]的范围。
 *
 *   <PsensorL:4 SwC>
 *     ・搜索前方4格的范围。
 *       发现玩家时打开探索者的独立开关C。
 *
 *   <PsensorF:5 Bo1>
 *     ・以探索者为顶点，在前方3格左右连接3格点
 *       而成的三角形图形范围内进行搜索。
 *
 *     ・进而将探索者的两侧作为搜索范围。
 *
 *   <PsensorL:10 Rv0>
 *     ・探索者搜索前方10格的范围，但不绘制视野范围。
 *
 *   <PsensorL:10 Rv\s[20]>
 *     ・探索者搜索前方10格的范围。
 *
 *     ・开关id 20的开关处于关闭的情况下，
 *       不绘制视野范围。
 *
 *   <PsensorL:10 Td0>
 *     ・探索者搜索前方10格的范围，
 *       但不考虑视野范围内的可通行图块状态。
 *
 *   <PsensorL:10 Td\s[A]>
 *     ・探索者搜索前方10格的范围。
 *
 *     ・独立开关A处于关闭的情况下，
 *       不考虑视野范围内的可通行图块状态。
 *
 *   <PsensorF:&2 Bo0 Sw1>
 *     ・以探索者为顶点，在前方[变量编号2]
 *       方格左右连接[变量编号2号]方格前方位置的点
 *       而成的三角形图形范围内进行搜索，
 *       但不将探索者的两侧作为搜索范围。
 *
 *     ・发现玩家时打开开关编号1的开关。
 *
 *   <PsensorL:7 DiR>
 *     ・探索者搜索右边7格的范围。
 *
 *   <PsensorF:7 DiU>
 *     ・以探索者为顶点，在上面3格左右连接3格点
 *       而成的三角形图形范围内进行搜索。
 *
 *   <PsensorL:10 Ev1 Rg10>
 *     ・探索者搜索前方10格的范围，
 *       但考虑视图范围内是否存在地图事件。
 *       然后将区域编号10的图块识别为墙壁。
 *
 *
 * 插件命令:
 *   PSS start
 *     ・执行命令的地图上存在的所有探索者
 *       开始执行搜索。
 *       (搜索暂时禁用的探索者不在对象中)
 *
 *   PSS force_start
 *     ・执行命令的地图上存在的所有探索者
 *       开始执行搜索。
 *       (搜索暂时禁用的探索者也包括在内)
 *
 *   PSS stop
 *     ・执行命令的地图上存在的所有探索者
 *       将进入停止搜索。
 *       (将玩家作为未发现的状态更新。)
 *
 *   PSS reset X Y ...
 *     ・执行命令的地图上存在的所有探索者为对象，
 *       关闭插件参数[发现后操作开关]中
 *       中设置的(独立)开关或Sw选项中设置的(独立)开关。
 *        (Sw选项的设定优先)
 *
 *     ・另外，也同样关闭在重置之后设置的(独立)开关。
 *       一起关闭时请设置。
 *       (X,Y是独立开关/开关di。
 *        请用空格隔开输入)
 *
 *   PSS lost
 *     ・强制将执行命令的地图上处于的发现状态的探索者转移到目标丢失状态。
 *
 *   PSS found
 *     ・强制将执行命令的地图上处于的目标丢失状态的探索者转移到发现状态。
 *
 *   PSS t_start
 *     ・将执行此命令的探索者转移为搜索开始状态。
 *
 *     ・在实际执行搜索之前，必须运行PSS start命令。
 *
 *   PSS t_stop
 *     ・将执行此命令的探索者处于停止搜索状态。
 *       (将玩家作为未发现的状态更新。)
 *
 *   PSS t_reset X Y ...
 *     ・执行此命令的搜索者为对象，
 *       关闭插件参数[发现后操作开关]中设置的(独立)开关
 *       或备注栏的Sw选项中设置的(独立)开关。
 *       (备注栏的设置优先)
 *
 *     ・"X","Y"表示(独立)开关，此处记载的(独立)开关也同样关闭。 
 *       想一起关闭时请设置。
 *       (请用空格分隔独立开关/开关id)
 *
 *   PSS t_lost
 *     ・强制执行此命令的发现状态的探索者转移到目标丢失状态。
 *
 *   PSS t_find
 *     ・强制执行此命令的未发现状态的探索者转移到发现状态。
 *
 *   PSS t_move X
 *     ・将运行此命令的事件移动到与执行此命令时玩家位置相邻的位置。
 *
 *     ・X是移动速度。 对应1～6，
 *       如果未设置，则使用事件中设置的速度。
 *
 *     ・插件参数[考虑不可通行图块]为OFF或
 *       备注栏的Td选项为0时，可能无法正常移动。
 *       (イベントのすり抜けを有効にすることで移動可能です)
 *
 *
 * 脚本命令:
 *   $gameSystem.getEventSensorStatus(eventId)
 *     ・为具有指定事件ID的探索者获取搜索状态。
 *       [返回值] | [意义]
 *          -1    | 搜索暂时无效状态
 *           0    | 搜索停止状态
 *           1    | 搜索执行状态
 *
 *   $gameSystem.onSensor(eventId)
 *     ・将具有指定事件ID的探索者置于搜索开始状态。
 *       用于对探索停止/暂时无效状态的探索者重新开始搜索。
 *
 *     ・探为了开始搜索，需要事先执行PSS start(PSS force_start)命令。
 *
 *   $gameSystem.offSensor(eventId)
 *     ・将具有指定事件ID的探索者置于停止搜索状态。
 *       (将玩家作为未发现的状态更新。)
 *
 *   $gameSystem.neutralSensor(eventId, ["X","Y",...])
 *     ・对于当前地图中存在的具有指定事件ID的搜索者，
 *       关闭[发现后操作开关]中设置的(独立)开关
 *       或通过Sw选项指定的独立开关。 
 *       (备注栏的设置优先)
 *
 *     ・"X","Y"表示(独立)开关，此处记载的(独立)开关也同样关闭。 
 *       想一起关闭时请设置。
 *       (请用空格分隔独立开关/开关id)
 *
 *   $gameSystem.isFoundPlayer()
 *     ・如果在当前地图中被探索者找到了玩家，则返回true。
 *       (否则返回false)
 *
 *   $gameSystem.allForceLost()
 *     ・强制将当前地图中存在的发现状态的探索者转移到目标丢失状态。
 *
 *   $gameSystem.forceLost(eventId)
 *     ・拥有指定事件ID的探索者处于发现状态时，强制转移到目标丢失状态。
 *
 *   $gameSystem.allForceFound()
 *     ・强制将当前地图中存在的玩家未发现状态的探索者转移到发现状态。
 *
 *   $gameSystem.forceFound(eventId)
 *     ・拥有指定事件ID的探索者处于玩家未发现状态时，强制转移到发现状态。
 *
 *
 * 补充：
 *   ・此插件的备注栏设置、插件命令和不区分大小写。
 *
 *   ・在插件参数的说明中，写有[初始值]的可以在备注栏中单独设置。
 *     设置后，备注栏的设置优先于[初始值]，请注意。
 *
 *   ・插件参数的说明中，写有[可变量]
 *     的可以在设定值中使用表示变量的控制字符\V[n]。
 *     设定变量后，在使用该参数时会参照变量值，
 *     因此可以在游戏中变更参数的设定。
 *
 *   ・在插件参数的说明中，写有[可开关]
 *     的可以在设定值中使用表示开关的控制字符\S[n]。(N为数值)
 *     设置的开关为ON时，等于在插件参数中指定了ON或1,
 *     如果设置了开关，则在使用该参数时会参考开关的值，
 *     因此可以在游戏中更改参数设置。
 *
 *
 * 使用条款:
 *   ・可以擅自修改、重新发布本插件给作者。
 *     (但请保留页眉的版权标识部分。)
 *
 *   ・使用形式(免费游戏、商用游戏、R-18作品等)没有限制。
 *     请自由使用。
 *
 *   ・关于使用本插件而出现的问题，作者不承担任何责任。
 *
 *   ・根据要求等，有可能进行本插件的版本升级，
 *     但版本升级可能会变更本插件的规格。
 *     请谅解。
 *
 * @param 探索設定
 * @text 探索设置
 * @default ====================================
 *
 * @param Sensor_Switch
 * @text 发现后操作开关
 * @desc [初始值]设置发现玩家时要打开的开关id或独立开关。(目标丢失后关闭开关)
 * @type select
 * @option 独立开关A
 * @value A
 * @option 独立开关B
 * @value B
 * @option 独立开关C
 * @value C
 * @option 独立开关D
 * @value D
 * @default D
 * @parent 探索設定
 *
 * @param Lost_Sensor_Switch
 * @text 丢失后操作开关
 * @desc [初始值]设置丢失目标时要打开的开关id或独立开关。(目标发现后关闭开关)
 * @type select
 * @option 独立开关A
 * @value A
 * @option 独立开关B
 * @value B
 * @option 独立开关C
 * @value C
 * @option 独立开关D
 * @value D
 * @default
 * @parent 探索設定
 *
 * @param Both_Sensor
 * @text 两侧视野
 * @desc [初始值:可开关] 将探索者的两侧作为搜索范围时请设置ON，否则请设置OFF。
 * @type combo
 * @option ON
 * @option OFF
 * @default OFF
 * @parent 探索設定
 *
 * @param Terrain_Decision
 * @text 考虑不可通行图块
 * @desc [初始值:可开关] 考虑视野范围内存在不可通行图块时请设置ON，不存在时请设置OFF。
 * @type combo
 * @option ON
 * @option OFF
 * @default ON
 * @parent 探索設定
 *
 * @param Auto_Sensor
 * @text 探索自动开始
 * @desc 在地图绘制时自动开始搜索处理的设定。 默认值:不开始
 * @type boolean
 * @on 开始
 * @off 不开始
 * @default false
 * @parent 探索設定
 *
 * @param Event_Decision
 * @text 考虑其他事件
 * @desc [初始值:可开关] 如果希望视野范围考虑地图事件的存在，请设置ON；否则请设置OFF。
 * @type combo
 * @option ON
 * @option OFF
 * @default OFF
 * @parent 探索設定
 *
 * @param Region_Decision
 * @text 区域设置
 * @desc [初始值:可变量]请设置视野范围外(墙壁处理)的区域编号。
 * @type string[]
 * @default []
 * @parent 探索設定
 *
 * @param Real_Range_X
 * @text 搜索范围X扩张
 * @desc 将搜索范围横向扩张指定的数值(视野绘制以图块为单位)。在玩家以像素为单位移动时有效。(默认值:0)
 * @type number
 * @decimals 3
 * @max 0.999
 * @min 0.000
 * @default 0.000
 * @parent 探索設定
 *
 * @param Real_Range_Y
 * @text 索范围Y扩张
 * @desc 将搜索范围纵向扩张指定的数值(视野绘制以图块为单位)。在玩家以像素为单位移动时有效。(默认值:0)
 * @type number
 * @decimals 3
 * @max 0.999
 * @min 0.000
 * @default 0.000
 * @parent 探索設定
 *
 * @param 視界設定
 * @text 视野设置
 * @default ====================================
 *
 * @param Range_Visible
 * @text 视野范围绘制
 * @desc [初始值:可开关] 绘制探索者的视野范围时请设置ON，否则请设置OFF。
 * @type combo
 * @option ON
 * @option OFF
 * @default ON
 * @parent 視界設定
 *
 * @param Range_Color
 * @text 视野范围的颜色
 * @desc 请选择绘制视野范围时的颜色。默认值:白色
 * @type select
 * @option 白色
 * @value white
 * @option 红色
 * @value red
 * @option 蓝色
 * @value blue
 * @option 黄色
 * @value yellow
 * @default white
 * @parent 視界設定
 *
 * @param Range_Opacity
 * @text 视野范围的不透明度
 * @desc 请用数字指定绘制视野范围时的不透明度。默认值:80(0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 80
 * @parent 視界設定
 *
 * @param Range_Position
 * @text 视野范围位置
 * @desc 选择显示探索者视野范围的位置。默认值:1(显示在事件上方)
 * @type select
 * @option 显示在事件上方
 * @value 1
 * @option 显示在事件下方
 * @value 2
 * @default 1
 * @parent 視界設定
 *
 * @param Player_Found
 * @text 发现玩家设定
 * @desc 关于探索者发现玩家的设定。
 * @type struct<AlertFound>
 * @default {"Ballon":"0","Se":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Common_Event":"0","Delay":"0"}
 *
 * @param Player_Lost
 * @text 目标丢失设定
 * @desc 关于探索者目标丢失的设定。
 * @type struct<AlertLost>
 * @default {"Ballon":"0","Se":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Common_Event":"0","Delay":"0","Invalid":"false"}
 *
 * @param マップ設定
 * @text 地图设置
 * @default ====================================
 *
 * @param Tracking_Priority
 * @text 追踪优先级
 * @desc 设定玩家发现状态的事件是否可以在其他事件的上方或下方通行。(默认:不可通行)
 * @type boolean
 * @on 可以通行
 * @off 不可通行
 * @default false
 * @parent マップ設定
 *
 * @param Follower_Through
 * @text 无视队友
 * @desc 设定玩家发现状态下的事件是否会绕过玩家的追随者(队伍)。(默认:不可挤过)
 * @type boolean
 * @on 可以挤过
 * @off 不可挤过
 * @default false
 * @parent マップ設定
 *
 * @param Location_Reset
 * @text 地图移动时重置
 * @desc 使用场所移动命令时，重置或设置放置在原始地图上的探索者的跟踪状态。(默认:不重置)
 * @type boolean
 * @on 重置
 * @off 不重置
 * @default false
 * @parent マップ設定
 *
*/
/*~struct~AlertFound:
 *
 * @param Ballon
 * @text [初始值]气泡图标显示
 * @desc 如果要让探索者显示气泡图标，请设置图标编号。默认值:不显示
 * @type select
 * @option 不显示
 * @value 0
 * @option 惊讶
 * @value 1
 * @option 问号
 * @value 2
 * @option 音符
 * @value 3
 * @option 心形
 * @value 4
 * @option 生气
 * @value 5
 * @option 流汗
 * @value 6
 * @option 纠结
 * @value 7
 * @option 沉默
 * @value 8
 * @option 灯泡
 * @value 9
 * @option Zzz
 * @value 10
 * @option 自定义1
 * @value 11
 * @option 自定义2
 * @value 12
 * @option 自定义3
 * @value 13
 * @option 自定义4
 * @value 14
 * @option 自定义5
 * @value 15
 * @default 0
 *
 * @param Se
 * @text SE设置
 * @desc 关于音效的设定。
 * @type struct<Se>
 *
 * @param Common_Event
 * @text [初始值]公共事件执行
 * @desc 执行指定的公共事件。默认值:0(无)
 * @type common_event
 * @default 0
 *
 * @param Delay
 * @text [初始值]状态转移延迟
 * @desc 将转移到玩家发现状态的时机延迟指定的帧数
 * (60帧=1秒)。默认值:0
 * @type number
 * @min 0
 * @default 0
 *
*/
/*~struct~AlertLost:
 *
 * @param Ballon
 * @text [初始值]气泡图标显示
 * @desc 如果要让探索者显示气泡图标，请设置图标编号。默认值:不显示
 * @type select
 * @option 不显示
 * @value 0
 * @option 惊讶
 * @value 1
 * @option 问号
 * @value 2
 * @option 音符
 * @value 3
 * @option 心形
 * @value 4
 * @option 生气
 * @value 5
 * @option 流汗
 * @value 6
 * @option 纠结
 * @value 7
 * @option 沉默
 * @value 8
 * @option 灯泡
 * @value 9
 * @option Zzz
 * @value 10
 * @option 自定义1
 * @value 11
 * @option 自定义2
 * @value 12
 * @option 自定义3
 * @value 13
 * @option 自定义4
 * @value 14
 * @option 自定义5
 * @value 15
 * @default 0
 *
 * @param Se
 * @text SE设置
 * @desc 关于音效的设定。
 * @type struct<Se>
 *
 * @param Common_Event
 * @text [初始值]公共事件执行
 * @desc 执行指定的公共事件。默认值:0(无)
 * @type common_event
 * @default 0
 *
 * @param Delay
 * @text [初始值]状态转移延迟
 * @desc 将转移到目标丢失状态的时机延迟指定的帧数
 * (60帧=1秒)。默认值:0
 * @type number
 * @min 0
 * @default 0
 *
 * @param Invalid
 * @text [初始值]状态转移无效功能
 * @desc 目标丢失的情况下不转移状态
 * (可以通过脚本等手动转移)。默认值:无效
 * @type boolean
 * @on 有效
 * @off 无效
 * @default false
 *
*/
/*~struct~Se:
 *
 * @param Name
 * @text 文件名
 * @desc 指定要播放的文件。默认值:空(不播放)
 * @type file
 * @require 1
 * @dir audio/se
 *
 * @param Volume
 * @text 播放时音量
 * @desc 指定播放文件时的音量( 0到100之间的数字)。默认值: 90
 * @type number
 * @max 100
 * @min 0
 * @default 90
 *
 * @param Pitch
 * @text 播放时音调
 * @desc 指定播放文件时的音调( 0到100之间的数字)。默认值: 100
 * @type number
 * @max 150
 * @min 50
 * @default 100
 *
 * @param Pan
 * @text 播放时声像
 * @desc 指定播放文件时的声像(-100到100之间的数字)。默认值: 0
 * @type number
 * @max 100
 * @min -100
 * @default 0
 *
*/
(function () {
    'use strict';

    const PN = "MKR_PlayerSensor";

    const CheckParam = function(type, name, value, def, min, max, options) {
        let regExp;

        if(min == undefined || min == null) {
            min = -Infinity;
        }
        if(max == undefined || max == null) {
            max = Infinity;
        }
        if(value == null) {
            value = "";
        } else {
            value = String(value);
        }
        regExp = /^\x1bV\[\d+\]|\x1bS\[\d+\]$/i;
        value = value.replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');

        if(!regExp.test(value)) {
            switch(type) {
                case "bool":
                    if(value == "") {
                        value = (def)? true : false;
                    } else {
                        value = value.toUpperCase() === "ON" || value.toUpperCase() === "TRUE" || value.toUpperCase() === "1";
                    }
                    break;
                case "num":
                    if(value == "") {
                        value = (isFinite(def))? parseInt(def, 10) : 0;
                    } else {
                        value = (isFinite(value))? parseInt(value, 10) : (isFinite(def))? parseInt(def, 10) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                case "float":
                    if(value == "") {
                        value = (isFinite(def))? parseFloat(def) : 0;
                    } else {
                        value = (isFinite(value))? parseFloat(value) : (isFinite(def))? parseFloat(def) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                case "string":
                    if(value == "") {
                        value = (def != "")? def : value;
                    }
                    break;
                case "switch":
                    if(value == "") {
                        value = (def != "")? def : value;
                    }
                    if(name == "Lost_Sensor_Switch" && (value == null || value == undefined)) {
                        value = "";
                    }
                    if(name != "Lost_Sensor_Switch" && !value.match(/^([A-D]|\d+)$/i)) {
                        throw new Error('Plugin parameter value is not switch : '+name+' : '+value);
                    }
                    break;
                default:
                    throw new Error("[CheckParam] " + name + "のタイプが不正です: " + type);
                    break;
            }
        }

        return [value, type, def, min, max];
    };

    const CEC = function(params) {
        let text, value, type, def, min, max;
        text = String(params[0]);
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        type = params[1];
        def = params[2];
        min = params[3];
        max = params[4];

        text = convertEscapeCharacters(text);

        switch(type) {
            case "bool":
                if(text == "") {
                    value = (def)? true : false;
                } else {
                    value = text === true || text.toUpperCase() === "ON" || text.toUpperCase() === "TRUE" || text.toUpperCase() === "1";
                }
                break;
            case "num":
                value = (isFinite(text))? parseInt(text, 10) : (isFinite(def))? parseInt(def, 10) : 0;
                value = value.clamp(min, max);
                break;
            case "float":
                value = (isFinite(text))? parseFloat(text) : (isFinite(def))? parseFloat(def) : 0;
                value = value.clamp(min, max);
                break;
            case "string":
                if(text == "") {
                    value = (def != "")? def : value;
                } else {
                    value = text;
                }
                break;
            case "switch":
                if(value == "") {
                    value = (def != "")? def : value;
                }
                if(!value.match(/^([A-D]|\d+)$/)) {
                    throw new Error('Plugin parameter value is not switch : '+param+' : '+value);
                }
                break;
            default:
                throw new Error('[CEC] Plugin parameter type is illegal: '+type);
                break;
        }

        return value;
    };

    const convertEscapeCharacters = function(text) {
        let windowChild;

        if(typeof text == "string") {
            if(SceneManager._scene && SceneManager._scene._windowLayer) {
                windowChild = SceneManager._scene._windowLayer.children[0];
                text = windowChild ? windowChild.convertEscapeCharacters(text) : text;
            } else {
                text = ConvVb(text);
            }
        }

        return text;
    };

    const ConvVb = function(text) {
        let num, regExp;
        regExp = /^\x1bV\[(\d+)\]$/i;

        if(typeof text == "string") {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');

            text = text.replace(regExp, function() {
                num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            }.bind(this));
            text = text.replace(regExp, function() {
                num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            }.bind(this));
        }

        return text;
    };

    const ConvSw = function(text, target) {
        let num, key, regExp;
        regExp = /^\x1bV\[\d+\]$|^\x1bS\[\d+\]$/i;

        if(typeof text == "string") {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');

            text = text.replace(/\x1bS\[(\d+)\]/i, function() {
                num = parseInt(arguments[1]);
                return $gameSwitches.value(num);
            }.bind(this));
            text = text.replace(/\x1bS\[([A-D])\]/i, function() {
                if(target) {
                    key = [target._mapId, target._eventId, arguments[1].toUpperCase()];
                    return $gameSelfSwitches.value(key);
                }
                return false;
            }.bind(this));

            if(text === true || text.toLowerCase() === "true" || text == "1") {
                text = 1;
            } else {
                text = 0;
            }
        }

        return text;
    };

    const paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    const paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    const Parameters = paramParse(PluginManager.parameters(PN));
    let DIR_UP, DIR_DOWN, DIR_RIGHT, DIR_LEFT,
        DefSensorSwitch, DefBothSensor, DefRangeVisible,
        DefTerrainDecision, DefRangeColor, DefRangeOpacity,
        DefAutoSensor, DefEventDecision, DefRegionDecisions,
        DefRealRangeX, DefRealRangeY, DefLostSensorSwitch,
        DefFoundBallon, DefFoundCommon, DefFoundDelay, DefFoundSe,
        DefLostBallon, DefLostCommon, DefLostDelay, DefLostSe, DefLostInvalid,
        DefRangePosition, DefTrackingPriority, DefFollowerThrough, DefLocationReset;
    DefSensorSwitch = CheckParam("switch", "Sensor_Switch", Parameters["Sensor_Switch"], "D");
    DefLostSensorSwitch = CheckParam("switch", "Lost_Sensor_Switch", Parameters["Lost_Sensor_Switch"]);
    DefBothSensor = CheckParam("bool", "Both_Sensor", Parameters["Both_Sensor"], false);
    DefRangeVisible = CheckParam("bool", "Range_Visible", Parameters["Range_Visible"], true);
    DefTerrainDecision = CheckParam("bool", "Terrain_Decision", Parameters["Terrain_Decision"], false);
    DefRangeColor = CheckParam("string", "Range_Color", Parameters["Range_Color"], "white");
    DefRangeOpacity = CheckParam("num", "Range_Opacity", Parameters["Range_Opacity"], 80, 0, 255);
    DefRangePosition = CheckParam("num", "Range_Position", Parameters["Range_Position"], 1);
    DefAutoSensor = CheckParam("bool", "Auto_Sensor", Parameters["Auto_Sensor"], false);
    DefEventDecision = CheckParam("bool", "Event_Decision", Parameters["Event_Decision"], false);
    DefRegionDecisions = [];
    Parameters["Region_Decision"].forEach(function(region) {
        DefRegionDecisions.push(CheckParam("string", "Region_Decision", region, 0));
    });
    DefRealRangeX = CheckParam("float", "Real_Range_X", Parameters["Real_Range_X"], 0.000, 0.000, 0.999);
    DefRealRangeY = CheckParam("float", "Real_Range_Y", Parameters["Real_Range_Y"], 0.000, 0.000, 0.999);
    DefFoundBallon = CheckParam("num", "Player_Found.Ballon", Parameters["Player_Found"]["Ballon"], 0, 0);
    DefFoundCommon = CheckParam("num", "Player_Found.Common_Event", Parameters["Player_Found"]["Common_Event"], 0, 0);
    DefFoundDelay = CheckParam("num", "Player_Found.Delay", Parameters["Player_Found"]["Delay"], 0, 0);
    DefFoundSe = {
        "name" : CheckParam("string", "Player_Found.Se.Name", Parameters["Player_Found"]["Se"]["Name"], "")[0],
        "volume" : CheckParam("num", "Player_Found.Se.Volume", Parameters["Player_Found"]["Se"]["Volume"], 90, 0, 100)[0],
        "pitch" : CheckParam("num", "Player_Found.Se.Pitch", Parameters["Player_Found"]["Se"]["Pitch"], 100, 50, 150)[0],
        "pan" : CheckParam("num", "Player_Found.Se.Pan", Parameters["Player_Found"]["Se"]["Pan"], 0, -100, 100)[0],
    }
    DefLostBallon = CheckParam("num", "Player_Lost.Ballon", Parameters["Player_Lost"]["Ballon"], 0, 0);
    DefLostCommon = CheckParam("num", "Player_Lost.Common_Event", Parameters["Player_Lost"]["Common_Event"], 0, 0);
    DefLostDelay = CheckParam("num", "Player_Lost.Delay", Parameters["Player_Lost"]["Delay"], 0, 0);
    DefLostSe = {
        "name" : CheckParam("string", "Player_Lost.Se.Name", Parameters["Player_Lost"]["Se"]["Name"], "")[0],
        "volume" : CheckParam("num", "Player_Lost.Se.Volume", Parameters["Player_Lost"]["Se"]["Volume"], 90, 0, 100)[0],
        "pitch" : CheckParam("num", "Player_Lost.Se.Pitch", Parameters["Player_Lost"]["Se"]["Pitch"], 100, 50, 150)[0],
        "pan" : CheckParam("num", "Player_Lost.Se.Pan", Parameters["Player_Lost"]["Se"]["Pan"], 0, -100, 100)[0],
    }
    DefLostInvalid = CheckParam("bool", "Player_Lost.Invalid", Parameters["Player_Lost"]["Invalid"], false);
    DefTrackingPriority = CheckParam("bool", "Tracking_Priority", Parameters["Tracking_Priority"], false);
    DefFollowerThrough = CheckParam("bool", "Follower_Through", Parameters["Follower_Through"], false);
    DefLocationReset = CheckParam("bool", "Location_Reset", Parameters["Location_Reset"], false);

    DIR_UP = 8;
    DIR_DOWN = 2;
    DIR_RIGHT = 6;
    DIR_LEFT = 4;

    //=========================================================================
    // Game_Interpreter
    //  ・プレイヤー探索制御プラグインコマンド
    //  ・イベントをプレイヤー近くまで移動させるコマンド
    //  を定義
    //=========================================================================
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command.toLowerCase() === "pss") {
            switch (args[0].toLowerCase()) {
                case "start":// 探索開始
                    $gameSystem.startSensor();
                    break;
                case "force_start":// 全て探索開始
                    $gameSystem.startSensor(1);
                    break;
                case "stop":// 探索停止
                    $gameSystem.stopSensor();
                    break;
                case "reset":// 全探索者のセルフスイッチ初期化
                    $gameSystem.resetSensor(args);
                    break;
                case "lost":// 発見状態の探索者を強制ロスト状態に移行させる
                    $gameSystem.allForceLost();
                    break;
                case "found":// 未発見状態の探索者を強制発見状態に移行させる
                    $gameSystem.allForceFound();
                    break;
                case "t_start":// 対象探索者を探索開始状態にする
                    $gameSystem.onSensor(this.eventId());
                    break;
                case "t_stop":// 対象探索者を探索停止状態にする
                    $gameSystem.offSensor(this.eventId());
                    break;
                case "t_reset":// 対象探索者のセルフスイッチ初期化
                    $gameSystem.neutralSensor(this.eventId(), args);
                    break;
                case "t_move":// 対象探索者をプレイヤーの位置付近まで移動
                    this.moveNearPlayer(args[1]);
                    break;
                case "t_lost":// 対象探索者を強制ロスト状態に移行させる
                    $gameSystem.forceLost(this.eventId());
                    break;
                case "t_found":// 対象探索者を強制発見状態に移行させる
                    $gameSystem.forceFound(this.eventId());
                    break;
            }
        }
    };

    Game_Interpreter.prototype.moveNearPlayer = function(speed) {
        let event, oldSpeed, newSpeed, list, sx, sy, i, direction;
        event = $gameMap.event(this._eventId);
        oldSpeed = event.moveSpeed();
        newSpeed = oldSpeed;
        sx = Math.abs(event.deltaXFrom($gamePlayer.x));
        sy = Math.abs(event.deltaYFrom($gamePlayer.y));
        list = [];

        if(event) {
            // 移動スピード設定
            if(speed && isFinite(speed) && speed > 0) {
                newSpeed = parseInt(speed, 10);
            }

            // 移動ルート設定
            list.push({"code":29,"parameters":[newSpeed]}, {"code":25})
            for(i = 1; i < sx + sy; i++) {
                list.push({"code":10});
            }
            list.push({"code":25}, {"code":29,"parameters":[oldSpeed]}, {"code":0});

            // 移動開始
            event.forceMoveRoute({
                "list":list,
                "repeat":false,
                "skippable":true,
                "wait":true
            });
        }

    };

    Game_Interpreter.prototype.setupReservedCommonEventEx = function(eventId) {
        if ($gameTemp.isCommonEventReserved()) {
            this.setup($gameTemp.reservedCommonEvent().list, eventId);
            $gameTemp.clearCommonEvent();
            return true;
        } else {
            return false;
        }
    };


    //=========================================================================
    // Game_System
    //  プレイヤー探索制御を定義
    //=========================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(){
        _Game_System_initialize.call(this);
        this._sensorStart = false
        this._switchStatuses  = {};
    };

    Game_System.prototype.startSensor = function(type) {
        if(!type) {
            type = 0;
        }
        this.setSensorStart(true);
        this.setSensorStatusAll(1, type);
        this.setViewRangeStatusAll(2);
    };

    Game_System.prototype.stopSensor = function() {
        this.setSensorStart(false);
        this.setSensorStatusAll(0);
        this.setViewRangeStatusAll(0);
    };

    Game_System.prototype.resetSensor = function(args) {
        $gameMap.events().forEach(function(event) {
            if(event.getSensorType() != null) {
                $gameSystem.neutralSensor(event.eventId(), args)
            }
        }, this);
    };

    Game_System.prototype.onSensor = function(eventId) {
        let event = $gameMap.event(eventId);

        if(event && event.getSensorType() != null) {
            event.setSensorStatus(1);
        }
    };

    Game_System.prototype.offSensor = function(eventId) {
        let event = $gameMap.event(eventId);

        if(event && event.getSensorType() != null) {
            event.setSensorStatus(0);
            event.setFoundStatus(0);
        }
    };

    Game_System.prototype.neutralSensor = function(eventId, args) {
        let mapId, event, sw, switches, sensorSwitch;
        mapId = $gameMap.mapId();
        event = $gameMap.event(eventId);
        switches = [];
        if(args && args.length >= 2) {
            switches = args.slice(1);
        }
        sensorSwitch = DefSensorSwitch[0];

        if(event) {
            if(event.getSensorType() != null) {
                sw = (event.getSensorSwitch() != null)? event.getSensorSwitch() : sensorSwitch;
                switches.push(sw);

                switches.forEach(function(sw) {
                    if(isFinite(sw)) {
                        $gameSwitches.setValue(sw, false);
                    } else if(sw.match(/[a-dA-D]/)) {
                        $gameSelfSwitches.setValue([mapId, eventId, sw.toUpperCase()], false);
                    }
                }, this)
            }
        }
    };

    Game_System.prototype.isSensorStart = function() {
        return this._sensorStart;
    };

    Game_System.prototype.setSensorStart = function(sensorStart) {
        this._sensorStart = sensorStart || false;
    };

    Game_System.prototype.getSensorStart = function() {
        return this._sensorStart;
    };

    Game_System.prototype.setSensorStatusAll = function(status, type) {
        if(!type) {
            type = 0;
        }
        if(type) {
            $gameMap.events().forEach(function(event) {
                if(event.getSensorType() != null) {
                    event.setSensorStatus(status);
                    event.setFoundStatus(0);
                }
            }, this);
            return;
        }
        $gameMap.events().forEach(function(event) {
            if(event.getSensorType() != null && event.getSensorStatus() != -1) {
                event.setSensorStatus(status);
                event.setFoundStatus(0);
            }
        }, this);
    }

    Game_System.prototype.setViewRangeStatusAll = function(status) {
        $gameMap.events().forEach(function(event) {
            if(event.getSensorType() != null) event.setViewRangeStatus(status);
        }, this);
    }

    Game_System.prototype.getEventSensorStatus = function(eventId) {
        let event;
        if(eventId && isFinite(eventId) && $gameMap.event(eventId)) {
            event = $gameMap.event(eventId);
            return event.getSensorStatus();
        } else {
            return null;
        }
    };

    Game_System.prototype.getSwitchStatuses = function() {
        return this._switchStatuses;
    };

    Game_System.prototype.setSwitchStatuses = function(sw, eventId) {
        if(this._switchStatuses[sw]) {
            if(this._switchStatuses[sw] instanceof Array && this._switchStatuses[sw].length > 0) {
                if(!this._switchStatuses[sw].contains(eventId)) {
                    this._switchStatuses[sw].push(eventId);
                }
            } else {
                this._switchStatuses[sw] = [eventId];
            }
        } else {
            this._switchStatuses[sw] = [eventId];
        }
    };

    Game_System.prototype.isSwitchStatuses = function(sw, eventId) {
        if(!sw || !isFinite(sw)) {
            return false;
        }
        if(this._switchStatuses[sw]) {
            if(eventId == null) {
                return true;
            } else {
                if(this._switchStatuses[sw] instanceof Array && this._switchStatuses[sw].length > 0) {
                    if(this._switchStatuses[sw].contains(eventId)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    Game_System.prototype.removeSwitchStatuses = function(sw, eventId) {
        if(this._switchStatuses[sw]) {
            if(!eventId) {
                delete this._switchStatuses[sw];
            } else {
                if(this._switchStatuses[sw] instanceof Array && this._switchStatuses[sw].length > 0) {
                    if(this._switchStatuses[sw].contains(eventId)) {
                        this._switchStatuses[sw].some(function(v, i){
                            if (v == eventId) {
                                this._switchStatuses[sw].splice(i, 1);
                            }
                        }, this);
                    }
                }
                if(this._switchStatuses[sw].length == 0) {
                    delete this._switchStatuses[sw];
                }
            }
        }
    };

    Game_System.prototype.isFoundPlayer = function() {
        if(!this.isSensorStart()) return false;

        return $gameMap.events().some(function(event) {
            // return event.getSensorStatus() == 1 && event.getFoundStatus() == 1;
            return event.isSensorFound();
        });
    };

    Game_System.prototype.allForceLost = function() {
        if(!this.isSensorStart()) return false;

        $gameMap.events().filter(function(event) {
            return event.getFoundStatus() == 1;
        }).forEach(function(event) {
            event.setForceLost(1);
        });
    };

    Game_System.prototype.forceLost = function(eventId) {
        let event;

        if(!this.isSensorStart()) return false;
        if(!eventId || !isFinite(eventId) || !$gameMap.event(eventId)) {
            return ;
        }

        event = $gameMap.event(eventId);
        if(event.getFoundStatus() != 1) return false;

        event.setForceLost(1);
    };

    Game_System.prototype.allForceFound = function() {
        if(!this.isSensorStart()) return false;

        $gameMap.events().filter(function(event) {
            return event.getFoundStatus() == 0;
        }).forEach(function(event) {
            event.setForceFound(1);
        });
    };

    Game_System.prototype.forceFound = function(eventId) {
        let event;

        if(!this.isSensorStart()) return false;
        if(!eventId || !isFinite(eventId) || !$gameMap.event(eventId)) {
            return ;
        }

        event = $gameMap.event(eventId);
        if(event.getFoundStatus() != 0) return false;

        event.setForceFound(1);
    };


    //=========================================================================
    // Game_Player
    //  場所移動を行った際に追跡状態をリセットする処理を定義します。
    //
    //=========================================================================
    const _Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
        if(DefLocationReset[0] && !$gameParty.inBattle() && !$gameMessage.isBusy()) {
            $gameSystem.resetSensor();
        }
        _Game_Player_reserveTransfer.apply(this, arguments);

    };


    //=========================================================================
    // Game_CharacterBase
    //  プレイヤー探索制御用メンバーを追加定義し、
    //  センサー状態を変更する処理を再定義します。
    //
    //  センサー状態：
    //   -2 = センサー初期化前
    //   -1 = 探索一時停止
    //    0 = 探索停止
    //    1 = 探索中
    //  視界描画状態：
    //    0 = 描画停止
    //    1 = 描画更新
    //    2 = 描画新規
    //  発見状態：
    //    0 = 未発見
    //    1 = 発見済み
    //  強制ロスト：
    //    0 = 無効
    //    1 = 設定反映ロスト
    //    2 = 即ロスト
    //=========================================================================
    const _Game_CharacterBaseInitMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBaseInitMembers.call(this);

        let foundBallon, foundCommon, foundSe, foundDelay,
            lostBallon, lostCommon, lostSe, lostDelay, lostInvalid;
        foundBallon = DefFoundBallon[0];
        foundCommon = DefFoundCommon[0];
        foundSe = DefFoundSe;
        foundDelay = DefFoundDelay[0];
        lostBallon = DefLostBallon[0];
        lostCommon = DefLostCommon[0];
        lostSe = DefLostSe;
        lostDelay = DefLostDelay[0];
        lostInvalid = DefLostInvalid[0];

        this._foundStatus = 0;
        this._sensorStatus = -2;
        this._sensorType = null;
        this._sensorRange = 0;
        this._sensorRangeC = 0;
        this._bothSensorR = false;
        this._bothSensorL = false;
        this._viewRangeStatus = 0;
        this._coordinate = [];
        this._sensorSwitch = null;
        this._lostSensorSwitch = null;
        this._sideSensor = -1;
        this._rangeVisible = -1;
        this._terrainDecision = -1;
        this._directionFixed = -1;
        this._eventDecision = -1;
        this._regionDecision = "";
        this._createRange = false;
        this._foundBallon = foundBallon;
        this._foundCommon = foundCommon;
        this._foundSe = foundSe;
        this._foundMaxDelay = foundDelay;
        this._foundDelay = this._foundMaxDelay;
        this._lostBallon = lostBallon;
        this._lostCommon = lostCommon;
        this._lostSe = lostSe;
        this._lostMaxDelay = lostDelay;
        this._lostDelay = this._lostMaxDelay;
        this._lostInvalid = lostInvalid;
        this._activeMode = 0;
        this._forceLost = 0;
        this._forceFound = 0;
    };

    const _Game_CharacterBaseMoveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        let status = (this.direction() == d) ? 1 : 2;
        _Game_CharacterBaseMoveStraight.call(this,d);
        if (this.isMovementSucceeded() && d && this.getSensorStatus() == 1) {
            this.setViewRangeStatus(status);
        }
    };

    const _Game_CharacterBaseMoveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
    Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
        _Game_CharacterBaseMoveDiagonally.call(this,horz, vert);
        if (this.isMovementSucceeded() && this.getSensorStatus() == 1) {
            this.setViewRangeStatus(2);
        }
    };

    const _Game_CharacterBaseSetDirection = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(d) {
        let status = (this.direction() == d) ? 1 : 2;
        if (!this.isDirectionFixed() && d && this.getSensorStatus() == 1) {
            this.setViewRangeStatus(status);
        }
        _Game_CharacterBaseSetDirection.call(this,d);
    }
    Game_CharacterBase.prototype.startViewRange = function() {
        this.setViewRangeStatus(1);
    };

    Game_CharacterBase.prototype.setSensorStatus = function(sensorStatus) {
        this._sensorStatus = sensorStatus;
    };

    Game_CharacterBase.prototype.getSensorStatus = function() {
        return this._sensorStatus;
    };

    Game_CharacterBase.prototype.setFoundStatus = function(foundStatus) {
        this._foundStatus = foundStatus;
    };

    Game_CharacterBase.prototype.getFoundStatus = function() {
        return this._foundStatus;
    };

    Game_CharacterBase.prototype.setSensorType = function(sensorType) {
        this._sensorType = sensorType;
    };

    Game_CharacterBase.prototype.getSensorType = function() {
        return this._sensorType;
    };

    Game_CharacterBase.prototype.setSensorRange = function(sensorRange) {
        this._sensorRange = sensorRange;
    };

    Game_CharacterBase.prototype.getSensorRange = function() {
        let value;
        value = parseInt(ConvVb(this._sensorRange), 10);

        return this.getSensorType() == "df" ? value % 2 ? 2 : value : value;
    };

    Game_CharacterBase.prototype.setSensorRangeC = function(sensorRangeC) {
        this._sensorRangeC = sensorRangeC;
    };

    Game_CharacterBase.prototype.getSensorRangeC = function() {
        let value;
        value = parseInt(ConvVb(this._sensorRangeC), 10);

        return this.getSensorType() == "df" ? value % 2 ? 2 : value : value;
    };

    Game_CharacterBase.prototype.setViewRangeStatus = function(viewRangeStatus) {
        this._viewRangeStatus = viewRangeStatus;
    };

    Game_CharacterBase.prototype.getViewRangeStatus = function() {
        return this._viewRangeStatus;
    };

    Game_CharacterBase.prototype.setCoordinate = function(x, y, status) {
        this._coordinate.push([x, y, status, -1]);
    };

    Game_CharacterBase.prototype.getCoordinate = function() {
        return this._coordinate;
    };

    Game_CharacterBase.prototype.clearCoordinate = function() {
        this._coordinate = [];
    };

    Game_CharacterBase.prototype.setBothSensorRight = function(bothSensor) {
        this._bothSensorR = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensorRight = function() {
        return this._bothSensorR;
    };

    Game_CharacterBase.prototype.setBothSensorLeft = function(bothSensor) {
        this._bothSensorL = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensorLeft = function() {
        return this._bothSensorL;
    };

    Game_CharacterBase.prototype.setBothSensor = function(bothSensor) {
        this._sideSensor = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensor = function() {
        return parseInt(ConvSw(this._sideSensor, this), 10);
    };

    Game_CharacterBase.prototype.setSensorSwitch = function(sensorSwitch) {
        if(isFinite(sensorSwitch)) {
            this._sensorSwitch = parseInt(sensorSwitch, 10);
        } else if(sensorSwitch.toLowerCase().match(/[a-d]/)) {
            this._sensorSwitch = sensorSwitch.toUpperCase();
        }
    };

    Game_CharacterBase.prototype.getSensorSwitch = function() {
        return this._sensorSwitch;
    };

    Game_CharacterBase.prototype.setLostSensorSwitch = function(sensorSwitch) {
        if(isFinite(sensorSwitch)) {
            this._lostSensorSwitch = parseInt(sensorSwitch, 10);
        } else if(sensorSwitch.toLowerCase().match(/[a-d]/)) {
            this._lostSensorSwitch = sensorSwitch.toUpperCase();
        }
    };

    Game_CharacterBase.prototype.getLostSensorSwitch = function() {
        return this._lostSensorSwitch;
    };

    Game_CharacterBase.prototype.setRangeVisible = function(rangeVisible) {
        this._rangeVisible = rangeVisible;
    };

    Game_CharacterBase.prototype.getRangeVisible = function() {
        return parseInt(ConvSw(this._rangeVisible, this), 10);
    };

    Game_CharacterBase.prototype.setTerrainDecision = function(terrainDecision) {
        this._terrainDecision = terrainDecision;
    };

    Game_CharacterBase.prototype.getTerrainDecision = function() {
        return parseInt(ConvSw(this._terrainDecision, this), 10);
    };

    Game_CharacterBase.prototype.setEventDecision = function(eventDecision) {
        this._eventDecision = eventDecision;
    };

    Game_CharacterBase.prototype.getEventDecision = function() {
        return parseInt(ConvSw(this._eventDecision, this), 10);
    };

    Game_CharacterBase.prototype.setRegionDecision = function(regionDecision) {
        this._regionDecision = String(regionDecision);
    };

    Game_CharacterBase.prototype.getRegionDecision = function() {
        return parseInt(ConvVb(this._regionDecision), 10);
    };

    Game_CharacterBase.prototype.setDirectionFixed = function(directionFixed) {
        let direction;

        switch(directionFixed) {
            case "u":
                direction = DIR_UP;
                break;
            case "r":
                direction = DIR_RIGHT;
                break;
            case "l":
                direction = DIR_LEFT;
                break;
            case "d":
                direction = DIR_DOWN;
                break;
            default:
                direction = -1;
        }
        this._directionFixed = parseInt(direction, 10);
    };

    Game_CharacterBase.prototype.getDirectionFixed = function() {
        return this._directionFixed;
    };

    Game_CharacterBase.prototype.isMapPassableEx = function(x, y, d) {
        let x2, y2, d2, passableFlag, events, eventDecision, regionDecisions;
        x2 = $gameMap.roundXWithDirection(x, d);
        y2 = $gameMap.roundYWithDirection(y, d);
        d2 = this.reverseDir(d);
        eventDecision = CEC(DefEventDecision);
        regionDecisions = getRegionIds(DefRegionDecisions, this.getRegionDecision());
        passableFlag = true;


        if($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) {
            if(this.getEventDecision() == 1
                    || (this.getEventDecision() == -1 && eventDecision)) {
                events = $gameMap.eventsXyNt(x2, y2);
                passableFlag = !events.some(function(event) {
                    return event.isNormalPriority();
                });
            }
            if(regionDecisions.length > 0 && passableFlag == true) {
                passableFlag = !regionDecisions.contains(""+$gameMap.regionId(x2, y2));
            }
        } else {
            passableFlag = false;
        }

        return passableFlag;
    };

    Game_CharacterBase.prototype.isCreateRange = function() {
        return this._createRange;
    };

    Game_CharacterBase.prototype.enableCreateRange = function() {
        this._createRange = true;
    };

    Game_CharacterBase.prototype.setFoundBallon = function(ballon) {
        this._foundBallon = ballon;
    };

    Game_CharacterBase.prototype.getFoundBallon = function() {
        return parseInt(ConvVb(this._foundBallon), 10);
    };

    Game_CharacterBase.prototype.setFoundCommon = function(common) {
        this._foundCommon = common;
    };

    Game_CharacterBase.prototype.getFoundCommon = function() {
        return parseInt(ConvVb(this._foundCommon), 10);
    };

    Game_CharacterBase.prototype.setFoundDelay = function(delay) {
        this._foundDelay = parseInt(ConvVb(delay), 10);
    };

    Game_CharacterBase.prototype.getFoundDelay = function() {
        return this._foundDelay;
    };

    Game_CharacterBase.prototype.resetFoundDelay = function() {
        this._foundDelay = this.getFoundMaxDelay();
    };

    Game_CharacterBase.prototype.setFoundMaxDelay = function(delay) {
        this._foundMaxDelay = delay;
    };

    Game_CharacterBase.prototype.getFoundMaxDelay = function() {
        return parseInt(ConvVb(this._foundMaxDelay), 10);
    };

    Game_CharacterBase.prototype.setLostBallon = function(ballon) {
        this._lostBallon = ballon;
    };

    Game_CharacterBase.prototype.getLostBallon = function() {
        return parseInt(ConvVb(this._lostBallon), 10);
    };

    Game_CharacterBase.prototype.setLostCommon = function(common) {
        this._lostCommon = common;
    };

    Game_CharacterBase.prototype.getLostCommon = function() {
        return parseInt(ConvVb(this._lostCommon), 10);
    };

    Game_CharacterBase.prototype.setLostDelay = function(delay) {
        this._lostDelay = parseInt(ConvVb(delay), 10);
    };

    Game_CharacterBase.prototype.getLostDelay = function() {
        return this._lostDelay;
    };

    Game_CharacterBase.prototype.resetLostDelay = function() {
        this._lostDelay = this.getLostMaxDelay();
    };

    Game_CharacterBase.prototype.setLostMaxDelay = function(delay) {
        this._lostMaxDelay = delay;
    };

    Game_CharacterBase.prototype.getLostMaxDelay = function() {
        return parseInt(ConvVb(this._lostMaxDelay), 10);
    };

    Game_CharacterBase.prototype.setLostInvalid = function(invalid) {
        this._lostInvalid = invalid;
    }

    Game_CharacterBase.prototype.getLostInvalid = function() {
        return this._lostInvalid;
    }

    Game_CharacterBase.prototype.setActiveMode = function(mode) {
        this._activeMode = mode;
    };

    Game_CharacterBase.prototype.getActiveMode = function() {
        return parseInt(ConvSw(this._activeMode, this), 10);;
    };

    Game_CharacterBase.prototype.setForceLost = function(forceLost) {
        this._forceLost = forceLost;
    };

    Game_CharacterBase.prototype.getForceLost = function() {
        return this._forceLost;
    };

    Game_CharacterBase.prototype.setForceFound = function(forceFound) {
        this._forceFound = forceFound;
    };

    Game_CharacterBase.prototype.getForceFound = function() {
        return this._forceFound;
    };

    Game_CharacterBase.prototype.isSensorFound = function() {
        return this.getSensorStatus() == 1 && this.getFoundStatus() == 1;
    };


    //=========================================================================
    // Game_Map
    //  探索開始処理の自動実行を定義します。
    //=========================================================================
    if(DefAutoSensor[0]) {
        const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
        Game_Map.prototype.setupEvents = function() {
            _Game_Map_setupEvents.call(this);
            $gameSystem.startSensor();
        };
    }


    //=========================================================================
    // Game_Event
    //  プレイヤーとの距離を測り
    //  指定範囲内にプレイヤーがいる場合に指定されたスイッチをONにします。
    //=========================================================================
    const _Game_EventSetupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_EventSetupPageSettings.call(this);
        if(this.getSensorStatus() == -2) {
            this.setupSensor();
        }
        // if($gameSystem.isFoundPlayer() == this.eventId()) {
        //     this.turnTowardPlayer();
        // }
    };

    Game_Event.prototype.setupSensor = function() {
        let event, pattern, match, note, cnt, i, n, m,
            options, op, value;
        event = this.event();
        pattern = /<(.?)(?:psensor)(l|f|s|d)?(?:\:)(\\v\[\d+\]|\d+)([ 0-9a-z\[\]\\]*)?>/i

        if(event.note) {
            note = event.note.toLowerCase();
            note = note.split(/ (?=<)/);
            cnt = note.length;

            for(i = 0;i < cnt;i++) {
                n = note[i].trim();

                if(n.match(pattern)) {
                    match = n.match(pattern);
                    if(match[1] && match[1] == "!") { // 探索一時無効
                        this.setSensorStatus(-1);
                    }
                    switch(match[2]) { // 探索種別
                        case "l":
                        case "f":
                        case "s":
                        case "d":
                            this.setSensorType(match[2]);
                            break;
                        default:
                            continue;
                            break;
                    }
                    if(match[3]) { // 探索対象マス数
                        value = String(match[3]);
                        value = value.replace(/\\/g, '\x1b');
                        value = value.replace(/\x1b\x1b/g, '\\');
                        if(this.getSensorType() == "df" && isFinite(value) && (value <= 1 || (value % 2))) {
                            value = 2;
                        }
                        this.setSensorRange(value);
                        this.setSensorRangeC(value);
                    }
                    if(match[4]) { // オプション
                        options = match[4].trim().split(" ");
                        options.forEach(function(op){
                            op = op.replace(/\\/g, '\x1b');
                            op = op.replace(/\x1b\x1b/g, '\\');
                            if(op.match(/^sw([a-d]|\d+)$/)) { // スイッチ指定
                                m = op.match(/^sw([a-d]|\d+)$/);
                                this.setSensorSwitch(m[1]);
                            } else if(op.match(/^lsw([a-d]|\d+)$/)) { // ロストスイッチ指定
                                m = op.match(/^lsw([a-d]|\d+)$/);
                                this.setLostSensorSwitch(m[1]);
                            } else if(op.match(/^bo([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 両隣探索指定
                                m = op.match(/^bo([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                                this.setBothSensor(m[1]);
                            } else if(op.match(/^rv([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 描画指定
                                m = op.match(/^rv([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                                this.setRangeVisible(m[1]);
                            } else if(op.match(/^td([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 地形考慮指定
                                m = op.match(/^td([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                                this.setTerrainDecision(m[1]);
                            } else if(op.match(/^di([urld])$/)) { // 探索方向固定
                                m = op.match(/^di([urld])$/);
                                this.setDirectionFixed(m[1]);
                            } else if(op.match(/^ev([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // イベント考慮指定
                                m = op.match(/^ev([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                                this.setEventDecision(m[1]);
                            } else if(op.match(/^rg(\d+|\x1bv\[(\d+)\])$/)) { // リージョン考慮指定
                                m = op.match(/^rg(\d+|\x1bv\[(\d+)\])$/);
                                this.setRegionDecision(m[1]);
                            } else if(op.match(/^fb(\d+|\x1bv\[(\d+)\])$/)) { // 発見フキダシ指定
                                m = op.match(/^fb(\d+|\x1bv\[(\d+)\])$/);
                                this.setFoundBallon(m[1]);
                            } else if(op.match(/^fc(\d+|\x1bv\[(\d+)\])$/)) { // 発見コモン指定
                                m = op.match(/^fc(\d+|\x1bv\[(\d+)\])$/);
                                this.setFoundCommon(m[1]);
                            } else if(op.match(/^fd(\d+|\x1bv\[(\d+)\])$/)) { // 発見遅延指定
                                m = op.match(/^fd(\d+|\x1bv\[(\d+)\])$/);
                                this.setFoundMaxDelay(m[1]);
                                this.setFoundDelay(m[1]);
                            } else if(op.match(/^lb(\d+|\x1bv\[(\d+)\])$/)) { // ロストフキダシ指定
                                m = op.match(/^lb(\d+|\x1bv\[(\d+)\])$/);
                                this.setLostBallon(m[1]);
                            } else if(op.match(/^lc(\d+|\x1bv\[(\d+)\])$/)) { // ロストコモン指定
                                m = op.match(/^lc(\d+|\x1bv\[(\d+)\])$/);
                                this.setLostCommon(m[1]);
                            } else if(op.match(/^ld(\d+|\x1bv\[(\d+)\])$/)) { // ロスト遅延指定
                                m = op.match(/^ld(\d+|\x1bv\[(\d+)\])$/);
                                this.setLostMaxDelay(m[1]);
                                this.setLostDelay(m[1]);
                            } else if(op.match(/^li$/)) { // ロスト状態移行無効
                                this.setLostInvalid(true);
                            } else if(op.match(/^am([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 探索続行指定
                                m = op.match(/^am([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                                this.setActiveMode(m[1]);
                            }
                        }, this);
                    }
                }
            }
        }
    };

    const _Game_EventUpdate = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_EventUpdate.call(this);
        // if(!this._erased && $gameSystem.isSensorStart()) {
        if(!this.isInvisible() && $gameSystem.isSensorStart()) {
            this.sensorUpdate();
        }
    };

    Game_Event.prototype.sensorUpdate = function() {
        // 探索中のイベントであること
        // マップイベント実行中でないこと or 探索続行オプションが付与されている
        if(this.getSensorStatus() == 1 && (!this.isStarting() || this.getActiveMode() == 1)){
            // プレイヤーを発見して、かつ強制ロストが無効
            if(this.isFoundPlayer() && this.getForceLost() == 0) {
                if(this.getFoundStatus() == 0) {
                    this.foundPlayer();
                }
                if(this.getLostDelay() < this.getLostMaxDelay()) this.resetLostDelay();
            // 強制ロストが有効
            } else if(this.getForceLost() > 0) {
                this.lostPlayer(true);
            // プレイヤー発見状態
            } else if(this.getFoundStatus() == 1) {
                this.lostPlayer();
                if(this.getFoundDelay() < this.getFoundMaxDelay()) {
                    this.resetFoundDelay();
                    this.setForceLost(0);
                }
            // 強制発見が有効
            } else if(this.getForceFound() > 0) {
                this.foundPlayer(true);
            } else {
                if(this.getFoundDelay() < this.getFoundMaxDelay()) {
                    this.resetFoundDelay();
                    this.setForceLost(0);
                }
            }
        }

        // if(this.getSensorStatus() == 1 && (!this.isStarting() || this.getActiveMode() == 1)){
        //     // プレイヤーを発見して、かつ強制ロストが無効
        //     if(this.isFoundPlayer() && this.getForceLost() == 0) {
        //         if(this.getFoundStatus() == 0 && !this.getFoundUnlimited()) {
        //             this.foundPlayer();
        //         }
        //         if(this.getLostDelay() < this.getLostMaxDelay()) this.resetLostDelay();
        //     // 強制ロストが有効
        //     } else if(this.getForceLost() > 0) {
        //         this.lostPlayer(true);
        //     // プレイヤー発見状態
        //     } else if(this.getFoundStatus() == 1 && !this.getLostUnlimited()) {
        //         this.lostPlayer();
        //         if(this.getFoundDelay() < this.getFoundMaxDelay()) {
        //             this.resetFoundDelay();
        //             this.setForceLost(0);
        //         }
        //     // 強制発見が有効
        //     } else if(this.getForceFound() > 0) {
        //         this.foundPlayer(true);
        //     } else {
        //         if(this.getFoundDelay() < this.getFoundMaxDelay() && !this.getLostUnlimited()) {
        //             this.resetFoundDelay();
        //             this.setForceLost(0);
        //         }
        //     }
        // }


        // // 探索中のイベントであること
        // if(this.getSensorStatus() == 1){
        //     // マップイベント実行中でないこと or 探索続行オプションが付与されている
        //     if(!this.isStarting() || this.getActiveMode() == 1) {
        //         if(this.isFoundPlayer()) {
        //             if(this.getFoundStatus() == 0) {
        //                 this.foundPlayer();
        //             }
        //             if(this.getLostDelay() < this.getLostMaxDelay()) this.resetLostDelay();
        //         } else if(this.getFoundStatus() == 1) {
        //             this.lostPlayer();
        //             if(this.getFoundDelay() < this.getFoundMaxDelay()) this.resetFoundDelay();
        //         } else {
        //             if(this.getFoundDelay() < this.getFoundMaxDelay()) this.resetFoundDelay();
        //         }
        //     }
        // }
    };

    Game_Event.prototype.foundPlayer = function(forceFound = false) {
        let mapId, eventId, sw, key, sensorSwitch, delay, lostSensorSwitch;
        delay = this.getFoundDelay();

        if(delay <= 0 || forceFound) {
            sensorSwitch = DefSensorSwitch[0];
            lostSensorSwitch = DefLostSensorSwitch[0];
            mapId = $gameMap.mapId();
            eventId = this.eventId();

            this.setForceFound(0);
            this.setFoundStatus(1);
            this.resetFoundDelay();
            this.resetLostDelay();

            // 発見後スイッチON
            sw = (this.getSensorSwitch() != null)? this.getSensorSwitch() : sensorSwitch;
            if(isFinite(sw)) {
                if(!$gameSwitches.value(sw)) {
                    $gameSwitches.setValue(sw, true);
                }
                // $gameSystem.setSwitchStatuses(sw, eventId);
            } else if(sw.match(/[a-dA-D]/)) {
                key = [mapId, eventId, sw.toUpperCase()];
                if(!$gameSelfSwitches.value(key)) {
                    $gameSelfSwitches.setValue(key, true);
                }
            }

            // ロスト後スイッチOFF
            sw = (this.getLostSensorSwitch() != null)? this.getLostSensorSwitch() : lostSensorSwitch;
            if(sw != "") {
                if(isFinite(sw)) {
                    if($gameSwitches.value(sw)) {
                        $gameSwitches.setValue(sw, false);
                    }
                } else if(sw.match(/[a-dA-D]/)) {
                    key = [mapId, eventId, sw.toUpperCase()];
                    if($gameSelfSwitches.value(key)) {
                        $gameSelfSwitches.setValue(key, false);
                    }
                }
            }

            if (this._foundSe.name != "") {
                AudioManager.playSe(this._foundSe);
            }
            if (this._foundBallon > 0) {
                this.requestBalloon(this._foundBallon);
            }
            if (this._foundCommon > 0) {
                $gameTemp.reserveCommonEvent(this._foundCommon);
                if($gameMap._interpreter) {
                    $gameMap._interpreter.setupReservedCommonEventEx(this.eventId());
                }
            }
        } else {
            this.setFoundDelay(--delay);
        }
    };

    Game_Event.prototype.lostPlayer = function(forceLost = false) {
        let mapId, eventId, sw, key, sensorSwitch, delay, lostSensorSwitch;
        delay = this.getLostDelay();

        if((delay <= 0 && !this.getLostInvalid()) || forceLost) {
            sensorSwitch = DefSensorSwitch[0];
            lostSensorSwitch = DefLostSensorSwitch[0];
            mapId = $gameMap.mapId();
            eventId = this.eventId();

            this.setForceLost(0);
            this.setFoundStatus(0);
            this.resetLostDelay();
            this.resetFoundDelay();

            // 発見後スイッチOFF
            sw = (this.getSensorSwitch() != null)? this.getSensorSwitch() : sensorSwitch;
            if(isFinite(sw)) {
                // if($gameSwitches.value(sw) && !$gameSystem.isSwitchStatuses(sw)) {
                if($gameSwitches.value(sw)) {
                    $gameSwitches.setValue(sw, false);
                }
                // $gameSystem.removeSwitchStatuses(sw, eventId);
            } else if(sw.match(/[a-dA-D]/)) {
                key = [mapId, eventId, sw.toUpperCase()];
                if($gameSelfSwitches.value(key)) {
                    $gameSelfSwitches.setValue(key, false);
                }
            }

            // ロスト後スイッチON
            sw = (this.getLostSensorSwitch() != null)? this.getLostSensorSwitch() : lostSensorSwitch;
            if(sw != "") {
                if(isFinite(sw)) {
                    if(!$gameSwitches.value(sw)) {
                        $gameSwitches.setValue(sw, true);
                    }
                } else if(sw.match(/[a-dA-D]/)) {
                    key = [mapId, eventId, sw.toUpperCase()];
                    if(!$gameSelfSwitches.value(key)) {
                        $gameSelfSwitches.setValue(key, true);
                    }
                }
            }

            if (this._lostSe.name != "") {
                AudioManager.playSe(this._lostSe);
            }
            if (this._lostBallon > 0) {
                this.requestBalloon(this._lostBallon);
            }
            if (this._lostCommon > 0) {
                $gameTemp.reserveCommonEvent(this._lostCommon);
                if($gameMap._interpreter) {
                    $gameMap._interpreter.setupReservedCommonEventEx(this.eventId());
                }
            }
        } else if(!this.getLostInvalid()){
            this.setLostDelay(--delay);
        }
    };

    Game_Event.prototype.isFoundPlayer = function() {
        let result = false;
        switch(this.getSensorType()) {
            case "l": // 直線の探索
                result = this.sensorLine();
                break;
            case "f": // 扇範囲の探索
                result = this.sensorFan();
                break;
            case "s": // 四角範囲の探索
                result = this.sensorSquare();
                break;
            case "d": // 菱形範囲の探索
                result = this.sensorDiamond();
                break;
        }
        // if(result) {
        //     $gameSystem.setFoundPlayer(this.eventId());
        // }
        return result;
    };

    // 直線の探索
    Game_Event.prototype.sensorLine = function() {
        let sensorRange, sensorRangeC, strDir, diagoDir, dir, dirFixed, ex, ey, i,
        coordinates, px, py, cnt, realX, realY;
        sensorRange = this.getSensorRange();
        dirFixed = this.getDirectionFixed();
        dir = (dirFixed == -1)? this.direction() : dirFixed;
        px = $gamePlayer._realX;
        py = $gamePlayer._realY;
        ex = this._realX;
        ey = this._realY;
        realX = DefRealRangeX[0];
        realY = DefRealRangeY[0];

        // currentRange初期化
        //this.setSensorRangeC(sensorRange);
        sensorRangeC = sensorRange;

        // coordinate初期化
        this.clearCoordinate();

        switch(dir) {
            case 8:// 上向き(y<0)
                strDir = DIR_UP;
                diagoDir = DIR_RIGHT;

                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, 0, -1, sensorRange);

                // 隣接マス探索
                if(this.isSideSearch(diagoDir, this.reverseDir(diagoDir), -1, 0)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if(cnt == 1) {
                    i = 0;
                    if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                    } else {
                        if(px >= ex + coordinates[i][0] - realX
                                && px <= ex + coordinates[i][0] + realX
                                && py >= ey - Math.abs(coordinates[i][1]) - realY
                                && py <= ey + Math.abs(coordinates[i][0])) {
                            return true;
                        }
                    }
                }

                break;
            case 6:// 右向き(x>0)
                strDir = DIR_RIGHT;
                diagoDir = DIR_DOWN;

                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, 1, 0, sensorRange);

                // 隣接マス探索
                if(this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 0, -1)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if(cnt == 1) {
                    i = 0;
                    if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                    } else {
                        if(py >= ey + coordinates[i][1] - realY
                                && py <= ey + coordinates[i][1] + realY
                                && px >= ex + Math.abs(coordinates[i][1]) - realX
                                && px <= ex + coordinates[i][0] + realX) {
                            return true;
                        }
                    }
                }

                break;
            case 4:// 左向き(x<0)
                strDir = DIR_LEFT;
                diagoDir = DIR_UP;

                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, -1, 0, sensorRange);

                // 隣接マス探索
                if(this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 0, 1)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if(cnt == 1) {
                    i = 0;
                    if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                    } else {
                        if(py <= ey + coordinates[i][1] + realY
                                && py >= ey + coordinates[i][1] - realY
                                && px <= ex + Math.abs(coordinates[i][1]) + realX
                                && px >= ex + coordinates[i][0] - realX) {
                            return true;
                        }
                    }
                }

                break;
            case 2:// 下向き(y>0)
                strDir = DIR_DOWN;
                diagoDir = DIR_LEFT;

                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, 0, 1, sensorRange);

                // 隣接マス探索
                if(this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 1, 0)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if(cnt == 1) {
                    i = 0;
                    if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                    } else {
                        if(px >= ex + coordinates[i][0] - realX
                                && px <= ex + coordinates[i][0] + realX
                                && py >= ey + Math.abs(coordinates[i][0])
                                && py <= ey + coordinates[i][1] + realY) {
                            return true;
                        }
                    }
                }

                break;
        }

        return false;
    };

    // 扇範囲の探索
    Game_Event.prototype.sensorFan = function() {
        let sensorRange, sensorRangeC, dir, dirFixed, sx, sy, ex, ey, px, py,
            noPass, noPassTemp, i, j, coordinates, sign, strDir, diagoDir, cnt,
            terrainDecision, realX, realY, rex, rey;
        sensorRange = this.getSensorRange();
        dirFixed = this.getDirectionFixed();
        dir = (dirFixed == -1)? this.direction() : dirFixed;
        px = $gamePlayer._realX;
        py = $gamePlayer._realY;
        sx = this.deltaXFrom($gamePlayer.x);
        sy = this.deltaYFrom($gamePlayer.y);
        ex = this.x;
        ey = this.y;
        rex = this._realX;
        rey = this._realY;
        noPass = 0;
        terrainDecision = CEC(DefTerrainDecision);
        realX = DefRealRangeX[0];
        realY = DefRealRangeY[0];

        // currentRange初期化
        this.setSensorRangeC(sensorRange);
        sensorRangeC = sensorRange;

        // coordinate初期化
        this.clearCoordinate();

        switch(dir) {
            case DIR_UP:// 上向き(y<0)
                sign = 1;
                strDir = DIR_UP;
                diagoDir = DIR_RIGHT;

                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, 0, -1, sensorRange);
                if(noPass != sensorRange) noPass++;

                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;

                // 斜め直線上の範囲確定
                for(i = 1;i < 3; i++) {
                    for(j = 0; j <= sensorRange; j++) {
                        if(j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j * sign, -j, 0, -1, noPassTemp);
                            if(j != noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if(this.getTerrainDecision() == 1
                                || (this.getTerrainDecision() == -1 && terrainDecision)) {
                            if(!this.isMapPassableEx(ex + j * sign, ey - j, diagoDir)
                                    || !this.isMapPassableEx(ex + j * sign, ey - j, strDir)
                                    || !this.isMapPassableEx(ex + j * sign, ey - j - 1, diagoDir)
                                    || !this.isMapPassableEx(ex + (j + 1) * sign, ey - j, strDir)) {
                                break;
                            }
                        }
                    }

                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);

                    if(i == 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }

                // 隣接マス探索
                if(this.isSideSearch(this.reverseDir(diagoDir), diagoDir, -1, 0)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for(i = 0; i < cnt; i++) {
                    if(coordinates[i][2] == "Add") {
                        continue;
                    }else if(coordinates[i][2] == "C") {
                        continue;
                    }else if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                        continue;
                    }
                    if(px <= rex + coordinates[i][0] + realX
                            && px >= rex + coordinates[i][0] - realX
                            && py <= rey - Math.abs(coordinates[i][0]) + realY
                            && py >= rey + coordinates[i][1] - realY) {
                        return true;
                    }
                }

                break;
            case DIR_RIGHT:// 右向き(x>0)
                sign = 1;
                strDir = DIR_RIGHT;
                diagoDir = DIR_DOWN;

                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, 1, 0, sensorRange);
                if(noPass != sensorRange) noPass++;

                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;

                // 斜め直線上の範囲確定
                for(i = 1;i < 3; i++) {
                    for(j = 0; j <= sensorRange; j++) {
                        if(j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j, j * sign, 1, 0, noPassTemp);
                            if(j != noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if(this.getTerrainDecision() == 1
                                || (this.getTerrainDecision() == -1 && terrainDecision)) {
                            if(!this.isMapPassableEx(ex + j, ey + j * sign, diagoDir)
                                    || !this.isMapPassableEx(ex + j, ey + j * sign, strDir)
                                    || !this.isMapPassableEx(ex + j + 1, ey + j * sign, diagoDir)
                                    || !this.isMapPassableEx(ex + j, ey + (j + 1) * sign, strDir)) {
                                break;
                            }
                        }
                    }

                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);

                    if(i == 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }

                // 隣接マス探索
                if(this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 0, -1)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for(i = 0; i < cnt; i++) {
                    if(coordinates[i][2] == "Add") {
                        continue;
                    }else if(coordinates[i][2] == "C") {
                        continue;
                    }else if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                        continue;
                    }
                    if(py >= rey + coordinates[i][1] - realY
                            && py <= rey + coordinates[i][1] + realY
                            && px >= rex + Math.abs(coordinates[i][1]) - realX
                            && px <= rex + coordinates[i][0] + realX) {
                        return true;
                    }
                }

                break;
            case DIR_LEFT:// 左向き(x<0)
                sign = -1;
                strDir = DIR_LEFT;
                diagoDir = DIR_UP;

                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, -1, 0, sensorRange);
                if(noPass != sensorRange) noPass++;

                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;

                // 斜め直線上の範囲確定
                for(i = 1;i < 3; i++) {
                    for(j = 0; j <= sensorRange; j++) {
                        if(j > 0) {
                            noPassTemp = this.rangeSearch(strDir, -j, j * sign, -1, 0, noPassTemp);
                            if(j != noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if(this.getTerrainDecision() == 1
                                || (this.getTerrainDecision() == -1 && terrainDecision)) {
                            if(!this.isMapPassableEx(ex - j, ey + j * sign, diagoDir)
                                    || !this.isMapPassableEx(ex - j, ey + j * sign, strDir)
                                    || !this.isMapPassableEx(ex - j - 1, ey + j * sign, diagoDir)
                                    || !this.isMapPassableEx(ex - j, ey + (j + 1) * sign, strDir)) {
                                break;
                            }
                        }
                    }

                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);

                    if(i == 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }

                // 隣接マス探索
                if(this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 0, 1)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for(i = 0; i < cnt; i++) {
                    if(coordinates[i][2] == "Add") {
                        continue;
                    }else if(coordinates[i][2] == "C") {
                        continue;
                    }else if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                        continue;
                    }
                    if(py <= rey + coordinates[i][1] + realY
                            && py >= rey + coordinates[i][1] - realY
                            && px <= rex - Math.abs(coordinates[i][1]) + realX
                            && px >= rex + coordinates[i][0] - realX) {
                        return true;
                    }
                }

                break;
            case DIR_DOWN:// 下向き(y>0)
                sign = -1;
                strDir = DIR_DOWN;
                diagoDir = DIR_LEFT;

                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, 0, 1, sensorRange);
                if(noPass != sensorRange) noPass++;

                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;

                // 斜め直線上の範囲確定
                for(i = 1;i < 3; i++) {
                    for(j = 0; j <= sensorRange; j++) {
                        if(j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j * sign, j, 0, 1, noPassTemp);
                            if(j != noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if(this.getTerrainDecision() == 1
                                || (this.getTerrainDecision() == -1 && terrainDecision)) {
                            if(!this.isMapPassableEx(ex + j * sign, ey + j, diagoDir)
                                    || !this.isMapPassableEx(ex + j * sign, ey + j, strDir)
                                    || !this.isMapPassableEx(ex + j * sign, ey + j + 1, diagoDir)
                                    || !this.isMapPassableEx(ex + (j + 1) * sign, ey + j, strDir)) {
                                break;
                            }
                        }
                    }

                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);

                    if(i == 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }

                // 隣接マス探索
                if(this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 1, 0)) return true;

                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for(i = 0; i < cnt; i++) {
                    if(coordinates[i][2] == "Add") {
                        continue;
                    }else if(coordinates[i][2] == "C") {
                        continue;
                    }else if(coordinates[i][0] == 0 && coordinates[i][1] == 0) {
                        continue;
                    }
                    if(px >= rex + coordinates[i][0] - realX
                            && px <= rex + coordinates[i][0] + realX
                            && py >= rey + Math.abs(coordinates[i][0]) - realY
                            && py <= rey + coordinates[i][1] + realY) {
                        return true;
                    }
                }

                break;
        }

        return false;
    };

    // 菱形範囲の探索(地形考慮完全無視)
    Game_Event.prototype.sensorDiamond = function() {
        let sensorRange, sx, sy, realX, realY;
        sensorRange = this.getSensorRange();
        sx = this.deltaXFrom($gamePlayer._realX);
        sy = this.deltaYFrom($gamePlayer._realY);
        realX = DefRealRangeX[0];
        realY = DefRealRangeY[0];

        // currentRange初期化
        this.setSensorRangeC(sensorRange);

        // coordinate初期化
        this.clearCoordinate();

        // coordinateセット
        this.setCoordinate(0, -sensorRange, DIR_RIGHT);
        this.setCoordinate(sensorRange, 0, DIR_DOWN);
        this.setCoordinate(0, sensorRange, DIR_LEFT);
        this.setCoordinate(-sensorRange, 0, DIR_UP);

        // プレイヤー範囲探索
        if(Math.abs(sx) + Math.abs(sy) <= sensorRange + Math.max(realX, realY)) {
            return true;
        }
    }

    // 四角範囲の探索(地形考慮完全無視)
    Game_Event.prototype.sensorSquare = function() {
        let sensorRange, sx, sy, realX, realY;
        sensorRange = this.getSensorRange();
        sx = this.deltaXFrom($gamePlayer._realX);
        sy = this.deltaYFrom($gamePlayer._realY);
        realX = DefRealRangeX[0];
        realY = DefRealRangeY[0];

        // currentRange初期化
        this.setSensorRangeC(sensorRange);

        // coordinate初期化
        this.clearCoordinate();

        // プレイヤー範囲探索
        if(Math.abs(sx) <= sensorRange + realX && Math.abs(sy) <= sensorRange + realY) {
            return true;
        }
    }

    Game_Event.prototype.isSideSearch = function(directionR, directionL, vx, vy) {
        let sx, sy, ex, ey, bothSensor, terrainDecision, realX, realY;
        sx = this.deltaXFrom($gamePlayer._realX);
        sy = this.deltaYFrom($gamePlayer._realY);
        ex = this.x;
        ey = this.y;
        bothSensor = CEC(DefBothSensor);
        terrainDecision = CEC(DefTerrainDecision);
        realX = DefRealRangeX[0];
        realY = DefRealRangeY[0];

        if(this.getBothSensor() == -1 && bothSensor) {
            if(this.getTerrainDecision() == 1
                    || (this.getTerrainDecision() == -1 && terrainDecision)) {
                this.setBothSensorRight(this.isMapPassableEx(ex, ey, directionR));
                this.setBothSensorLeft(this.isMapPassableEx(ex, ey, directionL));
            } else {
                this.setBothSensorRight(true);
                this.setBothSensorLeft(true);
            }
        } else if(this.getBothSensor() == 1) {
            if(this.getTerrainDecision() == 1
                    || (this.getTerrainDecision() == -1 && terrainDecision)) {
                this.setBothSensorRight(this.isMapPassableEx(ex, ey, directionR));
                this.setBothSensorLeft(this.isMapPassableEx(ex, ey, directionL));
            } else {
                this.setBothSensorRight(true);
                this.setBothSensorLeft(true);
            }
        } else {
            this.setBothSensorRight(false);
            this.setBothSensorLeft(false);
        }

        if(this.getBothSensorRight()
                && sx >= vx - realX && sx <= vx + realX
                && sy >= vy - realY && sy <= vy + realY) {
            return true;
        }
        vx = (vx == 0)? vx : -vx;
        vy = (vy == 0)? vy : -vy;
        if(this.getBothSensorLeft()
                && sx >= vx - realX && sx <= vx + realX
                && sy >= vy - realY && sy <= vy + realY) {
            return true;
        }
        return false;
    };

    Game_Event.prototype.rangeSearch = function(strDir, rx, ry, signX, signY, noPass) {
        let sensorRange, ex, ey, cx, cy, sx, sy, j, obstacle ,cnt, status,
            noPassDir, terrainDecision;
        sensorRange = this.getSensorRange();
        cnt = sensorRange - Math.abs(rx);
        ex = this.x;
        ey = this.y;
        obstacle = -1;
        status = "Last";
        noPassDir = (signX != 0)? ry : rx;
        terrainDecision = CEC(DefTerrainDecision);

        // 正面探索
        for(j = 0; j <= cnt; j++) {
            cx = rx + j * signX;
            cy = ry + j * signY;
            if(this.getTerrainDecision() == 1
                    || (this.getTerrainDecision() == -1 && terrainDecision)) {
                if(!this.isMapPassableEx(ex + cx, ey + cy, strDir) && j < sensorRange) {
                    obstacle = j + Math.abs(rx);
                    status = "Line";
                    break;
                }
                if(j + Math.abs(noPassDir) >= noPass && noPass < sensorRange) {
                    status = "Nopass";
                    break;
                }
            }
        }

        // 座標セット
        sx = this.deltaXFrom(ex + cx);
        if(sx != 0) sx *= -1;
        sy = this.deltaYFrom(ey + cy);
        if(sy != 0) sy *= -1;
        this.setCoordinate(sx, sy, status);

        return (obstacle < 0)? noPass : obstacle;
    };

    const _GameEvent_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function() {
        if(this.getSensorStatus() != 1) {
            _GameEvent_lock.call(this);
        } else {
            // 話しかけられた場合振り向かない(探索者が探索中に限る)
            if (!this._locked) {
                this._prelockDirection = this.direction();
                // this.turnTowardPlayer();
                this._locked = true;
            }
        }
    };

    Game_Event.prototype.addCoordinate = function(length) {
        // 左右の配列要素数を指定数に合わせる
        let coordinates, cnt, j;
        coordinates = this.getCoordinate();
        cnt = coordinates.length;
        for(j = cnt; j < length; j++) {
            this.setCoordinate(0, 0, "Add");
        }
    };

    const _Game_Event_erase = Game_Event.prototype.erase;
    Game_Event.prototype.erase = function() {
        this.setSensorStatus(0);
        this.setFoundStatus(0);
        this.setViewRangeStatus(0);
        _Game_Event_erase.call(this);
    };

    const _Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        if(this.isSensorFound() && DefTrackingPriority[0]) {
            return Game_CharacterBase.prototype.isCollidedWithEvents.apply(this, arguments);
        } else {
            return _Game_Event_isCollidedWithEvents.apply(this, arguments);
        }
    };

    Game_Event.prototype.isInvisible = function() {
        return this._erased || this.characterName() == "";
    }

    const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        if(!this.isSensorFound() || !DefFollowerThrough[0]) {
            return _Game_Event_isCollidedWithPlayerCharacters.call(this, x, y);
        }
        return this.isNormalPriority() && !$gamePlayer.isThrough() && $gamePlayer.pos(x, y);
    };


    //=========================================================================
    // Game_Followers
    //  フォロワーを返す処理を追加定義します。
    //=========================================================================
    // Game_Followers.prototype.member = function() {
    //     return this._data;
    // };


    //=========================================================================
    // Spriteset_Map
    //  探索者の視界範囲を表す図形を描画させる処理を追加定義します。
    //=========================================================================
    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);
        this.createViewRange();
    }

    Spriteset_Map.prototype.createViewRange = function() {
        this._viewRangeSprites = [];
        $gameMap.events().forEach(function(event) {
            if(event._sensorType) {
                this._viewRangeSprites.push(new Sprite_ViewRange(event));
                event.enableCreateRange();
            }
        }, this);
        for (let i = 0; i < this._viewRangeSprites.length; i++) {
            this._tilemap.addChild(this._viewRangeSprites[i]);
        }
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        if(this._viewRangeSprites && ConvSw(DefRangeVisible[0])) {
            this.updateViewRange();
        }
    };

    Spriteset_Map.prototype.updateViewRange = function() {
        let cnt;
        cnt = this._viewRangeSprites.length - 1;
        cnt = cnt >= 0 ? cnt : 0;

        $gameMap.events().filter(function(event) {
            return !event.isCreateRange();
        }).forEach(function(event) {
            if(event._sensorType) {
                const sprite = new Sprite_ViewRange(event);
                this._viewRangeSprites.push(sprite);
                event.enableCreateRange();
                this._tilemap.addChild(sprite);
            }
        }, this);
    };


    //=========================================================================
    // Sprite_ViewRange
    //  探索者の視界範囲を表す図形を描画させる処理を定義します。
    //=========================================================================
    function Sprite_ViewRange() {
        this.initialize.apply(this, arguments);
    }

    Sprite_ViewRange.prototype = Object.create(Sprite.prototype);
    Sprite_ViewRange.prototype.constructor = Sprite_ViewRange;

    Sprite_ViewRange.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.setCharacter(character);
        this._frameCount = 0;
        this.z = DefRangePosition[0] == 1 ? 6 : 2;
    };

    Sprite_ViewRange.prototype.initMembers = function() {
        this._character = null;
        this._coordinates = null;
    };

    Sprite_ViewRange.prototype.setCharacter = function(character) {
        this._character = character;
    };

    Sprite_ViewRange.prototype.update = function() {
        let sensorStatus, rangeStatus, rangeVisible, defVisible;

        Sprite.prototype.update.call(this);

        sensorStatus = this._character.getSensorStatus();
        rangeStatus = this._character.getViewRangeStatus();
        rangeVisible = this._character.getRangeVisible();
        defVisible = ConvSw(DefRangeVisible[0]);

        if(this._character && this._character._erased) {
            this.parent.removeChild(this);
        }

        if(this._character && !this._character._erased && sensorStatus == 1 && (rangeVisible == 1 || (rangeVisible == -1 && defVisible))) {
            this.updatePosition();
            if(this.bitmap) {
                if(rangeStatus == 1) {
                    // 描画更新
                    if(this._coordinate.length == 0) {
                        this._coordinate = this._character.getCoordinate();
                    }
                    this.updateBitmap();
                } else if(rangeStatus == 2) {
                    // 描画新規
                    this._coordinate = this._character.getCoordinate();
                    this.createBitmap();
                }
            } else {
                // 描画新規
                this._coordinate = this._character.getCoordinate();
                this.createBitmap();
            }
            this.visible = true;
        } else {
            this.visible = false;
        }
    };

    Sprite_ViewRange.prototype.createBitmap = function() {
        let direction, dirFixed, sensorRange, sensorRangeC, sensorType,
            tileWidth, tileHeight, width, height, coordinates,
            sideSensorR, sideSensorL, bs, bias, color, opacity,
            bothSensor;
        direction = this._character.direction();
        dirFixed = this._character.getDirectionFixed();
        direction = (dirFixed == -1)? direction : dirFixed;
        bothSensor = CEC(DefBothSensor);
        coordinates = this._coordinate;
        sensorType = this._character.getSensorType();
        sensorRangeC = this._character.getSensorRangeC();
        sensorRange = this._character.getSensorRange();
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        sideSensorR = this._character.getBothSensorRight();
        sideSensorL = this._character.getBothSensorLeft();
        bias = (bothSensor) ? 3
            : (this._character.getBothSensor() > 0) ? 3 : 1;
        color = DefRangeColor[0];
        opacity = DefRangeOpacity[0];

        switch(sensorType) {
            case "l":
                if(direction == DIR_UP) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if(direction == DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_DOWN) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillViewRangeLine(color, this._character);
                break;
            case "f":
                if(direction == DIR_UP) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if(direction == DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_DOWN) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                this.bitmap = new Bitmap(width, height);

                if(sensorType == "f") {
                    this.bitmap.fillViewRangeFan(color, this._character);
                } else {
                    this.bitmap.fillViewRangeFrontDiamond(color, this._character);
                }
                break;
            case "d":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight;
                this.anchor.x = 0.5;
                this.anchor.y = 0.55;
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillViewRangeDiamond(color, this._character);
                break;
            case "s":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight;
                this.anchor.x = 0.5;
                this.anchor.y = 0.55;
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillAll(color);
                break;
        }

        this.opacity = opacity;
        this.blendMode = Graphics.BLEND_ADD;
        this.visible = true;
        this._character.setViewRangeStatus(1);
    };

    Sprite_ViewRange.prototype.updateBitmap = function() {
        let direction, dirFixed, sensorRange, sensorRangeC, sensorType,
            tileWidth, tileHeight, width, height, i, cnt,
            tmpCoordinate, coordinate, bias, color, opacity,
            bothSensor;
        direction = this._character.direction();
        dirFixed = this._character.getDirectionFixed();
        direction = (dirFixed == -1)? direction : dirFixed;
        bothSensor = CEC(DefBothSensor);
        sensorType = this._character.getSensorType();
        sensorRangeC = this._character.getSensorRangeC();
        sensorRange = this._character.getSensorRange();
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        tmpCoordinate =  this._coordinate;
        coordinate = this._character.getCoordinate();
        cnt = (tmpCoordinate.length < coordinate.length)? tmpCoordinate.length : coordinate.length;
        bias = (bothSensor)? 3
            : (this._character.getBothSensor() > 0)? 3 : 1;
        color = DefRangeColor[0];
        opacity = DefRangeOpacity[0];

        for(i = 0; i < cnt; i++) {
            if(coordinate[i][0] != tmpCoordinate[i][0] || coordinate[i][1] != tmpCoordinate[i][1]) {
                if(tmpCoordinate[i][3] == -1) {
                    tmpCoordinate[i][3] = $gameMap.tileWidth();
                } else if(tmpCoordinate[i][3] != 0) {
                    tmpCoordinate[i][3]--;
                }
            } else {
                coordinate[i][3] = 0;
            }
        }

        switch(sensorType) {
            case "l":
                if(direction == DIR_UP) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileWidth;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if(direction == DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_DOWN) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillViewRangeLine(color, this._character);
                break;
            case "f":
                if(direction == DIR_UP) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileWidth;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if(direction == DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if(direction == DIR_DOWN) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                if(sensorType == "f") {
                    this.bitmap.fillViewRangeFan(color, this._character);
                } else {
                    this.bitmap.fillViewRangeFrontDiamond(color, this._character);
                }
                break;
            case "d":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight;
                this.anchor.x = 0.5;
                this.anchor.y = 0.55;
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillViewRangeDiamond(color, this._character);
                break;
            case "s":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight;
                this.anchor.x = 0.5;
                this.anchor.y = 0.55;
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillAll(color);
                break;
        }

        this.opacity = opacity;
        this.blendMode = Graphics.BLEND_ADD;
        this.visible = true;
    };

    Sprite_ViewRange.prototype.updatePosition = function() {
        let direction, dirFixed, sensorRangeC, sensorType, cx, cy, tileWidth, tileHeight, bias;
        direction = this._character.direction();
        dirFixed = this._character.getDirectionFixed();
        direction = (dirFixed == -1)? direction : dirFixed;
        sensorType = this._character.getSensorType();
        sensorRangeC = this._character.getSensorRangeC();
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        cx = this._character.screenX();
        cy = this._character.screenY();
        bias = 6;// 位置微調整

        this.x = cx;
        this.y = cy;
        switch(sensorType) {
            case "l":
                if(direction == DIR_UP) {
                    this.y = cy + bias;
                } else if(direction == DIR_RIGHT) {
                    this.x = cx + tileWidth / 2 - tileWidth;
                    this.y = cy - tileHeight / 2 + bias;
                } else if(direction == DIR_LEFT) {
                    this.x = cx + tileWidth / 2;
                    this.y = cy - tileHeight / 2 + bias;
                } else if(direction == DIR_DOWN) {
                    this.y = cy - tileHeight + bias;
                }
                break;
            case "f":
                if(direction == DIR_UP) {
                    this.y = cy + bias;
                } else if(direction == DIR_RIGHT) {
                    this.x = cx + tileWidth / 2 - tileWidth;
                    this.y = cy - tileHeight / 2 + bias;
                } else if(direction == DIR_LEFT) {
                    this.x = cx + tileWidth / 2;
                    this.y = cy - tileHeight / 2 + bias;
                } else if(direction == DIR_DOWN) {
                    this.y = cy - tileHeight + bias;
                }
                break;
            case "df":
                if(direction == DIR_UP) {
                    this.y = cy + bias;
                } else if(direction == DIR_RIGHT) {
                    this.x = cx + tileWidth / 2 - tileWidth;
                    this.y = cy - tileHeight / 2 + bias;
                } else if(direction == DIR_LEFT) {
                    this.x = cx + tileWidth / 2;
                    this.y = cy - tileHeight / 2 + bias;
                } else if(direction == DIR_DOWN) {
                    this.y = cy - tileHeight + bias;
                }
                break;
        }
    };


    //=========================================================================
    // Bitmap
    //  探索者の視界範囲を表す図形を描画させる処理を追加定義します。
    //=========================================================================
    Bitmap.prototype.fillViewRangeLine = function(color, character) {
        let context, width, height, tileWidth, tileHeight,
            j, cx, cy, cnt, num, distanceX, distanceY,
            direction, dirFixed, coordinates, sideSensorR, sideSensorL;
        context = this._context;
        direction = character.direction();
        dirFixed = character.getDirectionFixed();
        direction = (dirFixed == -1)? direction : dirFixed;
        width = this.width;
        height = this.height;
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        coordinates = character.getCoordinate();
        cnt = coordinates.length;
        sideSensorR = character.getBothSensorRight();
        sideSensorL = character.getBothSensorLeft();
        j = 0;

        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if(direction == DIR_UP) {
            if(coordinates && cnt == 1) {
                num = 1;
                cx = width / 2 + tileWidth / 2;
                cy = height - tileHeight;
                distanceX = cx - tileWidth;
                distanceY = cy - Math.abs(coordinates[j][num]) * tileHeight;

                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, 1, 1, sideSensorL, -1, 1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if(direction == DIR_RIGHT) {
            if(coordinates && cnt == 1) {
                num = 0;
                cx = tileWidth;
                cy = height / 2 + tileHeight / 2;
                distanceX = cx + Math.abs(coordinates[j][num]) * tileWidth;
                distanceY = cy - tileHeight;

                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, -1, 1, sideSensorL, -1, -1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if(direction == DIR_LEFT) {
            if(coordinates && cnt == 1) {
                num = 0;
                cx = width - tileWidth;
                cy = height / 2 - tileHeight / 2;
                distanceX = cx - Math.abs(coordinates[j][num]) * tileWidth;
                distanceY = cy + tileHeight;

                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, 1, -1, sideSensorL, 1, 1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if(direction == DIR_DOWN) {
            if(coordinates && cnt == 1) {
                num = 1;
                cx = width / 2 - tileWidth / 2;
                cy = tileHeight;
                distanceX = cx + tileWidth;
                distanceY = cy + Math.abs(coordinates[j][num]) * tileHeight;

                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, -1, -1, sideSensorL, 1, -1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        }
        context.fill();
        context.restore();
        this._setDirty();
    };

    Bitmap.prototype.fillViewRangeFan = function(color, character) {
        let context, width, height, tileWidth, tileHeight, cx, cy,
            coordinates, direction, dirFixed, sideSensorR, sideSensorL,
            i, j, cnt, num, distanceX, distanceY, sign;
        context = this._context;
        width = this.width;
        height = this.height;
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        coordinates = character.getCoordinate();
        cnt = coordinates.length;
        direction = character.direction();
        dirFixed = character.getDirectionFixed();
        direction = (dirFixed == -1)? direction : dirFixed;
        sideSensorR = character.getBothSensorRight();
        sideSensorL = character.getBothSensorLeft();


        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if(direction == DIR_UP) {
            if(coordinates && cnt > 0) {
                sign = 1;
                num = 1;
                cx = width / 2 + tileWidth / 2;
                cy = height - tileHeight;
                distanceX = cx - tileWidth;
                distanceY = height - tileHeight - Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, 1, 1, sideSensorL, -1, 1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);

                for(i = 1, j = 2; j < cnt; i++, j++) {
                    if(coordinates[j][2] == "Add") {
                        continue;
                    }else if(coordinates[j][2] == "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    }else if(coordinates[j][0] == 0 && coordinates[j][1] == 0) {
                        continue;
                    }
                    cx = width / 2 + tileWidth / 2 * sign + tileWidth * i * sign;
                    cy = height - tileHeight * i;
                    distanceX = cx + tileWidth * signChange(sign);
                    distanceY = height - tileHeight - Math.abs(coordinates[j][num]) * tileHeight;

                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if(direction == DIR_RIGHT) {
            if(coordinates && cnt > 0) {
                sign = 1;
                num = 0;
                cx = tileWidth;
                cy = height / 2 + tileHeight / 2;
                distanceX = tileWidth + Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, -1, 1, sideSensorL, -1, -1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);

                for(i = 1, j = 2; j < cnt; i++, j++) {
                    if(coordinates[j][2] == "Add") {
                        continue;
                    }else if(coordinates[j][2] == "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    }else if(coordinates[j][0] == 0 && coordinates[j][1] == 0) {
                        continue;
                    }
                    cx = tileHeight * i;
                    cy = height / 2 + tileHeight / 2 * sign + tileHeight * i * sign;
                    distanceX = tileWidth + Math.abs(coordinates[j][num]) * tileWidth;
                    distanceY = cy + tileHeight * signChange(sign);

                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if(direction == DIR_LEFT) {
            if(coordinates && cnt > 0) {
                sign = -1;
                num = 0;
                cx = width - tileWidth;
                cy = height / 2 - tileHeight / 2;
                distanceX = width - tileWidth - Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy + tileHeight;
                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, 1, -1, sideSensorL, 1, 1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);

                for(i = 1, j = 2; j < cnt; i++, j++) {
                    if(coordinates[j][2] == "Add") {
                        continue;
                    }else if(coordinates[j][2] == "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    }else if(coordinates[j][0] == 0 && coordinates[j][1] == 0) {
                        continue;
                    }
                    cx = width - tileHeight * i;
                    cy = height / 2 + tileHeight / 2 * sign + tileHeight * i * sign;
                    distanceX = width - tileWidth - Math.abs(coordinates[j][num]) * tileWidth;
                    distanceY = cy + tileHeight * signChange(sign);

                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if(direction == DIR_DOWN) {
            if(coordinates && cnt > 0) {
                sign = -1;
                num = 1;
                cx = width / 2 - tileWidth / 2;
                cy = tileHeight;
                distanceX = cx + tileWidth;
                distanceY = tileHeight + Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(context, cx, cy, [sideSensorR, -1, -1, sideSensorL, 1, -1]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);

                for(i = 1, j = 2; j < cnt; i++, j++) {
                    if(coordinates[j][2] == "Add") {
                        continue;
                    }else if(coordinates[j][2] == "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    }else if(coordinates[j][0] == 0 && coordinates[j][1] == 0) {
                        continue;
                    }
                    cx = width / 2 + tileWidth / 2 * sign + tileWidth * i * sign;
                    cy = tileHeight * i;
                    distanceX = cx + tileWidth * signChange(sign);
                    distanceY = tileHeight + Math.abs(coordinates[j][num]) * tileHeight;

                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        }
        context.fill();
        context.restore();
        this._setDirty();
    };

    Bitmap.prototype.fillViewRangeDiamond = function(color, character) {
        let context, width, height, tileWidth, tileHeight, cx, cy,
            coordinates, rx, ry, dir, dx, dy, ndx, ndy,
            i, j, cnt, num, distanceX, distanceY, sign;
        context = this._context;
        width = this.width;
        height = this.height;
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        coordinates = character.getCoordinate();
        cnt = coordinates.length;

        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();

        if(coordinates && cnt > 0) {
            sign = 1;
            num = 1;
            cx = width / 2 - tileWidth / 2;
            cy = 0;
            rx = cx;
            ry = cy;
            context.moveTo(cx, cy);

            for(i = 0; i < cnt; i++) {
                dx = coordinates[i][0];
                dy = coordinates[i][1];
                ndx = (i < cnt - 1)? coordinates[i+1][0] : coordinates[0][0];
                ndy = (i < cnt - 1)? coordinates[i+1][1] : coordinates[0][1];
                dir = coordinates[i][2];
                switch(dir) {
                    case DIR_UP:
                        ry -= tileHeight;
                        break;
                    case DIR_RIGHT:
                        rx += tileWidth;
                        break;
                    case DIR_DOWN:
                        ry += tileHeight;
                        break;
                    case DIR_LEFT:
                        rx -= tileWidth;
                        break;
                }
                context.lineTo(rx, ry);
                while(dx != ndx || dy != ndy) {
                    switch(dir) {
                        case DIR_UP:
                        case DIR_DOWN:
                            if(dx < ndx) {
                                rx += tileWidth;
                                dx++;
                            } else if(dx > ndx) {
                                rx -= tileWidth;
                                dx--;
                            }
                            context.lineTo(rx, ry);
                            if(dy < ndy) {
                                ry += tileHeight;
                                dy++;
                            } else if(dy > ndy) {
                                ry -= tileHeight;
                                dy--;
                            }
                            context.lineTo(rx, ry);
                            break;
                        case DIR_RIGHT:
                        case DIR_LEFT:
                            if(dy < ndy) {
                                ry += tileHeight;
                                dy++;
                            } else if(dy > ndy) {
                                ry -= tileHeight;
                                dy--;
                            }
                            context.lineTo(rx, ry);
                            if(dx < ndx) {
                                rx += tileWidth;
                                dx++;
                            } else if(dx > ndx) {
                                rx -= tileWidth;
                                dx--;
                            }
                            context.lineTo(rx, ry);
                            break;
                    }
                }

            }
        }
        context.fill();
        context.restore();
        this._setDirty();
    };

    Bitmap.prototype.mkrDrawLine = function(context, cx, cy, distanceX, distanceY) {
        let width, height, tileWidth, tileHeight, lx, ly;
        width = this.width;
        height = this.height;
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        lx = distanceX;
        ly = distanceY;

        context.moveTo(cx, cy);
        context.lineTo(lx, cy);
        context.lineTo(lx, ly);
        context.lineTo(cx, ly);
        //context.lineTo(cx, cy);
    };

    Bitmap.prototype.mkrSideDrawLine = function(context, cx, cy, sideSensors) {
        let tileWidth, tileHeight, rx, ry, signX, signY, signX2, signY2;
        tileWidth = $gameMap.tileWidth();
        tileHeight = $gameMap.tileHeight();
        signX = sideSensors[1];
        signY = sideSensors[2];
        signX2 = sideSensors[4];
        signY2 = sideSensors[5];

        if(sideSensors[0]) {
            rx = cx;
            ry = cy;
            context.moveTo(rx, ry);
            context.lineTo(rx + tileWidth * signX, ry);
            context.lineTo(rx + tileWidth * signX, ry + tileHeight * signY);
            context.lineTo(rx, ry + tileHeight * signY);
            context.lineTo(rx, ry);
        }
        if(sideSensors[3]) {
            rx = cx + ((signX != signX2)? tileWidth * signX2 : 0);
            ry = cy + ((signY != signY2)? tileHeight * signY2 : 0);
            context.moveTo(rx, ry);
            context.lineTo(rx + tileWidth * signX2, ry);
            context.lineTo(rx + tileWidth * signX2, ry + tileHeight * signY2);
            context.lineTo(rx, ry + tileHeight * signY2);
            context.lineTo(rx, ry);
        }
    };


    //=========================================================================
    // ユーティリティ
    //  汎用的な処理を定義します。
    //=========================================================================
    function signChange(sign) {
        return sign * -1;
    }

    function getRegionIds() {
        let ArrayRegionId, results, i, argCount, ary;
        ArrayRegionId = [];

        if(arguments && arguments.length > 0) {
            argCount = arguments.length;
            for(i = 0; i < argCount; i++) {
                if(Array.isArray(arguments[i]) && arguments[i].length > 0) {
                    ArrayRegionId.push(CEC(arguments[i][0]));
                } else if(typeof arguments[i] == "string") {
                    ary = arguments[i].split("_").filter(function(val){
                        return val != "" && val != "0";
                    }).map(function(val) {
                        return parseInt(ConvVb(val), 10);
                    });
                    Array.prototype.push.apply(ArrayRegionId, ary);
                } else if(isFinite(arguments[i])) {
                    ArrayRegionId.push(parseInt(arguments[i], 10));
                }
            }
        }

        return ArrayRegionId.filter(function(val, i, self) {
            return self.indexOf(val) === i && val > 0;
        });
    }

})();