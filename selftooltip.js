; (function () {
    _ = {
        toollist: $('a[data-selftooltip-point]'),
        settings: {
            type: 'normal',
            direction: 'top',
            color: '#fff',
            bgColor: '#000',
            top: '-32px',
            height: '200px',
            width: '100px'
        },
        csslist: {
            'left': "{'tooltip': {'top': '0','left': -options.offsetLeft-6},'tria': {'top': -(options.offsetHeight -17),'left': options.offsetLeft,'border-color': 'transparent transparent transparent '+settings.bgColor}}",
            'right': "{'tooltip': {'top': '0','right': -options.offsetLeft-6},'tria': {'top': -(options.offsetHeight - 17),'right': '12px','border-color': 'transparent '+settings.bgColor+' transparent transparent'}}",
            'bottom': "{'tooltip': {'top': options.height + 6,'left': (options.left - options.offsetLeft) / 2},'tria': {'top': -options.offsetHeight,'left': (options.offsetLeft - 12) / 2,'border-color': 'transparent transparent '+settings.bgColor+' transparent'}}",
            'top': "{'tooltip': {'top': -options.offsetHeight+6,'left': (options.left - options.offsetLeft) / 2},'tria': {'left': (options.offsetLeft - 12) / 2,'border-color': settings.bgColor+' transparent transparent transparent'}}"
        },
        init: function () {
            _.wrapTag();
        },
        wrapTag: function () {
            for (var i = 0; i < _.toollist.length; i++) {
                var item = $(_.toollist[i]),
                    val = item.attr('title');
                if ('' !== val) _.renderToolTip(val, item);
            }
        },
        renderToolTip: function (data, self) {
            var css = self.data('selftooltip-css') || {};
            css = (typeof(css) == "object" ? css : JSON.parse(css.split('\'').join("\"")));
            var settings = $.extend({}, _.settings, css);
            var dom = '<div class="tooltip" style="position:absolute;display:inline-block;opacity:0;"><div style="padding:5px;border-radius:5px;white-space: nowrap;font-size: 12px;color: ' + settings.color + ';background-color: ' + settings.bgColor + ';">' + data + '</div><div class="tooltip-triangle" style="width:0;height: 0;border-width:6px;border-style:solid;position:relative;"></div></div>';
            self.append(dom);
            self.attr('title', '').css({ 'position': 'relative', 'display': 'inline-block' });
            var $tooltip = self.find('.tooltip'),
                $tria = $tooltip.find('.tooltip-triangle');
            $tooltip.find('div:first-child').css({ 'width': settings.width, 'white-space': 'inherit' });
            var options = _.getOptions(self, $tooltip);
            if (options.offsetHeight < 35) {
                $tooltip.find('div:first-child').css({ 'max-width': settings.width, 'width': '' });
                options = _.getOptions(self, $tooltip);
            }
            $tooltip.css({ 'display': 'none' });
            $.extend(options, { isOverflow: (document.body.scrollHeight - self[0].offsetTop - options.offsetHeight) < 0 })
            var thiscss = _.getCss(options, $.extend({}, settings, { type: self.data('selftooltip-type'), direction: self.data('selftooltip-point') }));
            $tooltip.css(thiscss.tooltip);
            $tria.css(thiscss.tria);
            $tooltip.css({ 'display': 'inline-block' });
            $tooltip.find('div:first-child').css({ 'max-width': settings.width, 'width': '' });
            self.on('mouseover', function (e) {
                $(this).find('.tooltip').stop().animate({ 'opacity': 1 }, 200);
            }).on('mouseleave', function (e) {
                $(this).find('.tooltip').stop().animate({ 'opacity': 0 }, 200);
            });
            $tooltip.on('mouseover', function (e) {
                e.stopPropagation();
            });
        },
        getOptions: function (self, $tooltip) {
            return {
                left: self.outerWidth(),
                height: self.outerHeight(),
                offsetLeft: $tooltip.outerWidth(),
                offsetHeight: $tooltip.outerHeight()
            };
        },
        getCss: function (options, settings) {
            eval("aa = " + _.csslist[settings.direction]);
            if (["left", 'right'].indexOf(settings.direction)>=0 && options.isOverflow && options.offsetHeight > 35) {
                $.extend(aa.tooltip, { 'top': -(options.offsetHeight - 12 - options.height) });
                $.extend(aa.tria, { 'top': -(12 + options.height / 2 - 1) });
            } else if (["left", 'right'].indexOf(settings.direction)>=0 && !options.isOverflow && options.offsetHeight > 35) {
                $.extend(aa.tria, { 'top': -(options.offsetHeight - options.height / 2 - 11) });
            }
            return aa;
        }
    };
    _.init();
})();