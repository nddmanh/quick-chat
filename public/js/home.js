let socket = io();
let i = 1
function sendMessage(e) {
    if (e.which === 13 || e.type === "click") {
        let inputChat = $("#input-chat");
        let msg = inputChat.val();
        if (msg.trim() != "") {
            let message = `
                <div class="my-chat">${msg}</div>
            `;
            $("#chats").append(message);
            niceScrollChat();
            socket.emit("send-message", msg);
            inputChat.val("");
            i++;
        }
    }
}

function niceScrollChat() {
    $('#chats').scrollTop(100 + i * 30);
}

$(document).ready(function () {
    $("#input-chat").bind("keypress", sendMessage);
    $("#btn-send").bind("click", sendMessage);

    socket.on("user-online", function() {
        let message = `
            <div class="client-chat"> Ngừi iu bạn đã online :3 </div>
        `;
        $("#chats").append(message);
        i++;
        niceScrollChat();
    });

    socket.on("user-offline", function() {
        let message = `
            <div class="client-chat">  Ngừi iu bạn đã offline :< </div>
        `;
        $("#chats").append(message);
        i++;
        niceScrollChat();
    });

    socket.on("response-msg", function(msg) {
        let message = `
            <div class="client-chat"> ${msg} </div>
        `;
        $("#chats").append(message);
        i++;
        niceScrollChat();
    })
});