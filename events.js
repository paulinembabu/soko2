var vm = new Vue({
    el: '#events',
    data: {
        name: [],
        description: [],
        isCartOpen: false,
        isCheckoutProcessing: false,
        isCheckingOut: false,
        checkoutPhone: ''


    },
    methods: {
        formatMoney: function (amount) {
            return 'Kshs. ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        toggleCheckout: function () {
            this.isCheckingOut = !this.isCheckingOut;
        },
        checkout: function () {
            var self = this;

            var cart = JSON.stringify(store.state.cart);
            if (this.checkoutPhone.length === 0) {
                alert('Enter your phone number.');
                return;
            }
            self.isCheckoutProcessing = true;
            //https://ticketpay.wizhub.co.ke/ticket-pay-api/public/api/frontend
            //axios.post('http://test.nouveta.tech/ticketSoko/public/api/frontend/checkout', {
            axios.post('http://ticketpay.wizhub.co.ke/ticket-pay-api/public/api/frontend/checkout', {
                cart: cart,
                phone: this.checkoutPhone
            })
            //   axios.post('http://localhost:8086/api/frontend/checkout', {cart: cart, phone: this.checkoutPhone})
                .then(function (response) {
                    self.isCheckoutProcessing = false;
                    self.isCartOpen = false;
                    self.checkoutPhone = '';
                    alert('Your order has been received. Thank you.');
                    store.commit('CLEAR_CART');
                    // console.log(response);
                    //self.generateTicket(response.data);
                })
                .catch(function (error) {
                    self.isCheckoutProcessing = false;
                    // console.log(error);
                });

        },
        cardCheckout: function () {
            var self = this;

            var cart = JSON.stringify(store.state.cart);
            if (this.checkoutPhone.length === 0) {
                alert('Enter your phone number.');
                return;
            }
            self.isCheckoutProcessing = true;
            axios.post('https://ticketsoko.co.ke/ticket-pay-api/public/api/frontend/cardCheckout', {
                cart: cart,
                phone: this.checkoutPhone
            })
                .then(function (response) {
                    self.isCheckoutProcessing = false;
                    self.isCartOpen = false;
                    self.checkoutPhone = '';
                    var data = response.data.data;
                    var order_info = data.order_number;
                    var amount = data.amount;

                    $("#order_info_card").val(order_info);
                    $("#amt").val(amount);
                    $("#card").submit();
                    alert('Your order has been received. Thank you.');
                    store.commit('CLEAR_CART');
                    // console.log(response);
                    //self.generateTicket(response.data);
                })
                .catch(function (error) {
                    self.isCheckoutProcessing = false;
                    // console.log(error);
                });
        },
        generateTicket: function (sale) {
            var doc = new jsPDF();

            var y = 25;
            var tickets = 0;
            for (var i = 0; i < sale.ticket_sales.length; i++) {
                var ticket_sale = sale.ticket_sales[i];
                var ticket = ticket_sale.ticket;
                var event_ticket = ticket.event_ticket;
                var ticket_option = event_ticket.ticket_option;
                var event = event_ticket.event;

                var qr = new QRious();
                qr.set({
                    background: 'black',
                    backgroundAlpha: 1,
                    foreground: 'white',
                    foregroundAlpha: 1,
                    level: 'H',
                    padding: 25,
                    size: 500,
                    value: ticket.ticket_number
                });

                var imgData = qr.toDataURL('image/jpeg');
                doc.setFont('arial');
                doc.setFontSize(20);

                doc.setFontStyle('bold');
                doc.text(10, y - 10, event.name);
                doc.setFontStyle('regular');

                doc.setFontSize(14);

                doc.text(10, y + 5, 'Validity:');
                doc.setFontStyle('bold');
                doc.text(40, y + 5, '24th - 26th July');
                doc.setFontStyle('regular');

                doc.text(10, y + 15, 'Class: ');
                doc.setFontStyle('bold');

                doc.text(40, y + 15, ticket_option.name);
                doc.setFontStyle('regular');

                doc.text(10, y + 25, 'Amount:');
                doc.setFontStyle('bold');
                doc.text(40, y + 25, 'Kshs. ' + ticket_sale.amount);
                doc.setFontStyle('regular');

                doc.text(10, y + 35, 'Ticket No:');
                doc.setFontStyle('bold');
                doc.text(40, y + 35, ticket.ticket_number);

                doc.addImage(imgData, 'JPEG', 150, y - 5, 40, 40);
                doc.text(10, y + 45, '................................................................................................................................................')
                if (tickets === 3) {
                    tickets = 0;
                    y = 20;
                    doc.addPage();
                } else {
                    tickets++;
                    y += 70;
                }
            }
            doc.autoPrint();
            doc.save(sale.order_number + '.pdf');
        },
        removeTicketOption: function (cartItem) {
            store.commit('REMOVE_CART_TICKET_OPTION')
            if (!this.hasTickets(cartItem)) {
                this.removeCartEvent(cartItem)
            }
        },
        removeCartEvent: function (event) {
            store.commit('REMOVE_CART_EVENT', event)
        },
        hasTickets: function (event) {
            for (let option of event.options) {
                if (option.selected) {
                    return true
                }
            }

            return false;
        },
        getEvents: function () {
            var self = this;
            axios.get('https://ticketpay.wizhub.co.ke/ticket-pay-api/public/api/frontend/events')
            //axios.get('http://test.nouveta.tech/ticketSoko/public/api/frontend/events')
            //axios.get('http://localhost:8088/api/frontend/events')
                .then(function (response) {
                    store.commit('UPDATE_EVENT_LIST', response.data.data)
                })
                .catch(function (error) {
                    console.log(error)
                })

        },

        // getMerchandises: function () {
        //     var self = this;
        // axios.post('https://ticketpay.wizhub.co.ke/ticket-pay-api/public/api/frontend/events')
        //     .then(function (response) {
        //             var resps = response.data.data;
        //             foreach(resp in resps){
        //                 store.commit('UPDATE_MERCHANDISE_LIST', res.merchandises)
        //             }
                    


        //         })
        //         .catch(function (error) {
        //             console.log(error)
        //         })

        // },

        buyTicket: function (event) {
            store.commit('ADD_TICKET_TO_CART', event)
        },
        showBuyModal: function (event) {
            // document.getElementById(event.id).style.display = 'block'
        },
        hideBuyModal: function (event) {
            // document.getElementById(event.id).style.display = 'none'
        },
        optionChanged: function (option) {
            var eventTickets = option.event_tickets
            for (var eventTicket of eventTickets) {
                if (eventTicket.ticket_option_id === parseInt(option.ticket_option_id)) {
                    option.selected = true
                    option.unit_price = option.event_tickets.amount
                    return
                }
            }
            option.selected = false
            option.unit_price = 'No tickets.'
        },
        addToCart(option) {

        },

        quantityChanged: function (option) {
            if (option.ticket_option_id === 0) {
                return 0.00
            }
            var eventTickets = option.event_tickets
            for (var eventTicket of eventTickets) {
                if (eventTicket.ticket_option_id === parseInt(option.ticket_option_id)) {
                    option.selected = true
                    return
                }
            }
            return 'No tickets.'
        },
        getTicketTotal: function (option) {
            var eventTickets = option.event_tickets
            option.selected = true
            return
            if (option.selected) {
                for (var eventTicket of eventTickets) {
                    if (eventTicket.ticket_option_id === parseInt(option.ticket_option_id)) {
                        option.unit_price = eventTicket.amount
                        return unit_price * option.quantity
                    }
                }
            }

            return 'No tickets.'
        },
        addTicketsCart: function (event) {
            store.commit('ADD_TICKET_TO_CART', event)
            // document.getElementById(event.id).style.display = 'none'
        },
        getEventTotal: function (cartItem) {
            var total = 0.00
            for (var eventTicket of cartItem.options) {
                if (eventTicket.selected) {
                    total += (eventTicket.quantity * eventTicket.unit_price)
                }
            }
            return total
        },
        hasTicketOption: function (cartItem, option_id, option) {
            var index = 0;
            if (option === 'Seasonal') {
                index = 1;
            }
            for (var eventTicket of cartItem.options[index].event_tickets) {
                if (eventTicket.ticket_option_id === option_id) {
                    return true;
                }
            }
            return false;
        },

        isOptionSoldOut: function (cartItem, option_id, option) {
            var index = 0;
            if (option === 'Seasonal') {
                index = 1;
            }
            for (var eventTicket of cartItem.options[index].event_tickets) {
                if (eventTicket.ticket_option_id === parseInt(option_id)) {
                    if (eventTicket.available) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            return true;
        },


        ticketOptionPrice: function (cartItem, option_id, option) {
            var index = 0;
            if (option.title === 'Seasonal') {
                index = 1;
            }
            for (var eventTicket of cartItem.options[index].event_tickets) {
                if (eventTicket.ticket_option_id === parseInt(option_id)) {
                    if (eventTicket.available) {
                        return eventTicket.amount;
                    } else {
                        return 'Sold out';
                    }
                }
            }
            return 'No tickets';
        },
        selectTicket: function (cartItem, option) {
            var index = 0;
            if (option === 'Seasonal') {
                index = 1;
            }
            cartItem.options[index].selected = cartItem.options[index].ticket_option_id !== 0;
            if (cartItem.options[index].selected) {
                // alert(this.ticketOptionPrice(event, event.options[index].ticket_option_id, option));
                cartItem.options[index].unit_price = this.ticketOptionPrice(cartItem, cartItem.options[index].ticket_option_id, option);
            }
        },
        ticketOptionTitle(option_id) {
            option_id = parseInt(option_id);
            switch (option_id) {
                case 1:
                    return 'Regular';
                case 2:
                    return 'VIP';
                default:
                    return 'VVIP';
            }
        },
        getTotal() {
            var tickets = this.cartItems;
            var total = 0;
            for (var i = 0; i < tickets.length; i++) {
                total += this.getEventTotal(tickets[i]);
            }
            return total;
        }
    },
    mounted: function () {
        //alert(store.state.cart)
    },
    created: function () {
        this.getEvents()
        var cart = JSON.parse(window.localStorage.getItem('cart'))
        if (cart === null) {
            cart = {
                tickets: [],

            }
        }

        store.commit('RESTORE_CART', cart)
    },
    computed: {
        events() {
            return store.state.events
        },
        cartItems() {
            return store.state.cart.tickets
        },
       merchandises() {
            return store.state.merchandises
        },
        cartCount() {
            return store.state.cart.length
        },
        itemTotal(cartItem) {
            return 0.00
        }

    }
})
