import{n as e}from"./vendor-ui-Bo70lTWR.js";import{l as t}from"./index-BHZKXm-l.js";import{t as n}from"./orderService-DvL_jJcA.js";function r(n){try{let r=t()?.whatsapp||`917874378413`;if(!r){e.error(`WhatsApp number is not set.`);return}window.open(`https://wa.me/${r}?text=${encodeURIComponent(n)}`,`_blank`)}catch(t){console.error(t),e.error(`Failed to open WhatsApp.`)}}function i(e){n({productId:e.id||``,productName:e.name||`Unknown Product`,price:e.discountPrice||e.price||0,image:e.image||``}).catch(e=>{console.error(`Failed to log order enquiry in database:`,e)}),r((t()?.whatsappMessageTemplate||`🛍️ Assalamu Alaikum,

I want to order this product.

━━━━━━━━━━━━━━━━━━━━

📦 Product: {productName}
💰 Price: {productPrice}
⭐ Rating: {productRating}

━━━━━━━━━━━━━━━━━━━━

Please share more details.

JazakAllahu Khair 🤍`).replace(`{productName}`,e.name||``).replace(`{productPrice}`,`₹${e.discountPrice||e.price}`).replace(`{productRating}`,`${e.rating||0} ⭐`))}export{r as n,i as t};