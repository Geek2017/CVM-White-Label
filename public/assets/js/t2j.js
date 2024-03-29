/*! table-to-json - v1.0.0 - Daniel White - MIT - https://github.com/lightswitch05/table-to-json */ ! function(a) {
    "use strict";
    var b = function(b, c, d) { this.$element = a(b), this.index = c, this.cachedRowSpan = null, this.options = a.extend({}, a.fn.tableToJSONCell.defaults, d), this.init() };
    b.prototype = {
        constructor: b,
        value: function(b) {
            var c = a.extend({}, this.options, b),
                d = a.trim(this.$element.text()),
                e = this.$element.attr(this.options.textDataOverride);
            if (e) d = e;
            else {
                if (c.extractor || c.textExtractor) return this.extractedValue();
                c.allowHTML && (d = a.trim(this.$element.html()))
            }
            return this.withColSpan(d)
        },
        extractedValue: function() {
            var b = this.options.extractor || this.options.textExtractor,
                c = null;
            return a.isFunction(b) ? c = b(this.index, this.$element) : "object" == typeof b && a.isFunction(b[this.index]) && (c = b[this.index](this.index, this.$element)), "string" == typeof c ? a.trim(c) : c
        },
        colSpan: function() { var a = 1; return this.$element.attr("colSpan") && (a = parseInt(this.$element.attr("colSpan"), 10)), a },
        rowSpan: function(a) { return 1 === arguments.length ? this.cachedRowSpan = a : this.cachedRowSpan || (this.cachedRowSpan = 1, this.$element.attr("rowSpan") && (this.cachedRowSpan = parseInt(this.$element.attr("rowSpan"), 10))), this.cachedRowSpan },
        withColSpan: function(a) { var b = a; if (this.$element.attr("colSpan")) { var c = this.colSpan(); if (c > 1) { b = []; for (var d = 0; d < c; d++) b.push(a) } } return b },
        init: function() { a.proxy(function() { this.$element.triggerHandler("init", this) }, this) }
    }, a.fn.tableToJSONCell = function(a, c) { return new b(this, a, c) }, a.fn.tableToJSONCell.defaults = { allowHTML: !1, textDataOverride: "data-override", extractor: null, textExtractor: null }
}(jQuery),
function(a) {
    "use strict";
    var b = function(b, c) { this.$element = a(b), this.cells = [], this.options = a.extend({}, a.fn.tableToJSONRow.defaults, c), this.init() };
    b.prototype = {
        constructor: b,
        id: function() { return this.$element.attr("id") ? this.$element.attr("id") : null },
        valuesWithHeadings: function(a) { for (var b = {}, c = this.values(), d = 0; d < c.length; d++) b[a[d]] = c[d]; return b },
        isEmpty: function() { for (var a = !0, b = this.values(), c = 0; a && c < b.length; c++) "" !== b[c] && (a = !1); return a },
        cell: function(a) { return a < this.cells.length ? this.cells[a] : null },
        insert: function(a, b) { this.cells.splice(a, 0, b) },
        getRowSpans: function(a) {
            for (var b, c, d = [], e = 0; e < this.cells.length; e++) {
                if (d = [], c = this.cells[e]) {
                    for (b = c.rowSpan(); b > 1;) d.push(c), b--;
                    c.rowSpan(1)
                }
                d.length > 0 && (a[e] = d)
            }
            return a
        },
        insertRowSpans: function(a) {
            for (var b = 0; b < a.length; b++)
                if (a[b] && a[b].length > 0) {
                    var c = a[b].splice(0, 1)[0];
                    this.insert(b, c)
                }
            return a
        },
        rowSpans: function() {
            for (var a, b, c = [], d = [], e = 0; e < this.cells.length; e++) {
                for (d = [], b = this.cells[e], a = b.rowSpan(); a > 1;) d.push(b), a--;
                b.rowSpan(1), d.length > 0 && (c[e] = d)
            }
            return c
        },
        values: function(b) {
            for (var c = a.extend({}, this.options, b), d = [], e = null, f = 0, g = 0; g < this.cells.length; g++)
                if (e = this.cells[g].value(c), 1 === this.cells[g].colSpan()) this.ignoreColumn(f) || (d = d.concat(e)), f++;
                else
                    for (var h = 0; h < e.length; h++) this.ignoreColumn(f) || (d = d.concat(e[h])), f++;
            return d
        },
        ignoreColumn: function(a) { return this.options.onlyColumns ? this.options.onlyColumns.indexOf(a) < 0 : this.options.ignoreColumns.indexOf(a) > -1 },
        init: function() {
            var b = this;
            this.$element.children(this.options.cellSelector).each(function(c, d) { b.cells.push(a(d).tableToJSONCell(c, b.options)) }), a.proxy(function() { this.$element.triggerHandler("init", this) }, this)
        }
    }, a.fn.tableToJSONRow = function(a) { return new b(this, a) }, a.fn.tableToJSONRow.defaults = { onlyColumns: null, ignoreColumns: [], cellSelector: "td,th" }
}(jQuery),
function(a) {
    "use strict";
    var b = function(b, c) { this.$element = a(b), this.rows = [], this.options = a.extend({}, a.fn.tableToJSON.defaults, c), this.init() };
    b.prototype = {
        constructor: b,
        headings: function() { return this.rows.length > 0 && !this.options.headings ? this.rows[0].values({ extractor: null, textExtractor: null }) : this.options.headings ? this.options.headings : [] },
        values: function() {
            var a = [],
                b = this.headings(),
                c = this.options.headings ? 0 : 1;
            for (c; c < this.rows.length; c++)
                if (!this.ignoreRow(this.rows[c], c))
                    if (this.options.includeRowId) {
                        var d = "string" == typeof this.options.includeRowId ? this.options.includeRowId : "rowId",
                            e = this.rows[c].valuesWithHeadings(b);
                        e[d] = this.rows[c].id(), a.push(e)
                    } else a.push(this.rows[c].valuesWithHeadings(b));
            return a
        },
        ignoreRow: function(a, b) { return this.options.ignoreRows && this.options.ignoreRows.indexOf(b) > -1 || a.$element.data("ignore") && "false" !== a.$element.data("ignore") || this.options.ignoreHiddenRows && !a.$element.is(":visible") || this.options.ignoreEmptyRows && a.isEmpty() },
        addRow: function(a, b) { return a.insertRowSpans(b), this.rows.push(a), a.getRowSpans(b) },
        init: function() {
            var b = this,
                c = [],
                d = null;
            this.$element.children(this.options.rowParentSelector).children(this.options.rowSelector).each(function(e, f) { d = a(f).tableToJSONRow(b.options), c = b.addRow(d, c) }), a.proxy(function() { this.$element.triggerHandler("init", this) }, this)
        }
    }, a.fn.tableToJSON = function(a) { return new b(this, a).values() }, a.fn.tableToJSON.defaults = { ignoreRows: [], ignoreHiddenRows: !0, ignoreEmptyRows: !1, headings: null, includeRowId: !1, rowParentSelector: "tbody,*", rowSelector: "tr" }
}(jQuery);