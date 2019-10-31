var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "lodash/range", "lodash/includes", "lodash/isNil", "lodash/isArray", "lodash/uniq", "lodash/some", "moment", "./const"], function (require, exports, range_1, includes_1, isNil_1, isArray_1, uniq_1, some_1, moment_1, const_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    range_1 = __importDefault(range_1);
    includes_1 = __importDefault(includes_1);
    isNil_1 = __importDefault(isNil_1);
    isArray_1 = __importDefault(isArray_1);
    uniq_1 = __importDefault(uniq_1);
    some_1 = __importDefault(some_1);
    moment_1 = __importDefault(moment_1);
    var buildCalendarValues = function (localization) {
        /*
          Return array of months (strings) like ['Aug', 'Sep', ...]
          that used to populate calendar's page.
        */
        var localLocale = localization ? moment_1.default.localeData(localization) : undefined;
        return localLocale ? localLocale.monthsShort() : moment_1.default.monthsShort();
    };
    exports.buildCalendarValues = buildCalendarValues;
    var getInitialDatePosition = function (selectable, currentDate) {
        if (selectable.indexOf(currentDate.month()) < 0) {
            return selectable[0];
        }
        return currentDate.month();
    };
    exports.getInitialDatePosition = getInitialDatePosition;
    var getDisabledPositions = function (enable, disable, maxDate, minDate, currentDate) {
        /*
          Return position numbers of months that should be displayed as disabled
          (position in array returned by `this.buildCalendarValues`).
        */
        var disabled = [];
        if (isArray_1.default(enable)) {
            var enabledMonthPositions_1 = enable
                .filter(function (monthMoment) { return monthMoment.isSame(currentDate, 'year'); })
                .map(function (monthMoment) { return monthMoment.month(); });
            disabled = disabled.concat(range_1.default(0, const_1.MONTHS_IN_YEAR)
                .filter(function (monthPosition) { return !includes_1.default(enabledMonthPositions_1, monthPosition); }));
        }
        if (isArray_1.default(disable)) {
            disabled = disabled.concat(disable
                .filter(function (monthMoment) { return monthMoment.year() === currentDate.year(); })
                .map(function (monthMoment) { return monthMoment.month(); }));
        }
        if (!isNil_1.default(maxDate)) {
            if (maxDate.year() === currentDate.year()) {
                disabled = disabled.concat(range_1.default(maxDate.month() + 1, const_1.MONTHS_IN_YEAR));
            }
            if (maxDate.year() < currentDate.year()) {
                disabled = range_1.default(0, const_1.MONTHS_IN_YEAR);
            }
        }
        if (!isNil_1.default(minDate)) {
            if (minDate.year() === currentDate.year()) {
                disabled = disabled.concat(range_1.default(0, minDate.month()));
            }
            if (minDate.year() > currentDate.year()) {
                disabled = range_1.default(0, const_1.MONTHS_IN_YEAR);
            }
        }
        if (disabled.length > 0) {
            return uniq_1.default(disabled);
        }
    };
    exports.getDisabledPositions = getDisabledPositions;
    var isNextPageAvailable = function (maxDate, enable, currentDate) {
        if (isArray_1.default(enable)) {
            return some_1.default(enable, function (enabledMonth) { return enabledMonth.isAfter(currentDate, 'year'); });
        }
        if (isNil_1.default(maxDate)) {
            return true;
        }
        return currentDate.year() < maxDate.year();
    };
    exports.isNextPageAvailable = isNextPageAvailable;
    var isPrevPageAvailable = function (minDate, enable, currentDate) {
        if (isArray_1.default(enable)) {
            return some_1.default(enable, function (enabledMonth) { return enabledMonth.isBefore(currentDate, 'year'); });
        }
        if (isNil_1.default(minDate)) {
            return true;
        }
        return currentDate.year() > minDate.year();
    };
    exports.isPrevPageAvailable = isPrevPageAvailable;
});
