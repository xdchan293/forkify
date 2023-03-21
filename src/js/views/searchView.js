class searchView {
    _parentElement = document.querySelector('.search');

    getQuery() {
        const res = this._parentElement.querySelector('.search__field').value;
        this._clearInput()
        return res;
    }

    addHandelerSearch(handeler) {
        this._parentElement.addEventListener('submit',function(e) {
            e.preventDefault();
            console.log(this)
            // this._clearInput()
            handeler();//callback
        })
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new searchView()