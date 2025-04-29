var generateBtn = document.getElementById('generate-btn');
var passwordOutput = document.getElementById('password-output');
var downloadBtn = document.getElementById('download-btn');
var copyBtn = document.getElementById('copy-btn');
var vaultroDownloadBtn = document.getElementById('vaultro-download-btn'); // Download button reference

var upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lowerCase = 'abcdefghijklmnopqrstuvwxyz';
var specialChars = '!@#$%^&*()-_=+[{]}|;:",<.>/?';

function generateSecurePassword(length) {
    var allChars = upperCase + lowerCase + specialChars;
    var password = '';
    var availableChars = allChars.split('');

    for (var i = 0; i < length; i++) {
        var randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        var randomIndex = randomBuffer[0] % availableChars.length;
        password += availableChars[randomIndex];
    }
    return password;
}

generateBtn.addEventListener('click', function() {
    var password = generateSecurePassword(50);
    passwordOutput.value = password;
    autoResize(passwordOutput);
});

downloadBtn.addEventListener('click', function() {
    if (passwordOutput.value.trim() === '') {
        alert('Please generate a password first.');
        return;
    }
    var blob = new Blob([passwordOutput.value], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'password.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

copyBtn.addEventListener('click', function() {
    if (passwordOutput.value.trim() === '') {
        alert('Nothing to copy!');
        return;
    }
    passwordOutput.select();
    document.execCommand('copy');
    copyBtn.textContent = "Copied";
    setTimeout(function() {
        copyBtn.textContent = "Copy";
    }, 1500);
});

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// 🔽 Updated: Vaultro Redirect Button Functionality (opens in new tab)
vaultroDownloadBtn.addEventListener('click', function () {
    window.open('https://drive.google.com/file/d/1ivzYa4sZP4iIWO2ZwX-RNlwh2IiNBYEd/view?usp=drive_link', '_blank'); // Replace with your actual link
});

// About modal logic
var aboutBtn = document.getElementById('about-btn');
var aboutModal = document.getElementById('about-modal');
var closeBtn = aboutModal.querySelector('.close');

aboutBtn.addEventListener('click', function () {
    aboutModal.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    aboutModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == aboutModal) {
        aboutModal.style.display = 'none';
    }
});
