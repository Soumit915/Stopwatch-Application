var modeOn = false;
var running = false;

laptime = 0;
stopwatchtime = 0;
lapnumber = 0;

function pad(n)
{
    var nstr = n.toString();
    if(nstr.length==2)
    {
        return nstr;
    }
    else return "0"+nstr;
}

$("document").ready(
    function(){

        $("#start-stop").click(function(){
            if(modeOn)
            {
                if(running)
                {
                    /*at this time the html is stop so stop the stopwatch and 
                    show resume and reset*/
                    clearInterval(interval);
                    running = false;

                    $("#start-stop").html("Resume");
                    $("#lap-reset").html("Reset");
                }
                else{
                    //at this time the html is resume so start the stopwatch and show stop and lap

                    interval = setInterval(function(){
                        laptime += 1;

                        var laptime_secs = Math.floor(laptime/100);
                        var laptime_millisecs = laptime%100;
                        var laptime_min = Math.floor(laptime_secs/60);
                        laptime_secs = laptime_secs%60;
    
                        stopwatchtime += 1;
                        var stopwatchtime_secs = Math.floor(stopwatchtime/100);
                        var stopwatchtime_millisecs = stopwatchtime%100;
                        var stopwatchtime_min = Math.floor(stopwatchtime_secs/60);
                        stopwatchtime_secs = stopwatchtime_secs%60;
                        
                        var laptime_str = pad(laptime_min) +":"+pad(laptime_secs)+":"+pad(laptime_millisecs);
                        var stopwatchtime_str = pad(stopwatchtime_min) +":"+pad(stopwatchtime_secs)+":"+pad(stopwatchtime_millisecs);
    
                        $("#cur-lap-timer").html(laptime_str);
                        $("#stopwatch-timer").html(stopwatchtime_str);
    
                        modeOn = true;
                        running = true;
    
                        $("#start-stop").html("Stop");
                        $("#lap-reset").html("Lap");
                    }, 10);
                    
                }
            }
            else{
                /*at this time the page is fresh and the stopwatch is 0:0 so 
                start the stopwatch and enable the lap*/
                lapnumber++;
                interval = setInterval(function(){
                    laptime += 1;
                    var laptime_secs = Math.floor(laptime/100);
                    var laptime_millisecs = laptime%100;
                    var laptime_min = Math.floor(laptime_secs/60);
                    laptime_secs = laptime_secs%60;

                    stopwatchtime += 1;
                    var stopwatchtime_secs = Math.floor(stopwatchtime/100);
                    var stopwatchtime_millisecs = stopwatchtime%100;
                    var stopwatchtime_min = Math.floor(stopwatchtime_secs/60);
                    stopwatchtime_secs = stopwatchtime_secs%60;
                    
                    var laptime_str = pad(laptime_min) +":"+pad(laptime_secs)+":"+pad(laptime_millisecs);
                    var stopwatchtime_str = pad(stopwatchtime_min) +":"+pad(stopwatchtime_secs)+":"+pad(stopwatchtime_millisecs);

                    $("#cur-lap-timer").html(laptime_str);
                    $("#stopwatch-timer").html(stopwatchtime_str);

                    modeOn = true;
                    running = true;

                    $("#start-stop").html("Stop");
                }, 10);
            }
        });

        $("#lap-reset").click(function(){
            if(modeOn)
            {
                if(running)
                {
                    /*at this time we will store the current lap time and reset the lap timer */
                    var laptime_secs = Math.floor(laptime/100);
                    var laptime_millisecs = laptime%100;
                    var laptime_min = Math.floor(laptime_secs/60);
                    laptime_secs = laptime_secs%60;

                    var laptime_str = pad(laptime_min) +":"+pad(laptime_secs)+":"+pad(laptime_millisecs);

                    var laptimehtml = '<div class="lap-stats">'+
                                        '<div class="lap-round-container">'+
                                            '<div class="lap-html">Lap<span class="lap-number">'+lapnumber+'</span></div>'+
                                        '</div>' +
                                        '<div class="lap-timing-container">'+
                                            '<div class="lap-timing">'+laptime_str+'</div>'+
                                        '</div>' + 
                                       '</div>';

                    var laphistory = document.getElementById("lap-history");
                    laphistory.style.display = "block";
                    $(laptimehtml).prependTo("#lap-history");

                    laptime = 0;
                    lapnumber++;
                }
                else{
                    /*At this time the html is reset so simply reload the page */
                    location.reload();
                }
            }
            else{
                /*At this time nothing should happen, as the lap is apprently disabled 
                and you should print a nice message later on*/
                //$("#lap-reset").tooltip('show');
            }
        });
    }
);