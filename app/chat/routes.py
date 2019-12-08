import os

from flask import render_template, request, jsonify
from flask_login import login_required, current_user

from app import db, pusher_client
from app.chat import bp
from app.chat.filters import pretty_time
from app.models import Message


@bp.route('/')
@login_required
def index():
    messages = Message.query.limit(50).all()
    pusher_api = {
        'key': os.getenv('PUSHER_KEY'),
        'cluster': os.getenv('PUSHER_CLUSTER'),
    }
    return render_template('chat/team_chat.html', messages=messages, pusher_api=pusher_api)


@bp.route('/message', methods=['POST'])
@login_required
def message():
    nm = Message(message=request.form.get('message'), user=current_user)
    db.session.add(nm)
    db.session.commit()

    new_message = {
        'username': nm.username,
        'message': nm.message,
        'date': pretty_time(nm.date),
    }
    pusher_client.trigger('chat-channel', 'new-message', new_message)
    return jsonify({'result': 'success'})
