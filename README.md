# ugly-date
Discover the format of irregular date strings needed for parsing.

## Installation  

`npm i @fredlackey/ugly-date`

## Important  
This library is an experiment... something I could not shake out of my head one Friday evening.  It is _not_ complete.  While it does handle basic formats, containing numerics and such, it does _not_ contain logic to handle words or "week of year" / "day of year" logic.

## Background  
Countless libraries out there that will _parse_ a date string if you supply a string and a format.  Most of them will also _try_ to return a valid date if you do _not_ supply a format.  In that scenario, the date value often comes back wrong or incomplete.  In fact, it is the reason why [`moment`](https://momentjs.com/), the de facto library for date manipulation (that i know of), is pulling out their parse logic for scenarios where a format is _not_ supplied.

## Usage
Simply supply a value to the `.analyze` function for a report on where recognized patterns are found within the string.

```
const uglyDate = require('@fredlackey/ugly-date');

const value    = 'Screen Shot 2015-07-09 at 1.33.25 PM';

const results  = uglyDate.analyze(value);
```
Example results:
```
{
  "pattern": "Screen Shot YYYY-MM-DD at hh.mm.ss a",
  "value": "Screen Shot 2015-07-09 at 1.33.25 PM",
  "locations": [
    {
      "formal": "YYYY-MM-DD",
      "pattern": "YYYY-MM-DD",
      "position": 12,
      "value": "2015-07-09",
      "values": {
        "YYYY": 2015,
        "MM": 7,
        "DD": 9
      }
    },
    {
      "formal": "hh.mm.ss a",
      "pattern": "h:mm:ss aa",
      "position": 26,
      "value": "1.33.25 PM",
      "values": {
        "h": 1,
        "mm": 33,
        "ss": 25,
        "aa": "PM"
      }
    }
  ]
}
```
In the example above, the following values are returned:

  * **pattern** : Example string including the detected pattern.
  * **value** : Original string (for verification puposes).
  * **locations** : Array of locations where patterns were detected.

And, for each `location` item, you have the following:

  * **pattern** : Actual pattern detected in supplied string.
  * **position** : Index of the substring having the pattern.
  * **value** : Value of the substring matched on the pattern.
  * **formal** : The actual formal / proper pattern to parse this pattern.
  * **values** : Each of the extracted values in their `number` or `string` form.
  
  > **Note:**  
  > Pay close attention to the `a` and `aa` paterns shown in the `formal` and `pattern` values.  In this example, he double-character formatted value was detected, however this _is not_ the proper token to use when parsing strings.  Intead, the _single_ `a` is used.  While both are provided here, you would want to use the `formal` value as the actual pattern when parsing this string.


## Contact Info  
As always, get in touch if you have ideas or feedback ...

**Fred Lackey**  
[http://fredlackey.com](http://www.fredlackey.com)  
[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)

