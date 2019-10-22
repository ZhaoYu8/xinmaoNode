/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL COMMENT '产品名称',
  `sort` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品类别',
  `units` varchar(25) DEFAULT NULL COMMENT '单位',
  `cost` varchar(25) DEFAULT NULL COMMENT '成本',
  `price` varchar(25) DEFAULT NULL COMMENT '单价',
  `createDate` datetime DEFAULT NULL COMMENT '创建日期',
  `createUser` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建人',
  `company` int(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('32', '茶杯', '34,38', '个', '20', '30', '2019-09-10 14:03:46', '17', '20');
INSERT INTO `project` VALUES ('33', '精品杯子23', '34,38,39', '个', '20', '25', '2019-09-10 14:18:13', '17', '20');
INSERT INTO `project` VALUES ('36', '测试', '34,38,39', '个', '23', '35', '2019-10-08 15:28:19', '17', '20');
INSERT INTO `project` VALUES ('37', '测试2', '34,38,39', '个', '23', '32', '2019-10-08 15:28:32', '17', '20');
INSERT INTO `project` VALUES ('38', '差一点的', '34,38,39', '个', '12', '15', '2019-10-08 15:28:44', '17', '20');
INSERT INTO `project` VALUES ('39', '差很多的', '34,38,39', '个', '5', '8', '2019-10-08 15:28:59', '17', '20');
