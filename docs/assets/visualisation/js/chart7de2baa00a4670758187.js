(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_sunburst_attributes_js-node_modules_plotly_js_src_t-fe4a6d"],{

/***/ "./node_modules/d3-hierarchy/src/accessors.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/accessors.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "optional": () => (/* binding */ optional),
/* harmony export */   "required": () => (/* binding */ required)
/* harmony export */ });
function optional(f) {
  return f == null ? null : required(f);
}

function required(f) {
  if (typeof f !== "function") throw new Error;
  return f;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/array.js":
/*!************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/array.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "shuffle": () => (/* binding */ shuffle)
/* harmony export */ });
var slice = Array.prototype.slice;

function shuffle(array) {
  var m = array.length,
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/cluster.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/cluster.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}

function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}

function leafLeft(node) {
  var children;
  while (children = node.children) node = children[0];
  return node;
}

function leafRight(node) {
  var children;
  while (children = node.children) node = children[children.length - 1];
  return node;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = false;

  function cluster(root) {
    var previousNode,
        x = 0;

    // First walk, computing the initial x & y values.
    root.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    var left = leafLeft(root),
        right = leafRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    return root.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root.x) * dx;
      node.y = (root.y - node.y) * dy;
    } : function(node) {
      node.x = (node.x - x0) / (x1 - x0) * dx;
      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
    });
  }

  cluster.separation = function(x) {
    return arguments.length ? (separation = x, cluster) : separation;
  };

  cluster.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? null : [dx, dy]);
  };

  cluster.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? [dx, dy] : null);
  };

  return cluster;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/constant.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/constant.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constantZero": () => (/* binding */ constantZero),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function constantZero() {
  return 0;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/ancestors.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/ancestors.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/count.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/count.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function count(node) {
  var sum = 0,
      children = node.children,
      i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.eachAfter(count);
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/descendants.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/descendants.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/each.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/each.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        next.push(children[i]);
      }
    }
  } while (next.length);
  return this;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var node = this, nodes = [node], next = [], children, i, n;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children) for (i = 0, n = children.length; i < n; ++i) {
      nodes.push(children[i]);
    }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var node = this, nodes = [node], children, i;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children) for (i = children.length - 1; i >= 0; --i) {
      nodes.push(children[i]);
    }
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hierarchy),
/* harmony export */   "computeHeight": () => (/* binding */ computeHeight),
/* harmony export */   "Node": () => (/* binding */ Node)
/* harmony export */ });
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./count.js */ "./node_modules/d3-hierarchy/src/hierarchy/count.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./each.js */ "./node_modules/d3-hierarchy/src/hierarchy/each.js");
/* harmony import */ var _eachBefore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eachBefore.js */ "./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js");
/* harmony import */ var _eachAfter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eachAfter.js */ "./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js");
/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sum.js */ "./node_modules/d3-hierarchy/src/hierarchy/sum.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sort.js */ "./node_modules/d3-hierarchy/src/hierarchy/sort.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./path.js */ "./node_modules/d3-hierarchy/src/hierarchy/path.js");
/* harmony import */ var _ancestors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ancestors.js */ "./node_modules/d3-hierarchy/src/hierarchy/ancestors.js");
/* harmony import */ var _descendants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./descendants.js */ "./node_modules/d3-hierarchy/src/hierarchy/descendants.js");
/* harmony import */ var _leaves_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./leaves.js */ "./node_modules/d3-hierarchy/src/hierarchy/leaves.js");
/* harmony import */ var _links_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./links.js */ "./node_modules/d3-hierarchy/src/hierarchy/links.js");












function hierarchy(data, children) {
  var root = new Node(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  if (children == null) children = defaultChildren;

  while (node = nodes.pop()) {
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}

function defaultChildren(d) {
  return d.children;
}

function copyData(node) {
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && (node.height < ++height));
}

function Node(data) {
  this.data = data;
  this.depth =
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: _count_js__WEBPACK_IMPORTED_MODULE_0__.default,
  each: _each_js__WEBPACK_IMPORTED_MODULE_1__.default,
  eachAfter: _eachAfter_js__WEBPACK_IMPORTED_MODULE_2__.default,
  eachBefore: _eachBefore_js__WEBPACK_IMPORTED_MODULE_3__.default,
  sum: _sum_js__WEBPACK_IMPORTED_MODULE_4__.default,
  sort: _sort_js__WEBPACK_IMPORTED_MODULE_5__.default,
  path: _path_js__WEBPACK_IMPORTED_MODULE_6__.default,
  ancestors: _ancestors_js__WEBPACK_IMPORTED_MODULE_7__.default,
  descendants: _descendants_js__WEBPACK_IMPORTED_MODULE_8__.default,
  leaves: _leaves_js__WEBPACK_IMPORTED_MODULE_9__.default,
  links: _links_js__WEBPACK_IMPORTED_MODULE_10__.default,
  copy: node_copy
};


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/leaves.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/leaves.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/links.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/links.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) { // Don’t include the root’s parent, if any.
      links.push({source: node.parent, target: node});
    }
  });
  return links;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/path.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/path.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(end) {
  var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/sort.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/sum.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/sum.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cluster": () => (/* reexport safe */ _cluster_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "hierarchy": () => (/* reexport safe */ _hierarchy_index_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "pack": () => (/* reexport safe */ _pack_index_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "packSiblings": () => (/* reexport safe */ _pack_siblings_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "packEnclose": () => (/* reexport safe */ _pack_enclose_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "partition": () => (/* reexport safe */ _partition_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "stratify": () => (/* reexport safe */ _stratify_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "tree": () => (/* reexport safe */ _tree_js__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "treemap": () => (/* reexport safe */ _treemap_index_js__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "treemapBinary": () => (/* reexport safe */ _treemap_binary_js__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "treemapDice": () => (/* reexport safe */ _treemap_dice_js__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "treemapSlice": () => (/* reexport safe */ _treemap_slice_js__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "treemapSliceDice": () => (/* reexport safe */ _treemap_sliceDice_js__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "treemapSquarify": () => (/* reexport safe */ _treemap_squarify_js__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "treemapResquarify": () => (/* reexport safe */ _treemap_resquarify_js__WEBPACK_IMPORTED_MODULE_14__.default)
/* harmony export */ });
/* harmony import */ var _cluster_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cluster.js */ "./node_modules/d3-hierarchy/src/cluster.js");
/* harmony import */ var _hierarchy_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hierarchy/index.js */ "./node_modules/d3-hierarchy/src/hierarchy/index.js");
/* harmony import */ var _pack_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pack/index.js */ "./node_modules/d3-hierarchy/src/pack/index.js");
/* harmony import */ var _pack_siblings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pack/siblings.js */ "./node_modules/d3-hierarchy/src/pack/siblings.js");
/* harmony import */ var _pack_enclose_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pack/enclose.js */ "./node_modules/d3-hierarchy/src/pack/enclose.js");
/* harmony import */ var _partition_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./partition.js */ "./node_modules/d3-hierarchy/src/partition.js");
/* harmony import */ var _stratify_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stratify.js */ "./node_modules/d3-hierarchy/src/stratify.js");
/* harmony import */ var _tree_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tree.js */ "./node_modules/d3-hierarchy/src/tree.js");
/* harmony import */ var _treemap_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./treemap/index.js */ "./node_modules/d3-hierarchy/src/treemap/index.js");
/* harmony import */ var _treemap_binary_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./treemap/binary.js */ "./node_modules/d3-hierarchy/src/treemap/binary.js");
/* harmony import */ var _treemap_dice_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./treemap/dice.js */ "./node_modules/d3-hierarchy/src/treemap/dice.js");
/* harmony import */ var _treemap_slice_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./treemap/slice.js */ "./node_modules/d3-hierarchy/src/treemap/slice.js");
/* harmony import */ var _treemap_sliceDice_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./treemap/sliceDice.js */ "./node_modules/d3-hierarchy/src/treemap/sliceDice.js");
/* harmony import */ var _treemap_squarify_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./treemap/squarify.js */ "./node_modules/d3-hierarchy/src/treemap/squarify.js");
/* harmony import */ var _treemap_resquarify_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./treemap/resquarify.js */ "./node_modules/d3-hierarchy/src/treemap/resquarify.js");

















/***/ }),

/***/ "./node_modules/d3-hierarchy/src/pack/enclose.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/pack/enclose.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array.js */ "./node_modules/d3-hierarchy/src/array.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(circles) {
  var i = 0, n = (circles = (0,_array_js__WEBPACK_IMPORTED_MODULE_0__.shuffle)(_array_js__WEBPACK_IMPORTED_MODULE_0__.slice.call(circles))).length, B = [], p, e;

  while (i < n) {
    p = circles[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error;
}

function enclosesNot(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1: return encloseBasis1(B[0]);
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

function encloseBasis2(a, b) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

function encloseBasis3(a, b, c) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/pack/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/pack/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _siblings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./siblings.js */ "./node_modules/d3-hierarchy/src/pack/siblings.js");
/* harmony import */ var _accessors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../accessors.js */ "./node_modules/d3-hierarchy/src/accessors.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant.js */ "./node_modules/d3-hierarchy/src/constant.js");




function defaultRadius(d) {
  return Math.sqrt(d.value);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var radius = null,
      dx = 1,
      dy = 1,
      padding = _constant_js__WEBPACK_IMPORTED_MODULE_0__.constantZero;

  function pack(root) {
    root.x = dx / 2, root.y = dy / 2;
    if (radius) {
      root.eachBefore(radiusLeaf(radius))
          .eachAfter(packChildren(padding, 0.5))
          .eachBefore(translateChild(1));
    } else {
      root.eachBefore(radiusLeaf(defaultRadius))
          .eachAfter(packChildren(_constant_js__WEBPACK_IMPORTED_MODULE_0__.constantZero, 1))
          .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
          .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function(x) {
    return arguments.length ? (radius = (0,_accessors_js__WEBPACK_IMPORTED_MODULE_1__.optional)(x), pack) : radius;
  };

  pack.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
  };

  pack.padding = function(x) {
    return arguments.length ? (padding = typeof x === "function" ? x : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(+x), pack) : padding;
  };

  return pack;
}

function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}

function packChildren(padding, k) {
  return function(node) {
    if (children = node.children) {
      var children,
          i,
          n = children.length,
          r = padding(node) * k || 0,
          e;

      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = (0,_siblings_js__WEBPACK_IMPORTED_MODULE_2__.packEnclose)(children);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/pack/siblings.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/pack/siblings.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "packEnclose": () => (/* binding */ packEnclose),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enclose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enclose.js */ "./node_modules/d3-hierarchy/src/pack/enclose.js");


function place(b, a, c) {
  var dx = b.x - a.x, x, a2,
      dy = b.y - a.y, y, b2,
      d2 = dx * dx + dy * dy;
  if (d2) {
    a2 = a.r + c.r, a2 *= a2;
    b2 = b.r + c.r, b2 *= b2;
    if (a2 > b2) {
      x = (d2 + b2 - a2) / (2 * d2);
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      x = (d2 + a2 - b2) / (2 * d2);
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }
}

function intersects(a, b) {
  var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function score(node) {
  var a = node._,
      b = node.next._,
      ab = a.r + b.r,
      dx = (a.x * b.r + b.x * a.r) / ab,
      dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}

function Node(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}

function packEnclose(circles) {
  if (!(n = circles.length)) return 0;

  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // Place the first circle.
  a = circles[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r;

  // Place the second circle.
  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r;

  // Place the third circle.
  place(b, a, c = circles[2]);

  // Initialize the front-chain using the first three circles a, b and c.
  a = new Node(a), b = new Node(b), c = new Node(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a;

  // Attempt to place each remaining circle…
  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c = circles[i]), c = new Node(c);

    // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);

    // Success! Insert the new circle c between a and b.
    c.previous = a, c.next = b, a.next = b.previous = b = c;

    // Compute the new closest circle pair to the centroid.
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }
    b = a.next;
  }

  // Compute the enclosing circle of the front chain.
  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = (0,_enclose_js__WEBPACK_IMPORTED_MODULE_0__.default)(a);

  // Translate the circles to put the enclosing circle around the origin.
  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(circles) {
  packEnclose(circles);
  return circles;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/partition.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/partition.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _treemap_round_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./treemap/round.js */ "./node_modules/d3-hierarchy/src/treemap/round.js");
/* harmony import */ var _treemap_dice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./treemap/dice.js */ "./node_modules/d3-hierarchy/src/treemap/dice.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var dx = 1,
      dy = 1,
      padding = 0,
      round = false;

  function partition(root) {
    var n = root.height + 1;
    root.x0 =
    root.y0 = padding;
    root.x1 = dx;
    root.y1 = dy / n;
    root.eachBefore(positionNode(dy, n));
    if (round) root.eachBefore(_treemap_round_js__WEBPACK_IMPORTED_MODULE_0__.default);
    return root;
  }

  function positionNode(dy, n) {
    return function(node) {
      if (node.children) {
        (0,_treemap_dice_js__WEBPACK_IMPORTED_MODULE_1__.default)(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
      }
      var x0 = node.x0,
          y0 = node.y0,
          x1 = node.x1 - padding,
          y1 = node.y1 - padding;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x1;
      node.y1 = y1;
    };
  }

  partition.round = function(x) {
    return arguments.length ? (round = !!x, partition) : round;
  };

  partition.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
  };

  partition.padding = function(x) {
    return arguments.length ? (padding = +x, partition) : padding;
  };

  return partition;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/stratify.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/stratify.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _accessors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accessors.js */ "./node_modules/d3-hierarchy/src/accessors.js");
/* harmony import */ var _hierarchy_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hierarchy/index.js */ "./node_modules/d3-hierarchy/src/hierarchy/index.js");



var keyPrefix = "$", // Protect against keys like “__proto__”.
    preroot = {depth: -1},
    ambiguous = {};

function defaultId(d) {
  return d.id;
}

function defaultParentId(d) {
  return d.parentId;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var id = defaultId,
      parentId = defaultParentId;

  function stratify(data) {
    var d,
        i,
        n = data.length,
        root,
        parent,
        node,
        nodes = new Array(n),
        nodeId,
        nodeKey,
        nodeByKey = {};

    for (i = 0; i < n; ++i) {
      d = data[i], node = nodes[i] = new _hierarchy_index_js__WEBPACK_IMPORTED_MODULE_0__.Node(d);
      if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
        nodeKey = keyPrefix + (node.id = nodeId);
        nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
      }
    }

    for (i = 0; i < n; ++i) {
      node = nodes[i], nodeId = parentId(data[i], i, data);
      if (nodeId == null || !(nodeId += "")) {
        if (root) throw new Error("multiple roots");
        root = node;
      } else {
        parent = nodeByKey[keyPrefix + nodeId];
        if (!parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      }
    }

    if (!root) throw new Error("no root");
    root.parent = preroot;
    root.eachBefore(function(node) { node.depth = node.parent.depth + 1; --n; }).eachBefore(_hierarchy_index_js__WEBPACK_IMPORTED_MODULE_0__.computeHeight);
    root.parent = null;
    if (n > 0) throw new Error("cycle");

    return root;
  }

  stratify.id = function(x) {
    return arguments.length ? (id = (0,_accessors_js__WEBPACK_IMPORTED_MODULE_1__.required)(x), stratify) : id;
  };

  stratify.parentId = function(x) {
    return arguments.length ? (parentId = (0,_accessors_js__WEBPACK_IMPORTED_MODULE_1__.required)(x), stratify) : parentId;
  };

  return stratify;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/tree.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-hierarchy/src/tree.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hierarchy_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hierarchy/index.js */ "./node_modules/d3-hierarchy/src/hierarchy/index.js");


function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// function radialSeparation(a, b) {
//   return (a.parent === b.parent ? 1 : 2) / a.depth;
// }

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}

function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // default ancestor
  this.a = this; // ancestor
  this.z = 0; // prelim
  this.m = 0; // mod
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // thread
  this.i = i; // number
}

TreeNode.prototype = Object.create(_hierarchy_index_js__WEBPACK_IMPORTED_MODULE_0__.Node.prototype);

function treeRoot(root) {
  var tree = new TreeNode(root, 0),
      node,
      nodes = [tree],
      child,
      children,
      i,
      n;

  while (node = nodes.pop()) {
    if (children = node._.children) {
      node.children = new Array(n = children.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
        child.parent = node;
      }
    }
  }

  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = null;

  function tree(root) {
    var t = treeRoot(root);

    // Compute the layout using Buchheim et al.’s algorithm.
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) root.eachBefore(sizeNode);

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root,
          right = root,
          bottom = root;
      root.eachBefore(function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2,
          tx = s - left.x,
          kx = dx / (right.x + s + tx),
          ky = dy / (bottom.depth || 1);
      root.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }

    return root;
  }

  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }

  tree.separation = function(x) {
    return arguments.length ? (separation = x, tree) : separation;
  };

  tree.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
  };

  tree.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
  };

  return tree;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/binary.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/binary.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      i, n = nodes.length,
      sum, sums = new Array(n + 1);

  for (sums[0] = sum = i = 0; i < n; ++i) {
    sums[i + 1] = sum += nodes[i].value;
  }

  partition(0, n, parent.value, x0, y0, x1, y1);

  function partition(i, j, value, x0, y0, x1, y1) {
    if (i >= j - 1) {
      var node = nodes[i];
      node.x0 = x0, node.y0 = y0;
      node.x1 = x1, node.y1 = y1;
      return;
    }

    var valueOffset = sums[i],
        valueTarget = (value / 2) + valueOffset,
        k = i + 1,
        hi = j - 1;

    while (k < hi) {
      var mid = k + hi >>> 1;
      if (sums[mid] < valueTarget) k = mid + 1;
      else hi = mid;
    }

    if ((valueTarget - sums[k - 1]) < (sums[k] - valueTarget) && i + 1 < k) --k;

    var valueLeft = sums[k] - valueOffset,
        valueRight = value - valueLeft;

    if ((x1 - x0) > (y1 - y0)) {
      var xk = (x0 * valueRight + x1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, xk, y1);
      partition(k, j, valueRight, xk, y0, x1, y1);
    } else {
      var yk = (y0 * valueRight + y1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, x1, yk);
      partition(k, j, valueRight, x0, yk, x1, y1);
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/dice.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/dice.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (x1 - x0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    node.x0 = x0, node.x1 = x0 += node.value * k;
  }
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/index.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./round.js */ "./node_modules/d3-hierarchy/src/treemap/round.js");
/* harmony import */ var _squarify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./squarify.js */ "./node_modules/d3-hierarchy/src/treemap/squarify.js");
/* harmony import */ var _accessors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../accessors.js */ "./node_modules/d3-hierarchy/src/accessors.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constant.js */ "./node_modules/d3-hierarchy/src/constant.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var tile = _squarify_js__WEBPACK_IMPORTED_MODULE_0__.default,
      round = false,
      dx = 1,
      dy = 1,
      paddingStack = [0],
      paddingInner = _constant_js__WEBPACK_IMPORTED_MODULE_1__.constantZero,
      paddingTop = _constant_js__WEBPACK_IMPORTED_MODULE_1__.constantZero,
      paddingRight = _constant_js__WEBPACK_IMPORTED_MODULE_1__.constantZero,
      paddingBottom = _constant_js__WEBPACK_IMPORTED_MODULE_1__.constantZero,
      paddingLeft = _constant_js__WEBPACK_IMPORTED_MODULE_1__.constantZero;

  function treemap(root) {
    root.x0 =
    root.y0 = 0;
    root.x1 = dx;
    root.y1 = dy;
    root.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root.eachBefore(_round_js__WEBPACK_IMPORTED_MODULE_2__.default);
    return root;
  }

  function positionNode(node) {
    var p = paddingStack[node.depth],
        x0 = node.x0 + p,
        y0 = node.y0 + p,
        x1 = node.x1 - p,
        y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      tile(node, x0, y0, x1, y1);
    }
  }

  treemap.round = function(x) {
    return arguments.length ? (round = !!x, treemap) : round;
  };

  treemap.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
  };

  treemap.tile = function(x) {
    return arguments.length ? (tile = (0,_accessors_js__WEBPACK_IMPORTED_MODULE_3__.required)(x), treemap) : tile;
  };

  treemap.padding = function(x) {
    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
  };

  treemap.paddingInner = function(x) {
    return arguments.length ? (paddingInner = typeof x === "function" ? x : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(+x), treemap) : paddingInner;
  };

  treemap.paddingOuter = function(x) {
    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
  };

  treemap.paddingTop = function(x) {
    return arguments.length ? (paddingTop = typeof x === "function" ? x : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(+x), treemap) : paddingTop;
  };

  treemap.paddingRight = function(x) {
    return arguments.length ? (paddingRight = typeof x === "function" ? x : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(+x), treemap) : paddingRight;
  };

  treemap.paddingBottom = function(x) {
    return arguments.length ? (paddingBottom = typeof x === "function" ? x : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(+x), treemap) : paddingBottom;
  };

  treemap.paddingLeft = function(x) {
    return arguments.length ? (paddingLeft = typeof x === "function" ? x : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(+x), treemap) : paddingLeft;
  };

  return treemap;
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/resquarify.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/resquarify.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dice.js */ "./node_modules/d3-hierarchy/src/treemap/dice.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice.js */ "./node_modules/d3-hierarchy/src/treemap/slice.js");
/* harmony import */ var _squarify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./squarify.js */ "./node_modules/d3-hierarchy/src/treemap/squarify.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function custom(ratio) {

  function resquarify(parent, x0, y0, x1, y1) {
    if ((rows = parent._squarify) && (rows.ratio === ratio)) {
      var rows,
          row,
          nodes,
          i,
          j = -1,
          n,
          m = rows.length,
          value = parent.value;

      while (++j < m) {
        row = rows[j], nodes = row.children;
        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        if (row.dice) (0,_dice_js__WEBPACK_IMPORTED_MODULE_0__.default)(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);
        else (0,_slice_js__WEBPACK_IMPORTED_MODULE_1__.default)(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = (0,_squarify_js__WEBPACK_IMPORTED_MODULE_2__.squarifyRatio)(ratio, parent, x0, y0, x1, y1);
      rows.ratio = ratio;
    }
  }

  resquarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return resquarify;
})(_squarify_js__WEBPACK_IMPORTED_MODULE_2__.phi));


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/round.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/round.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/slice.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/slice.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (y1 - y0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.x0 = x0, node.x1 = x1;
    node.y0 = y0, node.y1 = y0 += node.value * k;
  }
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/sliceDice.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/sliceDice.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dice.js */ "./node_modules/d3-hierarchy/src/treemap/dice.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slice.js */ "./node_modules/d3-hierarchy/src/treemap/slice.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(parent, x0, y0, x1, y1) {
  (parent.depth & 1 ? _slice_js__WEBPACK_IMPORTED_MODULE_0__.default : _dice_js__WEBPACK_IMPORTED_MODULE_1__.default)(parent, x0, y0, x1, y1);
}


/***/ }),

/***/ "./node_modules/d3-hierarchy/src/treemap/squarify.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/treemap/squarify.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "phi": () => (/* binding */ phi),
/* harmony export */   "squarifyRatio": () => (/* binding */ squarifyRatio),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dice.js */ "./node_modules/d3-hierarchy/src/treemap/dice.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice.js */ "./node_modules/d3-hierarchy/src/treemap/slice.js");



var phi = (1 + Math.sqrt(5)) / 2;

function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
  var rows = [],
      nodes = parent.children,
      row,
      nodeValue,
      i0 = 0,
      i1 = 0,
      n = nodes.length,
      dx, dy,
      value = parent.value,
      sumValue,
      minValue,
      maxValue,
      newRatio,
      minRatio,
      alpha,
      beta;

  while (i0 < n) {
    dx = x1 - x0, dy = y1 - y0;

    // Find the next non-empty node.
    do sumValue = nodes[i1++].value; while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);

    // Keep adding nodes while the aspect ratio maintains or improves.
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) { sumValue -= nodeValue; break; }
      minRatio = newRatio;
    }

    // Position and record the row orientation.
    rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
    if (row.dice) (0,_dice_js__WEBPACK_IMPORTED_MODULE_0__.default)(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
    else (0,_slice_js__WEBPACK_IMPORTED_MODULE_1__.default)(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
    value -= sumValue, i0 = i1;
  }

  return rows;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function custom(ratio) {

  function squarify(parent, x0, y0, x1, y1) {
    squarifyRatio(ratio, parent, x0, y0, x1, y1);
  }

  squarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return squarify;
})(phi));


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/attributes.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/attributes.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;

var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var pieAttrs = __webpack_require__(/*! ../pie/attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/sunburst/constants.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = {
    labels: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the labels of each of the sectors.'
        ].join(' ')
    },
    parents: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the parent sectors for each of the sectors.',
            'Empty string items \'\' are understood to reference',
            'the root node in the hierarchy.',
            'If `ids` is filled, `parents` items are understood to be "ids" themselves.',
            'When `ids` is not set, plotly attempts to find matching items in `labels`,',
            'but beware they must be unique.'
        ].join(' ')
    },

    values: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the values associated with each of the sectors.',
            'Use with `branchvalues` to determine how the values are summed.'
        ].join(' ')
    },
    branchvalues: {
        valType: 'enumerated',
        values: ['remainder', 'total'],
        dflt: 'remainder',
        editType: 'calc',
        role: 'info',
        description: [
            'Determines how the items in `values` are summed.',
            'When set to *total*, items in `values` are taken to be value of all its descendants.',
            'When set to *remainder*, items in `values` corresponding to the root and the branches sectors',
            'are taken to be the extra part not part of the sum of the values at their leaves.'
        ].join(' ')
    },
    count: {
        valType: 'flaglist',
        flags: [
            'branches',
            'leaves'
        ],
        dflt: 'leaves',
        editType: 'calc',
        role: 'info',
        description: [
            'Determines default for `values` when it is not provided,',
            'by inferring a 1 for each of the *leaves* and/or *branches*, otherwise 0.'
        ].join(' ')
    },

    level: {
        valType: 'any',
        editType: 'plot',
        anim: true,
        role: 'info',
        description: [
            'Sets the level from which this trace hierarchy is rendered.',
            'Set `level` to `\'\'` to start from the root node in the hierarchy.',
            'Must be an "id" if `ids` is filled in, otherwise plotly attempts to find a matching',
            'item in `labels`.'
        ].join(' ')
    },
    maxdepth: {
        valType: 'integer',
        editType: 'plot',
        role: 'info',
        dflt: -1,
        description: [
            'Sets the number of rendered sectors from any given `level`.',
            'Set `maxdepth` to *-1* to render all the levels in the hierarchy.'
        ].join(' ')
    },

    marker: extendFlat({
        colors: {
            valType: 'data_array',
            editType: 'calc',
            description: [
                'Sets the color of each sector of this trace.',
                'If not specified, the default trace color set is used',
                'to pick the sector colors.'
            ].join(' ')
        },

        // colorinheritance: {
        //     valType: 'enumerated',
        //     values: ['per-branch', 'per-label', false]
        // },

        line: {
            color: extendFlat({}, pieAttrs.marker.line.color, {
                dflt: null,
                description: [
                    'Sets the color of the line enclosing each sector.',
                    'Defaults to the `paper_bgcolor` value.'
                ].join(' ')
            }),
            width: extendFlat({}, pieAttrs.marker.line.width, {dflt: 1}),
            editType: 'calc'
        },
        editType: 'calc'
    },
        colorScaleAttrs('marker', {
            colorAttr: 'colors',
            anim: false // TODO: set to anim: true?
        })
    ),

    leaf: {
        opacity: {
            valType: 'number',
            editType: 'style',
            role: 'style',
            min: 0,
            max: 1,
            description: [
                'Sets the opacity of the leaves. With colorscale',
                'it is defaulted to 1; otherwise it is defaulted to 0.7'
            ].join(' ')
        },
        editType: 'plot'
    },

    text: pieAttrs.text,
    textinfo: {
        valType: 'flaglist',
        role: 'info',
        flags: [
            'label',
            'text',
            'value',
            'current path',
            'percent root',
            'percent entry',
            'percent parent'
        ],
        extras: ['none'],
        editType: 'plot',
        description: [
            'Determines which trace information appear on the graph.'
        ].join(' ')
    },

    // TODO: incorporate `label` and `value` in the eventData
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: constants.eventDataKeys.concat(['label', 'value'])
    }),

    hovertext: pieAttrs.hovertext,
    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: [
            'label',
            'text',
            'value',
            'name',
            'current path',
            'percent root',
            'percent entry',
            'percent parent'
        ],
        dflt: 'label+text+value+name'
    }),
    hovertemplate: hovertemplateAttrs({}, {
        keys: constants.eventDataKeys
    }),

    textfont: pieAttrs.textfont,
    insidetextorientation: pieAttrs.insidetextorientation,
    insidetextfont: pieAttrs.insidetextfont,
    outsidetextfont: extendFlat({}, pieAttrs.outsidetextfont, {
        description: [
            'Sets the font used for `textinfo` lying outside the sector.',
            'This option refers to the root of the hierarchy',
            'presented at the center of a sunburst graph.',
            'Please note that if a hierarchy has multiple root nodes,',
            'this option won\'t have any effect and `insidetextfont` would be used.'
        ].join(' ')
    }),

    domain: domainAttrs({name: 'sunburst', trace: true, editType: 'calc'})
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/calc.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/calc.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3Hierarchy = __webpack_require__(/*! d3-hierarchy */ "./node_modules/d3-hierarchy/src/index.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var makeColorScaleFn = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").makeColorScaleFuncFromTrace;
var makePullColorFn = __webpack_require__(/*! ../pie/calc */ "./node_modules/plotly.js/src/traces/pie/calc.js").makePullColorFn;
var generateExtendedColors = __webpack_require__(/*! ../pie/calc */ "./node_modules/plotly.js/src/traces/pie/calc.js").generateExtendedColors;
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").calc;

var ALMOST_EQUAL = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").ALMOST_EQUAL;

var sunburstExtendedColorWays = {};
var treemapExtendedColorWays = {};

exports.calc = function(gd, trace) {
    var fullLayout = gd._fullLayout;
    var ids = trace.ids;
    var hasIds = Lib.isArrayOrTypedArray(ids);
    var labels = trace.labels;
    var parents = trace.parents;
    var values = trace.values;
    var hasValues = Lib.isArrayOrTypedArray(values);
    var cd = [];

    var parent2children = {};
    var refs = {};
    var addToLookup = function(parent, v) {
        if(parent2children[parent]) parent2children[parent].push(v);
        else parent2children[parent] = [v];
        refs[v] = 1;
    };

    // treat number `0` as valid
    var isValidKey = function(k) {
        return k || typeof k === 'number';
    };

    var isValidVal = function(i) {
        return !hasValues || (isNumeric(values[i]) && values[i] >= 0);
    };

    var len;
    var isValid;
    var getId;

    if(hasIds) {
        len = Math.min(ids.length, parents.length);
        isValid = function(i) { return isValidKey(ids[i]) && isValidVal(i); };
        getId = function(i) { return String(ids[i]); };
    } else {
        len = Math.min(labels.length, parents.length);
        isValid = function(i) { return isValidKey(labels[i]) && isValidVal(i); };
        // TODO We could allow some label / parent duplication
        //
        // From AJ:
        //  It would work OK for one level
        //  (multiple rows with the same name and different parents -
        //  or even the same parent) but if that name is then used as a parent
        //  which one is it?
        getId = function(i) { return String(labels[i]); };
    }

    if(hasValues) len = Math.min(len, values.length);

    for(var i = 0; i < len; i++) {
        if(isValid(i)) {
            var id = getId(i);
            var pid = isValidKey(parents[i]) ? String(parents[i]) : '';

            var cdi = {
                i: i,
                id: id,
                pid: pid,
                label: isValidKey(labels[i]) ? String(labels[i]) : ''
            };

            if(hasValues) cdi.v = +values[i];
            cd.push(cdi);
            addToLookup(pid, id);
        }
    }

    if(!parent2children['']) {
        var impliedRoots = [];
        var k;
        for(k in parent2children) {
            if(!refs[k]) {
                impliedRoots.push(k);
            }
        }

        // if an `id` has no ref in the `parents` array,
        // take it as being the root node

        if(impliedRoots.length === 1) {
            k = impliedRoots[0];
            cd.unshift({
                hasImpliedRoot: true,
                id: k,
                pid: '',
                label: k
            });
        } else {
            return Lib.warn('Multiple implied roots, cannot build ' + trace.type + ' hierarchy.');
        }
    } else if(parent2children[''].length > 1) {
        var dummyId = Lib.randstr();

        // if multiple rows linked to the root node,
        // add dummy "root of roots" node to make d3 build the hierarchy successfully

        for(var j = 0; j < cd.length; j++) {
            if(cd[j].pid === '') {
                cd[j].pid = dummyId;
            }
        }

        cd.unshift({
            hasMultipleRoots: true,
            id: dummyId,
            pid: '',
            label: ''
        });
    }

    // TODO might be better to replace stratify() with our own algorithm
    var root;
    try {
        root = d3Hierarchy.stratify()
            .id(function(d) { return d.id; })
            .parentId(function(d) { return d.pid; })(cd);
    } catch(e) {
        return Lib.warn('Failed to build ' + trace.type + ' hierarchy. Error: ' + e.message);
    }

    var hierarchy = d3Hierarchy.hierarchy(root);
    var failed = false;

    if(hasValues) {
        switch(trace.branchvalues) {
            case 'remainder':
                hierarchy.sum(function(d) { return d.data.v; });
                break;
            case 'total':
                hierarchy.each(function(d) {
                    var cdi = d.data.data;
                    var v = cdi.v;

                    if(d.children) {
                        var partialSum = d.children.reduce(function(a, c) {
                            return a + c.data.data.v;
                        }, 0);

                        // N.B. we must fill in `value` for generated sectors
                        // with the partialSum to compute the correct partition
                        if(cdi.hasImpliedRoot || cdi.hasMultipleRoots) {
                            v = partialSum;
                        }

                        if(v < partialSum * ALMOST_EQUAL) {
                            failed = true;
                            return Lib.warn([
                                'Total value for node', d.data.data.id,
                                'is smaller than the sum of its children.',
                                '\nparent value =', v,
                                '\nchildren sum =', partialSum
                            ].join(' '));
                        }
                    }

                    d.value = v;
                });
                break;
        }
    } else {
        countDescendants(hierarchy, trace, {
            branches: trace.count.indexOf('branches') !== -1,
            leaves: trace.count.indexOf('leaves') !== -1
        });
    }

    if(failed) return;

    // TODO add way to sort by height also?
    hierarchy.sort(function(a, b) { return b.value - a.value; });

    var pullColor;
    var scaleColor;
    var colors = trace.marker.colors || [];
    var hasColors = !!colors.length;

    if(trace._hasColorscale) {
        if(!hasColors) {
            colors = hasValues ? trace.values : trace._values;
        }

        colorscaleCalc(gd, trace, {
            vals: colors,
            containerStr: 'marker',
            cLetter: 'c'
        });

        scaleColor = makeColorScaleFn(trace.marker);
    } else {
        pullColor = makePullColorFn(fullLayout['_' + trace.type + 'colormap']);
    }

    // TODO keep track of 'root-children' (i.e. branch) for hover info etc.

    hierarchy.each(function(d) {
        var cdi = d.data.data;
        // N.B. this mutates items in `cd`
        cdi.color = trace._hasColorscale ?
            scaleColor(colors[cdi.i]) :
            pullColor(colors[cdi.i], cdi.id);
    });

    cd[0].hierarchy = hierarchy;

    return cd;
};

/*
 * `calc` filled in (and collated) explicit colors.
 * Now we need to propagate these explicit colors to other traces,
 * and fill in default colors.
 * This is done after sorting, so we pick defaults
 * in the order slices will be displayed
 */
exports._runCrossTraceCalc = function(desiredType, gd) {
    var fullLayout = gd._fullLayout;
    var calcdata = gd.calcdata;
    var colorWay = fullLayout[desiredType + 'colorway'];
    var colorMap = fullLayout['_' + desiredType + 'colormap'];

    if(fullLayout['extend' + desiredType + 'colors']) {
        colorWay = generateExtendedColors(colorWay,
            desiredType === 'treemap' ? treemapExtendedColorWays : sunburstExtendedColorWays
        );
    }
    var dfltColorCount = 0;

    function pickColor(d) {
        var cdi = d.data.data;
        var id = cdi.id;

        if(cdi.color === false) {
            if(colorMap[id]) {
                // have we seen this label and assigned a color to it in a previous trace?
                cdi.color = colorMap[id];
            } else if(d.parent) {
                if(d.parent.parent) {
                    // from third-level on, inherit from parent
                    cdi.color = d.parent.data.data.color;
                } else {
                    // pick new color for second level
                    colorMap[id] = cdi.color = colorWay[dfltColorCount % colorWay.length];
                    dfltColorCount++;
                }
            } else {
                // root gets no coloring by default
                cdi.color = 'rgba(0,0,0,0)';
            }
        }
    }

    for(var i = 0; i < calcdata.length; i++) {
        var cd = calcdata[i];
        var cd0 = cd[0];
        if(cd0.trace.type === desiredType && cd0.hierarchy) {
            cd0.hierarchy.each(pickColor);
        }
    }
};

exports.crossTraceCalc = function(gd) {
    return exports._runCrossTraceCalc('sunburst', gd);
};

function countDescendants(node, trace, opts) {
    var nChild = 0;

    var children = node.children;
    if(children) {
        var len = children.length;

        for(var i = 0; i < len; i++) {
            nChild += countDescendants(children[i], trace, opts);
        }

        if(opts.branches) nChild++; // count this branch
    } else {
        if(opts.leaves) nChild++; // count this leaf
    }

    // save to the node
    node.value = node.data.data.value = nChild;

    // save to the trace
    if(!trace._values) trace._values = [];
    trace._values[node.data.data.i] = nChild;

    return nChild;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/constants.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/constants.js ***!
  \*****************************************************************/
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
    CLICK_TRANSITION_TIME: 750,
    CLICK_TRANSITION_EASING: 'linear',
    eventDataKeys: [
        // string
        'currentPath',
        'root',
        'entry',
        // no need to add 'parent' here

        // percentages i.e. ratios
        'percentRoot',
        'percentEntry',
        'percentParent'
    ]
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/fx.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/fx.js ***!
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
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var appendArrayPointValue = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").appendArrayPointValue;
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Events = __webpack_require__(/*! ../../lib/events */ "./node_modules/plotly.js/src/lib/events.js");

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/sunburst/helpers.js");
var pieHelpers = __webpack_require__(/*! ../pie/helpers */ "./node_modules/plotly.js/src/traces/pie/helpers.js");

var formatValue = pieHelpers.formatPieValue;

module.exports = function attachFxHandlers(sliceTop, entry, gd, cd, opts) {
    var cd0 = cd[0];
    var trace = cd0.trace;
    var hierarchy = cd0.hierarchy;

    var isSunburst = trace.type === 'sunburst';
    var isTreemap = trace.type === 'treemap';

    // hover state vars
    // have we drawn a hover label, so it should be cleared later
    if(!('_hasHoverLabel' in trace)) trace._hasHoverLabel = false;
    // have we emitted a hover event, so later an unhover event should be emitted
    // note that click events do not depend on this - you can still get them
    // with hovermode: false or if you were earlier dragging, then clicked
    // in the same slice that you moused up in
    if(!('_hasHoverEvent' in trace)) trace._hasHoverEvent = false;

    var onMouseOver = function(pt) {
        var fullLayoutNow = gd._fullLayout;

        if(gd._dragging || fullLayoutNow.hovermode === false) return;

        var traceNow = gd._fullData[trace.index];
        var cdi = pt.data.data;
        var ptNumber = cdi.i;
        var isRoot = helpers.isHierarchyRoot(pt);
        var parent = helpers.getParent(hierarchy, pt);

        var val = helpers.getValue(pt);

        var _cast = function(astr) {
            return Lib.castOption(traceNow, ptNumber, astr);
        };

        var hovertemplate = _cast('hovertemplate');
        var hoverinfo = Fx.castHoverinfo(traceNow, fullLayoutNow, ptNumber);
        var separators = fullLayoutNow.separators;

        if(hovertemplate || (hoverinfo && hoverinfo !== 'none' && hoverinfo !== 'skip')) {
            var hoverCenterX;
            var hoverCenterY;
            if(isSunburst) {
                hoverCenterX = cd0.cx + pt.pxmid[0] * (1 - pt.rInscribed);
                hoverCenterY = cd0.cy + pt.pxmid[1] * (1 - pt.rInscribed);
            }
            if(isTreemap) {
                hoverCenterX = pt._hoverX;
                hoverCenterY = pt._hoverY;
            }

            var hoverPt = {};
            var parts = [];
            var thisText = [];
            var hasFlag = function(flag) { return parts.indexOf(flag) !== -1; };

            if(hoverinfo) {
                parts = hoverinfo === 'all' ?
                    traceNow._module.attributes.hoverinfo.flags :
                    hoverinfo.split('+');
            }

            hoverPt.label = cdi.label;
            if(hasFlag('label') && hoverPt.label) thisText.push(hoverPt.label);

            if(cdi.hasOwnProperty('v')) {
                hoverPt.value = cdi.v;
                hoverPt.valueLabel = formatValue(hoverPt.value, separators);
                if(hasFlag('value')) thisText.push(hoverPt.valueLabel);
            }

            hoverPt.currentPath = pt.currentPath = helpers.getPath(pt.data);
            if(hasFlag('current path') && !isRoot) {
                thisText.push(hoverPt.currentPath);
            }

            var tx;
            var allPercents = [];
            var insertPercent = function() {
                if(allPercents.indexOf(tx) === -1) { // no need to add redundant info
                    thisText.push(tx);
                    allPercents.push(tx);
                }
            };

            hoverPt.percentParent = pt.percentParent = val / helpers.getValue(parent);
            hoverPt.parent = pt.parentString = helpers.getPtLabel(parent);
            if(hasFlag('percent parent')) {
                tx = helpers.formatPercent(hoverPt.percentParent, separators) + ' of ' + hoverPt.parent;
                insertPercent();
            }

            hoverPt.percentEntry = pt.percentEntry = val / helpers.getValue(entry);
            hoverPt.entry = pt.entry = helpers.getPtLabel(entry);
            if(hasFlag('percent entry') && !isRoot && !pt.onPathbar) {
                tx = helpers.formatPercent(hoverPt.percentEntry, separators) + ' of ' + hoverPt.entry;
                insertPercent();
            }

            hoverPt.percentRoot = pt.percentRoot = val / helpers.getValue(hierarchy);
            hoverPt.root = pt.root = helpers.getPtLabel(hierarchy);
            if(hasFlag('percent root') && !isRoot) {
                tx = helpers.formatPercent(hoverPt.percentRoot, separators) + ' of ' + hoverPt.root;
                insertPercent();
            }

            hoverPt.text = _cast('hovertext') || _cast('text');
            if(hasFlag('text')) {
                tx = hoverPt.text;
                if(Lib.isValidTextValue(tx)) thisText.push(tx);
            }

            var hoverItems = {
                trace: traceNow,
                y: hoverCenterY,
                text: thisText.join('<br>'),
                name: (hovertemplate || hasFlag('name')) ? traceNow.name : undefined,
                color: _cast('hoverlabel.bgcolor') || cdi.color,
                borderColor: _cast('hoverlabel.bordercolor'),
                fontFamily: _cast('hoverlabel.font.family'),
                fontSize: _cast('hoverlabel.font.size'),
                fontColor: _cast('hoverlabel.font.color'),
                nameLength: _cast('hoverlabel.namelength'),
                textAlign: _cast('hoverlabel.align'),
                hovertemplate: hovertemplate,
                hovertemplateLabels: hoverPt,
                eventData: [makeEventData(pt, traceNow, opts.eventDataKeys)]
            };

            if(isSunburst) {
                hoverItems.x0 = hoverCenterX - pt.rInscribed * pt.rpx1;
                hoverItems.x1 = hoverCenterX + pt.rInscribed * pt.rpx1;
                hoverItems.idealAlign = pt.pxmid[0] < 0 ? 'left' : 'right';
            }
            if(isTreemap) {
                hoverItems.x = hoverCenterX;
                hoverItems.idealAlign = hoverCenterX < 0 ? 'left' : 'right';
            }

            Fx.loneHover(hoverItems, {
                container: fullLayoutNow._hoverlayer.node(),
                outerContainer: fullLayoutNow._paper.node(),
                gd: gd
            });

            trace._hasHoverLabel = true;
        }

        if(isTreemap) {
            var slice = sliceTop.select('path.surface');
            opts.styleOne(slice, pt, traceNow, {
                hovered: true
            });
        }

        trace._hasHoverEvent = true;
        gd.emit('plotly_hover', {
            points: [makeEventData(pt, traceNow, opts.eventDataKeys)],
            event: d3.event
        });
    };

    var onMouseOut = function(evt) {
        var fullLayoutNow = gd._fullLayout;
        var traceNow = gd._fullData[trace.index];
        var pt = d3.select(this).datum();

        if(trace._hasHoverEvent) {
            evt.originalEvent = d3.event;
            gd.emit('plotly_unhover', {
                points: [makeEventData(pt, traceNow, opts.eventDataKeys)],
                event: d3.event
            });
            trace._hasHoverEvent = false;
        }

        if(trace._hasHoverLabel) {
            Fx.loneUnhover(fullLayoutNow._hoverlayer.node());
            trace._hasHoverLabel = false;
        }

        if(isTreemap) {
            var slice = sliceTop.select('path.surface');
            opts.styleOne(slice, pt, traceNow, {
                hovered: false
            });
        }
    };

    var onClick = function(pt) {
        // TODO: this does not support right-click. If we want to support it, we
        // would likely need to change pie to use dragElement instead of straight
        // mapbox event binding. Or perhaps better, make a simple wrapper with the
        // right mousedown, mousemove, and mouseup handlers just for a left/right click
        // mapbox would use this too.
        var fullLayoutNow = gd._fullLayout;
        var traceNow = gd._fullData[trace.index];

        var noTransition = isSunburst && (helpers.isHierarchyRoot(pt) || helpers.isLeaf(pt));

        var id = helpers.getPtId(pt);
        var nextEntry = helpers.isEntry(pt) ?
            helpers.findEntryWithChild(hierarchy, id) :
            helpers.findEntryWithLevel(hierarchy, id);
        var nextLevel = helpers.getPtId(nextEntry);

        var typeClickEvtData = {
            points: [makeEventData(pt, traceNow, opts.eventDataKeys)],
            event: d3.event
        };
        if(!noTransition) typeClickEvtData.nextLevel = nextLevel;

        var clickVal = Events.triggerHandler(gd, 'plotly_' + trace.type + 'click', typeClickEvtData);

        if(clickVal !== false && fullLayoutNow.hovermode) {
            gd._hoverdata = [makeEventData(pt, traceNow, opts.eventDataKeys)];
            Fx.click(gd, d3.event);
        }

        // if click does not trigger a transition, we're done!
        if(noTransition) return;

        // if custom handler returns false, we're done!
        if(clickVal === false) return;

        // skip if triggered from dragging a nearby cartesian subplot
        if(gd._dragging) return;

        // skip during transitions, to avoid potential bugs
        // we could remove this check later
        if(gd._transitioning) return;

        // store 'old' level in guiEdit stash, so that subsequent Plotly.react
        // calls with the same uirevision can start from the same entry
        Registry.call('_storeDirectGUIEdit', traceNow, fullLayoutNow._tracePreGUI[traceNow.uid], {
            level: traceNow.level
        });

        var frame = {
            data: [{level: nextLevel}],
            traces: [trace.index]
        };

        var animOpts = {
            frame: {
                redraw: false,
                duration: opts.transitionTime
            },
            transition: {
                duration: opts.transitionTime,
                easing: opts.transitionEasing
            },
            mode: 'immediate',
            fromcurrent: true
        };

        Fx.loneUnhover(fullLayoutNow._hoverlayer.node());
        Registry.call('animate', gd, frame, animOpts);
    };

    sliceTop.on('mouseover', onMouseOver);
    sliceTop.on('mouseout', onMouseOut);
    sliceTop.on('click', onClick);
};

function makeEventData(pt, trace, keys) {
    var cdi = pt.data.data;

    var out = {
        curveNumber: trace.index,
        pointNumber: cdi.i,
        data: trace._input,
        fullData: trace,

        // TODO more things like 'children', 'siblings', 'hierarchy?
    };

    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if(key in pt) out[key] = pt[key];
    }
    // handle special case of parent
    if('parentString' in pt && !helpers.isHierarchyRoot(pt)) out.parent = pt.parentString;

    appendArrayPointValue(out, trace, cdi.i);

    return out;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/helpers.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/helpers.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var setCursor = __webpack_require__(/*! ../../lib/setcursor */ "./node_modules/plotly.js/src/lib/setcursor.js");
var pieHelpers = __webpack_require__(/*! ../pie/helpers */ "./node_modules/plotly.js/src/traces/pie/helpers.js");

exports.findEntryWithLevel = function(hierarchy, level) {
    var out;
    if(level) {
        hierarchy.eachAfter(function(pt) {
            if(exports.getPtId(pt) === level) {
                return out = pt.copy();
            }
        });
    }
    return out || hierarchy;
};

exports.findEntryWithChild = function(hierarchy, childId) {
    var out;
    hierarchy.eachAfter(function(pt) {
        var children = pt.children || [];
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(exports.getPtId(child) === childId) {
                return out = pt.copy();
            }
        }
    });
    return out || hierarchy;
};

exports.isEntry = function(pt) {
    return !pt.parent;
};

exports.isLeaf = function(pt) {
    return !pt.children;
};

exports.getPtId = function(pt) {
    return pt.data.data.id;
};

exports.getPtLabel = function(pt) {
    return pt.data.data.label;
};

exports.getValue = function(d) {
    return d.value;
};

exports.isHierarchyRoot = function(pt) {
    return getParentId(pt) === '';
};

exports.setSliceCursor = function(sliceTop, gd, opts) {
    var hide = opts.isTransitioning;
    if(!hide) {
        var pt = sliceTop.datum();
        hide = (
            (opts.hideOnRoot && exports.isHierarchyRoot(pt)) ||
            (opts.hideOnLeaves && exports.isLeaf(pt))
        );
    }
    setCursor(sliceTop, hide ? null : 'pointer');
};

function determineOutsideTextFont(trace, pt, layoutFont) {
    return {
        color: exports.getOutsideTextFontKey('color', trace, pt, layoutFont),
        family: exports.getOutsideTextFontKey('family', trace, pt, layoutFont),
        size: exports.getOutsideTextFontKey('size', trace, pt, layoutFont)
    };
}

function determineInsideTextFont(trace, pt, layoutFont, opts) {
    var onPathbar = (opts || {}).onPathbar;

    var cdi = pt.data.data;
    var ptNumber = cdi.i;

    var customColor = Lib.castOption(trace, ptNumber,
        (onPathbar ? 'pathbar.textfont' : 'insidetextfont') + '.color'
    );

    if(!customColor && trace._input.textfont) {
        // Why not simply using trace.textfont? Because if not set, it
        // defaults to layout.font which has a default color. But if
        // textfont.color and insidetextfont.color don't supply a value,
        // a contrasting color shall be used.
        customColor = Lib.castOption(trace._input, ptNumber, 'textfont.color');
    }

    return {
        color: customColor || Color.contrast(cdi.color),
        family: exports.getInsideTextFontKey('family', trace, pt, layoutFont, opts),
        size: exports.getInsideTextFontKey('size', trace, pt, layoutFont, opts)
    };
}

exports.getInsideTextFontKey = function(keyStr, trace, pt, layoutFont, opts) {
    var onPathbar = (opts || {}).onPathbar;
    var cont = onPathbar ? 'pathbar.textfont' : 'insidetextfont';
    var ptNumber = pt.data.data.i;

    return (
        Lib.castOption(trace, ptNumber, cont + '.' + keyStr) ||
        Lib.castOption(trace, ptNumber, 'textfont.' + keyStr) ||
        layoutFont.size
    );
};

exports.getOutsideTextFontKey = function(keyStr, trace, pt, layoutFont) {
    var ptNumber = pt.data.data.i;

    return (
        Lib.castOption(trace, ptNumber, 'outsidetextfont.' + keyStr) ||
        Lib.castOption(trace, ptNumber, 'textfont.' + keyStr) ||
        layoutFont.size
    );
};

exports.isOutsideText = function(trace, pt) {
    return !trace._hasColorscale && exports.isHierarchyRoot(pt);
};

exports.determineTextFont = function(trace, pt, layoutFont, opts) {
    return exports.isOutsideText(trace, pt) ?
        determineOutsideTextFont(trace, pt, layoutFont) :
        determineInsideTextFont(trace, pt, layoutFont, opts);
};

exports.hasTransition = function(transitionOpts) {
    // We could optimize hasTransition per trace,
    // as sunburst & treemap have no cross-trace logic!
    return !!(transitionOpts && transitionOpts.duration > 0);
};

exports.getMaxDepth = function(trace) {
    return trace.maxdepth >= 0 ? trace.maxdepth : Infinity;
};

exports.isHeader = function(pt, trace) { // it is only used in treemap.
    return !(exports.isLeaf(pt) || pt.depth === trace._maxDepth - 1);
};

function getParentId(pt) {
    return pt.data.data.pid;
}

exports.getParent = function(hierarchy, pt) {
    return exports.findEntryWithLevel(hierarchy, getParentId(pt));
};

exports.listPath = function(d, keyStr) {
    var parent = d.parent;
    if(!parent) return [];
    var list = keyStr ? [parent.data[keyStr]] : [parent];
    return exports.listPath(parent, keyStr).concat(list);
};

exports.getPath = function(d) {
    return exports.listPath(d, 'label').join('/') + '/';
};

exports.formatValue = pieHelpers.formatPieValue;

// TODO: should combine the two in a separate PR - Also please note Lib.formatPercent should support separators.
exports.formatPercent = function(v, separators) {
    var tx = Lib.formatPercent(v, 0); // use funnel(area) version
    if(tx === '0%') tx = pieHelpers.formatPiePercent(v, separators); // use pie version
    return tx;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/plot.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/plot.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var d3Hierarchy = __webpack_require__(/*! d3-hierarchy */ "./node_modules/d3-hierarchy/src/index.js");

var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var uniformText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js");
var recordMinTextSize = uniformText.recordMinTextSize;
var clearMinTextSize = uniformText.clearMinTextSize;
var piePlot = __webpack_require__(/*! ../pie/plot */ "./node_modules/plotly.js/src/traces/pie/plot.js");
var computeTransform = piePlot.computeTransform;
var transformInsideText = piePlot.transformInsideText;
var styleOne = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/sunburst/style.js").styleOne;
var resizeText = __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js").resizeText;
var attachFxHandlers = __webpack_require__(/*! ./fx */ "./node_modules/plotly.js/src/traces/sunburst/fx.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/sunburst/constants.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/sunburst/helpers.js");

exports.plot = function(gd, cdmodule, transitionOpts, makeOnCompleteCallback) {
    var fullLayout = gd._fullLayout;
    var layer = fullLayout._sunburstlayer;
    var join, onComplete;

    // If transition config is provided, then it is only a partial replot and traces not
    // updated are removed.
    var isFullReplot = !transitionOpts;
    var hasTransition = !fullLayout.uniformtext.mode && helpers.hasTransition(transitionOpts);

    clearMinTextSize('sunburst', fullLayout);

    join = layer.selectAll('g.trace.sunburst')
        .data(cdmodule, function(cd) { return cd[0].trace.uid; });

    // using same 'stroke-linejoin' as pie traces
    join.enter().append('g')
        .classed('trace', true)
        .classed('sunburst', true)
        .attr('stroke-linejoin', 'round');

    join.order();

    if(hasTransition) {
        if(makeOnCompleteCallback) {
            // If it was passed a callback to register completion, make a callback. If
            // this is created, then it must be executed on completion, otherwise the
            // pos-transition redraw will not execute:
            onComplete = makeOnCompleteCallback();
        }

        var transition = d3.transition()
            .duration(transitionOpts.duration)
            .ease(transitionOpts.easing)
            .each('end', function() { onComplete && onComplete(); })
            .each('interrupt', function() { onComplete && onComplete(); });

        transition.each(function() {
            // Must run the selection again since otherwise enters/updates get grouped together
            // and these get executed out of order. Except we need them in order!
            layer.selectAll('g.trace').each(function(cd) {
                plotOne(gd, cd, this, transitionOpts);
            });
        });
    } else {
        join.each(function(cd) {
            plotOne(gd, cd, this, transitionOpts);
        });

        if(fullLayout.uniformtext.mode) {
            resizeText(gd, fullLayout._sunburstlayer.selectAll('.trace'), 'sunburst');
        }
    }

    if(isFullReplot) {
        join.exit().remove();
    }
};

function plotOne(gd, cd, element, transitionOpts) {
    var fullLayout = gd._fullLayout;
    var hasTransition = !fullLayout.uniformtext.mode && helpers.hasTransition(transitionOpts);

    var gTrace = d3.select(element);
    var slices = gTrace.selectAll('g.slice');

    var cd0 = cd[0];
    var trace = cd0.trace;
    var hierarchy = cd0.hierarchy;
    var entry = helpers.findEntryWithLevel(hierarchy, trace.level);
    var maxDepth = helpers.getMaxDepth(trace);

    var gs = fullLayout._size;
    var domain = trace.domain;
    var vpw = gs.w * (domain.x[1] - domain.x[0]);
    var vph = gs.h * (domain.y[1] - domain.y[0]);
    var rMax = 0.5 * Math.min(vpw, vph);
    var cx = cd0.cx = gs.l + gs.w * (domain.x[1] + domain.x[0]) / 2;
    var cy = cd0.cy = gs.t + gs.h * (1 - domain.y[0]) - vph / 2;

    if(!entry) {
        return slices.remove();
    }

    // previous root 'pt' (can be empty)
    var prevEntry = null;
    // stash of 'previous' position data used by tweening functions
    var prevLookup = {};

    if(hasTransition) {
        // Important: do this before binding new sliceData!
        slices.each(function(pt) {
            prevLookup[helpers.getPtId(pt)] = {
                rpx0: pt.rpx0,
                rpx1: pt.rpx1,
                x0: pt.x0,
                x1: pt.x1,
                transform: pt.transform
            };

            if(!prevEntry && helpers.isEntry(pt)) {
                prevEntry = pt;
            }
        });
    }

    // N.B. slice data isn't the calcdata,
    // grab corresponding calcdata item in sliceData[i].data.data
    var sliceData = partition(entry).descendants();

    var maxHeight = entry.height + 1;
    var yOffset = 0;
    var cutoff = maxDepth;
    // N.B. handle multiple-root special case
    if(cd0.hasMultipleRoots && helpers.isHierarchyRoot(entry)) {
        sliceData = sliceData.slice(1);
        maxHeight -= 1;
        yOffset = 1;
        cutoff += 1;
    }

    // filter out slices that won't show up on graph
    sliceData = sliceData.filter(function(pt) { return pt.y1 <= cutoff; });

    // partition span ('y') to sector radial px value
    var maxY = Math.min(maxHeight, maxDepth);
    var y2rpx = function(y) { return (y - yOffset) / maxY * rMax; };
    // (radial px value, partition angle ('x'))  to px [x,y]
    var rx2px = function(r, x) { return [r * Math.cos(x), -r * Math.sin(x)]; };
    // slice path generation fn
    var pathSlice = function(d) { return Lib.pathAnnulus(d.rpx0, d.rpx1, d.x0, d.x1, cx, cy); };
    // slice text translate x/y

    var getTargetX = function(d) { return cx + getTextXY(d)[0] * (d.transform.rCenter || 0) + (d.transform.x || 0); };
    var getTargetY = function(d) { return cy + getTextXY(d)[1] * (d.transform.rCenter || 0) + (d.transform.y || 0); };

    slices = slices.data(sliceData, helpers.getPtId);

    slices.enter().append('g')
        .classed('slice', true);

    if(hasTransition) {
        slices.exit().transition()
            .each(function() {
                var sliceTop = d3.select(this);

                var slicePath = sliceTop.select('path.surface');
                slicePath.transition().attrTween('d', function(pt2) {
                    var interp = makeExitSliceInterpolator(pt2);
                    return function(t) { return pathSlice(interp(t)); };
                });

                var sliceTextGroup = sliceTop.select('g.slicetext');
                sliceTextGroup.attr('opacity', 0);
            })
            .remove();
    } else {
        slices.exit().remove();
    }

    slices.order();

    // next x1 (i.e. sector end angle) of previous entry
    var nextX1ofPrevEntry = null;
    if(hasTransition && prevEntry) {
        var prevEntryId = helpers.getPtId(prevEntry);
        slices.each(function(pt) {
            if(nextX1ofPrevEntry === null && (helpers.getPtId(pt) === prevEntryId)) {
                nextX1ofPrevEntry = pt.x1;
            }
        });
    }

    var updateSlices = slices;
    if(hasTransition) {
        updateSlices = updateSlices.transition().each('end', function() {
            // N.B. gd._transitioning is (still) *true* by the time
            // transition updates get here
            var sliceTop = d3.select(this);
            helpers.setSliceCursor(sliceTop, gd, {
                hideOnRoot: true,
                hideOnLeaves: true,
                isTransitioning: false
            });
        });
    }

    updateSlices.each(function(pt) {
        var sliceTop = d3.select(this);

        var slicePath = Lib.ensureSingle(sliceTop, 'path', 'surface', function(s) {
            s.style('pointer-events', 'all');
        });

        pt.rpx0 = y2rpx(pt.y0);
        pt.rpx1 = y2rpx(pt.y1);
        pt.xmid = (pt.x0 + pt.x1) / 2;
        pt.pxmid = rx2px(pt.rpx1, pt.xmid);
        pt.midangle = -(pt.xmid - Math.PI / 2);
        pt.startangle = -(pt.x0 - Math.PI / 2);
        pt.stopangle = -(pt.x1 - Math.PI / 2);
        pt.halfangle = 0.5 * Math.min(Lib.angleDelta(pt.x0, pt.x1) || Math.PI, Math.PI);
        pt.ring = 1 - (pt.rpx0 / pt.rpx1);
        pt.rInscribed = getInscribedRadiusFraction(pt, trace);

        if(hasTransition) {
            slicePath.transition().attrTween('d', function(pt2) {
                var interp = makeUpdateSliceInterpolator(pt2);
                return function(t) { return pathSlice(interp(t)); };
            });
        } else {
            slicePath.attr('d', pathSlice);
        }

        sliceTop
            .call(attachFxHandlers, entry, gd, cd, {
                eventDataKeys: constants.eventDataKeys,
                transitionTime: constants.CLICK_TRANSITION_TIME,
                transitionEasing: constants.CLICK_TRANSITION_EASING
            })
            .call(helpers.setSliceCursor, gd, {
                hideOnRoot: true,
                hideOnLeaves: true,
                isTransitioning: gd._transitioning
            });

        slicePath.call(styleOne, pt, trace);

        var sliceTextGroup = Lib.ensureSingle(sliceTop, 'g', 'slicetext');
        var sliceText = Lib.ensureSingle(sliceTextGroup, 'text', '', function(s) {
            // prohibit tex interpretation until we can handle
            // tex and regular text together
            s.attr('data-notex', 1);
        });

        var font = Lib.ensureUniformFontSize(gd, helpers.determineTextFont(trace, pt, fullLayout.font));

        sliceText.text(exports.formatSliceLabel(pt, entry, trace, cd, fullLayout))
            .classed('slicetext', true)
            .attr('text-anchor', 'middle')
            .call(Drawing.font, font)
            .call(svgTextUtils.convertToTspans, gd);

        // position the text relative to the slice
        var textBB = Drawing.bBox(sliceText.node());
        pt.transform = transformInsideText(textBB, pt, cd0);
        pt.transform.targetX = getTargetX(pt);
        pt.transform.targetY = getTargetY(pt);

        var strTransform = function(d, textBB) {
            var transform = d.transform;
            computeTransform(transform, textBB);

            transform.fontSize = font.size;
            recordMinTextSize(trace.type, transform, fullLayout);

            return Lib.getTextTransform(transform);
        };

        if(hasTransition) {
            sliceText.transition().attrTween('transform', function(pt2) {
                var interp = makeUpdateTextInterpolator(pt2);
                return function(t) { return strTransform(interp(t), textBB); };
            });
        } else {
            sliceText.attr('transform', strTransform(pt, textBB));
        }
    });

    function makeExitSliceInterpolator(pt) {
        var id = helpers.getPtId(pt);
        var prev = prevLookup[id];
        var entryPrev = prevLookup[helpers.getPtId(entry)];
        var next;

        if(entryPrev) {
            var a = pt.x1 > entryPrev.x1 ? 2 * Math.PI : 0;
            // if pt to remove:
            // - if 'below' where the root-node used to be: shrink it radially inward
            // - otherwise, collapse it clockwise or counterclockwise which ever is shortest to theta=0
            next = pt.rpx1 < entryPrev.rpx1 ? {rpx0: 0, rpx1: 0} : {x0: a, x1: a};
        } else {
            // this happens when maxdepth is set, when leaves must
            // be removed and the rootPt is new (i.e. does not have a 'prev' object)
            var parent;
            var parentId = helpers.getPtId(pt.parent);
            slices.each(function(pt2) {
                if(helpers.getPtId(pt2) === parentId) {
                    return parent = pt2;
                }
            });
            var parentChildren = parent.children;
            var ci;
            parentChildren.forEach(function(pt2, i) {
                if(helpers.getPtId(pt2) === id) {
                    return ci = i;
                }
            });
            var n = parentChildren.length;
            var interp = d3.interpolate(parent.x0, parent.x1);
            next = {
                rpx0: rMax, rpx1: rMax,
                x0: interp(ci / n), x1: interp((ci + 1) / n)
            };
        }

        return d3.interpolate(prev, next);
    }

    function makeUpdateSliceInterpolator(pt) {
        var prev0 = prevLookup[helpers.getPtId(pt)];
        var prev;
        var next = {x0: pt.x0, x1: pt.x1, rpx0: pt.rpx0, rpx1: pt.rpx1};

        if(prev0) {
            // if pt already on graph, this is easy
            prev = prev0;
        } else {
            // for new pts:
            if(prevEntry) {
                // if trace was visible before
                if(pt.parent) {
                    if(nextX1ofPrevEntry) {
                        // if new branch, twist it in clockwise or
                        // counterclockwise which ever is shorter to
                        // its final angle
                        var a = pt.x1 > nextX1ofPrevEntry ? 2 * Math.PI : 0;
                        prev = {x0: a, x1: a};
                    } else {
                        // if new leaf (when maxdepth is set),
                        // grow it radially and angularly from
                        // its parent node
                        prev = {rpx0: rMax, rpx1: rMax};
                        Lib.extendFlat(prev, interpX0X1FromParent(pt));
                    }
                } else {
                    // if new root-node, grow it radially
                    prev = {rpx0: 0, rpx1: 0};
                }
            } else {
                // start sector of new traces from theta=0
                prev = {x0: 0, x1: 0};
            }
        }

        return d3.interpolate(prev, next);
    }

    function makeUpdateTextInterpolator(pt) {
        var prev0 = prevLookup[helpers.getPtId(pt)];
        var prev;
        var transform = pt.transform;

        if(prev0) {
            prev = prev0;
        } else {
            prev = {
                rpx1: pt.rpx1,
                transform: {
                    textPosAngle: transform.textPosAngle,
                    scale: 0,
                    rotate: transform.rotate,
                    rCenter: transform.rCenter,
                    x: transform.x,
                    y: transform.y
                }
            };

            // for new pts:
            if(prevEntry) {
                // if trace was visible before
                if(pt.parent) {
                    if(nextX1ofPrevEntry) {
                        // if new branch, twist it in clockwise or
                        // counterclockwise which ever is shorter to
                        // its final angle
                        var a = pt.x1 > nextX1ofPrevEntry ? 2 * Math.PI : 0;
                        prev.x0 = prev.x1 = a;
                    } else {
                        // if leaf
                        Lib.extendFlat(prev, interpX0X1FromParent(pt));
                    }
                } else {
                    // if new root-node
                    prev.x0 = prev.x1 = 0;
                }
            } else {
                // on new traces
                prev.x0 = prev.x1 = 0;
            }
        }

        var textPosAngleFn = d3.interpolate(prev.transform.textPosAngle, pt.transform.textPosAngle);
        var rpx1Fn = d3.interpolate(prev.rpx1, pt.rpx1);
        var x0Fn = d3.interpolate(prev.x0, pt.x0);
        var x1Fn = d3.interpolate(prev.x1, pt.x1);
        var scaleFn = d3.interpolate(prev.transform.scale, transform.scale);
        var rotateFn = d3.interpolate(prev.transform.rotate, transform.rotate);

        // smooth out start/end from entry, to try to keep text inside sector
        // while keeping transition smooth
        var pow = transform.rCenter === 0 ? 3 :
            prev.transform.rCenter === 0 ? 1 / 3 :
            1;
        var _rCenterFn = d3.interpolate(prev.transform.rCenter, transform.rCenter);
        var rCenterFn = function(t) { return _rCenterFn(Math.pow(t, pow)); };

        return function(t) {
            var rpx1 = rpx1Fn(t);
            var x0 = x0Fn(t);
            var x1 = x1Fn(t);
            var rCenter = rCenterFn(t);
            var pxmid = rx2px(rpx1, (x0 + x1) / 2);
            var textPosAngle = textPosAngleFn(t);

            var d = {
                pxmid: pxmid,
                rpx1: rpx1,
                transform: {
                    textPosAngle: textPosAngle,
                    rCenter: rCenter,
                    x: transform.x,
                    y: transform.y
                }
            };

            recordMinTextSize(trace.type, transform, fullLayout);
            return {
                transform: {
                    targetX: getTargetX(d),
                    targetY: getTargetY(d),
                    scale: scaleFn(t),
                    rotate: rotateFn(t),
                    rCenter: rCenter
                }
            };
        };
    }

    function interpX0X1FromParent(pt) {
        var parent = pt.parent;
        var parentPrev = prevLookup[helpers.getPtId(parent)];
        var out = {};

        if(parentPrev) {
            // if parent is visible
            var parentChildren = parent.children;
            var ci = parentChildren.indexOf(pt);
            var n = parentChildren.length;
            var interp = d3.interpolate(parentPrev.x0, parentPrev.x1);
            out.x0 = interp(ci / n);
            out.x1 = interp(ci / n);
        } else {
            // w/o visible parent
            // TODO !!! HOW ???
            out.x0 = out.x1 = 0;
        }

        return out;
    }
}

// x[0-1] keys are angles [radians]
// y[0-1] keys are hierarchy heights [integers]
function partition(entry) {
    return d3Hierarchy.partition()
        .size([2 * Math.PI, entry.height + 1])(entry);
}

exports.formatSliceLabel = function(pt, entry, trace, cd, fullLayout) {
    var texttemplate = trace.texttemplate;
    var textinfo = trace.textinfo;

    if(!texttemplate && (!textinfo || textinfo === 'none')) {
        return '';
    }

    var separators = fullLayout.separators;
    var cd0 = cd[0];
    var cdi = pt.data.data;
    var hierarchy = cd0.hierarchy;
    var isRoot = helpers.isHierarchyRoot(pt);
    var parent = helpers.getParent(hierarchy, pt);
    var val = helpers.getValue(pt);

    if(!texttemplate) {
        var parts = textinfo.split('+');
        var hasFlag = function(flag) { return parts.indexOf(flag) !== -1; };
        var thisText = [];
        var tx;

        if(hasFlag('label') && cdi.label) {
            thisText.push(cdi.label);
        }

        if(cdi.hasOwnProperty('v') && hasFlag('value')) {
            thisText.push(helpers.formatValue(cdi.v, separators));
        }

        if(!isRoot) {
            if(hasFlag('current path')) {
                thisText.push(helpers.getPath(pt.data));
            }

            var nPercent = 0;
            if(hasFlag('percent parent')) nPercent++;
            if(hasFlag('percent entry')) nPercent++;
            if(hasFlag('percent root')) nPercent++;
            var hasMultiplePercents = nPercent > 1;

            if(nPercent) {
                var percent;
                var addPercent = function(key) {
                    tx = helpers.formatPercent(percent, separators);

                    if(hasMultiplePercents) tx += ' of ' + key;
                    thisText.push(tx);
                };

                if(hasFlag('percent parent') && !isRoot) {
                    percent = val / helpers.getValue(parent);
                    addPercent('parent');
                }
                if(hasFlag('percent entry')) {
                    percent = val / helpers.getValue(entry);
                    addPercent('entry');
                }
                if(hasFlag('percent root')) {
                    percent = val / helpers.getValue(hierarchy);
                    addPercent('root');
                }
            }
        }

        if(hasFlag('text')) {
            tx = Lib.castOption(trace, cdi.i, 'text');
            if(Lib.isValidTextValue(tx)) thisText.push(tx);
        }

        return thisText.join('<br>');
    }

    var txt = Lib.castOption(trace, cdi.i, 'texttemplate');
    if(!txt) return '';
    var obj = {};
    if(cdi.label) obj.label = cdi.label;
    if(cdi.hasOwnProperty('v')) {
        obj.value = cdi.v;
        obj.valueLabel = helpers.formatValue(cdi.v, separators);
    }

    obj.currentPath = helpers.getPath(pt.data);

    if(!isRoot) {
        obj.percentParent = val / helpers.getValue(parent);
        obj.percentParentLabel = helpers.formatPercent(
            obj.percentParent, separators
        );
        obj.parent = helpers.getPtLabel(parent);
    }

    obj.percentEntry = val / helpers.getValue(entry);
    obj.percentEntryLabel = helpers.formatPercent(
        obj.percentEntry, separators
    );
    obj.entry = helpers.getPtLabel(entry);

    obj.percentRoot = val / helpers.getValue(hierarchy);
    obj.percentRootLabel = helpers.formatPercent(
        obj.percentRoot, separators
    );
    obj.root = helpers.getPtLabel(hierarchy);

    if(cdi.hasOwnProperty('color')) {
        obj.color = cdi.color;
    }
    var ptTx = Lib.castOption(trace, cdi.i, 'text');
    if(Lib.isValidTextValue(ptTx) || ptTx === '') obj.text = ptTx;
    obj.customdata = Lib.castOption(trace, cdi.i, 'customdata');
    return Lib.texttemplateString(txt, obj, fullLayout._d3locale, obj, trace._meta || {});
};

function getInscribedRadiusFraction(pt) {
    if(pt.rpx0 === 0 && Lib.isFullCircle([pt.x0, pt.x1])) {
        // special case of 100% with no hole
        return 1;
    } else {
        return Math.max(0, Math.min(
            1 / (1 + 1 / Math.sin(pt.halfangle)),
            pt.ring / 2
        ));
    }
}

function getTextXY(d) {
    return getCoords(d.rpx1, d.transform.textPosAngle);
}

function getCoords(r, angle) {
    return [r * Math.sin(angle), -r * Math.cos(angle)];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/style.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/style.js ***!
  \*************************************************************/
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;

function style(gd) {
    var s = gd._fullLayout._sunburstlayer.selectAll('.trace');
    resizeText(gd, s, 'sunburst');

    s.each(function(cd) {
        var gTrace = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        gTrace.style('opacity', trace.opacity);

        gTrace.selectAll('path.surface').each(function(pt) {
            d3.select(this).call(styleOne, pt, trace);
        });
    });
}

function styleOne(s, pt, trace) {
    var cdi = pt.data.data;
    var isLeaf = !pt.children;
    var ptNumber = cdi.i;
    var lineColor = Lib.castOption(trace, ptNumber, 'marker.line.color') || Color.defaultLine;
    var lineWidth = Lib.castOption(trace, ptNumber, 'marker.line.width') || 0;

    s.style('stroke-width', lineWidth)
        .call(Color.fill, cdi.color)
        .call(Color.stroke, lineColor)
        .style('opacity', isLeaf ? trace.leaf.opacity : null);
}

module.exports = {
    style: style,
    styleOne: styleOne
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvYWNjZXNzb3JzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaGllcmFyY2h5L3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvY29uc3RhbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL2hpZXJhcmNoeS9hbmNlc3RvcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL2hpZXJhcmNoeS9jb3VudC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvaGllcmFyY2h5L2Rlc2NlbmRhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaGllcmFyY2h5L3NyYy9oaWVyYXJjaHkvZWFjaC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvaGllcmFyY2h5L2VhY2hBZnRlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvaGllcmFyY2h5L2VhY2hCZWZvcmUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL2hpZXJhcmNoeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvaGllcmFyY2h5L2xlYXZlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvaGllcmFyY2h5L2xpbmtzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaGllcmFyY2h5L3NyYy9oaWVyYXJjaHkvcGF0aC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvaGllcmFyY2h5L3NvcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL2hpZXJhcmNoeS9zdW0uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaGllcmFyY2h5L3NyYy9wYWNrL2VuY2xvc2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3BhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3BhY2svc2libGluZ3MuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3BhcnRpdGlvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvc3RyYXRpZnkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3RyZWUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3RyZWVtYXAvYmluYXJ5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZDMtaGllcmFyY2h5L3NyYy90cmVlbWFwL2RpY2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3RyZWVtYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3RyZWVtYXAvcmVzcXVhcmlmeS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvdHJlZW1hcC9yb3VuZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvdHJlZW1hcC9zbGljZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QzLWhpZXJhcmNoeS9zcmMvdHJlZW1hcC9zbGljZURpY2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kMy1oaWVyYXJjaHkvc3JjL3RyZWVtYXAvc3F1YXJpZnkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdW5idXJzdC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VuYnVyc3QvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N1bmJ1cnN0L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N1bmJ1cnN0L2Z4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VuYnVyc3QvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N1bmJ1cnN0L3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdW5idXJzdC9zdHlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUFlLHNDQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRk87QUFDUDtBQUNBOztBQUVBLDZCQUFlLG9DQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUkEsNkJBQWUsc0NBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBZSxzQ0FBVztBQUMxQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FD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QUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUFlLHNDQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNU9BLDZCQUFlLG9DQUFTO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkIsT0FBTztBQUNwQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFD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OztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUNBQW1DOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0Y7QUFDeEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJO0FBQ3JCLFlBQVksbUJBQU8sQ0FBQyxzRkFBd0I7QUFDNUMsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGlCQUFpQixvSEFBeUM7O0FBRTFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDdkZTJiYWEwMGE0NjcwNzU4MTg3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsKGYpIHtcbiAgcmV0dXJuIGYgPT0gbnVsbCA/IG51bGwgOiByZXF1aXJlZChmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVkKGYpIHtcbiAgaWYgKHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGY7XG59XG4iLCJleHBvcnQgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICB2YXIgbSA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHQsXG4gICAgICBpO1xuXG4gIHdoaWxlIChtKSB7XG4gICAgaSA9IE1hdGgucmFuZG9tKCkgKiBtLS0gfCAwO1xuICAgIHQgPSBhcnJheVttXTtcbiAgICBhcnJheVttXSA9IGFycmF5W2ldO1xuICAgIGFycmF5W2ldID0gdDtcbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn1cbiIsImZ1bmN0aW9uIGRlZmF1bHRTZXBhcmF0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIGEucGFyZW50ID09PSBiLnBhcmVudCA/IDEgOiAyO1xufVxuXG5mdW5jdGlvbiBtZWFuWChjaGlsZHJlbikge1xuICByZXR1cm4gY2hpbGRyZW4ucmVkdWNlKG1lYW5YUmVkdWNlLCAwKSAvIGNoaWxkcmVuLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gbWVhblhSZWR1Y2UoeCwgYykge1xuICByZXR1cm4geCArIGMueDtcbn1cblxuZnVuY3Rpb24gbWF4WShjaGlsZHJlbikge1xuICByZXR1cm4gMSArIGNoaWxkcmVuLnJlZHVjZShtYXhZUmVkdWNlLCAwKTtcbn1cblxuZnVuY3Rpb24gbWF4WVJlZHVjZSh5LCBjKSB7XG4gIHJldHVybiBNYXRoLm1heCh5LCBjLnkpO1xufVxuXG5mdW5jdGlvbiBsZWFmTGVmdChub2RlKSB7XG4gIHZhciBjaGlsZHJlbjtcbiAgd2hpbGUgKGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbikgbm9kZSA9IGNoaWxkcmVuWzBdO1xuICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gbGVhZlJpZ2h0KG5vZGUpIHtcbiAgdmFyIGNoaWxkcmVuO1xuICB3aGlsZSAoY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuKSBub2RlID0gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gIHJldHVybiBub2RlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIHNlcGFyYXRpb24gPSBkZWZhdWx0U2VwYXJhdGlvbixcbiAgICAgIGR4ID0gMSxcbiAgICAgIGR5ID0gMSxcbiAgICAgIG5vZGVTaXplID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gY2x1c3Rlcihyb290KSB7XG4gICAgdmFyIHByZXZpb3VzTm9kZSxcbiAgICAgICAgeCA9IDA7XG5cbiAgICAvLyBGaXJzdCB3YWxrLCBjb21wdXRpbmcgdGhlIGluaXRpYWwgeCAmIHkgdmFsdWVzLlxuICAgIHJvb3QuZWFjaEFmdGVyKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgbm9kZS54ID0gbWVhblgoY2hpbGRyZW4pO1xuICAgICAgICBub2RlLnkgPSBtYXhZKGNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUueCA9IHByZXZpb3VzTm9kZSA/IHggKz0gc2VwYXJhdGlvbihub2RlLCBwcmV2aW91c05vZGUpIDogMDtcbiAgICAgICAgbm9kZS55ID0gMDtcbiAgICAgICAgcHJldmlvdXNOb2RlID0gbm9kZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBsZWZ0ID0gbGVhZkxlZnQocm9vdCksXG4gICAgICAgIHJpZ2h0ID0gbGVhZlJpZ2h0KHJvb3QpLFxuICAgICAgICB4MCA9IGxlZnQueCAtIHNlcGFyYXRpb24obGVmdCwgcmlnaHQpIC8gMixcbiAgICAgICAgeDEgPSByaWdodC54ICsgc2VwYXJhdGlvbihyaWdodCwgbGVmdCkgLyAyO1xuXG4gICAgLy8gU2Vjb25kIHdhbGssIG5vcm1hbGl6aW5nIHggJiB5IHRvIHRoZSBkZXNpcmVkIHNpemUuXG4gICAgcmV0dXJuIHJvb3QuZWFjaEFmdGVyKG5vZGVTaXplID8gZnVuY3Rpb24obm9kZSkge1xuICAgICAgbm9kZS54ID0gKG5vZGUueCAtIHJvb3QueCkgKiBkeDtcbiAgICAgIG5vZGUueSA9IChyb290LnkgLSBub2RlLnkpICogZHk7XG4gICAgfSA6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUueCA9IChub2RlLnggLSB4MCkgLyAoeDEgLSB4MCkgKiBkeDtcbiAgICAgIG5vZGUueSA9ICgxIC0gKHJvb3QueSA/IG5vZGUueSAvIHJvb3QueSA6IDEpKSAqIGR5O1xuICAgIH0pO1xuICB9XG5cbiAgY2x1c3Rlci5zZXBhcmF0aW9uID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHNlcGFyYXRpb24gPSB4LCBjbHVzdGVyKSA6IHNlcGFyYXRpb247XG4gIH07XG5cbiAgY2x1c3Rlci5zaXplID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG5vZGVTaXplID0gZmFsc2UsIGR4ID0gK3hbMF0sIGR5ID0gK3hbMV0sIGNsdXN0ZXIpIDogKG5vZGVTaXplID8gbnVsbCA6IFtkeCwgZHldKTtcbiAgfTtcblxuICBjbHVzdGVyLm5vZGVTaXplID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG5vZGVTaXplID0gdHJ1ZSwgZHggPSAreFswXSwgZHkgPSAreFsxXSwgY2x1c3RlcikgOiAobm9kZVNpemUgPyBbZHgsIGR5XSA6IG51bGwpO1xuICB9O1xuXG4gIHJldHVybiBjbHVzdGVyO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbnN0YW50WmVybygpIHtcbiAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBub2RlID0gdGhpcywgbm9kZXMgPSBbbm9kZV07XG4gIHdoaWxlIChub2RlID0gbm9kZS5wYXJlbnQpIHtcbiAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICB9XG4gIHJldHVybiBub2Rlcztcbn1cbiIsImZ1bmN0aW9uIGNvdW50KG5vZGUpIHtcbiAgdmFyIHN1bSA9IDAsXG4gICAgICBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sXG4gICAgICBpID0gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoO1xuICBpZiAoIWkpIHN1bSA9IDE7XG4gIGVsc2Ugd2hpbGUgKC0taSA+PSAwKSBzdW0gKz0gY2hpbGRyZW5baV0udmFsdWU7XG4gIG5vZGUudmFsdWUgPSBzdW07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoQWZ0ZXIoY291bnQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBub2RlcyA9IFtdO1xuICB0aGlzLmVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuICByZXR1cm4gbm9kZXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgbm9kZSA9IHRoaXMsIGN1cnJlbnQsIG5leHQgPSBbbm9kZV0sIGNoaWxkcmVuLCBpLCBuO1xuICBkbyB7XG4gICAgY3VycmVudCA9IG5leHQucmV2ZXJzZSgpLCBuZXh0ID0gW107XG4gICAgd2hpbGUgKG5vZGUgPSBjdXJyZW50LnBvcCgpKSB7XG4gICAgICBjYWxsYmFjayhub2RlKSwgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgaWYgKGNoaWxkcmVuKSBmb3IgKGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIG5leHQucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChuZXh0Lmxlbmd0aCk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIG5vZGUgPSB0aGlzLCBub2RlcyA9IFtub2RlXSwgbmV4dCA9IFtdLCBjaGlsZHJlbiwgaSwgbjtcbiAgd2hpbGUgKG5vZGUgPSBub2Rlcy5wb3AoKSkge1xuICAgIG5leHQucHVzaChub2RlKSwgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIGlmIChjaGlsZHJlbikgZm9yIChpID0gMCwgbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgbm9kZXMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChub2RlID0gbmV4dC5wb3AoKSkge1xuICAgIGNhbGxiYWNrKG5vZGUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIG5vZGUgPSB0aGlzLCBub2RlcyA9IFtub2RlXSwgY2hpbGRyZW4sIGk7XG4gIHdoaWxlIChub2RlID0gbm9kZXMucG9wKCkpIHtcbiAgICBjYWxsYmFjayhub2RlKSwgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIGlmIChjaGlsZHJlbikgZm9yIChpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIG5vZGVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCBub2RlX2NvdW50IGZyb20gXCIuL2NvdW50LmpzXCI7XG5pbXBvcnQgbm9kZV9lYWNoIGZyb20gXCIuL2VhY2guanNcIjtcbmltcG9ydCBub2RlX2VhY2hCZWZvcmUgZnJvbSBcIi4vZWFjaEJlZm9yZS5qc1wiO1xuaW1wb3J0IG5vZGVfZWFjaEFmdGVyIGZyb20gXCIuL2VhY2hBZnRlci5qc1wiO1xuaW1wb3J0IG5vZGVfc3VtIGZyb20gXCIuL3N1bS5qc1wiO1xuaW1wb3J0IG5vZGVfc29ydCBmcm9tIFwiLi9zb3J0LmpzXCI7XG5pbXBvcnQgbm9kZV9wYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBub2RlX2FuY2VzdG9ycyBmcm9tIFwiLi9hbmNlc3RvcnMuanNcIjtcbmltcG9ydCBub2RlX2Rlc2NlbmRhbnRzIGZyb20gXCIuL2Rlc2NlbmRhbnRzLmpzXCI7XG5pbXBvcnQgbm9kZV9sZWF2ZXMgZnJvbSBcIi4vbGVhdmVzLmpzXCI7XG5pbXBvcnQgbm9kZV9saW5rcyBmcm9tIFwiLi9saW5rcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoaWVyYXJjaHkoZGF0YSwgY2hpbGRyZW4pIHtcbiAgdmFyIHJvb3QgPSBuZXcgTm9kZShkYXRhKSxcbiAgICAgIHZhbHVlZCA9ICtkYXRhLnZhbHVlICYmIChyb290LnZhbHVlID0gZGF0YS52YWx1ZSksXG4gICAgICBub2RlLFxuICAgICAgbm9kZXMgPSBbcm9vdF0sXG4gICAgICBjaGlsZCxcbiAgICAgIGNoaWxkcyxcbiAgICAgIGksXG4gICAgICBuO1xuXG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSBjaGlsZHJlbiA9IGRlZmF1bHRDaGlsZHJlbjtcblxuICB3aGlsZSAobm9kZSA9IG5vZGVzLnBvcCgpKSB7XG4gICAgaWYgKHZhbHVlZCkgbm9kZS52YWx1ZSA9ICtub2RlLmRhdGEudmFsdWU7XG4gICAgaWYgKChjaGlsZHMgPSBjaGlsZHJlbihub2RlLmRhdGEpKSAmJiAobiA9IGNoaWxkcy5sZW5ndGgpKSB7XG4gICAgICBub2RlLmNoaWxkcmVuID0gbmV3IEFycmF5KG4pO1xuICAgICAgZm9yIChpID0gbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIG5vZGVzLnB1c2goY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldID0gbmV3IE5vZGUoY2hpbGRzW2ldKSk7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IG5vZGU7XG4gICAgICAgIGNoaWxkLmRlcHRoID0gbm9kZS5kZXB0aCArIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJvb3QuZWFjaEJlZm9yZShjb21wdXRlSGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gbm9kZV9jb3B5KCkge1xuICByZXR1cm4gaGllcmFyY2h5KHRoaXMpLmVhY2hCZWZvcmUoY29weURhdGEpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4oZCkge1xuICByZXR1cm4gZC5jaGlsZHJlbjtcbn1cblxuZnVuY3Rpb24gY29weURhdGEobm9kZSkge1xuICBub2RlLmRhdGEgPSBub2RlLmRhdGEuZGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVIZWlnaHQobm9kZSkge1xuICB2YXIgaGVpZ2h0ID0gMDtcbiAgZG8gbm9kZS5oZWlnaHQgPSBoZWlnaHQ7XG4gIHdoaWxlICgobm9kZSA9IG5vZGUucGFyZW50KSAmJiAobm9kZS5oZWlnaHQgPCArK2hlaWdodCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTm9kZShkYXRhKSB7XG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMuZGVwdGggPVxuICB0aGlzLmhlaWdodCA9IDA7XG4gIHRoaXMucGFyZW50ID0gbnVsbDtcbn1cblxuTm9kZS5wcm90b3R5cGUgPSBoaWVyYXJjaHkucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogTm9kZSxcbiAgY291bnQ6IG5vZGVfY291bnQsXG4gIGVhY2g6IG5vZGVfZWFjaCxcbiAgZWFjaEFmdGVyOiBub2RlX2VhY2hBZnRlcixcbiAgZWFjaEJlZm9yZTogbm9kZV9lYWNoQmVmb3JlLFxuICBzdW06IG5vZGVfc3VtLFxuICBzb3J0OiBub2RlX3NvcnQsXG4gIHBhdGg6IG5vZGVfcGF0aCxcbiAgYW5jZXN0b3JzOiBub2RlX2FuY2VzdG9ycyxcbiAgZGVzY2VuZGFudHM6IG5vZGVfZGVzY2VuZGFudHMsXG4gIGxlYXZlczogbm9kZV9sZWF2ZXMsXG4gIGxpbmtzOiBub2RlX2xpbmtzLFxuICBjb3B5OiBub2RlX2NvcHlcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIGxlYXZlcyA9IFtdO1xuICB0aGlzLmVhY2hCZWZvcmUoZnVuY3Rpb24obm9kZSkge1xuICAgIGlmICghbm9kZS5jaGlsZHJlbikge1xuICAgICAgbGVhdmVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxlYXZlcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgcm9vdCA9IHRoaXMsIGxpbmtzID0gW107XG4gIHJvb3QuZWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUgIT09IHJvb3QpIHsgLy8gRG9u4oCZdCBpbmNsdWRlIHRoZSByb2904oCZcyBwYXJlbnQsIGlmIGFueS5cbiAgICAgIGxpbmtzLnB1c2goe3NvdXJjZTogbm9kZS5wYXJlbnQsIHRhcmdldDogbm9kZX0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsaW5rcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVuZCkge1xuICB2YXIgc3RhcnQgPSB0aGlzLFxuICAgICAgYW5jZXN0b3IgPSBsZWFzdENvbW1vbkFuY2VzdG9yKHN0YXJ0LCBlbmQpLFxuICAgICAgbm9kZXMgPSBbc3RhcnRdO1xuICB3aGlsZSAoc3RhcnQgIT09IGFuY2VzdG9yKSB7XG4gICAgc3RhcnQgPSBzdGFydC5wYXJlbnQ7XG4gICAgbm9kZXMucHVzaChzdGFydCk7XG4gIH1cbiAgdmFyIGsgPSBub2Rlcy5sZW5ndGg7XG4gIHdoaWxlIChlbmQgIT09IGFuY2VzdG9yKSB7XG4gICAgbm9kZXMuc3BsaWNlKGssIDAsIGVuZCk7XG4gICAgZW5kID0gZW5kLnBhcmVudDtcbiAgfVxuICByZXR1cm4gbm9kZXM7XG59XG5cbmZ1bmN0aW9uIGxlYXN0Q29tbW9uQW5jZXN0b3IoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIGE7XG4gIHZhciBhTm9kZXMgPSBhLmFuY2VzdG9ycygpLFxuICAgICAgYk5vZGVzID0gYi5hbmNlc3RvcnMoKSxcbiAgICAgIGMgPSBudWxsO1xuICBhID0gYU5vZGVzLnBvcCgpO1xuICBiID0gYk5vZGVzLnBvcCgpO1xuICB3aGlsZSAoYSA9PT0gYikge1xuICAgIGMgPSBhO1xuICAgIGEgPSBhTm9kZXMucG9wKCk7XG4gICAgYiA9IGJOb2Rlcy5wb3AoKTtcbiAgfVxuICByZXR1cm4gYztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbXBhcmUpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaEJlZm9yZShmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIG5vZGUuY2hpbGRyZW4uc29ydChjb21wYXJlKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaEFmdGVyKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgc3VtID0gK3ZhbHVlKG5vZGUuZGF0YSkgfHwgMCxcbiAgICAgICAgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLFxuICAgICAgICBpID0gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHdoaWxlICgtLWkgPj0gMCkgc3VtICs9IGNoaWxkcmVuW2ldLnZhbHVlO1xuICAgIG5vZGUudmFsdWUgPSBzdW07XG4gIH0pO1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGNsdXN0ZXJ9IGZyb20gXCIuL2NsdXN0ZXIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBoaWVyYXJjaHl9IGZyb20gXCIuL2hpZXJhcmNoeS9pbmRleC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHBhY2t9IGZyb20gXCIuL3BhY2svaW5kZXguanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBwYWNrU2libGluZ3N9IGZyb20gXCIuL3BhY2svc2libGluZ3MuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBwYWNrRW5jbG9zZX0gZnJvbSBcIi4vcGFjay9lbmNsb3NlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcGFydGl0aW9ufSBmcm9tIFwiLi9wYXJ0aXRpb24uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzdHJhdGlmeX0gZnJvbSBcIi4vc3RyYXRpZnkuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0cmVlfSBmcm9tIFwiLi90cmVlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJlZW1hcH0gZnJvbSBcIi4vdHJlZW1hcC9pbmRleC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyZWVtYXBCaW5hcnl9IGZyb20gXCIuL3RyZWVtYXAvYmluYXJ5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJlZW1hcERpY2V9IGZyb20gXCIuL3RyZWVtYXAvZGljZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyZWVtYXBTbGljZX0gZnJvbSBcIi4vdHJlZW1hcC9zbGljZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyZWVtYXBTbGljZURpY2V9IGZyb20gXCIuL3RyZWVtYXAvc2xpY2VEaWNlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJlZW1hcFNxdWFyaWZ5fSBmcm9tIFwiLi90cmVlbWFwL3NxdWFyaWZ5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJlZW1hcFJlc3F1YXJpZnl9IGZyb20gXCIuL3RyZWVtYXAvcmVzcXVhcmlmeS5qc1wiO1xuIiwiaW1wb3J0IHtzaHVmZmxlLCBzbGljZX0gZnJvbSBcIi4uL2FycmF5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNpcmNsZXMpIHtcbiAgdmFyIGkgPSAwLCBuID0gKGNpcmNsZXMgPSBzaHVmZmxlKHNsaWNlLmNhbGwoY2lyY2xlcykpKS5sZW5ndGgsIEIgPSBbXSwgcCwgZTtcblxuICB3aGlsZSAoaSA8IG4pIHtcbiAgICBwID0gY2lyY2xlc1tpXTtcbiAgICBpZiAoZSAmJiBlbmNsb3Nlc1dlYWsoZSwgcCkpICsraTtcbiAgICBlbHNlIGUgPSBlbmNsb3NlQmFzaXMoQiA9IGV4dGVuZEJhc2lzKEIsIHApKSwgaSA9IDA7XG4gIH1cblxuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kQmFzaXMoQiwgcCkge1xuICB2YXIgaSwgajtcblxuICBpZiAoZW5jbG9zZXNXZWFrQWxsKHAsIEIpKSByZXR1cm4gW3BdO1xuXG4gIC8vIElmIHdlIGdldCBoZXJlIHRoZW4gQiBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGVsZW1lbnQuXG4gIGZvciAoaSA9IDA7IGkgPCBCLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGVuY2xvc2VzTm90KHAsIEJbaV0pXG4gICAgICAgICYmIGVuY2xvc2VzV2Vha0FsbChlbmNsb3NlQmFzaXMyKEJbaV0sIHApLCBCKSkge1xuICAgICAgcmV0dXJuIFtCW2ldLCBwXTtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB3ZSBnZXQgaGVyZSB0aGVuIEIgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBlbGVtZW50cy5cbiAgZm9yIChpID0gMDsgaSA8IEIubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgZm9yIChqID0gaSArIDE7IGogPCBCLmxlbmd0aDsgKytqKSB7XG4gICAgICBpZiAoZW5jbG9zZXNOb3QoZW5jbG9zZUJhc2lzMihCW2ldLCBCW2pdKSwgcClcbiAgICAgICAgICAmJiBlbmNsb3Nlc05vdChlbmNsb3NlQmFzaXMyKEJbaV0sIHApLCBCW2pdKVxuICAgICAgICAgICYmIGVuY2xvc2VzTm90KGVuY2xvc2VCYXNpczIoQltqXSwgcCksIEJbaV0pXG4gICAgICAgICAgJiYgZW5jbG9zZXNXZWFrQWxsKGVuY2xvc2VCYXNpczMoQltpXSwgQltqXSwgcCksIEIpKSB7XG4gICAgICAgIHJldHVybiBbQltpXSwgQltqXSwgcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgd2UgZ2V0IGhlcmUgdGhlbiBzb21ldGhpbmcgaXMgdmVyeSB3cm9uZy5cbiAgdGhyb3cgbmV3IEVycm9yO1xufVxuXG5mdW5jdGlvbiBlbmNsb3Nlc05vdChhLCBiKSB7XG4gIHZhciBkciA9IGEuciAtIGIuciwgZHggPSBiLnggLSBhLngsIGR5ID0gYi55IC0gYS55O1xuICByZXR1cm4gZHIgPCAwIHx8IGRyICogZHIgPCBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cblxuZnVuY3Rpb24gZW5jbG9zZXNXZWFrKGEsIGIpIHtcbiAgdmFyIGRyID0gYS5yIC0gYi5yICsgMWUtNiwgZHggPSBiLnggLSBhLngsIGR5ID0gYi55IC0gYS55O1xuICByZXR1cm4gZHIgPiAwICYmIGRyICogZHIgPiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cblxuZnVuY3Rpb24gZW5jbG9zZXNXZWFrQWxsKGEsIEIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBCLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCFlbmNsb3Nlc1dlYWsoYSwgQltpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVuY2xvc2VCYXNpcyhCKSB7XG4gIHN3aXRjaCAoQi5sZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBlbmNsb3NlQmFzaXMxKEJbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGVuY2xvc2VCYXNpczIoQlswXSwgQlsxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZW5jbG9zZUJhc2lzMyhCWzBdLCBCWzFdLCBCWzJdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNsb3NlQmFzaXMxKGEpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiBhLngsXG4gICAgeTogYS55LFxuICAgIHI6IGEuclxuICB9O1xufVxuXG5mdW5jdGlvbiBlbmNsb3NlQmFzaXMyKGEsIGIpIHtcbiAgdmFyIHgxID0gYS54LCB5MSA9IGEueSwgcjEgPSBhLnIsXG4gICAgICB4MiA9IGIueCwgeTIgPSBiLnksIHIyID0gYi5yLFxuICAgICAgeDIxID0geDIgLSB4MSwgeTIxID0geTIgLSB5MSwgcjIxID0gcjIgLSByMSxcbiAgICAgIGwgPSBNYXRoLnNxcnQoeDIxICogeDIxICsgeTIxICogeTIxKTtcbiAgcmV0dXJuIHtcbiAgICB4OiAoeDEgKyB4MiArIHgyMSAvIGwgKiByMjEpIC8gMixcbiAgICB5OiAoeTEgKyB5MiArIHkyMSAvIGwgKiByMjEpIC8gMixcbiAgICByOiAobCArIHIxICsgcjIpIC8gMlxuICB9O1xufVxuXG5mdW5jdGlvbiBlbmNsb3NlQmFzaXMzKGEsIGIsIGMpIHtcbiAgdmFyIHgxID0gYS54LCB5MSA9IGEueSwgcjEgPSBhLnIsXG4gICAgICB4MiA9IGIueCwgeTIgPSBiLnksIHIyID0gYi5yLFxuICAgICAgeDMgPSBjLngsIHkzID0gYy55LCByMyA9IGMucixcbiAgICAgIGEyID0geDEgLSB4MixcbiAgICAgIGEzID0geDEgLSB4MyxcbiAgICAgIGIyID0geTEgLSB5MixcbiAgICAgIGIzID0geTEgLSB5MyxcbiAgICAgIGMyID0gcjIgLSByMSxcbiAgICAgIGMzID0gcjMgLSByMSxcbiAgICAgIGQxID0geDEgKiB4MSArIHkxICogeTEgLSByMSAqIHIxLFxuICAgICAgZDIgPSBkMSAtIHgyICogeDIgLSB5MiAqIHkyICsgcjIgKiByMixcbiAgICAgIGQzID0gZDEgLSB4MyAqIHgzIC0geTMgKiB5MyArIHIzICogcjMsXG4gICAgICBhYiA9IGEzICogYjIgLSBhMiAqIGIzLFxuICAgICAgeGEgPSAoYjIgKiBkMyAtIGIzICogZDIpIC8gKGFiICogMikgLSB4MSxcbiAgICAgIHhiID0gKGIzICogYzIgLSBiMiAqIGMzKSAvIGFiLFxuICAgICAgeWEgPSAoYTMgKiBkMiAtIGEyICogZDMpIC8gKGFiICogMikgLSB5MSxcbiAgICAgIHliID0gKGEyICogYzMgLSBhMyAqIGMyKSAvIGFiLFxuICAgICAgQSA9IHhiICogeGIgKyB5YiAqIHliIC0gMSxcbiAgICAgIEIgPSAyICogKHIxICsgeGEgKiB4YiArIHlhICogeWIpLFxuICAgICAgQyA9IHhhICogeGEgKyB5YSAqIHlhIC0gcjEgKiByMSxcbiAgICAgIHIgPSAtKEEgPyAoQiArIE1hdGguc3FydChCICogQiAtIDQgKiBBICogQykpIC8gKDIgKiBBKSA6IEMgLyBCKTtcbiAgcmV0dXJuIHtcbiAgICB4OiB4MSArIHhhICsgeGIgKiByLFxuICAgIHk6IHkxICsgeWEgKyB5YiAqIHIsXG4gICAgcjogclxuICB9O1xufVxuIiwiaW1wb3J0IHtwYWNrRW5jbG9zZX0gZnJvbSBcIi4vc2libGluZ3MuanNcIjtcbmltcG9ydCB7b3B0aW9uYWx9IGZyb20gXCIuLi9hY2Nlc3NvcnMuanNcIjtcbmltcG9ydCBjb25zdGFudCwge2NvbnN0YW50WmVyb30gZnJvbSBcIi4uL2NvbnN0YW50LmpzXCI7XG5cbmZ1bmN0aW9uIGRlZmF1bHRSYWRpdXMoZCkge1xuICByZXR1cm4gTWF0aC5zcXJ0KGQudmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIHJhZGl1cyA9IG51bGwsXG4gICAgICBkeCA9IDEsXG4gICAgICBkeSA9IDEsXG4gICAgICBwYWRkaW5nID0gY29uc3RhbnRaZXJvO1xuXG4gIGZ1bmN0aW9uIHBhY2socm9vdCkge1xuICAgIHJvb3QueCA9IGR4IC8gMiwgcm9vdC55ID0gZHkgLyAyO1xuICAgIGlmIChyYWRpdXMpIHtcbiAgICAgIHJvb3QuZWFjaEJlZm9yZShyYWRpdXNMZWFmKHJhZGl1cykpXG4gICAgICAgICAgLmVhY2hBZnRlcihwYWNrQ2hpbGRyZW4ocGFkZGluZywgMC41KSlcbiAgICAgICAgICAuZWFjaEJlZm9yZSh0cmFuc2xhdGVDaGlsZCgxKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QuZWFjaEJlZm9yZShyYWRpdXNMZWFmKGRlZmF1bHRSYWRpdXMpKVxuICAgICAgICAgIC5lYWNoQWZ0ZXIocGFja0NoaWxkcmVuKGNvbnN0YW50WmVybywgMSkpXG4gICAgICAgICAgLmVhY2hBZnRlcihwYWNrQ2hpbGRyZW4ocGFkZGluZywgcm9vdC5yIC8gTWF0aC5taW4oZHgsIGR5KSkpXG4gICAgICAgICAgLmVhY2hCZWZvcmUodHJhbnNsYXRlQ2hpbGQoTWF0aC5taW4oZHgsIGR5KSAvICgyICogcm9vdC5yKSkpO1xuICAgIH1cbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuXG4gIHBhY2sucmFkaXVzID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhZGl1cyA9IG9wdGlvbmFsKHgpLCBwYWNrKSA6IHJhZGl1cztcbiAgfTtcblxuICBwYWNrLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZHggPSAreFswXSwgZHkgPSAreFsxXSwgcGFjaykgOiBbZHgsIGR5XTtcbiAgfTtcblxuICBwYWNrLnBhZGRpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZyA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogY29uc3RhbnQoK3gpLCBwYWNrKSA6IHBhZGRpbmc7XG4gIH07XG5cbiAgcmV0dXJuIHBhY2s7XG59XG5cbmZ1bmN0aW9uIHJhZGl1c0xlYWYocmFkaXVzKSB7XG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKCFub2RlLmNoaWxkcmVuKSB7XG4gICAgICBub2RlLnIgPSBNYXRoLm1heCgwLCArcmFkaXVzKG5vZGUpIHx8IDApO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFja0NoaWxkcmVuKHBhZGRpbmcsIGspIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAoY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuKSB7XG4gICAgICB2YXIgY2hpbGRyZW4sXG4gICAgICAgICAgaSxcbiAgICAgICAgICBuID0gY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICAgIHIgPSBwYWRkaW5nKG5vZGUpICogayB8fCAwLFxuICAgICAgICAgIGU7XG5cbiAgICAgIGlmIChyKSBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjaGlsZHJlbltpXS5yICs9IHI7XG4gICAgICBlID0gcGFja0VuY2xvc2UoY2hpbGRyZW4pO1xuICAgICAgaWYgKHIpIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIGNoaWxkcmVuW2ldLnIgLT0gcjtcbiAgICAgIG5vZGUuciA9IGUgKyByO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlQ2hpbGQoaykge1xuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICBub2RlLnIgKj0gaztcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBub2RlLnggPSBwYXJlbnQueCArIGsgKiBub2RlLng7XG4gICAgICBub2RlLnkgPSBwYXJlbnQueSArIGsgKiBub2RlLnk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IGVuY2xvc2UgZnJvbSBcIi4vZW5jbG9zZS5qc1wiO1xuXG5mdW5jdGlvbiBwbGFjZShiLCBhLCBjKSB7XG4gIHZhciBkeCA9IGIueCAtIGEueCwgeCwgYTIsXG4gICAgICBkeSA9IGIueSAtIGEueSwgeSwgYjIsXG4gICAgICBkMiA9IGR4ICogZHggKyBkeSAqIGR5O1xuICBpZiAoZDIpIHtcbiAgICBhMiA9IGEuciArIGMuciwgYTIgKj0gYTI7XG4gICAgYjIgPSBiLnIgKyBjLnIsIGIyICo9IGIyO1xuICAgIGlmIChhMiA+IGIyKSB7XG4gICAgICB4ID0gKGQyICsgYjIgLSBhMikgLyAoMiAqIGQyKTtcbiAgICAgIHkgPSBNYXRoLnNxcnQoTWF0aC5tYXgoMCwgYjIgLyBkMiAtIHggKiB4KSk7XG4gICAgICBjLnggPSBiLnggLSB4ICogZHggLSB5ICogZHk7XG4gICAgICBjLnkgPSBiLnkgLSB4ICogZHkgKyB5ICogZHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSAoZDIgKyBhMiAtIGIyKSAvICgyICogZDIpO1xuICAgICAgeSA9IE1hdGguc3FydChNYXRoLm1heCgwLCBhMiAvIGQyIC0geCAqIHgpKTtcbiAgICAgIGMueCA9IGEueCArIHggKiBkeCAtIHkgKiBkeTtcbiAgICAgIGMueSA9IGEueSArIHggKiBkeSArIHkgKiBkeDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYy54ID0gYS54ICsgYy5yO1xuICAgIGMueSA9IGEueTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGEsIGIpIHtcbiAgdmFyIGRyID0gYS5yICsgYi5yIC0gMWUtNiwgZHggPSBiLnggLSBhLngsIGR5ID0gYi55IC0gYS55O1xuICByZXR1cm4gZHIgPiAwICYmIGRyICogZHIgPiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cblxuZnVuY3Rpb24gc2NvcmUobm9kZSkge1xuICB2YXIgYSA9IG5vZGUuXyxcbiAgICAgIGIgPSBub2RlLm5leHQuXyxcbiAgICAgIGFiID0gYS5yICsgYi5yLFxuICAgICAgZHggPSAoYS54ICogYi5yICsgYi54ICogYS5yKSAvIGFiLFxuICAgICAgZHkgPSAoYS55ICogYi5yICsgYi55ICogYS5yKSAvIGFiO1xuICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG5cbmZ1bmN0aW9uIE5vZGUoY2lyY2xlKSB7XG4gIHRoaXMuXyA9IGNpcmNsZTtcbiAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgdGhpcy5wcmV2aW91cyA9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWNrRW5jbG9zZShjaXJjbGVzKSB7XG4gIGlmICghKG4gPSBjaXJjbGVzLmxlbmd0aCkpIHJldHVybiAwO1xuXG4gIHZhciBhLCBiLCBjLCBuLCBhYSwgY2EsIGksIGosIGssIHNqLCBzaztcblxuICAvLyBQbGFjZSB0aGUgZmlyc3QgY2lyY2xlLlxuICBhID0gY2lyY2xlc1swXSwgYS54ID0gMCwgYS55ID0gMDtcbiAgaWYgKCEobiA+IDEpKSByZXR1cm4gYS5yO1xuXG4gIC8vIFBsYWNlIHRoZSBzZWNvbmQgY2lyY2xlLlxuICBiID0gY2lyY2xlc1sxXSwgYS54ID0gLWIuciwgYi54ID0gYS5yLCBiLnkgPSAwO1xuICBpZiAoIShuID4gMikpIHJldHVybiBhLnIgKyBiLnI7XG5cbiAgLy8gUGxhY2UgdGhlIHRoaXJkIGNpcmNsZS5cbiAgcGxhY2UoYiwgYSwgYyA9IGNpcmNsZXNbMl0pO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIGZyb250LWNoYWluIHVzaW5nIHRoZSBmaXJzdCB0aHJlZSBjaXJjbGVzIGEsIGIgYW5kIGMuXG4gIGEgPSBuZXcgTm9kZShhKSwgYiA9IG5ldyBOb2RlKGIpLCBjID0gbmV3IE5vZGUoYyk7XG4gIGEubmV4dCA9IGMucHJldmlvdXMgPSBiO1xuICBiLm5leHQgPSBhLnByZXZpb3VzID0gYztcbiAgYy5uZXh0ID0gYi5wcmV2aW91cyA9IGE7XG5cbiAgLy8gQXR0ZW1wdCB0byBwbGFjZSBlYWNoIHJlbWFpbmluZyBjaXJjbGXigKZcbiAgcGFjazogZm9yIChpID0gMzsgaSA8IG47ICsraSkge1xuICAgIHBsYWNlKGEuXywgYi5fLCBjID0gY2lyY2xlc1tpXSksIGMgPSBuZXcgTm9kZShjKTtcblxuICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgaW50ZXJzZWN0aW5nIGNpcmNsZSBvbiB0aGUgZnJvbnQtY2hhaW4sIGlmIGFueS5cbiAgICAvLyDigJxDbG9zZW5lc3PigJ0gaXMgZGV0ZXJtaW5lZCBieSBsaW5lYXIgZGlzdGFuY2UgYWxvbmcgdGhlIGZyb250LWNoYWluLlxuICAgIC8vIOKAnEFoZWFk4oCdIG9yIOKAnGJlaGluZOKAnSBpcyBsaWtld2lzZSBkZXRlcm1pbmVkIGJ5IGxpbmVhciBkaXN0YW5jZS5cbiAgICBqID0gYi5uZXh0LCBrID0gYS5wcmV2aW91cywgc2ogPSBiLl8uciwgc2sgPSBhLl8ucjtcbiAgICBkbyB7XG4gICAgICBpZiAoc2ogPD0gc2spIHtcbiAgICAgICAgaWYgKGludGVyc2VjdHMoai5fLCBjLl8pKSB7XG4gICAgICAgICAgYiA9IGosIGEubmV4dCA9IGIsIGIucHJldmlvdXMgPSBhLCAtLWk7XG4gICAgICAgICAgY29udGludWUgcGFjaztcbiAgICAgICAgfVxuICAgICAgICBzaiArPSBqLl8uciwgaiA9IGoubmV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpbnRlcnNlY3RzKGsuXywgYy5fKSkge1xuICAgICAgICAgIGEgPSBrLCBhLm5leHQgPSBiLCBiLnByZXZpb3VzID0gYSwgLS1pO1xuICAgICAgICAgIGNvbnRpbnVlIHBhY2s7XG4gICAgICAgIH1cbiAgICAgICAgc2sgKz0gay5fLnIsIGsgPSBrLnByZXZpb3VzO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKGogIT09IGsubmV4dCk7XG5cbiAgICAvLyBTdWNjZXNzISBJbnNlcnQgdGhlIG5ldyBjaXJjbGUgYyBiZXR3ZWVuIGEgYW5kIGIuXG4gICAgYy5wcmV2aW91cyA9IGEsIGMubmV4dCA9IGIsIGEubmV4dCA9IGIucHJldmlvdXMgPSBiID0gYztcblxuICAgIC8vIENvbXB1dGUgdGhlIG5ldyBjbG9zZXN0IGNpcmNsZSBwYWlyIHRvIHRoZSBjZW50cm9pZC5cbiAgICBhYSA9IHNjb3JlKGEpO1xuICAgIHdoaWxlICgoYyA9IGMubmV4dCkgIT09IGIpIHtcbiAgICAgIGlmICgoY2EgPSBzY29yZShjKSkgPCBhYSkge1xuICAgICAgICBhID0gYywgYWEgPSBjYTtcbiAgICAgIH1cbiAgICB9XG4gICAgYiA9IGEubmV4dDtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGVuY2xvc2luZyBjaXJjbGUgb2YgdGhlIGZyb250IGNoYWluLlxuICBhID0gW2IuX10sIGMgPSBiOyB3aGlsZSAoKGMgPSBjLm5leHQpICE9PSBiKSBhLnB1c2goYy5fKTsgYyA9IGVuY2xvc2UoYSk7XG5cbiAgLy8gVHJhbnNsYXRlIHRoZSBjaXJjbGVzIHRvIHB1dCB0aGUgZW5jbG9zaW5nIGNpcmNsZSBhcm91bmQgdGhlIG9yaWdpbi5cbiAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgYSA9IGNpcmNsZXNbaV0sIGEueCAtPSBjLngsIGEueSAtPSBjLnk7XG5cbiAgcmV0dXJuIGMucjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2lyY2xlcykge1xuICBwYWNrRW5jbG9zZShjaXJjbGVzKTtcbiAgcmV0dXJuIGNpcmNsZXM7XG59XG4iLCJpbXBvcnQgcm91bmROb2RlIGZyb20gXCIuL3RyZWVtYXAvcm91bmQuanNcIjtcbmltcG9ydCB0cmVlbWFwRGljZSBmcm9tIFwiLi90cmVlbWFwL2RpY2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBkeCA9IDEsXG4gICAgICBkeSA9IDEsXG4gICAgICBwYWRkaW5nID0gMCxcbiAgICAgIHJvdW5kID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gcGFydGl0aW9uKHJvb3QpIHtcbiAgICB2YXIgbiA9IHJvb3QuaGVpZ2h0ICsgMTtcbiAgICByb290LngwID1cbiAgICByb290LnkwID0gcGFkZGluZztcbiAgICByb290LngxID0gZHg7XG4gICAgcm9vdC55MSA9IGR5IC8gbjtcbiAgICByb290LmVhY2hCZWZvcmUocG9zaXRpb25Ob2RlKGR5LCBuKSk7XG4gICAgaWYgKHJvdW5kKSByb290LmVhY2hCZWZvcmUocm91bmROb2RlKTtcbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc2l0aW9uTm9kZShkeSwgbikge1xuICAgIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICB0cmVlbWFwRGljZShub2RlLCBub2RlLngwLCBkeSAqIChub2RlLmRlcHRoICsgMSkgLyBuLCBub2RlLngxLCBkeSAqIChub2RlLmRlcHRoICsgMikgLyBuKTtcbiAgICAgIH1cbiAgICAgIHZhciB4MCA9IG5vZGUueDAsXG4gICAgICAgICAgeTAgPSBub2RlLnkwLFxuICAgICAgICAgIHgxID0gbm9kZS54MSAtIHBhZGRpbmcsXG4gICAgICAgICAgeTEgPSBub2RlLnkxIC0gcGFkZGluZztcbiAgICAgIGlmICh4MSA8IHgwKSB4MCA9IHgxID0gKHgwICsgeDEpIC8gMjtcbiAgICAgIGlmICh5MSA8IHkwKSB5MCA9IHkxID0gKHkwICsgeTEpIC8gMjtcbiAgICAgIG5vZGUueDAgPSB4MDtcbiAgICAgIG5vZGUueTAgPSB5MDtcbiAgICAgIG5vZGUueDEgPSB4MTtcbiAgICAgIG5vZGUueTEgPSB5MTtcbiAgICB9O1xuICB9XG5cbiAgcGFydGl0aW9uLnJvdW5kID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJvdW5kID0gISF4LCBwYXJ0aXRpb24pIDogcm91bmQ7XG4gIH07XG5cbiAgcGFydGl0aW9uLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZHggPSAreFswXSwgZHkgPSAreFsxXSwgcGFydGl0aW9uKSA6IFtkeCwgZHldO1xuICB9O1xuXG4gIHBhcnRpdGlvbi5wYWRkaW5nID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHBhZGRpbmcgPSAreCwgcGFydGl0aW9uKSA6IHBhZGRpbmc7XG4gIH07XG5cbiAgcmV0dXJuIHBhcnRpdGlvbjtcbn1cbiIsImltcG9ydCB7cmVxdWlyZWR9IGZyb20gXCIuL2FjY2Vzc29ycy5qc1wiO1xuaW1wb3J0IHtOb2RlLCBjb21wdXRlSGVpZ2h0fSBmcm9tIFwiLi9oaWVyYXJjaHkvaW5kZXguanNcIjtcblxudmFyIGtleVByZWZpeCA9IFwiJFwiLCAvLyBQcm90ZWN0IGFnYWluc3Qga2V5cyBsaWtlIOKAnF9fcHJvdG9fX+KAnS5cbiAgICBwcmVyb290ID0ge2RlcHRoOiAtMX0sXG4gICAgYW1iaWd1b3VzID0ge307XG5cbmZ1bmN0aW9uIGRlZmF1bHRJZChkKSB7XG4gIHJldHVybiBkLmlkO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0UGFyZW50SWQoZCkge1xuICByZXR1cm4gZC5wYXJlbnRJZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBpZCA9IGRlZmF1bHRJZCxcbiAgICAgIHBhcmVudElkID0gZGVmYXVsdFBhcmVudElkO1xuXG4gIGZ1bmN0aW9uIHN0cmF0aWZ5KGRhdGEpIHtcbiAgICB2YXIgZCxcbiAgICAgICAgaSxcbiAgICAgICAgbiA9IGRhdGEubGVuZ3RoLFxuICAgICAgICByb290LFxuICAgICAgICBwYXJlbnQsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIG5vZGVzID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBub2RlSWQsXG4gICAgICAgIG5vZGVLZXksXG4gICAgICAgIG5vZGVCeUtleSA9IHt9O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgZCA9IGRhdGFbaV0sIG5vZGUgPSBub2Rlc1tpXSA9IG5ldyBOb2RlKGQpO1xuICAgICAgaWYgKChub2RlSWQgPSBpZChkLCBpLCBkYXRhKSkgIT0gbnVsbCAmJiAobm9kZUlkICs9IFwiXCIpKSB7XG4gICAgICAgIG5vZGVLZXkgPSBrZXlQcmVmaXggKyAobm9kZS5pZCA9IG5vZGVJZCk7XG4gICAgICAgIG5vZGVCeUtleVtub2RlS2V5XSA9IG5vZGVLZXkgaW4gbm9kZUJ5S2V5ID8gYW1iaWd1b3VzIDogbm9kZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBub2RlID0gbm9kZXNbaV0sIG5vZGVJZCA9IHBhcmVudElkKGRhdGFbaV0sIGksIGRhdGEpO1xuICAgICAgaWYgKG5vZGVJZCA9PSBudWxsIHx8ICEobm9kZUlkICs9IFwiXCIpKSB7XG4gICAgICAgIGlmIChyb290KSB0aHJvdyBuZXcgRXJyb3IoXCJtdWx0aXBsZSByb290c1wiKTtcbiAgICAgICAgcm9vdCA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQgPSBub2RlQnlLZXlba2V5UHJlZml4ICsgbm9kZUlkXTtcbiAgICAgICAgaWYgKCFwYXJlbnQpIHRocm93IG5ldyBFcnJvcihcIm1pc3Npbmc6IFwiICsgbm9kZUlkKTtcbiAgICAgICAgaWYgKHBhcmVudCA9PT0gYW1iaWd1b3VzKSB0aHJvdyBuZXcgRXJyb3IoXCJhbWJpZ3VvdXM6IFwiICsgbm9kZUlkKTtcbiAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbikgcGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgICAgIGVsc2UgcGFyZW50LmNoaWxkcmVuID0gW25vZGVdO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJvb3QpIHRocm93IG5ldyBFcnJvcihcIm5vIHJvb3RcIik7XG4gICAgcm9vdC5wYXJlbnQgPSBwcmVyb290O1xuICAgIHJvb3QuZWFjaEJlZm9yZShmdW5jdGlvbihub2RlKSB7IG5vZGUuZGVwdGggPSBub2RlLnBhcmVudC5kZXB0aCArIDE7IC0tbjsgfSkuZWFjaEJlZm9yZShjb21wdXRlSGVpZ2h0KTtcbiAgICByb290LnBhcmVudCA9IG51bGw7XG4gICAgaWYgKG4gPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJjeWNsZVwiKTtcblxuICAgIHJldHVybiByb290O1xuICB9XG5cbiAgc3RyYXRpZnkuaWQgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoaWQgPSByZXF1aXJlZCh4KSwgc3RyYXRpZnkpIDogaWQ7XG4gIH07XG5cbiAgc3RyYXRpZnkucGFyZW50SWQgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFyZW50SWQgPSByZXF1aXJlZCh4KSwgc3RyYXRpZnkpIDogcGFyZW50SWQ7XG4gIH07XG5cbiAgcmV0dXJuIHN0cmF0aWZ5O1xufVxuIiwiaW1wb3J0IHtOb2RlfSBmcm9tIFwiLi9oaWVyYXJjaHkvaW5kZXguanNcIjtcblxuZnVuY3Rpb24gZGVmYXVsdFNlcGFyYXRpb24oYSwgYikge1xuICByZXR1cm4gYS5wYXJlbnQgPT09IGIucGFyZW50ID8gMSA6IDI7XG59XG5cbi8vIGZ1bmN0aW9uIHJhZGlhbFNlcGFyYXRpb24oYSwgYikge1xuLy8gICByZXR1cm4gKGEucGFyZW50ID09PSBiLnBhcmVudCA/IDEgOiAyKSAvIGEuZGVwdGg7XG4vLyB9XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byB0cmF2ZXJzZSB0aGUgbGVmdCBjb250b3VyIG9mIGEgc3VidHJlZSAob3Jcbi8vIHN1YmZvcmVzdCkuIEl0IHJldHVybnMgdGhlIHN1Y2Nlc3NvciBvZiB2IG9uIHRoaXMgY29udG91ci4gVGhpcyBzdWNjZXNzb3IgaXNcbi8vIGVpdGhlciBnaXZlbiBieSB0aGUgbGVmdG1vc3QgY2hpbGQgb2YgdiBvciBieSB0aGUgdGhyZWFkIG9mIHYuIFRoZSBmdW5jdGlvblxuLy8gcmV0dXJucyBudWxsIGlmIGFuZCBvbmx5IGlmIHYgaXMgb24gdGhlIGhpZ2hlc3QgbGV2ZWwgb2YgaXRzIHN1YnRyZWUuXG5mdW5jdGlvbiBuZXh0TGVmdCh2KSB7XG4gIHZhciBjaGlsZHJlbiA9IHYuY2hpbGRyZW47XG4gIHJldHVybiBjaGlsZHJlbiA/IGNoaWxkcmVuWzBdIDogdi50O1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdvcmtzIGFuYWxvZ291c2x5IHRvIG5leHRMZWZ0LlxuZnVuY3Rpb24gbmV4dFJpZ2h0KHYpIHtcbiAgdmFyIGNoaWxkcmVuID0gdi5jaGlsZHJlbjtcbiAgcmV0dXJuIGNoaWxkcmVuID8gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0gOiB2LnQ7XG59XG5cbi8vIFNoaWZ0cyB0aGUgY3VycmVudCBzdWJ0cmVlIHJvb3RlZCBhdCB3Ky4gVGhpcyBpcyBkb25lIGJ5IGluY3JlYXNpbmdcbi8vIHByZWxpbSh3KykgYW5kIG1vZCh3KykgYnkgc2hpZnQuXG5mdW5jdGlvbiBtb3ZlU3VidHJlZSh3bSwgd3AsIHNoaWZ0KSB7XG4gIHZhciBjaGFuZ2UgPSBzaGlmdCAvICh3cC5pIC0gd20uaSk7XG4gIHdwLmMgLT0gY2hhbmdlO1xuICB3cC5zICs9IHNoaWZ0O1xuICB3bS5jICs9IGNoYW5nZTtcbiAgd3AueiArPSBzaGlmdDtcbiAgd3AubSArPSBzaGlmdDtcbn1cblxuLy8gQWxsIG90aGVyIHNoaWZ0cywgYXBwbGllZCB0byB0aGUgc21hbGxlciBzdWJ0cmVlcyBiZXR3ZWVuIHctIGFuZCB3KywgYXJlXG4vLyBwZXJmb3JtZWQgYnkgdGhpcyBmdW5jdGlvbi4gVG8gcHJlcGFyZSB0aGUgc2hpZnRzLCB3ZSBoYXZlIHRvIGFkanVzdFxuLy8gY2hhbmdlKHcrKSwgc2hpZnQodyspLCBhbmQgY2hhbmdlKHctKS5cbmZ1bmN0aW9uIGV4ZWN1dGVTaGlmdHModikge1xuICB2YXIgc2hpZnQgPSAwLFxuICAgICAgY2hhbmdlID0gMCxcbiAgICAgIGNoaWxkcmVuID0gdi5jaGlsZHJlbixcbiAgICAgIGkgPSBjaGlsZHJlbi5sZW5ndGgsXG4gICAgICB3O1xuICB3aGlsZSAoLS1pID49IDApIHtcbiAgICB3ID0gY2hpbGRyZW5baV07XG4gICAgdy56ICs9IHNoaWZ0O1xuICAgIHcubSArPSBzaGlmdDtcbiAgICBzaGlmdCArPSB3LnMgKyAoY2hhbmdlICs9IHcuYyk7XG4gIH1cbn1cblxuLy8gSWYgdmkt4oCZcyBhbmNlc3RvciBpcyBhIHNpYmxpbmcgb2YgdiwgcmV0dXJucyB2aS3igJlzIGFuY2VzdG9yLiBPdGhlcndpc2UsXG4vLyByZXR1cm5zIHRoZSBzcGVjaWZpZWQgKGRlZmF1bHQpIGFuY2VzdG9yLlxuZnVuY3Rpb24gbmV4dEFuY2VzdG9yKHZpbSwgdiwgYW5jZXN0b3IpIHtcbiAgcmV0dXJuIHZpbS5hLnBhcmVudCA9PT0gdi5wYXJlbnQgPyB2aW0uYSA6IGFuY2VzdG9yO1xufVxuXG5mdW5jdGlvbiBUcmVlTm9kZShub2RlLCBpKSB7XG4gIHRoaXMuXyA9IG5vZGU7XG4gIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gIHRoaXMuQSA9IG51bGw7IC8vIGRlZmF1bHQgYW5jZXN0b3JcbiAgdGhpcy5hID0gdGhpczsgLy8gYW5jZXN0b3JcbiAgdGhpcy56ID0gMDsgLy8gcHJlbGltXG4gIHRoaXMubSA9IDA7IC8vIG1vZFxuICB0aGlzLmMgPSAwOyAvLyBjaGFuZ2VcbiAgdGhpcy5zID0gMDsgLy8gc2hpZnRcbiAgdGhpcy50ID0gbnVsbDsgLy8gdGhyZWFkXG4gIHRoaXMuaSA9IGk7IC8vIG51bWJlclxufVxuXG5UcmVlTm9kZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGUucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gdHJlZVJvb3Qocm9vdCkge1xuICB2YXIgdHJlZSA9IG5ldyBUcmVlTm9kZShyb290LCAwKSxcbiAgICAgIG5vZGUsXG4gICAgICBub2RlcyA9IFt0cmVlXSxcbiAgICAgIGNoaWxkLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBpLFxuICAgICAgbjtcblxuICB3aGlsZSAobm9kZSA9IG5vZGVzLnBvcCgpKSB7XG4gICAgaWYgKGNoaWxkcmVuID0gbm9kZS5fLmNoaWxkcmVuKSB7XG4gICAgICBub2RlLmNoaWxkcmVuID0gbmV3IEFycmF5KG4gPSBjaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgZm9yIChpID0gbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIG5vZGVzLnB1c2goY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldID0gbmV3IFRyZWVOb2RlKGNoaWxkcmVuW2ldLCBpKSk7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgKHRyZWUucGFyZW50ID0gbmV3IFRyZWVOb2RlKG51bGwsIDApKS5jaGlsZHJlbiA9IFt0cmVlXTtcbiAgcmV0dXJuIHRyZWU7XG59XG5cbi8vIE5vZGUtbGluayB0cmVlIGRpYWdyYW0gdXNpbmcgdGhlIFJlaW5nb2xkLVRpbGZvcmQgXCJ0aWR5XCIgYWxnb3JpdGhtXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIHNlcGFyYXRpb24gPSBkZWZhdWx0U2VwYXJhdGlvbixcbiAgICAgIGR4ID0gMSxcbiAgICAgIGR5ID0gMSxcbiAgICAgIG5vZGVTaXplID0gbnVsbDtcblxuICBmdW5jdGlvbiB0cmVlKHJvb3QpIHtcbiAgICB2YXIgdCA9IHRyZWVSb290KHJvb3QpO1xuXG4gICAgLy8gQ29tcHV0ZSB0aGUgbGF5b3V0IHVzaW5nIEJ1Y2hoZWltIGV0IGFsLuKAmXMgYWxnb3JpdGhtLlxuICAgIHQuZWFjaEFmdGVyKGZpcnN0V2FsayksIHQucGFyZW50Lm0gPSAtdC56O1xuICAgIHQuZWFjaEJlZm9yZShzZWNvbmRXYWxrKTtcblxuICAgIC8vIElmIGEgZml4ZWQgbm9kZSBzaXplIGlzIHNwZWNpZmllZCwgc2NhbGUgeCBhbmQgeS5cbiAgICBpZiAobm9kZVNpemUpIHJvb3QuZWFjaEJlZm9yZShzaXplTm9kZSk7XG5cbiAgICAvLyBJZiBhIGZpeGVkIHRyZWUgc2l6ZSBpcyBzcGVjaWZpZWQsIHNjYWxlIHggYW5kIHkgYmFzZWQgb24gdGhlIGV4dGVudC5cbiAgICAvLyBDb21wdXRlIHRoZSBsZWZ0LW1vc3QsIHJpZ2h0LW1vc3QsIGFuZCBkZXB0aC1tb3N0IG5vZGVzIGZvciBleHRlbnRzLlxuICAgIGVsc2Uge1xuICAgICAgdmFyIGxlZnQgPSByb290LFxuICAgICAgICAgIHJpZ2h0ID0gcm9vdCxcbiAgICAgICAgICBib3R0b20gPSByb290O1xuICAgICAgcm9vdC5lYWNoQmVmb3JlKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUueCA8IGxlZnQueCkgbGVmdCA9IG5vZGU7XG4gICAgICAgIGlmIChub2RlLnggPiByaWdodC54KSByaWdodCA9IG5vZGU7XG4gICAgICAgIGlmIChub2RlLmRlcHRoID4gYm90dG9tLmRlcHRoKSBib3R0b20gPSBub2RlO1xuICAgICAgfSk7XG4gICAgICB2YXIgcyA9IGxlZnQgPT09IHJpZ2h0ID8gMSA6IHNlcGFyYXRpb24obGVmdCwgcmlnaHQpIC8gMixcbiAgICAgICAgICB0eCA9IHMgLSBsZWZ0LngsXG4gICAgICAgICAga3ggPSBkeCAvIChyaWdodC54ICsgcyArIHR4KSxcbiAgICAgICAgICBreSA9IGR5IC8gKGJvdHRvbS5kZXB0aCB8fCAxKTtcbiAgICAgIHJvb3QuZWFjaEJlZm9yZShmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUueCA9IChub2RlLnggKyB0eCkgKiBreDtcbiAgICAgICAgbm9kZS55ID0gbm9kZS5kZXB0aCAqIGt5O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICAvLyBDb21wdXRlcyBhIHByZWxpbWluYXJ5IHgtY29vcmRpbmF0ZSBmb3Igdi4gQmVmb3JlIHRoYXQsIEZJUlNUIFdBTEsgaXNcbiAgLy8gYXBwbGllZCByZWN1cnNpdmVseSB0byB0aGUgY2hpbGRyZW4gb2YgdiwgYXMgd2VsbCBhcyB0aGUgZnVuY3Rpb25cbiAgLy8gQVBQT1JUSU9OLiBBZnRlciBzcGFjaW5nIG91dCB0aGUgY2hpbGRyZW4gYnkgY2FsbGluZyBFWEVDVVRFIFNISUZUUywgdGhlXG4gIC8vIG5vZGUgdiBpcyBwbGFjZWQgdG8gdGhlIG1pZHBvaW50IG9mIGl0cyBvdXRlcm1vc3QgY2hpbGRyZW4uXG4gIGZ1bmN0aW9uIGZpcnN0V2Fsayh2KSB7XG4gICAgdmFyIGNoaWxkcmVuID0gdi5jaGlsZHJlbixcbiAgICAgICAgc2libGluZ3MgPSB2LnBhcmVudC5jaGlsZHJlbixcbiAgICAgICAgdyA9IHYuaSA/IHNpYmxpbmdzW3YuaSAtIDFdIDogbnVsbDtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgIGV4ZWN1dGVTaGlmdHModik7XG4gICAgICB2YXIgbWlkcG9pbnQgPSAoY2hpbGRyZW5bMF0ueiArIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdLnopIC8gMjtcbiAgICAgIGlmICh3KSB7XG4gICAgICAgIHYueiA9IHcueiArIHNlcGFyYXRpb24odi5fLCB3Ll8pO1xuICAgICAgICB2Lm0gPSB2LnogLSBtaWRwb2ludDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYueiA9IG1pZHBvaW50O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodykge1xuICAgICAgdi56ID0gdy56ICsgc2VwYXJhdGlvbih2Ll8sIHcuXyk7XG4gICAgfVxuICAgIHYucGFyZW50LkEgPSBhcHBvcnRpb24odiwgdywgdi5wYXJlbnQuQSB8fCBzaWJsaW5nc1swXSk7XG4gIH1cblxuICAvLyBDb21wdXRlcyBhbGwgcmVhbCB4LWNvb3JkaW5hdGVzIGJ5IHN1bW1pbmcgdXAgdGhlIG1vZGlmaWVycyByZWN1cnNpdmVseS5cbiAgZnVuY3Rpb24gc2Vjb25kV2Fsayh2KSB7XG4gICAgdi5fLnggPSB2LnogKyB2LnBhcmVudC5tO1xuICAgIHYubSArPSB2LnBhcmVudC5tO1xuICB9XG5cbiAgLy8gVGhlIGNvcmUgb2YgdGhlIGFsZ29yaXRobS4gSGVyZSwgYSBuZXcgc3VidHJlZSBpcyBjb21iaW5lZCB3aXRoIHRoZVxuICAvLyBwcmV2aW91cyBzdWJ0cmVlcy4gVGhyZWFkcyBhcmUgdXNlZCB0byB0cmF2ZXJzZSB0aGUgaW5zaWRlIGFuZCBvdXRzaWRlXG4gIC8vIGNvbnRvdXJzIG9mIHRoZSBsZWZ0IGFuZCByaWdodCBzdWJ0cmVlIHVwIHRvIHRoZSBoaWdoZXN0IGNvbW1vbiBsZXZlbC4gVGhlXG4gIC8vIHZlcnRpY2VzIHVzZWQgZm9yIHRoZSB0cmF2ZXJzYWxzIGFyZSB2aSssIHZpLSwgdm8tLCBhbmQgdm8rLCB3aGVyZSB0aGVcbiAgLy8gc3VwZXJzY3JpcHQgbyBtZWFucyBvdXRzaWRlIGFuZCBpIG1lYW5zIGluc2lkZSwgdGhlIHN1YnNjcmlwdCAtIG1lYW5zIGxlZnRcbiAgLy8gc3VidHJlZSBhbmQgKyBtZWFucyByaWdodCBzdWJ0cmVlLiBGb3Igc3VtbWluZyB1cCB0aGUgbW9kaWZpZXJzIGFsb25nIHRoZVxuICAvLyBjb250b3VyLCB3ZSB1c2UgcmVzcGVjdGl2ZSB2YXJpYWJsZXMgc2krLCBzaS0sIHNvLSwgYW5kIHNvKy4gV2hlbmV2ZXIgdHdvXG4gIC8vIG5vZGVzIG9mIHRoZSBpbnNpZGUgY29udG91cnMgY29uZmxpY3QsIHdlIGNvbXB1dGUgdGhlIGxlZnQgb25lIG9mIHRoZVxuICAvLyBncmVhdGVzdCB1bmNvbW1vbiBhbmNlc3RvcnMgdXNpbmcgdGhlIGZ1bmN0aW9uIEFOQ0VTVE9SIGFuZCBjYWxsIE1PVkVcbiAgLy8gU1VCVFJFRSB0byBzaGlmdCB0aGUgc3VidHJlZSBhbmQgcHJlcGFyZSB0aGUgc2hpZnRzIG9mIHNtYWxsZXIgc3VidHJlZXMuXG4gIC8vIEZpbmFsbHksIHdlIGFkZCBhIG5ldyB0aHJlYWQgKGlmIG5lY2Vzc2FyeSkuXG4gIGZ1bmN0aW9uIGFwcG9ydGlvbih2LCB3LCBhbmNlc3Rvcikge1xuICAgIGlmICh3KSB7XG4gICAgICB2YXIgdmlwID0gdixcbiAgICAgICAgICB2b3AgPSB2LFxuICAgICAgICAgIHZpbSA9IHcsXG4gICAgICAgICAgdm9tID0gdmlwLnBhcmVudC5jaGlsZHJlblswXSxcbiAgICAgICAgICBzaXAgPSB2aXAubSxcbiAgICAgICAgICBzb3AgPSB2b3AubSxcbiAgICAgICAgICBzaW0gPSB2aW0ubSxcbiAgICAgICAgICBzb20gPSB2b20ubSxcbiAgICAgICAgICBzaGlmdDtcbiAgICAgIHdoaWxlICh2aW0gPSBuZXh0UmlnaHQodmltKSwgdmlwID0gbmV4dExlZnQodmlwKSwgdmltICYmIHZpcCkge1xuICAgICAgICB2b20gPSBuZXh0TGVmdCh2b20pO1xuICAgICAgICB2b3AgPSBuZXh0UmlnaHQodm9wKTtcbiAgICAgICAgdm9wLmEgPSB2O1xuICAgICAgICBzaGlmdCA9IHZpbS56ICsgc2ltIC0gdmlwLnogLSBzaXAgKyBzZXBhcmF0aW9uKHZpbS5fLCB2aXAuXyk7XG4gICAgICAgIGlmIChzaGlmdCA+IDApIHtcbiAgICAgICAgICBtb3ZlU3VidHJlZShuZXh0QW5jZXN0b3IodmltLCB2LCBhbmNlc3RvciksIHYsIHNoaWZ0KTtcbiAgICAgICAgICBzaXAgKz0gc2hpZnQ7XG4gICAgICAgICAgc29wICs9IHNoaWZ0O1xuICAgICAgICB9XG4gICAgICAgIHNpbSArPSB2aW0ubTtcbiAgICAgICAgc2lwICs9IHZpcC5tO1xuICAgICAgICBzb20gKz0gdm9tLm07XG4gICAgICAgIHNvcCArPSB2b3AubTtcbiAgICAgIH1cbiAgICAgIGlmICh2aW0gJiYgIW5leHRSaWdodCh2b3ApKSB7XG4gICAgICAgIHZvcC50ID0gdmltO1xuICAgICAgICB2b3AubSArPSBzaW0gLSBzb3A7XG4gICAgICB9XG4gICAgICBpZiAodmlwICYmICFuZXh0TGVmdCh2b20pKSB7XG4gICAgICAgIHZvbS50ID0gdmlwO1xuICAgICAgICB2b20ubSArPSBzaXAgLSBzb207XG4gICAgICAgIGFuY2VzdG9yID0gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9yO1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZU5vZGUobm9kZSkge1xuICAgIG5vZGUueCAqPSBkeDtcbiAgICBub2RlLnkgPSBub2RlLmRlcHRoICogZHk7XG4gIH1cblxuICB0cmVlLnNlcGFyYXRpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoc2VwYXJhdGlvbiA9IHgsIHRyZWUpIDogc2VwYXJhdGlvbjtcbiAgfTtcblxuICB0cmVlLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobm9kZVNpemUgPSBmYWxzZSwgZHggPSAreFswXSwgZHkgPSAreFsxXSwgdHJlZSkgOiAobm9kZVNpemUgPyBudWxsIDogW2R4LCBkeV0pO1xuICB9O1xuXG4gIHRyZWUubm9kZVNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAobm9kZVNpemUgPSB0cnVlLCBkeCA9ICt4WzBdLCBkeSA9ICt4WzFdLCB0cmVlKSA6IChub2RlU2l6ZSA/IFtkeCwgZHldIDogbnVsbCk7XG4gIH07XG5cbiAgcmV0dXJuIHRyZWU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwYXJlbnQsIHgwLCB5MCwgeDEsIHkxKSB7XG4gIHZhciBub2RlcyA9IHBhcmVudC5jaGlsZHJlbixcbiAgICAgIGksIG4gPSBub2Rlcy5sZW5ndGgsXG4gICAgICBzdW0sIHN1bXMgPSBuZXcgQXJyYXkobiArIDEpO1xuXG4gIGZvciAoc3Vtc1swXSA9IHN1bSA9IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgc3Vtc1tpICsgMV0gPSBzdW0gKz0gbm9kZXNbaV0udmFsdWU7XG4gIH1cblxuICBwYXJ0aXRpb24oMCwgbiwgcGFyZW50LnZhbHVlLCB4MCwgeTAsIHgxLCB5MSk7XG5cbiAgZnVuY3Rpb24gcGFydGl0aW9uKGksIGosIHZhbHVlLCB4MCwgeTAsIHgxLCB5MSkge1xuICAgIGlmIChpID49IGogLSAxKSB7XG4gICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgbm9kZS54MCA9IHgwLCBub2RlLnkwID0geTA7XG4gICAgICBub2RlLngxID0geDEsIG5vZGUueTEgPSB5MTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVPZmZzZXQgPSBzdW1zW2ldLFxuICAgICAgICB2YWx1ZVRhcmdldCA9ICh2YWx1ZSAvIDIpICsgdmFsdWVPZmZzZXQsXG4gICAgICAgIGsgPSBpICsgMSxcbiAgICAgICAgaGkgPSBqIC0gMTtcblxuICAgIHdoaWxlIChrIDwgaGkpIHtcbiAgICAgIHZhciBtaWQgPSBrICsgaGkgPj4+IDE7XG4gICAgICBpZiAoc3Vtc1ttaWRdIDwgdmFsdWVUYXJnZXQpIGsgPSBtaWQgKyAxO1xuICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICB9XG5cbiAgICBpZiAoKHZhbHVlVGFyZ2V0IC0gc3Vtc1trIC0gMV0pIDwgKHN1bXNba10gLSB2YWx1ZVRhcmdldCkgJiYgaSArIDEgPCBrKSAtLWs7XG5cbiAgICB2YXIgdmFsdWVMZWZ0ID0gc3Vtc1trXSAtIHZhbHVlT2Zmc2V0LFxuICAgICAgICB2YWx1ZVJpZ2h0ID0gdmFsdWUgLSB2YWx1ZUxlZnQ7XG5cbiAgICBpZiAoKHgxIC0geDApID4gKHkxIC0geTApKSB7XG4gICAgICB2YXIgeGsgPSAoeDAgKiB2YWx1ZVJpZ2h0ICsgeDEgKiB2YWx1ZUxlZnQpIC8gdmFsdWU7XG4gICAgICBwYXJ0aXRpb24oaSwgaywgdmFsdWVMZWZ0LCB4MCwgeTAsIHhrLCB5MSk7XG4gICAgICBwYXJ0aXRpb24oaywgaiwgdmFsdWVSaWdodCwgeGssIHkwLCB4MSwgeTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgeWsgPSAoeTAgKiB2YWx1ZVJpZ2h0ICsgeTEgKiB2YWx1ZUxlZnQpIC8gdmFsdWU7XG4gICAgICBwYXJ0aXRpb24oaSwgaywgdmFsdWVMZWZ0LCB4MCwgeTAsIHgxLCB5ayk7XG4gICAgICBwYXJ0aXRpb24oaywgaiwgdmFsdWVSaWdodCwgeDAsIHlrLCB4MSwgeTEpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocGFyZW50LCB4MCwgeTAsIHgxLCB5MSkge1xuICB2YXIgbm9kZXMgPSBwYXJlbnQuY2hpbGRyZW4sXG4gICAgICBub2RlLFxuICAgICAgaSA9IC0xLFxuICAgICAgbiA9IG5vZGVzLmxlbmd0aCxcbiAgICAgIGsgPSBwYXJlbnQudmFsdWUgJiYgKHgxIC0geDApIC8gcGFyZW50LnZhbHVlO1xuXG4gIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgbm9kZSA9IG5vZGVzW2ldLCBub2RlLnkwID0geTAsIG5vZGUueTEgPSB5MTtcbiAgICBub2RlLngwID0geDAsIG5vZGUueDEgPSB4MCArPSBub2RlLnZhbHVlICogaztcbiAgfVxufVxuIiwiaW1wb3J0IHJvdW5kTm9kZSBmcm9tIFwiLi9yb3VuZC5qc1wiO1xuaW1wb3J0IHNxdWFyaWZ5IGZyb20gXCIuL3NxdWFyaWZ5LmpzXCI7XG5pbXBvcnQge3JlcXVpcmVkfSBmcm9tIFwiLi4vYWNjZXNzb3JzLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQsIHtjb25zdGFudFplcm99IGZyb20gXCIuLi9jb25zdGFudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIHRpbGUgPSBzcXVhcmlmeSxcbiAgICAgIHJvdW5kID0gZmFsc2UsXG4gICAgICBkeCA9IDEsXG4gICAgICBkeSA9IDEsXG4gICAgICBwYWRkaW5nU3RhY2sgPSBbMF0sXG4gICAgICBwYWRkaW5nSW5uZXIgPSBjb25zdGFudFplcm8sXG4gICAgICBwYWRkaW5nVG9wID0gY29uc3RhbnRaZXJvLFxuICAgICAgcGFkZGluZ1JpZ2h0ID0gY29uc3RhbnRaZXJvLFxuICAgICAgcGFkZGluZ0JvdHRvbSA9IGNvbnN0YW50WmVybyxcbiAgICAgIHBhZGRpbmdMZWZ0ID0gY29uc3RhbnRaZXJvO1xuXG4gIGZ1bmN0aW9uIHRyZWVtYXAocm9vdCkge1xuICAgIHJvb3QueDAgPVxuICAgIHJvb3QueTAgPSAwO1xuICAgIHJvb3QueDEgPSBkeDtcbiAgICByb290LnkxID0gZHk7XG4gICAgcm9vdC5lYWNoQmVmb3JlKHBvc2l0aW9uTm9kZSk7XG4gICAgcGFkZGluZ1N0YWNrID0gWzBdO1xuICAgIGlmIChyb3VuZCkgcm9vdC5lYWNoQmVmb3JlKHJvdW5kTm9kZSk7XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICBmdW5jdGlvbiBwb3NpdGlvbk5vZGUobm9kZSkge1xuICAgIHZhciBwID0gcGFkZGluZ1N0YWNrW25vZGUuZGVwdGhdLFxuICAgICAgICB4MCA9IG5vZGUueDAgKyBwLFxuICAgICAgICB5MCA9IG5vZGUueTAgKyBwLFxuICAgICAgICB4MSA9IG5vZGUueDEgLSBwLFxuICAgICAgICB5MSA9IG5vZGUueTEgLSBwO1xuICAgIGlmICh4MSA8IHgwKSB4MCA9IHgxID0gKHgwICsgeDEpIC8gMjtcbiAgICBpZiAoeTEgPCB5MCkgeTAgPSB5MSA9ICh5MCArIHkxKSAvIDI7XG4gICAgbm9kZS54MCA9IHgwO1xuICAgIG5vZGUueTAgPSB5MDtcbiAgICBub2RlLngxID0geDE7XG4gICAgbm9kZS55MSA9IHkxO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICBwID0gcGFkZGluZ1N0YWNrW25vZGUuZGVwdGggKyAxXSA9IHBhZGRpbmdJbm5lcihub2RlKSAvIDI7XG4gICAgICB4MCArPSBwYWRkaW5nTGVmdChub2RlKSAtIHA7XG4gICAgICB5MCArPSBwYWRkaW5nVG9wKG5vZGUpIC0gcDtcbiAgICAgIHgxIC09IHBhZGRpbmdSaWdodChub2RlKSAtIHA7XG4gICAgICB5MSAtPSBwYWRkaW5nQm90dG9tKG5vZGUpIC0gcDtcbiAgICAgIGlmICh4MSA8IHgwKSB4MCA9IHgxID0gKHgwICsgeDEpIC8gMjtcbiAgICAgIGlmICh5MSA8IHkwKSB5MCA9IHkxID0gKHkwICsgeTEpIC8gMjtcbiAgICAgIHRpbGUobm9kZSwgeDAsIHkwLCB4MSwgeTEpO1xuICAgIH1cbiAgfVxuXG4gIHRyZWVtYXAucm91bmQgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocm91bmQgPSAhIXgsIHRyZWVtYXApIDogcm91bmQ7XG4gIH07XG5cbiAgdHJlZW1hcC5zaXplID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGR4ID0gK3hbMF0sIGR5ID0gK3hbMV0sIHRyZWVtYXApIDogW2R4LCBkeV07XG4gIH07XG5cbiAgdHJlZW1hcC50aWxlID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHRpbGUgPSByZXF1aXJlZCh4KSwgdHJlZW1hcCkgOiB0aWxlO1xuICB9O1xuXG4gIHRyZWVtYXAucGFkZGluZyA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRyZWVtYXAucGFkZGluZ0lubmVyKHgpLnBhZGRpbmdPdXRlcih4KSA6IHRyZWVtYXAucGFkZGluZ0lubmVyKCk7XG4gIH07XG5cbiAgdHJlZW1hcC5wYWRkaW5nSW5uZXIgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZ0lubmVyID0gdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IHggOiBjb25zdGFudCgreCksIHRyZWVtYXApIDogcGFkZGluZ0lubmVyO1xuICB9O1xuXG4gIHRyZWVtYXAucGFkZGluZ091dGVyID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdHJlZW1hcC5wYWRkaW5nVG9wKHgpLnBhZGRpbmdSaWdodCh4KS5wYWRkaW5nQm90dG9tKHgpLnBhZGRpbmdMZWZ0KHgpIDogdHJlZW1hcC5wYWRkaW5nVG9wKCk7XG4gIH07XG5cbiAgdHJlZW1hcC5wYWRkaW5nVG9wID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHBhZGRpbmdUb3AgPSB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiID8geCA6IGNvbnN0YW50KCt4KSwgdHJlZW1hcCkgOiBwYWRkaW5nVG9wO1xuICB9O1xuXG4gIHRyZWVtYXAucGFkZGluZ1JpZ2h0ID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHBhZGRpbmdSaWdodCA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogY29uc3RhbnQoK3gpLCB0cmVlbWFwKSA6IHBhZGRpbmdSaWdodDtcbiAgfTtcblxuICB0cmVlbWFwLnBhZGRpbmdCb3R0b20gPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZ0JvdHRvbSA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogY29uc3RhbnQoK3gpLCB0cmVlbWFwKSA6IHBhZGRpbmdCb3R0b207XG4gIH07XG5cbiAgdHJlZW1hcC5wYWRkaW5nTGVmdCA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChwYWRkaW5nTGVmdCA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogY29uc3RhbnQoK3gpLCB0cmVlbWFwKSA6IHBhZGRpbmdMZWZ0O1xuICB9O1xuXG4gIHJldHVybiB0cmVlbWFwO1xufVxuIiwiaW1wb3J0IHRyZWVtYXBEaWNlIGZyb20gXCIuL2RpY2UuanNcIjtcbmltcG9ydCB0cmVlbWFwU2xpY2UgZnJvbSBcIi4vc2xpY2UuanNcIjtcbmltcG9ydCB7cGhpLCBzcXVhcmlmeVJhdGlvfSBmcm9tIFwiLi9zcXVhcmlmeS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gY3VzdG9tKHJhdGlvKSB7XG5cbiAgZnVuY3Rpb24gcmVzcXVhcmlmeShwYXJlbnQsIHgwLCB5MCwgeDEsIHkxKSB7XG4gICAgaWYgKChyb3dzID0gcGFyZW50Ll9zcXVhcmlmeSkgJiYgKHJvd3MucmF0aW8gPT09IHJhdGlvKSkge1xuICAgICAgdmFyIHJvd3MsXG4gICAgICAgICAgcm93LFxuICAgICAgICAgIG5vZGVzLFxuICAgICAgICAgIGksXG4gICAgICAgICAgaiA9IC0xLFxuICAgICAgICAgIG4sXG4gICAgICAgICAgbSA9IHJvd3MubGVuZ3RoLFxuICAgICAgICAgIHZhbHVlID0gcGFyZW50LnZhbHVlO1xuXG4gICAgICB3aGlsZSAoKytqIDwgbSkge1xuICAgICAgICByb3cgPSByb3dzW2pdLCBub2RlcyA9IHJvdy5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChpID0gcm93LnZhbHVlID0gMCwgbiA9IG5vZGVzLmxlbmd0aDsgaSA8IG47ICsraSkgcm93LnZhbHVlICs9IG5vZGVzW2ldLnZhbHVlO1xuICAgICAgICBpZiAocm93LmRpY2UpIHRyZWVtYXBEaWNlKHJvdywgeDAsIHkwLCB4MSwgeTAgKz0gKHkxIC0geTApICogcm93LnZhbHVlIC8gdmFsdWUpO1xuICAgICAgICBlbHNlIHRyZWVtYXBTbGljZShyb3csIHgwLCB5MCwgeDAgKz0gKHgxIC0geDApICogcm93LnZhbHVlIC8gdmFsdWUsIHkxKTtcbiAgICAgICAgdmFsdWUgLT0gcm93LnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnQuX3NxdWFyaWZ5ID0gcm93cyA9IHNxdWFyaWZ5UmF0aW8ocmF0aW8sIHBhcmVudCwgeDAsIHkwLCB4MSwgeTEpO1xuICAgICAgcm93cy5yYXRpbyA9IHJhdGlvO1xuICAgIH1cbiAgfVxuXG4gIHJlc3F1YXJpZnkucmF0aW8gPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGN1c3RvbSgoeCA9ICt4KSA+IDEgPyB4IDogMSk7XG4gIH07XG5cbiAgcmV0dXJuIHJlc3F1YXJpZnk7XG59KShwaGkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICBub2RlLngwID0gTWF0aC5yb3VuZChub2RlLngwKTtcbiAgbm9kZS55MCA9IE1hdGgucm91bmQobm9kZS55MCk7XG4gIG5vZGUueDEgPSBNYXRoLnJvdW5kKG5vZGUueDEpO1xuICBub2RlLnkxID0gTWF0aC5yb3VuZChub2RlLnkxKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBhcmVudCwgeDAsIHkwLCB4MSwgeTEpIHtcbiAgdmFyIG5vZGVzID0gcGFyZW50LmNoaWxkcmVuLFxuICAgICAgbm9kZSxcbiAgICAgIGkgPSAtMSxcbiAgICAgIG4gPSBub2Rlcy5sZW5ndGgsXG4gICAgICBrID0gcGFyZW50LnZhbHVlICYmICh5MSAtIHkwKSAvIHBhcmVudC52YWx1ZTtcblxuICB3aGlsZSAoKytpIDwgbikge1xuICAgIG5vZGUgPSBub2Rlc1tpXSwgbm9kZS54MCA9IHgwLCBub2RlLngxID0geDE7XG4gICAgbm9kZS55MCA9IHkwLCBub2RlLnkxID0geTAgKz0gbm9kZS52YWx1ZSAqIGs7XG4gIH1cbn1cbiIsImltcG9ydCBkaWNlIGZyb20gXCIuL2RpY2UuanNcIjtcbmltcG9ydCBzbGljZSBmcm9tIFwiLi9zbGljZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwYXJlbnQsIHgwLCB5MCwgeDEsIHkxKSB7XG4gIChwYXJlbnQuZGVwdGggJiAxID8gc2xpY2UgOiBkaWNlKShwYXJlbnQsIHgwLCB5MCwgeDEsIHkxKTtcbn1cbiIsImltcG9ydCB0cmVlbWFwRGljZSBmcm9tIFwiLi9kaWNlLmpzXCI7XG5pbXBvcnQgdHJlZW1hcFNsaWNlIGZyb20gXCIuL3NsaWNlLmpzXCI7XG5cbmV4cG9ydCB2YXIgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyaWZ5UmF0aW8ocmF0aW8sIHBhcmVudCwgeDAsIHkwLCB4MSwgeTEpIHtcbiAgdmFyIHJvd3MgPSBbXSxcbiAgICAgIG5vZGVzID0gcGFyZW50LmNoaWxkcmVuLFxuICAgICAgcm93LFxuICAgICAgbm9kZVZhbHVlLFxuICAgICAgaTAgPSAwLFxuICAgICAgaTEgPSAwLFxuICAgICAgbiA9IG5vZGVzLmxlbmd0aCxcbiAgICAgIGR4LCBkeSxcbiAgICAgIHZhbHVlID0gcGFyZW50LnZhbHVlLFxuICAgICAgc3VtVmFsdWUsXG4gICAgICBtaW5WYWx1ZSxcbiAgICAgIG1heFZhbHVlLFxuICAgICAgbmV3UmF0aW8sXG4gICAgICBtaW5SYXRpbyxcbiAgICAgIGFscGhhLFxuICAgICAgYmV0YTtcblxuICB3aGlsZSAoaTAgPCBuKSB7XG4gICAgZHggPSB4MSAtIHgwLCBkeSA9IHkxIC0geTA7XG5cbiAgICAvLyBGaW5kIHRoZSBuZXh0IG5vbi1lbXB0eSBub2RlLlxuICAgIGRvIHN1bVZhbHVlID0gbm9kZXNbaTErK10udmFsdWU7IHdoaWxlICghc3VtVmFsdWUgJiYgaTEgPCBuKTtcbiAgICBtaW5WYWx1ZSA9IG1heFZhbHVlID0gc3VtVmFsdWU7XG4gICAgYWxwaGEgPSBNYXRoLm1heChkeSAvIGR4LCBkeCAvIGR5KSAvICh2YWx1ZSAqIHJhdGlvKTtcbiAgICBiZXRhID0gc3VtVmFsdWUgKiBzdW1WYWx1ZSAqIGFscGhhO1xuICAgIG1pblJhdGlvID0gTWF0aC5tYXgobWF4VmFsdWUgLyBiZXRhLCBiZXRhIC8gbWluVmFsdWUpO1xuXG4gICAgLy8gS2VlcCBhZGRpbmcgbm9kZXMgd2hpbGUgdGhlIGFzcGVjdCByYXRpbyBtYWludGFpbnMgb3IgaW1wcm92ZXMuXG4gICAgZm9yICg7IGkxIDwgbjsgKytpMSkge1xuICAgICAgc3VtVmFsdWUgKz0gbm9kZVZhbHVlID0gbm9kZXNbaTFdLnZhbHVlO1xuICAgICAgaWYgKG5vZGVWYWx1ZSA8IG1pblZhbHVlKSBtaW5WYWx1ZSA9IG5vZGVWYWx1ZTtcbiAgICAgIGlmIChub2RlVmFsdWUgPiBtYXhWYWx1ZSkgbWF4VmFsdWUgPSBub2RlVmFsdWU7XG4gICAgICBiZXRhID0gc3VtVmFsdWUgKiBzdW1WYWx1ZSAqIGFscGhhO1xuICAgICAgbmV3UmF0aW8gPSBNYXRoLm1heChtYXhWYWx1ZSAvIGJldGEsIGJldGEgLyBtaW5WYWx1ZSk7XG4gICAgICBpZiAobmV3UmF0aW8gPiBtaW5SYXRpbykgeyBzdW1WYWx1ZSAtPSBub2RlVmFsdWU7IGJyZWFrOyB9XG4gICAgICBtaW5SYXRpbyA9IG5ld1JhdGlvO1xuICAgIH1cblxuICAgIC8vIFBvc2l0aW9uIGFuZCByZWNvcmQgdGhlIHJvdyBvcmllbnRhdGlvbi5cbiAgICByb3dzLnB1c2gocm93ID0ge3ZhbHVlOiBzdW1WYWx1ZSwgZGljZTogZHggPCBkeSwgY2hpbGRyZW46IG5vZGVzLnNsaWNlKGkwLCBpMSl9KTtcbiAgICBpZiAocm93LmRpY2UpIHRyZWVtYXBEaWNlKHJvdywgeDAsIHkwLCB4MSwgdmFsdWUgPyB5MCArPSBkeSAqIHN1bVZhbHVlIC8gdmFsdWUgOiB5MSk7XG4gICAgZWxzZSB0cmVlbWFwU2xpY2Uocm93LCB4MCwgeTAsIHZhbHVlID8geDAgKz0gZHggKiBzdW1WYWx1ZSAvIHZhbHVlIDogeDEsIHkxKTtcbiAgICB2YWx1ZSAtPSBzdW1WYWx1ZSwgaTAgPSBpMTtcbiAgfVxuXG4gIHJldHVybiByb3dzO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gY3VzdG9tKHJhdGlvKSB7XG5cbiAgZnVuY3Rpb24gc3F1YXJpZnkocGFyZW50LCB4MCwgeTAsIHgxLCB5MSkge1xuICAgIHNxdWFyaWZ5UmF0aW8ocmF0aW8sIHBhcmVudCwgeDAsIHkwLCB4MSwgeTEpO1xuICB9XG5cbiAgc3F1YXJpZnkucmF0aW8gPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIGN1c3RvbSgoeCA9ICt4KSA+IDEgPyB4IDogMSk7XG4gIH07XG5cbiAgcmV0dXJuIHNxdWFyaWZ5O1xufSkocGhpKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHRleHR0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLnRleHR0ZW1wbGF0ZUF0dHJzO1xuXG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBkb21haW5BdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmF0dHJpYnV0ZXM7XG52YXIgcGllQXR0cnMgPSByZXF1aXJlKCcuLi9waWUvYXR0cmlidXRlcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsYWJlbHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGxhYmVscyBvZiBlYWNoIG9mIHRoZSBzZWN0b3JzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHBhcmVudHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHBhcmVudCBzZWN0b3JzIGZvciBlYWNoIG9mIHRoZSBzZWN0b3JzLicsXG4gICAgICAgICAgICAnRW1wdHkgc3RyaW5nIGl0ZW1zIFxcJ1xcJyBhcmUgdW5kZXJzdG9vZCB0byByZWZlcmVuY2UnLFxuICAgICAgICAgICAgJ3RoZSByb290IG5vZGUgaW4gdGhlIGhpZXJhcmNoeS4nLFxuICAgICAgICAgICAgJ0lmIGBpZHNgIGlzIGZpbGxlZCwgYHBhcmVudHNgIGl0ZW1zIGFyZSB1bmRlcnN0b29kIHRvIGJlIFwiaWRzXCIgdGhlbXNlbHZlcy4nLFxuICAgICAgICAgICAgJ1doZW4gYGlkc2AgaXMgbm90IHNldCwgcGxvdGx5IGF0dGVtcHRzIHRvIGZpbmQgbWF0Y2hpbmcgaXRlbXMgaW4gYGxhYmVsc2AsJyxcbiAgICAgICAgICAgICdidXQgYmV3YXJlIHRoZXkgbXVzdCBiZSB1bmlxdWUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB2YWx1ZXM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBvZiB0aGUgc2VjdG9ycy4nLFxuICAgICAgICAgICAgJ1VzZSB3aXRoIGBicmFuY2h2YWx1ZXNgIHRvIGRldGVybWluZSBob3cgdGhlIHZhbHVlcyBhcmUgc3VtbWVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJyYW5jaHZhbHVlczoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydyZW1haW5kZXInLCAndG90YWwnXSxcbiAgICAgICAgZGZsdDogJ3JlbWFpbmRlcicsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyB0aGUgaXRlbXMgaW4gYHZhbHVlc2AgYXJlIHN1bW1lZC4nLFxuICAgICAgICAgICAgJ1doZW4gc2V0IHRvICp0b3RhbCosIGl0ZW1zIGluIGB2YWx1ZXNgIGFyZSB0YWtlbiB0byBiZSB2YWx1ZSBvZiBhbGwgaXRzIGRlc2NlbmRhbnRzLicsXG4gICAgICAgICAgICAnV2hlbiBzZXQgdG8gKnJlbWFpbmRlciosIGl0ZW1zIGluIGB2YWx1ZXNgIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJvb3QgYW5kIHRoZSBicmFuY2hlcyBzZWN0b3JzJyxcbiAgICAgICAgICAgICdhcmUgdGFrZW4gdG8gYmUgdGhlIGV4dHJhIHBhcnQgbm90IHBhcnQgb2YgdGhlIHN1bSBvZiB0aGUgdmFsdWVzIGF0IHRoZWlyIGxlYXZlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBjb3VudDoge1xuICAgICAgICB2YWxUeXBlOiAnZmxhZ2xpc3QnLFxuICAgICAgICBmbGFnczogW1xuICAgICAgICAgICAgJ2JyYW5jaGVzJyxcbiAgICAgICAgICAgICdsZWF2ZXMnXG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6ICdsZWF2ZXMnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyBkZWZhdWx0IGZvciBgdmFsdWVzYCB3aGVuIGl0IGlzIG5vdCBwcm92aWRlZCwnLFxuICAgICAgICAgICAgJ2J5IGluZmVycmluZyBhIDEgZm9yIGVhY2ggb2YgdGhlICpsZWF2ZXMqIGFuZC9vciAqYnJhbmNoZXMqLCBvdGhlcndpc2UgMC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGxldmVsOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBhbmltOiB0cnVlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbGV2ZWwgZnJvbSB3aGljaCB0aGlzIHRyYWNlIGhpZXJhcmNoeSBpcyByZW5kZXJlZC4nLFxuICAgICAgICAgICAgJ1NldCBgbGV2ZWxgIHRvIGBcXCdcXCdgIHRvIHN0YXJ0IGZyb20gdGhlIHJvb3Qgbm9kZSBpbiB0aGUgaGllcmFyY2h5LicsXG4gICAgICAgICAgICAnTXVzdCBiZSBhbiBcImlkXCIgaWYgYGlkc2AgaXMgZmlsbGVkIGluLCBvdGhlcndpc2UgcGxvdGx5IGF0dGVtcHRzIHRvIGZpbmQgYSBtYXRjaGluZycsXG4gICAgICAgICAgICAnaXRlbSBpbiBgbGFiZWxzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBtYXhkZXB0aDoge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogLTEsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbnVtYmVyIG9mIHJlbmRlcmVkIHNlY3RvcnMgZnJvbSBhbnkgZ2l2ZW4gYGxldmVsYC4nLFxuICAgICAgICAgICAgJ1NldCBgbWF4ZGVwdGhgIHRvICotMSogdG8gcmVuZGVyIGFsbCB0aGUgbGV2ZWxzIGluIHRoZSBoaWVyYXJjaHkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBtYXJrZXI6IGV4dGVuZEZsYXQoe1xuICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiBlYWNoIHNlY3RvciBvZiB0aGlzIHRyYWNlLicsXG4gICAgICAgICAgICAgICAgJ0lmIG5vdCBzcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHRyYWNlIGNvbG9yIHNldCBpcyB1c2VkJyxcbiAgICAgICAgICAgICAgICAndG8gcGljayB0aGUgc2VjdG9yIGNvbG9ycy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNvbG9yaW5oZXJpdGFuY2U6IHtcbiAgICAgICAgLy8gICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgLy8gICAgIHZhbHVlczogWydwZXItYnJhbmNoJywgJ3Blci1sYWJlbCcsIGZhbHNlXVxuICAgICAgICAvLyB9LFxuXG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBwaWVBdHRycy5tYXJrZXIubGluZS5jb2xvciwge1xuICAgICAgICAgICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIGNvbG9yIG9mIHRoZSBsaW5lIGVuY2xvc2luZyBlYWNoIHNlY3Rvci4nLFxuICAgICAgICAgICAgICAgICAgICAnRGVmYXVsdHMgdG8gdGhlIGBwYXBlcl9iZ2NvbG9yYCB2YWx1ZS4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIHBpZUF0dHJzLm1hcmtlci5saW5lLndpZHRoLCB7ZGZsdDogMX0pLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICAgICAgY29sb3JTY2FsZUF0dHJzKCdtYXJrZXInLCB7XG4gICAgICAgICAgICBjb2xvckF0dHI6ICdjb2xvcnMnLFxuICAgICAgICAgICAgYW5pbTogZmFsc2UgLy8gVE9ETzogc2V0IHRvIGFuaW06IHRydWU/XG4gICAgICAgIH0pXG4gICAgKSxcblxuICAgIGxlYWY6IHtcbiAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSBsZWF2ZXMuIFdpdGggY29sb3JzY2FsZScsXG4gICAgICAgICAgICAgICAgJ2l0IGlzIGRlZmF1bHRlZCB0byAxOyBvdGhlcndpc2UgaXQgaXMgZGVmYXVsdGVkIHRvIDAuNydcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9LFxuXG4gICAgdGV4dDogcGllQXR0cnMudGV4dCxcbiAgICB0ZXh0aW5mbzoge1xuICAgICAgICB2YWxUeXBlOiAnZmxhZ2xpc3QnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGZsYWdzOiBbXG4gICAgICAgICAgICAnbGFiZWwnLFxuICAgICAgICAgICAgJ3RleHQnLFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdjdXJyZW50IHBhdGgnLFxuICAgICAgICAgICAgJ3BlcmNlbnQgcm9vdCcsXG4gICAgICAgICAgICAncGVyY2VudCBlbnRyeScsXG4gICAgICAgICAgICAncGVyY2VudCBwYXJlbnQnXG4gICAgICAgIF0sXG4gICAgICAgIGV4dHJhczogWydub25lJ10sXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGljaCB0cmFjZSBpbmZvcm1hdGlvbiBhcHBlYXIgb24gdGhlIGdyYXBoLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgLy8gVE9ETzogaW5jb3Jwb3JhdGUgYGxhYmVsYCBhbmQgYHZhbHVlYCBpbiB0aGUgZXZlbnREYXRhXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXMuY29uY2F0KFsnbGFiZWwnLCAndmFsdWUnXSlcbiAgICB9KSxcblxuICAgIGhvdmVydGV4dDogcGllQXR0cnMuaG92ZXJ0ZXh0LFxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBmbGFnczogW1xuICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICd0ZXh0JyxcbiAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAnbmFtZScsXG4gICAgICAgICAgICAnY3VycmVudCBwYXRoJyxcbiAgICAgICAgICAgICdwZXJjZW50IHJvb3QnLFxuICAgICAgICAgICAgJ3BlcmNlbnQgZW50cnknLFxuICAgICAgICAgICAgJ3BlcmNlbnQgcGFyZW50J1xuICAgICAgICBdLFxuICAgICAgICBkZmx0OiAnbGFiZWwrdGV4dCt2YWx1ZStuYW1lJ1xuICAgIH0pLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycyh7fSwge1xuICAgICAgICBrZXlzOiBjb25zdGFudHMuZXZlbnREYXRhS2V5c1xuICAgIH0pLFxuXG4gICAgdGV4dGZvbnQ6IHBpZUF0dHJzLnRleHRmb250LFxuICAgIGluc2lkZXRleHRvcmllbnRhdGlvbjogcGllQXR0cnMuaW5zaWRldGV4dG9yaWVudGF0aW9uLFxuICAgIGluc2lkZXRleHRmb250OiBwaWVBdHRycy5pbnNpZGV0ZXh0Zm9udCxcbiAgICBvdXRzaWRldGV4dGZvbnQ6IGV4dGVuZEZsYXQoe30sIHBpZUF0dHJzLm91dHNpZGV0ZXh0Zm9udCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRpbmZvYCBseWluZyBvdXRzaWRlIHRoZSBzZWN0b3IuJyxcbiAgICAgICAgICAgICdUaGlzIG9wdGlvbiByZWZlcnMgdG8gdGhlIHJvb3Qgb2YgdGhlIGhpZXJhcmNoeScsXG4gICAgICAgICAgICAncHJlc2VudGVkIGF0IHRoZSBjZW50ZXIgb2YgYSBzdW5idXJzdCBncmFwaC4nLFxuICAgICAgICAgICAgJ1BsZWFzZSBub3RlIHRoYXQgaWYgYSBoaWVyYXJjaHkgaGFzIG11bHRpcGxlIHJvb3Qgbm9kZXMsJyxcbiAgICAgICAgICAgICd0aGlzIG9wdGlvbiB3b25cXCd0IGhhdmUgYW55IGVmZmVjdCBhbmQgYGluc2lkZXRleHRmb250YCB3b3VsZCBiZSB1c2VkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIGRvbWFpbjogZG9tYWluQXR0cnMoe25hbWU6ICdzdW5idXJzdCcsIHRyYWNlOiB0cnVlLCBlZGl0VHlwZTogJ2NhbGMnfSlcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkM0hpZXJhcmNoeSA9IHJlcXVpcmUoJ2QzLWhpZXJhcmNoeScpO1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBtYWtlQ29sb3JTY2FsZUZuID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJykubWFrZUNvbG9yU2NhbGVGdW5jRnJvbVRyYWNlO1xudmFyIG1ha2VQdWxsQ29sb3JGbiA9IHJlcXVpcmUoJy4uL3BpZS9jYWxjJykubWFrZVB1bGxDb2xvckZuO1xudmFyIGdlbmVyYXRlRXh0ZW5kZWRDb2xvcnMgPSByZXF1aXJlKCcuLi9waWUvY2FsYycpLmdlbmVyYXRlRXh0ZW5kZWRDb2xvcnM7XG52YXIgY29sb3JzY2FsZUNhbGMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKS5jYWxjO1xuXG52YXIgQUxNT1NUX0VRVUFMID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkFMTU9TVF9FUVVBTDtcblxudmFyIHN1bmJ1cnN0RXh0ZW5kZWRDb2xvcldheXMgPSB7fTtcbnZhciB0cmVlbWFwRXh0ZW5kZWRDb2xvcldheXMgPSB7fTtcblxuZXhwb3J0cy5jYWxjID0gZnVuY3Rpb24oZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgaWRzID0gdHJhY2UuaWRzO1xuICAgIHZhciBoYXNJZHMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShpZHMpO1xuICAgIHZhciBsYWJlbHMgPSB0cmFjZS5sYWJlbHM7XG4gICAgdmFyIHBhcmVudHMgPSB0cmFjZS5wYXJlbnRzO1xuICAgIHZhciB2YWx1ZXMgPSB0cmFjZS52YWx1ZXM7XG4gICAgdmFyIGhhc1ZhbHVlcyA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHZhbHVlcyk7XG4gICAgdmFyIGNkID0gW107XG5cbiAgICB2YXIgcGFyZW50MmNoaWxkcmVuID0ge307XG4gICAgdmFyIHJlZnMgPSB7fTtcbiAgICB2YXIgYWRkVG9Mb29rdXAgPSBmdW5jdGlvbihwYXJlbnQsIHYpIHtcbiAgICAgICAgaWYocGFyZW50MmNoaWxkcmVuW3BhcmVudF0pIHBhcmVudDJjaGlsZHJlbltwYXJlbnRdLnB1c2godik7XG4gICAgICAgIGVsc2UgcGFyZW50MmNoaWxkcmVuW3BhcmVudF0gPSBbdl07XG4gICAgICAgIHJlZnNbdl0gPSAxO1xuICAgIH07XG5cbiAgICAvLyB0cmVhdCBudW1iZXIgYDBgIGFzIHZhbGlkXG4gICAgdmFyIGlzVmFsaWRLZXkgPSBmdW5jdGlvbihrKSB7XG4gICAgICAgIHJldHVybiBrIHx8IHR5cGVvZiBrID09PSAnbnVtYmVyJztcbiAgICB9O1xuXG4gICAgdmFyIGlzVmFsaWRWYWwgPSBmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiAhaGFzVmFsdWVzIHx8IChpc051bWVyaWModmFsdWVzW2ldKSAmJiB2YWx1ZXNbaV0gPj0gMCk7XG4gICAgfTtcblxuICAgIHZhciBsZW47XG4gICAgdmFyIGlzVmFsaWQ7XG4gICAgdmFyIGdldElkO1xuXG4gICAgaWYoaGFzSWRzKSB7XG4gICAgICAgIGxlbiA9IE1hdGgubWluKGlkcy5sZW5ndGgsIHBhcmVudHMubGVuZ3RoKTtcbiAgICAgICAgaXNWYWxpZCA9IGZ1bmN0aW9uKGkpIHsgcmV0dXJuIGlzVmFsaWRLZXkoaWRzW2ldKSAmJiBpc1ZhbGlkVmFsKGkpOyB9O1xuICAgICAgICBnZXRJZCA9IGZ1bmN0aW9uKGkpIHsgcmV0dXJuIFN0cmluZyhpZHNbaV0pOyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IE1hdGgubWluKGxhYmVscy5sZW5ndGgsIHBhcmVudHMubGVuZ3RoKTtcbiAgICAgICAgaXNWYWxpZCA9IGZ1bmN0aW9uKGkpIHsgcmV0dXJuIGlzVmFsaWRLZXkobGFiZWxzW2ldKSAmJiBpc1ZhbGlkVmFsKGkpOyB9O1xuICAgICAgICAvLyBUT0RPIFdlIGNvdWxkIGFsbG93IHNvbWUgbGFiZWwgLyBwYXJlbnQgZHVwbGljYXRpb25cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRnJvbSBBSjpcbiAgICAgICAgLy8gIEl0IHdvdWxkIHdvcmsgT0sgZm9yIG9uZSBsZXZlbFxuICAgICAgICAvLyAgKG11bHRpcGxlIHJvd3Mgd2l0aCB0aGUgc2FtZSBuYW1lIGFuZCBkaWZmZXJlbnQgcGFyZW50cyAtXG4gICAgICAgIC8vICBvciBldmVuIHRoZSBzYW1lIHBhcmVudCkgYnV0IGlmIHRoYXQgbmFtZSBpcyB0aGVuIHVzZWQgYXMgYSBwYXJlbnRcbiAgICAgICAgLy8gIHdoaWNoIG9uZSBpcyBpdD9cbiAgICAgICAgZ2V0SWQgPSBmdW5jdGlvbihpKSB7IHJldHVybiBTdHJpbmcobGFiZWxzW2ldKTsgfTtcbiAgICB9XG5cbiAgICBpZihoYXNWYWx1ZXMpIGxlbiA9IE1hdGgubWluKGxlbiwgdmFsdWVzLmxlbmd0aCk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYoaXNWYWxpZChpKSkge1xuICAgICAgICAgICAgdmFyIGlkID0gZ2V0SWQoaSk7XG4gICAgICAgICAgICB2YXIgcGlkID0gaXNWYWxpZEtleShwYXJlbnRzW2ldKSA/IFN0cmluZyhwYXJlbnRzW2ldKSA6ICcnO1xuXG4gICAgICAgICAgICB2YXIgY2RpID0ge1xuICAgICAgICAgICAgICAgIGk6IGksXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIHBpZDogcGlkLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBpc1ZhbGlkS2V5KGxhYmVsc1tpXSkgPyBTdHJpbmcobGFiZWxzW2ldKSA6ICcnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihoYXNWYWx1ZXMpIGNkaS52ID0gK3ZhbHVlc1tpXTtcbiAgICAgICAgICAgIGNkLnB1c2goY2RpKTtcbiAgICAgICAgICAgIGFkZFRvTG9va3VwKHBpZCwgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXBhcmVudDJjaGlsZHJlblsnJ10pIHtcbiAgICAgICAgdmFyIGltcGxpZWRSb290cyA9IFtdO1xuICAgICAgICB2YXIgaztcbiAgICAgICAgZm9yKGsgaW4gcGFyZW50MmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZighcmVmc1trXSkge1xuICAgICAgICAgICAgICAgIGltcGxpZWRSb290cy5wdXNoKGspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYW4gYGlkYCBoYXMgbm8gcmVmIGluIHRoZSBgcGFyZW50c2AgYXJyYXksXG4gICAgICAgIC8vIHRha2UgaXQgYXMgYmVpbmcgdGhlIHJvb3Qgbm9kZVxuXG4gICAgICAgIGlmKGltcGxpZWRSb290cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGsgPSBpbXBsaWVkUm9vdHNbMF07XG4gICAgICAgICAgICBjZC51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICBoYXNJbXBsaWVkUm9vdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpZDogayxcbiAgICAgICAgICAgICAgICBwaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBrXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBMaWIud2FybignTXVsdGlwbGUgaW1wbGllZCByb290cywgY2Fubm90IGJ1aWxkICcgKyB0cmFjZS50eXBlICsgJyBoaWVyYXJjaHkuJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYocGFyZW50MmNoaWxkcmVuWycnXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBkdW1teUlkID0gTGliLnJhbmRzdHIoKTtcblxuICAgICAgICAvLyBpZiBtdWx0aXBsZSByb3dzIGxpbmtlZCB0byB0aGUgcm9vdCBub2RlLFxuICAgICAgICAvLyBhZGQgZHVtbXkgXCJyb290IG9mIHJvb3RzXCIgbm9kZSB0byBtYWtlIGQzIGJ1aWxkIHRoZSBoaWVyYXJjaHkgc3VjY2Vzc2Z1bGx5XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZihjZFtqXS5waWQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY2Rbal0ucGlkID0gZHVtbXlJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNkLnVuc2hpZnQoe1xuICAgICAgICAgICAgaGFzTXVsdGlwbGVSb290czogdHJ1ZSxcbiAgICAgICAgICAgIGlkOiBkdW1teUlkLFxuICAgICAgICAgICAgcGlkOiAnJyxcbiAgICAgICAgICAgIGxhYmVsOiAnJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIG1pZ2h0IGJlIGJldHRlciB0byByZXBsYWNlIHN0cmF0aWZ5KCkgd2l0aCBvdXIgb3duIGFsZ29yaXRobVxuICAgIHZhciByb290O1xuICAgIHRyeSB7XG4gICAgICAgIHJvb3QgPSBkM0hpZXJhcmNoeS5zdHJhdGlmeSgpXG4gICAgICAgICAgICAuaWQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5pZDsgfSlcbiAgICAgICAgICAgIC5wYXJlbnRJZChmdW5jdGlvbihkKSB7IHJldHVybiBkLnBpZDsgfSkoY2QpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gTGliLndhcm4oJ0ZhaWxlZCB0byBidWlsZCAnICsgdHJhY2UudHlwZSArICcgaGllcmFyY2h5LiBFcnJvcjogJyArIGUubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdmFyIGhpZXJhcmNoeSA9IGQzSGllcmFyY2h5LmhpZXJhcmNoeShyb290KTtcbiAgICB2YXIgZmFpbGVkID0gZmFsc2U7XG5cbiAgICBpZihoYXNWYWx1ZXMpIHtcbiAgICAgICAgc3dpdGNoKHRyYWNlLmJyYW5jaHZhbHVlcykge1xuICAgICAgICAgICAgY2FzZSAncmVtYWluZGVyJzpcbiAgICAgICAgICAgICAgICBoaWVyYXJjaHkuc3VtKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZGF0YS52OyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdGFsJzpcbiAgICAgICAgICAgICAgICBoaWVyYXJjaHkuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjZGkgPSBkLmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBjZGkudjtcblxuICAgICAgICAgICAgICAgICAgICBpZihkLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydGlhbFN1bSA9IGQuY2hpbGRyZW4ucmVkdWNlKGZ1bmN0aW9uKGEsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSArIGMuZGF0YS5kYXRhLnY7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTi5CLiB3ZSBtdXN0IGZpbGwgaW4gYHZhbHVlYCBmb3IgZ2VuZXJhdGVkIHNlY3RvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpdGggdGhlIHBhcnRpYWxTdW0gdG8gY29tcHV0ZSB0aGUgY29ycmVjdCBwYXJ0aXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNkaS5oYXNJbXBsaWVkUm9vdCB8fCBjZGkuaGFzTXVsdGlwbGVSb290cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBwYXJ0aWFsU3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2IDwgcGFydGlhbFN1bSAqIEFMTU9TVF9FUVVBTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIExpYi53YXJuKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1RvdGFsIHZhbHVlIGZvciBub2RlJywgZC5kYXRhLmRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpcyBzbWFsbGVyIHRoYW4gdGhlIHN1bSBvZiBpdHMgY2hpbGRyZW4uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcbnBhcmVudCB2YWx1ZSA9JywgdixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcbmNoaWxkcmVuIHN1bSA9JywgcGFydGlhbFN1bVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uam9pbignICcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGQudmFsdWUgPSB2O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnREZXNjZW5kYW50cyhoaWVyYXJjaHksIHRyYWNlLCB7XG4gICAgICAgICAgICBicmFuY2hlczogdHJhY2UuY291bnQuaW5kZXhPZignYnJhbmNoZXMnKSAhPT0gLTEsXG4gICAgICAgICAgICBsZWF2ZXM6IHRyYWNlLmNvdW50LmluZGV4T2YoJ2xlYXZlcycpICE9PSAtMVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihmYWlsZWQpIHJldHVybjtcblxuICAgIC8vIFRPRE8gYWRkIHdheSB0byBzb3J0IGJ5IGhlaWdodCBhbHNvP1xuICAgIGhpZXJhcmNoeS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGIudmFsdWUgLSBhLnZhbHVlOyB9KTtcblxuICAgIHZhciBwdWxsQ29sb3I7XG4gICAgdmFyIHNjYWxlQ29sb3I7XG4gICAgdmFyIGNvbG9ycyA9IHRyYWNlLm1hcmtlci5jb2xvcnMgfHwgW107XG4gICAgdmFyIGhhc0NvbG9ycyA9ICEhY29sb3JzLmxlbmd0aDtcblxuICAgIGlmKHRyYWNlLl9oYXNDb2xvcnNjYWxlKSB7XG4gICAgICAgIGlmKCFoYXNDb2xvcnMpIHtcbiAgICAgICAgICAgIGNvbG9ycyA9IGhhc1ZhbHVlcyA/IHRyYWNlLnZhbHVlcyA6IHRyYWNlLl92YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IGNvbG9ycyxcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlcicsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NhbGVDb2xvciA9IG1ha2VDb2xvclNjYWxlRm4odHJhY2UubWFya2VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwdWxsQ29sb3IgPSBtYWtlUHVsbENvbG9yRm4oZnVsbExheW91dFsnXycgKyB0cmFjZS50eXBlICsgJ2NvbG9ybWFwJ10pO1xuICAgIH1cblxuICAgIC8vIFRPRE8ga2VlcCB0cmFjayBvZiAncm9vdC1jaGlsZHJlbicgKGkuZS4gYnJhbmNoKSBmb3IgaG92ZXIgaW5mbyBldGMuXG5cbiAgICBoaWVyYXJjaHkuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBjZGkgPSBkLmRhdGEuZGF0YTtcbiAgICAgICAgLy8gTi5CLiB0aGlzIG11dGF0ZXMgaXRlbXMgaW4gYGNkYFxuICAgICAgICBjZGkuY29sb3IgPSB0cmFjZS5faGFzQ29sb3JzY2FsZSA/XG4gICAgICAgICAgICBzY2FsZUNvbG9yKGNvbG9yc1tjZGkuaV0pIDpcbiAgICAgICAgICAgIHB1bGxDb2xvcihjb2xvcnNbY2RpLmldLCBjZGkuaWQpO1xuICAgIH0pO1xuXG4gICAgY2RbMF0uaGllcmFyY2h5ID0gaGllcmFyY2h5O1xuXG4gICAgcmV0dXJuIGNkO1xufTtcblxuLypcbiAqIGBjYWxjYCBmaWxsZWQgaW4gKGFuZCBjb2xsYXRlZCkgZXhwbGljaXQgY29sb3JzLlxuICogTm93IHdlIG5lZWQgdG8gcHJvcGFnYXRlIHRoZXNlIGV4cGxpY2l0IGNvbG9ycyB0byBvdGhlciB0cmFjZXMsXG4gKiBhbmQgZmlsbCBpbiBkZWZhdWx0IGNvbG9ycy5cbiAqIFRoaXMgaXMgZG9uZSBhZnRlciBzb3J0aW5nLCBzbyB3ZSBwaWNrIGRlZmF1bHRzXG4gKiBpbiB0aGUgb3JkZXIgc2xpY2VzIHdpbGwgYmUgZGlzcGxheWVkXG4gKi9cbmV4cG9ydHMuX3J1bkNyb3NzVHJhY2VDYWxjID0gZnVuY3Rpb24oZGVzaXJlZFR5cGUsIGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgY2FsY2RhdGEgPSBnZC5jYWxjZGF0YTtcbiAgICB2YXIgY29sb3JXYXkgPSBmdWxsTGF5b3V0W2Rlc2lyZWRUeXBlICsgJ2NvbG9yd2F5J107XG4gICAgdmFyIGNvbG9yTWFwID0gZnVsbExheW91dFsnXycgKyBkZXNpcmVkVHlwZSArICdjb2xvcm1hcCddO1xuXG4gICAgaWYoZnVsbExheW91dFsnZXh0ZW5kJyArIGRlc2lyZWRUeXBlICsgJ2NvbG9ycyddKSB7XG4gICAgICAgIGNvbG9yV2F5ID0gZ2VuZXJhdGVFeHRlbmRlZENvbG9ycyhjb2xvcldheSxcbiAgICAgICAgICAgIGRlc2lyZWRUeXBlID09PSAndHJlZW1hcCcgPyB0cmVlbWFwRXh0ZW5kZWRDb2xvcldheXMgOiBzdW5idXJzdEV4dGVuZGVkQ29sb3JXYXlzXG4gICAgICAgICk7XG4gICAgfVxuICAgIHZhciBkZmx0Q29sb3JDb3VudCA9IDA7XG5cbiAgICBmdW5jdGlvbiBwaWNrQ29sb3IoZCkge1xuICAgICAgICB2YXIgY2RpID0gZC5kYXRhLmRhdGE7XG4gICAgICAgIHZhciBpZCA9IGNkaS5pZDtcblxuICAgICAgICBpZihjZGkuY29sb3IgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZihjb2xvck1hcFtpZF0pIHtcbiAgICAgICAgICAgICAgICAvLyBoYXZlIHdlIHNlZW4gdGhpcyBsYWJlbCBhbmQgYXNzaWduZWQgYSBjb2xvciB0byBpdCBpbiBhIHByZXZpb3VzIHRyYWNlP1xuICAgICAgICAgICAgICAgIGNkaS5jb2xvciA9IGNvbG9yTWFwW2lkXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGlmKGQucGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmcm9tIHRoaXJkLWxldmVsIG9uLCBpbmhlcml0IGZyb20gcGFyZW50XG4gICAgICAgICAgICAgICAgICAgIGNkaS5jb2xvciA9IGQucGFyZW50LmRhdGEuZGF0YS5jb2xvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBwaWNrIG5ldyBjb2xvciBmb3Igc2Vjb25kIGxldmVsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yTWFwW2lkXSA9IGNkaS5jb2xvciA9IGNvbG9yV2F5W2RmbHRDb2xvckNvdW50ICUgY29sb3JXYXkubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICAgICAgZGZsdENvbG9yQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJvb3QgZ2V0cyBubyBjb2xvcmluZyBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgY2RpLmNvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZCA9IGNhbGNkYXRhW2ldO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIGlmKGNkMC50cmFjZS50eXBlID09PSBkZXNpcmVkVHlwZSAmJiBjZDAuaGllcmFyY2h5KSB7XG4gICAgICAgICAgICBjZDAuaGllcmFyY2h5LmVhY2gocGlja0NvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMuY3Jvc3NUcmFjZUNhbGMgPSBmdW5jdGlvbihnZCkge1xuICAgIHJldHVybiBleHBvcnRzLl9ydW5Dcm9zc1RyYWNlQ2FsYygnc3VuYnVyc3QnLCBnZCk7XG59O1xuXG5mdW5jdGlvbiBjb3VudERlc2NlbmRhbnRzKG5vZGUsIHRyYWNlLCBvcHRzKSB7XG4gICAgdmFyIG5DaGlsZCA9IDA7XG5cbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIGlmKGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBuQ2hpbGQgKz0gY291bnREZXNjZW5kYW50cyhjaGlsZHJlbltpXSwgdHJhY2UsIG9wdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5icmFuY2hlcykgbkNoaWxkKys7IC8vIGNvdW50IHRoaXMgYnJhbmNoXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYob3B0cy5sZWF2ZXMpIG5DaGlsZCsrOyAvLyBjb3VudCB0aGlzIGxlYWZcbiAgICB9XG5cbiAgICAvLyBzYXZlIHRvIHRoZSBub2RlXG4gICAgbm9kZS52YWx1ZSA9IG5vZGUuZGF0YS5kYXRhLnZhbHVlID0gbkNoaWxkO1xuXG4gICAgLy8gc2F2ZSB0byB0aGUgdHJhY2VcbiAgICBpZighdHJhY2UuX3ZhbHVlcykgdHJhY2UuX3ZhbHVlcyA9IFtdO1xuICAgIHRyYWNlLl92YWx1ZXNbbm9kZS5kYXRhLmRhdGEuaV0gPSBuQ2hpbGQ7XG5cbiAgICByZXR1cm4gbkNoaWxkO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBDTElDS19UUkFOU0lUSU9OX1RJTUU6IDc1MCxcbiAgICBDTElDS19UUkFOU0lUSU9OX0VBU0lORzogJ2xpbmVhcicsXG4gICAgZXZlbnREYXRhS2V5czogW1xuICAgICAgICAvLyBzdHJpbmdcbiAgICAgICAgJ2N1cnJlbnRQYXRoJyxcbiAgICAgICAgJ3Jvb3QnLFxuICAgICAgICAnZW50cnknLFxuICAgICAgICAvLyBubyBuZWVkIHRvIGFkZCAncGFyZW50JyBoZXJlXG5cbiAgICAgICAgLy8gcGVyY2VudGFnZXMgaS5lLiByYXRpb3NcbiAgICAgICAgJ3BlcmNlbnRSb290JyxcbiAgICAgICAgJ3BlcmNlbnRFbnRyeScsXG4gICAgICAgICdwZXJjZW50UGFyZW50J1xuICAgIF1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIGFwcGVuZEFycmF5UG9pbnRWYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngvaGVscGVycycpLmFwcGVuZEFycmF5UG9pbnRWYWx1ZTtcbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9saWIvZXZlbnRzJyk7XG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgcGllSGVscGVycyA9IHJlcXVpcmUoJy4uL3BpZS9oZWxwZXJzJyk7XG5cbnZhciBmb3JtYXRWYWx1ZSA9IHBpZUhlbHBlcnMuZm9ybWF0UGllVmFsdWU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXR0YWNoRnhIYW5kbGVycyhzbGljZVRvcCwgZW50cnksIGdkLCBjZCwgb3B0cykge1xuICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIGhpZXJhcmNoeSA9IGNkMC5oaWVyYXJjaHk7XG5cbiAgICB2YXIgaXNTdW5idXJzdCA9IHRyYWNlLnR5cGUgPT09ICdzdW5idXJzdCc7XG4gICAgdmFyIGlzVHJlZW1hcCA9IHRyYWNlLnR5cGUgPT09ICd0cmVlbWFwJztcblxuICAgIC8vIGhvdmVyIHN0YXRlIHZhcnNcbiAgICAvLyBoYXZlIHdlIGRyYXduIGEgaG92ZXIgbGFiZWwsIHNvIGl0IHNob3VsZCBiZSBjbGVhcmVkIGxhdGVyXG4gICAgaWYoISgnX2hhc0hvdmVyTGFiZWwnIGluIHRyYWNlKSkgdHJhY2UuX2hhc0hvdmVyTGFiZWwgPSBmYWxzZTtcbiAgICAvLyBoYXZlIHdlIGVtaXR0ZWQgYSBob3ZlciBldmVudCwgc28gbGF0ZXIgYW4gdW5ob3ZlciBldmVudCBzaG91bGQgYmUgZW1pdHRlZFxuICAgIC8vIG5vdGUgdGhhdCBjbGljayBldmVudHMgZG8gbm90IGRlcGVuZCBvbiB0aGlzIC0geW91IGNhbiBzdGlsbCBnZXQgdGhlbVxuICAgIC8vIHdpdGggaG92ZXJtb2RlOiBmYWxzZSBvciBpZiB5b3Ugd2VyZSBlYXJsaWVyIGRyYWdnaW5nLCB0aGVuIGNsaWNrZWRcbiAgICAvLyBpbiB0aGUgc2FtZSBzbGljZSB0aGF0IHlvdSBtb3VzZWQgdXAgaW5cbiAgICBpZighKCdfaGFzSG92ZXJFdmVudCcgaW4gdHJhY2UpKSB0cmFjZS5faGFzSG92ZXJFdmVudCA9IGZhbHNlO1xuXG4gICAgdmFyIG9uTW91c2VPdmVyID0gZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgdmFyIGZ1bGxMYXlvdXROb3cgPSBnZC5fZnVsbExheW91dDtcblxuICAgICAgICBpZihnZC5fZHJhZ2dpbmcgfHwgZnVsbExheW91dE5vdy5ob3Zlcm1vZGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRyYWNlTm93ID0gZ2QuX2Z1bGxEYXRhW3RyYWNlLmluZGV4XTtcbiAgICAgICAgdmFyIGNkaSA9IHB0LmRhdGEuZGF0YTtcbiAgICAgICAgdmFyIHB0TnVtYmVyID0gY2RpLmk7XG4gICAgICAgIHZhciBpc1Jvb3QgPSBoZWxwZXJzLmlzSGllcmFyY2h5Um9vdChwdCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSBoZWxwZXJzLmdldFBhcmVudChoaWVyYXJjaHksIHB0KTtcblxuICAgICAgICB2YXIgdmFsID0gaGVscGVycy5nZXRWYWx1ZShwdCk7XG5cbiAgICAgICAgdmFyIF9jYXN0ID0gZnVuY3Rpb24oYXN0cikge1xuICAgICAgICAgICAgcmV0dXJuIExpYi5jYXN0T3B0aW9uKHRyYWNlTm93LCBwdE51bWJlciwgYXN0cik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGhvdmVydGVtcGxhdGUgPSBfY2FzdCgnaG92ZXJ0ZW1wbGF0ZScpO1xuICAgICAgICB2YXIgaG92ZXJpbmZvID0gRnguY2FzdEhvdmVyaW5mbyh0cmFjZU5vdywgZnVsbExheW91dE5vdywgcHROdW1iZXIpO1xuICAgICAgICB2YXIgc2VwYXJhdG9ycyA9IGZ1bGxMYXlvdXROb3cuc2VwYXJhdG9ycztcblxuICAgICAgICBpZihob3ZlcnRlbXBsYXRlIHx8IChob3ZlcmluZm8gJiYgaG92ZXJpbmZvICE9PSAnbm9uZScgJiYgaG92ZXJpbmZvICE9PSAnc2tpcCcpKSB7XG4gICAgICAgICAgICB2YXIgaG92ZXJDZW50ZXJYO1xuICAgICAgICAgICAgdmFyIGhvdmVyQ2VudGVyWTtcbiAgICAgICAgICAgIGlmKGlzU3VuYnVyc3QpIHtcbiAgICAgICAgICAgICAgICBob3ZlckNlbnRlclggPSBjZDAuY3ggKyBwdC5weG1pZFswXSAqICgxIC0gcHQuckluc2NyaWJlZCk7XG4gICAgICAgICAgICAgICAgaG92ZXJDZW50ZXJZID0gY2QwLmN5ICsgcHQucHhtaWRbMV0gKiAoMSAtIHB0LnJJbnNjcmliZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNUcmVlbWFwKSB7XG4gICAgICAgICAgICAgICAgaG92ZXJDZW50ZXJYID0gcHQuX2hvdmVyWDtcbiAgICAgICAgICAgICAgICBob3ZlckNlbnRlclkgPSBwdC5faG92ZXJZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaG92ZXJQdCA9IHt9O1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICAgICAgICB2YXIgdGhpc1RleHQgPSBbXTtcbiAgICAgICAgICAgIHZhciBoYXNGbGFnID0gZnVuY3Rpb24oZmxhZykgeyByZXR1cm4gcGFydHMuaW5kZXhPZihmbGFnKSAhPT0gLTE7IH07XG5cbiAgICAgICAgICAgIGlmKGhvdmVyaW5mbykge1xuICAgICAgICAgICAgICAgIHBhcnRzID0gaG92ZXJpbmZvID09PSAnYWxsJyA/XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlTm93Ll9tb2R1bGUuYXR0cmlidXRlcy5ob3ZlcmluZm8uZmxhZ3MgOlxuICAgICAgICAgICAgICAgICAgICBob3ZlcmluZm8uc3BsaXQoJysnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaG92ZXJQdC5sYWJlbCA9IGNkaS5sYWJlbDtcbiAgICAgICAgICAgIGlmKGhhc0ZsYWcoJ2xhYmVsJykgJiYgaG92ZXJQdC5sYWJlbCkgdGhpc1RleHQucHVzaChob3ZlclB0LmxhYmVsKTtcblxuICAgICAgICAgICAgaWYoY2RpLmhhc093blByb3BlcnR5KCd2JykpIHtcbiAgICAgICAgICAgICAgICBob3ZlclB0LnZhbHVlID0gY2RpLnY7XG4gICAgICAgICAgICAgICAgaG92ZXJQdC52YWx1ZUxhYmVsID0gZm9ybWF0VmFsdWUoaG92ZXJQdC52YWx1ZSwgc2VwYXJhdG9ycyk7XG4gICAgICAgICAgICAgICAgaWYoaGFzRmxhZygndmFsdWUnKSkgdGhpc1RleHQucHVzaChob3ZlclB0LnZhbHVlTGFiZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBob3ZlclB0LmN1cnJlbnRQYXRoID0gcHQuY3VycmVudFBhdGggPSBoZWxwZXJzLmdldFBhdGgocHQuZGF0YSk7XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdjdXJyZW50IHBhdGgnKSAmJiAhaXNSb290KSB7XG4gICAgICAgICAgICAgICAgdGhpc1RleHQucHVzaChob3ZlclB0LmN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHR4O1xuICAgICAgICAgICAgdmFyIGFsbFBlcmNlbnRzID0gW107XG4gICAgICAgICAgICB2YXIgaW5zZXJ0UGVyY2VudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKGFsbFBlcmNlbnRzLmluZGV4T2YodHgpID09PSAtMSkgeyAvLyBubyBuZWVkIHRvIGFkZCByZWR1bmRhbnQgaW5mb1xuICAgICAgICAgICAgICAgICAgICB0aGlzVGV4dC5wdXNoKHR4KTtcbiAgICAgICAgICAgICAgICAgICAgYWxsUGVyY2VudHMucHVzaCh0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaG92ZXJQdC5wZXJjZW50UGFyZW50ID0gcHQucGVyY2VudFBhcmVudCA9IHZhbCAvIGhlbHBlcnMuZ2V0VmFsdWUocGFyZW50KTtcbiAgICAgICAgICAgIGhvdmVyUHQucGFyZW50ID0gcHQucGFyZW50U3RyaW5nID0gaGVscGVycy5nZXRQdExhYmVsKHBhcmVudCk7XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdwZXJjZW50IHBhcmVudCcpKSB7XG4gICAgICAgICAgICAgICAgdHggPSBoZWxwZXJzLmZvcm1hdFBlcmNlbnQoaG92ZXJQdC5wZXJjZW50UGFyZW50LCBzZXBhcmF0b3JzKSArICcgb2YgJyArIGhvdmVyUHQucGFyZW50O1xuICAgICAgICAgICAgICAgIGluc2VydFBlcmNlbnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaG92ZXJQdC5wZXJjZW50RW50cnkgPSBwdC5wZXJjZW50RW50cnkgPSB2YWwgLyBoZWxwZXJzLmdldFZhbHVlKGVudHJ5KTtcbiAgICAgICAgICAgIGhvdmVyUHQuZW50cnkgPSBwdC5lbnRyeSA9IGhlbHBlcnMuZ2V0UHRMYWJlbChlbnRyeSk7XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdwZXJjZW50IGVudHJ5JykgJiYgIWlzUm9vdCAmJiAhcHQub25QYXRoYmFyKSB7XG4gICAgICAgICAgICAgICAgdHggPSBoZWxwZXJzLmZvcm1hdFBlcmNlbnQoaG92ZXJQdC5wZXJjZW50RW50cnksIHNlcGFyYXRvcnMpICsgJyBvZiAnICsgaG92ZXJQdC5lbnRyeTtcbiAgICAgICAgICAgICAgICBpbnNlcnRQZXJjZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhvdmVyUHQucGVyY2VudFJvb3QgPSBwdC5wZXJjZW50Um9vdCA9IHZhbCAvIGhlbHBlcnMuZ2V0VmFsdWUoaGllcmFyY2h5KTtcbiAgICAgICAgICAgIGhvdmVyUHQucm9vdCA9IHB0LnJvb3QgPSBoZWxwZXJzLmdldFB0TGFiZWwoaGllcmFyY2h5KTtcbiAgICAgICAgICAgIGlmKGhhc0ZsYWcoJ3BlcmNlbnQgcm9vdCcpICYmICFpc1Jvb3QpIHtcbiAgICAgICAgICAgICAgICB0eCA9IGhlbHBlcnMuZm9ybWF0UGVyY2VudChob3ZlclB0LnBlcmNlbnRSb290LCBzZXBhcmF0b3JzKSArICcgb2YgJyArIGhvdmVyUHQucm9vdDtcbiAgICAgICAgICAgICAgICBpbnNlcnRQZXJjZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhvdmVyUHQudGV4dCA9IF9jYXN0KCdob3ZlcnRleHQnKSB8fCBfY2FzdCgndGV4dCcpO1xuICAgICAgICAgICAgaWYoaGFzRmxhZygndGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgdHggPSBob3ZlclB0LnRleHQ7XG4gICAgICAgICAgICAgICAgaWYoTGliLmlzVmFsaWRUZXh0VmFsdWUodHgpKSB0aGlzVGV4dC5wdXNoKHR4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdmVySXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgdHJhY2U6IHRyYWNlTm93LFxuICAgICAgICAgICAgICAgIHk6IGhvdmVyQ2VudGVyWSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzVGV4dC5qb2luKCc8YnI+JyksXG4gICAgICAgICAgICAgICAgbmFtZTogKGhvdmVydGVtcGxhdGUgfHwgaGFzRmxhZygnbmFtZScpKSA/IHRyYWNlTm93Lm5hbWUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29sb3I6IF9jYXN0KCdob3ZlcmxhYmVsLmJnY29sb3InKSB8fCBjZGkuY29sb3IsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IF9jYXN0KCdob3ZlcmxhYmVsLmJvcmRlcmNvbG9yJyksXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogX2Nhc3QoJ2hvdmVybGFiZWwuZm9udC5mYW1pbHknKSxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogX2Nhc3QoJ2hvdmVybGFiZWwuZm9udC5zaXplJyksXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiBfY2FzdCgnaG92ZXJsYWJlbC5mb250LmNvbG9yJyksXG4gICAgICAgICAgICAgICAgbmFtZUxlbmd0aDogX2Nhc3QoJ2hvdmVybGFiZWwubmFtZWxlbmd0aCcpLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogX2Nhc3QoJ2hvdmVybGFiZWwuYWxpZ24nKSxcbiAgICAgICAgICAgICAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIGhvdmVydGVtcGxhdGVMYWJlbHM6IGhvdmVyUHQsXG4gICAgICAgICAgICAgICAgZXZlbnREYXRhOiBbbWFrZUV2ZW50RGF0YShwdCwgdHJhY2VOb3csIG9wdHMuZXZlbnREYXRhS2V5cyldXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihpc1N1bmJ1cnN0KSB7XG4gICAgICAgICAgICAgICAgaG92ZXJJdGVtcy54MCA9IGhvdmVyQ2VudGVyWCAtIHB0LnJJbnNjcmliZWQgKiBwdC5ycHgxO1xuICAgICAgICAgICAgICAgIGhvdmVySXRlbXMueDEgPSBob3ZlckNlbnRlclggKyBwdC5ySW5zY3JpYmVkICogcHQucnB4MTtcbiAgICAgICAgICAgICAgICBob3Zlckl0ZW1zLmlkZWFsQWxpZ24gPSBwdC5weG1pZFswXSA8IDAgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNUcmVlbWFwKSB7XG4gICAgICAgICAgICAgICAgaG92ZXJJdGVtcy54ID0gaG92ZXJDZW50ZXJYO1xuICAgICAgICAgICAgICAgIGhvdmVySXRlbXMuaWRlYWxBbGlnbiA9IGhvdmVyQ2VudGVyWCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBGeC5sb25lSG92ZXIoaG92ZXJJdGVtcywge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogZnVsbExheW91dE5vdy5faG92ZXJsYXllci5ub2RlKCksXG4gICAgICAgICAgICAgICAgb3V0ZXJDb250YWluZXI6IGZ1bGxMYXlvdXROb3cuX3BhcGVyLm5vZGUoKSxcbiAgICAgICAgICAgICAgICBnZDogZ2RcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0cmFjZS5faGFzSG92ZXJMYWJlbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1RyZWVtYXApIHtcbiAgICAgICAgICAgIHZhciBzbGljZSA9IHNsaWNlVG9wLnNlbGVjdCgncGF0aC5zdXJmYWNlJyk7XG4gICAgICAgICAgICBvcHRzLnN0eWxlT25lKHNsaWNlLCBwdCwgdHJhY2VOb3csIHtcbiAgICAgICAgICAgICAgICBob3ZlcmVkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYWNlLl9oYXNIb3ZlckV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgZ2QuZW1pdCgncGxvdGx5X2hvdmVyJywge1xuICAgICAgICAgICAgcG9pbnRzOiBbbWFrZUV2ZW50RGF0YShwdCwgdHJhY2VOb3csIG9wdHMuZXZlbnREYXRhS2V5cyldLFxuICAgICAgICAgICAgZXZlbnQ6IGQzLmV2ZW50XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgb25Nb3VzZU91dCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICB2YXIgZnVsbExheW91dE5vdyA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgdHJhY2VOb3cgPSBnZC5fZnVsbERhdGFbdHJhY2UuaW5kZXhdO1xuICAgICAgICB2YXIgcHQgPSBkMy5zZWxlY3QodGhpcykuZGF0dW0oKTtcblxuICAgICAgICBpZih0cmFjZS5faGFzSG92ZXJFdmVudCkge1xuICAgICAgICAgICAgZXZ0Lm9yaWdpbmFsRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV91bmhvdmVyJywge1xuICAgICAgICAgICAgICAgIHBvaW50czogW21ha2VFdmVudERhdGEocHQsIHRyYWNlTm93LCBvcHRzLmV2ZW50RGF0YUtleXMpXSxcbiAgICAgICAgICAgICAgICBldmVudDogZDMuZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJhY2UuX2hhc0hvdmVyRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRyYWNlLl9oYXNIb3ZlckxhYmVsKSB7XG4gICAgICAgICAgICBGeC5sb25lVW5ob3ZlcihmdWxsTGF5b3V0Tm93Ll9ob3ZlcmxheWVyLm5vZGUoKSk7XG4gICAgICAgICAgICB0cmFjZS5faGFzSG92ZXJMYWJlbCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNUcmVlbWFwKSB7XG4gICAgICAgICAgICB2YXIgc2xpY2UgPSBzbGljZVRvcC5zZWxlY3QoJ3BhdGguc3VyZmFjZScpO1xuICAgICAgICAgICAgb3B0cy5zdHlsZU9uZShzbGljZSwgcHQsIHRyYWNlTm93LCB7XG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBvbkNsaWNrID0gZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyBkb2VzIG5vdCBzdXBwb3J0IHJpZ2h0LWNsaWNrLiBJZiB3ZSB3YW50IHRvIHN1cHBvcnQgaXQsIHdlXG4gICAgICAgIC8vIHdvdWxkIGxpa2VseSBuZWVkIHRvIGNoYW5nZSBwaWUgdG8gdXNlIGRyYWdFbGVtZW50IGluc3RlYWQgb2Ygc3RyYWlnaHRcbiAgICAgICAgLy8gbWFwYm94IGV2ZW50IGJpbmRpbmcuIE9yIHBlcmhhcHMgYmV0dGVyLCBtYWtlIGEgc2ltcGxlIHdyYXBwZXIgd2l0aCB0aGVcbiAgICAgICAgLy8gcmlnaHQgbW91c2Vkb3duLCBtb3VzZW1vdmUsIGFuZCBtb3VzZXVwIGhhbmRsZXJzIGp1c3QgZm9yIGEgbGVmdC9yaWdodCBjbGlja1xuICAgICAgICAvLyBtYXBib3ggd291bGQgdXNlIHRoaXMgdG9vLlxuICAgICAgICB2YXIgZnVsbExheW91dE5vdyA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgdHJhY2VOb3cgPSBnZC5fZnVsbERhdGFbdHJhY2UuaW5kZXhdO1xuXG4gICAgICAgIHZhciBub1RyYW5zaXRpb24gPSBpc1N1bmJ1cnN0ICYmIChoZWxwZXJzLmlzSGllcmFyY2h5Um9vdChwdCkgfHwgaGVscGVycy5pc0xlYWYocHQpKTtcblxuICAgICAgICB2YXIgaWQgPSBoZWxwZXJzLmdldFB0SWQocHQpO1xuICAgICAgICB2YXIgbmV4dEVudHJ5ID0gaGVscGVycy5pc0VudHJ5KHB0KSA/XG4gICAgICAgICAgICBoZWxwZXJzLmZpbmRFbnRyeVdpdGhDaGlsZChoaWVyYXJjaHksIGlkKSA6XG4gICAgICAgICAgICBoZWxwZXJzLmZpbmRFbnRyeVdpdGhMZXZlbChoaWVyYXJjaHksIGlkKTtcbiAgICAgICAgdmFyIG5leHRMZXZlbCA9IGhlbHBlcnMuZ2V0UHRJZChuZXh0RW50cnkpO1xuXG4gICAgICAgIHZhciB0eXBlQ2xpY2tFdnREYXRhID0ge1xuICAgICAgICAgICAgcG9pbnRzOiBbbWFrZUV2ZW50RGF0YShwdCwgdHJhY2VOb3csIG9wdHMuZXZlbnREYXRhS2V5cyldLFxuICAgICAgICAgICAgZXZlbnQ6IGQzLmV2ZW50XG4gICAgICAgIH07XG4gICAgICAgIGlmKCFub1RyYW5zaXRpb24pIHR5cGVDbGlja0V2dERhdGEubmV4dExldmVsID0gbmV4dExldmVsO1xuXG4gICAgICAgIHZhciBjbGlja1ZhbCA9IEV2ZW50cy50cmlnZ2VySGFuZGxlcihnZCwgJ3Bsb3RseV8nICsgdHJhY2UudHlwZSArICdjbGljaycsIHR5cGVDbGlja0V2dERhdGEpO1xuXG4gICAgICAgIGlmKGNsaWNrVmFsICE9PSBmYWxzZSAmJiBmdWxsTGF5b3V0Tm93LmhvdmVybW9kZSkge1xuICAgICAgICAgICAgZ2QuX2hvdmVyZGF0YSA9IFttYWtlRXZlbnREYXRhKHB0LCB0cmFjZU5vdywgb3B0cy5ldmVudERhdGFLZXlzKV07XG4gICAgICAgICAgICBGeC5jbGljayhnZCwgZDMuZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgY2xpY2sgZG9lcyBub3QgdHJpZ2dlciBhIHRyYW5zaXRpb24sIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmKG5vVHJhbnNpdGlvbikgcmV0dXJuO1xuXG4gICAgICAgIC8vIGlmIGN1c3RvbSBoYW5kbGVyIHJldHVybnMgZmFsc2UsIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmKGNsaWNrVmFsID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIHNraXAgaWYgdHJpZ2dlcmVkIGZyb20gZHJhZ2dpbmcgYSBuZWFyYnkgY2FydGVzaWFuIHN1YnBsb3RcbiAgICAgICAgaWYoZ2QuX2RyYWdnaW5nKSByZXR1cm47XG5cbiAgICAgICAgLy8gc2tpcCBkdXJpbmcgdHJhbnNpdGlvbnMsIHRvIGF2b2lkIHBvdGVudGlhbCBidWdzXG4gICAgICAgIC8vIHdlIGNvdWxkIHJlbW92ZSB0aGlzIGNoZWNrIGxhdGVyXG4gICAgICAgIGlmKGdkLl90cmFuc2l0aW9uaW5nKSByZXR1cm47XG5cbiAgICAgICAgLy8gc3RvcmUgJ29sZCcgbGV2ZWwgaW4gZ3VpRWRpdCBzdGFzaCwgc28gdGhhdCBzdWJzZXF1ZW50IFBsb3RseS5yZWFjdFxuICAgICAgICAvLyBjYWxscyB3aXRoIHRoZSBzYW1lIHVpcmV2aXNpb24gY2FuIHN0YXJ0IGZyb20gdGhlIHNhbWUgZW50cnlcbiAgICAgICAgUmVnaXN0cnkuY2FsbCgnX3N0b3JlRGlyZWN0R1VJRWRpdCcsIHRyYWNlTm93LCBmdWxsTGF5b3V0Tm93Ll90cmFjZVByZUdVSVt0cmFjZU5vdy51aWRdLCB7XG4gICAgICAgICAgICBsZXZlbDogdHJhY2VOb3cubGV2ZWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGZyYW1lID0ge1xuICAgICAgICAgICAgZGF0YTogW3tsZXZlbDogbmV4dExldmVsfV0sXG4gICAgICAgICAgICB0cmFjZXM6IFt0cmFjZS5pbmRleF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYW5pbU9wdHMgPSB7XG4gICAgICAgICAgICBmcmFtZToge1xuICAgICAgICAgICAgICAgIHJlZHJhdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IG9wdHMudHJhbnNpdGlvblRpbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IG9wdHMudHJhbnNpdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgZWFzaW5nOiBvcHRzLnRyYW5zaXRpb25FYXNpbmdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2RlOiAnaW1tZWRpYXRlJyxcbiAgICAgICAgICAgIGZyb21jdXJyZW50OiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgRngubG9uZVVuaG92ZXIoZnVsbExheW91dE5vdy5faG92ZXJsYXllci5ub2RlKCkpO1xuICAgICAgICBSZWdpc3RyeS5jYWxsKCdhbmltYXRlJywgZ2QsIGZyYW1lLCBhbmltT3B0cyk7XG4gICAgfTtcblxuICAgIHNsaWNlVG9wLm9uKCdtb3VzZW92ZXInLCBvbk1vdXNlT3Zlcik7XG4gICAgc2xpY2VUb3Aub24oJ21vdXNlb3V0Jywgb25Nb3VzZU91dCk7XG4gICAgc2xpY2VUb3Aub24oJ2NsaWNrJywgb25DbGljayk7XG59O1xuXG5mdW5jdGlvbiBtYWtlRXZlbnREYXRhKHB0LCB0cmFjZSwga2V5cykge1xuICAgIHZhciBjZGkgPSBwdC5kYXRhLmRhdGE7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICBjdXJ2ZU51bWJlcjogdHJhY2UuaW5kZXgsXG4gICAgICAgIHBvaW50TnVtYmVyOiBjZGkuaSxcbiAgICAgICAgZGF0YTogdHJhY2UuX2lucHV0LFxuICAgICAgICBmdWxsRGF0YTogdHJhY2UsXG5cbiAgICAgICAgLy8gVE9ETyBtb3JlIHRoaW5ncyBsaWtlICdjaGlsZHJlbicsICdzaWJsaW5ncycsICdoaWVyYXJjaHk/XG4gICAgfTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZihrZXkgaW4gcHQpIG91dFtrZXldID0gcHRba2V5XTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNwZWNpYWwgY2FzZSBvZiBwYXJlbnRcbiAgICBpZigncGFyZW50U3RyaW5nJyBpbiBwdCAmJiAhaGVscGVycy5pc0hpZXJhcmNoeVJvb3QocHQpKSBvdXQucGFyZW50ID0gcHQucGFyZW50U3RyaW5nO1xuXG4gICAgYXBwZW5kQXJyYXlQb2ludFZhbHVlKG91dCwgdHJhY2UsIGNkaS5pKTtcblxuICAgIHJldHVybiBvdXQ7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBzZXRDdXJzb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvc2V0Y3Vyc29yJyk7XG52YXIgcGllSGVscGVycyA9IHJlcXVpcmUoJy4uL3BpZS9oZWxwZXJzJyk7XG5cbmV4cG9ydHMuZmluZEVudHJ5V2l0aExldmVsID0gZnVuY3Rpb24oaGllcmFyY2h5LCBsZXZlbCkge1xuICAgIHZhciBvdXQ7XG4gICAgaWYobGV2ZWwpIHtcbiAgICAgICAgaGllcmFyY2h5LmVhY2hBZnRlcihmdW5jdGlvbihwdCkge1xuICAgICAgICAgICAgaWYoZXhwb3J0cy5nZXRQdElkKHB0KSA9PT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0ID0gcHQuY29weSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dCB8fCBoaWVyYXJjaHk7XG59O1xuXG5leHBvcnRzLmZpbmRFbnRyeVdpdGhDaGlsZCA9IGZ1bmN0aW9uKGhpZXJhcmNoeSwgY2hpbGRJZCkge1xuICAgIHZhciBvdXQ7XG4gICAgaGllcmFyY2h5LmVhY2hBZnRlcihmdW5jdGlvbihwdCkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBwdC5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmKGV4cG9ydHMuZ2V0UHRJZChjaGlsZCkgPT09IGNoaWxkSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0ID0gcHQuY29weSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dCB8fCBoaWVyYXJjaHk7XG59O1xuXG5leHBvcnRzLmlzRW50cnkgPSBmdW5jdGlvbihwdCkge1xuICAgIHJldHVybiAhcHQucGFyZW50O1xufTtcblxuZXhwb3J0cy5pc0xlYWYgPSBmdW5jdGlvbihwdCkge1xuICAgIHJldHVybiAhcHQuY2hpbGRyZW47XG59O1xuXG5leHBvcnRzLmdldFB0SWQgPSBmdW5jdGlvbihwdCkge1xuICAgIHJldHVybiBwdC5kYXRhLmRhdGEuaWQ7XG59O1xuXG5leHBvcnRzLmdldFB0TGFiZWwgPSBmdW5jdGlvbihwdCkge1xuICAgIHJldHVybiBwdC5kYXRhLmRhdGEubGFiZWw7XG59O1xuXG5leHBvcnRzLmdldFZhbHVlID0gZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLnZhbHVlO1xufTtcblxuZXhwb3J0cy5pc0hpZXJhcmNoeVJvb3QgPSBmdW5jdGlvbihwdCkge1xuICAgIHJldHVybiBnZXRQYXJlbnRJZChwdCkgPT09ICcnO1xufTtcblxuZXhwb3J0cy5zZXRTbGljZUN1cnNvciA9IGZ1bmN0aW9uKHNsaWNlVG9wLCBnZCwgb3B0cykge1xuICAgIHZhciBoaWRlID0gb3B0cy5pc1RyYW5zaXRpb25pbmc7XG4gICAgaWYoIWhpZGUpIHtcbiAgICAgICAgdmFyIHB0ID0gc2xpY2VUb3AuZGF0dW0oKTtcbiAgICAgICAgaGlkZSA9IChcbiAgICAgICAgICAgIChvcHRzLmhpZGVPblJvb3QgJiYgZXhwb3J0cy5pc0hpZXJhcmNoeVJvb3QocHQpKSB8fFxuICAgICAgICAgICAgKG9wdHMuaGlkZU9uTGVhdmVzICYmIGV4cG9ydHMuaXNMZWFmKHB0KSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgc2V0Q3Vyc29yKHNsaWNlVG9wLCBoaWRlID8gbnVsbCA6ICdwb2ludGVyJyk7XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVPdXRzaWRlVGV4dEZvbnQodHJhY2UsIHB0LCBsYXlvdXRGb250KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29sb3I6IGV4cG9ydHMuZ2V0T3V0c2lkZVRleHRGb250S2V5KCdjb2xvcicsIHRyYWNlLCBwdCwgbGF5b3V0Rm9udCksXG4gICAgICAgIGZhbWlseTogZXhwb3J0cy5nZXRPdXRzaWRlVGV4dEZvbnRLZXkoJ2ZhbWlseScsIHRyYWNlLCBwdCwgbGF5b3V0Rm9udCksXG4gICAgICAgIHNpemU6IGV4cG9ydHMuZ2V0T3V0c2lkZVRleHRGb250S2V5KCdzaXplJywgdHJhY2UsIHB0LCBsYXlvdXRGb250KVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZUluc2lkZVRleHRGb250KHRyYWNlLCBwdCwgbGF5b3V0Rm9udCwgb3B0cykge1xuICAgIHZhciBvblBhdGhiYXIgPSAob3B0cyB8fCB7fSkub25QYXRoYmFyO1xuXG4gICAgdmFyIGNkaSA9IHB0LmRhdGEuZGF0YTtcbiAgICB2YXIgcHROdW1iZXIgPSBjZGkuaTtcblxuICAgIHZhciBjdXN0b21Db2xvciA9IExpYi5jYXN0T3B0aW9uKHRyYWNlLCBwdE51bWJlcixcbiAgICAgICAgKG9uUGF0aGJhciA/ICdwYXRoYmFyLnRleHRmb250JyA6ICdpbnNpZGV0ZXh0Zm9udCcpICsgJy5jb2xvcidcbiAgICApO1xuXG4gICAgaWYoIWN1c3RvbUNvbG9yICYmIHRyYWNlLl9pbnB1dC50ZXh0Zm9udCkge1xuICAgICAgICAvLyBXaHkgbm90IHNpbXBseSB1c2luZyB0cmFjZS50ZXh0Zm9udD8gQmVjYXVzZSBpZiBub3Qgc2V0LCBpdFxuICAgICAgICAvLyBkZWZhdWx0cyB0byBsYXlvdXQuZm9udCB3aGljaCBoYXMgYSBkZWZhdWx0IGNvbG9yLiBCdXQgaWZcbiAgICAgICAgLy8gdGV4dGZvbnQuY29sb3IgYW5kIGluc2lkZXRleHRmb250LmNvbG9yIGRvbid0IHN1cHBseSBhIHZhbHVlLFxuICAgICAgICAvLyBhIGNvbnRyYXN0aW5nIGNvbG9yIHNoYWxsIGJlIHVzZWQuXG4gICAgICAgIGN1c3RvbUNvbG9yID0gTGliLmNhc3RPcHRpb24odHJhY2UuX2lucHV0LCBwdE51bWJlciwgJ3RleHRmb250LmNvbG9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29sb3I6IGN1c3RvbUNvbG9yIHx8IENvbG9yLmNvbnRyYXN0KGNkaS5jb2xvciksXG4gICAgICAgIGZhbWlseTogZXhwb3J0cy5nZXRJbnNpZGVUZXh0Rm9udEtleSgnZmFtaWx5JywgdHJhY2UsIHB0LCBsYXlvdXRGb250LCBvcHRzKSxcbiAgICAgICAgc2l6ZTogZXhwb3J0cy5nZXRJbnNpZGVUZXh0Rm9udEtleSgnc2l6ZScsIHRyYWNlLCBwdCwgbGF5b3V0Rm9udCwgb3B0cylcbiAgICB9O1xufVxuXG5leHBvcnRzLmdldEluc2lkZVRleHRGb250S2V5ID0gZnVuY3Rpb24oa2V5U3RyLCB0cmFjZSwgcHQsIGxheW91dEZvbnQsIG9wdHMpIHtcbiAgICB2YXIgb25QYXRoYmFyID0gKG9wdHMgfHwge30pLm9uUGF0aGJhcjtcbiAgICB2YXIgY29udCA9IG9uUGF0aGJhciA/ICdwYXRoYmFyLnRleHRmb250JyA6ICdpbnNpZGV0ZXh0Zm9udCc7XG4gICAgdmFyIHB0TnVtYmVyID0gcHQuZGF0YS5kYXRhLmk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBMaWIuY2FzdE9wdGlvbih0cmFjZSwgcHROdW1iZXIsIGNvbnQgKyAnLicgKyBrZXlTdHIpIHx8XG4gICAgICAgIExpYi5jYXN0T3B0aW9uKHRyYWNlLCBwdE51bWJlciwgJ3RleHRmb250LicgKyBrZXlTdHIpIHx8XG4gICAgICAgIGxheW91dEZvbnQuc2l6ZVxuICAgICk7XG59O1xuXG5leHBvcnRzLmdldE91dHNpZGVUZXh0Rm9udEtleSA9IGZ1bmN0aW9uKGtleVN0ciwgdHJhY2UsIHB0LCBsYXlvdXRGb250KSB7XG4gICAgdmFyIHB0TnVtYmVyID0gcHQuZGF0YS5kYXRhLmk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBMaWIuY2FzdE9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdvdXRzaWRldGV4dGZvbnQuJyArIGtleVN0cikgfHxcbiAgICAgICAgTGliLmNhc3RPcHRpb24odHJhY2UsIHB0TnVtYmVyLCAndGV4dGZvbnQuJyArIGtleVN0cikgfHxcbiAgICAgICAgbGF5b3V0Rm9udC5zaXplXG4gICAgKTtcbn07XG5cbmV4cG9ydHMuaXNPdXRzaWRlVGV4dCA9IGZ1bmN0aW9uKHRyYWNlLCBwdCkge1xuICAgIHJldHVybiAhdHJhY2UuX2hhc0NvbG9yc2NhbGUgJiYgZXhwb3J0cy5pc0hpZXJhcmNoeVJvb3QocHQpO1xufTtcblxuZXhwb3J0cy5kZXRlcm1pbmVUZXh0Rm9udCA9IGZ1bmN0aW9uKHRyYWNlLCBwdCwgbGF5b3V0Rm9udCwgb3B0cykge1xuICAgIHJldHVybiBleHBvcnRzLmlzT3V0c2lkZVRleHQodHJhY2UsIHB0KSA/XG4gICAgICAgIGRldGVybWluZU91dHNpZGVUZXh0Rm9udCh0cmFjZSwgcHQsIGxheW91dEZvbnQpIDpcbiAgICAgICAgZGV0ZXJtaW5lSW5zaWRlVGV4dEZvbnQodHJhY2UsIHB0LCBsYXlvdXRGb250LCBvcHRzKTtcbn07XG5cbmV4cG9ydHMuaGFzVHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHRyYW5zaXRpb25PcHRzKSB7XG4gICAgLy8gV2UgY291bGQgb3B0aW1pemUgaGFzVHJhbnNpdGlvbiBwZXIgdHJhY2UsXG4gICAgLy8gYXMgc3VuYnVyc3QgJiB0cmVlbWFwIGhhdmUgbm8gY3Jvc3MtdHJhY2UgbG9naWMhXG4gICAgcmV0dXJuICEhKHRyYW5zaXRpb25PcHRzICYmIHRyYW5zaXRpb25PcHRzLmR1cmF0aW9uID4gMCk7XG59O1xuXG5leHBvcnRzLmdldE1heERlcHRoID0gZnVuY3Rpb24odHJhY2UpIHtcbiAgICByZXR1cm4gdHJhY2UubWF4ZGVwdGggPj0gMCA/IHRyYWNlLm1heGRlcHRoIDogSW5maW5pdHk7XG59O1xuXG5leHBvcnRzLmlzSGVhZGVyID0gZnVuY3Rpb24ocHQsIHRyYWNlKSB7IC8vIGl0IGlzIG9ubHkgdXNlZCBpbiB0cmVlbWFwLlxuICAgIHJldHVybiAhKGV4cG9ydHMuaXNMZWFmKHB0KSB8fCBwdC5kZXB0aCA9PT0gdHJhY2UuX21heERlcHRoIC0gMSk7XG59O1xuXG5mdW5jdGlvbiBnZXRQYXJlbnRJZChwdCkge1xuICAgIHJldHVybiBwdC5kYXRhLmRhdGEucGlkO1xufVxuXG5leHBvcnRzLmdldFBhcmVudCA9IGZ1bmN0aW9uKGhpZXJhcmNoeSwgcHQpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5maW5kRW50cnlXaXRoTGV2ZWwoaGllcmFyY2h5LCBnZXRQYXJlbnRJZChwdCkpO1xufTtcblxuZXhwb3J0cy5saXN0UGF0aCA9IGZ1bmN0aW9uKGQsIGtleVN0cikge1xuICAgIHZhciBwYXJlbnQgPSBkLnBhcmVudDtcbiAgICBpZighcGFyZW50KSByZXR1cm4gW107XG4gICAgdmFyIGxpc3QgPSBrZXlTdHIgPyBbcGFyZW50LmRhdGFba2V5U3RyXV0gOiBbcGFyZW50XTtcbiAgICByZXR1cm4gZXhwb3J0cy5saXN0UGF0aChwYXJlbnQsIGtleVN0cikuY29uY2F0KGxpc3QpO1xufTtcblxuZXhwb3J0cy5nZXRQYXRoID0gZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBleHBvcnRzLmxpc3RQYXRoKGQsICdsYWJlbCcpLmpvaW4oJy8nKSArICcvJztcbn07XG5cbmV4cG9ydHMuZm9ybWF0VmFsdWUgPSBwaWVIZWxwZXJzLmZvcm1hdFBpZVZhbHVlO1xuXG4vLyBUT0RPOiBzaG91bGQgY29tYmluZSB0aGUgdHdvIGluIGEgc2VwYXJhdGUgUFIgLSBBbHNvIHBsZWFzZSBub3RlIExpYi5mb3JtYXRQZXJjZW50IHNob3VsZCBzdXBwb3J0IHNlcGFyYXRvcnMuXG5leHBvcnRzLmZvcm1hdFBlcmNlbnQgPSBmdW5jdGlvbih2LCBzZXBhcmF0b3JzKSB7XG4gICAgdmFyIHR4ID0gTGliLmZvcm1hdFBlcmNlbnQodiwgMCk7IC8vIHVzZSBmdW5uZWwoYXJlYSkgdmVyc2lvblxuICAgIGlmKHR4ID09PSAnMCUnKSB0eCA9IHBpZUhlbHBlcnMuZm9ybWF0UGllUGVyY2VudCh2LCBzZXBhcmF0b3JzKTsgLy8gdXNlIHBpZSB2ZXJzaW9uXG4gICAgcmV0dXJuIHR4O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBkM0hpZXJhcmNoeSA9IHJlcXVpcmUoJ2QzLWhpZXJhcmNoeScpO1xuXG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHN2Z1RleHRVdGlscyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdmdfdGV4dF91dGlscycpO1xudmFyIHVuaWZvcm1UZXh0ID0gcmVxdWlyZSgnLi4vYmFyL3VuaWZvcm1fdGV4dCcpO1xudmFyIHJlY29yZE1pblRleHRTaXplID0gdW5pZm9ybVRleHQucmVjb3JkTWluVGV4dFNpemU7XG52YXIgY2xlYXJNaW5UZXh0U2l6ZSA9IHVuaWZvcm1UZXh0LmNsZWFyTWluVGV4dFNpemU7XG52YXIgcGllUGxvdCA9IHJlcXVpcmUoJy4uL3BpZS9wbG90Jyk7XG52YXIgY29tcHV0ZVRyYW5zZm9ybSA9IHBpZVBsb3QuY29tcHV0ZVRyYW5zZm9ybTtcbnZhciB0cmFuc2Zvcm1JbnNpZGVUZXh0ID0gcGllUGxvdC50cmFuc2Zvcm1JbnNpZGVUZXh0O1xudmFyIHN0eWxlT25lID0gcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlT25lO1xudmFyIHJlc2l6ZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvc3R5bGUnKS5yZXNpemVUZXh0O1xudmFyIGF0dGFjaEZ4SGFuZGxlcnMgPSByZXF1aXJlKCcuL2Z4Jyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uKGdkLCBjZG1vZHVsZSwgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBsYXllciA9IGZ1bGxMYXlvdXQuX3N1bmJ1cnN0bGF5ZXI7XG4gICAgdmFyIGpvaW4sIG9uQ29tcGxldGU7XG5cbiAgICAvLyBJZiB0cmFuc2l0aW9uIGNvbmZpZyBpcyBwcm92aWRlZCwgdGhlbiBpdCBpcyBvbmx5IGEgcGFydGlhbCByZXBsb3QgYW5kIHRyYWNlcyBub3RcbiAgICAvLyB1cGRhdGVkIGFyZSByZW1vdmVkLlxuICAgIHZhciBpc0Z1bGxSZXBsb3QgPSAhdHJhbnNpdGlvbk9wdHM7XG4gICAgdmFyIGhhc1RyYW5zaXRpb24gPSAhZnVsbExheW91dC51bmlmb3JtdGV4dC5tb2RlICYmIGhlbHBlcnMuaGFzVHJhbnNpdGlvbih0cmFuc2l0aW9uT3B0cyk7XG5cbiAgICBjbGVhck1pblRleHRTaXplKCdzdW5idXJzdCcsIGZ1bGxMYXlvdXQpO1xuXG4gICAgam9pbiA9IGxheWVyLnNlbGVjdEFsbCgnZy50cmFjZS5zdW5idXJzdCcpXG4gICAgICAgIC5kYXRhKGNkbW9kdWxlLCBmdW5jdGlvbihjZCkgeyByZXR1cm4gY2RbMF0udHJhY2UudWlkOyB9KTtcblxuICAgIC8vIHVzaW5nIHNhbWUgJ3N0cm9rZS1saW5lam9pbicgYXMgcGllIHRyYWNlc1xuICAgIGpvaW4uZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZCgndHJhY2UnLCB0cnVlKVxuICAgICAgICAuY2xhc3NlZCgnc3VuYnVyc3QnLCB0cnVlKVxuICAgICAgICAuYXR0cignc3Ryb2tlLWxpbmVqb2luJywgJ3JvdW5kJyk7XG5cbiAgICBqb2luLm9yZGVyKCk7XG5cbiAgICBpZihoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgIGlmKG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIElmIGl0IHdhcyBwYXNzZWQgYSBjYWxsYmFjayB0byByZWdpc3RlciBjb21wbGV0aW9uLCBtYWtlIGEgY2FsbGJhY2suIElmXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGNyZWF0ZWQsIHRoZW4gaXQgbXVzdCBiZSBleGVjdXRlZCBvbiBjb21wbGV0aW9uLCBvdGhlcndpc2UgdGhlXG4gICAgICAgICAgICAvLyBwb3MtdHJhbnNpdGlvbiByZWRyYXcgd2lsbCBub3QgZXhlY3V0ZTpcbiAgICAgICAgICAgIG9uQ29tcGxldGUgPSBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKHRyYW5zaXRpb25PcHRzLmR1cmF0aW9uKVxuICAgICAgICAgICAgLmVhc2UodHJhbnNpdGlvbk9wdHMuZWFzaW5nKVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkgeyBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTsgfSlcbiAgICAgICAgICAgIC5lYWNoKCdpbnRlcnJ1cHQnLCBmdW5jdGlvbigpIHsgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7IH0pO1xuXG4gICAgICAgIHRyYW5zaXRpb24uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIE11c3QgcnVuIHRoZSBzZWxlY3Rpb24gYWdhaW4gc2luY2Ugb3RoZXJ3aXNlIGVudGVycy91cGRhdGVzIGdldCBncm91cGVkIHRvZ2V0aGVyXG4gICAgICAgICAgICAvLyBhbmQgdGhlc2UgZ2V0IGV4ZWN1dGVkIG91dCBvZiBvcmRlci4gRXhjZXB0IHdlIG5lZWQgdGhlbSBpbiBvcmRlciFcbiAgICAgICAgICAgIGxheWVyLnNlbGVjdEFsbCgnZy50cmFjZScpLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgICAgICAgICBwbG90T25lKGdkLCBjZCwgdGhpcywgdHJhbnNpdGlvbk9wdHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGpvaW4uZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICAgICAgcGxvdE9uZShnZCwgY2QsIHRoaXMsIHRyYW5zaXRpb25PcHRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoZnVsbExheW91dC51bmlmb3JtdGV4dC5tb2RlKSB7XG4gICAgICAgICAgICByZXNpemVUZXh0KGdkLCBmdWxsTGF5b3V0Ll9zdW5idXJzdGxheWVyLnNlbGVjdEFsbCgnLnRyYWNlJyksICdzdW5idXJzdCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoaXNGdWxsUmVwbG90KSB7XG4gICAgICAgIGpvaW4uZXhpdCgpLnJlbW92ZSgpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHBsb3RPbmUoZ2QsIGNkLCBlbGVtZW50LCB0cmFuc2l0aW9uT3B0cykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGhhc1RyYW5zaXRpb24gPSAhZnVsbExheW91dC51bmlmb3JtdGV4dC5tb2RlICYmIGhlbHBlcnMuaGFzVHJhbnNpdGlvbih0cmFuc2l0aW9uT3B0cyk7XG5cbiAgICB2YXIgZ1RyYWNlID0gZDMuc2VsZWN0KGVsZW1lbnQpO1xuICAgIHZhciBzbGljZXMgPSBnVHJhY2Uuc2VsZWN0QWxsKCdnLnNsaWNlJyk7XG5cbiAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgIHZhciBoaWVyYXJjaHkgPSBjZDAuaGllcmFyY2h5O1xuICAgIHZhciBlbnRyeSA9IGhlbHBlcnMuZmluZEVudHJ5V2l0aExldmVsKGhpZXJhcmNoeSwgdHJhY2UubGV2ZWwpO1xuICAgIHZhciBtYXhEZXB0aCA9IGhlbHBlcnMuZ2V0TWF4RGVwdGgodHJhY2UpO1xuXG4gICAgdmFyIGdzID0gZnVsbExheW91dC5fc2l6ZTtcbiAgICB2YXIgZG9tYWluID0gdHJhY2UuZG9tYWluO1xuICAgIHZhciB2cHcgPSBncy53ICogKGRvbWFpbi54WzFdIC0gZG9tYWluLnhbMF0pO1xuICAgIHZhciB2cGggPSBncy5oICogKGRvbWFpbi55WzFdIC0gZG9tYWluLnlbMF0pO1xuICAgIHZhciByTWF4ID0gMC41ICogTWF0aC5taW4odnB3LCB2cGgpO1xuICAgIHZhciBjeCA9IGNkMC5jeCA9IGdzLmwgKyBncy53ICogKGRvbWFpbi54WzFdICsgZG9tYWluLnhbMF0pIC8gMjtcbiAgICB2YXIgY3kgPSBjZDAuY3kgPSBncy50ICsgZ3MuaCAqICgxIC0gZG9tYWluLnlbMF0pIC0gdnBoIC8gMjtcblxuICAgIGlmKCFlbnRyeSkge1xuICAgICAgICByZXR1cm4gc2xpY2VzLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIHByZXZpb3VzIHJvb3QgJ3B0JyAoY2FuIGJlIGVtcHR5KVxuICAgIHZhciBwcmV2RW50cnkgPSBudWxsO1xuICAgIC8vIHN0YXNoIG9mICdwcmV2aW91cycgcG9zaXRpb24gZGF0YSB1c2VkIGJ5IHR3ZWVuaW5nIGZ1bmN0aW9uc1xuICAgIHZhciBwcmV2TG9va3VwID0ge307XG5cbiAgICBpZihoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgIC8vIEltcG9ydGFudDogZG8gdGhpcyBiZWZvcmUgYmluZGluZyBuZXcgc2xpY2VEYXRhIVxuICAgICAgICBzbGljZXMuZWFjaChmdW5jdGlvbihwdCkge1xuICAgICAgICAgICAgcHJldkxvb2t1cFtoZWxwZXJzLmdldFB0SWQocHQpXSA9IHtcbiAgICAgICAgICAgICAgICBycHgwOiBwdC5ycHgwLFxuICAgICAgICAgICAgICAgIHJweDE6IHB0LnJweDEsXG4gICAgICAgICAgICAgICAgeDA6IHB0LngwLFxuICAgICAgICAgICAgICAgIHgxOiBwdC54MSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHB0LnRyYW5zZm9ybVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYoIXByZXZFbnRyeSAmJiBoZWxwZXJzLmlzRW50cnkocHQpKSB7XG4gICAgICAgICAgICAgICAgcHJldkVudHJ5ID0gcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE4uQi4gc2xpY2UgZGF0YSBpc24ndCB0aGUgY2FsY2RhdGEsXG4gICAgLy8gZ3JhYiBjb3JyZXNwb25kaW5nIGNhbGNkYXRhIGl0ZW0gaW4gc2xpY2VEYXRhW2ldLmRhdGEuZGF0YVxuICAgIHZhciBzbGljZURhdGEgPSBwYXJ0aXRpb24oZW50cnkpLmRlc2NlbmRhbnRzKCk7XG5cbiAgICB2YXIgbWF4SGVpZ2h0ID0gZW50cnkuaGVpZ2h0ICsgMTtcbiAgICB2YXIgeU9mZnNldCA9IDA7XG4gICAgdmFyIGN1dG9mZiA9IG1heERlcHRoO1xuICAgIC8vIE4uQi4gaGFuZGxlIG11bHRpcGxlLXJvb3Qgc3BlY2lhbCBjYXNlXG4gICAgaWYoY2QwLmhhc011bHRpcGxlUm9vdHMgJiYgaGVscGVycy5pc0hpZXJhcmNoeVJvb3QoZW50cnkpKSB7XG4gICAgICAgIHNsaWNlRGF0YSA9IHNsaWNlRGF0YS5zbGljZSgxKTtcbiAgICAgICAgbWF4SGVpZ2h0IC09IDE7XG4gICAgICAgIHlPZmZzZXQgPSAxO1xuICAgICAgICBjdXRvZmYgKz0gMTtcbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNsaWNlcyB0aGF0IHdvbid0IHNob3cgdXAgb24gZ3JhcGhcbiAgICBzbGljZURhdGEgPSBzbGljZURhdGEuZmlsdGVyKGZ1bmN0aW9uKHB0KSB7IHJldHVybiBwdC55MSA8PSBjdXRvZmY7IH0pO1xuXG4gICAgLy8gcGFydGl0aW9uIHNwYW4gKCd5JykgdG8gc2VjdG9yIHJhZGlhbCBweCB2YWx1ZVxuICAgIHZhciBtYXhZID0gTWF0aC5taW4obWF4SGVpZ2h0LCBtYXhEZXB0aCk7XG4gICAgdmFyIHkycnB4ID0gZnVuY3Rpb24oeSkgeyByZXR1cm4gKHkgLSB5T2Zmc2V0KSAvIG1heFkgKiByTWF4OyB9O1xuICAgIC8vIChyYWRpYWwgcHggdmFsdWUsIHBhcnRpdGlvbiBhbmdsZSAoJ3gnKSkgIHRvIHB4IFt4LHldXG4gICAgdmFyIHJ4MnB4ID0gZnVuY3Rpb24ociwgeCkgeyByZXR1cm4gW3IgKiBNYXRoLmNvcyh4KSwgLXIgKiBNYXRoLnNpbih4KV07IH07XG4gICAgLy8gc2xpY2UgcGF0aCBnZW5lcmF0aW9uIGZuXG4gICAgdmFyIHBhdGhTbGljZSA9IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIExpYi5wYXRoQW5udWx1cyhkLnJweDAsIGQucnB4MSwgZC54MCwgZC54MSwgY3gsIGN5KTsgfTtcbiAgICAvLyBzbGljZSB0ZXh0IHRyYW5zbGF0ZSB4L3lcblxuICAgIHZhciBnZXRUYXJnZXRYID0gZnVuY3Rpb24oZCkgeyByZXR1cm4gY3ggKyBnZXRUZXh0WFkoZClbMF0gKiAoZC50cmFuc2Zvcm0uckNlbnRlciB8fCAwKSArIChkLnRyYW5zZm9ybS54IHx8IDApOyB9O1xuICAgIHZhciBnZXRUYXJnZXRZID0gZnVuY3Rpb24oZCkgeyByZXR1cm4gY3kgKyBnZXRUZXh0WFkoZClbMV0gKiAoZC50cmFuc2Zvcm0uckNlbnRlciB8fCAwKSArIChkLnRyYW5zZm9ybS55IHx8IDApOyB9O1xuXG4gICAgc2xpY2VzID0gc2xpY2VzLmRhdGEoc2xpY2VEYXRhLCBoZWxwZXJzLmdldFB0SWQpO1xuXG4gICAgc2xpY2VzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ3NsaWNlJywgdHJ1ZSk7XG5cbiAgICBpZihoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgIHNsaWNlcy5leGl0KCkudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpY2VUb3AgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2xpY2VQYXRoID0gc2xpY2VUb3Auc2VsZWN0KCdwYXRoLnN1cmZhY2UnKTtcbiAgICAgICAgICAgICAgICBzbGljZVBhdGgudHJhbnNpdGlvbigpLmF0dHJUd2VlbignZCcsIGZ1bmN0aW9uKHB0Mikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW50ZXJwID0gbWFrZUV4aXRTbGljZUludGVycG9sYXRvcihwdDIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gcGF0aFNsaWNlKGludGVycCh0KSk7IH07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2xpY2VUZXh0R3JvdXAgPSBzbGljZVRvcC5zZWxlY3QoJ2cuc2xpY2V0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgc2xpY2VUZXh0R3JvdXAuYXR0cignb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzbGljZXMuZXhpdCgpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHNsaWNlcy5vcmRlcigpO1xuXG4gICAgLy8gbmV4dCB4MSAoaS5lLiBzZWN0b3IgZW5kIGFuZ2xlKSBvZiBwcmV2aW91cyBlbnRyeVxuICAgIHZhciBuZXh0WDFvZlByZXZFbnRyeSA9IG51bGw7XG4gICAgaWYoaGFzVHJhbnNpdGlvbiAmJiBwcmV2RW50cnkpIHtcbiAgICAgICAgdmFyIHByZXZFbnRyeUlkID0gaGVscGVycy5nZXRQdElkKHByZXZFbnRyeSk7XG4gICAgICAgIHNsaWNlcy5lYWNoKGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgICAgICBpZihuZXh0WDFvZlByZXZFbnRyeSA9PT0gbnVsbCAmJiAoaGVscGVycy5nZXRQdElkKHB0KSA9PT0gcHJldkVudHJ5SWQpKSB7XG4gICAgICAgICAgICAgICAgbmV4dFgxb2ZQcmV2RW50cnkgPSBwdC54MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHVwZGF0ZVNsaWNlcyA9IHNsaWNlcztcbiAgICBpZihoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgIHVwZGF0ZVNsaWNlcyA9IHVwZGF0ZVNsaWNlcy50cmFuc2l0aW9uKCkuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBOLkIuIGdkLl90cmFuc2l0aW9uaW5nIGlzIChzdGlsbCkgKnRydWUqIGJ5IHRoZSB0aW1lXG4gICAgICAgICAgICAvLyB0cmFuc2l0aW9uIHVwZGF0ZXMgZ2V0IGhlcmVcbiAgICAgICAgICAgIHZhciBzbGljZVRvcCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIGhlbHBlcnMuc2V0U2xpY2VDdXJzb3Ioc2xpY2VUb3AsIGdkLCB7XG4gICAgICAgICAgICAgICAgaGlkZU9uUm9vdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoaWRlT25MZWF2ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgaXNUcmFuc2l0aW9uaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVNsaWNlcy5lYWNoKGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgIHZhciBzbGljZVRvcCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICB2YXIgc2xpY2VQYXRoID0gTGliLmVuc3VyZVNpbmdsZShzbGljZVRvcCwgJ3BhdGgnLCAnc3VyZmFjZScsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHMuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwdC5ycHgwID0geTJycHgocHQueTApO1xuICAgICAgICBwdC5ycHgxID0geTJycHgocHQueTEpO1xuICAgICAgICBwdC54bWlkID0gKHB0LngwICsgcHQueDEpIC8gMjtcbiAgICAgICAgcHQucHhtaWQgPSByeDJweChwdC5ycHgxLCBwdC54bWlkKTtcbiAgICAgICAgcHQubWlkYW5nbGUgPSAtKHB0LnhtaWQgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIHB0LnN0YXJ0YW5nbGUgPSAtKHB0LngwIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICBwdC5zdG9wYW5nbGUgPSAtKHB0LngxIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICBwdC5oYWxmYW5nbGUgPSAwLjUgKiBNYXRoLm1pbihMaWIuYW5nbGVEZWx0YShwdC54MCwgcHQueDEpIHx8IE1hdGguUEksIE1hdGguUEkpO1xuICAgICAgICBwdC5yaW5nID0gMSAtIChwdC5ycHgwIC8gcHQucnB4MSk7XG4gICAgICAgIHB0LnJJbnNjcmliZWQgPSBnZXRJbnNjcmliZWRSYWRpdXNGcmFjdGlvbihwdCwgdHJhY2UpO1xuXG4gICAgICAgIGlmKGhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHNsaWNlUGF0aC50cmFuc2l0aW9uKCkuYXR0clR3ZWVuKCdkJywgZnVuY3Rpb24ocHQyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVycCA9IG1ha2VVcGRhdGVTbGljZUludGVycG9sYXRvcihwdDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBwYXRoU2xpY2UoaW50ZXJwKHQpKTsgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpY2VQYXRoLmF0dHIoJ2QnLCBwYXRoU2xpY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpY2VUb3BcbiAgICAgICAgICAgIC5jYWxsKGF0dGFjaEZ4SGFuZGxlcnMsIGVudHJ5LCBnZCwgY2QsIHtcbiAgICAgICAgICAgICAgICBldmVudERhdGFLZXlzOiBjb25zdGFudHMuZXZlbnREYXRhS2V5cyxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uVGltZTogY29uc3RhbnRzLkNMSUNLX1RSQU5TSVRJT05fVElNRSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRWFzaW5nOiBjb25zdGFudHMuQ0xJQ0tfVFJBTlNJVElPTl9FQVNJTkdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2FsbChoZWxwZXJzLnNldFNsaWNlQ3Vyc29yLCBnZCwge1xuICAgICAgICAgICAgICAgIGhpZGVPblJvb3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgaGlkZU9uTGVhdmVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlzVHJhbnNpdGlvbmluZzogZ2QuX3RyYW5zaXRpb25pbmdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNsaWNlUGF0aC5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UpO1xuXG4gICAgICAgIHZhciBzbGljZVRleHRHcm91cCA9IExpYi5lbnN1cmVTaW5nbGUoc2xpY2VUb3AsICdnJywgJ3NsaWNldGV4dCcpO1xuICAgICAgICB2YXIgc2xpY2VUZXh0ID0gTGliLmVuc3VyZVNpbmdsZShzbGljZVRleHRHcm91cCwgJ3RleHQnLCAnJywgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgLy8gcHJvaGliaXQgdGV4IGludGVycHJldGF0aW9uIHVudGlsIHdlIGNhbiBoYW5kbGVcbiAgICAgICAgICAgIC8vIHRleCBhbmQgcmVndWxhciB0ZXh0IHRvZ2V0aGVyXG4gICAgICAgICAgICBzLmF0dHIoJ2RhdGEtbm90ZXgnLCAxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGZvbnQgPSBMaWIuZW5zdXJlVW5pZm9ybUZvbnRTaXplKGdkLCBoZWxwZXJzLmRldGVybWluZVRleHRGb250KHRyYWNlLCBwdCwgZnVsbExheW91dC5mb250KSk7XG5cbiAgICAgICAgc2xpY2VUZXh0LnRleHQoZXhwb3J0cy5mb3JtYXRTbGljZUxhYmVsKHB0LCBlbnRyeSwgdHJhY2UsIGNkLCBmdWxsTGF5b3V0KSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzbGljZXRleHQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLmZvbnQsIGZvbnQpXG4gICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG5cbiAgICAgICAgLy8gcG9zaXRpb24gdGhlIHRleHQgcmVsYXRpdmUgdG8gdGhlIHNsaWNlXG4gICAgICAgIHZhciB0ZXh0QkIgPSBEcmF3aW5nLmJCb3goc2xpY2VUZXh0Lm5vZGUoKSk7XG4gICAgICAgIHB0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybUluc2lkZVRleHQodGV4dEJCLCBwdCwgY2QwKTtcbiAgICAgICAgcHQudHJhbnNmb3JtLnRhcmdldFggPSBnZXRUYXJnZXRYKHB0KTtcbiAgICAgICAgcHQudHJhbnNmb3JtLnRhcmdldFkgPSBnZXRUYXJnZXRZKHB0KTtcblxuICAgICAgICB2YXIgc3RyVHJhbnNmb3JtID0gZnVuY3Rpb24oZCwgdGV4dEJCKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gZC50cmFuc2Zvcm07XG4gICAgICAgICAgICBjb21wdXRlVHJhbnNmb3JtKHRyYW5zZm9ybSwgdGV4dEJCKTtcblxuICAgICAgICAgICAgdHJhbnNmb3JtLmZvbnRTaXplID0gZm9udC5zaXplO1xuICAgICAgICAgICAgcmVjb3JkTWluVGV4dFNpemUodHJhY2UudHlwZSwgdHJhbnNmb3JtLCBmdWxsTGF5b3V0KTtcblxuICAgICAgICAgICAgcmV0dXJuIExpYi5nZXRUZXh0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgc2xpY2VUZXh0LnRyYW5zaXRpb24oKS5hdHRyVHdlZW4oJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKHB0Mikge1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnAgPSBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvcihwdDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBzdHJUcmFuc2Zvcm0oaW50ZXJwKHQpLCB0ZXh0QkIpOyB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGljZVRleHQuYXR0cigndHJhbnNmb3JtJywgc3RyVHJhbnNmb3JtKHB0LCB0ZXh0QkIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWFrZUV4aXRTbGljZUludGVycG9sYXRvcihwdCkge1xuICAgICAgICB2YXIgaWQgPSBoZWxwZXJzLmdldFB0SWQocHQpO1xuICAgICAgICB2YXIgcHJldiA9IHByZXZMb29rdXBbaWRdO1xuICAgICAgICB2YXIgZW50cnlQcmV2ID0gcHJldkxvb2t1cFtoZWxwZXJzLmdldFB0SWQoZW50cnkpXTtcbiAgICAgICAgdmFyIG5leHQ7XG5cbiAgICAgICAgaWYoZW50cnlQcmV2KSB7XG4gICAgICAgICAgICB2YXIgYSA9IHB0LngxID4gZW50cnlQcmV2LngxID8gMiAqIE1hdGguUEkgOiAwO1xuICAgICAgICAgICAgLy8gaWYgcHQgdG8gcmVtb3ZlOlxuICAgICAgICAgICAgLy8gLSBpZiAnYmVsb3cnIHdoZXJlIHRoZSByb290LW5vZGUgdXNlZCB0byBiZTogc2hyaW5rIGl0IHJhZGlhbGx5IGlud2FyZFxuICAgICAgICAgICAgLy8gLSBvdGhlcndpc2UsIGNvbGxhcHNlIGl0IGNsb2Nrd2lzZSBvciBjb3VudGVyY2xvY2t3aXNlIHdoaWNoIGV2ZXIgaXMgc2hvcnRlc3QgdG8gdGhldGE9MFxuICAgICAgICAgICAgbmV4dCA9IHB0LnJweDEgPCBlbnRyeVByZXYucnB4MSA/IHtycHgwOiAwLCBycHgxOiAwfSA6IHt4MDogYSwgeDE6IGF9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBoYXBwZW5zIHdoZW4gbWF4ZGVwdGggaXMgc2V0LCB3aGVuIGxlYXZlcyBtdXN0XG4gICAgICAgICAgICAvLyBiZSByZW1vdmVkIGFuZCB0aGUgcm9vdFB0IGlzIG5ldyAoaS5lLiBkb2VzIG5vdCBoYXZlIGEgJ3ByZXYnIG9iamVjdClcbiAgICAgICAgICAgIHZhciBwYXJlbnQ7XG4gICAgICAgICAgICB2YXIgcGFyZW50SWQgPSBoZWxwZXJzLmdldFB0SWQocHQucGFyZW50KTtcbiAgICAgICAgICAgIHNsaWNlcy5lYWNoKGZ1bmN0aW9uKHB0Mikge1xuICAgICAgICAgICAgICAgIGlmKGhlbHBlcnMuZ2V0UHRJZChwdDIpID09PSBwYXJlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50ID0gcHQyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHBhcmVudENoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICAgICAgdmFyIGNpO1xuICAgICAgICAgICAgcGFyZW50Q2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihwdDIsIGkpIHtcbiAgICAgICAgICAgICAgICBpZihoZWxwZXJzLmdldFB0SWQocHQyKSA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNpID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBuID0gcGFyZW50Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGludGVycCA9IGQzLmludGVycG9sYXRlKHBhcmVudC54MCwgcGFyZW50LngxKTtcbiAgICAgICAgICAgIG5leHQgPSB7XG4gICAgICAgICAgICAgICAgcnB4MDogck1heCwgcnB4MTogck1heCxcbiAgICAgICAgICAgICAgICB4MDogaW50ZXJwKGNpIC8gbiksIHgxOiBpbnRlcnAoKGNpICsgMSkgLyBuKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZShwcmV2LCBuZXh0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlVXBkYXRlU2xpY2VJbnRlcnBvbGF0b3IocHQpIHtcbiAgICAgICAgdmFyIHByZXYwID0gcHJldkxvb2t1cFtoZWxwZXJzLmdldFB0SWQocHQpXTtcbiAgICAgICAgdmFyIHByZXY7XG4gICAgICAgIHZhciBuZXh0ID0ge3gwOiBwdC54MCwgeDE6IHB0LngxLCBycHgwOiBwdC5ycHgwLCBycHgxOiBwdC5ycHgxfTtcblxuICAgICAgICBpZihwcmV2MCkge1xuICAgICAgICAgICAgLy8gaWYgcHQgYWxyZWFkeSBvbiBncmFwaCwgdGhpcyBpcyBlYXN5XG4gICAgICAgICAgICBwcmV2ID0gcHJldjA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBmb3IgbmV3IHB0czpcbiAgICAgICAgICAgIGlmKHByZXZFbnRyeSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRyYWNlIHdhcyB2aXNpYmxlIGJlZm9yZVxuICAgICAgICAgICAgICAgIGlmKHB0LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZihuZXh0WDFvZlByZXZFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3IGJyYW5jaCwgdHdpc3QgaXQgaW4gY2xvY2t3aXNlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3VudGVyY2xvY2t3aXNlIHdoaWNoIGV2ZXIgaXMgc2hvcnRlciB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRzIGZpbmFsIGFuZ2xlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHB0LngxID4gbmV4dFgxb2ZQcmV2RW50cnkgPyAyICogTWF0aC5QSSA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0ge3gwOiBhLCB4MTogYX07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXcgbGVhZiAod2hlbiBtYXhkZXB0aCBpcyBzZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdyBpdCByYWRpYWxseSBhbmQgYW5ndWxhcmx5IGZyb21cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0cyBwYXJlbnQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IHtycHgwOiByTWF4LCBycHgxOiByTWF4fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KHByZXYsIGludGVycFgwWDFGcm9tUGFyZW50KHB0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXcgcm9vdC1ub2RlLCBncm93IGl0IHJhZGlhbGx5XG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSB7cnB4MDogMCwgcnB4MTogMH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCBzZWN0b3Igb2YgbmV3IHRyYWNlcyBmcm9tIHRoZXRhPTBcbiAgICAgICAgICAgICAgICBwcmV2ID0ge3gwOiAwLCB4MTogMH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZDMuaW50ZXJwb2xhdGUocHJldiwgbmV4dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZVVwZGF0ZVRleHRJbnRlcnBvbGF0b3IocHQpIHtcbiAgICAgICAgdmFyIHByZXYwID0gcHJldkxvb2t1cFtoZWxwZXJzLmdldFB0SWQocHQpXTtcbiAgICAgICAgdmFyIHByZXY7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSBwdC50cmFuc2Zvcm07XG5cbiAgICAgICAgaWYocHJldjApIHtcbiAgICAgICAgICAgIHByZXYgPSBwcmV2MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXYgPSB7XG4gICAgICAgICAgICAgICAgcnB4MTogcHQucnB4MSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFBvc0FuZ2xlOiB0cmFuc2Zvcm0udGV4dFBvc0FuZ2xlLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlOiB0cmFuc2Zvcm0ucm90YXRlLFxuICAgICAgICAgICAgICAgICAgICByQ2VudGVyOiB0cmFuc2Zvcm0uckNlbnRlcixcbiAgICAgICAgICAgICAgICAgICAgeDogdHJhbnNmb3JtLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRyYW5zZm9ybS55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZm9yIG5ldyBwdHM6XG4gICAgICAgICAgICBpZihwcmV2RW50cnkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0cmFjZSB3YXMgdmlzaWJsZSBiZWZvcmVcbiAgICAgICAgICAgICAgICBpZihwdC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV4dFgxb2ZQcmV2RW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ldyBicmFuY2gsIHR3aXN0IGl0IGluIGNsb2Nrd2lzZSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY291bnRlcmNsb2Nrd2lzZSB3aGljaCBldmVyIGlzIHNob3J0ZXIgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0cyBmaW5hbCBhbmdsZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBwdC54MSA+IG5leHRYMW9mUHJldkVudHJ5ID8gMiAqIE1hdGguUEkgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldi54MCA9IHByZXYueDEgPSBhO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbGVhZlxuICAgICAgICAgICAgICAgICAgICAgICAgTGliLmV4dGVuZEZsYXQocHJldiwgaW50ZXJwWDBYMUZyb21QYXJlbnQocHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ldyByb290LW5vZGVcbiAgICAgICAgICAgICAgICAgICAgcHJldi54MCA9IHByZXYueDEgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb24gbmV3IHRyYWNlc1xuICAgICAgICAgICAgICAgIHByZXYueDAgPSBwcmV2LngxID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0UG9zQW5nbGVGbiA9IGQzLmludGVycG9sYXRlKHByZXYudHJhbnNmb3JtLnRleHRQb3NBbmdsZSwgcHQudHJhbnNmb3JtLnRleHRQb3NBbmdsZSk7XG4gICAgICAgIHZhciBycHgxRm4gPSBkMy5pbnRlcnBvbGF0ZShwcmV2LnJweDEsIHB0LnJweDEpO1xuICAgICAgICB2YXIgeDBGbiA9IGQzLmludGVycG9sYXRlKHByZXYueDAsIHB0LngwKTtcbiAgICAgICAgdmFyIHgxRm4gPSBkMy5pbnRlcnBvbGF0ZShwcmV2LngxLCBwdC54MSk7XG4gICAgICAgIHZhciBzY2FsZUZuID0gZDMuaW50ZXJwb2xhdGUocHJldi50cmFuc2Zvcm0uc2NhbGUsIHRyYW5zZm9ybS5zY2FsZSk7XG4gICAgICAgIHZhciByb3RhdGVGbiA9IGQzLmludGVycG9sYXRlKHByZXYudHJhbnNmb3JtLnJvdGF0ZSwgdHJhbnNmb3JtLnJvdGF0ZSk7XG5cbiAgICAgICAgLy8gc21vb3RoIG91dCBzdGFydC9lbmQgZnJvbSBlbnRyeSwgdG8gdHJ5IHRvIGtlZXAgdGV4dCBpbnNpZGUgc2VjdG9yXG4gICAgICAgIC8vIHdoaWxlIGtlZXBpbmcgdHJhbnNpdGlvbiBzbW9vdGhcbiAgICAgICAgdmFyIHBvdyA9IHRyYW5zZm9ybS5yQ2VudGVyID09PSAwID8gMyA6XG4gICAgICAgICAgICBwcmV2LnRyYW5zZm9ybS5yQ2VudGVyID09PSAwID8gMSAvIDMgOlxuICAgICAgICAgICAgMTtcbiAgICAgICAgdmFyIF9yQ2VudGVyRm4gPSBkMy5pbnRlcnBvbGF0ZShwcmV2LnRyYW5zZm9ybS5yQ2VudGVyLCB0cmFuc2Zvcm0uckNlbnRlcik7XG4gICAgICAgIHZhciByQ2VudGVyRm4gPSBmdW5jdGlvbih0KSB7IHJldHVybiBfckNlbnRlckZuKE1hdGgucG93KHQsIHBvdykpOyB9O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICB2YXIgcnB4MSA9IHJweDFGbih0KTtcbiAgICAgICAgICAgIHZhciB4MCA9IHgwRm4odCk7XG4gICAgICAgICAgICB2YXIgeDEgPSB4MUZuKHQpO1xuICAgICAgICAgICAgdmFyIHJDZW50ZXIgPSByQ2VudGVyRm4odCk7XG4gICAgICAgICAgICB2YXIgcHhtaWQgPSByeDJweChycHgxLCAoeDAgKyB4MSkgLyAyKTtcbiAgICAgICAgICAgIHZhciB0ZXh0UG9zQW5nbGUgPSB0ZXh0UG9zQW5nbGVGbih0KTtcblxuICAgICAgICAgICAgdmFyIGQgPSB7XG4gICAgICAgICAgICAgICAgcHhtaWQ6IHB4bWlkLFxuICAgICAgICAgICAgICAgIHJweDE6IHJweDEsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRQb3NBbmdsZTogdGV4dFBvc0FuZ2xlLFxuICAgICAgICAgICAgICAgICAgICByQ2VudGVyOiByQ2VudGVyLFxuICAgICAgICAgICAgICAgICAgICB4OiB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdHJhbnNmb3JtLnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZWNvcmRNaW5UZXh0U2l6ZSh0cmFjZS50eXBlLCB0cmFuc2Zvcm0sIGZ1bGxMYXlvdXQpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WDogZ2V0VGFyZ2V0WChkKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WTogZ2V0VGFyZ2V0WShkKSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IHNjYWxlRm4odCksXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogcm90YXRlRm4odCksXG4gICAgICAgICAgICAgICAgICAgIHJDZW50ZXI6IHJDZW50ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludGVycFgwWDFGcm9tUGFyZW50KHB0KSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBwdC5wYXJlbnQ7XG4gICAgICAgIHZhciBwYXJlbnRQcmV2ID0gcHJldkxvb2t1cFtoZWxwZXJzLmdldFB0SWQocGFyZW50KV07XG4gICAgICAgIHZhciBvdXQgPSB7fTtcblxuICAgICAgICBpZihwYXJlbnRQcmV2KSB7XG4gICAgICAgICAgICAvLyBpZiBwYXJlbnQgaXMgdmlzaWJsZVxuICAgICAgICAgICAgdmFyIHBhcmVudENoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICAgICAgdmFyIGNpID0gcGFyZW50Q2hpbGRyZW4uaW5kZXhPZihwdCk7XG4gICAgICAgICAgICB2YXIgbiA9IHBhcmVudENoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBpbnRlcnAgPSBkMy5pbnRlcnBvbGF0ZShwYXJlbnRQcmV2LngwLCBwYXJlbnRQcmV2LngxKTtcbiAgICAgICAgICAgIG91dC54MCA9IGludGVycChjaSAvIG4pO1xuICAgICAgICAgICAgb3V0LngxID0gaW50ZXJwKGNpIC8gbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3L28gdmlzaWJsZSBwYXJlbnRcbiAgICAgICAgICAgIC8vIFRPRE8gISEhIEhPVyA/Pz9cbiAgICAgICAgICAgIG91dC54MCA9IG91dC54MSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn1cblxuLy8geFswLTFdIGtleXMgYXJlIGFuZ2xlcyBbcmFkaWFuc11cbi8vIHlbMC0xXSBrZXlzIGFyZSBoaWVyYXJjaHkgaGVpZ2h0cyBbaW50ZWdlcnNdXG5mdW5jdGlvbiBwYXJ0aXRpb24oZW50cnkpIHtcbiAgICByZXR1cm4gZDNIaWVyYXJjaHkucGFydGl0aW9uKClcbiAgICAgICAgLnNpemUoWzIgKiBNYXRoLlBJLCBlbnRyeS5oZWlnaHQgKyAxXSkoZW50cnkpO1xufVxuXG5leHBvcnRzLmZvcm1hdFNsaWNlTGFiZWwgPSBmdW5jdGlvbihwdCwgZW50cnksIHRyYWNlLCBjZCwgZnVsbExheW91dCkge1xuICAgIHZhciB0ZXh0dGVtcGxhdGUgPSB0cmFjZS50ZXh0dGVtcGxhdGU7XG4gICAgdmFyIHRleHRpbmZvID0gdHJhY2UudGV4dGluZm87XG5cbiAgICBpZighdGV4dHRlbXBsYXRlICYmICghdGV4dGluZm8gfHwgdGV4dGluZm8gPT09ICdub25lJykpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBzZXBhcmF0b3JzID0gZnVsbExheW91dC5zZXBhcmF0b3JzO1xuICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICB2YXIgY2RpID0gcHQuZGF0YS5kYXRhO1xuICAgIHZhciBoaWVyYXJjaHkgPSBjZDAuaGllcmFyY2h5O1xuICAgIHZhciBpc1Jvb3QgPSBoZWxwZXJzLmlzSGllcmFyY2h5Um9vdChwdCk7XG4gICAgdmFyIHBhcmVudCA9IGhlbHBlcnMuZ2V0UGFyZW50KGhpZXJhcmNoeSwgcHQpO1xuICAgIHZhciB2YWwgPSBoZWxwZXJzLmdldFZhbHVlKHB0KTtcblxuICAgIGlmKCF0ZXh0dGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdGV4dGluZm8uc3BsaXQoJysnKTtcbiAgICAgICAgdmFyIGhhc0ZsYWcgPSBmdW5jdGlvbihmbGFnKSB7IHJldHVybiBwYXJ0cy5pbmRleE9mKGZsYWcpICE9PSAtMTsgfTtcbiAgICAgICAgdmFyIHRoaXNUZXh0ID0gW107XG4gICAgICAgIHZhciB0eDtcblxuICAgICAgICBpZihoYXNGbGFnKCdsYWJlbCcpICYmIGNkaS5sYWJlbCkge1xuICAgICAgICAgICAgdGhpc1RleHQucHVzaChjZGkubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2RpLmhhc093blByb3BlcnR5KCd2JykgJiYgaGFzRmxhZygndmFsdWUnKSkge1xuICAgICAgICAgICAgdGhpc1RleHQucHVzaChoZWxwZXJzLmZvcm1hdFZhbHVlKGNkaS52LCBzZXBhcmF0b3JzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighaXNSb290KSB7XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdjdXJyZW50IHBhdGgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXNUZXh0LnB1c2goaGVscGVycy5nZXRQYXRoKHB0LmRhdGEpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5QZXJjZW50ID0gMDtcbiAgICAgICAgICAgIGlmKGhhc0ZsYWcoJ3BlcmNlbnQgcGFyZW50JykpIG5QZXJjZW50Kys7XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdwZXJjZW50IGVudHJ5JykpIG5QZXJjZW50Kys7XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdwZXJjZW50IHJvb3QnKSkgblBlcmNlbnQrKztcbiAgICAgICAgICAgIHZhciBoYXNNdWx0aXBsZVBlcmNlbnRzID0gblBlcmNlbnQgPiAxO1xuXG4gICAgICAgICAgICBpZihuUGVyY2VudCkge1xuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50O1xuICAgICAgICAgICAgICAgIHZhciBhZGRQZXJjZW50ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHR4ID0gaGVscGVycy5mb3JtYXRQZXJjZW50KHBlcmNlbnQsIHNlcGFyYXRvcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGhhc011bHRpcGxlUGVyY2VudHMpIHR4ICs9ICcgb2YgJyArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1RleHQucHVzaCh0eCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmKGhhc0ZsYWcoJ3BlcmNlbnQgcGFyZW50JykgJiYgIWlzUm9vdCkge1xuICAgICAgICAgICAgICAgICAgICBwZXJjZW50ID0gdmFsIC8gaGVscGVycy5nZXRWYWx1ZShwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRQZXJjZW50KCdwYXJlbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCBlbnRyeScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQgPSB2YWwgLyBoZWxwZXJzLmdldFZhbHVlKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkUGVyY2VudCgnZW50cnknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCByb290JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IHZhbCAvIGhlbHBlcnMuZ2V0VmFsdWUoaGllcmFyY2h5KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkUGVyY2VudCgncm9vdCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhhc0ZsYWcoJ3RleHQnKSkge1xuICAgICAgICAgICAgdHggPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgY2RpLmksICd0ZXh0Jyk7XG4gICAgICAgICAgICBpZihMaWIuaXNWYWxpZFRleHRWYWx1ZSh0eCkpIHRoaXNUZXh0LnB1c2godHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNUZXh0LmpvaW4oJzxicj4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHh0ID0gTGliLmNhc3RPcHRpb24odHJhY2UsIGNkaS5pLCAndGV4dHRlbXBsYXRlJyk7XG4gICAgaWYoIXR4dCkgcmV0dXJuICcnO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZihjZGkubGFiZWwpIG9iai5sYWJlbCA9IGNkaS5sYWJlbDtcbiAgICBpZihjZGkuaGFzT3duUHJvcGVydHkoJ3YnKSkge1xuICAgICAgICBvYmoudmFsdWUgPSBjZGkudjtcbiAgICAgICAgb2JqLnZhbHVlTGFiZWwgPSBoZWxwZXJzLmZvcm1hdFZhbHVlKGNkaS52LCBzZXBhcmF0b3JzKTtcbiAgICB9XG5cbiAgICBvYmouY3VycmVudFBhdGggPSBoZWxwZXJzLmdldFBhdGgocHQuZGF0YSk7XG5cbiAgICBpZighaXNSb290KSB7XG4gICAgICAgIG9iai5wZXJjZW50UGFyZW50ID0gdmFsIC8gaGVscGVycy5nZXRWYWx1ZShwYXJlbnQpO1xuICAgICAgICBvYmoucGVyY2VudFBhcmVudExhYmVsID0gaGVscGVycy5mb3JtYXRQZXJjZW50KFxuICAgICAgICAgICAgb2JqLnBlcmNlbnRQYXJlbnQsIHNlcGFyYXRvcnNcbiAgICAgICAgKTtcbiAgICAgICAgb2JqLnBhcmVudCA9IGhlbHBlcnMuZ2V0UHRMYWJlbChwYXJlbnQpO1xuICAgIH1cblxuICAgIG9iai5wZXJjZW50RW50cnkgPSB2YWwgLyBoZWxwZXJzLmdldFZhbHVlKGVudHJ5KTtcbiAgICBvYmoucGVyY2VudEVudHJ5TGFiZWwgPSBoZWxwZXJzLmZvcm1hdFBlcmNlbnQoXG4gICAgICAgIG9iai5wZXJjZW50RW50cnksIHNlcGFyYXRvcnNcbiAgICApO1xuICAgIG9iai5lbnRyeSA9IGhlbHBlcnMuZ2V0UHRMYWJlbChlbnRyeSk7XG5cbiAgICBvYmoucGVyY2VudFJvb3QgPSB2YWwgLyBoZWxwZXJzLmdldFZhbHVlKGhpZXJhcmNoeSk7XG4gICAgb2JqLnBlcmNlbnRSb290TGFiZWwgPSBoZWxwZXJzLmZvcm1hdFBlcmNlbnQoXG4gICAgICAgIG9iai5wZXJjZW50Um9vdCwgc2VwYXJhdG9yc1xuICAgICk7XG4gICAgb2JqLnJvb3QgPSBoZWxwZXJzLmdldFB0TGFiZWwoaGllcmFyY2h5KTtcblxuICAgIGlmKGNkaS5oYXNPd25Qcm9wZXJ0eSgnY29sb3InKSkge1xuICAgICAgICBvYmouY29sb3IgPSBjZGkuY29sb3I7XG4gICAgfVxuICAgIHZhciBwdFR4ID0gTGliLmNhc3RPcHRpb24odHJhY2UsIGNkaS5pLCAndGV4dCcpO1xuICAgIGlmKExpYi5pc1ZhbGlkVGV4dFZhbHVlKHB0VHgpIHx8IHB0VHggPT09ICcnKSBvYmoudGV4dCA9IHB0VHg7XG4gICAgb2JqLmN1c3RvbWRhdGEgPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgY2RpLmksICdjdXN0b21kYXRhJyk7XG4gICAgcmV0dXJuIExpYi50ZXh0dGVtcGxhdGVTdHJpbmcodHh0LCBvYmosIGZ1bGxMYXlvdXQuX2QzbG9jYWxlLCBvYmosIHRyYWNlLl9tZXRhIHx8IHt9KTtcbn07XG5cbmZ1bmN0aW9uIGdldEluc2NyaWJlZFJhZGl1c0ZyYWN0aW9uKHB0KSB7XG4gICAgaWYocHQucnB4MCA9PT0gMCAmJiBMaWIuaXNGdWxsQ2lyY2xlKFtwdC54MCwgcHQueDFdKSkge1xuICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugb2YgMTAwJSB3aXRoIG5vIGhvbGVcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKFxuICAgICAgICAgICAgMSAvICgxICsgMSAvIE1hdGguc2luKHB0LmhhbGZhbmdsZSkpLFxuICAgICAgICAgICAgcHQucmluZyAvIDJcbiAgICAgICAgKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZXh0WFkoZCkge1xuICAgIHJldHVybiBnZXRDb29yZHMoZC5ycHgxLCBkLnRyYW5zZm9ybS50ZXh0UG9zQW5nbGUpO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZHMociwgYW5nbGUpIHtcbiAgICByZXR1cm4gW3IgKiBNYXRoLnNpbihhbmdsZSksIC1yICogTWF0aC5jb3MoYW5nbGUpXTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciByZXNpemVUZXh0ID0gcmVxdWlyZSgnLi4vYmFyL3VuaWZvcm1fdGV4dCcpLnJlc2l6ZVRleHQ7XG5cbmZ1bmN0aW9uIHN0eWxlKGdkKSB7XG4gICAgdmFyIHMgPSBnZC5fZnVsbExheW91dC5fc3VuYnVyc3RsYXllci5zZWxlY3RBbGwoJy50cmFjZScpO1xuICAgIHJlc2l6ZVRleHQoZ2QsIHMsICdzdW5idXJzdCcpO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBnVHJhY2UgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuXG4gICAgICAgIGdUcmFjZS5zdHlsZSgnb3BhY2l0eScsIHRyYWNlLm9wYWNpdHkpO1xuXG4gICAgICAgIGdUcmFjZS5zZWxlY3RBbGwoJ3BhdGguc3VyZmFjZScpLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPbmUocywgcHQsIHRyYWNlKSB7XG4gICAgdmFyIGNkaSA9IHB0LmRhdGEuZGF0YTtcbiAgICB2YXIgaXNMZWFmID0gIXB0LmNoaWxkcmVuO1xuICAgIHZhciBwdE51bWJlciA9IGNkaS5pO1xuICAgIHZhciBsaW5lQ29sb3IgPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdtYXJrZXIubGluZS5jb2xvcicpIHx8IENvbG9yLmRlZmF1bHRMaW5lO1xuICAgIHZhciBsaW5lV2lkdGggPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdtYXJrZXIubGluZS53aWR0aCcpIHx8IDA7XG5cbiAgICBzLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBsaW5lV2lkdGgpXG4gICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIGNkaS5jb2xvcilcbiAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBsaW5lQ29sb3IpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIGlzTGVhZiA/IHRyYWNlLmxlYWYub3BhY2l0eSA6IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgc3R5bGVPbmU6IHN0eWxlT25lXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==