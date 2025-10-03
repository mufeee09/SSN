
// import React, { useState, useMemo } from 'react';
// import { Calendar, Clock, Sun, Moon, Sunrise, Sunset, Zap, ChevronDown, BellRing } from 'lucide-react';

// // --- 1. CORE DATA AND TIME MANIPULATION FUNCTIONS ---

// /**
//  * Rounds a 12-hour time string (H:MM) to the nearest 10-minute interval.
//  * e.g., 4:02 -> 4:00, 7:08 -> 7:10, 7:05 -> 7:10
//  */
// const roundToNearestTenMinutes = (timeStr) => {
//     if (!timeStr) return null;
    
//     const match = timeStr.match(/(\d+):(\d+)/);
//     if (!match) return timeStr;

//     let h = parseInt(match[1]);
//     let m = parseInt(match[2]);

//     // Calculate total minutes since the start of the hour
//     let totalMinutes = h * 60 + m;

//     // Apply rounding: round to the nearest multiple of 10
//     // Math.round(m / 10) * 10
//     m = Math.round(m / 10) * 10;

//     // Handle overflow (e.g., 6:58 rounds to 6:60, which should be 7:00)
//     if (m === 60) {
//         m = 0;
//         h += 1;
//     }
    
//     // Handle hour overflow (e.g., 12:58 rounds to 1:00)
//     if (h === 13) {
//         h = 1; 
//     }

//     // Format back to H:MM string (ensuring minutes are 2 digits)
//     const formattedMinutes = String(m).padStart(2, '0');
//     return `${h}:${formattedMinutes}`;
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
//       // Zuhr is the noon prayer, 12:xx PM
//       if (h === 12) return 12 * 60 + m; // 12 PM
      
//   } else if (prayerName.includes('Asr') || prayerName.includes('Magrib') || prayerName.includes('Isha') || prayerName.includes('Sunset')) {
//       // Asr, Magrib, Isha are PM prayers (3 PM to 8 PM)
//       if (h < 12) {
//           h += 12; // Convert 3:xx, 4:xx, 6:xx, 7:xx to 15:xx, 16:xx, 18:xx, 19:xx
//       }
      
//   } else if (prayerName.includes('Fajr') || prayerName.includes('Sahar') || prayerName.includes('Sunrise')) {
//       // Fajr, Sahar End, Sunrise are AM prayers (4 AM to 6 AM)
//       if (h === 12) h = 0; // Midnight case, reset 12:xx to 00:xx
//       // Keep as is (04:xx, 05:xx)
//   }

//   return h * 60 + m;
// };


// // --- 2. DATA WITH MODIFIERS ---

// const allMonthlyEventsRaw = {
//   // --- JANUARY ---
//   'January': [
//     { date: 'Jan 1', fajr: '5:15', zuhr: '12:40', asr_ : '4:26', magrib: '6:10', isha_ : '7:24', sahar_mudivu: '4:54', udhayam: '6:29', astam: '6:02', uchcham: '12:15' },
//     { date: 'Jan 6', fajr: '5:15', zuhr: '12:40', asr_ : '4:28', magrib: '6:12', isha_ : '7:27', sahar_mudivu: '4:56', udhayam: '6:31', astam: '6:04', uchcham: '12:18' },
//     { date: 'Jan 12', fajr: '5:20', zuhr: '12:40', asr_ : '4:32', magrib: '6:15', isha_ : '7:29', sahar_mudivu: '4:59', udhayam: '6:33', astam: '6:07', uchcham: '12:20' },
//     { date: 'Jan 18', fajr: '5:20', zuhr: '12:40', asr_ : '4:35', magrib: '6:19', isha_ : '7:32', sahar_mudivu: '5:00', udhayam: '6:34', astam: '6:11', uchcham: '12:22' },
//     { date: 'Jan 24', fajr: '5:20', zuhr: '12:40', asr_ : '4:37', magrib: '6:21', isha_ : '7:34', sahar_mudivu: '5:02', udhayam: '6:35', astam: '6:13', uchcham: '12:24' },
//   ],
//   // --- FEBRUARY ---
//   'February': [
//     { date: 'Feb 1', fajr: '5:23', zuhr: '12:40', asr_ : '4:41', magrib: '6:25', isha_ : '7:37', sahar_mudivu: '5:03', udhayam: '6:35', astam: '6:17', uchcham: '12:26' },
//     { date: 'Feb 6', fajr: '5:22', zuhr: '12:40', asr_ : '4:42', magrib: '6:26', isha_ : '7:38', sahar_mudivu: '5:02', udhayam: '6:34', astam: '6:18', uchcham: '12:26' },
//     { date: 'Feb 12', fajr: '5:21', zuhr: '12:40', asr_ : '4:44', magrib: '6:27', isha_ : '7:38', sahar_mudivu: '5:01', udhayam: '6:33', astam: '6:20', uchcham: '12:26' },
//     { date: 'Feb 18', fajr: '5:19', zuhr: '12:40', asr_ : '4:44', magrib: '6:27', isha_ : '7:38', sahar_mudivu: '4:59', udhayam: '6:31', astam: '6:21', uchcham: '12:26' },
//     { date: 'Feb 24', fajr: '5:16', zuhr: '12:40', asr_ : '4:45', magrib: '6:27', isha_ : '7:38', sahar_mudivu: '4:56', udhayam: '6:29', astam: '6:22', uchcham: '12:26' },
//   ],
//   // --- MARCH ---
//   'March': [
//     { date: 'Mar 1', fajr: '5:14', zuhr: '12:40', asr_ : '4:45', magrib: '6:28', isha_ : '7:38', sahar_mudivu: '4:54', udhayam: '6:26', astam: '6:23', uchcham: '12:25' },
//     { date: 'Mar 6', fajr: '5:11', zuhr: '12:40', asr_ : '4:44', magrib: '6:28', isha_ : '7:38', sahar_mudivu: '4:51', udhayam: '6:24', astam: '6:23', uchcham: '12:24' },
//     { date: 'Mar 12', fajr: '5:08', zuhr: '12:40', asr_ : '4:44', magrib: '6:28', isha_ : '7:38', sahar_mudivu: '4:48', udhayam: '6:21', astam: '6:24', uchcham: '12:22' },
//     { date: 'Mar 18', fajr: '5:05', zuhr: '12:40', asr_ : '4:42', magrib: '6:29', isha_ : '7:38', sahar_mudivu: '4:45', udhayam: '6:17', astam: '6:24', uchcham: '12:20' },
//     { date: 'Mar 24', fajr: '5:01', zuhr: '12:40', asr_ : '4:41', magrib: '6:29', isha_ : '7:38', sahar_mudivu: '4:41', udhayam: '6:14', astam: '6:24', uchcham: '12:19' },
//   ],
//   // --- APRIL ---
//   'April': [
//     { date: 'Apr 1', fajr: '4:56', zuhr: '12:40', asr_ : '4:38', magrib: '6:29', isha_ : '7:47', sahar_mudivu: '4:36', udhayam: '6:09', astam: '6:24', uchcham: '12:16' },
//     { date: 'Apr 6', fajr: '4:53', zuhr: '12:40', asr_ : '4:37', magrib: '6:29', isha_ : '7:47', sahar_mudivu: '4:33', udhayam: '6:06', astam: '6:24', uchcham: '12:15' },
//     { date: 'Apr 12', fajr: '4:49', zuhr: '12:40', asr_ : '4:35', magrib: '6:29', isha_ : '7:48', sahar_mudivu: '4:29', udhayam: '6:02', astam: '6:24', uchcham: '12:13' },
//     { date: 'Apr 18', fajr: '4:45', zuhr: '12:40', asr_ : '4:33', magrib: '6:29', isha_ : '7:48', sahar_mudivu: '4:25', udhayam: '5:59', astam: '6:24', uchcham: '12:12' },
//     { date: 'Apr 24', fajr: '4:41', zuhr: '12:40', asr_ : '4:34', magrib: '6:29', isha_ : '7:50', sahar_mudivu: '4:21', udhayam: '5:56', astam: '6:24', uchcham: '12:10' },
//   ],
//   // --- MAY ---
//   'May': [
//     { date: 'May 1', fajr: '4:37', zuhr: '12:40', asr_ : '4:35', magrib: '6:30', isha_ : '7:51', sahar_mudivu: '4:17', udhayam: '5:53', astam: '6:25', uchcham: '12:09' },
//     { date: 'May 6', fajr: '4:35', zuhr: '12:40', asr_ : '4:36', magrib: '6:31', isha_ : '7:54', sahar_mudivu: '4:15', udhayam: '5:52', astam: '6:26', uchcham: '12:09' },
//     { date: 'May 12', fajr: '4:32', zuhr: '12:40', asr_ : '4:38', magrib: '6:32', isha_ : '7:55', sahar_mudivu: '4:12', udhayam: '5:50', astam: '6:26', uchcham: '12:08' },
//     { date: 'May 18', fajr: '4:30', zuhr: '12:40', asr_ : '4:39', magrib: '6:33', isha_ : '7:57', sahar_mudivu: '4:10', udhayam: '5:49', astam: '6:28', uchcham: '12:08' },
//     { date: 'May 24', fajr: '4:28', zuhr: '12:40', asr_ : '4:41', magrib: '6:34', isha_ : '7:59', sahar_mudivu: '4:08', udhayam: '5:48', astam: '6:30', uchcham: '12:09' },
//   ],
//   // --- JUNE ---
//   'June': [
//     { date: 'Jun 1', fajr: '4:27', zuhr: '12:40', asr_ : '4:43', magrib: '6:37', isha_ : '8:02', sahar_mudivu: '4:07', udhayam: '5:47', astam: '6:32', uchcham: '12:10' },
//     { date: 'Jun 6', fajr: '4:27', zuhr: '12:40', asr_ : '4:44', magrib: '6:38', isha_ : '8:04', sahar_mudivu: '4:07', udhayam: '5:48', astam: '6:33', uchcham: '12:10' },
//     { date: 'Jun 12', fajr: '4:27', zuhr: '12:40', asr_ : '4:46', magrib: '6:40', isha_ : '8:06', sahar_mudivu: '4:07', udhayam: '5:49', astam: '6:35', uchcham: '12:12' },
//     { date: 'Jun 18', fajr: '4:28', zuhr: '12:40', asr_ : '4:47', magrib: '6:41', isha_ : '8:08', sahar_mudivu: '4:08', udhayam: '5:50', astam: '6:36', uchcham: '12:13' },
//     { date: 'Jun 24', fajr: '4:29', zuhr: '12:40', asr_ : '4:49', magrib: '6:42', isha_ : '8:09', sahar_mudivu: '4:09', udhayam: '5:50', astam: '6:37', uchcham: '12:14' },
//   ],
//   // --- JULY ---
//   'July': [
//     { date: 'Jul 1', fajr: '4:31', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:11', udhayam: '5:53', astam: '6:39', uchcham: '12:16' },
//     { date: 'Jul 6', fajr: '4:33', zuhr: '12:40', asr_ : '4:51', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:13', udhayam: '5:54', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 12', fajr: '4:35', zuhr: '12:40', asr_ : '4:51', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:15', udhayam: '5:55', astam: '6:39', uchcham: '12:17' },
//     { date: 'Jul 18', fajr: '4:37', zuhr: '12:40', asr_ : '4:51', magrib: '6:44', isha_ : '8:09', sahar_mudivu: '4:17', udhayam: '5:57', astam: '6:39', uchcham: '12:18' },
//     { date: 'Jul 24', fajr: '4:39', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:08', sahar_mudivu: '4:19', udhayam: '5:58', astam: '6:39', uchcham: '12:18' },
//   ],
//   // --- AUGUST ---
//   'August': [
//     { date: 'Aug 1', fajr: '4:42', zuhr: '12:40', asr_ : '4:48', magrib: '6:42', isha_ : '8:05', sahar_mudivu: '4:22', udhayam: '6:00', astam: '6:37', uchcham: '12:18' },
//     { date: 'Aug 6', fajr: '4:43', zuhr: '12:40', asr_ : '4:46', magrib: '6:40', isha_ : '8:03', sahar_mudivu: '4:23', udhayam: '6:00', astam: '6:35', uchcham: '12:17' },
//     { date: 'Aug 12', fajr: '4:45', zuhr: '12:40', asr_ : '4:44', magrib: '6:38', isha_ : '7:59', sahar_mudivu: '4:25', udhayam: '6:01', astam: '6:33', uchcham: '12:17' },
//     { date: 'Aug 18', fajr: '4:46', zuhr: '12:40', asr_ : '4:40', magrib: '6:36', isha_ : '7:56', sahar_mudivu: '4:26', udhayam: '6:01', astam: '6:31', uchcham: '12:16' },
//     { date: 'Aug 24', fajr: '4:47', zuhr: '12:40', asr_ : '4:36', magrib: '6:32', isha_ : '7:52', sahar_mudivu: '4:27', udhayam: '6:01', astam: '6:27', uchcham: '12:15' },
//   ],
//   // --- SEPTEMBER ---
//   'September': [
//     { date: 'Sep 1', fajr: '4:48', zuhr: '12:40', asr_ : '4:34', magrib: '6:28', isha_ : '7:47', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:23', uchcham: '12:12' },
//     { date: 'Sep 6', fajr: '4:48', zuhr: '12:40', asr_ : '4:33', magrib: '6:25', isha_ : '7:43', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:20', uchcham: '12:11' },
//     { date: 'Sep 12', fajr: '4:48', zuhr: '12:40', asr_ : '4:31', magrib: '6:22', isha_ : '7:39', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:17', uchcham: '12:09' },
//     { date: 'Sep 18', fajr: '4:48', zuhr: '12:40', asr_ : '4:29', magrib: '6:17', isha_ : '7:35', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:12', uchcham: '12:06' },
//     { date: 'Sep 24', fajr: '4:48', zuhr: '12:40', asr_ : '4:26', magrib: '6:13', isha_ : '7:31', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:08', uchcham: '12:04' },
//   ],
//   // --- OCTOBER (Current Month) ---
//   'October': [
//     { date: 'Oct 1', fajr: '4:48', zuhr: '12:40', asr_ : '4:24', magrib: '6:09', isha_ : '7:26', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:04', uchcham: '12:02' },
//     { date: 'Oct 6', fajr: '4:48', zuhr: '12:40', asr_ : '4:22', magrib: '6:06', isha_ : '7:23', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:01', uchcham: '12:00' },
//     { date: 'Oct 12', fajr: '4:47', zuhr: '12:40', asr_ : '4:19', magrib: '6:02', isha_ : '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:57', uchcham: '11:59' },
//     { date: 'Oct 18', fajr: '4:47', zuhr: '12:40', asr_ : '4:17', magrib: '6:00', isha_ : '7:18', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:55', uchcham: '11:57' },
//     { date: 'Oct 24', fajr: '4:48', zuhr: '12:40', asr_ : '4:15', magrib: '5:58', isha_ : '7:16', sahar_mudivu: '4:28', udhayam: '6:01', astam: '5:52', uchcham: '11:56' },
//   ],
//   // --- NOVEMBER ---
//   'November': [
//     { date: 'Nov 1', fajr: '4:50', zuhr: '12:40', asr_ : '4:13', magrib: '5:56', isha_ : '7:15', sahar_mudivu: '4:30', udhayam: '6:03', astam: '5:49', uchcham: '11:56' },
//     { date: 'Nov 6', fajr: '4:51', zuhr: '12:40', asr_ : '4:12', magrib: '5:56', isha_ : '7:15', sahar_mudivu: '4:31', udhayam: '6:04', astam: '5:48', uchcham: '11:56' },
//     { date: 'Nov 12', fajr: '4:53', zuhr: '12:40', asr_ : '4:11', magrib: '5:55', isha_ : '7:15', sahar_mudivu: '4:33', udhayam: '6:06', astam: '5:47', uchcham: '11:56' },
//     { date: 'Nov 18', fajr: '4:55', zuhr: '12:40', asr_ : '4:11', magrib: '5:55', isha_ : '7:16', sahar_mudivu: '4:35', udhayam: '6:08', astam: '5:47', uchcham: '11:57' },
//     { date: 'Nov 24', fajr: '4:56', zuhr: '12:40', asr_ : '4:11', magrib: '5:55', isha_ : '7:17', sahar_mudivu: '4:36', udhayam: '6:10', astam: '5:47', uchcham: '11:59' },
//   ],
//   // --- DECEMBER ---
//   'December': [
//     { date: 'Dec 1', fajr: '4:59', zuhr: '12:40', asr_ : '4:13', magrib: '5:56', isha_ : '7:19', sahar_mudivu: '4:39', udhayam: '6:14', astam: '5:48', uchcham: '12:01' },
//     { date: 'Dec 6', fajr: '5:01', zuhr: '12:40', asr_ : '4:14', magrib: '5:58', isha_ : '7:21', sahar_mudivu: '4:41', udhayam: '6:16', astam: '5:48', uchcham: '12:03' },
//     { date: 'Dec 12', fajr: '5:04', zuhr: '12:40', asr_ : '4:16', magrib: '6:00', isha_ : '7:23', sahar_mudivu: '4:44', udhayam: '6:19', astam: '5:52', uchcham: '12:06' },
//     { date: 'Dec 18', fajr: '5:07', zuhr: '12:40', asr_ : '4:19', magrib: '6:02', isha_ : '7:26', sahar_mudivu: '4:46', udhayam: '6:23', astam: '5:54', uchcham: '12:08' },
//     { date: 'Dec 24', fajr: '5:10', zuhr: '12:40', asr_ : '4:21', magrib: '6:05', isha_ : '7:29', sahar_mudivu: '4:50', udhayam: '6:26', astam: '5:57', uchcham: '12:11' },
//   ],
// };

// // --- 3. DATA PROCESSING ---

// const allMonthlyEvents = {};
// const fixedZuhrTime = '12:40'; // Fixed Zuhr time as requested

// // Apply rounding and fix Zuhr time to all data points
// Object.keys(allMonthlyEventsRaw).forEach(month => {
//     allMonthlyEvents[month] = allMonthlyEventsRaw[month].map(event => ({
//         ...event,
//         // Apply rounding to prayers
//         fajr: roundToNearestTenMinutes(event.fajr),
//         asr_ : roundToNearestTenMinutes(event.asr_ ),
//         magrib: roundToNearestTenMinutes(event.magrib),
//         isha_ : roundToNearestTenMinutes(event.isha_ ),
//         sahar_mudivu: roundToNearestTenMinutes(event.sahar_mudivu), // Sahar end is also a prayer-related time
        
//         // Fix Zuhr time
//         zuhr: fixedZuhrTime,
//     }));
// });

// // --- 4. REAL-TIME LOGIC (Uses the modified data) ---

// /** Gets the current time in minutes past midnight. */
// const getCurrentMinutes = () => {
//   const now = new Date();
//   return now.getHours() * 60 + now.getMinutes();
// };

// /** Determines the closest preceding date in the event list. */
// const getClosestEventDate = (events, currentDay) => {
//   const eventDays = events.map(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]));
//   let closestDay = eventDays.filter(day => day <= currentDay).pop();
//   if (!closestDay && eventDays.length > 0) {
//     closestDay = eventDays[0];
//   }
//   return events.find(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]) === closestDay);
// };


// /** Determines the currently active prayer time slot. */
// const getActivePrayer = (event) => {
//   if (!event) return null;

//   const currentMinutes = getCurrentMinutes();

//   const prayerTimes = [
//     { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
//     { name: 'Fajr', time: timeToMinutes(event.fajr, 'Fajr') },
//     { name: 'Zuhr', time: timeToMinutes(event.zuhr, 'Zuhr') },
//     { name: 'Asr ( )', time: timeToMinutes(event.asr_ , 'Asr ( )') },
//     { name: 'Magrib', time: timeToMinutes(event.magrib, 'Magrib') },
//     { name: 'Isha ( )', time: timeToMinutes(event.isha_ , 'Isha ( )') },
//   ];
  
//   // 1. Handle the Pre-Dawn Window (Midnight to Sahar End)
//   const saharEndMinutes = prayerTimes.find(p => p.name === 'Sahar End').time;
//   if (currentMinutes < saharEndMinutes) {
//     return 'Isha ( )'; 
//   }

//   // 2. Find the LAST prayer whose time has been passed (this is the currently active prayer)
//   let activePrayerName = 'Isha ( )'; // Default to Isha if it's past all prayers, including Fajr/Zuhr (before midnight)

//   // Filter out Sahar End (a deadline) and sort by time
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
//     const defaultClasses = 'bg-gray-100 text-gray-800'; 
//     const currentClasses = isCurrentPrayer
//         ? 'bg-blue-600 text-white shadow-xl ring-4 ring-blue-300 animate-pulse-once' 
//         : defaultClasses;

//     return (
//         <div className={`flex flex-col items-center p-3 rounded-lg transition duration-500 ${isCurrentPrayer ? currentClasses : defaultClasses}`}>
//             <div className={`mb-1 flex items-center ${isCurrentPrayer ? 'text-white' : ''}`}>
//                 <Icon size={18} className="mr-1" />
//                 {isCurrentPrayer && <BellRing size={16} className="mr-1 animate-wiggle" />}
//             </div>
//             <span className={`text-xs font-medium ${isCurrentPrayer ? 'text-white' : 'text-gray-600'}`}>{label}</span>
//             <span className={`text-sm font-bold ${isCurrentPrayer ? 'text-white' : 'text-gray-900'}`}>{time}</span>
//         </div>
//     );
// };


// // --- 5. MAIN COMPONENT ---

// export default function CalendarSection() {
//   const monthNames = Object.keys(allMonthlyEvents);
  
//   // Current time: 4:20 PM on October 3, 2025
//   const now = new Date();
//   const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
//   const currentDay = now.getDate();
  
//   const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
//   const events = useMemo(() => allMonthlyEvents[selectedMonth] || [], [selectedMonth]);
  
//   const todayEventData = selectedMonth === currentMonthName 
//       ? getClosestEventDate(events, currentDay)
//       : null;
      
//   const activePrayer = todayEventData ? getActivePrayer(todayEventData) : null;
//   const isTodayEvent = (event) => selectedMonth === currentMonthName && event === todayEventData;

//   return (
//     <section id="calendar" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
//       `}</style>
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-2">
//           Daily Prayer Schedule
//         </h2>
//         {/* <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
//           Times are **rounded to the nearest 10 minutes** and **Zuhr is fixed at 12:40**.
//         </p> */}

//         {/* Month Selector Dropdown */}
//         <div className="flex justify-center mb-12">
//           <div className="relative inline-block w-full sm:w-64">
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-150 shadow-md"
//             >
//               {monthNames.map((month) => (
//                 <option key={month} value={month}>
//                   {month}
//                   {month === currentMonthName && ` (Today is ${currentDay})`}
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
//                         <Zap size={14} className="mr-1" /> NOW
//                     </div>
//                   )}

//                   {/* Header/Title Section */}
//                   <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-100">
//                     <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
//                       <Calendar size={18} className="text-white" />
//                     </div>
//                     <h3 className={`text-xl font-bold ${isCurrentDayCard ? 'text-blue-600' : 'text-gray-900'}`}>
//                       {`Date: ${event.date}`}
//                     </h3>
//                   </div>
                  
//                   {/* --- PRAYER TIMES SECTION (Order 1-5) --- */}
//                   <h4 className="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Salah Times:</h4>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
//                     {/* 1. Fajr */}
//                     <TimeBadge icon={Sunrise} label="Fajr" time={event.fajr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Fajr'} />
//                     {/* 2. Zuhr (FIXED) */}
//                     <TimeBadge icon={Sun} label="Zuhr" time={event.zuhr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Zuhr'} />
//                     {/* 3. Asr */}
//                     <TimeBadge icon={Sun} label="Asr" time={event.asr_ } isCurrentPrayer={isCurrentDayCard && activePrayer === 'Asr ( )'} />
//                     {/* 4. Magrib */}
//                     <TimeBadge icon={Sunset} label="Magrib" time={event.magrib} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Magrib'} />
//                     {/* 5. Isha */}
//                     <TimeBadge icon={Moon} label="Isha" time={event.isha_ } isCurrentPrayer={isCurrentDayCard && activePrayer === 'Isha ( )'} />
//                   </div>

//                   {/* --- ASTRONOMICAL / OTHER TIMES SECTION (Order 6-9) --- */}
//                   <h4 className="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Other Important Times:</h4>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                     {/* 6. Sunrise */}
//                     <TimeBadge icon={Sunrise} label="Sunrise" time={event.udhayam} />
//                     {/* 7. Sunset */}
//                     <TimeBadge icon={Sunset} label="Sunset" time={event.astam} />
//                     {/* 8. Midday */}
//                     <TimeBadge icon={Sun} label="Midday" time={event.uchcham} />
//                     {/* 9. Sahar End (Rounded) */}
//                     <TimeBadge 
//                       icon={Clock} 
//                       label="Sahur End" 
//                       time={event.sahar_mudivu} 
//                       isCurrentPrayer={isCurrentDayCard && activePrayer === 'Sahur End'}
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

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Sun, Moon, Sunrise, Sunset, Zap, ChevronDown, BellRing } from 'lucide-react';

// --- 1. CORE DATA AND TIME MANIPULATION FUNCTIONS ---

/**
 * Rounds a 12-hour time string (H:MM) to the nearest 10-minute interval.
 * e.g., 4:02 -> 4:00, 7:08 -> 7:10, 7:05 -> 7:10
 */
const roundToNearestTenMinutes = (timeStr) => {
    if (!timeStr) return null;
    
    const match = timeStr.match(/(\d+):(\d+)/);
    if (!match) return timeStr;

    let h = parseInt(match[1]);
    let m = parseInt(match[2]);

    // Apply rounding: round to the nearest multiple of 10
    m = Math.round(m / 10) * 10;

    // Handle overflow (e.g., 6:58 rounds to 6:60, which should be 7:00)
    if (m === 60) {
        m = 0;
        h += 1;
    }
    
    // Handle hour overflow (e.g., 12:58 rounds to 1:00)
    if (h === 13) {
        h = 1; 
    }

    // Format back to H:MM string (ensuring minutes are 2 digits)
    const formattedMinutes = String(m).padStart(2, '0');
    return `${h}:${formattedMinutes}`;
};

/** Converts 12-hour time string to minutes past midnight (24h clock) based on prayer context. */
const timeToMinutes = (timeStr, prayerName) => {
  if (!timeStr) return -1;
  
  const match = timeStr.match(/(\d+):(\d+)/);
  if (!match) return -1;

  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  
  // Convert based on Prayer Time Heuristics (assuming Indian timings)
  if (prayerName.includes('Zuhr') || prayerName.includes('Midday')) {
      // Zuhr is the noon prayer, 12:xx PM
      if (h === 12) return 12 * 60 + m; 
      
  } else if (prayerName.includes('Asr') || prayerName.includes('Magrib') || prayerName.includes('Isha') || prayerName.includes('Sunset')) {
      // Asr, Magrib, Isha are PM prayers (3 PM to 8 PM)
      if (h < 12) {
          h += 12; 
      }
      
  } else if (prayerName.includes('Fajr') || prayerName.includes('Sahar') || prayerName.includes('Sunrise')) {
      // Fajr, Sahar End, Sunrise are AM prayers (4 AM to 6 AM)
      if (h === 12) h = 0; // Midnight case, reset 12:xx to 00:xx
      // Keep as is (04:xx, 05:xx)
  }

  return h * 60 + m;
};


// --- 2. DATA WITH MODIFIERS (using the raw data provided) ---

const allMonthlyEventsRaw = {
  'January': [
    { date: 'Jan 1 - 5', fajr: '5:15', zuhr: '12:40', asr_ : '4:25', magrib: '6:10', isha_ : '7:35', sahar_mudivu: '4:54', udhayam: '6:29', astam: '6:02', uchcham: '12:15' },
    { date: 'Jan 6 - 11', fajr: '5:15', zuhr: '12:40', asr_ : '4:30', magrib: '6:12', isha_ : '7:35', sahar_mudivu: '4:56', udhayam: '6:31', astam: '6:04', uchcham: '12:18' },
    { date: 'Jan 12 - 17', fajr: '5:20', zuhr: '12:40', asr_ : '4:30', magrib: '6:15', isha_ : '7:40', sahar_mudivu: '4:59', udhayam: '6:33', astam: '6:07', uchcham: '12:20' },
    { date: 'Jan 18 - 23', fajr: '5:20', zuhr: '12:40', asr_ : '4:35', magrib: '6:19', isha_ : '7:40', sahar_mudivu: '5:00', udhayam: '6:34', astam: '6:11', uchcham: '12:22' },
    { date: 'Jan 24 - End', fajr: '5:20', zuhr: '12:40', asr_ : '4:35', magrib: '6:21', isha_ : '7:45', sahar_mudivu: '5:02', udhayam: '6:35', astam: '6:13', uchcham: '12:24' },
  ],
  'February': [
    { date: 'Feb 1 - 5', fajr: '5:25', zuhr: '12:40', asr_ : '4:40', magrib: '6:25', isha_ : '7:45', sahar_mudivu: '5:03', udhayam: '6:35', astam: '6:17', uchcham: '12:26' },
    { date: 'Feb 6 - 11', fajr: '5:20', zuhr: '12:40', asr_ : '4:40', magrib: '6:26', isha_ : '7:45', sahar_mudivu: '5:02', udhayam: '6:34', astam: '6:18', uchcham: '12:26' },
    { date: 'Feb 12 - 17', fajr: '5:20', zuhr: '12:40', asr_ : '4:45', magrib: '6:27', isha_ : '7:45', sahar_mudivu: '5:01', udhayam: '6:33', astam: '6:20', uchcham: '12:26' },
    { date: 'Feb 18 - 23', fajr: '5:20', zuhr: '12:40', asr_ : '4:45', magrib: '6:27', isha_ : '7:45', sahar_mudivu: '4:59', udhayam: '6:31', astam: '6:21', uchcham: '12:26' },
    { date: 'Feb 24 - End', fajr: '5:15', zuhr: '12:40', asr_ : '4:45', magrib: '6:27', isha_ : '7:45', sahar_mudivu: '4:56', udhayam: '6:29', astam: '6:22', uchcham: '12:26' },
  ],
  'March': [
    { date: 'Mar 1 - 5', fajr: '5:15', zuhr: '12:40', asr_ : '4:45', magrib: '6:28', isha_ : '7:45', sahar_mudivu: '4:54', udhayam: '6:26', astam: '6:23', uchcham: '12:25' },
    { date: 'Mar 6 - 11', fajr: '5:10', zuhr: '12:40', asr_ : '4:45', magrib: '6:28', isha_ : '7:45', sahar_mudivu: '4:51', udhayam: '6:24', astam: '6:23', uchcham: '12:24' },
    { date: 'Mar 12 - 17', fajr: '5:10', zuhr: '12:40', asr_ : '4:45', magrib: '6:28', isha_ : '7:45', sahar_mudivu: '4:48', udhayam: '6:21', astam: '6:24', uchcham: '12:22' },
    { date: 'Mar 18 - 23', fajr: '5:05', zuhr: '12:40', asr_ : '4:40', magrib: '6:29', isha_ : '7:45', sahar_mudivu: '4:45', udhayam: '6:17', astam: '6:24', uchcham: '12:20' },
    { date: 'Mar 24 - End', fajr: '5:00', zuhr: '12:40', asr_ : '4:40', magrib: '6:29', isha_ : '7:45', sahar_mudivu: '4:41', udhayam: '6:14', astam: '6:24', uchcham: '12:19' },
  ],
  'April': [
    { date: 'Apr 1 - 5', fajr: '4:55', zuhr: '12:40', asr_ : '4:40', magrib: '6:29', isha_ : '7:45', sahar_mudivu: '4:36', udhayam: '6:09', astam: '6:24', uchcham: '12:16' },
    { date: 'Apr 6 - 11', fajr: '4:55', zuhr: '12:40', asr_ : '4:35', magrib: '6:29', isha_ : '7:45', sahar_mudivu: '4:33', udhayam: '6:06', astam: '6:24', uchcham: '12:15' },
    { date: 'Apr 12 - 17', fajr: '4:50', zuhr: '12:40', asr_ : '4:35', magrib: '6:29', isha_ : '7:50', sahar_mudivu: '4:29', udhayam: '6:02', astam: '6:24', uchcham: '12:13' },
    { date: 'Apr 18 - 23', fajr: '4:45', zuhr: '12:40', asr_ : '4:35', magrib: '6:29', isha_ : '7:50', sahar_mudivu: '4:25', udhayam: '5:59', astam: '6:24', uchcham: '12:12' },
    { date: 'Apr 24 - End', fajr: '4:40', zuhr: '12:40', asr_ : '4:35', magrib: '6:29', isha_ : '7:50', sahar_mudivu: '4:21', udhayam: '5:56', astam: '6:24', uchcham: '12:10' },
  ],
  'May': [
    { date: 'May 1 - 5', fajr: '4:35', zuhr: '12:40', asr_ : '4:35', magrib: '6:30', isha_ : '7:50', sahar_mudivu: '4:17', udhayam: '5:53', astam: '6:25', uchcham: '12:09' },
    { date: 'May 6 - 11', fajr: '4:35', zuhr: '12:40', asr_ : '4:35', magrib: '6:31', isha_ : '7:55', sahar_mudivu: '4:15', udhayam: '5:52', astam: '6:26', uchcham: '12:09' },
    { date: 'May 12 - 17', fajr: '4:30', zuhr: '12:40', asr_ : '4:40', magrib: '6:32', isha_ : '7:55', sahar_mudivu: '4:12', udhayam: '5:50', astam: '6:26', uchcham: '12:08' },
    { date: 'May 18 - 23', fajr: '4:30', zuhr: '12:40', asr_ : '4:40', magrib: '6:33', isha_ : '7:55', sahar_mudivu: '4:10', udhayam: '5:49', astam: '6:28', uchcham: '12:08' },
    { date: 'May 24 - End', fajr: '4:30', zuhr: '12:40', asr_ : '4:40', magrib: '6:34', isha_ : '8:00', sahar_mudivu: '4:08', udhayam: '5:48', astam: '6:30', uchcham: '12:09' },
  ],
  'June': [
    { date: 'Jun 1 - 5', fajr: '4:25', zuhr: '12:40', asr_ : '4:45', magrib: '6:37', isha_ : '8:00', sahar_mudivu: '4:07', udhayam: '5:47', astam: '6:32', uchcham: '12:10' },
    { date: 'Jun 6 - 11', fajr: '4:25', zuhr: '12:40', asr_ : '4:45', magrib: '6:38', isha_ : '8:05', sahar_mudivu: '4:07', udhayam: '5:48', astam: '6:33', uchcham: '12:10' },
    { date: 'Jun 12 - 17', fajr: '4:25', zuhr: '12:40', asr_ : '4:45', magrib: '6:40', isha_ : '8:05', sahar_mudivu: '4:07', udhayam: '5:49', astam: '6:35', uchcham: '12:12' },
    { date: 'Jun 18 - 23', fajr: '4:30', zuhr: '12:40', asr_ : '4:45', magrib: '6:41', isha_ : '8:10', sahar_mudivu: '4:08', udhayam: '5:50', astam: '6:36', uchcham: '12:13' },
    { date: 'Jun 24 - End', fajr: '4:30', zuhr: '12:40', asr_ : '4:50', magrib: '6:42', isha_ : '8:10', sahar_mudivu: '4:09', udhayam: '5:50', astam: '6:37', uchcham: '12:14' },
  ],
  'July': [
    { date: 'Jul 1 - 5', fajr: '4:30', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:11', udhayam: '5:53', astam: '6:39', uchcham: '12:16' },
    { date: 'Jul 6 - 11', fajr: '4:35', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:13', udhayam: '5:54', astam: '6:39', uchcham: '12:17' },
    { date: 'Jul 12 - 17', fajr: '4:35', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:15', udhayam: '5:55', astam: '6:39', uchcham: '12:17' },
    { date: 'Jul 18 - 23', fajr: '4:35', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:17', udhayam: '5:57', astam: '6:39', uchcham: '12:18' },
    { date: 'Jul 24 - End', fajr: '4:40', zuhr: '12:40', asr_ : '4:50', magrib: '6:44', isha_ : '8:10', sahar_mudivu: '4:19', udhayam: '5:58', astam: '6:39', uchcham: '12:18' },
  ],
  'August': [
    { date: 'Aug 1 - 5', fajr: '4:40', zuhr: '12:40', asr_ : '4:50', magrib: '6:42', isha_ : '8:05', sahar_mudivu: '4:22', udhayam: '6:00', astam: '6:37', uchcham: '12:18' },
    { date: 'Aug 6 - 11', fajr: '4:45', zuhr: '12:40', asr_ : '4:45', magrib: '6:40', isha_ : '8:05', sahar_mudivu: '4:23', udhayam: '6:00', astam: '6:35', uchcham: '12:17' },
    { date: 'Aug 12 - 17', fajr: '4:45', zuhr: '12:40', asr_ : '4:45', magrib: '6:38', isha_ : '8:00', sahar_mudivu: '4:25', udhayam: '6:01', astam: '6:33', uchcham: '12:17' },
    { date: 'Aug 18 - 23', fajr: '4:45', zuhr: '12:40', asr_ : '4:40', magrib: '6:36', isha_ : '7:55', sahar_mudivu: '4:26', udhayam: '6:01', astam: '6:31', uchcham: '12:16' },
    { date: 'Aug 24 - End', fajr: '4:45', zuhr: '12:40', asr_ : '4:35', magrib: '6:32', isha_ : '7:50', sahar_mudivu: '4:27', udhayam: '6:01', astam: '6:27', uchcham: '12:15' },
  ],
  'September': [
    { date: 'Sep 1 - 5', fajr: '4:50', zuhr: '12:40', asr_ : '4:35', magrib: '6:28', isha_ : '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:23', uchcham: '12:12' },
    { date: 'Sep 6 - 11', fajr: '4:50', zuhr: '12:40', asr_ : '4:35', magrib: '6:25', isha_ : '7:45', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:20', uchcham: '12:11' },
    { date: 'Sep 12 - 17', fajr: '4:50', zuhr: '12:40', asr_ : '4:30', magrib: '6:22', isha_ : '7:40', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:17', uchcham: '12:09' },
    { date: 'Sep 18 - 23', fajr: '4:50', zuhr: '12:40', asr_ : '4:30', magrib: '6:17', isha_ : '7:35', sahar_mudivu: '4:28', udhayam: '6:01', astam: '6:12', uchcham: '12:06' },
    { date: 'Sep 24 - End', fajr: '4:50', zuhr: '12:40', asr_ : '4:25', magrib: '6:13', isha_ : '7:30', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:08', uchcham: '12:04' },
  ],
  'October': [
    { date: 'Oct 1 - 5', fajr: '4:50', zuhr: '12:40', asr_ : '4:25', magrib: '6:09', isha_ : '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:04', uchcham: '12:02' },
    { date: 'Oct 6 - 11', fajr: '4:50', zuhr: '12:40', asr_ : '4:20', magrib: '6:06', isha_ : '7:25', sahar_mudivu: '4:28', udhayam: '6:00', astam: '6:01', uchcham: '12:00' },
    { date: 'Oct 12 - 17', fajr: '4:45', zuhr: '12:40', asr_ : '4:20', magrib: '6:02', isha_ : '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:57', uchcham: '11:59' },
    { date: 'Oct 18 - 23', fajr: '4:45', zuhr: '12:40', asr_ : '4:15', magrib: '6:00', isha_ : '7:20', sahar_mudivu: '4:27', udhayam: '6:00', astam: '5:55', uchcham: '11:57' },
    { date: 'Oct 24 - End', fajr: '4:50', zuhr: '12:40', asr_ : '4:15', magrib: '5:58', isha_ : '7:15', sahar_mudivu: '4:28', udhayam: '6:01', astam: '5:52', uchcham: '11:56' },
  ],
  'November': [
    { date: 'Nov 1 - 5', fajr: '4:50', zuhr: '12:40', asr_ : '4:15', magrib: '5:56', isha_ : '7:15', sahar_mudivu: '4:30', udhayam: '6:03', astam: '5:49', uchcham: '11:56' },
    { date: 'Nov 6 - 11', fajr: '4:50', zuhr: '12:40', asr_ : '4:10', magrib: '5:56', isha_ : '7:15', sahar_mudivu: '4:31', udhayam: '6:04', astam: '5:48', uchcham: '11:56' },
    { date: 'Nov 12 - 17', fajr: '4:55', zuhr: '12:40', asr_ : '4:10', magrib: '5:55', isha_ : '7:15', sahar_mudivu: '4:33', udhayam: '6:06', astam: '5:47', uchcham: '11:56' },
    { date: 'Nov 18 - 23', fajr: '4:55', zuhr: '12:40', asr_ : '4:10', magrib: '5:55', isha_ : '7:15', sahar_mudivu: '4:35', udhayam: '6:08', astam: '5:47', uchcham: '11:57' },
    { date: 'Nov 24 - End', fajr: '4:55', zuhr: '12:40', asr_ : '4:10', magrib: '5:55', isha_ : '7:20', sahar_mudivu: '4:36', udhayam: '6:10', astam: '5:47', uchcham: '11:59' },
  ],
  'December': [
    { date: 'Dec 1 - 5', fajr: '5:00', zuhr: '12:40', asr_ : '4:15', magrib: '5:56', isha_ : '7:20', sahar_mudivu: '4:39', udhayam: '6:14', astam: '5:48', uchcham: '12:01' },
    { date: 'Dec 6 - 11', fajr: '5:00', zuhr: '12:40', asr_ : '4:15', magrib: '5:58', isha_ : '7:20', sahar_mudivu: '4:41', udhayam: '6:16', astam: '5:48', uchcham: '12:03' },
    { date: 'Dec 12 - 17', fajr: '5:05', zuhr: '12:40', asr_ : '4:15', magrib: '6:00', isha_ : '7:25', sahar_mudivu: '4:44', udhayam: '6:19', astam: '5:52', uchcham: '12:06' },
    { date: 'Dec 18 - 23', fajr: '5:05', zuhr: '12:40', asr_ : '4:20', magrib: '6:02', isha_ : '7:25', sahar_mudivu: '4:46', udhayam: '6:23', astam: '5:54', uchcham: '12:08' },
    { date: 'Dec 24 - End', fajr: '5:10', zuhr: '12:40', asr_ : '4:20', magrib: '6:05', isha_ : '7:30', sahar_mudivu: '4:50', udhayam: '6:26', astam: '5:57', uchcham: '12:11' },
  ],
};


// --- 3. DATA PROCESSING (unchanged, applying rounding and fixes) ---

const allMonthlyEvents = {};
const fixedZuhrTime = '12:40'; 

Object.keys(allMonthlyEventsRaw).forEach(month => {
    allMonthlyEvents[month] = allMonthlyEventsRaw[month].map(event => ({
        ...event,
        fajr: roundToNearestTenMinutes(event.fajr),
        asr_ : roundToNearestTenMinutes(event.asr_ ),
        magrib: roundToNearestTenMinutes(event.magrib),
        isha_ : roundToNearestTenMinutes(event.isha_ ),
        sahar_mudivu: roundToNearestTenMinutes(event.sahar_mudivu), 
        zuhr: fixedZuhrTime,
    }));
});

// --- 4. REAL-TIME LOGIC (unchanged) ---

const getCurrentMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const getClosestEventDate = (events, currentDay) => {
  const eventDays = events.map(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]));
  let closestDay = eventDays.filter(day => day <= currentDay).pop();
  if (!closestDay && eventDays.length > 0) {
    closestDay = eventDays[0];
  }
  return events.find(e => parseInt(e.date.split(' ')[1] || e.date.split(' ')[0]) === closestDay);
};

const getActivePrayer = (event) => {
  if (!event) return null;

  const currentMinutes = getCurrentMinutes();

  const prayerTimes = [
    { name: 'Sahar End', time: timeToMinutes(event.sahar_mudivu, 'Sahar End') },
    { name: 'Fajr', time: timeToMinutes(event.fajr, 'Fajr') },
    { name: 'Zuhr', time: timeToMinutes(event.zuhr, 'Zuhr') },
    { name: 'Asr ( )', time: timeToMinutes(event.asr_ , 'Asr ( )') },
    { name: 'Magrib', time: timeToMinutes(event.magrib, 'Magrib') },
    { name: 'Isha ( )', time: timeToMinutes(event.isha_ , 'Isha ( )') },
  ];
  
  const saharEndMinutes = prayerTimes.find(p => p.name === 'Sahar End').time;
  if (currentMinutes < saharEndMinutes) {
    return 'Isha ( )'; 
  }

  let activePrayerName = 'Isha ( )'; 

  const salatTimes = prayerTimes
    .filter(p => p.name !== 'Sahar End')
    .sort((a, b) => a.time - b.time);

  for (let i = 0; i < salatTimes.length; i++) {
    if (currentMinutes >= salatTimes[i].time) {
      activePrayerName = salatTimes[i].name;
    }
  }

  return activePrayerName;
};

/** Helper component for a time badge (styled to be premium) */
const TimeBadge = ({ icon: Icon, label, time, isCurrentPrayer = false }) => {
    const defaultClasses = 'bg-gray-100 text-gray-800'; 
    const currentClasses = isCurrentPrayer
        ? 'bg-blue-600 text-white shadow-xl ring-4 ring-blue-300 animate-pulse-once' 
        : defaultClasses;

    return (
        <div className={`flex flex-col items-center p-3 rounded-lg transition duration-500 ${isCurrentPrayer ? currentClasses : defaultClasses}`}>
            <div className={`mb-1 flex items-center ${isCurrentPrayer ? 'text-white' : ''}`}>
                <Icon size={18} className="mr-1" />
                {isCurrentPrayer && <BellRing size={16} className="mr-1 animate-wiggle" />}
            </div>
            <span className={`text-xs font-medium ${isCurrentPrayer ? 'text-white' : 'text-gray-600'}`}>{label}</span>
            <span className={`text-sm font-bold ${isCurrentPrayer ? 'text-white' : 'text-gray-900'}`}>{time}</span>
        </div>
    );
};


// --- 5. MAIN COMPONENT ---

export default function CalendarSection() {
  const monthNames = Object.keys(allMonthlyEvents);
  
  const now = new Date();
  const currentMonthName = now.toLocaleDateString('en-US', { month: 'long' });
  const currentDay = now.getDate();
  
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const events = useMemo(() => allMonthlyEvents[selectedMonth] || [], [selectedMonth]);
  
  const todayEventData = selectedMonth === currentMonthName 
      ? getClosestEventDate(events, currentDay)
      : null;
      
  const activePrayer = todayEventData ? getActivePrayer(todayEventData) : null;
  const isTodayEvent = (event) => selectedMonth === currentMonthName && event === todayEventData;

  return (
    // FIX 2: Changed ID from "calendar" to "prayer-schedule" to match the Navbar.
    <section id="prayer-schedule" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <style>{`
        @keyframes pulse-once {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        .animate-pulse-once {
          animation: pulse-once 2s infinite ease-in-out;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
        /* Premium design enhancement for the title */
        .premium-title {
          background: -webkit-linear-gradient(45deg, #000000ff, #000000ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-2 premium-title">
          Daily Prayer Schedule
        </h2>
        
        {/* Month Selector Dropdown */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-block w-full sm:w-64">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 shadow-md"
            >
              {monthNames.map((month) => (
                <option key={month} value={month}>
                  {month}
                  {month === currentMonthName && ` - ${currentDay}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-xl text-red-500 font-semibold">
            No prayer time data available for {selectedMonth}.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event) => {
              const isCurrentDayCard = isTodayEvent(event);
              
              const cardClasses = isCurrentDayCard
                ? 'bg-white p-6 rounded-xl shadow-2xl border-4 border-blue-500 transform scale-[1.03] hover:scale-[1.05] transition-all duration-500 relative'
                : 'bg-white p-6 rounded-xl shadow-xl border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out';
                
              return (
                <div key={event.date} className={cardClasses}>
                  
                  {isCurrentDayCard && (
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg flex items-center animate-bounce-slow">
                        <Zap size={14} className="mr-1" /> CURRENT
                    </div>
                  )}

                  {/* Header/Title Section */}
                  <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Calendar size={18} className="text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${isCurrentDayCard ? 'text-blue-600' : 'text-gray-900'}`}>
                      {`Date: ${event.date}`}
                    </h3>
                  </div>
                  
                  {/* --- PRAYER TIMES SECTION (Order 1-5) --- */}
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Salah Times:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <TimeBadge icon={Sunrise} label="Fajr" time={event.fajr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Fajr'} />
                    <TimeBadge icon={Sun} label="Zuhr" time={event.zuhr} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Zuhr'} />
                    <TimeBadge icon={Sun} label="Asr" time={event.asr_ } isCurrentPrayer={isCurrentDayCard && activePrayer === 'Asr ( )'} />
                    <TimeBadge icon={Sunset} label="Magrib" time={event.magrib} isCurrentPrayer={isCurrentDayCard && activePrayer === 'Magrib'} />
                    <TimeBadge icon={Moon} label="Isha" time={event.isha_ } isCurrentPrayer={isCurrentDayCard && activePrayer === 'Isha ( )'} />
                  </div>

                  {/* --- ASTRONOMICAL / OTHER TIMES SECTION (Order 6-9) --- */}
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Other Important Times:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <TimeBadge icon={Sunrise} label="Sunrise" time={event.udhayam} />
                    <TimeBadge icon={Sunset} label="Sunset" time={event.astam} />
                    <TimeBadge icon={Sun} label="Midday" time={event.uchcham} />
                    <TimeBadge 
                      icon={Clock} 
                      label="Sahur End" 
                      time={event.sahar_mudivu} 
                      // Sahar End is a cut-off time, not a prayer, but we can highlight it.
                      isCurrentPrayer={isCurrentDayCard && activePrayer === 'Sahar End'}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}