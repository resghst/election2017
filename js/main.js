$(document).ready(function() {
  $('.carousel').carousel({
    interval: 10000
  });

  var loaded = new Promise(function (resolve) {
    gapi.load('client', resolve);
  });
  function init() {
    // console.log("start init.");
    return gapi.client.init({
      'apiKey': 'AIzaSyCzE2xaTSiKph-CspAZENcqZtMkE4scyVQ',
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });
  }
  function query() {
    // console.log("start query.");
    return gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: '1L8rYTwksWJqJfH1lUsqJovECNcS8g7_g_hoSVbT1TiU',
      ranges: [
        'sheet1!A2:J',
        'sheet2!A2:J',
        'sheet3!A2:J'
      ]
    });
  }
  function aggregate(resp) {
    // console.log("start aggregate.");
    var albums = [];
    resp.result.valueRanges.forEach(function(sheet) {
      sheet.values.forEach(function(row) {
        albums.push({
          '照片': row[0],
          '姓名': row[1],
          '性別': row[2],
          '系別': row[3],
          '年級': row[4],
          '經歷': row[5],
          '政見_1': row[6],
          '政見_2': row[7],
          '類別': row[8],
          '組數': row[9]
        })
      });
    });
    return albums;
  }
  loaded.then(init).then(query).then(aggregate).then(function(albums) {
    // console.log(albums);
    $.each(albums , function(ik , iv) {
      var a= "";
      $.each(iv , function(jk , jv) {
        var i=iv['組數'];
        // console.log(i);
        switch(jk){
          case '類別':
            //console.log('ininder');
            switch(jv){
              case '0':
                // console.log('gg ' + jv);
                $('.leader.carousel-inner').append(a);
                break;
              case '1':
                // console.log('inin ' + jv);
                $('.studentrepresent.carousel-inner').append(a);
                break;
              case '2':
                // console.log('der ' + jv);
                $('.departmentscienceintrotitle.carousel-inner').append(a);
                break;
            }
            break;
          case '姓名':
            a= a + '<p>' + jv ;
            break;
          case '性別':
            a= a + '　' + jv + '</p>';
            break;
          case '系別':
            a= a + '<p>' + jv + '</p>';
            break;
          case '年級':
            a= a + '<p>' + jv　 + '年級</p></div><div class="context col-md-8"><div class="bline col-md-4"><p class="title">經　歷　：</p></div><div class="bline col-md-6"><p class="title">政　見　：</p></div>';
            break;
          case '照片':
            if(i==-1){
              a = a + '<div class="item "><div class="card"><div class="picture col-md-4"><img src="' + jv + '.jpg">';
            }
            else{
              a = a + '<div class="item "><div class="card"><div class="picture col-md-4"><p class="title">第' + iv['組數'] + '組候選人：</p>'+ '<img src="' + jv + '.jpg">';
            }
            break;
          case '經歷':
             a= a + '<div class="col-md-4"><p>' + jv + '</p></div>';
            break;
          case '政見_1':
             a= a + '<div class="col-md-3"><p>' + jv + '</p></div>';
            break;
          case '政見_2':
            a= a + '<div class="col-md-3"><p>' + jv + '</p></div></div></div></div>';
            break;
        }
        //console.log("index[" + jk + "] = " + jv);
      });
      //console.log(a);
      //$('body').append(a);
    });

  }).catch(function (e) {
    var error = document.createElement('div');
    error.textContent = e;
    error.className = 'error';
    //document.body.insertBefore(error, document.body.firstChild);
  });

  $('.studentrepresent .picture .title').hide();
  $('.departmentscienceintrotitle .picture .title').hide();

});
