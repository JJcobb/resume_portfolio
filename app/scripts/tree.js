$(document).ready(function() {

sap.ui.core.Control.extend('dennisseah.OrgChart', {
    metadata: {
      properties: {
        width: {type: 'int', defaultValue: window.innerWidth},
        height: {type: 'int', defaultValue: 600}
      }
    },

    init : function() {
      this.root = {};
    },
    
    setRoot : function(root) {
      this.root = root;
    },

    renderer : function(oRm, oControl) {
      oRm.write('<div');
      oRm.writeControlData(oControl);
      oRm.addClass('dennisseah-orgchart');
      oRm.writeClasses();
      oRm.write('>');
      oRm.write('</div>');
    },

    onAfterRendering: function() {
      var root = this.root;
      var margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120
      };
      var width = this.getWidth() - margin.right - margin.left;
      var height = this.getHeight() - margin.top - margin.bottom;

      var i = 0,
          duration = 750,
          rectW = 250;                                                   /*  Width and Height  */
      var rectH = 100; /****************** was 50 *********************/

      if( $(window).width() < 700 ){
        rectH = 60;
        rectW = 230;
      }



      var tree = d3.layout.tree().nodeSize([70]);


      var diagonal = d3.svg.diagonal()
      .projection(function (d) {
        return [d.x + rectW/2, d.y + rectH/2];
      });


      /*function link(d) {
  return "M" + d.source.y + "," + d.source.x
      + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
      + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
      + " " + d.target.y + "," + d.target.x;
    };*/


      var svg = d3.select('#' + this.getId())
      .append('svg')
      .attr('width', /*this.getWidth()*/'100%')
      .attr('height', this.getHeight())
      /*.call(zm = d3.behavior.zoom().scaleExtent([1,3])
            .on("zoom", redraw))*/
      .attr('version', '1.1')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      //.attr('viewBox', '0 0 ' + window.innerWidth + ' 600')
      .append('g')
      .attr('class', 'tree-container')
      .attr('transform', 'translate(' + ( (this.getWidth() / 2) - (rectW / 2) ) + ',' + 0 + ')');   /* SVG container positioning */

      if( $(window).width() < 700 ){

        $('#experience svg > g').attr('transform', 'translate(' + ( (this.getWidth() / 2) - ((rectW+20) / 2) ) + ',' + 0 + ')');
      }
  

      /*svg.append('image')
      .attr('xlink:href', 'images/ontarget-logo-white.png')
      .attr('x', '-150px')
      .attr('y', '0')
      .attr('width', '500px');*/

      /*zm.translate([50, 20]);*/

      root.x0 = 0;
      root.y0 = height / 2;
      
      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      root.children.forEach(collapse);
      update(root);
      d3.select('#' + this.getId()).style('height', '350px'); /****** Height for each chart's container ********/


      function update(source) {
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        nodes.forEach(function (d) {
          d.y = d.depth * 180;
        });

        var node = svg.selectAll('g.node')
        .data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });



        /*node.enter().append('image')
        .attr('xlink:href', function(d){
          return d.image;
        })
        .attr('x', '-150px')
        .attr('y', '0')
        .attr('width', '500px');*/


                                        /********** Width of logo if mobile **********/
        if( $(window).width() < 700 ){
          var image_width = '300px';
          var image_width_number = 300;
          var image_x = '-35px';
        }
        else {
          var image_width = '500px';
          var image_width_number = 500;
          var image_x = '-125px';
        }

        node.enter().append('image')
        .attr('xlink:href', function (d){

          var this_image = $(this);


          // Determine the appropriate aspect ratio of the image using the image url
          var img = new Image();
          img.src = d.image;
          img.onload = function(){

              var image_aspect_ratio = this.height / this.width;

              console.log('image_aspect_ratio: ' + image_aspect_ratio);

              $(this_image).attr('height', image_width_number*image_aspect_ratio);
          };
          

          return d.image;
        })
        .attr('x', image_x)   /* -125px */
        .attr('y', '0')
        .attr('width', image_width);  /* 500px */


        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + source.x0 + ',' + source.y0 + ')';
        })
        .on('click', click);


        if( $(window).width() < 700 ){

          var border_radius = 20;
        }
        else {

          var border_radius = 50;
        }


        nodeEnter.append('rect')
        .attr('width', rectW)
        .attr('height', rectH)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('rx', border_radius)   /************** was 25 *****************/      /* Border radius */
        .attr('ry', border_radius)   /************** was 25 *****************/
        .style('fill', function (d) {
          return d._children ? '#85ff77' : '#fff';
        });

        nodeEnter.append('text')
        .attr('x', rectW / 2)
        .attr('y', rectH / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(function (d) {
          return d.name;
        });

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
        .duration(duration)
        .attr('transform', function (d, i) {

          if( $(window).width() < 700 ){

            console.log('d.name: ' + d.name + ' | i: ' + i);

            if(d.name != 'ROAR!' && d.name != 'On Target' && d.name != 'Intern' && d.name != 'Intern / Production Asst.'){
              var vertical_spacing = i*60 - 100;
            }
            else if(d.name == 'Intern' || d.name == 'Intern / Production Asst.'){
              var vertical_spacing = -50;
            }
            else{
              var vertical_spacing = 0;
            }

            return 'translate(' + 0 + ',' + ((d.y/1.5) + vertical_spacing) + ')';

          }
          
          else{

            return 'translate(' + (d.x*4) + ',' + d.y/1.5 + ')';  /********** Space between them *************/
          }       
          
        });

        nodeUpdate.select('rect')
        .attr('width', rectW)
        .attr('height', rectH)
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
        .style('fill', function (d) {
          return d._children ? 'transparent' : 'transparent';   /***** Colors of circles  ******/
        })
        .style('stroke', function (d) {
          return d._children ? 'white' : 'white';   /***** Colors of circles  ******/
        })
        .attr('class', function (d) {
          return d._children ? 'animated flash infinite node-flash' : '';
        });

        nodeUpdate.select('text')
        .style('fill-opacity', 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', function (d) {
          return 'translate(' + source.x + ',' + source.y + ')';
        })
        .remove();

        nodeExit.select('rect')
        .attr('width', rectW)
        .attr('height', rectH)
        .attr('stroke', 'black')
        .attr('stroke-width', 1);
        nodeExit.select('text');

        // Update the links…
        var link = svg.selectAll('path.link')
        .data(links, function (d) {
          return d.target.id;
        });

        // Enter any new links at the parent's previous position.
        link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('x', rectW/2)
        .attr('y', rectH / 2)
/* *************** Path Lines *************** */
        /*.attr("d", function (d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        })*/;

        // Transition links to their new position.
        link.transition()
        .duration(duration)
        /*.attr("d", diagonal);*/   

/* *************** Path Lines *************** */     

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }


      //Redraw for zoom
      function redraw() {
        //console.log("here", d3.event.translate, d3.event.scale);
        svg.attr('transform',
                 'translate(' + d3.event.translate + ')'
                 + ' scale(' + d3.event.scale + ')');
      }
    }
  });
  
  
  			           
 /* var org_chart = new dennisseah.OrgChart();
  org_chart.setRoot({
    name: 'Experience',
    children: [
      {name: 'ROAR!', children : [
        {name:'Responsive Conversion'},
        {name:'ASP.NET Updates'},
        {name:'MailChimp Emails'},
      ]
      },
      {name: 'On Target', children : [
        {name:'Wordpress Updates'},
        {name:'Custom Themes'},
        {name:'Infographics'},
      ]
  	  },
    ]
  });
  org_chart.placeAt('content');*/

     /*var org_chart = new dennisseah.OrgChart();
  org_chart.setRoot({
    name: 'ROAR!',
    children: [
      {name: 'Responsive Conversion'},
      {name: 'ASP.NET Updates'},
      {name: 'MailChimp Emails'}
    ]
  });
  org_chart.placeAt('content');


    var org_chart2 = new dennisseah.OrgChart();
  org_chart2.setRoot({
    name: 'On Target',
    children: [
      {name: 'Wordpress Updates'},
      {name: 'Custom Themes'},
      {name: 'Infographics'}
    ]
  });
  org_chart2.placeAt('content');*/



  var org_chart = new dennisseah.OrgChart();
  org_chart.setRoot({
    name: 'On Target',
    image: 'images/ontarget-logo-white.png',
    children: [
      {name: 'Intern / Production Asst.', children : [
        {name:'Wordpress Dev'},
        {name:'Custom Themes'},
        {name:'Front-end Dev'},
      ]
      }
    ]
  });
  org_chart.placeAt('exp1');


    var org_chart = new dennisseah.OrgChart();
  org_chart.setRoot({
    name: 'ROAR!',
    image: 'images/roar-logo2.png',
    children: [
      {name: 'Intern', children : [
        {name:'Responsive Conversion'},
        {name:'ASP.NET Updates'},
        {name:'HTML Emails'},
      ]
      }
    ]
  });
  org_chart.placeAt('exp2');

});