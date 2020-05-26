# ugly-date
Discover the format of irregular date strings needed for parsing.

## Installation  

`npm i @fredlackey/ugly-date`

## Important  
This library is an experiment... something I could not shake out of my head on Friday evening.  It is _not_ complete.  While it does handle basic formats, containing numerics and such, it does _not_ contain logic to handle words or "week of year" / "day of year" logic.

## Background  
Countless libraries out there that will _parse_ a date string if you supply a string and a format.  Most of them will also _try_ to return a valid date if you do _not_ supply a format.  In that scenario, the date value often comes back wrong or incomplete.  In fact, it is the reason why [`moment`](https://momentjs.com/), the de facto library for date manipulation (that i know of), is pulling out their parse logic for scenarios where a format is _not_ supplied.

## Usage
Simply supply a value to the `.analyze` function for a report on where recognized patterns are found within the string.

```
const uglyDate = require('@fredlackey/ugly-date');

const value = 'Screen Shot 2015-07-09 at 1.33.25 PM';

const locations = uglyDate.analyze(value);
```


## Contact Info  
As always, get in touch if you have ideas or feedback ...

**Fred Lackey**  
[http://fredlackey.com](http://www.fredlackey.com)  
[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)

