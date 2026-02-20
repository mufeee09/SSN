
// import React, { useState, useMemo } from 'react';
// import { Calendar, Clock, Sun, Moon, Sunrise, Sunset, Zap, ChevronDown, BellRing } from 'lucide-react';

// // --- 1. CORE DATA AND TIME MANIPULATION FUNCTIONS ---

// /**
//  * Rounds a 12-hour time string (H:MM) to the nearest 10-minute interval.
//  * e.g., 4:02 -> 4:00, 7:08 -> 7:10, 7:05 -> 7:10
//  */
// const roundToNearestTenMinutes = (timeStr) => {
//   if (!timeStr) return null;

//   const match = timeStr.match(/(\d+):(\d+)/);
//   if (!match) return timeStr;

//   let h = parseInt(match[1]);
//   let m = parseInt(match[2]);

//   // Apply rounding: round to the nearest multiple of 10
//   m = Math.round(m / 10) * 10;

//   // Handle overflow (e.g., 6:58 rounds to 6:60, which should be 7:00)
//   if (m === 60) {
//     m = 0;
//     h += 1;
//   }

//   // Handle hour overflow (e.g., 12:58 rounds to 1:00)
//   if (h === 13) {
//     h = 1;
//   }

//   // Format back to H:MM string (ensuring minutes are 2 digits)
//   const formattedMinutes = String(m).padStart(2, '0');
//   return `${h}:${formattedMinutes}`;
// };

// /** Converts 12-hour time string to minutes past midnight (24h clock) based on prayer context. */
// const timeToMinutes = (timeStr, prayerName) => {
//   if (!timeStr) return -1;

//   const match = timeStr.match(/(\d+):(\d+)/);
//   if (!match) return -1;

//   let h = parseInt(match[1]);
//   const m = parseInt(match[2]);

//   // Convert based on Prayer Time Heuristics (assuming Indian timings)
//   if (prayerName.includes('Zuhr') || prayerName.includes('Midday')) {
//     // Zuhr is the noon prayer, 12:xx PM
//     if (h === 12) return 12 * 60 + m;

//   } else if (prayerName.includes('Asr') || prayerName.includes('Magrib') || prayerName.includes('Isha') || prayerName.includes('Sunset')) {
//     // Asr, Magrib, Isha are PM prayers (3 PM to 8 PM)
//     if (h < 12) {
//       h += 12;
//     }

//   } else if (prayerName.includes('Fajr') || prayerName.includes('Sahar') || prayerName.includes('Sunrise')) {
//     // Fajr, Sahar End, Sunrise are AM prayers (4 AM to 6 AM)
//     if (h === 12) h = 0; // Midnight case, reset 12:xx to 00:xx
//     // Keep as is (04:xx, 05:xx)
//   }

//   return h * 60 + m;
// };


// // --- 2. DATA WITH MODIFIERS (using the raw data provided) ---

// const allMonthlyEventsRaw = {
//   'January': [
//     { date: 'Jan 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:25', magrib: '6:10', isha_: '7:35', sahar_mudivu: '4:54', udhayam: '6:29', astam: '6:02', uchcham: '12:15' },
//     { date: 'Jan 6 - 11', fajr: '5:15', zuhr: '12:40', asr_: '4:30', magrib: '6:12', isha_: '7:35', sahar_mudivu: '4:56', udhayam: '6:31', astam: '6:04', uchcham: '12:18' },
//     { date: 'Jan 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:30', magrib: '6:15', isha_: '7:40', sahar_mudivu: '4:59', udhayam: '6:33', astam: '6:07', uchcham: '12:20' },
//     { date: 'Jan 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:19', isha_: '7:40', sahar_mudivu: '5:00', udhayam: '6:34', astam: '6:11', uchcham: '12:22' },
//     { date: 'Jan 24 - End', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:21', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:35', astam: '6:13', uchcham: '12:24' },
//   ],
//   'February': [
//     { date: 'Feb 1 - 5', fajr: '5:25', zuhr: '12:40', asr_: '4:40', magrib: '6:25', isha_: '7:45', sahar_mudivu: '5:03', udhayam: '6:35', astam: '6:17', uchcham: '12:26' },
//     { date: 'Feb 6 - 11', fajr: '5:20', zuhr: '12:40', asr_: '4:40', magrib: '6:26', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:34', astam: '6:18', uchcham: '12:26' },
//     { date: 'Feb 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '5:01', udhayam: '6:33', astam: '6:20', uchcham: '12:26' },
//     { date: 'Feb 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:59', udhayam: '6:31', astam: '6:21', uchcham: '12:26' },
//     { date: 'Feb 24 - End', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:56', udhayam: '6:29', astam: '6:22', uchcham: '12:26' },
//   ],
//   'March': [
//     { date: 'Mar 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:54', udhayam: '6:26', astam: '6:23', uchcham: '12:25' },
//     { date: 'Mar 6 - 11', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:51', udhayam: '6:24', astam: '6:23', uchcham: '12:24' },
//     { date: 'Mar 12 - 17', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:48', udhayam: '6:21', astam: '6:24', uchcham: '12:22' },
//     { date: 'Mar 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:45', udhayam: '6:17', astam: '6:24', uchcham: '12:20' },
//     { date: 'Mar 24 - End', fajr: '5:00', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:41', udhayam: '6:14', astam: '6:24', uchcham: '12:19' },
//   ],
//   'April': [
//     { date: 'Apr 1 - 5', fajr: '4:55', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:36', udhayam: '6:09', astam: '6:24', uchcham: '12:16' },
//     { date: 'Apr 6 - 11', fajr: '4:55', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:33', udhayam: '6:06', astam: '6:24', uchcham: '12:15' },
//     { date: 'Apr 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:29', udhayam: '6:02', astam: '6:24', uchcham: '12:13' },
//     { date: 'Apr 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:25', udhayam: '5:59', astam: '6:24', uchcham: '12:12' },
//     { date: 'Apr 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:21', udhayam: '5:56', astam: '6:24', uchcham: '12:10' },
//   ],
//   'May': [
//     { date: 'May 1 - 5', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:30', isha_: '7:50', sahar_mudivu: '4:17', udhayam: '5:53', astam: '6:25', uchcham: '12:09' },
//     { date: 'May 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:31', isha_: '7:55', sahar_mudivu: '4:15', udhayam: '5:52', astam: '6:26', uchcham: '12:09' },
//     { date: 'May 12 - 17', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:32', isha_: '7:55', sahar_mudivu: '4:12', udhayam: '5:50', astam: '6:26', uchcham: '12:08' },
//     { date: 'May 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:33', isha_: '7:55', sahar_mudivu: '4:10', udhayam: '5:49', astam: '6:28', uchcham: '12:08' },
//     { date: 'May 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:34', isha_: '8:00', sahar_mudivu: '4:08', udhayam: '5:48', astam: '6:30', uchcham: '12:09' },
//   ],
//   'June': [
//     { date: 'Jun 1 - 5', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:37', isha_: '8:00', sahar_mudivu: '4:07', udhayam: '5:47', astam: '6:32', uchcham: '12:10' },
//     { date: 'Jun 6 - 11', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:48', astam: '6:33', uchcham: '12:10' },
//     { date: 'Jun 12 - 17', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:49', astam: '6:35', uchcham: '12:12' },
//     { date: 'Jun 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:45', magrib: '6:41', isha_: '8:10', sahar_mudivu: '4:08', udhayam: '5:50', astam: '6:36', uchcham: '12:13' },
//     { date: 'Jun 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:10', sahar_mudivu: '4:09', udhayam: '5:50', astam: '6:37', uchcham: '12:14' },
//   ],
//   'July': [
//     { date: 'Jul 1 - 5', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:11', udhayam: '5:53', astam: '6:39', uchcham: '12:16' },
//     { date: 'Jul 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:13', udhayam: '5:54', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 12 - 17', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:15', udhayam: '5:55', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 18 - 23', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:17', udhayam: '5:57', astam: '6:39', uchcham: '12:18' },
//     { date: 'Jul 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:19', udhayam: '5:58', astam: '6:39', uchcham: '12:18' },
//   ],
//   'August': [
//     { date: 'Aug 1 - 5', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:05', sahar_mudivu: '4:22', udhayam: '6:00', astam: '6:37', uchcham: '12:18' },
//     { date: 'Aug 6 - 11', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:23', udhayam: '6:00', astam: '6:35', uchcham: '12:17' },
//     { date: 'Aug 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:00', sahar_mudivu: '4:25', udhayam: '6:01', astam: '6:33', uchcham: '12:17' },
//     { date: 'Aug 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:40', magrib: '6:36', isha_: '7:55', sahar_mudivu: '4:26', udhayam: '6:01', astam: '6:31', uchcham: '12:16' },
//     { date: 'Aug 24 - End', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:32', isha_: '7:50', sahar_mudivu: '4:27', udhayam: '6:01', astam: '6:27', uchcham: '12:15' },
//   ],
//   'September': [
//     { date: 'Sep 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:23', uchcham: '12:12' },
//     { date: 'Sep 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:25', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:20', uchcham: '12:11' },
//     { date: 'Sep 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:22', isha_: '7:40', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:17', uchcham: '12:09' },
//     { date: 'Sep 18 - 23', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:17', isha_: '7:35', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:12', uchcham: '12:06' },
//     { date: 'Sep 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:13', isha_: '7:30', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:08', uchcham: '12:04' },
//   ],
//   'October': [
//     { date: 'Oct 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:09', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:04', uchcham: '12:02' },
//     { date: 'Oct 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:20', magrib: '6:06', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:01', uchcham: '12:00' },
//     { date: 'Oct 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:57', uchcham: '11:59' },
//     { date: 'Oct 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:55', uchcham: '11:57' },
//     { date: 'Oct 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:15', sahar_mudivu: '4:28', udhayam: '6:01', astam: '5:52', uchcham: '11:56' },
//   ],
//   'November': [
//     { date: 'Nov 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:30', udhayam: '6:03', astam: '5:49', uchcham: '11:56' },
//     { date: 'Nov 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:10', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:31', udhayam: '6:04', astam: '5:48', uchcham: '11:56' },
//     { date: 'Nov 12 - 17', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:33', udhayam: '6:06', astam: '5:47', uchcham: '11:56' },
//     { date: 'Nov 18 - 23', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:35', udhayam: '6:08', astam: '5:47', uchcham: '11:57' },
//     { date: 'Nov 24 - End', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:20', sahar_mudivu: '4:36', udhayam: '6:10', astam: '5:47', uchcham: '11:59' },
//   ],
//   'December': [
//     { date: 'Dec 1 - 5', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:20', sahar_mudivu: '4:39', udhayam: '6:14', astam: '5:48', uchcham: '12:01' },
//     { date: 'Dec 6 - 11', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:20', sahar_mudivu: '4:41', udhayam: '6:16', astam: '5:48', uchcham: '12:03' },
//     { date: 'Dec 12 - 17', fajr: '5:05', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:25', sahar_mudivu: '4:44', udhayam: '6:19', astam: '5:52', uchcham: '12:06' },
//     { date: 'Dec 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:25', sahar_mudivu: '4:46', udhayam: '6:23', astam: '5:54', uchcham: '12:08' },
//     { date: 'Dec 24 - End', fajr: '5:10', zuhr: '12:40', asr_: '4:20', magrib: '6:05', isha_: '7:30', sahar_mudivu: '4:50', udhayam: '6:26', astam: '5:57', uchcham: '12:11' },
//   ],
// };


// // --- 3. DATA PROCESSING (unchanged, applying rounding and fixes) ---

// const allMonthlyEvents = {};
// const fixedZuhrTime = '12:40';

// Object.keys(allMonthlyEventsRaw).forEach(month => {
//   allMonthlyEvents[month] = allMonthlyEventsRaw[month].map(event => ({
//     ...event,
//     fajr: roundToNearestTenMinutes(event.fajr),
//     asr_: roundToNearestTenMinutes(event.asr_),
//     magrib: roundToNearestTenMinutes(event.magrib),
//     isha_: roundToNearestTenMinutes(event.isha_),
//     sahar_mudivu: roundToNearestTenMinutes(event.sahar_mudivu),
//     zuhr: fixedZuhrTime,
//   }));
// });

// // --- 4. REAL-TIME LOGIC (unchanged) ---

// const getCurrentMinutes = () => {
//   const now = new Date();
//   return now.getHours() * 60 + now.getMinutes();
// };

// const getClosestEventDate = (events, currentDay) => {
//   const eventDays = events.map(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]));
//   let closestDay = eventDays.filter(day => day <= currentDay).pop();
//   if (!closestDay && eventDays.length > 0) {
//     closestDay = eventDays[0];
//   }
//   return events.find(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]) === closestDay);
// };

// const getActivePrayer = (event) => {
//   if (!event) return null;

//   const currentMinutes = getCurrentMinutes();

//   const prayerTimes = [
//     { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
//     { name: 'Fajr', time: timeToMinutes(event.fajr, 'Fajr') },
//     { name: 'Zuhr', time: timeToMinutes(event.zuhr, 'Zuhr') },
//     { name: 'Asr ( )', time: timeToMinutes(event.asr_, 'Asr ( )') },
//     { name: 'Magrib', time: timeToMinutes(event.magrib, 'Magrib') },
//     { name: 'Isha ( )', time: timeToMinutes(event.isha_, 'Isha ( )') },
//   ];

//   const saharEndMinutes = prayerTimes.find(p => p.name === 'Sahar End').time;
//   if (currentMinutes < saharEndMinutes) {
//     return 'Isha ( )';
//   }

//   let activePrayerName = 'Isha ( )';

//   const salatTimes = prayerTimes
//     .filter(p => p.name !== 'Sahar End')
//     .sort((a, b) => a.time - b.time);

//   for (let i = 0; i < salatTimes.length; i++) {
//     if (currentMinutes >= salatTimes[i].time) {
//       activePrayerName = salatTimes[i].name;
//     }
//   }

//   return activePrayerName;
// };

// /** Helper component for a time badge (styled to be premium) */
// const TimeBadge = ({ icon: Icon, label, time, isCurrentPrayer = false }) => {
//   const defaultClasses = 'bg-gray-100 text-gray-800';
//   const currentClasses = isCurrentPrayer
//     ? 'bg-blue-600 text-white shadow-xl ring-4 ring-blue-300 animate-pulse-once'
//     : defaultClasses;

//   return (
//     <div className={`flex flex-col items-center p-3 rounded-lg transition duration-500 ${isCurrentPrayer ? currentClasses : defaultClasses}`}>
//       <div className={`mb-1 flex items-center ${isCurrentPrayer ? 'text-white' : ''}`}>
//         <Icon size={18} className="mr-1" />
//         {isCurrentPrayer && <BellRing size={16} className="mr-1 animate-wiggle" />}
//       </div>
//       <span className={`text-xs font-medium ${isCurrentPrayer ? 'text-white' : 'text-gray-600'}`}>{label}</span>
//       <span className={`text-sm font-bold ${isCurrentPrayer ? 'text-white' : 'text-gray-900'}`}>{time}</span>
//     </div>
//   );
// };


// // --- 5. MAIN COMPONENT ---

// export default function CalendarSection() {
//   const monthNames = Object.keys(allMonthlyEvents);

//   const now = new Date();
//   const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
//   const currentDay = now.getDate();

//   const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
//   const events = useMemo(() => allMonthlyEvents[selectedMonth] || [], [selectedMonth]);

//   const todayEventData = selectedMonth === currentMonthName
//     ? getClosestEventDate(events, currentDay)
//     : null;

//   const activePrayer = todayEventData ? getActivePrayer(todayEventData) : null;
//   const isTodayEvent = (event) => selectedMonth === currentMonthName && event === todayEventData;

//   return (
//     // FIX 2: Changed ID from "calendar" to "prayer-schedule" to match the Navbar.
//     <section id="prayer-schedule" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <style>{`
//         @keyframes pulse-once {
//           0%, 100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.8;
//             transform: scale(1.02);
//           }
//         }
//         .animate-pulse-once {
//           animation: pulse-once 2s infinite ease-in-out;
//         }
//         @keyframes wiggle {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(5deg); }
//           75% { transform: rotate(-5deg); }
//         }
//         .animate-wiggle {
//           animation: wiggle 0.5s ease-in-out infinite;
//         }
//         /* Premium design enhancement for the title */
//         .premium-title {
//           background: -webkit-linear-gradient(45deg, #000000ff, #000000ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       `}</style>
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-2 premium-title">
//           Daily Prayer Schedule
//         </h2>

//         {/* Month Selector Dropdown */}
//         <div className="flex justify-center mb-12">
//           <div className="relative inline-block w-full sm:w-64">
//             {/* FIX 1: Added a visually hidden label for accessibility */}
//             <label htmlFor="month-selector" className="sr-only">
//               Select Month for Prayer Schedule
//             </label>
//             <select
//               id="month-selector" // FIX 2: Added ID to link with the label
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 shadow-md"
//             >
//               {monthNames.map((month) => (
//                 <option key={month} value={month}>
//                   {month}
//                   {month === currentMonthName && ` - ${currentDay}`}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <ChevronDown size={20} />
//             </div>
//           </div>
//         </div>


//         {events.length === 0 ? (
//           <p className="text-center text-xl text-red-500 font-semibold">
//             No prayer time data available for {selectedMonth}.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {events.map((event) => {
//               const isCurrentDayCard = isTodayEvent(event);

//               const cardClasses = isCurrentDayCard
//                 ? 'bg-white p-6 rounded-xl shadow-2xl border-4 border-blue-500 transform scale-[1.03] hover:scale-[1.05] transition-all duration-500 relative'
//                 : 'bg-white p-6 rounded-xl shadow-xl border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out';

//               return (
//                 <div key={event.date} className={cardClasses}>

//                   {isCurrentDayCard && (
//                     <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg flex items-center animate-bounce-slow">
//                       <Zap size={14} className="mr-1" /> CURRENT
//                     </div>
//                   )}

//                   {/* Header/Title Section */}
//                   <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-100">
//                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
//                       <Calendar size={18} className="text-white" />
//                     </div>
//                     <h3 className={`text-xl font-bold ${isCurrentDayCard ? 'text-blue-600' : 'text-gray-900'}`}>
//                       {`Date: ${event.date}`}
//                     </h3>
//                   </div>

//                   {/* --- PRAYER TIMES SECTION (Order 1-5) --- */}
//                   <h4 className="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Salah Times:</h4>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
//                     <TimeBadge icon={Sunrise} label="Fajr" time={event.fajr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Fajr'} />
//                     <TimeBadge icon={Sun} label="Zuhr" time={event.zuhr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Zuhr'} />
//                     <TimeBadge icon={Sun} label="Asr" time={event.asr_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Asr ( )'} />
//                     <TimeBadge icon={Sunset} label="Magrib" time={event.magrib} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Magrib'} />
//                     <TimeBadge icon={Moon} label="Isha" time={event.isha_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Isha ( )'} />
//                   </div>

//                   {/* --- ASTRONOMICAL / OTHER TIMES SECTION (Order 6-9) --- */}
//                   <h4 className="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Other Important Times:</h4>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                     <TimeBadge icon={Sunrise} label="Sunrise" time={event.udhayam} />
//                     <TimeBadge icon={Sunset} label="Sunset" time={event.astam} />
//                     <TimeBadge icon={Sun} label="Midday" time={event.uchcham} />
//                     <TimeBadge
//                       icon={Clock}
//                       label="Sahur End"
//                       time={event.sahar_mudivu}
//                       // Sahar End is a cut-off time, not a prayer, but we can highlight it.
//                       isCurrentPrayer={isCurrentDayCard && activePrayer === 'Sahar End'}
//                     />
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



// import React, { useState, useMemo } from 'react';
// import { Calendar, Clock, Sun, Moon, Sunrise, Sunset, Zap, ChevronDown, BellRing } from 'lucide-react';

// // --- 1. CORE DATA AND TIME MANIPULATION FUNCTIONS ---

// const roundToNearestTenMinutes = (timeStr) => {
//   if (!timeStr) return null;

//   const match = timeStr.match(/(\d+):(\d+)/);
//   if (!match) return timeStr;

//   let h = parseInt(match[1]);
//   let m = parseInt(match[2]);

//   m = Math.round(m / 10) * 10;

//   if (m === 60) {
//     m = 0;
//     h += 1;
//   }

//   if (h === 13) {
//     h = 1;
//   }

//   const formattedMinutes = String(m).padStart(2, '0');
//   return `${h}:${formattedMinutes}`;
// };

// const timeToMinutes = (timeStr, prayerName) => {
//   if (!timeStr) return -1;

//   const match = timeStr.match(/(\d+):(\d+)/);
//   if (!match) return -1;

//   let h = parseInt(match[1]);
//   const m = parseInt(match[2]);

//   if (prayerName.includes('Zuhr') || prayerName.includes('Midday')) {
//     if (h === 12) return 12 * 60 + m;
//   } else if (prayerName.includes('Asr') || prayerName.includes('Magrib') || prayerName.includes('Isha') || prayerName.includes('Sunset')) {
//     if (h < 12) {
//       h += 12;
//     }
//   } else if (prayerName.includes('Fajr') || prayerName.includes('Sahar') || prayerName.includes('Sunrise')) {
//     if (h === 12) h = 0;
//   }

//   return h * 60 + m;
// };

// // --- 2. DATA WITH MODIFIERS ---

// const allMonthlyEventsRaw = {
//   'January': [
//     { date: 'Jan 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:25', magrib: '6:10', isha_: '7:35', sahar_mudivu: '4:54', udhayam: '6:29', astam: '6:02', uchcham: '12:15' },
//     { date: 'Jan 6 - 11', fajr: '5:15', zuhr: '12:40', asr_: '4:30', magrib: '6:12', isha_: '7:35', sahar_mudivu: '4:56', udhayam: '6:31', astam: '6:04', uchcham: '12:18' },
//     { date: 'Jan 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:30', magrib: '6:15', isha_: '7:40', sahar_mudivu: '4:59', udhayam: '6:33', astam: '6:07', uchcham: '12:20' },
//     { date: 'Jan 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:19', isha_: '7:40', sahar_mudivu: '5:00', udhayam: '6:34', astam: '6:11', uchcham: '12:22' },
//     { date: 'Jan 24 - End', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:21', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:35', astam: '6:13', uchcham: '12:24' },
//   ],
//   'February': [
//     { date: 'Feb 1 - 5', fajr: '5:25', zuhr: '12:40', asr_: '4:40', magrib: '6:25', isha_: '7:45', sahar_mudivu: '5:03', udhayam: '6:35', astam: '6:17', uchcham: '12:26' },
//     { date: 'Feb 6 - 11', fajr: '5:20', zuhr: '12:40', asr_: '4:40', magrib: '6:26', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:34', astam: '6:18', uchcham: '12:26' },
//     { date: 'Feb 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '5:01', udhayam: '6:33', astam: '6:20', uchcham: '12:26' },
//     { date: 'Feb 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:59', udhayam: '6:31', astam: '6:21', uchcham: '12:26' },
//     { date: 'Feb 24 - End', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:56', udhayam: '6:29', astam: '6:22', uchcham: '12:26' },
//   ],
//   'March': [
//     { date: 'Mar 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:54', udhayam: '6:26', astam: '6:23', uchcham: '12:25' },
//     { date: 'Mar 6 - 11', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:51', udhayam: '6:24', astam: '6:23', uchcham: '12:24' },
//     { date: 'Mar 12 - 17', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:48', udhayam: '6:21', astam: '6:24', uchcham: '12:22' },
//     { date: 'Mar 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:45', udhayam: '6:17', astam: '6:24', uchcham: '12:20' },
//     { date: 'Mar 24 - End', fajr: '5:00', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:41', udhayam: '6:14', astam: '6:24', uchcham: '12:19' },
//   ],
//   'April': [
//     { date: 'Apr 1 - 5', fajr: '4:55', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:36', udhayam: '6:09', astam: '6:24', uchcham: '12:16' },
//     { date: 'Apr 6 - 11', fajr: '4:55', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:33', udhayam: '6:06', astam: '6:24', uchcham: '12:15' },
//     { date: 'Apr 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:29', udhayam: '6:02', astam: '6:24', uchcham: '12:13' },
//     { date: 'Apr 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:25', udhayam: '5:59', astam: '6:24', uchcham: '12:12' },
//     { date: 'Apr 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:21', udhayam: '5:56', astam: '6:24', uchcham: '12:10' },
//   ],
//   'May': [
//     { date: 'May 1 - 5', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:30', isha_: '7:50', sahar_mudivu: '4:17', udhayam: '5:53', astam: '6:25', uchcham: '12:09' },
//     { date: 'May 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:31', isha_: '7:55', sahar_mudivu: '4:15', udhayam: '5:52', astam: '6:26', uchcham: '12:09' },
//     { date: 'May 12 - 17', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:32', isha_: '7:55', sahar_mudivu: '4:12', udhayam: '5:50', astam: '6:26', uchcham: '12:08' },
//     { date: 'May 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:33', isha_: '7:55', sahar_mudivu: '4:10', udhayam: '5:49', astam: '6:28', uchcham: '12:08' },
//     { date: 'May 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:34', isha_: '8:00', sahar_mudivu: '4:08', udhayam: '5:48', astam: '6:30', uchcham: '12:09' },
//   ],
//   'June': [
//     { date: 'Jun 1 - 5', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:37', isha_: '8:00', sahar_mudivu: '4:07', udhayam: '5:47', astam: '6:32', uchcham: '12:10' },
//     { date: 'Jun 6 - 11', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:48', astam: '6:33', uchcham: '12:10' },
//     { date: 'Jun 12 - 17', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:49', astam: '6:35', uchcham: '12:12' },
//     { date: 'Jun 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:45', magrib: '6:41', isha_: '8:10', sahar_mudivu: '4:08', udhayam: '5:50', astam: '6:36', uchcham: '12:13' },
//     { date: 'Jun 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:10', sahar_mudivu: '4:09', udhayam: '5:50', astam: '6:37', uchcham: '12:14' },
//   ],
//   'July': [
//     { date: 'Jul 1 - 5', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:11', udhayam: '5:53', astam: '6:39', uchcham: '12:16' },
//     { date: 'Jul 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:13', udhayam: '5:54', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 12 - 17', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:15', udhayam: '5:55', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 18 - 23', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:17', udhayam: '5:57', astam: '6:39', uchcham: '12:18' },
//     { date: 'Jul 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:19', udhayam: '5:58', astam: '6:39', uchcham: '12:18' },
//   ],
//   'August': [
//     { date: 'Aug 1 - 5', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:05', sahar_mudivu: '4:22', udhayam: '6:00', astam: '6:37', uchcham: '12:18' },
//     { date: 'Aug 6 - 11', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:23', udhayam: '6:00', astam: '6:35', uchcham: '12:17' },
//     { date: 'Aug 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:00', sahar_mudivu: '4:25', udhayam: '6:01', astam: '6:33', uchcham: '12:17' },
//     { date: 'Aug 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:40', magrib: '6:36', isha_: '7:55', sahar_mudivu: '4:26', udhayam: '6:01', astam: '6:31', uchcham: '12:16' },
//     { date: 'Aug 24 - End', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:32', isha_: '7:50', sahar_mudivu: '4:27', udhayam: '6:01', astam: '6:27', uchcham: '12:15' },
//   ],
//   'September': [
//     { date: 'Sep 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:23', uchcham: '12:12' },
//     { date: 'Sep 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:25', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:20', uchcham: '12:11' },
//     { date: 'Sep 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:22', isha_: '7:40', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:17', uchcham: '12:09' },
//     { date: 'Sep 18 - 23', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:17', isha_: '7:35', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:12', uchcham: '12:06' },
//     { date: 'Sep 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:13', isha_: '7:30', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:08', uchcham: '12:04' },
//   ],
//   'October': [
//     { date: 'Oct 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:09', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:04', uchcham: '12:02' },
//     { date: 'Oct 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:20', magrib: '6:06', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:01', uchcham: '12:00' },
//     { date: 'Oct 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:57', uchcham: '11:59' },
//     { date: 'Oct 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:55', uchcham: '11:57' },
//     { date: 'Oct 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:15', sahar_mudivu: '4:28', udhayam: '6:01', astam: '5:52', uchcham: '11:56' },
//   ],
//   'November': [
//     { date: 'Nov 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:30', udhayam: '6:03', astam: '5:49', uchcham: '11:56' },
//     { date: 'Nov 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:10', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:31', udhayam: '6:04', astam: '5:48', uchcham: '11:56' },
//     { date: 'Nov 12 - 17', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:33', udhayam: '6:06', astam: '5:47', uchcham: '11:56' },
//     { date: 'Nov 18 - 23', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:35', udhayam: '6:08', astam: '5:47', uchcham: '11:57' },
//     { date: 'Nov 24 - End', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:20', sahar_mudivu: '4:36', udhayam: '6:10', astam: '5:47', uchcham: '11:59' },
//   ],
//   'December': [
//     { date: 'Dec 1 - 5', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:20', sahar_mudivu: '4:39', udhayam: '6:14', astam: '5:48', uchcham: '12:01' },
//     { date: 'Dec 6 - 11', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:20', sahar_mudivu: '4:41', udhayam: '6:16', astam: '5:48', uchcham: '12:03' },
//     { date: 'Dec 12 - 17', fajr: '5:05', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:25', sahar_mudivu: '4:44', udhayam: '6:19', astam: '5:52', uchcham: '12:06' },
//     { date: 'Dec 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:25', sahar_mudivu: '4:46', udhayam: '6:23', astam: '5:54', uchcham: '12:08' },
//     { date: 'Dec 24 - End', fajr: '5:10', zuhr: '12:40', asr_: '4:20', magrib: '6:05', isha_: '7:30', sahar_mudivu: '4:50', udhayam: '6:26', astam: '5:57', uchcham: '12:11' },
//   ],
// };

// // --- 3. DATA PROCESSING ---

// const allMonthlyEvents = {};
// const fixedZuhrTime = '12:40';

// Object.keys(allMonthlyEventsRaw).forEach(month => {
//   allMonthlyEvents[month] = allMonthlyEventsRaw[month].map(event => ({
//     ...event,
//     fajr: roundToNearestTenMinutes(event.fajr),
//     asr_: roundToNearestTenMinutes(event.asr_),
//     magrib: roundToNearestTenMinutes(event.magrib),
//     isha_: roundToNearestTenMinutes(event.isha_),
//     sahar_mudivu: roundToNearestTenMinutes(event.sahar_mudivu),
//     zuhr: fixedZuhrTime,
//   }));
// });

// // --- 4. REAL-TIME LOGIC ---

// const getCurrentMinutes = () => {
//   const now = new Date();
//   return now.getHours() * 60 + now.getMinutes();
// };

// const getClosestEventDate = (events, currentDay) => {
//   const eventDays = events.map(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]));
//   let closestDay = eventDays.filter(day => day <= currentDay).pop();
//   if (!closestDay && eventDays.length > 0) {
//     closestDay = eventDays[0];
//   }
//   return events.find(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]) === closestDay);
// };

// const getActivePrayer = (event) => {
//   if (!event) return null;

//   const currentMinutes = getCurrentMinutes();

//   const prayerTimes = [
//     { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
//     { name: 'Fajr', time: timeToMinutes(event.fajr, 'Fajr') },
//     { name: 'Zuhr', time: timeToMinutes(event.zuhr, 'Zuhr') },
//     { name: 'Asr ( )', time: timeToMinutes(event.asr_, 'Asr ( )') },
//     { name: 'Magrib', time: timeToMinutes(event.magrib, 'Magrib') },
//     { name: 'Isha ( )', time: timeToMinutes(event.isha_, 'Isha ( )') },
//   ];

//   const saharEndMinutes = prayerTimes.find(p => p.name === 'Sahar End').time;
//   if (currentMinutes < saharEndMinutes) {
//     return 'Isha ( )';
//   }

//   let activePrayerName = 'Isha ( )';

//   const salatTimes = prayerTimes
//     .filter(p => p.name !== 'Sahar End')
//     .sort((a, b) => a.time - b.time);

//   for (let i = 0; i < salatTimes.length; i++) {
//     if (currentMinutes >= salatTimes[i].time) {
//       activePrayerName = salatTimes[i].name;
//     }
//   }

//   return activePrayerName;
// };

// /** Helper component for a time badge */
// const TimeBadge = ({ icon: Icon, label, time, isCurrentPrayer = false }) => {
//   return (
//     <div className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 backdrop-blur-xl border ${
//       isCurrentPrayer
//         ? 'bg-gradient-to-br from-blue-500/40 to-blue-600/30 border-blue-400/60 shadow-lg shadow-blue-500/50 ring-2 ring-blue-400/50 scale-105'
//         : 'bg-gradient-to-br from-slate-700/40 to-slate-800/30 border-slate-600/40 hover:border-blue-400/40'
//     }`}>
//       <div className={`mb-2 flex items-center ${isCurrentPrayer ? 'text-blue-200' : 'text-gray-300'}`}>
//         <Icon size={18} className="mr-1" />
//         {isCurrentPrayer && <BellRing size={14} className="ml-1 animate-bounce" />}
//       </div>
//       <span className={`text-xs font-semibold uppercase tracking-wider ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-400'}`}>{label}</span>
//       <span className={`text-base font-bold mt-1 ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-200'}`}>{time}</span>
//     </div>
//   );
// };

// // --- 5. MAIN COMPONENT ---

// export default function CalendarSection() {
//   const monthNames = Object.keys(allMonthlyEvents);

//   const now = new Date();
//   const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
//   const currentDay = now.getDate();

//   const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
//   const events = useMemo(() => allMonthlyEvents[selectedMonth] || [], [selectedMonth]);

//   const todayEventData = selectedMonth === currentMonthName
//     ? getClosestEventDate(events, currentDay)
//     : null;

//   const activePrayer = todayEventData ? getActivePrayer(todayEventData) : null;
//   const isTodayEvent = (event) => selectedMonth === currentMonthName && event === todayEventData;

//   return (
//     <section id="prayer-schedule" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       <style>{`
//         @keyframes pulse-once {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.02); }
//         }
//         .animate-pulse-once {
//           animation: pulse-once 2s infinite ease-in-out;
//         }
//         @keyframes wiggle {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(5deg); }
//           75% { transform: rotate(-5deg); }
//         }
//         .animate-wiggle {
//           animation: wiggle 0.5s ease-in-out infinite;
//         }
//       `}</style>

//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       {/* Decorative top line */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
//             Daily Prayer
//             <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//               Schedule
//             </span>
//           </h2>
//         </div>

//         {/* Month Selector Dropdown */}
//         <div className="flex justify-center mb-12">
//           <div className="relative inline-block w-full sm:w-80">
//             <label htmlFor="month-selector" className="sr-only">
//               Select Month for Prayer Schedule
//             </label>
//             <select
//               id="month-selector"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="appearance-none block w-full bg-gradient-to-br from-slate-800 to-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl py-3 px-4 pr-10 text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-lg"
//             >
//               {monthNames.map((month) => (
//                 <option key={month} value={month} className="bg-slate-900">
//                   {month}
//                   {month === currentMonthName && ` - ${currentDay}`}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-400">
//               <ChevronDown size={20} />
//             </div>
//           </div>
//         </div>

//         {events.length === 0 ? (
//           <p className="text-center text-xl text-red-400 font-semibold">
//             No prayer time data available for {selectedMonth}.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
//             {events.map((event) => {
//               const isCurrentDayCard = isTodayEvent(event);

//               return (
//                 <div key={event.date} className="group relative">
//                   {/* Gradient border effect */}
//                   {isCurrentDayCard && (
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-100 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
//                   )}

//                   {/* Card */}
//                   <div className={`relative backdrop-blur-xl rounded-2xl p-6 sm:p-8 border transition-all duration-300 h-full ${
//                     isCurrentDayCard
//                       ? 'bg-gradient-to-br from-blue-900/60 to-purple-900/40 border-blue-500/60'
//                       : 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700/50 group-hover:border-blue-500/50'
//                   }`}>

//                     {/* Current badge */}
//                     {isCurrentDayCard && (
//                       <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center animate-bounce">
//                         <Zap size={14} className="mr-1" /> TODAY
//                       </div>
//                     )}

//                     {/* Header */}
//                     <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-700/50">
//                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
//                         isCurrentDayCard
//                           ? 'bg-gradient-to-br from-blue-500 to-purple-600'
//                           : 'bg-gradient-to-br from-slate-700 to-slate-800'
//                       }`}>
//                         <Calendar size={20} className="text-white" />
//                       </div>
//                       <h3 className={`text-xl font-bold ${isCurrentDayCard ? 'text-blue-200' : 'text-gray-100'}`}>
//                         {event.date}
//                       </h3>
//                     </div>

//                     {/* Prayer Times Section */}
//                     <h4 className="text-base font-semibold text-blue-300 mb-4 uppercase tracking-wider flex items-center">
//                       <span className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded mr-2"></span>
//                       Salah Times
//                     </h4>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
//                       <TimeBadge icon={Sunrise} label="Fajr" time={event.fajr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Fajr'} />
//                       <TimeBadge icon={Sun} label="Zuhr" time={event.zuhr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Zuhr'} />
//                       <TimeBadge icon={Sun} label="Asr" time={event.asr_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Asr ( )'} />
//                       <TimeBadge icon={Sunset} label="Magrib" time={event.magrib} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Magrib'} />
//                       <TimeBadge icon={Moon} label="Isha" time={event.isha_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Isha ( )'} />
//                     </div>

//                     {/* Other Times Section */}
//                     <h4 className="text-base font-semibold text-purple-300 mb-4 uppercase tracking-wider flex items-center">
//                       <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-500 rounded mr-2"></span>
//                       Important Times
//                     </h4>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       <TimeBadge icon={Sunrise} label="Sunrise" time={event.udhayam} />
//                       <TimeBadge icon={Sunset} label="Sunset" time={event.astam} />
//                       <TimeBadge icon={Sun} label="Midday" time={event.uchcham} />
//                       <TimeBadge icon={Clock} label="Sahur End" time={event.sahar_mudivu} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Sahar End'} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Decorative bottom line */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
//     </section>
//   );
// }



// // OPTION A
// import React, { useState, useMemo } from 'react';
// import { Calendar, Clock, Sun, Moon, Sunrise, Sunset, Zap, ChevronDown, BellRing } from 'lucide-react';

// // --- 1. CORE DATA AND TIME MANIPULATION FUNCTIONS ---

// const roundToNearestTenMinutes = (timeStr) => {
//   if (!timeStr) return null;

//   const match = timeStr.match(/(\d+):(\d+)/);
//   if (!match) return timeStr;

//   let h = parseInt(match[1]);
//   let m = parseInt(match[2]);

//   m = Math.round(m / 10) * 10;

//   if (m === 60) {
//     m = 0;
//     h += 1;
//   }

//   if (h === 13) {
//     h = 1;
//   }

//   const formattedMinutes = String(m).padStart(2, '0');
//   return `${h}:${formattedMinutes}`;
// };

// // timeToMinutes now accepts either a time string ("4:50") OR a time object { azan, namaz }.
// // For prayer logic we use the azan time (so pass the azan when an object is provided).
// const timeToMinutes = (timeInput, prayerName) => {
//   if (!timeInput) return -1;

//   // If it's an object (azan/namaz), prefer azan for timing logic
//   const timeStr = typeof timeInput === 'object' && timeInput !== null ? timeInput.azan : timeInput;

//   const match = String(timeStr).match(/(\d+):(\d+)/);
//   if (!match) return -1;

//   let h = parseInt(match[1], 10);
//   const m = parseInt(match[2], 10);

//   // Keep your original rules for AM/PM adjustments
//   if (prayerName.includes('Zuhr') || prayerName.includes('Midday')) {
//     if (h === 12) return 12 * 60 + m;
//   } else if (prayerName.includes('Asr') || prayerName.includes('Magrib') || prayerName.includes('Isha') || prayerName.includes('Sunset')) {
//     if (h < 12) {
//       h += 12;
//     }
//   } else if (prayerName.includes('Fajr') || prayerName.includes('Sahar') || prayerName.includes('Sunrise')) {
//     if (h === 12) h = 0;
//   }

//   return h * 60 + m;
// };

// // --- 2. DATA WITH MODIFIERS ---

// const allMonthlyEventsRaw = {
//   'January': [
//     { date: 'Jan 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:25', magrib: '6:10', isha_: '7:35', sahar_mudivu: '4:54', udhayam: '6:29', astam: '6:02', uchcham: '12:15' },
//     { date: 'Jan 6 - 11', fajr: '5:15', zuhr: '12:40', asr_: '4:30', magrib: '6:12', isha_: '7:35', sahar_mudivu: '4:56', udhayam: '6:31', astam: '6:04', uchcham: '12:18' },
//     { date: 'Jan 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:30', magrib: '6:15', isha_: '7:40', sahar_mudivu: '4:59', udhayam: '6:33', astam: '6:07', uchcham: '12:20' },
//     { date: 'Jan 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:19', isha_: '7:40', sahar_mudivu: '5:00', udhayam: '6:34', astam: '6:11', uchcham: '12:22' },
//     { date: 'Jan 24 - End', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:21', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:35', astam: '6:13', uchcham: '12:24' },
//   ],
//   'February': [
//     { date: 'Feb 1 - 5', fajr: '5:25', zuhr: '12:40', asr_: '4:40', magrib: '6:25', isha_: '7:45', sahar_mudivu: '5:03', udhayam: '6:35', astam: '6:17', uchcham: '12:26' },
//     { date: 'Feb 6 - 11', fajr: '5:20', zuhr: '12:40', asr_: '4:40', magrib: '6:26', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:34', astam: '6:18', uchcham: '12:26' },
//     { date: 'Feb 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '5:01', udhayam: '6:33', astam: '6:20', uchcham: '12:26' },
//     { date: 'Feb 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:59', udhayam: '6:31', astam: '6:21', uchcham: '12:26' },
//     { date: 'Feb 24 - End', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:56', udhayam: '6:29', astam: '6:22', uchcham: '12:26' },
//   ],
//   'March': [
//     { date: 'Mar 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:54', udhayam: '6:26', astam: '6:23', uchcham: '12:25' },
//     { date: 'Mar 6 - 11', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:51', udhayam: '6:24', astam: '6:23', uchcham: '12:24' },
//     { date: 'Mar 12 - 17', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:48', udhayam: '6:21', astam: '6:24', uchcham: '12:22' },
//     { date: 'Mar 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:45', udhayam: '6:17', astam: '6:24', uchcham: '12:20' },
//     { date: 'Mar 24 - End', fajr: '5:00', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:41', udhayam: '6:14', astam: '6:24', uchcham: '12:19' },
//   ],
//   'April': [
//     { date: 'Apr 1 - 5', fajr: '4:55', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:36', udhayam: '6:09', astam: '6:24', uchcham: '12:16' },
//     { date: 'Apr 6 - 11', fajr: '4:55', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:33', udhayam: '6:06', astam: '6:24', uchcham: '12:15' },
//     { date: 'Apr 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:29', udhayam: '6:02', astam: '6:24', uchcham: '12:13' },
//     { date: 'Apr 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:25', udhayam: '5:59', astam: '6:24', uchcham: '12:12' },
//     { date: 'Apr 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:21', udhayam: '5:56', astam: '6:24', uchcham: '12:10' },
//   ],
//   'May': [
//     { date: 'May 1 - 5', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:30', isha_: '7:50', sahar_mudivu: '4:17', udhayam: '5:53', astam: '6:25', uchcham: '12:09' },
//     { date: 'May 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:31', isha_: '7:55', sahar_mudivu: '4:15', udhayam: '5:52', astam: '6:26', uchcham: '12:09' },
//     { date: 'May 12 - 17', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:32', isha_: '7:55', sahar_mudivu: '4:12', udhayam: '5:50', astam: '6:26', uchcham: '12:08' },
//     { date: 'May 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:33', isha_: '7:55', sahar_mudivu: '4:10', udhayam: '5:49', astam: '6:28', uchcham: '12:08' },
//     { date: 'May 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:34', isha_: '8:00', sahar_mudivu: '4:08', udhayam: '5:48', astam: '6:30', uchcham: '12:09' },
//   ],
//   'June': [
//     { date: 'Jun 1 - 5', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:37', isha_: '8:00', sahar_mudivu: '4:07', udhayam: '5:47', astam: '6:32', uchcham: '12:10' },
//     { date: 'Jun 6 - 11', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:48', astam: '6:33', uchcham: '12:10' },
//     { date: 'Jun 12 - 17', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:49', astam: '6:35', uchcham: '12:12' },
//     { date: 'Jun 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:45', magrib: '6:41', isha_: '8:10', sahar_mudivu: '4:08', udhayam: '5:50', astam: '6:36', uchcham: '12:13' },
//     { date: 'Jun 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:10', sahar_mudivu: '4:09', udhayam: '5:50', astam: '6:37', uchcham: '12:14' },
//   ],
//   'July': [
//     { date: 'Jul 1 - 5', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:11', udhayam: '5:53', astam: '6:39', uchcham: '12:16' },
//     { date: 'Jul 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:13', udhayam: '5:54', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 12 - 17', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:15', udhayam: '5:55', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 18 - 23', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:17', udhayam: '5:57', astam: '6:39', uchcham: '12:18' },
//     { date: 'Jul 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:19', udhayam: '5:58', astam: '6:39', uchcham: '12:18' },
//   ],
//   'August': [
//     { date: 'Aug 1 - 5', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:05', sahar_mudivu: '4:22', udhayam: '6:00', astam: '6:37', uchcham: '12:18' },
//     { date: 'Aug 6 - 11', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:23', udhayam: '6:00', astam: '6:35', uchcham: '12:17' },
//     { date: 'Aug 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:00', sahar_mudivu: '4:25', udhayam: '6:01', astam: '6:33', uchcham: '12:17' },
//     { date: 'Aug 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:40', magrib: '6:36', isha_: '7:55', sahar_mudivu: '4:26', udhayam: '6:01', astam: '6:31', uchcham: '12:16' },
//     { date: 'Aug 24 - End', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:32', isha_: '7:50', sahar_mudivu: '4:27', udhayam: '6:01', astam: '6:27', uchcham: '12:15' },
//   ],
//   'September': [
//     { date: 'Sep 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:23', uchcham: '12:12' },
//     { date: 'Sep 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:25', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:20', uchcham: '12:11' },
//     { date: 'Sep 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:22', isha_: '7:40', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:17', uchcham: '12:09' },
//     { date: 'Sep 18 - 23', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:17', isha_: '7:35', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:12', uchcham: '12:06' },
//     { date: 'Sep 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:13', isha_: '7:30', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:08', uchcham: '12:04' },
//   ],
//   'October': [
//     { date: 'Oct 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:09', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:04', uchcham: '12:02' },
//     { date: 'Oct 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:20', magrib: '6:06', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:01', uchcham: '12:00' },
//     { date: 'Oct 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:57', uchcham: '11:59' },
//     { date: 'Oct 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:55', uchcham: '11:57' },
//     { date: 'Oct 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:15', sahar_mudivu: '4:28', udhayam: '6:01', astam: '5:52', uchcham: '11:56' },
//   ],
//   'November': [
//     { date: 'Nov 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:30', udhayam: '6:03', astam: '5:49', uchcham: '11:56' },
//     { date: 'Nov 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:10', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:31', udhayam: '6:04', astam: '5:48', uchcham: '11:56' },
//     { date: 'Nov 12 - 17', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:33', udhayam: '6:06', astam: '5:47', uchcham: '11:56' },
//     { date: 'Nov 18 - 23', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:35', udhayam: '6:08', astam: '5:47', uchcham: '11:57' },
//     { date: 'Nov 24 - End', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:20', sahar_mudivu: '4:36', udhayam: '6:10', astam: '5:47', uchcham: '11:59' },
//   ],
//   'December': [
//     { date: 'Dec 1 - 5', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:20', sahar_mudivu: '4:39', udhayam: '6:14', astam: '5:48', uchcham: '12:01' },
//     { date: 'Dec 6 - 11', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:20', sahar_mudivu: '4:41', udhayam: '6:16', astam: '5:48', uchcham: '12:03' },
//     { date: 'Dec 12 - 17', fajr: '5:05', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:25', sahar_mudivu: '4:44', udhayam: '6:19', astam: '5:52', uchcham: '12:06' },
//     { date: 'Dec 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:25', sahar_mudivu: '4:46', udhayam: '6:23', astam: '5:54', uchcham: '12:08' },
//     { date: 'Dec 24 - End', fajr: '5:10', zuhr: '12:40', asr_: '4:20', magrib: '6:05', isha_: '7:30', sahar_mudivu: '4:50', udhayam: '6:26', astam: '5:57', uchcham: '12:11' },
//   ],
// };

// // --- 3. DATA PROCESSING ---

// const allMonthlyEvents = {};
// const fixedZuhrTime = '12:40';

// // Prayer offsets in minutes (adjust to your desired Namaz delay)
// const prayerOffsets = {
//   fajr: 40,    // e.g. fajr namaz 40 mins after azan
//   zuhr: 20,
//   asr_: 20,
//   magrib: 3,
//   isha_: 20,
// };

// // helper to add minutes to a "H:MM" time string and return formatted "H:MM" (12-hour style preserved)
// const addMinutes = (timeStr, minutesToAdd) => {
//   if (!timeStr) return null;
//   const match = timeStr.match(/(\d+):(\d+)/);
//   if (!match) return timeStr;
//   let h = parseInt(match[1], 10);
//   let m = parseInt(match[2], 10);

//   const date = new Date();
//   date.setHours(h);
//   date.setMinutes(m + minutesToAdd);

//   let hh = date.getHours();
//   const mm = date.getMinutes().toString().padStart(2, '0');

//   // convert 24h -> 12h (keep same format as your dataset)
//   if (hh > 12) hh = hh - 12;
//   return `${hh}:${mm}`;
// };

// Object.keys(allMonthlyEventsRaw).forEach(month => {
//   allMonthlyEvents[month] = allMonthlyEventsRaw[month].map(event => {
//     // preserve original data but convert single-times into { azan, namaz }
//     const fajrAzan = roundToNearestTenMinutes(event.fajr);
//     const asrAzan = roundToNearestTenMinutes(event.asr_);
//     const magribAzan = roundToNearestTenMinutes(event.magrib);
//     const ishaAzan = roundToNearestTenMinutes(event.isha_);
//     const zuhrAzan = roundToNearestTenMinutes(event.zuhr || fixedZuhrTime);

//     return {
//       ...event,
//       // replace strings with objects containing azan & namaz (namaz calculated using offsets)
//       fajr: { azan: fajrAzan, namaz: addMinutes(fajrAzan, prayerOffsets.fajr) },
//       asr_: { azan: asrAzan, namaz: addMinutes(asrAzan, prayerOffsets.asr_) },
//       magrib: { azan: magribAzan, namaz: addMinutes(magribAzan, prayerOffsets.magrib) },
//       isha_: { azan: ishaAzan, namaz: addMinutes(ishaAzan, prayerOffsets.isha_) },
//       sahar_mudivu: roundToNearestTenMinutes(event.sahar_mudivu),
//       // set zuhr also as object (we override earlier fixedZuhrTime in processing)
//       zuhr: { azan: zuhrAzan, namaz: addMinutes(zuhrAzan, prayerOffsets.zuhr) },
//     };
//   });
// });

// // --- 4. REAL-TIME LOGIC ---

// const getCurrentMinutes = () => {
//   const now = new Date();
//   return now.getHours() * 60 + now.getMinutes();
// };

// const getClosestEventDate = (events, currentDay) => {
//   const eventDays = events.map(e => {
//     // parse numeric day from your date strings like "Jan 1 - 5" or "Jan 24 - End"
//     const parts = e.date.split(' ');
//     // try the second token (1-based range) else first
//     const candidate = parts[1] || parts[0];
//     const numeric = parseInt(candidate.replace(/\D/g, ''), 10);
//     return isNaN(numeric) ? 1 : numeric;
//   });

//   let closestDay = eventDays.filter(day => day <= currentDay).pop();
//   if (!closestDay && eventDays.length > 0) {
//     closestDay = eventDays[0];
//   }

//   return events.find(e => {
//     const parts = e.date.split(' ');
//     const candidate = parts[1] || parts[0];
//     const numeric = parseInt(candidate.replace(/\D/g, ''), 10);
//     return numeric === closestDay;
//   });
// };

// const getActivePrayer = (event) => {
//   if (!event) return null;

//   const currentMinutes = getCurrentMinutes();

//   // Use azan times for the active-prayer calculation (time fields might be objects now)
//   const prayerTimes = [
//     { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
//     { name: 'Fajr', time: timeToMinutes(event.fajr, 'Fajr') },
//     { name: 'Zuhr', time: timeToMinutes(event.zuhr, 'Zuhr') },
//     { name: 'Asr ( )', time: timeToMinutes(event.asr_, 'Asr ( )') },
//     { name: 'Magrib', time: timeToMinutes(event.magrib, 'Magrib') },
//     { name: 'Isha ( )', time: timeToMinutes(event.isha_, 'Isha ( )') },
//   ];

//   const saharEndMinutes = prayerTimes.find(p => p.name === 'Sahar End').time;
//   if (currentMinutes < saharEndMinutes) {
//     return 'Isha ( )';
//   }

//   let activePrayerName = 'Isha ( )';

//   const salatTimes = prayerTimes
//     .filter(p => p.name !== 'Sahar End')
//     .sort((a, b) => a.time - b.time);

//   for (let i = 0; i < salatTimes.length; i++) {
//     if (currentMinutes >= salatTimes[i].time) {
//       activePrayerName = salatTimes[i].name;
//     }
//   }

//   return activePrayerName;
// };

// // /** Helper component for a time badge (Option A - stacked) */
// // const TimeBadge = ({ icon: Icon, label, time, isCurrentPrayer = false }) => {
// //   // time might be a string (for non-salah fields) OR object { azan, namaz }
// //   const hasTwoTimes = typeof time === 'object' && time !== null && 'azan' in time && 'namaz' in time;

// //   return (
// //     <div className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 backdrop-blur-xl border ${
// //       isCurrentPrayer
// //         ? 'bg-gradient-to-br from-blue-500/40 to-blue-600/30 border-blue-400/60 shadow-lg shadow-blue-500/50 ring-2 ring-blue-400/50 scale-105'
// //         : 'bg-gradient-to-br from-slate-700/40 to-slate-800/30 border-slate-600/40 hover:border-blue-400/40'
// //     }`}>
// //       <div className={`mb-2 flex items-center ${isCurrentPrayer ? 'text-blue-200' : 'text-gray-300'}`}>
// //         <Icon size={18} className="mr-1" />
// //         {isCurrentPrayer && <BellRing size={14} className="ml-1 animate-bounce" />}
// //       </div>
// //       <span className={`text-xs font-semibold uppercase tracking-wider ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-400'}`}>{label}</span>

// //       {/* stacked layout: Azan on top, Namaz below */}
// //       {hasTwoTimes ? (
// //         <>
// //           <span className={`text-sm font-semibold mt-1 ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-300'}`}>🕌Azan: {time.azan}</span>
// //           <span className={`text-sm font-semibold ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-400'}`}>⏰Namaz: {time.namaz}</span>
// //         </>
// //       ) : (
// //         <span className={`text-base font-bold mt-1 ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-200'}`}>{time}</span>
// //       )}
// //     </div>
// //   );
// // };

// const TimeBadge = ({ icon: Icon, label, time, isCurrentPrayer = false }) => {
//   const hasTwoTimes = typeof time === 'object' && time !== null && 'azan' in time && 'namaz' in time;

//   return (
//     <div
//       className={`flex flex-col p-4 rounded-xl transition-all duration-300 backdrop-blur-xl border ${
//         isCurrentPrayer
//           ? 'bg-gradient-to-br from-blue-500/40 to-blue-600/30 border-blue-400/60 shadow-lg shadow-blue-500/50 ring-2 ring-blue-400/50 scale-105'
//           : 'bg-gradient-to-br from-slate-700/40 to-slate-800/30 border-slate-600/40 hover:border-blue-400/40'
//       }`}
//     >
//       <div className={`mb-2 flex items-center ${isCurrentPrayer ? 'text-blue-200' : 'text-gray-300'}`}>
//         <Icon size={18} className="mr-1" />
//         {isCurrentPrayer && <BellRing size={14} className="ml-1 animate-bounce" />}
//       </div>
//       <span className={`text-xs font-semibold uppercase tracking-wider ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-400'}`}>
//         {label}
//       </span>

//       {hasTwoTimes ? (
//         <div className="w-full mt-1 flex justify-between items-center">
//           {/* Azan left */}
//           <span className={`text-sm font-semibold font-mono ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-300'}`}>
//             🕌 {time.azan}
//           </span>
//           {/* Namaz right */}
//           <span className={`text-sm font-semibold font-mono ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-400'}`}>
//             ⏰ {time.namaz}
//           </span>
//         </div>
//       ) : (
//         <span className={`text-base font-bold mt-1 font-mono ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-200'}`}>
//           {time}
//         </span>
//       )}
//     </div>
//   );
// };



// // --- 5. MAIN COMPONENT ---

// export default function CalendarSection() {
//   const monthNames = Object.keys(allMonthlyEvents);

//   const now = new Date();
//   const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
//   const currentDay = now.getDate();

//   const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
//   const events = useMemo(() => allMonthlyEvents[selectedMonth] || [], [selectedMonth]);

//   const todayEventData = selectedMonth === currentMonthName
//     ? getClosestEventDate(events, currentDay)
//     : null;

//   const activePrayer = todayEventData ? getActivePrayer(todayEventData) : null;
//   const isTodayEvent = (event) => selectedMonth === currentMonthName && event === todayEventData;

//   return (
//     <section id="prayer-schedule" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       <style>{`
//         @keyframes pulse-once {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.02); }
//         }
//         .animate-pulse-once {
//           animation: pulse-once 2s infinite ease-in-out;
//         }
//         @keyframes wiggle {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(5deg); }
//           75% { transform: rotate(-5deg); }
//         }
//         .animate-wiggle {
//           animation: wiggle 0.5s ease-in-out infinite;
//         }
//       `}</style>

//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       {/* Decorative top line */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
//             Daily Prayer
//             <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//               Schedule
//             </span>
//           </h2>
//         </div>

//         {/* Month Selector Dropdown */}
//         <div className="flex justify-center mb-12">
//           <div className="relative inline-block w-full sm:w-80">
//             <label htmlFor="month-selector" className="sr-only">
//               Select Month for Prayer Schedule
//             </label>
//             <select
//               id="month-selector"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="appearance-none block w-full bg-gradient-to-br from-slate-800 to-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl py-3 px-4 pr-10 text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-lg"
//             >
//               {monthNames.map((month) => (
//                 <option key={month} value={month} className="bg-slate-900">
//                   {month}
//                   {month === currentMonthName && ` - ${currentDay}`}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-400">
//               <ChevronDown size={20} />
//             </div>
//           </div>
//         </div>

//         {events.length === 0 ? (
//           <p className="text-center text-xl text-red-400 font-semibold">
//             No prayer time data available for {selectedMonth}.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
//             {events.map((event) => {
//               const isCurrentDayCard = isTodayEvent(event);

//               return (
//                 <div key={event.date} className="group relative">
//                   {/* Gradient border effect */}
//                   {isCurrentDayCard && (
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-100 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
//                   )}

//                   {/* Card */}
//                   <div className={`relative backdrop-blur-xl rounded-2xl p-6 sm:p-8 border transition-all duration-300 h-full ${
//                     isCurrentDayCard
//                       ? 'bg-gradient-to-br from-blue-900/60 to-purple-900/40 border-blue-500/60'
//                       : 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700/50 group-hover:border-blue-500/50'
//                   }`}>

//                     {/* Current badge */}
//                     {isCurrentDayCard && (
//                       <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center animate-bounce">
//                         <Zap size={14} className="mr-1" /> TODAY
//                       </div>
//                     )}

//                     {/* Header */}
//                     <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-700/50">
//                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
//                         isCurrentDayCard
//                           ? 'bg-gradient-to-br from-blue-500 to-purple-600'
//                           : 'bg-gradient-to-br from-slate-700 to-slate-800'
//                       }`}>
//                         <Calendar size={20} className="text-white" />
//                       </div>
//                       <h3 className={`text-xl font-bold ${isCurrentDayCard ? 'text-blue-200' : 'text-gray-100'}`}>
//                         {event.date}
//                       </h3>
//                     </div>

//                     {/* Prayer Times Section */}
//                     <h4 className="text-base font-semibold text-blue-300 mb-4 uppercase tracking-wider flex items-center">
//                       <span className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded mr-2"></span>
//                       Salah Times
//                     </h4>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
//                       <TimeBadge icon={Sunrise} label="Fajr" time={event.fajr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Fajr'} />
//                       <TimeBadge icon={Sun} label="Zuhr" time={event.zuhr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Zuhr'} />
//                       <TimeBadge icon={Sun} label="Asr" time={event.asr_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Asr ( )'} />
//                       <TimeBadge icon={Sunset} label="Magrib" time={event.magrib} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Magrib'} />
//                       <TimeBadge icon={Moon} label="Isha" time={event.isha_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Isha ( )'} />
//                     </div>

//                     {/* Other Times Section */}
//                     <h4 className="text-base font-semibold text-purple-300 mb-4 uppercase tracking-wider flex items-center">
//                       <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-500 rounded mr-2"></span>
//                       Important Times
//                     </h4>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       <TimeBadge icon={Sunrise} label="Sunrise" time={event.udhayam} />
//                       <TimeBadge icon={Sunset} label="Sunset" time={event.astam} />
//                       <TimeBadge icon={Sun} label="Midday" time={event.uchcham} />
//                       <TimeBadge icon={Clock} label="Sahur End" time={event.sahar_mudivu} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Sahar End'} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Decorative bottom line */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
//     </section>
//   );
// }



import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Sun, Moon, Sunrise, Sunset, Zap, ChevronDown, BellRing } from 'lucide-react';

// --- 1. CORE DATA AND TIME MANIPULATION FUNCTIONS ---

const roundToNearestTenMinutes = (timeStr) => {
    if (!timeStr) return null;

    const match = timeStr.match(/(\d+):(\d+)/);
    if (!match) return timeStr;

    let h = parseInt(match[1]);
    let m = parseInt(match[2]);

    m = Math.round(m / 10) * 10;

    if (m === 60) {
        m = 0;
        h += 1;
    }

    if (h === 13) {
        h = 1;
    }

    const formattedMinutes = String(m).padStart(2, '0');
    return `${h}:${formattedMinutes}`;
};

const timeToMinutes = (timeInput, prayerName) => {
    if (!timeInput) return -1;

    const timeStr = typeof timeInput === 'object' && timeInput !== null ? timeInput.azan : timeInput;

    const match = String(timeStr).match(/(\d+):(\d+)/);
    if (!match) return -1;

    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);

    if (prayerName.includes('Zuhr') || prayerName.includes('Midday')) {
        if (h === 12) return 12 * 60 + m;
    } else if (prayerName.includes('Asr') || prayerName.includes('Magrib') || prayerName.includes('Isha') || prayerName.includes('Sunset')) {
        if (h < 12) {
            h += 12;
        }
    } else if (prayerName.includes('Fajr') || prayerName.includes('Sahar') || prayerName.includes('Sunrise')) {
        if (h === 12) h = 0;
    }

    return h * 60 + m;
};

// --- 2. DATA WITH MODIFIERS ---

const allMonthlyEventsRaw = {
    'January': [
        { date: 'Jan 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:25', magrib: '6:10', isha_: '7:35', sahar_mudivu: '4:54', udhayam: '6:29', astam: '6:02', uchcham: '12:15' },
        { date: 'Jan 6 - 11', fajr: '5:15', zuhr: '12:40', asr_: '4:30', magrib: '6:12', isha_: '7:35', sahar_mudivu: '4:56', udhayam: '6:31', astam: '6:04', uchcham: '12:18' },
        { date: 'Jan 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:30', magrib: '6:15', isha_: '7:40', sahar_mudivu: '4:59', udhayam: '6:33', astam: '6:07', uchcham: '12:20' },
        { date: 'Jan 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:19', isha_: '7:40', sahar_mudivu: '5:00', udhayam: '6:34', astam: '6:11', uchcham: '12:22' },
        { date: 'Jan 24 - End', fajr: '5:20', zuhr: '12:40', asr_: '4:35', magrib: '6:21', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:35', astam: '6:13', uchcham: '12:24' },
    ],
    'February': [
        { date: 'Feb 1 - 5', fajr: '5:25', zuhr: '12:40', asr_: '4:40', magrib: '6:25', isha_: '7:45', sahar_mudivu: '5:03', udhayam: '6:35', astam: '6:17', uchcham: '12:26' },
        { date: 'Feb 6 - 11', fajr: '5:20', zuhr: '12:40', asr_: '4:40', magrib: '6:26', isha_: '7:45', sahar_mudivu: '5:02', udhayam: '6:34', astam: '6:18', uchcham: '12:26' },
        { date: 'Feb 12 - 17', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '5:01', udhayam: '6:33', astam: '6:20', uchcham: '12:26' },
        { date: 'Feb 18 - 23', fajr: '5:20', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:59', udhayam: '6:31', astam: '6:21', uchcham: '12:26' },
        { date: 'Feb 24 - End', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:27', isha_: '7:45', sahar_mudivu: '4:56', udhayam: '6:29', astam: '6:22', uchcham: '12:26' },
    ],
    'March': [
        { date: 'Mar 1 - 5', fajr: '5:15', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:54', udhayam: '6:26', astam: '6:23', uchcham: '12:25' },
        { date: 'Mar 6 - 11', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:51', udhayam: '6:24', astam: '6:23', uchcham: '12:24' },
        { date: 'Mar 12 - 17', fajr: '5:10', zuhr: '12:40', asr_: '4:45', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:48', udhayam: '6:21', astam: '6:24', uchcham: '12:22' },
        { date: 'Mar 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:45', udhayam: '6:17', astam: '6:24', uchcham: '12:20' },
        { date: 'Mar 24 - End', fajr: '5:00', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:41', udhayam: '6:14', astam: '6:24', uchcham: '12:19' },
    ],
    'April': [
        { date: 'Apr 1 - 5', fajr: '4:55', zuhr: '12:40', asr_: '4:40', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:36', udhayam: '6:09', astam: '6:24', uchcham: '12:16' },
        { date: 'Apr 6 - 11', fajr: '4:55', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:45', sahar_mudivu: '4:33', udhayam: '6:06', astam: '6:24', uchcham: '12:15' },
        { date: 'Apr 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:29', udhayam: '6:02', astam: '6:24', uchcham: '12:13' },
        { date: 'Apr 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:25', udhayam: '5:59', astam: '6:24', uchcham: '12:12' },
        { date: 'Apr 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:35', magrib: '6:29', isha_: '7:50', sahar_mudivu: '4:21', udhayam: '5:56', astam: '6:24', uchcham: '12:10' },
    ],
    'May': [
        { date: 'May 1 - 5', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:30', isha_: '7:50', sahar_mudivu: '4:17', udhayam: '5:53', astam: '6:25', uchcham: '12:09' },
        { date: 'May 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:35', magrib: '6:31', isha_: '7:55', sahar_mudivu: '4:15', udhayam: '5:52', astam: '6:26', uchcham: '12:09' },
        { date: 'May 12 - 17', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:32', isha_: '7:55', sahar_mudivu: '4:12', udhayam: '5:50', astam: '6:26', uchcham: '12:08' },
        { date: 'May 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:33', isha_: '7:55', sahar_mudivu: '4:10', udhayam: '5:49', astam: '6:28', uchcham: '12:08' },
        { date: 'May 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:40', magrib: '6:34', isha_: '8:00', sahar_mudivu: '4:08', udhayam: '5:48', astam: '6:30', uchcham: '12:09' },
    ],
    'June': [
        { date: 'Jun 1 - 5', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:37', isha_: '8:00', sahar_mudivu: '4:07', udhayam: '5:47', astam: '6:32', uchcham: '12:10' },
        { date: 'Jun 6 - 11', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:48', astam: '6:33', uchcham: '12:10' },
        { date: 'Jun 12 - 17', fajr: '4:25', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:07', udhayam: '5:49', astam: '6:35', uchcham: '12:12' },
        { date: 'Jun 18 - 23', fajr: '4:30', zuhr: '12:40', asr_: '4:45', magrib: '6:41', isha_: '8:10', sahar_mudivu: '4:08', udhayam: '5:50', astam: '6:36', uchcham: '12:13' },
        { date: 'Jun 24 - End', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:10', sahar_mudivu: '4:09', udhayam: '5:50', astam: '6:37', uchcham: '12:14' },
    ],
    'July': [
        { date: 'Jul 1 - 5', fajr: '4:30', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:11', udhayam: '5:53', astam: '6:39', uchcham: '12:16' },
        { date: 'Jul 6 - 11', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:13', udhayam: '5:54', astam: '6:39', uchcham: '12:17' },
        { date: 'Jul 12 - 17', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:15', udhayam: '5:55', astam: '6:39', uchcham: '12:17' },
        { date: 'Jul 18 - 23', fajr: '4:35', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:17', udhayam: '5:57', astam: '6:39', uchcham: '12:18' },
        { date: 'Jul 24 - End', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:44', isha_: '8:10', sahar_mudivu: '4:19', udhayam: '5:58', astam: '6:39', uchcham: '12:18' },
    ],
    'August': [
        { date: 'Aug 1 - 5', fajr: '4:40', zuhr: '12:40', asr_: '4:50', magrib: '6:42', isha_: '8:05', sahar_mudivu: '4:22', udhayam: '6:00', astam: '6:37', uchcham: '12:18' },
        { date: 'Aug 6 - 11', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:40', isha_: '8:05', sahar_mudivu: '4:23', udhayam: '6:00', astam: '6:35', uchcham: '12:18' },
        { date: 'Aug 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:45', magrib: '6:38', isha_: '8:00', sahar_mudivu: '4:25', udhayam: '6:01', astam: '6:33', uchcham: '12:17' },
        { date: 'Aug 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:40', magrib: '6:36', isha_: '7:55', sahar_mudivu: '4:26', udhayam: '6:01', astam: '6:31', uchcham: '12:16' },
        { date: 'Aug 24 - End', fajr: '4:45', zuhr: '12:40', asr_: '4:35', magrib: '6:32', isha_: '7:50', sahar_mudivu: '4:27', udhayam: '6:01', astam: '6:27', uchcham: '12:15' },
    ],
    'September': [
        { date: 'Sep 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:28', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:23', uchcham: '12:12' },
        { date: 'Sep 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:35', magrib: '6:25', isha_: '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:20', uchcham: '12:11' },
        { date: 'Sep 12 - 17', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:22', isha_: '7:40', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:17', uchcham: '12:09' },
        { date: 'Sep 18 - 23', fajr: '4:50', zuhr: '12:40', asr_: '4:30', magrib: '6:17', isha_: '7:35', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:12', uchcham: '12:06' },
        { date: 'Sep 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:13', isha_: '7:30', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:08', uchcham: '12:04' },
    ],
    'October': [
        { date: 'Oct 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:25', magrib: '6:09', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:04', uchcham: '12:02' },
        { date: 'Oct 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:20', magrib: '6:06', isha_: '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:01', uchcham: '12:00' },
        { date: 'Oct 12 - 17', fajr: '4:45', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:57', uchcham: '11:59' },
        { date: 'Oct 18 - 23', fajr: '4:45', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:55', uchcham: '11:57' },
        { date: 'Oct 24 - End', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:15', sahar_mudivu: '4:28', udhayam: '6:01', astam: '5:52', uchcham: '11:56' },
    ],
    'November': [
        { date: 'Nov 1 - 5', fajr: '4:50', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:30', udhayam: '6:03', astam: '5:49', uchcham: '11:56' },
        { date: 'Nov 6 - 11', fajr: '4:50', zuhr: '12:40', asr_: '4:10', magrib: '5:56', isha_: '7:15', sahar_mudivu: '4:31', udhayam: '6:04', astam: '5:48', uchcham: '11:56' },
        { date: 'Nov 12 - 17', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:33', udhayam: '6:06', astam: '5:47', uchcham: '11:56' },
        { date: 'Nov 18 - 23', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:35', udhayam: '6:08', astam: '5:47', uchcham: '11:57' },
        { date: 'Nov 24 - End', fajr: '4:55', zuhr: '12:40', asr_: '4:10', magrib: '5:55', isha_: '7:15', sahar_mudivu: '4:36', udhayam: '6:10', astam: '5:47', uchcham: '11:59' },
    ],
    'December': [
        { date: 'Dec 1 - 5', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:56', isha_: '7:20', sahar_mudivu: '4:39', udhayam: '6:14', astam: '5:48', uchcham: '12:01' },
        { date: 'Dec 6 - 11', fajr: '5:00', zuhr: '12:40', asr_: '4:15', magrib: '5:58', isha_: '7:20', sahar_mudivu: '4:41', udhayam: '6:16', astam: '5:48', uchcham: '12:03' },
        { date: 'Dec 12 - 17', fajr: '5:05', zuhr: '12:40', asr_: '4:15', magrib: '6:00', isha_: '7:25', sahar_mudivu: '4:44', udhayam: '6:19', astam: '5:52', uchcham: '12:06' },
        { date: 'Dec 18 - 23', fajr: '5:05', zuhr: '12:40', asr_: '4:20', magrib: '6:02', isha_: '7:25', sahar_mudivu: '4:46', udhayam: '6:23', astam: '5:54', uchcham: '12:08' },
        { date: 'Dec 24 - End', fajr: '5:10', zuhr: '12:40', asr_: '4:20', magrib: '6:05', isha_: '7:30', sahar_mudivu: '4:50', udhayam: '6:26', astam: '5:57', uchcham: '12:11' },
    ],
};

// --- 3. DATA PROCESSING ---

const allMonthlyEvents = {};
const fixedZuhrTime = '12:40';

const prayerOffsets = {
    fajr: 40,
    zuhr: 20,
    asr_: 20,
    magrib: 3,
    isha_: 20,
};

const addMinutes = (timeStr, minutesToAdd) => {
    if (!timeStr) return null;
    const match = timeStr.match(/(\d+):(\d+)/);
    if (!match) return timeStr;
    let h = parseInt(match[1], 10);
    let m = parseInt(match[2], 10);

    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + minutesToAdd);

    let hh = date.getHours();
    const mm = date.getMinutes().toString().padStart(2, '0');

    if (hh > 12) hh = hh - 12;
    return `${hh}:${mm}`;
};

Object.keys(allMonthlyEventsRaw).forEach(month => {
    allMonthlyEvents[month] = allMonthlyEventsRaw[month].map(event => {
        const fajrAzan = roundToNearestTenMinutes(event.fajr);
        const asrAzan = roundToNearestTenMinutes(event.asr_);
        const magribAzan = roundToNearestTenMinutes(event.magrib);
        const ishaAzan = roundToNearestTenMinutes(event.isha_);
        const zuhrAzan = roundToNearestTenMinutes(event.zuhr || fixedZuhrTime);

        return {
            ...event,
            fajr: { azan: fajrAzan, namaz: addMinutes(fajrAzan, prayerOffsets.fajr) },
            asr_: { azan: asrAzan, namaz: addMinutes(asrAzan, prayerOffsets.asr_) },
            magrib: { azan: magribAzan, namaz: addMinutes(magribAzan, prayerOffsets.magrib) },
            isha_: { azan: ishaAzan, namaz: addMinutes(ishaAzan, prayerOffsets.isha_) },
            sahar_mudivu: event.sahar_mudivu,
            zuhr: { azan: zuhrAzan, namaz: addMinutes(zuhrAzan, prayerOffsets.zuhr) },
        };
    });
});

// --- 4. REAL-TIME LOGIC ---

const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
};

const getClosestEventDate = (events, currentDay) => {
    const eventDays = events.map(e => {
        const parts = e.date.split(' ');
        const candidate = parts.find(p => !isNaN(parseInt(p.replace(/\D/g, ''), 10))) || '1';
        const numeric = parseInt(candidate.replace(/\D/g, ''), 10);
        return isNaN(numeric) ? 1 : numeric;
    });

    // Logic to find the event range that includes the current day
    for (const event of events) {
        if (event.date.includes('-')) {
            const [startStr, endStr] = event.date.split('-').map(s => s.trim());
            const startDay = parseInt(startStr.match(/\d+/) ? startStr.match(/\d+/)[0] : '1');
            const endDay = parseInt(endStr.match(/\d+/) ? endStr.match(/\d+/)[0] : '31');

            if (currentDay >= startDay && currentDay <= endDay) {
                return event;
            }
        } else {
            // Handle single-day events if they existed, but for now we prioritize range
            const numeric = parseInt(event.date.match(/\d+/) ? event.date.match(/\d+/)[0] : '1');
            if (currentDay === numeric) {
                return event;
            }
        }
    }

    // Fallback: return the event whose starting date is closest to the current day without exceeding it.
    const applicableEvents = events.filter(e => {
        const startStr = e.date.split('-')[0].trim();
        const startDay = parseInt(startStr.match(/\d+/) ? startStr.match(/\d+/)[0] : '1');
        return currentDay >= startDay;
    });
    return applicableEvents.pop() || events[0];
};

const getActivePrayer = (event) => {
    if (!event) return null;

    const currentMinutes = getCurrentMinutes();

    const prayerTimes = [
        { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
        { name: 'Fajr', time: timeToMinutes(event.fajr, 'Fajr') },
        { name: 'Zuhr', time: timeToMinutes(event.zuhr, 'Zuhr') },
        { name: 'Asr', time: timeToMinutes(event.asr_, 'Asr') },
        { name: 'Magrib', time: timeToMinutes(event.magrib, 'Magrib') },
        { name: 'Isha', time: timeToMinutes(event.isha_, 'Isha') },
    ];

    // Use the Namaz/Iqama time for logic comparison
    const activePrayerTimeData = [
        { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
        { name: 'Fajr', time: timeToMinutes(event.fajr.namaz, 'Fajr') },
        { name: 'Zuhr', time: timeToMinutes(event.zuhr.namaz, 'Zuhr') },
        { name: 'Asr', time: timeToMinutes(event.asr_.namaz, 'Asr') },
        { name: 'Magrib', time: timeToMinutes(event.magrib.namaz, 'Magrib') },
        { name: 'Isha', time: timeToMinutes(event.isha_.namaz, 'Isha') },
    ].filter(p => p.time !== -1);

    const sortedTimes = activePrayerTimeData.sort((a, b) => a.time - b.time);

    let nextPrayerName = 'Fajr'; // Default to Fajr
    let foundNext = false;

    // Find the next prayer time (Namaz/Iqama time)
    for (const p of sortedTimes) {
        if (currentMinutes < p.time) {
            nextPrayerName = p.name;
            foundNext = true;
            break;
        }
    }

    // If no prayer is found (i.e., time is past Isha), the next prayer is Fajr
    if (!foundNext) {
        nextPrayerName = 'Fajr';
    }

    // Determine the *current* prayer (the one that has just passed).
    // This is complex, so let's use the standard "after Magrib, before Fajr is Isha" logic.

    // Let's use the Azan times to determine the current *period*.
    const periodTimes = [
        { name: 'Fajr', time: timeToMinutes(event.fajr.azan, 'Fajr') },
        { name: 'Zuhr', time: timeToMinutes(event.zuhr.azan, 'Zuhr') },
        { name: 'Asr', time: timeToMinutes(event.asr_.azan, 'Asr') },
        { name: 'Magrib', time: timeToMinutes(event.magrib.azan, 'Magrib') },
        { name: 'Isha', time: timeToMinutes(event.isha_.azan, 'Isha') },
    ].filter(p => p.time !== -1).sort((a, b) => a.time - b.time);

    let currentPeriodName = 'Isha'; // Default, handles midnight

    for (let i = 0; i < periodTimes.length; i++) {
        if (currentMinutes >= periodTimes[i].time) {
            currentPeriodName = periodTimes[i].name;
        }
    }

    // Special case for Sahar End/Fajr (pre-dawn period is Isha/Layl)
    const saharEndTime = timeToMinutes(event.sahar_mudivu, 'Sahar End');
    const fajrAzanTime = timeToMinutes(event.fajr.azan, 'Fajr');

    if (currentMinutes > saharEndTime && currentMinutes < fajrAzanTime) {
        currentPeriodName = 'Sahar End'; // The period between Sahar end and Fajr Azan
    }

    return currentPeriodName;
};

// --- 5. REFINED TIMEBADGE COMPONENT ---
const TimeBadge = ({ icon: Icon, label, time, isCurrentPrayer = false }) => {
    const hasTwoTimes = typeof time === 'object' && time !== null && 'azan' in time && 'namaz' in time;

    return (
        <div
            className={`flex flex-col p-3 rounded-xl transition-all duration-200 shadow-lg ${
                // Highlight the active prayer in the card
                isCurrentPrayer
                    ? 'bg-blue-600/20 border border-blue-400/60'
                    : 'bg-slate-700/40 border border-slate-600/40 hover:bg-slate-700/60'
                }`}
        >
            {/* Top line with Icon and Label */}
            <div className={`mb-2 flex items-center justify-between`}>
                <span className={`text-xs font-semibold uppercase tracking-wider ${isCurrentPrayer ? 'text-blue-300' : 'text-gray-400'}`}>
                    {label}
                </span>
                <Icon size={18} className={`${isCurrentPrayer ? 'text-blue-300' : 'text-gray-300'}`} />
            </div>

            {hasTwoTimes ? (
                <div className="w-full flex flex-col items-start">
                    {/* Primary (Azan) Time: Larger, Bolder, Main Focus */}
                    <span className={`text-xl font-extrabold font-mono ${isCurrentPrayer ? 'text-blue-50' : 'text-gray-100'} flex items-center`}>
                        🕌 <span className="ml-2">{time.azan}</span>
                        {isCurrentPrayer && <BellRing size={14} className="ml-2 text-blue-400" />}
                    </span>
                    {/* Secondary (Namaz/Iqama) Time: Smaller, Muted, Detail */}
                    <span className={`text-sm font-semibold font-mono ${isCurrentPrayer ? 'text-blue-200' : 'text-gray-400'} flex items-center mt-1`}>
                        ⏰ <span className="ml-2">{time.namaz}</span>
                    </span>
                </div>
            ) : (
                <div className="w-full flex flex-col items-start">
                    <span className={`text-xl font-extrabold font-mono ${isCurrentPrayer ? 'text-blue-100' : 'text-gray-200'} flex items-center`}>
                        <Clock size={16} className="text-purple-400 mr-2" />
                        {time}
                    </span>
                </div>
            )}
        </div>
    );
};

// --- 6. MAIN COMPONENT ---

export default function CalendarSection() {
    const monthNames = Object.keys(allMonthlyEvents);

    // Determine current date for 'Today' logic
    const now = new Date();
    const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
    const currentDay = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
    const events = useMemo(() => allMonthlyEvents[selectedMonth] || [], [selectedMonth]);

    const todayEventData = selectedMonth === currentMonthName
        ? getClosestEventDate(events, currentDay)
        : events[0] || null; // Fallback for demonstration if current month has no data

    // We get the active prayer name (e.g., 'Fajr', 'Zuhr')
    const activePrayer = todayEventData ? getActivePrayer(todayEventData) : null;
    const isTodayEvent = (event) => event === todayEventData;

    return (
        <section id="prayer-schedule" className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-gray-900 via-slate-950 to-gray-900 overflow-hidden">

            {/* Animated background elements for depth */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto">

                {/* Main Header with Gradients */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                        Prayer Schedule
                    </h2>
                    <p className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {selectedMonth} Times
                    </p>
                </div>

                {/* Month Selector Dropdown */}
                <div className="flex justify-center mb-12">
                    <div className="relative inline-block w-full sm:w-80">
                        <select
                            id="month-selector"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            // Classy Glassmorphism Select Styling
                            className="appearance-none block w-full bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl py-3 px-4 pr-10 text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-xl"
                        >
                            {monthNames.map((month) => (
                                <option key={month} value={month} className="bg-slate-900">
                                    {month}
                                    {month === currentMonthName && ` (${currentDay}.${currentMonth}.${currentYear})`}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-400">
                            <ChevronDown size={20} />
                        </div>
                    </div>
                </div>

                {/* Schedule Grid (Responsive) */}
                {events.length === 0 ? (
                    <p className="text-center text-xl text-red-400 font-semibold">
                        No data available for {selectedMonth}.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {events.map((event) => {
                            const isCurrentDayCard = isTodayEvent(event);

                            return (
                                <div key={event.date} className="group relative">

                                    {/* Main Card Container (Glassmorphism Effect) */}
                                    <div className={`relative backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 h-full ${isCurrentDayCard
                                        ? 'bg-blue-900/30 border-2 border-blue-500/60 shadow-2xl shadow-blue-900/50' // Highlighted today card
                                        : 'bg-slate-800/50 border border-slate-700/50 hover:border-blue-700/50 hover:bg-slate-700/60 shadow-lg'
                                        }`}>

                                        {/* Current Day Chip */}
                                        {isCurrentDayCard && (
                                            <div className="absolute -top-0 right-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center transform -translate-y-1/2">
                                                <Zap size={14} className="mr-1" />
                                                TODAY ({currentDay}.{currentMonth}.{currentYear})

                                            </div>
                                        )}

                                        {/* Header */}
                                        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-700/50">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow ${isCurrentDayCard ? 'bg-blue-500' : 'bg-slate-700'
                                                }`}>
                                                <Calendar size={18} className="text-white" />
                                            </div>
                                            <h3 className={`text-xl font-bold ${isCurrentDayCard ? 'text-blue-100' : 'text-gray-100'}`}>
                                                {event.date}
                                            </h3>
                                        </div>


                                        <h4 className="text-sm font-bold text-blue-300 mb-4 uppercase tracking-widest flex items-center">
                                            <span className="w-1 h-3 bg-blue-500 rounded mr-2"></span>
                                            Primary Salah
                                        </h4>
                                        {/* Responsive Grid for Prayer Badges (2 columns) */}
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <TimeBadge icon={Sunrise} label="Fajr" time={event.fajr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Fajr'} />
                                            <TimeBadge icon={Sun} label="Zuhr" time={event.zuhr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Zuhr'} />
                                            <TimeBadge icon={Sun} label="Asr" time={event.asr_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Asr'} />
                                            <TimeBadge icon={Sunset} label="Magrib" time={event.magrib} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Magrib'} />
                                            <TimeBadge icon={Moon} label="Isha" time={event.isha_} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Isha'} />
                                        </div>


                                        <h4 className="text-sm font-bold text-purple-300 mb-4 uppercase tracking-widest flex items-center">
                                            <span className="w-1 h-3 bg-purple-500 rounded mr-2"></span>
                                            Key Milestones
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Note: These do not have Namaz times, so they use the simpler TimeBadge display */}
                                            <TimeBadge icon={Clock} label="Sahur End" time={event.sahar_mudivu} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Sahar End'} />
                                            <TimeBadge icon={Sunrise} label="Sunrise" time={event.udhayam} />
                                            <TimeBadge icon={Sunset} label="Sunset" time={event.astam} />
                                            <TimeBadge icon={Sun} label="Midday" time={event.uchcham} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

        </section>
    );
}