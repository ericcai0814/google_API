$(function(){
    $.ajax({
        // Request URL
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-283C4C44-15D9-42D6-88E5-DD1A84B2DD9F&format=JSON&locationName=%E4%B8%AD%E6%AD%A3%E5%8D%80&elementName=T",
        method: "GET",
        dataType: "JSON",
        // data: post才會用到
        
        success:function(res){ // 接受抓到的資料
            console.log(res.records.locations[0].locationsName); // 台北市
            console.log(res.records.locations[0].location[0].locationName); // 中正區 
            console.log(res.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value); // 平均温度
            console.log(res);

            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const html1 = `<div class="d-flex flex-column block"><small class="text-muted mb-0">`;
            const html2 = `</small><div class="text-center"><img class="symbol-img" src="`;
            const html3 = `"></div><h6><strong>`;
            const html4 = `&#176;</strong></h6></div>`;

            // const html = `
            //     <div class="d-flex flex-column block first-block">
            //         <small class="text-muted mb-0">${week[j]}</small>
            //         <div class="text-center"><img class="symbol-img" src=${icon}></div>
            //         <h6><strong>${degree}&#176;</strong></h6>
            //     </div>
            // `
            let week_html = ""; // 儲存所有迴圈的 HTML

            $("#city_name").html(res.records.locations[0].locationsName); // 台北市
            $("#district").html(res.records.locations[0].location[0].locationName); // 中正區
            $("#tempture").html(res.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value + "&#176"); // 平均温度

            let j = 0;
            for (var i = 1; i < 10; i += 2) {
                let degree = res.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
                console.log(degree);
                icon = (degree > 18) ? "https://i.imgur.com/Shrg84B.png" : "https://i.imgur.com/BeWfUuG.png";
                if (j < 5) {
                    // week_html += html;
                    week_html += html1 + week[j] + html2 + icon
                    week_html += html3 + degree + html4;
                };


                j++;
            }
            console.log(week_html);
            $('#weekday').html(week_html);





        },

        error:function(err){
            console.log(err)
        },
    });
})