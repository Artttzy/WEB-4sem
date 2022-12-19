$(function () {
    $('div.nav a').each(function () {
        var location = window.location.href;
        var link = this.href;
        if(location === link) {
            $(this).removeClass()
            $(this).addClass('active');
        }
    });
    $('div.nav a').hover(function () {
        $(this).removeClass()
        $(this).addClass('current')
    },
        function () {
            var location = window.location.href;
            var link = this.href;
            if(location === link) {
                $(this).removeClass()
                $(this).addClass('active')
            }
            else {
                $(this).removeClass()
                $(this).addClass('inactive')
            }
    });
});

(function () {
    window.startTime = new Date().getTime();
    window.addEventListener('load', function(){
        const load = document.getElementById("load_time");
        if (load) {
            load.innerText = 'Page load time is ' + ((new Date).getTime() - window.startTime)/1000 + ' seconds';
        }
    });
})();

