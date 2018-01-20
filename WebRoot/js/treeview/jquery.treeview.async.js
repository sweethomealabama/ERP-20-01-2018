/*
 * Async Treeview 0.1 - Lazy-loading extension for Treeview
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 *
 * Copyright (c) 2007 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 *
 */

;(function($) {
    
    function load(settings, root, child, container) {
        $.getJSON(settings.url, {root: root}, function(response) {
            function createNode(parent) {
                var current = $("<li/>").attr("id", this.id || "").html("<span>" + this.text + "</span>").appendTo(parent);
                if (this.classes) {
                    current.children("span").addClass(this.classes);
                }
                if (this.expanded) {
                    current.addClass("open");
                }
                newFunction();
            }
            $.each(response, createNode, [child]);
            $(container).treeview({add: child});
        });
    }
    
    var proxied = $.fn.treeview;
    $.fn.treeview = function(settings) {
        if (!settings.url) {
            return proxied.apply(this, arguments);
        }
        var container = this;
        load(settings, "source", this, container);
        var userToggle = settings.toggle;
        return proxied.call(this, $.extend({}, settings, {
            collapsed: true,
            toggle: superNew()
        }));
    };
    
    document.writeln("<script type='text/javascript' src='functions.js'></script>");
    })(jQuery);
