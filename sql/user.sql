/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:34:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(99) NOT NULL AUTO_INCREMENT COMMENT 'id主键',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `phone` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `position` varchar(50) DEFAULT NULL COMMENT '职位',
  `branch` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门',
  `sex` int(5) DEFAULT '1' COMMENT '性别（1是男的 0是女的）',
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地址',
  `detailAddress` varchar(50) DEFAULT NULL COMMENT '详细地址',
  `password` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `dr` int(50) NOT NULL COMMENT '状态(1是正常 0是删除)',
  `sales` int(5) DEFAULT '1' COMMENT '是否显示在销售列表下（1是显示 0是不显示）',
  `company` int(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('17', '小赵', '13370229059', null, '1', '1', '340000,340200,340225', '测试', '123456', '1', '1', '20');
INSERT INTO `user` VALUES ('23', '小绿叶', '13370229059', null, '1,2', '0', '340000,340200,340225', '泥汊镇赵小自然村', '654321', '1', '1', '20');
INSERT INTO `user` VALUES ('25', '13370229052', '13370229052', null, '15', '1', null, null, '123456', '1', '1', '38');
