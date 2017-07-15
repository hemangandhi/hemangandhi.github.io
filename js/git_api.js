//promiseFor :: (Monad m) => a -> (a -> Bool) -> (a -> b -> a) -> (a -> m b) -> m a
//The then arg is return::(m a)
function promiseFor(state, cond, retState, mkPromise, then){
    if(!cond(state)) then(state);

    mkPromise(state).done(function(d){
        promiseFor(cond, mkPromise, retState(state, d));
    });
}

function getPagesTillNone(baseURL, onPage){
    promiseFor({page: 1, cond: true},
        function(s){return s.cond;},
        function(s, d){
            if(d.length > 0)
                onPage(s.page, d);
            return {page: s.page + 1, cond: d.length > 0};
        },
        function(s){
            return $.get(baseURL + s.page);
    });
}

function drawRepo(repo){
    $('#' + repo.id).html(repo.name +'(' + repo.description + ') has ' + repo.counter + ' events!');
}

function renderPage(){
    getPagesTillNone('https://api.github.com/users/hemangandhi/events?page=',
        function(_, data){
            promiseFor({idx: 0, repos: {}},
                function(s){return s.idx < data.length;},
                function(s, d){}
        });
}

$(document).ready(renderPage);
