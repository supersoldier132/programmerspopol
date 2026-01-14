const fs = require('fs');  //FileSync
const main_view = fs.readFileSync('./main.html');
const tennisShopMain_view = fs.readFileSync('./TennisShop/tennisShopMain.html');
const orderlist_view = fs.readFileSync('./TennisShop/orderlist.html');

const mariadb = require('./database/connect/mariadb.js');

function main(response) {
    console.log('main');

    response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
    response.write(main_view); //본문 설정
    response.end(); //응답 종료
}

function tennisShopMain(response) {
    console.log('tennisShopMain');
    
    mariadb.query("SELECT * FROM product", function (err, rows) {
        console.log(rows);
    })
    
    response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
    response.write(tennisShopMain_view); //본문 설정
    response.end(); //응답 종료
}

function orderlist(response){
    console.log('orderlist');

    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query("SELECT * FROM orderlist", function (err, rows) {
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                + "<td>" + element.productId + "</td>"
                + "<td>" + element.orderDate + "</td>"
                + "</tr>");
});

response.write("</table>");
response.end();
    })
}

function tennisShop(response) {

    fs.readFile('./img/tennisShop.png', function (err, data){

    response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
    response.write(data); //본문 설정
    response.end(); //응답 종료
})
}

function redRacket(response) {

    fs.readFile('./TennisShop/img/redRacket.png', function (err, data){

    response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
    response.write(data); //본문 설정
    response.end(); //응답 종료
})
}

function blueRacket(response) {

    fs.readFile('./TennisShop/img/blueRacket.png', function (err, data){

    response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
    response.write(data); //본문 설정
    response.end(); //응답 종료
})
}

function blackRacket(response) {

    fs.readFile('./TennisShop/img/blackRacket.png', function (err, data){

    response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
    response.write(data); //본문 설정
    response.end(); //응답 종료
})
}

function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query("INSERT INTO orderlist VALUES(" + productId + ", '" + new Date().toLocaleDateString() + "');", function (err, rows) {
        console.log(rows);
    })

    response.write('order page');
    response.end();
}

function css(response) {
    fs.readFile('./main.css', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('CSS file not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        }
    });
}

function tennisShopCss(response) {
    fs.readFile('./TennisShop/tennisShopMain.css', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('CSS file not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        }
    });
}

let handle = {}; // key:value 쌍으로 이루어진 변수 상자, key가 이름 value가 값

handle['/'] = main;
handle['/main.css'] = css;
handle['/img/tennisShop.png'] = tennisShop;

handle['/TennisShop/order'] = order;
handle['/TennisShop/orderlist.html'] = orderlist;
handle['/TennisShop/tennisShopMain.html'] = tennisShopMain;
handle['/TennisShop/tennisShopMain.css'] = tennisShopCss;

/* image directory */
handle['/TennisShop/img/redRacket.png'] = redRacket;
handle['/TennisShop/img/blueRacket.png'] = blueRacket;
handle['/TennisShop/img/blackRacket.png'] = blackRacket;

exports.handle = handle;