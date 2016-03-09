# dropdown-light
A super simple dropdown script manager.

**Version 2.0.0**  
jQuery requirements removed.

Based on Remy Sharp's post, ["How tabs should work"](https://24ways.org/2015/how-tabs-should-work/)

## How it works
Start with a simple dropdown markup:
```html
<div class="dropdown-block">
  <button type="button" class="dropdownToggler"><span>Toggler</span></button>
  <ul class="dropdownMenu">
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ul>
</div>
```
With plain JavaScript cast the `dropdownLight()` function with the dropdown's container class selector as the first argument:
```javascript
dropdownLight('.dropdown-block');
```
If you want to customize the script's options simply write them in an object after the thirst argument:
```javascript
dropdownLight('.dropdown-block', {
  dropdownClass: '.dropdown-menu',
  togglerClass: '.dropdown-toggler',
  outsideClose: false
});
```
To use the public methods provided assign the casted function to a varible (returns an object) and then use the methods:
```javascript
var drop = dropdownLight('.dropdown-block');

drop.toggleDropdown();
drop.destroy();
```
That's all! Show, hide and styles will all be managed with css.

**Have fun.**

## Options

### dropdownClass
Type: `string`  
Default: `.dropdownMenu`

The class you have to give to the panel.

### togglerClass
Type: `string`  
Default: `.dropdownToggler`

The class you have to give to the toggler.

### outsideClose
Type: `boolean`  
Default: `true`

Clicking outside the dropdown closes the panel. You can set this to false.

## Methods

### toggleDropdown()

Toggles the dropdown.

### destroy()

Removes all the registered event listeners.

## Borwsers support
IE9+  
Firefox 1  
Chrome 1  
Safari 1  
Opera 7