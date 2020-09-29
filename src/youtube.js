const youtube = require( 'ytdl-core' );

module.exports = {
    YOUTUBEplay: ( message, queue ) => {
        const channel = message.member.voice.channel;
        const args = message.content.split( ' ' );
        if ( !channel ){
            message.reply( 'Entre em um canal de voz para usar ess função.' );
            return;
        }
        if ( args[ 1 ] == undefined ) return;
        const connection = message.member.voice.channel.join();
        youtube.getBasicInfo( args[ 1 ] )
        .then( ( info ) => {
            const song = {
                tittle: info.videoDetails.title,
                url: info.videoDetails.video_url
            }
            message.reply( song.url );
            const { Adamastor } = require( './../bot' );
            const player = Adamastor.voice.createBroadcast( )
            youtube( song.url, { quality: 'highestaudio' } )
            .on( 'close', ( songFile ) => {
                player.play( songFile )
                .on( 'error', ( error ) => {
                    console.log( error );
                } );
                message.send( `Tocando ${song.tittle}` );
            } )
            .on( 'error', ( error ) => {
                console.log( error );
                return;
            } )
        } )
        .catch( ( error ) => {
            console.log( error );
            message.reply( 'Falha ao reproduzir o vídeo.' )
            return;
        } )
    }
}