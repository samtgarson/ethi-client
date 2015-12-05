(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var arr = [];
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var document = window.document, version = "2.1.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isPlainObject: function(obj) {
            if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            return true;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code);
            if (code) {
                if (code.indexOf("use strict") === 1) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild(script).parentNode.removeChild(script);
                } else {
                    indirect(code);
                }
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [ arr ] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (;j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (;i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) {
                for (;i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: Date.now,
        support: support
    });
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var Sizzle = function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
                hasDuplicate = true;
            }
            return 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            var i = 0, len = list.length;
            for (;i < len; i++) {
                if (list[i] === elem) {
                    return i;
                }
            }
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    var j = target.length, i = 0;
                    while (target[j++] = els[i++]) {}
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            nodeType = context.nodeType;
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results;
            }
            if (!seed && documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                    if (m = match[1]) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;
                    } else if ((m = match[3]) && support.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType !== 1 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if (old = context.getAttribute("id")) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results;
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return cache[key + " "] = value;
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                div = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"), i = attrs.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while (cur = cur.nextSibling) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[j = matchIndexes[i]]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = doc.documentElement;
            parent = doc.defaultView;
            if (parent && parent !== parent.top) {
                if (parent.addEventListener) {
                    parent.addEventListener("unload", unloadHandler, false);
                } else if (parent.attachEvent) {
                    parent.attachEvent("onunload", unloadHandler);
                }
            }
            documentIsHTML = !isXML(doc);
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [ m ] : [];
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== "undefined") {
                    return context.getElementsByTagName(tag);
                } else if (support.qsa) {
                    return context.querySelectorAll(tag);
                }
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while (elem = results[i++]) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support.qsa = rnative.test(doc.querySelectorAll)) {
                assert(function(div) {
                    docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
                    if (div.querySelectorAll("[msallowcapture^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=");
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                    if (!div.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]");
                    }
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
                if (b) {
                    while (b = b.parentNode) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                }
                return compare & 4 ? -1 : 1;
            } : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while (cur = cur.parentNode) {
                    ap.unshift(cur);
                }
                cur = b;
                while (cur = cur.parentNode) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                while (node = elem[i++]) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                CHILD: function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +(match[7] + match[8] || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [ forward ? parent.firstChild : parent.lastChild ];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                diff = cache[1];
                            } else {
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        if (useCache) {
                                            (node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ];
                                        }
                                        if (node === elem) {
                                            break;
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if (elem = unmatched[i]) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        input[0] = null;
                        return !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    text = text.replace(runescape, funescape);
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === false;
                },
                disabled: function(elem) {
                    return elem.disabled === true;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                parent: function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                text: function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;--i >= 0; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;++i < length; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = "";
            for (;i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && dir === "parentNode", doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while (elem = elem[dir]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return newCache[2] = oldCache[2];
                            } else {
                                outerCache[dir] = newCache;
                                if (newCache[2] = matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (;i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (;i < len; i++) {
                if (elem = unmatched[i]) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if (elem = temp[i]) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if (elem = matcherOut[i]) {
                                    temp.push(matcherIn[i] = elem);
                                }
                            }
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                checkContext = null;
                return ret;
            } ];
            for (;i < len; i++) {
                if (matcher = Expr.relative[tokens[i].type]) {
                    matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (;j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1, len = elems.length;
                if (outermost) {
                    outermostContext = context !== document && context;
                }
                for (;i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;
                        while (matcher = elementMatchers[j++]) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }
                    if (bySet) {
                        if (elem = !matcher && elem) {
                            matchedCount--;
                        }
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while (matcher = setMatchers[j++]) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        };
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[type = token.type]) {
                        break;
                    }
                    if (find = Expr.find[type]) {
                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    }(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple = /^.[^:#\[\.,]*$/;
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not;
            });
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) {
            return this;
        }
        if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                match = [ null, selector, null ];
            } else {
                match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                } else {
                    elem = document.getElementById(match[2]);
                    if (elem && elem.parentNode) {
                        this.length = 1;
                        this[0] = elem;
                    }
                    this.context = document;
                    this.selector = selector;
                    return this;
                }
            } else if (!context || context.jquery) {
                return (context || rootjQuery).find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        } else if (jQuery.isFunction(selector)) {
            return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        },
        sibling: function(n, elem) {
            var matched = [];
            for (;n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        }
    });
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                var i = 0;
                for (;i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (;i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break;
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem);
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    jQuery.unique(matched);
                }
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }
            return this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g;
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (;list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false;
                    break;
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift());
                    }
                } else if (memory) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && type !== "string") {
                                add(arg);
                            }
                        });
                    })(arguments);
                    if (firing) {
                        firingLength = list.length;
                    } else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            remove: function() {
                if (list) {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--;
                                }
                                if (index <= firingIndex) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            empty: function() {
                list = [];
                firingLength = 0;
                return this;
            },
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                stack = undefined;
                if (!memory) {
                    self.disable();
                }
                return this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    if (firing) {
                        stack.push(args);
                    } else {
                        fire(args);
                    }
                }
                return this;
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                } else {
                                    newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(subordinate) {
            var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values);
                    } else if (!--remaining) {
                        deferred.resolveWith(contexts, values);
                    }
                };
            }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (;i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        jQuery.ready.promise().done(fn);
        return this;
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [ jQuery ]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready();
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready);
            } else {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            }
        }
        return readyList.promise(obj);
    };
    jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (;i < len; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    };
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });
        this.expando = jQuery.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.accepts = jQuery.acceptData;
    Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) {
                return 0;
            }
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    };
                    Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock;
                    jQuery.extend(owner, descriptor);
                }
            }
            if (!this.cache[unlock]) {
                this.cache[unlock] = {};
            }
            return unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if (typeof data === "string") {
                cache[data] = value;
            } else {
                if (jQuery.isEmptyObject(cache)) {
                    jQuery.extend(this.cache[unlock], data);
                } else {
                    for (prop in data) {
                        cache[prop] = data[prop];
                    }
                }
            }
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return key === undefined ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            if (key === undefined || key && typeof key === "string" && value === undefined) {
                stored = this.get(owner, key);
                return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (key === undefined) {
                this.cache[unlock] = {};
            } else {
                if (jQuery.isArray(key)) {
                    name = key.concat(key.map(jQuery.camelCase));
                } else {
                    camel = jQuery.camelCase(key);
                    if (key in cache) {
                        name = [ key, camel ];
                    } else {
                        name = camel;
                        name = name in cache ? [ name ] : name.match(rnotwhite) || [];
                    }
                }
                i = name.length;
                while (i--) {
                    delete cache[name[i]];
                }
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            if (owner[this.expando]) {
                delete this.cache[owner[this.expando]];
            }
        }
    };
    var data_priv = new Data();
    var data_user = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                data_user.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = data_user.get(elem);
                    if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        data_priv.set(elem, "hasDataAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    data_user.set(this, key);
                });
            }
            return access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && value === undefined) {
                    data = data_user.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    data = data_user.get(elem, camelKey);
                    if (data !== undefined) {
                        return data;
                    }
                    data = dataAttr(elem, camelKey, undefined);
                    if (data !== undefined) {
                        return data;
                    }
                    return;
                }
                this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value);
                    if (key.indexOf("-") !== -1 && data !== undefined) {
                        data_user.set(this, key, value);
                    }
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = data_priv.get(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = data_priv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!--count) {
                    defer.resolveWith(elements, [ elements ]);
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = data_priv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
    var isHidden = function(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };
    var rcheckableType = /^(?:checkbox|radio)$/i;
    (function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var strundefined = typeof undefined;
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                data_priv.remove(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [ event ] : jQuery.makeArray(data, [ event ]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (;cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                    if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                for (;cur !== this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }
                return event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && e.preventDefault) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && e.stopPropagation) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    data_priv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        data_priv.remove(doc, fix);
                    } else {
                        data_priv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    function setGlobalEval(elems, refElements) {
        var i = 0, l = elems.length;
        for (;i < l; i++) {
            data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
        }
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
            return;
        }
        if (data_priv.hasData(src)) {
            pdataOld = data_priv.access(src);
            pdataCur = data_priv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }
        if (data_user.hasData(src)) {
            udataOld = data_user.access(src);
            udataCur = jQuery.extend({}, udataOld);
            data_user.set(dest, udataCur);
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
            for (;i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp = fragment.firstChild;
                        tmp.textContent = "";
                    }
                }
            }
            fragment.textContent = "";
            i = 0;
            while (elem = nodes[i++]) {
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(fragment.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while (elem = tmp[j++]) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        },
        cleanData: function(elems) {
            var data, elem, type, key, special = jQuery.event.special, i = 0;
            for (;(elem = elems[i]) !== undefined; i++) {
                if (jQuery.acceptData(elem)) {
                    key = elem[data_priv.expando];
                    if (key && (data = data_priv.cache[key])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (data_priv.cache[key]) {
                            delete data_priv.cache[key];
                        }
                    }
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    });
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = value;
                    }
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
            for (;(elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;(elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.textContent = "";
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;
                jQuery.cleanData(getAll(this));
                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (;i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                }
            }
            return this;
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (;i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        elem.detach();
        return display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                doc = iframe[0].contentDocument;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    var rmargin = /^margin/;
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function(elem) {
        if (elem.ownerDocument.defaultView.opener) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        }
        return window.getComputedStyle(elem, null);
    };
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
        }
        if (computed) {
            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }
            if (rnumnonpx.test(ret) && rmargin.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
        return ret !== undefined ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                if (conditionFn()) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    (function() {
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        if (!div.style) {
            return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
        container.appendChild(div);
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
            div.innerHTML = "";
            docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = divStyle.top !== "1%";
            boxSizingReliableVal = divStyle.width === "4px";
            docElem.removeChild(container);
        }
        if (window.getComputedStyle) {
            jQuery.extend(support, {
                pixelPosition: function() {
                    computePixelPositionAndBoxSizingReliable();
                    return pixelPositionVal;
                },
                boxSizingReliable: function() {
                    if (boxSizingReliableVal == null) {
                        computePixelPositionAndBoxSizingReliable();
                    }
                    return boxSizingReliableVal;
                },
                reliableMarginRight: function() {
                    var ret, marginDiv = div.appendChild(document.createElement("div"));
                    marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";
                    docElem.appendChild(container);
                    ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
                    docElem.removeChild(container);
                    div.removeChild(marginDiv);
                    return ret;
                }
            });
        }
    })();
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0, val = 0;
        for (;i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true, val = name === "width" ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        var display, elem, hidden, values = [], index = 0, length = elements.length;
        for (;index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = data_priv.get(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);
                if (display !== "none" || !hidden) {
                    data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    style[name] = value;
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            return jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [ elem, "marginRight" ]);
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [ value ];
                for (;i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (;i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3];
                parts = parts || [];
                start = +target || 1;
                do {
                    scale = scale || ".5";
                    start = start / scale;
                    jQuery.style(tween.elem, prop, start + unit);
                } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
            }
            if (parts) {
                start = tween.start = +start || +target || 0;
                tween.unit = unit;
                tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
            }
            return tween;
        } ]
    };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        includeWidth = includeWidth ? 1 : 0;
        for (;i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length;
        for (;index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
            display = jQuery.css(elem, "display");
            checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                style.display = "inline-block";
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            } else {
                display = undefined;
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = data_priv.access(elem, "fxshow", {});
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) {
                return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
            for (;index < length; index++) {
                animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [ animation, percent, remaining ]);
            if (percent < 1 && length) {
                return remaining;
            } else {
                deferred.resolveWith(elem, [ animation ]);
                return false;
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                    return this;
                }
                stopped = true;
                for (;index < length; index++) {
                    animation.tweens[index].run(1);
                }
                if (gotoEnd) {
                    deferred.resolveWith(elem, [ animation, gotoEnd ]);
                } else {
                    deferred.rejectWith(elem, [ animation, gotoEnd ]);
                }
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (;index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }
            var prop, index = 0, length = props.length;
            for (;index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty || data_priv.get(this, "finish")) {
                    anim.stop(true);
                }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = jQuery.now();
        for (;i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };
    (function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = jQuery.find.attr(elem, name);
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while (name = attrNames[i++]) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        elem[propName] = false;
                    }
                    elem.removeAttribute(name);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle;
            }
            return ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    });
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            }
        };
    }
    jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = typeof value === "string" && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = arguments.length === 0 || typeof value === "string" && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || [];
                    while (className = classNames[i++]) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        data_priv.set(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ", i = 0, l = this.length;
            for (;i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    for (;i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (option.selected = jQuery.inArray(option.value, values) >= 0) {
                            optionSet = true;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now();
    var rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    };
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            tmp = new DOMParser();
            xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), ajaxLocation = window.location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while (dataType = dataTypes[i++]) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev;
                } else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while (match = rheaders.exec(responseHeadersString)) {
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                },
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    if (!state) {
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                overrideMimeType: function(type) {
                    if (!state) {
                        s.mimeType = type;
                    }
                    return this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) {
                        if (state < 2) {
                            for (code in map) {
                                statusCode[code] = [ statusCode[code], map[code] ];
                            }
                        } else {
                            jqXHR.always(map[jqXHR.status]);
                        }
                    }
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    } else if (status === 304) {
                        statusText = "notmodified";
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
                } else {
                    deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
                }
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                    if (!--jQuery.active) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.attachEvent) {
        window.attachEvent("onunload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key]();
            }
        });
    }
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
        var callback;
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    xhr.open(options.type, options.url, options.async, options.username, options.password);
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }
                    callback = function(type) {
                        return function() {
                            if (callback) {
                                delete xhrCallbacks[id];
                                callback = xhr.onload = xhr.onerror = null;
                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {
                                    complete(xhr.status, xhr.statusText);
                                } else {
                                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {
                                        text: xhr.responseText
                                    } : undefined, xhr.getAllResponseHeaders());
                                }
                            }
                        };
                    };
                    xhr.onload = callback();
                    xhr.onerror = callback("error");
                    callback = xhrCallbacks[id] = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {
                        if (callback) {
                            throw e;
                        }
                    }
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: true,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                            complete(evt.type === "error" ? 404 : 200, evt.type);
                        }
                    });
                    document.head.appendChild(script[0]);
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        if (parsed) {
            return [ context.createElement(parsed[1]) ];
        }
        parsed = jQuery.buildFragment([ data ], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = jQuery.trim(url.slice(off));
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }
        return this;
    };
    jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        },
        position: function() {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, elem = this[0], parentOffset = {
                top: 0,
                left: 0
            };
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });
    jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
        });
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});
(function(window, document, undefined) {
    "use strict";
    function minErr(module, ErrorConstructor) {
        ErrorConstructor = ErrorConstructor || Error;
        return function() {
            var SKIP_INDEXES = 2;
            var templateArgs = arguments, code = templateArgs[0], message = "[" + (module ? module + ":" : "") + code + "] ", template = templateArgs[1], paramPrefix, i;
            message += template.replace(/\{\d+\}/g, function(match) {
                var index = +match.slice(1, -1), shiftedIndex = index + SKIP_INDEXES;
                if (shiftedIndex < templateArgs.length) {
                    return toDebugString(templateArgs[shiftedIndex]);
                }
                return match;
            });
            message += "\nhttp://errors.angularjs.org/1.4.1/" + (module ? module + "/" : "") + code;
            for (i = SKIP_INDEXES, paramPrefix = "?"; i < templateArgs.length; i++, paramPrefix = "&") {
                message += paramPrefix + "p" + (i - SKIP_INDEXES) + "=" + encodeURIComponent(toDebugString(templateArgs[i]));
            }
            return new ErrorConstructor(message);
        };
    }
    var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/;
    var VALIDITY_STATE_PROPERTY = "validity";
    var lowercase = function(string) {
        return isString(string) ? string.toLowerCase() : string;
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var uppercase = function(string) {
        return isString(string) ? string.toUpperCase() : string;
    };
    var manualLowercase = function(s) {
        return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
            return String.fromCharCode(ch.charCodeAt(0) | 32);
        }) : s;
    };
    var manualUppercase = function(s) {
        return isString(s) ? s.replace(/[a-z]/g, function(ch) {
            return String.fromCharCode(ch.charCodeAt(0) & ~32);
        }) : s;
    };
    if ("i" !== "I".toLowerCase()) {
        lowercase = manualLowercase;
        uppercase = manualUppercase;
    }
    var msie, jqLite, jQuery, slice = [].slice, splice = [].splice, push = [].push, toString = Object.prototype.toString, getPrototypeOf = Object.getPrototypeOf, ngMinErr = minErr("ng"), angular = window.angular || (window.angular = {}), angularModule, uid = 0;
    msie = document.documentMode;
    function isArrayLike(obj) {
        if (obj == null || isWindow(obj)) {
            return false;
        }
        var length = "length" in Object(obj) && obj.length;
        if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
            return true;
        }
        return isString(obj) || isArray(obj) || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    function forEach(obj, iterator, context) {
        var key, length;
        if (obj) {
            if (isFunction(obj)) {
                for (key in obj) {
                    if (key != "prototype" && key != "length" && key != "name" && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (isArray(obj) || isArrayLike(obj)) {
                var isPrimitive = typeof obj !== "object";
                for (key = 0, length = obj.length; key < length; key++) {
                    if (isPrimitive || key in obj) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (obj.forEach && obj.forEach !== forEach) {
                obj.forEach(iterator, context, obj);
            } else if (isBlankObject(obj)) {
                for (key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            } else if (typeof obj.hasOwnProperty === "function") {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else {
                for (key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        }
        return obj;
    }
    function forEachSorted(obj, iterator, context) {
        var keys = Object.keys(obj).sort();
        for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
        }
        return keys;
    }
    function reverseParams(iteratorFn) {
        return function(value, key) {
            iteratorFn(key, value);
        };
    }
    function nextUid() {
        return ++uid;
    }
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        } else {
            delete obj.$$hashKey;
        }
    }
    function baseExtend(dst, objs, deep) {
        var h = dst.$$hashKey;
        for (var i = 0, ii = objs.length; i < ii; ++i) {
            var obj = objs[i];
            if (!isObject(obj) && !isFunction(obj)) continue;
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var src = obj[key];
                if (deep && isObject(src)) {
                    if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
                    baseExtend(dst[key], [ src ], true);
                } else {
                    dst[key] = src;
                }
            }
        }
        setHashKey(dst, h);
        return dst;
    }
    function extend(dst) {
        return baseExtend(dst, slice.call(arguments, 1), false);
    }
    function merge(dst) {
        return baseExtend(dst, slice.call(arguments, 1), true);
    }
    function toInt(str) {
        return parseInt(str, 10);
    }
    function inherit(parent, extra) {
        return extend(Object.create(parent), extra);
    }
    function noop() {}
    noop.$inject = [];
    function identity($) {
        return $;
    }
    identity.$inject = [];
    function valueFn(value) {
        return function() {
            return value;
        };
    }
    function isUndefined(value) {
        return typeof value === "undefined";
    }
    function isDefined(value) {
        return typeof value !== "undefined";
    }
    function isObject(value) {
        return value !== null && typeof value === "object";
    }
    function isBlankObject(value) {
        return value !== null && typeof value === "object" && !getPrototypeOf(value);
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    function isDate(value) {
        return toString.call(value) === "[object Date]";
    }
    var isArray = Array.isArray;
    function isFunction(value) {
        return typeof value === "function";
    }
    function isRegExp(value) {
        return toString.call(value) === "[object RegExp]";
    }
    function isWindow(obj) {
        return obj && obj.window === obj;
    }
    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
        return toString.call(obj) === "[object File]";
    }
    function isFormData(obj) {
        return toString.call(obj) === "[object FormData]";
    }
    function isBlob(obj) {
        return toString.call(obj) === "[object Blob]";
    }
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    function isPromiseLike(obj) {
        return obj && isFunction(obj.then);
    }
    var TYPED_ARRAY_REGEXP = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/;
    function isTypedArray(value) {
        return TYPED_ARRAY_REGEXP.test(toString.call(value));
    }
    var trim = function(value) {
        return isString(value) ? value.trim() : value;
    };
    var escapeForRegexp = function(s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    };
    function isElement(node) {
        return !!(node && (node.nodeName || node.prop && node.attr && node.find));
    }
    function makeMap(str) {
        var obj = {}, items = str.split(","), i;
        for (i = 0; i < items.length; i++) {
            obj[items[i]] = true;
        }
        return obj;
    }
    function nodeName_(element) {
        return lowercase(element.nodeName || element[0] && element[0].nodeName);
    }
    function includes(array, obj) {
        return Array.prototype.indexOf.call(array, obj) != -1;
    }
    function arrayRemove(array, value) {
        var index = array.indexOf(value);
        if (index >= 0) {
            array.splice(index, 1);
        }
        return index;
    }
    function copy(source, destination, stackSource, stackDest) {
        if (isWindow(source) || isScope(source)) {
            throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        }
        if (isTypedArray(destination)) {
            throw ngMinErr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
        }
        if (!destination) {
            destination = source;
            if (isObject(source)) {
                var index;
                if (stackSource && (index = stackSource.indexOf(source)) !== -1) {
                    return stackDest[index];
                }
                if (isArray(source)) {
                    return copy(source, [], stackSource, stackDest);
                } else if (isTypedArray(source)) {
                    destination = new source.constructor(source);
                } else if (isDate(source)) {
                    destination = new Date(source.getTime());
                } else if (isRegExp(source)) {
                    destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                    destination.lastIndex = source.lastIndex;
                } else {
                    var emptyObject = Object.create(getPrototypeOf(source));
                    return copy(source, emptyObject, stackSource, stackDest);
                }
                if (stackDest) {
                    stackSource.push(source);
                    stackDest.push(destination);
                }
            }
        } else {
            if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
            stackSource = stackSource || [];
            stackDest = stackDest || [];
            if (isObject(source)) {
                stackSource.push(source);
                stackDest.push(destination);
            }
            var result, key;
            if (isArray(source)) {
                destination.length = 0;
                for (var i = 0; i < source.length; i++) {
                    destination.push(copy(source[i], null, stackSource, stackDest));
                }
            } else {
                var h = destination.$$hashKey;
                if (isArray(destination)) {
                    destination.length = 0;
                } else {
                    forEach(destination, function(value, key) {
                        delete destination[key];
                    });
                }
                if (isBlankObject(source)) {
                    for (key in source) {
                        destination[key] = copy(source[key], null, stackSource, stackDest);
                    }
                } else if (source && typeof source.hasOwnProperty === "function") {
                    for (key in source) {
                        if (source.hasOwnProperty(key)) {
                            destination[key] = copy(source[key], null, stackSource, stackDest);
                        }
                    }
                } else {
                    for (key in source) {
                        if (hasOwnProperty.call(source, key)) {
                            destination[key] = copy(source[key], null, stackSource, stackDest);
                        }
                    }
                }
                setHashKey(destination, h);
            }
        }
        return destination;
    }
    function shallowCopy(src, dst) {
        if (isArray(src)) {
            dst = dst || [];
            for (var i = 0, ii = src.length; i < ii; i++) {
                dst[i] = src[i];
            }
        } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src) {
                if (!(key.charAt(0) === "$" && key.charAt(1) === "$")) {
                    dst[key] = src[key];
                }
            }
        }
        return dst || src;
    }
    function equals(o1, o2) {
        if (o1 === o2) return true;
        if (o1 === null || o2 === null) return false;
        if (o1 !== o1 && o2 !== o2) return true;
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 == t2) {
            if (t1 == "object") {
                if (isArray(o1)) {
                    if (!isArray(o2)) return false;
                    if ((length = o1.length) == o2.length) {
                        for (key = 0; key < length; key++) {
                            if (!equals(o1[key], o2[key])) return false;
                        }
                        return true;
                    }
                } else if (isDate(o1)) {
                    if (!isDate(o2)) return false;
                    return equals(o1.getTime(), o2.getTime());
                } else if (isRegExp(o1)) {
                    return isRegExp(o2) ? o1.toString() == o2.toString() : false;
                } else {
                    if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
                    keySet = createMap();
                    for (key in o1) {
                        if (key.charAt(0) === "$" || isFunction(o1[key])) continue;
                        if (!equals(o1[key], o2[key])) return false;
                        keySet[key] = true;
                    }
                    for (key in o2) {
                        if (!(key in keySet) && key.charAt(0) !== "$" && o2[key] !== undefined && !isFunction(o2[key])) return false;
                    }
                    return true;
                }
            }
        }
        return false;
    }
    var csp = function() {
        if (isDefined(csp.isActive_)) return csp.isActive_;
        var active = !!(document.querySelector("[ng-csp]") || document.querySelector("[data-ng-csp]"));
        if (!active) {
            try {
                new Function("");
            } catch (e) {
                active = true;
            }
        }
        return csp.isActive_ = active;
    };
    var jq = function() {
        if (isDefined(jq.name_)) return jq.name_;
        var el;
        var i, ii = ngAttrPrefixes.length, prefix, name;
        for (i = 0; i < ii; ++i) {
            prefix = ngAttrPrefixes[i];
            if (el = document.querySelector("[" + prefix.replace(":", "\\:") + "jq]")) {
                name = el.getAttribute(prefix + "jq");
                break;
            }
        }
        return jq.name_ = name;
    };
    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
        return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        if (isFunction(fn) && !(fn instanceof RegExp)) {
            return curryArgs.length ? function() {
                return arguments.length ? fn.apply(self, concat(curryArgs, arguments, 0)) : fn.apply(self, curryArgs);
            } : function() {
                return arguments.length ? fn.apply(self, arguments) : fn.call(self);
            };
        } else {
            return fn;
        }
    }
    function toJsonReplacer(key, value) {
        var val = value;
        if (typeof key === "string" && key.charAt(0) === "$" && key.charAt(1) === "$") {
            val = undefined;
        } else if (isWindow(value)) {
            val = "$WINDOW";
        } else if (value && document === value) {
            val = "$DOCUMENT";
        } else if (isScope(value)) {
            val = "$SCOPE";
        }
        return val;
    }
    function toJson(obj, pretty) {
        if (typeof obj === "undefined") return undefined;
        if (!isNumber(pretty)) {
            pretty = pretty ? 2 : null;
        }
        return JSON.stringify(obj, toJsonReplacer, pretty);
    }
    function fromJson(json) {
        return isString(json) ? JSON.parse(json) : json;
    }
    function timezoneToOffset(timezone, fallback) {
        var requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
        return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
    }
    function addDateMinutes(date, minutes) {
        date = new Date(date.getTime());
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }
    function convertTimezoneToLocal(date, timezone, reverse) {
        reverse = reverse ? -1 : 1;
        var timezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
        return addDateMinutes(date, reverse * (timezoneOffset - date.getTimezoneOffset()));
    }
    function startingTag(element) {
        element = jqLite(element).clone();
        try {
            element.empty();
        } catch (e) {}
        var elemHtml = jqLite("<div>").append(element).html();
        try {
            return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
                return "<" + lowercase(nodeName);
            });
        } catch (e) {
            return lowercase(elemHtml);
        }
    }
    function tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {}
    }
    function parseKeyValue(keyValue) {
        var obj = {}, key_value, key;
        forEach((keyValue || "").split("&"), function(keyValue) {
            if (keyValue) {
                key_value = keyValue.replace(/\+/g, "%20").split("=");
                key = tryDecodeURIComponent(key_value[0]);
                if (isDefined(key)) {
                    var val = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
                    if (!hasOwnProperty.call(obj, key)) {
                        obj[key] = val;
                    } else if (isArray(obj[key])) {
                        obj[key].push(val);
                    } else {
                        obj[key] = [ obj[key], val ];
                    }
                }
            }
        });
        return obj;
    }
    function toKeyValue(obj) {
        var parts = [];
        forEach(obj, function(value, key) {
            if (isArray(value)) {
                forEach(value, function(arrayValue) {
                    parts.push(encodeUriQuery(key, true) + (arrayValue === true ? "" : "=" + encodeUriQuery(arrayValue, true)));
                });
            } else {
                parts.push(encodeUriQuery(key, true) + (value === true ? "" : "=" + encodeUriQuery(value, true)));
            }
        });
        return parts.length ? parts.join("&") : "";
    }
    function encodeUriSegment(val) {
        return encodeUriQuery(val, true).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
    }
    var ngAttrPrefixes = [ "ng-", "data-ng-", "ng:", "x-ng-" ];
    function getNgAttribute(element, ngAttr) {
        var attr, i, ii = ngAttrPrefixes.length;
        for (i = 0; i < ii; ++i) {
            attr = ngAttrPrefixes[i] + ngAttr;
            if (isString(attr = element.getAttribute(attr))) {
                return attr;
            }
        }
        return null;
    }
    function angularInit(element, bootstrap) {
        var appElement, module, config = {};
        forEach(ngAttrPrefixes, function(prefix) {
            var name = prefix + "app";
            if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
                appElement = element;
                module = element.getAttribute(name);
            }
        });
        forEach(ngAttrPrefixes, function(prefix) {
            var name = prefix + "app";
            var candidate;
            if (!appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]"))) {
                appElement = candidate;
                module = candidate.getAttribute(name);
            }
        });
        if (appElement) {
            config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
            bootstrap(appElement, module ? [ module ] : [], config);
        }
    }
    function bootstrap(element, modules, config) {
        if (!isObject(config)) config = {};
        var defaultConfig = {
            strictDi: false
        };
        config = extend(defaultConfig, config);
        var doBootstrap = function() {
            element = jqLite(element);
            if (element.injector()) {
                var tag = element[0] === document ? "document" : startingTag(element);
                throw ngMinErr("btstrpd", "App Already Bootstrapped with this Element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            modules = modules || [];
            modules.unshift([ "$provide", function($provide) {
                $provide.value("$rootElement", element);
            } ]);
            if (config.debugInfoEnabled) {
                modules.push([ "$compileProvider", function($compileProvider) {
                    $compileProvider.debugInfoEnabled(true);
                } ]);
            }
            modules.unshift("ng");
            var injector = createInjector(modules, config.strictDi);
            injector.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function bootstrapApply(scope, element, compile, injector) {
                scope.$apply(function() {
                    element.data("$injector", injector);
                    compile(element)(scope);
                });
            } ]);
            return injector;
        };
        var NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/;
        var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
        if (window && NG_ENABLE_DEBUG_INFO.test(window.name)) {
            config.debugInfoEnabled = true;
            window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "");
        }
        if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
            return doBootstrap();
        }
        window.name = window.name.replace(NG_DEFER_BOOTSTRAP, "");
        angular.resumeBootstrap = function(extraModules) {
            forEach(extraModules, function(module) {
                modules.push(module);
            });
            return doBootstrap();
        };
        if (isFunction(angular.resumeDeferredBootstrap)) {
            angular.resumeDeferredBootstrap();
        }
    }
    function reloadWithDebugInfo() {
        window.name = "NG_ENABLE_DEBUG_INFO!" + window.name;
        window.location.reload();
    }
    function getTestability(rootElement) {
        var injector = angular.element(rootElement).injector();
        if (!injector) {
            throw ngMinErr("test", "no injector found for element argument to getTestability");
        }
        return injector.get("$$testability");
    }
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
        separator = separator || "_";
        return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    var bindJQueryFired = false;
    var skipDestroyOnNextJQueryCleanData;
    function bindJQuery() {
        var originalCleanData;
        if (bindJQueryFired) {
            return;
        }
        var jqName = jq();
        jQuery = window.jQuery;
        if (isDefined(jqName)) {
            jQuery = jqName === null ? undefined : window[jqName];
        }
        if (jQuery && jQuery.fn.on) {
            jqLite = jQuery;
            extend(jQuery.fn, {
                scope: JQLitePrototype.scope,
                isolateScope: JQLitePrototype.isolateScope,
                controller: JQLitePrototype.controller,
                injector: JQLitePrototype.injector,
                inheritedData: JQLitePrototype.inheritedData
            });
            originalCleanData = jQuery.cleanData;
            jQuery.cleanData = function(elems) {
                var events;
                if (!skipDestroyOnNextJQueryCleanData) {
                    for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                        events = jQuery._data(elem, "events");
                        if (events && events.$destroy) {
                            jQuery(elem).triggerHandler("$destroy");
                        }
                    }
                } else {
                    skipDestroyOnNextJQueryCleanData = false;
                }
                originalCleanData(elems);
            };
        } else {
            jqLite = JQLite;
        }
        angular.element = jqLite;
        bindJQueryFired = true;
    }
    function assertArg(arg, name, reason) {
        if (!arg) {
            throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        }
        return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
        if (acceptArrayAnnotation && isArray(arg)) {
            arg = arg[arg.length - 1];
        }
        assertArg(isFunction(arg), name, "not a function, got " + (arg && typeof arg === "object" ? arg.constructor.name || "Object" : typeof arg));
        return arg;
    }
    function assertNotHasOwnProperty(name, context) {
        if (name === "hasOwnProperty") {
            throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
        }
    }
    function getter(obj, path, bindFnToScope) {
        if (!path) return obj;
        var keys = path.split(".");
        var key;
        var lastInstance = obj;
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (obj) {
                obj = (lastInstance = obj)[key];
            }
        }
        if (!bindFnToScope && isFunction(obj)) {
            return bind(lastInstance, obj);
        }
        return obj;
    }
    function getBlockNodes(nodes) {
        var node = nodes[0];
        var endNode = nodes[nodes.length - 1];
        var blockNodes = [ node ];
        do {
            node = node.nextSibling;
            if (!node) break;
            blockNodes.push(node);
        } while (node !== endNode);
        return jqLite(blockNodes);
    }
    function createMap() {
        return Object.create(null);
    }
    var NODE_TYPE_ELEMENT = 1;
    var NODE_TYPE_ATTRIBUTE = 2;
    var NODE_TYPE_TEXT = 3;
    var NODE_TYPE_COMMENT = 8;
    var NODE_TYPE_DOCUMENT = 9;
    var NODE_TYPE_DOCUMENT_FRAGMENT = 11;
    function setupModuleLoader(window) {
        var $injectorMinErr = minErr("$injector");
        var ngMinErr = minErr("ng");
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory());
        }
        var angular = ensure(window, "angular", Object);
        angular.$$minErr = angular.$$minErr || minErr;
        return ensure(angular, "module", function() {
            var modules = {};
            return function module(name, requires, configFn) {
                var assertNotHasOwnProperty = function(name, context) {
                    if (name === "hasOwnProperty") {
                        throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
                    }
                };
                assertNotHasOwnProperty(name, "module");
                if (requires && modules.hasOwnProperty(name)) {
                    modules[name] = null;
                }
                return ensure(modules, name, function() {
                    if (!requires) {
                        throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled " + "the module name or forgot to load it. If registering a module ensure that you " + "specify the dependencies as the second argument.", name);
                    }
                    var invokeQueue = [];
                    var configBlocks = [];
                    var runBlocks = [];
                    var config = invokeLater("$injector", "invoke", "push", configBlocks);
                    var moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _configBlocks: configBlocks,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLaterAndSetModuleName("$provide", "provider"),
                        factory: invokeLaterAndSetModuleName("$provide", "factory"),
                        service: invokeLaterAndSetModuleName("$provide", "service"),
                        value: invokeLater("$provide", "value"),
                        constant: invokeLater("$provide", "constant", "unshift"),
                        decorator: invokeLaterAndSetModuleName("$provide", "decorator"),
                        animation: invokeLaterAndSetModuleName("$animateProvider", "register"),
                        filter: invokeLaterAndSetModuleName("$filterProvider", "register"),
                        controller: invokeLaterAndSetModuleName("$controllerProvider", "register"),
                        directive: invokeLaterAndSetModuleName("$compileProvider", "directive"),
                        config: config,
                        run: function(block) {
                            runBlocks.push(block);
                            return this;
                        }
                    };
                    if (configFn) {
                        config(configFn);
                    }
                    return moduleInstance;
                    function invokeLater(provider, method, insertMethod, queue) {
                        if (!queue) queue = invokeQueue;
                        return function() {
                            queue[insertMethod || "push"]([ provider, method, arguments ]);
                            return moduleInstance;
                        };
                    }
                    function invokeLaterAndSetModuleName(provider, method) {
                        return function(recipeName, factoryFunction) {
                            if (factoryFunction && isFunction(factoryFunction)) factoryFunction.$$moduleName = name;
                            invokeQueue.push([ provider, method, arguments ]);
                            return moduleInstance;
                        };
                    }
                });
            };
        });
    }
    function serializeObject(obj) {
        var seen = [];
        return JSON.stringify(obj, function(key, val) {
            val = toJsonReplacer(key, val);
            if (isObject(val)) {
                if (seen.indexOf(val) >= 0) return "<<already seen>>";
                seen.push(val);
            }
            return val;
        });
    }
    function toDebugString(obj) {
        if (typeof obj === "function") {
            return obj.toString().replace(/ \{[\s\S]*$/, "");
        } else if (typeof obj === "undefined") {
            return "undefined";
        } else if (typeof obj !== "string") {
            return serializeObject(obj);
        }
        return obj;
    }
    var version = {
        full: "1.4.1",
        major: 1,
        minor: 4,
        dot: 1,
        codeName: "hyperionic-illumination"
    };
    function publishExternalAPI(angular) {
        extend(angular, {
            bootstrap: bootstrap,
            copy: copy,
            extend: extend,
            merge: merge,
            equals: equals,
            element: jqLite,
            forEach: forEach,
            injector: createInjector,
            noop: noop,
            bind: bind,
            toJson: toJson,
            fromJson: fromJson,
            identity: identity,
            isUndefined: isUndefined,
            isDefined: isDefined,
            isString: isString,
            isFunction: isFunction,
            isObject: isObject,
            isNumber: isNumber,
            isElement: isElement,
            isArray: isArray,
            version: version,
            isDate: isDate,
            lowercase: lowercase,
            uppercase: uppercase,
            callbacks: {
                counter: 0
            },
            getTestability: getTestability,
            $$minErr: minErr,
            $$csp: csp,
            reloadWithDebugInfo: reloadWithDebugInfo
        });
        angularModule = setupModuleLoader(window);
        try {
            angularModule("ngLocale");
        } catch (e) {
            angularModule("ngLocale", []).provider("$locale", $LocaleProvider);
        }
        angularModule("ng", [ "ngLocale" ], [ "$provide", function ngModule($provide) {
            $provide.provider({
                $$sanitizeUri: $$SanitizeUriProvider
            });
            $provide.provider("$compile", $CompileProvider).directive({
                a: htmlAnchorDirective,
                input: inputDirective,
                textarea: inputDirective,
                form: formDirective,
                script: scriptDirective,
                select: selectDirective,
                style: styleDirective,
                option: optionDirective,
                ngBind: ngBindDirective,
                ngBindHtml: ngBindHtmlDirective,
                ngBindTemplate: ngBindTemplateDirective,
                ngClass: ngClassDirective,
                ngClassEven: ngClassEvenDirective,
                ngClassOdd: ngClassOddDirective,
                ngCloak: ngCloakDirective,
                ngController: ngControllerDirective,
                ngForm: ngFormDirective,
                ngHide: ngHideDirective,
                ngIf: ngIfDirective,
                ngInclude: ngIncludeDirective,
                ngInit: ngInitDirective,
                ngNonBindable: ngNonBindableDirective,
                ngPluralize: ngPluralizeDirective,
                ngRepeat: ngRepeatDirective,
                ngShow: ngShowDirective,
                ngStyle: ngStyleDirective,
                ngSwitch: ngSwitchDirective,
                ngSwitchWhen: ngSwitchWhenDirective,
                ngSwitchDefault: ngSwitchDefaultDirective,
                ngOptions: ngOptionsDirective,
                ngTransclude: ngTranscludeDirective,
                ngModel: ngModelDirective,
                ngList: ngListDirective,
                ngChange: ngChangeDirective,
                pattern: patternDirective,
                ngPattern: patternDirective,
                required: requiredDirective,
                ngRequired: requiredDirective,
                minlength: minlengthDirective,
                ngMinlength: minlengthDirective,
                maxlength: maxlengthDirective,
                ngMaxlength: maxlengthDirective,
                ngValue: ngValueDirective,
                ngModelOptions: ngModelOptionsDirective
            }).directive({
                ngInclude: ngIncludeFillContentDirective
            }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
            $provide.provider({
                $anchorScroll: $AnchorScrollProvider,
                $animate: $AnimateProvider,
                $$animateQueue: $$CoreAnimateQueueProvider,
                $$AnimateRunner: $$CoreAnimateRunnerProvider,
                $browser: $BrowserProvider,
                $cacheFactory: $CacheFactoryProvider,
                $controller: $ControllerProvider,
                $document: $DocumentProvider,
                $exceptionHandler: $ExceptionHandlerProvider,
                $filter: $FilterProvider,
                $interpolate: $InterpolateProvider,
                $interval: $IntervalProvider,
                $http: $HttpProvider,
                $httpParamSerializer: $HttpParamSerializerProvider,
                $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
                $httpBackend: $HttpBackendProvider,
                $location: $LocationProvider,
                $log: $LogProvider,
                $parse: $ParseProvider,
                $rootScope: $RootScopeProvider,
                $q: $QProvider,
                $$q: $$QProvider,
                $sce: $SceProvider,
                $sceDelegate: $SceDelegateProvider,
                $sniffer: $SnifferProvider,
                $templateCache: $TemplateCacheProvider,
                $templateRequest: $TemplateRequestProvider,
                $$testability: $$TestabilityProvider,
                $timeout: $TimeoutProvider,
                $window: $WindowProvider,
                $$rAF: $$RAFProvider,
                $$asyncCallback: $$AsyncCallbackProvider,
                $$jqLite: $$jqLiteProvider,
                $$HashMap: $$HashMapProvider,
                $$cookieReader: $$CookieReaderProvider
            });
        } ]);
    }
    JQLite.expando = "ng339";
    var jqCache = JQLite.cache = {}, jqId = 1, addEventListenerFn = function(element, type, fn) {
        element.addEventListener(type, fn, false);
    }, removeEventListenerFn = function(element, type, fn) {
        element.removeEventListener(type, fn, false);
    };
    JQLite._data = function(node) {
        return this.cache[node[this.expando]] || {};
    };
    function jqNextId() {
        return ++jqId;
    }
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    var MOUSE_EVENT_MAP = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    };
    var jqLiteMinErr = minErr("jqLite");
    function camelCase(name) {
        return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).replace(MOZ_HACK_REGEXP, "Moz$1");
    }
    var SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var HTML_REGEXP = /<|&#?\w+;/;
    var TAG_NAME_REGEXP = /<([\w:]+)/;
    var XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
    var wrapMap = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function jqLiteIsTextNode(html) {
        return !HTML_REGEXP.test(html);
    }
    function jqLiteAcceptsData(node) {
        var nodeType = node.nodeType;
        return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
    }
    function jqLiteHasData(node) {
        for (var key in jqCache[node.ng339]) {
            return true;
        }
        return false;
    }
    function jqLiteBuildFragment(html, context) {
        var tmp, tag, wrap, fragment = context.createDocumentFragment(), nodes = [], i;
        if (jqLiteIsTextNode(html)) {
            nodes.push(context.createTextNode(html));
        } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (TAG_NAME_REGEXP.exec(html) || [ "", "" ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2];
            i = wrap[0];
            while (i--) {
                tmp = tmp.lastChild;
            }
            nodes = concat(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = "";
        }
        fragment.textContent = "";
        fragment.innerHTML = "";
        forEach(nodes, function(node) {
            fragment.appendChild(node);
        });
        return fragment;
    }
    function jqLiteParseHTML(html, context) {
        context = context || document;
        var parsed;
        if (parsed = SINGLE_TAG_REGEXP.exec(html)) {
            return [ context.createElement(parsed[1]) ];
        }
        if (parsed = jqLiteBuildFragment(html, context)) {
            return parsed.childNodes;
        }
        return [];
    }
    function JQLite(element) {
        if (element instanceof JQLite) {
            return element;
        }
        var argIsString;
        if (isString(element)) {
            element = trim(element);
            argIsString = true;
        }
        if (!(this instanceof JQLite)) {
            if (argIsString && element.charAt(0) != "<") {
                throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            }
            return new JQLite(element);
        }
        if (argIsString) {
            jqLiteAddNodes(this, jqLiteParseHTML(element));
        } else {
            jqLiteAddNodes(this, element);
        }
    }
    function jqLiteClone(element) {
        return element.cloneNode(true);
    }
    function jqLiteDealoc(element, onlyDescendants) {
        if (!onlyDescendants) jqLiteRemoveData(element);
        if (element.querySelectorAll) {
            var descendants = element.querySelectorAll("*");
            for (var i = 0, l = descendants.length; i < l; i++) {
                jqLiteRemoveData(descendants[i]);
            }
        }
    }
    function jqLiteOff(element, type, fn, unsupported) {
        if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
        var expandoStore = jqLiteExpandoStore(element);
        var events = expandoStore && expandoStore.events;
        var handle = expandoStore && expandoStore.handle;
        if (!handle) return;
        if (!type) {
            for (type in events) {
                if (type !== "$destroy") {
                    removeEventListenerFn(element, type, handle);
                }
                delete events[type];
            }
        } else {
            forEach(type.split(" "), function(type) {
                if (isDefined(fn)) {
                    var listenerFns = events[type];
                    arrayRemove(listenerFns || [], fn);
                    if (listenerFns && listenerFns.length > 0) {
                        return;
                    }
                }
                removeEventListenerFn(element, type, handle);
                delete events[type];
            });
        }
    }
    function jqLiteRemoveData(element, name) {
        var expandoId = element.ng339;
        var expandoStore = expandoId && jqCache[expandoId];
        if (expandoStore) {
            if (name) {
                delete expandoStore.data[name];
                return;
            }
            if (expandoStore.handle) {
                if (expandoStore.events.$destroy) {
                    expandoStore.handle({}, "$destroy");
                }
                jqLiteOff(element);
            }
            delete jqCache[expandoId];
            element.ng339 = undefined;
        }
    }
    function jqLiteExpandoStore(element, createIfNecessary) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        if (createIfNecessary && !expandoStore) {
            element.ng339 = expandoId = jqNextId();
            expandoStore = jqCache[expandoId] = {
                events: {},
                data: {},
                handle: undefined
            };
        }
        return expandoStore;
    }
    function jqLiteData(element, key, value) {
        if (jqLiteAcceptsData(element)) {
            var isSimpleSetter = isDefined(value);
            var isSimpleGetter = !isSimpleSetter && key && !isObject(key);
            var massGetter = !key;
            var expandoStore = jqLiteExpandoStore(element, !isSimpleGetter);
            var data = expandoStore && expandoStore.data;
            if (isSimpleSetter) {
                data[key] = value;
            } else {
                if (massGetter) {
                    return data;
                } else {
                    if (isSimpleGetter) {
                        return data && data[key];
                    } else {
                        extend(data, key);
                    }
                }
            }
        }
    }
    function jqLiteHasClass(element, selector) {
        if (!element.getAttribute) return false;
        return (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1;
    }
    function jqLiteRemoveClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            forEach(cssClasses.split(" "), function(cssClass) {
                element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")));
            });
        }
    }
    function jqLiteAddClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            forEach(cssClasses.split(" "), function(cssClass) {
                cssClass = trim(cssClass);
                if (existingClasses.indexOf(" " + cssClass + " ") === -1) {
                    existingClasses += cssClass + " ";
                }
            });
            element.setAttribute("class", trim(existingClasses));
        }
    }
    function jqLiteAddNodes(root, elements) {
        if (elements) {
            if (elements.nodeType) {
                root[root.length++] = elements;
            } else {
                var length = elements.length;
                if (typeof length === "number" && elements.window !== elements) {
                    if (length) {
                        for (var i = 0; i < length; i++) {
                            root[root.length++] = elements[i];
                        }
                    }
                } else {
                    root[root.length++] = elements;
                }
            }
        }
    }
    function jqLiteController(element, name) {
        return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller");
    }
    function jqLiteInheritedData(element, name, value) {
        if (element.nodeType == NODE_TYPE_DOCUMENT) {
            element = element.documentElement;
        }
        var names = isArray(name) ? name : [ name ];
        while (element) {
            for (var i = 0, ii = names.length; i < ii; i++) {
                if ((value = jqLite.data(element, names[i])) !== undefined) return value;
            }
            element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host;
        }
    }
    function jqLiteEmpty(element) {
        jqLiteDealoc(element, true);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    function jqLiteRemove(element, keepData) {
        if (!keepData) jqLiteDealoc(element);
        var parent = element.parentNode;
        if (parent) parent.removeChild(element);
    }
    function jqLiteDocumentLoaded(action, win) {
        win = win || window;
        if (win.document.readyState === "complete") {
            win.setTimeout(action);
        } else {
            jqLite(win).on("load", action);
        }
    }
    var JQLitePrototype = JQLite.prototype = {
        ready: function(fn) {
            var fired = false;
            function trigger() {
                if (fired) return;
                fired = true;
                fn();
            }
            if (document.readyState === "complete") {
                setTimeout(trigger);
            } else {
                this.on("DOMContentLoaded", trigger);
                JQLite(window).on("load", trigger);
            }
        },
        toString: function() {
            var value = [];
            forEach(this, function(e) {
                value.push("" + e);
            });
            return "[" + value.join(", ") + "]";
        },
        eq: function(index) {
            return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
        },
        length: 0,
        push: push,
        sort: [].sort,
        splice: [].splice
    };
    var BOOLEAN_ATTR = {};
    forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(value) {
        BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach("input,select,option,textarea,button,form,details".split(","), function(value) {
        BOOLEAN_ELEMENTS[value] = true;
    });
    var ALIASED_ATTR = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    function getBooleanAttrName(element, name) {
        var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
        return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr;
    }
    function getAliasedAttrName(element, name) {
        var nodeName = element.nodeName;
        return (nodeName === "INPUT" || nodeName === "TEXTAREA") && ALIASED_ATTR[name];
    }
    forEach({
        data: jqLiteData,
        removeData: jqLiteRemoveData,
        hasData: jqLiteHasData
    }, function(fn, name) {
        JQLite[name] = fn;
    });
    forEach({
        data: jqLiteData,
        inheritedData: jqLiteInheritedData,
        scope: function(element) {
            return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(element) {
            return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate");
        },
        controller: jqLiteController,
        injector: function(element) {
            return jqLiteInheritedData(element, "$injector");
        },
        removeAttr: function(element, name) {
            element.removeAttribute(name);
        },
        hasClass: jqLiteHasClass,
        css: function(element, name, value) {
            name = camelCase(name);
            if (isDefined(value)) {
                element.style[name] = value;
            } else {
                return element.style[name];
            }
        },
        attr: function(element, name, value) {
            var nodeType = element.nodeType;
            if (nodeType === NODE_TYPE_TEXT || nodeType === NODE_TYPE_ATTRIBUTE || nodeType === NODE_TYPE_COMMENT) {
                return;
            }
            var lowercasedName = lowercase(name);
            if (BOOLEAN_ATTR[lowercasedName]) {
                if (isDefined(value)) {
                    if (!!value) {
                        element[name] = true;
                        element.setAttribute(name, lowercasedName);
                    } else {
                        element[name] = false;
                        element.removeAttribute(lowercasedName);
                    }
                } else {
                    return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
                }
            } else if (isDefined(value)) {
                element.setAttribute(name, value);
            } else if (element.getAttribute) {
                var ret = element.getAttribute(name, 2);
                return ret === null ? undefined : ret;
            }
        },
        prop: function(element, name, value) {
            if (isDefined(value)) {
                element[name] = value;
            } else {
                return element[name];
            }
        },
        text: function() {
            getText.$dv = "";
            return getText;
            function getText(element, value) {
                if (isUndefined(value)) {
                    var nodeType = element.nodeType;
                    return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : "";
                }
                element.textContent = value;
            }
        }(),
        val: function(element, value) {
            if (isUndefined(value)) {
                if (element.multiple && nodeName_(element) === "select") {
                    var result = [];
                    forEach(element.options, function(option) {
                        if (option.selected) {
                            result.push(option.value || option.text);
                        }
                    });
                    return result.length === 0 ? null : result;
                }
                return element.value;
            }
            element.value = value;
        },
        html: function(element, value) {
            if (isUndefined(value)) {
                return element.innerHTML;
            }
            jqLiteDealoc(element, true);
            element.innerHTML = value;
        },
        empty: jqLiteEmpty
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2) {
            var i, key;
            var nodeCount = this.length;
            if (fn !== jqLiteEmpty && (fn.length == 2 && (fn !== jqLiteHasClass && fn !== jqLiteController) ? arg1 : arg2) === undefined) {
                if (isObject(arg1)) {
                    for (i = 0; i < nodeCount; i++) {
                        if (fn === jqLiteData) {
                            fn(this[i], arg1);
                        } else {
                            for (key in arg1) {
                                fn(this[i], key, arg1[key]);
                            }
                        }
                    }
                    return this;
                } else {
                    var value = fn.$dv;
                    var jj = value === undefined ? Math.min(nodeCount, 1) : nodeCount;
                    for (var j = 0; j < jj; j++) {
                        var nodeValue = fn(this[j], arg1, arg2);
                        value = value ? value + nodeValue : nodeValue;
                    }
                    return value;
                }
            } else {
                for (i = 0; i < nodeCount; i++) {
                    fn(this[i], arg1, arg2);
                }
                return this;
            }
        };
    });
    function createEventHandler(element, events) {
        var eventHandler = function(event, type) {
            event.isDefaultPrevented = function() {
                return event.defaultPrevented;
            };
            var eventFns = events[type || event.type];
            var eventFnsLength = eventFns ? eventFns.length : 0;
            if (!eventFnsLength) return;
            if (isUndefined(event.immediatePropagationStopped)) {
                var originalStopImmediatePropagation = event.stopImmediatePropagation;
                event.stopImmediatePropagation = function() {
                    event.immediatePropagationStopped = true;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    if (originalStopImmediatePropagation) {
                        originalStopImmediatePropagation.call(event);
                    }
                };
            }
            event.isImmediatePropagationStopped = function() {
                return event.immediatePropagationStopped === true;
            };
            if (eventFnsLength > 1) {
                eventFns = shallowCopy(eventFns);
            }
            for (var i = 0; i < eventFnsLength; i++) {
                if (!event.isImmediatePropagationStopped()) {
                    eventFns[i].call(element, event);
                }
            }
        };
        eventHandler.elem = element;
        return eventHandler;
    }
    forEach({
        removeData: jqLiteRemoveData,
        on: function jqLiteOn(element, type, fn, unsupported) {
            if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (!jqLiteAcceptsData(element)) {
                return;
            }
            var expandoStore = jqLiteExpandoStore(element, true);
            var events = expandoStore.events;
            var handle = expandoStore.handle;
            if (!handle) {
                handle = expandoStore.handle = createEventHandler(element, events);
            }
            var types = type.indexOf(" ") >= 0 ? type.split(" ") : [ type ];
            var i = types.length;
            while (i--) {
                type = types[i];
                var eventFns = events[type];
                if (!eventFns) {
                    events[type] = [];
                    if (type === "mouseenter" || type === "mouseleave") {
                        jqLiteOn(element, MOUSE_EVENT_MAP[type], function(event) {
                            var target = this, related = event.relatedTarget;
                            if (!related || related !== target && !target.contains(related)) {
                                handle(event, type);
                            }
                        });
                    } else {
                        if (type !== "$destroy") {
                            addEventListenerFn(element, type, handle);
                        }
                    }
                    eventFns = events[type];
                }
                eventFns.push(fn);
            }
        },
        off: jqLiteOff,
        one: function(element, type, fn) {
            element = jqLite(element);
            element.on(type, function onFn() {
                element.off(type, fn);
                element.off(type, onFn);
            });
            element.on(type, fn);
        },
        replaceWith: function(element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element);
            forEach(new JQLite(replaceNode), function(node) {
                if (index) {
                    parent.insertBefore(node, index.nextSibling);
                } else {
                    parent.replaceChild(node, element);
                }
                index = node;
            });
        },
        children: function(element) {
            var children = [];
            forEach(element.childNodes, function(element) {
                if (element.nodeType === NODE_TYPE_ELEMENT) {
                    children.push(element);
                }
            });
            return children;
        },
        contents: function(element) {
            return element.contentDocument || element.childNodes || [];
        },
        append: function(element, node) {
            var nodeType = element.nodeType;
            if (nodeType !== NODE_TYPE_ELEMENT && nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT) return;
            node = new JQLite(node);
            for (var i = 0, ii = node.length; i < ii; i++) {
                var child = node[i];
                element.appendChild(child);
            }
        },
        prepend: function(element, node) {
            if (element.nodeType === NODE_TYPE_ELEMENT) {
                var index = element.firstChild;
                forEach(new JQLite(node), function(child) {
                    element.insertBefore(child, index);
                });
            }
        },
        wrap: function(element, wrapNode) {
            wrapNode = jqLite(wrapNode).eq(0).clone()[0];
            var parent = element.parentNode;
            if (parent) {
                parent.replaceChild(wrapNode, element);
            }
            wrapNode.appendChild(element);
        },
        remove: jqLiteRemove,
        detach: function(element) {
            jqLiteRemove(element, true);
        },
        after: function(element, newElement) {
            var index = element, parent = element.parentNode;
            newElement = new JQLite(newElement);
            for (var i = 0, ii = newElement.length; i < ii; i++) {
                var node = newElement[i];
                parent.insertBefore(node, index.nextSibling);
                index = node;
            }
        },
        addClass: jqLiteAddClass,
        removeClass: jqLiteRemoveClass,
        toggleClass: function(element, selector, condition) {
            if (selector) {
                forEach(selector.split(" "), function(className) {
                    var classCondition = condition;
                    if (isUndefined(classCondition)) {
                        classCondition = !jqLiteHasClass(element, className);
                    }
                    (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className);
                });
            }
        },
        parent: function(element) {
            var parent = element.parentNode;
            return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null;
        },
        next: function(element) {
            return element.nextElementSibling;
        },
        find: function(element, selector) {
            if (element.getElementsByTagName) {
                return element.getElementsByTagName(selector);
            } else {
                return [];
            }
        },
        clone: jqLiteClone,
        triggerHandler: function(element, event, extraParameters) {
            var dummyEvent, eventFnsCopy, handlerArgs;
            var eventName = event.type || event;
            var expandoStore = jqLiteExpandoStore(element);
            var events = expandoStore && expandoStore.events;
            var eventFns = events && events[eventName];
            if (eventFns) {
                dummyEvent = {
                    preventDefault: function() {
                        this.defaultPrevented = true;
                    },
                    isDefaultPrevented: function() {
                        return this.defaultPrevented === true;
                    },
                    stopImmediatePropagation: function() {
                        this.immediatePropagationStopped = true;
                    },
                    isImmediatePropagationStopped: function() {
                        return this.immediatePropagationStopped === true;
                    },
                    stopPropagation: noop,
                    type: eventName,
                    target: element
                };
                if (event.type) {
                    dummyEvent = extend(dummyEvent, event);
                }
                eventFnsCopy = shallowCopy(eventFns);
                handlerArgs = extraParameters ? [ dummyEvent ].concat(extraParameters) : [ dummyEvent ];
                forEach(eventFnsCopy, function(fn) {
                    if (!dummyEvent.isImmediatePropagationStopped()) {
                        fn.apply(element, handlerArgs);
                    }
                });
            }
        }
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2, arg3) {
            var value;
            for (var i = 0, ii = this.length; i < ii; i++) {
                if (isUndefined(value)) {
                    value = fn(this[i], arg1, arg2, arg3);
                    if (isDefined(value)) {
                        value = jqLite(value);
                    }
                } else {
                    jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
                }
            }
            return isDefined(value) ? value : this;
        };
        JQLite.prototype.bind = JQLite.prototype.on;
        JQLite.prototype.unbind = JQLite.prototype.off;
    });
    function $$jqLiteProvider() {
        this.$get = function $$jqLite() {
            return extend(JQLite, {
                hasClass: function(node, classes) {
                    if (node.attr) node = node[0];
                    return jqLiteHasClass(node, classes);
                },
                addClass: function(node, classes) {
                    if (node.attr) node = node[0];
                    return jqLiteAddClass(node, classes);
                },
                removeClass: function(node, classes) {
                    if (node.attr) node = node[0];
                    return jqLiteRemoveClass(node, classes);
                }
            });
        };
    }
    function hashKey(obj, nextUidFn) {
        var key = obj && obj.$$hashKey;
        if (key) {
            if (typeof key === "function") {
                key = obj.$$hashKey();
            }
            return key;
        }
        var objType = typeof obj;
        if (objType == "function" || objType == "object" && obj !== null) {
            key = obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)();
        } else {
            key = objType + ":" + obj;
        }
        return key;
    }
    function HashMap(array, isolatedUid) {
        if (isolatedUid) {
            var uid = 0;
            this.nextUid = function() {
                return ++uid;
            };
        }
        forEach(array, this.put, this);
    }
    HashMap.prototype = {
        put: function(key, value) {
            this[hashKey(key, this.nextUid)] = value;
        },
        get: function(key) {
            return this[hashKey(key, this.nextUid)];
        },
        remove: function(key) {
            var value = this[key = hashKey(key, this.nextUid)];
            delete this[key];
            return value;
        }
    };
    var $$HashMapProvider = [ function() {
        this.$get = [ function() {
            return HashMap;
        } ];
    } ];
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    var $injectorMinErr = minErr("$injector");
    function anonFn(fn) {
        var fnText = fn.toString().replace(STRIP_COMMENTS, ""), args = fnText.match(FN_ARGS);
        if (args) {
            return "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")";
        }
        return "fn";
    }
    function annotate(fn, strictDi, name) {
        var $inject, fnText, argDecl, last;
        if (typeof fn === "function") {
            if (!($inject = fn.$inject)) {
                $inject = [];
                if (fn.length) {
                    if (strictDi) {
                        if (!isString(name) || !name) {
                            name = fn.name || anonFn(fn);
                        }
                        throw $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                    }
                    fnText = fn.toString().replace(STRIP_COMMENTS, "");
                    argDecl = fnText.match(FN_ARGS);
                    forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                        arg.replace(FN_ARG, function(all, underscore, name) {
                            $inject.push(name);
                        });
                    });
                }
                fn.$inject = $inject;
            }
        } else if (isArray(fn)) {
            last = fn.length - 1;
            assertArgFn(fn[last], "fn");
            $inject = fn.slice(0, last);
        } else {
            assertArgFn(fn, "fn", true);
        }
        return $inject;
    }
    function createInjector(modulesToLoad, strictDi) {
        strictDi = strictDi === true;
        var INSTANTIATING = {}, providerSuffix = "Provider", path = [], loadedModules = new HashMap([], true), providerCache = {
            $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
            }
        }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function(serviceName, caller) {
            if (angular.isString(caller)) {
                path.push(caller);
            }
            throw $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "));
        }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function(serviceName, caller) {
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
        });
        forEach(loadModules(modulesToLoad), function(fn) {
            if (fn) instanceInjector.invoke(fn);
        });
        return instanceInjector;
        function supportObject(delegate) {
            return function(key, value) {
                if (isObject(key)) {
                    forEach(key, reverseParams(delegate));
                } else {
                    return delegate(key, value);
                }
            };
        }
        function provider(name, provider_) {
            assertNotHasOwnProperty(name, "service");
            if (isFunction(provider_) || isArray(provider_)) {
                provider_ = providerInjector.instantiate(provider_);
            }
            if (!provider_.$get) {
                throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
            }
            return providerCache[name + providerSuffix] = provider_;
        }
        function enforceReturnValue(name, factory) {
            return function enforcedReturnValue() {
                var result = instanceInjector.invoke(factory, this);
                if (isUndefined(result)) {
                    throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                }
                return result;
            };
        }
        function factory(name, factoryFn, enforce) {
            return provider(name, {
                $get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
            });
        }
        function service(name, constructor) {
            return factory(name, [ "$injector", function($injector) {
                return $injector.instantiate(constructor);
            } ]);
        }
        function value(name, val) {
            return factory(name, valueFn(val), false);
        }
        function constant(name, value) {
            assertNotHasOwnProperty(name, "constant");
            providerCache[name] = value;
            instanceCache[name] = value;
        }
        function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
            origProvider.$get = function() {
                var origInstance = instanceInjector.invoke(orig$get, origProvider);
                return instanceInjector.invoke(decorFn, null, {
                    $delegate: origInstance
                });
            };
        }
        function loadModules(modulesToLoad) {
            var runBlocks = [], moduleFn;
            forEach(modulesToLoad, function(module) {
                if (loadedModules.get(module)) return;
                loadedModules.put(module, true);
                function runInvokeQueue(queue) {
                    var i, ii;
                    for (i = 0, ii = queue.length; i < ii; i++) {
                        var invokeArgs = queue[i], provider = providerInjector.get(invokeArgs[0]);
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                    }
                }
                try {
                    if (isString(module)) {
                        moduleFn = angularModule(module);
                        runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                        runInvokeQueue(moduleFn._invokeQueue);
                        runInvokeQueue(moduleFn._configBlocks);
                    } else if (isFunction(module)) {
                        runBlocks.push(providerInjector.invoke(module));
                    } else if (isArray(module)) {
                        runBlocks.push(providerInjector.invoke(module));
                    } else {
                        assertArgFn(module, "module");
                    }
                } catch (e) {
                    if (isArray(module)) {
                        module = module[module.length - 1];
                    }
                    if (e.message && e.stack && e.stack.indexOf(e.message) == -1) {
                        e = e.message + "\n" + e.stack;
                    }
                    throw $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e);
                }
            });
            return runBlocks;
        }
        function createInternalInjector(cache, factory) {
            function getService(serviceName, caller) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING) {
                        throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                    }
                    return cache[serviceName];
                } else {
                    try {
                        path.unshift(serviceName);
                        cache[serviceName] = INSTANTIATING;
                        return cache[serviceName] = factory(serviceName, caller);
                    } catch (err) {
                        if (cache[serviceName] === INSTANTIATING) {
                            delete cache[serviceName];
                        }
                        throw err;
                    } finally {
                        path.shift();
                    }
                }
            }
            function invoke(fn, self, locals, serviceName) {
                if (typeof locals === "string") {
                    serviceName = locals;
                    locals = null;
                }
                var args = [], $inject = createInjector.$$annotate(fn, strictDi, serviceName), length, i, key;
                for (i = 0, length = $inject.length; i < length; i++) {
                    key = $inject[i];
                    if (typeof key !== "string") {
                        throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                    }
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName));
                }
                if (isArray(fn)) {
                    fn = fn[length];
                }
                return fn.apply(self, args);
            }
            function instantiate(Type, locals, serviceName) {
                var instance = Object.create((isArray(Type) ? Type[Type.length - 1] : Type).prototype || null);
                var returnedValue = invoke(Type, instance, locals, serviceName);
                return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
            }
            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: createInjector.$$annotate,
                has: function(name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
                }
            };
        }
    }
    createInjector.$$annotate = annotate;
    function $AnchorScrollProvider() {
        var autoScrollingEnabled = true;
        this.disableAutoScrolling = function() {
            autoScrollingEnabled = false;
        };
        this.$get = [ "$window", "$location", "$rootScope", function($window, $location, $rootScope) {
            var document = $window.document;
            function getFirstAnchor(list) {
                var result = null;
                Array.prototype.some.call(list, function(element) {
                    if (nodeName_(element) === "a") {
                        result = element;
                        return true;
                    }
                });
                return result;
            }
            function getYOffset() {
                var offset = scroll.yOffset;
                if (isFunction(offset)) {
                    offset = offset();
                } else if (isElement(offset)) {
                    var elem = offset[0];
                    var style = $window.getComputedStyle(elem);
                    if (style.position !== "fixed") {
                        offset = 0;
                    } else {
                        offset = elem.getBoundingClientRect().bottom;
                    }
                } else if (!isNumber(offset)) {
                    offset = 0;
                }
                return offset;
            }
            function scrollTo(elem) {
                if (elem) {
                    elem.scrollIntoView();
                    var offset = getYOffset();
                    if (offset) {
                        var elemTop = elem.getBoundingClientRect().top;
                        $window.scrollBy(0, elemTop - offset);
                    }
                } else {
                    $window.scrollTo(0, 0);
                }
            }
            function scroll(hash) {
                hash = isString(hash) ? hash : $location.hash();
                var elm;
                if (!hash) scrollTo(null); else if (elm = document.getElementById(hash)) scrollTo(elm); else if (elm = getFirstAnchor(document.getElementsByName(hash))) scrollTo(elm); else if (hash === "top") scrollTo(null);
            }
            if (autoScrollingEnabled) {
                $rootScope.$watch(function autoScrollWatch() {
                    return $location.hash();
                }, function autoScrollWatchAction(newVal, oldVal) {
                    if (newVal === oldVal && newVal === "") return;
                    jqLiteDocumentLoaded(function() {
                        $rootScope.$evalAsync(scroll);
                    });
                });
            }
            return scroll;
        } ];
    }
    var $animateMinErr = minErr("$animate");
    var ELEMENT_NODE = 1;
    var NG_ANIMATE_CLASSNAME = "ng-animate";
    function mergeClasses(a, b) {
        if (!a && !b) return "";
        if (!a) return b;
        if (!b) return a;
        if (isArray(a)) a = a.join(" ");
        if (isArray(b)) b = b.join(" ");
        return a + " " + b;
    }
    function extractElementNode(element) {
        for (var i = 0; i < element.length; i++) {
            var elm = element[i];
            if (elm.nodeType === ELEMENT_NODE) {
                return elm;
            }
        }
    }
    function splitClasses(classes) {
        if (isString(classes)) {
            classes = classes.split(" ");
        }
        var obj = createMap();
        forEach(classes, function(klass) {
            if (klass.length) {
                obj[klass] = true;
            }
        });
        return obj;
    }
    function prepareAnimateOptions(options) {
        return isObject(options) ? options : {};
    }
    var $$CoreAnimateRunnerProvider = function() {
        this.$get = [ "$q", "$$rAF", function($q, $$rAF) {
            function AnimateRunner() {}
            AnimateRunner.all = noop;
            AnimateRunner.chain = noop;
            AnimateRunner.prototype = {
                end: noop,
                cancel: noop,
                resume: noop,
                pause: noop,
                complete: noop,
                then: function(pass, fail) {
                    return $q(function(resolve) {
                        $$rAF(function() {
                            resolve();
                        });
                    }).then(pass, fail);
                }
            };
            return AnimateRunner;
        } ];
    };
    var $$CoreAnimateQueueProvider = function() {
        var postDigestQueue = new HashMap();
        var postDigestElements = [];
        this.$get = [ "$$AnimateRunner", "$rootScope", function($$AnimateRunner, $rootScope) {
            return {
                enabled: noop,
                on: noop,
                off: noop,
                pin: noop,
                push: function(element, event, options, domOperation) {
                    domOperation && domOperation();
                    options = options || {};
                    options.from && element.css(options.from);
                    options.to && element.css(options.to);
                    if (options.addClass || options.removeClass) {
                        addRemoveClassesPostDigest(element, options.addClass, options.removeClass);
                    }
                    return new $$AnimateRunner();
                }
            };
            function addRemoveClassesPostDigest(element, add, remove) {
                var data = postDigestQueue.get(element);
                var classVal;
                if (!data) {
                    postDigestQueue.put(element, data = {});
                    postDigestElements.push(element);
                }
                if (add) {
                    forEach(add.split(" "), function(className) {
                        if (className) {
                            data[className] = true;
                        }
                    });
                }
                if (remove) {
                    forEach(remove.split(" "), function(className) {
                        if (className) {
                            data[className] = false;
                        }
                    });
                }
                if (postDigestElements.length > 1) return;
                $rootScope.$$postDigest(function() {
                    forEach(postDigestElements, function(element) {
                        var data = postDigestQueue.get(element);
                        if (data) {
                            var existing = splitClasses(element.attr("class"));
                            var toAdd = "";
                            var toRemove = "";
                            forEach(data, function(status, className) {
                                var hasClass = !!existing[className];
                                if (status !== hasClass) {
                                    if (status) {
                                        toAdd += (toAdd.length ? " " : "") + className;
                                    } else {
                                        toRemove += (toRemove.length ? " " : "") + className;
                                    }
                                }
                            });
                            forEach(element, function(elm) {
                                toAdd && jqLiteAddClass(elm, toAdd);
                                toRemove && jqLiteRemoveClass(elm, toRemove);
                            });
                            postDigestQueue.remove(element);
                        }
                    });
                    postDigestElements.length = 0;
                });
            }
        } ];
    };
    var $AnimateProvider = [ "$provide", function($provide) {
        var provider = this;
        this.$$registeredAnimations = Object.create(null);
        this.register = function(name, factory) {
            if (name && name.charAt(0) !== ".") {
                throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
            }
            var key = name + "-animation";
            provider.$$registeredAnimations[name.substr(1)] = key;
            $provide.factory(key, factory);
        };
        this.classNameFilter = function(expression) {
            if (arguments.length === 1) {
                this.$$classNameFilter = expression instanceof RegExp ? expression : null;
                if (this.$$classNameFilter) {
                    var reservedRegex = new RegExp("(\\s+|\\/)" + NG_ANIMATE_CLASSNAME + "(\\s+|\\/)");
                    if (reservedRegex.test(this.$$classNameFilter.toString())) {
                        throw $animateMinErr("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', NG_ANIMATE_CLASSNAME);
                    }
                }
            }
            return this.$$classNameFilter;
        };
        this.$get = [ "$$animateQueue", function($$animateQueue) {
            function domInsert(element, parentElement, afterElement) {
                if (afterElement) {
                    var afterNode = extractElementNode(afterElement);
                    if (afterNode && !afterNode.parentNode && !afterNode.previousElementSibling) {
                        afterElement = null;
                    }
                }
                afterElement ? afterElement.after(element) : parentElement.prepend(element);
            }
            return {
                on: $$animateQueue.on,
                off: $$animateQueue.off,
                pin: $$animateQueue.pin,
                enabled: $$animateQueue.enabled,
                cancel: function(runner) {
                    runner.end && runner.end();
                },
                enter: function(element, parent, after, options) {
                    parent = parent && jqLite(parent);
                    after = after && jqLite(after);
                    parent = parent || after.parent();
                    domInsert(element, parent, after);
                    return $$animateQueue.push(element, "enter", prepareAnimateOptions(options));
                },
                move: function(element, parent, after, options) {
                    parent = parent && jqLite(parent);
                    after = after && jqLite(after);
                    parent = parent || after.parent();
                    domInsert(element, parent, after);
                    return $$animateQueue.push(element, "move", prepareAnimateOptions(options));
                },
                leave: function(element, options) {
                    return $$animateQueue.push(element, "leave", prepareAnimateOptions(options), function() {
                        element.remove();
                    });
                },
                addClass: function(element, className, options) {
                    options = prepareAnimateOptions(options);
                    options.addClass = mergeClasses(options.addclass, className);
                    return $$animateQueue.push(element, "addClass", options);
                },
                removeClass: function(element, className, options) {
                    options = prepareAnimateOptions(options);
                    options.removeClass = mergeClasses(options.removeClass, className);
                    return $$animateQueue.push(element, "removeClass", options);
                },
                setClass: function(element, add, remove, options) {
                    options = prepareAnimateOptions(options);
                    options.addClass = mergeClasses(options.addClass, add);
                    options.removeClass = mergeClasses(options.removeClass, remove);
                    return $$animateQueue.push(element, "setClass", options);
                },
                animate: function(element, from, to, className, options) {
                    options = prepareAnimateOptions(options);
                    options.from = options.from ? extend(options.from, from) : from;
                    options.to = options.to ? extend(options.to, to) : to;
                    className = className || "ng-inline-animate";
                    options.tempClasses = mergeClasses(options.tempClasses, className);
                    return $$animateQueue.push(element, "animate", options);
                }
            };
        } ];
    } ];
    function $$AsyncCallbackProvider() {
        this.$get = [ "$$rAF", "$timeout", function($$rAF, $timeout) {
            return $$rAF.supported ? function(fn) {
                return $$rAF(fn);
            } : function(fn) {
                return $timeout(fn, 0, false);
            };
        } ];
    }
    function Browser(window, document, $log, $sniffer) {
        var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
        self.isMock = false;
        var outstandingRequestCount = 0;
        var outstandingRequestCallbacks = [];
        self.$$completeOutstandingRequest = completeOutstandingRequest;
        self.$$incOutstandingRequestCount = function() {
            outstandingRequestCount++;
        };
        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1));
            } finally {
                outstandingRequestCount--;
                if (outstandingRequestCount === 0) {
                    while (outstandingRequestCallbacks.length) {
                        try {
                            outstandingRequestCallbacks.pop()();
                        } catch (e) {
                            $log.error(e);
                        }
                    }
                }
            }
        }
        function getHash(url) {
            var index = url.indexOf("#");
            return index === -1 ? "" : url.substr(index + 1);
        }
        self.notifyWhenNoOutstandingRequests = function(callback) {
            if (outstandingRequestCount === 0) {
                callback();
            } else {
                outstandingRequestCallbacks.push(callback);
            }
        };
        var cachedState, lastHistoryState, lastBrowserUrl = location.href, baseElement = document.find("base"), reloadLocation = null;
        cacheState();
        lastHistoryState = cachedState;
        self.url = function(url, replace, state) {
            if (isUndefined(state)) {
                state = null;
            }
            if (location !== window.location) location = window.location;
            if (history !== window.history) history = window.history;
            if (url) {
                var sameState = lastHistoryState === state;
                if (lastBrowserUrl === url && (!$sniffer.history || sameState)) {
                    return self;
                }
                var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                lastBrowserUrl = url;
                lastHistoryState = state;
                if ($sniffer.history && (!sameBase || !sameState)) {
                    history[replace ? "replaceState" : "pushState"](state, "", url);
                    cacheState();
                    lastHistoryState = cachedState;
                } else {
                    if (!sameBase || reloadLocation) {
                        reloadLocation = url;
                    }
                    if (replace) {
                        location.replace(url);
                    } else if (!sameBase) {
                        location.href = url;
                    } else {
                        location.hash = getHash(url);
                    }
                }
                return self;
            } else {
                return reloadLocation || location.href.replace(/%27/g, "'");
            }
        };
        self.state = function() {
            return cachedState;
        };
        var urlChangeListeners = [], urlChangeInit = false;
        function cacheStateAndFireUrlChange() {
            cacheState();
            fireUrlChange();
        }
        function getCurrentState() {
            try {
                return history.state;
            } catch (e) {}
        }
        var lastCachedState = null;
        function cacheState() {
            cachedState = getCurrentState();
            cachedState = isUndefined(cachedState) ? null : cachedState;
            if (equals(cachedState, lastCachedState)) {
                cachedState = lastCachedState;
            }
            lastCachedState = cachedState;
        }
        function fireUrlChange() {
            if (lastBrowserUrl === self.url() && lastHistoryState === cachedState) {
                return;
            }
            lastBrowserUrl = self.url();
            lastHistoryState = cachedState;
            forEach(urlChangeListeners, function(listener) {
                listener(self.url(), cachedState);
            });
        }
        self.onUrlChange = function(callback) {
            if (!urlChangeInit) {
                if ($sniffer.history) jqLite(window).on("popstate", cacheStateAndFireUrlChange);
                jqLite(window).on("hashchange", cacheStateAndFireUrlChange);
                urlChangeInit = true;
            }
            urlChangeListeners.push(callback);
            return callback;
        };
        self.$$applicationDestroyed = function() {
            jqLite(window).off("hashchange popstate", cacheStateAndFireUrlChange);
        };
        self.$$checkUrlChange = fireUrlChange;
        self.baseHref = function() {
            var href = baseElement.attr("href");
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        self.defer = function(fn, delay) {
            var timeoutId;
            outstandingRequestCount++;
            timeoutId = setTimeout(function() {
                delete pendingDeferIds[timeoutId];
                completeOutstandingRequest(fn);
            }, delay || 0);
            pendingDeferIds[timeoutId] = true;
            return timeoutId;
        };
        self.defer.cancel = function(deferId) {
            if (pendingDeferIds[deferId]) {
                delete pendingDeferIds[deferId];
                clearTimeout(deferId);
                completeOutstandingRequest(noop);
                return true;
            }
            return false;
        };
    }
    function $BrowserProvider() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function($window, $log, $sniffer, $document) {
            return new Browser($window, $document, $log, $sniffer);
        } ];
    }
    function $CacheFactoryProvider() {
        this.$get = function() {
            var caches = {};
            function cacheFactory(cacheId, options) {
                if (cacheId in caches) {
                    throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                }
                var size = 0, stats = extend({}, options, {
                    id: cacheId
                }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
                return caches[cacheId] = {
                    put: function(key, value) {
                        if (isUndefined(value)) return;
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key] || (lruHash[key] = {
                                key: key
                            });
                            refresh(lruEntry);
                        }
                        if (!(key in data)) size++;
                        data[key] = value;
                        if (size > capacity) {
                            this.remove(staleEnd.key);
                        }
                        return value;
                    },
                    get: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            refresh(lruEntry);
                        }
                        return data[key];
                    },
                    remove: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            if (lruEntry == freshEnd) freshEnd = lruEntry.p;
                            if (lruEntry == staleEnd) staleEnd = lruEntry.n;
                            link(lruEntry.n, lruEntry.p);
                            delete lruHash[key];
                        }
                        delete data[key];
                        size--;
                    },
                    removeAll: function() {
                        data = {};
                        size = 0;
                        lruHash = {};
                        freshEnd = staleEnd = null;
                    },
                    destroy: function() {
                        data = null;
                        stats = null;
                        lruHash = null;
                        delete caches[cacheId];
                    },
                    info: function() {
                        return extend({}, stats, {
                            size: size
                        });
                    }
                };
                function refresh(entry) {
                    if (entry != freshEnd) {
                        if (!staleEnd) {
                            staleEnd = entry;
                        } else if (staleEnd == entry) {
                            staleEnd = entry.n;
                        }
                        link(entry.n, entry.p);
                        link(entry, freshEnd);
                        freshEnd = entry;
                        freshEnd.n = null;
                    }
                }
                function link(nextEntry, prevEntry) {
                    if (nextEntry != prevEntry) {
                        if (nextEntry) nextEntry.p = prevEntry;
                        if (prevEntry) prevEntry.n = nextEntry;
                    }
                }
            }
            cacheFactory.info = function() {
                var info = {};
                forEach(caches, function(cache, cacheId) {
                    info[cacheId] = cache.info();
                });
                return info;
            };
            cacheFactory.get = function(cacheId) {
                return caches[cacheId];
            };
            return cacheFactory;
        };
    }
    function $TemplateCacheProvider() {
        this.$get = [ "$cacheFactory", function($cacheFactory) {
            return $cacheFactory("templates");
        } ];
    }
    var $compileMinErr = minErr("$compile");
    $CompileProvider.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    function $CompileProvider($provide, $$sanitizeUriProvider) {
        var hasDirectives = {}, Suffix = "Directive", COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\w\-]+)(?:\:([^;]+))?;?)/, ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"), REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/;
        var EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        function parseIsolateBindings(scope, directiveName, isController) {
            var LOCAL_REGEXP = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/;
            var bindings = {};
            forEach(scope, function(definition, scopeName) {
                var match = definition.match(LOCAL_REGEXP);
                if (!match) {
                    throw $compileMinErr("iscp", "Invalid {3} for directive '{0}'." + " Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition, isController ? "controller bindings definition" : "isolate scope definition");
                }
                bindings[scopeName] = {
                    mode: match[1][0],
                    collection: match[2] === "*",
                    optional: match[3] === "?",
                    attrName: match[4] || scopeName
                };
            });
            return bindings;
        }
        function parseDirectiveBindings(directive, directiveName) {
            var bindings = {
                isolateScope: null,
                bindToController: null
            };
            if (isObject(directive.scope)) {
                if (directive.bindToController === true) {
                    bindings.bindToController = parseIsolateBindings(directive.scope, directiveName, true);
                    bindings.isolateScope = {};
                } else {
                    bindings.isolateScope = parseIsolateBindings(directive.scope, directiveName, false);
                }
            }
            if (isObject(directive.bindToController)) {
                bindings.bindToController = parseIsolateBindings(directive.bindToController, directiveName, true);
            }
            if (isObject(bindings.bindToController)) {
                var controller = directive.controller;
                var controllerAs = directive.controllerAs;
                if (!controller) {
                    throw $compileMinErr("noctrl", "Cannot bind to controller without directive '{0}'s controller.", directiveName);
                } else if (!identifierForController(controller, controllerAs)) {
                    throw $compileMinErr("noident", "Cannot bind to controller without identifier for directive '{0}'.", directiveName);
                }
            }
            return bindings;
        }
        function assertValidDirectiveName(name) {
            var letter = name.charAt(0);
            if (!letter || letter !== lowercase(letter)) {
                throw $compileMinErr("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", name);
            }
            if (name !== name.trim()) {
                throw $compileMinErr("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", name);
            }
        }
        this.directive = function registerDirective(name, directiveFactory) {
            assertNotHasOwnProperty(name, "directive");
            if (isString(name)) {
                assertValidDirectiveName(name);
                assertArg(directiveFactory, "directiveFactory");
                if (!hasDirectives.hasOwnProperty(name)) {
                    hasDirectives[name] = [];
                    $provide.factory(name + Suffix, [ "$injector", "$exceptionHandler", function($injector, $exceptionHandler) {
                        var directives = [];
                        forEach(hasDirectives[name], function(directiveFactory, index) {
                            try {
                                var directive = $injector.invoke(directiveFactory);
                                if (isFunction(directive)) {
                                    directive = {
                                        compile: valueFn(directive)
                                    };
                                } else if (!directive.compile && directive.link) {
                                    directive.compile = valueFn(directive.link);
                                }
                                directive.priority = directive.priority || 0;
                                directive.index = index;
                                directive.name = directive.name || name;
                                directive.require = directive.require || directive.controller && directive.name;
                                directive.restrict = directive.restrict || "EA";
                                var bindings = directive.$$bindings = parseDirectiveBindings(directive, directive.name);
                                if (isObject(bindings.isolateScope)) {
                                    directive.$$isolateBindings = bindings.isolateScope;
                                }
                                directive.$$moduleName = directiveFactory.$$moduleName;
                                directives.push(directive);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        });
                        return directives;
                    } ]);
                }
                hasDirectives[name].push(directiveFactory);
            } else {
                forEach(name, reverseParams(registerDirective));
            }
            return this;
        };
        this.aHrefSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                $$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.aHrefSanitizationWhitelist();
            }
        };
        this.imgSrcSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                $$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
            }
        };
        var debugInfoEnabled = true;
        this.debugInfoEnabled = function(enabled) {
            if (isDefined(enabled)) {
                debugInfoEnabled = enabled;
                return this;
            }
            return debugInfoEnabled;
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $document, $sce, $animate, $$sanitizeUri) {
            var Attributes = function(element, attributesToCopy) {
                if (attributesToCopy) {
                    var keys = Object.keys(attributesToCopy);
                    var i, l, key;
                    for (i = 0, l = keys.length; i < l; i++) {
                        key = keys[i];
                        this[key] = attributesToCopy[key];
                    }
                } else {
                    this.$attr = {};
                }
                this.$$element = element;
            };
            Attributes.prototype = {
                $normalize: directiveNormalize,
                $addClass: function(classVal) {
                    if (classVal && classVal.length > 0) {
                        $animate.addClass(this.$$element, classVal);
                    }
                },
                $removeClass: function(classVal) {
                    if (classVal && classVal.length > 0) {
                        $animate.removeClass(this.$$element, classVal);
                    }
                },
                $updateClass: function(newClasses, oldClasses) {
                    var toAdd = tokenDifference(newClasses, oldClasses);
                    if (toAdd && toAdd.length) {
                        $animate.addClass(this.$$element, toAdd);
                    }
                    var toRemove = tokenDifference(oldClasses, newClasses);
                    if (toRemove && toRemove.length) {
                        $animate.removeClass(this.$$element, toRemove);
                    }
                },
                $set: function(key, value, writeAttr, attrName) {
                    var node = this.$$element[0], booleanKey = getBooleanAttrName(node, key), aliasedKey = getAliasedAttrName(node, key), observer = key, nodeName;
                    if (booleanKey) {
                        this.$$element.prop(key, value);
                        attrName = booleanKey;
                    } else if (aliasedKey) {
                        this[aliasedKey] = value;
                        observer = aliasedKey;
                    }
                    this[key] = value;
                    if (attrName) {
                        this.$attr[key] = attrName;
                    } else {
                        attrName = this.$attr[key];
                        if (!attrName) {
                            this.$attr[key] = attrName = snake_case(key, "-");
                        }
                    }
                    nodeName = nodeName_(this.$$element);
                    if (nodeName === "a" && key === "href" || nodeName === "img" && key === "src") {
                        this[key] = value = $$sanitizeUri(value, key === "src");
                    } else if (nodeName === "img" && key === "srcset") {
                        var result = "";
                        var trimmedSrcset = trim(value);
                        var srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/;
                        var pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/;
                        var rawUris = trimmedSrcset.split(pattern);
                        var nbrUrisWith2parts = Math.floor(rawUris.length / 2);
                        for (var i = 0; i < nbrUrisWith2parts; i++) {
                            var innerIdx = i * 2;
                            result += $$sanitizeUri(trim(rawUris[innerIdx]), true);
                            result += " " + trim(rawUris[innerIdx + 1]);
                        }
                        var lastTuple = trim(rawUris[i * 2]).split(/\s/);
                        result += $$sanitizeUri(trim(lastTuple[0]), true);
                        if (lastTuple.length === 2) {
                            result += " " + trim(lastTuple[1]);
                        }
                        this[key] = value = result;
                    }
                    if (writeAttr !== false) {
                        if (value === null || value === undefined) {
                            this.$$element.removeAttr(attrName);
                        } else {
                            this.$$element.attr(attrName, value);
                        }
                    }
                    var $$observers = this.$$observers;
                    $$observers && forEach($$observers[observer], function(fn) {
                        try {
                            fn(value);
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    });
                },
                $observe: function(key, fn) {
                    var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = createMap()), listeners = $$observers[key] || ($$observers[key] = []);
                    listeners.push(fn);
                    $rootScope.$evalAsync(function() {
                        if (!listeners.$$inter && attrs.hasOwnProperty(key)) {
                            fn(attrs[key]);
                        }
                    });
                    return function() {
                        arrayRemove(listeners, fn);
                    };
                }
            };
            function safeAddClass($element, className) {
                try {
                    $element.addClass(className);
                } catch (e) {}
            }
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == "{{" || endSymbol == "}}" ? identity : function denormalizeTemplate(template) {
                return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
            }, NG_ATTR_BINDING = /^ngAttr[A-Z]/;
            compile.$$addBindingInfo = debugInfoEnabled ? function $$addBindingInfo($element, binding) {
                var bindings = $element.data("$binding") || [];
                if (isArray(binding)) {
                    bindings = bindings.concat(binding);
                } else {
                    bindings.push(binding);
                }
                $element.data("$binding", bindings);
            } : noop;
            compile.$$addBindingClass = debugInfoEnabled ? function $$addBindingClass($element) {
                safeAddClass($element, "ng-binding");
            } : noop;
            compile.$$addScopeInfo = debugInfoEnabled ? function $$addScopeInfo($element, scope, isolated, noTemplate) {
                var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                $element.data(dataName, scope);
            } : noop;
            compile.$$addScopeClass = debugInfoEnabled ? function $$addScopeClass($element, isolated) {
                safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope");
            } : noop;
            return compile;
            function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                if (!($compileNodes instanceof jqLite)) {
                    $compileNodes = jqLite($compileNodes);
                }
                forEach($compileNodes, function(node, index) {
                    if (node.nodeType == NODE_TYPE_TEXT && node.nodeValue.match(/\S+/)) {
                        $compileNodes[index] = jqLite(node).wrap("<span></span>").parent()[0];
                    }
                });
                var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                compile.$$addScopeClass($compileNodes);
                var namespace = null;
                return function publicLinkFn(scope, cloneConnectFn, options) {
                    assertArg(scope, "scope");
                    options = options || {};
                    var parentBoundTranscludeFn = options.parentBoundTranscludeFn, transcludeControllers = options.transcludeControllers, futureParentElement = options.futureParentElement;
                    if (parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude) {
                        parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude;
                    }
                    if (!namespace) {
                        namespace = detectNamespaceForChildElements(futureParentElement);
                    }
                    var $linkNode;
                    if (namespace !== "html") {
                        $linkNode = jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html()));
                    } else if (cloneConnectFn) {
                        $linkNode = JQLitePrototype.clone.call($compileNodes);
                    } else {
                        $linkNode = $compileNodes;
                    }
                    if (transcludeControllers) {
                        for (var controllerName in transcludeControllers) {
                            $linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                        }
                    }
                    compile.$$addScopeInfo($linkNode, scope);
                    if (cloneConnectFn) cloneConnectFn($linkNode, scope);
                    if (compositeLinkFn) compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn);
                    return $linkNode;
                };
            }
            function detectNamespaceForChildElements(parentElement) {
                var node = parentElement && parentElement[0];
                if (!node) {
                    return "html";
                } else {
                    return nodeName_(node) !== "foreignobject" && node.toString().match(/SVG/) ? "svg" : "html";
                }
            }
            function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                var linkFns = [], attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound;
                for (var i = 0; i < nodeList.length; i++) {
                    attrs = new Attributes();
                    directives = collectDirectives(nodeList[i], [], attrs, i === 0 ? maxPriority : undefined, ignoreDirective);
                    nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null;
                    if (nodeLinkFn && nodeLinkFn.scope) {
                        compile.$$addScopeClass(attrs.$$element);
                    }
                    childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn);
                    if (nodeLinkFn || childLinkFn) {
                        linkFns.push(i, nodeLinkFn, childLinkFn);
                        linkFnFound = true;
                        nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn;
                    }
                    previousCompileContext = null;
                }
                return linkFnFound ? compositeLinkFn : null;
                function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                    var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn;
                    var stableNodeList;
                    if (nodeLinkFnFound) {
                        var nodeListLength = nodeList.length;
                        stableNodeList = new Array(nodeListLength);
                        for (i = 0; i < linkFns.length; i += 3) {
                            idx = linkFns[i];
                            stableNodeList[idx] = nodeList[idx];
                        }
                    } else {
                        stableNodeList = nodeList;
                    }
                    for (i = 0, ii = linkFns.length; i < ii; ) {
                        node = stableNodeList[linkFns[i++]];
                        nodeLinkFn = linkFns[i++];
                        childLinkFn = linkFns[i++];
                        if (nodeLinkFn) {
                            if (nodeLinkFn.scope) {
                                childScope = scope.$new();
                                compile.$$addScopeInfo(jqLite(node), childScope);
                                var destroyBindings = nodeLinkFn.$$destroyBindings;
                                if (destroyBindings) {
                                    nodeLinkFn.$$destroyBindings = null;
                                    childScope.$on("$destroyed", destroyBindings);
                                }
                            } else {
                                childScope = scope;
                            }
                            if (nodeLinkFn.transcludeOnThisElement) {
                                childBoundTranscludeFn = createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn);
                            } else if (!nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn) {
                                childBoundTranscludeFn = parentBoundTranscludeFn;
                            } else if (!parentBoundTranscludeFn && transcludeFn) {
                                childBoundTranscludeFn = createBoundTranscludeFn(scope, transcludeFn);
                            } else {
                                childBoundTranscludeFn = null;
                            }
                            nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn, nodeLinkFn);
                        } else if (childLinkFn) {
                            childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn);
                        }
                    }
                }
            }
            function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                var boundTranscludeFn = function(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                    if (!transcludedScope) {
                        transcludedScope = scope.$new(false, containingScope);
                        transcludedScope.$$transcluded = true;
                    }
                    return transcludeFn(transcludedScope, cloneFn, {
                        parentBoundTranscludeFn: previousBoundTranscludeFn,
                        transcludeControllers: controllers,
                        futureParentElement: futureParentElement
                    });
                };
                return boundTranscludeFn;
            }
            function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
                switch (nodeType) {
                  case NODE_TYPE_ELEMENT:
                    addDirective(directives, directiveNormalize(nodeName_(node)), "E", maxPriority, ignoreDirective);
                    for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                        var attrStartName = false;
                        var attrEndName = false;
                        attr = nAttrs[j];
                        name = attr.name;
                        value = trim(attr.value);
                        ngAttrName = directiveNormalize(name);
                        if (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) {
                            name = name.replace(PREFIX_REGEXP, "").substr(8).replace(/_(.)/g, function(match, letter) {
                                return letter.toUpperCase();
                            });
                        }
                        var directiveNName = ngAttrName.replace(/(Start|End)$/, "");
                        if (directiveIsMultiElement(directiveNName)) {
                            if (ngAttrName === directiveNName + "Start") {
                                attrStartName = name;
                                attrEndName = name.substr(0, name.length - 5) + "end";
                                name = name.substr(0, name.length - 6);
                            }
                        }
                        nName = directiveNormalize(name.toLowerCase());
                        attrsMap[nName] = name;
                        if (isNgAttr || !attrs.hasOwnProperty(nName)) {
                            attrs[nName] = value;
                            if (getBooleanAttrName(node, nName)) {
                                attrs[nName] = true;
                            }
                        }
                        addAttrInterpolateDirective(node, directives, value, nName, isNgAttr);
                        addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName);
                    }
                    className = node.className;
                    if (isObject(className)) {
                        className = className.animVal;
                    }
                    if (isString(className) && className !== "") {
                        while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                            nName = directiveNormalize(match[2]);
                            if (addDirective(directives, nName, "C", maxPriority, ignoreDirective)) {
                                attrs[nName] = trim(match[3]);
                            }
                            className = className.substr(match.index + match[0].length);
                        }
                    }
                    break;

                  case NODE_TYPE_TEXT:
                    if (msie === 11) {
                        while (node.parentNode && node.nextSibling && node.nextSibling.nodeType === NODE_TYPE_TEXT) {
                            node.nodeValue = node.nodeValue + node.nextSibling.nodeValue;
                            node.parentNode.removeChild(node.nextSibling);
                        }
                    }
                    addTextInterpolateDirective(directives, node.nodeValue);
                    break;

                  case NODE_TYPE_COMMENT:
                    try {
                        match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                        if (match) {
                            nName = directiveNormalize(match[1]);
                            if (addDirective(directives, nName, "M", maxPriority, ignoreDirective)) {
                                attrs[nName] = trim(match[2]);
                            }
                        }
                    } catch (e) {}
                    break;
                }
                directives.sort(byPriority);
                return directives;
            }
            function groupScan(node, attrStart, attrEnd) {
                var nodes = [];
                var depth = 0;
                if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                    do {
                        if (!node) {
                            throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                        }
                        if (node.nodeType == NODE_TYPE_ELEMENT) {
                            if (node.hasAttribute(attrStart)) depth++;
                            if (node.hasAttribute(attrEnd)) depth--;
                        }
                        nodes.push(node);
                        node = node.nextSibling;
                    } while (depth > 0);
                } else {
                    nodes.push(node);
                }
                return jqLite(nodes);
            }
            function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                return function(scope, element, attrs, controllers, transcludeFn) {
                    element = groupScan(element[0], attrStart, attrEnd);
                    return linkFn(scope, element, attrs, controllers, transcludeFn);
                };
            }
            function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                previousCompileContext = previousCompileContext || {};
                var terminalPriority = -Number.MAX_VALUE, newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = false, hasTemplate = false, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, linkFn, directiveValue;
                for (var i = 0, ii = directives.length; i < ii; i++) {
                    directive = directives[i];
                    var attrStart = directive.$$start;
                    var attrEnd = directive.$$end;
                    if (attrStart) {
                        $compileNode = groupScan(compileNode, attrStart, attrEnd);
                    }
                    $template = undefined;
                    if (terminalPriority > directive.priority) {
                        break;
                    }
                    if (directiveValue = directive.scope) {
                        if (!directive.templateUrl) {
                            if (isObject(directiveValue)) {
                                assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode);
                                newIsolateScopeDirective = directive;
                            } else {
                                assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode);
                            }
                        }
                        newScopeDirective = newScopeDirective || directive;
                    }
                    directiveName = directive.name;
                    if (!directive.templateUrl && directive.controller) {
                        directiveValue = directive.controller;
                        controllerDirectives = controllerDirectives || createMap();
                        assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode);
                        controllerDirectives[directiveName] = directive;
                    }
                    if (directiveValue = directive.transclude) {
                        hasTranscludeDirective = true;
                        if (!directive.$$tlb) {
                            assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode);
                            nonTlbTranscludeDirective = directive;
                        }
                        if (directiveValue == "element") {
                            hasElementTranscludeDirective = true;
                            terminalPriority = directive.priority;
                            $template = $compileNode;
                            $compileNode = templateAttrs.$$element = jqLite(document.createComment(" " + directiveName + ": " + templateAttrs[directiveName] + " "));
                            compileNode = $compileNode[0];
                            replaceWith(jqCollection, sliceArgs($template), compileNode);
                            childTranscludeFn = compile($template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                                nonTlbTranscludeDirective: nonTlbTranscludeDirective
                            });
                        } else {
                            $template = jqLite(jqLiteClone(compileNode)).contents();
                            $compileNode.empty();
                            childTranscludeFn = compile($template, transcludeFn);
                        }
                    }
                    if (directive.template) {
                        hasTemplate = true;
                        assertNoDuplicate("template", templateDirective, directive, $compileNode);
                        templateDirective = directive;
                        directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template;
                        directiveValue = denormalizeTemplate(directiveValue);
                        if (directive.replace) {
                            replaceDirective = directive;
                            if (jqLiteIsTextNode(directiveValue)) {
                                $template = [];
                            } else {
                                $template = removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue)));
                            }
                            compileNode = $template[0];
                            if ($template.length != 1 || compileNode.nodeType !== NODE_TYPE_ELEMENT) {
                                throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                            }
                            replaceWith(jqCollection, $compileNode, compileNode);
                            var newTemplateAttrs = {
                                $attr: {}
                            };
                            var templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs);
                            var unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                            if (newIsolateScopeDirective) {
                                markDirectivesAsIsolate(templateDirectives);
                            }
                            directives = directives.concat(templateDirectives).concat(unprocessedDirectives);
                            mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                            ii = directives.length;
                        } else {
                            $compileNode.html(directiveValue);
                        }
                    }
                    if (directive.templateUrl) {
                        hasTemplate = true;
                        assertNoDuplicate("template", templateDirective, directive, $compileNode);
                        templateDirective = directive;
                        if (directive.replace) {
                            replaceDirective = directive;
                        }
                        nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                            controllerDirectives: controllerDirectives,
                            newIsolateScopeDirective: newIsolateScopeDirective,
                            templateDirective: templateDirective,
                            nonTlbTranscludeDirective: nonTlbTranscludeDirective
                        });
                        ii = directives.length;
                    } else if (directive.compile) {
                        try {
                            linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                            if (isFunction(linkFn)) {
                                addLinkFns(null, linkFn, attrStart, attrEnd);
                            } else if (linkFn) {
                                addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
                            }
                        } catch (e) {
                            $exceptionHandler(e, startingTag($compileNode));
                        }
                    }
                    if (directive.terminal) {
                        nodeLinkFn.terminal = true;
                        terminalPriority = Math.max(terminalPriority, directive.priority);
                    }
                }
                nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === true;
                nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective;
                nodeLinkFn.templateOnThisElement = hasTemplate;
                nodeLinkFn.transclude = childTranscludeFn;
                previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective;
                return nodeLinkFn;
                function addLinkFns(pre, post, attrStart, attrEnd) {
                    if (pre) {
                        if (attrStart) pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd);
                        pre.require = directive.require;
                        pre.directiveName = directiveName;
                        if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                            pre = cloneAndAnnotateFn(pre, {
                                isolateScope: true
                            });
                        }
                        preLinkFns.push(pre);
                    }
                    if (post) {
                        if (attrStart) post = groupElementsLinkFnWrapper(post, attrStart, attrEnd);
                        post.require = directive.require;
                        post.directiveName = directiveName;
                        if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                            post = cloneAndAnnotateFn(post, {
                                isolateScope: true
                            });
                        }
                        postLinkFns.push(post);
                    }
                }
                function getControllers(directiveName, require, $element, elementControllers) {
                    var value;
                    if (isString(require)) {
                        var match = require.match(REQUIRE_PREFIX_REGEXP);
                        var name = require.substring(match[0].length);
                        var inheritType = match[1] || match[3];
                        var optional = match[2] === "?";
                        if (inheritType === "^^") {
                            $element = $element.parent();
                        } else {
                            value = elementControllers && elementControllers[name];
                            value = value && value.instance;
                        }
                        if (!value) {
                            var dataName = "$" + name + "Controller";
                            value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName);
                        }
                        if (!value && !optional) {
                            throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", name, directiveName);
                        }
                    } else if (isArray(require)) {
                        value = [];
                        for (var i = 0, ii = require.length; i < ii; i++) {
                            value[i] = getControllers(directiveName, require[i], $element, elementControllers);
                        }
                    }
                    return value || null;
                }
                function setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope) {
                    var elementControllers = createMap();
                    for (var controllerKey in controllerDirectives) {
                        var directive = controllerDirectives[controllerKey];
                        var locals = {
                            $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                            $element: $element,
                            $attrs: attrs,
                            $transclude: transcludeFn
                        };
                        var controller = directive.controller;
                        if (controller == "@") {
                            controller = attrs[directive.name];
                        }
                        var controllerInstance = $controller(controller, locals, true, directive.controllerAs);
                        elementControllers[directive.name] = controllerInstance;
                        if (!hasElementTranscludeDirective) {
                            $element.data("$" + directive.name + "Controller", controllerInstance.instance);
                        }
                    }
                    return elementControllers;
                }
                function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn, thisLinkFn) {
                    var i, ii, linkFn, controller, isolateScope, elementControllers, transcludeFn, $element, attrs;
                    if (compileNode === linkNode) {
                        attrs = templateAttrs;
                        $element = templateAttrs.$$element;
                    } else {
                        $element = jqLite(linkNode);
                        attrs = new Attributes($element, templateAttrs);
                    }
                    if (newIsolateScopeDirective) {
                        isolateScope = scope.$new(true);
                    }
                    if (boundTranscludeFn) {
                        transcludeFn = controllersBoundTransclude;
                        transcludeFn.$$boundTransclude = boundTranscludeFn;
                    }
                    if (controllerDirectives) {
                        elementControllers = setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope);
                    }
                    if (newIsolateScopeDirective) {
                        compile.$$addScopeInfo($element, isolateScope, true, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective)));
                        compile.$$addScopeClass($element, true);
                        isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings;
                        initializeDirectiveBindings(scope, attrs, isolateScope, isolateScope.$$isolateBindings, newIsolateScopeDirective, isolateScope);
                    }
                    if (elementControllers) {
                        var scopeDirective = newIsolateScopeDirective || newScopeDirective;
                        var bindings;
                        var controllerForBindings;
                        if (scopeDirective && elementControllers[scopeDirective.name]) {
                            bindings = scopeDirective.$$bindings.bindToController;
                            controller = elementControllers[scopeDirective.name];
                            if (controller && controller.identifier && bindings) {
                                controllerForBindings = controller;
                                thisLinkFn.$$destroyBindings = initializeDirectiveBindings(scope, attrs, controller.instance, bindings, scopeDirective);
                            }
                        }
                        for (i in elementControllers) {
                            controller = elementControllers[i];
                            var controllerResult = controller();
                            if (controllerResult !== controller.instance) {
                                controller.instance = controllerResult;
                                $element.data("$" + i + "Controller", controllerResult);
                                if (controller === controllerForBindings) {
                                    thisLinkFn.$$destroyBindings();
                                    thisLinkFn.$$destroyBindings = initializeDirectiveBindings(scope, attrs, controllerResult, bindings, scopeDirective);
                                }
                            }
                        }
                    }
                    for (i = 0, ii = preLinkFns.length; i < ii; i++) {
                        linkFn = preLinkFns[i];
                        invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    }
                    var scopeToChild = scope;
                    if (newIsolateScopeDirective && (newIsolateScopeDirective.template || newIsolateScopeDirective.templateUrl === null)) {
                        scopeToChild = isolateScope;
                    }
                    childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn);
                    for (i = postLinkFns.length - 1; i >= 0; i--) {
                        linkFn = postLinkFns[i];
                        invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    }
                    function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement) {
                        var transcludeControllers;
                        if (!isScope(scope)) {
                            futureParentElement = cloneAttachFn;
                            cloneAttachFn = scope;
                            scope = undefined;
                        }
                        if (hasElementTranscludeDirective) {
                            transcludeControllers = elementControllers;
                        }
                        if (!futureParentElement) {
                            futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element;
                        }
                        return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                    }
                }
            }
            function markDirectivesAsIsolate(directives) {
                for (var j = 0, jj = directives.length; j < jj; j++) {
                    directives[j] = inherit(directives[j], {
                        $$isolateScope: true
                    });
                }
            }
            function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                if (name === ignoreDirective) return null;
                var match = null;
                if (hasDirectives.hasOwnProperty(name)) {
                    for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
                        try {
                            directive = directives[i];
                            if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                                if (startAttrName) {
                                    directive = inherit(directive, {
                                        $$start: startAttrName,
                                        $$end: endAttrName
                                    });
                                }
                                tDirectives.push(directive);
                                match = directive;
                            }
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    }
                }
                return match;
            }
            function directiveIsMultiElement(name) {
                if (hasDirectives.hasOwnProperty(name)) {
                    for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
                        directive = directives[i];
                        if (directive.multiElement) {
                            return true;
                        }
                    }
                }
                return false;
            }
            function mergeTemplateAttributes(dst, src) {
                var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
                forEach(dst, function(value, key) {
                    if (key.charAt(0) != "$") {
                        if (src[key] && src[key] !== value) {
                            value += (key === "style" ? ";" : " ") + src[key];
                        }
                        dst.$set(key, value, true, srcAttr[key]);
                    }
                });
                forEach(src, function(value, key) {
                    if (key == "class") {
                        safeAddClass($element, value);
                        dst["class"] = (dst["class"] ? dst["class"] + " " : "") + value;
                    } else if (key == "style") {
                        $element.attr("style", $element.attr("style") + ";" + value);
                        dst["style"] = (dst["style"] ? dst["style"] + ";" : "") + value;
                    } else if (key.charAt(0) != "$" && !dst.hasOwnProperty(key)) {
                        dst[key] = value;
                        dstAttr[key] = srcAttr[key];
                    }
                });
            }
            function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = inherit(origAsyncDirective, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: origAsyncDirective
                }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl, templateNamespace = origAsyncDirective.templateNamespace;
                $compileNode.empty();
                $templateRequest($sce.getTrustedResourceUrl(templateUrl)).then(function(content) {
                    var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                    content = denormalizeTemplate(content);
                    if (origAsyncDirective.replace) {
                        if (jqLiteIsTextNode(content)) {
                            $template = [];
                        } else {
                            $template = removeComments(wrapTemplate(templateNamespace, trim(content)));
                        }
                        compileNode = $template[0];
                        if ($template.length != 1 || compileNode.nodeType !== NODE_TYPE_ELEMENT) {
                            throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                        }
                        tempTemplateAttrs = {
                            $attr: {}
                        };
                        replaceWith($rootElement, $compileNode, compileNode);
                        var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                        if (isObject(origAsyncDirective.scope)) {
                            markDirectivesAsIsolate(templateDirectives);
                        }
                        directives = templateDirectives.concat(directives);
                        mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
                    } else {
                        compileNode = beforeTemplateCompileNode;
                        $compileNode.html(content);
                    }
                    directives.unshift(derivedSyncDirective);
                    afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext);
                    forEach($rootElement, function(node, i) {
                        if (node == compileNode) {
                            $rootElement[i] = $compileNode[0];
                        }
                    });
                    afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
                    while (linkQueue.length) {
                        var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), boundTranscludeFn = linkQueue.shift(), linkNode = $compileNode[0];
                        if (scope.$$destroyed) continue;
                        if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                            var oldClasses = beforeTemplateLinkNode.className;
                            if (!(previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace)) {
                                linkNode = jqLiteClone(compileNode);
                            }
                            replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
                            safeAddClass(jqLite(linkNode), oldClasses);
                        }
                        if (afterTemplateNodeLinkFn.transcludeOnThisElement) {
                            childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn);
                        } else {
                            childBoundTranscludeFn = boundTranscludeFn;
                        }
                        afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn, afterTemplateNodeLinkFn);
                    }
                    linkQueue = null;
                });
                return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                    var childBoundTranscludeFn = boundTranscludeFn;
                    if (scope.$$destroyed) return;
                    if (linkQueue) {
                        linkQueue.push(scope, node, rootElement, childBoundTranscludeFn);
                    } else {
                        if (afterTemplateNodeLinkFn.transcludeOnThisElement) {
                            childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn);
                        }
                        afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn, afterTemplateNodeLinkFn);
                    }
                };
            }
            function byPriority(a, b) {
                var diff = b.priority - a.priority;
                if (diff !== 0) return diff;
                if (a.name !== b.name) return a.name < b.name ? -1 : 1;
                return a.index - b.index;
            }
            function assertNoDuplicate(what, previousDirective, directive, element) {
                function wrapModuleNameIfDefined(moduleName) {
                    return moduleName ? " (module: " + moduleName + ")" : "";
                }
                if (previousDirective) {
                    throw $compileMinErr("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", previousDirective.name, wrapModuleNameIfDefined(previousDirective.$$moduleName), directive.name, wrapModuleNameIfDefined(directive.$$moduleName), what, startingTag(element));
                }
            }
            function addTextInterpolateDirective(directives, text) {
                var interpolateFn = $interpolate(text, true);
                if (interpolateFn) {
                    directives.push({
                        priority: 0,
                        compile: function textInterpolateCompileFn(templateNode) {
                            var templateNodeParent = templateNode.parent(), hasCompileParent = !!templateNodeParent.length;
                            if (hasCompileParent) compile.$$addBindingClass(templateNodeParent);
                            return function textInterpolateLinkFn(scope, node) {
                                var parent = node.parent();
                                if (!hasCompileParent) compile.$$addBindingClass(parent);
                                compile.$$addBindingInfo(parent, interpolateFn.expressions);
                                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                                    node[0].nodeValue = value;
                                });
                            };
                        }
                    });
                }
            }
            function wrapTemplate(type, template) {
                type = lowercase(type || "html");
                switch (type) {
                  case "svg":
                  case "math":
                    var wrapper = document.createElement("div");
                    wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">";
                    return wrapper.childNodes[0].childNodes;

                  default:
                    return template;
                }
            }
            function getTrustedContext(node, attrNormalizedName) {
                if (attrNormalizedName == "srcdoc") {
                    return $sce.HTML;
                }
                var tag = nodeName_(node);
                if (attrNormalizedName == "xlinkHref" || tag == "form" && attrNormalizedName == "action" || tag != "img" && (attrNormalizedName == "src" || attrNormalizedName == "ngSrc")) {
                    return $sce.RESOURCE_URL;
                }
            }
            function addAttrInterpolateDirective(node, directives, value, name, allOrNothing) {
                var trustedContext = getTrustedContext(node, name);
                allOrNothing = ALL_OR_NOTHING_ATTRS[name] || allOrNothing;
                var interpolateFn = $interpolate(value, true, trustedContext, allOrNothing);
                if (!interpolateFn) return;
                if (name === "multiple" && nodeName_(node) === "select") {
                    throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                }
                directives.push({
                    priority: 100,
                    compile: function() {
                        return {
                            pre: function attrInterpolatePreLinkFn(scope, element, attr) {
                                var $$observers = attr.$$observers || (attr.$$observers = {});
                                if (EVENT_HANDLER_ATTR_REGEXP.test(name)) {
                                    throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the " + "ng- versions (such as ng-click instead of onclick) instead.");
                                }
                                var newValue = attr[name];
                                if (newValue !== value) {
                                    interpolateFn = newValue && $interpolate(newValue, true, trustedContext, allOrNothing);
                                    value = newValue;
                                }
                                if (!interpolateFn) return;
                                attr[name] = interpolateFn(scope);
                                ($$observers[name] || ($$observers[name] = [])).$$inter = true;
                                (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(newValue, oldValue) {
                                    if (name === "class" && newValue != oldValue) {
                                        attr.$updateClass(newValue, oldValue);
                                    } else {
                                        attr.$set(name, newValue);
                                    }
                                });
                            }
                        };
                    }
                });
            }
            function replaceWith($rootElement, elementsToRemove, newNode) {
                var firstElementToRemove = elementsToRemove[0], removeCount = elementsToRemove.length, parent = firstElementToRemove.parentNode, i, ii;
                if ($rootElement) {
                    for (i = 0, ii = $rootElement.length; i < ii; i++) {
                        if ($rootElement[i] == firstElementToRemove) {
                            $rootElement[i++] = newNode;
                            for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; j < jj; j++, 
                            j2++) {
                                if (j2 < jj) {
                                    $rootElement[j] = $rootElement[j2];
                                } else {
                                    delete $rootElement[j];
                                }
                            }
                            $rootElement.length -= removeCount - 1;
                            if ($rootElement.context === firstElementToRemove) {
                                $rootElement.context = newNode;
                            }
                            break;
                        }
                    }
                }
                if (parent) {
                    parent.replaceChild(newNode, firstElementToRemove);
                }
                var fragment = document.createDocumentFragment();
                fragment.appendChild(firstElementToRemove);
                if (jqLite.hasData(firstElementToRemove)) {
                    jqLite(newNode).data(jqLite(firstElementToRemove).data());
                    if (!jQuery) {
                        delete jqLite.cache[firstElementToRemove[jqLite.expando]];
                    } else {
                        skipDestroyOnNextJQueryCleanData = true;
                        jQuery.cleanData([ firstElementToRemove ]);
                    }
                }
                for (var k = 1, kk = elementsToRemove.length; k < kk; k++) {
                    var element = elementsToRemove[k];
                    jqLite(element).remove();
                    fragment.appendChild(element);
                    delete elementsToRemove[k];
                }
                elementsToRemove[0] = newNode;
                elementsToRemove.length = 1;
            }
            function cloneAndAnnotateFn(fn, annotation) {
                return extend(function() {
                    return fn.apply(null, arguments);
                }, fn, annotation);
            }
            function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                try {
                    linkFn(scope, $element, attrs, controllers, transcludeFn);
                } catch (e) {
                    $exceptionHandler(e, startingTag($element));
                }
            }
            function initializeDirectiveBindings(scope, attrs, destination, bindings, directive, newScope) {
                var onNewScopeDestroyed;
                forEach(bindings, function(definition, scopeName) {
                    var attrName = definition.attrName, optional = definition.optional, mode = definition.mode, lastValue, parentGet, parentSet, compare;
                    if (!hasOwnProperty.call(attrs, attrName)) {
                        attrs[attrName] = undefined;
                    }
                    switch (mode) {
                      case "@":
                        if (!attrs[attrName] && !optional) {
                            destination[scopeName] = undefined;
                        }
                        attrs.$observe(attrName, function(value) {
                            destination[scopeName] = value;
                        });
                        attrs.$$observers[attrName].$$scope = scope;
                        if (attrs[attrName]) {
                            destination[scopeName] = $interpolate(attrs[attrName])(scope);
                        }
                        break;

                      case "=":
                        if (optional && !attrs[attrName]) {
                            return;
                        }
                        parentGet = $parse(attrs[attrName]);
                        if (parentGet.literal) {
                            compare = equals;
                        } else {
                            compare = function(a, b) {
                                return a === b || a !== a && b !== b;
                            };
                        }
                        parentSet = parentGet.assign || function() {
                            lastValue = destination[scopeName] = parentGet(scope);
                            throw $compileMinErr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", attrs[attrName], directive.name);
                        };
                        lastValue = destination[scopeName] = parentGet(scope);
                        var parentValueWatch = function parentValueWatch(parentValue) {
                            if (!compare(parentValue, destination[scopeName])) {
                                if (!compare(parentValue, lastValue)) {
                                    destination[scopeName] = parentValue;
                                } else {
                                    parentSet(scope, parentValue = destination[scopeName]);
                                }
                            }
                            return lastValue = parentValue;
                        };
                        parentValueWatch.$stateful = true;
                        var unwatch;
                        if (definition.collection) {
                            unwatch = scope.$watchCollection(attrs[attrName], parentValueWatch);
                        } else {
                            unwatch = scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal);
                        }
                        onNewScopeDestroyed = onNewScopeDestroyed || [];
                        onNewScopeDestroyed.push(unwatch);
                        break;

                      case "&":
                        parentGet = $parse(attrs[attrName]);
                        if (parentGet === noop && optional) break;
                        destination[scopeName] = function(locals) {
                            return parentGet(scope, locals);
                        };
                        break;
                    }
                });
                var destroyBindings = onNewScopeDestroyed ? function destroyBindings() {
                    for (var i = 0, ii = onNewScopeDestroyed.length; i < ii; ++i) {
                        onNewScopeDestroyed[i]();
                    }
                } : noop;
                if (newScope && destroyBindings !== noop) {
                    newScope.$on("$destroy", destroyBindings);
                    return noop;
                }
                return destroyBindings;
            }
        } ];
    }
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ""));
    }
    function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {}
    function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {}
    function tokenDifference(str1, str2) {
        var values = "", tokens1 = str1.split(/\s+/), tokens2 = str2.split(/\s+/);
        outer: for (var i = 0; i < tokens1.length; i++) {
            var token = tokens1[i];
            for (var j = 0; j < tokens2.length; j++) {
                if (token == tokens2[j]) continue outer;
            }
            values += (values.length > 0 ? " " : "") + token;
        }
        return values;
    }
    function removeComments(jqNodes) {
        jqNodes = jqLite(jqNodes);
        var i = jqNodes.length;
        if (i <= 1) {
            return jqNodes;
        }
        while (i--) {
            var node = jqNodes[i];
            if (node.nodeType === NODE_TYPE_COMMENT) {
                splice.call(jqNodes, i, 1);
            }
        }
        return jqNodes;
    }
    var $controllerMinErr = minErr("$controller");
    var CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/;
    function identifierForController(controller, ident) {
        if (ident && isString(ident)) return ident;
        if (isString(controller)) {
            var match = CNTRL_REG.exec(controller);
            if (match) return match[3];
        }
    }
    function $ControllerProvider() {
        var controllers = {}, globals = false;
        this.register = function(name, constructor) {
            assertNotHasOwnProperty(name, "controller");
            if (isObject(name)) {
                extend(controllers, name);
            } else {
                controllers[name] = constructor;
            }
        };
        this.allowGlobals = function() {
            globals = true;
        };
        this.$get = [ "$injector", "$window", function($injector, $window) {
            return function(expression, locals, later, ident) {
                var instance, match, constructor, identifier;
                later = later === true;
                if (ident && isString(ident)) {
                    identifier = ident;
                }
                if (isString(expression)) {
                    match = expression.match(CNTRL_REG);
                    if (!match) {
                        throw $controllerMinErr("ctrlfmt", "Badly formed controller string '{0}'. " + "Must match `__name__ as __id__` or `__name__`.", expression);
                    }
                    constructor = match[1], identifier = identifier || match[3];
                    expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, true) || (globals ? getter($window, constructor, true) : undefined);
                    assertArgFn(expression, constructor, true);
                }
                if (later) {
                    var controllerPrototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                    instance = Object.create(controllerPrototype || null);
                    if (identifier) {
                        addIdentifier(locals, identifier, instance, constructor || expression.name);
                    }
                    var instantiate;
                    return instantiate = extend(function() {
                        var result = $injector.invoke(expression, instance, locals, constructor);
                        if (result !== instance && (isObject(result) || isFunction(result))) {
                            instance = result;
                            if (identifier) {
                                addIdentifier(locals, identifier, instance, constructor || expression.name);
                            }
                        }
                        return instance;
                    }, {
                        instance: instance,
                        identifier: identifier
                    });
                }
                instance = $injector.instantiate(expression, locals, constructor);
                if (identifier) {
                    addIdentifier(locals, identifier, instance, constructor || expression.name);
                }
                return instance;
            };
            function addIdentifier(locals, identifier, instance, name) {
                if (!(locals && isObject(locals.$scope))) {
                    throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                }
                locals.$scope[identifier] = instance;
            }
        } ];
    }
    function $DocumentProvider() {
        this.$get = [ "$window", function(window) {
            return jqLite(window.document);
        } ];
    }
    function $ExceptionHandlerProvider() {
        this.$get = [ "$log", function($log) {
            return function(exception, cause) {
                $log.error.apply($log, arguments);
            };
        } ];
    }
    var APPLICATION_JSON = "application/json";
    var CONTENT_TYPE_APPLICATION_JSON = {
        "Content-Type": APPLICATION_JSON + ";charset=utf-8"
    };
    var JSON_START = /^\[|^\{(?!\{)/;
    var JSON_ENDS = {
        "[": /]$/,
        "{": /}$/
    };
    var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;
    function serializeValue(v) {
        if (isObject(v)) {
            return isDate(v) ? v.toISOString() : toJson(v);
        }
        return v;
    }
    function $HttpParamSerializerProvider() {
        this.$get = function() {
            return function ngParamSerializer(params) {
                if (!params) return "";
                var parts = [];
                forEachSorted(params, function(value, key) {
                    if (value === null || isUndefined(value)) return;
                    if (isArray(value)) {
                        forEach(value, function(v, k) {
                            parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(v)));
                        });
                    } else {
                        parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(value)));
                    }
                });
                return parts.join("&");
            };
        };
    }
    function $HttpParamSerializerJQLikeProvider() {
        this.$get = function() {
            return function jQueryLikeParamSerializer(params) {
                if (!params) return "";
                var parts = [];
                serialize(params, "", true);
                return parts.join("&");
                function serialize(toSerialize, prefix, topLevel) {
                    if (toSerialize === null || isUndefined(toSerialize)) return;
                    if (isArray(toSerialize)) {
                        forEach(toSerialize, function(value) {
                            serialize(value, prefix + "[]");
                        });
                    } else if (isObject(toSerialize) && !isDate(toSerialize)) {
                        forEachSorted(toSerialize, function(value, key) {
                            serialize(value, prefix + (topLevel ? "" : "[") + key + (topLevel ? "" : "]"));
                        });
                    } else {
                        parts.push(encodeUriQuery(prefix) + "=" + encodeUriQuery(serializeValue(toSerialize)));
                    }
                }
            };
        };
    }
    function defaultHttpResponseTransform(data, headers) {
        if (isString(data)) {
            var tempData = data.replace(JSON_PROTECTION_PREFIX, "").trim();
            if (tempData) {
                var contentType = headers("Content-Type");
                if (contentType && contentType.indexOf(APPLICATION_JSON) === 0 || isJsonLike(tempData)) {
                    data = fromJson(tempData);
                }
            }
        }
        return data;
    }
    function isJsonLike(str) {
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
    }
    function parseHeaders(headers) {
        var parsed = createMap(), i;
        function fillInParsed(key, val) {
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
        }
        if (isString(headers)) {
            forEach(headers.split("\n"), function(line) {
                i = line.indexOf(":");
                fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)));
            });
        } else if (isObject(headers)) {
            forEach(headers, function(headerVal, headerKey) {
                fillInParsed(lowercase(headerKey), trim(headerVal));
            });
        }
        return parsed;
    }
    function headersGetter(headers) {
        var headersObj;
        return function(name) {
            if (!headersObj) headersObj = parseHeaders(headers);
            if (name) {
                var value = headersObj[lowercase(name)];
                if (value === void 0) {
                    value = null;
                }
                return value;
            }
            return headersObj;
        };
    }
    function transformData(data, headers, status, fns) {
        if (isFunction(fns)) {
            return fns(data, headers, status);
        }
        forEach(fns, function(fn) {
            data = fn(data, headers, status);
        });
        return data;
    }
    function isSuccess(status) {
        return 200 <= status && status < 300;
    }
    function $HttpProvider() {
        var defaults = this.defaults = {
            transformResponse: [ defaultHttpResponseTransform ],
            transformRequest: [ function(d) {
                return isObject(d) && !isFile(d) && !isBlob(d) && !isFormData(d) ? toJson(d) : d;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer"
        };
        var useApplyAsync = false;
        this.useApplyAsync = function(value) {
            if (isDefined(value)) {
                useApplyAsync = !!value;
                return this;
            }
            return useApplyAsync;
        };
        var interceptorFactories = this.interceptors = [];
        this.$get = [ "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function($httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector) {
            var defaultCache = $cacheFactory("$http");
            defaults.paramSerializer = isString(defaults.paramSerializer) ? $injector.get(defaults.paramSerializer) : defaults.paramSerializer;
            var reversedInterceptors = [];
            forEach(interceptorFactories, function(interceptorFactory) {
                reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
            });
            function $http(requestConfig) {
                if (!angular.isObject(requestConfig)) {
                    throw minErr("$http")("badreq", "Http request configuration must be an object.  Received: {0}", requestConfig);
                }
                var config = extend({
                    method: "get",
                    transformRequest: defaults.transformRequest,
                    transformResponse: defaults.transformResponse,
                    paramSerializer: defaults.paramSerializer
                }, requestConfig);
                config.headers = mergeHeaders(requestConfig);
                config.method = uppercase(config.method);
                config.paramSerializer = isString(config.paramSerializer) ? $injector.get(config.paramSerializer) : config.paramSerializer;
                var serverRequest = function(config) {
                    var headers = config.headers;
                    var reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);
                    if (isUndefined(reqData)) {
                        forEach(headers, function(value, header) {
                            if (lowercase(header) === "content-type") {
                                delete headers[header];
                            }
                        });
                    }
                    if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
                        config.withCredentials = defaults.withCredentials;
                    }
                    return sendReq(config, reqData).then(transformResponse, transformResponse);
                };
                var chain = [ serverRequest, undefined ];
                var promise = $q.when(config);
                forEach(reversedInterceptors, function(interceptor) {
                    if (interceptor.request || interceptor.requestError) {
                        chain.unshift(interceptor.request, interceptor.requestError);
                    }
                    if (interceptor.response || interceptor.responseError) {
                        chain.push(interceptor.response, interceptor.responseError);
                    }
                });
                while (chain.length) {
                    var thenFn = chain.shift();
                    var rejectFn = chain.shift();
                    promise = promise.then(thenFn, rejectFn);
                }
                promise.success = function(fn) {
                    assertArgFn(fn, "fn");
                    promise.then(function(response) {
                        fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                promise.error = function(fn) {
                    assertArgFn(fn, "fn");
                    promise.then(null, function(response) {
                        fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                return promise;
                function transformResponse(response) {
                    var resp = extend({}, response);
                    if (!response.data) {
                        resp.data = response.data;
                    } else {
                        resp.data = transformData(response.data, response.headers, response.status, config.transformResponse);
                    }
                    return isSuccess(response.status) ? resp : $q.reject(resp);
                }
                function executeHeaderFns(headers, config) {
                    var headerContent, processedHeaders = {};
                    forEach(headers, function(headerFn, header) {
                        if (isFunction(headerFn)) {
                            headerContent = headerFn(config);
                            if (headerContent != null) {
                                processedHeaders[header] = headerContent;
                            }
                        } else {
                            processedHeaders[header] = headerFn;
                        }
                    });
                    return processedHeaders;
                }
                function mergeHeaders(config) {
                    var defHeaders = defaults.headers, reqHeaders = extend({}, config.headers), defHeaderName, lowercaseDefHeaderName, reqHeaderName;
                    defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                    defaultHeadersIteration: for (defHeaderName in defHeaders) {
                        lowercaseDefHeaderName = lowercase(defHeaderName);
                        for (reqHeaderName in reqHeaders) {
                            if (lowercase(reqHeaderName) === lowercaseDefHeaderName) {
                                continue defaultHeadersIteration;
                            }
                        }
                        reqHeaders[defHeaderName] = defHeaders[defHeaderName];
                    }
                    return executeHeaderFns(reqHeaders, shallowCopy(config));
                }
            }
            $http.pendingRequests = [];
            createShortMethods("get", "delete", "head", "jsonp");
            createShortMethodsWithData("post", "put", "patch");
            $http.defaults = defaults;
            return $http;
            function createShortMethods(names) {
                forEach(arguments, function(name) {
                    $http[name] = function(url, config) {
                        return $http(extend({}, config || {}, {
                            method: name,
                            url: url
                        }));
                    };
                });
            }
            function createShortMethodsWithData(name) {
                forEach(arguments, function(name) {
                    $http[name] = function(url, data, config) {
                        return $http(extend({}, config || {}, {
                            method: name,
                            url: url,
                            data: data
                        }));
                    };
                });
            }
            function sendReq(config, reqData) {
                var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, reqHeaders = config.headers, url = buildUrl(config.url, config.paramSerializer(config.params));
                $http.pendingRequests.push(config);
                promise.then(removePendingReq, removePendingReq);
                if ((config.cache || defaults.cache) && config.cache !== false && (config.method === "GET" || config.method === "JSONP")) {
                    cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache;
                }
                if (cache) {
                    cachedResp = cache.get(url);
                    if (isDefined(cachedResp)) {
                        if (isPromiseLike(cachedResp)) {
                            cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult);
                        } else {
                            if (isArray(cachedResp)) {
                                resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]);
                            } else {
                                resolvePromise(cachedResp, 200, {}, "OK");
                            }
                        }
                    } else {
                        cache.put(url, promise);
                    }
                }
                if (isUndefined(cachedResp)) {
                    var xsrfValue = urlIsSameOrigin(config.url) ? $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                    if (xsrfValue) {
                        reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
                    }
                    $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType);
                }
                return promise;
                function done(status, response, headersString, statusText) {
                    if (cache) {
                        if (isSuccess(status)) {
                            cache.put(url, [ status, response, parseHeaders(headersString), statusText ]);
                        } else {
                            cache.remove(url);
                        }
                    }
                    function resolveHttpPromise() {
                        resolvePromise(response, status, headersString, statusText);
                    }
                    if (useApplyAsync) {
                        $rootScope.$applyAsync(resolveHttpPromise);
                    } else {
                        resolveHttpPromise();
                        if (!$rootScope.$$phase) $rootScope.$apply();
                    }
                }
                function resolvePromise(response, status, headers, statusText) {
                    status = Math.max(status, 0);
                    (isSuccess(status) ? deferred.resolve : deferred.reject)({
                        data: response,
                        status: status,
                        headers: headersGetter(headers),
                        config: config,
                        statusText: statusText
                    });
                }
                function resolvePromiseWithResult(result) {
                    resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText);
                }
                function removePendingReq() {
                    var idx = $http.pendingRequests.indexOf(config);
                    if (idx !== -1) $http.pendingRequests.splice(idx, 1);
                }
            }
            function buildUrl(url, serializedParams) {
                if (serializedParams.length > 0) {
                    url += (url.indexOf("?") == -1 ? "?" : "&") + serializedParams;
                }
                return url;
            }
        } ];
    }
    function createXhr() {
        return new window.XMLHttpRequest();
    }
    function $HttpBackendProvider() {
        this.$get = [ "$browser", "$window", "$document", function($browser, $window, $document) {
            return createHttpBackend($browser, createXhr, $browser.defer, $window.angular.callbacks, $document[0]);
        } ];
    }
    function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
        return function(method, url, post, callback, headers, timeout, withCredentials, responseType) {
            $browser.$$incOutstandingRequestCount();
            url = url || $browser.url();
            if (lowercase(method) == "jsonp") {
                var callbackId = "_" + (callbacks.counter++).toString(36);
                callbacks[callbackId] = function(data) {
                    callbacks[callbackId].data = data;
                    callbacks[callbackId].called = true;
                };
                var jsonpDone = jsonpReq(url.replace("JSON_CALLBACK", "angular.callbacks." + callbackId), callbackId, function(status, text) {
                    completeRequest(callback, status, callbacks[callbackId].data, "", text);
                    callbacks[callbackId] = noop;
                });
            } else {
                var xhr = createXhr();
                xhr.open(method, url, true);
                forEach(headers, function(value, key) {
                    if (isDefined(value)) {
                        xhr.setRequestHeader(key, value);
                    }
                });
                xhr.onload = function requestLoaded() {
                    var statusText = xhr.statusText || "";
                    var response = "response" in xhr ? xhr.response : xhr.responseText;
                    var status = xhr.status === 1223 ? 204 : xhr.status;
                    if (status === 0) {
                        status = response ? 200 : urlResolve(url).protocol == "file" ? 404 : 0;
                    }
                    completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText);
                };
                var requestError = function() {
                    completeRequest(callback, -1, null, null, "");
                };
                xhr.onerror = requestError;
                xhr.onabort = requestError;
                if (withCredentials) {
                    xhr.withCredentials = true;
                }
                if (responseType) {
                    try {
                        xhr.responseType = responseType;
                    } catch (e) {
                        if (responseType !== "json") {
                            throw e;
                        }
                    }
                }
                xhr.send(post);
            }
            if (timeout > 0) {
                var timeoutId = $browserDefer(timeoutRequest, timeout);
            } else if (isPromiseLike(timeout)) {
                timeout.then(timeoutRequest);
            }
            function timeoutRequest() {
                jsonpDone && jsonpDone();
                xhr && xhr.abort();
            }
            function completeRequest(callback, status, response, headersString, statusText) {
                if (timeoutId !== undefined) {
                    $browserDefer.cancel(timeoutId);
                }
                jsonpDone = xhr = null;
                callback(status, response, headersString, statusText);
                $browser.$$completeOutstandingRequest(noop);
            }
        };
        function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement("script"), callback = null;
            script.type = "text/javascript";
            script.src = url;
            script.async = true;
            callback = function(event) {
                removeEventListenerFn(script, "load", callback);
                removeEventListenerFn(script, "error", callback);
                rawDocument.body.removeChild(script);
                script = null;
                var status = -1;
                var text = "unknown";
                if (event) {
                    if (event.type === "load" && !callbacks[callbackId].called) {
                        event = {
                            type: "error"
                        };
                    }
                    text = event.type;
                    status = event.type === "error" ? 404 : 200;
                }
                if (done) {
                    done(status, text);
                }
            };
            addEventListenerFn(script, "load", callback);
            addEventListenerFn(script, "error", callback);
            rawDocument.body.appendChild(script);
            return callback;
        }
    }
    var $interpolateMinErr = angular.$interpolateMinErr = minErr("$interpolate");
    $interpolateMinErr.throwNoconcat = function(text) {
        throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows " + "interpolations that concatenate multiple expressions when a trusted value is " + "required.  See http://docs.angularjs.org/api/ng.$sce", text);
    };
    $interpolateMinErr.interr = function(text, err) {
        return $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
    };
    function $InterpolateProvider() {
        var startSymbol = "{{";
        var endSymbol = "}}";
        this.startSymbol = function(value) {
            if (value) {
                startSymbol = value;
                return this;
            } else {
                return startSymbol;
            }
        };
        this.endSymbol = function(value) {
            if (value) {
                endSymbol = value;
                return this;
            } else {
                return endSymbol;
            }
        };
        this.$get = [ "$parse", "$exceptionHandler", "$sce", function($parse, $exceptionHandler, $sce) {
            var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length, escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"), escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
            function escape(ch) {
                return "\\\\\\" + ch;
            }
            function unescapeText(text) {
                return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol);
            }
            function stringify(value) {
                if (value == null) {
                    return "";
                }
                switch (typeof value) {
                  case "string":
                    break;

                  case "number":
                    value = "" + value;
                    break;

                  default:
                    value = toJson(value);
                }
                return value;
            }
            function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                allOrNothing = !!allOrNothing;
                var startIndex, endIndex, index = 0, expressions = [], parseFns = [], textLength = text.length, exp, concat = [], expressionPositions = [];
                while (index < textLength) {
                    if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
                        if (index !== startIndex) {
                            concat.push(unescapeText(text.substring(index, startIndex)));
                        }
                        exp = text.substring(startIndex + startSymbolLength, endIndex);
                        expressions.push(exp);
                        parseFns.push($parse(exp, parseStringifyInterceptor));
                        index = endIndex + endSymbolLength;
                        expressionPositions.push(concat.length);
                        concat.push("");
                    } else {
                        if (index !== textLength) {
                            concat.push(unescapeText(text.substring(index)));
                        }
                        break;
                    }
                }
                if (trustedContext && concat.length > 1) {
                    $interpolateMinErr.throwNoconcat(text);
                }
                if (!mustHaveExpression || expressions.length) {
                    var compute = function(values) {
                        for (var i = 0, ii = expressions.length; i < ii; i++) {
                            if (allOrNothing && isUndefined(values[i])) return;
                            concat[expressionPositions[i]] = values[i];
                        }
                        return concat.join("");
                    };
                    var getValue = function(value) {
                        return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value);
                    };
                    return extend(function interpolationFn(context) {
                        var i = 0;
                        var ii = expressions.length;
                        var values = new Array(ii);
                        try {
                            for (;i < ii; i++) {
                                values[i] = parseFns[i](context);
                            }
                            return compute(values);
                        } catch (err) {
                            $exceptionHandler($interpolateMinErr.interr(text, err));
                        }
                    }, {
                        exp: text,
                        expressions: expressions,
                        $$watchDelegate: function(scope, listener) {
                            var lastValue;
                            return scope.$watchGroup(parseFns, function interpolateFnWatcher(values, oldValues) {
                                var currValue = compute(values);
                                if (isFunction(listener)) {
                                    listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope);
                                }
                                lastValue = currValue;
                            });
                        }
                    });
                }
                function parseStringifyInterceptor(value) {
                    try {
                        value = getValue(value);
                        return allOrNothing && !isDefined(value) ? value : stringify(value);
                    } catch (err) {
                        $exceptionHandler($interpolateMinErr.interr(text, err));
                    }
                }
            }
            $interpolate.startSymbol = function() {
                return startSymbol;
            };
            $interpolate.endSymbol = function() {
                return endSymbol;
            };
            return $interpolate;
        } ];
    }
    function $IntervalProvider() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function($rootScope, $window, $q, $$q) {
            var intervals = {};
            function interval(fn, delay, count, invokeApply) {
                var hasParams = arguments.length > 4, args = hasParams ? sliceArgs(arguments, 4) : [], setInterval = $window.setInterval, clearInterval = $window.clearInterval, iteration = 0, skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                count = isDefined(count) ? count : 0;
                promise.then(null, null, !hasParams ? fn : function() {
                    fn.apply(null, args);
                });
                promise.$$intervalId = setInterval(function tick() {
                    deferred.notify(iteration++);
                    if (count > 0 && iteration >= count) {
                        deferred.resolve(iteration);
                        clearInterval(promise.$$intervalId);
                        delete intervals[promise.$$intervalId];
                    }
                    if (!skipApply) $rootScope.$apply();
                }, delay);
                intervals[promise.$$intervalId] = deferred;
                return promise;
            }
            interval.cancel = function(promise) {
                if (promise && promise.$$intervalId in intervals) {
                    intervals[promise.$$intervalId].reject("canceled");
                    $window.clearInterval(promise.$$intervalId);
                    delete intervals[promise.$$intervalId];
                    return true;
                }
                return false;
            };
            return interval;
        } ];
    }
    function $LocaleProvider() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a",
                    ERANAMES: [ "Before Christ", "Anno Domini" ],
                    ERAS: [ "BC", "AD" ]
                },
                pluralCat: function(num) {
                    if (num === 1) {
                        return "one";
                    }
                    return "other";
                }
            };
        };
    }
    var PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
        http: 80,
        https: 443,
        ftp: 21
    };
    var $locationMinErr = minErr("$location");
    function encodePath(path) {
        var segments = path.split("/"), i = segments.length;
        while (i--) {
            segments[i] = encodeUriSegment(segments[i]);
        }
        return segments.join("/");
    }
    function parseAbsoluteUrl(absoluteUrl, locationObj) {
        var parsedUrl = urlResolve(absoluteUrl);
        locationObj.$$protocol = parsedUrl.protocol;
        locationObj.$$host = parsedUrl.hostname;
        locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
    }
    function parseAppUrl(relativeUrl, locationObj) {
        var prefixed = relativeUrl.charAt(0) !== "/";
        if (prefixed) {
            relativeUrl = "/" + relativeUrl;
        }
        var match = urlResolve(relativeUrl);
        locationObj.$$path = decodeURIComponent(prefixed && match.pathname.charAt(0) === "/" ? match.pathname.substring(1) : match.pathname);
        locationObj.$$search = parseKeyValue(match.search);
        locationObj.$$hash = decodeURIComponent(match.hash);
        if (locationObj.$$path && locationObj.$$path.charAt(0) != "/") {
            locationObj.$$path = "/" + locationObj.$$path;
        }
    }
    function beginsWith(begin, whole) {
        if (whole.indexOf(begin) === 0) {
            return whole.substr(begin.length);
        }
    }
    function stripHash(url) {
        var index = url.indexOf("#");
        return index == -1 ? url : url.substr(0, index);
    }
    function trimEmptyHash(url) {
        return url.replace(/(#.+)|#$/, "$1");
    }
    function stripFile(url) {
        return url.substr(0, stripHash(url).lastIndexOf("/") + 1);
    }
    function serverBase(url) {
        return url.substring(0, url.indexOf("/", url.indexOf("//") + 2));
    }
    function LocationHtml5Url(appBase, basePrefix) {
        this.$$html5 = true;
        basePrefix = basePrefix || "";
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this);
        this.$$parse = function(url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl)) {
                throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            }
            parseAppUrl(pathUrl, this);
            if (!this.$$path) {
                this.$$path = "/";
            }
            this.$$compose();
        };
        this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash;
            this.$$absUrl = appBaseNoFile + this.$$url.substr(1);
        };
        this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && relHref[0] === "#") {
                this.hash(relHref.slice(1));
                return true;
            }
            var appUrl, prevAppUrl;
            var rewrittenUrl;
            if ((appUrl = beginsWith(appBase, url)) !== undefined) {
                prevAppUrl = appUrl;
                if ((appUrl = beginsWith(basePrefix, appUrl)) !== undefined) {
                    rewrittenUrl = appBaseNoFile + (beginsWith("/", appUrl) || appUrl);
                } else {
                    rewrittenUrl = appBase + prevAppUrl;
                }
            } else if ((appUrl = beginsWith(appBaseNoFile, url)) !== undefined) {
                rewrittenUrl = appBaseNoFile + appUrl;
            } else if (appBaseNoFile == url + "/") {
                rewrittenUrl = appBaseNoFile;
            }
            if (rewrittenUrl) {
                this.$$parse(rewrittenUrl);
            }
            return !!rewrittenUrl;
        };
    }
    function LocationHashbangUrl(appBase, hashPrefix) {
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this);
        this.$$parse = function(url) {
            var withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
            var withoutHashUrl;
            if (withoutBaseUrl.charAt(0) === "#") {
                withoutHashUrl = beginsWith(hashPrefix, withoutBaseUrl);
                if (isUndefined(withoutHashUrl)) {
                    withoutHashUrl = withoutBaseUrl;
                }
            } else {
                withoutHashUrl = this.$$html5 ? withoutBaseUrl : "";
            }
            parseAppUrl(withoutHashUrl, this);
            this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase);
            this.$$compose();
            function removeWindowsDriveName(path, url, base) {
                var windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                var firstPathSegmentMatch;
                if (url.indexOf(base) === 0) {
                    url = url.replace(base, "");
                }
                if (windowsFilePathExp.exec(url)) {
                    return path;
                }
                firstPathSegmentMatch = windowsFilePathExp.exec(path);
                return firstPathSegmentMatch ? firstPathSegmentMatch[1] : path;
            }
        };
        this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash;
            this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "");
        };
        this.$$parseLinkUrl = function(url, relHref) {
            if (stripHash(appBase) == stripHash(url)) {
                this.$$parse(url);
                return true;
            }
            return false;
        };
    }
    function LocationHashbangInHtml5Url(appBase, hashPrefix) {
        this.$$html5 = true;
        LocationHashbangUrl.apply(this, arguments);
        var appBaseNoFile = stripFile(appBase);
        this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && relHref[0] === "#") {
                this.hash(relHref.slice(1));
                return true;
            }
            var rewrittenUrl;
            var appUrl;
            if (appBase == stripHash(url)) {
                rewrittenUrl = url;
            } else if (appUrl = beginsWith(appBaseNoFile, url)) {
                rewrittenUrl = appBase + hashPrefix + appUrl;
            } else if (appBaseNoFile === url + "/") {
                rewrittenUrl = appBaseNoFile;
            }
            if (rewrittenUrl) {
                this.$$parse(rewrittenUrl);
            }
            return !!rewrittenUrl;
        };
        this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash;
            this.$$absUrl = appBase + hashPrefix + this.$$url;
        };
    }
    var locationPrototype = {
        $$html5: false,
        $$replace: false,
        absUrl: locationGetter("$$absUrl"),
        url: function(url) {
            if (isUndefined(url)) {
                return this.$$url;
            }
            var match = PATH_MATCH.exec(url);
            if (match[1] || url === "") this.path(decodeURIComponent(match[1]));
            if (match[2] || match[1] || url === "") this.search(match[3] || "");
            this.hash(match[5] || "");
            return this;
        },
        protocol: locationGetter("$$protocol"),
        host: locationGetter("$$host"),
        port: locationGetter("$$port"),
        path: locationGetterSetter("$$path", function(path) {
            path = path !== null ? path.toString() : "";
            return path.charAt(0) == "/" ? path : "/" + path;
        }),
        search: function(search, paramValue) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (isString(search) || isNumber(search)) {
                    search = search.toString();
                    this.$$search = parseKeyValue(search);
                } else if (isObject(search)) {
                    search = copy(search, {});
                    forEach(search, function(value, key) {
                        if (value == null) delete search[key];
                    });
                    this.$$search = search;
                } else {
                    throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                }
                break;

              default:
                if (isUndefined(paramValue) || paramValue === null) {
                    delete this.$$search[search];
                } else {
                    this.$$search[search] = paramValue;
                }
            }
            this.$$compose();
            return this;
        },
        hash: locationGetterSetter("$$hash", function(hash) {
            return hash !== null ? hash.toString() : "";
        }),
        replace: function() {
            this.$$replace = true;
            return this;
        }
    };
    forEach([ LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url ], function(Location) {
        Location.prototype = Object.create(locationPrototype);
        Location.prototype.state = function(state) {
            if (!arguments.length) {
                return this.$$state;
            }
            if (Location !== LocationHtml5Url || !this.$$html5) {
                throw $locationMinErr("nostate", "History API state support is available only " + "in HTML5 mode and only in browsers supporting HTML5 History API");
            }
            this.$$state = isUndefined(state) ? null : state;
            return this;
        };
    });
    function locationGetter(property) {
        return function() {
            return this[property];
        };
    }
    function locationGetterSetter(property, preprocess) {
        return function(value) {
            if (isUndefined(value)) {
                return this[property];
            }
            this[property] = preprocess(value);
            this.$$compose();
            return this;
        };
    }
    function $LocationProvider() {
        var hashPrefix = "", html5Mode = {
            enabled: false,
            requireBase: true,
            rewriteLinks: true
        };
        this.hashPrefix = function(prefix) {
            if (isDefined(prefix)) {
                hashPrefix = prefix;
                return this;
            } else {
                return hashPrefix;
            }
        };
        this.html5Mode = function(mode) {
            if (isBoolean(mode)) {
                html5Mode.enabled = mode;
                return this;
            } else if (isObject(mode)) {
                if (isBoolean(mode.enabled)) {
                    html5Mode.enabled = mode.enabled;
                }
                if (isBoolean(mode.requireBase)) {
                    html5Mode.requireBase = mode.requireBase;
                }
                if (isBoolean(mode.rewriteLinks)) {
                    html5Mode.rewriteLinks = mode.rewriteLinks;
                }
                return this;
            } else {
                return html5Mode;
            }
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function($rootScope, $browser, $sniffer, $rootElement, $window) {
            var $location, LocationMode, baseHref = $browser.baseHref(), initialUrl = $browser.url(), appBase;
            if (html5Mode.enabled) {
                if (!baseHref && html5Mode.requireBase) {
                    throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                }
                appBase = serverBase(initialUrl) + (baseHref || "/");
                LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
            } else {
                appBase = stripHash(initialUrl);
                LocationMode = LocationHashbangUrl;
            }
            $location = new LocationMode(appBase, "#" + hashPrefix);
            $location.$$parseLinkUrl(initialUrl, initialUrl);
            $location.$$state = $browser.state();
            var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
            function setBrowserUrlWithFallback(url, replace, state) {
                var oldUrl = $location.url();
                var oldState = $location.$$state;
                try {
                    $browser.url(url, replace, state);
                    $location.$$state = $browser.state();
                } catch (e) {
                    $location.url(oldUrl);
                    $location.$$state = oldState;
                    throw e;
                }
            }
            $rootElement.on("click", function(event) {
                if (!html5Mode.rewriteLinks || event.ctrlKey || event.metaKey || event.shiftKey || event.which == 2 || event.button == 2) return;
                var elm = jqLite(event.target);
                while (nodeName_(elm[0]) !== "a") {
                    if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                }
                var absHref = elm.prop("href");
                var relHref = elm.attr("href") || elm.attr("xlink:href");
                if (isObject(absHref) && absHref.toString() === "[object SVGAnimatedString]") {
                    absHref = urlResolve(absHref.animVal).href;
                }
                if (IGNORE_URI_REGEXP.test(absHref)) return;
                if (absHref && !elm.attr("target") && !event.isDefaultPrevented()) {
                    if ($location.$$parseLinkUrl(absHref, relHref)) {
                        event.preventDefault();
                        if ($location.absUrl() != $browser.url()) {
                            $rootScope.$apply();
                            $window.angular["ff-684208-preventDefault"] = true;
                        }
                    }
                }
            });
            if (trimEmptyHash($location.absUrl()) != trimEmptyHash(initialUrl)) {
                $browser.url($location.absUrl(), true);
            }
            var initializing = true;
            $browser.onUrlChange(function(newUrl, newState) {
                $rootScope.$evalAsync(function() {
                    var oldUrl = $location.absUrl();
                    var oldState = $location.$$state;
                    var defaultPrevented;
                    $location.$$parse(newUrl);
                    $location.$$state = newState;
                    defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented;
                    if ($location.absUrl() !== newUrl) return;
                    if (defaultPrevented) {
                        $location.$$parse(oldUrl);
                        $location.$$state = oldState;
                        setBrowserUrlWithFallback(oldUrl, false, oldState);
                    } else {
                        initializing = false;
                        afterLocationChange(oldUrl, oldState);
                    }
                });
                if (!$rootScope.$$phase) $rootScope.$digest();
            });
            $rootScope.$watch(function $locationWatch() {
                var oldUrl = trimEmptyHash($browser.url());
                var newUrl = trimEmptyHash($location.absUrl());
                var oldState = $browser.state();
                var currentReplace = $location.$$replace;
                var urlOrStateChanged = oldUrl !== newUrl || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                if (initializing || urlOrStateChanged) {
                    initializing = false;
                    $rootScope.$evalAsync(function() {
                        var newUrl = $location.absUrl();
                        var defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, $location.$$state, oldState).defaultPrevented;
                        if ($location.absUrl() !== newUrl) return;
                        if (defaultPrevented) {
                            $location.$$parse(oldUrl);
                            $location.$$state = oldState;
                        } else {
                            if (urlOrStateChanged) {
                                setBrowserUrlWithFallback(newUrl, currentReplace, oldState === $location.$$state ? null : $location.$$state);
                            }
                            afterLocationChange(oldUrl, oldState);
                        }
                    });
                }
                $location.$$replace = false;
            });
            return $location;
            function afterLocationChange(oldUrl, oldState) {
                $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState);
            }
        } ];
    }
    function $LogProvider() {
        var debug = true, self = this;
        this.debugEnabled = function(flag) {
            if (isDefined(flag)) {
                debug = flag;
                return this;
            } else {
                return debug;
            }
        };
        this.$get = [ "$window", function($window) {
            return {
                log: consoleLog("log"),
                info: consoleLog("info"),
                warn: consoleLog("warn"),
                error: consoleLog("error"),
                debug: function() {
                    var fn = consoleLog("debug");
                    return function() {
                        if (debug) {
                            fn.apply(self, arguments);
                        }
                    };
                }()
            };
            function formatError(arg) {
                if (arg instanceof Error) {
                    if (arg.stack) {
                        arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? "Error: " + arg.message + "\n" + arg.stack : arg.stack;
                    } else if (arg.sourceURL) {
                        arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line;
                    }
                }
                return arg;
            }
            function consoleLog(type) {
                var console = $window.console || {}, logFn = console[type] || console.log || noop, hasApply = false;
                try {
                    hasApply = !!logFn.apply;
                } catch (e) {}
                if (hasApply) {
                    return function() {
                        var args = [];
                        forEach(arguments, function(arg) {
                            args.push(formatError(arg));
                        });
                        return logFn.apply(console, args);
                    };
                }
                return function(arg1, arg2) {
                    logFn(arg1, arg2 == null ? "" : arg2);
                };
            }
        } ];
    }
    var $parseMinErr = minErr("$parse");
    function ensureSafeMemberName(name, fullExpression) {
        if (name === "__defineGetter__" || name === "__defineSetter__" || name === "__lookupGetter__" || name === "__lookupSetter__" || name === "__proto__") {
            throw $parseMinErr("isecfld", "Attempting to access a disallowed field in Angular expressions! " + "Expression: {0}", fullExpression);
        }
        return name;
    }
    function ensureSafeObject(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) {
                throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj.window === obj) {
                throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) {
                throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj === Object) {
                throw $parseMinErr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", fullExpression);
            }
        }
        return obj;
    }
    var CALL = Function.prototype.call;
    var APPLY = Function.prototype.apply;
    var BIND = Function.prototype.bind;
    function ensureSafeFunction(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) {
                throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj === CALL || obj === APPLY || obj === BIND) {
                throw $parseMinErr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", fullExpression);
            }
        }
    }
    var OPERATORS = createMap();
    forEach("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(operator) {
        OPERATORS[operator] = true;
    });
    var ESCAPE = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    };
    var Lexer = function(options) {
        this.options = options;
    };
    Lexer.prototype = {
        constructor: Lexer,
        lex: function(text) {
            this.text = text;
            this.index = 0;
            this.tokens = [];
            while (this.index < this.text.length) {
                var ch = this.text.charAt(this.index);
                if (ch === '"' || ch === "'") {
                    this.readString(ch);
                } else if (this.isNumber(ch) || ch === "." && this.isNumber(this.peek())) {
                    this.readNumber();
                } else if (this.isIdent(ch)) {
                    this.readIdent();
                } else if (this.is(ch, "(){}[].,;:?")) {
                    this.tokens.push({
                        index: this.index,
                        text: ch
                    });
                    this.index++;
                } else if (this.isWhitespace(ch)) {
                    this.index++;
                } else {
                    var ch2 = ch + this.peek();
                    var ch3 = ch2 + this.peek(2);
                    var op1 = OPERATORS[ch];
                    var op2 = OPERATORS[ch2];
                    var op3 = OPERATORS[ch3];
                    if (op1 || op2 || op3) {
                        var token = op3 ? ch3 : op2 ? ch2 : ch;
                        this.tokens.push({
                            index: this.index,
                            text: token,
                            operator: true
                        });
                        this.index += token.length;
                    } else {
                        this.throwError("Unexpected next character ", this.index, this.index + 1);
                    }
                }
            }
            return this.tokens;
        },
        is: function(ch, chars) {
            return chars.indexOf(ch) !== -1;
        },
        peek: function(i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : false;
        },
        isNumber: function(ch) {
            return "0" <= ch && ch <= "9" && typeof ch === "string";
        },
        isWhitespace: function(ch) {
            return ch === " " || ch === "\r" || ch === "	" || ch === "\n" || ch === "" || ch === " ";
        },
        isIdent: function(ch) {
            return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || "_" === ch || ch === "$";
        },
        isExpOperator: function(ch) {
            return ch === "-" || ch === "+" || this.isNumber(ch);
        },
        throwError: function(error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
            throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text);
        },
        readNumber: function() {
            var number = "";
            var start = this.index;
            while (this.index < this.text.length) {
                var ch = lowercase(this.text.charAt(this.index));
                if (ch == "." || this.isNumber(ch)) {
                    number += ch;
                } else {
                    var peekCh = this.peek();
                    if (ch == "e" && this.isExpOperator(peekCh)) {
                        number += ch;
                    } else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && number.charAt(number.length - 1) == "e") {
                        number += ch;
                    } else if (this.isExpOperator(ch) && (!peekCh || !this.isNumber(peekCh)) && number.charAt(number.length - 1) == "e") {
                        this.throwError("Invalid exponent");
                    } else {
                        break;
                    }
                }
                this.index++;
            }
            this.tokens.push({
                index: start,
                text: number,
                constant: true,
                value: Number(number)
            });
        },
        readIdent: function() {
            var start = this.index;
            while (this.index < this.text.length) {
                var ch = this.text.charAt(this.index);
                if (!(this.isIdent(ch) || this.isNumber(ch))) {
                    break;
                }
                this.index++;
            }
            this.tokens.push({
                index: start,
                text: this.text.slice(start, this.index),
                identifier: true
            });
        },
        readString: function(quote) {
            var start = this.index;
            this.index++;
            var string = "";
            var rawString = quote;
            var escape = false;
            while (this.index < this.text.length) {
                var ch = this.text.charAt(this.index);
                rawString += ch;
                if (escape) {
                    if (ch === "u") {
                        var hex = this.text.substring(this.index + 1, this.index + 5);
                        if (!hex.match(/[\da-f]{4}/i)) {
                            this.throwError("Invalid unicode escape [\\u" + hex + "]");
                        }
                        this.index += 4;
                        string += String.fromCharCode(parseInt(hex, 16));
                    } else {
                        var rep = ESCAPE[ch];
                        string = string + (rep || ch);
                    }
                    escape = false;
                } else if (ch === "\\") {
                    escape = true;
                } else if (ch === quote) {
                    this.index++;
                    this.tokens.push({
                        index: start,
                        text: rawString,
                        constant: true,
                        value: string
                    });
                    return;
                } else {
                    string += ch;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", start);
        }
    };
    var AST = function(lexer, options) {
        this.lexer = lexer;
        this.options = options;
    };
    AST.Program = "Program";
    AST.ExpressionStatement = "ExpressionStatement";
    AST.AssignmentExpression = "AssignmentExpression";
    AST.ConditionalExpression = "ConditionalExpression";
    AST.LogicalExpression = "LogicalExpression";
    AST.BinaryExpression = "BinaryExpression";
    AST.UnaryExpression = "UnaryExpression";
    AST.CallExpression = "CallExpression";
    AST.MemberExpression = "MemberExpression";
    AST.Identifier = "Identifier";
    AST.Literal = "Literal";
    AST.ArrayExpression = "ArrayExpression";
    AST.Property = "Property";
    AST.ObjectExpression = "ObjectExpression";
    AST.ThisExpression = "ThisExpression";
    AST.NGValueParameter = "NGValueParameter";
    AST.prototype = {
        ast: function(text) {
            this.text = text;
            this.tokens = this.lexer.lex(text);
            var value = this.program();
            if (this.tokens.length !== 0) {
                this.throwError("is an unexpected token", this.tokens[0]);
            }
            return value;
        },
        program: function() {
            var body = [];
            while (true) {
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]")) body.push(this.expressionStatement());
                if (!this.expect(";")) {
                    return {
                        type: AST.Program,
                        body: body
                    };
                }
            }
        },
        expressionStatement: function() {
            return {
                type: AST.ExpressionStatement,
                expression: this.filterChain()
            };
        },
        filterChain: function() {
            var left = this.expression();
            var token;
            while (token = this.expect("|")) {
                left = this.filter(left);
            }
            return left;
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var result = this.ternary();
            if (this.expect("=")) {
                result = {
                    type: AST.AssignmentExpression,
                    left: result,
                    right: this.assignment(),
                    operator: "="
                };
            }
            return result;
        },
        ternary: function() {
            var test = this.logicalOR();
            var alternate;
            var consequent;
            if (this.expect("?")) {
                alternate = this.expression();
                if (this.consume(":")) {
                    consequent = this.expression();
                    return {
                        type: AST.ConditionalExpression,
                        test: test,
                        alternate: alternate,
                        consequent: consequent
                    };
                }
            }
            return test;
        },
        logicalOR: function() {
            var left = this.logicalAND();
            while (this.expect("||")) {
                left = {
                    type: AST.LogicalExpression,
                    operator: "||",
                    left: left,
                    right: this.logicalAND()
                };
            }
            return left;
        },
        logicalAND: function() {
            var left = this.equality();
            while (this.expect("&&")) {
                left = {
                    type: AST.LogicalExpression,
                    operator: "&&",
                    left: left,
                    right: this.equality()
                };
            }
            return left;
        },
        equality: function() {
            var left = this.relational();
            var token;
            while (token = this.expect("==", "!=", "===", "!==")) {
                left = {
                    type: AST.BinaryExpression,
                    operator: token.text,
                    left: left,
                    right: this.relational()
                };
            }
            return left;
        },
        relational: function() {
            var left = this.additive();
            var token;
            while (token = this.expect("<", ">", "<=", ">=")) {
                left = {
                    type: AST.BinaryExpression,
                    operator: token.text,
                    left: left,
                    right: this.additive()
                };
            }
            return left;
        },
        additive: function() {
            var left = this.multiplicative();
            var token;
            while (token = this.expect("+", "-")) {
                left = {
                    type: AST.BinaryExpression,
                    operator: token.text,
                    left: left,
                    right: this.multiplicative()
                };
            }
            return left;
        },
        multiplicative: function() {
            var left = this.unary();
            var token;
            while (token = this.expect("*", "/", "%")) {
                left = {
                    type: AST.BinaryExpression,
                    operator: token.text,
                    left: left,
                    right: this.unary()
                };
            }
            return left;
        },
        unary: function() {
            var token;
            if (token = this.expect("+", "-", "!")) {
                return {
                    type: AST.UnaryExpression,
                    operator: token.text,
                    prefix: true,
                    argument: this.unary()
                };
            } else {
                return this.primary();
            }
        },
        primary: function() {
            var primary;
            if (this.expect("(")) {
                primary = this.filterChain();
                this.consume(")");
            } else if (this.expect("[")) {
                primary = this.arrayDeclaration();
            } else if (this.expect("{")) {
                primary = this.object();
            } else if (this.constants.hasOwnProperty(this.peek().text)) {
                primary = copy(this.constants[this.consume().text]);
            } else if (this.peek().identifier) {
                primary = this.identifier();
            } else if (this.peek().constant) {
                primary = this.constant();
            } else {
                this.throwError("not a primary expression", this.peek());
            }
            var next;
            while (next = this.expect("(", "[", ".")) {
                if (next.text === "(") {
                    primary = {
                        type: AST.CallExpression,
                        callee: primary,
                        arguments: this.parseArguments()
                    };
                    this.consume(")");
                } else if (next.text === "[") {
                    primary = {
                        type: AST.MemberExpression,
                        object: primary,
                        property: this.expression(),
                        computed: true
                    };
                    this.consume("]");
                } else if (next.text === ".") {
                    primary = {
                        type: AST.MemberExpression,
                        object: primary,
                        property: this.identifier(),
                        computed: false
                    };
                } else {
                    this.throwError("IMPOSSIBLE");
                }
            }
            return primary;
        },
        filter: function(baseExpression) {
            var args = [ baseExpression ];
            var result = {
                type: AST.CallExpression,
                callee: this.identifier(),
                arguments: args,
                filter: true
            };
            while (this.expect(":")) {
                args.push(this.expression());
            }
            return result;
        },
        parseArguments: function() {
            var args = [];
            if (this.peekToken().text !== ")") {
                do {
                    args.push(this.expression());
                } while (this.expect(","));
            }
            return args;
        },
        identifier: function() {
            var token = this.consume();
            if (!token.identifier) {
                this.throwError("is not a valid identifier", token);
            }
            return {
                type: AST.Identifier,
                name: token.text
            };
        },
        constant: function() {
            return {
                type: AST.Literal,
                value: this.consume().value
            };
        },
        arrayDeclaration: function() {
            var elements = [];
            if (this.peekToken().text !== "]") {
                do {
                    if (this.peek("]")) {
                        break;
                    }
                    elements.push(this.expression());
                } while (this.expect(","));
            }
            this.consume("]");
            return {
                type: AST.ArrayExpression,
                elements: elements
            };
        },
        object: function() {
            var properties = [], property;
            if (this.peekToken().text !== "}") {
                do {
                    if (this.peek("}")) {
                        break;
                    }
                    property = {
                        type: AST.Property,
                        kind: "init"
                    };
                    if (this.peek().constant) {
                        property.key = this.constant();
                    } else if (this.peek().identifier) {
                        property.key = this.identifier();
                    } else {
                        this.throwError("invalid key", this.peek());
                    }
                    this.consume(":");
                    property.value = this.expression();
                    properties.push(property);
                } while (this.expect(","));
            }
            this.consume("}");
            return {
                type: AST.ObjectExpression,
                properties: properties
            };
        },
        throwError: function(msg, token) {
            throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index));
        },
        consume: function(e1) {
            if (this.tokens.length === 0) {
                throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            }
            var token = this.expect(e1);
            if (!token) {
                this.throwError("is unexpected, expecting [" + e1 + "]", this.peek());
            }
            return token;
        },
        peekToken: function() {
            if (this.tokens.length === 0) {
                throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            }
            return this.tokens[0];
        },
        peek: function(e1, e2, e3, e4) {
            return this.peekAhead(0, e1, e2, e3, e4);
        },
        peekAhead: function(i, e1, e2, e3, e4) {
            if (this.tokens.length > i) {
                var token = this.tokens[i];
                var t = token.text;
                if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) {
                    return token;
                }
            }
            return false;
        },
        expect: function(e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            if (token) {
                this.tokens.shift();
                return token;
            }
            return false;
        },
        constants: {
            "true": {
                type: AST.Literal,
                value: true
            },
            "false": {
                type: AST.Literal,
                value: false
            },
            "null": {
                type: AST.Literal,
                value: null
            },
            undefined: {
                type: AST.Literal,
                value: undefined
            },
            "this": {
                type: AST.ThisExpression
            }
        }
    };
    function ifDefined(v, d) {
        return typeof v !== "undefined" ? v : d;
    }
    function plusFn(l, r) {
        if (typeof l === "undefined") return r;
        if (typeof r === "undefined") return l;
        return l + r;
    }
    function isStateless($filter, filterName) {
        var fn = $filter(filterName);
        return !fn.$stateful;
    }
    function findConstantAndWatchExpressions(ast, $filter) {
        var allConstants;
        var argsToWatch;
        switch (ast.type) {
          case AST.Program:
            allConstants = true;
            forEach(ast.body, function(expr) {
                findConstantAndWatchExpressions(expr.expression, $filter);
                allConstants = allConstants && expr.expression.constant;
            });
            ast.constant = allConstants;
            break;

          case AST.Literal:
            ast.constant = true;
            ast.toWatch = [];
            break;

          case AST.UnaryExpression:
            findConstantAndWatchExpressions(ast.argument, $filter);
            ast.constant = ast.argument.constant;
            ast.toWatch = ast.argument.toWatch;
            break;

          case AST.BinaryExpression:
            findConstantAndWatchExpressions(ast.left, $filter);
            findConstantAndWatchExpressions(ast.right, $filter);
            ast.constant = ast.left.constant && ast.right.constant;
            ast.toWatch = ast.left.toWatch.concat(ast.right.toWatch);
            break;

          case AST.LogicalExpression:
            findConstantAndWatchExpressions(ast.left, $filter);
            findConstantAndWatchExpressions(ast.right, $filter);
            ast.constant = ast.left.constant && ast.right.constant;
            ast.toWatch = ast.constant ? [] : [ ast ];
            break;

          case AST.ConditionalExpression:
            findConstantAndWatchExpressions(ast.test, $filter);
            findConstantAndWatchExpressions(ast.alternate, $filter);
            findConstantAndWatchExpressions(ast.consequent, $filter);
            ast.constant = ast.test.constant && ast.alternate.constant && ast.consequent.constant;
            ast.toWatch = ast.constant ? [] : [ ast ];
            break;

          case AST.Identifier:
            ast.constant = false;
            ast.toWatch = [ ast ];
            break;

          case AST.MemberExpression:
            findConstantAndWatchExpressions(ast.object, $filter);
            if (ast.computed) {
                findConstantAndWatchExpressions(ast.property, $filter);
            }
            ast.constant = ast.object.constant && (!ast.computed || ast.property.constant);
            ast.toWatch = [ ast ];
            break;

          case AST.CallExpression:
            allConstants = ast.filter ? isStateless($filter, ast.callee.name) : false;
            argsToWatch = [];
            forEach(ast.arguments, function(expr) {
                findConstantAndWatchExpressions(expr, $filter);
                allConstants = allConstants && expr.constant;
                if (!expr.constant) {
                    argsToWatch.push.apply(argsToWatch, expr.toWatch);
                }
            });
            ast.constant = allConstants;
            ast.toWatch = ast.filter && isStateless($filter, ast.callee.name) ? argsToWatch : [ ast ];
            break;

          case AST.AssignmentExpression:
            findConstantAndWatchExpressions(ast.left, $filter);
            findConstantAndWatchExpressions(ast.right, $filter);
            ast.constant = ast.left.constant && ast.right.constant;
            ast.toWatch = [ ast ];
            break;

          case AST.ArrayExpression:
            allConstants = true;
            argsToWatch = [];
            forEach(ast.elements, function(expr) {
                findConstantAndWatchExpressions(expr, $filter);
                allConstants = allConstants && expr.constant;
                if (!expr.constant) {
                    argsToWatch.push.apply(argsToWatch, expr.toWatch);
                }
            });
            ast.constant = allConstants;
            ast.toWatch = argsToWatch;
            break;

          case AST.ObjectExpression:
            allConstants = true;
            argsToWatch = [];
            forEach(ast.properties, function(property) {
                findConstantAndWatchExpressions(property.value, $filter);
                allConstants = allConstants && property.value.constant;
                if (!property.value.constant) {
                    argsToWatch.push.apply(argsToWatch, property.value.toWatch);
                }
            });
            ast.constant = allConstants;
            ast.toWatch = argsToWatch;
            break;

          case AST.ThisExpression:
            ast.constant = false;
            ast.toWatch = [];
            break;
        }
    }
    function getInputs(body) {
        if (body.length != 1) return;
        var lastExpression = body[0].expression;
        var candidate = lastExpression.toWatch;
        if (candidate.length !== 1) return candidate;
        return candidate[0] !== lastExpression ? candidate : undefined;
    }
    function isAssignable(ast) {
        return ast.type === AST.Identifier || ast.type === AST.MemberExpression;
    }
    function assignableAST(ast) {
        if (ast.body.length === 1 && isAssignable(ast.body[0].expression)) {
            return {
                type: AST.AssignmentExpression,
                left: ast.body[0].expression,
                right: {
                    type: AST.NGValueParameter
                },
                operator: "="
            };
        }
    }
    function isLiteral(ast) {
        return ast.body.length === 0 || ast.body.length === 1 && (ast.body[0].expression.type === AST.Literal || ast.body[0].expression.type === AST.ArrayExpression || ast.body[0].expression.type === AST.ObjectExpression);
    }
    function isConstant(ast) {
        return ast.constant;
    }
    function ASTCompiler(astBuilder, $filter) {
        this.astBuilder = astBuilder;
        this.$filter = $filter;
    }
    ASTCompiler.prototype = {
        compile: function(expression, expensiveChecks) {
            var self = this;
            var ast = this.astBuilder.ast(expression);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: expensiveChecks,
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            };
            findConstantAndWatchExpressions(ast, self.$filter);
            var extra = "";
            var assignable;
            this.stage = "assign";
            if (assignable = assignableAST(ast)) {
                this.state.computing = "assign";
                var result = this.nextId();
                this.recurse(assignable, result);
                extra = "fn.assign=" + this.generateFunction("assign", "s,v,l");
            }
            var toWatch = getInputs(ast.body);
            self.stage = "inputs";
            forEach(toWatch, function(watch, key) {
                var fnKey = "fn" + key;
                self.state[fnKey] = {
                    vars: [],
                    body: [],
                    own: {}
                };
                self.state.computing = fnKey;
                var intoId = self.nextId();
                self.recurse(watch, intoId);
                self.return_(intoId);
                self.state.inputs.push(fnKey);
                watch.watchId = key;
            });
            this.state.computing = "fn";
            this.stage = "main";
            this.recurse(ast);
            var fnString = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + extra + this.watchFns() + "return fn;";
            var fn = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "ifDefined", "plus", "text", fnString)(this.$filter, ensureSafeMemberName, ensureSafeObject, ensureSafeFunction, ifDefined, plusFn, expression);
            this.state = this.stage = undefined;
            fn.literal = isLiteral(ast);
            fn.constant = isConstant(ast);
            return fn;
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var result = [];
            var fns = this.state.inputs;
            var self = this;
            forEach(fns, function(name) {
                result.push("var " + name + "=" + self.generateFunction(name, "s"));
            });
            if (fns.length) {
                result.push("fn.inputs=[" + fns.join(",") + "];");
            }
            return result.join("");
        },
        generateFunction: function(name, params) {
            return "function(" + params + "){" + this.varsPrefix(name) + this.body(name) + "};";
        },
        filterPrefix: function() {
            var parts = [];
            var self = this;
            forEach(this.state.filters, function(id, filter) {
                parts.push(id + "=$filter(" + self.escape(filter) + ")");
            });
            if (parts.length) return "var " + parts.join(",") + ";";
            return "";
        },
        varsPrefix: function(section) {
            return this.state[section].vars.length ? "var " + this.state[section].vars.join(",") + ";" : "";
        },
        body: function(section) {
            return this.state[section].body.join("");
        },
        recurse: function(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
            var left, right, self = this, args, expression;
            recursionFn = recursionFn || noop;
            if (!skipWatchIdCheck && isDefined(ast.watchId)) {
                intoId = intoId || this.nextId();
                this.if_("i", this.lazyAssign(intoId, this.computedMember("i", ast.watchId)), this.lazyRecurse(ast, intoId, nameId, recursionFn, create, true));
                return;
            }
            switch (ast.type) {
              case AST.Program:
                forEach(ast.body, function(expression, pos) {
                    self.recurse(expression.expression, undefined, undefined, function(expr) {
                        right = expr;
                    });
                    if (pos !== ast.body.length - 1) {
                        self.current().body.push(right, ";");
                    } else {
                        self.return_(right);
                    }
                });
                break;

              case AST.Literal:
                expression = this.escape(ast.value);
                this.assign(intoId, expression);
                recursionFn(expression);
                break;

              case AST.UnaryExpression:
                this.recurse(ast.argument, undefined, undefined, function(expr) {
                    right = expr;
                });
                expression = ast.operator + "(" + this.ifDefined(right, 0) + ")";
                this.assign(intoId, expression);
                recursionFn(expression);
                break;

              case AST.BinaryExpression:
                this.recurse(ast.left, undefined, undefined, function(expr) {
                    left = expr;
                });
                this.recurse(ast.right, undefined, undefined, function(expr) {
                    right = expr;
                });
                if (ast.operator === "+") {
                    expression = this.plus(left, right);
                } else if (ast.operator === "-") {
                    expression = this.ifDefined(left, 0) + ast.operator + this.ifDefined(right, 0);
                } else {
                    expression = "(" + left + ")" + ast.operator + "(" + right + ")";
                }
                this.assign(intoId, expression);
                recursionFn(expression);
                break;

              case AST.LogicalExpression:
                intoId = intoId || this.nextId();
                self.recurse(ast.left, intoId);
                self.if_(ast.operator === "&&" ? intoId : self.not(intoId), self.lazyRecurse(ast.right, intoId));
                recursionFn(intoId);
                break;

              case AST.ConditionalExpression:
                intoId = intoId || this.nextId();
                self.recurse(ast.test, intoId);
                self.if_(intoId, self.lazyRecurse(ast.alternate, intoId), self.lazyRecurse(ast.consequent, intoId));
                recursionFn(intoId);
                break;

              case AST.Identifier:
                intoId = intoId || this.nextId();
                if (nameId) {
                    nameId.context = self.stage === "inputs" ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", ast.name) + "?l:s");
                    nameId.computed = false;
                    nameId.name = ast.name;
                }
                ensureSafeMemberName(ast.name);
                self.if_(self.stage === "inputs" || self.not(self.getHasOwnProperty("l", ast.name)), function() {
                    self.if_(self.stage === "inputs" || "s", function() {
                        if (create && create !== 1) {
                            self.if_(self.not(self.nonComputedMember("s", ast.name)), self.lazyAssign(self.nonComputedMember("s", ast.name), "{}"));
                        }
                        self.assign(intoId, self.nonComputedMember("s", ast.name));
                    });
                }, intoId && self.lazyAssign(intoId, self.nonComputedMember("l", ast.name)));
                if (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.name)) {
                    self.addEnsureSafeObject(intoId);
                }
                recursionFn(intoId);
                break;

              case AST.MemberExpression:
                left = nameId && (nameId.context = this.nextId()) || this.nextId();
                intoId = intoId || this.nextId();
                self.recurse(ast.object, left, undefined, function() {
                    self.if_(self.notNull(left), function() {
                        if (ast.computed) {
                            right = self.nextId();
                            self.recurse(ast.property, right);
                            self.addEnsureSafeMemberName(right);
                            if (create && create !== 1) {
                                self.if_(self.not(self.computedMember(left, right)), self.lazyAssign(self.computedMember(left, right), "{}"));
                            }
                            expression = self.ensureSafeObject(self.computedMember(left, right));
                            self.assign(intoId, expression);
                            if (nameId) {
                                nameId.computed = true;
                                nameId.name = right;
                            }
                        } else {
                            ensureSafeMemberName(ast.property.name);
                            if (create && create !== 1) {
                                self.if_(self.not(self.nonComputedMember(left, ast.property.name)), self.lazyAssign(self.nonComputedMember(left, ast.property.name), "{}"));
                            }
                            expression = self.nonComputedMember(left, ast.property.name);
                            if (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.property.name)) {
                                expression = self.ensureSafeObject(expression);
                            }
                            self.assign(intoId, expression);
                            if (nameId) {
                                nameId.computed = false;
                                nameId.name = ast.property.name;
                            }
                        }
                    }, function() {
                        self.assign(intoId, "undefined");
                    });
                    recursionFn(intoId);
                }, !!create);
                break;

              case AST.CallExpression:
                intoId = intoId || this.nextId();
                if (ast.filter) {
                    right = self.filter(ast.callee.name);
                    args = [];
                    forEach(ast.arguments, function(expr) {
                        var argument = self.nextId();
                        self.recurse(expr, argument);
                        args.push(argument);
                    });
                    expression = right + "(" + args.join(",") + ")";
                    self.assign(intoId, expression);
                    recursionFn(intoId);
                } else {
                    right = self.nextId();
                    left = {};
                    args = [];
                    self.recurse(ast.callee, right, left, function() {
                        self.if_(self.notNull(right), function() {
                            self.addEnsureSafeFunction(right);
                            forEach(ast.arguments, function(expr) {
                                self.recurse(expr, self.nextId(), undefined, function(argument) {
                                    args.push(self.ensureSafeObject(argument));
                                });
                            });
                            if (left.name) {
                                if (!self.state.expensiveChecks) {
                                    self.addEnsureSafeObject(left.context);
                                }
                                expression = self.member(left.context, left.name, left.computed) + "(" + args.join(",") + ")";
                            } else {
                                expression = right + "(" + args.join(",") + ")";
                            }
                            expression = self.ensureSafeObject(expression);
                            self.assign(intoId, expression);
                        }, function() {
                            self.assign(intoId, "undefined");
                        });
                        recursionFn(intoId);
                    });
                }
                break;

              case AST.AssignmentExpression:
                right = this.nextId();
                left = {};
                if (!isAssignable(ast.left)) {
                    throw $parseMinErr("lval", "Trying to assing a value to a non l-value");
                }
                this.recurse(ast.left, undefined, left, function() {
                    self.if_(self.notNull(left.context), function() {
                        self.recurse(ast.right, right);
                        self.addEnsureSafeObject(self.member(left.context, left.name, left.computed));
                        expression = self.member(left.context, left.name, left.computed) + ast.operator + right;
                        self.assign(intoId, expression);
                        recursionFn(intoId || expression);
                    });
                }, 1);
                break;

              case AST.ArrayExpression:
                args = [];
                forEach(ast.elements, function(expr) {
                    self.recurse(expr, self.nextId(), undefined, function(argument) {
                        args.push(argument);
                    });
                });
                expression = "[" + args.join(",") + "]";
                this.assign(intoId, expression);
                recursionFn(expression);
                break;

              case AST.ObjectExpression:
                args = [];
                forEach(ast.properties, function(property) {
                    self.recurse(property.value, self.nextId(), undefined, function(expr) {
                        args.push(self.escape(property.key.type === AST.Identifier ? property.key.name : "" + property.key.value) + ":" + expr);
                    });
                });
                expression = "{" + args.join(",") + "}";
                this.assign(intoId, expression);
                recursionFn(expression);
                break;

              case AST.ThisExpression:
                this.assign(intoId, "s");
                recursionFn("s");
                break;

              case AST.NGValueParameter:
                this.assign(intoId, "v");
                recursionFn("v");
                break;
            }
        },
        getHasOwnProperty: function(element, property) {
            var key = element + "." + property;
            var own = this.current().own;
            if (!own.hasOwnProperty(key)) {
                own[key] = this.nextId(false, element + "&&(" + this.escape(property) + " in " + element + ")");
            }
            return own[key];
        },
        assign: function(id, value) {
            if (!id) return;
            this.current().body.push(id, "=", value, ";");
            return id;
        },
        filter: function(filterName) {
            if (!this.state.filters.hasOwnProperty(filterName)) {
                this.state.filters[filterName] = this.nextId(true);
            }
            return this.state.filters[filterName];
        },
        ifDefined: function(id, defaultValue) {
            return "ifDefined(" + id + "," + this.escape(defaultValue) + ")";
        },
        plus: function(left, right) {
            return "plus(" + left + "," + right + ")";
        },
        return_: function(id) {
            this.current().body.push("return ", id, ";");
        },
        if_: function(test, alternate, consequent) {
            if (test === true) {
                alternate();
            } else {
                var body = this.current().body;
                body.push("if(", test, "){");
                alternate();
                body.push("}");
                if (consequent) {
                    body.push("else{");
                    consequent();
                    body.push("}");
                }
            }
        },
        not: function(expression) {
            return "!(" + expression + ")";
        },
        notNull: function(expression) {
            return expression + "!=null";
        },
        nonComputedMember: function(left, right) {
            return left + "." + right;
        },
        computedMember: function(left, right) {
            return left + "[" + right + "]";
        },
        member: function(left, right, computed) {
            if (computed) return this.computedMember(left, right);
            return this.nonComputedMember(left, right);
        },
        addEnsureSafeObject: function(item) {
            this.current().body.push(this.ensureSafeObject(item), ";");
        },
        addEnsureSafeMemberName: function(item) {
            this.current().body.push(this.ensureSafeMemberName(item), ";");
        },
        addEnsureSafeFunction: function(item) {
            this.current().body.push(this.ensureSafeFunction(item), ";");
        },
        ensureSafeObject: function(item) {
            return "ensureSafeObject(" + item + ",text)";
        },
        ensureSafeMemberName: function(item) {
            return "ensureSafeMemberName(" + item + ",text)";
        },
        ensureSafeFunction: function(item) {
            return "ensureSafeFunction(" + item + ",text)";
        },
        lazyRecurse: function(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
            var self = this;
            return function() {
                self.recurse(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck);
            };
        },
        lazyAssign: function(id, value) {
            var self = this;
            return function() {
                self.assign(id, value);
            };
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(c) {
            return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
        },
        escape: function(value) {
            if (isString(value)) return "'" + value.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (isNumber(value)) return value.toString();
            if (value === true) return "true";
            if (value === false) return "false";
            if (value === null) return "null";
            if (typeof value === "undefined") return "undefined";
            throw $parseMinErr("esc", "IMPOSSIBLE");
        },
        nextId: function(skip, init) {
            var id = "v" + this.state.nextId++;
            if (!skip) {
                this.current().vars.push(id + (init ? "=" + init : ""));
            }
            return id;
        },
        current: function() {
            return this.state[this.state.computing];
        }
    };
    function ASTInterpreter(astBuilder, $filter) {
        this.astBuilder = astBuilder;
        this.$filter = $filter;
    }
    ASTInterpreter.prototype = {
        compile: function(expression, expensiveChecks) {
            var self = this;
            var ast = this.astBuilder.ast(expression);
            this.expression = expression;
            this.expensiveChecks = expensiveChecks;
            findConstantAndWatchExpressions(ast, self.$filter);
            var assignable;
            var assign;
            if (assignable = assignableAST(ast)) {
                assign = this.recurse(assignable);
            }
            var toWatch = getInputs(ast.body);
            var inputs;
            if (toWatch) {
                inputs = [];
                forEach(toWatch, function(watch, key) {
                    var input = self.recurse(watch);
                    watch.input = input;
                    inputs.push(input);
                    watch.watchId = key;
                });
            }
            var expressions = [];
            forEach(ast.body, function(expression) {
                expressions.push(self.recurse(expression.expression));
            });
            var fn = ast.body.length === 0 ? function() {} : ast.body.length === 1 ? expressions[0] : function(scope, locals) {
                var lastValue;
                forEach(expressions, function(exp) {
                    lastValue = exp(scope, locals);
                });
                return lastValue;
            };
            if (assign) {
                fn.assign = function(scope, value, locals) {
                    return assign(scope, locals, value);
                };
            }
            if (inputs) {
                fn.inputs = inputs;
            }
            fn.literal = isLiteral(ast);
            fn.constant = isConstant(ast);
            return fn;
        },
        recurse: function(ast, context, create) {
            var left, right, self = this, args, expression;
            if (ast.input) {
                return this.inputs(ast.input, ast.watchId);
            }
            switch (ast.type) {
              case AST.Literal:
                return this.value(ast.value, context);

              case AST.UnaryExpression:
                right = this.recurse(ast.argument);
                return this["unary" + ast.operator](right, context);

              case AST.BinaryExpression:
                left = this.recurse(ast.left);
                right = this.recurse(ast.right);
                return this["binary" + ast.operator](left, right, context);

              case AST.LogicalExpression:
                left = this.recurse(ast.left);
                right = this.recurse(ast.right);
                return this["binary" + ast.operator](left, right, context);

              case AST.ConditionalExpression:
                return this["ternary?:"](this.recurse(ast.test), this.recurse(ast.alternate), this.recurse(ast.consequent), context);

              case AST.Identifier:
                ensureSafeMemberName(ast.name, self.expression);
                return self.identifier(ast.name, self.expensiveChecks || isPossiblyDangerousMemberName(ast.name), context, create, self.expression);

              case AST.MemberExpression:
                left = this.recurse(ast.object, false, !!create);
                if (!ast.computed) {
                    ensureSafeMemberName(ast.property.name, self.expression);
                    right = ast.property.name;
                }
                if (ast.computed) right = this.recurse(ast.property);
                return ast.computed ? this.computedMember(left, right, context, create, self.expression) : this.nonComputedMember(left, right, self.expensiveChecks, context, create, self.expression);

              case AST.CallExpression:
                args = [];
                forEach(ast.arguments, function(expr) {
                    args.push(self.recurse(expr));
                });
                if (ast.filter) right = this.$filter(ast.callee.name);
                if (!ast.filter) right = this.recurse(ast.callee, true);
                return ast.filter ? function(scope, locals, assign, inputs) {
                    var values = [];
                    for (var i = 0; i < args.length; ++i) {
                        values.push(args[i](scope, locals, assign, inputs));
                    }
                    var value = right.apply(undefined, values, inputs);
                    return context ? {
                        context: undefined,
                        name: undefined,
                        value: value
                    } : value;
                } : function(scope, locals, assign, inputs) {
                    var rhs = right(scope, locals, assign, inputs);
                    var value;
                    if (rhs.value != null) {
                        ensureSafeObject(rhs.context, self.expression);
                        ensureSafeFunction(rhs.value, self.expression);
                        var values = [];
                        for (var i = 0; i < args.length; ++i) {
                            values.push(ensureSafeObject(args[i](scope, locals, assign, inputs), self.expression));
                        }
                        value = ensureSafeObject(rhs.value.apply(rhs.context, values), self.expression);
                    }
                    return context ? {
                        value: value
                    } : value;
                };

              case AST.AssignmentExpression:
                left = this.recurse(ast.left, true, 1);
                right = this.recurse(ast.right);
                return function(scope, locals, assign, inputs) {
                    var lhs = left(scope, locals, assign, inputs);
                    var rhs = right(scope, locals, assign, inputs);
                    ensureSafeObject(lhs.value, self.expression);
                    lhs.context[lhs.name] = rhs;
                    return context ? {
                        value: rhs
                    } : rhs;
                };

              case AST.ArrayExpression:
                args = [];
                forEach(ast.elements, function(expr) {
                    args.push(self.recurse(expr));
                });
                return function(scope, locals, assign, inputs) {
                    var value = [];
                    for (var i = 0; i < args.length; ++i) {
                        value.push(args[i](scope, locals, assign, inputs));
                    }
                    return context ? {
                        value: value
                    } : value;
                };

              case AST.ObjectExpression:
                args = [];
                forEach(ast.properties, function(property) {
                    args.push({
                        key: property.key.type === AST.Identifier ? property.key.name : "" + property.key.value,
                        value: self.recurse(property.value)
                    });
                });
                return function(scope, locals, assign, inputs) {
                    var value = {};
                    for (var i = 0; i < args.length; ++i) {
                        value[args[i].key] = args[i].value(scope, locals, assign, inputs);
                    }
                    return context ? {
                        value: value
                    } : value;
                };

              case AST.ThisExpression:
                return function(scope) {
                    return context ? {
                        value: scope
                    } : scope;
                };

              case AST.NGValueParameter:
                return function(scope, locals, assign, inputs) {
                    return context ? {
                        value: assign
                    } : assign;
                };
            }
        },
        "unary+": function(argument, context) {
            return function(scope, locals, assign, inputs) {
                var arg = argument(scope, locals, assign, inputs);
                if (isDefined(arg)) {
                    arg = +arg;
                } else {
                    arg = 0;
                }
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "unary-": function(argument, context) {
            return function(scope, locals, assign, inputs) {
                var arg = argument(scope, locals, assign, inputs);
                if (isDefined(arg)) {
                    arg = -arg;
                } else {
                    arg = 0;
                }
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "unary!": function(argument, context) {
            return function(scope, locals, assign, inputs) {
                var arg = !argument(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary+": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs);
                var rhs = right(scope, locals, assign, inputs);
                var arg = plusFn(lhs, rhs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary-": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs);
                var rhs = right(scope, locals, assign, inputs);
                var arg = (isDefined(lhs) ? lhs : 0) - (isDefined(rhs) ? rhs : 0);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary*": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) * right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary/": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) / right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary%": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) % right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary===": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) === right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary!==": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) !== right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary==": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) == right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary!=": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) != right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary<": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) < right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary>": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) > right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary<=": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) <= right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary>=": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) >= right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary&&": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) && right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "binary||": function(left, right, context) {
            return function(scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) || right(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        "ternary?:": function(test, alternate, consequent, context) {
            return function(scope, locals, assign, inputs) {
                var arg = test(scope, locals, assign, inputs) ? alternate(scope, locals, assign, inputs) : consequent(scope, locals, assign, inputs);
                return context ? {
                    value: arg
                } : arg;
            };
        },
        value: function(value, context) {
            return function() {
                return context ? {
                    context: undefined,
                    name: undefined,
                    value: value
                } : value;
            };
        },
        identifier: function(name, expensiveChecks, context, create, expression) {
            return function(scope, locals, assign, inputs) {
                var base = locals && name in locals ? locals : scope;
                if (create && create !== 1 && base && !base[name]) {
                    base[name] = {};
                }
                var value = base ? base[name] : undefined;
                if (expensiveChecks) {
                    ensureSafeObject(value, expression);
                }
                if (context) {
                    return {
                        context: base,
                        name: name,
                        value: value
                    };
                } else {
                    return value;
                }
            };
        },
        computedMember: function(left, right, context, create, expression) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs);
                var rhs;
                var value;
                if (lhs != null) {
                    rhs = right(scope, locals, assign, inputs);
                    ensureSafeMemberName(rhs, expression);
                    if (create && create !== 1 && lhs && !lhs[rhs]) {
                        lhs[rhs] = {};
                    }
                    value = lhs[rhs];
                    ensureSafeObject(value, expression);
                }
                if (context) {
                    return {
                        context: lhs,
                        name: rhs,
                        value: value
                    };
                } else {
                    return value;
                }
            };
        },
        nonComputedMember: function(left, right, expensiveChecks, context, create, expression) {
            return function(scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs);
                if (create && create !== 1 && lhs && !lhs[right]) {
                    lhs[right] = {};
                }
                var value = lhs != null ? lhs[right] : undefined;
                if (expensiveChecks || isPossiblyDangerousMemberName(right)) {
                    ensureSafeObject(value, expression);
                }
                if (context) {
                    return {
                        context: lhs,
                        name: right,
                        value: value
                    };
                } else {
                    return value;
                }
            };
        },
        inputs: function(input, watchId) {
            return function(scope, value, locals, inputs) {
                if (inputs) return inputs[watchId];
                return input(scope, value, locals);
            };
        }
    };
    var Parser = function(lexer, $filter, options) {
        this.lexer = lexer;
        this.$filter = $filter;
        this.options = options;
        this.ast = new AST(this.lexer);
        this.astCompiler = options.csp ? new ASTInterpreter(this.ast, $filter) : new ASTCompiler(this.ast, $filter);
    };
    Parser.prototype = {
        constructor: Parser,
        parse: function(text) {
            return this.astCompiler.compile(text, this.options.expensiveChecks);
        }
    };
    function setter(obj, path, setValue, fullExp) {
        ensureSafeObject(obj, fullExp);
        var element = path.split("."), key;
        for (var i = 0; element.length > 1; i++) {
            key = ensureSafeMemberName(element.shift(), fullExp);
            var propertyObj = ensureSafeObject(obj[key], fullExp);
            if (!propertyObj) {
                propertyObj = {};
                obj[key] = propertyObj;
            }
            obj = propertyObj;
        }
        key = ensureSafeMemberName(element.shift(), fullExp);
        ensureSafeObject(obj[key], fullExp);
        obj[key] = setValue;
        return setValue;
    }
    var getterFnCacheDefault = createMap();
    var getterFnCacheExpensive = createMap();
    function isPossiblyDangerousMemberName(name) {
        return name == "constructor";
    }
    var objectValueOf = Object.prototype.valueOf;
    function getValueOf(value) {
        return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value);
    }
    function $ParseProvider() {
        var cacheDefault = createMap();
        var cacheExpensive = createMap();
        this.$get = [ "$filter", "$sniffer", function($filter, $sniffer) {
            var $parseOptions = {
                csp: $sniffer.csp,
                expensiveChecks: false
            }, $parseOptionsExpensive = {
                csp: $sniffer.csp,
                expensiveChecks: true
            };
            return function $parse(exp, interceptorFn, expensiveChecks) {
                var parsedExpression, oneTime, cacheKey;
                switch (typeof exp) {
                  case "string":
                    exp = exp.trim();
                    cacheKey = exp;
                    var cache = expensiveChecks ? cacheExpensive : cacheDefault;
                    parsedExpression = cache[cacheKey];
                    if (!parsedExpression) {
                        if (exp.charAt(0) === ":" && exp.charAt(1) === ":") {
                            oneTime = true;
                            exp = exp.substring(2);
                        }
                        var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions;
                        var lexer = new Lexer(parseOptions);
                        var parser = new Parser(lexer, $filter, parseOptions);
                        parsedExpression = parser.parse(exp);
                        if (parsedExpression.constant) {
                            parsedExpression.$$watchDelegate = constantWatchDelegate;
                        } else if (oneTime) {
                            parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate;
                        } else if (parsedExpression.inputs) {
                            parsedExpression.$$watchDelegate = inputsWatchDelegate;
                        }
                        cache[cacheKey] = parsedExpression;
                    }
                    return addInterceptor(parsedExpression, interceptorFn);

                  case "function":
                    return addInterceptor(exp, interceptorFn);

                  default:
                    return noop;
                }
            };
            function expressionInputDirtyCheck(newValue, oldValueOfValue) {
                if (newValue == null || oldValueOfValue == null) {
                    return newValue === oldValueOfValue;
                }
                if (typeof newValue === "object") {
                    newValue = getValueOf(newValue);
                    if (typeof newValue === "object") {
                        return false;
                    }
                }
                return newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue;
            }
            function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression, prettyPrintExpression) {
                var inputExpressions = parsedExpression.inputs;
                var lastResult;
                if (inputExpressions.length === 1) {
                    var oldInputValueOf = expressionInputDirtyCheck;
                    inputExpressions = inputExpressions[0];
                    return scope.$watch(function expressionInputWatch(scope) {
                        var newInputValue = inputExpressions(scope);
                        if (!expressionInputDirtyCheck(newInputValue, oldInputValueOf)) {
                            lastResult = parsedExpression(scope, undefined, undefined, [ newInputValue ]);
                            oldInputValueOf = newInputValue && getValueOf(newInputValue);
                        }
                        return lastResult;
                    }, listener, objectEquality, prettyPrintExpression);
                }
                var oldInputValueOfValues = [];
                var oldInputValues = [];
                for (var i = 0, ii = inputExpressions.length; i < ii; i++) {
                    oldInputValueOfValues[i] = expressionInputDirtyCheck;
                    oldInputValues[i] = null;
                }
                return scope.$watch(function expressionInputsWatch(scope) {
                    var changed = false;
                    for (var i = 0, ii = inputExpressions.length; i < ii; i++) {
                        var newInputValue = inputExpressions[i](scope);
                        if (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i]))) {
                            oldInputValues[i] = newInputValue;
                            oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue);
                        }
                    }
                    if (changed) {
                        lastResult = parsedExpression(scope, undefined, undefined, oldInputValues);
                    }
                    return lastResult;
                }, listener, objectEquality, prettyPrintExpression);
            }
            function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function oneTimeWatch(scope) {
                    return parsedExpression(scope);
                }, function oneTimeListener(value, old, scope) {
                    lastValue = value;
                    if (isFunction(listener)) {
                        listener.apply(this, arguments);
                    }
                    if (isDefined(value)) {
                        scope.$$postDigest(function() {
                            if (isDefined(lastValue)) {
                                unwatch();
                            }
                        });
                    }
                }, objectEquality);
            }
            function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function oneTimeWatch(scope) {
                    return parsedExpression(scope);
                }, function oneTimeListener(value, old, scope) {
                    lastValue = value;
                    if (isFunction(listener)) {
                        listener.call(this, value, old, scope);
                    }
                    if (isAllDefined(value)) {
                        scope.$$postDigest(function() {
                            if (isAllDefined(lastValue)) unwatch();
                        });
                    }
                }, objectEquality);
                function isAllDefined(value) {
                    var allDefined = true;
                    forEach(value, function(val) {
                        if (!isDefined(val)) allDefined = false;
                    });
                    return allDefined;
                }
            }
            function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch;
                return unwatch = scope.$watch(function constantWatch(scope) {
                    return parsedExpression(scope);
                }, function constantListener(value, old, scope) {
                    if (isFunction(listener)) {
                        listener.apply(this, arguments);
                    }
                    unwatch();
                }, objectEquality);
            }
            function addInterceptor(parsedExpression, interceptorFn) {
                if (!interceptorFn) return parsedExpression;
                var watchDelegate = parsedExpression.$$watchDelegate;
                var regularWatch = watchDelegate !== oneTimeLiteralWatchDelegate && watchDelegate !== oneTimeWatchDelegate;
                var fn = regularWatch ? function regularInterceptedExpression(scope, locals, assign, inputs) {
                    var value = parsedExpression(scope, locals, assign, inputs);
                    return interceptorFn(value, scope, locals);
                } : function oneTimeInterceptedExpression(scope, locals, assign, inputs) {
                    var value = parsedExpression(scope, locals, assign, inputs);
                    var result = interceptorFn(value, scope, locals);
                    return isDefined(value) ? result : value;
                };
                if (parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate) {
                    fn.$$watchDelegate = parsedExpression.$$watchDelegate;
                } else if (!interceptorFn.$stateful) {
                    fn.$$watchDelegate = inputsWatchDelegate;
                    fn.inputs = parsedExpression.inputs ? parsedExpression.inputs : [ parsedExpression ];
                }
                return fn;
            }
        } ];
    }
    function $QProvider() {
        this.$get = [ "$rootScope", "$exceptionHandler", function($rootScope, $exceptionHandler) {
            return qFactory(function(callback) {
                $rootScope.$evalAsync(callback);
            }, $exceptionHandler);
        } ];
    }
    function $$QProvider() {
        this.$get = [ "$browser", "$exceptionHandler", function($browser, $exceptionHandler) {
            return qFactory(function(callback) {
                $browser.defer(callback);
            }, $exceptionHandler);
        } ];
    }
    function qFactory(nextTick, exceptionHandler) {
        var $qMinErr = minErr("$q", TypeError);
        function callOnce(self, resolveFn, rejectFn) {
            var called = false;
            function wrap(fn) {
                return function(value) {
                    if (called) return;
                    called = true;
                    fn.call(self, value);
                };
            }
            return [ wrap(resolveFn), wrap(rejectFn) ];
        }
        var defer = function() {
            return new Deferred();
        };
        function Promise() {
            this.$$state = {
                status: 0
            };
        }
        Promise.prototype = {
            then: function(onFulfilled, onRejected, progressBack) {
                var result = new Deferred();
                this.$$state.pending = this.$$state.pending || [];
                this.$$state.pending.push([ result, onFulfilled, onRejected, progressBack ]);
                if (this.$$state.status > 0) scheduleProcessQueue(this.$$state);
                return result.promise;
            },
            "catch": function(callback) {
                return this.then(null, callback);
            },
            "finally": function(callback, progressBack) {
                return this.then(function(value) {
                    return handleCallback(value, true, callback);
                }, function(error) {
                    return handleCallback(error, false, callback);
                }, progressBack);
            }
        };
        function simpleBind(context, fn) {
            return function(value) {
                fn.call(context, value);
            };
        }
        function processQueue(state) {
            var fn, deferred, pending;
            pending = state.pending;
            state.processScheduled = false;
            state.pending = undefined;
            for (var i = 0, ii = pending.length; i < ii; ++i) {
                deferred = pending[i][0];
                fn = pending[i][state.status];
                try {
                    if (isFunction(fn)) {
                        deferred.resolve(fn(state.value));
                    } else if (state.status === 1) {
                        deferred.resolve(state.value);
                    } else {
                        deferred.reject(state.value);
                    }
                } catch (e) {
                    deferred.reject(e);
                    exceptionHandler(e);
                }
            }
        }
        function scheduleProcessQueue(state) {
            if (state.processScheduled || !state.pending) return;
            state.processScheduled = true;
            nextTick(function() {
                processQueue(state);
            });
        }
        function Deferred() {
            this.promise = new Promise();
            this.resolve = simpleBind(this, this.resolve);
            this.reject = simpleBind(this, this.reject);
            this.notify = simpleBind(this, this.notify);
        }
        Deferred.prototype = {
            resolve: function(val) {
                if (this.promise.$$state.status) return;
                if (val === this.promise) {
                    this.$$reject($qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val));
                } else {
                    this.$$resolve(val);
                }
            },
            $$resolve: function(val) {
                var then, fns;
                fns = callOnce(this, this.$$resolve, this.$$reject);
                try {
                    if (isObject(val) || isFunction(val)) then = val && val.then;
                    if (isFunction(then)) {
                        this.promise.$$state.status = -1;
                        then.call(val, fns[0], fns[1], this.notify);
                    } else {
                        this.promise.$$state.value = val;
                        this.promise.$$state.status = 1;
                        scheduleProcessQueue(this.promise.$$state);
                    }
                } catch (e) {
                    fns[1](e);
                    exceptionHandler(e);
                }
            },
            reject: function(reason) {
                if (this.promise.$$state.status) return;
                this.$$reject(reason);
            },
            $$reject: function(reason) {
                this.promise.$$state.value = reason;
                this.promise.$$state.status = 2;
                scheduleProcessQueue(this.promise.$$state);
            },
            notify: function(progress) {
                var callbacks = this.promise.$$state.pending;
                if (this.promise.$$state.status <= 0 && callbacks && callbacks.length) {
                    nextTick(function() {
                        var callback, result;
                        for (var i = 0, ii = callbacks.length; i < ii; i++) {
                            result = callbacks[i][0];
                            callback = callbacks[i][3];
                            try {
                                result.notify(isFunction(callback) ? callback(progress) : progress);
                            } catch (e) {
                                exceptionHandler(e);
                            }
                        }
                    });
                }
            }
        };
        var reject = function(reason) {
            var result = new Deferred();
            result.reject(reason);
            return result.promise;
        };
        var makePromise = function makePromise(value, resolved) {
            var result = new Deferred();
            if (resolved) {
                result.resolve(value);
            } else {
                result.reject(value);
            }
            return result.promise;
        };
        var handleCallback = function handleCallback(value, isResolved, callback) {
            var callbackOutput = null;
            try {
                if (isFunction(callback)) callbackOutput = callback();
            } catch (e) {
                return makePromise(e, false);
            }
            if (isPromiseLike(callbackOutput)) {
                return callbackOutput.then(function() {
                    return makePromise(value, isResolved);
                }, function(error) {
                    return makePromise(error, false);
                });
            } else {
                return makePromise(value, isResolved);
            }
        };
        var when = function(value, callback, errback, progressBack) {
            var result = new Deferred();
            result.resolve(value);
            return result.promise.then(callback, errback, progressBack);
        };
        var resolve = when;
        function all(promises) {
            var deferred = new Deferred(), counter = 0, results = isArray(promises) ? [] : {};
            forEach(promises, function(promise, key) {
                counter++;
                when(promise).then(function(value) {
                    if (results.hasOwnProperty(key)) return;
                    results[key] = value;
                    if (!--counter) deferred.resolve(results);
                }, function(reason) {
                    if (results.hasOwnProperty(key)) return;
                    deferred.reject(reason);
                });
            });
            if (counter === 0) {
                deferred.resolve(results);
            }
            return deferred.promise;
        }
        var $Q = function Q(resolver) {
            if (!isFunction(resolver)) {
                throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
            }
            if (!(this instanceof Q)) {
                return new Q(resolver);
            }
            var deferred = new Deferred();
            function resolveFn(value) {
                deferred.resolve(value);
            }
            function rejectFn(reason) {
                deferred.reject(reason);
            }
            resolver(resolveFn, rejectFn);
            return deferred.promise;
        };
        $Q.defer = defer;
        $Q.reject = reject;
        $Q.when = when;
        $Q.resolve = resolve;
        $Q.all = all;
        return $Q;
    }
    function $$RAFProvider() {
        this.$get = [ "$window", "$timeout", function($window, $timeout) {
            var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame;
            var cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame;
            var rafSupported = !!requestAnimationFrame;
            var rafFn = rafSupported ? function(fn) {
                var id = requestAnimationFrame(fn);
                return function() {
                    cancelAnimationFrame(id);
                };
            } : function(fn) {
                var timer = $timeout(fn, 16.66, false);
                return function() {
                    $timeout.cancel(timer);
                };
            };
            queueFn.supported = rafSupported;
            var cancelLastRAF;
            var taskCount = 0;
            var taskQueue = [];
            return queueFn;
            function flush() {
                for (var i = 0; i < taskQueue.length; i++) {
                    var task = taskQueue[i];
                    if (task) {
                        taskQueue[i] = null;
                        task();
                    }
                }
                taskCount = taskQueue.length = 0;
            }
            function queueFn(asyncFn) {
                var index = taskQueue.length;
                taskCount++;
                taskQueue.push(asyncFn);
                if (index === 0) {
                    cancelLastRAF = rafFn(flush);
                }
                return function cancelQueueFn() {
                    if (index >= 0) {
                        taskQueue[index] = null;
                        index = null;
                        if (--taskCount === 0 && cancelLastRAF) {
                            cancelLastRAF();
                            cancelLastRAF = null;
                            taskQueue.length = 0;
                        }
                    }
                };
            }
        } ];
    }
    function $RootScopeProvider() {
        var TTL = 10;
        var $rootScopeMinErr = minErr("$rootScope");
        var lastDirtyWatch = null;
        var applyAsyncId = null;
        this.digestTtl = function(value) {
            if (arguments.length) {
                TTL = value;
            }
            return TTL;
        };
        function createChildScopeClass(parent) {
            function ChildScope() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$watchersCount = 0;
                this.$id = nextUid();
                this.$$ChildScope = null;
            }
            ChildScope.prototype = parent;
            return ChildScope;
        }
        this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function($injector, $exceptionHandler, $parse, $browser) {
            function destroyChildScope($event) {
                $event.currentScope.$$destroyed = true;
            }
            function Scope() {
                this.$id = nextUid();
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this.$root = this;
                this.$$destroyed = false;
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$watchersCount = 0;
                this.$$isolateBindings = null;
            }
            Scope.prototype = {
                constructor: Scope,
                $new: function(isolate, parent) {
                    var child;
                    parent = parent || this;
                    if (isolate) {
                        child = new Scope();
                        child.$root = this.$root;
                    } else {
                        if (!this.$$ChildScope) {
                            this.$$ChildScope = createChildScopeClass(this);
                        }
                        child = new this.$$ChildScope();
                    }
                    child.$parent = parent;
                    child.$$prevSibling = parent.$$childTail;
                    if (parent.$$childHead) {
                        parent.$$childTail.$$nextSibling = child;
                        parent.$$childTail = child;
                    } else {
                        parent.$$childHead = parent.$$childTail = child;
                    }
                    if (isolate || parent != this) child.$on("$destroy", destroyChildScope);
                    return child;
                },
                $watch: function(watchExp, listener, objectEquality, prettyPrintExpression) {
                    var get = $parse(watchExp);
                    if (get.$$watchDelegate) {
                        return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
                    }
                    var scope = this, array = scope.$$watchers, watcher = {
                        fn: listener,
                        last: initWatchVal,
                        get: get,
                        exp: prettyPrintExpression || watchExp,
                        eq: !!objectEquality
                    };
                    lastDirtyWatch = null;
                    if (!isFunction(listener)) {
                        watcher.fn = noop;
                    }
                    if (!array) {
                        array = scope.$$watchers = [];
                    }
                    array.unshift(watcher);
                    incrementWatchersCount(this, 1);
                    return function deregisterWatch() {
                        if (arrayRemove(array, watcher) >= 0) {
                            incrementWatchersCount(scope, -1);
                        }
                        lastDirtyWatch = null;
                    };
                },
                $watchGroup: function(watchExpressions, listener) {
                    var oldValues = new Array(watchExpressions.length);
                    var newValues = new Array(watchExpressions.length);
                    var deregisterFns = [];
                    var self = this;
                    var changeReactionScheduled = false;
                    var firstRun = true;
                    if (!watchExpressions.length) {
                        var shouldCall = true;
                        self.$evalAsync(function() {
                            if (shouldCall) listener(newValues, newValues, self);
                        });
                        return function deregisterWatchGroup() {
                            shouldCall = false;
                        };
                    }
                    if (watchExpressions.length === 1) {
                        return this.$watch(watchExpressions[0], function watchGroupAction(value, oldValue, scope) {
                            newValues[0] = value;
                            oldValues[0] = oldValue;
                            listener(newValues, value === oldValue ? newValues : oldValues, scope);
                        });
                    }
                    forEach(watchExpressions, function(expr, i) {
                        var unwatchFn = self.$watch(expr, function watchGroupSubAction(value, oldValue) {
                            newValues[i] = value;
                            oldValues[i] = oldValue;
                            if (!changeReactionScheduled) {
                                changeReactionScheduled = true;
                                self.$evalAsync(watchGroupAction);
                            }
                        });
                        deregisterFns.push(unwatchFn);
                    });
                    function watchGroupAction() {
                        changeReactionScheduled = false;
                        if (firstRun) {
                            firstRun = false;
                            listener(newValues, newValues, self);
                        } else {
                            listener(newValues, oldValues, self);
                        }
                    }
                    return function deregisterWatchGroup() {
                        while (deregisterFns.length) {
                            deregisterFns.shift()();
                        }
                    };
                },
                $watchCollection: function(obj, listener) {
                    $watchCollectionInterceptor.$stateful = true;
                    var self = this;
                    var newValue;
                    var oldValue;
                    var veryOldValue;
                    var trackVeryOldValue = listener.length > 1;
                    var changeDetected = 0;
                    var changeDetector = $parse(obj, $watchCollectionInterceptor);
                    var internalArray = [];
                    var internalObject = {};
                    var initRun = true;
                    var oldLength = 0;
                    function $watchCollectionInterceptor(_value) {
                        newValue = _value;
                        var newLength, key, bothNaN, newItem, oldItem;
                        if (isUndefined(newValue)) return;
                        if (!isObject(newValue)) {
                            if (oldValue !== newValue) {
                                oldValue = newValue;
                                changeDetected++;
                            }
                        } else if (isArrayLike(newValue)) {
                            if (oldValue !== internalArray) {
                                oldValue = internalArray;
                                oldLength = oldValue.length = 0;
                                changeDetected++;
                            }
                            newLength = newValue.length;
                            if (oldLength !== newLength) {
                                changeDetected++;
                                oldValue.length = oldLength = newLength;
                            }
                            for (var i = 0; i < newLength; i++) {
                                oldItem = oldValue[i];
                                newItem = newValue[i];
                                bothNaN = oldItem !== oldItem && newItem !== newItem;
                                if (!bothNaN && oldItem !== newItem) {
                                    changeDetected++;
                                    oldValue[i] = newItem;
                                }
                            }
                        } else {
                            if (oldValue !== internalObject) {
                                oldValue = internalObject = {};
                                oldLength = 0;
                                changeDetected++;
                            }
                            newLength = 0;
                            for (key in newValue) {
                                if (newValue.hasOwnProperty(key)) {
                                    newLength++;
                                    newItem = newValue[key];
                                    oldItem = oldValue[key];
                                    if (key in oldValue) {
                                        bothNaN = oldItem !== oldItem && newItem !== newItem;
                                        if (!bothNaN && oldItem !== newItem) {
                                            changeDetected++;
                                            oldValue[key] = newItem;
                                        }
                                    } else {
                                        oldLength++;
                                        oldValue[key] = newItem;
                                        changeDetected++;
                                    }
                                }
                            }
                            if (oldLength > newLength) {
                                changeDetected++;
                                for (key in oldValue) {
                                    if (!newValue.hasOwnProperty(key)) {
                                        oldLength--;
                                        delete oldValue[key];
                                    }
                                }
                            }
                        }
                        return changeDetected;
                    }
                    function $watchCollectionAction() {
                        if (initRun) {
                            initRun = false;
                            listener(newValue, newValue, self);
                        } else {
                            listener(newValue, veryOldValue, self);
                        }
                        if (trackVeryOldValue) {
                            if (!isObject(newValue)) {
                                veryOldValue = newValue;
                            } else if (isArrayLike(newValue)) {
                                veryOldValue = new Array(newValue.length);
                                for (var i = 0; i < newValue.length; i++) {
                                    veryOldValue[i] = newValue[i];
                                }
                            } else {
                                veryOldValue = {};
                                for (var key in newValue) {
                                    if (hasOwnProperty.call(newValue, key)) {
                                        veryOldValue[key] = newValue[key];
                                    }
                                }
                            }
                        }
                    }
                    return this.$watch(changeDetector, $watchCollectionAction);
                },
                $digest: function() {
                    var watch, value, last, watchers, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg, asyncTask;
                    beginPhase("$digest");
                    $browser.$$checkUrlChange();
                    if (this === $rootScope && applyAsyncId !== null) {
                        $browser.defer.cancel(applyAsyncId);
                        flushApplyAsync();
                    }
                    lastDirtyWatch = null;
                    do {
                        dirty = false;
                        current = target;
                        while (asyncQueue.length) {
                            try {
                                asyncTask = asyncQueue.shift();
                                asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                            lastDirtyWatch = null;
                        }
                        traverseScopesLoop: do {
                            if (watchers = current.$$watchers) {
                                length = watchers.length;
                                while (length--) {
                                    try {
                                        watch = watchers[length];
                                        if (watch) {
                                            if ((value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value === "number" && typeof last === "number" && isNaN(value) && isNaN(last))) {
                                                dirty = true;
                                                lastDirtyWatch = watch;
                                                watch.last = watch.eq ? copy(value, null) : value;
                                                watch.fn(value, last === initWatchVal ? value : last, current);
                                                if (ttl < 5) {
                                                    logIdx = 4 - ttl;
                                                    if (!watchLog[logIdx]) watchLog[logIdx] = [];
                                                    watchLog[logIdx].push({
                                                        msg: isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                                        newVal: value,
                                                        oldVal: last
                                                    });
                                                }
                                            } else if (watch === lastDirtyWatch) {
                                                dirty = false;
                                                break traverseScopesLoop;
                                            }
                                        }
                                    } catch (e) {
                                        $exceptionHandler(e);
                                    }
                                }
                            }
                            if (!(next = current.$$watchersCount && current.$$childHead || current !== target && current.$$nextSibling)) {
                                while (current !== target && !(next = current.$$nextSibling)) {
                                    current = current.$parent;
                                }
                            }
                        } while (current = next);
                        if ((dirty || asyncQueue.length) && !ttl--) {
                            clearPhase();
                            throw $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\n" + "Watchers fired in the last 5 iterations: {1}", TTL, watchLog);
                        }
                    } while (dirty || asyncQueue.length);
                    clearPhase();
                    while (postDigestQueue.length) {
                        try {
                            postDigestQueue.shift()();
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    }
                },
                $destroy: function() {
                    if (this.$$destroyed) return;
                    var parent = this.$parent;
                    this.$broadcast("$destroy");
                    this.$$destroyed = true;
                    if (this === $rootScope) {
                        $browser.$$applicationDestroyed();
                    }
                    incrementWatchersCount(this, -this.$$watchersCount);
                    for (var eventName in this.$$listenerCount) {
                        decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                    }
                    if (parent && parent.$$childHead == this) parent.$$childHead = this.$$nextSibling;
                    if (parent && parent.$$childTail == this) parent.$$childTail = this.$$prevSibling;
                    if (this.$$prevSibling) this.$$prevSibling.$$nextSibling = this.$$nextSibling;
                    if (this.$$nextSibling) this.$$nextSibling.$$prevSibling = this.$$prevSibling;
                    this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop;
                    this.$on = this.$watch = this.$watchGroup = function() {
                        return noop;
                    };
                    this.$$listeners = {};
                    this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
                },
                $eval: function(expr, locals) {
                    return $parse(expr)(this, locals);
                },
                $evalAsync: function(expr, locals) {
                    if (!$rootScope.$$phase && !asyncQueue.length) {
                        $browser.defer(function() {
                            if (asyncQueue.length) {
                                $rootScope.$digest();
                            }
                        });
                    }
                    asyncQueue.push({
                        scope: this,
                        expression: expr,
                        locals: locals
                    });
                },
                $$postDigest: function(fn) {
                    postDigestQueue.push(fn);
                },
                $apply: function(expr) {
                    try {
                        beginPhase("$apply");
                        return this.$eval(expr);
                    } catch (e) {
                        $exceptionHandler(e);
                    } finally {
                        clearPhase();
                        try {
                            $rootScope.$digest();
                        } catch (e) {
                            $exceptionHandler(e);
                            throw e;
                        }
                    }
                },
                $applyAsync: function(expr) {
                    var scope = this;
                    expr && applyAsyncQueue.push($applyAsyncExpression);
                    scheduleApplyAsync();
                    function $applyAsyncExpression() {
                        scope.$eval(expr);
                    }
                },
                $on: function(name, listener) {
                    var namedListeners = this.$$listeners[name];
                    if (!namedListeners) {
                        this.$$listeners[name] = namedListeners = [];
                    }
                    namedListeners.push(listener);
                    var current = this;
                    do {
                        if (!current.$$listenerCount[name]) {
                            current.$$listenerCount[name] = 0;
                        }
                        current.$$listenerCount[name]++;
                    } while (current = current.$parent);
                    var self = this;
                    return function() {
                        var indexOfListener = namedListeners.indexOf(listener);
                        if (indexOfListener !== -1) {
                            namedListeners[indexOfListener] = null;
                            decrementListenerCount(self, 1, name);
                        }
                    };
                },
                $emit: function(name, args) {
                    var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                        name: name,
                        targetScope: scope,
                        stopPropagation: function() {
                            stopPropagation = true;
                        },
                        preventDefault: function() {
                            event.defaultPrevented = true;
                        },
                        defaultPrevented: false
                    }, listenerArgs = concat([ event ], arguments, 1), i, length;
                    do {
                        namedListeners = scope.$$listeners[name] || empty;
                        event.currentScope = scope;
                        for (i = 0, length = namedListeners.length; i < length; i++) {
                            if (!namedListeners[i]) {
                                namedListeners.splice(i, 1);
                                i--;
                                length--;
                                continue;
                            }
                            try {
                                namedListeners[i].apply(null, listenerArgs);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        }
                        if (stopPropagation) {
                            event.currentScope = null;
                            return event;
                        }
                        scope = scope.$parent;
                    } while (scope);
                    event.currentScope = null;
                    return event;
                },
                $broadcast: function(name, args) {
                    var target = this, current = target, next = target, event = {
                        name: name,
                        targetScope: target,
                        preventDefault: function() {
                            event.defaultPrevented = true;
                        },
                        defaultPrevented: false
                    };
                    if (!target.$$listenerCount[name]) return event;
                    var listenerArgs = concat([ event ], arguments, 1), listeners, i, length;
                    while (current = next) {
                        event.currentScope = current;
                        listeners = current.$$listeners[name] || [];
                        for (i = 0, length = listeners.length; i < length; i++) {
                            if (!listeners[i]) {
                                listeners.splice(i, 1);
                                i--;
                                length--;
                                continue;
                            }
                            try {
                                listeners[i].apply(null, listenerArgs);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        }
                        if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling)) {
                            while (current !== target && !(next = current.$$nextSibling)) {
                                current = current.$parent;
                            }
                        }
                    }
                    event.currentScope = null;
                    return event;
                }
            };
            var $rootScope = new Scope();
            var asyncQueue = $rootScope.$$asyncQueue = [];
            var postDigestQueue = $rootScope.$$postDigestQueue = [];
            var applyAsyncQueue = $rootScope.$$applyAsyncQueue = [];
            return $rootScope;
            function beginPhase(phase) {
                if ($rootScope.$$phase) {
                    throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                }
                $rootScope.$$phase = phase;
            }
            function clearPhase() {
                $rootScope.$$phase = null;
            }
            function incrementWatchersCount(current, count) {
                do {
                    current.$$watchersCount += count;
                } while (current = current.$parent);
            }
            function decrementListenerCount(current, count, name) {
                do {
                    current.$$listenerCount[name] -= count;
                    if (current.$$listenerCount[name] === 0) {
                        delete current.$$listenerCount[name];
                    }
                } while (current = current.$parent);
            }
            function initWatchVal() {}
            function flushApplyAsync() {
                while (applyAsyncQueue.length) {
                    try {
                        applyAsyncQueue.shift()();
                    } catch (e) {
                        $exceptionHandler(e);
                    }
                }
                applyAsyncId = null;
            }
            function scheduleApplyAsync() {
                if (applyAsyncId === null) {
                    applyAsyncId = $browser.defer(function() {
                        $rootScope.$apply(flushApplyAsync);
                    });
                }
            }
        } ];
    }
    function $$SanitizeUriProvider() {
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/, imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                aHrefSanitizationWhitelist = regexp;
                return this;
            }
            return aHrefSanitizationWhitelist;
        };
        this.imgSrcSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                imgSrcSanitizationWhitelist = regexp;
                return this;
            }
            return imgSrcSanitizationWhitelist;
        };
        this.$get = function() {
            return function sanitizeUri(uri, isImage) {
                var regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                var normalizedVal;
                normalizedVal = urlResolve(uri).href;
                if (normalizedVal !== "" && !normalizedVal.match(regex)) {
                    return "unsafe:" + normalizedVal;
                }
                return uri;
            };
        };
    }
    var $sceMinErr = minErr("$sce");
    var SCE_CONTEXTS = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    };
    function adjustMatcher(matcher) {
        if (matcher === "self") {
            return matcher;
        } else if (isString(matcher)) {
            if (matcher.indexOf("***") > -1) {
                throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
            }
            matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return new RegExp("^" + matcher + "$");
        } else if (isRegExp(matcher)) {
            return new RegExp("^" + matcher.source + "$");
        } else {
            throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
        }
    }
    function adjustMatchers(matchers) {
        var adjustedMatchers = [];
        if (isDefined(matchers)) {
            forEach(matchers, function(matcher) {
                adjustedMatchers.push(adjustMatcher(matcher));
            });
        }
        return adjustedMatchers;
    }
    function $SceDelegateProvider() {
        this.SCE_CONTEXTS = SCE_CONTEXTS;
        var resourceUrlWhitelist = [ "self" ], resourceUrlBlacklist = [];
        this.resourceUrlWhitelist = function(value) {
            if (arguments.length) {
                resourceUrlWhitelist = adjustMatchers(value);
            }
            return resourceUrlWhitelist;
        };
        this.resourceUrlBlacklist = function(value) {
            if (arguments.length) {
                resourceUrlBlacklist = adjustMatchers(value);
            }
            return resourceUrlBlacklist;
        };
        this.$get = [ "$injector", function($injector) {
            var htmlSanitizer = function htmlSanitizer(html) {
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            };
            if ($injector.has("$sanitize")) {
                htmlSanitizer = $injector.get("$sanitize");
            }
            function matchUrl(matcher, parsedUrl) {
                if (matcher === "self") {
                    return urlIsSameOrigin(parsedUrl);
                } else {
                    return !!matcher.exec(parsedUrl.href);
                }
            }
            function isResourceUrlAllowedByPolicy(url) {
                var parsedUrl = urlResolve(url.toString());
                var i, n, allowed = false;
                for (i = 0, n = resourceUrlWhitelist.length; i < n; i++) {
                    if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                        allowed = true;
                        break;
                    }
                }
                if (allowed) {
                    for (i = 0, n = resourceUrlBlacklist.length; i < n; i++) {
                        if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                            allowed = false;
                            break;
                        }
                    }
                }
                return allowed;
            }
            function generateHolderType(Base) {
                var holderType = function TrustedValueHolderType(trustedValue) {
                    this.$$unwrapTrustedValue = function() {
                        return trustedValue;
                    };
                };
                if (Base) {
                    holderType.prototype = new Base();
                }
                holderType.prototype.valueOf = function sceValueOf() {
                    return this.$$unwrapTrustedValue();
                };
                holderType.prototype.toString = function sceToString() {
                    return this.$$unwrapTrustedValue().toString();
                };
                return holderType;
            }
            var trustedValueHolderBase = generateHolderType(), byType = {};
            byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]);
            function trustAs(type, trustedValue) {
                var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (!Constructor) {
                    throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                }
                if (trustedValue === null || trustedValue === undefined || trustedValue === "") {
                    return trustedValue;
                }
                if (typeof trustedValue !== "string") {
                    throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                }
                return new Constructor(trustedValue);
            }
            function valueOf(maybeTrusted) {
                if (maybeTrusted instanceof trustedValueHolderBase) {
                    return maybeTrusted.$$unwrapTrustedValue();
                } else {
                    return maybeTrusted;
                }
            }
            function getTrusted(type, maybeTrusted) {
                if (maybeTrusted === null || maybeTrusted === undefined || maybeTrusted === "") {
                    return maybeTrusted;
                }
                var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (constructor && maybeTrusted instanceof constructor) {
                    return maybeTrusted.$$unwrapTrustedValue();
                }
                if (type === SCE_CONTEXTS.RESOURCE_URL) {
                    if (isResourceUrlAllowedByPolicy(maybeTrusted)) {
                        return maybeTrusted;
                    } else {
                        throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString());
                    }
                } else if (type === SCE_CONTEXTS.HTML) {
                    return htmlSanitizer(maybeTrusted);
                }
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            }
            return {
                trustAs: trustAs,
                getTrusted: getTrusted,
                valueOf: valueOf
            };
        } ];
    }
    function $SceProvider() {
        var enabled = true;
        this.enabled = function(value) {
            if (arguments.length) {
                enabled = !!value;
            }
            return enabled;
        };
        this.$get = [ "$parse", "$sceDelegate", function($parse, $sceDelegate) {
            if (enabled && msie < 8) {
                throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks " + "mode.  You can fix this by adding the text <!doctype html> to the top of your HTML " + "document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            }
            var sce = shallowCopy(SCE_CONTEXTS);
            sce.isEnabled = function() {
                return enabled;
            };
            sce.trustAs = $sceDelegate.trustAs;
            sce.getTrusted = $sceDelegate.getTrusted;
            sce.valueOf = $sceDelegate.valueOf;
            if (!enabled) {
                sce.trustAs = sce.getTrusted = function(type, value) {
                    return value;
                };
                sce.valueOf = identity;
            }
            sce.parseAs = function sceParseAs(type, expr) {
                var parsed = $parse(expr);
                if (parsed.literal && parsed.constant) {
                    return parsed;
                } else {
                    return $parse(expr, function(value) {
                        return sce.getTrusted(type, value);
                    });
                }
            };
            var parse = sce.parseAs, getTrusted = sce.getTrusted, trustAs = sce.trustAs;
            forEach(SCE_CONTEXTS, function(enumValue, name) {
                var lName = lowercase(name);
                sce[camelCase("parse_as_" + lName)] = function(expr) {
                    return parse(enumValue, expr);
                };
                sce[camelCase("get_trusted_" + lName)] = function(value) {
                    return getTrusted(enumValue, value);
                };
                sce[camelCase("trust_as_" + lName)] = function(value) {
                    return trustAs(enumValue, value);
                };
            });
            return sce;
        } ];
    }
    function $SnifferProvider() {
        this.$get = [ "$window", "$document", function($window, $document) {
            var eventSupport = {}, android = toInt((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), boxee = /Boxee/i.test(($window.navigator || {}).userAgent), document = $document[0] || {}, vendorPrefix, vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = false, animations = false, match;
            if (bodyStyle) {
                for (var prop in bodyStyle) {
                    if (match = vendorRegex.exec(prop)) {
                        vendorPrefix = match[0];
                        vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                        break;
                    }
                }
                if (!vendorPrefix) {
                    vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit";
                }
                transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle);
                animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle);
                if (android && (!transitions || !animations)) {
                    transitions = isString(bodyStyle.webkitTransition);
                    animations = isString(bodyStyle.webkitAnimation);
                }
            }
            return {
                history: !!($window.history && $window.history.pushState && !(android < 4) && !boxee),
                hasEvent: function(event) {
                    if (event === "input" && msie <= 11) return false;
                    if (isUndefined(eventSupport[event])) {
                        var divElm = document.createElement("div");
                        eventSupport[event] = "on" + event in divElm;
                    }
                    return eventSupport[event];
                },
                csp: csp(),
                vendorPrefix: vendorPrefix,
                transitions: transitions,
                animations: animations,
                android: android
            };
        } ];
    }
    var $compileMinErr = minErr("$compile");
    function $TemplateRequestProvider() {
        this.$get = [ "$templateCache", "$http", "$q", function($templateCache, $http, $q) {
            function handleRequestFn(tpl, ignoreRequestError) {
                handleRequestFn.totalPendingRequests++;
                var transformResponse = $http.defaults && $http.defaults.transformResponse;
                if (isArray(transformResponse)) {
                    transformResponse = transformResponse.filter(function(transformer) {
                        return transformer !== defaultHttpResponseTransform;
                    });
                } else if (transformResponse === defaultHttpResponseTransform) {
                    transformResponse = null;
                }
                var httpOptions = {
                    cache: $templateCache,
                    transformResponse: transformResponse
                };
                return $http.get(tpl, httpOptions)["finally"](function() {
                    handleRequestFn.totalPendingRequests--;
                }).then(function(response) {
                    $templateCache.put(tpl, response.data);
                    return response.data;
                }, handleError);
                function handleError(resp) {
                    if (!ignoreRequestError) {
                        throw $compileMinErr("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", tpl, resp.status, resp.statusText);
                    }
                    return $q.reject(resp);
                }
            }
            handleRequestFn.totalPendingRequests = 0;
            return handleRequestFn;
        } ];
    }
    function $$TestabilityProvider() {
        this.$get = [ "$rootScope", "$browser", "$location", function($rootScope, $browser, $location) {
            var testability = {};
            testability.findBindings = function(element, expression, opt_exactMatch) {
                var bindings = element.getElementsByClassName("ng-binding");
                var matches = [];
                forEach(bindings, function(binding) {
                    var dataBinding = angular.element(binding).data("$binding");
                    if (dataBinding) {
                        forEach(dataBinding, function(bindingName) {
                            if (opt_exactMatch) {
                                var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                                if (matcher.test(bindingName)) {
                                    matches.push(binding);
                                }
                            } else {
                                if (bindingName.indexOf(expression) != -1) {
                                    matches.push(binding);
                                }
                            }
                        });
                    }
                });
                return matches;
            };
            testability.findModels = function(element, expression, opt_exactMatch) {
                var prefixes = [ "ng-", "data-ng-", "ng\\:" ];
                for (var p = 0; p < prefixes.length; ++p) {
                    var attributeEquals = opt_exactMatch ? "=" : "*=";
                    var selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]';
                    var elements = element.querySelectorAll(selector);
                    if (elements.length) {
                        return elements;
                    }
                }
            };
            testability.getLocation = function() {
                return $location.url();
            };
            testability.setLocation = function(url) {
                if (url !== $location.url()) {
                    $location.url(url);
                    $rootScope.$digest();
                }
            };
            testability.whenStable = function(callback) {
                $browser.notifyWhenNoOutstandingRequests(callback);
            };
            return testability;
        } ];
    }
    function $TimeoutProvider() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function($rootScope, $browser, $q, $$q, $exceptionHandler) {
            var deferreds = {};
            function timeout(fn, delay, invokeApply) {
                if (!isFunction(fn)) {
                    invokeApply = delay;
                    delay = fn;
                    fn = noop;
                }
                var args = sliceArgs(arguments, 3), skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise, timeoutId;
                timeoutId = $browser.defer(function() {
                    try {
                        deferred.resolve(fn.apply(null, args));
                    } catch (e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    } finally {
                        delete deferreds[promise.$$timeoutId];
                    }
                    if (!skipApply) $rootScope.$apply();
                }, delay);
                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                return promise;
            }
            timeout.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject("canceled");
                    delete deferreds[promise.$$timeoutId];
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };
            return timeout;
        } ];
    }
    var urlParsingNode = document.createElement("a");
    var originUrl = urlResolve(window.location.href);
    function urlResolve(url) {
        var href = url;
        if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    function urlIsSameOrigin(requestUrl) {
        var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
        return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host;
    }
    function $WindowProvider() {
        this.$get = valueFn(window);
    }
    function $$CookieReader($document) {
        var rawDocument = $document[0] || {};
        var lastCookies = {};
        var lastCookieString = "";
        function safeDecodeURIComponent(str) {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return str;
            }
        }
        return function() {
            var cookieArray, cookie, i, index, name;
            var currentCookieString = rawDocument.cookie || "";
            if (currentCookieString !== lastCookieString) {
                lastCookieString = currentCookieString;
                cookieArray = lastCookieString.split("; ");
                lastCookies = {};
                for (i = 0; i < cookieArray.length; i++) {
                    cookie = cookieArray[i];
                    index = cookie.indexOf("=");
                    if (index > 0) {
                        name = safeDecodeURIComponent(cookie.substring(0, index));
                        if (lastCookies[name] === undefined) {
                            lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1));
                        }
                    }
                }
            }
            return lastCookies;
        };
    }
    $$CookieReader.$inject = [ "$document" ];
    function $$CookieReaderProvider() {
        this.$get = $$CookieReader;
    }
    $FilterProvider.$inject = [ "$provide" ];
    function $FilterProvider($provide) {
        var suffix = "Filter";
        function register(name, factory) {
            if (isObject(name)) {
                var filters = {};
                forEach(name, function(filter, key) {
                    filters[key] = register(key, filter);
                });
                return filters;
            } else {
                return $provide.factory(name + suffix, factory);
            }
        }
        this.register = register;
        this.$get = [ "$injector", function($injector) {
            return function(name) {
                return $injector.get(name + suffix);
            };
        } ];
        register("currency", currencyFilter);
        register("date", dateFilter);
        register("filter", filterFilter);
        register("json", jsonFilter);
        register("limitTo", limitToFilter);
        register("lowercase", lowercaseFilter);
        register("number", numberFilter);
        register("orderBy", orderByFilter);
        register("uppercase", uppercaseFilter);
    }
    function filterFilter() {
        return function(array, expression, comparator) {
            if (!isArrayLike(array)) {
                if (array == null) {
                    return array;
                } else {
                    throw minErr("filter")("notarray", "Expected array but received: {0}", array);
                }
            }
            var expressionType = getTypeForFilter(expression);
            var predicateFn;
            var matchAgainstAnyProp;
            switch (expressionType) {
              case "function":
                predicateFn = expression;
                break;

              case "boolean":
              case "null":
              case "number":
              case "string":
                matchAgainstAnyProp = true;

              case "object":
                predicateFn = createPredicateFn(expression, comparator, matchAgainstAnyProp);
                break;

              default:
                return array;
            }
            return Array.prototype.filter.call(array, predicateFn);
        };
    }
    function hasCustomToString(obj) {
        return isFunction(obj.toString) && obj.toString !== Object.prototype.toString;
    }
    function createPredicateFn(expression, comparator, matchAgainstAnyProp) {
        var shouldMatchPrimitives = isObject(expression) && "$" in expression;
        var predicateFn;
        if (comparator === true) {
            comparator = equals;
        } else if (!isFunction(comparator)) {
            comparator = function(actual, expected) {
                if (isUndefined(actual)) {
                    return false;
                }
                if (actual === null || expected === null) {
                    return actual === expected;
                }
                if (isObject(expected) || isObject(actual) && !hasCustomToString(actual)) {
                    return false;
                }
                actual = lowercase("" + actual);
                expected = lowercase("" + expected);
                return actual.indexOf(expected) !== -1;
            };
        }
        predicateFn = function(item) {
            if (shouldMatchPrimitives && !isObject(item)) {
                return deepCompare(item, expression.$, comparator, false);
            }
            return deepCompare(item, expression, comparator, matchAgainstAnyProp);
        };
        return predicateFn;
    }
    function deepCompare(actual, expected, comparator, matchAgainstAnyProp, dontMatchWholeObject) {
        var actualType = getTypeForFilter(actual);
        var expectedType = getTypeForFilter(expected);
        if (expectedType === "string" && expected.charAt(0) === "!") {
            return !deepCompare(actual, expected.substring(1), comparator, matchAgainstAnyProp);
        } else if (isArray(actual)) {
            return actual.some(function(item) {
                return deepCompare(item, expected, comparator, matchAgainstAnyProp);
            });
        }
        switch (actualType) {
          case "object":
            var key;
            if (matchAgainstAnyProp) {
                for (key in actual) {
                    if (key.charAt(0) !== "$" && deepCompare(actual[key], expected, comparator, true)) {
                        return true;
                    }
                }
                return dontMatchWholeObject ? false : deepCompare(actual, expected, comparator, false);
            } else if (expectedType === "object") {
                for (key in expected) {
                    var expectedVal = expected[key];
                    if (isFunction(expectedVal) || isUndefined(expectedVal)) {
                        continue;
                    }
                    var matchAnyProperty = key === "$";
                    var actualVal = matchAnyProperty ? actual : actual[key];
                    if (!deepCompare(actualVal, expectedVal, comparator, matchAnyProperty, matchAnyProperty)) {
                        return false;
                    }
                }
                return true;
            } else {
                return comparator(actual, expected);
            }
            break;

          case "function":
            return false;

          default:
            return comparator(actual, expected);
        }
    }
    function getTypeForFilter(val) {
        return val === null ? "null" : typeof val;
    }
    currencyFilter.$inject = [ "$locale" ];
    function currencyFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(amount, currencySymbol, fractionSize) {
            if (isUndefined(currencySymbol)) {
                currencySymbol = formats.CURRENCY_SYM;
            }
            if (isUndefined(fractionSize)) {
                fractionSize = formats.PATTERNS[1].maxFrac;
            }
            return amount == null ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol);
        };
    }
    numberFilter.$inject = [ "$locale" ];
    function numberFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(number, fractionSize) {
            return number == null ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
        };
    }
    var DECIMAL_SEP = ".";
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (isObject(number)) return "";
        var isNegative = number < 0;
        number = Math.abs(number);
        var isInfinity = number === Infinity;
        if (!isInfinity && !isFinite(number)) return "";
        var numStr = number + "", formatedText = "", hasExponent = false, parts = [];
        if (isInfinity) formatedText = "∞";
        if (!isInfinity && numStr.indexOf("e") !== -1) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            if (match && match[2] == "-" && match[3] > fractionSize + 1) {
                number = 0;
            } else {
                formatedText = numStr;
                hasExponent = true;
            }
        }
        if (!isInfinity && !hasExponent) {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || "").length;
            if (isUndefined(fractionSize)) {
                fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
            }
            number = +(Math.round(+(number.toString() + "e" + fractionSize)).toString() + "e" + -fractionSize);
            var fraction = ("" + number).split(DECIMAL_SEP);
            var whole = fraction[0];
            fraction = fraction[1] || "";
            var i, pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
            if (whole.length >= lgroup + group) {
                pos = whole.length - lgroup;
                for (i = 0; i < pos; i++) {
                    if ((pos - i) % group === 0 && i !== 0) {
                        formatedText += groupSep;
                    }
                    formatedText += whole.charAt(i);
                }
            }
            for (i = pos; i < whole.length; i++) {
                if ((whole.length - i) % lgroup === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
            while (fraction.length < fractionSize) {
                fraction += "0";
            }
            if (fractionSize && fractionSize !== "0") formatedText += decimalSep + fraction.substr(0, fractionSize);
        } else {
            if (fractionSize > 0 && number < 1) {
                formatedText = number.toFixed(fractionSize);
                number = parseFloat(formatedText);
            }
        }
        if (number === 0) {
            isNegative = false;
        }
        parts.push(isNegative ? pattern.negPre : pattern.posPre, formatedText, isNegative ? pattern.negSuf : pattern.posSuf);
        return parts.join("");
    }
    function padNumber(num, digits, trim) {
        var neg = "";
        if (num < 0) {
            neg = "-";
            num = -num;
        }
        num = "" + num;
        while (num.length < digits) num = "0" + num;
        if (trim) {
            num = num.substr(num.length - digits);
        }
        return neg + num;
    }
    function dateGetter(name, size, offset, trim) {
        offset = offset || 0;
        return function(date) {
            var value = date["get" + name]();
            if (offset > 0 || value > -offset) {
                value += offset;
            }
            if (value === 0 && offset == -12) value = 12;
            return padNumber(value, size, trim);
        };
    }
    function dateStrGetter(name, shortForm) {
        return function(date, formats) {
            var value = date["get" + name]();
            var get = uppercase(shortForm ? "SHORT" + name : name);
            return formats[get][value];
        };
    }
    function timeZoneGetter(date, formats, offset) {
        var zone = -1 * offset;
        var paddedZone = zone >= 0 ? "+" : "";
        paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
        return paddedZone;
    }
    function getFirstThursdayOfYear(year) {
        var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
        return new Date(year, 0, (dayOfWeekOnFirst <= 4 ? 5 : 12) - dayOfWeekOnFirst);
    }
    function getThursdayThisWeek(datetime) {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()));
    }
    function weekGetter(size) {
        return function(date) {
            var firstThurs = getFirstThursdayOfYear(date.getFullYear()), thisThurs = getThursdayThisWeek(date);
            var diff = +thisThurs - +firstThurs, result = 1 + Math.round(diff / 6048e5);
            return padNumber(result, size);
        };
    }
    function ampmGetter(date, formats) {
        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    function eraGetter(date, formats) {
        return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
    }
    function longEraGetter(date, formats) {
        return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
    }
    var DATE_FORMATS = {
        yyyy: dateGetter("FullYear", 4),
        yy: dateGetter("FullYear", 2, 0, true),
        y: dateGetter("FullYear", 1),
        MMMM: dateStrGetter("Month"),
        MMM: dateStrGetter("Month", true),
        MM: dateGetter("Month", 2, 1),
        M: dateGetter("Month", 1, 1),
        dd: dateGetter("Date", 2),
        d: dateGetter("Date", 1),
        HH: dateGetter("Hours", 2),
        H: dateGetter("Hours", 1),
        hh: dateGetter("Hours", 2, -12),
        h: dateGetter("Hours", 1, -12),
        mm: dateGetter("Minutes", 2),
        m: dateGetter("Minutes", 1),
        ss: dateGetter("Seconds", 2),
        s: dateGetter("Seconds", 1),
        sss: dateGetter("Milliseconds", 3),
        EEEE: dateStrGetter("Day"),
        EEE: dateStrGetter("Day", true),
        a: ampmGetter,
        Z: timeZoneGetter,
        ww: weekGetter(2),
        w: weekGetter(1),
        G: eraGetter,
        GG: eraGetter,
        GGG: eraGetter,
        GGGG: longEraGetter
    };
    var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, NUMBER_STRING = /^\-?\d+$/;
    dateFilter.$inject = [ "$locale" ];
    function dateFilter($locale) {
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
                var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
                if (match[9]) {
                    tzHour = toInt(match[9] + match[10]);
                    tzMin = toInt(match[9] + match[11]);
                }
                dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
                var h = toInt(match[4] || 0) - tzHour;
                var m = toInt(match[5] || 0) - tzMin;
                var s = toInt(match[6] || 0);
                var ms = Math.round(parseFloat("0." + (match[7] || 0)) * 1e3);
                timeSetter.call(date, h, m, s, ms);
                return date;
            }
            return string;
        }
        return function(date, format, timezone) {
            var text = "", parts = [], fn, match;
            format = format || "mediumDate";
            format = $locale.DATETIME_FORMATS[format] || format;
            if (isString(date)) {
                date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date);
            }
            if (isNumber(date)) {
                date = new Date(date);
            }
            if (!isDate(date) || !isFinite(date.getTime())) {
                return date;
            }
            while (format) {
                match = DATE_FORMATS_SPLIT.exec(format);
                if (match) {
                    parts = concat(parts, match, 1);
                    format = parts.pop();
                } else {
                    parts.push(format);
                    format = null;
                }
            }
            var dateTimezoneOffset = date.getTimezoneOffset();
            if (timezone) {
                dateTimezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
                date = convertTimezoneToLocal(date, timezone, true);
            }
            forEach(parts, function(value) {
                fn = DATE_FORMATS[value];
                text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return text;
        };
    }
    function jsonFilter() {
        return function(object, spacing) {
            if (isUndefined(spacing)) {
                spacing = 2;
            }
            return toJson(object, spacing);
        };
    }
    var lowercaseFilter = valueFn(lowercase);
    var uppercaseFilter = valueFn(uppercase);
    function limitToFilter() {
        return function(input, limit, begin) {
            if (Math.abs(Number(limit)) === Infinity) {
                limit = Number(limit);
            } else {
                limit = toInt(limit);
            }
            if (isNaN(limit)) return input;
            if (isNumber(input)) input = input.toString();
            if (!isArray(input) && !isString(input)) return input;
            begin = !begin || isNaN(begin) ? 0 : toInt(begin);
            begin = begin < 0 && begin >= -input.length ? input.length + begin : begin;
            if (limit >= 0) {
                return input.slice(begin, begin + limit);
            } else {
                if (begin === 0) {
                    return input.slice(limit, input.length);
                } else {
                    return input.slice(Math.max(0, begin + limit), begin);
                }
            }
        };
    }
    orderByFilter.$inject = [ "$parse" ];
    function orderByFilter($parse) {
        return function(array, sortPredicate, reverseOrder) {
            if (!isArrayLike(array)) return array;
            sortPredicate = isArray(sortPredicate) ? sortPredicate : [ sortPredicate ];
            if (sortPredicate.length === 0) {
                sortPredicate = [ "+" ];
            }
            sortPredicate = sortPredicate.map(function(predicate) {
                var descending = false, get = predicate || identity;
                if (isString(predicate)) {
                    if (predicate.charAt(0) == "+" || predicate.charAt(0) == "-") {
                        descending = predicate.charAt(0) == "-";
                        predicate = predicate.substring(1);
                    }
                    if (predicate === "") {
                        return reverseComparator(compare, descending);
                    }
                    get = $parse(predicate);
                    if (get.constant) {
                        var key = get();
                        return reverseComparator(function(a, b) {
                            return compare(a[key], b[key]);
                        }, descending);
                    }
                }
                return reverseComparator(function(a, b) {
                    return compare(get(a), get(b));
                }, descending);
            });
            return slice.call(array).sort(reverseComparator(comparator, reverseOrder));
            function comparator(o1, o2) {
                for (var i = 0; i < sortPredicate.length; i++) {
                    var comp = sortPredicate[i](o1, o2);
                    if (comp !== 0) return comp;
                }
                return 0;
            }
            function reverseComparator(comp, descending) {
                return descending ? function(a, b) {
                    return comp(b, a);
                } : comp;
            }
            function isPrimitive(value) {
                switch (typeof value) {
                  case "number":
                  case "boolean":
                  case "string":
                    return true;

                  default:
                    return false;
                }
            }
            function objectToString(value) {
                if (value === null) return "null";
                if (typeof value.valueOf === "function") {
                    value = value.valueOf();
                    if (isPrimitive(value)) return value;
                }
                if (typeof value.toString === "function") {
                    value = value.toString();
                    if (isPrimitive(value)) return value;
                }
                return "";
            }
            function compare(v1, v2) {
                var t1 = typeof v1;
                var t2 = typeof v2;
                if (t1 === t2 && t1 === "object") {
                    v1 = objectToString(v1);
                    v2 = objectToString(v2);
                }
                if (t1 === t2) {
                    if (t1 === "string") {
                        v1 = v1.toLowerCase();
                        v2 = v2.toLowerCase();
                    }
                    if (v1 === v2) return 0;
                    return v1 < v2 ? -1 : 1;
                } else {
                    return t1 < t2 ? -1 : 1;
                }
            }
        };
    }
    function ngDirective(directive) {
        if (isFunction(directive)) {
            directive = {
                link: directive
            };
        }
        directive.restrict = directive.restrict || "AC";
        return valueFn(directive);
    }
    var htmlAnchorDirective = valueFn({
        restrict: "E",
        compile: function(element, attr) {
            if (!attr.href && !attr.xlinkHref) {
                return function(scope, element) {
                    if (element[0].nodeName.toLowerCase() !== "a") return;
                    var href = toString.call(element.prop("href")) === "[object SVGAnimatedString]" ? "xlink:href" : "href";
                    element.on("click", function(event) {
                        if (!element.attr(href)) {
                            event.preventDefault();
                        }
                    });
                };
            }
        }
    });
    var ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function(propName, attrName) {
        if (propName == "multiple") return;
        function defaultLinkFn(scope, element, attr) {
            scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
                attr.$set(attrName, !!value);
            });
        }
        var normalized = directiveNormalize("ng-" + attrName);
        var linkFn = defaultLinkFn;
        if (propName === "checked") {
            linkFn = function(scope, element, attr) {
                if (attr.ngModel !== attr[normalized]) {
                    defaultLinkFn(scope, element, attr);
                }
            };
        }
        ngAttributeAliasDirectives[normalized] = function() {
            return {
                restrict: "A",
                priority: 100,
                link: linkFn
            };
        };
    });
    forEach(ALIASED_ATTR, function(htmlAttr, ngAttr) {
        ngAttributeAliasDirectives[ngAttr] = function() {
            return {
                priority: 100,
                link: function(scope, element, attr) {
                    if (ngAttr === "ngPattern" && attr.ngPattern.charAt(0) == "/") {
                        var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                        if (match) {
                            attr.$set("ngPattern", new RegExp(match[1], match[2]));
                            return;
                        }
                    }
                    scope.$watch(attr[ngAttr], function ngAttrAliasWatchAction(value) {
                        attr.$set(ngAttr, value);
                    });
                }
            };
        };
    });
    forEach([ "src", "srcset", "href" ], function(attrName) {
        var normalized = directiveNormalize("ng-" + attrName);
        ngAttributeAliasDirectives[normalized] = function() {
            return {
                priority: 99,
                link: function(scope, element, attr) {
                    var propName = attrName, name = attrName;
                    if (attrName === "href" && toString.call(element.prop("href")) === "[object SVGAnimatedString]") {
                        name = "xlinkHref";
                        attr.$attr[name] = "xlink:href";
                        propName = null;
                    }
                    attr.$observe(normalized, function(value) {
                        if (!value) {
                            if (attrName === "href") {
                                attr.$set(name, null);
                            }
                            return;
                        }
                        attr.$set(name, value);
                        if (msie && propName) element.prop(propName, attr[name]);
                    });
                }
            };
        };
    });
    var nullFormCtrl = {
        $addControl: noop,
        $$renameControl: nullFormRenameControl,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop,
        $setPristine: noop,
        $setSubmitted: noop
    }, SUBMITTED_CLASS = "ng-submitted";
    function nullFormRenameControl(control, name) {
        control.$name = name;
    }
    FormController.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    function FormController(element, attrs, $scope, $animate, $interpolate) {
        var form = this, controls = [];
        var parentForm = form.$$parentForm = element.parent().controller("form") || nullFormCtrl;
        form.$error = {};
        form.$$success = {};
        form.$pending = undefined;
        form.$name = $interpolate(attrs.name || attrs.ngForm || "")($scope);
        form.$dirty = false;
        form.$pristine = true;
        form.$valid = true;
        form.$invalid = false;
        form.$submitted = false;
        parentForm.$addControl(form);
        form.$rollbackViewValue = function() {
            forEach(controls, function(control) {
                control.$rollbackViewValue();
            });
        };
        form.$commitViewValue = function() {
            forEach(controls, function(control) {
                control.$commitViewValue();
            });
        };
        form.$addControl = function(control) {
            assertNotHasOwnProperty(control.$name, "input");
            controls.push(control);
            if (control.$name) {
                form[control.$name] = control;
            }
        };
        form.$$renameControl = function(control, newName) {
            var oldName = control.$name;
            if (form[oldName] === control) {
                delete form[oldName];
            }
            form[newName] = control;
            control.$name = newName;
        };
        form.$removeControl = function(control) {
            if (control.$name && form[control.$name] === control) {
                delete form[control.$name];
            }
            forEach(form.$pending, function(value, name) {
                form.$setValidity(name, null, control);
            });
            forEach(form.$error, function(value, name) {
                form.$setValidity(name, null, control);
            });
            forEach(form.$$success, function(value, name) {
                form.$setValidity(name, null, control);
            });
            arrayRemove(controls, control);
        };
        addSetValidityMethod({
            ctrl: this,
            $element: element,
            set: function(object, property, controller) {
                var list = object[property];
                if (!list) {
                    object[property] = [ controller ];
                } else {
                    var index = list.indexOf(controller);
                    if (index === -1) {
                        list.push(controller);
                    }
                }
            },
            unset: function(object, property, controller) {
                var list = object[property];
                if (!list) {
                    return;
                }
                arrayRemove(list, controller);
                if (list.length === 0) {
                    delete object[property];
                }
            },
            parentForm: parentForm,
            $animate: $animate
        });
        form.$setDirty = function() {
            $animate.removeClass(element, PRISTINE_CLASS);
            $animate.addClass(element, DIRTY_CLASS);
            form.$dirty = true;
            form.$pristine = false;
            parentForm.$setDirty();
        };
        form.$setPristine = function() {
            $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS);
            form.$dirty = false;
            form.$pristine = true;
            form.$submitted = false;
            forEach(controls, function(control) {
                control.$setPristine();
            });
        };
        form.$setUntouched = function() {
            forEach(controls, function(control) {
                control.$setUntouched();
            });
        };
        form.$setSubmitted = function() {
            $animate.addClass(element, SUBMITTED_CLASS);
            form.$submitted = true;
            parentForm.$setSubmitted();
        };
    }
    var formDirectiveFactory = function(isNgForm) {
        return [ "$timeout", function($timeout) {
            var formDirective = {
                name: "form",
                restrict: isNgForm ? "EAC" : "E",
                controller: FormController,
                compile: function ngFormCompile(formElement, attr) {
                    formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);
                    var nameAttr = attr.name ? "name" : isNgForm && attr.ngForm ? "ngForm" : false;
                    return {
                        pre: function ngFormPreLink(scope, formElement, attr, controller) {
                            if (!("action" in attr)) {
                                var handleFormSubmission = function(event) {
                                    scope.$apply(function() {
                                        controller.$commitViewValue();
                                        controller.$setSubmitted();
                                    });
                                    event.preventDefault();
                                };
                                addEventListenerFn(formElement[0], "submit", handleFormSubmission);
                                formElement.on("$destroy", function() {
                                    $timeout(function() {
                                        removeEventListenerFn(formElement[0], "submit", handleFormSubmission);
                                    }, 0, false);
                                });
                            }
                            var parentFormCtrl = controller.$$parentForm;
                            if (nameAttr) {
                                setter(scope, controller.$name, controller, controller.$name);
                                attr.$observe(nameAttr, function(newValue) {
                                    if (controller.$name === newValue) return;
                                    setter(scope, controller.$name, undefined, controller.$name);
                                    parentFormCtrl.$$renameControl(controller, newValue);
                                    setter(scope, controller.$name, controller, controller.$name);
                                });
                            }
                            formElement.on("$destroy", function() {
                                parentFormCtrl.$removeControl(controller);
                                if (nameAttr) {
                                    setter(scope, attr[nameAttr], undefined, controller.$name);
                                }
                                extend(controller, nullFormCtrl);
                            });
                        }
                    };
                }
            };
            return formDirective;
        } ];
    };
    var formDirective = formDirectiveFactory();
    var ngFormDirective = formDirectiveFactory(true);
    var ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    var DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;
    var DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;
    var WEEK_REGEXP = /^(\d{4})-W(\d\d)$/;
    var MONTH_REGEXP = /^(\d{4})-(\d\d)$/;
    var TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;
    var inputType = {
        text: textInputType,
        date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
        month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: numberInputType,
        url: urlInputType,
        email: emailInputType,
        radio: radioInputType,
        checkbox: checkboxInputType,
        hidden: noop,
        button: noop,
        submit: noop,
        reset: noop,
        file: noop
    };
    function stringBasedInputType(ctrl) {
        ctrl.$formatters.push(function(value) {
            return ctrl.$isEmpty(value) ? value : value.toString();
        });
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        stringBasedInputType(ctrl);
    }
    function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        var type = lowercase(element[0].type);
        if (!$sniffer.android) {
            var composing = false;
            element.on("compositionstart", function(data) {
                composing = true;
            });
            element.on("compositionend", function() {
                composing = false;
                listener();
            });
        }
        var listener = function(ev) {
            if (timeout) {
                $browser.defer.cancel(timeout);
                timeout = null;
            }
            if (composing) return;
            var value = element.val(), event = ev && ev.type;
            if (type !== "password" && (!attr.ngTrim || attr.ngTrim !== "false")) {
                value = trim(value);
            }
            if (ctrl.$viewValue !== value || value === "" && ctrl.$$hasNativeValidators) {
                ctrl.$setViewValue(value, event);
            }
        };
        if ($sniffer.hasEvent("input")) {
            element.on("input", listener);
        } else {
            var timeout;
            var deferListener = function(ev, input, origValue) {
                if (!timeout) {
                    timeout = $browser.defer(function() {
                        timeout = null;
                        if (!input || input.value !== origValue) {
                            listener(ev);
                        }
                    });
                }
            };
            element.on("keydown", function(event) {
                var key = event.keyCode;
                if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40) return;
                deferListener(event, this, this.value);
            });
            if ($sniffer.hasEvent("paste")) {
                element.on("paste cut", deferListener);
            }
        }
        element.on("change", listener);
        ctrl.$render = function() {
            element.val(ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
        };
    }
    function weekParser(isoWeek, existingDate) {
        if (isDate(isoWeek)) {
            return isoWeek;
        }
        if (isString(isoWeek)) {
            WEEK_REGEXP.lastIndex = 0;
            var parts = WEEK_REGEXP.exec(isoWeek);
            if (parts) {
                var year = +parts[1], week = +parts[2], hours = 0, minutes = 0, seconds = 0, milliseconds = 0, firstThurs = getFirstThursdayOfYear(year), addDays = (week - 1) * 7;
                if (existingDate) {
                    hours = existingDate.getHours();
                    minutes = existingDate.getMinutes();
                    seconds = existingDate.getSeconds();
                    milliseconds = existingDate.getMilliseconds();
                }
                return new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds);
            }
        }
        return NaN;
    }
    function createDateParser(regexp, mapping) {
        return function(iso, date) {
            var parts, map;
            if (isDate(iso)) {
                return iso;
            }
            if (isString(iso)) {
                if (iso.charAt(0) == '"' && iso.charAt(iso.length - 1) == '"') {
                    iso = iso.substring(1, iso.length - 1);
                }
                if (ISO_DATE_REGEXP.test(iso)) {
                    return new Date(iso);
                }
                regexp.lastIndex = 0;
                parts = regexp.exec(iso);
                if (parts) {
                    parts.shift();
                    if (date) {
                        map = {
                            yyyy: date.getFullYear(),
                            MM: date.getMonth() + 1,
                            dd: date.getDate(),
                            HH: date.getHours(),
                            mm: date.getMinutes(),
                            ss: date.getSeconds(),
                            sss: date.getMilliseconds() / 1e3
                        };
                    } else {
                        map = {
                            yyyy: 1970,
                            MM: 1,
                            dd: 1,
                            HH: 0,
                            mm: 0,
                            ss: 0,
                            sss: 0
                        };
                    }
                    forEach(parts, function(part, index) {
                        if (index < mapping.length) {
                            map[mapping[index]] = +part;
                        }
                    });
                    return new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, map.sss * 1e3 || 0);
                }
            }
            return NaN;
        };
    }
    function createDateInputType(type, regexp, parseDate, format) {
        return function dynamicDateInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter) {
            badInputChecker(scope, element, attr, ctrl);
            baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
            var timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
            var previousDate;
            ctrl.$$parserName = type;
            ctrl.$parsers.push(function(value) {
                if (ctrl.$isEmpty(value)) return null;
                if (regexp.test(value)) {
                    var parsedDate = parseDate(value, previousDate);
                    if (timezone) {
                        parsedDate = convertTimezoneToLocal(parsedDate, timezone);
                    }
                    return parsedDate;
                }
                return undefined;
            });
            ctrl.$formatters.push(function(value) {
                if (value && !isDate(value)) {
                    throw $ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                }
                if (isValidDate(value)) {
                    previousDate = value;
                    if (previousDate && timezone) {
                        previousDate = convertTimezoneToLocal(previousDate, timezone, true);
                    }
                    return $filter("date")(value, format, timezone);
                } else {
                    previousDate = null;
                    return "";
                }
            });
            if (isDefined(attr.min) || attr.ngMin) {
                var minVal;
                ctrl.$validators.min = function(value) {
                    return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal;
                };
                attr.$observe("min", function(val) {
                    minVal = parseObservedDateValue(val);
                    ctrl.$validate();
                });
            }
            if (isDefined(attr.max) || attr.ngMax) {
                var maxVal;
                ctrl.$validators.max = function(value) {
                    return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal;
                };
                attr.$observe("max", function(val) {
                    maxVal = parseObservedDateValue(val);
                    ctrl.$validate();
                });
            }
            function isValidDate(value) {
                return value && !(value.getTime && value.getTime() !== value.getTime());
            }
            function parseObservedDateValue(val) {
                return isDefined(val) ? isDate(val) ? val : parseDate(val) : undefined;
            }
        };
    }
    function badInputChecker(scope, element, attr, ctrl) {
        var node = element[0];
        var nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
        if (nativeValidation) {
            ctrl.$parsers.push(function(value) {
                var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
                return validity.badInput && !validity.typeMismatch ? undefined : value;
            });
        }
    }
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        badInputChecker(scope, element, attr, ctrl);
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        ctrl.$$parserName = "number";
        ctrl.$parsers.push(function(value) {
            if (ctrl.$isEmpty(value)) return null;
            if (NUMBER_REGEXP.test(value)) return parseFloat(value);
            return undefined;
        });
        ctrl.$formatters.push(function(value) {
            if (!ctrl.$isEmpty(value)) {
                if (!isNumber(value)) {
                    throw $ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                }
                value = value.toString();
            }
            return value;
        });
        if (isDefined(attr.min) || attr.ngMin) {
            var minVal;
            ctrl.$validators.min = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal;
            };
            attr.$observe("min", function(val) {
                if (isDefined(val) && !isNumber(val)) {
                    val = parseFloat(val, 10);
                }
                minVal = isNumber(val) && !isNaN(val) ? val : undefined;
                ctrl.$validate();
            });
        }
        if (isDefined(attr.max) || attr.ngMax) {
            var maxVal;
            ctrl.$validators.max = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(maxVal) || value <= maxVal;
            };
            attr.$observe("max", function(val) {
                if (isDefined(val) && !isNumber(val)) {
                    val = parseFloat(val, 10);
                }
                maxVal = isNumber(val) && !isNaN(val) ? val : undefined;
                ctrl.$validate();
            });
        }
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        stringBasedInputType(ctrl);
        ctrl.$$parserName = "url";
        ctrl.$validators.url = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || URL_REGEXP.test(value);
        };
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        stringBasedInputType(ctrl);
        ctrl.$$parserName = "email";
        ctrl.$validators.email = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value);
        };
    }
    function radioInputType(scope, element, attr, ctrl) {
        if (isUndefined(attr.name)) {
            element.attr("name", nextUid());
        }
        var listener = function(ev) {
            if (element[0].checked) {
                ctrl.$setViewValue(attr.value, ev && ev.type);
            }
        };
        element.on("click", listener);
        ctrl.$render = function() {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue;
        };
        attr.$observe("value", ctrl.$render);
    }
    function parseConstantExpr($parse, context, name, expression, fallback) {
        var parseFn;
        if (isDefined(expression)) {
            parseFn = $parse(expression);
            if (!parseFn.constant) {
                throw minErr("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw " + "`{1}`.", name, expression);
            }
            return parseFn(context);
        }
        return fallback;
    }
    function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
        var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, true);
        var falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, false);
        var listener = function(ev) {
            ctrl.$setViewValue(element[0].checked, ev && ev.type);
        };
        element.on("click", listener);
        ctrl.$render = function() {
            element[0].checked = ctrl.$viewValue;
        };
        ctrl.$isEmpty = function(value) {
            return value === false;
        };
        ctrl.$formatters.push(function(value) {
            return equals(value, trueValue);
        });
        ctrl.$parsers.push(function(value) {
            return value ? trueValue : falseValue;
        });
    }
    var inputDirective = [ "$browser", "$sniffer", "$filter", "$parse", function($browser, $sniffer, $filter, $parse) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(scope, element, attr, ctrls) {
                    if (ctrls[0]) {
                        (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse);
                    }
                }
            }
        };
    } ];
    var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
    var ngValueDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(tpl, tplAttr) {
                if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
                    return function ngValueConstantLink(scope, elm, attr) {
                        attr.$set("value", scope.$eval(attr.ngValue));
                    };
                } else {
                    return function ngValueLink(scope, elm, attr) {
                        scope.$watch(attr.ngValue, function valueWatchAction(value) {
                            attr.$set("value", value);
                        });
                    };
                }
            }
        };
    };
    var ngBindDirective = [ "$compile", function($compile) {
        return {
            restrict: "AC",
            compile: function ngBindCompile(templateElement) {
                $compile.$$addBindingClass(templateElement);
                return function ngBindLink(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBind);
                    element = element[0];
                    scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
                        element.textContent = value === undefined ? "" : value;
                    });
                };
            }
        };
    } ];
    var ngBindTemplateDirective = [ "$interpolate", "$compile", function($interpolate, $compile) {
        return {
            compile: function ngBindTemplateCompile(templateElement) {
                $compile.$$addBindingClass(templateElement);
                return function ngBindTemplateLink(scope, element, attr) {
                    var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                    $compile.$$addBindingInfo(element, interpolateFn.expressions);
                    element = element[0];
                    attr.$observe("ngBindTemplate", function(value) {
                        element.textContent = value === undefined ? "" : value;
                    });
                };
            }
        };
    } ];
    var ngBindHtmlDirective = [ "$sce", "$parse", "$compile", function($sce, $parse, $compile) {
        return {
            restrict: "A",
            compile: function ngBindHtmlCompile(tElement, tAttrs) {
                var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml);
                var ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function getStringValue(value) {
                    return (value || "").toString();
                });
                $compile.$$addBindingClass(tElement);
                return function ngBindHtmlLink(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBindHtml);
                    scope.$watch(ngBindHtmlWatch, function ngBindHtmlWatchAction() {
                        element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope)) || "");
                    });
                };
            }
        };
    } ];
    var ngChangeDirective = valueFn({
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attr, ctrl) {
            ctrl.$viewChangeListeners.push(function() {
                scope.$eval(attr.ngChange);
            });
        }
    });
    function classDirective(name, selector) {
        name = "ngClass" + name;
        return [ "$animate", function($animate) {
            return {
                restrict: "AC",
                link: function(scope, element, attr) {
                    var oldVal;
                    scope.$watch(attr[name], ngClassWatchAction, true);
                    attr.$observe("class", function(value) {
                        ngClassWatchAction(scope.$eval(attr[name]));
                    });
                    if (name !== "ngClass") {
                        scope.$watch("$index", function($index, old$index) {
                            var mod = $index & 1;
                            if (mod !== (old$index & 1)) {
                                var classes = arrayClasses(scope.$eval(attr[name]));
                                mod === selector ? addClasses(classes) : removeClasses(classes);
                            }
                        });
                    }
                    function addClasses(classes) {
                        var newClasses = digestClassCounts(classes, 1);
                        attr.$addClass(newClasses);
                    }
                    function removeClasses(classes) {
                        var newClasses = digestClassCounts(classes, -1);
                        attr.$removeClass(newClasses);
                    }
                    function digestClassCounts(classes, count) {
                        var classCounts = element.data("$classCounts") || createMap();
                        var classesToUpdate = [];
                        forEach(classes, function(className) {
                            if (count > 0 || classCounts[className]) {
                                classCounts[className] = (classCounts[className] || 0) + count;
                                if (classCounts[className] === +(count > 0)) {
                                    classesToUpdate.push(className);
                                }
                            }
                        });
                        element.data("$classCounts", classCounts);
                        return classesToUpdate.join(" ");
                    }
                    function updateClasses(oldClasses, newClasses) {
                        var toAdd = arrayDifference(newClasses, oldClasses);
                        var toRemove = arrayDifference(oldClasses, newClasses);
                        toAdd = digestClassCounts(toAdd, 1);
                        toRemove = digestClassCounts(toRemove, -1);
                        if (toAdd && toAdd.length) {
                            $animate.addClass(element, toAdd);
                        }
                        if (toRemove && toRemove.length) {
                            $animate.removeClass(element, toRemove);
                        }
                    }
                    function ngClassWatchAction(newVal) {
                        if (selector === true || scope.$index % 2 === selector) {
                            var newClasses = arrayClasses(newVal || []);
                            if (!oldVal) {
                                addClasses(newClasses);
                            } else if (!equals(newVal, oldVal)) {
                                var oldClasses = arrayClasses(oldVal);
                                updateClasses(oldClasses, newClasses);
                            }
                        }
                        oldVal = shallowCopy(newVal);
                    }
                }
            };
            function arrayDifference(tokens1, tokens2) {
                var values = [];
                outer: for (var i = 0; i < tokens1.length; i++) {
                    var token = tokens1[i];
                    for (var j = 0; j < tokens2.length; j++) {
                        if (token == tokens2[j]) continue outer;
                    }
                    values.push(token);
                }
                return values;
            }
            function arrayClasses(classVal) {
                var classes = [];
                if (isArray(classVal)) {
                    forEach(classVal, function(v) {
                        classes = classes.concat(arrayClasses(v));
                    });
                    return classes;
                } else if (isString(classVal)) {
                    return classVal.split(" ");
                } else if (isObject(classVal)) {
                    forEach(classVal, function(v, k) {
                        if (v) {
                            classes = classes.concat(k.split(" "));
                        }
                    });
                    return classes;
                }
                return classVal;
            }
        } ];
    }
    var ngClassDirective = classDirective("", true);
    var ngClassOddDirective = classDirective("Odd", 0);
    var ngClassEvenDirective = classDirective("Even", 1);
    var ngCloakDirective = ngDirective({
        compile: function(element, attr) {
            attr.$set("ngCloak", undefined);
            element.removeClass("ng-cloak");
        }
    });
    var ngControllerDirective = [ function() {
        return {
            restrict: "A",
            scope: true,
            controller: "@",
            priority: 500
        };
    } ];
    var ngEventDirectives = {};
    var forceAsyncEvents = {
        blur: true,
        focus: true
    };
    forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(eventName) {
        var directiveName = directiveNormalize("ng-" + eventName);
        ngEventDirectives[directiveName] = [ "$parse", "$rootScope", function($parse, $rootScope) {
            return {
                restrict: "A",
                compile: function($element, attr) {
                    var fn = $parse(attr[directiveName], null, true);
                    return function ngEventHandler(scope, element) {
                        element.on(eventName, function(event) {
                            var callback = function() {
                                fn(scope, {
                                    $event: event
                                });
                            };
                            if (forceAsyncEvents[eventName] && $rootScope.$$phase) {
                                scope.$evalAsync(callback);
                            } else {
                                scope.$apply(callback);
                            }
                        });
                    };
                }
            };
        } ];
    });
    var ngIfDirective = [ "$animate", function($animate) {
        return {
            multiElement: true,
            transclude: "element",
            priority: 600,
            terminal: true,
            restrict: "A",
            $$tlb: true,
            link: function($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements;
                $scope.$watch($attr.ngIf, function ngIfWatchAction(value) {
                    if (value) {
                        if (!childScope) {
                            $transclude(function(clone, newScope) {
                                childScope = newScope;
                                clone[clone.length++] = document.createComment(" end ngIf: " + $attr.ngIf + " ");
                                block = {
                                    clone: clone
                                };
                                $animate.enter(clone, $element.parent(), $element);
                            });
                        }
                    } else {
                        if (previousElements) {
                            previousElements.remove();
                            previousElements = null;
                        }
                        if (childScope) {
                            childScope.$destroy();
                            childScope = null;
                        }
                        if (block) {
                            previousElements = getBlockNodes(block.clone);
                            $animate.leave(previousElements).then(function() {
                                previousElements = null;
                            });
                            block = null;
                        }
                    }
                });
            }
        };
    } ];
    var ngIncludeDirective = [ "$templateRequest", "$anchorScroll", "$animate", "$sce", function($templateRequest, $anchorScroll, $animate, $sce) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: true,
            transclude: "element",
            controller: angular.noop,
            compile: function(element, attr) {
                var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || "", autoScrollExp = attr.autoscroll;
                return function(scope, $element, $attr, ctrl, $transclude) {
                    var changeCounter = 0, currentScope, previousElement, currentElement;
                    var cleanupLastIncludeContent = function() {
                        if (previousElement) {
                            previousElement.remove();
                            previousElement = null;
                        }
                        if (currentScope) {
                            currentScope.$destroy();
                            currentScope = null;
                        }
                        if (currentElement) {
                            $animate.leave(currentElement).then(function() {
                                previousElement = null;
                            });
                            previousElement = currentElement;
                            currentElement = null;
                        }
                    };
                    scope.$watch($sce.parseAsResourceUrl(srcExp), function ngIncludeWatchAction(src) {
                        var afterAnimation = function() {
                            if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                $anchorScroll();
                            }
                        };
                        var thisChangeId = ++changeCounter;
                        if (src) {
                            $templateRequest(src, true).then(function(response) {
                                if (thisChangeId !== changeCounter) return;
                                var newScope = scope.$new();
                                ctrl.template = response;
                                var clone = $transclude(newScope, function(clone) {
                                    cleanupLastIncludeContent();
                                    $animate.enter(clone, null, $element).then(afterAnimation);
                                });
                                currentScope = newScope;
                                currentElement = clone;
                                currentScope.$emit("$includeContentLoaded", src);
                                scope.$eval(onloadExp);
                            }, function() {
                                if (thisChangeId === changeCounter) {
                                    cleanupLastIncludeContent();
                                    scope.$emit("$includeContentError", src);
                                }
                            });
                            scope.$emit("$includeContentRequested", src);
                        } else {
                            cleanupLastIncludeContent();
                            ctrl.template = null;
                        }
                    });
                };
            }
        };
    } ];
    var ngIncludeFillContentDirective = [ "$compile", function($compile) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(scope, $element, $attr, ctrl) {
                if (/SVG/.test($element[0].toString())) {
                    $element.empty();
                    $compile(jqLiteBuildFragment(ctrl.template, document).childNodes)(scope, function namespaceAdaptedClone(clone) {
                        $element.append(clone);
                    }, {
                        futureParentElement: $element
                    });
                    return;
                }
                $element.html(ctrl.template);
                $compile($element.contents())(scope);
            }
        };
    } ];
    var ngInitDirective = ngDirective({
        priority: 450,
        compile: function() {
            return {
                pre: function(scope, element, attrs) {
                    scope.$eval(attrs.ngInit);
                }
            };
        }
    });
    var ngListDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(scope, element, attr, ctrl) {
                var ngList = element.attr(attr.$attr.ngList) || ", ";
                var trimValues = attr.ngTrim !== "false";
                var separator = trimValues ? trim(ngList) : ngList;
                var parse = function(viewValue) {
                    if (isUndefined(viewValue)) return;
                    var list = [];
                    if (viewValue) {
                        forEach(viewValue.split(separator), function(value) {
                            if (value) list.push(trimValues ? trim(value) : value);
                        });
                    }
                    return list;
                };
                ctrl.$parsers.push(parse);
                ctrl.$formatters.push(function(value) {
                    if (isArray(value)) {
                        return value.join(ngList);
                    }
                    return undefined;
                });
                ctrl.$isEmpty = function(value) {
                    return !value || !value.length;
                };
            }
        };
    };
    var VALID_CLASS = "ng-valid", INVALID_CLASS = "ng-invalid", PRISTINE_CLASS = "ng-pristine", DIRTY_CLASS = "ng-dirty", UNTOUCHED_CLASS = "ng-untouched", TOUCHED_CLASS = "ng-touched", PENDING_CLASS = "ng-pending";
    var $ngModelMinErr = new minErr("ngModel");
    var NgModelController = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $rootScope, $q, $interpolate) {
        this.$viewValue = Number.NaN;
        this.$modelValue = Number.NaN;
        this.$$rawModelValue = undefined;
        this.$validators = {};
        this.$asyncValidators = {};
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$untouched = true;
        this.$touched = false;
        this.$pristine = true;
        this.$dirty = false;
        this.$valid = true;
        this.$invalid = false;
        this.$error = {};
        this.$$success = {};
        this.$pending = undefined;
        this.$name = $interpolate($attr.name || "", false)($scope);
        var parsedNgModel = $parse($attr.ngModel), parsedNgModelAssign = parsedNgModel.assign, ngModelGet = parsedNgModel, ngModelSet = parsedNgModelAssign, pendingDebounce = null, parserValid, ctrl = this;
        this.$$setOptions = function(options) {
            ctrl.$options = options;
            if (options && options.getterSetter) {
                var invokeModelGetter = $parse($attr.ngModel + "()"), invokeModelSetter = $parse($attr.ngModel + "($$$p)");
                ngModelGet = function($scope) {
                    var modelValue = parsedNgModel($scope);
                    if (isFunction(modelValue)) {
                        modelValue = invokeModelGetter($scope);
                    }
                    return modelValue;
                };
                ngModelSet = function($scope, newValue) {
                    if (isFunction(parsedNgModel($scope))) {
                        invokeModelSetter($scope, {
                            $$$p: ctrl.$modelValue
                        });
                    } else {
                        parsedNgModelAssign($scope, ctrl.$modelValue);
                    }
                };
            } else if (!parsedNgModel.assign) {
                throw $ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element));
            }
        };
        this.$render = noop;
        this.$isEmpty = function(value) {
            return isUndefined(value) || value === "" || value === null || value !== value;
        };
        var parentForm = $element.inheritedData("$formController") || nullFormCtrl, currentValidationRunId = 0;
        addSetValidityMethod({
            ctrl: this,
            $element: $element,
            set: function(object, property) {
                object[property] = true;
            },
            unset: function(object, property) {
                delete object[property];
            },
            parentForm: parentForm,
            $animate: $animate
        });
        this.$setPristine = function() {
            ctrl.$dirty = false;
            ctrl.$pristine = true;
            $animate.removeClass($element, DIRTY_CLASS);
            $animate.addClass($element, PRISTINE_CLASS);
        };
        this.$setDirty = function() {
            ctrl.$dirty = true;
            ctrl.$pristine = false;
            $animate.removeClass($element, PRISTINE_CLASS);
            $animate.addClass($element, DIRTY_CLASS);
            parentForm.$setDirty();
        };
        this.$setUntouched = function() {
            ctrl.$touched = false;
            ctrl.$untouched = true;
            $animate.setClass($element, UNTOUCHED_CLASS, TOUCHED_CLASS);
        };
        this.$setTouched = function() {
            ctrl.$touched = true;
            ctrl.$untouched = false;
            $animate.setClass($element, TOUCHED_CLASS, UNTOUCHED_CLASS);
        };
        this.$rollbackViewValue = function() {
            $timeout.cancel(pendingDebounce);
            ctrl.$viewValue = ctrl.$$lastCommittedViewValue;
            ctrl.$render();
        };
        this.$validate = function() {
            if (isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue)) {
                return;
            }
            var viewValue = ctrl.$$lastCommittedViewValue;
            var modelValue = ctrl.$$rawModelValue;
            var prevValid = ctrl.$valid;
            var prevModelValue = ctrl.$modelValue;
            var allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
            ctrl.$$runValidators(modelValue, viewValue, function(allValid) {
                if (!allowInvalid && prevValid !== allValid) {
                    ctrl.$modelValue = allValid ? modelValue : undefined;
                    if (ctrl.$modelValue !== prevModelValue) {
                        ctrl.$$writeModelToScope();
                    }
                }
            });
        };
        this.$$runValidators = function(modelValue, viewValue, doneCallback) {
            currentValidationRunId++;
            var localValidationRunId = currentValidationRunId;
            if (!processParseErrors()) {
                validationDone(false);
                return;
            }
            if (!processSyncValidators()) {
                validationDone(false);
                return;
            }
            processAsyncValidators();
            function processParseErrors() {
                var errorKey = ctrl.$$parserName || "parse";
                if (parserValid === undefined) {
                    setValidity(errorKey, null);
                } else {
                    if (!parserValid) {
                        forEach(ctrl.$validators, function(v, name) {
                            setValidity(name, null);
                        });
                        forEach(ctrl.$asyncValidators, function(v, name) {
                            setValidity(name, null);
                        });
                    }
                    setValidity(errorKey, parserValid);
                    return parserValid;
                }
                return true;
            }
            function processSyncValidators() {
                var syncValidatorsValid = true;
                forEach(ctrl.$validators, function(validator, name) {
                    var result = validator(modelValue, viewValue);
                    syncValidatorsValid = syncValidatorsValid && result;
                    setValidity(name, result);
                });
                if (!syncValidatorsValid) {
                    forEach(ctrl.$asyncValidators, function(v, name) {
                        setValidity(name, null);
                    });
                    return false;
                }
                return true;
            }
            function processAsyncValidators() {
                var validatorPromises = [];
                var allValid = true;
                forEach(ctrl.$asyncValidators, function(validator, name) {
                    var promise = validator(modelValue, viewValue);
                    if (!isPromiseLike(promise)) {
                        throw $ngModelMinErr("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                    }
                    setValidity(name, undefined);
                    validatorPromises.push(promise.then(function() {
                        setValidity(name, true);
                    }, function(error) {
                        allValid = false;
                        setValidity(name, false);
                    }));
                });
                if (!validatorPromises.length) {
                    validationDone(true);
                } else {
                    $q.all(validatorPromises).then(function() {
                        validationDone(allValid);
                    }, noop);
                }
            }
            function setValidity(name, isValid) {
                if (localValidationRunId === currentValidationRunId) {
                    ctrl.$setValidity(name, isValid);
                }
            }
            function validationDone(allValid) {
                if (localValidationRunId === currentValidationRunId) {
                    doneCallback(allValid);
                }
            }
        };
        this.$commitViewValue = function() {
            var viewValue = ctrl.$viewValue;
            $timeout.cancel(pendingDebounce);
            if (ctrl.$$lastCommittedViewValue === viewValue && (viewValue !== "" || !ctrl.$$hasNativeValidators)) {
                return;
            }
            ctrl.$$lastCommittedViewValue = viewValue;
            if (ctrl.$pristine) {
                this.$setDirty();
            }
            this.$$parseAndValidate();
        };
        this.$$parseAndValidate = function() {
            var viewValue = ctrl.$$lastCommittedViewValue;
            var modelValue = viewValue;
            parserValid = isUndefined(modelValue) ? undefined : true;
            if (parserValid) {
                for (var i = 0; i < ctrl.$parsers.length; i++) {
                    modelValue = ctrl.$parsers[i](modelValue);
                    if (isUndefined(modelValue)) {
                        parserValid = false;
                        break;
                    }
                }
            }
            if (isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue)) {
                ctrl.$modelValue = ngModelGet($scope);
            }
            var prevModelValue = ctrl.$modelValue;
            var allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
            ctrl.$$rawModelValue = modelValue;
            if (allowInvalid) {
                ctrl.$modelValue = modelValue;
                writeToModelIfNeeded();
            }
            ctrl.$$runValidators(modelValue, ctrl.$$lastCommittedViewValue, function(allValid) {
                if (!allowInvalid) {
                    ctrl.$modelValue = allValid ? modelValue : undefined;
                    writeToModelIfNeeded();
                }
            });
            function writeToModelIfNeeded() {
                if (ctrl.$modelValue !== prevModelValue) {
                    ctrl.$$writeModelToScope();
                }
            }
        };
        this.$$writeModelToScope = function() {
            ngModelSet($scope, ctrl.$modelValue);
            forEach(ctrl.$viewChangeListeners, function(listener) {
                try {
                    listener();
                } catch (e) {
                    $exceptionHandler(e);
                }
            });
        };
        this.$setViewValue = function(value, trigger) {
            ctrl.$viewValue = value;
            if (!ctrl.$options || ctrl.$options.updateOnDefault) {
                ctrl.$$debounceViewValueCommit(trigger);
            }
        };
        this.$$debounceViewValueCommit = function(trigger) {
            var debounceDelay = 0, options = ctrl.$options, debounce;
            if (options && isDefined(options.debounce)) {
                debounce = options.debounce;
                if (isNumber(debounce)) {
                    debounceDelay = debounce;
                } else if (isNumber(debounce[trigger])) {
                    debounceDelay = debounce[trigger];
                } else if (isNumber(debounce["default"])) {
                    debounceDelay = debounce["default"];
                }
            }
            $timeout.cancel(pendingDebounce);
            if (debounceDelay) {
                pendingDebounce = $timeout(function() {
                    ctrl.$commitViewValue();
                }, debounceDelay);
            } else if ($rootScope.$$phase) {
                ctrl.$commitViewValue();
            } else {
                $scope.$apply(function() {
                    ctrl.$commitViewValue();
                });
            }
        };
        $scope.$watch(function ngModelWatch() {
            var modelValue = ngModelGet($scope);
            if (modelValue !== ctrl.$modelValue && (ctrl.$modelValue === ctrl.$modelValue || modelValue === modelValue)) {
                ctrl.$modelValue = ctrl.$$rawModelValue = modelValue;
                parserValid = undefined;
                var formatters = ctrl.$formatters, idx = formatters.length;
                var viewValue = modelValue;
                while (idx--) {
                    viewValue = formatters[idx](viewValue);
                }
                if (ctrl.$viewValue !== viewValue) {
                    ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue;
                    ctrl.$render();
                    ctrl.$$runValidators(modelValue, viewValue, noop);
                }
            }
            return modelValue;
        });
    } ];
    var ngModelDirective = [ "$rootScope", function($rootScope) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: NgModelController,
            priority: 1,
            compile: function ngModelCompile(element) {
                element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS);
                return {
                    pre: function ngModelPreLink(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
                        modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options);
                        formCtrl.$addControl(modelCtrl);
                        attr.$observe("name", function(newValue) {
                            if (modelCtrl.$name !== newValue) {
                                formCtrl.$$renameControl(modelCtrl, newValue);
                            }
                        });
                        scope.$on("$destroy", function() {
                            formCtrl.$removeControl(modelCtrl);
                        });
                    },
                    post: function ngModelPostLink(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0];
                        if (modelCtrl.$options && modelCtrl.$options.updateOn) {
                            element.on(modelCtrl.$options.updateOn, function(ev) {
                                modelCtrl.$$debounceViewValueCommit(ev && ev.type);
                            });
                        }
                        element.on("blur", function(ev) {
                            if (modelCtrl.$touched) return;
                            if ($rootScope.$$phase) {
                                scope.$evalAsync(modelCtrl.$setTouched);
                            } else {
                                scope.$apply(modelCtrl.$setTouched);
                            }
                        });
                    }
                };
            }
        };
    } ];
    var DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/;
    var ngModelOptionsDirective = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                var that = this;
                this.$options = copy($scope.$eval($attrs.ngModelOptions));
                if (this.$options.updateOn !== undefined) {
                    this.$options.updateOnDefault = false;
                    this.$options.updateOn = trim(this.$options.updateOn.replace(DEFAULT_REGEXP, function() {
                        that.$options.updateOnDefault = true;
                        return " ";
                    }));
                } else {
                    this.$options.updateOnDefault = true;
                }
            } ]
        };
    };
    function addSetValidityMethod(context) {
        var ctrl = context.ctrl, $element = context.$element, classCache = {}, set = context.set, unset = context.unset, parentForm = context.parentForm, $animate = context.$animate;
        classCache[INVALID_CLASS] = !(classCache[VALID_CLASS] = $element.hasClass(VALID_CLASS));
        ctrl.$setValidity = setValidity;
        function setValidity(validationErrorKey, state, controller) {
            if (state === undefined) {
                createAndSet("$pending", validationErrorKey, controller);
            } else {
                unsetAndCleanup("$pending", validationErrorKey, controller);
            }
            if (!isBoolean(state)) {
                unset(ctrl.$error, validationErrorKey, controller);
                unset(ctrl.$$success, validationErrorKey, controller);
            } else {
                if (state) {
                    unset(ctrl.$error, validationErrorKey, controller);
                    set(ctrl.$$success, validationErrorKey, controller);
                } else {
                    set(ctrl.$error, validationErrorKey, controller);
                    unset(ctrl.$$success, validationErrorKey, controller);
                }
            }
            if (ctrl.$pending) {
                cachedToggleClass(PENDING_CLASS, true);
                ctrl.$valid = ctrl.$invalid = undefined;
                toggleValidationCss("", null);
            } else {
                cachedToggleClass(PENDING_CLASS, false);
                ctrl.$valid = isObjectEmpty(ctrl.$error);
                ctrl.$invalid = !ctrl.$valid;
                toggleValidationCss("", ctrl.$valid);
            }
            var combinedState;
            if (ctrl.$pending && ctrl.$pending[validationErrorKey]) {
                combinedState = undefined;
            } else if (ctrl.$error[validationErrorKey]) {
                combinedState = false;
            } else if (ctrl.$$success[validationErrorKey]) {
                combinedState = true;
            } else {
                combinedState = null;
            }
            toggleValidationCss(validationErrorKey, combinedState);
            parentForm.$setValidity(validationErrorKey, combinedState, ctrl);
        }
        function createAndSet(name, value, controller) {
            if (!ctrl[name]) {
                ctrl[name] = {};
            }
            set(ctrl[name], value, controller);
        }
        function unsetAndCleanup(name, value, controller) {
            if (ctrl[name]) {
                unset(ctrl[name], value, controller);
            }
            if (isObjectEmpty(ctrl[name])) {
                ctrl[name] = undefined;
            }
        }
        function cachedToggleClass(className, switchValue) {
            if (switchValue && !classCache[className]) {
                $animate.addClass($element, className);
                classCache[className] = true;
            } else if (!switchValue && classCache[className]) {
                $animate.removeClass($element, className);
                classCache[className] = false;
            }
        }
        function toggleValidationCss(validationErrorKey, isValid) {
            validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "";
            cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === true);
            cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === false);
        }
    }
    function isObjectEmpty(obj) {
        if (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
        }
        return true;
    }
    var ngNonBindableDirective = ngDirective({
        terminal: true,
        priority: 1e3
    });
    var ngOptionsMinErr = minErr("ngOptions");
    var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
    var ngOptionsDirective = [ "$compile", "$parse", function($compile, $parse) {
        function parseOptionsExpression(optionsExp, selectElement, scope) {
            var match = optionsExp.match(NG_OPTIONS_REGEXP);
            if (!match) {
                throw ngOptionsMinErr("iexp", "Expected expression in form of " + "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" + " but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
            }
            var valueName = match[5] || match[7];
            var keyName = match[6];
            var selectAs = / as /.test(match[0]) && match[1];
            var trackBy = match[9];
            var valueFn = $parse(match[2] ? match[1] : valueName);
            var selectAsFn = selectAs && $parse(selectAs);
            var viewValueFn = selectAsFn || valueFn;
            var trackByFn = trackBy && $parse(trackBy);
            var getTrackByValueFn = trackBy ? function(value, locals) {
                return trackByFn(scope, locals);
            } : function getHashOfValue(value) {
                return hashKey(value);
            };
            var getTrackByValue = function(value, key) {
                return getTrackByValueFn(value, getLocals(value, key));
            };
            var displayFn = $parse(match[2] || match[1]);
            var groupByFn = $parse(match[3] || "");
            var disableWhenFn = $parse(match[4] || "");
            var valuesFn = $parse(match[8]);
            var locals = {};
            var getLocals = keyName ? function(value, key) {
                locals[keyName] = key;
                locals[valueName] = value;
                return locals;
            } : function(value) {
                locals[valueName] = value;
                return locals;
            };
            function Option(selectValue, viewValue, label, group, disabled) {
                this.selectValue = selectValue;
                this.viewValue = viewValue;
                this.label = label;
                this.group = group;
                this.disabled = disabled;
            }
            return {
                trackBy: trackBy,
                getTrackByValue: getTrackByValue,
                getWatchables: $parse(valuesFn, function(values) {
                    var watchedArray = [];
                    values = values || [];
                    Object.keys(values).forEach(function getWatchable(key) {
                        if (key.charAt(0) === "$") return;
                        var locals = getLocals(values[key], key);
                        var selectValue = getTrackByValueFn(values[key], locals);
                        watchedArray.push(selectValue);
                        if (match[2] || match[1]) {
                            var label = displayFn(scope, locals);
                            watchedArray.push(label);
                        }
                        if (match[4]) {
                            var disableWhen = disableWhenFn(scope, locals);
                            watchedArray.push(disableWhen);
                        }
                    });
                    return watchedArray;
                }),
                getOptions: function() {
                    var optionItems = [];
                    var selectValueMap = {};
                    var optionValues = valuesFn(scope) || [];
                    var optionValuesKeys;
                    if (!keyName && isArrayLike(optionValues)) {
                        optionValuesKeys = optionValues;
                    } else {
                        optionValuesKeys = [];
                        for (var itemKey in optionValues) {
                            if (optionValues.hasOwnProperty(itemKey) && itemKey.charAt(0) !== "$") {
                                optionValuesKeys.push(itemKey);
                            }
                        }
                    }
                    var optionValuesLength = optionValuesKeys.length;
                    for (var index = 0; index < optionValuesLength; index++) {
                        var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index];
                        var value = optionValues[key];
                        var locals = getLocals(value, key);
                        var viewValue = viewValueFn(scope, locals);
                        var selectValue = getTrackByValueFn(viewValue, locals);
                        var label = displayFn(scope, locals);
                        var group = groupByFn(scope, locals);
                        var disabled = disableWhenFn(scope, locals);
                        var optionItem = new Option(selectValue, viewValue, label, group, disabled);
                        optionItems.push(optionItem);
                        selectValueMap[selectValue] = optionItem;
                    }
                    return {
                        items: optionItems,
                        selectValueMap: selectValueMap,
                        getOptionFromViewValue: function(value) {
                            return selectValueMap[getTrackByValue(value)];
                        },
                        getViewValueFromOption: function(option) {
                            return trackBy ? angular.copy(option.viewValue) : option.viewValue;
                        }
                    };
                }
            };
        }
        var optionTemplate = document.createElement("option"), optGroupTemplate = document.createElement("optgroup");
        return {
            restrict: "A",
            terminal: true,
            require: [ "select", "?ngModel" ],
            link: function(scope, selectElement, attr, ctrls) {
                var ngModelCtrl = ctrls[1];
                if (!ngModelCtrl) return;
                var selectCtrl = ctrls[0];
                var multiple = attr.multiple;
                var emptyOption;
                for (var i = 0, children = selectElement.children(), ii = children.length; i < ii; i++) {
                    if (children[i].value === "") {
                        emptyOption = children.eq(i);
                        break;
                    }
                }
                var providedEmptyOption = !!emptyOption;
                var unknownOption = jqLite(optionTemplate.cloneNode(false));
                unknownOption.val("?");
                var options;
                var ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope);
                var renderEmptyOption = function() {
                    if (!providedEmptyOption) {
                        selectElement.prepend(emptyOption);
                    }
                    selectElement.val("");
                    emptyOption.prop("selected", true);
                    emptyOption.attr("selected", true);
                };
                var removeEmptyOption = function() {
                    if (!providedEmptyOption) {
                        emptyOption.remove();
                    }
                };
                var renderUnknownOption = function() {
                    selectElement.prepend(unknownOption);
                    selectElement.val("?");
                    unknownOption.prop("selected", true);
                    unknownOption.attr("selected", true);
                };
                var removeUnknownOption = function() {
                    unknownOption.remove();
                };
                if (!multiple) {
                    selectCtrl.writeValue = function writeNgOptionsValue(value) {
                        var option = options.getOptionFromViewValue(value);
                        if (option && !option.disabled) {
                            if (selectElement[0].value !== option.selectValue) {
                                removeUnknownOption();
                                removeEmptyOption();
                                selectElement[0].value = option.selectValue;
                                option.element.selected = true;
                                option.element.setAttribute("selected", "selected");
                            }
                        } else {
                            if (value === null || providedEmptyOption) {
                                removeUnknownOption();
                                renderEmptyOption();
                            } else {
                                removeEmptyOption();
                                renderUnknownOption();
                            }
                        }
                    };
                    selectCtrl.readValue = function readNgOptionsValue() {
                        var selectedOption = options.selectValueMap[selectElement.val()];
                        if (selectedOption && !selectedOption.disabled) {
                            removeEmptyOption();
                            removeUnknownOption();
                            return options.getViewValueFromOption(selectedOption);
                        }
                        return null;
                    };
                    if (ngOptions.trackBy) {
                        scope.$watch(function() {
                            return ngOptions.getTrackByValue(ngModelCtrl.$viewValue);
                        }, function() {
                            ngModelCtrl.$render();
                        });
                    }
                } else {
                    ngModelCtrl.$isEmpty = function(value) {
                        return !value || value.length === 0;
                    };
                    selectCtrl.writeValue = function writeNgOptionsMultiple(value) {
                        options.items.forEach(function(option) {
                            option.element.selected = false;
                        });
                        if (value) {
                            value.forEach(function(item) {
                                var option = options.getOptionFromViewValue(item);
                                if (option && !option.disabled) option.element.selected = true;
                            });
                        }
                    };
                    selectCtrl.readValue = function readNgOptionsMultiple() {
                        var selectedValues = selectElement.val() || [], selections = [];
                        forEach(selectedValues, function(value) {
                            var option = options.selectValueMap[value];
                            if (!option.disabled) selections.push(options.getViewValueFromOption(option));
                        });
                        return selections;
                    };
                    if (ngOptions.trackBy) {
                        scope.$watchCollection(function() {
                            if (isArray(ngModelCtrl.$viewValue)) {
                                return ngModelCtrl.$viewValue.map(function(value) {
                                    return ngOptions.getTrackByValue(value);
                                });
                            }
                        }, function() {
                            ngModelCtrl.$render();
                        });
                    }
                }
                if (providedEmptyOption) {
                    emptyOption.remove();
                    $compile(emptyOption)(scope);
                    emptyOption.removeClass("ng-scope");
                } else {
                    emptyOption = jqLite(optionTemplate.cloneNode(false));
                }
                updateOptions();
                scope.$watchCollection(ngOptions.getWatchables, updateOptions);
                function updateOptionElement(option, element) {
                    option.element = element;
                    element.disabled = option.disabled;
                    if (option.value !== element.value) element.value = option.selectValue;
                    if (option.label !== element.label) {
                        element.label = option.label;
                        element.textContent = option.label;
                    }
                }
                function addOrReuseElement(parent, current, type, templateElement) {
                    var element;
                    if (current && lowercase(current.nodeName) === type) {
                        element = current;
                    } else {
                        element = templateElement.cloneNode(false);
                        if (!current) {
                            parent.appendChild(element);
                        } else {
                            parent.insertBefore(element, current);
                        }
                    }
                    return element;
                }
                function removeExcessElements(current) {
                    var next;
                    while (current) {
                        next = current.nextSibling;
                        jqLiteRemove(current);
                        current = next;
                    }
                }
                function skipEmptyAndUnknownOptions(current) {
                    var emptyOption_ = emptyOption && emptyOption[0];
                    var unknownOption_ = unknownOption && unknownOption[0];
                    if (emptyOption_ || unknownOption_) {
                        while (current && (current === emptyOption_ || current === unknownOption_)) {
                            current = current.nextSibling;
                        }
                    }
                    return current;
                }
                function updateOptions() {
                    var previousValue = options && selectCtrl.readValue();
                    options = ngOptions.getOptions();
                    var groupMap = {};
                    var currentElement = selectElement[0].firstChild;
                    if (providedEmptyOption) {
                        selectElement.prepend(emptyOption);
                    }
                    currentElement = skipEmptyAndUnknownOptions(currentElement);
                    options.items.forEach(function updateOption(option) {
                        var group;
                        var groupElement;
                        var optionElement;
                        if (option.group) {
                            group = groupMap[option.group];
                            if (!group) {
                                groupElement = addOrReuseElement(selectElement[0], currentElement, "optgroup", optGroupTemplate);
                                currentElement = groupElement.nextSibling;
                                groupElement.label = option.group;
                                group = groupMap[option.group] = {
                                    groupElement: groupElement,
                                    currentOptionElement: groupElement.firstChild
                                };
                            }
                            optionElement = addOrReuseElement(group.groupElement, group.currentOptionElement, "option", optionTemplate);
                            updateOptionElement(option, optionElement);
                            group.currentOptionElement = optionElement.nextSibling;
                        } else {
                            optionElement = addOrReuseElement(selectElement[0], currentElement, "option", optionTemplate);
                            updateOptionElement(option, optionElement);
                            currentElement = optionElement.nextSibling;
                        }
                    });
                    Object.keys(groupMap).forEach(function(key) {
                        removeExcessElements(groupMap[key].currentOptionElement);
                    });
                    removeExcessElements(currentElement);
                    ngModelCtrl.$render();
                    if (!ngModelCtrl.$isEmpty(previousValue)) {
                        var nextValue = selectCtrl.readValue();
                        if (ngOptions.trackBy ? !equals(previousValue, nextValue) : previousValue !== nextValue) {
                            ngModelCtrl.$setViewValue(nextValue);
                            ngModelCtrl.$render();
                        }
                    }
                }
            }
        };
    } ];
    var ngPluralizeDirective = [ "$locale", "$interpolate", "$log", function($locale, $interpolate, $log) {
        var BRACE = /{}/g, IS_WHEN = /^when(Minus)?(.+)$/;
        return {
            link: function(scope, element, attr) {
                var numberExp = attr.count, whenExp = attr.$attr.when && element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp) || {}, whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), braceReplacement = startSymbol + numberExp + "-" + offset + endSymbol, watchRemover = angular.noop, lastCount;
                forEach(attr, function(expression, attributeName) {
                    var tmpMatch = IS_WHEN.exec(attributeName);
                    if (tmpMatch) {
                        var whenKey = (tmpMatch[1] ? "-" : "") + lowercase(tmpMatch[2]);
                        whens[whenKey] = element.attr(attr.$attr[attributeName]);
                    }
                });
                forEach(whens, function(expression, key) {
                    whensExpFns[key] = $interpolate(expression.replace(BRACE, braceReplacement));
                });
                scope.$watch(numberExp, function ngPluralizeWatchAction(newVal) {
                    var count = parseFloat(newVal);
                    var countIsNaN = isNaN(count);
                    if (!countIsNaN && !(count in whens)) {
                        count = $locale.pluralCat(count - offset);
                    }
                    if (count !== lastCount && !(countIsNaN && isNumber(lastCount) && isNaN(lastCount))) {
                        watchRemover();
                        var whenExpFn = whensExpFns[count];
                        if (isUndefined(whenExpFn)) {
                            if (newVal != null) {
                                $log.debug("ngPluralize: no rule defined for '" + count + "' in " + whenExp);
                            }
                            watchRemover = noop;
                            updateElementText();
                        } else {
                            watchRemover = scope.$watch(whenExpFn, updateElementText);
                        }
                        lastCount = count;
                    }
                });
                function updateElementText(newText) {
                    element.text(newText || "");
                }
            }
        };
    } ];
    var ngRepeatDirective = [ "$parse", "$animate", function($parse, $animate) {
        var NG_REMOVED = "$$NG_REMOVED";
        var ngRepeatMinErr = minErr("ngRepeat");
        var updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
            scope[valueIdentifier] = value;
            if (keyIdentifier) scope[keyIdentifier] = key;
            scope.$index = index;
            scope.$first = index === 0;
            scope.$last = index === arrayLength - 1;
            scope.$middle = !(scope.$first || scope.$last);
            scope.$odd = !(scope.$even = (index & 1) === 0);
        };
        var getBlockStart = function(block) {
            return block.clone[0];
        };
        var getBlockEnd = function(block) {
            return block.clone[block.clone.length - 1];
        };
        return {
            restrict: "A",
            multiElement: true,
            transclude: "element",
            priority: 1e3,
            terminal: true,
            $$tlb: true,
            compile: function ngRepeatCompile($element, $attr) {
                var expression = $attr.ngRepeat;
                var ngRepeatEndComment = document.createComment(" end ngRepeat: " + expression + " ");
                var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!match) {
                    throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                }
                var lhs = match[1];
                var rhs = match[2];
                var aliasAs = match[3];
                var trackByExp = match[4];
                match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
                if (!match) {
                    throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                }
                var valueIdentifier = match[3] || match[1];
                var keyIdentifier = match[2];
                if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) {
                    throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                }
                var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn;
                var hashFnLocals = {
                    $id: hashKey
                };
                if (trackByExp) {
                    trackByExpGetter = $parse(trackByExp);
                } else {
                    trackByIdArrayFn = function(key, value) {
                        return hashKey(value);
                    };
                    trackByIdObjFn = function(key) {
                        return key;
                    };
                }
                return function ngRepeatLink($scope, $element, $attr, ctrl, $transclude) {
                    if (trackByExpGetter) {
                        trackByIdExpFn = function(key, value, index) {
                            if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
                            hashFnLocals[valueIdentifier] = value;
                            hashFnLocals.$index = index;
                            return trackByExpGetter($scope, hashFnLocals);
                        };
                    }
                    var lastBlockMap = createMap();
                    $scope.$watchCollection(rhs, function ngRepeatAction(collection) {
                        var index, length, previousNode = $element[0], nextNode, nextBlockMap = createMap(), collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove;
                        if (aliasAs) {
                            $scope[aliasAs] = collection;
                        }
                        if (isArrayLike(collection)) {
                            collectionKeys = collection;
                            trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                        } else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn;
                            collectionKeys = [];
                            for (var itemKey in collection) {
                                if (collection.hasOwnProperty(itemKey) && itemKey.charAt(0) !== "$") {
                                    collectionKeys.push(itemKey);
                                }
                            }
                        }
                        collectionLength = collectionKeys.length;
                        nextBlockOrder = new Array(collectionLength);
                        for (index = 0; index < collectionLength; index++) {
                            key = collection === collectionKeys ? index : collectionKeys[index];
                            value = collection[key];
                            trackById = trackByIdFn(key, value, index);
                            if (lastBlockMap[trackById]) {
                                block = lastBlockMap[trackById];
                                delete lastBlockMap[trackById];
                                nextBlockMap[trackById] = block;
                                nextBlockOrder[index] = block;
                            } else if (nextBlockMap[trackById]) {
                                forEach(nextBlockOrder, function(block) {
                                    if (block && block.scope) lastBlockMap[block.id] = block;
                                });
                                throw ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, value);
                            } else {
                                nextBlockOrder[index] = {
                                    id: trackById,
                                    scope: undefined,
                                    clone: undefined
                                };
                                nextBlockMap[trackById] = true;
                            }
                        }
                        for (var blockKey in lastBlockMap) {
                            block = lastBlockMap[blockKey];
                            elementsToRemove = getBlockNodes(block.clone);
                            $animate.leave(elementsToRemove);
                            if (elementsToRemove[0].parentNode) {
                                for (index = 0, length = elementsToRemove.length; index < length; index++) {
                                    elementsToRemove[index][NG_REMOVED] = true;
                                }
                            }
                            block.scope.$destroy();
                        }
                        for (index = 0; index < collectionLength; index++) {
                            key = collection === collectionKeys ? index : collectionKeys[index];
                            value = collection[key];
                            block = nextBlockOrder[index];
                            if (block.scope) {
                                nextNode = previousNode;
                                do {
                                    nextNode = nextNode.nextSibling;
                                } while (nextNode && nextNode[NG_REMOVED]);
                                if (getBlockStart(block) != nextNode) {
                                    $animate.move(getBlockNodes(block.clone), null, jqLite(previousNode));
                                }
                                previousNode = getBlockEnd(block);
                                updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                            } else {
                                $transclude(function ngRepeatTransclude(clone, scope) {
                                    block.scope = scope;
                                    var endNode = ngRepeatEndComment.cloneNode(false);
                                    clone[clone.length++] = endNode;
                                    $animate.enter(clone, null, jqLite(previousNode));
                                    previousNode = endNode;
                                    block.clone = clone;
                                    nextBlockMap[block.id] = block;
                                    updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                                });
                            }
                        }
                        lastBlockMap = nextBlockMap;
                    });
                };
            }
        };
    } ];
    var NG_HIDE_CLASS = "ng-hide";
    var NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate";
    var ngShowDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: true,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
                    $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ];
    var ngHideDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: true,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
                    $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ];
    var ngStyleDirective = ngDirective(function(scope, element, attr) {
        scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
            if (oldStyles && newStyles !== oldStyles) {
                forEach(oldStyles, function(val, style) {
                    element.css(style, "");
                });
            }
            if (newStyles) element.css(newStyles);
        }, true);
    });
    var ngSwitchDirective = [ "$animate", function($animate) {
        return {
            require: "ngSwitch",
            controller: [ "$scope", function ngSwitchController() {
                this.cases = {};
            } ],
            link: function(scope, element, attr, ngSwitchController) {
                var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes = [], selectedElements = [], previousLeaveAnimations = [], selectedScopes = [];
                var spliceFactory = function(array, index) {
                    return function() {
                        array.splice(index, 1);
                    };
                };
                scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
                    var i, ii;
                    for (i = 0, ii = previousLeaveAnimations.length; i < ii; ++i) {
                        $animate.cancel(previousLeaveAnimations[i]);
                    }
                    previousLeaveAnimations.length = 0;
                    for (i = 0, ii = selectedScopes.length; i < ii; ++i) {
                        var selected = getBlockNodes(selectedElements[i].clone);
                        selectedScopes[i].$destroy();
                        var promise = previousLeaveAnimations[i] = $animate.leave(selected);
                        promise.then(spliceFactory(previousLeaveAnimations, i));
                    }
                    selectedElements.length = 0;
                    selectedScopes.length = 0;
                    if (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) {
                        forEach(selectedTranscludes, function(selectedTransclude) {
                            selectedTransclude.transclude(function(caseElement, selectedScope) {
                                selectedScopes.push(selectedScope);
                                var anchor = selectedTransclude.element;
                                caseElement[caseElement.length++] = document.createComment(" end ngSwitchWhen: ");
                                var block = {
                                    clone: caseElement
                                };
                                selectedElements.push(block);
                                $animate.enter(caseElement, anchor.parent(), anchor);
                            });
                        });
                    }
                });
            }
        };
    } ];
    var ngSwitchWhenDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: true,
        link: function(scope, element, attrs, ctrl, $transclude) {
            ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [];
            ctrl.cases["!" + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
            });
        }
    });
    var ngSwitchDefaultDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: true,
        link: function(scope, element, attr, ctrl, $transclude) {
            ctrl.cases["?"] = ctrl.cases["?"] || [];
            ctrl.cases["?"].push({
                transclude: $transclude,
                element: element
            });
        }
    });
    var ngTranscludeDirective = ngDirective({
        restrict: "EAC",
        link: function($scope, $element, $attrs, controller, $transclude) {
            if (!$transclude) {
                throw minErr("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! " + "No parent directive that requires a transclusion found. " + "Element: {0}", startingTag($element));
            }
            $transclude(function(clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    });
    var scriptDirective = [ "$templateCache", function($templateCache) {
        return {
            restrict: "E",
            terminal: true,
            compile: function(element, attr) {
                if (attr.type == "text/ng-template") {
                    var templateUrl = attr.id, text = element[0].text;
                    $templateCache.put(templateUrl, text);
                }
            }
        };
    } ];
    var noopNgModelController = {
        $setViewValue: noop,
        $render: noop
    };
    var SelectController = [ "$element", "$scope", "$attrs", function($element, $scope, $attrs) {
        var self = this, optionsMap = new HashMap();
        self.ngModelCtrl = noopNgModelController;
        self.unknownOption = jqLite(document.createElement("option"));
        self.renderUnknownOption = function(val) {
            var unknownVal = "? " + hashKey(val) + " ?";
            self.unknownOption.val(unknownVal);
            $element.prepend(self.unknownOption);
            $element.val(unknownVal);
        };
        $scope.$on("$destroy", function() {
            self.renderUnknownOption = noop;
        });
        self.removeUnknownOption = function() {
            if (self.unknownOption.parent()) self.unknownOption.remove();
        };
        self.readValue = function readSingleValue() {
            self.removeUnknownOption();
            return $element.val();
        };
        self.writeValue = function writeSingleValue(value) {
            if (self.hasOption(value)) {
                self.removeUnknownOption();
                $element.val(value);
                if (value === "") self.emptyOption.prop("selected", true);
            } else {
                if (value == null && self.emptyOption) {
                    self.removeUnknownOption();
                    $element.val("");
                } else {
                    self.renderUnknownOption(value);
                }
            }
        };
        self.addOption = function(value, element) {
            assertNotHasOwnProperty(value, '"option value"');
            if (value === "") {
                self.emptyOption = element;
            }
            var count = optionsMap.get(value) || 0;
            optionsMap.put(value, count + 1);
        };
        self.removeOption = function(value) {
            var count = optionsMap.get(value);
            if (count) {
                if (count === 1) {
                    optionsMap.remove(value);
                    if (value === "") {
                        self.emptyOption = undefined;
                    }
                } else {
                    optionsMap.put(value, count - 1);
                }
            }
        };
        self.hasOption = function(value) {
            return !!optionsMap.get(value);
        };
    } ];
    var selectDirective = function() {
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: SelectController,
            link: function(scope, element, attr, ctrls) {
                var ngModelCtrl = ctrls[1];
                if (!ngModelCtrl) return;
                var selectCtrl = ctrls[0];
                selectCtrl.ngModelCtrl = ngModelCtrl;
                ngModelCtrl.$render = function() {
                    selectCtrl.writeValue(ngModelCtrl.$viewValue);
                };
                element.on("change", function() {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(selectCtrl.readValue());
                    });
                });
                if (attr.multiple) {
                    selectCtrl.readValue = function readMultipleValue() {
                        var array = [];
                        forEach(element.find("option"), function(option) {
                            if (option.selected) {
                                array.push(option.value);
                            }
                        });
                        return array;
                    };
                    selectCtrl.writeValue = function writeMultipleValue(value) {
                        var items = new HashMap(value);
                        forEach(element.find("option"), function(option) {
                            option.selected = isDefined(items.get(option.value));
                        });
                    };
                    var lastView, lastViewRef = NaN;
                    scope.$watch(function selectMultipleWatch() {
                        if (lastViewRef === ngModelCtrl.$viewValue && !equals(lastView, ngModelCtrl.$viewValue)) {
                            lastView = shallowCopy(ngModelCtrl.$viewValue);
                            ngModelCtrl.$render();
                        }
                        lastViewRef = ngModelCtrl.$viewValue;
                    });
                    ngModelCtrl.$isEmpty = function(value) {
                        return !value || value.length === 0;
                    };
                }
            }
        };
    };
    var optionDirective = [ "$interpolate", function($interpolate) {
        function chromeHack(optionElement) {
            if (optionElement[0].hasAttribute("selected")) {
                optionElement[0].selected = true;
            }
        }
        return {
            restrict: "E",
            priority: 100,
            compile: function(element, attr) {
                if (isUndefined(attr.value)) {
                    var interpolateFn = $interpolate(element.text(), true);
                    if (!interpolateFn) {
                        attr.$set("value", element.text());
                    }
                }
                return function(scope, element, attr) {
                    var selectCtrlName = "$selectController", parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                    if (selectCtrl && selectCtrl.ngModelCtrl) {
                        if (interpolateFn) {
                            scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                                attr.$set("value", newVal);
                                if (oldVal !== newVal) {
                                    selectCtrl.removeOption(oldVal);
                                }
                                selectCtrl.addOption(newVal, element);
                                selectCtrl.ngModelCtrl.$render();
                                chromeHack(element);
                            });
                        } else {
                            selectCtrl.addOption(attr.value, element);
                            selectCtrl.ngModelCtrl.$render();
                            chromeHack(element);
                        }
                        element.on("$destroy", function() {
                            selectCtrl.removeOption(attr.value);
                            selectCtrl.ngModelCtrl.$render();
                        });
                    }
                };
            }
        };
    } ];
    var styleDirective = valueFn({
        restrict: "E",
        terminal: false
    });
    var requiredDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                attr.required = true;
                ctrl.$validators.required = function(modelValue, viewValue) {
                    return !attr.required || !ctrl.$isEmpty(viewValue);
                };
                attr.$observe("required", function() {
                    ctrl.$validate();
                });
            }
        };
    };
    var patternDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                var regexp, patternExp = attr.ngPattern || attr.pattern;
                attr.$observe("pattern", function(regex) {
                    if (isString(regex) && regex.length > 0) {
                        regex = new RegExp("^" + regex + "$");
                    }
                    if (regex && !regex.test) {
                        throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                    }
                    regexp = regex || undefined;
                    ctrl.$validate();
                });
                ctrl.$validators.pattern = function(value) {
                    return ctrl.$isEmpty(value) || isUndefined(regexp) || regexp.test(value);
                };
            }
        };
    };
    var maxlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                var maxlength = -1;
                attr.$observe("maxlength", function(value) {
                    var intVal = toInt(value);
                    maxlength = isNaN(intVal) ? -1 : intVal;
                    ctrl.$validate();
                });
                ctrl.$validators.maxlength = function(modelValue, viewValue) {
                    return maxlength < 0 || ctrl.$isEmpty(viewValue) || viewValue.length <= maxlength;
                };
            }
        };
    };
    var minlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                var minlength = 0;
                attr.$observe("minlength", function(value) {
                    minlength = toInt(value) || 0;
                    ctrl.$validate();
                });
                ctrl.$validators.minlength = function(modelValue, viewValue) {
                    return ctrl.$isEmpty(viewValue) || viewValue.length >= minlength;
                };
            }
        };
    };
    if (window.angular.bootstrap) {
        console.log("WARNING: Tried to load angular more than once.");
        return;
    }
    bindJQuery();
    publishExternalAPI(angular);
    jqLite(document).ready(function() {
        angularInit(document, bootstrap);
    });
})(window, document);

!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
(function(window, angular, undefined) {
    "use strict";
    var $resourceMinErr = angular.$$minErr("$resource");
    var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
    function isValidDottedPath(path) {
        return path != null && path !== "" && path !== "hasOwnProperty" && MEMBER_NAME_REGEX.test("." + path);
    }
    function lookupDottedPath(obj, path) {
        if (!isValidDottedPath(path)) {
            throw $resourceMinErr("badmember", 'Dotted member path "@{0}" is invalid.', path);
        }
        var keys = path.split(".");
        for (var i = 0, ii = keys.length; i < ii && obj !== undefined; i++) {
            var key = keys[i];
            obj = obj !== null ? obj[key] : undefined;
        }
        return obj;
    }
    function shallowClearAndCopy(src, dst) {
        dst = dst || {};
        angular.forEach(dst, function(value, key) {
            delete dst[key];
        });
        for (var key in src) {
            if (src.hasOwnProperty(key) && !(key.charAt(0) === "$" && key.charAt(1) === "$")) {
                dst[key] = src[key];
            }
        }
        return dst;
    }
    angular.module("ngResource", [ "ng" ]).provider("$resource", function() {
        var provider = this;
        this.defaults = {
            stripTrailingSlashes: true,
            actions: {
                get: {
                    method: "GET"
                },
                save: {
                    method: "POST"
                },
                query: {
                    method: "GET",
                    isArray: true
                },
                remove: {
                    method: "DELETE"
                },
                "delete": {
                    method: "DELETE"
                }
            }
        };
        this.$get = [ "$http", "$q", function($http, $q) {
            var noop = angular.noop, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, isFunction = angular.isFunction;
            function encodeUriSegment(val) {
                return encodeUriQuery(val, true).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
            }
            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
            }
            function Route(template, defaults) {
                this.template = template;
                this.defaults = extend({}, provider.defaults, defaults);
                this.urlParams = {};
            }
            Route.prototype = {
                setUrlParams: function(config, params, actionUrl) {
                    var self = this, url = actionUrl || self.template, val, encodedVal;
                    var urlParams = self.urlParams = {};
                    forEach(url.split(/\W/), function(param) {
                        if (param === "hasOwnProperty") {
                            throw $resourceMinErr("badname", "hasOwnProperty is not a valid parameter name.");
                        }
                        if (!new RegExp("^\\d+$").test(param) && param && new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url)) {
                            urlParams[param] = true;
                        }
                    });
                    url = url.replace(/\\:/g, ":");
                    params = params || {};
                    forEach(self.urlParams, function(_, urlParam) {
                        val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
                        if (angular.isDefined(val) && val !== null) {
                            encodedVal = encodeUriSegment(val);
                            url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
                                return encodedVal + p1;
                            });
                        } else {
                            url = url.replace(new RegExp("(/?):" + urlParam + "(\\W|$)", "g"), function(match, leadingSlashes, tail) {
                                if (tail.charAt(0) == "/") {
                                    return tail;
                                } else {
                                    return leadingSlashes + tail;
                                }
                            });
                        }
                    });
                    if (self.defaults.stripTrailingSlashes) {
                        url = url.replace(/\/+$/, "") || "/";
                    }
                    url = url.replace(/\/\.(?=\w+($|\?))/, ".");
                    config.url = url.replace(/\/\\\./, "/.");
                    forEach(params, function(value, key) {
                        if (!self.urlParams[key]) {
                            config.params = config.params || {};
                            config.params[key] = value;
                        }
                    });
                }
            };
            function resourceFactory(url, paramDefaults, actions, options) {
                var route = new Route(url, options);
                actions = extend({}, provider.defaults.actions, actions);
                function extractParams(data, actionParams) {
                    var ids = {};
                    actionParams = extend({}, paramDefaults, actionParams);
                    forEach(actionParams, function(value, key) {
                        if (isFunction(value)) {
                            value = value();
                        }
                        ids[key] = value && value.charAt && value.charAt(0) == "@" ? lookupDottedPath(data, value.substr(1)) : value;
                    });
                    return ids;
                }
                function defaultResponseInterceptor(response) {
                    return response.resource;
                }
                function Resource(value) {
                    shallowClearAndCopy(value || {}, this);
                }
                Resource.prototype.toJSON = function() {
                    var data = extend({}, this);
                    delete data.$promise;
                    delete data.$resolved;
                    return data;
                };
                forEach(actions, function(action, name) {
                    var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);
                    Resource[name] = function(a1, a2, a3, a4) {
                        var params = {}, data, success, error;
                        switch (arguments.length) {
                          case 4:
                            error = a4;
                            success = a3;

                          case 3:
                          case 2:
                            if (isFunction(a2)) {
                                if (isFunction(a1)) {
                                    success = a1;
                                    error = a2;
                                    break;
                                }
                                success = a2;
                                error = a3;
                            } else {
                                params = a1;
                                data = a2;
                                success = a3;
                                break;
                            }

                          case 1:
                            if (isFunction(a1)) success = a1; else if (hasBody) data = a1; else params = a1;
                            break;

                          case 0:
                            break;

                          default:
                            throw $resourceMinErr("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length);
                        }
                        var isInstanceCall = this instanceof Resource;
                        var value = isInstanceCall ? data : action.isArray ? [] : new Resource(data);
                        var httpConfig = {};
                        var responseInterceptor = action.interceptor && action.interceptor.response || defaultResponseInterceptor;
                        var responseErrorInterceptor = action.interceptor && action.interceptor.responseError || undefined;
                        forEach(action, function(value, key) {
                            if (key != "params" && key != "isArray" && key != "interceptor") {
                                httpConfig[key] = copy(value);
                            }
                        });
                        if (hasBody) httpConfig.data = data;
                        route.setUrlParams(httpConfig, extend({}, extractParams(data, action.params || {}), params), action.url);
                        var promise = $http(httpConfig).then(function(response) {
                            var data = response.data, promise = value.$promise;
                            if (data) {
                                if (angular.isArray(data) !== !!action.isArray) {
                                    throw $resourceMinErr("badcfg", "Error in resource configuration for action `{0}`. Expected response to " + "contain an {1} but got an {2} (Request: {3} {4})", name, action.isArray ? "array" : "object", angular.isArray(data) ? "array" : "object", httpConfig.method, httpConfig.url);
                                }
                                if (action.isArray) {
                                    value.length = 0;
                                    forEach(data, function(item) {
                                        if (typeof item === "object") {
                                            value.push(new Resource(item));
                                        } else {
                                            value.push(item);
                                        }
                                    });
                                } else {
                                    shallowClearAndCopy(data, value);
                                    value.$promise = promise;
                                }
                            }
                            value.$resolved = true;
                            response.resource = value;
                            return response;
                        }, function(response) {
                            value.$resolved = true;
                            (error || noop)(response);
                            return $q.reject(response);
                        });
                        promise = promise.then(function(response) {
                            var value = responseInterceptor(response);
                            (success || noop)(value, response.headers);
                            return value;
                        }, responseErrorInterceptor);
                        if (!isInstanceCall) {
                            value.$promise = promise;
                            value.$resolved = false;
                            return value;
                        }
                        return promise;
                    };
                    Resource.prototype["$" + name] = function(params, success, error) {
                        if (isFunction(params)) {
                            error = success;
                            success = params;
                            params = {};
                        }
                        var result = Resource[name].call(this, params, this, success, error);
                        return result.$promise || result;
                    };
                });
                Resource.bind = function(additionalParamDefaults) {
                    return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
                };
                return Resource;
            }
            return resourceFactory;
        } ];
    });
})(window, window.angular);
(function(window, angular, undefined) {
    "use strict";
    var noop = angular.noop;
    var extend = angular.extend;
    var jqLite = angular.element;
    var forEach = angular.forEach;
    var isArray = angular.isArray;
    var isString = angular.isString;
    var isObject = angular.isObject;
    var isUndefined = angular.isUndefined;
    var isDefined = angular.isDefined;
    var isFunction = angular.isFunction;
    var isElement = angular.isElement;
    var ELEMENT_NODE = 1;
    var COMMENT_NODE = 8;
    var NG_ANIMATE_CLASSNAME = "ng-animate";
    var NG_ANIMATE_CHILDREN_DATA = "$$ngAnimateChildren";
    var isPromiseLike = function(p) {
        return p && p.then ? true : false;
    };
    function assertArg(arg, name, reason) {
        if (!arg) {
            throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        }
        return arg;
    }
    function mergeClasses(a, b) {
        if (!a && !b) return "";
        if (!a) return b;
        if (!b) return a;
        if (isArray(a)) a = a.join(" ");
        if (isArray(b)) b = b.join(" ");
        return a + " " + b;
    }
    function packageStyles(options) {
        var styles = {};
        if (options && (options.to || options.from)) {
            styles.to = options.to;
            styles.from = options.from;
        }
        return styles;
    }
    function pendClasses(classes, fix, isPrefix) {
        var className = "";
        classes = isArray(classes) ? classes : classes && isString(classes) && classes.length ? classes.split(/\s+/) : [];
        forEach(classes, function(klass, i) {
            if (klass && klass.length > 0) {
                className += i > 0 ? " " : "";
                className += isPrefix ? fix + klass : klass + fix;
            }
        });
        return className;
    }
    function removeFromArray(arr, val) {
        var index = arr.indexOf(val);
        if (val >= 0) {
            arr.splice(index, 1);
        }
    }
    function stripCommentsFromElement(element) {
        if (element instanceof jqLite) {
            switch (element.length) {
              case 0:
                return [];
                break;

              case 1:
                if (element[0].nodeType === ELEMENT_NODE) {
                    return element;
                }
                break;

              default:
                return jqLite(extractElementNode(element));
                break;
            }
        }
        if (element.nodeType === ELEMENT_NODE) {
            return jqLite(element);
        }
    }
    function extractElementNode(element) {
        if (!element[0]) return element;
        for (var i = 0; i < element.length; i++) {
            var elm = element[i];
            if (elm.nodeType == ELEMENT_NODE) {
                return elm;
            }
        }
    }
    function $$addClass($$jqLite, element, className) {
        forEach(element, function(elm) {
            $$jqLite.addClass(elm, className);
        });
    }
    function $$removeClass($$jqLite, element, className) {
        forEach(element, function(elm) {
            $$jqLite.removeClass(elm, className);
        });
    }
    function applyAnimationClassesFactory($$jqLite) {
        return function(element, options) {
            if (options.addClass) {
                $$addClass($$jqLite, element, options.addClass);
                options.addClass = null;
            }
            if (options.removeClass) {
                $$removeClass($$jqLite, element, options.removeClass);
                options.removeClass = null;
            }
        };
    }
    function prepareAnimationOptions(options) {
        options = options || {};
        if (!options.$$prepared) {
            var domOperation = options.domOperation || noop;
            options.domOperation = function() {
                options.$$domOperationFired = true;
                domOperation();
                domOperation = noop;
            };
            options.$$prepared = true;
        }
        return options;
    }
    function applyAnimationStyles(element, options) {
        applyAnimationFromStyles(element, options);
        applyAnimationToStyles(element, options);
    }
    function applyAnimationFromStyles(element, options) {
        if (options.from) {
            element.css(options.from);
            options.from = null;
        }
    }
    function applyAnimationToStyles(element, options) {
        if (options.to) {
            element.css(options.to);
            options.to = null;
        }
    }
    function mergeAnimationOptions(element, target, newOptions) {
        var toAdd = (target.addClass || "") + " " + (newOptions.addClass || "");
        var toRemove = (target.removeClass || "") + " " + (newOptions.removeClass || "");
        var classes = resolveElementClasses(element.attr("class"), toAdd, toRemove);
        extend(target, newOptions);
        if (classes.addClass) {
            target.addClass = classes.addClass;
        } else {
            target.addClass = null;
        }
        if (classes.removeClass) {
            target.removeClass = classes.removeClass;
        } else {
            target.removeClass = null;
        }
        return target;
    }
    function resolveElementClasses(existing, toAdd, toRemove) {
        var ADD_CLASS = 1;
        var REMOVE_CLASS = -1;
        var flags = {};
        existing = splitClassesToLookup(existing);
        toAdd = splitClassesToLookup(toAdd);
        forEach(toAdd, function(value, key) {
            flags[key] = ADD_CLASS;
        });
        toRemove = splitClassesToLookup(toRemove);
        forEach(toRemove, function(value, key) {
            flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
        });
        var classes = {
            addClass: "",
            removeClass: ""
        };
        forEach(flags, function(val, klass) {
            var prop, allow;
            if (val === ADD_CLASS) {
                prop = "addClass";
                allow = !existing[klass];
            } else if (val === REMOVE_CLASS) {
                prop = "removeClass";
                allow = existing[klass];
            }
            if (allow) {
                if (classes[prop].length) {
                    classes[prop] += " ";
                }
                classes[prop] += klass;
            }
        });
        function splitClassesToLookup(classes) {
            if (isString(classes)) {
                classes = classes.split(" ");
            }
            var obj = {};
            forEach(classes, function(klass) {
                if (klass.length) {
                    obj[klass] = true;
                }
            });
            return obj;
        }
        return classes;
    }
    function getDomNode(element) {
        return element instanceof angular.element ? element[0] : element;
    }
    var $$rAFSchedulerFactory = [ "$$rAF", function($$rAF) {
        var tickQueue = [];
        var cancelFn;
        function scheduler(tasks) {
            tickQueue.push([].concat(tasks));
            nextTick();
        }
        scheduler.waitUntilQuiet = function(fn) {
            if (cancelFn) cancelFn();
            cancelFn = $$rAF(function() {
                cancelFn = null;
                fn();
                nextTick();
            });
        };
        return scheduler;
        function nextTick() {
            if (!tickQueue.length) return;
            var updatedQueue = [];
            for (var i = 0; i < tickQueue.length; i++) {
                var innerQueue = tickQueue[i];
                runNextTask(innerQueue);
                if (innerQueue.length) {
                    updatedQueue.push(innerQueue);
                }
            }
            tickQueue = updatedQueue;
            if (!cancelFn) {
                $$rAF(function() {
                    if (!cancelFn) nextTick();
                });
            }
        }
        function runNextTask(tasks) {
            var nextTask = tasks.shift();
            nextTask();
        }
    } ];
    var $$AnimateChildrenDirective = [ function() {
        return function(scope, element, attrs) {
            var val = attrs.ngAnimateChildren;
            if (angular.isString(val) && val.length === 0) {
                element.data(NG_ANIMATE_CHILDREN_DATA, true);
            } else {
                attrs.$observe("ngAnimateChildren", function(value) {
                    value = value === "on" || value === "true";
                    element.data(NG_ANIMATE_CHILDREN_DATA, value);
                });
            }
        };
    } ];
    var CSS_PREFIX = "", TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;
    if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
        CSS_PREFIX = "-webkit-";
        TRANSITION_PROP = "WebkitTransition";
        TRANSITIONEND_EVENT = "webkitTransitionEnd transitionend";
    } else {
        TRANSITION_PROP = "transition";
        TRANSITIONEND_EVENT = "transitionend";
    }
    if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
        CSS_PREFIX = "-webkit-";
        ANIMATION_PROP = "WebkitAnimation";
        ANIMATIONEND_EVENT = "webkitAnimationEnd animationend";
    } else {
        ANIMATION_PROP = "animation";
        ANIMATIONEND_EVENT = "animationend";
    }
    var DURATION_KEY = "Duration";
    var PROPERTY_KEY = "Property";
    var DELAY_KEY = "Delay";
    var TIMING_KEY = "TimingFunction";
    var ANIMATION_ITERATION_COUNT_KEY = "IterationCount";
    var ANIMATION_PLAYSTATE_KEY = "PlayState";
    var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
    var CLOSING_TIME_BUFFER = 1.5;
    var ONE_SECOND = 1e3;
    var BASE_TEN = 10;
    var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;
    var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;
    var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;
    var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;
    var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;
    var DETECT_CSS_PROPERTIES = {
        transitionDuration: TRANSITION_DURATION_PROP,
        transitionDelay: TRANSITION_DELAY_PROP,
        transitionProperty: TRANSITION_PROP + PROPERTY_KEY,
        animationDuration: ANIMATION_DURATION_PROP,
        animationDelay: ANIMATION_DELAY_PROP,
        animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
    };
    var DETECT_STAGGER_CSS_PROPERTIES = {
        transitionDuration: TRANSITION_DURATION_PROP,
        transitionDelay: TRANSITION_DELAY_PROP,
        animationDuration: ANIMATION_DURATION_PROP,
        animationDelay: ANIMATION_DELAY_PROP
    };
    function computeCssStyles($window, element, properties) {
        var styles = Object.create(null);
        var detectedStyles = $window.getComputedStyle(element) || {};
        forEach(properties, function(formalStyleName, actualStyleName) {
            var val = detectedStyles[formalStyleName];
            if (val) {
                var c = val.charAt(0);
                if (c === "-" || c === "+" || c >= 0) {
                    val = parseMaxTime(val);
                }
                if (val === 0) {
                    val = null;
                }
                styles[actualStyleName] = val;
            }
        });
        return styles;
    }
    function parseMaxTime(str) {
        var maxValue = 0;
        var values = str.split(/\s*,\s*/);
        forEach(values, function(value) {
            if (value.charAt(value.length - 1) == "s") {
                value = value.substring(0, value.length - 1);
            }
            value = parseFloat(value) || 0;
            maxValue = maxValue ? Math.max(value, maxValue) : value;
        });
        return maxValue;
    }
    function truthyTimingValue(val) {
        return val === 0 || val != null;
    }
    function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
        var style = TRANSITION_PROP;
        var value = duration + "s";
        if (applyOnlyDuration) {
            style += DURATION_KEY;
        } else {
            value += " linear all";
        }
        return [ style, value ];
    }
    function getCssKeyframeDurationStyle(duration) {
        return [ ANIMATION_DURATION_PROP, duration + "s" ];
    }
    function getCssDelayStyle(delay, isKeyframeAnimation) {
        var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
        return [ prop, delay + "s" ];
    }
    function blockTransitions(node, duration) {
        var value = duration ? "-" + duration + "s" : "";
        applyInlineStyle(node, [ TRANSITION_DELAY_PROP, value ]);
        return [ TRANSITION_DELAY_PROP, value ];
    }
    function blockKeyframeAnimations(node, applyBlock) {
        var value = applyBlock ? "paused" : "";
        var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
        applyInlineStyle(node, [ key, value ]);
        return [ key, value ];
    }
    function applyInlineStyle(node, styleTuple) {
        var prop = styleTuple[0];
        var value = styleTuple[1];
        node.style[prop] = value;
    }
    function createLocalCacheLookup() {
        var cache = Object.create(null);
        return {
            flush: function() {
                cache = Object.create(null);
            },
            count: function(key) {
                var entry = cache[key];
                return entry ? entry.total : 0;
            },
            get: function(key) {
                var entry = cache[key];
                return entry && entry.value;
            },
            put: function(key, value) {
                if (!cache[key]) {
                    cache[key] = {
                        total: 1,
                        value: value
                    };
                } else {
                    cache[key].total++;
                }
            }
        };
    }
    var $AnimateCssProvider = [ "$animateProvider", function($animateProvider) {
        var gcsLookup = createLocalCacheLookup();
        var gcsStaggerLookup = createLocalCacheLookup();
        this.$get = [ "$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$document", "$sniffer", "$$rAFScheduler", function($window, $$jqLite, $$AnimateRunner, $timeout, $document, $sniffer, $$rAFScheduler) {
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            var parentCounter = 0;
            function gcsHashFn(node, extraClasses) {
                var KEY = "$$ngAnimateParentKey";
                var parentNode = node.parentNode;
                var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
                return parentID + "-" + node.getAttribute("class") + "-" + extraClasses;
            }
            function computeCachedCssStyles(node, className, cacheKey, properties) {
                var timings = gcsLookup.get(cacheKey);
                if (!timings) {
                    timings = computeCssStyles($window, node, properties);
                    if (timings.animationIterationCount === "infinite") {
                        timings.animationIterationCount = 1;
                    }
                }
                gcsLookup.put(cacheKey, timings);
                return timings;
            }
            function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
                var stagger;
                if (gcsLookup.count(cacheKey) > 0) {
                    stagger = gcsStaggerLookup.get(cacheKey);
                    if (!stagger) {
                        var staggerClassName = pendClasses(className, "-stagger");
                        $$jqLite.addClass(node, staggerClassName);
                        stagger = computeCssStyles($window, node, properties);
                        stagger.animationDuration = Math.max(stagger.animationDuration, 0);
                        stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);
                        $$jqLite.removeClass(node, staggerClassName);
                        gcsStaggerLookup.put(cacheKey, stagger);
                    }
                }
                return stagger || {};
            }
            var bod = getDomNode($document).body;
            var rafWaitQueue = [];
            function waitUntilQuiet(callback) {
                rafWaitQueue.push(callback);
                $$rAFScheduler.waitUntilQuiet(function() {
                    gcsLookup.flush();
                    gcsStaggerLookup.flush();
                    var width = bod.offsetWidth + 1;
                    for (var i = 0; i < rafWaitQueue.length; i++) {
                        rafWaitQueue[i](width);
                    }
                    rafWaitQueue.length = 0;
                });
            }
            return init;
            function computeTimings(node, className, cacheKey) {
                var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);
                var aD = timings.animationDelay;
                var tD = timings.transitionDelay;
                timings.maxDelay = aD && tD ? Math.max(aD, tD) : aD || tD;
                timings.maxDuration = Math.max(timings.animationDuration * timings.animationIterationCount, timings.transitionDuration);
                return timings;
            }
            function init(element, options) {
                var node = getDomNode(element);
                options = prepareAnimationOptions(options);
                var temporaryStyles = [];
                var classes = element.attr("class");
                var styles = packageStyles(options);
                var animationClosed;
                var animationPaused;
                var animationCompleted;
                var runner;
                var runnerHost;
                var maxDelay;
                var maxDelayTime;
                var maxDuration;
                var maxDurationTime;
                if (options.duration === 0 || !$sniffer.animations && !$sniffer.transitions) {
                    return closeAndReturnNoopAnimator();
                }
                var method = options.event && isArray(options.event) ? options.event.join(" ") : options.event;
                var isStructural = method && options.structural;
                var structuralClassName = "";
                var addRemoveClassName = "";
                if (isStructural) {
                    structuralClassName = pendClasses(method, "ng-", true);
                } else if (method) {
                    structuralClassName = method;
                }
                if (options.addClass) {
                    addRemoveClassName += pendClasses(options.addClass, "-add");
                }
                if (options.removeClass) {
                    if (addRemoveClassName.length) {
                        addRemoveClassName += " ";
                    }
                    addRemoveClassName += pendClasses(options.removeClass, "-remove");
                }
                if (options.applyClassesEarly && addRemoveClassName.length) {
                    applyAnimationClasses(element, options);
                    addRemoveClassName = "";
                }
                var setupClasses = [ structuralClassName, addRemoveClassName ].join(" ").trim();
                var fullClassName = classes + " " + setupClasses;
                var activeClasses = pendClasses(setupClasses, "-active");
                var hasToStyles = styles.to && Object.keys(styles.to).length > 0;
                if (!hasToStyles && !setupClasses) {
                    return closeAndReturnNoopAnimator();
                }
                var cacheKey, stagger;
                if (options.stagger > 0) {
                    var staggerVal = parseFloat(options.stagger);
                    stagger = {
                        transitionDelay: staggerVal,
                        animationDelay: staggerVal,
                        transitionDuration: 0,
                        animationDuration: 0
                    };
                } else {
                    cacheKey = gcsHashFn(node, fullClassName);
                    stagger = computeCachedCssStaggerStyles(node, setupClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
                }
                $$jqLite.addClass(element, setupClasses);
                var applyOnlyDuration;
                if (options.transitionStyle) {
                    var transitionStyle = [ TRANSITION_PROP, options.transitionStyle ];
                    applyInlineStyle(node, transitionStyle);
                    temporaryStyles.push(transitionStyle);
                }
                if (options.duration >= 0) {
                    applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
                    var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);
                    applyInlineStyle(node, durationStyle);
                    temporaryStyles.push(durationStyle);
                }
                if (options.keyframeStyle) {
                    var keyframeStyle = [ ANIMATION_PROP, options.keyframeStyle ];
                    applyInlineStyle(node, keyframeStyle);
                    temporaryStyles.push(keyframeStyle);
                }
                var itemIndex = stagger ? options.staggerIndex >= 0 ? options.staggerIndex : gcsLookup.count(cacheKey) : 0;
                var isFirst = itemIndex === 0;
                if (isFirst) {
                    blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
                }
                var timings = computeTimings(node, fullClassName, cacheKey);
                var relativeDelay = timings.maxDelay;
                maxDelay = Math.max(relativeDelay, 0);
                maxDuration = timings.maxDuration;
                var flags = {};
                flags.hasTransitions = timings.transitionDuration > 0;
                flags.hasAnimations = timings.animationDuration > 0;
                flags.hasTransitionAll = flags.hasTransitions && timings.transitionProperty == "all";
                flags.applyTransitionDuration = hasToStyles && (flags.hasTransitions && !flags.hasTransitionAll || flags.hasAnimations && !flags.hasTransitions);
                flags.applyAnimationDuration = options.duration && flags.hasAnimations;
                flags.applyTransitionDelay = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
                flags.applyAnimationDelay = truthyTimingValue(options.delay) && flags.hasAnimations;
                flags.recalculateTimingStyles = addRemoveClassName.length > 0;
                if (flags.applyTransitionDuration || flags.applyAnimationDuration) {
                    maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;
                    if (flags.applyTransitionDuration) {
                        flags.hasTransitions = true;
                        timings.transitionDuration = maxDuration;
                        applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;
                        temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));
                    }
                    if (flags.applyAnimationDuration) {
                        flags.hasAnimations = true;
                        timings.animationDuration = maxDuration;
                        temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));
                    }
                }
                if (maxDuration === 0 && !flags.recalculateTimingStyles) {
                    return closeAndReturnNoopAnimator();
                }
                if (options.duration == null && timings.transitionDuration > 0) {
                    flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;
                }
                maxDelayTime = maxDelay * ONE_SECOND;
                maxDurationTime = maxDuration * ONE_SECOND;
                if (!options.skipBlocking) {
                    flags.blockTransition = timings.transitionDuration > 0;
                    flags.blockKeyframeAnimation = timings.animationDuration > 0 && stagger.animationDelay > 0 && stagger.animationDuration === 0;
                }
                applyAnimationFromStyles(element, options);
                if (!flags.blockTransition) {
                    blockTransitions(node, false);
                }
                applyBlocking(maxDuration);
                return {
                    $$willAnimate: true,
                    end: endFn,
                    start: function() {
                        if (animationClosed) return;
                        runnerHost = {
                            end: endFn,
                            cancel: cancelFn,
                            resume: null,
                            pause: null
                        };
                        runner = new $$AnimateRunner(runnerHost);
                        waitUntilQuiet(start);
                        return runner;
                    }
                };
                function endFn() {
                    close();
                }
                function cancelFn() {
                    close(true);
                }
                function close(rejected) {
                    if (animationClosed || animationCompleted && animationPaused) return;
                    animationClosed = true;
                    animationPaused = false;
                    $$jqLite.removeClass(element, setupClasses);
                    $$jqLite.removeClass(element, activeClasses);
                    blockKeyframeAnimations(node, false);
                    blockTransitions(node, false);
                    forEach(temporaryStyles, function(entry) {
                        node.style[entry[0]] = "";
                    });
                    applyAnimationClasses(element, options);
                    applyAnimationStyles(element, options);
                    if (options.onDone) {
                        options.onDone();
                    }
                    if (runner) {
                        runner.complete(!rejected);
                    }
                }
                function applyBlocking(duration) {
                    if (flags.blockTransition) {
                        blockTransitions(node, duration);
                    }
                    if (flags.blockKeyframeAnimation) {
                        blockKeyframeAnimations(node, !!duration);
                    }
                }
                function closeAndReturnNoopAnimator() {
                    runner = new $$AnimateRunner({
                        end: endFn,
                        cancel: cancelFn
                    });
                    close();
                    return {
                        $$willAnimate: false,
                        start: function() {
                            return runner;
                        },
                        end: endFn
                    };
                }
                function start() {
                    if (animationClosed) return;
                    var startTime, events = [];
                    var playPause = function(playAnimation) {
                        if (!animationCompleted) {
                            animationPaused = !playAnimation;
                            if (timings.animationDuration) {
                                var value = blockKeyframeAnimations(node, animationPaused);
                                animationPaused ? temporaryStyles.push(value) : removeFromArray(temporaryStyles, value);
                            }
                        } else if (animationPaused && playAnimation) {
                            animationPaused = false;
                            close();
                        }
                    };
                    var maxStagger = itemIndex > 0 && (timings.transitionDuration && stagger.transitionDuration === 0 || timings.animationDuration && stagger.animationDuration === 0) && Math.max(stagger.animationDelay, stagger.transitionDelay);
                    if (maxStagger) {
                        $timeout(triggerAnimationStart, Math.floor(maxStagger * itemIndex * ONE_SECOND), false);
                    } else {
                        triggerAnimationStart();
                    }
                    runnerHost.resume = function() {
                        playPause(true);
                    };
                    runnerHost.pause = function() {
                        playPause(false);
                    };
                    function triggerAnimationStart() {
                        if (animationClosed) return;
                        applyBlocking(false);
                        forEach(temporaryStyles, function(entry) {
                            var key = entry[0];
                            var value = entry[1];
                            node.style[key] = value;
                        });
                        applyAnimationClasses(element, options);
                        $$jqLite.addClass(element, activeClasses);
                        if (flags.recalculateTimingStyles) {
                            fullClassName = node.className + " " + setupClasses;
                            cacheKey = gcsHashFn(node, fullClassName);
                            timings = computeTimings(node, fullClassName, cacheKey);
                            relativeDelay = timings.maxDelay;
                            maxDelay = Math.max(relativeDelay, 0);
                            maxDuration = timings.maxDuration;
                            if (maxDuration === 0) {
                                close();
                                return;
                            }
                            flags.hasTransitions = timings.transitionDuration > 0;
                            flags.hasAnimations = timings.animationDuration > 0;
                        }
                        if (flags.applyTransitionDelay || flags.applyAnimationDelay) {
                            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay) ? parseFloat(options.delay) : relativeDelay;
                            maxDelay = Math.max(relativeDelay, 0);
                            var delayStyle;
                            if (flags.applyTransitionDelay) {
                                timings.transitionDelay = relativeDelay;
                                delayStyle = getCssDelayStyle(relativeDelay);
                                temporaryStyles.push(delayStyle);
                                node.style[delayStyle[0]] = delayStyle[1];
                            }
                            if (flags.applyAnimationDelay) {
                                timings.animationDelay = relativeDelay;
                                delayStyle = getCssDelayStyle(relativeDelay, true);
                                temporaryStyles.push(delayStyle);
                                node.style[delayStyle[0]] = delayStyle[1];
                            }
                        }
                        maxDelayTime = maxDelay * ONE_SECOND;
                        maxDurationTime = maxDuration * ONE_SECOND;
                        if (options.easing) {
                            var easeProp, easeVal = options.easing;
                            if (flags.hasTransitions) {
                                easeProp = TRANSITION_PROP + TIMING_KEY;
                                temporaryStyles.push([ easeProp, easeVal ]);
                                node.style[easeProp] = easeVal;
                            }
                            if (flags.hasAnimations) {
                                easeProp = ANIMATION_PROP + TIMING_KEY;
                                temporaryStyles.push([ easeProp, easeVal ]);
                                node.style[easeProp] = easeVal;
                            }
                        }
                        if (timings.transitionDuration) {
                            events.push(TRANSITIONEND_EVENT);
                        }
                        if (timings.animationDuration) {
                            events.push(ANIMATIONEND_EVENT);
                        }
                        startTime = Date.now();
                        element.on(events.join(" "), onAnimationProgress);
                        $timeout(onAnimationExpired, maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime);
                        applyAnimationToStyles(element, options);
                    }
                    function onAnimationExpired() {
                        close();
                    }
                    function onAnimationProgress(event) {
                        event.stopPropagation();
                        var ev = event.originalEvent || event;
                        var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();
                        var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
                        if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
                            animationCompleted = true;
                            close();
                        }
                    }
                }
            }
        } ];
    } ];
    var $$AnimateCssDriverProvider = [ "$$animationProvider", function($$animationProvider) {
        $$animationProvider.drivers.push("$$animateCssDriver");
        var NG_ANIMATE_SHIM_CLASS_NAME = "ng-animate-shim";
        var NG_ANIMATE_ANCHOR_CLASS_NAME = "ng-anchor";
        var NG_OUT_ANCHOR_CLASS_NAME = "ng-anchor-out";
        var NG_IN_ANCHOR_CLASS_NAME = "ng-anchor-in";
        this.$get = [ "$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$document", "$sniffer", function($animateCss, $rootScope, $$AnimateRunner, $rootElement, $document, $sniffer) {
            if (!$sniffer.animations && !$sniffer.transitions) return noop;
            var bodyNode = getDomNode($document).body;
            var rootNode = getDomNode($rootElement);
            var rootBodyElement = jqLite(bodyNode.parentNode === rootNode ? bodyNode : rootNode);
            return function initDriverFn(animationDetails) {
                return animationDetails.from && animationDetails.to ? prepareFromToAnchorAnimation(animationDetails.from, animationDetails.to, animationDetails.classes, animationDetails.anchors) : prepareRegularAnimation(animationDetails);
            };
            function filterCssClasses(classes) {
                return classes.replace(/\bng-\S+\b/g, "");
            }
            function getUniqueValues(a, b) {
                if (isString(a)) a = a.split(" ");
                if (isString(b)) b = b.split(" ");
                return a.filter(function(val) {
                    return b.indexOf(val) === -1;
                }).join(" ");
            }
            function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
                var clone = jqLite(getDomNode(outAnchor).cloneNode(true));
                var startingClasses = filterCssClasses(getClassVal(clone));
                outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
                inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
                clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);
                rootBodyElement.append(clone);
                var animatorIn, animatorOut = prepareOutAnimation();
                if (!animatorOut) {
                    animatorIn = prepareInAnimation();
                    if (!animatorIn) {
                        return end();
                    }
                }
                var startingAnimator = animatorOut || animatorIn;
                return {
                    start: function() {
                        var runner;
                        var currentAnimation = startingAnimator.start();
                        currentAnimation.done(function() {
                            currentAnimation = null;
                            if (!animatorIn) {
                                animatorIn = prepareInAnimation();
                                if (animatorIn) {
                                    currentAnimation = animatorIn.start();
                                    currentAnimation.done(function() {
                                        currentAnimation = null;
                                        end();
                                        runner.complete();
                                    });
                                    return currentAnimation;
                                }
                            }
                            end();
                            runner.complete();
                        });
                        runner = new $$AnimateRunner({
                            end: endFn,
                            cancel: endFn
                        });
                        return runner;
                        function endFn() {
                            if (currentAnimation) {
                                currentAnimation.end();
                            }
                        }
                    }
                };
                function calculateAnchorStyles(anchor) {
                    var styles = {};
                    var coords = getDomNode(anchor).getBoundingClientRect();
                    forEach([ "width", "height", "top", "left" ], function(key) {
                        var value = coords[key];
                        switch (key) {
                          case "top":
                            value += bodyNode.scrollTop;
                            break;

                          case "left":
                            value += bodyNode.scrollLeft;
                            break;
                        }
                        styles[key] = Math.floor(value) + "px";
                    });
                    return styles;
                }
                function prepareOutAnimation() {
                    var animator = $animateCss(clone, {
                        addClass: NG_OUT_ANCHOR_CLASS_NAME,
                        delay: true,
                        from: calculateAnchorStyles(outAnchor)
                    });
                    return animator.$$willAnimate ? animator : null;
                }
                function getClassVal(element) {
                    return element.attr("class") || "";
                }
                function prepareInAnimation() {
                    var endingClasses = filterCssClasses(getClassVal(inAnchor));
                    var toAdd = getUniqueValues(endingClasses, startingClasses);
                    var toRemove = getUniqueValues(startingClasses, endingClasses);
                    var animator = $animateCss(clone, {
                        to: calculateAnchorStyles(inAnchor),
                        addClass: NG_IN_ANCHOR_CLASS_NAME + " " + toAdd,
                        removeClass: NG_OUT_ANCHOR_CLASS_NAME + " " + toRemove,
                        delay: true
                    });
                    return animator.$$willAnimate ? animator : null;
                }
                function end() {
                    clone.remove();
                    outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
                    inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
                }
            }
            function prepareFromToAnchorAnimation(from, to, classes, anchors) {
                var fromAnimation = prepareRegularAnimation(from);
                var toAnimation = prepareRegularAnimation(to);
                var anchorAnimations = [];
                forEach(anchors, function(anchor) {
                    var outElement = anchor["out"];
                    var inElement = anchor["in"];
                    var animator = prepareAnchoredAnimation(classes, outElement, inElement);
                    if (animator) {
                        anchorAnimations.push(animator);
                    }
                });
                if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;
                return {
                    start: function() {
                        var animationRunners = [];
                        if (fromAnimation) {
                            animationRunners.push(fromAnimation.start());
                        }
                        if (toAnimation) {
                            animationRunners.push(toAnimation.start());
                        }
                        forEach(anchorAnimations, function(animation) {
                            animationRunners.push(animation.start());
                        });
                        var runner = new $$AnimateRunner({
                            end: endFn,
                            cancel: endFn
                        });
                        $$AnimateRunner.all(animationRunners, function(status) {
                            runner.complete(status);
                        });
                        return runner;
                        function endFn() {
                            forEach(animationRunners, function(runner) {
                                runner.end();
                            });
                        }
                    }
                };
            }
            function prepareRegularAnimation(animationDetails) {
                var element = animationDetails.element;
                var options = animationDetails.options || {};
                if (animationDetails.structural) {
                    options.structural = options.applyClassesEarly = true;
                    options.event = animationDetails.event;
                    if (options.event === "leave") {
                        options.onDone = options.domOperation;
                    }
                } else {
                    options.event = null;
                }
                var animator = $animateCss(element, options);
                return animator.$$willAnimate ? animator : null;
            }
        } ];
    } ];
    var $$AnimateJsProvider = [ "$animateProvider", function($animateProvider) {
        this.$get = [ "$injector", "$$AnimateRunner", "$$rAFMutex", "$$jqLite", function($injector, $$AnimateRunner, $$rAFMutex, $$jqLite) {
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return function(element, event, classes, options) {
                if (arguments.length === 3 && isObject(classes)) {
                    options = classes;
                    classes = null;
                }
                options = prepareAnimationOptions(options);
                if (!classes) {
                    classes = element.attr("class") || "";
                    if (options.addClass) {
                        classes += " " + options.addClass;
                    }
                    if (options.removeClass) {
                        classes += " " + options.removeClass;
                    }
                }
                var classesToAdd = options.addClass;
                var classesToRemove = options.removeClass;
                var animations = lookupAnimations(classes);
                var before, after;
                if (animations.length) {
                    var afterFn, beforeFn;
                    if (event == "leave") {
                        beforeFn = "leave";
                        afterFn = "afterLeave";
                    } else {
                        beforeFn = "before" + event.charAt(0).toUpperCase() + event.substr(1);
                        afterFn = event;
                    }
                    if (event !== "enter" && event !== "move") {
                        before = packageAnimations(element, event, options, animations, beforeFn);
                    }
                    after = packageAnimations(element, event, options, animations, afterFn);
                }
                if (!before && !after) return;
                function applyOptions() {
                    options.domOperation();
                    applyAnimationClasses(element, options);
                }
                return {
                    start: function() {
                        var closeActiveAnimations;
                        var chain = [];
                        if (before) {
                            chain.push(function(fn) {
                                closeActiveAnimations = before(fn);
                            });
                        }
                        if (chain.length) {
                            chain.push(function(fn) {
                                applyOptions();
                                fn(true);
                            });
                        } else {
                            applyOptions();
                        }
                        if (after) {
                            chain.push(function(fn) {
                                closeActiveAnimations = after(fn);
                            });
                        }
                        var animationClosed = false;
                        var runner = new $$AnimateRunner({
                            end: function() {
                                endAnimations();
                            },
                            cancel: function() {
                                endAnimations(true);
                            }
                        });
                        $$AnimateRunner.chain(chain, onComplete);
                        return runner;
                        function onComplete(success) {
                            animationClosed = true;
                            applyOptions();
                            applyAnimationStyles(element, options);
                            runner.complete(success);
                        }
                        function endAnimations(cancelled) {
                            if (!animationClosed) {
                                (closeActiveAnimations || noop)(cancelled);
                                onComplete(cancelled);
                            }
                        }
                    }
                };
                function executeAnimationFn(fn, element, event, options, onDone) {
                    var args;
                    switch (event) {
                      case "animate":
                        args = [ element, options.from, options.to, onDone ];
                        break;

                      case "setClass":
                        args = [ element, classesToAdd, classesToRemove, onDone ];
                        break;

                      case "addClass":
                        args = [ element, classesToAdd, onDone ];
                        break;

                      case "removeClass":
                        args = [ element, classesToRemove, onDone ];
                        break;

                      default:
                        args = [ element, onDone ];
                        break;
                    }
                    args.push(options);
                    var value = fn.apply(fn, args);
                    if (value) {
                        if (isFunction(value.start)) {
                            value = value.start();
                        }
                        if (value instanceof $$AnimateRunner) {
                            value.done(onDone);
                        } else if (isFunction(value)) {
                            return value;
                        }
                    }
                    return noop;
                }
                function groupEventedAnimations(element, event, options, animations, fnName) {
                    var operations = [];
                    forEach(animations, function(ani) {
                        var animation = ani[fnName];
                        if (!animation) return;
                        operations.push(function() {
                            var runner;
                            var endProgressCb;
                            var resolved = false;
                            var onAnimationComplete = function(rejected) {
                                if (!resolved) {
                                    resolved = true;
                                    (endProgressCb || noop)(rejected);
                                    runner.complete(!rejected);
                                }
                            };
                            runner = new $$AnimateRunner({
                                end: function() {
                                    onAnimationComplete();
                                },
                                cancel: function() {
                                    onAnimationComplete(true);
                                }
                            });
                            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
                                var cancelled = result === false;
                                onAnimationComplete(cancelled);
                            });
                            return runner;
                        });
                    });
                    return operations;
                }
                function packageAnimations(element, event, options, animations, fnName) {
                    var operations = groupEventedAnimations(element, event, options, animations, fnName);
                    if (operations.length === 0) {
                        var a, b;
                        if (fnName === "beforeSetClass") {
                            a = groupEventedAnimations(element, "removeClass", options, animations, "beforeRemoveClass");
                            b = groupEventedAnimations(element, "addClass", options, animations, "beforeAddClass");
                        } else if (fnName === "setClass") {
                            a = groupEventedAnimations(element, "removeClass", options, animations, "removeClass");
                            b = groupEventedAnimations(element, "addClass", options, animations, "addClass");
                        }
                        if (a) {
                            operations = operations.concat(a);
                        }
                        if (b) {
                            operations = operations.concat(b);
                        }
                    }
                    if (operations.length === 0) return;
                    return function startAnimation(callback) {
                        var runners = [];
                        if (operations.length) {
                            forEach(operations, function(animateFn) {
                                runners.push(animateFn());
                            });
                        }
                        runners.length ? $$AnimateRunner.all(runners, callback) : callback();
                        return function endFn(reject) {
                            forEach(runners, function(runner) {
                                reject ? runner.cancel() : runner.end();
                            });
                        };
                    };
                }
            };
            function lookupAnimations(classes) {
                classes = isArray(classes) ? classes : classes.split(" ");
                var matches = [], flagMap = {};
                for (var i = 0; i < classes.length; i++) {
                    var klass = classes[i], animationFactory = $animateProvider.$$registeredAnimations[klass];
                    if (animationFactory && !flagMap[klass]) {
                        matches.push($injector.get(animationFactory));
                        flagMap[klass] = true;
                    }
                }
                return matches;
            }
        } ];
    } ];
    var $$AnimateJsDriverProvider = [ "$$animationProvider", function($$animationProvider) {
        $$animationProvider.drivers.push("$$animateJsDriver");
        this.$get = [ "$$animateJs", "$$AnimateRunner", function($$animateJs, $$AnimateRunner) {
            return function initDriverFn(animationDetails) {
                if (animationDetails.from && animationDetails.to) {
                    var fromAnimation = prepareAnimation(animationDetails.from);
                    var toAnimation = prepareAnimation(animationDetails.to);
                    if (!fromAnimation && !toAnimation) return;
                    return {
                        start: function() {
                            var animationRunners = [];
                            if (fromAnimation) {
                                animationRunners.push(fromAnimation.start());
                            }
                            if (toAnimation) {
                                animationRunners.push(toAnimation.start());
                            }
                            $$AnimateRunner.all(animationRunners, done);
                            var runner = new $$AnimateRunner({
                                end: endFnFactory(),
                                cancel: endFnFactory()
                            });
                            return runner;
                            function endFnFactory() {
                                return function() {
                                    forEach(animationRunners, function(runner) {
                                        runner.end();
                                    });
                                };
                            }
                            function done(status) {
                                runner.complete(status);
                            }
                        }
                    };
                } else {
                    return prepareAnimation(animationDetails);
                }
            };
            function prepareAnimation(animationDetails) {
                var element = animationDetails.element;
                var event = animationDetails.event;
                var options = animationDetails.options;
                var classes = animationDetails.classes;
                return $$animateJs(element, event, classes, options);
            }
        } ];
    } ];
    var NG_ANIMATE_ATTR_NAME = "data-ng-animate";
    var NG_ANIMATE_PIN_DATA = "$ngAnimatePin";
    var $$AnimateQueueProvider = [ "$animateProvider", function($animateProvider) {
        var PRE_DIGEST_STATE = 1;
        var RUNNING_STATE = 2;
        var rules = this.rules = {
            skip: [],
            cancel: [],
            join: []
        };
        function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
            return rules[ruleType].some(function(fn) {
                return fn(element, currentAnimation, previousAnimation);
            });
        }
        function hasAnimationClasses(options, and) {
            options = options || {};
            var a = (options.addClass || "").length > 0;
            var b = (options.removeClass || "").length > 0;
            return and ? a && b : a || b;
        }
        rules.join.push(function(element, newAnimation, currentAnimation) {
            return !newAnimation.structural && hasAnimationClasses(newAnimation.options);
        });
        rules.skip.push(function(element, newAnimation, currentAnimation) {
            return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);
        });
        rules.skip.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.event == "leave" && newAnimation.structural;
        });
        rules.skip.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.structural && !newAnimation.structural;
        });
        rules.cancel.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.structural && newAnimation.structural;
        });
        rules.cancel.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
        });
        rules.cancel.push(function(element, newAnimation, currentAnimation) {
            var nO = newAnimation.options;
            var cO = currentAnimation.options;
            return nO.addClass && nO.addClass === cO.removeClass || nO.removeClass && nO.removeClass === cO.addClass;
        });
        this.$get = [ "$$rAF", "$rootScope", "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", function($$rAF, $rootScope, $rootElement, $document, $$HashMap, $$animation, $$AnimateRunner, $templateRequest, $$jqLite) {
            var activeAnimationsLookup = new $$HashMap();
            var disabledElementsLookup = new $$HashMap();
            var animationsEnabled = null;
            var deregisterWatch = $rootScope.$watch(function() {
                return $templateRequest.totalPendingRequests === 0;
            }, function(isEmpty) {
                if (!isEmpty) return;
                deregisterWatch();
                $rootScope.$$postDigest(function() {
                    $rootScope.$$postDigest(function() {
                        if (animationsEnabled === null) {
                            animationsEnabled = true;
                        }
                    });
                });
            });
            var bodyElement = jqLite($document[0].body);
            var callbackRegistry = {};
            var classNameFilter = $animateProvider.classNameFilter();
            var isAnimatableClassName = !classNameFilter ? function() {
                return true;
            } : function(className) {
                return classNameFilter.test(className);
            };
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            function normalizeAnimationOptions(element, options) {
                return mergeAnimationOptions(element, options, {});
            }
            function findCallbacks(element, event) {
                var targetNode = getDomNode(element);
                var matches = [];
                var entries = callbackRegistry[event];
                if (entries) {
                    forEach(entries, function(entry) {
                        if (entry.node.contains(targetNode)) {
                            matches.push(entry.callback);
                        }
                    });
                }
                return matches;
            }
            function triggerCallback(event, element, phase, data) {
                $$rAF(function() {
                    forEach(findCallbacks(element, event), function(callback) {
                        callback(element, phase, data);
                    });
                });
            }
            return {
                on: function(event, container, callback) {
                    var node = extractElementNode(container);
                    callbackRegistry[event] = callbackRegistry[event] || [];
                    callbackRegistry[event].push({
                        node: node,
                        callback: callback
                    });
                },
                off: function(event, container, callback) {
                    var entries = callbackRegistry[event];
                    if (!entries) return;
                    callbackRegistry[event] = arguments.length === 1 ? null : filterFromRegistry(entries, container, callback);
                    function filterFromRegistry(list, matchContainer, matchCallback) {
                        var containerNode = extractElementNode(matchContainer);
                        return list.filter(function(entry) {
                            var isMatch = entry.node === containerNode && (!matchCallback || entry.callback === matchCallback);
                            return !isMatch;
                        });
                    }
                },
                pin: function(element, parentElement) {
                    assertArg(isElement(element), "element", "not an element");
                    assertArg(isElement(parentElement), "parentElement", "not an element");
                    element.data(NG_ANIMATE_PIN_DATA, parentElement);
                },
                push: function(element, event, options, domOperation) {
                    options = options || {};
                    options.domOperation = domOperation;
                    return queueAnimation(element, event, options);
                },
                enabled: function(element, bool) {
                    var argCount = arguments.length;
                    if (argCount === 0) {
                        bool = !!animationsEnabled;
                    } else {
                        var hasElement = isElement(element);
                        if (!hasElement) {
                            bool = animationsEnabled = !!element;
                        } else {
                            var node = getDomNode(element);
                            var recordExists = disabledElementsLookup.get(node);
                            if (argCount === 1) {
                                bool = !recordExists;
                            } else {
                                bool = !!bool;
                                if (!bool) {
                                    disabledElementsLookup.put(node, true);
                                } else if (recordExists) {
                                    disabledElementsLookup.remove(node);
                                }
                            }
                        }
                    }
                    return bool;
                }
            };
            function queueAnimation(element, event, options) {
                var node, parent;
                element = stripCommentsFromElement(element);
                if (element) {
                    node = getDomNode(element);
                    parent = element.parent();
                }
                options = prepareAnimationOptions(options);
                var runner = new $$AnimateRunner();
                if (!node) {
                    close();
                    return runner;
                }
                if (isArray(options.addClass)) {
                    options.addClass = options.addClass.join(" ");
                }
                if (isArray(options.removeClass)) {
                    options.removeClass = options.removeClass.join(" ");
                }
                if (options.from && !isObject(options.from)) {
                    options.from = null;
                }
                if (options.to && !isObject(options.to)) {
                    options.to = null;
                }
                var className = [ node.className, options.addClass, options.removeClass ].join(" ");
                if (!isAnimatableClassName(className)) {
                    close();
                    return runner;
                }
                var isStructural = [ "enter", "move", "leave" ].indexOf(event) >= 0;
                var skipAnimations = !animationsEnabled || disabledElementsLookup.get(node);
                var existingAnimation = !skipAnimations && activeAnimationsLookup.get(node) || {};
                var hasExistingAnimation = !!existingAnimation.state;
                if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {
                    skipAnimations = !areAnimationsAllowed(element, parent, event);
                }
                if (skipAnimations) {
                    close();
                    return runner;
                }
                if (isStructural) {
                    closeChildAnimations(element);
                }
                var newAnimation = {
                    structural: isStructural,
                    element: element,
                    event: event,
                    close: close,
                    options: options,
                    runner: runner
                };
                if (hasExistingAnimation) {
                    var skipAnimationFlag = isAllowed("skip", element, newAnimation, existingAnimation);
                    if (skipAnimationFlag) {
                        if (existingAnimation.state === RUNNING_STATE) {
                            close();
                            return runner;
                        } else {
                            mergeAnimationOptions(element, existingAnimation.options, options);
                            return existingAnimation.runner;
                        }
                    }
                    var cancelAnimationFlag = isAllowed("cancel", element, newAnimation, existingAnimation);
                    if (cancelAnimationFlag) {
                        if (existingAnimation.state === RUNNING_STATE) {
                            existingAnimation.runner.end();
                        } else if (existingAnimation.structural) {
                            existingAnimation.close();
                        } else {
                            mergeAnimationOptions(element, newAnimation.options, existingAnimation.options);
                        }
                    } else {
                        var joinAnimationFlag = isAllowed("join", element, newAnimation, existingAnimation);
                        if (joinAnimationFlag) {
                            if (existingAnimation.state === RUNNING_STATE) {
                                normalizeAnimationOptions(element, options);
                            } else {
                                event = newAnimation.event = existingAnimation.event;
                                options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);
                                return runner;
                            }
                        }
                    }
                } else {
                    normalizeAnimationOptions(element, options);
                }
                var isValidAnimation = newAnimation.structural;
                if (!isValidAnimation) {
                    isValidAnimation = newAnimation.event === "animate" && Object.keys(newAnimation.options.to || {}).length > 0 || hasAnimationClasses(newAnimation.options);
                }
                if (!isValidAnimation) {
                    close();
                    clearElementAnimationState(element);
                    return runner;
                }
                if (isStructural) {
                    closeParentClassBasedAnimations(parent);
                }
                var counter = (existingAnimation.counter || 0) + 1;
                newAnimation.counter = counter;
                markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);
                $rootScope.$$postDigest(function() {
                    var animationDetails = activeAnimationsLookup.get(node);
                    var animationCancelled = !animationDetails;
                    animationDetails = animationDetails || {};
                    var parentElement = element.parent() || [];
                    var isValidAnimation = parentElement.length > 0 && (animationDetails.event === "animate" || animationDetails.structural || hasAnimationClasses(animationDetails.options));
                    if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {
                        if (animationCancelled) {
                            applyAnimationClasses(element, options);
                            applyAnimationStyles(element, options);
                        }
                        if (animationCancelled || isStructural && animationDetails.event !== event) {
                            options.domOperation();
                            runner.end();
                        }
                        if (!isValidAnimation) {
                            clearElementAnimationState(element);
                        }
                        return;
                    }
                    event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, true) ? "setClass" : animationDetails.event;
                    if (animationDetails.structural) {
                        closeParentClassBasedAnimations(parentElement);
                    }
                    markElementAnimationState(element, RUNNING_STATE);
                    var realRunner = $$animation(element, event, animationDetails.options);
                    realRunner.done(function(status) {
                        close(!status);
                        var animationDetails = activeAnimationsLookup.get(node);
                        if (animationDetails && animationDetails.counter === counter) {
                            clearElementAnimationState(getDomNode(element));
                        }
                        notifyProgress(runner, event, "close", {});
                    });
                    runner.setHost(realRunner);
                    notifyProgress(runner, event, "start", {});
                });
                return runner;
                function notifyProgress(runner, event, phase, data) {
                    triggerCallback(event, element, phase, data);
                    runner.progress(event, phase, data);
                }
                function close(reject) {
                    applyAnimationClasses(element, options);
                    applyAnimationStyles(element, options);
                    options.domOperation();
                    runner.complete(!reject);
                }
            }
            function closeChildAnimations(element) {
                var node = getDomNode(element);
                var children = node.querySelectorAll("[" + NG_ANIMATE_ATTR_NAME + "]");
                forEach(children, function(child) {
                    var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));
                    var animationDetails = activeAnimationsLookup.get(child);
                    switch (state) {
                      case RUNNING_STATE:
                        animationDetails.runner.end();

                      case PRE_DIGEST_STATE:
                        if (animationDetails) {
                            activeAnimationsLookup.remove(child);
                        }
                        break;
                    }
                });
            }
            function clearElementAnimationState(element) {
                var node = getDomNode(element);
                node.removeAttribute(NG_ANIMATE_ATTR_NAME);
                activeAnimationsLookup.remove(node);
            }
            function isMatchingElement(nodeOrElmA, nodeOrElmB) {
                return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
            }
            function closeParentClassBasedAnimations(startingElement) {
                var parentNode = getDomNode(startingElement);
                do {
                    if (!parentNode || parentNode.nodeType !== ELEMENT_NODE) break;
                    var animationDetails = activeAnimationsLookup.get(parentNode);
                    if (animationDetails) {
                        examineParentAnimation(parentNode, animationDetails);
                    }
                    parentNode = parentNode.parentNode;
                } while (true);
                function examineParentAnimation(node, animationDetails) {
                    if (animationDetails.structural || !hasAnimationClasses(animationDetails.options)) return;
                    if (animationDetails.state === RUNNING_STATE) {
                        animationDetails.runner.end();
                    }
                    clearElementAnimationState(node);
                }
            }
            function areAnimationsAllowed(element, parentElement, event) {
                var bodyElementDetected = false;
                var rootElementDetected = false;
                var parentAnimationDetected = false;
                var animateChildren;
                var parentHost = element.data(NG_ANIMATE_PIN_DATA);
                if (parentHost) {
                    parentElement = parentHost;
                }
                while (parentElement && parentElement.length) {
                    if (!rootElementDetected) {
                        rootElementDetected = isMatchingElement(parentElement, $rootElement);
                    }
                    var parentNode = parentElement[0];
                    if (parentNode.nodeType !== ELEMENT_NODE) {
                        break;
                    }
                    var details = activeAnimationsLookup.get(parentNode) || {};
                    if (!parentAnimationDetected) {
                        parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode);
                    }
                    if (isUndefined(animateChildren) || animateChildren === true) {
                        var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);
                        if (isDefined(value)) {
                            animateChildren = value;
                        }
                    }
                    if (parentAnimationDetected && animateChildren === false) break;
                    if (!rootElementDetected) {
                        rootElementDetected = isMatchingElement(parentElement, $rootElement);
                        if (!rootElementDetected) {
                            parentHost = parentElement.data(NG_ANIMATE_PIN_DATA);
                            if (parentHost) {
                                parentElement = parentHost;
                            }
                        }
                    }
                    if (!bodyElementDetected) {
                        bodyElementDetected = isMatchingElement(parentElement, bodyElement);
                    }
                    parentElement = parentElement.parent();
                }
                var allowAnimation = !parentAnimationDetected || animateChildren;
                return allowAnimation && rootElementDetected && bodyElementDetected;
            }
            function markElementAnimationState(element, state, details) {
                details = details || {};
                details.state = state;
                var node = getDomNode(element);
                node.setAttribute(NG_ANIMATE_ATTR_NAME, state);
                var oldValue = activeAnimationsLookup.get(node);
                var newValue = oldValue ? extend(oldValue, details) : details;
                activeAnimationsLookup.put(node, newValue);
            }
        } ];
    } ];
    var $$rAFMutexFactory = [ "$$rAF", function($$rAF) {
        return function() {
            var passed = false;
            $$rAF(function() {
                passed = true;
            });
            return function(fn) {
                passed ? fn() : $$rAF(fn);
            };
        };
    } ];
    var $$AnimateRunnerFactory = [ "$q", "$$rAFMutex", function($q, $$rAFMutex) {
        var INITIAL_STATE = 0;
        var DONE_PENDING_STATE = 1;
        var DONE_COMPLETE_STATE = 2;
        AnimateRunner.chain = function(chain, callback) {
            var index = 0;
            next();
            function next() {
                if (index === chain.length) {
                    callback(true);
                    return;
                }
                chain[index](function(response) {
                    if (response === false) {
                        callback(false);
                        return;
                    }
                    index++;
                    next();
                });
            }
        };
        AnimateRunner.all = function(runners, callback) {
            var count = 0;
            var status = true;
            forEach(runners, function(runner) {
                runner.done(onProgress);
            });
            function onProgress(response) {
                status = status && response;
                if (++count === runners.length) {
                    callback(status);
                }
            }
        };
        function AnimateRunner(host) {
            this.setHost(host);
            this._doneCallbacks = [];
            this._runInAnimationFrame = $$rAFMutex();
            this._state = 0;
        }
        AnimateRunner.prototype = {
            setHost: function(host) {
                this.host = host || {};
            },
            done: function(fn) {
                if (this._state === DONE_COMPLETE_STATE) {
                    fn();
                } else {
                    this._doneCallbacks.push(fn);
                }
            },
            progress: noop,
            getPromise: function() {
                if (!this.promise) {
                    var self = this;
                    this.promise = $q(function(resolve, reject) {
                        self.done(function(status) {
                            status === false ? reject() : resolve();
                        });
                    });
                }
                return this.promise;
            },
            then: function(resolveHandler, rejectHandler) {
                return this.getPromise().then(resolveHandler, rejectHandler);
            },
            "catch": function(handler) {
                return this.getPromise()["catch"](handler);
            },
            "finally": function(handler) {
                return this.getPromise()["finally"](handler);
            },
            pause: function() {
                if (this.host.pause) {
                    this.host.pause();
                }
            },
            resume: function() {
                if (this.host.resume) {
                    this.host.resume();
                }
            },
            end: function() {
                if (this.host.end) {
                    this.host.end();
                }
                this._resolve(true);
            },
            cancel: function() {
                if (this.host.cancel) {
                    this.host.cancel();
                }
                this._resolve(false);
            },
            complete: function(response) {
                var self = this;
                if (self._state === INITIAL_STATE) {
                    self._state = DONE_PENDING_STATE;
                    self._runInAnimationFrame(function() {
                        self._resolve(response);
                    });
                }
            },
            _resolve: function(response) {
                if (this._state !== DONE_COMPLETE_STATE) {
                    forEach(this._doneCallbacks, function(fn) {
                        fn(response);
                    });
                    this._doneCallbacks.length = 0;
                    this._state = DONE_COMPLETE_STATE;
                }
            }
        };
        return AnimateRunner;
    } ];
    var $$AnimationProvider = [ "$animateProvider", function($animateProvider) {
        var NG_ANIMATE_REF_ATTR = "ng-animate-ref";
        var drivers = this.drivers = [];
        var RUNNER_STORAGE_KEY = "$$animationRunner";
        function setRunner(element, runner) {
            element.data(RUNNER_STORAGE_KEY, runner);
        }
        function removeRunner(element) {
            element.removeData(RUNNER_STORAGE_KEY);
        }
        function getRunner(element) {
            return element.data(RUNNER_STORAGE_KEY);
        }
        this.$get = [ "$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$rAFScheduler", function($$jqLite, $rootScope, $injector, $$AnimateRunner, $$rAFScheduler) {
            var animationQueue = [];
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            var totalPendingClassBasedAnimations = 0;
            var totalActiveClassBasedAnimations = 0;
            var classBasedAnimationsQueue = [];
            return function(element, event, options) {
                options = prepareAnimationOptions(options);
                var isStructural = [ "enter", "move", "leave" ].indexOf(event) >= 0;
                var runner = new $$AnimateRunner({
                    end: function() {
                        close();
                    },
                    cancel: function() {
                        close(true);
                    }
                });
                if (!drivers.length) {
                    close();
                    return runner;
                }
                setRunner(element, runner);
                var classes = mergeClasses(element.attr("class"), mergeClasses(options.addClass, options.removeClass));
                var tempClasses = options.tempClasses;
                if (tempClasses) {
                    classes += " " + tempClasses;
                    options.tempClasses = null;
                }
                var classBasedIndex;
                if (!isStructural) {
                    classBasedIndex = totalPendingClassBasedAnimations;
                    totalPendingClassBasedAnimations += 1;
                }
                animationQueue.push({
                    element: element,
                    classes: classes,
                    event: event,
                    classBasedIndex: classBasedIndex,
                    structural: isStructural,
                    options: options,
                    beforeStart: beforeStart,
                    close: close
                });
                element.on("$destroy", handleDestroyedElement);
                if (animationQueue.length > 1) return runner;
                $rootScope.$$postDigest(function() {
                    totalActiveClassBasedAnimations = totalPendingClassBasedAnimations;
                    totalPendingClassBasedAnimations = 0;
                    classBasedAnimationsQueue.length = 0;
                    var animations = [];
                    forEach(animationQueue, function(entry) {
                        if (getRunner(entry.element)) {
                            animations.push(entry);
                        }
                    });
                    animationQueue.length = 0;
                    forEach(groupAnimations(animations), function(animationEntry) {
                        if (animationEntry.structural) {
                            triggerAnimationStart();
                        } else {
                            classBasedAnimationsQueue.push({
                                node: getDomNode(animationEntry.element),
                                fn: triggerAnimationStart
                            });
                            if (animationEntry.classBasedIndex === totalActiveClassBasedAnimations - 1) {
                                classBasedAnimationsQueue = classBasedAnimationsQueue.sort(function(a, b) {
                                    return b.node.contains(a.node);
                                }).map(function(entry) {
                                    return entry.fn;
                                });
                                $$rAFScheduler(classBasedAnimationsQueue);
                            }
                        }
                        function triggerAnimationStart() {
                            animationEntry.beforeStart();
                            var startAnimationFn, closeFn = animationEntry.close;
                            var targetElement = animationEntry.anchors ? animationEntry.from.element || animationEntry.to.element : animationEntry.element;
                            if (getRunner(targetElement)) {
                                var operation = invokeFirstDriver(animationEntry);
                                if (operation) {
                                    startAnimationFn = operation.start;
                                }
                            }
                            if (!startAnimationFn) {
                                closeFn();
                            } else {
                                var animationRunner = startAnimationFn();
                                animationRunner.done(function(status) {
                                    closeFn(!status);
                                });
                                updateAnimationRunners(animationEntry, animationRunner);
                            }
                        }
                    });
                });
                return runner;
                function getAnchorNodes(node) {
                    var SELECTOR = "[" + NG_ANIMATE_REF_ATTR + "]";
                    var items = node.hasAttribute(NG_ANIMATE_REF_ATTR) ? [ node ] : node.querySelectorAll(SELECTOR);
                    var anchors = [];
                    forEach(items, function(node) {
                        var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
                        if (attr && attr.length) {
                            anchors.push(node);
                        }
                    });
                    return anchors;
                }
                function groupAnimations(animations) {
                    var preparedAnimations = [];
                    var refLookup = {};
                    forEach(animations, function(animation, index) {
                        var element = animation.element;
                        var node = getDomNode(element);
                        var event = animation.event;
                        var enterOrMove = [ "enter", "move" ].indexOf(event) >= 0;
                        var anchorNodes = animation.structural ? getAnchorNodes(node) : [];
                        if (anchorNodes.length) {
                            var direction = enterOrMove ? "to" : "from";
                            forEach(anchorNodes, function(anchor) {
                                var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
                                refLookup[key] = refLookup[key] || {};
                                refLookup[key][direction] = {
                                    animationID: index,
                                    element: jqLite(anchor)
                                };
                            });
                        } else {
                            preparedAnimations.push(animation);
                        }
                    });
                    var usedIndicesLookup = {};
                    var anchorGroups = {};
                    forEach(refLookup, function(operations, key) {
                        var from = operations.from;
                        var to = operations.to;
                        if (!from || !to) {
                            var index = from ? from.animationID : to.animationID;
                            var indexKey = index.toString();
                            if (!usedIndicesLookup[indexKey]) {
                                usedIndicesLookup[indexKey] = true;
                                preparedAnimations.push(animations[index]);
                            }
                            return;
                        }
                        var fromAnimation = animations[from.animationID];
                        var toAnimation = animations[to.animationID];
                        var lookupKey = from.animationID.toString();
                        if (!anchorGroups[lookupKey]) {
                            var group = anchorGroups[lookupKey] = {
                                structural: true,
                                beforeStart: function() {
                                    fromAnimation.beforeStart();
                                    toAnimation.beforeStart();
                                },
                                close: function() {
                                    fromAnimation.close();
                                    toAnimation.close();
                                },
                                classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
                                from: fromAnimation,
                                to: toAnimation,
                                anchors: []
                            };
                            if (group.classes.length) {
                                preparedAnimations.push(group);
                            } else {
                                preparedAnimations.push(fromAnimation);
                                preparedAnimations.push(toAnimation);
                            }
                        }
                        anchorGroups[lookupKey].anchors.push({
                            out: from.element,
                            "in": to.element
                        });
                    });
                    return preparedAnimations;
                }
                function cssClassesIntersection(a, b) {
                    a = a.split(" ");
                    b = b.split(" ");
                    var matches = [];
                    for (var i = 0; i < a.length; i++) {
                        var aa = a[i];
                        if (aa.substring(0, 3) === "ng-") continue;
                        for (var j = 0; j < b.length; j++) {
                            if (aa === b[j]) {
                                matches.push(aa);
                                break;
                            }
                        }
                    }
                    return matches.join(" ");
                }
                function invokeFirstDriver(animationDetails) {
                    for (var i = drivers.length - 1; i >= 0; i--) {
                        var driverName = drivers[i];
                        if (!$injector.has(driverName)) continue;
                        var factory = $injector.get(driverName);
                        var driver = factory(animationDetails);
                        if (driver) {
                            return driver;
                        }
                    }
                }
                function beforeStart() {
                    element.addClass(NG_ANIMATE_CLASSNAME);
                    if (tempClasses) {
                        $$jqLite.addClass(element, tempClasses);
                    }
                }
                function updateAnimationRunners(animation, newRunner) {
                    if (animation.from && animation.to) {
                        update(animation.from.element);
                        update(animation.to.element);
                    } else {
                        update(animation.element);
                    }
                    function update(element) {
                        getRunner(element).setHost(newRunner);
                    }
                }
                function handleDestroyedElement() {
                    var runner = getRunner(element);
                    if (runner && (event !== "leave" || !options.$$domOperationFired)) {
                        runner.end();
                    }
                }
                function close(rejected) {
                    element.off("$destroy", handleDestroyedElement);
                    removeRunner(element);
                    applyAnimationClasses(element, options);
                    applyAnimationStyles(element, options);
                    options.domOperation();
                    if (tempClasses) {
                        $$jqLite.removeClass(element, tempClasses);
                    }
                    element.removeClass(NG_ANIMATE_CLASSNAME);
                    runner.complete(!rejected);
                }
            };
        } ];
    } ];
    angular.module("ngAnimate", []).directive("ngAnimateChildren", $$AnimateChildrenDirective).factory("$$rAFMutex", $$rAFMutexFactory).factory("$$rAFScheduler", $$rAFSchedulerFactory).factory("$$AnimateRunner", $$AnimateRunnerFactory).provider("$$animateQueue", $$AnimateQueueProvider).provider("$$animation", $$AnimationProvider).provider("$animateCss", $AnimateCssProvider).provider("$$animateCssDriver", $$AnimateCssDriverProvider).provider("$$animateJs", $$AnimateJsProvider).provider("$$animateJsDriver", $$AnimateJsDriverProvider);
})(window, window.angular);
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = "ui.router";
}

(function(window, angular, undefined) {
    "use strict";
    var isDefined = angular.isDefined, isFunction = angular.isFunction, isString = angular.isString, isObject = angular.isObject, isArray = angular.isArray, forEach = angular.forEach, extend = angular.extend, copy = angular.copy;
    function inherit(parent, extra) {
        return extend(new (extend(function() {}, {
            prototype: parent
        }))(), extra);
    }
    function merge(dst) {
        forEach(arguments, function(obj) {
            if (obj !== dst) {
                forEach(obj, function(value, key) {
                    if (!dst.hasOwnProperty(key)) dst[key] = value;
                });
            }
        });
        return dst;
    }
    function ancestors(first, second) {
        var path = [];
        for (var n in first.path) {
            if (first.path[n] !== second.path[n]) break;
            path.push(first.path[n]);
        }
        return path;
    }
    function objectKeys(object) {
        if (Object.keys) {
            return Object.keys(object);
        }
        var result = [];
        forEach(object, function(val, key) {
            result.push(key);
        });
        return result;
    }
    function indexOf(array, value) {
        if (Array.prototype.indexOf) {
            return array.indexOf(value, Number(arguments[2]) || 0);
        }
        var len = array.length >>> 0, from = Number(arguments[2]) || 0;
        from = from < 0 ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (;from < len; from++) {
            if (from in array && array[from] === value) return from;
        }
        return -1;
    }
    function inheritParams(currentParams, newParams, $current, $to) {
        var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
        for (var i in parents) {
            if (!parents[i].params) continue;
            parentParams = objectKeys(parents[i].params);
            if (!parentParams.length) continue;
            for (var j in parentParams) {
                if (indexOf(inheritList, parentParams[j]) >= 0) continue;
                inheritList.push(parentParams[j]);
                inherited[parentParams[j]] = currentParams[parentParams[j]];
            }
        }
        return extend({}, inherited, newParams);
    }
    function equalForKeys(a, b, keys) {
        if (!keys) {
            keys = [];
            for (var n in a) keys.push(n);
        }
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (a[k] != b[k]) return false;
        }
        return true;
    }
    function filterByKeys(keys, values) {
        var filtered = {};
        forEach(keys, function(name) {
            filtered[name] = values[name];
        });
        return filtered;
    }
    function indexBy(array, propName) {
        var result = {};
        forEach(array, function(item) {
            result[item[propName]] = item;
        });
        return result;
    }
    function pick(obj) {
        var copy = {};
        var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        forEach(keys, function(key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    }
    function omit(obj) {
        var copy = {};
        var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var key in obj) {
            if (indexOf(keys, key) == -1) copy[key] = obj[key];
        }
        return copy;
    }
    function pluck(collection, key) {
        var result = isArray(collection) ? [] : {};
        forEach(collection, function(val, i) {
            result[i] = isFunction(key) ? key(val) : val[key];
        });
        return result;
    }
    function filter(collection, callback) {
        var array = isArray(collection);
        var result = array ? [] : {};
        forEach(collection, function(val, i) {
            if (callback(val, i)) {
                result[array ? result.length : i] = val;
            }
        });
        return result;
    }
    function map(collection, callback) {
        var result = isArray(collection) ? [] : {};
        forEach(collection, function(val, i) {
            result[i] = callback(val, i);
        });
        return result;
    }
    angular.module("ui.router.util", [ "ng" ]);
    angular.module("ui.router.router", [ "ui.router.util" ]);
    angular.module("ui.router.state", [ "ui.router.router", "ui.router.util" ]);
    angular.module("ui.router", [ "ui.router.state" ]);
    angular.module("ui.router.compat", [ "ui.router" ]);
    $Resolve.$inject = [ "$q", "$injector" ];
    function $Resolve($q, $injector) {
        var VISIT_IN_PROGRESS = 1, VISIT_DONE = 2, NOTHING = {}, NO_DEPENDENCIES = [], NO_LOCALS = NOTHING, NO_PARENT = extend($q.when(NOTHING), {
            $$promises: NOTHING,
            $$values: NOTHING
        });
        this.study = function(invocables) {
            if (!isObject(invocables)) throw new Error("'invocables' must be an object");
            var invocableKeys = objectKeys(invocables || {});
            var plan = [], cycle = [], visited = {};
            function visit(value, key) {
                if (visited[key] === VISIT_DONE) return;
                cycle.push(key);
                if (visited[key] === VISIT_IN_PROGRESS) {
                    cycle.splice(0, indexOf(cycle, key));
                    throw new Error("Cyclic dependency: " + cycle.join(" -> "));
                }
                visited[key] = VISIT_IN_PROGRESS;
                if (isString(value)) {
                    plan.push(key, [ function() {
                        return $injector.get(value);
                    } ], NO_DEPENDENCIES);
                } else {
                    var params = $injector.annotate(value);
                    forEach(params, function(param) {
                        if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
                    });
                    plan.push(key, value, params);
                }
                cycle.pop();
                visited[key] = VISIT_DONE;
            }
            forEach(invocables, visit);
            invocables = cycle = visited = null;
            function isResolve(value) {
                return isObject(value) && value.then && value.$$promises;
            }
            return function(locals, parent, self) {
                if (isResolve(locals) && self === undefined) {
                    self = parent;
                    parent = locals;
                    locals = null;
                }
                if (!locals) locals = NO_LOCALS; else if (!isObject(locals)) {
                    throw new Error("'locals' must be an object");
                }
                if (!parent) parent = NO_PARENT; else if (!isResolve(parent)) {
                    throw new Error("'parent' must be a promise returned by $resolve.resolve()");
                }
                var resolution = $q.defer(), result = resolution.promise, promises = result.$$promises = {}, values = extend({}, locals), wait = 1 + plan.length / 3, merged = false;
                function done() {
                    if (!--wait) {
                        if (!merged) merge(values, parent.$$values);
                        result.$$values = values;
                        result.$$promises = result.$$promises || true;
                        delete result.$$inheritedValues;
                        resolution.resolve(values);
                    }
                }
                function fail(reason) {
                    result.$$failure = reason;
                    resolution.reject(reason);
                }
                if (isDefined(parent.$$failure)) {
                    fail(parent.$$failure);
                    return result;
                }
                if (parent.$$inheritedValues) {
                    merge(values, omit(parent.$$inheritedValues, invocableKeys));
                }
                extend(promises, parent.$$promises);
                if (parent.$$values) {
                    merged = merge(values, omit(parent.$$values, invocableKeys));
                    result.$$inheritedValues = omit(parent.$$values, invocableKeys);
                    done();
                } else {
                    if (parent.$$inheritedValues) {
                        result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
                    }
                    parent.then(done, fail);
                }
                for (var i = 0, ii = plan.length; i < ii; i += 3) {
                    if (locals.hasOwnProperty(plan[i])) done(); else invoke(plan[i], plan[i + 1], plan[i + 2]);
                }
                function invoke(key, invocable, params) {
                    var invocation = $q.defer(), waitParams = 0;
                    function onfailure(reason) {
                        invocation.reject(reason);
                        fail(reason);
                    }
                    forEach(params, function(dep) {
                        if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
                            waitParams++;
                            promises[dep].then(function(result) {
                                values[dep] = result;
                                if (!--waitParams) proceed();
                            }, onfailure);
                        }
                    });
                    if (!waitParams) proceed();
                    function proceed() {
                        if (isDefined(result.$$failure)) return;
                        try {
                            invocation.resolve($injector.invoke(invocable, self, values));
                            invocation.promise.then(function(result) {
                                values[key] = result;
                                done();
                            }, onfailure);
                        } catch (e) {
                            onfailure(e);
                        }
                    }
                    promises[key] = invocation.promise;
                }
                return result;
            };
        };
        this.resolve = function(invocables, locals, parent, self) {
            return this.study(invocables)(locals, parent, self);
        };
    }
    angular.module("ui.router.util").service("$resolve", $Resolve);
    $TemplateFactory.$inject = [ "$http", "$templateCache", "$injector" ];
    function $TemplateFactory($http, $templateCache, $injector) {
        this.fromConfig = function(config, params, locals) {
            return isDefined(config.template) ? this.fromString(config.template, params) : isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) : isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) : null;
        };
        this.fromString = function(template, params) {
            return isFunction(template) ? template(params) : template;
        };
        this.fromUrl = function(url, params) {
            if (isFunction(url)) url = url(params);
            if (url == null) return null; else return $http.get(url, {
                cache: $templateCache,
                headers: {
                    Accept: "text/html"
                }
            }).then(function(response) {
                return response.data;
            });
        };
        this.fromProvider = function(provider, params, locals) {
            return $injector.invoke(provider, null, locals || {
                params: params
            });
        };
    }
    angular.module("ui.router.util").service("$templateFactory", $TemplateFactory);
    var $$UMFP;
    function UrlMatcher(pattern, config, parentMatcher) {
        config = extend({
            params: {}
        }, isObject(config) ? config : {});
        var placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, searchPlaceholder = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, compiled = "^", last = 0, m, segments = this.segments = [], parentParams = parentMatcher ? parentMatcher.params : {}, params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(), paramNames = [];
        function addParameter(id, type, config, location) {
            paramNames.push(id);
            if (parentParams[id]) return parentParams[id];
            if (!/^\w+(-+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
            if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
            params[id] = new $$UMFP.Param(id, type, config, location);
            return params[id];
        }
        function quoteRegExp(string, pattern, squash, optional) {
            var surroundPattern = [ "", "" ], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!pattern) return result;
            switch (squash) {
              case false:
                surroundPattern = [ "(", ")" + (optional ? "?" : "") ];
                break;

              case true:
                surroundPattern = [ "?(", ")?" ];
                break;

              default:
                surroundPattern = [ "(" + squash + "|", ")?" ];
                break;
            }
            return result + surroundPattern[0] + pattern + surroundPattern[1];
        }
        this.source = pattern;
        function matchDetails(m, isSearch) {
            var id, regexp, segment, type, cfg, arrayMode;
            id = m[2] || m[3];
            cfg = config.params[id];
            segment = pattern.substring(last, m.index);
            regexp = isSearch ? m[4] : m[4] || (m[1] == "*" ? ".*" : null);
            type = $$UMFP.type(regexp || "string") || inherit($$UMFP.type("string"), {
                pattern: new RegExp(regexp, config.caseInsensitive ? "i" : undefined)
            });
            return {
                id: id,
                regexp: regexp,
                segment: segment,
                type: type,
                cfg: cfg
            };
        }
        var p, param, segment;
        while (m = placeholder.exec(pattern)) {
            p = matchDetails(m, false);
            if (p.segment.indexOf("?") >= 0) break;
            param = addParameter(p.id, p.type, p.cfg, "path");
            compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);
            segments.push(p.segment);
            last = placeholder.lastIndex;
        }
        segment = pattern.substring(last);
        var i = segment.indexOf("?");
        if (i >= 0) {
            var search = this.sourceSearch = segment.substring(i);
            segment = segment.substring(0, i);
            this.sourcePath = pattern.substring(0, last + i);
            if (search.length > 0) {
                last = 0;
                while (m = searchPlaceholder.exec(search)) {
                    p = matchDetails(m, true);
                    param = addParameter(p.id, p.type, p.cfg, "search");
                    last = placeholder.lastIndex;
                }
            }
        } else {
            this.sourcePath = pattern;
            this.sourceSearch = "";
        }
        compiled += quoteRegExp(segment) + (config.strict === false ? "/?" : "") + "$";
        segments.push(segment);
        this.regexp = new RegExp(compiled, config.caseInsensitive ? "i" : undefined);
        this.prefix = segments[0];
        this.$$paramNames = paramNames;
    }
    UrlMatcher.prototype.concat = function(pattern, config) {
        var defaultConfig = {
            caseInsensitive: $$UMFP.caseInsensitive(),
            strict: $$UMFP.strictMode(),
            squash: $$UMFP.defaultSquashPolicy()
        };
        return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
    };
    UrlMatcher.prototype.toString = function() {
        return this.source;
    };
    UrlMatcher.prototype.exec = function(path, searchParams) {
        var m = this.regexp.exec(path);
        if (!m) return null;
        searchParams = searchParams || {};
        var paramNames = this.parameters(), nTotal = paramNames.length, nPath = this.segments.length - 1, values = {}, i, j, cfg, paramName;
        if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
        function decodePathArray(string) {
            function reverseString(str) {
                return str.split("").reverse().join("");
            }
            function unquoteDashes(str) {
                return str.replace(/\\-/g, "-");
            }
            var split = reverseString(string).split(/-(?!\\)/);
            var allReversed = map(split, reverseString);
            return map(allReversed, unquoteDashes).reverse();
        }
        for (i = 0; i < nPath; i++) {
            paramName = paramNames[i];
            var param = this.params[paramName];
            var paramVal = m[i + 1];
            for (j = 0; j < param.replace; j++) {
                if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
            }
            if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
            values[paramName] = param.value(paramVal);
        }
        for (;i < nTotal; i++) {
            paramName = paramNames[i];
            values[paramName] = this.params[paramName].value(searchParams[paramName]);
        }
        return values;
    };
    UrlMatcher.prototype.parameters = function(param) {
        if (!isDefined(param)) return this.$$paramNames;
        return this.params[param] || null;
    };
    UrlMatcher.prototype.validates = function(params) {
        return this.params.$$validates(params);
    };
    UrlMatcher.prototype.format = function(values) {
        values = values || {};
        var segments = this.segments, params = this.parameters(), paramset = this.params;
        if (!this.validates(values)) return null;
        var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];
        function encodeDashes(str) {
            return encodeURIComponent(str).replace(/-/g, function(c) {
                return "%5C%" + c.charCodeAt(0).toString(16).toUpperCase();
            });
        }
        for (i = 0; i < nTotal; i++) {
            var isPathParam = i < nPath;
            var name = params[i], param = paramset[name], value = param.value(values[name]);
            var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
            var squash = isDefaultValue ? param.squash : false;
            var encoded = param.type.encode(value);
            if (isPathParam) {
                var nextSegment = segments[i + 1];
                if (squash === false) {
                    if (encoded != null) {
                        if (isArray(encoded)) {
                            result += map(encoded, encodeDashes).join("-");
                        } else {
                            result += encodeURIComponent(encoded);
                        }
                    }
                    result += nextSegment;
                } else if (squash === true) {
                    var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                    result += nextSegment.match(capture)[1];
                } else if (isString(squash)) {
                    result += squash + nextSegment;
                }
            } else {
                if (encoded == null || isDefaultValue && squash !== false) continue;
                if (!isArray(encoded)) encoded = [ encoded ];
                encoded = map(encoded, encodeURIComponent).join("&" + name + "=");
                result += (search ? "&" : "?") + (name + "=" + encoded);
                search = true;
            }
        }
        return result;
    };
    function Type(config) {
        extend(this, config);
    }
    Type.prototype.is = function(val, key) {
        return true;
    };
    Type.prototype.encode = function(val, key) {
        return val;
    };
    Type.prototype.decode = function(val, key) {
        return val;
    };
    Type.prototype.equals = function(a, b) {
        return a == b;
    };
    Type.prototype.$subPattern = function() {
        var sub = this.pattern.toString();
        return sub.substr(1, sub.length - 2);
    };
    Type.prototype.pattern = /.*/;
    Type.prototype.toString = function() {
        return "{Type:" + this.name + "}";
    };
    Type.prototype.$normalize = function(val) {
        return this.is(val) ? val : this.decode(val);
    };
    Type.prototype.$asArray = function(mode, isSearch) {
        if (!mode) return this;
        if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");
        function ArrayType(type, mode) {
            function bindTo(type, callbackName) {
                return function() {
                    return type[callbackName].apply(type, arguments);
                };
            }
            function arrayWrap(val) {
                return isArray(val) ? val : isDefined(val) ? [ val ] : [];
            }
            function arrayUnwrap(val) {
                switch (val.length) {
                  case 0:
                    return undefined;

                  case 1:
                    return mode === "auto" ? val[0] : val;

                  default:
                    return val;
                }
            }
            function falsey(val) {
                return !val;
            }
            function arrayHandler(callback, allTruthyMode) {
                return function handleArray(val) {
                    val = arrayWrap(val);
                    var result = map(val, callback);
                    if (allTruthyMode === true) return filter(result, falsey).length === 0;
                    return arrayUnwrap(result);
                };
            }
            function arrayEqualsHandler(callback) {
                return function handleArray(val1, val2) {
                    var left = arrayWrap(val1), right = arrayWrap(val2);
                    if (left.length !== right.length) return false;
                    for (var i = 0; i < left.length; i++) {
                        if (!callback(left[i], right[i])) return false;
                    }
                    return true;
                };
            }
            this.encode = arrayHandler(bindTo(type, "encode"));
            this.decode = arrayHandler(bindTo(type, "decode"));
            this.is = arrayHandler(bindTo(type, "is"), true);
            this.equals = arrayEqualsHandler(bindTo(type, "equals"));
            this.pattern = type.pattern;
            this.$normalize = arrayHandler(bindTo(type, "$normalize"));
            this.name = type.name;
            this.$arrayMode = mode;
        }
        return new ArrayType(this, mode);
    };
    function $UrlMatcherFactory() {
        $$UMFP = this;
        var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;
        function valToString(val) {
            return val != null ? val.toString().replace(/\//g, "%2F") : val;
        }
        function valFromString(val) {
            return val != null ? val.toString().replace(/%2F/g, "/") : val;
        }
        var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {
            string: {
                encode: valToString,
                decode: valFromString,
                is: function(val) {
                    return val == null || !isDefined(val) || typeof val === "string";
                },
                pattern: /[^/]*/
            },
            "int": {
                encode: valToString,
                decode: function(val) {
                    return parseInt(val, 10);
                },
                is: function(val) {
                    return isDefined(val) && this.decode(val.toString()) === val;
                },
                pattern: /\d+/
            },
            bool: {
                encode: function(val) {
                    return val ? 1 : 0;
                },
                decode: function(val) {
                    return parseInt(val, 10) !== 0;
                },
                is: function(val) {
                    return val === true || val === false;
                },
                pattern: /0|1/
            },
            date: {
                encode: function(val) {
                    if (!this.is(val)) return undefined;
                    return [ val.getFullYear(), ("0" + (val.getMonth() + 1)).slice(-2), ("0" + val.getDate()).slice(-2) ].join("-");
                },
                decode: function(val) {
                    if (this.is(val)) return val;
                    var match = this.capture.exec(val);
                    return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
                },
                is: function(val) {
                    return val instanceof Date && !isNaN(val.valueOf());
                },
                equals: function(a, b) {
                    return this.is(a) && this.is(b) && a.toISOString() === b.toISOString();
                },
                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            },
            json: {
                encode: angular.toJson,
                decode: angular.fromJson,
                is: angular.isObject,
                equals: angular.equals,
                pattern: /[^/]*/
            },
            any: {
                encode: angular.identity,
                decode: angular.identity,
                equals: angular.equals,
                pattern: /.*/
            }
        };
        function getDefaultConfig() {
            return {
                strict: isStrictMode,
                caseInsensitive: isCaseInsensitive
            };
        }
        function isInjectable(value) {
            return isFunction(value) || isArray(value) && isFunction(value[value.length - 1]);
        }
        $UrlMatcherFactory.$$getDefaultValue = function(config) {
            if (!isInjectable(config.value)) return config.value;
            if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
            return injector.invoke(config.value);
        };
        this.caseInsensitive = function(value) {
            if (isDefined(value)) isCaseInsensitive = value;
            return isCaseInsensitive;
        };
        this.strictMode = function(value) {
            if (isDefined(value)) isStrictMode = value;
            return isStrictMode;
        };
        this.defaultSquashPolicy = function(value) {
            if (!isDefined(value)) return defaultSquashPolicy;
            if (value !== true && value !== false && !isString(value)) throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
            defaultSquashPolicy = value;
            return value;
        };
        this.compile = function(pattern, config) {
            return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
        };
        this.isMatcher = function(o) {
            if (!isObject(o)) return false;
            var result = true;
            forEach(UrlMatcher.prototype, function(val, name) {
                if (isFunction(val)) {
                    result = result && (isDefined(o[name]) && isFunction(o[name]));
                }
            });
            return result;
        };
        this.type = function(name, definition, definitionFn) {
            if (!isDefined(definition)) return $types[name];
            if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");
            $types[name] = new Type(extend({
                name: name
            }, definition));
            if (definitionFn) {
                typeQueue.push({
                    name: name,
                    def: definitionFn
                });
                if (!enqueue) flushTypeQueue();
            }
            return this;
        };
        function flushTypeQueue() {
            while (typeQueue.length) {
                var type = typeQueue.shift();
                if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                angular.extend($types[type.name], injector.invoke(type.def));
            }
        }
        forEach(defaultTypes, function(type, name) {
            $types[name] = new Type(extend({
                name: name
            }, type));
        });
        $types = inherit($types, {});
        this.$get = [ "$injector", function($injector) {
            injector = $injector;
            enqueue = false;
            flushTypeQueue();
            forEach(defaultTypes, function(type, name) {
                if (!$types[name]) $types[name] = new Type(type);
            });
            return this;
        } ];
        this.Param = function Param(id, type, config, location) {
            var self = this;
            config = unwrapShorthand(config);
            type = getType(config, type, location);
            var arrayMode = getArrayMode();
            type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
            if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined) config.value = "";
            var isOptional = config.value !== undefined;
            var squash = getSquashPolicy(config, isOptional);
            var replace = getReplace(config, arrayMode, isOptional, squash);
            function unwrapShorthand(config) {
                var keys = isObject(config) ? objectKeys(config) : [];
                var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 && indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
                if (isShorthand) config = {
                    value: config
                };
                config.$$fn = isInjectable(config.value) ? config.value : function() {
                    return config.value;
                };
                return config;
            }
            function getType(config, urlType, location) {
                if (config.type && urlType) throw new Error("Param '" + id + "' has two type configurations.");
                if (urlType) return urlType;
                if (!config.type) return location === "config" ? $types.any : $types.string;
                return config.type instanceof Type ? config.type : new Type(config.type);
            }
            function getArrayMode() {
                var arrayDefaults = {
                    array: location === "search" ? "auto" : false
                };
                var arrayParamNomenclature = id.match(/\[\]$/) ? {
                    array: true
                } : {};
                return extend(arrayDefaults, arrayParamNomenclature, config).array;
            }
            function getSquashPolicy(config, isOptional) {
                var squash = config.squash;
                if (!isOptional || squash === false) return false;
                if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
                if (squash === true || isString(squash)) return squash;
                throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
            }
            function getReplace(config, arrayMode, isOptional, squash) {
                var replace, configuredKeys, defaultPolicy = [ {
                    from: "",
                    to: isOptional || arrayMode ? undefined : ""
                }, {
                    from: null,
                    to: isOptional || arrayMode ? undefined : ""
                } ];
                replace = isArray(config.replace) ? config.replace : [];
                if (isString(squash)) replace.push({
                    from: squash,
                    to: undefined
                });
                configuredKeys = map(replace, function(item) {
                    return item.from;
                });
                return filter(defaultPolicy, function(item) {
                    return indexOf(configuredKeys, item.from) === -1;
                }).concat(replace);
            }
            function $$getDefaultValue() {
                if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
                var defaultValue = injector.invoke(config.$$fn);
                if (defaultValue !== null && defaultValue !== undefined && !self.type.is(defaultValue)) throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
                return defaultValue;
            }
            function $value(value) {
                function hasReplaceVal(val) {
                    return function(obj) {
                        return obj.from === val;
                    };
                }
                function $replace(value) {
                    var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) {
                        return obj.to;
                    });
                    return replacement.length ? replacement[0] : value;
                }
                value = $replace(value);
                return !isDefined(value) ? $$getDefaultValue() : self.type.$normalize(value);
            }
            function toString() {
                return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}";
            }
            extend(this, {
                id: id,
                type: type,
                location: location,
                array: arrayMode,
                squash: squash,
                replace: replace,
                isOptional: isOptional,
                value: $value,
                dynamic: undefined,
                config: config,
                toString: toString
            });
        };
        function ParamSet(params) {
            extend(this, params || {});
        }
        ParamSet.prototype = {
            $$new: function() {
                return inherit(this, extend(new ParamSet(), {
                    $$parent: this
                }));
            },
            $$keys: function() {
                var keys = [], chain = [], parent = this, ignore = objectKeys(ParamSet.prototype);
                while (parent) {
                    chain.push(parent);
                    parent = parent.$$parent;
                }
                chain.reverse();
                forEach(chain, function(paramset) {
                    forEach(objectKeys(paramset), function(key) {
                        if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
                    });
                });
                return keys;
            },
            $$values: function(paramValues) {
                var values = {}, self = this;
                forEach(self.$$keys(), function(key) {
                    values[key] = self[key].value(paramValues && paramValues[key]);
                });
                return values;
            },
            $$equals: function(paramValues1, paramValues2) {
                var equal = true, self = this;
                forEach(self.$$keys(), function(key) {
                    var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
                    if (!self[key].type.equals(left, right)) equal = false;
                });
                return equal;
            },
            $$validates: function $$validate(paramValues) {
                var keys = this.$$keys(), i, param, rawVal, normalized, encoded;
                for (i = 0; i < keys.length; i++) {
                    param = this[keys[i]];
                    rawVal = paramValues[keys[i]];
                    if ((rawVal === undefined || rawVal === null) && param.isOptional) break;
                    normalized = param.type.$normalize(rawVal);
                    if (!param.type.is(normalized)) return false;
                    encoded = param.type.encode(normalized);
                    if (angular.isString(encoded) && !param.type.pattern.exec(encoded)) return false;
                }
                return true;
            },
            $$parent: undefined
        };
        this.ParamSet = ParamSet;
    }
    angular.module("ui.router.util").provider("$urlMatcherFactory", $UrlMatcherFactory);
    angular.module("ui.router.util").run([ "$urlMatcherFactory", function($urlMatcherFactory) {} ]);
    $UrlRouterProvider.$inject = [ "$locationProvider", "$urlMatcherFactoryProvider" ];
    function $UrlRouterProvider($locationProvider, $urlMatcherFactory) {
        var rules = [], otherwise = null, interceptDeferred = false, listener;
        function regExpPrefix(re) {
            var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
            return prefix != null ? prefix[1].replace(/\\(.)/g, "$1") : "";
        }
        function interpolate(pattern, match) {
            return pattern.replace(/\$(\$|\d{1,2})/, function(m, what) {
                return match[what === "$" ? 0 : Number(what)];
            });
        }
        this.rule = function(rule) {
            if (!isFunction(rule)) throw new Error("'rule' must be a function");
            rules.push(rule);
            return this;
        };
        this.otherwise = function(rule) {
            if (isString(rule)) {
                var redirect = rule;
                rule = function() {
                    return redirect;
                };
            } else if (!isFunction(rule)) throw new Error("'rule' must be a function");
            otherwise = rule;
            return this;
        };
        function handleIfMatch($injector, handler, match) {
            if (!match) return false;
            var result = $injector.invoke(handler, handler, {
                $match: match
            });
            return isDefined(result) ? result : true;
        }
        this.when = function(what, handler) {
            var redirect, handlerIsString = isString(handler);
            if (isString(what)) what = $urlMatcherFactory.compile(what);
            if (!handlerIsString && !isFunction(handler) && !isArray(handler)) throw new Error("invalid 'handler' in when()");
            var strategies = {
                matcher: function(what, handler) {
                    if (handlerIsString) {
                        redirect = $urlMatcherFactory.compile(handler);
                        handler = [ "$match", function($match) {
                            return redirect.format($match);
                        } ];
                    }
                    return extend(function($injector, $location) {
                        return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
                    }, {
                        prefix: isString(what.prefix) ? what.prefix : ""
                    });
                },
                regex: function(what, handler) {
                    if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");
                    if (handlerIsString) {
                        redirect = handler;
                        handler = [ "$match", function($match) {
                            return interpolate(redirect, $match);
                        } ];
                    }
                    return extend(function($injector, $location) {
                        return handleIfMatch($injector, handler, what.exec($location.path()));
                    }, {
                        prefix: regExpPrefix(what)
                    });
                }
            };
            var check = {
                matcher: $urlMatcherFactory.isMatcher(what),
                regex: what instanceof RegExp
            };
            for (var n in check) {
                if (check[n]) return this.rule(strategies[n](what, handler));
            }
            throw new Error("invalid 'what' in when()");
        };
        this.deferIntercept = function(defer) {
            if (defer === undefined) defer = true;
            interceptDeferred = defer;
        };
        this.$get = $get;
        $get.$inject = [ "$location", "$rootScope", "$injector", "$browser" ];
        function $get($location, $rootScope, $injector, $browser) {
            var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;
            function appendBasePath(url, isHtml5, absolute) {
                if (baseHref === "/") return url;
                if (isHtml5) return baseHref.slice(0, -1) + url;
                if (absolute) return baseHref.slice(1) + url;
                return url;
            }
            function update(evt) {
                if (evt && evt.defaultPrevented) return;
                var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
                lastPushedUrl = undefined;
                function check(rule) {
                    var handled = rule($injector, $location);
                    if (!handled) return false;
                    if (isString(handled)) $location.replace().url(handled);
                    return true;
                }
                var n = rules.length, i;
                for (i = 0; i < n; i++) {
                    if (check(rules[i])) return;
                }
                if (otherwise) check(otherwise);
            }
            function listen() {
                listener = listener || $rootScope.$on("$locationChangeSuccess", update);
                return listener;
            }
            if (!interceptDeferred) listen();
            return {
                sync: function() {
                    update();
                },
                listen: function() {
                    return listen();
                },
                update: function(read) {
                    if (read) {
                        location = $location.url();
                        return;
                    }
                    if ($location.url() === location) return;
                    $location.url(location);
                    $location.replace();
                },
                push: function(urlMatcher, params, options) {
                    var url = urlMatcher.format(params || {});
                    if (url !== null && params && params["#"]) {
                        url += "#" + params["#"];
                    }
                    $location.url(url);
                    lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
                    if (options && options.replace) $location.replace();
                },
                href: function(urlMatcher, params, options) {
                    if (!urlMatcher.validates(params)) return null;
                    var isHtml5 = $locationProvider.html5Mode();
                    if (angular.isObject(isHtml5)) {
                        isHtml5 = isHtml5.enabled;
                    }
                    var url = urlMatcher.format(params);
                    options = options || {};
                    if (!isHtml5 && url !== null) {
                        url = "#" + $locationProvider.hashPrefix() + url;
                    }
                    if (url !== null && params && params["#"]) {
                        url += "#" + params["#"];
                    }
                    url = appendBasePath(url, isHtml5, options.absolute);
                    if (!options.absolute || !url) {
                        return url;
                    }
                    var slash = !isHtml5 && url ? "/" : "", port = $location.port();
                    port = port === 80 || port === 443 ? "" : ":" + port;
                    return [ $location.protocol(), "://", $location.host(), port, slash, url ].join("");
                }
            };
        }
    }
    angular.module("ui.router.router").provider("$urlRouter", $UrlRouterProvider);
    $StateProvider.$inject = [ "$urlRouterProvider", "$urlMatcherFactoryProvider" ];
    function $StateProvider($urlRouterProvider, $urlMatcherFactory) {
        var root, states = {}, $state, queue = {}, abstractKey = "abstract";
        var stateBuilder = {
            parent: function(state) {
                if (isDefined(state.parent) && state.parent) return findState(state.parent);
                var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
                return compositeName ? findState(compositeName[1]) : root;
            },
            data: function(state) {
                if (state.parent && state.parent.data) {
                    state.data = state.self.data = extend({}, state.parent.data, state.data);
                }
                return state.data;
            },
            url: function(state) {
                var url = state.url, config = {
                    params: state.params || {}
                };
                if (isString(url)) {
                    if (url.charAt(0) == "^") return $urlMatcherFactory.compile(url.substring(1), config);
                    return (state.parent.navigable || root).url.concat(url, config);
                }
                if (!url || $urlMatcherFactory.isMatcher(url)) return url;
                throw new Error("Invalid url '" + url + "' in state '" + state + "'");
            },
            navigable: function(state) {
                return state.url ? state : state.parent ? state.parent.navigable : null;
            },
            ownParams: function(state) {
                var params = state.url && state.url.params || new $$UMFP.ParamSet();
                forEach(state.params || {}, function(config, id) {
                    if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
                });
                return params;
            },
            params: function(state) {
                return state.parent && state.parent.params ? extend(state.parent.params.$$new(), state.ownParams) : new $$UMFP.ParamSet();
            },
            views: function(state) {
                var views = {};
                forEach(isDefined(state.views) ? state.views : {
                    "": state
                }, function(view, name) {
                    if (name.indexOf("@") < 0) name += "@" + state.parent.name;
                    views[name] = view;
                });
                return views;
            },
            path: function(state) {
                return state.parent ? state.parent.path.concat(state) : [];
            },
            includes: function(state) {
                var includes = state.parent ? extend({}, state.parent.includes) : {};
                includes[state.name] = true;
                return includes;
            },
            $delegates: {}
        };
        function isRelative(stateName) {
            return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
        }
        function findState(stateOrName, base) {
            if (!stateOrName) return undefined;
            var isStr = isString(stateOrName), name = isStr ? stateOrName : stateOrName.name, path = isRelative(name);
            if (path) {
                if (!base) throw new Error("No reference point given for path '" + name + "'");
                base = findState(base);
                var rel = name.split("."), i = 0, pathLength = rel.length, current = base;
                for (;i < pathLength; i++) {
                    if (rel[i] === "" && i === 0) {
                        current = base;
                        continue;
                    }
                    if (rel[i] === "^") {
                        if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
                        current = current.parent;
                        continue;
                    }
                    break;
                }
                rel = rel.slice(i).join(".");
                name = current.name + (current.name && rel ? "." : "") + rel;
            }
            var state = states[name];
            if (state && (isStr || !isStr && (state === stateOrName || state.self === stateOrName))) {
                return state;
            }
            return undefined;
        }
        function queueState(parentName, state) {
            if (!queue[parentName]) {
                queue[parentName] = [];
            }
            queue[parentName].push(state);
        }
        function flushQueuedChildren(parentName) {
            var queued = queue[parentName] || [];
            while (queued.length) {
                registerState(queued.shift());
            }
        }
        function registerState(state) {
            state = inherit(state, {
                self: state,
                resolve: state.resolve || {},
                toString: function() {
                    return this.name;
                }
            });
            var name = state.name;
            if (!isString(name) || name.indexOf("@") >= 0) throw new Error("State must have a valid name");
            if (states.hasOwnProperty(name)) throw new Error("State '" + name + "'' is already defined");
            var parentName = name.indexOf(".") !== -1 ? name.substring(0, name.lastIndexOf(".")) : isString(state.parent) ? state.parent : isObject(state.parent) && isString(state.parent.name) ? state.parent.name : "";
            if (parentName && !states[parentName]) {
                return queueState(parentName, state.self);
            }
            for (var key in stateBuilder) {
                if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
            }
            states[name] = state;
            if (!state[abstractKey] && state.url) {
                $urlRouterProvider.when(state.url, [ "$match", "$stateParams", function($match, $stateParams) {
                    if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
                        $state.transitionTo(state, $match, {
                            inherit: true,
                            location: false
                        });
                    }
                } ]);
            }
            flushQueuedChildren(name);
            return state;
        }
        function isGlob(text) {
            return text.indexOf("*") > -1;
        }
        function doesStateMatchGlob(glob) {
            var globSegments = glob.split("."), segments = $state.$current.name.split(".");
            for (var i = 0, l = globSegments.length; i < l; i++) {
                if (globSegments[i] === "*") {
                    segments[i] = "*";
                }
            }
            if (globSegments[0] === "**") {
                segments = segments.slice(indexOf(segments, globSegments[1]));
                segments.unshift("**");
            }
            if (globSegments[globSegments.length - 1] === "**") {
                segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
                segments.push("**");
            }
            if (globSegments.length != segments.length) {
                return false;
            }
            return segments.join("") === globSegments.join("");
        }
        root = registerState({
            name: "",
            url: "^",
            views: null,
            "abstract": true
        });
        root.navigable = null;
        this.decorator = decorator;
        function decorator(name, func) {
            if (isString(name) && !isDefined(func)) {
                return stateBuilder[name];
            }
            if (!isFunction(func) || !isString(name)) {
                return this;
            }
            if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
                stateBuilder.$delegates[name] = stateBuilder[name];
            }
            stateBuilder[name] = func;
            return this;
        }
        this.state = state;
        function state(name, definition) {
            if (isObject(name)) definition = name; else definition.name = name;
            registerState(definition);
            return this;
        }
        this.$get = $get;
        $get.$inject = [ "$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory" ];
        function $get($rootScope, $q, $view, $injector, $resolve, $stateParams, $urlRouter, $location, $urlMatcherFactory) {
            var TransitionSuperseded = $q.reject(new Error("transition superseded"));
            var TransitionPrevented = $q.reject(new Error("transition prevented"));
            var TransitionAborted = $q.reject(new Error("transition aborted"));
            var TransitionFailed = $q.reject(new Error("transition failed"));
            function handleRedirect(redirect, state, params, options) {
                var evt = $rootScope.$broadcast("$stateNotFound", redirect, state, params);
                if (evt.defaultPrevented) {
                    $urlRouter.update();
                    return TransitionAborted;
                }
                if (!evt.retry) {
                    return null;
                }
                if (options.$retry) {
                    $urlRouter.update();
                    return TransitionFailed;
                }
                var retryTransition = $state.transition = $q.when(evt.retry);
                retryTransition.then(function() {
                    if (retryTransition !== $state.transition) return TransitionSuperseded;
                    redirect.options.$retry = true;
                    return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
                }, function() {
                    return TransitionAborted;
                });
                $urlRouter.update();
                return retryTransition;
            }
            root.locals = {
                resolve: null,
                globals: {
                    $stateParams: {}
                }
            };
            $state = {
                params: {},
                current: root.self,
                $current: root,
                transition: null
            };
            $state.reload = function reload(state) {
                return $state.transitionTo($state.current, $stateParams, {
                    reload: state || true,
                    inherit: false,
                    notify: true
                });
            };
            $state.go = function go(to, params, options) {
                return $state.transitionTo(to, params, extend({
                    inherit: true,
                    relative: $state.$current
                }, options));
            };
            $state.transitionTo = function transitionTo(to, toParams, options) {
                toParams = toParams || {};
                options = extend({
                    location: true,
                    inherit: false,
                    relative: null,
                    notify: true,
                    reload: false,
                    $retry: false
                }, options || {});
                var from = $state.$current, fromParams = $state.params, fromPath = from.path;
                var evt, toState = findState(to, options.relative);
                var hash = toParams["#"];
                if (!isDefined(toState)) {
                    var redirect = {
                        to: to,
                        toParams: toParams,
                        options: options
                    };
                    var redirectResult = handleRedirect(redirect, from.self, fromParams, options);
                    if (redirectResult) {
                        return redirectResult;
                    }
                    to = redirect.to;
                    toParams = redirect.toParams;
                    options = redirect.options;
                    toState = findState(to, options.relative);
                    if (!isDefined(toState)) {
                        if (!options.relative) throw new Error("No such state '" + to + "'");
                        throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
                    }
                }
                if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
                if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
                if (!toState.params.$$validates(toParams)) return TransitionFailed;
                toParams = toState.params.$$values(toParams);
                to = toState;
                var toPath = to.path;
                var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];
                if (!options.reload) {
                    while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
                        locals = toLocals[keep] = state.locals;
                        keep++;
                        state = toPath[keep];
                    }
                } else if (isString(options.reload) || isObject(options.reload)) {
                    if (isObject(options.reload) && !options.reload.name) {
                        throw new Error("Invalid reload state object");
                    }
                    var reloadState = options.reload === true ? fromPath[0] : findState(options.reload);
                    if (options.reload && !reloadState) {
                        throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
                    }
                    while (state && state === fromPath[keep] && state !== reloadState) {
                        locals = toLocals[keep] = state.locals;
                        keep++;
                        state = toPath[keep];
                    }
                }
                if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) {
                    if (hash) toParams["#"] = hash;
                    $state.params = toParams;
                    copy($state.params, $stateParams);
                    if (options.location && to.navigable && to.navigable.url) {
                        $urlRouter.push(to.navigable.url, toParams, {
                            $$avoidResync: true,
                            replace: options.location === "replace"
                        });
                        $urlRouter.update(true);
                    }
                    $state.transition = null;
                    return $q.when($state.current);
                }
                toParams = filterByKeys(to.params.$$keys(), toParams || {});
                if (options.notify) {
                    if ($rootScope.$broadcast("$stateChangeStart", to.self, toParams, from.self, fromParams).defaultPrevented) {
                        $rootScope.$broadcast("$stateChangeCancel", to.self, toParams, from.self, fromParams);
                        $urlRouter.update();
                        return TransitionPrevented;
                    }
                }
                var resolved = $q.when(locals);
                for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
                    locals = toLocals[l] = inherit(locals);
                    resolved = resolveState(state, toParams, state === to, resolved, locals, options);
                }
                var transition = $state.transition = resolved.then(function() {
                    var l, entering, exiting;
                    if ($state.transition !== transition) return TransitionSuperseded;
                    for (l = fromPath.length - 1; l >= keep; l--) {
                        exiting = fromPath[l];
                        if (exiting.self.onExit) {
                            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
                        }
                        exiting.locals = null;
                    }
                    for (l = keep; l < toPath.length; l++) {
                        entering = toPath[l];
                        entering.locals = toLocals[l];
                        if (entering.self.onEnter) {
                            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
                        }
                    }
                    if (hash) toParams["#"] = hash;
                    if ($state.transition !== transition) return TransitionSuperseded;
                    $state.$current = to;
                    $state.current = to.self;
                    $state.params = toParams;
                    copy($state.params, $stateParams);
                    $state.transition = null;
                    if (options.location && to.navigable) {
                        $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
                            $$avoidResync: true,
                            replace: options.location === "replace"
                        });
                    }
                    if (options.notify) {
                        $rootScope.$broadcast("$stateChangeSuccess", to.self, toParams, from.self, fromParams);
                    }
                    $urlRouter.update(true);
                    return $state.current;
                }, function(error) {
                    if ($state.transition !== transition) return TransitionSuperseded;
                    $state.transition = null;
                    evt = $rootScope.$broadcast("$stateChangeError", to.self, toParams, from.self, fromParams, error);
                    if (!evt.defaultPrevented) {
                        $urlRouter.update();
                    }
                    return $q.reject(error);
                });
                return transition;
            };
            $state.is = function is(stateOrName, params, options) {
                options = extend({
                    relative: $state.$current
                }, options || {});
                var state = findState(stateOrName, options.relative);
                if (!isDefined(state)) {
                    return undefined;
                }
                if ($state.$current !== state) {
                    return false;
                }
                return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;
            };
            $state.includes = function includes(stateOrName, params, options) {
                options = extend({
                    relative: $state.$current
                }, options || {});
                if (isString(stateOrName) && isGlob(stateOrName)) {
                    if (!doesStateMatchGlob(stateOrName)) {
                        return false;
                    }
                    stateOrName = $state.$current.name;
                }
                var state = findState(stateOrName, options.relative);
                if (!isDefined(state)) {
                    return undefined;
                }
                if (!isDefined($state.$current.includes[state.name])) {
                    return false;
                }
                return params ? equalForKeys(state.params.$$values(params), $stateParams, objectKeys(params)) : true;
            };
            $state.href = function href(stateOrName, params, options) {
                options = extend({
                    lossy: true,
                    inherit: true,
                    absolute: false,
                    relative: $state.$current
                }, options || {});
                var state = findState(stateOrName, options.relative);
                if (!isDefined(state)) return null;
                if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);
                var nav = state && options.lossy ? state.navigable : state;
                if (!nav || nav.url === undefined || nav.url === null) {
                    return null;
                }
                return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat("#"), params || {}), {
                    absolute: options.absolute
                });
            };
            $state.get = function(stateOrName, context) {
                if (arguments.length === 0) return map(objectKeys(states), function(name) {
                    return states[name].self;
                });
                var state = findState(stateOrName, context || $state.$current);
                return state && state.self ? state.self : null;
            };
            function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
                var $stateParams = paramsAreFiltered ? params : filterByKeys(state.params.$$keys(), params);
                var locals = {
                    $stateParams: $stateParams
                };
                dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
                var promises = [ dst.resolve.then(function(globals) {
                    dst.globals = globals;
                }) ];
                if (inherited) promises.push(inherited);
                function resolveViews() {
                    var viewsPromises = [];
                    forEach(state.views, function(view, name) {
                        var injectables = view.resolve && view.resolve !== state.resolve ? view.resolve : {};
                        injectables.$template = [ function() {
                            return $view.load(name, {
                                view: view,
                                locals: dst.globals,
                                params: $stateParams,
                                notify: options.notify
                            }) || "";
                        } ];
                        viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function(result) {
                            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
                                var injectLocals = angular.extend({}, injectables, dst.globals);
                                result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
                            } else {
                                result.$$controller = view.controller;
                            }
                            result.$$state = state;
                            result.$$controllerAs = view.controllerAs;
                            dst[name] = result;
                        }));
                    });
                    return $q.all(viewsPromises).then(function() {
                        return dst.globals;
                    });
                }
                return $q.all(promises).then(resolveViews).then(function(values) {
                    return dst;
                });
            }
            return $state;
        }
        function shouldSkipReload(to, toParams, from, fromParams, locals, options) {
            function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {
                function notSearchParam(key) {
                    return fromAndToState.params[key].location != "search";
                }
                var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam);
                var nonQueryParams = pick.apply({}, [ fromAndToState.params ].concat(nonQueryParamKeys));
                var nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);
                return nonQueryParamSet.$$equals(fromParams, toParams);
            }
            if (!options.reload && to === from && (locals === from.locals || to.self.reloadOnSearch === false && nonSearchParamsEqual(from, fromParams, toParams))) {
                return true;
            }
        }
    }
    angular.module("ui.router.state").value("$stateParams", {}).provider("$state", $StateProvider);
    $ViewProvider.$inject = [];
    function $ViewProvider() {
        this.$get = $get;
        $get.$inject = [ "$rootScope", "$templateFactory" ];
        function $get($rootScope, $templateFactory) {
            return {
                load: function load(name, options) {
                    var result, defaults = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: true,
                        async: true,
                        params: {}
                    };
                    options = extend(defaults, options);
                    if (options.view) {
                        result = $templateFactory.fromConfig(options.view, options.params, options.locals);
                    }
                    if (result && options.notify) {
                        $rootScope.$broadcast("$viewContentLoading", options);
                    }
                    return result;
                }
            };
        }
    }
    angular.module("ui.router.state").provider("$view", $ViewProvider);
    function $ViewScrollProvider() {
        var useAnchorScroll = false;
        this.useAnchorScroll = function() {
            useAnchorScroll = true;
        };
        this.$get = [ "$anchorScroll", "$timeout", function($anchorScroll, $timeout) {
            if (useAnchorScroll) {
                return $anchorScroll;
            }
            return function($element) {
                return $timeout(function() {
                    $element[0].scrollIntoView();
                }, 0, false);
            };
        } ];
    }
    angular.module("ui.router.state").provider("$uiViewScroll", $ViewScrollProvider);
    $ViewDirective.$inject = [ "$state", "$injector", "$uiViewScroll", "$interpolate" ];
    function $ViewDirective($state, $injector, $uiViewScroll, $interpolate) {
        function getService() {
            return $injector.has ? function(service) {
                return $injector.has(service) ? $injector.get(service) : null;
            } : function(service) {
                try {
                    return $injector.get(service);
                } catch (e) {
                    return null;
                }
            };
        }
        var service = getService(), $animator = service("$animator"), $animate = service("$animate");
        function getRenderer(attrs, scope) {
            var statics = function() {
                return {
                    enter: function(element, target, cb) {
                        target.after(element);
                        cb();
                    },
                    leave: function(element, cb) {
                        element.remove();
                        cb();
                    }
                };
            };
            if ($animate) {
                return {
                    enter: function(element, target, cb) {
                        var promise = $animate.enter(element, null, target, cb);
                        if (promise && promise.then) promise.then(cb);
                    },
                    leave: function(element, cb) {
                        var promise = $animate.leave(element, cb);
                        if (promise && promise.then) promise.then(cb);
                    }
                };
            }
            if ($animator) {
                var animate = $animator && $animator(scope, attrs);
                return {
                    enter: function(element, target, cb) {
                        animate.enter(element, null, target);
                        cb();
                    },
                    leave: function(element, cb) {
                        animate.leave(element);
                        cb();
                    }
                };
            }
            return statics();
        }
        var directive = {
            restrict: "ECA",
            terminal: true,
            priority: 400,
            transclude: "element",
            compile: function(tElement, tAttrs, $transclude) {
                return function(scope, $element, attrs) {
                    var previousEl, currentEl, currentScope, latestLocals, onloadExp = attrs.onload || "", autoScrollExp = attrs.autoscroll, renderer = getRenderer(attrs, scope);
                    scope.$on("$stateChangeSuccess", function() {
                        updateView(false);
                    });
                    scope.$on("$viewContentLoading", function() {
                        updateView(false);
                    });
                    updateView(true);
                    function cleanupLastView() {
                        if (previousEl) {
                            previousEl.remove();
                            previousEl = null;
                        }
                        if (currentScope) {
                            currentScope.$destroy();
                            currentScope = null;
                        }
                        if (currentEl) {
                            renderer.leave(currentEl, function() {
                                previousEl = null;
                            });
                            previousEl = currentEl;
                            currentEl = null;
                        }
                    }
                    function updateView(firstTime) {
                        var newScope, name = getUiViewName(scope, attrs, $element, $interpolate), previousLocals = name && $state.$current && $state.$current.locals[name];
                        if (!firstTime && previousLocals === latestLocals) return;
                        newScope = scope.$new();
                        latestLocals = $state.$current.locals[name];
                        var clone = $transclude(newScope, function(clone) {
                            renderer.enter(clone, $element, function onUiViewEnter() {
                                if (currentScope) {
                                    currentScope.$emit("$viewContentAnimationEnded");
                                }
                                if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                                    $uiViewScroll(clone);
                                }
                            });
                            cleanupLastView();
                        });
                        currentEl = clone;
                        currentScope = newScope;
                        currentScope.$emit("$viewContentLoaded");
                        currentScope.$eval(onloadExp);
                    }
                };
            }
        };
        return directive;
    }
    $ViewDirectiveFill.$inject = [ "$compile", "$controller", "$state", "$interpolate" ];
    function $ViewDirectiveFill($compile, $controller, $state, $interpolate) {
        return {
            restrict: "ECA",
            priority: -400,
            compile: function(tElement) {
                var initial = tElement.html();
                return function(scope, $element, attrs) {
                    var current = $state.$current, name = getUiViewName(scope, attrs, $element, $interpolate), locals = current && current.locals[name];
                    if (!locals) {
                        return;
                    }
                    $element.data("$uiView", {
                        name: name,
                        state: locals.$$state
                    });
                    $element.html(locals.$template ? locals.$template : initial);
                    var link = $compile($element.contents());
                    if (locals.$$controller) {
                        locals.$scope = scope;
                        locals.$element = $element;
                        var controller = $controller(locals.$$controller, locals);
                        if (locals.$$controllerAs) {
                            scope[locals.$$controllerAs] = controller;
                        }
                        $element.data("$ngControllerController", controller);
                        $element.children().data("$ngControllerController", controller);
                    }
                    link(scope);
                };
            }
        };
    }
    function getUiViewName(scope, attrs, element, $interpolate) {
        var name = $interpolate(attrs.uiView || attrs.name || "")(scope);
        var inherited = element.inheritedData("$uiView");
        return name.indexOf("@") >= 0 ? name : name + "@" + (inherited ? inherited.state.name : "");
    }
    angular.module("ui.router.state").directive("uiView", $ViewDirective);
    angular.module("ui.router.state").directive("uiView", $ViewDirectiveFill);
    function parseStateRef(ref, current) {
        var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
        if (preparsed) ref = current + "(" + preparsed[1] + ")";
        parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
        if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
        return {
            state: parsed[1],
            paramExpr: parsed[3] || null
        };
    }
    function stateContext(el) {
        var stateData = el.parent().inheritedData("$uiView");
        if (stateData && stateData.state && stateData.state.name) {
            return stateData.state;
        }
    }
    $StateRefDirective.$inject = [ "$state", "$timeout" ];
    function $StateRefDirective($state, $timeout) {
        var allowedOptions = [ "location", "inherit", "reload", "absolute" ];
        return {
            restrict: "A",
            require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
            link: function(scope, element, attrs, uiSrefActive) {
                var ref = parseStateRef(attrs.uiSref, $state.current.name);
                var params = null, url = null, base = stateContext(element) || $state.$current;
                var hrefKind = Object.prototype.toString.call(element.prop("href")) === "[object SVGAnimatedString]" ? "xlink:href" : "href";
                var newHref = null, isAnchor = element.prop("tagName").toUpperCase() === "A";
                var isForm = element[0].nodeName === "FORM";
                var attr = isForm ? "action" : hrefKind, nav = true;
                var options = {
                    relative: base,
                    inherit: true
                };
                var optionsOverride = scope.$eval(attrs.uiSrefOpts) || {};
                angular.forEach(allowedOptions, function(option) {
                    if (option in optionsOverride) {
                        options[option] = optionsOverride[option];
                    }
                });
                var update = function(newVal) {
                    if (newVal) params = angular.copy(newVal);
                    if (!nav) return;
                    newHref = $state.href(ref.state, params, options);
                    var activeDirective = uiSrefActive[1] || uiSrefActive[0];
                    if (activeDirective) {
                        activeDirective.$$addStateInfo(ref.state, params);
                    }
                    if (newHref === null) {
                        nav = false;
                        return false;
                    }
                    attrs.$set(attr, newHref);
                };
                if (ref.paramExpr) {
                    scope.$watch(ref.paramExpr, function(newVal, oldVal) {
                        if (newVal !== params) update(newVal);
                    }, true);
                    params = angular.copy(scope.$eval(ref.paramExpr));
                }
                update();
                if (isForm) return;
                element.bind("click", function(e) {
                    var button = e.which || e.button;
                    if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr("target"))) {
                        var transition = $timeout(function() {
                            $state.go(ref.state, params, options);
                        });
                        e.preventDefault();
                        var ignorePreventDefaultCount = isAnchor && !newHref ? 1 : 0;
                        e.preventDefault = function() {
                            if (ignorePreventDefaultCount-- <= 0) $timeout.cancel(transition);
                        };
                    }
                });
            }
        };
    }
    $StateRefActiveDirective.$inject = [ "$state", "$stateParams", "$interpolate" ];
    function $StateRefActiveDirective($state, $stateParams, $interpolate) {
        return {
            restrict: "A",
            controller: [ "$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                var states = [], activeClass;
                activeClass = $interpolate($attrs.uiSrefActiveEq || $attrs.uiSrefActive || "", false)($scope);
                this.$$addStateInfo = function(newState, newParams) {
                    var state = $state.get(newState, stateContext($element));
                    states.push({
                        state: state || {
                            name: newState
                        },
                        params: newParams
                    });
                    update();
                };
                $scope.$on("$stateChangeSuccess", update);
                function update() {
                    if (anyMatch()) {
                        $element.addClass(activeClass);
                    } else {
                        $element.removeClass(activeClass);
                    }
                }
                function anyMatch() {
                    for (var i = 0; i < states.length; i++) {
                        if (isMatch(states[i].state, states[i].params)) {
                            return true;
                        }
                    }
                    return false;
                }
                function isMatch(state, params) {
                    if (typeof $attrs.uiSrefActiveEq !== "undefined") {
                        return $state.is(state.name, params);
                    } else {
                        return $state.includes(state.name, params);
                    }
                }
            } ]
        };
    }
    angular.module("ui.router.state").directive("uiSref", $StateRefDirective).directive("uiSrefActive", $StateRefActiveDirective).directive("uiSrefActiveEq", $StateRefActiveDirective);
    $IsStateFilter.$inject = [ "$state" ];
    function $IsStateFilter($state) {
        var isFilter = function(state) {
            return $state.is(state);
        };
        isFilter.$stateful = true;
        return isFilter;
    }
    $IncludedByStateFilter.$inject = [ "$state" ];
    function $IncludedByStateFilter($state) {
        var includesFilter = function(state) {
            return $state.includes(state);
        };
        includesFilter.$stateful = true;
        return includesFilter;
    }
    angular.module("ui.router.state").filter("isState", $IsStateFilter).filter("includedByState", $IncludedByStateFilter);
})(window, window.angular);
(function(angular, undefined) {
    "use strict";
    var mod_core = angular.module("ct.ui.router.extras.core", [ "ui.router" ]);
    var internalStates = {}, stateRegisteredCallbacks = [];
    mod_core.config([ "$stateProvider", "$injector", function($stateProvider, $injector) {
        $stateProvider.decorator("parent", function(state, parentFn) {
            internalStates[state.self.name] = state;
            state.self.$$state = function() {
                return internalStates[state.self.name];
            };
            angular.forEach(stateRegisteredCallbacks, function(callback) {
                callback(state);
            });
            return parentFn(state);
        });
    } ]);
    var DEBUG = false;
    var forEach = angular.forEach;
    var extend = angular.extend;
    var isArray = angular.isArray;
    var map = function(collection, callback) {
        "use strict";
        var result = [];
        forEach(collection, function(item, index) {
            result.push(callback(item, index));
        });
        return result;
    };
    var keys = function(collection) {
        "use strict";
        return map(collection, function(collection, key) {
            return key;
        });
    };
    var filter = function(collection, callback) {
        "use strict";
        var result = [];
        forEach(collection, function(item, index) {
            if (callback(item, index)) {
                result.push(item);
            }
        });
        return result;
    };
    var filterObj = function(collection, callback) {
        "use strict";
        var result = {};
        forEach(collection, function(item, index) {
            if (callback(item, index)) {
                result[index] = item;
            }
        });
        return result;
    };
    function ancestors(first, second) {
        var path = [];
        for (var n in first.path) {
            if (first.path[n] !== second.path[n]) break;
            path.push(first.path[n]);
        }
        return path;
    }
    function objectKeys(object) {
        if (Object.keys) {
            return Object.keys(object);
        }
        var result = [];
        angular.forEach(object, function(val, key) {
            result.push(key);
        });
        return result;
    }
    function protoKeys(object, ignoreKeys) {
        var result = [];
        for (var key in object) {
            if (!ignoreKeys || ignoreKeys.indexOf(key) === -1) result.push(key);
        }
        return result;
    }
    function arraySearch(array, value) {
        if (Array.prototype.indexOf) {
            return array.indexOf(value, Number(arguments[2]) || 0);
        }
        var len = array.length >>> 0, from = Number(arguments[2]) || 0;
        from = from < 0 ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (;from < len; from++) {
            if (from in array && array[from] === value) return from;
        }
        return -1;
    }
    function inheritParams(currentParams, newParams, $current, $to) {
        var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
        for (var i in parents) {
            if (!parents[i].params) continue;
            parentParams = isArray(parents[i].params) ? parents[i].params : objectKeys(parents[i].params);
            if (!parentParams.length) continue;
            for (var j in parentParams) {
                if (arraySearch(inheritList, parentParams[j]) >= 0) continue;
                inheritList.push(parentParams[j]);
                inherited[parentParams[j]] = currentParams[parentParams[j]];
            }
        }
        return extend({}, inherited, newParams);
    }
    function inherit(parent, extra) {
        return extend(new (extend(function() {}, {
            prototype: parent
        }))(), extra);
    }
    function onStateRegistered(callback) {
        stateRegisteredCallbacks.push(callback);
    }
    mod_core.provider("uirextras_core", function() {
        var core = {
            internalStates: internalStates,
            onStateRegistered: onStateRegistered,
            forEach: forEach,
            extend: extend,
            isArray: isArray,
            map: map,
            keys: keys,
            filter: filter,
            filterObj: filterObj,
            ancestors: ancestors,
            objectKeys: objectKeys,
            protoKeys: protoKeys,
            arraySearch: arraySearch,
            inheritParams: inheritParams,
            inherit: inherit
        };
        angular.extend(this, core);
        this.$get = function() {
            return core;
        };
    });
    var ignoreDsr;
    function resetIgnoreDsr() {
        ignoreDsr = undefined;
    }
    angular.module("ct.ui.router.extras.dsr", [ "ct.ui.router.extras.core" ]).config([ "$provide", function($provide) {
        var $state_transitionTo;
        $provide.decorator("$state", [ "$delegate", "$q", function($state, $q) {
            $state_transitionTo = $state.transitionTo;
            $state.transitionTo = function(to, toParams, options) {
                if (options.ignoreDsr) {
                    ignoreDsr = options.ignoreDsr;
                }
                return $state_transitionTo.apply($state, arguments).then(function(result) {
                    resetIgnoreDsr();
                    return result;
                }, function(err) {
                    resetIgnoreDsr();
                    return $q.reject(err);
                });
            };
            return $state;
        } ]);
    } ]);
    angular.module("ct.ui.router.extras.dsr").service("$deepStateRedirect", [ "$rootScope", "$state", "$injector", function($rootScope, $state, $injector) {
        var lastSubstate = {};
        var deepStateRedirectsByName = {};
        var REDIRECT = "Redirect", ANCESTOR_REDIRECT = "AncestorRedirect";
        function computeDeepStateStatus(state) {
            var name = state.name;
            if (deepStateRedirectsByName.hasOwnProperty(name)) return deepStateRedirectsByName[name];
            recordDeepStateRedirectStatus(name);
        }
        function getConfig(state) {
            var declaration = state.deepStateRedirect || state.dsr;
            if (!declaration) return {
                dsr: false
            };
            var dsrCfg = {
                dsr: true
            };
            if (angular.isFunction(declaration)) {
                dsrCfg.fn = declaration;
            } else if (angular.isObject(declaration)) {
                dsrCfg = angular.extend(dsrCfg, declaration);
            }
            if (angular.isString(dsrCfg.default)) {
                dsrCfg.default = {
                    state: dsrCfg.default
                };
            }
            if (!dsrCfg.fn) {
                dsrCfg.fn = [ "$dsr$", function($dsr$) {
                    return $dsr$.redirect.state != $dsr$.to.state;
                } ];
            }
            return dsrCfg;
        }
        function recordDeepStateRedirectStatus(stateName) {
            var state = $state.get(stateName);
            if (!state) return false;
            var cfg = getConfig(state);
            if (cfg.dsr) {
                deepStateRedirectsByName[state.name] = REDIRECT;
                if (lastSubstate[stateName] === undefined) lastSubstate[stateName] = {};
            }
            var parent = state.$$state && state.$$state().parent;
            if (parent) {
                var parentStatus = recordDeepStateRedirectStatus(parent.self.name);
                if (parentStatus && deepStateRedirectsByName[state.name] === undefined) {
                    deepStateRedirectsByName[state.name] = ANCESTOR_REDIRECT;
                }
            }
            return deepStateRedirectsByName[state.name] || false;
        }
        function getMatchParams(params, dsrParams) {
            if (dsrParams === true) dsrParams = Object.keys(params);
            if (dsrParams === null || dsrParams === undefined) dsrParams = [];
            var matchParams = {};
            angular.forEach(dsrParams.sort(), function(name) {
                matchParams[name] = params[name];
            });
            return matchParams;
        }
        function getParamsString(params, dsrParams) {
            var matchParams = getMatchParams(params, dsrParams);
            function safeString(input) {
                return !input ? input : input.toString();
            }
            var paramsToString = {};
            angular.forEach(matchParams, function(val, name) {
                paramsToString[name] = safeString(val);
            });
            return angular.toJson(paramsToString);
        }
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            var cfg = getConfig(toState);
            if (ignoreDsr || computeDeepStateStatus(toState) !== REDIRECT && !cfg.default) return;
            var key = getParamsString(toParams, cfg.params);
            var redirect = lastSubstate[toState.name][key] || cfg.default;
            if (!redirect) return;
            var $dsr$ = {
                redirect: {
                    state: redirect.state,
                    params: redirect.params
                },
                to: {
                    state: toState.name,
                    params: toParams
                }
            };
            var result = $injector.invoke(cfg.fn, toState, {
                $dsr$: $dsr$
            });
            if (!result) return;
            if (result.state) redirect = result;
            event.preventDefault();
            var redirectParams = getMatchParams(toParams, cfg.params);
            $state.go(redirect.state, angular.extend(redirectParams, redirect.params));
        });
        $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
            var deepStateStatus = computeDeepStateStatus(toState);
            if (deepStateStatus) {
                var name = toState.name;
                angular.forEach(lastSubstate, function(redirect, dsrState) {
                    var cfg = getConfig($state.get(dsrState));
                    var key = getParamsString(toParams, cfg.params);
                    if (name == dsrState || name.indexOf(dsrState + ".") != -1) {
                        lastSubstate[dsrState][key] = {
                            state: name,
                            params: angular.copy(toParams)
                        };
                    }
                });
            }
        });
        return {
            reset: function(stateOrName, params) {
                if (!stateOrName) {
                    angular.forEach(lastSubstate, function(redirect, dsrState) {
                        lastSubstate[dsrState] = {};
                    });
                } else {
                    var state = $state.get(stateOrName);
                    if (!state) throw new Error("Unknown state: " + stateOrName);
                    if (lastSubstate[state.name]) {
                        if (params) {
                            var key = getParamsString(params, getConfig(state).params);
                            delete lastSubstate[state.name][key];
                        } else {
                            lastSubstate[state.name] = {};
                        }
                    }
                }
            }
        };
    } ]);
    angular.module("ct.ui.router.extras.dsr").run([ "$deepStateRedirect", function($deepStateRedirect) {} ]);
    angular.module("ct.ui.router.extras.sticky", [ "ct.ui.router.extras.core" ]);
    var mod_sticky = angular.module("ct.ui.router.extras.sticky");
    $StickyStateProvider.$inject = [ "$stateProvider", "uirextras_coreProvider" ];
    function $StickyStateProvider($stateProvider, uirextras_coreProvider) {
        var core = uirextras_coreProvider;
        var inheritParams = core.inheritParams;
        var protoKeys = core.protoKeys;
        var map = core.map;
        var inactiveStates = {};
        var stickyStates = {};
        var $state;
        var DEBUG = false;
        this.registerStickyState = function(state) {
            stickyStates[state.name] = state;
        };
        this.enableDebug = this.debugMode = function(enabled) {
            if (angular.isDefined(enabled)) DEBUG = enabled;
            return DEBUG;
        };
        this.$get = [ "$rootScope", "$state", "$stateParams", "$injector", "$log", function($rootScope, $state, $stateParams, $injector, $log) {
            function mapInactives() {
                var mappedStates = {};
                angular.forEach(inactiveStates, function(state, name) {
                    var stickyAncestors = getStickyStateStack(state);
                    for (var i = 0; i < stickyAncestors.length; i++) {
                        var parent = stickyAncestors[i].parent;
                        mappedStates[parent.name] = mappedStates[parent.name] || [];
                        mappedStates[parent.name].push(state);
                    }
                    if (mappedStates[""]) {
                        mappedStates["__inactives"] = mappedStates[""];
                    }
                });
                return mappedStates;
            }
            function getStickyStateStack(state) {
                var stack = [];
                if (!state) return stack;
                do {
                    if (state.sticky) stack.push(state);
                    state = state.parent;
                } while (state);
                stack.reverse();
                return stack;
            }
            function getStickyTransitionType(fromPath, toPath, keep) {
                if (fromPath[keep] === toPath[keep]) return {
                    from: false,
                    to: false
                };
                var stickyFromState = keep < fromPath.length && fromPath[keep].self.sticky;
                var stickyToState = keep < toPath.length && toPath[keep].self.sticky;
                return {
                    from: stickyFromState,
                    to: stickyToState
                };
            }
            function getEnterTransition(state, stateParams, reloadStateTree, ancestorParamsChanged) {
                if (ancestorParamsChanged) return "updateStateParams";
                var inactiveState = inactiveStates[state.self.name];
                if (!inactiveState) return "enter";
                if (state.self === reloadStateTree) return "updateStateParams";
                var paramsMatch = equalForKeys(stateParams, inactiveState.locals.globals.$stateParams, state.ownParams);
                return paramsMatch ? "reactivate" : "updateStateParams";
            }
            function getInactivatedState(state, stateParams) {
                var inactiveState = inactiveStates[state.name];
                if (!inactiveState) return null;
                if (!stateParams) return inactiveState;
                var paramsMatch = equalForKeys(stateParams, inactiveState.locals.globals.$stateParams, state.ownParams);
                return paramsMatch ? inactiveState : null;
            }
            function equalForKeys(a, b, keys) {
                if (!angular.isArray(keys) && angular.isObject(keys)) {
                    keys = protoKeys(keys, [ "$$keys", "$$values", "$$equals", "$$validates", "$$new", "$$parent" ]);
                }
                if (!keys) {
                    keys = [];
                    for (var n in a) keys.push(n);
                }
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    if (a[k] != b[k]) return false;
                }
                return true;
            }
            var stickySupport = {
                getInactiveStates: function() {
                    var states = [];
                    angular.forEach(inactiveStates, function(state) {
                        states.push(state);
                    });
                    return states;
                },
                getInactiveStatesByParent: function() {
                    return mapInactives();
                },
                processTransition: function(transition) {
                    var result = {
                        inactives: [],
                        enter: [],
                        exit: [],
                        keep: 0
                    };
                    var fromPath = transition.fromState.path, fromParams = transition.fromParams, toPath = transition.toState.path, toParams = transition.toParams, reloadStateTree = transition.reloadStateTree, options = transition.options;
                    var keep = 0, state = toPath[keep];
                    if (options.inherit) {
                        toParams = inheritParams($stateParams, toParams || {}, $state.$current, transition.toState);
                    }
                    while (state && state === fromPath[keep] && equalForKeys(toParams, fromParams, state.ownParams)) {
                        state = toPath[++keep];
                    }
                    result.keep = keep;
                    var idx, deepestUpdatedParams, deepestReactivate, noLongerInactiveStates = {}, pType = getStickyTransitionType(fromPath, toPath, keep);
                    var ancestorUpdated = !!options.reload;
                    for (idx = keep; idx < toPath.length; idx++) {
                        var enterTrans = !pType.to ? "enter" : getEnterTransition(toPath[idx], toParams, reloadStateTree, ancestorUpdated);
                        ancestorUpdated = ancestorUpdated || enterTrans == "updateStateParams";
                        result.enter[idx] = enterTrans;
                        if (enterTrans == "reactivate") deepestReactivate = noLongerInactiveStates[toPath[idx].name] = toPath[idx];
                        if (enterTrans == "updateStateParams") deepestUpdatedParams = noLongerInactiveStates[toPath[idx].name] = toPath[idx];
                    }
                    deepestReactivate = deepestReactivate ? deepestReactivate.self.name + "." : "";
                    deepestUpdatedParams = deepestUpdatedParams ? deepestUpdatedParams.self.name + "." : "";
                    var inactivesByParent = mapInactives();
                    var keptStateNames = [ "" ].concat(map(fromPath.slice(0, keep), function(state) {
                        return state.self.name;
                    }));
                    angular.forEach(keptStateNames, function(name) {
                        var inactiveChildren = inactivesByParent[name];
                        for (var i = 0; inactiveChildren && i < inactiveChildren.length; i++) {
                            var child = inactiveChildren[i];
                            if (!noLongerInactiveStates[child.name] && (!deepestReactivate || child.self.name.indexOf(deepestReactivate) !== 0) && (!deepestUpdatedParams || child.self.name.indexOf(deepestUpdatedParams) !== 0)) result.inactives.push(child);
                        }
                    });
                    for (idx = keep; idx < fromPath.length; idx++) {
                        var exitTrans = "exit";
                        if (pType.from) {
                            result.inactives.push(fromPath[idx]);
                            exitTrans = "inactivate";
                        }
                        result.exit[idx] = exitTrans;
                    }
                    return result;
                },
                stateInactivated: function(state) {
                    inactiveStates[state.self.name] = state;
                    state.self.status = "inactive";
                    if (state.self.onInactivate) $injector.invoke(state.self.onInactivate, state.self, state.locals.globals);
                },
                stateReactivated: function(state) {
                    if (inactiveStates[state.self.name]) {
                        delete inactiveStates[state.self.name];
                    }
                    state.self.status = "entered";
                    if (state.self.onReactivate) $injector.invoke(state.self.onReactivate, state.self, state.locals.globals);
                },
                stateExiting: function(exiting, exitQueue, onExit) {
                    var exitingNames = {};
                    angular.forEach(exitQueue, function(state) {
                        exitingNames[state.self.name] = true;
                    });
                    angular.forEach(inactiveStates, function(inactiveExiting, name) {
                        if (!exitingNames[name] && inactiveExiting.includes[exiting.name]) {
                            if (DEBUG) $log.debug("Exiting " + name + " because it's a substate of " + exiting.name + " and wasn't found in ", exitingNames);
                            if (inactiveExiting.self.onExit) $injector.invoke(inactiveExiting.self.onExit, inactiveExiting.self, inactiveExiting.locals.globals);
                            angular.forEach(inactiveExiting.locals, function(localval, key) {
                                delete inactivePseudoState.locals[key];
                            });
                            inactiveExiting.locals = null;
                            inactiveExiting.self.status = "exited";
                            delete inactiveStates[name];
                        }
                    });
                    if (onExit) $injector.invoke(onExit, exiting.self, exiting.locals.globals);
                    exiting.locals = null;
                    exiting.self.status = "exited";
                    delete inactiveStates[exiting.self.name];
                },
                stateEntering: function(entering, params, onEnter, updateParams) {
                    var inactivatedState = getInactivatedState(entering);
                    if (inactivatedState && (updateParams || !getInactivatedState(entering, params))) {
                        var savedLocals = entering.locals;
                        this.stateExiting(inactivatedState);
                        entering.locals = savedLocals;
                    }
                    entering.self.status = "entered";
                    if (onEnter) $injector.invoke(onEnter, entering.self, entering.locals.globals);
                },
                reset: function reset(inactiveState, params) {
                    var state = $state.get(inactiveState);
                    var exiting = getInactivatedState(state, params);
                    if (!exiting) return false;
                    stickySupport.stateExiting(exiting);
                    $rootScope.$broadcast("$viewContentLoading");
                    return true;
                }
            };
            return stickySupport;
        } ];
    }
    mod_sticky.provider("$stickyState", $StickyStateProvider);
    var _StickyState;
    var internalStates = {};
    var root, pendingTransitions = [], pendingRestore, inactivePseudoState, versionHeuristics = {
        hasParamSet: false
    };
    function SurrogateState(type) {
        return {
            resolve: {},
            locals: {
                globals: root && root.locals && root.locals.globals
            },
            views: {},
            self: {},
            params: {},
            ownParams: versionHeuristics.hasParamSet ? {
                $$equals: function() {
                    return true;
                }
            } : [],
            surrogateType: type
        };
    }
    angular.module("ct.ui.router.extras.sticky").run([ "$stickyState", function($stickyState) {
        _StickyState = $stickyState;
    } ]);
    angular.module("ct.ui.router.extras.sticky").config([ "$provide", "$stateProvider", "$stickyStateProvider", "$urlMatcherFactoryProvider", "uirextras_coreProvider", function($provide, $stateProvider, $stickyStateProvider, $urlMatcherFactoryProvider, uirextras_coreProvider) {
        var core = uirextras_coreProvider;
        var internalStates = core.internalStates;
        var inherit = core.inherit;
        var inheritParams = core.inheritParams;
        var map = core.map;
        var filterObj = core.filterObj;
        versionHeuristics.hasParamSet = !!$urlMatcherFactoryProvider.ParamSet;
        inactivePseudoState = angular.extend(new SurrogateState("__inactives"), {
            self: {
                name: "__inactives"
            }
        });
        root = pendingRestore = undefined;
        pendingTransitions = [];
        uirextras_coreProvider.onStateRegistered(function(state) {
            if (state.self.sticky === true) {
                $stickyStateProvider.registerStickyState(state.self);
            }
        });
        var $state_transitionTo;
        $provide.decorator("$state", [ "$delegate", "$log", "$q", function($state, $log, $q) {
            root = $state.$current;
            internalStates[""] = root;
            root.parent = inactivePseudoState;
            inactivePseudoState.parent = undefined;
            root.locals = inherit(inactivePseudoState.locals, root.locals);
            delete inactivePseudoState.locals.globals;
            $state_transitionTo = $state.transitionTo;
            $state.transitionTo = function(to, toParams, options) {
                var DEBUG = $stickyStateProvider.debugMode();
                if (!inactivePseudoState.locals) inactivePseudoState.locals = root.locals;
                var idx = pendingTransitions.length;
                if (pendingRestore) {
                    pendingRestore();
                    if (DEBUG) {
                        $log.debug("Restored paths from pending transition");
                    }
                }
                var fromState = $state.$current, fromParams = $state.params;
                var rel = options && options.relative || $state.$current;
                var toStateSelf = $state.get(to, rel);
                var savedToStatePath, savedFromStatePath, stickyTransitions;
                var reactivated = [], exited = [], terminalReactivatedState;
                toParams = toParams || {};
                arguments[1] = toParams;
                var noop = function() {};
                var restore = function() {
                    if (savedToStatePath) {
                        toState.path = savedToStatePath;
                        savedToStatePath = null;
                    }
                    if (savedFromStatePath) {
                        fromState.path = savedFromStatePath;
                        savedFromStatePath = null;
                    }
                    angular.forEach(restore.restoreFunctions, function(restoreFunction) {
                        restoreFunction();
                    });
                    restore = noop;
                    pendingRestore = null;
                    pendingTransitions.splice(idx, 1);
                };
                restore.restoreFunctions = [];
                restore.addRestoreFunction = function addRestoreFunction(fn) {
                    this.restoreFunctions.push(fn);
                };
                function stateReactivatedSurrogatePhase1(state) {
                    var surrogate = angular.extend(new SurrogateState("reactivate_phase1"), {
                        locals: state.locals
                    });
                    surrogate.self = angular.extend({}, state.self);
                    return surrogate;
                }
                function stateReactivatedSurrogatePhase2(state) {
                    var surrogate = angular.extend(new SurrogateState("reactivate_phase2"), state);
                    var oldOnEnter = surrogate.self.onEnter;
                    surrogate.resolve = {};
                    surrogate.views = {};
                    surrogate.self.onEnter = function() {
                        surrogate.locals = state.locals;
                        _StickyState.stateReactivated(state);
                    };
                    restore.addRestoreFunction(function() {
                        state.self.onEnter = oldOnEnter;
                    });
                    return surrogate;
                }
                function stateInactivatedSurrogate(state) {
                    var surrogate = new SurrogateState("inactivate");
                    surrogate.self = state.self;
                    var oldOnExit = state.self.onExit;
                    surrogate.self.onExit = function() {
                        _StickyState.stateInactivated(state);
                    };
                    restore.addRestoreFunction(function() {
                        state.self.onExit = oldOnExit;
                    });
                    return surrogate;
                }
                function stateEnteredSurrogate(state, toParams) {
                    var oldOnEnter = state.self.onEnter;
                    state.self.onEnter = function() {
                        _StickyState.stateEntering(state, toParams, oldOnEnter);
                    };
                    restore.addRestoreFunction(function() {
                        state.self.onEnter = oldOnEnter;
                    });
                    return state;
                }
                function stateUpdateParamsSurrogate(state, toParams) {
                    var oldOnEnter = state.self.onEnter;
                    state.self.onEnter = function() {
                        _StickyState.stateEntering(state, toParams, oldOnEnter, true);
                    };
                    restore.addRestoreFunction(function() {
                        state.self.onEnter = oldOnEnter;
                    });
                    return state;
                }
                function stateExitedSurrogate(state) {
                    var oldOnExit = state.self.onExit;
                    state.self.onExit = function() {
                        _StickyState.stateExiting(state, exited, oldOnExit);
                    };
                    restore.addRestoreFunction(function() {
                        state.self.onExit = oldOnExit;
                    });
                    return state;
                }
                if (toStateSelf) {
                    var toState = internalStates[toStateSelf.name];
                    if (toState) {
                        savedToStatePath = toState.path;
                        savedFromStatePath = fromState.path;
                        var reload = options && options.reload || false;
                        var reloadStateTree = reload && (reload === true ? savedToStatePath[0].self : $state.get(reload, rel));
                        if (options && reload && reload !== true) delete options.reload;
                        var currentTransition = {
                            toState: toState,
                            toParams: toParams || {},
                            fromState: fromState,
                            fromParams: fromParams || {},
                            options: options,
                            reloadStateTree: reloadStateTree
                        };
                        pendingTransitions.push(currentTransition);
                        pendingRestore = restore;
                        if (reloadStateTree) {
                            currentTransition.toParams.$$uirouterextrasreload = Math.random();
                            var params = reloadStateTree.$$state().params;
                            var ownParams = reloadStateTree.$$state().ownParams;
                            if (versionHeuristics.hasParamSet) {
                                var tempParam = new $urlMatcherFactoryProvider.Param("$$uirouterextrasreload");
                                params.$$uirouterextrasreload = ownParams.$$uirouterextrasreload = tempParam;
                                restore.restoreFunctions.push(function() {
                                    delete params.$$uirouterextrasreload;
                                    delete ownParams.$$uirouterextrasreload;
                                });
                            } else {
                                params.push("$$uirouterextrasreload");
                                ownParams.push("$$uirouterextrasreload");
                                restore.restoreFunctions.push(function() {
                                    params.length = params.length - 1;
                                    ownParams.length = ownParams.length - 1;
                                });
                            }
                        }
                        stickyTransitions = _StickyState.processTransition(currentTransition);
                        if (DEBUG) debugTransition($log, currentTransition, stickyTransitions);
                        var surrogateToPath = toState.path.slice(0, stickyTransitions.keep);
                        var surrogateFromPath = fromState.path.slice(0, stickyTransitions.keep);
                        angular.forEach(inactivePseudoState.locals, function(local, name) {
                            if (name.indexOf("@") != -1) delete inactivePseudoState.locals[name];
                        });
                        for (var i = 0; i < stickyTransitions.inactives.length; i++) {
                            var iLocals = stickyTransitions.inactives[i].locals;
                            angular.forEach(iLocals, function(view, name) {
                                if (iLocals.hasOwnProperty(name) && name.indexOf("@") != -1) {
                                    inactivePseudoState.locals[name] = view;
                                }
                            });
                        }
                        angular.forEach(stickyTransitions.enter, function(value, idx) {
                            var surrogate;
                            var enteringState = toState.path[idx];
                            if (value === "reactivate") {
                                surrogate = stateReactivatedSurrogatePhase1(enteringState);
                                surrogateToPath.push(surrogate);
                                surrogateFromPath.push(surrogate);
                                reactivated.push(stateReactivatedSurrogatePhase2(enteringState));
                                terminalReactivatedState = enteringState;
                            } else if (value === "updateStateParams") {
                                surrogate = stateUpdateParamsSurrogate(enteringState);
                                surrogateToPath.push(surrogate);
                                terminalReactivatedState = enteringState;
                            } else if (value === "enter") {
                                surrogateToPath.push(stateEnteredSurrogate(enteringState));
                            }
                        });
                        angular.forEach(stickyTransitions.exit, function(value, idx) {
                            var exiting = fromState.path[idx];
                            if (value === "inactivate") {
                                surrogateFromPath.push(stateInactivatedSurrogate(exiting));
                                exited.push(exiting);
                            } else if (value === "exit") {
                                surrogateFromPath.push(stateExitedSurrogate(exiting));
                                exited.push(exiting);
                            }
                        });
                        if (reactivated.length) {
                            angular.forEach(reactivated, function(surrogate) {
                                surrogateToPath.push(surrogate);
                            });
                        }
                        if (toState === terminalReactivatedState) {
                            var prefix = terminalReactivatedState.self.name + ".";
                            var inactiveStates = _StickyState.getInactiveStates();
                            var inactiveOrphans = [];
                            inactiveStates.forEach(function(exiting) {
                                if (exiting.self.name.indexOf(prefix) === 0) {
                                    inactiveOrphans.push(exiting);
                                }
                            });
                            inactiveOrphans.sort();
                            inactiveOrphans.reverse();
                            surrogateFromPath = surrogateFromPath.concat(map(inactiveOrphans, function(exiting) {
                                return stateExitedSurrogate(exiting);
                            }));
                            exited = exited.concat(inactiveOrphans);
                        }
                        toState.path = surrogateToPath;
                        fromState.path = surrogateFromPath;
                        var pathMessage = function(state) {
                            return (state.surrogateType ? state.surrogateType + ":" : "") + state.self.name;
                        };
                        if (DEBUG) $log.debug("SurrogateFromPath: ", map(surrogateFromPath, pathMessage));
                        if (DEBUG) $log.debug("SurrogateToPath:   ", map(surrogateToPath, pathMessage));
                    }
                }
                var transitionPromise = $state_transitionTo.apply($state, arguments);
                return transitionPromise.then(function transitionSuccess(state) {
                    restore();
                    if (DEBUG) debugViewsAfterSuccess($log, internalStates[state.name], $state);
                    state.status = "active";
                    return state;
                }, function transitionFailed(err) {
                    restore();
                    if (DEBUG && err.message !== "transition prevented" && err.message !== "transition aborted" && err.message !== "transition superseded") {
                        $log.debug("transition failed", err);
                        console.log(err.stack);
                    }
                    return $q.reject(err);
                });
            };
            return $state;
        } ]);
        function debugTransition($log, currentTransition, stickyTransition) {
            function message(path, index, state) {
                return path[index] ? path[index].toUpperCase() + ": " + state.self.name : "(" + state.self.name + ")";
            }
            var inactiveLogVar = map(stickyTransition.inactives, function(state) {
                return state.self.name;
            });
            var enterLogVar = map(currentTransition.toState.path, function(state, index) {
                return message(stickyTransition.enter, index, state);
            });
            var exitLogVar = map(currentTransition.fromState.path, function(state, index) {
                return message(stickyTransition.exit, index, state);
            });
            var transitionMessage = currentTransition.fromState.self.name + ": " + angular.toJson(currentTransition.fromParams) + ": " + " -> " + currentTransition.toState.self.name + ": " + angular.toJson(currentTransition.toParams);
            $log.debug("   Current transition: ", transitionMessage);
            $log.debug("Before transition, inactives are:   : ", map(_StickyState.getInactiveStates(), function(s) {
                return s.self.name;
            }));
            $log.debug("After transition,  inactives will be: ", inactiveLogVar);
            $log.debug("Transition will exit:  ", exitLogVar);
            $log.debug("Transition will enter: ", enterLogVar);
        }
        function debugViewsAfterSuccess($log, currentState, $state) {
            $log.debug("Current state: " + currentState.self.name + ", inactive states: ", map(_StickyState.getInactiveStates(), function(s) {
                return s.self.name;
            }));
            var viewMsg = function(local, name) {
                return "'" + name + "' (" + local.$$state.name + ")";
            };
            var statesOnly = function(local, name) {
                return name != "globals" && name != "resolve";
            };
            var viewsForState = function(state) {
                var views = map(filterObj(state.locals, statesOnly), viewMsg).join(", ");
                return "(" + (state.self.name ? state.self.name : "root") + ".locals" + (views.length ? ": " + views : "") + ")";
            };
            var message = viewsForState(currentState);
            var parent = currentState.parent;
            while (parent && parent !== currentState) {
                if (parent.self.name === "") {
                    message = viewsForState($state.$current.path[0]) + " / " + message;
                }
                message = viewsForState(parent) + " / " + message;
                currentState = parent;
                parent = currentState.parent;
            }
            $log.debug("Views: " + message);
        }
    } ]);
    (function(angular, undefined) {
        var app = angular.module("ct.ui.router.extras.future", [ "ct.ui.router.extras.core" ]);
        _futureStateProvider.$inject = [ "$stateProvider", "$urlRouterProvider", "$urlMatcherFactoryProvider", "uirextras_coreProvider" ];
        function _futureStateProvider($stateProvider, $urlRouterProvider, $urlMatcherFactory, uirextras_coreProvider) {
            var core = uirextras_coreProvider;
            var internalStates = core.internalStates;
            var stateFactories = {}, futureStates = {};
            var lazyloadInProgress = false, resolveFunctions = [], initPromise, initDone = false;
            var provider = this;
            this.addResolve = function(promiseFn) {
                resolveFunctions.push(promiseFn);
            };
            this.stateFactory = function(futureStateType, factory) {
                stateFactories[futureStateType] = factory;
            };
            this.futureState = function(futureState) {
                if (futureState.stateName) futureState.name = futureState.stateName;
                if (futureState.urlPrefix) futureState.url = "^" + futureState.urlPrefix;
                futureStates[futureState.name] = futureState;
                var parentMatcher, parentName = futureState.name.split(/\./).slice(0, -1).join("."), realParent = findState(futureState.parent || parentName);
                if (realParent) {
                    parentMatcher = realParent.url || realParent.navigable.url;
                } else if (parentName === "") {
                    parentMatcher = $urlMatcherFactory.compile("");
                } else {
                    var futureParent = findState(futureState.parent || parentName, true);
                    if (!futureParent) throw new Error("Couldn't determine parent state of future state. FutureState:" + angular.toJson(futureState));
                    var pattern = futureParent.urlMatcher.source.replace(/\*rest$/, "");
                    parentMatcher = $urlMatcherFactory.compile(pattern);
                    futureState.parentFutureState = futureParent;
                }
                if (futureState.url) {
                    futureState.urlMatcher = futureState.url.charAt(0) === "^" ? $urlMatcherFactory.compile(futureState.url.substring(1) + "*rest") : parentMatcher.concat(futureState.url + "*rest");
                }
            };
            this.get = function() {
                return angular.extend({}, futureStates);
            };
            function findState(stateOrName, findFutureState) {
                var statename = angular.isObject(stateOrName) ? stateOrName.name : stateOrName;
                return !findFutureState ? internalStates[statename] : futureStates[statename];
            }
            function findFutureState($state, options) {
                if (options.name) {
                    var nameComponents = options.name.split(/\./);
                    if (options.name.charAt(0) === ".") nameComponents[0] = $state.current.name;
                    while (nameComponents.length) {
                        var stateName = nameComponents.join(".");
                        if ($state.get(stateName, {
                            relative: $state.current
                        })) return null;
                        if (futureStates[stateName]) return futureStates[stateName];
                        nameComponents.pop();
                    }
                }
                if (options.url) {
                    var matches = [];
                    for (var future in futureStates) {
                        var matcher = futureStates[future].urlMatcher;
                        if (matcher && matcher.exec(options.url)) {
                            matches.push(futureStates[future]);
                        }
                    }
                    var copy = matches.slice(0);
                    for (var i = matches.length - 1; i >= 0; i--) {
                        for (var j = 0; j < copy.length; j++) {
                            if (matches[i] === copy[j].parentFutureState) matches.splice(i, 1);
                        }
                    }
                    return matches[0];
                }
            }
            function lazyLoadState($injector, futureState) {
                lazyloadInProgress = true;
                var $q = $injector.get("$q");
                if (!futureState) {
                    var deferred = $q.defer();
                    deferred.reject("No lazyState passed in " + futureState);
                    return deferred.promise;
                }
                var promise = $q.when([]), parentFuture = futureState.parentFutureState;
                if (parentFuture && futureStates[parentFuture.name]) {
                    promise = lazyLoadState($injector, futureStates[parentFuture.name]);
                }
                var type = futureState.type;
                var factory = stateFactories[type];
                if (!factory) throw Error("No state factory for futureState.type: " + (futureState && futureState.type));
                return promise.then(function(array) {
                    var injectorPromise = $injector.invoke(factory, factory, {
                        futureState: futureState
                    });
                    return injectorPromise.then(function(fullState) {
                        if (fullState) {
                            array.push(fullState);
                        }
                        return array;
                    });
                })["finally"](function() {
                    delete futureStates[futureState.name];
                });
            }
            var otherwiseFunc = [ "$log", "$location", function otherwiseFunc($log, $location) {
                $log.debug("Unable to map " + $location.path());
            } ];
            function futureState_otherwise($injector, $location) {
                var resyncing = false;
                var lazyLoadMissingState = [ "$rootScope", "$urlRouter", "$state", function lazyLoadMissingState($rootScope, $urlRouter, $state) {
                    function resync() {
                        resyncing = true;
                        $urlRouter.sync();
                        resyncing = false;
                    }
                    if (!initDone) {
                        initPromise().then(resync);
                        initDone = true;
                        return;
                    }
                    var futureState = findFutureState($state, {
                        url: $location.path()
                    });
                    if (!futureState) {
                        return $injector.invoke(otherwiseFunc);
                    }
                    lazyLoadState($injector, futureState).then(function lazyLoadedStateCallback(states) {
                        states.forEach(function(state) {
                            if (state && (!$state.get(state) || state.name && !$state.get(state.name))) $stateProvider.state(state);
                        });
                        lazyloadInProgress = false;
                        resync();
                    }, function lazyLoadStateAborted() {
                        lazyloadInProgress = false;
                        resync();
                    });
                } ];
                if (lazyloadInProgress) return;
                var nextFn = resyncing ? otherwiseFunc : lazyLoadMissingState;
                return $injector.invoke(nextFn);
            }
            $urlRouterProvider.otherwise(futureState_otherwise);
            $urlRouterProvider.otherwise = function(rule) {
                if (angular.isString(rule)) {
                    var redirect = rule;
                    rule = function() {
                        return redirect;
                    };
                } else if (!angular.isFunction(rule)) throw new Error("'rule' must be a function");
                otherwiseFunc = [ "$injector", "$location", rule ];
                return $urlRouterProvider;
            };
            var serviceObject = {
                getResolvePromise: function() {
                    return initPromise();
                }
            };
            this.$get = [ "$injector", "$state", "$q", "$rootScope", "$urlRouter", "$timeout", "$log", function futureStateProvider_get($injector, $state, $q, $rootScope, $urlRouter, $timeout, $log) {
                function init() {
                    $rootScope.$on("$stateNotFound", function futureState_notFound(event, unfoundState, fromState, fromParams) {
                        if (lazyloadInProgress) return;
                        $log.debug("event, unfoundState, fromState, fromParams", event, unfoundState, fromState, fromParams);
                        var futureState = findFutureState($state, {
                            name: unfoundState.to
                        });
                        if (!futureState) return;
                        event.preventDefault();
                        var promise = lazyLoadState($injector, futureState);
                        promise.then(function(states) {
                            states.forEach(function(state) {
                                if (state && (!$state.get(state) || state.name && !$state.get(state.name))) $stateProvider.state(state);
                            });
                            $state.go(unfoundState.to, unfoundState.toParams);
                            lazyloadInProgress = false;
                        }, function(error) {
                            console.log("failed to lazy load state ", error);
                            $state.go(fromState, fromParams);
                            lazyloadInProgress = false;
                        });
                    });
                    if (!initPromise) {
                        var promises = [];
                        angular.forEach(resolveFunctions, function(promiseFn) {
                            promises.push($injector.invoke(promiseFn));
                        });
                        initPromise = function() {
                            return $q.all(promises);
                        };
                    }
                    initPromise().then(function retryInitialState() {
                        $timeout(function() {
                            if ($state.transition) {
                                $state.transition.then($urlRouter.sync, $urlRouter.sync);
                            } else {
                                $urlRouter.sync();
                            }
                        });
                    });
                }
                init();
                serviceObject.state = $stateProvider.state;
                serviceObject.futureState = provider.futureState;
                serviceObject.get = provider.get;
                return serviceObject;
            } ];
        }
        app.provider("$futureState", _futureStateProvider);
        var statesAddedQueue = {
            state: function(state) {
                if (statesAddedQueue.$rootScope) statesAddedQueue.$rootScope.$broadcast("$stateAdded", state);
            },
            itsNowRuntimeOhWhatAHappyDay: function($rootScope) {
                statesAddedQueue.$rootScope = $rootScope;
            },
            $rootScope: undefined
        };
        app.config([ "$stateProvider", function($stateProvider) {
            var realStateFn = $stateProvider.state;
            $stateProvider.state = function state_announce() {
                var val = realStateFn.apply($stateProvider, arguments);
                var state = angular.isObject(arguments[0]) ? arguments[0] : arguments[1];
                statesAddedQueue.state(state);
                return val;
            };
        } ]);
        app.run([ "$futureState", function($futureState, $rootScope) {
            statesAddedQueue.itsNowRuntimeOhWhatAHappyDay($rootScope);
        } ]);
    })(angular);
    angular.module("ct.ui.router.extras.previous", [ "ct.ui.router.extras.core", "ct.ui.router.extras.transition" ]).service("$previousState", [ "$rootScope", "$state", function($rootScope, $state) {
        var previous = null, lastPrevious = null, memos = {};
        $rootScope.$on("$transitionStart", function(evt, $transition$) {
            var from = $transition$.from;
            var fromState = from.state && from.state.$$state && from.state.$$state();
            if (fromState && fromState.navigable) {
                lastPrevious = previous;
                previous = $transition$.from;
            }
            $transition$.promise.then(commit).catch(revert);
            function commit() {
                lastPrevious = null;
            }
            function revert() {
                previous = lastPrevious;
            }
        });
        var $previousState = {
            get: function(memoName) {
                return memoName ? memos[memoName] : previous;
            },
            go: function(memoName, options) {
                var to = $previousState.get(memoName);
                return $state.go(to.state, to.params, options);
            },
            memo: function(memoName, defaultStateName, defaultStateParams) {
                memos[memoName] = previous || {
                    state: $state.get(defaultStateName),
                    params: defaultStateParams
                };
            },
            forget: function(memoName) {
                if (memoName) {
                    delete memos[memoName];
                } else {
                    previous = undefined;
                }
            }
        };
        return $previousState;
    } ]);
    angular.module("ct.ui.router.extras.previous").run([ "$previousState", function($previousState) {} ]);
    angular.module("ct.ui.router.extras.transition", [ "ct.ui.router.extras.core" ]).config([ "$provide", function($provide) {
        $provide.decorator("$state", [ "$delegate", "$rootScope", "$q", "$injector", function($state, $rootScope, $q, $injector) {
            var $state_transitionTo = $state.transitionTo;
            var transitionDepth = -1;
            var tDataStack = [];
            var restoreFnStack = [];
            function decorateInjector(tData) {
                var oldinvoke = $injector.invoke;
                var oldinstantiate = $injector.instantiate;
                $injector.invoke = function(fn, self, locals) {
                    return oldinvoke(fn, self, angular.extend({
                        $transition$: tData
                    }, locals));
                };
                $injector.instantiate = function(fn, locals) {
                    return oldinstantiate(fn, angular.extend({
                        $transition$: tData
                    }, locals));
                };
                return function restoreItems() {
                    $injector.invoke = oldinvoke;
                    $injector.instantiate = oldinstantiate;
                };
            }
            function popStack() {
                restoreFnStack.pop()();
                tDataStack.pop();
                transitionDepth--;
            }
            function transitionSuccess(deferred, tSuccess) {
                return function successFn(data) {
                    popStack();
                    $rootScope.$broadcast("$transitionSuccess", tSuccess);
                    deferred.resolve(data);
                    return data;
                };
            }
            function transitionFailure(deferred, tFail) {
                return function failureFn(error) {
                    popStack();
                    $rootScope.$broadcast("$transitionError", tFail, error);
                    deferred.reject(error);
                    return $q.reject(error);
                };
            }
            $state.transitionTo = function(to, toParams, options) {
                var deferred = $q.defer();
                var tData = tDataStack[++transitionDepth] = {
                    promise: deferred.promise
                };
                restoreFnStack[transitionDepth] = function() {};
                var tPromise = $state_transitionTo.apply($state, arguments);
                return tPromise.then(transitionSuccess(deferred, tData), transitionFailure(deferred, tData));
            };
            $rootScope.$on("$stateChangeStart", function(evt, toState, toParams, fromState, fromParams) {
                var depth = transitionDepth;
                var tData = angular.extend(tDataStack[depth], {
                    to: {
                        state: toState,
                        params: toParams
                    },
                    from: {
                        state: fromState,
                        params: fromParams
                    }
                });
                var restoreFn = decorateInjector(tData);
                restoreFnStack[depth] = restoreFn;
                $rootScope.$broadcast("$transitionStart", tData);
            });
            return $state;
        } ]);
    } ]);
    (function() {
        "use strict";
        var app = angular.module("ct.ui.router.extras.statevis", [ "ct.ui.router.extras.core", "ct.ui.router.extras.sticky" ]);
        app.directive("stateVis", [ "$state", "$timeout", "$interval", stateVisDirective ]);
        function stateVisDirective($state, $timeout, $interval) {
            return {
                scope: {
                    width: "@",
                    height: "@"
                },
                restrict: "AE",
                template: "<svg></svg>",
                link: function(_scope, _elem, _attrs) {
                    var stateMap = {};
                    var width = _scope.width || 400, height = _scope.height || 400;
                    var tree = d3.layout.tree().size([ width - 20, height - 20 ]).separation(function(a, b) {
                        return a.parent == b.parent ? 10 : 25;
                    });
                    var root = $state.get().filter(function(state) {
                        return state.name === "";
                    })[0];
                    var nodes = tree(root);
                    root.parent = root;
                    root.px = root.x = width / 2;
                    root.py = root.y = height / 2;
                    var activeNode = {};
                    activeNode.px = activeNode.x = root.px;
                    activeNode.py = activeNode.y = root.py;
                    var diagonal = d3.svg.diagonal();
                    var svg = d3.select(_elem.find("svg")[0]).attr("width", width).attr("height", height).append("g").attr("transform", "translate(10, 10)");
                    var node = svg.selectAll(".node"), link = svg.selectAll(".link"), active = svg.selectAll(".active");
                    var updateInterval = 200, transLength = 200, timer = setInterval(update, updateInterval);
                    function addStates(data) {
                        data = data.map(function(node) {
                            return node.name === "" ? root : angular.copy(node);
                        });
                        angular.extend(stateMap, data.reduce(function(map, node) {
                            map[node.name] = node;
                            return map;
                        }, {}));
                        data.forEach(function(node) {
                            var parentName = node.name.split(/\./).slice(0, -1).join(".");
                            var parent = node.name != parentName && stateMap[parentName];
                            if (parent) {
                                (parent.children || (parent.children = [])).push(node);
                                node.px = parent.px;
                                node.py = parent.py;
                                nodes.push(node);
                            }
                        });
                    }
                    $interval(function() {
                        _scope.states = $state.get();
                        angular.forEach(nodes, function(n) {
                            var s = $state.get(n.name);
                            if (s) {
                                n.status = s.status || "exited";
                            }
                        });
                    }, 250);
                    _scope.$watchCollection("states", function(newval, oldval) {
                        var oldstates = (oldval || []).map(function(s) {
                            return s.name;
                        });
                        addStates((newval || []).filter(function(state) {
                            return oldstates.indexOf(state.name) == -1;
                        }));
                    });
                    update(updateInterval);
                    function update() {
                        node = node.data(tree.nodes(root), function(d) {
                            return d.name;
                        });
                        link = link.data(tree.links(nodes), function(d) {
                            return d.target.name;
                        });
                        active = active.data(activeNode);
                        nodes.forEach(function(d) {
                            d.y = d.depth * 70;
                        });
                        var nodeEnter = node.enter();
                        function stateName(node) {
                            var name = node.name.split(".").pop();
                            if (node.sticky) {
                                name += " (STICKY)";
                            }
                            if (node.deepStateRedirect) {
                                name += " (DSR)";
                            }
                            return name;
                        }
                        active.enter().append("circle").attr("class", "active").attr("r", 13).attr("cx", function(d) {
                            return d.parent.px || 100;
                        }).attr("cy", function(d) {
                            return d.parent.py || 100;
                        });
                        nodeEnter.append("circle").attr("class", "node").attr("r", 9).attr("cx", function(d) {
                            return d.parent.px;
                        }).attr("cy", function(d) {
                            return d.parent.py;
                        });
                        nodeEnter.append("text").attr("class", "label").attr("x", function(d) {
                            return d.parent.px;
                        }).attr("y", function(d) {
                            return d.parent.py;
                        }).attr("text-anchor", function(d) {
                            return "middle";
                        }).text(stateName).style("fill-opacity", 1);
                        link.enter().insert("path", ".node").attr("class", "link").attr("d", function(d) {
                            var o = {
                                x: d.source.px,
                                y: d.source.py
                            };
                            return diagonal({
                                source: o,
                                target: o
                            });
                        });
                        var t = svg.transition().duration(transLength);
                        t.selectAll(".link").attr("d", diagonal);
                        var circleColors = {
                            entered: "#AF0",
                            exited: "#777",
                            active: "#0f0",
                            inactive: "#55F",
                            future: "#009"
                        };
                        t.selectAll(".node").attr("cx", function(d) {
                            return d.px = d.x;
                        }).attr("cy", function(d) {
                            return d.py = d.y;
                        }).attr("r", function(d) {
                            return d.status === "active" ? 15 : 10;
                        }).style("fill", function(d) {
                            return circleColors[d.status] || "#FFF";
                        });
                        t.selectAll(".label").attr("x", function(d) {
                            return d.px = d.x;
                        }).attr("y", function(d) {
                            return d.py = d.y - 15;
                        }).attr("transform", function(d) {
                            return "rotate(-25 " + d.x + " " + d.y + ")";
                        });
                        t.selectAll(".active").attr("x", function(d) {
                            return d.px = d.x;
                        }).attr("y", function(d) {
                            return d.py = d.y - 15;
                        });
                    }
                }
            };
        }
    })();
    angular.module("ct.ui.router.extras", [ "ct.ui.router.extras.core", "ct.ui.router.extras.dsr", "ct.ui.router.extras.future", "ct.ui.router.extras.previous", "ct.ui.router.extras.statevis", "ct.ui.router.extras.sticky", "ct.ui.router.extras.transition" ]);
})(angular);
(function(window, angular, undefined) {
    "use strict";
    var $sanitizeMinErr = angular.$$minErr("$sanitize");
    function $SanitizeProvider() {
        this.$get = [ "$$sanitizeUri", function($$sanitizeUri) {
            return function(html) {
                var buf = [];
                htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
                    return !/^unsafe/.test($$sanitizeUri(uri, isImage));
                }));
                return buf.join("");
            };
        } ];
    }
    function sanitizeText(chars) {
        var buf = [];
        var writer = htmlSanitizeWriter(buf, angular.noop);
        writer.chars(chars);
        return buf.join("");
    }
    var START_TAG_REGEXP = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/, ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, BEGIN_TAG_REGEXP = /^</, BEGING_END_TAGE_REGEXP = /^<\//, COMMENT_REGEXP = /<!--(.*?)-->/g, DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i, CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g, SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
    var voidElements = makeMap("area,br,col,hr,img,wbr");
    var optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), optionalEndTagInlineElements = makeMap("rp,rt"), optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements);
    var blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap("address,article," + "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," + "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));
    var inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b," + "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," + "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
    var svgElements = makeMap("animate,animateColor,animateMotion,animateTransform,circle,defs," + "desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient," + "line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set," + "stop,svg,switch,text,title,tspan,use");
    var specialElements = makeMap("script,style");
    var validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements, svgElements);
    var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href");
    var htmlAttrs = makeMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear," + "color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace," + "ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules," + "scope,scrolling,shape,size,span,start,summary,target,title,type," + "valign,value,vspace,width");
    var svgAttrs = makeMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent," + "attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color," + "color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family," + "font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name," + "gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints," + "keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits," + "markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position," + "overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY," + "repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh," + "stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke," + "stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit," + "stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2," + "underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version," + "viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role," + "xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2," + "zoomAndPan");
    var validAttrs = angular.extend({}, uriAttrs, svgAttrs, htmlAttrs);
    function makeMap(str) {
        var obj = {}, items = str.split(","), i;
        for (i = 0; i < items.length; i++) obj[items[i]] = true;
        return obj;
    }
    function htmlParser(html, handler) {
        if (typeof html !== "string") {
            if (html === null || typeof html === "undefined") {
                html = "";
            } else {
                html = "" + html;
            }
        }
        var index, chars, match, stack = [], last = html, text;
        stack.last = function() {
            return stack[stack.length - 1];
        };
        while (html) {
            text = "";
            chars = true;
            if (!stack.last() || !specialElements[stack.last()]) {
                if (html.indexOf("<!--") === 0) {
                    index = html.indexOf("--", 4);
                    if (index >= 0 && html.lastIndexOf("-->", index) === index) {
                        if (handler.comment) handler.comment(html.substring(4, index));
                        html = html.substring(index + 3);
                        chars = false;
                    }
                } else if (DOCTYPE_REGEXP.test(html)) {
                    match = html.match(DOCTYPE_REGEXP);
                    if (match) {
                        html = html.replace(match[0], "");
                        chars = false;
                    }
                } else if (BEGING_END_TAGE_REGEXP.test(html)) {
                    match = html.match(END_TAG_REGEXP);
                    if (match) {
                        html = html.substring(match[0].length);
                        match[0].replace(END_TAG_REGEXP, parseEndTag);
                        chars = false;
                    }
                } else if (BEGIN_TAG_REGEXP.test(html)) {
                    match = html.match(START_TAG_REGEXP);
                    if (match) {
                        if (match[4]) {
                            html = html.substring(match[0].length);
                            match[0].replace(START_TAG_REGEXP, parseStartTag);
                        }
                        chars = false;
                    } else {
                        text += "<";
                        html = html.substring(1);
                    }
                }
                if (chars) {
                    index = html.indexOf("<");
                    text += index < 0 ? html : html.substring(0, index);
                    html = index < 0 ? "" : html.substring(index);
                    if (handler.chars) handler.chars(decodeEntities(text));
                }
            } else {
                html = html.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", "i"), function(all, text) {
                    text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");
                    if (handler.chars) handler.chars(decodeEntities(text));
                    return "";
                });
                parseEndTag("", stack.last());
            }
            if (html == last) {
                throw $sanitizeMinErr("badparse", "The sanitizer was unable to parse the following block " + "of html: {0}", html);
            }
            last = html;
        }
        parseEndTag();
        function parseStartTag(tag, tagName, rest, unary) {
            tagName = angular.lowercase(tagName);
            if (blockElements[tagName]) {
                while (stack.last() && inlineElements[stack.last()]) {
                    parseEndTag("", stack.last());
                }
            }
            if (optionalEndTagElements[tagName] && stack.last() == tagName) {
                parseEndTag("", tagName);
            }
            unary = voidElements[tagName] || !!unary;
            if (!unary) stack.push(tagName);
            var attrs = {};
            rest.replace(ATTR_REGEXP, function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
                var value = doubleQuotedValue || singleQuotedValue || unquotedValue || "";
                attrs[name] = decodeEntities(value);
            });
            if (handler.start) handler.start(tagName, attrs, unary);
        }
        function parseEndTag(tag, tagName) {
            var pos = 0, i;
            tagName = angular.lowercase(tagName);
            if (tagName) for (pos = stack.length - 1; pos >= 0; pos--) if (stack[pos] == tagName) break;
            if (pos >= 0) {
                for (i = stack.length - 1; i >= pos; i--) if (handler.end) handler.end(stack[i]);
                stack.length = pos;
            }
        }
    }
    var hiddenPre = document.createElement("pre");
    function decodeEntities(value) {
        if (!value) {
            return "";
        }
        hiddenPre.innerHTML = value.replace(/</g, "&lt;");
        return hiddenPre.textContent;
    }
    function encodeEntities(value) {
        return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(value) {
            var hi = value.charCodeAt(0);
            var low = value.charCodeAt(1);
            return "&#" + ((hi - 55296) * 1024 + (low - 56320) + 65536) + ";";
        }).replace(NON_ALPHANUMERIC_REGEXP, function(value) {
            return "&#" + value.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function htmlSanitizeWriter(buf, uriValidator) {
        var ignore = false;
        var out = angular.bind(buf, buf.push);
        return {
            start: function(tag, attrs, unary) {
                tag = angular.lowercase(tag);
                if (!ignore && specialElements[tag]) {
                    ignore = tag;
                }
                if (!ignore && validElements[tag] === true) {
                    out("<");
                    out(tag);
                    angular.forEach(attrs, function(value, key) {
                        var lkey = angular.lowercase(key);
                        var isImage = tag === "img" && lkey === "src" || lkey === "background";
                        if (validAttrs[lkey] === true && (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
                            out(" ");
                            out(key);
                            out('="');
                            out(encodeEntities(value));
                            out('"');
                        }
                    });
                    out(unary ? "/>" : ">");
                }
            },
            end: function(tag) {
                tag = angular.lowercase(tag);
                if (!ignore && validElements[tag] === true) {
                    out("</");
                    out(tag);
                    out(">");
                }
                if (tag == ignore) {
                    ignore = false;
                }
            },
            chars: function(chars) {
                if (!ignore) {
                    out(encodeEntities(chars));
                }
            }
        };
    }
    angular.module("ngSanitize", []).provider("$sanitize", $SanitizeProvider);
    angular.module("ngSanitize").filter("linky", [ "$sanitize", function($sanitize) {
        var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/, MAILTO_REGEXP = /^mailto:/;
        return function(text, target) {
            if (!text) return text;
            var match;
            var raw = text;
            var html = [];
            var url;
            var i;
            while (match = raw.match(LINKY_URL_REGEXP)) {
                url = match[0];
                if (!match[2] && !match[4]) {
                    url = (match[3] ? "http://" : "mailto:") + url;
                }
                i = match.index;
                addText(raw.substr(0, i));
                addLink(url, match[0].replace(MAILTO_REGEXP, ""));
                raw = raw.substring(i + match[0].length);
            }
            addText(raw);
            return $sanitize(html.join(""));
            function addText(text) {
                if (!text) {
                    return;
                }
                html.push(sanitizeText(text));
            }
            function addLink(url, text) {
                html.push("<a ");
                if (angular.isDefined(target)) {
                    html.push('target="', target, '" ');
                }
                html.push('href="', url.replace(/"/g, "&quot;"), '">');
                addText(text);
                html.push("</a>");
            }
        };
    } ]);
})(window, window.angular);
(function(window, angular, undefined) {
    "use strict";
    angular.module("ngCookies", [ "ng" ]).provider("$cookies", [ function $CookiesProvider() {
        var defaults = this.defaults = {};
        function calcOptions(options) {
            return options ? angular.extend({}, defaults, options) : defaults;
        }
        this.$get = [ "$$cookieReader", "$$cookieWriter", function($$cookieReader, $$cookieWriter) {
            return {
                get: function(key) {
                    return $$cookieReader()[key];
                },
                getObject: function(key) {
                    var value = this.get(key);
                    return value ? angular.fromJson(value) : value;
                },
                getAll: function() {
                    return $$cookieReader();
                },
                put: function(key, value, options) {
                    $$cookieWriter(key, value, calcOptions(options));
                },
                putObject: function(key, value, options) {
                    this.put(key, angular.toJson(value), options);
                },
                remove: function(key, options) {
                    $$cookieWriter(key, undefined, calcOptions(options));
                }
            };
        } ];
    } ]);
    angular.module("ngCookies").factory("$cookieStore", [ "$cookies", function($cookies) {
        return {
            get: function(key) {
                return $cookies.getObject(key);
            },
            put: function(key, value) {
                $cookies.putObject(key, value);
            },
            remove: function(key) {
                $cookies.remove(key);
            }
        };
    } ]);
    function $$CookieWriter($document, $log, $browser) {
        var cookiePath = $browser.baseHref();
        var rawDocument = $document[0];
        function buildCookieString(name, value, options) {
            var path, expires;
            options = options || {};
            expires = options.expires;
            path = angular.isDefined(options.path) ? options.path : cookiePath;
            if (value === undefined) {
                expires = "Thu, 01 Jan 1970 00:00:00 GMT";
                value = "";
            }
            if (angular.isString(expires)) {
                expires = new Date(expires);
            }
            var str = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            str += path ? ";path=" + path : "";
            str += options.domain ? ";domain=" + options.domain : "";
            str += expires ? ";expires=" + expires.toUTCString() : "";
            str += options.secure ? ";secure" : "";
            var cookieLength = str.length + 1;
            if (cookieLength > 4096) {
                $log.warn("Cookie '" + name + "' possibly not set or overflowed because it was too large (" + cookieLength + " > 4096 bytes)!");
            }
            return str;
        }
        return function(name, value, options) {
            rawDocument.cookie = buildCookieString(name, value, options);
        };
    }
    $$CookieWriter.$inject = [ "$document", "$log", "$browser" ];
    angular.module("ngCookies").provider("$$cookieWriter", function $$CookieWriterProvider() {
        this.$get = $$CookieWriter;
    });
})(window, window.angular);
angular.module("templates", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("features/_feature/_feature.html", "\n");
    $templateCache.put("features/home/_home.html", '<section class="module module--home">\n  <div class="module__half">\n    <p>\n      <img src="img/etho_black.svg" /> analyses your activity, behaviour and tastes to generate your personal insight profile.\n    </p>\n  </div>\n  <div class="module__half module__half--dark">\n    <a class="button button--white button--instagram" href="https://api.instagram.com/oauth/authorize/?client_id=437d58ca6b5c41c48a3867101f09f76c&amp;redirect_uri=http://localhost:3000/process&amp;response_type=code">Instagram Login</a>\n  </div>\n</section>\n');
    $templateCache.put("features/process/_process.html", "\n");
    $templateCache.put("features/profile/_profile.html", '<section class="module module--profile" title="profile">\n  <div class="module__whole">\n    <img class="avatar" ng-src="{{user.profile_picture}}" />\n    <p>\n      {{user.name}}\n    </p>\n  </div>\n</section>\n<section class="module module--colour" title="colour">\n  <div class="module__half"></div>\n</section>\n');
} ]);
angular.module("services", []).value("Endpoint", "http://localhost:8081/").factory("Api", function(Endpoint, $resource) {
    return function(key) {
        return $resource(Endpoint + key, {}, {});
    };
});
angular.module("states", []).run(function($rootScope, $state) {}).config(function($stateProvider, $stickyStateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope, $location) {
        return {
            request: function(config) {
                $rootScope.$broadcast("ajaxStart", config);
                return config;
            },
            response: function(config) {
                $rootScope.$broadcast("ajaxEnd", config);
                return config;
            },
            responseError: function(config) {
                $rootScope.$broadcast("ajaxEnd", config);
                return config;
            }
        };
    });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
    function templater(page, child) {
        if (angular.isUndefined(child)) child = page;
        return "features/" + page + "/_" + child + ".html";
    }
    $stateProvider.state("home", {
        url: "/",
        templateUrl: templater("home"),
        controller: "homeController"
    }).state("process", {
        url: "/process",
        templateUrl: templater("process"),
        controller: "processController"
    }).state("profile", {
        url: "/profile",
        templateUrl: templater("profile"),
        controller: "profileController",
        resolve: {
            User: function($stateParams, Api) {
                return $stateParams.user || Api("me").get().$promise;
            },
            Profile: function(Api) {
                return Api("me/profile").get().$promise;
            }
        }
    });
});
angular.module("<%= name%>", []).controller("<%= name%>Controller", function($scope) {});
angular.module("home", []).controller("homeController", function($scope, $cookies, $state) {});
angular.module("process", []).controller("processController", function($scope, $location, $http, $cookies, $state, Endpoint) {
    var token = $cookies.get("token");
    if (!token && !$location.search().code) {
        $state.go("home");
    } else if (!token) {
        $http.post(Endpoint + "/login", {
            code: $location.search().code
        }).then(process);
    } else {
        $state.go("profile");
    }
    function process(r) {
        if (r.status == 200) {
            token = r.data.token;
            $cookies.put("token", r.data.token);
            $http.defaults.headers.common["X-ACCESS-TOKEN"] = token;
        } else {
            $state.go("home");
        }
    }
    $scope.logout = function() {
        $cookies.remove("token");
        $state.go("home");
    };
});
angular.module("profile", []).controller("profileController", function($scope, $stateParams, User) {
    $scope.user = User;
});
angular.module("app", [ "ui.router", "ct.ui.router.extras", "ngAnimate", "ngResource", "ngSanitize", "ngCookies", "templates", "states", "services", "home", "process", "profile" ]).run(function($http, $cookies) {
    $http.defaults.headers.common["X-ACCESS-TOKEN"] = $cookies.get("token");
}).controller("appController", function($scope) {
    $scope.hello = "hello world";
});