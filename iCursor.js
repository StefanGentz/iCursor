/*
 iCursor - An emulation of the awesome iPadOS cursor. WIP.

 Author: https://www.linkedin.com/in/stefangentz/
 Last Update: 2020-11-25

 See the documentation here:
 https://github.com/StefanGentz/iCursor/blob/main/README.md
 
 codepen: https://codepen.io/stefan-gentz/pen/KKMjYoK
*/

var $iCursorVersion = "0.7";

var $iCursorID = "iCursor";
var $iCursorElement = "<div id=\"" + $iCursorID + "\"></div>";
var $iCursorColor = "rgba(150,150,150,1)";
var $iCursorMinHeight = "22";
var $iCursorMaxHeight = "100";
var $iCursorPointerSize = "20";
var $iCursorPointerRadius = ($iCursorPointerSize / 2);
var $iCursorOpacity = "0.5";
var $iCursorTransitionSpeed = "0.2";
var $iCursorTextWidth = "6";
var $iCursorTextRadius = ($iCursorTextWidth / 2);
var $iCursorMixBlendMode = "normal";
var $iCursorFilter = "grayscale(1)"; // use grayscale(1); to apply grayscale. Doesn't seem to work.
var $iCursorIdleCheck = "true"; // Set to true, if cursor should hide after $iCursorIdleTime. Set to false to keep the cursor always visible.
var $iCursorIdleTime = "3500"; // Time in ms until the cursor fades away
var $iCursorTimeout = null;
var $textElements = "h1, h2, h3, h4, h5, h6, p, span";
var $x, $y;

$(document).ready(function () {
   
   var $iCursorStyle =[
   "<style>",
   "/* Custom Stylesheet for iCursor, Version " + $iCursorVersion + " */ ",
   " ",
   "* { cursor: none; }",
   " ",
   ".cursor { ",
   "   width: " + $iCursorPointerSize + "px;",
   "   height: " + $iCursorPointerSize + "px;",
   "   border-radius: " + $iCursorPointerRadius + "px;",
   "   position: fixed;",
   "   z-index: 9999;",
   "   position: fixed;",
   "   background-color: " + $iCursorColor + ";",
   "   opacity: " + $iCursorOpacity + ";",
   "   mix-blend-mode: " + $iCursorMixBlendMode + ";",
   "   filter: " + $iCursorFilter + ";",
   "   pointer-events: none;",
   "   transition: width " + $iCursorTransitionSpeed + "s, height " + $iCursorTransitionSpeed + "s, border-radius " + $iCursorTransitionSpeed / 2 + "s ease-in-out;",
   "   transform: translate(-50%, -50%);",
   "}",
   " ",
   ".cursor-text { ",
   "   width: " + $iCursorTextWidth + "px;",
   "   border-radius: " + $iCursorTextRadius + "px;",
   "   mix-blend-mode: normal;",
   "}",
   " ",
   ".cursor-hide { ",
   "   transition: width 0.2s ease-in-out;",
   "   animation-name: fadeCursor;",
   "   animation-duration: 1s;",
   "   animation-delay: 0s;",
   "   animation-fill-mode: forwards;",
   "}",
   " ",
   "@keyframes fadeCursor {",
   "   	0% { }",
   "   100% { opacity: 0; }",
   "}",
   "</style>"].join("\n");
   
   $('html > head').append($iCursorStyle);
   $('html > body').prepend($iCursorElement);
   var $iCursor = document.getElementById($iCursorID);
   $($iCursor).addClass("cursor");
   
   window.addEventListener("mousemove", function (event) {
      var $x = event.clientX;
      var $y = event.clientY;
      var $iCursor = document.getElementById($iCursorID);
      
      if (typeof $x !== "undefined") {
         $iCursor.style.left = $x + "px";
         $iCursor.style.top = $y + "px";
         //console.log("x: " + $x + "; y: " + $y);
      }
      
      if ($iCursorTimeout !== null) {
         $($iCursor).removeClass("cursor-hide");
         clearTimeout($iCursorTimeout);
      }
      
      $iCursorTimeout = setTimeout(function () {
         $($iCursor).addClass("cursor-hide");
      },
      $iCursorIdleTime);
   },
   false);
   
   $($textElements).hover(
   function () {
      if ($(this).attr("line-height")) {
         var $lineHeight = parseInt($(this).css("line-height"));
         if ($lineHeight < $iCursorMinHeight) {
            var $iCursorHeight = $iCursorMinHeight;
         } else {
            if ($lineHeight > $iCursorMinHeight && $lineHeight < $iCursorMaxHeight) {
               var $iCursorHeight = $lineHeight;
            } else {
               var $iCursorHeight = $iCursorMaxHeight;
            }
         }
      } else {
         var $lineHeight = parseInt($(this).css("font-size")) * 1.345;
         if ($lineHeight < $iCursorMinHeight) {
            var $iCursorHeight = $iCursorMinHeight;
         } else {
            if ($lineHeight > $iCursorMinHeight && $lineHeight < $iCursorMaxHeight) {
               var $iCursorHeight = $lineHeight;
            } else {
               var $iCursorHeight = $iCursorMaxHeight;
            }
         }
      }
      $($iCursor).addClass("cursor-text");
      $($iCursor).css({
         height: $iCursorHeight
      });
   },
   function () {
      $($iCursor).removeClass("cursor-text");
      $($iCursor).css({
         height: ""
      });
   });
   
   // Nothing special done here yet for the link pointer. Still to do.
   $("a").hover(
   function () {
      $($iCursor).addClass("cursor-pointer-hover");
   },
   function () {
      $($iCursor).removeClass("cursor-pointer-hover");
   });
});