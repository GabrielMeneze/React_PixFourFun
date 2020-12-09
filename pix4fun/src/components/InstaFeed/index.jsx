import React from 'react';
import $ from 'jquery';

const InstaFeed = () => {
    return(
        <div id='instagram-feed3'>
        <script src="jquery.instagramFeed.min.js"></script>

        <script src="https://code.jquery.com/jquery-3.3.1.min.js" 
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" 
        crossorigin="anonymous"></script>
        <script src="jquery.instagramFeed.js"></script>

        <script>
            (function($){
                $(window).on('load', function () {
                    $.instagramFeed({
                        
                    });
                })
            })(jQuery);
    </script>

    <div id="instagram-feed-demo" class="instagram_feed"></div>

    </div>
    )
}

export default InstaFeed;