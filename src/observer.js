/**
 * Created by majian04 on 17/6/3.
 */
var uid = 0;
function Observer(data) {
    if (!data || typeof data !== 'object') {
        return
    }

    Object.keys(data).forEach(item => {
        defineProps(data, item, data[item]);
    });
}

function defineProps(data, exp, val) {
    Observer(val);
    let dep = new Dep();
    Object.defineProperty(data, exp, {
        enumerable: true,
        configurable: true,
        get() {
            if (Dep.target) {
                dep.depend();//加个任务
            }
            return val;
        },
        set(nv) {
            if (nv !== val) {
                val = nv;
                console.log('set', nv);
                dep.notify(); // ui 要更新
            }
        }
    });
}

function Dep() {
    this.id = uid++;
    this.taskStack = [];
}
Dep.prototype = {
    addTask() {
        this.taskStack.push(Dep.target);
        console.log(this.taskStack, 'origin')
    },

    depend() {
        Dep.target.addDep(this);
    },

    notify() {
        console.log(this.taskStack);
        this.taskStack.map(item => {
            item.update();
        });
    }
};
Dep.target = null;