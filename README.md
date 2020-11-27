# iCursor – Rebuilding the awesome iPadOS cursor for the web

Author: https://www.linkedin.com/in/stefangentz/

## About
iCursor is a fun and spare-time project. I just fell in love with Apple’s iPadOS cursor on my iPadPro and wanted to get it for my own websites on other devices as well. It’s still WIP (see TODO section at the end).

iCursor, in its current state, simulates Apple’s iPadOS cursor by doing the following:
- removing the normal cursor,
- adding CSS classes for the cursor,
- adding a div for the cursor to the webpage,
- adding an event to get the cursors current position,
- adding specific behavior for hovering over text,
- adding smooth transitions between pointer and text cursor,
- adding an idle-state so that the cursor fades away when not moved and comes back if moved.

Find it also on codepen.io and see it in action:
[iCursor on codepen.ip](https://codepen.io/stefan-gentz/pen/KKMjYoK)

## Version
Current Version: 0.7.20201127


## Prerequisites
Requires jQuery: https://jquery.com/


## Installation
1. Just link in jQuery if you do not already have it linked in. jQuery goes into the head.
2. Link to the iCursor JavaScript file. iCursor goes at the end of the body right before the closing body tag.

That’s it. No additional CSS or any other stuff needed—dead-simple plug and play.


Example (assuming that the iCursor.js is in the same folder where you *.html document is):

```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Title</title>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    </html>
    <body>
        (your page content)
        <script src="iCursor.js" type="text/javascript"></script>
    </body>
</html>
```

## Configuration
There are several variables at the beginning of the script to customize multiple parameters of the cursor.
You can change the size, color, transparency, and many other things.

The variable names are pretty self-explaining, I guess, but here you go with their documentation:

| Variable                | Default                                    | Note                                  |
|-------------------------|--------------------------------------------|---------------------------------------|
| $iCursorVersion         | depends                                    | The current version of this script.   |
| $iCursorID              | cursor                                     | The unique ID of your iCursor.        |
| $cursorElement          | ```javascript <div id=\"" + $iCursorID + "\"></div>```    | The iCursor div. |
| $iCursorColor           | rgba(150,150,150,.75)                      | Use any color you want.               |
| $iCursorMinHeight       | 24                                         | Minimum height of the cursor in px.   |
| $iCursorMaxHeight       | 100                                        | Maximum height of the cursor in px.   |
| $iCursorPointerSize     | 20                                         | Size of the pointer in px             | 
| $iCursorPointerRadius   | ($iCursorPointerSize / 2)                  | Sets the round corners automatically. |
| $iCursorOpacity         | 1                                          | 1 = no transparency<br/>0 = full transparency<br/>Use .5 for 50% transparency<br/>Note that any transparency value with add additional transparency if you have defined iCursorColor as an rgba() color with alpha set to < 1 |
| $iCursorTransitionSpeed | 0.2                                        | How fast iCursor transforms between states |
| $iCursorTextWidth       | 6                                          | The width of the iCursor text cursor ("I-Beam") |
| $iCursorTextRadius      | ($iCursorTextWidth / 2)                    | Do not change.                        |
| $iCursorMixBlendMode    | difference                                 | Value for the CSS mix-blend-mode rule. |
| $iCursorFilter          | grayscale(1)                               | Use grayscale(1) to apply grayscale. (Doesn't seem to work in all browsers.) | 
| $iCursorIdleCheck       | true                                       | Set to true, if cursor should hide after $iCursorIdleTime. Set to false to keep the cursor always visible.      | 
| $iCursorIdleTime        | 3500                                       | Time in ms until the cursor fades away | 
| $iCursorTimeout         | null                                       | Do not change this!      | 
| $textElements           | h1, h2, h3, h4, h5, h6, p                  | The HTML elements to which the text cursor applies. Inline Elements are automatically covered and don’t need to be declared explicitly unless you use them not as a child of any of the elements defined here. |
| $x, $y                  | _empty_                                    | Needed for x/y coordinates of iCursor | 


### Example

```Javascript
var $iCursorVersion = "0.7";

var $iCursorID = "iCursor";
var $iCursorElement = "<div id=\"" + $iCursorID + "\"></div>";
var $iCursorColor = "rgba(150,150,150,.75)";
var $iCursorMinHeight = "24";
var $iCursorMaxHeight = "100";
var $iCursorPointerSize = "20";
var $iCursorPointerRadius = ($iCursorPointerSize / 2);
var $iCursorOpacity = "1";
var $iCursorTransitionSpeed = "0.2";
var $iCursorTextWidth = "6";
var $iCursorTextRadius = ($iCursorTextWidth / 2);
var $iCursorMixBlendMode = "normal";
var $iCursorFilter = "grayscale(1)";
var $iCursorIdleCheck = "true";
var $iCursorIdleTime = "3500";
var $iCursorTimeout = null;
var $textElements = "h1, h2, h3, h4, h5, h6, p, span";
var $x, $y;
```


## About the text cursor

Apple has done an excellent job here: The text cursor adapts to the text’s line-height below. The text cursor also has exceptions for small and big text:
* If the text is very small, the cursor sticks to its minimum height (48 (24) px).
* If the text is very large, the cursor sticks to its maximum height (200 (100) px).
* For every line-height between that, the text cursor adapts its height to the line-height of the underlying text.


### A little bit of technical background for the text cursor
If the pointer hovers over any text, the cursor gets the text line height (not the font size!):
1. Test if the line-height is defined by user or default (“Normal”).
    1. If the line-height is defined by the user, iCursor takes this value (in px) and sets the $cursorHeight considering min-/max-height settings.
    2. If the line-height is not defined by the user, iCursor takes the element’s font-size and multiplies it with 1.345 to get the line-height. Factor 1.345 is the standard line-height.
    3. Then iCursor sets $cursorHeight to $lineHeight considering min-/max-height settings.
2.  Once $cursorHeight is defined, iCursor remove the CSS class .cursor-pointer and adds .cursor-text.
3.  On hover out, iCursor removes .cursor-text and removes the custom cursor height.


## ToDo

### Background-Brightness adaption
Apple’s pointer also checks the brightness of the area below the current cursor position (x/y + cursor size):
* If the average brightness is dark, the pointer becomes bright.
* If the average brightness is bright, the pointer becomes dark. Just getting the background-color of the objects below the pointer is obviously not useful. The brightness of everything below the pointer needs to be calculated, and then $iCursorColor needs to be set accordingly.


### Button behavior
Apple’s iPadOS pointer also has specific behavior for hovering over buttons.
This has not been implemented yet.


### Click behavior
Apple’s pointer and text cursor become slightly smaller when clicking. This has not been implemented yet.


### Detect iPad
Currently, iCursor also shows up on iPad, so yu get two cursors there, as iPadOS ignores `cursor: none`.

On my websites, I use a media query to detect iPads and hide the cursor this way:

```CSS
@media only screen 
  and (min-device-width: 834px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2) 
  and (orientation: portrait) {
    html { font-size: 20px; }
    .cursor { opacity: 0; }
    .cursor-pointer { opacity: 0; }
}
@media only screen 
  and (min-device-width: 834px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2) 
  and (orientation: landscape) {
    html { font-size: 16px; }
    .cursor { opacity: 0; }
    .cursor-pointer { opacity: 0; }
}
```

Need to be implemented in iCursor directly one day, so that it is not necessary any more to do it in a separate CSS.


### Browser Plugin
I would love to create a Chrome Plugin one day that replaces the stadard cursor with iCursor on all websites. Preferably with a simple on/off setting.
