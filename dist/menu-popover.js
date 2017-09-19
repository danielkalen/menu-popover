(function (require) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
var MenuPopover;

var applyStyles, removeStyles;

applyStyles = function(el, styleObject, additional) {
  var key, value;
  if (additional) {
    styleObject = $.extend({}, styleObject, additional);
  }
  for (key in styleObject) {
    value = styleObject[key];
    (el[0] || el).style[key] = value;
  }
  return el;
};

removeStyles = function(el, styleObject, stylesToReinstate) {
  var key;
  for (key in styleObject) {
    (el[0] || el).style[key] = '';
  }
  if (stylesToReinstate) {
    applyStyles(el, stylesToReinstate);
  }
  return el;
};

;

var style, styleOpenState;

style = {
  container: {
    position: 'absolute',
    zIndex: '4000',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    visibility: 'hidden'
  },
  overlay: {
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.70)',
    opacity: 0,
    transition: 'opacity 0.25s'
  },
  list: {
    position: 'absolute',
    zIndex: '2',
    top: '100vh',
    width: '100%',
    paddingBottom: '30px',
    backgroundColor: 'white',
    webkitTransform: 'translateY(0)',
    mozTransform: 'translateY(0)',
    msTransform: 'translateY(0)',
    oTransform: 'translateY(0)',
    transform: 'translateY(0)',
    transition: 'transform 0.25s'
  },
  desc: {
    position: 'relative',
    width: '100%',
    padding: '20px',
    borderBottom: '1px solid #e6e6e6',
    boxSizing: 'border-box',
    fontSize: '15.2px',
    fontWeight: '500',
    lineHeight: '1.35',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.35)'
  },
  listItem: {
    position: 'relative',
    width: '100%',
    height: '66px',
    padding: '0 20px',
    borderBottom: '1px solid #e6e6e6',
    boxSizing: 'border-box',
    fontSize: '18px',
    fontWeight: '500',
    color: '#181818'
  },
  listItemHighlight: {
    fontWeight: '600',
    color: '#f1c618'
  },
  listItemText: {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    width: '100%',
    textAlign: 'center',
    lineHeight: '1',
    webkitTransform: 'translateY(-50%)',
    mozTransform: 'translateY(-50%)',
    msTransform: 'translateY(-50%)',
    oTransform: 'translateY(-50%)',
    transform: 'translateY(-50%)'
  }
};

styleOpenState = {
  container: {
    visibility: 'visible'
  },
  overlay: {
    opacity: '1'
  },
  list: {
    opacity: '1',
    visibility: 'visible',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  listTransform: function(height) {
    return {
      webkitTransform: "translateY(-" + height + "px)",
      mozTransform: "translateY(-" + height + "px)",
      msTransform: "translateY(-" + height + "px)",
      oTransform: "translateY(-" + height + "px)",
      transform: "translateY(-" + height + "px)"
    };
  }
};

;

var markup;

markup = {
  container: "<div class='MenuPopover'></div>",
  overlay: "<div class='MenuPopover-overlay'></div>",
  list: "<div class='MenuPopover-list'></div>",
  desc: function(desc) {
    return "<div class='MenuPopover-list-desc'>" + desc + "</div>";
  },
  listItem: function(label) {
    return "<div class='MenuPopover-list-item'> <div class='MenuPopover-list-item-label'>" + label + "</div> </div>";
  }
};

;

var defaultOptions;

defaultOptions = {
  'clickEvent': 'click',
  'style': style,
  'styleOpenState': styleOpenState,
  'closeOnOverlayTouch': true,
  'beforeOpen': null,
  'afterOpen': null,
  'beforeClose': null,
  'afterClose': null
};

;

MenuPopover = function(arg) {
  var action, label, options, ref, ref1;
  this.name = arg.name, this.items = arg.items, this.desc = arg.desc, this.highlights = (ref = arg.highlights) != null ? ref : [], options = arg.options;
  this.options = $.extend(true, {}, defaultOptions, options);
  this.isOpen = false;
  this.openAnimation = Promise.resolve();
  this.closeAnimation = Promise.resolve();
  this.els = {};
  this.els.container = $(markup.container).attr('id', this.name);
  this.els.overlay = $(markup.overlay).appendTo(this.els.container);
  this.els.list = $(markup.list).appendTo(this.els.container);
  if (this.desc) {
    this.els.desc = $(markup.desc(this.desc)).appendTo(this.els.list);
  }
  this.els.items = {};
  ref1 = this.items;
  for (label in ref1) {
    action = ref1[label];
    this.els.items[label] = $(markup.listItem(label)).data('action', action).appendTo(this.els.list);
  }
  this.appendToDOM();
  this.attachEvents();
  return MenuPopover.instances[this.name] = this;
};

MenuPopover.prototype.appendToDOM = function() {
  var itemEl, label, ref;
  applyStyles(this.els.container, this.options.style.container);
  applyStyles(this.els.overlay, this.options.style.overlay);
  applyStyles(this.els.list, this.options.style.list);
  if (this.desc) {
    applyStyles(this.els.desc, this.options.style.desc);
  }
  ref = this.els.items;
  for (label in ref) {
    itemEl = ref[label];
    applyStyles(itemEl, this.options.style.listItem);
    if (this.highlights.includes(label)) {
      applyStyles(itemEl, this.options.style.listItemHighlight);
    }
    applyStyles(itemEl.children(), this.options.style.listItemText);
  }
  removeStyles(this.els.items[Object.keys(this.els.items).slice(-1)[0]], {
    borderBottom: ''
  });
  return this.els.container.prependTo(document.body);
};

MenuPopover.prototype.attachEvents = function() {
  if (this.options.closeOnOverlayTouch) {
    this.els.overlay.on(this.options.clickEvent, (function(_this) {
      return function() {
        return _this.close();
      };
    })(this));
  }
  this.els.list.on('touchstart', '.MenuPopover-list-item', function() {
    return applyStyles(this, {
      backgroundColor: '#e3e3e3'
    });
  });
  this.els.list.on('touchend touchcancel', '.MenuPopover-list-item', function() {
    return removeStyles(this, {
      backgroundColor: ''
    });
  });
  return this.els.list.on(this.options.clickEvent, '.MenuPopover-list-item', (function(_this) {
    return function(event) {
      var action, label;
      action = $(event.currentTarget).data('action');
      label = event.currentTarget.textContent.replace(/^\s+/, '').replace(/\s+$/, '');
      if (action && typeof action === 'object') {
        return Promise.resolve().then(action.beforeClose).then(function() {
          return _this.close(label);
        }).then(action.afterClose);
      } else {
        return _this.close(label).then(action);
      }
    };
  })(this));
};

MenuPopover.prototype.open = function() {
  return Promise.resolve(this.closeAnimation).bind(this).then(this.options.beforeOpen).then((function(_this) {
    return function() {
      return _this.openAnimation = new Promise(function(resolve) {
        var listHeight;
        listHeight = _this.els.list[0].clientHeight - 30;
        applyStyles(_this.els.container, _this.options.styleOpenState.container);
        applyStyles(_this.els.overlay, _this.options.styleOpenState.overlay);
        applyStyles(_this.els.list, _this.options.styleOpenState.list, _this.options.styleOpenState.listTransform(listHeight));
        setTimeout(function() {
          return window.scroll(0, 0);
        });
        setTimeout(resolve, 300);
        return _this.isOpen = true;
      });
    };
  })(this)).then(this.options.afterOpen);
};

MenuPopover.prototype.close = function(sourceAction) {
  return Promise.resolve(sourceAction).then(this.openAnimation).bind(this).then(this.options.beforeClose).then((function(_this) {
    return function() {
      return _this.closeAnimation = new Promise(function(resolve) {
        removeStyles(_this.els.overlay, _this.options.styleOpenState.overlay, _this.options.style.overlay);
        removeStyles(_this.els.list, _this.options.styleOpenState.list, _this.options.style.list);
        setTimeout(function() {
          removeStyles(_this.els.container, _this.options.styleOpenState.container, _this.options.style.container);
          return resolve();
        }, 350);
        return _this.isOpen = false;
      });
    };
  })(this)).then(function() {
    return sourceAction;
  }).then(this.options.afterClose);
};

module.exports = MenuPopover;

module.exports.version = "1.3.0";

module.exports.instances = {};

;
return module.exports;
}
}, this);
return require(0);
}).call(this, null);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9wYXJ0cy9oZWxwZXJzLmNvZmZlZSIsIl9wYXJ0cy9zdHlsZXMuY29mZmVlIiwiX3BhcnRzL21hcmt1cC5jb2ZmZWUiLCJfcGFydHMvZGVmYXVsdHMuY29mZmVlIiwiLi4vcGFja2FnZS5qc29uIl0sIm5hbWVzIjpbImlubGluZToxIiwiaW5saW5lOjIiLCJpbmxpbmU6MyIsImlubGluZTo0IiwiaW5saW5lOjUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVVQTs7QUNmVkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtR0NBOztBQ25HREM7Ozs7Ozs7Ozs7Ozs7O0FBZUdBOztBQ2ZIQzs7Ozs7Ozs7Ozs7OztBQVFtQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkNSbkJDLE9BeUJFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiYXBwbHlTdHlsZXMgPSAoZWwsIHN0eWxlT2JqZWN0LCBhZGRpdGlvbmFsKS0+XG5cdHN0eWxlT2JqZWN0ID0gJC5leHRlbmQge30sIHN0eWxlT2JqZWN0LCBhZGRpdGlvbmFsIGlmIGFkZGl0aW9uYWxcblx0XG5cdGZvciBrZXksdmFsdWUgb2Ygc3R5bGVPYmplY3Rcblx0XHQoZWxbMF0gb3IgZWwpLnN0eWxlW2tleV0gPSB2YWx1ZVxuXG5cdHJldHVybiBlbFxuXG5cbnJlbW92ZVN0eWxlcyA9IChlbCwgc3R5bGVPYmplY3QsIHN0eWxlc1RvUmVpbnN0YXRlKS0+XG5cdGZvciBrZXkgb2Ygc3R5bGVPYmplY3Rcblx0XHQoZWxbMF0gb3IgZWwpLnN0eWxlW2tleV0gPSAnJ1xuXG5cdGFwcGx5U3R5bGVzKGVsLCBzdHlsZXNUb1JlaW5zdGF0ZSkgaWYgc3R5bGVzVG9SZWluc3RhdGVcblxuXHRyZXR1cm4gZWwiLCJzdHlsZSA9IFxuXHRjb250YWluZXI6XG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHR6SW5kZXg6ICc0MDAwJ1xuXHRcdHRvcDogJzAnXG5cdFx0bGVmdDogJzAnXG5cdFx0d2lkdGg6ICcxMDB2dydcblx0XHRoZWlnaHQ6ICcxMDB2aCdcblx0XHR2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuXG5cdG92ZXJsYXk6XG5cdFx0cG9zaXRpb246ICdmaXhlZCdcblx0XHR6SW5kZXg6ICcxJ1xuXHRcdGxlZnQ6ICcwJ1xuXHRcdHRvcDogJzAnXG5cdFx0d2lkdGg6ICcxMDB2dydcblx0XHRoZWlnaHQ6ICcxMDB2aCdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuNzApJ1xuXHRcdG9wYWNpdHk6IDBcblx0XHR0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjI1cydcblxuXHRsaXN0OlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0ekluZGV4OiAnMidcblx0XHR0b3A6ICcxMDB2aCdcblx0XHR3aWR0aDogJzEwMCUnXG5cdFx0cGFkZGluZ0JvdHRvbTogJzMwcHgnXG5cdFx0YmFja2dyb3VuZENvbG9yOiAnd2hpdGUnXG5cdFx0d2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSdcblx0XHRtb3pUcmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ1xuXHRcdG1zVHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSdcblx0XHRvVHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSdcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ1xuXHRcdHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4yNXMnXG5cblx0ZGVzYzpcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdHdpZHRoOiAnMTAwJSdcblx0XHRwYWRkaW5nOiAnMjBweCdcblx0XHRib3JkZXJCb3R0b206ICcxcHggc29saWQgI2U2ZTZlNidcblx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdGZvbnRTaXplOiAnMTUuMnB4J1xuXHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0bGluZUhlaWdodDogJzEuMzUnXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdGNvbG9yOiAncmdiYSgwLDAsMCwwLjM1KSdcblxuXHRsaXN0SXRlbTpcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdHdpZHRoOiAnMTAwJSdcblx0XHRoZWlnaHQ6ICc2NnB4J1xuXHRcdHBhZGRpbmc6ICcwIDIwcHgnXG5cdFx0Ym9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNlNmU2ZTYnXG5cdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCdcblx0XHRmb250U2l6ZTogJzE4cHgnXG5cdFx0Zm9udFdlaWdodDogJzUwMCdcblx0XHRjb2xvcjogJyMxODE4MTgnXG5cdFxuXHRsaXN0SXRlbUhpZ2hsaWdodDpcblx0XHRmb250V2VpZ2h0OiAnNjAwJ1xuXHRcdGNvbG9yOiAnI2YxYzYxOCdcblx0XG5cdGxpc3RJdGVtVGV4dDpcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdHRvcDogJzUwJSdcblx0XHRsZWZ0OiAnMCdcblx0XHRyaWdodDogJzAnXG5cdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdHRleHRBbGlnbjogJ2NlbnRlcidcblx0XHRsaW5lSGVpZ2h0OiAnMSdcblx0XHR3ZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdG1velRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknXG5cdFx0bXNUcmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdG9UcmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknXG5cblxuc3R5bGVPcGVuU3RhdGUgPVxuXHRjb250YWluZXI6XG5cdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnXG5cdFxuXHRvdmVybGF5OlxuXHRcdG9wYWNpdHk6ICcxJ1xuXG5cdGxpc3Q6XG5cdFx0b3BhY2l0eTogJzEnXG5cdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnXG5cdFx0dHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KSdcblxuXHRsaXN0VHJhbnNmb3JtOiAoaGVpZ2h0KS0+XG5cdFx0d2Via2l0VHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLSN7aGVpZ2h0fXB4KVwiXG5cdFx0bW96VHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLSN7aGVpZ2h0fXB4KVwiXG5cdFx0bXNUcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgtI3toZWlnaHR9cHgpXCJcblx0XHRvVHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLSN7aGVpZ2h0fXB4KVwiXG5cdFx0dHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLSN7aGVpZ2h0fXB4KVwiXG5cblxuXG5cblxuIiwibWFya3VwID0gXG5cdGNvbnRhaW5lcjogXCI8ZGl2IGNsYXNzPSdNZW51UG9wb3Zlcic+PC9kaXY+XCJcblxuXHRvdmVybGF5OiBcIjxkaXYgY2xhc3M9J01lbnVQb3BvdmVyLW92ZXJsYXknPjwvZGl2PlwiXG5cblx0bGlzdDogXCI8ZGl2IGNsYXNzPSdNZW51UG9wb3Zlci1saXN0Jz48L2Rpdj5cIlxuXHRcblx0ZGVzYzogKGRlc2MpLT4gXCJcblx0XHQ8ZGl2IGNsYXNzPSdNZW51UG9wb3Zlci1saXN0LWRlc2MnPiN7ZGVzY308L2Rpdj5cblx0XCJcblx0XG5cdGxpc3RJdGVtOiAobGFiZWwpLT4gXCJcblx0XHQ8ZGl2IGNsYXNzPSdNZW51UG9wb3Zlci1saXN0LWl0ZW0nPlxuXHRcdFx0PGRpdiBjbGFzcz0nTWVudVBvcG92ZXItbGlzdC1pdGVtLWxhYmVsJz4je2xhYmVsfTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcIlxuIiwiZGVmYXVsdE9wdGlvbnMgPSBcblx0J2NsaWNrRXZlbnQnOiAnY2xpY2snXG5cdCdzdHlsZSc6IHN0eWxlXG5cdCdzdHlsZU9wZW5TdGF0ZSc6IHN0eWxlT3BlblN0YXRlXG5cdCdjbG9zZU9uT3ZlcmxheVRvdWNoJzogdHJ1ZVxuXHQnYmVmb3JlT3Blbic6IG51bGxcblx0J2FmdGVyT3Blbic6IG51bGxcblx0J2JlZm9yZUNsb3NlJzogbnVsbFxuXHQnYWZ0ZXJDbG9zZSc6IG51bGwiLCJ7XG4gIFwibmFtZVwiOiBcIkBkYW5pZWxrYWxlbi9tZW51LXBvcG92ZXJcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4zLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIG1lbnUgcG9wb3ZlciBkaXNwbGF5IHN5c3RlbVwiLFxuICBcIm1haW5cIjogXCJkaXN0L21lbnUtcG9wb3Zlci5qc1wiLFxuICBcImJyb3dzZXJcIjoge1xuICAgIFwiLi9kaXN0L21lbnUtcG9wb3Zlci5qc1wiOiBcIi4vc3JjL2luZGV4LmNvZmZlZVwiXG4gIH0sXG4gIFwiYXV0aG9yXCI6IFwiZGFuaWVsa2FsZW5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwb3N0dmVyc2lvblwiOiBcIm5wbSBydW4gY29tcGlsZSAmJiBnaXQgYWRkIC4gJiYgZ2l0IGNvbW1pdCAtYSAtbSAnW0J1aWxkXSdcIixcbiAgICBcImJ1aWxkXCI6IFwibnBtIHJ1biBjb21waWxlICYmIG5wbSBydW4gbWluaWZ5XCIsXG4gICAgXCJjb21waWxlXCI6IFwic2ltcGx5aW1wb3J0IGJ1bmRsZSAtZCBzcmMvaW5kZXguY29mZmVlID4gZGlzdC9tZW51LXBvcG92ZXIuanNcIixcbiAgICBcIm1pbmlmeVwiOiBcImNsb3N1cmUtc2VydmljZSBkaXN0L21lbnUtcG9wb3Zlci5qcyA+IGRpc3QvbWVudS1wb3BvdmVyLm1pbi5qc1wiLFxuICAgIFwid2F0Y2hcIjogXCJzaW1wbHl3YXRjaCAtZyAnc3JjLyonIC14ICducG0gcnVuIGNvbXBpbGUgLXMnXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2xvc3VyZS1jb21waWxlci1zZXJ2aWNlXCI6IFwiKlwiLFxuICAgIFwiY29mZmVlLXNjcmlwdFwiOiBcIipcIixcbiAgICBcInNpbXBseWltcG9ydFwiOiBcIl40LjAuMC1zMzRcIixcbiAgICBcInNpbXBseXdhdGNoXCI6IFwiXjMuMC4wLWwyXCIsXG4gICAgXCJ1Z2xpZnlcIjogXCIqXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge31cbn1cbiJdfQ==