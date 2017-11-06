	var graph = new sigma({
		renderer: {                                                        
			container: "container",                                        
			type: "canvas"                                                 
		},
		settings: {
			defaultNodeColor: '#ec5148',
			edgeLabelSize: 'proportional',
			enableEdgeHovering: true
		}
	});
  
  sigma.parsers.json(
		'data.json',
		graph,
		function() {
			graph.refresh();
		}
	);
  
	sigma.canvas.nodes.square = function(node, context, settings) {
		var prefix = settings('prefix') || '',
		size = node[prefix + 'size'];

		context.fillStyle = node.color || settings('defaultNodeColor');
		context.beginPath();
		context.rect(
			node[prefix + 'x'] - size,
			node[prefix + 'y'] - size,
			size * 2,
			size * 2
		);

		context.closePath();
		context.fill();
	};
  
	var lastEdge;	  
	graph.bind('overEdge', function(e) {
		if (e.data.edge['id']!=lastEdge) {
			if (e.data.edge['caption']!=undefined)
				$('.info').html(e.data.edge['caption']);
			else 
				$('.info').html("Нет данных о пути");
			$(".info").offset({top:e.data.captor['clientY']+20, left:e.data.captor['clientX']+20});
			$(".info").css("display", "block");
			lastEdge = e.data.edge['id'];
			lastNode = undefined;
		}			
	});
	
  var lastNode;
  graph.bind('overNode', function(e) {
		if (e.data.node['id']!=lastNode) {
			if (e.data.node['caption']!=undefined)
				$('.info').html(e.data.node['caption']);
			else 
				$('.info').html("Нет данных об отелях");
			$(".info").offset({top:e.data.captor['clientY']+20, left:e.data.captor['clientX']+20});
			$(".info").css("display", "block");
			lastNode = e.data.node['id'];
			lastEdge = undefined;
		}
	});