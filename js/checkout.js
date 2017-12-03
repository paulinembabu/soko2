/**
 * Created by cate on 7/10/17.
 */
var vm = new Vue({
    el: "#checkout",
    data: {
        isCartOpen: false,
        isCheckoutProcessing: false,
        checkoutPhone: ''
    },
    methods: {
        toggleCart: function () {
            this.isCartOpen = !this.isCartOpen
        },
        removeCartTickets: function (cartItem) {
            store.commit('REMOVE_FROM_CART_TICKET', cartItem)
        },
        getEventTotal: function (event) {
            var total = 0.00;
            for (var eventTicket of event.options) {
                if (eventTicket.selected) {
                    total += (eventTicket.quantity * eventTicket.unit_price);
                }
            }
            return total;
        },

        checkout: function () {
            var self = this;

            var cart = JSON.stringify(store.state.cart);
            if (this.checkoutPhone.length === 0) {
                alert('Enter your phone number.');
                return;
            }
            self.isCheckoutProcessing = true;
             //axios.post('http://test.nouveta.tech/ticketpay/ticket-pay-api/checkout', {cart: cart, phone: this.checkoutPhone})
        // axios.post('http://localhost:8086/api/frontend/checkout', {cart: cart, phone: this.checkoutPhone})
           // axios.post('http://139.59.163.223/ticket-pay/api/public/api/frontend/checkout', {cart: cart, phone: this.checkoutPhone}
            axios.post('https://ticketsoko.co.ke/ticket-pay-api/public/api/frontend/checkout', {cart: cart, phone: this.checkoutPhone}

                .then(function (response) {
                    self.isCheckoutProcessing = false;
                    self.isCartOpen = false;
                    self.checkoutPhone = '';
                    alert('Your order has been received. Thank you.');
                    store.commit('CLEAR_CART', response.data.data);
                    console.log(response);
                  //  self.generateTicket(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        generateTicket: function (sale) {
        //     var doc = new jsPDF();
        //
        //     var y = 25;
        //     var tickets = 0;
        //     for (var i = 0; i < sale.ticket_sales.length; i++) {
        //         var ticket_sale = sale.ticket_sales[i];
        //         var ticket = ticket_sale.ticket;
        //         var event_ticket = ticket.event_ticket;
        //         var ticket_option = event_ticket.ticket_option;
        //         var event = event_ticket.event;
        //
        //         var qr = new QRious();
        //         qr.set({
        //             background: 'white',
        //             backgroundAlpha: 1,
        //             foreground: 'black',
        //             foregroundAlpha: 1,
        //             level: 'H',
        //             padding: 25,
        //             size: 500,
        //             value: ticket.ticket_number
        //         });
        //
        //         var imgData = qr.toDataURL('image/jpeg');
        //         doc.setFont('arial');
        //         doc.setFontSize(20);
        //
        //         doc.setFontStyle('bold');
        //         doc.text(10, y - 10, event.name);
        //         doc.setFontStyle('regular');
        //
        //         doc.setFontSize(14);
        //
        //         doc.text(10, y + 5, 'Validity:');
        //         doc.setFontStyle('bold');
        //         doc.text(40, y + 5, '24th - 26th July');
        //         doc.setFontStyle('regular');
        //
        //         doc.text(10, y + 15, 'Class: ');
        //         doc.setFontStyle('bold');
        //
        //         doc.text(40, y + 15, ticket_option.name);
        //         doc.setFontStyle('regular');
        //
        //         doc.text(10, y + 25, 'Amount:');
        //         doc.setFontStyle('bold');
        //         doc.text(40, y + 25, 'Kshs. ' + ticket_sale.amount);
        //         doc.setFontStyle('regular');
        //
        //         doc.text(10, y + 35, 'Ticket No:');
        //         doc.setFontStyle('bold');
        //         doc.text(40, y + 35, ticket.ticket_number);
        //
        //         doc.addImage(imgData, 'JPEG', 150, y - 5, 40, 40);
        //         doc.text(10, y + 45, '................................................................................................................................................')
        //         if (tickets === 3) {
        //             tickets = 0;
        //             y = 20;
        //             doc.addPage();
        //         } else {
        //             tickets++;
        //             y += 70;
        //         }
        //     }
        //     doc.autoPrint();
        //     doc.save(sale.order_number + '.pdf');
        // }
    },
    computed: {
        cartItems () {
            return store.state.cart.tickets
        },
        cartCount () {
            return store.state.cart.tickets.length
        },
        itemTotal (cartItem) {
            return 0.00;
        }
    },
    created () {
        var cart = JSON.parse(window.localStorage.getItem('cart'));
        if (cart === null) {
            cart = {
                tickets: [],
                merchandises: []
            }
        }
        //cart = []
        store.commit('RESTORE_CART', cart)
    }
})
