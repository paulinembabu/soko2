// /**
//  * Created by P.
//  */
// //var eventsmodule = require(['js/modules/eventsmodule'])

// var store = new Vuex.Store({
//     state: {
//         events: [],
//         cart: {
//             tickets: [],
//             // merchandises: []
//         },
//     },
//     mutations: {
//         ADD_TICKET_TO_CART(state, event) {
//           var added = false;
//             for (var i = 0; i < state.cart.tickets.length; i++) {
//                 if (state.cart.tickets[i].id === event.id) {
//                     state.cart.tickets[i].unit_price = event.unit_price;
//                     state.cart.tickets[i].quantity = event.quantity;
//                     // window.localStorage.setItem('cart', JSON.stringify(state.cart))
//                     // return;
//                     added = true;
//                 }
//             }
//             if(!added){
//               state.cart.tickets.push(event);
//             }
//             added = false;
//              for (var i = 0; i < event.merchandises; i++) {
//                var merchandise = event.merchandises[i];
//                if(event.merchandises[i].selected_quantity >0 ) {
//                   added = false;
//                   for (var i = 0; i < state.cart.merchandises.length; i++) {
//                      var merchandiseCartItem = state.cart.merchandises[i];
//                      if(merchandiseCartItem.id === merchandise.id) {
//                        merchandiseCartItem.selected_quantity = merchandise.selected_quantity;
//                        merchandiseCartItem.total = merchandise.selected_quantity * merchandise.amount;
//                        added = true;
//                      }
//                   }
//                   if(!added) {
//                     state.cart.merchandises.push(merchandise);
//                   }
//                } else {
//                  for (var i = 0; i < state.cart.merchandises.length; i++) {
//                    var merchandiseCartItem = state.cart.merchandises[i];
//                    if(merchandiseCartItem.id === merchandise.id) {
//                      state.cart.merchandises.splice(i, 1);
//                    }
//                  }
//                }
//              }

//             window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         },
//         UPDATE_EVENT_LIST(state, events){
//             state.events = events;
//             console.log(events);
//         },
//         UPDATE_MERCHANDISE_LIST(state, merchandises){
//             state.merchandises = merchandises;
//         },
//         RESTORE_CART(state, cart){
//             state.cart = cart
//             window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         },
//         CLEAR_CART(state){
//             state.cart = {
//                 tickets: [],
//                 // merchandises: []
//             }
//           window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         },
//         REMOVE_FROM_CART_TICKET(state, event){
//             for (var i = 0; i < state.cart.tickets.length; i++) {
//                 if (state.cart.tickets[i].id === parseInt(event.id)) {
//                     state.cart.tickets.splice(i, 1);
//                 }
//             }
//             window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         },
//         REMOVE_CART_TICKET_OPTION (state, option) {
//             option.selected = false;
//             window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         },
//         REMOVE_CART_MERCHANDISE(state, merchandise){
//           // alert(JSON.stringify(merchandise));
//             for (var ticket of state.cart.tickets) {
//                 for(var i=0; i<ticket.merchandises.length; i++) {
//                   cartMerchandise = ticket.merchandises[i];
//                   if(cartMerchandise.id === merchandise.id) {
//                     ticket.merchandises.splice(i, 1);
//                   }
//                 }
//             }
//             window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         },
//         REMOVE_CART_EVENT(state, event){
//             for (var i = 0; i < state.cart.tickets.length; i++) {
//                 if (state.cart.tickets[i].id === parseInt(event.id)) {
//                     state.cart.tickets.splice(i, 1);
//                 }
//             }
//             window.localStorage.setItem('cart', JSON.stringify(state.cart))
//         }

//     },
//     getters: {
//         getItemTotal(cartItem){
//             return 0.00;
//         }
//     }
// })
