-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 17, 2025 at 05:46 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `class_helper`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_lists`
--

CREATE TABLE `attendance_lists` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `status` enum('active','closed') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance_lists`
--

INSERT INTO `attendance_lists` (`id`, `title`, `teacher_id`, `status`, `created_at`) VALUES
(1, 'Test', 1, 'closed', '2025-04-07 13:44:23'),
(4, 'Test Attendance List', 4, 'closed', '2025-06-01 06:43:09'),
(5, 'Test Attendance List', 4, 'closed', '2025-06-01 06:43:53'),
(6, 'Test Attendance List', 4, 'closed', '2025-06-01 06:45:22'),
(7, 'Test Attendance List', 4, 'closed', '2025-06-01 06:47:23'),
(8, 'Test Attendance List', 4, 'closed', '2025-06-01 06:50:32'),
(14, 'Test Attendance List', 4, 'closed', '2025-06-01 07:02:04'),
(70, '06/2025', 1, 'active', '2025-06-17 10:03:55'),
(71, '06/2025', 1, 'active', '2025-06-17 10:04:03'),
(72, '06/2025', 1, 'active', '2025-06-17 10:04:06'),
(73, '06/2025', 1, 'active', '2025-06-17 10:04:08');

-- --------------------------------------------------------

--
-- Table structure for table `attendance_record`
--

CREATE TABLE `attendance_record` (
  `id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `status` enum('pending','attended','absent') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance_record`
--

INSERT INTO `attendance_record` (`id`, `list_id`, `student_id`, `status`) VALUES
(1, 1, 2, 'absent'),
(13, 4, 31, 'absent'),
(14, 4, 8, 'absent'),
(15, 4, 7, 'absent'),
(16, 4, 5, 'absent'),
(17, 4, 4, 'absent'),
(18, 4, 3, 'absent'),
(19, 4, 2, 'absent'),
(20, 5, 31, 'absent'),
(21, 5, 8, 'absent'),
(22, 5, 7, 'absent'),
(23, 5, 5, 'absent'),
(24, 5, 4, 'absent'),
(25, 5, 3, 'absent'),
(26, 5, 2, 'absent'),
(27, 6, 31, 'absent'),
(28, 6, 8, 'absent'),
(29, 6, 7, 'absent'),
(30, 6, 5, 'absent'),
(31, 6, 4, 'absent'),
(32, 6, 3, 'absent'),
(33, 6, 2, 'absent'),
(34, 7, 31, 'absent'),
(35, 7, 8, 'absent'),
(36, 7, 7, 'absent'),
(37, 7, 5, 'absent'),
(38, 7, 4, 'absent'),
(39, 7, 3, 'absent'),
(40, 7, 2, 'absent'),
(41, 8, 31, 'absent'),
(42, 8, 8, 'absent'),
(43, 8, 7, 'absent'),
(44, 8, 5, 'absent'),
(45, 8, 4, 'absent'),
(46, 8, 3, 'absent'),
(47, 8, 2, 'absent'),
(83, 14, 31, 'absent'),
(84, 14, 8, 'absent'),
(85, 14, 7, 'absent'),
(86, 14, 5, 'absent'),
(87, 14, 4, 'absent'),
(88, 14, 3, 'absent'),
(89, 14, 2, 'absent'),
(475, 70, 109, 'pending'),
(476, 70, 31, 'pending'),
(477, 70, 8, 'pending'),
(478, 70, 7, 'pending'),
(479, 70, 5, 'pending'),
(480, 70, 4, 'pending'),
(481, 70, 3, 'pending'),
(482, 70, 2, 'pending'),
(483, 71, 109, 'pending'),
(484, 71, 31, 'pending'),
(485, 71, 8, 'pending'),
(486, 71, 7, 'pending'),
(487, 71, 5, 'pending'),
(488, 71, 4, 'pending'),
(489, 71, 3, 'pending'),
(490, 71, 2, 'pending'),
(491, 72, 109, 'pending'),
(492, 72, 31, 'pending'),
(493, 72, 8, 'pending'),
(494, 72, 7, 'pending'),
(495, 72, 5, 'pending'),
(496, 72, 4, 'pending'),
(497, 72, 3, 'pending'),
(498, 72, 2, 'pending'),
(499, 73, 109, 'pending'),
(500, 73, 31, 'pending'),
(501, 73, 8, 'pending'),
(502, 73, 7, 'pending'),
(503, 73, 5, 'pending'),
(504, 73, 4, 'pending'),
(505, 73, 3, 'pending'),
(506, 73, 2, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `registration_lists`
--

CREATE TABLE `registration_lists` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration_lists`
--

INSERT INTO `registration_lists` (`id`, `username`) VALUES
(10, 'e2e-admin'),
(9, 'e2e-Tester'),
(11, 'e2e-Tester-1'),
(2, 'studentTest1'),
(1, 'Teacher1'),
(8, 'Teacher2'),
(12, 'test-register'),
(54, 'test-register123'),
(274, 'test-register555555'),
(285, 'test-user123'),
(3, 'Test2'),
(4, 'Test3'),
(5, 'Test4'),
(7, 'TesterTest'),
(221, 'testUser+0025c5fc-c079-4487-acaa-908682f8653f'),
(227, 'testUser+20cedc49-71b5-495b-b021-edf6cda5f31e'),
(182, 'testUser+42d81fb1-a9da-4f99-995d-6d90659d4c82'),
(233, 'testUser+437ef66d-55bf-47f3-bc35-31ee366eb1c5'),
(189, 'testUser+4f6ce631-b41b-43ba-ba46-2b9fa917d787'),
(251, 'testUser+65659c8e-d095-424c-89d0-a61778306f13'),
(230, 'testUser+79869fbc-8fd2-4519-8023-b2782c5d8441'),
(198, 'testUser+813dcd52-a7bf-42d9-a8ec-2476afb2b235'),
(218, 'testUser+8a3c03a7-9544-4818-8a4a-7a5596e25c8b'),
(185, 'testUser+8da4ea7a-7eb1-4205-8a99-ee192d2f1942'),
(210, 'testUser+92856152-c857-4f18-9677-4b81c960597f'),
(215, 'testUser+9cb75dd5-e853-4ff6-b82c-14bb0e1770c2'),
(248, 'testUser+9e680181-d164-4c9d-8166-fef58da7cff2'),
(201, 'testUser+bb4c5de3-7bf7-4010-ba0e-d7c650070e51'),
(213, 'testUser+c59180ee-7f22-45d1-95ff-a736c405a243'),
(224, 'testUser+e1739752-3a42-4075-8e7c-4db2b305ebe2'),
(193, 'testUser+e84310e9-5091-4282-9445-0d70634955b8'),
(206, 'testUser+fe1fd125-a6cb-4534-8b14-bb1e1254e10e'),
(277, 'testUser074fca6d'),
(279, 'testUser18973279'),
(275, 'testUser45ef1a22'),
(276, 'testUser5656c54f'),
(278, 'testUser7d1ba5e1');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'teacher'),
(2, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `salary_lists`
--

CREATE TABLE `salary_lists` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `month_year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `daily_rate` bigint(20) NOT NULL,
  `status` enum('active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `total_records` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salary_lists`
--

INSERT INTO `salary_lists` (`id`, `title`, `month_year`, `daily_rate`, `status`, `total_records`, `created_at`, `updated_at`) VALUES
(1, 'Salary List for 6/2025', '6/2025', 60000, 'active', 0, '2025-06-17 06:20:57', '2025-06-17 06:20:57'),
(2, 'Salary List for 6/2025', '6/2025', 60000, 'active', 0, '2025-06-17 06:21:24', '2025-06-17 06:21:41'),
(3, 'Salary List for 6/2025', '6/2025', 60000, 'active', 0, '2025-06-17 06:23:06', '2025-06-17 06:23:06'),
(4, 'Salary List for 6/2025', '6/2025', 60000, 'active', 0, '2025-06-17 06:25:32', '2025-06-17 06:25:32'),
(5, 'Salary List for 6/2025', '6/2025', 60000, 'completed', NULL, '2025-06-17 06:26:42', '2025-06-17 06:55:54'),
(6, 'Salary List for 6/2025', '6/2025', 60000, 'completed', NULL, '2025-06-17 07:01:32', '2025-06-17 07:54:02'),
(7, 'Salary List for 6/2025', '6/2025', 60000, 'active', 6, '2025-06-17 07:02:24', '2025-06-17 07:02:24'),
(8, 'Salary List for 6/2025', '6/2025', 60000, 'active', 6, '2025-06-17 07:02:34', '2025-06-17 07:02:58'),
(10, 'Salary List for 6/2025', '6/2025', 60000, 'completed', NULL, '2025-06-17 07:04:29', '2025-06-17 07:53:04'),
(12, 'Salary List for 6/2025', '6/2025', 60000, 'active', 6, '2025-06-17 08:12:40', '2025-06-17 08:12:40'),
(13, 'Salary List for 06/2025', '06/2025', 60000, 'active', 6, '2025-06-17 10:04:23', '2025-06-17 10:04:23'),
(14, 'Salary List for 6/2025', '6/2025', 60000, 'active', 6, '2025-06-17 10:08:08', '2025-06-17 10:08:08'),
(15, 'Salary List for 6/2025', '6/2025', 10000, 'active', 6, '2025-06-17 10:10:35', '2025-06-17 10:10:35'),
(16, 'Salary List for 6/2025', '6/2025', 5, 'completed', 6, '2025-06-17 10:14:16', '2025-06-17 10:16:34'),
(17, 'Salary List for 6/2025', '6/2025', 10, 'completed', 6, '2025-06-17 10:17:08', '2025-06-17 10:18:03');

-- --------------------------------------------------------

--
-- Table structure for table `salary_records`
--

CREATE TABLE `salary_records` (
  `id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `total_payment` bigint(20) NOT NULL,
  `teaching_days_count` int(11) NOT NULL,
  `daily_rate` bigint(20) NOT NULL,
  `is_paid` tinyint(1) DEFAULT 0,
  `paid_at` timestamp NULL DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salary_records`
--

INSERT INTO `salary_records` (`id`, `list_id`, `student_id`, `total_payment`, `teaching_days_count`, `daily_rate`, `is_paid`, `paid_at`, `notes`, `created_at`, `updated_at`) VALUES
(1, 5, 8, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 06:27:19', '2025-06-17 06:27:19'),
(2, 5, 7, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 06:27:35', '2025-06-17 06:27:35'),
(3, 5, 5, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 06:27:35', '2025-06-17 06:27:35'),
(4, 5, 4, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 06:27:35', '2025-06-17 06:27:35'),
(5, 5, 3, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 06:27:35', '2025-06-17 06:27:35'),
(6, 5, 2, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 06:27:35', '2025-06-17 06:27:35'),
(7, 6, 8, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:01:34', '2025-06-17 07:01:34'),
(8, 6, 7, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:01:34', '2025-06-17 07:01:34'),
(9, 6, 5, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:01:34', '2025-06-17 07:01:34'),
(10, 6, 4, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:01:34', '2025-06-17 07:01:34'),
(11, 6, 3, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:01:34', '2025-06-17 07:01:34'),
(12, 6, 2, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:01:34', '2025-06-17 07:01:34'),
(13, 7, 8, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:24', '2025-06-17 07:02:24'),
(14, 7, 7, 0, 0, 60000, 1, '2025-06-17 10:29:44', '', '2025-06-17 07:02:24', '2025-06-17 10:29:44'),
(15, 7, 5, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:24', '2025-06-17 07:02:24'),
(16, 7, 4, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:24', '2025-06-17 07:02:24'),
(17, 7, 3, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:24', '2025-06-17 07:02:24'),
(18, 7, 2, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:24', '2025-06-17 07:02:24'),
(19, 8, 8, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:34', '2025-06-17 07:02:34'),
(20, 8, 7, 0, 0, 60000, 1, '2025-06-17 09:57:03', '', '2025-06-17 07:02:34', '2025-06-17 09:57:03'),
(21, 8, 5, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:34', '2025-06-17 07:02:34'),
(22, 8, 4, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:34', '2025-06-17 07:02:34'),
(23, 8, 3, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:34', '2025-06-17 07:02:34'),
(24, 8, 2, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:02:34', '2025-06-17 07:02:34'),
(31, 10, 8, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:04:29', '2025-06-17 07:04:29'),
(32, 10, 7, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:04:29', '2025-06-17 07:04:29'),
(33, 10, 5, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:04:29', '2025-06-17 07:04:29'),
(34, 10, 4, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:04:29', '2025-06-17 07:04:29'),
(35, 10, 3, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 07:04:29', '2025-06-17 07:04:29'),
(36, 10, 2, 0, 0, 60000, 1, '2025-06-17 07:26:24', 'test note', '2025-06-17 07:04:29', '2025-06-17 07:26:24'),
(43, 12, 8, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 08:12:40', '2025-06-17 08:12:40'),
(44, 12, 7, 0, 0, 60000, 1, '2025-06-17 09:54:45', '', '2025-06-17 08:12:40', '2025-06-17 09:54:45'),
(45, 12, 5, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 08:12:40', '2025-06-17 08:12:40'),
(46, 12, 4, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 08:12:40', '2025-06-17 08:12:40'),
(47, 12, 3, 0, 0, 60000, 0, NULL, NULL, '2025-06-17 08:12:40', '2025-06-17 08:12:40'),
(48, 12, 2, 0, 0, 60000, 1, '2025-06-17 08:13:51', NULL, '2025-06-17 08:12:40', '2025-06-17 08:13:51'),
(49, 13, 8, 240000, 4, 60000, 1, '2025-06-17 10:05:42', '', '2025-06-17 10:04:23', '2025-06-17 10:05:42'),
(50, 13, 7, 240000, 4, 60000, 1, '2025-06-17 10:04:41', '', '2025-06-17 10:04:23', '2025-06-17 10:04:41'),
(51, 13, 5, 240000, 4, 60000, 1, '2025-06-17 10:05:45', '', '2025-06-17 10:04:23', '2025-06-17 10:05:45'),
(52, 13, 4, 240000, 4, 60000, 1, '2025-06-17 10:05:47', '', '2025-06-17 10:04:23', '2025-06-17 10:05:47'),
(53, 13, 3, 240000, 4, 60000, 1, '2025-06-17 10:05:51', '', '2025-06-17 10:04:23', '2025-06-17 10:05:51'),
(54, 13, 2, 240000, 4, 60000, 1, '2025-06-17 10:05:52', '', '2025-06-17 10:04:23', '2025-06-17 10:05:52'),
(55, 14, 8, 240000, 4, 60000, 1, '2025-06-17 10:08:47', '', '2025-06-17 10:08:08', '2025-06-17 10:08:47'),
(56, 14, 7, 240000, 4, 60000, 1, '2025-06-17 10:08:25', '', '2025-06-17 10:08:08', '2025-06-17 10:08:25'),
(57, 14, 5, 240000, 4, 60000, 1, '2025-06-17 10:08:53', '', '2025-06-17 10:08:08', '2025-06-17 10:08:53'),
(58, 14, 4, 240000, 4, 60000, 1, '2025-06-17 10:08:58', '', '2025-06-17 10:08:08', '2025-06-17 10:08:58'),
(59, 14, 3, 240000, 4, 60000, 1, '2025-06-17 10:09:00', '', '2025-06-17 10:08:08', '2025-06-17 10:09:00'),
(60, 14, 2, 240000, 4, 60000, 1, '2025-06-17 10:09:38', '', '2025-06-17 10:08:08', '2025-06-17 10:09:38'),
(61, 15, 8, 40000, 4, 10000, 1, '2025-06-17 10:11:05', '', '2025-06-17 10:10:35', '2025-06-17 10:11:05'),
(62, 15, 7, 40000, 4, 10000, 1, '2025-06-17 10:11:06', '', '2025-06-17 10:10:35', '2025-06-17 10:11:06'),
(63, 15, 5, 40000, 4, 10000, 1, '2025-06-17 10:11:07', '', '2025-06-17 10:10:35', '2025-06-17 10:11:07'),
(64, 15, 4, 40000, 4, 10000, 1, '2025-06-17 10:11:08', '', '2025-06-17 10:10:35', '2025-06-17 10:11:08'),
(65, 15, 3, 40000, 4, 10000, 1, '2025-06-17 10:11:10', '', '2025-06-17 10:10:35', '2025-06-17 10:11:10'),
(66, 15, 2, 40000, 4, 10000, 1, '2025-06-17 10:11:25', '', '2025-06-17 10:10:35', '2025-06-17 10:11:25'),
(67, 16, 8, 20, 4, 5, 1, '2025-06-17 10:14:29', '', '2025-06-17 10:14:16', '2025-06-17 10:14:29'),
(68, 16, 7, 20, 4, 5, 1, '2025-06-17 10:14:31', '', '2025-06-17 10:14:16', '2025-06-17 10:14:31'),
(69, 16, 5, 20, 4, 5, 1, '2025-06-17 10:14:35', '', '2025-06-17 10:14:16', '2025-06-17 10:14:35'),
(70, 16, 4, 20, 4, 5, 1, '2025-06-17 10:14:36', '', '2025-06-17 10:14:16', '2025-06-17 10:14:36'),
(71, 16, 3, 20, 4, 5, 1, '2025-06-17 10:14:38', '', '2025-06-17 10:14:16', '2025-06-17 10:14:38'),
(72, 16, 2, 20, 4, 5, 1, '2025-06-17 10:16:28', '', '2025-06-17 10:14:16', '2025-06-17 10:16:28'),
(73, 17, 8, 40, 4, 10, 1, '2025-06-17 10:17:30', '', '2025-06-17 10:17:08', '2025-06-17 10:17:30'),
(74, 17, 7, 40, 4, 10, 1, '2025-06-17 10:18:03', '', '2025-06-17 10:17:08', '2025-06-17 10:18:03'),
(75, 17, 5, 40, 4, 10, 1, '2025-06-17 10:17:51', '', '2025-06-17 10:17:08', '2025-06-17 10:17:51'),
(76, 17, 4, 40, 4, 10, 1, '2025-06-17 10:17:52', '', '2025-06-17 10:17:08', '2025-06-17 10:17:52'),
(77, 17, 3, 40, 4, 10, 1, '2025-06-17 10:17:54', '', '2025-06-17 10:17:08', '2025-06-17 10:17:54'),
(78, 17, 2, 40, 4, 10, 1, '2025-06-17 10:17:57', '', '2025-06-17 10:17:08', '2025-06-17 10:17:57');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `userFullName` varchar(100) NOT NULL,
  `gender` enum('Boy','Girl') NOT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `heart` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_created_by_teacher` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `userFullName`, `gender`, `nickname`, `age`, `address`, `level`, `point`, `heart`, `user_id`, `is_created_by_teacher`) VALUES
(2, 'Test student 123', 'Boy', 'Just for test 1', 23, 'Bac Quang 1', 1, 115, 10, 8, 0),
(3, 'Test 2', 'Boy', 'Test 2', 14, 'Bac Quang', 1, 0, 10, 11, 0),
(4, 'Test 3', 'Girl', 'Test 3', 14, 'Bac Quang 1', 1, 0, 10, 12, 0),
(5, 'Test student', 'Girl', 'Tester', 14, 'Hanoi', 1, 0, 10, 13, 0),
(7, 'Tester e2e', 'Boy', NULL, 22, 'Test Address', 1, 0, 10, 20, 0),
(8, 'Tester UI', 'Boy', 'Tester', 15, 'Hanoi', 1, 0, 10, 21, 0),
(31, 'Tester e2e', 'Boy', NULL, 22, 'Test Address', 1, 0, 10, 44, 1),
(109, 'Tester e2e', 'Boy', NULL, 22, 'Test Address', 1, 0, 10, 135, 1);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `scheduleDate` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `scheduleDate`, `user_id`) VALUES
(1, 'Monday,Tuesday', 10),
(4, NULL, 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role_id`) VALUES
(8, 'studentTest1', '$2b$10$NfvGBUqUohSKfRhwQHroHekSzeBQEMgazYuF7iPdBfUO.WKVdky1G', 2),
(10, 'Teacher1', '$2b$10$hpqDDGMRLIed8KPSLlT1cuZP80WhfKdkNvfqO9ZZGZ8YM5tor/FV2', 1),
(11, 'Test2', '$2b$10$kGkWmDTJU2HQE3DxmASzeeEoTtfDC4Je1diycAjd1yQLlWhUUufmO', 2),
(12, 'Test3', '$2b$10$ULcNhRsXRfN5FsqnZLgYS.8NGnINaexsdEB5R4yj2t87TzHoTxGMm', 2),
(13, 'Test4', '$2b$10$sELSf4jLE8wZcf2cgUEdk.z6cSJNkRvPQxyQOY5dNUnBhssR6NGJy', 2),
(17, 'TesterTest', '$2b$10$WrH7YyMkwDV4xsgVXJBqNeZHMi5utX5JPQA9ehr2AEqHFnm3jJBzm', 2),
(18, 'e2e-admin', '$2b$10$lgl8phgS/fZFqgq1kQUXnuUd0nsXc.mPNXonUwg2NP0jliYoBJNhi', 1),
(19, 'e2e-Tester', '$2b$10$Hke3h6cIlRVEDCxY5pU0hOv1pLneWzirtyS7zbEHMT8W3KP6gBDGO', 2),
(20, 'e2e-Tester-1', '$2b$10$uihIdRy7PdNT4VQldeECyeSvL.jS0MJBo10m1gzYE9NJqTF7I17vO', 2),
(21, 'test-register', '$2b$10$x8fQmTKyBWW7IWTmsla7v.rpaTbjkL3dpn1eaUm.Jv0uNZq1/Dq46', 2),
(44, 'test-register123', '$2b$10$AoDea/0W6KtSUnXWrHF8.ev4sxcHjd1kFbolOQQtFtVs1OrziMfG2', 2),
(122, 'testUser074fca6d', '$2b$10$fKH2yOWPSTsu.FXoMKjXO.IW/bvwZ14mtEZ0I7FR/Asx4r8cR53h.', 2),
(123, 'testUser7d1ba5e1', '$2b$10$wdo26seYMmocckl2.FuYieGf01JHM0XwXJELqVfcrlt7V4UHViwJi', 2),
(135, 'test-user123', '$2b$10$u6XXHvOQyjdg0EIvxPI3FOJj/Te7VhtljIqbHu5NIoZmfRSpBbLzW', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vocab`
--

CREATE TABLE `vocab` (
  `id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `word` varchar(255) NOT NULL,
  `translation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `definition` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `part_of_speech` enum('noun','verb','adjective','adverb','pronoun','preposition','phrase verb','collocation') DEFAULT NULL,
  `example_sentence` varchar(255) NOT NULL,
  `synonyms` varchar(255) NOT NULL,
  `antonyms` varchar(255) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vocab`
--

INSERT INTO `vocab` (`id`, `list_id`, `word`, `translation`, `definition`, `part_of_speech`, `example_sentence`, `synonyms`, `antonyms`, `created_by`, `created_at`) VALUES
(1, 1, 'First word 1', 'Từ đầu tiên', 'Đây là từ đầu tiên', 'pronoun', 'This is a sentence', 'Initial word', '', 2, '2025-04-06 18:34:42'),
(2, 2, 'Test create', 'Creating', 'Test 1234', 'noun', 'Test1213', 'Test', '', 2, '2025-04-07 13:41:37'),
(3, 2, 'Test create', 'Creating', 'Test123', 'noun', 'Test1234567', 'Initial word', 'a word', 2, '2025-04-07 13:42:09'),
(4, 1, 'test', 'test translation', 'A challenge, trial.', 'noun', 'Not available', 'examination, quiz', 'recess', 109, '2025-06-06 09:44:54'),
(5, 2, 'test', 'thử', 'A challenge, trial.', 'noun', 'Not available', 'examination, quiz', 'recess', 31, '2025-06-07 04:55:03'),
(6, 2, 'Abomination', 'Quỷ hủy diệt', 'An abominable act; a disgusting vice; a despicable habit.', 'noun', 'Not available', 'abhorrence, aversion, detestation, disgust, loathing, loathsomeness, odiousness, perversion', '', 31, '2025-06-07 04:55:55'),
(7, 2, 'Hard', 'Khó', 'A firm or paved beach or slope convenient for hauling vessels out of the water.', 'noun', 'Not available', '', '', 31, '2025-06-07 05:38:18'),
(8, 1, 'test word 1', 'từ', 'a word 1', 'noun', 'example sentence', 'Test, word', 'not a word', 2, '2025-06-23 13:55:30'),
(9, 1, 'test word 1', 'từ', 'a word 1', 'phrase verb', 'example sentence', 'Test, word', 'not a word', 2, '2025-06-23 13:56:34'),
(10, 2, 'Test', 'Test', 'Test', 'phrase verb', 'Test', 'Test', '', 2, '2025-06-23 15:17:28');

-- --------------------------------------------------------

--
-- Table structure for table `vocab_list`
--

CREATE TABLE `vocab_list` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `word_count` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vocab_list`
--

INSERT INTO `vocab_list` (`id`, `title`, `description`, `category`, `word_count`, `teacher_id`, `created_at`) VALUES
(1, 'Test', 'Test', 'Test', 4, 1, '2025-04-06 18:22:31'),
(2, 'Test 3', 'Test 2', 'Test 2', 6, 1, '2025-04-07 04:57:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_lists`
--
ALTER TABLE `attendance_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `attendance_record`
--
ALTER TABLE `attendance_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `list_id` (`list_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `registration_lists`
--
ALTER TABLE `registration_lists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary_lists`
--
ALTER TABLE `salary_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_month_year` (`month_year`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `salary_records`
--
ALTER TABLE `salary_records`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_list_student` (`list_id`,`student_id`),
  ADD KEY `idx_list_id` (`list_id`),
  ADD KEY `idx_student_id` (`student_id`),
  ADD KEY `idx_is_paid` (`is_paid`),
  ADD KEY `idx_paid_at` (`paid_at`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vocab`
--
ALTER TABLE `vocab`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `list_id` (`list_id`);

--
-- Indexes for table `vocab_list`
--
ALTER TABLE `vocab_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_lists`
--
ALTER TABLE `attendance_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `attendance_record`
--
ALTER TABLE `attendance_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=555;

--
-- AUTO_INCREMENT for table `registration_lists`
--
ALTER TABLE `registration_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=286;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `salary_lists`
--
ALTER TABLE `salary_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `salary_records`
--
ALTER TABLE `salary_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `vocab`
--
ALTER TABLE `vocab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vocab_list`
--
ALTER TABLE `vocab_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance_lists`
--
ALTER TABLE `attendance_lists`
  ADD CONSTRAINT `attendance_lists_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attendance_record`
--
ALTER TABLE `attendance_record`
  ADD CONSTRAINT `attendance_record_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `attendance_lists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_record_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salary_records`
--
ALTER TABLE `salary_records`
  ADD CONSTRAINT `salary_records_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `salary_lists` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_registration_lists` FOREIGN KEY (`username`) REFERENCES `registration_lists` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `vocab`
--
ALTER TABLE `vocab`
  ADD CONSTRAINT `vocab_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vocab_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `vocab_list` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vocab_list`
--
ALTER TABLE `vocab_list`
  ADD CONSTRAINT `vocab_list_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
