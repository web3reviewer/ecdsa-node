
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
(async () => {
    const PRIVATE_KEY = "968e94b88838875cd5a74555c2cd96f8a9893a16f908f7352143b64f4f8a3e07";
    let message = {
        from: "04c546a8b319fe401b680f795047f5472a5cb6521a012b63ab0a6c92de2c5f522c987c17b6e7b3359c94b33a261eefeb701a501a1e57613ff07bce563b427084df",
        to: "048cf5078e2be58b50ffe47a85880bd2e3d67921b419fe4b79a019f63ec6472886359ab46118d7b7b11553ef399923c6d58e2bb10d6089aa7ca4b1317b0a37dab0",
        amount: 10,
    };
    console.log("Message : ", message);

    //TODO hash message
    const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
    console.log("Hashed Message : ", messageHash);


    //TODO sign message
    const [sig, recoveryBit]  = await secp.sign(messageHash, PRIVATE_KEY, {
        recovered: true
    });
    console.log("Signature : ", toHex(sig));
    console.log("Recovery Bit : ", recoveryBit);


})();