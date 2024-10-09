(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_calendars_js"],{

/***/ "./node_modules/plotly.js/lib/calendars.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/calendars.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/components/calendars */ "./node_modules/plotly.js/src/components/calendars/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/components/calendars/calendars.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/calendars/calendars.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



// a trimmed down version of:
// https://github.com/alexcjohnson/world-calendars/blob/master/dist/index.js

module.exports = __webpack_require__(/*! world-calendars/dist/main */ "./node_modules/world-calendars/dist/main.js");

__webpack_require__(/*! world-calendars/dist/plus */ "./node_modules/world-calendars/dist/plus.js");

__webpack_require__(/*! world-calendars/dist/calendars/chinese */ "./node_modules/world-calendars/dist/calendars/chinese.js");
__webpack_require__(/*! world-calendars/dist/calendars/coptic */ "./node_modules/world-calendars/dist/calendars/coptic.js");
__webpack_require__(/*! world-calendars/dist/calendars/discworld */ "./node_modules/world-calendars/dist/calendars/discworld.js");
__webpack_require__(/*! world-calendars/dist/calendars/ethiopian */ "./node_modules/world-calendars/dist/calendars/ethiopian.js");
__webpack_require__(/*! world-calendars/dist/calendars/hebrew */ "./node_modules/world-calendars/dist/calendars/hebrew.js");
__webpack_require__(/*! world-calendars/dist/calendars/islamic */ "./node_modules/world-calendars/dist/calendars/islamic.js");
__webpack_require__(/*! world-calendars/dist/calendars/julian */ "./node_modules/world-calendars/dist/calendars/julian.js");
__webpack_require__(/*! world-calendars/dist/calendars/mayan */ "./node_modules/world-calendars/dist/calendars/mayan.js");
__webpack_require__(/*! world-calendars/dist/calendars/nanakshahi */ "./node_modules/world-calendars/dist/calendars/nanakshahi.js");
__webpack_require__(/*! world-calendars/dist/calendars/nepali */ "./node_modules/world-calendars/dist/calendars/nepali.js");
__webpack_require__(/*! world-calendars/dist/calendars/persian */ "./node_modules/world-calendars/dist/calendars/persian.js");
__webpack_require__(/*! world-calendars/dist/calendars/taiwan */ "./node_modules/world-calendars/dist/calendars/taiwan.js");
__webpack_require__(/*! world-calendars/dist/calendars/thai */ "./node_modules/world-calendars/dist/calendars/thai.js");
__webpack_require__(/*! world-calendars/dist/calendars/ummalqura */ "./node_modules/world-calendars/dist/calendars/ummalqura.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/components/calendars/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/calendars/index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var calendars = __webpack_require__(/*! ./calendars */ "./node_modules/plotly.js/src/components/calendars/calendars.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var constants = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js");

var EPOCHJD = constants.EPOCHJD;
var ONEDAY = constants.ONEDAY;

var attributes = {
    valType: 'enumerated',
    values: Object.keys(calendars.calendars),
    role: 'info',
    editType: 'calc',
    dflt: 'gregorian'
};

var handleDefaults = function(contIn, contOut, attr, dflt) {
    var attrs = {};
    attrs[attr] = attributes;

    return Lib.coerce(contIn, contOut, attrs, attr, dflt);
};

var handleTraceDefaults = function(traceIn, traceOut, coords, layout) {
    for(var i = 0; i < coords.length; i++) {
        handleDefaults(traceIn, traceOut, coords[i] + 'calendar', layout.calendar);
    }
};

// each calendar needs its own default canonical tick. I would love to use
// 2000-01-01 (or even 0000-01-01) for them all but they don't necessarily
// all support either of those dates. Instead I'll use the most significant
// number they *do* support, biased toward the present day.
var CANONICAL_TICK = {
    chinese: '2000-01-01',
    coptic: '2000-01-01',
    discworld: '2000-01-01',
    ethiopian: '2000-01-01',
    hebrew: '5000-01-01',
    islamic: '1000-01-01',
    julian: '2000-01-01',
    mayan: '5000-01-01',
    nanakshahi: '1000-01-01',
    nepali: '2000-01-01',
    persian: '1000-01-01',
    jalali: '1000-01-01',
    taiwan: '1000-01-01',
    thai: '2000-01-01',
    ummalqura: '1400-01-01'
};

// Start on a Sunday - for week ticks
// Discworld and Mayan calendars don't have 7-day weeks but we're going to give them
// 7-day week ticks so start on our Sundays.
// If anyone really cares we can customize the auto tick spacings for these calendars.
var CANONICAL_SUNDAY = {
    chinese: '2000-01-02',
    coptic: '2000-01-03',
    discworld: '2000-01-03',
    ethiopian: '2000-01-05',
    hebrew: '5000-01-01',
    islamic: '1000-01-02',
    julian: '2000-01-03',
    mayan: '5000-01-01',
    nanakshahi: '1000-01-05',
    nepali: '2000-01-05',
    persian: '1000-01-01',
    jalali: '1000-01-01',
    taiwan: '1000-01-04',
    thai: '2000-01-04',
    ummalqura: '1400-01-06'
};

var DFLTRANGE = {
    chinese: ['2000-01-01', '2001-01-01'],
    coptic: ['1700-01-01', '1701-01-01'],
    discworld: ['1800-01-01', '1801-01-01'],
    ethiopian: ['2000-01-01', '2001-01-01'],
    hebrew: ['5700-01-01', '5701-01-01'],
    islamic: ['1400-01-01', '1401-01-01'],
    julian: ['2000-01-01', '2001-01-01'],
    mayan: ['5200-01-01', '5201-01-01'],
    nanakshahi: ['0500-01-01', '0501-01-01'],
    nepali: ['2000-01-01', '2001-01-01'],
    persian: ['1400-01-01', '1401-01-01'],
    jalali: ['1400-01-01', '1401-01-01'],
    taiwan: ['0100-01-01', '0101-01-01'],
    thai: ['2500-01-01', '2501-01-01'],
    ummalqura: ['1400-01-01', '1401-01-01']
};

/*
 * convert d3 templates to world-calendars templates, so our users only need
 * to know d3's specifiers. Map space padding to no padding, and unknown fields
 * to an ugly placeholder
 */
var UNKNOWN = '##';
var d3ToWorldCalendars = {
    'd': {'0': 'dd', '-': 'd'}, // 2-digit or unpadded day of month
    'e': {'0': 'd', '-': 'd'}, // alternate, always unpadded day of month
    'a': {'0': 'D', '-': 'D'}, // short weekday name
    'A': {'0': 'DD', '-': 'DD'}, // full weekday name
    'j': {'0': 'oo', '-': 'o'}, // 3-digit or unpadded day of the year
    'W': {'0': 'ww', '-': 'w'}, // 2-digit or unpadded week of the year (Monday first)
    'm': {'0': 'mm', '-': 'm'}, // 2-digit or unpadded month number
    'b': {'0': 'M', '-': 'M'}, // short month name
    'B': {'0': 'MM', '-': 'MM'}, // full month name
    'y': {'0': 'yy', '-': 'yy'}, // 2-digit year (map unpadded to zero-padded)
    'Y': {'0': 'yyyy', '-': 'yyyy'}, // 4-digit year (map unpadded to zero-padded)
    'U': UNKNOWN, // Sunday-first week of the year
    'w': UNKNOWN, // day of the week [0(sunday),6]
    // combined format, we replace the date part with the world-calendar version
    // and the %X stays there for d3 to handle with time parts
    'c': {'0': 'D M d %X yyyy', '-': 'D M d %X yyyy'},
    'x': {'0': 'mm/dd/yyyy', '-': 'mm/dd/yyyy'}
};

function worldCalFmt(fmt, x, calendar) {
    var dateJD = Math.floor((x + 0.05) / ONEDAY) + EPOCHJD;
    var cDate = getCal(calendar).fromJD(dateJD);
    var i = 0;
    var modifier, directive, directiveLen, directiveObj, replacementPart;

    while((i = fmt.indexOf('%', i)) !== -1) {
        modifier = fmt.charAt(i + 1);
        if(modifier === '0' || modifier === '-' || modifier === '_') {
            directiveLen = 3;
            directive = fmt.charAt(i + 2);
            if(modifier === '_') modifier = '-';
        } else {
            directive = modifier;
            modifier = '0';
            directiveLen = 2;
        }
        directiveObj = d3ToWorldCalendars[directive];
        if(!directiveObj) {
            i += directiveLen;
        } else {
            // code is recognized as a date part but world-calendars doesn't support it
            if(directiveObj === UNKNOWN) replacementPart = UNKNOWN;

            // format the cDate according to the translated directive
            else replacementPart = cDate.formatDate(directiveObj[modifier]);

            fmt = fmt.substr(0, i) + replacementPart + fmt.substr(i + directiveLen);
            i += replacementPart.length;
        }
    }
    return fmt;
}

// cache world calendars, so we don't have to reinstantiate
// during each date-time conversion
var allCals = {};
function getCal(calendar) {
    var calendarObj = allCals[calendar];
    if(calendarObj) return calendarObj;

    calendarObj = allCals[calendar] = calendars.instance(calendar);
    return calendarObj;
}

function makeAttrs(description) {
    return Lib.extendFlat({}, attributes, { description: description });
}

function makeTraceAttrsDescription(coord) {
    return 'Sets the calendar system to use with `' + coord + '` date data.';
}

var xAttrs = {
    xcalendar: makeAttrs(makeTraceAttrsDescription('x'))
};

var xyAttrs = Lib.extendFlat({}, xAttrs, {
    ycalendar: makeAttrs(makeTraceAttrsDescription('y'))
});

var xyzAttrs = Lib.extendFlat({}, xyAttrs, {
    zcalendar: makeAttrs(makeTraceAttrsDescription('z'))
});

var axisAttrs = makeAttrs([
    'Sets the calendar system to use for `range` and `tick0`',
    'if this is a date axis. This does not set the calendar for',
    'interpreting data on this axis, that\'s specified in the trace',
    'or via the global `layout.calendar`'
].join(' '));

module.exports = {
    moduleType: 'component',
    name: 'calendars',

    schema: {
        traces: {
            scatter: xyAttrs,
            bar: xyAttrs,
            box: xyAttrs,
            heatmap: xyAttrs,
            contour: xyAttrs,
            histogram: xyAttrs,
            histogram2d: xyAttrs,
            histogram2dcontour: xyAttrs,
            scatter3d: xyzAttrs,
            surface: xyzAttrs,
            mesh3d: xyzAttrs,
            scattergl: xyAttrs,
            ohlc: xAttrs,
            candlestick: xAttrs
        },
        layout: {
            calendar: makeAttrs([
                'Sets the default calendar system to use for interpreting and',
                'displaying dates throughout the plot.'
            ].join(' '))
        },
        subplots: {
            xaxis: {calendar: axisAttrs},
            yaxis: {calendar: axisAttrs},
            scene: {
                xaxis: {calendar: axisAttrs},
                // TODO: it's actually redundant to include yaxis and zaxis here
                // because in the scene attributes these are the same object so merging
                // into one merges into them all. However, I left them in for parity with
                // cartesian, where yaxis is unused until we Plotschema.get() when we
                // use its presence or absence to determine whether to delete attributes
                // from yaxis if they only apply to x (rangeselector/rangeslider)
                yaxis: {calendar: axisAttrs},
                zaxis: {calendar: axisAttrs}
            },
            polar: {
                radialaxis: {calendar: axisAttrs}
            }
        },
        transforms: {
            filter: {
                valuecalendar: makeAttrs([
                    'Sets the calendar system to use for `value`, if it is a date.'
                ].join(' ')),
                targetcalendar: makeAttrs([
                    'Sets the calendar system to use for `target`, if it is an',
                    'array of dates. If `target` is a string (eg *x*) we use the',
                    'corresponding trace attribute (eg `xcalendar`) if it exists,',
                    'even if `targetcalendar` is provided.'
                ].join(' '))
            }
        }
    },

    layoutAttributes: attributes,

    handleDefaults: handleDefaults,
    handleTraceDefaults: handleTraceDefaults,

    CANONICAL_SUNDAY: CANONICAL_SUNDAY,
    CANONICAL_TICK: CANONICAL_TICK,
    DFLTRANGE: DFLTRANGE,

    getCal: getCal,
    worldCalFmt: worldCalFmt
};


/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/chinese.js":
/*!****************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/chinese.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Traditional Chinese calendar for jQuery v2.0.2.
   Written by Nicolas Riesco (enquiries@nicolasriesco.net) December 2016.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


var gregorianCalendar = main.instance();

/** Implementation of the traditional Chinese calendar.
    Source of calendar tables https://github.com/isee15/Lunar-Solar-Calendar-Converter .
    @class ChineseCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function ChineseCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

ChineseCalendar.prototype = new main.baseCalendar;

assign(ChineseCalendar.prototype, {
    /** The calendar name.
        @memberof ChineseCalendar */
    name: 'Chinese',
     /** Julian date of start of Gregorian epoch: 1 January 0001 CE.
        @memberof GregorianCalendar */
    jdEpoch: 1721425.5,
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof ChineseCalendar */
    hasYearZero: false,
    /** The minimum month number.
        This calendar uses month indices to account for intercalary months. 
        @memberof ChineseCalendar */
    minMonth: 0,
    /** The first month in the year.
        This calendar uses month indices to account for intercalary months. 
        @memberof ChineseCalendar */
    firstMonth: 0,
    /** The minimum day number.
        @memberof ChineseCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof ChineseCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Chinese',
            epochs: ['BEC', 'EC'],
            monthNumbers: function(date, padded) {
                if (typeof date === 'string') {
                    var match = date.match(MONTH_NUMBER_REGEXP);
                    return (match) ? match[0] : '';
                }

                var year = this._validateYear(date);
                var monthIndex = date.month();

                var month = '' + this.toChineseMonth(year, monthIndex);

                if (padded && month.length < 2) {
                    month = "0" + month;
                }

                if (this.isIntercalaryMonth(year, monthIndex)) {
                    month += 'i';
                }

                return month;
            },
            monthNames: function(date) {
                if (typeof date === 'string') {
                    var match = date.match(MONTH_NAME_REGEXP);
                    return (match) ? match[0] : '';
                }

                var year = this._validateYear(date);
                var monthIndex = date.month();

                var month = this.toChineseMonth(year, monthIndex);

                var monthName = ['一月','二月','三月','四月','五月','六月',
                    '七月','八月','九月','十月','十一月','十二月'][month - 1];

                if (this.isIntercalaryMonth(year, monthIndex)) {
                    monthName = '闰' + monthName;
                }

                return monthName;
            },
            monthNamesShort: function(date) {
                if (typeof date === 'string') {
                    var match = date.match(MONTH_SHORT_NAME_REGEXP);
                    return (match) ? match[0] : '';
                }

                var year = this._validateYear(date);
                var monthIndex = date.month();

                var month = this.toChineseMonth(year, monthIndex);

                var monthName = ['一','二','三','四','五','六',
                    '七','八','九','十','十一','十二'][month - 1];

                if (this.isIntercalaryMonth(year, monthIndex)) {
                    monthName = '闰' + monthName;
                }

                return monthName;
            },
            parseMonth: function(year, monthString) {
                year = this._validateYear(year);
                var month = parseInt(monthString);
                var isIntercalary;

                if (!isNaN(month)) {
                    var i = monthString[monthString.length - 1];
                    isIntercalary = (i === 'i' || i === 'I');
                } else {
                    if (monthString[0] === '闰') {
                        isIntercalary = true;
                        monthString = monthString.substring(1);
                    }
                    if (monthString[monthString.length - 1] === '月') {
                        monthString = monthString.substring(0, monthString.length - 1);
                    }
                    month = 1 +
                        ['一','二','三','四','五','六',
                        '七','八','九','十','十一','十二'].indexOf(monthString);
                }

                var monthIndex = this.toMonthIndex(year, month, isIntercalary);
                return monthIndex;
            },
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            digits: null,
            dateFormat: 'yyyy/mm/dd',
            firstDay: 1,
            isRTL: false
        }
    },

    /** Check that a candidate date is from the same calendar and is valid.
        @memberof BaseCalendar
        @private
        @param year {CDate|number} The date or the year to validate.
        @param error {string} Error message if invalid.
        @return {number} The year.
        @throws Error if year out of range. */
    _validateYear: function(year, error) {
        if (year.year) {
            year = year.year();
        }

        if (typeof year !== 'number' || year < 1888 || year > 2111) {
            throw error.replace(/\{0\}/, this.local.name);
        }

        return year;
    },

    /** Retrieve the month index (i.e. accounting for intercalary months).
        @memberof ChineseCalendar
        @param year {number} The year.
        @param month {number} The month (1 for first month).
        @param [isIntercalary=false] {boolean} If month is intercalary.
        @return {number} The month index (0 for first month).
        @throws Error if an invalid month/year or a different calendar used. */
    toMonthIndex: function(year, month, isIntercalary) {
        // compute intercalary month in the year (0 if none)
        var intercalaryMonth = this.intercalaryMonth(year);

        // validate month
        var invalidIntercalaryMonth = 
            (isIntercalary && month !== intercalaryMonth);
        if (invalidIntercalaryMonth || month < 1 || month > 12) {
            throw main.local.invalidMonth
                .replace(/\{0\}/, this.local.name);
        }

        // compute month index
        var monthIndex;

        if (!intercalaryMonth) {
            monthIndex = month - 1;
        } else if(!isIntercalary && month <= intercalaryMonth) {
            monthIndex = month - 1;
        } else {
            monthIndex = month;
        }

        return monthIndex;
    },

    /** Retrieve the month (i.e. accounting for intercalary months).
        @memberof ChineseCalendar
        @param year {CDate|number} The date or the year to examine.
        @param monthIndex {number} The month index (0 for first month).
        @return {number} The month (1 for first month).
        @throws Error if an invalid month/year or a different calendar used. */
    toChineseMonth: function(year, monthIndex) {
        if (year.year) {
            year = year.year();
            monthIndex = year.month();
        }

        // compute intercalary month in the year (0 if none)
        var intercalaryMonth = this.intercalaryMonth(year);

        // validate month
        var maxMonthIndex = (intercalaryMonth) ? 12 : 11;
        if (monthIndex < 0 || monthIndex > maxMonthIndex) {
            throw main.local.invalidMonth
                .replace(/\{0\}/, this.local.name);
        }

        // compute Chinese month
        var month;

        if (!intercalaryMonth) {
            month = monthIndex + 1;
        } else if(monthIndex < intercalaryMonth) {
            month = monthIndex + 1;
        } else {
            month = monthIndex;
        }

        return month;
    },

    /** Determine the intercalary month of a year (if any).
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The intercalary month number, or 0 if none.
        @throws Error if an invalid year or a different calendar used. */
    intercalaryMonth: function(year) {
        year = this._validateYear(year);

        var monthDaysTable = LUNAR_MONTH_DAYS[year - LUNAR_MONTH_DAYS[0]];
        var intercalaryMonth = monthDaysTable >> 13;

        return intercalaryMonth;
    },

    /** Determine whether this date is an intercalary month.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [monthIndex] {number} The month index to examine.
        @return {boolean} <code>true</code> if this is an intercalary month, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    isIntercalaryMonth: function(year, monthIndex) {
        if (year.year) {
            year = year.year();
            monthIndex = year.month();
        }

        var intercalaryMonth = this.intercalaryMonth(year);

        return !!intercalaryMonth && intercalaryMonth === monthIndex;
    },

    /** Determine whether this date is in a leap year.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        return (this.intercalaryMonth(year) !== 0);
    },

    /** Determine the week of the year for a date - ISO 8601.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [monthIndex] {number} The month index to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, monthIndex, day) {
        // compute Chinese new year
        var validatedYear =
            this._validateYear(year, main.local.invalidyear);
        var packedDate =
            CHINESE_NEW_YEAR[validatedYear - CHINESE_NEW_YEAR[0]];

        var y = (packedDate >> 9) & 0xFFF;
        var m = (packedDate >> 5) & 0x0F;
        var d = packedDate & 0x1F;
        
        // find first Thrusday of the year
        var firstThursday;
        firstThursday = gregorianCalendar.newDate(y, m, d);
        firstThursday.add(4 - (firstThursday.dayOfWeek() || 7), 'd');

        // compute days from first Thursday
        var offset =
            this.toJD(year, monthIndex, day) - firstThursday.toJD();
        return 1 + Math.floor(offset / 7);
    },

    /** Retrieve the number of months in a year.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        return (this.leapYear(year)) ? 13 : 12;
    },

    /** Retrieve the number of days in a month.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [monthIndex] {number} The month index.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, monthIndex) {
        if (year.year) {
            monthIndex = year.month();
            year = year.year();
        }

        year = this._validateYear(year);

        var monthDaysTable = LUNAR_MONTH_DAYS[year - LUNAR_MONTH_DAYS[0]];

        var intercalaryMonth = monthDaysTable >> 13;
        var maxMonthIndex = (intercalaryMonth) ? 12 : 11;
        if (monthIndex > maxMonthIndex) {
            throw main.local.invalidMonth
                .replace(/\{0\}/, this.local.name);
        }

        var daysInMonth = (monthDaysTable & (1 << (12 - monthIndex))) ?
            30 : 29;

        return daysInMonth;
    },

    /** Determine whether this date is a week day.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [monthIndex] {number} The month index to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, monthIndex, day) {
        return (this.dayOfWeek(year, monthIndex, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof ChineseCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [monthIndex] {number} The month index to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, monthIndex, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = this._validateYear(date.year());
        monthIndex = date.month();
        day = date.day();

        var isIntercalary = this.isIntercalaryMonth(year, monthIndex);
        var month = this.toChineseMonth(year, monthIndex);

        var solar = toSolar(year, month, day, isIntercalary);

        return gregorianCalendar.toJD(solar.year, solar.month, solar.day);
    },

    /** Create a new date from a Julian date.
        @memberof ChineseCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        var date = gregorianCalendar.fromJD(jd);
        var lunar = toLunar(date.year(), date.month(), date.day());
        var monthIndex = this.toMonthIndex(
            lunar.year, lunar.month, lunar.isIntercalary);
        return this.newDate(lunar.year, monthIndex, lunar.day);
    },

    /** Create a new date from a string.
        @memberof ChineseCalendar
        @param dateString {string} String representing a Chinese date
        @return {CDate} The new date.
        @throws Error if an invalid date. */
    fromString: function(dateString) {
        var match = dateString.match(DATE_REGEXP);

        var year = this._validateYear(+match[1]);

        var month = +match[2];
        var isIntercalary = !!match[3];
        var monthIndex = this.toMonthIndex(year, month, isIntercalary);

        var day = +match[4];

        return this.newDate(year, monthIndex, day);
    },

    /** Add period(s) to a date.
        Cater for no year zero.
        @memberof ChineseCalendar
        @param date {CDate} The starting date.
        @param offset {number} The number of periods to adjust by.
        @param period {string} One of 'y' for year, 'm' for month, 'w' for week, 'd' for day.
        @return {CDate} The updated date.
        @throws Error if a different calendar used. */
    add: function(date, offset, period) {
        var year = date.year();
        var monthIndex = date.month();
        var isIntercalary = this.isIntercalaryMonth(year, monthIndex);
        var month = this.toChineseMonth(year, monthIndex);

        var cdate = Object.getPrototypeOf(ChineseCalendar.prototype)
            .add.call(this, date, offset, period);

        if (period === 'y') {
            // Resync month
            var resultYear = cdate.year();
            var resultMonthIndex = cdate.month();

            // Using the fact the month index of an intercalary month
            // equals its month number:
            var resultCanBeIntercalaryMonth =
                this.isIntercalaryMonth(resultYear, month);

            var correctedMonthIndex =
                (isIntercalary && resultCanBeIntercalaryMonth) ?
                this.toMonthIndex(resultYear, month, true) :
                this.toMonthIndex(resultYear, month, false);

            if (correctedMonthIndex !== resultMonthIndex) {
                cdate.month(correctedMonthIndex);
            }
        }

        return cdate;
    },
});

// Used by ChineseCalendar.prototype.fromString
var DATE_REGEXP = /^\s*(-?\d\d\d\d|\d\d)[-/](\d?\d)([iI]?)[-/](\d?\d)/m;
var MONTH_NUMBER_REGEXP = /^\d?\d[iI]?/m;
var MONTH_NAME_REGEXP = /^闰?十?[一二三四五六七八九]?月/m;
var MONTH_SHORT_NAME_REGEXP = /^闰?十?[一二三四五六七八九]?/m;

// Chinese calendar implementation
main.calendars.chinese = ChineseCalendar;

// Chinese calendar tables from year 1888 to 2111
//
// Source:
// https://github.com/isee15/Lunar-Solar-Calendar-Converter.git

// Table of intercalary months and days per month from year 1888 to 2111
//
// bit (12 - i):        days in the i^th month
//                      (= 0 if i^th lunar month has 29 days)
//                      (= 1 if i^th lunar month has 30 days)
//                      (first month in lunar year is i = 0)
// bits (13,14,15,16):  intercalary month
//                      (= 0 if lunar year has no intercalary month)
var LUNAR_MONTH_DAYS = [1887, 0x1694, 0x16aa, 0x4ad5,
    0xab6, 0xc4b7, 0x4ae, 0xa56, 0xb52a, 0x1d2a, 0xd54, 0x75aa, 0x156a,
    0x1096d, 0x95c, 0x14ae, 0xaa4d, 0x1a4c, 0x1b2a, 0x8d55, 0xad4,
    0x135a, 0x495d, 0x95c, 0xd49b, 0x149a, 0x1a4a, 0xbaa5, 0x16a8,
    0x1ad4, 0x52da, 0x12b6, 0xe937, 0x92e, 0x1496, 0xb64b, 0xd4a,
    0xda8, 0x95b5, 0x56c, 0x12ae, 0x492f, 0x92e, 0xcc96, 0x1a94,
    0x1d4a, 0xada9, 0xb5a, 0x56c, 0x726e, 0x125c, 0xf92d, 0x192a,
    0x1a94, 0xdb4a, 0x16aa, 0xad4, 0x955b, 0x4ba, 0x125a, 0x592b,
    0x152a, 0xf695, 0xd94, 0x16aa, 0xaab5, 0x9b4, 0x14b6, 0x6a57,
    0xa56, 0x1152a, 0x1d2a, 0xd54, 0xd5aa, 0x156a, 0x96c, 0x94ae,
    0x14ae, 0xa4c, 0x7d26, 0x1b2a, 0xeb55, 0xad4, 0x12da, 0xa95d,
    0x95a, 0x149a, 0x9a4d, 0x1a4a, 0x11aa5, 0x16a8, 0x16d4, 0xd2da,
    0x12b6, 0x936, 0x9497, 0x1496, 0x1564b, 0xd4a, 0xda8, 0xd5b4,
    0x156c, 0x12ae, 0xa92f, 0x92e, 0xc96, 0x6d4a, 0x1d4a, 0x10d65,
    0xb58, 0x156c, 0xb26d, 0x125c, 0x192c, 0x9a95, 0x1a94, 0x1b4a,
    0x4b55, 0xad4, 0xf55b, 0x4ba, 0x125a, 0xb92b, 0x152a, 0x1694,
    0x96aa, 0x15aa, 0x12ab5, 0x974, 0x14b6, 0xca57, 0xa56, 0x1526,
    0x8e95, 0xd54, 0x15aa, 0x49b5, 0x96c, 0xd4ae, 0x149c, 0x1a4c,
    0xbd26, 0x1aa6, 0xb54, 0x6d6a, 0x12da, 0x1695d, 0x95a, 0x149a,
    0xda4b, 0x1a4a, 0x1aa4, 0xbb54, 0x16b4, 0xada, 0x495b, 0x936,
    0xf497, 0x1496, 0x154a, 0xb6a5, 0xda4, 0x15b4, 0x6ab6, 0x126e,
    0x1092f, 0x92e, 0xc96, 0xcd4a, 0x1d4a, 0xd64, 0x956c, 0x155c,
    0x125c, 0x792e, 0x192c, 0xfa95, 0x1a94, 0x1b4a, 0xab55, 0xad4,
    0x14da, 0x8a5d, 0xa5a, 0x1152b, 0x152a, 0x1694, 0xd6aa, 0x15aa,
    0xab4, 0x94ba, 0x14b6, 0xa56, 0x7527, 0xd26, 0xee53, 0xd54, 0x15aa,
    0xa9b5, 0x96c, 0x14ae, 0x8a4e, 0x1a4c, 0x11d26, 0x1aa4, 0x1b54,
    0xcd6a, 0xada, 0x95c, 0x949d, 0x149a, 0x1a2a, 0x5b25, 0x1aa4,
    0xfb52, 0x16b4, 0xaba, 0xa95b, 0x936, 0x1496, 0x9a4b, 0x154a,
    0x136a5, 0xda4, 0x15ac];

// Table of Chinese New Years from year 1888 to 2111
// 
// bits (0 to 4):   solar day
// bits (5 to 8):   solar month
// bits (9 to 20):  solar year
var CHINESE_NEW_YEAR = [1887, 0xec04c, 0xec23f, 0xec435, 0xec649,
    0xec83e, 0xeca51, 0xecc46, 0xece3a, 0xed04d, 0xed242, 0xed436,
    0xed64a, 0xed83f, 0xeda53, 0xedc48, 0xede3d, 0xee050, 0xee244,
    0xee439, 0xee64d, 0xee842, 0xeea36, 0xeec4a, 0xeee3e, 0xef052,
    0xef246, 0xef43a, 0xef64e, 0xef843, 0xefa37, 0xefc4b, 0xefe41,
    0xf0054, 0xf0248, 0xf043c, 0xf0650, 0xf0845, 0xf0a38, 0xf0c4d,
    0xf0e42, 0xf1037, 0xf124a, 0xf143e, 0xf1651, 0xf1846, 0xf1a3a,
    0xf1c4e, 0xf1e44, 0xf2038, 0xf224b, 0xf243f, 0xf2653, 0xf2848,
    0xf2a3b, 0xf2c4f, 0xf2e45, 0xf3039, 0xf324d, 0xf3442, 0xf3636,
    0xf384a, 0xf3a3d, 0xf3c51, 0xf3e46, 0xf403b, 0xf424e, 0xf4443,
    0xf4638, 0xf484c, 0xf4a3f, 0xf4c52, 0xf4e48, 0xf503c, 0xf524f,
    0xf5445, 0xf5639, 0xf584d, 0xf5a42, 0xf5c35, 0xf5e49, 0xf603e,
    0xf6251, 0xf6446, 0xf663b, 0xf684f, 0xf6a43, 0xf6c37, 0xf6e4b,
    0xf703f, 0xf7252, 0xf7447, 0xf763c, 0xf7850, 0xf7a45, 0xf7c39,
    0xf7e4d, 0xf8042, 0xf8254, 0xf8449, 0xf863d, 0xf8851, 0xf8a46,
    0xf8c3b, 0xf8e4f, 0xf9044, 0xf9237, 0xf944a, 0xf963f, 0xf9853,
    0xf9a47, 0xf9c3c, 0xf9e50, 0xfa045, 0xfa238, 0xfa44c, 0xfa641,
    0xfa836, 0xfaa49, 0xfac3d, 0xfae52, 0xfb047, 0xfb23a, 0xfb44e,
    0xfb643, 0xfb837, 0xfba4a, 0xfbc3f, 0xfbe53, 0xfc048, 0xfc23c,
    0xfc450, 0xfc645, 0xfc839, 0xfca4c, 0xfcc41, 0xfce36, 0xfd04a,
    0xfd23d, 0xfd451, 0xfd646, 0xfd83a, 0xfda4d, 0xfdc43, 0xfde37,
    0xfe04b, 0xfe23f, 0xfe453, 0xfe648, 0xfe83c, 0xfea4f, 0xfec44,
    0xfee38, 0xff04c, 0xff241, 0xff436, 0xff64a, 0xff83e, 0xffa51,
    0xffc46, 0xffe3a, 0x10004e, 0x100242, 0x100437, 0x10064b, 0x100841,
    0x100a53, 0x100c48, 0x100e3c, 0x10104f, 0x101244, 0x101438,
    0x10164c, 0x101842, 0x101a35, 0x101c49, 0x101e3d, 0x102051,
    0x102245, 0x10243a, 0x10264e, 0x102843, 0x102a37, 0x102c4b,
    0x102e3f, 0x103053, 0x103247, 0x10343b, 0x10364f, 0x103845,
    0x103a38, 0x103c4c, 0x103e42, 0x104036, 0x104249, 0x10443d,
    0x104651, 0x104846, 0x104a3a, 0x104c4e, 0x104e43, 0x105038,
    0x10524a, 0x10543e, 0x105652, 0x105847, 0x105a3b, 0x105c4f,
    0x105e45, 0x106039, 0x10624c, 0x106441, 0x106635, 0x106849,
    0x106a3d, 0x106c51, 0x106e47, 0x10703c, 0x10724f, 0x107444,
    0x107638, 0x10784c, 0x107a3f, 0x107c53, 0x107e48];

function toLunar(yearOrDate, monthOrResult, day, result) {
    var solarDate;
    var lunarDate;

    if(typeof yearOrDate === 'object') {
        solarDate = yearOrDate;
        lunarDate = monthOrResult || {};

    } else {
        var isValidYear = (typeof yearOrDate === 'number') &&
            (yearOrDate >= 1888) && (yearOrDate <= 2111);
        if(!isValidYear)
            throw new Error("Solar year outside range 1888-2111");

        var isValidMonth = (typeof monthOrResult === 'number') &&
            (monthOrResult >= 1) && (monthOrResult <= 12);
        if(!isValidMonth)
            throw new Error("Solar month outside range 1 - 12");

        var isValidDay = (typeof day === 'number') && (day >= 1) && (day <= 31);
        if(!isValidDay)
            throw new Error("Solar day outside range 1 - 31");

        solarDate = {
            year: yearOrDate,
            month: monthOrResult,
            day: day,
        };
        lunarDate = result || {};
    }

    // Compute Chinese new year and lunar year
    var chineseNewYearPackedDate =
        CHINESE_NEW_YEAR[solarDate.year - CHINESE_NEW_YEAR[0]];

    var packedDate = (solarDate.year << 9) | (solarDate.month << 5)
        | solarDate.day;

    lunarDate.year = (packedDate >= chineseNewYearPackedDate) ?
        solarDate.year :
        solarDate.year - 1;

    chineseNewYearPackedDate =
        CHINESE_NEW_YEAR[lunarDate.year - CHINESE_NEW_YEAR[0]];

    var y = (chineseNewYearPackedDate >> 9) & 0xFFF;
    var m = (chineseNewYearPackedDate >> 5) & 0x0F;
    var d = chineseNewYearPackedDate & 0x1F;

    // Compute days from new year
    var daysFromNewYear;

    var chineseNewYearJSDate = new Date(y, m -1, d);
    var jsDate = new Date(solarDate.year, solarDate.month - 1, solarDate.day);

    daysFromNewYear = Math.round(
        (jsDate - chineseNewYearJSDate) / (24 * 3600 * 1000));

    // Compute lunar month and day
    var monthDaysTable = LUNAR_MONTH_DAYS[lunarDate.year - LUNAR_MONTH_DAYS[0]];

    var i;
    for(i = 0; i < 13; i++) {
        var daysInMonth = (monthDaysTable & (1 << (12 - i))) ? 30 : 29;

        if (daysFromNewYear < daysInMonth) {
            break;
        }

        daysFromNewYear -= daysInMonth;
    }

    var intercalaryMonth = monthDaysTable >> 13;
    if (!intercalaryMonth || i < intercalaryMonth) {
        lunarDate.isIntercalary = false;
        lunarDate.month = 1 + i;
    } else if (i === intercalaryMonth) {
        lunarDate.isIntercalary = true;
        lunarDate.month = i;
    } else {
        lunarDate.isIntercalary = false;
        lunarDate.month = i;
    }

    lunarDate.day = 1 + daysFromNewYear;

    return lunarDate;
}

function toSolar(yearOrDate, monthOrResult, day, isIntercalaryOrResult, result) {
    var solarDate;
    var lunarDate;

    if(typeof yearOrDate === 'object') {
        lunarDate = yearOrDate;
        solarDate = monthOrResult || {};

    } else {
        var isValidYear = (typeof yearOrDate === 'number') &&
            (yearOrDate >= 1888) && (yearOrDate <= 2111);
        if(!isValidYear)
            throw new Error("Lunar year outside range 1888-2111");

        var isValidMonth = (typeof monthOrResult === 'number') &&
            (monthOrResult >= 1) && (monthOrResult <= 12);
        if(!isValidMonth)
            throw new Error("Lunar month outside range 1 - 12");

        var isValidDay = (typeof day === 'number') && (day >= 1) && (day <= 30);
        if(!isValidDay)
            throw new Error("Lunar day outside range 1 - 30");

        var isIntercalary;
        if(typeof isIntercalaryOrResult === 'object') {
            isIntercalary = false;
            solarDate = isIntercalaryOrResult;
        } else {
            isIntercalary = !!isIntercalaryOrResult;
            solarDate = result || {};
        }

        lunarDate = {
            year: yearOrDate,
            month: monthOrResult,
            day: day,
            isIntercalary: isIntercalary,
        };
    }

    // Compute days from new year
    var daysFromNewYear;

    daysFromNewYear = lunarDate.day - 1;

    var monthDaysTable = LUNAR_MONTH_DAYS[lunarDate.year - LUNAR_MONTH_DAYS[0]];
    var intercalaryMonth = monthDaysTable >> 13;

    var monthsFromNewYear;
    if (!intercalaryMonth) {
        monthsFromNewYear = lunarDate.month - 1;
    } else if (lunarDate.month > intercalaryMonth) {
        monthsFromNewYear = lunarDate.month;
    } else if (lunarDate.isIntercalary) {
        monthsFromNewYear = lunarDate.month;
    } else {
        monthsFromNewYear = lunarDate.month - 1;
    }

    for(var i = 0; i < monthsFromNewYear; i++) {
        var daysInMonth = (monthDaysTable & (1 << (12 - i))) ? 30 : 29;
        daysFromNewYear += daysInMonth;
    }

    // Compute Chinese new year
    var packedDate = CHINESE_NEW_YEAR[lunarDate.year - CHINESE_NEW_YEAR[0]];

    var y = (packedDate >> 9) & 0xFFF;
    var m = (packedDate >> 5) & 0x0F;
    var d = packedDate & 0x1F;

    // Compute solar date
    var jsDate = new Date(y, m - 1, d + daysFromNewYear);

    solarDate.year = jsDate.getFullYear();
    solarDate.month = 1 + jsDate.getMonth();
    solarDate.day = jsDate.getDate();

    return solarDate;
}



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/coptic.js":
/*!***************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/coptic.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Coptic calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) February 2010.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Coptic calendar.
    See <a href="http://en.wikipedia.org/wiki/Coptic_calendar">http://en.wikipedia.org/wiki/Coptic_calendar</a>.
    See also Calendrical Calculations: The Millennium Edition
    (<a href="http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml">http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml</a>).
    @class CopticCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function CopticCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

CopticCalendar.prototype = new main.baseCalendar;

assign(CopticCalendar.prototype, {
    /** The calendar name.
        @memberof CopticCalendar */
    name: 'Coptic',
    /** Julian date of start of Coptic epoch: 29 August 284 CE (Gregorian).
        @memberof CopticCalendar */
    jdEpoch: 1825029.5,
    /** Days per month in a common year.
        @memberof CopticCalendar */
    daysPerMonth: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof CopticCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof CopticCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof CopticCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof CopticCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof CopticCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Coptic',
            epochs: ['BAM', 'AM'],
            monthNames: ['Thout', 'Paopi', 'Hathor', 'Koiak', 'Tobi', 'Meshir',
            'Paremhat', 'Paremoude', 'Pashons', 'Paoni', 'Epip', 'Mesori', 'Pi Kogi Enavot'],
            monthNamesShort: ['Tho', 'Pao', 'Hath', 'Koi', 'Tob', 'Mesh',
            'Pat', 'Pad', 'Pash', 'Pao', 'Epi', 'Meso', 'PiK'],
            dayNames: ['Tkyriaka', 'Pesnau', 'Pshoment', 'Peftoou', 'Ptiou', 'Psoou', 'Psabbaton'],
            dayNamesShort: ['Tky', 'Pes', 'Psh', 'Pef', 'Pti', 'Pso', 'Psa'],
            dayNamesMin: ['Tk', 'Pes', 'Psh', 'Pef', 'Pt', 'Pso', 'Psa'],
            digits: null,
            dateFormat: 'dd/mm/yyyy',
            firstDay: 0,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof CopticCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
        return year % 4 === 3 || year % 4 === -1;
    },

    /** Retrieve the number of months in a year.
        @memberof CopticCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay,
            main.local.invalidYear || main.regionalOptions[''].invalidYear);
        return 13;
    },

    /** Determine the week of the year for a date.
        @memberof CopticCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number) the month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof CopticCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 13 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof CopticCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param month {number} The month to examine.
        @param day {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof CopticCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number) the month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year();
        if (year < 0) { year++; } // No year zero
        return date.day() + (date.month() - 1) * 30 +
            (year - 1) * 365 + Math.floor(year / 4) + this.jdEpoch - 1;
    },

    /** Create a new date from a Julian date.
        @memberof CopticCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        var c = Math.floor(jd) + 0.5 - this.jdEpoch;
        var year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
        if (year <= 0) { year--; } // No year zero
        c = Math.floor(jd) + 0.5 - this.newDate(year, 1, 1).toJD();
        var month = Math.floor(c / 30) + 1;
        var day = c - (month - 1) * 30 + 1;
        return this.newDate(year, month, day);
    }
});

// Coptic calendar implementation
main.calendars.coptic = CopticCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/discworld.js":
/*!******************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/discworld.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Discworld calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2016.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Discworld calendar - Unseen University version.
    See also <a href="http://wiki.lspace.org/mediawiki/Discworld_calendar">http://wiki.lspace.org/mediawiki/Discworld_calendar</a>
    and <a href="http://discworld.wikia.com/wiki/Discworld_calendar">http://discworld.wikia.com/wiki/Discworld_calendar</a>.
    @class DiscworldCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function DiscworldCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

DiscworldCalendar.prototype = new main.baseCalendar;

assign(DiscworldCalendar.prototype, {
    /** The calendar name.
        @memberof DiscworldCalendar */
    name: 'Discworld',
    /** Julian date of start of Discworld epoch: 1 January 0001 CE.
        @memberof DiscworldCalendar */
    jdEpoch: 1721425.5,
    /** Days per month in a common year.
        @memberof DiscworldCalendar */
    daysPerMonth: [16, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof DiscworldCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof DiscworldCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof DiscworldCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof DiscworldCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof DiscworldCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Discworld',
            epochs: ['BUC', 'UC'],
            monthNames: ['Ick', 'Offle', 'February', 'March', 'April', 'May', 'June',
            'Grune', 'August', 'Spune', 'Sektober', 'Ember', 'December'],
            monthNamesShort: ['Ick', 'Off', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Gru', 'Aug', 'Spu', 'Sek', 'Emb', 'Dec'],
            dayNames: ['Sunday', 'Octeday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Oct', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Oc', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            digits: null,
            dateFormat: 'yyyy/mm/dd',
            firstDay: 2,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return false;
    },

    /** Retrieve the number of months in a year.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return 13;
    },

    /** Retrieve the number of days in a year.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return 400;
    },

    /** Determine the week of the year for a date.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 8) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1];
    },

    /** Retrieve the number of days in a week.
        @memberof DiscworldCalendar
        @return {number} The number of days. */
    daysInWeek: function() {
        return 8;
    },

    /** Retrieve the day of the week for a date.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The day of the week: 0 to number of days - 1.
        @throws Error if an invalid date or a different calendar used. */
    dayOfWeek: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        return (date.day() + 1) % 8;
    },

    /** Determine whether this date is a week day.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        var dow = this.dayOfWeek(year, month, day);
        return (dow >= 2 && dow <= 6);
    },

    /** Retrieve additional information about a date.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {object} Additional information - contents depends on calendar.
        @throws Error if an invalid date or a different calendar used. */
    extraInfo: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        return {century: centuries[Math.floor((date.year() - 1) / 100) + 1] || ''};
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof DiscworldCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year() + (date.year() < 0 ? 1 : 0);
        month = date.month();
        day = date.day();
        return day + (month > 1 ? 16 : 0) + (month > 2 ? (month - 2) * 32 : 0) +
            (year - 1) * 400 + this.jdEpoch - 1;
    },

    /** Create a new date from a Julian date.
        @memberof DiscworldCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        jd = Math.floor(jd + 0.5) - Math.floor(this.jdEpoch) - 1;
        var year = Math.floor(jd / 400) + 1;
        jd -= (year - 1) * 400;
        jd += (jd > 15 ? 16 : 0);
        var month = Math.floor(jd / 32) + 1;
        var day = jd - (month - 1) * 32 + 1;
        return this.newDate(year <= 0 ? year - 1 : year, month, day);
    }
});

// Names of the centuries
var centuries = {
    20: 'Fruitbat',
    21: 'Anchovy'
};

// Discworld calendar implementation
main.calendars.discworld = DiscworldCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/ethiopian.js":
/*!******************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/ethiopian.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Ethiopian calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) February 2010.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Ethiopian calendar.
    See <a href="http://en.wikipedia.org/wiki/Ethiopian_calendar">http://en.wikipedia.org/wiki/Ethiopian_calendar</a>.
    See also Calendrical Calculations: The Millennium Edition
    (<a href="http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml">http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml</a>).
    @class EthiopianCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function EthiopianCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

EthiopianCalendar.prototype = new main.baseCalendar;

assign(EthiopianCalendar.prototype, {
    /** The calendar name.
        @memberof EthiopianCalendar */
    name: 'Ethiopian',
    /** Julian date of start of Ethiopian epoch: 27 August 8 CE (Gregorian).
        @memberof EthiopianCalendar */
    jdEpoch: 1724220.5,
    /** Days per month in a common year.
        @memberof EthiopianCalendar */
    daysPerMonth: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof EthiopianCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof EthiopianCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof EthiopianCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof EthiopianCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof EthiopianCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Ethiopian',
            epochs: ['BEE', 'EE'],
            monthNames: ['Meskerem', 'Tikemet', 'Hidar', 'Tahesas', 'Tir', 'Yekatit',
            'Megabit', 'Miazia', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'],
            monthNamesShort: ['Mes', 'Tik', 'Hid', 'Tah', 'Tir', 'Yek',
            'Meg', 'Mia', 'Gen', 'Sen', 'Ham', 'Neh', 'Pag'],
            dayNames: ['Ehud', 'Segno', 'Maksegno', 'Irob', 'Hamus', 'Arb', 'Kidame'],
            dayNamesShort: ['Ehu', 'Seg', 'Mak', 'Iro', 'Ham', 'Arb', 'Kid'],
            dayNamesMin: ['Eh', 'Se', 'Ma', 'Ir', 'Ha', 'Ar', 'Ki'],
            digits: null,
            dateFormat: 'dd/mm/yyyy',
            firstDay: 0,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof EthiopianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
        return year % 4 === 3 || year % 4 === -1;
    },

    /** Retrieve the number of months in a year.
        @memberof EthiopianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay,
            main.local.invalidYear || main.regionalOptions[''].invalidYear);
        return 13;
    },

    /** Determine the week of the year for a date.
        @memberof EthiopianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof EthiopianCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 13 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof EthiopianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof EthiopianCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year();
        if (year < 0) { year++; } // No year zero
        return date.day() + (date.month() - 1) * 30 +
            (year - 1) * 365 + Math.floor(year / 4) + this.jdEpoch - 1;
    },

    /** Create a new date from a Julian date.
        @memberof EthiopianCalendar
        @param jd {number} the Julian date to convert.
        @return {CDate} the equivalent date. */
    fromJD: function(jd) {
        var c = Math.floor(jd) + 0.5 - this.jdEpoch;
        var year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
        if (year <= 0) { year--; } // No year zero
        c = Math.floor(jd) + 0.5 - this.newDate(year, 1, 1).toJD();
        var month = Math.floor(c / 30) + 1;
        var day = c - (month - 1) * 30 + 1;
        return this.newDate(year, month, day);
    }
});

// Ethiopian calendar implementation
main.calendars.ethiopian = EthiopianCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/hebrew.js":
/*!***************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/hebrew.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Hebrew calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Hebrew civil calendar.
    Based on code from <a href="http://www.fourmilab.ch/documents/calendar/">http://www.fourmilab.ch/documents/calendar/</a>.
    See also <a href="http://en.wikipedia.org/wiki/Hebrew_calendar">http://en.wikipedia.org/wiki/Hebrew_calendar</a>.
    @class HebrewCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function HebrewCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

HebrewCalendar.prototype = new main.baseCalendar;

assign(HebrewCalendar.prototype, {
    /** The calendar name.
        @memberof HebrewCalendar */
    name: 'Hebrew',
    /** Julian date of start of Hebrew epoch: 7 October 3761 BCE.
        @memberof HebrewCalendar */
    jdEpoch: 347995.5,
    /** Days per month in a common year.
        @memberof HebrewCalendar */
    daysPerMonth: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 29],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof HebrewCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof HebrewCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof HebrewCalendar */
    firstMonth: 7,
    /** The minimum day number.
        @memberof HebrewCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof HebrewCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Hebrew',
            epochs: ['BAM', 'AM'],
            monthNames: ['Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
            'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar', 'Adar II'],
            monthNamesShort: ['Nis', 'Iya', 'Siv', 'Tam', 'Av', 'Elu', 'Tis', 'Che', 'Kis', 'Tev', 'She', 'Ada', 'Ad2'],
            dayNames: ['Yom Rishon', 'Yom Sheni', 'Yom Shlishi', 'Yom Revi\'i', 'Yom Chamishi', 'Yom Shishi', 'Yom Shabbat'],
            dayNamesShort: ['Ris', 'She', 'Shl', 'Rev', 'Cha', 'Shi', 'Sha'],
            dayNamesMin: ['Ri','She','Shl','Re','Ch','Shi','Sha'],
            digits: null,
            dateFormat: 'dd/mm/yyyy',
            firstDay: 0,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return this._leapYear(date.year());
    },

    /** Determine whether this date is in a leap year.
        @memberof HebrewCalendar
        @private
        @param year {number} The year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    _leapYear: function(year) {
        year = (year < 0 ? year + 1 : year);
        return mod(year * 7 + 1, 19) < 7;
    },

    /** Retrieve the number of months in a year.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return this._leapYear(year.year ? year.year() : year) ? 13 : 12;
    },

    /** Determine the week of the year for a date.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a year.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        year = date.year();
        return this.toJD((year === -1 ? +1 : year + 1), 7, 1) - this.toJD(year, 7, 1);
    },

    /** Retrieve the number of days in a month.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        if (year.year) {
            month = year.month();
            year = year.year();
        }
        this._validate(year, month, this.minDay, main.local.invalidMonth);
        return (month === 12 && this.leapYear(year) ? 30 : // Adar I
                (month === 8 && mod(this.daysInYear(year), 10) === 5 ? 30 : // Cheshvan in shlemah year
                (month === 9 && mod(this.daysInYear(year), 10) === 3 ? 29 : // Kislev in chaserah year
                this.daysPerMonth[month - 1])));
    },

    /** Determine whether this date is a week day.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return this.dayOfWeek(year, month, day) !== 6;
    },

    /** Retrieve additional information about a date - year type.
        @memberof HebrewCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {object} Additional information - contents depends on calendar.
        @throws Error if an invalid date or a different calendar used. */
    extraInfo: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        return {yearType: (this.leapYear(date) ? 'embolismic' : 'common') + ' ' +
            ['deficient', 'regular', 'complete'][this.daysInYear(date) % 10 - 3]};
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof HebrewCalendar
        @param year {CDate)|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year();
        month = date.month();
        day = date.day();
        var adjYear = (year <= 0 ? year + 1 : year);
        var jd = this.jdEpoch + this._delay1(adjYear) +
            this._delay2(adjYear) + day + 1;
        if (month < 7) {
            for (var m = 7; m <= this.monthsInYear(year); m++) {
                jd += this.daysInMonth(year, m);
            }
            for (var m = 1; m < month; m++) {
                jd += this.daysInMonth(year, m);
            }
        }
        else {
            for (var m = 7; m < month; m++) {
                jd += this.daysInMonth(year, m);
            }
        }
        return jd;
    },

    /** Test for delay of start of new year and to avoid
        Sunday, Wednesday, or Friday as start of the new year.
        @memberof HebrewCalendar
        @private
        @param year {number} The year to examine.
        @return {number} The days to offset by. */
    _delay1: function(year) {
        var months = Math.floor((235 * year - 234) / 19);
        var parts = 12084 + 13753 * months;
        var day = months * 29 + Math.floor(parts / 25920);
        if (mod(3 * (day + 1), 7) < 3) {
            day++;
        }
        return day;
    },

    /** Check for delay in start of new year due to length of adjacent years.
        @memberof HebrewCalendar
        @private
        @param year {number} The year to examine.
        @return {number} The days to offset by. */
    _delay2: function(year) {
        var last = this._delay1(year - 1);
        var present = this._delay1(year);
        var next = this._delay1(year + 1);
        return ((next - present) === 356 ? 2 : ((present - last) === 382 ? 1 : 0));
    },

    /** Create a new date from a Julian date.
        @memberof HebrewCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        jd = Math.floor(jd) + 0.5;
        var year = Math.floor(((jd - this.jdEpoch) * 98496.0) / 35975351.0) - 1;
        while (jd >= this.toJD((year === -1 ? +1 : year + 1), 7, 1)) {
            year++;
        }
        var month = (jd < this.toJD(year, 1, 1)) ? 7 : 1;
        while (jd > this.toJD(year, month, this.daysInMonth(year, month))) {
            month++;
        }
        var day = jd - this.toJD(year, month, 1) + 1;
        return this.newDate(year, month, day);
    }
});

// Modulus function which works for non-integers.
function mod(a, b) {
    return a - (b * Math.floor(a / b));
}

// Hebrew calendar implementation
main.calendars.hebrew = HebrewCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/islamic.js":
/*!****************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/islamic.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Islamic calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Islamic or '16 civil' calendar.
    Based on code from <a href="http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php">http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php</a>.
    See also <a href="http://en.wikipedia.org/wiki/Islamic_calendar">http://en.wikipedia.org/wiki/Islamic_calendar</a>.
    @class IslamicCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function IslamicCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

IslamicCalendar.prototype = new main.baseCalendar;

assign(IslamicCalendar.prototype, {
    /** The calendar name.
        @memberof IslamicCalendar */
    name: 'Islamic',
    /** Julian date of start of Islamic epoch: 16 July 622 CE.
        @memberof IslamicCalendar */
    jdEpoch: 1948439.5,
    /** Days per month in a common year.
        @memberof IslamicCalendar */
    daysPerMonth: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof IslamicCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof IslamicCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof IslamicCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof IslamicCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof IslamicCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Islamic',
            epochs: ['BH', 'AH'],
            monthNames: ['Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani', 'Jumada al-awwal', 'Jumada al-thani',
            'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
            monthNamesShort: ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'],
            dayNames: ['Yawm al-ahad', 'Yawm al-ithnayn', 'Yawm ath-thulaathaa\'',
            'Yawm al-arbi\'aa\'', 'Yawm al-khamīs', 'Yawm al-jum\'a', 'Yawm as-sabt'],
            dayNamesShort: ['Aha', 'Ith', 'Thu', 'Arb', 'Kha', 'Jum', 'Sab'],
            dayNamesMin: ['Ah','It','Th','Ar','Kh','Ju','Sa'],
            digits: null,
            dateFormat: 'yyyy/mm/dd',
            firstDay: 6,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof IslamicCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return (date.year() * 11 + 14) % 30 < 11;
    },

    /** Determine the week of the year for a date.
        @memberof IslamicCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a year.
        @memberof IslamicCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function(year) {
        return (this.leapYear(year) ? 355 : 354);
    },

    /** Retrieve the number of days in a month.
        @memberof IslamicCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 12 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof IslamicCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return this.dayOfWeek(year, month, day) !== 5;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof IslamicCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year();
        month = date.month();
        day = date.day();
        year = (year <= 0 ? year + 1 : year);
        return day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 +
            Math.floor((3 + (11 * year)) / 30) + this.jdEpoch - 1;
    },

    /** Create a new date from a Julian date.
        @memberof IslamicCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        jd = Math.floor(jd) + 0.5;
        var year = Math.floor((30 * (jd - this.jdEpoch) + 10646) / 10631);
        year = (year <= 0 ? year - 1 : year);
        var month = Math.min(12, Math.ceil((jd - 29 - this.toJD(year, 1, 1)) / 29.5) + 1);
        var day = jd - this.toJD(year, month, 1) + 1;
        return this.newDate(year, month, day);
    }
});

// Islamic (16 civil) calendar implementation
main.calendars.islamic = IslamicCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/julian.js":
/*!***************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/julian.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Julian calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Julian calendar.
    Based on code from <a href="http://www.fourmilab.ch/documents/calendar/">http://www.fourmilab.ch/documents/calendar/</a>.
    See also <a href="http://en.wikipedia.org/wiki/Julian_calendar">http://en.wikipedia.org/wiki/Julian_calendar</a>.
    @class JulianCalendar
    @augments BaseCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function JulianCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

JulianCalendar.prototype = new main.baseCalendar;

assign(JulianCalendar.prototype, {
    /** The calendar name.
        @memberof JulianCalendar */
    name: 'Julian',
    /** Julian date of start of Julian epoch: 1 January 0001 AD = 30 December 0001 BCE.
        @memberof JulianCalendar */
    jdEpoch: 1721423.5,
    /** Days per month in a common year.
        @memberof JulianCalendar */
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof JulianCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof JulianCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof JulianCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof JulianCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof JulianCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Julian',
            epochs: ['BC', 'AD'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            digits: null,
            dateFormat: 'mm/dd/yyyy',
            firstDay: 0,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof JulianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = (date.year() < 0 ? date.year() + 1 : date.year()); // No year zero
        return (year % 4) === 0;
    },

    /** Determine the week of the year for a date - ISO 8601.
        @memberof JulianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Thursday of this week starting on Monday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof JulianCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 2 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof JulianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} True if a week day, false if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof JulianCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year();
        month = date.month();
        day = date.day();
        if (year < 0) { year++; } // No year zero
        // Jean Meeus algorithm, "Astronomical Algorithms", 1991
        if (month <= 2) {
            year--;
            month += 12;
        }
        return Math.floor(365.25 * (year + 4716)) +
            Math.floor(30.6001 * (month + 1)) + day - 1524.5;
    },

    /** Create a new date from a Julian date.
        @memberof JulianCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        // Jean Meeus algorithm, "Astronomical Algorithms", 1991
        var a = Math.floor(jd + 0.5);
        var b = a + 1524;
        var c = Math.floor((b - 122.1) / 365.25);
        var d = Math.floor(365.25 * c);
        var e = Math.floor((b - d) / 30.6001);
        var month = e - Math.floor(e < 14 ? 1 : 13);
        var year = c - Math.floor(month > 2 ? 4716 : 4715);
        var day = b - d - Math.floor(30.6001 * e);
        if (year <= 0) { year--; } // No year zero
        return this.newDate(year, month, day);
    }
});

// Julian calendar implementation
main.calendars.julian = JulianCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/mayan.js":
/*!**************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/mayan.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Mayan calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Mayan Long Count calendar.
    See also <a href="http://en.wikipedia.org/wiki/Mayan_calendar">http://en.wikipedia.org/wiki/Mayan_calendar</a>.
    @class MayanCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function MayanCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

MayanCalendar.prototype = new main.baseCalendar;

assign(MayanCalendar.prototype, {
    /** The calendar name.
        @memberof MayanCalendar */
    name: 'Mayan',
    /** Julian date of start of Mayan epoch: 11 August 3114 BCE.
        @memberof MayanCalendar */
    jdEpoch: 584282.5,
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof MayanCalendar */
    hasYearZero: true,
    /** The minimum month number.
        @memberof MayanCalendar */
    minMonth: 0,
    /** The first month in the year.
        @memberof MayanCalendar */
    firstMonth: 0,
    /** The minimum day number.
        @memberof MayanCalendar */
    minDay: 0,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof MayanCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left.
        @property haabMonths {string[]} The names of the Haab months.
        @property tzolkinMonths {string[]} The names of the Tzolkin months. */
    regionalOptions: { // Localisations
        '': {
            name: 'Mayan',
            epochs: ['', ''],
            monthNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '10', '11', '12', '13', '14', '15', '16', '17'],
            monthNamesShort: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '10', '11', '12', '13', '14', '15', '16', '17'],
            dayNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
            dayNamesShort: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
            dayNamesMin: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
            digits: null,
            dateFormat: 'YYYY.m.d',
            firstDay: 0,
            isRTL: false,
            haabMonths: ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax',
            'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb'],
            tzolkinMonths: ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc',
            'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau']
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return false;
    },

    /** Format the year, if not a simple sequential number.
        @memberof MayanCalendar
        @param year {CDate|number} The date to format or the year to format.
        @return {string} The formatted year.
        @throws Error if an invalid year or a different calendar used. */
    formatYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        year = date.year();
        var baktun = Math.floor(year / 400);
        year = year % 400;
        year += (year < 0 ? 400 : 0);
        var katun = Math.floor(year / 20);
        return baktun + '.' + katun + '.' + (year % 20);
    },

    /** Convert from the formatted year back to a single number.
        @memberof MayanCalendar
        @param years {string} The year as n.n.n.
        @return {number} The sequential year.
        @throws Error if an invalid value is supplied. */
    forYear: function(years) {
        years = years.split('.');
        if (years.length < 3) {
            throw 'Invalid Mayan year';
        }
        var year = 0;
        for (var i = 0; i < years.length; i++) {
            var y = parseInt(years[i], 10);
            if (Math.abs(y) > 19 || (i > 0 && y < 0)) {
                throw 'Invalid Mayan year';
            }
            year = year * 20 + y;
        }
        return year;
    },

    /** Retrieve the number of months in a year.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return 18;
    },

    /** Determine the week of the year for a date.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        this._validate(year, month, day, main.local.invalidDate);
        return 0;
    },

    /** Retrieve the number of days in a year.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return 360;
    },

    /** Retrieve the number of days in a month.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        this._validate(year, month, this.minDay, main.local.invalidMonth);
        return 20;
    },

    /** Retrieve the number of days in a week.
        @memberof MayanCalendar
        @return {number} The number of days. */
    daysInWeek: function() {
        return 5; // Just for formatting
    },

    /** Retrieve the day of the week for a date.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The day of the week: 0 to number of days - 1.
        @throws Error if an invalid date or a different calendar used. */
    dayOfWeek: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        return date.day();
    },

    /** Determine whether this date is a week day.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        this._validate(year, month, day, main.local.invalidDate);
        return true;
    },

    /** Retrieve additional information about a date - Haab and Tzolkin equivalents.
        @memberof MayanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {object} Additional information - contents depends on calendar.
        @throws Error if an invalid date or a different calendar used. */
    extraInfo: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        var jd = date.toJD();
        var haab = this._toHaab(jd);
        var tzolkin = this._toTzolkin(jd);
        return {haabMonthName: this.local.haabMonths[haab[0] - 1],
            haabMonth: haab[0], haabDay: haab[1],
            tzolkinDayName: this.local.tzolkinMonths[tzolkin[0] - 1],
            tzolkinDay: tzolkin[0], tzolkinTrecena: tzolkin[1]};
    },

    /** Retrieve Haab date from a Julian date.
        @memberof MayanCalendar
        @private
        @param jd  {number} The Julian date.
        @return {number[]} Corresponding Haab month and day. */
    _toHaab: function(jd) {
        jd -= this.jdEpoch;
        var day = mod(jd + 8 + ((18 - 1) * 20), 365);
        return [Math.floor(day / 20) + 1, mod(day, 20)];
    },

    /** Retrieve Tzolkin date from a Julian date.
        @memberof MayanCalendar
        @private
        @param jd {number} The Julian date.
        @return {number[]} Corresponding Tzolkin day and trecena. */
    _toTzolkin: function(jd) {
        jd -= this.jdEpoch;
        return [amod(jd + 20, 20), amod(jd + 4, 13)];
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof MayanCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        return date.day() + (date.month() * 20) + (date.year() * 360) + this.jdEpoch;
    },

    /** Create a new date from a Julian date.
        @memberof MayanCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        jd = Math.floor(jd) + 0.5 - this.jdEpoch;
        var year = Math.floor(jd / 360);
        jd = jd % 360;
        jd += (jd < 0 ? 360 : 0);
        var month = Math.floor(jd / 20);
        var day = jd % 20;
        return this.newDate(year, month, day);
    }
});

// Modulus function which works for non-integers.
function mod(a, b) {
    return a - (b * Math.floor(a / b));
}

// Modulus function which returns numerator if modulus is zero.
function amod(a, b) {
    return mod(a - 1, b) + 1;
}

// Mayan calendar implementation
main.calendars.mayan = MayanCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/nanakshahi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/nanakshahi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* http://keith-wood.name/calendars.html
   Nanakshahi calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2016.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Nanakshahi calendar.
    See also <a href="https://en.wikipedia.org/wiki/Nanakshahi_calendar">https://en.wikipedia.org/wiki/Nanakshahi_calendar</a>.
    @class NanakshahiCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function NanakshahiCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

NanakshahiCalendar.prototype = new main.baseCalendar;

var gregorian = main.instance('gregorian');

assign(NanakshahiCalendar.prototype, {
    /** The calendar name.
        @memberof NanakshahiCalendar */
    name: 'Nanakshahi',
    /** Julian date of start of Nanakshahi epoch: 14 March 1469 CE.
        @memberof NanakshahiCalendar */
    jdEpoch: 2257673.5,
    /** Days per month in a common year.
        @memberof NanakshahiCalendar */
    daysPerMonth: [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof NanakshahiCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof NanakshahiCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof NanakshahiCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof NanakshahiCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof NanakshahiCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Nanakshahi',
            epochs: ['BN', 'AN'],
            monthNames: ['Chet', 'Vaisakh', 'Jeth', 'Harh', 'Sawan', 'Bhadon',
            'Assu', 'Katak', 'Maghar', 'Poh', 'Magh', 'Phagun'],
            monthNamesShort: ['Che', 'Vai', 'Jet', 'Har', 'Saw', 'Bha', 'Ass', 'Kat', 'Mgr', 'Poh', 'Mgh', 'Pha'],
            dayNames: ['Somvaar', 'Mangalvar', 'Budhvaar', 'Veervaar', 'Shukarvaar', 'Sanicharvaar', 'Etvaar'],
            dayNamesShort: ['Som', 'Mangal', 'Budh', 'Veer', 'Shukar', 'Sanichar', 'Et'],
            dayNamesMin: ['So', 'Ma', 'Bu', 'Ve', 'Sh', 'Sa', 'Et'],
            digits: null,
            dateFormat: 'dd-mm-yyyy',
            firstDay: 0,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof NanakshahiCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay,
            main.local.invalidYear || main.regionalOptions[''].invalidYear);
        return gregorian.leapYear(date.year() + (date.year() < 1 ? 1 : 0) + 1469);
    },

    /** Determine the week of the year for a date.
        @memberof NanakshahiCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Monday of this week starting on Monday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(1 - (checkDate.dayOfWeek() || 7), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof NanakshahiCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 12 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof NanakshahiCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof NanakshahiCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidMonth);
        var year = date.year();
        if (year < 0) { year++; } // No year zero
        var doy = date.day();
        for (var m = 1; m < date.month(); m++) {
            doy += this.daysPerMonth[m - 1];
        }
        return doy + gregorian.toJD(year + 1468, 3, 13);
    },

    /** Create a new date from a Julian date.
        @memberof NanakshahiCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        jd = Math.floor(jd + 0.5);
        var year = Math.floor((jd - (this.jdEpoch - 1)) / 366);
        while (jd >= this.toJD(year + 1, 1, 1)) {
            year++;
        }
        var day = jd - Math.floor(this.toJD(year, 1, 1) + 0.5) + 1;
        var month = 1;
        while (day > this.daysInMonth(year, month)) {
            day -= this.daysInMonth(year, month);
            month++;
        }
        return this.newDate(year, month, day);
    }
});

// Nanakshahi calendar implementation
main.calendars.nanakshahi = NanakshahiCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/nepali.js":
/*!***************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/nepali.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Nepali calendar for jQuery v2.0.2.
   Written by Artur Neumann (ict.projects{at}nepal.inf.org) April 2013.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Nepali civil calendar.
    Based on the ideas from 
    <a href="http://codeissue.com/articles/a04e050dea7468f/algorithm-to-convert-english-date-to-nepali-date-using-c-net">http://codeissue.com/articles/a04e050dea7468f/algorithm-to-convert-english-date-to-nepali-date-using-c-net</a>
    and <a href="http://birenj2ee.blogspot.com/2011/04/nepali-calendar-in-java.html">http://birenj2ee.blogspot.com/2011/04/nepali-calendar-in-java.html</a>
    See also <a href="http://en.wikipedia.org/wiki/Nepali_calendar">http://en.wikipedia.org/wiki/Nepali_calendar</a>
    and <a href="https://en.wikipedia.org/wiki/Bikram_Samwat">https://en.wikipedia.org/wiki/Bikram_Samwat</a>.
    @class NepaliCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function NepaliCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

NepaliCalendar.prototype = new main.baseCalendar;

assign(NepaliCalendar.prototype, {
    /** The calendar name.
        @memberof NepaliCalendar */
    name: 'Nepali',
    /** Julian date of start of Nepali epoch: 14 April 57 BCE.
        @memberof NepaliCalendar */
    jdEpoch: 1700709.5,
    /** Days per month in a common year.
        @memberof NepaliCalendar */
    daysPerMonth: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof NepaliCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof NepaliCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof NepaliCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof NepaliCalendar */
    minDay: 1, 
    /** The number of days in the year.
        @memberof NepaliCalendar */
    daysPerYear: 365,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof NepaliCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Nepali',
            epochs: ['BBS', 'ABS'],
            monthNames: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
            'Kartik', 'Mangsir', 'Paush', 'Mangh', 'Falgun', 'Chaitra'],
            monthNamesShort: ['Bai', 'Je', 'As', 'Shra', 'Bha', 'Ash', 'Kar', 'Mang', 'Pau', 'Ma', 'Fal', 'Chai'],
            dayNames: ['Aaitabaar', 'Sombaar', 'Manglbaar', 'Budhabaar', 'Bihibaar', 'Shukrabaar', 'Shanibaar'],
            dayNamesShort: ['Aaita', 'Som', 'Mangl', 'Budha', 'Bihi', 'Shukra', 'Shani'],
            dayNamesMin: ['Aai', 'So', 'Man', 'Bu', 'Bi', 'Shu', 'Sha'],
            digits: null,
            dateFormat: 'dd/mm/yyyy',
            firstDay: 1,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof NepaliCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        return this.daysInYear(year) !== this.daysPerYear;
    },

    /** Determine the week of the year for a date.
        @memberof NepaliCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a year.
        @memberof NepaliCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        year = date.year();
        if (typeof this.NEPALI_CALENDAR_DATA[year] === 'undefined') {
            return this.daysPerYear;
        }
        var daysPerYear = 0;
        for (var month_number = this.minMonth; month_number <= 12; month_number++) {
            daysPerYear += this.NEPALI_CALENDAR_DATA[year][month_number];
        }
        return daysPerYear;
    },

    /** Retrieve the number of days in a month.
        @memberof NepaliCalendar
        @param year {CDate|number| The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        if (year.year) {
            month = year.month();
            year = year.year();
        }
        this._validate(year, month, this.minDay, main.local.invalidMonth);
        return (typeof this.NEPALI_CALENDAR_DATA[year] === 'undefined' ?
            this.daysPerMonth[month - 1] : this.NEPALI_CALENDAR_DATA[year][month]);
    },

    /** Determine whether this date is a week day.
        @memberof NepaliCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return this.dayOfWeek(year, month, day) !== 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof NepaliCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(nepaliYear, nepaliMonth, nepaliDay) {
        var date = this._validate(nepaliYear, nepaliMonth, nepaliDay, main.local.invalidDate);
        nepaliYear = date.year();
        nepaliMonth = date.month();
        nepaliDay = date.day();
        var gregorianCalendar = main.instance();
        var gregorianDayOfYear = 0; // We will add all the days that went by since
        // the 1st. January and then we can get the Gregorian Date
        var nepaliMonthToCheck = nepaliMonth;
        var nepaliYearToCheck = nepaliYear;
        this._createMissingCalendarData(nepaliYear);
        // Get the correct year
        var gregorianYear = nepaliYear - (nepaliMonthToCheck > 9 || (nepaliMonthToCheck === 9 &&
            nepaliDay >= this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0]) ? 56 : 57);
        // First we add the amount of days in the actual Nepali month as the day of year in the
        // Gregorian one because at least this days are gone since the 1st. Jan. 
        if (nepaliMonth !== 9) {
            gregorianDayOfYear = nepaliDay;
            nepaliMonthToCheck--;
        }
        // Now we loop throw all Nepali month and add the amount of days to gregorianDayOfYear 
        // we do this till we reach Paush (9th month). 1st. January always falls in this month  
        while (nepaliMonthToCheck !== 9) {
            if (nepaliMonthToCheck <= 0) {
                nepaliMonthToCheck = 12;
                nepaliYearToCheck--;
            }                
            gregorianDayOfYear += this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][nepaliMonthToCheck];
            nepaliMonthToCheck--;
        }        
        // If the date that has to be converted is in Paush (month no. 9) we have to do some other calculation
        if (nepaliMonth === 9) {
            // Add the days that are passed since the first day of Paush and substract the
            // amount of days that lie between 1st. Jan and 1st Paush
            gregorianDayOfYear += nepaliDay - this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0];
            // For the first days of Paush we are now in negative values,
            // because in the end of the gregorian year we substract
            // 365 / 366 days (P.S. remember math in school + - gives -)
            if (gregorianDayOfYear < 0) {
                gregorianDayOfYear += gregorianCalendar.daysInYear(gregorianYear);
            }
        }
        else {
            gregorianDayOfYear += this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][9] -
                this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0];
        }        
        return gregorianCalendar.newDate(gregorianYear, 1 ,1).add(gregorianDayOfYear, 'd').toJD();
    },
    
    /** Create a new date from a Julian date.
        @memberof NepaliCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        var gregorianCalendar =  main.instance();
        var gregorianDate = gregorianCalendar.fromJD(jd);
        var gregorianYear = gregorianDate.year();
        var gregorianDayOfYear = gregorianDate.dayOfYear();
        var nepaliYear = gregorianYear + 56; //this is not final, it could be also +57 but +56 is always true for 1st Jan.
        this._createMissingCalendarData(nepaliYear);
        var nepaliMonth = 9; // Jan 1 always fall in Nepali month Paush which is the 9th month of Nepali calendar.
        // Get the Nepali day in Paush (month 9) of 1st January 
        var dayOfFirstJanInPaush = this.NEPALI_CALENDAR_DATA[nepaliYear][0];
        // Check how many days are left of Paush .
        // Days calculated from 1st Jan till the end of the actual Nepali month, 
        // we use this value to check if the gregorian Date is in the actual Nepali month.
        var daysSinceJanFirstToEndOfNepaliMonth =
            this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] - dayOfFirstJanInPaush + 1;
        // If the gregorian day-of-year is smaller o equal than the sum of days between the 1st January and 
        // the end of the actual nepali month we found the correct nepali month.
        // Example: 
        // The 4th February 2011 is the gregorianDayOfYear 35 (31 days of January + 4)
        // 1st January 2011 is in the nepali year 2067, where 1st. January is in the 17th day of Paush (9th month)
        // In 2067 Paush has 30days, This means (30-17+1=14) there are 14days between 1st January and end of Paush 
        // (including 17th January)
        // The gregorianDayOfYear (35) is bigger than 14, so we check the next month
        // The next nepali month (Mangh) has 29 days 
        // 29+14=43, this is bigger than gregorianDayOfYear(35) so, we found the correct nepali month
        while (gregorianDayOfYear > daysSinceJanFirstToEndOfNepaliMonth) {
            nepaliMonth++;
            if (nepaliMonth > 12) {
                nepaliMonth = 1;
                nepaliYear++;
            }    
            daysSinceJanFirstToEndOfNepaliMonth += this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth];
        }
        // The last step is to calculate the nepali day-of-month
        // to continue our example from before:
        // we calculated there are 43 days from 1st. January (17 Paush) till end of Mangh (29 days)
        // when we subtract from this 43 days the day-of-year of the the Gregorian date (35),
        // we know how far the searched day is away from the end of the Nepali month.
        // So we simply subtract this number from the amount of days in this month (30) 
        var nepaliDayOfMonth = this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] -
            (daysSinceJanFirstToEndOfNepaliMonth - gregorianDayOfYear);        
        return this.newDate(nepaliYear, nepaliMonth, nepaliDayOfMonth);
    },
    
    /** Creates missing data in the NEPALI_CALENDAR_DATA table.
        This data will not be correct but just give an estimated result. Mostly -/+ 1 day
        @private
        @param nepaliYear {number} The missing year number. */
    _createMissingCalendarData: function(nepaliYear) {
        var tmp_calendar_data = this.daysPerMonth.slice(0);
        tmp_calendar_data.unshift(17);
        for (var nepaliYearToCreate = (nepaliYear - 1); nepaliYearToCreate < (nepaliYear + 2); nepaliYearToCreate++) {
            if (typeof this.NEPALI_CALENDAR_DATA[nepaliYearToCreate] === 'undefined') {
                this.NEPALI_CALENDAR_DATA[nepaliYearToCreate] = tmp_calendar_data;
            }
        }
    },
    
    NEPALI_CALENDAR_DATA:  {
        // These data are from http://www.ashesh.com.np
        1970: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1971: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        1972: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        1973: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        1974: [19, 31, 31, 32, 30, 31, 31, 30, 29, 30, 29, 30, 30],
        1975: [18, 31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30],
        1976: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1977: [18, 31, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
        1978: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1979: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1980: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1981: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        1982: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1983: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1984: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1985: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        1986: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1987: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1988: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1989: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        1990: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1991: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],    
        // These data are from http://nepalicalendar.rat32.com/index.php
        1992: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        1993: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        1994: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1995: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        1996: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        1997: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1998: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1999: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2000: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2001: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2002: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2003: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2004: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2005: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2006: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2007: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2008: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2009: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2010: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2011: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2012: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2013: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2014: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2015: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2016: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2017: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2018: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2019: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2020: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2021: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2022: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2023: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2024: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2025: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2026: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2027: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2028: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2029: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        2030: [17, 31, 32, 31, 32, 31, 30, 30, 30, 30, 30, 30, 31],
        2031: [17, 31, 32, 31, 32, 31, 31, 31, 31, 31, 31, 31, 31],
        2032: [17, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
        2033: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2034: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2035: [17, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2036: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2037: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2038: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2039: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2040: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2041: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2042: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2043: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2044: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2045: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2046: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2047: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2048: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2049: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2050: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2051: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2052: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2053: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2054: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2055: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 29, 30],
        2056: [17, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        2057: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2058: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2059: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2060: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2061: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2062: [17, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
        2063: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2064: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2065: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2066: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2067: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2068: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2069: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2070: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2071: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2072: [17, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2073: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2074: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2075: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2076: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2077: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2078: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2079: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2080: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        // These data are from http://www.ashesh.com.np/nepali-calendar/
        2081: [17, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2082: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2083: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
        2084: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
        2085: [17, 31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30],
        2086: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2087: [16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
        2088: [16, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
        2089: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2090: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2091: [16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
        2092: [16, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2093: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2094: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
        2095: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
        2096: [17, 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2097: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2098: [17, 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31],
        2099: [17, 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
        2100: [17, 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30]    
    }
});    

// Nepali calendar implementation
main.calendars.nepali = NepaliCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/persian.js":
/*!****************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/persian.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Persian calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the Persian or Jalali calendar.
    Based on code from <a href="http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php">http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php</a>.
    See also <a href="http://en.wikipedia.org/wiki/Iranian_calendar">http://en.wikipedia.org/wiki/Iranian_calendar</a>.
    @class PersianCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function PersianCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

PersianCalendar.prototype = new main.baseCalendar;

assign(PersianCalendar.prototype, {
    /** The calendar name.
        @memberof PersianCalendar */
    name: 'Persian',
    /** Julian date of start of Persian epoch: 19 March 622 CE.
        @memberof PersianCalendar */
    jdEpoch: 1948320.5,
    /** Days per month in a common year.
        @memberof PersianCalendar */
    daysPerMonth: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof PersianCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof PersianCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof PersianCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof PersianCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof PersianCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Persian',
            epochs: ['BP', 'AP'],
            monthNames: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
            'Mehr', 'Aban', 'Azar', 'Day', 'Bahman', 'Esfand'],
            monthNamesShort: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Day', 'Bah', 'Esf'],
            dayNames: ['Yekshambe', 'Doshambe', 'Seshambe', 'Chæharshambe', 'Panjshambe', 'Jom\'e', 'Shambe'],
            dayNamesShort: ['Yek', 'Do', 'Se', 'Chæ', 'Panj', 'Jom', 'Sha'],
            dayNamesMin: ['Ye','Do','Se','Ch','Pa','Jo','Sh'],
            digits: null,
            dateFormat: 'yyyy/mm/dd',
            firstDay: 6,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof PersianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return (((((date.year() - (date.year() > 0 ? 474 : 473)) % 2820) +
            474 + 38) * 682) % 2816) < 682;
    },

    /** Determine the week of the year for a date.
        @memberof PersianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Saturday of this week starting on Saturday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-((checkDate.dayOfWeek() + 1) % 7), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof PersianCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 12 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof PersianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return this.dayOfWeek(year, month, day) !== 5;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof PersianCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        year = date.year();
        month = date.month();
        day = date.day();
        var epBase = year - (year >= 0 ? 474 : 473);
        var epYear = 474 + mod(epBase, 2820);
        return day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) +
            Math.floor((epYear * 682 - 110) / 2816) + (epYear - 1) * 365 +
            Math.floor(epBase / 2820) * 1029983 + this.jdEpoch - 1;
    },

    /** Create a new date from a Julian date.
        @memberof PersianCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        jd = Math.floor(jd) + 0.5;
        var depoch = jd - this.toJD(475, 1, 1);
        var cycle = Math.floor(depoch / 1029983);
        var cyear = mod(depoch, 1029983);
        var ycycle = 2820;
        if (cyear !== 1029982) {
            var aux1 = Math.floor(cyear / 366);
            var aux2 = mod(cyear, 366);
            ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) + aux1 + 1;
        }
        var year = ycycle + (2820 * cycle) + 474;
        year = (year <= 0 ? year - 1 : year);
        var yday = jd - this.toJD(year, 1, 1) + 1;
        var month = (yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30));
        var day = jd - this.toJD(year, month, 1) + 1;
        return this.newDate(year, month, day);
    }
});

// Modulus function which works for non-integers.
function mod(a, b) {
    return a - (b * Math.floor(a / b));
}

// Persian (Jalali) calendar implementation
main.calendars.persian = PersianCalendar;
main.calendars.jalali = PersianCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/taiwan.js":
/*!***************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/taiwan.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Taiwanese (Minguo) calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) February 2010.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


var gregorianCalendar = main.instance();

/** Implementation of the Taiwanese calendar.
    See http://en.wikipedia.org/wiki/Minguo_calendar.
    @class TaiwanCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function TaiwanCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

TaiwanCalendar.prototype = new main.baseCalendar;

assign(TaiwanCalendar.prototype, {
    /** The calendar name.
        @memberof TaiwanCalendar */
    name: 'Taiwan',
    /** Julian date of start of Taiwan epoch: 1 January 1912 CE (Gregorian).
        @memberof TaiwanCalendar */
    jdEpoch: 2419402.5,
    /** Difference in years between Taiwan and Gregorian calendars.
        @memberof TaiwanCalendar */
    yearsOffset: 1911,
    /** Days per month in a common year.
        @memberof TaiwanCalendar */
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof TaiwanCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof TaiwanCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof TaiwanCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof TaiwanCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof TaiwanCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Taiwan',
            epochs: ['BROC', 'ROC'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            digits: null,
            dateFormat: 'yyyy/mm/dd',
            firstDay: 1,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof TaiwanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = this._t2gYear(date.year());
        return gregorianCalendar.leapYear(year);
    },

    /** Determine the week of the year for a date - ISO 8601.
        @memberof TaiwanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = this._t2gYear(date.year());
        return gregorianCalendar.weekOfYear(year, date.month(), date.day());
    },

    /** Retrieve the number of days in a month.
        @memberof TaiwanCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 2 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof TaiwanCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof TaiwanCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        var year = this._t2gYear(date.year());
        return gregorianCalendar.toJD(year, date.month(), date.day());
    },

    /** Create a new date from a Julian date.
        @memberof TaiwanCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        var date = gregorianCalendar.fromJD(jd);
        var year = this._g2tYear(date.year());
        return this.newDate(year, date.month(), date.day());
    },

    /** Convert Taiwanese to Gregorian year.
        @memberof TaiwanCalendar
        @private
        @param year {number} The Taiwanese year.
        @return {number} The corresponding Gregorian year. */
    _t2gYear: function(year) {
        return year + this.yearsOffset + (year >= -this.yearsOffset && year <= -1 ? 1 : 0);
    },

    /** Convert Gregorian to Taiwanese year.
        @memberof TaiwanCalendar
        @private
        @param year {number} The Gregorian year.
        @return {number} The corresponding Taiwanese year. */
    _g2tYear: function(year) {
        return year - this.yearsOffset - (year >= 1 && year <= this.yearsOffset ? 1 : 0);
    }
});

// Taiwan calendar implementation
main.calendars.taiwan = TaiwanCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/thai.js":
/*!*************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/thai.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Thai calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) February 2010.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


var gregorianCalendar = main.instance();

/** Implementation of the Thai calendar.
    See http://en.wikipedia.org/wiki/Thai_calendar.
    @class ThaiCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function ThaiCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

ThaiCalendar.prototype = new main.baseCalendar;

assign(ThaiCalendar.prototype, {
    /** The calendar name.
        @memberof ThaiCalendar */
    name: 'Thai',
    /** Julian date of start of Thai epoch: 1 January 543 BCE (Gregorian).
        @memberof ThaiCalendar */
    jdEpoch: 1523098.5,
    /** Difference in years between Thai and Gregorian calendars.
        @memberof ThaiCalendar */
    yearsOffset: 543, 
    /** Days per month in a common year.
        @memberof ThaiCalendar */
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof ThaiCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof ThaiCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof ThaiCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof ThaiCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof ThaiCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Thai',
            epochs: ['BBE', 'BE'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            digits: null,
            dateFormat: 'dd/mm/yyyy',
            firstDay: 0,
            isRTL: false
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof ThaiCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = this._t2gYear(date.year());
        return gregorianCalendar.leapYear(year);
    },

    /** Determine the week of the year for a date - ISO 8601.
        @memberof ThaiCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        var year = this._t2gYear(date.year());
        return gregorianCalendar.weekOfYear(year, date.month(), date.day());
    },

    /** Retrieve the number of days in a month.
        @memberof ThaiCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 2 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof ThaiCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof ThaiCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        var year = this._t2gYear(date.year());
        return gregorianCalendar.toJD(year, date.month(), date.day());
    },

    /** Create a new date from a Julian date.
        @memberof ThaiCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        var date = gregorianCalendar.fromJD(jd);
        var year = this._g2tYear(date.year());
        return this.newDate(year, date.month(), date.day());
    },

    /** Convert Thai to Gregorian year.
        @memberof ThaiCalendar
        @private
        @param year {number} The Thai year.
        @return {number} The corresponding Gregorian year. */
    _t2gYear: function(year) {
        return year - this.yearsOffset - (year >= 1 && year <= this.yearsOffset ? 1 : 0);
    },

    /** Convert Gregorian to Thai year.
        @memberof ThaiCalendar
        @private
        @param year {number} The Gregorian year.
        @return {number} The corresponding Thai year. */
    _g2tYear: function(year) {
        return year + this.yearsOffset + (year >= -this.yearsOffset && year <= -1 ? 1 : 0);
    }
});

// Thai calendar implementation
main.calendars.thai = ThaiCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/calendars/ummalqura.js":
/*!******************************************************************!*\
  !*** ./node_modules/world-calendars/dist/calendars/ummalqura.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   UmmAlQura calendar for jQuery v2.0.2.
   Written by Amro Osama March 2013.
   Modified by Binnooh.com & www.elm.sa - 2014 - Added dates back to 1276 Hijri year.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var main = __webpack_require__(/*! ../main */ "./node_modules/world-calendars/dist/main.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


/** Implementation of the UmmAlQura or 'saudi' calendar.
    See also <a href="http://en.wikipedia.org/wiki/Islamic_calendar#Saudi_Arabia.27s_Umm_al-Qura_calendar">http://en.wikipedia.org/wiki/Islamic_calendar#Saudi_Arabia.27s_Umm_al-Qura_calendar</a>.
    <a href="http://www.ummulqura.org.sa/About.aspx">http://www.ummulqura.org.sa/About.aspx</a>
    <a href="http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm">http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm</a>
    @class UmmAlQuraCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function UmmAlQuraCalendar(language) {
    this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
}

UmmAlQuraCalendar.prototype = new main.baseCalendar;

assign(UmmAlQuraCalendar.prototype, {
    /** The calendar name.
        @memberof UmmAlQuraCalendar */
    name: 'UmmAlQura',
    //jdEpoch: 1948440, // Julian date of start of UmmAlQura epoch: 14 March 1937 CE
    //daysPerMonth: // Days per month in a common year, replaced by a method.
    /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof UmmAlQuraCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof UmmAlQuraCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof UmmAlQuraCalendar */
    firstMonth: 1,
    /** The minimum day number.
        @memberof UmmAlQuraCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof UmmAlQuraCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Umm al-Qura',
            epochs: ['BH', 'AH'],
            monthNames: ['Al-Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' Al-Thani', 'Jumada Al-Awwal', 'Jumada Al-Thani',
            'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
            monthNamesShort: ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'],
            dayNames: ['Yawm al-Ahad', 'Yawm al-Ithnain', 'Yawm al-Thalāthā’', 'Yawm al-Arba‘ā’', 'Yawm al-Khamīs', 'Yawm al-Jum‘a', 'Yawm al-Sabt'],
            dayNamesMin: ['Ah', 'Ith', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'],
            digits: null,
            dateFormat: 'yyyy/mm/dd',
            firstDay: 6,
            isRTL: true
        }
    },

    /** Determine whether this date is in a leap year.
        @memberof UmmAlQuraCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function (year) {
        var date = this._validate(year, this.minMonth, this.minDay, main.local.invalidYear);
        return (this.daysInYear(date.year()) === 355);
    },

    /** Determine the week of the year for a date.
        @memberof UmmAlQuraCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function (year, month, day) {
        // Find Sunday of this week starting on Sunday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(-checkDate.dayOfWeek(), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a year.
        @memberof UmmAlQuraCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function (year) {
        var daysCount = 0;
        for (var i = 1; i <= 12; i++) {
            daysCount += this.daysInMonth(year, i);
        }
        return daysCount;
    },

    /** Retrieve the number of days in a month.
        @memberof UmmAlQuraCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function (year, month) {
        var date = this._validate(year, month, this.minDay, main.local.invalidMonth);
        var mcjdn = date.toJD() - 2400000 + 0.5; // Modified Chronological Julian Day Number (MCJDN)
        // the MCJDN's of the start of the lunations in the Umm al-Qura calendar are stored in the 'ummalqura_dat' array
        var index = 0;
        for (var i = 0; i < ummalqura_dat.length; i++) {
            if (ummalqura_dat[i] > mcjdn) {
                return (ummalqura_dat[index] - ummalqura_dat[index - 1]);
            }
            index++;
        }
        return 30; // Unknown outside
    },

    /** Determine whether this date is a week day.
        @memberof UmmAlQuraCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function (year, month, day) {
        return this.dayOfWeek(year, month, day) !== 5;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof UmmAlQuraCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function (year, month, day) {
        var date = this._validate(year, month, day, main.local.invalidDate);
        var index = (12 * (date.year() - 1)) + date.month() - 15292;
        var mcjdn = date.day() + ummalqura_dat[index - 1] - 1;
        return mcjdn + 2400000 - 0.5; // Modified Chronological Julian Day Number (MCJDN)
    },

    /** Create a new date from a Julian date.
        @memberof UmmAlQuraCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function (jd) {
        var mcjdn = jd - 2400000 + 0.5; // Modified Chronological Julian Day Number (MCJDN)
        // the MCJDN's of the start of the lunations in the Umm al-Qura calendar 
        // are stored in the 'ummalqura_dat' array
        var index = 0;
        for (var i = 0; i < ummalqura_dat.length; i++) {
            if (ummalqura_dat[i] > mcjdn) break;
            index++;
        }
        var lunation = index + 15292; //UmmAlQura Lunation Number
        var ii = Math.floor((lunation - 1) / 12);
        var year = ii + 1;
        var month = lunation - 12 * ii;
        var day = mcjdn - ummalqura_dat[index - 1] + 1;
        return this.newDate(year, month, day);
    },

    /** Determine whether a date is valid for this calendar.
        @memberof UmmAlQuraCalendar
        @param year {number} The year to examine.
        @param month {number} The month to examine.
        @param day {number} The day to examine.
        @return {boolean} <code>true</code> if a valid date, <code>false</code> if not. */
    isValid: function(year, month, day) {
        var valid = main.baseCalendar.prototype.isValid.apply(this, arguments);
        if (valid) {
            year = (year.year != null ? year.year : year);
            valid = (year >= 1276 && year <= 1500);
        }
        return valid;
    },

    /** Check that a candidate date is from the same calendar and is valid.
        @memberof UmmAlQuraCalendar
        @private
        @param year {CDate|number} The date to validate or the year to validate.
        @param month {number} The month to validate.
        @param day {number} The day to validate.
        @param error {string} Error message if invalid.
        @throws Error if different calendars used or invalid date. */
    _validate: function(year, month, day, error) {
        var date = main.baseCalendar.prototype._validate.apply(this, arguments);
        if (date.year < 1276 || date.year > 1500) {
            throw error.replace(/\{0\}/, this.local.name);
        }
        return date;
    }
});

// UmmAlQura calendar implementation
main.calendars.ummalqura = UmmAlQuraCalendar;

var ummalqura_dat = [
    20,    50,    79,    109,   138,   168,   197,   227,   256,   286,   315,   345,   374,   404,   433,   463,   492,   522,   551,   581, 
    611,   641,   670,   700,   729,   759,   788,   818,   847,   877,   906,   936,   965,   995,   1024,  1054,  1083,  1113,  1142,  1172,
    1201,  1231,  1260,  1290,  1320,  1350,  1379,  1409,  1438,  1468,  1497,  1527,  1556,  1586,  1615,  1645,  1674,  1704,  1733,  1763,
    1792,  1822,  1851,  1881,  1910,  1940,  1969,  1999,  2028,  2058,  2087,  2117,  2146,  2176,  2205,  2235,  2264,  2294,  2323,  2353,
    2383,  2413,  2442,  2472,  2501,  2531,  2560,  2590,  2619,  2649,  2678,  2708,  2737,  2767,  2796,  2826,  2855,  2885,  2914,  2944,
    2973,  3003,  3032,  3062,  3091,  3121,  3150,  3180,  3209,  3239,  3268,  3298,  3327,  3357,  3386,  3416,  3446,  3476,  3505,  3535,
    3564,  3594,  3623,  3653,  3682,  3712,  3741,  3771,  3800,  3830,  3859,  3889,  3918,  3948,  3977,  4007,  4036,  4066,  4095,  4125,
    4155,  4185,  4214,  4244,  4273,  4303,  4332,  4362,  4391,  4421,  4450,  4480,  4509,  4539,  4568,  4598,  4627,  4657,  4686,  4716,
    4745,  4775,  4804,  4834,  4863,  4893,  4922,  4952,  4981,  5011,  5040,  5070,  5099,  5129,  5158,  5188,  5218,  5248,  5277,  5307,
    5336,  5366,  5395,  5425,  5454,  5484,  5513,  5543,  5572,  5602,  5631,  5661,  5690,  5720,  5749,  5779,  5808,  5838,  5867,  5897,
    5926,  5956,  5985,  6015,  6044,  6074,  6103,  6133,  6162,  6192,  6221,  6251,  6281,  6311,  6340,  6370,  6399,  6429,  6458,  6488,
    6517,  6547,  6576,  6606,  6635,  6665,  6694,  6724,  6753,  6783,  6812,  6842,  6871,  6901,  6930,  6960,  6989,  7019,  7048,  7078,
    7107,  7137,  7166,  7196,  7225,  7255,  7284,  7314,  7344,  7374,  7403,  7433,  7462,  7492,  7521,  7551,  7580,  7610,  7639,  7669,
    7698,  7728,  7757,  7787,  7816,  7846,  7875,  7905,  7934,  7964,  7993,  8023,  8053,  8083,  8112,  8142,  8171,  8201,  8230,  8260,
    8289,  8319,  8348,  8378,  8407,  8437,  8466,  8496,  8525,  8555,  8584,  8614,  8643,  8673,  8702,  8732,  8761,  8791,  8821,  8850,
    8880,  8909,  8938,  8968,  8997,  9027,  9056,  9086,  9115,  9145,  9175,  9205,  9234,  9264,  9293,  9322,  9352,  9381,  9410,  9440,
    9470,  9499,  9529,  9559,  9589,  9618,  9648,  9677,  9706,  9736,  9765,  9794,  9824,  9853,  9883,  9913,  9943,  9972,  10002, 10032,
    10061, 10090, 10120, 10149, 10178, 10208, 10237, 10267, 10297, 10326, 10356, 10386, 10415, 10445, 10474, 10504, 10533, 10562, 10592, 10621,
    10651, 10680, 10710, 10740, 10770, 10799, 10829, 10858, 10888, 10917, 10947, 10976, 11005, 11035, 11064, 11094, 11124, 11153, 11183, 11213,
    11242, 11272, 11301, 11331, 11360, 11389, 11419, 11448, 11478, 11507, 11537, 11567, 11596, 11626, 11655, 11685, 11715, 11744, 11774, 11803,
    11832, 11862, 11891, 11921, 11950, 11980, 12010, 12039, 12069, 12099, 12128, 12158, 12187, 12216, 12246, 12275, 12304, 12334, 12364, 12393,
    12423, 12453, 12483, 12512, 12542, 12571, 12600, 12630, 12659, 12688, 12718, 12747, 12777, 12807, 12837, 12866, 12896, 12926, 12955, 12984,
    13014, 13043, 13072, 13102, 13131, 13161, 13191, 13220, 13250, 13280, 13310, 13339, 13368, 13398, 13427, 13456, 13486, 13515, 13545, 13574,
    13604, 13634, 13664, 13693, 13723, 13752, 13782, 13811, 13840, 13870, 13899, 13929, 13958, 13988, 14018, 14047, 14077, 14107, 14136, 14166,
    14195, 14224, 14254, 14283, 14313, 14342, 14372, 14401, 14431, 14461, 14490, 14520, 14550, 14579, 14609, 14638, 14667, 14697, 14726, 14756,
    14785, 14815, 14844, 14874, 14904, 14933, 14963, 14993, 15021, 15051, 15081, 15110, 15140, 15169, 15199, 15228, 15258, 15287, 15317, 15347,
    15377, 15406, 15436, 15465, 15494, 15524, 15553, 15582, 15612, 15641, 15671, 15701, 15731, 15760, 15790, 15820, 15849, 15878, 15908, 15937,
    15966, 15996, 16025, 16055, 16085, 16114, 16144, 16174, 16204, 16233, 16262, 16292, 16321, 16350, 16380, 16409, 16439, 16468, 16498, 16528,
    16558, 16587, 16617, 16646, 16676, 16705, 16734, 16764, 16793, 16823, 16852, 16882, 16912, 16941, 16971, 17001, 17030, 17060, 17089, 17118,
    17148, 17177, 17207, 17236, 17266, 17295, 17325, 17355, 17384, 17414, 17444, 17473, 17502, 17532, 17561, 17591, 17620, 17650, 17679, 17709,
    17738, 17768, 17798, 17827, 17857, 17886, 17916, 17945, 17975, 18004, 18034, 18063, 18093, 18122, 18152, 18181, 18211, 18241, 18270, 18300,
    18330, 18359, 18388, 18418, 18447, 18476, 18506, 18535, 18565, 18595, 18625, 18654, 18684, 18714, 18743, 18772, 18802, 18831, 18860, 18890,
    18919, 18949, 18979, 19008, 19038, 19068, 19098, 19127, 19156, 19186, 19215, 19244, 19274, 19303, 19333, 19362, 19392, 19422, 19452, 19481,
    19511, 19540, 19570, 19599, 19628, 19658, 19687, 19717, 19746, 19776, 19806, 19836, 19865, 19895, 19924, 19954, 19983, 20012, 20042, 20071,
    20101, 20130, 20160, 20190, 20219, 20249, 20279, 20308, 20338, 20367, 20396, 20426, 20455, 20485, 20514, 20544, 20573, 20603, 20633, 20662,
    20692, 20721, 20751, 20780, 20810, 20839, 20869, 20898, 20928, 20957, 20987, 21016, 21046, 21076, 21105, 21135, 21164, 21194, 21223, 21253,
    21282, 21312, 21341, 21371, 21400, 21430, 21459, 21489, 21519, 21548, 21578, 21607, 21637, 21666, 21696, 21725, 21754, 21784, 21813, 21843,
    21873, 21902, 21932, 21962, 21991, 22021, 22050, 22080, 22109, 22138, 22168, 22197, 22227, 22256, 22286, 22316, 22346, 22375, 22405, 22434,
    22464, 22493, 22522, 22552, 22581, 22611, 22640, 22670, 22700, 22730, 22759, 22789, 22818, 22848, 22877, 22906, 22936, 22965, 22994, 23024,
    23054, 23083, 23113, 23143, 23173, 23202, 23232, 23261, 23290, 23320, 23349, 23379, 23408, 23438, 23467, 23497, 23527, 23556, 23586, 23616,
    23645, 23674, 23704, 23733, 23763, 23792, 23822, 23851, 23881, 23910, 23940, 23970, 23999, 24029, 24058, 24088, 24117, 24147, 24176, 24206,
    24235, 24265, 24294, 24324, 24353, 24383, 24413, 24442, 24472, 24501, 24531, 24560, 24590, 24619, 24648, 24678, 24707, 24737, 24767, 24796,
    24826, 24856, 24885, 24915, 24944, 24974, 25003, 25032, 25062, 25091, 25121, 25150, 25180, 25210, 25240, 25269, 25299, 25328, 25358, 25387,
    25416, 25446, 25475, 25505, 25534, 25564, 25594, 25624, 25653, 25683, 25712, 25742, 25771, 25800, 25830, 25859, 25888, 25918, 25948, 25977,
    26007, 26037, 26067, 26096, 26126, 26155, 26184, 26214, 26243, 26272, 26302, 26332, 26361, 26391, 26421, 26451, 26480, 26510, 26539, 26568,
    26598, 26627, 26656, 26686, 26715, 26745, 26775, 26805, 26834, 26864, 26893, 26923, 26952, 26982, 27011, 27041, 27070, 27099, 27129, 27159,
    27188, 27218, 27248, 27277, 27307, 27336, 27366, 27395, 27425, 27454, 27484, 27513, 27542, 27572, 27602, 27631, 27661, 27691, 27720, 27750,
    27779, 27809, 27838, 27868, 27897, 27926, 27956, 27985, 28015, 28045, 28074, 28104, 28134, 28163, 28193, 28222, 28252, 28281, 28310, 28340,
    28369, 28399, 28428, 28458, 28488, 28517, 28547, 28577,
    // From 1356
    28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990, 29019, 29049, 29078, 29108, 29137, 29167,
    29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522, 29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759,
    29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053, 30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348,
    30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585, 30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939,
    30968, 30998, 31027, 31057, 31086, 31116, 31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530,
    31559, 31589, 31618, 31648, 31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120,
    32150, 32180, 32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711,
    32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243, 33272, 33302,
    33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775, 33804, 33834, 33863, 33893,
    33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306, 34336, 34365, 34395, 34424, 34454, 34483,
    34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837, 34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074,
    35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370, 35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665,
    35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901, 35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254,
    36284, 36314, 36343, 36373, 36403, 36433, 36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845,
    36875, 36904, 36934, 36963, 36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436,
    37465, 37495, 37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027,
    38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558, 38587, 38617,
    38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089, 39118, 39148, 39178, 39208,
    39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621, 39650, 39680, 39709, 39739, 39768, 39798,
    39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153, 40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389,
    40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980,
    41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216, 41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570,
    41599, 41629, 41658, 41688, 41718, 41748, 41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161,
    42190, 42220, 42249, 42279, 42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751,
    42780, 42810, 42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342,
    43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873, 43903, 43932,
    43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405, 44434, 44464, 44493, 44523,
    44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936, 44966, 44996, 45025, 45055, 45084, 45114,
    45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468, 45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704,
    45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999, 46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295,
    46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531, 46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885,
    46915, 46944, 46974, 47003, 47033, 47063, 47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476,
    47506, 47535, 47565, 47594, 47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066,
    48096, 48125, 48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657,
    48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189, 49218, 49248,
    49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720, 49749, 49779, 49809, 49838,
    49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252, 50281, 50311, 50340, 50370, 50400, 50429,
    50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784, 50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019,
    51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315, 51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611,
    51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846, 51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200,
    52230, 52260, 52290, 52319, 52349, 52379, 52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792,
    52822, 52851, 52881, 52910, 52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383,
    53412, 53441, 53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53913, 53943, 53973,
    54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505, 54535, 54564,
    54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036, 55066, 55095, 55125, 55154,
    55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567, 55597, 55627, 55657, 55686, 55716, 55745,
    55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100, 56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335,
    56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631, 56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926,
    56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162, 57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517,
    57546, 57576, 57605, 57634, 57664, 57694, 57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57959, 57989, 58018, 58048, 58077, 58107,
    58137, 58167, 58196, 58226, 58255, 58285, 58314, 58343, 58373, 58402, 58432, 58461, 58491, 58521, 58551, 58580, 58610, 58639, 58669, 58698,
    58727, 58757, 58786, 58816, 58845, 58875, 58905, 58934, 58964, 58994, 59023, 59053, 59082, 59111, 59141, 59170, 59200, 59229, 59259, 59288,
    59318, 59348, 59377, 59407, 59436, 59466, 59495, 59525, 59554, 59584, 59613, 59643, 59672, 59702, 59731, 59761, 59791, 59820, 59850, 59879,
    59909, 59939, 59968, 59997, 60027, 60056, 60086, 60115, 60145, 60174, 60204, 60234, 60264, 60293, 60323, 60352, 60381, 60411, 60440, 60469,
    60499, 60528, 60558, 60588, 60618, 60648, 60677, 60707, 60736, 60765, 60795, 60824, 60853, 60883, 60912, 60942, 60972, 61002, 61031, 61061,
    61090, 61120, 61149, 61179, 61208, 61237, 61267, 61296, 61326, 61356, 61385, 61415, 61445, 61474, 61504, 61533, 61563, 61592, 61621, 61651,
    61680, 61710, 61739, 61769, 61799, 61828, 61858, 61888, 61917, 61947, 61976, 62006, 62035, 62064, 62094, 62123, 62153, 62182, 62212, 62242,
    62271, 62301, 62331, 62360, 62390, 62419, 62448, 62478, 62507, 62537, 62566, 62596, 62625, 62655, 62685, 62715, 62744, 62774, 62803, 62832,
    62862, 62891, 62921, 62950, 62980, 63009, 63039, 63069, 63099, 63128, 63157, 63187, 63216, 63246, 63275, 63305, 63334, 63363, 63393, 63423,
    63453, 63482, 63512, 63541, 63571, 63600, 63630, 63659, 63689, 63718, 63747, 63777, 63807, 63836, 63866, 63895, 63925, 63955, 63984, 64014,
    64043, 64073, 64102, 64131, 64161, 64190, 64220, 64249, 64279, 64309, 64339, 64368, 64398, 64427, 64457, 64486, 64515, 64545, 64574, 64603,
    64633, 64663, 64692, 64722, 64752, 64782, 64811, 64841, 64870, 64899, 64929, 64958, 64987, 65017, 65047, 65076, 65106, 65136, 65166, 65195,
    65225, 65254, 65283, 65313, 65342, 65371, 65401, 65431, 65460, 65490, 65520, 65549, 65579, 65608, 65638, 65667, 65697, 65726, 65755, 65785,
    65815, 65844, 65874, 65903, 65933, 65963, 65992, 66022, 66051, 66081, 66110, 66140, 66169, 66199, 66228, 66258, 66287, 66317, 66346, 66376,
    66405, 66435, 66465, 66494, 66524, 66553, 66583, 66612, 66641, 66671, 66700, 66730, 66760, 66789, 66819, 66849, 66878, 66908, 66937, 66967,
    66996, 67025, 67055, 67084, 67114, 67143, 67173, 67203, 67233, 67262, 67292, 67321, 67351, 67380, 67409, 67439, 67468, 67497, 67527, 67557,
    67587, 67617, 67646, 67676, 67705, 67735, 67764, 67793, 67823, 67852, 67882, 67911, 67941, 67971, 68000, 68030, 68060, 68089, 68119, 68148,
    68177, 68207, 68236, 68266, 68295, 68325, 68354, 68384, 68414, 68443, 68473, 68502, 68532, 68561, 68591, 68620, 68650, 68679, 68708, 68738,
    68768, 68797, 68827, 68857, 68886, 68916, 68946, 68975, 69004, 69034, 69063, 69092, 69122, 69152, 69181, 69211, 69240, 69270, 69300, 69330,
    69359, 69388, 69418, 69447, 69476, 69506, 69535, 69565, 69595, 69624, 69654, 69684, 69713, 69743, 69772, 69802, 69831, 69861, 69890, 69919,
    69949, 69978, 70008, 70038, 70067, 70097, 70126, 70156, 70186, 70215, 70245, 70274, 70303, 70333, 70362, 70392, 70421, 70451, 70481, 70510,
    70540, 70570, 70599, 70629, 70658, 70687, 70717, 70746, 70776, 70805, 70835, 70864, 70894, 70924, 70954, 70983, 71013, 71042, 71071, 71101,
    71130, 71159, 71189, 71218, 71248, 71278, 71308, 71337, 71367, 71397, 71426, 71455, 71485, 71514, 71543, 71573, 71602, 71632, 71662, 71691,
    71721, 71751, 71781, 71810, 71839, 71869, 71898, 71927, 71957, 71986, 72016, 72046, 72075, 72105, 72135, 72164, 72194, 72223, 72253, 72282,
    72311, 72341, 72370, 72400, 72429, 72459, 72489, 72518, 72548, 72577, 72607, 72637, 72666, 72695, 72725, 72754, 72784, 72813, 72843, 72872,
    72902, 72931, 72961, 72991, 73020, 73050, 73080, 73109, 73139, 73168, 73197, 73227, 73256, 73286, 73315, 73345, 73375, 73404, 73434, 73464,
    73493, 73523, 73552, 73581, 73611, 73640, 73669, 73699, 73729, 73758, 73788, 73818, 73848, 73877, 73907, 73936, 73965, 73995, 74024, 74053,
    74083, 74113, 74142, 74172, 74202, 74231, 74261, 74291, 74320, 74349, 74379, 74408, 74437, 74467, 74497, 74526, 74556, 74586, 74615, 74645,
    74675, 74704, 74733, 74763, 74792, 74822, 74851, 74881, 74910, 74940, 74969, 74999, 75029, 75058, 75088, 75117, 75147, 75176, 75206, 75235,
    75264, 75294, 75323, 75353, 75383, 75412, 75442, 75472, 75501, 75531, 75560, 75590, 75619, 75648, 75678, 75707, 75737, 75766, 75796, 75826,
    75856, 75885, 75915, 75944, 75974, 76003, 76032, 76062, 76091, 76121, 76150, 76180, 76210, 76239, 76269, 76299, 76328, 76358, 76387, 76416,
    76446, 76475, 76505, 76534, 76564, 76593, 76623, 76653, 76682, 76712, 76741, 76771, 76801, 76830, 76859, 76889, 76918, 76948, 76977, 77007,
    77036, 77066, 77096, 77125, 77155, 77185, 77214, 77243, 77273, 77302, 77332, 77361, 77390, 77420, 77450, 77479, 77509, 77539, 77569, 77598,
    77627, 77657, 77686, 77715, 77745, 77774, 77804, 77833, 77863, 77893, 77923, 77952, 77982, 78011, 78041, 78070, 78099, 78129, 78158, 78188,
    78217, 78247, 78277, 78307, 78336, 78366, 78395, 78425, 78454, 78483, 78513, 78542, 78572, 78601, 78631, 78661, 78690, 78720, 78750, 78779,
    78808, 78838, 78867, 78897, 78926, 78956, 78985, 79015, 79044, 79074, 79104, 79133, 79163, 79192, 79222, 79251, 79281, 79310, 79340, 79369,
    79399, 79428, 79458, 79487, 79517, 79546, 79576, 79606, 79635, 79665, 79695, 79724, 79753, 79783, 79812, 79841, 79871, 79900, 79930, 79960,
    79990];



/***/ }),

/***/ "./node_modules/world-calendars/dist/main.js":
/*!***************************************************!*\
  !*** ./node_modules/world-calendars/dist/main.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Calendars for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");


function Calendars() {
    this.regionalOptions = [];
    this.regionalOptions[''] = {
        invalidCalendar: 'Calendar {0} not found',
        invalidDate: 'Invalid {0} date',
        invalidMonth: 'Invalid {0} month',
        invalidYear: 'Invalid {0} year',
        differentCalendars: 'Cannot mix {0} and {1} dates'
    };
    this.local = this.regionalOptions[''];
    this.calendars = {};
    this._localCals = {};
}

/** Create the calendars plugin.
    <p>Provides support for various world calendars in a consistent manner.</p>
     @class Calendars
    @example _exports.instance('julian').newDate(2014, 12, 25) */
assign(Calendars.prototype, {

    /** Obtain a calendar implementation and localisation.
        @memberof Calendars
        @param [name='gregorian'] {string} The name of the calendar, e.g. 'gregorian', 'persian', 'islamic'.
        @param [language=''] {string} The language code to use for localisation (default is English).
        @return {Calendar} The calendar and localisation.
        @throws Error if calendar not found. */
    instance: function(name, language) {
        name = (name || 'gregorian').toLowerCase();
        language = language || '';
        var cal = this._localCals[name + '-' + language];
        if (!cal && this.calendars[name]) {
            cal = new this.calendars[name](language);
            this._localCals[name + '-' + language] = cal;
        }
        if (!cal) {
            throw (this.local.invalidCalendar || this.regionalOptions[''].invalidCalendar).
                replace(/\{0\}/, name);
        }
        return cal;
    },

    /** Create a new date - for today if no other parameters given.
        @memberof Calendars
        @param year {CDate|number} The date to copy or the year for the date.
        @param [month] {number} The month for the date.
        @param [day] {number} The day for the date.
        @param [calendar='gregorian'] {BaseCalendar|string} The underlying calendar or the name of the calendar.
        @param [language=''] {string} The language to use for localisation (default English).
        @return {CDate} The new date.
        @throws Error if an invalid date. */
    newDate: function(year, month, day, calendar, language) {
        calendar = (year != null && year.year ? year.calendar() : (typeof calendar === 'string' ?
            this.instance(calendar, language) : calendar)) || this.instance();
        return calendar.newDate(year, month, day);
    },
    
    /** A simple digit substitution function for localising numbers via the Calendar digits option.
        @member Calendars
        @param digits {string[]} The substitute digits, for 0 through 9.
        @return {function} The substitution function. */
    substituteDigits: function(digits) {
        return function(value) {
            return (value + '').replace(/[0-9]/g, function(digit) {
                return digits[digit];
            });
        }
    },
    
    /** Digit substitution function for localising Chinese style numbers via the Calendar digits option.
        @member Calendars
        @param digits {string[]} The substitute digits, for 0 through 9.
        @param powers {string[]} The characters denoting powers of 10, i.e. 1, 10, 100, 1000.
        @return {function} The substitution function. */
    substituteChineseDigits: function(digits, powers) {
        return function(value) {
            var localNumber = '';
            var power = 0;
            while (value > 0) {
                var units = value % 10;
                localNumber = (units === 0 ? '' : digits[units] + powers[power]) + localNumber;
                power++;
                value = Math.floor(value / 10);
            }
            if (localNumber.indexOf(digits[1] + powers[1]) === 0) {
                localNumber = localNumber.substr(1);
            }
            return localNumber || digits[0];
        }
    }
});

/** Generic date, based on a particular calendar.
    @class CDate
    @param calendar {BaseCalendar} The underlying calendar implementation.
    @param year {number} The year for this date.
    @param month {number} The month for this date.
    @param day {number} The day for this date.
    @return {CDate} The date object.
    @throws Error if an invalid date. */
function CDate(calendar, year, month, day) {
    this._calendar = calendar;
    this._year = year;
    this._month = month;
    this._day = day;
    if (this._calendar._validateLevel === 0 &&
            !this._calendar.isValid(this._year, this._month, this._day)) {
        throw (_exports.local.invalidDate || _exports.regionalOptions[''].invalidDate).
            replace(/\{0\}/, this._calendar.local.name);
    }
}

/** Pad a numeric value with leading zeroes.
    @private
    @param value {number} The number to format.
    @param length {number} The minimum length.
    @return {string} The formatted number. */
function pad(value, length) {
    value = '' + value;
    return '000000'.substring(0, length - value.length) + value;
}

assign(CDate.prototype, {

    /** Create a new date.
        @memberof CDate
        @param [year] {CDate|number} The date to copy or the year for the date (default this date).
        @param [month] {number} The month for the date.
        @param [day] {number} The day for the date.
        @return {CDate} The new date.
        @throws Error if an invalid date. */
    newDate: function(year, month, day) {
        return this._calendar.newDate((year == null ? this : year), month, day);
    },

    /** Set or retrieve the year for this date.
        @memberof CDate
        @param [year] {number} The year for the date.
        @return {number|CDate} The date's year (if no parameter) or the updated date.
        @throws Error if an invalid date. */
    year: function(year) {
        return (arguments.length === 0 ? this._year : this.set(year, 'y'));
    },

    /** Set or retrieve the month for this date.
        @memberof CDate
        @param [month] {number} The month for the date.
        @return {number|CDate} The date's month (if no parameter) or the updated date.
        @throws Error if an invalid date. */
    month: function(month) {
        return (arguments.length === 0 ? this._month : this.set(month, 'm'));
    },

    /** Set or retrieve the day for this date.
        @memberof CDate
        @param [day] {number} The day for the date.
        @return {number|CData} The date's day (if no parameter) or the updated date.
        @throws Error if an invalid date. */
    day: function(day) {
        return (arguments.length === 0 ? this._day : this.set(day, 'd'));
    },

    /** Set new values for this date.
        @memberof CDate
        @param year {number} The year for the date.
        @param month {number} The month for the date.
        @param day {number} The day for the date.
        @return {CDate} The updated date.
        @throws Error if an invalid date. */
    date: function(year, month, day) {
        if (!this._calendar.isValid(year, month, day)) {
            throw (_exports.local.invalidDate || _exports.regionalOptions[''].invalidDate).
                replace(/\{0\}/, this._calendar.local.name);
        }
        this._year = year;
        this._month = month;
        this._day = day;
        return this;
    },

    /** Determine whether this date is in a leap year.
        @memberof CDate
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not. */
    leapYear: function() {
        return this._calendar.leapYear(this);
    },

    /** Retrieve the epoch designator for this date, e.g. BCE or CE.
        @memberof CDate
        @return {string} The current epoch. */
    epoch: function() {
        return this._calendar.epoch(this);
    },

    /** Format the year, if not a simple sequential number.
        @memberof CDate
        @return {string} The formatted year. */
    formatYear: function() {
        return this._calendar.formatYear(this);
    },

    /** Retrieve the month of the year for this date,
        i.e. the month's position within a numbered year.
        @memberof CDate
        @return {number} The month of the year: <code>minMonth</code> to months per year. */
    monthOfYear: function() {
        return this._calendar.monthOfYear(this);
    },

    /** Retrieve the week of the year for this date.
        @memberof CDate
        @return {number} The week of the year: 1 to weeks per year. */
    weekOfYear: function() {
        return this._calendar.weekOfYear(this);
    },

    /** Retrieve the number of days in the year for this date.
        @memberof CDate
        @return {number} The number of days in this year. */
    daysInYear: function() {
        return this._calendar.daysInYear(this);
    },

    /** Retrieve the day of the year for this date.
        @memberof CDate
        @return {number} The day of the year: 1 to days per year. */
    dayOfYear: function() {
        return this._calendar.dayOfYear(this);
    },

    /** Retrieve the number of days in the month for this date.
        @memberof CDate
        @return {number} The number of days. */
    daysInMonth: function() {
        return this._calendar.daysInMonth(this);
    },

    /** Retrieve the day of the week for this date.
        @memberof CDate
        @return {number} The day of the week: 0 to number of days - 1. */
    dayOfWeek: function() {
        return this._calendar.dayOfWeek(this);
    },

    /** Determine whether this date is a week day.
        @memberof CDate
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not. */
    weekDay: function() {
        return this._calendar.weekDay(this);
    },

    /** Retrieve additional information about this date.
        @memberof CDate
        @return {object} Additional information - contents depends on calendar. */
    extraInfo: function() {
        return this._calendar.extraInfo(this);
    },

    /** Add period(s) to a date.
        @memberof CDate
        @param offset {number} The number of periods to adjust by.
        @param period {string} One of 'y' for year, 'm' for month, 'w' for week, 'd' for day.
        @return {CDate} The updated date. */
    add: function(offset, period) {
        return this._calendar.add(this, offset, period);
    },

    /** Set a portion of the date.
        @memberof CDate
        @param value {number} The new value for the period.
        @param period {string} One of 'y' for year, 'm' for month, 'd' for day.
        @return {CDate} The updated date.
        @throws Error if not a valid date. */
    set: function(value, period) {
        return this._calendar.set(this, value, period);
    },

    /** Compare this date to another date.
        @memberof CDate
        @param date {CDate} The other date.
        @return {number} -1 if this date is before the other date,
                0 if they are equal, or +1 if this date is after the other date. */
    compareTo: function(date) {
        if (this._calendar.name !== date._calendar.name) {
            throw (_exports.local.differentCalendars || _exports.regionalOptions[''].differentCalendars).
                replace(/\{0\}/, this._calendar.local.name).replace(/\{1\}/, date._calendar.local.name);
        }
        var c = (this._year !== date._year ? this._year - date._year :
            this._month !== date._month ? this.monthOfYear() - date.monthOfYear() :
            this._day - date._day);
        return (c === 0 ? 0 : (c < 0 ? -1 : +1));
    },

    /** Retrieve the calendar backing this date.
        @memberof CDate
        @return {BaseCalendar} The calendar implementation. */
    calendar: function() {
        return this._calendar;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof CDate
        @return {number} The equivalent Julian date. */
    toJD: function() {
        return this._calendar.toJD(this);
    },

    /** Create a new date from a Julian date.
        @memberof CDate
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        return this._calendar.fromJD(jd);
    },

    /** Convert this date to a standard (Gregorian) JavaScript Date.
        @memberof CDate
        @return {Date} The equivalent JavaScript date. */
    toJSDate: function() {
        return this._calendar.toJSDate(this);
    },

    /** Create a new date from a standard (Gregorian) JavaScript Date.
        @memberof CDate
        @param jsd {Date} The JavaScript date to convert.
        @return {CDate} The equivalent date. */
    fromJSDate: function(jsd) {
        return this._calendar.fromJSDate(jsd);
    },

    /** Convert to a string for display.
        @memberof CDate
        @return {string} This date as a string. */
    toString: function() {
        return (this.year() < 0 ? '-' : '') + pad(Math.abs(this.year()), 4) +
            '-' + pad(this.month(), 2) + '-' + pad(this.day(), 2);
    }
});

/** Basic functionality for all calendars.
    Other calendars should extend this:
    <pre>OtherCalendar.prototype = new BaseCalendar;</pre>
    @class BaseCalendar */
function BaseCalendar() {
    this.shortYearCutoff = '+10';
}

assign(BaseCalendar.prototype, {
    _validateLevel: 0, // "Stack" to turn validation on/off

    /** Create a new date within this calendar - today if no parameters given.
        @memberof BaseCalendar
        @param year {CDate|number} The date to duplicate or the year for the date.
        @param [month] {number} The month for the date.
        @param [day] {number} The day for the date.
        @return {CDate} The new date.
        @throws Error if not a valid date or a different calendar used. */
    newDate: function(year, month, day) {
        if (year == null) {
            return this.today();
        }
        if (year.year) {
            this._validate(year, month, day,
                _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
            day = year.day();
            month = year.month();
            year = year.year();
        }
        return new CDate(this, year, month, day);
    },

    /** Create a new date for today.
        @memberof BaseCalendar
        @return {CDate} Today's date. */
    today: function() {
        return this.fromJSDate(new Date());
    },

    /** Retrieve the epoch designator for this date.
        @memberof BaseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {string} The current epoch.
        @throws Error if an invalid year or a different calendar used. */
    epoch: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay,
            _exports.local.invalidYear || _exports.regionalOptions[''].invalidYear);
        return (date.year() < 0 ? this.local.epochs[0] : this.local.epochs[1]);
    },

    /** Format the year, if not a simple sequential number
        @memberof BaseCalendar
        @param year {CDate|number} The date to format or the year to format.
        @return {string} The formatted year.
        @throws Error if an invalid year or a different calendar used. */
    formatYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay,
            _exports.local.invalidYear || _exports.regionalOptions[''].invalidYear);
        return (date.year() < 0 ? '-' : '') + pad(Math.abs(date.year()), 4)
    },

    /** Retrieve the number of months in a year.
        @memberof BaseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of months.
        @throws Error if an invalid year or a different calendar used. */
    monthsInYear: function(year) {
        this._validate(year, this.minMonth, this.minDay,
            _exports.local.invalidYear || _exports.regionalOptions[''].invalidYear);
        return 12;
    },

    /** Calculate the month's ordinal position within the year -
        for those calendars that don't start at month 1!
        @memberof BaseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param month {number} The month to examine.
        @return {number} The ordinal position, starting from <code>minMonth</code>.
        @throws Error if an invalid year/month or a different calendar used. */
    monthOfYear: function(year, month) {
        var date = this._validate(year, month, this.minDay,
            _exports.local.invalidMonth || _exports.regionalOptions[''].invalidMonth);
        return (date.month() + this.monthsInYear(date) - this.firstMonth) %
            this.monthsInYear(date) + this.minMonth;
    },

    /** Calculate actual month from ordinal position, starting from minMonth.
        @memberof BaseCalendar
        @param year {number} The year to examine.
        @param ord {number} The month's ordinal position.
        @return {number} The month's number.
        @throws Error if an invalid year/month. */
    fromMonthOfYear: function(year, ord) {
        var m = (ord + this.firstMonth - 2 * this.minMonth) %
            this.monthsInYear(year) + this.minMonth;
        this._validate(year, m, this.minDay,
            _exports.local.invalidMonth || _exports.regionalOptions[''].invalidMonth);
        return m;
    },

    /** Retrieve the number of days in a year.
        @memberof BaseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {number} The number of days.
        @throws Error if an invalid year or a different calendar used. */
    daysInYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay,
            _exports.local.invalidYear || _exports.regionalOptions[''].invalidYear);
        return (this.leapYear(date) ? 366 : 365);
    },

    /** Retrieve the day of the year for a date.
        @memberof BaseCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The day of the year.
        @throws Error if an invalid date or a different calendar used. */
    dayOfYear: function(year, month, day) {
        var date = this._validate(year, month, day,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        return date.toJD() - this.newDate(date.year(),
            this.fromMonthOfYear(date.year(), this.minMonth), this.minDay).toJD() + 1;
    },

    /** Retrieve the number of days in a week.
        @memberof BaseCalendar
        @return {number} The number of days. */
    daysInWeek: function() {
        return 7;
    },

    /** Retrieve the day of the week for a date.
        @memberof BaseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The day of the week: 0 to number of days - 1.
        @throws Error if an invalid date or a different calendar used. */
    dayOfWeek: function(year, month, day) {
        var date = this._validate(year, month, day,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        return (Math.floor(this.toJD(date)) + 2) % this.daysInWeek();
    },

    /** Retrieve additional information about a date.
        @memberof BaseCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {object} Additional information - contents depends on calendar.
        @throws Error if an invalid date or a different calendar used. */
    extraInfo: function(year, month, day) {
        this._validate(year, month, day,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        return {};
    },

    /** Add period(s) to a date.
        Cater for no year zero.
        @memberof BaseCalendar
        @param date {CDate} The starting date.
        @param offset {number} The number of periods to adjust by.
        @param period {string} One of 'y' for year, 'm' for month, 'w' for week, 'd' for day.
        @return {CDate} The updated date.
        @throws Error if a different calendar used. */
    add: function(date, offset, period) {
        this._validate(date, this.minMonth, this.minDay,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        return this._correctAdd(date, this._add(date, offset, period), offset, period);
    },

    /** Add period(s) to a date.
        @memberof BaseCalendar
        @private
        @param date {CDate} The starting date.
        @param offset {number} The number of periods to adjust by.
        @param period {string} One of 'y' for year, 'm' for month, 'w' for week, 'd' for day.
        @return {CDate} The updated date. */
    _add: function(date, offset, period) {
        this._validateLevel++;
        if (period === 'd' || period === 'w') {
            var jd = date.toJD() + offset * (period === 'w' ? this.daysInWeek() : 1);
            var d = date.calendar().fromJD(jd);
            this._validateLevel--;
            return [d.year(), d.month(), d.day()];
        }
        try {
            var y = date.year() + (period === 'y' ? offset : 0);
            var m = date.monthOfYear() + (period === 'm' ? offset : 0);
            var d = date.day();// + (period === 'd' ? offset : 0) +
                //(period === 'w' ? offset * this.daysInWeek() : 0);
            var resyncYearMonth = function(calendar) {
                while (m < calendar.minMonth) {
                    y--;
                    m += calendar.monthsInYear(y);
                }
                var yearMonths = calendar.monthsInYear(y);
                while (m > yearMonths - 1 + calendar.minMonth) {
                    y++;
                    m -= yearMonths;
                    yearMonths = calendar.monthsInYear(y);
                }
            };
            if (period === 'y') {
                if (date.month() !== this.fromMonthOfYear(y, m)) { // Hebrew
                    m = this.newDate(y, date.month(), this.minDay).monthOfYear();
                }
                m = Math.min(m, this.monthsInYear(y));
                d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
            }
            else if (period === 'm') {
                resyncYearMonth(this);
                d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
            }
            var ymd = [y, this.fromMonthOfYear(y, m), d];
            this._validateLevel--;
            return ymd;
        }
        catch (e) {
            this._validateLevel--;
            throw e;
        }
    },

    /** Correct a candidate date after adding period(s) to a date.
        Handle no year zero if necessary.
        @memberof BaseCalendar
        @private
        @param date {CDate} The starting date.
        @param ymd {number[]} The added date.
        @param offset {number} The number of periods to adjust by.
        @param period {string} One of 'y' for year, 'm' for month, 'w' for week, 'd' for day.
        @return {CDate} The updated date. */
    _correctAdd: function(date, ymd, offset, period) {
        if (!this.hasYearZero && (period === 'y' || period === 'm')) {
            if (ymd[0] === 0 || // In year zero
                    (date.year() > 0) !== (ymd[0] > 0)) { // Crossed year zero
                var adj = {y: [1, 1, 'y'], m: [1, this.monthsInYear(-1), 'm'],
                    w: [this.daysInWeek(), this.daysInYear(-1), 'd'],
                    d: [1, this.daysInYear(-1), 'd']}[period];
                var dir = (offset < 0 ? -1 : +1);
                ymd = this._add(date, offset * adj[0] + dir * adj[1], adj[2]);
            }
        }
        return date.date(ymd[0], ymd[1], ymd[2]);
    },

    /** Set a portion of the date.
        @memberof BaseCalendar
        @param date {CDate} The starting date.
        @param value {number} The new value for the period.
        @param period {string} One of 'y' for year, 'm' for month, 'd' for day.
        @return {CDate} The updated date.
        @throws Error if an invalid date or a different calendar used. */
    set: function(date, value, period) {
        this._validate(date, this.minMonth, this.minDay,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        var y = (period === 'y' ? value : date.year());
        var m = (period === 'm' ? value : date.month());
        var d = (period === 'd' ? value : date.day());
        if (period === 'y' || period === 'm') {
            d = Math.min(d, this.daysInMonth(y, m));
        }
        return date.date(y, m, d);
    },

    /** Determine whether a date is valid for this calendar.
        @memberof BaseCalendar
        @param year {number} The year to examine.
        @param month {number} The month to examine.
        @param day {number} The day to examine.
        @return {boolean} <code>true</code> if a valid date, <code>false</code> if not. */
    isValid: function(year, month, day) {
        this._validateLevel++;
        var valid = (this.hasYearZero || year !== 0);
        if (valid) {
            var date = this.newDate(year, month, this.minDay);
            valid = (month >= this.minMonth && month - this.minMonth < this.monthsInYear(date)) &&
                (day >= this.minDay && day - this.minDay < this.daysInMonth(date));
        }
        this._validateLevel--;
        return valid;
    },

    /** Convert the date to a standard (Gregorian) JavaScript Date.
        @memberof BaseCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {Date} The equivalent JavaScript date.
        @throws Error if an invalid date or a different calendar used. */
    toJSDate: function(year, month, day) {
        var date = this._validate(year, month, day,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        return _exports.instance().fromJD(this.toJD(date)).toJSDate();
    },

    /** Convert the date from a standard (Gregorian) JavaScript Date.
        @memberof BaseCalendar
        @param jsd {Date} The JavaScript date.
        @return {CDate} The equivalent calendar date. */
    fromJSDate: function(jsd) {
        return this.fromJD(_exports.instance().fromJSDate(jsd).toJD());
    },

    /** Check that a candidate date is from the same calendar and is valid.
        @memberof BaseCalendar
        @private
        @param year {CDate|number} The date to validate or the year to validate.
        @param [month] {number} The month to validate.
        @param [day] {number} The day to validate.
        @param error {string} Rrror message if invalid.
        @throws Error if different calendars used or invalid date. */
    _validate: function(year, month, day, error) {
        if (year.year) {
            if (this._validateLevel === 0 && this.name !== year.calendar().name) {
                throw (_exports.local.differentCalendars || _exports.regionalOptions[''].differentCalendars).
                    replace(/\{0\}/, this.local.name).replace(/\{1\}/, year.calendar().local.name);
            }
            return year;
        }
        try {
            this._validateLevel++;
            if (this._validateLevel === 1 && !this.isValid(year, month, day)) {
                throw error.replace(/\{0\}/, this.local.name);
            }
            var date = this.newDate(year, month, day);
            this._validateLevel--;
            return date;
        }
        catch (e) {
            this._validateLevel--;
            throw e;
        }
    }
});

/** Implementation of the Proleptic Gregorian Calendar.
    See <a href=":http://en.wikipedia.org/wiki/Gregorian_calendar">http://en.wikipedia.org/wiki/Gregorian_calendar</a>
    and <a href="http://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar">http://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar</a>.
    @class GregorianCalendar
    @augments BaseCalendar
    @param [language=''] {string} The language code (default English) for localisation. */
function GregorianCalendar(language) {
    this.local = this.regionalOptions[language] || this.regionalOptions[''];
}

GregorianCalendar.prototype = new BaseCalendar;

assign(GregorianCalendar.prototype, {
    /** The calendar name.
        @memberof GregorianCalendar */
    name: 'Gregorian',
     /** Julian date of start of Gregorian epoch: 1 January 0001 CE.
        @memberof GregorianCalendar */
    jdEpoch: 1721425.5,
     /** Days per month in a common year.
        @memberof GregorianCalendar */
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
     /** <code>true</code> if has a year zero, <code>false</code> if not.
        @memberof GregorianCalendar */
    hasYearZero: false,
    /** The minimum month number.
        @memberof GregorianCalendar */
    minMonth: 1,
    /** The first month in the year.
        @memberof GregorianCalendar */
    firstMonth: 1,
     /** The minimum day number.
        @memberof GregorianCalendar */
    minDay: 1,

    /** Localisations for the plugin.
        Entries are objects indexed by the language code ('' being the default US/English).
        Each object has the following attributes.
        @memberof GregorianCalendar
        @property name {string} The calendar name.
        @property epochs {string[]} The epoch names.
        @property monthNames {string[]} The long names of the months of the year.
        @property monthNamesShort {string[]} The short names of the months of the year.
        @property dayNames {string[]} The long names of the days of the week.
        @property dayNamesShort {string[]} The short names of the days of the week.
        @property dayNamesMin {string[]} The minimal names of the days of the week.
        @property dateFormat {string} The date format for this calendar.
                See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
        @property firstDay {number} The number of the first day of the week, starting at 0.
        @property isRTL {number} <code>true</code> if this localisation reads right-to-left. */
    regionalOptions: { // Localisations
        '': {
            name: 'Gregorian',
            epochs: ['BCE', 'CE'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            digits: null,
            dateFormat: 'mm/dd/yyyy',
            firstDay: 0,
            isRTL: false
        }
    },
    
    /** Determine whether this date is in a leap year.
        @memberof GregorianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
        @throws Error if an invalid year or a different calendar used. */
    leapYear: function(year) {
        var date = this._validate(year, this.minMonth, this.minDay,
            _exports.local.invalidYear || _exports.regionalOptions[''].invalidYear);
        var year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    },

    /** Determine the week of the year for a date - ISO 8601.
        @memberof GregorianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {number} The week of the year, starting from 1.
        @throws Error if an invalid date or a different calendar used. */
    weekOfYear: function(year, month, day) {
        // Find Thursday of this week starting on Monday
        var checkDate = this.newDate(year, month, day);
        checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd');
        return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
    },

    /** Retrieve the number of days in a month.
        @memberof GregorianCalendar
        @param year {CDate|number} The date to examine or the year of the month.
        @param [month] {number} The month.
        @return {number} The number of days in this month.
        @throws Error if an invalid month/year or a different calendar used. */
    daysInMonth: function(year, month) {
        var date = this._validate(year, month, this.minDay,
            _exports.local.invalidMonth || _exports.regionalOptions[''].invalidMonth);
        return this.daysPerMonth[date.month() - 1] +
            (date.month() === 2 && this.leapYear(date.year()) ? 1 : 0);
    },

    /** Determine whether this date is a week day.
        @memberof GregorianCalendar
        @param year {CDate|number} The date to examine or the year to examine.
        @param [month] {number} The month to examine.
        @param [day] {number} The day to examine.
        @return {boolean} <code>true</code> if a week day, <code>false</code> if not.
        @throws Error if an invalid date or a different calendar used. */
    weekDay: function(year, month, day) {
        return (this.dayOfWeek(year, month, day) || 7) < 6;
    },

    /** Retrieve the Julian date equivalent for this date,
        i.e. days since January 1, 4713 BCE Greenwich noon.
        @memberof GregorianCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {number} The equivalent Julian date.
        @throws Error if an invalid date or a different calendar used. */
    toJD: function(year, month, day) {
        var date = this._validate(year, month, day,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        year = date.year();
        month = date.month();
        day = date.day();
        if (year < 0) { year++; } // No year zero
        // Jean Meeus algorithm, "Astronomical Algorithms", 1991
        if (month < 3) {
            month += 12;
            year--;
        }
        var a = Math.floor(year / 100);
        var b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) +
            Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    },

    /** Create a new date from a Julian date.
        @memberof GregorianCalendar
        @param jd {number} The Julian date to convert.
        @return {CDate} The equivalent date. */
    fromJD: function(jd) {
        // Jean Meeus algorithm, "Astronomical Algorithms", 1991
        var z = Math.floor(jd + 0.5);
        var a = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + a - Math.floor(a / 4);
        var b = a + 1524;
        var c = Math.floor((b - 122.1) / 365.25);
        var d = Math.floor(365.25 * c);
        var e = Math.floor((b - d) / 30.6001);
        var day = b - d - Math.floor(e * 30.6001);
        var month = e - (e > 13.5 ? 13 : 1);
        var year = c - (month > 2.5 ? 4716 : 4715);
        if (year <= 0) { year--; } // No year zero
        return this.newDate(year, month, day);
    },

    /** Convert this date to a standard (Gregorian) JavaScript Date.
        @memberof GregorianCalendar
        @param year {CDate|number} The date to convert or the year to convert.
        @param [month] {number} The month to convert.
        @param [day] {number} The day to convert.
        @return {Date} The equivalent JavaScript date.
        @throws Error if an invalid date or a different calendar used. */
    toJSDate: function(year, month, day) {
        var date = this._validate(year, month, day,
            _exports.local.invalidDate || _exports.regionalOptions[''].invalidDate);
        var jsd = new Date(date.year(), date.month() - 1, date.day());
        jsd.setHours(0);
        jsd.setMinutes(0);
        jsd.setSeconds(0);
        jsd.setMilliseconds(0);
        // Hours may be non-zero on daylight saving cut-over:
        // > 12 when midnight changeover, but then cannot generate
        // midnight datetime, so jump to 1AM, otherwise reset.
        jsd.setHours(jsd.getHours() > 12 ? jsd.getHours() + 2 : 0);
        return jsd;
    },

    /** Create a new date from a standard (Gregorian) JavaScript Date.
        @memberof GregorianCalendar
        @param jsd {Date} The JavaScript date to convert.
        @return {CDate} The equivalent date. */
    fromJSDate: function(jsd) {
        return this.newDate(jsd.getFullYear(), jsd.getMonth() + 1, jsd.getDate());
    }
});

// Singleton manager
var _exports = module.exports = new Calendars();

// Date template
_exports.cdate = CDate;

// Base calendar template
_exports.baseCalendar = BaseCalendar;

// Gregorian calendar implementation
_exports.calendars.gregorian = GregorianCalendar;



/***/ }),

/***/ "./node_modules/world-calendars/dist/plus.js":
/*!***************************************************!*\
  !*** ./node_modules/world-calendars/dist/plus.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Calendars extras for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var main = __webpack_require__(/*! ./main */ "./node_modules/world-calendars/dist/main.js");


assign(main.regionalOptions[''], {
    invalidArguments: 'Invalid arguments',
    invalidFormat: 'Cannot format a date from another calendar',
    missingNumberAt: 'Missing number at position {0}',
    unknownNameAt: 'Unknown name at position {0}',
    unexpectedLiteralAt: 'Unexpected literal at position {0}',
    unexpectedText: 'Additional text found at end'
});
main.local = main.regionalOptions[''];

assign(main.cdate.prototype, {

    /** Format this date.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof CDate
        @param [format] {string} The date format to use (see <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a>).
        @param [settings] {object} Options for the <code>formatDate</code> function.
        @return {string} The formatted date. */
    formatDate: function(format, settings) {
        if (typeof format !== 'string') {
            settings = format;
            format = '';
        }
        return this._calendar.formatDate(format || '', this, settings);
    }
});

assign(main.baseCalendar.prototype, {

    UNIX_EPOCH: main.instance().newDate(1970, 1, 1).toJD(),
    SECS_PER_DAY: 24 * 60 * 60,
    TICKS_EPOCH: main.instance().jdEpoch, // 1 January 0001 CE
    TICKS_PER_DAY: 24 * 60 * 60 * 10000000,

    /** Date form for ATOM (RFC 3339/ISO 8601).
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    ATOM: 'yyyy-mm-dd',
    /** Date form for cookies.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    COOKIE: 'D, dd M yyyy',
    /** Date form for full date.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    FULL: 'DD, MM d, yyyy',
    /** Date form for ISO 8601.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    ISO_8601: 'yyyy-mm-dd',
    /** Date form for Julian date.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    JULIAN: 'J',
    /** Date form for RFC 822.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    RFC_822: 'D, d M yy',
    /** Date form for RFC 850.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    RFC_850: 'DD, dd-M-yy',
    /** Date form for RFC 1036.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    RFC_1036: 'D, d M yy',
    /** Date form for RFC 1123.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    RFC_1123: 'D, d M yyyy',
    /** Date form for RFC 2822.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    RFC_2822: 'D, d M yyyy',
    /** Date form for RSS (RFC 822).
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    RSS: 'D, d M yy',
    /** Date form for Windows ticks.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    TICKS: '!',
    /** Date form for Unix timestamp.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    TIMESTAMP: '@',
    /** Date form for W3c (ISO 8601).
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar */
    W3C: 'yyyy-mm-dd',

    /** Format a date object into a string value.
        The format can be combinations of the following:
        <ul>
        <li>d  - day of month (no leading zero)</li>
        <li>dd - day of month (two digit)</li>
        <li>o  - day of year (no leading zeros)</li>
        <li>oo - day of year (three digit)</li>
        <li>D  - day name short</li>
        <li>DD - day name long</li>
        <li>w  - week of year (no leading zero)</li>
        <li>ww - week of year (two digit)</li>
        <li>m  - month of year (no leading zero)</li>
        <li>mm - month of year (two digit)</li>
        <li>M  - month name short</li>
        <li>MM - month name long</li>
        <li>yy - year (two digit)</li>
        <li>yyyy - year (four digit)</li>
        <li>YYYY - formatted year</li>
        <li>J  - Julian date (days since January 1, 4713 BCE Greenwich noon)</li>
        <li>@  - Unix timestamp (s since 01/01/1970)</li>
        <li>!  - Windows ticks (100ns since 01/01/0001)</li>
        <li>'...' - literal text</li>
        <li>'' - single quote</li>
        </ul>
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar
        @param [format] {string} The desired format of the date (defaults to calendar format).
        @param date {CDate} The date value to format.
        @param [settings] {object} Addition options, whose attributes include:
        @property [dayNamesShort] {string[]} Abbreviated names of the days from Sunday.
        @property [dayNames] {string[]} Names of the days from Sunday.
        @property [monthNamesShort] {string[]} Abbreviated names of the months.
        @property [monthNames] {string[]} Names of the months.
        @property [calculateWeek] {CalendarsPickerCalculateWeek} Function that determines week of the year.
        @property [localNumbers=false] {boolean} <code>true</code> to localise numbers (if available),
                  <code>false</code> to use normal Arabic numerals.
        @return {string} The date in the above format.
        @throws Errors if the date is from a different calendar. */
    formatDate: function(format, date, settings) {
        if (typeof format !== 'string') {
            settings = date;
            date = format;
            format = '';
        }
        if (!date) {
            return '';
        }
        if (date.calendar() !== this) {
            throw main.local.invalidFormat || main.regionalOptions[''].invalidFormat;
        }
        format = format || this.local.dateFormat;
        settings = settings || {};
        var dayNamesShort = settings.dayNamesShort || this.local.dayNamesShort;
        var dayNames = settings.dayNames || this.local.dayNames;
        var monthNumbers = settings.monthNumbers || this.local.monthNumbers;
        var monthNamesShort = settings.monthNamesShort || this.local.monthNamesShort;
        var monthNames = settings.monthNames || this.local.monthNames;
        var calculateWeek = settings.calculateWeek || this.local.calculateWeek;
        // Check whether a format character is doubled
        var doubled = function(match, step) {
            var matches = 1;
            while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
                matches++;
            }
            iFormat += matches - 1;
            return Math.floor(matches / (step || 1)) > 1;
        };
        // Format a number, with leading zeroes if necessary
        var formatNumber = function(match, value, len, step) {
            var num = '' + value;
            if (doubled(match, step)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        };
        // Format a name, short or long as requested
        var formatName = function(match, value, shortNames, longNames) {
            return (doubled(match) ? longNames[value] : shortNames[value]);
        };
        // Format month number
        // (e.g. Chinese calendar needs to account for intercalary months)
        var calendar = this;
        var formatMonth = function(date) {
            return (typeof monthNumbers === 'function') ?
                monthNumbers.call(calendar, date, doubled('m')) :
                localiseNumbers(formatNumber('m', date.month(), 2));
        };
        // Format a month name, short or long as requested
        var formatMonthName = function(date, useLongName) {
            if (useLongName) {
                return (typeof monthNames === 'function') ?
                    monthNames.call(calendar, date) :
                    monthNames[date.month() - calendar.minMonth];
            } else {
                return (typeof monthNamesShort === 'function') ?
                    monthNamesShort.call(calendar, date) :
                    monthNamesShort[date.month() - calendar.minMonth];
            }
        };
        // Localise numbers if requested and available
        var digits = this.local.digits;
        var localiseNumbers = function(value) {
            return (settings.localNumbers && digits ? digits(value) : value);
        };
        var output = '';
        var literal = false;
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !doubled("'")) {
                    literal = false;
                }
                else {
                    output += format.charAt(iFormat);
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case 'd': output += localiseNumbers(formatNumber('d', date.day(), 2)); break;
                    case 'D': output += formatName('D', date.dayOfWeek(),
                        dayNamesShort, dayNames); break;
                    case 'o': output += formatNumber('o', date.dayOfYear(), 3); break;
                    case 'w': output += formatNumber('w', date.weekOfYear(), 2); break;
                    case 'm': output += formatMonth(date); break;
                    case 'M': output += formatMonthName(date, doubled('M')); break;
                    case 'y':
                        output += (doubled('y', 2) ? date.year() :
                            (date.year() % 100 < 10 ? '0' : '') + date.year() % 100);
                        break;
                    case 'Y':
                        doubled('Y', 2);
                        output += date.formatYear();
                        break;
                    case 'J': output += date.toJD(); break;
                    case '@': output += (date.toJD() - this.UNIX_EPOCH) * this.SECS_PER_DAY; break;
                    case '!': output += (date.toJD() - this.TICKS_EPOCH) * this.TICKS_PER_DAY; break;
                    case "'":
                        if (doubled("'")) {
                            output += "'";
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        output += format.charAt(iFormat);
                }
            }
        }
        return output;
    },

    /** Parse a string value into a date object.
        See <a href="#formatDate"><code>formatDate</code></a> for the possible formats, plus:
        <ul>
        <li>* - ignore rest of string</li>
        </ul>
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar
        @param format {string} The expected format of the date ('' for default calendar format).
        @param value {string} The date in the above format.
        @param [settings] {object} Additional options whose attributes include:
        @property [shortYearCutoff] {number} The cutoff year for determining the century.
        @property [dayNamesShort] {string[]} Abbreviated names of the days from Sunday.
        @property [dayNames] {string[]} Names of the days from Sunday.
        @property [monthNamesShort] {string[]} Abbreviated names of the months.
        @property [monthNames] {string[]} Names of the months.
        @return {CDate} The extracted date value or <code>null</code> if value is blank.
        @throws Errors if the format and/or value are missing,
                if the value doesn't match the format, or if the date is invalid. */
    parseDate: function(format, value, settings) {
        if (value == null) {
            throw main.local.invalidArguments || main.regionalOptions[''].invalidArguments;
        }
        value = (typeof value === 'object' ? value.toString() : value + '');
        if (value === '') {
            return null;
        }
        format = format || this.local.dateFormat;
        settings = settings || {};
        var shortYearCutoff = settings.shortYearCutoff || this.shortYearCutoff;
        shortYearCutoff = (typeof shortYearCutoff !== 'string' ? shortYearCutoff :
            this.today().year() % 100 + parseInt(shortYearCutoff, 10));
        var dayNamesShort = settings.dayNamesShort || this.local.dayNamesShort;
        var dayNames = settings.dayNames || this.local.dayNames;
        var parseMonth = settings.parseMonth || this.local.parseMonth;
        var monthNumbers = settings.monthNumbers || this.local.monthNumbers;
        var monthNamesShort = settings.monthNamesShort || this.local.monthNamesShort;
        var monthNames = settings.monthNames || this.local.monthNames;
        var jd = -1;
        var year = -1;
        var month = -1;
        var day = -1;
        var doy = -1;
        var shortYear = false;
        var literal = false;
        // Check whether a format character is doubled
        var doubled = function(match, step) {
            var matches = 1;
            while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
                matches++;
            }
            iFormat += matches - 1;
            return Math.floor(matches / (step || 1)) > 1;
        };
        // Extract a number from the string value
        var getNumber = function(match, step) {
            var isDoubled = doubled(match, step);
            var size = [2, 3, isDoubled ? 4 : 2, isDoubled ? 4 : 2, 10, 11, 20]['oyYJ@!'.indexOf(match) + 1];
            var digits = new RegExp('^-?\\d{1,' + size + '}');
            var num = value.substring(iValue).match(digits);
            if (!num) {
                throw (main.local.missingNumberAt || main.regionalOptions[''].missingNumberAt).
                    replace(/\{0\}/, iValue);
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        };
        // Extract a month number from the string value
        var calendar = this;
        var getMonthNumber = function() {
            if (typeof monthNumbers === 'function') {
                doubled('m');  // update iFormat
                var month = monthNumbers.call(calendar, value.substring(iValue));
                iValue += month.length;
                return month;
            }

            return getNumber('m');
        };
        // Extract a name from the string value and convert to an index
        var getName = function(match, shortNames, longNames, step) {
            var names = (doubled(match, step) ? longNames : shortNames);
            for (var i = 0; i < names.length; i++) {
                if (value.substr(iValue, names[i].length).toLowerCase() === names[i].toLowerCase()) {
                    iValue += names[i].length;
                    return i + calendar.minMonth;
                }
            }
            throw (main.local.unknownNameAt || main.regionalOptions[''].unknownNameAt).
                replace(/\{0\}/, iValue);
        };
        // Extract a month number from the string value
        var getMonthName = function() {
            if (typeof monthNames === 'function') {
                var month = doubled('M') ?
                    monthNames.call(calendar, value.substring(iValue)) :
                    monthNamesShort.call(calendar, value.substring(iValue));
                iValue += month.length;
                return month;
            }

            return getName('M', monthNamesShort, monthNames);
        };
        // Confirm that a literal character matches the string value
        var checkLiteral = function() {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw (main.local.unexpectedLiteralAt ||
                    main.regionalOptions[''].unexpectedLiteralAt).replace(/\{0\}/, iValue);
            }
            iValue++;
        };
        var iValue = 0;
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !doubled("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case 'd': day = getNumber('d'); break;
                    case 'D': getName('D', dayNamesShort, dayNames); break;
                    case 'o': doy = getNumber('o'); break;
                    case 'w': getNumber('w'); break;
                    case 'm': month = getMonthNumber(); break;
                    case 'M': month = getMonthName(); break;
                    case 'y':
                        var iSave = iFormat;
                        shortYear = !doubled('y', 2);
                        iFormat = iSave;
                        year = getNumber('y', 2);
                        break;
                    case 'Y': year = getNumber('Y', 2); break;
                    case 'J':
                        jd = getNumber('J') + 0.5;
                        if (value.charAt(iValue) === '.') {
                            iValue++;
                            getNumber('J');
                        }
                        break;
                    case '@': jd = getNumber('@') / this.SECS_PER_DAY + this.UNIX_EPOCH; break;
                    case '!': jd = getNumber('!') / this.TICKS_PER_DAY + this.TICKS_EPOCH; break;
                    case '*': iValue = value.length; break;
                    case "'":
                        if (doubled("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default: checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            throw main.local.unexpectedText || main.regionalOptions[''].unexpectedText;
        }
        if (year === -1) {
            year = this.today().year();
        }
        else if (year < 100 && shortYear) {
            year += (shortYearCutoff === -1 ? 1900 : this.today().year() -
                this.today().year() % 100 - (year <= shortYearCutoff ? 0 : 100));
        }
        if (typeof month === 'string') {
            month = parseMonth.call(this, year, month);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            for (var dim = this.daysInMonth(year, month); day > dim; dim = this.daysInMonth(year, month)) {
                month++;
                day -= dim;
            }
        }
        return (jd > -1 ? this.fromJD(jd) : this.newDate(year, month, day));
    },

    /** A date may be specified as an exact value or a relative one.
        Found in the <code>jquery.calendars.plus.js</code> module.
        @memberof BaseCalendar
        @param dateSpec {CDate|number|string} The date as an object or string in the given format or
                an offset - numeric days from today, or string amounts and periods, e.g. '+1m +2w'.
        @param defaultDate {CDate} The date to use if no other supplied, may be <code>null</code>.
        @param currentDate {CDate} The current date as a possible basis for relative dates,
                if <code>null</code> today is used (optional)
        @param [dateFormat] {string} The expected date format - see <a href="#formatDate"><code>formatDate</code></a>.
        @param [settings] {object} Additional options whose attributes include:
        @property [shortYearCutoff] {number} The cutoff year for determining the century.
        @property [dayNamesShort] {string[]} Abbreviated names of the days from Sunday.
        @property [dayNames] {string[]} Names of the days from Sunday.
        @property [monthNamesShort] {string[]} Abbreviated names of the months.
        @property [monthNames] {string[]} Names of the months.
        @return {CDate} The decoded date. */
    determineDate: function(dateSpec, defaultDate, currentDate, dateFormat, settings) {
        if (currentDate && typeof currentDate !== 'object') {
            settings = dateFormat;
            dateFormat = currentDate;
            currentDate = null;
        }
        if (typeof dateFormat !== 'string') {
            settings = dateFormat;
            dateFormat = '';
        }
        var calendar = this;
        var offsetString = function(offset) {
            try {
                return calendar.parseDate(dateFormat, offset, settings);
            }
            catch (e) {
                // Ignore
            }
            offset = offset.toLowerCase();
            var date = (offset.match(/^c/) && currentDate ?
                currentDate.newDate() : null) || calendar.today();
            var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
            var matches = pattern.exec(offset);
            while (matches) {
                date.add(parseInt(matches[1], 10), matches[2] || 'd');
                matches = pattern.exec(offset);
            }
            return date;
        };
        defaultDate = (defaultDate ? defaultDate.newDate() : null);
        dateSpec = (dateSpec == null ? defaultDate :
            (typeof dateSpec === 'string' ? offsetString(dateSpec) : (typeof dateSpec === 'number' ?
            (isNaN(dateSpec) || dateSpec === Infinity || dateSpec === -Infinity ? defaultDate :
            calendar.today().add(dateSpec, 'd')) : calendar.newDate(dateSpec))));
        return dateSpec;
    }
});



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY2FsZW5kYXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2NhbGVuZGFycy9jYWxlbmRhcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2NvbXBvbmVudHMvY2FsZW5kYXJzL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2NoaW5lc2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy93b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvY29wdGljLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2Rpc2N3b3JsZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3dvcmxkLWNhbGVuZGFycy9kaXN0L2NhbGVuZGFycy9ldGhpb3BpYW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy93b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvaGVicmV3LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2lzbGFtaWMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy93b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvanVsaWFuLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL21heWFuLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL25hbmFrc2hhaGkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy93b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvbmVwYWxpLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL3BlcnNpYW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy93b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvdGFpd2FuLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL3RoYWkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy93b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvdW1tYWxxdXJhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvd29ybGQtY2FsZW5kYXJzL2Rpc3QvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3dvcmxkLWNhbGVuZGFycy9kaXN0L3BsdXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIscUlBQXVEOzs7Ozs7Ozs7Ozs7QUNWdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTs7QUFFQSxvSEFBcUQ7O0FBRXJELG1CQUFPLENBQUMsOEVBQTJCOztBQUVuQyxtQkFBTyxDQUFDLHdHQUF3QztBQUNoRCxtQkFBTyxDQUFDLHNHQUF1QztBQUMvQyxtQkFBTyxDQUFDLDRHQUEwQztBQUNsRCxtQkFBTyxDQUFDLDRHQUEwQztBQUNs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QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsMkJBQTJCLE9BQU87QUFDbEMsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLE1BQU07QUFDM0IsdUJBQXVCLE9BQU87QUFDOUIsdUJBQXVCLE9BQU87QUFDOUIsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QzVDO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCx1Q0FBdUM7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFtRDtBQUNuRCxvRUFBb0U7QUFDcEUsbURBQW1EO0FBQ25ELDZDQUE2QztBQUM3Qyx1REFBdUQ7QUFDdkQscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RjtBQUN4RiwwRkFBMEY7QUFDMUYsb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELFdBQVc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9CQUFvQjtBQUM3QztBQUNBLDRCQUE0QixNQUFNO0FBQ2xDLDRCQUE0QixNQUFNO0FBQ2xDO0FBQ0EsNkJBQTZCLE9BQU87QUFDcEMsMkJBQTJCLE9BQU87QUFDbEMscUNBQXFDLE9BQU87QUFDNUMsbUNBQW1DLFNBQVM7QUFDNUMsOEJBQThCLFNBQVM7QUFDdkMscUNBQXFDLFNBQVM7QUFDOUMsZ0NBQWdDLFNBQVM7QUFDekMsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJjaGFydDliMThjOTE5YmNmNGMwNDJlMTYxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFycycpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBhIHRyaW1tZWQgZG93biB2ZXJzaW9uIG9mOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FsZXhjam9obnNvbi93b3JsZC1jYWxlbmRhcnMvYmxvYi9tYXN0ZXIvZGlzdC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3dvcmxkLWNhbGVuZGFycy9kaXN0L21haW4nKTtcblxucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvcGx1cycpO1xuXG5yZXF1aXJlKCd3b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvY2hpbmVzZScpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2NvcHRpYycpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2Rpc2N3b3JsZCcpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2V0aGlvcGlhbicpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2hlYnJldycpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL2lzbGFtaWMnKTtcbnJlcXVpcmUoJ3dvcmxkLWNhbGVuZGFycy9kaXN0L2NhbGVuZGFycy9qdWxpYW4nKTtcbnJlcXVpcmUoJ3dvcmxkLWNhbGVuZGFycy9kaXN0L2NhbGVuZGFycy9tYXlhbicpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL25hbmFrc2hhaGknKTtcbnJlcXVpcmUoJ3dvcmxkLWNhbGVuZGFycy9kaXN0L2NhbGVuZGFycy9uZXBhbGknKTtcbnJlcXVpcmUoJ3dvcmxkLWNhbGVuZGFycy9kaXN0L2NhbGVuZGFycy9wZXJzaWFuJyk7XG5yZXF1aXJlKCd3b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvdGFpd2FuJyk7XG5yZXF1aXJlKCd3b3JsZC1jYWxlbmRhcnMvZGlzdC9jYWxlbmRhcnMvdGhhaScpO1xucmVxdWlyZSgnd29ybGQtY2FsZW5kYXJzL2Rpc3QvY2FsZW5kYXJzL3VtbWFscXVyYScpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsZW5kYXJzID0gcmVxdWlyZSgnLi9jYWxlbmRhcnMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKTtcblxudmFyIEVQT0NISkQgPSBjb25zdGFudHMuRVBPQ0hKRDtcbnZhciBPTkVEQVkgPSBjb25zdGFudHMuT05FREFZO1xuXG52YXIgYXR0cmlidXRlcyA9IHtcbiAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgdmFsdWVzOiBPYmplY3Qua2V5cyhjYWxlbmRhcnMuY2FsZW5kYXJzKSxcbiAgICByb2xlOiAnaW5mbycsXG4gICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICBkZmx0OiAnZ3JlZ29yaWFuJ1xufTtcblxudmFyIGhhbmRsZURlZmF1bHRzID0gZnVuY3Rpb24oY29udEluLCBjb250T3V0LCBhdHRyLCBkZmx0KSB7XG4gICAgdmFyIGF0dHJzID0ge307XG4gICAgYXR0cnNbYXR0cl0gPSBhdHRyaWJ1dGVzO1xuXG4gICAgcmV0dXJuIExpYi5jb2VyY2UoY29udEluLCBjb250T3V0LCBhdHRycywgYXR0ciwgZGZsdCk7XG59O1xuXG52YXIgaGFuZGxlVHJhY2VEZWZhdWx0cyA9IGZ1bmN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBjb29yZHMsIGxheW91dCkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGFuZGxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvb3Jkc1tpXSArICdjYWxlbmRhcicsIGxheW91dC5jYWxlbmRhcik7XG4gICAgfVxufTtcblxuLy8gZWFjaCBjYWxlbmRhciBuZWVkcyBpdHMgb3duIGRlZmF1bHQgY2Fub25pY2FsIHRpY2suIEkgd291bGQgbG92ZSB0byB1c2Vcbi8vIDIwMDAtMDEtMDEgKG9yIGV2ZW4gMDAwMC0wMS0wMSkgZm9yIHRoZW0gYWxsIGJ1dCB0aGV5IGRvbid0IG5lY2Vzc2FyaWx5XG4vLyBhbGwgc3VwcG9ydCBlaXRoZXIgb2YgdGhvc2UgZGF0ZXMuIEluc3RlYWQgSSdsbCB1c2UgdGhlIG1vc3Qgc2lnbmlmaWNhbnRcbi8vIG51bWJlciB0aGV5ICpkbyogc3VwcG9ydCwgYmlhc2VkIHRvd2FyZCB0aGUgcHJlc2VudCBkYXkuXG52YXIgQ0FOT05JQ0FMX1RJQ0sgPSB7XG4gICAgY2hpbmVzZTogJzIwMDAtMDEtMDEnLFxuICAgIGNvcHRpYzogJzIwMDAtMDEtMDEnLFxuICAgIGRpc2N3b3JsZDogJzIwMDAtMDEtMDEnLFxuICAgIGV0aGlvcGlhbjogJzIwMDAtMDEtMDEnLFxuICAgIGhlYnJldzogJzUwMDAtMDEtMDEnLFxuICAgIGlzbGFtaWM6ICcxMDAwLTAxLTAxJyxcbiAgICBqdWxpYW46ICcyMDAwLTAxLTAxJyxcbiAgICBtYXlhbjogJzUwMDAtMDEtMDEnLFxuICAgIG5hbmFrc2hhaGk6ICcxMDAwLTAxLTAxJyxcbiAgICBuZXBhbGk6ICcyMDAwLTAxLTAxJyxcbiAgICBwZXJzaWFuOiAnMTAwMC0wMS0wMScsXG4gICAgamFsYWxpOiAnMTAwMC0wMS0wMScsXG4gICAgdGFpd2FuOiAnMTAwMC0wMS0wMScsXG4gICAgdGhhaTogJzIwMDAtMDEtMDEnLFxuICAgIHVtbWFscXVyYTogJzE0MDAtMDEtMDEnXG59O1xuXG4vLyBTdGFydCBvbiBhIFN1bmRheSAtIGZvciB3ZWVrIHRpY2tzXG4vLyBEaXNjd29ybGQgYW5kIE1heWFuIGNhbGVuZGFycyBkb24ndCBoYXZlIDctZGF5IHdlZWtzIGJ1dCB3ZSdyZSBnb2luZyB0byBnaXZlIHRoZW1cbi8vIDctZGF5IHdlZWsgdGlja3Mgc28gc3RhcnQgb24gb3VyIFN1bmRheXMuXG4vLyBJZiBhbnlvbmUgcmVhbGx5IGNhcmVzIHdlIGNhbiBjdXN0b21pemUgdGhlIGF1dG8gdGljayBzcGFjaW5ncyBmb3IgdGhlc2UgY2FsZW5kYXJzLlxudmFyIENBTk9OSUNBTF9TVU5EQVkgPSB7XG4gICAgY2hpbmVzZTogJzIwMDAtMDEtMDInLFxuICAgIGNvcHRpYzogJzIwMDAtMDEtMDMnLFxuICAgIGRpc2N3b3JsZDogJzIwMDAtMDEtMDMnLFxuICAgIGV0aGlvcGlhbjogJzIwMDAtMDEtMDUnLFxuICAgIGhlYnJldzogJzUwMDAtMDEtMDEnLFxuICAgIGlzbGFtaWM6ICcxMDAwLTAxLTAyJyxcbiAgICBqdWxpYW46ICcyMDAwLTAxLTAzJyxcbiAgICBtYXlhbjogJzUwMDAtMDEtMDEnLFxuICAgIG5hbmFrc2hhaGk6ICcxMDAwLTAxLTA1JyxcbiAgICBuZXBhbGk6ICcyMDAwLTAxLTA1JyxcbiAgICBwZXJzaWFuOiAnMTAwMC0wMS0wMScsXG4gICAgamFsYWxpOiAnMTAwMC0wMS0wMScsXG4gICAgdGFpd2FuOiAnMTAwMC0wMS0wNCcsXG4gICAgdGhhaTogJzIwMDAtMDEtMDQnLFxuICAgIHVtbWFscXVyYTogJzE0MDAtMDEtMDYnXG59O1xuXG52YXIgREZMVFJBTkdFID0ge1xuICAgIGNoaW5lc2U6IFsnMjAwMC0wMS0wMScsICcyMDAxLTAxLTAxJ10sXG4gICAgY29wdGljOiBbJzE3MDAtMDEtMDEnLCAnMTcwMS0wMS0wMSddLFxuICAgIGRpc2N3b3JsZDogWycxODAwLTAxLTAxJywgJzE4MDEtMDEtMDEnXSxcbiAgICBldGhpb3BpYW46IFsnMjAwMC0wMS0wMScsICcyMDAxLTAxLTAxJ10sXG4gICAgaGVicmV3OiBbJzU3MDAtMDEtMDEnLCAnNTcwMS0wMS0wMSddLFxuICAgIGlzbGFtaWM6IFsnMTQwMC0wMS0wMScsICcxNDAxLTAxLTAxJ10sXG4gICAganVsaWFuOiBbJzIwMDAtMDEtMDEnLCAnMjAwMS0wMS0wMSddLFxuICAgIG1heWFuOiBbJzUyMDAtMDEtMDEnLCAnNTIwMS0wMS0wMSddLFxuICAgIG5hbmFrc2hhaGk6IFsnMDUwMC0wMS0wMScsICcwNTAxLTAxLTAxJ10sXG4gICAgbmVwYWxpOiBbJzIwMDAtMDEtMDEnLCAnMjAwMS0wMS0wMSddLFxuICAgIHBlcnNpYW46IFsnMTQwMC0wMS0wMScsICcxNDAxLTAxLTAxJ10sXG4gICAgamFsYWxpOiBbJzE0MDAtMDEtMDEnLCAnMTQwMS0wMS0wMSddLFxuICAgIHRhaXdhbjogWycwMTAwLTAxLTAxJywgJzAxMDEtMDEtMDEnXSxcbiAgICB0aGFpOiBbJzI1MDAtMDEtMDEnLCAnMjUwMS0wMS0wMSddLFxuICAgIHVtbWFscXVyYTogWycxNDAwLTAxLTAxJywgJzE0MDEtMDEtMDEnXVxufTtcblxuLypcbiAqIGNvbnZlcnQgZDMgdGVtcGxhdGVzIHRvIHdvcmxkLWNhbGVuZGFycyB0ZW1wbGF0ZXMsIHNvIG91ciB1c2VycyBvbmx5IG5lZWRcbiAqIHRvIGtub3cgZDMncyBzcGVjaWZpZXJzLiBNYXAgc3BhY2UgcGFkZGluZyB0byBubyBwYWRkaW5nLCBhbmQgdW5rbm93biBmaWVsZHNcbiAqIHRvIGFuIHVnbHkgcGxhY2Vob2xkZXJcbiAqL1xudmFyIFVOS05PV04gPSAnIyMnO1xudmFyIGQzVG9Xb3JsZENhbGVuZGFycyA9IHtcbiAgICAnZCc6IHsnMCc6ICdkZCcsICctJzogJ2QnfSwgLy8gMi1kaWdpdCBvciB1bnBhZGRlZCBkYXkgb2YgbW9udGhcbiAgICAnZSc6IHsnMCc6ICdkJywgJy0nOiAnZCd9LCAvLyBhbHRlcm5hdGUsIGFsd2F5cyB1bnBhZGRlZCBkYXkgb2YgbW9udGhcbiAgICAnYSc6IHsnMCc6ICdEJywgJy0nOiAnRCd9LCAvLyBzaG9ydCB3ZWVrZGF5IG5hbWVcbiAgICAnQSc6IHsnMCc6ICdERCcsICctJzogJ0REJ30sIC8vIGZ1bGwgd2Vla2RheSBuYW1lXG4gICAgJ2onOiB7JzAnOiAnb28nLCAnLSc6ICdvJ30sIC8vIDMtZGlnaXQgb3IgdW5wYWRkZWQgZGF5IG9mIHRoZSB5ZWFyXG4gICAgJ1cnOiB7JzAnOiAnd3cnLCAnLSc6ICd3J30sIC8vIDItZGlnaXQgb3IgdW5wYWRkZWQgd2VlayBvZiB0aGUgeWVhciAoTW9uZGF5IGZpcnN0KVxuICAgICdtJzogeycwJzogJ21tJywgJy0nOiAnbSd9LCAvLyAyLWRpZ2l0IG9yIHVucGFkZGVkIG1vbnRoIG51bWJlclxuICAgICdiJzogeycwJzogJ00nLCAnLSc6ICdNJ30sIC8vIHNob3J0IG1vbnRoIG5hbWVcbiAgICAnQic6IHsnMCc6ICdNTScsICctJzogJ01NJ30sIC8vIGZ1bGwgbW9udGggbmFtZVxuICAgICd5JzogeycwJzogJ3l5JywgJy0nOiAneXknfSwgLy8gMi1kaWdpdCB5ZWFyIChtYXAgdW5wYWRkZWQgdG8gemVyby1wYWRkZWQpXG4gICAgJ1knOiB7JzAnOiAneXl5eScsICctJzogJ3l5eXknfSwgLy8gNC1kaWdpdCB5ZWFyIChtYXAgdW5wYWRkZWQgdG8gemVyby1wYWRkZWQpXG4gICAgJ1UnOiBVTktOT1dOLCAvLyBTdW5kYXktZmlyc3Qgd2VlayBvZiB0aGUgeWVhclxuICAgICd3JzogVU5LTk9XTiwgLy8gZGF5IG9mIHRoZSB3ZWVrIFswKHN1bmRheSksNl1cbiAgICAvLyBjb21iaW5lZCBmb3JtYXQsIHdlIHJlcGxhY2UgdGhlIGRhdGUgcGFydCB3aXRoIHRoZSB3b3JsZC1jYWxlbmRhciB2ZXJzaW9uXG4gICAgLy8gYW5kIHRoZSAlWCBzdGF5cyB0aGVyZSBmb3IgZDMgdG8gaGFuZGxlIHdpdGggdGltZSBwYXJ0c1xuICAgICdjJzogeycwJzogJ0QgTSBkICVYIHl5eXknLCAnLSc6ICdEIE0gZCAlWCB5eXl5J30sXG4gICAgJ3gnOiB7JzAnOiAnbW0vZGQveXl5eScsICctJzogJ21tL2RkL3l5eXknfVxufTtcblxuZnVuY3Rpb24gd29ybGRDYWxGbXQoZm10LCB4LCBjYWxlbmRhcikge1xuICAgIHZhciBkYXRlSkQgPSBNYXRoLmZsb29yKCh4ICsgMC4wNSkgLyBPTkVEQVkpICsgRVBPQ0hKRDtcbiAgICB2YXIgY0RhdGUgPSBnZXRDYWwoY2FsZW5kYXIpLmZyb21KRChkYXRlSkQpO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbW9kaWZpZXIsIGRpcmVjdGl2ZSwgZGlyZWN0aXZlTGVuLCBkaXJlY3RpdmVPYmosIHJlcGxhY2VtZW50UGFydDtcblxuICAgIHdoaWxlKChpID0gZm10LmluZGV4T2YoJyUnLCBpKSkgIT09IC0xKSB7XG4gICAgICAgIG1vZGlmaWVyID0gZm10LmNoYXJBdChpICsgMSk7XG4gICAgICAgIGlmKG1vZGlmaWVyID09PSAnMCcgfHwgbW9kaWZpZXIgPT09ICctJyB8fCBtb2RpZmllciA9PT0gJ18nKSB7XG4gICAgICAgICAgICBkaXJlY3RpdmVMZW4gPSAzO1xuICAgICAgICAgICAgZGlyZWN0aXZlID0gZm10LmNoYXJBdChpICsgMik7XG4gICAgICAgICAgICBpZihtb2RpZmllciA9PT0gJ18nKSBtb2RpZmllciA9ICctJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZSA9IG1vZGlmaWVyO1xuICAgICAgICAgICAgbW9kaWZpZXIgPSAnMCc7XG4gICAgICAgICAgICBkaXJlY3RpdmVMZW4gPSAyO1xuICAgICAgICB9XG4gICAgICAgIGRpcmVjdGl2ZU9iaiA9IGQzVG9Xb3JsZENhbGVuZGFyc1tkaXJlY3RpdmVdO1xuICAgICAgICBpZighZGlyZWN0aXZlT2JqKSB7XG4gICAgICAgICAgICBpICs9IGRpcmVjdGl2ZUxlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvZGUgaXMgcmVjb2duaXplZCBhcyBhIGRhdGUgcGFydCBidXQgd29ybGQtY2FsZW5kYXJzIGRvZXNuJ3Qgc3VwcG9ydCBpdFxuICAgICAgICAgICAgaWYoZGlyZWN0aXZlT2JqID09PSBVTktOT1dOKSByZXBsYWNlbWVudFBhcnQgPSBVTktOT1dOO1xuXG4gICAgICAgICAgICAvLyBmb3JtYXQgdGhlIGNEYXRlIGFjY29yZGluZyB0byB0aGUgdHJhbnNsYXRlZCBkaXJlY3RpdmVcbiAgICAgICAgICAgIGVsc2UgcmVwbGFjZW1lbnRQYXJ0ID0gY0RhdGUuZm9ybWF0RGF0ZShkaXJlY3RpdmVPYmpbbW9kaWZpZXJdKTtcblxuICAgICAgICAgICAgZm10ID0gZm10LnN1YnN0cigwLCBpKSArIHJlcGxhY2VtZW50UGFydCArIGZtdC5zdWJzdHIoaSArIGRpcmVjdGl2ZUxlbik7XG4gICAgICAgICAgICBpICs9IHJlcGxhY2VtZW50UGFydC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZtdDtcbn1cblxuLy8gY2FjaGUgd29ybGQgY2FsZW5kYXJzLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlaW5zdGFudGlhdGVcbi8vIGR1cmluZyBlYWNoIGRhdGUtdGltZSBjb252ZXJzaW9uXG52YXIgYWxsQ2FscyA9IHt9O1xuZnVuY3Rpb24gZ2V0Q2FsKGNhbGVuZGFyKSB7XG4gICAgdmFyIGNhbGVuZGFyT2JqID0gYWxsQ2Fsc1tjYWxlbmRhcl07XG4gICAgaWYoY2FsZW5kYXJPYmopIHJldHVybiBjYWxlbmRhck9iajtcblxuICAgIGNhbGVuZGFyT2JqID0gYWxsQ2Fsc1tjYWxlbmRhcl0gPSBjYWxlbmRhcnMuaW5zdGFuY2UoY2FsZW5kYXIpO1xuICAgIHJldHVybiBjYWxlbmRhck9iajtcbn1cblxuZnVuY3Rpb24gbWFrZUF0dHJzKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIExpYi5leHRlbmRGbGF0KHt9LCBhdHRyaWJ1dGVzLCB7IGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB9KTtcbn1cblxuZnVuY3Rpb24gbWFrZVRyYWNlQXR0cnNEZXNjcmlwdGlvbihjb29yZCkge1xuICAgIHJldHVybiAnU2V0cyB0aGUgY2FsZW5kYXIgc3lzdGVtIHRvIHVzZSB3aXRoIGAnICsgY29vcmQgKyAnYCBkYXRlIGRhdGEuJztcbn1cblxudmFyIHhBdHRycyA9IHtcbiAgICB4Y2FsZW5kYXI6IG1ha2VBdHRycyhtYWtlVHJhY2VBdHRyc0Rlc2NyaXB0aW9uKCd4JykpXG59O1xuXG52YXIgeHlBdHRycyA9IExpYi5leHRlbmRGbGF0KHt9LCB4QXR0cnMsIHtcbiAgICB5Y2FsZW5kYXI6IG1ha2VBdHRycyhtYWtlVHJhY2VBdHRyc0Rlc2NyaXB0aW9uKCd5JykpXG59KTtcblxudmFyIHh5ekF0dHJzID0gTGliLmV4dGVuZEZsYXQoe30sIHh5QXR0cnMsIHtcbiAgICB6Y2FsZW5kYXI6IG1ha2VBdHRycyhtYWtlVHJhY2VBdHRyc0Rlc2NyaXB0aW9uKCd6JykpXG59KTtcblxudmFyIGF4aXNBdHRycyA9IG1ha2VBdHRycyhbXG4gICAgJ1NldHMgdGhlIGNhbGVuZGFyIHN5c3RlbSB0byB1c2UgZm9yIGByYW5nZWAgYW5kIGB0aWNrMGAnLFxuICAgICdpZiB0aGlzIGlzIGEgZGF0ZSBheGlzLiBUaGlzIGRvZXMgbm90IHNldCB0aGUgY2FsZW5kYXIgZm9yJyxcbiAgICAnaW50ZXJwcmV0aW5nIGRhdGEgb24gdGhpcyBheGlzLCB0aGF0XFwncyBzcGVjaWZpZWQgaW4gdGhlIHRyYWNlJyxcbiAgICAnb3IgdmlhIHRoZSBnbG9iYWwgYGxheW91dC5jYWxlbmRhcmAnXG5dLmpvaW4oJyAnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICdjb21wb25lbnQnLFxuICAgIG5hbWU6ICdjYWxlbmRhcnMnLFxuXG4gICAgc2NoZW1hOiB7XG4gICAgICAgIHRyYWNlczoge1xuICAgICAgICAgICAgc2NhdHRlcjogeHlBdHRycyxcbiAgICAgICAgICAgIGJhcjogeHlBdHRycyxcbiAgICAgICAgICAgIGJveDogeHlBdHRycyxcbiAgICAgICAgICAgIGhlYXRtYXA6IHh5QXR0cnMsXG4gICAgICAgICAgICBjb250b3VyOiB4eUF0dHJzLFxuICAgICAgICAgICAgaGlzdG9ncmFtOiB4eUF0dHJzLFxuICAgICAgICAgICAgaGlzdG9ncmFtMmQ6IHh5QXR0cnMsXG4gICAgICAgICAgICBoaXN0b2dyYW0yZGNvbnRvdXI6IHh5QXR0cnMsXG4gICAgICAgICAgICBzY2F0dGVyM2Q6IHh5ekF0dHJzLFxuICAgICAgICAgICAgc3VyZmFjZTogeHl6QXR0cnMsXG4gICAgICAgICAgICBtZXNoM2Q6IHh5ekF0dHJzLFxuICAgICAgICAgICAgc2NhdHRlcmdsOiB4eUF0dHJzLFxuICAgICAgICAgICAgb2hsYzogeEF0dHJzLFxuICAgICAgICAgICAgY2FuZGxlc3RpY2s6IHhBdHRyc1xuICAgICAgICB9LFxuICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgIGNhbGVuZGFyOiBtYWtlQXR0cnMoW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBkZWZhdWx0IGNhbGVuZGFyIHN5c3RlbSB0byB1c2UgZm9yIGludGVycHJldGluZyBhbmQnLFxuICAgICAgICAgICAgICAgICdkaXNwbGF5aW5nIGRhdGVzIHRocm91Z2hvdXQgdGhlIHBsb3QuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJykpXG4gICAgICAgIH0sXG4gICAgICAgIHN1YnBsb3RzOiB7XG4gICAgICAgICAgICB4YXhpczoge2NhbGVuZGFyOiBheGlzQXR0cnN9LFxuICAgICAgICAgICAgeWF4aXM6IHtjYWxlbmRhcjogYXhpc0F0dHJzfSxcbiAgICAgICAgICAgIHNjZW5lOiB7XG4gICAgICAgICAgICAgICAgeGF4aXM6IHtjYWxlbmRhcjogYXhpc0F0dHJzfSxcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpdCdzIGFjdHVhbGx5IHJlZHVuZGFudCB0byBpbmNsdWRlIHlheGlzIGFuZCB6YXhpcyBoZXJlXG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSBpbiB0aGUgc2NlbmUgYXR0cmlidXRlcyB0aGVzZSBhcmUgdGhlIHNhbWUgb2JqZWN0IHNvIG1lcmdpbmdcbiAgICAgICAgICAgICAgICAvLyBpbnRvIG9uZSBtZXJnZXMgaW50byB0aGVtIGFsbC4gSG93ZXZlciwgSSBsZWZ0IHRoZW0gaW4gZm9yIHBhcml0eSB3aXRoXG4gICAgICAgICAgICAgICAgLy8gY2FydGVzaWFuLCB3aGVyZSB5YXhpcyBpcyB1bnVzZWQgdW50aWwgd2UgUGxvdHNjaGVtYS5nZXQoKSB3aGVuIHdlXG4gICAgICAgICAgICAgICAgLy8gdXNlIGl0cyBwcmVzZW5jZSBvciBhYnNlbmNlIHRvIGRldGVybWluZSB3aGV0aGVyIHRvIGRlbGV0ZSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgLy8gZnJvbSB5YXhpcyBpZiB0aGV5IG9ubHkgYXBwbHkgdG8geCAocmFuZ2VzZWxlY3Rvci9yYW5nZXNsaWRlcilcbiAgICAgICAgICAgICAgICB5YXhpczoge2NhbGVuZGFyOiBheGlzQXR0cnN9LFxuICAgICAgICAgICAgICAgIHpheGlzOiB7Y2FsZW5kYXI6IGF4aXNBdHRyc31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb2xhcjoge1xuICAgICAgICAgICAgICAgIHJhZGlhbGF4aXM6IHtjYWxlbmRhcjogYXhpc0F0dHJzfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cmFuc2Zvcm1zOiB7XG4gICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZWNhbGVuZGFyOiBtYWtlQXR0cnMoW1xuICAgICAgICAgICAgICAgICAgICAnU2V0cyB0aGUgY2FsZW5kYXIgc3lzdGVtIHRvIHVzZSBmb3IgYHZhbHVlYCwgaWYgaXQgaXMgYSBkYXRlLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0Y2FsZW5kYXI6IG1ha2VBdHRycyhbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjYWxlbmRhciBzeXN0ZW0gdG8gdXNlIGZvciBgdGFyZ2V0YCwgaWYgaXQgaXMgYW4nLFxuICAgICAgICAgICAgICAgICAgICAnYXJyYXkgb2YgZGF0ZXMuIElmIGB0YXJnZXRgIGlzIGEgc3RyaW5nIChlZyAqeCopIHdlIHVzZSB0aGUnLFxuICAgICAgICAgICAgICAgICAgICAnY29ycmVzcG9uZGluZyB0cmFjZSBhdHRyaWJ1dGUgKGVnIGB4Y2FsZW5kYXJgKSBpZiBpdCBleGlzdHMsJyxcbiAgICAgICAgICAgICAgICAgICAgJ2V2ZW4gaWYgYHRhcmdldGNhbGVuZGFyYCBpcyBwcm92aWRlZC4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJykpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGF5b3V0QXR0cmlidXRlczogYXR0cmlidXRlcyxcblxuICAgIGhhbmRsZURlZmF1bHRzOiBoYW5kbGVEZWZhdWx0cyxcbiAgICBoYW5kbGVUcmFjZURlZmF1bHRzOiBoYW5kbGVUcmFjZURlZmF1bHRzLFxuXG4gICAgQ0FOT05JQ0FMX1NVTkRBWTogQ0FOT05JQ0FMX1NVTkRBWSxcbiAgICBDQU5PTklDQUxfVElDSzogQ0FOT05JQ0FMX1RJQ0ssXG4gICAgREZMVFJBTkdFOiBERkxUUkFOR0UsXG5cbiAgICBnZXRDYWw6IGdldENhbCxcbiAgICB3b3JsZENhbEZtdDogd29ybGRDYWxGbXRcbn07XG4iLCIvKlxuICogV29ybGQgQ2FsZW5kYXJzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxleGNqb2huc29uL3dvcmxkLWNhbGVuZGFyc1xuICpcbiAqIEJhdGNoLWNvbnZlcnRlZCBmcm9tIGtid29vZC9jYWxlbmRhcnNcbiAqIE1hbnkgdGhhbmtzIHRvIEtlaXRoIFdvb2QgYW5kIGFsbCBvZiB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSBvcmlnaW5hbCBwcm9qZWN0IVxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbu+7vy8qIGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY2FsZW5kYXJzLmh0bWxcbiAgIFRyYWRpdGlvbmFsIENoaW5lc2UgY2FsZW5kYXIgZm9yIGpRdWVyeSB2Mi4wLjIuXG4gICBXcml0dGVuIGJ5IE5pY29sYXMgUmllc2NvIChlbnF1aXJpZXNAbmljb2xhc3JpZXNjby5uZXQpIERlY2VtYmVyIDIwMTYuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBtYWluID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuXG52YXIgZ3JlZ29yaWFuQ2FsZW5kYXIgPSBtYWluLmluc3RhbmNlKCk7XG5cbi8qKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgdHJhZGl0aW9uYWwgQ2hpbmVzZSBjYWxlbmRhci5cbiAgICBTb3VyY2Ugb2YgY2FsZW5kYXIgdGFibGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9pc2VlMTUvTHVuYXItU29sYXItQ2FsZW5kYXItQ29udmVydGVyIC5cbiAgICBAY2xhc3MgQ2hpbmVzZUNhbGVuZGFyXG4gICAgQHBhcmFtIFtsYW5ndWFnZT0nJ10ge3N0cmluZ30gVGhlIGxhbmd1YWdlIGNvZGUgKGRlZmF1bHQgRW5nbGlzaCkgZm9yIGxvY2FsaXNhdGlvbi4gKi9cbmZ1bmN0aW9uIENoaW5lc2VDYWxlbmRhcihsYW5ndWFnZSkge1xuICAgIHRoaXMubG9jYWwgPSB0aGlzLnJlZ2lvbmFsT3B0aW9uc1tsYW5ndWFnZSB8fCAnJ10gfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddO1xufVxuXG5DaGluZXNlQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oQ2hpbmVzZUNhbGVuZGFyLnByb3RvdHlwZSwge1xuICAgIC8qKiBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhciAqL1xuICAgIG5hbWU6ICdDaGluZXNlJyxcbiAgICAgLyoqIEp1bGlhbiBkYXRlIG9mIHN0YXJ0IG9mIEdyZWdvcmlhbiBlcG9jaDogMSBKYW51YXJ5IDAwMDEgQ0UuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhciAqL1xuICAgIGpkRXBvY2g6IDE3MjE0MjUuNSxcbiAgICAvKiogPGNvZGU+dHJ1ZTwvY29kZT4gaWYgaGFzIGEgeWVhciB6ZXJvLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAbWVtYmVyb2YgQ2hpbmVzZUNhbGVuZGFyICovXG4gICAgaGFzWWVhclplcm86IGZhbHNlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIFRoaXMgY2FsZW5kYXIgdXNlcyBtb250aCBpbmRpY2VzIHRvIGFjY291bnQgZm9yIGludGVyY2FsYXJ5IG1vbnRocy4gXG4gICAgICAgIEBtZW1iZXJvZiBDaGluZXNlQ2FsZW5kYXIgKi9cbiAgICBtaW5Nb250aDogMCxcbiAgICAvKiogVGhlIGZpcnN0IG1vbnRoIGluIHRoZSB5ZWFyLlxuICAgICAgICBUaGlzIGNhbGVuZGFyIHVzZXMgbW9udGggaW5kaWNlcyB0byBhY2NvdW50IGZvciBpbnRlcmNhbGFyeSBtb250aHMuIFxuICAgICAgICBAbWVtYmVyb2YgQ2hpbmVzZUNhbGVuZGFyICovXG4gICAgZmlyc3RNb250aDogMCxcbiAgICAvKiogVGhlIG1pbmltdW0gZGF5IG51bWJlci5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgQ2hpbmVzZUNhbGVuZGFyXG4gICAgICAgIEBwcm9wZXJ0eSBuYW1lIHtzdHJpbmd9IFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAcHJvcGVydHkgZXBvY2hzIHtzdHJpbmdbXX0gVGhlIGVwb2NoIG5hbWVzLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNNaW4ge3N0cmluZ1tdfSBUaGUgbWluaW1hbCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRhdGVGb3JtYXQge3N0cmluZ30gVGhlIGRhdGUgZm9ybWF0IGZvciB0aGlzIGNhbGVuZGFyLlxuICAgICAgICAgICAgICAgIFNlZSB0aGUgb3B0aW9ucyBvbiA8YSBocmVmPVwiQmFzZUNhbGVuZGFyLmh0bWwjZm9ybWF0RGF0ZVwiPjxjb2RlPmZvcm1hdERhdGU8L2NvZGU+PC9hPiBmb3IgZGV0YWlscy5cbiAgICAgICAgQHByb3BlcnR5IGZpcnN0RGF5IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlaywgc3RhcnRpbmcgYXQgMC5cbiAgICAgICAgQHByb3BlcnR5IGlzUlRMIHtudW1iZXJ9IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgbG9jYWxpc2F0aW9uIHJlYWRzIHJpZ2h0LXRvLWxlZnQuICovXG4gICAgcmVnaW9uYWxPcHRpb25zOiB7IC8vIExvY2FsaXNhdGlvbnNcbiAgICAgICAgJyc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdDaGluZXNlJyxcbiAgICAgICAgICAgIGVwb2NoczogWydCRUMnLCAnRUMnXSxcbiAgICAgICAgICAgIG1vbnRoTnVtYmVyczogZnVuY3Rpb24oZGF0ZSwgcGFkZGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBkYXRlLm1hdGNoKE1PTlRIX05VTUJFUl9SRUdFWFApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG1hdGNoKSA/IG1hdGNoWzBdIDogJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHllYXIgPSB0aGlzLl92YWxpZGF0ZVllYXIoZGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLm1vbnRoKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSAnJyArIHRoaXMudG9DaGluZXNlTW9udGgoeWVhciwgbW9udGhJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFkZGVkICYmIG1vbnRoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIjBcIiArIG1vbnRoO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW50ZXJjYWxhcnlNb250aCh5ZWFyLCBtb250aEluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICBtb250aCArPSAnaSc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGRhdGUubWF0Y2goTU9OVEhfTkFNRV9SRUdFWFApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG1hdGNoKSA/IG1hdGNoWzBdIDogJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHllYXIgPSB0aGlzLl92YWxpZGF0ZVllYXIoZGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLm1vbnRoKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSB0aGlzLnRvQ2hpbmVzZU1vbnRoKHllYXIsIG1vbnRoSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoTmFtZSA9IFsn5LiA5pyIJywn5LqM5pyIJywn5LiJ5pyIJywn5Zub5pyIJywn5LqU5pyIJywn5YWt5pyIJyxcbiAgICAgICAgICAgICAgICAgICAgJ+S4g+aciCcsJ+WFq+aciCcsJ+S5neaciCcsJ+WNgeaciCcsJ+WNgeS4gOaciCcsJ+WNgeS6jOaciCddW21vbnRoIC0gMV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ludGVyY2FsYXJ5TW9udGgoeWVhciwgbW9udGhJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lID0gJ+mXsCcgKyBtb250aE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoTmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGRhdGUubWF0Y2goTU9OVEhfU0hPUlRfTkFNRV9SRUdFWFApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG1hdGNoKSA/IG1hdGNoWzBdIDogJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHllYXIgPSB0aGlzLl92YWxpZGF0ZVllYXIoZGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLm1vbnRoKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSB0aGlzLnRvQ2hpbmVzZU1vbnRoKHllYXIsIG1vbnRoSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoTmFtZSA9IFsn5LiAJywn5LqMJywn5LiJJywn5ZubJywn5LqUJywn5YWtJyxcbiAgICAgICAgICAgICAgICAgICAgJ+S4gycsJ+WFqycsJ+S5nScsJ+WNgScsJ+WNgeS4gCcsJ+WNgeS6jCddW21vbnRoIC0gMV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ludGVyY2FsYXJ5TW9udGgoeWVhciwgbW9udGhJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lID0gJ+mXsCcgKyBtb250aE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoTmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJzZU1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aFN0cmluZykge1xuICAgICAgICAgICAgICAgIHllYXIgPSB0aGlzLl92YWxpZGF0ZVllYXIoeWVhcik7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoID0gcGFyc2VJbnQobW9udGhTdHJpbmcpO1xuICAgICAgICAgICAgICAgIHZhciBpc0ludGVyY2FsYXJ5O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtb250aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBtb250aFN0cmluZ1ttb250aFN0cmluZy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaXNJbnRlcmNhbGFyeSA9IChpID09PSAnaScgfHwgaSA9PT0gJ0knKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9udGhTdHJpbmdbMF0gPT09ICfpl7AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0ludGVyY2FsYXJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoU3RyaW5nID0gbW9udGhTdHJpbmcuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb250aFN0cmluZ1ttb250aFN0cmluZy5sZW5ndGggLSAxXSA9PT0gJ+aciCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoU3RyaW5nID0gbW9udGhTdHJpbmcuc3Vic3RyaW5nKDAsIG1vbnRoU3RyaW5nLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gMSArXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ+S4gCcsJ+S6jCcsJ+S4iScsJ+WbmycsJ+S6lCcsJ+WFrScsXG4gICAgICAgICAgICAgICAgICAgICAgICAn5LiDJywn5YWrJywn5LmdJywn5Y2BJywn5Y2B5LiAJywn5Y2B5LqMJ10uaW5kZXhPZihtb250aFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoSW5kZXggPSB0aGlzLnRvTW9udGhJbmRleCh5ZWFyLCBtb250aCwgaXNJbnRlcmNhbGFyeSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoSW5kZXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcbiAgICAgICAgICAgIGRheU5hbWVzU2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gICAgICAgICAgICBkYXlOYW1lc01pbjogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ3l5eXkvbW0vZGQnLFxuICAgICAgICAgICAgZmlyc3REYXk6IDEsXG4gICAgICAgICAgICBpc1JUTDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogQ2hlY2sgdGhhdCBhIGNhbmRpZGF0ZSBkYXRlIGlzIGZyb20gdGhlIHNhbWUgY2FsZW5kYXIgYW5kIGlzIHZhbGlkLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwcml2YXRlXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIG9yIHRoZSB5ZWFyIHRvIHZhbGlkYXRlLlxuICAgICAgICBAcGFyYW0gZXJyb3Ige3N0cmluZ30gRXJyb3IgbWVzc2FnZSBpZiBpbnZhbGlkLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB5ZWFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIHllYXIgb3V0IG9mIHJhbmdlLiAqL1xuICAgIF92YWxpZGF0ZVllYXI6IGZ1bmN0aW9uKHllYXIsIGVycm9yKSB7XG4gICAgICAgIGlmICh5ZWFyLnllYXIpIHtcbiAgICAgICAgICAgIHllYXIgPSB5ZWFyLnllYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgeWVhciAhPT0gJ251bWJlcicgfHwgeWVhciA8IDE4ODggfHwgeWVhciA+IDIxMTEpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yLnJlcGxhY2UoL1xcezBcXH0vLCB0aGlzLmxvY2FsLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHllYXI7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbW9udGggaW5kZXggKGkuZS4gYWNjb3VudGluZyBmb3IgaW50ZXJjYWxhcnkgbW9udGhzKS5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7bnVtYmVyfSBUaGUgeWVhci5cbiAgICAgICAgQHBhcmFtIG1vbnRoIHtudW1iZXJ9IFRoZSBtb250aCAoMSBmb3IgZmlyc3QgbW9udGgpLlxuICAgICAgICBAcGFyYW0gW2lzSW50ZXJjYWxhcnk9ZmFsc2VdIHtib29sZWFufSBJZiBtb250aCBpcyBpbnRlcmNhbGFyeS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbW9udGggaW5kZXggKDAgZm9yIGZpcnN0IG1vbnRoKS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIG1vbnRoL3llYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b01vbnRoSW5kZXg6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBpc0ludGVyY2FsYXJ5KSB7XG4gICAgICAgIC8vIGNvbXB1dGUgaW50ZXJjYWxhcnkgbW9udGggaW4gdGhlIHllYXIgKDAgaWYgbm9uZSlcbiAgICAgICAgdmFyIGludGVyY2FsYXJ5TW9udGggPSB0aGlzLmludGVyY2FsYXJ5TW9udGgoeWVhcik7XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgbW9udGhcbiAgICAgICAgdmFyIGludmFsaWRJbnRlcmNhbGFyeU1vbnRoID0gXG4gICAgICAgICAgICAoaXNJbnRlcmNhbGFyeSAmJiBtb250aCAhPT0gaW50ZXJjYWxhcnlNb250aCk7XG4gICAgICAgIGlmIChpbnZhbGlkSW50ZXJjYWxhcnlNb250aCB8fCBtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xuICAgICAgICAgICAgdGhyb3cgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGhcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFx7MFxcfS8sIHRoaXMubG9jYWwubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb21wdXRlIG1vbnRoIGluZGV4XG4gICAgICAgIHZhciBtb250aEluZGV4O1xuXG4gICAgICAgIGlmICghaW50ZXJjYWxhcnlNb250aCkge1xuICAgICAgICAgICAgbW9udGhJbmRleCA9IG1vbnRoIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmKCFpc0ludGVyY2FsYXJ5ICYmIG1vbnRoIDw9IGludGVyY2FsYXJ5TW9udGgpIHtcbiAgICAgICAgICAgIG1vbnRoSW5kZXggPSBtb250aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb250aEluZGV4ID0gbW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9udGhJbmRleDtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBtb250aCAoaS5lLiBhY2NvdW50aW5nIGZvciBpbnRlcmNhbGFyeSBtb250aHMpLlxuICAgICAgICBAbWVtYmVyb2YgQ2hpbmVzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBtb250aEluZGV4IHtudW1iZXJ9IFRoZSBtb250aCBpbmRleCAoMCBmb3IgZmlyc3QgbW9udGgpLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtb250aCAoMSBmb3IgZmlyc3QgbW9udGgpLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHRvQ2hpbmVzZU1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aEluZGV4KSB7XG4gICAgICAgIGlmICh5ZWFyLnllYXIpIHtcbiAgICAgICAgICAgIHllYXIgPSB5ZWFyLnllYXIoKTtcbiAgICAgICAgICAgIG1vbnRoSW5kZXggPSB5ZWFyLm1vbnRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb21wdXRlIGludGVyY2FsYXJ5IG1vbnRoIGluIHRoZSB5ZWFyICgwIGlmIG5vbmUpXG4gICAgICAgIHZhciBpbnRlcmNhbGFyeU1vbnRoID0gdGhpcy5pbnRlcmNhbGFyeU1vbnRoKHllYXIpO1xuXG4gICAgICAgIC8vIHZhbGlkYXRlIG1vbnRoXG4gICAgICAgIHZhciBtYXhNb250aEluZGV4ID0gKGludGVyY2FsYXJ5TW9udGgpID8gMTIgOiAxMTtcbiAgICAgICAgaWYgKG1vbnRoSW5kZXggPCAwIHx8IG1vbnRoSW5kZXggPiBtYXhNb250aEluZGV4KSB7XG4gICAgICAgICAgICB0aHJvdyBtYWluLmxvY2FsLmludmFsaWRNb250aFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHswXFx9LywgdGhpcy5sb2NhbC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbXB1dGUgQ2hpbmVzZSBtb250aFxuICAgICAgICB2YXIgbW9udGg7XG5cbiAgICAgICAgaWYgKCFpbnRlcmNhbGFyeU1vbnRoKSB7XG4gICAgICAgICAgICBtb250aCA9IG1vbnRoSW5kZXggKyAxO1xuICAgICAgICB9IGVsc2UgaWYobW9udGhJbmRleCA8IGludGVyY2FsYXJ5TW9udGgpIHtcbiAgICAgICAgICAgIG1vbnRoID0gbW9udGhJbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb250aCA9IG1vbnRoSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9udGg7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIGludGVyY2FsYXJ5IG1vbnRoIG9mIGEgeWVhciAoaWYgYW55KS5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGludGVyY2FsYXJ5IG1vbnRoIG51bWJlciwgb3IgMCBpZiBub25lLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGludGVyY2FsYXJ5TW9udGg6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgeWVhciA9IHRoaXMuX3ZhbGlkYXRlWWVhcih5ZWFyKTtcblxuICAgICAgICB2YXIgbW9udGhEYXlzVGFibGUgPSBMVU5BUl9NT05USF9EQVlTW3llYXIgLSBMVU5BUl9NT05USF9EQVlTWzBdXTtcbiAgICAgICAgdmFyIGludGVyY2FsYXJ5TW9udGggPSBtb250aERheXNUYWJsZSA+PiAxMztcblxuICAgICAgICByZXR1cm4gaW50ZXJjYWxhcnlNb250aDtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBhbiBpbnRlcmNhbGFyeSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhJbmRleF0ge251bWJlcn0gVGhlIG1vbnRoIGluZGV4IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYW4gaW50ZXJjYWxhcnkgbW9udGgsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgaXNJbnRlcmNhbGFyeU1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aEluZGV4KSB7XG4gICAgICAgIGlmICh5ZWFyLnllYXIpIHtcbiAgICAgICAgICAgIHllYXIgPSB5ZWFyLnllYXIoKTtcbiAgICAgICAgICAgIG1vbnRoSW5kZXggPSB5ZWFyLm1vbnRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW50ZXJjYWxhcnlNb250aCA9IHRoaXMuaW50ZXJjYWxhcnlNb250aCh5ZWFyKTtcblxuICAgICAgICByZXR1cm4gISFpbnRlcmNhbGFyeU1vbnRoICYmIGludGVyY2FsYXJ5TW9udGggPT09IG1vbnRoSW5kZXg7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgaW4gYSBsZWFwIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBDaGluZXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGlzIGEgbGVhcCB5ZWFyLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGxlYXBZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbnRlcmNhbGFyeU1vbnRoKHllYXIpICE9PSAwKTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB0aGUgd2VlayBvZiB0aGUgeWVhciBmb3IgYSBkYXRlIC0gSVNPIDg2MDEuXG4gICAgICAgIEBtZW1iZXJvZiBDaGluZXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoSW5kZXhdIHtudW1iZXJ9IFRoZSBtb250aCBpbmRleCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoSW5kZXgsIGRheSkge1xuICAgICAgICAvLyBjb21wdXRlIENoaW5lc2UgbmV3IHllYXJcbiAgICAgICAgdmFyIHZhbGlkYXRlZFllYXIgPVxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVZZWFyKHllYXIsIG1haW4ubG9jYWwuaW52YWxpZHllYXIpO1xuICAgICAgICB2YXIgcGFja2VkRGF0ZSA9XG4gICAgICAgICAgICBDSElORVNFX05FV19ZRUFSW3ZhbGlkYXRlZFllYXIgLSBDSElORVNFX05FV19ZRUFSWzBdXTtcblxuICAgICAgICB2YXIgeSA9IChwYWNrZWREYXRlID4+IDkpICYgMHhGRkY7XG4gICAgICAgIHZhciBtID0gKHBhY2tlZERhdGUgPj4gNSkgJiAweDBGO1xuICAgICAgICB2YXIgZCA9IHBhY2tlZERhdGUgJiAweDFGO1xuICAgICAgICBcbiAgICAgICAgLy8gZmluZCBmaXJzdCBUaHJ1c2RheSBvZiB0aGUgeWVhclxuICAgICAgICB2YXIgZmlyc3RUaHVyc2RheTtcbiAgICAgICAgZmlyc3RUaHVyc2RheSA9IGdyZWdvcmlhbkNhbGVuZGFyLm5ld0RhdGUoeSwgbSwgZCk7XG4gICAgICAgIGZpcnN0VGh1cnNkYXkuYWRkKDQgLSAoZmlyc3RUaHVyc2RheS5kYXlPZldlZWsoKSB8fCA3KSwgJ2QnKTtcblxuICAgICAgICAvLyBjb21wdXRlIGRheXMgZnJvbSBmaXJzdCBUaHVyc2RheVxuICAgICAgICB2YXIgb2Zmc2V0ID1cbiAgICAgICAgICAgIHRoaXMudG9KRCh5ZWFyLCBtb250aEluZGV4LCBkYXkpIC0gZmlyc3RUaHVyc2RheS50b0pEKCk7XG4gICAgICAgIHJldHVybiAxICsgTWF0aC5mbG9vcihvZmZzZXQgLyA3KTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgbW9udGhzIGluIGEgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBtb250aHMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbW9udGhzSW5ZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5sZWFwWWVhcih5ZWFyKSkgPyAxMyA6IDEyO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBDaGluZXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciBvZiB0aGUgbW9udGguXG4gICAgICAgIEBwYXJhbSBbbW9udGhJbmRleF0ge251bWJlcn0gVGhlIG1vbnRoIGluZGV4LlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aEluZGV4KSB7XG4gICAgICAgIGlmICh5ZWFyLnllYXIpIHtcbiAgICAgICAgICAgIG1vbnRoSW5kZXggPSB5ZWFyLm1vbnRoKCk7XG4gICAgICAgICAgICB5ZWFyID0geWVhci55ZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB5ZWFyID0gdGhpcy5fdmFsaWRhdGVZZWFyKHllYXIpO1xuXG4gICAgICAgIHZhciBtb250aERheXNUYWJsZSA9IExVTkFSX01PTlRIX0RBWVNbeWVhciAtIExVTkFSX01PTlRIX0RBWVNbMF1dO1xuXG4gICAgICAgIHZhciBpbnRlcmNhbGFyeU1vbnRoID0gbW9udGhEYXlzVGFibGUgPj4gMTM7XG4gICAgICAgIHZhciBtYXhNb250aEluZGV4ID0gKGludGVyY2FsYXJ5TW9udGgpID8gMTIgOiAxMTtcbiAgICAgICAgaWYgKG1vbnRoSW5kZXggPiBtYXhNb250aEluZGV4KSB7XG4gICAgICAgICAgICB0aHJvdyBtYWluLmxvY2FsLmludmFsaWRNb250aFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHswXFx9LywgdGhpcy5sb2NhbC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXlzSW5Nb250aCA9IChtb250aERheXNUYWJsZSAmICgxIDw8ICgxMiAtIG1vbnRoSW5kZXgpKSkgP1xuICAgICAgICAgICAgMzAgOiAyOTtcblxuICAgICAgICByZXR1cm4gZGF5c0luTW9udGg7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhJbmRleF0ge251bWJlcn0gVGhlIG1vbnRoIGluZGV4IHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgd2VlayBkYXksIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgd2Vla0RheTogZnVuY3Rpb24oeWVhciwgbW9udGhJbmRleCwgZGF5KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXlPZldlZWsoeWVhciwgbW9udGhJbmRleCwgZGF5KSB8fCA3KSA8IDY7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhJbmRleF0ge251bWJlcn0gVGhlIG1vbnRoIGluZGV4IHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGVxdWl2YWxlbnQgSnVsaWFuIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KRDogZnVuY3Rpb24oeWVhciwgbW9udGhJbmRleCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHllYXIgPSB0aGlzLl92YWxpZGF0ZVllYXIoZGF0ZS55ZWFyKCkpO1xuICAgICAgICBtb250aEluZGV4ID0gZGF0ZS5tb250aCgpO1xuICAgICAgICBkYXkgPSBkYXRlLmRheSgpO1xuXG4gICAgICAgIHZhciBpc0ludGVyY2FsYXJ5ID0gdGhpcy5pc0ludGVyY2FsYXJ5TW9udGgoeWVhciwgbW9udGhJbmRleCk7XG4gICAgICAgIHZhciBtb250aCA9IHRoaXMudG9DaGluZXNlTW9udGgoeWVhciwgbW9udGhJbmRleCk7XG5cbiAgICAgICAgdmFyIHNvbGFyID0gdG9Tb2xhcih5ZWFyLCBtb250aCwgZGF5LCBpc0ludGVyY2FsYXJ5KTtcblxuICAgICAgICByZXR1cm4gZ3JlZ29yaWFuQ2FsZW5kYXIudG9KRChzb2xhci55ZWFyLCBzb2xhci5tb250aCwgc29sYXIuZGF5KTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIENoaW5lc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0gamQge251bWJlcn0gVGhlIEp1bGlhbiBkYXRlIHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXF1aXZhbGVudCBkYXRlLiAqL1xuICAgIGZyb21KRDogZnVuY3Rpb24oamQpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBncmVnb3JpYW5DYWxlbmRhci5mcm9tSkQoamQpO1xuICAgICAgICB2YXIgbHVuYXIgPSB0b0x1bmFyKGRhdGUueWVhcigpLCBkYXRlLm1vbnRoKCksIGRhdGUuZGF5KCkpO1xuICAgICAgICB2YXIgbW9udGhJbmRleCA9IHRoaXMudG9Nb250aEluZGV4KFxuICAgICAgICAgICAgbHVuYXIueWVhciwgbHVuYXIubW9udGgsIGx1bmFyLmlzSW50ZXJjYWxhcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKGx1bmFyLnllYXIsIG1vbnRoSW5kZXgsIGx1bmFyLmRheSk7XG4gICAgfSxcblxuICAgIC8qKiBDcmVhdGUgYSBuZXcgZGF0ZSBmcm9tIGEgc3RyaW5nLlxuICAgICAgICBAbWVtYmVyb2YgQ2hpbmVzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBkYXRlU3RyaW5nIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRpbmcgYSBDaGluZXNlIGRhdGVcbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBuZXcgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUuICovXG4gICAgZnJvbVN0cmluZzogZnVuY3Rpb24oZGF0ZVN0cmluZykge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkYXRlU3RyaW5nLm1hdGNoKERBVEVfUkVHRVhQKTtcblxuICAgICAgICB2YXIgeWVhciA9IHRoaXMuX3ZhbGlkYXRlWWVhcigrbWF0Y2hbMV0pO1xuXG4gICAgICAgIHZhciBtb250aCA9ICttYXRjaFsyXTtcbiAgICAgICAgdmFyIGlzSW50ZXJjYWxhcnkgPSAhIW1hdGNoWzNdO1xuICAgICAgICB2YXIgbW9udGhJbmRleCA9IHRoaXMudG9Nb250aEluZGV4KHllYXIsIG1vbnRoLCBpc0ludGVyY2FsYXJ5KTtcblxuICAgICAgICB2YXIgZGF5ID0gK21hdGNoWzRdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGhJbmRleCwgZGF5KTtcbiAgICB9LFxuXG4gICAgLyoqIEFkZCBwZXJpb2QocykgdG8gYSBkYXRlLlxuICAgICAgICBDYXRlciBmb3Igbm8geWVhciB6ZXJvLlxuICAgICAgICBAbWVtYmVyb2YgQ2hpbmVzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBkYXRlIHtDRGF0ZX0gVGhlIHN0YXJ0aW5nIGRhdGUuXG4gICAgICAgIEBwYXJhbSBvZmZzZXQge251bWJlcn0gVGhlIG51bWJlciBvZiBwZXJpb2RzIHRvIGFkanVzdCBieS5cbiAgICAgICAgQHBhcmFtIHBlcmlvZCB7c3RyaW5nfSBPbmUgb2YgJ3knIGZvciB5ZWFyLCAnbScgZm9yIG1vbnRoLCAndycgZm9yIHdlZWssICdkJyBmb3IgZGF5LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIHVwZGF0ZWQgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGFkZDogZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0LCBwZXJpb2QpIHtcbiAgICAgICAgdmFyIHllYXIgPSBkYXRlLnllYXIoKTtcbiAgICAgICAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLm1vbnRoKCk7XG4gICAgICAgIHZhciBpc0ludGVyY2FsYXJ5ID0gdGhpcy5pc0ludGVyY2FsYXJ5TW9udGgoeWVhciwgbW9udGhJbmRleCk7XG4gICAgICAgIHZhciBtb250aCA9IHRoaXMudG9DaGluZXNlTW9udGgoeWVhciwgbW9udGhJbmRleCk7XG5cbiAgICAgICAgdmFyIGNkYXRlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKENoaW5lc2VDYWxlbmRhci5wcm90b3R5cGUpXG4gICAgICAgICAgICAuYWRkLmNhbGwodGhpcywgZGF0ZSwgb2Zmc2V0LCBwZXJpb2QpO1xuXG4gICAgICAgIGlmIChwZXJpb2QgPT09ICd5Jykge1xuICAgICAgICAgICAgLy8gUmVzeW5jIG1vbnRoXG4gICAgICAgICAgICB2YXIgcmVzdWx0WWVhciA9IGNkYXRlLnllYXIoKTtcbiAgICAgICAgICAgIHZhciByZXN1bHRNb250aEluZGV4ID0gY2RhdGUubW9udGgoKTtcblxuICAgICAgICAgICAgLy8gVXNpbmcgdGhlIGZhY3QgdGhlIG1vbnRoIGluZGV4IG9mIGFuIGludGVyY2FsYXJ5IG1vbnRoXG4gICAgICAgICAgICAvLyBlcXVhbHMgaXRzIG1vbnRoIG51bWJlcjpcbiAgICAgICAgICAgIHZhciByZXN1bHRDYW5CZUludGVyY2FsYXJ5TW9udGggPVxuICAgICAgICAgICAgICAgIHRoaXMuaXNJbnRlcmNhbGFyeU1vbnRoKHJlc3VsdFllYXIsIG1vbnRoKTtcblxuICAgICAgICAgICAgdmFyIGNvcnJlY3RlZE1vbnRoSW5kZXggPVxuICAgICAgICAgICAgICAgIChpc0ludGVyY2FsYXJ5ICYmIHJlc3VsdENhbkJlSW50ZXJjYWxhcnlNb250aCkgP1xuICAgICAgICAgICAgICAgIHRoaXMudG9Nb250aEluZGV4KHJlc3VsdFllYXIsIG1vbnRoLCB0cnVlKSA6XG4gICAgICAgICAgICAgICAgdGhpcy50b01vbnRoSW5kZXgocmVzdWx0WWVhciwgbW9udGgsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKGNvcnJlY3RlZE1vbnRoSW5kZXggIT09IHJlc3VsdE1vbnRoSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjZGF0ZS5tb250aChjb3JyZWN0ZWRNb250aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZGF0ZTtcbiAgICB9LFxufSk7XG5cbi8vIFVzZWQgYnkgQ2hpbmVzZUNhbGVuZGFyLnByb3RvdHlwZS5mcm9tU3RyaW5nXG52YXIgREFURV9SRUdFWFAgPSAvXlxccyooLT9cXGRcXGRcXGRcXGR8XFxkXFxkKVstL10oXFxkP1xcZCkoW2lJXT8pWy0vXShcXGQ/XFxkKS9tO1xudmFyIE1PTlRIX05VTUJFUl9SRUdFWFAgPSAvXlxcZD9cXGRbaUldPy9tO1xudmFyIE1PTlRIX05BTUVfUkVHRVhQID0gL17pl7A/5Y2BP1vkuIDkuozkuInlm5vkupTlha3kuIPlhavkuZ1dP+aciC9tO1xudmFyIE1PTlRIX1NIT1JUX05BTUVfUkVHRVhQID0gL17pl7A/5Y2BP1vkuIDkuozkuInlm5vkupTlha3kuIPlhavkuZ1dPy9tO1xuXG4vLyBDaGluZXNlIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy5jaGluZXNlID0gQ2hpbmVzZUNhbGVuZGFyO1xuXG4vLyBDaGluZXNlIGNhbGVuZGFyIHRhYmxlcyBmcm9tIHllYXIgMTg4OCB0byAyMTExXG4vL1xuLy8gU291cmNlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2lzZWUxNS9MdW5hci1Tb2xhci1DYWxlbmRhci1Db252ZXJ0ZXIuZ2l0XG5cbi8vIFRhYmxlIG9mIGludGVyY2FsYXJ5IG1vbnRocyBhbmQgZGF5cyBwZXIgbW9udGggZnJvbSB5ZWFyIDE4ODggdG8gMjExMVxuLy9cbi8vIGJpdCAoMTIgLSBpKTogICAgICAgIGRheXMgaW4gdGhlIGledGggbW9udGhcbi8vICAgICAgICAgICAgICAgICAgICAgICg9IDAgaWYgaV50aCBsdW5hciBtb250aCBoYXMgMjkgZGF5cylcbi8vICAgICAgICAgICAgICAgICAgICAgICg9IDEgaWYgaV50aCBsdW5hciBtb250aCBoYXMgMzAgZGF5cylcbi8vICAgICAgICAgICAgICAgICAgICAgIChmaXJzdCBtb250aCBpbiBsdW5hciB5ZWFyIGlzIGkgPSAwKVxuLy8gYml0cyAoMTMsMTQsMTUsMTYpOiAgaW50ZXJjYWxhcnkgbW9udGhcbi8vICAgICAgICAgICAgICAgICAgICAgICg9IDAgaWYgbHVuYXIgeWVhciBoYXMgbm8gaW50ZXJjYWxhcnkgbW9udGgpXG52YXIgTFVOQVJfTU9OVEhfREFZUyA9IFsxODg3LCAweDE2OTQsIDB4MTZhYSwgMHg0YWQ1LFxuICAgIDB4YWI2LCAweGM0YjcsIDB4NGFlLCAweGE1NiwgMHhiNTJhLCAweDFkMmEsIDB4ZDU0LCAweDc1YWEsIDB4MTU2YSxcbiAgICAweDEwOTZkLCAweDk1YywgMHgxNGFlLCAweGFhNGQsIDB4MWE0YywgMHgxYjJhLCAweDhkNTUsIDB4YWQ0LFxuICAgIDB4MTM1YSwgMHg0OTVkLCAweDk1YywgMHhkNDliLCAweDE0OWEsIDB4MWE0YSwgMHhiYWE1LCAweDE2YTgsXG4gICAgMHgxYWQ0LCAweDUyZGEsIDB4MTJiNiwgMHhlOTM3LCAweDkyZSwgMHgxNDk2LCAweGI2NGIsIDB4ZDRhLFxuICAgIDB4ZGE4LCAweDk1YjUsIDB4NTZjLCAweDEyYWUsIDB4NDkyZiwgMHg5MmUsIDB4Y2M5NiwgMHgxYTk0LFxuICAgIDB4MWQ0YSwgMHhhZGE5LCAweGI1YSwgMHg1NmMsIDB4NzI2ZSwgMHgxMjVjLCAweGY5MmQsIDB4MTkyYSxcbiAgICAweDFhOTQsIDB4ZGI0YSwgMHgxNmFhLCAweGFkNCwgMHg5NTViLCAweDRiYSwgMHgxMjVhLCAweDU5MmIsXG4gICAgMHgxNTJhLCAweGY2OTUsIDB4ZDk0LCAweDE2YWEsIDB4YWFiNSwgMHg5YjQsIDB4MTRiNiwgMHg2YTU3LFxuICAgIDB4YTU2LCAweDExNTJhLCAweDFkMmEsIDB4ZDU0LCAweGQ1YWEsIDB4MTU2YSwgMHg5NmMsIDB4OTRhZSxcbiAgICAweDE0YWUsIDB4YTRjLCAweDdkMjYsIDB4MWIyYSwgMHhlYjU1LCAweGFkNCwgMHgxMmRhLCAweGE5NWQsXG4gICAgMHg5NWEsIDB4MTQ5YSwgMHg5YTRkLCAweDFhNGEsIDB4MTFhYTUsIDB4MTZhOCwgMHgxNmQ0LCAweGQyZGEsXG4gICAgMHgxMmI2LCAweDkzNiwgMHg5NDk3LCAweDE0OTYsIDB4MTU2NGIsIDB4ZDRhLCAweGRhOCwgMHhkNWI0LFxuICAgIDB4MTU2YywgMHgxMmFlLCAweGE5MmYsIDB4OTJlLCAweGM5NiwgMHg2ZDRhLCAweDFkNGEsIDB4MTBkNjUsXG4gICAgMHhiNTgsIDB4MTU2YywgMHhiMjZkLCAweDEyNWMsIDB4MTkyYywgMHg5YTk1LCAweDFhOTQsIDB4MWI0YSxcbiAgICAweDRiNTUsIDB4YWQ0LCAweGY1NWIsIDB4NGJhLCAweDEyNWEsIDB4YjkyYiwgMHgxNTJhLCAweDE2OTQsXG4gICAgMHg5NmFhLCAweDE1YWEsIDB4MTJhYjUsIDB4OTc0LCAweDE0YjYsIDB4Y2E1NywgMHhhNTYsIDB4MTUyNixcbiAgICAweDhlOTUsIDB4ZDU0LCAweDE1YWEsIDB4NDliNSwgMHg5NmMsIDB4ZDRhZSwgMHgxNDljLCAweDFhNGMsXG4gICAgMHhiZDI2LCAweDFhYTYsIDB4YjU0LCAweDZkNmEsIDB4MTJkYSwgMHgxNjk1ZCwgMHg5NWEsIDB4MTQ5YSxcbiAgICAweGRhNGIsIDB4MWE0YSwgMHgxYWE0LCAweGJiNTQsIDB4MTZiNCwgMHhhZGEsIDB4NDk1YiwgMHg5MzYsXG4gICAgMHhmNDk3LCAweDE0OTYsIDB4MTU0YSwgMHhiNmE1LCAweGRhNCwgMHgxNWI0LCAweDZhYjYsIDB4MTI2ZSxcbiAgICAweDEwOTJmLCAweDkyZSwgMHhjOTYsIDB4Y2Q0YSwgMHgxZDRhLCAweGQ2NCwgMHg5NTZjLCAweDE1NWMsXG4gICAgMHgxMjVjLCAweDc5MmUsIDB4MTkyYywgMHhmYTk1LCAweDFhOTQsIDB4MWI0YSwgMHhhYjU1LCAweGFkNCxcbiAgICAweDE0ZGEsIDB4OGE1ZCwgMHhhNWEsIDB4MTE1MmIsIDB4MTUyYSwgMHgxNjk0LCAweGQ2YWEsIDB4MTVhYSxcbiAgICAweGFiNCwgMHg5NGJhLCAweDE0YjYsIDB4YTU2LCAweDc1MjcsIDB4ZDI2LCAweGVlNTMsIDB4ZDU0LCAweDE1YWEsXG4gICAgMHhhOWI1LCAweDk2YywgMHgxNGFlLCAweDhhNGUsIDB4MWE0YywgMHgxMWQyNiwgMHgxYWE0LCAweDFiNTQsXG4gICAgMHhjZDZhLCAweGFkYSwgMHg5NWMsIDB4OTQ5ZCwgMHgxNDlhLCAweDFhMmEsIDB4NWIyNSwgMHgxYWE0LFxuICAgIDB4ZmI1MiwgMHgxNmI0LCAweGFiYSwgMHhhOTViLCAweDkzNiwgMHgxNDk2LCAweDlhNGIsIDB4MTU0YSxcbiAgICAweDEzNmE1LCAweGRhNCwgMHgxNWFjXTtcblxuLy8gVGFibGUgb2YgQ2hpbmVzZSBOZXcgWWVhcnMgZnJvbSB5ZWFyIDE4ODggdG8gMjExMVxuLy8gXG4vLyBiaXRzICgwIHRvIDQpOiAgIHNvbGFyIGRheVxuLy8gYml0cyAoNSB0byA4KTogICBzb2xhciBtb250aFxuLy8gYml0cyAoOSB0byAyMCk6ICBzb2xhciB5ZWFyXG52YXIgQ0hJTkVTRV9ORVdfWUVBUiA9IFsxODg3LCAweGVjMDRjLCAweGVjMjNmLCAweGVjNDM1LCAweGVjNjQ5LFxuICAgIDB4ZWM4M2UsIDB4ZWNhNTEsIDB4ZWNjNDYsIDB4ZWNlM2EsIDB4ZWQwNGQsIDB4ZWQyNDIsIDB4ZWQ0MzYsXG4gICAgMHhlZDY0YSwgMHhlZDgzZiwgMHhlZGE1MywgMHhlZGM0OCwgMHhlZGUzZCwgMHhlZTA1MCwgMHhlZTI0NCxcbiAgICAweGVlNDM5LCAweGVlNjRkLCAweGVlODQyLCAweGVlYTM2LCAweGVlYzRhLCAweGVlZTNlLCAweGVmMDUyLFxuICAgIDB4ZWYyNDYsIDB4ZWY0M2EsIDB4ZWY2NGUsIDB4ZWY4NDMsIDB4ZWZhMzcsIDB4ZWZjNGIsIDB4ZWZlNDEsXG4gICAgMHhmMDA1NCwgMHhmMDI0OCwgMHhmMDQzYywgMHhmMDY1MCwgMHhmMDg0NSwgMHhmMGEzOCwgMHhmMGM0ZCxcbiAgICAweGYwZTQyLCAweGYxMDM3LCAweGYxMjRhLCAweGYxNDNlLCAweGYxNjUxLCAweGYxODQ2LCAweGYxYTNhLFxuICAgIDB4ZjFjNGUsIDB4ZjFlNDQsIDB4ZjIwMzgsIDB4ZjIyNGIsIDB4ZjI0M2YsIDB4ZjI2NTMsIDB4ZjI4NDgsXG4gICAgMHhmMmEzYiwgMHhmMmM0ZiwgMHhmMmU0NSwgMHhmMzAzOSwgMHhmMzI0ZCwgMHhmMzQ0MiwgMHhmMzYzNixcbiAgICAweGYzODRhLCAweGYzYTNkLCAweGYzYzUxLCAweGYzZTQ2LCAweGY0MDNiLCAweGY0MjRlLCAweGY0NDQzLFxuICAgIDB4ZjQ2MzgsIDB4ZjQ4NGMsIDB4ZjRhM2YsIDB4ZjRjNTIsIDB4ZjRlNDgsIDB4ZjUwM2MsIDB4ZjUyNGYsXG4gICAgMHhmNTQ0NSwgMHhmNTYzOSwgMHhmNTg0ZCwgMHhmNWE0MiwgMHhmNWMzNSwgMHhmNWU0OSwgMHhmNjAzZSxcbiAgICAweGY2MjUxLCAweGY2NDQ2LCAweGY2NjNiLCAweGY2ODRmLCAweGY2YTQzLCAweGY2YzM3LCAweGY2ZTRiLFxuICAgIDB4ZjcwM2YsIDB4ZjcyNTIsIDB4Zjc0NDcsIDB4Zjc2M2MsIDB4Zjc4NTAsIDB4ZjdhNDUsIDB4ZjdjMzksXG4gICAgMHhmN2U0ZCwgMHhmODA0MiwgMHhmODI1NCwgMHhmODQ0OSwgMHhmODYzZCwgMHhmODg1MSwgMHhmOGE0NixcbiAgICAweGY4YzNiLCAweGY4ZTRmLCAweGY5MDQ0LCAweGY5MjM3LCAweGY5NDRhLCAweGY5NjNmLCAweGY5ODUzLFxuICAgIDB4ZjlhNDcsIDB4ZjljM2MsIDB4ZjllNTAsIDB4ZmEwNDUsIDB4ZmEyMzgsIDB4ZmE0NGMsIDB4ZmE2NDEsXG4gICAgMHhmYTgzNiwgMHhmYWE0OSwgMHhmYWMzZCwgMHhmYWU1MiwgMHhmYjA0NywgMHhmYjIzYSwgMHhmYjQ0ZSxcbiAgICAweGZiNjQzLCAweGZiODM3LCAweGZiYTRhLCAweGZiYzNmLCAweGZiZTUzLCAweGZjMDQ4LCAweGZjMjNjLFxuICAgIDB4ZmM0NTAsIDB4ZmM2NDUsIDB4ZmM4MzksIDB4ZmNhNGMsIDB4ZmNjNDEsIDB4ZmNlMzYsIDB4ZmQwNGEsXG4gICAgMHhmZDIzZCwgMHhmZDQ1MSwgMHhmZDY0NiwgMHhmZDgzYSwgMHhmZGE0ZCwgMHhmZGM0MywgMHhmZGUzNyxcbiAgICAweGZlMDRiLCAweGZlMjNmLCAweGZlNDUzLCAweGZlNjQ4LCAweGZlODNjLCAweGZlYTRmLCAweGZlYzQ0LFxuICAgIDB4ZmVlMzgsIDB4ZmYwNGMsIDB4ZmYyNDEsIDB4ZmY0MzYsIDB4ZmY2NGEsIDB4ZmY4M2UsIDB4ZmZhNTEsXG4gICAgMHhmZmM0NiwgMHhmZmUzYSwgMHgxMDAwNGUsIDB4MTAwMjQyLCAweDEwMDQzNywgMHgxMDA2NGIsIDB4MTAwODQxLFxuICAgIDB4MTAwYTUzLCAweDEwMGM0OCwgMHgxMDBlM2MsIDB4MTAxMDRmLCAweDEwMTI0NCwgMHgxMDE0MzgsXG4gICAgMHgxMDE2NGMsIDB4MTAxODQyLCAweDEwMWEzNSwgMHgxMDFjNDksIDB4MTAxZTNkLCAweDEwMjA1MSxcbiAgICAweDEwMjI0NSwgMHgxMDI0M2EsIDB4MTAyNjRlLCAweDEwMjg0MywgMHgxMDJhMzcsIDB4MTAyYzRiLFxuICAgIDB4MTAyZTNmLCAweDEwMzA1MywgMHgxMDMyNDcsIDB4MTAzNDNiLCAweDEwMzY0ZiwgMHgxMDM4NDUsXG4gICAgMHgxMDNhMzgsIDB4MTAzYzRjLCAweDEwM2U0MiwgMHgxMDQwMzYsIDB4MTA0MjQ5LCAweDEwNDQzZCxcbiAgICAweDEwNDY1MSwgMHgxMDQ4NDYsIDB4MTA0YTNhLCAweDEwNGM0ZSwgMHgxMDRlNDMsIDB4MTA1MDM4LFxuICAgIDB4MTA1MjRhLCAweDEwNTQzZSwgMHgxMDU2NTIsIDB4MTA1ODQ3LCAweDEwNWEzYiwgMHgxMDVjNGYsXG4gICAgMHgxMDVlNDUsIDB4MTA2MDM5LCAweDEwNjI0YywgMHgxMDY0NDEsIDB4MTA2NjM1LCAweDEwNjg0OSxcbiAgICAweDEwNmEzZCwgMHgxMDZjNTEsIDB4MTA2ZTQ3LCAweDEwNzAzYywgMHgxMDcyNGYsIDB4MTA3NDQ0LFxuICAgIDB4MTA3NjM4LCAweDEwNzg0YywgMHgxMDdhM2YsIDB4MTA3YzUzLCAweDEwN2U0OF07XG5cbmZ1bmN0aW9uIHRvTHVuYXIoeWVhck9yRGF0ZSwgbW9udGhPclJlc3VsdCwgZGF5LCByZXN1bHQpIHtcbiAgICB2YXIgc29sYXJEYXRlO1xuICAgIHZhciBsdW5hckRhdGU7XG5cbiAgICBpZih0eXBlb2YgeWVhck9yRGF0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc29sYXJEYXRlID0geWVhck9yRGF0ZTtcbiAgICAgICAgbHVuYXJEYXRlID0gbW9udGhPclJlc3VsdCB8fCB7fTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpc1ZhbGlkWWVhciA9ICh0eXBlb2YgeWVhck9yRGF0ZSA9PT0gJ251bWJlcicpICYmXG4gICAgICAgICAgICAoeWVhck9yRGF0ZSA+PSAxODg4KSAmJiAoeWVhck9yRGF0ZSA8PSAyMTExKTtcbiAgICAgICAgaWYoIWlzVmFsaWRZZWFyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU29sYXIgeWVhciBvdXRzaWRlIHJhbmdlIDE4ODgtMjExMVwiKTtcblxuICAgICAgICB2YXIgaXNWYWxpZE1vbnRoID0gKHR5cGVvZiBtb250aE9yUmVzdWx0ID09PSAnbnVtYmVyJykgJiZcbiAgICAgICAgICAgIChtb250aE9yUmVzdWx0ID49IDEpICYmIChtb250aE9yUmVzdWx0IDw9IDEyKTtcbiAgICAgICAgaWYoIWlzVmFsaWRNb250aClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNvbGFyIG1vbnRoIG91dHNpZGUgcmFuZ2UgMSAtIDEyXCIpO1xuXG4gICAgICAgIHZhciBpc1ZhbGlkRGF5ID0gKHR5cGVvZiBkYXkgPT09ICdudW1iZXInKSAmJiAoZGF5ID49IDEpICYmIChkYXkgPD0gMzEpO1xuICAgICAgICBpZighaXNWYWxpZERheSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNvbGFyIGRheSBvdXRzaWRlIHJhbmdlIDEgLSAzMVwiKTtcblxuICAgICAgICBzb2xhckRhdGUgPSB7XG4gICAgICAgICAgICB5ZWFyOiB5ZWFyT3JEYXRlLFxuICAgICAgICAgICAgbW9udGg6IG1vbnRoT3JSZXN1bHQsXG4gICAgICAgICAgICBkYXk6IGRheSxcbiAgICAgICAgfTtcbiAgICAgICAgbHVuYXJEYXRlID0gcmVzdWx0IHx8IHt9O1xuICAgIH1cblxuICAgIC8vIENvbXB1dGUgQ2hpbmVzZSBuZXcgeWVhciBhbmQgbHVuYXIgeWVhclxuICAgIHZhciBjaGluZXNlTmV3WWVhclBhY2tlZERhdGUgPVxuICAgICAgICBDSElORVNFX05FV19ZRUFSW3NvbGFyRGF0ZS55ZWFyIC0gQ0hJTkVTRV9ORVdfWUVBUlswXV07XG5cbiAgICB2YXIgcGFja2VkRGF0ZSA9IChzb2xhckRhdGUueWVhciA8PCA5KSB8IChzb2xhckRhdGUubW9udGggPDwgNSlcbiAgICAgICAgfCBzb2xhckRhdGUuZGF5O1xuXG4gICAgbHVuYXJEYXRlLnllYXIgPSAocGFja2VkRGF0ZSA+PSBjaGluZXNlTmV3WWVhclBhY2tlZERhdGUpID9cbiAgICAgICAgc29sYXJEYXRlLnllYXIgOlxuICAgICAgICBzb2xhckRhdGUueWVhciAtIDE7XG5cbiAgICBjaGluZXNlTmV3WWVhclBhY2tlZERhdGUgPVxuICAgICAgICBDSElORVNFX05FV19ZRUFSW2x1bmFyRGF0ZS55ZWFyIC0gQ0hJTkVTRV9ORVdfWUVBUlswXV07XG5cbiAgICB2YXIgeSA9IChjaGluZXNlTmV3WWVhclBhY2tlZERhdGUgPj4gOSkgJiAweEZGRjtcbiAgICB2YXIgbSA9IChjaGluZXNlTmV3WWVhclBhY2tlZERhdGUgPj4gNSkgJiAweDBGO1xuICAgIHZhciBkID0gY2hpbmVzZU5ld1llYXJQYWNrZWREYXRlICYgMHgxRjtcblxuICAgIC8vIENvbXB1dGUgZGF5cyBmcm9tIG5ldyB5ZWFyXG4gICAgdmFyIGRheXNGcm9tTmV3WWVhcjtcblxuICAgIHZhciBjaGluZXNlTmV3WWVhckpTRGF0ZSA9IG5ldyBEYXRlKHksIG0gLTEsIGQpO1xuICAgIHZhciBqc0RhdGUgPSBuZXcgRGF0ZShzb2xhckRhdGUueWVhciwgc29sYXJEYXRlLm1vbnRoIC0gMSwgc29sYXJEYXRlLmRheSk7XG5cbiAgICBkYXlzRnJvbU5ld1llYXIgPSBNYXRoLnJvdW5kKFxuICAgICAgICAoanNEYXRlIC0gY2hpbmVzZU5ld1llYXJKU0RhdGUpIC8gKDI0ICogMzYwMCAqIDEwMDApKTtcblxuICAgIC8vIENvbXB1dGUgbHVuYXIgbW9udGggYW5kIGRheVxuICAgIHZhciBtb250aERheXNUYWJsZSA9IExVTkFSX01PTlRIX0RBWVNbbHVuYXJEYXRlLnllYXIgLSBMVU5BUl9NT05USF9EQVlTWzBdXTtcblxuICAgIHZhciBpO1xuICAgIGZvcihpID0gMDsgaSA8IDEzOyBpKyspIHtcbiAgICAgICAgdmFyIGRheXNJbk1vbnRoID0gKG1vbnRoRGF5c1RhYmxlICYgKDEgPDwgKDEyIC0gaSkpKSA/IDMwIDogMjk7XG5cbiAgICAgICAgaWYgKGRheXNGcm9tTmV3WWVhciA8IGRheXNJbk1vbnRoKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRheXNGcm9tTmV3WWVhciAtPSBkYXlzSW5Nb250aDtcbiAgICB9XG5cbiAgICB2YXIgaW50ZXJjYWxhcnlNb250aCA9IG1vbnRoRGF5c1RhYmxlID4+IDEzO1xuICAgIGlmICghaW50ZXJjYWxhcnlNb250aCB8fCBpIDwgaW50ZXJjYWxhcnlNb250aCkge1xuICAgICAgICBsdW5hckRhdGUuaXNJbnRlcmNhbGFyeSA9IGZhbHNlO1xuICAgICAgICBsdW5hckRhdGUubW9udGggPSAxICsgaTtcbiAgICB9IGVsc2UgaWYgKGkgPT09IGludGVyY2FsYXJ5TW9udGgpIHtcbiAgICAgICAgbHVuYXJEYXRlLmlzSW50ZXJjYWxhcnkgPSB0cnVlO1xuICAgICAgICBsdW5hckRhdGUubW9udGggPSBpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGx1bmFyRGF0ZS5pc0ludGVyY2FsYXJ5ID0gZmFsc2U7XG4gICAgICAgIGx1bmFyRGF0ZS5tb250aCA9IGk7XG4gICAgfVxuXG4gICAgbHVuYXJEYXRlLmRheSA9IDEgKyBkYXlzRnJvbU5ld1llYXI7XG5cbiAgICByZXR1cm4gbHVuYXJEYXRlO1xufVxuXG5mdW5jdGlvbiB0b1NvbGFyKHllYXJPckRhdGUsIG1vbnRoT3JSZXN1bHQsIGRheSwgaXNJbnRlcmNhbGFyeU9yUmVzdWx0LCByZXN1bHQpIHtcbiAgICB2YXIgc29sYXJEYXRlO1xuICAgIHZhciBsdW5hckRhdGU7XG5cbiAgICBpZih0eXBlb2YgeWVhck9yRGF0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbHVuYXJEYXRlID0geWVhck9yRGF0ZTtcbiAgICAgICAgc29sYXJEYXRlID0gbW9udGhPclJlc3VsdCB8fCB7fTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpc1ZhbGlkWWVhciA9ICh0eXBlb2YgeWVhck9yRGF0ZSA9PT0gJ251bWJlcicpICYmXG4gICAgICAgICAgICAoeWVhck9yRGF0ZSA+PSAxODg4KSAmJiAoeWVhck9yRGF0ZSA8PSAyMTExKTtcbiAgICAgICAgaWYoIWlzVmFsaWRZZWFyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTHVuYXIgeWVhciBvdXRzaWRlIHJhbmdlIDE4ODgtMjExMVwiKTtcblxuICAgICAgICB2YXIgaXNWYWxpZE1vbnRoID0gKHR5cGVvZiBtb250aE9yUmVzdWx0ID09PSAnbnVtYmVyJykgJiZcbiAgICAgICAgICAgIChtb250aE9yUmVzdWx0ID49IDEpICYmIChtb250aE9yUmVzdWx0IDw9IDEyKTtcbiAgICAgICAgaWYoIWlzVmFsaWRNb250aClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkx1bmFyIG1vbnRoIG91dHNpZGUgcmFuZ2UgMSAtIDEyXCIpO1xuXG4gICAgICAgIHZhciBpc1ZhbGlkRGF5ID0gKHR5cGVvZiBkYXkgPT09ICdudW1iZXInKSAmJiAoZGF5ID49IDEpICYmIChkYXkgPD0gMzApO1xuICAgICAgICBpZighaXNWYWxpZERheSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkx1bmFyIGRheSBvdXRzaWRlIHJhbmdlIDEgLSAzMFwiKTtcblxuICAgICAgICB2YXIgaXNJbnRlcmNhbGFyeTtcbiAgICAgICAgaWYodHlwZW9mIGlzSW50ZXJjYWxhcnlPclJlc3VsdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlzSW50ZXJjYWxhcnkgPSBmYWxzZTtcbiAgICAgICAgICAgIHNvbGFyRGF0ZSA9IGlzSW50ZXJjYWxhcnlPclJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzSW50ZXJjYWxhcnkgPSAhIWlzSW50ZXJjYWxhcnlPclJlc3VsdDtcbiAgICAgICAgICAgIHNvbGFyRGF0ZSA9IHJlc3VsdCB8fCB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGx1bmFyRGF0ZSA9IHtcbiAgICAgICAgICAgIHllYXI6IHllYXJPckRhdGUsXG4gICAgICAgICAgICBtb250aDogbW9udGhPclJlc3VsdCxcbiAgICAgICAgICAgIGRheTogZGF5LFxuICAgICAgICAgICAgaXNJbnRlcmNhbGFyeTogaXNJbnRlcmNhbGFyeSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGRheXMgZnJvbSBuZXcgeWVhclxuICAgIHZhciBkYXlzRnJvbU5ld1llYXI7XG5cbiAgICBkYXlzRnJvbU5ld1llYXIgPSBsdW5hckRhdGUuZGF5IC0gMTtcblxuICAgIHZhciBtb250aERheXNUYWJsZSA9IExVTkFSX01PTlRIX0RBWVNbbHVuYXJEYXRlLnllYXIgLSBMVU5BUl9NT05USF9EQVlTWzBdXTtcbiAgICB2YXIgaW50ZXJjYWxhcnlNb250aCA9IG1vbnRoRGF5c1RhYmxlID4+IDEzO1xuXG4gICAgdmFyIG1vbnRoc0Zyb21OZXdZZWFyO1xuICAgIGlmICghaW50ZXJjYWxhcnlNb250aCkge1xuICAgICAgICBtb250aHNGcm9tTmV3WWVhciA9IGx1bmFyRGF0ZS5tb250aCAtIDE7XG4gICAgfSBlbHNlIGlmIChsdW5hckRhdGUubW9udGggPiBpbnRlcmNhbGFyeU1vbnRoKSB7XG4gICAgICAgIG1vbnRoc0Zyb21OZXdZZWFyID0gbHVuYXJEYXRlLm1vbnRoO1xuICAgIH0gZWxzZSBpZiAobHVuYXJEYXRlLmlzSW50ZXJjYWxhcnkpIHtcbiAgICAgICAgbW9udGhzRnJvbU5ld1llYXIgPSBsdW5hckRhdGUubW9udGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9udGhzRnJvbU5ld1llYXIgPSBsdW5hckRhdGUubW9udGggLSAxO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtb250aHNGcm9tTmV3WWVhcjsgaSsrKSB7XG4gICAgICAgIHZhciBkYXlzSW5Nb250aCA9IChtb250aERheXNUYWJsZSAmICgxIDw8ICgxMiAtIGkpKSkgPyAzMCA6IDI5O1xuICAgICAgICBkYXlzRnJvbU5ld1llYXIgKz0gZGF5c0luTW9udGg7XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBDaGluZXNlIG5ldyB5ZWFyXG4gICAgdmFyIHBhY2tlZERhdGUgPSBDSElORVNFX05FV19ZRUFSW2x1bmFyRGF0ZS55ZWFyIC0gQ0hJTkVTRV9ORVdfWUVBUlswXV07XG5cbiAgICB2YXIgeSA9IChwYWNrZWREYXRlID4+IDkpICYgMHhGRkY7XG4gICAgdmFyIG0gPSAocGFja2VkRGF0ZSA+PiA1KSAmIDB4MEY7XG4gICAgdmFyIGQgPSBwYWNrZWREYXRlICYgMHgxRjtcblxuICAgIC8vIENvbXB1dGUgc29sYXIgZGF0ZVxuICAgIHZhciBqc0RhdGUgPSBuZXcgRGF0ZSh5LCBtIC0gMSwgZCArIGRheXNGcm9tTmV3WWVhcik7XG5cbiAgICBzb2xhckRhdGUueWVhciA9IGpzRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHNvbGFyRGF0ZS5tb250aCA9IDEgKyBqc0RhdGUuZ2V0TW9udGgoKTtcbiAgICBzb2xhckRhdGUuZGF5ID0ganNEYXRlLmdldERhdGUoKTtcblxuICAgIHJldHVybiBzb2xhckRhdGU7XG59XG5cbiIsIi8qXG4gKiBXb3JsZCBDYWxlbmRhcnNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4Y2pvaG5zb24vd29ybGQtY2FsZW5kYXJzXG4gKlxuICogQmF0Y2gtY29udmVydGVkIGZyb20ga2J3b29kL2NhbGVuZGFyc1xuICogTWFueSB0aGFua3MgdG8gS2VpdGggV29vZCBhbmQgYWxsIG9mIHRoZSBjb250cmlidXRvcnMgdG8gdGhlIG9yaWdpbmFsIHByb2plY3QhXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxu77u/LyogaHR0cDovL2tlaXRoLXdvb2QubmFtZS9jYWxlbmRhcnMuaHRtbFxuICAgQ29wdGljIGNhbGVuZGFyIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBLZWl0aCBXb29kICh3b29kLmtlaXRoe2F0fW9wdHVzbmV0LmNvbS5hdSkgRmVicnVhcnkgMjAxMC5cbiAgIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIChodHRwOi8va2VpdGgtd29vZC5uYW1lL2xpY2VuY2UuaHRtbCkgbGljZW5zZS4gXG4gICBQbGVhc2UgYXR0cmlidXRlIHRoZSBhdXRob3IgaWYgeW91IHVzZSBpdC4gKi9cblxudmFyIG1haW4gPSByZXF1aXJlKCcuLi9tYWluJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5cbi8qKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgQ29wdGljIGNhbGVuZGFyLlxuICAgIFNlZSA8YSBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db3B0aWNfY2FsZW5kYXJcIj5odHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvcHRpY19jYWxlbmRhcjwvYT4uXG4gICAgU2VlIGFsc28gQ2FsZW5kcmljYWwgQ2FsY3VsYXRpb25zOiBUaGUgTWlsbGVubml1bSBFZGl0aW9uXG4gICAgKDxhIGhyZWY9XCJodHRwOi8vZW1yLmNzLmlpdC5lZHUvaG9tZS9yZWluZ29sZC9jYWxlbmRhci1ib29rL2luZGV4LnNodG1sXCI+aHR0cDovL2Vtci5jcy5paXQuZWR1L2hvbWUvcmVpbmdvbGQvY2FsZW5kYXItYm9vay9pbmRleC5zaHRtbDwvYT4pLlxuICAgIEBjbGFzcyBDb3B0aWNDYWxlbmRhclxuICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSBjb2RlIChkZWZhdWx0IEVuZ2xpc2gpIGZvciBsb2NhbGlzYXRpb24uICovXG5mdW5jdGlvbiBDb3B0aWNDYWxlbmRhcihsYW5ndWFnZSkge1xuICAgIHRoaXMubG9jYWwgPSB0aGlzLnJlZ2lvbmFsT3B0aW9uc1tsYW5ndWFnZSB8fCAnJ10gfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddO1xufVxuXG5Db3B0aWNDYWxlbmRhci5wcm90b3R5cGUgPSBuZXcgbWFpbi5iYXNlQ2FsZW5kYXI7XG5cbmFzc2lnbihDb3B0aWNDYWxlbmRhci5wcm90b3R5cGUsIHtcbiAgICAvKiogVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhciAqL1xuICAgIG5hbWU6ICdDb3B0aWMnLFxuICAgIC8qKiBKdWxpYW4gZGF0ZSBvZiBzdGFydCBvZiBDb3B0aWMgZXBvY2g6IDI5IEF1Z3VzdCAyODQgQ0UgKEdyZWdvcmlhbikuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhciAqL1xuICAgIGpkRXBvY2g6IDE4MjUwMjkuNSxcbiAgICAvKiogRGF5cyBwZXIgbW9udGggaW4gYSBjb21tb24geWVhci5cbiAgICAgICAgQG1lbWJlcm9mIENvcHRpY0NhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgNV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIENvcHRpY0NhbGVuZGFyICovXG4gICAgaGFzWWVhclplcm86IGZhbHNlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhciAqL1xuICAgIG1pbk1vbnRoOiAxLFxuICAgIC8qKiBUaGUgZmlyc3QgbW9udGggaW4gdGhlIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgQ29wdGljQ2FsZW5kYXJcbiAgICAgICAgQHByb3BlcnR5IG5hbWUge3N0cmluZ30gVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBwcm9wZXJ0eSBlcG9jaHMge3N0cmluZ1tdfSBUaGUgZXBvY2ggbmFtZXMuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc01pbiB7c3RyaW5nW119IFRoZSBtaW5pbWFsIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF0ZUZvcm1hdCB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgZm9yIHRoaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgU2VlIHRoZSBvcHRpb25zIG9uIDxhIGhyZWY9XCJCYXNlQ2FsZW5kYXIuaHRtbCNmb3JtYXREYXRlXCI+PGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT48L2E+IGZvciBkZXRhaWxzLlxuICAgICAgICBAcHJvcGVydHkgZmlyc3REYXkge251bWJlcn0gVGhlIG51bWJlciBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBzdGFydGluZyBhdCAwLlxuICAgICAgICBAcHJvcGVydHkgaXNSVEwge251bWJlcn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBsb2NhbGlzYXRpb24gcmVhZHMgcmlnaHQtdG8tbGVmdC4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ0NvcHRpYycsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkFNJywgJ0FNJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ1Rob3V0JywgJ1Bhb3BpJywgJ0hhdGhvcicsICdLb2lhaycsICdUb2JpJywgJ01lc2hpcicsXG4gICAgICAgICAgICAnUGFyZW1oYXQnLCAnUGFyZW1vdWRlJywgJ1Bhc2hvbnMnLCAnUGFvbmknLCAnRXBpcCcsICdNZXNvcmknLCAnUGkgS29naSBFbmF2b3QnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydDogWydUaG8nLCAnUGFvJywgJ0hhdGgnLCAnS29pJywgJ1RvYicsICdNZXNoJyxcbiAgICAgICAgICAgICdQYXQnLCAnUGFkJywgJ1Bhc2gnLCAnUGFvJywgJ0VwaScsICdNZXNvJywgJ1BpSyddLFxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnVGt5cmlha2EnLCAnUGVzbmF1JywgJ1BzaG9tZW50JywgJ1BlZnRvb3UnLCAnUHRpb3UnLCAnUHNvb3UnLCAnUHNhYmJhdG9uJ10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1RreScsICdQZXMnLCAnUHNoJywgJ1BlZicsICdQdGknLCAnUHNvJywgJ1BzYSddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnVGsnLCAnUGVzJywgJ1BzaCcsICdQZWYnLCAnUHQnLCAnUHNvJywgJ1BzYSddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkL21tL3l5eXknLFxuICAgICAgICAgICAgZmlyc3REYXk6IDAsXG4gICAgICAgICAgICBpc1JUTDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGluIGEgbGVhcCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgQ29wdGljQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGlzIGEgbGVhcCB5ZWFyLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGxlYXBZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICB2YXIgeWVhciA9IGRhdGUueWVhcigpICsgKGRhdGUueWVhcigpIDwgMCA/IDEgOiAwKTsgLy8gTm8geWVhciB6ZXJvXG4gICAgICAgIHJldHVybiB5ZWFyICUgNCA9PT0gMyB8fCB5ZWFyICUgNCA9PT0gLTE7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIG1vbnRocyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBtb250aHMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbW9udGhzSW5ZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LFxuICAgICAgICAgICAgbWFpbi5sb2NhbC5pbnZhbGlkWWVhciB8fCBtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ10uaW52YWxpZFllYXIpO1xuICAgICAgICByZXR1cm4gMTM7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIENvcHRpY0NhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcikgdGhlIG1vbnRoIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIHdlZWsgb2YgdGhlIHllYXIuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgd2Vla09mWWVhcjogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICAvLyBGaW5kIFN1bmRheSBvZiB0aGlzIHdlZWsgc3RhcnRpbmcgb24gU3VuZGF5XG4gICAgICAgIHZhciBjaGVja0RhdGUgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgIGNoZWNrRGF0ZS5hZGQoLWNoZWNrRGF0ZS5kYXlPZldlZWsoKSwgJ2QnKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoZWNrRGF0ZS5kYXlPZlllYXIoKSAtIDEpIC8gNykgKyAxO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlzUGVyTW9udGhbZGF0ZS5tb250aCgpIC0gMV0gK1xuICAgICAgICAgICAgKGRhdGUubW9udGgoKSA9PT0gMTMgJiYgdGhpcy5sZWFwWWVhcihkYXRlLnllYXIoKSkgPyAxIDogMCk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIENvcHRpY0NhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIG1vbnRoIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gZGF5IHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYSB3ZWVrIGRheSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrRGF5OiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSkgfHwgNykgPCA2O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIEp1bGlhbiBkYXRlIGVxdWl2YWxlbnQgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiBkYXlzIHNpbmNlIEphbnVhcnkgMSwgNDcxMyBCQ0UgR3JlZW53aWNoIG5vb24uXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXIpIHRoZSBtb250aCB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBlcXVpdmFsZW50IEp1bGlhbiBkYXRlLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHRvSkQ6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LCBtYWluLmxvY2FsLmludmFsaWREYXRlKTtcbiAgICAgICAgeWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICBpZiAoeWVhciA8IDApIHsgeWVhcisrOyB9IC8vIE5vIHllYXIgemVyb1xuICAgICAgICByZXR1cm4gZGF0ZS5kYXkoKSArIChkYXRlLm1vbnRoKCkgLSAxKSAqIDMwICtcbiAgICAgICAgICAgICh5ZWFyIC0gMSkgKiAzNjUgKyBNYXRoLmZsb29yKHllYXIgLyA0KSArIHRoaXMuamRFcG9jaCAtIDE7XG4gICAgfSxcblxuICAgIC8qKiBDcmVhdGUgYSBuZXcgZGF0ZSBmcm9tIGEgSnVsaWFuIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDb3B0aWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0gamQge251bWJlcn0gVGhlIEp1bGlhbiBkYXRlIHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXF1aXZhbGVudCBkYXRlLiAqL1xuICAgIGZyb21KRDogZnVuY3Rpb24oamQpIHtcbiAgICAgICAgdmFyIGMgPSBNYXRoLmZsb29yKGpkKSArIDAuNSAtIHRoaXMuamRFcG9jaDtcbiAgICAgICAgdmFyIHllYXIgPSBNYXRoLmZsb29yKChjIC0gTWF0aC5mbG9vcigoYyArIDM2NikgLyAxNDYxKSkgLyAzNjUpICsgMTtcbiAgICAgICAgaWYgKHllYXIgPD0gMCkgeyB5ZWFyLS07IH0gLy8gTm8geWVhciB6ZXJvXG4gICAgICAgIGMgPSBNYXRoLmZsb29yKGpkKSArIDAuNSAtIHRoaXMubmV3RGF0ZSh5ZWFyLCAxLCAxKS50b0pEKCk7XG4gICAgICAgIHZhciBtb250aCA9IE1hdGguZmxvb3IoYyAvIDMwKSArIDE7XG4gICAgICAgIHZhciBkYXkgPSBjIC0gKG1vbnRoIC0gMSkgKiAzMCArIDE7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxufSk7XG5cbi8vIENvcHRpYyBjYWxlbmRhciBpbXBsZW1lbnRhdGlvblxubWFpbi5jYWxlbmRhcnMuY29wdGljID0gQ29wdGljQ2FsZW5kYXI7XG5cbiIsIi8qXG4gKiBXb3JsZCBDYWxlbmRhcnNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4Y2pvaG5zb24vd29ybGQtY2FsZW5kYXJzXG4gKlxuICogQmF0Y2gtY29udmVydGVkIGZyb20ga2J3b29kL2NhbGVuZGFyc1xuICogTWFueSB0aGFua3MgdG8gS2VpdGggV29vZCBhbmQgYWxsIG9mIHRoZSBjb250cmlidXRvcnMgdG8gdGhlIG9yaWdpbmFsIHByb2plY3QhXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxu77u/LyogaHR0cDovL2tlaXRoLXdvb2QubmFtZS9jYWxlbmRhcnMuaHRtbFxuICAgRGlzY3dvcmxkIGNhbGVuZGFyIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBLZWl0aCBXb29kICh3b29kLmtlaXRoe2F0fW9wdHVzbmV0LmNvbS5hdSkgSmFudWFyeSAyMDE2LlxuICAgQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgKGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvbGljZW5jZS5odG1sKSBsaWNlbnNlLiBcbiAgIFBsZWFzZSBhdHRyaWJ1dGUgdGhlIGF1dGhvciBpZiB5b3UgdXNlIGl0LiAqL1xuXG52YXIgbWFpbiA9IHJlcXVpcmUoJy4uL21haW4nKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cblxuLyoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBEaXNjd29ybGQgY2FsZW5kYXIgLSBVbnNlZW4gVW5pdmVyc2l0eSB2ZXJzaW9uLlxuICAgIFNlZSBhbHNvIDxhIGhyZWY9XCJodHRwOi8vd2lraS5sc3BhY2Uub3JnL21lZGlhd2lraS9EaXNjd29ybGRfY2FsZW5kYXJcIj5odHRwOi8vd2lraS5sc3BhY2Uub3JnL21lZGlhd2lraS9EaXNjd29ybGRfY2FsZW5kYXI8L2E+XG4gICAgYW5kIDxhIGhyZWY9XCJodHRwOi8vZGlzY3dvcmxkLndpa2lhLmNvbS93aWtpL0Rpc2N3b3JsZF9jYWxlbmRhclwiPmh0dHA6Ly9kaXNjd29ybGQud2lraWEuY29tL3dpa2kvRGlzY3dvcmxkX2NhbGVuZGFyPC9hPi5cbiAgICBAY2xhc3MgRGlzY3dvcmxkQ2FsZW5kYXJcbiAgICBAcGFyYW0gW2xhbmd1YWdlPScnXSB7c3RyaW5nfSBUaGUgbGFuZ3VhZ2UgY29kZSAoZGVmYXVsdCBFbmdsaXNoKSBmb3IgbG9jYWxpc2F0aW9uLiAqL1xuZnVuY3Rpb24gRGlzY3dvcmxkQ2FsZW5kYXIobGFuZ3VhZ2UpIHtcbiAgICB0aGlzLmxvY2FsID0gdGhpcy5yZWdpb25hbE9wdGlvbnNbbGFuZ3VhZ2UgfHwgJyddIHx8IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbn1cblxuRGlzY3dvcmxkQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oRGlzY3dvcmxkQ2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgLyoqIFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAbWVtYmVyb2YgRGlzY3dvcmxkQ2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnRGlzY3dvcmxkJyxcbiAgICAvKiogSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgRGlzY3dvcmxkIGVwb2NoOiAxIEphbnVhcnkgMDAwMSBDRS5cbiAgICAgICAgQG1lbWJlcm9mIERpc2N3b3JsZENhbGVuZGFyICovXG4gICAgamRFcG9jaDogMTcyMTQyNS41LFxuICAgIC8qKiBEYXlzIHBlciBtb250aCBpbiBhIGNvbW1vbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgRGlzY3dvcmxkQ2FsZW5kYXIgKi9cbiAgICBkYXlzUGVyTW9udGg6IFsxNiwgMzIsIDMyLCAzMiwgMzIsIDMyLCAzMiwgMzIsIDMyLCAzMiwgMzIsIDMyLCAzMl0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIERpc2N3b3JsZENhbGVuZGFyICovXG4gICAgaGFzWWVhclplcm86IGZhbHNlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhciAqL1xuICAgIG1pbk1vbnRoOiAxLFxuICAgIC8qKiBUaGUgZmlyc3QgbW9udGggaW4gdGhlIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgRGlzY3dvcmxkQ2FsZW5kYXJcbiAgICAgICAgQHByb3BlcnR5IG5hbWUge3N0cmluZ30gVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBwcm9wZXJ0eSBlcG9jaHMge3N0cmluZ1tdfSBUaGUgZXBvY2ggbmFtZXMuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc01pbiB7c3RyaW5nW119IFRoZSBtaW5pbWFsIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF0ZUZvcm1hdCB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgZm9yIHRoaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgU2VlIHRoZSBvcHRpb25zIG9uIDxhIGhyZWY9XCJCYXNlQ2FsZW5kYXIuaHRtbCNmb3JtYXREYXRlXCI+PGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT48L2E+IGZvciBkZXRhaWxzLlxuICAgICAgICBAcHJvcGVydHkgZmlyc3REYXkge251bWJlcn0gVGhlIG51bWJlciBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBzdGFydGluZyBhdCAwLlxuICAgICAgICBAcHJvcGVydHkgaXNSVEwge251bWJlcn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBsb2NhbGlzYXRpb24gcmVhZHMgcmlnaHQtdG8tbGVmdC4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc2N3b3JsZCcsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQlVDJywgJ1VDJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ0ljaycsICdPZmZsZScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXG4gICAgICAgICAgICAnR3J1bmUnLCAnQXVndXN0JywgJ1NwdW5lJywgJ1Nla3RvYmVyJywgJ0VtYmVyJywgJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnSWNrJywgJ09mZicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0dydScsICdBdWcnLCAnU3B1JywgJ1NlaycsICdFbWInLCAnRGVjJ10sXG4gICAgICAgICAgICBkYXlOYW1lczogWydTdW5kYXknLCAnT2N0ZWRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1N1bicsICdPY3QnLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgICAgICAgICAgIGRheU5hbWVzTWluOiBbJ1N1JywgJ09jJywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1NhJ10sXG4gICAgICAgICAgICBkaWdpdHM6IG51bGwsXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAneXl5eS9tbS9kZCcsXG4gICAgICAgICAgICBmaXJzdERheTogMixcbiAgICAgICAgICAgIGlzUlRMOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgaW4gYSBsZWFwIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYSBsZWFwIHllYXIsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbGVhcFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIG1vbnRocyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBtb250aHMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbW9udGhzSW5ZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgcmV0dXJuIDEzO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIERpc2N3b3JsZENhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiA0MDA7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIERpc2N3b3JsZENhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIHdlZWsgb2YgdGhlIHllYXIuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgd2Vla09mWWVhcjogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICAvLyBGaW5kIFN1bmRheSBvZiB0aGlzIHdlZWsgc3RhcnRpbmcgb24gU3VuZGF5XG4gICAgICAgIHZhciBjaGVja0RhdGUgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgIGNoZWNrRGF0ZS5hZGQoLWNoZWNrRGF0ZS5kYXlPZldlZWsoKSwgJ2QnKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoZWNrRGF0ZS5kYXlPZlllYXIoKSAtIDEpIC8gOCkgKyAxO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlzUGVyTW9udGhbZGF0ZS5tb250aCgpIC0gMV07XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLlxuICAgICAgICBAbWVtYmVyb2YgRGlzY3dvcmxkQ2FsZW5kYXJcbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMuICovXG4gICAgZGF5c0luV2VlazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiA4O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgYSBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgRGlzY3dvcmxkQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZGF5IG9mIHRoZSB3ZWVrOiAwIHRvIG51bWJlciBvZiBkYXlzIC0gMS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlPZldlZWs6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LCBtYWluLmxvY2FsLmludmFsaWREYXRlKTtcbiAgICAgICAgcmV0dXJuIChkYXRlLmRheSgpICsgMSkgJSA4O1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGEgd2VlayBkYXkuXG4gICAgICAgIEBtZW1iZXJvZiBEaXNjd29ybGRDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRvdyA9IHRoaXMuZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICByZXR1cm4gKGRvdyA+PSAyICYmIGRvdyA8PSA2KTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gYWJvdXQgYSBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgRGlzY3dvcmxkQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7b2JqZWN0fSBBZGRpdGlvbmFsIGluZm9ybWF0aW9uIC0gY29udGVudHMgZGVwZW5kcyBvbiBjYWxlbmRhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBleHRyYUluZm86IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LCBtYWluLmxvY2FsLmludmFsaWREYXRlKTtcbiAgICAgICAgcmV0dXJuIHtjZW50dXJ5OiBjZW50dXJpZXNbTWF0aC5mbG9vcigoZGF0ZS55ZWFyKCkgLSAxKSAvIDEwMCkgKyAxXSB8fCAnJ307XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIERpc2N3b3JsZENhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvbnZlcnQgb3IgdGhlIHllYXIgdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGVxdWl2YWxlbnQgSnVsaWFuIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KRDogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICB5ZWFyID0gZGF0ZS55ZWFyKCkgKyAoZGF0ZS55ZWFyKCkgPCAwID8gMSA6IDApO1xuICAgICAgICBtb250aCA9IGRhdGUubW9udGgoKTtcbiAgICAgICAgZGF5ID0gZGF0ZS5kYXkoKTtcbiAgICAgICAgcmV0dXJuIGRheSArIChtb250aCA+IDEgPyAxNiA6IDApICsgKG1vbnRoID4gMiA/IChtb250aCAtIDIpICogMzIgOiAwKSArXG4gICAgICAgICAgICAoeWVhciAtIDEpICogNDAwICsgdGhpcy5qZEVwb2NoIC0gMTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIERpc2N3b3JsZENhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICBqZCA9IE1hdGguZmxvb3IoamQgKyAwLjUpIC0gTWF0aC5mbG9vcih0aGlzLmpkRXBvY2gpIC0gMTtcbiAgICAgICAgdmFyIHllYXIgPSBNYXRoLmZsb29yKGpkIC8gNDAwKSArIDE7XG4gICAgICAgIGpkIC09ICh5ZWFyIC0gMSkgKiA0MDA7XG4gICAgICAgIGpkICs9IChqZCA+IDE1ID8gMTYgOiAwKTtcbiAgICAgICAgdmFyIG1vbnRoID0gTWF0aC5mbG9vcihqZCAvIDMyKSArIDE7XG4gICAgICAgIHZhciBkYXkgPSBqZCAtIChtb250aCAtIDEpICogMzIgKyAxO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIgPD0gMCA/IHllYXIgLSAxIDogeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxufSk7XG5cbi8vIE5hbWVzIG9mIHRoZSBjZW50dXJpZXNcbnZhciBjZW50dXJpZXMgPSB7XG4gICAgMjA6ICdGcnVpdGJhdCcsXG4gICAgMjE6ICdBbmNob3Z5J1xufTtcblxuLy8gRGlzY3dvcmxkIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy5kaXNjd29ybGQgPSBEaXNjd29ybGRDYWxlbmRhcjtcblxuIiwiLypcbiAqIFdvcmxkIENhbGVuZGFyc1xuICogaHR0cHM6Ly9naXRodWIuY29tL2FsZXhjam9obnNvbi93b3JsZC1jYWxlbmRhcnNcbiAqXG4gKiBCYXRjaC1jb252ZXJ0ZWQgZnJvbSBrYndvb2QvY2FsZW5kYXJzXG4gKiBNYW55IHRoYW5rcyB0byBLZWl0aCBXb29kIGFuZCBhbGwgb2YgdGhlIGNvbnRyaWJ1dG9ycyB0byB0aGUgb3JpZ2luYWwgcHJvamVjdCFcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG7vu78vKiBodHRwOi8va2VpdGgtd29vZC5uYW1lL2NhbGVuZGFycy5odG1sXG4gICBFdGhpb3BpYW4gY2FsZW5kYXIgZm9yIGpRdWVyeSB2Mi4wLjIuXG4gICBXcml0dGVuIGJ5IEtlaXRoIFdvb2QgKHdvb2Qua2VpdGh7YXR9b3B0dXNuZXQuY29tLmF1KSBGZWJydWFyeSAyMDEwLlxuICAgQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgKGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvbGljZW5jZS5odG1sKSBsaWNlbnNlLiBcbiAgIFBsZWFzZSBhdHRyaWJ1dGUgdGhlIGF1dGhvciBpZiB5b3UgdXNlIGl0LiAqL1xuXG52YXIgbWFpbiA9IHJlcXVpcmUoJy4uL21haW4nKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cblxuLyoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBFdGhpb3BpYW4gY2FsZW5kYXIuXG4gICAgU2VlIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0V0aGlvcGlhbl9jYWxlbmRhclwiPmh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXRoaW9waWFuX2NhbGVuZGFyPC9hPi5cbiAgICBTZWUgYWxzbyBDYWxlbmRyaWNhbCBDYWxjdWxhdGlvbnM6IFRoZSBNaWxsZW5uaXVtIEVkaXRpb25cbiAgICAoPGEgaHJlZj1cImh0dHA6Ly9lbXIuY3MuaWl0LmVkdS9ob21lL3JlaW5nb2xkL2NhbGVuZGFyLWJvb2svaW5kZXguc2h0bWxcIj5odHRwOi8vZW1yLmNzLmlpdC5lZHUvaG9tZS9yZWluZ29sZC9jYWxlbmRhci1ib29rL2luZGV4LnNodG1sPC9hPikuXG4gICAgQGNsYXNzIEV0aGlvcGlhbkNhbGVuZGFyXG4gICAgQHBhcmFtIFtsYW5ndWFnZT0nJ10ge3N0cmluZ30gVGhlIGxhbmd1YWdlIGNvZGUgKGRlZmF1bHQgRW5nbGlzaCkgZm9yIGxvY2FsaXNhdGlvbi4gKi9cbmZ1bmN0aW9uIEV0aGlvcGlhbkNhbGVuZGFyKGxhbmd1YWdlKSB7XG4gICAgdGhpcy5sb2NhbCA9IHRoaXMucmVnaW9uYWxPcHRpb25zW2xhbmd1YWdlIHx8ICcnXSB8fCB0aGlzLnJlZ2lvbmFsT3B0aW9uc1snJ107XG59XG5cbkV0aGlvcGlhbkNhbGVuZGFyLnByb3RvdHlwZSA9IG5ldyBtYWluLmJhc2VDYWxlbmRhcjtcblxuYXNzaWduKEV0aGlvcGlhbkNhbGVuZGFyLnByb3RvdHlwZSwge1xuICAgIC8qKiBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQG1lbWJlcm9mIEV0aGlvcGlhbkNhbGVuZGFyICovXG4gICAgbmFtZTogJ0V0aGlvcGlhbicsXG4gICAgLyoqIEp1bGlhbiBkYXRlIG9mIHN0YXJ0IG9mIEV0aGlvcGlhbiBlcG9jaDogMjcgQXVndXN0IDggQ0UgKEdyZWdvcmlhbikuXG4gICAgICAgIEBtZW1iZXJvZiBFdGhpb3BpYW5DYWxlbmRhciAqL1xuICAgIGpkRXBvY2g6IDE3MjQyMjAuNSxcbiAgICAvKiogRGF5cyBwZXIgbW9udGggaW4gYSBjb21tb24geWVhci5cbiAgICAgICAgQG1lbWJlcm9mIEV0aGlvcGlhbkNhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMCwgNV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIEV0aGlvcGlhbkNhbGVuZGFyICovXG4gICAgaGFzWWVhclplcm86IGZhbHNlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBFdGhpb3BpYW5DYWxlbmRhciAqL1xuICAgIG1pbk1vbnRoOiAxLFxuICAgIC8qKiBUaGUgZmlyc3QgbW9udGggaW4gdGhlIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBFdGhpb3BpYW5DYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBFdGhpb3BpYW5DYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgRXRoaW9waWFuQ2FsZW5kYXJcbiAgICAgICAgQHByb3BlcnR5IG5hbWUge3N0cmluZ30gVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBwcm9wZXJ0eSBlcG9jaHMge3N0cmluZ1tdfSBUaGUgZXBvY2ggbmFtZXMuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc01pbiB7c3RyaW5nW119IFRoZSBtaW5pbWFsIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF0ZUZvcm1hdCB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgZm9yIHRoaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgU2VlIHRoZSBvcHRpb25zIG9uIDxhIGhyZWY9XCJCYXNlQ2FsZW5kYXIuaHRtbCNmb3JtYXREYXRlXCI+PGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT48L2E+IGZvciBkZXRhaWxzLlxuICAgICAgICBAcHJvcGVydHkgZmlyc3REYXkge251bWJlcn0gVGhlIG51bWJlciBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBzdGFydGluZyBhdCAwLlxuICAgICAgICBAcHJvcGVydHkgaXNSVEwge251bWJlcn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBsb2NhbGlzYXRpb24gcmVhZHMgcmlnaHQtdG8tbGVmdC4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ0V0aGlvcGlhbicsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkVFJywgJ0VFJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ01lc2tlcmVtJywgJ1Rpa2VtZXQnLCAnSGlkYXInLCAnVGFoZXNhcycsICdUaXInLCAnWWVrYXRpdCcsXG4gICAgICAgICAgICAnTWVnYWJpdCcsICdNaWF6aWEnLCAnR2VuYm90JywgJ1NlbmUnLCAnSGFtbGUnLCAnTmVoYXNlJywgJ1BhZ3VtZSddLFxuICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0OiBbJ01lcycsICdUaWsnLCAnSGlkJywgJ1RhaCcsICdUaXInLCAnWWVrJyxcbiAgICAgICAgICAgICdNZWcnLCAnTWlhJywgJ0dlbicsICdTZW4nLCAnSGFtJywgJ05laCcsICdQYWcnXSxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJ0VodWQnLCAnU2Vnbm8nLCAnTWFrc2Vnbm8nLCAnSXJvYicsICdIYW11cycsICdBcmInLCAnS2lkYW1lJ10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ0VodScsICdTZWcnLCAnTWFrJywgJ0lybycsICdIYW0nLCAnQXJiJywgJ0tpZCddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnRWgnLCAnU2UnLCAnTWEnLCAnSXInLCAnSGEnLCAnQXInLCAnS2knXSxcbiAgICAgICAgICAgIGRpZ2l0czogbnVsbCxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eXl5JyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAwLFxuICAgICAgICAgICAgaXNSVEw6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBpbiBhIGxlYXAgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIEV0aGlvcGlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBpcyBhIGxlYXAgeWVhciwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBsZWFwWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgdmFyIHllYXIgPSBkYXRlLnllYXIoKSArIChkYXRlLnllYXIoKSA8IDAgPyAxIDogMCk7IC8vIE5vIHllYXIgemVyb1xuICAgICAgICByZXR1cm4geWVhciAlIDQgPT09IDMgfHwgeWVhciAlIDQgPT09IC0xO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBtb250aHMgaW4gYSB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgRXRoaW9waWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgbW9udGhzLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIG1vbnRoc0luWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSxcbiAgICAgICAgICAgIG1haW4ubG9jYWwuaW52YWxpZFllYXIgfHwgbWFpbi5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWRZZWFyKTtcbiAgICAgICAgcmV0dXJuIDEzO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHRoZSB3ZWVrIG9mIHRoZSB5ZWFyIGZvciBhIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBFdGhpb3BpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgLy8gRmluZCBTdW5kYXkgb2YgdGhpcyB3ZWVrIHN0YXJ0aW5nIG9uIFN1bmRheVxuICAgICAgICB2YXIgY2hlY2tEYXRlID0gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICBjaGVja0RhdGUuYWRkKC1jaGVja0RhdGUuZGF5T2ZXZWVrKCksICdkJyk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChjaGVja0RhdGUuZGF5T2ZZZWFyKCkgLSAxKSAvIDcpICsgMTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIG1vbnRoLlxuICAgICAgICBAbWVtYmVyb2YgRXRoaW9waWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciBvZiB0aGUgbW9udGguXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhpcyBtb250aC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIG1vbnRoL3llYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlzSW5Nb250aDogZnVuY3Rpb24oeWVhciwgbW9udGgpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZE1vbnRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5c1Blck1vbnRoW2RhdGUubW9udGgoKSAtIDFdICtcbiAgICAgICAgICAgIChkYXRlLm1vbnRoKCkgPT09IDEzICYmIHRoaXMubGVhcFllYXIoZGF0ZS55ZWFyKCkpID8gMSA6IDApO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGEgd2VlayBkYXkuXG4gICAgICAgIEBtZW1iZXJvZiBFdGhpb3BpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF5KSB8fCA3KSA8IDY7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIEV0aGlvcGlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvbnZlcnQgb3IgdGhlIHllYXIgdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGVxdWl2YWxlbnQgSnVsaWFuIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KRDogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICB5ZWFyID0gZGF0ZS55ZWFyKCk7XG4gICAgICAgIGlmICh5ZWFyIDwgMCkgeyB5ZWFyKys7IH0gLy8gTm8geWVhciB6ZXJvXG4gICAgICAgIHJldHVybiBkYXRlLmRheSgpICsgKGRhdGUubW9udGgoKSAtIDEpICogMzAgK1xuICAgICAgICAgICAgKHllYXIgLSAxKSAqIDM2NSArIE1hdGguZmxvb3IoeWVhciAvIDQpICsgdGhpcy5qZEVwb2NoIC0gMTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIEV0aGlvcGlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSB0aGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IHRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICB2YXIgYyA9IE1hdGguZmxvb3IoamQpICsgMC41IC0gdGhpcy5qZEVwb2NoO1xuICAgICAgICB2YXIgeWVhciA9IE1hdGguZmxvb3IoKGMgLSBNYXRoLmZsb29yKChjICsgMzY2KSAvIDE0NjEpKSAvIDM2NSkgKyAxO1xuICAgICAgICBpZiAoeWVhciA8PSAwKSB7IHllYXItLTsgfSAvLyBObyB5ZWFyIHplcm9cbiAgICAgICAgYyA9IE1hdGguZmxvb3IoamQpICsgMC41IC0gdGhpcy5uZXdEYXRlKHllYXIsIDEsIDEpLnRvSkQoKTtcbiAgICAgICAgdmFyIG1vbnRoID0gTWF0aC5mbG9vcihjIC8gMzApICsgMTtcbiAgICAgICAgdmFyIGRheSA9IGMgLSAobW9udGggLSAxKSAqIDMwICsgMTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9XG59KTtcblxuLy8gRXRoaW9waWFuIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy5ldGhpb3BpYW4gPSBFdGhpb3BpYW5DYWxlbmRhcjtcblxuIiwiLypcbiAqIFdvcmxkIENhbGVuZGFyc1xuICogaHR0cHM6Ly9naXRodWIuY29tL2FsZXhjam9obnNvbi93b3JsZC1jYWxlbmRhcnNcbiAqXG4gKiBCYXRjaC1jb252ZXJ0ZWQgZnJvbSBrYndvb2QvY2FsZW5kYXJzXG4gKiBNYW55IHRoYW5rcyB0byBLZWl0aCBXb29kIGFuZCBhbGwgb2YgdGhlIGNvbnRyaWJ1dG9ycyB0byB0aGUgb3JpZ2luYWwgcHJvamVjdCFcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG7vu78vKiBodHRwOi8va2VpdGgtd29vZC5uYW1lL2NhbGVuZGFycy5odG1sXG4gICBIZWJyZXcgY2FsZW5kYXIgZm9yIGpRdWVyeSB2Mi4wLjIuXG4gICBXcml0dGVuIGJ5IEtlaXRoIFdvb2QgKHdvb2Qua2VpdGh7YXR9b3B0dXNuZXQuY29tLmF1KSBBdWd1c3QgMjAwOS5cbiAgIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIChodHRwOi8va2VpdGgtd29vZC5uYW1lL2xpY2VuY2UuaHRtbCkgbGljZW5zZS4gXG4gICBQbGVhc2UgYXR0cmlidXRlIHRoZSBhdXRob3IgaWYgeW91IHVzZSBpdC4gKi9cblxudmFyIG1haW4gPSByZXF1aXJlKCcuLi9tYWluJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5cbi8qKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSGVicmV3IGNpdmlsIGNhbGVuZGFyLlxuICAgIEJhc2VkIG9uIGNvZGUgZnJvbSA8YSBocmVmPVwiaHR0cDovL3d3dy5mb3VybWlsYWIuY2gvZG9jdW1lbnRzL2NhbGVuZGFyL1wiPmh0dHA6Ly93d3cuZm91cm1pbGFiLmNoL2RvY3VtZW50cy9jYWxlbmRhci88L2E+LlxuICAgIFNlZSBhbHNvIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hlYnJld19jYWxlbmRhclwiPmh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSGVicmV3X2NhbGVuZGFyPC9hPi5cbiAgICBAY2xhc3MgSGVicmV3Q2FsZW5kYXJcbiAgICBAcGFyYW0gW2xhbmd1YWdlPScnXSB7c3RyaW5nfSBUaGUgbGFuZ3VhZ2UgY29kZSAoZGVmYXVsdCBFbmdsaXNoKSBmb3IgbG9jYWxpc2F0aW9uLiAqL1xuZnVuY3Rpb24gSGVicmV3Q2FsZW5kYXIobGFuZ3VhZ2UpIHtcbiAgICB0aGlzLmxvY2FsID0gdGhpcy5yZWdpb25hbE9wdGlvbnNbbGFuZ3VhZ2UgfHwgJyddIHx8IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbn1cblxuSGVicmV3Q2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oSGVicmV3Q2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgLyoqIFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAbWVtYmVyb2YgSGVicmV3Q2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnSGVicmV3JyxcbiAgICAvKiogSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgSGVicmV3IGVwb2NoOiA3IE9jdG9iZXIgMzc2MSBCQ0UuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhciAqL1xuICAgIGpkRXBvY2g6IDM0Nzk5NS41LFxuICAgIC8qKiBEYXlzIHBlciBtb250aCBpbiBhIGNvbW1vbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgSGVicmV3Q2FsZW5kYXIgKi9cbiAgICBkYXlzUGVyTW9udGg6IFszMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAyOV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIEhlYnJld0NhbGVuZGFyICovXG4gICAgaGFzWWVhclplcm86IGZhbHNlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhciAqL1xuICAgIG1pbk1vbnRoOiAxLFxuICAgIC8qKiBUaGUgZmlyc3QgbW9udGggaW4gdGhlIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDcsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgSGVicmV3Q2FsZW5kYXJcbiAgICAgICAgQHByb3BlcnR5IG5hbWUge3N0cmluZ30gVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBwcm9wZXJ0eSBlcG9jaHMge3N0cmluZ1tdfSBUaGUgZXBvY2ggbmFtZXMuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc01pbiB7c3RyaW5nW119IFRoZSBtaW5pbWFsIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF0ZUZvcm1hdCB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgZm9yIHRoaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgU2VlIHRoZSBvcHRpb25zIG9uIDxhIGhyZWY9XCJCYXNlQ2FsZW5kYXIuaHRtbCNmb3JtYXREYXRlXCI+PGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT48L2E+IGZvciBkZXRhaWxzLlxuICAgICAgICBAcHJvcGVydHkgZmlyc3REYXkge251bWJlcn0gVGhlIG51bWJlciBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBzdGFydGluZyBhdCAwLlxuICAgICAgICBAcHJvcGVydHkgaXNSVEwge251bWJlcn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBsb2NhbGlzYXRpb24gcmVhZHMgcmlnaHQtdG8tbGVmdC4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ0hlYnJldycsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkFNJywgJ0FNJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ05pc2FuJywgJ0l5YXInLCAnU2l2YW4nLCAnVGFtbXV6JywgJ0F2JywgJ0VsdWwnLFxuICAgICAgICAgICAgJ1Rpc2hyZWknLCAnQ2hlc2h2YW4nLCAnS2lzbGV2JywgJ1RldmV0JywgJ1NoZXZhdCcsICdBZGFyJywgJ0FkYXIgSUknXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydDogWydOaXMnLCAnSXlhJywgJ1NpdicsICdUYW0nLCAnQXYnLCAnRWx1JywgJ1RpcycsICdDaGUnLCAnS2lzJywgJ1RldicsICdTaGUnLCAnQWRhJywgJ0FkMiddLFxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnWW9tIFJpc2hvbicsICdZb20gU2hlbmknLCAnWW9tIFNobGlzaGknLCAnWW9tIFJldmlcXCdpJywgJ1lvbSBDaGFtaXNoaScsICdZb20gU2hpc2hpJywgJ1lvbSBTaGFiYmF0J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1JpcycsICdTaGUnLCAnU2hsJywgJ1JldicsICdDaGEnLCAnU2hpJywgJ1NoYSddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnUmknLCdTaGUnLCdTaGwnLCdSZScsJ0NoJywnU2hpJywnU2hhJ10sXG4gICAgICAgICAgICBkaWdpdHM6IG51bGwsXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQvbW0veXl5eScsXG4gICAgICAgICAgICBmaXJzdERheTogMCxcbiAgICAgICAgICAgIGlzUlRMOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgaW4gYSBsZWFwIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYSBsZWFwIHllYXIsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbGVhcFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFwWWVhcihkYXRlLnllYXIoKSk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgaW4gYSBsZWFwIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhclxuICAgICAgICBAcHJpdmF0ZVxuICAgICAgICBAcGFyYW0geWVhciB7bnVtYmVyfSBUaGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGlzIGEgbGVhcCB5ZWFyLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIF9sZWFwWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB5ZWFyID0gKHllYXIgPCAwID8geWVhciArIDEgOiB5ZWFyKTtcbiAgICAgICAgcmV0dXJuIG1vZCh5ZWFyICogNyArIDEsIDE5KSA8IDc7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIG1vbnRocyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBtb250aHMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbW9udGhzSW5ZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYXBZZWFyKHllYXIueWVhciA/IHllYXIueWVhcigpIDogeWVhcikgPyAxMyA6IDEyO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHRoZSB3ZWVrIG9mIHRoZSB5ZWFyIGZvciBhIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgLy8gRmluZCBTdW5kYXkgb2YgdGhpcyB3ZWVrIHN0YXJ0aW5nIG9uIFN1bmRheVxuICAgICAgICB2YXIgY2hlY2tEYXRlID0gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICBjaGVja0RhdGUuYWRkKC1jaGVja0RhdGUuZGF5T2ZXZWVrKCksICdkJyk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChjaGVja0RhdGUuZGF5T2ZZZWFyKCkgLSAxKSAvIDcpICsgMTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJblllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHllYXIgPSBkYXRlLnllYXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9KRCgoeWVhciA9PT0gLTEgPyArMSA6IHllYXIgKyAxKSwgNywgMSkgLSB0aGlzLnRvSkQoeWVhciwgNywgMSk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIEhlYnJld0NhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgb2YgdGhlIG1vbnRoLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGguXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzIGluIHRoaXMgbW9udGguXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBtb250aC95ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luTW9udGg6IGZ1bmN0aW9uKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIGlmICh5ZWFyLnllYXIpIHtcbiAgICAgICAgICAgIG1vbnRoID0geWVhci5tb250aCgpO1xuICAgICAgICAgICAgeWVhciA9IHllYXIueWVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gKG1vbnRoID09PSAxMiAmJiB0aGlzLmxlYXBZZWFyKHllYXIpID8gMzAgOiAvLyBBZGFyIElcbiAgICAgICAgICAgICAgICAobW9udGggPT09IDggJiYgbW9kKHRoaXMuZGF5c0luWWVhcih5ZWFyKSwgMTApID09PSA1ID8gMzAgOiAvLyBDaGVzaHZhbiBpbiBzaGxlbWFoIHllYXJcbiAgICAgICAgICAgICAgICAobW9udGggPT09IDkgJiYgbW9kKHRoaXMuZGF5c0luWWVhcih5ZWFyKSwgMTApID09PSAzID8gMjkgOiAvLyBLaXNsZXYgaW4gY2hhc2VyYWggeWVhclxuICAgICAgICAgICAgICAgIHRoaXMuZGF5c1Blck1vbnRoW21vbnRoIC0gMV0pKSk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIEhlYnJld0NhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgd2VlayBkYXksIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgd2Vla0RheTogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSkgIT09IDY7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFib3V0IGEgZGF0ZSAtIHllYXIgdHlwZS5cbiAgICAgICAgQG1lbWJlcm9mIEhlYnJld0NhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge29iamVjdH0gQWRkaXRpb25hbCBpbmZvcm1hdGlvbiAtIGNvbnRlbnRzIGRlcGVuZHMgb24gY2FsZW5kYXIuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZXh0cmFJbmZvOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHJldHVybiB7eWVhclR5cGU6ICh0aGlzLmxlYXBZZWFyKGRhdGUpID8gJ2VtYm9saXNtaWMnIDogJ2NvbW1vbicpICsgJyAnICtcbiAgICAgICAgICAgIFsnZGVmaWNpZW50JywgJ3JlZ3VsYXInLCAnY29tcGxldGUnXVt0aGlzLmRheXNJblllYXIoZGF0ZSkgJSAxMCAtIDNdfTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBKdWxpYW4gZGF0ZSBlcXVpdmFsZW50IGZvciB0aGlzIGRhdGUsXG4gICAgICAgIGkuZS4gZGF5cyBzaW5jZSBKYW51YXJ5IDEsIDQ3MTMgQkNFIEdyZWVud2ljaCBub29uLlxuICAgICAgICBAbWVtYmVyb2YgSGVicmV3Q2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlKXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvbnZlcnQgb3IgdGhlIHllYXIgdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGVxdWl2YWxlbnQgSnVsaWFuIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KRDogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICB5ZWFyID0gZGF0ZS55ZWFyKCk7XG4gICAgICAgIG1vbnRoID0gZGF0ZS5tb250aCgpO1xuICAgICAgICBkYXkgPSBkYXRlLmRheSgpO1xuICAgICAgICB2YXIgYWRqWWVhciA9ICh5ZWFyIDw9IDAgPyB5ZWFyICsgMSA6IHllYXIpO1xuICAgICAgICB2YXIgamQgPSB0aGlzLmpkRXBvY2ggKyB0aGlzLl9kZWxheTEoYWRqWWVhcikgK1xuICAgICAgICAgICAgdGhpcy5fZGVsYXkyKGFkalllYXIpICsgZGF5ICsgMTtcbiAgICAgICAgaWYgKG1vbnRoIDwgNykge1xuICAgICAgICAgICAgZm9yICh2YXIgbSA9IDc7IG0gPD0gdGhpcy5tb250aHNJblllYXIoeWVhcik7IG0rKykge1xuICAgICAgICAgICAgICAgIGpkICs9IHRoaXMuZGF5c0luTW9udGgoeWVhciwgbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBtID0gMTsgbSA8IG1vbnRoOyBtKyspIHtcbiAgICAgICAgICAgICAgICBqZCArPSB0aGlzLmRheXNJbk1vbnRoKHllYXIsIG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgbSA9IDc7IG0gPCBtb250aDsgbSsrKSB7XG4gICAgICAgICAgICAgICAgamQgKz0gdGhpcy5kYXlzSW5Nb250aCh5ZWFyLCBtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gamQ7XG4gICAgfSxcblxuICAgIC8qKiBUZXN0IGZvciBkZWxheSBvZiBzdGFydCBvZiBuZXcgeWVhciBhbmQgdG8gYXZvaWRcbiAgICAgICAgU3VuZGF5LCBXZWRuZXNkYXksIG9yIEZyaWRheSBhcyBzdGFydCBvZiB0aGUgbmV3IHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBIZWJyZXdDYWxlbmRhclxuICAgICAgICBAcHJpdmF0ZVxuICAgICAgICBAcGFyYW0geWVhciB7bnVtYmVyfSBUaGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkYXlzIHRvIG9mZnNldCBieS4gKi9cbiAgICBfZGVsYXkxOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHZhciBtb250aHMgPSBNYXRoLmZsb29yKCgyMzUgKiB5ZWFyIC0gMjM0KSAvIDE5KTtcbiAgICAgICAgdmFyIHBhcnRzID0gMTIwODQgKyAxMzc1MyAqIG1vbnRocztcbiAgICAgICAgdmFyIGRheSA9IG1vbnRocyAqIDI5ICsgTWF0aC5mbG9vcihwYXJ0cyAvIDI1OTIwKTtcbiAgICAgICAgaWYgKG1vZCgzICogKGRheSArIDEpLCA3KSA8IDMpIHtcbiAgICAgICAgICAgIGRheSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXk7XG4gICAgfSxcblxuICAgIC8qKiBDaGVjayBmb3IgZGVsYXkgaW4gc3RhcnQgb2YgbmV3IHllYXIgZHVlIHRvIGxlbmd0aCBvZiBhZGphY2VudCB5ZWFycy5cbiAgICAgICAgQG1lbWJlcm9mIEhlYnJld0NhbGVuZGFyXG4gICAgICAgIEBwcml2YXRlXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtudW1iZXJ9IFRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGRheXMgdG8gb2Zmc2V0IGJ5LiAqL1xuICAgIF9kZWxheTI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGxhc3QgPSB0aGlzLl9kZWxheTEoeWVhciAtIDEpO1xuICAgICAgICB2YXIgcHJlc2VudCA9IHRoaXMuX2RlbGF5MSh5ZWFyKTtcbiAgICAgICAgdmFyIG5leHQgPSB0aGlzLl9kZWxheTEoeWVhciArIDEpO1xuICAgICAgICByZXR1cm4gKChuZXh0IC0gcHJlc2VudCkgPT09IDM1NiA/IDIgOiAoKHByZXNlbnQgLSBsYXN0KSA9PT0gMzgyID8gMSA6IDApKTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIEhlYnJld0NhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICBqZCA9IE1hdGguZmxvb3IoamQpICsgMC41O1xuICAgICAgICB2YXIgeWVhciA9IE1hdGguZmxvb3IoKChqZCAtIHRoaXMuamRFcG9jaCkgKiA5ODQ5Ni4wKSAvIDM1OTc1MzUxLjApIC0gMTtcbiAgICAgICAgd2hpbGUgKGpkID49IHRoaXMudG9KRCgoeWVhciA9PT0gLTEgPyArMSA6IHllYXIgKyAxKSwgNywgMSkpIHtcbiAgICAgICAgICAgIHllYXIrKztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9udGggPSAoamQgPCB0aGlzLnRvSkQoeWVhciwgMSwgMSkpID8gNyA6IDE7XG4gICAgICAgIHdoaWxlIChqZCA+IHRoaXMudG9KRCh5ZWFyLCBtb250aCwgdGhpcy5kYXlzSW5Nb250aCh5ZWFyLCBtb250aCkpKSB7XG4gICAgICAgICAgICBtb250aCsrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXkgPSBqZCAtIHRoaXMudG9KRCh5ZWFyLCBtb250aCwgMSkgKyAxO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cbn0pO1xuXG4vLyBNb2R1bHVzIGZ1bmN0aW9uIHdoaWNoIHdvcmtzIGZvciBub24taW50ZWdlcnMuXG5mdW5jdGlvbiBtb2QoYSwgYikge1xuICAgIHJldHVybiBhIC0gKGIgKiBNYXRoLmZsb29yKGEgLyBiKSk7XG59XG5cbi8vIEhlYnJldyBjYWxlbmRhciBpbXBsZW1lbnRhdGlvblxubWFpbi5jYWxlbmRhcnMuaGVicmV3ID0gSGVicmV3Q2FsZW5kYXI7XG5cbiIsIi8qXG4gKiBXb3JsZCBDYWxlbmRhcnNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4Y2pvaG5zb24vd29ybGQtY2FsZW5kYXJzXG4gKlxuICogQmF0Y2gtY29udmVydGVkIGZyb20ga2J3b29kL2NhbGVuZGFyc1xuICogTWFueSB0aGFua3MgdG8gS2VpdGggV29vZCBhbmQgYWxsIG9mIHRoZSBjb250cmlidXRvcnMgdG8gdGhlIG9yaWdpbmFsIHByb2plY3QhXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxu77u/LyogaHR0cDovL2tlaXRoLXdvb2QubmFtZS9jYWxlbmRhcnMuaHRtbFxuICAgSXNsYW1pYyBjYWxlbmRhciBmb3IgalF1ZXJ5IHYyLjAuMi5cbiAgIFdyaXR0ZW4gYnkgS2VpdGggV29vZCAod29vZC5rZWl0aHthdH1vcHR1c25ldC5jb20uYXUpIEF1Z3VzdCAyMDA5LlxuICAgQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgKGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvbGljZW5jZS5odG1sKSBsaWNlbnNlLiBcbiAgIFBsZWFzZSBhdHRyaWJ1dGUgdGhlIGF1dGhvciBpZiB5b3UgdXNlIGl0LiAqL1xuXG52YXIgbWFpbiA9IHJlcXVpcmUoJy4uL21haW4nKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cblxuLyoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJc2xhbWljIG9yICcxNiBjaXZpbCcgY2FsZW5kYXIuXG4gICAgQmFzZWQgb24gY29kZSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vd3d3LmlyYW5jaGFtYmVyLmNvbS9jYWxlbmRhci9jb252ZXJ0ZXIvaXJhbmlhbl9jYWxlbmRhcl9jb252ZXJ0ZXIucGhwXCI+aHR0cDovL3d3dy5pcmFuY2hhbWJlci5jb20vY2FsZW5kYXIvY29udmVydGVyL2lyYW5pYW5fY2FsZW5kYXJfY29udmVydGVyLnBocDwvYT4uXG4gICAgU2VlIGFsc28gPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSXNsYW1pY19jYWxlbmRhclwiPmh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSXNsYW1pY19jYWxlbmRhcjwvYT4uXG4gICAgQGNsYXNzIElzbGFtaWNDYWxlbmRhclxuICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSBjb2RlIChkZWZhdWx0IEVuZ2xpc2gpIGZvciBsb2NhbGlzYXRpb24uICovXG5mdW5jdGlvbiBJc2xhbWljQ2FsZW5kYXIobGFuZ3VhZ2UpIHtcbiAgICB0aGlzLmxvY2FsID0gdGhpcy5yZWdpb25hbE9wdGlvbnNbbGFuZ3VhZ2UgfHwgJyddIHx8IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbn1cblxuSXNsYW1pY0NhbGVuZGFyLnByb3RvdHlwZSA9IG5ldyBtYWluLmJhc2VDYWxlbmRhcjtcblxuYXNzaWduKElzbGFtaWNDYWxlbmRhci5wcm90b3R5cGUsIHtcbiAgICAvKiogVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBtZW1iZXJvZiBJc2xhbWljQ2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnSXNsYW1pYycsXG4gICAgLyoqIEp1bGlhbiBkYXRlIG9mIHN0YXJ0IG9mIElzbGFtaWMgZXBvY2g6IDE2IEp1bHkgNjIyIENFLlxuICAgICAgICBAbWVtYmVyb2YgSXNsYW1pY0NhbGVuZGFyICovXG4gICAgamRFcG9jaDogMTk0ODQzOS41LFxuICAgIC8qKiBEYXlzIHBlciBtb250aCBpbiBhIGNvbW1vbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgSXNsYW1pY0NhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzAsIDI5LCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjksIDMwLCAyOV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgSXNsYW1pY0NhbGVuZGFyICovXG4gICAgbWluTW9udGg6IDEsXG4gICAgLyoqIFRoZSBmaXJzdCBtb250aCBpbiB0aGUgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBJc2xhbWljQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhclxuICAgICAgICBAcHJvcGVydHkgbmFtZSB7c3RyaW5nfSBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQHByb3BlcnR5IGVwb2NocyB7c3RyaW5nW119IFRoZSBlcG9jaCBuYW1lcy5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzTWluIHtzdHJpbmdbXX0gVGhlIG1pbmltYWwgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXRlRm9ybWF0IHtzdHJpbmd9IFRoZSBkYXRlIGZvcm1hdCBmb3IgdGhpcyBjYWxlbmRhci5cbiAgICAgICAgICAgICAgICBTZWUgdGhlIG9wdGlvbnMgb24gPGEgaHJlZj1cIkJhc2VDYWxlbmRhci5odG1sI2Zvcm1hdERhdGVcIj48Y29kZT5mb3JtYXREYXRlPC9jb2RlPjwvYT4gZm9yIGRldGFpbHMuXG4gICAgICAgIEBwcm9wZXJ0eSBmaXJzdERheSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIHN0YXJ0aW5nIGF0IDAuXG4gICAgICAgIEBwcm9wZXJ0eSBpc1JUTCB7bnVtYmVyfSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGxvY2FsaXNhdGlvbiByZWFkcyByaWdodC10by1sZWZ0LiAqL1xuICAgIHJlZ2lvbmFsT3B0aW9uczogeyAvLyBMb2NhbGlzYXRpb25zXG4gICAgICAgICcnOiB7XG4gICAgICAgICAgICBuYW1lOiAnSXNsYW1pYycsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkgnLCAnQUgnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnTXVoYXJyYW0nLCAnU2FmYXInLCAnUmFiaVxcJyBhbC1hd3dhbCcsICdSYWJpXFwnIGFsLXRoYW5pJywgJ0p1bWFkYSBhbC1hd3dhbCcsICdKdW1hZGEgYWwtdGhhbmknLFxuICAgICAgICAgICAgJ1JhamFiJywgJ1NoYVxcJ2FiYW4nLCAnUmFtYWRhbicsICdTaGF3d2FsJywgJ0RodSBhbC1RaVxcJ2RhaCcsICdEaHUgYWwtSGlqamFoJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnTXVoJywgJ1NhZicsICdSYWIxJywgJ1JhYjInLCAnSnVtMScsICdKdW0yJywgJ1JhaicsICdTaGFcXCcnLCAnUmFtJywgJ1NoYXcnLCAnRGh1UScsICdEaHVIJ10sXG4gICAgICAgICAgICBkYXlOYW1lczogWydZYXdtIGFsLWFoYWQnLCAnWWF3bSBhbC1pdGhuYXluJywgJ1lhd20gYXRoLXRodWxhYXRoYWFcXCcnLFxuICAgICAgICAgICAgJ1lhd20gYWwtYXJiaVxcJ2FhXFwnJywgJ1lhd20gYWwta2hhbcSrcycsICdZYXdtIGFsLWp1bVxcJ2EnLCAnWWF3bSBhcy1zYWJ0J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ0FoYScsICdJdGgnLCAnVGh1JywgJ0FyYicsICdLaGEnLCAnSnVtJywgJ1NhYiddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnQWgnLCdJdCcsJ1RoJywnQXInLCdLaCcsJ0p1JywnU2EnXSxcbiAgICAgICAgICAgIGRpZ2l0czogbnVsbCxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICd5eXl5L21tL2RkJyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiA2LFxuICAgICAgICAgICAgaXNSVEw6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBpbiBhIGxlYXAgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYSBsZWFwIHllYXIsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbGVhcFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiAoZGF0ZS55ZWFyKCkgKiAxMSArIDE0KSAlIDMwIDwgMTE7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgLy8gRmluZCBTdW5kYXkgb2YgdGhpcyB3ZWVrIHN0YXJ0aW5nIG9uIFN1bmRheVxuICAgICAgICB2YXIgY2hlY2tEYXRlID0gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICBjaGVja0RhdGUuYWRkKC1jaGVja0RhdGUuZGF5T2ZXZWVrKCksICdkJyk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChjaGVja0RhdGUuZGF5T2ZZZWFyKCkgLSAxKSAvIDcpICsgMTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBJc2xhbWljQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cy5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlzSW5ZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5sZWFwWWVhcih5ZWFyKSA/IDM1NSA6IDM1NCk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlzUGVyTW9udGhbZGF0ZS5tb250aCgpIC0gMV0gK1xuICAgICAgICAgICAgKGRhdGUubW9udGgoKSA9PT0gMTIgJiYgdGhpcy5sZWFwWWVhcihkYXRlLnllYXIoKSkgPyAxIDogMCk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCBkYXkpICE9PSA1O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIEp1bGlhbiBkYXRlIGVxdWl2YWxlbnQgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiBkYXlzIHNpbmNlIEphbnVhcnkgMSwgNDcxMyBCQ0UgR3JlZW53aWNoIG5vb24uXG4gICAgICAgIEBtZW1iZXJvZiBJc2xhbWljQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gY29udmVydCBvciB0aGUgeWVhciB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZXF1aXZhbGVudCBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b0pEOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHllYXIgPSBkYXRlLnllYXIoKTtcbiAgICAgICAgbW9udGggPSBkYXRlLm1vbnRoKCk7XG4gICAgICAgIGRheSA9IGRhdGUuZGF5KCk7XG4gICAgICAgIHllYXIgPSAoeWVhciA8PSAwID8geWVhciArIDEgOiB5ZWFyKTtcbiAgICAgICAgcmV0dXJuIGRheSArIE1hdGguY2VpbCgyOS41ICogKG1vbnRoIC0gMSkpICsgKHllYXIgLSAxKSAqIDM1NCArXG4gICAgICAgICAgICBNYXRoLmZsb29yKCgzICsgKDExICogeWVhcikpIC8gMzApICsgdGhpcy5qZEVwb2NoIC0gMTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIElzbGFtaWNDYWxlbmRhclxuICAgICAgICBAcGFyYW0gamQge251bWJlcn0gVGhlIEp1bGlhbiBkYXRlIHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXF1aXZhbGVudCBkYXRlLiAqL1xuICAgIGZyb21KRDogZnVuY3Rpb24oamQpIHtcbiAgICAgICAgamQgPSBNYXRoLmZsb29yKGpkKSArIDAuNTtcbiAgICAgICAgdmFyIHllYXIgPSBNYXRoLmZsb29yKCgzMCAqIChqZCAtIHRoaXMuamRFcG9jaCkgKyAxMDY0NikgLyAxMDYzMSk7XG4gICAgICAgIHllYXIgPSAoeWVhciA8PSAwID8geWVhciAtIDEgOiB5ZWFyKTtcbiAgICAgICAgdmFyIG1vbnRoID0gTWF0aC5taW4oMTIsIE1hdGguY2VpbCgoamQgLSAyOSAtIHRoaXMudG9KRCh5ZWFyLCAxLCAxKSkgLyAyOS41KSArIDEpO1xuICAgICAgICB2YXIgZGF5ID0gamQgLSB0aGlzLnRvSkQoeWVhciwgbW9udGgsIDEpICsgMTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9XG59KTtcblxuLy8gSXNsYW1pYyAoMTYgY2l2aWwpIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy5pc2xhbWljID0gSXNsYW1pY0NhbGVuZGFyO1xuXG4iLCIvKlxuICogV29ybGQgQ2FsZW5kYXJzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxleGNqb2huc29uL3dvcmxkLWNhbGVuZGFyc1xuICpcbiAqIEJhdGNoLWNvbnZlcnRlZCBmcm9tIGtid29vZC9jYWxlbmRhcnNcbiAqIE1hbnkgdGhhbmtzIHRvIEtlaXRoIFdvb2QgYW5kIGFsbCBvZiB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSBvcmlnaW5hbCBwcm9qZWN0IVxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbu+7vy8qIGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY2FsZW5kYXJzLmh0bWxcbiAgIEp1bGlhbiBjYWxlbmRhciBmb3IgalF1ZXJ5IHYyLjAuMi5cbiAgIFdyaXR0ZW4gYnkgS2VpdGggV29vZCAod29vZC5rZWl0aHthdH1vcHR1c25ldC5jb20uYXUpIEF1Z3VzdCAyMDA5LlxuICAgQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgKGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvbGljZW5jZS5odG1sKSBsaWNlbnNlLiBcbiAgIFBsZWFzZSBhdHRyaWJ1dGUgdGhlIGF1dGhvciBpZiB5b3UgdXNlIGl0LiAqL1xuXG52YXIgbWFpbiA9IHJlcXVpcmUoJy4uL21haW4nKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cblxuLyoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBKdWxpYW4gY2FsZW5kYXIuXG4gICAgQmFzZWQgb24gY29kZSBmcm9tIDxhIGhyZWY9XCJodHRwOi8vd3d3LmZvdXJtaWxhYi5jaC9kb2N1bWVudHMvY2FsZW5kYXIvXCI+aHR0cDovL3d3dy5mb3VybWlsYWIuY2gvZG9jdW1lbnRzL2NhbGVuZGFyLzwvYT4uXG4gICAgU2VlIGFsc28gPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSnVsaWFuX2NhbGVuZGFyXCI+aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9KdWxpYW5fY2FsZW5kYXI8L2E+LlxuICAgIEBjbGFzcyBKdWxpYW5DYWxlbmRhclxuICAgIEBhdWdtZW50cyBCYXNlQ2FsZW5kYXJcbiAgICBAcGFyYW0gW2xhbmd1YWdlPScnXSB7c3RyaW5nfSBUaGUgbGFuZ3VhZ2UgY29kZSAoZGVmYXVsdCBFbmdsaXNoKSBmb3IgbG9jYWxpc2F0aW9uLiAqL1xuZnVuY3Rpb24gSnVsaWFuQ2FsZW5kYXIobGFuZ3VhZ2UpIHtcbiAgICB0aGlzLmxvY2FsID0gdGhpcy5yZWdpb25hbE9wdGlvbnNbbGFuZ3VhZ2UgfHwgJyddIHx8IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbn1cblxuSnVsaWFuQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oSnVsaWFuQ2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgLyoqIFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnSnVsaWFuJyxcbiAgICAvKiogSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgSnVsaWFuIGVwb2NoOiAxIEphbnVhcnkgMDAwMSBBRCA9IDMwIERlY2VtYmVyIDAwMDEgQkNFLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXIgKi9cbiAgICBqZEVwb2NoOiAxNzIxNDIzLjUsXG4gICAgLyoqIERheXMgcGVyIG1vbnRoIGluIGEgY29tbW9uIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBKdWxpYW5DYWxlbmRhciAqL1xuICAgIGRheXNQZXJNb250aDogWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdLFxuICAgIC8qKiA8Y29kZT50cnVlPC9jb2RlPiBpZiBoYXMgYSB5ZWFyIHplcm8sIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEBtZW1iZXJvZiBKdWxpYW5DYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXIgKi9cbiAgICBtaW5Nb250aDogMSxcbiAgICAvKiogVGhlIGZpcnN0IG1vbnRoIGluIHRoZSB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXIgKi9cbiAgICBmaXJzdE1vbnRoOiAxLFxuICAgIC8qKiBUaGUgbWluaW11bSBkYXkgbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIEp1bGlhbkNhbGVuZGFyXG4gICAgICAgIEBwcm9wZXJ0eSBuYW1lIHtzdHJpbmd9IFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAcHJvcGVydHkgZXBvY2hzIHtzdHJpbmdbXX0gVGhlIGVwb2NoIG5hbWVzLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNNaW4ge3N0cmluZ1tdfSBUaGUgbWluaW1hbCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRhdGVGb3JtYXQge3N0cmluZ30gVGhlIGRhdGUgZm9ybWF0IGZvciB0aGlzIGNhbGVuZGFyLlxuICAgICAgICAgICAgICAgIFNlZSB0aGUgb3B0aW9ucyBvbiA8YSBocmVmPVwiQmFzZUNhbGVuZGFyLmh0bWwjZm9ybWF0RGF0ZVwiPjxjb2RlPmZvcm1hdERhdGU8L2NvZGU+PC9hPiBmb3IgZGV0YWlscy5cbiAgICAgICAgQHByb3BlcnR5IGZpcnN0RGF5IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlaywgc3RhcnRpbmcgYXQgMC5cbiAgICAgICAgQHByb3BlcnR5IGlzUlRMIHtudW1iZXJ9IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgbG9jYWxpc2F0aW9uIHJlYWRzIHJpZ2h0LXRvLWxlZnQuICovXG4gICAgcmVnaW9uYWxPcHRpb25zOiB7IC8vIExvY2FsaXNhdGlvbnNcbiAgICAgICAgJyc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdKdWxpYW4nLFxuICAgICAgICAgICAgZXBvY2hzOiBbJ0JDJywgJ0FEJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuICAgICAgICAgICAgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgICAgICAgICAgIGRpZ2l0czogbnVsbCxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdtbS9kZC95eXl5JyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAwLFxuICAgICAgICAgICAgaXNSVEw6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBpbiBhIGxlYXAgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIEp1bGlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBpcyBhIGxlYXAgeWVhciwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBsZWFwWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgdmFyIHllYXIgPSAoZGF0ZS55ZWFyKCkgPCAwID8gZGF0ZS55ZWFyKCkgKyAxIDogZGF0ZS55ZWFyKCkpOyAvLyBObyB5ZWFyIHplcm9cbiAgICAgICAgcmV0dXJuICh5ZWFyICUgNCkgPT09IDA7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZSAtIElTTyA4NjAxLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIC8vIEZpbmQgVGh1cnNkYXkgb2YgdGhpcyB3ZWVrIHN0YXJ0aW5nIG9uIE1vbmRheVxuICAgICAgICB2YXIgY2hlY2tEYXRlID0gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICBjaGVja0RhdGUuYWRkKDQgLSAoY2hlY2tEYXRlLmRheU9mV2VlaygpIHx8IDcpLCAnZCcpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoY2hlY2tEYXRlLmRheU9mWWVhcigpIC0gMSkgLyA3KSArIDE7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIEp1bGlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgb2YgdGhlIG1vbnRoLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGguXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzIGluIHRoaXMgbW9udGguXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBtb250aC95ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luTW9udGg6IGZ1bmN0aW9uKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRNb250aCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRheXNQZXJNb250aFtkYXRlLm1vbnRoKCkgLSAxXSArXG4gICAgICAgICAgICAoZGF0ZS5tb250aCgpID09PSAyICYmIHRoaXMubGVhcFllYXIoZGF0ZS55ZWFyKCkpID8gMSA6IDApO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGEgd2VlayBkYXkuXG4gICAgICAgIEBtZW1iZXJvZiBKdWxpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGEgd2VlayBkYXksIGZhbHNlIGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrRGF5OiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSkgfHwgNykgPCA2O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIEp1bGlhbiBkYXRlIGVxdWl2YWxlbnQgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiBkYXlzIHNpbmNlIEphbnVhcnkgMSwgNDcxMyBCQ0UgR3JlZW53aWNoIG5vb24uXG4gICAgICAgIEBtZW1iZXJvZiBKdWxpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBlcXVpdmFsZW50IEp1bGlhbiBkYXRlLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHRvSkQ6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LCBtYWluLmxvY2FsLmludmFsaWREYXRlKTtcbiAgICAgICAgeWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICBtb250aCA9IGRhdGUubW9udGgoKTtcbiAgICAgICAgZGF5ID0gZGF0ZS5kYXkoKTtcbiAgICAgICAgaWYgKHllYXIgPCAwKSB7IHllYXIrKzsgfSAvLyBObyB5ZWFyIHplcm9cbiAgICAgICAgLy8gSmVhbiBNZWV1cyBhbGdvcml0aG0sIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiwgMTk5MVxuICAgICAgICBpZiAobW9udGggPD0gMikge1xuICAgICAgICAgICAgeWVhci0tO1xuICAgICAgICAgICAgbW9udGggKz0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoMzY1LjI1ICogKHllYXIgKyA0NzE2KSkgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcigzMC42MDAxICogKG1vbnRoICsgMSkpICsgZGF5IC0gMTUyNC41O1xuICAgIH0sXG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUgZnJvbSBhIEp1bGlhbiBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgSnVsaWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIGpkIHtudW1iZXJ9IFRoZSBKdWxpYW4gZGF0ZSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIGVxdWl2YWxlbnQgZGF0ZS4gKi9cbiAgICBmcm9tSkQ6IGZ1bmN0aW9uKGpkKSB7XG4gICAgICAgIC8vIEplYW4gTWVldXMgYWxnb3JpdGhtLCBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIsIDE5OTFcbiAgICAgICAgdmFyIGEgPSBNYXRoLmZsb29yKGpkICsgMC41KTtcbiAgICAgICAgdmFyIGIgPSBhICsgMTUyNDtcbiAgICAgICAgdmFyIGMgPSBNYXRoLmZsb29yKChiIC0gMTIyLjEpIC8gMzY1LjI1KTtcbiAgICAgICAgdmFyIGQgPSBNYXRoLmZsb29yKDM2NS4yNSAqIGMpO1xuICAgICAgICB2YXIgZSA9IE1hdGguZmxvb3IoKGIgLSBkKSAvIDMwLjYwMDEpO1xuICAgICAgICB2YXIgbW9udGggPSBlIC0gTWF0aC5mbG9vcihlIDwgMTQgPyAxIDogMTMpO1xuICAgICAgICB2YXIgeWVhciA9IGMgLSBNYXRoLmZsb29yKG1vbnRoID4gMiA/IDQ3MTYgOiA0NzE1KTtcbiAgICAgICAgdmFyIGRheSA9IGIgLSBkIC0gTWF0aC5mbG9vcigzMC42MDAxICogZSk7XG4gICAgICAgIGlmICh5ZWFyIDw9IDApIHsgeWVhci0tOyB9IC8vIE5vIHllYXIgemVyb1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cbn0pO1xuXG4vLyBKdWxpYW4gY2FsZW5kYXIgaW1wbGVtZW50YXRpb25cbm1haW4uY2FsZW5kYXJzLmp1bGlhbiA9IEp1bGlhbkNhbGVuZGFyO1xuXG4iLCIvKlxuICogV29ybGQgQ2FsZW5kYXJzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxleGNqb2huc29uL3dvcmxkLWNhbGVuZGFyc1xuICpcbiAqIEJhdGNoLWNvbnZlcnRlZCBmcm9tIGtid29vZC9jYWxlbmRhcnNcbiAqIE1hbnkgdGhhbmtzIHRvIEtlaXRoIFdvb2QgYW5kIGFsbCBvZiB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSBvcmlnaW5hbCBwcm9qZWN0IVxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbu+7vy8qIGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY2FsZW5kYXJzLmh0bWxcbiAgIE1heWFuIGNhbGVuZGFyIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBLZWl0aCBXb29kICh3b29kLmtlaXRoe2F0fW9wdHVzbmV0LmNvbS5hdSkgQXVndXN0IDIwMDkuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBtYWluID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuXG4vKiogSW1wbGVtZW50YXRpb24gb2YgdGhlIE1heWFuIExvbmcgQ291bnQgY2FsZW5kYXIuXG4gICAgU2VlIGFsc28gPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWF5YW5fY2FsZW5kYXJcIj5odHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01heWFuX2NhbGVuZGFyPC9hPi5cbiAgICBAY2xhc3MgTWF5YW5DYWxlbmRhclxuICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSBjb2RlIChkZWZhdWx0IEVuZ2xpc2gpIGZvciBsb2NhbGlzYXRpb24uICovXG5mdW5jdGlvbiBNYXlhbkNhbGVuZGFyKGxhbmd1YWdlKSB7XG4gICAgdGhpcy5sb2NhbCA9IHRoaXMucmVnaW9uYWxPcHRpb25zW2xhbmd1YWdlIHx8ICcnXSB8fCB0aGlzLnJlZ2lvbmFsT3B0aW9uc1snJ107XG59XG5cbk1heWFuQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oTWF5YW5DYWxlbmRhci5wcm90b3R5cGUsIHtcbiAgICAvKiogVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyICovXG4gICAgbmFtZTogJ01heWFuJyxcbiAgICAvKiogSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgTWF5YW4gZXBvY2g6IDExIEF1Z3VzdCAzMTE0IEJDRS5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXIgKi9cbiAgICBqZEVwb2NoOiA1ODQyODIuNSxcbiAgICAvKiogPGNvZGU+dHJ1ZTwvY29kZT4gaWYgaGFzIGEgeWVhciB6ZXJvLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiB0cnVlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyICovXG4gICAgbWluTW9udGg6IDAsXG4gICAgLyoqIFRoZSBmaXJzdCBtb250aCBpbiB0aGUgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXIgKi9cbiAgICBmaXJzdE1vbnRoOiAwLFxuICAgIC8qKiBUaGUgbWluaW11bSBkYXkgbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhciAqL1xuICAgIG1pbkRheTogMCxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhclxuICAgICAgICBAcHJvcGVydHkgbmFtZSB7c3RyaW5nfSBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQHByb3BlcnR5IGVwb2NocyB7c3RyaW5nW119IFRoZSBlcG9jaCBuYW1lcy5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzTWluIHtzdHJpbmdbXX0gVGhlIG1pbmltYWwgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXRlRm9ybWF0IHtzdHJpbmd9IFRoZSBkYXRlIGZvcm1hdCBmb3IgdGhpcyBjYWxlbmRhci5cbiAgICAgICAgICAgICAgICBTZWUgdGhlIG9wdGlvbnMgb24gPGEgaHJlZj1cIkJhc2VDYWxlbmRhci5odG1sI2Zvcm1hdERhdGVcIj48Y29kZT5mb3JtYXREYXRlPC9jb2RlPjwvYT4gZm9yIGRldGFpbHMuXG4gICAgICAgIEBwcm9wZXJ0eSBmaXJzdERheSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIHN0YXJ0aW5nIGF0IDAuXG4gICAgICAgIEBwcm9wZXJ0eSBpc1JUTCB7bnVtYmVyfSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGxvY2FsaXNhdGlvbiByZWFkcyByaWdodC10by1sZWZ0LlxuICAgICAgICBAcHJvcGVydHkgaGFhYk1vbnRocyB7c3RyaW5nW119IFRoZSBuYW1lcyBvZiB0aGUgSGFhYiBtb250aHMuXG4gICAgICAgIEBwcm9wZXJ0eSB0em9sa2luTW9udGhzIHtzdHJpbmdbXX0gVGhlIG5hbWVzIG9mIHRoZSBUem9sa2luIG1vbnRocy4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ01heWFuJyxcbiAgICAgICAgICAgIGVwb2NoczogWycnLCAnJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLFxuICAgICAgICAgICAgJzEwJywgJzExJywgJzEyJywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3J10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsXG4gICAgICAgICAgICAnMTAnLCAnMTEnLCAnMTInLCAnMTMnLCAnMTQnLCAnMTUnLCAnMTYnLCAnMTcnXSxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLFxuICAgICAgICAgICAgJzEwJywgJzExJywgJzEyJywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3JywgJzE4JywgJzE5J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLFxuICAgICAgICAgICAgJzEwJywgJzExJywgJzEyJywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3JywgJzE4JywgJzE5J10sXG4gICAgICAgICAgICBkYXlOYW1lc01pbjogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JyxcbiAgICAgICAgICAgICcxMCcsICcxMScsICcxMicsICcxMycsICcxNCcsICcxNScsICcxNicsICcxNycsICcxOCcsICcxOSddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ1lZWVkubS5kJyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAwLFxuICAgICAgICAgICAgaXNSVEw6IGZhbHNlLFxuICAgICAgICAgICAgaGFhYk1vbnRoczogWydQb3AnLCAnVW8nLCAnWmlwJywgJ1pvdHonLCAnVHplYycsICdYdWwnLCAnWWF4a2luJywgJ01vbCcsICdDaGVuJywgJ1lheCcsXG4gICAgICAgICAgICAnWmFjJywgJ0NlaCcsICdNYWMnLCAnS2Fua2luJywgJ011YW4nLCAnUGF4JywgJ0theWFiJywgJ0N1bWt1JywgJ1VheWViJ10sXG4gICAgICAgICAgICB0em9sa2luTW9udGhzOiBbJ0ltaXgnLCAnSWsnLCAnQWtiYWwnLCAnS2FuJywgJ0NoaWNjaGFuJywgJ0NpbWknLCAnTWFuaWsnLCAnTGFtYXQnLCAnTXVsdWMnLCAnT2MnLFxuICAgICAgICAgICAgJ0NodWVuJywgJ0ViJywgJ0JlbicsICdJeCcsICdNZW4nLCAnQ2liJywgJ0NhYmFuJywgJ0V0em5hYicsICdDYXVhYycsICdBaGF1J11cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGluIGEgbGVhcCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYSBsZWFwIHllYXIsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbGVhcFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKiBGb3JtYXQgdGhlIHllYXIsIGlmIG5vdCBhIHNpbXBsZSBzZXF1ZW50aWFsIG51bWJlci5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZm9ybWF0IG9yIHRoZSB5ZWFyIHRvIGZvcm1hdC5cbiAgICAgICAgQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHllYXIuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZm9ybWF0WWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgeWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICB2YXIgYmFrdHVuID0gTWF0aC5mbG9vcih5ZWFyIC8gNDAwKTtcbiAgICAgICAgeWVhciA9IHllYXIgJSA0MDA7XG4gICAgICAgIHllYXIgKz0gKHllYXIgPCAwID8gNDAwIDogMCk7XG4gICAgICAgIHZhciBrYXR1biA9IE1hdGguZmxvb3IoeWVhciAvIDIwKTtcbiAgICAgICAgcmV0dXJuIGJha3R1biArICcuJyArIGthdHVuICsgJy4nICsgKHllYXIgJSAyMCk7XG4gICAgfSxcblxuICAgIC8qKiBDb252ZXJ0IGZyb20gdGhlIGZvcm1hdHRlZCB5ZWFyIGJhY2sgdG8gYSBzaW5nbGUgbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhcnMge3N0cmluZ30gVGhlIHllYXIgYXMgbi5uLm4uXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIHNlcXVlbnRpYWwgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHZhbHVlIGlzIHN1cHBsaWVkLiAqL1xuICAgIGZvclllYXI6IGZ1bmN0aW9uKHllYXJzKSB7XG4gICAgICAgIHllYXJzID0geWVhcnMuc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKHllYXJzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIE1heWFuIHllYXInO1xuICAgICAgICB9XG4gICAgICAgIHZhciB5ZWFyID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB5ZWFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHkgPSBwYXJzZUludCh5ZWFyc1tpXSwgMTApO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHkpID4gMTkgfHwgKGkgPiAwICYmIHkgPCAwKSkge1xuICAgICAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIE1heWFuIHllYXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWVhciA9IHllYXIgKiAyMCArIHk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHllYXI7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIG1vbnRocyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIG1vbnRocy5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBtb250aHNJblllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICByZXR1cm4gMTg7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiAzNjA7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciBvZiB0aGUgbW9udGguXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhpcyBtb250aC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIG1vbnRoL3llYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlzSW5Nb250aDogZnVuY3Rpb24oeWVhciwgbW9udGgpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRNb250aCk7XG4gICAgICAgIHJldHVybiAyMDtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHdlZWsuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzLiAqL1xuICAgIGRheXNJbldlZWs6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gNTsgLy8gSnVzdCBmb3IgZm9ybWF0dGluZ1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgYSBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkYXkgb2YgdGhlIHdlZWs6IDAgdG8gbnVtYmVyIG9mIGRheXMgLSAxLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheU9mV2VlazogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZS5kYXkoKTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBhIHdlZWsgZGF5LlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhYm91dCBhIGRhdGUgLSBIYWFiIGFuZCBUem9sa2luIGVxdWl2YWxlbnRzLlxuICAgICAgICBAbWVtYmVyb2YgTWF5YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtvYmplY3R9IEFkZGl0aW9uYWwgaW5mb3JtYXRpb24gLSBjb250ZW50cyBkZXBlbmRzIG9uIGNhbGVuZGFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGV4dHJhSW5mbzogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICB2YXIgamQgPSBkYXRlLnRvSkQoKTtcbiAgICAgICAgdmFyIGhhYWIgPSB0aGlzLl90b0hhYWIoamQpO1xuICAgICAgICB2YXIgdHpvbGtpbiA9IHRoaXMuX3RvVHpvbGtpbihqZCk7XG4gICAgICAgIHJldHVybiB7aGFhYk1vbnRoTmFtZTogdGhpcy5sb2NhbC5oYWFiTW9udGhzW2hhYWJbMF0gLSAxXSxcbiAgICAgICAgICAgIGhhYWJNb250aDogaGFhYlswXSwgaGFhYkRheTogaGFhYlsxXSxcbiAgICAgICAgICAgIHR6b2xraW5EYXlOYW1lOiB0aGlzLmxvY2FsLnR6b2xraW5Nb250aHNbdHpvbGtpblswXSAtIDFdLFxuICAgICAgICAgICAgdHpvbGtpbkRheTogdHpvbGtpblswXSwgdHpvbGtpblRyZWNlbmE6IHR6b2xraW5bMV19O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgSGFhYiBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXJcbiAgICAgICAgQHByaXZhdGVcbiAgICAgICAgQHBhcmFtIGpkICB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcltdfSBDb3JyZXNwb25kaW5nIEhhYWIgbW9udGggYW5kIGRheS4gKi9cbiAgICBfdG9IYWFiOiBmdW5jdGlvbihqZCkge1xuICAgICAgICBqZCAtPSB0aGlzLmpkRXBvY2g7XG4gICAgICAgIHZhciBkYXkgPSBtb2QoamQgKyA4ICsgKCgxOCAtIDEpICogMjApLCAzNjUpO1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoZGF5IC8gMjApICsgMSwgbW9kKGRheSwgMjApXTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIFR6b2xraW4gZGF0ZSBmcm9tIGEgSnVsaWFuIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyXG4gICAgICAgIEBwcml2YXRlXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcltdfSBDb3JyZXNwb25kaW5nIFR6b2xraW4gZGF5IGFuZCB0cmVjZW5hLiAqL1xuICAgIF90b1R6b2xraW46IGZ1bmN0aW9uKGpkKSB7XG4gICAgICAgIGpkIC09IHRoaXMuamRFcG9jaDtcbiAgICAgICAgcmV0dXJuIFthbW9kKGpkICsgMjAsIDIwKSwgYW1vZChqZCArIDQsIDEzKV07XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIE1heWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gY29udmVydCBvciB0aGUgeWVhciB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZXF1aXZhbGVudCBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b0pEOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHJldHVybiBkYXRlLmRheSgpICsgKGRhdGUubW9udGgoKSAqIDIwKSArIChkYXRlLnllYXIoKSAqIDM2MCkgKyB0aGlzLmpkRXBvY2g7XG4gICAgfSxcblxuICAgIC8qKiBDcmVhdGUgYSBuZXcgZGF0ZSBmcm9tIGEgSnVsaWFuIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBNYXlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICBqZCA9IE1hdGguZmxvb3IoamQpICsgMC41IC0gdGhpcy5qZEVwb2NoO1xuICAgICAgICB2YXIgeWVhciA9IE1hdGguZmxvb3IoamQgLyAzNjApO1xuICAgICAgICBqZCA9IGpkICUgMzYwO1xuICAgICAgICBqZCArPSAoamQgPCAwID8gMzYwIDogMCk7XG4gICAgICAgIHZhciBtb250aCA9IE1hdGguZmxvb3IoamQgLyAyMCk7XG4gICAgICAgIHZhciBkYXkgPSBqZCAlIDIwO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cbn0pO1xuXG4vLyBNb2R1bHVzIGZ1bmN0aW9uIHdoaWNoIHdvcmtzIGZvciBub24taW50ZWdlcnMuXG5mdW5jdGlvbiBtb2QoYSwgYikge1xuICAgIHJldHVybiBhIC0gKGIgKiBNYXRoLmZsb29yKGEgLyBiKSk7XG59XG5cbi8vIE1vZHVsdXMgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBudW1lcmF0b3IgaWYgbW9kdWx1cyBpcyB6ZXJvLlxuZnVuY3Rpb24gYW1vZChhLCBiKSB7XG4gICAgcmV0dXJuIG1vZChhIC0gMSwgYikgKyAxO1xufVxuXG4vLyBNYXlhbiBjYWxlbmRhciBpbXBsZW1lbnRhdGlvblxubWFpbi5jYWxlbmRhcnMubWF5YW4gPSBNYXlhbkNhbGVuZGFyO1xuXG4iLCIvKlxuICogV29ybGQgQ2FsZW5kYXJzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxleGNqb2huc29uL3dvcmxkLWNhbGVuZGFyc1xuICpcbiAqIEJhdGNoLWNvbnZlcnRlZCBmcm9tIGtid29vZC9jYWxlbmRhcnNcbiAqIE1hbnkgdGhhbmtzIHRvIEtlaXRoIFdvb2QgYW5kIGFsbCBvZiB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSBvcmlnaW5hbCBwcm9qZWN0IVxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8qIGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY2FsZW5kYXJzLmh0bWxcbiAgIE5hbmFrc2hhaGkgY2FsZW5kYXIgZm9yIGpRdWVyeSB2Mi4wLjIuXG4gICBXcml0dGVuIGJ5IEtlaXRoIFdvb2QgKHdvb2Qua2VpdGh7YXR9b3B0dXNuZXQuY29tLmF1KSBKYW51YXJ5IDIwMTYuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBtYWluID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuXG4vKiogSW1wbGVtZW50YXRpb24gb2YgdGhlIE5hbmFrc2hhaGkgY2FsZW5kYXIuXG4gICAgU2VlIGFsc28gPGEgaHJlZj1cImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL05hbmFrc2hhaGlfY2FsZW5kYXJcIj5odHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OYW5ha3NoYWhpX2NhbGVuZGFyPC9hPi5cbiAgICBAY2xhc3MgTmFuYWtzaGFoaUNhbGVuZGFyXG4gICAgQHBhcmFtIFtsYW5ndWFnZT0nJ10ge3N0cmluZ30gVGhlIGxhbmd1YWdlIGNvZGUgKGRlZmF1bHQgRW5nbGlzaCkgZm9yIGxvY2FsaXNhdGlvbi4gKi9cbmZ1bmN0aW9uIE5hbmFrc2hhaGlDYWxlbmRhcihsYW5ndWFnZSkge1xuICAgIHRoaXMubG9jYWwgPSB0aGlzLnJlZ2lvbmFsT3B0aW9uc1tsYW5ndWFnZSB8fCAnJ10gfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddO1xufVxuXG5OYW5ha3NoYWhpQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG52YXIgZ3JlZ29yaWFuID0gbWFpbi5pbnN0YW5jZSgnZ3JlZ29yaWFuJyk7XG5cbmFzc2lnbihOYW5ha3NoYWhpQ2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgLyoqIFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAbWVtYmVyb2YgTmFuYWtzaGFoaUNhbGVuZGFyICovXG4gICAgbmFtZTogJ05hbmFrc2hhaGknLFxuICAgIC8qKiBKdWxpYW4gZGF0ZSBvZiBzdGFydCBvZiBOYW5ha3NoYWhpIGVwb2NoOiAxNCBNYXJjaCAxNDY5IENFLlxuICAgICAgICBAbWVtYmVyb2YgTmFuYWtzaGFoaUNhbGVuZGFyICovXG4gICAgamRFcG9jaDogMjI1NzY3My41LFxuICAgIC8qKiBEYXlzIHBlciBtb250aCBpbiBhIGNvbW1vbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgTmFuYWtzaGFoaUNhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzEsIDMxLCAzMSwgMzEsIDMxLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMF0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIE5hbmFrc2hhaGlDYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgTmFuYWtzaGFoaUNhbGVuZGFyICovXG4gICAgbWluTW9udGg6IDEsXG4gICAgLyoqIFRoZSBmaXJzdCBtb250aCBpbiB0aGUgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIE5hbmFrc2hhaGlDYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBOYW5ha3NoYWhpQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIE5hbmFrc2hhaGlDYWxlbmRhclxuICAgICAgICBAcHJvcGVydHkgbmFtZSB7c3RyaW5nfSBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQHByb3BlcnR5IGVwb2NocyB7c3RyaW5nW119IFRoZSBlcG9jaCBuYW1lcy5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzTWluIHtzdHJpbmdbXX0gVGhlIG1pbmltYWwgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXRlRm9ybWF0IHtzdHJpbmd9IFRoZSBkYXRlIGZvcm1hdCBmb3IgdGhpcyBjYWxlbmRhci5cbiAgICAgICAgICAgICAgICBTZWUgdGhlIG9wdGlvbnMgb24gPGEgaHJlZj1cIkJhc2VDYWxlbmRhci5odG1sI2Zvcm1hdERhdGVcIj48Y29kZT5mb3JtYXREYXRlPC9jb2RlPjwvYT4gZm9yIGRldGFpbHMuXG4gICAgICAgIEBwcm9wZXJ0eSBmaXJzdERheSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIHN0YXJ0aW5nIGF0IDAuXG4gICAgICAgIEBwcm9wZXJ0eSBpc1JUTCB7bnVtYmVyfSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGxvY2FsaXNhdGlvbiByZWFkcyByaWdodC10by1sZWZ0LiAqL1xuICAgIHJlZ2lvbmFsT3B0aW9uczogeyAvLyBMb2NhbGlzYXRpb25zXG4gICAgICAgICcnOiB7XG4gICAgICAgICAgICBuYW1lOiAnTmFuYWtzaGFoaScsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQk4nLCAnQU4nXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnQ2hldCcsICdWYWlzYWtoJywgJ0pldGgnLCAnSGFyaCcsICdTYXdhbicsICdCaGFkb24nLFxuICAgICAgICAgICAgJ0Fzc3UnLCAnS2F0YWsnLCAnTWFnaGFyJywgJ1BvaCcsICdNYWdoJywgJ1BoYWd1biddLFxuICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0OiBbJ0NoZScsICdWYWknLCAnSmV0JywgJ0hhcicsICdTYXcnLCAnQmhhJywgJ0FzcycsICdLYXQnLCAnTWdyJywgJ1BvaCcsICdNZ2gnLCAnUGhhJ10sXG4gICAgICAgICAgICBkYXlOYW1lczogWydTb212YWFyJywgJ01hbmdhbHZhcicsICdCdWRodmFhcicsICdWZWVydmFhcicsICdTaHVrYXJ2YWFyJywgJ1NhbmljaGFydmFhcicsICdFdHZhYXInXSxcbiAgICAgICAgICAgIGRheU5hbWVzU2hvcnQ6IFsnU29tJywgJ01hbmdhbCcsICdCdWRoJywgJ1ZlZXInLCAnU2h1a2FyJywgJ1NhbmljaGFyJywgJ0V0J10sXG4gICAgICAgICAgICBkYXlOYW1lc01pbjogWydTbycsICdNYScsICdCdScsICdWZScsICdTaCcsICdTYScsICdFdCddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLW1tLXl5eXknLFxuICAgICAgICAgICAgZmlyc3REYXk6IDAsXG4gICAgICAgICAgICBpc1JUTDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGluIGEgbGVhcCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgTmFuYWtzaGFoaUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBpcyBhIGxlYXAgeWVhciwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBsZWFwWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LFxuICAgICAgICAgICAgbWFpbi5sb2NhbC5pbnZhbGlkWWVhciB8fCBtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ10uaW52YWxpZFllYXIpO1xuICAgICAgICByZXR1cm4gZ3JlZ29yaWFuLmxlYXBZZWFyKGRhdGUueWVhcigpICsgKGRhdGUueWVhcigpIDwgMSA/IDEgOiAwKSArIDE0NjkpO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHRoZSB3ZWVrIG9mIHRoZSB5ZWFyIGZvciBhIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBOYW5ha3NoYWhpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIC8vIEZpbmQgTW9uZGF5IG9mIHRoaXMgd2VlayBzdGFydGluZyBvbiBNb25kYXlcbiAgICAgICAgdmFyIGNoZWNrRGF0ZSA9IHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgY2hlY2tEYXRlLmFkZCgxIC0gKGNoZWNrRGF0ZS5kYXlPZldlZWsoKSB8fCA3KSwgJ2QnKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoZWNrRGF0ZS5kYXlPZlllYXIoKSAtIDEpIC8gNykgKyAxO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBOYW5ha3NoYWhpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciBvZiB0aGUgbW9udGguXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhpcyBtb250aC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIG1vbnRoL3llYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlzSW5Nb250aDogZnVuY3Rpb24oeWVhciwgbW9udGgpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZE1vbnRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5c1Blck1vbnRoW2RhdGUubW9udGgoKSAtIDFdICtcbiAgICAgICAgICAgIChkYXRlLm1vbnRoKCkgPT09IDEyICYmIHRoaXMubGVhcFllYXIoZGF0ZS55ZWFyKCkpID8gMSA6IDApO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGEgd2VlayBkYXkuXG4gICAgICAgIEBtZW1iZXJvZiBOYW5ha3NoYWhpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYSB3ZWVrIGRheSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrRGF5OiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSkgfHwgNykgPCA2O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIEp1bGlhbiBkYXRlIGVxdWl2YWxlbnQgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiBkYXlzIHNpbmNlIEphbnVhcnkgMSwgNDcxMyBCQ0UgR3JlZW53aWNoIG5vb24uXG4gICAgICAgIEBtZW1iZXJvZiBOYW5ha3NoYWhpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gY29udmVydCBvciB0aGUgeWVhciB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZXF1aXZhbGVudCBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b0pEOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICB2YXIgeWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICBpZiAoeWVhciA8IDApIHsgeWVhcisrOyB9IC8vIE5vIHllYXIgemVyb1xuICAgICAgICB2YXIgZG95ID0gZGF0ZS5kYXkoKTtcbiAgICAgICAgZm9yICh2YXIgbSA9IDE7IG0gPCBkYXRlLm1vbnRoKCk7IG0rKykge1xuICAgICAgICAgICAgZG95ICs9IHRoaXMuZGF5c1Blck1vbnRoW20gLSAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG95ICsgZ3JlZ29yaWFuLnRvSkQoeWVhciArIDE0NjgsIDMsIDEzKTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIE5hbmFrc2hhaGlDYWxlbmRhclxuICAgICAgICBAcGFyYW0gamQge251bWJlcn0gVGhlIEp1bGlhbiBkYXRlIHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXF1aXZhbGVudCBkYXRlLiAqL1xuICAgIGZyb21KRDogZnVuY3Rpb24oamQpIHtcbiAgICAgICAgamQgPSBNYXRoLmZsb29yKGpkICsgMC41KTtcbiAgICAgICAgdmFyIHllYXIgPSBNYXRoLmZsb29yKChqZCAtICh0aGlzLmpkRXBvY2ggLSAxKSkgLyAzNjYpO1xuICAgICAgICB3aGlsZSAoamQgPj0gdGhpcy50b0pEKHllYXIgKyAxLCAxLCAxKSkge1xuICAgICAgICAgICAgeWVhcisrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXkgPSBqZCAtIE1hdGguZmxvb3IodGhpcy50b0pEKHllYXIsIDEsIDEpICsgMC41KSArIDE7XG4gICAgICAgIHZhciBtb250aCA9IDE7XG4gICAgICAgIHdoaWxlIChkYXkgPiB0aGlzLmRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSkge1xuICAgICAgICAgICAgZGF5IC09IHRoaXMuZGF5c0luTW9udGgoeWVhciwgbW9udGgpO1xuICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cbn0pO1xuXG4vLyBOYW5ha3NoYWhpIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy5uYW5ha3NoYWhpID0gTmFuYWtzaGFoaUNhbGVuZGFyO1xuXG4iLCIvKlxuICogV29ybGQgQ2FsZW5kYXJzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxleGNqb2huc29uL3dvcmxkLWNhbGVuZGFyc1xuICpcbiAqIEJhdGNoLWNvbnZlcnRlZCBmcm9tIGtid29vZC9jYWxlbmRhcnNcbiAqIE1hbnkgdGhhbmtzIHRvIEtlaXRoIFdvb2QgYW5kIGFsbCBvZiB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSBvcmlnaW5hbCBwcm9qZWN0IVxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbu+7vy8qIGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY2FsZW5kYXJzLmh0bWxcbiAgIE5lcGFsaSBjYWxlbmRhciBmb3IgalF1ZXJ5IHYyLjAuMi5cbiAgIFdyaXR0ZW4gYnkgQXJ0dXIgTmV1bWFubiAoaWN0LnByb2plY3Rze2F0fW5lcGFsLmluZi5vcmcpIEFwcmlsIDIwMTMuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBtYWluID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuXG4vKiogSW1wbGVtZW50YXRpb24gb2YgdGhlIE5lcGFsaSBjaXZpbCBjYWxlbmRhci5cbiAgICBCYXNlZCBvbiB0aGUgaWRlYXMgZnJvbSBcbiAgICA8YSBocmVmPVwiaHR0cDovL2NvZGVpc3N1ZS5jb20vYXJ0aWNsZXMvYTA0ZTA1MGRlYTc0NjhmL2FsZ29yaXRobS10by1jb252ZXJ0LWVuZ2xpc2gtZGF0ZS10by1uZXBhbGktZGF0ZS11c2luZy1jLW5ldFwiPmh0dHA6Ly9jb2RlaXNzdWUuY29tL2FydGljbGVzL2EwNGUwNTBkZWE3NDY4Zi9hbGdvcml0aG0tdG8tY29udmVydC1lbmdsaXNoLWRhdGUtdG8tbmVwYWxpLWRhdGUtdXNpbmctYy1uZXQ8L2E+XG4gICAgYW5kIDxhIGhyZWY9XCJodHRwOi8vYmlyZW5qMmVlLmJsb2dzcG90LmNvbS8yMDExLzA0L25lcGFsaS1jYWxlbmRhci1pbi1qYXZhLmh0bWxcIj5odHRwOi8vYmlyZW5qMmVlLmJsb2dzcG90LmNvbS8yMDExLzA0L25lcGFsaS1jYWxlbmRhci1pbi1qYXZhLmh0bWw8L2E+XG4gICAgU2VlIGFsc28gPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTmVwYWxpX2NhbGVuZGFyXCI+aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OZXBhbGlfY2FsZW5kYXI8L2E+XG4gICAgYW5kIDxhIGhyZWY9XCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CaWtyYW1fU2Ftd2F0XCI+aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmlrcmFtX1NhbXdhdDwvYT4uXG4gICAgQGNsYXNzIE5lcGFsaUNhbGVuZGFyXG4gICAgQHBhcmFtIFtsYW5ndWFnZT0nJ10ge3N0cmluZ30gVGhlIGxhbmd1YWdlIGNvZGUgKGRlZmF1bHQgRW5nbGlzaCkgZm9yIGxvY2FsaXNhdGlvbi4gKi9cbmZ1bmN0aW9uIE5lcGFsaUNhbGVuZGFyKGxhbmd1YWdlKSB7XG4gICAgdGhpcy5sb2NhbCA9IHRoaXMucmVnaW9uYWxPcHRpb25zW2xhbmd1YWdlIHx8ICcnXSB8fCB0aGlzLnJlZ2lvbmFsT3B0aW9uc1snJ107XG59XG5cbk5lcGFsaUNhbGVuZGFyLnByb3RvdHlwZSA9IG5ldyBtYWluLmJhc2VDYWxlbmRhcjtcblxuYXNzaWduKE5lcGFsaUNhbGVuZGFyLnByb3RvdHlwZSwge1xuICAgIC8qKiBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQG1lbWJlcm9mIE5lcGFsaUNhbGVuZGFyICovXG4gICAgbmFtZTogJ05lcGFsaScsXG4gICAgLyoqIEp1bGlhbiBkYXRlIG9mIHN0YXJ0IG9mIE5lcGFsaSBlcG9jaDogMTQgQXByaWwgNTcgQkNFLlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXIgKi9cbiAgICBqZEVwb2NoOiAxNzAwNzA5LjUsXG4gICAgLyoqIERheXMgcGVyIG1vbnRoIGluIGEgY29tbW9uIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBOZXBhbGlDYWxlbmRhciAqL1xuICAgIGRheXNQZXJNb250aDogWzMxLCAzMSwgMzIsIDMyLCAzMSwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMCwgMzBdLFxuICAgIC8qKiA8Y29kZT50cnVlPC9jb2RlPiBpZiBoYXMgYSB5ZWFyIHplcm8sIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEBtZW1iZXJvZiBOZXBhbGlDYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXIgKi9cbiAgICBtaW5Nb250aDogMSxcbiAgICAvKiogVGhlIGZpcnN0IG1vbnRoIGluIHRoZSB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXIgKi9cbiAgICBmaXJzdE1vbnRoOiAxLFxuICAgIC8qKiBUaGUgbWluaW11bSBkYXkgbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsIFxuICAgIC8qKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBOZXBhbGlDYWxlbmRhciAqL1xuICAgIGRheXNQZXJZZWFyOiAzNjUsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIE5lcGFsaUNhbGVuZGFyXG4gICAgICAgIEBwcm9wZXJ0eSBuYW1lIHtzdHJpbmd9IFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAcHJvcGVydHkgZXBvY2hzIHtzdHJpbmdbXX0gVGhlIGVwb2NoIG5hbWVzLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNNaW4ge3N0cmluZ1tdfSBUaGUgbWluaW1hbCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRhdGVGb3JtYXQge3N0cmluZ30gVGhlIGRhdGUgZm9ybWF0IGZvciB0aGlzIGNhbGVuZGFyLlxuICAgICAgICAgICAgICAgIFNlZSB0aGUgb3B0aW9ucyBvbiA8YSBocmVmPVwiQmFzZUNhbGVuZGFyLmh0bWwjZm9ybWF0RGF0ZVwiPjxjb2RlPmZvcm1hdERhdGU8L2NvZGU+PC9hPiBmb3IgZGV0YWlscy5cbiAgICAgICAgQHByb3BlcnR5IGZpcnN0RGF5IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlaywgc3RhcnRpbmcgYXQgMC5cbiAgICAgICAgQHByb3BlcnR5IGlzUlRMIHtudW1iZXJ9IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgbG9jYWxpc2F0aW9uIHJlYWRzIHJpZ2h0LXRvLWxlZnQuICovXG4gICAgcmVnaW9uYWxPcHRpb25zOiB7IC8vIExvY2FsaXNhdGlvbnNcbiAgICAgICAgJyc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdOZXBhbGknLFxuICAgICAgICAgICAgZXBvY2hzOiBbJ0JCUycsICdBQlMnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnQmFpc2FraCcsICdKZXN0aGEnLCAnQXNoYWRoJywgJ1NocmF3YW4nLCAnQmhhZHJhJywgJ0FzaHdpbicsXG4gICAgICAgICAgICAnS2FydGlrJywgJ01hbmdzaXInLCAnUGF1c2gnLCAnTWFuZ2gnLCAnRmFsZ3VuJywgJ0NoYWl0cmEnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydDogWydCYWknLCAnSmUnLCAnQXMnLCAnU2hyYScsICdCaGEnLCAnQXNoJywgJ0thcicsICdNYW5nJywgJ1BhdScsICdNYScsICdGYWwnLCAnQ2hhaSddLFxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnQWFpdGFiYWFyJywgJ1NvbWJhYXInLCAnTWFuZ2xiYWFyJywgJ0J1ZGhhYmFhcicsICdCaWhpYmFhcicsICdTaHVrcmFiYWFyJywgJ1NoYW5pYmFhciddLFxuICAgICAgICAgICAgZGF5TmFtZXNTaG9ydDogWydBYWl0YScsICdTb20nLCAnTWFuZ2wnLCAnQnVkaGEnLCAnQmloaScsICdTaHVrcmEnLCAnU2hhbmknXSxcbiAgICAgICAgICAgIGRheU5hbWVzTWluOiBbJ0FhaScsICdTbycsICdNYW4nLCAnQnUnLCAnQmknLCAnU2h1JywgJ1NoYSddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkL21tL3l5eXknLFxuICAgICAgICAgICAgZmlyc3REYXk6IDEsXG4gICAgICAgICAgICBpc1JUTDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGluIGEgbGVhcCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGlzIGEgbGVhcCB5ZWFyLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGxlYXBZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRheXNJblllYXIoeWVhcikgIT09IHRoaXMuZGF5c1BlclllYXI7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIE5lcGFsaUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIHdlZWsgb2YgdGhlIHllYXIuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgd2Vla09mWWVhcjogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICAvLyBGaW5kIFN1bmRheSBvZiB0aGlzIHdlZWsgc3RhcnRpbmcgb24gU3VuZGF5XG4gICAgICAgIHZhciBjaGVja0RhdGUgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgIGNoZWNrRGF0ZS5hZGQoLWNoZWNrRGF0ZS5kYXlPZldlZWsoKSwgJ2QnKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoZWNrRGF0ZS5kYXlPZlllYXIoKSAtIDEpIC8gNykgKyAxO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIE5lcGFsaUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgeWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuTkVQQUxJX0NBTEVOREFSX0RBVEFbeWVhcl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXlzUGVyWWVhcjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5c1BlclllYXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBtb250aF9udW1iZXIgPSB0aGlzLm1pbk1vbnRoOyBtb250aF9udW1iZXIgPD0gMTI7IG1vbnRoX251bWJlcisrKSB7XG4gICAgICAgICAgICBkYXlzUGVyWWVhciArPSB0aGlzLk5FUEFMSV9DQUxFTkRBUl9EQVRBW3llYXJdW21vbnRoX251bWJlcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRheXNQZXJZZWFyO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBOZXBhbGlDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfCBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICBpZiAoeWVhci55ZWFyKSB7XG4gICAgICAgICAgICBtb250aCA9IHllYXIubW9udGgoKTtcbiAgICAgICAgICAgIHllYXIgPSB5ZWFyLnllYXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZE1vbnRoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGhpcy5ORVBBTElfQ0FMRU5EQVJfREFUQVt5ZWFyXSA9PT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgICAgICAgdGhpcy5kYXlzUGVyTW9udGhbbW9udGggLSAxXSA6IHRoaXMuTkVQQUxJX0NBTEVOREFSX0RBVEFbeWVhcl1bbW9udGhdKTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBhIHdlZWsgZGF5LlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYSB3ZWVrIGRheSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrRGF5OiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF5KSAhPT0gNjtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBKdWxpYW4gZGF0ZSBlcXVpdmFsZW50IGZvciB0aGlzIGRhdGUsXG4gICAgICAgIGkuZS4gZGF5cyBzaW5jZSBKYW51YXJ5IDEsIDQ3MTMgQkNFIEdyZWVud2ljaCBub29uLlxuICAgICAgICBAbWVtYmVyb2YgTmVwYWxpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gY29udmVydCBvciB0aGUgeWVhciB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZXF1aXZhbGVudCBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b0pEOiBmdW5jdGlvbihuZXBhbGlZZWFyLCBuZXBhbGlNb250aCwgbmVwYWxpRGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUobmVwYWxpWWVhciwgbmVwYWxpTW9udGgsIG5lcGFsaURheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIG5lcGFsaVllYXIgPSBkYXRlLnllYXIoKTtcbiAgICAgICAgbmVwYWxpTW9udGggPSBkYXRlLm1vbnRoKCk7XG4gICAgICAgIG5lcGFsaURheSA9IGRhdGUuZGF5KCk7XG4gICAgICAgIHZhciBncmVnb3JpYW5DYWxlbmRhciA9IG1haW4uaW5zdGFuY2UoKTtcbiAgICAgICAgdmFyIGdyZWdvcmlhbkRheU9mWWVhciA9IDA7IC8vIFdlIHdpbGwgYWRkIGFsbCB0aGUgZGF5cyB0aGF0IHdlbnQgYnkgc2luY2VcbiAgICAgICAgLy8gdGhlIDFzdC4gSmFudWFyeSBhbmQgdGhlbiB3ZSBjYW4gZ2V0IHRoZSBHcmVnb3JpYW4gRGF0ZVxuICAgICAgICB2YXIgbmVwYWxpTW9udGhUb0NoZWNrID0gbmVwYWxpTW9udGg7XG4gICAgICAgIHZhciBuZXBhbGlZZWFyVG9DaGVjayA9IG5lcGFsaVllYXI7XG4gICAgICAgIHRoaXMuX2NyZWF0ZU1pc3NpbmdDYWxlbmRhckRhdGEobmVwYWxpWWVhcik7XG4gICAgICAgIC8vIEdldCB0aGUgY29ycmVjdCB5ZWFyXG4gICAgICAgIHZhciBncmVnb3JpYW5ZZWFyID0gbmVwYWxpWWVhciAtIChuZXBhbGlNb250aFRvQ2hlY2sgPiA5IHx8IChuZXBhbGlNb250aFRvQ2hlY2sgPT09IDkgJiZcbiAgICAgICAgICAgIG5lcGFsaURheSA+PSB0aGlzLk5FUEFMSV9DQUxFTkRBUl9EQVRBW25lcGFsaVllYXJUb0NoZWNrXVswXSkgPyA1NiA6IDU3KTtcbiAgICAgICAgLy8gRmlyc3Qgd2UgYWRkIHRoZSBhbW91bnQgb2YgZGF5cyBpbiB0aGUgYWN0dWFsIE5lcGFsaSBtb250aCBhcyB0aGUgZGF5IG9mIHllYXIgaW4gdGhlXG4gICAgICAgIC8vIEdyZWdvcmlhbiBvbmUgYmVjYXVzZSBhdCBsZWFzdCB0aGlzIGRheXMgYXJlIGdvbmUgc2luY2UgdGhlIDFzdC4gSmFuLiBcbiAgICAgICAgaWYgKG5lcGFsaU1vbnRoICE9PSA5KSB7XG4gICAgICAgICAgICBncmVnb3JpYW5EYXlPZlllYXIgPSBuZXBhbGlEYXk7XG4gICAgICAgICAgICBuZXBhbGlNb250aFRvQ2hlY2stLTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3cgd2UgbG9vcCB0aHJvdyBhbGwgTmVwYWxpIG1vbnRoIGFuZCBhZGQgdGhlIGFtb3VudCBvZiBkYXlzIHRvIGdyZWdvcmlhbkRheU9mWWVhciBcbiAgICAgICAgLy8gd2UgZG8gdGhpcyB0aWxsIHdlIHJlYWNoIFBhdXNoICg5dGggbW9udGgpLiAxc3QuIEphbnVhcnkgYWx3YXlzIGZhbGxzIGluIHRoaXMgbW9udGggIFxuICAgICAgICB3aGlsZSAobmVwYWxpTW9udGhUb0NoZWNrICE9PSA5KSB7XG4gICAgICAgICAgICBpZiAobmVwYWxpTW9udGhUb0NoZWNrIDw9IDApIHtcbiAgICAgICAgICAgICAgICBuZXBhbGlNb250aFRvQ2hlY2sgPSAxMjtcbiAgICAgICAgICAgICAgICBuZXBhbGlZZWFyVG9DaGVjay0tO1xuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGdyZWdvcmlhbkRheU9mWWVhciArPSB0aGlzLk5FUEFMSV9DQUxFTkRBUl9EQVRBW25lcGFsaVllYXJUb0NoZWNrXVtuZXBhbGlNb250aFRvQ2hlY2tdO1xuICAgICAgICAgICAgbmVwYWxpTW9udGhUb0NoZWNrLS07XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICAvLyBJZiB0aGUgZGF0ZSB0aGF0IGhhcyB0byBiZSBjb252ZXJ0ZWQgaXMgaW4gUGF1c2ggKG1vbnRoIG5vLiA5KSB3ZSBoYXZlIHRvIGRvIHNvbWUgb3RoZXIgY2FsY3VsYXRpb25cbiAgICAgICAgaWYgKG5lcGFsaU1vbnRoID09PSA5KSB7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGRheXMgdGhhdCBhcmUgcGFzc2VkIHNpbmNlIHRoZSBmaXJzdCBkYXkgb2YgUGF1c2ggYW5kIHN1YnN0cmFjdCB0aGVcbiAgICAgICAgICAgIC8vIGFtb3VudCBvZiBkYXlzIHRoYXQgbGllIGJldHdlZW4gMXN0LiBKYW4gYW5kIDFzdCBQYXVzaFxuICAgICAgICAgICAgZ3JlZ29yaWFuRGF5T2ZZZWFyICs9IG5lcGFsaURheSAtIHRoaXMuTkVQQUxJX0NBTEVOREFSX0RBVEFbbmVwYWxpWWVhclRvQ2hlY2tdWzBdO1xuICAgICAgICAgICAgLy8gRm9yIHRoZSBmaXJzdCBkYXlzIG9mIFBhdXNoIHdlIGFyZSBub3cgaW4gbmVnYXRpdmUgdmFsdWVzLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSBpbiB0aGUgZW5kIG9mIHRoZSBncmVnb3JpYW4geWVhciB3ZSBzdWJzdHJhY3RcbiAgICAgICAgICAgIC8vIDM2NSAvIDM2NiBkYXlzIChQLlMuIHJlbWVtYmVyIG1hdGggaW4gc2Nob29sICsgLSBnaXZlcyAtKVxuICAgICAgICAgICAgaWYgKGdyZWdvcmlhbkRheU9mWWVhciA8IDApIHtcbiAgICAgICAgICAgICAgICBncmVnb3JpYW5EYXlPZlllYXIgKz0gZ3JlZ29yaWFuQ2FsZW5kYXIuZGF5c0luWWVhcihncmVnb3JpYW5ZZWFyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdyZWdvcmlhbkRheU9mWWVhciArPSB0aGlzLk5FUEFMSV9DQUxFTkRBUl9EQVRBW25lcGFsaVllYXJUb0NoZWNrXVs5XSAtXG4gICAgICAgICAgICAgICAgdGhpcy5ORVBBTElfQ0FMRU5EQVJfREFUQVtuZXBhbGlZZWFyVG9DaGVja11bMF07XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICByZXR1cm4gZ3JlZ29yaWFuQ2FsZW5kYXIubmV3RGF0ZShncmVnb3JpYW5ZZWFyLCAxICwxKS5hZGQoZ3JlZ29yaWFuRGF5T2ZZZWFyLCAnZCcpLnRvSkQoKTtcbiAgICB9LFxuICAgIFxuICAgIC8qKiBDcmVhdGUgYSBuZXcgZGF0ZSBmcm9tIGEgSnVsaWFuIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBOZXBhbGlDYWxlbmRhclxuICAgICAgICBAcGFyYW0gamQge251bWJlcn0gVGhlIEp1bGlhbiBkYXRlIHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXF1aXZhbGVudCBkYXRlLiAqL1xuICAgIGZyb21KRDogZnVuY3Rpb24oamQpIHtcbiAgICAgICAgdmFyIGdyZWdvcmlhbkNhbGVuZGFyID0gIG1haW4uaW5zdGFuY2UoKTtcbiAgICAgICAgdmFyIGdyZWdvcmlhbkRhdGUgPSBncmVnb3JpYW5DYWxlbmRhci5mcm9tSkQoamQpO1xuICAgICAgICB2YXIgZ3JlZ29yaWFuWWVhciA9IGdyZWdvcmlhbkRhdGUueWVhcigpO1xuICAgICAgICB2YXIgZ3JlZ29yaWFuRGF5T2ZZZWFyID0gZ3JlZ29yaWFuRGF0ZS5kYXlPZlllYXIoKTtcbiAgICAgICAgdmFyIG5lcGFsaVllYXIgPSBncmVnb3JpYW5ZZWFyICsgNTY7IC8vdGhpcyBpcyBub3QgZmluYWwsIGl0IGNvdWxkIGJlIGFsc28gKzU3IGJ1dCArNTYgaXMgYWx3YXlzIHRydWUgZm9yIDFzdCBKYW4uXG4gICAgICAgIHRoaXMuX2NyZWF0ZU1pc3NpbmdDYWxlbmRhckRhdGEobmVwYWxpWWVhcik7XG4gICAgICAgIHZhciBuZXBhbGlNb250aCA9IDk7IC8vIEphbiAxIGFsd2F5cyBmYWxsIGluIE5lcGFsaSBtb250aCBQYXVzaCB3aGljaCBpcyB0aGUgOXRoIG1vbnRoIG9mIE5lcGFsaSBjYWxlbmRhci5cbiAgICAgICAgLy8gR2V0IHRoZSBOZXBhbGkgZGF5IGluIFBhdXNoIChtb250aCA5KSBvZiAxc3QgSmFudWFyeSBcbiAgICAgICAgdmFyIGRheU9mRmlyc3RKYW5JblBhdXNoID0gdGhpcy5ORVBBTElfQ0FMRU5EQVJfREFUQVtuZXBhbGlZZWFyXVswXTtcbiAgICAgICAgLy8gQ2hlY2sgaG93IG1hbnkgZGF5cyBhcmUgbGVmdCBvZiBQYXVzaCAuXG4gICAgICAgIC8vIERheXMgY2FsY3VsYXRlZCBmcm9tIDFzdCBKYW4gdGlsbCB0aGUgZW5kIG9mIHRoZSBhY3R1YWwgTmVwYWxpIG1vbnRoLCBcbiAgICAgICAgLy8gd2UgdXNlIHRoaXMgdmFsdWUgdG8gY2hlY2sgaWYgdGhlIGdyZWdvcmlhbiBEYXRlIGlzIGluIHRoZSBhY3R1YWwgTmVwYWxpIG1vbnRoLlxuICAgICAgICB2YXIgZGF5c1NpbmNlSmFuRmlyc3RUb0VuZE9mTmVwYWxpTW9udGggPVxuICAgICAgICAgICAgdGhpcy5ORVBBTElfQ0FMRU5EQVJfREFUQVtuZXBhbGlZZWFyXVtuZXBhbGlNb250aF0gLSBkYXlPZkZpcnN0SmFuSW5QYXVzaCArIDE7XG4gICAgICAgIC8vIElmIHRoZSBncmVnb3JpYW4gZGF5LW9mLXllYXIgaXMgc21hbGxlciBvIGVxdWFsIHRoYW4gdGhlIHN1bSBvZiBkYXlzIGJldHdlZW4gdGhlIDFzdCBKYW51YXJ5IGFuZCBcbiAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgYWN0dWFsIG5lcGFsaSBtb250aCB3ZSBmb3VuZCB0aGUgY29ycmVjdCBuZXBhbGkgbW9udGguXG4gICAgICAgIC8vIEV4YW1wbGU6IFxuICAgICAgICAvLyBUaGUgNHRoIEZlYnJ1YXJ5IDIwMTEgaXMgdGhlIGdyZWdvcmlhbkRheU9mWWVhciAzNSAoMzEgZGF5cyBvZiBKYW51YXJ5ICsgNClcbiAgICAgICAgLy8gMXN0IEphbnVhcnkgMjAxMSBpcyBpbiB0aGUgbmVwYWxpIHllYXIgMjA2Nywgd2hlcmUgMXN0LiBKYW51YXJ5IGlzIGluIHRoZSAxN3RoIGRheSBvZiBQYXVzaCAoOXRoIG1vbnRoKVxuICAgICAgICAvLyBJbiAyMDY3IFBhdXNoIGhhcyAzMGRheXMsIFRoaXMgbWVhbnMgKDMwLTE3KzE9MTQpIHRoZXJlIGFyZSAxNGRheXMgYmV0d2VlbiAxc3QgSmFudWFyeSBhbmQgZW5kIG9mIFBhdXNoIFxuICAgICAgICAvLyAoaW5jbHVkaW5nIDE3dGggSmFudWFyeSlcbiAgICAgICAgLy8gVGhlIGdyZWdvcmlhbkRheU9mWWVhciAoMzUpIGlzIGJpZ2dlciB0aGFuIDE0LCBzbyB3ZSBjaGVjayB0aGUgbmV4dCBtb250aFxuICAgICAgICAvLyBUaGUgbmV4dCBuZXBhbGkgbW9udGggKE1hbmdoKSBoYXMgMjkgZGF5cyBcbiAgICAgICAgLy8gMjkrMTQ9NDMsIHRoaXMgaXMgYmlnZ2VyIHRoYW4gZ3JlZ29yaWFuRGF5T2ZZZWFyKDM1KSBzbywgd2UgZm91bmQgdGhlIGNvcnJlY3QgbmVwYWxpIG1vbnRoXG4gICAgICAgIHdoaWxlIChncmVnb3JpYW5EYXlPZlllYXIgPiBkYXlzU2luY2VKYW5GaXJzdFRvRW5kT2ZOZXBhbGlNb250aCkge1xuICAgICAgICAgICAgbmVwYWxpTW9udGgrKztcbiAgICAgICAgICAgIGlmIChuZXBhbGlNb250aCA+IDEyKSB7XG4gICAgICAgICAgICAgICAgbmVwYWxpTW9udGggPSAxO1xuICAgICAgICAgICAgICAgIG5lcGFsaVllYXIrKztcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICBkYXlzU2luY2VKYW5GaXJzdFRvRW5kT2ZOZXBhbGlNb250aCArPSB0aGlzLk5FUEFMSV9DQUxFTkRBUl9EQVRBW25lcGFsaVllYXJdW25lcGFsaU1vbnRoXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgbGFzdCBzdGVwIGlzIHRvIGNhbGN1bGF0ZSB0aGUgbmVwYWxpIGRheS1vZi1tb250aFxuICAgICAgICAvLyB0byBjb250aW51ZSBvdXIgZXhhbXBsZSBmcm9tIGJlZm9yZTpcbiAgICAgICAgLy8gd2UgY2FsY3VsYXRlZCB0aGVyZSBhcmUgNDMgZGF5cyBmcm9tIDFzdC4gSmFudWFyeSAoMTcgUGF1c2gpIHRpbGwgZW5kIG9mIE1hbmdoICgyOSBkYXlzKVxuICAgICAgICAvLyB3aGVuIHdlIHN1YnRyYWN0IGZyb20gdGhpcyA0MyBkYXlzIHRoZSBkYXktb2YteWVhciBvZiB0aGUgdGhlIEdyZWdvcmlhbiBkYXRlICgzNSksXG4gICAgICAgIC8vIHdlIGtub3cgaG93IGZhciB0aGUgc2VhcmNoZWQgZGF5IGlzIGF3YXkgZnJvbSB0aGUgZW5kIG9mIHRoZSBOZXBhbGkgbW9udGguXG4gICAgICAgIC8vIFNvIHdlIHNpbXBseSBzdWJ0cmFjdCB0aGlzIG51bWJlciBmcm9tIHRoZSBhbW91bnQgb2YgZGF5cyBpbiB0aGlzIG1vbnRoICgzMCkgXG4gICAgICAgIHZhciBuZXBhbGlEYXlPZk1vbnRoID0gdGhpcy5ORVBBTElfQ0FMRU5EQVJfREFUQVtuZXBhbGlZZWFyXVtuZXBhbGlNb250aF0gLVxuICAgICAgICAgICAgKGRheXNTaW5jZUphbkZpcnN0VG9FbmRPZk5lcGFsaU1vbnRoIC0gZ3JlZ29yaWFuRGF5T2ZZZWFyKTsgICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKG5lcGFsaVllYXIsIG5lcGFsaU1vbnRoLCBuZXBhbGlEYXlPZk1vbnRoKTtcbiAgICB9LFxuICAgIFxuICAgIC8qKiBDcmVhdGVzIG1pc3NpbmcgZGF0YSBpbiB0aGUgTkVQQUxJX0NBTEVOREFSX0RBVEEgdGFibGUuXG4gICAgICAgIFRoaXMgZGF0YSB3aWxsIG5vdCBiZSBjb3JyZWN0IGJ1dCBqdXN0IGdpdmUgYW4gZXN0aW1hdGVkIHJlc3VsdC4gTW9zdGx5IC0vKyAxIGRheVxuICAgICAgICBAcHJpdmF0ZVxuICAgICAgICBAcGFyYW0gbmVwYWxpWWVhciB7bnVtYmVyfSBUaGUgbWlzc2luZyB5ZWFyIG51bWJlci4gKi9cbiAgICBfY3JlYXRlTWlzc2luZ0NhbGVuZGFyRGF0YTogZnVuY3Rpb24obmVwYWxpWWVhcikge1xuICAgICAgICB2YXIgdG1wX2NhbGVuZGFyX2RhdGEgPSB0aGlzLmRheXNQZXJNb250aC5zbGljZSgwKTtcbiAgICAgICAgdG1wX2NhbGVuZGFyX2RhdGEudW5zaGlmdCgxNyk7XG4gICAgICAgIGZvciAodmFyIG5lcGFsaVllYXJUb0NyZWF0ZSA9IChuZXBhbGlZZWFyIC0gMSk7IG5lcGFsaVllYXJUb0NyZWF0ZSA8IChuZXBhbGlZZWFyICsgMik7IG5lcGFsaVllYXJUb0NyZWF0ZSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuTkVQQUxJX0NBTEVOREFSX0RBVEFbbmVwYWxpWWVhclRvQ3JlYXRlXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLk5FUEFMSV9DQUxFTkRBUl9EQVRBW25lcGFsaVllYXJUb0NyZWF0ZV0gPSB0bXBfY2FsZW5kYXJfZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgTkVQQUxJX0NBTEVOREFSX0RBVEE6ICB7XG4gICAgICAgIC8vIFRoZXNlIGRhdGEgYXJlIGZyb20gaHR0cDovL3d3dy5hc2hlc2guY29tLm5wXG4gICAgICAgIDE5NzA6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5NzE6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMyLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5NzI6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5NzM6IFsxOSwgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDE5NzQ6IFsxOSwgMzEsIDMxLCAzMiwgMzAsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5NzU6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMwLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5NzY6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDE5Nzc6IFsxOCwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDE5Nzg6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5Nzk6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODA6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDE5ODE6IFsxOCwgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODI6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODM6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODQ6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDE5ODU6IFsxOCwgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODY6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODc6IFsxOCwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5ODg6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDE5ODk6IFsxOCwgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTA6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTE6IFsxOCwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sICAgIFxuICAgICAgICAvLyBUaGVzZSBkYXRhIGFyZSBmcm9tIGh0dHA6Ly9uZXBhbGljYWxlbmRhci5yYXQzMi5jb20vaW5kZXgucGhwXG4gICAgICAgIDE5OTI6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDE5OTM6IFsxOCwgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTQ6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTU6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTY6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDE5OTc6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTg6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDE5OTk6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMDA6IFsxNywgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwMDE6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMDI6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMDM6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMDQ6IFsxNywgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwMDU6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMDY6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMDc6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMDg6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDI5LCAzMV0sXG4gICAgICAgIDIwMDk6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTA6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTE6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMTI6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTM6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTQ6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTU6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMTY6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTc6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTg6IFsxOCwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMTk6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwMjA6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMjE6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMjI6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMjM6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwMjQ6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMjU6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMjY6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMjc6IFsxNywgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwMjg6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMjk6IFsxOCwgMzEsIDMxLCAzMiwgMzEsIDMyLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMzA6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAzMCwgMzAsIDMwLCAzMV0sXG4gICAgICAgIDIwMzE6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMSwgMzEsIDMxLCAzMSwgMzEsIDMxLCAzMV0sXG4gICAgICAgIDIwMzI6IFsxNywgMzIsIDMyLCAzMiwgMzIsIDMyLCAzMiwgMzIsIDMyLCAzMiwgMzIsIDMyLCAzMl0sXG4gICAgICAgIDIwMzM6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMzQ6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMzU6IFsxNywgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDI5LCAzMV0sXG4gICAgICAgIDIwMzY6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMzc6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwMzg6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwMzk6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDA6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDE6IFsxOCwgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDI6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNDM6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDQ6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDU6IFsxOCwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDY6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNDc6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDg6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNDk6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNTA6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwNTE6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNTI6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNTM6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNTQ6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwNTU6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMzAsIDI5LCAzMF0sXG4gICAgICAgIDIwNTY6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMyLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNTc6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNTg6IFsxNywgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwNTk6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNjA6IFsxNywgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNjE6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNjI6IFsxNywgMzAsIDMyLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwNjM6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNjQ6IFsxNywgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNjU6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNjY6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDI5LCAzMV0sXG4gICAgICAgIDIwNjc6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNjg6IFsxNywgMzEsIDMxLCAzMiwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNjk6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNzA6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMjksIDMwLCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzE6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzI6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzM6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMV0sXG4gICAgICAgIDIwNzQ6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzU6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzY6IFsxNiwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzc6IFsxNywgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMzAsIDI5LCAzMV0sXG4gICAgICAgIDIwNzg6IFsxNywgMzEsIDMxLCAzMSwgMzIsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwNzk6IFsxNywgMzEsIDMxLCAzMiwgMzEsIDMxLCAzMSwgMzAsIDI5LCAzMCwgMjksIDMwLCAzMF0sXG4gICAgICAgIDIwODA6IFsxNiwgMzEsIDMyLCAzMSwgMzIsIDMxLCAzMCwgMzAsIDMwLCAyOSwgMjksIDMwLCAzMF0sXG4gICAgICAgIC8vIFRoZXNlIGRhdGEgYXJlIGZyb20gaHR0cDovL3d3dy5hc2hlc2guY29tLm5wL25lcGFsaS1jYWxlbmRhci9cbiAgICAgICAgMjA4MTogWzE3LCAzMSwgMzEsIDMyLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4MjogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4MzogWzE3LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4NDogWzE3LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4NTogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4NjogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4NzogWzE2LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4ODogWzE2LCAzMCwgMzEsIDMyLCAzMiwgMzAsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA4OTogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5MDogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5MTogWzE2LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMxLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5MjogWzE2LCAzMSwgMzEsIDMyLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5MzogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5NDogWzE3LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5NTogWzE3LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMxLCAzMCwgMjksIDMwLCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5NjogWzE3LCAzMCwgMzEsIDMyLCAzMiwgMzEsIDMwLCAzMCwgMjksIDMwLCAyOSwgMzAsIDMwXSxcbiAgICAgICAgMjA5NzogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzEsIDMwLCAzMCwgMzAsIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjA5ODogWzE3LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMxLCAyOSwgMzAsIDI5LCAzMCwgMzAsIDMxXSxcbiAgICAgICAgMjA5OTogWzE3LCAzMSwgMzEsIDMyLCAzMSwgMzEsIDMxLCAzMCwgMjksIDI5LCAzMCwgMzAsIDMwXSxcbiAgICAgICAgMjEwMDogWzE3LCAzMSwgMzIsIDMxLCAzMiwgMzAsIDMxLCAzMCwgMjksIDMwLCAyOSwgMzAsIDMwXSAgICBcbiAgICB9XG59KTsgICAgXG5cbi8vIE5lcGFsaSBjYWxlbmRhciBpbXBsZW1lbnRhdGlvblxubWFpbi5jYWxlbmRhcnMubmVwYWxpID0gTmVwYWxpQ2FsZW5kYXI7XG5cbiIsIi8qXG4gKiBXb3JsZCBDYWxlbmRhcnNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4Y2pvaG5zb24vd29ybGQtY2FsZW5kYXJzXG4gKlxuICogQmF0Y2gtY29udmVydGVkIGZyb20ga2J3b29kL2NhbGVuZGFyc1xuICogTWFueSB0aGFua3MgdG8gS2VpdGggV29vZCBhbmQgYWxsIG9mIHRoZSBjb250cmlidXRvcnMgdG8gdGhlIG9yaWdpbmFsIHByb2plY3QhXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxu77u/LyogaHR0cDovL2tlaXRoLXdvb2QubmFtZS9jYWxlbmRhcnMuaHRtbFxuICAgUGVyc2lhbiBjYWxlbmRhciBmb3IgalF1ZXJ5IHYyLjAuMi5cbiAgIFdyaXR0ZW4gYnkgS2VpdGggV29vZCAod29vZC5rZWl0aHthdH1vcHR1c25ldC5jb20uYXUpIEF1Z3VzdCAyMDA5LlxuICAgQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgKGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvbGljZW5jZS5odG1sKSBsaWNlbnNlLiBcbiAgIFBsZWFzZSBhdHRyaWJ1dGUgdGhlIGF1dGhvciBpZiB5b3UgdXNlIGl0LiAqL1xuXG52YXIgbWFpbiA9IHJlcXVpcmUoJy4uL21haW4nKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cblxuLyoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBQZXJzaWFuIG9yIEphbGFsaSBjYWxlbmRhci5cbiAgICBCYXNlZCBvbiBjb2RlIGZyb20gPGEgaHJlZj1cImh0dHA6Ly93d3cuaXJhbmNoYW1iZXIuY29tL2NhbGVuZGFyL2NvbnZlcnRlci9pcmFuaWFuX2NhbGVuZGFyX2NvbnZlcnRlci5waHBcIj5odHRwOi8vd3d3LmlyYW5jaGFtYmVyLmNvbS9jYWxlbmRhci9jb252ZXJ0ZXIvaXJhbmlhbl9jYWxlbmRhcl9jb252ZXJ0ZXIucGhwPC9hPi5cbiAgICBTZWUgYWxzbyA8YSBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JcmFuaWFuX2NhbGVuZGFyXCI+aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JcmFuaWFuX2NhbGVuZGFyPC9hPi5cbiAgICBAY2xhc3MgUGVyc2lhbkNhbGVuZGFyXG4gICAgQHBhcmFtIFtsYW5ndWFnZT0nJ10ge3N0cmluZ30gVGhlIGxhbmd1YWdlIGNvZGUgKGRlZmF1bHQgRW5nbGlzaCkgZm9yIGxvY2FsaXNhdGlvbi4gKi9cbmZ1bmN0aW9uIFBlcnNpYW5DYWxlbmRhcihsYW5ndWFnZSkge1xuICAgIHRoaXMubG9jYWwgPSB0aGlzLnJlZ2lvbmFsT3B0aW9uc1tsYW5ndWFnZSB8fCAnJ10gfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddO1xufVxuXG5QZXJzaWFuQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oUGVyc2lhbkNhbGVuZGFyLnByb3RvdHlwZSwge1xuICAgIC8qKiBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhciAqL1xuICAgIG5hbWU6ICdQZXJzaWFuJyxcbiAgICAvKiogSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgUGVyc2lhbiBlcG9jaDogMTkgTWFyY2ggNjIyIENFLlxuICAgICAgICBAbWVtYmVyb2YgUGVyc2lhbkNhbGVuZGFyICovXG4gICAgamRFcG9jaDogMTk0ODMyMC41LFxuICAgIC8qKiBEYXlzIHBlciBtb250aCBpbiBhIGNvbW1vbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgUGVyc2lhbkNhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzEsIDMxLCAzMSwgMzEsIDMxLCAzMSwgMzAsIDMwLCAzMCwgMzAsIDMwLCAyOV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgUGVyc2lhbkNhbGVuZGFyICovXG4gICAgbWluTW9udGg6IDEsXG4gICAgLyoqIFRoZSBmaXJzdCBtb250aCBpbiB0aGUgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBQZXJzaWFuQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhclxuICAgICAgICBAcHJvcGVydHkgbmFtZSB7c3RyaW5nfSBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQHByb3BlcnR5IGVwb2NocyB7c3RyaW5nW119IFRoZSBlcG9jaCBuYW1lcy5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzTWluIHtzdHJpbmdbXX0gVGhlIG1pbmltYWwgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXRlRm9ybWF0IHtzdHJpbmd9IFRoZSBkYXRlIGZvcm1hdCBmb3IgdGhpcyBjYWxlbmRhci5cbiAgICAgICAgICAgICAgICBTZWUgdGhlIG9wdGlvbnMgb24gPGEgaHJlZj1cIkJhc2VDYWxlbmRhci5odG1sI2Zvcm1hdERhdGVcIj48Y29kZT5mb3JtYXREYXRlPC9jb2RlPjwvYT4gZm9yIGRldGFpbHMuXG4gICAgICAgIEBwcm9wZXJ0eSBmaXJzdERheSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIHN0YXJ0aW5nIGF0IDAuXG4gICAgICAgIEBwcm9wZXJ0eSBpc1JUTCB7bnVtYmVyfSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGxvY2FsaXNhdGlvbiByZWFkcyByaWdodC10by1sZWZ0LiAqL1xuICAgIHJlZ2lvbmFsT3B0aW9uczogeyAvLyBMb2NhbGlzYXRpb25zXG4gICAgICAgICcnOiB7XG4gICAgICAgICAgICBuYW1lOiAnUGVyc2lhbicsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQlAnLCAnQVAnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnRmFydmFyZGluJywgJ09yZGliZWhlc2h0JywgJ0tob3JkYWQnLCAnVGlyJywgJ01vcmRhZCcsICdTaGFocml2YXInLFxuICAgICAgICAgICAgJ01laHInLCAnQWJhbicsICdBemFyJywgJ0RheScsICdCYWhtYW4nLCAnRXNmYW5kJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnRmFyJywgJ09yZCcsICdLaG8nLCAnVGlyJywgJ01vcicsICdTaGEnLCAnTWVoJywgJ0FiYScsICdBemEnLCAnRGF5JywgJ0JhaCcsICdFc2YnXSxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJ1lla3NoYW1iZScsICdEb3NoYW1iZScsICdTZXNoYW1iZScsICdDaMOmaGFyc2hhbWJlJywgJ1BhbmpzaGFtYmUnLCAnSm9tXFwnZScsICdTaGFtYmUnXSxcbiAgICAgICAgICAgIGRheU5hbWVzU2hvcnQ6IFsnWWVrJywgJ0RvJywgJ1NlJywgJ0Now6YnLCAnUGFuaicsICdKb20nLCAnU2hhJ10sXG4gICAgICAgICAgICBkYXlOYW1lc01pbjogWydZZScsJ0RvJywnU2UnLCdDaCcsJ1BhJywnSm8nLCdTaCddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ3l5eXkvbW0vZGQnLFxuICAgICAgICAgICAgZmlyc3REYXk6IDYsXG4gICAgICAgICAgICBpc1JUTDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGluIGEgbGVhcCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgUGVyc2lhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBpcyBhIGxlYXAgeWVhciwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBsZWFwWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LCBtYWluLmxvY2FsLmludmFsaWRZZWFyKTtcbiAgICAgICAgcmV0dXJuICgoKCgoZGF0ZS55ZWFyKCkgLSAoZGF0ZS55ZWFyKCkgPiAwID8gNDc0IDogNDczKSkgJSAyODIwKSArXG4gICAgICAgICAgICA0NzQgKyAzOCkgKiA2ODIpICUgMjgxNikgPCA2ODI7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgLy8gRmluZCBTYXR1cmRheSBvZiB0aGlzIHdlZWsgc3RhcnRpbmcgb24gU2F0dXJkYXlcbiAgICAgICAgdmFyIGNoZWNrRGF0ZSA9IHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgY2hlY2tEYXRlLmFkZCgtKChjaGVja0RhdGUuZGF5T2ZXZWVrKCkgKyAxKSAlIDcpLCAnZCcpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoY2hlY2tEYXRlLmRheU9mWWVhcigpIC0gMSkgLyA3KSArIDE7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlzUGVyTW9udGhbZGF0ZS5tb250aCgpIC0gMV0gK1xuICAgICAgICAgICAgKGRhdGUubW9udGgoKSA9PT0gMTIgJiYgdGhpcy5sZWFwWWVhcihkYXRlLnllYXIoKSkgPyAxIDogMCk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIFBlcnNpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCBkYXkpICE9PSA1O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIEp1bGlhbiBkYXRlIGVxdWl2YWxlbnQgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiBkYXlzIHNpbmNlIEphbnVhcnkgMSwgNDcxMyBCQ0UgR3JlZW53aWNoIG5vb24uXG4gICAgICAgIEBtZW1iZXJvZiBQZXJzaWFuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gY29udmVydCBvciB0aGUgeWVhciB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZXF1aXZhbGVudCBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b0pEOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSwgbWFpbi5sb2NhbC5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHllYXIgPSBkYXRlLnllYXIoKTtcbiAgICAgICAgbW9udGggPSBkYXRlLm1vbnRoKCk7XG4gICAgICAgIGRheSA9IGRhdGUuZGF5KCk7XG4gICAgICAgIHZhciBlcEJhc2UgPSB5ZWFyIC0gKHllYXIgPj0gMCA/IDQ3NCA6IDQ3Myk7XG4gICAgICAgIHZhciBlcFllYXIgPSA0NzQgKyBtb2QoZXBCYXNlLCAyODIwKTtcbiAgICAgICAgcmV0dXJuIGRheSArIChtb250aCA8PSA3ID8gKG1vbnRoIC0gMSkgKiAzMSA6IChtb250aCAtIDEpICogMzAgKyA2KSArXG4gICAgICAgICAgICBNYXRoLmZsb29yKChlcFllYXIgKiA2ODIgLSAxMTApIC8gMjgxNikgKyAoZXBZZWFyIC0gMSkgKiAzNjUgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcihlcEJhc2UgLyAyODIwKSAqIDEwMjk5ODMgKyB0aGlzLmpkRXBvY2ggLSAxO1xuICAgIH0sXG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUgZnJvbSBhIEp1bGlhbiBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgUGVyc2lhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICBqZCA9IE1hdGguZmxvb3IoamQpICsgMC41O1xuICAgICAgICB2YXIgZGVwb2NoID0gamQgLSB0aGlzLnRvSkQoNDc1LCAxLCAxKTtcbiAgICAgICAgdmFyIGN5Y2xlID0gTWF0aC5mbG9vcihkZXBvY2ggLyAxMDI5OTgzKTtcbiAgICAgICAgdmFyIGN5ZWFyID0gbW9kKGRlcG9jaCwgMTAyOTk4Myk7XG4gICAgICAgIHZhciB5Y3ljbGUgPSAyODIwO1xuICAgICAgICBpZiAoY3llYXIgIT09IDEwMjk5ODIpIHtcbiAgICAgICAgICAgIHZhciBhdXgxID0gTWF0aC5mbG9vcihjeWVhciAvIDM2Nik7XG4gICAgICAgICAgICB2YXIgYXV4MiA9IG1vZChjeWVhciwgMzY2KTtcbiAgICAgICAgICAgIHljeWNsZSA9IE1hdGguZmxvb3IoKCgyMTM0ICogYXV4MSkgKyAoMjgxNiAqIGF1eDIpICsgMjgxNSkgLyAxMDI4NTIyKSArIGF1eDEgKyAxO1xuICAgICAgICB9XG4gICAgICAgIHZhciB5ZWFyID0geWN5Y2xlICsgKDI4MjAgKiBjeWNsZSkgKyA0NzQ7XG4gICAgICAgIHllYXIgPSAoeWVhciA8PSAwID8geWVhciAtIDEgOiB5ZWFyKTtcbiAgICAgICAgdmFyIHlkYXkgPSBqZCAtIHRoaXMudG9KRCh5ZWFyLCAxLCAxKSArIDE7XG4gICAgICAgIHZhciBtb250aCA9ICh5ZGF5IDw9IDE4NiA/IE1hdGguY2VpbCh5ZGF5IC8gMzEpIDogTWF0aC5jZWlsKCh5ZGF5IC0gNikgLyAzMCkpO1xuICAgICAgICB2YXIgZGF5ID0gamQgLSB0aGlzLnRvSkQoeWVhciwgbW9udGgsIDEpICsgMTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9XG59KTtcblxuLy8gTW9kdWx1cyBmdW5jdGlvbiB3aGljaCB3b3JrcyBmb3Igbm9uLWludGVnZXJzLlxuZnVuY3Rpb24gbW9kKGEsIGIpIHtcbiAgICByZXR1cm4gYSAtIChiICogTWF0aC5mbG9vcihhIC8gYikpO1xufVxuXG4vLyBQZXJzaWFuIChKYWxhbGkpIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy5wZXJzaWFuID0gUGVyc2lhbkNhbGVuZGFyO1xubWFpbi5jYWxlbmRhcnMuamFsYWxpID0gUGVyc2lhbkNhbGVuZGFyO1xuXG4iLCIvKlxuICogV29ybGQgQ2FsZW5kYXJzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxleGNqb2huc29uL3dvcmxkLWNhbGVuZGFyc1xuICpcbiAqIEJhdGNoLWNvbnZlcnRlZCBmcm9tIGtid29vZC9jYWxlbmRhcnNcbiAqIE1hbnkgdGhhbmtzIHRvIEtlaXRoIFdvb2QgYW5kIGFsbCBvZiB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSBvcmlnaW5hbCBwcm9qZWN0IVxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbu+7vy8qIGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvY2FsZW5kYXJzLmh0bWxcbiAgIFRhaXdhbmVzZSAoTWluZ3VvKSBjYWxlbmRhciBmb3IgalF1ZXJ5IHYyLjAuMi5cbiAgIFdyaXR0ZW4gYnkgS2VpdGggV29vZCAod29vZC5rZWl0aHthdH1vcHR1c25ldC5jb20uYXUpIEZlYnJ1YXJ5IDIwMTAuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBtYWluID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuXG52YXIgZ3JlZ29yaWFuQ2FsZW5kYXIgPSBtYWluLmluc3RhbmNlKCk7XG5cbi8qKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgVGFpd2FuZXNlIGNhbGVuZGFyLlxuICAgIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01pbmd1b19jYWxlbmRhci5cbiAgICBAY2xhc3MgVGFpd2FuQ2FsZW5kYXJcbiAgICBAcGFyYW0gW2xhbmd1YWdlPScnXSB7c3RyaW5nfSBUaGUgbGFuZ3VhZ2UgY29kZSAoZGVmYXVsdCBFbmdsaXNoKSBmb3IgbG9jYWxpc2F0aW9uLiAqL1xuZnVuY3Rpb24gVGFpd2FuQ2FsZW5kYXIobGFuZ3VhZ2UpIHtcbiAgICB0aGlzLmxvY2FsID0gdGhpcy5yZWdpb25hbE9wdGlvbnNbbGFuZ3VhZ2UgfHwgJyddIHx8IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbn1cblxuVGFpd2FuQ2FsZW5kYXIucHJvdG90eXBlID0gbmV3IG1haW4uYmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oVGFpd2FuQ2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgLyoqIFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnVGFpd2FuJyxcbiAgICAvKiogSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgVGFpd2FuIGVwb2NoOiAxIEphbnVhcnkgMTkxMiBDRSAoR3JlZ29yaWFuKS5cbiAgICAgICAgQG1lbWJlcm9mIFRhaXdhbkNhbGVuZGFyICovXG4gICAgamRFcG9jaDogMjQxOTQwMi41LFxuICAgIC8qKiBEaWZmZXJlbmNlIGluIHllYXJzIGJldHdlZW4gVGFpd2FuIGFuZCBHcmVnb3JpYW4gY2FsZW5kYXJzLlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXIgKi9cbiAgICB5ZWFyc09mZnNldDogMTkxMSxcbiAgICAvKiogRGF5cyBwZXIgbW9udGggaW4gYSBjb21tb24geWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFRhaXdhbkNhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIFRhaXdhbkNhbGVuZGFyICovXG4gICAgaGFzWWVhclplcm86IGZhbHNlLFxuICAgIC8qKiBUaGUgbWluaW11bSBtb250aCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBUYWl3YW5DYWxlbmRhciAqL1xuICAgIG1pbk1vbnRoOiAxLFxuICAgIC8qKiBUaGUgZmlyc3QgbW9udGggaW4gdGhlIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBUYWl3YW5DYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBUYWl3YW5DYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXJcbiAgICAgICAgQHByb3BlcnR5IG5hbWUge3N0cmluZ30gVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBwcm9wZXJ0eSBlcG9jaHMge3N0cmluZ1tdfSBUaGUgZXBvY2ggbmFtZXMuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc01pbiB7c3RyaW5nW119IFRoZSBtaW5pbWFsIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF0ZUZvcm1hdCB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgZm9yIHRoaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgU2VlIHRoZSBvcHRpb25zIG9uIDxhIGhyZWY9XCJCYXNlQ2FsZW5kYXIuaHRtbCNmb3JtYXREYXRlXCI+PGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT48L2E+IGZvciBkZXRhaWxzLlxuICAgICAgICBAcHJvcGVydHkgZmlyc3REYXkge251bWJlcn0gVGhlIG51bWJlciBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBzdGFydGluZyBhdCAwLlxuICAgICAgICBAcHJvcGVydHkgaXNSVEwge251bWJlcn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBsb2NhbGlzYXRpb24gcmVhZHMgcmlnaHQtdG8tbGVmdC4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ1RhaXdhbicsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQlJPQycsICdST0MnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXG4gICAgICAgICAgICAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcbiAgICAgICAgICAgIGRheU5hbWVzU2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gICAgICAgICAgICBkYXlOYW1lc01pbjogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICAgICAgICAgICAgZGlnaXRzOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ3l5eXkvbW0vZGQnLFxuICAgICAgICAgICAgZmlyc3REYXk6IDEsXG4gICAgICAgICAgICBpc1JUTDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGluIGEgbGVhcCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGlzIGEgbGVhcCB5ZWFyLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGxlYXBZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICB2YXIgeWVhciA9IHRoaXMuX3QyZ1llYXIoZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gZ3JlZ29yaWFuQ2FsZW5kYXIubGVhcFllYXIoeWVhcik7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgdGhlIHdlZWsgb2YgdGhlIHllYXIgZm9yIGEgZGF0ZSAtIElTTyA4NjAxLlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICB2YXIgeWVhciA9IHRoaXMuX3QyZ1llYXIoZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gZ3JlZ29yaWFuQ2FsZW5kYXIud2Vla09mWWVhcih5ZWFyLCBkYXRlLm1vbnRoKCksIGRhdGUuZGF5KCkpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBUYWl3YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlzUGVyTW9udGhbZGF0ZS5tb250aCgpIC0gMV0gK1xuICAgICAgICAgICAgKGRhdGUubW9udGgoKSA9PT0gMiAmJiB0aGlzLmxlYXBZZWFyKGRhdGUueWVhcigpKSA/IDEgOiAwKTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBhIHdlZWsgZGF5LlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYSB3ZWVrIGRheSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrRGF5OiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSkgfHwgNykgPCA2O1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIEp1bGlhbiBkYXRlIGVxdWl2YWxlbnQgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiBkYXlzIHNpbmNlIEphbnVhcnkgMSwgNDcxMyBCQ0UgR3JlZW53aWNoIG5vb24uXG4gICAgICAgIEBtZW1iZXJvZiBUYWl3YW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBlcXVpdmFsZW50IEp1bGlhbiBkYXRlLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHRvSkQ6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LCBtYWluLmxvY2FsLmludmFsaWREYXRlKTtcbiAgICAgICAgdmFyIHllYXIgPSB0aGlzLl90MmdZZWFyKGRhdGUueWVhcigpKTtcbiAgICAgICAgcmV0dXJuIGdyZWdvcmlhbkNhbGVuZGFyLnRvSkQoeWVhciwgZGF0ZS5tb250aCgpLCBkYXRlLmRheSgpKTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIFRhaXdhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICB2YXIgZGF0ZSA9IGdyZWdvcmlhbkNhbGVuZGFyLmZyb21KRChqZCk7XG4gICAgICAgIHZhciB5ZWFyID0gdGhpcy5fZzJ0WWVhcihkYXRlLnllYXIoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0RhdGUoeWVhciwgZGF0ZS5tb250aCgpLCBkYXRlLmRheSgpKTtcbiAgICB9LFxuXG4gICAgLyoqIENvbnZlcnQgVGFpd2FuZXNlIHRvIEdyZWdvcmlhbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgVGFpd2FuQ2FsZW5kYXJcbiAgICAgICAgQHByaXZhdGVcbiAgICAgICAgQHBhcmFtIHllYXIge251bWJlcn0gVGhlIFRhaXdhbmVzZSB5ZWFyLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjb3JyZXNwb25kaW5nIEdyZWdvcmlhbiB5ZWFyLiAqL1xuICAgIF90MmdZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiB5ZWFyICsgdGhpcy55ZWFyc09mZnNldCArICh5ZWFyID49IC10aGlzLnllYXJzT2Zmc2V0ICYmIHllYXIgPD0gLTEgPyAxIDogMCk7XG4gICAgfSxcblxuICAgIC8qKiBDb252ZXJ0IEdyZWdvcmlhbiB0byBUYWl3YW5lc2UgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFRhaXdhbkNhbGVuZGFyXG4gICAgICAgIEBwcml2YXRlXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtudW1iZXJ9IFRoZSBHcmVnb3JpYW4geWVhci5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgY29ycmVzcG9uZGluZyBUYWl3YW5lc2UgeWVhci4gKi9cbiAgICBfZzJ0WWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICByZXR1cm4geWVhciAtIHRoaXMueWVhcnNPZmZzZXQgLSAoeWVhciA+PSAxICYmIHllYXIgPD0gdGhpcy55ZWFyc09mZnNldCA/IDEgOiAwKTtcbiAgICB9XG59KTtcblxuLy8gVGFpd2FuIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uXG5tYWluLmNhbGVuZGFycy50YWl3YW4gPSBUYWl3YW5DYWxlbmRhcjtcblxuIiwiLypcbiAqIFdvcmxkIENhbGVuZGFyc1xuICogaHR0cHM6Ly9naXRodWIuY29tL2FsZXhjam9obnNvbi93b3JsZC1jYWxlbmRhcnNcbiAqXG4gKiBCYXRjaC1jb252ZXJ0ZWQgZnJvbSBrYndvb2QvY2FsZW5kYXJzXG4gKiBNYW55IHRoYW5rcyB0byBLZWl0aCBXb29kIGFuZCBhbGwgb2YgdGhlIGNvbnRyaWJ1dG9ycyB0byB0aGUgb3JpZ2luYWwgcHJvamVjdCFcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG7vu78vKiBodHRwOi8va2VpdGgtd29vZC5uYW1lL2NhbGVuZGFycy5odG1sXG4gICBUaGFpIGNhbGVuZGFyIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBLZWl0aCBXb29kICh3b29kLmtlaXRoe2F0fW9wdHVzbmV0LmNvbS5hdSkgRmVicnVhcnkgMjAxMC5cbiAgIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIChodHRwOi8va2VpdGgtd29vZC5uYW1lL2xpY2VuY2UuaHRtbCkgbGljZW5zZS4gXG4gICBQbGVhc2UgYXR0cmlidXRlIHRoZSBhdXRob3IgaWYgeW91IHVzZSBpdC4gKi9cblxudmFyIG1haW4gPSByZXF1aXJlKCcuLi9tYWluJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5cbnZhciBncmVnb3JpYW5DYWxlbmRhciA9IG1haW4uaW5zdGFuY2UoKTtcblxuLyoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBUaGFpIGNhbGVuZGFyLlxuICAgIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1RoYWlfY2FsZW5kYXIuXG4gICAgQGNsYXNzIFRoYWlDYWxlbmRhclxuICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSBjb2RlIChkZWZhdWx0IEVuZ2xpc2gpIGZvciBsb2NhbGlzYXRpb24uICovXG5mdW5jdGlvbiBUaGFpQ2FsZW5kYXIobGFuZ3VhZ2UpIHtcbiAgICB0aGlzLmxvY2FsID0gdGhpcy5yZWdpb25hbE9wdGlvbnNbbGFuZ3VhZ2UgfHwgJyddIHx8IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbn1cblxuVGhhaUNhbGVuZGFyLnByb3RvdHlwZSA9IG5ldyBtYWluLmJhc2VDYWxlbmRhcjtcblxuYXNzaWduKFRoYWlDYWxlbmRhci5wcm90b3R5cGUsIHtcbiAgICAvKiogVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBtZW1iZXJvZiBUaGFpQ2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnVGhhaScsXG4gICAgLyoqIEp1bGlhbiBkYXRlIG9mIHN0YXJ0IG9mIFRoYWkgZXBvY2g6IDEgSmFudWFyeSA1NDMgQkNFIChHcmVnb3JpYW4pLlxuICAgICAgICBAbWVtYmVyb2YgVGhhaUNhbGVuZGFyICovXG4gICAgamRFcG9jaDogMTUyMzA5OC41LFxuICAgIC8qKiBEaWZmZXJlbmNlIGluIHllYXJzIGJldHdlZW4gVGhhaSBhbmQgR3JlZ29yaWFuIGNhbGVuZGFycy5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhciAqL1xuICAgIHllYXJzT2Zmc2V0OiA1NDMsIFxuICAgIC8qKiBEYXlzIHBlciBtb250aCBpbiBhIGNvbW1vbiB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgVGhhaUNhbGVuZGFyICovXG4gICAgZGF5c1Blck1vbnRoOiBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG4gICAgLyoqIDxjb2RlPnRydWU8L2NvZGU+IGlmIGhhcyBhIHllYXIgemVybywgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgVGhhaUNhbGVuZGFyICovXG4gICAgbWluTW9udGg6IDEsXG4gICAgLyoqIFRoZSBmaXJzdCBtb250aCBpbiB0aGUgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhciAqL1xuICAgIGZpcnN0TW9udGg6IDEsXG4gICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBUaGFpQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhclxuICAgICAgICBAcHJvcGVydHkgbmFtZSB7c3RyaW5nfSBUaGUgY2FsZW5kYXIgbmFtZS5cbiAgICAgICAgQHByb3BlcnR5IGVwb2NocyB7c3RyaW5nW119IFRoZSBlcG9jaCBuYW1lcy5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzTWluIHtzdHJpbmdbXX0gVGhlIG1pbmltYWwgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXRlRm9ybWF0IHtzdHJpbmd9IFRoZSBkYXRlIGZvcm1hdCBmb3IgdGhpcyBjYWxlbmRhci5cbiAgICAgICAgICAgICAgICBTZWUgdGhlIG9wdGlvbnMgb24gPGEgaHJlZj1cIkJhc2VDYWxlbmRhci5odG1sI2Zvcm1hdERhdGVcIj48Y29kZT5mb3JtYXREYXRlPC9jb2RlPjwvYT4gZm9yIGRldGFpbHMuXG4gICAgICAgIEBwcm9wZXJ0eSBmaXJzdERheSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIHN0YXJ0aW5nIGF0IDAuXG4gICAgICAgIEBwcm9wZXJ0eSBpc1JUTCB7bnVtYmVyfSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGxvY2FsaXNhdGlvbiByZWFkcyByaWdodC10by1sZWZ0LiAqL1xuICAgIHJlZ2lvbmFsT3B0aW9uczogeyAvLyBMb2NhbGlzYXRpb25zXG4gICAgICAgICcnOiB7XG4gICAgICAgICAgICBuYW1lOiAnVGhhaScsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkJFJywgJ0JFJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuICAgICAgICAgICAgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgICAgICAgICAgIGRpZ2l0czogbnVsbCxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eXl5JyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAwLFxuICAgICAgICAgICAgaXNSVEw6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBpbiBhIGxlYXAgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYSBsZWFwIHllYXIsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbGVhcFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHZhciB5ZWFyID0gdGhpcy5fdDJnWWVhcihkYXRlLnllYXIoKSk7XG4gICAgICAgIHJldHVybiBncmVnb3JpYW5DYWxlbmRhci5sZWFwWWVhcih5ZWFyKTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB0aGUgd2VlayBvZiB0aGUgeWVhciBmb3IgYSBkYXRlIC0gSVNPIDg2MDEuXG4gICAgICAgIEBtZW1iZXJvZiBUaGFpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZFllYXIpO1xuICAgICAgICB2YXIgeWVhciA9IHRoaXMuX3QyZ1llYXIoZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gZ3JlZ29yaWFuQ2FsZW5kYXIud2Vla09mWWVhcih5ZWFyLCBkYXRlLm1vbnRoKCksIGRhdGUuZGF5KCkpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBUaGFpQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciBvZiB0aGUgbW9udGguXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhpcyBtb250aC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIG1vbnRoL3llYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlzSW5Nb250aDogZnVuY3Rpb24oeWVhciwgbW9udGgpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgdGhpcy5taW5EYXksIG1haW4ubG9jYWwuaW52YWxpZE1vbnRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5c1Blck1vbnRoW2RhdGUubW9udGgoKSAtIDFdICtcbiAgICAgICAgICAgIChkYXRlLm1vbnRoKCkgPT09IDIgJiYgdGhpcy5sZWFwWWVhcihkYXRlLnllYXIoKSkgPyAxIDogMCk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF5KSB8fCA3KSA8IDY7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBlcXVpdmFsZW50IEp1bGlhbiBkYXRlLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHRvSkQ6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LCBtYWluLmxvY2FsLmludmFsaWREYXRlKTtcbiAgICAgICAgdmFyIHllYXIgPSB0aGlzLl90MmdZZWFyKGRhdGUueWVhcigpKTtcbiAgICAgICAgcmV0dXJuIGdyZWdvcmlhbkNhbGVuZGFyLnRvSkQoeWVhciwgZGF0ZS5tb250aCgpLCBkYXRlLmRheSgpKTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhclxuICAgICAgICBAcGFyYW0gamQge251bWJlcn0gVGhlIEp1bGlhbiBkYXRlIHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXF1aXZhbGVudCBkYXRlLiAqL1xuICAgIGZyb21KRDogZnVuY3Rpb24oamQpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBncmVnb3JpYW5DYWxlbmRhci5mcm9tSkQoamQpO1xuICAgICAgICB2YXIgeWVhciA9IHRoaXMuX2cydFllYXIoZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIsIGRhdGUubW9udGgoKSwgZGF0ZS5kYXkoKSk7XG4gICAgfSxcblxuICAgIC8qKiBDb252ZXJ0IFRoYWkgdG8gR3JlZ29yaWFuIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBUaGFpQ2FsZW5kYXJcbiAgICAgICAgQHByaXZhdGVcbiAgICAgICAgQHBhcmFtIHllYXIge251bWJlcn0gVGhlIFRoYWkgeWVhci5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgY29ycmVzcG9uZGluZyBHcmVnb3JpYW4geWVhci4gKi9cbiAgICBfdDJnWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICByZXR1cm4geWVhciAtIHRoaXMueWVhcnNPZmZzZXQgLSAoeWVhciA+PSAxICYmIHllYXIgPD0gdGhpcy55ZWFyc09mZnNldCA/IDEgOiAwKTtcbiAgICB9LFxuXG4gICAgLyoqIENvbnZlcnQgR3JlZ29yaWFuIHRvIFRoYWkgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFRoYWlDYWxlbmRhclxuICAgICAgICBAcHJpdmF0ZVxuICAgICAgICBAcGFyYW0geWVhciB7bnVtYmVyfSBUaGUgR3JlZ29yaWFuIHllYXIuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGNvcnJlc3BvbmRpbmcgVGhhaSB5ZWFyLiAqL1xuICAgIF9nMnRZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiB5ZWFyICsgdGhpcy55ZWFyc09mZnNldCArICh5ZWFyID49IC10aGlzLnllYXJzT2Zmc2V0ICYmIHllYXIgPD0gLTEgPyAxIDogMCk7XG4gICAgfVxufSk7XG5cbi8vIFRoYWkgY2FsZW5kYXIgaW1wbGVtZW50YXRpb25cbm1haW4uY2FsZW5kYXJzLnRoYWkgPSBUaGFpQ2FsZW5kYXI7XG5cbiIsIi8qXG4gKiBXb3JsZCBDYWxlbmRhcnNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4Y2pvaG5zb24vd29ybGQtY2FsZW5kYXJzXG4gKlxuICogQmF0Y2gtY29udmVydGVkIGZyb20ga2J3b29kL2NhbGVuZGFyc1xuICogTWFueSB0aGFua3MgdG8gS2VpdGggV29vZCBhbmQgYWxsIG9mIHRoZSBjb250cmlidXRvcnMgdG8gdGhlIG9yaWdpbmFsIHByb2plY3QhXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxu77u/LyogaHR0cDovL2tlaXRoLXdvb2QubmFtZS9jYWxlbmRhcnMuaHRtbFxuICAgVW1tQWxRdXJhIGNhbGVuZGFyIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBBbXJvIE9zYW1hIE1hcmNoIDIwMTMuXG4gICBNb2RpZmllZCBieSBCaW5ub29oLmNvbSAmIHd3dy5lbG0uc2EgLSAyMDE0IC0gQWRkZWQgZGF0ZXMgYmFjayB0byAxMjc2IEhpanJpIHllYXIuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBtYWluID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuXG4vKiogSW1wbGVtZW50YXRpb24gb2YgdGhlIFVtbUFsUXVyYSBvciAnc2F1ZGknIGNhbGVuZGFyLlxuICAgIFNlZSBhbHNvIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lzbGFtaWNfY2FsZW5kYXIjU2F1ZGlfQXJhYmlhLjI3c19VbW1fYWwtUXVyYV9jYWxlbmRhclwiPmh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSXNsYW1pY19jYWxlbmRhciNTYXVkaV9BcmFiaWEuMjdzX1VtbV9hbC1RdXJhX2NhbGVuZGFyPC9hPi5cbiAgICA8YSBocmVmPVwiaHR0cDovL3d3dy51bW11bHF1cmEub3JnLnNhL0Fib3V0LmFzcHhcIj5odHRwOi8vd3d3LnVtbXVscXVyYS5vcmcuc2EvQWJvdXQuYXNweDwvYT5cbiAgICA8YSBocmVmPVwiaHR0cDovL3d3dy5zdGFmZi5zY2llbmNlLnV1Lm5sL35nZW50MDExMy9pc2xhbS91bW1hbHF1cmEuaHRtXCI+aHR0cDovL3d3dy5zdGFmZi5zY2llbmNlLnV1Lm5sL35nZW50MDExMy9pc2xhbS91bW1hbHF1cmEuaHRtPC9hPlxuICAgIEBjbGFzcyBVbW1BbFF1cmFDYWxlbmRhclxuICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSBjb2RlIChkZWZhdWx0IEVuZ2xpc2gpIGZvciBsb2NhbGlzYXRpb24uICovXG5mdW5jdGlvbiBVbW1BbFF1cmFDYWxlbmRhcihsYW5ndWFnZSkge1xuICAgIHRoaXMubG9jYWwgPSB0aGlzLnJlZ2lvbmFsT3B0aW9uc1tsYW5ndWFnZSB8fCAnJ10gfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddO1xufVxuXG5VbW1BbFF1cmFDYWxlbmRhci5wcm90b3R5cGUgPSBuZXcgbWFpbi5iYXNlQ2FsZW5kYXI7XG5cbmFzc2lnbihVbW1BbFF1cmFDYWxlbmRhci5wcm90b3R5cGUsIHtcbiAgICAvKiogVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBtZW1iZXJvZiBVbW1BbFF1cmFDYWxlbmRhciAqL1xuICAgIG5hbWU6ICdVbW1BbFF1cmEnLFxuICAgIC8vamRFcG9jaDogMTk0ODQ0MCwgLy8gSnVsaWFuIGRhdGUgb2Ygc3RhcnQgb2YgVW1tQWxRdXJhIGVwb2NoOiAxNCBNYXJjaCAxOTM3IENFXG4gICAgLy9kYXlzUGVyTW9udGg6IC8vIERheXMgcGVyIG1vbnRoIGluIGEgY29tbW9uIHllYXIsIHJlcGxhY2VkIGJ5IGEgbWV0aG9kLlxuICAgIC8qKiA8Y29kZT50cnVlPC9jb2RlPiBpZiBoYXMgYSB5ZWFyIHplcm8sIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEBtZW1iZXJvZiBVbW1BbFF1cmFDYWxlbmRhciAqL1xuICAgIGhhc1llYXJaZXJvOiBmYWxzZSxcbiAgICAvKiogVGhlIG1pbmltdW0gbW9udGggbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXIgKi9cbiAgICBtaW5Nb250aDogMSxcbiAgICAvKiogVGhlIGZpcnN0IG1vbnRoIGluIHRoZSB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXIgKi9cbiAgICBmaXJzdE1vbnRoOiAxLFxuICAgIC8qKiBUaGUgbWluaW11bSBkYXkgbnVtYmVyLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXIgKi9cbiAgICBtaW5EYXk6IDEsXG5cbiAgICAvKiogTG9jYWxpc2F0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbiAgICAgICAgRW50cmllcyBhcmUgb2JqZWN0cyBpbmRleGVkIGJ5IHRoZSBsYW5ndWFnZSBjb2RlICgnJyBiZWluZyB0aGUgZGVmYXVsdCBVUy9FbmdsaXNoKS5cbiAgICAgICAgRWFjaCBvYmplY3QgaGFzIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlcy5cbiAgICAgICAgQG1lbWJlcm9mIFVtbUFsUXVyYUNhbGVuZGFyXG4gICAgICAgIEBwcm9wZXJ0eSBuYW1lIHtzdHJpbmd9IFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAcHJvcGVydHkgZXBvY2hzIHtzdHJpbmdbXX0gVGhlIGVwb2NoIG5hbWVzLlxuICAgICAgICBAcHJvcGVydHkgbW9udGhOYW1lcyB7c3RyaW5nW119IFRoZSBsb25nIG5hbWVzIG9mIHRoZSBtb250aHMgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc1Nob3J0IHtzdHJpbmdbXX0gVGhlIHNob3J0IG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXNNaW4ge3N0cmluZ1tdfSBUaGUgbWluaW1hbCBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRhdGVGb3JtYXQge3N0cmluZ30gVGhlIGRhdGUgZm9ybWF0IGZvciB0aGlzIGNhbGVuZGFyLlxuICAgICAgICAgICAgICAgIFNlZSB0aGUgb3B0aW9ucyBvbiA8YSBocmVmPVwiQmFzZUNhbGVuZGFyLmh0bWwjZm9ybWF0RGF0ZVwiPjxjb2RlPmZvcm1hdERhdGU8L2NvZGU+PC9hPiBmb3IgZGV0YWlscy5cbiAgICAgICAgQHByb3BlcnR5IGZpcnN0RGF5IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlaywgc3RhcnRpbmcgYXQgMC5cbiAgICAgICAgQHByb3BlcnR5IGlzUlRMIHtudW1iZXJ9IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgbG9jYWxpc2F0aW9uIHJlYWRzIHJpZ2h0LXRvLWxlZnQuICovXG4gICAgcmVnaW9uYWxPcHRpb25zOiB7IC8vIExvY2FsaXNhdGlvbnNcbiAgICAgICAgJyc6IHtcbiAgICAgICAgICAgIG5hbWU6ICdVbW0gYWwtUXVyYScsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkgnLCAnQUgnXSxcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnQWwtTXVoYXJyYW0nLCAnU2FmYXInLCAnUmFiaVxcJyBhbC1hd3dhbCcsICdSYWJpXFwnIEFsLVRoYW5pJywgJ0p1bWFkYSBBbC1Bd3dhbCcsICdKdW1hZGEgQWwtVGhhbmknLFxuICAgICAgICAgICAgJ1JhamFiJywgJ1NoYVxcJ2FiYW4nLCAnUmFtYWRhbicsICdTaGF3d2FsJywgJ0RodSBhbC1RaVxcJ2RhaCcsICdEaHUgYWwtSGlqamFoJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnTXVoJywgJ1NhZicsICdSYWIxJywgJ1JhYjInLCAnSnVtMScsICdKdW0yJywgJ1JhaicsICdTaGFcXCcnLCAnUmFtJywgJ1NoYXcnLCAnRGh1UScsICdEaHVIJ10sXG4gICAgICAgICAgICBkYXlOYW1lczogWydZYXdtIGFsLUFoYWQnLCAnWWF3bSBhbC1JdGhuYWluJywgJ1lhd20gYWwtVGhhbMSBdGjEgeKAmScsICdZYXdtIGFsLUFyYmHigJjEgeKAmScsICdZYXdtIGFsLUtoYW3Eq3MnLCAnWWF3bSBhbC1KdW3igJhhJywgJ1lhd20gYWwtU2FidCddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnQWgnLCAnSXRoJywgJ1RoJywgJ0FyJywgJ0toJywgJ0p1JywgJ1NhJ10sXG4gICAgICAgICAgICBkaWdpdHM6IG51bGwsXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAneXl5eS9tbS9kZCcsXG4gICAgICAgICAgICBmaXJzdERheTogNixcbiAgICAgICAgICAgIGlzUlRMOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoaXMgZGF0ZSBpcyBpbiBhIGxlYXAgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFVtbUFsUXVyYUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBpcyBhIGxlYXAgeWVhciwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBsZWFwWWVhcjogZnVuY3Rpb24gKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXlzSW5ZZWFyKGRhdGUueWVhcigpKSA9PT0gMzU1KTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB0aGUgd2VlayBvZiB0aGUgeWVhciBmb3IgYSBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbiAoeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICAvLyBGaW5kIFN1bmRheSBvZiB0aGlzIHdlZWsgc3RhcnRpbmcgb24gU3VuZGF5XG4gICAgICAgIHZhciBjaGVja0RhdGUgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgIGNoZWNrRGF0ZS5hZGQoLWNoZWNrRGF0ZS5kYXlPZldlZWsoKSwgJ2QnKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoZWNrRGF0ZS5kYXlPZlllYXIoKSAtIDEpIC8gNykgKyAxO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIFVtbUFsUXVyYUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luWWVhcjogZnVuY3Rpb24gKHllYXIpIHtcbiAgICAgICAgdmFyIGRheXNDb3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGRheXNDb3VudCArPSB0aGlzLmRheXNJbk1vbnRoKHllYXIsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXlzQ291bnQ7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBtb250aC5cbiAgICAgICAgQG1lbWJlcm9mIFVtbUFsUXVyYUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgb2YgdGhlIG1vbnRoLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGguXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzIGluIHRoaXMgbW9udGguXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBtb250aC95ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZGF5c0luTW9udGg6IGZ1bmN0aW9uICh5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSwgbWFpbi5sb2NhbC5pbnZhbGlkTW9udGgpO1xuICAgICAgICB2YXIgbWNqZG4gPSBkYXRlLnRvSkQoKSAtIDI0MDAwMDAgKyAwLjU7IC8vIE1vZGlmaWVkIENocm9ub2xvZ2ljYWwgSnVsaWFuIERheSBOdW1iZXIgKE1DSkROKVxuICAgICAgICAvLyB0aGUgTUNKRE4ncyBvZiB0aGUgc3RhcnQgb2YgdGhlIGx1bmF0aW9ucyBpbiB0aGUgVW1tIGFsLVF1cmEgY2FsZW5kYXIgYXJlIHN0b3JlZCBpbiB0aGUgJ3VtbWFscXVyYV9kYXQnIGFycmF5XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW1tYWxxdXJhX2RhdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVtbWFscXVyYV9kYXRbaV0gPiBtY2pkbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAodW1tYWxxdXJhX2RhdFtpbmRleF0gLSB1bW1hbHF1cmFfZGF0W2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMzA7IC8vIFVua25vd24gb3V0c2lkZVxuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGEgd2VlayBkYXkuXG4gICAgICAgIEBtZW1iZXJvZiBVbW1BbFF1cmFDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF5KSAhPT0gNTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBKdWxpYW4gZGF0ZSBlcXVpdmFsZW50IGZvciB0aGlzIGRhdGUsXG4gICAgICAgIGkuZS4gZGF5cyBzaW5jZSBKYW51YXJ5IDEsIDQ3MTMgQkNFIEdyZWVud2ljaCBub29uLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gY29udmVydCBvciB0aGUgeWVhciB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgZXF1aXZhbGVudCBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICB0b0pEOiBmdW5jdGlvbiAoeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksIG1haW4ubG9jYWwuaW52YWxpZERhdGUpO1xuICAgICAgICB2YXIgaW5kZXggPSAoMTIgKiAoZGF0ZS55ZWFyKCkgLSAxKSkgKyBkYXRlLm1vbnRoKCkgLSAxNTI5MjtcbiAgICAgICAgdmFyIG1jamRuID0gZGF0ZS5kYXkoKSArIHVtbWFscXVyYV9kYXRbaW5kZXggLSAxXSAtIDE7XG4gICAgICAgIHJldHVybiBtY2pkbiArIDI0MDAwMDAgLSAwLjU7IC8vIE1vZGlmaWVkIENocm9ub2xvZ2ljYWwgSnVsaWFuIERheSBOdW1iZXIgKE1DSkROKVxuICAgIH0sXG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUgZnJvbSBhIEp1bGlhbiBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIGpkIHtudW1iZXJ9IFRoZSBKdWxpYW4gZGF0ZSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIGVxdWl2YWxlbnQgZGF0ZS4gKi9cbiAgICBmcm9tSkQ6IGZ1bmN0aW9uIChqZCkge1xuICAgICAgICB2YXIgbWNqZG4gPSBqZCAtIDI0MDAwMDAgKyAwLjU7IC8vIE1vZGlmaWVkIENocm9ub2xvZ2ljYWwgSnVsaWFuIERheSBOdW1iZXIgKE1DSkROKVxuICAgICAgICAvLyB0aGUgTUNKRE4ncyBvZiB0aGUgc3RhcnQgb2YgdGhlIGx1bmF0aW9ucyBpbiB0aGUgVW1tIGFsLVF1cmEgY2FsZW5kYXIgXG4gICAgICAgIC8vIGFyZSBzdG9yZWQgaW4gdGhlICd1bW1hbHF1cmFfZGF0JyBhcnJheVxuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVtbWFscXVyYV9kYXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1bW1hbHF1cmFfZGF0W2ldID4gbWNqZG4pIGJyZWFrO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbHVuYXRpb24gPSBpbmRleCArIDE1MjkyOyAvL1VtbUFsUXVyYSBMdW5hdGlvbiBOdW1iZXJcbiAgICAgICAgdmFyIGlpID0gTWF0aC5mbG9vcigobHVuYXRpb24gLSAxKSAvIDEyKTtcbiAgICAgICAgdmFyIHllYXIgPSBpaSArIDE7XG4gICAgICAgIHZhciBtb250aCA9IGx1bmF0aW9uIC0gMTIgKiBpaTtcbiAgICAgICAgdmFyIGRheSA9IG1jamRuIC0gdW1tYWxxdXJhX2RhdFtpbmRleCAtIDFdICsgMTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIGEgZGF0ZSBpcyB2YWxpZCBmb3IgdGhpcyBjYWxlbmRhci5cbiAgICAgICAgQG1lbWJlcm9mIFVtbUFsUXVyYUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtudW1iZXJ9IFRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBtb250aCB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIGRheSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgdmFsaWQgZGF0ZSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC4gKi9cbiAgICBpc1ZhbGlkOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHZhciB2YWxpZCA9IG1haW4uYmFzZUNhbGVuZGFyLnByb3RvdHlwZS5pc1ZhbGlkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgeWVhciA9ICh5ZWFyLnllYXIgIT0gbnVsbCA/IHllYXIueWVhciA6IHllYXIpO1xuICAgICAgICAgICAgdmFsaWQgPSAoeWVhciA+PSAxMjc2ICYmIHllYXIgPD0gMTUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH0sXG5cbiAgICAvKiogQ2hlY2sgdGhhdCBhIGNhbmRpZGF0ZSBkYXRlIGlzIGZyb20gdGhlIHNhbWUgY2FsZW5kYXIgYW5kIGlzIHZhbGlkLlxuICAgICAgICBAbWVtYmVyb2YgVW1tQWxRdXJhQ2FsZW5kYXJcbiAgICAgICAgQHByaXZhdGVcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gdmFsaWRhdGUgb3IgdGhlIHllYXIgdG8gdmFsaWRhdGUuXG4gICAgICAgIEBwYXJhbSBtb250aCB7bnVtYmVyfSBUaGUgbW9udGggdG8gdmFsaWRhdGUuXG4gICAgICAgIEBwYXJhbSBkYXkge251bWJlcn0gVGhlIGRheSB0byB2YWxpZGF0ZS5cbiAgICAgICAgQHBhcmFtIGVycm9yIHtzdHJpbmd9IEVycm9yIG1lc3NhZ2UgaWYgaW52YWxpZC5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBkaWZmZXJlbnQgY2FsZW5kYXJzIHVzZWQgb3IgaW52YWxpZCBkYXRlLiAqL1xuICAgIF92YWxpZGF0ZTogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSwgZXJyb3IpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBtYWluLmJhc2VDYWxlbmRhci5wcm90b3R5cGUuX3ZhbGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChkYXRlLnllYXIgPCAxMjc2IHx8IGRhdGUueWVhciA+IDE1MDApIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yLnJlcGxhY2UoL1xcezBcXH0vLCB0aGlzLmxvY2FsLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn0pO1xuXG4vLyBVbW1BbFF1cmEgY2FsZW5kYXIgaW1wbGVtZW50YXRpb25cbm1haW4uY2FsZW5kYXJzLnVtbWFscXVyYSA9IFVtbUFsUXVyYUNhbGVuZGFyO1xuXG52YXIgdW1tYWxxdXJhX2RhdCA9IFtcbiAgICAyMCwgICAgNTAsICAgIDc5LCAgICAxMDksICAgMTM4LCAgIDE2OCwgICAxOTcsICAgMjI3LCAgIDI1NiwgICAyODYsICAgMzE1LCAgIDM0NSwgICAzNzQsICAgNDA0LCAgIDQzMywgICA0NjMsICAgNDkyLCAgIDUyMiwgICA1NTEsICAgNTgxLCBcbiAgICA2MTEsICAgNjQxLCAgIDY3MCwgICA3MDAsICAgNzI5LCAgIDc1OSwgICA3ODgsICAgODE4LCAgIDg0NywgICA4NzcsICAgOTA2LCAgIDkzNiwgICA5NjUsICAgOTk1LCAgIDEwMjQsICAxMDU0LCAgMTA4MywgIDExMTMsICAxMTQyLCAgMTE3MixcbiAgICAxMjAxLCAgMTIzMSwgIDEyNjAsICAxMjkwLCAgMTMyMCwgIDEzNTAsICAxMzc5LCAgMTQwOSwgIDE0MzgsICAxNDY4LCAgMTQ5NywgIDE1MjcsICAxNTU2LCAgMTU4NiwgIDE2MTUsICAxNjQ1LCAgMTY3NCwgIDE3MDQsICAxNzMzLCAgMTc2MyxcbiAgICAxNzkyLCAgMTgyMiwgIDE4NTEsICAxODgxLCAgMTkxMCwgIDE5NDAsICAxOTY5LCAgMTk5OSwgIDIwMjgsICAyMDU4LCAgMjA4NywgIDIxMTcsICAyMTQ2LCAgMjE3NiwgIDIyMDUsICAyMjM1LCAgMjI2NCwgIDIyOTQsICAyMzIzLCAgMjM1MyxcbiAgICAyMzgzLCAgMjQxMywgIDI0NDIsICAyNDcyLCAgMjUwMSwgIDI1MzEsICAyNTYwLCAgMjU5MCwgIDI2MTksICAyNjQ5LCAgMjY3OCwgIDI3MDgsICAyNzM3LCAgMjc2NywgIDI3OTYsICAyODI2LCAgMjg1NSwgIDI4ODUsICAyOTE0LCAgMjk0NCxcbiAgICAyOTczLCAgMzAwMywgIDMwMzIsICAzMDYyLCAgMzA5MSwgIDMxMjEsICAzMTUwLCAgMzE4MCwgIDMyMDksICAzMjM5LCAgMzI2OCwgIDMyOTgsICAzMzI3LCAgMzM1NywgIDMzODYsICAzNDE2LCAgMzQ0NiwgIDM0NzYsICAzNTA1LCAgMzUzNSxcbiAgICAzNTY0LCAgMzU5NCwgIDM2MjMsICAzNjUzLCAgMzY4MiwgIDM3MTIsICAzNzQxLCAgMzc3MSwgIDM4MDAsICAzODMwLCAgMzg1OSwgIDM4ODksICAzOTE4LCAgMzk0OCwgIDM5NzcsICA0MDA3LCAgNDAzNiwgIDQwNjYsICA0MDk1LCAgNDEyNSxcbiAgICA0MTU1LCAgNDE4NSwgIDQyMTQsICA0MjQ0LCAgNDI3MywgIDQzMDMsICA0MzMyLCAgNDM2MiwgIDQzOTEsICA0NDIxLCAgNDQ1MCwgIDQ0ODAsICA0NTA5LCAgNDUzOSwgIDQ1NjgsICA0NTk4LCAgNDYyNywgIDQ2NTcsICA0Njg2LCAgNDcxNixcbiAgICA0NzQ1LCAgNDc3NSwgIDQ4MDQsICA0ODM0LCAgNDg2MywgIDQ4OTMsICA0OTIyLCAgNDk1MiwgIDQ5ODEsICA1MDExLCAgNTA0MCwgIDUwNzAsICA1MDk5LCAgNTEyOSwgIDUxNTgsICA1MTg4LCAgNTIxOCwgIDUyNDgsICA1Mjc3LCAgNTMwNyxcbiAgICA1MzM2LCAgNTM2NiwgIDUzOTUsICA1NDI1LCAgNTQ1NCwgIDU0ODQsICA1NTEzLCAgNTU0MywgIDU1NzIsICA1NjAyLCAgNTYzMSwgIDU2NjEsICA1NjkwLCAgNTcyMCwgIDU3NDksICA1Nzc5LCAgNTgwOCwgIDU4MzgsICA1ODY3LCAgNTg5NyxcbiAgICA1OTI2LCAgNTk1NiwgIDU5ODUsICA2MDE1LCAgNjA0NCwgIDYwNzQsICA2MTAzLCAgNjEzMywgIDYxNjIsICA2MTkyLCAgNjIyMSwgIDYyNTEsICA2MjgxLCAgNjMxMSwgIDYzNDAsICA2MzcwLCAgNjM5OSwgIDY0MjksICA2NDU4LCAgNjQ4OCxcbiAgICA2NTE3LCAgNjU0NywgIDY1NzYsICA2NjA2LCAgNjYzNSwgIDY2NjUsICA2Njk0LCAgNjcyNCwgIDY3NTMsICA2NzgzLCAgNjgxMiwgIDY4NDIsICA2ODcxLCAgNjkwMSwgIDY5MzAsICA2OTYwLCAgNjk4OSwgIDcwMTksICA3MDQ4LCAgNzA3OCxcbiAgICA3MTA3LCAgNzEzNywgIDcxNjYsICA3MTk2LCAgNzIyNSwgIDcyNTUsICA3Mjg0LCAgNzMxNCwgIDczNDQsICA3Mzc0LCAgNzQwMywgIDc0MzMsICA3NDYyLCAgNzQ5MiwgIDc1MjEsICA3NTUxLCAgNzU4MCwgIDc2MTAsICA3NjM5LCAgNzY2OSxcbiAgICA3Njk4LCAgNzcyOCwgIDc3NTcsICA3Nzg3LCAgNzgxNiwgIDc4NDYsICA3ODc1LCAgNzkwNSwgIDc5MzQsICA3OTY0LCAgNzk5MywgIDgwMjMsICA4MDUzLCAgODA4MywgIDgxMTIsICA4MTQyLCAgODE3MSwgIDgyMDEsICA4MjMwLCAgODI2MCxcbiAgICA4Mjg5LCAgODMxOSwgIDgzNDgsICA4Mzc4LCAgODQwNywgIDg0MzcsICA4NDY2LCAgODQ5NiwgIDg1MjUsICA4NTU1LCAgODU4NCwgIDg2MTQsICA4NjQzLCAgODY3MywgIDg3MDIsICA4NzMyLCAgODc2MSwgIDg3OTEsICA4ODIxLCAgODg1MCxcbiAgICA4ODgwLCAgODkwOSwgIDg5MzgsICA4OTY4LCAgODk5NywgIDkwMjcsICA5MDU2LCAgOTA4NiwgIDkxMTUsICA5MTQ1LCAgOTE3NSwgIDkyMDUsICA5MjM0LCAgOTI2NCwgIDkyOTMsICA5MzIyLCAgOTM1MiwgIDkzODEsICA5NDEwLCAgOTQ0MCxcbiAgICA5NDcwLCAgOTQ5OSwgIDk1MjksICA5NTU5LCAgOTU4OSwgIDk2MTgsICA5NjQ4LCAgOTY3NywgIDk3MDYsICA5NzM2LCAgOTc2NSwgIDk3OTQsICA5ODI0LCAgOTg1MywgIDk4ODMsICA5OTEzLCAgOTk0MywgIDk5NzIsICAxMDAwMiwgMTAwMzIsXG4gICAgMTAwNjEsIDEwMDkwLCAxMDEyMCwgMTAxNDksIDEwMTc4LCAxMDIwOCwgMTAyMzcsIDEwMjY3LCAxMDI5NywgMTAzMjYsIDEwMzU2LCAxMDM4NiwgMTA0MTUsIDEwNDQ1LCAxMDQ3NCwgMTA1MDQsIDEwNTMzLCAxMDU2MiwgMTA1OTIsIDEwNjIxLFxuICAgIDEwNjUxLCAxMDY4MCwgMTA3MTAsIDEwNzQwLCAxMDc3MCwgMTA3OTksIDEwODI5LCAxMDg1OCwgMTA4ODgsIDEwOTE3LCAxMDk0NywgMTA5NzYsIDExMDA1LCAxMTAzNSwgMTEwNjQsIDExMDk0LCAxMTEyNCwgMTExNTMsIDExMTgzLCAxMTIxMyxcbiAgICAxMTI0MiwgMTEyNzIsIDExMzAxLCAxMTMzMSwgMTEzNjAsIDExMzg5LCAxMTQxOSwgMTE0NDgsIDExNDc4LCAxMTUwNywgMTE1MzcsIDExNTY3LCAxMTU5NiwgMTE2MjYsIDExNjU1LCAxMTY4NSwgMTE3MTUsIDExNzQ0LCAxMTc3NCwgMTE4MDMsXG4gICAgMTE4MzIsIDExODYyLCAxMTg5MSwgMTE5MjEsIDExOTUwLCAxMTk4MCwgMTIwMTAsIDEyMDM5LCAxMjA2OSwgMTIwOTksIDEyMTI4LCAxMjE1OCwgMTIxODcsIDEyMjE2LCAxMjI0NiwgMTIyNzUsIDEyMzA0LCAxMjMzNCwgMTIzNjQsIDEyMzkzLFxuICAgIDEyNDIzLCAxMjQ1MywgMTI0ODMsIDEyNTEyLCAxMjU0MiwgMTI1NzEsIDEyNjAwLCAxMjYzMCwgMTI2NTksIDEyNjg4LCAxMjcxOCwgMTI3NDcsIDEyNzc3LCAxMjgwNywgMTI4MzcsIDEyODY2LCAxMjg5NiwgMTI5MjYsIDEyOTU1LCAxMjk4NCxcbiAgICAxMzAxNCwgMTMwNDMsIDEzMDcyLCAxMzEwMiwgMTMxMzEsIDEzMTYxLCAxMzE5MSwgMTMyMjAsIDEzMjUwLCAxMzI4MCwgMTMzMTAsIDEzMzM5LCAxMzM2OCwgMTMzOTgsIDEzNDI3LCAxMzQ1NiwgMTM0ODYsIDEzNTE1LCAxMzU0NSwgMTM1NzQsXG4gICAgMTM2MDQsIDEzNjM0LCAxMzY2NCwgMTM2OTMsIDEzNzIzLCAxMzc1MiwgMTM3ODIsIDEzODExLCAxMzg0MCwgMTM4NzAsIDEzODk5LCAxMzkyOSwgMTM5NTgsIDEzOTg4LCAxNDAxOCwgMTQwNDcsIDE0MDc3LCAxNDEwNywgMTQxMzYsIDE0MTY2LFxuICAgIDE0MTk1LCAxNDIyNCwgMTQyNTQsIDE0MjgzLCAxNDMxMywgMTQzNDIsIDE0MzcyLCAxNDQwMSwgMTQ0MzEsIDE0NDYxLCAxNDQ5MCwgMTQ1MjAsIDE0NTUwLCAxNDU3OSwgMTQ2MDksIDE0NjM4LCAxNDY2NywgMTQ2OTcsIDE0NzI2LCAxNDc1NixcbiAgICAxNDc4NSwgMTQ4MTUsIDE0ODQ0LCAxNDg3NCwgMTQ5MDQsIDE0OTMzLCAxNDk2MywgMTQ5OTMsIDE1MDIxLCAxNTA1MSwgMTUwODEsIDE1MTEwLCAxNTE0MCwgMTUxNjksIDE1MTk5LCAxNTIyOCwgMTUyNTgsIDE1Mjg3LCAxNTMxNywgMTUzNDcsXG4gICAgMTUzNzcsIDE1NDA2LCAxNTQzNiwgMTU0NjUsIDE1NDk0LCAxNTUyNCwgMTU1NTMsIDE1NTgyLCAxNTYxMiwgMTU2NDEsIDE1NjcxLCAxNTcwMSwgMTU3MzEsIDE1NzYwLCAxNTc5MCwgMTU4MjAsIDE1ODQ5LCAxNTg3OCwgMTU5MDgsIDE1OTM3LFxuICAgIDE1OTY2LCAxNTk5NiwgMTYwMjUsIDE2MDU1LCAxNjA4NSwgMTYxMTQsIDE2MTQ0LCAxNjE3NCwgMTYyMDQsIDE2MjMzLCAxNjI2MiwgMTYyOTIsIDE2MzIxLCAxNjM1MCwgMTYzODAsIDE2NDA5LCAxNjQzOSwgMTY0NjgsIDE2NDk4LCAxNjUyOCxcbiAgICAxNjU1OCwgMTY1ODcsIDE2NjE3LCAxNjY0NiwgMTY2NzYsIDE2NzA1LCAxNjczNCwgMTY3NjQsIDE2NzkzLCAxNjgyMywgMTY4NTIsIDE2ODgyLCAxNjkxMiwgMTY5NDEsIDE2OTcxLCAxNzAwMSwgMTcwMzAsIDE3MDYwLCAxNzA4OSwgMTcxMTgsXG4gICAgMTcxNDgsIDE3MTc3LCAxNzIwNywgMTcyMzYsIDE3MjY2LCAxNzI5NSwgMTczMjUsIDE3MzU1LCAxNzM4NCwgMTc0MTQsIDE3NDQ0LCAxNzQ3MywgMTc1MDIsIDE3NTMyLCAxNzU2MSwgMTc1OTEsIDE3NjIwLCAxNzY1MCwgMTc2NzksIDE3NzA5LFxuICAgIDE3NzM4LCAxNzc2OCwgMTc3OTgsIDE3ODI3LCAxNzg1NywgMTc4ODYsIDE3OTE2LCAxNzk0NSwgMTc5NzUsIDE4MDA0LCAxODAzNCwgMTgwNjMsIDE4MDkzLCAxODEyMiwgMTgxNTIsIDE4MTgxLCAxODIxMSwgMTgyNDEsIDE4MjcwLCAxODMwMCxcbiAgICAxODMzMCwgMTgzNTksIDE4Mzg4LCAxODQxOCwgMTg0NDcsIDE4NDc2LCAxODUwNiwgMTg1MzUsIDE4NTY1LCAxODU5NSwgMTg2MjUsIDE4NjU0LCAxODY4NCwgMTg3MTQsIDE4NzQzLCAxODc3MiwgMTg4MDIsIDE4ODMxLCAxODg2MCwgMTg4OTAsXG4gICAgMTg5MTksIDE4OTQ5LCAxODk3OSwgMTkwMDgsIDE5MDM4LCAxOTA2OCwgMTkwOTgsIDE5MTI3LCAxOTE1NiwgMTkxODYsIDE5MjE1LCAxOTI0NCwgMTkyNzQsIDE5MzAzLCAxOTMzMywgMTkzNjIsIDE5MzkyLCAxOTQyMiwgMTk0NTIsIDE5NDgxLFxuICAgIDE5NTExLCAxOTU0MCwgMTk1NzAsIDE5NTk5LCAxOTYyOCwgMTk2NTgsIDE5Njg3LCAxOTcxNywgMTk3NDYsIDE5Nzc2LCAxOTgwNiwgMTk4MzYsIDE5ODY1LCAxOTg5NSwgMTk5MjQsIDE5OTU0LCAxOTk4MywgMjAwMTIsIDIwMDQyLCAyMDA3MSxcbiAgICAyMDEwMSwgMjAxMzAsIDIwMTYwLCAyMDE5MCwgMjAyMTksIDIwMjQ5LCAyMDI3OSwgMjAzMDgsIDIwMzM4LCAyMDM2NywgMjAzOTYsIDIwNDI2LCAyMDQ1NSwgMjA0ODUsIDIwNTE0LCAyMDU0NCwgMjA1NzMsIDIwNjAzLCAyMDYzMywgMjA2NjIsXG4gICAgMjA2OTIsIDIwNzIxLCAyMDc1MSwgMjA3ODAsIDIwODEwLCAyMDgzOSwgMjA4NjksIDIwODk4LCAyMDkyOCwgMjA5NTcsIDIwOTg3LCAyMTAxNiwgMjEwNDYsIDIxMDc2LCAyMTEwNSwgMjExMzUsIDIxMTY0LCAyMTE5NCwgMjEyMjMsIDIxMjUzLFxuICAgIDIxMjgyLCAyMTMxMiwgMjEzNDEsIDIxMzcxLCAyMTQwMCwgMjE0MzAsIDIxNDU5LCAyMTQ4OSwgMjE1MTksIDIxNTQ4LCAyMTU3OCwgMjE2MDcsIDIxNjM3LCAyMTY2NiwgMjE2OTYsIDIxNzI1LCAyMTc1NCwgMjE3ODQsIDIxODEzLCAyMTg0MyxcbiAgICAyMTg3MywgMjE5MDIsIDIxOTMyLCAyMTk2MiwgMjE5OTEsIDIyMDIxLCAyMjA1MCwgMjIwODAsIDIyMTA5LCAyMjEzOCwgMjIxNjgsIDIyMTk3LCAyMjIyNywgMjIyNTYsIDIyMjg2LCAyMjMxNiwgMjIzNDYsIDIyMzc1LCAyMjQwNSwgMjI0MzQsXG4gICAgMjI0NjQsIDIyNDkzLCAyMjUyMiwgMjI1NTIsIDIyNTgxLCAyMjYxMSwgMjI2NDAsIDIyNjcwLCAyMjcwMCwgMjI3MzAsIDIyNzU5LCAyMjc4OSwgMjI4MTgsIDIyODQ4LCAyMjg3NywgMjI5MDYsIDIyOTM2LCAyMjk2NSwgMjI5OTQsIDIzMDI0LFxuICAgIDIzMDU0LCAyMzA4MywgMjMxMTMsIDIzMTQzLCAyMzE3MywgMjMyMDIsIDIzMjMyLCAyMzI2MSwgMjMyOTAsIDIzMzIwLCAyMzM0OSwgMjMzNzksIDIzNDA4LCAyMzQzOCwgMjM0NjcsIDIzNDk3LCAyMzUyNywgMjM1NTYsIDIzNTg2LCAyMzYxNixcbiAgICAyMzY0NSwgMjM2NzQsIDIzNzA0LCAyMzczMywgMjM3NjMsIDIzNzkyLCAyMzgyMiwgMjM4NTEsIDIzODgxLCAyMzkxMCwgMjM5NDAsIDIzOTcwLCAyMzk5OSwgMjQwMjksIDI0MDU4LCAyNDA4OCwgMjQxMTcsIDI0MTQ3LCAyNDE3NiwgMjQyMDYsXG4gICAgMjQyMzUsIDI0MjY1LCAyNDI5NCwgMjQzMjQsIDI0MzUzLCAyNDM4MywgMjQ0MTMsIDI0NDQyLCAyNDQ3MiwgMjQ1MDEsIDI0NTMxLCAyNDU2MCwgMjQ1OTAsIDI0NjE5LCAyNDY0OCwgMjQ2NzgsIDI0NzA3LCAyNDczNywgMjQ3NjcsIDI0Nzk2LFxuICAgIDI0ODI2LCAyNDg1NiwgMjQ4ODUsIDI0OTE1LCAyNDk0NCwgMjQ5NzQsIDI1MDAzLCAyNTAzMiwgMjUwNjIsIDI1MDkxLCAyNTEyMSwgMjUxNTAsIDI1MTgwLCAyNTIxMCwgMjUyNDAsIDI1MjY5LCAyNTI5OSwgMjUzMjgsIDI1MzU4LCAyNTM4NyxcbiAgICAyNTQxNiwgMjU0NDYsIDI1NDc1LCAyNTUwNSwgMjU1MzQsIDI1NTY0LCAyNTU5NCwgMjU2MjQsIDI1NjUzLCAyNTY4MywgMjU3MTIsIDI1NzQyLCAyNTc3MSwgMjU4MDAsIDI1ODMwLCAyNTg1OSwgMjU4ODgsIDI1OTE4LCAyNTk0OCwgMjU5NzcsXG4gICAgMjYwMDcsIDI2MDM3LCAyNjA2NywgMjYwOTYsIDI2MTI2LCAyNjE1NSwgMjYxODQsIDI2MjE0LCAyNjI0MywgMjYyNzIsIDI2MzAyLCAyNjMzMiwgMjYzNjEsIDI2MzkxLCAyNjQyMSwgMjY0NTEsIDI2NDgwLCAyNjUxMCwgMjY1MzksIDI2NTY4LFxuICAgIDI2NTk4LCAyNjYyNywgMjY2NTYsIDI2Njg2LCAyNjcxNSwgMjY3NDUsIDI2Nzc1LCAyNjgwNSwgMjY4MzQsIDI2ODY0LCAyNjg5MywgMjY5MjMsIDI2OTUyLCAyNjk4MiwgMjcwMTEsIDI3MDQxLCAyNzA3MCwgMjcwOTksIDI3MTI5LCAyNzE1OSxcbiAgICAyNzE4OCwgMjcyMTgsIDI3MjQ4LCAyNzI3NywgMjczMDcsIDI3MzM2LCAyNzM2NiwgMjczOTUsIDI3NDI1LCAyNzQ1NCwgMjc0ODQsIDI3NTEzLCAyNzU0MiwgMjc1NzIsIDI3NjAyLCAyNzYzMSwgMjc2NjEsIDI3NjkxLCAyNzcyMCwgMjc3NTAsXG4gICAgMjc3NzksIDI3ODA5LCAyNzgzOCwgMjc4NjgsIDI3ODk3LCAyNzkyNiwgMjc5NTYsIDI3OTg1LCAyODAxNSwgMjgwNDUsIDI4MDc0LCAyODEwNCwgMjgxMzQsIDI4MTYzLCAyODE5MywgMjgyMjIsIDI4MjUyLCAyODI4MSwgMjgzMTAsIDI4MzQwLFxuICAgIDI4MzY5LCAyODM5OSwgMjg0MjgsIDI4NDU4LCAyODQ4OCwgMjg1MTcsIDI4NTQ3LCAyODU3NyxcbiAgICAvLyBGcm9tIDEzNTZcbiAgICAyODYwNywgMjg2MzYsIDI4NjY1LCAyODY5NSwgMjg3MjQsIDI4NzU0LCAyODc4MywgMjg4MTMsIDI4ODQzLCAyODg3MiwgMjg5MDEsIDI4OTMxLCAyODk2MCwgMjg5OTAsIDI5MDE5LCAyOTA0OSwgMjkwNzgsIDI5MTA4LCAyOTEzNywgMjkxNjcsXG4gICAgMjkxOTYsIDI5MjI2LCAyOTI1NSwgMjkyODUsIDI5MzE1LCAyOTM0NSwgMjkzNzUsIDI5NDA0LCAyOTQzNCwgMjk0NjMsIDI5NDkyLCAyOTUyMiwgMjk1NTEsIDI5NTgwLCAyOTYxMCwgMjk2NDAsIDI5NjY5LCAyOTY5OSwgMjk3MjksIDI5NzU5LFxuICAgIDI5Nzg4LCAyOTgxOCwgMjk4NDcsIDI5ODc2LCAyOTkwNiwgMjk5MzUsIDI5OTY0LCAyOTk5NCwgMzAwMjMsIDMwMDUzLCAzMDA4MiwgMzAxMTIsIDMwMTQxLCAzMDE3MSwgMzAyMDAsIDMwMjMwLCAzMDI1OSwgMzAyODksIDMwMzE4LCAzMDM0OCxcbiAgICAzMDM3OCwgMzA0MDgsIDMwNDM3LCAzMDQ2NywgMzA0OTYsIDMwNTI2LCAzMDU1NSwgMzA1ODUsIDMwNjE0LCAzMDY0NCwgMzA2NzMsIDMwNzAzLCAzMDczMiwgMzA3NjIsIDMwNzkxLCAzMDgyMSwgMzA4NTAsIDMwODgwLCAzMDkwOSwgMzA5MzksXG4gICAgMzA5NjgsIDMwOTk4LCAzMTAyNywgMzEwNTcsIDMxMDg2LCAzMTExNiwgMzExNDUsIDMxMTc1LCAzMTIwNCwgMzEyMzQsIDMxMjYzLCAzMTI5MywgMzEzMjIsIDMxMzUyLCAzMTM4MSwgMzE0MTEsIDMxNDQxLCAzMTQ3MSwgMzE1MDAsIDMxNTMwLFxuICAgIDMxNTU5LCAzMTU4OSwgMzE2MTgsIDMxNjQ4LCAzMTY3NiwgMzE3MDYsIDMxNzM2LCAzMTc2NiwgMzE3OTUsIDMxODI1LCAzMTg1NCwgMzE4ODQsIDMxOTEzLCAzMTk0MywgMzE5NzIsIDMyMDAyLCAzMjAzMSwgMzIwNjEsIDMyMDkwLCAzMjEyMCxcbiAgICAzMjE1MCwgMzIxODAsIDMyMjA5LCAzMjIzOSwgMzIyNjgsIDMyMjk4LCAzMjMyNywgMzIzNTcsIDMyMzg2LCAzMjQxNiwgMzI0NDUsIDMyNDc1LCAzMjUwNCwgMzI1MzQsIDMyNTYzLCAzMjU5MywgMzI2MjIsIDMyNjUyLCAzMjY4MSwgMzI3MTEsXG4gICAgMzI3NDAsIDMyNzcwLCAzMjc5OSwgMzI4MjksIDMyODU4LCAzMjg4OCwgMzI5MTcsIDMyOTQ3LCAzMjk3NiwgMzMwMDYsIDMzMDM1LCAzMzA2NSwgMzMwOTQsIDMzMTI0LCAzMzE1MywgMzMxODMsIDMzMjEzLCAzMzI0MywgMzMyNzIsIDMzMzAyLFxuICAgIDMzMzMxLCAzMzM2MSwgMzMzOTAsIDMzNDIwLCAzMzQ1MCwgMzM0NzksIDMzNTA5LCAzMzUzOSwgMzM1NjgsIDMzNTk4LCAzMzYyNywgMzM2NTcsIDMzNjg2LCAzMzcxNiwgMzM3NDUsIDMzNzc1LCAzMzgwNCwgMzM4MzQsIDMzODYzLCAzMzg5MyxcbiAgICAzMzkyMiwgMzM5NTIsIDMzOTgxLCAzNDAxMSwgMzQwNDAsIDM0MDY5LCAzNDA5OSwgMzQxMjgsIDM0MTU4LCAzNDE4NywgMzQyMTcsIDM0MjQ3LCAzNDI3NywgMzQzMDYsIDM0MzM2LCAzNDM2NSwgMzQzOTUsIDM0NDI0LCAzNDQ1NCwgMzQ0ODMsXG4gICAgMzQ1MTIsIDM0NTQyLCAzNDU3MSwgMzQ2MDEsIDM0NjMxLCAzNDY2MCwgMzQ2OTAsIDM0NzE5LCAzNDc0OSwgMzQ3NzgsIDM0ODA4LCAzNDgzNywgMzQ4NjcsIDM0ODk2LCAzNDkyNiwgMzQ5NTUsIDM0OTg1LCAzNTAxNSwgMzUwNDQsIDM1MDc0LFxuICAgIDM1MTAzLCAzNTEzMywgMzUxNjIsIDM1MTkyLCAzNTIyMiwgMzUyNTEsIDM1MjgwLCAzNTMxMCwgMzUzNDAsIDM1MzcwLCAzNTM5OSwgMzU0MjksIDM1NDU4LCAzNTQ4OCwgMzU1MTcsIDM1NTQ3LCAzNTU3NiwgMzU2MDUsIDM1NjM1LCAzNTY2NSxcbiAgICAzNTY5NCwgMzU3MjMsIDM1NzUzLCAzNTc4MiwgMzU4MTEsIDM1ODQxLCAzNTg3MSwgMzU5MDEsIDM1OTMwLCAzNTk2MCwgMzU5ODksIDM2MDE5LCAzNjA0OCwgMzYwNzgsIDM2MTA3LCAzNjEzNiwgMzYxNjYsIDM2MTk1LCAzNjIyNSwgMzYyNTQsXG4gICAgMzYyODQsIDM2MzE0LCAzNjM0MywgMzYzNzMsIDM2NDAzLCAzNjQzMywgMzY0NjIsIDM2NDkyLCAzNjUyMSwgMzY1NTEsIDM2NTgwLCAzNjYxMCwgMzY2MzksIDM2NjY5LCAzNjY5OCwgMzY3MjgsIDM2NzU3LCAzNjc4NiwgMzY4MTYsIDM2ODQ1LFxuICAgIDM2ODc1LCAzNjkwNCwgMzY5MzQsIDM2OTYzLCAzNjk5MywgMzcwMjIsIDM3MDUyLCAzNzA4MSwgMzcxMTEsIDM3MTQxLCAzNzE3MCwgMzcyMDAsIDM3MjI5LCAzNzI1OSwgMzcyODgsIDM3MzE4LCAzNzM0NywgMzczNzcsIDM3NDA2LCAzNzQzNixcbiAgICAzNzQ2NSwgMzc0OTUsIDM3NTI0LCAzNzU1NCwgMzc1ODQsIDM3NjEzLCAzNzY0MywgMzc2NzIsIDM3NzAxLCAzNzczMSwgMzc3NjAsIDM3NzkwLCAzNzgxOSwgMzc4NDksIDM3ODc4LCAzNzkwOCwgMzc5MzgsIDM3OTY3LCAzNzk5NywgMzgwMjcsXG4gICAgMzgwNTYsIDM4MDg1LCAzODExNSwgMzgxNDQsIDM4MTc0LCAzODIwMywgMzgyMzMsIDM4MjYyLCAzODI5MiwgMzgzMjIsIDM4MzUxLCAzODM4MSwgMzg0MTAsIDM4NDQwLCAzODQ2OSwgMzg0OTksIDM4NTI4LCAzODU1OCwgMzg1ODcsIDM4NjE3LFxuICAgIDM4NjQ2LCAzODY3NiwgMzg3MDUsIDM4NzM1LCAzODc2NCwgMzg3OTQsIDM4ODIzLCAzODg1MywgMzg4ODIsIDM4OTEyLCAzODk0MSwgMzg5NzEsIDM5MDAxLCAzOTAzMCwgMzkwNTksIDM5MDg5LCAzOTExOCwgMzkxNDgsIDM5MTc4LCAzOTIwOCxcbiAgICAzOTIzNywgMzkyNjcsIDM5Mjk3LCAzOTMyNiwgMzkzNTUsIDM5Mzg1LCAzOTQxNCwgMzk0NDQsIDM5NDczLCAzOTUwMywgMzk1MzIsIDM5NTYyLCAzOTU5MiwgMzk2MjEsIDM5NjUwLCAzOTY4MCwgMzk3MDksIDM5NzM5LCAzOTc2OCwgMzk3OTgsXG4gICAgMzk4MjcsIDM5ODU3LCAzOTg4NiwgMzk5MTYsIDM5OTQ2LCAzOTk3NSwgNDAwMDUsIDQwMDM1LCA0MDA2NCwgNDAwOTQsIDQwMTIzLCA0MDE1MywgNDAxODIsIDQwMjEyLCA0MDI0MSwgNDAyNzEsIDQwMzAwLCA0MDMzMCwgNDAzNTksIDQwMzg5LFxuICAgIDQwNDE4LCA0MDQ0OCwgNDA0NzcsIDQwNTA3LCA0MDUzNiwgNDA1NjYsIDQwNTk1LCA0MDYyNSwgNDA2NTUsIDQwNjg1LCA0MDcxNCwgNDA3NDQsIDQwNzczLCA0MDgwMywgNDA4MzIsIDQwODYyLCA0MDg5MiwgNDA5MjEsIDQwOTUxLCA0MDk4MCxcbiAgICA0MTAwOSwgNDEwMzksIDQxMDY4LCA0MTA5OCwgNDExMjcsIDQxMTU3LCA0MTE4NiwgNDEyMTYsIDQxMjQ1LCA0MTI3NSwgNDEzMDQsIDQxMzM0LCA0MTM2NCwgNDEzOTMsIDQxNDIyLCA0MTQ1MiwgNDE0ODEsIDQxNTExLCA0MTU0MCwgNDE1NzAsXG4gICAgNDE1OTksIDQxNjI5LCA0MTY1OCwgNDE2ODgsIDQxNzE4LCA0MTc0OCwgNDE3NzcsIDQxODA3LCA0MTgzNiwgNDE4NjUsIDQxODk0LCA0MTkyNCwgNDE5NTMsIDQxOTgzLCA0MjAxMiwgNDIwNDIsIDQyMDcyLCA0MjEwMiwgNDIxMzEsIDQyMTYxLFxuICAgIDQyMTkwLCA0MjIyMCwgNDIyNDksIDQyMjc5LCA0MjMwOCwgNDIzMzcsIDQyMzY3LCA0MjM5NywgNDI0MjYsIDQyNDU2LCA0MjQ4NSwgNDI1MTUsIDQyNTQ1LCA0MjU3NCwgNDI2MDQsIDQyNjMzLCA0MjY2MiwgNDI2OTIsIDQyNzIxLCA0Mjc1MSxcbiAgICA0Mjc4MCwgNDI4MTAsIDQyODM5LCA0Mjg2OSwgNDI4OTksIDQyOTI5LCA0Mjk1OCwgNDI5ODgsIDQzMDE3LCA0MzA0NiwgNDMwNzYsIDQzMTA1LCA0MzEzNSwgNDMxNjQsIDQzMTk0LCA0MzIyMywgNDMyNTMsIDQzMjgzLCA0MzMxMiwgNDMzNDIsXG4gICAgNDMzNzEsIDQzNDAxLCA0MzQzMCwgNDM0NjAsIDQzNDg5LCA0MzUxOSwgNDM1NDgsIDQzNTc4LCA0MzYwNywgNDM2MzcsIDQzNjY2LCA0MzY5NiwgNDM3MjYsIDQzNzU1LCA0Mzc4NSwgNDM4MTQsIDQzODQ0LCA0Mzg3MywgNDM5MDMsIDQzOTMyLFxuICAgIDQzOTYyLCA0Mzk5MSwgNDQwMjEsIDQ0MDUwLCA0NDA4MCwgNDQxMDksIDQ0MTM5LCA0NDE2OSwgNDQxOTgsIDQ0MjI4LCA0NDI1OCwgNDQyODcsIDQ0MzE3LCA0NDM0NiwgNDQzNzUsIDQ0NDA1LCA0NDQzNCwgNDQ0NjQsIDQ0NDkzLCA0NDUyMyxcbiAgICA0NDU1MywgNDQ1ODIsIDQ0NjEyLCA0NDY0MSwgNDQ2NzEsIDQ0NzAwLCA0NDczMCwgNDQ3NTksIDQ0Nzg4LCA0NDgxOCwgNDQ4NDcsIDQ0ODc3LCA0NDkwNiwgNDQ5MzYsIDQ0OTY2LCA0NDk5NiwgNDUwMjUsIDQ1MDU1LCA0NTA4NCwgNDUxMTQsXG4gICAgNDUxNDMsIDQ1MTcyLCA0NTIwMiwgNDUyMzEsIDQ1MjYxLCA0NTI5MCwgNDUzMjAsIDQ1MzUwLCA0NTM4MCwgNDU0MDksIDQ1NDM5LCA0NTQ2OCwgNDU0OTgsIDQ1NTI3LCA0NTU1NiwgNDU1ODYsIDQ1NjE1LCA0NTY0NCwgNDU2NzQsIDQ1NzA0LFxuICAgIDQ1NzMzLCA0NTc2MywgNDU3OTMsIDQ1ODIzLCA0NTg1MiwgNDU4ODIsIDQ1OTExLCA0NTk0MCwgNDU5NzAsIDQ1OTk5LCA0NjAyOCwgNDYwNTgsIDQ2MDg4LCA0NjExNywgNDYxNDcsIDQ2MTc3LCA0NjIwNiwgNDYyMzYsIDQ2MjY1LCA0NjI5NSxcbiAgICA0NjMyNCwgNDYzNTQsIDQ2MzgzLCA0NjQxMywgNDY0NDIsIDQ2NDcyLCA0NjUwMSwgNDY1MzEsIDQ2NTYwLCA0NjU5MCwgNDY2MjAsIDQ2NjQ5LCA0NjY3OSwgNDY3MDgsIDQ2NzM4LCA0Njc2NywgNDY3OTcsIDQ2ODI2LCA0Njg1NiwgNDY4ODUsXG4gICAgNDY5MTUsIDQ2OTQ0LCA0Njk3NCwgNDcwMDMsIDQ3MDMzLCA0NzA2MywgNDcwOTIsIDQ3MTIyLCA0NzE1MSwgNDcxODEsIDQ3MjEwLCA0NzI0MCwgNDcyNjksIDQ3Mjk4LCA0NzMyOCwgNDczNTcsIDQ3Mzg3LCA0NzQxNywgNDc0NDYsIDQ3NDc2LFxuICAgIDQ3NTA2LCA0NzUzNSwgNDc1NjUsIDQ3NTk0LCA0NzYyNCwgNDc2NTMsIDQ3NjgyLCA0NzcxMiwgNDc3NDEsIDQ3NzcxLCA0NzgwMCwgNDc4MzAsIDQ3ODYwLCA0Nzg5MCwgNDc5MTksIDQ3OTQ5LCA0Nzk3OCwgNDgwMDgsIDQ4MDM3LCA0ODA2NixcbiAgICA0ODA5NiwgNDgxMjUsIDQ4MTU1LCA0ODE4NCwgNDgyMTQsIDQ4MjQ0LCA0ODI3MywgNDgzMDMsIDQ4MzMzLCA0ODM2MiwgNDgzOTIsIDQ4NDIxLCA0ODQ1MCwgNDg0ODAsIDQ4NTA5LCA0ODUzOCwgNDg1NjgsIDQ4NTk4LCA0ODYyNywgNDg2NTcsXG4gICAgNDg2ODcsIDQ4NzE3LCA0ODc0NiwgNDg3NzYsIDQ4ODA1LCA0ODgzNCwgNDg4NjQsIDQ4ODkzLCA0ODkyMiwgNDg5NTIsIDQ4OTgyLCA0OTAxMSwgNDkwNDEsIDQ5MDcxLCA0OTEwMCwgNDkxMzAsIDQ5MTYwLCA0OTE4OSwgNDkyMTgsIDQ5MjQ4LFxuICAgIDQ5Mjc3LCA0OTMwNiwgNDkzMzYsIDQ5MzY1LCA0OTM5NSwgNDk0MjUsIDQ5NDU1LCA0OTQ4NCwgNDk1MTQsIDQ5NTQzLCA0OTU3MywgNDk2MDIsIDQ5NjMyLCA0OTY2MSwgNDk2OTAsIDQ5NzIwLCA0OTc0OSwgNDk3NzksIDQ5ODA5LCA0OTgzOCxcbiAgICA0OTg2OCwgNDk4OTgsIDQ5OTI3LCA0OTk1NywgNDk5ODYsIDUwMDE2LCA1MDA0NSwgNTAwNzUsIDUwMTA0LCA1MDEzMywgNTAxNjMsIDUwMTkyLCA1MDIyMiwgNTAyNTIsIDUwMjgxLCA1MDMxMSwgNTAzNDAsIDUwMzcwLCA1MDQwMCwgNTA0MjksXG4gICAgNTA0NTksIDUwNDg4LCA1MDUxOCwgNTA1NDcsIDUwNTc2LCA1MDYwNiwgNTA2MzUsIDUwNjY1LCA1MDY5NCwgNTA3MjQsIDUwNzU0LCA1MDc4NCwgNTA4MTMsIDUwODQzLCA1MDg3MiwgNTA5MDIsIDUwOTMxLCA1MDk2MCwgNTA5OTAsIDUxMDE5LFxuICAgIDUxMDQ5LCA1MTA3OCwgNTExMDgsIDUxMTM4LCA1MTE2NywgNTExOTcsIDUxMjI3LCA1MTI1NiwgNTEyODYsIDUxMzE1LCA1MTM0NSwgNTEzNzQsIDUxNDAzLCA1MTQzMywgNTE0NjIsIDUxNDkyLCA1MTUyMiwgNTE1NTIsIDUxNTgyLCA1MTYxMSxcbiAgICA1MTY0MSwgNTE2NzAsIDUxNjk5LCA1MTcyOSwgNTE3NTgsIDUxNzg3LCA1MTgxNiwgNTE4NDYsIDUxODc2LCA1MTkwNiwgNTE5MzYsIDUxOTY1LCA1MTk5NSwgNTIwMjUsIDUyMDU0LCA1MjA4MywgNTIxMTMsIDUyMTQyLCA1MjE3MSwgNTIyMDAsXG4gICAgNTIyMzAsIDUyMjYwLCA1MjI5MCwgNTIzMTksIDUyMzQ5LCA1MjM3OSwgNTI0MDgsIDUyNDM4LCA1MjQ2NywgNTI0OTcsIDUyNTI2LCA1MjU1NSwgNTI1ODUsIDUyNjE0LCA1MjY0NCwgNTI2NzMsIDUyNzAzLCA1MjczMywgNTI3NjIsIDUyNzkyLFxuICAgIDUyODIyLCA1Mjg1MSwgNTI4ODEsIDUyOTEwLCA1MjkzOSwgNTI5NjksIDUyOTk4LCA1MzAyOCwgNTMwNTcsIDUzMDg3LCA1MzExNiwgNTMxNDYsIDUzMTc2LCA1MzIwNSwgNTMyMzUsIDUzMjY0LCA1MzI5NCwgNTMzMjQsIDUzMzUzLCA1MzM4MyxcbiAgICA1MzQxMiwgNTM0NDEsIDUzNDcxLCA1MzUwMCwgNTM1MzAsIDUzNTU5LCA1MzU4OSwgNTM2MTksIDUzNjQ4LCA1MzY3OCwgNTM3MDgsIDUzNzM3LCA1Mzc2NywgNTM3OTYsIDUzODI1LCA1Mzg1NSwgNTM4ODQsIDUzOTEzLCA1Mzk0MywgNTM5NzMsXG4gICAgNTQwMDMsIDU0MDMyLCA1NDA2MiwgNTQwOTIsIDU0MTIxLCA1NDE1MSwgNTQxODAsIDU0MjA5LCA1NDIzOSwgNTQyNjgsIDU0Mjk3LCA1NDMyNywgNTQzNTcsIDU0Mzg3LCA1NDQxNiwgNTQ0NDYsIDU0NDc2LCA1NDUwNSwgNTQ1MzUsIDU0NTY0LFxuICAgIDU0NTkzLCA1NDYyMywgNTQ2NTIsIDU0NjgxLCA1NDcxMSwgNTQ3NDEsIDU0NzcwLCA1NDgwMCwgNTQ4MzAsIDU0ODU5LCA1NDg4OSwgNTQ5MTksIDU0OTQ4LCA1NDk3NywgNTUwMDcsIDU1MDM2LCA1NTA2NiwgNTUwOTUsIDU1MTI1LCA1NTE1NCxcbiAgICA1NTE4NCwgNTUyMTMsIDU1MjQzLCA1NTI3MywgNTUzMDIsIDU1MzMyLCA1NTM2MSwgNTUzOTEsIDU1NDIwLCA1NTQ1MCwgNTU0NzksIDU1NTA4LCA1NTUzOCwgNTU1NjcsIDU1NTk3LCA1NTYyNywgNTU2NTcsIDU1Njg2LCA1NTcxNiwgNTU3NDUsXG4gICAgNTU3NzUsIDU1ODA0LCA1NTgzNCwgNTU4NjMsIDU1ODkyLCA1NTkyMiwgNTU5NTEsIDU1OTgxLCA1NjAxMSwgNTYwNDAsIDU2MDcwLCA1NjEwMCwgNTYxMjksIDU2MTU5LCA1NjE4OCwgNTYyMTgsIDU2MjQ3LCA1NjI3NiwgNTYzMDYsIDU2MzM1LFxuICAgIDU2MzY1LCA1NjM5NCwgNTY0MjQsIDU2NDU0LCA1NjQ4MywgNTY1MTMsIDU2NTQzLCA1NjU3MiwgNTY2MDEsIDU2NjMxLCA1NjY2MCwgNTY2OTAsIDU2NzE5LCA1Njc0OSwgNTY3NzgsIDU2ODA4LCA1NjgzNywgNTY4NjcsIDU2ODk3LCA1NjkyNixcbiAgICA1Njk1NiwgNTY5ODUsIDU3MDE1LCA1NzA0NCwgNTcwNzQsIDU3MTAzLCA1NzEzMywgNTcxNjIsIDU3MTkyLCA1NzIyMSwgNTcyNTEsIDU3MjgwLCA1NzMxMCwgNTczNDAsIDU3MzY5LCA1NzM5OSwgNTc0MjksIDU3NDU4LCA1NzQ4NywgNTc1MTcsXG4gICAgNTc1NDYsIDU3NTc2LCA1NzYwNSwgNTc2MzQsIDU3NjY0LCA1NzY5NCwgNTc3MjMsIDU3NzUzLCA1Nzc4MywgNTc4MTMsIDU3ODQyLCA1Nzg3MSwgNTc5MDEsIDU3OTMwLCA1Nzk1OSwgNTc5ODksIDU4MDE4LCA1ODA0OCwgNTgwNzcsIDU4MTA3LFxuICAgIDU4MTM3LCA1ODE2NywgNTgxOTYsIDU4MjI2LCA1ODI1NSwgNTgyODUsIDU4MzE0LCA1ODM0MywgNTgzNzMsIDU4NDAyLCA1ODQzMiwgNTg0NjEsIDU4NDkxLCA1ODUyMSwgNTg1NTEsIDU4NTgwLCA1ODYxMCwgNTg2MzksIDU4NjY5LCA1ODY5OCxcbiAgICA1ODcyNywgNTg3NTcsIDU4Nzg2LCA1ODgxNiwgNTg4NDUsIDU4ODc1LCA1ODkwNSwgNTg5MzQsIDU4OTY0LCA1ODk5NCwgNTkwMjMsIDU5MDUzLCA1OTA4MiwgNTkxMTEsIDU5MTQxLCA1OTE3MCwgNTkyMDAsIDU5MjI5LCA1OTI1OSwgNTkyODgsXG4gICAgNTkzMTgsIDU5MzQ4LCA1OTM3NywgNTk0MDcsIDU5NDM2LCA1OTQ2NiwgNTk0OTUsIDU5NTI1LCA1OTU1NCwgNTk1ODQsIDU5NjEzLCA1OTY0MywgNTk2NzIsIDU5NzAyLCA1OTczMSwgNTk3NjEsIDU5NzkxLCA1OTgyMCwgNTk4NTAsIDU5ODc5LFxuICAgIDU5OTA5LCA1OTkzOSwgNTk5NjgsIDU5OTk3LCA2MDAyNywgNjAwNTYsIDYwMDg2LCA2MDExNSwgNjAxNDUsIDYwMTc0LCA2MDIwNCwgNjAyMzQsIDYwMjY0LCA2MDI5MywgNjAzMjMsIDYwMzUyLCA2MDM4MSwgNjA0MTEsIDYwNDQwLCA2MDQ2OSxcbiAgICA2MDQ5OSwgNjA1MjgsIDYwNTU4LCA2MDU4OCwgNjA2MTgsIDYwNjQ4LCA2MDY3NywgNjA3MDcsIDYwNzM2LCA2MDc2NSwgNjA3OTUsIDYwODI0LCA2MDg1MywgNjA4ODMsIDYwOTEyLCA2MDk0MiwgNjA5NzIsIDYxMDAyLCA2MTAzMSwgNjEwNjEsXG4gICAgNjEwOTAsIDYxMTIwLCA2MTE0OSwgNjExNzksIDYxMjA4LCA2MTIzNywgNjEyNjcsIDYxMjk2LCA2MTMyNiwgNjEzNTYsIDYxMzg1LCA2MTQxNSwgNjE0NDUsIDYxNDc0LCA2MTUwNCwgNjE1MzMsIDYxNTYzLCA2MTU5MiwgNjE2MjEsIDYxNjUxLFxuICAgIDYxNjgwLCA2MTcxMCwgNjE3MzksIDYxNzY5LCA2MTc5OSwgNjE4MjgsIDYxODU4LCA2MTg4OCwgNjE5MTcsIDYxOTQ3LCA2MTk3NiwgNjIwMDYsIDYyMDM1LCA2MjA2NCwgNjIwOTQsIDYyMTIzLCA2MjE1MywgNjIxODIsIDYyMjEyLCA2MjI0MixcbiAgICA2MjI3MSwgNjIzMDEsIDYyMzMxLCA2MjM2MCwgNjIzOTAsIDYyNDE5LCA2MjQ0OCwgNjI0NzgsIDYyNTA3LCA2MjUzNywgNjI1NjYsIDYyNTk2LCA2MjYyNSwgNjI2NTUsIDYyNjg1LCA2MjcxNSwgNjI3NDQsIDYyNzc0LCA2MjgwMywgNjI4MzIsXG4gICAgNjI4NjIsIDYyODkxLCA2MjkyMSwgNjI5NTAsIDYyOTgwLCA2MzAwOSwgNjMwMzksIDYzMDY5LCA2MzA5OSwgNjMxMjgsIDYzMTU3LCA2MzE4NywgNjMyMTYsIDYzMjQ2LCA2MzI3NSwgNjMzMDUsIDYzMzM0LCA2MzM2MywgNjMzOTMsIDYzNDIzLFxuICAgIDYzNDUzLCA2MzQ4MiwgNjM1MTIsIDYzNTQxLCA2MzU3MSwgNjM2MDAsIDYzNjMwLCA2MzY1OSwgNjM2ODksIDYzNzE4LCA2Mzc0NywgNjM3NzcsIDYzODA3LCA2MzgzNiwgNjM4NjYsIDYzODk1LCA2MzkyNSwgNjM5NTUsIDYzOTg0LCA2NDAxNCxcbiAgICA2NDA0MywgNjQwNzMsIDY0MTAyLCA2NDEzMSwgNjQxNjEsIDY0MTkwLCA2NDIyMCwgNjQyNDksIDY0Mjc5LCA2NDMwOSwgNjQzMzksIDY0MzY4LCA2NDM5OCwgNjQ0MjcsIDY0NDU3LCA2NDQ4NiwgNjQ1MTUsIDY0NTQ1LCA2NDU3NCwgNjQ2MDMsXG4gICAgNjQ2MzMsIDY0NjYzLCA2NDY5MiwgNjQ3MjIsIDY0NzUyLCA2NDc4MiwgNjQ4MTEsIDY0ODQxLCA2NDg3MCwgNjQ4OTksIDY0OTI5LCA2NDk1OCwgNjQ5ODcsIDY1MDE3LCA2NTA0NywgNjUwNzYsIDY1MTA2LCA2NTEzNiwgNjUxNjYsIDY1MTk1LFxuICAgIDY1MjI1LCA2NTI1NCwgNjUyODMsIDY1MzEzLCA2NTM0MiwgNjUzNzEsIDY1NDAxLCA2NTQzMSwgNjU0NjAsIDY1NDkwLCA2NTUyMCwgNjU1NDksIDY1NTc5LCA2NTYwOCwgNjU2MzgsIDY1NjY3LCA2NTY5NywgNjU3MjYsIDY1NzU1LCA2NTc4NSxcbiAgICA2NTgxNSwgNjU4NDQsIDY1ODc0LCA2NTkwMywgNjU5MzMsIDY1OTYzLCA2NTk5MiwgNjYwMjIsIDY2MDUxLCA2NjA4MSwgNjYxMTAsIDY2MTQwLCA2NjE2OSwgNjYxOTksIDY2MjI4LCA2NjI1OCwgNjYyODcsIDY2MzE3LCA2NjM0NiwgNjYzNzYsXG4gICAgNjY0MDUsIDY2NDM1LCA2NjQ2NSwgNjY0OTQsIDY2NTI0LCA2NjU1MywgNjY1ODMsIDY2NjEyLCA2NjY0MSwgNjY2NzEsIDY2NzAwLCA2NjczMCwgNjY3NjAsIDY2Nzg5LCA2NjgxOSwgNjY4NDksIDY2ODc4LCA2NjkwOCwgNjY5MzcsIDY2OTY3LFxuICAgIDY2OTk2LCA2NzAyNSwgNjcwNTUsIDY3MDg0LCA2NzExNCwgNjcxNDMsIDY3MTczLCA2NzIwMywgNjcyMzMsIDY3MjYyLCA2NzI5MiwgNjczMjEsIDY3MzUxLCA2NzM4MCwgNjc0MDksIDY3NDM5LCA2NzQ2OCwgNjc0OTcsIDY3NTI3LCA2NzU1NyxcbiAgICA2NzU4NywgNjc2MTcsIDY3NjQ2LCA2NzY3NiwgNjc3MDUsIDY3NzM1LCA2Nzc2NCwgNjc3OTMsIDY3ODIzLCA2Nzg1MiwgNjc4ODIsIDY3OTExLCA2Nzk0MSwgNjc5NzEsIDY4MDAwLCA2ODAzMCwgNjgwNjAsIDY4MDg5LCA2ODExOSwgNjgxNDgsXG4gICAgNjgxNzcsIDY4MjA3LCA2ODIzNiwgNjgyNjYsIDY4Mjk1LCA2ODMyNSwgNjgzNTQsIDY4Mzg0LCA2ODQxNCwgNjg0NDMsIDY4NDczLCA2ODUwMiwgNjg1MzIsIDY4NTYxLCA2ODU5MSwgNjg2MjAsIDY4NjUwLCA2ODY3OSwgNjg3MDgsIDY4NzM4LFxuICAgIDY4NzY4LCA2ODc5NywgNjg4MjcsIDY4ODU3LCA2ODg4NiwgNjg5MTYsIDY4OTQ2LCA2ODk3NSwgNjkwMDQsIDY5MDM0LCA2OTA2MywgNjkwOTIsIDY5MTIyLCA2OTE1MiwgNjkxODEsIDY5MjExLCA2OTI0MCwgNjkyNzAsIDY5MzAwLCA2OTMzMCxcbiAgICA2OTM1OSwgNjkzODgsIDY5NDE4LCA2OTQ0NywgNjk0NzYsIDY5NTA2LCA2OTUzNSwgNjk1NjUsIDY5NTk1LCA2OTYyNCwgNjk2NTQsIDY5Njg0LCA2OTcxMywgNjk3NDMsIDY5NzcyLCA2OTgwMiwgNjk4MzEsIDY5ODYxLCA2OTg5MCwgNjk5MTksXG4gICAgNjk5NDksIDY5OTc4LCA3MDAwOCwgNzAwMzgsIDcwMDY3LCA3MDA5NywgNzAxMjYsIDcwMTU2LCA3MDE4NiwgNzAyMTUsIDcwMjQ1LCA3MDI3NCwgNzAzMDMsIDcwMzMzLCA3MDM2MiwgNzAzOTIsIDcwNDIxLCA3MDQ1MSwgNzA0ODEsIDcwNTEwLFxuICAgIDcwNTQwLCA3MDU3MCwgNzA1OTksIDcwNjI5LCA3MDY1OCwgNzA2ODcsIDcwNzE3LCA3MDc0NiwgNzA3NzYsIDcwODA1LCA3MDgzNSwgNzA4NjQsIDcwODk0LCA3MDkyNCwgNzA5NTQsIDcwOTgzLCA3MTAxMywgNzEwNDIsIDcxMDcxLCA3MTEwMSxcbiAgICA3MTEzMCwgNzExNTksIDcxMTg5LCA3MTIxOCwgNzEyNDgsIDcxMjc4LCA3MTMwOCwgNzEzMzcsIDcxMzY3LCA3MTM5NywgNzE0MjYsIDcxNDU1LCA3MTQ4NSwgNzE1MTQsIDcxNTQzLCA3MTU3MywgNzE2MDIsIDcxNjMyLCA3MTY2MiwgNzE2OTEsXG4gICAgNzE3MjEsIDcxNzUxLCA3MTc4MSwgNzE4MTAsIDcxODM5LCA3MTg2OSwgNzE4OTgsIDcxOTI3LCA3MTk1NywgNzE5ODYsIDcyMDE2LCA3MjA0NiwgNzIwNzUsIDcyMTA1LCA3MjEzNSwgNzIxNjQsIDcyMTk0LCA3MjIyMywgNzIyNTMsIDcyMjgyLFxuICAgIDcyMzExLCA3MjM0MSwgNzIzNzAsIDcyNDAwLCA3MjQyOSwgNzI0NTksIDcyNDg5LCA3MjUxOCwgNzI1NDgsIDcyNTc3LCA3MjYwNywgNzI2MzcsIDcyNjY2LCA3MjY5NSwgNzI3MjUsIDcyNzU0LCA3Mjc4NCwgNzI4MTMsIDcyODQzLCA3Mjg3MixcbiAgICA3MjkwMiwgNzI5MzEsIDcyOTYxLCA3Mjk5MSwgNzMwMjAsIDczMDUwLCA3MzA4MCwgNzMxMDksIDczMTM5LCA3MzE2OCwgNzMxOTcsIDczMjI3LCA3MzI1NiwgNzMyODYsIDczMzE1LCA3MzM0NSwgNzMzNzUsIDczNDA0LCA3MzQzNCwgNzM0NjQsXG4gICAgNzM0OTMsIDczNTIzLCA3MzU1MiwgNzM1ODEsIDczNjExLCA3MzY0MCwgNzM2NjksIDczNjk5LCA3MzcyOSwgNzM3NTgsIDczNzg4LCA3MzgxOCwgNzM4NDgsIDczODc3LCA3MzkwNywgNzM5MzYsIDczOTY1LCA3Mzk5NSwgNzQwMjQsIDc0MDUzLFxuICAgIDc0MDgzLCA3NDExMywgNzQxNDIsIDc0MTcyLCA3NDIwMiwgNzQyMzEsIDc0MjYxLCA3NDI5MSwgNzQzMjAsIDc0MzQ5LCA3NDM3OSwgNzQ0MDgsIDc0NDM3LCA3NDQ2NywgNzQ0OTcsIDc0NTI2LCA3NDU1NiwgNzQ1ODYsIDc0NjE1LCA3NDY0NSxcbiAgICA3NDY3NSwgNzQ3MDQsIDc0NzMzLCA3NDc2MywgNzQ3OTIsIDc0ODIyLCA3NDg1MSwgNzQ4ODEsIDc0OTEwLCA3NDk0MCwgNzQ5NjksIDc0OTk5LCA3NTAyOSwgNzUwNTgsIDc1MDg4LCA3NTExNywgNzUxNDcsIDc1MTc2LCA3NTIwNiwgNzUyMzUsXG4gICAgNzUyNjQsIDc1Mjk0LCA3NTMyMywgNzUzNTMsIDc1MzgzLCA3NTQxMiwgNzU0NDIsIDc1NDcyLCA3NTUwMSwgNzU1MzEsIDc1NTYwLCA3NTU5MCwgNzU2MTksIDc1NjQ4LCA3NTY3OCwgNzU3MDcsIDc1NzM3LCA3NTc2NiwgNzU3OTYsIDc1ODI2LFxuICAgIDc1ODU2LCA3NTg4NSwgNzU5MTUsIDc1OTQ0LCA3NTk3NCwgNzYwMDMsIDc2MDMyLCA3NjA2MiwgNzYwOTEsIDc2MTIxLCA3NjE1MCwgNzYxODAsIDc2MjEwLCA3NjIzOSwgNzYyNjksIDc2Mjk5LCA3NjMyOCwgNzYzNTgsIDc2Mzg3LCA3NjQxNixcbiAgICA3NjQ0NiwgNzY0NzUsIDc2NTA1LCA3NjUzNCwgNzY1NjQsIDc2NTkzLCA3NjYyMywgNzY2NTMsIDc2NjgyLCA3NjcxMiwgNzY3NDEsIDc2NzcxLCA3NjgwMSwgNzY4MzAsIDc2ODU5LCA3Njg4OSwgNzY5MTgsIDc2OTQ4LCA3Njk3NywgNzcwMDcsXG4gICAgNzcwMzYsIDc3MDY2LCA3NzA5NiwgNzcxMjUsIDc3MTU1LCA3NzE4NSwgNzcyMTQsIDc3MjQzLCA3NzI3MywgNzczMDIsIDc3MzMyLCA3NzM2MSwgNzczOTAsIDc3NDIwLCA3NzQ1MCwgNzc0NzksIDc3NTA5LCA3NzUzOSwgNzc1NjksIDc3NTk4LFxuICAgIDc3NjI3LCA3NzY1NywgNzc2ODYsIDc3NzE1LCA3Nzc0NSwgNzc3NzQsIDc3ODA0LCA3NzgzMywgNzc4NjMsIDc3ODkzLCA3NzkyMywgNzc5NTIsIDc3OTgyLCA3ODAxMSwgNzgwNDEsIDc4MDcwLCA3ODA5OSwgNzgxMjksIDc4MTU4LCA3ODE4OCxcbiAgICA3ODIxNywgNzgyNDcsIDc4Mjc3LCA3ODMwNywgNzgzMzYsIDc4MzY2LCA3ODM5NSwgNzg0MjUsIDc4NDU0LCA3ODQ4MywgNzg1MTMsIDc4NTQyLCA3ODU3MiwgNzg2MDEsIDc4NjMxLCA3ODY2MSwgNzg2OTAsIDc4NzIwLCA3ODc1MCwgNzg3NzksXG4gICAgNzg4MDgsIDc4ODM4LCA3ODg2NywgNzg4OTcsIDc4OTI2LCA3ODk1NiwgNzg5ODUsIDc5MDE1LCA3OTA0NCwgNzkwNzQsIDc5MTA0LCA3OTEzMywgNzkxNjMsIDc5MTkyLCA3OTIyMiwgNzkyNTEsIDc5MjgxLCA3OTMxMCwgNzkzNDAsIDc5MzY5LFxuICAgIDc5Mzk5LCA3OTQyOCwgNzk0NTgsIDc5NDg3LCA3OTUxNywgNzk1NDYsIDc5NTc2LCA3OTYwNiwgNzk2MzUsIDc5NjY1LCA3OTY5NSwgNzk3MjQsIDc5NzUzLCA3OTc4MywgNzk4MTIsIDc5ODQxLCA3OTg3MSwgNzk5MDAsIDc5OTMwLCA3OTk2MCxcbiAgICA3OTk5MF07XG5cbiIsIi8qXG4gKiBXb3JsZCBDYWxlbmRhcnNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4Y2pvaG5zb24vd29ybGQtY2FsZW5kYXJzXG4gKlxuICogQmF0Y2gtY29udmVydGVkIGZyb20ga2J3b29kL2NhbGVuZGFyc1xuICogTWFueSB0aGFua3MgdG8gS2VpdGggV29vZCBhbmQgYWxsIG9mIHRoZSBjb250cmlidXRvcnMgdG8gdGhlIG9yaWdpbmFsIHByb2plY3QhXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxu77u/LyogaHR0cDovL2tlaXRoLXdvb2QubmFtZS9jYWxlbmRhcnMuaHRtbFxuICAgQ2FsZW5kYXJzIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBLZWl0aCBXb29kICh3b29kLmtlaXRoe2F0fW9wdHVzbmV0LmNvbS5hdSkgQXVndXN0IDIwMDkuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cblxuZnVuY3Rpb24gQ2FsZW5kYXJzKCkge1xuICAgIHRoaXMucmVnaW9uYWxPcHRpb25zID0gW107XG4gICAgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddID0ge1xuICAgICAgICBpbnZhbGlkQ2FsZW5kYXI6ICdDYWxlbmRhciB7MH0gbm90IGZvdW5kJyxcbiAgICAgICAgaW52YWxpZERhdGU6ICdJbnZhbGlkIHswfSBkYXRlJyxcbiAgICAgICAgaW52YWxpZE1vbnRoOiAnSW52YWxpZCB7MH0gbW9udGgnLFxuICAgICAgICBpbnZhbGlkWWVhcjogJ0ludmFsaWQgezB9IHllYXInLFxuICAgICAgICBkaWZmZXJlbnRDYWxlbmRhcnM6ICdDYW5ub3QgbWl4IHswfSBhbmQgezF9IGRhdGVzJ1xuICAgIH07XG4gICAgdGhpcy5sb2NhbCA9IHRoaXMucmVnaW9uYWxPcHRpb25zWycnXTtcbiAgICB0aGlzLmNhbGVuZGFycyA9IHt9O1xuICAgIHRoaXMuX2xvY2FsQ2FscyA9IHt9O1xufVxuXG4vKiogQ3JlYXRlIHRoZSBjYWxlbmRhcnMgcGx1Z2luLlxuICAgIDxwPlByb3ZpZGVzIHN1cHBvcnQgZm9yIHZhcmlvdXMgd29ybGQgY2FsZW5kYXJzIGluIGEgY29uc2lzdGVudCBtYW5uZXIuPC9wPlxuICAgICBAY2xhc3MgQ2FsZW5kYXJzXG4gICAgQGV4YW1wbGUgX2V4cG9ydHMuaW5zdGFuY2UoJ2p1bGlhbicpLm5ld0RhdGUoMjAxNCwgMTIsIDI1KSAqL1xuYXNzaWduKENhbGVuZGFycy5wcm90b3R5cGUsIHtcblxuICAgIC8qKiBPYnRhaW4gYSBjYWxlbmRhciBpbXBsZW1lbnRhdGlvbiBhbmQgbG9jYWxpc2F0aW9uLlxuICAgICAgICBAbWVtYmVyb2YgQ2FsZW5kYXJzXG4gICAgICAgIEBwYXJhbSBbbmFtZT0nZ3JlZ29yaWFuJ10ge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIGNhbGVuZGFyLCBlLmcuICdncmVnb3JpYW4nLCAncGVyc2lhbicsICdpc2xhbWljJy5cbiAgICAgICAgQHBhcmFtIFtsYW5ndWFnZT0nJ10ge3N0cmluZ30gVGhlIGxhbmd1YWdlIGNvZGUgdG8gdXNlIGZvciBsb2NhbGlzYXRpb24gKGRlZmF1bHQgaXMgRW5nbGlzaCkuXG4gICAgICAgIEByZXR1cm4ge0NhbGVuZGFyfSBUaGUgY2FsZW5kYXIgYW5kIGxvY2FsaXNhdGlvbi5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBjYWxlbmRhciBub3QgZm91bmQuICovXG4gICAgaW5zdGFuY2U6IGZ1bmN0aW9uKG5hbWUsIGxhbmd1YWdlKSB7XG4gICAgICAgIG5hbWUgPSAobmFtZSB8fCAnZ3JlZ29yaWFuJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGFuZ3VhZ2UgPSBsYW5ndWFnZSB8fCAnJztcbiAgICAgICAgdmFyIGNhbCA9IHRoaXMuX2xvY2FsQ2Fsc1tuYW1lICsgJy0nICsgbGFuZ3VhZ2VdO1xuICAgICAgICBpZiAoIWNhbCAmJiB0aGlzLmNhbGVuZGFyc1tuYW1lXSkge1xuICAgICAgICAgICAgY2FsID0gbmV3IHRoaXMuY2FsZW5kYXJzW25hbWVdKGxhbmd1YWdlKTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsQ2Fsc1tuYW1lICsgJy0nICsgbGFuZ3VhZ2VdID0gY2FsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsKSB7XG4gICAgICAgICAgICB0aHJvdyAodGhpcy5sb2NhbC5pbnZhbGlkQ2FsZW5kYXIgfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWRDYWxlbmRhcikuXG4gICAgICAgICAgICAgICAgcmVwbGFjZSgvXFx7MFxcfS8sIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWw7XG4gICAgfSxcblxuICAgIC8qKiBDcmVhdGUgYSBuZXcgZGF0ZSAtIGZvciB0b2RheSBpZiBubyBvdGhlciBwYXJhbWV0ZXJzIGdpdmVuLlxuICAgICAgICBAbWVtYmVyb2YgQ2FsZW5kYXJzXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvcHkgb3IgdGhlIHllYXIgZm9yIHRoZSBkYXRlLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggZm9yIHRoZSBkYXRlLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEBwYXJhbSBbY2FsZW5kYXI9J2dyZWdvcmlhbiddIHtCYXNlQ2FsZW5kYXJ8c3RyaW5nfSBUaGUgdW5kZXJseWluZyBjYWxlbmRhciBvciB0aGUgbmFtZSBvZiB0aGUgY2FsZW5kYXIuXG4gICAgICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSB0byB1c2UgZm9yIGxvY2FsaXNhdGlvbiAoZGVmYXVsdCBFbmdsaXNoKS5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBuZXcgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUuICovXG4gICAgbmV3RGF0ZTogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSwgY2FsZW5kYXIsIGxhbmd1YWdlKSB7XG4gICAgICAgIGNhbGVuZGFyID0gKHllYXIgIT0gbnVsbCAmJiB5ZWFyLnllYXIgPyB5ZWFyLmNhbGVuZGFyKCkgOiAodHlwZW9mIGNhbGVuZGFyID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlKGNhbGVuZGFyLCBsYW5ndWFnZSkgOiBjYWxlbmRhcikpIHx8IHRoaXMuaW5zdGFuY2UoKTtcbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfSxcbiAgICBcbiAgICAvKiogQSBzaW1wbGUgZGlnaXQgc3Vic3RpdHV0aW9uIGZ1bmN0aW9uIGZvciBsb2NhbGlzaW5nIG51bWJlcnMgdmlhIHRoZSBDYWxlbmRhciBkaWdpdHMgb3B0aW9uLlxuICAgICAgICBAbWVtYmVyIENhbGVuZGFyc1xuICAgICAgICBAcGFyYW0gZGlnaXRzIHtzdHJpbmdbXX0gVGhlIHN1YnN0aXR1dGUgZGlnaXRzLCBmb3IgMCB0aHJvdWdoIDkuXG4gICAgICAgIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgc3Vic3RpdHV0aW9uIGZ1bmN0aW9uLiAqL1xuICAgIHN1YnN0aXR1dGVEaWdpdHM6IGZ1bmN0aW9uKGRpZ2l0cykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgKyAnJykucmVwbGFjZSgvWzAtOV0vZywgZnVuY3Rpb24oZGlnaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlnaXRzW2RpZ2l0XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAvKiogRGlnaXQgc3Vic3RpdHV0aW9uIGZ1bmN0aW9uIGZvciBsb2NhbGlzaW5nIENoaW5lc2Ugc3R5bGUgbnVtYmVycyB2aWEgdGhlIENhbGVuZGFyIGRpZ2l0cyBvcHRpb24uXG4gICAgICAgIEBtZW1iZXIgQ2FsZW5kYXJzXG4gICAgICAgIEBwYXJhbSBkaWdpdHMge3N0cmluZ1tdfSBUaGUgc3Vic3RpdHV0ZSBkaWdpdHMsIGZvciAwIHRocm91Z2ggOS5cbiAgICAgICAgQHBhcmFtIHBvd2VycyB7c3RyaW5nW119IFRoZSBjaGFyYWN0ZXJzIGRlbm90aW5nIHBvd2VycyBvZiAxMCwgaS5lLiAxLCAxMCwgMTAwLCAxMDAwLlxuICAgICAgICBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIHN1YnN0aXR1dGlvbiBmdW5jdGlvbi4gKi9cbiAgICBzdWJzdGl0dXRlQ2hpbmVzZURpZ2l0czogZnVuY3Rpb24oZGlnaXRzLCBwb3dlcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxOdW1iZXIgPSAnJztcbiAgICAgICAgICAgIHZhciBwb3dlciA9IDA7XG4gICAgICAgICAgICB3aGlsZSAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVuaXRzID0gdmFsdWUgJSAxMDtcbiAgICAgICAgICAgICAgICBsb2NhbE51bWJlciA9ICh1bml0cyA9PT0gMCA/ICcnIDogZGlnaXRzW3VuaXRzXSArIHBvd2Vyc1twb3dlcl0pICsgbG9jYWxOdW1iZXI7XG4gICAgICAgICAgICAgICAgcG93ZXIrKztcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUgLyAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG9jYWxOdW1iZXIuaW5kZXhPZihkaWdpdHNbMV0gKyBwb3dlcnNbMV0pID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxOdW1iZXIgPSBsb2NhbE51bWJlci5zdWJzdHIoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxOdW1iZXIgfHwgZGlnaXRzWzBdO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKiBHZW5lcmljIGRhdGUsIGJhc2VkIG9uIGEgcGFydGljdWxhciBjYWxlbmRhci5cbiAgICBAY2xhc3MgQ0RhdGVcbiAgICBAcGFyYW0gY2FsZW5kYXIge0Jhc2VDYWxlbmRhcn0gVGhlIHVuZGVybHlpbmcgY2FsZW5kYXIgaW1wbGVtZW50YXRpb24uXG4gICAgQHBhcmFtIHllYXIge251bWJlcn0gVGhlIHllYXIgZm9yIHRoaXMgZGF0ZS5cbiAgICBAcGFyYW0gbW9udGgge251bWJlcn0gVGhlIG1vbnRoIGZvciB0aGlzIGRhdGUuXG4gICAgQHBhcmFtIGRheSB7bnVtYmVyfSBUaGUgZGF5IGZvciB0aGlzIGRhdGUuXG4gICAgQHJldHVybiB7Q0RhdGV9IFRoZSBkYXRlIG9iamVjdC5cbiAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZS4gKi9cbmZ1bmN0aW9uIENEYXRlKGNhbGVuZGFyLCB5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgdGhpcy5fY2FsZW5kYXIgPSBjYWxlbmRhcjtcbiAgICB0aGlzLl95ZWFyID0geWVhcjtcbiAgICB0aGlzLl9tb250aCA9IG1vbnRoO1xuICAgIHRoaXMuX2RheSA9IGRheTtcbiAgICBpZiAodGhpcy5fY2FsZW5kYXIuX3ZhbGlkYXRlTGV2ZWwgPT09IDAgJiZcbiAgICAgICAgICAgICF0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKHRoaXMuX3llYXIsIHRoaXMuX21vbnRoLCB0aGlzLl9kYXkpKSB7XG4gICAgICAgIHRocm93IChfZXhwb3J0cy5sb2NhbC5pbnZhbGlkRGF0ZSB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWREYXRlKS5cbiAgICAgICAgICAgIHJlcGxhY2UoL1xcezBcXH0vLCB0aGlzLl9jYWxlbmRhci5sb2NhbC5uYW1lKTtcbiAgICB9XG59XG5cbi8qKiBQYWQgYSBudW1lcmljIHZhbHVlIHdpdGggbGVhZGluZyB6ZXJvZXMuXG4gICAgQHByaXZhdGVcbiAgICBAcGFyYW0gdmFsdWUge251bWJlcn0gVGhlIG51bWJlciB0byBmb3JtYXQuXG4gICAgQHBhcmFtIGxlbmd0aCB7bnVtYmVyfSBUaGUgbWluaW11bSBsZW5ndGguXG4gICAgQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIG51bWJlci4gKi9cbmZ1bmN0aW9uIHBhZCh2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgdmFsdWUgPSAnJyArIHZhbHVlO1xuICAgIHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoMCwgbGVuZ3RoIC0gdmFsdWUubGVuZ3RoKSArIHZhbHVlO1xufVxuXG5hc3NpZ24oQ0RhdGUucHJvdG90eXBlLCB7XG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcGFyYW0gW3llYXJdIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvcHkgb3IgdGhlIHllYXIgZm9yIHRoZSBkYXRlIChkZWZhdWx0IHRoaXMgZGF0ZSkuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IGZvciB0aGUgZGF0ZS5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBuZXcgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUuICovXG4gICAgbmV3RGF0ZTogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIubmV3RGF0ZSgoeWVhciA9PSBudWxsID8gdGhpcyA6IHllYXIpLCBtb250aCwgZGF5KTtcbiAgICB9LFxuXG4gICAgLyoqIFNldCBvciByZXRyaWV2ZSB0aGUgeWVhciBmb3IgdGhpcyBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHBhcmFtIFt5ZWFyXSB7bnVtYmVyfSBUaGUgeWVhciBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcnxDRGF0ZX0gVGhlIGRhdGUncyB5ZWFyIChpZiBubyBwYXJhbWV0ZXIpIG9yIHRoZSB1cGRhdGVkIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlLiAqL1xuICAgIHllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgcmV0dXJuIChhcmd1bWVudHMubGVuZ3RoID09PSAwID8gdGhpcy5feWVhciA6IHRoaXMuc2V0KHllYXIsICd5JykpO1xuICAgIH0sXG5cbiAgICAvKiogU2V0IG9yIHJldHJpZXZlIHRoZSBtb250aCBmb3IgdGhpcyBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIGZvciB0aGUgZGF0ZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfENEYXRlfSBUaGUgZGF0ZSdzIG1vbnRoIChpZiBubyBwYXJhbWV0ZXIpIG9yIHRoZSB1cGRhdGVkIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlLiAqL1xuICAgIG1vbnRoOiBmdW5jdGlvbihtb250aCkge1xuICAgICAgICByZXR1cm4gKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgPyB0aGlzLl9tb250aCA6IHRoaXMuc2V0KG1vbnRoLCAnbScpKTtcbiAgICB9LFxuXG4gICAgLyoqIFNldCBvciByZXRyaWV2ZSB0aGUgZGF5IGZvciB0aGlzIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcnxDRGF0YX0gVGhlIGRhdGUncyBkYXkgKGlmIG5vIHBhcmFtZXRlcikgb3IgdGhlIHVwZGF0ZWQgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUuICovXG4gICAgZGF5OiBmdW5jdGlvbihkYXkpIHtcbiAgICAgICAgcmV0dXJuIChhcmd1bWVudHMubGVuZ3RoID09PSAwID8gdGhpcy5fZGF5IDogdGhpcy5zZXQoZGF5LCAnZCcpKTtcbiAgICB9LFxuXG4gICAgLyoqIFNldCBuZXcgdmFsdWVzIGZvciB0aGlzIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcGFyYW0geWVhciB7bnVtYmVyfSBUaGUgeWVhciBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEBwYXJhbSBtb250aCB7bnVtYmVyfSBUaGUgbW9udGggZm9yIHRoZSBkYXRlLlxuICAgICAgICBAcGFyYW0gZGF5IHtudW1iZXJ9IFRoZSBkYXkgZm9yIHRoZSBkYXRlLlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIHVwZGF0ZWQgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUuICovXG4gICAgZGF0ZTogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGVuZGFyLmlzVmFsaWQoeWVhciwgbW9udGgsIGRheSkpIHtcbiAgICAgICAgICAgIHRocm93IChfZXhwb3J0cy5sb2NhbC5pbnZhbGlkRGF0ZSB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWREYXRlKS5cbiAgICAgICAgICAgICAgICByZXBsYWNlKC9cXHswXFx9LywgdGhpcy5fY2FsZW5kYXIubG9jYWwubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feWVhciA9IHllYXI7XG4gICAgICAgIHRoaXMuX21vbnRoID0gbW9udGg7XG4gICAgICAgIHRoaXMuX2RheSA9IGRheTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgaW4gYSBsZWFwIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGlzIGEgbGVhcCB5ZWFyLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LiAqL1xuICAgIGxlYXBZZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmxlYXBZZWFyKHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIGVwb2NoIGRlc2lnbmF0b3IgZm9yIHRoaXMgZGF0ZSwgZS5nLiBCQ0Ugb3IgQ0UuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjdXJyZW50IGVwb2NoLiAqL1xuICAgIGVwb2NoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmVwb2NoKHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogRm9ybWF0IHRoZSB5ZWFyLCBpZiBub3QgYSBzaW1wbGUgc2VxdWVudGlhbCBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgeWVhci4gKi9cbiAgICBmb3JtYXRZZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmZvcm1hdFllYXIodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbW9udGggb2YgdGhlIHllYXIgZm9yIHRoaXMgZGF0ZSxcbiAgICAgICAgaS5lLiB0aGUgbW9udGgncyBwb3NpdGlvbiB3aXRoaW4gYSBudW1iZXJlZCB5ZWFyLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbW9udGggb2YgdGhlIHllYXI6IDxjb2RlPm1pbk1vbnRoPC9jb2RlPiB0byBtb250aHMgcGVyIHllYXIuICovXG4gICAgbW9udGhPZlllYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIubW9udGhPZlllYXIodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgd2VlayBvZiB0aGUgeWVhciBmb3IgdGhpcyBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgd2VlayBvZiB0aGUgeWVhcjogMSB0byB3ZWVrcyBwZXIgeWVhci4gKi9cbiAgICB3ZWVrT2ZZZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLndlZWtPZlllYXIodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIHllYXIgZm9yIHRoaXMgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIENEYXRlXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzIGluIHRoaXMgeWVhci4gKi9cbiAgICBkYXlzSW5ZZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmRheXNJblllYXIodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgZGF5IG9mIHRoZSB5ZWFyIGZvciB0aGlzIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkYXkgb2YgdGhlIHllYXI6IDEgdG8gZGF5cyBwZXIgeWVhci4gKi9cbiAgICBkYXlPZlllYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuZGF5T2ZZZWFyKHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBmb3IgdGhpcyBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRheXMuICovXG4gICAgZGF5c0luTW9udGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuZGF5c0luTW9udGgodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0aGlzIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkYXkgb2YgdGhlIHdlZWs6IDAgdG8gbnVtYmVyIG9mIGRheXMgLSAxLiAqL1xuICAgIGRheU9mV2VlazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5kYXlPZldlZWsodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgYSB3ZWVrIGRheS5cbiAgICAgICAgQG1lbWJlcm9mIENEYXRlXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgd2VlayBkYXksIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuICovXG4gICAgd2Vla0RheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci53ZWVrRGF5KHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtvYmplY3R9IEFkZGl0aW9uYWwgaW5mb3JtYXRpb24gLSBjb250ZW50cyBkZXBlbmRzIG9uIGNhbGVuZGFyLiAqL1xuICAgIGV4dHJhSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5leHRyYUluZm8odGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBBZGQgcGVyaW9kKHMpIHRvIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIENEYXRlXG4gICAgICAgIEBwYXJhbSBvZmZzZXQge251bWJlcn0gVGhlIG51bWJlciBvZiBwZXJpb2RzIHRvIGFkanVzdCBieS5cbiAgICAgICAgQHBhcmFtIHBlcmlvZCB7c3RyaW5nfSBPbmUgb2YgJ3knIGZvciB5ZWFyLCAnbScgZm9yIG1vbnRoLCAndycgZm9yIHdlZWssICdkJyBmb3IgZGF5LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIHVwZGF0ZWQgZGF0ZS4gKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKG9mZnNldCwgcGVyaW9kKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5hZGQodGhpcywgb2Zmc2V0LCBwZXJpb2QpO1xuICAgIH0sXG5cbiAgICAvKiogU2V0IGEgcG9ydGlvbiBvZiB0aGUgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIENEYXRlXG4gICAgICAgIEBwYXJhbSB2YWx1ZSB7bnVtYmVyfSBUaGUgbmV3IHZhbHVlIGZvciB0aGUgcGVyaW9kLlxuICAgICAgICBAcGFyYW0gcGVyaW9kIHtzdHJpbmd9IE9uZSBvZiAneScgZm9yIHllYXIsICdtJyBmb3IgbW9udGgsICdkJyBmb3IgZGF5LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIHVwZGF0ZWQgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBub3QgYSB2YWxpZCBkYXRlLiAqL1xuICAgIHNldDogZnVuY3Rpb24odmFsdWUsIHBlcmlvZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuc2V0KHRoaXMsIHZhbHVlLCBwZXJpb2QpO1xuICAgIH0sXG5cbiAgICAvKiogQ29tcGFyZSB0aGlzIGRhdGUgdG8gYW5vdGhlciBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHBhcmFtIGRhdGUge0NEYXRlfSBUaGUgb3RoZXIgZGF0ZS5cbiAgICAgICAgQHJldHVybiB7bnVtYmVyfSAtMSBpZiB0aGlzIGRhdGUgaXMgYmVmb3JlIHRoZSBvdGhlciBkYXRlLFxuICAgICAgICAgICAgICAgIDAgaWYgdGhleSBhcmUgZXF1YWwsIG9yICsxIGlmIHRoaXMgZGF0ZSBpcyBhZnRlciB0aGUgb3RoZXIgZGF0ZS4gKi9cbiAgICBjb21wYXJlVG86IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGVuZGFyLm5hbWUgIT09IGRhdGUuX2NhbGVuZGFyLm5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IChfZXhwb3J0cy5sb2NhbC5kaWZmZXJlbnRDYWxlbmRhcnMgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5kaWZmZXJlbnRDYWxlbmRhcnMpLlxuICAgICAgICAgICAgICAgIHJlcGxhY2UoL1xcezBcXH0vLCB0aGlzLl9jYWxlbmRhci5sb2NhbC5uYW1lKS5yZXBsYWNlKC9cXHsxXFx9LywgZGF0ZS5fY2FsZW5kYXIubG9jYWwubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGMgPSAodGhpcy5feWVhciAhPT0gZGF0ZS5feWVhciA/IHRoaXMuX3llYXIgLSBkYXRlLl95ZWFyIDpcbiAgICAgICAgICAgIHRoaXMuX21vbnRoICE9PSBkYXRlLl9tb250aCA/IHRoaXMubW9udGhPZlllYXIoKSAtIGRhdGUubW9udGhPZlllYXIoKSA6XG4gICAgICAgICAgICB0aGlzLl9kYXkgLSBkYXRlLl9kYXkpO1xuICAgICAgICByZXR1cm4gKGMgPT09IDAgPyAwIDogKGMgPCAwID8gLTEgOiArMSkpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIGNhbGVuZGFyIGJhY2tpbmcgdGhpcyBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHJldHVybiB7QmFzZUNhbGVuZGFyfSBUaGUgY2FsZW5kYXIgaW1wbGVtZW50YXRpb24uICovXG4gICAgY2FsZW5kYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXI7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIENEYXRlXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGVxdWl2YWxlbnQgSnVsaWFuIGRhdGUuICovXG4gICAgdG9KRDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci50b0pEKHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUgZnJvbSBhIEp1bGlhbiBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHBhcmFtIGpkIHtudW1iZXJ9IFRoZSBKdWxpYW4gZGF0ZSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIGVxdWl2YWxlbnQgZGF0ZS4gKi9cbiAgICBmcm9tSkQ6IGZ1bmN0aW9uKGpkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5mcm9tSkQoamQpO1xuICAgIH0sXG5cbiAgICAvKiogQ29udmVydCB0aGlzIGRhdGUgdG8gYSBzdGFuZGFyZCAoR3JlZ29yaWFuKSBKYXZhU2NyaXB0IERhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtEYXRlfSBUaGUgZXF1aXZhbGVudCBKYXZhU2NyaXB0IGRhdGUuICovXG4gICAgdG9KU0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIudG9KU0RhdGUodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKiBDcmVhdGUgYSBuZXcgZGF0ZSBmcm9tIGEgc3RhbmRhcmQgKEdyZWdvcmlhbikgSmF2YVNjcmlwdCBEYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQ0RhdGVcbiAgICAgICAgQHBhcmFtIGpzZCB7RGF0ZX0gVGhlIEphdmFTY3JpcHQgZGF0ZSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIGVxdWl2YWxlbnQgZGF0ZS4gKi9cbiAgICBmcm9tSlNEYXRlOiBmdW5jdGlvbihqc2QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmZyb21KU0RhdGUoanNkKTtcbiAgICB9LFxuXG4gICAgLyoqIENvbnZlcnQgdG8gYSBzdHJpbmcgZm9yIGRpc3BsYXkuXG4gICAgICAgIEBtZW1iZXJvZiBDRGF0ZVxuICAgICAgICBAcmV0dXJuIHtzdHJpbmd9IFRoaXMgZGF0ZSBhcyBhIHN0cmluZy4gKi9cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAodGhpcy55ZWFyKCkgPCAwID8gJy0nIDogJycpICsgcGFkKE1hdGguYWJzKHRoaXMueWVhcigpKSwgNCkgK1xuICAgICAgICAgICAgJy0nICsgcGFkKHRoaXMubW9udGgoKSwgMikgKyAnLScgKyBwYWQodGhpcy5kYXkoKSwgMik7XG4gICAgfVxufSk7XG5cbi8qKiBCYXNpYyBmdW5jdGlvbmFsaXR5IGZvciBhbGwgY2FsZW5kYXJzLlxuICAgIE90aGVyIGNhbGVuZGFycyBzaG91bGQgZXh0ZW5kIHRoaXM6XG4gICAgPHByZT5PdGhlckNhbGVuZGFyLnByb3RvdHlwZSA9IG5ldyBCYXNlQ2FsZW5kYXI7PC9wcmU+XG4gICAgQGNsYXNzIEJhc2VDYWxlbmRhciAqL1xuZnVuY3Rpb24gQmFzZUNhbGVuZGFyKCkge1xuICAgIHRoaXMuc2hvcnRZZWFyQ3V0b2ZmID0gJysxMCc7XG59XG5cbmFzc2lnbihCYXNlQ2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgX3ZhbGlkYXRlTGV2ZWw6IDAsIC8vIFwiU3RhY2tcIiB0byB0dXJuIHZhbGlkYXRpb24gb24vb2ZmXG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUgd2l0aGluIHRoaXMgY2FsZW5kYXIgLSB0b2RheSBpZiBubyBwYXJhbWV0ZXJzIGdpdmVuLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGR1cGxpY2F0ZSBvciB0aGUgeWVhciBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCBmb3IgdGhlIGRhdGUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IGZvciB0aGUgZGF0ZS5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBuZXcgZGF0ZS5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBub3QgYSB2YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbmV3RGF0ZTogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICBpZiAoeWVhciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2RheSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ZWFyLnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksXG4gICAgICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZERhdGUgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkRGF0ZSk7XG4gICAgICAgICAgICBkYXkgPSB5ZWFyLmRheSgpO1xuICAgICAgICAgICAgbW9udGggPSB5ZWFyLm1vbnRoKCk7XG4gICAgICAgICAgICB5ZWFyID0geWVhci55ZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDRGF0ZSh0aGlzLCB5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZvciB0b2RheS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVG9kYXkncyBkYXRlLiAqL1xuICAgIHRvZGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbUpTRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBlcG9jaCBkZXNpZ25hdG9yIGZvciB0aGlzIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjdXJyZW50IGVwb2NoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGVwb2NoOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5fdmFsaWRhdGUoeWVhciwgdGhpcy5taW5Nb250aCwgdGhpcy5taW5EYXksXG4gICAgICAgICAgICBfZXhwb3J0cy5sb2NhbC5pbnZhbGlkWWVhciB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWRZZWFyKTtcbiAgICAgICAgcmV0dXJuIChkYXRlLnllYXIoKSA8IDAgPyB0aGlzLmxvY2FsLmVwb2Noc1swXSA6IHRoaXMubG9jYWwuZXBvY2hzWzFdKTtcbiAgICB9LFxuXG4gICAgLyoqIEZvcm1hdCB0aGUgeWVhciwgaWYgbm90IGEgc2ltcGxlIHNlcXVlbnRpYWwgbnVtYmVyXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZm9ybWF0IG9yIHRoZSB5ZWFyIHRvIGZvcm1hdC5cbiAgICAgICAgQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHllYXIuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgZm9ybWF0WWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LFxuICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZFllYXIgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiAoZGF0ZS55ZWFyKCkgPCAwID8gJy0nIDogJycpICsgcGFkKE1hdGguYWJzKGRhdGUueWVhcigpKSwgNClcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBudW1iZXIgb2YgbW9udGhzIGluIGEgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBtb250aHMuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbW9udGhzSW5ZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHllYXIsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LFxuICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZFllYXIgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkWWVhcik7XG4gICAgICAgIHJldHVybiAxMjtcbiAgICB9LFxuXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgbW9udGgncyBvcmRpbmFsIHBvc2l0aW9uIHdpdGhpbiB0aGUgeWVhciAtXG4gICAgICAgIGZvciB0aG9zZSBjYWxlbmRhcnMgdGhhdCBkb24ndCBzdGFydCBhdCBtb250aCAxIVxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGV4YW1pbmUgb3IgdGhlIHllYXIgdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIG1vbnRoIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBvcmRpbmFsIHBvc2l0aW9uLCBzdGFydGluZyBmcm9tIDxjb2RlPm1pbk1vbnRoPC9jb2RlPi5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIHllYXIvbW9udGggb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBtb250aE9mWWVhcjogZnVuY3Rpb24oeWVhciwgbW9udGgpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgdGhpcy5taW5EYXksXG4gICAgICAgICAgICBfZXhwb3J0cy5sb2NhbC5pbnZhbGlkTW9udGggfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkTW9udGgpO1xuICAgICAgICByZXR1cm4gKGRhdGUubW9udGgoKSArIHRoaXMubW9udGhzSW5ZZWFyKGRhdGUpIC0gdGhpcy5maXJzdE1vbnRoKSAlXG4gICAgICAgICAgICB0aGlzLm1vbnRoc0luWWVhcihkYXRlKSArIHRoaXMubWluTW9udGg7XG4gICAgfSxcblxuICAgIC8qKiBDYWxjdWxhdGUgYWN0dWFsIG1vbnRoIGZyb20gb3JkaW5hbCBwb3NpdGlvbiwgc3RhcnRpbmcgZnJvbSBtaW5Nb250aC5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7bnVtYmVyfSBUaGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gb3JkIHtudW1iZXJ9IFRoZSBtb250aCdzIG9yZGluYWwgcG9zaXRpb24uXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG1vbnRoJ3MgbnVtYmVyLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhci9tb250aC4gKi9cbiAgICBmcm9tTW9udGhPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG9yZCkge1xuICAgICAgICB2YXIgbSA9IChvcmQgKyB0aGlzLmZpcnN0TW9udGggLSAyICogdGhpcy5taW5Nb250aCkgJVxuICAgICAgICAgICAgdGhpcy5tb250aHNJblllYXIoeWVhcikgKyB0aGlzLm1pbk1vbnRoO1xuICAgICAgICB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtLCB0aGlzLm1pbkRheSxcbiAgICAgICAgICAgIF9leHBvcnRzLmxvY2FsLmludmFsaWRNb250aCB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWRNb250aCk7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgeWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJblllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSxcbiAgICAgICAgICAgIF9leHBvcnRzLmxvY2FsLmludmFsaWRZZWFyIHx8IF9leHBvcnRzLnJlZ2lvbmFsT3B0aW9uc1snJ10uaW52YWxpZFllYXIpO1xuICAgICAgICByZXR1cm4gKHRoaXMubGVhcFllYXIoZGF0ZSkgPyAzNjYgOiAzNjUpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIGRheSBvZiB0aGUgeWVhciBmb3IgYSBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvbnZlcnQgb3IgdGhlIHllYXIgdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGRheSBvZiB0aGUgeWVhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBkYXlPZlllYXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LFxuICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZERhdGUgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSkQoKSAtIHRoaXMubmV3RGF0ZShkYXRlLnllYXIoKSxcbiAgICAgICAgICAgIHRoaXMuZnJvbU1vbnRoT2ZZZWFyKGRhdGUueWVhcigpLCB0aGlzLm1pbk1vbnRoKSwgdGhpcy5taW5EYXkpLnRvSkQoKSArIDE7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBkYXlzLiAqL1xuICAgIGRheXNJbldlZWs6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gNztcbiAgICB9LFxuXG4gICAgLyoqIFJldHJpZXZlIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIGEgZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkYXkgb2YgdGhlIHdlZWs6IDAgdG8gbnVtYmVyIG9mIGRheXMgLSAxLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheU9mV2VlazogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksXG4gICAgICAgICAgICBfZXhwb3J0cy5sb2NhbC5pbnZhbGlkRGF0ZSB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWREYXRlKTtcbiAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHRoaXMudG9KRChkYXRlKSkgKyAyKSAlIHRoaXMuZGF5c0luV2VlaygpO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhYm91dCBhIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIHllYXIge0NEYXRlfG51bWJlcn0gVGhlIGRhdGUgdG8gZXhhbWluZSBvciB0aGUgeWVhciB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIFtkYXldIHtudW1iZXJ9IFRoZSBkYXkgdG8gZXhhbWluZS5cbiAgICAgICAgQHJldHVybiB7b2JqZWN0fSBBZGRpdGlvbmFsIGluZm9ybWF0aW9uIC0gY29udGVudHMgZGVwZW5kcyBvbiBjYWxlbmRhci5cbiAgICAgICAgQHRocm93cyBFcnJvciBpZiBhbiBpbnZhbGlkIGRhdGUgb3IgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBleHRyYUluZm86IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoeWVhciwgbW9udGgsIGRheSxcbiAgICAgICAgICAgIF9leHBvcnRzLmxvY2FsLmludmFsaWREYXRlIHx8IF9leHBvcnRzLnJlZ2lvbmFsT3B0aW9uc1snJ10uaW52YWxpZERhdGUpO1xuICAgICAgICByZXR1cm4ge307XG4gICAgfSxcblxuICAgIC8qKiBBZGQgcGVyaW9kKHMpIHRvIGEgZGF0ZS5cbiAgICAgICAgQ2F0ZXIgZm9yIG5vIHllYXIgemVyby5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0gZGF0ZSB7Q0RhdGV9IFRoZSBzdGFydGluZyBkYXRlLlxuICAgICAgICBAcGFyYW0gb2Zmc2V0IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgcGVyaW9kcyB0byBhZGp1c3QgYnkuXG4gICAgICAgIEBwYXJhbSBwZXJpb2Qge3N0cmluZ30gT25lIG9mICd5JyBmb3IgeWVhciwgJ20nIGZvciBtb250aCwgJ3cnIGZvciB3ZWVrLCAnZCcgZm9yIGRheS5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSB1cGRhdGVkIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYSBkaWZmZXJlbnQgY2FsZW5kYXIgdXNlZC4gKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKGRhdGUsIG9mZnNldCwgcGVyaW9kKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKGRhdGUsIHRoaXMubWluTW9udGgsIHRoaXMubWluRGF5LFxuICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZERhdGUgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb3JyZWN0QWRkKGRhdGUsIHRoaXMuX2FkZChkYXRlLCBvZmZzZXQsIHBlcmlvZCksIG9mZnNldCwgcGVyaW9kKTtcbiAgICB9LFxuXG4gICAgLyoqIEFkZCBwZXJpb2QocykgdG8gYSBkYXRlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwcml2YXRlXG4gICAgICAgIEBwYXJhbSBkYXRlIHtDRGF0ZX0gVGhlIHN0YXJ0aW5nIGRhdGUuXG4gICAgICAgIEBwYXJhbSBvZmZzZXQge251bWJlcn0gVGhlIG51bWJlciBvZiBwZXJpb2RzIHRvIGFkanVzdCBieS5cbiAgICAgICAgQHBhcmFtIHBlcmlvZCB7c3RyaW5nfSBPbmUgb2YgJ3knIGZvciB5ZWFyLCAnbScgZm9yIG1vbnRoLCAndycgZm9yIHdlZWssICdkJyBmb3IgZGF5LlxuICAgICAgICBAcmV0dXJuIHtDRGF0ZX0gVGhlIHVwZGF0ZWQgZGF0ZS4gKi9cbiAgICBfYWRkOiBmdW5jdGlvbihkYXRlLCBvZmZzZXQsIHBlcmlvZCkge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZUxldmVsKys7XG4gICAgICAgIGlmIChwZXJpb2QgPT09ICdkJyB8fCBwZXJpb2QgPT09ICd3Jykge1xuICAgICAgICAgICAgdmFyIGpkID0gZGF0ZS50b0pEKCkgKyBvZmZzZXQgKiAocGVyaW9kID09PSAndycgPyB0aGlzLmRheXNJbldlZWsoKSA6IDEpO1xuICAgICAgICAgICAgdmFyIGQgPSBkYXRlLmNhbGVuZGFyKCkuZnJvbUpEKGpkKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlTGV2ZWwtLTtcbiAgICAgICAgICAgIHJldHVybiBbZC55ZWFyKCksIGQubW9udGgoKSwgZC5kYXkoKV07XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB5ID0gZGF0ZS55ZWFyKCkgKyAocGVyaW9kID09PSAneScgPyBvZmZzZXQgOiAwKTtcbiAgICAgICAgICAgIHZhciBtID0gZGF0ZS5tb250aE9mWWVhcigpICsgKHBlcmlvZCA9PT0gJ20nID8gb2Zmc2V0IDogMCk7XG4gICAgICAgICAgICB2YXIgZCA9IGRhdGUuZGF5KCk7Ly8gKyAocGVyaW9kID09PSAnZCcgPyBvZmZzZXQgOiAwKSArXG4gICAgICAgICAgICAgICAgLy8ocGVyaW9kID09PSAndycgPyBvZmZzZXQgKiB0aGlzLmRheXNJbldlZWsoKSA6IDApO1xuICAgICAgICAgICAgdmFyIHJlc3luY1llYXJNb250aCA9IGZ1bmN0aW9uKGNhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG0gPCBjYWxlbmRhci5taW5Nb250aCkge1xuICAgICAgICAgICAgICAgICAgICB5LS07XG4gICAgICAgICAgICAgICAgICAgIG0gKz0gY2FsZW5kYXIubW9udGhzSW5ZZWFyKHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgeWVhck1vbnRocyA9IGNhbGVuZGFyLm1vbnRoc0luWWVhcih5KTtcbiAgICAgICAgICAgICAgICB3aGlsZSAobSA+IHllYXJNb250aHMgLSAxICsgY2FsZW5kYXIubWluTW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgeSsrO1xuICAgICAgICAgICAgICAgICAgICBtIC09IHllYXJNb250aHM7XG4gICAgICAgICAgICAgICAgICAgIHllYXJNb250aHMgPSBjYWxlbmRhci5tb250aHNJblllYXIoeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChwZXJpb2QgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLm1vbnRoKCkgIT09IHRoaXMuZnJvbU1vbnRoT2ZZZWFyKHksIG0pKSB7IC8vIEhlYnJld1xuICAgICAgICAgICAgICAgICAgICBtID0gdGhpcy5uZXdEYXRlKHksIGRhdGUubW9udGgoKSwgdGhpcy5taW5EYXkpLm1vbnRoT2ZZZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG0gPSBNYXRoLm1pbihtLCB0aGlzLm1vbnRoc0luWWVhcih5KSk7XG4gICAgICAgICAgICAgICAgZCA9IE1hdGgubWluKGQsIHRoaXMuZGF5c0luTW9udGgoeSwgdGhpcy5mcm9tTW9udGhPZlllYXIoeSwgbSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBlcmlvZCA9PT0gJ20nKSB7XG4gICAgICAgICAgICAgICAgcmVzeW5jWWVhck1vbnRoKHRoaXMpO1xuICAgICAgICAgICAgICAgIGQgPSBNYXRoLm1pbihkLCB0aGlzLmRheXNJbk1vbnRoKHksIHRoaXMuZnJvbU1vbnRoT2ZZZWFyKHksIG0pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgeW1kID0gW3ksIHRoaXMuZnJvbU1vbnRoT2ZZZWFyKHksIG0pLCBkXTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlTGV2ZWwtLTtcbiAgICAgICAgICAgIHJldHVybiB5bWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlTGV2ZWwtLTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIENvcnJlY3QgYSBjYW5kaWRhdGUgZGF0ZSBhZnRlciBhZGRpbmcgcGVyaW9kKHMpIHRvIGEgZGF0ZS5cbiAgICAgICAgSGFuZGxlIG5vIHllYXIgemVybyBpZiBuZWNlc3NhcnkuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHByaXZhdGVcbiAgICAgICAgQHBhcmFtIGRhdGUge0NEYXRlfSBUaGUgc3RhcnRpbmcgZGF0ZS5cbiAgICAgICAgQHBhcmFtIHltZCB7bnVtYmVyW119IFRoZSBhZGRlZCBkYXRlLlxuICAgICAgICBAcGFyYW0gb2Zmc2V0IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgcGVyaW9kcyB0byBhZGp1c3QgYnkuXG4gICAgICAgIEBwYXJhbSBwZXJpb2Qge3N0cmluZ30gT25lIG9mICd5JyBmb3IgeWVhciwgJ20nIGZvciBtb250aCwgJ3cnIGZvciB3ZWVrLCAnZCcgZm9yIGRheS5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSB1cGRhdGVkIGRhdGUuICovXG4gICAgX2NvcnJlY3RBZGQ6IGZ1bmN0aW9uKGRhdGUsIHltZCwgb2Zmc2V0LCBwZXJpb2QpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1llYXJaZXJvICYmIChwZXJpb2QgPT09ICd5JyB8fCBwZXJpb2QgPT09ICdtJykpIHtcbiAgICAgICAgICAgIGlmICh5bWRbMF0gPT09IDAgfHwgLy8gSW4geWVhciB6ZXJvXG4gICAgICAgICAgICAgICAgICAgIChkYXRlLnllYXIoKSA+IDApICE9PSAoeW1kWzBdID4gMCkpIHsgLy8gQ3Jvc3NlZCB5ZWFyIHplcm9cbiAgICAgICAgICAgICAgICB2YXIgYWRqID0ge3k6IFsxLCAxLCAneSddLCBtOiBbMSwgdGhpcy5tb250aHNJblllYXIoLTEpLCAnbSddLFxuICAgICAgICAgICAgICAgICAgICB3OiBbdGhpcy5kYXlzSW5XZWVrKCksIHRoaXMuZGF5c0luWWVhcigtMSksICdkJ10sXG4gICAgICAgICAgICAgICAgICAgIGQ6IFsxLCB0aGlzLmRheXNJblllYXIoLTEpLCAnZCddfVtwZXJpb2RdO1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAob2Zmc2V0IDwgMCA/IC0xIDogKzEpO1xuICAgICAgICAgICAgICAgIHltZCA9IHRoaXMuX2FkZChkYXRlLCBvZmZzZXQgKiBhZGpbMF0gKyBkaXIgKiBhZGpbMV0sIGFkalsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGUuZGF0ZSh5bWRbMF0sIHltZFsxXSwgeW1kWzJdKTtcbiAgICB9LFxuXG4gICAgLyoqIFNldCBhIHBvcnRpb24gb2YgdGhlIGRhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIGRhdGUge0NEYXRlfSBUaGUgc3RhcnRpbmcgZGF0ZS5cbiAgICAgICAgQHBhcmFtIHZhbHVlIHtudW1iZXJ9IFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBwZXJpb2QuXG4gICAgICAgIEBwYXJhbSBwZXJpb2Qge3N0cmluZ30gT25lIG9mICd5JyBmb3IgeWVhciwgJ20nIGZvciBtb250aCwgJ2QnIGZvciBkYXkuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgdXBkYXRlZCBkYXRlLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHNldDogZnVuY3Rpb24oZGF0ZSwgdmFsdWUsIHBlcmlvZCkge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZShkYXRlLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSxcbiAgICAgICAgICAgIF9leHBvcnRzLmxvY2FsLmludmFsaWREYXRlIHx8IF9leHBvcnRzLnJlZ2lvbmFsT3B0aW9uc1snJ10uaW52YWxpZERhdGUpO1xuICAgICAgICB2YXIgeSA9IChwZXJpb2QgPT09ICd5JyA/IHZhbHVlIDogZGF0ZS55ZWFyKCkpO1xuICAgICAgICB2YXIgbSA9IChwZXJpb2QgPT09ICdtJyA/IHZhbHVlIDogZGF0ZS5tb250aCgpKTtcbiAgICAgICAgdmFyIGQgPSAocGVyaW9kID09PSAnZCcgPyB2YWx1ZSA6IGRhdGUuZGF5KCkpO1xuICAgICAgICBpZiAocGVyaW9kID09PSAneScgfHwgcGVyaW9kID09PSAnbScpIHtcbiAgICAgICAgICAgIGQgPSBNYXRoLm1pbihkLCB0aGlzLmRheXNJbk1vbnRoKHksIG0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZS5kYXRlKHksIG0sIGQpO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgYSBkYXRlIGlzIHZhbGlkIGZvciB0aGlzIGNhbGVuZGFyLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtudW1iZXJ9IFRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBtb250aCB7bnVtYmVyfSBUaGUgbW9udGggdG8gZXhhbWluZS5cbiAgICAgICAgQHBhcmFtIGRheSB7bnVtYmVyfSBUaGUgZGF5IHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgdmFsaWQgZGF0ZSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC4gKi9cbiAgICBpc1ZhbGlkOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlTGV2ZWwrKztcbiAgICAgICAgdmFyIHZhbGlkID0gKHRoaXMuaGFzWWVhclplcm8gfHwgeWVhciAhPT0gMCk7XG4gICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIHRoaXMubWluRGF5KTtcbiAgICAgICAgICAgIHZhbGlkID0gKG1vbnRoID49IHRoaXMubWluTW9udGggJiYgbW9udGggLSB0aGlzLm1pbk1vbnRoIDwgdGhpcy5tb250aHNJblllYXIoZGF0ZSkpICYmXG4gICAgICAgICAgICAgICAgKGRheSA+PSB0aGlzLm1pbkRheSAmJiBkYXkgLSB0aGlzLm1pbkRheSA8IHRoaXMuZGF5c0luTW9udGgoZGF0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlTGV2ZWwtLTtcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH0sXG5cbiAgICAvKiogQ29udmVydCB0aGUgZGF0ZSB0byBhIHN0YW5kYXJkIChHcmVnb3JpYW4pIEphdmFTY3JpcHQgRGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtEYXRlfSBUaGUgZXF1aXZhbGVudCBKYXZhU2NyaXB0IGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KU0RhdGU6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LFxuICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZERhdGUgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHJldHVybiBfZXhwb3J0cy5pbnN0YW5jZSgpLmZyb21KRCh0aGlzLnRvSkQoZGF0ZSkpLnRvSlNEYXRlKCk7XG4gICAgfSxcblxuICAgIC8qKiBDb252ZXJ0IHRoZSBkYXRlIGZyb20gYSBzdGFuZGFyZCAoR3JlZ29yaWFuKSBKYXZhU2NyaXB0IERhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIGpzZCB7RGF0ZX0gVGhlIEphdmFTY3JpcHQgZGF0ZS5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGNhbGVuZGFyIGRhdGUuICovXG4gICAgZnJvbUpTRGF0ZTogZnVuY3Rpb24oanNkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyb21KRChfZXhwb3J0cy5pbnN0YW5jZSgpLmZyb21KU0RhdGUoanNkKS50b0pEKCkpO1xuICAgIH0sXG5cbiAgICAvKiogQ2hlY2sgdGhhdCBhIGNhbmRpZGF0ZSBkYXRlIGlzIGZyb20gdGhlIHNhbWUgY2FsZW5kYXIgYW5kIGlzIHZhbGlkLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwcml2YXRlXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIHZhbGlkYXRlIG9yIHRoZSB5ZWFyIHRvIHZhbGlkYXRlLlxuICAgICAgICBAcGFyYW0gW21vbnRoXSB7bnVtYmVyfSBUaGUgbW9udGggdG8gdmFsaWRhdGUuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIHZhbGlkYXRlLlxuICAgICAgICBAcGFyYW0gZXJyb3Ige3N0cmluZ30gUnJyb3IgbWVzc2FnZSBpZiBpbnZhbGlkLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGRpZmZlcmVudCBjYWxlbmRhcnMgdXNlZCBvciBpbnZhbGlkIGRhdGUuICovXG4gICAgX3ZhbGlkYXRlOiBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5LCBlcnJvcikge1xuICAgICAgICBpZiAoeWVhci55ZWFyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGVMZXZlbCA9PT0gMCAmJiB0aGlzLm5hbWUgIT09IHllYXIuY2FsZW5kYXIoKS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgKF9leHBvcnRzLmxvY2FsLmRpZmZlcmVudENhbGVuZGFycyB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmRpZmZlcmVudENhbGVuZGFycykuXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2UoL1xcezBcXH0vLCB0aGlzLmxvY2FsLm5hbWUpLnJlcGxhY2UoL1xcezFcXH0vLCB5ZWFyLmNhbGVuZGFyKCkubG9jYWwubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWVhcjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVMZXZlbCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlTGV2ZWwgPT09IDEgJiYgIXRoaXMuaXNWYWxpZCh5ZWFyLCBtb250aCwgZGF5KSkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yLnJlcGxhY2UoL1xcezBcXH0vLCB0aGlzLmxvY2FsLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUxldmVsLS07XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVMZXZlbC0tO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKiogSW1wbGVtZW50YXRpb24gb2YgdGhlIFByb2xlcHRpYyBHcmVnb3JpYW4gQ2FsZW5kYXIuXG4gICAgU2VlIDxhIGhyZWY9XCI6aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HcmVnb3JpYW5fY2FsZW5kYXJcIj5odHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dyZWdvcmlhbl9jYWxlbmRhcjwvYT5cbiAgICBhbmQgPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUHJvbGVwdGljX0dyZWdvcmlhbl9jYWxlbmRhclwiPmh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUHJvbGVwdGljX0dyZWdvcmlhbl9jYWxlbmRhcjwvYT4uXG4gICAgQGNsYXNzIEdyZWdvcmlhbkNhbGVuZGFyXG4gICAgQGF1Z21lbnRzIEJhc2VDYWxlbmRhclxuICAgIEBwYXJhbSBbbGFuZ3VhZ2U9JyddIHtzdHJpbmd9IFRoZSBsYW5ndWFnZSBjb2RlIChkZWZhdWx0IEVuZ2xpc2gpIGZvciBsb2NhbGlzYXRpb24uICovXG5mdW5jdGlvbiBHcmVnb3JpYW5DYWxlbmRhcihsYW5ndWFnZSkge1xuICAgIHRoaXMubG9jYWwgPSB0aGlzLnJlZ2lvbmFsT3B0aW9uc1tsYW5ndWFnZV0gfHwgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddO1xufVxuXG5HcmVnb3JpYW5DYWxlbmRhci5wcm90b3R5cGUgPSBuZXcgQmFzZUNhbGVuZGFyO1xuXG5hc3NpZ24oR3JlZ29yaWFuQ2FsZW5kYXIucHJvdG90eXBlLCB7XG4gICAgLyoqIFRoZSBjYWxlbmRhciBuYW1lLlxuICAgICAgICBAbWVtYmVyb2YgR3JlZ29yaWFuQ2FsZW5kYXIgKi9cbiAgICBuYW1lOiAnR3JlZ29yaWFuJyxcbiAgICAgLyoqIEp1bGlhbiBkYXRlIG9mIHN0YXJ0IG9mIEdyZWdvcmlhbiBlcG9jaDogMSBKYW51YXJ5IDAwMDEgQ0UuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhciAqL1xuICAgIGpkRXBvY2g6IDE3MjE0MjUuNSxcbiAgICAgLyoqIERheXMgcGVyIG1vbnRoIGluIGEgY29tbW9uIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhciAqL1xuICAgIGRheXNQZXJNb250aDogWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdLFxuICAgICAvKiogPGNvZGU+dHJ1ZTwvY29kZT4gaWYgaGFzIGEgeWVhciB6ZXJvLCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAbWVtYmVyb2YgR3JlZ29yaWFuQ2FsZW5kYXIgKi9cbiAgICBoYXNZZWFyWmVybzogZmFsc2UsXG4gICAgLyoqIFRoZSBtaW5pbXVtIG1vbnRoIG51bWJlci5cbiAgICAgICAgQG1lbWJlcm9mIEdyZWdvcmlhbkNhbGVuZGFyICovXG4gICAgbWluTW9udGg6IDEsXG4gICAgLyoqIFRoZSBmaXJzdCBtb250aCBpbiB0aGUgeWVhci5cbiAgICAgICAgQG1lbWJlcm9mIEdyZWdvcmlhbkNhbGVuZGFyICovXG4gICAgZmlyc3RNb250aDogMSxcbiAgICAgLyoqIFRoZSBtaW5pbXVtIGRheSBudW1iZXIuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhciAqL1xuICAgIG1pbkRheTogMSxcblxuICAgIC8qKiBMb2NhbGlzYXRpb25zIGZvciB0aGUgcGx1Z2luLlxuICAgICAgICBFbnRyaWVzIGFyZSBvYmplY3RzIGluZGV4ZWQgYnkgdGhlIGxhbmd1YWdlIGNvZGUgKCcnIGJlaW5nIHRoZSBkZWZhdWx0IFVTL0VuZ2xpc2gpLlxuICAgICAgICBFYWNoIG9iamVjdCBoYXMgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzLlxuICAgICAgICBAbWVtYmVyb2YgR3JlZ29yaWFuQ2FsZW5kYXJcbiAgICAgICAgQHByb3BlcnR5IG5hbWUge3N0cmluZ30gVGhlIGNhbGVuZGFyIG5hbWUuXG4gICAgICAgIEBwcm9wZXJ0eSBlcG9jaHMge3N0cmluZ1tdfSBUaGUgZXBvY2ggbmFtZXMuXG4gICAgICAgIEBwcm9wZXJ0eSBtb250aE5hbWVzIHtzdHJpbmdbXX0gVGhlIGxvbmcgbmFtZXMgb2YgdGhlIG1vbnRocyBvZiB0aGUgeWVhci5cbiAgICAgICAgQHByb3BlcnR5IG1vbnRoTmFtZXNTaG9ydCB7c3RyaW5nW119IFRoZSBzaG9ydCBuYW1lcyBvZiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLlxuICAgICAgICBAcHJvcGVydHkgZGF5TmFtZXMge3N0cmluZ1tdfSBUaGUgbG9uZyBuYW1lcyBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgICAgQHByb3BlcnR5IGRheU5hbWVzU2hvcnQge3N0cmluZ1tdfSBUaGUgc2hvcnQgbmFtZXMgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICAgIEBwcm9wZXJ0eSBkYXlOYW1lc01pbiB7c3RyaW5nW119IFRoZSBtaW5pbWFsIG5hbWVzIG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAgICBAcHJvcGVydHkgZGF0ZUZvcm1hdCB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgZm9yIHRoaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgU2VlIHRoZSBvcHRpb25zIG9uIDxhIGhyZWY9XCJCYXNlQ2FsZW5kYXIuaHRtbCNmb3JtYXREYXRlXCI+PGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT48L2E+IGZvciBkZXRhaWxzLlxuICAgICAgICBAcHJvcGVydHkgZmlyc3REYXkge251bWJlcn0gVGhlIG51bWJlciBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBzdGFydGluZyBhdCAwLlxuICAgICAgICBAcHJvcGVydHkgaXNSVEwge251bWJlcn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBsb2NhbGlzYXRpb24gcmVhZHMgcmlnaHQtdG8tbGVmdC4gKi9cbiAgICByZWdpb25hbE9wdGlvbnM6IHsgLy8gTG9jYWxpc2F0aW9uc1xuICAgICAgICAnJzoge1xuICAgICAgICAgICAgbmFtZTogJ0dyZWdvcmlhbicsXG4gICAgICAgICAgICBlcG9jaHM6IFsnQkNFJywgJ0NFJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuICAgICAgICAgICAgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgICAgICAgICAgIGRheU5hbWVzOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICBkYXlOYW1lc1Nob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgICAgICAgICAgIGRpZ2l0czogbnVsbCxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdtbS9kZC95eXl5JyxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAwLFxuICAgICAgICAgICAgaXNSVEw6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGRhdGUgaXMgaW4gYSBsZWFwIHllYXIuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgaXMgYSBsZWFwIHllYXIsIDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCB5ZWFyIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgbGVhcFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCB0aGlzLm1pbk1vbnRoLCB0aGlzLm1pbkRheSxcbiAgICAgICAgICAgIF9leHBvcnRzLmxvY2FsLmludmFsaWRZZWFyIHx8IF9leHBvcnRzLnJlZ2lvbmFsT3B0aW9uc1snJ10uaW52YWxpZFllYXIpO1xuICAgICAgICB2YXIgeWVhciA9IGRhdGUueWVhcigpICsgKGRhdGUueWVhcigpIDwgMCA/IDEgOiAwKTsgLy8gTm8geWVhciB6ZXJvXG4gICAgICAgIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiAoeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwKTtcbiAgICB9LFxuXG4gICAgLyoqIERldGVybWluZSB0aGUgd2VlayBvZiB0aGUgeWVhciBmb3IgYSBkYXRlIC0gSVNPIDg2MDEuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSB3ZWVrIG9mIHRoZSB5ZWFyLCBzdGFydGluZyBmcm9tIDEuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgd2Vla09mWWVhcjogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICAvLyBGaW5kIFRodXJzZGF5IG9mIHRoaXMgd2VlayBzdGFydGluZyBvbiBNb25kYXlcbiAgICAgICAgdmFyIGNoZWNrRGF0ZSA9IHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgY2hlY2tEYXRlLmFkZCg0IC0gKGNoZWNrRGF0ZS5kYXlPZldlZWsoKSB8fCA3KSwgJ2QnKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoZWNrRGF0ZS5kYXlPZlllYXIoKSAtIDEpIC8gNykgKyAxO1xuICAgIH0sXG5cbiAgICAvKiogUmV0cmlldmUgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGguXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIG9mIHRoZSBtb250aC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoLlxuICAgICAgICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIG1vbnRoLlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgbW9udGgveWVhciBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIGRheXNJbk1vbnRoOiBmdW5jdGlvbih5ZWFyLCBtb250aCkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCB0aGlzLm1pbkRheSxcbiAgICAgICAgICAgIF9leHBvcnRzLmxvY2FsLmludmFsaWRNb250aCB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWRNb250aCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRheXNQZXJNb250aFtkYXRlLm1vbnRoKCkgLSAxXSArXG4gICAgICAgICAgICAoZGF0ZS5tb250aCgpID09PSAyICYmIHRoaXMubGVhcFllYXIoZGF0ZS55ZWFyKCkpID8gMSA6IDApO1xuICAgIH0sXG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBkYXRlIGlzIGEgd2VlayBkYXkuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBleGFtaW5lIG9yIHRoZSB5ZWFyIHRvIGV4YW1pbmUuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBleGFtaW5lLlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBleGFtaW5lLlxuICAgICAgICBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIHdlZWsgZGF5LCA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuICAgICAgICBAdGhyb3dzIEVycm9yIGlmIGFuIGludmFsaWQgZGF0ZSBvciBhIGRpZmZlcmVudCBjYWxlbmRhciB1c2VkLiAqL1xuICAgIHdlZWtEYXk6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF5KSB8fCA3KSA8IDY7XG4gICAgfSxcblxuICAgIC8qKiBSZXRyaWV2ZSB0aGUgSnVsaWFuIGRhdGUgZXF1aXZhbGVudCBmb3IgdGhpcyBkYXRlLFxuICAgICAgICBpLmUuIGRheXMgc2luY2UgSmFudWFyeSAxLCA0NzEzIEJDRSBHcmVlbndpY2ggbm9vbi5cbiAgICAgICAgQG1lbWJlcm9mIEdyZWdvcmlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSB5ZWFyIHtDRGF0ZXxudW1iZXJ9IFRoZSBkYXRlIHRvIGNvbnZlcnQgb3IgdGhlIHllYXIgdG8gY29udmVydC5cbiAgICAgICAgQHBhcmFtIFttb250aF0ge251bWJlcn0gVGhlIG1vbnRoIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbZGF5XSB7bnVtYmVyfSBUaGUgZGF5IHRvIGNvbnZlcnQuXG4gICAgICAgIEByZXR1cm4ge251bWJlcn0gVGhlIGVxdWl2YWxlbnQgSnVsaWFuIGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KRDogZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuX3ZhbGlkYXRlKHllYXIsIG1vbnRoLCBkYXksXG4gICAgICAgICAgICBfZXhwb3J0cy5sb2NhbC5pbnZhbGlkRGF0ZSB8fCBfZXhwb3J0cy5yZWdpb25hbE9wdGlvbnNbJyddLmludmFsaWREYXRlKTtcbiAgICAgICAgeWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICBtb250aCA9IGRhdGUubW9udGgoKTtcbiAgICAgICAgZGF5ID0gZGF0ZS5kYXkoKTtcbiAgICAgICAgaWYgKHllYXIgPCAwKSB7IHllYXIrKzsgfSAvLyBObyB5ZWFyIHplcm9cbiAgICAgICAgLy8gSmVhbiBNZWV1cyBhbGdvcml0aG0sIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiwgMTk5MVxuICAgICAgICBpZiAobW9udGggPCAzKSB7XG4gICAgICAgICAgICBtb250aCArPSAxMjtcbiAgICAgICAgICAgIHllYXItLTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYSA9IE1hdGguZmxvb3IoeWVhciAvIDEwMCk7XG4gICAgICAgIHZhciBiID0gMiAtIGEgKyBNYXRoLmZsb29yKGEgLyA0KTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoMzY1LjI1ICogKHllYXIgKyA0NzE2KSkgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcigzMC42MDAxICogKG1vbnRoICsgMSkpICsgZGF5ICsgYiAtIDE1MjQuNTtcbiAgICB9LFxuXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBkYXRlIGZyb20gYSBKdWxpYW4gZGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIEdyZWdvcmlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqZCB7bnVtYmVyfSBUaGUgSnVsaWFuIGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpEOiBmdW5jdGlvbihqZCkge1xuICAgICAgICAvLyBKZWFuIE1lZXVzIGFsZ29yaXRobSwgXCJBc3Ryb25vbWljYWwgQWxnb3JpdGhtc1wiLCAxOTkxXG4gICAgICAgIHZhciB6ID0gTWF0aC5mbG9vcihqZCArIDAuNSk7XG4gICAgICAgIHZhciBhID0gTWF0aC5mbG9vcigoeiAtIDE4NjcyMTYuMjUpIC8gMzY1MjQuMjUpO1xuICAgICAgICBhID0geiArIDEgKyBhIC0gTWF0aC5mbG9vcihhIC8gNCk7XG4gICAgICAgIHZhciBiID0gYSArIDE1MjQ7XG4gICAgICAgIHZhciBjID0gTWF0aC5mbG9vcigoYiAtIDEyMi4xKSAvIDM2NS4yNSk7XG4gICAgICAgIHZhciBkID0gTWF0aC5mbG9vcigzNjUuMjUgKiBjKTtcbiAgICAgICAgdmFyIGUgPSBNYXRoLmZsb29yKChiIC0gZCkgLyAzMC42MDAxKTtcbiAgICAgICAgdmFyIGRheSA9IGIgLSBkIC0gTWF0aC5mbG9vcihlICogMzAuNjAwMSk7XG4gICAgICAgIHZhciBtb250aCA9IGUgLSAoZSA+IDEzLjUgPyAxMyA6IDEpO1xuICAgICAgICB2YXIgeWVhciA9IGMgLSAobW9udGggPiAyLjUgPyA0NzE2IDogNDcxNSk7XG4gICAgICAgIGlmICh5ZWFyIDw9IDApIHsgeWVhci0tOyB9IC8vIE5vIHllYXIgemVyb1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH0sXG5cbiAgICAvKiogQ29udmVydCB0aGlzIGRhdGUgdG8gYSBzdGFuZGFyZCAoR3JlZ29yaWFuKSBKYXZhU2NyaXB0IERhdGUuXG4gICAgICAgIEBtZW1iZXJvZiBHcmVnb3JpYW5DYWxlbmRhclxuICAgICAgICBAcGFyYW0geWVhciB7Q0RhdGV8bnVtYmVyfSBUaGUgZGF0ZSB0byBjb252ZXJ0IG9yIHRoZSB5ZWFyIHRvIGNvbnZlcnQuXG4gICAgICAgIEBwYXJhbSBbbW9udGhdIHtudW1iZXJ9IFRoZSBtb250aCB0byBjb252ZXJ0LlxuICAgICAgICBAcGFyYW0gW2RheV0ge251bWJlcn0gVGhlIGRheSB0byBjb252ZXJ0LlxuICAgICAgICBAcmV0dXJuIHtEYXRlfSBUaGUgZXF1aXZhbGVudCBKYXZhU2NyaXB0IGRhdGUuXG4gICAgICAgIEB0aHJvd3MgRXJyb3IgaWYgYW4gaW52YWxpZCBkYXRlIG9yIGEgZGlmZmVyZW50IGNhbGVuZGFyIHVzZWQuICovXG4gICAgdG9KU0RhdGU6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLl92YWxpZGF0ZSh5ZWFyLCBtb250aCwgZGF5LFxuICAgICAgICAgICAgX2V4cG9ydHMubG9jYWwuaW52YWxpZERhdGUgfHwgX2V4cG9ydHMucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkRGF0ZSk7XG4gICAgICAgIHZhciBqc2QgPSBuZXcgRGF0ZShkYXRlLnllYXIoKSwgZGF0ZS5tb250aCgpIC0gMSwgZGF0ZS5kYXkoKSk7XG4gICAgICAgIGpzZC5zZXRIb3VycygwKTtcbiAgICAgICAganNkLnNldE1pbnV0ZXMoMCk7XG4gICAgICAgIGpzZC5zZXRTZWNvbmRzKDApO1xuICAgICAgICBqc2Quc2V0TWlsbGlzZWNvbmRzKDApO1xuICAgICAgICAvLyBIb3VycyBtYXkgYmUgbm9uLXplcm8gb24gZGF5bGlnaHQgc2F2aW5nIGN1dC1vdmVyOlxuICAgICAgICAvLyA+IDEyIHdoZW4gbWlkbmlnaHQgY2hhbmdlb3ZlciwgYnV0IHRoZW4gY2Fubm90IGdlbmVyYXRlXG4gICAgICAgIC8vIG1pZG5pZ2h0IGRhdGV0aW1lLCBzbyBqdW1wIHRvIDFBTSwgb3RoZXJ3aXNlIHJlc2V0LlxuICAgICAgICBqc2Quc2V0SG91cnMoanNkLmdldEhvdXJzKCkgPiAxMiA/IGpzZC5nZXRIb3VycygpICsgMiA6IDApO1xuICAgICAgICByZXR1cm4ganNkO1xuICAgIH0sXG5cbiAgICAvKiogQ3JlYXRlIGEgbmV3IGRhdGUgZnJvbSBhIHN0YW5kYXJkIChHcmVnb3JpYW4pIEphdmFTY3JpcHQgRGF0ZS5cbiAgICAgICAgQG1lbWJlcm9mIEdyZWdvcmlhbkNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBqc2Qge0RhdGV9IFRoZSBKYXZhU2NyaXB0IGRhdGUgdG8gY29udmVydC5cbiAgICAgICAgQHJldHVybiB7Q0RhdGV9IFRoZSBlcXVpdmFsZW50IGRhdGUuICovXG4gICAgZnJvbUpTRGF0ZTogZnVuY3Rpb24oanNkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0RhdGUoanNkLmdldEZ1bGxZZWFyKCksIGpzZC5nZXRNb250aCgpICsgMSwganNkLmdldERhdGUoKSk7XG4gICAgfVxufSk7XG5cbi8vIFNpbmdsZXRvbiBtYW5hZ2VyXG52YXIgX2V4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IG5ldyBDYWxlbmRhcnMoKTtcblxuLy8gRGF0ZSB0ZW1wbGF0ZVxuX2V4cG9ydHMuY2RhdGUgPSBDRGF0ZTtcblxuLy8gQmFzZSBjYWxlbmRhciB0ZW1wbGF0ZVxuX2V4cG9ydHMuYmFzZUNhbGVuZGFyID0gQmFzZUNhbGVuZGFyO1xuXG4vLyBHcmVnb3JpYW4gY2FsZW5kYXIgaW1wbGVtZW50YXRpb25cbl9leHBvcnRzLmNhbGVuZGFycy5ncmVnb3JpYW4gPSBHcmVnb3JpYW5DYWxlbmRhcjtcblxuIiwiLypcbiAqIFdvcmxkIENhbGVuZGFyc1xuICogaHR0cHM6Ly9naXRodWIuY29tL2FsZXhjam9obnNvbi93b3JsZC1jYWxlbmRhcnNcbiAqXG4gKiBCYXRjaC1jb252ZXJ0ZWQgZnJvbSBrYndvb2QvY2FsZW5kYXJzXG4gKiBNYW55IHRoYW5rcyB0byBLZWl0aCBXb29kIGFuZCBhbGwgb2YgdGhlIGNvbnRyaWJ1dG9ycyB0byB0aGUgb3JpZ2luYWwgcHJvamVjdCFcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG7vu78vKiBodHRwOi8va2VpdGgtd29vZC5uYW1lL2NhbGVuZGFycy5odG1sXG4gICBDYWxlbmRhcnMgZXh0cmFzIGZvciBqUXVlcnkgdjIuMC4yLlxuICAgV3JpdHRlbiBieSBLZWl0aCBXb29kICh3b29kLmtlaXRoe2F0fW9wdHVzbmV0LmNvbS5hdSkgQXVndXN0IDIwMDkuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgbWFpbiA9IHJlcXVpcmUoJy4vbWFpbicpO1xuXG5cbmFzc2lnbihtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ10sIHtcbiAgICBpbnZhbGlkQXJndW1lbnRzOiAnSW52YWxpZCBhcmd1bWVudHMnLFxuICAgIGludmFsaWRGb3JtYXQ6ICdDYW5ub3QgZm9ybWF0IGEgZGF0ZSBmcm9tIGFub3RoZXIgY2FsZW5kYXInLFxuICAgIG1pc3NpbmdOdW1iZXJBdDogJ01pc3NpbmcgbnVtYmVyIGF0IHBvc2l0aW9uIHswfScsXG4gICAgdW5rbm93bk5hbWVBdDogJ1Vua25vd24gbmFtZSBhdCBwb3NpdGlvbiB7MH0nLFxuICAgIHVuZXhwZWN0ZWRMaXRlcmFsQXQ6ICdVbmV4cGVjdGVkIGxpdGVyYWwgYXQgcG9zaXRpb24gezB9JyxcbiAgICB1bmV4cGVjdGVkVGV4dDogJ0FkZGl0aW9uYWwgdGV4dCBmb3VuZCBhdCBlbmQnXG59KTtcbm1haW4ubG9jYWwgPSBtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ107XG5cbmFzc2lnbihtYWluLmNkYXRlLnByb3RvdHlwZSwge1xuXG4gICAgLyoqIEZvcm1hdCB0aGlzIGRhdGUuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIENEYXRlXG4gICAgICAgIEBwYXJhbSBbZm9ybWF0XSB7c3RyaW5nfSBUaGUgZGF0ZSBmb3JtYXQgdG8gdXNlIChzZWUgPGEgaHJlZj1cIkJhc2VDYWxlbmRhci5odG1sI2Zvcm1hdERhdGVcIj48Y29kZT5mb3JtYXREYXRlPC9jb2RlPjwvYT4pLlxuICAgICAgICBAcGFyYW0gW3NldHRpbmdzXSB7b2JqZWN0fSBPcHRpb25zIGZvciB0aGUgPGNvZGU+Zm9ybWF0RGF0ZTwvY29kZT4gZnVuY3Rpb24uXG4gICAgICAgIEByZXR1cm4ge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlLiAqL1xuICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uKGZvcm1hdCwgc2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5mb3JtYXREYXRlKGZvcm1hdCB8fCAnJywgdGhpcywgc2V0dGluZ3MpO1xuICAgIH1cbn0pO1xuXG5hc3NpZ24obWFpbi5iYXNlQ2FsZW5kYXIucHJvdG90eXBlLCB7XG5cbiAgICBVTklYX0VQT0NIOiBtYWluLmluc3RhbmNlKCkubmV3RGF0ZSgxOTcwLCAxLCAxKS50b0pEKCksXG4gICAgU0VDU19QRVJfREFZOiAyNCAqIDYwICogNjAsXG4gICAgVElDS1NfRVBPQ0g6IG1haW4uaW5zdGFuY2UoKS5qZEVwb2NoLCAvLyAxIEphbnVhcnkgMDAwMSBDRVxuICAgIFRJQ0tTX1BFUl9EQVk6IDI0ICogNjAgKiA2MCAqIDEwMDAwMDAwLFxuXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgQVRPTSAoUkZDIDMzMzkvSVNPIDg2MDEpLlxuICAgICAgICBGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5wbHVzLmpzPC9jb2RlPiBtb2R1bGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXIgKi9cbiAgICBBVE9NOiAneXl5eS1tbS1kZCcsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgY29va2llcy5cbiAgICAgICAgRm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGx1cy5qczwvY29kZT4gbW9kdWxlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyICovXG4gICAgQ09PS0lFOiAnRCwgZGQgTSB5eXl5JyxcbiAgICAvKiogRGF0ZSBmb3JtIGZvciBmdWxsIGRhdGUuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIEZVTEw6ICdERCwgTU0gZCwgeXl5eScsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgSVNPIDg2MDEuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIElTT184NjAxOiAneXl5eS1tbS1kZCcsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgSnVsaWFuIGRhdGUuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIEpVTElBTjogJ0onLFxuICAgIC8qKiBEYXRlIGZvcm0gZm9yIFJGQyA4MjIuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIFJGQ184MjI6ICdELCBkIE0geXknLFxuICAgIC8qKiBEYXRlIGZvcm0gZm9yIFJGQyA4NTAuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIFJGQ184NTA6ICdERCwgZGQtTS15eScsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgUkZDIDEwMzYuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIFJGQ18xMDM2OiAnRCwgZCBNIHl5JyxcbiAgICAvKiogRGF0ZSBmb3JtIGZvciBSRkMgMTEyMy5cbiAgICAgICAgRm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGx1cy5qczwvY29kZT4gbW9kdWxlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyICovXG4gICAgUkZDXzExMjM6ICdELCBkIE0geXl5eScsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgUkZDIDI4MjIuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIFJGQ18yODIyOiAnRCwgZCBNIHl5eXknLFxuICAgIC8qKiBEYXRlIGZvcm0gZm9yIFJTUyAoUkZDIDgyMikuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIFJTUzogJ0QsIGQgTSB5eScsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgV2luZG93cyB0aWNrcy5cbiAgICAgICAgRm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGx1cy5qczwvY29kZT4gbW9kdWxlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyICovXG4gICAgVElDS1M6ICchJyxcbiAgICAvKiogRGF0ZSBmb3JtIGZvciBVbml4IHRpbWVzdGFtcC5cbiAgICAgICAgRm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGx1cy5qczwvY29kZT4gbW9kdWxlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyICovXG4gICAgVElNRVNUQU1QOiAnQCcsXG4gICAgLyoqIERhdGUgZm9ybSBmb3IgVzNjIChJU08gODYwMSkuXG4gICAgICAgIEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBsdXMuanM8L2NvZGU+IG1vZHVsZS5cbiAgICAgICAgQG1lbWJlcm9mIEJhc2VDYWxlbmRhciAqL1xuICAgIFczQzogJ3l5eXktbW0tZGQnLFxuXG4gICAgLyoqIEZvcm1hdCBhIGRhdGUgb2JqZWN0IGludG8gYSBzdHJpbmcgdmFsdWUuXG4gICAgICAgIFRoZSBmb3JtYXQgY2FuIGJlIGNvbWJpbmF0aW9ucyBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgICA8dWw+XG4gICAgICAgIDxsaT5kICAtIGRheSBvZiBtb250aCAobm8gbGVhZGluZyB6ZXJvKTwvbGk+XG4gICAgICAgIDxsaT5kZCAtIGRheSBvZiBtb250aCAodHdvIGRpZ2l0KTwvbGk+XG4gICAgICAgIDxsaT5vICAtIGRheSBvZiB5ZWFyIChubyBsZWFkaW5nIHplcm9zKTwvbGk+XG4gICAgICAgIDxsaT5vbyAtIGRheSBvZiB5ZWFyICh0aHJlZSBkaWdpdCk8L2xpPlxuICAgICAgICA8bGk+RCAgLSBkYXkgbmFtZSBzaG9ydDwvbGk+XG4gICAgICAgIDxsaT5ERCAtIGRheSBuYW1lIGxvbmc8L2xpPlxuICAgICAgICA8bGk+dyAgLSB3ZWVrIG9mIHllYXIgKG5vIGxlYWRpbmcgemVybyk8L2xpPlxuICAgICAgICA8bGk+d3cgLSB3ZWVrIG9mIHllYXIgKHR3byBkaWdpdCk8L2xpPlxuICAgICAgICA8bGk+bSAgLSBtb250aCBvZiB5ZWFyIChubyBsZWFkaW5nIHplcm8pPC9saT5cbiAgICAgICAgPGxpPm1tIC0gbW9udGggb2YgeWVhciAodHdvIGRpZ2l0KTwvbGk+XG4gICAgICAgIDxsaT5NICAtIG1vbnRoIG5hbWUgc2hvcnQ8L2xpPlxuICAgICAgICA8bGk+TU0gLSBtb250aCBuYW1lIGxvbmc8L2xpPlxuICAgICAgICA8bGk+eXkgLSB5ZWFyICh0d28gZGlnaXQpPC9saT5cbiAgICAgICAgPGxpPnl5eXkgLSB5ZWFyIChmb3VyIGRpZ2l0KTwvbGk+XG4gICAgICAgIDxsaT5ZWVlZIC0gZm9ybWF0dGVkIHllYXI8L2xpPlxuICAgICAgICA8bGk+SiAgLSBKdWxpYW4gZGF0ZSAoZGF5cyBzaW5jZSBKYW51YXJ5IDEsIDQ3MTMgQkNFIEdyZWVud2ljaCBub29uKTwvbGk+XG4gICAgICAgIDxsaT5AICAtIFVuaXggdGltZXN0YW1wIChzIHNpbmNlIDAxLzAxLzE5NzApPC9saT5cbiAgICAgICAgPGxpPiEgIC0gV2luZG93cyB0aWNrcyAoMTAwbnMgc2luY2UgMDEvMDEvMDAwMSk8L2xpPlxuICAgICAgICA8bGk+Jy4uLicgLSBsaXRlcmFsIHRleHQ8L2xpPlxuICAgICAgICA8bGk+JycgLSBzaW5nbGUgcXVvdGU8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICBGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5wbHVzLmpzPC9jb2RlPiBtb2R1bGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIFtmb3JtYXRdIHtzdHJpbmd9IFRoZSBkZXNpcmVkIGZvcm1hdCBvZiB0aGUgZGF0ZSAoZGVmYXVsdHMgdG8gY2FsZW5kYXIgZm9ybWF0KS5cbiAgICAgICAgQHBhcmFtIGRhdGUge0NEYXRlfSBUaGUgZGF0ZSB2YWx1ZSB0byBmb3JtYXQuXG4gICAgICAgIEBwYXJhbSBbc2V0dGluZ3NdIHtvYmplY3R9IEFkZGl0aW9uIG9wdGlvbnMsIHdob3NlIGF0dHJpYnV0ZXMgaW5jbHVkZTpcbiAgICAgICAgQHByb3BlcnR5IFtkYXlOYW1lc1Nob3J0XSB7c3RyaW5nW119IEFiYnJldmlhdGVkIG5hbWVzIG9mIHRoZSBkYXlzIGZyb20gU3VuZGF5LlxuICAgICAgICBAcHJvcGVydHkgW2RheU5hbWVzXSB7c3RyaW5nW119IE5hbWVzIG9mIHRoZSBkYXlzIGZyb20gU3VuZGF5LlxuICAgICAgICBAcHJvcGVydHkgW21vbnRoTmFtZXNTaG9ydF0ge3N0cmluZ1tdfSBBYmJyZXZpYXRlZCBuYW1lcyBvZiB0aGUgbW9udGhzLlxuICAgICAgICBAcHJvcGVydHkgW21vbnRoTmFtZXNdIHtzdHJpbmdbXX0gTmFtZXMgb2YgdGhlIG1vbnRocy5cbiAgICAgICAgQHByb3BlcnR5IFtjYWxjdWxhdGVXZWVrXSB7Q2FsZW5kYXJzUGlja2VyQ2FsY3VsYXRlV2Vla30gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdlZWsgb2YgdGhlIHllYXIuXG4gICAgICAgIEBwcm9wZXJ0eSBbbG9jYWxOdW1iZXJzPWZhbHNlXSB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gdG8gbG9jYWxpc2UgbnVtYmVycyAoaWYgYXZhaWxhYmxlKSxcbiAgICAgICAgICAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPiB0byB1c2Ugbm9ybWFsIEFyYWJpYyBudW1lcmFscy5cbiAgICAgICAgQHJldHVybiB7c3RyaW5nfSBUaGUgZGF0ZSBpbiB0aGUgYWJvdmUgZm9ybWF0LlxuICAgICAgICBAdGhyb3dzIEVycm9ycyBpZiB0aGUgZGF0ZSBpcyBmcm9tIGEgZGlmZmVyZW50IGNhbGVuZGFyLiAqL1xuICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uKGZvcm1hdCwgZGF0ZSwgc2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IGRhdGU7XG4gICAgICAgICAgICBkYXRlID0gZm9ybWF0O1xuICAgICAgICAgICAgZm9ybWF0ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGUuY2FsZW5kYXIoKSAhPT0gdGhpcykge1xuICAgICAgICAgICAgdGhyb3cgbWFpbi5sb2NhbC5pbnZhbGlkRm9ybWF0IHx8IG1haW4ucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkRm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLmxvY2FsLmRhdGVGb3JtYXQ7XG4gICAgICAgIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG4gICAgICAgIHZhciBkYXlOYW1lc1Nob3J0ID0gc2V0dGluZ3MuZGF5TmFtZXNTaG9ydCB8fCB0aGlzLmxvY2FsLmRheU5hbWVzU2hvcnQ7XG4gICAgICAgIHZhciBkYXlOYW1lcyA9IHNldHRpbmdzLmRheU5hbWVzIHx8IHRoaXMubG9jYWwuZGF5TmFtZXM7XG4gICAgICAgIHZhciBtb250aE51bWJlcnMgPSBzZXR0aW5ncy5tb250aE51bWJlcnMgfHwgdGhpcy5sb2NhbC5tb250aE51bWJlcnM7XG4gICAgICAgIHZhciBtb250aE5hbWVzU2hvcnQgPSBzZXR0aW5ncy5tb250aE5hbWVzU2hvcnQgfHwgdGhpcy5sb2NhbC5tb250aE5hbWVzU2hvcnQ7XG4gICAgICAgIHZhciBtb250aE5hbWVzID0gc2V0dGluZ3MubW9udGhOYW1lcyB8fCB0aGlzLmxvY2FsLm1vbnRoTmFtZXM7XG4gICAgICAgIHZhciBjYWxjdWxhdGVXZWVrID0gc2V0dGluZ3MuY2FsY3VsYXRlV2VlayB8fCB0aGlzLmxvY2FsLmNhbGN1bGF0ZVdlZWs7XG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgYSBmb3JtYXQgY2hhcmFjdGVyIGlzIGRvdWJsZWRcbiAgICAgICAgdmFyIGRvdWJsZWQgPSBmdW5jdGlvbihtYXRjaCwgc3RlcCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAxO1xuICAgICAgICAgICAgd2hpbGUgKGlGb3JtYXQgKyBtYXRjaGVzIDwgZm9ybWF0Lmxlbmd0aCAmJiBmb3JtYXQuY2hhckF0KGlGb3JtYXQgKyBtYXRjaGVzKSA9PT0gbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpRm9ybWF0ICs9IG1hdGNoZXMgLSAxO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWF0Y2hlcyAvIChzdGVwIHx8IDEpKSA+IDE7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEZvcm1hdCBhIG51bWJlciwgd2l0aCBsZWFkaW5nIHplcm9lcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgdmFyIGZvcm1hdE51bWJlciA9IGZ1bmN0aW9uKG1hdGNoLCB2YWx1ZSwgbGVuLCBzdGVwKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gJycgKyB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChkb3VibGVkKG1hdGNoLCBzdGVwKSkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bSA9ICcwJyArIG51bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9O1xuICAgICAgICAvLyBGb3JtYXQgYSBuYW1lLCBzaG9ydCBvciBsb25nIGFzIHJlcXVlc3RlZFxuICAgICAgICB2YXIgZm9ybWF0TmFtZSA9IGZ1bmN0aW9uKG1hdGNoLCB2YWx1ZSwgc2hvcnROYW1lcywgbG9uZ05hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gKGRvdWJsZWQobWF0Y2gpID8gbG9uZ05hbWVzW3ZhbHVlXSA6IHNob3J0TmFtZXNbdmFsdWVdKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRm9ybWF0IG1vbnRoIG51bWJlclxuICAgICAgICAvLyAoZS5nLiBDaGluZXNlIGNhbGVuZGFyIG5lZWRzIHRvIGFjY291bnQgZm9yIGludGVyY2FsYXJ5IG1vbnRocylcbiAgICAgICAgdmFyIGNhbGVuZGFyID0gdGhpcztcbiAgICAgICAgdmFyIGZvcm1hdE1vbnRoID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgbW9udGhOdW1iZXJzID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgbW9udGhOdW1iZXJzLmNhbGwoY2FsZW5kYXIsIGRhdGUsIGRvdWJsZWQoJ20nKSkgOlxuICAgICAgICAgICAgICAgIGxvY2FsaXNlTnVtYmVycyhmb3JtYXROdW1iZXIoJ20nLCBkYXRlLm1vbnRoKCksIDIpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRm9ybWF0IGEgbW9udGggbmFtZSwgc2hvcnQgb3IgbG9uZyBhcyByZXF1ZXN0ZWRcbiAgICAgICAgdmFyIGZvcm1hdE1vbnRoTmFtZSA9IGZ1bmN0aW9uKGRhdGUsIHVzZUxvbmdOYW1lKSB7XG4gICAgICAgICAgICBpZiAodXNlTG9uZ05hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBtb250aE5hbWVzID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXMuY2FsbChjYWxlbmRhciwgZGF0ZSkgOlxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzW2RhdGUubW9udGgoKSAtIGNhbGVuZGFyLm1pbk1vbnRoXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgbW9udGhOYW1lc1Nob3J0ID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydC5jYWxsKGNhbGVuZGFyLCBkYXRlKSA6XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydFtkYXRlLm1vbnRoKCkgLSBjYWxlbmRhci5taW5Nb250aF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIExvY2FsaXNlIG51bWJlcnMgaWYgcmVxdWVzdGVkIGFuZCBhdmFpbGFibGVcbiAgICAgICAgdmFyIGRpZ2l0cyA9IHRoaXMubG9jYWwuZGlnaXRzO1xuICAgICAgICB2YXIgbG9jYWxpc2VOdW1iZXJzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2V0dGluZ3MubG9jYWxOdW1iZXJzICYmIGRpZ2l0cyA/IGRpZ2l0cyh2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvdXRwdXQgPSAnJztcbiAgICAgICAgdmFyIGxpdGVyYWwgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcbiAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkgPT09IFwiJ1wiICYmICFkb3VibGVkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXRlcmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6IG91dHB1dCArPSBsb2NhbGlzZU51bWJlcnMoZm9ybWF0TnVtYmVyKCdkJywgZGF0ZS5kYXkoKSwgMikpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRCc6IG91dHB1dCArPSBmb3JtYXROYW1lKCdEJywgZGF0ZS5kYXlPZldlZWsoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU5hbWVzU2hvcnQsIGRheU5hbWVzKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ28nOiBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdvJywgZGF0ZS5kYXlPZlllYXIoKSwgMyk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd3Jzogb3V0cHV0ICs9IGZvcm1hdE51bWJlcigndycsIGRhdGUud2Vla09mWWVhcigpLCAyKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOiBvdXRwdXQgKz0gZm9ybWF0TW9udGgoZGF0ZSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzogb3V0cHV0ICs9IGZvcm1hdE1vbnRoTmFtZShkYXRlLCBkb3VibGVkKCdNJykpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gKGRvdWJsZWQoJ3knLCAyKSA/IGRhdGUueWVhcigpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGF0ZS55ZWFyKCkgJSAxMDAgPCAxMCA/ICcwJyA6ICcnKSArIGRhdGUueWVhcigpICUgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdZJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdWJsZWQoJ1knLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmZvcm1hdFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdKJzogb3V0cHV0ICs9IGRhdGUudG9KRCgpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQCc6IG91dHB1dCArPSAoZGF0ZS50b0pEKCkgLSB0aGlzLlVOSVhfRVBPQ0gpICogdGhpcy5TRUNTX1BFUl9EQVk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICchJzogb3V0cHV0ICs9IChkYXRlLnRvSkQoKSAtIHRoaXMuVElDS1NfRVBPQ0gpICogdGhpcy5USUNLU19QRVJfREFZOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb3VibGVkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9LFxuXG4gICAgLyoqIFBhcnNlIGEgc3RyaW5nIHZhbHVlIGludG8gYSBkYXRlIG9iamVjdC5cbiAgICAgICAgU2VlIDxhIGhyZWY9XCIjZm9ybWF0RGF0ZVwiPjxjb2RlPmZvcm1hdERhdGU8L2NvZGU+PC9hPiBmb3IgdGhlIHBvc3NpYmxlIGZvcm1hdHMsIHBsdXM6XG4gICAgICAgIDx1bD5cbiAgICAgICAgPGxpPiogLSBpZ25vcmUgcmVzdCBvZiBzdHJpbmc8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICBGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5wbHVzLmpzPC9jb2RlPiBtb2R1bGUuXG4gICAgICAgIEBtZW1iZXJvZiBCYXNlQ2FsZW5kYXJcbiAgICAgICAgQHBhcmFtIGZvcm1hdCB7c3RyaW5nfSBUaGUgZXhwZWN0ZWQgZm9ybWF0IG9mIHRoZSBkYXRlICgnJyBmb3IgZGVmYXVsdCBjYWxlbmRhciBmb3JtYXQpLlxuICAgICAgICBAcGFyYW0gdmFsdWUge3N0cmluZ30gVGhlIGRhdGUgaW4gdGhlIGFib3ZlIGZvcm1hdC5cbiAgICAgICAgQHBhcmFtIFtzZXR0aW5nc10ge29iamVjdH0gQWRkaXRpb25hbCBvcHRpb25zIHdob3NlIGF0dHJpYnV0ZXMgaW5jbHVkZTpcbiAgICAgICAgQHByb3BlcnR5IFtzaG9ydFllYXJDdXRvZmZdIHtudW1iZXJ9IFRoZSBjdXRvZmYgeWVhciBmb3IgZGV0ZXJtaW5pbmcgdGhlIGNlbnR1cnkuXG4gICAgICAgIEBwcm9wZXJ0eSBbZGF5TmFtZXNTaG9ydF0ge3N0cmluZ1tdfSBBYmJyZXZpYXRlZCBuYW1lcyBvZiB0aGUgZGF5cyBmcm9tIFN1bmRheS5cbiAgICAgICAgQHByb3BlcnR5IFtkYXlOYW1lc10ge3N0cmluZ1tdfSBOYW1lcyBvZiB0aGUgZGF5cyBmcm9tIFN1bmRheS5cbiAgICAgICAgQHByb3BlcnR5IFttb250aE5hbWVzU2hvcnRdIHtzdHJpbmdbXX0gQWJicmV2aWF0ZWQgbmFtZXMgb2YgdGhlIG1vbnRocy5cbiAgICAgICAgQHByb3BlcnR5IFttb250aE5hbWVzXSB7c3RyaW5nW119IE5hbWVzIG9mIHRoZSBtb250aHMuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZXh0cmFjdGVkIGRhdGUgdmFsdWUgb3IgPGNvZGU+bnVsbDwvY29kZT4gaWYgdmFsdWUgaXMgYmxhbmsuXG4gICAgICAgIEB0aHJvd3MgRXJyb3JzIGlmIHRoZSBmb3JtYXQgYW5kL29yIHZhbHVlIGFyZSBtaXNzaW5nLFxuICAgICAgICAgICAgICAgIGlmIHRoZSB2YWx1ZSBkb2Vzbid0IG1hdGNoIHRoZSBmb3JtYXQsIG9yIGlmIHRoZSBkYXRlIGlzIGludmFsaWQuICovXG4gICAgcGFyc2VEYXRlOiBmdW5jdGlvbihmb3JtYXQsIHZhbHVlLCBzZXR0aW5ncykge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbWFpbi5sb2NhbC5pbnZhbGlkQXJndW1lbnRzIHx8IG1haW4ucmVnaW9uYWxPcHRpb25zWycnXS5pbnZhbGlkQXJndW1lbnRzO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyAnJyk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLmxvY2FsLmRhdGVGb3JtYXQ7XG4gICAgICAgIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG4gICAgICAgIHZhciBzaG9ydFllYXJDdXRvZmYgPSBzZXR0aW5ncy5zaG9ydFllYXJDdXRvZmYgfHwgdGhpcy5zaG9ydFllYXJDdXRvZmY7XG4gICAgICAgIHNob3J0WWVhckN1dG9mZiA9ICh0eXBlb2Ygc2hvcnRZZWFyQ3V0b2ZmICE9PSAnc3RyaW5nJyA/IHNob3J0WWVhckN1dG9mZiA6XG4gICAgICAgICAgICB0aGlzLnRvZGF5KCkueWVhcigpICUgMTAwICsgcGFyc2VJbnQoc2hvcnRZZWFyQ3V0b2ZmLCAxMCkpO1xuICAgICAgICB2YXIgZGF5TmFtZXNTaG9ydCA9IHNldHRpbmdzLmRheU5hbWVzU2hvcnQgfHwgdGhpcy5sb2NhbC5kYXlOYW1lc1Nob3J0O1xuICAgICAgICB2YXIgZGF5TmFtZXMgPSBzZXR0aW5ncy5kYXlOYW1lcyB8fCB0aGlzLmxvY2FsLmRheU5hbWVzO1xuICAgICAgICB2YXIgcGFyc2VNb250aCA9IHNldHRpbmdzLnBhcnNlTW9udGggfHwgdGhpcy5sb2NhbC5wYXJzZU1vbnRoO1xuICAgICAgICB2YXIgbW9udGhOdW1iZXJzID0gc2V0dGluZ3MubW9udGhOdW1iZXJzIHx8IHRoaXMubG9jYWwubW9udGhOdW1iZXJzO1xuICAgICAgICB2YXIgbW9udGhOYW1lc1Nob3J0ID0gc2V0dGluZ3MubW9udGhOYW1lc1Nob3J0IHx8IHRoaXMubG9jYWwubW9udGhOYW1lc1Nob3J0O1xuICAgICAgICB2YXIgbW9udGhOYW1lcyA9IHNldHRpbmdzLm1vbnRoTmFtZXMgfHwgdGhpcy5sb2NhbC5tb250aE5hbWVzO1xuICAgICAgICB2YXIgamQgPSAtMTtcbiAgICAgICAgdmFyIHllYXIgPSAtMTtcbiAgICAgICAgdmFyIG1vbnRoID0gLTE7XG4gICAgICAgIHZhciBkYXkgPSAtMTtcbiAgICAgICAgdmFyIGRveSA9IC0xO1xuICAgICAgICB2YXIgc2hvcnRZZWFyID0gZmFsc2U7XG4gICAgICAgIHZhciBsaXRlcmFsID0gZmFsc2U7XG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgYSBmb3JtYXQgY2hhcmFjdGVyIGlzIGRvdWJsZWRcbiAgICAgICAgdmFyIGRvdWJsZWQgPSBmdW5jdGlvbihtYXRjaCwgc3RlcCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAxO1xuICAgICAgICAgICAgd2hpbGUgKGlGb3JtYXQgKyBtYXRjaGVzIDwgZm9ybWF0Lmxlbmd0aCAmJiBmb3JtYXQuY2hhckF0KGlGb3JtYXQgKyBtYXRjaGVzKSA9PT0gbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpRm9ybWF0ICs9IG1hdGNoZXMgLSAxO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWF0Y2hlcyAvIChzdGVwIHx8IDEpKSA+IDE7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEV4dHJhY3QgYSBudW1iZXIgZnJvbSB0aGUgc3RyaW5nIHZhbHVlXG4gICAgICAgIHZhciBnZXROdW1iZXIgPSBmdW5jdGlvbihtYXRjaCwgc3RlcCkge1xuICAgICAgICAgICAgdmFyIGlzRG91YmxlZCA9IGRvdWJsZWQobWF0Y2gsIHN0ZXApO1xuICAgICAgICAgICAgdmFyIHNpemUgPSBbMiwgMywgaXNEb3VibGVkID8gNCA6IDIsIGlzRG91YmxlZCA/IDQgOiAyLCAxMCwgMTEsIDIwXVsnb3lZSkAhJy5pbmRleE9mKG1hdGNoKSArIDFdO1xuICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IG5ldyBSZWdFeHAoJ14tP1xcXFxkezEsJyArIHNpemUgKyAnfScpO1xuICAgICAgICAgICAgdmFyIG51bSA9IHZhbHVlLnN1YnN0cmluZyhpVmFsdWUpLm1hdGNoKGRpZ2l0cyk7XG4gICAgICAgICAgICBpZiAoIW51bSkge1xuICAgICAgICAgICAgICAgIHRocm93IChtYWluLmxvY2FsLm1pc3NpbmdOdW1iZXJBdCB8fCBtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ10ubWlzc2luZ051bWJlckF0KS5cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZSgvXFx7MFxcfS8sIGlWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpVmFsdWUgKz0gbnVtWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1bMF0sIDEwKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRXh0cmFjdCBhIG1vbnRoIG51bWJlciBmcm9tIHRoZSBzdHJpbmcgdmFsdWVcbiAgICAgICAgdmFyIGNhbGVuZGFyID0gdGhpcztcbiAgICAgICAgdmFyIGdldE1vbnRoTnVtYmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1vbnRoTnVtYmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGRvdWJsZWQoJ20nKTsgIC8vIHVwZGF0ZSBpRm9ybWF0XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoID0gbW9udGhOdW1iZXJzLmNhbGwoY2FsZW5kYXIsIHZhbHVlLnN1YnN0cmluZyhpVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbW9udGgubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb250aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdldE51bWJlcignbScpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBFeHRyYWN0IGEgbmFtZSBmcm9tIHRoZSBzdHJpbmcgdmFsdWUgYW5kIGNvbnZlcnQgdG8gYW4gaW5kZXhcbiAgICAgICAgdmFyIGdldE5hbWUgPSBmdW5jdGlvbihtYXRjaCwgc2hvcnROYW1lcywgbG9uZ05hbWVzLCBzdGVwKSB7XG4gICAgICAgICAgICB2YXIgbmFtZXMgPSAoZG91YmxlZChtYXRjaCwgc3RlcCkgPyBsb25nTmFtZXMgOiBzaG9ydE5hbWVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKGlWYWx1ZSwgbmFtZXNbaV0ubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBuYW1lc1tpXS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlWYWx1ZSArPSBuYW1lc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpICsgY2FsZW5kYXIubWluTW9udGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgKG1haW4ubG9jYWwudW5rbm93bk5hbWVBdCB8fCBtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ10udW5rbm93bk5hbWVBdCkuXG4gICAgICAgICAgICAgICAgcmVwbGFjZSgvXFx7MFxcfS8sIGlWYWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEV4dHJhY3QgYSBtb250aCBudW1iZXIgZnJvbSB0aGUgc3RyaW5nIHZhbHVlXG4gICAgICAgIHZhciBnZXRNb250aE5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbW9udGhOYW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhciBtb250aCA9IGRvdWJsZWQoJ00nKSA/XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXMuY2FsbChjYWxlbmRhciwgdmFsdWUuc3Vic3RyaW5nKGlWYWx1ZSkpIDpcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0LmNhbGwoY2FsZW5kYXIsIHZhbHVlLnN1YnN0cmluZyhpVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbW9udGgubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb250aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdldE5hbWUoJ00nLCBtb250aE5hbWVzU2hvcnQsIG1vbnRoTmFtZXMpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBDb25maXJtIHRoYXQgYSBsaXRlcmFsIGNoYXJhY3RlciBtYXRjaGVzIHRoZSBzdHJpbmcgdmFsdWVcbiAgICAgICAgdmFyIGNoZWNrTGl0ZXJhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmNoYXJBdChpVmFsdWUpICE9PSBmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgKG1haW4ubG9jYWwudW5leHBlY3RlZExpdGVyYWxBdCB8fFxuICAgICAgICAgICAgICAgICAgICBtYWluLnJlZ2lvbmFsT3B0aW9uc1snJ10udW5leHBlY3RlZExpdGVyYWxBdCkucmVwbGFjZSgvXFx7MFxcfS8sIGlWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpVmFsdWUrKztcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGlWYWx1ZSA9IDA7XG4gICAgICAgIGZvciAodmFyIGlGb3JtYXQgPSAwOyBpRm9ybWF0IDwgZm9ybWF0Lmxlbmd0aDsgaUZvcm1hdCsrKSB7XG4gICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSBcIidcIiAmJiAhZG91YmxlZChcIidcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOiBkYXkgPSBnZXROdW1iZXIoJ2QnKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOiBnZXROYW1lKCdEJywgZGF5TmFtZXNTaG9ydCwgZGF5TmFtZXMpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6IGRveSA9IGdldE51bWJlcignbycpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndyc6IGdldE51bWJlcigndycpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6IG1vbnRoID0gZ2V0TW9udGhOdW1iZXIoKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOiBtb250aCA9IGdldE1vbnRoTmFtZSgpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaVNhdmUgPSBpRm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRZZWFyID0gIWRvdWJsZWQoJ3knLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlGb3JtYXQgPSBpU2F2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBnZXROdW1iZXIoJ3knLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdZJzogeWVhciA9IGdldE51bWJlcignWScsIDIpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSic6XG4gICAgICAgICAgICAgICAgICAgICAgICBqZCA9IGdldE51bWJlcignSicpICsgMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNoYXJBdChpVmFsdWUpID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpVmFsdWUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXROdW1iZXIoJ0onKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdAJzogamQgPSBnZXROdW1iZXIoJ0AnKSAvIHRoaXMuU0VDU19QRVJfREFZICsgdGhpcy5VTklYX0VQT0NIOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnISc6IGpkID0gZ2V0TnVtYmVyKCchJykgLyB0aGlzLlRJQ0tTX1BFUl9EQVkgKyB0aGlzLlRJQ0tTX0VQT0NIOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKic6IGlWYWx1ZSA9IHZhbHVlLmxlbmd0aDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCInXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG91YmxlZChcIidcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGNoZWNrTGl0ZXJhbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaVZhbHVlIDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBtYWluLmxvY2FsLnVuZXhwZWN0ZWRUZXh0IHx8IG1haW4ucmVnaW9uYWxPcHRpb25zWycnXS51bmV4cGVjdGVkVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeWVhciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHllYXIgPSB0aGlzLnRvZGF5KCkueWVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHllYXIgPCAxMDAgJiYgc2hvcnRZZWFyKSB7XG4gICAgICAgICAgICB5ZWFyICs9IChzaG9ydFllYXJDdXRvZmYgPT09IC0xID8gMTkwMCA6IHRoaXMudG9kYXkoKS55ZWFyKCkgLVxuICAgICAgICAgICAgICAgIHRoaXMudG9kYXkoKS55ZWFyKCkgJSAxMDAgLSAoeWVhciA8PSBzaG9ydFllYXJDdXRvZmYgPyAwIDogMTAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG1vbnRoID0gcGFyc2VNb250aC5jYWxsKHRoaXMsIHllYXIsIG1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG95ID4gLTEpIHtcbiAgICAgICAgICAgIG1vbnRoID0gMTtcbiAgICAgICAgICAgIGRheSA9IGRveTtcbiAgICAgICAgICAgIGZvciAodmFyIGRpbSA9IHRoaXMuZGF5c0luTW9udGgoeWVhciwgbW9udGgpOyBkYXkgPiBkaW07IGRpbSA9IHRoaXMuZGF5c0luTW9udGgoeWVhciwgbW9udGgpKSB7XG4gICAgICAgICAgICAgICAgbW9udGgrKztcbiAgICAgICAgICAgICAgICBkYXkgLT0gZGltO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoamQgPiAtMSA/IHRoaXMuZnJvbUpEKGpkKSA6IHRoaXMubmV3RGF0ZSh5ZWFyLCBtb250aCwgZGF5KSk7XG4gICAgfSxcblxuICAgIC8qKiBBIGRhdGUgbWF5IGJlIHNwZWNpZmllZCBhcyBhbiBleGFjdCB2YWx1ZSBvciBhIHJlbGF0aXZlIG9uZS5cbiAgICAgICAgRm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGx1cy5qczwvY29kZT4gbW9kdWxlLlxuICAgICAgICBAbWVtYmVyb2YgQmFzZUNhbGVuZGFyXG4gICAgICAgIEBwYXJhbSBkYXRlU3BlYyB7Q0RhdGV8bnVtYmVyfHN0cmluZ30gVGhlIGRhdGUgYXMgYW4gb2JqZWN0IG9yIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0IG9yXG4gICAgICAgICAgICAgICAgYW4gb2Zmc2V0IC0gbnVtZXJpYyBkYXlzIGZyb20gdG9kYXksIG9yIHN0cmluZyBhbW91bnRzIGFuZCBwZXJpb2RzLCBlLmcuICcrMW0gKzJ3Jy5cbiAgICAgICAgQHBhcmFtIGRlZmF1bHREYXRlIHtDRGF0ZX0gVGhlIGRhdGUgdG8gdXNlIGlmIG5vIG90aGVyIHN1cHBsaWVkLCBtYXkgYmUgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICAgIEBwYXJhbSBjdXJyZW50RGF0ZSB7Q0RhdGV9IFRoZSBjdXJyZW50IGRhdGUgYXMgYSBwb3NzaWJsZSBiYXNpcyBmb3IgcmVsYXRpdmUgZGF0ZXMsXG4gICAgICAgICAgICAgICAgaWYgPGNvZGU+bnVsbDwvY29kZT4gdG9kYXkgaXMgdXNlZCAob3B0aW9uYWwpXG4gICAgICAgIEBwYXJhbSBbZGF0ZUZvcm1hdF0ge3N0cmluZ30gVGhlIGV4cGVjdGVkIGRhdGUgZm9ybWF0IC0gc2VlIDxhIGhyZWY9XCIjZm9ybWF0RGF0ZVwiPjxjb2RlPmZvcm1hdERhdGU8L2NvZGU+PC9hPi5cbiAgICAgICAgQHBhcmFtIFtzZXR0aW5nc10ge29iamVjdH0gQWRkaXRpb25hbCBvcHRpb25zIHdob3NlIGF0dHJpYnV0ZXMgaW5jbHVkZTpcbiAgICAgICAgQHByb3BlcnR5IFtzaG9ydFllYXJDdXRvZmZdIHtudW1iZXJ9IFRoZSBjdXRvZmYgeWVhciBmb3IgZGV0ZXJtaW5pbmcgdGhlIGNlbnR1cnkuXG4gICAgICAgIEBwcm9wZXJ0eSBbZGF5TmFtZXNTaG9ydF0ge3N0cmluZ1tdfSBBYmJyZXZpYXRlZCBuYW1lcyBvZiB0aGUgZGF5cyBmcm9tIFN1bmRheS5cbiAgICAgICAgQHByb3BlcnR5IFtkYXlOYW1lc10ge3N0cmluZ1tdfSBOYW1lcyBvZiB0aGUgZGF5cyBmcm9tIFN1bmRheS5cbiAgICAgICAgQHByb3BlcnR5IFttb250aE5hbWVzU2hvcnRdIHtzdHJpbmdbXX0gQWJicmV2aWF0ZWQgbmFtZXMgb2YgdGhlIG1vbnRocy5cbiAgICAgICAgQHByb3BlcnR5IFttb250aE5hbWVzXSB7c3RyaW5nW119IE5hbWVzIG9mIHRoZSBtb250aHMuXG4gICAgICAgIEByZXR1cm4ge0NEYXRlfSBUaGUgZGVjb2RlZCBkYXRlLiAqL1xuICAgIGRldGVybWluZURhdGU6IGZ1bmN0aW9uKGRhdGVTcGVjLCBkZWZhdWx0RGF0ZSwgY3VycmVudERhdGUsIGRhdGVGb3JtYXQsIHNldHRpbmdzKSB7XG4gICAgICAgIGlmIChjdXJyZW50RGF0ZSAmJiB0eXBlb2YgY3VycmVudERhdGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IGRhdGVGb3JtYXQ7XG4gICAgICAgICAgICBkYXRlRm9ybWF0ID0gY3VycmVudERhdGU7XG4gICAgICAgICAgICBjdXJyZW50RGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRlRm9ybWF0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc2V0dGluZ3MgPSBkYXRlRm9ybWF0O1xuICAgICAgICAgICAgZGF0ZUZvcm1hdCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYWxlbmRhciA9IHRoaXM7XG4gICAgICAgIHZhciBvZmZzZXRTdHJpbmcgPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGVuZGFyLnBhcnNlRGF0ZShkYXRlRm9ybWF0LCBvZmZzZXQsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBkYXRlID0gKG9mZnNldC5tYXRjaCgvXmMvKSAmJiBjdXJyZW50RGF0ZSA/XG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUubmV3RGF0ZSgpIDogbnVsbCkgfHwgY2FsZW5kYXIudG9kYXkoKTtcbiAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gLyhbKy1dP1swLTldKylcXHMqKGR8d3xtfHkpPy9nO1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSBwYXR0ZXJuLmV4ZWMob2Zmc2V0KTtcbiAgICAgICAgICAgIHdoaWxlIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQocGFyc2VJbnQobWF0Y2hlc1sxXSwgMTApLCBtYXRjaGVzWzJdIHx8ICdkJyk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IHBhdHRlcm4uZXhlYyhvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH07XG4gICAgICAgIGRlZmF1bHREYXRlID0gKGRlZmF1bHREYXRlID8gZGVmYXVsdERhdGUubmV3RGF0ZSgpIDogbnVsbCk7XG4gICAgICAgIGRhdGVTcGVjID0gKGRhdGVTcGVjID09IG51bGwgPyBkZWZhdWx0RGF0ZSA6XG4gICAgICAgICAgICAodHlwZW9mIGRhdGVTcGVjID09PSAnc3RyaW5nJyA/IG9mZnNldFN0cmluZyhkYXRlU3BlYykgOiAodHlwZW9mIGRhdGVTcGVjID09PSAnbnVtYmVyJyA/XG4gICAgICAgICAgICAoaXNOYU4oZGF0ZVNwZWMpIHx8IGRhdGVTcGVjID09PSBJbmZpbml0eSB8fCBkYXRlU3BlYyA9PT0gLUluZmluaXR5ID8gZGVmYXVsdERhdGUgOlxuICAgICAgICAgICAgY2FsZW5kYXIudG9kYXkoKS5hZGQoZGF0ZVNwZWMsICdkJykpIDogY2FsZW5kYXIubmV3RGF0ZShkYXRlU3BlYykpKSk7XG4gICAgICAgIHJldHVybiBkYXRlU3BlYztcbiAgICB9XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==