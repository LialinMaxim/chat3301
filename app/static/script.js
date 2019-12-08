$(function () {

    let username = JSON.parse($("#current_user").data("username"));
    let pusher_key = JSON.parse($("#pusher_key").data("key"));
    let pusher_cluster = JSON.parse($("#pusher_cluster").data("cluster"));

    $('#chat_btn').on('click', function () {

        let message = $('#chat_text').val();

        $.post('/message', {'message': message}, function () {
            $('#chat_text').val('');
        });

    });

    var pusher = new Pusher(pusher_key, {
        cluster: pusher_cluster,
        encrypted: true
    });

    var channel = pusher.subscribe('chat-channel');

    channel.bind('new-message', function (data) {

        let name = data.username;
        let message = data.message;
        let message_date = data.date;

        let message_left = `<div class="media w-50 mb-3"><img
          src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" 
          alt="user" width="50" class="rounded-circle">
            <div class="media-body ml-3">
              <div class="bg-light rounded py-2 px-3 mb-2">
                <strong>${name}</strong>
                <p class="text-small mb-0 text-muted">${message}</p>
              </div>
            <p class="small text-muted">${message_date}</p>
            </div>
          </div>`;

        let message_right = `<div class="media w-50 ml-auto mb-3">
                               <div class="media-body">
                                 <div class="bg-primary rounded py-2 px-3 mb-2">
                                   <p class="text-small mb-0 text-white">${message}</p>
                                 </div>
                                 <p class="small text-muted">${message_date}</p>
                               </div>
                             </div>`;

        if (username === name) {
            $('#content').append(message_right).scrollTop(10000);
        } else {
            $('#content').append(message_left).scrollTop(10000);

        }

    });

});