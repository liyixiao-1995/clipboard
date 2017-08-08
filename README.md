# clipboard
## install
```
    bower install clipboardJs --save-dev
```
#### html
```
<script src="clipboard.js"></script>

```

#### js
```
var clipboard = new Clipboard();
clipboard.addEventListener(document.body, {
     copy: function(e){
         clipboard.copy(e, {String});
     },
     paste: function(e){
         var text = clipboard.getPaste(e);
         console.log(text);
     },
     cut: function(e){
         clipboard.cut(e, {String});
     },
     click: function(e){
         document.execCommand('copy');
     }
 });
 
```