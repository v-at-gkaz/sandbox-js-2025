const art = require('ascii-art');

art.font('Hello, World!', 'Doom', (err, text) => {
   if(err) return;
   console.log(text);
});