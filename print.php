<?php
 $sale_no = $_GET['no'];
 ?>
 <!DOCTYPE html>
 <head>
     <meta charset="utf-8">
     <meta name="viewport"
           content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
     <title>TicketSoko</title>
     <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700%7COpen+Sans" rel="stylesheet"
           type="text/css">
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
           integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
     <link rel="stylesheet" href="main.css">
     <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet">
     <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
     <link rel="stylesheet" href="css/reset.css"> <!-- CSS reset -->
     <link rel="stylesheet" href="css/styless.css"> <!-- Resource style -->
     <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
     <link rel="stylesheet" href="style3.css">
     <link href="https://fonts.googleapis.com/css?family=Bree+Serif" rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

 </head>
 <body>

 <nav class=" navbar-default navbar-fixed-top" style="background-color:#f2f2f2;">

      <ul>
          <img class="logo" src="img/logoo.png" alt="logo" style="height: 100px; float: right; ">
       </ul>

 </nav>
<section class="events text-center">
 <div class="container-fluid" id="print">

   Printing ticket no <?php echo $sale_no; ?>

   <br/>
   <br/>

 </div>
 </section>

 <!-- SUBSCRIBE -->
 <section class="subscribe text-center">
     <div class="subscribe__container container">
         <div class="subscribe__row row">
             <div class="col-md-12">
                 <h2>Subscribe to get the latest events</h2>
             </div>
         </div>
         <div class="subscribe__row row">
             <div class="subscribe__form col-md-6 col-md-offset-3">
                 <form action="#" class="input-group">
                     <input type="email" placeholder="Your email" class="form-controls">
                     <div class="input-group-btn">
                         <button type="submit" class="btn btn--primary">Subscribe</button>
                     </div>
                 </form>
             </div>
         </div>
     </div>
 </section>

 <!-- FOOTER -->
<br><br>
        <div class="footer__copyright col-md-12 col-lg-4">
          <span>&copy; 2017 Ticket Soko. All rights reserved</span>
        </div>

        <div class="footer__navigation col-md-12 col-lg-8">

          <ul class="list-inline list-unstyled text-right text-uppercase">

            <li>
              <div id="contact">Contact</div>

              <div id="contactForm">

                <h1>Keep in touch!</h1>
                <small>I'll get back to you as quickly as possible</small>

                <form action="send-contact.php" class="contact-form" name="contact-form" method="post">
                  <!-- <div class="row"> -->
                    <div class="col-sm-6">
                      <input type="text" name="name" required="required" placeholder="Name*">
                    </div>
                    <!-- <div class="col-sm-6"> -->
                      <input type="email" name="email" required="required" placeholder="Email*">
                    <!-- </div> -->
                    <div class="col-sm-6">
                      <input type="text" name="subject" placeholder="Subject">
                    </div>

                    <div class="col-sm-12">
                      <textarea name="message" required cols="30" rows="7" placeholder="Message*"></textarea>
                    </div>
                    <div class="col-sm-12">
                      <input type="submit" name="submit" value="Send Message" class="btn cd-add-to-cart">
                    </div>
                  <!-- </div> -->
                </form>
              </div>
            </li>
            <li><a href="#">About us</a></li>
            <li><a href="tcs.html">Terms of service</a></li>
            <li><a href="www.twitter.com/nouvltd" class="fa fa-twitter"></a></li>

        </div>
        <!-- FOOTER NAVIGATION END -->


      </div>
    </div>
    <!-- COPYRIGHT -->

    <!-- COPYRIGHT END -->
  </footer>
  <!-- FOOTER END -->

 <!-- FOOTER END -->


 <!-- SCRIPTS -->
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 <script
         src="https://code.jquery.com/jquery-3.2.1.min.js"
         integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
         crossorigin="anonymous"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <script src="https://unpkg.com/vue"></script>
 <script src="https://unpkg.com/vuex@2.0.0"></script>
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 <script src="jspdf.min.js"></script>
 <script src="qr.js"></script>
 <script src="app.js"></script>
 <script src="store.js"></script>
 <script src="print.js"></script>

 <script src="https://use.fontawesome.com/97ec197995.js"></script>
 <!-- <script src="js/checkout.js"></script>
  <script src="js/search.js"></script>-->
 <script>
 $(function() {
   vm.getSale("<?php echo $sale_no; ?>");
  });
     if (!window.jQuery) document.write('<script src="js/jquery-3.0.0.min.js"><\/script>')
 </script> <!-- Resource jQuery -->

 </body>

 </html>
