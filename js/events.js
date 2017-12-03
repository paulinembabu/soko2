/**
 * Created by p.
 */

var vm = new Vue({
    el: '#event',
    data: {
        name: [],
        description: [],
        isCartOpen: false,
        isCheckoutProcessing: false,
        isCheckingOut: false,
        checkoutPhone: '',
        events:[]

    },
    methods: {
      formatMoney: function (amount) {
        return 'Kshs. '+amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      toggleCheckout: function () {
        this.isCheckingOut = !this.isCheckingOut;
      },
        getEvents: function () {
            var self = this;
              var x = new FormData();
                x.append('function', 'getEvents');
             axios.post('https://test.ticketsoko.co.ke/api/index.php', x)
               .then(function (response) {
                    //store.commit('UPDATE_EVENT_LIST', response.data.data)
               this.events = response.data.data
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
    mounted() {
        this.getEvents();
        console.log(events);

    },
    //  mounted: function () {
    //     // alert(store.state.cart)
    // },
    created: function () {
        
    }
   }
})
