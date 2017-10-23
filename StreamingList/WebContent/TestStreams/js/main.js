(function($) {
  $.fn.extend({
    accordion: function(options) {
      var defaults = {
        accordion: 'true',
        speed: 300,
        closedSign: '[+]',
        openedSign: '[-]'
      };
      var opts = $.extend(defaults, options);
      var $this = $(this);
      $this.find("li").each(function() {
        if ($(this).find("ul").size() != 0) {
          $(this).find("a:first").append("<span>" + opts.closedSign + "</span>");
          if ($(this).find("a:first").attr('href') == "#") {
            $(this).find("a:first").click(function() {
              return false;
            });
          }
        }
      });
      $this.find("li.active").each(function() {
        $(this).parents("ul").slideDown(opts.speed);
        $(this).parents("ul").parent("li").find("span:first").html(opts.openedSign);
      });
      $this.find("li a").click(function() {
        if ($(this).parent().find("ul").size() != 0) {
          if (opts.accordion) {
            if (!$(this).parent().find("ul").is(':visible')) {
              parents = $(this).parent().parents("ul");
              visible = $this.find("ul:visible");
              visible.each(function(visibleIndex) {
                var close = true;
                parents.each(function(parentIndex) {
                  if (parents[parentIndex] == visible[visibleIndex]) {
                    close = false;
                    return false;
                  }
                });
                if (close) {
                  if ($(this).parent().find("ul") != visible[visibleIndex]) {
                    $(visible[visibleIndex]).slideUp(opts.speed, function() {
                      $(this).parent("li").find("span:first").html(opts.closedSign);
                    });
                  }
                }
              });
            }
          }
          if ($(this).parent().find("ul:first").is(":visible")) {
            $(this).parent().find("ul:first").slideUp(opts.speed, function() {
              $(this).parent("li").find("span:first").delay(opts.speed).html(opts.closedSign);
            });
          } else {
            $(this).parent().find("ul:first").slideDown(opts.speed, function() {
              $(this).parent("li").find("span:first").delay(opts.speed).html(opts.openedSign);
            });
          }
        }
      });
    }
  });
})(jQuery);

$(document).ready(function() {
  $(".nav").accordion({
    accordion: false,
    speed: 500,
    closedSign: '[+]',
    openedSign: '[-]'
  });
});