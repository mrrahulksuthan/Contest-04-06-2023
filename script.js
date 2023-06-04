function getMenuList() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
    .then(response => response.json())
    .then(data => {
        const menuList = document.getElementById('listOfMenu');
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.name} - $${item.price}`;
            menuList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function payTheOrderNow() {
    return new Promise(resolve => {
        setTimeout(() => {
            const orderStatus = { order_status: true, paid: true };
            resolve(orderStatus);
        }, 1000);
    });
}

function preparationOfOrderOngoing() {
    return new Promise(resolve => {
        setTimeout(() => {
            const orderStatus = { order_status: true, paid: false };
            resolve(orderStatus);
        }, 1500);
    });
}

function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const burgers = ['Cheeseburger', 'Pizza', 'Tacos'];
            const order = { burgers: burgers };
            resolve(order);
        }, 2500);
    });
}

async function ordertheFood() {
    const orderButton = document.querySelector('button');
    orderButton.disabled = true;

    const order = await takeOrder();
    const statusDiv = document.getElementById('respond');
    statusDiv.innerText = 'Took Orders: ' + order.burgers.join(', ');

    const orderStatus = await preparationOfOrderOngoing();
    statusDiv.innerText += '\nOrder status: ' + orderStatus.order_status;

    const paymentStatus = await payTheOrderNow();
    statusDiv.innerText += '\nStatus of Payment: ' + paymentStatus.paid;

    if (paymentStatus.paid) {
        alert('Anyway thanks for having food with ElClassiCo!!!');
    }

    orderButton.disabled = false;
}