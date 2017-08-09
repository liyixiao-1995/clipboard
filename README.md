## install
```
bower install clipboardJs --save-dev
```
#### html
```
<script src="bower_components/clipboardjs/src/clipboard.js"></script>

```

#### js
```
var clipboard = new clipboardJs();
var element = document.querySelector('div');
clipboard.addEventListener(element, {
     copy: function(e){
         if(!window.getSelection().toString()){
             clipboard.copy(e);
         }
     },
     cut: function(e){
         if(!window.getSelection().toString()){
             clipboard.cut(e);
         }
     },
     paste: function(e){
         clipboard.paste();
         var data = clipboard.getPaste(e);
         console.log(data);
     }
 });
 
 document.click = function(){
    clipboard.copy('string', element);
 }
 
```