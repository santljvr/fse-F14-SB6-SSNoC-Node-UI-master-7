function setupCall() {
    console.log('Loading call js');
    window.peer = new Peer( my_name, {
        host: document.domain,
        port: 9000,
        path: '/',
        debug: 3
    });

    navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    $('a.end-call').on('click', function(e) {
        e.preventDefault();

        console.log('ending call');
        if(typeof incomingCall != 'undefined' && incomingCall != null) {
            incomingCall.close();
        }
        if(typeof outgoingCall != 'undefined' && outgoingCall != null) {
            outgoingCall.close();
        }
        $('video').attr('src', '');
        $('div.call-controls').hide();
    });

    peer.on('open', function(id) {
        console.log('Peer: Connected with ID=', id);
    });

    peer.on('connection', function(dataConnection) {
        console.log('Connection event: ', dataConnection);
    });

    peer.on('call', function(c) {
        window.incomingCall = c;
        console.log('Receiving call from: ', incomingCall.peer);

        incomingCall.on('stream', function(remoteMediaStream) {
            console.log('Received remote stream:', remoteMediaStream);
            var vendorURL = window.URL || window.webkitURL;
            $('video.call-av-remote').attr('src', vendorURL.createObjectURL(remoteMediaStream));
            $('video.call-av-remote')[0].play();
            $('div.call-controls').show();
        });

        incomingCall.on('close', function() {
            console.log('Ended incoming call');
            $('video').attr('src', '');
            $('div.call-controls').hide();
        });

        var answered = window.confirm('Receiving call from: ' + incomingCall.peer + "\nAnswer?");
        if (answered) {
            window.setTimeout(function() {
                navigator.getUserMedia({
                    video: true,
                    audio: true
                }, function(localMediaStream) {
                    console.log('Received local stream', localMediaStream);
                    var vendorURL = window.URL || window.webkitURL;
                    $('video.call-av-local').attr('src', vendorURL.createObjectURL(localMediaStream));
                    $('video.call-av-local')[0].play();
                    incomingCall.answer(localMediaStream);
                }, function(err) {
                    console.log('Error retrieving local stream', err);
                });
            }, 1000);
        }
    });

    peer.on('close', function() {
        console.log('Peer: destroyed');
    });

    peer.on('disconnected', function() {
        console.log('Peer: disconnected');
    });

    peer.on('error', function(err) {
        console.log('Peer: error: ', err);
    });
}

function startOutgoingCall(callee) {
    console.log('Calling:', callee);
    navigator.getUserMedia({
        audio: true,
        video: true
    }, function(localMediaStream) {
        window.outgoingCall = peer.call(callee, localMediaStream);
        var vendorURL = window.URL || window.webkitURL;
        $('video.call-av-local').attr('src', vendorURL.createObjectURL(localMediaStream));
        $('video.call-av-local')[0].play();

        outgoingCall.on('stream', function(remoteMediaStream) {
            console.log('Received remote stream', remoteMediaStream);
            var vendorURL = window.URL || window.webkitURL;
            $('video.call-av-remote').attr('src', vendorURL.createObjectURL(remoteMediaStream));
            $('video.call-av-remote')[0].play();
            $('div.call-controls').show();
        });

        outgoingCall.on('close', function() {
            console.log('Ended outgoing call');
            $('video').attr('src', '');
            $('div.call-controls').hide();
        });

    }, function(err) {
        console.log('Error receiving local stream', err);
    });
}

window.addEventListener('touchstart', function() {
    Array.prototype.slice.call(document.getElementsByTagName('audio')).
        forEach(function(audio_tag) {
            audio_tag.load();
        });
});

