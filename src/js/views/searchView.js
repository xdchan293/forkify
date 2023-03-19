class searchView {
    _parentElement = document.querySelector('.search');

    getQuery() {
        return this._parentElement.querySelector('.search__field').value;
    }

    addHandelerSearch(handeler) {
        this._parentElement.addEventListener('submit',function(e) {
            e.preventDefault();
            handeler();//callback
        })
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new searchView()