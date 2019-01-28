/*
Navicat MySQL Data Transfer

Source Server         : 192.168.8.100
Source Server Version : 50724
Source Host           : localhost:8888
Source Database       : Lights

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-24 16:15:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for disconnectlog
-- ----------------------------
DROP TABLE IF EXISTS `disconnectlog`;
CREATE TABLE `disconnectlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` varchar(10) DEFAULT NULL,
  `disconnectdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of disconnectlog
-- ----------------------------
INSERT INTO `disconnectlog` VALUES ('1', 'esp004', '2018-10-18 16:08:14');
INSERT INTO `disconnectlog` VALUES ('2', 'esp004', '2018-10-18 22:55:48');
INSERT INTO `disconnectlog` VALUES ('3', 'esp004', '2018-10-18 22:57:18');
INSERT INTO `disconnectlog` VALUES ('4', 'esp004', '2018-10-18 23:04:26');
INSERT INTO `disconnectlog` VALUES ('5', 'esp004', '2018-10-19 10:06:59');
INSERT INTO `disconnectlog` VALUES ('6', 'esp1002', '2018-10-19 10:43:54');
INSERT INTO `disconnectlog` VALUES ('7', 'esp004', '2018-10-19 12:12:02');
INSERT INTO `disconnectlog` VALUES ('8', 'esp004', '2018-10-19 15:43:10');
INSERT INTO `disconnectlog` VALUES ('9', 'esp004', '2018-10-19 16:05:15');
INSERT INTO `disconnectlog` VALUES ('10', 'esp1001', '2018-10-20 22:06:42');
INSERT INTO `disconnectlog` VALUES ('11', 'esp1003', '2018-12-13 22:32:17');
INSERT INTO `disconnectlog` VALUES ('12', 'esp003', '2018-12-14 17:26:18');
INSERT INTO `disconnectlog` VALUES ('13', 'esp1001', '2018-12-14 17:26:20');
INSERT INTO `disconnectlog` VALUES ('14', 'esp1002', '2018-12-14 17:27:28');
INSERT INTO `disconnectlog` VALUES ('15', 'esp1003', '2018-12-14 17:32:41');
INSERT INTO `disconnectlog` VALUES ('16', 'esp002', '2018-12-14 17:33:23');
INSERT INTO `disconnectlog` VALUES ('17', 'esp001', '2018-12-14 17:33:23');
INSERT INTO `disconnectlog` VALUES ('18', 'esp002', '2018-12-14 17:34:10');
INSERT INTO `disconnectlog` VALUES ('19', 'esp1001', '2018-12-14 23:04:36');
INSERT INTO `disconnectlog` VALUES ('20', 'esp1003', '2018-12-15 22:39:19');
INSERT INTO `disconnectlog` VALUES ('21', 'esp1001', '2018-12-15 22:52:07');
INSERT INTO `disconnectlog` VALUES ('22', 'esp002', '2018-12-15 23:24:28');
INSERT INTO `disconnectlog` VALUES ('23', 'esp002', '2018-12-16 12:58:31');
INSERT INTO `disconnectlog` VALUES ('24', 'esp1001', '2018-12-16 12:59:57');
INSERT INTO `disconnectlog` VALUES ('25', 'esp1004', '2018-12-16 13:04:34');
INSERT INTO `disconnectlog` VALUES ('26', 'esp1004', '2018-12-16 13:33:08');
INSERT INTO `disconnectlog` VALUES ('27', 'esp1004', '2018-12-16 13:51:41');
INSERT INTO `disconnectlog` VALUES ('28', 'esp001', '2018-12-16 13:57:08');
INSERT INTO `disconnectlog` VALUES ('29', 'esp002', '2018-12-16 13:58:02');
INSERT INTO `disconnectlog` VALUES ('30', 'esp001', '2018-12-16 13:59:23');
INSERT INTO `disconnectlog` VALUES ('31', 'esp002', '2018-12-16 13:59:52');
INSERT INTO `disconnectlog` VALUES ('32', 'esp001', '2018-12-16 14:00:06');
INSERT INTO `disconnectlog` VALUES ('33', 'esp001', '2018-12-16 14:03:08');
INSERT INTO `disconnectlog` VALUES ('34', 'esp1003', '2018-12-16 14:10:16');
INSERT INTO `disconnectlog` VALUES ('35', 'esp1002', '2018-12-16 14:30:00');
INSERT INTO `disconnectlog` VALUES ('36', 'esp1003', '2018-12-16 14:30:10');
INSERT INTO `disconnectlog` VALUES ('37', 'esp1004', '2018-12-16 14:36:55');
INSERT INTO `disconnectlog` VALUES ('38', 'esp1002', '2018-12-16 14:38:05');
INSERT INTO `disconnectlog` VALUES ('39', 'esp1004', '2018-12-16 14:38:10');
INSERT INTO `disconnectlog` VALUES ('40', 'esp1001', '2018-12-16 14:42:01');
INSERT INTO `disconnectlog` VALUES ('41', 'esp1004', '2018-12-16 14:43:16');
INSERT INTO `disconnectlog` VALUES ('42', 'esp1003', '2018-12-16 14:44:09');
INSERT INTO `disconnectlog` VALUES ('43', 'esp1002', '2018-12-16 14:45:15');
INSERT INTO `disconnectlog` VALUES ('44', 'esp1003', '2018-12-16 14:47:19');
INSERT INTO `disconnectlog` VALUES ('45', 'esp1001', '2018-12-16 14:49:07');
INSERT INTO `disconnectlog` VALUES ('46', 'esp1003', '2018-12-16 14:50:51');
INSERT INTO `disconnectlog` VALUES ('47', 'esp1003', '2018-12-16 14:51:29');
INSERT INTO `disconnectlog` VALUES ('48', 'esp1003', '2018-12-16 14:53:12');
INSERT INTO `disconnectlog` VALUES ('49', 'esp1004', '2018-12-16 14:53:49');
INSERT INTO `disconnectlog` VALUES ('50', 'esp1002', '2018-12-16 14:59:38');
INSERT INTO `disconnectlog` VALUES ('51', 'esp1002', '2018-12-16 15:01:54');
INSERT INTO `disconnectlog` VALUES ('52', 'esp1003', '2018-12-16 15:01:58');
INSERT INTO `disconnectlog` VALUES ('53', 'esp1004', '2018-12-16 15:03:07');
INSERT INTO `disconnectlog` VALUES ('54', 'esp1002', '2018-12-16 16:15:09');
INSERT INTO `disconnectlog` VALUES ('55', 'esp1004', '2018-12-16 22:42:49');
INSERT INTO `disconnectlog` VALUES ('56', 'esp1004', '2018-12-17 01:09:04');
INSERT INTO `disconnectlog` VALUES ('57', 'esp1002', '2018-12-17 02:41:46');
INSERT INTO `disconnectlog` VALUES ('58', 'esp001', '2018-12-17 02:42:12');
INSERT INTO `disconnectlog` VALUES ('59', 'esp1002', '2018-12-17 02:42:15');
INSERT INTO `disconnectlog` VALUES ('60', 'esp1003', '2018-12-17 16:35:25');
INSERT INTO `disconnectlog` VALUES ('61', 'esp001', '2018-12-17 23:40:32');
INSERT INTO `disconnectlog` VALUES ('62', 'esp1001', '2018-12-17 23:45:31');
INSERT INTO `disconnectlog` VALUES ('63', 'esp1002', '2018-12-18 13:15:30');
INSERT INTO `disconnectlog` VALUES ('64', 'esp1004', '2018-12-18 13:16:02');
INSERT INTO `disconnectlog` VALUES ('65', 'esp1002', '2018-12-18 13:22:36');
INSERT INTO `disconnectlog` VALUES ('66', 'esp1004', '2018-12-18 15:44:03');
INSERT INTO `disconnectlog` VALUES ('67', 'esp1001', '2018-12-18 15:58:52');
INSERT INTO `disconnectlog` VALUES ('68', 'esp1003', '2018-12-18 15:58:59');
INSERT INTO `disconnectlog` VALUES ('69', 'esp1004', '2018-12-18 16:38:21');
INSERT INTO `disconnectlog` VALUES ('70', 'esp1001', '2018-12-18 22:59:01');
INSERT INTO `disconnectlog` VALUES ('71', 'esp1004', '2018-12-18 23:11:22');
INSERT INTO `disconnectlog` VALUES ('72', 'esp1003', '2018-12-18 23:45:33');
INSERT INTO `disconnectlog` VALUES ('73', 'esp002', '2018-12-18 23:47:21');
INSERT INTO `disconnectlog` VALUES ('74', 'esp1003', '2018-12-18 23:50:03');
INSERT INTO `disconnectlog` VALUES ('75', 'esp1003', '2018-12-19 11:19:11');
INSERT INTO `disconnectlog` VALUES ('76', 'esp1001', '2018-12-19 12:31:37');
INSERT INTO `disconnectlog` VALUES ('77', 'esp1003', '2018-12-19 12:42:29');
INSERT INTO `disconnectlog` VALUES ('78', 'esp1003', '2018-12-19 13:11:09');
INSERT INTO `disconnectlog` VALUES ('79', 'esp002', '2018-12-19 15:56:15');

-- ----------------------------
-- Table structure for machinelog
-- ----------------------------
DROP TABLE IF EXISTS `machinelog`;
CREATE TABLE `machinelog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` varchar(20) NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `updatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of machinelog
-- ----------------------------
INSERT INTO `machinelog` VALUES ('10', 'esp002', '192.168.0.101', '2018-12-19 15:56:15');
INSERT INTO `machinelog` VALUES ('11', 'esp001', '192.168.0.100', '2018-12-17 23:40:32');
INSERT INTO `machinelog` VALUES ('12', 'esp1002', '192.168.0.108', '2018-12-18 13:22:36');
INSERT INTO `machinelog` VALUES ('13', 'esp1001', '192.168.0.195', '2018-12-19 12:31:37');
INSERT INTO `machinelog` VALUES ('14', 'esp004', '192.168.31.200', '2018-10-20 21:59:54');
INSERT INTO `machinelog` VALUES ('15', 'esp1003', '192.168.0.149', '2018-12-19 13:11:09');
INSERT INTO `machinelog` VALUES ('16', 'esp003', '192.168.8.102', '2018-12-14 17:26:18');
INSERT INTO `machinelog` VALUES ('17', 'esp1004', '192.168.0.202', '2018-12-18 23:11:22');

-- ----------------------------
-- Table structure for machines
-- ----------------------------
DROP TABLE IF EXISTS `machines`;
CREATE TABLE `machines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` varchar(20) DEFAULT NULL,
  `mac` varchar(20) DEFAULT NULL,
  `instockdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of machines
-- ----------------------------
INSERT INTO `machines` VALUES ('1', 'esp003', '30AEA41A40DC', '2018-09-08 00:00:00');
INSERT INTO `machines` VALUES ('2', 'esp002', 'B4E62D98F5F1', '2018-09-08 00:00:00');
INSERT INTO `machines` VALUES ('3', 'esp1001', '240AC49F83F4', '2018-09-14 00:00:00');
INSERT INTO `machines` VALUES ('4', 'esp1002 ', '240AC49F8428', '2018-09-14 21:50:31');
INSERT INTO `machines` VALUES ('5', 'esp1003 ', '240AC49F83F0', '2018-09-14 21:50:47');
INSERT INTO `machines` VALUES ('6', 'esp1004', '240AC49F855C', '2018-09-14 21:50:59');
INSERT INTO `machines` VALUES ('7', 'esp1005', '240AC49F8408', '2018-09-14 21:51:09');
INSERT INTO `machines` VALUES ('8', 'esp004', '30AEA41A40DC', '2018-09-14 21:54:37');
INSERT INTO `machines` VALUES ('9', 'esp001', '30AEA48AC124', '2018-09-16 19:46:41');

-- ----------------------------
-- Table structure for userlight
-- ----------------------------
DROP TABLE IF EXISTS `userlight`;
CREATE TABLE `userlight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) DEFAULT NULL,
  `showtype` varchar(10) DEFAULT NULL,
  `testmode` varchar(10) DEFAULT NULL,
  `t` varchar(5000) DEFAULT NULL,
  `t1` varchar(200) DEFAULT NULL,
  `t2` varchar(200) DEFAULT NULL,
  `t3` varchar(200) DEFAULT NULL,
  `t4` varchar(200) DEFAULT NULL,
  `t5` varchar(200) DEFAULT NULL,
  `t6` varchar(200) DEFAULT NULL,
  `t7` varchar(200) DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of userlight
-- ----------------------------
INSERT INTO `userlight` VALUES ('1', '123456', 'repeat', 'test', '{\"t000\":\"00000000000000\",\"t001\":\"07050206030506\",\"t002\":\"0e0a040c060a0c\",\"t003\":\"150f0612090f12\",\"t004\":\"1c1408180c1418\",\"t005\":\"23190a1e0f191e\",\"t010\":\"2a1e0c24121e24\",\"t011\":\"31230e2a15232a\",\"t012\":\"38281030182830\",\"t013\":\"3f2d12361b2d36\",\"t014\":\"4632143c1e323c\",\"t015\":\"4d371642213742\",\"t020\":\"543c1848243c48\",\"t021\":\"5b411a4e27414e\",\"t022\":\"64501e5a32465a\",\"t023\":\"64643a6c4b5b6c\",\"t024\":\"6478567e64707e\",\"t025\":\"648c72907d8590\",\"t030\":\"64a08ea2969aa2\",\"t031\":\"64b4aab4afafb4\",\"t032\":\"64c8c8c8c8c8c8\",\"t033\":\"627a7a7a7a7a7a\",\"t034\":\"60797979797979\",\"t035\":\"5e787878787878\",\"t040\":\"5c777777777777\",\"t041\":\"5a767676767676\",\"t042\":\"58757575757575\",\"t043\":\"56747474747474\",\"t044\":\"54737373737373\",\"t045\":\"52727272727272\",\"t050\":\"50717171717171\",\"t051\":\"4f707070707070\",\"t052\":\"4e6f6f6f6f6f6f\",\"t053\":\"4d6e6e6e6e6e6e\",\"t054\":\"4c6d6d6d6d6d6d\",\"t055\":\"4b6c6c6c6c6c6c\",\"t060\":\"4a6b6b6b6b6b6b\",\"t061\":\"496a6a6a6a6a6a\",\"t062\":\"48696969696969\",\"t063\":\"47686868686868\",\"t064\":\"46676767676767\",\"t065\":\"45666666666666\",\"t070\":\"44656565656565\",\"t071\":\"43646464646464\",\"t072\":\"42636363636363\",\"t073\":\"41626262626262\",\"t074\":\"40616161616161\",\"t075\":\"3f606060606060\",\"t080\":\"3e5f5f5f5f5f5f\",\"t081\":\"3d5e5e5e5e5e5e\",\"t082\":\"3c5d5d5d5d5d5d\",\"t083\":\"3b5c5c5c5c5c5c\",\"t084\":\"3a5b5b5b5b5b5b\",\"t085\":\"395a5a5a5a5a5a\",\"t090\":\"38595959595959\",\"t091\":\"37585858585858\",\"t092\":\"36575757575757\",\"t093\":\"35565656565656\",\"t094\":\"34555555555555\",\"t095\":\"33545454545454\",\"t100\":\"32535353535353\",\"t101\":\"31525252525252\",\"t102\":\"30515151515151\",\"t103\":\"2f505050505050\",\"t104\":\"2e4f4f4f4f4f4f\",\"t105\":\"2d4e4e4e4e4e4e\",\"t110\":\"2c4d4d4d4d4d4d\",\"t111\":\"2b4c4c4c4c4c4c\",\"t112\":\"2a4b4b4b4b4b4b\",\"t113\":\"294a4a4a4a4a4a\",\"t114\":\"28494949494949\",\"t115\":\"27484848484848\",\"t120\":\"26474747474747\",\"t121\":\"25464646464646\",\"t122\":\"24454545454545\",\"t123\":\"23444444444444\",\"t124\":\"22434343434343\",\"t125\":\"21424242424242\",\"t130\":\"20414141414141\",\"t131\":\"1f404040404040\",\"t132\":\"1e3f3f3f3f3f3f\",\"t133\":\"1d3e3e3e3e3e3e\",\"t134\":\"1c3d3d3d3d3d3d\",\"t135\":\"1b3c3c3c3c3c3c\",\"t140\":\"1a3b3b3b3b3b3b\",\"t141\":\"193a3a3a3a3a3a\",\"t142\":\"18393939393939\",\"t143\":\"17383838383838\",\"t144\":\"16373737373737\",\"t145\":\"15363636363636\",\"t150\":\"14353535353535\",\"t151\":\"13343434343434\",\"t152\":\"12333333333333\",\"t153\":\"11323232323232\",\"t154\":\"10313131313131\",\"t155\":\"0f303030303030\",\"t160\":\"0e2f2f2f2f2f2f\",\"t161\":\"0d2e2e2e2e2e2e\",\"t162\":\"0c2d2d2d2d2d2d\",\"t163\":\"0b2c2c2c2c2c2c\",\"t164\":\"0a2b2b2b2b2b2b\",\"t165\":\"092a2a2a2a2a2a\",\"t170\":\"08292929292929\",\"t171\":\"07282828282828\",\"t172\":\"06272727272727\",\"t173\":\"05262626262626\",\"t174\":\"04252525252525\",\"t175\":\"03242424242424\",\"t180\":\"02232323232323\",\"t181\":\"01222222222222\",\"t182\":\"00212121212121\",\"t183\":\"00202020202020\",\"t184\":\"001f1f1f1f1f1f\",\"t185\":\"001e1e1e1e1e1e\",\"t190\":\"001d1d1d1d1d1d\",\"t191\":\"001c1c1c1c1c1c\",\"t192\":\"001b1b1b1b1b1b\",\"t193\":\"001a1a1a1a1a1a\",\"t194\":\"00191919191919\",\"t195\":\"00181818181818\",\"t200\":\"00171717171717\",\"t201\":\"00161616161616\",\"t202\":\"00151515151515\",\"t203\":\"00141414141414\",\"t204\":\"00131313131313\",\"t205\":\"00121212121212\",\"t210\":\"00111111111111\",\"t211\":\"00101010101010\",\"t212\":\"000f0f0f0f0f0f\",\"t213\":\"000e0e0e0e0e0e\",\"t214\":\"000d0d0d0d0d0d\",\"t215\":\"000c0c0c0c0c0c\",\"t220\":\"000b0b0b0b0b0b\",\"t221\":\"000a0a0a0a0a0a\",\"t222\":\"00090909090909\",\"t223\":\"00080808080808\",\"t224\":\"00070707070707\",\"t225\":\"00060606060606\",\"t230\":\"00050505050505\",\"t231\":\"00040404040404\",\"t232\":\"00030303030303\",\"t233\":\"00020202020202\",\"t234\":\"00010101010101\",\"t235\":\"00000000000000\",\"tfix\":\"ff646464646464\"}', null, null, null, null, null, null, null, '2018-12-14 11:22:50');
INSERT INTO `userlight` VALUES ('2', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', 'repeat', 'test', '{\"t000\":\"00000000000000\",\"t001\":\"01010101010101\",\"t002\":\"02020202020202\",\"t003\":\"03030303030303\",\"t004\":\"04040404040404\",\"t005\":\"05050505050505\",\"t010\":\"06060606060606\",\"t011\":\"07070707070707\",\"t012\":\"08080808080808\",\"t013\":\"09090909090909\",\"t014\":\"0a0a0a0a0a0a0a\",\"t015\":\"0b0b0b0b0b0b0b\",\"t020\":\"0c0c0c0c0c0c0c\",\"t021\":\"0d0d0d0d0d0d0d\",\"t022\":\"0e0e0e0e0e0e0e\",\"t023\":\"0f0f0f0f0f0f0f\",\"t024\":\"10101010101010\",\"t025\":\"11111111111111\",\"t030\":\"12121212121212\",\"t031\":\"13131313131313\",\"t032\":\"14141414141414\",\"t033\":\"15151515151515\",\"t034\":\"16161616161616\",\"t035\":\"17171717171717\",\"t040\":\"18181818181818\",\"t041\":\"19191919191919\",\"t042\":\"1a1a1a1a1a1a1a\",\"t043\":\"1b1b1b1b1b1b1b\",\"t044\":\"1c1c1c1c1c1c1c\",\"t045\":\"1d1d1d1d1d1d1d\",\"t050\":\"1e1e1e1e1e1e1e\",\"t051\":\"1f1f1f1f1f1f1f\",\"t052\":\"20202020202020\",\"t053\":\"21212121212121\",\"t054\":\"22222222222222\",\"t055\":\"23232323232323\",\"t060\":\"24242424242424\",\"t061\":\"25252525252525\",\"t062\":\"26262626262626\",\"t063\":\"27272727272727\",\"t064\":\"28282828282828\",\"t065\":\"29292929292929\",\"t070\":\"2a2a2a2a2a2a2a\",\"t071\":\"2b2b2b2b2b2b2b\",\"t072\":\"2c2c2c2c2c2c2c\",\"t073\":\"2d2d2d2d2d2d2d\",\"t074\":\"2e2e2e2e2e2e2e\",\"t075\":\"2f2f2f2f2f2f2f\",\"t080\":\"30303030303030\",\"t081\":\"31313131313131\",\"t082\":\"32323232323232\",\"t083\":\"33333333333333\",\"t084\":\"34343434343434\",\"t085\":\"35353535353535\",\"t090\":\"36363636363636\",\"t091\":\"37373737373737\",\"t092\":\"38383838383838\",\"t093\":\"39393939393939\",\"t094\":\"3a3a3a3a3a3a3a\",\"t095\":\"3b3b3b3b3b3b3b\",\"t100\":\"3c3c3c3c3c3c3c\",\"t101\":\"3d3d3d3d3d3d3d\",\"t102\":\"3e3e3e3e3e3e3e\",\"t103\":\"3f3f3f3f3f3f3f\",\"t104\":\"4040403f404040\",\"t105\":\"4141413f414141\",\"t110\":\"4242423f424242\",\"t111\":\"4343433f434343\",\"t112\":\"4444443f444344\",\"t113\":\"4545453f454345\",\"t114\":\"4646463f464346\",\"t115\":\"4747473f474347\",\"t120\":\"4d645e3f56435a\",\"t121\":\"4c635727554459\",\"t122\":\"4b625526544558\",\"t123\":\"4a615325534657\",\"t124\":\"49605124524756\",\"t125\":\"485f4f23514855\",\"t130\":\"475e4d22504854\",\"t131\":\"465d4b214f4853\",\"t132\":\"455c49204e4852\",\"t133\":\"445b471f4d4851\",\"t134\":\"435a451e4c4850\",\"t135\":\"4259431d4b484f\",\"t140\":\"4158411c4a484e\",\"t141\":\"41573f1b49484d\",\"t142\":\"41563d1a48484c\",\"t143\":\"41553b1947484b\",\"t144\":\"4154391847484a\",\"t145\":\"41533717474849\",\"t150\":\"41523516474848\",\"t151\":\"41513315474847\",\"t152\":\"41503114474846\",\"t153\":\"414f2f13474845\",\"t154\":\"414e2d12474844\",\"t155\":\"414d2b11474843\",\"t160\":\"414c2910474842\",\"t161\":\"414b270f474842\",\"t162\":\"414b250e474842\",\"t163\":\"414b230d474842\",\"t164\":\"414b210c474842\",\"t165\":\"414b1f0b474842\",\"t170\":\"414b1d0a474842\",\"t171\":\"414b1b09474842\",\"t172\":\"414b1908474842\",\"t173\":\"414b1707474842\",\"t174\":\"414b1506474842\",\"t175\":\"24481405242424\",\"t180\":\"23461304232323\",\"t181\":\"22441203222222\",\"t182\":\"21421102212121\",\"t183\":\"20401001202020\",\"t184\":\"1f3e0f001f1f1f\",\"t185\":\"1e3c0e001e1e1e\",\"t190\":\"1d3a0d001d1d1d\",\"t191\":\"1c380c001c1c1c\",\"t192\":\"1b360b001b1b1b\",\"t193\":\"1a340a001a1a1a\",\"t194\":\"19320900191919\",\"t195\":\"18300800181818\",\"t200\":\"172e0700171717\",\"t201\":\"162c0600161616\",\"t202\":\"152a0500151515\",\"t203\":\"14280400141414\",\"t204\":\"13260300131313\",\"t205\":\"12240200121212\",\"t210\":\"11220100111111\",\"t211\":\"10200000101010\",\"t212\":\"0f1e00000f0f0f\",\"t213\":\"0e1c00000e0e0e\",\"t214\":\"0d1a00000d0d0d\",\"t215\":\"0c1800000c0c0c\",\"t220\":\"0b1600000b0b0b\",\"t221\":\"0a1400000a0a0a\",\"t222\":\"09120000090909\",\"t223\":\"08100000080808\",\"t224\":\"070e0000070707\",\"t225\":\"060c0000060606\",\"t230\":\"050a0000050505\",\"t231\":\"04080000040404\",\"t232\":\"03060000030303\",\"t233\":\"02040000020202\",\"t234\":\"01020000010101\",\"t235\":\"00000000000000\",\"tfix\":\"64006400646464\"}', null, null, null, null, null, null, null, '2018-12-19 21:50:57');

-- ----------------------------
-- Table structure for userlightdetails
-- ----------------------------
DROP TABLE IF EXISTS `userlightdetails`;
CREATE TABLE `userlightdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `lid` tinyint(4) DEFAULT NULL,
  `tag` int(11) NOT NULL,
  `tagvalue` int(11) NOT NULL,
  `createdate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of userlightdetails
-- ----------------------------
INSERT INTO `userlightdetails` VALUES ('8', '123456', '1', '14', '100', '2018-12-15 23:33:25');
INSERT INTO `userlightdetails` VALUES ('9', '123456', '2', '14', '80', '2018-12-15 23:33:31');
INSERT INTO `userlightdetails` VALUES ('10', '123456', '3', '14', '30', '2018-12-15 23:33:40');
INSERT INTO `userlightdetails` VALUES ('11', '123456', '4', '14', '90', '2018-12-15 23:33:47');
INSERT INTO `userlightdetails` VALUES ('12', '123456', '5', '14', '50', '2018-12-15 23:33:58');
INSERT INTO `userlightdetails` VALUES ('13', '123456', '6', '14', '70', '2018-12-15 23:34:05');
INSERT INTO `userlightdetails` VALUES ('14', '123456', '7', '14', '90', '2018-12-15 23:34:13');
INSERT INTO `userlightdetails` VALUES ('15', '123456', '1', '30', '80', '2018-12-15 23:35:00');
INSERT INTO `userlightdetails` VALUES ('16', '123456', '1', '20', '100', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('17', '123456', '2', '20', '200', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('18', '123456', '3', '20', '200', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('19', '123456', '4', '20', '200', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('20', '123456', '5', '20', '200', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('21', '123456', '6', '20', '200', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('22', '123456', '7', '20', '200', '2018-12-16 00:37:30');
INSERT INTO `userlightdetails` VALUES ('163', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '1', '72', '77', '2018-12-19 21:57:51');
INSERT INTO `userlightdetails` VALUES ('164', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '2', '72', '100', '2018-12-19 21:57:51');
INSERT INTO `userlightdetails` VALUES ('165', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '3', '72', '94', '2018-12-19 21:57:51');
INSERT INTO `userlightdetails` VALUES ('166', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '4', '72', '63', '2018-12-19 21:57:51');
INSERT INTO `userlightdetails` VALUES ('167', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '5', '72', '86', '2018-12-19 21:57:51');
INSERT INTO `userlightdetails` VALUES ('168', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '7', '72', '90', '2018-12-19 21:57:52');
INSERT INTO `userlightdetails` VALUES ('169', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '6', '72', '67', '2018-12-19 21:57:52');
INSERT INTO `userlightdetails` VALUES ('170', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '1', '106', '65', '2018-12-19 22:00:29');
INSERT INTO `userlightdetails` VALUES ('171', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '2', '106', '75', '2018-12-19 22:00:29');
INSERT INTO `userlightdetails` VALUES ('172', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '3', '106', '21', '2018-12-19 22:00:29');
INSERT INTO `userlightdetails` VALUES ('173', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '4', '106', '6', '2018-12-19 22:00:29');
INSERT INTO `userlightdetails` VALUES ('174', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '5', '106', '71', '2018-12-19 22:00:29');
INSERT INTO `userlightdetails` VALUES ('175', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '6', '106', '72', '2018-12-19 22:00:29');
INSERT INTO `userlightdetails` VALUES ('176', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '7', '106', '66', '2018-12-19 22:00:29');

-- ----------------------------
-- Table structure for usermachines
-- ----------------------------
DROP TABLE IF EXISTS `usermachines`;
CREATE TABLE `usermachines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL,
  `mid` varchar(20) NOT NULL,
  `binddate` datetime NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `online` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of usermachines
-- ----------------------------
INSERT INTO `usermachines` VALUES ('1', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', 'esp003', '2018-12-14 13:06:45', '192.168.8.102', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `nickname` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `province` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `city` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `country` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `headimgurl` varchar(500) CHARACTER SET utf8mb4 DEFAULT NULL,
  `createdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastonline` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('2', 'o9Ruz0iGzFv0VhAiKr6xeIM9ivOA', '柴荣臻', '1', '上海', '杨浦', '中国', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqyN8el4FVMtDT1CMufoud3hiaXouGPT8Ng2ElODjoHoZUMKe8rZicmcXDecwReV7utedPM6Q6yytSA/132', '2018-09-14 23:03:03', '2018-12-19 22:00:32');
INSERT INTO `users` VALUES ('3', 'o9Ruz0k6t7SJYZgV358z-CcqUjGc', '愤怒的南瓜酱', '1', '上海', '杨浦', '中国', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAVQB8Z7Axx7oicWGHvibRxtuWkuiamyX1icdEERtxibdOqxpdqJMoT0L5R6N5rHSo9r9obxhlRSiasIMg/132', '2018-09-16 14:07:14', '2018-10-14 13:33:33');
INSERT INTO `users` VALUES ('4', 'o9Ruz0gySa2GZZUbSsHDasqM7S5w', 'C小囡', '2', '上海', '', '中国', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLFUoh62ckBZ7maia7KnWfMqiaVeklcM6gicvVQsOBbkWd0qEV7WAdteARiaR9MGQXY7icA2K8T9DJ0GXQ/132', '2018-09-29 23:05:38', '2018-09-29 23:32:42');
