# clipboard
#### \<script src="clipboard.js"\>\<\/script\>
#### var clipboard = new Clipboard();
```
    clipboard.addEventListener(document.body, {
         copy: function(e){
             clipboard.copy(e, '复制的数据');
         },
         paste: function(e){
             var data = clipboard.getPaste(e);
             console.log(data);
         },
         cut: function(e){
             clipboard.cut(e, '剪切的数据');
         },
         click: function(e){
             document.execCommand('copy');
         }
     });
```