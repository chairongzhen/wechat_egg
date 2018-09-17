$.fn.RangeSlider = function (cfg) {
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min)
        .attr('max', max)
        .attr('step', step);

    $input.bind("input", function (e) {
        $input.attr('value', this.value);
        $input.css('background-size', this.value * 100.0 / max + '% 100%');

        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};

var change1 = function ($input) {
    $("#txtl1").val($input.value);
}
var change2 = function ($input) {
    $("#txtl2").val($input.value);
}
var change3 = function ($input) {
    $("#txtl3").val($input.value);
}
var change4 = function ($input) {
    $("#txtl4").val($input.value);
}
var change5 = function ($input) {
    $("#txtl5").val($input.value);
}
var change6 = function ($input) {
    $("#txtl6").val($input.value);
}
var change7 = function ($input) {
    $("#txtl7").val($input.value);
}
$('#rangerl1').RangeSlider({ min: 0, max: 255, step: 1, callback: change1 });
$('#rangerl2').RangeSlider({ min: 0, max: 255, step: 1, callback: change2 });
$('#rangerl3').RangeSlider({ min: 0, max: 255, step: 1, callback: change3 });
$('#rangerl4').RangeSlider({ min: 0, max: 255, step: 1, callback: change4 });
$('#rangerl5').RangeSlider({ min: 0, max: 255, step: 1, callback: change5 });
$('#rangerl6').RangeSlider({ min: 0, max: 255, step: 1, callback: change6 });
$('#rangerl7').RangeSlider({ min: 0, max: 255, step: 1, callback: change7 });

