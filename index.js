const puppeteer = require('puppeteer');
const fs = require('fs/promises')
async function start(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.kapital-webshop.jp/category/MENSALL/');
    
    const clothes = await page.evaluate(()=>{
        const items = []
        const baseUrl = 'https://www.kapital-webshop.jp';
        document.querySelectorAll(".item_list_box").forEach(item =>{
            const nameElement = item.querySelector('.item_name a');
            const priceElement = item.querySelector('.item_price');
            const imageElement = item.querySelector('img'); // Selecting the image element
            const imageUrl = imageElement ? imageElement.src : 'No image URL';
            const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : baseUrl + imageUrl;
            items.push({ imageUrl: fullImageUrl, name: nameElement ? nameElement.textContent.trim() : 'No name',
                price: priceElement ? priceElement.textContent.trim() : 'No price'})
        });
        return items;

    });
    read(clothes)


    await browser.close();
    
}
function read(items){
    items.forEach(item => {console.log(`${item.imageUrl} ${item.name} - ${item.price}`)
    });

}
start()