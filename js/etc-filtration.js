// はい、キモいです〜
function addFiltration(filters, filter_container, input_container, options) {
    const semi_related_class = options.semi_related_class || "tangential";
    const relation_level = options.relation_level_getter || ((cls, filt) => {
        if (cls == filt) return 2;
        if (cls == 'semi-' + filt) return 1;
        return 0;
    });
    const filter_type_namer = options.filter_type_namer || (name => {
        return name.replace('semi-', '').split('-').map((wd) => wd.charAt(0).toUpperCase() + wd.substr(1)).join(' ');
    });
    const filter_item_class = options.filter_item_class || 'filter-item';

    function relationToState(cls, filter_states) {
        let r = 0;
        filter_states.forEach((v, k, m) => {
            if (!v) return;
            r = Math.max(r, relation_level(cls, k));
        });
        return r;
    }

    function applyFilters(filter_states) {
        input_container.childNodes.forEach(kid => {
            const kid_classes = kid.classList;
            if (kid_classes === undefined || !kid_classes.contains(filter_item_class)) return;
            let relation = 0;
            kid_classes.forEach((kc) => relation = Math.max(relation, relationToState(kc, filter_states)));
            if (relation == 2) {
                kid.style.display = "block";
                kid_classes.remove(semi_related_class);
            } else if (relation == 1) {
                kid.style.display = "block";
                kid_classes.add(semi_related_class);
            } else {
                kid.style.display = "none";
            }
        });
    }

    let filter_states = new Map();
    for(const filter of filters) {
        // by default we show everything
        filter_states.set(filter, true);
        let filter_elt = document.createElement('li');
        filter_elt.textContent = filter_type_namer(filter);
        filter_elt.addEventListener('click', function (e) {
            filter_elt.classList.toggle('deselected');
            filter_states.set(filter, !filter_states.get(filter));
            applyFilters(filter_states);
        });
        filter_container.appendChild(filter_elt);
    }
}

function nihongo_filter_mei(class_mei) {
    let class_mei_map = {
        'applied-programming': 'プログラミング',
        'math-and-theory': '数学やコンピューター科学理論',
        'anime': 'アニメ'
    };
    let yakushita_class_mei = class_mei_map[class_mei.replace('semi-', '')];
    if (yakushita_class_mei === undefined) {
        yakushita_class_mei = 'その他';
    }
    return yakushita_class_mei;
}
