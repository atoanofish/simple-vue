/**
 * Created by majian04 on 17/6/3.
 */
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.depIds = {};
    this.update();
    console.log('watcher');
}

Watcher.prototype = {
    update() {
        Dep.target = this;
        let nv = this.get();
        let ov = this.value;
        if (nv !== ov) {
            this.value = nv;
        }
    },
    get() {
        let value = this.cb();
        return value;
    },
    addDep(dep){
        if (!this.depIds.hasOwnProperty(dep.id)) {
            this.depIds[dep.id] = dep;
            dep.addTask();
        }
    }
};