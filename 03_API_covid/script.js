function BuildChart(labels, values, chartTitle) {
  var data = {
    labels: labels,
    datasets: [{
      label: chartTitle, // Name the series
      data: values,
      fill: true,
      borderColor: "#E84A5F",
      backgroundColor: '#FCF5DE',
    //   backgroundColor: ['#99B898',
    //   '#F8B195',
    //   '#F67280',
    //   '#C06C84',
    //   '#6C5B7B',
    //   '#355C7D',
    //   '#FECEAB',
    //   '#FF847C ',
    //   '#E84A5F',
    //   '#2A363B ',
    // ],
  }],
};
console.log('data prop:', data);

  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
          scales: {
              xAxes: [{
                      scaleLabel: {
                      display: true,
                      labelString: 'DATE'
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'CASES'
                  }
              }]
          },
      }
  });

  return myChart;
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.response);
    // Map json labels  back to values array
    // console.log('response is:', this.response);  
    var labels = json.map(function (e) {
      // console.log(e);
      return e.last_update.slice(0, 10);
    });
    console.log('dates:', labels);

    // Map json values back to values array
    var values = json.map(function (e) {
      return e.cases;
  ; // Divide to billions in units of ten
  // return (e.finalWorth / 1000); // Divide to billions in units of ten
});

BuildChart(labels.reverse(), values.reverse(), "Total cases in Sweden");
  }
};
xhttp.open("GET", "https://covid19-api.org/api/timeline/SE", false);
xhttp.send();

