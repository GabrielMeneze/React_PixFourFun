let produtos = [
    {
        name: 'botao1',
        price: 17.99,
        qtd: 6,
        inCart: 0
    },
    {
        name: 'botao2',
        price: 21.99,
        qtd: 6,
        inCart: 0
    },
    {
        name: 'botao3',
        price: 26.99,
        qtd: 6,
        inCart: 0
    }
]

let carts = document.querySelectorAll('.btn');

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartsnumber(produtos[i]);
        custoTotal(produtos[i]);
    })
}

function cartsnumber(produto) {
    let productnumber = localStorage.getItem('cartNumber');

    productnumber = parseInt(productnumber);

    if (productnumber) {
        localStorage.setItem('cartNumber', productnumber + 1);
    } else {
        localStorage.setItem('cartNumber', 1);
    }

    setItems(produto);
}

function setItems(produto) {
    let cartItems = localStorage.getItem('produtoinCart');
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
        if (cartItems[produto.name] == undefined) {
            cartItems = {
                ...cartItems,
                [produto.name]: produto
            }
        }
        cartItems[produto.name].inCart += 1;
    } else {
        produto.inCart = 1;
        cartItems = {
            [produto.name]: produto
        }
    }

    localStorage.setItem('produtoinCart', JSON.stringify(cartItems))
}

function custoTotal(produto) {
    // console.log('o preco é', produto.price);

    let custo = localStorage.getItem('custoTotal');
    console.log('my cart cost is: ', custo);
    console.log(typeof custo);
        
    if (custo != null) {
        custo = parseInt(custo);
        localStorage.setItem('custoTotal', custo + produto.price);
    } else{
        localStorage.setItem('custoTotal', produto.price);
    }

}

