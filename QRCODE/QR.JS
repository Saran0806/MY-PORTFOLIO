const frm=document.querySelector('#frm');
const output=document.querySelector('#output');
const Spinner=document.querySelector('#LOADING');
const qrcodeElement = document.querySelector('#qrcode'); 
const saveButton = document.querySelector('#save');

function generateQRCode(e) {
    e.preventDefault();
    const url = document.querySelector('#url').value;
    const size = document.querySelector('#size').value;
    const colorDark = document.querySelector('#colordark').value;
    const colorLight = document.querySelector('#colorlight').value;
    if (url=="") {
        alert("Please enter a URL");
    } else {
        Spinner.style.display='flex'
        setTimeout(() => {
            Spinner.style.display='none'
            document.querySelector('#qrcode').innerHTML = '';
            const qrcode = new QRCode('qrcode', {
                text: url,
                width: size,
                height: size,
                colorDark: colorDark,
                colorLight: colorLight,
                correctLevel: QRCode.CorrectLevel.H
            });
        }, 1000);
    }
}
frm.addEventListener("submit", generateQRCode);
saveButton.addEventListener("click", function() {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'qrcode.png';
        link.click();
    }
});