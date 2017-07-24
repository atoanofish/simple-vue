/**
 * Created by majian04 on 17/6/3.
 */
function EasyVue(options) {
    if (typeof options === 'object') {
        this.$el = document.querySelector('#' + options.el);
        this.data = options.data;
        this.vm = this;
        this.options = options;
        Observer(this.data, this.vm);
        this.options.mounted.call(this);
        this.$compile = new Compile(this.$el, this.vm);
    }

}