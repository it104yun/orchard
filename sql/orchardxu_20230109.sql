-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3306
-- 產生時間： 2023-01-09 13:10:09
-- 伺服器版本： 5.7.36
-- PHP 版本： 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `orchardxu`
--

-- --------------------------------------------------------

--
-- 資料表結構 `auth_info`
--

DROP TABLE IF EXISTS `auth_info`;
CREATE TABLE IF NOT EXISTS `auth_info` (
  `user_role` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色',
  `user_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '帳號(手機號碼)',
  `user_pwd` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密碼',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`user_id`),
  KEY `user_role` (`user_role`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `auth_info`
--

INSERT INTO `auth_info` (`user_role`, `user_id`, `user_pwd`, `create_time`, `edit_time`) VALUES
('Customer', '0900111002', '123456', '2023-01-08 05:48:34', '2023-01-08 13:30:44'),
('Customer', '0900111001', 'Abc12345', '2023-01-09 03:13:40', '2023-01-09 03:18:06'),
('Customer', '0900111003', 'aBC12345', '2023-01-09 07:54:27', '2023-01-09 07:54:27'),
('Customer', '0900111004', 'aBC12345', '2023-01-09 07:55:43', '2023-01-09 07:55:43'),
('Customer', '0900111005', 'ABVd1234', '2023-01-09 07:57:20', '2023-01-09 07:57:20'),
('Customer', '0900111006', 'uIO123456', '2023-01-09 08:00:16', '2023-01-09 08:00:16'),
('Customer', '0900111007', 'Abc123456', '2023-01-09 08:01:47', '2023-01-09 08:01:47'),
('Customer', '0900111008', 'pOI12345678', '2023-01-09 08:03:01', '2023-01-09 08:03:01'),
('Customer', '0900111009', 'Abc12345', '2023-01-09 08:03:57', '2023-01-09 08:03:57'),
('Customer', '0900111010', 'pO1234567', '2023-01-09 08:05:11', '2023-01-09 08:05:11');

-- --------------------------------------------------------

--
-- 資料表結構 `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cust_id` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orcer_number` int(11) NOT NULL COMMENT '轉換後的訂單編號,沒有訂單編號的資料,會顯示在cart上',
  `item_code` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '品項代碼/連結product',
  `item_name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '品名,由product預帶後存檔',
  `pkg_content` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '由package帶入後儲存',
  `quantity` int(11) NOT NULL COMMENT '數量',
  `price` int(11) NOT NULL COMMENT '單價,由product預帶後存檔',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`cust_id`,`orcer_number`,`item_code`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `contract`
--

DROP TABLE IF EXISTS `contract`;
CREATE TABLE IF NOT EXISTS `contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '合約編號',
  `active_date` date NOT NULL COMMENT '啟用日期',
  `stop_date` datetime NOT NULL COMMENT '停用日期',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '合約內容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `cust_info`
--

DROP TABLE IF EXISTS `cust_info`;
CREATE TABLE IF NOT EXISTS `cust_info` (
  `cust_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '帳號(手機號碼)',
  `cust_name` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '客戶姓名',
  `gender` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓別 1:男性   2:女性',
  `email` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'email',
  `zipcode1` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '郵遞區號1',
  `city1` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '縣市1',
  `dist1` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '鄉,鎮,市,區',
  `address1` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '配送地址1',
  `zipcode2` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '郵遞區號2',
  `city2` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '縣市2',
  `dist2` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鄉,鎮,市,區',
  `address2` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '配送地址2',
  `zipcode3` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '郵遞區號3',
  `city3` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '縣市3',
  `dist3` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鄉,鎮,市,區',
  `address3` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '配送地址3',
  `contract_id` int(11) DEFAULT NULL COMMENT '同意的合約編號\r\ncontract_id,foreignkey',
  `contract_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '同意合約的時間',
  `contract_ip` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '同意合約的ip(註冊的ip)',
  `contract_machine` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '同意合約的機器(註冊的電腦)',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`cust_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `cust_info`
--

INSERT INTO `cust_info` (`cust_id`, `cust_name`, `gender`, `email`, `zipcode1`, `city1`, `dist1`, `address1`, `zipcode2`, `city2`, `dist2`, `address2`, `zipcode3`, `city3`, `dist3`, `address3`, `contract_id`, `contract_time`, `contract_ip`, `contract_machine`, `create_time`, `edit_time`) VALUES
('0900111002', '陳美美', '1', 'olive.oyl168@gmail.com', '116', '臺北市', '文山區', '中山路-----幸福里', '300', '新竹市', '東區', '---中山路十段10巷100號,美滿街', '813', '高雄市', '左營區', '$$$$$$rrrrrrrrrrrrrrr今天天氣不錯', 999999999, '2023-01-08 13:48:34', '---', '---', '2023-01-08 05:48:34', '2023-01-09 03:12:13'),
('0900111001', '蘇麗雲', '1', 'sophia@gmail.com', '802', '高雄市', '苓雅區', '中山路120號11巷1000號10樓B室', '212', '連江縣', '東引鄉', '---中山路十段10巷100號&&&&&', '262', '宜蘭縣', '礁溪鄉', '---dddddddddddddddddddddddddddd', 999999999, '2023-01-09 11:13:40', '---', '---', '2023-01-09 03:13:40', '2023-01-09 03:20:40'),
('0900111003', '田密密', '1', 'axx@kkk.com.tw', '721', '臺南市', '麻豆區', '台灣大道16688號9999巷777號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 15:54:27', '---', '---', '2023-01-09 07:54:27', '2023-01-09 07:54:27'),
('0900111004', '元重重', '1', 'iloveyou@yahoo.com.tw', '823', '高雄市', '田寮區', '大馬路56666巷2569號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 15:55:43', '---', '---', '2023-01-09 07:55:43', '2023-01-09 07:55:43'),
('0900111005', '何君君', '1', 'sofia_ch@tiongl.con.tw', '722', '臺南市', '佳里區', '佳人里佳人路111巷666666號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 15:57:20', '---', '---', '2023-01-09 07:57:20', '2023-01-09 07:57:20'),
('0900111006', '王帥帥', '1', 'siasia@cender.com.tw', '819', '南海島', '南沙群島', '中山北路25巷555弄69號10樓', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 16:00:16', '---', '---', '2023-01-09 08:00:16', '2023-01-09 08:00:16'),
('0900111007', '藍亞雅', '1', 'yaya@yahoo.com.tw', '234', '新北市', '永和區', '羅斯福路美麗街美麗巷110號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 16:01:47', '---', '---', '2023-01-09 08:01:47', '2023-01-09 08:01:47'),
('0900111008', '孫麗麗', '1', 'lili_su@google.com', '514', '彰化縣', '溪湖鎮', '經國路幸福街幸福巷1111號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 16:03:01', '---', '---', '2023-01-09 08:03:01', '2023-01-09 08:03:01'),
('0900111009', '楊過', '1', 'yang_go@google.com', '718', '臺南市', '關廟區', '文心南路11111號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 16:03:57', '---', '---', '2023-01-09 08:03:57', '2023-01-09 08:03:57'),
('0900111010', '小龍女', '1', 'small_dragen@google.com', '364', '苗栗縣', '大湖鄉', '草莓里11111巷9999號', '---', '---', '---', '---', '---', '---', '---', '---', 999999999, '2023-01-09 16:05:11', '---', '---', '2023-01-09 08:05:11', '2023-01-09 08:05:11');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號/序號',
  `status` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '狀態 0.不顯示 1.顯示',
  `order_item` int(11) NOT NULL COMMENT '顯示順序',
  `order_num` int(11) NOT NULL COMMENT '細項顯示順序',
  `content` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE IF NOT EXISTS `order_detail` (
  `order_number` int(11) NOT NULL COMMENT '連結order_master',
  `seq` int(11) NOT NULL COMMENT '序單序號',
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '產品品項,由購物車cart帶入',
  `iitem_name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '由購物車cart帶入',
  `pkg_content` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '由購物車cart帶入',
  `price` int(11) NOT NULL COMMENT '產品單價',
  `quantity` int(11) NOT NULL COMMENT '訂購數量',
  `checkout` tinyint(1) NOT NULL COMMENT '結帳與否',
  `amount` int(11) NOT NULL COMMENT '總價',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`order_number`,`seq`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `order_master`
--

DROP TABLE IF EXISTS `order_master`;
CREATE TABLE IF NOT EXISTS `order_master` (
  `order_number` int(11) NOT NULL AUTO_INCREMENT COMMENT '訂單號碼',
  `cust_id` int(11) NOT NULL COMMENT '客戶號碼',
  `dely_sel` enum('黑貓宅配','親自配送') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '配送方式選擇',
  `dely_time` datetime NOT NULL COMMENT '配送時間',
  `address` int(11) NOT NULL COMMENT '配送地址',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`order_number`),
  KEY `cust_id+order_number` (`cust_id`,`order_number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `package`
--

DROP TABLE IF EXISTS `package`;
CREATE TABLE IF NOT EXISTS `package` (
  `item_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '產品編號',
  `seq` int(11) NOT NULL COMMENT '包裝類別代號',
  `pkg_content` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '包裝方式',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`item_code`,`seq`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `user_role` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色,依角色訂權限',
  `role_name` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '程式代號,按紐id,page name',
  `pid_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'pid的名稱',
  `creat_` tinyint(1) NOT NULL COMMENT '建立',
  `read_` tinyint(1) NOT NULL COMMENT '讀取',
  `read_all` tinyint(1) NOT NULL COMMENT '讀取全部',
  `update_` tinyint(1) NOT NULL COMMENT '更新',
  `delete_` tinyint(1) NOT NULL COMMENT '刪除',
  `copy_` tinyint(1) NOT NULL COMMENT '複製',
  `expand_` tinyint(1) NOT NULL COMMENT '展開',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`user_role`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `permission`
--

INSERT INTO `permission` (`user_role`, `role_name`, `pid`, `pid_name`, `creat_`, `read_`, `read_all`, `update_`, `delete_`, `copy_`, `expand_`, `create_time`, `edit_time`) VALUES
('Customer', '客戶', '所有上網訂購的客戶', '', 0, 0, 0, 0, 0, 0, 0, '2022-12-29 03:31:58', '2022-12-29 03:31:58'),
('Manager', '後台管理者', '新增product,修改配送狀態,上架產品, 上架news......', '', 0, 0, 0, 0, 0, 0, 0, '2022-12-29 03:32:50', '2022-12-29 03:32:50'),
('Mis', '系統管理者', '調整table,設定選項,資料備份...', '', 0, 0, 0, 0, 0, 0, 0, '2022-12-29 03:33:21', '2022-12-29 03:33:21'),
('Gust', '參訪者', '有註冊過,但未曾購買過產品的人....一律列為參訪者', '', 0, 0, 0, 0, 0, 0, 0, '2022-12-29 03:34:13', '2022-12-29 03:34:13'),
('Stop', '輸錯帳號暫停', '', '', 0, 0, 0, 0, 0, 0, 0, '2022-12-29 03:49:49', '2022-12-29 03:49:49');

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `item_code` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'used for:cart,order_detail,package',
  `item_name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '品項名稱',
  `package_seq` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '與package連結seq包裝編號',
  `price` int(11) NOT NULL COMMENT '產品單價',
  `stock_qty` int(11) NOT NULL COMMENT '庫存數量',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  `edit_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`item_code`),
  UNIQUE KEY `item_code+package_seq` (`item_code`,`package_seq`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
