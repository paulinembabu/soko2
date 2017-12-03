/**
 * Created by kevyn on 25/07/2017.
 */
// You'll need to make your image into a Data URL
// Use http://dataurl.net/#dataurlmaker

function generateTicket(sale) {

    var doc = new jsPDF();

    var y = 25;
    var tickets = 0;
    for (var i = 0; i < 4; i++) {

        var qr = new QRious();
        qr.set({
            background: 'white',
            backgroundAlpha: 1,
            foreground: 'black',
            foregroundAlpha: 1,
            level: 'H',
            padding: 25,
            size: 500,
            value: '1-B34HDGDG7' + i
        });

        var imgData = qr.toDataURL('image/jpeg');
        doc.setFont('arial');
        doc.setFontSize(20);

        doc.setFontStyle('bold');
        doc.text(10, y - 10, 'Blankets and Wines');
        doc.setFontStyle('regular');

        doc.setFontSize(14);

        doc.text(10, y + 5, 'Validity:');
        doc.setFontStyle('bold');
        doc.text(40, y + 5, '24th - 26th July');
        doc.setFontStyle('regular');

        doc.text(10, y + 15, 'Class: ');
        doc.setFontStyle('bold');
        doc.text(40, y + 15, 'VIP');
        doc.setFontStyle('regular');
        doc.text(10, y + 25, 'Amount:');
        doc.setFontStyle('bold');
        doc.text(40, y + 25, 'Kshs. 1000.00');
        doc.setFontStyle('regular');
        doc.text(10, y + 35, 'Ticket No:');
        doc.setFontStyle('bold');
        doc.text(40, y + 35, 'B34HDGDG');

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
    doc.save('ticket.pdf');
}
