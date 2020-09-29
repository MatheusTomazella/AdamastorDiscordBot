const Discord       = require( 'discord.js' );
const { token }     = require( './config/DISCORDauth.json' );

const { CORNOpergunta, CORNOconfirm, HELP, HELPdev, CRIADOR, ERROR } = require( './responses/responses.json' );
const { choose, playBackground }    = require( './src/functions.js' );
const { YOUTUBEplay } = require('./src/youtube');

const Adamastor     = new Discord.Client( );

const YOUTUBEqueue = new Map();

Adamastor.login( token )
.then( ( ) => {
    console.log( 'Bot Logado' );
} )
.catch( ( error ) => {
    console.log( error );
} );

Adamastor.on( 'ready', ( ) => {
    console.log( 'Bot Rodando' );
} );

Adamastor.on( 'message', ( message ) => {
    if ( message.author.bot == true ) return;
    if ( message.content == 'ping' ) message.reply( 'pong!' );
    else if ( message.content.toLowerCase().search( ' corno' ) != -1 || message.content.toLowerCase().search( ' corna' ) != -1 ){
        if ( message.content.indexOf( '?' ) != -1 ) message.reply( choose( CORNOpergunta ) );
        else message.reply( choose( CORNOconfirm ) );
    } 
    else if ( message.content.toLowerCase().search( 'gustavo lima' ) != -1 ) message.reply( 'Nossa, ta louco para. Quer me infartar falando esse nome??' );
    else if ( message.content.substr( 0, 1 ) == '-' ){
        const command = message.content.toLocaleLowerCase().substr( 1 ).split( ' ' )[ 0 ];
        switch ( command ){
            case 'help':
                message.reply( HELP ); 
            break;
            case 'help-dev':
                message.reply( HELPdev );
            break;
            case 'criador':
                message.reply( CRIADOR )
            break;
            case 'teste':
                message.reply( 'Cala a boca ai corno. Chato pra caralho' );  
            break;
            case 'background':
                playBackground( message );
            break;
            case 'bg':
                playBackground( message );
            break;
            case 'spotify':
                message.reply( 'Tocando musica do link do Spotify' );
            break;
            case 'youtube':
                YOUTUBEplay( message, YOUTUBEqueue );
            break;
            case 'play':
                YOUTUBEplay( message, YOUTUBEqueue );
            break;
            case 'leave':
                message.member.voice.channel.leave();
                message.reply( 'Flw' );
            break;
            default:
                message.reply( ERROR )
            break; 
        }
    }
} );

module.exports = {
    Adamastor: Adamastor
}