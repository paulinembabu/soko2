/**
 * Created by cate on 7/5/17.
 */

var vm = new Vue({
    el: '#print',
    data: {
        name: [],
        description: [],
        isCartOpen: false,
        isCheckoutProcessing: false,
        isCheckingOut: false,
        checkoutPhone: '',
        merchandises: []

        // order: {tickets: [], merchandises: [], phone_no: '' }
    },
    methods: {
      getSale (no) {
        var self =this;
        //axios.get('http://localhost:8086/api/frontend/sales/'+no)
        axios.get('https://ticketsoko.co.ke/ticket-pay-api/public/api/frontend/sales/'+no)
           .then(function (response) {
                if(response.data.data !=null){
               self.generateTicket(response.data.data);
             }else {
               alert('Sale does not exist');
             }
           })
           .catch(function (error) {
               console.log(error);
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
        }
    },
    mounted: function () {
        // alert(store.state.cart)
    },
    created: function () {
    },
    computed: {
    }
})
