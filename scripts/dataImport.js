define(function(){
    return function(filename){
        var thedata;
        $.ajax({
            async: false,
            dataType: "json",
            url: "datas/"+filename+".json",
            data: {},
            success: function(data){
                thedata = data;
            }
        });
        return thedata;
    };
});