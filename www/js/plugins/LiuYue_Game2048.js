/*:
 * @plugindesc v1.07 Game2048 2048小游戏
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 *
 *
 * 这个插件内置了一款2048小游戏
 *
 * 2048 （Gabriele Cirulli出品手机数字游戏）
 *   《2048》是一款比较流行的数字游戏，最早于2014年3月20日发行。原版2048首先在GitHub上发布，
 *    原作者是Gabriele Cirulli，后被移植到各个平台。
 *	  这款游戏是基于《1024》和《小3传奇》的玩法开发而成的新型数字游戏。
 *
 *
 *    不扯了，安排
 *
 *
 *
 *
 * 注意:运行这个插件至少需要LiuYue_GameCore(v1.20版本)(流月小游戏核心)作为前置插件
 *
 *---------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 * 
 *---------------------------------------------------------
 *
 * 将下载到的默认素材包文件夹整个复制到img/pictures文件夹中
 * 将会完成默认素材路径配置
 *
 *
 * 
 *以下是一些插件用到的插件指令
 *
 *---------------------Plugin Command--------------------
 *
 * ZzyGCF Play x              //填入游戏名,这将进行小游戏,游戏名要和参数中设定的一致,默认为 G2048
 *
 * ZzyG2048 MergeScore x1 x2 x3 x4...  //这是设置每级别合成的得分,最多到x16,如果没设置全则不会对以后的分数改变
 * ZzyG2048 MergeScoreNumber x1(2/4/8/16...) x2     //x1需要替换成合成代号x2需要替换成分数
 * ZzyG2048 HighRate x1 x2 x3 x4       //这是设置出现4 8 16 32这四种特殊方块的概率,请填写0~100之间的整数
 * ZzyG2048 List x                     //这是设置列项的数量,请勿在游戏中使用这条命令
 * ZzyG2048 Line x                     //这是设置行项的数量,请勿在游戏中使用这条命令
 * ZzyG2048 SpawnCount x               //这将修改每次操作后,出现新的方块的个数
 * ZzyG2048 IsWinMergeNumber x(true/false)    //这将设置胜利条件--合成指定的方块
 * ZzyG2048 IsWinScoreOver x(true/false)      //这将设置胜利条件--到达制定分数
 * ZzyG2048 IsWinCountOver x(true/false)      //这将设置胜利条件--操作指定次数
 * ZzyG2048 IsFailTimeOver x(true/false)      //这将设置失败条件--超时
 * ZzyG2048 IsFailCountOver x(true/false)     //这将设置失败条件--操作次数超标
 *
 * ZzyG2048 WinMergeNumber x(2/4/8/16/32...)  //这将设置合出方块的胜利条件
 * ZzyG2048 WinScoreOver x                    //这将设置完成分数的胜利条件
 * ZzyG2048 WinCountOver x                    //这将设置操作一定次数的胜利条件
 * ZzyG2048 FailTimeOver x                    //这将设置超时的失败条件
 * ZzyG2048 FailCountOver x                   //这将设置超出操作次数的失败条件
 *
 *
 *
 *
 *
 * 注意：按钮类的贴图一定要准备三张,按钮类的贴图一定要准备三张,按钮类的贴图一定要准备三张
 * 比如游戏中的退出,命名规则为 '图片名'   '图片名1'    '图片名2'   后缀一个为1一个为2
 * 
 * 没有后缀图片在游戏中就是正常显示的效果
 * 后缀1的图片名是鼠标滑在按钮上显示的高亮的效果
 * 后缀2的图片名是点击按下后按钮上显示的按下效果
 *
 * 例:图片名'exit'   那么其余两张命名规则 'exit1'    'exit2'
 *
 *
 *
 *-------------------------------------------------------
 *
 *
 *
 *
 *以下是一些脚本函数
 *
 *---------------------Script Function--------------------
 *
 *
 *
 * Zzy.G2048.MergeScore(num,score)            //这会修改合成对应的分数,num需要替换成合成对应代号(2/4/8/16/32/64...)    score是合成后获得的分数
 * Zzy.G2048.HighRate(r4,r8,r16,r32)          //合成高级方块的概率,需要输入百分比范围(0~100),参数1~4分别代表产生代号4,代号8,代号16,代号32的概率
 * Zzy.G2048.List(list)                       //这会修改列向的数量
 * Zzy.G2048.Line(line)                       //这会修改行向的数量
 * Zzy.G2048.SpawnCount(count)                //这会修改每次生成方块的数量
 * Zzy.G2048.IsWinMergeNumber(isEnable)       //这将设置胜利条件--合成指定的方块
 * Zzy.G2048.IsWinScoreOver(isEnable)         //这将设置胜利条件--到达制定分数
 * Zzy.G2048.IsWinCountOver(isEnable)         //这将设置胜利条件--操作指定次数
 * Zzy.G2048.IsFailTimeOver(isEnable)         //这将设置失败条件--超时
 * Zzy.G2048.IsFailCountOver(isEnable)        //这将设置失败条件--操作次数超标
 * Zzy.G2048.WinMergeNumber(block)            //这将设置合出方块的胜利条件        
 * Zzy.G2048.WinScoreOver(score)              //这将设置完成分数的胜利条件
 * Zzy.G2048.WinCountOver(count)              //这将设置操作一定次数的胜利条件
 * Zzy.G2048.FailTimeOver(time)               //这将设置超时的失败条件
 * Zzy.G2048.FailCountOver(count)             //这将设置超出操作次数的失败条件
 *
 * Zzy.G2048.GetMergeScore(num)               //输入对应代号(2/4/8/16/32/64...),将会返回合成后获得的分数
 * Zzy.G2048.GetHighRate(num)                 //输入对应代号(2/4/8/16),将会返回对应的概率
 * Zzy.G2048.GetList()                        //返回列数量
 * Zzy.G2048.GetLine()                        //返回行数量
 * Zzy.G2048.GetSpawnCount()                  //返回每次生成方块的数量
 * Zzy.G2048.GetIsWinMergeNumber()            //返回是否设置胜利条件--合成指定的方块
 * Zzy.G2048.GetIsWinScoreOver()              //返回是否设置胜利条件--到达制定分数
 * Zzy.G2048.GetIsWinCountOver()              //返回是否设置胜利条件--操作指定次数
 * Zzy.G2048.GetIsFailTimeOver()              //返回是否设置失败条件--超时
 * Zzy.G2048.GetIsFailCountOver()             //返回是否设置失败条件--操作次数超标
 * Zzy.G2048.GetWinMergeNumber()              //返回是否设置合出方块的胜利条件 
 * Zzy.G2048.GetWinScoreOver()                //返回是否设置完成分数的胜利条件
 * Zzy.G2048.GetWinCountOver()                //返回是否设置操作一定次数的胜利条件
 * Zzy.G2048.GetFailTimeOver()                //返回是否设置超时的失败条件
 * Zzy.G2048.GetFailCountOver()               //返回是否设置超出操作次数的失败条件
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 *
 *
 *
 * 我叫坂本：v1.07 拓展游戏结算后的事件执行参数
 * 我叫坂本：v1.06 修复参数名传递错误bug,添加
 * 我叫坂本：v1.05 拓展脚本函数,修复部分解释显示错误,修复ZzyG2048 HighRate指令无效的问题
 * 我叫坂本：v1.04 可通过参数修改图片存放路径,额外存储变量
 * 我叫坂本：v1.03 旧存档兼容2.0
 * 我叫坂本：v1.02 旧存档兼容
 * 我叫坂本：v1.01 修复内存消耗问题,请将GameCore插件更新到版本1.12及以上
 * 我叫坂本：v1.00 完成插件功能
 *
 *----------------------------------------------------------
 *
 * @param ---主设置---
 * @default
 *
 *
 * @param GameName
 * @text 游戏名
 * @parent ---主设置---
 * @type text
 * @desc 这是启动游戏的名称,调用Play插件命令后填写的游戏名,默认为G2048
 * @default G2048
 *
 * @param isBlockAutoSize
 * @parent ---主设置---
 * @text 数字图自动长宽
 * @type boolean
 * @on YES
 * @off NO
 * @desc 会让游戏中数字方块通过行列格子数自动的去设置长宽值,这会让图片进行拉伸,可能产生模糊
 * YES - true     NO - false
 * @default true
 *
 *
 * @param ---事件执行---
 * @default
 *
 *
 * @param WinCommon
 * @text 胜利事件
 * @parent ---事件执行---
 * @type Number
 * @desc 这是小游戏结束后,如果以胜利告终,将会执行的事件ID,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param WinScript
 * @text 胜利脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param FailCommon
 * @text 失败事件
 * @parent ---事件执行---
 * @type Number
 * @desc 这是小游戏结束后,如果以胜利告终,将会执行的事件ID,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param FailScript
 * @text 失败脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param Other1Common
 * @text 特殊情况1事件
 * @parent ---事件执行---
 * @type Number
 * @desc 除了胜利和失败外,允许出现一些特殊形况,那种自定义的终止条件,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param Other1Script
 * @text 特殊情况1脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param Other2Common
 * @text 特殊情况2事件
 * @parent ---事件执行---
 * @type Number
 * @desc 除了胜利和失败外,允许出现一些特殊形况,那种自定义的终止条件,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param Other2Script
 * @text 特殊情况2脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param SaveScoreVariable
 * @text 存放分数变量
 * @parent ---事件执行---
 * @type Variable
 * @desc 这是在进行游戏后,存放分数变量的ID值,这个变量是额外对这款游戏的分数进行存储,与核心中的存放不冲突,填0则不会存储
 * @default 0
 *
 * @param SaveTimeVariable
 * @text 存放耗时变量
 * @parent ---事件执行---
 * @type Variable
 * @desc 这是在进行游戏后,存放事件变量的ID值,这个变量是额外对这款游戏的耗时进行存储,与核心中的存放不冲突,填0则不会存储
 * @default 0
 *
 *
 *
 *
 * @param ---图片路径---
 * @default
 *
 * @param PicPath
 * @text 图片路径
 * @parent ---图片路径---
 * @type text
 * @desc 存储图片的路径,默认值是在pictures文件夹中,改成自定义文件夹请确保文件夹存在
 * @default img/pictures/2048/
 *
 *
 * @param ---图片资源---
 * @default
 *
 *
 * @param BackGroundPic
 * @text 背景图片
 * @parent ---图片资源---
 * @type text
 * @desc 如果填写了背景图片的文件名,则会作为背景图片,如果没有填写,会默认使用GameCore参数的背景图片
 * @default G2048bk
 *
 *
 * @param MainNumPic
 * @text 2048图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,每个数字方块的标数,切分成4*4的大图集,最多16张图,图片默认放在Picture文件夹,合成最大65563,没填默认填充
 * @default G2048block
 *
 * @param FloorPic
 * @text 底板图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,承载数字方块的那个大板子图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048blockBk
 *
 * @param SFloorPic
 * @text 小底板图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,承载每个数字方块的那个小板子图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048blockSBk
 *
 * @param LogoPic
 * @text 2048显示图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,左上方LOGO型的图标,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048Logo
 *
 * @param ExitMenuPic
 * @text 退出游戏菜单图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,右上角退出游戏的菜单图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048exit
 *
 * @param OkMenuPic
 * @text 确认游戏菜单图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,确认按钮的菜单图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048ok
 *
 * @param CancelMenuPic
 * @text 取消游戏菜单图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,取消按钮的菜单图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048cancel
 *
 * @param ScorePic
 * @text 分数图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,分数面板图片,没填默认填充
 * @default G2048score
 *
 * @param HistoryPic
 * @text 历史最高图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,历史最高分数图片,没填默认填充
 * @default G2048history
 *
 * @param CountPic
 * @text 次数图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,操作次数的分数图片,没填默认填充
 * @default G2048count
 *
 * @param TimePic
 * @text 时间图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,消耗时间的分数图片,没填默认填充
 * @default G2048time
 *
 *
 * @param PausePic
 * @text 暂停游戏图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,暂停游戏时出现的图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048P
 *
 *
 * @param ExitPic
 * @text 退出游戏图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,退出游戏时出现的图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048exitTips
 *
 *
 * @param WinPic
 * @text 胜利游戏图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,胜利游戏时出现的图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048winTips
 *
 * 
 * @param FailPic
 * @text 失败游戏图片名称
 * @parent ---图片资源---
 * @type text
 * @desc 这是2048中,失败游戏时出现的图片,会自动设置宽高,图片默认放在Picture文件夹,没填默认填充
 * @default G2048failTips
 
 *
 *
 * @param ---胜利条件---
 * @default
 *
 * @param IsWinMergeNumber
 * @parent ---胜利条件---
 * @text 胜利条件是否包含合成指定数字
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在合并出指定数字将会胜利
 * YES - true     NO - false
 * @default true
 *
 * 
 * @param WinMergeNumberTarget
 * @text 合成条件
 * @parent ---胜利条件---
 * @type combo
 * @option 2
 * @option 4
 * @option 8
 * @option 16
 * @option 32
 * @option 64
 * @option 128
 * @option 256
 * @option 512
 * @option 1024
 * @option 2048
 * @option 4096
 * @option 8192
 * @option 16384
 * @option 32768
 * @option 65536
 * @desc 合成以下数字时,将会通关
 * @default 2048
 *
 *
 * @param IsWinScoreOver
 * @parent ---胜利条件---
 * @text 胜利条件是否包含分数超过
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在合并达到一定分数将会胜利
 * YES - true     NO - false
 * @default false
 *
 *
 * @param WinScoreOverTarger
 * @parent ---胜利条件---
 * @text 胜利分数
 * @desc 需要达标的分数,达到这个分数将会胜利
 * @default 5000
 *
 *
 * @param IsWinCountOver
 * @parent ---胜利条件---
 * @text 胜利条件是否包含操作达到一定次数
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在操作一定次数后没有死亡
 * YES - true     NO - false
 * @default false
 *
 * @param WinCountOverTarger
 * @parent ---胜利条件---
 * @text 操作次数
 * @desc 在操作一定次数后没有死亡
 * @default 500
 *
 *
 * @param ---失败条件---
 * @default
 *
 * @param IsFailTimeOver
 * @parent ---失败条件---
 * @text 失败条件是否包含时间超时
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在到达一定时间之后,将会失败
 * YES - true     NO - false
 * @default false
 *
 *
 * @param FailTimeOverTarger
 * @parent ---失败条件---
 * @text 超过时长
 * @desc 在到达一定时间之后,将会失败,这将以秒数作为单位
 * @default 600
 *
 *
 * @param IsFailCountOver
 * @parent ---失败条件---
 * @text 失败条件是否包含超过操作次数
 * @type boolean
 * @on YES
 * @off NO
 * @desc 操作次数到达一定值时,就会失败
 * YES - true     NO - false
 * @default false
 *
 *
 * @param FailCountOverTarger
 * @parent ---失败条件---
 * @text 超过操作次数
 * @desc 操作次数到达一定值时,就会失败
 * @default 500
 *
 *
 * @param ---特殊结束条件1---
 * @default
 *
 * @param OtherEnd1Script
 * @text 特殊情况1脚本
 * @parent ---特殊结束条件1---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param ---特殊结束条件2---
 * @default
 *
 * @param OtherEnd2Script
 * @text 特殊情况2脚本
 * @parent ---特殊结束条件2---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param ---数据设置---
 * @default
 *
 * @param List
 * @parent ---数据设置---
 * @text 格子列数
 * @type Number
 * @desc 这是游戏中格子的列数,默认标准游戏的4格宽
 * @default 4
 *
 * @param Line
 * @parent ---数据设置---
 * @text 格子行数
 * @type Number
 * @desc 这是游戏中格子的行数,默认标准游戏的4格高
 * @default 4
 *
 * @param SpawnCount
 * @parent ---数据设置---
 * @text 产生方块数量
 * @type Number
 * @desc 这是游戏中每次操作后产生新方块的数量,默认标准游戏1个
 * @default 1
 *
 *
 * @param Spawn4Rate
 * @parent ---数据设置---
 * @text 产生4的概率
 * @type Number
 * @min 0
 * @max 100
 * @desc 这是会直接产生4的概率,请填写0~100之间的整数,代表百分比,默认10
 * @default 10
 *
 * @param Spawn8Rate
 * @parent ---数据设置---
 * @text 产生8的概率
 * @type Number
 * @min 0
 * @max 100
 * @desc 这是会直接产生8的概率,请填写0~100之间的整数,代表百分比,默认0
 * @default 0
 *
 * @param Spawn16Rate
 * @parent ---数据设置---
 * @text 产生16的概率
 * @type Number
 * @min 0
 * @max 100
 * @desc 这是会直接产生16的概率,请填写0~100之间的整数,代表百分比,默认0
 * @default 0
 *
 * @param Spawn32Rate
 * @parent ---数据设置---
 * @text 产生32的概率
 * @type Number
 * @min 0
 * @max 100
 * @desc 这是会直接产生32的概率,请填写0~100之间的整数,代表百分比,默认0
 * @default 0
 *
 *
 * @param Num2To4
 * @parent ---数据设置---
 * @text 2合成4
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值2
 * @default 2
 *
 * @param Num4To8
 * @parent ---数据设置---
 * @text 4合成8
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值4
 * @default 4
 *
 * @param Num8To16
 * @parent ---数据设置---
 * @text 8合成16
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值8
 * @default 8
 *
 * @param Num16To32
 * @parent ---数据设置---
 * @text 16合成32
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值16
 * @default 16
 *
 *
 * @param Num32To64
 * @parent ---数据设置---
 * @text 32合成64
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值32
 * @default 32
 *
 * @param Num64To128
 * @parent ---数据设置---
 * @text 64合成128
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值64
 * @default 64
 *
 * @param Num128To256
 * @parent ---数据设置---
 * @text 128合成256
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值128
 * @default 128
 *
 * @param Num256To512
 * @parent ---数据设置---
 * @text 256合成512
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值256
 * @default 256
 *
 * @param Num512To1024
 * @parent ---数据设置---
 * @text 512合成1024
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值512
 * @default 512
 *
 * @param Num1024To2048
 * @parent ---数据设置---
 * @text 1024合成2048
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值1024
 * @default 1024
 *
 * @param Num2048To4096
 * @parent ---数据设置---
 * @text 2048合成4096
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值2048
 * @default 2048
 *
 * @param Num4096To8192
 * @parent ---数据设置---
 * @text 4096合成8192
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值4096
 * @default 4096
 *
 * @param Num8192To16384
 * @parent ---数据设置---
 * @text 8192合成16384
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值8192
 * @default 8192
 *
 * @param Num16384To32768
 * @parent ---数据设置---
 * @text 16384合成32768
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值16384
 * @default 16384
 *
 * @param Num32768To65536
 * @parent ---数据设置---
 * @text 32768合成65536
 * @type Number
 * @desc 这是合成的时候会获得的分数,默认值32768
 * @default 32768
 *
 *
 *
 *
 *
 *
 *
 * @param ---音效---
 * @default
 *
 * @param BkBGMName
 * @text 背景BGM名称
 * @parent ---音效---
 * @type text
 * @desc 执行小游戏时,会播放的背景bgm,BGM应放在audio/bgm文件夹中,不填写会使用GameCore插件中默认的背景音效
 * @default
 *
 * @param BkBGMVolume
 * @text 背景BGM音量
 * @parent ---音效---
 * @type Number
 * @desc 音量大小,默认100
 * @default 100
 
 * @param BkBGMPitch
 * @text 背景BGM声调
 * @parent ---音效---
 * @type Number
 * @desc 声调,默认100
 * @default 100
 
 * @param BkBGMBGSPan
 * @text 背景BGM声道
 * @parent ---音效---
 * @type Number
 * @desc 声道,默认0
 * @default 0
 *
 *
 *
 * @param MegerSound
 * @text 合成音效
 * @parent ---音效---
 * @type text
 * @desc 合成时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Item1
 
 * @param MegerVolume
 * @text 合成音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 合成时产生的音量,默认值100
 * @default 100

 * @param MegerPitch
 * @text 合成音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 合成时产生的音调,默认值100
 * @default 100

 * @param MegerPan
 * @text 合成声道
 * @parent ---音效---
 * @type number
 * @desc 合成时产生的声道,默认值0
 * @default 0
 *
 * @param WinSound
 * @text 胜利时音效
 * @parent ---音效---
 * @type text
 * @desc 胜利时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Applause1
 
 * @param WinVolume
 * @text 胜利时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 胜利时产生的音量,默认值100
 * @default 100

 * @param WinPitch
 * @text 胜利时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 胜利时产生的音调,默认值100
 * @default 100

 * @param WinPan
 * @text 胜利时声道
 * @parent ---音效---
 * @type number
 * @desc 胜利时产生的声道,默认值0
 * @default 0
 *
 *
 * @param FailSound
 * @text 失败时音效
 * @parent ---音效---
 * @type text
 * @desc 失败时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Break
 
 * @param FailVolume
 * @text 失败时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 失败时产生的音量,默认值100
 * @default 100

 * @param FailPitch
 * @text 失败时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 失败时产生的音调,默认值100
 * @default 100

 * @param FailPan
 * @text 失败时声道
 * @parent ---音效---
 * @type number
 * @desc 失败时产生的声道,默认值0
 * @default 0
 
 * @param ButtonSound
 * @text 按钮时音效
 * @parent ---音效---
 * @type text
 * @desc 按钮时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Cancel2
 
 * @param ButtonVolume
 * @text 按钮时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 按钮时产生的音量,默认值100
 * @default 100

 * @param ButtonPitch
 * @text 按钮时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 按钮时产生的音调,默认值100
 * @default 100

 * @param ButtonPan
 * @text 按钮时声道
 * @parent ---音效---
 * @type number
 * @desc 按钮时产生的声道,默认值0
 * @default 0
 *
 */
 
 
var LiuYue = LiuYue || {};
LiuYue.LiuYue_Game2048 = true;//插件启动



var Zzy = Zzy || {};
Zzy.G2048 = Zzy.G2048 || {};
Zzy.G2048.version = 1.07;  
Zzy.Parameters = PluginManager.parameters('LiuYue_Game2048');
Zzy.Param = Zzy.Param || {};
Zzy.Param.G2048 = String(Zzy.Parameters['GameName']);//启动游戏的名称

Zzy.G2048.GameCorePlugin = false;
if(LiuYue.LiuYue_GameCore)//前置插件检测
{
	Zzy.G2048.GameCorePlugin = true;
}
else
{
	console.log("Error:(来自LiuYue_Game2048):这个插件需要LiuYue_GameCore作为前置插件,请将这个插件放在核心插件下!!!");
}
 
//注册游戏
Zzy.GCF.RegisterGame(Zzy.Param.G2048,'G2048');


Zzy.Param.G2048isBlockAutoSize = eval(String(Zzy.Parameters['isBlockAutoSize']));//自动设置图片长宽


Zzy.Param.G2048WinCommon = parseInt(Zzy.Parameters['WinCommon']);//胜利事件
Zzy.Param.G2048WinScript = Zzy.Parameters['WinScript'] ? new Function(JSON.parse(Zzy.Parameters['WinScript']) + '\nreturn true;') : undefined;//胜利脚本
Zzy.Param.G2048FailCommon = parseInt(Zzy.Parameters['FailCommon']);//失败事件
Zzy.Param.G2048FailScript = Zzy.Parameters['FailScript'] ? new Function(JSON.parse(Zzy.Parameters['FailScript']) + '\nreturn true;') : undefined;//失败脚本
Zzy.Param.G2048Other1Common = parseInt(Zzy.Parameters['Other1Common']);//特殊情况1事件
Zzy.Param.G2048Other1Script = Zzy.Parameters['Other1Script'] ? new Function(JSON.parse(Zzy.Parameters['Other1Script']) + '\nreturn true;') : undefined;//特殊情况1脚本
Zzy.Param.G2048Other2Common = parseInt(Zzy.Parameters['Other2Common']);//特殊情况2事件
Zzy.Param.G2048Other2Script = Zzy.Parameters['Other2Script'] ? new Function(JSON.parse(Zzy.Parameters['Other2Script']) + '\nreturn true;') : undefined;//特殊情况2脚本
Zzy.Param.G2048SaveScoreVariable = parseInt(Zzy.Parameters['SaveScoreVariable']);//变量index
Zzy.Param.G2048SaveTimeVariable = parseInt(Zzy.Parameters['SaveTimeVariable']);//变量index



Zzy.Param.G2048PicPath = String(Zzy.Parameters['PicPath']);//图片路径

Zzy.Param.G2048BackGroundPic = String(Zzy.Parameters['BackGroundPic']);//背景图片

Zzy.Param.G2048MainNumPic = String(Zzy.Parameters['MainNumPic']);//2048图片资源名称
Zzy.Param.G2048FloorPic = String(Zzy.Parameters['FloorPic']);//底板图片名称
Zzy.Param.G2048SFloorPic = String(Zzy.Parameters['SFloorPic']);//小底板图片名称
Zzy.Param.G2048LogoPic = String(Zzy.Parameters['LogoPic']);//2048显示图片名称
Zzy.Param.G2048ExitMenuPic = String(Zzy.Parameters['ExitMenuPic']);//退出游戏菜单图片名称
Zzy.Param.G2048OkMenuPic = String(Zzy.Parameters['OkMenuPic']);//退出游戏菜单图片名称
Zzy.Param.G2048CancelMenuPic = String(Zzy.Parameters['CancelMenuPic']);//退出游戏菜单图片名称



Zzy.Param.G2048PausePic = String(Zzy.Parameters['PausePic']);//暂停游戏图片名称

Zzy.Param.G2048ExitPic = String(Zzy.Parameters['ExitPic']);//退出游戏图片名称
Zzy.Param.G2048WinPic = String(Zzy.Parameters['WinPic']);//退出游戏图片名称
Zzy.Param.G2048FailPic = String(Zzy.Parameters['FailPic']);//退出游戏图片名称

Zzy.Param.G2048ScorePic = String(Zzy.Parameters['ScorePic']);//分数图片名称
Zzy.Param.G2048HistoryPic = String(Zzy.Parameters['HistoryPic']);//历史最高图片名称
Zzy.Param.G2048CountPic = String(Zzy.Parameters['CountPic']);//操作次数图片名称
Zzy.Param.G2048TimePic = String(Zzy.Parameters['TimePic']);//时间图片名称


//------------------------------胜利条件--------------------------------
Zzy.Param.G2048IsWinMergeNumber = eval(String(Zzy.Parameters['IsWinMergeNumber']));//胜利条件是否包含合成指定数字
Zzy.Param.G2048WinMergeNumberTarget = parseInt(Zzy.Parameters['WinMergeNumberTarget']);//合成条件
Zzy.Param.G2048IsWinScoreOver = eval(String(Zzy.Parameters['IsWinScoreOver']));//胜利条件是否包含分数超过
Zzy.Param.G2048WinScoreOverTarger = parseInt(Zzy.Parameters['WinScoreOverTarger']);//胜利分数
Zzy.Param.G2048IsWinCountOver = eval(String(Zzy.Parameters['IsWinCountOver']));//胜利条件是否包含操作达到一定次数
Zzy.Param.G2048WinCountOverTarger = parseInt(Zzy.Parameters['WinCountOverTarger']);//操作次数

//------------------------------失败条件--------------------------------
Zzy.Param.G2048IsFailTimeOver = eval(String(Zzy.Parameters['IsFailTimeOver']));//失败条件是否包含时间超时
Zzy.Param.G2048FailTimeOverTarger = parseInt(Zzy.Parameters['FailTimeOverTarger']);//超过时长 
Zzy.Param.G2048IsFailCountOver = eval(String(Zzy.Parameters['IsFailCountOver']));//失败条件是否包含超过操作次数
Zzy.Param.G2048FailCountOverTarger = parseInt(Zzy.Parameters['FailCountOverTarger']);//超过操作次数 


//------------------------------特殊情况1,2脚本--------------------------------
Zzy.Param.G2048OtherEnd1Script = new Function(JSON.parse(Zzy.Parameters['OtherEnd1Script']));//结束情况1
Zzy.Param.G2048OtherEnd2Script = new Function(JSON.parse(Zzy.Parameters['OtherEnd2Script']));//结束情况2



//--------------------------------玩法数据-----------------------------------------
Zzy.Param.G2048List = parseInt(Zzy.Parameters['List']);//格子列数 
Zzy.Param.G2048Line = parseInt(Zzy.Parameters['Line']);//格子行数 
Zzy.Param.G2048SpawnCount = parseInt(Zzy.Parameters['SpawnCount']);//产生方块数量 
Zzy.Param.G2048Spawn4Rate = parseInt(Zzy.Parameters['Spawn4Rate']);//产生4的概率 
Zzy.Param.G2048Spawn8Rate = parseInt(Zzy.Parameters['Spawn8Rate']);//产生8的概率 
Zzy.Param.G2048Spawn16Rate = parseInt(Zzy.Parameters['Spawn16Rate']);//产生16的概率 
Zzy.Param.G2048Spawn32Rate = parseInt(Zzy.Parameters['Spawn32Rate']);//产生32的概率 

Zzy.Param.G2048Num2To4 = parseInt(Zzy.Parameters['Num2To4']);//2合成4 
Zzy.Param.G2048Num4To8 = parseInt(Zzy.Parameters['Num4To8']);//4合成8 
Zzy.Param.G2048Num8To16 = parseInt(Zzy.Parameters['Num8To16']);//8合成16 
Zzy.Param.G2048Num16To32 = parseInt(Zzy.Parameters['Num16To32']);//16合成32 
Zzy.Param.G2048Num32To64 = parseInt(Zzy.Parameters['Num32To64']);//32合成64 
Zzy.Param.G2048Num64To128 = parseInt(Zzy.Parameters['Num64To128']);//64合成128 
Zzy.Param.G2048Num128To256 = parseInt(Zzy.Parameters['Num128To256']);//128合成256 
Zzy.Param.G2048Num256To512 = parseInt(Zzy.Parameters['Num256To512']);//256合成512 
Zzy.Param.G2048Num512To1024 = parseInt(Zzy.Parameters['Num512To1024']);//512合成1024 
Zzy.Param.G2048Num1024To2048 = parseInt(Zzy.Parameters['Num1024To2048']);//1024合成2048 
Zzy.Param.G2048Num2048To4096 = parseInt(Zzy.Parameters['Num2048To4096']);//2048合成4096 
Zzy.Param.G2048Num4096To8192 = parseInt(Zzy.Parameters['Num4096To8192']);//4096合成8192 
Zzy.Param.G2048Num8192To16384 = parseInt(Zzy.Parameters['Num8192To16384']);//8192合成16384 
Zzy.Param.G2048Num16384To32768 = parseInt(Zzy.Parameters['Num16384To32768']);//16384合成32768 
Zzy.Param.G2048Num32768To65536 = parseInt(Zzy.Parameters['Num32768To65536']);//32768合成65536 

//存入数组
Zzy.Param.G2048NumToArr = [Zzy.Param.G2048Num2To4,Zzy.Param.G2048Num4To8,Zzy.Param.G2048Num8To16,Zzy.Param.G2048Num16To32,Zzy.Param.G2048Num32To64,Zzy.Param.G2048Num64To128,Zzy.Param.G2048Num128To256,Zzy.Param.G2048Num256To512,Zzy.Param.G2048Num512To1024,Zzy.Param.G2048Num1024To2048,Zzy.Param.G2048Num2048To4096,Zzy.Param.G2048Num4096To8192,Zzy.Param.G2048Num8192To16384,Zzy.Param.G2048Num16384To32768,Zzy.Param.G2048Num32768To65536];


Zzy.Param.G2048HighRateArr = [Zzy.Param.G2048Spawn4Rate,Zzy.Param.G2048Spawn8Rate,Zzy.Param.G2048Spawn16Rate,Zzy.Param.G2048Spawn32Rate];

Zzy.Param.G2048MegerSound = String(Zzy.Parameters['MegerSound']);//合成音效
Zzy.Param.G2048MegerVolume = Number(Zzy.Parameters['MegerVolume']);//合成音量
Zzy.Param.G2048MegerPitch = Number(Zzy.Parameters['MegerPitch']);//合成音调
Zzy.Param.G2048MegerPan = Number(Zzy.Parameters['MegerPan']);//合成声道
Zzy.Param.G2048WinSound = String(Zzy.Parameters['WinSound']);//胜利时音效
Zzy.Param.G2048WinVolume = Number(Zzy.Parameters['WinVolume']);//胜利时音量
Zzy.Param.G2048WinPitch = Number(Zzy.Parameters['WinPitch']);//胜利时音量
Zzy.Param.G2048WinPan = Number(Zzy.Parameters['WinPan']);//胜利时声道
Zzy.Param.G2048FailSound = String(Zzy.Parameters['FailSound']);//失败时音效
Zzy.Param.G2048FailVolume = Number(Zzy.Parameters['FailVolume']);//失败时音量
Zzy.Param.G2048FailPitch = Number(Zzy.Parameters['FailPitch']);//失败时音调
Zzy.Param.G2048FailPan = Number(Zzy.Parameters['FailPan']);//失败时声道
Zzy.Param.G2048ButtonSound = String(Zzy.Parameters['ButtonSound']);//按钮时音效
Zzy.Param.G2048ButtonVolume = Number(Zzy.Parameters['ButtonVolume']);//按钮时音量
Zzy.Param.G2048ButtonPitch = Number(Zzy.Parameters['ButtonPitch']);//按钮时音调
Zzy.Param.G2048ButtonPan = Number(Zzy.Parameters['ButtonPan']);//按钮时声道
 

Zzy.G2048.MakeSE = function(seName,seVolume,sePitch,sePan)
{
	if(!seName)return undefined;
	var se = {
		name:seName,
		volume:(seVolume ? seVolume : 100),
		pitch:(sePitch ? sePitch : 100),
		pan:(sePan ? sePan : 0)
	};
	return se;
}

//创造se音效
Zzy.Param.G2048MegerSoundSE = Zzy.G2048.MakeSE(Zzy.Param.G2048MegerSound,Zzy.Param.G2048MegerVolume,Zzy.Param.G2048MegerPitch,Zzy.Param.G2048MegerPan);

Zzy.Param.G2048WinSoundSE = Zzy.G2048.MakeSE(Zzy.Param.G2048WinSound,Zzy.Param.G2048WinVolume,Zzy.Param.G2048WinPitch,Zzy.Param.G2048WinPan);

Zzy.Param.G2048FailSoundSE = Zzy.G2048.MakeSE(Zzy.Param.G2048FailSound,Zzy.Param.G2048FailVolume,Zzy.Param.G2048FailPitch,Zzy.Param.G2048FailPan);

Zzy.Param.G2048ButtonSoundSE = Zzy.G2048.MakeSE(Zzy.Param.G2048ButtonSound,Zzy.Param.G2048ButtonVolume,Zzy.Param.G2048ButtonPitch,Zzy.Param.G2048ButtonPan);

Zzy.Param.G2048BkBGMName = String(Zzy.Parameters['BkBGMName']);//背景BGM名称
Zzy.Param.G2048BkBGMVolume = parseInt(Zzy.Parameters['BkBGMVolume']);//背景BGM音量
Zzy.Param.G2048BkBGMPitch = parseInt(Zzy.Parameters['BkBGMPitch']);//背景BGM声调
Zzy.Param.G2048BkBGMBGSPan = parseInt(Zzy.Parameters['BkBGMPan']);//背景BGM声道
Zzy.Param.G2048BkBGM = Zzy.G2048.MakeSE(Zzy.Param.G2048BkBGMName,Zzy.Param.G2048BkBGMVolume,Zzy.Param.G2048BkBGMPitch,Zzy.Param.G2048BkBGMBGSPan);



Zzy.G2048.pauseSpr = undefined;//记录暂停


Zzy.G2048.StaticLoadPic = function()//静态加载位图信息
{
	//Zzy.G2048.blockBitmap = ImageManager.loadPicture(Zzy.Param.G2048MainNumPic);
	Zzy.G2048.blockBitmap = ImageManager.loadBitmap(Zzy.Param.G2048PicPath,Zzy.Param.G2048MainNumPic,undefined,true);
}


Zzy.G2048.blockBitmap = undefined;//原图
Zzy.G2048.blockBitmapArr = [];//缓存2048的16个bitmap
Zzy.G2048.StaticLoadPic();

Zzy.G2048.WindowPointer = undefined;//窗口指针


//条件文字
Zzy.G2048.ConditionTextArr = [
'',
'',
'',
'',
'',
''
];

//因为图片的位置信息不好定位,所以把每个图片的信息放在这里方便调节
//首先是对图片资源的介绍,以下单位均以xp(像素)为单位
/*
2048的16个方块图片规格       328 * 328
2048Logo图片规格             171 * 56
暂停的图片规格               816 * 642(默认全屏)
2048装方块底板图片规格       360 * 360
2048每个方块底板图片规格      82 * 82
取消,退出,确认按钮图片规格   101 * 44
次数时间分数历史图片规格      60 * 60
胜利失败退出UI界面图片规格   260 * 300

----------需要修改自我调节-----------
注意背景图和背景音乐是在GameCore中进行设置
*/



//===============================================================================================
//Game_System
//===============================================================================================
Zzy.G2048.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.G2048.Game_System_initialize.call(this);
	this.ZzyG2048InitData();//初始化数据
};

Game_System.prototype.ZzyG2048InitData = function()
{
	//初始化参数信息
	this._ZzyG2048List = Zzy.Param.G2048List;//格子列数 
	this._ZzyG2048Line = Zzy.Param.G2048Line;//格子行数 
	this._ZzyG2048SpawnCount = Zzy.Param.G2048SpawnCount;//产生方块数量 
	
	this._ZzyG2048IsWinMergeNumber = Zzy.Param.G2048IsWinMergeNumber;//胜利条件是否包含合成指定数字
	
	this._ZzyG2048WinMergeNumber = Zzy.Param.G2048WinMergeNumberTarget;//合成条件
	this._ZzyG2048IsWinScoreOver = Zzy.Param.G2048IsWinScoreOver;//胜利条件是否包含分数超过
	this._ZzyG2048WinScoreOver = Zzy.Param.G2048WinScoreOverTarger;//胜利分数
	this._ZzyG2048IsWinCountOver = Zzy.Param.G2048IsWinCountOver;//胜利条件是否包含操作达到一定次数
	this._ZzyG2048WinCountOver = Zzy.Param.G2048WinCountOverTarger;//操作次数
	
	this._ZzyG2048IsFailTimeOver = Zzy.Param.G2048IsFailTimeOver;//失败条件是否包含时间超时
	this._ZzyG2048FailTimeOver = Zzy.Param.G2048FailTimeOverTarger;//超过时长
	this._ZzyG2048IsFailCountOver = Zzy.Param.G2048IsFailCountOver;//失败条件是否包含超过操作次数
	this._ZzyG2048FailCountOver = Zzy.Param.G2048FailCountOverTarger;//超过操作次数
 
	this._ZzyG2048NumToArr = [];//得分数组
	var Len1 = Zzy.Param.G2048NumToArr.length;
	for(var i=0;i<Len1;i++){this._ZzyG2048NumToArr[i] = Zzy.Param.G2048NumToArr[i];}
	
	this._ZzyG2048HighRateArr = [];//概率数组
	var Len2 = Zzy.Param.G2048HighRateArr.length;
	for(var i=0;i<Len2;i++){this._ZzyG2048HighRateArr[i] = Zzy.Param.G2048HighRateArr[i];}
	
	
	this._ZzyG2048HighScore = 0;//最高分数
}


Game_System.prototype.GetZzyG2048List = function()
{
	if(this._ZzyG2048List === undefined)
	{this._ZzyG2048List = Zzy.Param.G2048List;}
	return this._ZzyG2048List;
}

Game_System.prototype.SetZzyG2048List = function(value)
{
	this._ZzyG2048List = value;
}


Game_System.prototype.GetZzyG2048Line = function()
{
	if(this._ZzyG2048Line === undefined)
	{this._ZzyG2048Line = Zzy.Param.G2048Line;}
	return this._ZzyG2048Line;
}

Game_System.prototype.SetZzyG2048Line = function(value)
{
	this._ZzyG2048Line = value;
}

Game_System.prototype.GetZzyG2048SpawnCount = function()
{
	if(this._ZzyG2048SpawnCount === undefined)
	{this._ZzyG2048SpawnCount = Zzy.Param.G2048SpawnCount;}
	return this._ZzyG2048SpawnCount;
}

Game_System.prototype.SetZzyG2048SpawnCount = function(value)
{
	this._ZzyG2048SpawnCount = value;
}


Game_System.prototype.GetZzyG2048IsWinMergeNumber = function()
{
	if(this._ZzyG2048IsWinMergeNumber === undefined)
	{this._ZzyG2048IsWinMergeNumber = Zzy.Param.G2048IsWinMergeNumber;}
	return this._ZzyG2048IsWinMergeNumber;
}

Game_System.prototype.SetZzyG2048IsWinMergeNumber = function(value)
{
	this._ZzyG2048IsWinMergeNumber = value;
}

Game_System.prototype.GetZzyG2048WinMergeNumber = function()
{
	if(this._ZzyG2048WinMergeNumber === undefined)
	{this._ZzyG2048WinMergeNumber = Zzy.Param.G2048WinMergeNumberTarget;}
	return this._ZzyG2048WinMergeNumber;
}

Game_System.prototype.SetZzyG2048WinMergeNumber = function(value)
{
	this._ZzyG2048WinMergeNumber = value;
}


Game_System.prototype.GetZzyG2048IsWinScoreOver = function()
{
	if(this._ZzyG2048IsWinScoreOver === undefined)
	{this._ZzyG2048IsWinScoreOver = Zzy.Param.G2048IsWinScoreOver;}
	return this._ZzyG2048IsWinScoreOver;
}

Game_System.prototype.SetZzyG2048IsWinScoreOver = function(value)
{
	this._ZzyG2048IsWinScoreOver = value;
}

Game_System.prototype.GetZzyG2048WinScoreOver = function()
{
	if(this._ZzyG2048WinScoreOver === undefined)
	{this._ZzyG2048WinScoreOver = Zzy.Param.G2048WinScoreOverTarger;}
	return this._ZzyG2048WinScoreOver;
}

Game_System.prototype.SetZzyG2048WinScoreOver = function(value)
{
	this._ZzyG2048WinScoreOver = value;
}



Game_System.prototype.GetZzyG2048IsWinCountOver = function()
{
	if(this._ZzyG2048IsWinCountOver === undefined)
	{this._ZzyG2048IsWinCountOver = Zzy.Param.G2048IsWinCountOver;}
	return this._ZzyG2048IsWinCountOver;
}

Game_System.prototype.SetZzyG2048IsWinCountOver = function(value)
{
	this._ZzyG2048IsWinCountOver = value;
}

Game_System.prototype.GetZzyG2048WinCountOver = function()
{
	if(this._ZzyG2048WinCountOver === undefined)
	{this._ZzyG2048WinCountOver = Zzy.Param.G2048WinCountOverTarger;}
	return this._ZzyG2048WinCountOver;
}

Game_System.prototype.SetZzyG2048WinCountOver = function(value)
{
	this._ZzyG2048WinCountOver = value;
}

Game_System.prototype.GetZzyG2048IsFailTimeOver = function()
{
	if(this._ZzyG2048IsFailTimeOver === undefined)
	{this._ZzyG2048IsFailTimeOver = Zzy.Param.G2048IsFailTimeOver;}
	return this._ZzyG2048IsFailTimeOver;
}

Game_System.prototype.SetZzyG2048IsFailTimeOver = function(value)
{
	this._ZzyG2048IsFailTimeOver = value;
}

Game_System.prototype.GetZzyG2048FailTimeOver = function()
{
	if(this._ZzyG2048FailTimeOver === undefined)
	{this._ZzyG2048FailTimeOver = Zzy.Param.G2048FailTimeOverTarger;}
	return this._ZzyG2048FailTimeOver;
}

Game_System.prototype.SetZzyG2048FailTimeOver = function(value)
{
	this._ZzyG2048FailTimeOver = value;
}

Game_System.prototype.GetZzyG2048IsFailCountOver = function()
{
	if(this._ZzyG2048IsFailCountOver === undefined)
	{this._ZzyG2048IsFailCountOver = Zzy.Param.G2048IsFailCountOver;}
	return this._ZzyG2048IsFailCountOver;
}

Game_System.prototype.SetZzyG2048IsFailCountOver = function(value)
{
	this._ZzyG2048IsFailCountOver = value;
}

Game_System.prototype.GetZzyG2048FailCountOver = function()
{
	if(this._ZzyG2048FailCountOver === undefined)
	{this._ZzyG2048FailCountOver = Zzy.Param.G2048FailCountOverTarger;}
	return this._ZzyG2048FailCountOver;
}

Game_System.prototype.SetZzyG2048FailCountOver = function(value)
{
	this._ZzyG2048FailCountOver = value;
}

Game_System.prototype.GetZzyG2048NumToArr = function()
{
	if(this._ZzyG2048NumToArr === undefined)
	{
		this._ZzyG2048NumToArr = [];
		var Len1 = Zzy.Param.G2048NumToArr.length;
		for(var i=0;i<Len1;i++){this._ZzyG2048NumToArr[i] = Zzy.Param.G2048NumToArr[i];}		
	}
	return this._ZzyG2048NumToArr;
}

Game_System.prototype.GetZzyG2048HighRateArr = function()
{
	if(this._ZzyG2048HighRateArr === undefined)
	{
		this._ZzyG2048HighRateArr = [];//概率数组
		var Len2 = Zzy.Param.G2048HighRateArr.length;
		for(var i=0;i<Len2;i++){this._ZzyG2048HighRateArr[i] = Zzy.Param.G2048HighRateArr[i];}		
	}
	return this._ZzyG2048HighRateArr;
}


Game_System.prototype.GetZzyG2048HighScore = function()
{
	if(this._ZzyG2048HighScore === undefined)
	{this._ZzyG2048HighScore = 0;}
	return this._ZzyG2048HighScore;
}

Game_System.prototype.SetZzyG2048HighScore = function(score)
{
	this._ZzyG2048HighScore = score;//最高分数
}


//=========================================================================================
//Game_Interpreter
//=========================================================================================

Zzy.G2048.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Zzy.G2048.Game_Interpreter_pluginCommand.call(this,command,args);

	if(command === 'ZzyG2048')
	{
		this.ZzyG2048Command(args);
	}

}

Game_Interpreter.prototype.ZzyG2048Command = function(args)
{
	var command = String(args[0]);
	
	switch(command)
	{
		case 'MergeScore'://这是设置每级别合成的得分,最多到x16,如果没设置全则不会对以后的分数改变
		
		var arr = $gameSystem.GetZzyG2048NumToArr();
		for(var i=0;i<16;i++)
		{
			var s = args[i+1];
			var score = 0;
			if(!s)continue;
			else score = parseInt(s);	
			arr[i] = score;
		}
		
		break;
		
		case 'MergeScoreNumber':
		var num = parseInt(args[1]);
		var score = parseInt(args[2]);
		Zzy.G2048.MergeScore(num,score);
		break;
		
		case 'HighRate'://这是设置出现4 8 16 32这四种特殊方块的概率,请填写0~100之间的整数
		var r4 = parseInt(args[1]);
		var r8 = parseInt(args[2]); 
		var r16 = parseInt(args[3]); 
		var r32 = parseInt(args[4]); 
		Zzy.G2048.HighRate(r4,r8,r16,r32);
		break;
		
		case 'List'://这是设置列项的数量,请勿在游戏中使用这条命令
		var list = parseInt(args[1]); 
		Zzy.G2048.List(list);
		break;
		
		case 'Line'://这是设置行项的数量,请勿在游戏中使用这条命令
		var line = parseInt(args[1]); 
		Zzy.G2048.Line(line);
		break;
		
		case 'SpawnCount'://这将修改每次操作后,出现新的方块的个数
		var spawnCount = parseInt(args[1]);
		Zzy.G2048.SpawnCount(spawnCount);
		break;
		
		case 'IsWinMergeNumber'://这将设置胜利条件--合成指定的方块
		var isEnable = eval(args[1]);
		Zzy.G2048.IsWinMergeNumber(isEnable);
		break;
		
		case 'IsWinScoreOver'://这将设置胜利条件--到达制定分数
		var isEnable = eval(args[1]); 
		Zzy.G2048.IsWinScoreOver(isEnable);
		break;
		
		case 'IsWinCountOver'://这将设置胜利条件--操作指定次数
		var isEnable = eval(args[1]); 
		Zzy.G2048.IsWinCountOver(isEnable);
		break;
		
		case 'IsFailTimeOver'://这将设置失败条件--超时
		var isEnable = eval(args[1]); 
		Zzy.G2048.IsFailTimeOver(isEnable);
		break;
		
		case 'IsFailCountOver'://这将设置失败条件--操作次数超标
		var isEnable = eval(args[1]); 
		Zzy.G2048.IsFailCountOver(isEnable);
		break;
		
		case 'WinMergeNumber'://这将设置合出方块的胜利条件
		var block = parseInt(args[1]); 
		Zzy.G2048.WinMergeNumber(block);
		break;
		
		case 'WinScoreOver'://这将设置完成分数的胜利条件
		var score = parseInt(args[1]); 
		Zzy.G2048.WinScoreOver(score);
		break;
		
		case 'WinCountOver'://这将设置操作一定次数的胜利条件
		var count = parseInt(args[1]);
		Zzy.G2048.WinCountOver(count);		
		break;
		
		case 'FailTimeOver'://这将设置超时的失败条件
		var time = parseInt(args[1]); 
		Zzy.G2048.FailTimeOver(time);
		break;
		
		case 'FailCountOver'://这将设置超出操作次数的失败条件
		var count = parseInt(args[1]);
		Zzy.G2048.FailCountOver(count);
		break;
	}
}





//=========================================================================================
//Scene_ZzyGCFG2048
//=========================================================================================
function Scene_ZzyGCFG2048() 
{
    this.initialize.apply(this, arguments);
}

Scene_ZzyGCFG2048.prototype = Object.create(Scene_ZzyGCFGame.prototype);
Scene_ZzyGCFG2048.prototype.constructor = Scene_ZzyGCFG2048;

Scene_ZzyGCFG2048.prototype.initialize = function() 
{
    Scene_ZzyGCFGame.prototype.initialize.call(this);

};

Scene_ZzyGCFG2048.prototype.terminate = function()//退出时 
{
	Scene_ZzyGCFGame.prototype.terminate.call(this);
	
	this.G2048ClearData();//清理数据
	
	//存储分数和时间到额外变量
	this.SettlementExGame();//结算数据信息

	
};

Scene_ZzyGCFG2048.prototype.SettlementExGame = function()
{
	var globalInfo = $gameSystem.getZzyGCFGameGlobal()
	var tempCommonId = 0;
	var tempScript = undefined;
	switch(globalInfo.result)
	{
		case 'win'://胜利时
		tempCommonId = Zzy.Param.G2048WinCommon;
		tempScript = Zzy.Param.G2048WinScript;
		break;
		case 'fail'://失败时
		tempCommonId = Zzy.Param.G2048FailCommon;
		tempScript = Zzy.Param.G2048FailScript;
		break;
		case 'other1'://特殊情况1
		tempCommonId = Zzy.Param.G2048Other1Common;
		tempScript = Zzy.Param.G2048Other1Script;
		break;
		case 'other2'://特殊情况2
		tempCommonId = Zzy.Param.G2048Other2Common;
		tempScript = Zzy.Param.G2048Other2Script;
		break;
	}
	//修改结算信息
	Zzy.GCF.tempCommonId = tempCommonId === 0 ? Zzy.GCF.tempCommonId : tempCommonId;
	Zzy.GCF.tempScript = tempScript === undefined ? Zzy.GCF.tempScript : tempScript;
	if(Zzy.Param.G2048SaveScoreVariable){$gameVariables.setValue(Zzy.Param.G2048SaveScoreVariable,globalInfo.score);}
	if(Zzy.Param.G2048SaveTimeVariable){$gameVariables.setValue(Zzy.Param.G2048SaveTimeVariable,globalInfo.time);}
}

Scene_ZzyGCFG2048.prototype.G2048ClearData = function()
{
	Zzy.G2048.WindowPointer = undefined;//窗口指针
	
	//清理缓存池
}

Scene_ZzyGCFG2048.prototype.requestBkBitmap = function()//申请背景图
{
	//满足条件存在图片名称同时游戏关卡名称正确
	if(!!Zzy.Param.G2048BackGroundPic)
	{
		var picName = Zzy.Param.G2048BackGroundPic;
		var hue = $gameSystem.GetZzyGCFBkHue();
		//this._backgroundSprite.bitmap = ImageManager.loadPicture(picName,hue); 
		this._backgroundSprite.bitmap = ImageManager.loadBitmap(Zzy.Param.G2048PicPath,picName,undefined,true);
		this._backgroundSprite.move(0,0,Graphics.boxWidth,Graphics.boxHeight);		
	}
	else
	{
		Scene_ZzyGCFGame.prototype.requestBkBitmap.call(this);
	}
	
}


Scene_ZzyGCFG2048.prototype.PlayBkBGM = function()//播放音乐
{
	//修改播放声音
	if(Zzy.Param.G2048BkBGMName)
	{AudioManager.replayBgm(Zzy.Param.G2048BkBGM);}	
	else
	{Scene_ZzyGCFGame.prototype.PlayBkBGM.call(this);}
}




//=========================================================================================
//Window_ZzyGCFG2048
//=========================================================================================

function Window_ZzyGCFG2048() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFG2048.prototype = Object.create(Window_ZzyGCFBase.prototype);
Window_ZzyGCFG2048.prototype.constructor = Window_ZzyGCFG2048;

Window_ZzyGCFG2048.prototype.initialize = function() 
{
	//初始化
    Window_ZzyGCFBase.prototype.initialize.call(this);
	//获得游戏数据
	// this.gameData = $gameSystem.getZzyGCFGameData();
	// this.gameGlobal = $gameSystem.getZzyGCFGameGlobal();
	// this.scene = SceneManager._scene;//获取全部的数值
	// this.UI							//UI窗口

	Zzy.G2048.ReloadG2048BitmapArr();//加载位图缓存
	Zzy.G2048.WindowPointer = this;//赋予窗口指针
	
	//游戏中固定位置的数据信息:
	
	this.StandardHeight = Math.min(Graphics.boxWidth,Graphics.boxHeight);//最小范围,防止越界
	
	
	this.centerX = Math.floor(Graphics.boxWidth / 2);
	this.centerY = Math.floor(Graphics.boxHeight / 2);

	this.Line = $gameSystem.GetZzyG2048Line();
	this.List = $gameSystem.GetZzyG2048List();
	this.StandardLine = Math.max(this.List,this.Line);
	this.ScaleRate = 4 / this.StandardLine;//4为标准
	
	
	this.blockBkSpr = new Sprite_ZzyG2048Base(this.centerX,this.centerY + this.centerY / 3,Zzy.Param.G2048FloorPic);
	
	this.blockBkSpr.opacity = 0;
	this.blockBkSpr.OpacityToOfTime(255,60);
	
	
	this.addChild(this.blockBkSpr);	

	this.blockSBkSpr = [];
	
	
	for(var i=0;i<this.Line;i++)
	{
		this.blockSBkSpr[i] = [];
		for(var j=0;j<this.List;j++)
		{
			var x = (j-this.List/2) * 90 + 45;
			var y = (i-this.Line/2) * 90 + 45;
			if(Zzy.Param.G2048isBlockAutoSize)
			{
				x *= this.ScaleRate;
				y *= this.ScaleRate;
			}

			x += this.centerX;
			y += (this.centerY + this.centerY / 3);
			
			//var x = this.centerX + ((j-this.List/2) * 90 + 45)*this.ScaleRate;
			//var y = this.centerY + ((i-this.Line/2) * 90 + 45)*this.ScaleRate + 

			this.blockSBkSpr[i][j] = new Sprite_ZzyG2048Base(x,y,Zzy.Param.G2048SFloorPic);
			
			this.blockSBkSpr[i][j].scale.x = 0;
			this.blockSBkSpr[i][j].scale.y = 0;
			this.blockSBkSpr[i][j].ScaleToOfPer(1,1,10);
			this.blockSBkSpr[i][j].setDelay(30);			
			this.addChild(this.blockSBkSpr[i][j]);
			
			if(Zzy.Param.G2048isBlockAutoSize)
			{this.blockSBkSpr[i][j].setScaleZoom(this.ScaleRate,this.ScaleRate);}
			
		}
	}


	this.block2048Logo = new Sprite_ZzyG2048Base(this.centerX - this.StandardHeight / 7,this.centerY - this.StandardHeight / 4,Zzy.Param.G2048LogoPic);
	
	this.menuExitButton = new Sprite_ZzyG2048Button(this.centerX + this.StandardHeight / 5,this.centerY - this.StandardHeight / 5,Zzy.Param.G2048ExitMenuPic,0,1);	
	
	this.scoreSpr = new Sprite_ZzyG2048Base(this.centerX + this.StandardHeight / 8,this.centerY - this.StandardHeight / 2.3,Zzy.Param.G2048ScorePic);
	
	this.historySpr = new Sprite_ZzyG2048Base(this.centerX + this.StandardHeight / 4,this.centerY - this.StandardHeight / 2.3,Zzy.Param.G2048HistoryPic);
	
	this.countSpr = new Sprite_ZzyG2048Base(this.centerX + this.StandardHeight / 8,this.centerY - this.StandardHeight / 3,Zzy.Param.G2048CountPic);
	
	this.timeSpr = new Sprite_ZzyG2048Base(this.centerX + this.StandardHeight / 4,this.centerY - this.StandardHeight / 3,Zzy.Param.G2048TimePic);
	
	var sprArr = [this.block2048Logo,this.menuExitButton,this.scoreSpr,this.historySpr,this.countSpr,this.timeSpr];
	
	var sprArrLen = sprArr.length;
	for(var i=0;i<sprArrLen;i++)
	{
		sprArr[i].y -= this.StandardHeight / 2;
		
		sprArr[i].MoveToOfPer(sprArr[i].x,sprArr[i].y+this.StandardHeight / 2,10);
		sprArr[i].setDelay(30);
	}
	
	
	this.addChild(this.block2048Logo)
	this.addChild(this.menuExitButton);
	this.addChild(this.scoreSpr);
	this.addChild(this.historySpr);
	this.addChild(this.countSpr);
	this.addChild(this.timeSpr);

	this.dynScore = 0;//动态分数
	this.operaterCount = 0;//操作次数
	
	
	//等待游戏开始
	this.isCanControl = false;
	this.isPauseDown = false;//暂停是否按下
	this.waitTimeControl = 0;
	this.gameStage = 0;//游戏阶段
	this.waitStart = 0;
	
	
	
	//游戏数据:
	this.blockPosArr = [];//存放每个点的位置信息情况
	
	this.managerObj = [];//管理对象组,管理有效的对象组
	
	this.isBlockReady = false;//所有方块准备完成,可以操作
	this.isUpdateblockArr = false;//是否更新UpdateblockArr中的数据信息
	
	for(var i=0;i<this.Line;i++)
	{
		this.blockPosArr[i] = [];
		for(var j=0;j<this.List;j++)
		{
			this.blockPosArr[i][j] = {x:this.blockSBkSpr[i][j].x,y:this.blockSBkSpr[i][j].y};	
		}
	}
	
	this.needSpawnBlock = false;//是否需要生产新的方块
	this.megerBlockArr = [];//合并方块队,用于执行进行合并的方块队列
	this.anySpawnBlockCount = $gameSystem.GetZzyG2048SpawnCount();//每次生产方块的数量
	this.isDataChange = false;//数据是否发生变化,这关乎能否产生新的元素
	this.needFailJudg = false;//每次生产方块后要进行失败判断
	
	
	//胜利条件
	this.isWinOfNumber = false;
	this.winOfNumber = 0;
	this.winOfRank = 0;//胜利的等级
	this.currentRank = 0;//目前等级
	this.isWinOfScore = false;
	this.winOfScore = 0;
	this.isWinOfCount = false;
	this.winOfCount = 0;
	//失败条件
	this.isFailOfTime = false;
	this.failOfTime = 0;
	this.isFailOfCount = false;
	this.failOfCount = 0;
	
	
	//创建文字位图
	this.scoreTextSpr = Zzy.GCF.CreateEmptyTextSpr(60,60);
	this.countTextSpr = Zzy.GCF.CreateEmptyTextSpr(60,60);
	this.timeTextSpr = Zzy.GCF.CreateEmptyTextSpr(60,60);
	this.historyTextSpr = Zzy.GCF.CreateEmptyTextSpr(60,60);
	
	this.addChild(this.scoreTextSpr);
	this.addChild(this.countTextSpr);
	this.addChild(this.timeTextSpr);
	this.addChild(this.historyTextSpr);
	
	
	this.scoreTextSpr.bitmap.fontSize = this.InfoTextSize();
	this.countTextSpr.bitmap.fontSize = this.InfoTextSize();
	this.timeTextSpr.bitmap.fontSize = this.InfoTextSize();
	this.historyTextSpr.bitmap.fontSize = this.InfoTextSize();
	
	

	
	//胜利与失败条件的显示
	this.gameConditionSpr = Zzy.GCF.CreateEmptyTextZzySpr(256,256);//游戏结束条件显示
	this.addChild(this.gameConditionSpr);
	
	this.gameCondition = [];
	this.gameConditionNum = [];
	this.startGame();//开始游戏
	

};





Window_ZzyGCFG2048.prototype.startGame = function()//开始游戏
{
	this.waitTimeControl = 120;
	this.waitStart = 80;
	this.isCanControl = false;
	this.isDataChange = false;
	this.gameStage = 1;//1代表游戏未开始前的准备
	
	this.isWinOfNumber = $gameSystem.GetZzyG2048IsWinMergeNumber();
	this.winOfNumber = $gameSystem.GetZzyG2048WinMergeNumber();
	//将WinOfNumber转换成rank
	this.winOfRank = this.NumberToRank(this.winOfNumber);

	this.isWinOfCount = $gameSystem.GetZzyG2048IsWinCountOver();
	this.winOfCount = $gameSystem.GetZzyG2048WinCountOver();
	
	this.isWinOfScore = $gameSystem.GetZzyG2048IsWinScoreOver();
	this.winOfScore = $gameSystem.GetZzyG2048WinScoreOver();
	
	this.isFailOfTime = $gameSystem.GetZzyG2048IsFailTimeOver();
	this.failOfTime = $gameSystem.GetZzyG2048FailTimeOver() * 60;//以秒为单位
	
	this.isFailOfCount = $gameSystem.GetZzyG2048IsFailCountOver();
	this.failOfCount = $gameSystem.GetZzyG2048FailCountOver();
	
	//绘制游戏结束条件文本

	this.gameCondition = [
	this.isWinOfNumber,
	this.isWinOfScore,
	this.isWinOfCount,
	this.isFailOfTime,
	this.isFailOfCount];
	
	this.gameConditionNum = [
	this.winOfNumber,
	this.winOfScore,
	this.winOfCount,
	Math.floor(this.failOfTime/60),
	this.failOfCount];		
	
	
	
	this.gameConditionSpr.x = Math.floor(this.centerX * 8 / 9);
	this.gameConditionSpr.y = Math.floor(this.centerY / 11);
	
	var condLen = this.gameCondition.length;
	var condCount = 0;
	var condText = '';
	
	
	this.gameConditionSpr.bitmap.fontSize = this.ConditionTextSize();
	this.gameConditionSpr.blendMode = Graphics.BLEND_NORMAL;
	this.gameConditionSpr.bitmap.outlineColor = 'rgba(240,60,60,1)';
	this.gameConditionSpr.opacity = 180;
	for(var i=0;i<condLen;i++)
	{
		if(this.gameCondition[i])//条件开启
		{
			condText = Zzy.G2048.ConditionTextArr[i+1] + this.gameConditionNum[i];
			this.gameConditionSpr.bitmap.drawText(condText,3,condCount * (this.ConditionTextSize()+4),256,256,'left');
			condCount++;
		}
	}
	//最终失败条件
	condText = Zzy.G2048.ConditionTextArr[0];
	this.gameConditionSpr.bitmap.drawText(condText,3,condCount * (this.ConditionTextSize()+4),256,256,'left');
	
	
	this.gameConditionSpr.anchor.x = 0;
	this.gameConditionSpr.x -= Math.floor(this.gameConditionSpr.bitmap.width / 2);
	this.gameConditionSpr.scale.x = 0;
	this.gameConditionSpr.ScaleToOfTime(1,1,30);
	this.gameConditionSpr.setDelay(120);
}

Window_ZzyGCFG2048.prototype.NumberToRank = function(num)//转换
{
	var rank = 0;
	
	var numArr = [2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536];
	var len = numArr.length;
	for(var i=0;i<len;i++)
	{
		if(num <= numArr[i])
		{
			rank = i;
			break;
		}
	}
	
	return rank;
}


Window_ZzyGCFG2048.prototype.update = function() //作为子类的扩充
{
    Window_ZzyGCFBase.prototype.update.call(this);//刷新

	this.updateData();//更新数据
	this.drawData();//绘制游戏数据
};


Window_ZzyGCFG2048.prototype.spawnANewBlock = function()//创造一个新的方块
{
	//规则,方块创造失败代表格子被填满,这会导致游戏结束,以失败告终
	
	var emptyArr = this.HaveEmptyBlock();//返回空的内容

	if(!emptyArr.length){return false;}//无法创建
	var emptyArrLen = emptyArr.length;

	var rIndex = Math.floor(Math.random()*emptyArrLen);
	
	var x = emptyArr[rIndex].x;
	var y = emptyArr[rIndex].y;
	//计算为特殊方块的概率
	var heRateArr = $gameSystem.GetZzyG2048HighRateArr();
	var heRaLen = heRateArr.length;
	
	var rateRand = Math.floor(Math.random() * 100);
	var rank = 0;//等级
	var tempRange = 0;//范围
	for(var i=0;i<heRaLen;i++)
	{
		tempRange += heRateArr[i];
		if(rateRand <= tempRange)
		{rank = i+1;break;}//获取等级
	}

	//0级代表2   1级代表4    2级代表8    3级代表16
	var tempBlock = this.AutoNewBlock(x,y,rank);//申请一个新的方块并加入管理
	tempBlock.startRun();//开始有效
	//对应位置设置数据的等级
	
	return true;
}

Window_ZzyGCFG2048.prototype.AutoNewBlock = function(x,y,rank)
{
	
	var len = this.managerObj.length;
	var isHaveFree = false;
	
	for(var i=0;i<len;i++)
	{
		if(this.managerObj[i].isDiscard)//如果是遗弃，回收
		{	
			this.managerObj[i].setRank(rank);
			this.managerObj[i].isDiscard = false;//消除遗弃
			this.managerObj[i].setNewPos(x,y);
			return this.managerObj[i];
		}
	}
	
	var tempObj = new Sprite_ZzyG2048Block(x,y,rank,len);
	this.managerObj.push(tempObj);//压入数据
	
	tempObj.scale.x = 1;
	tempObj.scale.y = 1;
	
	if(Zzy.Param.G2048isBlockAutoSize)
	{tempObj.setScaleZoom(this.ScaleRate,this.ScaleRate);}	
	
	
	this.addChild(tempObj);
	return tempObj;
}


Window_ZzyGCFG2048.prototype.HaveEmptyBlock = function()
{
	//创造映射
	var map = [];
	for(var i=0;i<this.Line;i++)
	{
		map[i] = [];
		for(var j=0;j<this.List;j++)
		{map[i][j] = false;}
	}
	
	var len = this.managerObj.length;
	for(var i=0;i<len;i++)//有方块被占用
	{
		var obj = this.managerObj[i];
		map[obj.indexY][obj.indexX] = true;
	}
	
	var emptyArr = [];
	for(var i=0;i<this.Line;i++)
	{
		for(var j=0;j<this.List;j++)
		{
			if(!map[i][j])
			{
				var pt = {x:j,y:i};
				emptyArr.push(pt);
			}
		}
	}
	return emptyArr;
}


Window_ZzyGCFG2048.prototype.updateData = function()
{
	this.updatedynScore();//动态增分

	switch(this.gameStage)
	{
		case 1:this.Stage1();break;
		case 2:this.Stage2();break;
		case 3:this.Stage3();break;//游戏结束,结算
		case 4:this.Stage4();break;//选择结束
	}

}

Window_ZzyGCFG2048.prototype.Stage1 = function()
{
	if(!this.isCanControl)//键盘输入检测
	{
		this.waitTimeControl--;
		if(this.waitTimeControl <= 0)
		{
			this.waitTimeControl = 0;
			this.isCanControl = true;
		}
	}	
	
	if(this.waitStart > 0)
	{
		this.waitStart--;
	}
	else
	{
		if(this.isCanControl)
		{this.Stage1ToStage2();}
	}
}

Window_ZzyGCFG2048.prototype.Stage1ToStage2 = function()//转场
{
	this.gameStage = 2;//执行游戏开始
	this.needSpawnBlock = true;//需要刷新
	this.isUpdateblockArr = true;//需要更新
	this.spawnANewBlock();//因为刚刚开始时,游戏会额外创造一个方块
}


Window_ZzyGCFG2048.prototype.Stage2 = function()
{
	//Result代表结果 win胜利 fail失败 other1其他情况1 other2其他情况2
	if(this.isWin())//游戏条件判断
	{
		//游戏胜利
		this.gameStage = 3;
		this.gameGlobal.result = 'win';
		this.UI.CallResultRecord();//呼叫结束记录菜单
	}
	else if(this.isFail())//失败条件
	{
		this.gameStage = 3;
		this.gameGlobal.result = 'fail';
		this.UI.CallResultRecord();//呼叫结束记录菜单
	}
	else if(this.isSpecial1())//特殊情况
	{
		this.gameStage = 3;
		this.gameGlobal.result = 'other1';
		this.UI.CallResultRecord();//呼叫结束记录菜单
	}
	else if(this.isSpecial2())
	{
		this.gameStage = 3;
		this.gameGlobal.result = 'other2';
		this.UI.CallResultRecord();//呼叫结束记录菜单
	}

	if(this.needSpawnBlock)
	{
		this.needSpawnBlock = false;
		for(var i=0;i<this.anySpawnBlockCount;i++)
		{
			this.spawnANewBlock();//创造方块
		}
		this.needFailJudg = true;//需要失败判断,是否挤满
	}
	//判断所有的方块是否都准备完成,那么可以用键盘和鼠标操作
	if(this.AllBlockReady())
	{
		if(this.needFailJudg)
		{
			this.needFailJudg = false;
			if(this.isCannotOperate())//判断是否无法操作
			{
				this.gameStage = 3;
				this.gameGlobal.result = 'fail';
				this.UI.CallResultRecord(60);//呼叫结束记录菜单
			}
		}
		this.isCanControl = true;
		this.isBlockReady = true;
		//对方块进行合并
		var meLen = this.megerBlockArr.length;
		for(var i=0;i<meLen;i++)
		{
			var meKey = this.megerBlockArr[i];
			//加分
			this.gameGlobal.score += $gameSystem.GetZzyG2048NumToArr()[this.managerObj[meKey.b2].rank];
			
			this.managerObj[meKey.b2].setDiscard();//遗弃
			this.managerObj[meKey.b1].LevelUp();//升级
			this.currentRank = Math.max(this.currentRank,this.managerObj[meKey.b1].rank);
		}
		//播放合并音效
		if(meLen)
		{
			Zzy.G2048.PlaySE(1);
			
		}
		
		
		this.megerBlockArr = [];//清空合并组
		if(this.isDataChange)
		{
			this.needSpawnBlock = true;
			this.isDataChange = false;
		}
		
	}
	else//键盘失效
	{
		this.isCanControl = false;
	}
	
	
	if(this.gameGlobal.isRunning)
	{this.gameGlobal.time++;}

}

Window_ZzyGCFG2048.prototype.Stage3 = function()
{
	this.isCanControl = false;//不可操作
	
	//到达游戏结束的界面
	if(this.UI.isResultMenu)
	{
		
		if(this.UI.resultMenuDelay > 0)
		{this.UI.resultMenuDelay--;}
		else
		{
			
			this.UI.resultMenuDelay  = 0;
			this.UI.isResultMenu = false;
			
			this.gameData[1] = this.operaterCount;//操作次数
			this.gameData[2] = $gameSystem.GetZzyG2048HighScore();//最大分数
			
			this.UI.CallResultInterface();//呼叫结算界面
		}
		
	}
	
}


Window_ZzyGCFG2048.prototype.isCannotOperate = function()
{
	//判断是否挤满导致无法操作
	var tempNumArr = [];
	
	for(var i=0;i<this.Line;i++)
	{
		tempNumArr[i] = [];
		for(var j=0;j<this.List;j++)
		{
			tempNumArr[i][j] = -1;
		}
	}
	
	var len = this.managerObj.length;
	for(var i=0;i<len;i++)
	{
		var obj = this.managerObj[i];
		if(!obj.isDiscard)
		{
			tempNumArr[obj.indexY][obj.indexX] = obj.rank;
		}
	}
	
	//进行逐一判断
	for(var i=0;i<this.Line;i++)
	{
		for(var j=0;j<this.List;j++)
		{
			//判断每一个的上下左右是否能合成
			var tempRank = tempNumArr[i][j];
			var left = j-1;
			var right = j+1;
			var up = i-1;
			var down = i+1;
			if(left >= 0)
			{
				if(tempRank === tempNumArr[i][left]){return false;}
				else if(tempNumArr[i][left] === -1){return false;}
			}
			if(right < this.List)
			{
				if(tempRank === tempNumArr[i][right]){return false;}
				else if(tempNumArr[i][right] === -1){return false;}
			}
			if(up >= 0)
			{
				if(tempRank === tempNumArr[up][j]){return false;}
				else if(tempNumArr[up][j] === -1){return false;}
			}
			if(down < this.Line)
			{
				if(tempRank === tempNumArr[down][j]){return false;}
				else if(tempNumArr[down][j] === -1){return false;}
			}
		}
	}
	return true;
}


Window_ZzyGCFG2048.prototype.Stage4 = function()
{
	
	
	
}



Window_ZzyGCFG2048.prototype.AllBlockReady = function()
{
	var objLen = this.managerObj.length;
	for(var i=0;i<objLen;i++)
	{
		if(!this.managerObj[i].isReady)
		{
			return false;
		}
	}	
	return true;
}


Window_ZzyGCFG2048.prototype.isWin = function()
{
	var isW = false;
	if(this.isWinOfNumber)
	{
		//判断是否合成需求等级
		if(this.currentRank >= this.winOfRank)
		{return true;}
	}
	if(this.isWinOfScore)
	{
		if(this.gameGlobal.score >= this.winOfScore)
		{return true;}
	}	
	if(this.isWinOfCount)//超过次数
	{
		if(this.operaterCount >= this.winOfCount)
		{return true;}
	}
	return false;
}

Window_ZzyGCFG2048.prototype.isFail = function()
{
	
	if(this.isFailOfTime)
	{
		if(this.failOfTime < this.gameGlobal.time)
		{return true;}
	}
	if(this.isFailOfCount)
	{
		if(this.failOfCount < this.operaterCount)
		{return true;}
	}
	return false;
}

Window_ZzyGCFG2048.prototype.isSpecial1 = function()
{
	return Zzy.Param.G2048OtherEnd1Script();
}

Window_ZzyGCFG2048.prototype.isSpecial2 = function()
{
	return Zzy.Param.G2048OtherEnd2Script();
}



Window_ZzyGCFG2048.prototype.drawData = function()
{
	this.refresh();
}

Window_ZzyGCFG2048.prototype.refresh = function()
{
	//绘制游戏数据
	this.scoreTextSpr.bitmap.clear();
	this.scoreTextSpr.x = this.scoreSpr.x;
	this.scoreTextSpr.y = this.scoreSpr.y;
	this.scoreTextSpr.bitmap.drawText(this.dynScore,0,0,60,90,'center');
	this.countTextSpr.bitmap.clear();
	this.countTextSpr.x = this.countSpr.x;
	this.countTextSpr.y = this.countSpr.y;
	this.countTextSpr.bitmap.drawText(this.operaterCount,0,0,60,90,'center');	
	this.timeTextSpr.bitmap.clear();
	this.timeTextSpr.x = this.timeSpr.x;
	this.timeTextSpr.y = this.timeSpr.y;
	this.timeTextSpr.bitmap.drawText(Math.floor(this.gameGlobal.time/60),0,0,60,90,'center');
	this.historyTextSpr.bitmap.clear();
	this.historyTextSpr.x = this.historySpr.x;
	this.historyTextSpr.y = this.historySpr.y;
	this.historyTextSpr.bitmap.drawText($gameSystem.GetZzyG2048HighScore(),0,0,60,90,'center');
}



Window_ZzyGCFG2048.prototype.InfoTextSize = function()//信息字体大小
{return 18;}

Window_ZzyGCFG2048.prototype.ConditionTextSize = function()//结束条件字体大小
{return 14;}



//响应按键消息:
Window_ZzyGCFG2048.prototype.OnKeyLeft = function()
{
	if(!this.isCanControl || this.isPauseDown)return;
	if(Zzy.G2048.WindowPointer.gameStage === 2)
	{
		this.operationBlockArr(1);		
	}

}

Window_ZzyGCFG2048.prototype.OnKeyRight = function()
{
	if(!this.isCanControl || this.isPauseDown)return;
	if(Zzy.G2048.WindowPointer.gameStage === 2)
	{	
		this.operationBlockArr(2);
	}
}

Window_ZzyGCFG2048.prototype.OnKeyUp = function()
{
	if(!this.isCanControl || this.isPauseDown)return;
	if(Zzy.G2048.WindowPointer.gameStage === 2)
	{		
		this.operationBlockArr(3);
	}
}

Window_ZzyGCFG2048.prototype.OnKeyDown = function()
{
	if(!this.isCanControl || this.isPauseDown)return;
	if(Zzy.G2048.WindowPointer.gameStage === 2)
	{	
		this.operationBlockArr(4);
	}
}

Window_ZzyGCFG2048.prototype.OnKeyP = function()
{
	var isPause = Window_ZzyGCFBase.prototype.OnKeyP.call(this);
	this.isPauseDown = isPause;
	Zzy.G2048.pauseSpr.startPause(isPause);//执行暂停图片
}


Window_ZzyGCFG2048.prototype.operationBlockArr = function(dir)
{
	//this.blockArr;
	
	//创建一个比对的临时数组,作用是确保每个方格只会执行一次合并
	var mergeArr = [];
	var blockRankArr = [];
	var blockCompareArr = [];//对比,作用是判断是否有效操作
	var blockIDArr = [];
	

	for(var i=0;i<this.Line;i++)
	{
		mergeArr[i] = [];
		blockRankArr[i] = [];
		blockIDArr[i] = [];
		blockCompareArr[i] = [];
		for(var j=0;j<this.List;j++)
		{
			mergeArr[i][j] = true;
			blockRankArr[i][j] = -1;
			blockCompareArr[i][j] = -1;
			blockIDArr[i][j] = -1;
		}
	}
	
	//创造临时数据对比

	var len = this.managerObj.length;
	for(var i=0;i<len;i++)
	{
		var obj = this.managerObj[i];
		if(!obj.isDiscard)//不是遗弃的
		{
			blockRankArr[obj.indexY][obj.indexX] = obj.rank;
			blockCompareArr[obj.indexY][obj.indexX] = obj.rank;
			blockIDArr[obj.indexY][obj.indexX] = obj.arrIndex;
		}
	}
	

	switch(dir)
	{
		
		case 1://左,将数据向左合并
			for(var j=1;j<this.List;j++)
			{
				for(var i=0;i<this.Line;i++)
				{
					if(blockIDArr[i][j] !== -1)
					{
						var obj = this.managerObj[blockIDArr[i][j]];
						this.leftMeger(mergeArr,blockRankArr,blockIDArr,obj);
					}
				}
			}
		break;
		
		case 2://右
			for(var j=this.List-2;j>=0;j--)
			{
				for(var i=0;i<this.Line;i++)
				{
					if(blockIDArr[i][j] !== -1)
					{
						var obj = this.managerObj[blockIDArr[i][j]];
						this.rightMeger(mergeArr,blockRankArr,blockIDArr,obj);						
					}
				}
			}
		break;
		
		case 3://上
			for(var i=1;i<this.Line;i++)
			{
				for(var j=0;j<this.List;j++)
				{
					if(blockIDArr[i][j] !== -1)
					{
						var obj = this.managerObj[blockIDArr[i][j]];
						this.upMeger(mergeArr,blockRankArr,blockIDArr,obj);						
					}					
				}
			}
		break;
		
		case 4://下
			for(var i=this.Line-2;i>=0;i--)
			{
				for(var j=0;j<this.List;j++)
				{
					if(blockIDArr[i][j] !== -1)
					{
						var obj = this.managerObj[blockIDArr[i][j]];
						this.downMeger(mergeArr,blockRankArr,blockIDArr,obj);						
					}				
				}
			}
		break;	
	}
	
	
	var isCanAdd = false;
	for(var i=0;i<this.Line;i++)
	{
		for(var j=0;j<this.List;j++)
		{
			if(blockRankArr[i][j] !== blockCompareArr[i][j])
			{
				isCanAdd = true;
				this.operaterCount++;//添加操作次数
				break;
			}
		}
		if(isCanAdd){break;}
	}
	
	
}

Window_ZzyGCFG2048.prototype.leftMeger = function(mergeArr,blockRankArr,blockIDArr,obj)
{
	if(obj.indexX <= 0){return false;}//不会合并
	
	var tempX = obj.indexX;
	var tempY = obj.indexY;
	var isMeger = false;//是否进行了合并
	var tempRank = obj.rank;

	while(true)
	{
		tempX--;
		if(tempX<0){tempX++;break;}
		else if(blockRankArr[tempY][tempX] === tempRank)
		{
			//判断能否合并
			if(mergeArr[tempY][tempX])
			{
				mergeArr[tempY][tempX] = false;//执行合并
				tempRank = Math.min(15,(tempRank+1));
				isMeger = true;//进行了合并
				break;
			}
			else//不能合并,恢复位置
			{tempX++;break;}
		}
		else if(blockRankArr[tempY][tempX] === -1)//空白位置,则跳过
		{continue;}
		else if(tempX <= 0 && blockRankArr[tempY][tempX] === -1)//到达底,并且为空
		{break;}
		else
		{tempX++;break;}
	}
	//将blockRankArr等级表进行设置
	
	if(isMeger)//满足合并
	{
		var bKey = {b1:obj.arrIndex,b2:blockIDArr[tempY][tempX]};
		this.megerBlockArr.push(bKey);
	}
	if(tempX !== obj.indexX || tempY !== obj.indexY)//数据发生了变化
	{this.isDataChange = true;}	
	
	
	blockRankArr[obj.indexY][obj.indexX] = -1;
	blockRankArr[tempY][tempX] = tempRank;
	blockIDArr[obj.indexY][obj.indexX] = -1;
	blockIDArr[tempY][tempX] = obj.arrIndex;
	
	
	var moveX = this.blockPosArr[tempY][tempX].x;
	var moveY = this.blockPosArr[tempY][tempX].y;
	obj.indexX = tempX;
	obj.indexY = tempY;
	obj.MoveToOfPer(moveX,moveY,35);
	obj.isReady = false;
	return isMeger;
}

Window_ZzyGCFG2048.prototype.rightMeger = function(mergeArr,blockRankArr,blockIDArr,obj)
{
	if(obj.indexX >= (this.List-1)){return false;}//不会合并
	
	var tempX = obj.indexX;
	var tempY = obj.indexY;
	var isMeger = false;//是否进行了合并
	var tempRank = obj.rank;

	while(true)
	{
		tempX++;
		if(tempX>=this.List){tempX--;break;}
		else if(blockRankArr[tempY][tempX] === tempRank)
		{
			//判断能否合并
			if(mergeArr[tempY][tempX])
			{
				mergeArr[tempY][tempX] = false;//执行合并
				tempRank = Math.min(15,(tempRank+1));
				isMeger = true;//进行了合并
				break;
			}
			else//不能合并,恢复位置
			{tempX--;break;}
		}
		else if(blockRankArr[tempY][tempX] === -1)//空白位置,则跳过
		{continue;}
		else if(tempX >= (this.List-1) && blockRankArr[tempY][tempX] === -1)//到达底,并且为空
		{break;}
		else
		{tempX--;break;}
	}
	
	if(isMeger)//满足合并
	{
		var bKey = {b1:obj.arrIndex,b2:blockIDArr[tempY][tempX]};
		this.megerBlockArr.push(bKey);
	}
	if(tempX !== obj.indexX || tempY !== obj.indexY)//数据发生了变化
	{this.isDataChange = true;}	
	
	//将blockRankArr等级表进行设置
	blockRankArr[obj.indexY][obj.indexX] = -1;
	blockRankArr[tempY][tempX] = tempRank;
	blockIDArr[obj.indexY][obj.indexX] = -1;
	blockIDArr[tempY][tempX] = obj.arrIndex;
	
	var moveX = this.blockPosArr[tempY][tempX].x;
	var moveY = this.blockPosArr[tempY][tempX].y;
	obj.indexX = tempX;
	obj.indexY = tempY;
	obj.MoveToOfPer(moveX,moveY,35);
	obj.isReady = false;
	return isMeger;
}


Window_ZzyGCFG2048.prototype.upMeger = function(mergeArr,blockRankArr,blockIDArr,obj)
{
	if(obj.indexY <= 0){return false;}//不会合并
	
	var tempX = obj.indexX;
	var tempY = obj.indexY;
	var isMeger = false;//是否进行了合并
	var tempRank = obj.rank;

	while(true)
	{
		tempY--;
		if(tempY<0){tempY++;break;}
		else if(blockRankArr[tempY][tempX] === tempRank)
		{
			//判断能否合并
			if(mergeArr[tempY][tempX])
			{
				mergeArr[tempY][tempX] = false;//执行合并
				tempRank = Math.min(15,(tempRank+1));
				isMeger = true;//进行了合并
				break;
			}
			else//不能合并,恢复位置
			{tempY++;break;}
		}
		else if(blockRankArr[tempY][tempX] === -1)//空白位置,则跳过
		{continue;}
		else if(tempY <= 0 && blockRankArr[tempY][tempX] === -1)//到达底,并且为空
		{break;}
		else
		{tempY++;break;}
	}
	
	if(isMeger)//满足合并
	{
		var bKey = {b1:obj.arrIndex,b2:blockIDArr[tempY][tempX]};
		this.megerBlockArr.push(bKey);
	}
	if(tempX !== obj.indexX || tempY !== obj.indexY)//数据发生了变化
	{this.isDataChange = true;}		
	
	
	//将blockRankArr等级表进行设置
	blockRankArr[obj.indexY][obj.indexX] = -1;
	blockRankArr[tempY][tempX] = tempRank;
	blockIDArr[obj.indexY][obj.indexX] = -1;
	blockIDArr[tempY][tempX] = obj.arrIndex;
	
	var moveX = this.blockPosArr[tempY][tempX].x;
	var moveY = this.blockPosArr[tempY][tempX].y;
	obj.indexX = tempX;
	obj.indexY = tempY;
	obj.MoveToOfPer(moveX,moveY,35);
	obj.isReady = false;
	return isMeger;
}


Window_ZzyGCFG2048.prototype.downMeger = function(mergeArr,blockRankArr,blockIDArr,obj)
{
	if(obj.indexY >= (this.Line-1)){return false;}//不会合并
	
	var tempX = obj.indexX;
	var tempY = obj.indexY;
	var isMeger = false;//是否进行了合并
	var tempRank = obj.rank;

	while(true)
	{
		tempY++;
		if(tempY>=this.Line){tempY--;break;}
		else if(blockRankArr[tempY][tempX] === tempRank)
		{
			//判断能否合并
			if(mergeArr[tempY][tempX])
			{
				mergeArr[tempY][tempX] = false;//执行合并
				tempRank = Math.min(15,(tempRank+1));
				isMeger = true;//进行了合并
				break;
			}
			else//不能合并,恢复位置
			{tempY--;break;}
		}
		else if(blockRankArr[tempY][tempX] === -1)//空白位置,则跳过
		{continue;}
		else if(tempY >= (this.List-1) && blockRankArr[tempY][tempX] === -1)//到达底,并且为空
		{break;}
		else
		{tempY--;break;}
	}
	
	if(isMeger)//满足合并
	{
		var bKey = {b1:obj.arrIndex,b2:blockIDArr[tempY][tempX]};
		this.megerBlockArr.push(bKey);
	}
	if(tempX !== obj.indexX || tempY !== obj.indexY)//数据发生了变化
	{this.isDataChange = true;}	
	
	//将blockRankArr等级表进行设置
	blockRankArr[obj.indexY][obj.indexX] = -1;
	blockRankArr[tempY][tempX] = tempRank;
	blockIDArr[obj.indexY][obj.indexX] = -1;
	blockIDArr[tempY][tempX] = obj.arrIndex;
	
	var moveX = this.blockPosArr[tempY][tempX].x;
	var moveY = this.blockPosArr[tempY][tempX].y;
	obj.indexX = tempX;
	obj.indexY = tempY;
	obj.MoveToOfPer(moveX,moveY,35);
	obj.isReady = false;
	return isMeger;
}



Window_ZzyGCFG2048.prototype.InTouch = function()
{
	if(!this.isCanControl || this.isPauseDown)return;
	Window_ZzyGCFBase.prototype.InTouch.call(this);
	
	
	if(Zzy.G2048.WindowPointer.gameStage === 2)
	{	
		if(this.scene.isTouchMoving)//按下移动中
		{
			if(this.scene.OnTouchX < this.scene.InTouchX-15)
			{
				this.operationBlockArr(2);
				this.scene.isTouchMoving = false;
			}
			else if(this.scene.OnTouchX > this.scene.InTouchX+15)
			{
				this.operationBlockArr(1);
				this.scene.isTouchMoving = false;
			}
			else if(this.scene.OnTouchY < this.scene.InTouchY-15)
			{
				this.operationBlockArr(4);
				this.scene.isTouchMoving = false;
			}
			else if(this.scene.OnTouchY > this.scene.InTouchY+15)
			{
				this.operationBlockArr(3);
				this.scene.isTouchMoving = false;
			}
			
		}
	}
	

}




//=======================================================================
//Window_ZzyGCFG2048UI
//=======================================================================

function Window_ZzyGCFG2048UI() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFG2048UI.prototype = Object.create(Window_ZzyGCFBaseUI.prototype);
Window_ZzyGCFG2048UI.prototype.constructor = Window_ZzyGCFG2048UI;

Window_ZzyGCFG2048UI.prototype.initialize = function() 
{
	//初始化
    var width = this.Width();
    var height = this.Height();
	
    Window_ZzyGCFBaseUI.prototype.initialize.call(this, 0, 0, width, height);

	//创建胜利,失败,退出,暂停的UI界面

	var centerX = Graphics.boxWidth / 2;
	var centerY = Graphics.boxHeight / 2;

	this.winSpr = new Sprite_ZzyG2048Base(centerX,centerY,Zzy.Param.G2048WinPic);
	this.failSpr = new Sprite_ZzyG2048Base(centerX,centerY,Zzy.Param.G2048FailPic);
	this.exitSpr = new Sprite_ZzyG2048Base(centerX,centerY,Zzy.Param.G2048ExitPic);
	this.pauseBk = new Sprite_ZzyG2048Pause(centerX,centerY,Zzy.Param.G2048PausePic);
	
	this.okSpr = new Sprite_ZzyG2048Button(centerX,centerY,Zzy.Param.G2048OkMenuPic,0,2);
	this.cancelSpr = new Sprite_ZzyG2048Button(centerX,centerY,Zzy.Param.G2048CancelMenuPic,0,3);

	this.addChild(this.winSpr);
	this.addChild(this.failSpr);
	this.addChild(this.exitSpr);
	this.addChild(this.okSpr);
	this.addChild(this.cancelSpr);	
	
	
	this.winSpr.visible = false;
	this.failSpr.visible = false;
	this.exitSpr.visible = false;
	this.okSpr.visible = false;
	this.cancelSpr.visible = false;
	
	this.resultMenuDelay = 0;
	this.isResultMenu = false;//呼叫结束菜单
	
	
	//结算
	this.resultScoreNumSpr = Zzy.GCF.CreateEmptyTextZzySpr(80,80);
	this.resultTimeNumSpr = Zzy.GCF.CreateEmptyTextZzySpr(80,80);
	this.resultCountNumSpr = Zzy.GCF.CreateEmptyTextZzySpr(80,80);
	
	this.resultScoreNumSpr.visible = false;
	this.resultTimeNumSpr.visible = false;
	this.resultCountNumSpr.visible = false;	
	
	this.resultScore = 0;
	this.resultTime = 0;
	this.resultCount = 0;

	this.addChild(this.resultScoreNumSpr);	
	this.addChild(this.resultTimeNumSpr);	
	this.addChild(this.resultCountNumSpr);	
	

	this.addChild(this.pauseBk);//最后压入,显示在最上方
};

Window_ZzyGCFG2048UI.prototype.CallResultRecord = function(delay)//呼叫结束记录菜单
{
	this.resultMenuDelay = (delay ? delay : 0);
	this.isResultMenu = true;
}

Window_ZzyGCFG2048UI.prototype.CallExitMenu = function()
{
	//执行开始弹出的动画效果
	this.UIMenuStart(this.exitSpr);
	
	//弹出按钮
	//.setDelay(30)
	this.okSpr.x = Graphics.boxWidth / 2 - 64;

	this.cancelSpr.visible = true;
	this.cancelSpr.scale.x = 0;
	this.cancelSpr.scale.y = 0;
	this.cancelSpr.x = Graphics.boxWidth / 2 + 64;
	this.cancelSpr.y = Graphics.boxHeight / 3 * 2;
	this.cancelSpr.ScaleToOfTime(1,1,20);	
	this.cancelSpr.setDelay(20);
}


Window_ZzyGCFG2048UI.prototype.CallResultInterface = function()//呼叫结束界面
{
	switch(this.gameGlobal.result)
	{
		case 'win':case 'other1':case 'other2':
			this.CallWinInterface();
			Zzy.G2048.PlaySE(3);
		break;
		case 'fail':
			this.CallFailInterface();
			Zzy.G2048.PlaySE(4);
		break;
		default:
			this.CallWinInterface();
	}

}

Window_ZzyGCFG2048UI.prototype.CallWinInterface = function()
{
	this.UIMenuStart(this.winSpr);
	this.showOkButton();
	
	
	this.setResultData();
	
}

Window_ZzyGCFG2048UI.prototype.CallFailInterface = function()
{
	this.UIMenuStart(this.failSpr);
	this.showOkButton();
	
	
	this.setResultData();
	

	// this.resultScoreNumSpr.visible = false;
	// this.resultTimeNumSpr.visible = false;
	// this.resultCountNumSpr.visible = false;	
}

Window_ZzyGCFG2048UI.prototype.setResultData = function()//设置结算数据
{
	
	this.resultScore = this.gameGlobal.score;
	this.resultCount = this.gameData[1];
	this.resultTime = Math.floor(this.gameGlobal.time/60);
	

	this.startResultSpr(this.resultScoreNumSpr,0,this.resultScore);
	this.startResultSpr(this.resultCountNumSpr,1,this.resultCount);
	this.startResultSpr(this.resultTimeNumSpr,2,this.resultTime);

}

Window_ZzyGCFG2048UI.prototype.startResultSpr = function(spr,ID,Val)
{
	
	spr.bitmap.fontSize = this.getFontSize();
	spr.bitmap.drawText(Val,0,0,80,80,'center');
	
	spr.visible = true;
	spr.x = this.failSpr.x + 20;
	spr.y = this.failSpr.y + 2 + (ID-1) * 50;
	
	spr.opacity = 0;
	spr.OpacityToOfTime(255,30);
	
	spr.scale.x = 2;
	spr.scale.y = 2;
	spr.ScaleToOfPer(1,1,20);
	
	spr.setDelay(60 + ID*10);
	
}



Window_ZzyGCFG2048UI.prototype.getFontSize = function()
{
	return 32;
}





Window_ZzyGCFG2048UI.prototype.CallCancelExitMenu = function()//游戏取消退出
{
	this.cancelSpr.ScaleToOfTime(0,0,20);
	this.okSpr.ScaleToOfTime(0,0,20);
	this.cancelSpr.setScaleEndDisvisible();
	this.okSpr.setScaleEndDisvisible();
	
	this.exitSpr.setDelay(10);
	this.exitSpr.ScaleToOfTime(0,0,20);
	this.exitSpr.setScaleEndDisvisible();
	Zzy.G2048.WindowPointer.gameStage = 2;
}


Window_ZzyGCFG2048UI.prototype.CallCancelOkMenu = function()//
{

	if(Zzy.G2048.WindowPointer.gameStage === 4)
	{
		//进入结算界面
		this.cancelSpr.ScaleToOfTime(0,0,20);
		this.okSpr.ScaleToOfTime(0,0,20);
		this.cancelSpr.setScaleEndDisvisible();
		this.okSpr.setScaleEndDisvisible();
		
		this.exitSpr.setDelay(10);
		this.exitSpr.ScaleToOfTime(0,0,20);
		this.exitSpr.setScaleEndDisvisible();	

		Zzy.G2048.WindowPointer.gameStage = 3;

		this.gameGlobal.result = 'fail';
		
		this.CallResultRecord(60);//呼叫结束
		
	}
	else if(Zzy.G2048.WindowPointer.gameStage === 3)
	{
		Zzy.GCF.exitGame(this.gameGlobal.result);
	}
}

Window_ZzyGCFG2048UI.prototype.UIMenuStart = function(spr)
{
	spr.scale.x = 0;
	spr.scale.y = 0;
	spr.ScaleToOfTime(1,1,20);
	spr.visible = true;
	
	if(Zzy.G2048.WindowPointer.gameStage !== 3)
	{Zzy.G2048.WindowPointer.gameStage = 4;}//UI等待界面
	
	this.showOkButton();
}

Window_ZzyGCFG2048UI.prototype.showOkButton = function()
{
	this.okSpr.visible = true;
	this.okSpr.scale.x = 0;
	this.okSpr.scale.y = 0;
	this.okSpr.x = Graphics.boxWidth / 2;
	this.okSpr.y = Graphics.boxHeight / 3 * 2;
	this.okSpr.ScaleToOfTime(1,1,20);	
	this.okSpr.setDelay(20);	
}




//=======================================================================
//Sprite_ZzyG2048Base
//=======================================================================
function Sprite_ZzyG2048Base() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyG2048Base.prototype = Object.create(Sprite_ZzyGCFBase.prototype);
Sprite_ZzyG2048Base.prototype.constructor = Sprite_ZzyG2048Base;

Sprite_ZzyG2048Base.prototype.initialize = function(x,y,fileName,hue) 
{
	Sprite_ZzyGCFBase.prototype.initialize.call(this,x,y,fileName,hue);
	
}

Sprite_ZzyG2048Base.prototype.loadBitmap = function(fileName,hue)//加载图片
{
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.G2048PicPath, fileName, hue, true);
}



//=======================================================================
//Sprite_ZzyG2048Button
//=======================================================================

function Sprite_ZzyG2048Button() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyG2048Button.prototype = Object.create(Sprite_ZzyG2048Base.prototype);
Sprite_ZzyG2048Button.prototype.constructor = Sprite_ZzyG2048Button;

Sprite_ZzyG2048Button.prototype.initialize = function(x,y,fileName,hue,commandId) 
{
    Sprite_ZzyG2048Base.prototype.initialize.call(this,x,y,fileName,hue);
	//激活Button
	this.isCanButton = true;//激活按钮
	
	this.buttonInScopeBitmap = ImageManager.loadBitmap(Zzy.Param.G2048PicPath,fileName + '1',undefined,true);
	this.buttonDownBitmap = ImageManager.loadBitmap(Zzy.Param.G2048PicPath,fileName + '2',undefined,true);
	
	this.commandId = commandId;
	//ID 1退出  2确认  3取消
	
};



Sprite_ZzyG2048Button.prototype.OnClick = function()//按钮被点,用于子类的调用
{
	if(!this.visible)return;//按钮隐形不做任何响应


	if(Zzy.G2048.WindowPointer.gameStage === 2)
	{
	
		switch(this.commandId)
		{
			case 1:
				Zzy.G2048.WindowPointer.UI.CallExitMenu();
			break;
			default:
		}		
		
	}
	else if(Zzy.G2048.WindowPointer.gameStage === 4)
	{
		switch(this.commandId)
		{
			case 2://确认
				Zzy.G2048.WindowPointer.UI.CallCancelOkMenu();
			break;
			
			case 3://取消
				Zzy.G2048.WindowPointer.UI.CallCancelExitMenu();
			break;			
			default:
		}		
	}
	else if(Zzy.G2048.WindowPointer.gameStage === 3)
	{
		switch(this.commandId)
		{
			case 2://确认
				Zzy.G2048.WindowPointer.UI.CallCancelOkMenu();
				break;
		}
		
	}
	Zzy.G2048.PlaySE(2);//播放按钮音效

}



//=======================================================================
//Sprite_ZzyG2048Block
//=======================================================================

function Sprite_ZzyG2048Block() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyG2048Block.prototype = Object.create(Sprite_ZzyG2048Base.prototype);
Sprite_ZzyG2048Block.prototype.constructor = Sprite_ZzyG2048Block;

Sprite_ZzyG2048Block.prototype.initialize = function(indexX,indexY,rank,arrIndex) 
{
	var pt = this.IndexToPos(indexX,indexY);
    Sprite_ZzyG2048Base.prototype.initialize.call(this,pt.x,pt.y,'');
	
	//方块中包含
	this.rank = rank;//rank代表等级
	this.isDiscard = false;//是否是弃用的,这会被认定为可回收的对象
	this.isReady = true;//是否是空闲状态
	this.arrIndex = arrIndex;//在管理中的下标值
	
	//在数组中的位置
	this.indexX = indexX;
	this.indexY = indexY;
};

Sprite_ZzyG2048Block.prototype.setRank = function(rank)
{this.rank = rank;}

Sprite_ZzyG2048Block.prototype.getRank = function()
{return this.rank;}


Sprite_ZzyG2048Block.prototype.setNewPos = function(x,y)
{
	var pt = this.IndexToPos(x,y);
	
	this.x = pt.x;
	this.y = pt.y;
	this.indexX = x;
	this.indexY = y;
}



Sprite_ZzyG2048Block.prototype.startRun = function()
{
	//通过等级设置bitmap
	this.visible = true;
	this.setBitmap(Zzy.G2048.blockBitmapArr[this.rank]);
	this.isReady = false;
	this.scale.x = 0;
	this.scale.y = 0;
	this.ScaleToOfPer(1,1,30);
	
}


Sprite_ZzyG2048Block.prototype.update = function()
{
	Sprite_ZzyG2048Base.prototype.update.call(this);
	if(!this.isReady)
	{
		if(!this.isBusy())//判断是否繁忙中
		{this.isReady = true;}
	}

}


Sprite_ZzyG2048Block.prototype.setDiscard = function()//设置弃置
{
	this.visible = false;
	this.isDiscard = true;
}


//转换
Sprite_ZzyG2048Block.prototype.IndexToPos = function(indexX,indexY)
{
	var pt = {x:0,y:0};
	pt.x = Zzy.G2048.WindowPointer.blockPosArr[indexY][indexX].x;
	pt.y = Zzy.G2048.WindowPointer.blockPosArr[indexY][indexX].y;
	return pt;
}

Sprite_ZzyG2048Block.prototype.LevelUp = function()//升级,包括分数添加
{
	this.rank = Math.min(15,this.rank+1);
	//刷新动画
	var leBitmap = Zzy.G2048.blockBitmapArr[this.rank];
	this.setBitmap(leBitmap);
	this.setScale(1.2,1.2);
	this.ScaleToOfPer(1,1,30);
}


// //被选择
// Sprite_ZzyGSelect.prototype.OnSelect = function()
// {
	
// }

// Sprite_ZzyGSelect.prototype.OutSelct = function()
// {
	
// }


//=======================================================================
//Sprite_ZzyG2048Pause
//=======================================================================

function Sprite_ZzyG2048Pause() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyG2048Pause.prototype = Object.create(Sprite_ZzyG2048Base.prototype);
Sprite_ZzyG2048Pause.prototype.constructor = Sprite_ZzyG2048Pause;

Sprite_ZzyG2048Pause.prototype.initialize = function(x,y,fileName,hue) 
{
    Sprite_ZzyG2048Base.prototype.initialize.call(this,x,y,fileName,hue);
	
	this.ignorePause = true;//激活按钮
	this.visible = false;
	Zzy.G2048.pauseSpr = this;
	
	this.isPause = Zzy.GCF.GameGlobal().isPausing;
	this.executPausing = false;//执行暂停中
};


Sprite_ZzyG2048Pause.prototype.update = function()
{
	Sprite_ZzyG2048Base.prototype.update.call(this);
	
	
}

Sprite_ZzyG2048Pause.prototype.startPause = function(isPause)
{
	if(isPause)
	{
		Zzy.G2048.pauseSpr.opacity = 0;
		Zzy.G2048.pauseSpr.visible = true;
		Zzy.G2048.pauseSpr.OpacityToOfTime(255,30);	
		this.executPausing = true;
	}
	else
	{
		Zzy.G2048.pauseSpr.opacity = 255;
		Zzy.G2048.pauseSpr.visible = true;
		Zzy.G2048.pauseSpr.OpacityToOfTime(0,30);
		this.executPausing = true;
	}
}



Window_ZzyGCFG2048.prototype.updatedynScore = function()
{
	//刷新最大分数
	$gameSystem.SetZzyG2048HighScore(Math.max($gameSystem.GetZzyG2048HighScore(),this.gameGlobal.score));
	//更新动态分数
	if($gameSystem.GetZzyGCFIsDynScore())
	{
		var Disparity = this.gameGlobal.score - this.dynScore;
		
		if(Disparity > 1000)
		{this.dynScore += 1000;}
		else if(Disparity > 100)
		{this.dynScore += 100;}
		else if(Disparity > 10)
		{this.dynScore += 10;}
		else if(Disparity > 0)
		{this.dynScore += 1;}		
		else if(Disparity < -1000)
		{this.dynScore -= 1000;}
		else if(Disparity < -100)
		{this.dynScore -= 100;}
		else if(Disparity < -10)
		{this.dynScore -= 10;}
		else if(Disparity < 0)
		{this.dynScore -= 1;}
	}
	else
	{
		this.dynScore = this.gameGlobal.score;
	}	
}




//----------------------------------------------------------------------


Zzy.G2048.ReloadG2048BitmapArr = function()//加载位图缓存
{
	Zzy.G2048.blockBitmapArr = [];
	
	//Zzy.G2048.blockBitmap = new Bitmap(328,328);
	var size = Zzy.G2048.blockBitmap.width / 4;

	
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			var bitBlock = new Bitmap(size,size);
			bitBlock.blt(Zzy.G2048.blockBitmap,j*size,i*size,size,size,0,0);

			Zzy.G2048.blockBitmapArr[j+i*4] = bitBlock;
		}
	}
}

Zzy.G2048.PlaySE = function(soundID)
{
	
	switch(soundID)
	{
		case 1://合并
			if(Zzy.Param.G2048MegerSoundSE && Zzy.Param.G2048MegerSoundSE.name)
			{AudioManager.playSe(Zzy.Param.G2048MegerSoundSE);}
		break;
		
		case 2://按钮
			if(Zzy.Param.G2048ButtonSoundSE && Zzy.Param.G2048ButtonSoundSE.name)
			{AudioManager.playSe(Zzy.Param.G2048ButtonSoundSE);}
		break;
		
		case 3://胜利
			if(Zzy.Param.G2048WinSoundSE && Zzy.Param.G2048WinSoundSE.name)
			{AudioManager.playSe(Zzy.Param.G2048WinSoundSE);}
		break;
		
		case 4://失败
			if(Zzy.Param.G2048FailSoundSE && Zzy.Param.G2048FailSoundSE.name)
			{AudioManager.playSe(Zzy.Param.G2048FailSoundSE);}
		break;			
	}
}



Zzy.G2048.MergeScore = function(num,score)
{
	var index = 0;
	
	while(num > 2)
	{
		num = num/2;
		index++;
	}
	
	var arr = $gameSystem.GetZzyG2048NumToArr();
	arr[index] = score;
}


Zzy.G2048.HighRate = function(r4,r8,r16,r32)
{
	r4 = r4 ? r4 : 0;
	r8 = r8 ? r8 : 0;
	r16 = r16 ? r16 : 0;
	r32 = r32 ? r32 : 0;
	var arr = $gameSystem.GetZzyG2048HighRateArr();
	arr[0] = r4;
	arr[1] = r8;
	arr[2] = r16;
	arr[3] = r32;	
}

Zzy.G2048.List = function(list)
{
	$gameSystem.SetZzyG2048List(list);	
}

Zzy.G2048.Line = function(line)
{
	$gameSystem.SetZzyG2048Line(line);
}

Zzy.G2048.SpawnCount = function(count)
{
	$gameSystem.SetZzyG2048SpawnCount(count);
}

Zzy.G2048.IsWinMergeNumber = function(isEnable)
{
	$gameSystem.SetZzyG2048IsWinMergeNumber(isEnable);
}

Zzy.G2048.IsWinScoreOver = function(isEnable)
{
	$gameSystem.SetZzyG2048IsWinScoreOver(isEnable);
}

Zzy.G2048.IsWinCountOver = function(isEnable)
{
	$gameSystem.SetZzyG2048.IsWinCountOver(isEnable);
}

Zzy.G2048.IsFailTimeOver = function(isEnable)
{
	$gameSystem.SetZzyG2048IsFailTimeOver(isEnable);
}

Zzy.G2048.IsFailCountOver = function(isEnable)
{
	$gameSystem.SetZzyG2048IsFailCountOver(isEnable);
}

Zzy.G2048.WinMergeNumber = function(block)
{
	$gameSystem.SetZzyG2048WinMergeNumber(block);
}

Zzy.G2048.WinScoreOver = function(score)
{
	$gameSystem.SetZzyG2048WinScoreOver(score);
}

Zzy.G2048.WinCountOver = function(count)
{
	$gameSystem.SetZzyG2048WinCountOver(count);		
}

Zzy.G2048.FailTimeOver = function(time)
{
	$gameSystem.SetZzyG2048FailTimeOver(time);
}

Zzy.G2048.FailCountOver = function(count)
{
	$gameSystem.SetZzyG2048FailCountOver(count);
}

Zzy.G2048.GetMergeScore = function(num)
{
	var index = 0;
	while(num > 2)
	{
		num = num/2;
		index++;
	}

	var arr = $gameSystem.GetZzyG2048NumToArr();
	return arr[index];		
}

Zzy.G2048.GetHighRate = function(num)
{
	if(num < 4 || num > 32) return false;
	
	var index = 0;
	while(num > 2)
	{
		num = num/2;
		index++;
	}
	var arr = $gameSystem.GetZzyG2048HighRateArr();
	
	return arr[index];
}

Zzy.G2048.GetList = function()
{
	return $gameSystem.GetZzyG2048List();
}

Zzy.G2048.GetLine = function()
{
	return $gameSystem.GetZzyG2048Line();
}

Zzy.G2048.GetSpawnCount = function()
{
	return $gameSystem.GetZzyG2048SpawnCount();
}

Zzy.G2048.GetIsWinMergeNumber = function()
{
	return $gameSystem.GetZzyG2048IsWinMergeNumber();
}

Zzy.G2048.GetIsWinScoreOver = function()
{
	return $gameSystem.GetZzyG2048IsWinScoreOver();
}

Zzy.G2048.GetIsWinCountOver = function()
{
	return $gameSystem.GetZzyG2048IsWinCountOver();
}

Zzy.G2048.GetIsFailTimeOver = function()
{
	return $gameSystem.GetZzyG2048IsFailTimeOver();
}

Zzy.G2048.GetIsFailCountOver = function()
{
	return $gameSystem.GetZzyG2048IsFailCountOver();
}

Zzy.G2048.GetWinMergeNumber = function()
{
	return $gameSystem.GetZzyG2048WinMergeNumber();
}

Zzy.G2048.GetWinScoreOver = function()
{
	return $gameSystem.GetZzyG2048WinScoreOver();
}

Zzy.G2048.GetWinCountOver = function()
{
	return $gameSystem.GetZzyG2048WinCountOver();
}

Zzy.G2048.GetFailTimeOver = function()
{
	return $gameSystem.GetZzyG2048FailTimeOver();
}

Zzy.G2048.GetFailCountOver = function()
{
	return $gameSystem.GetZzyG2048FailCountOver();
}
