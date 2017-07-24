/**
 * Created by majian04 on 17/6/3.
 */
function Compile(dom, vm) {
    this.vm = vm;
    this.init(dom);
}
Compile.prototype = {
    init(dom) {
        let nodeList = this.nodeScan(dom);
        new Array().slice.call(nodeList.childNodes).map(node => {
            switch (node.nodeType) {
                case 1:
                    if (node.attributes) {
                        new Array().slice.call(node.attributes).map(attr => {
                            this.compileNodes(node, attr);
                        });
                    }
                    break;
                case 3:
                    break;
            }
            if (node.childNodes && node.childNodes.length) {
                this.init(node);
            }

        });
        dom.appendChild(nodeList);
    },

    getters(vm, nameList)
    {
        let _data = vm.data;
        let value;
        nameList.map((name, index) => {
            if (index < nameList.length - 1) {
                _data = _data[name];
            } else {
                value = _data[name];
            }
        });
        return value;
    },

    settters(vm, nameList, e)
    {
        let _data = vm.data;
        nameList.map((name, index) => {
            if (index < nameList.length - 1) {
                _data = _data[name];
            } else {
                _data[name] = e.target.value;
            }
        });
    },

    compileNodes(node, attr)
    {
        let nameList = attr.value.split('.');
        let exp = attr.value;
        switch (attr.name) {
            case 'v-model':
                new Watcher(this.vm, exp, () => {
                    node.value = this.getters(this.vm, nameList);
                    return node.value;
                });
                node.addEventListener('input', (e) => {
                    node.value = e.target.value;
                    this.settters(this.vm, nameList, e);
                });
                break;
            case 'v-text':
                new Watcher(this.vm, exp, () => {
                    node.textContent = this.getters(this.vm, nameList);
                    return this.getters(this.vm, nameList);
                });
                break;
        }
        node.removeAttribute(attr);

    },

    nodeScan(dom)
    {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = dom.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
};
