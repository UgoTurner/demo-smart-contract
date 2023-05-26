const $fileInput = document.getElementById("form-file");
const $previewBlock = document.getElementById("preview-block");
const $signButton = document.getElementById("wrapper-btn-sign");
const $errorMessage = document.getElementById("error-message");
const $successMessage = document.getElementById("success-message");

// Helpers:

const show = (elem) => {
    elem.style.display = 'block';
};

const hide = (elem) => {
    elem.style.display = 'none';
};

const initSignature = () => {
    hide($successMessage);
    hide($errorMessage);
    hide($signButton);
};

const enableSignature = () => {
    hide($errorMessage);
    show($signButton);
};

const disableSignature = () => {
    show($errorMessage);
    hide($signButton);
};

const showSignatureSuccess = () => {
    show($successMessage);
    hide($signButton);
};


// App:

var contract;
var base64;
var account;
var contractAddress = "";

window.addEventListener('load', async () => {
    if (window.ethereum) { // Injected by Metamask
        let web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, contractAddress); // ABI (Application Binary Interface) describes how to interact with the SC
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];

        return;
    }

    alert('Non-Ethereum browser detected');
});

$fileInput.addEventListener("change", () => {
    const reader = new FileReader();

    if (!$fileInput.files.length) {
        alert('No file uploaded');

        return false;
    }

    initSignature();

    reader.onload = () => {
        let data = reader.result;
        base64 = data.replace(/^[^,]*,/, '');

        let preview = "data:application/pdf;base64," + base64;
        document.getElementById("preview").data = preview;

        try {
            isDocumentSigned(base64, account).then(
                (isSigned) => {
                    if (!isSigned) {
                        enableSignature();

                        return;
                    }

                    disableSignature();
                });
        } catch (error) {
            console.log(error);
        }
    };

    reader.readAsDataURL($fileInput.files[0]);
    show($previewBlock);
});

$signButton.addEventListener("click", () => {
    sign(base64, account);
});

const isDocumentSigned = async (address, file) => {
    try {
        return contract.methods
            .isSignedBy(account, base64)
            .call({ from: account });

    } catch (error) {
        console.log(error);
    }
}

const sign = async (address, file) => {
    try {
        return contract.methods
            .sign(account, base64)
            .send({ from: account, gas: '1000000' })
            .then(
                (transaction) => {
                    console.log(transaction);
                    showSignatureSuccess();
                });
    } catch (error) {
        console.log(error);
    }
}