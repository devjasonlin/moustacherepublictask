{
    let displaySize = $('.selectedSize');
    let content = '';
    // this 'flags' makes sure the times of each of sizes for showing specific part on 'My Cart'
    // show specific part on when value is 1
    let flags = {
        'S' : 0,
        'M' : 0,
        'L' : 0
    }
    // 'total' is for showing total quantity of items added into cart
    let total = 0;

    // btnMyCartOne shows only when on mobile devices
    // this is for showing/hiding 'My Cart' by clicking
    $('#btnMyCartOne').on('click',()=>{
        $('.miniCartContianer').fadeToggle();
    })

    // btnMyCartTwo shows when on tablets or desktop
    // this is for showing 'My Cart' by mouse over
    $('#btnMyCartTwo').on('mouseover',()=>{
        $('.miniCartContianer').fadeIn();
    })

    // this closes 'My Cart'
    $('#btnClose').on('click',()=>{
        $('.miniCartContianer').fadeOut();
    })

    // this is one of three size options
    // this will check 'whether size has been selected before add to cart'
    // and update highlighted css rule to selected one
    $('#optionS').on('click', (e)=>{
        optionSelection(e, 'optionS');
        updateDisplaySize(content);
    })
    $('#optionM').on('click', (e)=>{
        optionSelection(e, 'optionM');
        updateDisplaySize(content);
    })
    $('#optionL').on('click', (e)=>{
        optionSelection(e, 'optionL');
        updateDisplaySize(content);
    })

    // this is for 'Add to Cart' button
    $('#btnAdd').on('click', (e)=>{
        // update flags
        flags[content] += 1;
        // check and update 'size* S/M/L' on screen
        checkSizeSelection(e);
        // update 'total'
        total = flags.S + flags.M + flags.L;
        // update & show 'total'
        $('#btnMyCartOne span').text('( ' + total + ' )');
        $('#btnMyCartTwo span').text('( ' + total + ' )');
        // check whehter need change display setting of specific cart item
        if(flags.S == 1){
            showCartItem('smallItem');
        }
        if(flags.M == 1){
            showCartItem('mediumItem');
        }
        if(flags.L == 1){
            showCartItem('largeItem');
        }
        // update cart item details
        updateCartItem();
    })

    // optionSelection is the function allows when each size option is been clicked
    // it will show as highlighted
    // and will remove other options' highlight
    // this function requires two arugments, e as option itself, selfID is optionID
    // and this function also gets size content as variable - content
    function optionSelection(e, selfID){
        content = selfID.substr(-1);
        let options = $('.optionsContainer a');
        if(!/optionSelected/ig.test(e.target.classList)){
            e.target.classList = 'optionSelected';
            for(let i = 0; i < options.length; i++){
                if(selfID != options[i].id){
                    options[i].classList = '';
                }
            } 
        }
    }

    // updateDisplaySize is for updating 'SIZE* [value]' on screen
    function updateDisplaySize(val){
        displaySize.text(val);
    }

    // checkSizeSelection checks whether size has been selected
    // if not, show the error message
    // if yes, and hide error message if need
    function checkSizeSelection(e){
        let options = $('.optionsContainer a');
        if(!/sizeNoticeDisplay/ig.test($('.sizeNotice')[0].classList)){
            $('.sizeNotice').addClass('sizeNoticeDisplay');
        }
        if(!(/optionSelected/ig.test(options[0].classList) || /optionSelected/ig.test(options[1].classList) || /optionSelected/ig.test(options[2].classList))){
            $('.sizeNotice').removeClass('sizeNoticeDisplay');
        }
    }

    // showCartItem shows specific cart item if it doesn't exist
    function showCartItem(val){
        $('#' + val).removeClass('displayNone');
    }

    // updateCartItem updates each item total price, and subtotal price to 'My Cart'
    function updateCartItem(){
        let smallTotal = flags.S * 75;
        let mediumTotal = flags.M * 75;
        let largeTotal = flags.L * 75;
        $('#smallNumber').text(flags.S);
        $('#smallTotal').text(smallTotal.toFixed(2));
        $('#mediumNumber').text(flags.M);
        $('#mediumTotal').text(mediumTotal.toFixed(2));
        $('#largeNumber').text(flags.L);
        $('#largeTotal').text(largeTotal.toFixed(2));
        $('#subTotal').text((smallTotal + mediumTotal + largeTotal).toFixed(2));
    }
}