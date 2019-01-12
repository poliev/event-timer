function validate(value, least, greatest, excp_message) {
    if(value < least || value > greatest) {
        throw excp_message;
    }
}

function get_days_in_month(year, month) {
    var days_in_month = [
        31, // January
        28, // February
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31  // December
    ];

    // leap year
    if(year % 4 == 0) {
        days_in_month[1] = 29;
    }

    return days_in_month[month - 1];
}

function validate_values(year, month, day, hour, minute) {
    /*
        define validation values:
            validation values = [
                value,
                least value,
                the greatest value,
                exception message
            ]
    */
    var validation_values = {
        'month': [month, 1, 12, 'The month is not exist!'],
        'day': [day, 1, get_days_in_month(year, month), 'The day is not exist!'],
        'hour': [hour, 0, 23, 'The hour is not exist!'],
        'minute': [minute, 0, 59, 'The minute is not exist!']
    };

    for (var key in validation_values) {
        validate(
            validation_values[key][0], // value
            validation_values[key][1], // least
            validation_values[key][2], // the greatest
            validation_values[key][3]  // exception message
        );
    }
}


function find_time(left_time) {
    var result = {
        'days':0,
        'hours': 0,
        'minutes': 0,
        'seconds': 0
    };

    if(left_time > 0) {
        // Convert time (milliseconds to ...)
        var second = 1000;
        var minute = second * 60;
        var hour = minute * 60;
        var day = hour * 24;

        // Find values
        var left_days = left_time / day;
        result['days'] = parseInt(left_days);

        var left_hours = (left_days - result['days']) * day / hour;
        result['hours'] = parseInt(left_hours);

        var left_minutes = (left_hours - result['hours']) * hour / minute;
        result['minutes'] = parseInt(left_minutes);

        var left_seconds = (left_minutes - result['minutes']) * minute / second;
        result['seconds'] = parseInt(left_seconds);
    }

    return result;
}


function left_time(event_year, event_month, event_day, event_hour, event_minute=0) {
    validate_values(event_year, event_month, event_day, event_hour, event_minute);

    var now_date = new Date();
    var event_date = new Date(event_year, event_month - 1, event_day, event_hour, event_minute);

    // how much time is left
    var left = new Date(event_date.getTime() - now_date.getTime());
    var left = left.getTime();

    return find_time(left);
}
