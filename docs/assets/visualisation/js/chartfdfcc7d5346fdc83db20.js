(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_sankey_js"],{

/***/ "./node_modules/@plotly/d3-sankey-circular/dist/d3-sankey-circular.es.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@plotly/d3-sankey-circular/dist/d3-sankey-circular.es.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sankeyCircular": () => (/* binding */ sankeyCircular),
/* harmony export */   "sankeyCenter": () => (/* binding */ center),
/* harmony export */   "sankeyLeft": () => (/* binding */ left),
/* harmony export */   "sankeyRight": () => (/* binding */ right),
/* harmony export */   "sankeyJustify": () => (/* binding */ justify)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/src/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-shape */ "./node_modules/d3-shape/src/link/index.js");
/* harmony import */ var elementary_circuits_directed_graph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! elementary-circuits-directed-graph */ "./node_modules/elementary-circuits-directed-graph/johnson.js");
/* harmony import */ var elementary_circuits_directed_graph__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(elementary_circuits_directed_graph__WEBPACK_IMPORTED_MODULE_2__);





// For a given link, return the target node's depth
function targetDepth(d) {
  return d.target.depth;
}

// The depth of a node when the nodeAlign (align) is set to 'left'
function left(node) {
  return node.depth;
}

// The depth of a node when the nodeAlign (align) is set to 'right'
function right(node, n) {
  return n - 1 - node.height;
}

// The depth of a node when the nodeAlign (align) is set to 'justify'
function justify(node, n) {
  return node.sourceLinks.length ? node.depth : n - 1;
}

// The depth of a node when the nodeAlign (align) is set to 'center'
function center(node) {
  return node.targetLinks.length ? node.depth : node.sourceLinks.length ? (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.min)(node.sourceLinks, targetDepth) - 1 : 0;
}

// returns a function, using the parameter given to the sankey setting
function constant(x) {
  return function () {
    return x;
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/// https://github.com/tomshanley/d3-sankeyCircular-circular

// sort links' breadth (ie top to bottom in a column), based on their source nodes' breadths
function ascendingSourceBreadth(a, b) {
  return ascendingBreadth(a.source, b.source) || a.index - b.index;
}

// sort links' breadth (ie top to bottom in a column), based on their target nodes' breadths
function ascendingTargetBreadth(a, b) {
  return ascendingBreadth(a.target, b.target) || a.index - b.index;
}

// sort nodes' breadth (ie top to bottom in a column)
// if both nodes have circular links, or both don't have circular links, then sort by the top (y0) of the node
// else push nodes that have top circular links to the top, and nodes that have bottom circular links to the bottom
function ascendingBreadth(a, b) {
  if (a.partOfCycle === b.partOfCycle) {
    return a.y0 - b.y0;
  } else {
    if (a.circularLinkType === 'top' || b.circularLinkType === 'bottom') {
      return -1;
    } else {
      return 1;
    }
  }
}

// return the value of a node or link
function value(d) {
  return d.value;
}

// return the vertical center of a node
function nodeCenter(node) {
  return (node.y0 + node.y1) / 2;
}

// return the vertical center of a link's source node
function linkSourceCenter(link) {
  return nodeCenter(link.source);
}

// return the vertical center of a link's target node
function linkTargetCenter(link) {
  return nodeCenter(link.target);
}

// Return the default value for ID for node, d.index
function defaultId(d) {
  return d.index;
}

// Return the default object the graph's nodes, graph.nodes
function defaultNodes(graph) {
  return graph.nodes;
}

// Return the default object the graph's nodes, graph.links
function defaultLinks(graph) {
  return graph.links;
}

// Return the node from the collection that matches the provided ID, or throw an error if no match
function find(nodeById, id) {
  var node = nodeById.get(id);
  if (!node) throw new Error('missing: ' + id);
  return node;
}

function getNodeID(node, id) {
  return id(node);
}

// The main sankeyCircular functions

// Some constants for circular link calculations
var verticalMargin = 25;
var baseRadius = 10;
var scale = 0.3; //Possibly let user control this, although anything over 0.5 starts to get too cramped

function sankeyCircular () {
  // Set the default values
  var x0 = 0,
      y0 = 0,
      x1 = 1,
      y1 = 1,
      // extent
  dx = 24,
      // nodeWidth
  py,
      // nodePadding, for vertical postioning
  id = defaultId,
      align = justify,
      nodes = defaultNodes,
      links = defaultLinks,
      iterations = 32,
      circularLinkGap = 2,
      paddingRatio,
      sortNodes = null;

  function sankeyCircular() {
    var graph = {
      nodes: nodes.apply(null, arguments),
      links: links.apply(null, arguments)

      // Process the graph's nodes and links, setting their positions

      // 1.  Associate the nodes with their respective links, and vice versa
    };computeNodeLinks(graph);

    // 2.  Determine which links result in a circular path in the graph
    identifyCircles(graph, id, sortNodes);

    // 4. Calculate the nodes' values, based on the values of the incoming and outgoing links
    computeNodeValues(graph);

    // 5.  Calculate the nodes' depth based on the incoming and outgoing links
    //     Sets the nodes':
    //     - depth:  the depth in the graph
    //     - column: the depth (0, 1, 2, etc), as is relates to visual position from left to right
    //     - x0, x1: the x coordinates, as is relates to visual position from left to right
    computeNodeDepths(graph);

    // 3.  Determine how the circular links will be drawn,
    //     either travelling back above the main chart ("top")
    //     or below the main chart ("bottom")
    selectCircularLinkTypes(graph, id);

    // 6.  Calculate the nodes' and links' vertical position within their respective column
    //     Also readjusts sankeyCircular size if circular links are needed, and node x's
    computeNodeBreadths(graph, iterations, id);
    computeLinkBreadths(graph);

    // 7.  Sort links per node, based on the links' source/target nodes' breadths
    // 8.  Adjust nodes that overlap links that span 2+ columns
    var linkSortingIterations = 4; //Possibly let user control this number, like the iterations over node placement
    for (var iteration = 0; iteration < linkSortingIterations; iteration++) {

      sortSourceLinks(graph, y1, id);
      sortTargetLinks(graph, y1, id);
      resolveNodeLinkOverlaps(graph, y0, y1, id);
      sortSourceLinks(graph, y1, id);
      sortTargetLinks(graph, y1, id);
    }

    // 8.1  Adjust node and link positions back to fill height of chart area if compressed
    fillHeight(graph, y0, y1);

    // 9. Calculate visually appealling path for the circular paths, and create the "d" string
    addCircularPathData(graph, circularLinkGap, y1, id);

    return graph;
  } // end of sankeyCircular function


  // Set the sankeyCircular parameters
  // nodeID, nodeAlign, nodeWidth, nodePadding, nodes, links, size, extent, iterations, nodePaddingRatio, circularLinkGap
  sankeyCircular.nodeId = function (_) {
    return arguments.length ? (id = typeof _ === 'function' ? _ : constant(_), sankeyCircular) : id;
  };

  sankeyCircular.nodeAlign = function (_) {
    return arguments.length ? (align = typeof _ === 'function' ? _ : constant(_), sankeyCircular) : align;
  };

  sankeyCircular.nodeWidth = function (_) {
    return arguments.length ? (dx = +_, sankeyCircular) : dx;
  };

  sankeyCircular.nodePadding = function (_) {
    return arguments.length ? (py = +_, sankeyCircular) : py;
  };

  sankeyCircular.nodes = function (_) {
    return arguments.length ? (nodes = typeof _ === 'function' ? _ : constant(_), sankeyCircular) : nodes;
  };

  sankeyCircular.links = function (_) {
    return arguments.length ? (links = typeof _ === 'function' ? _ : constant(_), sankeyCircular) : links;
  };

  sankeyCircular.size = function (_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankeyCircular) : [x1 - x0, y1 - y0];
  };

  sankeyCircular.extent = function (_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankeyCircular) : [[x0, y0], [x1, y1]];
  };

  sankeyCircular.iterations = function (_) {
    return arguments.length ? (iterations = +_, sankeyCircular) : iterations;
  };

  sankeyCircular.circularLinkGap = function (_) {
    return arguments.length ? (circularLinkGap = +_, sankeyCircular) : circularLinkGap;
  };

  sankeyCircular.nodePaddingRatio = function (_) {
    return arguments.length ? (paddingRatio = +_, sankeyCircular) : paddingRatio;
  };

  sankeyCircular.sortNodes = function (_) {
    return arguments.length ? (sortNodes = _, sankeyCircular) : sortNodes;
  };

  sankeyCircular.update = function (graph) {
    // 5.  Calculate the nodes' depth based on the incoming and outgoing links
    //     Sets the nodes':
    //     - depth:  the depth in the graph
    //     - column: the depth (0, 1, 2, etc), as is relates to visual position from left to right
    //     - x0, x1: the x coordinates, as is relates to visual position from left to right
    // computeNodeDepths(graph)

    // 3.  Determine how the circular links will be drawn,
    //     either travelling back above the main chart ("top")
    //     or below the main chart ("bottom")
    selectCircularLinkTypes(graph, id);

    // 6.  Calculate the nodes' and links' vertical position within their respective column
    //     Also readjusts sankeyCircular size if circular links are needed, and node x's
    // computeNodeBreadths(graph, iterations, id)
    computeLinkBreadths(graph);

    // Force position of circular link type based on position
    graph.links.forEach(function (link) {
      if (link.circular) {
        link.circularLinkType = link.y0 + link.y1 < y1 ? 'top' : 'bottom';

        link.source.circularLinkType = link.circularLinkType;
        link.target.circularLinkType = link.circularLinkType;
      }
    });

    sortSourceLinks(graph, y1, id, false); // Sort links but do not move nodes
    sortTargetLinks(graph, y1, id);

    // 7.  Sort links per node, based on the links' source/target nodes' breadths
    // 8.  Adjust nodes that overlap links that span 2+ columns
    // var linkSortingIterations = 4; //Possibly let user control this number, like the iterations over node placement
    // for (var iteration = 0; iteration < linkSortingIterations; iteration++) {
    //
    //   sortSourceLinks(graph, y1, id)
    //   sortTargetLinks(graph, y1, id)
    //   resolveNodeLinkOverlaps(graph, y0, y1, id)
    //   sortSourceLinks(graph, y1, id)
    //   sortTargetLinks(graph, y1, id)
    //
    // }

    // 8.1  Adjust node and link positions back to fill height of chart area if compressed
    // fillHeight(graph, y0, y1)

    // 9. Calculate visually appealling path for the circular paths, and create the "d" string
    addCircularPathData(graph, circularLinkGap, y1, id);
    return graph;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks(graph) {
    graph.nodes.forEach(function (node, i) {
      node.index = i;
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    var nodeById = (0,d3_collection__WEBPACK_IMPORTED_MODULE_1__.map)(graph.nodes, id);
    graph.links.forEach(function (link, i) {
      link.index = i;
      var source = link.source;
      var target = link.target;
      if ((typeof source === "undefined" ? "undefined" : _typeof(source)) !== 'object') {
        source = link.source = find(nodeById, source);
      }
      if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== 'object') {
        target = link.target = find(nodeById, target);
      }
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
    return graph;
  }

  // Compute the value (size) and cycleness of each node by summing the associated links.
  function computeNodeValues(graph) {
    graph.nodes.forEach(function (node) {
      node.partOfCycle = false;
      node.value = Math.max((0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.sourceLinks, value), (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.targetLinks, value));
      node.sourceLinks.forEach(function (link) {
        if (link.circular) {
          node.partOfCycle = true;
          node.circularLinkType = link.circularLinkType;
        }
      });
      node.targetLinks.forEach(function (link) {
        if (link.circular) {
          node.partOfCycle = true;
          node.circularLinkType = link.circularLinkType;
        }
      });
    });
  }

  function getCircleMargins(graph) {
    var totalTopLinksWidth = 0,
        totalBottomLinksWidth = 0,
        totalRightLinksWidth = 0,
        totalLeftLinksWidth = 0;

    var maxColumn = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.max)(graph.nodes, function (node) {
      return node.column;
    });

    graph.links.forEach(function (link) {
      if (link.circular) {
        if (link.circularLinkType == 'top') {
          totalTopLinksWidth = totalTopLinksWidth + link.width;
        } else {
          totalBottomLinksWidth = totalBottomLinksWidth + link.width;
        }

        if (link.target.column == 0) {
          totalLeftLinksWidth = totalLeftLinksWidth + link.width;
        }

        if (link.source.column == maxColumn) {
          totalRightLinksWidth = totalRightLinksWidth + link.width;
        }
      }
    });

    //account for radius of curves and padding between links
    totalTopLinksWidth = totalTopLinksWidth > 0 ? totalTopLinksWidth + verticalMargin + baseRadius : totalTopLinksWidth;
    totalBottomLinksWidth = totalBottomLinksWidth > 0 ? totalBottomLinksWidth + verticalMargin + baseRadius : totalBottomLinksWidth;
    totalRightLinksWidth = totalRightLinksWidth > 0 ? totalRightLinksWidth + verticalMargin + baseRadius : totalRightLinksWidth;
    totalLeftLinksWidth = totalLeftLinksWidth > 0 ? totalLeftLinksWidth + verticalMargin + baseRadius : totalLeftLinksWidth;

    return { "top": totalTopLinksWidth, "bottom": totalBottomLinksWidth, "left": totalLeftLinksWidth, "right": totalRightLinksWidth };
  }

  // Update the x0, y0, x1 and y1 for the sankeyCircular, to allow space for any circular links
  function scaleSankeySize(graph, margin) {

    var maxColumn = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.max)(graph.nodes, function (node) {
      return node.column;
    });

    var currentWidth = x1 - x0;
    var currentHeight = y1 - y0;

    var newWidth = currentWidth + margin.right + margin.left;
    var newHeight = currentHeight + margin.top + margin.bottom;

    var scaleX = currentWidth / newWidth;
    var scaleY = currentHeight / newHeight;

    x0 = x0 * scaleX + margin.left;
    x1 = margin.right == 0 ? x1 : x1 * scaleX;
    y0 = y0 * scaleY + margin.top;
    y1 = y1 * scaleY;

    graph.nodes.forEach(function (node) {
      node.x0 = x0 + node.column * ((x1 - x0 - dx) / maxColumn);
      node.x1 = node.x0 + dx;
    });

    return scaleY;
  }

  // Iteratively assign the depth for each node.
  // Nodes are assigned the maximum depth of incoming neighbors plus one;
  // nodes with no incoming links are assigned depth zero, while
  // nodes with no outgoing links are assigned the maximum depth.
  function computeNodeDepths(graph) {
    var nodes, next, x;

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function (node) {
        node.depth = x;
        node.sourceLinks.forEach(function (link) {
          if (next.indexOf(link.target) < 0 && !link.circular) {
            next.push(link.target);
          }
        });
      });
    }

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function (node) {
        node.height = x;
        node.targetLinks.forEach(function (link) {
          if (next.indexOf(link.source) < 0 && !link.circular) {
            next.push(link.source);
          }
        });
      });
    }

    // assign column numbers, and get max value
    graph.nodes.forEach(function (node) {
      node.column = Math.floor(align.call(null, node, x));
    });
  }

  // Assign nodes' breadths, and then shift nodes that overlap (resolveCollisions)
  function computeNodeBreadths(graph, iterations, id) {
    var columns = (0,d3_collection__WEBPACK_IMPORTED_MODULE_1__.nest)().key(function (d) {
      return d.column;
    }).sortKeys(d3_array__WEBPACK_IMPORTED_MODULE_0__.ascending).entries(graph.nodes).map(function (d) {
      return d.values;
    });

    initializeNodeBreadth(id);
    resolveCollisions();

    for (var alpha = 1, n = iterations; n > 0; --n) {
      relaxLeftAndRight(alpha *= 0.99, id);
      resolveCollisions();
    }

    function initializeNodeBreadth(id) {

      //override py if nodePadding has been set
      if (paddingRatio) {
        var padding = Infinity;
        columns.forEach(function (nodes) {
          var thisPadding = y1 * paddingRatio / (nodes.length + 1);
          padding = thisPadding < padding ? thisPadding : padding;
        });
        py = padding;
      }

      var ky = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.min)(columns, function (nodes) {
        return (y1 - y0 - (nodes.length - 1) * py) / (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(nodes, value);
      });

      //calculate the widths of the links
      ky = ky * scale;

      graph.links.forEach(function (link) {
        link.width = link.value * ky;
      });

      //determine how much to scale down the chart, based on circular links
      var margin = getCircleMargins(graph);
      var ratio = scaleSankeySize(graph, margin);

      //re-calculate widths
      ky = ky * ratio;

      graph.links.forEach(function (link) {
        link.width = link.value * ky;
      });

      columns.forEach(function (nodes) {
        var nodesLength = nodes.length;
        nodes.forEach(function (node, i) {
          if (node.depth == columns.length - 1 && nodesLength == 1) {
            node.y0 = y1 / 2 - node.value * ky;
            node.y1 = node.y0 + node.value * ky;
          } else if (node.depth == 0 && nodesLength == 1) {
            node.y0 = y1 / 2 - node.value * ky;
            node.y1 = node.y0 + node.value * ky;
          } else if (node.partOfCycle) {
            if (numberOfNonSelfLinkingCycles(node, id) == 0) {
              node.y0 = y1 / 2 + i;
              node.y1 = node.y0 + node.value * ky;
            } else if (node.circularLinkType == 'top') {
              node.y0 = y0 + i;
              node.y1 = node.y0 + node.value * ky;
            } else {
              node.y0 = y1 - node.value * ky - i;
              node.y1 = node.y0 + node.value * ky;
            }
          } else {
            if (margin.top == 0 || margin.bottom == 0) {
              node.y0 = (y1 - y0) / nodesLength * i;
              node.y1 = node.y0 + node.value * ky;
            } else {
              node.y0 = (y1 - y0) / 2 - nodesLength / 2 + i;
              node.y1 = node.y0 + node.value * ky;
            }
          }
        });
      });
    }

    // For each node in each column, check the node's vertical position in relation to its targets and sources vertical position
    // and shift up/down to be closer to the vertical middle of those targets and sources
    function relaxLeftAndRight(alpha, id) {
      var columnsLength = columns.length;

      columns.forEach(function (nodes) {
        var n = nodes.length;
        var depth = nodes[0].depth;

        nodes.forEach(function (node) {
          // check the node is not an orphan
          var nodeHeight;
          if (node.sourceLinks.length || node.targetLinks.length) {
            if (node.partOfCycle && numberOfNonSelfLinkingCycles(node, id) > 0) ; else if (depth == 0 && n == 1) {
              nodeHeight = node.y1 - node.y0;

              node.y0 = y1 / 2 - nodeHeight / 2;
              node.y1 = y1 / 2 + nodeHeight / 2;
            } else if (depth == columnsLength - 1 && n == 1) {
              nodeHeight = node.y1 - node.y0;

              node.y0 = y1 / 2 - nodeHeight / 2;
              node.y1 = y1 / 2 + nodeHeight / 2;
            } else {
              var avg = 0;

              var avgTargetY = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.mean)(node.sourceLinks, linkTargetCenter);
              var avgSourceY = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.mean)(node.targetLinks, linkSourceCenter);

              if (avgTargetY && avgSourceY) {
                avg = (avgTargetY + avgSourceY) / 2;
              } else {
                avg = avgTargetY || avgSourceY;
              }

              var dy = (avg - nodeCenter(node)) * alpha;
              // positive if it node needs to move down
              node.y0 += dy;
              node.y1 += dy;
            }
          }
        });
      });
    }

    // For each column, check if nodes are overlapping, and if so, shift up/down
    function resolveCollisions() {
      columns.forEach(function (nodes) {
        var node,
            dy,
            y = y0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingBreadth);

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y - node.y0;

          if (dy > 0) {
            node.y0 += dy;
            node.y1 += dy;
          }
          y = node.y1 + py;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y - py - y1;
        if (dy > 0) {
          y = node.y0 -= dy, node.y1 -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y1 + py - y;
            if (dy > 0) node.y0 -= dy, node.y1 -= dy;
            y = node.y0;
          }
        }
      });
    }
  }

  // Assign the links y0 and y1 based on source/target nodes position,
  // plus the link's relative position to other links to the same node
  function computeLinkBreadths(graph) {
    graph.nodes.forEach(function (node) {
      node.sourceLinks.sort(ascendingTargetBreadth);
      node.targetLinks.sort(ascendingSourceBreadth);
    });
    graph.nodes.forEach(function (node) {
      var y0 = node.y0;
      var y1 = y0;

      // start from the bottom of the node for cycle links
      var y0cycle = node.y1;
      var y1cycle = y0cycle;

      node.sourceLinks.forEach(function (link) {
        if (link.circular) {
          link.y0 = y0cycle - link.width / 2;
          y0cycle = y0cycle - link.width;
        } else {
          link.y0 = y0 + link.width / 2;
          y0 += link.width;
        }
      });
      node.targetLinks.forEach(function (link) {
        if (link.circular) {
          link.y1 = y1cycle - link.width / 2;
          y1cycle = y1cycle - link.width;
        } else {
          link.y1 = y1 + link.width / 2;
          y1 += link.width;
        }
      });
    });
  }

  return sankeyCircular;
}

/// /////////////////////////////////////////////////////////////////////////////////
// Cycle functions
// portion of code to detect circular links based on Colin Fergus' bl.ock https://gist.github.com/cfergus/3956043

// Identify circles in the link objects
function identifyCircles(graph, id, sortNodes) {
  var circularLinkID = 0;
  if (sortNodes === null) {

    // Building adjacency graph
    var adjList = [];
    for (var i = 0; i < graph.links.length; i++) {
      var link = graph.links[i];
      var source = link.source.index;
      var target = link.target.index;
      if (!adjList[source]) adjList[source] = [];
      if (!adjList[target]) adjList[target] = [];

      // Add links if not already in set
      if (adjList[source].indexOf(target) === -1) adjList[source].push(target);
    }

    // Find all elementary circuits
    var cycles = elementary_circuits_directed_graph__WEBPACK_IMPORTED_MODULE_2___default()(adjList);

    // Sort by circuits length
    cycles.sort(function (a, b) {
      return a.length - b.length;
    });

    var circularLinks = {};
    for (i = 0; i < cycles.length; i++) {
      var cycle = cycles[i];
      var last = cycle.slice(-2);
      if (!circularLinks[last[0]]) circularLinks[last[0]] = {};
      circularLinks[last[0]][last[1]] = true;
    }

    graph.links.forEach(function (link) {
      var target = link.target.index;
      var source = link.source.index;
      // If self-linking or a back-edge
      if (target === source || circularLinks[source] && circularLinks[source][target]) {
        link.circular = true;
        link.circularLinkID = circularLinkID;
        circularLinkID = circularLinkID + 1;
      } else {
        link.circular = false;
      }
    });
  } else {
    graph.links.forEach(function (link) {
      if (link.source[sortNodes] < link.target[sortNodes]) {
        link.circular = false;
      } else {
        link.circular = true;
        link.circularLinkID = circularLinkID;
        circularLinkID = circularLinkID + 1;
      }
    });
  }
}

// Assign a circular link type (top or bottom), based on:
// - if the source/target node already has circular links, then use the same type
// - if not, choose the type with fewer links
function selectCircularLinkTypes(graph, id) {
  var numberOfTops = 0;
  var numberOfBottoms = 0;
  graph.links.forEach(function (link) {
    if (link.circular) {
      // if either souce or target has type already use that
      if (link.source.circularLinkType || link.target.circularLinkType) {
        // default to source type if available
        link.circularLinkType = link.source.circularLinkType ? link.source.circularLinkType : link.target.circularLinkType;
      } else {
        link.circularLinkType = numberOfTops < numberOfBottoms ? 'top' : 'bottom';
      }

      if (link.circularLinkType == 'top') {
        numberOfTops = numberOfTops + 1;
      } else {
        numberOfBottoms = numberOfBottoms + 1;
      }

      graph.nodes.forEach(function (node) {
        if (getNodeID(node, id) == getNodeID(link.source, id) || getNodeID(node, id) == getNodeID(link.target, id)) {
          node.circularLinkType = link.circularLinkType;
        }
      });
    }
  });

  //correct self-linking links to be same direction as node
  graph.links.forEach(function (link) {
    if (link.circular) {
      //if both source and target node are same type, then link should have same type
      if (link.source.circularLinkType == link.target.circularLinkType) {
        link.circularLinkType = link.source.circularLinkType;
      }
      //if link is selflinking, then link should have same type as node
      if (selfLinking(link, id)) {
        link.circularLinkType = link.source.circularLinkType;
      }
    }
  });
}

// Return the angle between a straight line between the source and target of the link, and the vertical plane of the node
function linkAngle(link) {
  var adjacent = Math.abs(link.y1 - link.y0);
  var opposite = Math.abs(link.target.x0 - link.source.x1);

  return Math.atan(opposite / adjacent);
}

// Check if two circular links potentially overlap
function circularLinksCross(link1, link2) {
  if (link1.source.column < link2.target.column) {
    return false;
  } else if (link1.target.column > link2.source.column) {
    return false;
  } else {
    return true;
  }
}

// Return the number of circular links for node, not including self linking links
function numberOfNonSelfLinkingCycles(node, id) {
  var sourceCount = 0;
  node.sourceLinks.forEach(function (l) {
    sourceCount = l.circular && !selfLinking(l, id) ? sourceCount + 1 : sourceCount;
  });

  var targetCount = 0;
  node.targetLinks.forEach(function (l) {
    targetCount = l.circular && !selfLinking(l, id) ? targetCount + 1 : targetCount;
  });

  return sourceCount + targetCount;
}

// Check if a circular link is the only circular link for both its source and target node
function onlyCircularLink(link) {
  var nodeSourceLinks = link.source.sourceLinks;
  var sourceCount = 0;
  nodeSourceLinks.forEach(function (l) {
    sourceCount = l.circular ? sourceCount + 1 : sourceCount;
  });

  var nodeTargetLinks = link.target.targetLinks;
  var targetCount = 0;
  nodeTargetLinks.forEach(function (l) {
    targetCount = l.circular ? targetCount + 1 : targetCount;
  });

  if (sourceCount > 1 || targetCount > 1) {
    return false;
  } else {
    return true;
  }
}

// creates vertical buffer values per set of top/bottom links
function calcVerticalBuffer(links, circularLinkGap, id) {
  links.sort(sortLinkColumnAscending);
  links.forEach(function (link, i) {
    var buffer = 0;

    if (selfLinking(link, id) && onlyCircularLink(link)) {
      link.circularPathData.verticalBuffer = buffer + link.width / 2;
    } else {
      var j = 0;
      for (j; j < i; j++) {
        if (circularLinksCross(links[i], links[j])) {
          var bufferOverThisLink = links[j].circularPathData.verticalBuffer + links[j].width / 2 + circularLinkGap;
          buffer = bufferOverThisLink > buffer ? bufferOverThisLink : buffer;
        }
      }

      link.circularPathData.verticalBuffer = buffer + link.width / 2;
    }
  });

  return links;
}

// calculate the optimum path for a link to reduce overlaps
function addCircularPathData(graph, circularLinkGap, y1, id) {
  //var baseRadius = 10
  var buffer = 5;
  //var verticalMargin = 25

  var minY = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.min)(graph.links, function (link) {
    return link.source.y0;
  });

  // create object for circular Path Data
  graph.links.forEach(function (link) {
    if (link.circular) {
      link.circularPathData = {};
    }
  });

  // calc vertical offsets per top/bottom links
  var topLinks = graph.links.filter(function (l) {
    return l.circularLinkType == 'top';
  });
  /* topLinks = */calcVerticalBuffer(topLinks, circularLinkGap, id);

  var bottomLinks = graph.links.filter(function (l) {
    return l.circularLinkType == 'bottom';
  });
  /* bottomLinks = */calcVerticalBuffer(bottomLinks, circularLinkGap, id);

  // add the base data for each link
  graph.links.forEach(function (link) {
    if (link.circular) {
      link.circularPathData.arcRadius = link.width + baseRadius;
      link.circularPathData.leftNodeBuffer = buffer;
      link.circularPathData.rightNodeBuffer = buffer;
      link.circularPathData.sourceWidth = link.source.x1 - link.source.x0;
      link.circularPathData.sourceX = link.source.x0 + link.circularPathData.sourceWidth;
      link.circularPathData.targetX = link.target.x0;
      link.circularPathData.sourceY = link.y0;
      link.circularPathData.targetY = link.y1;

      // for self linking paths, and that the only circular link in/out of that node
      if (selfLinking(link, id) && onlyCircularLink(link)) {
        link.circularPathData.leftSmallArcRadius = baseRadius + link.width / 2;
        link.circularPathData.leftLargeArcRadius = baseRadius + link.width / 2;
        link.circularPathData.rightSmallArcRadius = baseRadius + link.width / 2;
        link.circularPathData.rightLargeArcRadius = baseRadius + link.width / 2;

        if (link.circularLinkType == 'bottom') {
          link.circularPathData.verticalFullExtent = link.source.y1 + verticalMargin + link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.rightLargeArcRadius;
        } else {
          // top links
          link.circularPathData.verticalFullExtent = link.source.y0 - verticalMargin - link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.rightLargeArcRadius;
        }
      } else {
        // else calculate normally
        // add left extent coordinates, based on links with same source column and circularLink type
        var thisColumn = link.source.column;
        var thisCircularLinkType = link.circularLinkType;
        var sameColumnLinks = graph.links.filter(function (l) {
          return l.source.column == thisColumn && l.circularLinkType == thisCircularLinkType;
        });

        if (link.circularLinkType == 'bottom') {
          sameColumnLinks.sort(sortLinkSourceYDescending);
        } else {
          sameColumnLinks.sort(sortLinkSourceYAscending);
        }

        var radiusOffset = 0;
        sameColumnLinks.forEach(function (l, i) {
          if (l.circularLinkID == link.circularLinkID) {
            link.circularPathData.leftSmallArcRadius = baseRadius + link.width / 2 + radiusOffset;
            link.circularPathData.leftLargeArcRadius = baseRadius + link.width / 2 + i * circularLinkGap + radiusOffset;
          }
          radiusOffset = radiusOffset + l.width;
        });

        // add right extent coordinates, based on links with same target column and circularLink type
        thisColumn = link.target.column;
        sameColumnLinks = graph.links.filter(function (l) {
          return l.target.column == thisColumn && l.circularLinkType == thisCircularLinkType;
        });
        if (link.circularLinkType == 'bottom') {
          sameColumnLinks.sort(sortLinkTargetYDescending);
        } else {
          sameColumnLinks.sort(sortLinkTargetYAscending);
        }

        radiusOffset = 0;
        sameColumnLinks.forEach(function (l, i) {
          if (l.circularLinkID == link.circularLinkID) {
            link.circularPathData.rightSmallArcRadius = baseRadius + link.width / 2 + radiusOffset;
            link.circularPathData.rightLargeArcRadius = baseRadius + link.width / 2 + i * circularLinkGap + radiusOffset;
          }
          radiusOffset = radiusOffset + l.width;
        });

        // bottom links
        if (link.circularLinkType == 'bottom') {
          link.circularPathData.verticalFullExtent = Math.max(y1, link.source.y1, link.target.y1) + verticalMargin + link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.rightLargeArcRadius;
        } else {
          // top links
          link.circularPathData.verticalFullExtent = minY - verticalMargin - link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.rightLargeArcRadius;
        }
      }

      // all links
      link.circularPathData.leftInnerExtent = link.circularPathData.sourceX + link.circularPathData.leftNodeBuffer;
      link.circularPathData.rightInnerExtent = link.circularPathData.targetX - link.circularPathData.rightNodeBuffer;
      link.circularPathData.leftFullExtent = link.circularPathData.sourceX + link.circularPathData.leftLargeArcRadius + link.circularPathData.leftNodeBuffer;
      link.circularPathData.rightFullExtent = link.circularPathData.targetX - link.circularPathData.rightLargeArcRadius - link.circularPathData.rightNodeBuffer;
    }

    if (link.circular) {
      link.path = createCircularPathString(link);
    } else {
      var normalPath = (0,d3_shape__WEBPACK_IMPORTED_MODULE_3__.linkHorizontal)().source(function (d) {
        var x = d.source.x0 + (d.source.x1 - d.source.x0);
        var y = d.y0;
        return [x, y];
      }).target(function (d) {
        var x = d.target.x0;
        var y = d.y1;
        return [x, y];
      });
      link.path = normalPath(link);
    }
  });
}

// create a d path using the addCircularPathData
function createCircularPathString(link) {
  var pathString = '';
  // 'pathData' is assigned a value but never used
  // var pathData = {}

  if (link.circularLinkType == 'top') {
    pathString =
    // start at the right of the source node
    'M' + link.circularPathData.sourceX + ' ' + link.circularPathData.sourceY + ' ' +
    // line right to buffer point
    'L' + link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.sourceY + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftSmallArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftFullExtent + ' ' + (link.circularPathData.sourceY - link.circularPathData.leftSmallArcRadius) + ' ' + // End of arc X
    // line up to buffer point
    'L' + link.circularPathData.leftFullExtent + ' ' + link.circularPathData.verticalLeftInnerExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftLargeArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' + // End of arc X
    // line left to buffer point
    'L' + link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightLargeArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightFullExtent + ' ' + link.circularPathData.verticalRightInnerExtent + ' ' + // End of arc X
    // line down
    'L' + link.circularPathData.rightFullExtent + ' ' + (link.circularPathData.targetY - link.circularPathData.rightSmallArcRadius) + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightSmallArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.targetY + ' ' + // End of arc X
    // line to end
    'L' + link.circularPathData.targetX + ' ' + link.circularPathData.targetY;
  } else {
    // bottom path
    pathString =
    // start at the right of the source node
    'M' + link.circularPathData.sourceX + ' ' + link.circularPathData.sourceY + ' ' +
    // line right to buffer point
    'L' + link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.sourceY + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftSmallArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftFullExtent + ' ' + (link.circularPathData.sourceY + link.circularPathData.leftSmallArcRadius) + ' ' + // End of arc X
    // line down to buffer point
    'L' + link.circularPathData.leftFullExtent + ' ' + link.circularPathData.verticalLeftInnerExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftLargeArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' + // End of arc X
    // line left to buffer point
    'L' + link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightLargeArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightFullExtent + ' ' + link.circularPathData.verticalRightInnerExtent + ' ' + // End of arc X
    // line up
    'L' + link.circularPathData.rightFullExtent + ' ' + (link.circularPathData.targetY + link.circularPathData.rightSmallArcRadius) + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightSmallArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.targetY + ' ' + // End of arc X
    // line to end
    'L' + link.circularPathData.targetX + ' ' + link.circularPathData.targetY;
  }

  return pathString;
}

// sort links based on the distance between the source and tartget node columns
// if the same, then use Y position of the source node
function sortLinkColumnAscending(link1, link2) {
  if (linkColumnDistance(link1) == linkColumnDistance(link2)) {
    return link1.circularLinkType == 'bottom' ? sortLinkSourceYDescending(link1, link2) : sortLinkSourceYAscending(link1, link2);
  } else {
    return linkColumnDistance(link2) - linkColumnDistance(link1);
  }
}

// sort ascending links by their source vertical position, y0
function sortLinkSourceYAscending(link1, link2) {
  return link1.y0 - link2.y0;
}

// sort descending links by their source vertical position, y0
function sortLinkSourceYDescending(link1, link2) {
  return link2.y0 - link1.y0;
}

// sort ascending links by their target vertical position, y1
function sortLinkTargetYAscending(link1, link2) {
  return link1.y1 - link2.y1;
}

// sort descending links by their target vertical position, y1
function sortLinkTargetYDescending(link1, link2) {
  return link2.y1 - link1.y1;
}

// return the distance between the link's target and source node, in terms of the nodes' column
function linkColumnDistance(link) {
  return link.target.column - link.source.column;
}

// return the distance between the link's target and source node, in terms of the nodes' X coordinate
function linkXLength(link) {
  return link.target.x0 - link.source.x1;
}

// Return the Y coordinate on the longerLink path * which is perpendicular shorterLink's source.
// * approx, based on a straight line from target to source, when in fact the path is a bezier
function linkPerpendicularYToLinkSource(longerLink, shorterLink) {
  // get the angle for the longer link
  var angle = linkAngle(longerLink);

  // get the adjacent length to the other link's x position
  var heightFromY1ToPependicular = linkXLength(shorterLink) / Math.tan(angle);

  // add or subtract from longer link1's original y1, depending on the slope
  var yPerpendicular = incline(longerLink) == 'up' ? longerLink.y1 + heightFromY1ToPependicular : longerLink.y1 - heightFromY1ToPependicular;

  return yPerpendicular;
}

// Return the Y coordinate on the longerLink path * which is perpendicular shorterLink's source.
// * approx, based on a straight line from target to source, when in fact the path is a bezier
function linkPerpendicularYToLinkTarget(longerLink, shorterLink) {
  // get the angle for the longer link
  var angle = linkAngle(longerLink);

  // get the adjacent length to the other link's x position
  var heightFromY1ToPependicular = linkXLength(shorterLink) / Math.tan(angle);

  // add or subtract from longer link's original y1, depending on the slope
  var yPerpendicular = incline(longerLink) == 'up' ? longerLink.y1 - heightFromY1ToPependicular : longerLink.y1 + heightFromY1ToPependicular;

  return yPerpendicular;
}

// Move any nodes that overlap links which span 2+ columns
function resolveNodeLinkOverlaps(graph, y0, y1, id) {

  graph.links.forEach(function (link) {
    if (link.circular) {
      return;
    }

    if (link.target.column - link.source.column > 1) {
      var columnToTest = link.source.column + 1;
      var maxColumnToTest = link.target.column - 1;

      var i = 1;
      var numberOfColumnsToTest = maxColumnToTest - columnToTest + 1;

      for (i = 1; columnToTest <= maxColumnToTest; columnToTest++, i++) {
        graph.nodes.forEach(function (node) {
          if (node.column == columnToTest) {
            var t = i / (numberOfColumnsToTest + 1);

            // Find all the points of a cubic bezier curve in javascript
            // https://stackoverflow.com/questions/15397596/find-all-the-points-of-a-cubic-bezier-curve-in-javascript

            var B0_t = Math.pow(1 - t, 3);
            var B1_t = 3 * t * Math.pow(1 - t, 2);
            var B2_t = 3 * Math.pow(t, 2) * (1 - t);
            var B3_t = Math.pow(t, 3);

            var py_t = B0_t * link.y0 + B1_t * link.y0 + B2_t * link.y1 + B3_t * link.y1;

            var linkY0AtColumn = py_t - link.width / 2;
            var linkY1AtColumn = py_t + link.width / 2;
            var dy;

            // If top of link overlaps node, push node up
            if (linkY0AtColumn > node.y0 && linkY0AtColumn < node.y1) {

              dy = node.y1 - linkY0AtColumn + 10;
              dy = node.circularLinkType == 'bottom' ? dy : -dy;

              node = adjustNodeHeight(node, dy, y0, y1);

              // check if other nodes need to move up too
              graph.nodes.forEach(function (otherNode) {
                // don't need to check itself or nodes at different columns
                if (getNodeID(otherNode, id) == getNodeID(node, id) || otherNode.column != node.column) {
                  return;
                }
                if (nodesOverlap(node, otherNode)) {
                  adjustNodeHeight(otherNode, dy, y0, y1);
                }
              });
            } else if (linkY1AtColumn > node.y0 && linkY1AtColumn < node.y1) {
              // If bottom of link overlaps node, push node down
              dy = linkY1AtColumn - node.y0 + 10;

              node = adjustNodeHeight(node, dy, y0, y1);

              // check if other nodes need to move down too
              graph.nodes.forEach(function (otherNode) {
                // don't need to check itself or nodes at different columns
                if (getNodeID(otherNode, id) == getNodeID(node, id) || otherNode.column != node.column) {
                  return;
                }
                if (otherNode.y0 < node.y1 && otherNode.y1 > node.y1) {
                  adjustNodeHeight(otherNode, dy, y0, y1);
                }
              });
            } else if (linkY0AtColumn < node.y0 && linkY1AtColumn > node.y1) {
              // if link completely overlaps node
              dy = linkY1AtColumn - node.y0 + 10;

              node = adjustNodeHeight(node, dy, y0, y1);

              graph.nodes.forEach(function (otherNode) {
                // don't need to check itself or nodes at different columns
                if (getNodeID(otherNode, id) == getNodeID(node, id) || otherNode.column != node.column) {
                  return;
                }
                if (otherNode.y0 < node.y1 && otherNode.y1 > node.y1) {
                  adjustNodeHeight(otherNode, dy, y0, y1);
                }
              });
            }
          }
        });
      }
    }
  });
}

// check if two nodes overlap
function nodesOverlap(nodeA, nodeB) {
  // test if nodeA top partially overlaps nodeB
  if (nodeA.y0 > nodeB.y0 && nodeA.y0 < nodeB.y1) {
    return true;
  } else if (nodeA.y1 > nodeB.y0 && nodeA.y1 < nodeB.y1) {
    // test if nodeA bottom partially overlaps nodeB
    return true;
  } else if (nodeA.y0 < nodeB.y0 && nodeA.y1 > nodeB.y1) {
    // test if nodeA covers nodeB
    return true;
  } else {
    return false;
  }
}

// update a node, and its associated links, vertical positions (y0, y1)
function adjustNodeHeight(node, dy, sankeyY0, sankeyY1) {
  if (node.y0 + dy >= sankeyY0 && node.y1 + dy <= sankeyY1) {
    node.y0 = node.y0 + dy;
    node.y1 = node.y1 + dy;

    node.targetLinks.forEach(function (l) {
      l.y1 = l.y1 + dy;
    });

    node.sourceLinks.forEach(function (l) {
      l.y0 = l.y0 + dy;
    });
  }
  return node;
}

// sort and set the links' y0 for each node
function sortSourceLinks(graph, y1, id, moveNodes) {
  graph.nodes.forEach(function (node) {
    // move any nodes up which are off the bottom
    if (moveNodes && node.y + (node.y1 - node.y0) > y1) {
      node.y = node.y - (node.y + (node.y1 - node.y0) - y1);
    }

    var nodesSourceLinks = graph.links.filter(function (l) {
      return getNodeID(l.source, id) == getNodeID(node, id);
    });

    var nodeSourceLinksLength = nodesSourceLinks.length;

    // if more than 1 link then sort
    if (nodeSourceLinksLength > 1) {
      nodesSourceLinks.sort(function (link1, link2) {
        // if both are not circular...
        if (!link1.circular && !link2.circular) {
          // if the target nodes are the same column, then sort by the link's target y
          if (link1.target.column == link2.target.column) {
            return link1.y1 - link2.y1;
          } else if (!sameInclines(link1, link2)) {
            // if the links slope in different directions, then sort by the link's target y
            return link1.y1 - link2.y1;

            // if the links slope in same directions, then sort by any overlap
          } else {
            if (link1.target.column > link2.target.column) {
              var link2Adj = linkPerpendicularYToLinkTarget(link2, link1);
              return link1.y1 - link2Adj;
            }
            if (link2.target.column > link1.target.column) {
              var link1Adj = linkPerpendicularYToLinkTarget(link1, link2);
              return link1Adj - link2.y1;
            }
          }
        }

        // if only one is circular, the move top links up, or bottom links down
        if (link1.circular && !link2.circular) {
          return link1.circularLinkType == 'top' ? -1 : 1;
        } else if (link2.circular && !link1.circular) {
          return link2.circularLinkType == 'top' ? 1 : -1;
        }

        // if both links are circular...
        if (link1.circular && link2.circular) {
          // ...and they both loop the same way (both top)
          if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'top') {
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.target.column === link2.target.column) {
              return link1.target.y1 - link2.target.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link2.target.column - link1.target.column;
            }
          } else if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'bottom') {
            // ...and they both loop the same way (both bottom)
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.target.column === link2.target.column) {
              return link2.target.y1 - link1.target.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link1.target.column - link2.target.column;
            }
          } else {
            // ...and they loop around different ways, the move top up and bottom down
            return link1.circularLinkType == 'top' ? -1 : 1;
          }
        }
      });
    }

    // update y0 for links
    var ySourceOffset = node.y0;

    nodesSourceLinks.forEach(function (link) {
      link.y0 = ySourceOffset + link.width / 2;
      ySourceOffset = ySourceOffset + link.width;
    });

    // correct any circular bottom links so they are at the bottom of the node
    nodesSourceLinks.forEach(function (link, i) {
      if (link.circularLinkType == 'bottom') {
        var j = i + 1;
        var offsetFromBottom = 0;
        // sum the widths of any links that are below this link
        for (j; j < nodeSourceLinksLength; j++) {
          offsetFromBottom = offsetFromBottom + nodesSourceLinks[j].width;
        }
        link.y0 = node.y1 - offsetFromBottom - link.width / 2;
      }
    });
  });
}

// sort and set the links' y1 for each node
function sortTargetLinks(graph, y1, id) {
  graph.nodes.forEach(function (node) {
    var nodesTargetLinks = graph.links.filter(function (l) {
      return getNodeID(l.target, id) == getNodeID(node, id);
    });

    var nodesTargetLinksLength = nodesTargetLinks.length;

    if (nodesTargetLinksLength > 1) {
      nodesTargetLinks.sort(function (link1, link2) {
        // if both are not circular, the base on the source y position
        if (!link1.circular && !link2.circular) {
          if (link1.source.column == link2.source.column) {
            return link1.y0 - link2.y0;
          } else if (!sameInclines(link1, link2)) {
            return link1.y0 - link2.y0;
          } else {
            // get the angle of the link to the further source node (ie the smaller column)
            if (link2.source.column < link1.source.column) {
              var link2Adj = linkPerpendicularYToLinkSource(link2, link1);

              return link1.y0 - link2Adj;
            }
            if (link1.source.column < link2.source.column) {
              var link1Adj = linkPerpendicularYToLinkSource(link1, link2);

              return link1Adj - link2.y0;
            }
          }
        }

        // if only one is circular, the move top links up, or bottom links down
        if (link1.circular && !link2.circular) {
          return link1.circularLinkType == 'top' ? -1 : 1;
        } else if (link2.circular && !link1.circular) {
          return link2.circularLinkType == 'top' ? 1 : -1;
        }

        // if both links are circular...
        if (link1.circular && link2.circular) {
          // ...and they both loop the same way (both top)
          if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'top') {
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.source.column === link2.source.column) {
              return link1.source.y1 - link2.source.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link1.source.column - link2.source.column;
            }
          } else if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'bottom') {
            // ...and they both loop the same way (both bottom)
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.source.column === link2.source.column) {
              return link1.source.y1 - link2.source.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link2.source.column - link1.source.column;
            }
          } else {
            // ...and they loop around different ways, the move top up and bottom down
            return link1.circularLinkType == 'top' ? -1 : 1;
          }
        }
      });
    }

    // update y1 for links
    var yTargetOffset = node.y0;

    nodesTargetLinks.forEach(function (link) {
      link.y1 = yTargetOffset + link.width / 2;
      yTargetOffset = yTargetOffset + link.width;
    });

    // correct any circular bottom links so they are at the bottom of the node
    nodesTargetLinks.forEach(function (link, i) {
      if (link.circularLinkType == 'bottom') {
        var j = i + 1;
        var offsetFromBottom = 0;
        // sum the widths of any links that are below this link
        for (j; j < nodesTargetLinksLength; j++) {
          offsetFromBottom = offsetFromBottom + nodesTargetLinks[j].width;
        }
        link.y1 = node.y1 - offsetFromBottom - link.width / 2;
      }
    });
  });
}

// test if links both slope up, or both slope down
function sameInclines(link1, link2) {
  return incline(link1) == incline(link2);
}

// returns the slope of a link, from source to target
// up => slopes up from source to target
// down => slopes down from source to target
function incline(link) {
  return link.y0 - link.y1 > 0 ? 'up' : 'down';
}

// check if link is self linking, ie links a node to the same node
function selfLinking(link, id) {
  return getNodeID(link.source, id) == getNodeID(link.target, id);
}

function fillHeight(graph, y0, y1) {

  var nodes = graph.nodes;
  var links = graph.links;

  var top = false;
  var bottom = false;

  links.forEach(function (link) {
    if (link.circularLinkType == "top") {
      top = true;
    } else if (link.circularLinkType == "bottom") {
      bottom = true;
    }
  });

  if (top == false || bottom == false) {
    var minY0 = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.min)(nodes, function (node) {
      return node.y0;
    });
    var maxY1 = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.max)(nodes, function (node) {
      return node.y1;
    });
    var currentHeight = maxY1 - minY0;
    var chartHeight = y1 - y0;
    var ratio = chartHeight / currentHeight;

    nodes.forEach(function (node) {
      var nodeHeight = (node.y1 - node.y0) * ratio;
      node.y0 = (node.y0 - minY0) * ratio;
      node.y1 = node.y0 + nodeHeight;
    });

    links.forEach(function (link) {
      link.y0 = (link.y0 - minY0) * ratio;
      link.y1 = (link.y1 - minY0) * ratio;
      link.width = link.width * ratio;
    });
  }
}




/***/ }),

/***/ "./node_modules/@plotly/d3-sankey/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@plotly/d3-sankey/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sankey": () => (/* reexport safe */ _src_sankey__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "sankeyCenter": () => (/* reexport safe */ _src_align__WEBPACK_IMPORTED_MODULE_1__.center),
/* harmony export */   "sankeyLeft": () => (/* reexport safe */ _src_align__WEBPACK_IMPORTED_MODULE_1__.left),
/* harmony export */   "sankeyRight": () => (/* reexport safe */ _src_align__WEBPACK_IMPORTED_MODULE_1__.right),
/* harmony export */   "sankeyJustify": () => (/* reexport safe */ _src_align__WEBPACK_IMPORTED_MODULE_1__.justify),
/* harmony export */   "sankeyLinkHorizontal": () => (/* reexport safe */ _src_sankeyLinkHorizontal__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _src_sankey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/sankey */ "./node_modules/@plotly/d3-sankey/src/sankey.js");
/* harmony import */ var _src_align__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/align */ "./node_modules/@plotly/d3-sankey/src/align.js");
/* harmony import */ var _src_sankeyLinkHorizontal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/sankeyLinkHorizontal */ "./node_modules/@plotly/d3-sankey/src/sankeyLinkHorizontal.js");





/***/ }),

/***/ "./node_modules/@plotly/d3-sankey/src/align.js":
/*!*****************************************************!*\
  !*** ./node_modules/@plotly/d3-sankey/src/align.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "justify": () => (/* binding */ justify),
/* harmony export */   "center": () => (/* binding */ center)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");


function targetDepth(d) {
  return d.target.depth;
}

function left(node) {
  return node.depth;
}

function right(node, n) {
  return n - 1 - node.height;
}

function justify(node, n) {
  return node.sourceLinks.length ? node.depth : n - 1;
}

function center(node) {
  return node.targetLinks.length ? node.depth
      : node.sourceLinks.length ? (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.min)(node.sourceLinks, targetDepth) - 1
      : 0;
}


/***/ }),

/***/ "./node_modules/@plotly/d3-sankey/src/constant.js":
/*!********************************************************!*\
  !*** ./node_modules/@plotly/d3-sankey/src/constant.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ constant)
/* harmony export */ });
function constant(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/@plotly/d3-sankey/src/sankey.js":
/*!******************************************************!*\
  !*** ./node_modules/@plotly/d3-sankey/src/sankey.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/src/index.js");
/* harmony import */ var _align__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./align */ "./node_modules/@plotly/d3-sankey/src/align.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constant */ "./node_modules/@plotly/d3-sankey/src/constant.js");





function ascendingSourceBreadth(a, b) {
  return ascendingBreadth(a.source, b.source) || a.index - b.index;
}

function ascendingTargetBreadth(a, b) {
  return ascendingBreadth(a.target, b.target) || a.index - b.index;
}

function ascendingBreadth(a, b) {
  return a.y0 - b.y0;
}

function value(d) {
  return d.value;
}

function nodeCenter(node) {
  return (node.y0 + node.y1) / 2;
}

function weightedSource(link) {
  return nodeCenter(link.source) * link.value;
}

function weightedTarget(link) {
  return nodeCenter(link.target) * link.value;
}

function defaultId(d) {
  return d.index;
}

function defaultNodes(graph) {
  return graph.nodes;
}

function defaultLinks(graph) {
  return graph.links;
}

function find(nodeById, id) {
  var node = nodeById.get(id);
  if (!node) throw new Error("missing: " + id);
  return node;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var x0 = 0, y0 = 0, x1 = 1, y1 = 1, // extent
      dx = 24, // nodeWidth
      py = 8, // nodePadding
      id = defaultId,
      align = _align__WEBPACK_IMPORTED_MODULE_2__.justify,
      nodes = defaultNodes,
      links = defaultLinks,
      iterations = 32,
      maxPaddedSpace = 2 / 3; // Defined as a fraction of the total available space

  function sankey() {
    var graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
    computeNodeLinks(graph);
    computeNodeValues(graph);
    computeNodeDepths(graph);
    computeNodeBreadths(graph, iterations);
    computeLinkBreadths(graph);
    return graph;
  }

  sankey.update = function(graph) {
    computeLinkBreadths(graph);
    return graph;
  };

  sankey.nodeId = function(_) {
    return arguments.length ? (id = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_3__.default)(_), sankey) : id;
  };

  sankey.nodeAlign = function(_) {
    return arguments.length ? (align = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_3__.default)(_), sankey) : align;
  };

  sankey.nodeWidth = function(_) {
    return arguments.length ? (dx = +_, sankey) : dx;
  };

  sankey.nodePadding = function(_) {
    return arguments.length ? (py = +_, sankey) : py;
  };

  sankey.nodes = function(_) {
    return arguments.length ? (nodes = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_3__.default)(_), sankey) : nodes;
  };

  sankey.links = function(_) {
    return arguments.length ? (links = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_3__.default)(_), sankey) : links;
  };

  sankey.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankey) : [x1 - x0, y1 - y0];
  };

  sankey.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankey) : [[x0, y0], [x1, y1]];
  };

  sankey.iterations = function(_) {
    return arguments.length ? (iterations = +_, sankey) : iterations;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks(graph) {
    graph.nodes.forEach(function(node, i) {
      node.index = i;
      node.sourceLinks = [];
      node.targetLinks = [];
    });

    var nodeById = (0,d3_collection__WEBPACK_IMPORTED_MODULE_1__.map)(graph.nodes, id);
    graph.links.forEach(function(link, i) {
      link.index = i;
      var source = link.source, target = link.target;
      if (typeof source !== "object") source = link.source = find(nodeById, source);
      if (typeof target !== "object") target = link.target = find(nodeById, target);
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues(graph) {
    graph.nodes.forEach(function(node) {
      node.value = Math.max(
        (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.sourceLinks, value),
        (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the depth (x-position) for each node.
  // Nodes are assigned the maximum depth of incoming neighbors plus one;
  // nodes with no incoming links are assigned depth zero, while
  // nodes with no outgoing links are assigned the maximum depth.
  function computeNodeDepths(graph) {
    var nodes, next, x;

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function(node) {
        node.depth = x;
        node.sourceLinks.forEach(function(link) {
          if (next.indexOf(link.target) < 0) {
            next.push(link.target);
          }
        });
      });
    }

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function(node) {
        node.height = x;
        node.targetLinks.forEach(function(link) {
          if (next.indexOf(link.source) < 0) {
            next.push(link.source);
          }
        });
      });
    }

    var kx = (x1 - x0 - dx) / (x - 1);
    graph.nodes.forEach(function(node) {
      node.x1 = (node.x0 = x0 + Math.max(0, Math.min(x - 1, Math.floor(align.call(null, node, x)))) * kx) + dx;
    });
  }

  function computeNodeBreadths(graph) {
    var columns = (0,d3_collection__WEBPACK_IMPORTED_MODULE_1__.nest)()
        .key(function(d) { return d.x0; })
        .sortKeys(d3_array__WEBPACK_IMPORTED_MODULE_0__.ascending)
        .entries(graph.nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeBreadth();
    resolveCollisions();
    for (var alpha = 1, n = iterations; n > 0; --n) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeBreadth() {
      var L = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.max)(columns, function(nodes) {
        return nodes.length;
      });
      var maxNodePadding = maxPaddedSpace * (y1 - y0) / (L - 1);
      if(py > maxNodePadding) py = maxNodePadding;
      var ky = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.min)(columns, function(nodes) {
        return (y1 - y0 - (nodes.length - 1) * py) / (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(nodes, value);
      });

      columns.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y1 = (node.y0 = i) + node.value * ky;
        });
      });

      graph.links.forEach(function(link) {
        link.width = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      columns.forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var dy = ((0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.targetLinks, weightedSource) / (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.targetLinks, value) - nodeCenter(node)) * alpha;
            node.y0 += dy, node.y1 += dy;
          }
        });
      });
    }

    function relaxRightToLeft(alpha) {
      columns.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var dy = ((0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.sourceLinks, weightedTarget) / (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.sum)(node.sourceLinks, value) - nodeCenter(node)) * alpha;
            node.y0 += dy, node.y1 += dy;
          }
        });
      });
    }

    function resolveCollisions() {
      columns.forEach(function(nodes) {
        var node,
            dy,
            y = y0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingBreadth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y - node.y0;
          if (dy > 0) node.y0 += dy, node.y1 += dy;
          y = node.y1 + py;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y - py - y1;
        if (dy > 0) {
          y = (node.y0 -= dy), node.y1 -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y1 + py - y;
            if (dy > 0) node.y0 -= dy, node.y1 -= dy;
            y = node.y0;
          }
        }
      });
    }
  }

  function computeLinkBreadths(graph) {
    graph.nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetBreadth);
      node.targetLinks.sort(ascendingSourceBreadth);
    });
    graph.nodes.forEach(function(node) {
      var y0 = node.y0, y1 = y0;
      node.sourceLinks.forEach(function(link) {
        link.y0 = y0 + link.width / 2, y0 += link.width;
      });
      node.targetLinks.forEach(function(link) {
        link.y1 = y1 + link.width / 2, y1 += link.width;
      });
    });
  }

  return sankey;
}


/***/ }),

/***/ "./node_modules/@plotly/d3-sankey/src/sankeyLinkHorizontal.js":
/*!********************************************************************!*\
  !*** ./node_modules/@plotly/d3-sankey/src/sankeyLinkHorizontal.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-shape */ "./node_modules/d3-shape/src/link/index.js");


function horizontalSource(d) {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d) {
  return [d.target.x0, d.y1];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,d3_shape__WEBPACK_IMPORTED_MODULE_0__.linkHorizontal)()
      .source(horizontalSource)
      .target(horizontalTarget);
}


/***/ }),

/***/ "./node_modules/d3-array/src/array.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/array.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "map": () => (/* binding */ map)
/* harmony export */ });
var array = Array.prototype;

var slice = array.slice;
var map = array.map;


/***/ }),

/***/ "./node_modules/d3-array/src/ascending.js":
/*!************************************************!*\
  !*** ./node_modules/d3-array/src/ascending.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),

/***/ "./node_modules/d3-array/src/bisect.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/bisect.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bisectRight": () => (/* binding */ bisectRight),
/* harmony export */   "bisectLeft": () => (/* binding */ bisectLeft),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _bisector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bisector */ "./node_modules/d3-array/src/bisector.js");



var ascendingBisect = (0,_bisector__WEBPACK_IMPORTED_MODULE_1__.default)(_ascending__WEBPACK_IMPORTED_MODULE_0__.default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bisectRight);


/***/ }),

/***/ "./node_modules/d3-array/src/bisector.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/bisector.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending */ "./node_modules/d3-array/src/ascending.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return (0,_ascending__WEBPACK_IMPORTED_MODULE_0__.default)(f(d), x);
  };
}


/***/ }),

/***/ "./node_modules/d3-array/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/constant.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-array/src/cross.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/cross.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pairs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pairs */ "./node_modules/d3-array/src/pairs.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = _pairs__WEBPACK_IMPORTED_MODULE_0__.pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
}


/***/ }),

/***/ "./node_modules/d3-array/src/descending.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-array/src/descending.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}


/***/ }),

/***/ "./node_modules/d3-array/src/deviation.js":
/*!************************************************!*\
  !*** ./node_modules/d3-array/src/deviation.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _variance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variance */ "./node_modules/d3-array/src/variance.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array, f) {
  var v = (0,_variance__WEBPACK_IMPORTED_MODULE_0__.default)(array, f);
  return v ? Math.sqrt(v) : v;
}


/***/ }),

/***/ "./node_modules/d3-array/src/extent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/extent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}


/***/ }),

/***/ "./node_modules/d3-array/src/histogram.js":
/*!************************************************!*\
  !*** ./node_modules/d3-array/src/histogram.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./node_modules/d3-array/src/array.js");
/* harmony import */ var _bisect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bisect */ "./node_modules/d3-array/src/bisect.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-array/src/constant.js");
/* harmony import */ var _extent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extent */ "./node_modules/d3-array/src/extent.js");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./identity */ "./node_modules/d3-array/src/identity.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./range */ "./node_modules/d3-array/src/range.js");
/* harmony import */ var _ticks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ticks */ "./node_modules/d3-array/src/ticks.js");
/* harmony import */ var _threshold_sturges__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./threshold/sturges */ "./node_modules/d3-array/src/threshold/sturges.js");









/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var value = _identity__WEBPACK_IMPORTED_MODULE_4__.default,
      domain = _extent__WEBPACK_IMPORTED_MODULE_3__.default,
      threshold = _threshold_sturges__WEBPACK_IMPORTED_MODULE_7__.default;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = (0,_ticks__WEBPACK_IMPORTED_MODULE_6__.tickStep)(x0, x1, tz);
      tz = (0,_range__WEBPACK_IMPORTED_MODULE_5__.default)(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[(0,_bisect__WEBPACK_IMPORTED_MODULE_1__.default)(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_2__.default)(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_2__.default)([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? (0,_constant__WEBPACK_IMPORTED_MODULE_2__.default)(_array__WEBPACK_IMPORTED_MODULE_0__.slice.call(_)) : (0,_constant__WEBPACK_IMPORTED_MODULE_2__.default)(_), histogram) : threshold;
  };

  return histogram;
}


/***/ }),

/***/ "./node_modules/d3-array/src/identity.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/identity.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x;
}


/***/ }),

/***/ "./node_modules/d3-array/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bisect": () => (/* reexport safe */ _bisect__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "bisectRight": () => (/* reexport safe */ _bisect__WEBPACK_IMPORTED_MODULE_0__.bisectRight),
/* harmony export */   "bisectLeft": () => (/* reexport safe */ _bisect__WEBPACK_IMPORTED_MODULE_0__.bisectLeft),
/* harmony export */   "ascending": () => (/* reexport safe */ _ascending__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "bisector": () => (/* reexport safe */ _bisector__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "cross": () => (/* reexport safe */ _cross__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "descending": () => (/* reexport safe */ _descending__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "deviation": () => (/* reexport safe */ _deviation__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "extent": () => (/* reexport safe */ _extent__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "histogram": () => (/* reexport safe */ _histogram__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "thresholdFreedmanDiaconis": () => (/* reexport safe */ _threshold_freedmanDiaconis__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "thresholdScott": () => (/* reexport safe */ _threshold_scott__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "thresholdSturges": () => (/* reexport safe */ _threshold_sturges__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "max": () => (/* reexport safe */ _max__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "mean": () => (/* reexport safe */ _mean__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "median": () => (/* reexport safe */ _median__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "merge": () => (/* reexport safe */ _merge__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "min": () => (/* reexport safe */ _min__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "pairs": () => (/* reexport safe */ _pairs__WEBPACK_IMPORTED_MODULE_16__.default),
/* harmony export */   "permute": () => (/* reexport safe */ _permute__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "quantile": () => (/* reexport safe */ _quantile__WEBPACK_IMPORTED_MODULE_18__.default),
/* harmony export */   "range": () => (/* reexport safe */ _range__WEBPACK_IMPORTED_MODULE_19__.default),
/* harmony export */   "scan": () => (/* reexport safe */ _scan__WEBPACK_IMPORTED_MODULE_20__.default),
/* harmony export */   "shuffle": () => (/* reexport safe */ _shuffle__WEBPACK_IMPORTED_MODULE_21__.default),
/* harmony export */   "sum": () => (/* reexport safe */ _sum__WEBPACK_IMPORTED_MODULE_22__.default),
/* harmony export */   "ticks": () => (/* reexport safe */ _ticks__WEBPACK_IMPORTED_MODULE_23__.default),
/* harmony export */   "tickIncrement": () => (/* reexport safe */ _ticks__WEBPACK_IMPORTED_MODULE_23__.tickIncrement),
/* harmony export */   "tickStep": () => (/* reexport safe */ _ticks__WEBPACK_IMPORTED_MODULE_23__.tickStep),
/* harmony export */   "transpose": () => (/* reexport safe */ _transpose__WEBPACK_IMPORTED_MODULE_24__.default),
/* harmony export */   "variance": () => (/* reexport safe */ _variance__WEBPACK_IMPORTED_MODULE_25__.default),
/* harmony export */   "zip": () => (/* reexport safe */ _zip__WEBPACK_IMPORTED_MODULE_26__.default)
/* harmony export */ });
/* harmony import */ var _bisect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bisect */ "./node_modules/d3-array/src/bisect.js");
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ascending */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _bisector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bisector */ "./node_modules/d3-array/src/bisector.js");
/* harmony import */ var _cross__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cross */ "./node_modules/d3-array/src/cross.js");
/* harmony import */ var _descending__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./descending */ "./node_modules/d3-array/src/descending.js");
/* harmony import */ var _deviation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deviation */ "./node_modules/d3-array/src/deviation.js");
/* harmony import */ var _extent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extent */ "./node_modules/d3-array/src/extent.js");
/* harmony import */ var _histogram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./histogram */ "./node_modules/d3-array/src/histogram.js");
/* harmony import */ var _threshold_freedmanDiaconis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./threshold/freedmanDiaconis */ "./node_modules/d3-array/src/threshold/freedmanDiaconis.js");
/* harmony import */ var _threshold_scott__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./threshold/scott */ "./node_modules/d3-array/src/threshold/scott.js");
/* harmony import */ var _threshold_sturges__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./threshold/sturges */ "./node_modules/d3-array/src/threshold/sturges.js");
/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./max */ "./node_modules/d3-array/src/max.js");
/* harmony import */ var _mean__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mean */ "./node_modules/d3-array/src/mean.js");
/* harmony import */ var _median__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./median */ "./node_modules/d3-array/src/median.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./merge */ "./node_modules/d3-array/src/merge.js");
/* harmony import */ var _min__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./min */ "./node_modules/d3-array/src/min.js");
/* harmony import */ var _pairs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pairs */ "./node_modules/d3-array/src/pairs.js");
/* harmony import */ var _permute__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./permute */ "./node_modules/d3-array/src/permute.js");
/* harmony import */ var _quantile__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./quantile */ "./node_modules/d3-array/src/quantile.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./range */ "./node_modules/d3-array/src/range.js");
/* harmony import */ var _scan__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./scan */ "./node_modules/d3-array/src/scan.js");
/* harmony import */ var _shuffle__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./shuffle */ "./node_modules/d3-array/src/shuffle.js");
/* harmony import */ var _sum__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./sum */ "./node_modules/d3-array/src/sum.js");
/* harmony import */ var _ticks__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ticks */ "./node_modules/d3-array/src/ticks.js");
/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./transpose */ "./node_modules/d3-array/src/transpose.js");
/* harmony import */ var _variance__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./variance */ "./node_modules/d3-array/src/variance.js");
/* harmony import */ var _zip__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./zip */ "./node_modules/d3-array/src/zip.js");





























/***/ }),

/***/ "./node_modules/d3-array/src/max.js":
/*!******************************************!*\
  !*** ./node_modules/d3-array/src/max.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
}


/***/ }),

/***/ "./node_modules/d3-array/src/mean.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-array/src/mean.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./node_modules/d3-array/src/number.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = (0,_number__WEBPACK_IMPORTED_MODULE_0__.default)(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = (0,_number__WEBPACK_IMPORTED_MODULE_0__.default)(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
}


/***/ }),

/***/ "./node_modules/d3-array/src/median.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/median.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number */ "./node_modules/d3-array/src/number.js");
/* harmony import */ var _quantile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quantile */ "./node_modules/d3-array/src/quantile.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = (0,_number__WEBPACK_IMPORTED_MODULE_1__.default)(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = (0,_number__WEBPACK_IMPORTED_MODULE_1__.default)(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return (0,_quantile__WEBPACK_IMPORTED_MODULE_2__.default)(numbers.sort(_ascending__WEBPACK_IMPORTED_MODULE_0__.default), 0.5);
}


/***/ }),

/***/ "./node_modules/d3-array/src/merge.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/merge.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}


/***/ }),

/***/ "./node_modules/d3-array/src/min.js":
/*!******************************************!*\
  !*** ./node_modules/d3-array/src/min.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
}


/***/ }),

/***/ "./node_modules/d3-array/src/number.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/number.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x === null ? NaN : +x;
}


/***/ }),

/***/ "./node_modules/d3-array/src/pairs.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/pairs.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "pair": () => (/* binding */ pair)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
}

function pair(a, b) {
  return [a, b];
}


/***/ }),

/***/ "./node_modules/d3-array/src/permute.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-array/src/permute.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
}


/***/ }),

/***/ "./node_modules/d3-array/src/quantile.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/quantile.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./node_modules/d3-array/src/number.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, p, valueof) {
  if (valueof == null) valueof = _number__WEBPACK_IMPORTED_MODULE_0__.default;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}


/***/ }),

/***/ "./node_modules/d3-array/src/range.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/range.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}


/***/ }),

/***/ "./node_modules/d3-array/src/scan.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-array/src/scan.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending */ "./node_modules/d3-array/src/ascending.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = _ascending__WEBPACK_IMPORTED_MODULE_0__.default;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
}


/***/ }),

/***/ "./node_modules/d3-array/src/shuffle.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-array/src/shuffle.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
}


/***/ }),

/***/ "./node_modules/d3-array/src/sum.js":
/*!******************************************!*\
  !*** ./node_modules/d3-array/src/sum.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
}


/***/ }),

/***/ "./node_modules/d3-array/src/threshold/freedmanDiaconis.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-array/src/threshold/freedmanDiaconis.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array */ "./node_modules/d3-array/src/array.js");
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ascending */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../number */ "./node_modules/d3-array/src/number.js");
/* harmony import */ var _quantile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../quantile */ "./node_modules/d3-array/src/quantile.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, min, max) {
  values = _array__WEBPACK_IMPORTED_MODULE_0__.map.call(values, _number__WEBPACK_IMPORTED_MODULE_2__.default).sort(_ascending__WEBPACK_IMPORTED_MODULE_1__.default);
  return Math.ceil((max - min) / (2 * ((0,_quantile__WEBPACK_IMPORTED_MODULE_3__.default)(values, 0.75) - (0,_quantile__WEBPACK_IMPORTED_MODULE_3__.default)(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}


/***/ }),

/***/ "./node_modules/d3-array/src/threshold/scott.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-array/src/threshold/scott.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _deviation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deviation */ "./node_modules/d3-array/src/deviation.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, min, max) {
  return Math.ceil((max - min) / (3.5 * (0,_deviation__WEBPACK_IMPORTED_MODULE_0__.default)(values) * Math.pow(values.length, -1 / 3)));
}


/***/ }),

/***/ "./node_modules/d3-array/src/threshold/sturges.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-array/src/threshold/sturges.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}


/***/ }),

/***/ "./node_modules/d3-array/src/ticks.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/ticks.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "tickIncrement": () => (/* binding */ tickIncrement),
/* harmony export */   "tickStep": () => (/* binding */ tickStep)
/* harmony export */ });
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}


/***/ }),

/***/ "./node_modules/d3-array/src/transpose.js":
/*!************************************************!*\
  !*** ./node_modules/d3-array/src/transpose.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./min */ "./node_modules/d3-array/src/min.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = (0,_min__WEBPACK_IMPORTED_MODULE_0__.default)(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}

function length(d) {
  return d.length;
}


/***/ }),

/***/ "./node_modules/d3-array/src/variance.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/variance.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./node_modules/d3-array/src/number.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = (0,_number__WEBPACK_IMPORTED_MODULE_0__.default)(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = (0,_number__WEBPACK_IMPORTED_MODULE_0__.default)(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
}


/***/ }),

/***/ "./node_modules/d3-array/src/zip.js":
/*!******************************************!*\
  !*** ./node_modules/d3-array/src/zip.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transpose */ "./node_modules/d3-array/src/transpose.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_transpose__WEBPACK_IMPORTED_MODULE_0__.default)(arguments);
}


/***/ }),

/***/ "./node_modules/d3-collection/src/entries.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-collection/src/entries.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
}


/***/ }),

/***/ "./node_modules/d3-collection/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-collection/src/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nest": () => (/* reexport safe */ _nest__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "set": () => (/* reexport safe */ _set__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "map": () => (/* reexport safe */ _map__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "keys": () => (/* reexport safe */ _keys__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "values": () => (/* reexport safe */ _values__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "entries": () => (/* reexport safe */ _entries__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _nest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nest */ "./node_modules/d3-collection/src/nest.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set */ "./node_modules/d3-collection/src/set.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ "./node_modules/d3-collection/src/map.js");
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keys */ "./node_modules/d3-collection/src/keys.js");
/* harmony import */ var _values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./values */ "./node_modules/d3-collection/src/values.js");
/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entries */ "./node_modules/d3-collection/src/entries.js");








/***/ }),

/***/ "./node_modules/d3-collection/src/keys.js":
/*!************************************************!*\
  !*** ./node_modules/d3-collection/src/keys.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
}


/***/ }),

/***/ "./node_modules/d3-collection/src/map.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-collection/src/map.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (map);


/***/ }),

/***/ "./node_modules/d3-collection/src/nest.js":
/*!************************************************!*\
  !*** ./node_modules/d3-collection/src/nest.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./node_modules/d3-collection/src/map.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = (0,_map__WEBPACK_IMPORTED_MODULE_0__.default)(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();
    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
}

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return (0,_map__WEBPACK_IMPORTED_MODULE_0__.default)();
}

function setMap(map, key, value) {
  map.set(key, value);
}


/***/ }),

/***/ "./node_modules/d3-collection/src/set.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-collection/src/set.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./node_modules/d3-collection/src/map.js");


function Set() {}

var proto = _map__WEBPACK_IMPORTED_MODULE_0__.default.prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[_map__WEBPACK_IMPORTED_MODULE_0__.prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (set);


/***/ }),

/***/ "./node_modules/d3-collection/src/values.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-collection/src/values.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
}


/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "darker": () => (/* binding */ darker),
/* harmony export */   "brighter": () => (/* binding */ brighter),
/* harmony export */   "default": () => (/* binding */ color),
/* harmony export */   "rgbConvert": () => (/* binding */ rgbConvert),
/* harmony export */   "rgb": () => (/* binding */ rgb),
/* harmony export */   "Rgb": () => (/* binding */ Rgb),
/* harmony export */   "hslConvert": () => (/* binding */ hslConvert),
/* harmony export */   "hsl": () => (/* binding */ hsl)
/* harmony export */ });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__.default)(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__.default)(Rgb, rgb, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__.default)(Hsl, hsl, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./node_modules/d3-color/src/cubehelix.js":
/*!************************************************!*\
  !*** ./node_modules/d3-color/src/cubehelix.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cubehelix),
/* harmony export */   "Cubehelix": () => (/* binding */ Cubehelix)
/* harmony export */ });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-color/src/math.js");




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_0__.Rgb)) o = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.rgbConvert)(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * _math_js__WEBPACK_IMPORTED_MODULE_1__.rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_2__.default)(Cubehelix, cubehelix, (0,_define_js__WEBPACK_IMPORTED_MODULE_2__.extend)(_color_js__WEBPACK_IMPORTED_MODULE_0__.Color, {
  brighter: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_0__.brighter : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_0__.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_0__.darker : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_0__.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math_js__WEBPACK_IMPORTED_MODULE_1__.deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color_js__WEBPACK_IMPORTED_MODULE_0__.Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "extend": () => (/* binding */ extend)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "./node_modules/d3-color/src/lab.js":
/*!******************************************!*\
  !*** ./node_modules/d3-color/src/lab.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gray": () => (/* binding */ gray),
/* harmony export */   "default": () => (/* binding */ lab),
/* harmony export */   "Lab": () => (/* binding */ Lab),
/* harmony export */   "lch": () => (/* binding */ lch),
/* harmony export */   "hcl": () => (/* binding */ hcl),
/* harmony export */   "Hcl": () => (/* binding */ Hcl)
/* harmony export */ });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-color/src/math.js");




// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_0__.Rgb)) o = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_1__.default)(Lab, lab, (0,_define_js__WEBPACK_IMPORTED_MODULE_1__.extend)(_color_js__WEBPACK_IMPORTED_MODULE_0__.Color, {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color_js__WEBPACK_IMPORTED_MODULE_0__.Rgb(
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math_js__WEBPACK_IMPORTED_MODULE_2__.rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math_js__WEBPACK_IMPORTED_MODULE_2__.deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_1__.default)(Hcl, hcl, (0,_define_js__WEBPACK_IMPORTED_MODULE_1__.extend)(_color_js__WEBPACK_IMPORTED_MODULE_0__.Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));


/***/ }),

/***/ "./node_modules/d3-color/src/math.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-color/src/math.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deg2rad": () => (/* binding */ deg2rad),
/* harmony export */   "rad2deg": () => (/* binding */ rad2deg)
/* harmony export */ });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),

/***/ "./node_modules/d3-dispatch/src/dispatch.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-dispatch/src/dispatch.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);


/***/ }),

/***/ "./node_modules/d3-force/src/center.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-force/src/center.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {
  var nodes;

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/collide.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-force/src/collide.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-force/src/constant.js");
/* harmony import */ var _jiggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jiggle */ "./node_modules/d3-force/src/jiggle.js");
/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-quadtree */ "./node_modules/d3-quadtree/src/quadtree.js");




function x(d) {
  return d.x + d.vx;
}

function y(d) {
  return d.y + d.vy;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius) {
  var nodes,
      radii,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = (0,d3_quadtree__WEBPACK_IMPORTED_MODULE_2__.default)(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)(), l += x * x;
            if (y === 0) y = (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)(), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : radius;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-force/src/constant.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-force/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-force/src/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forceCenter": () => (/* reexport safe */ _center__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "forceCollide": () => (/* reexport safe */ _collide__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "forceLink": () => (/* reexport safe */ _link__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "forceManyBody": () => (/* reexport safe */ _manyBody__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "forceRadial": () => (/* reexport safe */ _radial__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "forceSimulation": () => (/* reexport safe */ _simulation__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "forceX": () => (/* reexport safe */ _x__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "forceY": () => (/* reexport safe */ _y__WEBPACK_IMPORTED_MODULE_7__.default)
/* harmony export */ });
/* harmony import */ var _center__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./center */ "./node_modules/d3-force/src/center.js");
/* harmony import */ var _collide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collide */ "./node_modules/d3-force/src/collide.js");
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./link */ "./node_modules/d3-force/src/link.js");
/* harmony import */ var _manyBody__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manyBody */ "./node_modules/d3-force/src/manyBody.js");
/* harmony import */ var _radial__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./radial */ "./node_modules/d3-force/src/radial.js");
/* harmony import */ var _simulation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./simulation */ "./node_modules/d3-force/src/simulation.js");
/* harmony import */ var _x__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./x */ "./node_modules/d3-force/src/x.js");
/* harmony import */ var _y__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./y */ "./node_modules/d3-force/src/y.js");










/***/ }),

/***/ "./node_modules/d3-force/src/jiggle.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-force/src/jiggle.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (Math.random() - 0.5) * 1e-6;
}


/***/ }),

/***/ "./node_modules/d3-force/src/link.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-force/src/link.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-force/src/constant.js");
/* harmony import */ var _jiggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jiggle */ "./node_modules/d3-force/src/jiggle.js");
/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/src/index.js");




function index(d) {
  return d.index;
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("missing: " + nodeId);
  return node;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(30),
      distances,
      nodes,
      count,
      bias,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)();
        y = target.y + target.vy - source.y - source.vy || (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)();
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = (0,d3_collection__WEBPACK_IMPORTED_MODULE_2__.map)(nodes, id),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initializeDistance(), force) : distance;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/manyBody.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-force/src/manyBody.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-force/src/constant.js");
/* harmony import */ var _jiggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jiggle */ "./node_modules/d3-force/src/jiggle.js");
/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-quadtree */ "./node_modules/d3-quadtree/src/quadtree.js");
/* harmony import */ var _simulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simulation */ "./node_modules/d3-force/src/simulation.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var nodes,
      node,
      alpha,
      strength = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = (0,d3_quadtree__WEBPACK_IMPORTED_MODULE_3__.default)(nodes, _simulation__WEBPACK_IMPORTED_MODULE_2__.x, _simulation__WEBPACK_IMPORTED_MODULE_2__.y).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)(), l += x * x;
        if (y === 0) y = (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)(), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)(), l += x * x;
      if (y === 0) y = (0,_jiggle__WEBPACK_IMPORTED_MODULE_1__.default)(), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/radial.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-force/src/radial.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-force/src/constant.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius, x, y) {
  var nodes,
      strength = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(0.1),
      strengths,
      radiuses;

  if (typeof radius !== "function") radius = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+radius);
  if (x == null) x = 0;
  if (y == null) y = 0;

  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i],
          dx = node.x - x || 1e-6,
          dy = node.y - y || 1e-6,
          r = Math.sqrt(dx * dx + dy * dy),
          k = (radiuses[i] - r) * strengths[i] * alpha / r;
      node.vx += dx * k;
      node.vy += dy * k;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    radiuses = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _, initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : radius;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/simulation.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-force/src/simulation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ x),
/* harmony export */   "y": () => (/* binding */ y),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/src/dispatch.js");
/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/src/index.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timer.js");




function x(d) {
  return d.x;
}

function y(d) {
  return d.y;
}

var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = (0,d3_collection__WEBPACK_IMPORTED_MODULE_0__.map)(),
      stepper = (0,d3_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(step),
      event = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_2__.default)("tick", "end");

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;

    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;

      forces.each(function (force) {
        force(alpha);
      });

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.remove(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}


/***/ }),

/***/ "./node_modules/d3-force/src/x.js":
/*!****************************************!*\
  !*** ./node_modules/d3-force/src/x.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-force/src/constant.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  var strength = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(0.1),
      nodes,
      strengths,
      xz;

  if (typeof x !== "function") x = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(x == null ? 0 : +x);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : strength;
  };

  force.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : x;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/y.js":
/*!****************************************!*\
  !*** ./node_modules/d3-force/src/y.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-force/src/constant.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(y) {
  var strength = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(0.1),
      nodes,
      strengths,
      yz;

  if (typeof y !== "function") y = (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(y == null ? 0 : +y);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : strength;
  };

  force.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0,_constant__WEBPACK_IMPORTED_MODULE_0__.default)(+_), initialize(), force) : y;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/array.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/array.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "genericArray": () => (/* binding */ genericArray)
/* harmony export */ });
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.js */ "./node_modules/d3-interpolate/src/value.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numberArray.js */ "./node_modules/d3-interpolate/src/numberArray.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return ((0,_numberArray_js__WEBPACK_IMPORTED_MODULE_0__.isNumberArray)(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_0__.default : genericArray)(a, b);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = (0,_value_js__WEBPACK_IMPORTED_MODULE_1__.default)(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basis.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basis.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "basis": () => (/* binding */ basis),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basisClosed.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basisClosed.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return (0,_basis_js__WEBPACK_IMPORTED_MODULE_0__.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/color.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/color.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hue": () => (/* binding */ hue),
/* harmony export */   "gamma": () => (/* binding */ gamma),
/* harmony export */   "default": () => (/* binding */ nogamma)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-interpolate/src/constant.js");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(isNaN(a) ? b : a);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/constant.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/constant.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/cubehelix.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-interpolate/src/cubehelix.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "cubehelixLong": () => (/* binding */ cubehelixLong)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/cubehelix.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_0__.default)(start)).h, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_0__.default)(end)).h),
          s = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.s, end.s),
          l = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.l, end.l),
          opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__.hue));
var cubehelixLong = cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__.default);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/date.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/date.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/discrete.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/discrete.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/hcl.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/hcl.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hclLong": () => (/* binding */ hclLong)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/lab.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_0__.hcl)(start)).h, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_0__.hcl)(end)).h),
        c = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.c, end.c),
        l = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.l, end.l),
        opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__.hue));
var hclLong = hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__.default);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/hsl.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/hsl.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hslLong": () => (/* binding */ hslLong)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_0__.hsl)(start)).h, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_0__.hsl)(end)).h),
        s = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.s, end.s),
        l = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.l, end.l),
        opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.default)(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__.hue));
var hslLong = hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__.default);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/hue.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/hue.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var i = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.hue)(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/index.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interpolate": () => (/* reexport safe */ _value_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "interpolateArray": () => (/* reexport safe */ _array_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "interpolateBasis": () => (/* reexport safe */ _basis_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "interpolateBasisClosed": () => (/* reexport safe */ _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "interpolateDate": () => (/* reexport safe */ _date_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "interpolateDiscrete": () => (/* reexport safe */ _discrete_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "interpolateHue": () => (/* reexport safe */ _hue_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "interpolateNumber": () => (/* reexport safe */ _number_js__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "interpolateNumberArray": () => (/* reexport safe */ _numberArray_js__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "interpolateObject": () => (/* reexport safe */ _object_js__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "interpolateRound": () => (/* reexport safe */ _round_js__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "interpolateString": () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "interpolateTransformCss": () => (/* reexport safe */ _transform_index_js__WEBPACK_IMPORTED_MODULE_12__.interpolateTransformCss),
/* harmony export */   "interpolateTransformSvg": () => (/* reexport safe */ _transform_index_js__WEBPACK_IMPORTED_MODULE_12__.interpolateTransformSvg),
/* harmony export */   "interpolateZoom": () => (/* reexport safe */ _zoom_js__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "interpolateRgb": () => (/* reexport safe */ _rgb_js__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "interpolateRgbBasis": () => (/* reexport safe */ _rgb_js__WEBPACK_IMPORTED_MODULE_14__.rgbBasis),
/* harmony export */   "interpolateRgbBasisClosed": () => (/* reexport safe */ _rgb_js__WEBPACK_IMPORTED_MODULE_14__.rgbBasisClosed),
/* harmony export */   "interpolateHsl": () => (/* reexport safe */ _hsl_js__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "interpolateHslLong": () => (/* reexport safe */ _hsl_js__WEBPACK_IMPORTED_MODULE_15__.hslLong),
/* harmony export */   "interpolateLab": () => (/* reexport safe */ _lab_js__WEBPACK_IMPORTED_MODULE_16__.default),
/* harmony export */   "interpolateHcl": () => (/* reexport safe */ _hcl_js__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "interpolateHclLong": () => (/* reexport safe */ _hcl_js__WEBPACK_IMPORTED_MODULE_17__.hclLong),
/* harmony export */   "interpolateCubehelix": () => (/* reexport safe */ _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__.default),
/* harmony export */   "interpolateCubehelixLong": () => (/* reexport safe */ _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__.cubehelixLong),
/* harmony export */   "piecewise": () => (/* reexport safe */ _piecewise_js__WEBPACK_IMPORTED_MODULE_19__.default),
/* harmony export */   "quantize": () => (/* reexport safe */ _quantize_js__WEBPACK_IMPORTED_MODULE_20__.default)
/* harmony export */ });
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "./node_modules/d3-interpolate/src/value.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array.js */ "./node_modules/d3-interpolate/src/array.js");
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ "./node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date.js */ "./node_modules/d3-interpolate/src/date.js");
/* harmony import */ var _discrete_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discrete.js */ "./node_modules/d3-interpolate/src/discrete.js");
/* harmony import */ var _hue_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hue.js */ "./node_modules/d3-interpolate/src/hue.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ "./node_modules/d3-interpolate/src/numberArray.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./object.js */ "./node_modules/d3-interpolate/src/object.js");
/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./round.js */ "./node_modules/d3-interpolate/src/round.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./string.js */ "./node_modules/d3-interpolate/src/string.js");
/* harmony import */ var _transform_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./transform/index.js */ "./node_modules/d3-interpolate/src/transform/index.js");
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./zoom.js */ "./node_modules/d3-interpolate/src/zoom.js");
/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rgb.js */ "./node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var _hsl_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./hsl.js */ "./node_modules/d3-interpolate/src/hsl.js");
/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lab.js */ "./node_modules/d3-interpolate/src/lab.js");
/* harmony import */ var _hcl_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./hcl.js */ "./node_modules/d3-interpolate/src/hcl.js");
/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cubehelix.js */ "./node_modules/d3-interpolate/src/cubehelix.js");
/* harmony import */ var _piecewise_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./piecewise.js */ "./node_modules/d3-interpolate/src/piecewise.js");
/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./quantize.js */ "./node_modules/d3-interpolate/src/quantize.js");























/***/ }),

/***/ "./node_modules/d3-interpolate/src/lab.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/lab.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ lab)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/lab.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");



function lab(start, end) {
  var l = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.default)((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.default)(start)).l, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.default)(end)).l),
      a = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.default)(start.a, end.a),
      b = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.default)(start.b, end.b),
      opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.default)(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/number.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/number.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/numberArray.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/numberArray.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "isNumberArray": () => (/* binding */ isNumberArray)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/object.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/object.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "./node_modules/d3-interpolate/src/value.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = (0,_value_js__WEBPACK_IMPORTED_MODULE_0__.default)(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/piecewise.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-interpolate/src/piecewise.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ piecewise)
/* harmony export */ });
function piecewise(interpolate, values) {
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/quantize.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/quantize.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/rgb.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/rgb.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "rgbBasis": () => (/* binding */ rgbBasis),
/* harmony export */   "rgbBasisClosed": () => (/* binding */ rgbBasisClosed)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ "./node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function rgbGamma(y) {
  var color = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.gamma)(y);

  function rgb(start, end) {
    var r = color((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(start)).r, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.default)(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_2__.default);
var rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_3__.default);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/round.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/round.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/string.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/string.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-interpolate/src/number.js");


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/decompose.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/decompose.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interpolateTransformCss": () => (/* binding */ interpolateTransformCss),
/* harmony export */   "interpolateTransformSvg": () => (/* binding */ interpolateTransformSvg)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./node_modules/d3-interpolate/src/transform/parse.js");



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseSvg, ", ", ")", ")");


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/parse.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/parse.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseCss": () => (/* binding */ parseCss),
/* harmony export */   "parseSvg": () => (/* binding */ parseSvg)
/* harmony export */ });
/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ "./node_modules/d3-interpolate/src/transform/decompose.js");


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__.default)(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  value = value.matrix;
  return (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/value.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/value.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rgb.js */ "./node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./array.js */ "./node_modules/d3-interpolate/src/array.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date.js */ "./node_modules/d3-interpolate/src/date.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./object.js */ "./node_modules/d3-interpolate/src/object.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string.js */ "./node_modules/d3-interpolate/src/string.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-interpolate/src/constant.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./numberArray.js */ "./node_modules/d3-interpolate/src/numberArray.js");










/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(b)
      : (t === "number" ? _number_js__WEBPACK_IMPORTED_MODULE_1__.default
      : t === "string" ? ((c = (0,d3_color__WEBPACK_IMPORTED_MODULE_2__.default)(b)) ? (b = c, _rgb_js__WEBPACK_IMPORTED_MODULE_3__.default) : _string_js__WEBPACK_IMPORTED_MODULE_4__.default)
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_2__.default ? _rgb_js__WEBPACK_IMPORTED_MODULE_3__.default
      : b instanceof Date ? _date_js__WEBPACK_IMPORTED_MODULE_5__.default
      : (0,_numberArray_js__WEBPACK_IMPORTED_MODULE_6__.isNumberArray)(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_6__.default
      : Array.isArray(b) ? _array_js__WEBPACK_IMPORTED_MODULE_7__.genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object_js__WEBPACK_IMPORTED_MODULE_8__.default
      : _number_js__WEBPACK_IMPORTED_MODULE_1__.default)(a, b);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/zoom.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/zoom.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    }
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    }
  }

  i.duration = S * 1000;

  return i;
}


/***/ }),

/***/ "./node_modules/d3-path/src/path.js":
/*!******************************************!*\
  !*** ./node_modules/d3-path/src/path.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (path);


/***/ }),

/***/ "./node_modules/d3-quadtree/src/add.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-quadtree/src/add.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "addAll": () => (/* binding */ addAll)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(d) {
  var x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/cover.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-quadtree/src/cover.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/data.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/data.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/extent.js":
/*!************************************************!*\
  !*** ./node_modules/d3-quadtree/src/extent.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/find.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/find.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ "./node_modules/d3-quadtree/src/quad.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(node[3], xm, ym, x2, y2),
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(node[2], x1, ym, xm, y2),
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(node[1], xm, y1, x2, ym),
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/quad.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/quad.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/quadtree.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-quadtree/src/quadtree.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ quadtree)
/* harmony export */ });
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add.js */ "./node_modules/d3-quadtree/src/add.js");
/* harmony import */ var _cover_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cover.js */ "./node_modules/d3-quadtree/src/cover.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data.js */ "./node_modules/d3-quadtree/src/data.js");
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extent.js */ "./node_modules/d3-quadtree/src/extent.js");
/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./find.js */ "./node_modules/d3-quadtree/src/find.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./remove.js */ "./node_modules/d3-quadtree/src/remove.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./root.js */ "./node_modules/d3-quadtree/src/root.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./size.js */ "./node_modules/d3-quadtree/src/size.js");
/* harmony import */ var _visit_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./visit.js */ "./node_modules/d3-quadtree/src/visit.js");
/* harmony import */ var _visitAfter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./visitAfter.js */ "./node_modules/d3-quadtree/src/visitAfter.js");
/* harmony import */ var _x_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./x.js */ "./node_modules/d3-quadtree/src/x.js");
/* harmony import */ var _y_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./y.js */ "./node_modules/d3-quadtree/src/y.js");













function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? _x_js__WEBPACK_IMPORTED_MODULE_0__.defaultX : x, y == null ? _y_js__WEBPACK_IMPORTED_MODULE_1__.defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = _add_js__WEBPACK_IMPORTED_MODULE_2__.default;
treeProto.addAll = _add_js__WEBPACK_IMPORTED_MODULE_2__.addAll;
treeProto.cover = _cover_js__WEBPACK_IMPORTED_MODULE_3__.default;
treeProto.data = _data_js__WEBPACK_IMPORTED_MODULE_4__.default;
treeProto.extent = _extent_js__WEBPACK_IMPORTED_MODULE_5__.default;
treeProto.find = _find_js__WEBPACK_IMPORTED_MODULE_6__.default;
treeProto.remove = _remove_js__WEBPACK_IMPORTED_MODULE_7__.default;
treeProto.removeAll = _remove_js__WEBPACK_IMPORTED_MODULE_7__.removeAll;
treeProto.root = _root_js__WEBPACK_IMPORTED_MODULE_8__.default;
treeProto.size = _size_js__WEBPACK_IMPORTED_MODULE_9__.default;
treeProto.visit = _visit_js__WEBPACK_IMPORTED_MODULE_10__.default;
treeProto.visitAfter = _visitAfter_js__WEBPACK_IMPORTED_MODULE_11__.default;
treeProto.x = _x_js__WEBPACK_IMPORTED_MODULE_0__.default;
treeProto.y = _y_js__WEBPACK_IMPORTED_MODULE_1__.default;


/***/ }),

/***/ "./node_modules/d3-quadtree/src/remove.js":
/*!************************************************!*\
  !*** ./node_modules/d3-quadtree/src/remove.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "removeAll": () => (/* binding */ removeAll)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/root.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/root.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this._root;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/size.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/size.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/visit.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-quadtree/src/visit.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ "./node_modules/d3-quadtree/src/quad.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, x0, y0, xm, ym));
    }
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/visitAfter.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-quadtree/src/visitAfter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ "./node_modules/d3-quadtree/src/quad.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__.default(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/x.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-quadtree/src/x.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultX": () => (/* binding */ defaultX),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function defaultX(d) {
  return d[0];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/y.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-quadtree/src/y.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultY": () => (/* binding */ defaultY),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function defaultY(d) {
  return d[1];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}


/***/ }),

/***/ "./node_modules/d3-shape/src/array.js":
/*!********************************************!*\
  !*** ./node_modules/d3-shape/src/array.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slice": () => (/* binding */ slice)
/* harmony export */ });
var slice = Array.prototype.slice;


/***/ }),

/***/ "./node_modules/d3-shape/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-shape/src/constant.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function constant() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-shape/src/link/index.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-shape/src/link/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "linkHorizontal": () => (/* binding */ linkHorizontal),
/* harmony export */   "linkVertical": () => (/* binding */ linkVertical),
/* harmony export */   "linkRadial": () => (/* binding */ linkRadial)
/* harmony export */ });
/* harmony import */ var d3_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-path */ "./node_modules/d3-path/src/path.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../array.js */ "./node_modules/d3-shape/src/array.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constant.js */ "./node_modules/d3-shape/src/constant.js");
/* harmony import */ var _point_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../point.js */ "./node_modules/d3-shape/src/point.js");
/* harmony import */ var _pointRadial_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pointRadial.js */ "./node_modules/d3-shape/src/pointRadial.js");






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = _point_js__WEBPACK_IMPORTED_MODULE_0__.x,
      y = _point_js__WEBPACK_IMPORTED_MODULE_0__.y,
      context = null;

  function link() {
    var buffer, argv = _array_js__WEBPACK_IMPORTED_MODULE_1__.slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = (0,d3_path__WEBPACK_IMPORTED_MODULE_2__.default)();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_3__.default)(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_3__.default)(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_4__.default)(x0, y0),
      p1 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_4__.default)(x0, y0 = (y0 + y1) / 2),
      p2 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_4__.default)(x1, y0),
      p3 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_4__.default)(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}


/***/ }),

/***/ "./node_modules/d3-shape/src/point.js":
/*!********************************************!*\
  !*** ./node_modules/d3-shape/src/point.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ x),
/* harmony export */   "y": () => (/* binding */ y)
/* harmony export */ });
function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}


/***/ }),

/***/ "./node_modules/d3-shape/src/pointRadial.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-shape/src/pointRadial.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}


/***/ }),

/***/ "./node_modules/d3-timer/src/timer.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/timer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "Timer": () => (/* binding */ Timer),
/* harmony export */   "timer": () => (/* binding */ timer),
/* harmony export */   "timerFlush": () => (/* binding */ timerFlush)
/* harmony export */ });
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),

/***/ "./node_modules/elementary-circuits-directed-graph/johnson.js":
/*!********************************************************************!*\
  !*** ./node_modules/elementary-circuits-directed-graph/johnson.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var tarjan = __webpack_require__(/*! strongly-connected-components */ "./node_modules/strongly-connected-components/scc.js");

module.exports = function findCircuits(edges, cb) {
    var circuits = []; // Output

    var stack = [];
    var blocked = [];
    var B = {};
    var Ak = [];
    var s;

    function unblock(u) {
        blocked[u] = false;
        if(B.hasOwnProperty(u)) {
            Object.keys(B[u]).forEach(function(w) {
                delete B[u][w];
                if(blocked[w]) {unblock(w);}
            });
        }
    }

    function circuit(v) {
        var found = false;

        stack.push(v);
        blocked[v] = true;

        // L1
        var i;
        var w;
        for(i = 0; i < Ak[v].length; i++) {
            w = Ak[v][i];
            if(w === s) {
                output(s, stack);
                found = true;
            } else if(!blocked[w]) {
                found = circuit(w);
            }
        }

        // L2
        if(found) {
            unblock(v);
        } else {
            for(i = 0; i < Ak[v].length; i++) {
                w = Ak[v][i];
                var entry = B[w];

                if(!entry) {
                    entry = {};
                    B[w] = entry;
                }

                entry[w] = true;
            }
        }
        stack.pop();
        return found;
    }

    function output(start, stack) {
        var cycle = [].concat(stack).concat(start);
        if(cb) {
            cb(circuit);
        } else {
            circuits.push(cycle);
        }
    }

    function subgraph(minId) {
      // Remove edges with indice smaller than minId
        for(var i = 0; i < edges.length; i++) {
            if(i < minId) edges[i] = [];
            edges[i] = edges[i].filter(function(i) {
                return i >= minId;
            });
        }
    }

    function adjacencyStructureSCC(from) {
        // Make subgraph starting from vertex minId
        subgraph(from);
        var g = edges;

        // Find strongly connected components using Tarjan algorithm
        var sccs = tarjan(g);

        // Filter out trivial connected components (ie. made of one node)
        var ccs = sccs.components.filter(function(scc) {
            return scc.length > 1;
        });

        // Find least vertex
        var leastVertex = Infinity;
        var leastVertexComponent;
        for(var i = 0; i < ccs.length; i++) {
            for(var j = 0; j < ccs[i].length; j++) {
                if(ccs[i][j] < leastVertex) {
                    leastVertex = ccs[i][j];
                    leastVertexComponent = i;
                }
            }
        }

        var cc = ccs[leastVertexComponent];

        if(!cc) return false;

        // Return the adjacency list of first component
        var adjList = edges.map(function(l, index) {
            if(cc.indexOf(index) === -1) return [];
            return l.filter(function(i) {
                return cc.indexOf(i) !== -1;
            });
        });

        return {
            leastVertex: leastVertex,
            adjList: adjList
        };
    }

    s = 0;
    var n = edges.length;
    while(s < n) {
        // find strong component with least vertex in
        // subgraph starting from vertex `s`
        var p = adjacencyStructureSCC(s);

        // Its least vertex
        s = p.leastVertex;
        // Its adjacency list
        Ak = p.adjList;

        if(Ak) {
            for(var i = 0; i < Ak.length; i++) {
                for(var j = 0; j < Ak[i].length; j++) {
                    var vertexId = Ak[i][j];
                    blocked[+vertexId] = false;
                    B[vertexId] = {};
                }
            }
            circuit(s);
            s = s + 1;
        } else {
            s = n;
        }

    }

    if(cb) {
        return;
    } else {
        return circuits;
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/lib/sankey.js":
/*!**********************************************!*\
  !*** ./node_modules/plotly.js/lib/sankey.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/sankey */ "./node_modules/plotly.js/src/traces/sankey/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/attributes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/attributes.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var fxAttrs = __webpack_require__(/*! ../../components/fx/attributes */ "./node_modules/plotly.js/src/components/fx/attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var colorAttributes = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var templatedArray = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js").templatedArray;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").FORMAT_LINK;

var attrs = module.exports = overrideAll({
    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: [],
        arrayOk: false,
        description: [
            'Determines which trace information appear on hover.',
            'If `none` or `skip` are set, no information is displayed upon hovering.',
            'But, if `none` is set, click and hover events are still fired.',
            'Note that this attribute is superseded by `node.hoverinfo` and `node.hoverinfo`',
            'for nodes and links respectively.'
        ].join(' ')
    }),
    hoverlabel: fxAttrs.hoverlabel,
    domain: domainAttrs({name: 'sankey', trace: true}),

    orientation: {
        valType: 'enumerated',
        values: ['v', 'h'],
        dflt: 'h',
        role: 'style',
        description: 'Sets the orientation of the Sankey diagram.'
    },

    valueformat: {
        valType: 'string',
        dflt: '.3s',
        role: 'style',
        description: [
            'Sets the value formatting rule using d3 formatting mini-language',
            'which is similar to those of Python. See',
            FORMAT_LINK
        ].join(' ')
    },

    valuesuffix: {
        valType: 'string',
        dflt: '',
        role: 'style',
        description: [
            'Adds a unit to follow the value in the hover tooltip. Add a space if a separation',
            'is necessary from the value.'
        ].join(' ')
    },

    arrangement: {
        valType: 'enumerated',
        values: ['snap', 'perpendicular', 'freeform', 'fixed'],
        dflt: 'snap',
        role: 'style',
        description: [
            'If value is `snap` (the default), the node arrangement is assisted by automatic snapping of elements to',
            'preserve space between nodes specified via `nodepad`.',
            'If value is `perpendicular`, the nodes can only move along a line perpendicular to the flow.',
            'If value is `freeform`, the nodes can freely move on the plane.',
            'If value is `fixed`, the nodes are stationary.'
        ].join(' ')
    },

    textfont: fontAttrs({
        description: 'Sets the font for node labels'
    }),

    // Remove top-level customdata
    customdata: undefined,

    node: {
        label: {
            valType: 'data_array',
            dflt: [],
            role: 'info',
            description: 'The shown name of the node.'
        },
        groups: {
            valType: 'info_array',
            impliedEdits: {'x': [], 'y': []},
            dimensions: 2,
            freeLength: true,
            dflt: [],
            items: {valType: 'number', editType: 'calc'},
            role: 'info',
            description: [
                'Groups of nodes.',
                'Each group is defined by an array with the indices of the nodes it contains.',
                'Multiple groups can be specified.'
            ].join(' ')
        },
        x: {
            valType: 'data_array',
            dflt: [],
            role: 'info',
            description: 'The normalized horizontal position of the node.'
        },
        y: {
            valType: 'data_array',
            dflt: [],
            role: 'info',
            description: 'The normalized vertical position of the node.'
        },
        color: {
            valType: 'color',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the `node` color. It can be a single value, or an array for specifying color for each `node`.',
                'If `node.color` is omitted, then the default `Plotly` color palette will be cycled through',
                'to have a variety of colors. These defaults are not fully opaque, to allow some visibility of',
                'what is beneath the node.'
            ].join(' ')
        },
        customdata: {
            valType: 'data_array',
            editType: 'calc',
            description: [
                'Assigns extra data to each node.'
            ].join(' ')
        },
        line: {
            color: {
                valType: 'color',
                role: 'style',
                dflt: colorAttrs.defaultLine,
                arrayOk: true,
                description: [
                    'Sets the color of the `line` around each `node`.'
                ].join(' ')
            },
            width: {
                valType: 'number',
                role: 'style',
                min: 0,
                dflt: 0.5,
                arrayOk: true,
                description: [
                    'Sets the width (in px) of the `line` around each `node`.'
                ].join(' ')
            }
        },
        pad: {
            valType: 'number',
            arrayOk: false,
            min: 0,
            dflt: 20,
            role: 'style',
            description: 'Sets the padding (in px) between the `nodes`.'
        },
        thickness: {
            valType: 'number',
            arrayOk: false,
            min: 1,
            dflt: 20,
            role: 'style',
            description: 'Sets the thickness (in px) of the `nodes`.'
        },
        hoverinfo: {
            valType: 'enumerated',
            values: ['all', 'none', 'skip'],
            dflt: 'all',
            role: 'info',
            description: [
                'Determines which trace information appear when hovering nodes.',
                'If `none` or `skip` are set, no information is displayed upon hovering.',
                'But, if `none` is set, click and hover events are still fired.'
            ].join(' ')
        },
        hoverlabel: fxAttrs.hoverlabel, // needs editType override,
        hovertemplate: hovertemplateAttrs({}, {
            description: 'Variables `sourceLinks` and `targetLinks` are arrays of link objects.',
            keys: ['value', 'label']
        }),
        description: 'The nodes of the Sankey plot.'
    },

    link: {
        label: {
            valType: 'data_array',
            dflt: [],
            role: 'info',
            description: 'The shown name of the link.'
        },
        color: {
            valType: 'color',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the `link` color. It can be a single value, or an array for specifying color for each `link`.',
                'If `link.color` is omitted, then by default, a translucent grey link will be used.'
            ].join(' ')
        },
        customdata: {
            valType: 'data_array',
            editType: 'calc',
            description: [
                'Assigns extra data to each link.'
            ].join(' ')
        },
        line: {
            color: {
                valType: 'color',
                role: 'style',
                dflt: colorAttrs.defaultLine,
                arrayOk: true,
                description: [
                    'Sets the color of the `line` around each `link`.'
                ].join(' ')
            },
            width: {
                valType: 'number',
                role: 'style',
                min: 0,
                dflt: 0,
                arrayOk: true,
                description: [
                    'Sets the width (in px) of the `line` around each `link`.'
                ].join(' ')
            }
        },
        source: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            description: 'An integer number `[0..nodes.length - 1]` that represents the source node.'
        },
        target: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            description: 'An integer number `[0..nodes.length - 1]` that represents the target node.'
        },
        value: {
            valType: 'data_array',
            dflt: [],
            role: 'info',
            description: 'A numeric value representing the flow volume value.'
        },
        hoverinfo: {
            valType: 'enumerated',
            values: ['all', 'none', 'skip'],
            dflt: 'all',
            role: 'info',
            description: [
                'Determines which trace information appear when hovering links.',
                'If `none` or `skip` are set, no information is displayed upon hovering.',
                'But, if `none` is set, click and hover events are still fired.'
            ].join(' ')
        },
        hoverlabel: fxAttrs.hoverlabel, // needs editType override,
        hovertemplate: hovertemplateAttrs({}, {
            description: 'Variables `source` and `target` are node objects.',
            keys: ['value', 'label']
        }),
        colorscales: templatedArray('concentrationscales', {
            editType: 'calc',
            label: {
                valType: 'string',
                role: 'info',
                editType: 'calc',
                description: 'The label of the links to color based on their concentration within a flow.',
                dflt: ''
            },
            cmax: {
                valType: 'number',
                role: 'info',
                editType: 'calc',
                dflt: 1,
                description: [
                    'Sets the upper bound of the color domain.'
                ].join('')
            },
            cmin: {
                valType: 'number',
                role: 'info',
                editType: 'calc',
                dflt: 0,
                description: [
                    'Sets the lower bound of the color domain.'
                ].join('')
            },
            colorscale: extendFlat(colorAttributes().colorscale, {dflt: [[0, 'white'], [1, 'black']]})
        }),
        description: 'The links of the Sankey plot.',
        role: 'info'
    }
}, 'calc', 'nested');
attrs.transforms = undefined;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/base_plot.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/base_plot.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;
var getModuleCalcData = __webpack_require__(/*! ../../plots/get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getModuleCalcData;
var plot = __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/sankey/plot.js");
var fxAttrs = __webpack_require__(/*! ../../components/fx/layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");

var setCursor = __webpack_require__(/*! ../../lib/setcursor */ "./node_modules/plotly.js/src/lib/setcursor.js");
var dragElement = __webpack_require__(/*! ../../components/dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var prepSelect = __webpack_require__(/*! ../../plots/cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").prepSelect;
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var SANKEY = 'sankey';

exports.name = SANKEY;

exports.baseLayoutAttrOverrides = overrideAll({
    hoverlabel: fxAttrs.hoverlabel
}, 'plot', 'nested');

exports.plot = function(gd) {
    var calcData = getModuleCalcData(gd.calcdata, SANKEY)[0];
    plot(gd, calcData);
    exports.updateFx(gd);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var hadPlot = (oldFullLayout._has && oldFullLayout._has(SANKEY));
    var hasPlot = (newFullLayout._has && newFullLayout._has(SANKEY));

    if(hadPlot && !hasPlot) {
        oldFullLayout._paperdiv.selectAll('.sankey').remove();
        oldFullLayout._paperdiv.selectAll('.bgsankey').remove();
    }
};

exports.updateFx = function(gd) {
    for(var i = 0; i < gd._fullData.length; i++) {
        subplotUpdateFx(gd, i);
    }
};

function subplotUpdateFx(gd, index) {
    var trace = gd._fullData[index];
    var fullLayout = gd._fullLayout;

    var dragMode = fullLayout.dragmode;
    var cursor = fullLayout.dragmode === 'pan' ? 'move' : 'crosshair';
    var bgRect = trace._bgRect;

    if(dragMode === 'pan' || dragMode === 'zoom') return;

    setCursor(bgRect, cursor);

    var xaxis = {
        _id: 'x',
        c2p: Lib.identity,
        _offset: trace._sankey.translateX,
        _length: trace._sankey.width
    };
    var yaxis = {
        _id: 'y',
        c2p: Lib.identity,
        _offset: trace._sankey.translateY,
        _length: trace._sankey.height
    };

    // Note: dragOptions is needed to be declared for all dragmodes because
    // it's the object that holds persistent selection state.
    var dragOptions = {
        gd: gd,
        element: bgRect.node(),
        plotinfo: {
            id: index,
            xaxis: xaxis,
            yaxis: yaxis,
            fillRangeItems: Lib.noop
        },
        subplot: index,
        // create mock x/y axes for hover routine
        xaxes: [xaxis],
        yaxes: [yaxis],
        doneFnCompleted: function(selection) {
            var traceNow = gd._fullData[index];
            var newGroups;
            var oldGroups = traceNow.node.groups.slice();
            var newGroup = [];

            function findNode(pt) {
                var nodes = traceNow._sankey.graph.nodes;
                for(var i = 0; i < nodes.length; i++) {
                    if(nodes[i].pointNumber === pt) return nodes[i];
                }
            }

            for(var j = 0; j < selection.length; j++) {
                var node = findNode(selection[j].pointNumber);
                if(!node) continue;

                // If the node represents a group
                if(node.group) {
                    // Add all its children to the current selection
                    for(var k = 0; k < node.childrenNodes.length; k++) {
                        newGroup.push(node.childrenNodes[k].pointNumber);
                    }
                    // Flag group for removal from existing list of groups
                    oldGroups[node.pointNumber - traceNow.node._count] = false;
                } else {
                    newGroup.push(node.pointNumber);
                }
            }

            newGroups = oldGroups
                .filter(Boolean)
                .concat([newGroup]);

            Registry.call('_guiRestyle', gd, {
                'node.groups': [ newGroups ]
            }, index);
        }
    };

    dragOptions.prepFn = function(e, startX, startY) {
        prepSelect(e, startX, startY, dragOptions, dragMode);
    };

    dragElement.init(dragOptions);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/calc.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/calc.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var tarjan = __webpack_require__(/*! strongly-connected-components */ "./node_modules/strongly-connected-components/scc.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var wrap = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js").wrap;

var isArrayOrTypedArray = Lib.isArrayOrTypedArray;
var isIndex = Lib.isIndex;
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");

function convertToD3Sankey(trace) {
    var nodeSpec = trace.node;
    var linkSpec = trace.link;

    var links = [];
    var hasLinkColorArray = isArrayOrTypedArray(linkSpec.color);
    var hasLinkCustomdataArray = isArrayOrTypedArray(linkSpec.customdata);
    var linkedNodes = {};

    var components = {};
    var componentCount = linkSpec.colorscales.length;
    var i;
    for(i = 0; i < componentCount; i++) {
        var cscale = linkSpec.colorscales[i];
        var specs = Colorscale.extractScale(cscale, {cLetter: 'c'});
        var scale = Colorscale.makeColorScaleFunc(specs);
        components[cscale.label] = scale;
    }

    var maxNodeId = 0;
    for(i = 0; i < linkSpec.value.length; i++) {
        if(linkSpec.source[i] > maxNodeId) maxNodeId = linkSpec.source[i];
        if(linkSpec.target[i] > maxNodeId) maxNodeId = linkSpec.target[i];
    }
    var nodeCount = maxNodeId + 1;
    trace.node._count = nodeCount;

    // Group nodes
    var j;
    var groups = trace.node.groups;
    var groupLookup = {};
    for(i = 0; i < groups.length; i++) {
        var group = groups[i];
        // Build a lookup table to quickly find in which group a node is
        for(j = 0; j < group.length; j++) {
            var nodeIndex = group[j];
            var groupIndex = nodeCount + i;
            if(groupLookup.hasOwnProperty(nodeIndex)) {
                Lib.warn('Node ' + nodeIndex + ' is already part of a group.');
            } else {
                groupLookup[nodeIndex] = groupIndex;
            }
        }
    }

    // Process links
    var groupedLinks = {
        source: [],
        target: []
    };
    for(i = 0; i < linkSpec.value.length; i++) {
        var val = linkSpec.value[i];
        // remove negative values, but keep zeros with special treatment
        var source = linkSpec.source[i];
        var target = linkSpec.target[i];
        if(!(val > 0 && isIndex(source, nodeCount) && isIndex(target, nodeCount))) {
            continue;
        }

        // Remove links that are within the same group
        if(groupLookup.hasOwnProperty(source) && groupLookup.hasOwnProperty(target) && groupLookup[source] === groupLookup[target]) {
            continue;
        }

        // if link targets a node in the group, relink target to that group
        if(groupLookup.hasOwnProperty(target)) {
            target = groupLookup[target];
        }

        // if link originates from a node in a group, relink source to that group
        if(groupLookup.hasOwnProperty(source)) {
            source = groupLookup[source];
        }

        source = +source;
        target = +target;
        linkedNodes[source] = linkedNodes[target] = true;

        var label = '';
        if(linkSpec.label && linkSpec.label[i]) label = linkSpec.label[i];

        var concentrationscale = null;
        if(label && components.hasOwnProperty(label)) concentrationscale = components[label];

        links.push({
            pointNumber: i,
            label: label,
            color: hasLinkColorArray ? linkSpec.color[i] : linkSpec.color,
            customdata: hasLinkCustomdataArray ? linkSpec.customdata[i] : linkSpec.customdata,
            concentrationscale: concentrationscale,
            source: source,
            target: target,
            value: +val
        });

        groupedLinks.source.push(source);
        groupedLinks.target.push(target);
    }

    // Process nodes
    var totalCount = nodeCount + groups.length;
    var hasNodeColorArray = isArrayOrTypedArray(nodeSpec.color);
    var hasNodeCustomdataArray = isArrayOrTypedArray(nodeSpec.customdata);
    var nodes = [];
    for(i = 0; i < totalCount; i++) {
        if(!linkedNodes[i]) continue;
        var l = nodeSpec.label[i];

        nodes.push({
            group: (i > nodeCount - 1),
            childrenNodes: [],
            pointNumber: i,
            label: l,
            color: hasNodeColorArray ? nodeSpec.color[i] : nodeSpec.color,
            customdata: hasNodeCustomdataArray ? nodeSpec.customdata[i] : nodeSpec.customdata
        });
    }

    // Check if we have circularity on the resulting graph
    var circular = false;
    if(circularityPresent(totalCount, groupedLinks.source, groupedLinks.target)) {
        circular = true;
    }

    return {
        circular: circular,
        links: links,
        nodes: nodes,

        // Data structure for groups
        groups: groups,
        groupLookup: groupLookup
    };
}

function circularityPresent(nodeLen, sources, targets) {
    var nodes = Lib.init2dArray(nodeLen, 0);

    for(var i = 0; i < Math.min(sources.length, targets.length); i++) {
        if(Lib.isIndex(sources[i], nodeLen) && Lib.isIndex(targets[i], nodeLen)) {
            if(sources[i] === targets[i]) {
                return true; // self-link which is also a scc of one
            }
            nodes[sources[i]].push(targets[i]);
        }
    }

    var scc = tarjan(nodes);

    // Tarján's strongly connected components algorithm coded by Mikola Lysenko
    // returns at least one non-singular component if there's circularity in the graph
    return scc.components.some(function(c) {
        return c.length > 1;
    });
}

module.exports = function calc(gd, trace) {
    var result = convertToD3Sankey(trace);

    return wrap({
        circular: result.circular,
        _nodes: result.nodes,
        _links: result.links,

        // Data structure for grouping
        _groups: result.groups,
        _groupLookup: result.groupLookup,
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/constants.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/constants.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = {
    nodeTextOffsetHorizontal: 4,
    nodeTextOffsetVertical: 3,
    nodePadAcross: 10,
    sankeyIterations: 50,
    forceIterations: 5,
    forceTicksPerFrame: 10,
    duration: 500,
    ease: 'linear',
    cn: {
        sankey: 'sankey',
        sankeyLinks: 'sankey-links',
        sankeyLink: 'sankey-link',
        sankeyNodeSet: 'sankey-node-set',
        sankeyNode: 'sankey-node',
        nodeRect: 'node-rect',
        nodeCapture: 'node-capture',
        nodeCentered: 'node-entered',
        nodeLabelGuide: 'node-label-guide',
        nodeLabel: 'node-label',
        nodeLabelTextPath: 'node-label-text-path'
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/defaults.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/sankey/attributes.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleHoverLabelDefaults = __webpack_require__(/*! ../../components/fx/hoverlabel_defaults */ "./node_modules/plotly.js/src/components/fx/hoverlabel_defaults.js");
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleArrayContainerDefaults = __webpack_require__(/*! ../../plots/array_container_defaults */ "./node_modules/plotly.js/src/plots/array_container_defaults.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var hoverlabelDefault = Lib.extendDeep(layout.hoverlabel, traceIn.hoverlabel);

    // node attributes
    var nodeIn = traceIn.node;
    var nodeOut = Template.newContainer(traceOut, 'node');

    function coerceNode(attr, dflt) {
        return Lib.coerce(nodeIn, nodeOut, attributes.node, attr, dflt);
    }
    coerceNode('label');
    coerceNode('groups');
    coerceNode('x');
    coerceNode('y');
    coerceNode('pad');
    coerceNode('thickness');
    coerceNode('line.color');
    coerceNode('line.width');
    coerceNode('hoverinfo', traceIn.hoverinfo);
    handleHoverLabelDefaults(nodeIn, nodeOut, coerceNode, hoverlabelDefault);
    coerceNode('hovertemplate');

    var colors = layout.colorway;

    var defaultNodePalette = function(i) {return colors[i % colors.length];};

    coerceNode('color', nodeOut.label.map(function(d, i) {
        return Color.addOpacity(defaultNodePalette(i), 0.8);
    }));
    coerceNode('customdata');

    // link attributes
    var linkIn = traceIn.link || {};
    var linkOut = Template.newContainer(traceOut, 'link');

    function coerceLink(attr, dflt) {
        return Lib.coerce(linkIn, linkOut, attributes.link, attr, dflt);
    }
    coerceLink('label');
    coerceLink('source');
    coerceLink('target');
    coerceLink('value');
    coerceLink('line.color');
    coerceLink('line.width');
    coerceLink('hoverinfo', traceIn.hoverinfo);
    handleHoverLabelDefaults(linkIn, linkOut, coerceLink, hoverlabelDefault);
    coerceLink('hovertemplate');

    var defaultLinkColor = tinycolor(layout.paper_bgcolor).getLuminance() < 0.333 ?
                'rgba(255, 255, 255, 0.6)' :
                'rgba(0, 0, 0, 0.2)';

    coerceLink('color', Lib.repeat(defaultLinkColor, linkOut.value.length));
    coerceLink('customdata');

    handleArrayContainerDefaults(linkIn, linkOut, {
        name: 'colorscales',
        handleItemDefaults: concentrationscalesDefaults
    });

    handleDomainDefaults(traceOut, layout, coerce);

    coerce('orientation');
    coerce('valueformat');
    coerce('valuesuffix');

    var dfltArrangement;
    if(nodeOut.x.length && nodeOut.y.length) {
        dfltArrangement = 'freeform';
    }
    coerce('arrangement', dfltArrangement);

    Lib.coerceFont(coerce, 'textfont', Lib.extendFlat({}, layout.font));

    // disable 1D transforms - arrays here are 1D but their lengths/meanings
    // don't match, between nodes and links
    traceOut._length = null;
};

function concentrationscalesDefaults(In, Out) {
    function coerce(attr, dflt) {
        return Lib.coerce(In, Out, attributes.link.colorscales, attr, dflt);
    }

    coerce('label');
    coerce('cmin');
    coerce('cmax');
    coerce('colorscale');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/sankey/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/sankey/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/sankey/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/sankey/plot.js"),

    moduleType: 'trace',
    name: 'sankey',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/sankey/base_plot.js"),
    selectPoints: __webpack_require__(/*! ./select.js */ "./node_modules/plotly.js/src/traces/sankey/select.js"),
    categories: ['noOpacity'],
    meta: {
        description: [
            'Sankey plots for network flow data analysis.',
            'The nodes are specified in `nodes` and the links between sources and targets in `links`.',
            'The colors are set in `nodes[i].color` and `links[i].color`, otherwise defaults are used.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/plot.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/plot.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var render = __webpack_require__(/*! ./render */ "./node_modules/plotly.js/src/traces/sankey/render.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var cn = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/sankey/constants.js").cn;

var _ = Lib._;

function renderableValuePresent(d) {return d !== '';}

function ownTrace(selection, d) {
    return selection.filter(function(s) {return s.key === d.traceId;});
}

function makeTranslucent(element, alpha) {
    d3.select(element)
        .select('path')
        .style('fill-opacity', alpha);
    d3.select(element)
        .select('rect')
        .style('fill-opacity', alpha);
}

function makeTextContrasty(element) {
    d3.select(element)
        .select('text.name')
        .style('fill', 'black');
}

function relatedLinks(d) {
    return function(l) {
        return d.node.sourceLinks.indexOf(l.link) !== -1 || d.node.targetLinks.indexOf(l.link) !== -1;
    };
}

function relatedNodes(l) {
    return function(d) {
        return d.node.sourceLinks.indexOf(l.link) !== -1 || d.node.targetLinks.indexOf(l.link) !== -1;
    };
}

function nodeHoveredStyle(sankeyNode, d, sankey) {
    if(d && sankey) {
        ownTrace(sankey, d)
            .selectAll('.' + cn.sankeyLink)
            .filter(relatedLinks(d))
            .call(linkHoveredStyle.bind(0, d, sankey, false));
    }
}

function nodeNonHoveredStyle(sankeyNode, d, sankey) {
    if(d && sankey) {
        ownTrace(sankey, d)
            .selectAll('.' + cn.sankeyLink)
            .filter(relatedLinks(d))
            .call(linkNonHoveredStyle.bind(0, d, sankey, false));
    }
}

function linkHoveredStyle(d, sankey, visitNodes, sankeyLink) {
    var label = sankeyLink.datum().link.label;

    sankeyLink.style('fill-opacity', function(l) {
        if(!l.link.concentrationscale) {
            return 0.4;
        }
    });

    if(label) {
        ownTrace(sankey, d)
            .selectAll('.' + cn.sankeyLink)
            .filter(function(l) {return l.link.label === label;})
            .style('fill-opacity', function(l) {
                if(!l.link.concentrationscale) {
                    return 0.4;
                }
            });
    }

    if(visitNodes) {
        ownTrace(sankey, d)
            .selectAll('.' + cn.sankeyNode)
            .filter(relatedNodes(d))
            .call(nodeHoveredStyle);
    }
}

function linkNonHoveredStyle(d, sankey, visitNodes, sankeyLink) {
    var label = sankeyLink.datum().link.label;

    sankeyLink.style('fill-opacity', function(d) {return d.tinyColorAlpha;});
    if(label) {
        ownTrace(sankey, d)
            .selectAll('.' + cn.sankeyLink)
            .filter(function(l) {return l.link.label === label;})
            .style('fill-opacity', function(d) {return d.tinyColorAlpha;});
    }

    if(visitNodes) {
        ownTrace(sankey, d)
            .selectAll(cn.sankeyNode)
            .filter(relatedNodes(d))
            .call(nodeNonHoveredStyle);
    }
}

// does not support array values for now
function castHoverOption(trace, attr) {
    var labelOpts = trace.hoverlabel || {};
    var val = Lib.nestedProperty(labelOpts, attr).get();
    return Array.isArray(val) ? false : val;
}

module.exports = function plot(gd, calcData) {
    var fullLayout = gd._fullLayout;
    var svg = fullLayout._paper;
    var size = fullLayout._size;

    // stash initial view
    for(var i = 0; i < gd._fullData.length; i++) {
        if(!gd._fullData[i].visible) continue;
        if(gd._fullData[i].type !== cn.sankey) continue;
        if(!gd._fullData[i]._viewInitial) {
            var node = gd._fullData[i].node;
            gd._fullData[i]._viewInitial = {
                node: {
                    groups: node.groups.slice(),
                    x: node.x.slice(),
                    y: node.y.slice()
                }
            };
        }
    }

    var linkSelect = function(element, d) {
        var evt = d.link;
        evt.originalEvent = d3.event;
        gd._hoverdata = [evt];
        Fx.click(gd, { target: true });
    };

    var linkHover = function(element, d, sankey) {
        if(gd._fullLayout.hovermode === false) return;
        d3.select(element).call(linkHoveredStyle.bind(0, d, sankey, true));
        if(d.link.trace.link.hoverinfo !== 'skip') {
            d.link.fullData = d.link.trace;
            gd.emit('plotly_hover', {
                event: d3.event,
                points: [d.link]
            });
        }
    };

    var sourceLabel = _(gd, 'source:') + ' ';
    var targetLabel = _(gd, 'target:') + ' ';
    var concentrationLabel = _(gd, 'concentration:') + ' ';
    var incomingLabel = _(gd, 'incoming flow count:') + ' ';
    var outgoingLabel = _(gd, 'outgoing flow count:') + ' ';

    var linkHoverFollow = function(element, d) {
        if(gd._fullLayout.hovermode === false) return;
        var obj = d.link.trace.link;
        if(obj.hoverinfo === 'none' || obj.hoverinfo === 'skip') return;

        var hoverItems = [];

        function hoverCenterPosition(link) {
            var hoverCenterX, hoverCenterY;
            if(link.circular) {
                hoverCenterX = (link.circularPathData.leftInnerExtent + link.circularPathData.rightInnerExtent) / 2;
                hoverCenterY = link.circularPathData.verticalFullExtent;
            } else {
                hoverCenterX = (link.source.x1 + link.target.x0) / 2;
                hoverCenterY = (link.y0 + link.y1) / 2;
            }
            var center = [hoverCenterX, hoverCenterY];
            if(link.trace.orientation === 'v') center.reverse();
            center[0] += d.parent.translateX;
            center[1] += d.parent.translateY;
            return center;
        }

        // For each related links, create a hoverItem
        var anchorIndex = 0;
        for(var i = 0; i < d.flow.links.length; i++) {
            var link = d.flow.links[i];
            if(gd._fullLayout.hovermode === 'closest' && d.link.pointNumber !== link.pointNumber) continue;
            if(d.link.pointNumber === link.pointNumber) anchorIndex = i;
            link.fullData = link.trace;
            obj = d.link.trace.link;
            var hoverCenter = hoverCenterPosition(link);
            var hovertemplateLabels = {valueLabel: d3.format(d.valueFormat)(link.value) + d.valueSuffix};

            hoverItems.push({
                x: hoverCenter[0],
                y: hoverCenter[1],
                name: hovertemplateLabels.valueLabel,
                text: [
                    link.label || '',
                    sourceLabel + link.source.label,
                    targetLabel + link.target.label,
                    link.concentrationscale ? concentrationLabel + d3.format('%0.2f')(link.flow.labelConcentration) : ''
                ].filter(renderableValuePresent).join('<br>'),
                color: castHoverOption(obj, 'bgcolor') || Color.addOpacity(link.color, 1),
                borderColor: castHoverOption(obj, 'bordercolor'),
                fontFamily: castHoverOption(obj, 'font.family'),
                fontSize: castHoverOption(obj, 'font.size'),
                fontColor: castHoverOption(obj, 'font.color'),
                nameLength: castHoverOption(obj, 'namelength'),
                textAlign: castHoverOption(obj, 'align'),
                idealAlign: d3.event.x < hoverCenter[0] ? 'right' : 'left',

                hovertemplate: obj.hovertemplate,
                hovertemplateLabels: hovertemplateLabels,
                eventData: [link]
            });
        }

        var tooltips = Fx.loneHover(hoverItems, {
            container: fullLayout._hoverlayer.node(),
            outerContainer: fullLayout._paper.node(),
            gd: gd,
            anchorIndex: anchorIndex
        });

        tooltips.each(function() {
            var tooltip = this;
            if(!d.link.concentrationscale) {
                makeTranslucent(tooltip, 0.65);
            }
            makeTextContrasty(tooltip);
        });
    };

    var linkUnhover = function(element, d, sankey) {
        if(gd._fullLayout.hovermode === false) return;
        d3.select(element).call(linkNonHoveredStyle.bind(0, d, sankey, true));
        if(d.link.trace.link.hoverinfo !== 'skip') {
            d.link.fullData = d.link.trace;
            gd.emit('plotly_unhover', {
                event: d3.event,
                points: [d.link]
            });
        }

        Fx.loneUnhover(fullLayout._hoverlayer.node());
    };

    var nodeSelect = function(element, d, sankey) {
        var evt = d.node;
        evt.originalEvent = d3.event;
        gd._hoverdata = [evt];
        d3.select(element).call(nodeNonHoveredStyle, d, sankey);
        Fx.click(gd, { target: true });
    };

    var nodeHover = function(element, d, sankey) {
        if(gd._fullLayout.hovermode === false) return;
        d3.select(element).call(nodeHoveredStyle, d, sankey);
        if(d.node.trace.node.hoverinfo !== 'skip') {
            d.node.fullData = d.node.trace;
            gd.emit('plotly_hover', {
                event: d3.event,
                points: [d.node]
            });
        }
    };

    var nodeHoverFollow = function(element, d) {
        if(gd._fullLayout.hovermode === false) return;

        var obj = d.node.trace.node;
        if(obj.hoverinfo === 'none' || obj.hoverinfo === 'skip') return;
        var nodeRect = d3.select(element).select('.' + cn.nodeRect);
        var rootBBox = gd._fullLayout._paperdiv.node().getBoundingClientRect();
        var boundingBox = nodeRect.node().getBoundingClientRect();
        var hoverCenterX0 = boundingBox.left - 2 - rootBBox.left;
        var hoverCenterX1 = boundingBox.right + 2 - rootBBox.left;
        var hoverCenterY = boundingBox.top + boundingBox.height / 4 - rootBBox.top;

        var hovertemplateLabels = {valueLabel: d3.format(d.valueFormat)(d.node.value) + d.valueSuffix};
        d.node.fullData = d.node.trace;

        var tooltip = Fx.loneHover({
            x0: hoverCenterX0,
            x1: hoverCenterX1,
            y: hoverCenterY,
            name: d3.format(d.valueFormat)(d.node.value) + d.valueSuffix,
            text: [
                d.node.label,
                incomingLabel + d.node.targetLinks.length,
                outgoingLabel + d.node.sourceLinks.length
            ].filter(renderableValuePresent).join('<br>'),
            color: castHoverOption(obj, 'bgcolor') || d.tinyColorHue,
            borderColor: castHoverOption(obj, 'bordercolor'),
            fontFamily: castHoverOption(obj, 'font.family'),
            fontSize: castHoverOption(obj, 'font.size'),
            fontColor: castHoverOption(obj, 'font.color'),
            nameLength: castHoverOption(obj, 'namelength'),
            textAlign: castHoverOption(obj, 'align'),
            idealAlign: 'left',

            hovertemplate: obj.hovertemplate,
            hovertemplateLabels: hovertemplateLabels,
            eventData: [d.node]
        }, {
            container: fullLayout._hoverlayer.node(),
            outerContainer: fullLayout._paper.node(),
            gd: gd
        });

        makeTranslucent(tooltip, 0.85);
        makeTextContrasty(tooltip);
    };

    var nodeUnhover = function(element, d, sankey) {
        if(gd._fullLayout.hovermode === false) return;
        d3.select(element).call(nodeNonHoveredStyle, d, sankey);
        if(d.node.trace.node.hoverinfo !== 'skip') {
            d.node.fullData = d.node.trace;
            gd.emit('plotly_unhover', {
                event: d3.event,
                points: [d.node]
            });
        }

        Fx.loneUnhover(fullLayout._hoverlayer.node());
    };

    render(
        gd,
        svg,
        calcData,
        {
            width: size.w,
            height: size.h,
            margin: {
                t: size.t,
                r: size.r,
                b: size.b,
                l: size.l
            }
        },
        {
            linkEvents: {
                hover: linkHover,
                follow: linkHoverFollow,
                unhover: linkUnhover,
                select: linkSelect
            },
            nodeEvents: {
                hover: nodeHover,
                follow: nodeHoverFollow,
                unhover: nodeUnhover,
                select: nodeSelect
            }
        }
    );
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/render.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/render.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var c = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/sankey/constants.js");
var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var d3Sankey = __webpack_require__(/*! @plotly/d3-sankey */ "./node_modules/@plotly/d3-sankey/index.js");
var d3SankeyCircular = __webpack_require__(/*! @plotly/d3-sankey-circular */ "./node_modules/@plotly/d3-sankey-circular/dist/d3-sankey-circular.es.js");
var d3Force = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var gup = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js");
var keyFun = gup.keyFun;
var repeat = gup.repeat;
var unwrap = gup.unwrap;
var interpolateNumber = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js").interpolateNumber;

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

// view models

function sankeyModel(layout, d, traceIndex) {
    var calcData = unwrap(d);
    var trace = calcData.trace;
    var domain = trace.domain;
    var horizontal = trace.orientation === 'h';
    var nodePad = trace.node.pad;
    var nodeThickness = trace.node.thickness;

    var width = layout.width * (domain.x[1] - domain.x[0]);
    var height = layout.height * (domain.y[1] - domain.y[0]);

    var nodes = calcData._nodes;
    var links = calcData._links;
    var circular = calcData.circular;

    // Select Sankey generator
    var sankey;
    if(circular) {
        sankey = d3SankeyCircular
            .sankeyCircular()
            .circularLinkGap(0);
    } else {
        sankey = d3Sankey.sankey();
    }

    sankey
      .iterations(c.sankeyIterations)
      .size(horizontal ? [width, height] : [height, width])
      .nodeWidth(nodeThickness)
      .nodePadding(nodePad)
      .nodeId(function(d) {
          return d.pointNumber;
      })
      .nodes(nodes)
      .links(links);

    var graph = sankey();

    if(sankey.nodePadding() < nodePad) {
        Lib.warn('node.pad was reduced to ', sankey.nodePadding(), ' to fit within the figure.');
    }

    // Counters for nested loops
    var i, j, k;

    // Create transient nodes for animations
    for(var nodePointNumber in calcData._groupLookup) {
        var groupIndex = parseInt(calcData._groupLookup[nodePointNumber]);

        // Find node representing groupIndex
        var groupingNode;

        for(i = 0; i < graph.nodes.length; i++) {
            if(graph.nodes[i].pointNumber === groupIndex) {
                groupingNode = graph.nodes[i];
                break;
            }
        }
        // If groupinNode is undefined, no links are targeting this group
        if(!groupingNode) continue;

        var child = {
            pointNumber: parseInt(nodePointNumber),
            x0: groupingNode.x0,
            x1: groupingNode.x1,
            y0: groupingNode.y0,
            y1: groupingNode.y1,
            partOfGroup: true,
            sourceLinks: [],
            targetLinks: []
        };

        graph.nodes.unshift(child);
        groupingNode.childrenNodes.unshift(child);
    }

    function computeLinkConcentrations() {
        for(i = 0; i < graph.nodes.length; i++) {
            var node = graph.nodes[i];
            // Links connecting the same two nodes are part of a flow
            var flows = {};
            var flowKey;
            var link;
            for(j = 0; j < node.targetLinks.length; j++) {
                link = node.targetLinks[j];
                flowKey = link.source.pointNumber + ':' + link.target.pointNumber;
                if(!flows.hasOwnProperty(flowKey)) flows[flowKey] = [];
                flows[flowKey].push(link);
            }

            // Compute statistics for each flow
            var keys = Object.keys(flows);
            for(j = 0; j < keys.length; j++) {
                flowKey = keys[j];
                var flowLinks = flows[flowKey];

                // Find the total size of the flow and total size per label
                var total = 0;
                var totalPerLabel = {};
                for(k = 0; k < flowLinks.length; k++) {
                    link = flowLinks[k];
                    if(!totalPerLabel[link.label]) totalPerLabel[link.label] = 0;
                    totalPerLabel[link.label] += link.value;
                    total += link.value;
                }

                // Find the ratio of the link's value and the size of the flow
                for(k = 0; k < flowLinks.length; k++) {
                    link = flowLinks[k];
                    link.flow = {
                        value: total,
                        labelConcentration: totalPerLabel[link.label] / total,
                        concentration: link.value / total,
                        links: flowLinks
                    };
                    if(link.concentrationscale) {
                        link.color = tinycolor(link.concentrationscale(link.flow.labelConcentration));
                    }
                }
            }

            // Gather statistics of all links at current node
            var totalOutflow = 0;
            for(j = 0; j < node.sourceLinks.length; j++) {
                totalOutflow += node.sourceLinks[j].value;
            }
            for(j = 0; j < node.sourceLinks.length; j++) {
                link = node.sourceLinks[j];
                link.concentrationOut = link.value / totalOutflow;
            }

            var totalInflow = 0;
            for(j = 0; j < node.targetLinks.length; j++) {
                totalInflow += node.targetLinks[j].value;
            }

            for(j = 0; j < node.targetLinks.length; j++) {
                link = node.targetLinks[j];
                link.concenrationIn = link.value / totalInflow;
            }
        }
    }
    computeLinkConcentrations();

    // Push any overlapping nodes down.
    function resolveCollisionsTopToBottom(columns) {
        columns.forEach(function(nodes) {
            var node;
            var dy;
            var y = 0;
            var n = nodes.length;
            var i;
            nodes.sort(function(a, b) {
                return a.y0 - b.y0;
            });
            for(i = 0; i < n; ++i) {
                node = nodes[i];
                if(node.y0 >= y) {
                    // No overlap
                } else {
                    dy = (y - node.y0);
                    if(dy > 1e-6) node.y0 += dy, node.y1 += dy;
                }
                y = node.y1 + nodePad;
            }
        });
    }

    // Group nodes into columns based on their x position
    function snapToColumns(nodes) {
        // Sort nodes by x position
        var orderedNodes = nodes.map(function(n, i) {
            return {
                x0: n.x0,
                index: i
            };
        })
        .sort(function(a, b) {
            return a.x0 - b.x0;
        });

        var columns = [];
        var colNumber = -1;
        var colX; // Position of column
        var lastX = -Infinity; // Position of last node
        var dx;
        for(i = 0; i < orderedNodes.length; i++) {
            var node = nodes[orderedNodes[i].index];
            // If the node does not overlap with the last one
            if(node.x0 > lastX + nodeThickness) {
                // Start a new column
                colNumber += 1;
                colX = node.x0;
            }
            lastX = node.x0;

            // Add node to its associated column
            if(!columns[colNumber]) columns[colNumber] = [];
            columns[colNumber].push(node);

            // Change node's x position to align it with its column
            dx = colX - node.x0;
            node.x0 += dx, node.x1 += dx;
        }
        return columns;
    }

    // Force node position
    if(trace.node.x.length && trace.node.y.length) {
        for(i = 0; i < Math.min(trace.node.x.length, trace.node.y.length, graph.nodes.length); i++) {
            if(trace.node.x[i] && trace.node.y[i]) {
                var pos = [trace.node.x[i] * width, trace.node.y[i] * height];
                graph.nodes[i].x0 = pos[0] - nodeThickness / 2;
                graph.nodes[i].x1 = pos[0] + nodeThickness / 2;

                var nodeHeight = graph.nodes[i].y1 - graph.nodes[i].y0;
                graph.nodes[i].y0 = pos[1] - nodeHeight / 2;
                graph.nodes[i].y1 = pos[1] + nodeHeight / 2;
            }
        }
        if(trace.arrangement === 'snap') {
            nodes = graph.nodes;
            var columns = snapToColumns(nodes);
            resolveCollisionsTopToBottom(columns);
        }
        // Update links
        sankey.update(graph);
    }


    return {
        circular: circular,
        key: traceIndex,
        trace: trace,
        guid: Lib.randstr(),
        horizontal: horizontal,
        width: width,
        height: height,
        nodePad: trace.node.pad,
        nodeLineColor: trace.node.line.color,
        nodeLineWidth: trace.node.line.width,
        linkLineColor: trace.link.line.color,
        linkLineWidth: trace.link.line.width,
        valueFormat: trace.valueformat,
        valueSuffix: trace.valuesuffix,
        textFont: trace.textfont,
        translateX: domain.x[0] * layout.width + layout.margin.l,
        translateY: layout.height - domain.y[1] * layout.height + layout.margin.t,
        dragParallel: horizontal ? height : width,
        dragPerpendicular: horizontal ? width : height,
        arrangement: trace.arrangement,
        sankey: sankey,
        graph: graph,
        forceLayouts: {},
        interactionState: {
            dragInProgress: false,
            hovered: false
        }
    };
}

function linkModel(d, l, i) {
    var tc = tinycolor(l.color);
    var basicKey = l.source.label + '|' + l.target.label;
    var key = basicKey + '__' + i;

    // for event data
    l.trace = d.trace;
    l.curveNumber = d.trace.index;

    return {
        circular: d.circular,
        key: key,
        traceId: d.key,
        pointNumber: l.pointNumber,
        link: l,
        tinyColorHue: Color.tinyRGB(tc),
        tinyColorAlpha: tc.getAlpha(),
        linkPath: linkPath,
        linkLineColor: d.linkLineColor,
        linkLineWidth: d.linkLineWidth,
        valueFormat: d.valueFormat,
        valueSuffix: d.valueSuffix,
        sankey: d.sankey,
        parent: d,
        interactionState: d.interactionState,
        flow: l.flow
    };
}

function createCircularClosedPathString(link) {
    // Using coordinates computed by d3-sankey-circular
    var pathString = '';
    var offset = link.width / 2;
    var coords = link.circularPathData;
    if(link.circularLinkType === 'top') {
        // Top path
        pathString =
          // start at the left of the target node
          'M ' +
          coords.targetX + ' ' + (coords.targetY + offset) + ' ' +
          'L' +
          coords.rightInnerExtent + ' ' + (coords.targetY + offset) +
          'A' +
          (coords.rightLargeArcRadius + offset) + ' ' + (coords.rightSmallArcRadius + offset) + ' 0 0 1 ' +
          (coords.rightFullExtent - offset) + ' ' + (coords.targetY - coords.rightSmallArcRadius) +
          'L' +
          (coords.rightFullExtent - offset) + ' ' + coords.verticalRightInnerExtent +
          'A' +
          (coords.rightLargeArcRadius + offset) + ' ' + (coords.rightLargeArcRadius + offset) + ' 0 0 1 ' +
          coords.rightInnerExtent + ' ' + (coords.verticalFullExtent - offset) +
          'L' +
          coords.leftInnerExtent + ' ' + (coords.verticalFullExtent - offset) +
          'A' +
          (coords.leftLargeArcRadius + offset) + ' ' + (coords.leftLargeArcRadius + offset) + ' 0 0 1 ' +
          (coords.leftFullExtent + offset) + ' ' + coords.verticalLeftInnerExtent +
          'L' +
          (coords.leftFullExtent + offset) + ' ' + (coords.sourceY - coords.leftSmallArcRadius) +
          'A' +
          (coords.leftLargeArcRadius + offset) + ' ' + (coords.leftSmallArcRadius + offset) + ' 0 0 1 ' +
          coords.leftInnerExtent + ' ' + (coords.sourceY + offset) +
          'L' +
          coords.sourceX + ' ' + (coords.sourceY + offset) +

          // Walking back
          'L' +
          coords.sourceX + ' ' + (coords.sourceY - offset) +
          'L' +
          coords.leftInnerExtent + ' ' + (coords.sourceY - offset) +
          'A' +
          (coords.leftLargeArcRadius - offset) + ' ' + (coords.leftSmallArcRadius - offset) + ' 0 0 0 ' +
          (coords.leftFullExtent - offset) + ' ' + (coords.sourceY - coords.leftSmallArcRadius) +
          'L' +
          (coords.leftFullExtent - offset) + ' ' + coords.verticalLeftInnerExtent +
          'A' +
          (coords.leftLargeArcRadius - offset) + ' ' + (coords.leftLargeArcRadius - offset) + ' 0 0 0 ' +
          coords.leftInnerExtent + ' ' + (coords.verticalFullExtent + offset) +
          'L' +
          coords.rightInnerExtent + ' ' + (coords.verticalFullExtent + offset) +
          'A' +
          (coords.rightLargeArcRadius - offset) + ' ' + (coords.rightLargeArcRadius - offset) + ' 0 0 0 ' +
          (coords.rightFullExtent + offset) + ' ' + coords.verticalRightInnerExtent +
          'L' +
          (coords.rightFullExtent + offset) + ' ' + (coords.targetY - coords.rightSmallArcRadius) +
          'A' +
          (coords.rightLargeArcRadius - offset) + ' ' + (coords.rightSmallArcRadius - offset) + ' 0 0 0 ' +
          coords.rightInnerExtent + ' ' + (coords.targetY - offset) +
          'L' +
          coords.targetX + ' ' + (coords.targetY - offset) +
          'Z';
    } else {
        // Bottom path
        pathString =
          // start at the left of the target node
          'M ' +
          coords.targetX + ' ' + (coords.targetY - offset) + ' ' +
          'L' +
          coords.rightInnerExtent + ' ' + (coords.targetY - offset) +
          'A' +
          (coords.rightLargeArcRadius + offset) + ' ' + (coords.rightSmallArcRadius + offset) + ' 0 0 0 ' +
          (coords.rightFullExtent - offset) + ' ' + (coords.targetY + coords.rightSmallArcRadius) +
          'L' +
          (coords.rightFullExtent - offset) + ' ' + coords.verticalRightInnerExtent +
          'A' +
          (coords.rightLargeArcRadius + offset) + ' ' + (coords.rightLargeArcRadius + offset) + ' 0 0 0 ' +
          coords.rightInnerExtent + ' ' + (coords.verticalFullExtent + offset) +
          'L' +
          coords.leftInnerExtent + ' ' + (coords.verticalFullExtent + offset) +
          'A' +
          (coords.leftLargeArcRadius + offset) + ' ' + (coords.leftLargeArcRadius + offset) + ' 0 0 0 ' +
          (coords.leftFullExtent + offset) + ' ' + coords.verticalLeftInnerExtent +
          'L' +
          (coords.leftFullExtent + offset) + ' ' + (coords.sourceY + coords.leftSmallArcRadius) +
          'A' +
          (coords.leftLargeArcRadius + offset) + ' ' + (coords.leftSmallArcRadius + offset) + ' 0 0 0 ' +
          coords.leftInnerExtent + ' ' + (coords.sourceY - offset) +
          'L' +
          coords.sourceX + ' ' + (coords.sourceY - offset) +

          // Walking back
          'L' +
          coords.sourceX + ' ' + (coords.sourceY + offset) +
          'L' +
          coords.leftInnerExtent + ' ' + (coords.sourceY + offset) +
          'A' +
          (coords.leftLargeArcRadius - offset) + ' ' + (coords.leftSmallArcRadius - offset) + ' 0 0 1 ' +
          (coords.leftFullExtent - offset) + ' ' + (coords.sourceY + coords.leftSmallArcRadius) +
          'L' +
          (coords.leftFullExtent - offset) + ' ' + coords.verticalLeftInnerExtent +
          'A' +
          (coords.leftLargeArcRadius - offset) + ' ' + (coords.leftLargeArcRadius - offset) + ' 0 0 1 ' +
          coords.leftInnerExtent + ' ' + (coords.verticalFullExtent - offset) +
          'L' +
          coords.rightInnerExtent + ' ' + (coords.verticalFullExtent - offset) +
          'A' +
          (coords.rightLargeArcRadius - offset) + ' ' + (coords.rightLargeArcRadius - offset) + ' 0 0 1 ' +
          (coords.rightFullExtent + offset) + ' ' + coords.verticalRightInnerExtent +
          'L' +
          (coords.rightFullExtent + offset) + ' ' + (coords.targetY + coords.rightSmallArcRadius) +
          'A' +
          (coords.rightLargeArcRadius - offset) + ' ' + (coords.rightSmallArcRadius - offset) + ' 0 0 1 ' +
          coords.rightInnerExtent + ' ' + (coords.targetY + offset) +
          'L' +
          coords.targetX + ' ' + (coords.targetY + offset) +
          'Z';
    }
    return pathString;
}

function linkPath() {
    var curvature = 0.5;
    function path(d) {
        if(d.link.circular) {
            return createCircularClosedPathString(d.link);
        } else {
            var x0 = d.link.source.x1;
            var x1 = d.link.target.x0;
            var xi = interpolateNumber(x0, x1);
            var x2 = xi(curvature);
            var x3 = xi(1 - curvature);
            var y0a = d.link.y0 - d.link.width / 2;
            var y0b = d.link.y0 + d.link.width / 2;
            var y1a = d.link.y1 - d.link.width / 2;
            var y1b = d.link.y1 + d.link.width / 2;
            return 'M' + x0 + ',' + y0a +
                 'C' + x2 + ',' + y0a +
                 ' ' + x3 + ',' + y1a +
                 ' ' + x1 + ',' + y1a +
                 'L' + x1 + ',' + y1b +
                 'C' + x3 + ',' + y1b +
                 ' ' + x2 + ',' + y0b +
                 ' ' + x0 + ',' + y0b +
                 'Z';
        }
    }
    return path;
}

function nodeModel(d, n) {
    var tc = tinycolor(n.color);
    var zoneThicknessPad = c.nodePadAcross;
    var zoneLengthPad = d.nodePad / 2;
    n.dx = n.x1 - n.x0;
    n.dy = n.y1 - n.y0;
    var visibleThickness = n.dx;
    var visibleLength = Math.max(0.5, n.dy);

    var key = 'node_' + n.pointNumber;
    // If it's a group, it's mutable and should be unique
    if(n.group) {
        key = Lib.randstr();
    }

    // for event data
    n.trace = d.trace;
    n.curveNumber = d.trace.index;

    return {
        index: n.pointNumber,
        key: key,
        partOfGroup: n.partOfGroup || false,
        group: n.group,
        traceId: d.key,
        trace: d.trace,
        node: n,
        nodePad: d.nodePad,
        nodeLineColor: d.nodeLineColor,
        nodeLineWidth: d.nodeLineWidth,
        textFont: d.textFont,
        size: d.horizontal ? d.height : d.width,
        visibleWidth: Math.ceil(visibleThickness),
        visibleHeight: visibleLength,
        zoneX: -zoneThicknessPad,
        zoneY: -zoneLengthPad,
        zoneWidth: visibleThickness + 2 * zoneThicknessPad,
        zoneHeight: visibleLength + 2 * zoneLengthPad,
        labelY: d.horizontal ? n.dy / 2 + 1 : n.dx / 2 + 1,
        left: n.originalLayer === 1,
        sizeAcross: d.width,
        forceLayouts: d.forceLayouts,
        horizontal: d.horizontal,
        darkBackground: tc.getBrightness() <= 128,
        tinyColorHue: Color.tinyRGB(tc),
        tinyColorAlpha: tc.getAlpha(),
        valueFormat: d.valueFormat,
        valueSuffix: d.valueSuffix,
        sankey: d.sankey,
        graph: d.graph,
        arrangement: d.arrangement,
        uniqueNodeLabelPathId: [d.guid, d.key, key].join('_'),
        interactionState: d.interactionState,
        figure: d
    };
}

// rendering snippets

function updateNodePositions(sankeyNode) {
    sankeyNode
        .attr('transform', function(d) {
            return 'translate(' + d.node.x0.toFixed(3) + ', ' + (d.node.y0).toFixed(3) + ')';
        });
}

function updateNodeShapes(sankeyNode) {
    sankeyNode.call(updateNodePositions);
}

function updateShapes(sankeyNode, sankeyLink) {
    sankeyNode.call(updateNodeShapes);
    sankeyLink.attr('d', linkPath());
}

function sizeNode(rect) {
    rect
      .attr('width', function(d) {return d.node.x1 - d.node.x0;})
      .attr('height', function(d) {return d.visibleHeight;});
}

function salientEnough(d) {return (d.link.width > 1 || d.linkLineWidth > 0);}

function sankeyTransform(d) {
    var offset = 'translate(' + d.translateX + ',' + d.translateY + ')';
    return offset + (d.horizontal ? 'matrix(1 0 0 1 0 0)' : 'matrix(0 1 1 0 0 0)');
}

function nodeCentering(d) {
    return 'translate(' + (d.horizontal ? 0 : d.labelY) + ' ' + (d.horizontal ? d.labelY : 0) + ')';
}

function textGuidePath(d) {
    return d3.svg.line()([
        [d.horizontal ? (d.left ? -d.sizeAcross : d.visibleWidth + c.nodeTextOffsetHorizontal) : c.nodeTextOffsetHorizontal, 0],
        [d.horizontal ? (d.left ? - c.nodeTextOffsetHorizontal : d.sizeAcross) : d.visibleHeight - c.nodeTextOffsetHorizontal, 0]
    ]);
}

function sankeyInverseTransform(d) {return d.horizontal ? 'matrix(1 0 0 1 0 0)' : 'matrix(0 1 1 0 0 0)';}
function textFlip(d) {return d.horizontal ? 'scale(1 1)' : 'scale(-1 1)';}
function nodeTextColor(d) {return d.darkBackground && !d.horizontal ? 'rgb(255,255,255)' : 'rgb(0,0,0)';}
function nodeTextOffset(d) {return d.horizontal && d.left ? '100%' : '0%';}

// event handling

function attachPointerEvents(selection, sankey, eventSet) {
    selection
        .on('.basic', null) // remove any preexisting handlers
        .on('mouseover.basic', function(d) {
            if(!d.interactionState.dragInProgress && !d.partOfGroup) {
                eventSet.hover(this, d, sankey);
                d.interactionState.hovered = [this, d];
            }
        })
        .on('mousemove.basic', function(d) {
            if(!d.interactionState.dragInProgress && !d.partOfGroup) {
                eventSet.follow(this, d);
                d.interactionState.hovered = [this, d];
            }
        })
        .on('mouseout.basic', function(d) {
            if(!d.interactionState.dragInProgress && !d.partOfGroup) {
                eventSet.unhover(this, d, sankey);
                d.interactionState.hovered = false;
            }
        })
        .on('click.basic', function(d) {
            if(d.interactionState.hovered) {
                eventSet.unhover(this, d, sankey);
                d.interactionState.hovered = false;
            }
            if(!d.interactionState.dragInProgress && !d.partOfGroup) {
                eventSet.select(this, d, sankey);
            }
        });
}

function attachDragHandler(sankeyNode, sankeyLink, callbacks, gd) {
    var dragBehavior = d3.behavior.drag()
        .origin(function(d) {
            return {
                x: d.node.x0 + d.visibleWidth / 2,
                y: d.node.y0 + d.visibleHeight / 2
            };
        })

        .on('dragstart', function(d) {
            if(d.arrangement === 'fixed') return;
            Lib.ensureSingle(gd._fullLayout._infolayer, 'g', 'dragcover', function(s) {
                gd._fullLayout._dragCover = s;
            });
            Lib.raiseToTop(this);
            d.interactionState.dragInProgress = d.node;

            saveCurrentDragPosition(d.node);
            if(d.interactionState.hovered) {
                callbacks.nodeEvents.unhover.apply(0, d.interactionState.hovered);
                d.interactionState.hovered = false;
            }
            if(d.arrangement === 'snap') {
                var forceKey = d.traceId + '|' + d.key;
                if(d.forceLayouts[forceKey]) {
                    d.forceLayouts[forceKey].alpha(1);
                } else { // make a forceLayout if needed
                    attachForce(sankeyNode, forceKey, d, gd);
                }
                startForce(sankeyNode, sankeyLink, d, forceKey, gd);
            }
        })

        .on('drag', function(d) {
            if(d.arrangement === 'fixed') return;
            var x = d3.event.x;
            var y = d3.event.y;
            if(d.arrangement === 'snap') {
                d.node.x0 = x - d.visibleWidth / 2;
                d.node.x1 = x + d.visibleWidth / 2;
                d.node.y0 = y - d.visibleHeight / 2;
                d.node.y1 = y + d.visibleHeight / 2;
            } else {
                if(d.arrangement === 'freeform') {
                    d.node.x0 = x - d.visibleWidth / 2;
                    d.node.x1 = x + d.visibleWidth / 2;
                }
                y = Math.max(0, Math.min(d.size - d.visibleHeight / 2, y));
                d.node.y0 = y - d.visibleHeight / 2;
                d.node.y1 = y + d.visibleHeight / 2;
            }

            saveCurrentDragPosition(d.node);
            if(d.arrangement !== 'snap') {
                d.sankey.update(d.graph);
                updateShapes(sankeyNode.filter(sameLayer(d)), sankeyLink);
            }
        })

        .on('dragend', function(d) {
            if(d.arrangement === 'fixed') return;
            d.interactionState.dragInProgress = false;
            for(var i = 0; i < d.node.childrenNodes.length; i++) {
                d.node.childrenNodes[i].x = d.node.x;
                d.node.childrenNodes[i].y = d.node.y;
            }
            if(d.arrangement !== 'snap') persistFinalNodePositions(d, gd);
        });

    sankeyNode
        .on('.drag', null) // remove possible previous handlers
        .call(dragBehavior);
}

function attachForce(sankeyNode, forceKey, d, gd) {
    // Attach force to nodes in the same column (same x coordinate)
    switchToForceFormat(d.graph.nodes);
    var nodes = d.graph.nodes
        .filter(function(n) {return n.originalX === d.node.originalX;})
        // Filter out children
        .filter(function(n) {return !n.partOfGroup;});
    d.forceLayouts[forceKey] = d3Force.forceSimulation(nodes)
        .alphaDecay(0)
        .force('collide', d3Force.forceCollide()
            .radius(function(n) {return n.dy / 2 + d.nodePad / 2;})
            .strength(1)
            .iterations(c.forceIterations))
        .force('constrain', snappingForce(sankeyNode, forceKey, nodes, d, gd))
        .stop();
}

function startForce(sankeyNode, sankeyLink, d, forceKey, gd) {
    window.requestAnimationFrame(function faster() {
        var i;
        for(i = 0; i < c.forceTicksPerFrame; i++) {
            d.forceLayouts[forceKey].tick();
        }

        var nodes = d.graph.nodes;
        switchToSankeyFormat(nodes);

        d.sankey.update(d.graph);
        updateShapes(sankeyNode.filter(sameLayer(d)), sankeyLink);

        if(d.forceLayouts[forceKey].alpha() > 0) {
            window.requestAnimationFrame(faster);
        } else {
            // Make sure the final x position is equal to its original value
            // because the force simulation will have numerical error
            var x = d.node.originalX;
            d.node.x0 = x - d.visibleWidth / 2;
            d.node.x1 = x + d.visibleWidth / 2;

            persistFinalNodePositions(d, gd);
        }
    });
}

function snappingForce(sankeyNode, forceKey, nodes, d) {
    return function _snappingForce() {
        var maxVelocity = 0;
        for(var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if(n === d.interactionState.dragInProgress) { // constrain node position to the dragging pointer
                n.x = n.lastDraggedX;
                n.y = n.lastDraggedY;
            } else {
                n.vx = (n.originalX - n.x) / c.forceTicksPerFrame; // snap to layer
                n.y = Math.min(d.size - n.dy / 2, Math.max(n.dy / 2, n.y)); // constrain to extent
            }
            maxVelocity = Math.max(maxVelocity, Math.abs(n.vx), Math.abs(n.vy));
        }
        if(!d.interactionState.dragInProgress && maxVelocity < 0.1 && d.forceLayouts[forceKey].alpha() > 0) {
            d.forceLayouts[forceKey].alpha(0); // This will stop the animation loop
        }
    };
}

// basic data utilities

function persistFinalNodePositions(d, gd) {
    var x = [];
    var y = [];
    for(var i = 0; i < d.graph.nodes.length; i++) {
        var nodeX = (d.graph.nodes[i].x0 + d.graph.nodes[i].x1) / 2;
        var nodeY = (d.graph.nodes[i].y0 + d.graph.nodes[i].y1) / 2;
        x.push(nodeX / d.figure.width);
        y.push(nodeY / d.figure.height);
    }
    Registry.call('_guiRestyle', gd, {
        'node.x': [x],
        'node.y': [y]
    }, d.trace.index)
    .then(function() {
        if(gd._fullLayout._dragCover) gd._fullLayout._dragCover.remove();
    });
}

function persistOriginalPlace(nodes) {
    var distinctLayerPositions = [];
    var i;
    for(i = 0; i < nodes.length; i++) {
        nodes[i].originalX = (nodes[i].x0 + nodes[i].x1) / 2;
        nodes[i].originalY = (nodes[i].y0 + nodes[i].y1) / 2;
        if(distinctLayerPositions.indexOf(nodes[i].originalX) === -1) {
            distinctLayerPositions.push(nodes[i].originalX);
        }
    }
    distinctLayerPositions.sort(function(a, b) {return a - b;});
    for(i = 0; i < nodes.length; i++) {
        nodes[i].originalLayerIndex = distinctLayerPositions.indexOf(nodes[i].originalX);
        nodes[i].originalLayer = nodes[i].originalLayerIndex / (distinctLayerPositions.length - 1);
    }
}

function saveCurrentDragPosition(d) {
    d.lastDraggedX = d.x0 + d.dx / 2;
    d.lastDraggedY = d.y0 + d.dy / 2;
}

function sameLayer(d) {
    return function(n) {return n.node.originalX === d.node.originalX;};
}

function switchToForceFormat(nodes) {
    // force uses x, y as centers
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].y = (nodes[i].y0 + nodes[i].y1) / 2;
        nodes[i].x = (nodes[i].x0 + nodes[i].x1) / 2;
    }
}

function switchToSankeyFormat(nodes) {
    // sankey uses x0, x1, y0, y1
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].y0 = nodes[i].y - nodes[i].dy / 2;
        nodes[i].y1 = nodes[i].y0 + nodes[i].dy;

        nodes[i].x0 = nodes[i].x - nodes[i].dx / 2;
        nodes[i].x1 = nodes[i].x0 + nodes[i].dx;
    }
}

// scene graph
module.exports = function(gd, svg, calcData, layout, callbacks) {
    // To prevent animation on first render
    var firstRender = false;
    Lib.ensureSingle(gd._fullLayout._infolayer, 'g', 'first-render', function() {
        firstRender = true;
    });

    // To prevent animation on dragging
    var dragcover = gd._fullLayout._dragCover;

    var styledData = calcData
            .filter(function(d) {return unwrap(d).trace.visible;})
            .map(sankeyModel.bind(null, layout));

    var sankey = svg.selectAll('.' + c.cn.sankey)
        .data(styledData, keyFun);

    sankey.exit()
        .remove();

    sankey.enter()
        .append('g')
        .classed(c.cn.sankey, true)
        .style('box-sizing', 'content-box')
        .style('position', 'absolute')
        .style('left', 0)
        .style('shape-rendering', 'geometricPrecision')
        .style('pointer-events', 'auto')
        .attr('transform', sankeyTransform);

    sankey.each(function(d, i) {
        gd._fullData[i]._sankey = d;
        // Create dragbox if missing
        var dragboxClassName = 'bgsankey-' + d.trace.uid + '-' + i;
        Lib.ensureSingle(gd._fullLayout._draggers, 'rect', dragboxClassName);

        gd._fullData[i]._bgRect = d3.select('.' + dragboxClassName);

        // Style dragbox
        gd._fullData[i]._bgRect
          .style('pointer-events', 'all')
          .attr('width', d.width)
          .attr('height', d.height)
          .attr('x', d.translateX)
          .attr('y', d.translateY)
          .classed('bgsankey', true)
          .style({fill: 'transparent', 'stroke-width': 0});
    });

    sankey.transition()
        .ease(c.ease).duration(c.duration)
        .attr('transform', sankeyTransform);

    var sankeyLinks = sankey.selectAll('.' + c.cn.sankeyLinks)
        .data(repeat, keyFun);

    sankeyLinks.enter()
        .append('g')
        .classed(c.cn.sankeyLinks, true)
        .style('fill', 'none');

    var sankeyLink = sankeyLinks.selectAll('.' + c.cn.sankeyLink)
          .data(function(d) {
              var links = d.graph.links;
              return links
                .filter(function(l) {return l.value;})
                .map(linkModel.bind(null, d));
          }, keyFun);

    sankeyLink
          .enter().append('path')
          .classed(c.cn.sankeyLink, true)
          .call(attachPointerEvents, sankey, callbacks.linkEvents);

    sankeyLink
        .style('stroke', function(d) {
            return salientEnough(d) ? Color.tinyRGB(tinycolor(d.linkLineColor)) : d.tinyColorHue;
        })
        .style('stroke-opacity', function(d) {
            return salientEnough(d) ? Color.opacity(d.linkLineColor) : d.tinyColorAlpha;
        })
        .style('fill', function(d) {
            return d.tinyColorHue;
        })
        .style('fill-opacity', function(d) {
            return d.tinyColorAlpha;
        })
        .style('stroke-width', function(d) {
            return salientEnough(d) ? d.linkLineWidth : 1;
        })
        .attr('d', linkPath());

    sankeyLink
        .style('opacity', function() { return (gd._context.staticPlot || firstRender || dragcover) ? 1 : 0;})
        .transition()
        .ease(c.ease).duration(c.duration)
        .style('opacity', 1);

    sankeyLink.exit()
        .transition()
        .ease(c.ease).duration(c.duration)
        .style('opacity', 0)
        .remove();

    var sankeyNodeSet = sankey.selectAll('.' + c.cn.sankeyNodeSet)
        .data(repeat, keyFun);

    sankeyNodeSet.enter()
        .append('g')
        .classed(c.cn.sankeyNodeSet, true);

    sankeyNodeSet
        .style('cursor', function(d) {
            switch(d.arrangement) {
                case 'fixed': return 'default';
                case 'perpendicular': return 'ns-resize';
                default: return 'move';
            }
        });

    var sankeyNode = sankeyNodeSet.selectAll('.' + c.cn.sankeyNode)
        .data(function(d) {
            var nodes = d.graph.nodes;
            persistOriginalPlace(nodes);
            return nodes
              .map(nodeModel.bind(null, d));
        }, keyFun);

    sankeyNode.enter()
        .append('g')
        .classed(c.cn.sankeyNode, true)
        .call(updateNodePositions)
        .style('opacity', function(n) { return ((gd._context.staticPlot || firstRender) && !n.partOfGroup) ? 1 : 0;});

    sankeyNode
        .call(attachPointerEvents, sankey, callbacks.nodeEvents)
        .call(attachDragHandler, sankeyLink, callbacks, gd); // has to be here as it binds sankeyLink

    sankeyNode
        .transition()
        .ease(c.ease).duration(c.duration)
        .call(updateNodePositions)
        .style('opacity', function(n) { return n.partOfGroup ? 0 : 1;});

    sankeyNode.exit()
        .transition()
        .ease(c.ease).duration(c.duration)
        .style('opacity', 0)
        .remove();

    var nodeRect = sankeyNode.selectAll('.' + c.cn.nodeRect)
        .data(repeat);

    nodeRect.enter()
        .append('rect')
        .classed(c.cn.nodeRect, true)
        .call(sizeNode);

    nodeRect
        .style('stroke-width', function(d) {return d.nodeLineWidth;})
        .style('stroke', function(d) {return Color.tinyRGB(tinycolor(d.nodeLineColor));})
        .style('stroke-opacity', function(d) {return Color.opacity(d.nodeLineColor);})
        .style('fill', function(d) {return d.tinyColorHue;})
        .style('fill-opacity', function(d) {return d.tinyColorAlpha;});

    nodeRect.transition()
        .ease(c.ease).duration(c.duration)
        .call(sizeNode);

    var nodeCapture = sankeyNode.selectAll('.' + c.cn.nodeCapture)
        .data(repeat);

    nodeCapture.enter()
        .append('rect')
        .classed(c.cn.nodeCapture, true)
        .style('fill-opacity', 0);

    nodeCapture
        .attr('x', function(d) {return d.zoneX;})
        .attr('y', function(d) {return d.zoneY;})
        .attr('width', function(d) {return d.zoneWidth;})
        .attr('height', function(d) {return d.zoneHeight;});

    var nodeCentered = sankeyNode.selectAll('.' + c.cn.nodeCentered)
        .data(repeat);

    nodeCentered.enter()
        .append('g')
        .classed(c.cn.nodeCentered, true)
        .attr('transform', nodeCentering);

    nodeCentered
        .transition()
        .ease(c.ease).duration(c.duration)
        .attr('transform', nodeCentering);

    var nodeLabelGuide = nodeCentered.selectAll('.' + c.cn.nodeLabelGuide)
        .data(repeat);

    nodeLabelGuide.enter()
        .append('path')
        .classed(c.cn.nodeLabelGuide, true)
        .attr('id', function(d) {return d.uniqueNodeLabelPathId;})
        .attr('d', textGuidePath)
        .attr('transform', sankeyInverseTransform);

    nodeLabelGuide
        .transition()
        .ease(c.ease).duration(c.duration)
        .attr('d', textGuidePath)
        .attr('transform', sankeyInverseTransform);

    var nodeLabel = nodeCentered.selectAll('.' + c.cn.nodeLabel)
        .data(repeat);

    nodeLabel.enter()
        .append('text')
        .classed(c.cn.nodeLabel, true)
        .attr('transform', textFlip)
        .style('user-select', 'none')
        .style('cursor', 'default')
        .style('fill', 'black');

    nodeLabel
        .style('text-shadow', function(d) {
            return d.horizontal ? '-1px 1px 1px #fff, 1px 1px 1px #fff, 1px -1px 1px #fff, -1px -1px 1px #fff' : 'none';
        })
        .each(function(d) {Drawing.font(nodeLabel, d.textFont);});

    nodeLabel
        .transition()
        .ease(c.ease).duration(c.duration)
        .attr('transform', textFlip);

    var nodeLabelTextPath = nodeLabel.selectAll('.' + c.cn.nodeLabelTextPath)
        .data(repeat);

    nodeLabelTextPath.enter()
        .append('textPath')
        .classed(c.cn.nodeLabelTextPath, true)
        .attr('alignment-baseline', 'middle')
        .attr('xlink:href', function(d) {return '#' + d.uniqueNodeLabelPathId;})
        .attr('startOffset', nodeTextOffset)
        .style('fill', nodeTextColor);

    nodeLabelTextPath
        .text(function(d) {return d.horizontal || d.node.dy > 5 ? d.node.label : '';})
        .attr('text-anchor', function(d) {return d.horizontal && d.left ? 'end' : 'start';});

    nodeLabelTextPath
        .transition()
        .ease(c.ease).duration(c.duration)
        .attr('startOffset', nodeTextOffset)
        .style('fill', nodeTextColor);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sankey/select.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sankey/select.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var selection = [];
    var fullData = cd[0].trace;

    var nodes = fullData._sankey.graph.nodes;

    for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if(node.partOfGroup) continue; // Those are invisible

        // Position of node's centroid
        var pos = [(node.x0 + node.x1) / 2, (node.y0 + node.y1) / 2];

        // Swap x and y if trace is vertical
        if(fullData.orientation === 'v') pos.reverse();

        if(selectionTester && selectionTester.contains(pos, false, i, searchInfo)) {
            selection.push({
                pointNumber: node.pointNumber
                // TODO: add eventData
            });
        }
    }
    return selection;
};


/***/ }),

/***/ "./node_modules/strongly-connected-components/scc.js":
/*!***********************************************************!*\
  !*** ./node_modules/strongly-connected-components/scc.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";


module.exports = stronglyConnectedComponents

function stronglyConnectedComponents(adjList) {
  var numVertices = adjList.length;
  var index = new Array(numVertices)
  var lowValue = new Array(numVertices)
  var active = new Array(numVertices)
  var child = new Array(numVertices)
  var scc = new Array(numVertices)
  var sccLinks = new Array(numVertices)
  
  //Initialize tables
  for(var i=0; i<numVertices; ++i) {
    index[i] = -1
    lowValue[i] = 0
    active[i] = false
    child[i] = 0
    scc[i] = -1
    sccLinks[i] = []
  }

  // The strongConnect function
  var count = 0
  var components = []
  var sccAdjList = []

  function strongConnect(v) {
    // To avoid running out of stack space, this emulates the recursive behaviour of the normal algorithm, effectively using T as the call stack.
    var S = [v], T = [v]
    index[v] = lowValue[v] = count
    active[v] = true
    count += 1
    while(T.length > 0) {
      v = T[T.length-1]
      var e = adjList[v]
      if (child[v] < e.length) { // If we're not done iterating over the children, first try finishing that.
        for(var i=child[v]; i<e.length; ++i) { // Start where we left off.
          var u = e[i]
          if(index[u] < 0) {
            index[u] = lowValue[u] = count
            active[u] = true
            count += 1
            S.push(u)
            T.push(u)
            break // First recurse, then continue here (with the same child!).
            // There is a slight change to Tarjan's algorithm here.
            // Normally, after having recursed, we set lowValue like we do for an active child (although some variants of the algorithm do it slightly differently).
            // Here, we only do so if the child we recursed on is still active.
            // The reasoning is that if it is no longer active, it must have had a lowValue equal to its own index, which means that it is necessarily higher than our lowValue.
          } else if (active[u]) {
            lowValue[v] = Math.min(lowValue[v], lowValue[u])|0
          }
          if (scc[u] >= 0) {
            // Node v is not yet assigned an scc, but once it is that scc can apparently reach scc[u].
            sccLinks[v].push(scc[u])
          }
        }
        child[v] = i // Remember where we left off.
      } else { // If we're done iterating over the children, check whether we have an scc.
        if(lowValue[v] === index[v]) { // TODO: It /might/ be true that T is always a prefix of S (at this point!!!), and if so, this could be used here.
          var component = []
          var links = [], linkCount = 0
          for(var i=S.length-1; i>=0; --i) {
            var w = S[i]
            active[w] = false
            component.push(w)
            links.push(sccLinks[w])
            linkCount += sccLinks[w].length
            scc[w] = components.length
            if(w === v) {
              S.length = i
              break
            }
          }
          components.push(component)
          var allLinks = new Array(linkCount)
          for(var i=0; i<links.length; i++) {
            for(var j=0; j<links[i].length; j++) {
              allLinks[--linkCount] = links[i][j]
            }
          }
          sccAdjList.push(allLinks)
        }
        T.pop() // Now we're finished exploring this particular node (normally corresponds to the return statement)
      }
    }
  }

  //Run strong connect starting from each vertex
  for(var i=0; i<numVertices; ++i) {
    if(index[i] < 0) {
      strongConnect(i)
    }
  }
  
  // Compact sccAdjList
  var newE
  for(var i=0; i<sccAdjList.length; i++) {
    var e = sccAdjList[i]
    if (e.length === 0) continue
    e.sort(function (a,b) { return a-b; })
    newE = [e[0]]
    for(var j=1; j<e.length; j++) {
      if (e[j] !== e[j-1]) {
        newE.push(e[j])
      }
    }
    sccAdjList[i] = newE
  }  

  return {components: components, adjacencyList: sccAdjList}
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL0BwbG90bHkvZDMtc2Fua2V5LWNpcmN1bGFyL2Rpc3QvZDMtc2Fua2V5LWNpcmN1bGFyLmVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvQHBsb3RseS9kMy1zYW5rZXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9AcGxvdGx5L2QzLXNhbmtleS9zcmMvYWxpZ24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9AcGxvdGx5L2QzLXNhbmtleS9zcmMvY29uc3RhbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9AcGxvdGx5L2QzLXNhbmtleS9zcmMvc2Fua2V5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvQHBsb3RseS9kMy1zYW5rZXkvc3JjL3NhbmtleUxpbmtIb3Jpem9udGFsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2FycmF5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2FzY2VuZGluZy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9iaXNlY3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYmlzZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvY29uc3RhbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvY3Jvc3MuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvZGVzY2VuZGluZy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9kZXZpYXRpb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvZXh0ZW50LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2hpc3RvZ3JhbS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9tYXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvbWVhbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9tZWRpYW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvbWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL251bWJlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9wYWlycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9wZXJtdXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3F1YW50aWxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3JhbmdlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3NjYW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvc2h1ZmZsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9zdW0uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvdGhyZXNob2xkL2ZyZWVkbWFuRGlhY29uaXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvdGhyZXNob2xkL3Njb3R0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3RocmVzaG9sZC9zdHVyZ2VzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3RpY2tzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy92YXJpYW5jZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy96aXAuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1jb2xsZWN0aW9uL3NyYy9lbnRyaWVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1jb2xsZWN0aW9uL3NyYy9rZXlzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9zcmMvbWFwLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9zcmMvbmVzdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWNvbGxlY3Rpb24vc3JjL3NldC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWNvbGxlY3Rpb24vc3JjL3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jdWJlaGVsaXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2xhYi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9tYXRoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZGlzcGF0Y2gvc3JjL2Rpc3BhdGNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL2NlbnRlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWZvcmNlL3NyYy9jb2xsaWRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL2NvbnN0YW50LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL2ppZ2dsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWZvcmNlL3NyYy9saW5rLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL21hbnlCb2R5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL3JhZGlhbC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWZvcmNlL3NyYy9zaW11bGF0aW9uLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtZm9yY2Uvc3JjL3guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1mb3JjZS9zcmMveS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9iYXNpcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9iYXNpc0Nsb3NlZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jdWJlaGVsaXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvZGF0ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9kaXNjcmV0ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9oY2wuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvaHNsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2h1ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9sYWIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvbnVtYmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlckFycmF5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL29iamVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9waWVjZXdpc2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvcXVhbnRpemUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvcmdiLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3JvdW5kLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3N0cmluZy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdmFsdWUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvem9vbS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLXBhdGgvc3JjL3BhdGguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1xdWFkdHJlZS9zcmMvYWRkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtcXVhZHRyZWUvc3JjL2NvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtcXVhZHRyZWUvc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1xdWFkdHJlZS9zcmMvZXh0ZW50LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtcXVhZHRyZWUvc3JjL2ZpbmQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1xdWFkdHJlZS9zcmMvcXVhZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLXF1YWR0cmVlL3NyYy9xdWFkdHJlZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLXF1YWR0cmVlL3NyYy9yZW1vdmUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1xdWFkdHJlZS9zcmMvcm9vdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLXF1YWR0cmVlL3NyYy9zaXplLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtcXVhZHRyZWUvc3JjL3Zpc2l0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtcXVhZHRyZWUvc3JjL3Zpc2l0QWZ0ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1xdWFkdHJlZS9zcmMveC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLXF1YWR0cmVlL3NyYy95LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL2FycmF5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL2NvbnN0YW50LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL2xpbmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1zaGFwZS9zcmMvcG9pbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1zaGFwZS9zcmMvcG9pbnRSYWRpYWwuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lbGVtZW50YXJ5LWNpcmN1aXRzLWRpcmVjdGVkLWdyYXBoL2pvaG5zb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL3NhbmtleS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NhbmtleS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2Fua2V5L2Jhc2VfcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NhbmtleS9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2Fua2V5L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NhbmtleS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NhbmtleS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NhbmtleS9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2Fua2V5L3JlbmRlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NhbmtleS9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9zdHJvbmdseS1jb25uZWN0ZWQtY29tcG9uZW50cy9zY2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwRDtBQUNoQjtBQUNBO0FBQ29COztBQUU5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEVBQTBFLDZDQUFHO0FBQzdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsMkJBQTJCLG1DQUFtQzs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLDZDQUFHO0FBQ2hCO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHVCQUF1Qix3REFBYztBQUNyQztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsaUNBQWlDO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyQkFBMkI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFB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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQsZ0JBQWdCLEVBQUU7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLEdBQUcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDbkIsNkJBQWUsb0NBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKMkM7O0FBRXBDOztBQUVBO0FBQ0E7O0FBRVA7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLElBQUk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtREFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1EQUFNLFdBQVcsa0RBQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFr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QixNQUFNO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdCQUFnQjtBQUN0Qyx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBLDJCQUEyQixZQUFZLEVBQUU7QUFDekM7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7QUFFQSxVQUFVO0FBQ1YiLCJmaWxlIjoiY2hhcnRmZGZjYzdkNTM0NmZkYzgzZGIyMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1pbiwgYXNjZW5kaW5nLCBtYXgsIG1lYW4sIHN1bSB9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7IG1hcCwgbmVzdCB9IGZyb20gJ2QzLWNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgbGlua0hvcml6b250YWwgfSBmcm9tICdkMy1zaGFwZSc7XG5pbXBvcnQgZmluZENpcmN1aXRzIGZyb20gJ2VsZW1lbnRhcnktY2lyY3VpdHMtZGlyZWN0ZWQtZ3JhcGgnO1xuXG4vLyBGb3IgYSBnaXZlbiBsaW5rLCByZXR1cm4gdGhlIHRhcmdldCBub2RlJ3MgZGVwdGhcbmZ1bmN0aW9uIHRhcmdldERlcHRoKGQpIHtcbiAgcmV0dXJuIGQudGFyZ2V0LmRlcHRoO1xufVxuXG4vLyBUaGUgZGVwdGggb2YgYSBub2RlIHdoZW4gdGhlIG5vZGVBbGlnbiAoYWxpZ24pIGlzIHNldCB0byAnbGVmdCdcbmZ1bmN0aW9uIGxlZnQobm9kZSkge1xuICByZXR1cm4gbm9kZS5kZXB0aDtcbn1cblxuLy8gVGhlIGRlcHRoIG9mIGEgbm9kZSB3aGVuIHRoZSBub2RlQWxpZ24gKGFsaWduKSBpcyBzZXQgdG8gJ3JpZ2h0J1xuZnVuY3Rpb24gcmlnaHQobm9kZSwgbikge1xuICByZXR1cm4gbiAtIDEgLSBub2RlLmhlaWdodDtcbn1cblxuLy8gVGhlIGRlcHRoIG9mIGEgbm9kZSB3aGVuIHRoZSBub2RlQWxpZ24gKGFsaWduKSBpcyBzZXQgdG8gJ2p1c3RpZnknXG5mdW5jdGlvbiBqdXN0aWZ5KG5vZGUsIG4pIHtcbiAgcmV0dXJuIG5vZGUuc291cmNlTGlua3MubGVuZ3RoID8gbm9kZS5kZXB0aCA6IG4gLSAxO1xufVxuXG4vLyBUaGUgZGVwdGggb2YgYSBub2RlIHdoZW4gdGhlIG5vZGVBbGlnbiAoYWxpZ24pIGlzIHNldCB0byAnY2VudGVyJ1xuZnVuY3Rpb24gY2VudGVyKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudGFyZ2V0TGlua3MubGVuZ3RoID8gbm9kZS5kZXB0aCA6IG5vZGUuc291cmNlTGlua3MubGVuZ3RoID8gbWluKG5vZGUuc291cmNlTGlua3MsIHRhcmdldERlcHRoKSAtIDEgOiAwO1xufVxuXG4vLyByZXR1cm5zIGEgZnVuY3Rpb24sIHVzaW5nIHRoZSBwYXJhbWV0ZXIgZ2l2ZW4gdG8gdGhlIHNhbmtleSBzZXR0aW5nXG5mdW5jdGlvbiBjb25zdGFudCh4KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG4vLy8gaHR0cHM6Ly9naXRodWIuY29tL3RvbXNoYW5sZXkvZDMtc2Fua2V5Q2lyY3VsYXItY2lyY3VsYXJcblxuLy8gc29ydCBsaW5rcycgYnJlYWR0aCAoaWUgdG9wIHRvIGJvdHRvbSBpbiBhIGNvbHVtbiksIGJhc2VkIG9uIHRoZWlyIHNvdXJjZSBub2RlcycgYnJlYWR0aHNcbmZ1bmN0aW9uIGFzY2VuZGluZ1NvdXJjZUJyZWFkdGgoYSwgYikge1xuICByZXR1cm4gYXNjZW5kaW5nQnJlYWR0aChhLnNvdXJjZSwgYi5zb3VyY2UpIHx8IGEuaW5kZXggLSBiLmluZGV4O1xufVxuXG4vLyBzb3J0IGxpbmtzJyBicmVhZHRoIChpZSB0b3AgdG8gYm90dG9tIGluIGEgY29sdW1uKSwgYmFzZWQgb24gdGhlaXIgdGFyZ2V0IG5vZGVzJyBicmVhZHRoc1xuZnVuY3Rpb24gYXNjZW5kaW5nVGFyZ2V0QnJlYWR0aChhLCBiKSB7XG4gIHJldHVybiBhc2NlbmRpbmdCcmVhZHRoKGEudGFyZ2V0LCBiLnRhcmdldCkgfHwgYS5pbmRleCAtIGIuaW5kZXg7XG59XG5cbi8vIHNvcnQgbm9kZXMnIGJyZWFkdGggKGllIHRvcCB0byBib3R0b20gaW4gYSBjb2x1bW4pXG4vLyBpZiBib3RoIG5vZGVzIGhhdmUgY2lyY3VsYXIgbGlua3MsIG9yIGJvdGggZG9uJ3QgaGF2ZSBjaXJjdWxhciBsaW5rcywgdGhlbiBzb3J0IGJ5IHRoZSB0b3AgKHkwKSBvZiB0aGUgbm9kZVxuLy8gZWxzZSBwdXNoIG5vZGVzIHRoYXQgaGF2ZSB0b3AgY2lyY3VsYXIgbGlua3MgdG8gdGhlIHRvcCwgYW5kIG5vZGVzIHRoYXQgaGF2ZSBib3R0b20gY2lyY3VsYXIgbGlua3MgdG8gdGhlIGJvdHRvbVxuZnVuY3Rpb24gYXNjZW5kaW5nQnJlYWR0aChhLCBiKSB7XG4gIGlmIChhLnBhcnRPZkN5Y2xlID09PSBiLnBhcnRPZkN5Y2xlKSB7XG4gICAgcmV0dXJuIGEueTAgLSBiLnkwO1xuICB9IGVsc2Uge1xuICAgIGlmIChhLmNpcmN1bGFyTGlua1R5cGUgPT09ICd0b3AnIHx8IGIuY2lyY3VsYXJMaW5rVHlwZSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG59XG5cbi8vIHJldHVybiB0aGUgdmFsdWUgb2YgYSBub2RlIG9yIGxpbmtcbmZ1bmN0aW9uIHZhbHVlKGQpIHtcbiAgcmV0dXJuIGQudmFsdWU7XG59XG5cbi8vIHJldHVybiB0aGUgdmVydGljYWwgY2VudGVyIG9mIGEgbm9kZVxuZnVuY3Rpb24gbm9kZUNlbnRlcihub2RlKSB7XG4gIHJldHVybiAobm9kZS55MCArIG5vZGUueTEpIC8gMjtcbn1cblxuLy8gcmV0dXJuIHRoZSB2ZXJ0aWNhbCBjZW50ZXIgb2YgYSBsaW5rJ3Mgc291cmNlIG5vZGVcbmZ1bmN0aW9uIGxpbmtTb3VyY2VDZW50ZXIobGluaykge1xuICByZXR1cm4gbm9kZUNlbnRlcihsaW5rLnNvdXJjZSk7XG59XG5cbi8vIHJldHVybiB0aGUgdmVydGljYWwgY2VudGVyIG9mIGEgbGluaydzIHRhcmdldCBub2RlXG5mdW5jdGlvbiBsaW5rVGFyZ2V0Q2VudGVyKGxpbmspIHtcbiAgcmV0dXJuIG5vZGVDZW50ZXIobGluay50YXJnZXQpO1xufVxuXG4vLyBSZXR1cm4gdGhlIGRlZmF1bHQgdmFsdWUgZm9yIElEIGZvciBub2RlLCBkLmluZGV4XG5mdW5jdGlvbiBkZWZhdWx0SWQoZCkge1xuICByZXR1cm4gZC5pbmRleDtcbn1cblxuLy8gUmV0dXJuIHRoZSBkZWZhdWx0IG9iamVjdCB0aGUgZ3JhcGgncyBub2RlcywgZ3JhcGgubm9kZXNcbmZ1bmN0aW9uIGRlZmF1bHROb2RlcyhncmFwaCkge1xuICByZXR1cm4gZ3JhcGgubm9kZXM7XG59XG5cbi8vIFJldHVybiB0aGUgZGVmYXVsdCBvYmplY3QgdGhlIGdyYXBoJ3Mgbm9kZXMsIGdyYXBoLmxpbmtzXG5mdW5jdGlvbiBkZWZhdWx0TGlua3MoZ3JhcGgpIHtcbiAgcmV0dXJuIGdyYXBoLmxpbmtzO1xufVxuXG4vLyBSZXR1cm4gdGhlIG5vZGUgZnJvbSB0aGUgY29sbGVjdGlvbiB0aGF0IG1hdGNoZXMgdGhlIHByb3ZpZGVkIElELCBvciB0aHJvdyBhbiBlcnJvciBpZiBubyBtYXRjaFxuZnVuY3Rpb24gZmluZChub2RlQnlJZCwgaWQpIHtcbiAgdmFyIG5vZGUgPSBub2RlQnlJZC5nZXQoaWQpO1xuICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignbWlzc2luZzogJyArIGlkKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVJRChub2RlLCBpZCkge1xuICByZXR1cm4gaWQobm9kZSk7XG59XG5cbi8vIFRoZSBtYWluIHNhbmtleUNpcmN1bGFyIGZ1bmN0aW9uc1xuXG4vLyBTb21lIGNvbnN0YW50cyBmb3IgY2lyY3VsYXIgbGluayBjYWxjdWxhdGlvbnNcbnZhciB2ZXJ0aWNhbE1hcmdpbiA9IDI1O1xudmFyIGJhc2VSYWRpdXMgPSAxMDtcbnZhciBzY2FsZSA9IDAuMzsgLy9Qb3NzaWJseSBsZXQgdXNlciBjb250cm9sIHRoaXMsIGFsdGhvdWdoIGFueXRoaW5nIG92ZXIgMC41IHN0YXJ0cyB0byBnZXQgdG9vIGNyYW1wZWRcblxuZnVuY3Rpb24gc2Fua2V5Q2lyY3VsYXIgKCkge1xuICAvLyBTZXQgdGhlIGRlZmF1bHQgdmFsdWVzXG4gIHZhciB4MCA9IDAsXG4gICAgICB5MCA9IDAsXG4gICAgICB4MSA9IDEsXG4gICAgICB5MSA9IDEsXG4gICAgICAvLyBleHRlbnRcbiAgZHggPSAyNCxcbiAgICAgIC8vIG5vZGVXaWR0aFxuICBweSxcbiAgICAgIC8vIG5vZGVQYWRkaW5nLCBmb3IgdmVydGljYWwgcG9zdGlvbmluZ1xuICBpZCA9IGRlZmF1bHRJZCxcbiAgICAgIGFsaWduID0ganVzdGlmeSxcbiAgICAgIG5vZGVzID0gZGVmYXVsdE5vZGVzLFxuICAgICAgbGlua3MgPSBkZWZhdWx0TGlua3MsXG4gICAgICBpdGVyYXRpb25zID0gMzIsXG4gICAgICBjaXJjdWxhckxpbmtHYXAgPSAyLFxuICAgICAgcGFkZGluZ1JhdGlvLFxuICAgICAgc29ydE5vZGVzID0gbnVsbDtcblxuICBmdW5jdGlvbiBzYW5rZXlDaXJjdWxhcigpIHtcbiAgICB2YXIgZ3JhcGggPSB7XG4gICAgICBub2Rlczogbm9kZXMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSxcbiAgICAgIGxpbmtzOiBsaW5rcy5hcHBseShudWxsLCBhcmd1bWVudHMpXG5cbiAgICAgIC8vIFByb2Nlc3MgdGhlIGdyYXBoJ3Mgbm9kZXMgYW5kIGxpbmtzLCBzZXR0aW5nIHRoZWlyIHBvc2l0aW9uc1xuXG4gICAgICAvLyAxLiAgQXNzb2NpYXRlIHRoZSBub2RlcyB3aXRoIHRoZWlyIHJlc3BlY3RpdmUgbGlua3MsIGFuZCB2aWNlIHZlcnNhXG4gICAgfTtjb21wdXRlTm9kZUxpbmtzKGdyYXBoKTtcblxuICAgIC8vIDIuICBEZXRlcm1pbmUgd2hpY2ggbGlua3MgcmVzdWx0IGluIGEgY2lyY3VsYXIgcGF0aCBpbiB0aGUgZ3JhcGhcbiAgICBpZGVudGlmeUNpcmNsZXMoZ3JhcGgsIGlkLCBzb3J0Tm9kZXMpO1xuXG4gICAgLy8gNC4gQ2FsY3VsYXRlIHRoZSBub2RlcycgdmFsdWVzLCBiYXNlZCBvbiB0aGUgdmFsdWVzIG9mIHRoZSBpbmNvbWluZyBhbmQgb3V0Z29pbmcgbGlua3NcbiAgICBjb21wdXRlTm9kZVZhbHVlcyhncmFwaCk7XG5cbiAgICAvLyA1LiAgQ2FsY3VsYXRlIHRoZSBub2RlcycgZGVwdGggYmFzZWQgb24gdGhlIGluY29taW5nIGFuZCBvdXRnb2luZyBsaW5rc1xuICAgIC8vICAgICBTZXRzIHRoZSBub2Rlcyc6XG4gICAgLy8gICAgIC0gZGVwdGg6ICB0aGUgZGVwdGggaW4gdGhlIGdyYXBoXG4gICAgLy8gICAgIC0gY29sdW1uOiB0aGUgZGVwdGggKDAsIDEsIDIsIGV0YyksIGFzIGlzIHJlbGF0ZXMgdG8gdmlzdWFsIHBvc2l0aW9uIGZyb20gbGVmdCB0byByaWdodFxuICAgIC8vICAgICAtIHgwLCB4MTogdGhlIHggY29vcmRpbmF0ZXMsIGFzIGlzIHJlbGF0ZXMgdG8gdmlzdWFsIHBvc2l0aW9uIGZyb20gbGVmdCB0byByaWdodFxuICAgIGNvbXB1dGVOb2RlRGVwdGhzKGdyYXBoKTtcblxuICAgIC8vIDMuICBEZXRlcm1pbmUgaG93IHRoZSBjaXJjdWxhciBsaW5rcyB3aWxsIGJlIGRyYXduLFxuICAgIC8vICAgICBlaXRoZXIgdHJhdmVsbGluZyBiYWNrIGFib3ZlIHRoZSBtYWluIGNoYXJ0IChcInRvcFwiKVxuICAgIC8vICAgICBvciBiZWxvdyB0aGUgbWFpbiBjaGFydCAoXCJib3R0b21cIilcbiAgICBzZWxlY3RDaXJjdWxhckxpbmtUeXBlcyhncmFwaCwgaWQpO1xuXG4gICAgLy8gNi4gIENhbGN1bGF0ZSB0aGUgbm9kZXMnIGFuZCBsaW5rcycgdmVydGljYWwgcG9zaXRpb24gd2l0aGluIHRoZWlyIHJlc3BlY3RpdmUgY29sdW1uXG4gICAgLy8gICAgIEFsc28gcmVhZGp1c3RzIHNhbmtleUNpcmN1bGFyIHNpemUgaWYgY2lyY3VsYXIgbGlua3MgYXJlIG5lZWRlZCwgYW5kIG5vZGUgeCdzXG4gICAgY29tcHV0ZU5vZGVCcmVhZHRocyhncmFwaCwgaXRlcmF0aW9ucywgaWQpO1xuICAgIGNvbXB1dGVMaW5rQnJlYWR0aHMoZ3JhcGgpO1xuXG4gICAgLy8gNy4gIFNvcnQgbGlua3MgcGVyIG5vZGUsIGJhc2VkIG9uIHRoZSBsaW5rcycgc291cmNlL3RhcmdldCBub2RlcycgYnJlYWR0aHNcbiAgICAvLyA4LiAgQWRqdXN0IG5vZGVzIHRoYXQgb3ZlcmxhcCBsaW5rcyB0aGF0IHNwYW4gMisgY29sdW1uc1xuICAgIHZhciBsaW5rU29ydGluZ0l0ZXJhdGlvbnMgPSA0OyAvL1Bvc3NpYmx5IGxldCB1c2VyIGNvbnRyb2wgdGhpcyBudW1iZXIsIGxpa2UgdGhlIGl0ZXJhdGlvbnMgb3ZlciBub2RlIHBsYWNlbWVudFxuICAgIGZvciAodmFyIGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IGxpbmtTb3J0aW5nSXRlcmF0aW9uczsgaXRlcmF0aW9uKyspIHtcblxuICAgICAgc29ydFNvdXJjZUxpbmtzKGdyYXBoLCB5MSwgaWQpO1xuICAgICAgc29ydFRhcmdldExpbmtzKGdyYXBoLCB5MSwgaWQpO1xuICAgICAgcmVzb2x2ZU5vZGVMaW5rT3ZlcmxhcHMoZ3JhcGgsIHkwLCB5MSwgaWQpO1xuICAgICAgc29ydFNvdXJjZUxpbmtzKGdyYXBoLCB5MSwgaWQpO1xuICAgICAgc29ydFRhcmdldExpbmtzKGdyYXBoLCB5MSwgaWQpO1xuICAgIH1cblxuICAgIC8vIDguMSAgQWRqdXN0IG5vZGUgYW5kIGxpbmsgcG9zaXRpb25zIGJhY2sgdG8gZmlsbCBoZWlnaHQgb2YgY2hhcnQgYXJlYSBpZiBjb21wcmVzc2VkXG4gICAgZmlsbEhlaWdodChncmFwaCwgeTAsIHkxKTtcblxuICAgIC8vIDkuIENhbGN1bGF0ZSB2aXN1YWxseSBhcHBlYWxsaW5nIHBhdGggZm9yIHRoZSBjaXJjdWxhciBwYXRocywgYW5kIGNyZWF0ZSB0aGUgXCJkXCIgc3RyaW5nXG4gICAgYWRkQ2lyY3VsYXJQYXRoRGF0YShncmFwaCwgY2lyY3VsYXJMaW5rR2FwLCB5MSwgaWQpO1xuXG4gICAgcmV0dXJuIGdyYXBoO1xuICB9IC8vIGVuZCBvZiBzYW5rZXlDaXJjdWxhciBmdW5jdGlvblxuXG5cbiAgLy8gU2V0IHRoZSBzYW5rZXlDaXJjdWxhciBwYXJhbWV0ZXJzXG4gIC8vIG5vZGVJRCwgbm9kZUFsaWduLCBub2RlV2lkdGgsIG5vZGVQYWRkaW5nLCBub2RlcywgbGlua3MsIHNpemUsIGV4dGVudCwgaXRlcmF0aW9ucywgbm9kZVBhZGRpbmdSYXRpbywgY2lyY3VsYXJMaW5rR2FwXG4gIHNhbmtleUNpcmN1bGFyLm5vZGVJZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoaWQgPSB0eXBlb2YgXyA9PT0gJ2Z1bmN0aW9uJyA/IF8gOiBjb25zdGFudChfKSwgc2Fua2V5Q2lyY3VsYXIpIDogaWQ7XG4gIH07XG5cbiAgc2Fua2V5Q2lyY3VsYXIubm9kZUFsaWduID0gZnVuY3Rpb24gKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChhbGlnbiA9IHR5cGVvZiBfID09PSAnZnVuY3Rpb24nID8gXyA6IGNvbnN0YW50KF8pLCBzYW5rZXlDaXJjdWxhcikgOiBhbGlnbjtcbiAgfTtcblxuICBzYW5rZXlDaXJjdWxhci5ub2RlV2lkdGggPSBmdW5jdGlvbiAoXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGR4ID0gK18sIHNhbmtleUNpcmN1bGFyKSA6IGR4O1xuICB9O1xuXG4gIHNhbmtleUNpcmN1bGFyLm5vZGVQYWRkaW5nID0gZnVuY3Rpb24gKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChweSA9ICtfLCBzYW5rZXlDaXJjdWxhcikgOiBweTtcbiAgfTtcblxuICBzYW5rZXlDaXJjdWxhci5ub2RlcyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobm9kZXMgPSB0eXBlb2YgXyA9PT0gJ2Z1bmN0aW9uJyA/IF8gOiBjb25zdGFudChfKSwgc2Fua2V5Q2lyY3VsYXIpIDogbm9kZXM7XG4gIH07XG5cbiAgc2Fua2V5Q2lyY3VsYXIubGlua3MgPSBmdW5jdGlvbiAoXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGxpbmtzID0gdHlwZW9mIF8gPT09ICdmdW5jdGlvbicgPyBfIDogY29uc3RhbnQoXyksIHNhbmtleUNpcmN1bGFyKSA6IGxpbmtzO1xuICB9O1xuXG4gIHNhbmtleUNpcmN1bGFyLnNpemUgPSBmdW5jdGlvbiAoXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHgwID0geTAgPSAwLCB4MSA9ICtfWzBdLCB5MSA9ICtfWzFdLCBzYW5rZXlDaXJjdWxhcikgOiBbeDEgLSB4MCwgeTEgLSB5MF07XG4gIH07XG5cbiAgc2Fua2V5Q2lyY3VsYXIuZXh0ZW50ID0gZnVuY3Rpb24gKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh4MCA9ICtfWzBdWzBdLCB4MSA9ICtfWzFdWzBdLCB5MCA9ICtfWzBdWzFdLCB5MSA9ICtfWzFdWzFdLCBzYW5rZXlDaXJjdWxhcikgOiBbW3gwLCB5MF0sIFt4MSwgeTFdXTtcbiAgfTtcblxuICBzYW5rZXlDaXJjdWxhci5pdGVyYXRpb25zID0gZnVuY3Rpb24gKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpdGVyYXRpb25zID0gK18sIHNhbmtleUNpcmN1bGFyKSA6IGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgc2Fua2V5Q2lyY3VsYXIuY2lyY3VsYXJMaW5rR2FwID0gZnVuY3Rpb24gKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChjaXJjdWxhckxpbmtHYXAgPSArXywgc2Fua2V5Q2lyY3VsYXIpIDogY2lyY3VsYXJMaW5rR2FwO1xuICB9O1xuXG4gIHNhbmtleUNpcmN1bGFyLm5vZGVQYWRkaW5nUmF0aW8gPSBmdW5jdGlvbiAoXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHBhZGRpbmdSYXRpbyA9ICtfLCBzYW5rZXlDaXJjdWxhcikgOiBwYWRkaW5nUmF0aW87XG4gIH07XG5cbiAgc2Fua2V5Q2lyY3VsYXIuc29ydE5vZGVzID0gZnVuY3Rpb24gKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzb3J0Tm9kZXMgPSBfLCBzYW5rZXlDaXJjdWxhcikgOiBzb3J0Tm9kZXM7XG4gIH07XG5cbiAgc2Fua2V5Q2lyY3VsYXIudXBkYXRlID0gZnVuY3Rpb24gKGdyYXBoKSB7XG4gICAgLy8gNS4gIENhbGN1bGF0ZSB0aGUgbm9kZXMnIGRlcHRoIGJhc2VkIG9uIHRoZSBpbmNvbWluZyBhbmQgb3V0Z29pbmcgbGlua3NcbiAgICAvLyAgICAgU2V0cyB0aGUgbm9kZXMnOlxuICAgIC8vICAgICAtIGRlcHRoOiAgdGhlIGRlcHRoIGluIHRoZSBncmFwaFxuICAgIC8vICAgICAtIGNvbHVtbjogdGhlIGRlcHRoICgwLCAxLCAyLCBldGMpLCBhcyBpcyByZWxhdGVzIHRvIHZpc3VhbCBwb3NpdGlvbiBmcm9tIGxlZnQgdG8gcmlnaHRcbiAgICAvLyAgICAgLSB4MCwgeDE6IHRoZSB4IGNvb3JkaW5hdGVzLCBhcyBpcyByZWxhdGVzIHRvIHZpc3VhbCBwb3NpdGlvbiBmcm9tIGxlZnQgdG8gcmlnaHRcbiAgICAvLyBjb21wdXRlTm9kZURlcHRocyhncmFwaClcblxuICAgIC8vIDMuICBEZXRlcm1pbmUgaG93IHRoZSBjaXJjdWxhciBsaW5rcyB3aWxsIGJlIGRyYXduLFxuICAgIC8vICAgICBlaXRoZXIgdHJhdmVsbGluZyBiYWNrIGFib3ZlIHRoZSBtYWluIGNoYXJ0IChcInRvcFwiKVxuICAgIC8vICAgICBvciBiZWxvdyB0aGUgbWFpbiBjaGFydCAoXCJib3R0b21cIilcbiAgICBzZWxlY3RDaXJjdWxhckxpbmtUeXBlcyhncmFwaCwgaWQpO1xuXG4gICAgLy8gNi4gIENhbGN1bGF0ZSB0aGUgbm9kZXMnIGFuZCBsaW5rcycgdmVydGljYWwgcG9zaXRpb24gd2l0aGluIHRoZWlyIHJlc3BlY3RpdmUgY29sdW1uXG4gICAgLy8gICAgIEFsc28gcmVhZGp1c3RzIHNhbmtleUNpcmN1bGFyIHNpemUgaWYgY2lyY3VsYXIgbGlua3MgYXJlIG5lZWRlZCwgYW5kIG5vZGUgeCdzXG4gICAgLy8gY29tcHV0ZU5vZGVCcmVhZHRocyhncmFwaCwgaXRlcmF0aW9ucywgaWQpXG4gICAgY29tcHV0ZUxpbmtCcmVhZHRocyhncmFwaCk7XG5cbiAgICAvLyBGb3JjZSBwb3NpdGlvbiBvZiBjaXJjdWxhciBsaW5rIHR5cGUgYmFzZWQgb24gcG9zaXRpb25cbiAgICBncmFwaC5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICBpZiAobGluay5jaXJjdWxhcikge1xuICAgICAgICBsaW5rLmNpcmN1bGFyTGlua1R5cGUgPSBsaW5rLnkwICsgbGluay55MSA8IHkxID8gJ3RvcCcgOiAnYm90dG9tJztcblxuICAgICAgICBsaW5rLnNvdXJjZS5jaXJjdWxhckxpbmtUeXBlID0gbGluay5jaXJjdWxhckxpbmtUeXBlO1xuICAgICAgICBsaW5rLnRhcmdldC5jaXJjdWxhckxpbmtUeXBlID0gbGluay5jaXJjdWxhckxpbmtUeXBlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc29ydFNvdXJjZUxpbmtzKGdyYXBoLCB5MSwgaWQsIGZhbHNlKTsgLy8gU29ydCBsaW5rcyBidXQgZG8gbm90IG1vdmUgbm9kZXNcbiAgICBzb3J0VGFyZ2V0TGlua3MoZ3JhcGgsIHkxLCBpZCk7XG5cbiAgICAvLyA3LiAgU29ydCBsaW5rcyBwZXIgbm9kZSwgYmFzZWQgb24gdGhlIGxpbmtzJyBzb3VyY2UvdGFyZ2V0IG5vZGVzJyBicmVhZHRoc1xuICAgIC8vIDguICBBZGp1c3Qgbm9kZXMgdGhhdCBvdmVybGFwIGxpbmtzIHRoYXQgc3BhbiAyKyBjb2x1bW5zXG4gICAgLy8gdmFyIGxpbmtTb3J0aW5nSXRlcmF0aW9ucyA9IDQ7IC8vUG9zc2libHkgbGV0IHVzZXIgY29udHJvbCB0aGlzIG51bWJlciwgbGlrZSB0aGUgaXRlcmF0aW9ucyBvdmVyIG5vZGUgcGxhY2VtZW50XG4gICAgLy8gZm9yICh2YXIgaXRlcmF0aW9uID0gMDsgaXRlcmF0aW9uIDwgbGlua1NvcnRpbmdJdGVyYXRpb25zOyBpdGVyYXRpb24rKykge1xuICAgIC8vXG4gICAgLy8gICBzb3J0U291cmNlTGlua3MoZ3JhcGgsIHkxLCBpZClcbiAgICAvLyAgIHNvcnRUYXJnZXRMaW5rcyhncmFwaCwgeTEsIGlkKVxuICAgIC8vICAgcmVzb2x2ZU5vZGVMaW5rT3ZlcmxhcHMoZ3JhcGgsIHkwLCB5MSwgaWQpXG4gICAgLy8gICBzb3J0U291cmNlTGlua3MoZ3JhcGgsIHkxLCBpZClcbiAgICAvLyAgIHNvcnRUYXJnZXRMaW5rcyhncmFwaCwgeTEsIGlkKVxuICAgIC8vXG4gICAgLy8gfVxuXG4gICAgLy8gOC4xICBBZGp1c3Qgbm9kZSBhbmQgbGluayBwb3NpdGlvbnMgYmFjayB0byBmaWxsIGhlaWdodCBvZiBjaGFydCBhcmVhIGlmIGNvbXByZXNzZWRcbiAgICAvLyBmaWxsSGVpZ2h0KGdyYXBoLCB5MCwgeTEpXG5cbiAgICAvLyA5LiBDYWxjdWxhdGUgdmlzdWFsbHkgYXBwZWFsbGluZyBwYXRoIGZvciB0aGUgY2lyY3VsYXIgcGF0aHMsIGFuZCBjcmVhdGUgdGhlIFwiZFwiIHN0cmluZ1xuICAgIGFkZENpcmN1bGFyUGF0aERhdGEoZ3JhcGgsIGNpcmN1bGFyTGlua0dhcCwgeTEsIGlkKTtcbiAgICByZXR1cm4gZ3JhcGg7XG4gIH07XG5cbiAgLy8gUG9wdWxhdGUgdGhlIHNvdXJjZUxpbmtzIGFuZCB0YXJnZXRMaW5rcyBmb3IgZWFjaCBub2RlLlxuICAvLyBBbHNvLCBpZiB0aGUgc291cmNlIGFuZCB0YXJnZXQgYXJlIG5vdCBvYmplY3RzLCBhc3N1bWUgdGhleSBhcmUgaW5kaWNlcy5cbiAgZnVuY3Rpb24gY29tcHV0ZU5vZGVMaW5rcyhncmFwaCkge1xuICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGkpIHtcbiAgICAgIG5vZGUuaW5kZXggPSBpO1xuICAgICAgbm9kZS5zb3VyY2VMaW5rcyA9IFtdO1xuICAgICAgbm9kZS50YXJnZXRMaW5rcyA9IFtdO1xuICAgIH0pO1xuICAgIHZhciBub2RlQnlJZCA9IG1hcChncmFwaC5ub2RlcywgaWQpO1xuICAgIGdyYXBoLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmssIGkpIHtcbiAgICAgIGxpbmsuaW5kZXggPSBpO1xuICAgICAgdmFyIHNvdXJjZSA9IGxpbmsuc291cmNlO1xuICAgICAgdmFyIHRhcmdldCA9IGxpbmsudGFyZ2V0O1xuICAgICAgaWYgKCh0eXBlb2Ygc291cmNlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yoc291cmNlKSkgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNvdXJjZSA9IGxpbmsuc291cmNlID0gZmluZChub2RlQnlJZCwgc291cmNlKTtcbiAgICAgIH1cbiAgICAgIGlmICgodHlwZW9mIHRhcmdldCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHRhcmdldCkpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0YXJnZXQgPSBsaW5rLnRhcmdldCA9IGZpbmQobm9kZUJ5SWQsIHRhcmdldCk7XG4gICAgICB9XG4gICAgICBzb3VyY2Uuc291cmNlTGlua3MucHVzaChsaW5rKTtcbiAgICAgIHRhcmdldC50YXJnZXRMaW5rcy5wdXNoKGxpbmspO1xuICAgIH0pO1xuICAgIHJldHVybiBncmFwaDtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIHZhbHVlIChzaXplKSBhbmQgY3ljbGVuZXNzIG9mIGVhY2ggbm9kZSBieSBzdW1taW5nIHRoZSBhc3NvY2lhdGVkIGxpbmtzLlxuICBmdW5jdGlvbiBjb21wdXRlTm9kZVZhbHVlcyhncmFwaCkge1xuICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIG5vZGUucGFydE9mQ3ljbGUgPSBmYWxzZTtcbiAgICAgIG5vZGUudmFsdWUgPSBNYXRoLm1heChzdW0obm9kZS5zb3VyY2VMaW5rcywgdmFsdWUpLCBzdW0obm9kZS50YXJnZXRMaW5rcywgdmFsdWUpKTtcbiAgICAgIG5vZGUuc291cmNlTGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICBpZiAobGluay5jaXJjdWxhcikge1xuICAgICAgICAgIG5vZGUucGFydE9mQ3ljbGUgPSB0cnVlO1xuICAgICAgICAgIG5vZGUuY2lyY3VsYXJMaW5rVHlwZSA9IGxpbmsuY2lyY3VsYXJMaW5rVHlwZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBub2RlLnRhcmdldExpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgaWYgKGxpbmsuY2lyY3VsYXIpIHtcbiAgICAgICAgICBub2RlLnBhcnRPZkN5Y2xlID0gdHJ1ZTtcbiAgICAgICAgICBub2RlLmNpcmN1bGFyTGlua1R5cGUgPSBsaW5rLmNpcmN1bGFyTGlua1R5cGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2lyY2xlTWFyZ2lucyhncmFwaCkge1xuICAgIHZhciB0b3RhbFRvcExpbmtzV2lkdGggPSAwLFxuICAgICAgICB0b3RhbEJvdHRvbUxpbmtzV2lkdGggPSAwLFxuICAgICAgICB0b3RhbFJpZ2h0TGlua3NXaWR0aCA9IDAsXG4gICAgICAgIHRvdGFsTGVmdExpbmtzV2lkdGggPSAwO1xuXG4gICAgdmFyIG1heENvbHVtbiA9IG1heChncmFwaC5ub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmNvbHVtbjtcbiAgICB9KTtcblxuICAgIGdyYXBoLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgIGlmIChsaW5rLmNpcmN1bGFyKSB7XG4gICAgICAgIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcpIHtcbiAgICAgICAgICB0b3RhbFRvcExpbmtzV2lkdGggPSB0b3RhbFRvcExpbmtzV2lkdGggKyBsaW5rLndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdGFsQm90dG9tTGlua3NXaWR0aCA9IHRvdGFsQm90dG9tTGlua3NXaWR0aCArIGxpbmsud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGluay50YXJnZXQuY29sdW1uID09IDApIHtcbiAgICAgICAgICB0b3RhbExlZnRMaW5rc1dpZHRoID0gdG90YWxMZWZ0TGlua3NXaWR0aCArIGxpbmsud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGluay5zb3VyY2UuY29sdW1uID09IG1heENvbHVtbikge1xuICAgICAgICAgIHRvdGFsUmlnaHRMaW5rc1dpZHRoID0gdG90YWxSaWdodExpbmtzV2lkdGggKyBsaW5rLndpZHRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvL2FjY291bnQgZm9yIHJhZGl1cyBvZiBjdXJ2ZXMgYW5kIHBhZGRpbmcgYmV0d2VlbiBsaW5rc1xuICAgIHRvdGFsVG9wTGlua3NXaWR0aCA9IHRvdGFsVG9wTGlua3NXaWR0aCA+IDAgPyB0b3RhbFRvcExpbmtzV2lkdGggKyB2ZXJ0aWNhbE1hcmdpbiArIGJhc2VSYWRpdXMgOiB0b3RhbFRvcExpbmtzV2lkdGg7XG4gICAgdG90YWxCb3R0b21MaW5rc1dpZHRoID0gdG90YWxCb3R0b21MaW5rc1dpZHRoID4gMCA/IHRvdGFsQm90dG9tTGlua3NXaWR0aCArIHZlcnRpY2FsTWFyZ2luICsgYmFzZVJhZGl1cyA6IHRvdGFsQm90dG9tTGlua3NXaWR0aDtcbiAgICB0b3RhbFJpZ2h0TGlua3NXaWR0aCA9IHRvdGFsUmlnaHRMaW5rc1dpZHRoID4gMCA/IHRvdGFsUmlnaHRMaW5rc1dpZHRoICsgdmVydGljYWxNYXJnaW4gKyBiYXNlUmFkaXVzIDogdG90YWxSaWdodExpbmtzV2lkdGg7XG4gICAgdG90YWxMZWZ0TGlua3NXaWR0aCA9IHRvdGFsTGVmdExpbmtzV2lkdGggPiAwID8gdG90YWxMZWZ0TGlua3NXaWR0aCArIHZlcnRpY2FsTWFyZ2luICsgYmFzZVJhZGl1cyA6IHRvdGFsTGVmdExpbmtzV2lkdGg7XG5cbiAgICByZXR1cm4geyBcInRvcFwiOiB0b3RhbFRvcExpbmtzV2lkdGgsIFwiYm90dG9tXCI6IHRvdGFsQm90dG9tTGlua3NXaWR0aCwgXCJsZWZ0XCI6IHRvdGFsTGVmdExpbmtzV2lkdGgsIFwicmlnaHRcIjogdG90YWxSaWdodExpbmtzV2lkdGggfTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgeDAsIHkwLCB4MSBhbmQgeTEgZm9yIHRoZSBzYW5rZXlDaXJjdWxhciwgdG8gYWxsb3cgc3BhY2UgZm9yIGFueSBjaXJjdWxhciBsaW5rc1xuICBmdW5jdGlvbiBzY2FsZVNhbmtleVNpemUoZ3JhcGgsIG1hcmdpbikge1xuXG4gICAgdmFyIG1heENvbHVtbiA9IG1heChncmFwaC5ub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmNvbHVtbjtcbiAgICB9KTtcblxuICAgIHZhciBjdXJyZW50V2lkdGggPSB4MSAtIHgwO1xuICAgIHZhciBjdXJyZW50SGVpZ2h0ID0geTEgLSB5MDtcblxuICAgIHZhciBuZXdXaWR0aCA9IGN1cnJlbnRXaWR0aCArIG1hcmdpbi5yaWdodCArIG1hcmdpbi5sZWZ0O1xuICAgIHZhciBuZXdIZWlnaHQgPSBjdXJyZW50SGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b207XG5cbiAgICB2YXIgc2NhbGVYID0gY3VycmVudFdpZHRoIC8gbmV3V2lkdGg7XG4gICAgdmFyIHNjYWxlWSA9IGN1cnJlbnRIZWlnaHQgLyBuZXdIZWlnaHQ7XG5cbiAgICB4MCA9IHgwICogc2NhbGVYICsgbWFyZ2luLmxlZnQ7XG4gICAgeDEgPSBtYXJnaW4ucmlnaHQgPT0gMCA/IHgxIDogeDEgKiBzY2FsZVg7XG4gICAgeTAgPSB5MCAqIHNjYWxlWSArIG1hcmdpbi50b3A7XG4gICAgeTEgPSB5MSAqIHNjYWxlWTtcblxuICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIG5vZGUueDAgPSB4MCArIG5vZGUuY29sdW1uICogKCh4MSAtIHgwIC0gZHgpIC8gbWF4Q29sdW1uKTtcbiAgICAgIG5vZGUueDEgPSBub2RlLngwICsgZHg7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2NhbGVZO1xuICB9XG5cbiAgLy8gSXRlcmF0aXZlbHkgYXNzaWduIHRoZSBkZXB0aCBmb3IgZWFjaCBub2RlLlxuICAvLyBOb2RlcyBhcmUgYXNzaWduZWQgdGhlIG1heGltdW0gZGVwdGggb2YgaW5jb21pbmcgbmVpZ2hib3JzIHBsdXMgb25lO1xuICAvLyBub2RlcyB3aXRoIG5vIGluY29taW5nIGxpbmtzIGFyZSBhc3NpZ25lZCBkZXB0aCB6ZXJvLCB3aGlsZVxuICAvLyBub2RlcyB3aXRoIG5vIG91dGdvaW5nIGxpbmtzIGFyZSBhc3NpZ25lZCB0aGUgbWF4aW11bSBkZXB0aC5cbiAgZnVuY3Rpb24gY29tcHV0ZU5vZGVEZXB0aHMoZ3JhcGgpIHtcbiAgICB2YXIgbm9kZXMsIG5leHQsIHg7XG5cbiAgICBmb3IgKG5vZGVzID0gZ3JhcGgubm9kZXMsIG5leHQgPSBbXSwgeCA9IDA7IG5vZGVzLmxlbmd0aDsgKyt4LCBub2RlcyA9IG5leHQsIG5leHQgPSBbXSkge1xuICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBub2RlLmRlcHRoID0geDtcbiAgICAgICAgbm9kZS5zb3VyY2VMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICAgICAgaWYgKG5leHQuaW5kZXhPZihsaW5rLnRhcmdldCkgPCAwICYmICFsaW5rLmNpcmN1bGFyKSB7XG4gICAgICAgICAgICBuZXh0LnB1c2gobGluay50YXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKG5vZGVzID0gZ3JhcGgubm9kZXMsIG5leHQgPSBbXSwgeCA9IDA7IG5vZGVzLmxlbmd0aDsgKyt4LCBub2RlcyA9IG5leHQsIG5leHQgPSBbXSkge1xuICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBub2RlLmhlaWdodCA9IHg7XG4gICAgICAgIG5vZGUudGFyZ2V0TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICAgIGlmIChuZXh0LmluZGV4T2YobGluay5zb3VyY2UpIDwgMCAmJiAhbGluay5jaXJjdWxhcikge1xuICAgICAgICAgICAgbmV4dC5wdXNoKGxpbmsuc291cmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYXNzaWduIGNvbHVtbiBudW1iZXJzLCBhbmQgZ2V0IG1heCB2YWx1ZVxuICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIG5vZGUuY29sdW1uID0gTWF0aC5mbG9vcihhbGlnbi5jYWxsKG51bGwsIG5vZGUsIHgpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFzc2lnbiBub2RlcycgYnJlYWR0aHMsIGFuZCB0aGVuIHNoaWZ0IG5vZGVzIHRoYXQgb3ZlcmxhcCAocmVzb2x2ZUNvbGxpc2lvbnMpXG4gIGZ1bmN0aW9uIGNvbXB1dGVOb2RlQnJlYWR0aHMoZ3JhcGgsIGl0ZXJhdGlvbnMsIGlkKSB7XG4gICAgdmFyIGNvbHVtbnMgPSBuZXN0KCkua2V5KGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZC5jb2x1bW47XG4gICAgfSkuc29ydEtleXMoYXNjZW5kaW5nKS5lbnRyaWVzKGdyYXBoLm5vZGVzKS5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkLnZhbHVlcztcbiAgICB9KTtcblxuICAgIGluaXRpYWxpemVOb2RlQnJlYWR0aChpZCk7XG4gICAgcmVzb2x2ZUNvbGxpc2lvbnMoKTtcblxuICAgIGZvciAodmFyIGFscGhhID0gMSwgbiA9IGl0ZXJhdGlvbnM7IG4gPiAwOyAtLW4pIHtcbiAgICAgIHJlbGF4TGVmdEFuZFJpZ2h0KGFscGhhICo9IDAuOTksIGlkKTtcbiAgICAgIHJlc29sdmVDb2xsaXNpb25zKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZU5vZGVCcmVhZHRoKGlkKSB7XG5cbiAgICAgIC8vb3ZlcnJpZGUgcHkgaWYgbm9kZVBhZGRpbmcgaGFzIGJlZW4gc2V0XG4gICAgICBpZiAocGFkZGluZ1JhdGlvKSB7XG4gICAgICAgIHZhciBwYWRkaW5nID0gSW5maW5pdHk7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAobm9kZXMpIHtcbiAgICAgICAgICB2YXIgdGhpc1BhZGRpbmcgPSB5MSAqIHBhZGRpbmdSYXRpbyAvIChub2Rlcy5sZW5ndGggKyAxKTtcbiAgICAgICAgICBwYWRkaW5nID0gdGhpc1BhZGRpbmcgPCBwYWRkaW5nID8gdGhpc1BhZGRpbmcgOiBwYWRkaW5nO1xuICAgICAgICB9KTtcbiAgICAgICAgcHkgPSBwYWRkaW5nO1xuICAgICAgfVxuXG4gICAgICB2YXIga3kgPSBtaW4oY29sdW1ucywgZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIHJldHVybiAoeTEgLSB5MCAtIChub2Rlcy5sZW5ndGggLSAxKSAqIHB5KSAvIHN1bShub2RlcywgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vY2FsY3VsYXRlIHRoZSB3aWR0aHMgb2YgdGhlIGxpbmtzXG4gICAgICBreSA9IGt5ICogc2NhbGU7XG5cbiAgICAgIGdyYXBoLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgbGluay53aWR0aCA9IGxpbmsudmFsdWUgKiBreTtcbiAgICAgIH0pO1xuXG4gICAgICAvL2RldGVybWluZSBob3cgbXVjaCB0byBzY2FsZSBkb3duIHRoZSBjaGFydCwgYmFzZWQgb24gY2lyY3VsYXIgbGlua3NcbiAgICAgIHZhciBtYXJnaW4gPSBnZXRDaXJjbGVNYXJnaW5zKGdyYXBoKTtcbiAgICAgIHZhciByYXRpbyA9IHNjYWxlU2Fua2V5U2l6ZShncmFwaCwgbWFyZ2luKTtcblxuICAgICAgLy9yZS1jYWxjdWxhdGUgd2lkdGhzXG4gICAgICBreSA9IGt5ICogcmF0aW87XG5cbiAgICAgIGdyYXBoLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgbGluay53aWR0aCA9IGxpbmsudmFsdWUgKiBreTtcbiAgICAgIH0pO1xuXG4gICAgICBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIHZhciBub2Rlc0xlbmd0aCA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaSkge1xuICAgICAgICAgIGlmIChub2RlLmRlcHRoID09IGNvbHVtbnMubGVuZ3RoIC0gMSAmJiBub2Rlc0xlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBub2RlLnkwID0geTEgLyAyIC0gbm9kZS52YWx1ZSAqIGt5O1xuICAgICAgICAgICAgbm9kZS55MSA9IG5vZGUueTAgKyBub2RlLnZhbHVlICoga3k7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlLmRlcHRoID09IDAgJiYgbm9kZXNMZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbm9kZS55MCA9IHkxIC8gMiAtIG5vZGUudmFsdWUgKiBreTtcbiAgICAgICAgICAgIG5vZGUueTEgPSBub2RlLnkwICsgbm9kZS52YWx1ZSAqIGt5O1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5wYXJ0T2ZDeWNsZSkge1xuICAgICAgICAgICAgaWYgKG51bWJlck9mTm9uU2VsZkxpbmtpbmdDeWNsZXMobm9kZSwgaWQpID09IDApIHtcbiAgICAgICAgICAgICAgbm9kZS55MCA9IHkxIC8gMiArIGk7XG4gICAgICAgICAgICAgIG5vZGUueTEgPSBub2RlLnkwICsgbm9kZS52YWx1ZSAqIGt5O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgbm9kZS55MCA9IHkwICsgaTtcbiAgICAgICAgICAgICAgbm9kZS55MSA9IG5vZGUueTAgKyBub2RlLnZhbHVlICoga3k7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLnkwID0geTEgLSBub2RlLnZhbHVlICoga3kgLSBpO1xuICAgICAgICAgICAgICBub2RlLnkxID0gbm9kZS55MCArIG5vZGUudmFsdWUgKiBreTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1hcmdpbi50b3AgPT0gMCB8fCBtYXJnaW4uYm90dG9tID09IDApIHtcbiAgICAgICAgICAgICAgbm9kZS55MCA9ICh5MSAtIHkwKSAvIG5vZGVzTGVuZ3RoICogaTtcbiAgICAgICAgICAgICAgbm9kZS55MSA9IG5vZGUueTAgKyBub2RlLnZhbHVlICoga3k7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLnkwID0gKHkxIC0geTApIC8gMiAtIG5vZGVzTGVuZ3RoIC8gMiArIGk7XG4gICAgICAgICAgICAgIG5vZGUueTEgPSBub2RlLnkwICsgbm9kZS52YWx1ZSAqIGt5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBGb3IgZWFjaCBub2RlIGluIGVhY2ggY29sdW1uLCBjaGVjayB0aGUgbm9kZSdzIHZlcnRpY2FsIHBvc2l0aW9uIGluIHJlbGF0aW9uIHRvIGl0cyB0YXJnZXRzIGFuZCBzb3VyY2VzIHZlcnRpY2FsIHBvc2l0aW9uXG4gICAgLy8gYW5kIHNoaWZ0IHVwL2Rvd24gdG8gYmUgY2xvc2VyIHRvIHRoZSB2ZXJ0aWNhbCBtaWRkbGUgb2YgdGhvc2UgdGFyZ2V0cyBhbmQgc291cmNlc1xuICAgIGZ1bmN0aW9uIHJlbGF4TGVmdEFuZFJpZ2h0KGFscGhhLCBpZCkge1xuICAgICAgdmFyIGNvbHVtbnNMZW5ndGggPSBjb2x1bW5zLmxlbmd0aDtcblxuICAgICAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICB2YXIgbiA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgdmFyIGRlcHRoID0gbm9kZXNbMF0uZGVwdGg7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIC8vIGNoZWNrIHRoZSBub2RlIGlzIG5vdCBhbiBvcnBoYW5cbiAgICAgICAgICB2YXIgbm9kZUhlaWdodDtcbiAgICAgICAgICBpZiAobm9kZS5zb3VyY2VMaW5rcy5sZW5ndGggfHwgbm9kZS50YXJnZXRMaW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnBhcnRPZkN5Y2xlICYmIG51bWJlck9mTm9uU2VsZkxpbmtpbmdDeWNsZXMobm9kZSwgaWQpID4gMCkgOyBlbHNlIGlmIChkZXB0aCA9PSAwICYmIG4gPT0gMSkge1xuICAgICAgICAgICAgICBub2RlSGVpZ2h0ID0gbm9kZS55MSAtIG5vZGUueTA7XG5cbiAgICAgICAgICAgICAgbm9kZS55MCA9IHkxIC8gMiAtIG5vZGVIZWlnaHQgLyAyO1xuICAgICAgICAgICAgICBub2RlLnkxID0geTEgLyAyICsgbm9kZUhlaWdodCAvIDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlcHRoID09IGNvbHVtbnNMZW5ndGggLSAxICYmIG4gPT0gMSkge1xuICAgICAgICAgICAgICBub2RlSGVpZ2h0ID0gbm9kZS55MSAtIG5vZGUueTA7XG5cbiAgICAgICAgICAgICAgbm9kZS55MCA9IHkxIC8gMiAtIG5vZGVIZWlnaHQgLyAyO1xuICAgICAgICAgICAgICBub2RlLnkxID0geTEgLyAyICsgbm9kZUhlaWdodCAvIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgYXZnID0gMDtcblxuICAgICAgICAgICAgICB2YXIgYXZnVGFyZ2V0WSA9IG1lYW4obm9kZS5zb3VyY2VMaW5rcywgbGlua1RhcmdldENlbnRlcik7XG4gICAgICAgICAgICAgIHZhciBhdmdTb3VyY2VZID0gbWVhbihub2RlLnRhcmdldExpbmtzLCBsaW5rU291cmNlQ2VudGVyKTtcblxuICAgICAgICAgICAgICBpZiAoYXZnVGFyZ2V0WSAmJiBhdmdTb3VyY2VZKSB7XG4gICAgICAgICAgICAgICAgYXZnID0gKGF2Z1RhcmdldFkgKyBhdmdTb3VyY2VZKSAvIDI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXZnID0gYXZnVGFyZ2V0WSB8fCBhdmdTb3VyY2VZO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGR5ID0gKGF2ZyAtIG5vZGVDZW50ZXIobm9kZSkpICogYWxwaGE7XG4gICAgICAgICAgICAgIC8vIHBvc2l0aXZlIGlmIGl0IG5vZGUgbmVlZHMgdG8gbW92ZSBkb3duXG4gICAgICAgICAgICAgIG5vZGUueTAgKz0gZHk7XG4gICAgICAgICAgICAgIG5vZGUueTEgKz0gZHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEZvciBlYWNoIGNvbHVtbiwgY2hlY2sgaWYgbm9kZXMgYXJlIG92ZXJsYXBwaW5nLCBhbmQgaWYgc28sIHNoaWZ0IHVwL2Rvd25cbiAgICBmdW5jdGlvbiByZXNvbHZlQ29sbGlzaW9ucygpIHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAobm9kZXMpIHtcbiAgICAgICAgdmFyIG5vZGUsXG4gICAgICAgICAgICBkeSxcbiAgICAgICAgICAgIHkgPSB5MCxcbiAgICAgICAgICAgIG4gPSBub2Rlcy5sZW5ndGgsXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIC8vIFB1c2ggYW55IG92ZXJsYXBwaW5nIG5vZGVzIGRvd24uXG4gICAgICAgIG5vZGVzLnNvcnQoYXNjZW5kaW5nQnJlYWR0aCk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICBkeSA9IHkgLSBub2RlLnkwO1xuXG4gICAgICAgICAgaWYgKGR5ID4gMCkge1xuICAgICAgICAgICAgbm9kZS55MCArPSBkeTtcbiAgICAgICAgICAgIG5vZGUueTEgKz0gZHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHkgPSBub2RlLnkxICsgcHk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgYm90dG9tbW9zdCBub2RlIGdvZXMgb3V0c2lkZSB0aGUgYm91bmRzLCBwdXNoIGl0IGJhY2sgdXAuXG4gICAgICAgIGR5ID0geSAtIHB5IC0geTE7XG4gICAgICAgIGlmIChkeSA+IDApIHtcbiAgICAgICAgICB5ID0gbm9kZS55MCAtPSBkeSwgbm9kZS55MSAtPSBkeTtcblxuICAgICAgICAgIC8vIFB1c2ggYW55IG92ZXJsYXBwaW5nIG5vZGVzIGJhY2sgdXAuXG4gICAgICAgICAgZm9yIChpID0gbiAtIDI7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBkeSA9IG5vZGUueTEgKyBweSAtIHk7XG4gICAgICAgICAgICBpZiAoZHkgPiAwKSBub2RlLnkwIC09IGR5LCBub2RlLnkxIC09IGR5O1xuICAgICAgICAgICAgeSA9IG5vZGUueTA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBBc3NpZ24gdGhlIGxpbmtzIHkwIGFuZCB5MSBiYXNlZCBvbiBzb3VyY2UvdGFyZ2V0IG5vZGVzIHBvc2l0aW9uLFxuICAvLyBwbHVzIHRoZSBsaW5rJ3MgcmVsYXRpdmUgcG9zaXRpb24gdG8gb3RoZXIgbGlua3MgdG8gdGhlIHNhbWUgbm9kZVxuICBmdW5jdGlvbiBjb21wdXRlTGlua0JyZWFkdGhzKGdyYXBoKSB7XG4gICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgbm9kZS5zb3VyY2VMaW5rcy5zb3J0KGFzY2VuZGluZ1RhcmdldEJyZWFkdGgpO1xuICAgICAgbm9kZS50YXJnZXRMaW5rcy5zb3J0KGFzY2VuZGluZ1NvdXJjZUJyZWFkdGgpO1xuICAgIH0pO1xuICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHZhciB5MCA9IG5vZGUueTA7XG4gICAgICB2YXIgeTEgPSB5MDtcblxuICAgICAgLy8gc3RhcnQgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBub2RlIGZvciBjeWNsZSBsaW5rc1xuICAgICAgdmFyIHkwY3ljbGUgPSBub2RlLnkxO1xuICAgICAgdmFyIHkxY3ljbGUgPSB5MGN5Y2xlO1xuXG4gICAgICBub2RlLnNvdXJjZUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgaWYgKGxpbmsuY2lyY3VsYXIpIHtcbiAgICAgICAgICBsaW5rLnkwID0geTBjeWNsZSAtIGxpbmsud2lkdGggLyAyO1xuICAgICAgICAgIHkwY3ljbGUgPSB5MGN5Y2xlIC0gbGluay53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaW5rLnkwID0geTAgKyBsaW5rLndpZHRoIC8gMjtcbiAgICAgICAgICB5MCArPSBsaW5rLndpZHRoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG5vZGUudGFyZ2V0TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgICBpZiAobGluay5jaXJjdWxhcikge1xuICAgICAgICAgIGxpbmsueTEgPSB5MWN5Y2xlIC0gbGluay53aWR0aCAvIDI7XG4gICAgICAgICAgeTFjeWNsZSA9IHkxY3ljbGUgLSBsaW5rLndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpbmsueTEgPSB5MSArIGxpbmsud2lkdGggLyAyO1xuICAgICAgICAgIHkxICs9IGxpbmsud2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNhbmtleUNpcmN1bGFyO1xufVxuXG4vLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDeWNsZSBmdW5jdGlvbnNcbi8vIHBvcnRpb24gb2YgY29kZSB0byBkZXRlY3QgY2lyY3VsYXIgbGlua3MgYmFzZWQgb24gQ29saW4gRmVyZ3VzJyBibC5vY2sgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2Zlcmd1cy8zOTU2MDQzXG5cbi8vIElkZW50aWZ5IGNpcmNsZXMgaW4gdGhlIGxpbmsgb2JqZWN0c1xuZnVuY3Rpb24gaWRlbnRpZnlDaXJjbGVzKGdyYXBoLCBpZCwgc29ydE5vZGVzKSB7XG4gIHZhciBjaXJjdWxhckxpbmtJRCA9IDA7XG4gIGlmIChzb3J0Tm9kZXMgPT09IG51bGwpIHtcblxuICAgIC8vIEJ1aWxkaW5nIGFkamFjZW5jeSBncmFwaFxuICAgIHZhciBhZGpMaXN0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaC5saW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpbmsgPSBncmFwaC5saW5rc1tpXTtcbiAgICAgIHZhciBzb3VyY2UgPSBsaW5rLnNvdXJjZS5pbmRleDtcbiAgICAgIHZhciB0YXJnZXQgPSBsaW5rLnRhcmdldC5pbmRleDtcbiAgICAgIGlmICghYWRqTGlzdFtzb3VyY2VdKSBhZGpMaXN0W3NvdXJjZV0gPSBbXTtcbiAgICAgIGlmICghYWRqTGlzdFt0YXJnZXRdKSBhZGpMaXN0W3RhcmdldF0gPSBbXTtcblxuICAgICAgLy8gQWRkIGxpbmtzIGlmIG5vdCBhbHJlYWR5IGluIHNldFxuICAgICAgaWYgKGFkakxpc3Rbc291cmNlXS5pbmRleE9mKHRhcmdldCkgPT09IC0xKSBhZGpMaXN0W3NvdXJjZV0ucHVzaCh0YXJnZXQpO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYWxsIGVsZW1lbnRhcnkgY2lyY3VpdHNcbiAgICB2YXIgY3ljbGVzID0gZmluZENpcmN1aXRzKGFkakxpc3QpO1xuXG4gICAgLy8gU29ydCBieSBjaXJjdWl0cyBsZW5ndGhcbiAgICBjeWNsZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICB2YXIgY2lyY3VsYXJMaW5rcyA9IHt9O1xuICAgIGZvciAoaSA9IDA7IGkgPCBjeWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjeWNsZSA9IGN5Y2xlc1tpXTtcbiAgICAgIHZhciBsYXN0ID0gY3ljbGUuc2xpY2UoLTIpO1xuICAgICAgaWYgKCFjaXJjdWxhckxpbmtzW2xhc3RbMF1dKSBjaXJjdWxhckxpbmtzW2xhc3RbMF1dID0ge307XG4gICAgICBjaXJjdWxhckxpbmtzW2xhc3RbMF1dW2xhc3RbMV1dID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBncmFwaC5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gbGluay50YXJnZXQuaW5kZXg7XG4gICAgICB2YXIgc291cmNlID0gbGluay5zb3VyY2UuaW5kZXg7XG4gICAgICAvLyBJZiBzZWxmLWxpbmtpbmcgb3IgYSBiYWNrLWVkZ2VcbiAgICAgIGlmICh0YXJnZXQgPT09IHNvdXJjZSB8fCBjaXJjdWxhckxpbmtzW3NvdXJjZV0gJiYgY2lyY3VsYXJMaW5rc1tzb3VyY2VdW3RhcmdldF0pIHtcbiAgICAgICAgbGluay5jaXJjdWxhciA9IHRydWU7XG4gICAgICAgIGxpbmsuY2lyY3VsYXJMaW5rSUQgPSBjaXJjdWxhckxpbmtJRDtcbiAgICAgICAgY2lyY3VsYXJMaW5rSUQgPSBjaXJjdWxhckxpbmtJRCArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLmNpcmN1bGFyID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgaWYgKGxpbmsuc291cmNlW3NvcnROb2Rlc10gPCBsaW5rLnRhcmdldFtzb3J0Tm9kZXNdKSB7XG4gICAgICAgIGxpbmsuY2lyY3VsYXIgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsuY2lyY3VsYXIgPSB0cnVlO1xuICAgICAgICBsaW5rLmNpcmN1bGFyTGlua0lEID0gY2lyY3VsYXJMaW5rSUQ7XG4gICAgICAgIGNpcmN1bGFyTGlua0lEID0gY2lyY3VsYXJMaW5rSUQgKyAxO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8vIEFzc2lnbiBhIGNpcmN1bGFyIGxpbmsgdHlwZSAodG9wIG9yIGJvdHRvbSksIGJhc2VkIG9uOlxuLy8gLSBpZiB0aGUgc291cmNlL3RhcmdldCBub2RlIGFscmVhZHkgaGFzIGNpcmN1bGFyIGxpbmtzLCB0aGVuIHVzZSB0aGUgc2FtZSB0eXBlXG4vLyAtIGlmIG5vdCwgY2hvb3NlIHRoZSB0eXBlIHdpdGggZmV3ZXIgbGlua3NcbmZ1bmN0aW9uIHNlbGVjdENpcmN1bGFyTGlua1R5cGVzKGdyYXBoLCBpZCkge1xuICB2YXIgbnVtYmVyT2ZUb3BzID0gMDtcbiAgdmFyIG51bWJlck9mQm90dG9tcyA9IDA7XG4gIGdyYXBoLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICBpZiAobGluay5jaXJjdWxhcikge1xuICAgICAgLy8gaWYgZWl0aGVyIHNvdWNlIG9yIHRhcmdldCBoYXMgdHlwZSBhbHJlYWR5IHVzZSB0aGF0XG4gICAgICBpZiAobGluay5zb3VyY2UuY2lyY3VsYXJMaW5rVHlwZSB8fCBsaW5rLnRhcmdldC5jaXJjdWxhckxpbmtUeXBlKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgdG8gc291cmNlIHR5cGUgaWYgYXZhaWxhYmxlXG4gICAgICAgIGxpbmsuY2lyY3VsYXJMaW5rVHlwZSA9IGxpbmsuc291cmNlLmNpcmN1bGFyTGlua1R5cGUgPyBsaW5rLnNvdXJjZS5jaXJjdWxhckxpbmtUeXBlIDogbGluay50YXJnZXQuY2lyY3VsYXJMaW5rVHlwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsuY2lyY3VsYXJMaW5rVHlwZSA9IG51bWJlck9mVG9wcyA8IG51bWJlck9mQm90dG9tcyA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcpIHtcbiAgICAgICAgbnVtYmVyT2ZUb3BzID0gbnVtYmVyT2ZUb3BzICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG51bWJlck9mQm90dG9tcyA9IG51bWJlck9mQm90dG9tcyArIDE7XG4gICAgICB9XG5cbiAgICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKGdldE5vZGVJRChub2RlLCBpZCkgPT0gZ2V0Tm9kZUlEKGxpbmsuc291cmNlLCBpZCkgfHwgZ2V0Tm9kZUlEKG5vZGUsIGlkKSA9PSBnZXROb2RlSUQobGluay50YXJnZXQsIGlkKSkge1xuICAgICAgICAgIG5vZGUuY2lyY3VsYXJMaW5rVHlwZSA9IGxpbmsuY2lyY3VsYXJMaW5rVHlwZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICAvL2NvcnJlY3Qgc2VsZi1saW5raW5nIGxpbmtzIHRvIGJlIHNhbWUgZGlyZWN0aW9uIGFzIG5vZGVcbiAgZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgIGlmIChsaW5rLmNpcmN1bGFyKSB7XG4gICAgICAvL2lmIGJvdGggc291cmNlIGFuZCB0YXJnZXQgbm9kZSBhcmUgc2FtZSB0eXBlLCB0aGVuIGxpbmsgc2hvdWxkIGhhdmUgc2FtZSB0eXBlXG4gICAgICBpZiAobGluay5zb3VyY2UuY2lyY3VsYXJMaW5rVHlwZSA9PSBsaW5rLnRhcmdldC5jaXJjdWxhckxpbmtUeXBlKSB7XG4gICAgICAgIGxpbmsuY2lyY3VsYXJMaW5rVHlwZSA9IGxpbmsuc291cmNlLmNpcmN1bGFyTGlua1R5cGU7XG4gICAgICB9XG4gICAgICAvL2lmIGxpbmsgaXMgc2VsZmxpbmtpbmcsIHRoZW4gbGluayBzaG91bGQgaGF2ZSBzYW1lIHR5cGUgYXMgbm9kZVxuICAgICAgaWYgKHNlbGZMaW5raW5nKGxpbmssIGlkKSkge1xuICAgICAgICBsaW5rLmNpcmN1bGFyTGlua1R5cGUgPSBsaW5rLnNvdXJjZS5jaXJjdWxhckxpbmtUeXBlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vIFJldHVybiB0aGUgYW5nbGUgYmV0d2VlbiBhIHN0cmFpZ2h0IGxpbmUgYmV0d2VlbiB0aGUgc291cmNlIGFuZCB0YXJnZXQgb2YgdGhlIGxpbmssIGFuZCB0aGUgdmVydGljYWwgcGxhbmUgb2YgdGhlIG5vZGVcbmZ1bmN0aW9uIGxpbmtBbmdsZShsaW5rKSB7XG4gIHZhciBhZGphY2VudCA9IE1hdGguYWJzKGxpbmsueTEgLSBsaW5rLnkwKTtcbiAgdmFyIG9wcG9zaXRlID0gTWF0aC5hYnMobGluay50YXJnZXQueDAgLSBsaW5rLnNvdXJjZS54MSk7XG5cbiAgcmV0dXJuIE1hdGguYXRhbihvcHBvc2l0ZSAvIGFkamFjZW50KTtcbn1cblxuLy8gQ2hlY2sgaWYgdHdvIGNpcmN1bGFyIGxpbmtzIHBvdGVudGlhbGx5IG92ZXJsYXBcbmZ1bmN0aW9uIGNpcmN1bGFyTGlua3NDcm9zcyhsaW5rMSwgbGluazIpIHtcbiAgaWYgKGxpbmsxLnNvdXJjZS5jb2x1bW4gPCBsaW5rMi50YXJnZXQuY29sdW1uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKGxpbmsxLnRhcmdldC5jb2x1bW4gPiBsaW5rMi5zb3VyY2UuY29sdW1uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGNpcmN1bGFyIGxpbmtzIGZvciBub2RlLCBub3QgaW5jbHVkaW5nIHNlbGYgbGlua2luZyBsaW5rc1xuZnVuY3Rpb24gbnVtYmVyT2ZOb25TZWxmTGlua2luZ0N5Y2xlcyhub2RlLCBpZCkge1xuICB2YXIgc291cmNlQ291bnQgPSAwO1xuICBub2RlLnNvdXJjZUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICBzb3VyY2VDb3VudCA9IGwuY2lyY3VsYXIgJiYgIXNlbGZMaW5raW5nKGwsIGlkKSA/IHNvdXJjZUNvdW50ICsgMSA6IHNvdXJjZUNvdW50O1xuICB9KTtcblxuICB2YXIgdGFyZ2V0Q291bnQgPSAwO1xuICBub2RlLnRhcmdldExpbmtzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICB0YXJnZXRDb3VudCA9IGwuY2lyY3VsYXIgJiYgIXNlbGZMaW5raW5nKGwsIGlkKSA/IHRhcmdldENvdW50ICsgMSA6IHRhcmdldENvdW50O1xuICB9KTtcblxuICByZXR1cm4gc291cmNlQ291bnQgKyB0YXJnZXRDb3VudDtcbn1cblxuLy8gQ2hlY2sgaWYgYSBjaXJjdWxhciBsaW5rIGlzIHRoZSBvbmx5IGNpcmN1bGFyIGxpbmsgZm9yIGJvdGggaXRzIHNvdXJjZSBhbmQgdGFyZ2V0IG5vZGVcbmZ1bmN0aW9uIG9ubHlDaXJjdWxhckxpbmsobGluaykge1xuICB2YXIgbm9kZVNvdXJjZUxpbmtzID0gbGluay5zb3VyY2Uuc291cmNlTGlua3M7XG4gIHZhciBzb3VyY2VDb3VudCA9IDA7XG4gIG5vZGVTb3VyY2VMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgc291cmNlQ291bnQgPSBsLmNpcmN1bGFyID8gc291cmNlQ291bnQgKyAxIDogc291cmNlQ291bnQ7XG4gIH0pO1xuXG4gIHZhciBub2RlVGFyZ2V0TGlua3MgPSBsaW5rLnRhcmdldC50YXJnZXRMaW5rcztcbiAgdmFyIHRhcmdldENvdW50ID0gMDtcbiAgbm9kZVRhcmdldExpbmtzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICB0YXJnZXRDb3VudCA9IGwuY2lyY3VsYXIgPyB0YXJnZXRDb3VudCArIDEgOiB0YXJnZXRDb3VudDtcbiAgfSk7XG5cbiAgaWYgKHNvdXJjZUNvdW50ID4gMSB8fCB0YXJnZXRDb3VudCA+IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLy8gY3JlYXRlcyB2ZXJ0aWNhbCBidWZmZXIgdmFsdWVzIHBlciBzZXQgb2YgdG9wL2JvdHRvbSBsaW5rc1xuZnVuY3Rpb24gY2FsY1ZlcnRpY2FsQnVmZmVyKGxpbmtzLCBjaXJjdWxhckxpbmtHYXAsIGlkKSB7XG4gIGxpbmtzLnNvcnQoc29ydExpbmtDb2x1bW5Bc2NlbmRpbmcpO1xuICBsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rLCBpKSB7XG4gICAgdmFyIGJ1ZmZlciA9IDA7XG5cbiAgICBpZiAoc2VsZkxpbmtpbmcobGluaywgaWQpICYmIG9ubHlDaXJjdWxhckxpbmsobGluaykpIHtcbiAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEJ1ZmZlciA9IGJ1ZmZlciArIGxpbmsud2lkdGggLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaiA9IDA7XG4gICAgICBmb3IgKGo7IGogPCBpOyBqKyspIHtcbiAgICAgICAgaWYgKGNpcmN1bGFyTGlua3NDcm9zcyhsaW5rc1tpXSwgbGlua3Nbal0pKSB7XG4gICAgICAgICAgdmFyIGJ1ZmZlck92ZXJUaGlzTGluayA9IGxpbmtzW2pdLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxCdWZmZXIgKyBsaW5rc1tqXS53aWR0aCAvIDIgKyBjaXJjdWxhckxpbmtHYXA7XG4gICAgICAgICAgYnVmZmVyID0gYnVmZmVyT3ZlclRoaXNMaW5rID4gYnVmZmVyID8gYnVmZmVyT3ZlclRoaXNMaW5rIDogYnVmZmVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEJ1ZmZlciA9IGJ1ZmZlciArIGxpbmsud2lkdGggLyAyO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGxpbmtzO1xufVxuXG4vLyBjYWxjdWxhdGUgdGhlIG9wdGltdW0gcGF0aCBmb3IgYSBsaW5rIHRvIHJlZHVjZSBvdmVybGFwc1xuZnVuY3Rpb24gYWRkQ2lyY3VsYXJQYXRoRGF0YShncmFwaCwgY2lyY3VsYXJMaW5rR2FwLCB5MSwgaWQpIHtcbiAgLy92YXIgYmFzZVJhZGl1cyA9IDEwXG4gIHZhciBidWZmZXIgPSA1O1xuICAvL3ZhciB2ZXJ0aWNhbE1hcmdpbiA9IDI1XG5cbiAgdmFyIG1pblkgPSBtaW4oZ3JhcGgubGlua3MsIGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgcmV0dXJuIGxpbmsuc291cmNlLnkwO1xuICB9KTtcblxuICAvLyBjcmVhdGUgb2JqZWN0IGZvciBjaXJjdWxhciBQYXRoIERhdGFcbiAgZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgIGlmIChsaW5rLmNpcmN1bGFyKSB7XG4gICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEgPSB7fTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGNhbGMgdmVydGljYWwgb2Zmc2V0cyBwZXIgdG9wL2JvdHRvbSBsaW5rc1xuICB2YXIgdG9wTGlua3MgPSBncmFwaC5saW5rcy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcbiAgICByZXR1cm4gbC5jaXJjdWxhckxpbmtUeXBlID09ICd0b3AnO1xuICB9KTtcbiAgLyogdG9wTGlua3MgPSAqL2NhbGNWZXJ0aWNhbEJ1ZmZlcih0b3BMaW5rcywgY2lyY3VsYXJMaW5rR2FwLCBpZCk7XG5cbiAgdmFyIGJvdHRvbUxpbmtzID0gZ3JhcGgubGlua3MuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgcmV0dXJuIGwuY2lyY3VsYXJMaW5rVHlwZSA9PSAnYm90dG9tJztcbiAgfSk7XG4gIC8qIGJvdHRvbUxpbmtzID0gKi9jYWxjVmVydGljYWxCdWZmZXIoYm90dG9tTGlua3MsIGNpcmN1bGFyTGlua0dhcCwgaWQpO1xuXG4gIC8vIGFkZCB0aGUgYmFzZSBkYXRhIGZvciBlYWNoIGxpbmtcbiAgZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgIGlmIChsaW5rLmNpcmN1bGFyKSB7XG4gICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEuYXJjUmFkaXVzID0gbGluay53aWR0aCArIGJhc2VSYWRpdXM7XG4gICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdE5vZGVCdWZmZXIgPSBidWZmZXI7XG4gICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHROb2RlQnVmZmVyID0gYnVmZmVyO1xuICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnNvdXJjZVdpZHRoID0gbGluay5zb3VyY2UueDEgLSBsaW5rLnNvdXJjZS54MDtcbiAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5zb3VyY2VYID0gbGluay5zb3VyY2UueDAgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEuc291cmNlV2lkdGg7XG4gICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEudGFyZ2V0WCA9IGxpbmsudGFyZ2V0LngwO1xuICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnNvdXJjZVkgPSBsaW5rLnkwO1xuICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnRhcmdldFkgPSBsaW5rLnkxO1xuXG4gICAgICAvLyBmb3Igc2VsZiBsaW5raW5nIHBhdGhzLCBhbmQgdGhhdCB0aGUgb25seSBjaXJjdWxhciBsaW5rIGluL291dCBvZiB0aGF0IG5vZGVcbiAgICAgIGlmIChzZWxmTGlua2luZyhsaW5rLCBpZCkgJiYgb25seUNpcmN1bGFyTGluayhsaW5rKSkge1xuICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdFNtYWxsQXJjUmFkaXVzID0gYmFzZVJhZGl1cyArIGxpbmsud2lkdGggLyAyO1xuICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdExhcmdlQXJjUmFkaXVzID0gYmFzZVJhZGl1cyArIGxpbmsud2lkdGggLyAyO1xuICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRTbWFsbEFyY1JhZGl1cyA9IGJhc2VSYWRpdXMgKyBsaW5rLndpZHRoIC8gMjtcbiAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0TGFyZ2VBcmNSYWRpdXMgPSBiYXNlUmFkaXVzICsgbGluay53aWR0aCAvIDI7XG5cbiAgICAgICAgaWYgKGxpbmsuY2lyY3VsYXJMaW5rVHlwZSA9PSAnYm90dG9tJykge1xuICAgICAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEZ1bGxFeHRlbnQgPSBsaW5rLnNvdXJjZS55MSArIHZlcnRpY2FsTWFyZ2luICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsQnVmZmVyO1xuICAgICAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbExlZnRJbm5lckV4dGVudCA9IGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEZ1bGxFeHRlbnQgLSBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdExhcmdlQXJjUmFkaXVzO1xuICAgICAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbFJpZ2h0SW5uZXJFeHRlbnQgPSBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxGdWxsRXh0ZW50IC0gbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0TGFyZ2VBcmNSYWRpdXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdG9wIGxpbmtzXG4gICAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudCA9IGxpbmsuc291cmNlLnkwIC0gdmVydGljYWxNYXJnaW4gLSBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxCdWZmZXI7XG4gICAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsTGVmdElubmVyRXh0ZW50ID0gbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudCArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0TGFyZ2VBcmNSYWRpdXM7XG4gICAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsUmlnaHRJbm5lckV4dGVudCA9IGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEZ1bGxFeHRlbnQgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRMYXJnZUFyY1JhZGl1cztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBjYWxjdWxhdGUgbm9ybWFsbHlcbiAgICAgICAgLy8gYWRkIGxlZnQgZXh0ZW50IGNvb3JkaW5hdGVzLCBiYXNlZCBvbiBsaW5rcyB3aXRoIHNhbWUgc291cmNlIGNvbHVtbiBhbmQgY2lyY3VsYXJMaW5rIHR5cGVcbiAgICAgICAgdmFyIHRoaXNDb2x1bW4gPSBsaW5rLnNvdXJjZS5jb2x1bW47XG4gICAgICAgIHZhciB0aGlzQ2lyY3VsYXJMaW5rVHlwZSA9IGxpbmsuY2lyY3VsYXJMaW5rVHlwZTtcbiAgICAgICAgdmFyIHNhbWVDb2x1bW5MaW5rcyA9IGdyYXBoLmxpbmtzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgICAgIHJldHVybiBsLnNvdXJjZS5jb2x1bW4gPT0gdGhpc0NvbHVtbiAmJiBsLmNpcmN1bGFyTGlua1R5cGUgPT0gdGhpc0NpcmN1bGFyTGlua1R5cGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBzYW1lQ29sdW1uTGlua3Muc29ydChzb3J0TGlua1NvdXJjZVlEZXNjZW5kaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzYW1lQ29sdW1uTGlua3Muc29ydChzb3J0TGlua1NvdXJjZVlBc2NlbmRpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJhZGl1c09mZnNldCA9IDA7XG4gICAgICAgIHNhbWVDb2x1bW5MaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsLCBpKSB7XG4gICAgICAgICAgaWYgKGwuY2lyY3VsYXJMaW5rSUQgPT0gbGluay5jaXJjdWxhckxpbmtJRCkge1xuICAgICAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRTbWFsbEFyY1JhZGl1cyA9IGJhc2VSYWRpdXMgKyBsaW5rLndpZHRoIC8gMiArIHJhZGl1c09mZnNldDtcbiAgICAgICAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0TGFyZ2VBcmNSYWRpdXMgPSBiYXNlUmFkaXVzICsgbGluay53aWR0aCAvIDIgKyBpICogY2lyY3VsYXJMaW5rR2FwICsgcmFkaXVzT2Zmc2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByYWRpdXNPZmZzZXQgPSByYWRpdXNPZmZzZXQgKyBsLndpZHRoO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhZGQgcmlnaHQgZXh0ZW50IGNvb3JkaW5hdGVzLCBiYXNlZCBvbiBsaW5rcyB3aXRoIHNhbWUgdGFyZ2V0IGNvbHVtbiBhbmQgY2lyY3VsYXJMaW5rIHR5cGVcbiAgICAgICAgdGhpc0NvbHVtbiA9IGxpbmsudGFyZ2V0LmNvbHVtbjtcbiAgICAgICAgc2FtZUNvbHVtbkxpbmtzID0gZ3JhcGgubGlua3MuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgcmV0dXJuIGwudGFyZ2V0LmNvbHVtbiA9PSB0aGlzQ29sdW1uICYmIGwuY2lyY3VsYXJMaW5rVHlwZSA9PSB0aGlzQ2lyY3VsYXJMaW5rVHlwZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBzYW1lQ29sdW1uTGlua3Muc29ydChzb3J0TGlua1RhcmdldFlEZXNjZW5kaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzYW1lQ29sdW1uTGlua3Muc29ydChzb3J0TGlua1RhcmdldFlBc2NlbmRpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmFkaXVzT2Zmc2V0ID0gMDtcbiAgICAgICAgc2FtZUNvbHVtbkxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGwsIGkpIHtcbiAgICAgICAgICBpZiAobC5jaXJjdWxhckxpbmtJRCA9PSBsaW5rLmNpcmN1bGFyTGlua0lEKSB7XG4gICAgICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRTbWFsbEFyY1JhZGl1cyA9IGJhc2VSYWRpdXMgKyBsaW5rLndpZHRoIC8gMiArIHJhZGl1c09mZnNldDtcbiAgICAgICAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodExhcmdlQXJjUmFkaXVzID0gYmFzZVJhZGl1cyArIGxpbmsud2lkdGggLyAyICsgaSAqIGNpcmN1bGFyTGlua0dhcCArIHJhZGl1c09mZnNldDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmFkaXVzT2Zmc2V0ID0gcmFkaXVzT2Zmc2V0ICsgbC53aWR0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYm90dG9tIGxpbmtzXG4gICAgICAgIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxGdWxsRXh0ZW50ID0gTWF0aC5tYXgoeTEsIGxpbmsuc291cmNlLnkxLCBsaW5rLnRhcmdldC55MSkgKyB2ZXJ0aWNhbE1hcmdpbiArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEJ1ZmZlcjtcbiAgICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxMZWZ0SW5uZXJFeHRlbnQgPSBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxGdWxsRXh0ZW50IC0gbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRMYXJnZUFyY1JhZGl1cztcbiAgICAgICAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxSaWdodElubmVyRXh0ZW50ID0gbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudCAtIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodExhcmdlQXJjUmFkaXVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRvcCBsaW5rc1xuICAgICAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEZ1bGxFeHRlbnQgPSBtaW5ZIC0gdmVydGljYWxNYXJnaW4gLSBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxCdWZmZXI7XG4gICAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsTGVmdElubmVyRXh0ZW50ID0gbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudCArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0TGFyZ2VBcmNSYWRpdXM7XG4gICAgICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsUmlnaHRJbm5lckV4dGVudCA9IGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEZ1bGxFeHRlbnQgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRMYXJnZUFyY1JhZGl1cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhbGwgbGlua3NcbiAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0SW5uZXJFeHRlbnQgPSBsaW5rLmNpcmN1bGFyUGF0aERhdGEuc291cmNlWCArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0Tm9kZUJ1ZmZlcjtcbiAgICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodElubmVyRXh0ZW50ID0gbGluay5jaXJjdWxhclBhdGhEYXRhLnRhcmdldFggLSBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHROb2RlQnVmZmVyO1xuICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRGdWxsRXh0ZW50ID0gbGluay5jaXJjdWxhclBhdGhEYXRhLnNvdXJjZVggKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdExhcmdlQXJjUmFkaXVzICsgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnROb2RlQnVmZmVyO1xuICAgICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0RnVsbEV4dGVudCA9IGxpbmsuY2lyY3VsYXJQYXRoRGF0YS50YXJnZXRYIC0gbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0TGFyZ2VBcmNSYWRpdXMgLSBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHROb2RlQnVmZmVyO1xuICAgIH1cblxuICAgIGlmIChsaW5rLmNpcmN1bGFyKSB7XG4gICAgICBsaW5rLnBhdGggPSBjcmVhdGVDaXJjdWxhclBhdGhTdHJpbmcobGluayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBub3JtYWxQYXRoID0gbGlua0hvcml6b250YWwoKS5zb3VyY2UoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIHggPSBkLnNvdXJjZS54MCArIChkLnNvdXJjZS54MSAtIGQuc291cmNlLngwKTtcbiAgICAgICAgdmFyIHkgPSBkLnkwO1xuICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgICAgfSkudGFyZ2V0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciB4ID0gZC50YXJnZXQueDA7XG4gICAgICAgIHZhciB5ID0gZC55MTtcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgIH0pO1xuICAgICAgbGluay5wYXRoID0gbm9ybWFsUGF0aChsaW5rKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBjcmVhdGUgYSBkIHBhdGggdXNpbmcgdGhlIGFkZENpcmN1bGFyUGF0aERhdGFcbmZ1bmN0aW9uIGNyZWF0ZUNpcmN1bGFyUGF0aFN0cmluZyhsaW5rKSB7XG4gIHZhciBwYXRoU3RyaW5nID0gJyc7XG4gIC8vICdwYXRoRGF0YScgaXMgYXNzaWduZWQgYSB2YWx1ZSBidXQgbmV2ZXIgdXNlZFxuICAvLyB2YXIgcGF0aERhdGEgPSB7fVxuXG4gIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcpIHtcbiAgICBwYXRoU3RyaW5nID1cbiAgICAvLyBzdGFydCBhdCB0aGUgcmlnaHQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAgJ00nICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnNvdXJjZVggKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEuc291cmNlWSArICcgJyArXG4gICAgLy8gbGluZSByaWdodCB0byBidWZmZXIgcG9pbnRcbiAgICAnTCcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdElubmVyRXh0ZW50ICsgJyAnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnNvdXJjZVkgKyAnICcgK1xuICAgIC8vIEFyYyBhcm91bmQ6IENlbnRyZSBvZiBhcmMgWCBhbmQgIC8vQ2VudHJlIG9mIGFyYyBZXG4gICAgJ0EnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRMYXJnZUFyY1JhZGl1cyArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0U21hbGxBcmNSYWRpdXMgKyAnIDAgMCAwICcgK1xuICAgIC8vIEVuZCBvZiBhcmMgWCAvL0VuZCBvZiBhcmMgWVxuICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0RnVsbEV4dGVudCArICcgJyArIChsaW5rLmNpcmN1bGFyUGF0aERhdGEuc291cmNlWSAtIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0U21hbGxBcmNSYWRpdXMpICsgJyAnICsgLy8gRW5kIG9mIGFyYyBYXG4gICAgLy8gbGluZSB1cCB0byBidWZmZXIgcG9pbnRcbiAgICAnTCcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdEZ1bGxFeHRlbnQgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxMZWZ0SW5uZXJFeHRlbnQgKyAnICcgK1xuICAgIC8vIEFyYyBhcm91bmQ6IENlbnRyZSBvZiBhcmMgWCBhbmQgIC8vQ2VudHJlIG9mIGFyYyBZXG4gICAgJ0EnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRMYXJnZUFyY1JhZGl1cyArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0TGFyZ2VBcmNSYWRpdXMgKyAnIDAgMCAwICcgK1xuICAgIC8vIEVuZCBvZiBhcmMgWCAvL0VuZCBvZiBhcmMgWVxuICAgIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEudmVydGljYWxGdWxsRXh0ZW50ICsgJyAnICsgLy8gRW5kIG9mIGFyYyBYXG4gICAgLy8gbGluZSBsZWZ0IHRvIGJ1ZmZlciBwb2ludFxuICAgICdMJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodElubmVyRXh0ZW50ICsgJyAnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudCArICcgJyArXG4gICAgLy8gQXJjIGFyb3VuZDogQ2VudHJlIG9mIGFyYyBYIGFuZCAgLy9DZW50cmUgb2YgYXJjIFlcbiAgICAnQScgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRMYXJnZUFyY1JhZGl1cyArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodExhcmdlQXJjUmFkaXVzICsgJyAwIDAgMCAnICtcbiAgICAvLyBFbmQgb2YgYXJjIFggLy9FbmQgb2YgYXJjIFlcbiAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRGdWxsRXh0ZW50ICsgJyAnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsUmlnaHRJbm5lckV4dGVudCArICcgJyArIC8vIEVuZCBvZiBhcmMgWFxuICAgIC8vIGxpbmUgZG93blxuICAgICdMJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodEZ1bGxFeHRlbnQgKyAnICcgKyAobGluay5jaXJjdWxhclBhdGhEYXRhLnRhcmdldFkgLSBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRTbWFsbEFyY1JhZGl1cykgKyAnICcgK1xuICAgIC8vIEFyYyBhcm91bmQ6IENlbnRyZSBvZiBhcmMgWCBhbmQgIC8vQ2VudHJlIG9mIGFyYyBZXG4gICAgJ0EnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0TGFyZ2VBcmNSYWRpdXMgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRTbWFsbEFyY1JhZGl1cyArICcgMCAwIDAgJyArXG4gICAgLy8gRW5kIG9mIGFyYyBYIC8vRW5kIG9mIGFyYyBZXG4gICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0SW5uZXJFeHRlbnQgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEudGFyZ2V0WSArICcgJyArIC8vIEVuZCBvZiBhcmMgWFxuICAgIC8vIGxpbmUgdG8gZW5kXG4gICAgJ0wnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnRhcmdldFggKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEudGFyZ2V0WTtcbiAgfSBlbHNlIHtcbiAgICAvLyBib3R0b20gcGF0aFxuICAgIHBhdGhTdHJpbmcgPVxuICAgIC8vIHN0YXJ0IGF0IHRoZSByaWdodCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICAnTScgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEuc291cmNlWCArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5zb3VyY2VZICsgJyAnICtcbiAgICAvLyBsaW5lIHJpZ2h0IHRvIGJ1ZmZlciBwb2ludFxuICAgICdMJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEuc291cmNlWSArICcgJyArXG4gICAgLy8gQXJjIGFyb3VuZDogQ2VudHJlIG9mIGFyYyBYIGFuZCAgLy9DZW50cmUgb2YgYXJjIFlcbiAgICAnQScgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdExhcmdlQXJjUmFkaXVzICsgJyAnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRTbWFsbEFyY1JhZGl1cyArICcgMCAwIDEgJyArXG4gICAgLy8gRW5kIG9mIGFyYyBYIC8vRW5kIG9mIGFyYyBZXG4gICAgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRGdWxsRXh0ZW50ICsgJyAnICsgKGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5zb3VyY2VZICsgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRTbWFsbEFyY1JhZGl1cykgKyAnICcgKyAvLyBFbmQgb2YgYXJjIFhcbiAgICAvLyBsaW5lIGRvd24gdG8gYnVmZmVyIHBvaW50XG4gICAgJ0wnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRGdWxsRXh0ZW50ICsgJyAnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsTGVmdElubmVyRXh0ZW50ICsgJyAnICtcbiAgICAvLyBBcmMgYXJvdW5kOiBDZW50cmUgb2YgYXJjIFggYW5kICAvL0NlbnRyZSBvZiBhcmMgWVxuICAgICdBJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5sZWZ0TGFyZ2VBcmNSYWRpdXMgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdExhcmdlQXJjUmFkaXVzICsgJyAwIDAgMSAnICtcbiAgICAvLyBFbmQgb2YgYXJjIFggLy9FbmQgb2YgYXJjIFlcbiAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEubGVmdElubmVyRXh0ZW50ICsgJyAnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudCArICcgJyArIC8vIEVuZCBvZiBhcmMgWFxuICAgIC8vIGxpbmUgbGVmdCB0byBidWZmZXIgcG9pbnRcbiAgICAnTCcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRJbm5lckV4dGVudCArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbEZ1bGxFeHRlbnQgKyAnICcgK1xuICAgIC8vIEFyYyBhcm91bmQ6IENlbnRyZSBvZiBhcmMgWCBhbmQgIC8vQ2VudHJlIG9mIGFyYyBZXG4gICAgJ0EnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0TGFyZ2VBcmNSYWRpdXMgKyAnICcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRMYXJnZUFyY1JhZGl1cyArICcgMCAwIDEgJyArXG4gICAgLy8gRW5kIG9mIGFyYyBYIC8vRW5kIG9mIGFyYyBZXG4gICAgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0RnVsbEV4dGVudCArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS52ZXJ0aWNhbFJpZ2h0SW5uZXJFeHRlbnQgKyAnICcgKyAvLyBFbmQgb2YgYXJjIFhcbiAgICAvLyBsaW5lIHVwXG4gICAgJ0wnICsgbGluay5jaXJjdWxhclBhdGhEYXRhLnJpZ2h0RnVsbEV4dGVudCArICcgJyArIChsaW5rLmNpcmN1bGFyUGF0aERhdGEudGFyZ2V0WSArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodFNtYWxsQXJjUmFkaXVzKSArICcgJyArXG4gICAgLy8gQXJjIGFyb3VuZDogQ2VudHJlIG9mIGFyYyBYIGFuZCAgLy9DZW50cmUgb2YgYXJjIFlcbiAgICAnQScgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRMYXJnZUFyY1JhZGl1cyArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodFNtYWxsQXJjUmFkaXVzICsgJyAwIDAgMSAnICtcbiAgICAvLyBFbmQgb2YgYXJjIFggLy9FbmQgb2YgYXJjIFlcbiAgICBsaW5rLmNpcmN1bGFyUGF0aERhdGEucmlnaHRJbm5lckV4dGVudCArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS50YXJnZXRZICsgJyAnICsgLy8gRW5kIG9mIGFyYyBYXG4gICAgLy8gbGluZSB0byBlbmRcbiAgICAnTCcgKyBsaW5rLmNpcmN1bGFyUGF0aERhdGEudGFyZ2V0WCArICcgJyArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS50YXJnZXRZO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhTdHJpbmc7XG59XG5cbi8vIHNvcnQgbGlua3MgYmFzZWQgb24gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHNvdXJjZSBhbmQgdGFydGdldCBub2RlIGNvbHVtbnNcbi8vIGlmIHRoZSBzYW1lLCB0aGVuIHVzZSBZIHBvc2l0aW9uIG9mIHRoZSBzb3VyY2Ugbm9kZVxuZnVuY3Rpb24gc29ydExpbmtDb2x1bW5Bc2NlbmRpbmcobGluazEsIGxpbmsyKSB7XG4gIGlmIChsaW5rQ29sdW1uRGlzdGFuY2UobGluazEpID09IGxpbmtDb2x1bW5EaXN0YW5jZShsaW5rMikpIHtcbiAgICByZXR1cm4gbGluazEuY2lyY3VsYXJMaW5rVHlwZSA9PSAnYm90dG9tJyA/IHNvcnRMaW5rU291cmNlWURlc2NlbmRpbmcobGluazEsIGxpbmsyKSA6IHNvcnRMaW5rU291cmNlWUFzY2VuZGluZyhsaW5rMSwgbGluazIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaW5rQ29sdW1uRGlzdGFuY2UobGluazIpIC0gbGlua0NvbHVtbkRpc3RhbmNlKGxpbmsxKTtcbiAgfVxufVxuXG4vLyBzb3J0IGFzY2VuZGluZyBsaW5rcyBieSB0aGVpciBzb3VyY2UgdmVydGljYWwgcG9zaXRpb24sIHkwXG5mdW5jdGlvbiBzb3J0TGlua1NvdXJjZVlBc2NlbmRpbmcobGluazEsIGxpbmsyKSB7XG4gIHJldHVybiBsaW5rMS55MCAtIGxpbmsyLnkwO1xufVxuXG4vLyBzb3J0IGRlc2NlbmRpbmcgbGlua3MgYnkgdGhlaXIgc291cmNlIHZlcnRpY2FsIHBvc2l0aW9uLCB5MFxuZnVuY3Rpb24gc29ydExpbmtTb3VyY2VZRGVzY2VuZGluZyhsaW5rMSwgbGluazIpIHtcbiAgcmV0dXJuIGxpbmsyLnkwIC0gbGluazEueTA7XG59XG5cbi8vIHNvcnQgYXNjZW5kaW5nIGxpbmtzIGJ5IHRoZWlyIHRhcmdldCB2ZXJ0aWNhbCBwb3NpdGlvbiwgeTFcbmZ1bmN0aW9uIHNvcnRMaW5rVGFyZ2V0WUFzY2VuZGluZyhsaW5rMSwgbGluazIpIHtcbiAgcmV0dXJuIGxpbmsxLnkxIC0gbGluazIueTE7XG59XG5cbi8vIHNvcnQgZGVzY2VuZGluZyBsaW5rcyBieSB0aGVpciB0YXJnZXQgdmVydGljYWwgcG9zaXRpb24sIHkxXG5mdW5jdGlvbiBzb3J0TGlua1RhcmdldFlEZXNjZW5kaW5nKGxpbmsxLCBsaW5rMikge1xuICByZXR1cm4gbGluazIueTEgLSBsaW5rMS55MTtcbn1cblxuLy8gcmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBsaW5rJ3MgdGFyZ2V0IGFuZCBzb3VyY2Ugbm9kZSwgaW4gdGVybXMgb2YgdGhlIG5vZGVzJyBjb2x1bW5cbmZ1bmN0aW9uIGxpbmtDb2x1bW5EaXN0YW5jZShsaW5rKSB7XG4gIHJldHVybiBsaW5rLnRhcmdldC5jb2x1bW4gLSBsaW5rLnNvdXJjZS5jb2x1bW47XG59XG5cbi8vIHJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgbGluaydzIHRhcmdldCBhbmQgc291cmNlIG5vZGUsIGluIHRlcm1zIG9mIHRoZSBub2RlcycgWCBjb29yZGluYXRlXG5mdW5jdGlvbiBsaW5rWExlbmd0aChsaW5rKSB7XG4gIHJldHVybiBsaW5rLnRhcmdldC54MCAtIGxpbmsuc291cmNlLngxO1xufVxuXG4vLyBSZXR1cm4gdGhlIFkgY29vcmRpbmF0ZSBvbiB0aGUgbG9uZ2VyTGluayBwYXRoICogd2hpY2ggaXMgcGVycGVuZGljdWxhciBzaG9ydGVyTGluaydzIHNvdXJjZS5cbi8vICogYXBwcm94LCBiYXNlZCBvbiBhIHN0cmFpZ2h0IGxpbmUgZnJvbSB0YXJnZXQgdG8gc291cmNlLCB3aGVuIGluIGZhY3QgdGhlIHBhdGggaXMgYSBiZXppZXJcbmZ1bmN0aW9uIGxpbmtQZXJwZW5kaWN1bGFyWVRvTGlua1NvdXJjZShsb25nZXJMaW5rLCBzaG9ydGVyTGluaykge1xuICAvLyBnZXQgdGhlIGFuZ2xlIGZvciB0aGUgbG9uZ2VyIGxpbmtcbiAgdmFyIGFuZ2xlID0gbGlua0FuZ2xlKGxvbmdlckxpbmspO1xuXG4gIC8vIGdldCB0aGUgYWRqYWNlbnQgbGVuZ3RoIHRvIHRoZSBvdGhlciBsaW5rJ3MgeCBwb3NpdGlvblxuICB2YXIgaGVpZ2h0RnJvbVkxVG9QZXBlbmRpY3VsYXIgPSBsaW5rWExlbmd0aChzaG9ydGVyTGluaykgLyBNYXRoLnRhbihhbmdsZSk7XG5cbiAgLy8gYWRkIG9yIHN1YnRyYWN0IGZyb20gbG9uZ2VyIGxpbmsxJ3Mgb3JpZ2luYWwgeTEsIGRlcGVuZGluZyBvbiB0aGUgc2xvcGVcbiAgdmFyIHlQZXJwZW5kaWN1bGFyID0gaW5jbGluZShsb25nZXJMaW5rKSA9PSAndXAnID8gbG9uZ2VyTGluay55MSArIGhlaWdodEZyb21ZMVRvUGVwZW5kaWN1bGFyIDogbG9uZ2VyTGluay55MSAtIGhlaWdodEZyb21ZMVRvUGVwZW5kaWN1bGFyO1xuXG4gIHJldHVybiB5UGVycGVuZGljdWxhcjtcbn1cblxuLy8gUmV0dXJuIHRoZSBZIGNvb3JkaW5hdGUgb24gdGhlIGxvbmdlckxpbmsgcGF0aCAqIHdoaWNoIGlzIHBlcnBlbmRpY3VsYXIgc2hvcnRlckxpbmsncyBzb3VyY2UuXG4vLyAqIGFwcHJveCwgYmFzZWQgb24gYSBzdHJhaWdodCBsaW5lIGZyb20gdGFyZ2V0IHRvIHNvdXJjZSwgd2hlbiBpbiBmYWN0IHRoZSBwYXRoIGlzIGEgYmV6aWVyXG5mdW5jdGlvbiBsaW5rUGVycGVuZGljdWxhcllUb0xpbmtUYXJnZXQobG9uZ2VyTGluaywgc2hvcnRlckxpbmspIHtcbiAgLy8gZ2V0IHRoZSBhbmdsZSBmb3IgdGhlIGxvbmdlciBsaW5rXG4gIHZhciBhbmdsZSA9IGxpbmtBbmdsZShsb25nZXJMaW5rKTtcblxuICAvLyBnZXQgdGhlIGFkamFjZW50IGxlbmd0aCB0byB0aGUgb3RoZXIgbGluaydzIHggcG9zaXRpb25cbiAgdmFyIGhlaWdodEZyb21ZMVRvUGVwZW5kaWN1bGFyID0gbGlua1hMZW5ndGgoc2hvcnRlckxpbmspIC8gTWF0aC50YW4oYW5nbGUpO1xuXG4gIC8vIGFkZCBvciBzdWJ0cmFjdCBmcm9tIGxvbmdlciBsaW5rJ3Mgb3JpZ2luYWwgeTEsIGRlcGVuZGluZyBvbiB0aGUgc2xvcGVcbiAgdmFyIHlQZXJwZW5kaWN1bGFyID0gaW5jbGluZShsb25nZXJMaW5rKSA9PSAndXAnID8gbG9uZ2VyTGluay55MSAtIGhlaWdodEZyb21ZMVRvUGVwZW5kaWN1bGFyIDogbG9uZ2VyTGluay55MSArIGhlaWdodEZyb21ZMVRvUGVwZW5kaWN1bGFyO1xuXG4gIHJldHVybiB5UGVycGVuZGljdWxhcjtcbn1cblxuLy8gTW92ZSBhbnkgbm9kZXMgdGhhdCBvdmVybGFwIGxpbmtzIHdoaWNoIHNwYW4gMisgY29sdW1uc1xuZnVuY3Rpb24gcmVzb2x2ZU5vZGVMaW5rT3ZlcmxhcHMoZ3JhcGgsIHkwLCB5MSwgaWQpIHtcblxuICBncmFwaC5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgaWYgKGxpbmsuY2lyY3VsYXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobGluay50YXJnZXQuY29sdW1uIC0gbGluay5zb3VyY2UuY29sdW1uID4gMSkge1xuICAgICAgdmFyIGNvbHVtblRvVGVzdCA9IGxpbmsuc291cmNlLmNvbHVtbiArIDE7XG4gICAgICB2YXIgbWF4Q29sdW1uVG9UZXN0ID0gbGluay50YXJnZXQuY29sdW1uIC0gMTtcblxuICAgICAgdmFyIGkgPSAxO1xuICAgICAgdmFyIG51bWJlck9mQ29sdW1uc1RvVGVzdCA9IG1heENvbHVtblRvVGVzdCAtIGNvbHVtblRvVGVzdCArIDE7XG5cbiAgICAgIGZvciAoaSA9IDE7IGNvbHVtblRvVGVzdCA8PSBtYXhDb2x1bW5Ub1Rlc3Q7IGNvbHVtblRvVGVzdCsrLCBpKyspIHtcbiAgICAgICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLmNvbHVtbiA9PSBjb2x1bW5Ub1Rlc3QpIHtcbiAgICAgICAgICAgIHZhciB0ID0gaSAvIChudW1iZXJPZkNvbHVtbnNUb1Rlc3QgKyAxKTtcblxuICAgICAgICAgICAgLy8gRmluZCBhbGwgdGhlIHBvaW50cyBvZiBhIGN1YmljIGJlemllciBjdXJ2ZSBpbiBqYXZhc2NyaXB0XG4gICAgICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNTM5NzU5Ni9maW5kLWFsbC10aGUtcG9pbnRzLW9mLWEtY3ViaWMtYmV6aWVyLWN1cnZlLWluLWphdmFzY3JpcHRcblxuICAgICAgICAgICAgdmFyIEIwX3QgPSBNYXRoLnBvdygxIC0gdCwgMyk7XG4gICAgICAgICAgICB2YXIgQjFfdCA9IDMgKiB0ICogTWF0aC5wb3coMSAtIHQsIDIpO1xuICAgICAgICAgICAgdmFyIEIyX3QgPSAzICogTWF0aC5wb3codCwgMikgKiAoMSAtIHQpO1xuICAgICAgICAgICAgdmFyIEIzX3QgPSBNYXRoLnBvdyh0LCAzKTtcblxuICAgICAgICAgICAgdmFyIHB5X3QgPSBCMF90ICogbGluay55MCArIEIxX3QgKiBsaW5rLnkwICsgQjJfdCAqIGxpbmsueTEgKyBCM190ICogbGluay55MTtcblxuICAgICAgICAgICAgdmFyIGxpbmtZMEF0Q29sdW1uID0gcHlfdCAtIGxpbmsud2lkdGggLyAyO1xuICAgICAgICAgICAgdmFyIGxpbmtZMUF0Q29sdW1uID0gcHlfdCArIGxpbmsud2lkdGggLyAyO1xuICAgICAgICAgICAgdmFyIGR5O1xuXG4gICAgICAgICAgICAvLyBJZiB0b3Agb2YgbGluayBvdmVybGFwcyBub2RlLCBwdXNoIG5vZGUgdXBcbiAgICAgICAgICAgIGlmIChsaW5rWTBBdENvbHVtbiA+IG5vZGUueTAgJiYgbGlua1kwQXRDb2x1bW4gPCBub2RlLnkxKSB7XG5cbiAgICAgICAgICAgICAgZHkgPSBub2RlLnkxIC0gbGlua1kwQXRDb2x1bW4gKyAxMDtcbiAgICAgICAgICAgICAgZHkgPSBub2RlLmNpcmN1bGFyTGlua1R5cGUgPT0gJ2JvdHRvbScgPyBkeSA6IC1keTtcblxuICAgICAgICAgICAgICBub2RlID0gYWRqdXN0Tm9kZUhlaWdodChub2RlLCBkeSwgeTAsIHkxKTtcblxuICAgICAgICAgICAgICAvLyBjaGVjayBpZiBvdGhlciBub2RlcyBuZWVkIHRvIG1vdmUgdXAgdG9vXG4gICAgICAgICAgICAgIGdyYXBoLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG90aGVyTm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IG5lZWQgdG8gY2hlY2sgaXRzZWxmIG9yIG5vZGVzIGF0IGRpZmZlcmVudCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgaWYgKGdldE5vZGVJRChvdGhlck5vZGUsIGlkKSA9PSBnZXROb2RlSUQobm9kZSwgaWQpIHx8IG90aGVyTm9kZS5jb2x1bW4gIT0gbm9kZS5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVzT3ZlcmxhcChub2RlLCBvdGhlck5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICBhZGp1c3ROb2RlSGVpZ2h0KG90aGVyTm9kZSwgZHksIHkwLCB5MSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlua1kxQXRDb2x1bW4gPiBub2RlLnkwICYmIGxpbmtZMUF0Q29sdW1uIDwgbm9kZS55MSkge1xuICAgICAgICAgICAgICAvLyBJZiBib3R0b20gb2YgbGluayBvdmVybGFwcyBub2RlLCBwdXNoIG5vZGUgZG93blxuICAgICAgICAgICAgICBkeSA9IGxpbmtZMUF0Q29sdW1uIC0gbm9kZS55MCArIDEwO1xuXG4gICAgICAgICAgICAgIG5vZGUgPSBhZGp1c3ROb2RlSGVpZ2h0KG5vZGUsIGR5LCB5MCwgeTEpO1xuXG4gICAgICAgICAgICAgIC8vIGNoZWNrIGlmIG90aGVyIG5vZGVzIG5lZWQgdG8gbW92ZSBkb3duIHRvb1xuICAgICAgICAgICAgICBncmFwaC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChvdGhlck5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBuZWVkIHRvIGNoZWNrIGl0c2VsZiBvciBub2RlcyBhdCBkaWZmZXJlbnQgY29sdW1uc1xuICAgICAgICAgICAgICAgIGlmIChnZXROb2RlSUQob3RoZXJOb2RlLCBpZCkgPT0gZ2V0Tm9kZUlEKG5vZGUsIGlkKSB8fCBvdGhlck5vZGUuY29sdW1uICE9IG5vZGUuY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvdGhlck5vZGUueTAgPCBub2RlLnkxICYmIG90aGVyTm9kZS55MSA+IG5vZGUueTEpIHtcbiAgICAgICAgICAgICAgICAgIGFkanVzdE5vZGVIZWlnaHQob3RoZXJOb2RlLCBkeSwgeTAsIHkxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rWTBBdENvbHVtbiA8IG5vZGUueTAgJiYgbGlua1kxQXRDb2x1bW4gPiBub2RlLnkxKSB7XG4gICAgICAgICAgICAgIC8vIGlmIGxpbmsgY29tcGxldGVseSBvdmVybGFwcyBub2RlXG4gICAgICAgICAgICAgIGR5ID0gbGlua1kxQXRDb2x1bW4gLSBub2RlLnkwICsgMTA7XG5cbiAgICAgICAgICAgICAgbm9kZSA9IGFkanVzdE5vZGVIZWlnaHQobm9kZSwgZHksIHkwLCB5MSk7XG5cbiAgICAgICAgICAgICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAob3RoZXJOb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgbmVlZCB0byBjaGVjayBpdHNlbGYgb3Igbm9kZXMgYXQgZGlmZmVyZW50IGNvbHVtbnNcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Tm9kZUlEKG90aGVyTm9kZSwgaWQpID09IGdldE5vZGVJRChub2RlLCBpZCkgfHwgb3RoZXJOb2RlLmNvbHVtbiAhPSBub2RlLmNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3RoZXJOb2RlLnkwIDwgbm9kZS55MSAmJiBvdGhlck5vZGUueTEgPiBub2RlLnkxKSB7XG4gICAgICAgICAgICAgICAgICBhZGp1c3ROb2RlSGVpZ2h0KG90aGVyTm9kZSwgZHksIHkwLCB5MSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vIGNoZWNrIGlmIHR3byBub2RlcyBvdmVybGFwXG5mdW5jdGlvbiBub2Rlc092ZXJsYXAobm9kZUEsIG5vZGVCKSB7XG4gIC8vIHRlc3QgaWYgbm9kZUEgdG9wIHBhcnRpYWxseSBvdmVybGFwcyBub2RlQlxuICBpZiAobm9kZUEueTAgPiBub2RlQi55MCAmJiBub2RlQS55MCA8IG5vZGVCLnkxKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAobm9kZUEueTEgPiBub2RlQi55MCAmJiBub2RlQS55MSA8IG5vZGVCLnkxKSB7XG4gICAgLy8gdGVzdCBpZiBub2RlQSBib3R0b20gcGFydGlhbGx5IG92ZXJsYXBzIG5vZGVCXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAobm9kZUEueTAgPCBub2RlQi55MCAmJiBub2RlQS55MSA+IG5vZGVCLnkxKSB7XG4gICAgLy8gdGVzdCBpZiBub2RlQSBjb3ZlcnMgbm9kZUJcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gdXBkYXRlIGEgbm9kZSwgYW5kIGl0cyBhc3NvY2lhdGVkIGxpbmtzLCB2ZXJ0aWNhbCBwb3NpdGlvbnMgKHkwLCB5MSlcbmZ1bmN0aW9uIGFkanVzdE5vZGVIZWlnaHQobm9kZSwgZHksIHNhbmtleVkwLCBzYW5rZXlZMSkge1xuICBpZiAobm9kZS55MCArIGR5ID49IHNhbmtleVkwICYmIG5vZGUueTEgKyBkeSA8PSBzYW5rZXlZMSkge1xuICAgIG5vZGUueTAgPSBub2RlLnkwICsgZHk7XG4gICAgbm9kZS55MSA9IG5vZGUueTEgKyBkeTtcblxuICAgIG5vZGUudGFyZ2V0TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobCkge1xuICAgICAgbC55MSA9IGwueTEgKyBkeTtcbiAgICB9KTtcblxuICAgIG5vZGUuc291cmNlTGlua3MuZm9yRWFjaChmdW5jdGlvbiAobCkge1xuICAgICAgbC55MCA9IGwueTAgKyBkeTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuLy8gc29ydCBhbmQgc2V0IHRoZSBsaW5rcycgeTAgZm9yIGVhY2ggbm9kZVxuZnVuY3Rpb24gc29ydFNvdXJjZUxpbmtzKGdyYXBoLCB5MSwgaWQsIG1vdmVOb2Rlcykge1xuICBncmFwaC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgLy8gbW92ZSBhbnkgbm9kZXMgdXAgd2hpY2ggYXJlIG9mZiB0aGUgYm90dG9tXG4gICAgaWYgKG1vdmVOb2RlcyAmJiBub2RlLnkgKyAobm9kZS55MSAtIG5vZGUueTApID4geTEpIHtcbiAgICAgIG5vZGUueSA9IG5vZGUueSAtIChub2RlLnkgKyAobm9kZS55MSAtIG5vZGUueTApIC0geTEpO1xuICAgIH1cblxuICAgIHZhciBub2Rlc1NvdXJjZUxpbmtzID0gZ3JhcGgubGlua3MuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gZ2V0Tm9kZUlEKGwuc291cmNlLCBpZCkgPT0gZ2V0Tm9kZUlEKG5vZGUsIGlkKTtcbiAgICB9KTtcblxuICAgIHZhciBub2RlU291cmNlTGlua3NMZW5ndGggPSBub2Rlc1NvdXJjZUxpbmtzLmxlbmd0aDtcblxuICAgIC8vIGlmIG1vcmUgdGhhbiAxIGxpbmsgdGhlbiBzb3J0XG4gICAgaWYgKG5vZGVTb3VyY2VMaW5rc0xlbmd0aCA+IDEpIHtcbiAgICAgIG5vZGVzU291cmNlTGlua3Muc29ydChmdW5jdGlvbiAobGluazEsIGxpbmsyKSB7XG4gICAgICAgIC8vIGlmIGJvdGggYXJlIG5vdCBjaXJjdWxhci4uLlxuICAgICAgICBpZiAoIWxpbmsxLmNpcmN1bGFyICYmICFsaW5rMi5jaXJjdWxhcikge1xuICAgICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgbm9kZXMgYXJlIHRoZSBzYW1lIGNvbHVtbiwgdGhlbiBzb3J0IGJ5IHRoZSBsaW5rJ3MgdGFyZ2V0IHlcbiAgICAgICAgICBpZiAobGluazEudGFyZ2V0LmNvbHVtbiA9PSBsaW5rMi50YXJnZXQuY29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gbGluazEueTEgLSBsaW5rMi55MTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFzYW1lSW5jbGluZXMobGluazEsIGxpbmsyKSkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmtzIHNsb3BlIGluIGRpZmZlcmVudCBkaXJlY3Rpb25zLCB0aGVuIHNvcnQgYnkgdGhlIGxpbmsncyB0YXJnZXQgeVxuICAgICAgICAgICAgcmV0dXJuIGxpbmsxLnkxIC0gbGluazIueTE7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rcyBzbG9wZSBpbiBzYW1lIGRpcmVjdGlvbnMsIHRoZW4gc29ydCBieSBhbnkgb3ZlcmxhcFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGluazEudGFyZ2V0LmNvbHVtbiA+IGxpbmsyLnRhcmdldC5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmsyQWRqID0gbGlua1BlcnBlbmRpY3VsYXJZVG9MaW5rVGFyZ2V0KGxpbmsyLCBsaW5rMSk7XG4gICAgICAgICAgICAgIHJldHVybiBsaW5rMS55MSAtIGxpbmsyQWRqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmsyLnRhcmdldC5jb2x1bW4gPiBsaW5rMS50YXJnZXQuY29sdW1uKSB7XG4gICAgICAgICAgICAgIHZhciBsaW5rMUFkaiA9IGxpbmtQZXJwZW5kaWN1bGFyWVRvTGlua1RhcmdldChsaW5rMSwgbGluazIpO1xuICAgICAgICAgICAgICByZXR1cm4gbGluazFBZGogLSBsaW5rMi55MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBvbmx5IG9uZSBpcyBjaXJjdWxhciwgdGhlIG1vdmUgdG9wIGxpbmtzIHVwLCBvciBib3R0b20gbGlua3MgZG93blxuICAgICAgICBpZiAobGluazEuY2lyY3VsYXIgJiYgIWxpbmsyLmNpcmN1bGFyKSB7XG4gICAgICAgICAgcmV0dXJuIGxpbmsxLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcgPyAtMSA6IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobGluazIuY2lyY3VsYXIgJiYgIWxpbmsxLmNpcmN1bGFyKSB7XG4gICAgICAgICAgcmV0dXJuIGxpbmsyLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcgPyAxIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBib3RoIGxpbmtzIGFyZSBjaXJjdWxhci4uLlxuICAgICAgICBpZiAobGluazEuY2lyY3VsYXIgJiYgbGluazIuY2lyY3VsYXIpIHtcbiAgICAgICAgICAvLyAuLi5hbmQgdGhleSBib3RoIGxvb3AgdGhlIHNhbWUgd2F5IChib3RoIHRvcClcbiAgICAgICAgICBpZiAobGluazEuY2lyY3VsYXJMaW5rVHlwZSA9PT0gbGluazIuY2lyY3VsYXJMaW5rVHlwZSAmJiBsaW5rMS5jaXJjdWxhckxpbmtUeXBlID09ICd0b3AnKSB7XG4gICAgICAgICAgICAvLyAuLi5hbmQgdGhleSBib3RoIGNvbm5lY3QgdG8gYSB0YXJnZXQgd2l0aCBzYW1lIGNvbHVtbiwgdGhlbiBzb3J0IGJ5IHRoZSB0YXJnZXQncyB5XG4gICAgICAgICAgICBpZiAobGluazEudGFyZ2V0LmNvbHVtbiA9PT0gbGluazIudGFyZ2V0LmNvbHVtbikge1xuICAgICAgICAgICAgICByZXR1cm4gbGluazEudGFyZ2V0LnkxIC0gbGluazIudGFyZ2V0LnkxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gLi4uYW5kIHRoZXkgY29ubmVjdCB0byBkaWZmZXJlbnQgY29sdW1uIHRhcmdldHMsIHRoZW4gc29ydCBieSBob3cgZmFyIGJhY2sgdGhleVxuICAgICAgICAgICAgICByZXR1cm4gbGluazIudGFyZ2V0LmNvbHVtbiAtIGxpbmsxLnRhcmdldC5jb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5rMS5jaXJjdWxhckxpbmtUeXBlID09PSBsaW5rMi5jaXJjdWxhckxpbmtUeXBlICYmIGxpbmsxLmNpcmN1bGFyTGlua1R5cGUgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIC8vIC4uLmFuZCB0aGV5IGJvdGggbG9vcCB0aGUgc2FtZSB3YXkgKGJvdGggYm90dG9tKVxuICAgICAgICAgICAgLy8gLi4uYW5kIHRoZXkgYm90aCBjb25uZWN0IHRvIGEgdGFyZ2V0IHdpdGggc2FtZSBjb2x1bW4sIHRoZW4gc29ydCBieSB0aGUgdGFyZ2V0J3MgeVxuICAgICAgICAgICAgaWYgKGxpbmsxLnRhcmdldC5jb2x1bW4gPT09IGxpbmsyLnRhcmdldC5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmsyLnRhcmdldC55MSAtIGxpbmsxLnRhcmdldC55MTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIC4uLmFuZCB0aGV5IGNvbm5lY3QgdG8gZGlmZmVyZW50IGNvbHVtbiB0YXJnZXRzLCB0aGVuIHNvcnQgYnkgaG93IGZhciBiYWNrIHRoZXlcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmsxLnRhcmdldC5jb2x1bW4gLSBsaW5rMi50YXJnZXQuY29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAuLi5hbmQgdGhleSBsb29wIGFyb3VuZCBkaWZmZXJlbnQgd2F5cywgdGhlIG1vdmUgdG9wIHVwIGFuZCBib3R0b20gZG93blxuICAgICAgICAgICAgcmV0dXJuIGxpbmsxLmNpcmN1bGFyTGlua1R5cGUgPT0gJ3RvcCcgPyAtMSA6IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgeTAgZm9yIGxpbmtzXG4gICAgdmFyIHlTb3VyY2VPZmZzZXQgPSBub2RlLnkwO1xuXG4gICAgbm9kZXNTb3VyY2VMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICBsaW5rLnkwID0geVNvdXJjZU9mZnNldCArIGxpbmsud2lkdGggLyAyO1xuICAgICAgeVNvdXJjZU9mZnNldCA9IHlTb3VyY2VPZmZzZXQgKyBsaW5rLndpZHRoO1xuICAgIH0pO1xuXG4gICAgLy8gY29ycmVjdCBhbnkgY2lyY3VsYXIgYm90dG9tIGxpbmtzIHNvIHRoZXkgYXJlIGF0IHRoZSBib3R0b20gb2YgdGhlIG5vZGVcbiAgICBub2Rlc1NvdXJjZUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmssIGkpIHtcbiAgICAgIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgdmFyIGogPSBpICsgMTtcbiAgICAgICAgdmFyIG9mZnNldEZyb21Cb3R0b20gPSAwO1xuICAgICAgICAvLyBzdW0gdGhlIHdpZHRocyBvZiBhbnkgbGlua3MgdGhhdCBhcmUgYmVsb3cgdGhpcyBsaW5rXG4gICAgICAgIGZvciAoajsgaiA8IG5vZGVTb3VyY2VMaW5rc0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgb2Zmc2V0RnJvbUJvdHRvbSA9IG9mZnNldEZyb21Cb3R0b20gKyBub2Rlc1NvdXJjZUxpbmtzW2pdLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGxpbmsueTAgPSBub2RlLnkxIC0gb2Zmc2V0RnJvbUJvdHRvbSAtIGxpbmsud2lkdGggLyAyO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gc29ydCBhbmQgc2V0IHRoZSBsaW5rcycgeTEgZm9yIGVhY2ggbm9kZVxuZnVuY3Rpb24gc29ydFRhcmdldExpbmtzKGdyYXBoLCB5MSwgaWQpIHtcbiAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBub2Rlc1RhcmdldExpbmtzID0gZ3JhcGgubGlua3MuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gZ2V0Tm9kZUlEKGwudGFyZ2V0LCBpZCkgPT0gZ2V0Tm9kZUlEKG5vZGUsIGlkKTtcbiAgICB9KTtcblxuICAgIHZhciBub2Rlc1RhcmdldExpbmtzTGVuZ3RoID0gbm9kZXNUYXJnZXRMaW5rcy5sZW5ndGg7XG5cbiAgICBpZiAobm9kZXNUYXJnZXRMaW5rc0xlbmd0aCA+IDEpIHtcbiAgICAgIG5vZGVzVGFyZ2V0TGlua3Muc29ydChmdW5jdGlvbiAobGluazEsIGxpbmsyKSB7XG4gICAgICAgIC8vIGlmIGJvdGggYXJlIG5vdCBjaXJjdWxhciwgdGhlIGJhc2Ugb24gdGhlIHNvdXJjZSB5IHBvc2l0aW9uXG4gICAgICAgIGlmICghbGluazEuY2lyY3VsYXIgJiYgIWxpbmsyLmNpcmN1bGFyKSB7XG4gICAgICAgICAgaWYgKGxpbmsxLnNvdXJjZS5jb2x1bW4gPT0gbGluazIuc291cmNlLmNvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuIGxpbmsxLnkwIC0gbGluazIueTA7XG4gICAgICAgICAgfSBlbHNlIGlmICghc2FtZUluY2xpbmVzKGxpbmsxLCBsaW5rMikpIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5rMS55MCAtIGxpbmsyLnkwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFuZ2xlIG9mIHRoZSBsaW5rIHRvIHRoZSBmdXJ0aGVyIHNvdXJjZSBub2RlIChpZSB0aGUgc21hbGxlciBjb2x1bW4pXG4gICAgICAgICAgICBpZiAobGluazIuc291cmNlLmNvbHVtbiA8IGxpbmsxLnNvdXJjZS5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmsyQWRqID0gbGlua1BlcnBlbmRpY3VsYXJZVG9MaW5rU291cmNlKGxpbmsyLCBsaW5rMSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmsxLnkwIC0gbGluazJBZGo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGluazEuc291cmNlLmNvbHVtbiA8IGxpbmsyLnNvdXJjZS5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmsxQWRqID0gbGlua1BlcnBlbmRpY3VsYXJZVG9MaW5rU291cmNlKGxpbmsxLCBsaW5rMik7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmsxQWRqIC0gbGluazIueTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgb25seSBvbmUgaXMgY2lyY3VsYXIsIHRoZSBtb3ZlIHRvcCBsaW5rcyB1cCwgb3IgYm90dG9tIGxpbmtzIGRvd25cbiAgICAgICAgaWYgKGxpbmsxLmNpcmN1bGFyICYmICFsaW5rMi5jaXJjdWxhcikge1xuICAgICAgICAgIHJldHVybiBsaW5rMS5jaXJjdWxhckxpbmtUeXBlID09ICd0b3AnID8gLTEgOiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGxpbmsyLmNpcmN1bGFyICYmICFsaW5rMS5jaXJjdWxhcikge1xuICAgICAgICAgIHJldHVybiBsaW5rMi5jaXJjdWxhckxpbmtUeXBlID09ICd0b3AnID8gMSA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYm90aCBsaW5rcyBhcmUgY2lyY3VsYXIuLi5cbiAgICAgICAgaWYgKGxpbmsxLmNpcmN1bGFyICYmIGxpbmsyLmNpcmN1bGFyKSB7XG4gICAgICAgICAgLy8gLi4uYW5kIHRoZXkgYm90aCBsb29wIHRoZSBzYW1lIHdheSAoYm90aCB0b3ApXG4gICAgICAgICAgaWYgKGxpbmsxLmNpcmN1bGFyTGlua1R5cGUgPT09IGxpbmsyLmNpcmN1bGFyTGlua1R5cGUgJiYgbGluazEuY2lyY3VsYXJMaW5rVHlwZSA9PSAndG9wJykge1xuICAgICAgICAgICAgLy8gLi4uYW5kIHRoZXkgYm90aCBjb25uZWN0IHRvIGEgdGFyZ2V0IHdpdGggc2FtZSBjb2x1bW4sIHRoZW4gc29ydCBieSB0aGUgdGFyZ2V0J3MgeVxuICAgICAgICAgICAgaWYgKGxpbmsxLnNvdXJjZS5jb2x1bW4gPT09IGxpbmsyLnNvdXJjZS5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmsxLnNvdXJjZS55MSAtIGxpbmsyLnNvdXJjZS55MTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIC4uLmFuZCB0aGV5IGNvbm5lY3QgdG8gZGlmZmVyZW50IGNvbHVtbiB0YXJnZXRzLCB0aGVuIHNvcnQgYnkgaG93IGZhciBiYWNrIHRoZXlcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmsxLnNvdXJjZS5jb2x1bW4gLSBsaW5rMi5zb3VyY2UuY29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobGluazEuY2lyY3VsYXJMaW5rVHlwZSA9PT0gbGluazIuY2lyY3VsYXJMaW5rVHlwZSAmJiBsaW5rMS5jaXJjdWxhckxpbmtUeXBlID09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAvLyAuLi5hbmQgdGhleSBib3RoIGxvb3AgdGhlIHNhbWUgd2F5IChib3RoIGJvdHRvbSlcbiAgICAgICAgICAgIC8vIC4uLmFuZCB0aGV5IGJvdGggY29ubmVjdCB0byBhIHRhcmdldCB3aXRoIHNhbWUgY29sdW1uLCB0aGVuIHNvcnQgYnkgdGhlIHRhcmdldCdzIHlcbiAgICAgICAgICAgIGlmIChsaW5rMS5zb3VyY2UuY29sdW1uID09PSBsaW5rMi5zb3VyY2UuY29sdW1uKSB7XG4gICAgICAgICAgICAgIHJldHVybiBsaW5rMS5zb3VyY2UueTEgLSBsaW5rMi5zb3VyY2UueTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyAuLi5hbmQgdGhleSBjb25uZWN0IHRvIGRpZmZlcmVudCBjb2x1bW4gdGFyZ2V0cywgdGhlbiBzb3J0IGJ5IGhvdyBmYXIgYmFjayB0aGV5XG4gICAgICAgICAgICAgIHJldHVybiBsaW5rMi5zb3VyY2UuY29sdW1uIC0gbGluazEuc291cmNlLmNvbHVtbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gLi4uYW5kIHRoZXkgbG9vcCBhcm91bmQgZGlmZmVyZW50IHdheXMsIHRoZSBtb3ZlIHRvcCB1cCBhbmQgYm90dG9tIGRvd25cbiAgICAgICAgICAgIHJldHVybiBsaW5rMS5jaXJjdWxhckxpbmtUeXBlID09ICd0b3AnID8gLTEgOiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHkxIGZvciBsaW5rc1xuICAgIHZhciB5VGFyZ2V0T2Zmc2V0ID0gbm9kZS55MDtcblxuICAgIG5vZGVzVGFyZ2V0TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xuICAgICAgbGluay55MSA9IHlUYXJnZXRPZmZzZXQgKyBsaW5rLndpZHRoIC8gMjtcbiAgICAgIHlUYXJnZXRPZmZzZXQgPSB5VGFyZ2V0T2Zmc2V0ICsgbGluay53aWR0aDtcbiAgICB9KTtcblxuICAgIC8vIGNvcnJlY3QgYW55IGNpcmN1bGFyIGJvdHRvbSBsaW5rcyBzbyB0aGV5IGFyZSBhdCB0aGUgYm90dG9tIG9mIHRoZSBub2RlXG4gICAgbm9kZXNUYXJnZXRMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rLCBpKSB7XG4gICAgICBpZiAobGluay5jaXJjdWxhckxpbmtUeXBlID09ICdib3R0b20nKSB7XG4gICAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICAgIHZhciBvZmZzZXRGcm9tQm90dG9tID0gMDtcbiAgICAgICAgLy8gc3VtIHRoZSB3aWR0aHMgb2YgYW55IGxpbmtzIHRoYXQgYXJlIGJlbG93IHRoaXMgbGlua1xuICAgICAgICBmb3IgKGo7IGogPCBub2Rlc1RhcmdldExpbmtzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBvZmZzZXRGcm9tQm90dG9tID0gb2Zmc2V0RnJvbUJvdHRvbSArIG5vZGVzVGFyZ2V0TGlua3Nbal0ud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgbGluay55MSA9IG5vZGUueTEgLSBvZmZzZXRGcm9tQm90dG9tIC0gbGluay53aWR0aCAvIDI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyB0ZXN0IGlmIGxpbmtzIGJvdGggc2xvcGUgdXAsIG9yIGJvdGggc2xvcGUgZG93blxuZnVuY3Rpb24gc2FtZUluY2xpbmVzKGxpbmsxLCBsaW5rMikge1xuICByZXR1cm4gaW5jbGluZShsaW5rMSkgPT0gaW5jbGluZShsaW5rMik7XG59XG5cbi8vIHJldHVybnMgdGhlIHNsb3BlIG9mIGEgbGluaywgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0XG4vLyB1cCA9PiBzbG9wZXMgdXAgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0XG4vLyBkb3duID0+IHNsb3BlcyBkb3duIGZyb20gc291cmNlIHRvIHRhcmdldFxuZnVuY3Rpb24gaW5jbGluZShsaW5rKSB7XG4gIHJldHVybiBsaW5rLnkwIC0gbGluay55MSA+IDAgPyAndXAnIDogJ2Rvd24nO1xufVxuXG4vLyBjaGVjayBpZiBsaW5rIGlzIHNlbGYgbGlua2luZywgaWUgbGlua3MgYSBub2RlIHRvIHRoZSBzYW1lIG5vZGVcbmZ1bmN0aW9uIHNlbGZMaW5raW5nKGxpbmssIGlkKSB7XG4gIHJldHVybiBnZXROb2RlSUQobGluay5zb3VyY2UsIGlkKSA9PSBnZXROb2RlSUQobGluay50YXJnZXQsIGlkKTtcbn1cblxuZnVuY3Rpb24gZmlsbEhlaWdodChncmFwaCwgeTAsIHkxKSB7XG5cbiAgdmFyIG5vZGVzID0gZ3JhcGgubm9kZXM7XG4gIHZhciBsaW5rcyA9IGdyYXBoLmxpbmtzO1xuXG4gIHZhciB0b3AgPSBmYWxzZTtcbiAgdmFyIGJvdHRvbSA9IGZhbHNlO1xuXG4gIGxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICBpZiAobGluay5jaXJjdWxhckxpbmtUeXBlID09IFwidG9wXCIpIHtcbiAgICAgIHRvcCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChsaW5rLmNpcmN1bGFyTGlua1R5cGUgPT0gXCJib3R0b21cIikge1xuICAgICAgYm90dG9tID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0b3AgPT0gZmFsc2UgfHwgYm90dG9tID09IGZhbHNlKSB7XG4gICAgdmFyIG1pblkwID0gbWluKG5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUueTA7XG4gICAgfSk7XG4gICAgdmFyIG1heFkxID0gbWF4KG5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUueTE7XG4gICAgfSk7XG4gICAgdmFyIGN1cnJlbnRIZWlnaHQgPSBtYXhZMSAtIG1pblkwO1xuICAgIHZhciBjaGFydEhlaWdodCA9IHkxIC0geTA7XG4gICAgdmFyIHJhdGlvID0gY2hhcnRIZWlnaHQgLyBjdXJyZW50SGVpZ2h0O1xuXG4gICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIG5vZGVIZWlnaHQgPSAobm9kZS55MSAtIG5vZGUueTApICogcmF0aW87XG4gICAgICBub2RlLnkwID0gKG5vZGUueTAgLSBtaW5ZMCkgKiByYXRpbztcbiAgICAgIG5vZGUueTEgPSBub2RlLnkwICsgbm9kZUhlaWdodDtcbiAgICB9KTtcblxuICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgIGxpbmsueTAgPSAobGluay55MCAtIG1pblkwKSAqIHJhdGlvO1xuICAgICAgbGluay55MSA9IChsaW5rLnkxIC0gbWluWTApICogcmF0aW87XG4gICAgICBsaW5rLndpZHRoID0gbGluay53aWR0aCAqIHJhdGlvO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IHNhbmtleUNpcmN1bGFyLCBjZW50ZXIgYXMgc2Fua2V5Q2VudGVyLCBsZWZ0IGFzIHNhbmtleUxlZnQsIHJpZ2h0IGFzIHNhbmtleVJpZ2h0LCBqdXN0aWZ5IGFzIHNhbmtleUp1c3RpZnkgfTtcbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBzYW5rZXl9IGZyb20gXCIuL3NyYy9zYW5rZXlcIjtcbmV4cG9ydCB7Y2VudGVyIGFzIHNhbmtleUNlbnRlciwgbGVmdCBhcyBzYW5rZXlMZWZ0LCByaWdodCBhcyBzYW5rZXlSaWdodCwganVzdGlmeSBhcyBzYW5rZXlKdXN0aWZ5fSBmcm9tIFwiLi9zcmMvYWxpZ25cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzYW5rZXlMaW5rSG9yaXpvbnRhbH0gZnJvbSBcIi4vc3JjL3NhbmtleUxpbmtIb3Jpem9udGFsXCI7XG4iLCJpbXBvcnQge21pbn0gZnJvbSBcImQzLWFycmF5XCI7XG5cbmZ1bmN0aW9uIHRhcmdldERlcHRoKGQpIHtcbiAgcmV0dXJuIGQudGFyZ2V0LmRlcHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVmdChub2RlKSB7XG4gIHJldHVybiBub2RlLmRlcHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmlnaHQobm9kZSwgbikge1xuICByZXR1cm4gbiAtIDEgLSBub2RlLmhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1c3RpZnkobm9kZSwgbikge1xuICByZXR1cm4gbm9kZS5zb3VyY2VMaW5rcy5sZW5ndGggPyBub2RlLmRlcHRoIDogbiAtIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXIobm9kZSkge1xuICByZXR1cm4gbm9kZS50YXJnZXRMaW5rcy5sZW5ndGggPyBub2RlLmRlcHRoXG4gICAgICA6IG5vZGUuc291cmNlTGlua3MubGVuZ3RoID8gbWluKG5vZGUuc291cmNlTGlua3MsIHRhcmdldERlcHRoKSAtIDFcbiAgICAgIDogMDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnN0YW50KHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiaW1wb3J0IHthc2NlbmRpbmcsIG1pbiwgbWF4LCBzdW19IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IHttYXAsIG5lc3R9IGZyb20gXCJkMy1jb2xsZWN0aW9uXCI7XG5pbXBvcnQge2p1c3RpZnl9IGZyb20gXCIuL2FsaWduXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnRcIjtcblxuZnVuY3Rpb24gYXNjZW5kaW5nU291cmNlQnJlYWR0aChhLCBiKSB7XG4gIHJldHVybiBhc2NlbmRpbmdCcmVhZHRoKGEuc291cmNlLCBiLnNvdXJjZSkgfHwgYS5pbmRleCAtIGIuaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZ1RhcmdldEJyZWFkdGgoYSwgYikge1xuICByZXR1cm4gYXNjZW5kaW5nQnJlYWR0aChhLnRhcmdldCwgYi50YXJnZXQpIHx8IGEuaW5kZXggLSBiLmluZGV4O1xufVxuXG5mdW5jdGlvbiBhc2NlbmRpbmdCcmVhZHRoKGEsIGIpIHtcbiAgcmV0dXJuIGEueTAgLSBiLnkwO1xufVxuXG5mdW5jdGlvbiB2YWx1ZShkKSB7XG4gIHJldHVybiBkLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBub2RlQ2VudGVyKG5vZGUpIHtcbiAgcmV0dXJuIChub2RlLnkwICsgbm9kZS55MSkgLyAyO1xufVxuXG5mdW5jdGlvbiB3ZWlnaHRlZFNvdXJjZShsaW5rKSB7XG4gIHJldHVybiBub2RlQ2VudGVyKGxpbmsuc291cmNlKSAqIGxpbmsudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHdlaWdodGVkVGFyZ2V0KGxpbmspIHtcbiAgcmV0dXJuIG5vZGVDZW50ZXIobGluay50YXJnZXQpICogbGluay52YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdElkKGQpIHtcbiAgcmV0dXJuIGQuaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHROb2RlcyhncmFwaCkge1xuICByZXR1cm4gZ3JhcGgubm9kZXM7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRMaW5rcyhncmFwaCkge1xuICByZXR1cm4gZ3JhcGgubGlua3M7XG59XG5cbmZ1bmN0aW9uIGZpbmQobm9kZUJ5SWQsIGlkKSB7XG4gIHZhciBub2RlID0gbm9kZUJ5SWQuZ2V0KGlkKTtcbiAgaWYgKCFub2RlKSB0aHJvdyBuZXcgRXJyb3IoXCJtaXNzaW5nOiBcIiArIGlkKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgeDAgPSAwLCB5MCA9IDAsIHgxID0gMSwgeTEgPSAxLCAvLyBleHRlbnRcbiAgICAgIGR4ID0gMjQsIC8vIG5vZGVXaWR0aFxuICAgICAgcHkgPSA4LCAvLyBub2RlUGFkZGluZ1xuICAgICAgaWQgPSBkZWZhdWx0SWQsXG4gICAgICBhbGlnbiA9IGp1c3RpZnksXG4gICAgICBub2RlcyA9IGRlZmF1bHROb2RlcyxcbiAgICAgIGxpbmtzID0gZGVmYXVsdExpbmtzLFxuICAgICAgaXRlcmF0aW9ucyA9IDMyLFxuICAgICAgbWF4UGFkZGVkU3BhY2UgPSAyIC8gMzsgLy8gRGVmaW5lZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSB0b3RhbCBhdmFpbGFibGUgc3BhY2VcblxuICBmdW5jdGlvbiBzYW5rZXkoKSB7XG4gICAgdmFyIGdyYXBoID0ge25vZGVzOiBub2Rlcy5hcHBseShudWxsLCBhcmd1bWVudHMpLCBsaW5rczogbGlua3MuYXBwbHkobnVsbCwgYXJndW1lbnRzKX07XG4gICAgY29tcHV0ZU5vZGVMaW5rcyhncmFwaCk7XG4gICAgY29tcHV0ZU5vZGVWYWx1ZXMoZ3JhcGgpO1xuICAgIGNvbXB1dGVOb2RlRGVwdGhzKGdyYXBoKTtcbiAgICBjb21wdXRlTm9kZUJyZWFkdGhzKGdyYXBoLCBpdGVyYXRpb25zKTtcbiAgICBjb21wdXRlTGlua0JyZWFkdGhzKGdyYXBoKTtcbiAgICByZXR1cm4gZ3JhcGg7XG4gIH1cblxuICBzYW5rZXkudXBkYXRlID0gZnVuY3Rpb24oZ3JhcGgpIHtcbiAgICBjb21wdXRlTGlua0JyZWFkdGhzKGdyYXBoKTtcbiAgICByZXR1cm4gZ3JhcGg7XG4gIH07XG5cbiAgc2Fua2V5Lm5vZGVJZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpZCA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoXyksIHNhbmtleSkgOiBpZDtcbiAgfTtcblxuICBzYW5rZXkubm9kZUFsaWduID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGFsaWduID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudChfKSwgc2Fua2V5KSA6IGFsaWduO1xuICB9O1xuXG4gIHNhbmtleS5ub2RlV2lkdGggPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZHggPSArXywgc2Fua2V5KSA6IGR4O1xuICB9O1xuXG4gIHNhbmtleS5ub2RlUGFkZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChweSA9ICtfLCBzYW5rZXkpIDogcHk7XG4gIH07XG5cbiAgc2Fua2V5Lm5vZGVzID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG5vZGVzID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudChfKSwgc2Fua2V5KSA6IG5vZGVzO1xuICB9O1xuXG4gIHNhbmtleS5saW5rcyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChsaW5rcyA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoXyksIHNhbmtleSkgOiBsaW5rcztcbiAgfTtcblxuICBzYW5rZXkuc2l6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh4MCA9IHkwID0gMCwgeDEgPSArX1swXSwgeTEgPSArX1sxXSwgc2Fua2V5KSA6IFt4MSAtIHgwLCB5MSAtIHkwXTtcbiAgfTtcblxuICBzYW5rZXkuZXh0ZW50ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHgwID0gK19bMF1bMF0sIHgxID0gK19bMV1bMF0sIHkwID0gK19bMF1bMV0sIHkxID0gK19bMV1bMV0sIHNhbmtleSkgOiBbW3gwLCB5MF0sIFt4MSwgeTFdXTtcbiAgfTtcblxuICBzYW5rZXkuaXRlcmF0aW9ucyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpdGVyYXRpb25zID0gK18sIHNhbmtleSkgOiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIC8vIFBvcHVsYXRlIHRoZSBzb3VyY2VMaW5rcyBhbmQgdGFyZ2V0TGlua3MgZm9yIGVhY2ggbm9kZS5cbiAgLy8gQWxzbywgaWYgdGhlIHNvdXJjZSBhbmQgdGFyZ2V0IGFyZSBub3Qgb2JqZWN0cywgYXNzdW1lIHRoZXkgYXJlIGluZGljZXMuXG4gIGZ1bmN0aW9uIGNvbXB1dGVOb2RlTGlua3MoZ3JhcGgpIHtcbiAgICBncmFwaC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgIG5vZGUuaW5kZXggPSBpO1xuICAgICAgbm9kZS5zb3VyY2VMaW5rcyA9IFtdO1xuICAgICAgbm9kZS50YXJnZXRMaW5rcyA9IFtdO1xuICAgIH0pO1xuXG4gICAgdmFyIG5vZGVCeUlkID0gbWFwKGdyYXBoLm5vZGVzLCBpZCk7XG4gICAgZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rLCBpKSB7XG4gICAgICBsaW5rLmluZGV4ID0gaTtcbiAgICAgIHZhciBzb3VyY2UgPSBsaW5rLnNvdXJjZSwgdGFyZ2V0ID0gbGluay50YXJnZXQ7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gXCJvYmplY3RcIikgc291cmNlID0gbGluay5zb3VyY2UgPSBmaW5kKG5vZGVCeUlkLCBzb3VyY2UpO1xuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIpIHRhcmdldCA9IGxpbmsudGFyZ2V0ID0gZmluZChub2RlQnlJZCwgdGFyZ2V0KTtcbiAgICAgIHNvdXJjZS5zb3VyY2VMaW5rcy5wdXNoKGxpbmspO1xuICAgICAgdGFyZ2V0LnRhcmdldExpbmtzLnB1c2gobGluayk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSB2YWx1ZSAoc2l6ZSkgb2YgZWFjaCBub2RlIGJ5IHN1bW1pbmcgdGhlIGFzc29jaWF0ZWQgbGlua3MuXG4gIGZ1bmN0aW9uIGNvbXB1dGVOb2RlVmFsdWVzKGdyYXBoKSB7XG4gICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICBub2RlLnZhbHVlID0gTWF0aC5tYXgoXG4gICAgICAgIHN1bShub2RlLnNvdXJjZUxpbmtzLCB2YWx1ZSksXG4gICAgICAgIHN1bShub2RlLnRhcmdldExpbmtzLCB2YWx1ZSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBJdGVyYXRpdmVseSBhc3NpZ24gdGhlIGRlcHRoICh4LXBvc2l0aW9uKSBmb3IgZWFjaCBub2RlLlxuICAvLyBOb2RlcyBhcmUgYXNzaWduZWQgdGhlIG1heGltdW0gZGVwdGggb2YgaW5jb21pbmcgbmVpZ2hib3JzIHBsdXMgb25lO1xuICAvLyBub2RlcyB3aXRoIG5vIGluY29taW5nIGxpbmtzIGFyZSBhc3NpZ25lZCBkZXB0aCB6ZXJvLCB3aGlsZVxuICAvLyBub2RlcyB3aXRoIG5vIG91dGdvaW5nIGxpbmtzIGFyZSBhc3NpZ25lZCB0aGUgbWF4aW11bSBkZXB0aC5cbiAgZnVuY3Rpb24gY29tcHV0ZU5vZGVEZXB0aHMoZ3JhcGgpIHtcbiAgICB2YXIgbm9kZXMsIG5leHQsIHg7XG5cbiAgICBmb3IgKG5vZGVzID0gZ3JhcGgubm9kZXMsIG5leHQgPSBbXSwgeCA9IDA7IG5vZGVzLmxlbmd0aDsgKyt4LCBub2RlcyA9IG5leHQsIG5leHQgPSBbXSkge1xuICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuZGVwdGggPSB4O1xuICAgICAgICBub2RlLnNvdXJjZUxpbmtzLmZvckVhY2goZnVuY3Rpb24obGluaykge1xuICAgICAgICAgIGlmIChuZXh0LmluZGV4T2YobGluay50YXJnZXQpIDwgMCkge1xuICAgICAgICAgICAgbmV4dC5wdXNoKGxpbmsudGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yIChub2RlcyA9IGdyYXBoLm5vZGVzLCBuZXh0ID0gW10sIHggPSAwOyBub2Rlcy5sZW5ndGg7ICsreCwgbm9kZXMgPSBuZXh0LCBuZXh0ID0gW10pIHtcbiAgICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBub2RlLmhlaWdodCA9IHg7XG4gICAgICAgIG5vZGUudGFyZ2V0TGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgaWYgKG5leHQuaW5kZXhPZihsaW5rLnNvdXJjZSkgPCAwKSB7XG4gICAgICAgICAgICBuZXh0LnB1c2gobGluay5zb3VyY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIga3ggPSAoeDEgLSB4MCAtIGR4KSAvICh4IC0gMSk7XG4gICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICBub2RlLngxID0gKG5vZGUueDAgPSB4MCArIE1hdGgubWF4KDAsIE1hdGgubWluKHggLSAxLCBNYXRoLmZsb29yKGFsaWduLmNhbGwobnVsbCwgbm9kZSwgeCkpKSkgKiBreCkgKyBkeDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVOb2RlQnJlYWR0aHMoZ3JhcGgpIHtcbiAgICB2YXIgY29sdW1ucyA9IG5lc3QoKVxuICAgICAgICAua2V5KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueDA7IH0pXG4gICAgICAgIC5zb3J0S2V5cyhhc2NlbmRpbmcpXG4gICAgICAgIC5lbnRyaWVzKGdyYXBoLm5vZGVzKVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudmFsdWVzOyB9KTtcblxuICAgIC8vXG4gICAgaW5pdGlhbGl6ZU5vZGVCcmVhZHRoKCk7XG4gICAgcmVzb2x2ZUNvbGxpc2lvbnMoKTtcbiAgICBmb3IgKHZhciBhbHBoYSA9IDEsIG4gPSBpdGVyYXRpb25zOyBuID4gMDsgLS1uKSB7XG4gICAgICByZWxheFJpZ2h0VG9MZWZ0KGFscGhhICo9IDAuOTkpO1xuICAgICAgcmVzb2x2ZUNvbGxpc2lvbnMoKTtcbiAgICAgIHJlbGF4TGVmdFRvUmlnaHQoYWxwaGEpO1xuICAgICAgcmVzb2x2ZUNvbGxpc2lvbnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplTm9kZUJyZWFkdGgoKSB7XG4gICAgICB2YXIgTCA9IG1heChjb2x1bW5zLCBmdW5jdGlvbihub2Rlcykge1xuICAgICAgICByZXR1cm4gbm9kZXMubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICB2YXIgbWF4Tm9kZVBhZGRpbmcgPSBtYXhQYWRkZWRTcGFjZSAqICh5MSAtIHkwKSAvIChMIC0gMSk7XG4gICAgICBpZihweSA+IG1heE5vZGVQYWRkaW5nKSBweSA9IG1heE5vZGVQYWRkaW5nO1xuICAgICAgdmFyIGt5ID0gbWluKGNvbHVtbnMsIGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgICAgIHJldHVybiAoeTEgLSB5MCAtIChub2Rlcy5sZW5ndGggLSAxKSAqIHB5KSAvIHN1bShub2RlcywgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihub2Rlcykge1xuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgICBub2RlLnkxID0gKG5vZGUueTAgPSBpKSArIG5vZGUudmFsdWUgKiBreTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZ3JhcGgubGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgIGxpbmsud2lkdGggPSBsaW5rLnZhbHVlICoga3k7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWxheExlZnRUb1JpZ2h0KGFscGhhKSB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24obm9kZXMpIHtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgaWYgKG5vZGUudGFyZ2V0TGlua3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZHkgPSAoc3VtKG5vZGUudGFyZ2V0TGlua3MsIHdlaWdodGVkU291cmNlKSAvIHN1bShub2RlLnRhcmdldExpbmtzLCB2YWx1ZSkgLSBub2RlQ2VudGVyKG5vZGUpKSAqIGFscGhhO1xuICAgICAgICAgICAgbm9kZS55MCArPSBkeSwgbm9kZS55MSArPSBkeTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVsYXhSaWdodFRvTGVmdChhbHBoYSkge1xuICAgICAgY29sdW1ucy5zbGljZSgpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLnNvdXJjZUxpbmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGR5ID0gKHN1bShub2RlLnNvdXJjZUxpbmtzLCB3ZWlnaHRlZFRhcmdldCkgLyBzdW0obm9kZS5zb3VyY2VMaW5rcywgdmFsdWUpIC0gbm9kZUNlbnRlcihub2RlKSkgKiBhbHBoYTtcbiAgICAgICAgICAgIG5vZGUueTAgKz0gZHksIG5vZGUueTEgKz0gZHk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVDb2xsaXNpb25zKCkge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgICAgIHZhciBub2RlLFxuICAgICAgICAgICAgZHksXG4gICAgICAgICAgICB5ID0geTAsXG4gICAgICAgICAgICBuID0gbm9kZXMubGVuZ3RoLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICAvLyBQdXNoIGFueSBvdmVybGFwcGluZyBub2RlcyBkb3duLlxuICAgICAgICBub2Rlcy5zb3J0KGFzY2VuZGluZ0JyZWFkdGgpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgIGR5ID0geSAtIG5vZGUueTA7XG4gICAgICAgICAgaWYgKGR5ID4gMCkgbm9kZS55MCArPSBkeSwgbm9kZS55MSArPSBkeTtcbiAgICAgICAgICB5ID0gbm9kZS55MSArIHB5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGJvdHRvbW1vc3Qgbm9kZSBnb2VzIG91dHNpZGUgdGhlIGJvdW5kcywgcHVzaCBpdCBiYWNrIHVwLlxuICAgICAgICBkeSA9IHkgLSBweSAtIHkxO1xuICAgICAgICBpZiAoZHkgPiAwKSB7XG4gICAgICAgICAgeSA9IChub2RlLnkwIC09IGR5KSwgbm9kZS55MSAtPSBkeTtcblxuICAgICAgICAgIC8vIFB1c2ggYW55IG92ZXJsYXBwaW5nIG5vZGVzIGJhY2sgdXAuXG4gICAgICAgICAgZm9yIChpID0gbiAtIDI7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBkeSA9IG5vZGUueTEgKyBweSAtIHk7XG4gICAgICAgICAgICBpZiAoZHkgPiAwKSBub2RlLnkwIC09IGR5LCBub2RlLnkxIC09IGR5O1xuICAgICAgICAgICAgeSA9IG5vZGUueTA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlTGlua0JyZWFkdGhzKGdyYXBoKSB7XG4gICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICBub2RlLnNvdXJjZUxpbmtzLnNvcnQoYXNjZW5kaW5nVGFyZ2V0QnJlYWR0aCk7XG4gICAgICBub2RlLnRhcmdldExpbmtzLnNvcnQoYXNjZW5kaW5nU291cmNlQnJlYWR0aCk7XG4gICAgfSk7XG4gICAgZ3JhcGgubm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgeTAgPSBub2RlLnkwLCB5MSA9IHkwO1xuICAgICAgbm9kZS5zb3VyY2VMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgICAgbGluay55MCA9IHkwICsgbGluay53aWR0aCAvIDIsIHkwICs9IGxpbmsud2lkdGg7XG4gICAgICB9KTtcbiAgICAgIG5vZGUudGFyZ2V0TGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgIGxpbmsueTEgPSB5MSArIGxpbmsud2lkdGggLyAyLCB5MSArPSBsaW5rLndpZHRoO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc2Fua2V5O1xufVxuIiwiaW1wb3J0IHtsaW5rSG9yaXpvbnRhbH0gZnJvbSBcImQzLXNoYXBlXCI7XG5cbmZ1bmN0aW9uIGhvcml6b250YWxTb3VyY2UoZCkge1xuICByZXR1cm4gW2Quc291cmNlLngxLCBkLnkwXTtcbn1cblxuZnVuY3Rpb24gaG9yaXpvbnRhbFRhcmdldChkKSB7XG4gIHJldHVybiBbZC50YXJnZXQueDAsIGQueTFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGxpbmtIb3Jpem9udGFsKClcbiAgICAgIC5zb3VyY2UoaG9yaXpvbnRhbFNvdXJjZSlcbiAgICAgIC50YXJnZXQoaG9yaXpvbnRhbFRhcmdldCk7XG59XG4iLCJ2YXIgYXJyYXkgPSBBcnJheS5wcm90b3R5cGU7XG5cbmV4cG9ydCB2YXIgc2xpY2UgPSBhcnJheS5zbGljZTtcbmV4cG9ydCB2YXIgbWFwID0gYXJyYXkubWFwO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG59XG4iLCJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZ1wiO1xuaW1wb3J0IGJpc2VjdG9yIGZyb20gXCIuL2Jpc2VjdG9yXCI7XG5cbnZhciBhc2NlbmRpbmdCaXNlY3QgPSBiaXNlY3Rvcihhc2NlbmRpbmcpO1xuZXhwb3J0IHZhciBiaXNlY3RSaWdodCA9IGFzY2VuZGluZ0Jpc2VjdC5yaWdodDtcbmV4cG9ydCB2YXIgYmlzZWN0TGVmdCA9IGFzY2VuZGluZ0Jpc2VjdC5sZWZ0O1xuZXhwb3J0IGRlZmF1bHQgYmlzZWN0UmlnaHQ7XG4iLCJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb21wYXJlKSB7XG4gIGlmIChjb21wYXJlLmxlbmd0aCA9PT0gMSkgY29tcGFyZSA9IGFzY2VuZGluZ0NvbXBhcmF0b3IoY29tcGFyZSk7XG4gIHJldHVybiB7XG4gICAgbGVmdDogZnVuY3Rpb24oYSwgeCwgbG8sIGhpKSB7XG4gICAgICBpZiAobG8gPT0gbnVsbCkgbG8gPSAwO1xuICAgICAgaWYgKGhpID09IG51bGwpIGhpID0gYS5sZW5ndGg7XG4gICAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICAgICAgaWYgKGNvbXBhcmUoYVttaWRdLCB4KSA8IDApIGxvID0gbWlkICsgMTtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsbztcbiAgICB9LFxuICAgIHJpZ2h0OiBmdW5jdGlvbihhLCB4LCBsbywgaGkpIHtcbiAgICAgIGlmIChsbyA9PSBudWxsKSBsbyA9IDA7XG4gICAgICBpZiAoaGkgPT0gbnVsbCkgaGkgPSBhLmxlbmd0aDtcbiAgICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgICAgICBpZiAoY29tcGFyZShhW21pZF0sIHgpID4gMCkgaGkgPSBtaWQ7XG4gICAgICAgIGVsc2UgbG8gPSBtaWQgKyAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nQ29tcGFyYXRvcihmKSB7XG4gIHJldHVybiBmdW5jdGlvbihkLCB4KSB7XG4gICAgcmV0dXJuIGFzY2VuZGluZyhmKGQpLCB4KTtcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiaW1wb3J0IHtwYWlyfSBmcm9tIFwiLi9wYWlyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMwLCB2YWx1ZXMxLCByZWR1Y2UpIHtcbiAgdmFyIG4wID0gdmFsdWVzMC5sZW5ndGgsXG4gICAgICBuMSA9IHZhbHVlczEubGVuZ3RoLFxuICAgICAgdmFsdWVzID0gbmV3IEFycmF5KG4wICogbjEpLFxuICAgICAgaTAsXG4gICAgICBpMSxcbiAgICAgIGksXG4gICAgICB2YWx1ZTA7XG5cbiAgaWYgKHJlZHVjZSA9PSBudWxsKSByZWR1Y2UgPSBwYWlyO1xuXG4gIGZvciAoaTAgPSBpID0gMDsgaTAgPCBuMDsgKytpMCkge1xuICAgIGZvciAodmFsdWUwID0gdmFsdWVzMFtpMF0sIGkxID0gMDsgaTEgPCBuMTsgKytpMSwgKytpKSB7XG4gICAgICB2YWx1ZXNbaV0gPSByZWR1Y2UodmFsdWUwLCB2YWx1ZXMxW2kxXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIGIgPCBhID8gLTEgOiBiID4gYSA/IDEgOiBiID49IGEgPyAwIDogTmFOO1xufVxuIiwiaW1wb3J0IHZhcmlhbmNlIGZyb20gXCIuL3ZhcmlhbmNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFycmF5LCBmKSB7XG4gIHZhciB2ID0gdmFyaWFuY2UoYXJyYXksIGYpO1xuICByZXR1cm4gdiA/IE1hdGguc3FydCh2KSA6IHY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgaSA9IC0xLFxuICAgICAgdmFsdWUsXG4gICAgICBtaW4sXG4gICAgICBtYXg7XG5cbiAgaWYgKHZhbHVlb2YgPT0gbnVsbCkge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIEZpbmQgdGhlIGZpcnN0IGNvbXBhcmFibGUgdmFsdWUuXG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVzW2ldKSAhPSBudWxsICYmIHZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIG1pbiA9IG1heCA9IHZhbHVlO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBDb21wYXJlIHRoZSByZW1haW5pbmcgdmFsdWVzLlxuICAgICAgICAgIGlmICgodmFsdWUgPSB2YWx1ZXNbaV0pICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChtaW4gPiB2YWx1ZSkgbWluID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAobWF4IDwgdmFsdWUpIG1heCA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVsc2Uge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIEZpbmQgdGhlIGZpcnN0IGNvbXBhcmFibGUgdmFsdWUuXG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVvZih2YWx1ZXNbaV0sIGksIHZhbHVlcykpICE9IG51bGwgJiYgdmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbWluID0gbWF4ID0gdmFsdWU7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIENvbXBhcmUgdGhlIHJlbWFpbmluZyB2YWx1ZXMuXG4gICAgICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobWluID4gdmFsdWUpIG1pbiA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKG1heCA8IHZhbHVlKSBtYXggPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gW21pbiwgbWF4XTtcbn1cbiIsImltcG9ydCB7c2xpY2V9IGZyb20gXCIuL2FycmF5XCI7XG5pbXBvcnQgYmlzZWN0IGZyb20gXCIuL2Jpc2VjdFwiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50XCI7XG5pbXBvcnQgZXh0ZW50IGZyb20gXCIuL2V4dGVudFwiO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gXCIuL2lkZW50aXR5XCI7XG5pbXBvcnQgcmFuZ2UgZnJvbSBcIi4vcmFuZ2VcIjtcbmltcG9ydCB7dGlja1N0ZXB9IGZyb20gXCIuL3RpY2tzXCI7XG5pbXBvcnQgc3R1cmdlcyBmcm9tIFwiLi90aHJlc2hvbGQvc3R1cmdlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIHZhbHVlID0gaWRlbnRpdHksXG4gICAgICBkb21haW4gPSBleHRlbnQsXG4gICAgICB0aHJlc2hvbGQgPSBzdHVyZ2VzO1xuXG4gIGZ1bmN0aW9uIGhpc3RvZ3JhbShkYXRhKSB7XG4gICAgdmFyIGksXG4gICAgICAgIG4gPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgeCxcbiAgICAgICAgdmFsdWVzID0gbmV3IEFycmF5KG4pO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgdmFsdWVzW2ldID0gdmFsdWUoZGF0YVtpXSwgaSwgZGF0YSk7XG4gICAgfVxuXG4gICAgdmFyIHh6ID0gZG9tYWluKHZhbHVlcyksXG4gICAgICAgIHgwID0geHpbMF0sXG4gICAgICAgIHgxID0geHpbMV0sXG4gICAgICAgIHR6ID0gdGhyZXNob2xkKHZhbHVlcywgeDAsIHgxKTtcblxuICAgIC8vIENvbnZlcnQgbnVtYmVyIG9mIHRocmVzaG9sZHMgaW50byB1bmlmb3JtIHRocmVzaG9sZHMuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHR6KSkge1xuICAgICAgdHogPSB0aWNrU3RlcCh4MCwgeDEsIHR6KTtcbiAgICAgIHR6ID0gcmFuZ2UoTWF0aC5jZWlsKHgwIC8gdHopICogdHosIHgxLCB0eik7IC8vIGV4Y2x1c2l2ZVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgdGhyZXNob2xkcyBvdXRzaWRlIHRoZSBkb21haW4uXG4gICAgdmFyIG0gPSB0ei5sZW5ndGg7XG4gICAgd2hpbGUgKHR6WzBdIDw9IHgwKSB0ei5zaGlmdCgpLCAtLW07XG4gICAgd2hpbGUgKHR6W20gLSAxXSA+IHgxKSB0ei5wb3AoKSwgLS1tO1xuXG4gICAgdmFyIGJpbnMgPSBuZXcgQXJyYXkobSArIDEpLFxuICAgICAgICBiaW47XG5cbiAgICAvLyBJbml0aWFsaXplIGJpbnMuXG4gICAgZm9yIChpID0gMDsgaSA8PSBtOyArK2kpIHtcbiAgICAgIGJpbiA9IGJpbnNbaV0gPSBbXTtcbiAgICAgIGJpbi54MCA9IGkgPiAwID8gdHpbaSAtIDFdIDogeDA7XG4gICAgICBiaW4ueDEgPSBpIDwgbSA/IHR6W2ldIDogeDE7XG4gICAgfVxuXG4gICAgLy8gQXNzaWduIGRhdGEgdG8gYmlucyBieSB2YWx1ZSwgaWdub3JpbmcgYW55IG91dHNpZGUgdGhlIGRvbWFpbi5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICB4ID0gdmFsdWVzW2ldO1xuICAgICAgaWYgKHgwIDw9IHggJiYgeCA8PSB4MSkge1xuICAgICAgICBiaW5zW2Jpc2VjdCh0eiwgeCwgMCwgbSldLnB1c2goZGF0YVtpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJpbnM7XG4gIH1cblxuICBoaXN0b2dyYW0udmFsdWUgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodmFsdWUgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KF8pLCBoaXN0b2dyYW0pIDogdmFsdWU7XG4gIH07XG5cbiAgaGlzdG9ncmFtLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkb21haW4gPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KFtfWzBdLCBfWzFdXSksIGhpc3RvZ3JhbSkgOiBkb21haW47XG4gIH07XG5cbiAgaGlzdG9ncmFtLnRocmVzaG9sZHMgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodGhyZXNob2xkID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBBcnJheS5pc0FycmF5KF8pID8gY29uc3RhbnQoc2xpY2UuY2FsbChfKSkgOiBjb25zdGFudChfKSwgaGlzdG9ncmFtKSA6IHRocmVzaG9sZDtcbiAgfTtcblxuICByZXR1cm4gaGlzdG9ncmFtO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDtcbn1cbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBiaXNlY3QsIGJpc2VjdFJpZ2h0LCBiaXNlY3RMZWZ0fSBmcm9tIFwiLi9iaXNlY3RcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBhc2NlbmRpbmd9IGZyb20gXCIuL2FzY2VuZGluZ1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGJpc2VjdG9yfSBmcm9tIFwiLi9iaXNlY3RvclwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNyb3NzfSBmcm9tIFwiLi9jcm9zc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGRlc2NlbmRpbmd9IGZyb20gXCIuL2Rlc2NlbmRpbmdcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkZXZpYXRpb259IGZyb20gXCIuL2RldmlhdGlvblwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGV4dGVudH0gZnJvbSBcIi4vZXh0ZW50XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaGlzdG9ncmFtfSBmcm9tIFwiLi9oaXN0b2dyYW1cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0aHJlc2hvbGRGcmVlZG1hbkRpYWNvbmlzfSBmcm9tIFwiLi90aHJlc2hvbGQvZnJlZWRtYW5EaWFjb25pc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRocmVzaG9sZFNjb3R0fSBmcm9tIFwiLi90aHJlc2hvbGQvc2NvdHRcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0aHJlc2hvbGRTdHVyZ2VzfSBmcm9tIFwiLi90aHJlc2hvbGQvc3R1cmdlc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1heH0gZnJvbSBcIi4vbWF4XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWVhbn0gZnJvbSBcIi4vbWVhblwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lZGlhbn0gZnJvbSBcIi4vbWVkaWFuXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWVyZ2V9IGZyb20gXCIuL21lcmdlXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWlufSBmcm9tIFwiLi9taW5cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBwYWlyc30gZnJvbSBcIi4vcGFpcnNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBwZXJtdXRlfSBmcm9tIFwiLi9wZXJtdXRlXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcXVhbnRpbGV9IGZyb20gXCIuL3F1YW50aWxlXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcmFuZ2V9IGZyb20gXCIuL3JhbmdlXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2Nhbn0gZnJvbSBcIi4vc2NhblwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNodWZmbGV9IGZyb20gXCIuL3NodWZmbGVcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzdW19IGZyb20gXCIuL3N1bVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRpY2tzLCB0aWNrSW5jcmVtZW50LCB0aWNrU3RlcH0gZnJvbSBcIi4vdGlja3NcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0cmFuc3Bvc2V9IGZyb20gXCIuL3RyYW5zcG9zZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHZhcmlhbmNlfSBmcm9tIFwiLi92YXJpYW5jZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHppcH0gZnJvbSBcIi4vemlwXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgaSA9IC0xLFxuICAgICAgdmFsdWUsXG4gICAgICBtYXg7XG5cbiAgaWYgKHZhbHVlb2YgPT0gbnVsbCkge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIEZpbmQgdGhlIGZpcnN0IGNvbXBhcmFibGUgdmFsdWUuXG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVzW2ldKSAhPSBudWxsICYmIHZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIG1heCA9IHZhbHVlO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBDb21wYXJlIHRoZSByZW1haW5pbmcgdmFsdWVzLlxuICAgICAgICAgIGlmICgodmFsdWUgPSB2YWx1ZXNbaV0pICE9IG51bGwgJiYgdmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgIG1heCA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVsc2Uge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIEZpbmQgdGhlIGZpcnN0IGNvbXBhcmFibGUgdmFsdWUuXG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVvZih2YWx1ZXNbaV0sIGksIHZhbHVlcykpICE9IG51bGwgJiYgdmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbWF4ID0gdmFsdWU7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIENvbXBhcmUgdGhlIHJlbWFpbmluZyB2YWx1ZXMuXG4gICAgICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSAhPSBudWxsICYmIHZhbHVlID4gbWF4KSB7XG4gICAgICAgICAgICBtYXggPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF4O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzLCB2YWx1ZW9mKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG0gPSBuLFxuICAgICAgaSA9IC0xLFxuICAgICAgdmFsdWUsXG4gICAgICBzdW0gPSAwO1xuXG4gIGlmICh2YWx1ZW9mID09IG51bGwpIHtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaWYgKCFpc05hTih2YWx1ZSA9IG51bWJlcih2YWx1ZXNbaV0pKSkgc3VtICs9IHZhbHVlO1xuICAgICAgZWxzZSAtLW07XG4gICAgfVxuICB9XG5cbiAgZWxzZSB7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmICghaXNOYU4odmFsdWUgPSBudW1iZXIodmFsdWVvZih2YWx1ZXNbaV0sIGksIHZhbHVlcykpKSkgc3VtICs9IHZhbHVlO1xuICAgICAgZWxzZSAtLW07XG4gICAgfVxuICB9XG5cbiAgaWYgKG0pIHJldHVybiBzdW0gLyBtO1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmdcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyXCI7XG5pbXBvcnQgcXVhbnRpbGUgZnJvbSBcIi4vcXVhbnRpbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzLCB2YWx1ZW9mKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIGkgPSAtMSxcbiAgICAgIHZhbHVlLFxuICAgICAgbnVtYmVycyA9IFtdO1xuXG4gIGlmICh2YWx1ZW9mID09IG51bGwpIHtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaWYgKCFpc05hTih2YWx1ZSA9IG51bWJlcih2YWx1ZXNbaV0pKSkge1xuICAgICAgICBudW1iZXJzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVsc2Uge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAoIWlzTmFOKHZhbHVlID0gbnVtYmVyKHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSkpIHtcbiAgICAgICAgbnVtYmVycy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcXVhbnRpbGUobnVtYmVycy5zb3J0KGFzY2VuZGluZyksIDAuNSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIG4gPSBhcnJheXMubGVuZ3RoLFxuICAgICAgbSxcbiAgICAgIGkgPSAtMSxcbiAgICAgIGogPSAwLFxuICAgICAgbWVyZ2VkLFxuICAgICAgYXJyYXk7XG5cbiAgd2hpbGUgKCsraSA8IG4pIGogKz0gYXJyYXlzW2ldLmxlbmd0aDtcbiAgbWVyZ2VkID0gbmV3IEFycmF5KGopO1xuXG4gIHdoaWxlICgtLW4gPj0gMCkge1xuICAgIGFycmF5ID0gYXJyYXlzW25dO1xuICAgIG0gPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKC0tbSA+PSAwKSB7XG4gICAgICBtZXJnZWRbLS1qXSA9IGFycmF5W21dO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZXJnZWQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgaSA9IC0xLFxuICAgICAgdmFsdWUsXG4gICAgICBtaW47XG5cbiAgaWYgKHZhbHVlb2YgPT0gbnVsbCkge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIEZpbmQgdGhlIGZpcnN0IGNvbXBhcmFibGUgdmFsdWUuXG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVzW2ldKSAhPSBudWxsICYmIHZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIG1pbiA9IHZhbHVlO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBDb21wYXJlIHRoZSByZW1haW5pbmcgdmFsdWVzLlxuICAgICAgICAgIGlmICgodmFsdWUgPSB2YWx1ZXNbaV0pICE9IG51bGwgJiYgbWluID4gdmFsdWUpIHtcbiAgICAgICAgICAgIG1pbiA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVsc2Uge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIEZpbmQgdGhlIGZpcnN0IGNvbXBhcmFibGUgdmFsdWUuXG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVvZih2YWx1ZXNbaV0sIGksIHZhbHVlcykpICE9IG51bGwgJiYgdmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbWluID0gdmFsdWU7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7IC8vIENvbXBhcmUgdGhlIHJlbWFpbmluZyB2YWx1ZXMuXG4gICAgICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSAhPSBudWxsICYmIG1pbiA+IHZhbHVlKSB7XG4gICAgICAgICAgICBtaW4gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWluO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCA9PT0gbnVsbCA/IE5hTiA6ICt4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgaWYgKGYgPT0gbnVsbCkgZiA9IHBhaXI7XG4gIHZhciBpID0gMCwgbiA9IGFycmF5Lmxlbmd0aCAtIDEsIHAgPSBhcnJheVswXSwgcGFpcnMgPSBuZXcgQXJyYXkobiA8IDAgPyAwIDogbik7XG4gIHdoaWxlIChpIDwgbikgcGFpcnNbaV0gPSBmKHAsIHAgPSBhcnJheVsrK2ldKTtcbiAgcmV0dXJuIHBhaXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFpcihhLCBiKSB7XG4gIHJldHVybiBbYSwgYl07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnJheSwgaW5kZXhlcykge1xuICB2YXIgaSA9IGluZGV4ZXMubGVuZ3RoLCBwZXJtdXRlcyA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSkgcGVybXV0ZXNbaV0gPSBhcnJheVtpbmRleGVzW2ldXTtcbiAgcmV0dXJuIHBlcm11dGVzO1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzLCBwLCB2YWx1ZW9mKSB7XG4gIGlmICh2YWx1ZW9mID09IG51bGwpIHZhbHVlb2YgPSBudW1iZXI7XG4gIGlmICghKG4gPSB2YWx1ZXMubGVuZ3RoKSkgcmV0dXJuO1xuICBpZiAoKHAgPSArcCkgPD0gMCB8fCBuIDwgMikgcmV0dXJuICt2YWx1ZW9mKHZhbHVlc1swXSwgMCwgdmFsdWVzKTtcbiAgaWYgKHAgPj0gMSkgcmV0dXJuICt2YWx1ZW9mKHZhbHVlc1tuIC0gMV0sIG4gLSAxLCB2YWx1ZXMpO1xuICB2YXIgbixcbiAgICAgIGkgPSAobiAtIDEpICogcCxcbiAgICAgIGkwID0gTWF0aC5mbG9vcihpKSxcbiAgICAgIHZhbHVlMCA9ICt2YWx1ZW9mKHZhbHVlc1tpMF0sIGkwLCB2YWx1ZXMpLFxuICAgICAgdmFsdWUxID0gK3ZhbHVlb2YodmFsdWVzW2kwICsgMV0sIGkwICsgMSwgdmFsdWVzKTtcbiAgcmV0dXJuIHZhbHVlMCArICh2YWx1ZTEgLSB2YWx1ZTApICogKGkgLSBpMCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICBzdGFydCA9ICtzdGFydCwgc3RvcCA9ICtzdG9wLCBzdGVwID0gKG4gPSBhcmd1bWVudHMubGVuZ3RoKSA8IDIgPyAoc3RvcCA9IHN0YXJ0LCBzdGFydCA9IDAsIDEpIDogbiA8IDMgPyAxIDogK3N0ZXA7XG5cbiAgdmFyIGkgPSAtMSxcbiAgICAgIG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSkgfCAwLFxuICAgICAgcmFuZ2UgPSBuZXcgQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICByYW5nZVtpXSA9IHN0YXJ0ICsgaSAqIHN0ZXA7XG4gIH1cblxuICByZXR1cm4gcmFuZ2U7XG59XG4iLCJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIGNvbXBhcmUpIHtcbiAgaWYgKCEobiA9IHZhbHVlcy5sZW5ndGgpKSByZXR1cm47XG4gIHZhciBuLFxuICAgICAgaSA9IDAsXG4gICAgICBqID0gMCxcbiAgICAgIHhpLFxuICAgICAgeGogPSB2YWx1ZXNbal07XG5cbiAgaWYgKGNvbXBhcmUgPT0gbnVsbCkgY29tcGFyZSA9IGFzY2VuZGluZztcblxuICB3aGlsZSAoKytpIDwgbikge1xuICAgIGlmIChjb21wYXJlKHhpID0gdmFsdWVzW2ldLCB4aikgPCAwIHx8IGNvbXBhcmUoeGosIHhqKSAhPT0gMCkge1xuICAgICAgeGogPSB4aSwgaiA9IGk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbXBhcmUoeGosIHhqKSA9PT0gMCkgcmV0dXJuIGo7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnJheSwgaTAsIGkxKSB7XG4gIHZhciBtID0gKGkxID09IG51bGwgPyBhcnJheS5sZW5ndGggOiBpMSkgLSAoaTAgPSBpMCA9PSBudWxsID8gMCA6ICtpMCksXG4gICAgICB0LFxuICAgICAgaTtcblxuICB3aGlsZSAobSkge1xuICAgIGkgPSBNYXRoLnJhbmRvbSgpICogbS0tIHwgMDtcbiAgICB0ID0gYXJyYXlbbSArIGkwXTtcbiAgICBhcnJheVttICsgaTBdID0gYXJyYXlbaSArIGkwXTtcbiAgICBhcnJheVtpICsgaTBdID0gdDtcbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlcywgdmFsdWVvZikge1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBpID0gLTEsXG4gICAgICB2YWx1ZSxcbiAgICAgIHN1bSA9IDA7XG5cbiAgaWYgKHZhbHVlb2YgPT0gbnVsbCkge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodmFsdWUgPSArdmFsdWVzW2ldKSBzdW0gKz0gdmFsdWU7IC8vIE5vdGU6IHplcm8gYW5kIG51bGwgYXJlIGVxdWl2YWxlbnQuXG4gICAgfVxuICB9XG5cbiAgZWxzZSB7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmICh2YWx1ZSA9ICt2YWx1ZW9mKHZhbHVlc1tpXSwgaSwgdmFsdWVzKSkgc3VtICs9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdW07XG59XG4iLCJpbXBvcnQge21hcH0gZnJvbSBcIi4uL2FycmF5XCI7XG5pbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuLi9hc2NlbmRpbmdcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlclwiO1xuaW1wb3J0IHF1YW50aWxlIGZyb20gXCIuLi9xdWFudGlsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIG1pbiwgbWF4KSB7XG4gIHZhbHVlcyA9IG1hcC5jYWxsKHZhbHVlcywgbnVtYmVyKS5zb3J0KGFzY2VuZGluZyk7XG4gIHJldHVybiBNYXRoLmNlaWwoKG1heCAtIG1pbikgLyAoMiAqIChxdWFudGlsZSh2YWx1ZXMsIDAuNzUpIC0gcXVhbnRpbGUodmFsdWVzLCAwLjI1KSkgKiBNYXRoLnBvdyh2YWx1ZXMubGVuZ3RoLCAtMSAvIDMpKSk7XG59XG4iLCJpbXBvcnQgZGV2aWF0aW9uIGZyb20gXCIuLi9kZXZpYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzLCBtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5jZWlsKChtYXggLSBtaW4pIC8gKDMuNSAqIGRldmlhdGlvbih2YWx1ZXMpICogTWF0aC5wb3codmFsdWVzLmxlbmd0aCwgLTEgLyAzKSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBNYXRoLmNlaWwoTWF0aC5sb2codmFsdWVzLmxlbmd0aCkgLyBNYXRoLkxOMikgKyAxO1xufVxuIiwidmFyIGUxMCA9IE1hdGguc3FydCg1MCksXG4gICAgZTUgPSBNYXRoLnNxcnQoMTApLFxuICAgIGUyID0gTWF0aC5zcXJ0KDIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgdmFyIHJldmVyc2UsXG4gICAgICBpID0gLTEsXG4gICAgICBuLFxuICAgICAgdGlja3MsXG4gICAgICBzdGVwO1xuXG4gIHN0b3AgPSArc3RvcCwgc3RhcnQgPSArc3RhcnQsIGNvdW50ID0gK2NvdW50O1xuICBpZiAoc3RhcnQgPT09IHN0b3AgJiYgY291bnQgPiAwKSByZXR1cm4gW3N0YXJ0XTtcbiAgaWYgKHJldmVyc2UgPSBzdG9wIDwgc3RhcnQpIG4gPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gbjtcbiAgaWYgKChzdGVwID0gdGlja0luY3JlbWVudChzdGFydCwgc3RvcCwgY291bnQpKSA9PT0gMCB8fCAhaXNGaW5pdGUoc3RlcCkpIHJldHVybiBbXTtcblxuICBpZiAoc3RlcCA+IDApIHtcbiAgICBzdGFydCA9IE1hdGguY2VpbChzdGFydCAvIHN0ZXApO1xuICAgIHN0b3AgPSBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKTtcbiAgICB0aWNrcyA9IG5ldyBBcnJheShuID0gTWF0aC5jZWlsKHN0b3AgLSBzdGFydCArIDEpKTtcbiAgICB3aGlsZSAoKytpIDwgbikgdGlja3NbaV0gPSAoc3RhcnQgKyBpKSAqIHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgc3RhcnQgPSBNYXRoLmZsb29yKHN0YXJ0ICogc3RlcCk7XG4gICAgc3RvcCA9IE1hdGguY2VpbChzdG9wICogc3RlcCk7XG4gICAgdGlja3MgPSBuZXcgQXJyYXkobiA9IE1hdGguY2VpbChzdGFydCAtIHN0b3AgKyAxKSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHN0YXJ0IC0gaSkgLyBzdGVwO1xuICB9XG5cbiAgaWYgKHJldmVyc2UpIHRpY2tzLnJldmVyc2UoKTtcblxuICByZXR1cm4gdGlja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgcG93ZXIgPSBNYXRoLmZsb29yKE1hdGgubG9nKHN0ZXApIC8gTWF0aC5MTjEwKSxcbiAgICAgIGVycm9yID0gc3RlcCAvIE1hdGgucG93KDEwLCBwb3dlcik7XG4gIHJldHVybiBwb3dlciA+PSAwXG4gICAgICA/IChlcnJvciA+PSBlMTAgPyAxMCA6IGVycm9yID49IGU1ID8gNSA6IGVycm9yID49IGUyID8gMiA6IDEpICogTWF0aC5wb3coMTAsIHBvd2VyKVxuICAgICAgOiAtTWF0aC5wb3coMTAsIC1wb3dlcikgLyAoZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcDAgPSBNYXRoLmFicyhzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgc3RlcDEgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzdGVwMCkgLyBNYXRoLkxOMTApKSxcbiAgICAgIGVycm9yID0gc3RlcDAgLyBzdGVwMTtcbiAgaWYgKGVycm9yID49IGUxMCkgc3RlcDEgKj0gMTA7XG4gIGVsc2UgaWYgKGVycm9yID49IGU1KSBzdGVwMSAqPSA1O1xuICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcDEgKj0gMjtcbiAgcmV0dXJuIHN0b3AgPCBzdGFydCA/IC1zdGVwMSA6IHN0ZXAxO1xufVxuIiwiaW1wb3J0IG1pbiBmcm9tIFwiLi9taW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0cml4KSB7XG4gIGlmICghKG4gPSBtYXRyaXgubGVuZ3RoKSkgcmV0dXJuIFtdO1xuICBmb3IgKHZhciBpID0gLTEsIG0gPSBtaW4obWF0cml4LCBsZW5ndGgpLCB0cmFuc3Bvc2UgPSBuZXcgQXJyYXkobSk7ICsraSA8IG07KSB7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBuLCByb3cgPSB0cmFuc3Bvc2VbaV0gPSBuZXcgQXJyYXkobik7ICsraiA8IG47KSB7XG4gICAgICByb3dbal0gPSBtYXRyaXhbal1baV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0cmFuc3Bvc2U7XG59XG5cbmZ1bmN0aW9uIGxlbmd0aChkKSB7XG4gIHJldHVybiBkLmxlbmd0aDtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlcywgdmFsdWVvZikge1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBtID0gMCxcbiAgICAgIGkgPSAtMSxcbiAgICAgIG1lYW4gPSAwLFxuICAgICAgdmFsdWUsXG4gICAgICBkZWx0YSxcbiAgICAgIHN1bSA9IDA7XG5cbiAgaWYgKHZhbHVlb2YgPT0gbnVsbCkge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAoIWlzTmFOKHZhbHVlID0gbnVtYmVyKHZhbHVlc1tpXSkpKSB7XG4gICAgICAgIGRlbHRhID0gdmFsdWUgLSBtZWFuO1xuICAgICAgICBtZWFuICs9IGRlbHRhIC8gKyttO1xuICAgICAgICBzdW0gKz0gZGVsdGEgKiAodmFsdWUgLSBtZWFuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbHNlIHtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaWYgKCFpc05hTih2YWx1ZSA9IG51bWJlcih2YWx1ZW9mKHZhbHVlc1tpXSwgaSwgdmFsdWVzKSkpKSB7XG4gICAgICAgIGRlbHRhID0gdmFsdWUgLSBtZWFuO1xuICAgICAgICBtZWFuICs9IGRlbHRhIC8gKyttO1xuICAgICAgICBzdW0gKz0gZGVsdGEgKiAodmFsdWUgLSBtZWFuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAobSA+IDEpIHJldHVybiBzdW0gLyAobSAtIDEpO1xufVxuIiwiaW1wb3J0IHRyYW5zcG9zZSBmcm9tIFwiLi90cmFuc3Bvc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cmFuc3Bvc2UoYXJndW1lbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hcCkge1xuICB2YXIgZW50cmllcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gbWFwKSBlbnRyaWVzLnB1c2goe2tleToga2V5LCB2YWx1ZTogbWFwW2tleV19KTtcbiAgcmV0dXJuIGVudHJpZXM7XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgbmVzdH0gZnJvbSBcIi4vbmVzdFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNldH0gZnJvbSBcIi4vc2V0XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWFwfSBmcm9tIFwiLi9tYXBcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBrZXlzfSBmcm9tIFwiLi9rZXlzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdmFsdWVzfSBmcm9tIFwiLi92YWx1ZXNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBlbnRyaWVzfSBmcm9tIFwiLi9lbnRyaWVzXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXApIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG1hcCkga2V5cy5wdXNoKGtleSk7XG4gIHJldHVybiBrZXlzO1xufVxuIiwiZXhwb3J0IHZhciBwcmVmaXggPSBcIiRcIjtcblxuZnVuY3Rpb24gTWFwKCkge31cblxuTWFwLnByb3RvdHlwZSA9IG1hcC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBNYXAsXG4gIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIChwcmVmaXggKyBrZXkpIGluIHRoaXM7XG4gIH0sXG4gIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXNbcHJlZml4ICsga2V5XTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgdGhpc1twcmVmaXggKyBrZXldID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIHByb3BlcnR5ID0gcHJlZml4ICsga2V5O1xuICAgIHJldHVybiBwcm9wZXJ0eSBpbiB0aGlzICYmIGRlbGV0ZSB0aGlzW3Byb3BlcnR5XTtcbiAgfSxcbiAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSBkZWxldGUgdGhpc1twcm9wZXJ0eV07XG4gIH0sXG4gIGtleXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIGtleXMucHVzaChwcm9wZXJ0eS5zbGljZSgxKSk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH0sXG4gIHZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSB2YWx1ZXMucHVzaCh0aGlzW3Byb3BlcnR5XSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSxcbiAgZW50cmllczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgZW50cmllcy5wdXNoKHtrZXk6IHByb3BlcnR5LnNsaWNlKDEpLCB2YWx1ZTogdGhpc1twcm9wZXJ0eV19KTtcbiAgICByZXR1cm4gZW50cmllcztcbiAgfSxcbiAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNpemUgPSAwO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSArK3NpemU7XG4gICAgcmV0dXJuIHNpemU7XG4gIH0sXG4gIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBlYWNoOiBmdW5jdGlvbihmKSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIGYodGhpc1twcm9wZXJ0eV0sIHByb3BlcnR5LnNsaWNlKDEpLCB0aGlzKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gbWFwKG9iamVjdCwgZikge1xuICB2YXIgbWFwID0gbmV3IE1hcDtcblxuICAvLyBDb3B5IGNvbnN0cnVjdG9yLlxuICBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSBvYmplY3QuZWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7IG1hcC5zZXQoa2V5LCB2YWx1ZSk7IH0pO1xuXG4gIC8vIEluZGV4IGFycmF5IGJ5IG51bWVyaWMgaW5kZXggb3Igc3BlY2lmaWVkIGtleSBmdW5jdGlvbi5cbiAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgdmFyIGkgPSAtMSxcbiAgICAgICAgbiA9IG9iamVjdC5sZW5ndGgsXG4gICAgICAgIG87XG5cbiAgICBpZiAoZiA9PSBudWxsKSB3aGlsZSAoKytpIDwgbikgbWFwLnNldChpLCBvYmplY3RbaV0pO1xuICAgIGVsc2Ugd2hpbGUgKCsraSA8IG4pIG1hcC5zZXQoZihvID0gb2JqZWN0W2ldLCBpLCBvYmplY3QpLCBvKTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgb2JqZWN0IHRvIG1hcC5cbiAgZWxzZSBpZiAob2JqZWN0KSBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBtYXAuc2V0KGtleSwgb2JqZWN0W2tleV0pO1xuXG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcDtcbiIsImltcG9ydCBtYXAgZnJvbSBcIi4vbWFwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIga2V5cyA9IFtdLFxuICAgICAgc29ydEtleXMgPSBbXSxcbiAgICAgIHNvcnRWYWx1ZXMsXG4gICAgICByb2xsdXAsXG4gICAgICBuZXN0O1xuXG4gIGZ1bmN0aW9uIGFwcGx5KGFycmF5LCBkZXB0aCwgY3JlYXRlUmVzdWx0LCBzZXRSZXN1bHQpIHtcbiAgICBpZiAoZGVwdGggPj0ga2V5cy5sZW5ndGgpIHtcbiAgICAgIGlmIChzb3J0VmFsdWVzICE9IG51bGwpIGFycmF5LnNvcnQoc29ydFZhbHVlcyk7XG4gICAgICByZXR1cm4gcm9sbHVwICE9IG51bGwgPyByb2xsdXAoYXJyYXkpIDogYXJyYXk7XG4gICAgfVxuXG4gICAgdmFyIGkgPSAtMSxcbiAgICAgICAgbiA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAga2V5ID0ga2V5c1tkZXB0aCsrXSxcbiAgICAgICAga2V5VmFsdWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB2YWx1ZXNCeUtleSA9IG1hcCgpLFxuICAgICAgICB2YWx1ZXMsXG4gICAgICAgIHJlc3VsdCA9IGNyZWF0ZVJlc3VsdCgpO1xuXG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmICh2YWx1ZXMgPSB2YWx1ZXNCeUtleS5nZXQoa2V5VmFsdWUgPSBrZXkodmFsdWUgPSBhcnJheVtpXSkgKyBcIlwiKSkge1xuICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZXNCeUtleS5zZXQoa2V5VmFsdWUsIFt2YWx1ZV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbHVlc0J5S2V5LmVhY2goZnVuY3Rpb24odmFsdWVzLCBrZXkpIHtcbiAgICAgIHNldFJlc3VsdChyZXN1bHQsIGtleSwgYXBwbHkodmFsdWVzLCBkZXB0aCwgY3JlYXRlUmVzdWx0LCBzZXRSZXN1bHQpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBlbnRyaWVzKG1hcCwgZGVwdGgpIHtcbiAgICBpZiAoKytkZXB0aCA+IGtleXMubGVuZ3RoKSByZXR1cm4gbWFwO1xuICAgIHZhciBhcnJheSwgc29ydEtleSA9IHNvcnRLZXlzW2RlcHRoIC0gMV07XG4gICAgaWYgKHJvbGx1cCAhPSBudWxsICYmIGRlcHRoID49IGtleXMubGVuZ3RoKSBhcnJheSA9IG1hcC5lbnRyaWVzKCk7XG4gICAgZWxzZSBhcnJheSA9IFtdLCBtYXAuZWFjaChmdW5jdGlvbih2LCBrKSB7IGFycmF5LnB1c2goe2tleTogaywgdmFsdWVzOiBlbnRyaWVzKHYsIGRlcHRoKX0pOyB9KTtcbiAgICByZXR1cm4gc29ydEtleSAhPSBudWxsID8gYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBzb3J0S2V5KGEua2V5LCBiLmtleSk7IH0pIDogYXJyYXk7XG4gIH1cblxuICByZXR1cm4gbmVzdCA9IHtcbiAgICBvYmplY3Q6IGZ1bmN0aW9uKGFycmF5KSB7IHJldHVybiBhcHBseShhcnJheSwgMCwgY3JlYXRlT2JqZWN0LCBzZXRPYmplY3QpOyB9LFxuICAgIG1hcDogZnVuY3Rpb24oYXJyYXkpIHsgcmV0dXJuIGFwcGx5KGFycmF5LCAwLCBjcmVhdGVNYXAsIHNldE1hcCk7IH0sXG4gICAgZW50cmllczogZnVuY3Rpb24oYXJyYXkpIHsgcmV0dXJuIGVudHJpZXMoYXBwbHkoYXJyYXksIDAsIGNyZWF0ZU1hcCwgc2V0TWFwKSwgMCk7IH0sXG4gICAga2V5OiBmdW5jdGlvbihkKSB7IGtleXMucHVzaChkKTsgcmV0dXJuIG5lc3Q7IH0sXG4gICAgc29ydEtleXM6IGZ1bmN0aW9uKG9yZGVyKSB7IHNvcnRLZXlzW2tleXMubGVuZ3RoIC0gMV0gPSBvcmRlcjsgcmV0dXJuIG5lc3Q7IH0sXG4gICAgc29ydFZhbHVlczogZnVuY3Rpb24ob3JkZXIpIHsgc29ydFZhbHVlcyA9IG9yZGVyOyByZXR1cm4gbmVzdDsgfSxcbiAgICByb2xsdXA6IGZ1bmN0aW9uKGYpIHsgcm9sbHVwID0gZjsgcmV0dXJuIG5lc3Q7IH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0KCkge1xuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHNldE9iamVjdChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWFwKCkge1xuICByZXR1cm4gbWFwKCk7XG59XG5cbmZ1bmN0aW9uIHNldE1hcChtYXAsIGtleSwgdmFsdWUpIHtcbiAgbWFwLnNldChrZXksIHZhbHVlKTtcbn1cbiIsImltcG9ydCB7ZGVmYXVsdCBhcyBtYXAsIHByZWZpeH0gZnJvbSBcIi4vbWFwXCI7XG5cbmZ1bmN0aW9uIFNldCgpIHt9XG5cbnZhciBwcm90byA9IG1hcC5wcm90b3R5cGU7XG5cblNldC5wcm90b3R5cGUgPSBzZXQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogU2V0LFxuICBoYXM6IHByb3RvLmhhcyxcbiAgYWRkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhbHVlICs9IFwiXCI7XG4gICAgdGhpc1twcmVmaXggKyB2YWx1ZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgcmVtb3ZlOiBwcm90by5yZW1vdmUsXG4gIGNsZWFyOiBwcm90by5jbGVhcixcbiAgdmFsdWVzOiBwcm90by5rZXlzLFxuICBzaXplOiBwcm90by5zaXplLFxuICBlbXB0eTogcHJvdG8uZW1wdHksXG4gIGVhY2g6IHByb3RvLmVhY2hcbn07XG5cbmZ1bmN0aW9uIHNldChvYmplY3QsIGYpIHtcbiAgdmFyIHNldCA9IG5ldyBTZXQ7XG5cbiAgLy8gQ29weSBjb25zdHJ1Y3Rvci5cbiAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFNldCkgb2JqZWN0LmVhY2goZnVuY3Rpb24odmFsdWUpIHsgc2V0LmFkZCh2YWx1ZSk7IH0pO1xuXG4gIC8vIE90aGVyd2lzZSwgYXNzdW1lIGl04oCZcyBhbiBhcnJheS5cbiAgZWxzZSBpZiAob2JqZWN0KSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IG9iamVjdC5sZW5ndGg7XG4gICAgaWYgKGYgPT0gbnVsbCkgd2hpbGUgKCsraSA8IG4pIHNldC5hZGQob2JqZWN0W2ldKTtcbiAgICBlbHNlIHdoaWxlICgrK2kgPCBuKSBzZXQuYWRkKGYob2JqZWN0W2ldLCBpLCBvYmplY3QpKTtcbiAgfVxuXG4gIHJldHVybiBzZXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hcCkge1xuICB2YXIgdmFsdWVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBtYXApIHZhbHVlcy5wdXNoKG1hcFtrZXldKTtcbiAgcmV0dXJuIHZhbHVlcztcbn1cbiIsImltcG9ydCBkZWZpbmUsIHtleHRlbmR9IGZyb20gXCIuL2RlZmluZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29sb3IoKSB7fVxuXG5leHBvcnQgdmFyIGRhcmtlciA9IDAuNztcbmV4cG9ydCB2YXIgYnJpZ2h0ZXIgPSAxIC8gZGFya2VyO1xuXG52YXIgcmVJID0gXCJcXFxccyooWystXT9cXFxcZCspXFxcXHMqXCIsXG4gICAgcmVOID0gXCJcXFxccyooWystXT9cXFxcZCpcXFxcLj9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dP1xcXFxkKlxcXFwuP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZUksIHJlSSwgcmVJXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiYUludGVnZXIgPSBuZXcgUmVnRXhwKFwiXnJnYmFcXFxcKFwiICsgW3JlSSwgcmVJLCByZUksIHJlTl0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5yZ2JhXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQLCByZU5dICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5oc2xcXFxcKFwiICsgW3JlTiwgcmVQLCByZVBdICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJeaHNsYVxcXFwoXCIgKyBbcmVOLCByZVAsIHJlUCwgcmVOXSArIFwiXFxcXCkkXCIpO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5OiBmdW5jdGlvbihjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZ2IoKS5kaXNwbGF5YWJsZSgpO1xuICB9LFxuICBoZXg6IGNvbG9yX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiBjb2xvcl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhzbDogY29sb3JfZm9ybWF0SHNsLFxuICBmb3JtYXRSZ2I6IGNvbG9yX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IGNvbG9yX2Zvcm1hdFJnYlxufSk7XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICgtMC41IDw9IHRoaXMuciAmJiB0aGlzLnIgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5nICYmIHRoaXMuZyA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmIgJiYgdGhpcy5iIDwgMjU1LjUpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGhleDogcmdiX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiByZ2JfZm9ybWF0SGV4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBcIiNcIiArIGhleCh0aGlzLnIpICsgaGV4KHRoaXMuZykgKyBoZXgodGhpcy5iKTtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdFJnYigpIHtcbiAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gIHJldHVybiAoYSA9PT0gMSA/IFwicmdiKFwiIDogXCJyZ2JhKFwiKVxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5yKSB8fCAwKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMuZykgfHwgMCkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLmIpIHx8IDApKVxuICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IHRoaXMub3BhY2l0eTsgYSA9IGlzTmFOKGEpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGEpKTtcbiAgICByZXR1cm4gKGEgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIilcbiAgICAgICAgKyAodGhpcy5oIHx8IDApICsgXCIsIFwiXG4gICAgICAgICsgKHRoaXMucyB8fCAwKSAqIDEwMCArIFwiJSwgXCJcbiAgICAgICAgKyAodGhpcy5sIHx8IDApICogMTAwICsgXCIlXCJcbiAgICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbiAgfVxufSkpO1xuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcbmltcG9ydCB7Q29sb3IsIHJnYkNvbnZlcnQsIFJnYiwgZGFya2VyLCBicmlnaHRlcn0gZnJvbSBcIi4vY29sb3IuanNcIjtcbmltcG9ydCB7ZGVnMnJhZCwgcmFkMmRlZ30gZnJvbSBcIi4vbWF0aC5qc1wiO1xuXG52YXIgQSA9IC0wLjE0ODYxLFxuICAgIEIgPSArMS43ODI3NyxcbiAgICBDID0gLTAuMjkyMjcsXG4gICAgRCA9IC0wLjkwNjQ5LFxuICAgIEUgPSArMS45NzI5NCxcbiAgICBFRCA9IEUgKiBELFxuICAgIEVCID0gRSAqIEIsXG4gICAgQkNfREEgPSBCICogQyAtIEQgKiBBO1xuXG5mdW5jdGlvbiBjdWJlaGVsaXhDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBDdWJlaGVsaXgpIHJldHVybiBuZXcgQ3ViZWhlbGl4KG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBSZ2IpKSBvID0gcmdiQ29udmVydChvKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIGwgPSAoQkNfREEgKiBiICsgRUQgKiByIC0gRUIgKiBnKSAvIChCQ19EQSArIEVEIC0gRUIpLFxuICAgICAgYmwgPSBiIC0gbCxcbiAgICAgIGsgPSAoRSAqIChnIC0gbCkgLSBDICogYmwpIC8gRCxcbiAgICAgIHMgPSBNYXRoLnNxcnQoayAqIGsgKyBibCAqIGJsKSAvIChFICogbCAqICgxIC0gbCkpLCAvLyBOYU4gaWYgbD0wIG9yIGw9MVxuICAgICAgaCA9IHMgPyBNYXRoLmF0YW4yKGssIGJsKSAqIHJhZDJkZWcgLSAxMjAgOiBOYU47XG4gIHJldHVybiBuZXcgQ3ViZWhlbGl4KGggPCAwID8gaCArIDM2MCA6IGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGN1YmVoZWxpeChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gY3ViZWhlbGl4Q29udmVydChoKSA6IG5ldyBDdWJlaGVsaXgoaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3ViZWhlbGl4KGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShDdWJlaGVsaXgsIGN1YmVoZWxpeCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgQ3ViZWhlbGl4KHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEN1YmVoZWxpeCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaCA9IGlzTmFOKHRoaXMuaCkgPyAwIDogKHRoaXMuaCArIDEyMCkgKiBkZWcycmFkLFxuICAgICAgICBsID0gK3RoaXMubCxcbiAgICAgICAgYSA9IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zICogbCAqICgxIC0gbCksXG4gICAgICAgIGNvc2ggPSBNYXRoLmNvcyhoKSxcbiAgICAgICAgc2luaCA9IE1hdGguc2luKGgpO1xuICAgIHJldHVybiBuZXcgUmdiKFxuICAgICAgMjU1ICogKGwgKyBhICogKEEgKiBjb3NoICsgQiAqIHNpbmgpKSxcbiAgICAgIDI1NSAqIChsICsgYSAqIChDICogY29zaCArIEQgKiBzaW5oKSksXG4gICAgICAyNTUgKiAobCArIGEgKiAoRSAqIGNvc2gpKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH1cbn0pKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gZmFjdG9yeS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgZGVmaW5pdGlvbikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb24pIHByb3RvdHlwZVtrZXldID0gZGVmaW5pdGlvbltrZXldO1xuICByZXR1cm4gcHJvdG90eXBlO1xufVxuIiwiaW1wb3J0IGRlZmluZSwge2V4dGVuZH0gZnJvbSBcIi4vZGVmaW5lLmpzXCI7XG5pbXBvcnQge0NvbG9yLCByZ2JDb252ZXJ0LCBSZ2J9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5pbXBvcnQge2RlZzJyYWQsIHJhZDJkZWd9IGZyb20gXCIuL21hdGguanNcIjtcblxuLy8gaHR0cHM6Ly9vYnNlcnZhYmxlaHEuY29tL0BtYm9zdG9jay9sYWItYW5kLXJnYlxudmFyIEsgPSAxOCxcbiAgICBYbiA9IDAuOTY0MjIsXG4gICAgWW4gPSAxLFxuICAgIFpuID0gMC44MjUyMSxcbiAgICB0MCA9IDQgLyAyOSxcbiAgICB0MSA9IDYgLyAyOSxcbiAgICB0MiA9IDMgKiB0MSAqIHQxLFxuICAgIHQzID0gdDEgKiB0MSAqIHQxO1xuXG5mdW5jdGlvbiBsYWJDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBMYWIpIHJldHVybiBuZXcgTGFiKG8ubCwgby5hLCBvLmIsIG8ub3BhY2l0eSk7XG4gIGlmIChvIGluc3RhbmNlb2YgSGNsKSByZXR1cm4gaGNsMmxhYihvKTtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIFJnYikpIG8gPSByZ2JDb252ZXJ0KG8pO1xuICB2YXIgciA9IHJnYjJscmdiKG8uciksXG4gICAgICBnID0gcmdiMmxyZ2Ioby5nKSxcbiAgICAgIGIgPSByZ2IybHJnYihvLmIpLFxuICAgICAgeSA9IHh5ejJsYWIoKDAuMjIyNTA0NSAqIHIgKyAwLjcxNjg3ODYgKiBnICsgMC4wNjA2MTY5ICogYikgLyBZbiksIHgsIHo7XG4gIGlmIChyID09PSBnICYmIGcgPT09IGIpIHggPSB6ID0geTsgZWxzZSB7XG4gICAgeCA9IHh5ejJsYWIoKDAuNDM2MDc0NyAqIHIgKyAwLjM4NTA2NDkgKiBnICsgMC4xNDMwODA0ICogYikgLyBYbik7XG4gICAgeiA9IHh5ejJsYWIoKDAuMDEzOTMyMiAqIHIgKyAwLjA5NzEwNDUgKiBnICsgMC43MTQxNzMzICogYikgLyBabik7XG4gIH1cbiAgcmV0dXJuIG5ldyBMYWIoMTE2ICogeSAtIDE2LCA1MDAgKiAoeCAtIHkpLCAyMDAgKiAoeSAtIHopLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JheShsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBuZXcgTGFiKGwsIDAsIDAsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFiKGwsIGEsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBsYWJDb252ZXJ0KGwpIDogbmV3IExhYihsLCBhLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMYWIobCwgYSwgYiwgb3BhY2l0eSkge1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5hID0gK2E7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKExhYiwgbGFiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXI6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gbmV3IExhYih0aGlzLmwgKyBLICogKGsgPT0gbnVsbCA/IDEgOiBrKSwgdGhpcy5hLCB0aGlzLmIsIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcjogZnVuY3Rpb24oaykge1xuICAgIHJldHVybiBuZXcgTGFiKHRoaXMubCAtIEsgKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgeSA9ICh0aGlzLmwgKyAxNikgLyAxMTYsXG4gICAgICAgIHggPSBpc05hTih0aGlzLmEpID8geSA6IHkgKyB0aGlzLmEgLyA1MDAsXG4gICAgICAgIHogPSBpc05hTih0aGlzLmIpID8geSA6IHkgLSB0aGlzLmIgLyAyMDA7XG4gICAgeCA9IFhuICogbGFiMnh5eih4KTtcbiAgICB5ID0gWW4gKiBsYWIyeHl6KHkpO1xuICAgIHogPSBabiAqIGxhYjJ4eXooeik7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBscmdiMnJnYiggMy4xMzM4NTYxICogeCAtIDEuNjE2ODY2NyAqIHkgLSAwLjQ5MDYxNDYgKiB6KSxcbiAgICAgIGxyZ2IycmdiKC0wLjk3ODc2ODQgKiB4ICsgMS45MTYxNDE1ICogeSArIDAuMDMzNDU0MCAqIHopLFxuICAgICAgbHJnYjJyZ2IoIDAuMDcxOTQ1MyAqIHggLSAwLjIyODk5MTQgKiB5ICsgMS40MDUyNDI3ICogeiksXG4gICAgICB0aGlzLm9wYWNpdHlcbiAgICApO1xuICB9XG59KSk7XG5cbmZ1bmN0aW9uIHh5ejJsYWIodCkge1xuICByZXR1cm4gdCA+IHQzID8gTWF0aC5wb3codCwgMSAvIDMpIDogdCAvIHQyICsgdDA7XG59XG5cbmZ1bmN0aW9uIGxhYjJ4eXoodCkge1xuICByZXR1cm4gdCA+IHQxID8gdCAqIHQgKiB0IDogdDIgKiAodCAtIHQwKTtcbn1cblxuZnVuY3Rpb24gbHJnYjJyZ2IoeCkge1xuICByZXR1cm4gMjU1ICogKHggPD0gMC4wMDMxMzA4ID8gMTIuOTIgKiB4IDogMS4wNTUgKiBNYXRoLnBvdyh4LCAxIC8gMi40KSAtIDAuMDU1KTtcbn1cblxuZnVuY3Rpb24gcmdiMmxyZ2IoeCkge1xuICByZXR1cm4gKHggLz0gMjU1KSA8PSAwLjA0MDQ1ID8geCAvIDEyLjkyIDogTWF0aC5wb3coKHggKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbn1cblxuZnVuY3Rpb24gaGNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSGNsKSByZXR1cm4gbmV3IEhjbChvLmgsIG8uYywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgTGFiKSkgbyA9IGxhYkNvbnZlcnQobyk7XG4gIGlmIChvLmEgPT09IDAgJiYgby5iID09PSAwKSByZXR1cm4gbmV3IEhjbChOYU4sIDAgPCBvLmwgJiYgby5sIDwgMTAwID8gMCA6IE5hTiwgby5sLCBvLm9wYWNpdHkpO1xuICB2YXIgaCA9IE1hdGguYXRhbjIoby5iLCBvLmEpICogcmFkMmRlZztcbiAgcmV0dXJuIG5ldyBIY2woaCA8IDAgPyBoICsgMzYwIDogaCwgTWF0aC5zcXJ0KG8uYSAqIG8uYSArIG8uYiAqIG8uYiksIG8ubCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxjaChsLCBjLCBoLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaGNsQ29udmVydChsKSA6IG5ldyBIY2woaCwgYywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGNsKGgsIGMsIGwsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoY2xDb252ZXJ0KGgpIDogbmV3IEhjbChoLCBjLCBsLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIY2woaCwgYywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5jID0gK2M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZnVuY3Rpb24gaGNsMmxhYihvKSB7XG4gIGlmIChpc05hTihvLmgpKSByZXR1cm4gbmV3IExhYihvLmwsIDAsIDAsIG8ub3BhY2l0eSk7XG4gIHZhciBoID0gby5oICogZGVnMnJhZDtcbiAgcmV0dXJuIG5ldyBMYWIoby5sLCBNYXRoLmNvcyhoKSAqIG8uYywgTWF0aC5zaW4oaCkgKiBvLmMsIG8ub3BhY2l0eSk7XG59XG5cbmRlZmluZShIY2wsIGhjbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIG5ldyBIY2wodGhpcy5oLCB0aGlzLmMsIHRoaXMubCArIEsgKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gbmV3IEhjbCh0aGlzLmgsIHRoaXMuYywgdGhpcy5sIC0gSyAqIChrID09IG51bGwgPyAxIDogayksIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGhjbDJsYWIodGhpcykucmdiKCk7XG4gIH1cbn0pKTtcbiIsImV4cG9ydCB2YXIgZGVnMnJhZCA9IE1hdGguUEkgLyAxODA7XG5leHBvcnQgdmFyIHJhZDJkZWcgPSAxODAgLyBNYXRoLlBJO1xuIiwidmFyIG5vb3AgPSB7dmFsdWU6IGZ1bmN0aW9uKCkge319O1xuXG5mdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoLCBfID0ge30sIHQ7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoISh0ID0gYXJndW1lbnRzW2ldICsgXCJcIikgfHwgKHQgaW4gXykgfHwgL1tcXHMuXS8udGVzdCh0KSkgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0eXBlOiBcIiArIHQpO1xuICAgIF9bdF0gPSBbXTtcbiAgfVxuICByZXR1cm4gbmV3IERpc3BhdGNoKF8pO1xufVxuXG5mdW5jdGlvbiBEaXNwYXRjaChfKSB7XG4gIHRoaXMuXyA9IF87XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcywgdHlwZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIGlmICh0ICYmICF0eXBlcy5oYXNPd25Qcm9wZXJ0eSh0KSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHQpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5EaXNwYXRjaC5wcm90b3R5cGUgPSBkaXNwYXRjaC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBEaXNwYXRjaCxcbiAgb246IGZ1bmN0aW9uKHR5cGVuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBfID0gdGhpcy5fLFxuICAgICAgICBUID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiLCBfKSxcbiAgICAgICAgdCxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gVC5sZW5ndGg7XG5cbiAgICAvLyBJZiBubyBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZXR1cm4gdGhlIGNhbGxiYWNrIG9mIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpICYmICh0ID0gZ2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUpKSkgcmV0dXJuIHQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWQsIHNldCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSBudWxsIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJlbW92ZSBjYWxsYmFja3Mgb2YgdGhlIGdpdmVuIG5hbWUuXG4gICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgY2FsbGJhY2s6IFwiICsgY2FsbGJhY2spO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgY2FsbGJhY2spO1xuICAgICAgZWxzZSBpZiAoY2FsbGJhY2sgPT0gbnVsbCkgZm9yICh0IGluIF8pIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3B5ID0ge30sIF8gPSB0aGlzLl87XG4gICAgZm9yICh2YXIgdCBpbiBfKSBjb3B5W3RdID0gX1t0XS5zbGljZSgpO1xuICAgIHJldHVybiBuZXcgRGlzcGF0Y2goY29weSk7XG4gIH0sXG4gIGNhbGw6IGZ1bmN0aW9uKHR5cGUsIHRoYXQpIHtcbiAgICBpZiAoKG4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMikgPiAwKSBmb3IgKHZhciBhcmdzID0gbmV3IEFycmF5KG4pLCBpID0gMCwgbiwgdDsgaSA8IG47ICsraSkgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbih0eXBlLCB0aGF0LCBhcmdzKSB7XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHZhciB0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXQodHlwZSwgbmFtZSkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoLCBjOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKChjID0gdHlwZVtpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldCh0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKHR5cGVbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgdHlwZVtpXSA9IG5vb3AsIHR5cGUgPSB0eXBlLnNsaWNlKDAsIGkpLmNvbmNhdCh0eXBlLnNsaWNlKGkgKyAxKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHR5cGUucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IGNhbGxiYWNrfSk7XG4gIHJldHVybiB0eXBlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHkpIHtcbiAgdmFyIG5vZGVzO1xuXG4gIGlmICh4ID09IG51bGwpIHggPSAwO1xuICBpZiAoeSA9PSBudWxsKSB5ID0gMDtcblxuICBmdW5jdGlvbiBmb3JjZSgpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbiA9IG5vZGVzLmxlbmd0aCxcbiAgICAgICAgbm9kZSxcbiAgICAgICAgc3ggPSAwLFxuICAgICAgICBzeSA9IDA7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBub2RlID0gbm9kZXNbaV0sIHN4ICs9IG5vZGUueCwgc3kgKz0gbm9kZS55O1xuICAgIH1cblxuICAgIGZvciAoc3ggPSBzeCAvIG4gLSB4LCBzeSA9IHN5IC8gbiAtIHksIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBub2RlID0gbm9kZXNbaV0sIG5vZGUueCAtPSBzeCwgbm9kZS55IC09IHN5O1xuICAgIH1cbiAgfVxuXG4gIGZvcmNlLmluaXRpYWxpemUgPSBmdW5jdGlvbihfKSB7XG4gICAgbm9kZXMgPSBfO1xuICB9O1xuXG4gIGZvcmNlLnggPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeCA9ICtfLCBmb3JjZSkgOiB4O1xuICB9O1xuXG4gIGZvcmNlLnkgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeSA9ICtfLCBmb3JjZSkgOiB5O1xuICB9O1xuXG4gIHJldHVybiBmb3JjZTtcbn1cbiIsImltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudFwiO1xuaW1wb3J0IGppZ2dsZSBmcm9tIFwiLi9qaWdnbGVcIjtcbmltcG9ydCB7cXVhZHRyZWV9IGZyb20gXCJkMy1xdWFkdHJlZVwiO1xuXG5mdW5jdGlvbiB4KGQpIHtcbiAgcmV0dXJuIGQueCArIGQudng7XG59XG5cbmZ1bmN0aW9uIHkoZCkge1xuICByZXR1cm4gZC55ICsgZC52eTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmFkaXVzKSB7XG4gIHZhciBub2RlcyxcbiAgICAgIHJhZGlpLFxuICAgICAgc3RyZW5ndGggPSAxLFxuICAgICAgaXRlcmF0aW9ucyA9IDE7XG5cbiAgaWYgKHR5cGVvZiByYWRpdXMgIT09IFwiZnVuY3Rpb25cIikgcmFkaXVzID0gY29uc3RhbnQocmFkaXVzID09IG51bGwgPyAxIDogK3JhZGl1cyk7XG5cbiAgZnVuY3Rpb24gZm9yY2UoKSB7XG4gICAgdmFyIGksIG4gPSBub2Rlcy5sZW5ndGgsXG4gICAgICAgIHRyZWUsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIHhpLFxuICAgICAgICB5aSxcbiAgICAgICAgcmksXG4gICAgICAgIHJpMjtcblxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgaXRlcmF0aW9uczsgKytrKSB7XG4gICAgICB0cmVlID0gcXVhZHRyZWUobm9kZXMsIHgsIHkpLnZpc2l0QWZ0ZXIocHJlcGFyZSk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgcmkgPSByYWRpaVtub2RlLmluZGV4XSwgcmkyID0gcmkgKiByaTtcbiAgICAgICAgeGkgPSBub2RlLnggKyBub2RlLnZ4O1xuICAgICAgICB5aSA9IG5vZGUueSArIG5vZGUudnk7XG4gICAgICAgIHRyZWUudmlzaXQoYXBwbHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5KHF1YWQsIHgwLCB5MCwgeDEsIHkxKSB7XG4gICAgICB2YXIgZGF0YSA9IHF1YWQuZGF0YSwgcmogPSBxdWFkLnIsIHIgPSByaSArIHJqO1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuaW5kZXggPiBub2RlLmluZGV4KSB7XG4gICAgICAgICAgdmFyIHggPSB4aSAtIGRhdGEueCAtIGRhdGEudngsXG4gICAgICAgICAgICAgIHkgPSB5aSAtIGRhdGEueSAtIGRhdGEudnksXG4gICAgICAgICAgICAgIGwgPSB4ICogeCArIHkgKiB5O1xuICAgICAgICAgIGlmIChsIDwgciAqIHIpIHtcbiAgICAgICAgICAgIGlmICh4ID09PSAwKSB4ID0gamlnZ2xlKCksIGwgKz0geCAqIHg7XG4gICAgICAgICAgICBpZiAoeSA9PT0gMCkgeSA9IGppZ2dsZSgpLCBsICs9IHkgKiB5O1xuICAgICAgICAgICAgbCA9IChyIC0gKGwgPSBNYXRoLnNxcnQobCkpKSAvIGwgKiBzdHJlbmd0aDtcbiAgICAgICAgICAgIG5vZGUudnggKz0gKHggKj0gbCkgKiAociA9IChyaiAqPSByaikgLyAocmkyICsgcmopKTtcbiAgICAgICAgICAgIG5vZGUudnkgKz0gKHkgKj0gbCkgKiByO1xuICAgICAgICAgICAgZGF0YS52eCAtPSB4ICogKHIgPSAxIC0gcik7XG4gICAgICAgICAgICBkYXRhLnZ5IC09IHkgKiByO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4geDAgPiB4aSArIHIgfHwgeDEgPCB4aSAtIHIgfHwgeTAgPiB5aSArIHIgfHwgeTEgPCB5aSAtIHI7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZShxdWFkKSB7XG4gICAgaWYgKHF1YWQuZGF0YSkgcmV0dXJuIHF1YWQuciA9IHJhZGlpW3F1YWQuZGF0YS5pbmRleF07XG4gICAgZm9yICh2YXIgaSA9IHF1YWQuciA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgIGlmIChxdWFkW2ldICYmIHF1YWRbaV0uciA+IHF1YWQucikge1xuICAgICAgICBxdWFkLnIgPSBxdWFkW2ldLnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAoIW5vZGVzKSByZXR1cm47XG4gICAgdmFyIGksIG4gPSBub2Rlcy5sZW5ndGgsIG5vZGU7XG4gICAgcmFkaWkgPSBuZXcgQXJyYXkobik7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgbm9kZSA9IG5vZGVzW2ldLCByYWRpaVtub2RlLmluZGV4XSA9ICtyYWRpdXMobm9kZSwgaSwgbm9kZXMpO1xuICB9XG5cbiAgZm9yY2UuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBub2RlcyA9IF87XG4gICAgaW5pdGlhbGl6ZSgpO1xuICB9O1xuXG4gIGZvcmNlLml0ZXJhdGlvbnMgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoaXRlcmF0aW9ucyA9ICtfLCBmb3JjZSkgOiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIGZvcmNlLnN0cmVuZ3RoID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHN0cmVuZ3RoID0gK18sIGZvcmNlKSA6IHN0cmVuZ3RoO1xuICB9O1xuXG4gIGZvcmNlLnJhZGl1cyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyYWRpdXMgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KCtfKSwgaW5pdGlhbGl6ZSgpLCBmb3JjZSkgOiByYWRpdXM7XG4gIH07XG5cbiAgcmV0dXJuIGZvcmNlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgZm9yY2VDZW50ZXJ9IGZyb20gXCIuL2NlbnRlclwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZvcmNlQ29sbGlkZX0gZnJvbSBcIi4vY29sbGlkZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZvcmNlTGlua30gZnJvbSBcIi4vbGlua1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZvcmNlTWFueUJvZHl9IGZyb20gXCIuL21hbnlCb2R5XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgZm9yY2VSYWRpYWx9IGZyb20gXCIuL3JhZGlhbFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZvcmNlU2ltdWxhdGlvbn0gZnJvbSBcIi4vc2ltdWxhdGlvblwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZvcmNlWH0gZnJvbSBcIi4veFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZvcmNlWX0gZnJvbSBcIi4veVwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxZS02O1xufVxuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50XCI7XG5pbXBvcnQgamlnZ2xlIGZyb20gXCIuL2ppZ2dsZVwiO1xuaW1wb3J0IHttYXB9IGZyb20gXCJkMy1jb2xsZWN0aW9uXCI7XG5cbmZ1bmN0aW9uIGluZGV4KGQpIHtcbiAgcmV0dXJuIGQuaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQobm9kZUJ5SWQsIG5vZGVJZCkge1xuICB2YXIgbm9kZSA9IG5vZGVCeUlkLmdldChub2RlSWQpO1xuICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcihcIm1pc3Npbmc6IFwiICsgbm9kZUlkKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGxpbmtzKSB7XG4gIHZhciBpZCA9IGluZGV4LFxuICAgICAgc3RyZW5ndGggPSBkZWZhdWx0U3RyZW5ndGgsXG4gICAgICBzdHJlbmd0aHMsXG4gICAgICBkaXN0YW5jZSA9IGNvbnN0YW50KDMwKSxcbiAgICAgIGRpc3RhbmNlcyxcbiAgICAgIG5vZGVzLFxuICAgICAgY291bnQsXG4gICAgICBiaWFzLFxuICAgICAgaXRlcmF0aW9ucyA9IDE7XG5cbiAgaWYgKGxpbmtzID09IG51bGwpIGxpbmtzID0gW107XG5cbiAgZnVuY3Rpb24gZGVmYXVsdFN0cmVuZ3RoKGxpbmspIHtcbiAgICByZXR1cm4gMSAvIE1hdGgubWluKGNvdW50W2xpbmsuc291cmNlLmluZGV4XSwgY291bnRbbGluay50YXJnZXQuaW5kZXhdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcmNlKGFscGhhKSB7XG4gICAgZm9yICh2YXIgayA9IDAsIG4gPSBsaW5rcy5sZW5ndGg7IGsgPCBpdGVyYXRpb25zOyArK2spIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsaW5rLCBzb3VyY2UsIHRhcmdldCwgeCwgeSwgbCwgYjsgaSA8IG47ICsraSkge1xuICAgICAgICBsaW5rID0gbGlua3NbaV0sIHNvdXJjZSA9IGxpbmsuc291cmNlLCB0YXJnZXQgPSBsaW5rLnRhcmdldDtcbiAgICAgICAgeCA9IHRhcmdldC54ICsgdGFyZ2V0LnZ4IC0gc291cmNlLnggLSBzb3VyY2UudnggfHwgamlnZ2xlKCk7XG4gICAgICAgIHkgPSB0YXJnZXQueSArIHRhcmdldC52eSAtIHNvdXJjZS55IC0gc291cmNlLnZ5IHx8IGppZ2dsZSgpO1xuICAgICAgICBsID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgICAgICBsID0gKGwgLSBkaXN0YW5jZXNbaV0pIC8gbCAqIGFscGhhICogc3RyZW5ndGhzW2ldO1xuICAgICAgICB4ICo9IGwsIHkgKj0gbDtcbiAgICAgICAgdGFyZ2V0LnZ4IC09IHggKiAoYiA9IGJpYXNbaV0pO1xuICAgICAgICB0YXJnZXQudnkgLT0geSAqIGI7XG4gICAgICAgIHNvdXJjZS52eCArPSB4ICogKGIgPSAxIC0gYik7XG4gICAgICAgIHNvdXJjZS52eSArPSB5ICogYjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGlmICghbm9kZXMpIHJldHVybjtcblxuICAgIHZhciBpLFxuICAgICAgICBuID0gbm9kZXMubGVuZ3RoLFxuICAgICAgICBtID0gbGlua3MubGVuZ3RoLFxuICAgICAgICBub2RlQnlJZCA9IG1hcChub2RlcywgaWQpLFxuICAgICAgICBsaW5rO1xuXG4gICAgZm9yIChpID0gMCwgY291bnQgPSBuZXcgQXJyYXkobik7IGkgPCBtOyArK2kpIHtcbiAgICAgIGxpbmsgPSBsaW5rc1tpXSwgbGluay5pbmRleCA9IGk7XG4gICAgICBpZiAodHlwZW9mIGxpbmsuc291cmNlICE9PSBcIm9iamVjdFwiKSBsaW5rLnNvdXJjZSA9IGZpbmQobm9kZUJ5SWQsIGxpbmsuc291cmNlKTtcbiAgICAgIGlmICh0eXBlb2YgbGluay50YXJnZXQgIT09IFwib2JqZWN0XCIpIGxpbmsudGFyZ2V0ID0gZmluZChub2RlQnlJZCwgbGluay50YXJnZXQpO1xuICAgICAgY291bnRbbGluay5zb3VyY2UuaW5kZXhdID0gKGNvdW50W2xpbmsuc291cmNlLmluZGV4XSB8fCAwKSArIDE7XG4gICAgICBjb3VudFtsaW5rLnRhcmdldC5pbmRleF0gPSAoY291bnRbbGluay50YXJnZXQuaW5kZXhdIHx8IDApICsgMTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwLCBiaWFzID0gbmV3IEFycmF5KG0pOyBpIDwgbTsgKytpKSB7XG4gICAgICBsaW5rID0gbGlua3NbaV0sIGJpYXNbaV0gPSBjb3VudFtsaW5rLnNvdXJjZS5pbmRleF0gLyAoY291bnRbbGluay5zb3VyY2UuaW5kZXhdICsgY291bnRbbGluay50YXJnZXQuaW5kZXhdKTtcbiAgICB9XG5cbiAgICBzdHJlbmd0aHMgPSBuZXcgQXJyYXkobSksIGluaXRpYWxpemVTdHJlbmd0aCgpO1xuICAgIGRpc3RhbmNlcyA9IG5ldyBBcnJheShtKSwgaW5pdGlhbGl6ZURpc3RhbmNlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0aWFsaXplU3RyZW5ndGgoKSB7XG4gICAgaWYgKCFub2RlcykgcmV0dXJuO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBsaW5rcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHN0cmVuZ3Roc1tpXSA9ICtzdHJlbmd0aChsaW5rc1tpXSwgaSwgbGlua3MpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemVEaXN0YW5jZSgpIHtcbiAgICBpZiAoIW5vZGVzKSByZXR1cm47XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGxpbmtzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgZGlzdGFuY2VzW2ldID0gK2Rpc3RhbmNlKGxpbmtzW2ldLCBpLCBsaW5rcyk7XG4gICAgfVxuICB9XG5cbiAgZm9yY2UuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBub2RlcyA9IF87XG4gICAgaW5pdGlhbGl6ZSgpO1xuICB9O1xuXG4gIGZvcmNlLmxpbmtzID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGxpbmtzID0gXywgaW5pdGlhbGl6ZSgpLCBmb3JjZSkgOiBsaW5rcztcbiAgfTtcblxuICBmb3JjZS5pZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpZCA9IF8sIGZvcmNlKSA6IGlkO1xuICB9O1xuXG4gIGZvcmNlLml0ZXJhdGlvbnMgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoaXRlcmF0aW9ucyA9ICtfLCBmb3JjZSkgOiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIGZvcmNlLnN0cmVuZ3RoID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHN0cmVuZ3RoID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCgrXyksIGluaXRpYWxpemVTdHJlbmd0aCgpLCBmb3JjZSkgOiBzdHJlbmd0aDtcbiAgfTtcblxuICBmb3JjZS5kaXN0YW5jZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkaXN0YW5jZSA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoK18pLCBpbml0aWFsaXplRGlzdGFuY2UoKSwgZm9yY2UpIDogZGlzdGFuY2U7XG4gIH07XG5cbiAgcmV0dXJuIGZvcmNlO1xufVxuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50XCI7XG5pbXBvcnQgamlnZ2xlIGZyb20gXCIuL2ppZ2dsZVwiO1xuaW1wb3J0IHtxdWFkdHJlZX0gZnJvbSBcImQzLXF1YWR0cmVlXCI7XG5pbXBvcnQge3gsIHl9IGZyb20gXCIuL3NpbXVsYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBub2RlcyxcbiAgICAgIG5vZGUsXG4gICAgICBhbHBoYSxcbiAgICAgIHN0cmVuZ3RoID0gY29uc3RhbnQoLTMwKSxcbiAgICAgIHN0cmVuZ3RocyxcbiAgICAgIGRpc3RhbmNlTWluMiA9IDEsXG4gICAgICBkaXN0YW5jZU1heDIgPSBJbmZpbml0eSxcbiAgICAgIHRoZXRhMiA9IDAuODE7XG5cbiAgZnVuY3Rpb24gZm9yY2UoXykge1xuICAgIHZhciBpLCBuID0gbm9kZXMubGVuZ3RoLCB0cmVlID0gcXVhZHRyZWUobm9kZXMsIHgsIHkpLnZpc2l0QWZ0ZXIoYWNjdW11bGF0ZSk7XG4gICAgZm9yIChhbHBoYSA9IF8sIGkgPSAwOyBpIDwgbjsgKytpKSBub2RlID0gbm9kZXNbaV0sIHRyZWUudmlzaXQoYXBwbHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAoIW5vZGVzKSByZXR1cm47XG4gICAgdmFyIGksIG4gPSBub2Rlcy5sZW5ndGgsIG5vZGU7XG4gICAgc3RyZW5ndGhzID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIG5vZGUgPSBub2Rlc1tpXSwgc3RyZW5ndGhzW25vZGUuaW5kZXhdID0gK3N0cmVuZ3RoKG5vZGUsIGksIG5vZGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFjY3VtdWxhdGUocXVhZCkge1xuICAgIHZhciBzdHJlbmd0aCA9IDAsIHEsIGMsIHdlaWdodCA9IDAsIHgsIHksIGk7XG5cbiAgICAvLyBGb3IgaW50ZXJuYWwgbm9kZXMsIGFjY3VtdWxhdGUgZm9yY2VzIGZyb20gY2hpbGQgcXVhZHJhbnRzLlxuICAgIGlmIChxdWFkLmxlbmd0aCkge1xuICAgICAgZm9yICh4ID0geSA9IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgIGlmICgocSA9IHF1YWRbaV0pICYmIChjID0gTWF0aC5hYnMocS52YWx1ZSkpKSB7XG4gICAgICAgICAgc3RyZW5ndGggKz0gcS52YWx1ZSwgd2VpZ2h0ICs9IGMsIHggKz0gYyAqIHEueCwgeSArPSBjICogcS55O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBxdWFkLnggPSB4IC8gd2VpZ2h0O1xuICAgICAgcXVhZC55ID0geSAvIHdlaWdodDtcbiAgICB9XG5cbiAgICAvLyBGb3IgbGVhZiBub2RlcywgYWNjdW11bGF0ZSBmb3JjZXMgZnJvbSBjb2luY2lkZW50IHF1YWRyYW50cy5cbiAgICBlbHNlIHtcbiAgICAgIHEgPSBxdWFkO1xuICAgICAgcS54ID0gcS5kYXRhLng7XG4gICAgICBxLnkgPSBxLmRhdGEueTtcbiAgICAgIGRvIHN0cmVuZ3RoICs9IHN0cmVuZ3Roc1txLmRhdGEuaW5kZXhdO1xuICAgICAgd2hpbGUgKHEgPSBxLm5leHQpO1xuICAgIH1cblxuICAgIHF1YWQudmFsdWUgPSBzdHJlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5KHF1YWQsIHgxLCBfLCB4Mikge1xuICAgIGlmICghcXVhZC52YWx1ZSkgcmV0dXJuIHRydWU7XG5cbiAgICB2YXIgeCA9IHF1YWQueCAtIG5vZGUueCxcbiAgICAgICAgeSA9IHF1YWQueSAtIG5vZGUueSxcbiAgICAgICAgdyA9IHgyIC0geDEsXG4gICAgICAgIGwgPSB4ICogeCArIHkgKiB5O1xuXG4gICAgLy8gQXBwbHkgdGhlIEJhcm5lcy1IdXQgYXBwcm94aW1hdGlvbiBpZiBwb3NzaWJsZS5cbiAgICAvLyBMaW1pdCBmb3JjZXMgZm9yIHZlcnkgY2xvc2Ugbm9kZXM7IHJhbmRvbWl6ZSBkaXJlY3Rpb24gaWYgY29pbmNpZGVudC5cbiAgICBpZiAodyAqIHcgLyB0aGV0YTIgPCBsKSB7XG4gICAgICBpZiAobCA8IGRpc3RhbmNlTWF4Mikge1xuICAgICAgICBpZiAoeCA9PT0gMCkgeCA9IGppZ2dsZSgpLCBsICs9IHggKiB4O1xuICAgICAgICBpZiAoeSA9PT0gMCkgeSA9IGppZ2dsZSgpLCBsICs9IHkgKiB5O1xuICAgICAgICBpZiAobCA8IGRpc3RhbmNlTWluMikgbCA9IE1hdGguc3FydChkaXN0YW5jZU1pbjIgKiBsKTtcbiAgICAgICAgbm9kZS52eCArPSB4ICogcXVhZC52YWx1ZSAqIGFscGhhIC8gbDtcbiAgICAgICAgbm9kZS52eSArPSB5ICogcXVhZC52YWx1ZSAqIGFscGhhIC8gbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgcHJvY2VzcyBwb2ludHMgZGlyZWN0bHkuXG4gICAgZWxzZSBpZiAocXVhZC5sZW5ndGggfHwgbCA+PSBkaXN0YW5jZU1heDIpIHJldHVybjtcblxuICAgIC8vIExpbWl0IGZvcmNlcyBmb3IgdmVyeSBjbG9zZSBub2RlczsgcmFuZG9taXplIGRpcmVjdGlvbiBpZiBjb2luY2lkZW50LlxuICAgIGlmIChxdWFkLmRhdGEgIT09IG5vZGUgfHwgcXVhZC5uZXh0KSB7XG4gICAgICBpZiAoeCA9PT0gMCkgeCA9IGppZ2dsZSgpLCBsICs9IHggKiB4O1xuICAgICAgaWYgKHkgPT09IDApIHkgPSBqaWdnbGUoKSwgbCArPSB5ICogeTtcbiAgICAgIGlmIChsIDwgZGlzdGFuY2VNaW4yKSBsID0gTWF0aC5zcXJ0KGRpc3RhbmNlTWluMiAqIGwpO1xuICAgIH1cblxuICAgIGRvIGlmIChxdWFkLmRhdGEgIT09IG5vZGUpIHtcbiAgICAgIHcgPSBzdHJlbmd0aHNbcXVhZC5kYXRhLmluZGV4XSAqIGFscGhhIC8gbDtcbiAgICAgIG5vZGUudnggKz0geCAqIHc7XG4gICAgICBub2RlLnZ5ICs9IHkgKiB3O1xuICAgIH0gd2hpbGUgKHF1YWQgPSBxdWFkLm5leHQpO1xuICB9XG5cbiAgZm9yY2UuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBub2RlcyA9IF87XG4gICAgaW5pdGlhbGl6ZSgpO1xuICB9O1xuXG4gIGZvcmNlLnN0cmVuZ3RoID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHN0cmVuZ3RoID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCgrXyksIGluaXRpYWxpemUoKSwgZm9yY2UpIDogc3RyZW5ndGg7XG4gIH07XG5cbiAgZm9yY2UuZGlzdGFuY2VNaW4gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZGlzdGFuY2VNaW4yID0gXyAqIF8sIGZvcmNlKSA6IE1hdGguc3FydChkaXN0YW5jZU1pbjIpO1xuICB9O1xuXG4gIGZvcmNlLmRpc3RhbmNlTWF4ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRpc3RhbmNlTWF4MiA9IF8gKiBfLCBmb3JjZSkgOiBNYXRoLnNxcnQoZGlzdGFuY2VNYXgyKTtcbiAgfTtcblxuICBmb3JjZS50aGV0YSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aGV0YTIgPSBfICogXywgZm9yY2UpIDogTWF0aC5zcXJ0KHRoZXRhMik7XG4gIH07XG5cbiAgcmV0dXJuIGZvcmNlO1xufVxuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJhZGl1cywgeCwgeSkge1xuICB2YXIgbm9kZXMsXG4gICAgICBzdHJlbmd0aCA9IGNvbnN0YW50KDAuMSksXG4gICAgICBzdHJlbmd0aHMsXG4gICAgICByYWRpdXNlcztcblxuICBpZiAodHlwZW9mIHJhZGl1cyAhPT0gXCJmdW5jdGlvblwiKSByYWRpdXMgPSBjb25zdGFudCgrcmFkaXVzKTtcbiAgaWYgKHggPT0gbnVsbCkgeCA9IDA7XG4gIGlmICh5ID09IG51bGwpIHkgPSAwO1xuXG4gIGZ1bmN0aW9uIGZvcmNlKGFscGhhKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBub2Rlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBub2RlID0gbm9kZXNbaV0sXG4gICAgICAgICAgZHggPSBub2RlLnggLSB4IHx8IDFlLTYsXG4gICAgICAgICAgZHkgPSBub2RlLnkgLSB5IHx8IDFlLTYsXG4gICAgICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSksXG4gICAgICAgICAgayA9IChyYWRpdXNlc1tpXSAtIHIpICogc3RyZW5ndGhzW2ldICogYWxwaGEgLyByO1xuICAgICAgbm9kZS52eCArPSBkeCAqIGs7XG4gICAgICBub2RlLnZ5ICs9IGR5ICogaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGlmICghbm9kZXMpIHJldHVybjtcbiAgICB2YXIgaSwgbiA9IG5vZGVzLmxlbmd0aDtcbiAgICBzdHJlbmd0aHMgPSBuZXcgQXJyYXkobik7XG4gICAgcmFkaXVzZXMgPSBuZXcgQXJyYXkobik7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgcmFkaXVzZXNbaV0gPSArcmFkaXVzKG5vZGVzW2ldLCBpLCBub2Rlcyk7XG4gICAgICBzdHJlbmd0aHNbaV0gPSBpc05hTihyYWRpdXNlc1tpXSkgPyAwIDogK3N0cmVuZ3RoKG5vZGVzW2ldLCBpLCBub2Rlcyk7XG4gICAgfVxuICB9XG5cbiAgZm9yY2UuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBub2RlcyA9IF8sIGluaXRpYWxpemUoKTtcbiAgfTtcblxuICBmb3JjZS5zdHJlbmd0aCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzdHJlbmd0aCA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoK18pLCBpbml0aWFsaXplKCksIGZvcmNlKSA6IHN0cmVuZ3RoO1xuICB9O1xuXG4gIGZvcmNlLnJhZGl1cyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyYWRpdXMgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KCtfKSwgaW5pdGlhbGl6ZSgpLCBmb3JjZSkgOiByYWRpdXM7XG4gIH07XG5cbiAgZm9yY2UueCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh4ID0gK18sIGZvcmNlKSA6IHg7XG4gIH07XG5cbiAgZm9yY2UueSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh5ID0gK18sIGZvcmNlKSA6IHk7XG4gIH07XG5cbiAgcmV0dXJuIGZvcmNlO1xufVxuIiwiaW1wb3J0IHtkaXNwYXRjaH0gZnJvbSBcImQzLWRpc3BhdGNoXCI7XG5pbXBvcnQge21hcH0gZnJvbSBcImQzLWNvbGxlY3Rpb25cIjtcbmltcG9ydCB7dGltZXJ9IGZyb20gXCJkMy10aW1lclwiO1xuXG5leHBvcnQgZnVuY3Rpb24geChkKSB7XG4gIHJldHVybiBkLng7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5KGQpIHtcbiAgcmV0dXJuIGQueTtcbn1cblxudmFyIGluaXRpYWxSYWRpdXMgPSAxMCxcbiAgICBpbml0aWFsQW5nbGUgPSBNYXRoLlBJICogKDMgLSBNYXRoLnNxcnQoNSkpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2Rlcykge1xuICB2YXIgc2ltdWxhdGlvbixcbiAgICAgIGFscGhhID0gMSxcbiAgICAgIGFscGhhTWluID0gMC4wMDEsXG4gICAgICBhbHBoYURlY2F5ID0gMSAtIE1hdGgucG93KGFscGhhTWluLCAxIC8gMzAwKSxcbiAgICAgIGFscGhhVGFyZ2V0ID0gMCxcbiAgICAgIHZlbG9jaXR5RGVjYXkgPSAwLjYsXG4gICAgICBmb3JjZXMgPSBtYXAoKSxcbiAgICAgIHN0ZXBwZXIgPSB0aW1lcihzdGVwKSxcbiAgICAgIGV2ZW50ID0gZGlzcGF0Y2goXCJ0aWNrXCIsIFwiZW5kXCIpO1xuXG4gIGlmIChub2RlcyA9PSBudWxsKSBub2RlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgdGljaygpO1xuICAgIGV2ZW50LmNhbGwoXCJ0aWNrXCIsIHNpbXVsYXRpb24pO1xuICAgIGlmIChhbHBoYSA8IGFscGhhTWluKSB7XG4gICAgICBzdGVwcGVyLnN0b3AoKTtcbiAgICAgIGV2ZW50LmNhbGwoXCJlbmRcIiwgc2ltdWxhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGljayhpdGVyYXRpb25zKSB7XG4gICAgdmFyIGksIG4gPSBub2Rlcy5sZW5ndGgsIG5vZGU7XG5cbiAgICBpZiAoaXRlcmF0aW9ucyA9PT0gdW5kZWZpbmVkKSBpdGVyYXRpb25zID0gMTtcblxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgaXRlcmF0aW9uczsgKytrKSB7XG4gICAgICBhbHBoYSArPSAoYWxwaGFUYXJnZXQgLSBhbHBoYSkgKiBhbHBoYURlY2F5O1xuXG4gICAgICBmb3JjZXMuZWFjaChmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgZm9yY2UoYWxwaGEpO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5meCA9PSBudWxsKSBub2RlLnggKz0gbm9kZS52eCAqPSB2ZWxvY2l0eURlY2F5O1xuICAgICAgICBlbHNlIG5vZGUueCA9IG5vZGUuZngsIG5vZGUudnggPSAwO1xuICAgICAgICBpZiAobm9kZS5meSA9PSBudWxsKSBub2RlLnkgKz0gbm9kZS52eSAqPSB2ZWxvY2l0eURlY2F5O1xuICAgICAgICBlbHNlIG5vZGUueSA9IG5vZGUuZnksIG5vZGUudnkgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzaW11bGF0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZU5vZGVzKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gbm9kZXMubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBub2RlID0gbm9kZXNbaV0sIG5vZGUuaW5kZXggPSBpO1xuICAgICAgaWYgKG5vZGUuZnggIT0gbnVsbCkgbm9kZS54ID0gbm9kZS5meDtcbiAgICAgIGlmIChub2RlLmZ5ICE9IG51bGwpIG5vZGUueSA9IG5vZGUuZnk7XG4gICAgICBpZiAoaXNOYU4obm9kZS54KSB8fCBpc05hTihub2RlLnkpKSB7XG4gICAgICAgIHZhciByYWRpdXMgPSBpbml0aWFsUmFkaXVzICogTWF0aC5zcXJ0KGkpLCBhbmdsZSA9IGkgKiBpbml0aWFsQW5nbGU7XG4gICAgICAgIG5vZGUueCA9IHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgbm9kZS55ID0gcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzTmFOKG5vZGUudngpIHx8IGlzTmFOKG5vZGUudnkpKSB7XG4gICAgICAgIG5vZGUudnggPSBub2RlLnZ5ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0aWFsaXplRm9yY2UoZm9yY2UpIHtcbiAgICBpZiAoZm9yY2UuaW5pdGlhbGl6ZSkgZm9yY2UuaW5pdGlhbGl6ZShub2Rlcyk7XG4gICAgcmV0dXJuIGZvcmNlO1xuICB9XG5cbiAgaW5pdGlhbGl6ZU5vZGVzKCk7XG5cbiAgcmV0dXJuIHNpbXVsYXRpb24gPSB7XG4gICAgdGljazogdGljayxcblxuICAgIHJlc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHN0ZXBwZXIucmVzdGFydChzdGVwKSwgc2ltdWxhdGlvbjtcbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc3RlcHBlci5zdG9wKCksIHNpbXVsYXRpb247XG4gICAgfSxcblxuICAgIG5vZGVzOiBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChub2RlcyA9IF8sIGluaXRpYWxpemVOb2RlcygpLCBmb3JjZXMuZWFjaChpbml0aWFsaXplRm9yY2UpLCBzaW11bGF0aW9uKSA6IG5vZGVzO1xuICAgIH0sXG5cbiAgICBhbHBoYTogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoYWxwaGEgPSArXywgc2ltdWxhdGlvbikgOiBhbHBoYTtcbiAgICB9LFxuXG4gICAgYWxwaGFNaW46IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGFscGhhTWluID0gK18sIHNpbXVsYXRpb24pIDogYWxwaGFNaW47XG4gICAgfSxcblxuICAgIGFscGhhRGVjYXk6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGFscGhhRGVjYXkgPSArXywgc2ltdWxhdGlvbikgOiArYWxwaGFEZWNheTtcbiAgICB9LFxuXG4gICAgYWxwaGFUYXJnZXQ6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGFscGhhVGFyZ2V0ID0gK18sIHNpbXVsYXRpb24pIDogYWxwaGFUYXJnZXQ7XG4gICAgfSxcblxuICAgIHZlbG9jaXR5RGVjYXk6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHZlbG9jaXR5RGVjYXkgPSAxIC0gXywgc2ltdWxhdGlvbikgOiAxIC0gdmVsb2NpdHlEZWNheTtcbiAgICB9LFxuXG4gICAgZm9yY2U6IGZ1bmN0aW9uKG5hbWUsIF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMSA/ICgoXyA9PSBudWxsID8gZm9yY2VzLnJlbW92ZShuYW1lKSA6IGZvcmNlcy5zZXQobmFtZSwgaW5pdGlhbGl6ZUZvcmNlKF8pKSksIHNpbXVsYXRpb24pIDogZm9yY2VzLmdldChuYW1lKTtcbiAgICB9LFxuXG4gICAgZmluZDogZnVuY3Rpb24oeCwgeSwgcmFkaXVzKSB7XG4gICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgbiA9IG5vZGVzLmxlbmd0aCxcbiAgICAgICAgICBkeCxcbiAgICAgICAgICBkeSxcbiAgICAgICAgICBkMixcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIGNsb3Nlc3Q7XG5cbiAgICAgIGlmIChyYWRpdXMgPT0gbnVsbCkgcmFkaXVzID0gSW5maW5pdHk7XG4gICAgICBlbHNlIHJhZGl1cyAqPSByYWRpdXM7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBkeCA9IHggLSBub2RlLng7XG4gICAgICAgIGR5ID0geSAtIG5vZGUueTtcbiAgICAgICAgZDIgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgaWYgKGQyIDwgcmFkaXVzKSBjbG9zZXN0ID0gbm9kZSwgcmFkaXVzID0gZDI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbG9zZXN0O1xuICAgIH0sXG5cbiAgICBvbjogZnVuY3Rpb24obmFtZSwgXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gKGV2ZW50Lm9uKG5hbWUsIF8pLCBzaW11bGF0aW9uKSA6IGV2ZW50Lm9uKG5hbWUpO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHZhciBzdHJlbmd0aCA9IGNvbnN0YW50KDAuMSksXG4gICAgICBub2RlcyxcbiAgICAgIHN0cmVuZ3RocyxcbiAgICAgIHh6O1xuXG4gIGlmICh0eXBlb2YgeCAhPT0gXCJmdW5jdGlvblwiKSB4ID0gY29uc3RhbnQoeCA9PSBudWxsID8gMCA6ICt4KTtcblxuICBmdW5jdGlvbiBmb3JjZShhbHBoYSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gbm9kZXMubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBub2RlID0gbm9kZXNbaV0sIG5vZGUudnggKz0gKHh6W2ldIC0gbm9kZS54KSAqIHN0cmVuZ3Roc1tpXSAqIGFscGhhO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgaWYgKCFub2RlcykgcmV0dXJuO1xuICAgIHZhciBpLCBuID0gbm9kZXMubGVuZ3RoO1xuICAgIHN0cmVuZ3RocyA9IG5ldyBBcnJheShuKTtcbiAgICB4eiA9IG5ldyBBcnJheShuKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBzdHJlbmd0aHNbaV0gPSBpc05hTih4eltpXSA9ICt4KG5vZGVzW2ldLCBpLCBub2RlcykpID8gMCA6ICtzdHJlbmd0aChub2Rlc1tpXSwgaSwgbm9kZXMpO1xuICAgIH1cbiAgfVxuXG4gIGZvcmNlLmluaXRpYWxpemUgPSBmdW5jdGlvbihfKSB7XG4gICAgbm9kZXMgPSBfO1xuICAgIGluaXRpYWxpemUoKTtcbiAgfTtcblxuICBmb3JjZS5zdHJlbmd0aCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzdHJlbmd0aCA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoK18pLCBpbml0aWFsaXplKCksIGZvcmNlKSA6IHN0cmVuZ3RoO1xuICB9O1xuXG4gIGZvcmNlLnggPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeCA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoK18pLCBpbml0aWFsaXplKCksIGZvcmNlKSA6IHg7XG4gIH07XG5cbiAgcmV0dXJuIGZvcmNlO1xufVxuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHkpIHtcbiAgdmFyIHN0cmVuZ3RoID0gY29uc3RhbnQoMC4xKSxcbiAgICAgIG5vZGVzLFxuICAgICAgc3RyZW5ndGhzLFxuICAgICAgeXo7XG5cbiAgaWYgKHR5cGVvZiB5ICE9PSBcImZ1bmN0aW9uXCIpIHkgPSBjb25zdGFudCh5ID09IG51bGwgPyAwIDogK3kpO1xuXG4gIGZ1bmN0aW9uIGZvcmNlKGFscGhhKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBub2Rlcy5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIG5vZGUgPSBub2Rlc1tpXSwgbm9kZS52eSArPSAoeXpbaV0gLSBub2RlLnkpICogc3RyZW5ndGhzW2ldICogYWxwaGE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAoIW5vZGVzKSByZXR1cm47XG4gICAgdmFyIGksIG4gPSBub2Rlcy5sZW5ndGg7XG4gICAgc3RyZW5ndGhzID0gbmV3IEFycmF5KG4pO1xuICAgIHl6ID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIHN0cmVuZ3Roc1tpXSA9IGlzTmFOKHl6W2ldID0gK3kobm9kZXNbaV0sIGksIG5vZGVzKSkgPyAwIDogK3N0cmVuZ3RoKG5vZGVzW2ldLCBpLCBub2Rlcyk7XG4gICAgfVxuICB9XG5cbiAgZm9yY2UuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBub2RlcyA9IF87XG4gICAgaW5pdGlhbGl6ZSgpO1xuICB9O1xuXG4gIGZvcmNlLnN0cmVuZ3RoID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHN0cmVuZ3RoID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCgrXyksIGluaXRpYWxpemUoKSwgZm9yY2UpIDogc3RyZW5ndGg7XG4gIH07XG5cbiAgZm9yY2UueSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh5ID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCgrXyksIGluaXRpYWxpemUoKSwgZm9yY2UpIDogeTtcbiAgfTtcblxuICByZXR1cm4gZm9yY2U7XG59XG4iLCJpbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWUuanNcIjtcbmltcG9ydCBudW1iZXJBcnJheSwge2lzTnVtYmVyQXJyYXl9IGZyb20gXCIuL251bWJlckFycmF5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIChpc051bWJlckFycmF5KGIpID8gbnVtYmVyQXJyYXkgOiBnZW5lcmljQXJyYXkpKGEsIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJpY0FycmF5KGEsIGIpIHtcbiAgdmFyIG5iID0gYiA/IGIubGVuZ3RoIDogMCxcbiAgICAgIG5hID0gYSA/IE1hdGgubWluKG5iLCBhLmxlbmd0aCkgOiAwLFxuICAgICAgeCA9IG5ldyBBcnJheShuYSksXG4gICAgICBjID0gbmV3IEFycmF5KG5iKSxcbiAgICAgIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IG5hOyArK2kpIHhbaV0gPSB2YWx1ZShhW2ldLCBiW2ldKTtcbiAgZm9yICg7IGkgPCBuYjsgKytpKSBjW2ldID0gYltpXTtcblxuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBuYTsgKytpKSBjW2ldID0geFtpXSh0KTtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBiYXNpcyh0MSwgdjAsIHYxLCB2MiwgdjMpIHtcbiAgdmFyIHQyID0gdDEgKiB0MSwgdDMgPSB0MiAqIHQxO1xuICByZXR1cm4gKCgxIC0gMyAqIHQxICsgMyAqIHQyIC0gdDMpICogdjBcbiAgICAgICsgKDQgLSA2ICogdDIgKyAzICogdDMpICogdjFcbiAgICAgICsgKDEgKyAzICogdDEgKyAzICogdDIgLSAzICogdDMpICogdjJcbiAgICAgICsgdDMgKiB2MykgLyA2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQgPD0gMCA/ICh0ID0gMCkgOiB0ID49IDEgPyAodCA9IDEsIG4gLSAxKSA6IE1hdGguZmxvb3IodCAqIG4pLFxuICAgICAgICB2MSA9IHZhbHVlc1tpXSxcbiAgICAgICAgdjIgPSB2YWx1ZXNbaSArIDFdLFxuICAgICAgICB2MCA9IGkgPiAwID8gdmFsdWVzW2kgLSAxXSA6IDIgKiB2MSAtIHYyLFxuICAgICAgICB2MyA9IGkgPCBuIC0gMSA/IHZhbHVlc1tpICsgMl0gOiAyICogdjIgLSB2MTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCJpbXBvcnQge2Jhc2lzfSBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gTWF0aC5mbG9vcigoKHQgJT0gMSkgPCAwID8gKyt0IDogdCkgKiBuKSxcbiAgICAgICAgdjAgPSB2YWx1ZXNbKGkgKyBuIC0gMSkgJSBuXSxcbiAgICAgICAgdjEgPSB2YWx1ZXNbaSAlIG5dLFxuICAgICAgICB2MiA9IHZhbHVlc1soaSArIDEpICUgbl0sXG4gICAgICAgIHYzID0gdmFsdWVzWyhpICsgMikgJSBuXTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiaW1wb3J0IHtjdWJlaGVsaXggYXMgY29sb3JDdWJlaGVsaXh9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGNvbG9yLCB7aHVlfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5mdW5jdGlvbiBjdWJlaGVsaXgoaHVlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gY3ViZWhlbGl4R2FtbWEoeSkge1xuICAgIHkgPSAreTtcblxuICAgIGZ1bmN0aW9uIGN1YmVoZWxpeChzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgaCA9IGh1ZSgoc3RhcnQgPSBjb2xvckN1YmVoZWxpeChzdGFydCkpLmgsIChlbmQgPSBjb2xvckN1YmVoZWxpeChlbmQpKS5oKSxcbiAgICAgICAgICBzID0gY29sb3Ioc3RhcnQucywgZW5kLnMpLFxuICAgICAgICAgIGwgPSBjb2xvcihzdGFydC5sLCBlbmQubCksXG4gICAgICAgICAgb3BhY2l0eSA9IGNvbG9yKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHN0YXJ0LmggPSBoKHQpO1xuICAgICAgICBzdGFydC5zID0gcyh0KTtcbiAgICAgICAgc3RhcnQubCA9IGwoTWF0aC5wb3codCwgeSkpO1xuICAgICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgXCJcIjtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY3ViZWhlbGl4LmdhbW1hID0gY3ViZWhlbGl4R2FtbWE7XG5cbiAgICByZXR1cm4gY3ViZWhlbGl4O1xuICB9KSgxKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3ViZWhlbGl4KGh1ZSk7XG5leHBvcnQgdmFyIGN1YmVoZWxpeExvbmcgPSBjdWJlaGVsaXgoY29sb3IpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgZCA9IG5ldyBEYXRlO1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gZC5zZXRUaW1lKGEgKiAoMSAtIHQpICsgYiAqIHQpLCBkO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmFuZ2UpIHtcbiAgdmFyIG4gPSByYW5nZS5sZW5ndGg7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIHJhbmdlW01hdGgubWF4KDAsIE1hdGgubWluKG4gLSAxLCBNYXRoLmZsb29yKHQgKiBuKSkpXTtcbiAgfTtcbn1cbiIsImltcG9ydCB7aGNsIGFzIGNvbG9ySGNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBjb2xvciwge2h1ZX0gZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZnVuY3Rpb24gaGNsKGh1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHZhciBoID0gaHVlKChzdGFydCA9IGNvbG9ySGNsKHN0YXJ0KSkuaCwgKGVuZCA9IGNvbG9ySGNsKGVuZCkpLmgpLFxuICAgICAgICBjID0gY29sb3Ioc3RhcnQuYywgZW5kLmMpLFxuICAgICAgICBsID0gY29sb3Ioc3RhcnQubCwgZW5kLmwpLFxuICAgICAgICBvcGFjaXR5ID0gY29sb3Ioc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5oID0gaCh0KTtcbiAgICAgIHN0YXJ0LmMgPSBjKHQpO1xuICAgICAgc3RhcnQubCA9IGwodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBoY2woaHVlKTtcbmV4cG9ydCB2YXIgaGNsTG9uZyA9IGhjbChjb2xvcik7XG4iLCJpbXBvcnQge2hzbCBhcyBjb2xvckhzbH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgY29sb3IsIHtodWV9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmZ1bmN0aW9uIGhzbChodWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaCA9IGh1ZSgoc3RhcnQgPSBjb2xvckhzbChzdGFydCkpLmgsIChlbmQgPSBjb2xvckhzbChlbmQpKS5oKSxcbiAgICAgICAgcyA9IGNvbG9yKHN0YXJ0LnMsIGVuZC5zKSxcbiAgICAgICAgbCA9IGNvbG9yKHN0YXJ0LmwsIGVuZC5sKSxcbiAgICAgICAgb3BhY2l0eSA9IGNvbG9yKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuaCA9IGgodCk7XG4gICAgICBzdGFydC5zID0gcyh0KTtcbiAgICAgIHN0YXJ0LmwgPSBsKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaHNsKGh1ZSk7XG5leHBvcnQgdmFyIGhzbExvbmcgPSBoc2woY29sb3IpO1xuIiwiaW1wb3J0IHtodWV9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGkgPSBodWUoK2EsICtiKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgeCA9IGkodCk7XG4gICAgcmV0dXJuIHggLSAzNjAgKiBNYXRoLmZsb29yKHggLyAzNjApO1xuICB9O1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlfSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlQXJyYXl9IGZyb20gXCIuL2FycmF5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVCYXNpc30gZnJvbSBcIi4vYmFzaXMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJhc2lzQ2xvc2VkfSBmcm9tIFwiLi9iYXNpc0Nsb3NlZC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlRGF0ZX0gZnJvbSBcIi4vZGF0ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlRGlzY3JldGV9IGZyb20gXCIuL2Rpc2NyZXRlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVIdWV9IGZyb20gXCIuL2h1ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlTnVtYmVyfSBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZU51bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlT2JqZWN0fSBmcm9tIFwiLi9vYmplY3QuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJvdW5kfSBmcm9tIFwiLi9yb3VuZC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlU3RyaW5nfSBmcm9tIFwiLi9zdHJpbmcuanNcIjtcbmV4cG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MsIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnfSBmcm9tIFwiLi90cmFuc2Zvcm0vaW5kZXguanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVpvb219IGZyb20gXCIuL3pvb20uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJnYiwgcmdiQmFzaXMgYXMgaW50ZXJwb2xhdGVSZ2JCYXNpcywgcmdiQmFzaXNDbG9zZWQgYXMgaW50ZXJwb2xhdGVSZ2JCYXNpc0Nsb3NlZH0gZnJvbSBcIi4vcmdiLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVIc2wsIGhzbExvbmcgYXMgaW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiLi9oc2wuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUxhYn0gZnJvbSBcIi4vbGFiLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVIY2wsIGhjbExvbmcgYXMgaW50ZXJwb2xhdGVIY2xMb25nfSBmcm9tIFwiLi9oY2wuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUN1YmVoZWxpeCwgY3ViZWhlbGl4TG9uZyBhcyBpbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmd9IGZyb20gXCIuL2N1YmVoZWxpeC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHBpZWNld2lzZX0gZnJvbSBcIi4vcGllY2V3aXNlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcXVhbnRpemV9IGZyb20gXCIuL3F1YW50aXplLmpzXCI7XG4iLCJpbXBvcnQge2xhYiBhcyBjb2xvckxhYn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgY29sb3IgZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFiKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGwgPSBjb2xvcigoc3RhcnQgPSBjb2xvckxhYihzdGFydCkpLmwsIChlbmQgPSBjb2xvckxhYihlbmQpKS5sKSxcbiAgICAgIGEgPSBjb2xvcihzdGFydC5hLCBlbmQuYSksXG4gICAgICBiID0gY29sb3Ioc3RhcnQuYiwgZW5kLmIpLFxuICAgICAgb3BhY2l0eSA9IGNvbG9yKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBzdGFydC5sID0gbCh0KTtcbiAgICBzdGFydC5hID0gYSh0KTtcbiAgICBzdGFydC5iID0gYih0KTtcbiAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSAqICgxIC0gdCkgKyBiICogdDtcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKCFiKSBiID0gW107XG4gIHZhciBuID0gYSA/IE1hdGgubWluKGIubGVuZ3RoLCBhLmxlbmd0aCkgOiAwLFxuICAgICAgYyA9IGIuc2xpY2UoKSxcbiAgICAgIGk7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgY1tpXSA9IGFbaV0gKiAoMSAtIHQpICsgYltpXSAqIHQ7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlckFycmF5KHgpIHtcbiAgcmV0dXJuIEFycmF5QnVmZmVyLmlzVmlldyh4KSAmJiAhKHggaW5zdGFuY2VvZiBEYXRhVmlldyk7XG59XG4iLCJpbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgaSA9IHt9LFxuICAgICAgYyA9IHt9LFxuICAgICAgaztcblxuICBpZiAoYSA9PT0gbnVsbCB8fCB0eXBlb2YgYSAhPT0gXCJvYmplY3RcIikgYSA9IHt9O1xuICBpZiAoYiA9PT0gbnVsbCB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIikgYiA9IHt9O1xuXG4gIGZvciAoayBpbiBiKSB7XG4gICAgaWYgKGsgaW4gYSkge1xuICAgICAgaVtrXSA9IHZhbHVlKGFba10sIGJba10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjW2tdID0gYltrXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIGZvciAoayBpbiBpKSBjW2tdID0gaVtrXSh0KTtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpZWNld2lzZShpbnRlcnBvbGF0ZSwgdmFsdWVzKSB7XG4gIHZhciBpID0gMCwgbiA9IHZhbHVlcy5sZW5ndGggLSAxLCB2ID0gdmFsdWVzWzBdLCBJID0gbmV3IEFycmF5KG4gPCAwID8gMCA6IG4pO1xuICB3aGlsZSAoaSA8IG4pIElbaV0gPSBpbnRlcnBvbGF0ZSh2LCB2ID0gdmFsdWVzWysraV0pO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obiAtIDEsIE1hdGguZmxvb3IodCAqPSBuKSkpO1xuICAgIHJldHVybiBJW2ldKHQgLSBpKTtcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVycG9sYXRvciwgbikge1xuICB2YXIgc2FtcGxlcyA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIHNhbXBsZXNbaV0gPSBpbnRlcnBvbGF0b3IoaSAvIChuIC0gMSkpO1xuICByZXR1cm4gc2FtcGxlcztcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChhICogKDEgLSB0KSArIGIgKiB0KTtcbiAgfTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbnZhciByZUEgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2csXG4gICAgcmVCID0gbmV3IFJlZ0V4cChyZUEuc291cmNlLCBcImdcIik7XG5cbmZ1bmN0aW9uIHplcm8oYikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uZShiKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGIodCkgKyBcIlwiO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBiaSA9IHJlQS5sYXN0SW5kZXggPSByZUIubGFzdEluZGV4ID0gMCwgLy8gc2NhbiBpbmRleCBmb3IgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYW0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYVxuICAgICAgYm0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYlxuICAgICAgYnMsIC8vIHN0cmluZyBwcmVjZWRpbmcgY3VycmVudCBudW1iZXIgaW4gYiwgaWYgYW55XG4gICAgICBpID0gLTEsIC8vIGluZGV4IGluIHNcbiAgICAgIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG5cbiAgLy8gQ29lcmNlIGlucHV0cyB0byBzdHJpbmdzLlxuICBhID0gYSArIFwiXCIsIGIgPSBiICsgXCJcIjtcblxuICAvLyBJbnRlcnBvbGF0ZSBwYWlycyBvZiBudW1iZXJzIGluIGEgJiBiLlxuICB3aGlsZSAoKGFtID0gcmVBLmV4ZWMoYSkpXG4gICAgICAmJiAoYm0gPSByZUIuZXhlYyhiKSkpIHtcbiAgICBpZiAoKGJzID0gYm0uaW5kZXgpID4gYmkpIHsgLy8gYSBzdHJpbmcgcHJlY2VkZXMgdGhlIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGJzID0gYi5zbGljZShiaSwgYnMpO1xuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJzO1xuICAgIH1cbiAgICBpZiAoKGFtID0gYW1bMF0pID09PSAoYm0gPSBibVswXSkpIHsgLy8gbnVtYmVycyBpbiBhICYgYiBtYXRjaFxuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYm07IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJtO1xuICAgIH0gZWxzZSB7IC8vIGludGVycG9sYXRlIG5vbi1tYXRjaGluZyBudW1iZXJzXG4gICAgICBzWysraV0gPSBudWxsO1xuICAgICAgcS5wdXNoKHtpOiBpLCB4OiBudW1iZXIoYW0sIGJtKX0pO1xuICAgIH1cbiAgICBiaSA9IHJlQi5sYXN0SW5kZXg7XG4gIH1cblxuICAvLyBBZGQgcmVtYWlucyBvZiBiLlxuICBpZiAoYmkgPCBiLmxlbmd0aCkge1xuICAgIGJzID0gYi5zbGljZShiaSk7XG4gICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgZWxzZSBzWysraV0gPSBicztcbiAgfVxuXG4gIC8vIFNwZWNpYWwgb3B0aW1pemF0aW9uIGZvciBvbmx5IGEgc2luZ2xlIG1hdGNoLlxuICAvLyBPdGhlcndpc2UsIGludGVycG9sYXRlIGVhY2ggb2YgdGhlIG51bWJlcnMgYW5kIHJlam9pbiB0aGUgc3RyaW5nLlxuICByZXR1cm4gcy5sZW5ndGggPCAyID8gKHFbMF1cbiAgICAgID8gb25lKHFbMF0ueClcbiAgICAgIDogemVybyhiKSlcbiAgICAgIDogKGIgPSBxLmxlbmd0aCwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBvOyBpIDwgYjsgKytpKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICAgICAgfSk7XG59XG4iLCJ2YXIgZGVncmVlcyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCB2YXIgaWRlbnRpdHkgPSB7XG4gIHRyYW5zbGF0ZVg6IDAsXG4gIHRyYW5zbGF0ZVk6IDAsXG4gIHJvdGF0ZTogMCxcbiAgc2tld1g6IDAsXG4gIHNjYWxlWDogMSxcbiAgc2NhbGVZOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhciBzY2FsZVgsIHNjYWxlWSwgc2tld1g7XG4gIGlmIChzY2FsZVggPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYikpIGEgLz0gc2NhbGVYLCBiIC89IHNjYWxlWDtcbiAgaWYgKHNrZXdYID0gYSAqIGMgKyBiICogZCkgYyAtPSBhICogc2tld1gsIGQgLT0gYiAqIHNrZXdYO1xuICBpZiAoc2NhbGVZID0gTWF0aC5zcXJ0KGMgKiBjICsgZCAqIGQpKSBjIC89IHNjYWxlWSwgZCAvPSBzY2FsZVksIHNrZXdYIC89IHNjYWxlWTtcbiAgaWYgKGEgKiBkIDwgYiAqIGMpIGEgPSAtYSwgYiA9IC1iLCBza2V3WCA9IC1za2V3WCwgc2NhbGVYID0gLXNjYWxlWDtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGVYOiBlLFxuICAgIHRyYW5zbGF0ZVk6IGYsXG4gICAgcm90YXRlOiBNYXRoLmF0YW4yKGIsIGEpICogZGVncmVlcyxcbiAgICBza2V3WDogTWF0aC5hdGFuKHNrZXdYKSAqIGRlZ3JlZXMsXG4gICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgc2NhbGVZOiBzY2FsZVlcbiAgfTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlci5qc1wiO1xuaW1wb3J0IHtwYXJzZUNzcywgcGFyc2VTdmd9IGZyb20gXCIuL3BhcnNlLmpzXCI7XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlLCBweENvbW1hLCBweFBhcmVuLCBkZWdQYXJlbikge1xuXG4gIGZ1bmN0aW9uIHBvcChzKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoID8gcy5wb3AoKSArIFwiIFwiIDogXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChcInRyYW5zbGF0ZShcIiwgbnVsbCwgcHhDb21tYSwgbnVsbCwgcHhQYXJlbik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiIHx8IHliKSB7XG4gICAgICBzLnB1c2goXCJ0cmFuc2xhdGUoXCIgKyB4YiArIHB4Q29tbWEgKyB5YiArIHB4UGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJvdGF0ZShhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIGlmIChhIC0gYiA+IDE4MCkgYiArPSAzNjA7IGVsc2UgaWYgKGIgLSBhID4gMTgwKSBhICs9IDM2MDsgLy8gc2hvcnRlc3QgcGF0aFxuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBza2V3WChhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjYWxlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIsIG51bGwsIFwiLFwiLCBudWxsLCBcIilcIik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiICE9PSAxIHx8IHliICE9PSAxKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiArIHhiICsgXCIsXCIgKyB5YiArIFwiKVwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG4gICAgYSA9IHBhcnNlKGEpLCBiID0gcGFyc2UoYik7XG4gICAgdHJhbnNsYXRlKGEudHJhbnNsYXRlWCwgYS50cmFuc2xhdGVZLCBiLnRyYW5zbGF0ZVgsIGIudHJhbnNsYXRlWSwgcywgcSk7XG4gICAgcm90YXRlKGEucm90YXRlLCBiLnJvdGF0ZSwgcywgcSk7XG4gICAgc2tld1goYS5za2V3WCwgYi5za2V3WCwgcywgcSk7XG4gICAgc2NhbGUoYS5zY2FsZVgsIGEuc2NhbGVZLCBiLnNjYWxlWCwgYi5zY2FsZVksIHMsIHEpO1xuICAgIGEgPSBiID0gbnVsbDsgLy8gZ2NcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IHEubGVuZ3RoLCBvO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlQ3NzLCBcInB4LCBcIiwgXCJweClcIiwgXCJkZWcpXCIpO1xuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlU3ZnLCBcIiwgXCIsIFwiKVwiLCBcIilcIik7XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZS5qc1wiO1xuXG52YXIgY3NzTm9kZSxcbiAgICBjc3NSb290LFxuICAgIGNzc1ZpZXcsXG4gICAgc3ZnTm9kZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gXCJub25lXCIpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFjc3NOb2RlKSBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKSwgY3NzUm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgY3NzVmlldyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICBjc3NOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuICB2YWx1ZSA9IGNzc1ZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjc3NSb290LmFwcGVuZENoaWxkKGNzc05vZGUpLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwidHJhbnNmb3JtXCIpO1xuICBjc3NSb290LnJlbW92ZUNoaWxkKGNzc05vZGUpO1xuICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDcsIC0xKS5zcGxpdChcIixcIik7XG4gIHJldHVybiBkZWNvbXBvc2UoK3ZhbHVlWzBdLCArdmFsdWVbMV0sICt2YWx1ZVsyXSwgK3ZhbHVlWzNdLCArdmFsdWVbNF0sICt2YWx1ZVs1XSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgcmdiIGZyb20gXCIuL3JnYi5qc1wiO1xuaW1wb3J0IHtnZW5lcmljQXJyYXl9IGZyb20gXCIuL2FycmF5LmpzXCI7XG5pbXBvcnQgZGF0ZSBmcm9tIFwiLi9kYXRlLmpzXCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuaW1wb3J0IG9iamVjdCBmcm9tIFwiLi9vYmplY3QuanNcIjtcbmltcG9ydCBzdHJpbmcgZnJvbSBcIi4vc3RyaW5nLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmltcG9ydCBudW1iZXJBcnJheSwge2lzTnVtYmVyQXJyYXl9IGZyb20gXCIuL251bWJlckFycmF5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIHQgPSB0eXBlb2YgYiwgYztcbiAgcmV0dXJuIGIgPT0gbnVsbCB8fCB0ID09PSBcImJvb2xlYW5cIiA/IGNvbnN0YW50KGIpXG4gICAgICA6ICh0ID09PSBcIm51bWJlclwiID8gbnVtYmVyXG4gICAgICA6IHQgPT09IFwic3RyaW5nXCIgPyAoKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIHJnYikgOiBzdHJpbmcpXG4gICAgICA6IGIgaW5zdGFuY2VvZiBjb2xvciA/IHJnYlxuICAgICAgOiBiIGluc3RhbmNlb2YgRGF0ZSA/IGRhdGVcbiAgICAgIDogaXNOdW1iZXJBcnJheShiKSA/IG51bWJlckFycmF5XG4gICAgICA6IEFycmF5LmlzQXJyYXkoYikgPyBnZW5lcmljQXJyYXlcbiAgICAgIDogdHlwZW9mIGIudmFsdWVPZiAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBiLnRvU3RyaW5nICE9PSBcImZ1bmN0aW9uXCIgfHwgaXNOYU4oYikgPyBvYmplY3RcbiAgICAgIDogbnVtYmVyKShhLCBiKTtcbn1cbiIsInZhciByaG8gPSBNYXRoLlNRUlQyLFxuICAgIHJobzIgPSAyLFxuICAgIHJobzQgPSA0LFxuICAgIGVwc2lsb24yID0gMWUtMTI7XG5cbmZ1bmN0aW9uIGNvc2goeCkge1xuICByZXR1cm4gKCh4ID0gTWF0aC5leHAoeCkpICsgMSAvIHgpIC8gMjtcbn1cblxuZnVuY3Rpb24gc2luaCh4KSB7XG4gIHJldHVybiAoKHggPSBNYXRoLmV4cCh4KSkgLSAxIC8geCkgLyAyO1xufVxuXG5mdW5jdGlvbiB0YW5oKHgpIHtcbiAgcmV0dXJuICgoeCA9IE1hdGguZXhwKDIgKiB4KSkgLSAxKSAvICh4ICsgMSk7XG59XG5cbi8vIHAwID0gW3V4MCwgdXkwLCB3MF1cbi8vIHAxID0gW3V4MSwgdXkxLCB3MV1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHAwLCBwMSkge1xuICB2YXIgdXgwID0gcDBbMF0sIHV5MCA9IHAwWzFdLCB3MCA9IHAwWzJdLFxuICAgICAgdXgxID0gcDFbMF0sIHV5MSA9IHAxWzFdLCB3MSA9IHAxWzJdLFxuICAgICAgZHggPSB1eDEgLSB1eDAsXG4gICAgICBkeSA9IHV5MSAtIHV5MCxcbiAgICAgIGQyID0gZHggKiBkeCArIGR5ICogZHksXG4gICAgICBpLFxuICAgICAgUztcblxuICAvLyBTcGVjaWFsIGNhc2UgZm9yIHUwIOKJhSB1MS5cbiAgaWYgKGQyIDwgZXBzaWxvbjIpIHtcbiAgICBTID0gTWF0aC5sb2codzEgLyB3MCkgLyByaG87XG4gICAgaSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHV4MCArIHQgKiBkeCxcbiAgICAgICAgdXkwICsgdCAqIGR5LFxuICAgICAgICB3MCAqIE1hdGguZXhwKHJobyAqIHQgKiBTKVxuICAgICAgXTtcbiAgICB9XG4gIH1cblxuICAvLyBHZW5lcmFsIGNhc2UuXG4gIGVsc2Uge1xuICAgIHZhciBkMSA9IE1hdGguc3FydChkMiksXG4gICAgICAgIGIwID0gKHcxICogdzEgLSB3MCAqIHcwICsgcmhvNCAqIGQyKSAvICgyICogdzAgKiByaG8yICogZDEpLFxuICAgICAgICBiMSA9ICh3MSAqIHcxIC0gdzAgKiB3MCAtIHJobzQgKiBkMikgLyAoMiAqIHcxICogcmhvMiAqIGQxKSxcbiAgICAgICAgcjAgPSBNYXRoLmxvZyhNYXRoLnNxcnQoYjAgKiBiMCArIDEpIC0gYjApLFxuICAgICAgICByMSA9IE1hdGgubG9nKE1hdGguc3FydChiMSAqIGIxICsgMSkgLSBiMSk7XG4gICAgUyA9IChyMSAtIHIwKSAvIHJobztcbiAgICBpID0gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIHMgPSB0ICogUyxcbiAgICAgICAgICBjb3NocjAgPSBjb3NoKHIwKSxcbiAgICAgICAgICB1ID0gdzAgLyAocmhvMiAqIGQxKSAqIChjb3NocjAgKiB0YW5oKHJobyAqIHMgKyByMCkgLSBzaW5oKHIwKSk7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB1eDAgKyB1ICogZHgsXG4gICAgICAgIHV5MCArIHUgKiBkeSxcbiAgICAgICAgdzAgKiBjb3NocjAgLyBjb3NoKHJobyAqIHMgKyByMClcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgaS5kdXJhdGlvbiA9IFMgKiAxMDAwO1xuXG4gIHJldHVybiBpO1xufVxuIiwidmFyIHBpID0gTWF0aC5QSSxcbiAgICB0YXUgPSAyICogcGksXG4gICAgZXBzaWxvbiA9IDFlLTYsXG4gICAgdGF1RXBzaWxvbiA9IHRhdSAtIGVwc2lsb247XG5cbmZ1bmN0aW9uIFBhdGgoKSB7XG4gIHRoaXMuX3gwID0gdGhpcy5feTAgPSAvLyBzdGFydCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgdGhpcy5feDEgPSB0aGlzLl95MSA9IG51bGw7IC8vIGVuZCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgdGhpcy5fID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gcGF0aCgpIHtcbiAgcmV0dXJuIG5ldyBQYXRoO1xufVxuXG5QYXRoLnByb3RvdHlwZSA9IHBhdGgucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogUGF0aCxcbiAgbW92ZVRvOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgdGhpcy5fICs9IFwiTVwiICsgKHRoaXMuX3gwID0gdGhpcy5feDEgPSAreCkgKyBcIixcIiArICh0aGlzLl95MCA9IHRoaXMuX3kxID0gK3kpO1xuICB9LFxuICBjbG9zZVBhdGg6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl94MSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5feDEgPSB0aGlzLl94MCwgdGhpcy5feTEgPSB0aGlzLl95MDtcbiAgICAgIHRoaXMuXyArPSBcIlpcIjtcbiAgICB9XG4gIH0sXG4gIGxpbmVUbzogZnVuY3Rpb24oeCwgeSkge1xuICAgIHRoaXMuXyArPSBcIkxcIiArICh0aGlzLl94MSA9ICt4KSArIFwiLFwiICsgKHRoaXMuX3kxID0gK3kpO1xuICB9LFxuICBxdWFkcmF0aWNDdXJ2ZVRvOiBmdW5jdGlvbih4MSwgeTEsIHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gXCJRXCIgKyAoK3gxKSArIFwiLFwiICsgKCt5MSkgKyBcIixcIiArICh0aGlzLl94MSA9ICt4KSArIFwiLFwiICsgKHRoaXMuX3kxID0gK3kpO1xuICB9LFxuICBiZXppZXJDdXJ2ZVRvOiBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgeCwgeSkge1xuICAgIHRoaXMuXyArPSBcIkNcIiArICgreDEpICsgXCIsXCIgKyAoK3kxKSArIFwiLFwiICsgKCt4MikgKyBcIixcIiArICgreTIpICsgXCIsXCIgKyAodGhpcy5feDEgPSAreCkgKyBcIixcIiArICh0aGlzLl95MSA9ICt5KTtcbiAgfSxcbiAgYXJjVG86IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyLCByKSB7XG4gICAgeDEgPSAreDEsIHkxID0gK3kxLCB4MiA9ICt4MiwgeTIgPSAreTIsIHIgPSArcjtcbiAgICB2YXIgeDAgPSB0aGlzLl94MSxcbiAgICAgICAgeTAgPSB0aGlzLl95MSxcbiAgICAgICAgeDIxID0geDIgLSB4MSxcbiAgICAgICAgeTIxID0geTIgLSB5MSxcbiAgICAgICAgeDAxID0geDAgLSB4MSxcbiAgICAgICAgeTAxID0geTAgLSB5MSxcbiAgICAgICAgbDAxXzIgPSB4MDEgKiB4MDEgKyB5MDEgKiB5MDE7XG5cbiAgICAvLyBJcyB0aGUgcmFkaXVzIG5lZ2F0aXZlPyBFcnJvci5cbiAgICBpZiAociA8IDApIHRocm93IG5ldyBFcnJvcihcIm5lZ2F0aXZlIHJhZGl1czogXCIgKyByKTtcblxuICAgIC8vIElzIHRoaXMgcGF0aCBlbXB0eT8gTW92ZSB0byAoeDEseTEpLlxuICAgIGlmICh0aGlzLl94MSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fICs9IFwiTVwiICsgKHRoaXMuX3gxID0geDEpICsgXCIsXCIgKyAodGhpcy5feTEgPSB5MSk7XG4gICAgfVxuXG4gICAgLy8gT3IsIGlzICh4MSx5MSkgY29pbmNpZGVudCB3aXRoICh4MCx5MCk/IERvIG5vdGhpbmcuXG4gICAgZWxzZSBpZiAoIShsMDFfMiA+IGVwc2lsb24pKTtcblxuICAgIC8vIE9yLCBhcmUgKHgwLHkwKSwgKHgxLHkxKSBhbmQgKHgyLHkyKSBjb2xsaW5lYXI/XG4gICAgLy8gRXF1aXZhbGVudGx5LCBpcyAoeDEseTEpIGNvaW5jaWRlbnQgd2l0aCAoeDIseTIpP1xuICAgIC8vIE9yLCBpcyB0aGUgcmFkaXVzIHplcm8/IExpbmUgdG8gKHgxLHkxKS5cbiAgICBlbHNlIGlmICghKE1hdGguYWJzKHkwMSAqIHgyMSAtIHkyMSAqIHgwMSkgPiBlcHNpbG9uKSB8fCAhcikge1xuICAgICAgdGhpcy5fICs9IFwiTFwiICsgKHRoaXMuX3gxID0geDEpICsgXCIsXCIgKyAodGhpcy5feTEgPSB5MSk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCBkcmF3IGFuIGFyYyFcbiAgICBlbHNlIHtcbiAgICAgIHZhciB4MjAgPSB4MiAtIHgwLFxuICAgICAgICAgIHkyMCA9IHkyIC0geTAsXG4gICAgICAgICAgbDIxXzIgPSB4MjEgKiB4MjEgKyB5MjEgKiB5MjEsXG4gICAgICAgICAgbDIwXzIgPSB4MjAgKiB4MjAgKyB5MjAgKiB5MjAsXG4gICAgICAgICAgbDIxID0gTWF0aC5zcXJ0KGwyMV8yKSxcbiAgICAgICAgICBsMDEgPSBNYXRoLnNxcnQobDAxXzIpLFxuICAgICAgICAgIGwgPSByICogTWF0aC50YW4oKHBpIC0gTWF0aC5hY29zKChsMjFfMiArIGwwMV8yIC0gbDIwXzIpIC8gKDIgKiBsMjEgKiBsMDEpKSkgLyAyKSxcbiAgICAgICAgICB0MDEgPSBsIC8gbDAxLFxuICAgICAgICAgIHQyMSA9IGwgLyBsMjE7XG5cbiAgICAgIC8vIElmIHRoZSBzdGFydCB0YW5nZW50IGlzIG5vdCBjb2luY2lkZW50IHdpdGggKHgwLHkwKSwgbGluZSB0by5cbiAgICAgIGlmIChNYXRoLmFicyh0MDEgLSAxKSA+IGVwc2lsb24pIHtcbiAgICAgICAgdGhpcy5fICs9IFwiTFwiICsgKHgxICsgdDAxICogeDAxKSArIFwiLFwiICsgKHkxICsgdDAxICogeTAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fICs9IFwiQVwiICsgciArIFwiLFwiICsgciArIFwiLDAsMCxcIiArICgrKHkwMSAqIHgyMCA+IHgwMSAqIHkyMCkpICsgXCIsXCIgKyAodGhpcy5feDEgPSB4MSArIHQyMSAqIHgyMSkgKyBcIixcIiArICh0aGlzLl95MSA9IHkxICsgdDIxICogeTIxKTtcbiAgICB9XG4gIH0sXG4gIGFyYzogZnVuY3Rpb24oeCwgeSwgciwgYTAsIGExLCBjY3cpIHtcbiAgICB4ID0gK3gsIHkgPSAreSwgciA9ICtyLCBjY3cgPSAhIWNjdztcbiAgICB2YXIgZHggPSByICogTWF0aC5jb3MoYTApLFxuICAgICAgICBkeSA9IHIgKiBNYXRoLnNpbihhMCksXG4gICAgICAgIHgwID0geCArIGR4LFxuICAgICAgICB5MCA9IHkgKyBkeSxcbiAgICAgICAgY3cgPSAxIF4gY2N3LFxuICAgICAgICBkYSA9IGNjdyA/IGEwIC0gYTEgOiBhMSAtIGEwO1xuXG4gICAgLy8gSXMgdGhlIHJhZGl1cyBuZWdhdGl2ZT8gRXJyb3IuXG4gICAgaWYgKHIgPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJuZWdhdGl2ZSByYWRpdXM6IFwiICsgcik7XG5cbiAgICAvLyBJcyB0aGlzIHBhdGggZW1wdHk/IE1vdmUgdG8gKHgwLHkwKS5cbiAgICBpZiAodGhpcy5feDEgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuXyArPSBcIk1cIiArIHgwICsgXCIsXCIgKyB5MDtcbiAgICB9XG5cbiAgICAvLyBPciwgaXMgKHgwLHkwKSBub3QgY29pbmNpZGVudCB3aXRoIHRoZSBwcmV2aW91cyBwb2ludD8gTGluZSB0byAoeDAseTApLlxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuX3gxIC0geDApID4gZXBzaWxvbiB8fCBNYXRoLmFicyh0aGlzLl95MSAtIHkwKSA+IGVwc2lsb24pIHtcbiAgICAgIHRoaXMuXyArPSBcIkxcIiArIHgwICsgXCIsXCIgKyB5MDtcbiAgICB9XG5cbiAgICAvLyBJcyB0aGlzIGFyYyBlbXB0eT8gV2XigJlyZSBkb25lLlxuICAgIGlmICghcikgcmV0dXJuO1xuXG4gICAgLy8gRG9lcyB0aGUgYW5nbGUgZ28gdGhlIHdyb25nIHdheT8gRmxpcCB0aGUgZGlyZWN0aW9uLlxuICAgIGlmIChkYSA8IDApIGRhID0gZGEgJSB0YXUgKyB0YXU7XG5cbiAgICAvLyBJcyB0aGlzIGEgY29tcGxldGUgY2lyY2xlPyBEcmF3IHR3byBhcmNzIHRvIGNvbXBsZXRlIHRoZSBjaXJjbGUuXG4gICAgaWYgKGRhID4gdGF1RXBzaWxvbikge1xuICAgICAgdGhpcy5fICs9IFwiQVwiICsgciArIFwiLFwiICsgciArIFwiLDAsMSxcIiArIGN3ICsgXCIsXCIgKyAoeCAtIGR4KSArIFwiLFwiICsgKHkgLSBkeSkgKyBcIkFcIiArIHIgKyBcIixcIiArIHIgKyBcIiwwLDEsXCIgKyBjdyArIFwiLFwiICsgKHRoaXMuX3gxID0geDApICsgXCIsXCIgKyAodGhpcy5feTEgPSB5MCk7XG4gICAgfVxuXG4gICAgLy8gSXMgdGhpcyBhcmMgbm9uLWVtcHR5PyBEcmF3IGFuIGFyYyFcbiAgICBlbHNlIGlmIChkYSA+IGVwc2lsb24pIHtcbiAgICAgIHRoaXMuXyArPSBcIkFcIiArIHIgKyBcIixcIiArIHIgKyBcIiwwLFwiICsgKCsoZGEgPj0gcGkpKSArIFwiLFwiICsgY3cgKyBcIixcIiArICh0aGlzLl94MSA9IHggKyByICogTWF0aC5jb3MoYTEpKSArIFwiLFwiICsgKHRoaXMuX3kxID0geSArIHIgKiBNYXRoLnNpbihhMSkpO1xuICAgIH1cbiAgfSxcbiAgcmVjdDogZnVuY3Rpb24oeCwgeSwgdywgaCkge1xuICAgIHRoaXMuXyArPSBcIk1cIiArICh0aGlzLl94MCA9IHRoaXMuX3gxID0gK3gpICsgXCIsXCIgKyAodGhpcy5feTAgPSB0aGlzLl95MSA9ICt5KSArIFwiaFwiICsgKCt3KSArIFwidlwiICsgKCtoKSArIFwiaFwiICsgKC13KSArIFwiWlwiO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuXztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGF0aDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGQpIHtcbiAgdmFyIHggPSArdGhpcy5feC5jYWxsKG51bGwsIGQpLFxuICAgICAgeSA9ICt0aGlzLl95LmNhbGwobnVsbCwgZCk7XG4gIHJldHVybiBhZGQodGhpcy5jb3Zlcih4LCB5KSwgeCwgeSwgZCk7XG59XG5cbmZ1bmN0aW9uIGFkZCh0cmVlLCB4LCB5LCBkKSB7XG4gIGlmIChpc05hTih4KSB8fCBpc05hTih5KSkgcmV0dXJuIHRyZWU7IC8vIGlnbm9yZSBpbnZhbGlkIHBvaW50c1xuXG4gIHZhciBwYXJlbnQsXG4gICAgICBub2RlID0gdHJlZS5fcm9vdCxcbiAgICAgIGxlYWYgPSB7ZGF0YTogZH0sXG4gICAgICB4MCA9IHRyZWUuX3gwLFxuICAgICAgeTAgPSB0cmVlLl95MCxcbiAgICAgIHgxID0gdHJlZS5feDEsXG4gICAgICB5MSA9IHRyZWUuX3kxLFxuICAgICAgeG0sXG4gICAgICB5bSxcbiAgICAgIHhwLFxuICAgICAgeXAsXG4gICAgICByaWdodCxcbiAgICAgIGJvdHRvbSxcbiAgICAgIGksXG4gICAgICBqO1xuXG4gIC8vIElmIHRoZSB0cmVlIGlzIGVtcHR5LCBpbml0aWFsaXplIHRoZSByb290IGFzIGEgbGVhZi5cbiAgaWYgKCFub2RlKSByZXR1cm4gdHJlZS5fcm9vdCA9IGxlYWYsIHRyZWU7XG5cbiAgLy8gRmluZCB0aGUgZXhpc3RpbmcgbGVhZiBmb3IgdGhlIG5ldyBwb2ludCwgb3IgYWRkIGl0LlxuICB3aGlsZSAobm9kZS5sZW5ndGgpIHtcbiAgICBpZiAocmlnaHQgPSB4ID49ICh4bSA9ICh4MCArIHgxKSAvIDIpKSB4MCA9IHhtOyBlbHNlIHgxID0geG07XG4gICAgaWYgKGJvdHRvbSA9IHkgPj0gKHltID0gKHkwICsgeTEpIC8gMikpIHkwID0geW07IGVsc2UgeTEgPSB5bTtcbiAgICBpZiAocGFyZW50ID0gbm9kZSwgIShub2RlID0gbm9kZVtpID0gYm90dG9tIDw8IDEgfCByaWdodF0pKSByZXR1cm4gcGFyZW50W2ldID0gbGVhZiwgdHJlZTtcbiAgfVxuXG4gIC8vIElzIHRoZSBuZXcgcG9pbnQgaXMgZXhhY3RseSBjb2luY2lkZW50IHdpdGggdGhlIGV4aXN0aW5nIHBvaW50P1xuICB4cCA9ICt0cmVlLl94LmNhbGwobnVsbCwgbm9kZS5kYXRhKTtcbiAgeXAgPSArdHJlZS5feS5jYWxsKG51bGwsIG5vZGUuZGF0YSk7XG4gIGlmICh4ID09PSB4cCAmJiB5ID09PSB5cCkgcmV0dXJuIGxlYWYubmV4dCA9IG5vZGUsIHBhcmVudCA/IHBhcmVudFtpXSA9IGxlYWYgOiB0cmVlLl9yb290ID0gbGVhZiwgdHJlZTtcblxuICAvLyBPdGhlcndpc2UsIHNwbGl0IHRoZSBsZWFmIG5vZGUgdW50aWwgdGhlIG9sZCBhbmQgbmV3IHBvaW50IGFyZSBzZXBhcmF0ZWQuXG4gIGRvIHtcbiAgICBwYXJlbnQgPSBwYXJlbnQgPyBwYXJlbnRbaV0gPSBuZXcgQXJyYXkoNCkgOiB0cmVlLl9yb290ID0gbmV3IEFycmF5KDQpO1xuICAgIGlmIChyaWdodCA9IHggPj0gKHhtID0gKHgwICsgeDEpIC8gMikpIHgwID0geG07IGVsc2UgeDEgPSB4bTtcbiAgICBpZiAoYm90dG9tID0geSA+PSAoeW0gPSAoeTAgKyB5MSkgLyAyKSkgeTAgPSB5bTsgZWxzZSB5MSA9IHltO1xuICB9IHdoaWxlICgoaSA9IGJvdHRvbSA8PCAxIHwgcmlnaHQpID09PSAoaiA9ICh5cCA+PSB5bSkgPDwgMSB8ICh4cCA+PSB4bSkpKTtcbiAgcmV0dXJuIHBhcmVudFtqXSA9IG5vZGUsIHBhcmVudFtpXSA9IGxlYWYsIHRyZWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBbGwoZGF0YSkge1xuICB2YXIgZCwgaSwgbiA9IGRhdGEubGVuZ3RoLFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB4eiA9IG5ldyBBcnJheShuKSxcbiAgICAgIHl6ID0gbmV3IEFycmF5KG4pLFxuICAgICAgeDAgPSBJbmZpbml0eSxcbiAgICAgIHkwID0gSW5maW5pdHksXG4gICAgICB4MSA9IC1JbmZpbml0eSxcbiAgICAgIHkxID0gLUluZmluaXR5O1xuXG4gIC8vIENvbXB1dGUgdGhlIHBvaW50cyBhbmQgdGhlaXIgZXh0ZW50LlxuICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKGlzTmFOKHggPSArdGhpcy5feC5jYWxsKG51bGwsIGQgPSBkYXRhW2ldKSkgfHwgaXNOYU4oeSA9ICt0aGlzLl95LmNhbGwobnVsbCwgZCkpKSBjb250aW51ZTtcbiAgICB4eltpXSA9IHg7XG4gICAgeXpbaV0gPSB5O1xuICAgIGlmICh4IDwgeDApIHgwID0geDtcbiAgICBpZiAoeCA+IHgxKSB4MSA9IHg7XG4gICAgaWYgKHkgPCB5MCkgeTAgPSB5O1xuICAgIGlmICh5ID4geTEpIHkxID0geTtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIHdlcmUgbm8gKHZhbGlkKSBwb2ludHMsIGFib3J0LlxuICBpZiAoeDAgPiB4MSB8fCB5MCA+IHkxKSByZXR1cm4gdGhpcztcblxuICAvLyBFeHBhbmQgdGhlIHRyZWUgdG8gY292ZXIgdGhlIG5ldyBwb2ludHMuXG4gIHRoaXMuY292ZXIoeDAsIHkwKS5jb3Zlcih4MSwgeTEpO1xuXG4gIC8vIEFkZCB0aGUgbmV3IHBvaW50cy5cbiAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgIGFkZCh0aGlzLCB4eltpXSwgeXpbaV0sIGRhdGFbaV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4LCB5KSB7XG4gIGlmIChpc05hTih4ID0gK3gpIHx8IGlzTmFOKHkgPSAreSkpIHJldHVybiB0aGlzOyAvLyBpZ25vcmUgaW52YWxpZCBwb2ludHNcblxuICB2YXIgeDAgPSB0aGlzLl94MCxcbiAgICAgIHkwID0gdGhpcy5feTAsXG4gICAgICB4MSA9IHRoaXMuX3gxLFxuICAgICAgeTEgPSB0aGlzLl95MTtcblxuICAvLyBJZiB0aGUgcXVhZHRyZWUgaGFzIG5vIGV4dGVudCwgaW5pdGlhbGl6ZSB0aGVtLlxuICAvLyBJbnRlZ2VyIGV4dGVudCBhcmUgbmVjZXNzYXJ5IHNvIHRoYXQgaWYgd2UgbGF0ZXIgZG91YmxlIHRoZSBleHRlbnQsXG4gIC8vIHRoZSBleGlzdGluZyBxdWFkcmFudCBib3VuZGFyaWVzIGRvbuKAmXQgY2hhbmdlIGR1ZSB0byBmbG9hdGluZyBwb2ludCBlcnJvciFcbiAgaWYgKGlzTmFOKHgwKSkge1xuICAgIHgxID0gKHgwID0gTWF0aC5mbG9vcih4KSkgKyAxO1xuICAgIHkxID0gKHkwID0gTWF0aC5mbG9vcih5KSkgKyAxO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBkb3VibGUgcmVwZWF0ZWRseSB0byBjb3Zlci5cbiAgZWxzZSB7XG4gICAgdmFyIHogPSB4MSAtIHgwLFxuICAgICAgICBub2RlID0gdGhpcy5fcm9vdCxcbiAgICAgICAgcGFyZW50LFxuICAgICAgICBpO1xuXG4gICAgd2hpbGUgKHgwID4geCB8fCB4ID49IHgxIHx8IHkwID4geSB8fCB5ID49IHkxKSB7XG4gICAgICBpID0gKHkgPCB5MCkgPDwgMSB8ICh4IDwgeDApO1xuICAgICAgcGFyZW50ID0gbmV3IEFycmF5KDQpLCBwYXJlbnRbaV0gPSBub2RlLCBub2RlID0gcGFyZW50LCB6ICo9IDI7XG4gICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgY2FzZSAwOiB4MSA9IHgwICsgeiwgeTEgPSB5MCArIHo7IGJyZWFrO1xuICAgICAgICBjYXNlIDE6IHgwID0geDEgLSB6LCB5MSA9IHkwICsgejsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogeDEgPSB4MCArIHosIHkwID0geTEgLSB6OyBicmVhaztcbiAgICAgICAgY2FzZSAzOiB4MCA9IHgxIC0geiwgeTAgPSB5MSAtIHo7IGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9yb290ICYmIHRoaXMuX3Jvb3QubGVuZ3RoKSB0aGlzLl9yb290ID0gbm9kZTtcbiAgfVxuXG4gIHRoaXMuX3gwID0geDA7XG4gIHRoaXMuX3kwID0geTA7XG4gIHRoaXMuX3gxID0geDE7XG4gIHRoaXMuX3kxID0geTE7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBkYXRhID0gW107XG4gIHRoaXMudmlzaXQoZnVuY3Rpb24obm9kZSkge1xuICAgIGlmICghbm9kZS5sZW5ndGgpIGRvIGRhdGEucHVzaChub2RlLmRhdGEpOyB3aGlsZSAobm9kZSA9IG5vZGUubmV4dClcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oXykge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmNvdmVyKCtfWzBdWzBdLCArX1swXVsxXSkuY292ZXIoK19bMV1bMF0sICtfWzFdWzFdKVxuICAgICAgOiBpc05hTih0aGlzLl94MCkgPyB1bmRlZmluZWQgOiBbW3RoaXMuX3gwLCB0aGlzLl95MF0sIFt0aGlzLl94MSwgdGhpcy5feTFdXTtcbn1cbiIsImltcG9ydCBRdWFkIGZyb20gXCIuL3F1YWQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCwgeSwgcmFkaXVzKSB7XG4gIHZhciBkYXRhLFxuICAgICAgeDAgPSB0aGlzLl94MCxcbiAgICAgIHkwID0gdGhpcy5feTAsXG4gICAgICB4MSxcbiAgICAgIHkxLFxuICAgICAgeDIsXG4gICAgICB5MixcbiAgICAgIHgzID0gdGhpcy5feDEsXG4gICAgICB5MyA9IHRoaXMuX3kxLFxuICAgICAgcXVhZHMgPSBbXSxcbiAgICAgIG5vZGUgPSB0aGlzLl9yb290LFxuICAgICAgcSxcbiAgICAgIGk7XG5cbiAgaWYgKG5vZGUpIHF1YWRzLnB1c2gobmV3IFF1YWQobm9kZSwgeDAsIHkwLCB4MywgeTMpKTtcbiAgaWYgKHJhZGl1cyA9PSBudWxsKSByYWRpdXMgPSBJbmZpbml0eTtcbiAgZWxzZSB7XG4gICAgeDAgPSB4IC0gcmFkaXVzLCB5MCA9IHkgLSByYWRpdXM7XG4gICAgeDMgPSB4ICsgcmFkaXVzLCB5MyA9IHkgKyByYWRpdXM7XG4gICAgcmFkaXVzICo9IHJhZGl1cztcbiAgfVxuXG4gIHdoaWxlIChxID0gcXVhZHMucG9wKCkpIHtcblxuICAgIC8vIFN0b3Agc2VhcmNoaW5nIGlmIHRoaXMgcXVhZHJhbnQgY2Fu4oCZdCBjb250YWluIGEgY2xvc2VyIG5vZGUuXG4gICAgaWYgKCEobm9kZSA9IHEubm9kZSlcbiAgICAgICAgfHwgKHgxID0gcS54MCkgPiB4M1xuICAgICAgICB8fCAoeTEgPSBxLnkwKSA+IHkzXG4gICAgICAgIHx8ICh4MiA9IHEueDEpIDwgeDBcbiAgICAgICAgfHwgKHkyID0gcS55MSkgPCB5MCkgY29udGludWU7XG5cbiAgICAvLyBCaXNlY3QgdGhlIGN1cnJlbnQgcXVhZHJhbnQuXG4gICAgaWYgKG5vZGUubGVuZ3RoKSB7XG4gICAgICB2YXIgeG0gPSAoeDEgKyB4MikgLyAyLFxuICAgICAgICAgIHltID0gKHkxICsgeTIpIC8gMjtcblxuICAgICAgcXVhZHMucHVzaChcbiAgICAgICAgbmV3IFF1YWQobm9kZVszXSwgeG0sIHltLCB4MiwgeTIpLFxuICAgICAgICBuZXcgUXVhZChub2RlWzJdLCB4MSwgeW0sIHhtLCB5MiksXG4gICAgICAgIG5ldyBRdWFkKG5vZGVbMV0sIHhtLCB5MSwgeDIsIHltKSxcbiAgICAgICAgbmV3IFF1YWQobm9kZVswXSwgeDEsIHkxLCB4bSwgeW0pXG4gICAgICApO1xuXG4gICAgICAvLyBWaXNpdCB0aGUgY2xvc2VzdCBxdWFkcmFudCBmaXJzdC5cbiAgICAgIGlmIChpID0gKHkgPj0geW0pIDw8IDEgfCAoeCA+PSB4bSkpIHtcbiAgICAgICAgcSA9IHF1YWRzW3F1YWRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBxdWFkc1txdWFkcy5sZW5ndGggLSAxXSA9IHF1YWRzW3F1YWRzLmxlbmd0aCAtIDEgLSBpXTtcbiAgICAgICAgcXVhZHNbcXVhZHMubGVuZ3RoIC0gMSAtIGldID0gcTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWaXNpdCB0aGlzIHBvaW50LiAoVmlzaXRpbmcgY29pbmNpZGVudCBwb2ludHMgaXNu4oCZdCBuZWNlc3NhcnkhKVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGR4ID0geCAtICt0aGlzLl94LmNhbGwobnVsbCwgbm9kZS5kYXRhKSxcbiAgICAgICAgICBkeSA9IHkgLSArdGhpcy5feS5jYWxsKG51bGwsIG5vZGUuZGF0YSksXG4gICAgICAgICAgZDIgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIGlmIChkMiA8IHJhZGl1cykge1xuICAgICAgICB2YXIgZCA9IE1hdGguc3FydChyYWRpdXMgPSBkMik7XG4gICAgICAgIHgwID0geCAtIGQsIHkwID0geSAtIGQ7XG4gICAgICAgIHgzID0geCArIGQsIHkzID0geSArIGQ7XG4gICAgICAgIGRhdGEgPSBub2RlLmRhdGE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCB4MCwgeTAsIHgxLCB5MSkge1xuICB0aGlzLm5vZGUgPSBub2RlO1xuICB0aGlzLngwID0geDA7XG4gIHRoaXMueTAgPSB5MDtcbiAgdGhpcy54MSA9IHgxO1xuICB0aGlzLnkxID0geTE7XG59XG4iLCJpbXBvcnQgdHJlZV9hZGQsIHthZGRBbGwgYXMgdHJlZV9hZGRBbGx9IGZyb20gXCIuL2FkZC5qc1wiO1xuaW1wb3J0IHRyZWVfY292ZXIgZnJvbSBcIi4vY292ZXIuanNcIjtcbmltcG9ydCB0cmVlX2RhdGEgZnJvbSBcIi4vZGF0YS5qc1wiO1xuaW1wb3J0IHRyZWVfZXh0ZW50IGZyb20gXCIuL2V4dGVudC5qc1wiO1xuaW1wb3J0IHRyZWVfZmluZCBmcm9tIFwiLi9maW5kLmpzXCI7XG5pbXBvcnQgdHJlZV9yZW1vdmUsIHtyZW1vdmVBbGwgYXMgdHJlZV9yZW1vdmVBbGx9IGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHRyZWVfcm9vdCBmcm9tIFwiLi9yb290LmpzXCI7XG5pbXBvcnQgdHJlZV9zaXplIGZyb20gXCIuL3NpemUuanNcIjtcbmltcG9ydCB0cmVlX3Zpc2l0IGZyb20gXCIuL3Zpc2l0LmpzXCI7XG5pbXBvcnQgdHJlZV92aXNpdEFmdGVyIGZyb20gXCIuL3Zpc2l0QWZ0ZXIuanNcIjtcbmltcG9ydCB0cmVlX3gsIHtkZWZhdWx0WH0gZnJvbSBcIi4veC5qc1wiO1xuaW1wb3J0IHRyZWVfeSwge2RlZmF1bHRZfSBmcm9tIFwiLi95LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1YWR0cmVlKG5vZGVzLCB4LCB5KSB7XG4gIHZhciB0cmVlID0gbmV3IFF1YWR0cmVlKHggPT0gbnVsbCA/IGRlZmF1bHRYIDogeCwgeSA9PSBudWxsID8gZGVmYXVsdFkgOiB5LCBOYU4sIE5hTiwgTmFOLCBOYU4pO1xuICByZXR1cm4gbm9kZXMgPT0gbnVsbCA/IHRyZWUgOiB0cmVlLmFkZEFsbChub2Rlcyk7XG59XG5cbmZ1bmN0aW9uIFF1YWR0cmVlKHgsIHksIHgwLCB5MCwgeDEsIHkxKSB7XG4gIHRoaXMuX3ggPSB4O1xuICB0aGlzLl95ID0geTtcbiAgdGhpcy5feDAgPSB4MDtcbiAgdGhpcy5feTAgPSB5MDtcbiAgdGhpcy5feDEgPSB4MTtcbiAgdGhpcy5feTEgPSB5MTtcbiAgdGhpcy5fcm9vdCA9IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gbGVhZl9jb3B5KGxlYWYpIHtcbiAgdmFyIGNvcHkgPSB7ZGF0YTogbGVhZi5kYXRhfSwgbmV4dCA9IGNvcHk7XG4gIHdoaWxlIChsZWFmID0gbGVhZi5uZXh0KSBuZXh0ID0gbmV4dC5uZXh0ID0ge2RhdGE6IGxlYWYuZGF0YX07XG4gIHJldHVybiBjb3B5O1xufVxuXG52YXIgdHJlZVByb3RvID0gcXVhZHRyZWUucHJvdG90eXBlID0gUXVhZHRyZWUucHJvdG90eXBlO1xuXG50cmVlUHJvdG8uY29weSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY29weSA9IG5ldyBRdWFkdHJlZSh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl94MCwgdGhpcy5feTAsIHRoaXMuX3gxLCB0aGlzLl95MSksXG4gICAgICBub2RlID0gdGhpcy5fcm9vdCxcbiAgICAgIG5vZGVzLFxuICAgICAgY2hpbGQ7XG5cbiAgaWYgKCFub2RlKSByZXR1cm4gY29weTtcblxuICBpZiAoIW5vZGUubGVuZ3RoKSByZXR1cm4gY29weS5fcm9vdCA9IGxlYWZfY29weShub2RlKSwgY29weTtcblxuICBub2RlcyA9IFt7c291cmNlOiBub2RlLCB0YXJnZXQ6IGNvcHkuX3Jvb3QgPSBuZXcgQXJyYXkoNCl9XTtcbiAgd2hpbGUgKG5vZGUgPSBub2Rlcy5wb3AoKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICBpZiAoY2hpbGQgPSBub2RlLnNvdXJjZVtpXSkge1xuICAgICAgICBpZiAoY2hpbGQubGVuZ3RoKSBub2Rlcy5wdXNoKHtzb3VyY2U6IGNoaWxkLCB0YXJnZXQ6IG5vZGUudGFyZ2V0W2ldID0gbmV3IEFycmF5KDQpfSk7XG4gICAgICAgIGVsc2Ugbm9kZS50YXJnZXRbaV0gPSBsZWFmX2NvcHkoY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufTtcblxudHJlZVByb3RvLmFkZCA9IHRyZWVfYWRkO1xudHJlZVByb3RvLmFkZEFsbCA9IHRyZWVfYWRkQWxsO1xudHJlZVByb3RvLmNvdmVyID0gdHJlZV9jb3ZlcjtcbnRyZWVQcm90by5kYXRhID0gdHJlZV9kYXRhO1xudHJlZVByb3RvLmV4dGVudCA9IHRyZWVfZXh0ZW50O1xudHJlZVByb3RvLmZpbmQgPSB0cmVlX2ZpbmQ7XG50cmVlUHJvdG8ucmVtb3ZlID0gdHJlZV9yZW1vdmU7XG50cmVlUHJvdG8ucmVtb3ZlQWxsID0gdHJlZV9yZW1vdmVBbGw7XG50cmVlUHJvdG8ucm9vdCA9IHRyZWVfcm9vdDtcbnRyZWVQcm90by5zaXplID0gdHJlZV9zaXplO1xudHJlZVByb3RvLnZpc2l0ID0gdHJlZV92aXNpdDtcbnRyZWVQcm90by52aXNpdEFmdGVyID0gdHJlZV92aXNpdEFmdGVyO1xudHJlZVByb3RvLnggPSB0cmVlX3g7XG50cmVlUHJvdG8ueSA9IHRyZWVfeTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGQpIHtcbiAgaWYgKGlzTmFOKHggPSArdGhpcy5feC5jYWxsKG51bGwsIGQpKSB8fCBpc05hTih5ID0gK3RoaXMuX3kuY2FsbChudWxsLCBkKSkpIHJldHVybiB0aGlzOyAvLyBpZ25vcmUgaW52YWxpZCBwb2ludHNcblxuICB2YXIgcGFyZW50LFxuICAgICAgbm9kZSA9IHRoaXMuX3Jvb3QsXG4gICAgICByZXRhaW5lcixcbiAgICAgIHByZXZpb3VzLFxuICAgICAgbmV4dCxcbiAgICAgIHgwID0gdGhpcy5feDAsXG4gICAgICB5MCA9IHRoaXMuX3kwLFxuICAgICAgeDEgPSB0aGlzLl94MSxcbiAgICAgIHkxID0gdGhpcy5feTEsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIHhtLFxuICAgICAgeW0sXG4gICAgICByaWdodCxcbiAgICAgIGJvdHRvbSxcbiAgICAgIGksXG4gICAgICBqO1xuXG4gIC8vIElmIHRoZSB0cmVlIGlzIGVtcHR5LCBpbml0aWFsaXplIHRoZSByb290IGFzIGEgbGVhZi5cbiAgaWYgKCFub2RlKSByZXR1cm4gdGhpcztcblxuICAvLyBGaW5kIHRoZSBsZWFmIG5vZGUgZm9yIHRoZSBwb2ludC5cbiAgLy8gV2hpbGUgZGVzY2VuZGluZywgYWxzbyByZXRhaW4gdGhlIGRlZXBlc3QgcGFyZW50IHdpdGggYSBub24tcmVtb3ZlZCBzaWJsaW5nLlxuICBpZiAobm9kZS5sZW5ndGgpIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKHJpZ2h0ID0geCA+PSAoeG0gPSAoeDAgKyB4MSkgLyAyKSkgeDAgPSB4bTsgZWxzZSB4MSA9IHhtO1xuICAgIGlmIChib3R0b20gPSB5ID49ICh5bSA9ICh5MCArIHkxKSAvIDIpKSB5MCA9IHltOyBlbHNlIHkxID0geW07XG4gICAgaWYgKCEocGFyZW50ID0gbm9kZSwgbm9kZSA9IG5vZGVbaSA9IGJvdHRvbSA8PCAxIHwgcmlnaHRdKSkgcmV0dXJuIHRoaXM7XG4gICAgaWYgKCFub2RlLmxlbmd0aCkgYnJlYWs7XG4gICAgaWYgKHBhcmVudFsoaSArIDEpICYgM10gfHwgcGFyZW50WyhpICsgMikgJiAzXSB8fCBwYXJlbnRbKGkgKyAzKSAmIDNdKSByZXRhaW5lciA9IHBhcmVudCwgaiA9IGk7XG4gIH1cblxuICAvLyBGaW5kIHRoZSBwb2ludCB0byByZW1vdmUuXG4gIHdoaWxlIChub2RlLmRhdGEgIT09IGQpIGlmICghKHByZXZpb3VzID0gbm9kZSwgbm9kZSA9IG5vZGUubmV4dCkpIHJldHVybiB0aGlzO1xuICBpZiAobmV4dCA9IG5vZGUubmV4dCkgZGVsZXRlIG5vZGUubmV4dDtcblxuICAvLyBJZiB0aGVyZSBhcmUgbXVsdGlwbGUgY29pbmNpZGVudCBwb2ludHMsIHJlbW92ZSBqdXN0IHRoZSBwb2ludC5cbiAgaWYgKHByZXZpb3VzKSByZXR1cm4gKG5leHQgPyBwcmV2aW91cy5uZXh0ID0gbmV4dCA6IGRlbGV0ZSBwcmV2aW91cy5uZXh0KSwgdGhpcztcblxuICAvLyBJZiB0aGlzIGlzIHRoZSByb290IHBvaW50LCByZW1vdmUgaXQuXG4gIGlmICghcGFyZW50KSByZXR1cm4gdGhpcy5fcm9vdCA9IG5leHQsIHRoaXM7XG5cbiAgLy8gUmVtb3ZlIHRoaXMgbGVhZi5cbiAgbmV4dCA/IHBhcmVudFtpXSA9IG5leHQgOiBkZWxldGUgcGFyZW50W2ldO1xuXG4gIC8vIElmIHRoZSBwYXJlbnQgbm93IGNvbnRhaW5zIGV4YWN0bHkgb25lIGxlYWYsIGNvbGxhcHNlIHN1cGVyZmx1b3VzIHBhcmVudHMuXG4gIGlmICgobm9kZSA9IHBhcmVudFswXSB8fCBwYXJlbnRbMV0gfHwgcGFyZW50WzJdIHx8IHBhcmVudFszXSlcbiAgICAgICYmIG5vZGUgPT09IChwYXJlbnRbM10gfHwgcGFyZW50WzJdIHx8IHBhcmVudFsxXSB8fCBwYXJlbnRbMF0pXG4gICAgICAmJiAhbm9kZS5sZW5ndGgpIHtcbiAgICBpZiAocmV0YWluZXIpIHJldGFpbmVyW2pdID0gbm9kZTtcbiAgICBlbHNlIHRoaXMuX3Jvb3QgPSBub2RlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwoZGF0YSkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IGRhdGEubGVuZ3RoOyBpIDwgbjsgKytpKSB0aGlzLnJlbW92ZShkYXRhW2ldKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIHNpemUgPSAwO1xuICB0aGlzLnZpc2l0KGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUubGVuZ3RoKSBkbyArK3NpemU7IHdoaWxlIChub2RlID0gbm9kZS5uZXh0KVxuICB9KTtcbiAgcmV0dXJuIHNpemU7XG59XG4iLCJpbXBvcnQgUXVhZCBmcm9tIFwiLi9xdWFkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWFkcyA9IFtdLCBxLCBub2RlID0gdGhpcy5fcm9vdCwgY2hpbGQsIHgwLCB5MCwgeDEsIHkxO1xuICBpZiAobm9kZSkgcXVhZHMucHVzaChuZXcgUXVhZChub2RlLCB0aGlzLl94MCwgdGhpcy5feTAsIHRoaXMuX3gxLCB0aGlzLl95MSkpO1xuICB3aGlsZSAocSA9IHF1YWRzLnBvcCgpKSB7XG4gICAgaWYgKCFjYWxsYmFjayhub2RlID0gcS5ub2RlLCB4MCA9IHEueDAsIHkwID0gcS55MCwgeDEgPSBxLngxLCB5MSA9IHEueTEpICYmIG5vZGUubGVuZ3RoKSB7XG4gICAgICB2YXIgeG0gPSAoeDAgKyB4MSkgLyAyLCB5bSA9ICh5MCArIHkxKSAvIDI7XG4gICAgICBpZiAoY2hpbGQgPSBub2RlWzNdKSBxdWFkcy5wdXNoKG5ldyBRdWFkKGNoaWxkLCB4bSwgeW0sIHgxLCB5MSkpO1xuICAgICAgaWYgKGNoaWxkID0gbm9kZVsyXSkgcXVhZHMucHVzaChuZXcgUXVhZChjaGlsZCwgeDAsIHltLCB4bSwgeTEpKTtcbiAgICAgIGlmIChjaGlsZCA9IG5vZGVbMV0pIHF1YWRzLnB1c2gobmV3IFF1YWQoY2hpbGQsIHhtLCB5MCwgeDEsIHltKSk7XG4gICAgICBpZiAoY2hpbGQgPSBub2RlWzBdKSBxdWFkcy5wdXNoKG5ldyBRdWFkKGNoaWxkLCB4MCwgeTAsIHhtLCB5bSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCBRdWFkIGZyb20gXCIuL3F1YWQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHF1YWRzID0gW10sIG5leHQgPSBbXSwgcTtcbiAgaWYgKHRoaXMuX3Jvb3QpIHF1YWRzLnB1c2gobmV3IFF1YWQodGhpcy5fcm9vdCwgdGhpcy5feDAsIHRoaXMuX3kwLCB0aGlzLl94MSwgdGhpcy5feTEpKTtcbiAgd2hpbGUgKHEgPSBxdWFkcy5wb3AoKSkge1xuICAgIHZhciBub2RlID0gcS5ub2RlO1xuICAgIGlmIChub2RlLmxlbmd0aCkge1xuICAgICAgdmFyIGNoaWxkLCB4MCA9IHEueDAsIHkwID0gcS55MCwgeDEgPSBxLngxLCB5MSA9IHEueTEsIHhtID0gKHgwICsgeDEpIC8gMiwgeW0gPSAoeTAgKyB5MSkgLyAyO1xuICAgICAgaWYgKGNoaWxkID0gbm9kZVswXSkgcXVhZHMucHVzaChuZXcgUXVhZChjaGlsZCwgeDAsIHkwLCB4bSwgeW0pKTtcbiAgICAgIGlmIChjaGlsZCA9IG5vZGVbMV0pIHF1YWRzLnB1c2gobmV3IFF1YWQoY2hpbGQsIHhtLCB5MCwgeDEsIHltKSk7XG4gICAgICBpZiAoY2hpbGQgPSBub2RlWzJdKSBxdWFkcy5wdXNoKG5ldyBRdWFkKGNoaWxkLCB4MCwgeW0sIHhtLCB5MSkpO1xuICAgICAgaWYgKGNoaWxkID0gbm9kZVszXSkgcXVhZHMucHVzaChuZXcgUXVhZChjaGlsZCwgeG0sIHltLCB4MSwgeTEpKTtcbiAgICB9XG4gICAgbmV4dC5wdXNoKHEpO1xuICB9XG4gIHdoaWxlIChxID0gbmV4dC5wb3AoKSkge1xuICAgIGNhbGxiYWNrKHEubm9kZSwgcS54MCwgcS55MCwgcS54MSwgcS55MSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZGVmYXVsdFgoZCkge1xuICByZXR1cm4gZFswXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oXykge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aGlzLl94ID0gXywgdGhpcykgOiB0aGlzLl94O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRZKGQpIHtcbiAgcmV0dXJuIGRbMV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKF8pIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodGhpcy5feSA9IF8sIHRoaXMpIDogdGhpcy5feTtcbn1cbiIsImV4cG9ydCB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb25zdGFudCgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbn1cbiIsImltcG9ydCB7cGF0aH0gZnJvbSBcImQzLXBhdGhcIjtcbmltcG9ydCB7c2xpY2V9IGZyb20gXCIuLi9hcnJheS5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuLi9jb25zdGFudC5qc1wiO1xuaW1wb3J0IHt4IGFzIHBvaW50WCwgeSBhcyBwb2ludFl9IGZyb20gXCIuLi9wb2ludC5qc1wiO1xuaW1wb3J0IHBvaW50UmFkaWFsIGZyb20gXCIuLi9wb2ludFJhZGlhbC5qc1wiO1xuXG5mdW5jdGlvbiBsaW5rU291cmNlKGQpIHtcbiAgcmV0dXJuIGQuc291cmNlO1xufVxuXG5mdW5jdGlvbiBsaW5rVGFyZ2V0KGQpIHtcbiAgcmV0dXJuIGQudGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBsaW5rKGN1cnZlKSB7XG4gIHZhciBzb3VyY2UgPSBsaW5rU291cmNlLFxuICAgICAgdGFyZ2V0ID0gbGlua1RhcmdldCxcbiAgICAgIHggPSBwb2ludFgsXG4gICAgICB5ID0gcG9pbnRZLFxuICAgICAgY29udGV4dCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gbGluaygpIHtcbiAgICB2YXIgYnVmZmVyLCBhcmd2ID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLCBzID0gc291cmNlLmFwcGx5KHRoaXMsIGFyZ3YpLCB0ID0gdGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3YpO1xuICAgIGlmICghY29udGV4dCkgY29udGV4dCA9IGJ1ZmZlciA9IHBhdGgoKTtcbiAgICBjdXJ2ZShjb250ZXh0LCAreC5hcHBseSh0aGlzLCAoYXJndlswXSA9IHMsIGFyZ3YpKSwgK3kuYXBwbHkodGhpcywgYXJndiksICt4LmFwcGx5KHRoaXMsIChhcmd2WzBdID0gdCwgYXJndikpLCAreS5hcHBseSh0aGlzLCBhcmd2KSk7XG4gICAgaWYgKGJ1ZmZlcikgcmV0dXJuIGNvbnRleHQgPSBudWxsLCBidWZmZXIgKyBcIlwiIHx8IG51bGw7XG4gIH1cblxuICBsaW5rLnNvdXJjZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzb3VyY2UgPSBfLCBsaW5rKSA6IHNvdXJjZTtcbiAgfTtcblxuICBsaW5rLnRhcmdldCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0YXJnZXQgPSBfLCBsaW5rKSA6IHRhcmdldDtcbiAgfTtcblxuICBsaW5rLnggPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeCA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoK18pLCBsaW5rKSA6IHg7XG4gIH07XG5cbiAgbGluay55ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHkgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KCtfKSwgbGluaykgOiB5O1xuICB9O1xuXG4gIGxpbmsuY29udGV4dCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICgoY29udGV4dCA9IF8gPT0gbnVsbCA/IG51bGwgOiBfKSwgbGluaykgOiBjb250ZXh0O1xuICB9O1xuXG4gIHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBjdXJ2ZUhvcml6b250YWwoY29udGV4dCwgeDAsIHkwLCB4MSwgeTEpIHtcbiAgY29udGV4dC5tb3ZlVG8oeDAsIHkwKTtcbiAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHgwID0gKHgwICsgeDEpIC8gMiwgeTAsIHgwLCB5MSwgeDEsIHkxKTtcbn1cblxuZnVuY3Rpb24gY3VydmVWZXJ0aWNhbChjb250ZXh0LCB4MCwgeTAsIHgxLCB5MSkge1xuICBjb250ZXh0Lm1vdmVUbyh4MCwgeTApO1xuICBjb250ZXh0LmJlemllckN1cnZlVG8oeDAsIHkwID0gKHkwICsgeTEpIC8gMiwgeDEsIHkwLCB4MSwgeTEpO1xufVxuXG5mdW5jdGlvbiBjdXJ2ZVJhZGlhbChjb250ZXh0LCB4MCwgeTAsIHgxLCB5MSkge1xuICB2YXIgcDAgPSBwb2ludFJhZGlhbCh4MCwgeTApLFxuICAgICAgcDEgPSBwb2ludFJhZGlhbCh4MCwgeTAgPSAoeTAgKyB5MSkgLyAyKSxcbiAgICAgIHAyID0gcG9pbnRSYWRpYWwoeDEsIHkwKSxcbiAgICAgIHAzID0gcG9pbnRSYWRpYWwoeDEsIHkxKTtcbiAgY29udGV4dC5tb3ZlVG8ocDBbMF0sIHAwWzFdKTtcbiAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHAxWzBdLCBwMVsxXSwgcDJbMF0sIHAyWzFdLCBwM1swXSwgcDNbMV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlua0hvcml6b250YWwoKSB7XG4gIHJldHVybiBsaW5rKGN1cnZlSG9yaXpvbnRhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rVmVydGljYWwoKSB7XG4gIHJldHVybiBsaW5rKGN1cnZlVmVydGljYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlua1JhZGlhbCgpIHtcbiAgdmFyIGwgPSBsaW5rKGN1cnZlUmFkaWFsKTtcbiAgbC5hbmdsZSA9IGwueCwgZGVsZXRlIGwueDtcbiAgbC5yYWRpdXMgPSBsLnksIGRlbGV0ZSBsLnk7XG4gIHJldHVybiBsO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHgocCkge1xuICByZXR1cm4gcFswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHkocCkge1xuICByZXR1cm4gcFsxXTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIFsoeSA9ICt5KSAqIE1hdGguY29zKHggLT0gTWF0aC5QSSAvIDIpLCB5ICogTWF0aC5zaW4oeCldO1xufVxuIiwidmFyIGZyYW1lID0gMCwgLy8gaXMgYW4gYW5pbWF0aW9uIGZyYW1lIHBlbmRpbmc/XG4gICAgdGltZW91dCA9IDAsIC8vIGlzIGEgdGltZW91dCBwZW5kaW5nP1xuICAgIGludGVydmFsID0gMCwgLy8gYXJlIGFueSB0aW1lcnMgYWN0aXZlP1xuICAgIHBva2VEZWxheSA9IDEwMDAsIC8vIGhvdyBmcmVxdWVudGx5IHdlIGNoZWNrIGZvciBjbG9jayBza2V3XG4gICAgdGFza0hlYWQsXG4gICAgdGFza1RhaWwsXG4gICAgY2xvY2tMYXN0ID0gMCxcbiAgICBjbG9ja05vdyA9IDAsXG4gICAgY2xvY2tTa2V3ID0gMCxcbiAgICBjbG9jayA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gXCJvYmplY3RcIiAmJiBwZXJmb3JtYW5jZS5ub3cgPyBwZXJmb3JtYW5jZSA6IERhdGUsXG4gICAgc2V0RnJhbWUgPSB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSA6IGZ1bmN0aW9uKGYpIHsgc2V0VGltZW91dChmLCAxNyk7IH07XG5cbmV4cG9ydCBmdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBjbG9ja05vdyB8fCAoc2V0RnJhbWUoY2xlYXJOb3cpLCBjbG9ja05vdyA9IGNsb2NrLm5vdygpICsgY2xvY2tTa2V3KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJOb3coKSB7XG4gIGNsb2NrTm93ID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVyKCkge1xuICB0aGlzLl9jYWxsID1cbiAgdGhpcy5fdGltZSA9XG4gIHRoaXMuX25leHQgPSBudWxsO1xufVxuXG5UaW1lci5wcm90b3R5cGUgPSB0aW1lci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUaW1lcixcbiAgcmVzdGFydDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgdGltZSA9ICh0aW1lID09IG51bGwgPyBub3coKSA6ICt0aW1lKSArIChkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheSk7XG4gICAgaWYgKCF0aGlzLl9uZXh0ICYmIHRhc2tUYWlsICE9PSB0aGlzKSB7XG4gICAgICBpZiAodGFza1RhaWwpIHRhc2tUYWlsLl9uZXh0ID0gdGhpcztcbiAgICAgIGVsc2UgdGFza0hlYWQgPSB0aGlzO1xuICAgICAgdGFza1RhaWwgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgc2xlZXAoKTtcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbGwpIHtcbiAgICAgIHRoaXMuX2NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5fdGltZSA9IEluZmluaXR5O1xuICAgICAgc2xlZXAoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lcihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIHQucmVzdGFydChjYWxsYmFjaywgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyRmx1c2goKSB7XG4gIG5vdygpOyAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZSwgaWYgbm90IGFscmVhZHkgc2V0LlxuICArK2ZyYW1lOyAvLyBQcmV0ZW5kIHdl4oCZdmUgc2V0IGFuIGFsYXJtLCBpZiB3ZSBoYXZlbuKAmXQgYWxyZWFkeS5cbiAgdmFyIHQgPSB0YXNrSGVhZCwgZTtcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAoKGUgPSBjbG9ja05vdyAtIHQuX3RpbWUpID49IDApIHQuX2NhbGwuY2FsbChudWxsLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCJ2YXIgdGFyamFuID0gcmVxdWlyZSgnc3Ryb25nbHktY29ubmVjdGVkLWNvbXBvbmVudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaW5kQ2lyY3VpdHMoZWRnZXMsIGNiKSB7XG4gICAgdmFyIGNpcmN1aXRzID0gW107IC8vIE91dHB1dFxuXG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgdmFyIGJsb2NrZWQgPSBbXTtcbiAgICB2YXIgQiA9IHt9O1xuICAgIHZhciBBayA9IFtdO1xuICAgIHZhciBzO1xuXG4gICAgZnVuY3Rpb24gdW5ibG9jayh1KSB7XG4gICAgICAgIGJsb2NrZWRbdV0gPSBmYWxzZTtcbiAgICAgICAgaWYoQi5oYXNPd25Qcm9wZXJ0eSh1KSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoQlt1XSkuZm9yRWFjaChmdW5jdGlvbih3KSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIEJbdV1bd107XG4gICAgICAgICAgICAgICAgaWYoYmxvY2tlZFt3XSkge3VuYmxvY2sodyk7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaXJjdWl0KHYpIHtcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgc3RhY2sucHVzaCh2KTtcbiAgICAgICAgYmxvY2tlZFt2XSA9IHRydWU7XG5cbiAgICAgICAgLy8gTDFcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciB3O1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBBa1t2XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdyA9IEFrW3ZdW2ldO1xuICAgICAgICAgICAgaWYodyA9PT0gcykge1xuICAgICAgICAgICAgICAgIG91dHB1dChzLCBzdGFjayk7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmKCFibG9ja2VkW3ddKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBjaXJjdWl0KHcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTDJcbiAgICAgICAgaWYoZm91bmQpIHtcbiAgICAgICAgICAgIHVuYmxvY2sodik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBBa1t2XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHcgPSBBa1t2XVtpXTtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBCW3ddO1xuXG4gICAgICAgICAgICAgICAgaWYoIWVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5ID0ge307XG4gICAgICAgICAgICAgICAgICAgIEJbd10gPSBlbnRyeTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbnRyeVt3XSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvdXRwdXQoc3RhcnQsIHN0YWNrKSB7XG4gICAgICAgIHZhciBjeWNsZSA9IFtdLmNvbmNhdChzdGFjaykuY29uY2F0KHN0YXJ0KTtcbiAgICAgICAgaWYoY2IpIHtcbiAgICAgICAgICAgIGNiKGNpcmN1aXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2lyY3VpdHMucHVzaChjeWNsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJncmFwaChtaW5JZCkge1xuICAgICAgLy8gUmVtb3ZlIGVkZ2VzIHdpdGggaW5kaWNlIHNtYWxsZXIgdGhhbiBtaW5JZFxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZWRnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGkgPCBtaW5JZCkgZWRnZXNbaV0gPSBbXTtcbiAgICAgICAgICAgIGVkZ2VzW2ldID0gZWRnZXNbaV0uZmlsdGVyKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA+PSBtaW5JZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRqYWNlbmN5U3RydWN0dXJlU0NDKGZyb20pIHtcbiAgICAgICAgLy8gTWFrZSBzdWJncmFwaCBzdGFydGluZyBmcm9tIHZlcnRleCBtaW5JZFxuICAgICAgICBzdWJncmFwaChmcm9tKTtcbiAgICAgICAgdmFyIGcgPSBlZGdlcztcblxuICAgICAgICAvLyBGaW5kIHN0cm9uZ2x5IGNvbm5lY3RlZCBjb21wb25lbnRzIHVzaW5nIFRhcmphbiBhbGdvcml0aG1cbiAgICAgICAgdmFyIHNjY3MgPSB0YXJqYW4oZyk7XG5cbiAgICAgICAgLy8gRmlsdGVyIG91dCB0cml2aWFsIGNvbm5lY3RlZCBjb21wb25lbnRzIChpZS4gbWFkZSBvZiBvbmUgbm9kZSlcbiAgICAgICAgdmFyIGNjcyA9IHNjY3MuY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24oc2NjKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NjLmxlbmd0aCA+IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZpbmQgbGVhc3QgdmVydGV4XG4gICAgICAgIHZhciBsZWFzdFZlcnRleCA9IEluZmluaXR5O1xuICAgICAgICB2YXIgbGVhc3RWZXJ0ZXhDb21wb25lbnQ7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjY3NbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZihjY3NbaV1bal0gPCBsZWFzdFZlcnRleCkge1xuICAgICAgICAgICAgICAgICAgICBsZWFzdFZlcnRleCA9IGNjc1tpXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgbGVhc3RWZXJ0ZXhDb21wb25lbnQgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYyA9IGNjc1tsZWFzdFZlcnRleENvbXBvbmVudF07XG5cbiAgICAgICAgaWYoIWNjKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBhZGphY2VuY3kgbGlzdCBvZiBmaXJzdCBjb21wb25lbnRcbiAgICAgICAgdmFyIGFkakxpc3QgPSBlZGdlcy5tYXAoZnVuY3Rpb24obCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmKGNjLmluZGV4T2YoaW5kZXgpID09PSAtMSkgcmV0dXJuIFtdO1xuICAgICAgICAgICAgcmV0dXJuIGwuZmlsdGVyKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuaW5kZXhPZihpKSAhPT0gLTE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlYXN0VmVydGV4OiBsZWFzdFZlcnRleCxcbiAgICAgICAgICAgIGFkakxpc3Q6IGFkakxpc3RcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzID0gMDtcbiAgICB2YXIgbiA9IGVkZ2VzLmxlbmd0aDtcbiAgICB3aGlsZShzIDwgbikge1xuICAgICAgICAvLyBmaW5kIHN0cm9uZyBjb21wb25lbnQgd2l0aCBsZWFzdCB2ZXJ0ZXggaW5cbiAgICAgICAgLy8gc3ViZ3JhcGggc3RhcnRpbmcgZnJvbSB2ZXJ0ZXggYHNgXG4gICAgICAgIHZhciBwID0gYWRqYWNlbmN5U3RydWN0dXJlU0NDKHMpO1xuXG4gICAgICAgIC8vIEl0cyBsZWFzdCB2ZXJ0ZXhcbiAgICAgICAgcyA9IHAubGVhc3RWZXJ0ZXg7XG4gICAgICAgIC8vIEl0cyBhZGphY2VuY3kgbGlzdFxuICAgICAgICBBayA9IHAuYWRqTGlzdDtcblxuICAgICAgICBpZihBaykge1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IEFrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IEFrW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ZXJ0ZXhJZCA9IEFrW2ldW2pdO1xuICAgICAgICAgICAgICAgICAgICBibG9ja2VkWyt2ZXJ0ZXhJZF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgQlt2ZXJ0ZXhJZF0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaXJjdWl0KHMpO1xuICAgICAgICAgICAgcyA9IHMgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IG47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlmKGNiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2lyY3VpdHM7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3NhbmtleScpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9udEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZm9udF9hdHRyaWJ1dGVzJyk7XG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xudmFyIGNvbG9yQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yL2F0dHJpYnV0ZXMnKTtcbnZhciBmeEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9hdHRyaWJ1dGVzJyk7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5hdHRyaWJ1dGVzO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgY29sb3JBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciB0ZW1wbGF0ZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKS50ZW1wbGF0ZWRBcnJheTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcblxudmFyIEZPUk1BVF9MSU5LID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2RvY3MnKS5GT1JNQVRfTElOSztcblxudmFyIGF0dHJzID0gbW9kdWxlLmV4cG9ydHMgPSBvdmVycmlkZUFsbCh7XG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvLCB7XG4gICAgICAgIGZsYWdzOiBbXSxcbiAgICAgICAgYXJyYXlPazogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGljaCB0cmFjZSBpbmZvcm1hdGlvbiBhcHBlYXIgb24gaG92ZXIuJyxcbiAgICAgICAgICAgICdJZiBgbm9uZWAgb3IgYHNraXBgIGFyZSBzZXQsIG5vIGluZm9ybWF0aW9uIGlzIGRpc3BsYXllZCB1cG9uIGhvdmVyaW5nLicsXG4gICAgICAgICAgICAnQnV0LCBpZiBgbm9uZWAgaXMgc2V0LCBjbGljayBhbmQgaG92ZXIgZXZlbnRzIGFyZSBzdGlsbCBmaXJlZC4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGlzIGF0dHJpYnV0ZSBpcyBzdXBlcnNlZGVkIGJ5IGBub2RlLmhvdmVyaW5mb2AgYW5kIGBub2RlLmhvdmVyaW5mb2AnLFxuICAgICAgICAgICAgJ2ZvciBub2RlcyBhbmQgbGlua3MgcmVzcGVjdGl2ZWx5LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcbiAgICBob3ZlcmxhYmVsOiBmeEF0dHJzLmhvdmVybGFiZWwsXG4gICAgZG9tYWluOiBkb21haW5BdHRycyh7bmFtZTogJ3NhbmtleScsIHRyYWNlOiB0cnVlfSksXG5cbiAgICBvcmllbnRhdGlvbjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWyd2JywgJ2gnXSxcbiAgICAgICAgZGZsdDogJ2gnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBTYW5rZXkgZGlhZ3JhbS4nXG4gICAgfSxcblxuICAgIHZhbHVlZm9ybWF0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZmx0OiAnLjNzJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB2YWx1ZSBmb3JtYXR0aW5nIHJ1bGUgdXNpbmcgZDMgZm9ybWF0dGluZyBtaW5pLWxhbmd1YWdlJyxcbiAgICAgICAgICAgICd3aGljaCBpcyBzaW1pbGFyIHRvIHRob3NlIG9mIFB5dGhvbi4gU2VlJyxcbiAgICAgICAgICAgIEZPUk1BVF9MSU5LXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHZhbHVlc3VmZml4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBZGRzIGEgdW5pdCB0byBmb2xsb3cgdGhlIHZhbHVlIGluIHRoZSBob3ZlciB0b29sdGlwLiBBZGQgYSBzcGFjZSBpZiBhIHNlcGFyYXRpb24nLFxuICAgICAgICAgICAgJ2lzIG5lY2Vzc2FyeSBmcm9tIHRoZSB2YWx1ZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGFycmFuZ2VtZW50OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3NuYXAnLCAncGVycGVuZGljdWxhcicsICdmcmVlZm9ybScsICdmaXhlZCddLFxuICAgICAgICBkZmx0OiAnc25hcCcsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgdmFsdWUgaXMgYHNuYXBgICh0aGUgZGVmYXVsdCksIHRoZSBub2RlIGFycmFuZ2VtZW50IGlzIGFzc2lzdGVkIGJ5IGF1dG9tYXRpYyBzbmFwcGluZyBvZiBlbGVtZW50cyB0bycsXG4gICAgICAgICAgICAncHJlc2VydmUgc3BhY2UgYmV0d2VlbiBub2RlcyBzcGVjaWZpZWQgdmlhIGBub2RlcGFkYC4nLFxuICAgICAgICAgICAgJ0lmIHZhbHVlIGlzIGBwZXJwZW5kaWN1bGFyYCwgdGhlIG5vZGVzIGNhbiBvbmx5IG1vdmUgYWxvbmcgYSBsaW5lIHBlcnBlbmRpY3VsYXIgdG8gdGhlIGZsb3cuJyxcbiAgICAgICAgICAgICdJZiB2YWx1ZSBpcyBgZnJlZWZvcm1gLCB0aGUgbm9kZXMgY2FuIGZyZWVseSBtb3ZlIG9uIHRoZSBwbGFuZS4nLFxuICAgICAgICAgICAgJ0lmIHZhbHVlIGlzIGBmaXhlZGAsIHRoZSBub2RlcyBhcmUgc3RhdGlvbmFyeS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHRleHRmb250OiBmb250QXR0cnMoe1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgZm9yIG5vZGUgbGFiZWxzJ1xuICAgIH0pLFxuXG4gICAgLy8gUmVtb3ZlIHRvcC1sZXZlbCBjdXN0b21kYXRhXG4gICAgY3VzdG9tZGF0YTogdW5kZWZpbmVkLFxuXG4gICAgbm9kZToge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzaG93biBuYW1lIG9mIHRoZSBub2RlLidcbiAgICAgICAgfSxcbiAgICAgICAgZ3JvdXBzOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgICAgICBpbXBsaWVkRWRpdHM6IHsneCc6IFtdLCAneSc6IFtdfSxcbiAgICAgICAgICAgIGRpbWVuc2lvbnM6IDIsXG4gICAgICAgICAgICBmcmVlTGVuZ3RoOiB0cnVlLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICBpdGVtczoge3ZhbFR5cGU6ICdudW1iZXInLCBlZGl0VHlwZTogJ2NhbGMnfSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0dyb3VwcyBvZiBub2Rlcy4nLFxuICAgICAgICAgICAgICAgICdFYWNoIGdyb3VwIGlzIGRlZmluZWQgYnkgYW4gYXJyYXkgd2l0aCB0aGUgaW5kaWNlcyBvZiB0aGUgbm9kZXMgaXQgY29udGFpbnMuJyxcbiAgICAgICAgICAgICAgICAnTXVsdGlwbGUgZ3JvdXBzIGNhbiBiZSBzcGVjaWZpZWQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgeDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBub3JtYWxpemVkIGhvcml6b250YWwgcG9zaXRpb24gb2YgdGhlIG5vZGUuJ1xuICAgICAgICB9LFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICBkZmx0OiBbXSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG5vcm1hbGl6ZWQgdmVydGljYWwgcG9zaXRpb24gb2YgdGhlIG5vZGUuJ1xuICAgICAgICB9LFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgYG5vZGVgIGNvbG9yLiBJdCBjYW4gYmUgYSBzaW5nbGUgdmFsdWUsIG9yIGFuIGFycmF5IGZvciBzcGVjaWZ5aW5nIGNvbG9yIGZvciBlYWNoIGBub2RlYC4nLFxuICAgICAgICAgICAgICAgICdJZiBgbm9kZS5jb2xvcmAgaXMgb21pdHRlZCwgdGhlbiB0aGUgZGVmYXVsdCBgUGxvdGx5YCBjb2xvciBwYWxldHRlIHdpbGwgYmUgY3ljbGVkIHRocm91Z2gnLFxuICAgICAgICAgICAgICAgICd0byBoYXZlIGEgdmFyaWV0eSBvZiBjb2xvcnMuIFRoZXNlIGRlZmF1bHRzIGFyZSBub3QgZnVsbHkgb3BhcXVlLCB0byBhbGxvdyBzb21lIHZpc2liaWxpdHkgb2YnLFxuICAgICAgICAgICAgICAgICd3aGF0IGlzIGJlbmVhdGggdGhlIG5vZGUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgY3VzdG9tZGF0YToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0Fzc2lnbnMgZXh0cmEgZGF0YSB0byBlYWNoIG5vZGUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgYGxpbmVgIGFyb3VuZCBlYWNoIGBub2RlYC4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIGRmbHQ6IDAuNSxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBgbGluZWAgYXJvdW5kIGVhY2ggYG5vZGVgLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwYWQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgYXJyYXlPazogZmFsc2UsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAyMCxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHBhZGRpbmcgKGluIHB4KSBiZXR3ZWVuIHRoZSBgbm9kZXNgLidcbiAgICAgICAgfSxcbiAgICAgICAgdGhpY2tuZXNzOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGFycmF5T2s6IGZhbHNlLFxuICAgICAgICAgICAgbWluOiAxLFxuICAgICAgICAgICAgZGZsdDogMjAsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB0aGlja25lc3MgKGluIHB4KSBvZiB0aGUgYG5vZGVzYC4nXG4gICAgICAgIH0sXG4gICAgICAgIGhvdmVyaW5mbzoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2FsbCcsICdub25lJywgJ3NraXAnXSxcbiAgICAgICAgICAgIGRmbHQ6ICdhbGwnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGljaCB0cmFjZSBpbmZvcm1hdGlvbiBhcHBlYXIgd2hlbiBob3ZlcmluZyBub2Rlcy4nLFxuICAgICAgICAgICAgICAgICdJZiBgbm9uZWAgb3IgYHNraXBgIGFyZSBzZXQsIG5vIGluZm9ybWF0aW9uIGlzIGRpc3BsYXllZCB1cG9uIGhvdmVyaW5nLicsXG4gICAgICAgICAgICAgICAgJ0J1dCwgaWYgYG5vbmVgIGlzIHNldCwgY2xpY2sgYW5kIGhvdmVyIGV2ZW50cyBhcmUgc3RpbGwgZmlyZWQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXJsYWJlbDogZnhBdHRycy5ob3ZlcmxhYmVsLCAvLyBuZWVkcyBlZGl0VHlwZSBvdmVycmlkZSxcbiAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1ZhcmlhYmxlcyBgc291cmNlTGlua3NgIGFuZCBgdGFyZ2V0TGlua3NgIGFyZSBhcnJheXMgb2YgbGluayBvYmplY3RzLicsXG4gICAgICAgICAgICBrZXlzOiBbJ3ZhbHVlJywgJ2xhYmVsJ11cbiAgICAgICAgfSksXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG5vZGVzIG9mIHRoZSBTYW5rZXkgcGxvdC4nXG4gICAgfSxcblxuICAgIGxpbms6IHtcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIGRmbHQ6IFtdLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgc2hvd24gbmFtZSBvZiB0aGUgbGluay4nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBgbGlua2AgY29sb3IuIEl0IGNhbiBiZSBhIHNpbmdsZSB2YWx1ZSwgb3IgYW4gYXJyYXkgZm9yIHNwZWNpZnlpbmcgY29sb3IgZm9yIGVhY2ggYGxpbmtgLicsXG4gICAgICAgICAgICAgICAgJ0lmIGBsaW5rLmNvbG9yYCBpcyBvbWl0dGVkLCB0aGVuIGJ5IGRlZmF1bHQsIGEgdHJhbnNsdWNlbnQgZ3JleSBsaW5rIHdpbGwgYmUgdXNlZC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBjdXN0b21kYXRhOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnQXNzaWducyBleHRyYSBkYXRhIHRvIGVhY2ggbGluay4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICBkZmx0OiBjb2xvckF0dHJzLmRlZmF1bHRMaW5lLFxuICAgICAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIGNvbG9yIG9mIHRoZSBgbGluZWAgYXJvdW5kIGVhY2ggYGxpbmtgLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBgbGluZWAgYXJvdW5kIGVhY2ggYGxpbmtgLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IFtdLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBbiBpbnRlZ2VyIG51bWJlciBgWzAuLm5vZGVzLmxlbmd0aCAtIDFdYCB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZSBub2RlLidcbiAgICAgICAgfSxcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiBbXSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQW4gaW50ZWdlciBudW1iZXIgYFswLi5ub2Rlcy5sZW5ndGggLSAxXWAgdGhhdCByZXByZXNlbnRzIHRoZSB0YXJnZXQgbm9kZS4nXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICBkZmx0OiBbXSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQSBudW1lcmljIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgZmxvdyB2b2x1bWUgdmFsdWUuJ1xuICAgICAgICB9LFxuICAgICAgICBob3ZlcmluZm86IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogWydhbGwnLCAnbm9uZScsICdza2lwJ10sXG4gICAgICAgICAgICBkZmx0OiAnYWxsJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RldGVybWluZXMgd2hpY2ggdHJhY2UgaW5mb3JtYXRpb24gYXBwZWFyIHdoZW4gaG92ZXJpbmcgbGlua3MuJyxcbiAgICAgICAgICAgICAgICAnSWYgYG5vbmVgIG9yIGBza2lwYCBhcmUgc2V0LCBubyBpbmZvcm1hdGlvbiBpcyBkaXNwbGF5ZWQgdXBvbiBob3ZlcmluZy4nLFxuICAgICAgICAgICAgICAgICdCdXQsIGlmIGBub25lYCBpcyBzZXQsIGNsaWNrIGFuZCBob3ZlciBldmVudHMgYXJlIHN0aWxsIGZpcmVkLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGhvdmVybGFiZWw6IGZ4QXR0cnMuaG92ZXJsYWJlbCwgLy8gbmVlZHMgZWRpdFR5cGUgb3ZlcnJpZGUsXG4gICAgICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycyh7fSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdWYXJpYWJsZXMgYHNvdXJjZWAgYW5kIGB0YXJnZXRgIGFyZSBub2RlIG9iamVjdHMuJyxcbiAgICAgICAgICAgIGtleXM6IFsndmFsdWUnLCAnbGFiZWwnXVxuICAgICAgICB9KSxcbiAgICAgICAgY29sb3JzY2FsZXM6IHRlbXBsYXRlZEFycmF5KCdjb25jZW50cmF0aW9uc2NhbGVzJywge1xuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgbGFiZWwgb2YgdGhlIGxpbmtzIHRvIGNvbG9yIGJhc2VkIG9uIHRoZWlyIGNvbmNlbnRyYXRpb24gd2l0aGluIGEgZmxvdy4nLFxuICAgICAgICAgICAgICAgIGRmbHQ6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY21heDoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHVwcGVyIGJvdW5kIG9mIHRoZSBjb2xvciBkb21haW4uJ1xuICAgICAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbWluOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICAgICAnU2V0cyB0aGUgbG93ZXIgYm91bmQgb2YgdGhlIGNvbG9yIGRvbWFpbi4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yc2NhbGU6IGV4dGVuZEZsYXQoY29sb3JBdHRyaWJ1dGVzKCkuY29sb3JzY2FsZSwge2RmbHQ6IFtbMCwgJ3doaXRlJ10sIFsxLCAnYmxhY2snXV19KVxuICAgICAgICB9KSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgbGlua3Mgb2YgdGhlIFNhbmtleSBwbG90LicsXG4gICAgICAgIHJvbGU6ICdpbmZvJ1xuICAgIH1cbn0sICdjYWxjJywgJ25lc3RlZCcpO1xuYXR0cnMudHJhbnNmb3JtcyA9IHVuZGVmaW5lZDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG92ZXJyaWRlQWxsID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvZWRpdF90eXBlcycpLm92ZXJyaWRlQWxsO1xudmFyIGdldE1vZHVsZUNhbGNEYXRhID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZ2V0X2RhdGEnKS5nZXRNb2R1bGVDYWxjRGF0YTtcbnZhciBwbG90ID0gcmVxdWlyZSgnLi9wbG90Jyk7XG52YXIgZnhBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngvbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxudmFyIHNldEN1cnNvciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zZXRjdXJzb3InKTtcbnZhciBkcmFnRWxlbWVudCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhZ2VsZW1lbnQnKTtcbnZhciBwcmVwU2VsZWN0ID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL3NlbGVjdCcpLnByZXBTZWxlY3Q7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xuXG52YXIgU0FOS0VZID0gJ3NhbmtleSc7XG5cbmV4cG9ydHMubmFtZSA9IFNBTktFWTtcblxuZXhwb3J0cy5iYXNlTGF5b3V0QXR0ck92ZXJyaWRlcyA9IG92ZXJyaWRlQWxsKHtcbiAgICBob3ZlcmxhYmVsOiBmeEF0dHJzLmhvdmVybGFiZWxcbn0sICdwbG90JywgJ25lc3RlZCcpO1xuXG5leHBvcnRzLnBsb3QgPSBmdW5jdGlvbihnZCkge1xuICAgIHZhciBjYWxjRGF0YSA9IGdldE1vZHVsZUNhbGNEYXRhKGdkLmNhbGNkYXRhLCBTQU5LRVkpWzBdO1xuICAgIHBsb3QoZ2QsIGNhbGNEYXRhKTtcbiAgICBleHBvcnRzLnVwZGF0ZUZ4KGdkKTtcbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgaGFkUGxvdCA9IChvbGRGdWxsTGF5b3V0Ll9oYXMgJiYgb2xkRnVsbExheW91dC5faGFzKFNBTktFWSkpO1xuICAgIHZhciBoYXNQbG90ID0gKG5ld0Z1bGxMYXlvdXQuX2hhcyAmJiBuZXdGdWxsTGF5b3V0Ll9oYXMoU0FOS0VZKSk7XG5cbiAgICBpZihoYWRQbG90ICYmICFoYXNQbG90KSB7XG4gICAgICAgIG9sZEZ1bGxMYXlvdXQuX3BhcGVyZGl2LnNlbGVjdEFsbCgnLnNhbmtleScpLnJlbW92ZSgpO1xuICAgICAgICBvbGRGdWxsTGF5b3V0Ll9wYXBlcmRpdi5zZWxlY3RBbGwoJy5iZ3NhbmtleScpLnJlbW92ZSgpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMudXBkYXRlRnggPSBmdW5jdGlvbihnZCkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBnZC5fZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VicGxvdFVwZGF0ZUZ4KGdkLCBpKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBzdWJwbG90VXBkYXRlRngoZ2QsIGluZGV4KSB7XG4gICAgdmFyIHRyYWNlID0gZ2QuX2Z1bGxEYXRhW2luZGV4XTtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuXG4gICAgdmFyIGRyYWdNb2RlID0gZnVsbExheW91dC5kcmFnbW9kZTtcbiAgICB2YXIgY3Vyc29yID0gZnVsbExheW91dC5kcmFnbW9kZSA9PT0gJ3BhbicgPyAnbW92ZScgOiAnY3Jvc3NoYWlyJztcbiAgICB2YXIgYmdSZWN0ID0gdHJhY2UuX2JnUmVjdDtcblxuICAgIGlmKGRyYWdNb2RlID09PSAncGFuJyB8fCBkcmFnTW9kZSA9PT0gJ3pvb20nKSByZXR1cm47XG5cbiAgICBzZXRDdXJzb3IoYmdSZWN0LCBjdXJzb3IpO1xuXG4gICAgdmFyIHhheGlzID0ge1xuICAgICAgICBfaWQ6ICd4JyxcbiAgICAgICAgYzJwOiBMaWIuaWRlbnRpdHksXG4gICAgICAgIF9vZmZzZXQ6IHRyYWNlLl9zYW5rZXkudHJhbnNsYXRlWCxcbiAgICAgICAgX2xlbmd0aDogdHJhY2UuX3NhbmtleS53aWR0aFxuICAgIH07XG4gICAgdmFyIHlheGlzID0ge1xuICAgICAgICBfaWQ6ICd5JyxcbiAgICAgICAgYzJwOiBMaWIuaWRlbnRpdHksXG4gICAgICAgIF9vZmZzZXQ6IHRyYWNlLl9zYW5rZXkudHJhbnNsYXRlWSxcbiAgICAgICAgX2xlbmd0aDogdHJhY2UuX3NhbmtleS5oZWlnaHRcbiAgICB9O1xuXG4gICAgLy8gTm90ZTogZHJhZ09wdGlvbnMgaXMgbmVlZGVkIHRvIGJlIGRlY2xhcmVkIGZvciBhbGwgZHJhZ21vZGVzIGJlY2F1c2VcbiAgICAvLyBpdCdzIHRoZSBvYmplY3QgdGhhdCBob2xkcyBwZXJzaXN0ZW50IHNlbGVjdGlvbiBzdGF0ZS5cbiAgICB2YXIgZHJhZ09wdGlvbnMgPSB7XG4gICAgICAgIGdkOiBnZCxcbiAgICAgICAgZWxlbWVudDogYmdSZWN0Lm5vZGUoKSxcbiAgICAgICAgcGxvdGluZm86IHtcbiAgICAgICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgICAgIHhheGlzOiB4YXhpcyxcbiAgICAgICAgICAgIHlheGlzOiB5YXhpcyxcbiAgICAgICAgICAgIGZpbGxSYW5nZUl0ZW1zOiBMaWIubm9vcFxuICAgICAgICB9LFxuICAgICAgICBzdWJwbG90OiBpbmRleCxcbiAgICAgICAgLy8gY3JlYXRlIG1vY2sgeC95IGF4ZXMgZm9yIGhvdmVyIHJvdXRpbmVcbiAgICAgICAgeGF4ZXM6IFt4YXhpc10sXG4gICAgICAgIHlheGVzOiBbeWF4aXNdLFxuICAgICAgICBkb25lRm5Db21wbGV0ZWQ6IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgdmFyIHRyYWNlTm93ID0gZ2QuX2Z1bGxEYXRhW2luZGV4XTtcbiAgICAgICAgICAgIHZhciBuZXdHcm91cHM7XG4gICAgICAgICAgICB2YXIgb2xkR3JvdXBzID0gdHJhY2VOb3cubm9kZS5ncm91cHMuc2xpY2UoKTtcbiAgICAgICAgICAgIHZhciBuZXdHcm91cCA9IFtdO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBmaW5kTm9kZShwdCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IHRyYWNlTm93Ll9zYW5rZXkuZ3JhcGgubm9kZXM7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5vZGVzW2ldLnBvaW50TnVtYmVyID09PSBwdCkgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHNlbGVjdGlvbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gZmluZE5vZGUoc2VsZWN0aW9uW2pdLnBvaW50TnVtYmVyKTtcbiAgICAgICAgICAgICAgICBpZighbm9kZSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbm9kZSByZXByZXNlbnRzIGEgZ3JvdXBcbiAgICAgICAgICAgICAgICBpZihub2RlLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBhbGwgaXRzIGNoaWxkcmVuIHRvIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGsgPSAwOyBrIDwgbm9kZS5jaGlsZHJlbk5vZGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5wdXNoKG5vZGUuY2hpbGRyZW5Ob2Rlc1trXS5wb2ludE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gRmxhZyBncm91cCBmb3IgcmVtb3ZhbCBmcm9tIGV4aXN0aW5nIGxpc3Qgb2YgZ3JvdXBzXG4gICAgICAgICAgICAgICAgICAgIG9sZEdyb3Vwc1tub2RlLnBvaW50TnVtYmVyIC0gdHJhY2VOb3cubm9kZS5fY291bnRdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAucHVzaChub2RlLnBvaW50TnVtYmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld0dyb3VwcyA9IG9sZEdyb3Vwc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAuY29uY2F0KFtuZXdHcm91cF0pO1xuXG4gICAgICAgICAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVzdHlsZScsIGdkLCB7XG4gICAgICAgICAgICAgICAgJ25vZGUuZ3JvdXBzJzogWyBuZXdHcm91cHMgXVxuICAgICAgICAgICAgfSwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYWdPcHRpb25zLnByZXBGbiA9IGZ1bmN0aW9uKGUsIHN0YXJ0WCwgc3RhcnRZKSB7XG4gICAgICAgIHByZXBTZWxlY3QoZSwgc3RhcnRYLCBzdGFydFksIGRyYWdPcHRpb25zLCBkcmFnTW9kZSk7XG4gICAgfTtcblxuICAgIGRyYWdFbGVtZW50LmluaXQoZHJhZ09wdGlvbnMpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGFyamFuID0gcmVxdWlyZSgnc3Ryb25nbHktY29ubmVjdGVkLWNvbXBvbmVudHMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciB3cmFwID0gcmVxdWlyZSgnLi4vLi4vbGliL2d1cCcpLndyYXA7XG5cbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gTGliLmlzQXJyYXlPclR5cGVkQXJyYXk7XG52YXIgaXNJbmRleCA9IExpYi5pc0luZGV4O1xudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcblxuZnVuY3Rpb24gY29udmVydFRvRDNTYW5rZXkodHJhY2UpIHtcbiAgICB2YXIgbm9kZVNwZWMgPSB0cmFjZS5ub2RlO1xuICAgIHZhciBsaW5rU3BlYyA9IHRyYWNlLmxpbms7XG5cbiAgICB2YXIgbGlua3MgPSBbXTtcbiAgICB2YXIgaGFzTGlua0NvbG9yQXJyYXkgPSBpc0FycmF5T3JUeXBlZEFycmF5KGxpbmtTcGVjLmNvbG9yKTtcbiAgICB2YXIgaGFzTGlua0N1c3RvbWRhdGFBcnJheSA9IGlzQXJyYXlPclR5cGVkQXJyYXkobGlua1NwZWMuY3VzdG9tZGF0YSk7XG4gICAgdmFyIGxpbmtlZE5vZGVzID0ge307XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xuICAgIHZhciBjb21wb25lbnRDb3VudCA9IGxpbmtTcGVjLmNvbG9yc2NhbGVzLmxlbmd0aDtcbiAgICB2YXIgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBjb21wb25lbnRDb3VudDsgaSsrKSB7XG4gICAgICAgIHZhciBjc2NhbGUgPSBsaW5rU3BlYy5jb2xvcnNjYWxlc1tpXTtcbiAgICAgICAgdmFyIHNwZWNzID0gQ29sb3JzY2FsZS5leHRyYWN0U2NhbGUoY3NjYWxlLCB7Y0xldHRlcjogJ2MnfSk7XG4gICAgICAgIHZhciBzY2FsZSA9IENvbG9yc2NhbGUubWFrZUNvbG9yU2NhbGVGdW5jKHNwZWNzKTtcbiAgICAgICAgY29tcG9uZW50c1tjc2NhbGUubGFiZWxdID0gc2NhbGU7XG4gICAgfVxuXG4gICAgdmFyIG1heE5vZGVJZCA9IDA7XG4gICAgZm9yKGkgPSAwOyBpIDwgbGlua1NwZWMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYobGlua1NwZWMuc291cmNlW2ldID4gbWF4Tm9kZUlkKSBtYXhOb2RlSWQgPSBsaW5rU3BlYy5zb3VyY2VbaV07XG4gICAgICAgIGlmKGxpbmtTcGVjLnRhcmdldFtpXSA+IG1heE5vZGVJZCkgbWF4Tm9kZUlkID0gbGlua1NwZWMudGFyZ2V0W2ldO1xuICAgIH1cbiAgICB2YXIgbm9kZUNvdW50ID0gbWF4Tm9kZUlkICsgMTtcbiAgICB0cmFjZS5ub2RlLl9jb3VudCA9IG5vZGVDb3VudDtcblxuICAgIC8vIEdyb3VwIG5vZGVzXG4gICAgdmFyIGo7XG4gICAgdmFyIGdyb3VwcyA9IHRyYWNlLm5vZGUuZ3JvdXBzO1xuICAgIHZhciBncm91cExvb2t1cCA9IHt9O1xuICAgIGZvcihpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZ3JvdXAgPSBncm91cHNbaV07XG4gICAgICAgIC8vIEJ1aWxkIGEgbG9va3VwIHRhYmxlIHRvIHF1aWNrbHkgZmluZCBpbiB3aGljaCBncm91cCBhIG5vZGUgaXNcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgZ3JvdXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlSW5kZXggPSBncm91cFtqXTtcbiAgICAgICAgICAgIHZhciBncm91cEluZGV4ID0gbm9kZUNvdW50ICsgaTtcbiAgICAgICAgICAgIGlmKGdyb3VwTG9va3VwLmhhc093blByb3BlcnR5KG5vZGVJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBMaWIud2FybignTm9kZSAnICsgbm9kZUluZGV4ICsgJyBpcyBhbHJlYWR5IHBhcnQgb2YgYSBncm91cC4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBMb29rdXBbbm9kZUluZGV4XSA9IGdyb3VwSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcm9jZXNzIGxpbmtzXG4gICAgdmFyIGdyb3VwZWRMaW5rcyA9IHtcbiAgICAgICAgc291cmNlOiBbXSxcbiAgICAgICAgdGFyZ2V0OiBbXVxuICAgIH07XG4gICAgZm9yKGkgPSAwOyBpIDwgbGlua1NwZWMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbCA9IGxpbmtTcGVjLnZhbHVlW2ldO1xuICAgICAgICAvLyByZW1vdmUgbmVnYXRpdmUgdmFsdWVzLCBidXQga2VlcCB6ZXJvcyB3aXRoIHNwZWNpYWwgdHJlYXRtZW50XG4gICAgICAgIHZhciBzb3VyY2UgPSBsaW5rU3BlYy5zb3VyY2VbaV07XG4gICAgICAgIHZhciB0YXJnZXQgPSBsaW5rU3BlYy50YXJnZXRbaV07XG4gICAgICAgIGlmKCEodmFsID4gMCAmJiBpc0luZGV4KHNvdXJjZSwgbm9kZUNvdW50KSAmJiBpc0luZGV4KHRhcmdldCwgbm9kZUNvdW50KSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgYXJlIHdpdGhpbiB0aGUgc2FtZSBncm91cFxuICAgICAgICBpZihncm91cExvb2t1cC5oYXNPd25Qcm9wZXJ0eShzb3VyY2UpICYmIGdyb3VwTG9va3VwLmhhc093blByb3BlcnR5KHRhcmdldCkgJiYgZ3JvdXBMb29rdXBbc291cmNlXSA9PT0gZ3JvdXBMb29rdXBbdGFyZ2V0XSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsaW5rIHRhcmdldHMgYSBub2RlIGluIHRoZSBncm91cCwgcmVsaW5rIHRhcmdldCB0byB0aGF0IGdyb3VwXG4gICAgICAgIGlmKGdyb3VwTG9va3VwLmhhc093blByb3BlcnR5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGdyb3VwTG9va3VwW3RhcmdldF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsaW5rIG9yaWdpbmF0ZXMgZnJvbSBhIG5vZGUgaW4gYSBncm91cCwgcmVsaW5rIHNvdXJjZSB0byB0aGF0IGdyb3VwXG4gICAgICAgIGlmKGdyb3VwTG9va3VwLmhhc093blByb3BlcnR5KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IGdyb3VwTG9va3VwW3NvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICBzb3VyY2UgPSArc291cmNlO1xuICAgICAgICB0YXJnZXQgPSArdGFyZ2V0O1xuICAgICAgICBsaW5rZWROb2Rlc1tzb3VyY2VdID0gbGlua2VkTm9kZXNbdGFyZ2V0XSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGxhYmVsID0gJyc7XG4gICAgICAgIGlmKGxpbmtTcGVjLmxhYmVsICYmIGxpbmtTcGVjLmxhYmVsW2ldKSBsYWJlbCA9IGxpbmtTcGVjLmxhYmVsW2ldO1xuXG4gICAgICAgIHZhciBjb25jZW50cmF0aW9uc2NhbGUgPSBudWxsO1xuICAgICAgICBpZihsYWJlbCAmJiBjb21wb25lbnRzLmhhc093blByb3BlcnR5KGxhYmVsKSkgY29uY2VudHJhdGlvbnNjYWxlID0gY29tcG9uZW50c1tsYWJlbF07XG5cbiAgICAgICAgbGlua3MucHVzaCh7XG4gICAgICAgICAgICBwb2ludE51bWJlcjogaSxcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIGNvbG9yOiBoYXNMaW5rQ29sb3JBcnJheSA/IGxpbmtTcGVjLmNvbG9yW2ldIDogbGlua1NwZWMuY29sb3IsXG4gICAgICAgICAgICBjdXN0b21kYXRhOiBoYXNMaW5rQ3VzdG9tZGF0YUFycmF5ID8gbGlua1NwZWMuY3VzdG9tZGF0YVtpXSA6IGxpbmtTcGVjLmN1c3RvbWRhdGEsXG4gICAgICAgICAgICBjb25jZW50cmF0aW9uc2NhbGU6IGNvbmNlbnRyYXRpb25zY2FsZSxcbiAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICB2YWx1ZTogK3ZhbFxuICAgICAgICB9KTtcblxuICAgICAgICBncm91cGVkTGlua3Muc291cmNlLnB1c2goc291cmNlKTtcbiAgICAgICAgZ3JvdXBlZExpbmtzLnRhcmdldC5wdXNoKHRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gUHJvY2VzcyBub2Rlc1xuICAgIHZhciB0b3RhbENvdW50ID0gbm9kZUNvdW50ICsgZ3JvdXBzLmxlbmd0aDtcbiAgICB2YXIgaGFzTm9kZUNvbG9yQXJyYXkgPSBpc0FycmF5T3JUeXBlZEFycmF5KG5vZGVTcGVjLmNvbG9yKTtcbiAgICB2YXIgaGFzTm9kZUN1c3RvbWRhdGFBcnJheSA9IGlzQXJyYXlPclR5cGVkQXJyYXkobm9kZVNwZWMuY3VzdG9tZGF0YSk7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgZm9yKGkgPSAwOyBpIDwgdG90YWxDb3VudDsgaSsrKSB7XG4gICAgICAgIGlmKCFsaW5rZWROb2Rlc1tpXSkgY29udGludWU7XG4gICAgICAgIHZhciBsID0gbm9kZVNwZWMubGFiZWxbaV07XG5cbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICBncm91cDogKGkgPiBub2RlQ291bnQgLSAxKSxcbiAgICAgICAgICAgIGNoaWxkcmVuTm9kZXM6IFtdLFxuICAgICAgICAgICAgcG9pbnROdW1iZXI6IGksXG4gICAgICAgICAgICBsYWJlbDogbCxcbiAgICAgICAgICAgIGNvbG9yOiBoYXNOb2RlQ29sb3JBcnJheSA/IG5vZGVTcGVjLmNvbG9yW2ldIDogbm9kZVNwZWMuY29sb3IsXG4gICAgICAgICAgICBjdXN0b21kYXRhOiBoYXNOb2RlQ3VzdG9tZGF0YUFycmF5ID8gbm9kZVNwZWMuY3VzdG9tZGF0YVtpXSA6IG5vZGVTcGVjLmN1c3RvbWRhdGFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBjaXJjdWxhcml0eSBvbiB0aGUgcmVzdWx0aW5nIGdyYXBoXG4gICAgdmFyIGNpcmN1bGFyID0gZmFsc2U7XG4gICAgaWYoY2lyY3VsYXJpdHlQcmVzZW50KHRvdGFsQ291bnQsIGdyb3VwZWRMaW5rcy5zb3VyY2UsIGdyb3VwZWRMaW5rcy50YXJnZXQpKSB7XG4gICAgICAgIGNpcmN1bGFyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjaXJjdWxhcjogY2lyY3VsYXIsXG4gICAgICAgIGxpbmtzOiBsaW5rcyxcbiAgICAgICAgbm9kZXM6IG5vZGVzLFxuXG4gICAgICAgIC8vIERhdGEgc3RydWN0dXJlIGZvciBncm91cHNcbiAgICAgICAgZ3JvdXBzOiBncm91cHMsXG4gICAgICAgIGdyb3VwTG9va3VwOiBncm91cExvb2t1cFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNpcmN1bGFyaXR5UHJlc2VudChub2RlTGVuLCBzb3VyY2VzLCB0YXJnZXRzKSB7XG4gICAgdmFyIG5vZGVzID0gTGliLmluaXQyZEFycmF5KG5vZGVMZW4sIDApO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IE1hdGgubWluKHNvdXJjZXMubGVuZ3RoLCB0YXJnZXRzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICBpZihMaWIuaXNJbmRleChzb3VyY2VzW2ldLCBub2RlTGVuKSAmJiBMaWIuaXNJbmRleCh0YXJnZXRzW2ldLCBub2RlTGVuKSkge1xuICAgICAgICAgICAgaWYoc291cmNlc1tpXSA9PT0gdGFyZ2V0c1tpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBzZWxmLWxpbmsgd2hpY2ggaXMgYWxzbyBhIHNjYyBvZiBvbmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGVzW3NvdXJjZXNbaV1dLnB1c2godGFyZ2V0c1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2NjID0gdGFyamFuKG5vZGVzKTtcblxuICAgIC8vIFRhcmrDoW4ncyBzdHJvbmdseSBjb25uZWN0ZWQgY29tcG9uZW50cyBhbGdvcml0aG0gY29kZWQgYnkgTWlrb2xhIEx5c2Vua29cbiAgICAvLyByZXR1cm5zIGF0IGxlYXN0IG9uZSBub24tc2luZ3VsYXIgY29tcG9uZW50IGlmIHRoZXJlJ3MgY2lyY3VsYXJpdHkgaW4gdGhlIGdyYXBoXG4gICAgcmV0dXJuIHNjYy5jb21wb25lbnRzLnNvbWUoZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gYy5sZW5ndGggPiAxO1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbnZlcnRUb0QzU2Fua2V5KHRyYWNlKTtcblxuICAgIHJldHVybiB3cmFwKHtcbiAgICAgICAgY2lyY3VsYXI6IHJlc3VsdC5jaXJjdWxhcixcbiAgICAgICAgX25vZGVzOiByZXN1bHQubm9kZXMsXG4gICAgICAgIF9saW5rczogcmVzdWx0LmxpbmtzLFxuXG4gICAgICAgIC8vIERhdGEgc3RydWN0dXJlIGZvciBncm91cGluZ1xuICAgICAgICBfZ3JvdXBzOiByZXN1bHQuZ3JvdXBzLFxuICAgICAgICBfZ3JvdXBMb29rdXA6IHJlc3VsdC5ncm91cExvb2t1cCxcbiAgICB9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5vZGVUZXh0T2Zmc2V0SG9yaXpvbnRhbDogNCxcbiAgICBub2RlVGV4dE9mZnNldFZlcnRpY2FsOiAzLFxuICAgIG5vZGVQYWRBY3Jvc3M6IDEwLFxuICAgIHNhbmtleUl0ZXJhdGlvbnM6IDUwLFxuICAgIGZvcmNlSXRlcmF0aW9uczogNSxcbiAgICBmb3JjZVRpY2tzUGVyRnJhbWU6IDEwLFxuICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgZWFzZTogJ2xpbmVhcicsXG4gICAgY246IHtcbiAgICAgICAgc2Fua2V5OiAnc2Fua2V5JyxcbiAgICAgICAgc2Fua2V5TGlua3M6ICdzYW5rZXktbGlua3MnLFxuICAgICAgICBzYW5rZXlMaW5rOiAnc2Fua2V5LWxpbmsnLFxuICAgICAgICBzYW5rZXlOb2RlU2V0OiAnc2Fua2V5LW5vZGUtc2V0JyxcbiAgICAgICAgc2Fua2V5Tm9kZTogJ3NhbmtleS1ub2RlJyxcbiAgICAgICAgbm9kZVJlY3Q6ICdub2RlLXJlY3QnLFxuICAgICAgICBub2RlQ2FwdHVyZTogJ25vZGUtY2FwdHVyZScsXG4gICAgICAgIG5vZGVDZW50ZXJlZDogJ25vZGUtZW50ZXJlZCcsXG4gICAgICAgIG5vZGVMYWJlbEd1aWRlOiAnbm9kZS1sYWJlbC1ndWlkZScsXG4gICAgICAgIG5vZGVMYWJlbDogJ25vZGUtbGFiZWwnLFxuICAgICAgICBub2RlTGFiZWxUZXh0UGF0aDogJ25vZGUtbGFiZWwtdGV4dC1wYXRoJ1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgdGlueWNvbG9yID0gcmVxdWlyZSgndGlueWNvbG9yMicpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZG9tYWluJykuZGVmYXVsdHM7XG52YXIgaGFuZGxlSG92ZXJMYWJlbERlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9ob3ZlcmxhYmVsX2RlZmF1bHRzJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG52YXIgaGFuZGxlQXJyYXlDb250YWluZXJEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2FycmF5X2NvbnRhaW5lcl9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgaG92ZXJsYWJlbERlZmF1bHQgPSBMaWIuZXh0ZW5kRGVlcChsYXlvdXQuaG92ZXJsYWJlbCwgdHJhY2VJbi5ob3ZlcmxhYmVsKTtcblxuICAgIC8vIG5vZGUgYXR0cmlidXRlc1xuICAgIHZhciBub2RlSW4gPSB0cmFjZUluLm5vZGU7XG4gICAgdmFyIG5vZGVPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIodHJhY2VPdXQsICdub2RlJyk7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2VOb2RlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2Uobm9kZUluLCBub2RlT3V0LCBhdHRyaWJ1dGVzLm5vZGUsIGF0dHIsIGRmbHQpO1xuICAgIH1cbiAgICBjb2VyY2VOb2RlKCdsYWJlbCcpO1xuICAgIGNvZXJjZU5vZGUoJ2dyb3VwcycpO1xuICAgIGNvZXJjZU5vZGUoJ3gnKTtcbiAgICBjb2VyY2VOb2RlKCd5Jyk7XG4gICAgY29lcmNlTm9kZSgncGFkJyk7XG4gICAgY29lcmNlTm9kZSgndGhpY2tuZXNzJyk7XG4gICAgY29lcmNlTm9kZSgnbGluZS5jb2xvcicpO1xuICAgIGNvZXJjZU5vZGUoJ2xpbmUud2lkdGgnKTtcbiAgICBjb2VyY2VOb2RlKCdob3ZlcmluZm8nLCB0cmFjZUluLmhvdmVyaW5mbyk7XG4gICAgaGFuZGxlSG92ZXJMYWJlbERlZmF1bHRzKG5vZGVJbiwgbm9kZU91dCwgY29lcmNlTm9kZSwgaG92ZXJsYWJlbERlZmF1bHQpO1xuICAgIGNvZXJjZU5vZGUoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHZhciBjb2xvcnMgPSBsYXlvdXQuY29sb3J3YXk7XG5cbiAgICB2YXIgZGVmYXVsdE5vZGVQYWxldHRlID0gZnVuY3Rpb24oaSkge3JldHVybiBjb2xvcnNbaSAlIGNvbG9ycy5sZW5ndGhdO307XG5cbiAgICBjb2VyY2VOb2RlKCdjb2xvcicsIG5vZGVPdXQubGFiZWwubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIENvbG9yLmFkZE9wYWNpdHkoZGVmYXVsdE5vZGVQYWxldHRlKGkpLCAwLjgpO1xuICAgIH0pKTtcbiAgICBjb2VyY2VOb2RlKCdjdXN0b21kYXRhJyk7XG5cbiAgICAvLyBsaW5rIGF0dHJpYnV0ZXNcbiAgICB2YXIgbGlua0luID0gdHJhY2VJbi5saW5rIHx8IHt9O1xuICAgIHZhciBsaW5rT3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKHRyYWNlT3V0LCAnbGluaycpO1xuXG4gICAgZnVuY3Rpb24gY29lcmNlTGluayhhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxpbmtJbiwgbGlua091dCwgYXR0cmlidXRlcy5saW5rLCBhdHRyLCBkZmx0KTtcbiAgICB9XG4gICAgY29lcmNlTGluaygnbGFiZWwnKTtcbiAgICBjb2VyY2VMaW5rKCdzb3VyY2UnKTtcbiAgICBjb2VyY2VMaW5rKCd0YXJnZXQnKTtcbiAgICBjb2VyY2VMaW5rKCd2YWx1ZScpO1xuICAgIGNvZXJjZUxpbmsoJ2xpbmUuY29sb3InKTtcbiAgICBjb2VyY2VMaW5rKCdsaW5lLndpZHRoJyk7XG4gICAgY29lcmNlTGluaygnaG92ZXJpbmZvJywgdHJhY2VJbi5ob3ZlcmluZm8pO1xuICAgIGhhbmRsZUhvdmVyTGFiZWxEZWZhdWx0cyhsaW5rSW4sIGxpbmtPdXQsIGNvZXJjZUxpbmssIGhvdmVybGFiZWxEZWZhdWx0KTtcbiAgICBjb2VyY2VMaW5rKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICB2YXIgZGVmYXVsdExpbmtDb2xvciA9IHRpbnljb2xvcihsYXlvdXQucGFwZXJfYmdjb2xvcikuZ2V0THVtaW5hbmNlKCkgPCAwLjMzMyA/XG4gICAgICAgICAgICAgICAgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC42KScgOlxuICAgICAgICAgICAgICAgICdyZ2JhKDAsIDAsIDAsIDAuMiknO1xuXG4gICAgY29lcmNlTGluaygnY29sb3InLCBMaWIucmVwZWF0KGRlZmF1bHRMaW5rQ29sb3IsIGxpbmtPdXQudmFsdWUubGVuZ3RoKSk7XG4gICAgY29lcmNlTGluaygnY3VzdG9tZGF0YScpO1xuXG4gICAgaGFuZGxlQXJyYXlDb250YWluZXJEZWZhdWx0cyhsaW5rSW4sIGxpbmtPdXQsIHtcbiAgICAgICAgbmFtZTogJ2NvbG9yc2NhbGVzJyxcbiAgICAgICAgaGFuZGxlSXRlbURlZmF1bHRzOiBjb25jZW50cmF0aW9uc2NhbGVzRGVmYXVsdHNcbiAgICB9KTtcblxuICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG5cbiAgICBjb2VyY2UoJ29yaWVudGF0aW9uJyk7XG4gICAgY29lcmNlKCd2YWx1ZWZvcm1hdCcpO1xuICAgIGNvZXJjZSgndmFsdWVzdWZmaXgnKTtcblxuICAgIHZhciBkZmx0QXJyYW5nZW1lbnQ7XG4gICAgaWYobm9kZU91dC54Lmxlbmd0aCAmJiBub2RlT3V0LnkubGVuZ3RoKSB7XG4gICAgICAgIGRmbHRBcnJhbmdlbWVudCA9ICdmcmVlZm9ybSc7XG4gICAgfVxuICAgIGNvZXJjZSgnYXJyYW5nZW1lbnQnLCBkZmx0QXJyYW5nZW1lbnQpO1xuXG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGV4dGZvbnQnLCBMaWIuZXh0ZW5kRmxhdCh7fSwgbGF5b3V0LmZvbnQpKTtcblxuICAgIC8vIGRpc2FibGUgMUQgdHJhbnNmb3JtcyAtIGFycmF5cyBoZXJlIGFyZSAxRCBidXQgdGhlaXIgbGVuZ3Rocy9tZWFuaW5nc1xuICAgIC8vIGRvbid0IG1hdGNoLCBiZXR3ZWVuIG5vZGVzIGFuZCBsaW5rc1xuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xufTtcblxuZnVuY3Rpb24gY29uY2VudHJhdGlvbnNjYWxlc0RlZmF1bHRzKEluLCBPdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShJbiwgT3V0LCBhdHRyaWJ1dGVzLmxpbmsuY29sb3JzY2FsZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnbGFiZWwnKTtcbiAgICBjb2VyY2UoJ2NtaW4nKTtcbiAgICBjb2VyY2UoJ2NtYXgnKTtcbiAgICBjb2VyY2UoJ2NvbG9yc2NhbGUnKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NhbmtleScsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4vYmFzZV9wbG90JyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdC5qcycpLFxuICAgIGNhdGVnb3JpZXM6IFsnbm9PcGFjaXR5J10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NhbmtleSBwbG90cyBmb3IgbmV0d29yayBmbG93IGRhdGEgYW5hbHlzaXMuJyxcbiAgICAgICAgICAgICdUaGUgbm9kZXMgYXJlIHNwZWNpZmllZCBpbiBgbm9kZXNgIGFuZCB0aGUgbGlua3MgYmV0d2VlbiBzb3VyY2VzIGFuZCB0YXJnZXRzIGluIGBsaW5rc2AuJyxcbiAgICAgICAgICAgICdUaGUgY29sb3JzIGFyZSBzZXQgaW4gYG5vZGVzW2ldLmNvbG9yYCBhbmQgYGxpbmtzW2ldLmNvbG9yYCwgb3RoZXJ3aXNlIGRlZmF1bHRzIGFyZSB1c2VkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgY24gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLmNuO1xuXG52YXIgXyA9IExpYi5fO1xuXG5mdW5jdGlvbiByZW5kZXJhYmxlVmFsdWVQcmVzZW50KGQpIHtyZXR1cm4gZCAhPT0gJyc7fVxuXG5mdW5jdGlvbiBvd25UcmFjZShzZWxlY3Rpb24sIGQpIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmZpbHRlcihmdW5jdGlvbihzKSB7cmV0dXJuIHMua2V5ID09PSBkLnRyYWNlSWQ7fSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VUcmFuc2x1Y2VudChlbGVtZW50LCBhbHBoYSkge1xuICAgIGQzLnNlbGVjdChlbGVtZW50KVxuICAgICAgICAuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgLnN0eWxlKCdmaWxsLW9wYWNpdHknLCBhbHBoYSk7XG4gICAgZDMuc2VsZWN0KGVsZW1lbnQpXG4gICAgICAgIC5zZWxlY3QoJ3JlY3QnKVxuICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIGFscGhhKTtcbn1cblxuZnVuY3Rpb24gbWFrZVRleHRDb250cmFzdHkoZWxlbWVudCkge1xuICAgIGQzLnNlbGVjdChlbGVtZW50KVxuICAgICAgICAuc2VsZWN0KCd0ZXh0Lm5hbWUnKVxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKTtcbn1cblxuZnVuY3Rpb24gcmVsYXRlZExpbmtzKGQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24obCkge1xuICAgICAgICByZXR1cm4gZC5ub2RlLnNvdXJjZUxpbmtzLmluZGV4T2YobC5saW5rKSAhPT0gLTEgfHwgZC5ub2RlLnRhcmdldExpbmtzLmluZGV4T2YobC5saW5rKSAhPT0gLTE7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcmVsYXRlZE5vZGVzKGwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5ub2RlLnNvdXJjZUxpbmtzLmluZGV4T2YobC5saW5rKSAhPT0gLTEgfHwgZC5ub2RlLnRhcmdldExpbmtzLmluZGV4T2YobC5saW5rKSAhPT0gLTE7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gbm9kZUhvdmVyZWRTdHlsZShzYW5rZXlOb2RlLCBkLCBzYW5rZXkpIHtcbiAgICBpZihkICYmIHNhbmtleSkge1xuICAgICAgICBvd25UcmFjZShzYW5rZXksIGQpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcuJyArIGNuLnNhbmtleUxpbmspXG4gICAgICAgICAgICAuZmlsdGVyKHJlbGF0ZWRMaW5rcyhkKSlcbiAgICAgICAgICAgIC5jYWxsKGxpbmtIb3ZlcmVkU3R5bGUuYmluZCgwLCBkLCBzYW5rZXksIGZhbHNlKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBub2RlTm9uSG92ZXJlZFN0eWxlKHNhbmtleU5vZGUsIGQsIHNhbmtleSkge1xuICAgIGlmKGQgJiYgc2Fua2V5KSB7XG4gICAgICAgIG93blRyYWNlKHNhbmtleSwgZClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy4nICsgY24uc2Fua2V5TGluaylcbiAgICAgICAgICAgIC5maWx0ZXIocmVsYXRlZExpbmtzKGQpKVxuICAgICAgICAgICAgLmNhbGwobGlua05vbkhvdmVyZWRTdHlsZS5iaW5kKDAsIGQsIHNhbmtleSwgZmFsc2UpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxpbmtIb3ZlcmVkU3R5bGUoZCwgc2Fua2V5LCB2aXNpdE5vZGVzLCBzYW5rZXlMaW5rKSB7XG4gICAgdmFyIGxhYmVsID0gc2Fua2V5TGluay5kYXR1bSgpLmxpbmsubGFiZWw7XG5cbiAgICBzYW5rZXlMaW5rLnN0eWxlKCdmaWxsLW9wYWNpdHknLCBmdW5jdGlvbihsKSB7XG4gICAgICAgIGlmKCFsLmxpbmsuY29uY2VudHJhdGlvbnNjYWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gMC40O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZihsYWJlbCkge1xuICAgICAgICBvd25UcmFjZShzYW5rZXksIGQpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcuJyArIGNuLnNhbmtleUxpbmspXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGwpIHtyZXR1cm4gbC5saW5rLmxhYmVsID09PSBsYWJlbDt9KVxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsLW9wYWNpdHknLCBmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgaWYoIWwubGluay5jb25jZW50cmF0aW9uc2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZih2aXNpdE5vZGVzKSB7XG4gICAgICAgIG93blRyYWNlKHNhbmtleSwgZClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy4nICsgY24uc2Fua2V5Tm9kZSlcbiAgICAgICAgICAgIC5maWx0ZXIocmVsYXRlZE5vZGVzKGQpKVxuICAgICAgICAgICAgLmNhbGwobm9kZUhvdmVyZWRTdHlsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsaW5rTm9uSG92ZXJlZFN0eWxlKGQsIHNhbmtleSwgdmlzaXROb2Rlcywgc2Fua2V5TGluaykge1xuICAgIHZhciBsYWJlbCA9IHNhbmtleUxpbmsuZGF0dW0oKS5saW5rLmxhYmVsO1xuXG4gICAgc2Fua2V5TGluay5zdHlsZSgnZmlsbC1vcGFjaXR5JywgZnVuY3Rpb24oZCkge3JldHVybiBkLnRpbnlDb2xvckFscGhhO30pO1xuICAgIGlmKGxhYmVsKSB7XG4gICAgICAgIG93blRyYWNlKHNhbmtleSwgZClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy4nICsgY24uc2Fua2V5TGluaylcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24obCkge3JldHVybiBsLmxpbmsubGFiZWwgPT09IGxhYmVsO30pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC50aW55Q29sb3JBbHBoYTt9KTtcbiAgICB9XG5cbiAgICBpZih2aXNpdE5vZGVzKSB7XG4gICAgICAgIG93blRyYWNlKHNhbmtleSwgZClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY24uc2Fua2V5Tm9kZSlcbiAgICAgICAgICAgIC5maWx0ZXIocmVsYXRlZE5vZGVzKGQpKVxuICAgICAgICAgICAgLmNhbGwobm9kZU5vbkhvdmVyZWRTdHlsZSk7XG4gICAgfVxufVxuXG4vLyBkb2VzIG5vdCBzdXBwb3J0IGFycmF5IHZhbHVlcyBmb3Igbm93XG5mdW5jdGlvbiBjYXN0SG92ZXJPcHRpb24odHJhY2UsIGF0dHIpIHtcbiAgICB2YXIgbGFiZWxPcHRzID0gdHJhY2UuaG92ZXJsYWJlbCB8fCB7fTtcbiAgICB2YXIgdmFsID0gTGliLm5lc3RlZFByb3BlcnR5KGxhYmVsT3B0cywgYXR0cikuZ2V0KCk7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IGZhbHNlIDogdmFsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIGNhbGNEYXRhKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgc3ZnID0gZnVsbExheW91dC5fcGFwZXI7XG4gICAgdmFyIHNpemUgPSBmdWxsTGF5b3V0Ll9zaXplO1xuXG4gICAgLy8gc3Rhc2ggaW5pdGlhbCB2aWV3XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGdkLl9mdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZighZ2QuX2Z1bGxEYXRhW2ldLnZpc2libGUpIGNvbnRpbnVlO1xuICAgICAgICBpZihnZC5fZnVsbERhdGFbaV0udHlwZSAhPT0gY24uc2Fua2V5KSBjb250aW51ZTtcbiAgICAgICAgaWYoIWdkLl9mdWxsRGF0YVtpXS5fdmlld0luaXRpYWwpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gZ2QuX2Z1bGxEYXRhW2ldLm5vZGU7XG4gICAgICAgICAgICBnZC5fZnVsbERhdGFbaV0uX3ZpZXdJbml0aWFsID0ge1xuICAgICAgICAgICAgICAgIG5vZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBub2RlLmdyb3Vwcy5zbGljZSgpLFxuICAgICAgICAgICAgICAgICAgICB4OiBub2RlLnguc2xpY2UoKSxcbiAgICAgICAgICAgICAgICAgICAgeTogbm9kZS55LnNsaWNlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxpbmtTZWxlY3QgPSBmdW5jdGlvbihlbGVtZW50LCBkKSB7XG4gICAgICAgIHZhciBldnQgPSBkLmxpbms7XG4gICAgICAgIGV2dC5vcmlnaW5hbEV2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIGdkLl9ob3ZlcmRhdGEgPSBbZXZ0XTtcbiAgICAgICAgRnguY2xpY2soZ2QsIHsgdGFyZ2V0OiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbGlua0hvdmVyID0gZnVuY3Rpb24oZWxlbWVudCwgZCwgc2Fua2V5KSB7XG4gICAgICAgIGlmKGdkLl9mdWxsTGF5b3V0LmhvdmVybW9kZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgZDMuc2VsZWN0KGVsZW1lbnQpLmNhbGwobGlua0hvdmVyZWRTdHlsZS5iaW5kKDAsIGQsIHNhbmtleSwgdHJ1ZSkpO1xuICAgICAgICBpZihkLmxpbmsudHJhY2UubGluay5ob3ZlcmluZm8gIT09ICdza2lwJykge1xuICAgICAgICAgICAgZC5saW5rLmZ1bGxEYXRhID0gZC5saW5rLnRyYWNlO1xuICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X2hvdmVyJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBkMy5ldmVudCxcbiAgICAgICAgICAgICAgICBwb2ludHM6IFtkLmxpbmtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc291cmNlTGFiZWwgPSBfKGdkLCAnc291cmNlOicpICsgJyAnO1xuICAgIHZhciB0YXJnZXRMYWJlbCA9IF8oZ2QsICd0YXJnZXQ6JykgKyAnICc7XG4gICAgdmFyIGNvbmNlbnRyYXRpb25MYWJlbCA9IF8oZ2QsICdjb25jZW50cmF0aW9uOicpICsgJyAnO1xuICAgIHZhciBpbmNvbWluZ0xhYmVsID0gXyhnZCwgJ2luY29taW5nIGZsb3cgY291bnQ6JykgKyAnICc7XG4gICAgdmFyIG91dGdvaW5nTGFiZWwgPSBfKGdkLCAnb3V0Z29pbmcgZmxvdyBjb3VudDonKSArICcgJztcblxuICAgIHZhciBsaW5rSG92ZXJGb2xsb3cgPSBmdW5jdGlvbihlbGVtZW50LCBkKSB7XG4gICAgICAgIGlmKGdkLl9mdWxsTGF5b3V0LmhvdmVybW9kZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgdmFyIG9iaiA9IGQubGluay50cmFjZS5saW5rO1xuICAgICAgICBpZihvYmouaG92ZXJpbmZvID09PSAnbm9uZScgfHwgb2JqLmhvdmVyaW5mbyA9PT0gJ3NraXAnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGhvdmVySXRlbXMgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBob3ZlckNlbnRlclBvc2l0aW9uKGxpbmspIHtcbiAgICAgICAgICAgIHZhciBob3ZlckNlbnRlclgsIGhvdmVyQ2VudGVyWTtcbiAgICAgICAgICAgIGlmKGxpbmsuY2lyY3VsYXIpIHtcbiAgICAgICAgICAgICAgICBob3ZlckNlbnRlclggPSAobGluay5jaXJjdWxhclBhdGhEYXRhLmxlZnRJbm5lckV4dGVudCArIGxpbmsuY2lyY3VsYXJQYXRoRGF0YS5yaWdodElubmVyRXh0ZW50KSAvIDI7XG4gICAgICAgICAgICAgICAgaG92ZXJDZW50ZXJZID0gbGluay5jaXJjdWxhclBhdGhEYXRhLnZlcnRpY2FsRnVsbEV4dGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG92ZXJDZW50ZXJYID0gKGxpbmsuc291cmNlLngxICsgbGluay50YXJnZXQueDApIC8gMjtcbiAgICAgICAgICAgICAgICBob3ZlckNlbnRlclkgPSAobGluay55MCArIGxpbmsueTEpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjZW50ZXIgPSBbaG92ZXJDZW50ZXJYLCBob3ZlckNlbnRlclldO1xuICAgICAgICAgICAgaWYobGluay50cmFjZS5vcmllbnRhdGlvbiA9PT0gJ3YnKSBjZW50ZXIucmV2ZXJzZSgpO1xuICAgICAgICAgICAgY2VudGVyWzBdICs9IGQucGFyZW50LnRyYW5zbGF0ZVg7XG4gICAgICAgICAgICBjZW50ZXJbMV0gKz0gZC5wYXJlbnQudHJhbnNsYXRlWTtcbiAgICAgICAgICAgIHJldHVybiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgZWFjaCByZWxhdGVkIGxpbmtzLCBjcmVhdGUgYSBob3Zlckl0ZW1cbiAgICAgICAgdmFyIGFuY2hvckluZGV4ID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGQuZmxvdy5saW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGxpbmsgPSBkLmZsb3cubGlua3NbaV07XG4gICAgICAgICAgICBpZihnZC5fZnVsbExheW91dC5ob3Zlcm1vZGUgPT09ICdjbG9zZXN0JyAmJiBkLmxpbmsucG9pbnROdW1iZXIgIT09IGxpbmsucG9pbnROdW1iZXIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYoZC5saW5rLnBvaW50TnVtYmVyID09PSBsaW5rLnBvaW50TnVtYmVyKSBhbmNob3JJbmRleCA9IGk7XG4gICAgICAgICAgICBsaW5rLmZ1bGxEYXRhID0gbGluay50cmFjZTtcbiAgICAgICAgICAgIG9iaiA9IGQubGluay50cmFjZS5saW5rO1xuICAgICAgICAgICAgdmFyIGhvdmVyQ2VudGVyID0gaG92ZXJDZW50ZXJQb3NpdGlvbihsaW5rKTtcbiAgICAgICAgICAgIHZhciBob3ZlcnRlbXBsYXRlTGFiZWxzID0ge3ZhbHVlTGFiZWw6IGQzLmZvcm1hdChkLnZhbHVlRm9ybWF0KShsaW5rLnZhbHVlKSArIGQudmFsdWVTdWZmaXh9O1xuXG4gICAgICAgICAgICBob3Zlckl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IGhvdmVyQ2VudGVyWzBdLFxuICAgICAgICAgICAgICAgIHk6IGhvdmVyQ2VudGVyWzFdLFxuICAgICAgICAgICAgICAgIG5hbWU6IGhvdmVydGVtcGxhdGVMYWJlbHMudmFsdWVMYWJlbCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgICAgIGxpbmsubGFiZWwgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUxhYmVsICsgbGluay5zb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsICsgbGluay50YXJnZXQubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGxpbmsuY29uY2VudHJhdGlvbnNjYWxlID8gY29uY2VudHJhdGlvbkxhYmVsICsgZDMuZm9ybWF0KCclMC4yZicpKGxpbmsuZmxvdy5sYWJlbENvbmNlbnRyYXRpb24pIDogJydcbiAgICAgICAgICAgICAgICBdLmZpbHRlcihyZW5kZXJhYmxlVmFsdWVQcmVzZW50KS5qb2luKCc8YnI+JyksXG4gICAgICAgICAgICAgICAgY29sb3I6IGNhc3RIb3Zlck9wdGlvbihvYmosICdiZ2NvbG9yJykgfHwgQ29sb3IuYWRkT3BhY2l0eShsaW5rLmNvbG9yLCAxKSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY2FzdEhvdmVyT3B0aW9uKG9iaiwgJ2JvcmRlcmNvbG9yJyksXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogY2FzdEhvdmVyT3B0aW9uKG9iaiwgJ2ZvbnQuZmFtaWx5JyksXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGNhc3RIb3Zlck9wdGlvbihvYmosICdmb250LnNpemUnKSxcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6IGNhc3RIb3Zlck9wdGlvbihvYmosICdmb250LmNvbG9yJyksXG4gICAgICAgICAgICAgICAgbmFtZUxlbmd0aDogY2FzdEhvdmVyT3B0aW9uKG9iaiwgJ25hbWVsZW5ndGgnKSxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246IGNhc3RIb3Zlck9wdGlvbihvYmosICdhbGlnbicpLFxuICAgICAgICAgICAgICAgIGlkZWFsQWxpZ246IGQzLmV2ZW50LnggPCBob3ZlckNlbnRlclswXSA/ICdyaWdodCcgOiAnbGVmdCcsXG5cbiAgICAgICAgICAgICAgICBob3ZlcnRlbXBsYXRlOiBvYmouaG92ZXJ0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBob3ZlcnRlbXBsYXRlTGFiZWxzOiBob3ZlcnRlbXBsYXRlTGFiZWxzLFxuICAgICAgICAgICAgICAgIGV2ZW50RGF0YTogW2xpbmtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b29sdGlwcyA9IEZ4LmxvbmVIb3Zlcihob3Zlckl0ZW1zLCB7XG4gICAgICAgICAgICBjb250YWluZXI6IGZ1bGxMYXlvdXQuX2hvdmVybGF5ZXIubm9kZSgpLFxuICAgICAgICAgICAgb3V0ZXJDb250YWluZXI6IGZ1bGxMYXlvdXQuX3BhcGVyLm5vZGUoKSxcbiAgICAgICAgICAgIGdkOiBnZCxcbiAgICAgICAgICAgIGFuY2hvckluZGV4OiBhbmNob3JJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICB0b29sdGlwcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRvb2x0aXAgPSB0aGlzO1xuICAgICAgICAgICAgaWYoIWQubGluay5jb25jZW50cmF0aW9uc2NhbGUpIHtcbiAgICAgICAgICAgICAgICBtYWtlVHJhbnNsdWNlbnQodG9vbHRpcCwgMC42NSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYWtlVGV4dENvbnRyYXN0eSh0b29sdGlwKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBsaW5rVW5ob3ZlciA9IGZ1bmN0aW9uKGVsZW1lbnQsIGQsIHNhbmtleSkge1xuICAgICAgICBpZihnZC5fZnVsbExheW91dC5ob3Zlcm1vZGUgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGQzLnNlbGVjdChlbGVtZW50KS5jYWxsKGxpbmtOb25Ib3ZlcmVkU3R5bGUuYmluZCgwLCBkLCBzYW5rZXksIHRydWUpKTtcbiAgICAgICAgaWYoZC5saW5rLnRyYWNlLmxpbmsuaG92ZXJpbmZvICE9PSAnc2tpcCcpIHtcbiAgICAgICAgICAgIGQubGluay5mdWxsRGF0YSA9IGQubGluay50cmFjZTtcbiAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV91bmhvdmVyJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBkMy5ldmVudCxcbiAgICAgICAgICAgICAgICBwb2ludHM6IFtkLmxpbmtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ4LmxvbmVVbmhvdmVyKGZ1bGxMYXlvdXQuX2hvdmVybGF5ZXIubm9kZSgpKTtcbiAgICB9O1xuXG4gICAgdmFyIG5vZGVTZWxlY3QgPSBmdW5jdGlvbihlbGVtZW50LCBkLCBzYW5rZXkpIHtcbiAgICAgICAgdmFyIGV2dCA9IGQubm9kZTtcbiAgICAgICAgZXZ0Lm9yaWdpbmFsRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgZ2QuX2hvdmVyZGF0YSA9IFtldnRdO1xuICAgICAgICBkMy5zZWxlY3QoZWxlbWVudCkuY2FsbChub2RlTm9uSG92ZXJlZFN0eWxlLCBkLCBzYW5rZXkpO1xuICAgICAgICBGeC5jbGljayhnZCwgeyB0YXJnZXQ6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIHZhciBub2RlSG92ZXIgPSBmdW5jdGlvbihlbGVtZW50LCBkLCBzYW5rZXkpIHtcbiAgICAgICAgaWYoZ2QuX2Z1bGxMYXlvdXQuaG92ZXJtb2RlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBkMy5zZWxlY3QoZWxlbWVudCkuY2FsbChub2RlSG92ZXJlZFN0eWxlLCBkLCBzYW5rZXkpO1xuICAgICAgICBpZihkLm5vZGUudHJhY2Uubm9kZS5ob3ZlcmluZm8gIT09ICdza2lwJykge1xuICAgICAgICAgICAgZC5ub2RlLmZ1bGxEYXRhID0gZC5ub2RlLnRyYWNlO1xuICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X2hvdmVyJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBkMy5ldmVudCxcbiAgICAgICAgICAgICAgICBwb2ludHM6IFtkLm5vZGVdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbm9kZUhvdmVyRm9sbG93ID0gZnVuY3Rpb24oZWxlbWVudCwgZCkge1xuICAgICAgICBpZihnZC5fZnVsbExheW91dC5ob3Zlcm1vZGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgdmFyIG9iaiA9IGQubm9kZS50cmFjZS5ub2RlO1xuICAgICAgICBpZihvYmouaG92ZXJpbmZvID09PSAnbm9uZScgfHwgb2JqLmhvdmVyaW5mbyA9PT0gJ3NraXAnKSByZXR1cm47XG4gICAgICAgIHZhciBub2RlUmVjdCA9IGQzLnNlbGVjdChlbGVtZW50KS5zZWxlY3QoJy4nICsgY24ubm9kZVJlY3QpO1xuICAgICAgICB2YXIgcm9vdEJCb3ggPSBnZC5fZnVsbExheW91dC5fcGFwZXJkaXYubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgYm91bmRpbmdCb3ggPSBub2RlUmVjdC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBob3ZlckNlbnRlclgwID0gYm91bmRpbmdCb3gubGVmdCAtIDIgLSByb290QkJveC5sZWZ0O1xuICAgICAgICB2YXIgaG92ZXJDZW50ZXJYMSA9IGJvdW5kaW5nQm94LnJpZ2h0ICsgMiAtIHJvb3RCQm94LmxlZnQ7XG4gICAgICAgIHZhciBob3ZlckNlbnRlclkgPSBib3VuZGluZ0JveC50b3AgKyBib3VuZGluZ0JveC5oZWlnaHQgLyA0IC0gcm9vdEJCb3gudG9wO1xuXG4gICAgICAgIHZhciBob3ZlcnRlbXBsYXRlTGFiZWxzID0ge3ZhbHVlTGFiZWw6IGQzLmZvcm1hdChkLnZhbHVlRm9ybWF0KShkLm5vZGUudmFsdWUpICsgZC52YWx1ZVN1ZmZpeH07XG4gICAgICAgIGQubm9kZS5mdWxsRGF0YSA9IGQubm9kZS50cmFjZTtcblxuICAgICAgICB2YXIgdG9vbHRpcCA9IEZ4LmxvbmVIb3Zlcih7XG4gICAgICAgICAgICB4MDogaG92ZXJDZW50ZXJYMCxcbiAgICAgICAgICAgIHgxOiBob3ZlckNlbnRlclgxLFxuICAgICAgICAgICAgeTogaG92ZXJDZW50ZXJZLFxuICAgICAgICAgICAgbmFtZTogZDMuZm9ybWF0KGQudmFsdWVGb3JtYXQpKGQubm9kZS52YWx1ZSkgKyBkLnZhbHVlU3VmZml4LFxuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIGQubm9kZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmNvbWluZ0xhYmVsICsgZC5ub2RlLnRhcmdldExpbmtzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBvdXRnb2luZ0xhYmVsICsgZC5ub2RlLnNvdXJjZUxpbmtzLmxlbmd0aFxuICAgICAgICAgICAgXS5maWx0ZXIocmVuZGVyYWJsZVZhbHVlUHJlc2VudCkuam9pbignPGJyPicpLFxuICAgICAgICAgICAgY29sb3I6IGNhc3RIb3Zlck9wdGlvbihvYmosICdiZ2NvbG9yJykgfHwgZC50aW55Q29sb3JIdWUsXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogY2FzdEhvdmVyT3B0aW9uKG9iaiwgJ2JvcmRlcmNvbG9yJyksXG4gICAgICAgICAgICBmb250RmFtaWx5OiBjYXN0SG92ZXJPcHRpb24ob2JqLCAnZm9udC5mYW1pbHknKSxcbiAgICAgICAgICAgIGZvbnRTaXplOiBjYXN0SG92ZXJPcHRpb24ob2JqLCAnZm9udC5zaXplJyksXG4gICAgICAgICAgICBmb250Q29sb3I6IGNhc3RIb3Zlck9wdGlvbihvYmosICdmb250LmNvbG9yJyksXG4gICAgICAgICAgICBuYW1lTGVuZ3RoOiBjYXN0SG92ZXJPcHRpb24ob2JqLCAnbmFtZWxlbmd0aCcpLFxuICAgICAgICAgICAgdGV4dEFsaWduOiBjYXN0SG92ZXJPcHRpb24ob2JqLCAnYWxpZ24nKSxcbiAgICAgICAgICAgIGlkZWFsQWxpZ246ICdsZWZ0JyxcblxuICAgICAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogb2JqLmhvdmVydGVtcGxhdGUsXG4gICAgICAgICAgICBob3ZlcnRlbXBsYXRlTGFiZWxzOiBob3ZlcnRlbXBsYXRlTGFiZWxzLFxuICAgICAgICAgICAgZXZlbnREYXRhOiBbZC5ub2RlXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb250YWluZXI6IGZ1bGxMYXlvdXQuX2hvdmVybGF5ZXIubm9kZSgpLFxuICAgICAgICAgICAgb3V0ZXJDb250YWluZXI6IGZ1bGxMYXlvdXQuX3BhcGVyLm5vZGUoKSxcbiAgICAgICAgICAgIGdkOiBnZFxuICAgICAgICB9KTtcblxuICAgICAgICBtYWtlVHJhbnNsdWNlbnQodG9vbHRpcCwgMC44NSk7XG4gICAgICAgIG1ha2VUZXh0Q29udHJhc3R5KHRvb2x0aXApO1xuICAgIH07XG5cbiAgICB2YXIgbm9kZVVuaG92ZXIgPSBmdW5jdGlvbihlbGVtZW50LCBkLCBzYW5rZXkpIHtcbiAgICAgICAgaWYoZ2QuX2Z1bGxMYXlvdXQuaG92ZXJtb2RlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBkMy5zZWxlY3QoZWxlbWVudCkuY2FsbChub2RlTm9uSG92ZXJlZFN0eWxlLCBkLCBzYW5rZXkpO1xuICAgICAgICBpZihkLm5vZGUudHJhY2Uubm9kZS5ob3ZlcmluZm8gIT09ICdza2lwJykge1xuICAgICAgICAgICAgZC5ub2RlLmZ1bGxEYXRhID0gZC5ub2RlLnRyYWNlO1xuICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X3VuaG92ZXInLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGQzLmV2ZW50LFxuICAgICAgICAgICAgICAgIHBvaW50czogW2Qubm9kZV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgRngubG9uZVVuaG92ZXIoZnVsbExheW91dC5faG92ZXJsYXllci5ub2RlKCkpO1xuICAgIH07XG5cbiAgICByZW5kZXIoXG4gICAgICAgIGdkLFxuICAgICAgICBzdmcsXG4gICAgICAgIGNhbGNEYXRhLFxuICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDogc2l6ZS53LFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmgsXG4gICAgICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgICAgICB0OiBzaXplLnQsXG4gICAgICAgICAgICAgICAgcjogc2l6ZS5yLFxuICAgICAgICAgICAgICAgIGI6IHNpemUuYixcbiAgICAgICAgICAgICAgICBsOiBzaXplLmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbGlua0V2ZW50czoge1xuICAgICAgICAgICAgICAgIGhvdmVyOiBsaW5rSG92ZXIsXG4gICAgICAgICAgICAgICAgZm9sbG93OiBsaW5rSG92ZXJGb2xsb3csXG4gICAgICAgICAgICAgICAgdW5ob3ZlcjogbGlua1VuaG92ZXIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiBsaW5rU2VsZWN0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9kZUV2ZW50czoge1xuICAgICAgICAgICAgICAgIGhvdmVyOiBub2RlSG92ZXIsXG4gICAgICAgICAgICAgICAgZm9sbG93OiBub2RlSG92ZXJGb2xsb3csXG4gICAgICAgICAgICAgICAgdW5ob3Zlcjogbm9kZVVuaG92ZXIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiBub2RlU2VsZWN0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIGQzU2Fua2V5ID0gcmVxdWlyZSgnQHBsb3RseS9kMy1zYW5rZXknKTtcbnZhciBkM1NhbmtleUNpcmN1bGFyID0gcmVxdWlyZSgnQHBsb3RseS9kMy1zYW5rZXktY2lyY3VsYXInKTtcbnZhciBkM0ZvcmNlID0gcmVxdWlyZSgnZDMtZm9yY2UnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBndXAgPSByZXF1aXJlKCcuLi8uLi9saWIvZ3VwJyk7XG52YXIga2V5RnVuID0gZ3VwLmtleUZ1bjtcbnZhciByZXBlYXQgPSBndXAucmVwZWF0O1xudmFyIHVud3JhcCA9IGd1cC51bndyYXA7XG52YXIgaW50ZXJwb2xhdGVOdW1iZXIgPSByZXF1aXJlKCdkMy1pbnRlcnBvbGF0ZScpLmludGVycG9sYXRlTnVtYmVyO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xuXG4vLyB2aWV3IG1vZGVsc1xuXG5mdW5jdGlvbiBzYW5rZXlNb2RlbChsYXlvdXQsIGQsIHRyYWNlSW5kZXgpIHtcbiAgICB2YXIgY2FsY0RhdGEgPSB1bndyYXAoZCk7XG4gICAgdmFyIHRyYWNlID0gY2FsY0RhdGEudHJhY2U7XG4gICAgdmFyIGRvbWFpbiA9IHRyYWNlLmRvbWFpbjtcbiAgICB2YXIgaG9yaXpvbnRhbCA9IHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCc7XG4gICAgdmFyIG5vZGVQYWQgPSB0cmFjZS5ub2RlLnBhZDtcbiAgICB2YXIgbm9kZVRoaWNrbmVzcyA9IHRyYWNlLm5vZGUudGhpY2tuZXNzO1xuXG4gICAgdmFyIHdpZHRoID0gbGF5b3V0LndpZHRoICogKGRvbWFpbi54WzFdIC0gZG9tYWluLnhbMF0pO1xuICAgIHZhciBoZWlnaHQgPSBsYXlvdXQuaGVpZ2h0ICogKGRvbWFpbi55WzFdIC0gZG9tYWluLnlbMF0pO1xuXG4gICAgdmFyIG5vZGVzID0gY2FsY0RhdGEuX25vZGVzO1xuICAgIHZhciBsaW5rcyA9IGNhbGNEYXRhLl9saW5rcztcbiAgICB2YXIgY2lyY3VsYXIgPSBjYWxjRGF0YS5jaXJjdWxhcjtcblxuICAgIC8vIFNlbGVjdCBTYW5rZXkgZ2VuZXJhdG9yXG4gICAgdmFyIHNhbmtleTtcbiAgICBpZihjaXJjdWxhcikge1xuICAgICAgICBzYW5rZXkgPSBkM1NhbmtleUNpcmN1bGFyXG4gICAgICAgICAgICAuc2Fua2V5Q2lyY3VsYXIoKVxuICAgICAgICAgICAgLmNpcmN1bGFyTGlua0dhcCgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzYW5rZXkgPSBkM1NhbmtleS5zYW5rZXkoKTtcbiAgICB9XG5cbiAgICBzYW5rZXlcbiAgICAgIC5pdGVyYXRpb25zKGMuc2Fua2V5SXRlcmF0aW9ucylcbiAgICAgIC5zaXplKGhvcml6b250YWwgPyBbd2lkdGgsIGhlaWdodF0gOiBbaGVpZ2h0LCB3aWR0aF0pXG4gICAgICAubm9kZVdpZHRoKG5vZGVUaGlja25lc3MpXG4gICAgICAubm9kZVBhZGRpbmcobm9kZVBhZClcbiAgICAgIC5ub2RlSWQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLnBvaW50TnVtYmVyO1xuICAgICAgfSlcbiAgICAgIC5ub2Rlcyhub2RlcylcbiAgICAgIC5saW5rcyhsaW5rcyk7XG5cbiAgICB2YXIgZ3JhcGggPSBzYW5rZXkoKTtcblxuICAgIGlmKHNhbmtleS5ub2RlUGFkZGluZygpIDwgbm9kZVBhZCkge1xuICAgICAgICBMaWIud2Fybignbm9kZS5wYWQgd2FzIHJlZHVjZWQgdG8gJywgc2Fua2V5Lm5vZGVQYWRkaW5nKCksICcgdG8gZml0IHdpdGhpbiB0aGUgZmlndXJlLicpO1xuICAgIH1cblxuICAgIC8vIENvdW50ZXJzIGZvciBuZXN0ZWQgbG9vcHNcbiAgICB2YXIgaSwgaiwgaztcblxuICAgIC8vIENyZWF0ZSB0cmFuc2llbnQgbm9kZXMgZm9yIGFuaW1hdGlvbnNcbiAgICBmb3IodmFyIG5vZGVQb2ludE51bWJlciBpbiBjYWxjRGF0YS5fZ3JvdXBMb29rdXApIHtcbiAgICAgICAgdmFyIGdyb3VwSW5kZXggPSBwYXJzZUludChjYWxjRGF0YS5fZ3JvdXBMb29rdXBbbm9kZVBvaW50TnVtYmVyXSk7XG5cbiAgICAgICAgLy8gRmluZCBub2RlIHJlcHJlc2VudGluZyBncm91cEluZGV4XG4gICAgICAgIHZhciBncm91cGluZ05vZGU7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZ3JhcGgubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGdyYXBoLm5vZGVzW2ldLnBvaW50TnVtYmVyID09PSBncm91cEluZGV4KSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdOb2RlID0gZ3JhcGgubm9kZXNbaV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgZ3JvdXBpbk5vZGUgaXMgdW5kZWZpbmVkLCBubyBsaW5rcyBhcmUgdGFyZ2V0aW5nIHRoaXMgZ3JvdXBcbiAgICAgICAgaWYoIWdyb3VwaW5nTm9kZSkgY29udGludWU7XG5cbiAgICAgICAgdmFyIGNoaWxkID0ge1xuICAgICAgICAgICAgcG9pbnROdW1iZXI6IHBhcnNlSW50KG5vZGVQb2ludE51bWJlciksXG4gICAgICAgICAgICB4MDogZ3JvdXBpbmdOb2RlLngwLFxuICAgICAgICAgICAgeDE6IGdyb3VwaW5nTm9kZS54MSxcbiAgICAgICAgICAgIHkwOiBncm91cGluZ05vZGUueTAsXG4gICAgICAgICAgICB5MTogZ3JvdXBpbmdOb2RlLnkxLFxuICAgICAgICAgICAgcGFydE9mR3JvdXA6IHRydWUsXG4gICAgICAgICAgICBzb3VyY2VMaW5rczogW10sXG4gICAgICAgICAgICB0YXJnZXRMaW5rczogW11cbiAgICAgICAgfTtcblxuICAgICAgICBncmFwaC5ub2Rlcy51bnNoaWZ0KGNoaWxkKTtcbiAgICAgICAgZ3JvdXBpbmdOb2RlLmNoaWxkcmVuTm9kZXMudW5zaGlmdChjaGlsZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZUxpbmtDb25jZW50cmF0aW9ucygpIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZ3JhcGgubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gZ3JhcGgubm9kZXNbaV07XG4gICAgICAgICAgICAvLyBMaW5rcyBjb25uZWN0aW5nIHRoZSBzYW1lIHR3byBub2RlcyBhcmUgcGFydCBvZiBhIGZsb3dcbiAgICAgICAgICAgIHZhciBmbG93cyA9IHt9O1xuICAgICAgICAgICAgdmFyIGZsb3dLZXk7XG4gICAgICAgICAgICB2YXIgbGluaztcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IG5vZGUudGFyZ2V0TGlua3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsaW5rID0gbm9kZS50YXJnZXRMaW5rc1tqXTtcbiAgICAgICAgICAgICAgICBmbG93S2V5ID0gbGluay5zb3VyY2UucG9pbnROdW1iZXIgKyAnOicgKyBsaW5rLnRhcmdldC5wb2ludE51bWJlcjtcbiAgICAgICAgICAgICAgICBpZighZmxvd3MuaGFzT3duUHJvcGVydHkoZmxvd0tleSkpIGZsb3dzW2Zsb3dLZXldID0gW107XG4gICAgICAgICAgICAgICAgZmxvd3NbZmxvd0tleV0ucHVzaChsaW5rKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29tcHV0ZSBzdGF0aXN0aWNzIGZvciBlYWNoIGZsb3dcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZmxvd3MpO1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwga2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZsb3dLZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgICAgIHZhciBmbG93TGlua3MgPSBmbG93c1tmbG93S2V5XTtcblxuICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIHRvdGFsIHNpemUgb2YgdGhlIGZsb3cgYW5kIHRvdGFsIHNpemUgcGVyIGxhYmVsXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxQZXJMYWJlbCA9IHt9O1xuICAgICAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGZsb3dMaW5rcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rID0gZmxvd0xpbmtzW2tdO1xuICAgICAgICAgICAgICAgICAgICBpZighdG90YWxQZXJMYWJlbFtsaW5rLmxhYmVsXSkgdG90YWxQZXJMYWJlbFtsaW5rLmxhYmVsXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsUGVyTGFiZWxbbGluay5sYWJlbF0gKz0gbGluay52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwgKz0gbGluay52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSByYXRpbyBvZiB0aGUgbGluaydzIHZhbHVlIGFuZCB0aGUgc2l6ZSBvZiB0aGUgZmxvd1xuICAgICAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGZsb3dMaW5rcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rID0gZmxvd0xpbmtzW2tdO1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmZsb3cgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdG90YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbENvbmNlbnRyYXRpb246IHRvdGFsUGVyTGFiZWxbbGluay5sYWJlbF0gLyB0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNlbnRyYXRpb246IGxpbmsudmFsdWUgLyB0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzOiBmbG93TGlua3NcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYobGluay5jb25jZW50cmF0aW9uc2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsuY29sb3IgPSB0aW55Y29sb3IobGluay5jb25jZW50cmF0aW9uc2NhbGUobGluay5mbG93LmxhYmVsQ29uY2VudHJhdGlvbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBHYXRoZXIgc3RhdGlzdGljcyBvZiBhbGwgbGlua3MgYXQgY3VycmVudCBub2RlXG4gICAgICAgICAgICB2YXIgdG90YWxPdXRmbG93ID0gMDtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IG5vZGUuc291cmNlTGlua3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0b3RhbE91dGZsb3cgKz0gbm9kZS5zb3VyY2VMaW5rc1tqXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IG5vZGUuc291cmNlTGlua3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsaW5rID0gbm9kZS5zb3VyY2VMaW5rc1tqXTtcbiAgICAgICAgICAgICAgICBsaW5rLmNvbmNlbnRyYXRpb25PdXQgPSBsaW5rLnZhbHVlIC8gdG90YWxPdXRmbG93O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdG90YWxJbmZsb3cgPSAwO1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbm9kZS50YXJnZXRMaW5rcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHRvdGFsSW5mbG93ICs9IG5vZGUudGFyZ2V0TGlua3Nbal0udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IG5vZGUudGFyZ2V0TGlua3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsaW5rID0gbm9kZS50YXJnZXRMaW5rc1tqXTtcbiAgICAgICAgICAgICAgICBsaW5rLmNvbmNlbnJhdGlvbkluID0gbGluay52YWx1ZSAvIHRvdGFsSW5mbG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVMaW5rQ29uY2VudHJhdGlvbnMoKTtcblxuICAgIC8vIFB1c2ggYW55IG92ZXJsYXBwaW5nIG5vZGVzIGRvd24uXG4gICAgZnVuY3Rpb24gcmVzb2x2ZUNvbGxpc2lvbnNUb3BUb0JvdHRvbShjb2x1bW5zKSB7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihub2Rlcykge1xuICAgICAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgICAgICB2YXIgZHk7XG4gICAgICAgICAgICB2YXIgeSA9IDA7XG4gICAgICAgICAgICB2YXIgbiA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgbm9kZXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEueTAgLSBiLnkwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICAgICAgaWYobm9kZS55MCA+PSB5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIG92ZXJsYXBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkeSA9ICh5IC0gbm9kZS55MCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGR5ID4gMWUtNikgbm9kZS55MCArPSBkeSwgbm9kZS55MSArPSBkeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeSA9IG5vZGUueTEgKyBub2RlUGFkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBHcm91cCBub2RlcyBpbnRvIGNvbHVtbnMgYmFzZWQgb24gdGhlaXIgeCBwb3NpdGlvblxuICAgIGZ1bmN0aW9uIHNuYXBUb0NvbHVtbnMobm9kZXMpIHtcbiAgICAgICAgLy8gU29ydCBub2RlcyBieSB4IHBvc2l0aW9uXG4gICAgICAgIHZhciBvcmRlcmVkTm9kZXMgPSBub2Rlcy5tYXAoZnVuY3Rpb24obiwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4MDogbi54MCxcbiAgICAgICAgICAgICAgICBpbmRleDogaVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEueDAgLSBiLngwO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY29sdW1ucyA9IFtdO1xuICAgICAgICB2YXIgY29sTnVtYmVyID0gLTE7XG4gICAgICAgIHZhciBjb2xYOyAvLyBQb3NpdGlvbiBvZiBjb2x1bW5cbiAgICAgICAgdmFyIGxhc3RYID0gLUluZmluaXR5OyAvLyBQb3NpdGlvbiBvZiBsYXN0IG5vZGVcbiAgICAgICAgdmFyIGR4O1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBvcmRlcmVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbm9kZXNbb3JkZXJlZE5vZGVzW2ldLmluZGV4XTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBub2RlIGRvZXMgbm90IG92ZXJsYXAgd2l0aCB0aGUgbGFzdCBvbmVcbiAgICAgICAgICAgIGlmKG5vZGUueDAgPiBsYXN0WCArIG5vZGVUaGlja25lc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBTdGFydCBhIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2xOdW1iZXIgKz0gMTtcbiAgICAgICAgICAgICAgICBjb2xYID0gbm9kZS54MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RYID0gbm9kZS54MDtcblxuICAgICAgICAgICAgLy8gQWRkIG5vZGUgdG8gaXRzIGFzc29jaWF0ZWQgY29sdW1uXG4gICAgICAgICAgICBpZighY29sdW1uc1tjb2xOdW1iZXJdKSBjb2x1bW5zW2NvbE51bWJlcl0gPSBbXTtcbiAgICAgICAgICAgIGNvbHVtbnNbY29sTnVtYmVyXS5wdXNoKG5vZGUpO1xuXG4gICAgICAgICAgICAvLyBDaGFuZ2Ugbm9kZSdzIHggcG9zaXRpb24gdG8gYWxpZ24gaXQgd2l0aCBpdHMgY29sdW1uXG4gICAgICAgICAgICBkeCA9IGNvbFggLSBub2RlLngwO1xuICAgICAgICAgICAgbm9kZS54MCArPSBkeCwgbm9kZS54MSArPSBkeDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sdW1ucztcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBub2RlIHBvc2l0aW9uXG4gICAgaWYodHJhY2Uubm9kZS54Lmxlbmd0aCAmJiB0cmFjZS5ub2RlLnkubGVuZ3RoKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IE1hdGgubWluKHRyYWNlLm5vZGUueC5sZW5ndGgsIHRyYWNlLm5vZGUueS5sZW5ndGgsIGdyYXBoLm5vZGVzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICAgICAgaWYodHJhY2Uubm9kZS54W2ldICYmIHRyYWNlLm5vZGUueVtpXSkge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBbdHJhY2Uubm9kZS54W2ldICogd2lkdGgsIHRyYWNlLm5vZGUueVtpXSAqIGhlaWdodF07XG4gICAgICAgICAgICAgICAgZ3JhcGgubm9kZXNbaV0ueDAgPSBwb3NbMF0gLSBub2RlVGhpY2tuZXNzIC8gMjtcbiAgICAgICAgICAgICAgICBncmFwaC5ub2Rlc1tpXS54MSA9IHBvc1swXSArIG5vZGVUaGlja25lc3MgLyAyO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVIZWlnaHQgPSBncmFwaC5ub2Rlc1tpXS55MSAtIGdyYXBoLm5vZGVzW2ldLnkwO1xuICAgICAgICAgICAgICAgIGdyYXBoLm5vZGVzW2ldLnkwID0gcG9zWzFdIC0gbm9kZUhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgZ3JhcGgubm9kZXNbaV0ueTEgPSBwb3NbMV0gKyBub2RlSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0cmFjZS5hcnJhbmdlbWVudCA9PT0gJ3NuYXAnKSB7XG4gICAgICAgICAgICBub2RlcyA9IGdyYXBoLm5vZGVzO1xuICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBzbmFwVG9Db2x1bW5zKG5vZGVzKTtcbiAgICAgICAgICAgIHJlc29sdmVDb2xsaXNpb25zVG9wVG9Cb3R0b20oY29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIGxpbmtzXG4gICAgICAgIHNhbmtleS51cGRhdGUoZ3JhcGgpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2lyY3VsYXI6IGNpcmN1bGFyLFxuICAgICAgICBrZXk6IHRyYWNlSW5kZXgsXG4gICAgICAgIHRyYWNlOiB0cmFjZSxcbiAgICAgICAgZ3VpZDogTGliLnJhbmRzdHIoKSxcbiAgICAgICAgaG9yaXpvbnRhbDogaG9yaXpvbnRhbCxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgbm9kZVBhZDogdHJhY2Uubm9kZS5wYWQsXG4gICAgICAgIG5vZGVMaW5lQ29sb3I6IHRyYWNlLm5vZGUubGluZS5jb2xvcixcbiAgICAgICAgbm9kZUxpbmVXaWR0aDogdHJhY2Uubm9kZS5saW5lLndpZHRoLFxuICAgICAgICBsaW5rTGluZUNvbG9yOiB0cmFjZS5saW5rLmxpbmUuY29sb3IsXG4gICAgICAgIGxpbmtMaW5lV2lkdGg6IHRyYWNlLmxpbmsubGluZS53aWR0aCxcbiAgICAgICAgdmFsdWVGb3JtYXQ6IHRyYWNlLnZhbHVlZm9ybWF0LFxuICAgICAgICB2YWx1ZVN1ZmZpeDogdHJhY2UudmFsdWVzdWZmaXgsXG4gICAgICAgIHRleHRGb250OiB0cmFjZS50ZXh0Zm9udCxcbiAgICAgICAgdHJhbnNsYXRlWDogZG9tYWluLnhbMF0gKiBsYXlvdXQud2lkdGggKyBsYXlvdXQubWFyZ2luLmwsXG4gICAgICAgIHRyYW5zbGF0ZVk6IGxheW91dC5oZWlnaHQgLSBkb21haW4ueVsxXSAqIGxheW91dC5oZWlnaHQgKyBsYXlvdXQubWFyZ2luLnQsXG4gICAgICAgIGRyYWdQYXJhbGxlbDogaG9yaXpvbnRhbCA/IGhlaWdodCA6IHdpZHRoLFxuICAgICAgICBkcmFnUGVycGVuZGljdWxhcjogaG9yaXpvbnRhbCA/IHdpZHRoIDogaGVpZ2h0LFxuICAgICAgICBhcnJhbmdlbWVudDogdHJhY2UuYXJyYW5nZW1lbnQsXG4gICAgICAgIHNhbmtleTogc2Fua2V5LFxuICAgICAgICBncmFwaDogZ3JhcGgsXG4gICAgICAgIGZvcmNlTGF5b3V0czoge30sXG4gICAgICAgIGludGVyYWN0aW9uU3RhdGU6IHtcbiAgICAgICAgICAgIGRyYWdJblByb2dyZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGhvdmVyZWQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBsaW5rTW9kZWwoZCwgbCwgaSkge1xuICAgIHZhciB0YyA9IHRpbnljb2xvcihsLmNvbG9yKTtcbiAgICB2YXIgYmFzaWNLZXkgPSBsLnNvdXJjZS5sYWJlbCArICd8JyArIGwudGFyZ2V0LmxhYmVsO1xuICAgIHZhciBrZXkgPSBiYXNpY0tleSArICdfXycgKyBpO1xuXG4gICAgLy8gZm9yIGV2ZW50IGRhdGFcbiAgICBsLnRyYWNlID0gZC50cmFjZTtcbiAgICBsLmN1cnZlTnVtYmVyID0gZC50cmFjZS5pbmRleDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNpcmN1bGFyOiBkLmNpcmN1bGFyLFxuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdHJhY2VJZDogZC5rZXksXG4gICAgICAgIHBvaW50TnVtYmVyOiBsLnBvaW50TnVtYmVyLFxuICAgICAgICBsaW5rOiBsLFxuICAgICAgICB0aW55Q29sb3JIdWU6IENvbG9yLnRpbnlSR0IodGMpLFxuICAgICAgICB0aW55Q29sb3JBbHBoYTogdGMuZ2V0QWxwaGEoKSxcbiAgICAgICAgbGlua1BhdGg6IGxpbmtQYXRoLFxuICAgICAgICBsaW5rTGluZUNvbG9yOiBkLmxpbmtMaW5lQ29sb3IsXG4gICAgICAgIGxpbmtMaW5lV2lkdGg6IGQubGlua0xpbmVXaWR0aCxcbiAgICAgICAgdmFsdWVGb3JtYXQ6IGQudmFsdWVGb3JtYXQsXG4gICAgICAgIHZhbHVlU3VmZml4OiBkLnZhbHVlU3VmZml4LFxuICAgICAgICBzYW5rZXk6IGQuc2Fua2V5LFxuICAgICAgICBwYXJlbnQ6IGQsXG4gICAgICAgIGludGVyYWN0aW9uU3RhdGU6IGQuaW50ZXJhY3Rpb25TdGF0ZSxcbiAgICAgICAgZmxvdzogbC5mbG93XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2lyY3VsYXJDbG9zZWRQYXRoU3RyaW5nKGxpbmspIHtcbiAgICAvLyBVc2luZyBjb29yZGluYXRlcyBjb21wdXRlZCBieSBkMy1zYW5rZXktY2lyY3VsYXJcbiAgICB2YXIgcGF0aFN0cmluZyA9ICcnO1xuICAgIHZhciBvZmZzZXQgPSBsaW5rLndpZHRoIC8gMjtcbiAgICB2YXIgY29vcmRzID0gbGluay5jaXJjdWxhclBhdGhEYXRhO1xuICAgIGlmKGxpbmsuY2lyY3VsYXJMaW5rVHlwZSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgLy8gVG9wIHBhdGhcbiAgICAgICAgcGF0aFN0cmluZyA9XG4gICAgICAgICAgLy8gc3RhcnQgYXQgdGhlIGxlZnQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAgICAgICAgJ00gJyArXG4gICAgICAgICAgY29vcmRzLnRhcmdldFggKyAnICcgKyAoY29vcmRzLnRhcmdldFkgKyBvZmZzZXQpICsgJyAnICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIGNvb3Jkcy5yaWdodElubmVyRXh0ZW50ICsgJyAnICsgKGNvb3Jkcy50YXJnZXRZICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0EnICtcbiAgICAgICAgICAoY29vcmRzLnJpZ2h0TGFyZ2VBcmNSYWRpdXMgKyBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy5yaWdodFNtYWxsQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgMCAwIDEgJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodEZ1bGxFeHRlbnQgLSBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy50YXJnZXRZIC0gY29vcmRzLnJpZ2h0U21hbGxBcmNSYWRpdXMpICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIChjb29yZHMucmlnaHRGdWxsRXh0ZW50IC0gb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbFJpZ2h0SW5uZXJFeHRlbnQgK1xuICAgICAgICAgICdBJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodExhcmdlQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgJyArIChjb29yZHMucmlnaHRMYXJnZUFyY1JhZGl1cyArIG9mZnNldCkgKyAnIDAgMCAxICcgK1xuICAgICAgICAgIGNvb3Jkcy5yaWdodElubmVyRXh0ZW50ICsgJyAnICsgKGNvb3Jkcy52ZXJ0aWNhbEZ1bGxFeHRlbnQgLSBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIGNvb3Jkcy5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnZlcnRpY2FsRnVsbEV4dGVudCAtIG9mZnNldCkgK1xuICAgICAgICAgICdBJyArXG4gICAgICAgICAgKGNvb3Jkcy5sZWZ0TGFyZ2VBcmNSYWRpdXMgKyBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy5sZWZ0TGFyZ2VBcmNSYWRpdXMgKyBvZmZzZXQpICsgJyAwIDAgMSAnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRGdWxsRXh0ZW50ICsgb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbExlZnRJbm5lckV4dGVudCArXG4gICAgICAgICAgJ0wnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRGdWxsRXh0ZW50ICsgb2Zmc2V0KSArICcgJyArIChjb29yZHMuc291cmNlWSAtIGNvb3Jkcy5sZWZ0U21hbGxBcmNSYWRpdXMpICtcbiAgICAgICAgICAnQScgK1xuICAgICAgICAgIChjb29yZHMubGVmdExhcmdlQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgJyArIChjb29yZHMubGVmdFNtYWxsQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgMCAwIDEgJyArXG4gICAgICAgICAgY29vcmRzLmxlZnRJbm5lckV4dGVudCArICcgJyArIChjb29yZHMuc291cmNlWSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnNvdXJjZVggKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgKyBvZmZzZXQpICtcblxuICAgICAgICAgIC8vIFdhbGtpbmcgYmFja1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnNvdXJjZVggKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIGNvb3Jkcy5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnQScgK1xuICAgICAgICAgIChjb29yZHMubGVmdExhcmdlQXJjUmFkaXVzIC0gb2Zmc2V0KSArICcgJyArIChjb29yZHMubGVmdFNtYWxsQXJjUmFkaXVzIC0gb2Zmc2V0KSArICcgMCAwIDAgJyArXG4gICAgICAgICAgKGNvb3Jkcy5sZWZ0RnVsbEV4dGVudCAtIG9mZnNldCkgKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgLSBjb29yZHMubGVmdFNtYWxsQXJjUmFkaXVzKSArXG4gICAgICAgICAgJ0wnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRGdWxsRXh0ZW50IC0gb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbExlZnRJbm5lckV4dGVudCArXG4gICAgICAgICAgJ0EnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnICcgKyAoY29vcmRzLmxlZnRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnIDAgMCAwICcgK1xuICAgICAgICAgIGNvb3Jkcy5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnZlcnRpY2FsRnVsbEV4dGVudCArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnJpZ2h0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnZlcnRpY2FsRnVsbEV4dGVudCArIG9mZnNldCkgK1xuICAgICAgICAgICdBJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodExhcmdlQXJjUmFkaXVzIC0gb2Zmc2V0KSArICcgJyArIChjb29yZHMucmlnaHRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnIDAgMCAwICcgK1xuICAgICAgICAgIChjb29yZHMucmlnaHRGdWxsRXh0ZW50ICsgb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbFJpZ2h0SW5uZXJFeHRlbnQgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodEZ1bGxFeHRlbnQgKyBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy50YXJnZXRZIC0gY29vcmRzLnJpZ2h0U21hbGxBcmNSYWRpdXMpICtcbiAgICAgICAgICAnQScgK1xuICAgICAgICAgIChjb29yZHMucmlnaHRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnICcgKyAoY29vcmRzLnJpZ2h0U21hbGxBcmNSYWRpdXMgLSBvZmZzZXQpICsgJyAwIDAgMCAnICtcbiAgICAgICAgICBjb29yZHMucmlnaHRJbm5lckV4dGVudCArICcgJyArIChjb29yZHMudGFyZ2V0WSAtIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnRhcmdldFggKyAnICcgKyAoY29vcmRzLnRhcmdldFkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnWic7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQm90dG9tIHBhdGhcbiAgICAgICAgcGF0aFN0cmluZyA9XG4gICAgICAgICAgLy8gc3RhcnQgYXQgdGhlIGxlZnQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAgICAgICAgJ00gJyArXG4gICAgICAgICAgY29vcmRzLnRhcmdldFggKyAnICcgKyAoY29vcmRzLnRhcmdldFkgLSBvZmZzZXQpICsgJyAnICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIGNvb3Jkcy5yaWdodElubmVyRXh0ZW50ICsgJyAnICsgKGNvb3Jkcy50YXJnZXRZIC0gb2Zmc2V0KSArXG4gICAgICAgICAgJ0EnICtcbiAgICAgICAgICAoY29vcmRzLnJpZ2h0TGFyZ2VBcmNSYWRpdXMgKyBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy5yaWdodFNtYWxsQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgMCAwIDAgJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodEZ1bGxFeHRlbnQgLSBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy50YXJnZXRZICsgY29vcmRzLnJpZ2h0U21hbGxBcmNSYWRpdXMpICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIChjb29yZHMucmlnaHRGdWxsRXh0ZW50IC0gb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbFJpZ2h0SW5uZXJFeHRlbnQgK1xuICAgICAgICAgICdBJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodExhcmdlQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgJyArIChjb29yZHMucmlnaHRMYXJnZUFyY1JhZGl1cyArIG9mZnNldCkgKyAnIDAgMCAwICcgK1xuICAgICAgICAgIGNvb3Jkcy5yaWdodElubmVyRXh0ZW50ICsgJyAnICsgKGNvb3Jkcy52ZXJ0aWNhbEZ1bGxFeHRlbnQgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIGNvb3Jkcy5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnZlcnRpY2FsRnVsbEV4dGVudCArIG9mZnNldCkgK1xuICAgICAgICAgICdBJyArXG4gICAgICAgICAgKGNvb3Jkcy5sZWZ0TGFyZ2VBcmNSYWRpdXMgKyBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy5sZWZ0TGFyZ2VBcmNSYWRpdXMgKyBvZmZzZXQpICsgJyAwIDAgMCAnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRGdWxsRXh0ZW50ICsgb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbExlZnRJbm5lckV4dGVudCArXG4gICAgICAgICAgJ0wnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRGdWxsRXh0ZW50ICsgb2Zmc2V0KSArICcgJyArIChjb29yZHMuc291cmNlWSArIGNvb3Jkcy5sZWZ0U21hbGxBcmNSYWRpdXMpICtcbiAgICAgICAgICAnQScgK1xuICAgICAgICAgIChjb29yZHMubGVmdExhcmdlQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgJyArIChjb29yZHMubGVmdFNtYWxsQXJjUmFkaXVzICsgb2Zmc2V0KSArICcgMCAwIDAgJyArXG4gICAgICAgICAgY29vcmRzLmxlZnRJbm5lckV4dGVudCArICcgJyArIChjb29yZHMuc291cmNlWSAtIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnNvdXJjZVggKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgLSBvZmZzZXQpICtcblxuICAgICAgICAgIC8vIFdhbGtpbmcgYmFja1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnNvdXJjZVggKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgK1xuICAgICAgICAgIGNvb3Jkcy5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnQScgK1xuICAgICAgICAgIChjb29yZHMubGVmdExhcmdlQXJjUmFkaXVzIC0gb2Zmc2V0KSArICcgJyArIChjb29yZHMubGVmdFNtYWxsQXJjUmFkaXVzIC0gb2Zmc2V0KSArICcgMCAwIDEgJyArXG4gICAgICAgICAgKGNvb3Jkcy5sZWZ0RnVsbEV4dGVudCAtIG9mZnNldCkgKyAnICcgKyAoY29vcmRzLnNvdXJjZVkgKyBjb29yZHMubGVmdFNtYWxsQXJjUmFkaXVzKSArXG4gICAgICAgICAgJ0wnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRGdWxsRXh0ZW50IC0gb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbExlZnRJbm5lckV4dGVudCArXG4gICAgICAgICAgJ0EnICtcbiAgICAgICAgICAoY29vcmRzLmxlZnRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnICcgKyAoY29vcmRzLmxlZnRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnIDAgMCAxICcgK1xuICAgICAgICAgIGNvb3Jkcy5sZWZ0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnZlcnRpY2FsRnVsbEV4dGVudCAtIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnJpZ2h0SW5uZXJFeHRlbnQgKyAnICcgKyAoY29vcmRzLnZlcnRpY2FsRnVsbEV4dGVudCAtIG9mZnNldCkgK1xuICAgICAgICAgICdBJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodExhcmdlQXJjUmFkaXVzIC0gb2Zmc2V0KSArICcgJyArIChjb29yZHMucmlnaHRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnIDAgMCAxICcgK1xuICAgICAgICAgIChjb29yZHMucmlnaHRGdWxsRXh0ZW50ICsgb2Zmc2V0KSArICcgJyArIGNvb3Jkcy52ZXJ0aWNhbFJpZ2h0SW5uZXJFeHRlbnQgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgKGNvb3Jkcy5yaWdodEZ1bGxFeHRlbnQgKyBvZmZzZXQpICsgJyAnICsgKGNvb3Jkcy50YXJnZXRZICsgY29vcmRzLnJpZ2h0U21hbGxBcmNSYWRpdXMpICtcbiAgICAgICAgICAnQScgK1xuICAgICAgICAgIChjb29yZHMucmlnaHRMYXJnZUFyY1JhZGl1cyAtIG9mZnNldCkgKyAnICcgKyAoY29vcmRzLnJpZ2h0U21hbGxBcmNSYWRpdXMgLSBvZmZzZXQpICsgJyAwIDAgMSAnICtcbiAgICAgICAgICBjb29yZHMucmlnaHRJbm5lckV4dGVudCArICcgJyArIChjb29yZHMudGFyZ2V0WSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArXG4gICAgICAgICAgY29vcmRzLnRhcmdldFggKyAnICcgKyAoY29vcmRzLnRhcmdldFkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnWic7XG4gICAgfVxuICAgIHJldHVybiBwYXRoU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBsaW5rUGF0aCgpIHtcbiAgICB2YXIgY3VydmF0dXJlID0gMC41O1xuICAgIGZ1bmN0aW9uIHBhdGgoZCkge1xuICAgICAgICBpZihkLmxpbmsuY2lyY3VsYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVDaXJjdWxhckNsb3NlZFBhdGhTdHJpbmcoZC5saW5rKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB4MCA9IGQubGluay5zb3VyY2UueDE7XG4gICAgICAgICAgICB2YXIgeDEgPSBkLmxpbmsudGFyZ2V0LngwO1xuICAgICAgICAgICAgdmFyIHhpID0gaW50ZXJwb2xhdGVOdW1iZXIoeDAsIHgxKTtcbiAgICAgICAgICAgIHZhciB4MiA9IHhpKGN1cnZhdHVyZSk7XG4gICAgICAgICAgICB2YXIgeDMgPSB4aSgxIC0gY3VydmF0dXJlKTtcbiAgICAgICAgICAgIHZhciB5MGEgPSBkLmxpbmsueTAgLSBkLmxpbmsud2lkdGggLyAyO1xuICAgICAgICAgICAgdmFyIHkwYiA9IGQubGluay55MCArIGQubGluay53aWR0aCAvIDI7XG4gICAgICAgICAgICB2YXIgeTFhID0gZC5saW5rLnkxIC0gZC5saW5rLndpZHRoIC8gMjtcbiAgICAgICAgICAgIHZhciB5MWIgPSBkLmxpbmsueTEgKyBkLmxpbmsud2lkdGggLyAyO1xuICAgICAgICAgICAgcmV0dXJuICdNJyArIHgwICsgJywnICsgeTBhICtcbiAgICAgICAgICAgICAgICAgJ0MnICsgeDIgKyAnLCcgKyB5MGEgK1xuICAgICAgICAgICAgICAgICAnICcgKyB4MyArICcsJyArIHkxYSArXG4gICAgICAgICAgICAgICAgICcgJyArIHgxICsgJywnICsgeTFhICtcbiAgICAgICAgICAgICAgICAgJ0wnICsgeDEgKyAnLCcgKyB5MWIgK1xuICAgICAgICAgICAgICAgICAnQycgKyB4MyArICcsJyArIHkxYiArXG4gICAgICAgICAgICAgICAgICcgJyArIHgyICsgJywnICsgeTBiICtcbiAgICAgICAgICAgICAgICAgJyAnICsgeDAgKyAnLCcgKyB5MGIgK1xuICAgICAgICAgICAgICAgICAnWic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG5cbmZ1bmN0aW9uIG5vZGVNb2RlbChkLCBuKSB7XG4gICAgdmFyIHRjID0gdGlueWNvbG9yKG4uY29sb3IpO1xuICAgIHZhciB6b25lVGhpY2tuZXNzUGFkID0gYy5ub2RlUGFkQWNyb3NzO1xuICAgIHZhciB6b25lTGVuZ3RoUGFkID0gZC5ub2RlUGFkIC8gMjtcbiAgICBuLmR4ID0gbi54MSAtIG4ueDA7XG4gICAgbi5keSA9IG4ueTEgLSBuLnkwO1xuICAgIHZhciB2aXNpYmxlVGhpY2tuZXNzID0gbi5keDtcbiAgICB2YXIgdmlzaWJsZUxlbmd0aCA9IE1hdGgubWF4KDAuNSwgbi5keSk7XG5cbiAgICB2YXIga2V5ID0gJ25vZGVfJyArIG4ucG9pbnROdW1iZXI7XG4gICAgLy8gSWYgaXQncyBhIGdyb3VwLCBpdCdzIG11dGFibGUgYW5kIHNob3VsZCBiZSB1bmlxdWVcbiAgICBpZihuLmdyb3VwKSB7XG4gICAgICAgIGtleSA9IExpYi5yYW5kc3RyKCk7XG4gICAgfVxuXG4gICAgLy8gZm9yIGV2ZW50IGRhdGFcbiAgICBuLnRyYWNlID0gZC50cmFjZTtcbiAgICBuLmN1cnZlTnVtYmVyID0gZC50cmFjZS5pbmRleDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4OiBuLnBvaW50TnVtYmVyLFxuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgcGFydE9mR3JvdXA6IG4ucGFydE9mR3JvdXAgfHwgZmFsc2UsXG4gICAgICAgIGdyb3VwOiBuLmdyb3VwLFxuICAgICAgICB0cmFjZUlkOiBkLmtleSxcbiAgICAgICAgdHJhY2U6IGQudHJhY2UsXG4gICAgICAgIG5vZGU6IG4sXG4gICAgICAgIG5vZGVQYWQ6IGQubm9kZVBhZCxcbiAgICAgICAgbm9kZUxpbmVDb2xvcjogZC5ub2RlTGluZUNvbG9yLFxuICAgICAgICBub2RlTGluZVdpZHRoOiBkLm5vZGVMaW5lV2lkdGgsXG4gICAgICAgIHRleHRGb250OiBkLnRleHRGb250LFxuICAgICAgICBzaXplOiBkLmhvcml6b250YWwgPyBkLmhlaWdodCA6IGQud2lkdGgsXG4gICAgICAgIHZpc2libGVXaWR0aDogTWF0aC5jZWlsKHZpc2libGVUaGlja25lc3MpLFxuICAgICAgICB2aXNpYmxlSGVpZ2h0OiB2aXNpYmxlTGVuZ3RoLFxuICAgICAgICB6b25lWDogLXpvbmVUaGlja25lc3NQYWQsXG4gICAgICAgIHpvbmVZOiAtem9uZUxlbmd0aFBhZCxcbiAgICAgICAgem9uZVdpZHRoOiB2aXNpYmxlVGhpY2tuZXNzICsgMiAqIHpvbmVUaGlja25lc3NQYWQsXG4gICAgICAgIHpvbmVIZWlnaHQ6IHZpc2libGVMZW5ndGggKyAyICogem9uZUxlbmd0aFBhZCxcbiAgICAgICAgbGFiZWxZOiBkLmhvcml6b250YWwgPyBuLmR5IC8gMiArIDEgOiBuLmR4IC8gMiArIDEsXG4gICAgICAgIGxlZnQ6IG4ub3JpZ2luYWxMYXllciA9PT0gMSxcbiAgICAgICAgc2l6ZUFjcm9zczogZC53aWR0aCxcbiAgICAgICAgZm9yY2VMYXlvdXRzOiBkLmZvcmNlTGF5b3V0cyxcbiAgICAgICAgaG9yaXpvbnRhbDogZC5ob3Jpem9udGFsLFxuICAgICAgICBkYXJrQmFja2dyb3VuZDogdGMuZ2V0QnJpZ2h0bmVzcygpIDw9IDEyOCxcbiAgICAgICAgdGlueUNvbG9ySHVlOiBDb2xvci50aW55UkdCKHRjKSxcbiAgICAgICAgdGlueUNvbG9yQWxwaGE6IHRjLmdldEFscGhhKCksXG4gICAgICAgIHZhbHVlRm9ybWF0OiBkLnZhbHVlRm9ybWF0LFxuICAgICAgICB2YWx1ZVN1ZmZpeDogZC52YWx1ZVN1ZmZpeCxcbiAgICAgICAgc2Fua2V5OiBkLnNhbmtleSxcbiAgICAgICAgZ3JhcGg6IGQuZ3JhcGgsXG4gICAgICAgIGFycmFuZ2VtZW50OiBkLmFycmFuZ2VtZW50LFxuICAgICAgICB1bmlxdWVOb2RlTGFiZWxQYXRoSWQ6IFtkLmd1aWQsIGQua2V5LCBrZXldLmpvaW4oJ18nKSxcbiAgICAgICAgaW50ZXJhY3Rpb25TdGF0ZTogZC5pbnRlcmFjdGlvblN0YXRlLFxuICAgICAgICBmaWd1cmU6IGRcbiAgICB9O1xufVxuXG4vLyByZW5kZXJpbmcgc25pcHBldHNcblxuZnVuY3Rpb24gdXBkYXRlTm9kZVBvc2l0aW9ucyhzYW5rZXlOb2RlKSB7XG4gICAgc2Fua2V5Tm9kZVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQubm9kZS54MC50b0ZpeGVkKDMpICsgJywgJyArIChkLm5vZGUueTApLnRvRml4ZWQoMykgKyAnKSc7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVOb2RlU2hhcGVzKHNhbmtleU5vZGUpIHtcbiAgICBzYW5rZXlOb2RlLmNhbGwodXBkYXRlTm9kZVBvc2l0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNoYXBlcyhzYW5rZXlOb2RlLCBzYW5rZXlMaW5rKSB7XG4gICAgc2Fua2V5Tm9kZS5jYWxsKHVwZGF0ZU5vZGVTaGFwZXMpO1xuICAgIHNhbmtleUxpbmsuYXR0cignZCcsIGxpbmtQYXRoKCkpO1xufVxuXG5mdW5jdGlvbiBzaXplTm9kZShyZWN0KSB7XG4gICAgcmVjdFxuICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24oZCkge3JldHVybiBkLm5vZGUueDEgLSBkLm5vZGUueDA7fSlcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQudmlzaWJsZUhlaWdodDt9KTtcbn1cblxuZnVuY3Rpb24gc2FsaWVudEVub3VnaChkKSB7cmV0dXJuIChkLmxpbmsud2lkdGggPiAxIHx8IGQubGlua0xpbmVXaWR0aCA+IDApO31cblxuZnVuY3Rpb24gc2Fua2V5VHJhbnNmb3JtKGQpIHtcbiAgICB2YXIgb2Zmc2V0ID0gJ3RyYW5zbGF0ZSgnICsgZC50cmFuc2xhdGVYICsgJywnICsgZC50cmFuc2xhdGVZICsgJyknO1xuICAgIHJldHVybiBvZmZzZXQgKyAoZC5ob3Jpem9udGFsID8gJ21hdHJpeCgxIDAgMCAxIDAgMCknIDogJ21hdHJpeCgwIDEgMSAwIDAgMCknKTtcbn1cblxuZnVuY3Rpb24gbm9kZUNlbnRlcmluZyhkKSB7XG4gICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIChkLmhvcml6b250YWwgPyAwIDogZC5sYWJlbFkpICsgJyAnICsgKGQuaG9yaXpvbnRhbCA/IGQubGFiZWxZIDogMCkgKyAnKSc7XG59XG5cbmZ1bmN0aW9uIHRleHRHdWlkZVBhdGgoZCkge1xuICAgIHJldHVybiBkMy5zdmcubGluZSgpKFtcbiAgICAgICAgW2QuaG9yaXpvbnRhbCA/IChkLmxlZnQgPyAtZC5zaXplQWNyb3NzIDogZC52aXNpYmxlV2lkdGggKyBjLm5vZGVUZXh0T2Zmc2V0SG9yaXpvbnRhbCkgOiBjLm5vZGVUZXh0T2Zmc2V0SG9yaXpvbnRhbCwgMF0sXG4gICAgICAgIFtkLmhvcml6b250YWwgPyAoZC5sZWZ0ID8gLSBjLm5vZGVUZXh0T2Zmc2V0SG9yaXpvbnRhbCA6IGQuc2l6ZUFjcm9zcykgOiBkLnZpc2libGVIZWlnaHQgLSBjLm5vZGVUZXh0T2Zmc2V0SG9yaXpvbnRhbCwgMF1cbiAgICBdKTtcbn1cblxuZnVuY3Rpb24gc2Fua2V5SW52ZXJzZVRyYW5zZm9ybShkKSB7cmV0dXJuIGQuaG9yaXpvbnRhbCA/ICdtYXRyaXgoMSAwIDAgMSAwIDApJyA6ICdtYXRyaXgoMCAxIDEgMCAwIDApJzt9XG5mdW5jdGlvbiB0ZXh0RmxpcChkKSB7cmV0dXJuIGQuaG9yaXpvbnRhbCA/ICdzY2FsZSgxIDEpJyA6ICdzY2FsZSgtMSAxKSc7fVxuZnVuY3Rpb24gbm9kZVRleHRDb2xvcihkKSB7cmV0dXJuIGQuZGFya0JhY2tncm91bmQgJiYgIWQuaG9yaXpvbnRhbCA/ICdyZ2IoMjU1LDI1NSwyNTUpJyA6ICdyZ2IoMCwwLDApJzt9XG5mdW5jdGlvbiBub2RlVGV4dE9mZnNldChkKSB7cmV0dXJuIGQuaG9yaXpvbnRhbCAmJiBkLmxlZnQgPyAnMTAwJScgOiAnMCUnO31cblxuLy8gZXZlbnQgaGFuZGxpbmdcblxuZnVuY3Rpb24gYXR0YWNoUG9pbnRlckV2ZW50cyhzZWxlY3Rpb24sIHNhbmtleSwgZXZlbnRTZXQpIHtcbiAgICBzZWxlY3Rpb25cbiAgICAgICAgLm9uKCcuYmFzaWMnLCBudWxsKSAvLyByZW1vdmUgYW55IHByZWV4aXN0aW5nIGhhbmRsZXJzXG4gICAgICAgIC5vbignbW91c2VvdmVyLmJhc2ljJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYoIWQuaW50ZXJhY3Rpb25TdGF0ZS5kcmFnSW5Qcm9ncmVzcyAmJiAhZC5wYXJ0T2ZHcm91cCkge1xuICAgICAgICAgICAgICAgIGV2ZW50U2V0LmhvdmVyKHRoaXMsIGQsIHNhbmtleSk7XG4gICAgICAgICAgICAgICAgZC5pbnRlcmFjdGlvblN0YXRlLmhvdmVyZWQgPSBbdGhpcywgZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbW91c2Vtb3ZlLmJhc2ljJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYoIWQuaW50ZXJhY3Rpb25TdGF0ZS5kcmFnSW5Qcm9ncmVzcyAmJiAhZC5wYXJ0T2ZHcm91cCkge1xuICAgICAgICAgICAgICAgIGV2ZW50U2V0LmZvbGxvdyh0aGlzLCBkKTtcbiAgICAgICAgICAgICAgICBkLmludGVyYWN0aW9uU3RhdGUuaG92ZXJlZCA9IFt0aGlzLCBkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZW91dC5iYXNpYycsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmKCFkLmludGVyYWN0aW9uU3RhdGUuZHJhZ0luUHJvZ3Jlc3MgJiYgIWQucGFydE9mR3JvdXApIHtcbiAgICAgICAgICAgICAgICBldmVudFNldC51bmhvdmVyKHRoaXMsIGQsIHNhbmtleSk7XG4gICAgICAgICAgICAgICAgZC5pbnRlcmFjdGlvblN0YXRlLmhvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5iYXNpYycsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmKGQuaW50ZXJhY3Rpb25TdGF0ZS5ob3ZlcmVkKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRTZXQudW5ob3Zlcih0aGlzLCBkLCBzYW5rZXkpO1xuICAgICAgICAgICAgICAgIGQuaW50ZXJhY3Rpb25TdGF0ZS5ob3ZlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighZC5pbnRlcmFjdGlvblN0YXRlLmRyYWdJblByb2dyZXNzICYmICFkLnBhcnRPZkdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRTZXQuc2VsZWN0KHRoaXMsIGQsIHNhbmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhdHRhY2hEcmFnSGFuZGxlcihzYW5rZXlOb2RlLCBzYW5rZXlMaW5rLCBjYWxsYmFja3MsIGdkKSB7XG4gICAgdmFyIGRyYWdCZWhhdmlvciA9IGQzLmJlaGF2aW9yLmRyYWcoKVxuICAgICAgICAub3JpZ2luKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogZC5ub2RlLngwICsgZC52aXNpYmxlV2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHk6IGQubm9kZS55MCArIGQudmlzaWJsZUhlaWdodCAvIDJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG5cbiAgICAgICAgLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZihkLmFycmFuZ2VtZW50ID09PSAnZml4ZWQnKSByZXR1cm47XG4gICAgICAgICAgICBMaWIuZW5zdXJlU2luZ2xlKGdkLl9mdWxsTGF5b3V0Ll9pbmZvbGF5ZXIsICdnJywgJ2RyYWdjb3ZlcicsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICBnZC5fZnVsbExheW91dC5fZHJhZ0NvdmVyID0gcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgTGliLnJhaXNlVG9Ub3AodGhpcyk7XG4gICAgICAgICAgICBkLmludGVyYWN0aW9uU3RhdGUuZHJhZ0luUHJvZ3Jlc3MgPSBkLm5vZGU7XG5cbiAgICAgICAgICAgIHNhdmVDdXJyZW50RHJhZ1Bvc2l0aW9uKGQubm9kZSk7XG4gICAgICAgICAgICBpZihkLmludGVyYWN0aW9uU3RhdGUuaG92ZXJlZCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5ub2RlRXZlbnRzLnVuaG92ZXIuYXBwbHkoMCwgZC5pbnRlcmFjdGlvblN0YXRlLmhvdmVyZWQpO1xuICAgICAgICAgICAgICAgIGQuaW50ZXJhY3Rpb25TdGF0ZS5ob3ZlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkLmFycmFuZ2VtZW50ID09PSAnc25hcCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9yY2VLZXkgPSBkLnRyYWNlSWQgKyAnfCcgKyBkLmtleTtcbiAgICAgICAgICAgICAgICBpZihkLmZvcmNlTGF5b3V0c1tmb3JjZUtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZC5mb3JjZUxheW91dHNbZm9yY2VLZXldLmFscGhhKDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG1ha2UgYSBmb3JjZUxheW91dCBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoRm9yY2Uoc2Fua2V5Tm9kZSwgZm9yY2VLZXksIGQsIGdkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnRGb3JjZShzYW5rZXlOb2RlLCBzYW5rZXlMaW5rLCBkLCBmb3JjZUtleSwgZ2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5vbignZHJhZycsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmKGQuYXJyYW5nZW1lbnQgPT09ICdmaXhlZCcpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB4ID0gZDMuZXZlbnQueDtcbiAgICAgICAgICAgIHZhciB5ID0gZDMuZXZlbnQueTtcbiAgICAgICAgICAgIGlmKGQuYXJyYW5nZW1lbnQgPT09ICdzbmFwJykge1xuICAgICAgICAgICAgICAgIGQubm9kZS54MCA9IHggLSBkLnZpc2libGVXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgZC5ub2RlLngxID0geCArIGQudmlzaWJsZVdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBkLm5vZGUueTAgPSB5IC0gZC52aXNpYmxlSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICBkLm5vZGUueTEgPSB5ICsgZC52aXNpYmxlSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoZC5hcnJhbmdlbWVudCA9PT0gJ2ZyZWVmb3JtJykge1xuICAgICAgICAgICAgICAgICAgICBkLm5vZGUueDAgPSB4IC0gZC52aXNpYmxlV2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBkLm5vZGUueDEgPSB4ICsgZC52aXNpYmxlV2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZC5zaXplIC0gZC52aXNpYmxlSGVpZ2h0IC8gMiwgeSkpO1xuICAgICAgICAgICAgICAgIGQubm9kZS55MCA9IHkgLSBkLnZpc2libGVIZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgIGQubm9kZS55MSA9IHkgKyBkLnZpc2libGVIZWlnaHQgLyAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzYXZlQ3VycmVudERyYWdQb3NpdGlvbihkLm5vZGUpO1xuICAgICAgICAgICAgaWYoZC5hcnJhbmdlbWVudCAhPT0gJ3NuYXAnKSB7XG4gICAgICAgICAgICAgICAgZC5zYW5rZXkudXBkYXRlKGQuZ3JhcGgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNoYXBlcyhzYW5rZXlOb2RlLmZpbHRlcihzYW1lTGF5ZXIoZCkpLCBzYW5rZXlMaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAub24oJ2RyYWdlbmQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZihkLmFycmFuZ2VtZW50ID09PSAnZml4ZWQnKSByZXR1cm47XG4gICAgICAgICAgICBkLmludGVyYWN0aW9uU3RhdGUuZHJhZ0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkLm5vZGUuY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGQubm9kZS5jaGlsZHJlbk5vZGVzW2ldLnggPSBkLm5vZGUueDtcbiAgICAgICAgICAgICAgICBkLm5vZGUuY2hpbGRyZW5Ob2Rlc1tpXS55ID0gZC5ub2RlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkLmFycmFuZ2VtZW50ICE9PSAnc25hcCcpIHBlcnNpc3RGaW5hbE5vZGVQb3NpdGlvbnMoZCwgZ2QpO1xuICAgICAgICB9KTtcblxuICAgIHNhbmtleU5vZGVcbiAgICAgICAgLm9uKCcuZHJhZycsIG51bGwpIC8vIHJlbW92ZSBwb3NzaWJsZSBwcmV2aW91cyBoYW5kbGVyc1xuICAgICAgICAuY2FsbChkcmFnQmVoYXZpb3IpO1xufVxuXG5mdW5jdGlvbiBhdHRhY2hGb3JjZShzYW5rZXlOb2RlLCBmb3JjZUtleSwgZCwgZ2QpIHtcbiAgICAvLyBBdHRhY2ggZm9yY2UgdG8gbm9kZXMgaW4gdGhlIHNhbWUgY29sdW1uIChzYW1lIHggY29vcmRpbmF0ZSlcbiAgICBzd2l0Y2hUb0ZvcmNlRm9ybWF0KGQuZ3JhcGgubm9kZXMpO1xuICAgIHZhciBub2RlcyA9IGQuZ3JhcGgubm9kZXNcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihuKSB7cmV0dXJuIG4ub3JpZ2luYWxYID09PSBkLm5vZGUub3JpZ2luYWxYO30pXG4gICAgICAgIC8vIEZpbHRlciBvdXQgY2hpbGRyZW5cbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihuKSB7cmV0dXJuICFuLnBhcnRPZkdyb3VwO30pO1xuICAgIGQuZm9yY2VMYXlvdXRzW2ZvcmNlS2V5XSA9IGQzRm9yY2UuZm9yY2VTaW11bGF0aW9uKG5vZGVzKVxuICAgICAgICAuYWxwaGFEZWNheSgwKVxuICAgICAgICAuZm9yY2UoJ2NvbGxpZGUnLCBkM0ZvcmNlLmZvcmNlQ29sbGlkZSgpXG4gICAgICAgICAgICAucmFkaXVzKGZ1bmN0aW9uKG4pIHtyZXR1cm4gbi5keSAvIDIgKyBkLm5vZGVQYWQgLyAyO30pXG4gICAgICAgICAgICAuc3RyZW5ndGgoMSlcbiAgICAgICAgICAgIC5pdGVyYXRpb25zKGMuZm9yY2VJdGVyYXRpb25zKSlcbiAgICAgICAgLmZvcmNlKCdjb25zdHJhaW4nLCBzbmFwcGluZ0ZvcmNlKHNhbmtleU5vZGUsIGZvcmNlS2V5LCBub2RlcywgZCwgZ2QpKVxuICAgICAgICAuc3RvcCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydEZvcmNlKHNhbmtleU5vZGUsIHNhbmtleUxpbmssIGQsIGZvcmNlS2V5LCBnZCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gZmFzdGVyKCkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgYy5mb3JjZVRpY2tzUGVyRnJhbWU7IGkrKykge1xuICAgICAgICAgICAgZC5mb3JjZUxheW91dHNbZm9yY2VLZXldLnRpY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub2RlcyA9IGQuZ3JhcGgubm9kZXM7XG4gICAgICAgIHN3aXRjaFRvU2Fua2V5Rm9ybWF0KG5vZGVzKTtcblxuICAgICAgICBkLnNhbmtleS51cGRhdGUoZC5ncmFwaCk7XG4gICAgICAgIHVwZGF0ZVNoYXBlcyhzYW5rZXlOb2RlLmZpbHRlcihzYW1lTGF5ZXIoZCkpLCBzYW5rZXlMaW5rKTtcblxuICAgICAgICBpZihkLmZvcmNlTGF5b3V0c1tmb3JjZUtleV0uYWxwaGEoKSA+IDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmFzdGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgZmluYWwgeCBwb3NpdGlvbiBpcyBlcXVhbCB0byBpdHMgb3JpZ2luYWwgdmFsdWVcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhlIGZvcmNlIHNpbXVsYXRpb24gd2lsbCBoYXZlIG51bWVyaWNhbCBlcnJvclxuICAgICAgICAgICAgdmFyIHggPSBkLm5vZGUub3JpZ2luYWxYO1xuICAgICAgICAgICAgZC5ub2RlLngwID0geCAtIGQudmlzaWJsZVdpZHRoIC8gMjtcbiAgICAgICAgICAgIGQubm9kZS54MSA9IHggKyBkLnZpc2libGVXaWR0aCAvIDI7XG5cbiAgICAgICAgICAgIHBlcnNpc3RGaW5hbE5vZGVQb3NpdGlvbnMoZCwgZ2QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNuYXBwaW5nRm9yY2Uoc2Fua2V5Tm9kZSwgZm9yY2VLZXksIG5vZGVzLCBkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9zbmFwcGluZ0ZvcmNlKCkge1xuICAgICAgICB2YXIgbWF4VmVsb2NpdHkgPSAwO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZihuID09PSBkLmludGVyYWN0aW9uU3RhdGUuZHJhZ0luUHJvZ3Jlc3MpIHsgLy8gY29uc3RyYWluIG5vZGUgcG9zaXRpb24gdG8gdGhlIGRyYWdnaW5nIHBvaW50ZXJcbiAgICAgICAgICAgICAgICBuLnggPSBuLmxhc3REcmFnZ2VkWDtcbiAgICAgICAgICAgICAgICBuLnkgPSBuLmxhc3REcmFnZ2VkWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbi52eCA9IChuLm9yaWdpbmFsWCAtIG4ueCkgLyBjLmZvcmNlVGlja3NQZXJGcmFtZTsgLy8gc25hcCB0byBsYXllclxuICAgICAgICAgICAgICAgIG4ueSA9IE1hdGgubWluKGQuc2l6ZSAtIG4uZHkgLyAyLCBNYXRoLm1heChuLmR5IC8gMiwgbi55KSk7IC8vIGNvbnN0cmFpbiB0byBleHRlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1heFZlbG9jaXR5ID0gTWF0aC5tYXgobWF4VmVsb2NpdHksIE1hdGguYWJzKG4udngpLCBNYXRoLmFicyhuLnZ5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWQuaW50ZXJhY3Rpb25TdGF0ZS5kcmFnSW5Qcm9ncmVzcyAmJiBtYXhWZWxvY2l0eSA8IDAuMSAmJiBkLmZvcmNlTGF5b3V0c1tmb3JjZUtleV0uYWxwaGEoKSA+IDApIHtcbiAgICAgICAgICAgIGQuZm9yY2VMYXlvdXRzW2ZvcmNlS2V5XS5hbHBoYSgwKTsgLy8gVGhpcyB3aWxsIHN0b3AgdGhlIGFuaW1hdGlvbiBsb29wXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBiYXNpYyBkYXRhIHV0aWxpdGllc1xuXG5mdW5jdGlvbiBwZXJzaXN0RmluYWxOb2RlUG9zaXRpb25zKGQsIGdkKSB7XG4gICAgdmFyIHggPSBbXTtcbiAgICB2YXIgeSA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkLmdyYXBoLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBub2RlWCA9IChkLmdyYXBoLm5vZGVzW2ldLngwICsgZC5ncmFwaC5ub2Rlc1tpXS54MSkgLyAyO1xuICAgICAgICB2YXIgbm9kZVkgPSAoZC5ncmFwaC5ub2Rlc1tpXS55MCArIGQuZ3JhcGgubm9kZXNbaV0ueTEpIC8gMjtcbiAgICAgICAgeC5wdXNoKG5vZGVYIC8gZC5maWd1cmUud2lkdGgpO1xuICAgICAgICB5LnB1c2gobm9kZVkgLyBkLmZpZ3VyZS5oZWlnaHQpO1xuICAgIH1cbiAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVzdHlsZScsIGdkLCB7XG4gICAgICAgICdub2RlLngnOiBbeF0sXG4gICAgICAgICdub2RlLnknOiBbeV1cbiAgICB9LCBkLnRyYWNlLmluZGV4KVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihnZC5fZnVsbExheW91dC5fZHJhZ0NvdmVyKSBnZC5fZnVsbExheW91dC5fZHJhZ0NvdmVyLnJlbW92ZSgpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwZXJzaXN0T3JpZ2luYWxQbGFjZShub2Rlcykge1xuICAgIHZhciBkaXN0aW5jdExheWVyUG9zaXRpb25zID0gW107XG4gICAgdmFyIGk7XG4gICAgZm9yKGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZXNbaV0ub3JpZ2luYWxYID0gKG5vZGVzW2ldLngwICsgbm9kZXNbaV0ueDEpIC8gMjtcbiAgICAgICAgbm9kZXNbaV0ub3JpZ2luYWxZID0gKG5vZGVzW2ldLnkwICsgbm9kZXNbaV0ueTEpIC8gMjtcbiAgICAgICAgaWYoZGlzdGluY3RMYXllclBvc2l0aW9ucy5pbmRleE9mKG5vZGVzW2ldLm9yaWdpbmFsWCkgPT09IC0xKSB7XG4gICAgICAgICAgICBkaXN0aW5jdExheWVyUG9zaXRpb25zLnB1c2gobm9kZXNbaV0ub3JpZ2luYWxYKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXN0aW5jdExheWVyUG9zaXRpb25zLnNvcnQoZnVuY3Rpb24oYSwgYikge3JldHVybiBhIC0gYjt9KTtcbiAgICBmb3IoaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBub2Rlc1tpXS5vcmlnaW5hbExheWVySW5kZXggPSBkaXN0aW5jdExheWVyUG9zaXRpb25zLmluZGV4T2Yobm9kZXNbaV0ub3JpZ2luYWxYKTtcbiAgICAgICAgbm9kZXNbaV0ub3JpZ2luYWxMYXllciA9IG5vZGVzW2ldLm9yaWdpbmFsTGF5ZXJJbmRleCAvIChkaXN0aW5jdExheWVyUG9zaXRpb25zLmxlbmd0aCAtIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2F2ZUN1cnJlbnREcmFnUG9zaXRpb24oZCkge1xuICAgIGQubGFzdERyYWdnZWRYID0gZC54MCArIGQuZHggLyAyO1xuICAgIGQubGFzdERyYWdnZWRZID0gZC55MCArIGQuZHkgLyAyO1xufVxuXG5mdW5jdGlvbiBzYW1lTGF5ZXIoZCkge1xuICAgIHJldHVybiBmdW5jdGlvbihuKSB7cmV0dXJuIG4ubm9kZS5vcmlnaW5hbFggPT09IGQubm9kZS5vcmlnaW5hbFg7fTtcbn1cblxuZnVuY3Rpb24gc3dpdGNoVG9Gb3JjZUZvcm1hdChub2Rlcykge1xuICAgIC8vIGZvcmNlIHVzZXMgeCwgeSBhcyBjZW50ZXJzXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5vZGVzW2ldLnkgPSAobm9kZXNbaV0ueTAgKyBub2Rlc1tpXS55MSkgLyAyO1xuICAgICAgICBub2Rlc1tpXS54ID0gKG5vZGVzW2ldLngwICsgbm9kZXNbaV0ueDEpIC8gMjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFRvU2Fua2V5Rm9ybWF0KG5vZGVzKSB7XG4gICAgLy8gc2Fua2V5IHVzZXMgeDAsIHgxLCB5MCwgeTFcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZXNbaV0ueTAgPSBub2Rlc1tpXS55IC0gbm9kZXNbaV0uZHkgLyAyO1xuICAgICAgICBub2Rlc1tpXS55MSA9IG5vZGVzW2ldLnkwICsgbm9kZXNbaV0uZHk7XG5cbiAgICAgICAgbm9kZXNbaV0ueDAgPSBub2Rlc1tpXS54IC0gbm9kZXNbaV0uZHggLyAyO1xuICAgICAgICBub2Rlc1tpXS54MSA9IG5vZGVzW2ldLngwICsgbm9kZXNbaV0uZHg7XG4gICAgfVxufVxuXG4vLyBzY2VuZSBncmFwaFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihnZCwgc3ZnLCBjYWxjRGF0YSwgbGF5b3V0LCBjYWxsYmFja3MpIHtcbiAgICAvLyBUbyBwcmV2ZW50IGFuaW1hdGlvbiBvbiBmaXJzdCByZW5kZXJcbiAgICB2YXIgZmlyc3RSZW5kZXIgPSBmYWxzZTtcbiAgICBMaWIuZW5zdXJlU2luZ2xlKGdkLl9mdWxsTGF5b3V0Ll9pbmZvbGF5ZXIsICdnJywgJ2ZpcnN0LXJlbmRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmaXJzdFJlbmRlciA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAvLyBUbyBwcmV2ZW50IGFuaW1hdGlvbiBvbiBkcmFnZ2luZ1xuICAgIHZhciBkcmFnY292ZXIgPSBnZC5fZnVsbExheW91dC5fZHJhZ0NvdmVyO1xuXG4gICAgdmFyIHN0eWxlZERhdGEgPSBjYWxjRGF0YVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihkKSB7cmV0dXJuIHVud3JhcChkKS50cmFjZS52aXNpYmxlO30pXG4gICAgICAgICAgICAubWFwKHNhbmtleU1vZGVsLmJpbmQobnVsbCwgbGF5b3V0KSk7XG5cbiAgICB2YXIgc2Fua2V5ID0gc3ZnLnNlbGVjdEFsbCgnLicgKyBjLmNuLnNhbmtleSlcbiAgICAgICAgLmRhdGEoc3R5bGVkRGF0YSwga2V5RnVuKTtcblxuICAgIHNhbmtleS5leGl0KClcbiAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgc2Fua2V5LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uc2Fua2V5LCB0cnVlKVxuICAgICAgICAuc3R5bGUoJ2JveC1zaXppbmcnLCAnY29udGVudC1ib3gnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgMClcbiAgICAgICAgLnN0eWxlKCdzaGFwZS1yZW5kZXJpbmcnLCAnZ2VvbWV0cmljUHJlY2lzaW9uJylcbiAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHNhbmtleVRyYW5zZm9ybSk7XG5cbiAgICBzYW5rZXkuZWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIGdkLl9mdWxsRGF0YVtpXS5fc2Fua2V5ID0gZDtcbiAgICAgICAgLy8gQ3JlYXRlIGRyYWdib3ggaWYgbWlzc2luZ1xuICAgICAgICB2YXIgZHJhZ2JveENsYXNzTmFtZSA9ICdiZ3NhbmtleS0nICsgZC50cmFjZS51aWQgKyAnLScgKyBpO1xuICAgICAgICBMaWIuZW5zdXJlU2luZ2xlKGdkLl9mdWxsTGF5b3V0Ll9kcmFnZ2VycywgJ3JlY3QnLCBkcmFnYm94Q2xhc3NOYW1lKTtcblxuICAgICAgICBnZC5fZnVsbERhdGFbaV0uX2JnUmVjdCA9IGQzLnNlbGVjdCgnLicgKyBkcmFnYm94Q2xhc3NOYW1lKTtcblxuICAgICAgICAvLyBTdHlsZSBkcmFnYm94XG4gICAgICAgIGdkLl9mdWxsRGF0YVtpXS5fYmdSZWN0XG4gICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKVxuICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGQud2lkdGgpXG4gICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQuaGVpZ2h0KVxuICAgICAgICAgIC5hdHRyKCd4JywgZC50cmFuc2xhdGVYKVxuICAgICAgICAgIC5hdHRyKCd5JywgZC50cmFuc2xhdGVZKVxuICAgICAgICAgIC5jbGFzc2VkKCdiZ3NhbmtleScsIHRydWUpXG4gICAgICAgICAgLnN0eWxlKHtmaWxsOiAndHJhbnNwYXJlbnQnLCAnc3Ryb2tlLXdpZHRoJzogMH0pO1xuICAgIH0pO1xuXG4gICAgc2Fua2V5LnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShjLmVhc2UpLmR1cmF0aW9uKGMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBzYW5rZXlUcmFuc2Zvcm0pO1xuXG4gICAgdmFyIHNhbmtleUxpbmtzID0gc2Fua2V5LnNlbGVjdEFsbCgnLicgKyBjLmNuLnNhbmtleUxpbmtzKVxuICAgICAgICAuZGF0YShyZXBlYXQsIGtleUZ1bik7XG5cbiAgICBzYW5rZXlMaW5rcy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLnNhbmtleUxpbmtzLCB0cnVlKVxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpO1xuXG4gICAgdmFyIHNhbmtleUxpbmsgPSBzYW5rZXlMaW5rcy5zZWxlY3RBbGwoJy4nICsgYy5jbi5zYW5rZXlMaW5rKVxuICAgICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmtzID0gZC5ncmFwaC5saW5rcztcbiAgICAgICAgICAgICAgcmV0dXJuIGxpbmtzXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihsKSB7cmV0dXJuIGwudmFsdWU7fSlcbiAgICAgICAgICAgICAgICAubWFwKGxpbmtNb2RlbC5iaW5kKG51bGwsIGQpKTtcbiAgICAgICAgICB9LCBrZXlGdW4pO1xuXG4gICAgc2Fua2V5TGlua1xuICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgLmNsYXNzZWQoYy5jbi5zYW5rZXlMaW5rLCB0cnVlKVxuICAgICAgICAgIC5jYWxsKGF0dGFjaFBvaW50ZXJFdmVudHMsIHNhbmtleSwgY2FsbGJhY2tzLmxpbmtFdmVudHMpO1xuXG4gICAgc2Fua2V5TGlua1xuICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBzYWxpZW50RW5vdWdoKGQpID8gQ29sb3IudGlueVJHQih0aW55Y29sb3IoZC5saW5rTGluZUNvbG9yKSkgOiBkLnRpbnlDb2xvckh1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCdzdHJva2Utb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBzYWxpZW50RW5vdWdoKGQpID8gQ29sb3Iub3BhY2l0eShkLmxpbmtMaW5lQ29sb3IpIDogZC50aW55Q29sb3JBbHBoYTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQudGlueUNvbG9ySHVlO1xuICAgICAgICB9KVxuICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnRpbnlDb2xvckFscGhhO1xuICAgICAgICB9KVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBzYWxpZW50RW5vdWdoKGQpID8gZC5saW5rTGluZVdpZHRoIDogMTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2QnLCBsaW5rUGF0aCgpKTtcblxuICAgIHNhbmtleUxpbmtcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oKSB7IHJldHVybiAoZ2QuX2NvbnRleHQuc3RhdGljUGxvdCB8fCBmaXJzdFJlbmRlciB8fCBkcmFnY292ZXIpID8gMSA6IDA7fSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShjLmVhc2UpLmR1cmF0aW9uKGMuZHVyYXRpb24pXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgc2Fua2V5TGluay5leGl0KClcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShjLmVhc2UpLmR1cmF0aW9uKGMuZHVyYXRpb24pXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgIC5yZW1vdmUoKTtcblxuICAgIHZhciBzYW5rZXlOb2RlU2V0ID0gc2Fua2V5LnNlbGVjdEFsbCgnLicgKyBjLmNuLnNhbmtleU5vZGVTZXQpXG4gICAgICAgIC5kYXRhKHJlcGVhdCwga2V5RnVuKTtcblxuICAgIHNhbmtleU5vZGVTZXQuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5zYW5rZXlOb2RlU2V0LCB0cnVlKTtcblxuICAgIHNhbmtleU5vZGVTZXRcbiAgICAgICAgLnN0eWxlKCdjdXJzb3InLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBzd2l0Y2goZC5hcnJhbmdlbWVudCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpeGVkJzogcmV0dXJuICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICBjYXNlICdwZXJwZW5kaWN1bGFyJzogcmV0dXJuICducy1yZXNpemUnO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAnbW92ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgdmFyIHNhbmtleU5vZGUgPSBzYW5rZXlOb2RlU2V0LnNlbGVjdEFsbCgnLicgKyBjLmNuLnNhbmtleU5vZGUpXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBub2RlcyA9IGQuZ3JhcGgubm9kZXM7XG4gICAgICAgICAgICBwZXJzaXN0T3JpZ2luYWxQbGFjZShub2Rlcyk7XG4gICAgICAgICAgICByZXR1cm4gbm9kZXNcbiAgICAgICAgICAgICAgLm1hcChub2RlTW9kZWwuYmluZChudWxsLCBkKSk7XG4gICAgICAgIH0sIGtleUZ1bik7XG5cbiAgICBzYW5rZXlOb2RlLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uc2Fua2V5Tm9kZSwgdHJ1ZSlcbiAgICAgICAgLmNhbGwodXBkYXRlTm9kZVBvc2l0aW9ucylcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24obikgeyByZXR1cm4gKChnZC5fY29udGV4dC5zdGF0aWNQbG90IHx8IGZpcnN0UmVuZGVyKSAmJiAhbi5wYXJ0T2ZHcm91cCkgPyAxIDogMDt9KTtcblxuICAgIHNhbmtleU5vZGVcbiAgICAgICAgLmNhbGwoYXR0YWNoUG9pbnRlckV2ZW50cywgc2Fua2V5LCBjYWxsYmFja3Mubm9kZUV2ZW50cylcbiAgICAgICAgLmNhbGwoYXR0YWNoRHJhZ0hhbmRsZXIsIHNhbmtleUxpbmssIGNhbGxiYWNrcywgZ2QpOyAvLyBoYXMgdG8gYmUgaGVyZSBhcyBpdCBiaW5kcyBzYW5rZXlMaW5rXG5cbiAgICBzYW5rZXlOb2RlXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoYy5lYXNlKS5kdXJhdGlvbihjLmR1cmF0aW9uKVxuICAgICAgICAuY2FsbCh1cGRhdGVOb2RlUG9zaXRpb25zKVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihuKSB7IHJldHVybiBuLnBhcnRPZkdyb3VwID8gMCA6IDE7fSk7XG5cbiAgICBzYW5rZXlOb2RlLmV4aXQoKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5lYXNlKGMuZWFzZSkuZHVyYXRpb24oYy5kdXJhdGlvbilcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgdmFyIG5vZGVSZWN0ID0gc2Fua2V5Tm9kZS5zZWxlY3RBbGwoJy4nICsgYy5jbi5ub2RlUmVjdClcbiAgICAgICAgLmRhdGEocmVwZWF0KTtcblxuICAgIG5vZGVSZWN0LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24ubm9kZVJlY3QsIHRydWUpXG4gICAgICAgIC5jYWxsKHNpemVOb2RlKTtcblxuICAgIG5vZGVSZWN0XG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZnVuY3Rpb24oZCkge3JldHVybiBkLm5vZGVMaW5lV2lkdGg7fSlcbiAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7cmV0dXJuIENvbG9yLnRpbnlSR0IodGlueWNvbG9yKGQubm9kZUxpbmVDb2xvcikpO30pXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLW9wYWNpdHknLCBmdW5jdGlvbihkKSB7cmV0dXJuIENvbG9yLm9wYWNpdHkoZC5ub2RlTGluZUNvbG9yKTt9KVxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQudGlueUNvbG9ySHVlO30pXG4gICAgICAgIC5zdHlsZSgnZmlsbC1vcGFjaXR5JywgZnVuY3Rpb24oZCkge3JldHVybiBkLnRpbnlDb2xvckFscGhhO30pO1xuXG4gICAgbm9kZVJlY3QudHJhbnNpdGlvbigpXG4gICAgICAgIC5lYXNlKGMuZWFzZSkuZHVyYXRpb24oYy5kdXJhdGlvbilcbiAgICAgICAgLmNhbGwoc2l6ZU5vZGUpO1xuXG4gICAgdmFyIG5vZGVDYXB0dXJlID0gc2Fua2V5Tm9kZS5zZWxlY3RBbGwoJy4nICsgYy5jbi5ub2RlQ2FwdHVyZSlcbiAgICAgICAgLmRhdGEocmVwZWF0KTtcblxuICAgIG5vZGVDYXB0dXJlLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24ubm9kZUNhcHR1cmUsIHRydWUpXG4gICAgICAgIC5zdHlsZSgnZmlsbC1vcGFjaXR5JywgMCk7XG5cbiAgICBub2RlQ2FwdHVyZVxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC56b25lWDt9KVxuICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC56b25lWTt9KVxuICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuem9uZVdpZHRoO30pXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuem9uZUhlaWdodDt9KTtcblxuICAgIHZhciBub2RlQ2VudGVyZWQgPSBzYW5rZXlOb2RlLnNlbGVjdEFsbCgnLicgKyBjLmNuLm5vZGVDZW50ZXJlZClcbiAgICAgICAgLmRhdGEocmVwZWF0KTtcblxuICAgIG5vZGVDZW50ZXJlZC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLm5vZGVDZW50ZXJlZCwgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIG5vZGVDZW50ZXJpbmcpO1xuXG4gICAgbm9kZUNlbnRlcmVkXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoYy5lYXNlKS5kdXJhdGlvbihjLmR1cmF0aW9uKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgbm9kZUNlbnRlcmluZyk7XG5cbiAgICB2YXIgbm9kZUxhYmVsR3VpZGUgPSBub2RlQ2VudGVyZWQuc2VsZWN0QWxsKCcuJyArIGMuY24ubm9kZUxhYmVsR3VpZGUpXG4gICAgICAgIC5kYXRhKHJlcGVhdCk7XG5cbiAgICBub2RlTGFiZWxHdWlkZS5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLm5vZGVMYWJlbEd1aWRlLCB0cnVlKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQudW5pcXVlTm9kZUxhYmVsUGF0aElkO30pXG4gICAgICAgIC5hdHRyKCdkJywgdGV4dEd1aWRlUGF0aClcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHNhbmtleUludmVyc2VUcmFuc2Zvcm0pO1xuXG4gICAgbm9kZUxhYmVsR3VpZGVcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFzZShjLmVhc2UpLmR1cmF0aW9uKGMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCdkJywgdGV4dEd1aWRlUGF0aClcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHNhbmtleUludmVyc2VUcmFuc2Zvcm0pO1xuXG4gICAgdmFyIG5vZGVMYWJlbCA9IG5vZGVDZW50ZXJlZC5zZWxlY3RBbGwoJy4nICsgYy5jbi5ub2RlTGFiZWwpXG4gICAgICAgIC5kYXRhKHJlcGVhdCk7XG5cbiAgICBub2RlTGFiZWwuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5ub2RlTGFiZWwsIHRydWUpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCB0ZXh0RmxpcClcbiAgICAgICAgLnN0eWxlKCd1c2VyLXNlbGVjdCcsICdub25lJylcbiAgICAgICAgLnN0eWxlKCdjdXJzb3InLCAnZGVmYXVsdCcpXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsICdibGFjaycpO1xuXG4gICAgbm9kZUxhYmVsXG4gICAgICAgIC5zdHlsZSgndGV4dC1zaGFkb3cnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5ob3Jpem9udGFsID8gJy0xcHggMXB4IDFweCAjZmZmLCAxcHggMXB4IDFweCAjZmZmLCAxcHggLTFweCAxcHggI2ZmZiwgLTFweCAtMXB4IDFweCAjZmZmJyA6ICdub25lJztcbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkge0RyYXdpbmcuZm9udChub2RlTGFiZWwsIGQudGV4dEZvbnQpO30pO1xuXG4gICAgbm9kZUxhYmVsXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoYy5lYXNlKS5kdXJhdGlvbihjLmR1cmF0aW9uKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgdGV4dEZsaXApO1xuXG4gICAgdmFyIG5vZGVMYWJlbFRleHRQYXRoID0gbm9kZUxhYmVsLnNlbGVjdEFsbCgnLicgKyBjLmNuLm5vZGVMYWJlbFRleHRQYXRoKVxuICAgICAgICAuZGF0YShyZXBlYXQpO1xuXG4gICAgbm9kZUxhYmVsVGV4dFBhdGguZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0ZXh0UGF0aCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24ubm9kZUxhYmVsVGV4dFBhdGgsIHRydWUpXG4gICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ3hsaW5rOmhyZWYnLCBmdW5jdGlvbihkKSB7cmV0dXJuICcjJyArIGQudW5pcXVlTm9kZUxhYmVsUGF0aElkO30pXG4gICAgICAgIC5hdHRyKCdzdGFydE9mZnNldCcsIG5vZGVUZXh0T2Zmc2V0KVxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBub2RlVGV4dENvbG9yKTtcblxuICAgIG5vZGVMYWJlbFRleHRQYXRoXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5ob3Jpem9udGFsIHx8IGQubm9kZS5keSA+IDUgPyBkLm5vZGUubGFiZWwgOiAnJzt9KVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuaG9yaXpvbnRhbCAmJiBkLmxlZnQgPyAnZW5kJyA6ICdzdGFydCc7fSk7XG5cbiAgICBub2RlTGFiZWxUZXh0UGF0aFxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5lYXNlKGMuZWFzZSkuZHVyYXRpb24oYy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ3N0YXJ0T2Zmc2V0Jywgbm9kZVRleHRPZmZzZXQpXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIG5vZGVUZXh0Q29sb3IpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgc2VsZWN0aW9uVGVzdGVyKSB7XG4gICAgdmFyIGNkID0gc2VhcmNoSW5mby5jZDtcbiAgICB2YXIgc2VsZWN0aW9uID0gW107XG4gICAgdmFyIGZ1bGxEYXRhID0gY2RbMF0udHJhY2U7XG5cbiAgICB2YXIgbm9kZXMgPSBmdWxsRGF0YS5fc2Fua2V5LmdyYXBoLm5vZGVzO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmKG5vZGUucGFydE9mR3JvdXApIGNvbnRpbnVlOyAvLyBUaG9zZSBhcmUgaW52aXNpYmxlXG5cbiAgICAgICAgLy8gUG9zaXRpb24gb2Ygbm9kZSdzIGNlbnRyb2lkXG4gICAgICAgIHZhciBwb3MgPSBbKG5vZGUueDAgKyBub2RlLngxKSAvIDIsIChub2RlLnkwICsgbm9kZS55MSkgLyAyXTtcblxuICAgICAgICAvLyBTd2FwIHggYW5kIHkgaWYgdHJhY2UgaXMgdmVydGljYWxcbiAgICAgICAgaWYoZnVsbERhdGEub3JpZW50YXRpb24gPT09ICd2JykgcG9zLnJldmVyc2UoKTtcblxuICAgICAgICBpZihzZWxlY3Rpb25UZXN0ZXIgJiYgc2VsZWN0aW9uVGVzdGVyLmNvbnRhaW5zKHBvcywgZmFsc2UsIGksIHNlYXJjaEluZm8pKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24ucHVzaCh7XG4gICAgICAgICAgICAgICAgcG9pbnROdW1iZXI6IG5vZGUucG9pbnROdW1iZXJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBhZGQgZXZlbnREYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xufTtcbiIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gc3Ryb25nbHlDb25uZWN0ZWRDb21wb25lbnRzXG5cbmZ1bmN0aW9uIHN0cm9uZ2x5Q29ubmVjdGVkQ29tcG9uZW50cyhhZGpMaXN0KSB7XG4gIHZhciBudW1WZXJ0aWNlcyA9IGFkakxpc3QubGVuZ3RoO1xuICB2YXIgaW5kZXggPSBuZXcgQXJyYXkobnVtVmVydGljZXMpXG4gIHZhciBsb3dWYWx1ZSA9IG5ldyBBcnJheShudW1WZXJ0aWNlcylcbiAgdmFyIGFjdGl2ZSA9IG5ldyBBcnJheShudW1WZXJ0aWNlcylcbiAgdmFyIGNoaWxkID0gbmV3IEFycmF5KG51bVZlcnRpY2VzKVxuICB2YXIgc2NjID0gbmV3IEFycmF5KG51bVZlcnRpY2VzKVxuICB2YXIgc2NjTGlua3MgPSBuZXcgQXJyYXkobnVtVmVydGljZXMpXG4gIFxuICAvL0luaXRpYWxpemUgdGFibGVzXG4gIGZvcih2YXIgaT0wOyBpPG51bVZlcnRpY2VzOyArK2kpIHtcbiAgICBpbmRleFtpXSA9IC0xXG4gICAgbG93VmFsdWVbaV0gPSAwXG4gICAgYWN0aXZlW2ldID0gZmFsc2VcbiAgICBjaGlsZFtpXSA9IDBcbiAgICBzY2NbaV0gPSAtMVxuICAgIHNjY0xpbmtzW2ldID0gW11cbiAgfVxuXG4gIC8vIFRoZSBzdHJvbmdDb25uZWN0IGZ1bmN0aW9uXG4gIHZhciBjb3VudCA9IDBcbiAgdmFyIGNvbXBvbmVudHMgPSBbXVxuICB2YXIgc2NjQWRqTGlzdCA9IFtdXG5cbiAgZnVuY3Rpb24gc3Ryb25nQ29ubmVjdCh2KSB7XG4gICAgLy8gVG8gYXZvaWQgcnVubmluZyBvdXQgb2Ygc3RhY2sgc3BhY2UsIHRoaXMgZW11bGF0ZXMgdGhlIHJlY3Vyc2l2ZSBiZWhhdmlvdXIgb2YgdGhlIG5vcm1hbCBhbGdvcml0aG0sIGVmZmVjdGl2ZWx5IHVzaW5nIFQgYXMgdGhlIGNhbGwgc3RhY2suXG4gICAgdmFyIFMgPSBbdl0sIFQgPSBbdl1cbiAgICBpbmRleFt2XSA9IGxvd1ZhbHVlW3ZdID0gY291bnRcbiAgICBhY3RpdmVbdl0gPSB0cnVlXG4gICAgY291bnQgKz0gMVxuICAgIHdoaWxlKFQubGVuZ3RoID4gMCkge1xuICAgICAgdiA9IFRbVC5sZW5ndGgtMV1cbiAgICAgIHZhciBlID0gYWRqTGlzdFt2XVxuICAgICAgaWYgKGNoaWxkW3ZdIDwgZS5sZW5ndGgpIHsgLy8gSWYgd2UncmUgbm90IGRvbmUgaXRlcmF0aW5nIG92ZXIgdGhlIGNoaWxkcmVuLCBmaXJzdCB0cnkgZmluaXNoaW5nIHRoYXQuXG4gICAgICAgIGZvcih2YXIgaT1jaGlsZFt2XTsgaTxlLmxlbmd0aDsgKytpKSB7IC8vIFN0YXJ0IHdoZXJlIHdlIGxlZnQgb2ZmLlxuICAgICAgICAgIHZhciB1ID0gZVtpXVxuICAgICAgICAgIGlmKGluZGV4W3VdIDwgMCkge1xuICAgICAgICAgICAgaW5kZXhbdV0gPSBsb3dWYWx1ZVt1XSA9IGNvdW50XG4gICAgICAgICAgICBhY3RpdmVbdV0gPSB0cnVlXG4gICAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgICAgICBTLnB1c2godSlcbiAgICAgICAgICAgIFQucHVzaCh1KVxuICAgICAgICAgICAgYnJlYWsgLy8gRmlyc3QgcmVjdXJzZSwgdGhlbiBjb250aW51ZSBoZXJlICh3aXRoIHRoZSBzYW1lIGNoaWxkISkuXG4gICAgICAgICAgICAvLyBUaGVyZSBpcyBhIHNsaWdodCBjaGFuZ2UgdG8gVGFyamFuJ3MgYWxnb3JpdGhtIGhlcmUuXG4gICAgICAgICAgICAvLyBOb3JtYWxseSwgYWZ0ZXIgaGF2aW5nIHJlY3Vyc2VkLCB3ZSBzZXQgbG93VmFsdWUgbGlrZSB3ZSBkbyBmb3IgYW4gYWN0aXZlIGNoaWxkIChhbHRob3VnaCBzb21lIHZhcmlhbnRzIG9mIHRoZSBhbGdvcml0aG0gZG8gaXQgc2xpZ2h0bHkgZGlmZmVyZW50bHkpLlxuICAgICAgICAgICAgLy8gSGVyZSwgd2Ugb25seSBkbyBzbyBpZiB0aGUgY2hpbGQgd2UgcmVjdXJzZWQgb24gaXMgc3RpbGwgYWN0aXZlLlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbmluZyBpcyB0aGF0IGlmIGl0IGlzIG5vIGxvbmdlciBhY3RpdmUsIGl0IG11c3QgaGF2ZSBoYWQgYSBsb3dWYWx1ZSBlcXVhbCB0byBpdHMgb3duIGluZGV4LCB3aGljaCBtZWFucyB0aGF0IGl0IGlzIG5lY2Vzc2FyaWx5IGhpZ2hlciB0aGFuIG91ciBsb3dWYWx1ZS5cbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZVt1XSkge1xuICAgICAgICAgICAgbG93VmFsdWVbdl0gPSBNYXRoLm1pbihsb3dWYWx1ZVt2XSwgbG93VmFsdWVbdV0pfDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjY1t1XSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBOb2RlIHYgaXMgbm90IHlldCBhc3NpZ25lZCBhbiBzY2MsIGJ1dCBvbmNlIGl0IGlzIHRoYXQgc2NjIGNhbiBhcHBhcmVudGx5IHJlYWNoIHNjY1t1XS5cbiAgICAgICAgICAgIHNjY0xpbmtzW3ZdLnB1c2goc2NjW3VdKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZFt2XSA9IGkgLy8gUmVtZW1iZXIgd2hlcmUgd2UgbGVmdCBvZmYuXG4gICAgICB9IGVsc2UgeyAvLyBJZiB3ZSdyZSBkb25lIGl0ZXJhdGluZyBvdmVyIHRoZSBjaGlsZHJlbiwgY2hlY2sgd2hldGhlciB3ZSBoYXZlIGFuIHNjYy5cbiAgICAgICAgaWYobG93VmFsdWVbdl0gPT09IGluZGV4W3ZdKSB7IC8vIFRPRE86IEl0IC9taWdodC8gYmUgdHJ1ZSB0aGF0IFQgaXMgYWx3YXlzIGEgcHJlZml4IG9mIFMgKGF0IHRoaXMgcG9pbnQhISEpLCBhbmQgaWYgc28sIHRoaXMgY291bGQgYmUgdXNlZCBoZXJlLlxuICAgICAgICAgIHZhciBjb21wb25lbnQgPSBbXVxuICAgICAgICAgIHZhciBsaW5rcyA9IFtdLCBsaW5rQ291bnQgPSAwXG4gICAgICAgICAgZm9yKHZhciBpPVMubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgICAgICAgdmFyIHcgPSBTW2ldXG4gICAgICAgICAgICBhY3RpdmVbd10gPSBmYWxzZVxuICAgICAgICAgICAgY29tcG9uZW50LnB1c2godylcbiAgICAgICAgICAgIGxpbmtzLnB1c2goc2NjTGlua3Nbd10pXG4gICAgICAgICAgICBsaW5rQ291bnQgKz0gc2NjTGlua3Nbd10ubGVuZ3RoXG4gICAgICAgICAgICBzY2Nbd10gPSBjb21wb25lbnRzLmxlbmd0aFxuICAgICAgICAgICAgaWYodyA9PT0gdikge1xuICAgICAgICAgICAgICBTLmxlbmd0aCA9IGlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudClcbiAgICAgICAgICB2YXIgYWxsTGlua3MgPSBuZXcgQXJyYXkobGlua0NvdW50KVxuICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IodmFyIGo9MDsgajxsaW5rc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBhbGxMaW5rc1stLWxpbmtDb3VudF0gPSBsaW5rc1tpXVtqXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzY2NBZGpMaXN0LnB1c2goYWxsTGlua3MpXG4gICAgICAgIH1cbiAgICAgICAgVC5wb3AoKSAvLyBOb3cgd2UncmUgZmluaXNoZWQgZXhwbG9yaW5nIHRoaXMgcGFydGljdWxhciBub2RlIChub3JtYWxseSBjb3JyZXNwb25kcyB0byB0aGUgcmV0dXJuIHN0YXRlbWVudClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1J1biBzdHJvbmcgY29ubmVjdCBzdGFydGluZyBmcm9tIGVhY2ggdmVydGV4XG4gIGZvcih2YXIgaT0wOyBpPG51bVZlcnRpY2VzOyArK2kpIHtcbiAgICBpZihpbmRleFtpXSA8IDApIHtcbiAgICAgIHN0cm9uZ0Nvbm5lY3QoaSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vIENvbXBhY3Qgc2NjQWRqTGlzdFxuICB2YXIgbmV3RVxuICBmb3IodmFyIGk9MDsgaTxzY2NBZGpMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGUgPSBzY2NBZGpMaXN0W2ldXG4gICAgaWYgKGUubGVuZ3RoID09PSAwKSBjb250aW51ZVxuICAgIGUuc29ydChmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBhLWI7IH0pXG4gICAgbmV3RSA9IFtlWzBdXVxuICAgIGZvcih2YXIgaj0xOyBqPGUubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChlW2pdICE9PSBlW2otMV0pIHtcbiAgICAgICAgbmV3RS5wdXNoKGVbal0pXG4gICAgICB9XG4gICAgfVxuICAgIHNjY0Fkakxpc3RbaV0gPSBuZXdFXG4gIH0gIFxuXG4gIHJldHVybiB7Y29tcG9uZW50czogY29tcG9uZW50cywgYWRqYWNlbmN5TGlzdDogc2NjQWRqTGlzdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=