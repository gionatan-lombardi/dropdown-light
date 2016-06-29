# dropdown-light
A super simple dropdown script manager.

**Version 2.0.0**  
jQuery requirements removed.

## Install

### Download

* [dropdown-light.js](https://github.com/gionatan-lombardi/dropdown-light/blob/master/src/dropdown-light.js)

### Package managers

Install via [npm](https://www.npmjs.com/package/dropdown-light): `npm install dropdown-light`

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

### onOpen
Type: `function`  
Default: `undefined`

A custom callback called when the dropdown opens.

### onClose
Type: `function`  
Default: `undefined`

A custom callback called when the dropdown closes.


## Methods

### close()

Closes the dropdown.

### toggle(index)
index: `number` optional

Toggles the dropdown.
If there are multiple dropdowns in the same function instance (eg. accordion or dropdown menu) providing an index toggles the indexed element.

### destroy()

Removes all the registered event listeners.


## Borwsers support
IE9+  
Firefox 1  
Chrome 1  
Safari 1  
Opera 7