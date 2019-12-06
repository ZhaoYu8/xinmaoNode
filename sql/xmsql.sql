/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-12-06 16:06:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for _order
-- ----------------------------
DROP TABLE IF EXISTS `_order`;
CREATE TABLE `_order` (
`id`  int(30) NOT NULL AUTO_INCREMENT ,
`orderId`  varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户名称' ,
`phone`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系方式' ,
`custAddress`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客户地址（只展示）' ,
`sales`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '销售' ,
`deliveryType`  varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配送方式 1.送货上门 2.部分自己送+快递 3.快递' ,
`address`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省区市' ,
`shipping`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址' ,
`courier`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '快递单号' ,
`orderDate`  date NULL DEFAULT NULL COMMENT '订单日期' ,
`downPayment`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '定金' ,
`remark`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`createDate`  datetime NULL DEFAULT NULL COMMENT '创建日期' ,
`createUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`updateDate`  datetime NULL DEFAULT NULL COMMENT '修改时间' ,
`updateUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人' ,
`company`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=60

;

-- ----------------------------
-- Records of _order
-- ----------------------------
BEGIN;
INSERT INTO `_order` VALUES ('44', 'DD20191024002', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-10-24', '0', '', '2019-10-24 17:48:19', '17', '2019-10-30 11:32:47', '17', '20'), ('45', 'DD20191025001', '43', '13370229012', '安徽省/芜湖市/无为县/泥汊镇赵小自然村02501', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村02501', '', '2019-10-25', '0', '', '2019-10-25 13:35:30', '17', '2019-10-25 14:36:43', '17', '20'), ('46', 'DD-2019-10-25-002', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '23', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-10-25', '0', '', '2019-10-25 16:59:34', '17', '2019-12-02 17:37:33', '17', '20'), ('47', 'DD-2019-10-28-001', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-10-28', '0', '', '2019-10-28 11:30:31', '17', '2019-11-25 14:51:14', '17', '20'), ('48', 'DD-2019-11-26-001', '43', '13370229012', '安徽省/芜湖市/无为县/泥汊镇赵小自然村02501', '23', '1', '340000,340200,340225', '泥汊镇赵小自然村02501', '', '2019-11-20', '0', '不知为何', '2019-11-26 15:05:11', '17', '2019-12-02 18:17:24', '17', '20'), ('49', 'DD-2019-11-26-002', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '23', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-11-26', '0', '321', '2019-11-26 15:24:00', '17', null, null, '20'), ('50', 'DD-2019-11-26-003', '43', '13370229012', '安徽省/芜湖市/无为县/泥汊镇赵小自然村02501', '23', '1', '340000,340200,340225', '泥汊镇赵小自然村02501', '', '2019-11-26', '0', '', '2019-11-26 15:59:01', '17', null, null, '20'), ('51', 'DD-2019-11-26-004', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-11-26', '12', '', '2019-11-26 16:01:00', '17', '2019-12-02 15:38:23', '17', '20'), ('52', 'DD-2019-11-26-005', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-11-26', '0', '', '2019-11-26 16:02:26', '17', '2019-11-27 17:04:00', '17', '20'), ('53', 'DD-2019-11-27-001', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-11-27', '0', '', '2019-11-27 10:43:41', '17', '2019-11-30 11:25:17', '17', '20'), ('54', 'DD-2019-12-02-001', '44', '15821836343', '安徽省/芜湖市/无为县/泥汊镇赵小自然村025', '17', '1', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-12-02', '0', '', '2019-12-02 17:52:39', '17', null, null, '20'), ('55', 'DD-2019-12-04-001', '49', '13370229059', '安徽省/芜湖市/无为县/无', '26', '1', '340000,340200,340225', '无', '', '2019-12-04', '20', '', '2019-12-04 17:20:23', '17', null, null, '20'), ('56', 'DD-2019-12-04-002', '50', '13370229059', '安徽省/芜湖市/无为县/无', '27', '1', '340000,340200,340225', '无', '', '2019-12-04', '0', '', '2019-12-04 17:21:13', '17', null, null, '20'), ('57', 'DD-2019-12-04-003', '51', '13370229059', '安徽省/芜湖市/无为县/无', '28', '1', '340000,340200,340225', '无', '', '2019-12-04', '0', '', '2019-12-04 17:21:33', '17', null, null, '20'), ('58', 'DD-2019-12-04-004', '52', '13370229059', '安徽省/芜湖市/无为县/123', '29', '1', '340000,340200,340225', '123', '', '2019-12-04', '0', '', '2019-12-04 17:21:56', '17', null, null, '20'), ('59', 'DD-2019-12-04-005', '53', '13370229059', '安徽省/芜湖市/无为县/嘿嘿', '29', '1', '340000,340200,340225', '嘿嘿', '', '2019-12-04', '0', '', '2019-12-04 17:27:41', '17', null, null, '20');
COMMIT;

-- ----------------------------
-- Table structure for _orderid
-- ----------------------------
DROP TABLE IF EXISTS `_orderid`;
CREATE TABLE `_orderid` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`currentIndex`  int(25) NOT NULL ,
`updateDate`  date NULL DEFAULT NULL COMMENT '创建日期' ,
`company`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=5

;

-- ----------------------------
-- Records of _orderid
-- ----------------------------
BEGIN;
INSERT INTO `_orderid` VALUES ('2', '5', '2019-12-04', '20'), ('4', '1', '2019-10-21', '38');
COMMIT;

-- ----------------------------
-- Table structure for _projectid
-- ----------------------------
DROP TABLE IF EXISTS `_projectid`;
CREATE TABLE `_projectid` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`currentIndex`  int(25) NOT NULL ,
`company`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=6

;

-- ----------------------------
-- Records of _projectid
-- ----------------------------
BEGIN;
INSERT INTO `_projectid` VALUES ('5', '6', '20');
COMMIT;

-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`parent`  int(25) NOT NULL ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=16

;

-- ----------------------------
-- Records of branch
-- ----------------------------
BEGIN;
INSERT INTO `branch` VALUES ('1', '鑫茂杯业', '0', '20'), ('2', '销售部', '1', '20'), ('11', '客户部', '1', '20'), ('12', '生产部', '1', '20'), ('13', '售后部', '1', '20'), ('15', 'ceshi', '0', '38');
COMMIT;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`createDate`  datetime NOT NULL ,
`phone`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=39

;

-- ----------------------------
-- Records of company
-- ----------------------------
BEGIN;
INSERT INTO `company` VALUES ('20', '鑫茂杯业', '2019-09-03 11:01:23', '13370229059'), ('38', 'ceshi', '2019-10-21 17:13:00', '13370229052');
COMMIT;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
`id`  int(24) NOT NULL AUTO_INCREMENT ,
`name`  varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名' ,
`phone`  varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系方式' ,
`address`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址合集' ,
`detailAddress`  varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址' ,
`photo`  varchar(99) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`createDate`  datetime NULL DEFAULT NULL COMMENT '创建日期' ,
`createUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=54

;

-- ----------------------------
-- Records of customer
-- ----------------------------
BEGIN;
INSERT INTO `customer` VALUES ('43', '赵宇', '13370229012', '340000,340200,340225', '泥汊镇赵小自然村02501', '', '2019-09-03 11:30:04', '17', '20'), ('44', '胡绿叶', '15821836343', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-09-03 18:01:40', '17', '20'), ('49', '赵先生', '13370229059', '340000,340200,340225', '无', '', '2019-12-04 16:58:29', '17', '20'), ('50', '王女士', '13370229059', '340000,340200,340225', '无', '', '2019-12-04 16:58:40', '17', '20'), ('51', '信业茶庄', '13370229059', '340000,340200,340225', '无', '', '2019-12-04 16:58:50', '17', '20'), ('52', '天然茶庄总店', '13370229059', '340000,340200,340225', '123', '', '2019-12-04 16:59:00', '17', '20'), ('53', '芜湖扬子银行美安路营业部', '13370229059', '340000,340200,340225', '嘿嘿', '', '2019-12-04 16:59:16', '17', '20');
COMMIT;

-- ----------------------------
-- Table structure for ordercollectmoney
-- ----------------------------
DROP TABLE IF EXISTS `ordercollectmoney`;
CREATE TABLE `ordercollectmoney` (
`id`  int(255) NOT NULL AUTO_INCREMENT ,
`orderId`  int(255) NULL DEFAULT NULL ,
`num`  int(255) NULL DEFAULT NULL ,
`remark`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderOperationId`  int(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=16

;

-- ----------------------------
-- Records of ordercollectmoney
-- ----------------------------
BEGIN;
INSERT INTO `ordercollectmoney` VALUES ('1', '53', '12', '第一次尝试收款', '54'), ('2', '53', '12', '第二次收款，老板是真的扣，我都醉了', '55'), ('3', '53', '1', '12', '56'), ('4', '53', '1', '', '57'), ('5', '53', '1', '', '58'), ('6', '53', '1', '', '59'), ('7', '53', '4', '123', '61'), ('8', '53', '12', '321', '62'), ('9', '53', '1', '1', '63'), ('10', '53', '111', '1', '64'), ('11', '53', '1', '', '65'), ('12', '53', '1', '', '66'), ('13', '53', '12', '32', '67'), ('14', '53', '1321', '', '69'), ('15', '51', '146', '', '71');
COMMIT;

-- ----------------------------
-- Table structure for orderdelivery
-- ----------------------------
DROP TABLE IF EXISTS `orderdelivery`;
CREATE TABLE `orderdelivery` (
`id`  int(255) NOT NULL AUTO_INCREMENT ,
`orderId`  int(255) NULL DEFAULT NULL ,
`projectId`  int(255) NULL DEFAULT NULL ,
`num`  int(255) NULL DEFAULT NULL ,
`remark`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderOperationId`  int(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=52

;

-- ----------------------------
-- Records of orderdelivery
-- ----------------------------
BEGIN;
INSERT INTO `orderdelivery` VALUES ('1', '52', '50', '1', '12', null), ('2', '52', '51', '1', '34', null), ('3', '52', '50', '1', '21', '18'), ('4', '52', '51', '1', '32', '18'), ('5', '52', '50', '1', '', '19'), ('6', '52', '51', '1', '', '19'), ('7', '52', '50', '1', '12', '20'), ('8', '52', '51', '1', '32', '20'), ('9', '52', '50', '1', '1', '21'), ('10', '52', '51', '1', '2', '21'), ('11', '52', '50', '1', '1', '22'), ('12', '52', '51', '1', '2', '22'), ('13', '52', '50', '1', '1', '23'), ('14', '52', '51', '1', '2', '23'), ('15', '52', '50', '1', '1', '24'), ('16', '52', '51', '1', '2', '24'), ('17', '52', '50', '1', '1', '25'), ('18', '52', '51', '1', '2', '25'), ('19', '52', '50', '1', '1', '26'), ('20', '52', '51', '1', '2', '26'), ('21', '52', '50', '1', '1', '27'), ('22', '52', '51', '1', '2', '27'), ('23', '52', '50', '1', '1', '28'), ('24', '52', '51', '1', '2', '28'), ('25', '52', '50', '1', '1', '29'), ('26', '52', '51', '1', '2', '29'), ('27', '52', '50', '1', '', '33'), ('28', '52', '51', '0', '', '33'), ('29', '52', '50', '1', '', '34'), ('30', '52', '51', '1', '', '34'), ('31', '52', '50', '1', '', '35'), ('32', '52', '51', '1', '', '35'), ('33', '52', '50', '1', '', '36'), ('34', '52', '51', '1', '', '36'), ('35', '52', '50', '0', '', '37'), ('36', '52', '51', '0', '', '37'), ('37', '52', '50', '0', '', '38'), ('38', '52', '51', '0', '', '38'), ('39', '52', '50', '0', '', '39'), ('40', '52', '51', '0', '', '39'), ('41', '52', '50', '0', '', '40'), ('42', '52', '51', '0', '', '40'), ('43', '53', '51', '1', '12', '41'), ('44', '53', '51', '1', '2', '42'), ('45', '53', '51', '1', '', '43'), ('46', '52', '50', '44', '', '45'), ('47', '52', '51', '17', '', '45'), ('48', '51', '50', '60', '', '48'), ('49', '53', '51', '1', '', '60'), ('50', '52', '50', '0', '', '74'), ('51', '52', '51', '-1', '', '74');
COMMIT;

-- ----------------------------
-- Table structure for orderoperation
-- ----------------------------
DROP TABLE IF EXISTS `orderoperation`;
CREATE TABLE `orderoperation` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`orderId`  int(25) NOT NULL ,
`operationUser`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`operationDate`  datetime NULL DEFAULT NULL ,
`operationType`  int(255) NULL DEFAULT NULL ,
`company`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=82

;

-- ----------------------------
-- Records of orderoperation
-- ----------------------------
BEGIN;
INSERT INTO `orderoperation` VALUES ('4', '52', '17', '2019-11-26 16:02:26', '0', '20'), ('6', '52', '17', '2019-11-26 16:07:26', '1', '20'), ('7', '52', '17', '2019-11-26 17:18:51', '1', '20'), ('8', '52', '17', '2019-11-26 17:19:59', '1', '20'), ('9', '52', '17', '2019-11-26 17:28:38', '1', '20'), ('10', '52', '17', '2019-11-26 17:44:07', '1', '20'), ('11', '52', '17', '2019-11-26 17:44:24', '1', '20'), ('12', '52', '17', '2019-11-26 17:48:25', '1', '20'), ('13', '52', '17', '2019-11-26 17:48:53', '1', '20'), ('14', '52', '17', '2019-11-26 17:48:58', '1', '20'), ('15', '52', '17', '2019-11-26 17:49:02', '1', '20'), ('16', '52', '17', '2019-11-26 17:49:05', '1', '20'), ('17', '53', '17', '2019-11-27 10:43:41', '0', '20'), ('18', '52', '17', '2019-11-27 11:10:20', '3', '20'), ('19', '52', '17', '2019-11-27 11:29:04', '3', '20'), ('20', '52', '17', '2019-11-27 14:12:01', '3', '20'), ('21', '52', '17', '2019-11-27 14:23:19', '3', '20'), ('22', '52', '17', '2019-11-27 14:23:24', '3', '20'), ('23', '52', '17', '2019-11-27 14:23:26', '3', '20'), ('24', '52', '17', '2019-11-27 14:23:28', '3', '20'), ('25', '52', '17', '2019-11-27 14:23:29', '3', '20'), ('26', '52', '17', '2019-11-27 14:23:30', '3', '20'), ('27', '52', '17', '2019-11-27 14:23:32', '3', '20'), ('28', '52', '17', '2019-11-27 14:23:46', '3', '20'), ('29', '52', '17', '2019-11-27 14:24:01', '3', '20'), ('30', '53', '17', '2019-11-27 14:33:14', '1', '20'), ('31', '52', '17', '2019-11-27 14:33:20', '1', '20'), ('32', '52', '23', '2019-11-27 14:36:24', '1', '20'), ('33', '52', '17', '2019-11-27 14:53:49', '3', '20'), ('34', '52', '17', '2019-11-27 15:27:15', '3', '20'), ('35', '52', '17', '2019-11-27 15:27:41', '3', '20'), ('36', '52', '17', '2019-11-27 15:27:50', '3', '20'), ('37', '52', '17', '2019-11-27 15:28:27', '3', '20'), ('38', '52', '17', '2019-11-27 15:28:41', '3', '20'), ('39', '52', '17', '2019-11-27 15:32:16', '3', '20'), ('40', '52', '17', '2019-11-27 15:36:47', '3', '20'), ('41', '53', '17', '2019-11-27 16:05:50', '3', '20'), ('42', '53', '17', '2019-11-27 16:06:01', '3', '20'), ('43', '53', '17', '2019-11-27 16:56:01', '3', '20'), ('44', '52', '17', '2019-11-27 17:04:00', '1', '20'), ('45', '52', '17', '2019-11-27 17:05:39', '3', '20'), ('46', '51', '17', '2019-11-27 18:12:54', '1', '20'), ('47', '51', '17', '2019-11-27 18:15:49', '1', '20'), ('48', '51', '17', '2019-11-27 18:16:03', '3', '20'), ('49', '51', '17', '2019-11-27 18:54:52', '1', '20'), ('50', '53', '17', '2019-11-30 11:24:54', '1', '20'), ('51', '53', '17', '2019-11-30 11:24:59', '1', '20'), ('52', '53', '17', '2019-11-30 11:25:06', '1', '20'), ('53', '53', '17', '2019-11-30 11:25:17', '1', '20'), ('54', '53', '17', '2019-11-30 16:35:35', '4', '20'), ('55', '53', '17', '2019-11-30 17:54:18', '4', '20'), ('56', '53', '17', '2019-11-30 17:56:34', '4', '20'), ('57', '53', '17', '2019-11-30 17:57:02', '4', '20'), ('58', '53', '17', '2019-11-30 17:57:05', '4', '20'), ('59', '53', '17', '2019-11-30 17:57:06', '4', '20'), ('60', '53', '17', '2019-11-30 17:57:21', '3', '20'), ('61', '53', '17', '2019-11-30 18:03:47', '4', '20'), ('62', '53', '17', '2019-11-30 18:06:54', '4', '20'), ('63', '53', '17', '2019-11-30 18:08:23', '4', '20'), ('64', '53', '17', '2019-11-30 18:08:43', '4', '20'), ('65', '53', '17', '2019-11-30 18:08:51', '4', '20'), ('66', '53', '17', '2019-11-30 18:10:27', '4', '20'), ('67', '53', '17', '2019-11-30 18:11:37', '4', '20'), ('68', '53', '17', '2019-11-30 18:11:41', '4', '20'), ('69', '53', '17', '2019-11-30 18:13:37', '4', '20'), ('70', '51', '17', '2019-12-02 15:38:23', '1', '20'), ('71', '51', '17', '2019-12-02 15:40:07', '4', '20'), ('72', '51', '17', '2019-12-02 16:02:29', '5', '20'), ('73', '46', '17', '2019-12-02 17:37:33', '1', '20'), ('74', '52', '17', '2019-12-02 17:50:29', '3', '20'), ('75', '54', '17', '2019-12-02 17:52:39', '0', '20'), ('76', '48', '17', '2019-12-02 18:17:24', '1', '20'), ('77', '55', '17', '2019-12-04 17:20:23', '0', '20'), ('78', '56', '17', '2019-12-04 17:21:13', '0', '20'), ('79', '57', '17', '2019-12-04 17:21:33', '0', '20'), ('80', '58', '17', '2019-12-04 17:21:56', '0', '20'), ('81', '59', '17', '2019-12-04 17:27:41', '0', '20');
COMMIT;

-- ----------------------------
-- Table structure for orderpremium
-- ----------------------------
DROP TABLE IF EXISTS `orderpremium`;
CREATE TABLE `orderpremium` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`money`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`remark`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderId`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=52

;

-- ----------------------------
-- Records of orderpremium
-- ----------------------------
BEGIN;
INSERT INTO `orderpremium` VALUES ('2', '支出', '-1', '', '47'), ('40', '支出', '-1', '', '44'), ('41', '支出', '-1', '', '44'), ('42', '支出', '-1', '', '44'), ('43', '1', '1', '1', '45'), ('44', '2', '2', '2', '45'), ('45', '3', '3', '3', '45'), ('46', '支出', '-1', '', '47'), ('47', '支出', '2', '', '48'), ('48', '支出', '-1', '', '49'), ('49', '打折', '-100', '客户非要打折没办法，给他少了100', '51'), ('50', '支出', '-1', '', '54'), ('51', '支出', '-1', '', '54');
COMMIT;

-- ----------------------------
-- Table structure for orderprojectlist
-- ----------------------------
DROP TABLE IF EXISTS `orderprojectlist`;
CREATE TABLE `orderprojectlist` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`projectId`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品id' ,
`sort`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品分类' ,
`units`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位' ,
`cost`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本' ,
`price`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单价' ,
`count`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数量' ,
`proRemark`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderId`  int(25) NOT NULL COMMENT '订单id' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=128

;

-- ----------------------------
-- Records of orderprojectlist
-- ----------------------------
BEGIN;
INSERT INTO `orderprojectlist` VALUES ('84', '50', '34', '个', '23', '32', '12', '4*28', '45'), ('86', '50', '34', '个', '23', '32', '1', '', '44'), ('87', '51', '34,38', '个', '12', '32', '1', '12', '44'), ('89', '51', '34,38', '个', '12', '32', '32', '4*60', '45'), ('91', '50', '34', '个', '23', '32', '1', '12', '46'), ('92', '51', '34,38', '个', '12', '32', '1', '32', '46'), ('93', '51', '34,38', '个', '12', '123', '1', '4*23', '47'), ('94', '51', '34,38', '个', '12', '32', '1', '', '48'), ('95', '51', '34,38', '个', '12', '32', '1', '', '49'), ('96', '50', '34', '个', '23', '32', '1', '', '50'), ('97', '50', '34', '个', '23', '4.3', '60', '', '51'), ('99', '51', '34,38', '个', '12', '32', '32', '', '52'), ('100', '50', '34', '个', '23', '32', '60', '1', '52'), ('102', '51', '34,38', '个', '12', '32', '1', '', '53'), ('103', '51', '34,38', '个', '12', '32', '1', '', '54'), ('104', '52', '34,38,51', '个', '12', '32', '60', '', '55'), ('105', '53', '34,38,50', '个', '65', '120', '60', '', '55'), ('106', '54', '34,38,49', '个', '12', '32', '60', '', '55'), ('107', '54', '34,38,49', '个', '12', '32', '50', '', '56'), ('108', '53', '34,38,50', '个', '65', '120', '50', '', '56'), ('109', '55', '34,38,48', '个', '55', '88', '50', '', '56'), ('110', '50', '34', '个', '23', '32', '50', '', '57'), ('111', '51', '34,38', '个', '12', '32', '50', '', '57'), ('112', '52', '34,38,51', '个', '12', '32', '50', '', '57'), ('113', '53', '34,38,50', '个', '65', '120', '50', '', '57'), ('114', '54', '34,38,49', '个', '12', '32', '50', '', '57'), ('115', '55', '34,38,48', '个', '55', '88', '50', '', '57'), ('116', '50', '34', '个', '23', '32', '50', '', '58'), ('117', '51', '34,38', '个', '12', '32', '50', '', '58'), ('118', '52', '34,38,51', '个', '12', '32', '50', '', '58'), ('119', '53', '34,38,50', '个', '65', '120', '50', '', '58'), ('120', '54', '34,38,49', '个', '12', '32', '50', '', '58'), ('121', '55', '34,38,48', '个', '55', '88', '50', '', '58'), ('122', '50', '34', '个', '23', '32', '50', '', '59'), ('123', '51', '34,38', '个', '12', '32', '50', '', '59'), ('124', '52', '34,38,51', '个', '12', '32', '50', '', '59'), ('125', '53', '34,38,50', '个', '65', '120', '50', '', '59'), ('126', '54', '34,38,49', '个', '12', '32', '50', '', '59'), ('127', '55', '34,38,48', '个', '55', '88', '50', '', '59');
COMMIT;

-- ----------------------------
-- Table structure for print
-- ----------------------------
DROP TABLE IF EXISTS `print`;
CREATE TABLE `print` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`address`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`phone`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`bank`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`account`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`isCustAddress`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`isQrcode`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`company`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=3

;

-- ----------------------------
-- Records of print
-- ----------------------------
BEGIN;
INSERT INTO `print` VALUES ('2', '安徽省芜湖市无为县泥汊镇赵小自然村025', '赵宇', '13370229059', '微信,中国银行', '13370229059,621479445614785144652', 'true', 'false', '20');
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`proNumber`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '产品名称' ,
`sort`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品类别' ,
`units`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位' ,
`cost`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本' ,
`price`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单价' ,
`createDate`  datetime NULL DEFAULT NULL COMMENT '创建日期' ,
`createUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=56

;

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES ('50', '000001', '尚浩亚', '34', '个', '23', '32', '2019-10-24 17:27:13', '17', '20'), ('51', '000002', '测试', '34,38', '个', '12', '32', '2019-10-25 14:22:10', '17', '20'), ('52', '000003', '金陵系列001', '34,38,51', '个', '12', '32', '2019-12-04 17:00:44', '17', '20'), ('53', '000004', '御赐系列001', '34,38,50', '个', '65', '120', '2019-12-04 17:01:03', '17', '20'), ('54', '000005', '极品系列001', '34,38,49', '个', '12', '32', '2019-12-04 17:01:16', '17', '20'), ('55', '000006', '二等精品001', '34,38,48', '个', '55', '88', '2019-12-04 17:01:33', '17', '20');
COMMIT;

-- ----------------------------
-- Table structure for projectphoto
-- ----------------------------
DROP TABLE IF EXISTS `projectphoto`;
CREATE TABLE `projectphoto` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(888) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`url`  varchar(888) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`projectId`  int(25) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=53

;

-- ----------------------------
-- Records of projectphoto
-- ----------------------------
BEGIN;
INSERT INTO `projectphoto` VALUES ('52', 'a73a589928890aa3d9a702a4b31f692.jpg', 'http://122.152.212.105//uploads/1575602586180.jpg', '51');
COMMIT;

-- ----------------------------
-- Table structure for projectsort
-- ----------------------------
DROP TABLE IF EXISTS `projectsort`;
CREATE TABLE `projectsort` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`parent`  int(25) NULL DEFAULT NULL ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=52

;

-- ----------------------------
-- Records of projectsort
-- ----------------------------
BEGIN;
INSERT INTO `projectsort` VALUES ('34', '杯子', '0', '20'), ('38', '尚浩亚', '34', '20'), ('39', '精品', '38', '20'), ('40', '123', '39', '20'), ('48', '二等精品', '38', '20'), ('49', '极品', '38', '20'), ('50', '御赐', '38', '20'), ('51', '金陵', '38', '20');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id`  int(99) NOT NULL AUTO_INCREMENT COMMENT 'id主键' ,
`name`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名' ,
`phone`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号' ,
`position`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职位' ,
`branch`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门' ,
`sex`  int(5) NULL DEFAULT 1 COMMENT '性别（1是男的 0是女的）' ,
`address`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址' ,
`detailAddress`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址' ,
`password`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码' ,
`dr`  int(50) NOT NULL COMMENT '状态(1是正常 0是删除)' ,
`sales`  int(5) NULL DEFAULT 1 COMMENT '是否显示在销售列表下（1是显示 0是不显示）' ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=30

;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('17', '赵宇', '13370229059', null, '1', '1', '340000,340200,340225', '测试', '123456', '1', '1', '20'), ('23', '小绿叶', '13370229052', null, '1,2', '0', '340000,340200,340225', '泥汊镇赵小自然村', '654321', '1', '1', '20'), ('25', '13370229052', '13370229052', null, '15', '1', null, null, '123456', '1', '1', '38'), ('26', '小王', '13343021602', null, '1,2', '1', '340000,340200,340225', '无', '654321', '1', '1', '20'), ('27', '小路', '13375623221', null, '1,2', '1', '340000,340200,340225', '221122', '654321', '1', '1', '20'), ('28', '小潘', '13123213123', null, '1,2', '1', '340000,340200,340225', '004551515', '654321', '1', '1', '20'), ('29', '小深', '13386424121', null, '1,2', '1', '340000,340200,340225', '321', '654321', '1', '1', '20');
COMMIT;

-- ----------------------------
-- Auto increment value for _order
-- ----------------------------
ALTER TABLE `_order` AUTO_INCREMENT=60;

-- ----------------------------
-- Auto increment value for _orderid
-- ----------------------------
ALTER TABLE `_orderid` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for _projectid
-- ----------------------------
ALTER TABLE `_projectid` AUTO_INCREMENT=6;

-- ----------------------------
-- Auto increment value for branch
-- ----------------------------
ALTER TABLE `branch` AUTO_INCREMENT=16;

-- ----------------------------
-- Auto increment value for company
-- ----------------------------
ALTER TABLE `company` AUTO_INCREMENT=39;

-- ----------------------------
-- Auto increment value for customer
-- ----------------------------
ALTER TABLE `customer` AUTO_INCREMENT=54;

-- ----------------------------
-- Auto increment value for ordercollectmoney
-- ----------------------------
ALTER TABLE `ordercollectmoney` AUTO_INCREMENT=16;

-- ----------------------------
-- Auto increment value for orderdelivery
-- ----------------------------
ALTER TABLE `orderdelivery` AUTO_INCREMENT=52;

-- ----------------------------
-- Auto increment value for orderoperation
-- ----------------------------
ALTER TABLE `orderoperation` AUTO_INCREMENT=82;

-- ----------------------------
-- Auto increment value for orderpremium
-- ----------------------------
ALTER TABLE `orderpremium` AUTO_INCREMENT=52;

-- ----------------------------
-- Auto increment value for orderprojectlist
-- ----------------------------
ALTER TABLE `orderprojectlist` AUTO_INCREMENT=128;

-- ----------------------------
-- Auto increment value for print
-- ----------------------------
ALTER TABLE `print` AUTO_INCREMENT=3;

-- ----------------------------
-- Auto increment value for project
-- ----------------------------
ALTER TABLE `project` AUTO_INCREMENT=56;

-- ----------------------------
-- Auto increment value for projectphoto
-- ----------------------------
ALTER TABLE `projectphoto` AUTO_INCREMENT=53;

-- ----------------------------
-- Auto increment value for projectsort
-- ----------------------------
ALTER TABLE `projectsort` AUTO_INCREMENT=52;

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
ALTER TABLE `user` AUTO_INCREMENT=30;
